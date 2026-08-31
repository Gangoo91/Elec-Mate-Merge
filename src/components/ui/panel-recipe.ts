import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';

/**
 * Panel surfaces — the non-interactive counterpart to `card-recipe.ts`.
 *
 * `card-recipe.ts` covers cards you press. This covers the panels you read:
 * info blocks, callouts, tables, figures. Both are made of the same material,
 * so a page of content and a grid of tools look like one product.
 *
 * Pages across the apprentice tree were built from
 * `border-white/[0.06] bg-white/[0.02]`, which over an 11%-lightness page is
 * about 13% — a panel you cannot see. The answer already existed in
 * `card-recipe.ts`: a diagonal white-alpha ramp (0.19 → 0.065) with an inset
 * top highlight and a drop shadow, so a panel reads as lit from the top-left
 * instead of printed flat. These import it rather than inventing more numbers.
 *
 * 🔴 The colour rule, straight from that recipe: a translucent coloured FILL
 * goes muddy brown on this ground, because a wash mixes with the near-black
 * behind it across the whole face. `bg-amber-500/[0.04]` and
 * `bg-red-500/[0.04]` were doing exactly that. Colour is carried by the 1px
 * BORDER and the LABEL TEXT only — a hairline has nothing behind it to muddy,
 * so it stays gold or red instead of turning to sludge.
 */

/** The everyday panel. Gold hairline, lit neutral surface. */
export const PANEL = cn('rounded-xl border border-elec-yellow/35 p-4 sm:p-5', CARD_SURFACE);

/** A panel nested inside another — white edge, so it reads as a level down. */
export const PANEL_INSET = cn('rounded-lg border border-white/[0.12] p-3 sm:p-4', CARD_SURFACE);

/**
 * Callouts carry a SOLID left bar, not a tinted face.
 *
 * A hairline border alone was not enough separation once the surfaces were
 * lifted — a red-bordered card and a gold-bordered card looked like the same
 * card, so a safety warning stopped reading as one. The bar is fully opaque,
 * which is precisely why it is safe: the muddiness rule is about translucent
 * fills mixing with the near-black behind them, and there is nothing to mix
 * with at 100%. It also gives the eye an edge to catch when scanning.
 */
const CALLOUT_BASE = cn('rounded-xl border border-white/[0.12] border-l-[3px] p-4 sm:p-5', CARD_SURFACE);

/** Advisory — worth stopping for, but not a hazard. */
export const CALLOUT = cn(CALLOUT_BASE, 'border-l-elec-yellow');

/** Hazard. */
export const CALLOUT_DANGER = cn(CALLOUT_BASE, 'border-l-red-500');

/**
 * A callout that already sits inside a PANEL.
 *
 * Nesting matters on this ground: a gold-edged card inside a gold-edged card
 * reads as two competing frames. Inner surfaces take a white edge so the
 * hierarchy is legible, and only the label carries the accent.
 */
export const CALLOUT_INSET = cn(
  'rounded-lg border border-white/[0.12] border-l-[3px] border-l-elec-yellow p-3 sm:p-4',
  CARD_SURFACE
);

/**
 * The "on this page" chip.
 *
 * Not `bg-elec-yellow/[0.08]` — that is the muddy-fill rule again, just at
 * small scale. Edge and text only.
 */
export const CHIP_ACCENT =
  'ml-2 rounded border border-elec-yellow/50 px-1.5 py-0.5 align-middle text-[10px] font-medium uppercase tracking-[0.14em] text-elec-yellow';

/** Small uppercase label that heads a panel. */
export const PANEL_LABEL =
  'text-[10px] font-medium uppercase tracking-[0.18em] text-white/70';
export const PANEL_LABEL_ACCENT =
  'text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow';
export const PANEL_LABEL_DANGER =
  'text-[10px] font-medium uppercase tracking-[0.18em] text-red-300';
