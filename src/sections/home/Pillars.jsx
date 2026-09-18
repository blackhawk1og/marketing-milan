import BadgeNum from '../../components/ui/BadgeNum'
import Container from '../../components/ui/Container'
import Eyebrow from '../../components/ui/Eyebrow'
import Heading from '../../components/ui/Heading'
import Section from '../../components/ui/Section'
import SectionHead from '../../components/ui/SectionHead'

const PILLARS = [
  {
    num: '01',
    title: 'Give people a reason',
    blurb:
      'A clear reason to choose your brand over the competition — not a longer list of features.',
  },
  {
    num: '02',
    title: 'Every click counts',
    blurb:
      'Your landing page, offer, follow-up and customer experience matter just as much as the ad.',
  },
  {
    num: '03',
    title: 'Be recognizable, not just professional',
    blurb:
      'People remember brands that made them feel something — not brands that just looked safe.',
  },
]

export default function Pillars() {
  return (
    <Section tone="dark">
      <Container>
        <SectionHead>
          <Eyebrow>How I think about growth</Eyebrow>
          <Heading size="lg">Clarity creates positioning.</Heading>
        </SectionHead>

        <div className="grid grid-cols-1 gap-7 gt640:grid-cols-2 gt900:grid-cols-3">
          {PILLARS.map(({ num, title, blurb }) => (
            <div
              key={num}
              className="rounded-brand-md border border-white/14 bg-white/4 p-8"
            >
              <BadgeNum>{num}</BadgeNum>
              <Heading as="h3" size="pillar" className="mt-5">
                {title}
              </Heading>
              <p className="text-pretty text-cream-100/70">{blurb}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
