import { Link } from 'react-router-dom'
import { isDarkTone, useTone } from '../../lib/tone'

/** The mockup's `.btn-ghost` — an underlined text link, not a pill button. */
export default function GhostLink({ to, className = '', children }) {
  const tone = useTone()
  return (
    <Link
      to={to}
      className={`inline-block border-b-2 border-gold-500 py-[0.6em] font-bold gt640:py-[0.4em] ${isDarkTone(tone) ? 'text-white' : 'text-forest-900'} ${className}`}
    >
      {children}
    </Link>
  )
}
