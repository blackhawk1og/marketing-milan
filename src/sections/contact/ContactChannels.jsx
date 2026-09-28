import {
  ArrowIcon,
  FacebookIcon,
  InstagramIcon,
  WhatsAppIcon,
} from '../../components/Icons'
import Tag from '../../components/ui/Tag'
import { CONTACT, SERVICE_LINKS } from '../../data/site'

const LABEL =
  'font-body text-[0.75rem] gt640:text-[0.7rem] font-semibold tracking-[0.18em] text-ink-700 uppercase'

// Same URLs the footer uses, so the two never drift apart.
const CHANNELS = [
  {
    href: CONTACT.instagram,
    name: 'Instagram',
    detail: CONTACT.instagramHandle,
    Icon: InstagramIcon,
  },
  {
    href: CONTACT.whatsapp,
    name: 'WhatsApp',
    detail: CONTACT.phone,
    Icon: WhatsAppIcon,
  },
  {
    href: CONTACT.facebook,
    name: 'Facebook',
    detail: 'Message the page',
    Icon: FacebookIcon,
  },
]

/**
 * Right column of the Contact page: the social channels, then the services as
 * plain tags. Informational only — nothing here is selectable.
 */
export default function ContactChannels() {
  return (
    <div className="reveal rounded-brand-md border border-ink-950/10 bg-cream-50 p-6 gt640:p-8">
      <p className={LABEL}>Find me on</p>
      <ul className="mt-4 flex list-none flex-col gap-1 p-0">
        {CHANNELS.map(({ href, name, detail, Icon }) => (
          <li key={href}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group -mx-2 flex min-h-11 items-center gap-4 rounded-brand-sm px-2 py-3 transition-colors duration-[250ms] hover:bg-cream-200"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-[1.5px] border-ink-950/14 text-forest-900 transition-colors duration-[250ms] group-hover:border-forest-900 group-hover:bg-forest-900 group-hover:text-white">
                <Icon className="h-5 w-5" />
              </span>
              <span className="min-w-0">
                <span className="block font-display text-[1.02rem] font-semibold text-ink-900">
                  {name}
                </span>
                {/* A step down on the narrowest phones, so the Instagram
                    handle still fits on one line beside the icon. */}
                <span className="block text-[0.8rem] gt520:text-[0.9rem] text-ink-700 wrap-anywhere">
                  {detail}
                </span>
              </span>
              <ArrowIcon className="ml-auto text-ink-700 transition-colors duration-[250ms] group-hover:text-forest-900" />
            </a>
          </li>
        ))}
      </ul>

      <hr className="my-8 border-ink-950/10" />

      <p className={LABEL}>What we can help with</p>
      <ul className="mt-4 flex list-none flex-wrap gap-2 p-0">
        {SERVICE_LINKS.map(({ label }) => (
          <li key={label} className="flex">
            <Tag>{label}</Tag>
          </li>
        ))}
      </ul>
    </div>
  )
}
