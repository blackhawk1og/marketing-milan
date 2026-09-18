import { ledeTone, useTone } from '../../lib/tone'

export default function Lede({ className = '', children }) {
  const tone = useTone()
  return (
    <p className={`text-lede mb-[1em] text-pretty ${ledeTone(tone)} ${className}`}>
      {children}
    </p>
  )
}
