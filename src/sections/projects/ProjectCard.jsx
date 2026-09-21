import Chip from '../../components/ui/Chip'
import Heading from '../../components/ui/Heading'

export default function ProjectCard({
  initials,
  name,
  gradient,
  tags,
  blurb,
  result,
}) {
  return (
    <div className="reveal group overflow-hidden rounded-brand-md border border-ink-950/8 bg-white transition-[transform,box-shadow] duration-300 ease-brand hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_rgba(14,58,43,.35)]">
      <div
        style={{ background: gradient }}
        className="relative flex aspect-[16/10] items-center justify-center overflow-hidden transition-transform duration-400 ease-brand group-hover:scale-[1.06]"
      >
        <span className="font-display text-[4rem] font-semibold text-white/92">
          {initials}
        </span>
      </div>
      <div className="px-7 pt-[26px] pb-[30px]">
        <div className="mb-3.5 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Chip key={tag}>{tag}</Chip>
          ))}
        </div>
        <Heading as="h3" size="h3">
          {name}
        </Heading>
        <p className="text-pretty text-ink-700">{blurb}</p>
        {result && (
          <div className="mt-4 flex items-start gap-[0.5em] border-t border-dashed border-ink-950/16 pt-4 text-[0.88rem] font-bold text-forest-900">
            <span>↗</span> {result}
          </div>
        )}
      </div>
    </div>
  )
}
