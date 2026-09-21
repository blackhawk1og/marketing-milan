/**
 * Scroll-triggered entrance. Elements marked with the `reveal` class fade up
 * the first time they scroll into view, and are never watched again.
 *
 * Anything already on screen (or scrolled past) when a page arrives is left
 * alone — the page transition has just brought it in, and a second fade on top
 * would fight it. Only what is still below the fold is held back.
 *
 * Everything that comes into view in the same moment (a row of cards, the
 * accordion rows) is staggered in page order, so they cascade rather than pop.
 */

const DURATION = 450
const SHIFT = 20
const STAGGER = 70
const MAX_STAGGER_STEPS = 4
// Starts a little before the element is fully up, as it crosses 90% of the screen.
const TRIGGER_LINE = 0.9

const PENDING = 'reveal-pending' // held hidden, see index.css

/**
 * Starts watching `root`'s `.reveal` elements. Call after the page is in its
 * final scroll position; returns a stop function. `offsetY` is how far the page
 * is still displaced by its own entrance, so it is not mistaken for scrolling.
 *
 * Stopping only stops watching: whatever has not revealed yet stays hidden, so
 * a page on its way out never starts revealing (its exit drift would otherwise
 * lift items over the line). Each call sets every element's state afresh, so a
 * repeat call on the same page can never leave something stuck hidden.
 */
export function revealOnScroll(root, offsetY = 0) {
  const all = [...root.querySelectorAll('.reveal')]
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    all.forEach((el) => el.classList.remove(PENDING))
    return () => {}
  }

  const line = innerHeight * TRIGGER_LINE
  const pending = all.filter((el) => {
    const below = el.getBoundingClientRect().top - offsetY >= line
    el.classList.toggle(PENDING, below)
    return below
  })

  const observer = new IntersectionObserver(
    (entries) => {
      const arriving = entries
        .filter((entry) => entry.isIntersecting)
        .map((entry) => entry.target)
        .sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1))
      arriving.forEach((el, i) => {
        observer.unobserve(el)
        el.classList.remove(PENDING)
        el.animate(
          [
            { opacity: 0, transform: `translateY(${SHIFT}px)` },
            { opacity: 1, transform: 'none' },
          ],
          {
            id: 'reveal',
            duration: DURATION,
            delay: Math.min(i, MAX_STAGGER_STEPS) * STAGGER,
            easing: 'ease-out',
            fill: 'backwards', // hold the start pose through the stagger delay
          },
        )
      })
    },
    { rootMargin: `0px 0px -${Math.round((1 - TRIGGER_LINE) * 100)}% 0px` },
  )
  pending.forEach((el) => observer.observe(el))

  return () => observer.disconnect()
}
