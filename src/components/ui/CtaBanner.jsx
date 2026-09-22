import Eyebrow from './Eyebrow'
import Heading from './Heading'
import Lede from './Lede'
import { ToneContext } from '../../lib/tone'

export default function CtaBanner({ eyebrow, title, lede, children }) {
  // The banner is dark whatever section it sits in, so its eyebrow and lede
  // take their on-dark colours.
  return (
    <ToneContext value="dark">
      <div className="relative overflow-hidden rounded-brand-lg bg-[linear-gradient(150deg,#1a5540,#154a38)] px-6 py-10 gt640:p-cta text-center">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(37,154,14,.3),transparent_55%)]"
        />
        <div className="relative z-[1]">
          <Eyebrow className="reveal justify-center">{eyebrow}</Eyebrow>
          <Heading size="lg" className="reveal text-white">
            {title}
          </Heading>
          {lede && <Lede className="mx-auto max-w-[520px]">{lede}</Lede>}
          <div className="mt-[1.6em] flex flex-wrap justify-center gap-4">
            {children}
          </div>
        </div>
      </div>
    </ToneContext>
  )
}
