import Button from '../../components/ui/Button'
import Heading from '../../components/ui/Heading'
import {
  InstagramIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
} from '../../components/Icons'
import { CONTACT } from '../../data/site'

const ICON = 'h-5 w-5 shrink-0 text-gold-400'
const LABEL =
  'mb-0.5 block text-[0.72rem] uppercase tracking-[0.08em] text-cream-100/55'

function Line({ icon, children }) {
  return (
    <div className="flex items-center gap-3.5 border-t border-white/12 py-3.5 first-of-type:border-t-0">
      {icon}
      <div>{children}</div>
    </div>
  )
}

export default function ContactInfoCard() {
  return (
    <div className="rounded-brand-lg bg-forest-950 p-9 text-cream-100">
      <Heading as="h3" size="h3" className="text-white">
        Direct contact
      </Heading>
      <p className="mb-[1em] text-pretty text-cream-100/70">
        Prefer to skip the form? Reach out directly.
      </p>

      <Line icon={<PhoneIcon className={ICON} />}>
        <span className={LABEL}>Phone / WhatsApp</span>
        <a href={CONTACT.phoneHref} className="font-bold">
          {CONTACT.phone}
        </a>
      </Line>

      <Line icon={<InstagramIcon className={ICON} />}>
        <span className={LABEL}>Instagram</span>
        <a
          href={CONTACT.instagram}
          target="_blank"
          rel="noopener"
          className="font-bold"
        >
          {CONTACT.instagramHandle}
        </a>
      </Line>

      <Line icon={<MailIcon className={ICON} />}>
        <span className={LABEL}>Email</span>
        <a href={CONTACT.emailHref} className="font-bold">
          {CONTACT.email}
        </a>
      </Line>

      <Line icon={<MapPinIcon className={ICON} />}>
        <span className={LABEL}>Location</span>
        <span className="block font-bold text-cream-100">
          {CONTACT.location}
        </span>
      </Line>

      <Button
        href={CONTACT.whatsapp}
        target="_blank"
        rel="noopener"
        variant="outline-light"
        block
        className="mt-6"
      >
        Message on WhatsApp
      </Button>
    </div>
  )
}
