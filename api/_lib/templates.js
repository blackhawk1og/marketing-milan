import { SERVICE_CHOICES } from '../../src/data/site.js'

/**
 * Email bodies for the contact endpoint.
 *
 * Everything interpolated here is visitor-supplied, so every value goes through
 * `escapeHtml` before it reaches the HTML body. Mail clients render HTML, so an
 * unescaped `<` in a message would break the layout at best and inject markup at
 * worst.
 */

const COLORS = {
  forest: '#0a2a1f',
  gold: '#c98a2b',
  cream: '#f7f1e4',
  ink: '#1a1912',
  muted: '#3a382e',
}

export function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

/**
 * Turns the selected slugs into a readable list. Validation has already dropped
 * anything unrecognised, and the lookup here means an unknown value could never
 * be echoed into the email even if it had not.
 */
export function serviceLabels(slugs) {
  if (!Array.isArray(slugs) || slugs.length === 0) return 'Not specified'
  const labels = slugs
    .map((slug) => SERVICE_CHOICES.find((choice) => choice.value === slug))
    .filter(Boolean)
    .map((choice) => choice.label)
  return labels.length > 0 ? labels.join(', ') : 'Not specified'
}

const shell = (inner) => `<!doctype html>
<html>
  <body style="margin:0;padding:24px;background:${COLORS.cream};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:${COLORS.ink};line-height:1.6;">
    <table role="presentation" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:18px;overflow:hidden;border:1px solid rgba(20,19,15,.08);">
      ${inner}
    </table>
  </body>
</html>`

const row = (label, value) => `
  <tr>
    <td style="padding:10px 32px;border-bottom:1px solid rgba(20,19,15,.08);">
      <div style="font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:${COLORS.gold};font-weight:700;">${escapeHtml(label)}</div>
      <div style="font-size:15px;color:${COLORS.ink};">${escapeHtml(value)}</div>
    </td>
  </tr>`

/** Sent to the site owner. `replyTo` on the send makes a reply go to the visitor. */
export function notificationEmail(fields) {
  const services = serviceLabels(fields.services)
  const subject = fields.business
    ? `New enquiry from ${fields.name} — ${fields.business}`
    : `New enquiry from ${fields.name}`

  const html = shell(`
    <tr>
      <td style="background:${COLORS.forest};padding:24px 32px;">
        <div style="font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#e6bd6c;font-weight:700;">New enquiry</div>
        <div style="font-size:22px;color:#ffffff;font-weight:600;">${escapeHtml(fields.name)}</div>
      </td>
    </tr>
    ${row('Email', fields.email)}
    ${row('Phone', fields.phone || 'Not given')}
    ${row('Business', fields.business || 'Not given')}
    ${row('Can help with', services)}
    <tr>
      <td style="padding:18px 32px 28px;">
        <div style="font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:${COLORS.gold};font-weight:700;">Message</div>
        <div style="font-size:15px;color:${COLORS.muted};white-space:pre-wrap;">${escapeHtml(fields.message)}</div>
      </td>
    </tr>
    <tr>
      <td style="padding:16px 32px;background:${COLORS.cream};font-size:12px;color:${COLORS.muted};">
        Reply to this email to respond to ${escapeHtml(fields.name)} directly.
      </td>
    </tr>`)

  const text = [
    `New enquiry from ${fields.name}`,
    '',
    `Email:     ${fields.email}`,
    `Phone:     ${fields.phone || 'Not given'}`,
    `Business:  ${fields.business || 'Not given'}`,
    `Can help with: ${services}`,
    '',
    'Message:',
    fields.message,
    '',
    'Reply to this email to respond directly.',
  ].join('\n')

  return { subject, html, text }
}

/** Sent to the visitor. Requires a verified domain — see CONTACT_AUTOREPLY. */
export function autoReplyEmail(fields) {
  const html = shell(`
    <tr>
      <td style="background:${COLORS.forest};padding:28px 32px;">
        <div style="font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#e6bd6c;font-weight:700;">Milan Sunuwar · Digital Marketing</div>
        <div style="font-size:22px;color:#ffffff;font-weight:600;">Thanks for getting in touch.</div>
      </td>
    </tr>
    <tr>
      <td style="padding:28px 32px;font-size:15px;color:${COLORS.muted};">
        <p style="margin:0 0 16px;">Hi ${escapeHtml(fields.name)},</p>
        <p style="margin:0 0 16px;">Thanks for reaching out — your message came through and I read every one personally. I'll get back to you within a day.</p>
        <p style="margin:0 0 8px;font-size:13px;color:${COLORS.gold};font-weight:700;">Here is what you sent:</p>
        <div style="padding:14px 18px;background:${COLORS.cream};border-radius:10px;white-space:pre-wrap;font-size:14px;">${escapeHtml(fields.message)}</div>
      </td>
    </tr>
    <tr>
      <td style="padding:16px 32px 28px;font-size:13px;color:${COLORS.muted};border-top:1px solid rgba(20,19,15,.08);">
        Milan Sunuwar · Digital Marketing<br />
        Different gets noticed. Recognizable gets remembered.
      </td>
    </tr>`)

  const text = [
    `Hi ${fields.name},`,
    '',
    "Thanks for reaching out — your message came through and I read every one personally. I'll get back to you within a day.",
    '',
    'Here is what you sent:',
    fields.message,
    '',
    'Milan Sunuwar · Digital Marketing',
    'Different gets noticed. Recognizable gets remembered.',
  ].join('\n')

  return { subject: 'Thanks for getting in touch', html, text }
}
