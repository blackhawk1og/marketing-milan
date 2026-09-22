import { useLayoutEffect, useRef } from 'react'
import Heading from '../../components/ui/Heading'
import Lede from '../../components/ui/Lede'
import Tag from '../../components/ui/Tag'

// Sequenced after nixtio.com's services accordion: the outgoing state leaves
// first, accelerating away; after a short beat the incoming one settles in.
const EXIT_MS = 200
const GAP_MS = 50
const ENTER_MS = 200

const REST = { transform: 'none', opacity: 1 }
const HIDDEN = { transform: 'none', opacity: 0 }
const shift = (px) => `translateY(${px}px)`

const running = (el, id) => el.getAnimations().filter((a) => a.id === id)

/**
 * Where `el` is on screen right now. Mid-animation that is its animated pose;
 * otherwise it is still in the resting pose from before this toggle (React has
 * already applied the new resting classes, so computed style would lie).
 */
function poseOf(el, wasVisible) {
  if (!running(el, 'swap').length) return wasVisible ? REST : HIDDEN
  const style = getComputedStyle(el)
  return { transform: style.transform, opacity: Number(style.opacity) }
}

/**
 * Stage 1: `outgoing` leaves towards `exitTo`. Stage 2, after a short gap:
 * `incoming` arrives from `enterFrom` and settles. If a toggle lands
 * mid-sequence, each element carries on from where it is instead of snapping.
 */
function sequence(outgoing, exitTo, incoming, enterFrom) {
  const out = poseOf(outgoing, true)
  const inn = poseOf(incoming, false)
  running(outgoing, 'swap').forEach((a) => a.cancel())
  running(incoming, 'swap').forEach((a) => a.cancel())

  const leaving = out.opacity > 0.01
  if (leaving) {
    outgoing.animate([out, { transform: exitTo, opacity: 0 }], {
      id: 'swap',
      duration: EXIT_MS,
      easing: 'ease-in',
    })
  }

  // Caught on its way out: turn straight round rather than restart the sequence.
  const turning = inn.opacity > 0.01
  incoming.animate([turning ? inn : { transform: enterFrom, opacity: 0 }, REST], {
    id: 'swap',
    duration: ENTER_MS,
    delay: leaving && !turning ? EXIT_MS + GAP_MS : 0,
    easing: 'ease-out',
    fill: 'backwards', // hold the start pose through the delay
  })
}

/** Glides the frame to `to` px over the whole sequence, from wherever it is now. */
function glide(frame, to) {
  const from = frame.getBoundingClientRect().height
  running(frame, 'glide').forEach((a) => a.cancel())
  frame.style.height = `${to}px`
  frame.animate([{ height: `${from}px` }, { height: `${to}px` }], {
    id: 'glide',
    duration: EXIT_MS + GAP_MS + ENTER_MS,
    easing: 'ease-in-out',
  })
}

/**
 * One accordion item, drawn as two stacked states: the collapsed title inside
 * the trigger, and the expanded block (title, description, categories)
 * positioned over it. Toggling plays them in sequence, each travelling its full
 * height through the row as if through a window:
 *
 *   expand    the title drops out below, then the block slides down from above
 *   collapse  the block slides up and out, then the title rises back from below
 *
 * The number and +/− stay put. The frame's height glides between the two
 * states' measured heights, so rows below slide rather than jump.
 */
