import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface TrialCohortRow {
  user_id: string;
  email: string | null;
  full_name: string | null;
  trial_start: string;
  trial_end: string;
  status: 'live' | 'converted' | 'expired';
  days_remaining: number;
  subscription_tier: string | null;
  subscription_source: string | null;
  /** All counted INSIDE this trial's own window, not a rolling 30 days. */
  active_days: number;
  sessions: number;
  page_views: number;
  feature_uses: number;
  seconds_tracked: number;
  reports_made: number;
  quotes_made: number;
  last_seen: string | null;
}

/**
 * Actual length of a trial in days.
 *
 * The list hardcoded "of 7 days", but trials run 7 to 23 days here — extended
 * ones included — so a subscriber with an extended trial rendered as "8 of 7
 * days". Derived from the window rather than assumed.
 */
export function trialLengthDays(r: { trial_start: string; trial_end: string }): number {
  /*
    Calendar dates spanned, not 24-hour blocks.

    `active_days` is `count(distinct date(created_at))`, so a trial that starts
    at 22:00 and runs seven times twenty-four hours touches EIGHT dates — and
    the row rendered "8 of 7 days". Both sides count calendar dates now.
  */
  const start = new Date(r.trial_start);
  const end = new Date(r.trial_end);
  const startDay = Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate());
  const endDay = Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate());
  return Math.max(1, Math.round((endDay - startDay) / 86_400_000) + 1);
}

export interface TrialFunnelStage {
  key: string;
  label: string;
  /** How many trials reached this stage. */
  count: number;
  /** Share of everyone who started. */
  pctOfStarted: number;
  /** Conversion rate of the DECIDED trials that reached this stage. */
  cvr: number | null;
  hint: string;
}

export interface TrialCohortSummary {
  rows: TrialCohortRow[];
  live: number;
  converted: number;
  expired: number;
  /** Trials whose outcome is known — the only fair CVR denominator. */
  decided: number;
  cvr: number;
  stages: TrialFunnelStage[];
  /** Conversion split by whether they produced anything during the trial. */
  didWorkCvr: number | null;
  noWorkCvr: number | null;
  /** Live trials worth chasing: ending soon and actually using it. */
  endingSoon: TrialCohortRow[];
}

const didWork = (r: TrialCohortRow) => r.reports_made + r.quotes_made > 0;

/*
  Trial engagement, scored on a trial-length window.

  The page was applying `calculateEngagementScore` — calibrated against
  all-time activity across the whole user base — to a seven-day trial. Everyone
  came out cold: someone with three active days, a certificate and 53 minutes
  scored 20. It also ignored the one thing that actually predicts conversion
  here (producing a certificate or quote) while weighting `feature_use` at 25
  points, an event only a handful of screens ever emit.

  Weights are set against this cohort's own distribution (n=158), so a p90
  trial lands near 88 and the median near 26:
      active days  p50 2   p90 4
      minutes      p50 23  p90 180
      sessions     p50 3   p90 10
      feature uses         p90 4
      produced             p90 2
*/
export function calculateTrialScore(r: {
  reports_made: number;
  quotes_made: number;
  active_days: number;
  seconds_tracked: number;
  sessions: number;
  feature_uses: number;
}): number {
  const produced = Math.min((r.reports_made + r.quotes_made) * 12.5, 25);
  const days = Math.min(r.active_days * 5.5, 22);
  const minutes = Math.min((r.seconds_tracked / 60) * 0.122, 22);
  const sessions = Math.min(r.sessions * 1.1, 11);
  const features = Math.min(r.feature_uses * 2, 8);
  return Math.round(produced + days + minutes + sessions + features);
}

/*
  Two bands, not three, because three is not supported by the data.

  Measured over the 136 decided trials, a hot/warm/cold split gives
      cold  <26   12.9% CVR (n=70)
      warm  26-44 12.2% CVR (n=41)
      hot   >=45  24.0% CVR (n=25)
  Cold and warm are indistinguishable — the middle band would be decoration.
  The one real cut is at 45, where conversion roughly doubles. n=25 above the
  line is a small sample, so this is a triage aid, not a forecast.
*/
/** The score's components, so the UI can show how it was reached rather than
 *  describing a formula that no longer exists. */
