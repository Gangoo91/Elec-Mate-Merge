/**
 * portfolioReadiness — VACSR completeness for a saved portfolio entry.
 *
 * Mirrors the live meter in UnifiedCaptureSheet but reads from a persisted
 * PortfolioEntry. Used by the detail sheet (full meter) and the My work grid
 * (an "assessor-ready" dot at 5/5). VACSR = Valid, Authentic, Current,
 * Sufficient, Reliable — the standard assessors apply at the EPA gateway.
 */

import type { PortfolioEntry } from '@/types/portfolio';

export type ReadinessKey = 'valid' | 'authentic' | 'current' | 'sufficient' | 'reliable';

export interface EvidenceReadiness {
  checks: Record<ReadinessKey, boolean>;
  score: number;
  total: number;
  ready: boolean;
}

export const READINESS_LABELS: { k: ReadinessKey; label: string }[] = [
  { k: 'valid', label: 'Valid' },
  { k: 'authentic', label: 'Authentic' },
  { k: 'current', label: 'Current' },
  { k: 'sufficient', label: 'Sufficient' },
  { k: 'reliable', label: 'Reliable' },
];

export function getEvidenceReadiness(entry: PortfolioEntry): EvidenceReadiness {
  const meta = entry.metadata ?? {};
  const checks: Record<ReadinessKey, boolean> = {
    valid: (entry.assessmentCriteria?.length ?? 0) > 0,
    authentic: Boolean(meta.authenticityConfirmed || meta.witness?.name?.trim()),
    current: Boolean(meta.workDate),
    sufficient: Boolean(
      meta.role?.trim() && (entry.description?.trim() || entry.reflection?.trim())
    ),
    reliable: (entry.evidenceFiles?.length ?? 0) > 0 && Boolean(meta.evidenceType),
  };
  const score = Object.values(checks).filter(Boolean).length;
  return { checks, score, total: 5, ready: score === 5 };
}
