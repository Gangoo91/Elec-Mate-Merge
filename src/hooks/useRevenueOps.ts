import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

/**
 * The revenue questions Stripe cannot answer: the win-back programme, and what
 * leavers said on the way out.
 *
 * Recovery is deliberately not one number. "60 of the people we emailed are
 * subscribed today" is correlation and was all that existed; splitting on
 * whether their subscription started AFTER the first win-back email separates
 * the ones the programme plausibly recovered from the ones who had already come
 * back on their own — including nine we emailed anyway, which is a targeting
 * defect rather than a success.
 */

export interface WinbackQueue {
  sent_rows: number;
  pending: number;
  skipped: number;
  failed: number;
  emails_sent: number;
  sent_30d: number;
  people: number;
}

export interface WinbackOutcome {
  recipients: number;
  now_subscribed: number;
  /** Subscription started after the first win-back email — the defensible one. */
  recovered_after: number;
  /** Already subscribed before we emailed them. We should not have. */
  already_back_before: number;
  timing_unknown: number;
}

export interface RevenueOps {
  winback: {
    queue: WinbackQueue | null;
    outcome: WinbackOutcome | null;
    weekly: Array<{ week: string; sent: number }>;
    skips: Array<{ reason: string; n: number }>;
  };
  churn_reasons: Array<{ reason: string; tier: string; n: number }>;
  generated_at: string;
}

/** Survey codes are snake_case; these are what a person would say. */
export const CHURN_REASON_LABELS: Record<string, string> = {
  not_using: "Wasn't using it",
  too_expensive: 'Too expensive',
  missing_feature: 'Missing a feature',
  switching: 'Switching to something else',
  bug: 'Something was broken',
  other: 'Other',
  unknown: 'Not given',
};

/**
 * Recovery rate over recipients, as a percentage.
 *
 * Denominator is everyone emailed, not everyone still on the list, because a
 * programme's rate has to include the people it failed to move.
 */
export function recoveryRate(o: WinbackOutcome | null): number | null {
  if (!o || o.recipients === 0) return null;
  return (o.recovered_after / o.recipients) * 100;
}

export function useRevenueOps() {
  return useQuery<RevenueOps | null>({
    queryKey: ['admin-revenue-ops'],
    staleTime: 5 * 60 * 1000,
    queryFn: async () => {
      const { data, error } = await supabase.rpc('get_revenue_ops' as never);
      if (error) throw error;
      return (data ?? null) as RevenueOps | null;
    },
  });
}
