import Container from '../../components/ui/Container'
import Eyebrow from '../../components/ui/Eyebrow'
import Heading from '../../components/ui/Heading'
import Section from '../../components/ui/Section'
import SectionHead from '../../components/ui/SectionHead'
import { PROCESS_STEPS } from '../../data/services'

export default function Process() {
  return (
    <Section tone="ink">
      <Container>
        <SectionHead>
          <Eyebrow className="reveal">How I work</Eyebrow>
          <Heading size="lg" className="reveal">A simple process, used on every project.</Heading>
        </SectionHead>

        <div className="grid grid-cols-1 gap-6 gt520:grid-cols-2 gt820:grid-cols-4">
          {PROCESS_STEPS.map(({ num, title, blurb }) => (
            <div key={num} className="reveal relative pt-2">
              <span className="mb-[0.3em] block font-display text-[2.2rem] font-semibold text-gold-500">
                {num}
              </span>
              <h4 className="mb-[0.4em] font-display text-[1.02rem] font-extrabold leading-[1.08] tracking-[-0.01em] text-balance">
                {title}
              </h4>
              <p className="text-[0.92rem] text-pretty">{blurb}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
