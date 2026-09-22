import Container from '../../components/ui/Container'
import Section from '../../components/ui/Section'

const FACTS = [
  {
    title: 'Based in Nepal',
    blurb: 'Working with local businesses in person, and clients worldwide remotely.',
  },
  {
    title: 'Direct communication',
    blurb: 'You talk to the person doing the work — no account managers in between.',
  },
  {
    title: 'Five services, one strategy',
    blurb: 'Social, SEO, Ads, PPC and Email — combined only when it makes sense for you.',
  },
]

export default function Facts() {
  return (
    <Section>
      <Container>
        <div className="mt-8 grid grid-cols-1 gap-6 gt720:grid-cols-3">
          {FACTS.map(({ title, blurb }) => (
            <div
              key={title}
              className="reveal rounded-brand-md border border-ink-950/8 bg-cream-100 p-6"
            >
              <h4 className="mb-[0.4em] font-display text-[0.95rem] font-extrabold leading-[1.08] tracking-[-0.01em] text-balance text-forest-950">
                {title}
              </h4>
              <p className="text-[0.9rem] text-pretty text-ink-700">{blurb}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
