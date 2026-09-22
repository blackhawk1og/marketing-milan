import Button from '../../components/ui/Button'
import Container from '../../components/ui/Container'
import CtaBanner from '../../components/ui/CtaBanner'
import Section from '../../components/ui/Section'

export default function HomeCta() {
  return (
    <Section>
      <Container>
        <CtaBanner
          eyebrow="Your biggest competitor isn't another brand"
          title={`It's "I'll think about it." — and that's a marketing problem.`}
          lede="Let's fix that with a strategy built to get a yes."
        >
          <Button to="/contact" variant="accent" className="text-black">
            Start a Conversation
          </Button>
          <Button to="/projects" variant="outline-light">
            See the Work
          </Button>
        </CtaBanner>
      </Container>
    </Section>
  )
}
