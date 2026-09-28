import Heading from "../../components/ui/Heading";
import Lede from "../../components/ui/Lede";
import { CONTACT } from "../../data/site";

/** Left column of the Contact page: the two direct ways to reach me. */
export default function ContactIntro() {
  return (
    <div className="@container">
      <Heading as="h1" size="display">
        Contacts
      </Heading>
      <Lede className="max-w-[460px]">
        Reach out through any of the channels below and I&apos;ll reply
        personally, usually within a day.
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

      <p className="mt-7 mb-2 font-body text-[0.75rem] gt640:text-[0.7rem] font-semibold tracking-[0.18em] text-ink-700 uppercase">
        Phone
      </p>
      {/* A step down from the email, which stays the main address. */}
      <a
        href={CONTACT.phoneHref}
        className="flex min-h-11 items-center gt640:inline gt640:min-h-auto font-display text-[clamp(1.1rem,4.4cqw,1.5rem)] leading-[1.1] font-semibold tracking-[-0.01em] text-ink-900 transition-colors duration-[250ms] whitespace-nowrap hover:text-forest-700"
      >
        {CONTACT.phone}
      </a>
    </div>
  );
}
