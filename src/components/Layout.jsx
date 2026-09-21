import { useLayoutEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

/**
 * The static mockup got this for free from full page loads: land at the top on
 * navigation, jump to the anchor when the URL carries one (e.g. /services#ppc).
 *
 * `key` changes on every click, even a link to the page you are already on, so
 * that case behaves like a reload too: the logo on Home returns to the top.
 *
 * A layout effect, so a newly arrived page is scrolled into place while the
 * page transition still has it hidden, before its entrance starts. On arrival
 * the jump is instant; within a page, #links still glide.
 */
function useHashScroll() {
  const { pathname, hash, key } = useLocation()
  const lastPathname = useRef(null)

  useLayoutEffect(() => {
    const arriving = lastPathname.current !== pathname
    lastPathname.current = pathname
    if (hash) {
      const target = document.getElementById(hash.slice(1))
      if (target) {
        target.scrollIntoView({ behavior: arriving ? 'instant' : 'smooth', block: 'start' })
        return
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash, key])
}

/** `pageRef` is what the page transition moves: the content and footer, not the header. */
export default function Layout({ pageRef }) {
  useHashScroll()

  return (
    <>
      <Header />
      <div ref={pageRef}>
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  )
}
