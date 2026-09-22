/** Home-page "what I do" cards. */
export const SERVICE_PREVIEWS = [
  {
    title: 'Social Media Marketing',
    blurb:
      'Consistent, on-brand content and community management that turns followers into customers.',
    to: '/services#social-media',
  },
  {
    // TODO(content): new placeholder blurb, written when SEO replaced the old
    // service list. Review it or replace it with your own wording.
    title: 'SEO',
    blurb:
      'Keyword research, on-page improvements and technical fixes that help people already searching find you.',
    to: '/services#seo',
  },
  {
    title: 'Meta Ads',
    blurb:
      'Facebook & Instagram campaigns built on real audience data and creative testing, not guesswork.',
    to: '/services#meta-ads',
  },
  {
    title: 'PPC',
    blurb:
      'Search campaigns that put you in front of people already looking for what you sell.',
    to: '/services#ppc',
  },
  {
    title: 'Email Marketing',
    blurb:
      'Newsletters and automated flows that turn one-time buyers into repeat customers.',
    to: '/services#email-marketing',
  },
]

/**
 * Accordion items on the Services page. `id` is the /services#<id> deep-link
 * target. The first few `tags` also preview each service in its collapsed row.
 */
export const SERVICE_DETAILS = [
  {
    id: 'social-media',
    num: '001',
    title: 'Social Media Marketing',
    lede: 'Your feed is often the first real impression of your business. I build a content system — not just random posts — so every post has a job: build trust, show the product, or start a conversation.',
    tags: ['Content strategy', 'Community management', 'Paid social', 'Analytics & reporting'],
  },
  {
    id: 'seo',
    num: '002',
    title: 'SEO',
    // TODO(content): new placeholder description, written when SEO was added.
    // Review it or replace it with your own wording.
    lede: 'Organic search for people who are already looking for what you offer — the right keywords, pages search engines can understand, and a site worth clicking through to.',
    tags: ['Keyword research', 'On-page SEO', 'Technical audits', 'Link building'],
  },
  {
    id: 'meta-ads',
    num: '003',
    title: 'Meta Ads',
    lede: "Boosting a post isn't a strategy. I set up structured Facebook & Instagram ad campaigns — targeting, creative testing and retargeting — so your budget goes toward people who are actually likely to buy.",
    tags: ['Audience targeting', 'Creative testing', 'Retargeting', 'Weekly reporting'],
  },
  {
    id: 'ppc',
    num: '004',
    title: 'PPC',
    lede: 'Pay-per-click campaigns for people who are already searching for what you offer — right keyword, right moment, right offer.',
    tags: ['Keyword research', 'Campaign structure', 'Ad copy', 'Conversion tracking', 'Budget optimization'],
  },
  {
    id: 'email-marketing',
    num: '005',
    title: 'Email Marketing',
    lede: 'Turn one-time buyers into repeat customers with newsletters and automated flows that show up at the right moment.',
    tags: ['Welcome & cart flows', 'Newsletters', 'List growth', 'Open & click optimization'],
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
