import Container from '../components/ui/Container'
import Section from '../components/ui/Section'
import ContactChannels from '../sections/contact/ContactChannels'
import ContactIntro from '../sections/contact/ContactIntro'
import Faq from '../sections/contact/Faq'

export default function Contact() {
  return (
    <>
      {/* Tighter top than the standard section, so both columns land above the
          fold on a laptop screen. */}
      <Section className="pt-20">
        <Container>
          <div className="grid grid-cols-1 items-start gap-14 gt900:grid-cols-2 gt900:gap-20">
            <ContactIntro />
            <ContactChannels />
          </div>
        </Container>
      </Section>

      <Faq />
    </>
  )
}
