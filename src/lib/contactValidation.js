/**
 * Validation for the contact form, shared by the browser and the send endpoint.
 *
 * Both sides import this so the rules *and* the wording have one definition: a
 * given field can never say one thing when the browser catches it and something
 * else when the server does.
 *
 * It deliberately has no server-only dependencies, which is what makes it safe
 * to pull into the client bundle.
 *
 * The client runs it to replace the browser's native validation bubble. The
 * server runs it because the endpoint is public and unauthenticated, so nothing
 * the client does can be trusted — the length caps in particular are what stop
 * someone posting a multi-megabyte body.
 */

import { SERVICE_CHOICES } from '../data/site.js'

export const LIMITS = {
  name: 100,
  email: 254, // RFC 5321 maximum length of an address
  business: 100,
  phone: 40, // room for international formats with +, spaces and parens
  message: 5000,
}

export const MESSAGE_MIN = 10

const KNOWN_SERVICES = new Set(SERVICE_CHOICES.map((choice) => choice.value))

// Deliberately loose. Real validation of an address is delivery, not a regex —
// this only rejects input that clearly is not an address at all.
const EMAIL_SHAPE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const asText = (value) => (typeof value === 'string' ? value.trim() : '')

/**
 * Keeps only recognised service slugs, deduped and in list order.
 *
 * Unknown values are dropped rather than rejected: the form can only ever send
 * valid slugs, so anything else means a tampered or malformed request, and a
 * visitor-facing error about it would be meaningless. Filtering here means
 * `fields.services` is already trustworthy by the time templates render it.
 */
const asServices = (value) => {
  if (!Array.isArray(value)) return []
  const picked = new Set(
    value.filter((slug) => typeof slug === 'string' && KNOWN_SERVICES.has(slug)),
  )
  return SERVICE_CHOICES.map((choice) => choice.value).filter((slug) =>
    picked.has(slug),
  )
}

/**
 * @returns {{ fields: Record<string,unknown> } | { errors: Record<string,string> }}
 *   Either the cleaned fields or a map of field name to error message.
 */
export function validate(payload) {
  const fields = {
    name: asText(payload?.name),
    email: asText(payload?.email),
    business: asText(payload?.business),
    phone: asText(payload?.phone),
    message: asText(payload?.message),
    services: asServices(payload?.services),
  }

  const errors = {}

  if (!fields.name) {
    errors.name = 'Who am I replying to?'
  } else if (fields.name.length > LIMITS.name) {
    errors.name = `Can you keep that under ${LIMITS.name} characters?`
  }

  if (!fields.email) {
    errors.email = 'Where should I send my reply?'
  } else if (fields.email.length > LIMITS.email) {
    errors.email = 'That address is too long to be real.'
  } else if (!EMAIL_SHAPE.test(fields.email)) {
    errors.email = "Hmm, that doesn't look like an email."
  }

  if (fields.business.length > LIMITS.business) {
    errors.business = `Can you keep that under ${LIMITS.business} characters?`
  }

  // Optional, and deliberately not shape-checked — phone formats vary far too
  // much between countries to reject on a regex.
  if (fields.phone.length > LIMITS.phone) {
    errors.phone = `That number looks too long — ${LIMITS.phone} characters max.`
  }

  if (!fields.message) {
    errors.message = "Tell me what you're working on."
  } else if (fields.message.length < MESSAGE_MIN) {
    errors.message = 'A few more words and I can actually help.'
  } else if (fields.message.length > LIMITS.message) {
    errors.message = `That's a lot — can you trim it under ${LIMITS.message} characters?`
  }

  return Object.keys(errors).length > 0 ? { errors } : { fields }
}

/** Field order used when deciding which invalid field to focus first. */
export const FIELD_ORDER = ['name', 'email', 'business', 'phone', 'message']
