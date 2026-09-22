import LogoAnimation from './LogoAnimation'
import { ArrowIcon } from '../../components/Icons'
import Accent from '../../components/ui/Accent'
import Button from '../../components/ui/Button'
import Container from '../../components/ui/Container'
import Eyebrow from '../../components/ui/Eyebrow'
import GhostLink from '../../components/ui/GhostLink'
import Heading from '../../components/ui/Heading'
import Lede from '../../components/ui/Lede'
import Tag from '../../components/ui/Tag'

const TAGS = ['Social Media Marketing', 'SEO']

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
              Social media marketing and SEO for growing businesses — content
              that turns followers into customers, and search work that gets
              you found by people ready to buy.
            </Lede>
            {/* One clear primary action; the secondary is a quiet text link. */}
            <div className="mt-[2em] flex flex-wrap items-center gap-x-7 gap-y-4">
              <Button to="/services" className="group">
                Explore Services <ArrowIcon />
              </Button>
              <GhostLink to="/contact" className="group">
                Contact us<ArrowIcon className="ml-[0.4em] inline-block align-[-0.05em]" />
              </GhostLink>
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
