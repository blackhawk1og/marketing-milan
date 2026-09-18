import { eyebrowTone, useTone } from '../../lib/tone'

export default function Eyebrow({ className = '', children }) {
  const tone = useTone()
  return (
    <p
      className={`inline-flex items-center gap-[0.5em] font-body text-[0.78rem] font-bold tracking-[0.14em] uppercase mb-[1.1em] ${eyebrowTone(tone)} ${className}`}
    >
      <span aria-hidden="true" className="inline-block h-0.5 w-4 bg-gold-500" />
      {children}
    </p>
  )
}
