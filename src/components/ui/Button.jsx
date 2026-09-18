import { Link } from 'react-router-dom'

// Each variant carries its own border-color: a shared `border-transparent` in
// BASE would out-order the variant's color in the generated stylesheet.
const BASE =
  'inline-flex items-center gap-[0.5em] font-body text-[0.95rem] font-bold px-[1.6em] py-[0.85em] rounded-full border-[1.5px] cursor-pointer whitespace-nowrap transition-[transform,background-color,color,border-color] duration-[250ms] ease-brand hover:-translate-y-0.5'

const VARIANTS = {
  gold: 'border-transparent bg-gold-500 text-ink-950 hover:bg-gold-400',
  'outline-light': 'border-white/40 text-white hover:border-white hover:bg-white/8',
  'outline-dark':
    'border-forest-900 text-forest-900 hover:bg-forest-900 hover:text-white',
}

/** Renders a router <Link>, a plain <a>, or a <button> depending on props. */
export default function Button({
  variant = 'gold',
  block = false,
  to,
  href,
  className = '',
  children,
  ...rest
}) {
  const classes = `${BASE} ${VARIANTS[variant]} ${block ? 'w-full justify-center' : ''} ${className}`

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
