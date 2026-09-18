import FeaturedProjects from '../sections/home/FeaturedProjects'
import Hero from '../sections/home/Hero'
import HomeCta from '../sections/home/HomeCta'
import Pillars from '../sections/home/Pillars'
import ServicesPreview from '../sections/home/ServicesPreview'
import Statement from '../sections/home/Statement'

export default function Home() {
  return (
    <>
      <Hero />
      <Statement />
      <ServicesPreview />
      <Pillars />
      <FeaturedProjects />
      <HomeCta />
    </>
  )
}
