import { useEffect, useRef, useState } from 'react'
import Button from '../../components/ui/Button'
import ChoiceChip from '../../components/ui/ChoiceChip'
import { SERVICE_CHOICES } from '../../data/site'
import { FIELD_ORDER, validate } from '../../lib/contactValidation'

// Underline-only controls. No `border-0` reset is needed: Tailwind's preflight
// already sets `border: 0 solid` on every element, so `border-b` alone produces
// exactly one hairline — and adding it would pit `border-width` against
// `border-bottom-width` for no gain.
//
// The `:-webkit-autofill` pair is load-bearing, not polish: Chrome paints
// autofilled fields with its own opaque background, which on a transparent
// input reads as a white box floating on the cream page.
const CONTROL =
  'w-full border-b bg-transparent px-0 py-3 font-body text-[1.05rem] text-ink-900 transition-colors duration-200 ease-brand placeholder:text-ink-700/45 focus:outline-none [&:-webkit-autofill]:shadow-[inset_0_0_0_1000px_var(--color-cream-100)] [&:-webkit-autofill]:[-webkit-text-fill-color:var(--color-ink-900)]'
const CONTROL_IDLE = 'border-b-ink-950/25 focus:border-b-ink-950'
const CONTROL_INVALID = 'border-b-red-700 focus:border-b-red-700'

const LABEL =
  'mb-2 block font-body text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-ink-950'

const EMPTY = {
  name: '',
  email: '',
  business: '',
  phone: '',
  message: '',
  // Shared module-level array: only ever replaced, never mutated in place.
  services: [],
}

const GENERIC_ERROR =
  "Sorry — your message could not be sent just now. Please try again, or email hello@milansunuwar.com directly."

/** Keep in step with the --animate-toast timing in src/index.css. */
const TOAST_DURATION = 5000

