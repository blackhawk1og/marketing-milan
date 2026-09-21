import { useState } from 'react'
import ProjectCard from './ProjectCard'
import ChoiceChip from '../../components/ui/ChoiceChip'
import Container from '../../components/ui/Container'
import NoteBox from '../../components/ui/NoteBox'
import Section from '../../components/ui/Section'
import { PROJECTS, PROJECT_FILTERS } from '../../data/projects'

export default function ProjectGrid() {
  const [filter, setFilter] = useState('all')

  const visible = PROJECTS.filter(
    (project) => filter === 'all' || project.categories.includes(filter),
  )

  return (
    <Section>
      <Container>
        <div className="mb-10 flex flex-wrap gap-2.5">
          {PROJECT_FILTERS.map(({ id, label }) => (
            <ChoiceChip
              key={id}
              selected={filter === id}
              onClick={() => setFilter(id)}
            >
              {label}
            </ChoiceChip>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-7 gt640:grid-cols-2 gt900:grid-cols-3">
          {visible.map((project) => (
            <ProjectCard key={project.initials} {...project} />
          ))}
        </div>

        <NoteBox className="reveal mt-12">
          <strong>Note:</strong> The projects above are illustrative sample work
          created to show how these services come together — not existing client
          accounts.
        </NoteBox>
      </Container>
    </Section>
  )
}
