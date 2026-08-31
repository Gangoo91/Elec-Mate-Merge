import { useState, useMemo, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { storageGetJSONSync, storageSetJSONSync, storageRemoveSync } from '@/utils/storage';
import { supabase } from '@/integrations/supabase/client';
import { batchedInQuery } from '@/utils/batchedQuery';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { RefreshCw, Mail, MailPlus, Download, Plus, XCircle, CheckCheck, Eye } from 'lucide-react';
import {
  format,
  formatDistanceToNow,
  parseISO,
  startOfDay,
  addDays,
  formatDistance,
} from 'date-fns';
import PullToRefresh from '@/components/admin/PullToRefresh';
import { useAdminUsersBase } from '@/hooks/useAdminUsersBase';
import { useHaptic } from '@/hooks/useHaptic';
import { toast } from 'sonner';
import { calculateEngagementScore } from '@/utils/adminUtils';
import {
  PageFrame,
  PageHero,
  SectionHeader,
  ListCard,
  ListCardHeader,
  ListBody,
  ListRow,
  Avatar,
  Pill,
  Dot,
  Eyebrow,
  IconButton,
  EmptyState,
  LoadingBlocks,
  type Tone,
} from '@/components/admin/editorial';
import {
  useTrialCohort,
  calculateTrialScore,
  isEngagedTrial,
  trialLengthDays,
  trialScoreParts,
  TRIAL_ENGAGED_AT,
} from '@/hooks/useTrialCohort';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface TrialUser {
  id: string;
  full_name: string;
  username: string;
  role: string | null;
  subscribed: boolean;
  created_at: string;
  signup_date: string;
  trial_ends: string;
  trial_status: 'active' | 'ending_today' | 'ending_tomorrow' | 'expired' | 'subscribed';
  days_remaining: number;
  email?: string | null;
  last_sign_in_at?: string | null;
  points?: number;
  streak?: number;
  last_active_date?: string | null;
  study_sessions?: number;
  quotes_count?: number;
  eic_count?: number;
  engagement_score?: number;
  /** Certificates + quotes created inside the trial window. */
  produced?: number;
  first_action_at?: string;
  first_action_type?: string;
  time_to_first_value?: number;
  hidden?: boolean;
  login_count?: number;
  page_view_count?: number;
  feature_use_count?: number;
  total_seconds_tracked?: number;
  unique_pages_visited?: number;
  active_days?: number;
  trial_end?: string | null;
  daily_heatmap?: number[];
}

interface ActivityItem {
  id: string;
  action_type:
    | 'quote'
    | 'eic'
    | 'study'
    | 'time_track'
    | 'login'
    | 'points'
    | 'profile'
    | 'streak'
    | 'page_view'
    | 'session'
    | 'feature';
  action_detail: string;
  extra_info?: string;
  created_at: string;
}

interface UserEventSummary {
  login_count: number;
  page_view_count: number;
  feature_use_count: number;
  session_count: number;
  active_days: number;
  total_seconds_tracked: number;
  unique_pages_visited: number;
  last_activity: string | null;
}

interface BaseUser {
  id: string;
  full_name: string;
  username: string;
  role: string | null;
  subscribed: boolean;
  created_at: string;
  last_sign_in: string | null;
  email: string | null;
  trial_end?: string | null;
}

interface ActivityRow {
  user_id: string;
  points: number;
  streak: number;
  last_active_date: string | null;
}

interface EventSummaryRow {
  user_id: string;
  login_count: number;
  page_view_count: number;
  feature_use_count: number;
  session_count: number;
  active_days: number;
  total_seconds_tracked: number;
  unique_pages_visited: number;
  last_activity: string | null;
}

interface QuoteRow {
  id: string;
  quote_number: string;
  total: string;
  status: string;
  created_at: string;
}

interface EicRow {
  id: string;
  installation_address: string | null;
  status: string;
  created_at: string;
}

interface StudySessionRow {
  id: string;
  course_slug: string | null;
  activity: string | null;
  resource_type: string | null;
  duration: number | null;
  created_at: string;
}

interface TimeTrackRow {
  id: string;
  activity_type: string | null;
  duration: number | null;
  course_slug: string | null;
  created_at: string;
}

interface UserEventRow {
  id: string;
  event_type: string;
  event_name: string | null;
  page_path: string | null;
  created_at: string;
}

interface TrialStats {
  total_trials: number;
  ending_today: number;
  ending_tomorrow: number;
  expired: number;
  active: number;
  converted: number;
  conversion_rate: string;
  hot_leads: number;
  warm_leads: number;
  cold_leads: number;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const MAX_EXPIRED_DAYS = 365;
const FOUNDER_CUTOFF_DATE = new Date('2026-01-26T00:00:00Z');
/*
 * Same bands as `getScoreColor`, so a "hot lead" here and a green ring on the
 * Users page mean the same thing. They were 15 and 5 against an unbounded
 * score — thresholds from a scale that no longer existed.
 */
const ENGAGEMENT_HOT = 55;
const ENGAGEMENT_WARM = 25;

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

function getInitials(name?: string | null): string {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function formatTimeSpent(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600) return `${Math.round(seconds / 60)}m`;
  const hours = Math.floor(seconds / 3600);
  const mins = Math.round((seconds % 3600) / 60);
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}

/*
  Two bands, because the data only supports two.

  Hot / warm / cold measured 24.0% / 12.2% / 12.9% conversion across the 136
  decided trials — warm and cold are the same population wearing different
  labels, and a band that does not separate anything is just noise on a row.
  The single real cut is at 45, where conversion roughly doubles.
*/
function getEngagementLevel(score: number = 0): 'engaged' | 'quiet' {
  return isEngagedTrial(score) ? 'engaged' : 'quiet';
}

function getStatusText(user: TrialUser): string {
  if (user.trial_status === 'subscribed') return 'Subscribed';
  if (user.trial_status === 'expired') return 'Expired';
  if (user.days_remaining === 0) return 'Ends today';
  if (user.days_remaining === 1) return '1d left';
  return `${user.days_remaining}d left`;
}

function getStatusTone(user: TrialUser): Tone {
  if (user.trial_status === 'subscribed') return 'emerald';
  if (user.trial_status === 'expired') return 'red';
  if (user.trial_status === 'ending_today') return 'red';
  if (user.trial_status === 'ending_tomorrow') return 'orange';
  if (user.days_remaining <= 3) return 'amber';
  return 'blue';
}

function ActivityHeatmap({ counts }: { counts: number[] }) {
  const getColor = (n: number) => {
    if (n === 0) return 'bg-white/[0.08]';
    if (n <= 3) return 'bg-emerald-500/30';
    if (n <= 10) return 'bg-emerald-500/60';
    return 'bg-emerald-500';
  };

  return (
    <div className="flex items-center gap-0.5" title="7-day activity">
      {counts.map((c, i) => (
        <div key={i} className={`w-1.5 h-1.5 rounded-[2px] ${getColor(c)}`} />
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/* Validated dark-surface categorical steps — same set as the Revenue page:
     node scripts/validate_palette.js "#3987E5,#E66767,#199E70" \
       --mode dark --surface "#1C1C1C"
   Converted / expired / live are three outcomes, so three categorical slots in
   published order. `stage` reuses slot 1 because the funnel bars are one
   series, not four. */
const TRIAL_COLOURS = {
  converted: '#199E70',
  expired: '#E66767',
  live: '#3987E5',
  stage: '#3987E5',
} as const;

/** Proportional bar, 2px surface gaps between segments, hover on each. */
function StackedBar({
  segments,
}: {
  segments: Array<{ key: string; label: string; value: number; fill: string }>;
}) {
  const total = segments.reduce((t, x) => t + x.value, 0);
  if (total <= 0) return null;
  const shown = segments.filter((x) => x.value > 0);
  return (
    <div
      className="flex w-full rounded-full"
      style={{ height: 10, gap: 2 }}
      role="img"
      aria-label={shown
        .map((x) => `${x.label} ${((x.value / total) * 100).toFixed(0)}%`)
        .join(', ')}
    >
      {shown.map((x, i) => {
        const pct = (x.value / total) * 100;
        return (
          <div
            key={x.key}
            title={`${x.label}: ${x.value} (${pct.toFixed(1)}%)`}
            style={{
              width: `calc(${pct}% - ${(2 * (shown.length - 1)) / shown.length}px)`,
              background: x.fill,
              borderTopLeftRadius: i === 0 ? 999 : 2,
              borderBottomLeftRadius: i === 0 ? 999 : 2,
              borderTopRightRadius: i === shown.length - 1 ? 999 : 2,
              borderBottomRightRadius: i === shown.length - 1 ? 999 : 2,
            }}
          />
        );
      })}
    </div>
  );
}

/** Square at the baseline, 4px rounded at the data end. */
function Meter({ pct, fill }: { pct: number; fill: string }) {
  return (
    <div className="h-1.5 w-full rounded-sm" style={{ background: 'rgba(255,255,255,0.06)' }}>
      <div
        className="h-full"
        style={{ width: `${Math.max(pct, 1)}%`, background: fill, borderRadius: '2px 4px 4px 2px' }}
      />
    </div>
  );
}

interface TrialBehaviour {
  matched: number;
  returned: number;
  produced: number;
  returned_billed: number;
  produced_billed: number;
  no_produce_total: number;
  no_produce_billed: number;
}

interface TrialConversion {
  behaviour: TrialBehaviour | null;
  live: number;
  ended: number;
  billed: number;
  stillPaying: number;
  convertedThenChurned: number;
  neverBilled: number;
  conversionRate: number;
  retainedRate: number;
}

export default function AdminTrials() {
  const { data: cohort } = useTrialCohort();
  /* Per-user, trial-window metrics keyed by id, so the list below can be scored
     on what each person did during their own trial. */
  const cohortByUser = useMemo(
    () => new Map((cohort?.rows ?? []).map((r) => [r.user_id, r])),
    [cohort]
  );
  /*
    Trial conversion comes from Stripe, not from profiles.trial_end.

    That column is written on only some signup paths: it holds 158 rows against
    455 trials that have actually ended in Stripe, so anything derived from it
    was measuring a third of the cohort. `useTrialCohort` is still the source
    for per-trial BEHAVIOUR (active days, minutes, what they created), which
    Stripe cannot know — but the headline rate has to come from billing.
  */
  const { data: stripeTrials } = useQuery<TrialConversion | null>({
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
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>(searchParams.get('status') || 'all');
  const [roleFilter, setRoleFilter] = useState<string>(searchParams.get('role') || 'all');
  const [engagementFilter, setEngagementFilter] = useState<string>(
    searchParams.get('engagement') || 'all'
  );
  const [selectedUser, setSelectedUser] = useState<TrialUser | null>(null);
  const queryClient = useQueryClient();
  const haptic = useHaptic();

  useEffect(() => {
    const params = new URLSearchParams();
    if (statusFilter !== 'all') params.set('status', statusFilter);
    if (roleFilter !== 'all') params.set('role', roleFilter);
    if (engagementFilter !== 'all') params.set('engagement', engagementFilter);
    setSearchParams(params, { replace: true });
  }, [statusFilter, roleFilter, engagementFilter, setSearchParams]);

  const [hiddenUserIds, setHiddenUserIds] = useState<Set<string>>(() => {
    const saved = storageGetJSONSync<string[]>('admin-hidden-trial-users', []);
    return new Set(saved);
  });

  const {
    data: baseUsers,
    isLoading: baseLoading,
    isFetching: baseFetching,
    refetch: refetchBase,
  } = useAdminUsersBase();

  const {
    data: trialUsers,
    isLoading: enrichmentLoading,
    isFetching: enrichmentFetching,
    refetch: refetchEnrichment,
  } = useQuery({
    // cohortByUser.size is in the key so the list re-derives once the
    // trial-window metrics land, rather than caching a set of zero scores.
    queryKey: ['admin-trial-users', statusFilter, roleFilter, cohortByUser.size],
    queryFn: async () => {
      const users = baseUsers || [];
      const userIds = users.map((u: BaseUser) => u.id);

      const authDataMap = new Map<string, { last_sign_in: string | null; email: string | null }>();
      users.forEach((u: BaseUser) => {
        authDataMap.set(u.id, { last_sign_in: u.last_sign_in, email: u.email });
      });

      const sevenDaysAgo = new Date(Date.now() - 7 * 86_400_000).toISOString();

      const [
        activityData,
        quotesData,
        eicData,
        studyData,
        eventSummaryData,
        profilesData,
        heatmapEventsData,
      ] = await Promise.all([
        batchedInQuery(
          'user_activity',
          'user_id',
          userIds,
          'user_id, points, streak, last_active_date'
        ),
        batchedInQuery('quotes', 'user_id', userIds, 'user_id'),
        batchedInQuery('eic_schedules', 'user_id', userIds, 'user_id'),
        batchedInQuery('study_sessions', 'user_id', userIds, 'user_id'),
        batchedInQuery('user_activity_summary', 'user_id', userIds, '*'),
        batchedInQuery('profiles', 'id', userIds, 'id, trial_end'),
        batchedInQuery<{ user_id: string; created_at: string }>(
          'user_events',
          'user_id',
          userIds,
          'user_id, created_at',
          (q: any) => q.gte('created_at', sevenDaysAgo)
        ),
      ]);

      const trialEndsAtMap = new Map<string, string | null>();
      profilesData?.forEach((p: { id: string; trial_end: string | null }) => {
        trialEndsAtMap.set(p.id, p.trial_end);
      });

      const activityMap = new Map<
        string,
        { points: number; streak: number; last_active_date: string | null }
      >();
      activityData?.forEach((a: ActivityRow) => {
        activityMap.set(a.user_id, {
          points: a.points || 0,
          streak: a.streak || 0,
          last_active_date: a.last_active_date,
        });
      });

      const quotesCountMap = new Map<string, number>();
      quotesData?.forEach((q: { user_id: string }) => {
        quotesCountMap.set(q.user_id, (quotesCountMap.get(q.user_id) || 0) + 1);
      });

      const eicCountMap = new Map<string, number>();
      eicData?.forEach((e: { user_id: string }) => {
        eicCountMap.set(e.user_id, (eicCountMap.get(e.user_id) || 0) + 1);
      });

      const studyCountMap = new Map<string, number>();
      studyData?.forEach((s: { user_id: string }) => {
        studyCountMap.set(s.user_id, (studyCountMap.get(s.user_id) || 0) + 1);
      });

      const eventSummaryMap = new Map<string, UserEventSummary>();
      eventSummaryData?.forEach((e: EventSummaryRow) => {
        eventSummaryMap.set(e.user_id, {
          login_count: e.login_count || 0,
          page_view_count: e.page_view_count || 0,
          feature_use_count: e.feature_use_count || 0,
          session_count: e.session_count || 0,
          active_days: e.active_days || 0,
          total_seconds_tracked: e.total_seconds_tracked || 0,
          unique_pages_visited: e.unique_pages_visited || 0,
          last_activity: e.last_activity,
        });
      });

      const heatmapMap = new Map<string, number[]>();
      const todayStart = startOfDay(new Date());
      heatmapEventsData?.forEach((ev: { user_id: string; created_at: string }) => {
        const dayIndex =
          6 -
          Math.floor(
            (todayStart.getTime() - startOfDay(new Date(ev.created_at)).getTime()) / 86_400_000
          );
        if (dayIndex < 0 || dayIndex > 6) return;
        let arr = heatmapMap.get(ev.user_id);
        if (!arr) {
          arr = [0, 0, 0, 0, 0, 0, 0];
          heatmapMap.set(ev.user_id, arr);
        }
        arr[dayIndex]++;
      });

      const today = startOfDay(new Date());
      const maxExpiredDate = addDays(today, -MAX_EXPIRED_DAYS);

      return (
        users
          /*
           * A trial is somebody with a trial. Nothing else.
           *
           * This used to fall back to `addDays(createdAt, 7)` whenever a profile
           * had no `trial_end`, which invented a trial window for 1,323 of 1,482
           * accounts and swept every old free signup onto the page as an
           * "expired trial". The result: 1,369 trials reported against 159 real
           * ones, 386 "conversions" that were simply every paying user, and a
           * "28.2% CVR" that was paying ÷ all users rather than trial ÷ paid.
           *
           * No `trial_end`, no trial.
           */
          .filter((user: BaseUser) => {
            const createdAt = parseISO(user.created_at);
            if (createdAt < FOUNDER_CUTOFF_DATE) return false;
            const trialEndsAtRaw = trialEndsAtMap.get(user.id);
            if (!trialEndsAtRaw) return false;
            const trialEndsDate = startOfDay(parseISO(trialEndsAtRaw));
            return user.subscribed || trialEndsDate >= maxExpiredDate;
          })
          .map((user: BaseUser) => {
            const createdAt = parseISO(user.created_at);
            const trialEndsAtRaw = trialEndsAtMap.get(user.id);
            const trialEnds = trialEndsAtRaw ? parseISO(trialEndsAtRaw) : addDays(createdAt, 7);
            const trialEndsDate = startOfDay(trialEnds);
            const daysRemaining = Math.ceil(
              (trialEndsDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
            );

            /*
             * Days remaining decides first, `subscribed` second.
             *
             * App Store and Play Store trials carry `subscribed = true` for the
             * whole trial period, so testing `subscribed` first classified all
             * 23 live store trials as already converted and the Active count
             * read zero. Someone whose trial has not ended yet is on trial,
             * whatever the billing flag says; conversion is only meaningful once
             * the window has closed.
             */
            let trialStatus: TrialUser['trial_status'] = 'active';
            if (daysRemaining < 0) {
              trialStatus = user.subscribed ? 'subscribed' : 'expired';
            } else if (daysRemaining === 0) {
              trialStatus = 'ending_today';
            } else if (daysRemaining === 1) {
              trialStatus = 'ending_tomorrow';
            }

            const activity = activityMap.get(user.id) || {
              points: 0,
              streak: 0,
              last_active_date: null,
            };
            const authData = authDataMap.get(user.id) || { last_sign_in: null, email: null };
            const eventSummary = eventSummaryMap.get(user.id);
            const points = activity.points;
            const streak = activity.streak;
            const quotesCount = quotesCountMap.get(user.id) || 0;
            const eicCount = eicCountMap.get(user.id) || 0;
            const studySessions = studyCountMap.get(user.id) || 0;

            const timeSpentMinutes = Math.floor((eventSummary?.total_seconds_tracked || 0) / 60);
            const timeBonus = Math.min(30, Math.floor(timeSpentMinutes * 0.5));
            const pageViewBonus = Math.min(20, eventSummary?.unique_pages_visited || 0);
            const loginBonus = Math.min(10, (eventSummary?.login_count || 0) * 2);
            const featureBonus = (eventSummary?.feature_use_count || 0) * 3;

            /*
             * One engagement score, shared with the rest of admin.
             *
             * This page had its own formula, and it was unbounded: `points`,
             * `streak * 5`, `studySessions * 3`, `quotesCount * 8`,
             * `eicCount * 10` and `feature_use_count * 3` all ran without a cap,
             * so a user with ten EICRs collected 100 from that term alone. Set
             * against a HOT threshold of 15 — lower than the time bonus alone
             * can reach — it classified anyone who spent half an hour on the app
             * as a hot lead. Hence 21 hot, 2 warm, 0 cold.
             *
             * `calculateEngagementScore` is bounded 0–100 and calibrated against
             * the real 30-day distribution, and `getConversionTone` further down
             * this very file already used it. Two scores for one user, on one
             * page, is worse than either.
             */
            /*
             * Scored on the trial's OWN window, not a rolling 30 days.
             *
             * `eventSummary` comes from user_activity_summary, which is defined
             * as `WHERE created_at > now() - 30 days`. The cohort here runs from
             * April, so every trial older than a month arrived with zeroes and
             * rendered as "Cold 0" — not because those people did nothing, but
             * because the view cannot see back that far. `get_trial_cohort`
             * counts each trial between its own signup and trial_end, so an
             * April trial is scored on the same basis as an August one.
             */
            const win = cohortByUser.get(user.id);
            const engagementScore = win
              ? calculateTrialScore(win)
              : calculateEngagementScore({
                  login_count: eventSummary?.login_count || 0,
                  page_view_count: eventSummary?.page_view_count || 0,
                  total_seconds_tracked: eventSummary?.total_seconds_tracked || 0,
                  feature_use_count: eventSummary?.feature_use_count || 0,
                  active_days: eventSummary?.active_days || 0,
                  unique_pages_visited: eventSummary?.unique_pages_visited || 0,
                });

            return {
              id: user.id,
              full_name: user.full_name,
              username: user.username,
              role: user.role,
              subscribed: user.subscribed,
              created_at: user.created_at,
              email: authData.email,
              last_sign_in_at: authData.last_sign_in,
              signup_date: format(createdAt, 'yyyy-MM-dd'),
              trial_ends: format(trialEnds, 'yyyy-MM-dd'),
              trial_status: trialStatus,
              days_remaining: Math.max(0, daysRemaining),
              points,
              streak,
              last_active_date:
                eventSummary?.last_activity || activity.last_active_date || authData.last_sign_in,
              study_sessions: studySessions,
              quotes_count: quotesCount,
              eic_count: eicCount,
              engagement_score: engagementScore,
              login_count: eventSummary?.login_count || 0,
              page_view_count: eventSummary?.page_view_count || 0,
              feature_use_count: win?.feature_uses ?? eventSummary?.feature_use_count ?? 0,
              total_seconds_tracked:
                win?.seconds_tracked ?? eventSummary?.total_seconds_tracked ?? 0,
              unique_pages_visited: eventSummary?.unique_pages_visited || 0,
              active_days: win?.active_days ?? eventSummary?.active_days ?? 0,
              // What they actually produced during the trial — the strongest
              // predictor of conversion on this page (19.1% vs 12.4%).
              produced: (win?.reports_made ?? 0) + (win?.quotes_made ?? 0),
              trial_end: trialEndsAtRaw || null,
              daily_heatmap: heatmapMap.get(user.id) || [0, 0, 0, 0, 0, 0, 0],
            } as TrialUser;
          })
      );
    },
    enabled: !!baseUsers,
    staleTime: 30 * 1000,
    refetchInterval: 60 * 1000,
  });

  const isLoading = baseLoading || enrichmentLoading;
  const isRefreshing = baseFetching || enrichmentFetching;
  const refetch = async () => {
    await refetchBase();
    await refetchEnrichment();
  };

  const { data: todayEmailSends } = useQuery({
    queryKey: ['admin-email-sends-today'],
    queryFn: async () => {
      const today = new Date().toISOString().split('T')[0];
      const { data, error } = await supabase
        .from('trial_email_sends')
        .select('user_id, email_type, sent_at, success')
        .eq('sent_date', today)
        .eq('success', true);

      if (error) {
        console.error('Error fetching email sends:', error);
        return new Set<string>();
      }

      return new Set((data || []).map((d) => d.user_id));
    },
    staleTime: 30 * 1000,
    refetchInterval: 60 * 1000,
  });

  const emailedTodayUserIds = todayEmailSends || new Set<string>();

  const stats = useMemo<TrialStats>(() => {
    if (!trialUsers) {
      return {
        total_trials: 0,
        ending_today: 0,
        ending_tomorrow: 0,
        expired: 0,
        active: 0,
        converted: 0,
        conversion_rate: '0',
        hot_leads: 0,
        warm_leads: 0,
        cold_leads: 0,
      };
    }

    /*
     * Split on `trial_status`, not the billing flag.
     *
     * `!u.subscribed` put every live App/Play store trial in the converted
     * bucket, because those carry `subscribed = true` for the whole trial.
     * Status already encodes the distinction correctly, so both sides of the
     * split and the lead-heat counts below now agree with the list.
     */
    const converted = trialUsers.filter((u) => u.trial_status === 'subscribed');
    const stillTrialling = trialUsers.filter((u) => u.trial_status !== 'subscribed');

    const activeTrials = stillTrialling.filter((u) => u.trial_status !== 'expired');
    const hotLeads = activeTrials.filter((u) => (u.engagement_score || 0) >= ENGAGEMENT_HOT).length;
    const warmLeads = activeTrials.filter(
      (u) =>
        (u.engagement_score || 0) >= ENGAGEMENT_WARM && (u.engagement_score || 0) < ENGAGEMENT_HOT
    ).length;
    const coldLeads = activeTrials.filter(
      (u) => (u.engagement_score || 0) < ENGAGEMENT_WARM
    ).length;

    return {
      total_trials: stillTrialling.length,
      ending_today: stillTrialling.filter((u) => u.trial_status === 'ending_today').length,
      ending_tomorrow: stillTrialling.filter((u) => u.trial_status === 'ending_tomorrow').length,
      expired: stillTrialling.filter((u) => u.trial_status === 'expired').length,
      active: stillTrialling.filter((u) => u.trial_status === 'active').length,
      converted: converted.length,
      /*
       * Of trials that have FINISHED, how many stayed.
       *
       * Dividing by every trial including the ones still running understates
       * the rate — a trial that has three days left has not failed to convert
       * yet. Denominator is decided trials only.
       */
      conversion_rate: (() => {
        const decided =
          converted.length + stillTrialling.filter((u) => u.trial_status === 'expired').length;
        return decided > 0 ? ((converted.length / decided) * 100).toFixed(1) : '0';
      })(),
      hot_leads: hotLeads,
      warm_leads: warmLeads,
      cold_leads: coldLeads,
    };
  }, [trialUsers]);

  const groupedByDay = useMemo(() => {
    if (!trialUsers) return {};

    let filtered =
      statusFilter === 'subscribed'
        ? trialUsers.filter((u) => u.subscribed && !hiddenUserIds.has(u.id))
        : trialUsers.filter((u) => !u.subscribed && !hiddenUserIds.has(u.id));

    if (statusFilter !== 'all' && statusFilter !== 'subscribed') {
      filtered = filtered.filter((u) => u.trial_status === statusFilter);
    }

    if (roleFilter !== 'all') {
      filtered = filtered.filter((u) => u.role === roleFilter);
    }

    if (engagementFilter !== 'all') {
      filtered = filtered.filter((u) => {
        const score = u.engagement_score || 0;
        if (engagementFilter === 'hot') return isEngagedTrial(score);
        if (engagementFilter === 'warm') return !isEngagedTrial(score);
        if (engagementFilter === 'cold') return score < ENGAGEMENT_WARM;
        return true;
      });
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        (u) =>
          u.full_name?.toLowerCase().includes(searchLower) ||
          u.username?.toLowerCase().includes(searchLower)
      );
    }

    const groups: Record<string, TrialUser[]> = {};
    filtered.forEach((user) => {
      const date = user.trial_ends;
      if (!groups[date]) groups[date] = [];
      groups[date].push(user);
    });

    const sortedEntries = Object.entries(groups)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, users]) => [
        date,
        users.sort((a, b) => (b.engagement_score || 0) - (a.engagement_score || 0)),
      ]);

    return Object.fromEntries(sortedEntries);
  }, [trialUsers, statusFilter, roleFilter, engagementFilter, search, hiddenUserIds]);

  const flatUsers = useMemo(
    () => Object.values(groupedByDay).flat() as TrialUser[],
    [groupedByDay]
  );

  // Bucket by expiry window
  const bucketedUsers = useMemo(() => {
    const today: TrialUser[] = [];
    const tomorrow: TrialUser[] = [];
    const thisWeek: TrialUser[] = [];
    const later: TrialUser[] = [];
    const expired: TrialUser[] = [];

    flatUsers.forEach((u) => {
      if (u.trial_status === 'expired') {
        expired.push(u);
      } else if (u.trial_status === 'ending_today') {
        today.push(u);
      } else if (u.trial_status === 'ending_tomorrow') {
        tomorrow.push(u);
      } else if (u.days_remaining <= 7) {
        thisWeek.push(u);
      } else {
        later.push(u);
      }
    });

    return { today, tomorrow, thisWeek, later, expired };
  }, [flatUsers]);

  const { data: userActivityData, isLoading: activityLoading } = useQuery({
    queryKey: ['admin-user-activity', selectedUser?.id],
    queryFn: async () => {
      if (!selectedUser?.id) return { activities: [], firstAction: null, scoreBreakdown: null };

      const activities: ActivityItem[] = [];

      const { data: userActivityRecord } = await supabase
        .from('user_activity')
        .select('*')
        .eq('user_id', selectedUser.id)
        .maybeSingle();

      const { data: eventSummary } = await supabase
        .from('user_activity_summary')
        .select('*')
        .eq('user_id', selectedUser.id)
        .maybeSingle();

      /*
       * The breakdown has to be the shared score's own components, or the
       * "why" contradicts the number. This was a second copy of the old
       * unbounded formula, so the detail panel and the list disagreed about
       * the same person. These five weights are exactly what
       * `calculateEngagementScore` sums, and they cap at 100 between them.
       */
      const timeSpentMinutes = Math.floor((eventSummary?.total_seconds_tracked || 0) / 60);
      const timeBonus = Math.round(Math.min(30, timeSpentMinutes / 9));
      const pageViewBonus = Math.round(
        Math.min(15, (eventSummary?.unique_pages_visited || 0) * 0.5)
      );
      const loginBonus = Math.round(Math.min(20, (eventSummary?.login_count || 0) * 2));
      const featureBonus = Math.round(Math.min(25, (eventSummary?.feature_use_count || 0) * 4));
      const activeDaysBonus = Math.round(Math.min(10, (eventSummary?.active_days || 0) * 1.5));

      const scoreBreakdown = {
        points: userActivityRecord?.points || 0,
        streak: userActivityRecord?.streak || 0,
        streakBonus: (userActivityRecord?.streak || 0) * 5,
        studySessions: 0,
        studyBonus: 0,
        quotes: 0,
        quotesBonus: 0,
        eics: 0,
        eicsBonus: 0,
        loginCount: eventSummary?.login_count || 0,
        loginBonus,
        pageViews: eventSummary?.unique_pages_visited || 0,
        pageViewBonus,
        timeSpentMinutes,
        timeBonus,
        featureUseCount: eventSummary?.feature_use_count || 0,
        featureBonus,
        activeDaysBonus,
        totalSecondsTracked: eventSummary?.total_seconds_tracked || 0,
        activeDays: eventSummary?.active_days || 0,
        lastActivity: eventSummary?.last_activity,
        total: 0,
      };

      if (userActivityRecord?.points && userActivityRecord.points > 0) {
        activities.push({
          id: `points-${selectedUser.id}`,
          action_type: 'points',
          action_detail: `Earned ${userActivityRecord.points} points`,
          extra_info: userActivityRecord.last_active_date
            ? `Last active: ${format(parseISO(userActivityRecord.last_active_date), 'dd MMM')}`
            : undefined,
          created_at:
            userActivityRecord.updated_at ||
            userActivityRecord.last_active_date ||
            selectedUser.created_at,
        });
      }

      if (userActivityRecord?.streak && userActivityRecord.streak > 0) {
        activities.push({
          id: `streak-${selectedUser.id}`,
          action_type: 'streak',
          action_detail: `${userActivityRecord.streak} day streak`,
          extra_info: `+${userActivityRecord.streak * 5} bonus points`,
          created_at: userActivityRecord.last_active_date || selectedUser.created_at,
        });
      }

      const { data: quotes } = await supabase
        .from('quotes')
        .select('id, quote_number, total, status, created_at')
        .eq('user_id', selectedUser.id)
        .order('created_at', { ascending: false });

      scoreBreakdown.quotes = quotes?.length || 0;
      scoreBreakdown.quotesBonus = scoreBreakdown.quotes * 8;

      quotes?.forEach((q: QuoteRow) => {
        activities.push({
          id: `quote-${q.id}`,
          action_type: 'quote',
          action_detail: `Created ${q.status === 'approved' ? 'invoice' : 'quote'} #${q.quote_number}`,
          extra_info: `\u00A3${parseFloat(q.total).toFixed(2)}`,
          created_at: q.created_at,
        });
      });

      const { data: eics } = await supabase
        .from('eic_schedules')
        .select('id, installation_address, status, created_at')
        .eq('user_id', selectedUser.id)
        .order('created_at', { ascending: false });

      scoreBreakdown.eics = eics?.length || 0;
      scoreBreakdown.eicsBonus = scoreBreakdown.eics * 10;

      eics?.forEach((e: EicRow) => {
        activities.push({
          id: `eic-${e.id}`,
          action_type: 'eic',
          action_detail: 'Created EIC certificate',
          extra_info: e.installation_address?.substring(0, 30) || 'No address',
          created_at: e.created_at,
        });
      });

      const { data: sessions } = await supabase
        .from('study_sessions')
        .select('id, course_slug, activity, resource_type, duration, created_at')
        .eq('user_id', selectedUser.id)
        .order('created_at', { ascending: false });

      scoreBreakdown.studySessions = sessions?.length || 0;
      scoreBreakdown.studyBonus = scoreBreakdown.studySessions * 3;

      sessions?.forEach((s: StudySessionRow) => {
        activities.push({
          id: `study-${s.id}`,
          action_type: 'study',
          action_detail: s.activity || s.resource_type || 'Study session',
          extra_info: s.course_slug ? `Course: ${s.course_slug}` : undefined,
          created_at: s.created_at,
        });
      });

      const { data: timeTracks } = await supabase
        .from('time_tracking_sessions')
        .select('id, activity_type, duration, course_slug, created_at')
        .eq('user_id', selectedUser.id)
        .order('created_at', { ascending: false });

      timeTracks?.forEach((t: TimeTrackRow) => {
        activities.push({
          id: `time-${t.id}`,
          action_type: 'time_track',
          action_detail: `Logged ${t.duration || 0} mins`,
          extra_info: t.activity_type || t.course_slug || undefined,
          created_at: t.created_at,
        });
      });

      const { data: userEvents } = await supabase
        .from('user_events')
        .select('id, event_type, event_name, page_path, created_at')
        .eq('user_id', selectedUser.id)
        .in('event_type', ['login', 'page_view', 'feature_use', 'session_start'])
        .order('created_at', { ascending: false })
        .limit(50);

      userEvents?.forEach((e: UserEventRow) => {
        if (e.event_type === 'login') {
          activities.push({
            id: `event-${e.id}`,
            action_type: 'login',
            action_detail: 'Logged in',
            extra_info: e.page_path,
            created_at: e.created_at,
          });
        } else if (e.event_type === 'page_view') {
          activities.push({
            id: `event-${e.id}`,
            action_type: 'page_view',
            action_detail: 'Visited page',
            extra_info: e.page_path,
            created_at: e.created_at,
          });
        } else if (e.event_type === 'feature_use') {
          activities.push({
            id: `event-${e.id}`,
            action_type: 'feature',
            action_detail: e.event_name || 'Used feature',
            extra_info: e.page_path,
            created_at: e.created_at,
          });
        } else if (e.event_type === 'session_start') {
          activities.push({
            id: `event-${e.id}`,
            action_type: 'session',
            action_detail: 'Started session',
            extra_info: e.page_path,
            created_at: e.created_at,
          });
        }
      });

      /*
       * The five components of the shared score, and only those.
       *
       * `points`, `streakBonus`, `studyBonus`, `quotesBonus` and `eicsBonus`
       * are not part of `calculateEngagementScore` — adding them here made the
       * detail panel's total exceed the score shown on the row for the same
       * person, sometimes by hundreds. They stay in the object because the
       * panel lists them as context; they no longer inflate the total.
       */
      scoreBreakdown.total = Math.min(
        100,
        scoreBreakdown.timeBonus +
          scoreBreakdown.featureBonus +
          scoreBreakdown.loginBonus +
          scoreBreakdown.pageViewBonus +
          scoreBreakdown.activeDaysBonus
      );

      const sortedActivities = activities.sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );

      const realActivities = activities.filter(
        (a) => !['points', 'streak'].includes(a.action_type)
      );
      const firstAction =
        realActivities.length > 0
          ? realActivities.reduce((oldest, curr) =>
              new Date(curr.created_at) < new Date(oldest.created_at) ? curr : oldest
            )
          : null;

      return { activities: sortedActivities, firstAction, scoreBreakdown };
    },
    enabled: !!selectedUser?.id,
    staleTime: 30 * 1000,
  });

  const userActivity = userActivityData?.activities || [];
  const firstAction = userActivityData?.firstAction;
  const scoreBreakdown = userActivityData?.scoreBreakdown;

  const timeToFirstValue = useMemo(() => {
    if (!selectedUser?.created_at || !firstAction?.created_at) return null;

    const signupTime = new Date(selectedUser.created_at).getTime();
    const firstActionTime = new Date(firstAction.created_at).getTime();
    const diffMinutes = Math.round((firstActionTime - signupTime) / (1000 * 60));

    if (diffMinutes < 60) {
      return `${diffMinutes} min${diffMinutes !== 1 ? 's' : ''}`;
    } else if (diffMinutes < 1440) {
      const hours = Math.round(diffMinutes / 60);
      return `${hours} hour${hours !== 1 ? 's' : ''}`;
    } else {
      const days = Math.round(diffMinutes / 1440);
      return `${days} day${days !== 1 ? 's' : ''}`;
    }
  }, [selectedUser?.created_at, firstAction?.created_at]);

  const hideUserMutation = useMutation({
    mutationFn: async (userId: string) => {
      const newHidden = new Set(hiddenUserIds).add(userId);
      storageSetJSONSync('admin-hidden-trial-users', [...newHidden]);
      return userId;
    },
    onSuccess: (userId) => {
      haptic.light();
      setHiddenUserIds((prev) => new Set(prev).add(userId));
      toast.success('User removed from list');
      setSelectedUser(null);
    },
  });

  const unhideAllUsers = () => {
    storageRemoveSync('admin-hidden-trial-users');
    setHiddenUserIds(new Set());
    toast.success('All hidden users restored');
  };

  const sendReminderMutation = useMutation({
    mutationFn: async ({ userId, type }: { userId: string; type: 'reminder' | 'offer' }) => {
      const { data, error } = await supabase.functions.invoke('send-trial-reminder', {
        body: { userId, type },
      });
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      haptic.success();
      toast.success('Email sent successfully');
      queryClient.invalidateQueries({ queryKey: ['admin-trial-users'] });
      queryClient.invalidateQueries({ queryKey: ['admin-email-sends-today'] });
    },
    onError: (error) => {
      toast.error(`Failed to send email: ${error.message}`);
    },
  });

  const bulkEmailMutation = useMutation({
    mutationFn: async ({ userIds, type }: { userIds: string[]; type: 'reminder' | 'offer' }) => {
      const { data, error } = await supabase.functions.invoke('send-trial-reminder-bulk', {
        body: { userIds, type, batchSize: 5, batchDelayMs: 10000 },
      });
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      haptic.success();
      const sent = data?.sent || 0;
      const skipped = data?.skipped || 0;
      if (skipped > 0) {
        toast.success(`${sent} emails sent, ${skipped} skipped (already sent today)`);
      } else {
        toast.success(`Emails sent to ${sent} users`);
      }
      queryClient.invalidateQueries({ queryKey: ['admin-trial-users'] });
      queryClient.invalidateQueries({ queryKey: ['admin-email-sends-today'] });
    },
    onError: (error) => {
      toast.error(`Failed to send emails: ${error.message}`);
    },
  });

  const quickExtendMutation = useMutation({
    mutationFn: async (userId: string) => {
      const user = trialUsers?.find((u) => u.id === userId);
      const currentEnd = user?.trial_end
        ? parseISO(user.trial_end)
        : user?.created_at
          ? addDays(parseISO(user.created_at), 7)
          : new Date();
      const newEnd = addDays(currentEnd < new Date() ? new Date() : currentEnd, 7);
      const { error } = await supabase
        .from('profiles')
        .update({ trial_end: newEnd.toISOString() })
        .eq('id', userId);
      if (error) throw error;
      return { userId, newEnd };
    },
    onSuccess: ({ newEnd }) => {
      haptic.success();
      toast.success(`Trial extended to ${format(newEnd, 'dd MMM yyyy')}`);
      queryClient.invalidateQueries({ queryKey: ['admin-trial-users'] });
      queryClient.invalidateQueries({ queryKey: ['admin-users-base'] });
    },
    onError: (error) => {
      toast.error(`Failed to extend trial: ${(error as Error).message}`);
    },
  });

  const funnelStats = useMemo(() => {
    if (!trialUsers) return { started: 0, engaged: 0, featureUsed: 0, subscribed: 0 };
    const started = trialUsers.length;
    const engaged = trialUsers.filter(
      (u) => (u.login_count || 0) > 0 || !!u.last_sign_in_at
    ).length;
    const featureUsed = trialUsers.filter((u) => (u.feature_use_count || 0) > 0).length;
    /*
     * Converted means the trial ended and they stayed, so it has to read
     * `trial_status`, not the raw `subscribed` flag — a live store trial
     * carries `subscribed = true` throughout and would otherwise be counted
     * as a conversion before it has finished.
     */
    const subscribed = trialUsers.filter((u) => u.trial_status === 'subscribed').length;
    return { started, engaged, featureUsed, subscribed };
  }, [trialUsers]);

  const getConversionTone = (user: TrialUser): Tone => {
    const engScore = calculateEngagementScore({
      login_count: user.login_count || 0,
      page_view_count: user.page_view_count || 0,
      total_seconds_tracked: user.total_seconds_tracked || 0,
      feature_use_count: user.feature_use_count || 0,
      active_days: user.active_days || 0,
      unique_pages_visited: user.unique_pages_visited || 0,
    });
    const days = user.days_remaining;
    const expired = user.trial_status === 'expired';

    if (expired || engScore < 25) return 'red';
    if (engScore > 55 && days > 2) return 'green';
    return 'amber';
  };

  const exportCSV = () => {
    const allFiltered = Object.values(groupedByDay).flat();
    if (allFiltered.length === 0) return;

    const headers = [
      'Name',
      'Email',
      'Role',
      'Trial Start',
      'Last Seen',
      'Engagement Score',
      'Status',
    ];
    const rows = allFiltered.map((u) => [
      u.full_name || '',
      u.email || '',
      u.role || '',
      u.created_at ? format(parseISO(u.created_at), 'yyyy-MM-dd HH:mm') : '',
      u.last_active_date ? format(parseISO(u.last_active_date), 'yyyy-MM-dd HH:mm') : '',
      String(u.engagement_score || 0),
      u.trial_status || '',
    ]);

    const escapeCsv = (val: string) => {
      if (val.includes(',') || val.includes('"') || val.includes('\n')) {
        return `"${val.replace(/"/g, '""')}"`;
      }
      return val;
    };

    const csv = [headers, ...rows].map((r) => r.map(escapeCsv).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `admin-trials-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const notEmailedCount = useMemo(
    () => flatUsers.filter((u) => !emailedTodayUserIds.has(u.id)).length,
    [flatUsers, emailedTodayUserIds]
  );

  const filterTabs = [
    { value: 'all', label: 'All', count: stats.total_trials + stats.converted },
    { value: 'active', label: 'Active', count: stats.active },
    { value: 'ending_today', label: 'Today', count: stats.ending_today },
    { value: 'ending_tomorrow', label: 'Tomorrow', count: stats.ending_tomorrow },
    { value: 'subscribed', label: 'Converted', count: stats.converted },
    { value: 'expired', label: 'Expired', count: stats.expired },
  ];

  /*
    A trial as one object: who, how far through, what they did, what happened.

    The old row was an avatar, a name, "electrician · 4mo ago", then a stack of
    four pills and a floating +7d button — the same shape whether the person
    lived in the product or never came back. The three things you want when
    triaging a trial are progress through the window, whether they produced
    anything, and the outcome, so those get the space.
  */
  /* Behaviour of the Stripe cohort — same population as the headline rate. */
  const behaviour = stripeTrials?.behaviour ?? null;
  const pctOf = (n: number) => (behaviour?.matched ? (n / behaviour.matched) * 100 : 0);
  const rate = (num: number, den: number) => (den > 0 ? (num / den) * 100 : null);
  const producedCvr = behaviour ? rate(behaviour.produced_billed, behaviour.produced) : null;
  const noProduceCvr = behaviour
    ? rate(behaviour.no_produce_billed, behaviour.no_produce_total)
    : null;
  const behaviourStages = behaviour
    ? [
        {
          key: 'matched',
          label: 'Started a trial',
          count: behaviour.matched,
          pct: 100,
          cvr: null as number | null,
          hint: 'Stripe trials matched to an account.',
        },
        {
          key: 'returned',
          label: 'Came back',
          count: behaviour.returned,
          pct: pctOf(behaviour.returned),
          cvr: rate(behaviour.returned_billed, behaviour.returned),
          hint: 'Active on two or more separate days during the trial.',
        },
        {
          key: 'produced',
          label: 'Produced something',
          count: behaviour.produced,
          pct: pctOf(behaviour.produced),
          cvr: producedCvr,
          hint: 'Created a certificate or a quote before the trial ended.',
        },
      ]
    : [];

  // The open row's trial-window metrics, so the sheet and the list agree.
  const selectedTrial = selectedUser ? cohortByUser.get(selectedUser.id) : undefined;
  const selectedTrialScore = selectedTrial ? calculateTrialScore(selectedTrial) : 0;

  const renderUserRow = (user: TrialUser) => {
    const statusText = getStatusText(user);
    const statusTone = getStatusTone(user);
    const engaged = isEngagedTrial(user.engagement_score || 0);
    const produced = user.produced || 0;
    const mins = Math.round((user.total_seconds_tracked || 0) / 60);
    const live = user.trial_status !== 'expired' && user.trial_status !== 'subscribed';
    // Real trial length, not an assumed seven. Trials here run 7 to 23 days
    // once extensions are counted, and hardcoding 7 rendered an extended trial
    // as "8 of 7 days".
    const win = cohortByUser.get(user.id);
    const len = win ? trialLengthDays(win) : 7;
    const track = Math.min(len, 10);
    // How far through they are — a live trial on its last day with nothing
    // produced is a different call from one on day one.
    const dayOf = live ? Math.max(0, len - (user.days_remaining ?? 0)) : len;

    return (
      <ListRow
        key={user.id}
        accent={engaged ? 'emerald' : 'blue'}
        lead={<Avatar initials={getInitials(user.full_name)} />}
        title={
          <div className="flex min-w-0 items-center gap-2">
            <span className="truncate">{user.full_name || user.email || 'Unknown'}</span>
            {produced > 0 && (
              <span
                className="shrink-0 rounded-full bg-emerald-500/15 px-1.5 py-px text-[10px] font-semibold text-emerald-400"
                title="Certificates or quotes created during the trial"
              >
                {produced} made
              </span>
            )}
            {emailedTodayUserIds.has(user.id) && (
              <CheckCheck
                className="h-3.5 w-3.5 shrink-0 text-emerald-400"
                aria-label="Emailed today"
              />
            )}
          </div>
        }
        subtitle={
          <div className="flex items-center gap-2.5">
            {/* Progress through the trial window, not a rolling 7-day smear. */}
            <span className="flex shrink-0 items-center gap-[3px]" aria-hidden>
              {Array.from({ length: track }, (_, i) => (
                <span
                  key={i}
                  className={cn(
                    'h-1.5 w-1.5 rounded-full',
                    i < (user.active_days || 0)
                      ? engaged
                        ? 'bg-emerald-400'
                        : 'bg-blue-400'
                      : i < dayOf
                        ? 'bg-white/[0.18]'
                        : 'bg-white/[0.07]'
                  )}
                />
              ))}
            </span>
            <span className="truncate">
              {user.active_days || 0} of {len} days &middot; {mins < 1 ? '<1' : mins} min
              {user.last_active_date ? ` · seen ${relativeTime(user.last_active_date)}` : ''}
            </span>
          </div>
        }
        trailing={
          <div className="flex items-center gap-2">
            {engaged && (
              <Pill tone="emerald" className="hidden sm:inline-flex">
                Engaged
              </Pill>
            )}
            <Pill tone={statusTone}>
              {live && user.days_remaining != null ? `${user.days_remaining}d left` : statusText}
            </Pill>
            {!user.subscribed && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  quickExtendMutation.mutate(user.id);
                }}
                disabled={quickExtendMutation.isPending}
                className="flex h-8 shrink-0 touch-manipulation items-center gap-1 rounded-lg border border-white/[0.12] px-2 text-[11px] font-semibold text-white transition-colors hover:bg-white/[0.06] disabled:opacity-50"
                aria-label="Extend trial by 7 days"
              >
                <Plus className="h-3 w-3" />
                7d
              </button>
            )}
          </div>
        }
        onClick={() => setSelectedUser(user)}
      />
    );
  };

  const bucketDefs: {
    key: keyof typeof bucketedUsers;
    title: string;
    tone: Tone;
    metaTone: Tone;
  }[] = [
    { key: 'today', title: 'Expiring Today', tone: 'red', metaTone: 'red' },
    { key: 'tomorrow', title: 'Expiring Tomorrow', tone: 'orange', metaTone: 'orange' },
    { key: 'thisWeek', title: 'This Week', tone: 'amber', metaTone: 'amber' },
    { key: 'later', title: 'Later', tone: 'blue', metaTone: 'blue' },
    { key: 'expired', title: 'Expired', tone: 'red', metaTone: 'red' },
  ];

  return (
    <PullToRefresh
      onRefresh={async () => {
        await refetch();
      }}
    >
      <PageFrame>
        <PageHero
          eyebrow="Subscriptions"
          title="Trials"
          description="Subscribers on trial, grouped by expiry window."
          tone="orange"
          actions={
            <>
              <IconButton onClick={exportCSV} aria-label="Export CSV">
                <Download className="h-4 w-4" />
              </IconButton>
              <IconButton onClick={() => refetch()} aria-label="Refresh" disabled={isRefreshing}>
                <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              </IconButton>
            </>
          }
        />

        {/*
          Same shape as the Revenue hero: the number, what it is made of, and a
          2x2 of the figures you check it against.

          Before this the page opened with a four-cell strip (Active / Expiring
          today / Converted / Expired) above a four-stage funnel — eight large
          numbers in a row with no hierarchy, and two different conversion rates
          on one screen. One rate, one denominator, stated once, with the cohort
          it came from underneath it.
        */}
        <section className="relative -mx-4 overflow-hidden rounded-none border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-6">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/70 via-elec-yellow/20 to-transparent" />
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-10">
            <div className="min-w-0">
              <Eyebrow>Trial conversion</Eyebrow>
              <div className="mt-4 text-[38px] font-semibold leading-none tracking-tight text-white sm:text-[52px]">
                {stripeTrials ? `${stripeTrials.conversionRate.toFixed(1)}%` : '—'}
              </div>
              <div className="mt-2 text-[13px] text-white">
                {stripeTrials
                  ? `${stripeTrials.billed} of ${stripeTrials.ended} ended trials went on to bill. ${stripeTrials.live} still running and not counted either way.`
                  : 'Reading Stripe trials and settling them against paid invoices…'}
              </div>

              {stripeTrials && (
                <div className="mt-5">
                  <StackedBar
                    segments={[
                      {
                        key: 'p',
                        label: 'Converted, still paying',
                        value: stripeTrials.stillPaying,
                        fill: TRIAL_COLOURS.converted,
                      },
                      {
                        key: 'ch',
                        label: 'Converted, later churned',
                        value: stripeTrials.convertedThenChurned,
                        fill: TRIAL_COLOURS.live,
                      },
                      {
                        key: 'n',
                        label: 'Never billed',
                        value: stripeTrials.neverBilled,
                        fill: TRIAL_COLOURS.expired,
                      },
                    ]}
                  />
                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-[12px] text-white">
                    {[
                      {
                        c: TRIAL_COLOURS.converted,
                        n: stripeTrials.stillPaying,
                        l: 'still paying',
                      },
                      {
                        c: TRIAL_COLOURS.live,
                        n: stripeTrials.convertedThenChurned,
                        l: 'churned later',
                      },
                      { c: TRIAL_COLOURS.expired, n: stripeTrials.neverBilled, l: 'never billed' },
                    ].map((x) => (
                      <span key={x.l} className="flex items-center gap-2">
                        <span
                          className="h-2 w-2 shrink-0 rounded-full"
                          style={{ background: x.c }}
                        />
                        <span className="font-medium tabular-nums text-white">{x.n}</span> {x.l}
                      </span>
                    ))}
                  </div>
                  {/* Two rates, because they answer two questions. Collapsing
                      them is how a trial that paid for months and then left
                      ended up filed as a trial that failed. */}
                  <div className="mt-4 text-[12px] text-white/70">
                    Stripe trials only — a subset of the paying base. The rest subscribed without a
                    trial, and store subscribers carry no Stripe trial record.
                  </div>
                </div>
              )}
            </div>

            {/* 2x2, same as Revenue. */}
            <div className="grid grid-cols-2 gap-px self-start overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08]">
              {[
                {
                  label: 'Live now',
                  value: stripeTrials ? stripeTrials.live : '—',
                  sub: 'still inside the window',
                },
                {
                  label: 'Converted',
                  value: stripeTrials ? stripeTrials.billed : '—',
                  sub: 'billed at least once',
                  tone: 'emerald' as const,
                },
                {
                  label: 'Still paying',
                  value: stripeTrials ? stripeTrials.stillPaying : '—',
                  sub: 'of those, active today',
                },
                {
                  label: 'Never billed',
                  value: stripeTrials ? stripeTrials.neverBilled : '—',
                  sub: 'trial ended, no payment',
                },
              ].map((c) => (
                <div key={c.label} className="bg-[hsl(0_0%_9%)] px-4 py-5">
                  <div
                    className={cn(
                      'text-[22px] font-semibold leading-none sm:text-[26px]',
                      c.tone === 'emerald' ? 'text-emerald-400' : 'text-white'
                    )}
                  >
                    {c.value}
                  </div>
                  <div className="mt-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
                    {c.label}
                  </div>
                  <div className="mt-1 text-[11px] text-white/60">{c.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What moves it — its own card, full width, same cohort as above. */}
        <ListCard>
          <ListCardHeader
            tone="blue"
            title="What predicts conversion"
            meta={
              behaviour ? (
                <Pill tone="blue">{behaviour.matched} matched to activity</Pill>
              ) : undefined
            }
          />
          <div className="p-4 sm:p-5">
            {behaviour ? (
              <>
                <div className="grid gap-4 sm:grid-cols-3">
                  {behaviourStages.map((s) => (
                    <div key={s.key} className="min-w-0">
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="text-[13px] font-medium text-white">{s.label}</span>
                        <span className="shrink-0 text-[12px] tabular-nums text-white">
                          {s.count}
                          <span className="text-white/50"> · {s.pct.toFixed(0)}%</span>
                        </span>
                      </div>
                      <div className="mt-2">
                        <Meter pct={s.pct} fill={TRIAL_COLOURS.stage} />
                      </div>
                      <div className="mt-2 text-[15px] font-semibold text-white">
                        {s.cvr === null ? '—' : `${s.cvr.toFixed(1)}%`}
                        <span className="ml-1.5 text-[11px] font-normal text-white/60">
                          converted
                        </span>
                      </div>
                      <div className="mt-1 text-[11px] text-white/60">{s.hint}</div>
                    </div>
                  ))}
                </div>

                {producedCvr !== null && noProduceCvr !== null && (
                  <div className="mt-5 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-[13px] text-white">
                    Trials that created a certificate or quote converted at{' '}
                    <span className="font-semibold" style={{ color: TRIAL_COLOURS.converted }}>
                      {producedCvr.toFixed(1)}%
                    </span>
                    . Those that produced nothing converted at{' '}
                    <span className="font-semibold text-white">{noProduceCvr.toFixed(1)}%</span>
                    {noProduceCvr > 0 && (
                      <> — {(producedCvr / noProduceCvr).toFixed(1)}× the rate</>
                    )}
                    .
                    {noProduceCvr > 0 && producedCvr / noProduceCvr < 1.2 && (
                      <>
                        {' '}
                        On the 158-trial sample this page used to read, the same comparison looked
                        like 1.5×. Measured across the whole cohort the effect is much smaller —
                        producing something is a weak signal here, not a lever.
                      </>
                    )}
                  </div>
                )}
              </>
            ) : (
              <div className="text-[12px] text-white">
                Matching trials to their in-app activity. Computed alongside the conversion figures
                and cached for thirty minutes — it appears on the next refresh.
              </div>
            )}
          </div>
        </ListCard>

        {/*
          Who to chase, in the same language as the list below it.

          This card was left on the old shape — a name, a run-on line of stats
          and a bare "1d" pill — while the rows underneath were rebuilt, so the
          two halves of the page described the same people differently. It now
          carries the same progress track, the same "made" badge, and the action
          that the row has.
        */}
        {cohort && cohort.endingSoon.length > 0 && (
          <ListCard>
            <ListCardHeader
              tone="amber"
              title="Ending soon"
              meta={<Pill tone="amber">{cohort.endingSoon.length} within 3 days</Pill>}
            />
            <ListBody>
              {cohort.endingSoon.slice(0, 6).map((r) => {
                const made = r.reports_made + r.quotes_made;
                const len = trialLengthDays(r);
                const score = calculateTrialScore(r);
                const engaged = isEngagedTrial(score);
                const mins = Math.round(r.seconds_tracked / 60);
                return (
                  <ListRow
                    key={r.user_id}
                    accent={engaged ? 'emerald' : 'amber'}
                    lead={<Avatar initials={getInitials(r.full_name)} />}
                    title={
                      <div className="flex min-w-0 items-center gap-2">
                        <span className="truncate">{r.full_name || r.email || 'Unknown'}</span>
                        {made > 0 && (
                          <span className="shrink-0 rounded-full bg-emerald-500/15 px-1.5 py-px text-[10px] font-semibold text-emerald-400">
                            {made} made
                          </span>
                        )}
                      </div>
                    }
                    subtitle={
                      <div className="flex items-center gap-2.5">
                        <span className="flex shrink-0 items-center gap-[3px]" aria-hidden>
                          {Array.from({ length: Math.min(len, 10) }, (_, i) => (
                            <span
                              key={i}
                              className={cn(
                                'h-1.5 w-1.5 rounded-full',
                                i < r.active_days
                                  ? engaged
                                    ? 'bg-emerald-400'
                                    : 'bg-amber-400'
                                  : 'bg-white/[0.1]'
                              )}
                            />
                          ))}
                        </span>
                        <span className="truncate">
                          {r.active_days} of {len} days &middot; {mins < 1 ? '<1' : mins} min
                          {made === 0 ? ' · nothing created yet' : ''}
                        </span>
                      </div>
                    }
                    trailing={
                      <div className="flex items-center gap-2">
                        {engaged && (
                          <Pill tone="emerald" className="hidden sm:inline-flex">
                            Engaged
                          </Pill>
                        )}
                        <Pill tone={r.days_remaining <= 1 ? 'red' : 'amber'}>
                          {r.days_remaining === 0 ? 'Ends today' : `${r.days_remaining}d left`}
                        </Pill>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            sendReminderMutation.mutate({ userId: r.user_id, type: 'reminder' });
                          }}
                          disabled={sendReminderMutation.isPending}
                          className="flex h-8 shrink-0 touch-manipulation items-center gap-1 rounded-lg border border-white/[0.12] px-2.5 text-[11px] font-semibold text-white transition-colors hover:bg-white/[0.06] disabled:opacity-50"
                        >
                          <MailPlus className="h-3 w-3" />
                          Nudge
                        </button>
                      </div>
                    }
                  />
                );
              })}
            </ListBody>
          </ListCard>
        )}

        {/*
          One filter row, not three.

          Status chips, a "LEAD HEAT" row and a role row were stacked on top of
          each other, three deep, above every screen of this page — sixteen
          chips competing for the same glance. Status stays as the primary
          control because it is what you actually switch between; engagement and
          role become two compact selects on the same line, and the search box
          keeps its place at the end.
        */}
        <div className="-mx-4 rounded-none border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] px-4 py-3 sm:mx-0 sm:rounded-2xl sm:border-x sm:px-5">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex min-w-0 flex-1 flex-wrap items-center gap-1.5">
              {filterTabs.map((t) => (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => setStatusFilter(t.value)}
                  className={cn(
                    'h-9 touch-manipulation rounded-full px-3 text-[12px] font-medium transition-colors',
                    statusFilter === t.value
                      ? 'bg-elec-yellow text-black'
                      : 'text-white hover:bg-white/[0.08]'
                  )}
                >
                  {t.label}
                  <span className="ml-1.5 text-[11px] tabular-nums opacity-70">{t.count}</span>
                </button>
              ))}
            </div>

            <div className="flex shrink-0 items-center gap-2">
              {/* Two bands only — see getEngagementLevel for why warm was cut. */}
              <select
                value={engagementFilter}
                onChange={(e) => setEngagementFilter(e.target.value)}
                aria-label="Filter by engagement"
                className="h-9 touch-manipulation rounded-full border border-white/[0.12] bg-white/[0.04] px-3 text-[12px] font-medium text-white [color-scheme:dark] focus:border-elec-yellow focus:outline-none"
              >
                <option value="all">All engagement</option>
                <option value="hot">Engaged ({stats.hot_leads})</option>
                <option value="warm">Quiet ({stats.warm_leads + stats.cold_leads})</option>
              </select>

              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                aria-label="Filter by role"
                className="h-9 touch-manipulation rounded-full border border-white/[0.12] bg-white/[0.04] px-3 text-[12px] font-medium text-white capitalize [color-scheme:dark] focus:border-elec-yellow focus:outline-none"
              >
                <option value="all">All roles</option>
                <option value="apprentice">Apprentice</option>
                <option value="electrician">Electrician</option>
                <option value="employer">Employer</option>
              </select>

              {/*
                The bulk action lives with the filters that scope it.

                "116 shown · 116 not emailed · Email All" had its own sticky
                band directly beneath the filter row — two full-width bars doing
                one job, and the count it reported was the result of the filters
                immediately above it. Same line now.
              */}
              {notEmailedCount > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    const userIds = flatUsers
                      .filter((u) => !emailedTodayUserIds.has(u.id))
                      .map((u) => u.id);
                    if (userIds.length === 0) {
                      toast.info('All shown users have already been emailed today');
                      return;
                    }
                    bulkEmailMutation.mutate({ userIds, type: 'reminder' });
                  }}
                  disabled={bulkEmailMutation.isPending}
                  className="flex h-9 shrink-0 touch-manipulation items-center gap-1.5 rounded-full border border-elec-yellow/30 bg-elec-yellow/10 px-3 text-[12px] font-semibold text-elec-yellow transition-colors hover:bg-elec-yellow/20 disabled:opacity-50"
                >
                  <MailPlus className="h-3.5 w-3.5" />
                  Email {notEmailedCount}
                </button>
              )}

              {hiddenUserIds.size > 0 && (
                <button
                  type="button"
                  onClick={unhideAllUsers}
                  className="flex h-9 touch-manipulation items-center gap-1.5 rounded-full border border-white/[0.12] px-3 text-[12px] font-medium text-white hover:bg-white/[0.08]"
                >
                  <Eye className="h-3.5 w-3.5" />
                  Restore {hiddenUserIds.size}
                </button>
              )}

              <div className="relative">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search trials…"
                  aria-label="Search trials"
                  className="h-9 w-[9.5rem] touch-manipulation rounded-full border border-white/[0.12] bg-white/[0.04] px-3.5 text-[12px] text-white placeholder:text-white/40 caret-elec-yellow focus:border-elec-yellow focus:outline-none sm:w-48"
                />
              </div>
            </div>
          </div>
        </div>

        {isLoading ? (
          <LoadingBlocks />
        ) : flatUsers.length === 0 ? (
          <EmptyState
            title="No trials in this window"
            description="Trials matching your filters will appear here."
          />
        ) : (
          <div className="space-y-5">
            {bucketDefs.map((def) => {
              const users = bucketedUsers[def.key];
              if (users.length === 0) return null;
              /*
                A group header that says something about the group.

                It was a title and a bare count — the same header whether the
                116 expired trials had all produced work or none of them had.
                These two figures are the ones that decide what you do with the
                group: how many got far enough to make something, and how many
                were engaged by the measure the rows use.
              */
              const producedCount = users.filter((u) => (u.produced || 0) > 0).length;
              const engagedCount = users.filter((u) =>
                isEngagedTrial(u.engagement_score || 0)
              ).length;
              return (
                <ListCard key={def.key}>
                  <ListCardHeader
                    tone={def.tone}
                    title={def.title}
                    meta={
                      <span className="flex flex-wrap items-center gap-2">
                        <Pill tone={def.metaTone}>{users.length}</Pill>
                        {producedCount > 0 && (
                          <span className="text-[11px] text-white/60">
                            {producedCount} produced something
                          </span>
                        )}
                        {engagedCount > 0 && (
                          <span className="text-[11px] text-white/60">
                            &middot; {engagedCount} engaged
                          </span>
                        )}
                      </span>
                    }
                  />
                  <ListBody>{users.map(renderUserRow)}</ListBody>
                </ListCard>
              );
            })}
          </div>
        )}

        <Sheet open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
          <SheetContent
            side="bottom"
            className="h-[85vh] rounded-t-2xl p-0 bg-[hsl(0_0%_8%)] border-white/[0.06]"
          >
            <div className="flex flex-col h-full">
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-10 h-1 rounded-full bg-white/20" />
              </div>

              <SheetHeader className="px-5 pb-4 border-b border-white/[0.06]">
                <SheetTitle className="flex items-center gap-3">
                  <Avatar initials={getInitials(selectedUser?.full_name)} size="md" />
                  <div className="min-w-0">
                    <div className="text-left text-[15px] font-semibold text-white truncate">
                      {selectedUser?.full_name}
                    </div>
                    <div className="text-[12px] font-normal text-white truncate">
                      @{selectedUser?.username}
                    </div>
                  </div>
                </SheetTitle>
              </SheetHeader>

              {/*
                2x2 from lg up.

                The sheet is a full-width bottom sheet, so on a desktop these
                cards were stacked in a single column across 1,400px — one card
                per row, four screens of scrolling, and half the width empty.
                Two columns puts the trial and its activity side by side and
                brings the actions above the fold.
              */}
              <div className="flex-1 space-y-4 overflow-y-auto p-4 sm:p-5 lg:grid lg:auto-rows-min lg:grid-cols-2 lg:items-start lg:gap-4 lg:space-y-0">
                {firstAction && (
                  <ListCard>
                    <div className="relative p-5">
                      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-emerald-500/70 via-emerald-400/70 to-green-400/70 opacity-70" />
                      <Eyebrow>Time to first value</Eyebrow>
                      <div className="mt-2 text-3xl font-semibold text-white tabular-nums leading-none">
                        {timeToFirstValue}
                      </div>
                      <div className="mt-2 text-[12px] text-white">
                        First action: {firstAction.action_detail}
                      </div>
                      <div className="mt-1 text-[11px] text-white">
                        {format(parseISO(firstAction.created_at), 'dd MMM HH:mm')}
                      </div>
                    </div>
                  </ListCard>
                )}

                {/*
                  What happened inside this trial.

                  This panel used to read `scoreBreakdown`, which comes from
                  user_activity_summary — the rolling 30-day view. After the
                  list beside it was moved onto trial-window figures, opening a
                  row contradicted the row you clicked: "3 of 7 days" outside,
                  zeroes in here. Same source as the list now, and it shows the
                  thing that predicts conversion rather than raw page views.
                */}
                {selectedTrial && (
                  <ListCard>
                    <ListCardHeader
                      tone={isEngagedTrial(selectedTrialScore) ? 'emerald' : 'blue'}
                      title="During the trial"
                      meta={
                        <Pill tone={isEngagedTrial(selectedTrialScore) ? 'emerald' : 'blue'}>
                          {isEngagedTrial(selectedTrialScore) ? 'Engaged' : 'Quiet'}{' '}
                          {selectedTrialScore}
                        </Pill>
                      }
                    />
                    <div className="p-4 sm:p-5">
                      <div className="flex items-center gap-[5px]" aria-hidden>
                        {Array.from(
                          { length: Math.min(trialLengthDays(selectedTrial), 10) },
                          (_, i) => (
                            <div
                              key={i}
                              className={cn(
                                'h-2 flex-1 rounded-full',
                                i < selectedTrial.active_days
                                  ? isEngagedTrial(selectedTrialScore)
                                    ? 'bg-emerald-400'
                                    : 'bg-blue-400'
                                  : 'bg-white/[0.08]'
                              )}
                            />
                          )
                        )}
                      </div>
                      <div className="mt-2 text-[12px] text-white">
                        Active on {selectedTrial.active_days} of the{' '}
                        {trialLengthDays(selectedTrial)} trial days
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.08] sm:grid-cols-4">
                        {[
                          {
                            label: 'Created',
                            value: selectedTrial.reports_made + selectedTrial.quotes_made,
                            note: 'certificates + quotes',
                          },
                          {
                            label: 'Time in app',
                            value: formatTimeSpent(selectedTrial.seconds_tracked),
                            note: 'during the trial',
                          },
                          {
                            label: 'Sessions',
                            value: selectedTrial.sessions,
                            note: 'app opens',
                          },
                          {
                            label: 'Pages',
                            value: selectedTrial.page_views,
                            note: 'screens viewed',
                          },
                        ].map((c) => (
                          <div key={c.label} className="bg-[hsl(0_0%_9%)] px-3 py-3.5">
                            <div className="text-[18px] font-semibold leading-none text-white">
                              {c.value}
                            </div>
                            <div className="mt-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-white">
                              {c.label}
                            </div>
                            <div className="mt-0.5 text-[10px] text-white/60">{c.note}</div>
                          </div>
                        ))}
                      </div>

                      {selectedTrial.reports_made + selectedTrial.quotes_made === 0 && (
                        <div className="mt-4 rounded-xl border border-amber-500/20 bg-amber-500/5 px-4 py-3 text-[12px] text-white">
                          Produced nothing during the trial — like{' '}
                          {behaviour?.no_produce_total ?? '—'} others. On the full cohort that group
                          still converts at{' '}
                          {noProduceCvr === null ? '—' : `${noProduceCvr.toFixed(0)}%`}, so this on
                          its own is a weak signal, not a verdict.
                        </div>
                      )}
                    </div>
                  </ListCard>
                )}

                {/*
                  Only when there is genuinely nothing — including in the trial
                  window. `scoreBreakdown.loginCount` is the 30-day view, so on
                  any trial older than a month this card claimed "no tracked
                  activity" directly underneath a panel listing that person's
                  sessions and page views.
                */}
                {!activityLoading &&
                  !firstAction &&
                  !scoreBreakdown?.loginCount &&
                  !(selectedTrial && selectedTrial.sessions + selectedTrial.page_views > 0) && (
                    <ListCard>
                      <div className="relative p-5">
                        <div
                          className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r opacity-70 ${
                            selectedUser?.last_sign_in_at
                              ? 'from-amber-500/70 via-amber-400/70 to-yellow-400/70'
                              : 'from-blue-500/70 via-blue-400/70 to-cyan-400/70'
                          }`}
                        />
                        <Eyebrow>
                          {selectedUser?.last_sign_in_at
                            ? 'Logged in, no tracked activity'
                            : 'Never logged in'}
                        </Eyebrow>
                        <div className="mt-2 text-[14px] font-semibold text-white">
                          {selectedUser?.last_sign_in_at
                            ? `Last login ${formatDistanceToNow(parseISO(selectedUser.last_sign_in_at), { addSuffix: true })}`
                            : "User hasn't returned since signup"}
                        </div>
                        <div className="mt-1 text-[12px] text-white">
                          {selectedUser?.last_sign_in_at
                            ? 'Activity tracking started recently — older sessions not captured'
                            : selectedUser?.created_at
                              ? `Signed up ${formatDistanceToNow(parseISO(selectedUser.created_at), { addSuffix: true })}`
                              : ''}
                        </div>
                      </div>
                    </ListCard>
                  )}

                <ListCard>
                  <ListCardHeader
                    tone="yellow"
                    title="The trial"
                    meta={
                      selectedUser ? (
                        <Pill tone={getStatusTone(selectedUser)}>
                          {getStatusText(selectedUser)}
                        </Pill>
                      ) : undefined
                    }
                  />
                  {/*
                    A trial has a shape — it starts, it runs, it ends one way or
                    the other. This was four label/value rows in a stack, so the
                    dates sat there as facts with no relationship to each other
                    and nothing showed how far through the person got.
                  */}
                  <div className="p-4 sm:p-5">
                    <ol className="relative space-y-4 border-l border-white/[0.12] pl-5">
                      {[
                        {
                          k: 'start',
                          label: 'Signed up',
                          when: selectedUser?.created_at
                            ? format(parseISO(selectedUser.created_at), 'dd MMM yyyy · HH:mm')
                            : '—',
                          done: true,
                        },
                        {
                          k: 'used',
                          label: selectedTrial
                            ? `Active on ${selectedTrial.active_days} of ${trialLengthDays(selectedTrial)} days`
                            : 'Activity',
                          when: selectedTrial
                            ? `${Math.round(selectedTrial.seconds_tracked / 60)} min · ${
                                selectedTrial.reports_made + selectedTrial.quotes_made
                              } created`
                            : 'No trial-window activity recorded',
                          done: (selectedTrial?.active_days ?? 0) > 0,
                        },
                        {
                          k: 'end',
                          label:
                            selectedUser?.trial_status === 'subscribed'
                              ? 'Converted'
                              : selectedUser?.trial_status === 'expired'
                                ? 'Trial ended'
                                : 'Trial ends',
                          when: selectedUser?.trial_ends
                            ? format(parseISO(selectedUser.trial_ends), 'dd MMM yyyy')
                            : '—',
                          done:
                            selectedUser?.trial_status === 'expired' ||
                            selectedUser?.trial_status === 'subscribed',
                        },
                      ].map((step) => (
                        <li key={step.k} className="relative">
                          <span
                            className={cn(
                              'absolute -left-[26px] top-1 h-2.5 w-2.5 rounded-full ring-4 ring-[hsl(0_0%_8%)]',
                              step.done ? 'bg-elec-yellow' : 'bg-white/25'
                            )}
                          />
                          <div className="text-[13px] font-medium text-white">{step.label}</div>
                          <div className="mt-0.5 text-[12px] text-white/60">{step.when}</div>
                        </li>
                      ))}
                    </ol>

                    <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-white/[0.06] pt-3 text-[12px] text-white/60">
                      <span>
                        Role{' '}
                        <span className="capitalize text-white">
                          {selectedUser?.role || 'visitor'}
                        </span>
                      </span>
                      {selectedTrial?.subscription_source && (
                        <span>
                          Billed via{' '}
                          <span className="text-white">
                            {selectedTrial.subscription_source.replace('_', ' ')}
                          </span>
                        </span>
                      )}
                      {selectedUser?.last_active_date && (
                        <span>
                          Last seen{' '}
                          <span className="text-white">
                            {relativeTime(selectedUser.last_active_date)}
                          </span>
                        </span>
                      )}
                    </div>
                  </div>
                </ListCard>

                <ListCard>
                  <ListCardHeader
                    tone={isEngagedTrial(selectedTrialScore) ? 'emerald' : 'blue'}
                    title="How that score is made up"
                    meta={
                      <Pill tone={isEngagedTrial(selectedTrialScore) ? 'emerald' : 'blue'}>
                        {selectedTrialScore} / 88
                      </Pill>
                    }
                  />
                  {/*
                    This listed nine rows of a formula that no longer exists —
                    base points, streak bonus, study sessions, quotes x 8,
                    certificates x 10 — computed from the 30-day activity view.
                    The score shown beside it comes from calculateTrialScore,
                    which has five components and reads the trial window. The
                    card was explaining arithmetic the page had stopped doing.
                  */}
                  <div className="divide-y divide-white/[0.06]">
                    {selectedTrial ? (
                      trialScoreParts(selectedTrial).map((row) => (
                        <div key={row.label} className="px-5 py-3">
                          <div className="flex items-baseline justify-between gap-3">
                            <span className="text-[13px] font-medium text-white">{row.label}</span>
                            <span className="shrink-0 text-[13px] font-semibold tabular-nums text-white">
                              {row.points.toFixed(0)}
                              <span className="text-[11px] font-normal text-white/50">
                                {' '}
                                / {row.max}
                              </span>
                            </span>
                          </div>
                          <div className="mt-1.5">
                            <Meter
                              pct={(row.points / row.max) * 100}
                              fill={row.points > 0 ? TRIAL_COLOURS.stage : 'rgba(255,255,255,0.12)'}
                            />
                          </div>
                          <div className="mt-1 text-[11px] text-white/60">{row.detail}</div>
                        </div>
                      ))
                    ) : (
                      <div className="px-5 py-4 text-[12px] text-white">
                        No trial-window activity recorded for this account.
                      </div>
                    )}
                    <div className="px-5 py-3 text-[11px] text-white/60">
                      Engaged at {TRIAL_ENGAGED_AT} or above — the one threshold the data supports
                      (24% conversion above it against roughly 12% below, n=25).
                    </div>
                  </div>
                  <div className="divide-y divide-white/[0.06] border-t border-white/[0.06]">
                    <div className="flex justify-between items-center px-5 py-3.5">
                      <span className="text-[13px] text-white">Last login</span>
                      <span className="text-[13px] text-white">
                        {selectedUser?.last_sign_in_at
                          ? formatDistanceToNow(parseISO(selectedUser.last_sign_in_at), {
                              addSuffix: true,
                            })
                          : 'Never'}
                      </span>
                    </div>
                    {selectedUser?.email && (
                      <div className="flex justify-between items-center px-5 py-3.5">
                        <span className="text-[13px] text-white">Email</span>
                        <span className="text-[12px] text-white truncate max-w-[60%]">
                          {selectedUser.email}
                        </span>
                      </div>
                    )}
                  </div>
                </ListCard>

                <ListCard>
                  <ListCardHeader tone="blue" title="Actions" />
                  {/*
                    One primary action, the rest subordinate.

                    All three were full-width 48px buttons stacked in a column —
                    "send reminder", "extend 7 days" and "remove from list" given
                    identical weight, with the destructive one the same size as
                    the useful one. The reminder is what you came here to do; the
                    other two sit on a row beneath it.
                  */}
                  <div className="space-y-2.5 p-4 sm:p-5">
                    {selectedUser && emailedTodayUserIds.has(selectedUser.id) ? (
                      <div className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-[13px] font-semibold text-emerald-400">
                        <CheckCheck className="h-4 w-4" />
                        Reminder sent today
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          if (selectedUser) {
                            sendReminderMutation.mutate({
                              userId: selectedUser.id,
                              type: 'reminder',
                            });
                          }
                        }}
                        disabled={sendReminderMutation.isPending}
                        className="flex h-12 w-full touch-manipulation items-center justify-center gap-2 rounded-xl bg-elec-yellow text-[13px] font-semibold text-black transition-opacity hover:opacity-90 disabled:bg-white/[0.08] disabled:text-white/70"
                      >
                        <Mail className="h-4 w-4" />
                        {sendReminderMutation.isPending ? 'Sending…' : 'Send trial reminder'}
                      </button>
                    )}

                    <div className="flex gap-2.5">
                      {selectedUser && !selectedUser.subscribed && (
                        <button
                          type="button"
                          onClick={() => {
                            if (selectedUser) quickExtendMutation.mutate(selectedUser.id);
                          }}
                          disabled={quickExtendMutation.isPending}
                          className="flex h-11 flex-1 touch-manipulation items-center justify-center gap-1.5 rounded-xl border border-white/[0.12] text-[12px] font-semibold text-white transition-colors hover:bg-white/[0.06] disabled:opacity-50"
                        >
                          <Plus className="h-3.5 w-3.5" />
                          Extend 7 days
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => {
                          if (selectedUser) hideUserMutation.mutate(selectedUser.id);
                        }}
                        disabled={hideUserMutation.isPending}
                        className="flex h-11 flex-1 touch-manipulation items-center justify-center gap-1.5 rounded-xl border border-white/[0.12] text-[12px] font-medium text-white transition-colors hover:bg-white/[0.06] disabled:opacity-50"
                      >
                        <XCircle className="h-3.5 w-3.5" />
                        Hide from list
                      </button>
                    </div>
                  </div>
                </ListCard>

                <ListCard>
                  <ListCardHeader
                    tone="cyan"
                    title="What they did"
                    meta={
                      userActivity?.length ? (
                        <Pill tone="blue">{userActivity.length} actions</Pill>
                      ) : undefined
                    }
                  />
                  {/*
                    Grouped by day, and marked against the trial window.

                    It was a flat list of every action with "3 months ago" under
                    each one — no way to see whether the burst happened during
                    the trial or long after it ended, which is the only question
                    this panel is really being asked.
                  */}
                  {activityLoading ? (
                    <div className="space-y-2 p-5">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="h-12 animate-pulse rounded-lg bg-white/[0.03]" />
                      ))}
                    </div>
                  ) : !userActivity || userActivity.length === 0 ? (
                    <div className="px-5 py-8 text-center">
                      <div className="text-[13px] text-white">Nothing recorded</div>
                      <div className="mt-1 text-[11px] text-white/60">
                        No tracked actions for this account.
                      </div>
                    </div>
                  ) : (
                    <div className="max-h-[380px] overflow-y-auto">
                      {Object.entries(
                        userActivity.reduce<Record<string, typeof userActivity>>((acc, a) => {
                          const day = format(parseISO(a.created_at), 'yyyy-MM-dd');
                          (acc[day] ||= []).push(a);
                          return acc;
                        }, {})
                      ).map(([day, items]) => {
                        const inTrial =
                          !!selectedTrial &&
                          day >= selectedTrial.trial_start.slice(0, 10) &&
                          day <= selectedTrial.trial_end.slice(0, 10);
                        return (
                          <div key={day} className="border-t border-white/[0.06] first:border-t-0">
                            <div className="flex items-center justify-between gap-3 bg-white/[0.02] px-5 py-2">
                              <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-white">
                                {format(parseISO(day), 'EEE d MMM')}
                              </span>
                              <span className="flex items-center gap-2 text-[11px] text-white/60">
                                {items.length} action{items.length === 1 ? '' : 's'}
                                {inTrial && (
                                  <span className="rounded-full bg-elec-yellow/15 px-1.5 py-px text-[10px] font-semibold text-elec-yellow">
                                    in trial
                                  </span>
                                )}
                              </span>
                            </div>
                            {items.map((activity) => (
                              <div key={activity.id} className="flex items-start gap-3 px-5 py-2.5">
                                <span
                                  className={cn(
                                    'mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full',
                                    inTrial ? 'bg-elec-yellow' : 'bg-white/25'
                                  )}
                                />
                                <div className="min-w-0 flex-1">
                                  <div className="truncate text-[13px] text-white">
                                    {activity.action_detail}
                                  </div>
                                  {activity.extra_info && (
                                    <div className="truncate text-[11.5px] text-white/60">
                                      {activity.extra_info}
                                    </div>
                                  )}
                                </div>
                                <span className="shrink-0 text-[11px] tabular-nums text-white/50">
                                  {format(parseISO(activity.created_at), 'HH:mm')}
                                </span>
                              </div>
                            ))}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </ListCard>

                <ListCard>
                  <ListCardHeader tone="yellow" title="Account" />
                  <div className="divide-y divide-white/[0.06]">
                    <div className="flex justify-between items-center px-5 py-3.5">
                      <span className="text-[13px] text-white">User ID</span>
                      <span className="text-[11px] font-mono text-white truncate max-w-[60%]">
                        {selectedUser?.id}
                      </span>
                    </div>
                    <div className="flex justify-between items-center px-5 py-3.5">
                      <span className="text-[13px] text-white">Time on platform</span>
                      <span className="text-[13px] text-white">
                        {selectedUser?.created_at &&
                          formatDistanceToNow(parseISO(selectedUser.created_at))}
                      </span>
                    </div>
                  </div>
                </ListCard>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </PageFrame>
    </PullToRefresh>
  );
}
