/**
 * Shared page geometry for the AM2 simulator.
 *
 * Every AM2 screen used to sit in its own narrow column (max-w-md → max-w-5xl)
 * in the middle of a wide desktop. Andrew, 5 Oct 2026: "every page needs to be
 * miles wider and better laid out". One width for all of them, and a two-pane
 * split that stacks on a phone.
 */

/** Outer page frame: wide on desktop, full-bleed gutters on a phone. */
export const AM2_PAGE =
  'mx-auto w-full max-w-[1400px] px-4 pb-10 pt-[max(1.25rem,env(safe-area-inset-top))] sm:px-6 lg:px-10';

/** Two panes side by side from lg; stacked below. Left is the explanation,
 *  right is the thing you do. */
export const AM2_SPLIT =
  'grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-12';

/** The list surface used for sections, jobs, mistakes and results. */
export const AM2_LIST =
  '-mx-4 divide-y divide-white/[0.08] border-y border-white/[0.16] bg-gradient-to-br from-white/[0.11] via-white/[0.065] to-white/[0.04] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.13),0_2px_10px_-4px_rgba(0,0,0,0.7)] sm:mx-0 sm:rounded-2xl sm:border-x';

/** Primary action: solid volt, never a translucent wash. */
export const AM2_PRIMARY =
  'inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-elec-yellow text-[15px] font-bold text-black touch-manipulation active:scale-[0.98] lg:w-auto lg:px-8';

/** Page title block. */
export const AM2_EYEBROW = 'text-[12px] font-semibold text-white';
export const AM2_TITLE =
  'mt-1 text-[28px] font-bold leading-tight tracking-tight text-white lg:text-[34px]';
