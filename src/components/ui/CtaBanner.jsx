import Eyebrow from './Eyebrow'
import Heading from './Heading'
import Lede from './Lede'

export default function CtaBanner({ eyebrow, title, lede, children }) {
  return (
    <div className="relative overflow-hidden rounded-brand-lg bg-[linear-gradient(150deg,#0e3a2b,#0a2a1f)] p-cta text-center">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(217,164,65,.25),transparent_55%)]"
      />
      <div className="relative z-[1]">
        <Eyebrow className="justify-center">{eyebrow}</Eyebrow>
        <Heading size="lg" className="text-white">
          {title}
        </Heading>
        {lede && <Lede className="mx-auto max-w-[520px]">{lede}</Lede>}
        <div className="mt-[1.6em] flex flex-wrap justify-center gap-4">
          {children}
        </div>
      </div>
    </div>
  )
}
