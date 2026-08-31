/**
 * Page-level layout for the Notices & Labels documents.
 *
 * These sit ALONGSIDE `fieldStyles.ts`, not instead of it. That file styles the
 * controls inside a form and is adopted by ~73 call sites across the specialist
 * certificates; this one styles the *page* — its width, its column grid, its
 * card surface and its action bar.
 *
 * They are separate deliberately. The surfaces here are a step BRIGHTER than
 * `fieldStyles.cardCn` (0.10/0.05 against 0.08/0.04, borders 0.16 against 0.14)
 * because these documents are produced at a board, in a plant room, on a phone
 * — not at a desk. Brightening `fieldStyles` instead would have changed every
 * specialist certificate in the app, which nobody asked for.
 *
 * ⚠️ Ten pages had their own private copies of all of this and had already
 * drifted: nine capped the container at 1600px and one at 1700px, and every one
 * of the nine set its strapline in `text-white/50` — a grey that CLAUDE.md
 * bans outright. Add to this file rather than declaring a local copy.
 */

/** Page shell. Pulls up under the app chrome and leaves room for the footer. */
export const pageShellCn = '-mt-3 sm:-mt-4 md:-mt-6 bg-background pb-24';

/**
 * Content width. Narrow and centred on a phone, but genuinely wide on a
 * monitor — these are two-column data entry screens, and 1600px was leaving
 * the circuit and item tables cramped for no reason.
 */
export const pageContainerCn = 'mx-auto max-w-3xl lg:max-w-none xl:max-w-[1700px]';

/** Sticky header band. */
export const pageHeaderBandCn =
  'sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.12]';

/**
 * Two filled columns from `lg:` up, one on mobile.
 * `items-stretch` is what makes paired cards match height — without it each
 * card sizes to its own content and the row goes ragged.
 */
export const pageMainCn =
  'px-4 py-4 space-y-5 lg:px-8 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-5 lg:items-stretch';

/**
 * Section card. Edge-to-edge on mobile, inset and rounded from sm: up.
 * `flex flex-col` pairs with the grid's `items-stretch` above.
 */
export const pageCardCn =
  'flex flex-col -mx-4 rounded-none border-y border-white/[0.16] bg-gradient-to-b from-white/[0.10] to-white/[0.05] sm:mx-0 sm:rounded-2xl sm:border-x p-4 sm:p-5 space-y-4';

/** Card that must span the full width of the two-column grid — action bars. */
export const pageWideCardCn = `${pageCardCn} lg:col-span-2`;

/**
 * Field underline, a touch brighter than the form-kit default so it stays
 * visible on a phone screen in daylight.
 */
export const pageInputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.22] bg-transparent px-1 text-base md:text-base font-medium text-white placeholder:font-normal placeholder:text-white/40 caret-elec-yellow transition-colors duration-150 hover:border-white/[0.38] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none focus:shadow-none !leading-[2.75rem] [color-scheme:dark] touch-manipulation';

/** ⚠️ Full white. Low-opacity white reads as grey and is not allowed. */
export const pageLabelCn = 'text-[12px] font-medium text-white mb-1 block';

export const pageTextareaCn =
  'rounded-lg border border-white/[0.14] bg-white/[0.06] text-base text-white placeholder:text-white/40 focus:border-elec-yellow focus:ring-0 focus-visible:ring-0 focus:outline-none focus:shadow-none flex-1 min-h-[96px] touch-manipulation';

/** Section heading inside a card — typography only, no icons or dots. */
export const pageSectionHeadingCn = 'text-[15px] font-semibold tracking-tight text-white';

/** Primary action. The document the page exists to produce. */
export const pagePrimaryBtnCn =
  'h-12 w-full rounded-xl bg-elec-yellow text-[15px] font-semibold text-black hover:bg-elec-yellow/90 touch-manipulation active:scale-[0.99] disabled:bg-white/[0.08] disabled:text-white/70';

/** Secondary action. */
export const pageSecondaryBtnCn =
  'h-12 w-full rounded-xl border border-white/[0.16] bg-white/[0.06] text-[15px] font-semibold text-white hover:bg-white/[0.12] active:scale-[0.99] touch-manipulation disabled:opacity-60';

/** Tertiary action — outlined in the accent, for send/share. */
export const pageAccentBtnCn =
  'h-12 w-full rounded-xl border border-elec-yellow/50 bg-elec-yellow/10 text-[15px] font-semibold text-elec-yellow hover:bg-elec-yellow/20 active:scale-[0.99] touch-manipulation disabled:opacity-60';
