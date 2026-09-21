import Container from '../components/ui/Container'
import Section from '../components/ui/Section'
import ContactForm from '../sections/contact/ContactForm'
import ContactIntro from '../sections/contact/ContactIntro'
import Faq from '../sections/contact/Faq'

export default function Contact() {
  return (
    <>
      {/* Tighter top than the standard section so the whole form, Submit
          included, fits on a laptop screen without scrolling. */}
      <Section className="pt-20">
        <Container>
          <div className="grid grid-cols-1 items-start gap-14 gt900:grid-cols-[0.85fr_1.15fr] gt900:gap-20">
            <ContactIntro />
            <ContactForm />
          </div>
        </Container>
      </Section>

      <Faq />
    </>
  )
}
