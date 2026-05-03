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
 * Map a judgement to a 0-100 position on the readiness spectrum.
 * `bands` is the per-college configuration; defaults are applied if a
 * verdict isn't in the bands map.
 */
export function epaJudgementPosition(
  j: JudgementLike | null | undefined,
  bands: EpaVerdictBands = DEFAULT_EPA_VERDICT_BANDS
): number | null {
  if (!j?.verdict) return null;
  const tuple = (bands as unknown as Record<string, [number, number] | undefined>)[j.verdict];
  const [lo, hi] = tuple ?? [0, 100];
  const conf = j.confidence ?? 50;
  const t = Math.min(100, Math.max(0, conf)) / 100;
  return Math.round(lo + (hi - lo) * t);
}
