export default function SectionHead({ className = '', children }) {
  return <div className={`mb-10 max-w-[680px] ${className}`}>{children}</div>
}
