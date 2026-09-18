import { accentTone, useTone } from '../../lib/tone'

export default function Accent({ children }) {
  return <span className={accentTone(useTone())}>{children}</span>
}
