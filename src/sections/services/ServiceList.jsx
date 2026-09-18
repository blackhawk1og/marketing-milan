import ServiceRow from './ServiceRow'
import Container from '../../components/ui/Container'
import Section from '../../components/ui/Section'
import { SERVICE_DETAILS } from '../../data/services'

export default function ServiceList() {
  return (
    <Section>
      <Container>
        {SERVICE_DETAILS.map((service, index) => (
          <ServiceRow
            key={service.id}
            {...service}
            isLast={index === SERVICE_DETAILS.length - 1}
          />
        ))}
      </Container>
    </Section>
  )
}
