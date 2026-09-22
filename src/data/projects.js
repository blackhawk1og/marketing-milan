/**
 * `categories` drives the filter buttons on the Projects page.
 *
 * TODO(content): these filters still list the former services (Meta Ads, PPC,
 * Email Marketing, Web Development). Kept for now to match the sample projects
 * below; update them to the real service list when real projects go in.
 */
export const PROJECT_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'social', label: 'Social Media' },
  { id: 'ads', label: 'Meta Ads' },
  { id: 'ppc', label: 'PPC' },
  { id: 'email', label: 'Email Marketing' },
  { id: 'web', label: 'Web Development' },
]

// TODO(content): all six projects are fictional samples: invented business
// names, blurbs and results, tagged with former services. The Projects page
// labels them as illustrative, but they need replacing with real client work
// (real names, what was done, and real outcomes).
export const PROJECTS = [
  {
    initials: 'HC',
    name: 'Himal Coffee Roasters',
    gradient: 'linear-gradient(150deg,#1c5c46,#0a2a1f)',
    categories: ['social'],
    tags: ['Social Media'],
    blurb:
      'Rebuilt the Instagram presence around brew tutorials, roaster stories and behind-the-scenes content.',
    result: 'Steady month-over-month growth in engaged followers',
  },
  {
    initials: 'EF',
    name: 'Everest Fit Studio',
    gradient: 'linear-gradient(150deg,#c98a2b,#7a5218)',
    categories: ['web', 'email'],
    tags: ['Web Development', 'Email Marketing'],
    blurb:
      'Designed a class-booking landing page and a four-part welcome email flow for new members.',
    result: 'Shorter path from first visit to first booked class',
  },
  {
    initials: 'KB',
    name: 'Kathmandu Bites',
    gradient: 'linear-gradient(150deg,#3a382e,#14130f)',
    categories: ['ppc', 'ads'],
    tags: ['PPC', 'Meta Ads'],
    blurb:
      'Search and Meta campaigns built around lunchtime delivery intent, tested across three ad sets.',
    result: 'Lower cost per order across both channels',
  },
  {
    initials: 'SY',
    name: 'Sunrise Yoga Retreat',
    gradient: 'linear-gradient(150deg,#154a38,#0e3a2b)',
    categories: ['web', 'social'],
    tags: ['Web Development', 'Social Media'],
    blurb:
      'New booking site plus a content calendar built around seasonal retreat launches.',
    result: 'Clear booking funnel from Instagram to inquiry form',
  },
  {
    initials: 'UT',
    name: 'Urban Threads Apparel',
    gradient: 'linear-gradient(150deg,#7a5218,#3a2a0d)',
    categories: ['ads', 'email'],
    tags: ['Meta Ads', 'Email Marketing'],
    blurb:
      'Retargeting funnel paired with an abandoned-cart email sequence for an online apparel store.',
    result: 'More repeat purchases from existing customers',
  },
  {
    initials: 'LR',
    name: 'Local Roots Grocery',
    gradient: 'linear-gradient(150deg,#0a2a1f,#14130f)',
    categories: ['social', 'ppc'],
    tags: ['Social Media', 'PPC'],
    blurb:
      'Local search ads and community-focused content for a neighbourhood grocer.',
    result: 'More foot traffic tracked through in-store mentions',
  },
]

/**
 * The three cards featured on the home page use shorter copy and no result line.
 *
 * TODO(content): these are three of the fictional samples above, and Home
 * presents them as real work ("A few products I've helped grow") without the
 * Projects page's sample note. Replace them with real projects.
 */
export const FEATURED_PROJECTS = [
  {
    initials: 'HC',
    name: 'Himal Coffee Roasters',
    gradient: 'linear-gradient(150deg,#1c5c46,#0a2a1f)',
    tags: ['Social Media'],
    blurb: 'Rebuilt an Instagram presence around brew tutorials and roaster stories.',
  },
  {
    initials: 'EF',
    name: 'Everest Fit Studio',
    gradient: 'linear-gradient(150deg,#c98a2b,#7a5218)',
    tags: ['Web Development'],
    blurb: 'Designed a class-booking landing page paired with a welcome email flow.',
  },
  {
    initials: 'KB',
    name: 'Kathmandu Bites',
    gradient: 'linear-gradient(150deg,#3a382e,#14130f)',
    tags: ['PPC'],
    blurb: 'Search and Meta campaigns built around lunchtime delivery intent.',
  },
]
