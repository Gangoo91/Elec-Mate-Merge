import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  TrendingUp,
  Users,
  UserPlus,
  Activity,
  Calendar,
  RefreshCw,
  ArrowUp,
  ArrowDown,
  Minus,
  CreditCard,
  FileCheck,
  Cpu,
  BarChart3,
  Filter,
} from 'lucide-react';
import { format, subDays, startOfDay, endOfDay } from 'date-fns';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';
import { AnimatedCounter } from '@/components/dashboard/AnimatedCounter';
import PullToRefresh from '@/components/admin/PullToRefresh';
import AdminPageHeader from '@/components/admin/AdminPageHeader';

type DateRangeKey = 'today' | '7d' | '14d' | '30d' | '90d';

const DATE_RANGES: { key: DateRangeKey; label: string; days: number }[] = [
  { key: 'today', label: 'Today', days: 0 },
  { key: '7d', label: '7d', days: 7 },
  { key: '14d', label: '14d', days: 14 },
  { key: '30d', label: '30d', days: 30 },
  { key: '90d', label: '90d', days: 90 },
];

const ROLE_COLOURS: Record<string, { bg: string; text: string }> = {
  apprentice: { bg: 'bg-purple-500', text: 'text-purple-300' },
  electrician: { bg: 'bg-yellow-500', text: 'text-yellow-300' },
  employer: { bg: 'bg-blue-500', text: 'text-blue-300' },
  college: { bg: 'bg-green-500', text: 'text-green-300' },
  visitor: { bg: 'bg-gray-500', text: 'text-gray-300' },
};

/* ------------------------------------------------------------------ */
/*  Sparkline mini-chart                                              */
/* ------------------------------------------------------------------ */
const Sparkline = ({
  data,
  color,
  height = 24,
  width = 80,
}: {
  data: number[];
  color: string;
  height?: number;
  width?: number;
}) => {
  if (!data.length || data.every((d) => d === 0)) return null;
  const max = Math.max(...data, 1);
  const points = data
    .map((v, i) => `${(i / (data.length - 1)) * width},${height - (v / max) * height}`)
    .join(' ');
  return (
    <svg width={width} height={height} className="shrink-0">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

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
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
};

const listItemVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.2, ease: 'easeOut' } },
};

/* ------------------------------------------------------------------ */
/*  Funnel visualisation                                              */
/* ------------------------------------------------------------------ */
interface FunnelStep {
  label: string;
  count: number;
  colour: string;
  bgColour: string;
}

