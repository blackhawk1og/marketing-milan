import { useEffect, useRef, useState } from 'react'
import Button from '../../components/ui/Button'

const CONTROL =
  'w-full rounded-brand-sm border-[1.5px] border-ink-950/18 bg-white px-[1em] py-[0.85em] font-body text-base text-ink-900 transition-colors duration-200 ease-brand focus:border-forest-800 focus:outline-none'

const EMPTY = {
  name: '',
  email: '',
  business: '',
  service: '',
  message: '',
}

const SERVICE_OPTIONS = [
  { value: '', label: 'Not sure yet' },
  { value: 'social', label: 'Social Media' },
  { value: 'meta-ads', label: 'Meta Ads' },
  { value: 'ppc', label: 'PPC' },
  { value: 'email', label: 'Email Marketing' },
  { value: 'web', label: 'Web Development' },
  { value: 'multiple', label: 'A few of these together' },
]

function Field({ id, label, children }) {
  return (
    <div className="mb-5">
      <label
        htmlFor={id}
        className="mb-[0.5em] block text-[0.85rem] font-bold text-ink-900"
      >
        {label}
      </label>
      {children}
    </div>
  )
}

export default function ContactForm() {
  const [values, setValues] = useState(EMPTY)
  const [isSent, setIsSent] = useState(false)
  const successRef = useRef(null)

  const update = (event) => {
    const { name, value } = event.target
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setIsSent(true)
    setValues(EMPTY)
  }

  // Matches the mockup: the confirmation is scrolled into view once shown.
  useEffect(() => {
    if (isSent) {
      successRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [isSent])

  return (
    <div>
      {isSent && (
        <div
          ref={successRef}
          className="mb-6 rounded-brand-md bg-forest-950 px-[22px] py-5 font-semibold text-cream-100"
        >
          Thanks &mdash; your message has been received. I&apos;ll get back to
          you within a day. <br />
          <small>(This is a demo form; no data is actually sent yet.)</small>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-5 gt520:grid-cols-2">
          <Field id="name" label="Full name">
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your name"
              required
              value={values.name}
              onChange={update}
              className={CONTROL}
            />
          </Field>
          <Field id="email" label="Email">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@business.com"
              required
              value={values.email}
              onChange={update}
              className={CONTROL}
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 gap-5 gt520:grid-cols-2">
          <Field id="business" label="Business name">
            <input
              type="text"
              id="business"
              name="business"
              placeholder="Your business"
              value={values.business}
              onChange={update}
              className={CONTROL}
            />
          </Field>
          <Field id="service" label="Service you're interested in">
            <select
              id="service"
              name="service"
              value={values.service}
              onChange={update}
              className={CONTROL}
            >
              {SERVICE_OPTIONS.map(({ value, label }) => (
                <option key={label} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <Field id="message" label="Tell me about your business">
          <textarea
            id="message"
            name="message"
            placeholder="What are you trying to grow, and what have you tried so far?"
            required
            value={values.message}
            onChange={update}
            className={`${CONTROL} min-h-[130px] resize-y`}
          />
        </Field>

        <Button type="submit" block>
          Send Message
        </Button>
      </form>
    </div>
  )
}
