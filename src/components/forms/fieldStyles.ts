/**
 * The form design language, in one place.
 *
 * Lifted VERBATIM from the specialist certificate forms
 * (`src/components/inspection/ev-charging/`), which are the reference
 * implementation. Every string here is byte-identical to the value it replaces,
 * so adopting this module changes nothing visually — that is the point: it
 * makes the extraction provable, and only then can other surfaces adopt it.
 *
 * Background: 50 certificate files each declared their own copy of these
 * strings. They had already drifted (three different `selectTriggerCn`, two
 * different `checkRowCn`). Copying them again into the Employer Hub would have
 * taken that to ~100 copies. Import from here instead.
 *
 * Fields are UNDERLINES on a transparent background — no filled boxes, no focus
 * rings. The caret and the bottom border carry focus. See CLAUDE.md → Design System.
 */

/** Text/number input. Underline, yellow caret, no ring. */
export const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base md:text-base font-medium text-white placeholder:font-normal placeholder:text-white/25 caret-elec-yellow transition-colors duration-150 hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none focus:shadow-none !leading-[2.75rem] [color-scheme:dark] touch-manipulation';

/** Select / picker trigger. Matches the input underline. */
export const selectTriggerCn =
  'h-11 rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base font-medium text-white transition-colors duration-150 hover:border-white/[0.3] focus:border-elec-yellow focus:ring-0 focus:outline-none data-[state=open]:border-elec-yellow data-[state=open]:ring-0 touch-manipulation';

/** Multi-line. The one field that stays a soft filled box — an underline gives
 *  no sense of the writing area. */
export const textareaCn =
  'textarea-soft rounded-xl border-0 bg-white/[0.05] px-3.5 py-3 text-base md:text-base text-white placeholder:text-white/25 caret-elec-yellow transition-colors focus:bg-white/[0.07] focus:ring-1 focus:ring-elec-yellow/50 focus-visible:ring-1 focus-visible:ring-elec-yellow/50 focus:outline-none focus:shadow-none min-h-[90px] touch-manipulation';

/** Field label. Sentence case, FULL white — never white/65, which reads grey. */
export const labelCn = 'text-[12px] font-medium text-white mb-1 block';

/** Section card. Edge-to-edge on mobile, inset and rounded from sm: up. */
export const cardCn =
  '-mx-4 rounded-none border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:p-5 space-y-4';

/**
 * The two-up field grid.
 *
 * 🔴 TWO COLUMNS ON A PHONE TOO — lifted from the EICR
 * (`eicr/EarthingBondingSection.tsx`), which is the reference for this layout.
 *
 * The forms previously used `grid-cols-1 sm:grid-cols-2`, which stacks every
 * field on a phone. That is the wrong call for this app: paired fields are
 * almost always short (a rating and an arrangement, a temperature and its
 * reference), and stacking them doubles the scroll on the one device the whole
 * product is built around. Reading a 2×2 block of four short values is also far
 * faster than scanning four full-width rows.
 *
 * The gutter is deliberately tighter on a phone (`gap-x-3`) and opens up from
 * `sm:` — at 12px the two columns still read as separate fields without
 * stealing width from the inputs themselves.
 */
export const grid2Cn = 'grid grid-cols-2 gap-x-3 gap-y-4 sm:gap-x-6';

/**
 * A field inside `grid2Cn` that needs the whole row on a phone but pairs up
 * from `sm:`. For long free text — an instrument name, a qualification, a load
 * description — where half a phone width truncates the value as it is typed.
 */
export const fieldWideCn = 'col-span-2 sm:col-span-1';

/** A field inside `grid2Cn` that needs the whole row at every size. */
export const fieldFullCn = 'col-span-2';

export const checkboxCn =
  'h-5 w-5 border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black';

/** Bordered, tappable row wrapping a checkbox — reads as a card. */
export const checkRowCn =
  'flex min-h-[44px] items-center gap-3 rounded-xl border border-white/[0.12] bg-white/[0.05] px-3.5 py-3 cursor-pointer transition-colors hover:bg-white/[0.07] touch-manipulation';

/** Bare checkbox line, no border — for dense lists of declarations where a
 *  bordered row per item would be visual noise. Distinct from checkRowCn:
 *  the two were the same identifier in different cert files despite being
 *  different elements. */
export const checkLineCn = 'flex min-h-11 items-center gap-3 touch-manipulation cursor-pointer';

/** Read-only informational panel (calculated values, guidance). */
export const infoPanelCn = 'rounded-xl border border-white/[0.12] bg-white/[0.05] px-3.5 py-3';

/** Selection chips — preferred over a select for 2–3 options. */
export const chipBase =
  'h-11 rounded-xl border text-sm transition-all touch-manipulation active:scale-[0.98]';
export const chipOn = 'bg-elec-yellow border-elec-yellow text-black font-semibold';
export const chipOff = 'bg-white/[0.06] border-white/[0.12] text-white font-medium';

/** Solid volt primary (sheet footers, form submits). Disabled goes NEUTRAL —
 *  a faded volt over near-black reads as muddy brown, which is why this is
 *  not `disabled:opacity-*`. Same recipe as the cert footer's Continue. */
export const buttonPrimaryCn =
  'h-12 rounded-xl bg-elec-yellow text-[15px] font-semibold text-black transition-transform hover:bg-elec-yellow/90 disabled:bg-white/[0.08] disabled:text-white/70 touch-manipulation active:scale-[0.99] outline-none focus:outline-none focus-visible:outline-none';

/** Neutral secondary (Back / Cancel) — the cert footer's neutral button. */
export const buttonSecondaryCn =
  'h-12 rounded-xl border border-white/[0.12] bg-white/[0.04] text-[14px] font-medium text-white transition-colors hover:bg-white/[0.08] disabled:bg-white/[0.02] disabled:text-white/70 touch-manipulation active:scale-[0.98] outline-none focus:outline-none focus-visible:outline-none';
