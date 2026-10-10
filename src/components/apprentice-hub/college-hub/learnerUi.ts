import { cn } from '@/lib/utils';

/* ==========================================================================
   The learner's side of college, in the College Hub design language
   (8 Oct 2026). The staff screens build from components/college/ui/CollegeUi;
   these are the same surfaces for the apprentice cards, which mostly render
   their own header and rows and so need the frame without the padding.

   - Edge to edge on a phone, inset and rounded from sm: up.
   - Hairline white border, never a gold edge. Hover lifts the border.
   - No coloured left bars. Status is a chip: green done, orange needs you,
     neutral otherwise (border and text only, never a translucent fill).
   ========================================================================== */

/** A card that lays out its own padding (header, rows, footer). */
export const LC_FRAME =
  '-mx-4 flex flex-col overflow-hidden border-y border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.025] sm:mx-0 sm:rounded-2xl sm:border-x';

/** The same card with padding, for a block of content. */
export const LC_CARD = cn(LC_FRAME, 'p-4 sm:p-5');

/** A tappable card: lifts its border on hover and shows the volt top line. */
export const LC_TILE =
  'group relative flex min-h-[44px] w-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.025] p-4 text-left transition-colors touch-manipulation hover:border-white/[0.16] active:bg-white/[0.06] sm:p-5';

/** Put inside an LC_TILE (or any `group relative` card) for the hover top line. */
export const LC_TOP_LINE =
  'pointer-events-none absolute inset-x-0 top-0 h-px bg-elec-yellow opacity-0 transition-opacity group-hover:opacity-100';

/** A row inside LC_FRAME. */
export const LC_ROW =
  'flex min-h-[56px] w-full items-center gap-3 px-4 py-3 text-left transition-colors touch-manipulation hover:bg-white/[0.04] active:bg-white/[0.07] sm:px-5';

/** Card title row padding, to sit above LC_ROWs. */
export const LC_HEAD = 'flex items-baseline justify-between gap-3 px-4 pb-2 pt-4 sm:px-5';

export type ChipTone = 'done' | 'action' | 'neutral';

/** A status chip: border and text only. */
export const lcChip = (tone: ChipTone = 'neutral') =>
  cn(
    'inline-flex h-6 shrink-0 items-center whitespace-nowrap rounded-full border px-2.5 text-[12px] font-semibold',
    tone === 'done'
      ? 'border-emerald-400/60 text-emerald-300'
      : tone === 'action'
        ? 'border-orange-400/60 text-orange-300'
        : 'border-white/[0.18] text-white'
  );

/**
 * AI-written copy (daily focus, weekly brief) comes back with em and en
 * dashes as clause breaks. Shown to a learner, those read as AI; a comma
 * says the same thing. Only for generated prose, never for record titles.
 */
export const plainDashes = (text: string | null | undefined): string =>
  (text ?? '').replace(/\s+[—–]\s+/g, ', ').replace(/—/g, ', ');

/**
 * The same generated copy also talks in staff shorthand ("Start AC 2.2
 * evidence", "Catch up your OTJ", "ILP target"). A learner reads words, so
 * the shorthand is spelled out. Only for generated prose, never record titles.
 */
export const plainWords = (text: string | null | undefined): string =>
  plainDashes(text)
    .replace(/\bOTJ\b/g, 'off-the-job hours')
    .replace(/\bACs\b/g, 'criteria')
    .replace(/\bAC\s+(\d+(?:\.\d+)?)/g, 'criterion $1')
    .replace(/\bAC\b/g, 'criterion')
    .replace(/\bILP\b/g, 'learning plan')
    .replace(/off-the-job hours hours/g, 'off-the-job hours')
    .replace(/off-the-job hours (entry|entries|activity|log)\b/g, 'off-the-job $1');

/** A plain verb for a generated action, by its kind; falls back to the label in words. */
export const plainActionLabel = (kind: string | null | undefined, label: string): string => {
  switch (kind) {
    case 'open_ac':
      return 'See your criteria';
    case 'open_otj':
      return 'Log hours';
    case 'open_portfolio':
      return 'Open portfolio';
    case 'open_reflection':
      return 'Add reflection';
    case 'open_epa_brief':
      return 'Read EPA brief';
    default:
      return plainWords(label);
  }
};
