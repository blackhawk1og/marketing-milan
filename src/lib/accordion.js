/**
 * Shared motion for the site's accordions: the services list and the FAQ.
 * Sequenced after nixtio.com's services accordion — a state leaves, then after a
 * short beat the next one settles in, while the row's height glides between the
 * two so what follows slides rather than jumps.
 */
export const EXIT_MS = 200
export const GAP_MS = 50
export const ENTER_MS = 200

export const running = (el, id) => el.getAnimations().filter((a) => a.id === id)

export const wantsReducedMotion = () =>
  matchMedia('(prefers-reduced-motion: reduce)').matches

/** Glides `frame` to `to` px over `duration`, from whatever height it has now. */
export function glide(frame, to, duration = EXIT_MS + GAP_MS + ENTER_MS) {
  const from = frame.getBoundingClientRect().height
  running(frame, 'glide').forEach((a) => a.cancel())
  frame.style.height = `${to}px`
  frame.animate([{ height: `${from}px` }, { height: `${to}px` }], {
    id: 'glide',
    duration,
    easing: 'ease-in-out',
  })
}
