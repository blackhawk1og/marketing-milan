import { ToneContext } from '../../lib/tone'

const TONE_BG = {
  cream: 'bg-cream-100',
  dark: 'bg-forest-950 text-cream-100',
  ink: 'bg-ink-950 text-cream-100',
}

export default function Section({
  tone = 'cream',
  className = '',
  id,
  children,
}) {
  return (
    <ToneContext value={tone}>
      <section id={id} className={`py-section ${TONE_BG[tone]} ${className}`}>
        {children}
      </section>
    </ToneContext>
  )
}
