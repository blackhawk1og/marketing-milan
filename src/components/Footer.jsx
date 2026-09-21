import { Link } from 'react-router-dom'
import Logo from './Logo'
import { FacebookIcon, InstagramIcon, PhoneIcon } from './Icons'
import { CONTACT, NAV_LINKS, SERVICE_LINKS } from '../data/site'

const COL_LINK =
  'block py-1.5 text-[0.92rem] transition-colors duration-200 ease-brand hover:text-gold-400'

function FooterCol({ title, children }) {
  return (
    <div>
      <h4 className="mb-[1.2em] font-body text-[0.78rem] uppercase tracking-[0.1em] text-cream-100/45">
        {title}
      </h4>
      {children}
    </div>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-ink-950 pt-16 text-cream-100/70">
      <div className="mx-auto grid w-full max-w-[1360px] grid-cols-1 gap-10 px-gutter pb-12 gt520:grid-cols-2 gt820:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Logo nameClassName="text-white" />
          <p className="mt-3.5 mb-[1em] max-w-[280px] text-[0.92rem] text-pretty">
            Solution that fits to you and your products.
          </p>
          <div className="mt-5 flex gap-3">
            <a
              href={CONTACT.instagram}
              target="_blank"
              rel="noopener"
              aria-label="Instagram"
              className="flex h-[38px] w-[38px] items-center justify-center rounded-full border border-cream-100/20 transition-colors duration-200 ease-brand hover:border-gold-400 hover:text-gold-400"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
            <a
              href={CONTACT.facebook}
              target="_blank"
              rel="noopener"
              aria-label="Facebook"
              className="flex h-[38px] w-[38px] items-center justify-center rounded-full border border-cream-100/20 transition-colors duration-200 ease-brand hover:border-gold-400 hover:text-gold-400"
            >
              <FacebookIcon className="h-4 w-4" />
            </a>
            <a
              href={CONTACT.phoneHref}
              aria-label="Phone"
              className="flex h-[38px] w-[38px] items-center justify-center rounded-full border border-cream-100/20 transition-colors duration-200 ease-brand hover:border-gold-400 hover:text-gold-400"
            >
              <PhoneIcon className="h-4 w-4" />
            </a>
          </div>
        </div>

        <FooterCol title="Sitemap">
          {NAV_LINKS.map(({ to, label }) => (
            <Link key={to} to={to} className={COL_LINK}>
              {label}
            </Link>
          ))}
        </FooterCol>

        <FooterCol title="Services">
          {SERVICE_LINKS.map(({ to, label }) => (
            <Link key={to} to={to} className={COL_LINK}>
              {label}
            </Link>
          ))}
        </FooterCol>

        <FooterCol title="Contact">
          <a href={CONTACT.phoneHref} className={COL_LINK}>
            {CONTACT.phone}
          </a>
          <a
            href={CONTACT.instagram}
            target="_blank"
            rel="noopener"
            className={COL_LINK}
          >
            {CONTACT.instagramHandle}
          </a>
          <a href={CONTACT.emailHref} className={COL_LINK}>
            {CONTACT.email}
          </a>
          <p className="mt-2.5 mb-[1em] text-[0.85rem] text-pretty">
            Based in Nepal · Working with clients worldwide
          </p>
        </FooterCol>
      </div>

      <div className="mx-auto flex w-full max-w-[1360px] flex-wrap justify-between gap-2.5 border-t border-cream-100/10 px-gutter py-[22px] text-[0.82rem]">
        <p className="mb-[1em] text-pretty">
          © {year} Milan Sunuwar Digital Marketing. All rights reserved.
        </p>
        <p className="mb-[1em] text-pretty">
          Different gets noticed. Recognizable gets remembered.
        </p>
      </div>
    </footer>
  )
}
