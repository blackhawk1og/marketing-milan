import LogoAnimation from './LogoAnimation'
import Accent from '../../components/ui/Accent'
import Button from '../../components/ui/Button'
import Container from '../../components/ui/Container'
import Eyebrow from '../../components/ui/Eyebrow'
import Heading from '../../components/ui/Heading'
import Lede from '../../components/ui/Lede'
import Tag from '../../components/ui/Tag'

const TAGS = [
  'Social Media',
  'Meta Ads',
  'PPC',
  'Email Marketing',
  'Web Development',
]

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream-100 pt-hero-top pb-hero-bottom">
      <Container>
        <div className="grid items-center gap-12 gt640:grid-cols-[1.2fr_0.8fr]">
          <div>
            <Eyebrow>Digital marketing, done deliberately</Eyebrow>
            <Heading as="h1" size="display">
              Solution that fits <Accent>to you</Accent> and your products.
            </Heading>
            <Lede className="max-w-[640px]">
              Practical digital marketing for businesses that want stronger
              visibility, better customer trust and consistent growth — without
              unnecessary complexity.
            </Lede>
            <div className="mt-[2em] flex flex-wrap gap-4">
              <Button to="/services">Explore Services →</Button>
              <Button to="/contact" variant="outline-dark">
                Let&apos;s Talk
              </Button>
            </div>
            <div className="mt-[2em] flex flex-wrap gap-2.5">
              {TAGS.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          </div>
          <LogoAnimation />
        </div>
      </Container>
    </section>
  )
}
