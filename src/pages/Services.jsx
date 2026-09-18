import servicesImg from '../assets/img/services.png'
import Accent from '../components/ui/Accent'
import Button from '../components/ui/Button'
import Container from '../components/ui/Container'
import CtaBanner from '../components/ui/CtaBanner'
import Eyebrow from '../components/ui/Eyebrow'
import Heading from '../components/ui/Heading'
import Lede from '../components/ui/Lede'
import PageHero from '../components/ui/PageHero'
import Section from '../components/ui/Section'
import Process from '../sections/services/Process'
import ServiceList from '../sections/services/ServiceList'

export default function Services() {
  return (
    <>
      <PageHero
        image={servicesImg}
        alt="Planning a digital marketing strategy"
        blob="none"
      >
        <Eyebrow>Services</Eyebrow>
        <Heading as="h1" size="display" className="max-w-[640px]">
          Pick a lever.
          <br />
          <Accent>Pull it</Accent> hard.
        </Heading>
        <Lede className="max-w-[640px]">
          Five focused services. Use one, or combine a <br />
          few — whatever fits your product and your <br />
          stage of growth.
        </Lede>
      </PageHero>

      <ServiceList />
      <Process />

      <Section>
        <Container>
          <CtaBanner
            eyebrow="Ready when you are"
            title="Not sure which service fits?"
            lede="Tell me about your business and I'll recommend a starting point."
          >
            <Button to="/contact">Start a Conversation</Button>
          </CtaBanner>
        </Container>
      </Section>
    </>
  )
}
