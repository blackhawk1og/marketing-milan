/** Inline SVGs lifted from the mockup. `className` carries the sizing. */

const svgProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  'aria-hidden': 'true',
}

export function CheckIcon({ className = '' }) {
  return (
    <svg {...svgProps} strokeWidth="2.2" className={className}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

export function InstagramIcon({ className = '', strokeWidth = '1.8' }) {
  return (
    <svg {...svgProps} strokeWidth={strokeWidth} className={className}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" />
    </svg>
  )
}

export function PhoneIcon({ className = '', strokeWidth = '1.8' }) {
  return (
    <svg {...svgProps} strokeWidth={strokeWidth} className={className}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

export function MailIcon({ className = '', strokeWidth = '1.8' }) {
  return (
    <svg {...svgProps} strokeWidth={strokeWidth} className={className}>
      <path d="M22 6.5 12 13 2 6.5" />
      <rect x="2" y="4" width="20" height="16" rx="2" />
    </svg>
  )
}

export function FacebookIcon({ className = '', strokeWidth = '1.8' }) {
  return (
    <svg
      {...svgProps}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M7 10v4h3v7h4v-7h3l1-4h-4V8a1 1 0 0 1 1-1h3V3h-3a5 5 0 0 0-5 5v2H7" />
    </svg>
  )
}

export function WhatsAppIcon({ className = '', strokeWidth = '1.8' }) {
  return (
    <svg
      {...svgProps}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
      <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
    </svg>
  )
}

export function MapPinIcon({ className = '', strokeWidth = '1.8' }) {
  return (
    <svg {...svgProps} strokeWidth={strokeWidth} className={className}>
      <path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0 1 18 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

/* ---- Service media marks ---- */

export function SocialMark({ className = '' }) {
  return (
    <svg {...svgProps} strokeWidth="1.6" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.2" cy="6.8" r="1" />
    </svg>
  )
}

export function SendMark({ className = '' }) {
  return (
    <svg {...svgProps} strokeWidth="1.6" className={className}>
      <path d="M3 11l18-7-7 18-3-8-8-3z" />
    </svg>
  )
}

export function SearchMark({ className = '' }) {
  return (
    <svg {...svgProps} strokeWidth="1.6" className={className}>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
    </svg>
  )
}

export function MailMark({ className = '' }) {
  return (
    <svg {...svgProps} strokeWidth="1.6" className={className}>
      <rect x="2" y="4" width="20" height="16" rx="3" />
      <path d="M2 6l10 7 10-7" />
    </svg>
  )
}

export function MonitorMark({ className = '' }) {
  return (
    <svg {...svgProps} strokeWidth="1.6" className={className}>
      <rect x="3" y="4" width="18" height="14" rx="2" />
      <path d="M8 21h8M12 18v3" />
    </svg>
  )
}
