/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import {
  Users,
  TrendingUp,
  Clock,
  RefreshCw,
  ChevronRight,
  Crown,
  Zap,
  Activity,
  CreditCard,
  ShoppingCart,
  Eye,
  MessageSquare,
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { getInitials, getRoleColor } from '@/utils/adminUtils';
import { AnimatedCounter } from '@/components/dashboard/AnimatedCounter';
import UserManagementSheet from '@/components/admin/UserManagementSheet';
import UserActivitySheet from '@/components/admin/UserActivitySheet';
import { useAdminUsersBase, AdminUser } from '@/hooks/useAdminUsersBase';
import PullToRefresh from '@/components/admin/PullToRefresh';

/* ── animation variants ─────────────────────────────────────── */

const sectionVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.35, ease: 'easeOut' },
  }),
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0 },
  },
};

const listItemVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.2, ease: 'easeOut' } },
};

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

// Stripe subscription detail from edge function
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

// Stripe stats type
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
    trialingTierCounts: {
      founder: number;
      apprentice: number;
      electrician: number;
      employer: number;
      unknown: number;
    };
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

/* ── component ───────────────────────────────────────────────── */

export default function AdminDashboard() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [selectedOnlineUser, setSelectedOnlineUser] = useState<{
    userId: string;
    userName: string;
    userRole: string;
  } | null>(null);
  // Shared cached edge function call — reused across admin pages
  const { data: baseUsers } = useAdminUsersBase();

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ['admin-dashboard-stats'] }),
      queryClient.invalidateQueries({ queryKey: ['admin-stripe-live-stats'] }),
      queryClient.invalidateQueries({ queryKey: ['admin-online-users'] }),
      queryClient.invalidateQueries({ queryKey: ['admin-users-base'] }),
      queryClient.invalidateQueries({ queryKey: ['admin-pending-counts'] }),
    ]);
    setTimeout(() => setIsRefreshing(false), 500);
  }, [queryClient]);

  // Fetch LIVE Stripe stats
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

  // Source breakdown now comes from admin-stripe-stats (merged)
  const subscribersBySource = (stripeStats as any)?.subscribersBySource as
    | Record<string, number>
    | undefined;

  // Fetch dashboard stats
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
          // Trial users: not subscribed, no free access, and trial not expired (signed up within last 7 days)
          supabase
            .from('profiles')
            .select('role, full_name, created_at')
            .gte('created_at', weekAgo.toISOString()) // Trial = signed up within 7 days
            .or('subscribed.is.null,subscribed.eq.false')
            .or('free_access_granted.is.null,free_access_granted.eq.false'),
        ]);

      const trialData = trialDataRes.data || [];
      // Use shared cached baseUsers instead of separate edge function call
      const usersWithEmails = baseUsers || [];

      return {
        totalUsers: totalUsersRes.count || 0,
        signupsToday: signupsTodayRes.count || 0,
        signupsThisWeek: signupsWeekRes.count || 0,
        activeToday: activeTodayRes.count || 0,
        trialUsers: trialData.length,
        recentSignups: usersWithEmails.slice(0, 5),
      };
    },
  });

  // Online users
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

  // Support messages from users
  const { data: supportMessages } = useQuery<SupportMessage[]>({
    queryKey: ['admin-support-inbox'],
    queryFn: async () => {
      // Get messages sent TO admins (i.e., support requests from users)
      const { data: adminProfiles } = await supabase
        .from('profiles')
        .select('id')
        .not('admin_role', 'is', null);

      const adminIds = adminProfiles?.map((p) => p.id) || [];

      if (adminIds.length === 0) return [];

      // Get messages where recipient is an admin
      const { data } = await supabase
        .from('admin_messages')
        .select(
          `
          id,
          sender_id,
          recipient_id,
          subject,
          message,
          read_at,
          created_at,
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

  // Campaign stats for the dashboard card
  const { data: campaignStats } = useQuery({
    queryKey: ['admin-campaign-stats'],
    queryFn: async () => {
      const { data, error } = await supabase

        .from('email_tracking_events' as any)
        .select('email_id, event_type')
        .limit(10000);
      if (error) return { sent: 0, opened: 0, clicked: 0, openRate: '0', clickRate: '0' };

      const events = (data || []) as Array<{ email_id: string; event_type: string }>;
      const delivered = new Set(
        events.filter((e) => e.event_type === 'email.delivered').map((e) => e.email_id)
      ).size;
      const opened = new Set(
        events.filter((e) => e.event_type === 'email.opened').map((e) => e.email_id)
      ).size;
      const clicked = new Set(
        events.filter((e) => e.event_type === 'email.clicked').map((e) => e.email_id)
      ).size;
      const base = delivered || 1;
      return {
        sent: delivered,
        opened,
        clicked,
        openRate: ((opened / base) * 100).toFixed(1),
        clickRate: ((clicked / base) * 100).toFixed(1),
      };
    },
    staleTime: 60 * 1000,
    refetchInterval: 120000,
  });

  // Pending action counts for the dashboard card
  const { data: pendingCounts } = useQuery({
    queryKey: ['admin-pending-counts'],
    queryFn: async () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      // Trial = signed up 6-7 days ago (expiring today), not subscribed, no free access
      const sixDaysAgo = new Date(today);
      sixDaysAgo.setDate(sixDaysAgo.getDate() - 7);
      const fiveDaysAgo = new Date(today);
      fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 6);

      const [unreadMessagesRes, expiringTrialsRes] = await Promise.all([
        // Unread messages count
        supabase
          .from('admin_messages')
          .select('*', { count: 'exact', head: true })
          .is('read_at', null),
        // Trials expiring today: created 6-7 days ago, not subscribed, no free access
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
        // TODO: Add pending documents count when document_uploads table exists
        pendingDocuments: 0,
      };
    },
    staleTime: 30 * 1000,
    refetchInterval: 60000,
  });

  const totalPendingActions =
    (pendingCounts?.unreadMessages || 0) +
    (pendingCounts?.expiringTrials || 0) +
    (pendingCounts?.pendingDocuments || 0);

  const unreadSupportCount = supportMessages?.filter((m) => !m.read_at).length || 0;

  const liveUserCount =
    onlineUsers?.filter((a) => new Date(a.last_seen).getTime() > Date.now() - 5 * 60 * 1000)
      .length || 0;

  if (isLoading || stripeLoading) {
    return (
      <div className="space-y-4 animate-pulse p-1">
        <div className="h-48 bg-white/[0.03] rounded-2xl border border-white/[0.06]" />
        <div className="h-24 bg-white/[0.03] rounded-2xl border border-white/[0.06]" />
        <div className="grid grid-cols-2 gap-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-20 bg-white/[0.03] rounded-2xl border border-white/[0.06]" />
          ))}
        </div>
      </div>
    );
  }

  const stripeMrr = stripeStats?.stripe.mrr || 0;
  const mrr = stripeMrr;
  const arr = mrr * 12;
  const totalSubs = stripeStats?.stripe.activeSubscriptions || 0;
  const appStoreSubs = subscribersBySource?.app_store || 0;
  const playStoreSubs = subscribersBySource?.play_store || 0;

  // Abandoned checkouts: have stripe_customer_id but never subscribed and no free access
  const abandonedCheckouts =
    baseUsers?.filter((u) => u.stripe_customer_id && !u.subscribed && !u.free_access_granted) || [];

  // Recent subscriptions: combine active + trialing, filter to today, cross-reference with baseUsers
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

  const conversionRate = stats?.totalUsers ? Math.round((totalSubs / stats.totalUsers) * 100) : 0;

  return (
    <PullToRefresh
      onRefresh={async () => {
        await handleRefresh();
      }}
    >
      <div className="space-y-4 pb-24">
        {/* ── Revenue Hero ──────────────────────────────────── */}
        <motion.section custom={0} variants={sectionVariants} initial="hidden" animate="visible">
          <div
            className="relative overflow-hidden rounded-2xl bg-white/[0.03] border border-white/[0.08] touch-manipulation active:scale-[0.99] transition-transform cursor-pointer"
            onClick={() => navigate('/admin/revenue')}
          >
            {/* Amber accent line */}
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-amber-500 to-transparent" />

            {/* Warm glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-40 bg-amber-500/[0.06] rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-amber-600/[0.03] rounded-full blur-3xl" />

            <div className="relative p-5">
              {/* Header row */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-white text-[11px] font-semibold uppercase tracking-[0.15em]">
                    Live Revenue
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-11 w-11 text-white hover:text-white hover:bg-white/5 touch-manipulation"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRefresh();
                  }}
                  disabled={isFetching || isRefreshing}
                >
                  <RefreshCw
                    className={cn('h-4 w-4', (isFetching || isRefreshing) && 'animate-spin')}
                  />
                </Button>
              </div>

              {/* MRR */}
              <div className="mb-6">
                <p className="text-[42px] sm:text-5xl font-bold text-white tracking-tight leading-none">
                  <AnimatedCounter value={mrr} prefix="£" decimals={2} />
                </p>
                <p className="text-white text-sm mt-1.5 font-medium">Monthly Recurring Revenue</p>
              </div>

              {/* Metric row */}
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center">
                  <p className="text-xl sm:text-2xl font-bold text-amber-400">
                    <AnimatedCounter value={totalSubs + appStoreSubs + playStoreSubs} />
                  </p>
                  <p className="text-white text-[11px] font-medium uppercase tracking-wider mt-0.5">
                    Paying
                  </p>
                </div>
                <div className="text-center border-x border-white/[0.06]">
                  <p className="text-xl sm:text-2xl font-bold text-white">
                    <AnimatedCounter
                      value={arr / 1000}
                      prefix="£"
                      suffix="k"
                      decimals={arr >= 10000 ? 0 : 1}
                    />
                  </p>
                  <p className="text-white text-[11px] font-medium uppercase tracking-wider mt-0.5">
                    ARR
                  </p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1.5">
                    <Crown className="h-4 w-4 text-amber-400" />
                    <p className="text-xl sm:text-2xl font-bold text-amber-400">
                      <AnimatedCounter value={stripeStats?.stripe.tierCounts?.founder || 0} />
                    </p>
                  </div>
                  <p className="text-white text-[11px] font-medium uppercase tracking-wider mt-0.5">
                    Founders
                  </p>
                </div>
              </div>

              {/* Source row */}
              <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-white/[0.06]">
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  <span className="text-[11px] text-white font-medium">Stripe</span>
                  <span className="text-[11px] font-semibold text-purple-300">{totalSubs}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  <span className="text-[11px] text-white font-medium">App Store</span>
                  <span className="text-[11px] font-semibold text-blue-300">{appStoreSubs}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  <span className="text-[11px] text-white font-medium">Play Store</span>
                  <span className="text-[11px] font-semibold text-green-300">{playStoreSubs}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ── Quick Stats ───────────────────────────────────── */}
        <motion.section custom={1} variants={sectionVariants} initial="hidden" animate="visible">
          <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] overflow-hidden">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-4"
            >
              <motion.button
                variants={listItemVariants}
                whileTap={{ scale: 0.97 }}
                className="p-3 sm:p-4 text-center touch-manipulation border-r border-white/[0.06]"
                onClick={() => navigate('/admin/users')}
              >
                <Users className="h-4 w-4 text-blue-400 mx-auto mb-1.5" />
                <p className="text-xl sm:text-2xl font-bold text-white">
                  <AnimatedCounter value={stats?.totalUsers || 0} />
                </p>
                <p className="text-[10px] text-white font-medium uppercase tracking-wider">Users</p>
              </motion.button>

              <motion.button
                variants={listItemVariants}
                whileTap={{ scale: 0.97 }}
                className="p-3 sm:p-4 text-center touch-manipulation border-r border-white/[0.06]"
                onClick={() => navigate('/admin/users?filter=active')}
              >
                <Activity className="h-4 w-4 text-green-400 mx-auto mb-1.5" />
                <p className="text-xl sm:text-2xl font-bold text-white">
                  <AnimatedCounter value={stats?.activeToday || 0} />
                </p>
                <p className="text-[10px] text-white font-medium uppercase tracking-wider">
                  Active
                </p>
              </motion.button>

              <motion.button
                variants={listItemVariants}
                whileTap={{ scale: 0.97 }}
                className="p-3 sm:p-4 text-center touch-manipulation border-r border-white/[0.06]"
                onClick={() => navigate('/admin/users?filter=today')}
              >
                <CreditCard className="h-4 w-4 text-amber-400 mx-auto mb-1.5" />
                <p className="text-xl sm:text-2xl font-bold text-white">
                  <AnimatedCounter value={stats?.signupsToday || 0} />
                </p>
                <p className="text-[10px] text-white font-medium uppercase tracking-wider">Today</p>
              </motion.button>

              <motion.button
                variants={listItemVariants}
                whileTap={{ scale: 0.97 }}
                className="p-3 sm:p-4 text-center touch-manipulation"
                onClick={() => navigate('/admin/users?filter=trial')}
              >
                <Clock className="h-4 w-4 text-orange-400 mx-auto mb-1.5" />
                <p className="text-xl sm:text-2xl font-bold text-white">
                  <AnimatedCounter
                    value={stripeStats?.stripe.trialingSubscriptions ?? stats?.trialUsers ?? 0}
                  />
                </p>
                <p className="text-[10px] text-white font-medium uppercase tracking-wider">Trial</p>
              </motion.button>
            </motion.div>
          </div>
        </motion.section>

        {/* ── Abandoned Checkouts ────────────────────────────── */}
        {abandonedCheckouts.length > 0 && (
          <motion.section
            custom={2}
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            whileTap={{ scale: 0.98 }}
          >
            <div
              className="rounded-2xl bg-white/[0.03] border border-orange-500/20 overflow-hidden relative touch-manipulation cursor-pointer"
              onClick={() => navigate('/admin/incomplete-signup')}
            >
              <div className="absolute inset-x-0 top-0 h-px bg-orange-500/40" />
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                    <ShoppingCart className="h-5 w-5 text-orange-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-white">Abandoned Checkouts</p>
                    <p className="text-xs text-white">Started checkout, never subscribed</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-orange-400">
                    {abandonedCheckouts.length}
                  </span>
                  <ChevronRight className="h-4 w-4 text-white" />
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* ── Growth Row ────────────────────────────────────── */}
        <motion.section custom={3} variants={sectionVariants} initial="hidden" animate="visible">
          <div className="grid grid-cols-2 gap-3">
            <motion.div
              whileTap={{ scale: 0.97 }}
              className="rounded-2xl bg-white/[0.03] border border-white/[0.08] p-4 touch-manipulation cursor-pointer"
              onClick={() => navigate('/admin/analytics')}
            >
              <div className="flex items-center justify-between mb-3">
                <TrendingUp className="h-4 w-4 text-green-400" />
                <span className="text-[10px] text-white font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/[0.04]">
                  7d
                </span>
              </div>
              <p className="text-2xl font-bold text-white">
                <AnimatedCounter value={stats?.signupsThisWeek || 0} />
              </p>
              <p className="text-[11px] text-white font-medium mt-0.5">New this week</p>
            </motion.div>

            <motion.div
              whileTap={{ scale: 0.97 }}
              className="rounded-2xl bg-white/[0.03] border border-white/[0.08] p-4 touch-manipulation cursor-pointer"
              onClick={() => navigate('/admin/analytics')}
            >
              <div className="flex items-center justify-between mb-3">
                <Zap className="h-4 w-4 text-amber-400" />
                <span className="text-[10px] text-white font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/[0.04]">
                  Rate
                </span>
              </div>
              <p className="text-2xl font-bold text-amber-400">
                <AnimatedCounter value={conversionRate} suffix="%" />
              </p>
              <p className="text-[11px] text-white font-medium mt-0.5">Conversion</p>
            </motion.div>
          </div>
        </motion.section>

        {/* ── Section divider ───────────────────────────────── */}
        <div className="flex items-center gap-3 pt-2">
          <div className="h-px flex-1 bg-white/[0.06]" />
          <span className="text-[10px] text-amber-400 font-semibold uppercase tracking-[0.2em]">
            Activity
          </span>
          <div className="h-px flex-1 bg-white/[0.06]" />
        </div>

        {/* ── Live Users ────────────────────────────────────── */}
        <motion.section custom={5} variants={sectionVariants} initial="hidden" animate="visible">
          <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] overflow-hidden">
            <div className="p-4 border-b border-white/[0.06] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="font-semibold text-sm text-white">Live Now</span>
                <span className="text-[11px] text-green-400 font-medium">
                  {liveUserCount} online
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs h-11 px-3 touch-manipulation text-white hover:text-white"
                onClick={() => navigate('/admin/users')}
              >
                All
                <ChevronRight className="h-3 w-3 ml-0.5" />
              </Button>
            </div>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="divide-y divide-white/[0.04]"
            >
              {onlineUsers?.slice(0, 5).map((activity) => {
                const lastSeenMs = new Date(activity.last_seen).getTime();
                const diffMins = Math.floor((Date.now() - lastSeenMs) / 60000);
                const isOnline = diffMins < 5;
                const profile = activity.profiles;
                const roleColor = getRoleColor(profile?.role);

                return (
                  <motion.button
                    key={activity.user_id}
                    variants={listItemVariants}
                    onClick={() =>
                      setSelectedOnlineUser({
                        userId: activity.user_id,
                        userName: profile?.full_name || 'Unknown',
                        userRole: profile?.role || '',
                      })
                    }
                    className="w-full flex items-center gap-3 p-3 hover:bg-white/[0.03] active:bg-white/[0.06] transition-colors touch-manipulation"
                  >
                    <div
                      className={cn(
                        'w-9 h-9 rounded-lg flex items-center justify-center relative font-semibold text-xs shrink-0',
                        roleColor.bg,
                        roleColor.text
                      )}
                    >
                      {getInitials(profile?.full_name)}
                      <div
                        className={cn(
                          'absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-background',
                          isOnline ? 'bg-green-500' : 'bg-white/20'
                        )}
                      />
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <p className="font-medium text-sm truncate text-white">
                        {profile?.full_name || 'Unknown'}
                      </p>
                      <p className="text-xs text-white">
                        {isOnline ? 'Active now' : `${diffMins}m ago`}
                        {activity.current_page &&
                          ` · ${activity.current_page.replace(/^\//, '').split('/')[0] || 'Home'}`}
                      </p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-white shrink-0" />
                  </motion.button>
                );
              })}
              {(!onlineUsers || onlineUsers.length === 0) && (
                <div className="p-8 text-center">
                  <Eye className="h-6 w-6 mx-auto mb-2 text-white" />
                  <p className="text-sm text-white">No active users</p>
                </div>
              )}
            </motion.div>
          </div>
        </motion.section>

        {/* ── Recent Signups ────────────────────────────────── */}
        <motion.section custom={6} variants={sectionVariants} initial="hidden" animate="visible">
          <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] overflow-hidden">
            <div className="p-4 border-b border-white/[0.06] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span className="font-semibold text-sm text-white">Recent Signups</span>
              </div>
              <span className="text-[11px] text-white font-medium">
                {stats?.signupsThisWeek} this week
              </span>
            </div>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="divide-y divide-white/[0.04]"
            >
              {stats?.recentSignups?.slice(0, 5).map((user) => {
                const roleColor = getRoleColor(user.role);
                return (
                  <motion.button
                    key={user.id}
                    variants={listItemVariants}
                    onClick={() => setSelectedUser(user)}
                    className="w-full flex items-center gap-3 p-3 hover:bg-white/[0.03] active:bg-white/[0.06] transition-colors touch-manipulation"
                  >
                    <div
                      className={cn(
                        'w-9 h-9 rounded-lg flex items-center justify-center font-semibold text-xs shrink-0',
                        roleColor.bg,
                        roleColor.text
                      )}
                    >
                      {getInitials(user.full_name)}
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <p className="font-medium text-sm truncate text-white">
                        {user.full_name || 'Unknown'}
                      </p>
                      <p className="text-xs text-white truncate">{user.email}</p>
                    </div>
                    <div className="text-right shrink-0 flex items-center gap-2">
                      {user.subscribed && (
                        <span className="text-[10px] font-semibold text-green-400 uppercase tracking-wider">
                          Pro
                        </span>
                      )}
                      <span className="text-xs text-white">
                        {formatDistanceToNow(new Date(user.created_at), {
                          addSuffix: true,
                        }).replace('about ', '')}
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </motion.div>
          </div>
        </motion.section>

        {/* ── Recent Subscriptions ──────────────────────────── */}
        {recentSubscriptions.length > 0 && (
          <motion.section custom={7} variants={sectionVariants} initial="hidden" animate="visible">
            <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] overflow-hidden">
              <div className="p-4 border-b border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  <span className="font-semibold text-sm text-white">New Subscriptions</span>
                </div>
                <span className="text-[11px] text-white font-medium">
                  {recentSubscriptions.length} today
                </span>
              </div>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="divide-y divide-white/[0.04]"
              >
                {recentSubscriptions.map((sub) => {
                  const roleColor = getRoleColor(sub.role);
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  const isNewUser = sub.user_created_at && new Date(sub.user_created_at) >= today;

                  return (
                    <motion.button
                      key={sub.subscriptionId}
                      variants={listItemVariants}
                      onClick={() => {
                        if (sub.matchedUser) setSelectedUser(sub.matchedUser);
                      }}
                      className="w-full flex items-center gap-3 p-3 hover:bg-white/[0.03] active:bg-white/[0.06] transition-colors touch-manipulation"
                    >
                      <div
                        className={cn(
                          'w-9 h-9 rounded-lg flex items-center justify-center font-semibold text-xs shrink-0',
                          roleColor.bg,
                          roleColor.text
                        )}
                      >
                        {getInitials(sub.full_name)}
                      </div>
                      <div className="flex-1 min-w-0 text-left">
                        <p className="font-medium text-sm truncate text-white">{sub.full_name}</p>
                        <p className="text-xs text-white truncate">{sub.customerEmail}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[10px] font-semibold text-amber-400 uppercase tracking-wider capitalize">
                          {sub.tier}
                        </span>
                        {isNewUser ? (
                          <span className="text-[10px] font-semibold text-green-400 uppercase tracking-wider">
                            New
                          </span>
                        ) : (
                          <span className="text-[10px] font-semibold text-blue-400 uppercase tracking-wider">
                            Return
                          </span>
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </motion.div>
            </div>
          </motion.section>
        )}

        {/* ── Support Inbox ─────────────────────────────────── */}
        {supportMessages && supportMessages.length > 0 && (
          <>
            <div className="flex items-center gap-3 pt-2">
              <div className="h-px flex-1 bg-white/[0.06]" />
              <span className="text-[10px] text-amber-400 font-semibold uppercase tracking-[0.2em]">
                Messages
              </span>
              <div className="h-px flex-1 bg-white/[0.06]" />
            </div>

            <motion.section
              custom={8}
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] overflow-hidden">
                <div className="p-4 border-b border-white/[0.06] flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <MessageSquare className="h-4 w-4 text-amber-400" />
                    <span className="font-semibold text-sm text-white">Support Inbox</span>
                    {unreadSupportCount > 0 && (
                      <span className="text-[10px] font-bold text-black bg-amber-400 rounded-full px-1.5 py-0.5 leading-none">
                        {unreadSupportCount}
                      </span>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs h-11 px-3 touch-manipulation text-white hover:text-white"
                    onClick={() => navigate('/admin/user-messages')}
                  >
                    All
                    <ChevronRight className="h-3 w-3 ml-0.5" />
                  </Button>
                </div>
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="divide-y divide-white/[0.04]"
                >
                  {supportMessages.slice(0, 5).map((msg) => {
                    const sender = msg.sender;
                    const roleColor = getRoleColor(sender?.role);
                    const isUnread = !msg.read_at;

                    return (
                      <motion.button
                        key={msg.id}
                        variants={listItemVariants}
                        onClick={() => navigate('/admin/user-messages')}
                        className={cn(
                          'w-full flex items-start gap-3 p-3 text-left transition-colors touch-manipulation',
                          isUnread
                            ? 'bg-amber-500/[0.03] hover:bg-amber-500/[0.06]'
                            : 'hover:bg-white/[0.03] active:bg-white/[0.06]'
                        )}
                      >
                        <div className="relative shrink-0">
                          <div
                            className={cn(
                              'w-9 h-9 rounded-lg flex items-center justify-center font-semibold text-xs',
                              roleColor.bg,
                              roleColor.text
                            )}
                          >
                            {getInitials(sender?.full_name)}
                          </div>
                          {isUnread && (
                            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-amber-400 border-2 border-background" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <p
                              className={cn(
                                'text-sm truncate text-white',
                                isUnread ? 'font-semibold' : 'font-medium'
                              )}
                            >
                              {sender?.full_name || 'Unknown'}
                            </p>
                            <span className="text-[11px] text-white shrink-0">
                              {formatDistanceToNow(new Date(msg.created_at), {
                                addSuffix: true,
                              }).replace('about ', '')}
                            </span>
                          </div>
                          {msg.subject && msg.subject !== 'Support Request' && (
                            <p className="text-xs text-white truncate mt-0.5">{msg.subject}</p>
                          )}
                          <p className="text-xs text-white line-clamp-2 mt-0.5">{msg.message}</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-white shrink-0 mt-1" />
                      </motion.button>
                    );
                  })}
                </motion.div>
              </div>
            </motion.section>
          </>
        )}

        {/* ── User Sheets ──────────────────────────────────── */}
        <UserManagementSheet
          user={selectedUser}
          open={!!selectedUser}
          onOpenChange={(open) => !open && setSelectedUser(null)}
        />

        <UserActivitySheet
          userId={selectedOnlineUser?.userId || null}
          userName={selectedOnlineUser?.userName || null}
          userRole={selectedOnlineUser?.userRole || null}
          open={!!selectedOnlineUser}
          onOpenChange={(open) => !open && setSelectedOnlineUser(null)}
        />
      </div>
    </PullToRefresh>
  );
}
