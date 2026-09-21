import { Link } from 'react-router-dom'

// Each variant carries its own border-color AND border-radius: sharing either in
// BASE would out-order the variant's value in the generated stylesheet, so a
// variant could never override it.
// The `disabled:` utilities carry a :disabled pseudo-class, so they out-specify
// the base `cursor-pointer` / `hover:` rules regardless of stylesheet order.
const BASE =
  'inline-flex items-center gap-[0.5em] font-body text-[0.95rem] font-bold px-[1.6em] py-[0.85em] border-[1.5px] cursor-pointer whitespace-nowrap transition-[transform,background-color,color,border-color] duration-[250ms] ease-brand hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0'

const VARIANTS = {
  gold: 'rounded-full border-transparent bg-gold-500 text-ink-950 hover:bg-gold-400',
  'outline-light':
    'rounded-full border-white/40 text-white hover:border-white hover:bg-white/8',
  'outline-dark':
    'rounded-full border-forest-900 text-forest-900 hover:bg-forest-900 hover:text-white',
  // Square near-black block used by the contact form.
  ink: 'rounded-none border-transparent bg-ink-950 text-white uppercase tracking-[0.12em] hover:bg-ink-900',
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
