import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

/**
 * The shapes you can only see across the whole trial cohort.
 *
 * `useTrialCohort` returns one row per trial, which is what the list and the
 * chase queue need. This is the other half — the aggregates behind the charts:
 * when trials stop coming back, which scores convert, how the weekly intake is
 * trending, and how much of the live cohort we have actually contacted.
 *
 * All of it comes from one `get_trial_insights()` RPC rather than five client
 * round trips, because every panel reads the same cohort and they must agree.
 */

export interface TrialWeek {
  /** Monday of the signup week, ISO date. */
  week: string;
  started: number;
  converted: number;
  expired: number;
  live: number;
}

/** One day index into the trial window, and who was still turning up on it. */
export interface TrialCurvePoint {
  d: number;
  converted_eligible: number;
  expired_eligible: number;
  live_eligible: number;
  converted_active: number;
  expired_active: number;
  live_active: number;
}

/** A 15-point slice of the trial score, and how that slice ended. */
export interface TrialBand {
  /** 0 = score 0–14, 5 = 75+. */
  band: number;
  n: number;
  decided: number;
  converted: number;
  live: number;
}

export interface TrialInsights {
  weekly: TrialWeek[];
  curve: TrialCurvePoint[];
  bands: TrialBand[];
  produced: Array<{ made: boolean; decided: number; converted: number }>;
  /** Per-trial contact history, for suppressing a second nudge the same day. */
  contacts: Array<{ user_id: string; last_at: string; sends: number }>;
  contact: {
    n: number;
    contacted: number;
    contacted_converted: number;
    contacted_decided: number;
    uncontacted_converted: number;
    uncontacted_decided: number;
    live_contacted: number;
    live_total: number;
  } | null;
  /** Trials that never opened the app again after the day they signed up. */
  returned: { n: number; never_returned: number } | null;
  ttfv: {
    acted_converted: number;
    n_converted: number;
    acted_expired: number;
    n_expired: number;
    acted_live: number;
    n_live: number;
    median_min: number | null;
  } | null;
  generated_at: string;
}

/**
 * Day-of-trial return rate, trimmed to the days worth drawing.
 *
 * Trials here mostly run eight days, so the day 8+ rows are three or four
 * accounts and the rate swings 0–100% on a single person. Anything with fewer
 * than `minEligible` trials behind it is dropped rather than drawn as signal.
 */
export function returnCurve(curve: TrialCurvePoint[], minEligible = 8) {
  return curve
    .filter((p) => p.converted_eligible + p.expired_eligible >= minEligible)
    .map((p) => ({
      day: p.d,
      convertedPct: p.converted_eligible
        ? (p.converted_active / p.converted_eligible) * 100
        : null,
      expiredPct: p.expired_eligible ? (p.expired_active / p.expired_eligible) * 100 : null,
      convertedN: p.converted_eligible,
      expiredN: p.expired_eligible,
      convertedActive: p.converted_active,
      expiredActive: p.expired_active,
    }));
}

export const BAND_LABELS = ['0–14', '15–29', '30–44', '45–59', '60–74', '75+'] as const;

/**
 * The smallest number of finished trials a band needs before its rate is drawn.
 *
 * Once deleted certificates stopped counting as work, the top band fell to two
 * decided trials — and two of two converting is a 100% bar that means nothing.
 * Bands below this are still returned (the caller reports how many were held
 * back) but are not plotted.
 */
export const BAND_MIN_DECIDED = 5;

/** Conversion within each score band, over decided trials only. */
export function bandRates(bands: TrialBand[]) {
  return bands.map((b) => ({
    band: b.band,
    label: BAND_LABELS[b.band] ?? String(b.band),
    n: b.n,
    decided: b.decided,
    converted: b.converted,
    live: b.live,
    // A band with nothing decided has no rate — not a rate of zero.
    cvr: b.decided > 0 ? (b.converted / b.decided) * 100 : null,
  }));
}

/**
 * The weekly intake, most recent `weeks` only and gap-filled.
 *
 * Weeks with no signups are missing from the RPC rather than zero, so plotting
 * the rows as they come draws a continuous line across a three-week gap.
 */
export function weeklySeries(weekly: TrialWeek[], weeks = 16): TrialWeek[] {
  if (weekly.length === 0) return [];
  const byWeek = new Map(weekly.map((w) => [w.week, w]));
  const last = new Date(weekly[weekly.length - 1].week + 'T00:00:00Z');
  const out: TrialWeek[] = [];
  for (let i = weeks - 1; i >= 0; i--) {
    const d = new Date(last);
    d.setUTCDate(d.getUTCDate() - i * 7);
    const key = d.toISOString().slice(0, 10);
    out.push(byWeek.get(key) ?? { week: key, started: 0, converted: 0, expired: 0, live: 0 });
  }
  return out;
}

export function useTrialInsights() {
  return useQuery<TrialInsights>({
    queryKey: ['admin-trial-insights'],
    staleTime: 5 * 60 * 1000,
    queryFn: async () => {
      const { data, error } = await supabase.rpc('get_trial_insights' as never);
      if (error) throw error;
      const payload = (data ?? {}) as Partial<TrialInsights>;
      return {
        weekly: payload.weekly ?? [],
        curve: payload.curve ?? [],
        bands: payload.bands ?? [],
        produced: payload.produced ?? [],
        contacts: payload.contacts ?? [],
        contact: payload.contact ?? null,
        returned: payload.returned ?? null,
        ttfv: payload.ttfv ?? null,
        generated_at: payload.generated_at ?? new Date().toISOString(),
      };
    },
  });
}

/* ─────────────────────────────────────────────────────────────
   Why people leave
   ───────────────────────────────────────────────────────────── */

export interface TrialCancelReasons {
  total: number;
  reasons: Array<{ reason: string; n: number }>;
  /** Cancellations recorded while the person was still inside a trial window. */
  in_trial: number;
  generated_at: string;
}

/** Survey codes are snake_case; these are what a person would say. */
export const CANCEL_REASON_LABELS: Record<string, string> = {
  not_using: "Wasn't using it",
  too_expensive: 'Too expensive',
  missing_feature: 'Missing a feature',
  switching: 'Switching to something else',
  bug: 'Something was broken',
  other: 'Other',
  unknown: 'Not given',
};

export function useTrialCancelReasons() {
  return useQuery<TrialCancelReasons | null>({
    queryKey: ['admin-trial-cancel-reasons'],
    staleTime: 10 * 60 * 1000,
    queryFn: async () => {
      const { data, error } = await supabase.rpc('get_trial_cancel_reasons' as never);
      if (error) throw error;
      return (data ?? null) as TrialCancelReasons | null;
    },
  });
}
