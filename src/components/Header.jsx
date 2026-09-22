import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Logo from './Logo'
import { ArrowIcon } from './Icons'
import Button from './ui/Button'
import { NAV_LINKS } from '../data/site'

// Everything below gt1023 collapses into the menu at once: the links and
// the button together. Between 861px and ~975px the full row used to spill
// out of the bar, so the switch sits where it actually fits.
const NAV_LINK_BASE =
  "relative w-full border-b border-ink-950/6 py-3 text-[0.94rem] font-semibold transition-colors duration-200 ease-brand gt1023:w-auto gt1023:border-b-0 gt1023:py-1"

// Desktop hover underline: a thin accent-green line, scaled to nothing at rest, that
// wipes in from the left on hover/focus. The transition lives only on the
// hover/focus state, so on leave the line simply disappears rather than
// shrinking back. No link keeps it drawn — the current page is marked by its
// darker text alone.
const UNDERLINE =
  "gt1023:after:absolute gt1023:after:inset-x-0 gt1023:after:-bottom-1 gt1023:after:h-px gt1023:after:bg-accent-500 gt1023:after:content-[''] gt1023:after:origin-left gt1023:after:scale-x-0 gt1023:hover:after:scale-x-100 gt1023:hover:after:transition-transform gt1023:hover:after:duration-300 gt1023:hover:after:ease-brand gt1023:focus-visible:after:scale-x-100 gt1023:focus-visible:after:transition-transform gt1023:focus-visible:after:duration-300 gt1023:focus-visible:after:ease-brand"

// A 44px tap area around a 22px icon, so the icon stays in proportion with
// the logo instead of filling the whole target.
const BAR =
  'block h-0.5 w-[22px] rounded-full bg-forest-950 transition-[translate,rotate,opacity] duration-[250ms] ease-brand'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  // At the top of the page the bar sits flush, marked off by its hairline
  // border; once the page scrolls under it, it lifts with a soft shadow.
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-[100] w-full border-b border-ink-950/8 bg-cream-50 transition-shadow duration-300 ease-brand ${
        scrolled ? 'shadow-[0_10px_30px_-18px_rgba(20,19,15,.35)]' : ''
      }`}
    >
      {/* Same width and gutter as the page's Container, so the logo and the
          button line up with the content below. */}
      <div className="mx-auto flex w-full max-w-[1360px] items-center justify-between gap-5 px-gutter py-2">
        <Logo />

        <nav
          id="siteNav"
          className={`absolute top-full right-0 left-0 flex origin-top flex-col items-start gap-0 border-b border-ink-950/8 bg-cream-50 px-gutter pt-2 pb-5 shadow-[0_20px_40px_-18px_rgba(20,19,15,.3)] [transition:transform_.25s_var(--ease-brand),opacity_.2s_var(--ease-brand)] gt1023:static gt1023:flex-row gt1023:items-center gt1023:gap-[34px] gt1023:border-b-0 gt1023:bg-transparent gt1023:p-0 gt1023:shadow-none gt1023:pointer-events-auto gt1023:scale-y-100 gt1023:opacity-100 ${
            isOpen
              ? 'pointer-events-auto scale-y-100 opacity-100'
              : 'pointer-events-none scale-y-0 opacity-0'
          }`}
        >
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `${NAV_LINK_BASE} ${UNDERLINE} ${
                  isActive ? 'text-forest-950' : 'text-ink-700 hover:text-forest-950'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {/* Wrapped rather than given a `hidden` class: Button's own
              `inline-flex` would out-order it in the generated stylesheet. */}
          <div className="hidden gt1023:block">
            <Button to="/contact" className="group">
              Contact us <ArrowIcon />
            </Button>
          </div>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            aria-controls="siteNav"
            onClick={() => setIsOpen((open) => !open)}
            className="flex h-11 w-11 cursor-pointer flex-col items-center justify-center gap-[5px] border-none bg-none p-0 gt1023:hidden"
          >
            {/* 7px = one bar + the gap, so the outer bars meet in an X. */}
            <span className={`${BAR} ${isOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
            <span className={`${BAR} ${isOpen ? 'opacity-0' : ''}`} />
            <span className={`${BAR} ${isOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
          </button>
        </div>
      </div>
    </header>
  )
}