export function trialScoreParts(r: {
  reports_made: number;
  quotes_made: number;
  active_days: number;
  seconds_tracked: number;
  sessions: number;
  feature_uses: number;
}) {
  const mins = Math.round(r.seconds_tracked / 60);
  return [
    {
      label: 'Produced something',
      detail: `${r.reports_made + r.quotes_made} certificate${
        r.reports_made + r.quotes_made === 1 ? '' : 's'
      } or quote${r.reports_made + r.quotes_made === 1 ? '' : 's'}`,
      points: Math.min((r.reports_made + r.quotes_made) * 12.5, 25),
      max: 25,
    },
    {
      label: 'Came back',
      detail: `${r.active_days} active day${r.active_days === 1 ? '' : 's'}`,
      points: Math.min(r.active_days * 5.5, 22),
      max: 22,
    },
    {
      label: 'Time in app',
      detail: `${mins} min`,
      points: Math.min(mins * 0.122, 22),
      max: 22,
    },
    {
      label: 'Sessions',
      detail: `${r.sessions} app open${r.sessions === 1 ? '' : 's'}`,
      points: Math.min(r.sessions * 1.1, 11),
      max: 11,
    },
    {
      label: 'Features used',
      detail: `${r.feature_uses} tracked`,
      points: Math.min(r.feature_uses * 2, 8),
      max: 8,
    },
  ];
}

export const TRIAL_ENGAGED_AT = 45;
export const isEngagedTrial = (score: number) => score >= TRIAL_ENGAGED_AT;

/**
 * The trial cohort, measured inside each trial's own window.
 *
 * The page previously read every engagement figure from
 * `user_activity_summary`, a view with a hard `now() - 30 days` filter, while
 * the cohort spans four months — so any trial older than a month scored zero
 * on everything and the funnel's third stage read 27 against a true 85.
 *
 * The funnel stages are also chosen to be capable of failing. The old one had
 * "Engaged", defined as "has ever signed in", which is a precondition of having
 * a trial at all: it read 158/158, 100%, and could never read anything else.
 */
export function useTrialCohort() {
  return useQuery<TrialCohortSummary>({
    queryKey: ['admin-trial-cohort'],
    staleTime: 60_000,
    queryFn: async () => {
      const { data, error } = await supabase.rpc('get_trial_cohort' as never);
      if (error) throw error;
      const rows = ((data ?? []) as unknown as TrialCohortRow[]).map((r) => ({
        ...r,
        // The RPC is the authority on status, but be defensive: a null status
        // would otherwise silently land in "expired" and dent the CVR.
        status: (r.status ?? 'expired') as TrialCohortRow['status'],
      }));

      const live = rows.filter((r) => r.status === 'live').length;
      const converted = rows.filter((r) => r.status === 'converted').length;
      const expired = rows.filter((r) => r.status === 'expired').length;
      const decided = converted + expired;
      const started = rows.length;

      // CVR of a subset, over decided trials only. A live trial has not had the
      // chance to convert yet, so counting it as a failure understates.
      const cvrOf = (subset: TrialCohortRow[]) => {
        const d = subset.filter((r) => r.status !== 'live');
        if (!d.length) return null;
        return (d.filter((r) => r.status === 'converted').length / d.length) * 100;
      };

      const returned = rows.filter((r) => r.active_days >= 2);
      const worked = rows.filter(didWork);

      const stages: TrialFunnelStage[] = [
        {
          key: 'started',
          label: 'Started a trial',
          count: started,
          pctOfStarted: 100,
          // Deliberately no CVR on the baseline row. This cohort is the subset
          // of trials that carry a profiles.trial_end, and its conversion rate
          // (14.7%) is not the business's trial conversion rate (59.6%, from
          // Stripe) — printing both on one screen just makes the page argue
          // with itself. What this panel is for is the GAP between the stages,
          // which is valid within the sample.
          cvr: null,
          hint: 'The sample with activity data. Baseline for the rows below.',
        },
        {
          key: 'returned',
          label: 'Came back',
          count: returned.length,
          pctOfStarted: started ? (returned.length / started) * 100 : 0,
          cvr: cvrOf(returned),
          hint: 'Active on two or more separate days during the trial.',
        },
        {
          key: 'worked',
          label: 'Produced something',
          count: worked.length,
          pctOfStarted: started ? (worked.length / started) * 100 : 0,
          cvr: cvrOf(worked),
          hint: 'Created a certificate or a quote before the trial ended.',
        },
        {
          key: 'subscribed',
          label: 'Subscribed',
          count: converted,
          pctOfStarted: started ? (converted / started) * 100 : 0,
          cvr: null,
          hint: 'Trial ended and they stayed.',
        },
      ];

      return {
        rows,
        live,
        converted,
        expired,
        decided,
        cvr: decided ? (converted / decided) * 100 : 0,
        stages,
        didWorkCvr: cvrOf(worked),
        noWorkCvr: cvrOf(rows.filter((r) => !didWork(r))),
        // Who to chase: still live, ending within 3 days, and has actually
        // used the thing — chasing a dormant trial is a different job.
        endingSoon: rows
          .filter((r) => r.status === 'live' && r.days_remaining <= 3 && r.active_days >= 1)
          .sort((a, b) => a.days_remaining - b.days_remaining),
      };
    },
  });
}
