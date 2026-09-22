import { Link } from 'react-router-dom'
import { ArrowIcon } from '../Icons'

/**
 * `.card-link` — arrow nudges right on parent card hover (see `group` on Card).
 * `color` replaces the default text colour; passing one through `className`
 * would depend on which class Tailwind happens to emit last.
 */
export default function ArrowLink({ to, color = 'text-forest-900', className = '', children }) {
  return (
    <Link
      to={to}
      className={`mt-1 inline-flex min-h-11 items-center gap-[0.4em] text-[0.9rem] font-bold ${color} gt640:mt-4 gt640:min-h-auto ${className}`}
    >
      {children}
      <ArrowIcon />
    </Link>
  )
}
