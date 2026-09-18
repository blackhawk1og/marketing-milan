import Accent from '../../components/ui/Accent'
import Heading from '../../components/ui/Heading'
import Lede from '../../components/ui/Lede'
import Section from '../../components/ui/Section'

export default function Statement() {
  return (
    <Section tone="ink">
      <div className="mx-auto w-full max-w-[920px] px-gutter text-center">
        <Heading size="statement">
          Your business doesn&apos;t need more posts.
          <br />
          It needs a better <Accent>digital strategy</Accent>.
        </Heading>
        <Lede>
          Growth doesn&apos;t come from noise. It comes from a strategy built
          around your product, your customer, and your goals — then executed
          consistently across the right channels.
        </Lede>
      </div>
    </Section>
  )
}
