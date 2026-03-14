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
} from 'lucide-react';
import { format, subDays, startOfDay, endOfDay } from 'date-fns';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { AnimatedCounter } from '@/components/dashboard/AnimatedCounter';
import PullToRefresh from '@/components/admin/PullToRefresh';

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

export default function AdminAnalytics() {
  const [chartPeriod, setChartPeriod] = useState<'7d' | '30d'>('7d');

  // Fetch analytics data
  const {
    data: analytics,
    isLoading,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ['admin-analytics'],
    queryFn: async () => {
      const now = new Date();
      const today = startOfDay(now);
      const yesterday = startOfDay(subDays(now, 1));
      const weekAgo = startOfDay(subDays(now, 7));
      const twoWeeksAgo = startOfDay(subDays(now, 14));
      const monthAgo = startOfDay(subDays(now, 30));

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
        {/* Header */}
        <motion.section variants={sectionVariants} initial="hidden" animate="visible" custom={0}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold !text-white">Analytics</h2>
              <p className="text-xs !text-white">Growth & performance metrics</p>
            </div>
            <Button
              variant="outline"
              size="icon"
              className="h-11 w-11 touch-manipulation"
              onClick={() => refetch()}
              disabled={isFetching}
            >
              <RefreshCw className={`h-4 w-4 ${isFetching ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </motion.section>

        {/* Key Metrics */}
        <motion.section variants={sectionVariants} initial="hidden" animate="visible" custom={1}>
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
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Daily Signups Chart */}
        <motion.section variants={sectionVariants} initial="hidden" animate="visible" custom={2}>
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
                        style={{ height: `${Math.max((day.count / maxDailySignup) * 100, 5)}%` }}
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
          <motion.section variants={sectionVariants} initial="hidden" animate="visible" custom={3}>
            <div className="glass-premium rounded-2xl overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-purple-500 to-violet-400" />
              <div className="p-4">
                <h3 className="text-sm font-semibold !text-white flex items-center gap-2 mb-4">
                  <Users className="h-4 w-4 text-blue-400" />
                  User Breakdown
                </h3>
                <div className="space-y-3">
                  {Object.entries(analytics?.roleBreakdown || {}).map(([role, count]) => {
                    const percentage = analytics?.totalUsers
                      ? (count / analytics.totalUsers) * 100
                      : 0;
                    const colors: Record<string, string> = {
                      apprentice: 'bg-yellow-500',
                      electrician: 'bg-yellow-500',
                      employer: 'bg-blue-500',
                      visitor: 'bg-gray-500',
                    };
                    return (
                      <div key={role} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="capitalize !text-white">{role}</span>
                          <span className="!text-white">
                            {count} ({percentage.toFixed(0)}%)
                          </span>
                        </div>
                        <div className="h-2 bg-white/[0.08] rounded-full overflow-hidden">
                          <div
                            className={`h-full ${colors[role] || 'bg-gray-500'} rounded-full transition-all`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" animate="visible" custom={3}>
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
        <motion.section variants={sectionVariants} initial="hidden" animate="visible" custom={4}>
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
      </div>
    </PullToRefresh>
  );
}