export default function ServiceRow({ id, num, title, lede, tags, open, instant, onToggle }) {
  const triggerId = `${id}-trigger`
  const panelId = `${id}-panel`

  const frameRef = useRef(null)
  const headRef = useRef(null)
  const titleRef = useRef(null)
  const panelRef = useRef(null)
  // The state the frame is currently sized for; lags `open` until the effect below runs.
  const shownOpenRef = useRef(open)

  // Size the frame to the state on show. Resizes (fonts loading, viewport
  // changes) snap straight to the new height; only toggles glide.
  useLayoutEffect(() => {
    const snap = () => {
      const shown = shownOpenRef.current ? panelRef.current : headRef.current
      frameRef.current.style.height = `${shown.offsetHeight}px`
    }
    snap()
    const observer = new ResizeObserver(snap)
    observer.observe(headRef.current)
    observer.observe(panelRef.current)
    return () => observer.disconnect()
  }, [])

  useLayoutEffect(() => {
    if (shownOpenRef.current === open) return
    shownOpenRef.current = open
    const frame = frameRef.current
    const title = titleRef.current
    const panel = panelRef.current
    const collapsedH = headRef.current.offsetHeight
    const expandedH = panel.offsetHeight

    // Jump straight to the resting state (the resting classes are already applied).
    if (instant || matchMedia('(prefers-reduced-motion: reduce)').matches) {
      running(frame, 'glide').forEach((a) => a.cancel())
      running(title, 'swap').forEach((a) => a.cancel())
      running(panel, 'swap').forEach((a) => a.cancel())
      frame.style.height = `${open ? expandedH : collapsedH}px`
      return
    }
    glide(frame, open ? expandedH : collapsedH)
    if (open) sequence(title, shift(collapsedH), panel, shift(-expandedH))
    else sequence(panel, shift(-expandedH), title, shift(collapsedH))
  }, [open, instant])

  return (
    <li id={id} className="reveal group/row scroll-mt-28 border-b border-ink-950/10">
      {/* The frame is the window both states travel through, so it clips on
          every side. That would clip the trigger's focus ring too, so the ring
          is drawn on the frame itself instead. */}
      <div
        ref={frameRef}
        className="relative overflow-hidden has-[button:focus-visible]:outline-2 has-[button:focus-visible]:outline-offset-3 has-[button:focus-visible]:outline-accent-500"
      >
        {/* z-10 keeps the trigger clickable above the expanded block. */}
        <Heading as="h3" size="lg" flush className="relative z-10">
          <button
            ref={headRef}
            type="button"
            id={triggerId}
            aria-expanded={open}
            aria-controls={panelId}
            onClick={onToggle}
            className="group flex w-full cursor-pointer items-center gap-4 py-6 text-left focus-visible:outline-none gt640:py-8"
          >

            <span className="w-10 shrink-0 text-[1rem] text-accent-600 tabular-nums gt640:w-40">
              {num}
            </span>
            {/* The collapsed state: title, plus (desktop) a preview of the first
                categories, which the full list replaces once the row opens. The
                title never shrinks there, so the preview truncates instead of
                pushing it onto a second line out of step with its expanded copy. */}
            <span
              ref={titleRef}
              className={`flex min-w-0 flex-1 items-baseline justify-between gap-8 transition-colors duration-[250ms] group-hover:text-forest-700 ${
                open ? 'opacity-0' : ''
              }`}
            >
              <span className="gt1023:shrink-0">{title}</span>
              <span
                aria-hidden="true"
                className="hidden min-w-0 truncate font-body text-[0.9rem] font-semibold tracking-normal text-ink-700/65 gt1023:block"
              >
                {tags.slice(0, 3).join(' · ')}
              </span>
            </span>
            <span
              aria-hidden="true"
              className={`relative h-10 w-10 shrink-0 rounded-full border-[1.5px] transition-colors duration-[250ms] ${
                open
                  ? 'border-forest-900 bg-forest-900 text-white'
                  : 'border-ink-950/14 text-forest-900 group-hover:border-forest-900'
              }`}
            >
              <span className="absolute top-1/2 left-1/2 h-0.5 w-3.5 -translate-x-1/2 -translate-y-1/2 bg-current" />
              {/* The vertical bar collapses to turn + into −. */}
              <span
                className={`absolute top-1/2 left-1/2 h-3.5 w-0.5 -translate-x-1/2 -translate-y-1/2 bg-current transition-transform duration-[250ms] ease-brand ${
                  open ? 'scale-y-0' : ''
                }`}
              />
            </span>
          </button>
        </Heading>

        <div
          ref={panelRef}
          id={panelId}
          role="region"
          aria-labelledby={triggerId}
          inert={!open}
          className={`absolute inset-x-0 top-0 ${open ? '' : 'opacity-0'}`}
        >
          {/* Mirrors the trigger row, with spacers for the number and toggle,
              so this copy of the title sits exactly where the collapsed one does. */}
          <div aria-hidden="true" className="flex items-center gap-4 py-6 gt640:py-8">
            <span className="w-10 shrink-0 gt640:w-40" />
            <Heading
              as="p"
              size="lg"
              flush
              className="flex-1 text-forest-900 transition-colors duration-[250ms] group-has-[button:hover]/row:text-forest-700"
            >
              {title}
            </Heading>
            <span className="h-10 w-10 shrink-0" />
          </div>

          {/* pl-44 = number column (w-40) + gap-4, so copy lines up with the title.
              From gt900 the description and categories sit side by side. */}
          <div className="pb-8 gt640:pr-14 gt640:pl-44 gt900:grid gt900:grid-cols-2 gt900:gap-12">
            <Lede className="max-w-[640px] gt900:mb-0">{lede}</Lede>
            <div>
              <p className="mt-6 mb-3 text-[0.72rem] font-bold tracking-[0.14em] text-ink-700 uppercase gt900:mt-0">
                Categories
              </p>
              <ul className="flex list-none flex-wrap gap-2 p-0">
                {tags.map((tag) => (
                  <li key={tag} className="flex">
                    <Tag>{tag}</Tag>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}
