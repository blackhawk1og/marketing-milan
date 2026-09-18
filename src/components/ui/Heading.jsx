import { headingTone, useTone } from '../../lib/tone'

const SIZES = {
  display: 'text-display',
  xl: 'text-h-xl',
  lg: 'text-h-lg',
  md: 'text-h-md',
  statement: 'text-statement',
  manifesto: 'text-manifesto',
  card: 'text-[1.25rem]',
  pillar: 'text-[1.2rem]',
  /* The mockup left these at the browser's default h3 size; Tailwind's
     preflight resets headings to 1em, so restore it explicitly. */
  h3: 'text-[1.17em]',
  inherit: '',
}

// Exactly one margin class is emitted — two would be resolved by stylesheet
// order rather than by which one was written last.
const MARGINS = { card: 'mb-[0.4em]' }

/** `flush` drops the bottom margin; passing `mb-0` via className would not win. */
export default function Heading({
  as: Tag = 'h2',
  size = 'lg',
  flush = false,
  className = '',
  children,
}) {
  const tone = useTone()
  const margin = flush ? '' : (MARGINS[size] ?? 'mb-[0.5em]')
  return (
    <Tag
      className={`font-display font-semibold leading-[1.08] tracking-[-0.01em] text-balance ${margin} ${SIZES[size]} ${headingTone(tone)} ${className}`}
    >
      {children}
    </Tag>
  )
}
