export default function NoteBox({ className = '', children }) {
  return (
    <div
      className={`rounded-brand-md border border-ink-950/8 bg-cream-200 px-[26px] py-[22px] text-[0.92rem] text-ink-700 ${className}`}
    >
      {children}
    </div>
  )
}
