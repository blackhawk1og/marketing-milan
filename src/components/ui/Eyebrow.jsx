import { eyebrowTone, useTone } from '../../lib/tone'

export default function Eyebrow({ className = '', children }) {
  const tone = useTone()
  return (
    <p
      className={`inline-flex items-center font-body text-[0.78rem] font-bold tracking-[0.14em] uppercase mb-[1.1em] ${eyebrowTone(tone)} ${className}`}
    >
      {/* Zero-width stand-in for the dash that used to lead the label: as the
          first flex item it sets the baseline, so the label and everything
          below it keep their original positions (without it, all shift ~3px). */}
      <span aria-hidden="true" className="inline-block h-0.5 w-0" />
      {children}
    </p>
  )
}
