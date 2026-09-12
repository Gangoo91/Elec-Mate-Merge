/**
 * Form control classes for every Settings sheet and form.
 *
 * One definition, copied from the EV-charging certificate — the reference
 * implementation in CLAUDE.md. Fields are underlines on a transparent
 * background: no filled box, no focus ring; the caret and the bottom border
 * carry focus. Labels are sentence case and full white.
 *
 * Import these rather than retyping the classes. The settings sheets had
 * grown 75 boxed inputs on `bg-white/[0.06] border-white/[0.12]`, which was
 * the last surviving copy of the retired form language.
 */
import { cn } from '@/lib/utils';

export const inputCn = cn(
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1',
  'text-base font-medium text-white placeholder:font-normal placeholder:text-white/25 caret-elec-yellow',
  'transition-colors duration-150 hover:border-white/[0.3] focus:border-elec-yellow',
  'focus-visible:ring-0 focus:ring-0 focus:outline-none focus:shadow-none [color-scheme:dark] touch-manipulation'
);

export const textareaCn = cn(
  'w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 py-2',
  'text-base font-medium text-white placeholder:font-normal placeholder:text-white/25 caret-elec-yellow',
  'transition-colors duration-150 hover:border-white/[0.3] focus:border-elec-yellow',
  'focus-visible:ring-0 focus:ring-0 focus:outline-none focus:shadow-none touch-manipulation resize-none'
);

/** Sentence case, full white. Never white/60-70 — it reads grey. */
export const labelCn = 'mb-1 block text-[12px] font-medium text-white';

/** Helper text under a field. Also full white, smaller. */
export const hintCn = 'mt-1 text-[11.5px] leading-snug text-white';

/** The trigger of a MobileSelectPicker, styled as an underline field. */
export const selectTriggerCn = cn(
  'h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1',
  'text-base font-medium text-white hover:border-white/[0.3] focus:border-elec-yellow',
  'focus:ring-0 focus:outline-none data-[state=open]:border-elec-yellow touch-manipulation'
);

/** Two-or-three-way choices are chips, not a select. */
export const chipBase =
  'h-11 flex-1 rounded-xl border text-[13px] transition-colors touch-manipulation';
export const chipOn = 'border-elec-yellow bg-elec-yellow font-semibold text-black';
export const chipOff = 'border-white/[0.12] bg-white/[0.06] font-medium text-white';

/** A group of fields inside a sheet: sections separated by a rule, not a box. */
export const fieldGroupCn = 'space-y-4';
export const sectionRuleCn = 'border-t border-white/[0.1] pt-4';
