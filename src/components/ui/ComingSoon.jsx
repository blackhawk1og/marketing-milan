import Heading from './Heading'
import Lede from './Lede'

/**
 * Stands in where project case studies will go, on the Projects page and in
 * Home's work section. Dashed border, so it reads as a placeholder rather than
 * a card with something in it.
 */
export default function ComingSoon({ title = 'Coming soon', children, className = '' }) {
  return (
    <div
      className={`reveal rounded-brand-md border border-dashed border-ink-950/20 bg-cream-50 px-6 py-14 text-center gt640:py-20 ${className}`}
    >
      <Heading as="p" size="lg" flush>
        {title}
      </Heading>
      {children && (
        <Lede className="mx-auto mt-4 max-w-[440px] gt900:mb-0">{children}</Lede>
      )}
    </div>
  )
}
