import contactImg from '../assets/img/contact.png'
import Container from '../components/ui/Container'
import Eyebrow from '../components/ui/Eyebrow'
import Heading from '../components/ui/Heading'
import Lede from '../components/ui/Lede'
import PageHero from '../components/ui/PageHero'
import Section from '../components/ui/Section'
import ContactForm from '../sections/contact/ContactForm'
import ContactInfoCard from '../sections/contact/ContactInfoCard'
import Faq from '../sections/contact/Faq'

export default function Contact() {
  return (
    <>
      <PageHero image={contactImg} alt="Get in touch" blob="none">
        <Eyebrow>Contact</Eyebrow>
        <Heading as="h1" size="xl" className="max-w-[640px]">
          Let&apos;s build something that fits.
        </Heading>
        <Lede className="max-w-[640px]">
          Tell me about your business and what you&apos;re trying to grow. I
          reply personally, usually within a day.
        </Lede>
      </PageHero>

      <Section>
        <Container>
          <div className="grid grid-cols-1 items-start gap-14 gt900:grid-cols-[1.1fr_0.9fr]">
            <ContactForm />
            <ContactInfoCard />
          </div>
        </Container>
      </Section>

      <Faq />
    </>
  )
}
