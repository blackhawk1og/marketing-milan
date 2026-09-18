import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Logo from './Logo'
import Button from './ui/Button'
import { NAV_LINKS } from '../data/site'

const NAV_LINK_BASE =
  "relative w-full border-b border-ink-950/6 py-3 text-[0.94rem] font-semibold transition-colors duration-200 ease-brand gt860:w-auto gt860:border-b-0 gt860:py-1"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-4 z-[100] mx-[100px] rounded-full bg-cream-50 shadow-[0_12px_30px_-14px_rgba(20,19,15,.25)]">
      <div className="mx-auto flex w-full max-w-[1360px] items-center justify-between gap-5 px-5 py-2">
        <Logo />

        <nav
          id="siteNav"
          className={`absolute top-[calc(100%+8px)] right-0 left-0 flex origin-top flex-col items-start gap-0 rounded-brand-md bg-cream-50 px-6 pt-2 pb-5 shadow-[0_20px_40px_-18px_rgba(20,19,15,.3)] [transition:transform_.25s_var(--ease-brand),opacity_.2s_var(--ease-brand)] gt860:static gt860:flex-row gt860:items-center gt860:gap-[34px] gt860:rounded-none gt860:bg-transparent gt860:p-0 gt860:shadow-none gt860:pointer-events-auto gt860:scale-y-100 gt860:opacity-100 ${
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
                `${NAV_LINK_BASE} ${
                  isActive
                    ? "text-forest-950 after:absolute after:-bottom-1 after:right-0 after:left-0 after:h-0.5 after:bg-gold-500 after:content-['']"
                    : 'text-ink-700 hover:text-forest-950'
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
          <div className="hidden gt860:block">
            <Button to="/contact">Let&apos;s Talk</Button>
          </div>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            aria-controls="siteNav"
            onClick={() => setIsOpen((open) => !open)}
            className="flex h-[38px] w-[38px] cursor-pointer flex-col justify-center gap-[5px] border-none bg-none p-0 gt860:hidden"
          >
            <span
              className={`block h-0.5 w-full rounded-sm bg-forest-950 transition-[transform,opacity] duration-[250ms] ease-brand ${isOpen ? 'translate-y-[7px] rotate-45' : ''}`}
            />
            <span
              className={`block h-0.5 w-full rounded-sm bg-forest-950 transition-[transform,opacity] duration-[250ms] ease-brand ${isOpen ? 'opacity-0' : ''}`}
            />
            <span
              className={`block h-0.5 w-full rounded-sm bg-forest-950 transition-[transform,opacity] duration-[250ms] ease-brand ${isOpen ? '-translate-y-[7px] -rotate-45' : ''}`}
            />
          </button>
        </div>
      </div>
    </header>
  )
}
