import { useLayoutEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const EXIT_MS = 250
const ENTER_MS = 280
const EXIT_SHIFT = -160
const ENTER_SHIFT = 320

const prefersReducedMotion = () =>
  matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Returns the location to render (pass it to <Routes location>). A link to a
 * different page keeps the current page on screen while it animates out, then
 * swaps in the new page and animates it in. Anything within the same page — a
 * #section link, the logo on Home, a nav link to the page you are on — passes
 * straight through with no animation.
 *
 * `pageRef` is the element that moves: the page content and footer, never the
 * header, so the nav and its mobile menu stay put.
 *
 * phase: idle → leaving → swap → entering → idle
 */
export function usePageTransition(pageRef) {
  const location = useLocation()
  const [shown, setShown] = useState(location)
  const [phase, setPhase] = useState('idle')

  // Adjusted while rendering rather than in an effect, so the new page and the
  // start of its entrance land in the same commit.
  if (phase === 'idle' && location !== shown) {
    if (location.pathname === shown.pathname || prefersReducedMotion()) setShown(location)
    else setPhase('leaving')
  } else if (phase === 'swap') {
    // The latest location: a second click during the exit wins.
    setShown(location)
    setPhase('entering')
  }

  useLayoutEffect(() => {
    const page = pageRef.current
    if (phase === 'leaving') {
      const exit = page.animate(
        [
          { opacity: 1, transform: 'none' },
          { opacity: 0, transform: `translateY(${EXIT_SHIFT}px)` },
        ],
        { id: 'page', duration: EXIT_MS, easing: 'ease-in', fill: 'forwards' },
      )
      exit.finished.then(() => {
        // Stay hidden, without the offset, until the new page has committed —
        // Layout scrolls it into position before it is shown.
        page.style.opacity = '0'
        exit.cancel()
        setPhase('swap')
      }, () => {})
    } else if (phase === 'entering') {
      page.style.opacity = ''
      const enter = page.animate(
        [
          { opacity: 0, transform: `translateY(${ENTER_SHIFT}px)` },
          { opacity: 1, transform: 'none' },
        ],
        { id: 'page', duration: ENTER_MS, easing: 'ease-out' },
      )
      enter.finished.then(() => setPhase('idle'), () => {})
    }
  }, [phase, pageRef])

  return shown
}