function FunnelViz({ analytics }: { analytics: Record<string, number> }) {
  const steps: FunnelStep[] = [
    {
      label: 'Signed Up',
      count: analytics.funnelSignedUp,
      colour: 'text-blue-400',
      bgColour: 'bg-blue-500',
    },
    {
      label: 'Logged In',
      count: analytics.funnelLoggedIn,
      colour: 'text-green-400',
      bgColour: 'bg-green-500',
    },
    {
      label: 'Used Feature',
      count: analytics.funnelUsedFeature,
      colour: 'text-amber-400',
      bgColour: 'bg-amber-500',
    },
    {
      label: 'Subscribed',
      count: analytics.funnelSubscribed,
      colour: 'text-emerald-400',
      bgColour: 'bg-emerald-500',
    },
  ];

  const maxCount = steps[0].count || 1;

  return (
    <div className="space-y-2">
      {/* Bars */}
      <div className="space-y-1.5">
        {steps.map((step, i) => {
          const widthPct = Math.max((step.count / maxCount) * 100, 8);
          const prevCount = i > 0 ? steps[i - 1].count : step.count;
          const dropPct = prevCount > 0 ? ((step.count / prevCount) * 100).toFixed(0) : '100';

          return (
            <div key={step.label} className="flex items-center gap-2">
              <div className="flex-1">
                <div
                  className={`${step.bgColour}/30 h-8 rounded-lg flex items-center px-3 transition-all`}
                  style={{ width: `${widthPct}%` }}
                >
                  <span className={`text-xs font-semibold ${step.colour} whitespace-nowrap`}>
                    {step.count}
                  </span>
                </div>
              </div>
              <div className="w-24 flex-shrink-0 text-right">
                <p className="text-xs font-medium text-white">{step.label}</p>
                {i > 0 && <p className="text-[10px] text-white">{dropPct}% of prev</p>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Role stacked bar                                                  */
/* ------------------------------------------------------------------ */
function RoleStackedBar({
  roleBreakdown,
  total,
}: {
  roleBreakdown: Record<string, number>;
  total: number;
}) {
  const entries = Object.entries(roleBreakdown).sort((a, b) => b[1] - a[1]);

  if (total === 0) {
    return <p className="text-xs text-white">No users yet</p>;
  }

  return (
    <div className="space-y-3">
      {/* Stacked bar */}
      <div className="h-8 rounded-lg overflow-hidden flex">
        {entries.map(([role, count]) => {
          const pct = (count / total) * 100;
          const colours = ROLE_COLOURS[role] || ROLE_COLOURS.visitor;
          return (
            <div
              key={role}
              className={`${colours.bg} h-full transition-all flex items-center justify-center`}
              style={{ width: `${pct}%` }}
              title={`${role}: ${count}`}
            >
              {pct > 8 && <span className="text-[10px] font-bold text-black">{count}</span>}
            </div>
          );
        })}
      </div>
      {/* Legend */}
      <div className="flex flex-wrap gap-x-4 gap-y-1">
        {entries.map(([role, count]) => {
          const colours = ROLE_COLOURS[role] || ROLE_COLOURS.visitor;
          const pct = ((count / total) * 100).toFixed(0);
          return (
            <div key={role} className="flex items-center gap-1.5">
              <div className={`w-2.5 h-2.5 rounded-full ${colours.bg}`} />
              <span className="text-xs text-white capitalize">
                {role} {count} ({pct}%)
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function AdminAnalytics() {
  const [chartPeriod, setChartPeriod] = useState<'7d' | '30d'>('7d');
  const [dateRange, setDateRange] = useState<DateRangeKey>('30d');

  // Revenue forecast data
  const { data: forecastData } = useQuery({
    queryKey: ['admin-revenue-forecast'],
    queryFn: async () => {
      const { count: trialCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('is_trial', true)
        .not('trial_end', 'is', null);

      const { count: paidCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('subscribed', true)
        .eq('is_trial', false);

      // Fetch tier breakdown for weighted average revenue
      const { data: tierData } = await supabase
        .from('profiles')
        .select('subscription_tier')
        .eq('subscribed', true)
        .eq('is_trial', false);

      const tierPricing: Record<string, number> = {
        apprentice: 4.99,
        electrician: 9.99,
        employer: 29.99,
      };

      const tiers = tierData || [];
      const totalRevenue = tiers.reduce(
        (sum, t) => sum + (tierPricing[t.subscription_tier?.toLowerCase() || ''] || 9.99),
        0
      );
      const avgRevenue = tiers.length > 0 ? totalRevenue / tiers.length : 9.99;
      const currentMRR = totalRevenue;
      const conversionRate = 0.3;
      const projectedConversions = (trialCount || 0) * conversionRate;
      const projectedMRR = currentMRR + projectedConversions * avgRevenue;

      return {
        currentMRR,
        projectedMRR,
        trialCount: trialCount || 0,
        paidCount: paidCount || 0,
        conversionRate,
        projectedConversions,
        avgRevenue,
      };
    },
    staleTime: 60000,
  });

  // Fetch analytics data
  const {
    data: analytics,
    isLoading,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ['admin-analytics', dateRange],
    queryFn: async () => {
      const now = new Date();
      const today = startOfDay(now);
      const yesterday = startOfDay(subDays(now, 1));
      const weekAgo = startOfDay(subDays(now, 7));
      const twoWeeksAgo = startOfDay(subDays(now, 14));
      const monthAgo = startOfDay(subDays(now, 30));

      // Range-aware date boundary
      const rangeDays = DATE_RANGES.find((r) => r.key === dateRange)?.days ?? 30;
      const rangeStart = rangeDays === 0 ? today : startOfDay(subDays(now, rangeDays));

      // Get signup counts for different periods
      const [
        totalUsersRes,
        todaySignupsRes,
        yesterdaySignupsRes,
        weekSignupsRes,
        prevWeekSignupsRes,
        monthSignupsRes,
        subscribedRes,
        activeRes,
        { data: roleData },
        aiUsersRes,
        certsRes,
        rangeSignupsRes,
        loggedInRes,
        featureUsersRes,
      ] = await Promise.all([
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', today.toISOString()),
        supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', yesterday.toISOString())
          .lt('created_at', today.toISOString()),
        supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', weekAgo.toISOString()),
        supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', twoWeeksAgo.toISOString())
          .lt('created_at', weekAgo.toISOString()),
        supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', monthAgo.toISOString()),
        supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true })
          .eq('subscribed', true),
        supabase
          .from('user_presence')
          .select('*', { count: 'exact', head: true })
          .gte('last_seen', subDays(now, 1).toISOString()),
        supabase.from('profiles').select('role'),
        supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true })
          .eq('business_ai_enabled', true),
        supabase.from('reports').select('*', { count: 'exact', head: true }),
        // Range-filtered signups
        supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', rangeStart.toISOString()),
        // Funnel: users who have logged in (login_count > 0)
        supabase
          .from('user_activity_summary')
          .select('user_id', { count: 'exact', head: true })
          .gt('login_count', 0),
        // Funnel: users who have used a feature (feature_use_count > 0)
        supabase
          .from('user_activity_summary')
          .select('user_id', { count: 'exact', head: true })
          .gt('feature_use_count', 0),
      ]);

      const roleBreakdown: Record<string, number> = {};
      roleData?.forEach((r) => {
        const role = r.role || 'visitor';
        roleBreakdown[role] = (roleBreakdown[role] || 0) + 1;
      });

      // Get daily signups for the last 30 days - batch all queries in parallel
      const dailyDates30 = Array.from({ length: 30 }, (_, i) => {
        const date = subDays(now, 29 - i);
        return { date, start: startOfDay(date), end: endOfDay(date) };
      });

      const dailyResults30 = await Promise.all(
        dailyDates30.map(({ start, end }) =>
          supabase
            .from('profiles')
            .select('*', { count: 'exact', head: true })
            .gte('created_at', start.toISOString())
            .lte('created_at', end.toISOString())
        )
      );

      const dailySignups30 = dailyDates30.map(({ date }, i) => ({
        date: format(date, 'd MMM'),
        dateShort: format(date, 'EEE'),
        count: dailyResults30[i].count || 0,
      }));

      // Last 7 days is the tail of the 30-day data
      const dailySignups = dailySignups30.slice(-7).map((d) => ({
        date: d.dateShort,
        count: d.count,
      }));

      // Sparkline data: 7-day signup counts (oldest first)
      const sparklineSignups = dailySignups.map((d) => d.count);

      // Sparkline data: 7-day daily active user counts from user_presence
      const { data: presenceRows } = await supabase
        .from('user_presence')
        .select('user_id, last_seen')
        .gte('last_seen', weekAgo.toISOString());

      // Bucket unique users per day (oldest first)
      const dailyActiveBuckets: Set<string>[] = Array.from({ length: 7 }, () => new Set());
      presenceRows?.forEach((row) => {
        const daysDiff = Math.floor(
          (now.getTime() - new Date(row.last_seen).getTime()) / (1000 * 60 * 60 * 24)
        );
        const idx = 6 - daysDiff;
        if (idx >= 0 && idx < 7) {
          dailyActiveBuckets[idx].add(row.user_id);
        }
      });
      const sparklineActive = dailyActiveBuckets.map((bucket) => bucket.size);

      // Calculate growth rates
      const weekGrowth = prevWeekSignupsRes.count
        ? (((weekSignupsRes.count || 0) - prevWeekSignupsRes.count) / prevWeekSignupsRes.count) *
          100
        : 0;

      // Previous 30d for comparison
      const prevMonthStart = startOfDay(subDays(now, 60));
      const prevMonthEnd = startOfDay(subDays(now, 30));
      const prevMonthSignupsRes = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', prevMonthStart.toISOString())
        .lt('created_at', prevMonthEnd.toISOString());

      const prevMonthSignups = prevMonthSignupsRes.count || 0;
      const monthGrowth = prevMonthSignups
        ? (((monthSignupsRes.count || 0) - prevMonthSignups) / prevMonthSignups) * 100
        : 0;

      return {
        totalUsers: totalUsersRes.count || 0,
        todaySignups: todaySignupsRes.count || 0,
        yesterdaySignups: yesterdaySignupsRes.count || 0,
        weekSignups: weekSignupsRes.count || 0,
        monthSignups: monthSignupsRes.count || 0,
        prevMonthSignups,
        subscribedUsers: subscribedRes.count || 0,
        activeUsers: activeRes.count || 0,
        weekGrowth,
        monthGrowth,
        roleBreakdown,
        dailySignups,
        dailySignups30,
        conversionRate: totalUsersRes.count
          ? ((subscribedRes.count || 0) / totalUsersRes.count) * 100
          : 0,
        aiUsers: aiUsersRes.count || 0,
        certificates: certsRes.count || 0,
        retention: totalUsersRes.count ? ((activeRes.count || 0) / totalUsersRes.count) * 100 : 0,
        rangeSignups: rangeSignupsRes.count || 0,
        // Funnel counts
        funnelSignedUp: totalUsersRes.count || 0,
        funnelLoggedIn: loggedInRes.count || 0,
        funnelUsedFeature: featureUsersRes.count || 0,
        funnelSubscribed: subscribedRes.count || 0,
        sparklineSignups,
        sparklineActive,
      };
    },
    staleTime: 2 * 60 * 1000, // Cache for 2 minutes
    refetchInterval: 60000,
  });

  const getTrendIcon = (current: number, previous: number) => {
    if (current > previous) return <ArrowUp className="h-3 w-3 text-green-400" />;
    if (current < previous) return <ArrowDown className="h-3 w-3 text-red-400" />;
    return <Minus className="h-3 w-3 !text-white" />;
  };

  const chartData = chartPeriod === '30d' ? analytics?.dailySignups30 : analytics?.dailySignups;
  const maxDailySignup = Math.max(...(chartData?.map((d: { count: number }) => d.count) || [1]));

  return (
    <PullToRefresh
      onRefresh={async () => {
        await refetch();
      }}
    >
      <div className="space-y-4 pb-20">
        <AdminPageHeader
          title="Analytics"
          subtitle="Growth & performance metrics"
          icon={BarChart3}
          iconColor="text-purple-400"
          iconBg="bg-purple-500/10 border-purple-500/20"
          accentColor="from-purple-500 via-violet-400 to-purple-500"
          onRefresh={() => refetch()}
          isRefreshing={isFetching}
        />

        {isLoading && (
          <div className="space-y-3 animate-pulse">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-4 space-y-3"
              >
                <div className="flex items-center gap-3">
                  <Skeleton className="w-9 h-9 rounded-lg" />
                  <div className="space-y-1.5 flex-1">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-48" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && (
          <>
            {/* Date Range Picker */}
            <motion.section
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              custom={0.5}
            >
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                <Filter className="h-4 w-4 text-amber-400 flex-shrink-0" />
                {DATE_RANGES.map((r) => (
                  <button
                    key={r.key}
                    onClick={() => setDateRange(r.key)}
                    className={`h-11 px-3 rounded-full text-xs font-medium touch-manipulation transition-all flex-shrink-0 ${
                      dateRange === r.key
                        ? 'bg-amber-500/20 text-amber-400 ring-1 ring-amber-500/30'
                        : 'bg-white/[0.04] text-white ring-1 ring-white/[0.06]'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
                {analytics && (
                  <span className="text-xs text-white ml-auto flex-shrink-0">
                    {analytics.rangeSignups} signup{analytics.rangeSignups !== 1 ? 's' : ''} in
                    range
                  </span>
                )}
              </div>
            </motion.section>

            {/* User Journey Funnel */}
            <motion.section
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              custom={0.8}
            >
              <div className="glass-premium rounded-2xl overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-blue-500 via-green-500 via-amber-500 to-emerald-500" />
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-white flex items-center gap-2 mb-4">
                    <TrendingUp className="h-4 w-4 text-blue-400" />
                    User Journey Funnel
                  </h3>
                  {analytics && <FunnelViz analytics={analytics} />}
                </div>
              </div>
            </motion.section>

            {/* Key Metrics */}
            <motion.section
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              custom={1}
            >
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-2 sm:grid-cols-4 gap-2"
              >
                <motion.div
                  variants={listItemVariants}
                  whileTap={{ scale: 0.97 }}
                  className="bg-white/5 rounded-xl p-3 text-center touch-manipulation"
                >
                  <Users className="h-5 w-5 text-blue-400 mx-auto mb-1" />
                  <p className="text-2xl sm:text-xl font-bold text-blue-400">
                    <AnimatedCounter value={analytics?.totalUsers || 0} />
                  </p>
                  <p className="text-xs text-white">Users</p>
                </motion.div>

                <motion.div
                  variants={listItemVariants}
                  whileTap={{ scale: 0.97 }}
                  className="bg-white/5 rounded-xl p-3 text-center touch-manipulation"
                >
                  <UserPlus className="h-5 w-5 text-green-400 mx-auto mb-1" />
                  <p className="text-2xl sm:text-xl font-bold text-green-400">
                    <AnimatedCounter value={analytics?.todaySignups || 0} />
                  </p>
                  <div className="flex items-center justify-center gap-1">
                    <p className="text-xs text-white">Today</p>
                    {getTrendIcon(analytics?.todaySignups || 0, analytics?.yesterdaySignups || 0)}
                  </div>
                </motion.div>

                <motion.div
                  variants={listItemVariants}
                  whileTap={{ scale: 0.97 }}
                  className="bg-white/5 rounded-xl p-3 text-center touch-manipulation"
                >
                  <Calendar className="h-5 w-5 text-yellow-400 mx-auto mb-1" />
                  <p className="text-2xl sm:text-xl font-bold text-yellow-400">
                    <AnimatedCounter value={analytics?.weekSignups || 0} />
                  </p>
                  <div className="flex items-center justify-center gap-1">
                    <p className="text-xs text-white">This Week</p>
                    <Badge
                      className={`text-[9px] px-1 py-0 ${(analytics?.weekGrowth || 0) >= 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}
                    >
                      {(analytics?.weekGrowth || 0) >= 0 ? '+' : ''}
                      {(analytics?.weekGrowth || 0).toFixed(0)}%
                    </Badge>
                  </div>
                  {analytics?.sparklineSignups && (
                    <div className="flex justify-center mt-1.5">
                      <Sparkline data={analytics.sparklineSignups} color="#f59e0b" />
                    </div>
                  )}
                </motion.div>

                <motion.div
                  variants={listItemVariants}
                  whileTap={{ scale: 0.97 }}
                  className="bg-white/5 rounded-xl p-3 text-center touch-manipulation"
                >
                  <Activity className="h-5 w-5 text-amber-400 mx-auto mb-1" />
                  <p className="text-2xl sm:text-xl font-bold text-amber-400">
                    <AnimatedCounter value={analytics?.activeUsers || 0} />
                  </p>
                  <p className="text-xs text-white">Active 24h</p>
                  {analytics?.sparklineActive && (
                    <div className="flex justify-center mt-1.5">
                      <Sparkline data={analytics.sparklineActive} color="#22c55e" />
                    </div>
                  )}
                </motion.div>
              </motion.div>
            </motion.section>

            {/* Daily Signups Chart */}
            <motion.section
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              custom={2}
            >
              <div className="glass-premium rounded-2xl overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-green-500 to-emerald-400" />
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="flex items-center gap-2 text-sm font-semibold !text-white">
                      <TrendingUp className="h-4 w-4 text-green-400" />
                      Daily Signups
                    </span>
                    <div className="flex gap-1">
                      <Button
                        variant={chartPeriod === '7d' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setChartPeriod('7d')}
                        className={`h-11 px-3 text-xs touch-manipulation ${chartPeriod === '7d' ? 'bg-green-500 text-black hover:bg-green-600' : 'bg-white/[0.06] !text-white'}`}
                      >
                        7d
                      </Button>
                      <Button
                        variant={chartPeriod === '30d' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setChartPeriod('30d')}
                        className={`h-11 px-3 text-xs touch-manipulation ${chartPeriod === '30d' ? 'bg-green-500 text-black hover:bg-green-600' : 'bg-white/[0.06] !text-white'}`}
                      >
                        30d
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-end justify-between gap-[2px] h-32">
                    {chartData?.map(
                      (day: { date: string; dateShort?: string; count: number }, i: number) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
                          <div
                            className="w-full bg-gradient-to-t from-green-500/30 to-green-500/10 rounded-t-lg transition-all"
                            style={{
                              height: `${Math.max((day.count / maxDailySignup) * 100, 5)}%`,
                            }}
                          />
                          {chartPeriod === '7d' ? (
                            <>
                              <span className="text-xs !text-white">{day.date}</span>
                              <span className="text-xs font-medium">{day.count}</span>
                            </>
                          ) : i % 5 === 0 ? (
                            <span className="text-[9px] !text-white">{day.date}</span>
                          ) : null}
                        </div>
                      )
                    )}
                  </div>
                  {chartPeriod === '30d' && (
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/[0.04]">
                      <div className="text-center flex-1">
                        <p className="text-lg font-bold">{analytics?.monthSignups || 0}</p>
                        <p className="text-[10px] !text-white">This 30d</p>
                      </div>
                      <div className="text-center flex-1">
                        <p className="text-lg font-bold">{analytics?.prevMonthSignups || 0}</p>
                        <p className="text-[10px] !text-white">Prev 30d</p>
                      </div>
                      <div className="text-center flex-1">
                        <Badge
                          className={`text-xs ${(analytics?.monthGrowth || 0) >= 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}
                        >
                          {(analytics?.monthGrowth || 0) >= 0 ? '+' : ''}
                          {(analytics?.monthGrowth || 0).toFixed(0)}%
                        </Badge>
                        <p className="text-[10px] !text-white mt-1">MoM Growth</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.section>

            {/* Role Breakdown & Conversion */}
            <div className="grid md:grid-cols-2 gap-4">
              <motion.section
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                custom={3}
              >
                <div className="glass-premium rounded-2xl overflow-hidden">
                  <div className="h-1 bg-gradient-to-r from-purple-500 to-violet-400" />
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-white flex items-center gap-2 mb-4">
                      <Users className="h-4 w-4 text-blue-400" />
                      User Breakdown
                    </h3>
                    <RoleStackedBar
                      roleBreakdown={analytics?.roleBreakdown || {}}
                      total={analytics?.totalUsers || 0}
                    />
                  </div>
                </div>
              </motion.section>

              <motion.section
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                custom={3}
              >
                <div className="glass-premium rounded-2xl overflow-hidden">
                  <div className="h-1 bg-gradient-to-r from-amber-500 to-orange-400" />
                  <div className="p-4">
                    <h3 className="text-sm font-semibold !text-white flex items-center gap-2 mb-4">
                      <CreditCard className="h-4 w-4 text-green-400" />
                      Conversion Metrics
                    </h3>
                    <div className="text-center py-4">
                      <p className="text-4xl font-bold text-green-400">
                        {(analytics?.conversionRate || 0).toFixed(1)}%
                      </p>
                      <p className="text-sm !text-white mt-1">Conversion Rate</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="text-center p-3 rounded-lg bg-white/5">
                        <p className="text-lg font-bold">
                          <AnimatedCounter value={analytics?.subscribedUsers || 0} />
                        </p>
                        <p className="text-xs !text-white">Subscribed</p>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-white/5">
                        <p className="text-lg font-bold">
                          <AnimatedCounter value={analytics?.monthSignups || 0} />
                        </p>
                        <p className="text-xs !text-white">30d Signups</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>
            </div>

            {/* Platform Activity — new section */}
            <motion.section
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              custom={4}
            >
              <div className="glass-premium rounded-2xl overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-teal-500 to-cyan-400" />
                <div className="p-4">
                  <h3 className="text-sm font-semibold !text-white flex items-center gap-2 mb-4">
                    <Activity className="h-4 w-4 text-teal-400" />
                    Platform Activity
                  </h3>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center p-3 rounded-lg bg-white/5">
                      <FileCheck className="h-5 w-5 text-teal-400 mx-auto mb-1" />
                      <p className="text-lg font-bold">
                        <AnimatedCounter value={analytics?.certificates || 0} />
                      </p>
                      <p className="text-xs !text-white">Certificates</p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-white/5">
                      <Cpu className="h-5 w-5 text-cyan-400 mx-auto mb-1" />
                      <p className="text-lg font-bold">
                        <AnimatedCounter value={analytics?.aiUsers || 0} />
                      </p>
                      <p className="text-xs !text-white">AI Users</p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-white/5">
                      <TrendingUp className="h-5 w-5 text-green-400 mx-auto mb-1" />
                      <p className="text-lg font-bold">{(analytics?.retention || 0).toFixed(1)}%</p>
                      <p className="text-xs !text-white">Retention</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Revenue Forecast */}
            <motion.section
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              custom={5}
            >
              <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-green-500 via-emerald-400 to-green-500 opacity-40" />
                <div className="p-4">
                  <p className="text-xs font-medium text-white uppercase tracking-wider mb-4">
                    Revenue Forecast
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-white mb-1">Current MRR</p>
                      <p className="text-2xl font-bold text-white">
                        £{(forecastData?.currentMRR ?? 0).toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-white mb-1">Projected MRR (30d)</p>
                      <p className="text-2xl font-bold text-emerald-400">
                        £{(forecastData?.projectedMRR ?? 0).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-2 rounded-lg bg-white/5">
                      <p className="text-xs text-white">Active Trials</p>
                      <p className="text-sm font-semibold text-white">
                        {forecastData?.trialCount ?? 0}
                      </p>
                    </div>
                    <div className="p-2 rounded-lg bg-white/5">
                      <p className="text-xs text-white">Est. Conversions</p>
                      <p className="text-sm font-semibold text-white">
                        {(forecastData?.projectedConversions ?? 0).toFixed(1)}
                      </p>
                    </div>
                    <div className="p-2 rounded-lg bg-white/5">
                      <p className="text-xs text-white">Conv. Rate</p>
                      <p className="text-sm font-semibold text-white">
                        {((forecastData?.conversionRate ?? 0) * 100).toFixed(0)}%
                      </p>
                    </div>
                    <div className="p-2 rounded-lg bg-white/5">
                      <p className="text-xs text-white">Projected Increase</p>
                      <p className="text-sm font-semibold text-white">
                        +£
                        {(
                          (forecastData?.projectedConversions ?? 0) *
                          (forecastData?.avgRevenue ?? 9.99)
                        ).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>
          </>
        )}
      </div>
    </PullToRefresh>
  );
}
