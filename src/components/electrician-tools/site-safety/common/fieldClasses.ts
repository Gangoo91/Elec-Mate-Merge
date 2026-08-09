/**
 * Field classes for Site Safety — the underline form language.
 *
 * Why this file exists rather than importing from `college/primitives`:
 * that module's `inputClass` is a filled, bordered, rounded box with a
 * `white/65` placeholder. It is the superseded language on two counts — fields
 * are underlines on transparent, and low-opacity white reads as grey, which is
 * not allowed anywhere. It is imported by 167 files, so it cannot simply be
 * rewritten in place; Site Safety takes the correct classes from here while
 * that migration is decided separately.
 *
 * Copied from the reference implementation (`inspection/ev-charging/`):
 * bottom border only, transparent ground, volt caret, no focus ring — the
 * caret and the bottom border carry focus between them.
 */

/** Text/number/date input. 44px tall so it clears the touch minimum. */
export const FIELD_CN =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] ' +
  'bg-transparent px-1 text-base font-medium text-white placeholder:text-white/25 ' +
  'caret-elec-yellow transition-colors hover:border-white/[0.3] focus:border-elec-yellow ' +
  'focus-visible:ring-0 focus:ring-0 focus:outline-none [color-scheme:dark] touch-manipulation';

/**
 * Multi-line. No `h-11` — height comes from `rows` — and `resize-none` because
 * a drag handle is a desktop affordance that does nothing useful on a phone.
 */
export const TEXTAREA_CN =
  'input-underline w-full resize-none rounded-none border-0 border-b border-white/[0.15] ' +
  'bg-transparent px-1 py-2 text-base font-medium text-white placeholder:text-white/25 ' +
  'caret-elec-yellow transition-colors hover:border-white/[0.3] focus:border-elec-yellow ' +
  'focus-visible:ring-0 focus:ring-0 focus:outline-none [color-scheme:dark] touch-manipulation';

/** Sentence case, full white. Never white/65 — that renders as grey. */
export const LABEL_CN = 'mb-1 block text-[12px] font-medium text-white';
