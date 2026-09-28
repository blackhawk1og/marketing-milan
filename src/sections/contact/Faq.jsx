import { useState } from 'react'
import FaqItem from './FaqItem'
import Container from '../../components/ui/Container'
import Eyebrow from '../../components/ui/Eyebrow'
import Heading from '../../components/ui/Heading'
import Section from '../../components/ui/Section'
import SectionHead from '../../components/ui/SectionHead'

const FAQS = [
  {
    q: 'Do you work with businesses outside Nepal?',
    a: 'Yes — most of the work happens remotely over calls, email and WhatsApp, so location isn’t a limitation.',
  },
  {
    q: 'Do I need to use all five services?',
    a: 'No. Most projects start with one or two services that match your current goal, and expand once that’s working.',
  },
  {
    q: 'How fast can we start?',
    a: 'After an initial call to understand your business, most projects kick off within a week.',
  },
  {
    q: 'Do you sign long contracts?',
    a: 'No long lock-ins. We agree on scope month to month, so the relationship continues because it’s working, not because of a contract.',
  },
]

export default function Faq() {
  // One answer at a time, as on the services page: opening a question closes
  // whichever was open.
  const [openId, setOpenId] = useState(null)

  return (
    <Section className="flow-root pt-0">
      <Container>
        <SectionHead>
          <Heading size="lg" className="reveal">A few common questions.</Heading>
        </SectionHead>
        <div className="max-w-[760px]">
          {FAQS.map(({ q, a }, index) => {
            const id = `faq-${index + 1}`
            return (
              <FaqItem
                key={q}
                id={id}
                question={q}
                answer={a}
                open={openId === id}
                onToggle={() =>
                  setOpenId((current) => (current === id ? null : id))
                }
              />
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