function Field({ id, label, error, nudge, onNudgeEnd, children }) {
  return (
    <div
      className={`mb-7 ${nudge ? 'animate-nudge motion-reduce:animate-none' : ''}`}
      onAnimationEnd={onNudgeEnd}
    >
      <label htmlFor={id} className={LABEL}>
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
  // Cleared on animationend rather than keyed off `fieldErrors`: re-applying the
  // same class does not replay a CSS animation, so a second submit with the same
  // errors would otherwise sit still.
  const [nudging, setNudging] = useState(false)
  const errorRef = useRef(null)

  const update = (event) => {
    const { name, value } = event.target
    setValues((prev) => ({ ...prev, [name]: value }))
    // Clear a field's error as soon as the visitor starts fixing it.
    setFieldErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev))
  }

  const toggleService = (value) => {
    setValues((prev) => ({
      ...prev,
      services: prev.services.includes(value)
        ? prev.services.filter((slug) => slug !== value)
        : [...prev.services, value],
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (status === 'sending') return

    // Read the uncontrolled honeypot before the re-render disables the inputs —
    // disabled controls are omitted from FormData.
    const honeypot = new FormData(event.currentTarget).get('company') ?? ''

    // Runs the same rules the server does, so the wording can never disagree.
    // This is what stands in for the browser's native bubble, which `noValidate`
    // switches off.
    const { errors } = validate(values)
    if (errors) {
      setFieldErrors(errors)
      setNudging(true)
      // Field problems are not a send failure, so the big red box stays away.
      setStatus('idle')
      // Focus is not expressible in React state, and the native bubble used to
      // handle it for us.
      const firstInvalid = FIELD_ORDER.find((field) => errors[field])
      if (firstInvalid) document.getElementById(firstInvalid)?.focus()
      return
    }

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

  // The error stays put until it is dealt with, so scroll it into view. The
  // success toast is fixed to the viewport and needs no scrolling.
  useEffect(() => {
    if (status === 'error') {
      errorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [status])

  // Dismiss the confirmation toast. The CSS fade-out is timed to finish exactly
  // as this fires, so the toast is never yanked off screen mid-animation.
  useEffect(() => {
    if (status !== 'sent') return undefined
    const timer = setTimeout(() => setStatus('idle'), TOAST_DURATION)
    return () => clearTimeout(timer)
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
      {/* The live region stays mounted so screen readers announce the toast
          when it appears; announcing a region that mounts with its content is
          unreliable. Wrapper ignores pointer events so it never blocks the page. */}
      <div
        role="status"
        aria-live="polite"
        className="pointer-events-none fixed right-4 bottom-4 left-4 z-[200] flex justify-center gt520:right-6 gt520:bottom-6 gt520:left-auto gt520:justify-end"
      >
        {status === 'sent' && (
          <div className="pointer-events-auto max-w-[420px] animate-toast rounded-brand-md bg-forest-950 px-[22px] py-5 font-semibold text-cream-100 shadow-[0_20px_45px_-15px_rgba(10,42,31,.55)] motion-reduce:animate-toast-calm">
            Thanks &mdash; your message has been received. I&apos;ll get back to
            you within a day.
          </div>
        )}
      </div>

      {/* Errors stay inline and persistent — they need reading and acting on,
          so they must not time out the way the confirmation does. */}
      {status === 'error' && (
        <div
          ref={errorRef}
          role="alert"
          className="mb-6 border-[1.5px] border-red-700 bg-red-50 px-[22px] py-5 font-semibold text-red-800"
        >
          {errorMessage}
        </div>
      )}

      {/* `noValidate` suppresses the browser's own validation bubble; the
          `required` / `type` attributes stay for screen readers. The shared
          validator in handleSubmit provides the messages instead. */}
      <form onSubmit={handleSubmit} noValidate>
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

        <div className="grid grid-cols-1 gap-x-8 gt520:grid-cols-2">
          <Field id="name" label="Full name" error={fieldErrors.name} nudge={nudging && Boolean(fieldErrors.name)} onNudgeEnd={() => setNudging(false)}>
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
          <Field id="email" label="Email" error={fieldErrors.email} nudge={nudging && Boolean(fieldErrors.email)} onNudgeEnd={() => setNudging(false)}>
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

        <div className="grid grid-cols-1 gap-x-8 gt520:grid-cols-2">
          <Field id="business" label="Business name" error={fieldErrors.business} nudge={nudging && Boolean(fieldErrors.business)} onNudgeEnd={() => setNudging(false)}>
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
          <Field id="phone" label="Phone number" error={fieldErrors.phone} nudge={nudging && Boolean(fieldErrors.phone)} onNudgeEnd={() => setNudging(false)}>
            <input
              type="tel"
              id="phone"
              name="phone"
              inputMode="tel"
              autoComplete="tel"
              placeholder="Your phone number"
              value={values.phone}
              onChange={update}
              disabled={isSending}
              className={controlClass('phone')}
              {...errorProps('phone')}
            />
          </Field>
        </div>

        <Field
          id="message"
          label="Tell me about your business"
          error={fieldErrors.message}
          nudge={nudging && Boolean(fieldErrors.message)}
          onNudgeEnd={() => setNudging(false)}
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

        {/* Multi-select: picking nothing is a valid answer and reads as
            "Not specified" in the notification email. */}
        <fieldset className="mb-6">
          <legend className={LABEL}>
            How can we help you?
          </legend>
          <div className="flex flex-wrap gap-2.5">
            {SERVICE_CHOICES.map(({ value, label }) => (
              <ChoiceChip
                key={value}
                selected={values.services.includes(value)}
                onClick={() => toggleService(value)}
                disabled={isSending}
              >
                {label}
              </ChoiceChip>
            ))}
          </div>
        </fieldset>

        <Button type="submit" variant="ink" disabled={isSending}>
          {isSending ? 'Sending…' : 'Send Message'}
        </Button>
      </form>
    </div>
  )
}
