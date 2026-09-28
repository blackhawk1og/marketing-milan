import { useLayoutEffect, useRef } from 'react'
import {
  ENTER_MS,
  EXIT_MS,
  GAP_MS,
  glide,
  running,
  wantsReducedMotion,
} from '../../lib/accordion'

// One stage, not the services list's two: the question stays put, so only the
// answer travels. It rolls its own height down through the frame, which glides
// open underneath it over the same span.
const ROLL_MS = ENTER_MS + GAP_MS
const REST = { transform: 'none', opacity: 1 }
const ABOVE = { transform: 'translateY(-100%)', opacity: 0 }

const TRIGGER =
  "flex w-full cursor-pointer items-center justify-between gap-4 py-[18px] text-left text-[1.02rem] font-bold min-h-11 gt640:min-h-auto"

/**
 * One FAQ row. The answer rolls down from behind the question when it opens and
 * back up behind it when it closes, in the same motion language as the services
 * accordion; the +/− is the only part that stays still.
 */
export default function FaqItem({ id, question, answer, open, onToggle }) {
  const frameRef = useRef(null)
  const panelRef = useRef(null)
  // The state the frame is sized for; lags `open` until the effect below runs.
  const shownOpenRef = useRef(open)

  // Keep the open frame in step with its answer when the answer reflows
  // (fonts loading, a resize); only a toggle animates.
  useLayoutEffect(() => {
    const snap = () => {
      frameRef.current.style.height = shownOpenRef.current
        ? `${panelRef.current.offsetHeight}px`
        : '0px'
    }
    snap()
    const observer = new ResizeObserver(snap)
    observer.observe(panelRef.current)
    return () => observer.disconnect()
  }, [])

  useLayoutEffect(() => {
    if (shownOpenRef.current === open) return
    shownOpenRef.current = open
    const frame = frameRef.current
    const panel = panelRef.current
    const height = panel.offsetHeight

    if (wantsReducedMotion()) {
      running(frame, 'glide').forEach((a) => a.cancel())
      running(panel, 'swap').forEach((a) => a.cancel())
      frame.style.height = open ? `${height}px` : '0px'
      return
    }

    glide(frame, open ? height : 0, ROLL_MS)
    // Mid-toggle, carry on from where the answer is rather than snapping.
    const from = running(panel, 'swap').length
      ? {
          transform: getComputedStyle(panel).transform,
          opacity: Number(getComputedStyle(panel).opacity),
        }
      : open
        ? ABOVE
        : REST
    running(panel, 'swap').forEach((a) => a.cancel())
    panel.animate([from, open ? REST : ABOVE], {
      id: 'swap',
      duration: open ? ENTER_MS : EXIT_MS,
      delay: open ? GAP_MS : 0,
      easing: open ? 'ease-out' : 'ease-in',
      fill: 'backwards', // hold the start pose through the delay
    })
  }, [open])

  return (
    <div className="reveal border-b border-ink-950/12">
      <button
        type="button"
        id={`${id}-trigger`}
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        onClick={onToggle}
        className={TRIGGER}
      >
        <span>{question}</span>
        <span
          aria-hidden="true"
          className={`relative h-4 w-4 shrink-0 text-accent-600 transition-transform duration-200 ease-brand ${
            open ? 'rotate-45' : ''
          }`}
        >
          <span className="absolute top-1/2 left-0 h-0.5 w-4 -translate-y-1/2 rounded-full bg-current" />
          <span className="absolute top-0 left-1/2 h-4 w-0.5 -translate-x-1/2 rounded-full bg-current" />
        </span>
      </button>

      {/* The window the answer rolls through. */}
      <div ref={frameRef} className="overflow-hidden">
        <div
          ref={panelRef}
          id={`${id}-panel`}
          role="region"
          aria-labelledby={`${id}-trigger`}
          inert={!open}
        >
          <p className="pb-[18px] text-pretty text-ink-700">{answer}</p>
        </div>
      </div>
    </div>
  )
}
