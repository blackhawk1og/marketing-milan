/**
 * `variant` picks the surface rather than letting callers pass a competing
 * background class — Tailwind resolves same-property utilities by stylesheet
 * order, not by the order they appear in the attribute.
 */
const VARIANTS = {
  light: 'border border-ink-950/8 bg-white hover:border-ink-950/14',
  dark: 'border-none bg-forest-950 text-cream-100',
}

export default function Card({ variant = 'light', className = '', children }) {
  return (
    <div
      className={`group rounded-brand-md p-8 transition-[transform,box-shadow,border-color] duration-300 ease-brand hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_rgba(14,58,43,.35)] ${VARIANTS[variant]} ${className}`}
    >
      {children}
    </div>
  )
}
