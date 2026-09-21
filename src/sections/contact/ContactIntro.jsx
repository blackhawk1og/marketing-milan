import Heading from "../../components/ui/Heading";
import Lede from "../../components/ui/Lede";
import {
  FacebookIcon,
  InstagramIcon,
  WhatsAppIcon,
} from "../../components/Icons";
import { CONTACT } from "../../data/site";

const LINKS = [
  {
    href: CONTACT.instagram,
    label: `Instagram ${CONTACT.instagramHandle}`,
    Icon: InstagramIcon,
    external: true,
  },
  {
    href: CONTACT.whatsapp,
    label: "Message on WhatsApp",
    Icon: WhatsAppIcon,
    external: true,
  },
  { href: CONTACT.facebook, label: "Facebook", Icon: FacebookIcon, external: true },
];

/** Left column of the Contact page: what to expect, and how else to reach me. */
export default function ContactIntro() {
  return (
      <div className="@container">
        <Heading as="h1" size="display">
          Contacts
        </Heading>
        <Lede className="max-w-[460px]">
          Tell me about your business and what you&apos;re trying to grow. Fill
          out the form and I&apos;ll reply personally, usually within a day.
        </Lede>

        <hr className="my-10 border-ink-950/10" />

        <p className="mb-2 font-body text-[0.75rem] gt640:text-[0.7rem] font-semibold tracking-[0.18em] text-ink-700 uppercase">
          Email
        </p>
        {/* Sized to the column (cqw), not the viewport, so the address stays on
          one line in the two-column layout and on phones alike; the address
          is ~12× its font size wide. wrap-anywhere is only a safety net. */}
        <a
          href={CONTACT.emailHref}
          className="flex min-h-11 items-center gt640:inline gt640:min-h-auto font-display text-[clamp(1.25rem,7.8cqw,2.4rem)] leading-[1.1] font-semibold tracking-[-0.01em] text-ink-900 transition-colors duration-[250ms] wrap-anywhere hover:text-forest-700"
        >
          {CONTACT.email}
        </a>

        <ul className="mt-8 flex list-none gap-3 p-0">
          {LINKS.map(({ href, label, Icon, external }) => (
            <li key={href}>
              <a
                href={href}
                aria-label={label}
                title={label}
                {...(external ? { target: "_blank", rel: "noopener" } : {})}
                className="flex h-12 w-12 items-center justify-center rounded-full border-[1.5px] border-ink-950/14 text-forest-900 transition-colors duration-[250ms] hover:border-forest-900 hover:bg-forest-900 hover:text-white"
              >
                <Icon className="h-5 w-5" />
              </a>
            </li>
          ))}
        </ul>
      </div>
  );
}
