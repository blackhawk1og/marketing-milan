import { Link } from 'react-router-dom'

/** `.card-link` — arrow nudges right on parent card hover (see `group` on Card). */
export default function ArrowLink({ to, className = '', children }) {
  return (
    <Link
      to={to}
      className={`mt-4 inline-flex items-center gap-[0.4em] text-[0.9rem] font-bold text-forest-900 ${className}`}
    >
      {children}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
        className="h-3.5 w-3.5 transition-transform duration-[250ms] ease-brand group-hover:translate-x-1"
      >
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </Link>
  )
}
