import projectsImg from '../assets/img/projects.png'
import Accent from '../components/ui/Accent'
import Button from '../components/ui/Button'
import Container from '../components/ui/Container'
import CtaBanner from '../components/ui/CtaBanner'
import Eyebrow from '../components/ui/Eyebrow'
import Heading from '../components/ui/Heading'
import Lede from '../components/ui/Lede'
import PageHero from '../components/ui/PageHero'
import Section from '../components/ui/Section'
import ProjectGrid from '../sections/projects/ProjectGrid'

export default function Projects() {
  return (
    <>
      <PageHero image={projectsImg} alt="Sample of project work" blob="none">
        <Eyebrow>Selected work</Eyebrow>
        <Heading as="h1" size="display" className="max-w-[640px]">
          Work that
          <br />
          moved the <br />
          <Accent>numbers.</Accent>
        </Heading>
        <Lede className="max-w-[640px]">
          These are sample projects that illustrate the kind of work and outcomes
          this approach is built to produce — a mix of services,
          combined differently for each business.
        </Lede>
      </PageHero>

      <ProjectGrid />

      <Section className="flow-root pt-0">
        <Container>
          <CtaBanner
            eyebrow="Have a product like these?"
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
