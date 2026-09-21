import Heading from '../../components/ui/Heading'
import Lede from '../../components/ui/Lede'
import Tag from '../../components/ui/Tag'

/**
 * One accordion item. The panel stays mounted so its height can animate
 * (grid rows 0fr → 1fr); `inert` keeps a collapsed panel out of the tab order
 * and the accessibility tree.
 *
 * Opening, all over 350ms: the panel grows, its content slides down from under
 * the title, and the title settles 8px lower. Closing runs the same in reverse,
 * except the content fades out faster than the panel shrinks so its text is
 * gone before the clip edge reaches it. These use ease-in-out rather than
 * ease-brand, which finishes ~60% of the move in the first 60ms and would make
 * the slide read as a pop.
 */
export default function ServiceRow({ id, num, title, lede, tags, open, onToggle }) {
  const triggerId = `${id}-trigger`
  const panelId = `${id}-panel`

  return (
    <li id={id} className="scroll-mt-28 border-b border-ink-950/10">
      <Heading as="h3" size="md" flush>
        <button
          type="button"
          id={triggerId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="group flex w-full cursor-pointer items-center gap-4 py-6 text-left gt640:py-8"
        >
          {/* gt640:w-40 matches the eyebrow column in ServiceList. */}
          <span className="w-10 shrink-0 text-[1rem] text-gold-600 tabular-nums gt640:w-40">
            {num}
          </span>
          <span
            className={`flex-1 transition-[color,translate] duration-[350ms] ease-in-out group-hover:text-forest-700 motion-reduce:transition-none ${
              open ? 'translate-y-2 text-forest-900' : ''
            }`}
          >
            {title}
          </span>
          <span
            aria-hidden="true"
            className={`relative h-10 w-10 shrink-0 rounded-full border-[1.5px] transition-colors duration-[250ms] ${
              open
                ? 'border-forest-900 bg-forest-900 text-white'
                : 'border-ink-950/14 text-forest-900 group-hover:border-forest-900'
            }`}
          >
            <span className="absolute top-1/2 left-1/2 h-0.5 w-3.5 -translate-x-1/2 -translate-y-1/2 bg-current" />
            {/* The vertical bar collapses to turn + into −. */}
            <span
              className={`absolute top-1/2 left-1/2 h-3.5 w-0.5 -translate-x-1/2 -translate-y-1/2 bg-current transition-transform duration-[250ms] ease-brand ${
                open ? 'scale-y-0' : ''
              }`}
            />
          </span>
        </button>
      </Heading>

      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        inert={!open}
        className={`grid transition-[grid-template-rows] duration-[350ms] ease-in-out motion-reduce:transition-none ${
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          {/* pl-44 = number column (w-40) + gap-4, so copy lines up with the title.
              From gt900 the description and categories sit side by side. */}
          <div
            className={`pb-8 transition-[opacity,translate] ease-in-out motion-reduce:transition-none gt640:pr-14 gt640:pl-44 gt900:grid gt900:grid-cols-2 gt900:gap-12 ${
              open ? 'opacity-100 duration-[350ms]' : '-translate-y-3 opacity-0 duration-200'
            }`}
          >
            <Lede className="max-w-[640px] gt900:mb-0">{lede}</Lede>
            <div>
              <p className="mt-6 mb-3 text-[0.72rem] font-bold tracking-[0.14em] text-ink-700 uppercase gt900:mt-0">
                Categories
              </p>
              <ul className="flex list-none flex-wrap gap-2 p-0">
                {tags.map((tag) => (
                  <li key={tag} className="flex">
                    <Tag>{tag}</Tag>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}
