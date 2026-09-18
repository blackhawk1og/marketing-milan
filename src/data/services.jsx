import {
  MailMark,
  MonitorMark,
  SearchMark,
  SendMark,
  SocialMark,
} from '../components/Icons'

/** Home-page "what I do" cards. */
export const SERVICE_PREVIEWS = [
  {
    num: '01',
    title: 'Social Media',
    blurb:
      'Consistent, on-brand content and community management that turns followers into customers.',
    to: '/services#social-media',
  },
  {
    num: '02',
    title: 'Meta Ads',
    blurb:
      'Facebook & Instagram campaigns built on real audience data and creative testing, not guesswork.',
    to: '/services#meta-ads',
  },
  {
    num: '03',
    title: 'PPC',
    blurb:
      'Search campaigns that put you in front of people already looking for what you sell.',
    to: '/services#ppc',
  },
  {
    num: '04',
    title: 'Email Marketing',
    blurb:
      'Newsletters and automated flows that turn one-time buyers into repeat customers.',
    to: '/services#email-marketing',
  },
  {
    num: '05',
    title: 'Web Development',
    blurb:
      'Fast, mobile-first sites and landing pages built to convert clicks into customers.',
    to: '/services#web-development',
  },
]

/** Full detail rows on the Services page. `reverse` flips the media to the right. */
export const SERVICE_DETAILS = [
  {
    id: 'social-media',
    num: '01',
    title: 'Social Media',
    reverse: false,
    lede: 'Your feed is often the first real impression of your business. I build a content system — not just random posts — so every post has a job: build trust, show the product, or start a conversation.',
    points: [
      'Content calendar & captions tailored to your brand voice',
      'Design templates that keep your feed consistent',
      'Posting schedule & community management',
      'Monthly performance review',
    ],
    cta: 'Talk about Social Media',
    gradient: 'linear-gradient(155deg,#1c5c46,#0a2a1f)',
    Mark: SocialMark,
  },
  {
    id: 'meta-ads',
    num: '02',
    title: 'Meta Ads',
    reverse: true,
    lede: "Boosting a post isn't a strategy. I set up structured Facebook & Instagram ad campaigns — targeting, creative testing and retargeting — so your budget goes toward people who are actually likely to buy.",
    points: [
      'Audience research & targeting setup',
      'Ad creative & copy testing',
      'Retargeting funnels for warm audiences',
      'Weekly reporting on cost-per-result',
    ],
    cta: 'Talk about Meta Ads',
    gradient: 'linear-gradient(155deg,#c98a2b,#7a5218)',
    Mark: SendMark,
  },
  {
    id: 'ppc',
    num: '03',
    title: 'PPC (Search Ads)',
    reverse: false,
    lede: 'Pay-per-click campaigns for people who are already searching for what you offer — right keyword, right moment, right offer.',
    points: [
      'Keyword research & campaign structure',
      'Ad copy aligned to your landing page',
      'Conversion tracking setup',
      'Negative keyword & budget optimization',
    ],
    cta: 'Talk about PPC',
    gradient: 'linear-gradient(155deg,#3a382e,#14130f)',
    Mark: SearchMark,
  },
  {
    id: 'email-marketing',
    num: '04',
    title: 'Email Marketing',
    reverse: true,
    lede: 'Turn one-time buyers into repeat customers with newsletters and automated flows that show up at the right moment.',
    points: [
      'Welcome & abandoned-cart flows',
      'Segmented newsletter campaigns',
      'List growth strategy',
      'Open-rate & click-rate optimization',
    ],
    cta: 'Talk about Email Marketing',
    gradient: 'linear-gradient(155deg,#1c5c46,#0a2a1f)',
    Mark: MailMark,
  },
  {
    id: 'web-development',
    num: '05',
    title: 'Web Development',
    reverse: false,
    lede: 'A website that supports the rest of your marketing — fast, clear, and built to convert clicks into customers instead of losing them after the click.',
    points: [
      'Landing pages & business websites',
      'Mobile-first, fast-loading builds',
      'Conversion-focused layout & copy structure',
      'Basic on-page SEO & ongoing support',
    ],
    cta: 'Talk about Web Development',
    gradient: 'linear-gradient(155deg,#c98a2b,#7a5218)',
    Mark: MonitorMark,
  },
]

export const PROCESS_STEPS = [
  {
    num: '01',
    title: 'Discover',
    blurb:
      'Understand your product, customers and current marketing before touching a single ad or post.',
  },
  {
    num: '02',
    title: 'Strategy',
    blurb:
      'Pick the services and channels that actually fit your stage of growth — not every service, every time.',
  },
  {
    num: '03',
    title: 'Execute',
    blurb:
      'Build the content, campaigns, emails or site — with your brand voice, not a generic template.',
  },
  {
    num: '04',
    title: 'Review',
    blurb:
      'Regular reporting and adjustments, so the strategy keeps improving instead of running on autopilot.',
  },
]
