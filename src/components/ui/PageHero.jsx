import Container from './Container'
import { ToneContext } from '../../lib/tone'

/**
 * Shared top block for the Services / Projects / About / Contact pages.
 * `tone` on the media blob picks the gold or green backdrop; `plain` drops it.
 */
export default function PageHero({ image, alt, blob = 'none', children }) {
  const blobClass =
    blob === 'green'
      ? 'before:bg-[linear-gradient(155deg,#1c5c46,#0a2a1f)]'
      : 'before:bg-[linear-gradient(155deg,#e6bd6c,#c98a2b)]'

  return (
    <ToneContext value="cream">
      <section className="flow-root bg-cream-100 pt-page-hero-top pb-0">
        <Container>
          <div className="grid items-center gap-12 pt-page-hero-top pb-page-hero-bottom gt900:grid-cols-[1.1fr_0.9fr]">
            <div>{children}</div>
            <div
              className={`relative mx-auto flex aspect-[4/3.4] w-full max-w-[420px] items-end justify-center gt900:max-w-none ${
                blob === 'none'
                  ? ''
                  : `before:absolute before:inset-[10%_8%_4%_8%] before:rounded-[50%_50%_18px_18px/34%_34%_18px_18px] before:content-[''] ${blobClass}`
              }`}
            >
              <img
                src={image}
                alt={alt}
                loading="lazy"
                className={`relative block h-full w-full max-w-full object-contain drop-shadow-[0_24px_30px_rgba(10,42,31,.3)] ${
                  blob === 'none' ? 'object-center' : 'object-bottom'
                }`}
              />
            </div>
          </div>
        </Container>
      </section>
    </ToneContext>
  )
}
