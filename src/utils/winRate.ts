/**
 * The ONE win rate (gap analysis §4 item 7).
 *
 * Win rate = won ÷ decided, where decided = won + declined (lost) + expired.
 * Quotes or leads still waiting for an answer do not count either way.
 *
 * Why this one, not won ÷ sent: a quote sent yesterday isn't a loss, so
 * won ÷ sent drags every recent month down until the answers come in. And why
 * expired counts as decided: few trades ever mark a lost job as declined, so
 * won ÷ (won + declined) alone drifts towards 100%. A quote that ran out
 * unanswered is an answer.
 *
 * Every screen that shows a figure called "Win rate" uses this.
 */
export interface WinRateCounts {
  won: number;
  /** Declined / lost. */
  lost: number;
  /** Ran out unanswered. Leads have none. */
  expired?: number;
}

export const WIN_RATE_DEFINITION =
  'Won out of everything decided: won, declined or expired. Anything still waiting does not count.';

export function decidedCount(c: WinRateCounts | null | undefined): number {
  if (!c) return 0;
  return (Number(c.won) || 0) + (Number(c.lost) || 0) + (Number(c.expired) || 0);
}

/** Whole-number percentage, or null when nothing has been decided yet. */
export function winRate(c: WinRateCounts | null | undefined): number | null {
  const decided = decidedCount(c);
  if (!c || decided <= 0) return null;
  return Math.round(((Number(c.won) || 0) / decided) * 100);
}
