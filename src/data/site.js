export const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/projects', label: 'Projects' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export const SERVICE_LINKS = [
  { to: '/services#social-media', label: 'Social Media' },
  { to: '/services#meta-ads', label: 'Meta Ads' },
  { to: '/services#ppc', label: 'PPC' },
  { to: '/services#email-marketing', label: 'Email Marketing' },
  { to: '/services#web-development', label: 'Web Development' },
]

/**
 * Options for the contact form's service picker. Shared with the send endpoint
 * (api/_lib/templates.js), which maps the submitted slug back to a readable
 * label for the notification email.
 */
export const SERVICE_OPTIONS = [
  { value: '', label: 'Not sure yet' },
  { value: 'social', label: 'Social Media' },
  { value: 'meta-ads', label: 'Meta Ads' },
  { value: 'ppc', label: 'PPC' },
  { value: 'email', label: 'Email Marketing' },
  { value: 'web', label: 'Web Development' },
  { value: 'multiple', label: 'A few of these together' },
]

export const CONTACT = {
  phone: '+977 982-3058082',
  phoneHref: 'tel:+9779823058082',
  whatsapp: 'https://wa.me/9779823058082',
  instagram: 'https://instagram.com/milansunuwar.digitalmarketing',
  instagramHandle: '@milansunuwar.digitalmarketing',
  email: 'hello@milansunuwar.com',
  emailHref: 'mailto:hello@milansunuwar.com',
  location: 'Nepal · Remote-friendly worldwide',
}
