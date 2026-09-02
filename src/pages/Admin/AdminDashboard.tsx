/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Admin overview.
 *
 * Panels on the app's lit card surface, one level deep, each holding one
 * job: the money and where it comes from, six figures with a time axis,
 * what people did today against yesterday, the queue that needs a decision,
 * and three lists of people. Colour is spent where it carries meaning —
 * yellow for the revenue line and links, blue and aqua for the two billing
 * rails, one hue per plan, green and orange for a change that went the right
 * or wrong way — and nowhere else.
 *
 * Definitions that took some arguing:
 *   MRR         Stripe + App Store + Play Store, normalised to a month.
 *   Churn       people who paid at least one real invoice, then left.
 *               Trial leavers are counted nowhere on this page.
 *   Conversion  of trials that ended, the share that went on to pay.
 *   Today       00:00 to now, UK time — not UTC.
 */
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { toast } from '@/hooks/use-toast';
import { useMemo, useState, useCallback, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { RefreshCw, Smartphone, Monitor, AlertTriangle } from 'lucide-react';
import { getInitials } from '@/utils/adminUtils';
import UserManagementSheet from '@/components/admin/UserManagementSheet';
import { useAdminUsersBase, AdminUser } from '@/hooks/useAdminUsersBase';
import PullToRefresh from '@/components/admin/PullToRefresh';
import { PageFrame, IconButton, EmptyState } from '@/components/admin/editorial';
import {
  ACCENT,
  AQUA,
  BLUE,
  BLUE_RAMP,
  GOOD,
  MAGENTA,
  ORANGE,
  SERIOUS,
  VIOLET,
  YELLOW,
  Delta,
  KpiTile,
  Legend,
  Money,
  MonthBars,
  NeedsItem,
  Panel,
  PersonRow,
  SectionHead,
  Segmented,
  Sparkline,
  StackBar,
  StateDot,
  gbp,
} from '@/components/admin/overview/primitives';
import { MrrChart, type MrrPoint, type Range } from '@/components/admin/overview/MrrHero';
import InboxThreadSheet from '@/components/admin/overview/InboxThreadSheet';
import {
  OVERVIEW_SERIES_KEY,
  useAdminOverviewSeries,
  type TodayUsage,
} from '@/hooks/useAdminOverviewSeries';

/* ── types ───────────────────────────────────────────────────── */

interface SupportMessage {
  id: string;
  sender_id: string;
  recipient_id: string;
  subject: string | null;
  message: string;
  read_at: string | null;
  created_at: string;
  sender: {
    id: string;
    full_name: string | null;
    role: string | null;
    avatar_url: string | null;
  } | null;
}

interface OnlineUser {
  user_id: string;
  last_seen: string;
  status: string | null;
  session_started_at: string | null;
  current_page: string | null;
  device_info: Record<string, unknown> | null;
  profiles: {
    full_name: string | null;
    role: string | null;
    avatar_url: string | null;
  } | null;
}

interface StripeSubscriptionDetail {
  subscriptionId: string;
  customerId: string;
  customerEmail: string;
  customerName: string;
  tier: string;
  priceId: string;
  priceAmount: number;
  monthlyAmount: number;
  interval: string;
  status: string;
  trialEnd: string | null;
  created: string;
}

interface StripeStats {
  stripe: {
    activeSubscriptions: number;
    trialingSubscriptions: number;
    canceledLast30Days: number;
    tierCounts: Record<string, number>;
    trialingTierCounts: Record<string, number>;
    mrr: number;
    projectedMrr: number;
  };
  /** Cached trial + churn analysis; null until the invoice walk has run once. */
  trials: {
    ended: number;
    billed: number;
    conversion?: {
      d90: { ended: number; billed: number };
      months: Array<{ month: string; ended: number; billed: number }>;
    };
    churn?: {
      months: Array<{
        month: string;
        payingAtStart: number;
        churned: number;
        mrrLost: number;
        complete: boolean;
        byPlan?: Record<string, { count: number; mrrLost: number }>;
        newMrr?: number;
        newCount?: number;
      }>;
      daily: Array<{ day: string; n: number }>;
      last30: { count: number; mrrLost: number };
    };
  } | null;
  movement?: {
    started14: number;
    started30: number;
    canceled14: number;
    canceled30: number;
    canceledNeverPaid14: number;
    canceledNeverPaid30: number;
  };
  supabase: {
    subscribedUsers: number;
    tierCounts: Record<string, number>;
    withStripeId: number;
    withoutStripeId: number;
  };
  discrepancies: { inStripeNotSupabase: number; inSupabaseNotStripe: number };
  subscriptions: StripeSubscriptionDetail[];
  trialingList: StripeSubscriptionDetail[];
  generatedAt: string;
}

interface RcStats {
  subscribersBySource: Record<string, number>;
  tiersBySource: Record<string, Record<string, number>>;
  revenuecat: { mrr: number; revenue: number; activeSubscriptions: number; activeTrials: number };
  /** From RevenueCat's own charts; null while the key cannot read them or the cache is cold. */
  churn: {
    months: Array<{ month: string; payingAtStart: number; churned: number; complete: boolean }>;
    daily: Array<{ day: string; n: number }>;
    trials: Array<{
      month: string;
      starts: number;
      conversions: number;
      expirations: number;
      pending: number;
    }>;
    movement?: Array<{
      month: string;
      newMrr: number;
      resubMrr: number;
      expansionMrr: number;
      churnedMrr: number;
      contractionMrr: number;
      net: number;
    }>;
  } | null;
  trialUsers: Array<{
    id: string;
    full_name: string;
    subscription_tier: string;
    subscription_source: string | null;
    trial_end: string | null;
    is_cancelled: boolean;
  }>;
  paidUsers: Array<{ id: string; full_name: string; subscription_tier: string }>;
}

type ListKey = 'live' | 'signups' | 'inbox' | 'leaving';

interface SentryOverview {
  configured: boolean;
  errors24h: number | null;
  errorsPrev24h: number | null;
  topIssues: Array<{ title: string; count: number; permalink: string; culprit: string | null }>;
  asOf: string;
}

/* ── helpers ─────────────────────────────────────────────────── */

const tierLabel = (tier?: string | null) => {
  const t = (tier || '').toLowerCase().replace('_yearly', '').replace('_', ' ');
  if (!t) return 'Paid';
  if (t === 'business ai') return 'Mate';
  return t.charAt(0).toUpperCase() + t.slice(1);
};

/** Plans in a fixed order with a fixed hue each — colour follows the plan, never its rank. */
const PLANS: Array<{ key: string; label: string; color: string; price: number }> = [
  { key: 'apprentice', label: 'Apprentice', color: BLUE, price: 6.99 },
  { key: 'electrician', label: 'Electrician', color: ORANGE, price: 19.99 },
  { key: 'employer', label: 'Employer', color: AQUA, price: 49.99 },
  { key: 'founder', label: 'Founder', color: YELLOW, price: 3.99 },
  { key: 'mate', label: 'Mate', color: MAGENTA, price: 39.99 },
  { key: 'other', label: 'Other', color: VIOLET, price: 0 },
];
const planKey = (tier: string) => {
  const t = tier.toLowerCase().replace('_yearly', '');
  if (t === 'business_ai' || t === 'business ai') return 'mate';
  return PLANS.some((p) => p.key === t) ? t : 'other';
};

const MONTHS_LONG = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const MONTHS_SHORT = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
const monthName = (ym: string) => MONTHS_LONG[Number(ym.slice(5, 7)) - 1] ?? ym;
const monthShort = (ym: string) => MONTHS_SHORT[Number(ym.slice(5, 7)) - 1] ?? ym;
const pct = (num: number, den: number) => (den > 0 ? Math.round((num / den) * 1000) / 10 : null);

/** "Today, 18:02" / "Yesterday, 09:14" / "Tue 26 Aug, 17:50" — a time you can act on. */
function signupWhen(iso: string) {
  const d = new Date(iso);
  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const time = d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  const day =
    d.toDateString() === now.toDateString()
      ? 'Today'
      : d.toDateString() === yesterday.toDateString()
        ? 'Yesterday'
        : `${d.toLocaleDateString('en-GB', { weekday: 'short' })} ${d.getDate()} ${MONTHS_SHORT[d.getMonth()]}`;
  return `${day}, ${time}`;
}

const shortAgo = (iso: string) =>
  formatDistanceToNow(new Date(iso))
    .replace('about ', '')
    .replace('less than a minute', 'just now');

/* ── component ──────────────────────────────────────────── */

export default function AdminDashboard() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [range, setRange] = useState<Range>(90);
  const [mobileList, setMobileList] = useState<ListKey>('live');
  const [expanded, setExpanded] = useState<Record<ListKey, boolean>>({
    live: false,
    signups: false,
    inbox: false,
    leaving: false,
  });
  const [syncing, setSyncing] = useState(false);
  const [thread, setThread] = useState<{ id: string; name: string } | null>(null);
  const { data: baseUsers } = useAdminUsersBase();
  const { data: series } = useAdminOverviewSeries();

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await Promise.all(
      [
        ['admin-dashboard-stats'],
        ['admin-stripe-live-stats'],
        ['admin-revenuecat-stats'],
        ['admin-online-users'],
        ['admin-users-base'],
        ['admin-pending-counts'],
        ['admin-churned-users'],
        ['admin-support-inbox'],
        OVERVIEW_SERIES_KEY,
      ].map((queryKey) => queryClient.invalidateQueries({ queryKey }))
    );
    setTimeout(() => setIsRefreshing(false), 500);
  }, [queryClient]);

  const authedInvoke = async <T,>(fn: string): Promise<T> => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) throw new Error('Not authenticated');
    const { data, error } = await supabase.functions.invoke(fn, {
      headers: { Authorization: `Bearer ${session.access_token}` },
    });
    if (error) throw error;
    return data as T;
  };

  const { data: stripeStats, isLoading: stripeLoading } = useQuery<StripeStats>({
    queryKey: ['admin-stripe-live-stats'],
    refetchInterval: 60000,
    refetchOnWindowFocus: true,
    staleTime: 30000,
    queryFn: () => authedInvoke<StripeStats>('admin-stripe-stats'),
  });

  const { data: rcStats, dataUpdatedAt: rcUpdatedAt } = useQuery<RcStats>({
    queryKey: ['admin-revenuecat-stats'],
    refetchInterval: 60000,
    staleTime: 30000,
    queryFn: () => authedInvoke<RcStats>('admin-revenuecat-stats'),
  });

  const { data: sentry } = useQuery<SentryOverview>({
    queryKey: ['admin-sentry-stats'],
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
    retry: false,
    queryFn: () => authedInvoke<SentryOverview>('admin-sentry-stats'),
  });

  const { data: churnedUsers } = useQuery({
    queryKey: ['admin-churned-users'],
    queryFn: async () => {
      const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
      const { data } = await supabase
        .from('profiles' as any)
        .select('id, full_name, subscription_tier, trial_end, role')
        .eq('is_trial_cancelled', true)
        .gte('trial_end', sevenDaysAgo)
        .in('subscription_source', ['app_store', 'play_store'])
        .order('trial_end', { ascending: true });
      return (data || []) as unknown as Array<{
        id: string;
        full_name: string | null;
        subscription_tier: string | null;
        trial_end: string | null;
        role: string | null;
      }>;
    },
    staleTime: 60000,
  });

  const syncRC = async () => {
    setSyncing(true);
    try {
      const data = await authedInvoke<{ message?: string }>('admin-sync-revenuecat');
      toast({
        title: 'RevenueCat synced',
        description: data?.message || 'Subscription data updated',
      });
      queryClient.invalidateQueries({ queryKey: ['admin-revenuecat-stats'] });
    } catch (e) {
      toast({ title: 'Sync failed', description: (e as Error).message, variant: 'destructive' });
    } finally {
      setSyncing(false);
    }
  };

  const {
    data: stats,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ['admin-dashboard-stats', baseUsers?.length ?? 0],
    refetchInterval: 60000,
    refetchOnWindowFocus: false,
    staleTime: 30000,
    enabled: !!baseUsers,
    queryFn: async () => {
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      const [totalUsersRes, signupsWeekRes, activeTodayRes] = await Promise.all([
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', weekAgo.toISOString()),
        supabase
          .from('user_presence')
          .select('*', { count: 'exact', head: true })
          .gte('last_seen', dayAgo.toISOString()),
      ]);
      return {
        totalUsers: totalUsersRes.count || 0,
        signupsThisWeek: signupsWeekRes.count || 0,
        activeToday: activeTodayRes.count || 0,
        recentSignups: (baseUsers || []).slice(0, 50),
      };
    },
  });

  const { data: onlineUsers } = useQuery<OnlineUser[]>({
    queryKey: ['admin-online-users'],
    queryFn: async () => {
      const fiveMinAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
      const { data } = await supabase
        .from('user_presence')
        .select(
          'user_id, last_seen, status, session_started_at, current_page, device_info, profiles(full_name, role, avatar_url)'
        )
        .gte('last_seen', fiveMinAgo)
        .order('last_seen', { ascending: false })
        .limit(200);
      return (data || []) as OnlineUser[];
    },
    staleTime: 10 * 1000,
    refetchInterval: 15000,
  });

  const { data: supportMessages } = useQuery<SupportMessage[]>({
    queryKey: ['admin-support-inbox'],
    queryFn: async () => {
      const { data: adminProfiles } = await supabase
        .from('profiles')
        .select('id')
        .not('admin_role', 'is', null);
      const adminIds = adminProfiles?.map((p) => p.id) || [];
      if (adminIds.length === 0) return [];
      const { data } = await supabase
        .from('admin_messages')
        .select(
          `
          id, sender_id, recipient_id, subject, message, read_at, created_at,
          sender:profiles!admin_messages_sender_id_fkey(id, full_name, role, avatar_url)
        `
        )
        .in('recipient_id', adminIds)
        .order('created_at', { ascending: false })
        .limit(10);
      return (data || []) as SupportMessage[];
    },
    staleTime: 30 * 1000,
    refetchInterval: 60000,
  });

  const { data: pendingCounts } = useQuery({
    queryKey: ['admin-pending-counts'],
    queryFn: async () => {
      const { count } = await supabase
        .from('admin_messages')
        .select('*', { count: 'exact', head: true })
        .is('read_at', null);
      return { unreadMessages: count || 0 };
    },
    staleTime: 30 * 1000,
    refetchInterval: 60000,
  });

  /* ── derived: money ─────────────────────────────────── */

  const stripeMrr = stripeStats?.stripe.mrr || 0;
  const rcLoaded = !!rcStats;
  const rcMrr = rcStats?.revenuecat?.mrr || 0;
  const mrr = stripeMrr + rcMrr;
  const totalSubs = stripeStats?.stripe.activeSubscriptions || 0;
  const rcLivePaid = rcStats?.revenuecat?.activeSubscriptions || 0;
  const rcLiveTrials = rcStats?.revenuecat?.activeTrials || 0;
  const appStoreSubsDb = rcStats?.subscribersBySource?.app_store || 0;
  const playStoreSubs = rcStats?.subscribersBySource?.play_store || 0;
  const appStoreSubs =
    rcLivePaid > 0 ? Math.max(rcLivePaid - playStoreSubs, appStoreSubsDb) : appStoreSubsDb;
  const storeSubs = appStoreSubs + playStoreSubs;
  const allPaying = totalSubs + storeSubs;
  const rcActiveTrials = (rcStats?.trialUsers || []).filter(
    (t) => !t.is_cancelled && t.subscription_source !== 'stripe'
  ).length;
  const rcDbPaid = appStoreSubsDb + playStoreSubs;
  const rcPaidDelta = rcLivePaid - rcDbPaid;
  const rcTrialDelta = rcLiveTrials - rcActiveTrials;
  const rcPaidDivergence = (rcLivePaid > 0 || rcDbPaid > 0) && rcPaidDelta !== 0;
  const rcTrialDivergence = (rcLiveTrials > 0 || rcActiveTrials > 0) && rcTrialDelta !== 0;
  const stripeTrials = stripeStats?.stripe.trialingSubscriptions || 0;
  const appTrials = rcLiveTrials > 0 ? rcLiveTrials : rcActiveTrials;
  const totalTrials = appTrials + stripeTrials;

  /*
    The history line: one point a day from the snapshots, each rail
    forward-filled across a day the other function has not written yet, and
    today's point replaced by the live figure so the line ends where the
    number above it says it does.
  */
  const mrrPoints = useMemo<MrrPoint[]>(() => {
    const rows = series?.metric_daily ?? [];
    let lastStripe: number | null = null;
    let lastRc: number | null = null;
    const pts: MrrPoint[] = [];
    for (const r of rows) {
      if (r.stripe_mrr != null) lastStripe = Number(r.stripe_mrr);
      if (r.rc_mrr != null) lastRc = Number(r.rc_mrr);
      if (lastStripe == null || lastRc == null) continue;
      pts.push({ day: r.day, stripe: lastStripe, rc: lastRc, total: lastStripe + lastRc });
    }
    if (pts.length && stripeStats && rcLoaded) {
      const today = series?.today_date;
      const last = pts[pts.length - 1];
      const live = { day: today ?? last.day, stripe: stripeMrr, rc: rcMrr, total: mrr };
      if (last.day === live.day) pts[pts.length - 1] = live;
      else pts.push(live);
    }
    return pts;
  }, [series, stripeStats, rcLoaded, stripeMrr, rcMrr, mrr]);

  // The range switch drives every comparison on the page, not just the chart.
  const mrrThen = mrrPoints.length > range ? mrrPoints[mrrPoints.length - 1 - range].total : null;
  const mrrDelta = mrrThen != null ? mrr - mrrThen : null;
  const mrrDeltaPct = mrrThen ? Math.round((mrrDelta! / mrrThen) * 100) : null;

  /*
    Who pays: paying subscriptions by plan across both rails, and what each
    plan is worth at list price. Stripe reports tier counts; the stores
    report tiers per store. Yearly plans fold into their monthly plan.
  */
  const plans = useMemo(() => {
    const counts: Record<string, number> = {};
    const add = (tier: string, n: number) => {
      if (!n || tier === 'trial') return;
      const k = planKey(tier);
      counts[k] = (counts[k] ?? 0) + n;
    };
    for (const [t, n] of Object.entries(stripeStats?.stripe.tierCounts ?? {})) add(t, n);
    for (const src of ['app_store', 'play_store']) {
      for (const [t, n] of Object.entries(rcStats?.tiersBySource?.[src] ?? {})) add(t, n);
    }
    return PLANS.map((p) => ({ ...p, count: counts[p.key] ?? 0 })).filter((p) => p.count > 0);
  }, [stripeStats, rcStats]);

  /* ── derived: figures ───────────────────────────────── */

  const metric = series?.metric_daily ?? [];
  const last31 = metric.slice(-31);
  const window = metric.slice(-(range + 1));
  const sumRails = (a: number | null, b: number | null) =>
    a == null && b == null ? null : (a ?? 0) + (b ?? 0);
  const payingSeries = window
    .map((r) => sumRails(r.stripe_paying, r.rc_paying))
    .filter((v): v is number => v != null);
  const trialSeries = window
    .map((r) => sumRails(r.stripe_trialing, r.rc_trialing))
    .filter((v): v is number => v != null);
  const first = window.length === range + 1 ? window[0] : null;
  const payingThen =
    first && first.stripe_paying != null && first.rc_paying != null
      ? sumRails(first.stripe_paying, first.rc_paying)
      : null;
  const trialsThen =
    first && first.stripe_trialing != null && first.rc_trialing != null
      ? sumRails(first.stripe_trialing, first.rc_trialing)
      : null;
  /*
    Before 3 August the snapshots hold Stripe only, so a 90-day comparison
    falls back to the Stripe rail and says so rather than showing nothing.
  */
  const stripeOnlyThen =
    payingThen == null && first && first.stripe_paying != null ? first.stripe_paying : null;
  const payingDelta =
    payingThen != null
      ? allPaying - payingThen
      : stripeOnlyThen != null
        ? totalSubs - stripeOnlyThen
        : null;
  const payingDeltaLabel = payingThen != null ? `in ${range} days` : `on Stripe in ${range} days`;
  const stripeTrialsThen =
    trialsThen == null && first && first.stripe_trialing != null ? first.stripe_trialing : null;
  const trialsDelta =
    trialsThen != null
      ? totalTrials - trialsThen
      : stripeTrialsThen != null
        ? stripeTrials - stripeTrialsThen
        : null;
  const trialsDeltaLabel = trialsThen != null ? `in ${range} days` : `on Stripe in ${range} days`;

  const dau = series?.dau_daily ?? [];
  const dauLast30 = dau.slice(-30).map((d) => d.n);
  const dauAvg = dauLast30.length
    ? Math.round(dauLast30.reduce((t, n) => t + n, 0) / dauLast30.length)
    : null;
  const signupsDaily = series?.signups_daily ?? [];
  const signupsWindow = signupsDaily.slice(-range).map((d) => d.n);
  const signupsPrevWindow = signupsDaily.slice(-2 * range, -range).map((d) => d.n);
  const signupsInRange = signupsWindow.reduce((t, n) => t + n, 0);
  const signupsPrev = signupsPrevWindow.reduce((t, n) => t + n, 0);
  const signupsPct =
    signupsPrevWindow.length === range && signupsPrev > 0
      ? Math.round(((signupsInRange - signupsPrev) / signupsPrev) * 100)
      : null;

  /*
    Trial conversion: of trials that ended, the share that went on to pay.
    Stripe settles "paid" against invoices and buckets by the month the
    trial ended; RevenueCat buckets by the month the trial started and
    excludes trials still pending. Both are folded into one rate per month
    and one 90-day rate; the tile says which rails it covers.
  */
  const conv = useMemo(() => {
    const st = stripeStats?.trials?.conversion;
    const rc = rcStats?.churn?.trials;
    if (!st) return null;
    const months: Record<string, { num: number; den: number }> = {};
    for (const m of st.months) {
      months[m.month] ??= { num: 0, den: 0 };
      months[m.month].num += m.billed;
      months[m.month].den += m.ended;
    }
    let rcNum = 0;
    let rcDen = 0;
    for (const m of rc ?? []) {
      months[m.month] ??= { num: 0, den: 0 };
      months[m.month].num += m.conversions;
      months[m.month].den += m.conversions + m.expirations;
      rcNum += m.conversions;
      rcDen += m.conversions + m.expirations;
    }
    const keys = Object.keys(months).sort();
    const thisMonth = new Date().toISOString().slice(0, 7);
    const complete = keys.filter((k) => k < thisMonth && months[k].den > 0).slice(-3);
    const num = st.d90.billed + rcNum;
    const den = st.d90.ended + rcDen;
    return {
      rate: pct(num, den),
      num,
      den,
      railsLabel: rc ? '' : 'Stripe trials only · ',
      months: complete.map((k) => ({
        key: k,
        label: monthShort(k),
        value: pct(months[k].num, months[k].den) ?? 0,
      })),
    };
  }, [stripeStats, rcStats]);

  /*
    Churn: paid at least one real invoice, then left. Reported for THIS month
    so far, against last month. A month-to-date rate on the 2nd is not
    comparable with a finished month, so the tile also carries the pace the
    month is on, and — once the daily snapshots cover it — the rate at the
    same point last month, which is the honest like-for-like.
  */
  const churn = useMemo(() => {
    const st = stripeStats?.trials?.churn;
    if (!st) return null;
    const rc = rcStats?.churn?.months ?? null;
    const byMonth: Record<string, { start: number; churned: number; lost: number }> = {};
    for (const m of st.months) {
      byMonth[m.month] = { start: m.payingAtStart, churned: m.churned, lost: m.mrrLost };
    }
    for (const m of rc ?? []) {
      const row = byMonth[m.month];
      if (!row) continue;
      row.start += m.payingAtStart;
      row.churned += m.churned;
    }
    const todayIso = series?.today_date ?? new Date().toISOString().slice(0, 10);
    const thisMonth = todayIso.slice(0, 7);
    const keys = Object.keys(byMonth)
      .filter((k) => k <= thisMonth && byMonth[k].start > 0)
      .sort();
    const current = keys[keys.length - 1];
    const prev = keys[keys.length - 2];
    if (!current) return null;
    const cur = byMonth[current];
    const prevM = prev ? byMonth[prev] : null;
    const dayOfMonth = Number(todayIso.slice(8, 10));
    const [y, mo] = current.split('-').map(Number);
    const daysInMonth = new Date(Date.UTC(y, mo, 0)).getUTCDate();
    const isCurrentMonth = current === thisMonth;
    const rate = pct(cur.churned, cur.start);
    const pace =
      isCurrentMonth && cur.start > 0 && dayOfMonth > 0
        ? Math.round((cur.churned / cur.start) * (daysInMonth / dayOfMonth) * 1000) / 10
        : null;
    const prevRate = prevM ? pct(prevM.churned, prevM.start) : null;

    // Same point last month, from the daily snapshots — only when every day is covered.
    let prevSamePoint: number | null = null;
    if (prev && prevM && isCurrentMonth) {
      const rows = metric.filter(
        (r) => r.day.startsWith(prev) && Number(r.day.slice(8, 10)) <= dayOfMonth
      );
      const covered =
        rows.length === dayOfMonth &&
        rows.every((r) => r.stripe_churned_paid != null && (!rc || r.rc_churned_paid != null));
      if (covered) {
        const n = rows.reduce(
          (t, r) => t + (r.stripe_churned_paid ?? 0) + (r.rc_churned_paid ?? 0),
          0
        );
        prevSamePoint = pct(n, prevM.start);
      }
    }
    const daily = last31
      .map((r) =>
        r.stripe_churned_paid == null && r.rc_churned_paid == null
          ? null
          : (r.stripe_churned_paid ?? 0) + (r.rc_churned_paid ?? 0)
      )
      .filter((v): v is number => v != null);
    return {
      month: current,
      isCurrentMonth,
      rate,
      pace,
      churned: cur.churned,
      start: cur.start,
      prevMonth: prev ?? null,
      prevRate,
      prevChurned: prevM?.churned ?? null,
      prevSamePoint,
      stripeOnly: !rc,
      daily,
    };
  }, [stripeStats, rcStats, series, metric, last31]);

  /*
    Why MRR moved. Stripe's half comes from the invoice walk (first real
    invoice = new, ended after paying = churned); the stores' half from
    RevenueCat's MRR movement chart. This month so far and last month.
  */
  const movement = useMemo(() => {
    const st = stripeStats?.trials?.churn?.months ?? [];
    const rc = rcStats?.churn?.movement ?? null;
    if (st.length === 0) return null;
    const rows = st.slice(-2).map((m) => {
      const r = rc?.find((x) => x.month === m.month);
      const added = (m.newMrr ?? 0) + (r ? r.newMrr + r.resubMrr + r.expansionMrr : 0);
      const lost = m.mrrLost + (r ? r.churnedMrr + r.contractionMrr : 0);
      return {
        month: m.month,
        complete: m.complete,
        added: Math.round(added * 100) / 100,
        lost: Math.round(lost * 100) / 100,
        net: Math.round((added - lost) * 100) / 100,
        newCount: m.newCount ?? null,
        churned: m.churned,
        byPlan: Object.entries(m.byPlan ?? {})
          .map(([tier, v]) => ({ tier, ...v }))
          .sort((a, b) => b.mrrLost - a.mrrLost),
      };
    });
    return { rows, storesIncluded: !!rc };
  }, [stripeStats, rcStats]);

  /* ── derived: lists ─────────────────────────────────── */

  const now = new Date();
  const in24h = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  const in48h = new Date(now.getTime() + 48 * 60 * 60 * 1000);
  const in7d = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  const activeTrialUsers = (rcStats?.trialUsers || []).filter(
    (t) => !t.is_cancelled && t.trial_end
  );
  const expiringToday = activeTrialUsers.filter((t) => parseISO(t.trial_end!) <= in24h).length;
  const expiringTomorrow = activeTrialUsers.filter((t) => {
    const end = parseISO(t.trial_end!);
    return end > in24h && end <= in48h;
  }).length;
  const expiringThisWeek = activeTrialUsers.filter((t) => {
    const end = parseISO(t.trial_end!);
    return end > in48h && end <= in7d;
  }).length;
  const expiringTotal = expiringToday + expiringTomorrow + expiringThisWeek;
  const expiringSummary = [
    expiringToday > 0 && `${expiringToday} today`,
    expiringTomorrow > 0 && `${expiringTomorrow} tomorrow`,
    expiringThisWeek > 0 && `${expiringThisWeek} this week`,
  ]
    .filter(Boolean)
    .join(' · ');

  const abandonedCheckouts =
    baseUsers?.filter((u) => u.stripe_customer_id && !u.subscribed && !u.free_access_granted) || [];
  const weekAgoMs = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const abandonedThisWeek = abandonedCheckouts.filter(
    (u) => new Date(u.created_at).getTime() > weekAgoMs
  );

  const needsQueue = [
    expiringTotal > 0 && {
      key: 'trials',
      title: 'Trials ending',
      count: expiringTotal,
      detail: expiringSummary,
      action: 'Open trials',
      onClick: () => navigate('/admin/trials?status=ending_today'),
    },
    (pendingCounts?.unreadMessages ?? 0) > 0 && {
      key: 'messages',
      title: 'Unread messages',
      count: pendingCounts?.unreadMessages ?? 0,
      detail: 'Someone is waiting on a reply from you',
      action: 'Open inbox',
      onClick: () => navigate('/admin/user-messages'),
    },
    abandonedThisWeek.length > 0 && {
      key: 'abandoned',
      title: 'Abandoned checkouts',
      count: abandonedThisWeek.length,
      detail: `Started this week, never subscribed · ${abandonedCheckouts.length} all time`,
      action: 'See who',
      onClick: () => navigate('/admin/incomplete-signup'),
    },
  ].filter(Boolean) as Array<{
    key: string;
    title: string;
    count: number;
    detail: string;
    action: string;
    onClick: () => void;
  }>;

  const liveUsers = (onlineUsers ?? []).filter(
    (a) => new Date(a.last_seen).getTime() > Date.now() - 5 * 60 * 1000
  );
  const liveHotspots = Object.entries(
    liveUsers.reduce<Record<string, number>>((acc, a) => {
      const area = (a.current_page?.replace(/^\//, '').split('/')[0] || 'Home').trim();
      const label = area.charAt(0).toUpperCase() + area.slice(1).replace(/-/g, ' ');
      acc[label] = (acc[label] || 0) + 1;
      return acc;
    }, {})
  ).sort((a, b) => b[1] - a[1]);
  const hotspotTop = liveHotspots.slice(0, 3);
  const hotspotRest = liveHotspots.slice(3).reduce((t, [, n]) => t + n, 0);

  const weekSignups = (baseUsers ?? []).filter((u) => new Date(u.created_at).getTime() > weekAgoMs);
  const weekFunnel = {
    paying: weekSignups.filter((u) => u.subscribed).length,
    abandoned: weekSignups.filter((u) => !u.subscribed && u.stripe_customer_id).length,
    setUp: weekSignups.filter(
      (u) => !u.subscribed && !u.stripe_customer_id && u.onboarding_completed
    ).length,
    never: weekSignups.filter(
      (u) => !u.subscribed && !u.stripe_customer_id && !u.onboarding_completed
    ).length,
  };
  const SIGNUP_STATES = {
    paying: { label: 'Trial or paying', color: GOOD },
    abandoned: { label: 'Started checkout', color: BLUE },
    setUp: { label: 'Set up', color: AQUA },
    never: { label: 'Never finished setup', color: SERIOUS },
  };
  const signupState = (u: AdminUser) =>
    u.subscribed
      ? SIGNUP_STATES.paying
      : u.stripe_customer_id
        ? SIGNUP_STATES.abandoned
        : u.onboarding_completed
          ? SIGNUP_STATES.setUp
          : SIGNUP_STATES.never;

  /*
    Unread first, oldest of those at the top — the one you have kept waiting
    longest is the one to answer. Read messages follow, newest first, so the
    list still shows what the conversation looked like.
  */
  const inboxSorted = [...(supportMessages ?? [])].sort((a, b) => {
    const ua = a.read_at ? 1 : 0;
    const ub = b.read_at ? 1 : 0;
    if (ua !== ub) return ua - ub;
    const ta = new Date(a.created_at).getTime();
    const tb = new Date(b.created_at).getTime();
    return ua === 0 ? ta - tb : tb - ta;
  });
  const unreadSupportCount = inboxSorted.filter((m) => !m.read_at).length;
  const oldestUnread = inboxSorted.find((m) => !m.read_at);
  const oldestWait = oldestUnread ? shortAgo(oldestUnread.created_at) : null;


  const findUser = (id: string) => baseUsers?.find((u) => u.id === id) ?? null;
  const openUser = (id: string) => {
    const u = findUser(id);
    if (u) setSelectedUser(u);
  };

  const rcSynced = rcUpdatedAt
    ? new Date(rcUpdatedAt).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
    : null;
  const nowTime = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  const nowLong = `${now.toLocaleDateString('en-GB', { weekday: 'long' })} ${now.getDate()} ${MONTHS_LONG[now.getMonth()]}`;
  const nowShort = `${now.toLocaleDateString('en-GB', { weekday: 'short' })} ${now.getDate()} ${MONTHS_SHORT[now.getMonth()]}`;

  /*
    No full-page gate. Stripe answers in 15–20 s on a cold start; everything
    from Postgres is ready in under a second. Each panel renders as its data
    lands and says "loading" where it is still waiting.
  */
  const stripePending = stripeLoading || !stripeStats;

  /* ── lists (rendered once for desktop, once behind the mobile switch) ── */

  const limit = (key: ListKey, n: number) => (expanded[key] ? undefined : n);
  const toggle = (key: ListKey) => setExpanded((e) => ({ ...e, [key]: !e[key] }));
  const showAll = (key: ListKey, total: number, n: number) =>
    total > n ? (expanded[key] ? 'Show fewer' : `Show all ${total}`) : undefined;

  const liveList = (
    <div className="flex min-w-0 flex-col">
      <SectionHead
        title="On the app now"
        meta={
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ background: GOOD }} />
            {liveUsers.length} online
          </span>
        }
        action={showAll('live', liveUsers.length, 5)}
        onAction={() => toggle('live')}
      />
      {liveUsers.length === 0 ? (
        <EmptyState
          title="Nobody on right now"
          description="People appear here while they use the app."
        />
      ) : (
        <>
          <div className="pb-3.5 pt-1">
            <StackBar
              segments={liveHotspots.map(([label, n], i) => ({
                value: n,
                color: BLUE_RAMP[Math.min(i, BLUE_RAMP.length - 1)],
                label: `${label} ${n}`,
              }))}
            />
            <Legend
              items={[
                ...hotspotTop.map(([label, n], i) => ({ label, value: n, color: BLUE_RAMP[i] })),
                ...(hotspotRest > 0
                  ? [{ label: 'Elsewhere', value: hotspotRest, color: BLUE_RAMP[4] }]
                  : []),
              ]}
            />
          </div>
          {liveUsers.slice(0, limit('live', 5)).map((a) => {
            const di = a.device_info as { isMobile?: boolean; platform?: string } | null;
            const platform = di?.platform || '';
            const device =
              platform === 'iPhone'
                ? 'iPhone'
                : platform === 'iPad'
                  ? 'iPad'
                  : platform === 'MacIntel'
                    ? 'Mac'
                    : platform === 'Win32'
                      ? 'Windows'
                      : di?.isMobile
                        ? 'Mobile'
                        : 'Web';
            const DeviceIcon = di?.isMobile ? Smartphone : Monitor;
            const area = (a.current_page?.replace(/^\//, '').split('/')[0] || 'Home').trim();
            const areaLabel = area.charAt(0).toUpperCase() + area.slice(1).replace(/-/g, ' ');
            const sessionMin = a.session_started_at
              ? Math.max(
                  0,
                  Math.floor((Date.now() - new Date(a.session_started_at).getTime()) / 60000)
                )
              : 0;
            const onFor =
              sessionMin < 1
                ? 'just opened'
                : sessionMin >= 60
                  ? `on for ${Math.floor(sessionMin / 60)} h`
                  : `on for ${sessionMin} min`;
            return (
              <PersonRow
                key={a.user_id}
                initials={getInitials(a.profiles?.full_name ?? null)}
                name={a.profiles?.full_name || 'Unknown'}
                sub={`${areaLabel} · ${onFor}`}
                online
                cells={
                  <span className="inline-flex items-center gap-1.5 whitespace-nowrap text-[12px] text-white sm:w-[84px]">
                    <DeviceIcon className="h-3.5 w-3.5 shrink-0" />
                    {device}
                  </span>
                }
                onClick={findUser(a.user_id) ? () => openUser(a.user_id) : undefined}
              />
            );
          })}
        </>
      )}
    </div>
  );

  const signupsList = (
    <div className="flex min-w-0 flex-col">
      <SectionHead
        title="Signups this week"
        meta={`${weekSignups.length} people`}
        action={showAll('signups', Math.min(stats?.recentSignups.length ?? 0, 50), 5)}
        onAction={() => toggle('signups')}
      />
      <div className="pb-3.5 pt-1">
        <StackBar
          segments={[
            {
              value: weekFunnel.paying,
              color: SIGNUP_STATES.paying.color,
              label: 'Trial or paying',
            },
            { value: weekFunnel.setUp, color: SIGNUP_STATES.setUp.color, label: 'Set up' },
            {
              value: weekFunnel.abandoned,
              color: SIGNUP_STATES.abandoned.color,
              label: 'Started checkout',
            },
            {
              value: weekFunnel.never,
              color: SIGNUP_STATES.never.color,
              label: 'Never finished setup',
            },
          ]}
        />
        <Legend
          items={[
            {
              label: 'Trial or paying',
              value: weekFunnel.paying,
              color: SIGNUP_STATES.paying.color,
            },
            ...(weekFunnel.setUp > 0
              ? [{ label: 'Set up', value: weekFunnel.setUp, color: SIGNUP_STATES.setUp.color }]
              : []),
            {
              label: 'Started checkout',
              value: weekFunnel.abandoned,
              color: SIGNUP_STATES.abandoned.color,
            },
            {
              label: 'Never finished setup',
              value: weekFunnel.never,
              color: SIGNUP_STATES.never.color,
            },
          ]}
        />
      </div>
      {(stats?.recentSignups ?? []).slice(0, limit('signups', 5)).map((u) => {
        const st = signupState(u);
        return (
          <PersonRow
            key={u.id}
            initials={getInitials(u.full_name)}
            name={u.full_name || 'Unknown'}
            sub={`${signupWhen(u.created_at)}${u.email ? ` · ${u.email}` : ''}`}
            cells={<StateDot label={st.label} color={st.color} />}
            onClick={() => setSelectedUser(u)}
          />
        );
      })}
    </div>
  );

  const inboxList = (
    <div className="flex min-w-0 flex-col">
      <SectionHead
        title="Support inbox"
        meta={
          unreadSupportCount > 0 ? (
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: ACCENT }} />
              {unreadSupportCount} unread
            </span>
          ) : (
            'nothing unread'
          )
        }
        action="All messages"
        onAction={() => navigate('/admin/user-messages')}
      />
      <div className="flex flex-wrap items-baseline gap-x-7 gap-y-1 pb-3.5 pt-1 text-[12px] text-white">
        <span>
          <b className="text-[20px] font-semibold tracking-[-0.02em]">
            {pendingCounts?.unreadMessages ?? 0}
          </b>{' '}
          waiting on you
        </span>
        {oldestWait && (
          <span>
            longest unanswered <b className="font-semibold">{oldestWait}</b>
          </span>
        )}
      </div>
      {inboxSorted.length === 0 ? (
        <EmptyState title="Inbox clear" description="Nothing is waiting on a reply." />
      ) : (
        inboxSorted
          .slice(0, limit('inbox', 5))
          .map((m) => (
            <PersonRow
              key={m.id}
              initials={getInitials(m.sender?.full_name ?? null)}
              name={m.sender?.full_name || 'Unknown'}
              sub={
                m.subject && m.subject !== 'Support Request'
                  ? `${m.subject} — ${m.message}`
                  : m.message
              }
              unread={!m.read_at}
              cells={<Money>{shortAgo(m.created_at)}</Money>}
              onClick={() =>
                setThread({ id: m.sender_id, name: m.sender?.full_name || 'Unknown' })
              }
            />
          ))
      )}
    </div>
  );

  const leavingList =
    churnedUsers && churnedUsers.length > 0 ? (
      <div className="flex min-w-0 flex-col">
        <SectionHead
          title="Cancelled, still have access"
          meta="the only people you can still talk round"
          action={showAll('leaving', churnedUsers.length, 5)}
          onAction={() => toggle('leaving')}
        />
        <div className="pb-1" />
        {churnedUsers.slice(0, limit('leaving', 5)).map((u) => {
          const endsAt = u.trial_end ? parseISO(u.trial_end) : null;
          const stillHasAccess = !!endsAt && endsAt.getTime() > Date.now();
          const remaining = endsAt ? formatDistanceToNow(endsAt).replace('about ', '') : null;
          const urgent = stillHasAccess && endsAt!.getTime() - Date.now() < 24 * 60 * 60 * 1000;
          return (
            <PersonRow
              key={u.id}
              initials={getInitials(u.full_name)}
              name={u.full_name || 'Unknown'}
              sub={`${tierLabel(u.subscription_tier || u.role)} · App Store or Play Store`}
              cells={
                <span
                  className="whitespace-nowrap text-[13px] font-semibold tabular-nums"
                  style={{ color: urgent ? SERIOUS : '#ffffff' }}
                >
                  {stillHasAccess && remaining ? `${remaining} left` : 'Access ended'}
                </span>
              }
              onClick={findUser(u.id) ? () => openUser(u.id) : undefined}
            />
          );
        })}
      </div>
    ) : null;

  const listOptions: Array<{ key: ListKey; label: string; count?: number; mark?: boolean }> = [
    { key: 'live', label: 'Live', count: liveUsers.length },
    { key: 'signups', label: 'Signups', count: weekSignups.length },
    {
      key: 'inbox',
      label: 'Inbox',
      count: pendingCounts?.unreadMessages ?? 0,
      mark: unreadSupportCount > 0,
    },
    ...(leavingList
      ? [{ key: 'leaving' as ListKey, label: 'Leaving', count: churnedUsers?.length ?? 0 }]
      : []),
  ];
  const mobileLists: Record<ListKey, ReactNode> = {
    live: liveList,
    signups: signupsList,
    inbox: inboxList,
    leaving: leavingList,
  };

  /* ── today, against yesterday ───────────────────────── */

  const todayFigs: Array<{
    key: keyof TodayUsage;
    label: string;
    sub?: (t: TodayUsage) => string;
    to?: string;
    format?: (n: number) => string;
  }> = [
    { key: 'active_people', label: 'people active', to: '/admin/users?filter=active' },
    { key: 'signups', label: 'signed up', to: '/admin/users' },
    { key: 'certs', label: 'certificates' },
    { key: 'quotes', label: 'quotes' },
    {
      key: 'mock_exams',
      label: 'mock exam attempts',
      sub: (t) => `by ${t.mock_exam_people} ${t.mock_exam_people === 1 ? 'person' : 'people'}`,
    },
    {
      key: 'study_minutes',
      label: 'study minutes',
      sub: (t) => `by ${t.learners} ${t.learners === 1 ? 'learner' : 'learners'}`,
      format: (n) => n.toLocaleString('en-GB'),
    },
    { key: 'ai_chats', label: 'AI chats' },
    { key: 'rams', label: 'RAMS documents' },
  ];

  const movementBlock = movement ? (
    <div className="text-white">
      <div className="flex items-baseline justify-between gap-3">
        <div className="text-[13px] font-semibold">Why it moved</div>
        <div className="text-[12px]">{movement.storesIncluded ? 'both rails' : 'Stripe only'}</div>
      </div>
      <div className="mt-2.5 grid grid-cols-2 gap-x-6 gap-y-3">
        {movement.rows.map((r) => {
          const scale = Math.max(r.added, r.lost, 1);
          return (
            <div key={r.month} className="min-w-0">
              <div className="text-[12px] font-semibold">
                {monthName(r.month)}
                {r.complete ? '' : ' so far'}
              </div>
              <div className="mt-1.5 flex items-center gap-2 text-[12px]">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.08]">
                  <div
                    className="h-1.5 rounded-full"
                    style={{ width: `${(r.added / scale) * 100}%`, background: GOOD }}
                  />
                </div>
                <span className="w-[72px] text-right tabular-nums">+{gbp(r.added)}</span>
              </div>
              <div className="mt-1 flex items-center gap-2 text-[12px]">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.08]">
                  <div
                    className="h-1.5 rounded-full"
                    style={{ width: `${(r.lost / scale) * 100}%`, background: SERIOUS }}
                  />
                </div>
                <span className="w-[72px] text-right tabular-nums">−{gbp(r.lost)}</span>
              </div>
              <div className="mt-1.5 text-[12px]">
                net{' '}
                <b className="font-semibold tabular-nums">
                  {r.net >= 0 ? '+' : '−'}
                  {gbp(Math.abs(r.net))}
                </b>
                {r.newCount != null && ` · ${r.newCount} started paying`}
                {` · ${r.churned} left`}
              </div>
            </div>
          );
        })}
      </div>
      {(() => {
        const cur = movement.rows[movement.rows.length - 1];
        if (!cur || cur.byPlan.length === 0) return null;
        return (
          <div className="mt-3 text-[12px] leading-[18px]">
            <span className="font-semibold">Who left on Stripe, {monthName(cur.month)}:</span>{' '}
            {cur.byPlan.map((p) => `${tierLabel(p.tier)} ${p.count} · ${gbp(p.mrrLost)}`).join(' · ')}
          </div>
        );
      })()}
    </div>
  ) : null;

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <PageFrame className="space-y-5 sm:space-y-6">
        {/* Title row */}
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h1 className="text-[22px] font-semibold leading-7 tracking-[-0.02em] text-white lg:text-[26px] lg:leading-[30px]">
              Overview
            </h1>
            <div className="mt-0.5 flex items-center gap-2 text-[12px] text-white">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: GOOD }} />
              <span className="hidden sm:inline">
                Live · {nowLong}, {nowTime}
              </span>
              <span className="sm:hidden">
                Live · {nowShort}, {nowTime}
              </span>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2.5">
            <Segmented<Range>
              options={[
                { key: 7, label: '7d' },
                { key: 30, label: '30d' },
                { key: 90, label: '90d' },
              ]}
              value={range}
              onChange={setRange}
            />
            <IconButton
              onClick={handleRefresh}
              disabled={isFetching || isRefreshing}
              aria-label="Refresh"
              className="hidden h-9 w-9 lg:flex"
            >
              <RefreshCw
                className={cn('h-4 w-4', (isFetching || isRefreshing) && 'animate-spin')}
              />
            </IconButton>
          </div>
        </div>

        {/* The money: figure, history, and where it comes from */}
        <Panel tone="accent">
          <div className="grid gap-5 lg:grid-cols-[380px_minmax(0,1fr)] lg:grid-rows-[auto_1fr] lg:gap-x-10 lg:gap-y-0">
            <div className="order-1 flex min-w-0 flex-col gap-2 text-white lg:order-none">
              <div className="text-[13px] font-medium leading-4">Monthly recurring revenue</div>
              <button
                onClick={() => navigate('/admin/revenue')}
                className="touch-manipulation text-left text-[44px] font-semibold leading-[46px] tracking-[-0.03em] transition-opacity hover:opacity-80 lg:text-[56px] lg:leading-[56px]"
              >
                {stripePending ? (
                  <span className="opacity-40">£—</span>
                ) : (
                  gbp(rcLoaded ? mrr : stripeMrr)
                )}
              </button>
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[13px]">
                {stripePending ? (
                  <span>Stripe is answering, usually 15 seconds…</span>
                ) : !rcLoaded ? (
                  <span>Stripe only · stores loading</span>
                ) : mrrDelta != null ? (
                  <>
                    <Delta
                      dir={mrrDelta > 0 ? 'up' : mrrDelta < 0 ? 'down' : 'flat'}
                      tone={mrrDelta > 0 ? 'good' : mrrDelta < 0 ? 'bad' : 'neutral'}
                      size={13}
                    >
                      {gbp(Math.abs(mrrDelta))}
                    </Delta>
                    <span>
                      {mrrDeltaPct != null &&
                        `${mrrDeltaPct > 0 ? '+' : ''}${mrrDeltaPct}% in ${range} days · `}
                      {gbp((mrr * 12) / 1000, 1)}k a year
                    </span>
                  </>
                ) : (
                  <span>{gbp((mrr * 12) / 1000, 1)}k a year</span>
                )}
              </div>
            </div>
            <div className="order-2 flex min-w-0 flex-col justify-between lg:order-none lg:row-span-2">
              <div className="-mx-2 lg:mx-0">
                <div className="hidden lg:block">
                  <MrrChart points={mrrPoints} range={range} height={300} />
                </div>
                <div className="lg:hidden">
                  <MrrChart points={mrrPoints} range={range} height={190} compact />
                </div>
              </div>
              <div className="mt-3 hidden border-t border-white/[0.1] pt-3 lg:block">
                {movementBlock}
              </div>
            </div>
            <div className="order-3 flex min-w-0 flex-col text-white lg:order-none">
              <div className="mt-0 lg:mt-2">
                <StackBar
                  segments={[
                    { value: stripeMrr, color: BLUE, label: 'Stripe' },
                    { value: rcMrr, color: AQUA, label: 'App Store & Play Store' },
                  ]}
                  height={8}
                />
                <div className="mt-2.5 flex flex-col gap-1.5 whitespace-nowrap text-[12px] sm:flex-row sm:gap-5">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-[2px]" style={{ background: BLUE }} />
                    Stripe <b className="font-semibold tabular-nums">{gbp(stripeMrr)}</b> ·{' '}
                    {totalSubs} paying
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-[2px]" style={{ background: AQUA }} />
                    App Store &amp; Play{' '}
                    {rcLoaded ? (
                      <>
                        <b className="font-semibold tabular-nums">{gbp(rcMrr)}</b> · {storeSubs}{' '}
                        paying
                      </>
                    ) : (
                      'loading'
                    )}
                  </span>
                </div>
              </div>

              {plans.length > 0 && (
                <div className="mt-4 border-t border-white/[0.1] pt-4">
                  <div className="flex items-baseline justify-between gap-3">
                    <div className="text-[13px] font-semibold">Who pays</div>
                    <div className="text-[12px]">{allPaying} paying, by plan</div>
                  </div>
                  <div className="mt-2.5">
                    <StackBar
                      segments={plans.map((p) => ({
                        value: p.count,
                        color: p.color,
                        label: `${p.label} ${p.count}`,
                      }))}
                    />
                  </div>
                  <div className="mt-2.5 grid grid-cols-2 gap-x-5 gap-y-2 text-[12px]">
                    {plans.map((p) => (
                      <span key={p.key} className="flex min-w-0 items-center gap-1.5">
                        <span
                          className="h-2 w-2 shrink-0 rounded-[2px]"
                          style={{ background: p.color }}
                        />
                        <span className="truncate">
                          {p.label} <b className="font-semibold tabular-nums">{p.count}</b>
                        </span>
                        {p.price > 0 && (
                          <span className="ml-auto whitespace-nowrap tabular-nums">
                            {gbp(p.count * p.price)}
                          </span>
                        )}
                      </span>
                    ))}
                  </div>
                  <div className="mt-1.5 text-[11px]">
                    Values at list price, yearly plans as monthly.
                  </div>
                </div>
              )}

              <div className="mt-4 border-t border-white/[0.1] pt-4 lg:hidden">{movementBlock}</div>
            </div>
          </div>
        </Panel>

        {/* Six figures */}
        <Panel padded={false} className="px-4 sm:px-5 lg:px-6">
          <div className="grid grid-cols-2 gap-x-4 lg:grid-cols-6 lg:gap-x-5 [&>*:nth-child(-n+4)]:border-b [&>*:nth-child(-n+4)]:border-white/[0.08] [&>*:nth-child(odd)]:border-r [&>*:nth-child(odd)]:border-white/[0.08] lg:[&>*:last-child]:border-r-0 lg:[&>*]:border-b-0 lg:[&>*]:border-r lg:[&>*]:border-white/[0.08]">
            <KpiTile
              label="Paying"
              value={stripePending ? '—' : allPaying}
              delta={
                payingDelta != null ? (
                  <Delta
                    dir={payingDelta >= 0 ? 'up' : 'down'}
                    tone={payingDelta >= 0 ? 'good' : 'bad'}
                  >
                    {Math.abs(payingDelta)} {payingDeltaLabel}
                  </Delta>
                ) : undefined
              }
              definition="Stripe + stores"
              viz={<Sparkline series={payingSeries} accent={BLUE} />}
              onClick={() => navigate('/admin/revenue')}
            />
            <KpiTile
              label="On trial"
              value={stripePending ? '—' : totalTrials}
              delta={
                trialsDelta != null ? (
                  <Delta
                    dir={trialsDelta >= 0 ? 'up' : 'down'}
                    tone={trialsDelta >= 0 ? 'good' : 'bad'}
                  >
                    {Math.abs(trialsDelta)} {trialsDeltaLabel}
                  </Delta>
                ) : undefined
              }
              definition={
                conv?.rate != null && totalTrials > 0
                  ? `≈ ${Math.round((totalTrials * conv.rate) / 100)} will pay if ${Math.round(conv.rate)}% holds`
                  : "next month's paying"
              }
              viz={<Sparkline series={trialSeries} accent={AQUA} />}
              onClick={() => navigate('/admin/trials')}
            />
            <KpiTile
              label="Trial conversion"
              value={conv?.rate != null ? `${Math.round(conv.rate)}%` : '—'}
              delta={
                conv && conv.months.length >= 2 ? (
                  <Delta
                    dir={
                      conv.months[conv.months.length - 1].value >= conv.months[0].value
                        ? 'up'
                        : 'down'
                    }
                    tone={
                      conv.months[conv.months.length - 1].value >= conv.months[0].value
                        ? 'good'
                        : 'bad'
                    }
                  >
                    from {Math.round(conv.months[0].value)}% in {monthName(conv.months[0].key)}
                  </Delta>
                ) : undefined
              }
              definition={
                conv
                  ? `${conv.railsLabel}of ${conv.den} trials that ended in 90 days, ${conv.num} paid`
                  : stripePending
                    ? 'loading Stripe…'
                    : 'computing from invoices…'
              }
              viz={<MonthBars items={conv?.months ?? []} />}
              onClick={() => navigate('/admin/trials')}
            />
            <KpiTile
              label={
                churn
                  ? `Churn, ${monthName(churn.month)}${churn.isCurrentMonth ? ' so far' : ''}`
                  : 'Churn'
              }
              value={churn?.rate != null ? `${churn.rate}%` : '—'}
              delta={
                churn && churn.prevMonth && churn.prevSamePoint != null && churn.rate != null ? (
                  <Delta
                    dir={churn.rate <= churn.prevSamePoint ? 'down' : 'up'}
                    tone={churn.rate <= churn.prevSamePoint ? 'good' : 'bad'}
                  >
                    vs {churn.prevSamePoint}% at this point in {monthName(churn.prevMonth)}
                  </Delta>
                ) : churn && churn.prevMonth && churn.prevRate != null && churn.pace != null ? (
                  <Delta
                    dir={churn.pace <= churn.prevRate ? 'down' : 'up'}
                    tone={churn.pace <= churn.prevRate ? 'good' : 'bad'}
                  >
                    on pace for {Math.round(churn.pace)}% · {monthName(churn.prevMonth)}{' '}
                    {churn.prevRate}%
                  </Delta>
                ) : churn && churn.prevMonth && churn.prevRate != null && churn.rate != null ? (
                  <Delta
                    dir={churn.rate <= churn.prevRate ? 'down' : 'up'}
                    tone={churn.rate <= churn.prevRate ? 'good' : 'bad'}
                  >
                    from {churn.prevRate}% in {monthName(churn.prevMonth)}
                  </Delta>
                ) : undefined
              }
              definition={
                churn
                  ? `${churn.churned} paid then left${churn.isCurrentMonth ? ` since 1 ${monthShort(churn.month)}` : ''}${
                      churn.prevMonth && churn.prevChurned != null
                        ? ` · ${churn.prevChurned} in ${monthName(churn.prevMonth)}`
                        : ''
                    }${churn.stripeOnly ? ' · Stripe only' : ''}`
                  : stripePending
                    ? 'loading Stripe…'
                    : 'computing from invoices…'
              }
              viz={<Sparkline series={churn?.daily ?? []} accent={SERIOUS} />}
              onClick={() => navigate('/admin/revenue')}
            />
            <KpiTile
              label="Active today"
              value={stats?.activeToday ?? 0}
              delta={
                dauAvg != null ? (
                  <Delta
                    dir={(stats?.activeToday ?? 0) >= dauAvg ? 'up' : 'down'}
                    tone={(stats?.activeToday ?? 0) >= dauAvg ? 'good' : 'bad'}
                  >
                    vs {dauAvg} a day avg
                  </Delta>
                ) : undefined
              }
              definition="seen in the last 24 h"
              viz={<Sparkline series={dauLast30} accent={VIOLET} />}
              onClick={() => navigate('/admin/users?filter=active')}
            />
            <KpiTile
              label={`Signups, ${range} days`}
              value={signupsInRange}
              delta={
                signupsPct != null ? (
                  <Delta
                    dir={signupsPct >= 0 ? 'up' : 'down'}
                    tone={signupsPct >= 0 ? 'good' : 'bad'}
                  >
                    {Math.abs(signupsPct)}% vs previous {range}
                  </Delta>
                ) : undefined
              }
              definition="accounts created"
              viz={<Sparkline series={signupsWindow} accent={MAGENTA} />}
              onClick={() => navigate('/admin/users')}
            />
          </div>
        </Panel>

        {/* Today against yesterday */}
        {series && (
          <Panel>
            <SectionHead
              title="What people did today"
              meta={
                <>
                  <span className="hidden sm:inline">
                    00:00 to {series.as_of} UK time · yesterday's full day for comparison
                  </span>
                  <span className="sm:hidden">to {series.as_of} UK · vs yesterday</span>
                </>
              }
              className="min-h-0"
            />
            <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-4 lg:grid-cols-9 lg:gap-x-5">
              {todayFigs.map((f) => {
                const t = series.today[f.key] as number;
                const y = series.yesterday?.[f.key] as number | undefined;
                const fmt = f.format ?? ((n: number) => String(n));
                const Tag = f.to ? 'button' : 'div';
                return (
                  <Tag
                    key={f.key}
                    onClick={f.to ? () => navigate(f.to!) : undefined}
                    className={cn(
                      'flex min-w-0 flex-col gap-0.5 text-left text-white',
                      f.to && 'touch-manipulation transition-opacity hover:opacity-80'
                    )}
                  >
                    <div className="text-[24px] font-semibold leading-7 tracking-[-0.02em]">
                      {fmt(t)}
                    </div>
                    <div className="text-[12px] leading-4">
                      {f.label}
                      {f.sub && (
                        <>
                          <br />
                          {f.sub(series.today)}
                        </>
                      )}
                    </div>
                    {y != null && (
                      <div className="mt-1 text-[11px] leading-4">
                        {t === y ? (
                          <span>same as yesterday</span>
                        ) : (
                          <Delta
                            dir={t > y ? 'up' : 'down'}
                            tone={t > y ? 'good' : 'neutral'}
                            size={11}
                          >
                            yesterday {fmt(y)}
                          </Delta>
                        )}
                      </div>
                    )}
                  </Tag>
                );
              })}
              {/* Errors, from Sentry — the one figure that says the app is well. */}
              {(() => {
                const link = sentry?.configured ? sentry.topIssues[0]?.permalink : undefined;
                const errs = sentry?.errors24h ?? null;
                const prev = sentry?.errorsPrev24h ?? null;
                const body = (
                  <>
                    <div className="text-[24px] font-semibold leading-7 tracking-[-0.02em]">
                      {errs != null ? errs.toLocaleString('en-GB') : '—'}
                    </div>
                    <div className="text-[12px] leading-4">errors, 24 h</div>
                    <div className="mt-1 text-[11px] leading-4">
                      {sentry && !sentry.configured ? (
                        <span>add SENTRY_AUTH_TOKEN</span>
                      ) : errs != null && prev != null ? (
                        errs === prev ? (
                          <span>same as yesterday</span>
                        ) : (
                          <Delta
                            dir={errs > prev ? 'up' : 'down'}
                            tone={errs > prev ? 'bad' : 'good'}
                            size={11}
                          >
                            yesterday {prev.toLocaleString('en-GB')}
                          </Delta>
                        )
                      ) : (
                        <span>loading</span>
                      )}
                    </div>
                  </>
                );
                const cls = 'flex min-w-0 flex-col gap-0.5 text-left text-white';
                return link ? (
                  <a
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                    className={cn(cls, 'touch-manipulation transition-opacity hover:opacity-80')}
                  >
                    {body}
                  </a>
                ) : (
                  <div className={cls}>{body}</div>
                );
              })()}
            </div>
          </Panel>
        )}

        {/* Needs you today */}
        {needsQueue.length > 0 && (
          <Panel>
            <SectionHead
              title="Needs you today"
              meta={`${needsQueue.length} open`}
              className="min-h-0"
            />
            <div className="mt-2 lg:mt-3 lg:grid lg:grid-cols-3 lg:gap-x-6">
              {needsQueue.map((item, i) => (
                <NeedsItem
                  key={item.key}
                  title={item.title}
                  detail={item.detail}
                  count={item.count}
                  action={item.action}
                  onClick={item.onClick}
                  last={i === needsQueue.length - 1}
                  urgent
                />
              ))}
            </div>
          </Panel>
        )}

        {/* Lists — panels on desktop, one at a time on a phone */}
        <div className="hidden gap-6 lg:grid lg:grid-cols-2">
          <Panel>{liveList}</Panel>
          <Panel>{signupsList}</Panel>
          <Panel>{inboxList}</Panel>
          {leavingList && <Panel>{leavingList}</Panel>}
        </div>
        <Panel className="lg:hidden">
          <Segmented<ListKey>
            options={listOptions}
            value={mobileList}
            onChange={setMobileList}
            size="lg"
          />
          <div className="mt-2">{mobileLists[mobileList]}</div>
        </Panel>

        {/* App Store & Play Store */}
        {rcLoaded && (
          <Panel className="text-white">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2.5">
              <div className="flex basis-full flex-col gap-0.5 sm:basis-auto sm:flex-row sm:items-baseline sm:gap-2.5">
                <h2 className="m-0 text-[15px] font-semibold leading-5">
                  App Store &amp; Play Store
                </h2>
                <span className="text-[12px]">
                  live from RevenueCat{rcSynced ? ` · ${rcSynced}` : ''}
                </span>
              </div>
              <div className="flex gap-6 text-[12px] lg:ml-auto">
                <button
                  onClick={() => navigate('/admin/subscriptions')}
                  className="min-h-11 touch-manipulation sm:min-h-0"
                >
                  Paid <b className="text-[14px] font-semibold tabular-nums">{rcLivePaid}</b>
                </button>
                <button
                  onClick={() => navigate('/admin/trials')}
                  className="min-h-11 touch-manipulation sm:min-h-0"
                >
                  Trials <b className="text-[14px] font-semibold tabular-nums">{rcLiveTrials}</b>
                </button>
                <span className="inline-flex min-h-11 items-center sm:min-h-0">
                  MRR <b className="ml-1 text-[14px] font-semibold tabular-nums">{gbp(rcMrr)}</b>
                </span>
              </div>
              {(rcPaidDivergence || rcTrialDivergence) && (
                <div className="flex basis-full items-start gap-2 text-[13px] leading-[18px]">
                  <AlertTriangle className="mt-px h-4 w-4 shrink-0" style={{ color: SERIOUS }} />
                  <span>
                    <b className="font-semibold">
                      {Math.abs(rcPaidDelta) + Math.abs(rcTrialDelta)} subscriptions aren't matched
                      to an account
                    </b>
                    {' · '}
                    {[
                      rcPaidDivergence &&
                        (rcPaidDelta > 0
                          ? `${rcPaidDelta} paid in RevenueCat, not in the database`
                          : `${Math.abs(rcPaidDelta)} stale paid in the database`),
                      rcTrialDivergence &&
                        (rcTrialDelta > 0
                          ? `${rcTrialDelta} on trial in RevenueCat, not in the database`
                          : `${Math.abs(rcTrialDelta)} stale trials in the database`),
                    ]
                      .filter(Boolean)
                      .join(', ')}
                    .{' '}
                    <button
                      onClick={syncing ? undefined : syncRC}
                      className="touch-manipulation font-semibold text-elec-yellow"
                    >
                      {syncing ? 'Syncing…' : 'Sync now'}
                    </button>
                  </span>
                </div>
              )}
            </div>
          </Panel>
        )}

        <UserManagementSheet
          user={selectedUser}
          open={!!selectedUser}
          onOpenChange={(open) => !open && setSelectedUser(null)}
        />
        <InboxThreadSheet
          partner={thread}
          open={!!thread}
          onOpenChange={(open) => !open && setThread(null)}
        />
      </PageFrame>
    </PullToRefresh>
  );
}
