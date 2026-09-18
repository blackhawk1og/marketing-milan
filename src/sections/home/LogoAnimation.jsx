/**
 * Ported verbatim from the mockup's hero SVG. The four keyframe sets live in
 * `src/index.css` under `@theme` and are applied here as animate-* utilities.
 */
export default function LogoAnimation() {
  return (
    <div className="mx-auto grid w-full max-w-[360px] place-items-center p-6 gt900:max-w-[440px]">
      <div className="relative w-full">
        <svg viewBox="265 255 550 570" className="block h-auto w-full overflow-visible">
          <g className="animate-logo-left">
            <path
              d="M309 326 L535 528 L535 754 L309 551 Z"
              fill="#137800"
              stroke="#137800"
              strokeWidth="44"
              strokeLinejoin="round"
            />
          </g>
          <g className="animate-logo-right">
            <path
              d="M544 326 L770 528 L770 754 L544 551 Z"
              fill="#c9b022"
              stroke="#c9b022"
              strokeWidth="44"
              strokeLinejoin="round"
            />
          </g>
          <g className="animate-logo-arrow">
            <path
              d="M555 466 L634 467 L634 550 L616 535 L457 712 L442 701 L443 696 L520 611 L594 530 L614 507 L615 502 L613 488 L598 488 L471 628 L445 628 L573 484 Z"
              fill="#f8f5f4"
            />
          </g>
        </svg>
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-[60%] -left-[60%] h-[220%] w-[220%] animate-logo-sheen bg-[linear-gradient(135deg,rgba(255,255,255,0)_42%,rgba(255,255,255,.22)_50%,rgba(255,255,255,0)_58%)]" />
        </div>
      </div>
    </div>
  )
}
