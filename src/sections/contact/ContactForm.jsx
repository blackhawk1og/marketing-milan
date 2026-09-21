import { useState } from 'react'
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
  'peer w-full border-b bg-transparent px-0 py-2 font-body text-[1.05rem] text-ink-900 transition-colors duration-200 ease-brand placeholder:text-ink-700/45 focus:outline-none [&:-webkit-autofill]:shadow-[inset_0_0_0_1000px_var(--color-cream-100)] [&:-webkit-autofill]:[-webkit-text-fill-color:var(--color-ink-900)]'
const CONTROL_IDLE = 'border-b-ink-950/25'
const CONTROL_INVALID = 'border-b-red-700'

const GROUP_LABEL =
  'mb-2 block font-body text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-ink-950'

// Rests inside the empty field like a placeholder, then shrinks above it once
// the field is focused or filled, so the field's name never disappears.
// `placeholder=" "` on the input is what makes `:placeholder-shown` mean "empty".
// top-6 = the wrapper's pt-4 + the input's py-2, so the resting label sits
// exactly on the input's text line; keep the three in step.
const FLOAT_LABEL =
  'pointer-events-none absolute top-6 left-0 origin-left font-body text-[1.05rem] text-ink-700/55 transition-[translate,scale,color] duration-200 ease-brand peer-focus:-translate-y-6 peer-focus:scale-[0.8] peer-focus:text-ink-900 peer-[:not(:placeholder-shown)]:-translate-y-6 peer-[:not(:placeholder-shown)]:scale-[0.8]'

const ERROR_TEXT = 'mt-1.5 text-[0.8rem] font-semibold text-red-700'

const EMPTY = {
  name: '',
  email: '',
  business: '',
  phone: '',
  message: '',
  // Shared module-level array: only ever replaced, never mutated in place.
  services: [],
}

/** Focus bar that grows along the underline; red while the field is invalid. */
function FocusBar({ invalid }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 transition-transform duration-300 ease-brand peer-focus:scale-x-100 motion-reduce:transition-none ${
        invalid ? 'bg-red-700' : 'bg-forest-900'
      }`}
    />
  )
}

function Nudge({ active, onEnd, children }) {
  return (
    <div className={active ? 'animate-nudge motion-reduce:animate-none' : ''} onAnimationEnd={onEnd}>
      {children}
    </div>
  )
}

export default function ContactForm() {
  const [values, setValues] = useState(EMPTY)
  const [fieldErrors, setFieldErrors] = useState({})
  // Cleared on animationend rather than keyed off `fieldErrors`: re-applying the
  // same class does not replay a CSS animation, so a second submit with the same
  // errors would otherwise sit still.
  const [nudging, setNudging] = useState(false)

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

  const handleSubmit = (event) => {
    event.preventDefault()

    // Same rules and wording the send endpoint uses, standing in for the
    // browser's native bubble, which `noValidate` switches off.
    const { errors } = validate(values)
    if (errors) {
      setFieldErrors(errors)
      setNudging(true)
      const firstInvalid = FIELD_ORDER.find((field) => errors[field])
      if (firstInvalid) document.getElementById(firstInvalid)?.focus()
      return
    }

    setFieldErrors({})
    // Sending is not wired up yet: nothing leaves the page. The existing
    // endpoint (POST /api/contact, which accepts exactly `values`) is still in
    // place for when delivery is decided.
  }

  const fieldProps = (field) => ({
    id: field,
    name: field,
    value: values[field],
    onChange: update,
    ...(fieldErrors[field]
      ? { 'aria-invalid': true, 'aria-describedby': `${field}-error` }
      : {}),
  })

  const textField = (field, label, inputProps = {}) => {
    const error = fieldErrors[field]
    return (
      <Nudge active={nudging && Boolean(error)} onEnd={() => setNudging(false)}>
        <div className="relative pt-5">
          <input
            type="text"
            placeholder=" "
            {...inputProps}
            {...fieldProps(field)}
            className={`${CONTROL} ${error ? CONTROL_INVALID : CONTROL_IDLE}`}
          />
          <label htmlFor={field} className={FLOAT_LABEL}>
            {label}
          </label>
          <FocusBar invalid={Boolean(error)} />
        </div>
        {error && (
          <p id={`${field}-error`} className={ERROR_TEXT}>
            {error}
          </p>
        )}
      </Nudge>
    )
  }

  return (
    // `noValidate` suppresses the browser's own validation bubble; the
    // `required` / `type` attributes stay for screen readers.
    <form onSubmit={handleSubmit} noValidate>
      <fieldset className="mb-8 mt-6">
        <legend className={GROUP_LABEL}>Contact information</legend>
        <div className="grid grid-cols-1 gap-x-8 gap-y-2 gt520:grid-cols-2">
          {textField('name', 'Name', { required: true, autoComplete: 'name' })}
          {textField('email', 'Email', { type: 'email', required: true, autoComplete: 'email' })}
          {textField('business', 'Business name (optional)', { autoComplete: 'organization' })}
          {textField('phone', 'Phone (optional)', { type: 'tel', inputMode: 'tel', autoComplete: 'tel' })}
        </div>
      </fieldset>

      {/* Multi-select: picking nothing is a valid answer. */}
      <fieldset className="mb-8">
        <legend className={GROUP_LABEL}>You&apos;re interested in</legend>
        <div className="flex flex-wrap gap-2.5">
          {SERVICE_CHOICES.map(({ value, label }) => (
            <ChoiceChip
              key={value}
              selected={values.services.includes(value)}
              onClick={() => toggleService(value)}
            >
              {label}
            </ChoiceChip>
          ))}
        </div>
      </fieldset>

      <Nudge active={nudging && Boolean(fieldErrors.message)} onEnd={() => setNudging(false)}>
        <label htmlFor="message" className={GROUP_LABEL}>
          About the project
        </label>
        <div className="relative">
          <textarea
            placeholder="Describe the task"
            required
            {...fieldProps('message')}
            className={`${CONTROL} ${fieldErrors.message ? CONTROL_INVALID : CONTROL_IDLE} block min-h-[120px] resize-y`}
          />
          <FocusBar invalid={Boolean(fieldErrors.message)} />
        </div>
        {fieldErrors.message && (
          <p id="message-error" className={ERROR_TEXT}>
            {fieldErrors.message}
          </p>
        )}
      </Nudge>

      <Button type="submit" variant="ink" block className="mt-6">
        Submit
      </Button>
    </form>
  )
}
