import type { EpaVerdictBands } from '@/hooks/college/useCollegeSettings';
import { DEFAULT_COLLEGE_SETTINGS } from '@/hooks/college/useCollegeSettings';

/* ==========================================================================
   epaBands — shared utilities for mapping an EPA verdict + confidence into
   a 0-100 readiness position.

   Bands are configurable per-college via `college_settings.epa_verdict_bands`.
   Pass `bands` in from `useCollegeSettings().settings.epa_verdict_bands` so
   the gauge / cohort dashboard responds when an admin edits the config.

   Falls back to UK FE defaults (refer 0-25 / not_yet 25-50 / almost 50-75 /
   ready 75-100) when a college hasn't customised yet.
   ========================================================================== */

interface JudgementLike {
  verdict: string | null | undefined;
  confidence: number | null | undefined;
}

export const DEFAULT_EPA_VERDICT_BANDS: EpaVerdictBands =
  DEFAULT_COLLEGE_SETTINGS.epa_verdict_bands;

/**
 * Map a judgement to a 0-100 position on the readiness spectrum: the MIDDLE
 * of its verdict's band. Confidence used to slide the marker inside the band,
 * so a 95%-confident "refer" plotted at 24 (next to "not yet") and a
 * 10%-confident "ready" at 77 — readiness rose as the AI grew surer a learner
 * wasn't ready. Confidence means "how sure", not "how ready"; show it beside
 * the marker instead (see `confidenceLabel`).
 */
export function epaJudgementPosition(
  j: JudgementLike | null | undefined,
  bands: EpaVerdictBands = DEFAULT_EPA_VERDICT_BANDS
): number | null {
  if (!j?.verdict) return null;
  const tuple = (bands as unknown as Record<string, [number, number] | undefined>)[j.verdict];
  const [lo, hi] = tuple ?? [0, 100];
  return Math.round((lo + hi) / 2);
}

/** "80% sure", or null when there's no confidence on the judgement. */
export function confidenceLabel(j: JudgementLike | null | undefined): string | null {
  return j?.confidence == null ? null : `${Math.round(j.confidence)}% sure`;
}

/** The band edges, for drawing gauge ticks from the college's own settings. */
export function bandTicks(bands: EpaVerdictBands = DEFAULT_EPA_VERDICT_BANDS): number[] {
  const edges = new Set<number>();
  for (const v of Object.values(bands) as Array<[number, number]>) {
    if (v[0] > 0 && v[0] < 100) edges.add(v[0]);
    if (v[1] > 0 && v[1] < 100) edges.add(v[1]);
  }
  return [...edges].sort((a, b) => a - b);
}
