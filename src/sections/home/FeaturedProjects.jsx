import ProjectCard from '../projects/ProjectCard'
import Container from '../../components/ui/Container'
import Eyebrow from '../../components/ui/Eyebrow'
import GhostLink from '../../components/ui/GhostLink'
import Heading from '../../components/ui/Heading'
import Section from '../../components/ui/Section'
import { FEATURED_PROJECTS } from '../../data/projects'

export default function FeaturedProjects() {
  return (
    <Section>
      <Container>
        <div className="mb-10 flex max-w-none flex-wrap items-end justify-between gap-5">
          <div>
            <Eyebrow>Recent work</Eyebrow>
            <Heading size="lg" flush>
              A few products I&apos;ve helped grow.
            </Heading>
          </div>
          <GhostLink to="/projects">View all projects →</GhostLink>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-7 gt640:grid-cols-2 gt900:grid-cols-3">
          {FEATURED_PROJECTS.map((project) => (
            <ProjectCard key={project.initials} {...project} />
          ))}
        </div>
      </Container>
    </Section>
  )
}
