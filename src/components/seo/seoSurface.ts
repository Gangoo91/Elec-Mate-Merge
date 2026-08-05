/**
 * Shared surface tokens for the public/SEO pages.
 *
 * Lifted from the certificate design language — the reference implementations
 * are `src/components/inspection/ev-charging/` and the lightning-protection /
 * emergency-lighting / PAT cards, which all share one card recipe. The public
 * site had drifted into its own dialect; these pull it back so the marketing
 * pages and the product read as the same piece of software.
 *
 * ── THE COLOUR RULE ────────────────────────────────────────────────────────
 * Surfaces are NEUTRAL. Colour is SATURATED and RARE, and it always means
 * something — a category, a state, a value.
 *
 * ✗ never  `bg-yellow-500/10`, `bg-red-500/5`, any low-opacity colour wash.
 *          A 5–10% colour over near-black turns to mud: yellow reads brown,
 *          red reads maroon. This is what made the old guide callouts ugly.
 * ✓ always neutral white-gradient fill for the surface, then full-strength
 *          colour on a label, a rule, a figure or a state word.
 *
 * Grep the cert components: there is not one colour-tinted panel in them.
 * ───────────────────────────────────────────────────────────────────────────
 */

/**
 * ── THE SURFACE LADDER ─────────────────────────────────────────────────────
 * Taken from the app's own tokens so the public pages sit on the same steps as
 * the product (see src/index.css dark theme, and the price-book panels in
 * src/components/employer which are the reference in use):
 *
 *   ground          0 0%  4%   --background
 *   card            0 0%  9%   --elec-card   ← what a panel sits at
 *   row / hover     0 0% 11%
 *   row active      0 0% 13%
 *
 * These are FLAT fills, not gradients. A `from-white/8 to-white/4` gradient
 * fades the bottom of a tall card back into the ground, which is what made the
 * exam read as flat black. And an interactive row with only a hairline border
 * and no fill disappears entirely — options must have a surface you can see.
 * ───────────────────────────────────────────────────────────────────────────
 */

/** The card. Flat and edge-to-edge on phones, inset and rounded from sm: up. */
export const CARD =
  '-mx-4 rounded-none border-y border-white/[0.08] sm:mx-0 sm:rounded-2xl sm:border-x ' +
  'bg-[hsl(0_0%_9%)]';

/** CARD plus the standard cert padding. Most blocks want this. */
export const CARD_PADDED = `${CARD} p-4 sm:p-5`;

/** A card that keeps its box at every width (grid tiles, related cards). */
export const TILE = 'rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_9%)]';

/** A panel nested INSIDE a card — one step brighter than its parent. */
export const SUBPANEL = 'rounded-xl border border-white/[0.08] bg-[hsl(0_0%_11%)]';

/** An interactive row (an answer option, a list item you can pick). */
export const ROW =
  'rounded-xl border border-white/[0.08] bg-[hsl(0_0%_11%)] ' +
  'transition-colors hover:bg-[hsl(0_0%_13%)]';

/**
 * Section label. Small caps, wide tracking — and deliberately NO colour: every
 * caller supplies one. Baking a colour in here silently beats any accent the
 * caller adds, because Tailwind resolves two competing `text-*` utilities by
 * stylesheet order, not by the order they appear in className. That bug ate
 * the footer's category accents once already.
 */
export const LABEL = 'text-[11px] font-semibold uppercase tracking-[0.2em]';

/** Hairline divider for stacked rows inside a card. */
export const DIVIDE = 'divide-y divide-white/[0.08]';

/** Primary action. Solid yellow, black text — the only place yellow fills. */
export const BTN_PRIMARY =
  'inline-flex h-12 items-center justify-center rounded-xl bg-elec-yellow px-6 ' +
  'text-[15px] font-bold text-black transition-colors hover:brightness-95 touch-manipulation';

/** Neutral action. Mirrors `certFooterNeutralButton` in the cert shell. */
export const BTN_NEUTRAL =
  'inline-flex h-12 items-center justify-center rounded-xl border border-white/[0.12] ' +
  'bg-white/[0.04] px-6 text-[14px] font-medium text-white transition-colors ' +
  'hover:bg-white/[0.08] touch-manipulation';

/**
 * Category accents. Full-strength so they read as a deliberate signal rather
 * than a tint, and used ONLY on the eyebrow label and its rule — never as a
 * background. Consistent across the site, so a colour means the same thing on
 * a guide, a related-card grid and a search-result listing.
 */
export const ACCENT: Record<string, string> = {
  guide: 'text-amber-300',
  calculator: 'text-sky-300',
  tool: 'text-sky-300',
  exam: 'text-emerald-300',
  training: 'text-emerald-300',
  certificate: 'text-violet-300',
  business: 'text-rose-300',
  default: 'text-white',
};

/** Matching rule colour for the accent above (border-* form). */
export const ACCENT_RULE: Record<string, string> = {
  guide: 'bg-amber-300',
  calculator: 'bg-sky-300',
  tool: 'bg-sky-300',
  exam: 'bg-emerald-300',
  training: 'bg-emerald-300',
  certificate: 'bg-violet-300',
  business: 'bg-rose-300',
  default: 'bg-white/40',
};

/** Look up an accent from a free-text category label. */
export function accentFor(category: string | undefined): { text: string; rule: string } {
  const k = (category ?? '').trim().toLowerCase();
  const key = Object.keys(ACCENT).find((c) => c !== 'default' && k.includes(c)) ?? 'default';
  return { text: ACCENT[key], rule: ACCENT_RULE[key] };
}

/**
 * @deprecated Use CARD. Kept while the mock-exam pages migrate — it is CARD
 * with the same fill, under the old name.
 */
export const PANEL = CARD;
