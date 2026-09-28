import ComingSoon from '../../components/ui/ComingSoon'
import Container from '../../components/ui/Container'
import Heading from '../../components/ui/Heading'
import Section from '../../components/ui/Section'

export default function FeaturedProjects() {
  return (
    <Section>
      <Container>
        <div className="mb-10 flex max-w-none flex-wrap items-end justify-between gap-5">
          <div>
            <Heading size="lg" flush className="reveal">
              Recent work.
            </Heading>
          </div>
        </div>

        <ComingSoon className="mt-12">
          Project write-ups are on the way.
        </ComingSoon>
      </Container>
    </Section>
  )
}
