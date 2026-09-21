import { Link } from 'react-router-dom'
import logo from '../assets/img/logo.png'

export default function Logo({ nameClassName = 'text-forest-950' }) {
  return (
    <Link to="/" className="flex shrink-0 items-center gap-0">
      <img
        src={logo}
        alt="Milan Sunuwar Digital Marketing"
        className="block h-16 w-16 rounded-full object-cover"
      />
      <span className="flex flex-col leading-[1.15]">
        <span className={`font-display text-[1.05rem] font-bold ${nameClassName}`}>
          Milan Sunuwar
        </span>
        <span className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-gold-600">
          Digital Marketing
        </span>
      </span>
    </Link>
  )
}
