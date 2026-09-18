/**
 * Server-side validation for the contact endpoint.
 *
 * The browser already enforces `required` and `type="email"`, but this endpoint
 * is public and unauthenticated, so none of that can be trusted. Length caps
 * matter as much as the presence checks — they are what stops someone posting a
 * multi-megabyte body.
 */

const LIMITS = {
  name: 100,
  email: 254, // RFC 5321 maximum length of an address
  business: 100,
  message: 5000,
}

const MESSAGE_MIN = 10

// Deliberately loose. Real validation of an address is delivery, not a regex —
// this only rejects input that clearly is not an address at all.
const EMAIL_SHAPE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const asText = (value) => (typeof value === 'string' ? value.trim() : '')

/**
 * @returns {{ fields: Record<string,string> } | { errors: Record<string,string> }}
 *   Either the cleaned fields or a map of field name to error message.
 */
export function validate(payload) {
  const fields = {
    name: asText(payload?.name),
    email: asText(payload?.email),
    business: asText(payload?.business),
    service: asText(payload?.service),
    message: asText(payload?.message),
  }

  const errors = {}

  if (!fields.name) {
    errors.name = 'Please enter your name.'
  } else if (fields.name.length > LIMITS.name) {
    errors.name = `Please keep your name under ${LIMITS.name} characters.`
  }

  if (!fields.email) {
    errors.email = 'Please enter your email address.'
  } else if (fields.email.length > LIMITS.email) {
    errors.email = 'That email address is too long.'
  } else if (!EMAIL_SHAPE.test(fields.email)) {
    errors.email = 'That does not look like a valid email address.'
  }

  if (fields.business.length > LIMITS.business) {
    errors.business = `Please keep the business name under ${LIMITS.business} characters.`
  }

  if (!fields.message) {
    errors.message = 'Please tell me a little about your business.'
  } else if (fields.message.length < MESSAGE_MIN) {
    errors.message = `Please write at least ${MESSAGE_MIN} characters.`
  } else if (fields.message.length > LIMITS.message) {
    errors.message = `Please keep your message under ${LIMITS.message} characters.`
  }

  return Object.keys(errors).length > 0 ? { errors } : { fields }
}
