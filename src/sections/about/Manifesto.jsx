import Container from '../../components/ui/Container'
import Eyebrow from '../../components/ui/Eyebrow'
import Heading from '../../components/ui/Heading'
import Lede from '../../components/ui/Lede'
import Section from '../../components/ui/Section'
import SectionHead from '../../components/ui/SectionHead'

const BLOCKS = [
  {
    index: '01 / 05',
    title: "Your biggest competitor isn't another brand.",
    lede: 'It\u2019s "I\u2019ll think about it." And that\u2019s a marketing problem, not a sales problem — one a clearer strategy can actually fix.',
  },
  {
    index: '02 / 05',
    title: 'People have endless options. Most brands still sound the same.',
    struck: [
      '"Quality you can trust."',
      '"We put our customers first."',
      '"Best-in-class service."',
      '"DM us to know more."',
    ],
    lede: 'If everyone sounds the same, why would anyone remember you?',
  },
  {
    index: '03 / 05',
    title: 'Stop trying to look professional. Start trying to be recognizable.',
    lede: 'Have an opinion. Use a distinct voice. Show personality. Say something worth sharing — people remember brands that made them feel something, not brands that just looked safe.',
  },
  {
    index: '04 / 05',
    title:
      'Ask yourself: if your logo disappeared from your post, would people still know it was yours?',
    lede: "If the answer is no, your brand probably doesn't need a new template. It needs a point of view.",
  },
  {
    index: '05 / 05',
    title: 'Be the brand they remember — not the brand they scroll past.',
    lede: "Different gets noticed. Recognizable gets remembered. That's the standard every project here is held to.",
  },
]

export default function Manifesto() {
  return (
    <Section tone="ink">
      <Container>
        <SectionHead>
          <Eyebrow className="reveal">How I see marketing</Eyebrow>
          <Heading size="lg" className="reveal">A point of view, not a template.</Heading>
        </SectionHead>

        {BLOCKS.map(({ index, title, struck, lede }, i) => (
          <div
            key={index}
            className={`reveal grid grid-cols-1 items-start gap-3.5 py-9 gt720:grid-cols-[0.5fr_1fr] gt720:gap-10 ${
              i === BLOCKS.length - 1 ? '' : 'border-b border-white/10'
            }`}
          >
            <span className="font-display text-[1rem] tracking-[0.1em] text-gold-400">
              {index}
            </span>
            <div>
              <Heading as="h3" size="manifesto">
                {title}
              </Heading>
              {struck && (
                <ul className="my-[18px] flex list-none flex-col gap-2 p-0">
                  {struck.map((line) => (
                    <li key={line} className="italic line-through text-cream-100/55">
                      {line}
                    </li>
                  ))}
                </ul>
              )}
              <Lede>{lede}</Lede>
            </div>
          </div>
        ))}
      </Container>
    </Section>
  )
}
