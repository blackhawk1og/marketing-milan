import BadgeNum from '../../components/ui/BadgeNum'
import Button from '../../components/ui/Button'
import Heading from '../../components/ui/Heading'
import Lede from '../../components/ui/Lede'
import { CheckIcon } from '../../components/Icons'

export default function ServiceRow({
  id,
  num,
  title,
  reverse,
  lede,
  points,
  cta,
  gradient,
  Mark,
  isLast,
}) {
  return (
    <div
      id={id}
      className={`grid grid-cols-1 items-center gap-12 py-10 gt820:grid-cols-[0.9fr_1.1fr] ${
        isLast ? '' : 'border-b border-ink-950/10'
      }`}
    >
      <div>
        <BadgeNum>{num}</BadgeNum>
        <Heading size="md" className="mt-5">
          {title}
        </Heading>
        <Lede>{lede}</Lede>
        <ul className="mt-5 flex list-none flex-col gap-3 p-0">
          {points.map((point) => (
            <li
              key={point}
              className="flex items-start gap-3 text-[0.96rem] text-ink-700"
            >
              <CheckIcon className="mt-[2px] h-[18px] w-[18px] shrink-0 text-gold-600" />
              {point}
            </li>
          ))}
        </ul>
        <Button to="/contact" variant="outline-dark" className="mt-7">
          {cta}
        </Button>
      </div>

      {/* `reverse` carried an `order: 2` in the mockup. Since the media is
          already the second grid child, it was inert there — kept 1:1 here. */}
      <div
        style={{ background: gradient }}
        className={`relative flex aspect-[16/9] items-center justify-center overflow-hidden rounded-brand-lg gt820:aspect-[4/3] ${
          reverse ? 'gt820:order-2' : ''
        }`}
      >
        <BadgeNum className="absolute top-5 left-5 h-[54px] w-[54px] text-[1.3rem]">
          {num}
        </BadgeNum>
        <Mark className="h-16 w-16 text-white/85" />
      </div>
    </div>
  )
}
