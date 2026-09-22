import aboutImg from '../assets/img/about.png'
import Button from '../components/ui/Button'
import Container from '../components/ui/Container'
import CtaBanner from '../components/ui/CtaBanner'
import Eyebrow from '../components/ui/Eyebrow'
import Heading from '../components/ui/Heading'
import Lede from '../components/ui/Lede'
import PageHero from '../components/ui/PageHero'
import Section from '../components/ui/Section'
import Facts from '../sections/about/Facts'
import Manifesto from '../sections/about/Manifesto'

export default function About() {
  return (
    <>
      {/* TODO(content): about.png is a generic stock photo of a businessman, not
          Milan, yet its alt text says "Milan Sunuwar". Replace it with a real
          photo and keep the alt text accurate. */}
      <PageHero image={aboutImg} alt="Milan Sunuwar" blob="gold">
        <Eyebrow>About</Eyebrow>
        <Heading as="h1" size="xl" className="max-w-[640px]">
          Hi, I&apos;m Milan Sunuwar.
        </Heading>
        {/* TODO(content): placeholder intro. Replace with Milan's real
            one-to-two sentence introduction. */}
        <Lede className="max-w-[640px]">
          I help small and growing businesses market themselves without the
          agency bloat — no jargon, no bloated retainers, just work that&apos;s
          built around your product and your customers.
        </Lede>
      </PageHero>

      {/* TODO(content): the real bio / background section goes here: who Milan
          is, background and experience, how he works. Content pending from
          Milan; a plain Section with a heading and a few paragraphs fits the
          page. Nothing is rendered here until then. */}

      <Facts />
      <Manifesto />

      <Section>
        <Container>
          <CtaBanner
            eyebrow="Let's work together"
            title="Ready to build a brand people remember?"
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
