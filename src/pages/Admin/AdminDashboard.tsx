/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { formatDistanceToNow, differenceInDays, parseISO } from 'date-fns';
import { toast } from '@/hooks/use-toast';
import { useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { RefreshCw, Smartphone, Monitor } from 'lucide-react';
import {
  getInitials,
  calculateEngagementScore,
  getScoreColor,
  SCORE_COLOR_MAP,
  formatTimeShort,
  daysSinceActive,
  DORMANT_DAYS,
  type EngagementData,
} from '@/utils/adminUtils';
import { AnimatedCounter } from '@/components/dashboard/AnimatedCounter';
import UserManagementSheet from '@/components/admin/UserManagementSheet';
import { useAdminUsersBase, AdminUser } from '@/hooks/useAdminUsersBase';
import PullToRefresh from '@/components/admin/PullToRefresh';
import {
  PageFrame,
  PageHero,
  StatStrip,
  ListCard,
  ListCardHeader,
  ListBody,
  ListRow,
  Avatar,
  Pill,
  PulseDot,
  Dot,
  GroupHeader,
  IconButton,
  EmptyState,
  LoadingBlocks,
  type Tone,
} from '@/components/admin/editorial';

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
    tierCounts: {
      founder: number;
      apprentice: number;
      electrician: number;
      employer: number;
      unknown: number;
    };
    trialingTierCounts: Record<string, number>;
    mrr: number;
    projectedMrr: number;
  };
  supabase: {
    subscribedUsers: number;
    tierCounts: Record<string, number>;
    withStripeId: number;
    withoutStripeId: number;
  };
  discrepancies: {
    inStripeNotSupabase: number;
    inSupabaseNotStripe: number;
  };
  subscriptions: StripeSubscriptionDetail[];
  trialingList: StripeSubscriptionDetail[];
  generatedAt: string;
}

/* ── engagement ring (kept local — used inside rows) ─────── */

/**
 * When somebody signed up, in words you can act on.
 *
 * "39 minutes ago" tells you it was recent but not whether it landed during
 * the working day — and it was hidden on mobile entirely. Day and clock time
 * show the pattern; a run of 11pm signups reads very differently from a run
 * at 8am. The relative form stays alongside it.
 */
function signupWhen(iso: string): { when: string; relative: string } {
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
        : d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });

  return {
    when: `${day}, ${time}`,
    relative: formatDistanceToNow(d, { addSuffix: true }).replace('about ', ''),
  };
}

function EngagementRing({ score, size = 28 }: { score: number; size?: number }) {
  const colour = getScoreColor(score);
  const { stroke } = SCORE_COLOR_MAP[colour];
  const r = (size - 3) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  return (
    <svg width={size} height={size} className="shrink-0">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth={3}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={stroke}
        strokeWidth={3}
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text
        x="50%"
        y="50%"
        dominantBaseline="central"
        textAnchor="middle"
        fill={stroke}
        fontSize={size * 0.32}
        fontWeight="700"
      >
        {score}
      </text>
    </svg>
  );
}

/* ── component ──────────────────────────────────────────── */

/* Validated dark-surface categorical steps — slots 1 and 2, same set as the
   Revenue and Trials pages:
     node scripts/validate_palette.js "#3987E5,#E66767" --mode dark --surface "#1C1C1C" */
const DASH_SERIES = ['#3987E5', '#E66767'] as const;

