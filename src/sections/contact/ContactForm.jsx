import { useEffect, useRef, useState } from 'react'
import Button from '../../components/ui/Button'
import { SERVICE_OPTIONS } from '../../data/site'

const CONTROL =
  'w-full rounded-brand-sm border-[1.5px] bg-white px-[1em] py-[0.85em] font-body text-base text-ink-900 transition-colors duration-200 ease-brand focus:outline-none'
const CONTROL_IDLE = 'border-ink-950/18 focus:border-forest-800'
const CONTROL_INVALID = 'border-red-700 focus:border-red-700'

const EMPTY = {
  name: '',
  email: '',
  business: '',
  service: '',
  message: '',
}

const GENERIC_ERROR =
  "Sorry — your message could not be sent just now. Please try again, or email hello@milansunuwar.com directly."

function Field({ id, label, error, children }) {
  return (
    <div className="mb-5">
      <label
        htmlFor={id}
        className="mb-[0.5em] block text-[0.85rem] font-bold text-ink-900"
      >
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-[0.8rem] font-semibold text-red-700">
          {error}
        </p>
      )}
    </div>
  )
}

export default function ContactForm() {
  const [values, setValues] = useState(EMPTY)
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [errorMessage, setErrorMessage] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})
  const statusRef = useRef(null)

  const update = (event) => {
    const { name, value } = event.target
    setValues((prev) => ({ ...prev, [name]: value }))
    // Clear a field's error as soon as the visitor starts fixing it.
    setFieldErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (status === 'sending') return

    // Read the uncontrolled honeypot before the re-render disables the inputs —
    // disabled controls are omitted from FormData.
    const honeypot = new FormData(event.currentTarget).get('company') ?? ''

    setStatus('sending')
    setErrorMessage('')
    setFieldErrors({})

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, company: honeypot }),
      })

      const data = await response.json().catch(() => ({}))

      if (!response.ok || !data.ok) {
        setFieldErrors(data.errors ?? {})
        setErrorMessage(data.message || GENERIC_ERROR)
        setStatus('error')
        return
      }

      // Only clear once the message is definitely away — a failed send must not
      // destroy what the visitor just typed.
      setValues(EMPTY)
      setStatus('sent')
    } catch {
      setErrorMessage(GENERIC_ERROR)
      setStatus('error')
    }
  }

  // Matches the mockup: the confirmation is scrolled into view once shown.
  useEffect(() => {
    if (status === 'sent' || status === 'error') {
      statusRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [status])

  const isSending = status === 'sending'
  const controlClass = (field) =>
    `${CONTROL} ${fieldErrors[field] ? CONTROL_INVALID : CONTROL_IDLE}`
  const errorProps = (field) =>
    fieldErrors[field]
      ? { 'aria-invalid': true, 'aria-describedby': `${field}-error` }
      : {}

  return (
    <div>
      {status === 'sent' && (
        <div
          ref={statusRef}
          role="status"
          aria-live="polite"
          className="mb-6 rounded-brand-md bg-forest-950 px-[22px] py-5 font-semibold text-cream-100"
        >
          Thanks &mdash; your message has been received. I&apos;ll get back to
          you within a day.
        </div>
      )}

      {status === 'error' && (
        <div
          ref={statusRef}
          role="alert"
          className="mb-6 rounded-brand-md border-[1.5px] border-red-700 bg-red-50 px-[22px] py-5 font-semibold text-red-800"
        >
          {errorMessage}
        </div>
      )}

      {/* Native validation stays on, so most invalid input never reaches the
          network; the server checks are a backstop for scripted requests. */}
      <form onSubmit={handleSubmit}>
        {/* Honeypot: visually hidden rather than display:none, which some bots
            skip. A real visitor never focuses or fills this. */}
        <div className="sr-only" aria-hidden="true">
          <label htmlFor="company">Company (leave this empty)</label>
          <input
            type="text"
            id="company"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            defaultValue=""
          />
        </div>

        <div className="grid grid-cols-1 gap-5 gt520:grid-cols-2">
          <Field id="name" label="Full name" error={fieldErrors.name}>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your name"
              required
              value={values.name}
              onChange={update}
              disabled={isSending}
              className={controlClass('name')}
              {...errorProps('name')}
            />
          </Field>
          <Field id="email" label="Email" error={fieldErrors.email}>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@business.com"
              required
              value={values.email}
              onChange={update}
              disabled={isSending}
              className={controlClass('email')}
              {...errorProps('email')}
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 gap-5 gt520:grid-cols-2">
          <Field id="business" label="Business name" error={fieldErrors.business}>
            <input
              type="text"
              id="business"
              name="business"
              placeholder="Your business"
              value={values.business}
              onChange={update}
              disabled={isSending}
              className={controlClass('business')}
              {...errorProps('business')}
            />
          </Field>
          <Field id="service" label="Service you're interested in">
            <select
              id="service"
              name="service"
              value={values.service}
              onChange={update}
              disabled={isSending}
              className={controlClass('service')}
            >
              {SERVICE_OPTIONS.map(({ value, label }) => (
                <option key={label} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <Field
          id="message"
          label="Tell me about your business"
          error={fieldErrors.message}
        >
          <textarea
            id="message"
            name="message"
            placeholder="What are you trying to grow, and what have you tried so far?"
            required
            value={values.message}
            onChange={update}
            disabled={isSending}
            className={`${controlClass('message')} min-h-[130px] resize-y`}
            {...errorProps('message')}
          />
        </Field>

        <Button type="submit" block disabled={isSending}>
          {isSending ? 'Sending…' : 'Send Message'}
        </Button>
      </form>
    </div>
  )
}
