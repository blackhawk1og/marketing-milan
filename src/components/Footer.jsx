import { Link } from 'react-router-dom'
import Logo from './Logo'
import { FacebookIcon, InstagramIcon } from './Icons'
import whatsappIcon from '../assets/Icons/whatsapp.png'
import { CONTACT, NAV_LINKS, SERVICE_LINKS } from '../data/site'

// Round social buttons: 47px on touch screens, 41px from gt640.
const SOCIAL =
  'flex h-[47px] w-[47px] items-center justify-center rounded-full border border-cream-100/20 transition-colors duration-200 ease-brand hover:border-accent-400 hover:text-accent-400 gt640:h-[41px] gt640:w-[41px]'

const COL_LINK =
  'block min-h-11 py-2.5 gt640:min-h-auto gt640:py-1.5 text-[0.92rem] transition-colors duration-200 ease-brand hover:text-accent-400'

function FooterCol({ title, children }) {
  return (
    <div>
      <h4 className="mb-[1.2em] font-display text-[0.78rem] uppercase tracking-[0.1em] text-cream-100/45">
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
          <Logo nameClassName="text-white" taglineClassName="text-accent-400" />
          <p className="mt-3.5 mb-[1em] max-w-[280px] text-[0.92rem] text-pretty">
            Solution that fits to you and your products.
          </p>
          <div className="mt-5 flex gap-3">
            <a
              href={CONTACT.instagram}
              target="_blank"
              rel="noopener"
              aria-label="Instagram"
              className={SOCIAL}
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
            <a
              href={CONTACT.facebook}
              target="_blank"
              rel="noopener"
              aria-label="Facebook"
              className={SOCIAL}
            >
              <FacebookIcon className="h-4 w-4" />
            </a>
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener"
              aria-label="WhatsApp"
              className={SOCIAL}
            >
              {/* The PNG is a black glyph; used as a mask it takes the link's
                  text colour, so it matches the other icons and their hover. */}
              <span
                aria-hidden="true"
                className="h-4 w-4 bg-current [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain]"
                style={{ maskImage: `url(${whatsappIcon})` }}
              />
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
