/**
 * Surface language — cards, chips, stat cells, rows and motion.
 *
 * The companion to `@/components/forms/fieldStyles`, which owns the FORM
 * language (inputs, labels, textareas). This file owns everything a screen is
 * built out of around those fields, so a surface can be assembled without
 * re-declaring the same strings a fourth time.
 *
 * Lifted from `src/pages/electrician/PriceBook.tsx`, which carries the current
 * language: cards go edge-to-edge on a phone and inset from `sm:` up, hierarchy
 * comes from type rather than icons or rules, single-choice controls are pill
 * chips, and every piece of text is full white — low-opacity white reads as
 * grey and is not allowed.
 *
 * Where a screen genuinely needs de-emphasis (a day outside the current month,
 * an hour outside the working day), use `opacity` on the whole element rather
 * than a `text-white/45`-style class: the type stays pure white and the element
 * recedes as a unit instead of turning grey.
 */

/**
 * Full-bleed on phones, inset card from sm: up.
 *
 * The same surface as `fieldStyles.cardCn` but WITHOUT its `p-4 sm:p-5
 * space-y-4` — a card holding a grid, a divided list or a split stat strip has
 * to reach its own edges. Apply padding per row instead.
 */
export const cardCn =
  '-mx-4 rounded-none border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x ' +
  'bg-gradient-to-b from-white/[0.08] to-white/[0.04]';

/** Same surface, for a card the whole of which is tappable. */
export const cardInteractiveCn =
  cardCn + ' transition-colors hover:from-white/[0.10] hover:to-white/[0.06] touch-manipulation';

/**
 * Single-choice pill chips.
 *
 * Distinct from `fieldStyles.chipBase`, which is a `rounded-xl` chip used
 * inside certificate forms. These are the `rounded-full` pills the Price Book
 * uses for tabs and filters — the two are different controls, so they are kept
 * as different tokens rather than one being quietly changed to match.
 */
export const chipBase =
  'h-11 px-4 rounded-full border text-[13px] whitespace-nowrap transition-colors ' +
  'touch-manipulation active:scale-[0.97]';
export const chipOn = 'bg-elec-yellow border-elec-yellow text-black font-semibold';
export const chipOff = 'bg-white/[0.06] border-white/[0.12] text-white font-medium';

/** Eyebrow above a stat or a section — the only uppercase type on a screen. */
export const eyebrowCn = 'text-[10px] font-semibold uppercase tracking-[0.16em] text-white';

/** The one big number in a stat cell. */
export const statValueCn = 'mt-1 text-[20px] font-bold tabular-nums leading-none tracking-tight';

/** A line inside a card that reads and behaves as one tappable row. */
export const rowCn =
  'flex w-full items-start gap-3 px-4 py-3 text-left transition-colors touch-manipulation ' +
  'hover:bg-white/[0.04] active:bg-white/[0.06] sm:px-5';

/** Secondary action — outlined, sits beside a yellow primary. */
export const ghostButtonCn =
  'h-11 rounded-xl border border-white/[0.12] bg-white/[0.04] px-4 text-[13px] font-medium ' +
  'text-white transition-colors hover:bg-white/[0.08] touch-manipulation active:scale-[0.98]';

/** Primary action. */
export const primaryButtonCn =
  'h-11 rounded-xl bg-elec-yellow px-5 text-[14px] font-semibold text-black transition-colors ' +
  'hover:bg-elec-yellow/90 touch-manipulation active:scale-[0.98]';

/** Warning panel — the house style for "check this before you act on it". */
export const warningPanelCn =
  'rounded-xl border border-orange-500/30 bg-orange-500/10 px-3.5 py-3';

// ─── Motion ─────────────────────────────────────────────────────────────────
// `as const` on the spring type: framer-motion's Variants wants the literal
// 'spring', and a widened string produces a type error at every use site.

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.03 } },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 300, damping: 24 },
  },
};
