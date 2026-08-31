import { cn } from '@/lib/utils';

/**
 * The card recipe — one definition for every tappable card in the app.
 *
 * Extracted from the Inspection & Testing hub so the section pages beneath it
 * (Notices & Labels, Certificates, Specialist, My Certificates) can't drift
 * into their own surfaces again. Import these rather than retyping the classes.
 *
 * Brightness: a /[0.14]→/[0.045] diagonal ramp under a volt /35 border, lit by
 * a 1px inset highlight. Dimmer values look fine on a desktop monitor and read
 * as flat rectangles on a phone in daylight, which is where this app is
 * actually used.
 *
 * Press feel is deliberate for native: scale down slightly, BRIGHTEN rather
 * than dim (a dark UI that dims on press reads as "disabled"), kill the
 * Android/iOS grey tap flash, and keep the transition short enough to feel
 * mechanical rather than animated.
 *
 * ⚠️ Volt FILLS are only ever solid (`bg-elec-yellow` + `text-black`). Never
 * `bg-elec-yellow/<opacity>` as a background — every translucent value goes
 * muddy brown on this ground, because a wash mixes with the near-black behind
 * it across the whole card face.
 *
 * Volt LINES and TEXT are exempt and always have been: a 1px border or a
 * hairline has nothing to mix with, so `border-elec-yellow/35` reads as dim
 * gold, not sludge. That distinction is what lets every card wear a gold edge
 * while no card wears a gold face.
 */
export const CARD_BASE = cn(
  'group flex h-full flex-col rounded-2xl border text-left',
  // `background-color` no longer covers it — the surfaces are gradients, and a
  // gradient lives in background-image. Without this the hover brightening
  // snapped instead of easing, which is exactly the kind of thing that makes a
  // UI feel cheap without anyone being able to say why.
  'transition-[background-image,background-color,border-color,transform,box-shadow] duration-150 ease-out',
  'touch-manipulation select-none [-webkit-tap-highlight-color:transparent]',
  'active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/60'
);

/**
 * The material a card is made of — the part worth sharing beyond the button
 * behaviour above.
 *
 * Three things, and each is doing a job:
 *
 * 1. A DIAGONAL ramp, not a vertical one. `to-b` fades evenly across the whole
 *    width, which reads as a flat rectangle with a slight tint. `to-br` puts
 *    the light in the top-left corner, so the card has a direction and the
 *    corner nearest the light is brighter than the one furthest from it. Same
 *    two colours; the difference is that one looks lit and one looks printed.
 *
 * 2. An INSET 1px top highlight. On a near-black page a border alone gives an
 *    edge but no thickness. A single lighter line along the top inside edge is
 *    what a real bevel does when light hits it, and it is most of why a card
 *    reads as a physical thing rather than a lighter rectangle. It costs one
 *    box-shadow and no extra DOM.
 *
 * 3. A drop shadow. Almost invisible against `--elec-dark` (0–3% lightness) but
 *    it separates the card from the page at the bottom edge, which stops a
 *    grid of cards reading as one continuous panel.
 *
 * Kept as its own export because HubKpi, the work list and the Mate bar build
 * their own surfaces — they are not buttons and cannot take CARD_BASE, but
 * they must be made of the same stuff or the page looks assembled from parts.
 */
/**
 * Depth only — the bevel and the separation, with no background of its own.
 *
 * Split out from CARD_SURFACE because the app has TWO card families and they
 * do not share a background:
 *
 *   - these hub cards, built from white-alpha gradients over near-black
 *   - the shadcn `Card` (2,323 importing files), built from the `--card`
 *     token at 7% lightness
 *
 * Both were flat for the same reason — a fill and a border, no light. The fill
 * is where they legitimately differ; the light is not, so it lives here and
 * both import it. One number to change if it ever needs tuning.
 */
/**
 * Brightened 2026-08-29. The inset top highlight went 0.10 → 0.16 and the drop
 * shadow eased off, because at the old values a long reading page read as a
 * column of near-black slabs — fine for a dense dashboard, tiring for someone
 * reading 900 lines of teaching content.
 */
