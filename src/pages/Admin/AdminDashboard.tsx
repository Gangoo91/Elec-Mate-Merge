/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { formatDistanceToNow, differenceInDays, parseISO } from 'date-fns';
import { toast } from '@/hooks/use-toast';
import { useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { RefreshCw } from 'lucide-react';
import {
  getInitials,
  calculateEngagementScore,
  getScoreColor,
  SCORE_COLOR_MAP,
  formatTimeShort,
  type EngagementData,
} from '@/utils/adminUtils';
import { AnimatedCounter } from '@/components/dashboard/AnimatedCounter';
import UserManagementSheet from '@/components/admin/UserManagementSheet';
import { useAdminUsersBase, AdminUser } from '@/hooks/useAdminUsersBase';
import PullToRefresh from '@/components/admin/PullToRefresh';
import {
  PageFrame,
  PageHero,
  HeroNumber,
  StatStrip,
  AlertRow,
  Divider,
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
  const [showPaid, setShowPaid] = useState(true);
  const [showTrials, setShowTrials] = useState(true);
  const [showCancelled, setShowCancelled] = useState(false);
  const [showChurned, setShowChurned] = useState(false);
  const [showAllSignups, setShowAllSignups] = useState(false);
  const [showAllOnline, setShowAllOnline] = useState(false);
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
        .order('trial_end', { ascending: false });
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
          supabase
            .from('profiles')
            .select('*', { count: 'exact', head: true })
            .gte('subscription_start', today.toISOString()),
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
      const { data } = await supabase
        .from('user_presence')
        .select(
          'user_id, last_seen, status, session_started_at, current_page, device_info, profiles(full_name, role, avatar_url)'
        )
        .order('last_seen', { ascending: false })
        .limit(10);
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

  const abandonedCheckouts =
    baseUsers?.filter((u) => u.stripe_customer_id && !u.subscribed && !u.free_access_granted) || [];

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
  const conversionRate = stats?.totalUsers ? Math.round((allPaying / stats.totalUsers) * 100) : 0;

  const now = new Date();
  const in24h = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  const in48h = new Date(now.getTime() + 48 * 60 * 60 * 1000);
  const in72h = new Date(now.getTime() + 72 * 60 * 60 * 1000);
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
    return end > in48h && end <= in72h;
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

  const tierPill = (tier: string | null | undefined): { label: string; tone: Tone } => {
    const t = (tier || '').toLowerCase();
    if (t.includes('founder')) return { label: 'Founder', tone: 'yellow' };
    if (t.includes('apprentice')) return { label: 'Apprentice', tone: 'blue' };
    if (t.includes('employer')) return { label: 'Employer', tone: 'purple' };
    if (t) return { label: t.replace('_', ' '), tone: 'emerald' };
    return { label: 'Free', tone: 'amber' };
  };

  return (
    <PullToRefresh onRefresh={async () => { await handleRefresh(); }}>
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
                className={cn(
                  'h-4 w-4',
                  (isFetching || isRefreshing) && 'animate-spin'
                )}
              />
            </IconButton>
          }
        />

        {/* Alerts ─────────────────────────────────────────── */}
        {(hasExpiringTrials || (pendingCounts?.unreadMessages ?? 0) > 0) && (
          <div className="space-y-2.5">
            {hasExpiringTrials && (
              <AlertRow
                tone="orange"
                title="Trials Expiring"
                subtitle={expiringSummary || 'Upcoming trial expirations'}
                trailing={
                  <Pill tone="orange">{expiringToday + expiringTomorrow + expiringThisWeek}</Pill>
                }
                onClick={() =>
                  mobileSubsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
              />
            )}
          </div>
        )}

        {/* Revenue hero ──────────────────────────────────── */}
        <HeroNumber
          eyebrow="Live Revenue"
          live
          onClick={() => navigate('/admin/revenue')}
          value={<AnimatedCounter value={mrr} prefix="£" decimals={2} />}
          caption="Monthly Recurring Revenue"
          columns={[
            {
              label: 'Paying',
              value: <AnimatedCounter value={allPaying} />,
              tone: 'yellow',
            },
            {
              label: 'ARR',
              value: (
                <AnimatedCounter
                  value={arr / 1000}
                  prefix="£"
                  suffix="k"
                  decimals={arr >= 10000 ? 0 : 1}
                />
              ),
            },
            {
              label: 'Founders',
              value: <AnimatedCounter value={stripeStats?.stripe.tierCounts?.founder || 0} />,
              tone: 'yellow',
            },
          ]}
          legend={[
            { label: 'Stripe', value: totalSubs, tone: 'purple' },
            { label: 'App Store', value: appStoreSubs, tone: 'blue' },
            { label: 'Play Store', value: playStoreSubs, tone: 'green' },
          ]}
        />

        {/* Quick stats ───────────────────────────────────── */}
        <StatStrip
          columns={4}
          stats={[
            {
              label: 'Users',
              value: <AnimatedCounter value={stats?.totalUsers || 0} />,
              onClick: () => navigate('/admin/users'),
            },
            {
              label: 'Active',
              value: <AnimatedCounter value={stats?.activeToday || 0} />,
              tone: 'green',
              onClick: () => navigate('/admin/users?filter=active'),
            },
            {
              label: 'Today',
              value: <AnimatedCounter value={stats?.signupsToday || 0} />,
              onClick: () => navigate('/admin/users?filter=today'),
            },
            {
              label: 'Trial',
              value: <AnimatedCounter value={totalTrials} />,
              tone: 'orange',
              onClick: () => navigate('/admin/users?filter=trial'),
            },
          ]}
        />

        {/* Abandoned checkouts ──────────────────────────── */}
        {abandonedCheckouts.length > 0 && (
          <AlertRow
            tone="amber"
            title="Abandoned Checkouts"
            subtitle="Started checkout, never subscribed"
            trailing={<Pill tone="amber">{abandonedCheckouts.length}</Pill>}
            onClick={() => navigate('/admin/incomplete-signup')}
          />
        )}

        <Divider label="Activity" />

        {/* Live users ────────────────────────────────────── */}
        <ListCard>
          <ListCardHeader
            tone="green"
            title="Live Now"
            meta={
              <span className="flex items-center gap-1.5">
                <PulseDot tone="green" />
                <span className="text-[11px] text-green-400 font-medium tabular-nums">
                  {liveUserCount} online
                </span>
              </span>
            }
            action={(onlineUsers?.length || 0) > 5 ? (showAllOnline ? 'Show less' : `Show all ${onlineUsers?.length}`) : undefined}
            onAction={(onlineUsers?.length || 0) > 5 ? () => setShowAllOnline(!showAllOnline) : undefined}
          />
          {(!onlineUsers || onlineUsers.length === 0) ? (
            <EmptyState title="No active users" description="When users are on-app, they'll appear here." />
          ) : (
            <ListBody>
              {onlineUsers.slice(0, showAllOnline ? onlineUsers.length : 5).map((activity) => {
                const lastSeenMs = new Date(activity.last_seen).getTime();
                const diffMins = Math.floor((Date.now() - lastSeenMs) / 60000);
                const isOnline = diffMins < 5;
                const profile = activity.profiles;
                const currentPage =
                  activity.current_page?.replace(/^\//, '').split('/')[0] || 'Home';
                return (
                  <ListRow
                    key={activity.user_id}
                    lead={
                      <Avatar
                        initials={getInitials(profile?.full_name)}
                        online={isOnline}
                      />
                    }
                    title={profile?.full_name || 'Unknown'}
                    subtitle={
                      isOnline ? `Active now · ${currentPage}` : `${diffMins}m ago · ${currentPage}`
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
            title="Recent Signups"
            meta={
              <span className="text-[11px] text-white tabular-nums">
                {stats?.signupsThisWeek ?? 0} this week
              </span>
            }
            action={
              (stats?.recentSignups?.length || 0) > 5
                ? showAllSignups
                  ? 'Show less'
                  : `Show all ${stats?.recentSignups?.length}`
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
              const status = user.subscribed
                ? { label: 'Pro', tone: 'emerald' as Tone }
                : user.stripe_customer_id
                  ? { label: 'Checkout', tone: 'orange' as Tone }
                  : { label: 'Free', tone: 'amber' as Tone };
              return (
                <ListRow
                  key={user.id}
                  lead={<Avatar initials={getInitials(user.full_name)} />}
                  title={user.full_name || 'Unknown'}
                  subtitle={user.email}
                  trailing={
                    <>
                      <Pill tone={status.tone}>{status.label}</Pill>
                      <span className="text-[11px] text-white tabular-nums">
                        {formatDistanceToNow(new Date(user.created_at), {
                          addSuffix: true,
                        }).replace('about ', '')}
                      </span>
                    </>
                  }
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
                title="Mobile Subscribers"
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
                  <div className="mt-4 rounded-xl bg-amber-500/[0.06] border border-amber-500/20 px-4 py-3 flex items-start gap-2.5">
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
                      <div className="mt-0.5 text-[11px] text-amber-300/70">Tap Sync RC to reconcile</div>
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
                                    {u.engagement.unique_pages_visited}p
                                    {' · '}
                                    {u.engagement.login_count} logins
                                  </>
                                )}
                              </span>
                            }
                            trailing={<Pill tone="emerald">Paying</Pill>}
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
                                    {t.engagement.unique_pages_visited}p
                                    {' · '}
                                    {t.engagement.login_count} logins
                                  </>
                                )}
                              </span>
                            }
                            trailing={
                              <Pill tone={urgencyTone}>
                                {daysLeft !== null
                                  ? daysLeft <= 0
                                    ? 'Today'
                                    : `${daysLeft}d`
                                  : 'Trial'}
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

        {/* Recently churned ──────────────────────────── */}
        {churnedUsers && churnedUsers.length > 0 && (
          <ListCard>
            <ListCardHeader
              tone="red"
              title="Recently Churned"
              meta={<Pill tone="red">{churnedUsers.length}</Pill>}
            />
            <GroupHeader
              tone="red"
              label="Cancelled Trials"
              count={churnedUsers.length}
              open={showChurned}
              onClick={() => setShowChurned(!showChurned)}
            />
            {showChurned && (
              <ListBody>
                {churnedUsers.map((u) => {
                  const matched = baseUsers?.find((bu) => bu.id === u.id);
                  return (
                    <ListRow
                      key={u.id}
                      accent="red"
                      lead={<EngagementRing score={calculateEngagementScore(null)} />}
                      title={u.full_name || 'Unknown'}
                      subtitle={
                        <span className="capitalize">
                          {u.subscription_tier?.replace('_', ' ') || u.role || 'User'}
                        </span>
                      }
                      trailing={
                        <Pill tone="red">
                          {u.trial_end
                            ? formatDistanceToNow(parseISO(u.trial_end), {
                                addSuffix: true,
                              }).replace('about ', '')
                            : 'Churned'}
                        </Pill>
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
              title="New Subscriptions"
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
                const isNewUser =
                  sub.user_created_at && new Date(sub.user_created_at) >= today;
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
                        <Pill tone={isNewUser ? 'green' : 'blue'}>
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
          <>
            <Divider label="Messages" />
            <ListCard>
              <ListCardHeader
                tone="yellow"
                title="Support Inbox"
                meta={unreadSupportCount > 0 ? <Pill tone="yellow">{unreadSupportCount} unread</Pill> : undefined}
                action="All"
                onAction={() => navigate('/admin/user-messages')}
              />
              <ListBody>
                {supportMessages.slice(0, 5).map((msg) => {
                  const sender = msg.sender;
                  const isUnread = !msg.read_at;
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
                      trailing={
                        <span className="text-[11px] text-white tabular-nums">
                          {formatDistanceToNow(new Date(msg.created_at), {
                            addSuffix: true,
                          }).replace('about ', '')}
                        </span>
                      }
                      onClick={() => navigate('/admin/user-messages')}
                    />
                  );
                })}
              </ListBody>
            </ListCard>
          </>
        )}

        <UserManagementSheet
          user={selectedUser}
          open={!!selectedUser}
          onOpenChange={(open) => !open && setSelectedUser(null)}
        />
      </PageFrame>
    </PullToRefresh>
  );
}
