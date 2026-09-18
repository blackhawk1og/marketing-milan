import { tagTone, useTone } from '../../lib/tone'

export default function Tag({ children }) {
  return (
    <span
      className={`rounded-full border-[1.5px] px-[1em] py-[0.5em] text-[0.78rem] font-bold tracking-[0.02em] ${tagTone(useTone())}`}
    >
      {children}
    </span>
  )
}
