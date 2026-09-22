import { Link } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'

const BASE =
  'inline-flex items-center gap-[0.5em] rounded-brand font-body text-white text-[0.95rem] font-bold px-[1.6em] py-[0.7em] border-[1.5px] cursor-pointer whitespace-nowrap transition-[transform,background-color,color,border-color] duration-[250ms] ease-brand hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0'

const VARIANTS = {
  accent:
    'border-transparent bg-accent-500 hover:bg-accent-400',

  'outline-light':
    'border-white/40 hover:border-white hover:bg-white/8',

  'outline-dark':
    'border-forest-900 hover:bg-forest-900 hover:text-white',

  ink:
    'border-transparent bg-ink-950 uppercase tracking-[0.12em] hover:bg-ink-900',
}

/** Renders a router <Link>, a plain <a>, or a <button> depending on props. */
export default function Button({
  variant = 'accent',
  block = false,
  to,
  href,
  className = '',
  children,
  ...rest
}) {
  const classes = twMerge(
    BASE,
    VARIANTS[variant],
    block && 'w-full justify-center',
    className
  )

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    )
  }

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  )
}