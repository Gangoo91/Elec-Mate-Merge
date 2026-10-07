import { TONE_BG, type Tone } from '@/components/college/quality/QualityKit';
import type { PageHelpContent } from '@/components/hub/PageHelp';

/* ==========================================================================
   complianceStatus — the one definition of a staff check's state, shared by
   the Quality hub, Compliance docs and the audit pack (so the three screens
   can't disagree on what "in date" means or what a colour stands for).

   States come from v_single_central_record.computed_status:
     valid                 In date: on file, verified, more than 60 days left
     expiring              Expires within 60 days
     expired               Past its expiry date
     missing               Never put on file
     pending_verification  Uploaded, not yet checked by a second person

   "In date" is `valid` only. An expiring check is still lawful today but is
   counted on its own, so the in-date figure never hides renewals that are due.
   Every row falls in exactly one state, so the states always add up to the
   total.
   ========================================================================== */

export type ScrStatus = 'valid' | 'expiring' | 'expired' | 'missing' | 'pending_verification';

export const SCR_ORDER: ScrStatus[] = ['valid', 'expiring', 'pending_verification', 'expired', 'missing'];

export const SCR_STATUS: Record<ScrStatus, { label: string; tone: Tone; body: string }> = {
  valid: { label: 'In date', tone: 'good', body: 'On file, verified and more than 60 days from expiry.' },
  expiring: { label: 'Expiring within 60 days', tone: 'warn', body: 'Still valid today but expires within 60 days. Renew now.' },
  pending_verification: { label: 'Awaiting verification', tone: 'info', body: 'Uploaded but not yet checked by a second person.' },
  expired: { label: 'Expired', tone: 'bad', body: 'Past its expiry date. Not valid today.' },
  missing: { label: 'Missing', tone: 'neutral', body: 'Never put on file. Fix these with the expired ones first.' },
};

/** Light print colours for the audit pack, same meaning as the screen tones. */
export const SCR_PRINT: Record<ScrStatus, { dot: string; cell: string }> = {
  valid: { dot: 'bg-emerald-500', cell: 'bg-emerald-200 border-emerald-400' },
  expiring: { dot: 'bg-orange-400', cell: 'bg-orange-200 border-orange-400' },
  pending_verification: { dot: 'bg-sky-400', cell: 'bg-sky-100 border-sky-300' },
  expired: { dot: 'bg-red-500', cell: 'bg-red-200 border-red-400' },
  // Darker grey: a light grey cell in the matrix means 'not required'.
  missing: { dot: 'bg-gray-500', cell: 'bg-gray-400 border-gray-600' },
};

/** The one legend, for every screen's help panel. */
export const SCR_LEGEND: NonNullable<PageHelpContent['legend']> = SCR_ORDER.map((k) => ({
  swatch: TONE_BG[SCR_STATUS[k].tone],
  label: SCR_STATUS[k].label,
  body: SCR_STATUS[k].body,
}));

export interface ScrCounts {
  valid: number;
  expiring: number;
  pending_verification: number;
  expired: number;
  missing: number;
  total: number;
  /** valid / total, rounded; null when there are no records. */
  inDatePct: number | null;
  /** expired + missing: what an inspector will find. */
  problems: number;
}

/**
 * Normalise counts from any source. When a source has no awaiting-verification
 * figure (useComplianceStats), it is whatever is left of the total, so the
 * states always add up.
 */
export function scrCounts(c: {
  valid: number;
  expiring: number;
  expired: number;
  missing: number;
  total: number;
  pending_verification?: number;
}): ScrCounts {
  const pending = c.pending_verification ?? Math.max(0, c.total - c.valid - c.expiring - c.expired - c.missing);
  return {
    valid: c.valid,
    expiring: c.expiring,
    pending_verification: pending,
    expired: c.expired,
    missing: c.missing,
    total: c.total,
    inDatePct: c.total > 0 ? Math.round((100 * c.valid) / c.total) : null,
    problems: c.expired + c.missing,
  };
}

/** Chart segments in the shared order and colours. */
export function scrSegments(c: ScrCounts, onClick?: () => void) {
  return SCR_ORDER.map((k) => ({ label: SCR_STATUS[k].label, n: c[k], tone: SCR_STATUS[k].tone, onClick }));
}