export const SURFACE_DEPTH =
  'shadow-[inset_0_1px_0_0_rgba(255,255,255,0.13),0_2px_10px_-4px_rgba(0,0,0,0.7)]';

/**
 * Darkened 2026-08-31, back toward the certificate forms.
 *
 * The 08-29 brightening (0.14/0.075/0.045 → 0.19/0.105/0.065) overshot. Next
 * to `fieldStyles.cardCn` — the card the EICR and specialist certificate forms
 * use across 158 files, at `from-white/[0.08] to-white/[0.04]` — the hub cards
 * read as washed-out grey rather than dark and rich, and the two halves of the
 * app no longer looked like the same product.
 *
 * This lands between them: roughly 60% of the 08-29 brightness, which is close
 * to the cert-form depth, while keeping the two things that make a hub card
 * feel physical and a cert card feel flat — the diagonal ramp and the 1px
 * inset bevel. Hover and active ramps moved down with it, or hover would have
 * brightened past the old resting state.
 */
/**
 * The lit surface. Brightened 2026-08-29 — roughly a third more light at each
 * stop (0.14/0.075/0.045 → 0.19/0.105/0.065). Still a diagonal ramp, so a card
 * reads as lit from the top-left rather than printed flat; just less like
 * reading off a slate.
 */
export const CARD_SURFACE = cn(
  'bg-gradient-to-br from-white/[0.11] via-white/[0.065] to-white/[0.04]',
  SURFACE_DEPTH
);

/**
 * The one card in a group that carries the primary action.
 *
 * Volt is still SOLID — the ramp runs between two fully opaque yellows, so
 * there is no translucency to go muddy. It is the same trick as the neutral
 * card: light from the top, which turns a flat yellow rectangle into something
 * that looks pressable.
 *
 * The coloured drop shadow is deliberately weak and tight (14px blur, −8px
 * spread, 30% alpha). A soft lift, not a glow: a bloom around a yellow button
 * on a black page is the single most recognisable "AI made this" tell.
 */
export const CARD_PRIMARY = cn(
  'border-elec-yellow bg-gradient-to-b from-[hsl(47_100%_57%)] to-[hsl(47_100%_47%)]',
  'shadow-[inset_0_1px_0_0_rgba(255,255,255,0.35),0_4px_14px_-8px_hsl(47_100%_50%_/_0.30)]',
  'hover:from-[hsl(47_100%_61%)] hover:to-[hsl(47_100%_50%)]',
  'active:from-[hsl(47_100%_52%)] active:to-[hsl(47_100%_44%)]'
);

/**
 * The everyday card.
 *
 * The border is VOLT at 35%, not white at 18%. On a black page a white border
 * is a grey outline, and a grid of them is a wall of grey rectangles with no
 * brand on it at all — which is exactly how these pages read once the accents
 * reserved for live data went unused.
 *
 * A 1px line is the one place a low-alpha volt is safe. The muddy-brown
 * problem is a FILL problem: spread 35% volt across a card face and it mixes
 * with the near-black behind it into sludge. Confine it to a hairline and
 * there is nothing to mix with — it reads as dim gold.
 *
 * Hierarchy survives as a matter of DEGREE, not presence. Everything wears the
 * gold edge at /35 — the strength that reads as gold rather than grey; cards
 * with work outstanding wear /70 plus a volt figure and a brighter hairline. Before this, "has a volt border" was the
 * signal, which meant the other nineteen cards had to be colourless to make it
 * work.
 */
export const CARD_NEUTRAL = cn(
  'border-elec-yellow/35',
  CARD_SURFACE,
  'hover:border-elec-yellow/60 hover:from-white/[0.14] hover:via-white/[0.085] to-white/[0.055]',
  'active:from-white/[0.16]'
);

/** Not available yet — dimmed, and callers should skip the action word. */
export const CARD_DISABLED = 'border-white/[0.10] bg-white/[0.03] opacity-60';
