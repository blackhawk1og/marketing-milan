import { handleContact } from './_lib/handleContact.js'

/**
 * Vercel serverless function — POST /api/contact
 *
 * Thin adapter only: everything meaningful lives in ./_lib/handleContact.js so
 * the same code path runs locally through the Vite dev middleware.
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ ok: false, message: 'Method not allowed' })
  }

  // Vercel parses JSON bodies automatically, but a string can still arrive when
  // the content-type is missing.
  let payload = req.body ?? {}
  if (typeof payload === 'string') {
    try {
      payload = JSON.parse(payload)
    } catch {
      return res.status(400).json({ ok: false, message: 'Invalid request body.' })
    }
  }

  try {
    const { status, body } = await handleContact(payload, process.env)
    return res.status(status).json(body)
  } catch (error) {
    console.error('[contact] unhandled error', error)
    return res
      .status(500)
      .json({ ok: false, message: 'Something went wrong. Please try again.' })
  }
}
