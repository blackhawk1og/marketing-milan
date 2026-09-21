import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

/**
 * The static mockup got this for free from full page loads: land at the top on
 * navigation, jump to the anchor when the URL carries one (e.g. /services#ppc).
 *
 * `key` changes on every click, even a link to the page you are already on, so
 * that case behaves like a reload too: the logo on Home returns to the top.
 */
function useHashScroll() {
  const { pathname, hash, key } = useLocation()

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1))
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash, key])
}

export default function Layout() {
  useHashScroll()

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