export default function AdminDashboard() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const { data: baseUsers } = useAdminUsersBase();

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ['admin-dashboard-stats'] }),
      queryClient.invalidateQueries({ queryKey: ['admin-stripe-live-stats'] }),
      queryClient.invalidateQueries({ queryKey: ['admin-revenuecat-stats'] }),
      queryClient.invalidateQueries({ queryKey: ['admin-online-users'] }),
      queryClient.invalidateQueries({ queryKey: ['admin-users-base'] }),
      queryClient.invalidateQueries({ queryKey: ['admin-pending-counts'] }),
      queryClient.invalidateQueries({ queryKey: ['admin-churned-users'] }),
    ]);
    setTimeout(() => setIsRefreshing(false), 500);
  }, [queryClient]);

  const { data: stripeStats, isLoading: stripeLoading } = useQuery<StripeStats>({
    queryKey: ['admin-stripe-live-stats'],
    refetchInterval: 60000,
    refetchOnWindowFocus: true,
    staleTime: 30000,
    queryFn: async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) throw new Error('Not authenticated');
      const { data, error } = await supabase.functions.invoke('admin-stripe-stats', {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      if (error) throw error;
      return data as StripeStats;
    },
  });

  const mobileSubsRef = useRef<HTMLDivElement>(null);
  /*
    Collapsed by default.

    Both of these opened expanded, so the Mobile subscribers card rendered all
    79 paying accounts and all 24 trials inline — a single card several screens
    tall, sitting in a two-column flow next to cards a tenth its height. The
    counts are in the header; the list is there when it is wanted.
  */
  const [showPaid, setShowPaid] = useState(false);
  const [showTrials, setShowTrials] = useState(false);
  const [showCancelled, setShowCancelled] = useState(false);
  const [showChurned, setShowChurned] = useState(false);
  const [showAllSignups, setShowAllSignups] = useState(false);
  const [showAllOnline, setShowAllOnline] = useState(false);
  const [showAllAtRisk, setShowAllAtRisk] = useState(false);
  const [syncing, setSyncing] = useState(false);

  const { data: rcStats } = useQuery<{
    subscribersBySource: Record<string, number>;
    tiersBySource: Record<string, Record<string, number>>;
    revenuecat: { mrr: number; revenue: number; activeSubscriptions: number; activeTrials: number };
    trialUsers: Array<{
      id: string;
      full_name: string;
      subscription_tier: string;
      trial_end: string | null;
      is_cancelled: boolean;
      engagement: EngagementData | null;
    }>;
    paidUsers: Array<{
      id: string;
      full_name: string;
      subscription_tier: string;
      engagement: EngagementData | null;
    }>;
  }>({
    queryKey: ['admin-revenuecat-stats'],
    refetchInterval: 60000,
    staleTime: 30000,
    queryFn: async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) throw new Error('Not authenticated');
      const { data, error } = await supabase.functions.invoke('admin-revenuecat-stats', {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      if (error) throw error;
      return data;
    },
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
        // Ascending: whoever loses access soonest is who you can still
        // catch. Descending buried them at the bottom of the card.
        .order('trial_end', { ascending: true });
      return (data || []) as Array<{
        id: string;
        full_name: string | null;
        subscription_tier: string | null;
        trial_end: string | null;
        role: string | null;
      }>;
    },
    staleTime: 60000,
  });

  const { data: atRiskSubs } = useQuery({
    queryKey: ['admin-at-risk-subscribers'],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('get_at_risk_subscribers' as any, {
        p_days: 30,
        p_limit: 50,
      });
      if (error) throw error;
      return (data ?? []) as Array<{
        user_id: string;
        full_name: string | null;
        subscription_tier: string | null;
        subscription_source: string | null;
        last_active: string | null;
        days_quiet: number;
      }>;
    },
    staleTime: 5 * 60 * 1000,
  });

  /*
   * The true at-risk count, not the page size.
   *
   * The header read `atRiskSubs.length`, which is capped by the RPC's
   * p_limit of 50 — so 150 quiet payers displayed as "50" and would have
   * stayed at 50 however much worse it got.
   */
  const { data: atRiskTotal } = useQuery({
    queryKey: ['admin-at-risk-count'],
    queryFn: async () => {
      // The generated Supabase types are regenerated on a schedule and do not
      // know this function yet — same reason the get_at_risk_subscribers call
      // above casts.

      const { data, error } = await supabase.rpc('count_at_risk_subscribers' as any, {
        p_days: 30,
      });
      if (error) throw error;
      return (data as number) ?? 0;
    },
    staleTime: 5 * 60 * 1000,
  });

  const syncRC = async () => {
    setSyncing(true);
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const { data, error } = await supabase.functions.invoke('admin-sync-revenuecat', {
        headers: { Authorization: `Bearer ${session?.access_token}` },
      });
      if (error) throw error;
      toast({
        title: 'RevenueCat Synced',
        description: (data as any)?.message || 'Subscription data updated',
      });
      queryClient.invalidateQueries({ queryKey: ['admin-revenuecat-stats'] });
    } catch (e) {
      toast({ title: 'Sync Failed', description: (e as Error).message, variant: 'destructive' });
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
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

      const [totalUsersRes, signupsTodayRes, signupsWeekRes, activeTodayRes, trialDataRes] =
        await Promise.all([
          supabase.from('profiles').select('*', { count: 'exact', head: true }),
          /*
           * Signups today.
           *
           * This filtered on `subscription_start`, not `created_at` — so it
           * counted people whose SUBSCRIPTION began today, missed everyone who
           * signed up today without paying, and included anyone who joined a
           * year ago and subscribed this morning. Live check on 7 Aug: 3 real
           * signups, 6 reported.
           */
          supabase
            .from('profiles')
            .select('*', { count: 'exact', head: true })
            .gte('created_at', today.toISOString()),
          supabase
            .from('profiles')
            .select('*', { count: 'exact', head: true })
            .gte('created_at', weekAgo.toISOString()),
          supabase
            .from('user_presence')
            .select('*', { count: 'exact', head: true })
            .gte('last_seen', dayAgo.toISOString()),
          supabase
            .from('profiles')
            .select('role, full_name, created_at')
            .gte('created_at', weekAgo.toISOString())
            .or('subscribed.is.null,subscribed.eq.false')
            .or('free_access_granted.is.null,free_access_granted.eq.false'),
        ]);

      const trialData = trialDataRes.data || [];
      const usersWithEmails = baseUsers || [];

      return {
        totalUsers: totalUsersRes.count || 0,
        signupsToday: signupsTodayRes.count || 0,
        signupsThisWeek: signupsWeekRes.count || 0,
        activeToday: activeTodayRes.count || 0,
        trialUsers: trialData.length,
        recentSignups: usersWithEmails.slice(0, 50),
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
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const sixDaysAgo = new Date(today);
      sixDaysAgo.setDate(sixDaysAgo.getDate() - 7);
      const fiveDaysAgo = new Date(today);
      fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 6);

      const [unreadMessagesRes, expiringTrialsRes] = await Promise.all([
        supabase
          .from('admin_messages')
          .select('*', { count: 'exact', head: true })
          .is('read_at', null),
        supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', sixDaysAgo.toISOString())
          .lt('created_at', fiveDaysAgo.toISOString())
          .or('subscribed.is.null,subscribed.eq.false')
          .or('free_access_granted.is.null,free_access_granted.eq.false'),
      ]);

      return {
        unreadMessages: unreadMessagesRes.count || 0,
        expiringTrials: expiringTrialsRes.count || 0,
        pendingDocuments: 0,
      };
    },
    staleTime: 30 * 1000,
    refetchInterval: 60000,
  });

  const unreadSupportCount = supportMessages?.filter((m) => !m.read_at).length || 0;

  const liveUserCount =
    onlineUsers?.filter((a) => new Date(a.last_seen).getTime() > Date.now() - 5 * 60 * 1000)
      .length || 0;

  // What live users are actually doing right now, grouped by top-level area
  const liveHotspots = Object.entries(
    (onlineUsers ?? [])
      .filter((a) => new Date(a.last_seen).getTime() > Date.now() - 5 * 60 * 1000)
      .reduce<Record<string, number>>((acc, a) => {
        const area = (a.current_page?.replace(/^\//, '').split('/')[0] || 'Home').trim();
        acc[area] = (acc[area] || 0) + 1;
        return acc;
      }, {})
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);

  if (isLoading || stripeLoading) {
    return (
      <PageFrame>
        <LoadingBlocks />
      </PageFrame>
    );
  }

  const stripeMrr = stripeStats?.stripe.mrr || 0;
  const rcMrr = rcStats?.revenuecat?.mrr || 0;
  const mrr = stripeMrr + rcMrr;
  const arr = mrr * 12;
  const totalSubs = stripeStats?.stripe.activeSubscriptions || 0;
  const rcLivePaid = rcStats?.revenuecat?.activeSubscriptions || 0;
  const rcLiveTrials = rcStats?.revenuecat?.activeTrials || 0;
  const appStoreSubsDb = rcStats?.subscribersBySource?.app_store || 0;
  const playStoreSubs = rcStats?.subscribersBySource?.play_store || 0;
  const appStoreSubs =
    rcLivePaid > 0 ? Math.max(rcLivePaid - playStoreSubs, appStoreSubsDb) : appStoreSubsDb;
  const rcActiveTrials = (rcStats?.trialUsers || []).filter((t) => !t.is_cancelled).length;
  const rcDbPaid = appStoreSubsDb + playStoreSubs;
  const rcDbTrials = rcActiveTrials;
  const rcPaidDelta = rcLivePaid - rcDbPaid;
  const rcTrialDelta = rcLiveTrials - rcDbTrials;
  const rcPaidDivergence = (rcLivePaid > 0 || rcDbPaid > 0) && rcPaidDelta !== 0;
  const rcTrialDivergence = (rcLiveTrials > 0 || rcDbTrials > 0) && rcTrialDelta !== 0;
  const rcHasDivergence = rcPaidDivergence || rcTrialDivergence;
  const stripeTrials = stripeStats?.stripe.trialingSubscriptions || 0;
  const totalTrials = rcActiveTrials + stripeTrials;

  /*
   * People who started a checkout and never finished.
   *
   * This was every one of them, ever — 542 at the time of writing, sitting in
   * a block headed "Needs you today". A backlog that can never reach zero
   * teaches you to ignore the section it lives in. Somebody who dropped out
   * this week is worth an email; somebody who dropped out two years ago is
   * not, so the actionable count is the recent one and the full list stays a
   * click away on the incomplete-signup page.
   */
  const abandonedCheckouts =
    baseUsers?.filter((u) => u.stripe_customer_id && !u.subscribed && !u.free_access_granted) || [];

  const abandonedThisWeek = abandonedCheckouts.filter(
    (u) => new Date(u.created_at).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000
  );

  const recentSubscriptions = (() => {
    const allSubs = [...(stripeStats?.subscriptions || []), ...(stripeStats?.trialingList || [])];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return allSubs
      .filter((s) => new Date(s.created) >= today)
      .map((s) => {
        const matchedUser = baseUsers?.find(
          (u) => u.email?.toLowerCase() === s.customerEmail?.toLowerCase()
        );
        return {
          ...s,
          full_name: matchedUser?.full_name || s.customerName || 'Unknown',
          role: matchedUser?.role || null,
          user_created_at: matchedUser?.created_at || null,
          matchedUser: matchedUser || null,
        };
      })
      .sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime())
      .slice(0, 5);
  })();

  const allPaying = totalSubs + appStoreSubs + playStoreSubs;

  /*
    What a subscriber is worth, so the risk lists can be ranked by money.

    "At risk of leaving" listed people by how long they had been quiet and
    showed "Employer · Stripe" beside each — the tier and the billing rail,
    neither of which tells you whether losing them matters. An Employer at
    £49.99 and an Apprentice at £6.99 were presented identically. Prices come
    from the same map the rest of the app uses; an unmapped tier contributes
    nothing rather than a guess.
  */
  const TIER_MRR: Record<string, number> = {
    founder: 3.99,
    apprentice: 6.99,
    apprentice_yearly: 69.99 / 12,
    electrician: 19.99,
    electrician_yearly: 199.99 / 12,
    business_ai: 39.99,
    business_ai_yearly: 399.99 / 12,
    employer: 49.99,
    employer_yearly: 499.99 / 12,
  };
  const tierValue = (tier?: string | null) => TIER_MRR[(tier ?? '').toLowerCase()] ?? 0;
  const atRiskValue = atRiskSubs.reduce((t, u) => t + tierValue(u.subscription_tier), 0);

  const conversionRate = stats?.totalUsers ? Math.round((allPaying / stats.totalUsers) * 100) : 0;

  const now = new Date();
  const in24h = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  const in48h = new Date(now.getTime() + 48 * 60 * 60 * 1000);
  /*
   * "This week" meant 48–72 hours.
   *
   * The third bucket ran to `in72h` and was labelled "this week", so a trial
   * ending in four days appeared nowhere at all — the one warning window long
   * enough to actually do something about. It now runs to seven days, which
   * is what the label always claimed.
   */
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
  const hasExpiringTrials = expiringToday + expiringTomorrow + expiringThisWeek > 0;

  const sortedPaidUsers = [...(rcStats?.paidUsers || [])]
    .sort((a, b) => calculateEngagementScore(a.engagement) - calculateEngagementScore(b.engagement))
    .reverse();
  const trialEndSort = (a: { trial_end: string | null }, b: { trial_end: string | null }) => {
    if (!a.trial_end && !b.trial_end) return 0;
    if (!a.trial_end) return 1;
    if (!b.trial_end) return -1;
    return new Date(a.trial_end).getTime() - new Date(b.trial_end).getTime();
  };
  const sortedActiveTrials = [...(rcStats?.trialUsers || [])]
    .filter((t) => !t.is_cancelled)
    .sort(trialEndSort);
  const sortedCancelledTrials = [...(rcStats?.trialUsers || [])]
    .filter((t) => t.is_cancelled)
    .sort(trialEndSort);

  const expiringSummary = [
    expiringToday > 0 && `${expiringToday} today`,
    expiringTomorrow > 0 && `${expiringTomorrow} tomorrow`,
    expiringThisWeek > 0 && `${expiringThisWeek} this week`,
  ]
    .filter(Boolean)
    .join(' · ');

  /*
    The action queue, ordered by deadline.

    Built as data so the ordering rule is visible: anything with a date attached
    outranks a standing backlog, because only one of them gets worse overnight.
  */
  const needsQueue = [
    hasExpiringTrials && {
      key: 'trials',
      title: 'Trials expiring',
      count: expiringToday + expiringTomorrow + expiringThisWeek,
      detail: expiringSummary || 'Upcoming trial expirations',
      action: 'Open trials',
      urgent: expiringToday > 0,
      onClick: () => navigate('/admin/trials?status=ending_today'),
    },
    (pendingCounts?.unreadMessages ?? 0) > 0 && {
      key: 'messages',
      title: 'Unread messages',
      count: pendingCounts?.unreadMessages ?? 0,
      detail: 'Someone is waiting on a reply from you',
      action: 'Open inbox',
      urgent: true,
      onClick: () => navigate('/admin/user-messages'),
    },
    abandonedThisWeek.length > 0 && {
      key: 'abandoned',
      title: 'Abandoned checkouts',
      count: abandonedThisWeek.length,
      detail: `Started this week and never subscribed · ${abandonedCheckouts.length} all time`,
      action: 'See who',
      urgent: false,
      onClick: () => navigate('/admin/incomplete-signup'),
    },
  ].filter(Boolean) as Array<{
    key: string;
    title: string;
    count: number;
    detail: string;
    action: string;
    urgent: boolean;
    onClick: () => void;
  }>;

  const tierPill = (tier: string | null | undefined): { label: string; tone: Tone } => {
    const t = (tier || '').toLowerCase();
    if (t.includes('founder')) return { label: 'Founder', tone: 'yellow' };
    if (t.includes('apprentice')) return { label: 'Apprentice', tone: 'blue' };
    if (t.includes('business_ai') || t === 'business ai' || t.includes('mate'))
      return { label: 'Mate', tone: 'yellow' };
    if (t.includes('employer')) return { label: 'Employer', tone: 'purple' };
    if (t) return { label: t.replace('_', ' '), tone: 'emerald' };
    return { label: 'Free', tone: 'amber' };
  };

  return (
    <PullToRefresh
      onRefresh={async () => {
        await handleRefresh();
      }}
    >
      <PageFrame>
        <PageHero
          eyebrow="Overview"
          title="Admin"
          description="Live revenue, subscriber health, and the people using Elec-Mate right now."
          tone="yellow"
          actions={
            <IconButton
              onClick={handleRefresh}
              disabled={isFetching || isRefreshing}
              aria-label="Refresh"
            >
              <RefreshCw
                className={cn('h-4 w-4', (isFetching || isRefreshing) && 'animate-spin')}
              />
            </IconButton>
          }
        />

        {/*
          The money, its composition, and the figures you check it against.

          This was one row of eight cells — MRR spanning two, then six peers of
          equal weight — so the number the page exists to report sat beside
          "Founders" and "Users" at nearly the same size, and the composition
          (£41k a year · 269 Stripe · 74 App Store · 8 Play) was crammed into a
          caption. Same shape as the Revenue and Trials heroes now: the figure
          leads, a proportional bar shows what it is made of, and a 2x2 carries
          the counts.
        */}
        <section className="relative -mx-4 overflow-hidden rounded-none border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-6">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/70 via-elec-yellow/20 to-transparent" />
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-10">
            <div className="min-w-0">
              <div className="flex items-center gap-2.5">
                <PulseDot tone="green" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
                  Monthly recurring
                </span>
              </div>
              <button
                onClick={() => navigate('/admin/revenue')}
                className="mt-4 block touch-manipulation text-left text-[38px] font-semibold leading-none tracking-tight text-white transition-opacity hover:opacity-80 sm:text-[52px]"
              >
                <AnimatedCounter value={mrr} prefix="£" decimals={2} />
              </button>
              <div className="mt-2 text-[13px] text-white">
                £{Math.round(arr / 1000)}k a year · {allPaying} paying across Stripe and the stores
              </div>

              <div className="mt-5">
                <div className="flex w-full rounded-full" style={{ height: 10, gap: 2 }}>
                  {[
                    { k: 'stripe', v: stripeMrr, fill: DASH_SERIES[0] },
                    { k: 'mobile', v: rcMrr, fill: DASH_SERIES[1] },
                  ]
                    .filter((x) => x.v > 0)
                    .map((x, i, arrSeg) => (
                      <div
                        key={x.k}
                        title={`${x.k}: £${x.v.toFixed(2)}`}
                        style={{
                          width: `calc(${(x.v / Math.max(mrr, 1)) * 100}% - ${
                            (2 * (arrSeg.length - 1)) / arrSeg.length
                          }px)`,
                          background: x.fill,
                          borderTopLeftRadius: i === 0 ? 999 : 2,
                          borderBottomLeftRadius: i === 0 ? 999 : 2,
                          borderTopRightRadius: i === arrSeg.length - 1 ? 999 : 2,
                          borderBottomRightRadius: i === arrSeg.length - 1 ? 999 : 2,
                        }}
                      />
                    ))}
                </div>
                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-[12px] text-white">
                  <span className="flex items-center gap-2">
                    <span
                      className="h-2 w-2 shrink-0 rounded-full"
                      style={{ background: DASH_SERIES[0] }}
                    />
                    <span className="font-medium tabular-nums">£{stripeMrr.toFixed(2)}</span> Stripe
                    · {totalSubs} subs
                  </span>
                  <span className="flex items-center gap-2">
                    <span
                      className="h-2 w-2 shrink-0 rounded-full"
                      style={{ background: DASH_SERIES[1] }}
                    />
                    <span className="font-medium tabular-nums">£{rcMrr.toFixed(2)}</span> Mobile ·{' '}
                    {appStoreSubs + playStoreSubs} subs
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-px self-start overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08]">
              {[
                {
                  label: 'Paying',
                  value: allPaying,
                  to: '/admin/revenue',
                  accent: true,
                  sub: 'all rails',
                },
                {
                  label: 'On trial',
                  value: totalTrials,
                  to: '/admin/trials',
                  sub: 'next month’s paying',
                },
                {
                  label: 'Active today',
                  value: stats?.activeToday || 0,
                  to: '/admin/users?filter=active',
                  sub: 'seen in 24h',
                },
                {
                  label: 'Users',
                  value: stats?.totalUsers || 0,
                  to: '/admin/users',
                  sub: `${stats?.signupsToday || 0} joined today`,
                },
              ].map((m) => (
                <button
                  key={m.label}
                  onClick={() => navigate(m.to)}
                  className="touch-manipulation bg-[hsl(0_0%_9%)] px-4 py-5 text-left transition-colors hover:bg-[hsl(0_0%_12%)]"
                >
                  <div
                    className={cn(
                      'text-[22px] font-semibold leading-none sm:text-[26px]',
                      m.accent ? 'text-elec-yellow' : 'text-white'
                    )}
                  >
                    <AnimatedCounter value={m.value} />
                  </div>
                  <div className="mt-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
                    {m.label}
                  </div>
                  <div className="mt-1 text-[11px] text-white/60">{m.sub}</div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/*
          Needs you today.

          The trials, the abandoned checkouts and the unread messages were three
          separate alert rows scattered down the page with other content between
          them. They are the only things on this dashboard anyone has to ACT on,
          so they sit together, directly under the numbers, and the block
          disappears entirely on a quiet day.
        */}
        {(hasExpiringTrials ||
          abandonedThisWeek.length > 0 ||
          (pendingCounts?.unreadMessages ?? 0) > 0) && (
          <section className="relative -mx-4 overflow-hidden rounded-none border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-5">
            {/*
              A queue, ordered by how soon it stops mattering.

              These were three identical ListRows with a big amber number on the
              right — the same treatment for "3 trials expire today", which has
              a deadline, and "537 abandoned checkouts all time", which does
              not. Each one now says what the job is and what happens if it is
              left, and they sit in order of urgency rather than source order.
            */}
            <div className="flex items-center justify-between gap-3">
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
                Needs you today
              </span>
              <span className="text-[11px] text-white/60">{needsQueue.length} open</span>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {needsQueue.map((item) => (
                <button
                  key={item.key}
                  onClick={item.onClick}
                  className="group touch-manipulation rounded-xl border border-white/[0.1] bg-[hsl(0_0%_9%)] p-4 text-left transition-colors hover:border-white/[0.2] hover:bg-[hsl(0_0%_12%)]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-[13px] font-semibold text-white">{item.title}</span>
                    <span
                      className={cn(
                        'shrink-0 text-[24px] font-semibold leading-none',
                        item.urgent ? 'text-amber-400' : 'text-white'
                      )}
                    >
                      {item.count}
                    </span>
                  </div>
                  <div className="mt-1.5 text-[12px] text-white/70">{item.detail}</div>
                  <div className="mt-3 flex items-center gap-1.5 text-[11px] font-semibold text-elec-yellow">
                    {item.action}
                    <span className="transition-transform group-hover:translate-x-0.5">→</span>
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}

        {/*
          Two columns from lg — CSS columns, not a grid.

          A grid places items in source order: first left, second right, third
          left. With ten cards of wildly different heights that leaves holes —
          a tall "Recently left" beside a two-row stat strip stranded the whole
          right-hand column with about 500px of nothing under it.

          `columns-2` flows instead: each card drops into whichever column has
          room, so the two sides finish level and there is no void. Children
          need `break-inside-avoid` or a card will be sliced in half across the
          column boundary — that is what the wrapper below is for.
        */}
        <div className="lg:columns-2 lg:gap-6 [&>*]:mb-5 lg:[&>*]:mb-6 [&>*]:break-inside-avoid">
          {/* Live users ────────────────────────────────────── */}
          <ListCard>
            <ListCardHeader
              tone="green"
              title="On the app now"
              meta={
                <span className="flex items-center gap-1.5">
                  <PulseDot tone="green" />
                  <span className="text-[11px] text-green-400 font-medium tabular-nums">
                    {liveUserCount} online
                  </span>
                </span>
              }
              action={
                (onlineUsers?.length || 0) > 5
                  ? showAllOnline
                    ? 'Show less'
                    : `Show all ${onlineUsers?.length}`
                  : undefined
              }
              onAction={
                (onlineUsers?.length || 0) > 5 ? () => setShowAllOnline(!showAllOnline) : undefined
              }
            />
            {liveHotspots.length > 0 && (
              <div className="flex flex-wrap gap-1.5 px-4 sm:px-5 pt-3.5 pb-0.5">
                {liveHotspots.map(([area, n]) => (
                  <span
                    key={area}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.05] border border-white/10 px-2.5 py-1 text-[11px] text-white"
                  >
                    <span className="truncate max-w-[140px]">{area}</span>
                    <span className="text-elec-yellow font-semibold tabular-nums">{n}</span>
                  </span>
                ))}
              </div>
            )}
            {!onlineUsers || onlineUsers.length === 0 ? (
              <EmptyState
                title="No active users"
                description="When users are on-app, they'll appear here."
              />
            ) : (
              <ListBody>
                {onlineUsers.slice(0, showAllOnline ? onlineUsers.length : 5).map((activity) => {
                  const lastSeenMs = new Date(activity.last_seen).getTime();
                  const diffMins = Math.floor((Date.now() - lastSeenMs) / 60000);
                  const isOnline = diffMins < 5;
                  const profile = activity.profiles;
                  const currentPage = (
                    activity.current_page?.replace(/^\//, '').split('/')[0] || 'Home'
                  ).trim();
                  const di = activity.device_info as {
                    isMobile?: boolean;
                    platform?: string;
                  } | null;
                  const platform = di?.platform || '';
                  const deviceLabel =
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
                  const sessionMs = activity.session_started_at
                    ? Date.now() - new Date(activity.session_started_at).getTime()
                    : 0;
                  const sessionMin = Math.max(0, Math.floor(sessionMs / 60000));
                  const sessionLabel =
                    sessionMin >= 60
                      ? `${Math.floor(sessionMin / 60)}h ${sessionMin % 60}m`
                      : `${sessionMin}m`;
                  return (
                    <ListRow
                      key={activity.user_id}
                      lead={<Avatar initials={getInitials(profile?.full_name)} online={isOnline} />}
                      title={profile?.full_name || 'Unknown'}
                      subtitle={
                        isOnline
                          ? `Active now · ${sessionLabel} · ${currentPage}`
                          : `${diffMins}m ago · ${currentPage}`
                      }
                      trailing={
                        <span className="flex items-center gap-1 text-[11px] text-white">
                          <DeviceIcon className="h-3.5 w-3.5 shrink-0" />
                          <span className="hidden sm:inline">{deviceLabel}</span>
                        </span>
                      }
                      onClick={() => {
                        const matched = baseUsers?.find((u) => u.id === activity.user_id);
                        if (matched) setSelectedUser(matched);
                      }}
                    />
                  );
                })}
              </ListBody>
            )}
          </ListCard>

          {/* Recent signups ───────────────────────────────── */}
          <ListCard>
            <ListCardHeader
              tone="yellow"
              title="Recent signups"
              meta={
                <span className="text-[11px] text-white tabular-nums">
                  {stats?.signupsThisWeek ?? 0} this week
                </span>
              }
              action={
                (stats?.recentSignups?.length || 0) > 5
                  ? showAllSignups
                    ? 'Show less'
                    : `Show ${stats?.recentSignups?.length} most recent`
                  : undefined
              }
              onAction={
                (stats?.recentSignups?.length || 0) > 5
                  ? () => setShowAllSignups(!showAllSignups)
                  : undefined
              }
            />
            <ListBody>
              {stats?.recentSignups?.slice(0, showAllSignups ? 50 : 5).map((user) => {
                /*
                  Where they got to, not just what they are.

                  The pill said Pro / Checkout / Free — two of which are the
                  same thing (not paying) and none of which told you whether the
                  person ever finished setting up. 24.5% of accounts never
                  complete onboarding, and that is the one thing worth seeing on
                  a list of people who arrived today.
                */
                const status = user.subscribed
                  ? { label: 'Paying', tone: 'emerald' as Tone }
                  : user.stripe_customer_id
                    ? { label: 'Started checkout', tone: 'purple' as Tone }
                    : user.onboarding_completed
                      ? { label: 'Set up', tone: 'blue' as Tone }
                      : { label: 'Never finished setup', tone: 'orange' as Tone };
                return (
                  <ListRow
                    key={user.id}
                    lead={<Avatar initials={getInitials(user.full_name)} />}
                    title={user.full_name || 'Unknown'}
                    subtitle={
                      <span>
                        {signupWhen(user.created_at).when}
                        <span className="text-white/50">
                          {' · '}
                          {signupWhen(user.created_at).relative}
                          {user.email ? ` · ${user.email}` : ''}
                        </span>
                      </span>
                    }
                    trailing={<Pill tone={status.tone}>{status.label}</Pill>}
                    onClick={() => setSelectedUser(user)}
                  />
                );
              })}
            </ListBody>
          </ListCard>

          {/* Mobile subscribers ──────────────────────────── */}
          {(rcLivePaid > 0 ||
            rcLiveTrials > 0 ||
            (rcStats?.trialUsers?.length ?? 0) > 0 ||
            (rcStats?.paidUsers?.length ?? 0) > 0) && (
            <div ref={mobileSubsRef}>
              <ListCard>
                <ListCardHeader
                  tone="blue"
                  title="Mobile subscribers"
                  meta={
                    <span className="flex items-center gap-1.5">
                      <PulseDot tone="green" />
                      <span className="text-[11px] text-white">Live from RevenueCat</span>
                    </span>
                  }
                  action={syncing ? 'Syncing…' : 'Sync RC'}
                  onAction={syncing ? undefined : syncRC}
                />
                <div className="px-4 sm:px-5 pt-4">
                  <StatStrip
                    columns={3}
                    stats={[
                      { label: 'Paid', value: rcLivePaid, tone: 'emerald' },
                      { label: 'Trials', value: rcLiveTrials, tone: 'blue' },
                      { label: 'MRR', value: `£${Math.round(rcMrr)}` },
                    ]}
                  />
                  {rcHasDivergence && (
                    <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-white/[0.1] bg-white/[0.03] px-4 py-3">
                      <Dot tone="amber" className="mt-1.5" />
                      <div className="min-w-0">
                        <div className="text-[12px] font-semibold text-amber-300 leading-tight">
                          {rcPaidDivergence &&
                            (rcPaidDelta > 0
                              ? `${rcPaidDelta} paid sub${rcPaidDelta === 1 ? '' : 's'} in RC not matched in DB`
                              : `${Math.abs(rcPaidDelta)} stale paid sub${Math.abs(rcPaidDelta) === 1 ? '' : 's'} in DB`)}
                          {rcPaidDivergence && rcTrialDivergence && ' · '}
                          {rcTrialDivergence &&
                            (rcTrialDelta > 0
                              ? `${rcTrialDelta} trial${rcTrialDelta === 1 ? '' : 's'} in RC not matched`
                              : `${Math.abs(rcTrialDelta)} stale trial${Math.abs(rcTrialDelta) === 1 ? '' : 's'} in DB`)}
                        </div>
                        <div className="mt-0.5 text-[11px] text-amber-300/70">
                          Tap Sync RC to reconcile
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Collapsible groups */}
                {sortedPaidUsers.length > 0 && (
                  <>
                    <div className="border-t border-white/[0.06] mt-4" />
                    <GroupHeader
                      tone="emerald"
                      label="Paid"
                      count={sortedPaidUsers.length}
                      open={showPaid}
                      onClick={() => setShowPaid(!showPaid)}
                    />
                    {showPaid && (
                      <ListBody>
                        {sortedPaidUsers.map((u) => {
                          const matched = baseUsers?.find((bu) => bu.id === u.id);
                          const score = calculateEngagementScore(u.engagement);
                          const since = daysSinceActive(u.engagement?.last_activity);
                          const dormantDays =
                            since !== null && since >= DORMANT_DAYS ? since : null;
                          return (
                            <ListRow
                              key={u.id}
                              accent="emerald"
                              lead={<EngagementRing score={score} />}
                              title={u.full_name}
                              subtitle={
                                <span className="capitalize">
                                  {u.subscription_tier?.replace('_', ' ')}
                                  {u.engagement && (
                                    <>
                                      {' · '}
                                      {formatTimeShort(u.engagement.total_seconds_tracked)}
                                      {' · '}
                                      {u.engagement.unique_pages_visited}p{' · '}
                                      {u.engagement.login_count} logins
                                    </>
                                  )}
                                </span>
                              }
                              trailing={
                                <>
                                  {dormantDays !== null && (
                                    <Pill tone={dormantDays >= 60 ? 'red' : 'amber'}>
                                      {dormantDays}d quiet
                                    </Pill>
                                  )}
                                  {/* Redundant on mobile — the whole section is paying users */}
                                  <Pill tone="emerald" className="hidden sm:inline-flex">
                                    Paying
                                  </Pill>
                                </>
                              }
                              onClick={() => matched && setSelectedUser(matched)}
                            />
                          );
                        })}
                      </ListBody>
                    )}
                  </>
                )}

                {sortedActiveTrials.length > 0 && (
                  <>
                    <div className="border-t border-white/[0.06]" />
                    <GroupHeader
                      tone="blue"
                      label="Trials"
                      count={sortedActiveTrials.length}
                      open={showTrials}
                      onClick={() => setShowTrials(!showTrials)}
                    />
                    {showTrials && (
                      <ListBody>
                        {sortedActiveTrials.map((t) => {
                          const daysLeft = t.trial_end
                            ? differenceInDays(parseISO(t.trial_end), new Date())
                            : null;
                          const matched = baseUsers?.find((bu) => bu.id === t.id);
                          const urgencyTone: Tone =
                            daysLeft !== null && daysLeft <= 1
                              ? 'red'
                              : daysLeft !== null && daysLeft <= 3
                                ? 'orange'
                                : 'blue';
                          const score = calculateEngagementScore(t.engagement);
                          const since = daysSinceActive(t.engagement?.last_activity);
                          const dormantDays =
                            since !== null && since >= DORMANT_DAYS ? since : null;
                          return (
                            <ListRow
                              key={t.id}
                              accent="blue"
                              lead={<EngagementRing score={score} />}
                              title={t.full_name}
                              subtitle={
                                <span className="capitalize">
                                  {t.subscription_tier?.replace('_', ' ')}
                                  {t.engagement && (
                                    <>
                                      {' · '}
                                      {formatTimeShort(t.engagement.total_seconds_tracked)}
                                      {' · '}
                                      {t.engagement.unique_pages_visited}p{' · '}
                                      {t.engagement.login_count} logins
                                    </>
                                  )}
                                </span>
                              }
                              trailing={
                                <>
                                  {dormantDays !== null && (
                                    <Pill tone={dormantDays >= 60 ? 'red' : 'amber'}>
                                      {dormantDays}d quiet
                                    </Pill>
                                  )}
                                  <Pill tone={urgencyTone}>
                                    {daysLeft !== null
                                      ? daysLeft <= 0
                                        ? 'Today'
                                        : `${daysLeft}d`
                                      : 'Trial'}
                                  </Pill>
                                </>
                              }
                              onClick={() => matched && setSelectedUser(matched)}
                            />
                          );
                        })}
                      </ListBody>
                    )}
                  </>
                )}

                {sortedCancelledTrials.length > 0 && (
                  <>
                    <div className="border-t border-white/[0.06]" />
                    <GroupHeader
                      tone="red"
                      label="Cancelled"
                      count={sortedCancelledTrials.length}
                      open={showCancelled}
                      onClick={() => setShowCancelled(!showCancelled)}
                    />
                    {showCancelled && (
                      <ListBody>
                        {sortedCancelledTrials.map((t) => {
                          const daysLeft = t.trial_end
                            ? differenceInDays(parseISO(t.trial_end), new Date())
                            : null;
                          const matched = baseUsers?.find((bu) => bu.id === t.id);
                          const score = calculateEngagementScore(t.engagement);
                          return (
                            <ListRow
                              key={t.id}
                              accent="red"
                              lead={<EngagementRing score={score} />}
                              title={t.full_name}
                              subtitle={
                                <span className="capitalize">
                                  {t.subscription_tier?.replace('_', ' ')}
                                </span>
                              }
                              trailing={
                                <Pill tone="red">
                                  Cancelled
                                  {daysLeft !== null && daysLeft > 0 ? ` · ${daysLeft}d` : ''}
                                </Pill>
                              }
                              onClick={() => matched && setSelectedUser(matched)}
                            />
                          );
                        })}
                      </ListBody>
                    )}
                  </>
                )}
              </ListCard>
            </div>
          )}

          {/* Churn risk — paying users gone quiet (pre-churn) ─ */}
          {atRiskSubs && atRiskSubs.length > 0 && (
            <ListCard>
              <ListCardHeader
                tone="orange"
                title="At risk of leaving"
                meta={
                  <span className="flex flex-wrap items-center gap-2 text-[11px]">
                    <span className="font-semibold tabular-nums text-white">
                      £{Math.round(atRiskValue)}/mo
                    </span>
                    <span className="text-white/60">
                      at risk · {atRiskTotal ?? atRiskSubs.length} quiet 30d+
                    </span>
                  </span>
                }
                action={
                  atRiskSubs.length > 6
                    ? showAllAtRisk
                      ? 'Show less'
                      : `Show all ${atRiskSubs.length}`
                    : undefined
                }
                onAction={
                  atRiskSubs.length > 6 ? () => setShowAllAtRisk(!showAllAtRisk) : undefined
                }
              />
              <ListBody>
                {/*
                  Ranked by what they are worth, not by how long they have been
                  quiet. The list used to open with whoever had been silent
                  longest and showed "Employer · Stripe" beside each name — tier
                  and billing rail, neither of which says whether losing them
                  matters. A £49.99 Employer and a £6.99 Apprentice looked the
                  same; now the money leads and the quiet time qualifies it.
                */}
                {[...atRiskSubs]
                  .sort((a, b) => tierValue(b.subscription_tier) - tierValue(a.subscription_tier))
                  .slice(0, showAllAtRisk ? atRiskSubs.length : 6)
                  .map((u) => {
                    const matched = baseUsers?.find((bu) => bu.id === u.user_id);
                    const value = tierValue(u.subscription_tier);
                    const never = u.days_quiet >= 9999;
                    return (
                      <ListRow
                        key={u.user_id}
                        accent={never || u.days_quiet >= 60 ? 'red' : 'orange'}
                        lead={<Avatar initials={getInitials(u.full_name)} />}
                        title={u.full_name || 'Unknown'}
                        subtitle={
                          <span>
                            {never ? 'Never opened the app' : `Quiet ${u.days_quiet} days`}
                            <span className="text-white/50">
                              {' · '}
                              <span className="capitalize">
                                {(u.subscription_tier || 'paid').replace('_', ' ')}
                              </span>
                            </span>
                          </span>
                        }
                        trailing={
                          <span className="text-right">
                            <span className="block text-[15px] font-semibold tabular-nums text-white">
                              {value > 0 ? `£${value.toFixed(2)}` : '—'}
                            </span>
                            <span className="block text-[10px] uppercase tracking-[0.12em] text-white/50">
                              a month
                            </span>
                          </span>
                        }
                        onClick={() => matched && setSelectedUser(matched)}
                      />
                    );
                  })}
              </ListBody>
            </ListCard>
          )}

          {/*
          Cancelled, but not gone.
        
          This card was titled "Recently left" and every row said "in 15 days",
          "in 22 minutes" — future tense, because nobody on it had actually
          left. They have cancelled and are running down the remainder of a
          trial they already paid for. All five still had access when this was
          written, one of them for another twenty minutes.
        
          That makes it the most actionable list on the page — the only people
          you can still talk out of leaving — so it says what it is, counts
          down rather than pointing forwards, and leads with whoever runs out
          first.
        */}
          {churnedUsers && churnedUsers.length > 0 && (
            <ListCard>
              <ListCardHeader
                tone="red"
                title="Cancelled, still have access"
                meta={
                  <span className="text-[11px] text-white">{churnedUsers.length} winding down</span>
                }
              />
              <GroupHeader
                tone="red"
                label="Soonest to lapse first"
                count={churnedUsers.length}
                open={showChurned}
                onClick={() => setShowChurned(!showChurned)}
              />
              {showChurned && (
                <ListBody>
                  {churnedUsers.map((u) => {
                    const matched = baseUsers?.find((bu) => bu.id === u.id);
                    /*
                     * Real engagement, from the RevenueCat trial list.
                     *
                     * The ring was fed `calculateEngagementScore(null)` — a
                     * hardcoded null — so it drew a 0 for everyone. Reece Uko
                     * had six and a quarter hours on the app and rendered
                     * identically to somebody who used it for five minutes.
                     */
                    const rcMatch = rcStats?.trialUsers?.find((t) => t.id === u.id);
                    const score = calculateEngagementScore(rcMatch?.engagement ?? null);

                    const endsAt = u.trial_end ? parseISO(u.trial_end) : null;
                    const stillHasAccess = !!endsAt && endsAt.getTime() > Date.now();
                    const remaining = endsAt
                      ? formatDistanceToNow(endsAt).replace('about ', '')
                      : null;
                    // Under a day means you can still do something today.
                    const urgent = !!endsAt && endsAt.getTime() - Date.now() < 24 * 60 * 60 * 1000;

                    return (
                      <ListRow
                        key={u.id}
                        accent="red"
                        lead={<EngagementRing score={score} />}
                        title={u.full_name || 'Unknown'}
                        subtitle={
                          <span className="capitalize">
                            {u.subscription_tier?.replace('_', ' ') || u.role || 'User'}
                          </span>
                        }
                        trailing={
                          <span
                            className={cn(
                              'text-[12px] font-semibold tabular-nums',
                              urgent ? 'text-orange-300' : 'text-white'
                            )}
                          >
                            {stillHasAccess && remaining ? `${remaining} left` : 'Access ended'}
                          </span>
                        }
                        onClick={() => matched && setSelectedUser(matched)}
                      />
                    );
                  })}
                </ListBody>
              )}
            </ListCard>
          )}

          {/* Growth ──────────────────────────────────────── */}
          <StatStrip
            columns={2}
            stats={[
              {
                label: 'New this week',
                value: <AnimatedCounter value={stats?.signupsThisWeek || 0} />,
                sub: '7-day trailing',
                tone: 'green',
                onClick: () => navigate('/admin/analytics'),
              },
              {
                label: 'Conversion',
                value: <AnimatedCounter value={conversionRate} suffix="%" />,
                sub: 'Paying ÷ total users',
                accent: true,
                onClick: () => navigate('/admin/analytics'),
              },
            ]}
          />

          {/* Recent subscriptions ──────────────────────── */}
          {recentSubscriptions.length > 0 && (
            <ListCard>
              <ListCardHeader
                tone="emerald"
                title="New subscriptions"
                meta={
                  <span className="text-[11px] text-white tabular-nums">
                    {recentSubscriptions.length} today
                  </span>
                }
              />
              <ListBody>
                {recentSubscriptions.map((sub) => {
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  const isNewUser = sub.user_created_at && new Date(sub.user_created_at) >= today;
                  const tier = tierPill(sub.tier);
                  return (
                    <ListRow
                      key={sub.subscriptionId}
                      lead={<Avatar initials={getInitials(sub.full_name)} />}
                      title={sub.full_name}
                      subtitle={sub.customerEmail}
                      trailing={
                        <>
                          <Pill tone={tier.tone}>{tier.label}</Pill>
                          {/* Secondary on mobile — the name wins */}
                          <Pill
                            tone={isNewUser ? 'green' : 'blue'}
                            className="hidden sm:inline-flex"
                          >
                            {isNewUser ? 'New' : 'Return'}
                          </Pill>
                        </>
                      }
                      onClick={() => sub.matchedUser && setSelectedUser(sub.matchedUser)}
                    />
                  );
                })}
              </ListBody>
            </ListCard>
          )}

          {/* Support inbox ──────────────────────────────── */}
          {supportMessages && supportMessages.length > 0 && (
            <ListCard>
              <ListCardHeader
                tone="yellow"
                title="Support inbox"
                meta={
                  unreadSupportCount > 0 ? (
                    <Pill tone="yellow">{unreadSupportCount} unread</Pill>
                  ) : undefined
                }
                action="All"
                onAction={() => navigate('/admin/user-messages')}
              />
              <ListBody>
                {supportMessages.slice(0, 5).map((msg) => {
                  const sender = msg.sender;
                  const isUnread = !msg.read_at;
                  const waitingDays = Math.floor(
                    (Date.now() - new Date(msg.created_at).getTime()) / 86400000
                  );
                  return (
                    <ListRow
                      key={msg.id}
                      accent={isUnread ? 'yellow' : undefined}
                      lead={<Avatar initials={getInitials(sender?.full_name)} />}
                      title={
                        <span
                          className={cn(
                            'truncate',
                            isUnread ? 'text-white font-semibold' : 'text-white'
                          )}
                        >
                          {sender?.full_name || 'Unknown'}
                        </span>
                      }
                      subtitle={
                        <span className="line-clamp-1 text-white">
                          {msg.subject && msg.subject !== 'Support Request'
                            ? `${msg.subject} — ${msg.message}`
                            : msg.message}
                        </span>
                      }
                      /*
                        Waiting time, sized by how bad it is.

                        Every message showed the same quiet grey "9 days ago" —
                        a nine-day-old unanswered message and a one-hour-old one
                        were typographically identical, on the one card where
                        the age IS the problem.
                      */
                      trailing={
                        <span className="text-right">
                          <span
                            className={cn(
                              'block text-[13px] font-semibold tabular-nums',
                              waitingDays >= 3 ? 'text-amber-400' : 'text-white'
                            )}
                          >
                            {formatDistanceToNow(new Date(msg.created_at))
                              .replace('about ', '')
                              .replace(' days', 'd')
                              .replace(' day', 'd')
                              .replace(' hours', 'h')
                              .replace(' hour', 'h')
                              .replace(' minutes', 'm')
                              .replace(' minute', 'm')}
                          </span>
                          <span className="block text-[10px] uppercase tracking-[0.12em] text-white/50">
                            waiting
                          </span>
                        </span>
                      }
                      onClick={() => navigate('/admin/user-messages')}
                    />
                  );
                })}
              </ListBody>
            </ListCard>
          )}
        </div>

        <UserManagementSheet
          user={selectedUser}
          open={!!selectedUser}
          onOpenChange={(open) => !open && setSelectedUser(null)}
        />
      </PageFrame>
    </PullToRefresh>
  );
}
