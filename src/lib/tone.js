import { createContext, use } from 'react'

/**
 * Mirrors the mockup's `.on-cream` / `.on-dark` / `.on-ink` section classes,
 * which styled their descendants by cascade. Sections publish their tone here
 * and the shared primitives below read it, so call sites stay markup-shaped.
 */
export const ToneContext = createContext('cream')

export function useTone() {
  return use(ToneContext)
}

export const isDarkTone = (tone) => tone !== 'cream'

/** Headings went white on both dark tones; on cream they inherit ink-900. */
export const headingTone = (tone) => (isDarkTone(tone) ? 'text-white' : '')

export const ledeTone = (tone) =>
  isDarkTone(tone) ? 'text-cream-100/72' : 'text-gold-600'

/** Only `.on-dark` lifted the eyebrow/accent to gold-400 — `.on-ink` did not. */
export const eyebrowTone = (tone) =>
  tone === 'dark' ? 'text-gold-400' : 'text-gold-600'

export const accentTone = (tone) =>
  tone === 'dark' ? 'text-gold-400' : 'text-gold-500'

export const badgeTone = (tone) =>
  isDarkTone(tone) ? 'bg-gold-400' : 'bg-gold-500'

export const tagTone = (tone) =>
  isDarkTone(tone)
    ? 'border-white/22 text-cream-100/85'
    : 'border-ink-950/14 text-ink-700'
