export default function Container({ className = '', children }) {
  return (
    <div className={`mx-auto w-full max-w-[1360px] px-gutter ${className}`}>
      {children}
    </div>
  )
}
