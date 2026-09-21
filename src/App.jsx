import { useRef } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import { usePageTransition } from './lib/usePageTransition'
import About from './pages/About'
import Contact from './pages/Contact'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Services from './pages/Services'

export default function App() {
  const pageRef = useRef(null)
  // Routes render the page on screen, which lags the URL while it animates out.
  const { location, leaving } = usePageTransition(pageRef)

  return (
    <Routes location={location}>
      <Route element={<Layout pageRef={pageRef} leaving={leaving} />}>
        <Route index element={<Home />} />
        <Route path="services" element={<Services />} />
        <Route path="projects" element={<Projects />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
      </Route>
    </Routes>
  )
}
