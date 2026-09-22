import { Link } from 'react-router-dom'
import { ArrowIcon } from '../Icons'

/** `.card-link` — arrow nudges right on parent card hover (see `group` on Card). */
export default function ArrowLink({ to, className = '', children }) {
  return (
    <Link
      to={to}
      className={`mt-1 inline-flex min-h-11 items-center gap-[0.4em] text-[0.9rem] font-bold text-forest-900 gt640:mt-4 gt640:min-h-auto ${className}`}
    >
      {children}
      <ArrowIcon />
    </Link>
  )
}
