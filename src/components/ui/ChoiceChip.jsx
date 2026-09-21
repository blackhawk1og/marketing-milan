const BASE =
  'cursor-pointer rounded-full border-[1.5px] px-[1.3em] py-[0.6em] font-body text-[0.85rem] font-bold transition-all duration-200 ease-brand'

const SELECTED = 'border-forest-950 bg-forest-950 text-white'
const IDLE =
  'border-ink-950/16 bg-transparent text-ink-700 hover:border-forest-900 hover:text-forest-950'

/**
 * Pill toggle shared by the Projects filters and the contact form's service
 * chips, so both stay on one visual definition.
 *
 * `type="button"` is not optional: an untyped button inside a <form> submits it.
 */
export default function ChoiceChip({ selected, onClick, disabled, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={selected}
      className={`${BASE} ${selected ? SELECTED : IDLE} disabled:cursor-not-allowed disabled:opacity-60`}
    >
      {children}
    </button>
  )
}
