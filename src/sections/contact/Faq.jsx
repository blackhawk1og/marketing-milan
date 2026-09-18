import Container from '../../components/ui/Container'
import Eyebrow from '../../components/ui/Eyebrow'
import Heading from '../../components/ui/Heading'
import Section from '../../components/ui/Section'
import SectionHead from '../../components/ui/SectionHead'

const FAQS = [
  {
    q: 'Do you work with businesses outside Nepal?',
    a: 'Yes — most of the work happens remotely over calls, email and WhatsApp, so location isn’t a limitation.',
  },
  {
    q: 'Do I need to use all five services?',
    a: 'No. Most projects start with one or two services that match your current goal, and expand once that’s working.',
  },
  {
    q: 'How fast can we start?',
    a: 'After an initial call to understand your business, most projects kick off within a week.',
  },
  {
    q: 'Do you sign long contracts?',
    a: 'No long lock-ins. We agree on scope month to month, so the relationship continues because it’s working, not because of a contract.',
  },
]

const SUMMARY =
  "flex cursor-pointer list-none items-center justify-between gap-4 text-[1.02rem] font-bold after:shrink-0 after:text-[1.4rem] after:font-normal after:text-gold-600 after:transition-transform after:duration-200 after:ease-brand after:content-['+'] group-open:after:rotate-45 [&::-webkit-details-marker]:hidden"

export default function Faq() {
  return (
    <Section className="flow-root pt-0">
      <Container>
        <SectionHead>
          <Eyebrow>Before you reach out</Eyebrow>
          <Heading size="lg">A few common questions.</Heading>
        </SectionHead>
        <div className="max-w-[760px]">
          {FAQS.map(({ q, a }) => (
            <details
              key={q}
              className="group border-b border-ink-950/12 py-[18px]"
            >
              <summary className={SUMMARY}>{q}</summary>
              <p className="mt-3 text-pretty text-ink-700">{a}</p>
            </details>
          ))}
        </div>
      </Container>
    </Section>
  )
}
