import { badgeTone, useTone } from '../../lib/tone'

export default function BadgeNum({ className = '', children }) {
  return (
    <span
      className={`inline-flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-brand-sm font-display text-[1.1rem] font-bold text-ink-950 ${badgeTone(useTone())} ${className}`}
    >
      {children}
    </span>
  )
}
