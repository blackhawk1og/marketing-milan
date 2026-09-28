import projectsImg from '../assets/img/projects.png'
import Accent from '../components/ui/Accent'
import Button from '../components/ui/Button'
import ComingSoon from '../components/ui/ComingSoon'
import Container from '../components/ui/Container'
import CtaBanner from '../components/ui/CtaBanner'
import Eyebrow from '../components/ui/Eyebrow'
import Heading from '../components/ui/Heading'
import Lede from '../components/ui/Lede'
import PageHero from '../components/ui/PageHero'
import Section from '../components/ui/Section'

export default function Projects() {
  return (
    <>
      <PageHero image={projectsImg} alt="Sample of project work" blob="none">
        <Heading as="h1" size="display" className="max-w-[640px]">
          Work that
          <br />
          moved the <br />
          <Accent>numbers.</Accent>
        </Heading>
        <Lede className="max-w-[640px]">
          Project write-ups are being put together. Check back soon, or get in
          touch to talk about yours.
        </Lede>
      </PageHero>

      <Section>
        <Container>
          <ComingSoon>
            Case studies are on the way — what was done, and what it changed.
          </ComingSoon>
        </Container>
      </Section>

      <Section className="flow-root pt-0">
        <Container>
          <CtaBanner
            eyebrow="Have a product to grow?"
            title="Let's see what fits your business."
          >
            <Button to="/contact">Start a Conversation</Button>
            <Button to="/services" variant="outline-light">
              See Services
            </Button>
          </CtaBanner>
        </Container>
      </Section>
    </>
  )
}
