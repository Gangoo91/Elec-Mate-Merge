/**
 * Shared surface recipes for the quotes/invoices redesign.
 * One definition — the quote pages, invoice pages and wizards all import
 * from here so the material can't drift between surfaces.
 */
export const PANEL =
  'rounded-2xl border border-white/[0.10] bg-gradient-to-b from-white/[0.06] to-white/[0.03] shadow-[0_8px_24px_rgba(0,0,0,0.35)]';

/**
 * A field on a panel — an underline, not a box.
 *
 * The quote item rows used `bg-[#1a1a1e]` boxes, which sit DARKER than the
 * card behind them and read as holes punched in the row rather than as places
 * to type. CLAUDE.md and `.claude/rules/frontend.md` both say the same thing:
 * "Form inputs are UNDERLINES, not boxes", with the reference implementation
 * in `inspection/ev-charging/`.
 *
 * The caret and the bottom border carry focus; there is deliberately no focus
 * ring. Height is `h-11` because 44px is the touch minimum, and every caller
 * sets its own width.
 */
/*
 * ⚠️ `input-underline` is NOT decorative. `index.css:42` uses it to set the
 * placeholder colour with `-webkit-text-fill-color: … !important`, which is
 * the only thing iOS Safari honours — without it the placeholder renders in
 * Safari's own washed-out grey on exactly the devices this app is used on.
 * Keep it in the string.
 */
export const FIELD_UNDERLINE =
  'input-underline h-11 rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 ' +
  'text-[15px] font-medium text-white placeholder:text-white/25 caret-elec-yellow ' +
  'transition-colors hover:border-white/[0.3] focus:border-elec-yellow ' +
  'focus-visible:ring-0 focus:ring-0 focus:outline-none touch-manipulation';
