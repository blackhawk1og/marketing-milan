import { Link } from 'react-router-dom'
import logo from '../assets/img/logo.png'

export default function Logo({ nameClassName = 'text-forest-950', taglineClassName = 'text-accent-600' }) {
  return (
    <Link to="/" className="flex shrink-0 items-center gap-2.5">
      {/* The mark is cropped tight to the artwork with a transparent
          background, so it is sized by height and shown whole. */}
      <img
        src={logo}
        alt="Milan Sunuwar Digital Marketing"
        className="block h-10 w-auto object-contain gt640:h-13"
      />
      <span className="flex flex-col leading-[1.15]">
        <span className={`font-display text-[1.05rem] font-bold ${nameClassName}`}>
          Milan Sunuwar
        </span>
        <span className={`text-[0.62rem] font-bold uppercase tracking-[0.16em] ${taglineClassName}`}>
          Digital Marketing
        </span>
      </span>
    </Link>
  )
}
