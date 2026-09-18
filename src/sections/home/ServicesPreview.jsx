import ArrowLink from '../../components/ui/ArrowLink'
import BadgeNum from '../../components/ui/BadgeNum'
import Card from '../../components/ui/Card'
import Container from '../../components/ui/Container'
import Eyebrow from '../../components/ui/Eyebrow'
import Heading from '../../components/ui/Heading'
import Lede from '../../components/ui/Lede'
import Section from '../../components/ui/Section'
import SectionHead from '../../components/ui/SectionHead'
import { SERVICE_PREVIEWS } from '../../data/services'

export default function ServicesPreview() {
  return (
    <Section id="services-preview">
      <Container>
        <SectionHead>
          <Eyebrow>What I do</Eyebrow>
          <Heading size="lg">Five ways to grow, one strategy behind them.</Heading>
          <Lede>
            Every service is built to work on its own — or stack together into a
            system where your ads, content, emails and site all point the same
            direction.
          </Lede>
        </SectionHead>

        <div className="grid grid-cols-1 gap-7 gt640:grid-cols-2 gt900:grid-cols-3">
          {SERVICE_PREVIEWS.map(({ num, title, blurb, to }) => (
            <Card key={num}>
              <div className="mb-[18px] flex items-center gap-4">
                <BadgeNum>{num}</BadgeNum>
              </div>
              <Heading as="h3" size="card">
                {title}
              </Heading>
              <p className="text-pretty text-ink-700">{blurb}</p>
              <ArrowLink to={to}>Learn more</ArrowLink>
            </Card>
          ))}

          <Card variant="dark" className="flex flex-col justify-center">
            <Heading as="h3" size="card" className="text-white">
              Not sure where to start?
            </Heading>
            <p className="text-pretty text-cream-100/72">
              Tell me about your business and I&apos;ll suggest the combination
              that fits your stage of growth.
            </p>
            <ArrowLink to="/contact" className="text-gold-400">
              Start a conversation
            </ArrowLink>
          </Card>
        </div>
      </Container>
    </Section>
  )
}
