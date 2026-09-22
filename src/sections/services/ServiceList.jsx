import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import ServiceRow from './ServiceRow'
import { ArrowIcon } from '../../components/Icons'
import Button from '../../components/ui/Button'
import Container from '../../components/ui/Container'
import Eyebrow from '../../components/ui/Eyebrow'
import Heading from '../../components/ui/Heading'
import Section from '../../components/ui/Section'
import SectionHead from '../../components/ui/SectionHead'
import { SERVICE_DETAILS } from '../../data/services'

/** The service a `/services#<id>` link points at, or null. */
function serviceFromHash(hash) {
  const id = hash.slice(1)
  return SERVICE_DETAILS.some((service) => service.id === id) ? id : null
}

export default function ServiceList() {
  const { hash } = useLocation()
  // One item open at a time. All start collapsed unless a deep link names one.
  const [openId, setOpenId] = useState(() => serviceFromHash(hash))
  // Link-driven changes skip the animation: Layout scrolls to the row straight
  // away, and a row above it still animating shut would move the target mid-scroll.
  const [instant, setInstant] = useState(false)

  // Nav/footer links to another service change only the hash while this page
  // stays mounted. Syncing during render (not in an effect) opens the item
  // before Layout's hash-scroll effect runs.
  const [prevHash, setPrevHash] = useState(hash)
  if (hash !== prevHash) {
    setPrevHash(hash)
    const id = serviceFromHash(hash)
    if (id) {
      setOpenId(id)
      setInstant(true)
    }
  }

  return (
    <Section>
      <Container>
        {/* From gt640 the eyebrow sits in the rows' number column (w-40 + gap-4)
            so it lines up with 001… and the heading lines up with the titles. */}
        <SectionHead className="gt640:flex gt640:items-center gt640:gap-4">
          <Eyebrow className="reveal shrink-0 gt640:mb-0 gt640:w-40">What I do</Eyebrow>
          <Heading size="xl" flush className="reveal">
            Our Services
          </Heading>
        </SectionHead>

        <ul className="list-none border-t border-ink-950/10 p-0">
          {SERVICE_DETAILS.map((service) => (
            <ServiceRow
              key={service.id}
              {...service}
              open={openId === service.id}
              instant={instant}
              onToggle={() => {
                setInstant(false)
                setOpenId((current) => (current === service.id ? null : service.id))
              }}
            />
          ))}
        </ul>

        <Button to="/contact" className="group mt-10 gt640:ml-45">
          Get started <ArrowIcon />
        </Button>
      </Container>
    </Section>
  )
}
