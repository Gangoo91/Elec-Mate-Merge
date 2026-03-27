import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Badge } from '@/components/ui/badge';
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
  Mail,
  MessageSquare,
  Bell,
  FileCheck,
  Send,
  MailOpen,
  MousePointerClick,
  Gift,
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      <div className="space-y-5 sm:space-y-6 animate-pulse p-1">
        <div className="h-44 bg-gradient-to-br from-amber-900/50 to-amber-950/30 rounded-3xl" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-20 bg-white/5 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  const mrr = stripeStats?.stripe.mrr || 0;
  const arr = mrr * 12;
  const totalSubs = stripeStats?.stripe.activeSubscriptions || 0;

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

  return (
    <PullToRefresh
      onRefresh={async () => {
        await handleRefresh();
      }}
    >
      <div className="space-y-5 sm:space-y-6 pb-24">
        {/* ── Hero Revenue Card ─────────────────────────────── */}
        <motion.section custom={0} variants={sectionVariants} initial="hidden" animate="visible">
          <div
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-600 via-yellow-600 to-orange-700 touch-manipulation active:scale-[0.99] transition-transform cursor-pointer"
            onClick={() => navigate('/admin/revenue')}
          >
            {/* Gradient accent line */}
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-amber-500 via-yellow-400 to-orange-500" />

            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4" />

            <div className="relative p-5">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                  <span className="text-white text-xs font-medium uppercase tracking-wider">
                    Live Revenue
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-11 w-11 text-white hover:text-white hover:bg-white/10 touch-manipulation"
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
              <div className="mb-4">
                <p className="text-5xl font-bold text-white tracking-tight">
                  <AnimatedCounter value={mrr} prefix="£" decimals={2} />
                </p>
                <p className="text-white text-sm mt-1">Monthly Recurring Revenue</p>
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2.5 sm:p-3">
                  <p className="text-xl sm:text-2xl font-bold text-white">
                    <AnimatedCounter value={totalSubs} />
                  </p>
                  <p className="text-white text-xs sm:text-[11px] uppercase">Paying</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2.5 sm:p-3">
                  <p className="text-xl sm:text-2xl font-bold text-white">
                    <AnimatedCounter
                      value={arr / 1000}
                      prefix="£"
                      suffix="k"
                      decimals={arr >= 10000 ? 0 : 1}
                    />
                  </p>
                  <p className="text-white text-xs sm:text-[11px] uppercase">ARR</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2.5 sm:p-3">
                  <div className="flex items-center justify-center gap-1">
                    <Crown className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-yellow-400" />
                    <p className="text-xl sm:text-2xl font-bold text-white">
                      <AnimatedCounter value={stripeStats?.stripe.tierCounts?.founder || 0} />
                    </p>
                  </div>
                  <p className="text-white text-xs sm:text-[11px] uppercase">Founders</p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Pending Actions removed — ELE-467 cleanup */}

        {/* ── Abandoned Checkouts Card ─────────────────────── */}
        {abandonedCheckouts.length > 0 && (
          <motion.section
            custom={2}
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <div
              className="glass-premium rounded-2xl overflow-hidden relative touch-manipulation cursor-pointer"
              onClick={() => navigate('/admin/incomplete-signup')}
            >
              {/* Orange gradient accent line */}
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-orange-500 via-red-400 to-orange-500 opacity-60" />

              <div className="relative z-10 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/15 flex items-center justify-center">
                    <ShoppingCart className="h-5 w-5 text-orange-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-white">Abandoned Checkouts</p>
                    <p className="text-xs text-white">Started checkout but never subscribed</p>
                  </div>
                </div>
                <Badge className="bg-orange-500/20 text-orange-400 border-0 text-base px-3 py-1">
                  {abandonedCheckouts.length}
                </Badge>
              </div>
            </div>
          </motion.section>
        )}

        {/* Campaigns removed — ELE-467 cleanup */}

        {/* ── Section Header: Overview ─────────────────────── */}
        <p className="text-xs sm:text-sm font-medium text-white uppercase tracking-wider mb-3 px-0.5">
          Overview
        </p>

        {/* ── Quick Stats Grid ─────────────────────────────── */}
        <motion.section custom={4} variants={sectionVariants} initial="hidden" animate="visible">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 sm:grid-cols-4 gap-2"
          >
            <motion.div
              variants={listItemVariants}
              whileTap={{ scale: 0.97 }}
              className="bg-white/5 rounded-xl p-3 sm:p-3 text-center touch-manipulation cursor-pointer"
              onClick={() => navigate('/admin/users')}
            >
              <Users className="h-5 w-5 text-blue-400 mx-auto mb-1" />
              <p className="text-2xl sm:text-xl font-bold text-blue-400">
                <AnimatedCounter value={stats?.totalUsers || 0} />
              </p>
              <p className="text-xs text-white">Users</p>
            </motion.div>

            <motion.div
              variants={listItemVariants}
              whileTap={{ scale: 0.97 }}
              className="bg-white/5 rounded-xl p-3 sm:p-3 text-center touch-manipulation cursor-pointer"
              onClick={() => navigate('/admin/users?filter=active')}
            >
              <Activity className="h-5 w-5 text-green-400 mx-auto mb-1" />
              <p className="text-2xl sm:text-xl font-bold text-green-400">
                <AnimatedCounter value={stats?.activeToday || 0} />
              </p>
              <p className="text-xs text-white">Active</p>
            </motion.div>

            <motion.div
              variants={listItemVariants}
              whileTap={{ scale: 0.97 }}
              className="bg-white/5 rounded-xl p-3 sm:p-3 text-center touch-manipulation cursor-pointer"
              onClick={() => navigate('/admin/users?filter=today')}
            >
              <CreditCard className="h-5 w-5 text-yellow-400 mx-auto mb-1" />
              <p className="text-2xl sm:text-xl font-bold text-yellow-400">
                <AnimatedCounter value={stats?.signupsToday || 0} />
              </p>
              <p className="text-xs text-white">Subs Today</p>
            </motion.div>

            <motion.div
              variants={listItemVariants}
              whileTap={{ scale: 0.97 }}
              className="bg-white/5 rounded-xl p-3 sm:p-3 text-center touch-manipulation cursor-pointer"
              onClick={() => navigate('/admin/users?filter=trial')}
            >
              <Clock className="h-5 w-5 text-orange-400 mx-auto mb-1" />
              <p className="text-2xl sm:text-xl font-bold text-orange-400">
                <AnimatedCounter
                  value={stripeStats?.stripe.trialingSubscriptions ?? stats?.trialUsers ?? 0}
                />
              </p>
              <p className="text-xs text-white">Trial</p>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* ── Section Header: Users & Activity ─────────────── */}
        <p className="text-xs sm:text-sm font-medium text-white uppercase tracking-wider mb-3 px-0.5">
          Users & Activity
        </p>

        {/* ── Live Users Section ───────────────────────────── */}
        <motion.section custom={6} variants={sectionVariants} initial="hidden" animate="visible">
          <div className="glass-premium rounded-2xl overflow-hidden relative">
            {/* Green gradient accent line */}
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-green-500 via-emerald-400 to-green-500 opacity-60" />

            <div className="relative z-10">
              <div className="p-4 border-b border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="font-semibold text-sm text-white">Live Now</span>
                  <Badge variant="secondary" className="text-xs px-2 py-0">
                    {liveUserCount} online
                  </Badge>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs h-11 px-3 touch-manipulation text-white"
                  onClick={() => navigate('/admin/users')}
                >
                  View All
                  <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="divide-y divide-white/[0.06]"
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
                      className="w-full flex items-center gap-3 p-3 hover:bg-white/5 active:bg-white/10 transition-colors touch-manipulation"
                    >
                      <div
                        className={cn(
                          'w-10 h-10 rounded-xl flex items-center justify-center relative font-semibold text-sm shrink-0',
                          roleColor.bg,
                          roleColor.text
                        )}
                      >
                        {getInitials(profile?.full_name)}
                        <div
                          className={cn(
                            'absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-background',
                            isOnline ? 'bg-green-500' : 'bg-gray-400'
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
                            ` • ${activity.current_page.replace(/^\//, '').split('/')[0] || 'Home'}`}
                        </p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-white shrink-0" />
                    </motion.button>
                  );
                })}
                {(!onlineUsers || onlineUsers.length === 0) && (
                  <div className="p-8 text-center text-white">
                    <Eye className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No active users</p>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* ── Recent Signups ───────────────────────────────── */}
        <motion.section custom={7} variants={sectionVariants} initial="hidden" animate="visible">
          <div className="glass-premium rounded-2xl overflow-hidden relative">
            {/* Blue gradient accent line */}
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 opacity-60" />

            <div className="relative z-10">
              <div className="p-4 border-b border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-blue-400" />
                  <span className="font-semibold text-sm text-white">Recent Signups</span>
                </div>
                <Badge variant="secondary" className="text-xs px-2 py-0">
                  {stats?.signupsThisWeek} this week
                </Badge>
              </div>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="divide-y divide-white/[0.06]"
              >
                {stats?.recentSignups?.slice(0, 5).map((user) => {
                  const roleColor = getRoleColor(user.role);
                  return (
                    <motion.button
                      key={user.id}
                      variants={listItemVariants}
                      onClick={() => setSelectedUser(user)}
                      className="w-full flex items-center gap-3 p-3 hover:bg-white/5 active:bg-white/10 transition-colors touch-manipulation"
                    >
                      <div
                        className={cn(
                          'w-10 h-10 rounded-xl flex items-center justify-center font-semibold text-sm shrink-0',
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
                      <div className="text-right shrink-0">
                        <p className="text-xs text-white">
                          {formatDistanceToNow(new Date(user.created_at), {
                            addSuffix: true,
                          }).replace('about ', '')}
                        </p>
                        {user.subscribed && (
                          <Badge className="text-[11px] px-1.5 py-0 bg-emerald-500/20 text-emerald-400 border-0">
                            Pro
                          </Badge>
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* ── Recent Subscriptions ─────────────────────────── */}
        {recentSubscriptions.length > 0 && (
          <motion.section custom={8} variants={sectionVariants} initial="hidden" animate="visible">
            <div className="glass-premium rounded-2xl overflow-hidden relative">
              {/* Emerald gradient accent line */}
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 opacity-60" />

              <div className="relative z-10">
                <div className="p-4 border-b border-white/[0.06] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-emerald-400" />
                    <span className="font-semibold text-sm text-white">Recent Subscriptions</span>
                  </div>
                  <Badge variant="secondary" className="text-xs px-2 py-0">
                    {recentSubscriptions.length} today
                  </Badge>
                </div>
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="divide-y divide-white/[0.06]"
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
                        className="w-full flex items-center gap-3 p-3 hover:bg-white/5 active:bg-white/10 transition-colors touch-manipulation"
                      >
                        <div
                          className={cn(
                            'w-10 h-10 rounded-xl flex items-center justify-center font-semibold text-sm shrink-0',
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
                        <div className="flex flex-col items-end gap-1 shrink-0">
                          <div className="flex items-center gap-1">
                            <Badge className="text-[11px] px-1.5 py-0 bg-emerald-500/20 text-emerald-400 border-0 capitalize">
                              {sub.tier}
                            </Badge>
                            {isNewUser ? (
                              <Badge className="text-[11px] px-1.5 py-0 bg-green-500/20 text-green-400 border-0">
                                New
                              </Badge>
                            ) : (
                              <Badge className="text-[11px] px-1.5 py-0 bg-blue-500/20 text-blue-400 border-0">
                                Returning
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-white">
                            {formatDistanceToNow(new Date(sub.created), {
                              addSuffix: true,
                            }).replace('about ', '')}
                          </p>
                        </div>
                      </motion.button>
                    );
                  })}
                </motion.div>
              </div>
            </div>
          </motion.section>
        )}

        {/* ── Section Header: Communication ────────────────── */}
        {supportMessages && supportMessages.length > 0 && (
          <p className="text-xs sm:text-sm font-medium text-white uppercase tracking-wider mb-3 px-0.5">
            Communication
          </p>
        )}

        {/* ── Support Inbox ────────────────────────────────── */}
        {supportMessages && supportMessages.length > 0 && (
          <motion.section custom={9} variants={sectionVariants} initial="hidden" animate="visible">
            <div className="glass-premium rounded-2xl overflow-hidden relative">
              {/* Yellow gradient accent line */}
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-500 opacity-60" />

              <div className="relative z-10">
                <div className="p-4 border-b border-white/[0.06] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-yellow-400" />
                    <span className="font-semibold text-sm text-white">Support Inbox</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {unreadSupportCount > 0 && (
                      <Badge className="text-xs px-2 py-0 bg-yellow-500 text-black font-semibold">
                        {unreadSupportCount} new
                      </Badge>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs h-11 px-3 touch-manipulation text-white"
                      onClick={() => navigate('/admin/user-messages')}
                    >
                      View All
                      <ChevronRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </div>
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="divide-y divide-white/[0.06]"
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
                            ? 'bg-yellow-500/5 hover:bg-yellow-500/10 active:bg-yellow-500/15'
                            : 'hover:bg-white/5 active:bg-white/10'
                        )}
                      >
                        <div className="relative shrink-0">
                          <div
                            className={cn(
                              'w-10 h-10 rounded-xl flex items-center justify-center font-semibold text-sm',
                              roleColor.bg,
                              roleColor.text
                            )}
                          >
                            {getInitials(sender?.full_name)}
                          </div>
                          {isUnread && (
                            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-yellow-500 border-2 border-background" />
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
                            <span className="text-xs text-white shrink-0">
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
            </div>
          </motion.section>
        )}

        {/* ── Growth Stats ─────────────────────────────────── */}
        <motion.section custom={10} variants={sectionVariants} initial="hidden" animate="visible">
          <div className="grid grid-cols-2 gap-3">
            <motion.div
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white/5 rounded-xl p-4 touch-manipulation cursor-pointer"
              onClick={() => navigate('/admin/analytics')}
            >
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="h-5 w-5 text-green-400" />
                <span className="text-xs text-white px-2 py-0.5 rounded bg-white/5">7d</span>
              </div>
              <p className="text-2xl font-bold text-white">
                <AnimatedCounter value={stats?.signupsThisWeek || 0} />
              </p>
              <p className="text-xs text-white">New this week</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white/5 rounded-xl p-4 touch-manipulation cursor-pointer"
              onClick={() => navigate('/admin/analytics')}
            >
              <div className="flex items-center justify-between mb-2">
                <Zap className="h-5 w-5 text-yellow-400" />
                <span className="text-xs text-white px-2 py-0.5 rounded bg-white/5">Rate</span>
              </div>
              <p className="text-2xl font-bold text-white">
                <AnimatedCounter
                  value={stats?.totalUsers ? Math.round((totalSubs / stats.totalUsers) * 100) : 0}
                  suffix="%"
                />
              </p>
              <p className="text-xs text-white">Conversion</p>
            </motion.div>
          </div>
        </motion.section>

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
