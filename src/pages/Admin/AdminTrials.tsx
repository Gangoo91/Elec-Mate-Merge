/**
 * Trials.
 *
 * Three jobs, in the order you do them: what the trial business is doing, who
 * to chase before the end of today, and what the cohort says about why trials
 * convert. Everything below the fold exists to justify the queue above it.
 *
 * Rebuilt on the overview dialect — Panel / KpiTile / Sparkline / recharts —
 * so it reads as the same product as the admin dashboard. The page it replaced
 * was on the older editorial dialect, opened with four dashes because the
 * Stripe call had not landed, carried no chart of any kind, and offered a Nudge
 * button per row with no priority, no reason and no memory of who had already
 * been contacted.
 *
 * Two cohorts live on this page and they are labelled everywhere they appear:
 *
 *   Stripe   the headline conversion rate. Trials that Stripe actually ran and
 *            settled against paid invoices. This is the business's number.
 *   Activity the 185 accounts carrying a profiles.trial_end, which is the only
 *            set we can measure in-app behaviour for. Its own conversion rate
 *            is much lower and is never shown as a headline — only the
 *            differences WITHIN it (the return curve, the score bands), which
 *            are valid inside the sample.
 */

import { useState, useMemo, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { storageGetJSONSync, storageSetJSONSync, storageRemoveSync } from '@/utils/storage';
import { supabase } from '@/integrations/supabase/client';
import { batchedInQuery } from '@/utils/batchedQuery';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import {
  RefreshCw,
  MailPlus,
  Download,
  XCircle,
  CheckCheck,
  Eye,
  Copy,
} from 'lucide-react';
import { format, formatDistanceToNow, parseISO, differenceInCalendarDays } from 'date-fns';
import PullToRefresh from '@/components/admin/PullToRefresh';
import { useHaptic } from '@/hooks/useHaptic';
import { toast } from 'sonner';
import { getInitials } from '@/utils/adminUtils';
import { PageFrame, IconButton, EmptyState, LoadingBlocks } from '@/components/admin/editorial';
import {
  ACCENT,
  Delta,
  Fig,
  GOOD,
  Hairline,
  KpiTile,
  Panel,
  RoundAvatar,
  SectionHead,
  Segmented,
  Sparkline,
  StackBar,
  StateDot,
} from '@/components/admin/overview/primitives';
import {
  ChartLegend,
  ReturnCurveChart,
  ScoreBandChart,
  TRIAL_COLOURS,
  WeeklyIntakeChart,
} from '@/components/admin/trials/TrialCharts';
import {
  useTrialCohort,
  calculateTrialScore,
  isEngagedTrial,
  trialLengthDays,
  trialScoreParts,
  TRIAL_ENGAGED_AT,
  type TrialCohortRow,
} from '@/hooks/useTrialCohort';
import {
  useTrialInsights,
  useTrialCancelReasons,
  bandRates,
  returnCurve,
  BAND_MIN_DECIDED,
  CANCEL_REASON_LABELS,
} from '@/hooks/useTrialInsights';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** A live Stripe trial whose auto-renew is already switched off. */
interface CancellingTrial {
  subscriptionId: string;
  customerId: string | null;
  email: string | null;
  /** Unix seconds. */
  trialEnd: number | null;
  cancelledAt: number | null;
}

interface TrialConversion {
  live: number;
  cancelling?: CancellingTrial[];
  ended: number;
  billed: number;
  stillPaying: number;
  convertedThenChurned: number;
  neverBilled: number;
  conversionRate: number;
  retainedRate: number;
}

/** A cohort row with everything the page needs to rank and explain it. */
interface TrialRow extends TrialCohortRow {
  score: number;
  engaged: boolean;
  produced: number;
  lenDays: number;
  /** Which day of the window they are on, 1-based. */
  dayOf: number;
  role: string | null;
  quietDays: number | null;
  lastContactAt: string | null;
  contactedToday: boolean;
  /** Stripe says auto-renew is off: they have decided to go but still have access. */
  cancelling: boolean;
  cancelledAt: string | null;
}

type ChaseKey = 'cancelling' | 'rescue' | 'cold_ending' | 'onboard' | 'quiet';

interface ActivityItem {
  id: string;
  action_type: string;
  action_detail: string;
  extra_info?: string | null;
  created_at: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function relativeTime(dateStr: string | undefined | null): string {
  if (!dateStr) return 'never';
  const ms = Date.now() - new Date(dateStr).getTime();
  if (ms < 60_000) return 'just now';
  if (ms < 3_600_000) return `${Math.floor(ms / 60_000)}m ago`;
  if (ms < 86_400_000) return `${Math.floor(ms / 3_600_000)}h ago`;
  const days = Math.floor(ms / 86_400_000);
  if (days < 30) return `${days}d ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

function formatMins(seconds: number): string {
  const mins = Math.round(seconds / 60);
  if (mins < 1) return '<1 min';
  if (mins < 60) return `${mins} min`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

function daysLeftLabel(r: { days_remaining: number }): string {
  if (r.days_remaining <= 0) return 'Ends today';
  if (r.days_remaining === 1) return '1 day left';
  return `${r.days_remaining} days left`;
}

/**
 * Which queue a live trial belongs in, and why.
 *
 * The order is the order you should work them, and each rule is tied to
 * something the cohort actually shows rather than to a hunch:
 *
 *   rescue       ending inside three days and either engaged or already
 *                producing. The 45+ score bands convert at 19–60% against 5–11%
 *                below, so this is where a conversation is worth having.
 *   cold_ending  ending inside three days with nothing behind it. Worth one
 *                message; not worth a phone call.
 *   onboard      has not come back since signup day. Four trials in ten never
 *                open the app again after joining, and the return curve splits
 *                on exactly that day — the biggest single lever on the page,
 *                and the cheapest to pull. (The live figure is computed, not
 *                asserted: an earlier draft of this comment said 64%, read off
 *                the curve's day-1 point, which is a different question —
 *                skipping day 1 and returning on day 3 still counts as coming
 *                back. Measured properly it is 41%.)
 *   quiet        was genuinely using it and has now gone three days silent with
 *                time still on the clock.
 *
 * A trial that is live, recent and active is deliberately in no queue: there is
 * nothing to do about it today.
 */
function classify(r: TrialRow): ChaseKey | null {
  /*
    Nothing outranks somebody who has already pressed cancel.

    Their trial has not run out, so they still have every feature — and unlike
    everyone else in this queue they have made a decision rather than drifted.
    They are the only group where the window to change the outcome is closing
    for a reason you can actually address.
  */
  if (r.cancelling) return 'cancelling';
  const endingSoon = r.days_remaining <= 3;
  if (endingSoon && (r.engaged || r.produced > 0)) return 'rescue';
  if (endingSoon) return 'cold_ending';
  /*
    No day-of ceiling here on purpose. This was `dayOf <= 2`, which quietly
    dropped anyone who signed up, never came back, and was now on day four —
    the exact person the group is named after, and the one with the most time
    left to save. Anybody who has not got past their signup day is in this
    group for as long as the trial runs.
  */
  if (r.active_days <= 1 && r.produced === 0) return 'onboard';
  if (r.active_days >= 2 && (r.quietDays ?? 0) >= 3) return 'quiet';
  return null;
}

function chaseReason(r: TrialRow, key: ChaseKey): string {
  switch (key) {
    case 'cancelling':
      return `Auto-renew off${
        r.cancelledAt ? ` ${relativeTime(r.cancelledAt)}` : ''
      } · keeps access ${r.days_remaining <= 0 ? 'until today' : `${r.days_remaining} more day${r.days_remaining === 1 ? '' : 's'}`} · ${
        r.produced > 0 ? `${r.produced} made` : `${r.active_days} active day${r.active_days === 1 ? '' : 's'}`
      }`;
    case 'rescue':
      return r.produced > 0
        ? `${r.produced} made · ${r.active_days} active days · ${r.days_remaining}d left`
        : `Engaged, score ${r.score} · ${r.days_remaining}d left`;
    case 'cold_ending':
      return `${r.active_days} active day${r.active_days === 1 ? '' : 's'} · nothing made · ${r.days_remaining}d left`;
    case 'onboard':
      return r.active_days === 0
        ? `Never opened it · day ${r.dayOf} of ${r.lenDays}`
        : `Not back since signup · day ${r.dayOf} of ${r.lenDays}`;
    case 'quiet':
      return `Active ${r.active_days} days, silent ${r.quietDays}d · ${r.days_remaining}d left`;
  }
}

/** Where the subscription lives, short enough to sit on a row. */
function sourceLabel(src: string | null): string | null {
  if (!src) return null;
  if (src === 'stripe') return 'Stripe';
  if (src === 'app_store') return 'App Store';
  if (src === 'play_store') return 'Play Store';
  return src.replace('_', ' ');
}

/**
 * Why each group is worth your time — in figures read from the data, not typed.
 *
 * These blurbs used to carry hardcoded statistics, and they rotted exactly as
 * you would expect: "45+ convert at 19–60%" was written before deleted
 * certificates stopped counting as work, after which the real range moved to
 * 22–56%, and "41% of cancellations" drifted to 42% as soon as one more person
 * filled the survey in. A number on screen has to come from the same query that
 * draws the chart under it, or the page argues with itself the moment anything
 * changes.
 */
function chaseGroups(stats: {
  /** Conversion of the plotted bands at or above the engaged threshold. */
  engagedRange: [number, number] | null;
  belowRange: [number, number] | null;
  neverReturnedPct: number | null;
  notUsingPct: number | null;
}): Array<{ key: ChaseKey; title: string; colour: string; why: string }> {
  const pct = (n: number) => `${Math.round(n)}%`;
  // "22–56%", not "22%–56%": the unit belongs on the range, not on each end.
  const range = (r: [number, number] | null) =>
    r
      ? Math.round(r[0]) === Math.round(r[1])
        ? pct(r[0])
        : `${Math.round(r[0])}–${pct(r[1])}`
      : null;

  const rescueWhy = (() => {
    const hi = range(stats.engagedRange);
    const lo = range(stats.belowRange);
    const base = 'Ending within three days and actually using it.';
    if (!hi || !lo) return `${base} This is the group where effort pays.`;
    return `${base} Trials scoring ${TRIAL_ENGAGED_AT}+ convert at ${hi} against ${lo} below — this is the group where effort pays.`;
  })();

  const cancellingWhy = (() => {
    const base =
      'Stripe says auto-renew is off, but the trial has not run out: they still have every feature for the days left. They decided rather than drifted, so there is a specific reason and a real chance to answer it.';
    return stats.notUsingPct != null
      ? `${base} "Wasn\u2019t using it" is ${pct(stats.notUsingPct)} of every cancellation on record.`
      : base;
  })();

  const onboardWhy = (() => {
    const base = 'Has not been back since the day they signed up — and the return curve splits on exactly that day.';
    const tail = 'The cheapest lever on this page, and these people still have time left.';
    return stats.neverReturnedPct != null
      ? `${base} ${pct(stats.neverReturnedPct)} of all trials never open it again after joining. ${tail}`
      : `${base} ${tail}`;
  })();

  return [
    {
      key: 'cancelling',
      title: 'Already cancelled — still has access',
      colour: TRIAL_COLOURS.expired,
      why: cancellingWhy,
    },
    {
      key: 'rescue',
      title: 'Worth a real conversation',
      colour: TRIAL_COLOURS.converted,
      why: rescueWhy,
    },
    {
      key: 'onboard',
      title: 'Never got started',
      colour: ACCENT,
      why: onboardWhy,
    },
    {
      key: 'quiet',
      title: 'Gone quiet',
      colour: TRIAL_COLOURS.live,
      why: 'Used it properly, then stopped for three days or more with time still left on the clock. Something specific went wrong; worth asking what.',
    },
    {
      key: 'cold_ending',
      title: 'Ending cold',
      colour: TRIAL_COLOURS.expired,
      why: 'Out of time with nothing behind them. One message, then let it go.',
    },
  ];
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function AdminTrials() {
  const queryClient = useQueryClient();
  const haptic = useHaptic();
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>(searchParams.get('status') || 'live');
  const [roleFilter, setRoleFilter] = useState<string>(searchParams.get('role') || 'all');
  const [engagementFilter, setEngagementFilter] = useState<string>(
    searchParams.get('engagement') || 'all'
  );
  const [selected, setSelected] = useState<TrialRow | null>(null);

  useEffect(() => {
    const params = new URLSearchParams();
    if (statusFilter !== 'live') params.set('status', statusFilter);
    if (roleFilter !== 'all') params.set('role', roleFilter);
    if (engagementFilter !== 'all') params.set('engagement', engagementFilter);
    setSearchParams(params, { replace: true });
  }, [statusFilter, roleFilter, engagementFilter, setSearchParams]);

  const [hiddenIds, setHiddenIds] = useState<Set<string>>(() => {
    return new Set(storageGetJSONSync<string[]>('admin-hidden-trial-users', []));
  });

  const {
    data: cohort,
    isLoading: cohortLoading,
    isFetching: cohortFetching,
    refetch: refetchCohort,
  } = useTrialCohort();
  const {
    data: insights,
    isFetching: insightsFetching,
    refetch: refetchInsights,
  } = useTrialInsights();
  const { data: cancelReasons } = useTrialCancelReasons();

  /*
    The headline rate comes from Stripe, not from profiles.trial_end.

    That column is written on only some signup paths, so anything derived from
    it measures a fraction of the cohort. It stays the source for per-trial
    BEHAVIOUR — active days, minutes, what they made — which Stripe cannot know.
  */
  const { data: stripeTrials, isFetching: stripeFetching } = useQuery<TrialConversion | null>({
    queryKey: ['admin-stripe-trial-conversion'],
    staleTime: 5 * 60 * 1000,
    queryFn: async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) return null;
      const { data, error } = await supabase.functions.invoke('admin-stripe-stats', {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      if (error) throw error;
      const payload = data as { trials?: TrialConversion } | null;
      return payload?.trials ?? null;
    },
  });

  /*
    Roles for the cohort, and nothing else.

    This page used to load every account in the database and then run seven
    batched queries across all of them — quotes, certificates, study sessions,
    a 30-day activity view, a seven-day event heatmap — to rebuild figures that
    `get_trial_cohort` already returns for the 185 accounts that matter. The
    only thing the RPC does not carry is `role`, so that is the only thing
    fetched here.
  */
  const cohortIds = useMemo(() => (cohort?.rows ?? []).map((r) => r.user_id), [cohort]);
  const { data: roles } = useQuery({
    queryKey: ['admin-trial-roles', cohortIds.length],
    enabled: cohortIds.length > 0,
    staleTime: 5 * 60 * 1000,
    queryFn: async () => {
      const rows = await batchedInQuery<{ id: string; role: string | null }>(
        'profiles',
        'id',
        cohortIds,
        'id, role'
      );
      return new Map((rows ?? []).map((r) => [r.id, r.role]));
    },
  });

  const isLoading = cohortLoading;
  const isRefreshing = cohortFetching || insightsFetching || stripeFetching;
  const refetch = async () => {
    await Promise.all([refetchCohort(), refetchInsights()]);
  };

  /*
    Stripe's cancelling trials, keyed by lower-cased email.

    Matching on email rather than `stripe_customer_id` because that column is
    not written on every signup path — the same reason the rest of the admin
    reconciliation matches on email.
  */
  const cancellingByEmail = useMemo(() => {
    const m = new Map<string, CancellingTrial>();
    (stripeTrials?.cancelling ?? []).forEach((c) => {
      if (c.email) m.set(c.email.toLowerCase(), c);
    });
    return m;
  }, [stripeTrials]);

  const contactsById = useMemo(() => {
    const m = new Map<string, { last_at: string; sends: number }>();
    (insights?.contacts ?? []).forEach((c) => m.set(c.user_id, c));
    return m;
  }, [insights]);

  /** Every trial, scored and annotated once so nothing below recomputes it. */
  const rows = useMemo<TrialRow[]>(() => {
    const today = new Date();
    const todayKey = format(today, 'yyyy-MM-dd');
    return (cohort?.rows ?? []).map((r) => {
      const score = calculateTrialScore(r);
      const lenDays = trialLengthDays(r);
      const contact = contactsById.get(r.user_id);
      const cancel = r.email ? cancellingByEmail.get(r.email.toLowerCase()) : undefined;
      return {
        ...r,
        score,
        engaged: isEngagedTrial(score),
        produced: r.reports_made + r.quotes_made,
        lenDays,
        // Live trials are partway through; a finished one is on its last day.
        dayOf:
          r.status === 'live'
            ? Math.max(1, Math.min(lenDays, lenDays - r.days_remaining + 1))
            : lenDays,
        role: roles?.get(r.user_id) ?? null,
        quietDays: r.last_seen ? differenceInCalendarDays(today, parseISO(r.last_seen)) : null,
        lastContactAt: contact?.last_at ?? null,
        contactedToday: contact ? contact.last_at.slice(0, 10) === todayKey : false,
        cancelling: !!cancel,
        cancelledAt: cancel?.cancelledAt
          ? new Date(cancel.cancelledAt * 1000).toISOString()
          : null,
      };
    });
  }, [cohort, roles, contactsById, cancellingByEmail]);

  const liveRows = useMemo(
    () => rows.filter((r) => r.status === 'live' && !hiddenIds.has(r.user_id)),
    [rows, hiddenIds]
  );

  /** The queue, grouped and ordered by how soon each trial runs out. */
  const chase = useMemo(() => {
    const out: Record<ChaseKey, TrialRow[]> = {
      cancelling: [],
      rescue: [],
      onboard: [],
      quiet: [],
      cold_ending: [],
    };
    liveRows.forEach((r) => {
      const key = classify(r);
      if (key) out[key].push(r);
    });
    (Object.keys(out) as ChaseKey[]).forEach((k) => {
      out[k].sort((a, b) => a.days_remaining - b.days_remaining || b.score - a.score);
    });
    return out;
  }, [liveRows]);

  const chaseTotal = useMemo(
    () => Object.values(chase).reduce((t, list) => t + list.length, 0),
    [chase]
  );

  /* Six figures about the live cohort — all things you can act on today, all
     from one source, so no two of them can disagree. */
  const ops = useMemo(() => {
    const live = liveRows;
    const endingSoon = live.filter((r) => r.days_remaining <= 3);
    const uncontacted = live.filter((r) => !r.lastContactAt);
    const engaged = live.filter((r) => r.engaged);
    const silent = live.filter((r) => (r.quietDays ?? 99) >= 3);
    const nothingMade = live.filter((r) => r.produced === 0);
    return {
      live: live.length,
      endingSoon: endingSoon.length,
      uncontacted: uncontacted.length,
      engaged: engaged.length,
      silent: silent.length,
      nothingMade: nothingMade.length,
      cancelling: live.filter((r) => r.cancelling).length,
    };
  }, [liveRows]);

  /** Weekly starts, for the tile sparklines. */
  const startedSeries = useMemo(
    () => (insights?.weekly ?? []).slice(-12).map((w) => w.started),
    [insights]
  );
  const weekDelta = useMemo(() => {
    const w = insights?.weekly ?? [];
    if (w.length < 2) return null;
    return w[w.length - 1].started - w[w.length - 2].started;
  }, [insights]);

  /** Day-1 return rate, the headline of the curve panel. */
  const dayOne = useMemo(() => {
    const c = returnCurve(insights?.curve ?? []);
    return c.find((p) => p.day === 1) ?? null;
  }, [insights]);

  const bandRows = useMemo(() => bandRates(insights?.bands ?? []), [insights]);

  /*
    The blurbs on the chase queue quote figures; those figures come from here so
    they cannot drift away from the charts further down the page.
  */
  const groups = useMemo(() => {
    const plotted = bandRows.filter((b) => b.decided >= BAND_MIN_DECIDED && b.cvr != null);
    const engagedBand = Math.floor(TRIAL_ENGAGED_AT / 15);
    const spread = (rows: typeof plotted): [number, number] | null => {
      if (rows.length === 0) return null;
      const v = rows.map((r) => r.cvr as number);
      return [Math.min(...v), Math.max(...v)];
    };
    const returned = insights?.returned ?? null;
    const notUsing = cancelReasons?.reasons.find((r) => r.reason === 'not_using');
    return chaseGroups({
      engagedRange: spread(plotted.filter((b) => b.band >= engagedBand)),
      belowRange: spread(plotted.filter((b) => b.band < engagedBand)),
      neverReturnedPct:
        returned && returned.n > 0 ? (returned.never_returned / returned.n) * 100 : null,
      notUsingPct:
        notUsing && cancelReasons && cancelReasons.total > 0
          ? (notUsing.n / cancelReasons.total) * 100
          : null,
    });
  }, [bandRows, insights, cancelReasons]);

  // -------------------------------------------------------------------------
  // Mutations
  // -------------------------------------------------------------------------

  const nudge = useMutation({
    mutationFn: async (userId: string) => {
      const { data, error } = await supabase.functions.invoke('send-trial-reminder', {
        body: { userId, type: 'reminder' },
      });
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      haptic.success();
      toast.success('Reminder sent');
      queryClient.invalidateQueries({ queryKey: ['admin-trial-insights'] });
    },
    onError: (e) => toast.error(`Could not send: ${(e as Error).message}`),
  });

  const nudgeAll = useMutation({
    mutationFn: async (userIds: string[]) => {
      const { data, error } = await supabase.functions.invoke('send-trial-reminder-bulk', {
        body: { userIds, type: 'reminder', batchSize: 5, batchDelayMs: 10000 },
      });
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      haptic.success();
      const sent = data?.sent ?? 0;
      const skipped = data?.skipped ?? 0;
      toast.success(
        skipped > 0 ? `${sent} sent, ${skipped} already had one today` : `${sent} reminders sent`
      );
      queryClient.invalidateQueries({ queryKey: ['admin-trial-insights'] });
    },
    onError: (e) => toast.error(`Could not send: ${(e as Error).message}`),
  });

  /*
    There is deliberately no "extend trial" action on this page.

    The button that used to sit on every row wrote `profiles.trial_end` and
    nothing else. That column gates no access anywhere in the app — entitlement
    comes from `subscribed`, which check-subscription sets from Stripe and
    RevenueCat — so extending moved a date on this report and the person was
    still billed on the original schedule. Every live trial is card-on-file
    (22 Stripe, 18 App Store, 8 Play Store), so a real extension has to be made
    against the subscription itself, and for the store trials it cannot be made
    by us at all. For the store ones it was actively harmful: sync_expired_trials
    keys off trial_end, so pushing the date out kept app access open after Apple
    or Google had already ended the trial.
  */

  const hide = (userId: string) => {
    const next = new Set(hiddenIds).add(userId);
    storageSetJSONSync('admin-hidden-trial-users', [...next]);
    setHiddenIds(next);
    haptic.light();
    toast.success('Hidden from the queue');
    setSelected(null);
  };

  const restoreHidden = () => {
    storageRemoveSync('admin-hidden-trial-users');
    setHiddenIds(new Set());
    toast.success('Hidden trials restored');
  };

  /*
    Copy the addresses rather than send from here.

    Every link this app has put in an outbound email has had to be checked by
    hand at least once; for a group of four people it is faster and safer to
    paste the addresses into a real mail client and write to them properly than
    to fire a templated reminder.
  */
  const copyEmails = (list: TrialRow[]) => {
    const emails = list.map((r) => r.email).filter(Boolean).join(', ');
    if (!emails) {
      toast.error('No email addresses on these accounts');
      return;
    }
    navigator.clipboard.writeText(emails).then(
      () => toast.success(`${list.length} address${list.length === 1 ? '' : 'es'} copied`),
      () => toast.error('Could not copy')
    );
  };

  // -------------------------------------------------------------------------
  // The full list, filtered
  // -------------------------------------------------------------------------

  const listed = useMemo(() => {
    let out = rows.filter((r) => !hiddenIds.has(r.user_id));
    if (statusFilter !== 'all') out = out.filter((r) => r.status === statusFilter);
    if (roleFilter !== 'all') out = out.filter((r) => r.role === roleFilter);
    if (engagementFilter === 'engaged') out = out.filter((r) => r.engaged);
    if (engagementFilter === 'quiet') out = out.filter((r) => !r.engaged);
    if (search) {
      const q = search.toLowerCase();
      out = out.filter(
        (r) =>
          r.full_name?.toLowerCase().includes(q) || r.email?.toLowerCase().includes(q)
      );
    }
    return out.sort((a, b) => {
      // Live first and by urgency; everything decided by when it ended.
      if (a.status === 'live' && b.status === 'live') {
        return a.days_remaining - b.days_remaining || b.score - a.score;
      }
      if (a.status === 'live') return -1;
      if (b.status === 'live') return 1;
      return b.trial_end.localeCompare(a.trial_end);
    });
  }, [rows, hiddenIds, statusFilter, roleFilter, engagementFilter, search]);

  const exportCSV = () => {
    if (listed.length === 0) return;
    const headers = [
      'Name',
      'Email',
      'Role',
      'Trial start',
      'Trial end',
      'Status',
      'Days remaining',
      'Score',
      'Active days',
      'Minutes',
      'Made',
      'Last seen',
      'Last contacted',
    ];
    const body = listed.map((r) => [
      r.full_name ?? '',
      r.email ?? '',
      r.role ?? '',
      r.trial_start.slice(0, 10),
      r.trial_end.slice(0, 10),
      r.status,
      String(r.days_remaining),
      String(r.score),
      String(r.active_days),
      String(Math.round(r.seconds_tracked / 60)),
      String(r.produced),
      r.last_seen ? r.last_seen.slice(0, 10) : '',
      r.lastContactAt ? r.lastContactAt.slice(0, 10) : '',
    ]);
    const esc = (v: string) =>
      /[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v;
    const csv = [headers, ...body].map((r) => r.map(esc).join(',')).join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = `elec-mate-trials-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // -------------------------------------------------------------------------
  // Detail sheet data
  // -------------------------------------------------------------------------

  const { data: detail, isLoading: detailLoading } = useQuery({
    queryKey: ['admin-trial-detail', selected?.user_id],
    enabled: !!selected?.user_id,
    staleTime: 30_000,
    queryFn: async () => {
      if (!selected) return { activity: [] as ActivityItem[] };
      const id = selected.user_id;
      const [quotes, reports, events] = await Promise.all([
        supabase
          .from('quotes')
          .select('id, quote_number, total, status, created_at')
          .eq('user_id', id)
          .order('created_at', { ascending: false })
          .limit(40),
        supabase
          .from('reports')
          .select('id, report_id, created_at')
          .eq('user_id', id)
          .order('created_at', { ascending: false })
          .limit(40),
        supabase
          .from('user_events')
          .select('id, event_type, event_name, page_path, created_at')
          .eq('user_id', id)
          .in('event_type', ['login', 'page_view', 'feature_use', 'session_start'])
          .order('created_at', { ascending: false })
          .limit(60),
      ]);

      const activity: ActivityItem[] = [];
      quotes.data?.forEach((q) =>
        activity.push({
          id: `q-${q.id}`,
          action_type: 'quote',
          action_detail: `Quote #${q.quote_number}`,
          extra_info: q.total ? `£${parseFloat(String(q.total)).toFixed(2)}` : null,
          created_at: q.created_at,
        })
      );
      reports.data?.forEach((r) =>
        activity.push({
          id: `r-${r.id}`,
          action_type: 'report',
          action_detail: 'Created a certificate',
          extra_info: r.report_id,
          created_at: r.created_at,
        })
      );
      events.data?.forEach((e) =>
        activity.push({
          id: `e-${e.id}`,
          action_type: e.event_type,
          action_detail:
            e.event_type === 'feature_use'
              ? e.event_name || 'Used a feature'
              : e.event_type === 'page_view'
                ? 'Visited a page'
                : e.event_type === 'login'
                  ? 'Logged in'
                  : 'Opened the app',
          extra_info: e.page_path,
          created_at: e.created_at,
        })
      );
      activity.sort((a, b) => b.created_at.localeCompare(a.created_at));
      return { activity };
    },
  });

  // -------------------------------------------------------------------------
  // Pieces
  // -------------------------------------------------------------------------

  /** One person in the queue: who, why they are here, and what to do about it. */
  const chaseRow = (r: TrialRow, key: ChaseKey) => (
    <div
      key={r.user_id}
      className="flex min-h-[60px] items-center gap-3 border-t border-white/[0.08] py-2 lg:min-h-14"
    >
      <button
        onClick={() => setSelected(r)}
        className="flex min-w-0 flex-1 touch-manipulation items-center gap-3 text-left transition-opacity hover:opacity-80"
      >
        <RoundAvatar initials={getInitials(r.full_name || r.email || '?')} />
        <div className="min-w-0 flex-1">
          <div className="flex min-w-0 items-center gap-2">
            <span className="truncate text-[14px] font-medium leading-[18px] text-white">
              {r.full_name || r.email || 'Unknown'}
            </span>
            {r.produced > 0 && (
              <span
                className="shrink-0 rounded-full px-1.5 py-px text-[10px] font-semibold"
                style={{ background: 'rgba(25,158,112,0.16)', color: TRIAL_COLOURS.converted }}
              >
                {r.produced} made
              </span>
            )}
            {r.contactedToday && (
              <CheckCheck className="h-3.5 w-3.5 shrink-0" style={{ color: GOOD }} aria-label="Emailed today" />
            )}
          </div>
          <div className="mt-0.5 flex min-w-0 items-center gap-1.5 text-[12px] leading-4 text-white">
            <span className="truncate">{chaseReason(r, key)}</span>
            {sourceLabel(r.subscription_source) && (
              <span className="hidden shrink-0 rounded px-1 py-px text-[10px] font-medium text-white ring-1 ring-inset ring-white/[0.14] sm:inline">
                {sourceLabel(r.subscription_source)}
              </span>
            )}
          </div>
        </div>
      </button>

      <div className="flex shrink-0 items-center gap-1.5">
        {!r.contactedToday && (
          <button
            onClick={() => nudge.mutate(r.user_id)}
            disabled={nudge.isPending}
            className="flex h-11 touch-manipulation items-center gap-1.5 rounded-lg border border-white/[0.12] px-2.5 text-[12px] font-semibold text-white transition-colors hover:bg-white/[0.06] disabled:opacity-50 sm:h-9"
          >
            <MailPlus className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Nudge</span>
          </button>
        )}
      </div>
    </div>
  );

  /** One row of the full list. Denser than the queue: no actions, more facts. */
  const listRow = (r: TrialRow) => {
    const tone =
      r.status === 'converted'
        ? TRIAL_COLOURS.converted
        : r.status === 'expired'
          ? TRIAL_COLOURS.expired
          : TRIAL_COLOURS.live;
    return (
      <button
        key={r.user_id}
        onClick={() => setSelected(r)}
        className="flex min-h-[60px] w-full touch-manipulation items-center gap-3 border-t border-white/[0.08] text-left transition-colors hover:bg-white/[0.03] lg:min-h-14"
      >
        <RoundAvatar initials={getInitials(r.full_name || r.email || '?')} />
        <div className="min-w-0 flex-1">
          <div className="flex min-w-0 items-center gap-2">
            <span className="truncate text-[14px] font-medium leading-[18px] text-white">
              {r.full_name || r.email || 'Unknown'}
            </span>
            {r.produced > 0 && (
              <span
                className="shrink-0 rounded-full px-1.5 py-px text-[10px] font-semibold"
                style={{ background: 'rgba(25,158,112,0.16)', color: TRIAL_COLOURS.converted }}
              >
                {r.produced}
              </span>
            )}
          </div>
          <div className="mt-0.5 flex items-center gap-2 text-[12px] leading-4 text-white">
            {/* Progress through this trial's own window, not a rolling week. */}
            <span className="flex shrink-0 items-center gap-[3px]" aria-hidden>
              {Array.from({ length: Math.min(r.lenDays, 10) }, (_, i) => (
                <span
                  key={i}
                  className="h-1.5 w-1.5 rounded-full"
                  style={{
                    background:
                      i < r.active_days
                        ? r.engaged
                          ? TRIAL_COLOURS.converted
                          : TRIAL_COLOURS.live
                        : i < r.dayOf
                          ? 'rgba(255,255,255,0.18)'
                          : 'rgba(255,255,255,0.07)',
                  }}
                />
              ))}
            </span>
            <span className="truncate">
              {r.active_days} of {r.lenDays} days · {formatMins(r.seconds_tracked)}
              {r.last_seen ? ` · seen ${relativeTime(r.last_seen)}` : ''}
            </span>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <span className="hidden text-[12px] tabular-nums text-white sm:inline">{r.score}</span>
          <StateDot
            label={
              r.status === 'live'
                ? `${r.days_remaining}d`
                : r.status === 'converted'
                  ? 'Paid'
                  : 'Lapsed'
            }
            color={tone}
          />
        </div>
      </button>
    );
  };

  // -------------------------------------------------------------------------
  // Render
  // -------------------------------------------------------------------------

  const contact = insights?.contact ?? null;

  return (
    <PullToRefresh onRefresh={refetch}>
      <PageFrame className="space-y-5 sm:space-y-6">
        {/* Title row */}
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h1 className="text-[22px] font-semibold leading-7 tracking-[-0.02em] text-white lg:text-[26px] lg:leading-[30px]">
              Trials
            </h1>
            <div className="mt-0.5 flex items-center gap-2 text-[12px] text-white">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: GOOD }} />
              {ops.live} running now
              {chaseTotal > 0 && ` · ${chaseTotal} need you today`}
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2.5">
            <IconButton onClick={exportCSV} aria-label="Export the filtered list as CSV">
              <Download className="h-4 w-4" />
            </IconButton>
            <IconButton onClick={refetch} disabled={isRefreshing} aria-label="Refresh">
              <RefreshCw className={cn('h-4 w-4', isRefreshing && 'animate-spin')} />
            </IconButton>
          </div>
        </div>

        {/* The rate, and the intake behind it */}
        <Panel tone="accent">
          <div className="grid gap-5 lg:grid-cols-[340px_minmax(0,1fr)] lg:gap-x-10">
            <div className="flex min-w-0 flex-col gap-2 text-white">
              <div className="text-[13px] font-medium leading-4">Trial conversion</div>
              <div className="text-[44px] font-semibold leading-[46px] tracking-[-0.03em] lg:text-[56px] lg:leading-[56px]">
                {stripeTrials ? (
                  `${stripeTrials.conversionRate.toFixed(1)}%`
                ) : (
                  <span className="opacity-40">—</span>
                )}
              </div>
              <div className="text-[13px] leading-[18px]">
                {stripeTrials ? (
                  <>
                    {stripeTrials.billed} of {stripeTrials.ended} finished Stripe trials went on to
                    bill. {stripeTrials.live} still running and counted neither way.
                  </>
                ) : (
                  'Stripe is answering, usually 15 seconds…'
                )}
              </div>

              {stripeTrials && (
                <div className="mt-2">
                  <StackBar
                    segments={[
                      {
                        value: stripeTrials.stillPaying,
                        color: TRIAL_COLOURS.converted,
                        label: 'Still paying',
                      },
                      {
                        value: stripeTrials.convertedThenChurned,
                        color: TRIAL_COLOURS.live,
                        label: 'Converted, later left',
                      },
                      {
                        value: stripeTrials.neverBilled,
                        color: TRIAL_COLOURS.expired,
                        label: 'Never billed',
                      },
                    ]}
                  />
                  <ChartLegend
                    items={[
                      {
                        label: 'still paying',
                        colour: TRIAL_COLOURS.converted,
                        value: stripeTrials.stillPaying,
                      },
                      {
                        label: 'left later',
                        colour: TRIAL_COLOURS.live,
                        value: stripeTrials.convertedThenChurned,
                      },
                      {
                        label: 'never billed',
                        colour: TRIAL_COLOURS.expired,
                        value: stripeTrials.neverBilled,
                      },
                    ]}
                  />
                  <div className="mt-3 text-[11px] leading-4 text-white">
                    Stripe trials only. Subscribers who never took a trial, and store subscriptions,
                    carry no Stripe trial record.
                  </div>
                </div>
              )}
            </div>

            <div className="flex min-w-0 flex-col">
              <div className="flex items-baseline justify-between gap-3">
                <div className="text-[13px] font-semibold text-white">Trials started each week</div>
                {weekDelta != null && (
                  <Delta
                    dir={weekDelta > 0 ? 'up' : weekDelta < 0 ? 'down' : 'flat'}
                    tone={weekDelta > 0 ? 'good' : weekDelta < 0 ? 'bad' : 'neutral'}
                  >
                    {weekDelta > 0 ? '+' : ''}
                    {weekDelta} on last week
                  </Delta>
                )}
              </div>
              <div className="-mx-2 mt-1 lg:mx-0">
                <div className="hidden lg:block">
                  <WeeklyIntakeChart weekly={insights?.weekly ?? []} height={236} />
                </div>
                <div className="lg:hidden">
                  <WeeklyIntakeChart weekly={insights?.weekly ?? []} height={180} />
                </div>
              </div>
              <ChartLegend
                items={[
                  { label: 'converted', colour: TRIAL_COLOURS.converted },
                  { label: 'expired', colour: TRIAL_COLOURS.expired },
                  { label: 'still running', colour: TRIAL_COLOURS.live },
                ]}
              />
            </div>
          </div>
        </Panel>

        {/* Six figures about the live cohort */}
        <Panel padded={false} className="px-4 sm:px-5 lg:px-6">
          <div className="grid grid-cols-2 gap-x-4 lg:grid-cols-6 lg:gap-x-5 [&>*:nth-child(-n+4)]:border-b [&>*:nth-child(-n+4)]:border-white/[0.08] [&>*:nth-child(odd)]:border-r [&>*:nth-child(odd)]:border-white/[0.08] lg:[&>*:last-child]:border-r-0 lg:[&>*]:border-b-0 lg:[&>*]:border-r lg:[&>*]:border-white/[0.08]">
            <KpiTile
              label="Live trials"
              value={ops.live}
              definition="inside the window"
              viz={<Sparkline series={startedSeries} accent={TRIAL_COLOURS.live} />}
            />
            <KpiTile
              label="Ending in 3 days"
              value={ops.endingSoon}
              definition="decision imminent"
              onClick={() => setStatusFilter('live')}
            />
            <KpiTile
              label="Engaged now"
              value={ops.engaged}
              definition={`score ${TRIAL_ENGAGED_AT}+`}
              onClick={() => {
                setStatusFilter('live');
                setEngagementFilter('engaged');
              }}
            />
            <KpiTile
              label="Never contacted"
              value={ops.uncontacted}
              definition="no trial email at all"
            />
            <KpiTile
              label="Already cancelled"
              value={ops.cancelling}
              definition="auto-renew off, still on"
              delta={
                ops.cancelling > 0 ? (
                  <Delta dir="down" tone="bad">
                    act today
                  </Delta>
                ) : undefined
              }
            />
            <KpiTile label="Silent 3+ days" value={ops.silent} definition="no activity since" />
          </div>
        </Panel>

        {/* The queue */}
        <Panel>
          <SectionHead
            title="Needs you today"
            meta={
              chaseTotal === 0
                ? 'nothing outstanding'
                : `${chaseTotal} of ${ops.live} live trials`
            }
          />
          {/*
            Framing that took a query to establish and changes what you do here.

            Every live trial on the platform is card-on-file — Stripe, the App
            Store or Play — so nobody in this queue has to be persuaded to enter
            payment details. They convert automatically unless they cancel
            first, and 43.5% of finished Stripe trials do. The job on this page
            is stopping a cancellation, not closing a sale.
          */}
          <p className="m-0 mt-1 max-w-[85ch] text-[12px] leading-[17px] text-white">
            Every live trial already has a card or a store subscription attached — they bill
            automatically unless the person cancels first. This queue is about giving them a
            reason not to.
          </p>
          {isLoading ? (
            <div className="mt-3">
              <LoadingBlocks />
            </div>
          ) : chaseTotal === 0 ? (
            <div className="py-8 text-center text-[13px] text-white">
              No trial is ending soon, stalled on day one, or gone quiet. Nothing to chase.
            </div>
          ) : (
            <div className="mt-2 space-y-5">
              {groups.map((g) => {
                const list = chase[g.key];
                if (list.length === 0) return null;
                const sendable = list.filter((r) => !r.contactedToday);
                return (
                  <div key={g.key}>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                      <h3 className="m-0 flex items-center gap-2 text-[14px] font-semibold leading-5 text-white">
                        <span
                          className="h-2 w-2 shrink-0 rounded-[2px]"
                          style={{ background: g.colour }}
                        />
                        {g.title}
                        <span className="text-[12px] font-normal tabular-nums">{list.length}</span>
                      </h3>
                      <div className="flex shrink-0 items-center gap-3">
                        <button
                          onClick={() => copyEmails(list)}
                          className="inline-flex h-11 touch-manipulation items-center gap-1.5 text-[12px] font-semibold text-white transition-opacity hover:opacity-80 sm:h-8"
                        >
                          <Copy className="h-3.5 w-3.5" />
                          Copy emails
                        </button>
                        {sendable.length > 0 && (
                          <button
                            onClick={() => nudgeAll.mutate(sendable.map((r) => r.user_id))}
                            disabled={nudgeAll.isPending}
                            className="inline-flex h-11 touch-manipulation items-center gap-1.5 text-[12px] font-semibold transition-opacity hover:opacity-80 disabled:opacity-50 sm:h-8"
                            style={{ color: ACCENT }}
                          >
                            <MailPlus className="h-3.5 w-3.5" />
                            Nudge {sendable.length}
                          </button>
                        )}
                      </div>
                    </div>
                    <p className="m-0 mt-1 max-w-[70ch] text-[12px] leading-[17px] text-white">
                      {g.why}
                    </p>
                    <div className="mt-2">{list.map((r) => chaseRow(r, g.key))}</div>
                  </div>
                );
              })}
            </div>
          )}
        </Panel>

        {/* Why trials convert — one cohort, stated once, at the top */}
        <Panel>
          <SectionHead
            title="What the cohort says"
            meta={`${cohort?.rows.length ?? 0} trials we can measure activity for`}
          />
          <p className="m-0 mt-1 max-w-[85ch] text-[12px] leading-[17px] text-white">
            These are the accounts carrying a trial end date, which is the only set with in-app
            behaviour attached. Its own headline rate is not the business's — that is the Stripe
            figure above. What is valid here are the differences <em>within</em> the sample.
          </p>

          <div className="mt-4 grid gap-6 lg:grid-cols-2 lg:gap-8">
            <div className="min-w-0">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="m-0 text-[14px] font-semibold leading-5 text-white">
                  When they stop coming back
                </h3>
                {dayOne && (
                  <span className="shrink-0 text-[12px] tabular-nums text-white">
                    day 1: {dayOne.convertedPct?.toFixed(0)}% vs {dayOne.expiredPct?.toFixed(0)}%
                  </span>
                )}
              </div>
              <ReturnCurveChart curve={insights?.curve ?? []} height={228} />
              <ChartLegend
                items={[
                  { label: 'went on to pay', colour: TRIAL_COLOURS.converted },
                  { label: 'let it lapse', colour: TRIAL_COLOURS.expired },
                ]}
              />
              <p className="m-0 mt-2 max-w-[60ch] text-[12px] leading-[17px] text-white">
                Share of each group still opening the app on that day of their trial. Everyone is
                active on signup day, so the whole story is how fast each line falls — and it falls
                on day one.{' '}
                {insights?.returned && insights.returned.n > 0 && (
                  <>
                    Across the whole sample{' '}
                    <b className="font-semibold">
                      {insights.returned.never_returned} of {insights.returned.n}
                    </b>{' '}
                    trials (
                    {Math.round(
                      (insights.returned.never_returned / insights.returned.n) * 100
                    )}
                    %) never opened it again after the day they joined.{' '}
                  </>
                )}
                Getting somebody back for a second session is the single biggest thing this page can
                influence.
              </p>
            </div>

            <div className="min-w-0">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="m-0 text-[14px] font-semibold leading-5 text-white">
                  Conversion by trial score
                </h3>
                <span className="shrink-0 text-[12px] text-white">engaged at {TRIAL_ENGAGED_AT}+</span>
              </div>
              <ScoreBandChart bands={insights?.bands ?? []} engagedAt={TRIAL_ENGAGED_AT} height={228} />
              <ChartLegend
                items={[
                  { label: `score ${TRIAL_ENGAGED_AT}+`, colour: TRIAL_COLOURS.converted },
                  { label: 'below', colour: 'rgba(255,255,255,0.30)' },
                ]}
              />
              <p className="m-0 mt-2 max-w-[60ch] text-[12px] leading-[17px] text-white">
                The score every row on this page carries, banded, against what those trials did
                next. It separates: above 45 the rate roughly doubles and keeps climbing.{' '}
                {bandRows.length > 0 && (
                  <>
                    The plotted bands rest on{' '}
                    {bandRows
                      .filter((b) => b.decided >= BAND_MIN_DECIDED)
                      .reduce((t, b) => t + b.decided, 0)}{' '}
                    finished trials, so treat this as triage, not a forecast.
                    {bandRows.some((b) => b.decided > 0 && b.decided < BAND_MIN_DECIDED) && (
                      <>
                        {' '}
                        Bands with fewer than {BAND_MIN_DECIDED} finished trials are left off — at
                        that size one person moves the rate by tens of points.
                      </>
                    )}
                  </>
                )}
              </p>
            </div>
          </div>

          {/*
            An independent check on the return curve.

            The curve is behavioural — it watches what people did. This is what
            they SAID on the way out, from a different table filled by a
            different mechanism, and it lands in the same place: the top reason
            by a distance is that they never got going. Two sources agreeing is
            worth more than either alone, so it sits directly under the chart.
          */}
          {cancelReasons && cancelReasons.total > 0 && (
            <>
              <Hairline className="my-5" />
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                <h3 className="m-0 text-[14px] font-semibold leading-5 text-white">
                  What they say on the way out
                </h3>
                <span className="text-[12px] text-white">
                  {cancelReasons.total} cancellations · every subscriber, not only trials
                </span>
              </div>
              <div className="mt-3 space-y-2">
                {cancelReasons.reasons.slice(0, 6).map((r) => {
                  const pct = (r.n / cancelReasons.total) * 100;
                  const top = r.reason === 'not_using';
                  return (
                    <div key={r.reason} className="flex items-center gap-3">
                      <span className="w-[13rem] shrink-0 truncate text-[13px] text-white">
                        {CANCEL_REASON_LABELS[r.reason] ?? r.reason}
                      </span>
                      <span
                        className="h-1.5 min-w-[2px] rounded-sm"
                        style={{
                          width: `${Math.max(pct, 1)}%`,
                          background: top ? TRIAL_COLOURS.expired : 'rgba(255,255,255,0.30)',
                        }}
                      />
                      <span className="shrink-0 text-[12px] tabular-nums text-white">
                        {pct.toFixed(0)}%
                        <span className="text-white/60"> · {r.n}</span>
                      </span>
                    </div>
                  );
                })}
              </div>
              <p className="m-0 mt-3 max-w-[85ch] text-[12px] leading-[17px] text-white">
                Different table, different mechanism, same answer as the curve: people leave because
                they never got going, not because of price. Price is{' '}
                {(() => {
                  const te = cancelReasons.reasons.find((r) => r.reason === 'too_expensive');
                  return te ? `${((te.n / cancelReasons.total) * 100).toFixed(0)}%` : 'a minority';
                })()}
                . That is the case for spending the effort on the first two days rather than on
                discounts.
              </p>
            </>
          )}

          {contact && (
            <>
              <Hairline className="my-5" />
              <div className="grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-4">
                <Fig
                  value={`${contact.live_contacted} of ${contact.live_total}`}
                  label="Live trials we have"
                  sub="emailed at least once"
                />
                <Fig
                  value={contact.contacted}
                  label="Ever contacted"
                  sub={`of ${contact.n} trials`}
                />
                {insights?.ttfv && (
                  <Fig
                    value={`${Math.round((insights.ttfv.acted_converted / Math.max(1, insights.ttfv.n_converted)) * 100)}%`}
                    label="Converters who took"
                    sub="a first real action"
                  />
                )}
                {insights?.ttfv && (
                  <Fig
                    value={`${Math.round((insights.ttfv.acted_expired / Math.max(1, insights.ttfv.n_expired)) * 100)}%`}
                    label="Lapsed trials who took"
                    sub="a first real action"
                  />
                )}
              </div>
              <p className="m-0 mt-3 max-w-[85ch] text-[12px] leading-[17px] text-white">
                Contact figures are reach, not effect. The trials nobody has emailed are mostly the
                ones that started this week, so comparing their conversion rate to everyone else's
                would be comparing recency, not the email.
              </p>
            </>
          )}
        </Panel>

        {/* Everyone */}
        <Panel>
          <SectionHead title="All trials" meta={`${listed.length} shown`} />

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Segmented<string>
              options={[
                { key: 'live', label: 'Live', count: rows.filter((r) => r.status === 'live').length },
                {
                  key: 'converted',
                  label: 'Converted',
                  count: rows.filter((r) => r.status === 'converted').length,
                },
                {
                  key: 'expired',
                  label: 'Lapsed',
                  count: rows.filter((r) => r.status === 'expired').length,
                },
                { key: 'all', label: 'All', count: rows.length },
              ]}
              value={statusFilter}
              onChange={setStatusFilter}
            />

            <select
              value={engagementFilter}
              onChange={(e) => setEngagementFilter(e.target.value)}
              aria-label="Filter by engagement"
              className="h-11 touch-manipulation rounded-[10px] border border-white/[0.12] bg-white/[0.04] px-3 text-[12px] font-medium text-white [color-scheme:dark] focus:border-elec-yellow focus:outline-none sm:h-9"
            >
              <option value="all">Any engagement</option>
              <option value="engaged">Engaged</option>
              <option value="quiet">Quiet</option>
            </select>

            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              aria-label="Filter by role"
              className="h-11 touch-manipulation rounded-[10px] border border-white/[0.12] bg-white/[0.04] px-3 text-[12px] font-medium capitalize text-white [color-scheme:dark] focus:border-elec-yellow focus:outline-none sm:h-9"
            >
              <option value="all">Any role</option>
              <option value="apprentice">Apprentice</option>
              <option value="electrician">Electrician</option>
              <option value="employer">Employer</option>
            </select>

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name or email…"
              aria-label="Search trials"
              className="h-11 min-w-0 flex-1 touch-manipulation rounded-[10px] border border-white/[0.12] bg-white/[0.04] px-3 text-[12px] text-white caret-elec-yellow placeholder:text-white/40 focus:border-elec-yellow focus:outline-none sm:h-9 sm:max-w-[16rem]"
            />

            {hiddenIds.size > 0 && (
              <button
                onClick={restoreHidden}
                className="flex h-11 shrink-0 touch-manipulation items-center gap-1.5 rounded-[10px] border border-white/[0.12] px-3 text-[12px] font-medium text-white hover:bg-white/[0.06] sm:h-9"
              >
                <Eye className="h-3.5 w-3.5" />
                Restore {hiddenIds.size}
              </button>
            )}
          </div>

          <div className="mt-3">
            {isLoading ? (
              <LoadingBlocks />
            ) : listed.length === 0 ? (
              <EmptyState
                title="Nothing matches"
                description="No trial fits these filters."
              />
            ) : (
              listed.map(listRow)
            )}
          </div>
        </Panel>

        {/* One trial, in full */}
        <Sheet open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
          <SheetContent
            side="bottom"
            className="h-[85vh] rounded-t-2xl border-white/[0.06] bg-[hsl(0_0%_8%)] p-0"
          >
            <div className="flex h-full flex-col">
              <div className="flex justify-center pb-2 pt-3">
                <div className="h-1 w-10 rounded-full bg-white/20" />
              </div>

              <SheetHeader className="border-b border-white/[0.08] px-5 pb-4">
                <SheetTitle className="flex items-center gap-3">
                  <RoundAvatar initials={getInitials(selected?.full_name || selected?.email || '?')} />
                  <div className="min-w-0 text-left">
                    <div className="truncate text-[15px] font-semibold text-white">
                      {selected?.full_name || selected?.email || 'Unknown'}
                    </div>
                    <div className="truncate text-[12px] font-normal text-white">
                      {selected?.email}
                      {selected?.role ? ` · ${selected.role}` : ''}
                    </div>
                  </div>
                </SheetTitle>
              </SheetHeader>

              <div className="flex-1 space-y-5 overflow-y-auto p-4 sm:p-5 lg:grid lg:auto-rows-min lg:grid-cols-2 lg:items-start lg:gap-5 lg:space-y-0">
                {selected && (
                  <>
                    {/* The window, and how far through it they got */}
                    <section className="min-w-0">
                      <SectionHead
                        title="This trial"
                        meta={
                          selected.status === 'live'
                            ? daysLeftLabel(selected)
                            : selected.status === 'converted'
                              ? 'Converted'
                              : 'Lapsed'
                        }
                      />
                      <div className="mt-2 flex items-center gap-[5px]" aria-hidden>
                        {Array.from({ length: Math.min(selected.lenDays, 14) }, (_, i) => (
                          <div
                            key={i}
                            className="h-2 flex-1 rounded-full"
                            style={{
                              background:
                                i < selected.active_days
                                  ? selected.engaged
                                    ? TRIAL_COLOURS.converted
                                    : TRIAL_COLOURS.live
                                  : 'rgba(255,255,255,0.08)',
                            }}
                          />
                        ))}
                      </div>
                      <div className="mt-2 text-[12px] text-white">
                        Active on {selected.active_days} of the {selected.lenDays} trial days ·{' '}
                        {format(parseISO(selected.trial_start), 'd MMM')} to{' '}
                        {format(parseISO(selected.trial_end), 'd MMM yyyy')}
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-4">
                        <Fig value={selected.produced} label="Made" sub="certs + quotes" />
                        <Fig
                          value={formatMins(selected.seconds_tracked)}
                          label="In the app"
                          sub="during the trial"
                        />
                        <Fig value={selected.sessions} label="Sessions" sub="app opens" />
                        <Fig value={selected.page_views} label="Pages" sub="screens seen" />
                      </div>

                      <Hairline className="my-4" />
                      <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-[12px] text-white">
                        <span>
                          Last seen{' '}
                          <b className="font-semibold">{relativeTime(selected.last_seen)}</b>
                        </span>
                        <span>
                          Last emailed{' '}
                          <b className="font-semibold">
                            {selected.lastContactAt ? relativeTime(selected.lastContactAt) : 'never'}
                          </b>
                        </span>
                        {selected.subscription_source && (
                          <span>
                            Billed via{' '}
                            <b className="font-semibold">
                              {selected.subscription_source.replace('_', ' ')}
                            </b>
                          </span>
                        )}
                      </div>
                    </section>

                    {/* What to do about it */}
                    <section className="min-w-0">
                      <SectionHead title="Actions" />
                      <div className="mt-2 space-y-2.5">
                        {selected.contactedToday ? (
                          <div
                            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl text-[13px] font-semibold"
                            style={{
                              border: '1px solid rgba(12,163,12,0.3)',
                              background: 'rgba(12,163,12,0.1)',
                              color: GOOD,
                            }}
                          >
                            <CheckCheck className="h-4 w-4" />
                            Already emailed today
                          </div>
                        ) : (
                          <button
                            onClick={() => nudge.mutate(selected.user_id)}
                            disabled={nudge.isPending}
                            className="flex h-12 w-full touch-manipulation items-center justify-center gap-2 rounded-xl bg-elec-yellow text-[13px] font-semibold text-black transition-opacity hover:opacity-90 disabled:opacity-60"
                          >
                            <MailPlus className="h-4 w-4" />
                            {nudge.isPending ? 'Sending…' : 'Send the trial reminder'}
                          </button>
                        )}
                        <div className="flex gap-2.5">
                          <button
                            onClick={() => copyEmails([selected])}
                            className="flex h-11 flex-1 touch-manipulation items-center justify-center gap-1.5 rounded-xl border border-white/[0.12] text-[12px] font-semibold text-white transition-colors hover:bg-white/[0.06]"
                          >
                            <Copy className="h-3.5 w-3.5" />
                            Copy email
                          </button>
                          <button
                            onClick={() => hide(selected.user_id)}
                            className="flex h-11 flex-1 touch-manipulation items-center justify-center gap-1.5 rounded-xl border border-white/[0.12] text-[12px] font-medium text-white transition-colors hover:bg-white/[0.06]"
                          >
                            <XCircle className="h-3.5 w-3.5" />
                            Hide
                          </button>
                        </div>
                      </div>

                      {/* How the score was reached, in its own components */}
                      <div className="mt-5">
                        <SectionHead
                          title="How that score is made up"
                          meta={`${selected.score} of 88 · ${selected.engaged ? 'engaged' : 'quiet'}`}
                        />
                        <div className="mt-2 space-y-3">
                          {trialScoreParts(selected).map((part) => (
                            <div key={part.label}>
                              <div className="flex items-baseline justify-between gap-3">
                                <span className="text-[13px] text-white">{part.label}</span>
                                <span className="shrink-0 text-[12px] font-semibold tabular-nums text-white">
                                  {part.points.toFixed(0)}
                                  <span className="font-normal"> / {part.max}</span>
                                </span>
                              </div>
                              <div
                                className="mt-1.5 h-1.5 w-full rounded-sm"
                                style={{ background: 'rgba(255,255,255,0.06)' }}
                              >
                                <div
                                  className="h-full"
                                  style={{
                                    width: `${Math.max((part.points / part.max) * 100, 1)}%`,
                                    background:
                                      part.points > 0
                                        ? TRIAL_COLOURS.live
                                        : 'rgba(255,255,255,0.12)',
                                    borderRadius: '2px 4px 4px 2px',
                                  }}
                                />
                              </div>
                              <div className="mt-1 text-[11px] text-white">{part.detail}</div>
                            </div>
                          ))}
                        </div>
                        <p className="m-0 mt-3 text-[11px] leading-4 text-white">
                          Engaged at {TRIAL_ENGAGED_AT} or above. On the finished trials, that band
                          and the ones above it convert at roughly double the rate below.
                        </p>
                      </div>
                    </section>

                    {/* Everything they did, marked against the window */}
                    <section className="min-w-0 lg:col-span-2">
                      <SectionHead
                        title="What they did"
                        meta={detail?.activity.length ? `${detail.activity.length} actions` : undefined}
                      />
                      {detailLoading ? (
                        <div className="mt-2">
                          <LoadingBlocks />
                        </div>
                      ) : !detail?.activity.length ? (
                        <div className="py-6 text-center text-[13px] text-white">
                          Nothing tracked on this account.
                        </div>
                      ) : (
                        <div className="mt-2 max-h-[360px] overflow-y-auto">
                          {Object.entries(
                            detail.activity.reduce<Record<string, ActivityItem[]>>((acc, a) => {
                              const day = a.created_at.slice(0, 10);
                              (acc[day] ||= []).push(a);
                              return acc;
                            }, {})
                          ).map(([day, items]) => {
                            const inTrial =
                              day >= selected.trial_start.slice(0, 10) &&
                              day <= selected.trial_end.slice(0, 10);
                            return (
                              <div key={day} className="border-t border-white/[0.08] first:border-t-0">
                                <div className="flex items-center justify-between gap-3 py-2">
                                  <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-white">
                                    {format(parseISO(day), 'EEE d MMM')}
                                  </span>
                                  <span className="flex items-center gap-2 text-[11px] text-white">
                                    {items.length} action{items.length === 1 ? '' : 's'}
                                    {inTrial && (
                                      <span
                                        className="rounded-full px-1.5 py-px text-[10px] font-semibold text-black"
                                        style={{ background: ACCENT }}
                                      >
                                        in trial
                                      </span>
                                    )}
                                  </span>
                                </div>
                                {items.map((a) => (
                                  <div key={a.id} className="flex items-start gap-3 py-1.5">
                                    <span
                                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                                      style={{
                                        background: inTrial ? ACCENT : 'rgba(255,255,255,0.25)',
                                      }}
                                    />
                                    <div className="min-w-0 flex-1">
                                      <div className="truncate text-[13px] text-white">
                                        {a.action_detail}
                                      </div>
                                      {a.extra_info && (
                                        <div className="truncate text-[11.5px] text-white">
                                          {a.extra_info}
                                        </div>
                                      )}
                                    </div>
                                    <span className="shrink-0 text-[11px] tabular-nums text-white">
                                      {format(parseISO(a.created_at), 'HH:mm')}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </section>

                    <section className="min-w-0 lg:col-span-2">
                      <Hairline />
                      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-[11px] text-white">
                        <span>
                          Account <span className="font-mono">{selected.user_id}</span>
                        </span>
                        <span>
                          Signed up{' '}
                          {formatDistanceToNow(parseISO(selected.trial_start), { addSuffix: true })}
                        </span>
                      </div>
                    </section>
                  </>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </PageFrame>
    </PullToRefresh>
  );
}
