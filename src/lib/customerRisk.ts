/**
 * ELE-1555 — customer risk / reliability (RAG).
 *
 * Two signals, deliberately kept separate right up to the point of display:
 *
 *   PAYMENTS (automatic) — derived from `quotes` invoice history. Objective and
 *   free, but silent until a customer has at least two paid invoices, and blind
 *   to everything that isn't money: messing you about, refusing access, abuse.
 *
 *   MANUAL (the electrician's own flag) — a colour plus a short why. Covers the
 *   new customer with no history and the behaviour invoices can't see.
 *
 * The manual flag WINS wherever both exist. If someone has taken the trouble to
 * mark a customer red, showing them "Reliable" because they happen to pay on
 * time would be the app arguing with its user about their own trade.
 *
 * One resolver so the list row, the detail header and the campaign picker can
 * never disagree about what colour a customer is.
 */

import type { ReliabilityLevel } from '@/hooks/useCustomerPaymentStats';

export type RiskRating = 'green' | 'amber' | 'red';
export type RiskSource = 'manual' | 'payments' | 'none';

export interface EffectiveRisk {
  rating: RiskRating | null;
  source: RiskSource;
  /** Short chip text. */
  label: string;
  /** The user's own note, manual flags only. */
  reason?: string;
  /** Chip classes — border/background/text as one string. */
  chipClass: string;
  /** Bare colour for a dot or bar. */
  dotClass: string;
}

const TONE: Record<RiskRating, { chip: string; dot: string }> = {
  green: {
    chip: 'border-emerald-500/25 bg-emerald-500/[0.1] text-emerald-300',
    dot: 'bg-emerald-400',
  },
  amber: {
    chip: 'border-amber-500/25 bg-amber-500/[0.1] text-amber-300',
    dot: 'bg-amber-400',
  },
  red: {
    chip: 'border-red-500/25 bg-red-500/[0.12] text-red-300',
    dot: 'bg-red-400',
  },
};

/** What the electrician means when they set the flag by hand. */
export const MANUAL_LABEL: Record<RiskRating, string> = {
  green: 'Good client',
  amber: 'Take care',
  red: 'High risk',
};

export const MANUAL_DESCRIPTION: Record<RiskRating, string> = {
  green: 'Pays up, easy to deal with, worth keeping',
  amber: 'Watch this one — slow, awkward, or needs chasing',
  red: 'Deposit up front, or think hard before taking the work',
};

/** How a computed payment level presents. Wording stays about MONEY only. */
const PAYMENT_LABEL: Record<Exclude<ReliabilityLevel, 'none'>, { rating: RiskRating; label: string }> =
  {
    good: { rating: 'green', label: 'Reliable' },
    fair: { rating: 'amber', label: 'Fair' },
    poor: { rating: 'red', label: 'Pays late' },
  };

const NONE: EffectiveRisk = {
  rating: null,
  source: 'none',
  label: '',
  chipClass: '',
  dotClass: '',
};

export interface ResolveRiskInput {
  /** customers.risk_rating — the manual override. */
  riskRating?: RiskRating | null;
  /** customers.risk_reason. */
  riskReason?: string | null;
  /** Computed from invoice history. */
  paymentReliability?: ReliabilityLevel | null;
}

export function resolveCustomerRisk({
  riskRating,
  riskReason,
  paymentReliability,
}: ResolveRiskInput): EffectiveRisk {
  if (riskRating) {
    const tone = TONE[riskRating];
    return {
      rating: riskRating,
      source: 'manual',
      label: MANUAL_LABEL[riskRating],
      reason: riskReason || undefined,
      chipClass: tone.chip,
      dotClass: tone.dot,
    };
  }

  if (paymentReliability && paymentReliability !== 'none') {
    const mapped = PAYMENT_LABEL[paymentReliability];
    const tone = TONE[mapped.rating];
    return {
      rating: mapped.rating,
      source: 'payments',
      label: mapped.label,
      chipClass: tone.chip,
      dotClass: tone.dot,
    };
  }

  return NONE;
}

/**
 * Filter keys for the customers list. 'flagged' is the one people actually
 * want — "show me everyone I need to be careful with" — and deliberately spans
 * both amber and red, and both sources.
 */
export type RiskFilter = 'all' | 'green' | 'amber' | 'red' | 'flagged';

export const RISK_FILTER_LABEL: Record<RiskFilter, string> = {
  all: 'All',
  flagged: 'Needs care',
  red: 'High risk',
  amber: 'Take care',
  green: 'Good',
};

export function matchesRiskFilter(risk: EffectiveRisk, filter: RiskFilter): boolean {
  if (filter === 'all') return true;
  if (filter === 'flagged') return risk.rating === 'amber' || risk.rating === 'red';
  return risk.rating === filter;
}
