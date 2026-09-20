import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { AQUA, BLUE } from '@/components/admin/overview/primitives';

/**
 * The retention baseline — the numbers the 20 Sep 2026 retention plan is
 * measured against, all from one `get_retention_metrics()` RPC so every
 * panel reads the same cohort and they cannot disagree.
 *
 * The activation metric is "3 active days in the first 7", not "first cert":
 * in the May–July carded cohort, electricians who opened the app on 3+ days
 * in week one were retained at 50% versus 22% for one day or fewer, and a
 * single cert barely moved the needle (37% vs a 33% base). Everything here
 * is by signup week so a blended average cannot hide a bad cohort.
 */
export type RetentionRole = 'electrician' | 'apprentice';

export interface RetentionWeek {
  /** Monday of the signup week, ISO date. */
  wk: string;
  role: RetentionRole;
  /** Carded that week: started a trial or subscription anywhere. */
  carded: number;
  /** Opened the app on 3 or more days in their first 7. */
  hit_3in7: number;
  /** Opened on one day or fewer in their first 7. */
  le1day: number;
  /** Came back on 2+ days in days 8–30 (only those old enough). */
  back_wk2: number;
  old_enough_wk2: number;
  /** Still subscribed today (only those old enough for it to mean anything). */
  still_subscribed: number;
  old_enough_14d: number;
}

/** A paying customer the page wants Andrew to act on. */
export interface RetentionPerson {
  id: string;
  full_name: string | null;
  email: string;
  role: RetentionRole;
  tier: string | null;
  source: string | null;
  /** When the current period ends — the next renewal, or the trial end. */
  renews_at: string | null;
  last_login: string | null;
}

export interface RetentionMetrics {
  generated_at: string;
  weekly: RetentionWeek[];
  dormant: Array<{ role: RetentionRole; paying: number; dormant_14d: number }>;
  /** Renewing in the next 10 days with no session in the last 14. */
  at_risk: RetentionPerson[];
  /** Paying, no session in 14 days, most recently seen first. Capped at 60. */
  dormant_list: RetentionPerson[];
  cancel_saves_30d: { stayed: number; decided: number };
  reasons_28d: Array<{ reason: string; n: number }>;
  words_14d: Array<{
    reason: string;
    reason_detail: string;
    tier: string | null;
    created_at: string;
    full_name: string | null;
  }>;
  winback_60d: { recipients: number; back: number };
  /** The Overview's "Paying": both rails, from the daily snapshot. Null before the first snapshot. */
  paying_today: { day: string; stripe: number; rc: number } | null;
  /** Subscribed, non-trial accounts in roles this page does not cover (employers, colleges). */
  paying_other_roles: number;
}

export function useRetentionMetrics() {
  return useQuery({
    queryKey: ['admin', 'retention-metrics'],
    queryFn: async (): Promise<RetentionMetrics> => {
      // The generated Database types predate this RPC; widen the client
      // rather than regenerate 30k lines of types for one function name.
      const client = supabase as unknown as {
        rpc: (fn: string) => Promise<{ data: unknown; error: { message: string } | null }>;
      };
      // Called as a method, not a detached function: supabase-js's rpc reads `this`.
      const { data, error } = await client.rpc('get_retention_metrics');
      if (error) throw new Error(error.message);
      return data as RetentionMetrics;
    },
    staleTime: 5 * 60 * 1000,
  });
}

/** Percentage as a whole number, or null when the denominator is empty. */
export function pct(n: number, d: number): number | null {
  return d > 0 ? Math.round((100 * n) / d) : null;
}

/**
 * Two series, one axis, fixed hues: electricians are AQUA and apprentices are
 * BLUE everywhere on the Retention page. The pair is validated for
 * colour-vision separation on the dark surface (ΔE 19.6 deutan), and every
 * chart carries a legend, so identity is never colour alone.
 */
export const RETENTION_COLOURS = { electrician: AQUA, apprentice: BLUE } as const;

/** 12-week targets from the plan — the colour thresholds on the page. */
export const TARGET_3IN7: Record<RetentionRole, number> = { electrician: 45, apprentice: 55 };
export const TARGET_BACK_WK2: Record<RetentionRole, number> = { electrician: 40, apprentice: 48 };

/** Sum a column over a role for a set of weeks. */
export function sumWeeks(
  weekly: RetentionWeek[],
  role: RetentionRole,
  weeks: string[],
  key: keyof RetentionWeek
): number {
  return weekly
    .filter((w) => w.role === role && weeks.includes(w.wk))
    .reduce((a, w) => a + (w[key] as number), 0);
}

export const REASON_LABELS: Record<string, string> = {
  not_using: 'Not using it',
  too_expensive: 'Too expensive',
  missing_feature: 'Missing a feature',
  switching: 'Found something else',
  bug: 'Bug or it broke',
  other: 'Something else',
};
