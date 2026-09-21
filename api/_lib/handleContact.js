import { Resend } from 'resend'
import { validate } from '../../src/lib/contactValidation.js'
import { autoReplyEmail, notificationEmail } from './templates.js'

/**
 * Core of the contact endpoint, kept free of any platform request/response
 * objects so the Vercel function and the Vite dev middleware run identical code.
 *
 * @param {object} payload  Parsed JSON body.
 * @param {object} env      process.env, or Vite's loadEnv result in dev.
 * @returns {Promise<{status:number, body:object}>}
 */
export async function handleContact(payload, env) {
  // Honeypot: a field no human ever sees. Answer 200 so bots treat the submit as
  // done and stop retrying, but send nothing.
  if (typeof payload?.company === 'string' && payload.company.trim() !== '') {
    return { status: 200, body: { ok: true } }
  }

  const result = validate(payload)
  if (result.errors) {
    return {
      status: 400,
      body: {
        ok: false,
        errors: result.errors,
        message: 'Almost there — a couple of fields need a second look.',
      },
    }
  }

  const { fields } = result

  const missing = ['RESEND_API_KEY', 'CONTACT_FROM', 'CONTACT_TO'].filter(
    (key) => !env?.[key],
  )
  if (missing.length > 0) {
    // A misconfigured deploy is our problem, not the visitor's — log the detail,
    // return something generic.
    console.error(`[contact] missing env: ${missing.join(', ')}`)
    return {
      status: 500,
      body: { ok: false, message: 'The contact form is not configured correctly.' },
    }
  }

  const resend = new Resend(env.RESEND_API_KEY)

  // --- Critical path: the notification. If this fails, the request fails. ---
  const notification = notificationEmail(fields)
  const { error } = await resend.emails.send({
    from: env.CONTACT_FROM,
    to: env.CONTACT_TO,
    replyTo: fields.email,
    subject: notification.subject,
    html: notification.html,
    text: notification.text,
  })

  if (error) {
    console.error('[contact] notification send failed', error)
    return {
      status: 502,
      body: {
        ok: false,
        message:
          "Sorry — your message could not be sent just now. Please try again, or email hello@milansunuwar.com directly.",
      },
    }
  }

  // --- Best effort: the visitor's confirmation. Never fails the request. ---
  // Resend's test sender can only deliver to the account owner, so this stays
  // off until a verified domain is configured. Either way, a failure here must
  // not tell a visitor their message was lost — it already reached the inbox.
  if (env.CONTACT_AUTOREPLY === 'true') {
    const autoReply = autoReplyEmail(fields)
    const { error: autoReplyError } = await resend.emails.send({
      from: env.CONTACT_FROM,
      to: fields.email,
      subject: autoReply.subject,
      html: autoReply.html,
      text: autoReply.text,
    })
    if (autoReplyError) {
      console.error('[contact] auto-reply send failed', autoReplyError)
    }
  }

  return { status: 200, body: { ok: true } }
}
