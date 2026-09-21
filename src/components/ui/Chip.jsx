export default function Chip({ children }) {
  return (
    <span className="rounded-full bg-cream-200 px-[0.8em] py-[0.35em] text-[0.75rem] font-extrabold gt640:text-[0.68rem] uppercase tracking-[0.06em] text-forest-900">
      {children}
    </span>
  )
}
