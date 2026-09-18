import { useState } from 'react'
import ProjectCard from './ProjectCard'
import Container from '../../components/ui/Container'
import NoteBox from '../../components/ui/NoteBox'
import Section from '../../components/ui/Section'
import { PROJECTS, PROJECT_FILTERS } from '../../data/projects'

const FILTER_BASE =
  'cursor-pointer rounded-full border-[1.5px] px-[1.3em] py-[0.6em] font-body text-[0.85rem] font-bold transition-all duration-200 ease-brand'

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
            <button
              key={id}
              type="button"
              onClick={() => setFilter(id)}
              aria-pressed={filter === id}
              className={`${FILTER_BASE} ${
                filter === id
                  ? 'border-forest-950 bg-forest-950 text-white'
                  : 'border-ink-950/16 bg-transparent text-ink-700 hover:border-forest-900 hover:text-forest-950'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-7 gt640:grid-cols-2 gt900:grid-cols-3">
          {visible.map((project) => (
            <ProjectCard key={project.initials} {...project} />
          ))}
        </div>

        <NoteBox className="mt-12">
          <strong>Note:</strong> The projects above are illustrative sample work
          created to show how these services come together — not existing client
          accounts.
        </NoteBox>
      </Container>
    </Section>
  )
}
