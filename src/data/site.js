export const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/projects', label: 'Projects' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export const SERVICE_LINKS = [
  { to: '/services#social-media', label: 'Social Media Marketing' },
  { to: '/services#seo', label: 'SEO' },
]

/**
 * Choices behind the contact form's "How can we help you?" chips. Shared with
 * the send endpoint (api/_lib/), which filters the submitted slugs against this
 * list and maps them to readable labels for the notification email.
 *
 * Selecting none is how a visitor says "not sure" — the email then reads
 * "Not specified".
 */
export const SERVICE_CHOICES = [
  { value: 'social', label: 'Social Media Marketing' },
  { value: 'seo', label: 'SEO' },
]

export const CONTACT = {
  phone: '+977 982-3058082',
  phoneHref: 'tel:+9779823058082',
  whatsapp: 'https://wa.me/9779823058082',
  instagram: 'https://instagram.com/milansunuwar.digitalmarketing',
  instagramHandle: '@milansunuwar.digitalmarketing',
  facebook: 'https://www.facebook.com/1231289910062011',
  email: 'hello@milansunuwar.com',
  emailHref: 'mailto:hello@milansunuwar.com',
  location: 'Nepal · Remote-friendly worldwide',
}
