import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { RefreshCw } from 'lucide-react';
import { format, subDays, startOfDay, endOfDay } from 'date-fns';
import { useState } from 'react';
import PullToRefresh from '@/components/admin/PullToRefresh';
import {
  PageFrame,
  PageHero,
  IconButton,
  FilterBar,
  StatStrip,
  ListCard,
  ListCardHeader,
  ListBody,
  ListRow,
  LoadingBlocks,
  EmptyState,
  Pill,
  Eyebrow,
} from '@/components/admin/editorial';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

type DateRangeKey = 'today' | '7d' | '30d' | '90d';

const DATE_RANGES: { key: DateRangeKey; label: string; days: number }[] = [
  { key: 'today', label: 'Today', days: 0 },
  { key: '7d', label: '7d', days: 7 },
  { key: '30d', label: '30d', days: 30 },
  { key: '90d', label: '90d', days: 90 },
];

const CHART_STROKE = 'hsl(var(--elec-yellow))';
const CHART_GRID = 'rgba(255,255,255,0.06)';
const CHART_AXIS = 'rgba(255,255,255,0.6)';

export default function AdminAnalytics() {
  const [dateRange, setDateRange] = useState<DateRangeKey>('30d');

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

      const { data: tierData } = await supabase
        .from('profiles')
        .select('subscription_tier')
        .eq('subscribed', true)
        .eq('is_trial', false);

      const tierPricing: Record<string, number> = {
        apprentice: 5.99,
        electrician: 12.99,
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

      const rangeDays = DATE_RANGES.find((r) => r.key === dateRange)?.days ?? 30;
      const rangeStart = rangeDays === 0 ? today : startOfDay(subDays(now, rangeDays));

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
        supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', rangeStart.toISOString()),
        supabase
          .from('user_activity_summary')
          .select('user_id', { count: 'exact', head: true })
          .gt('login_count', 0),
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

      const dailySignups = dailySignups30.slice(-7).map((d) => ({
        date: d.dateShort,
        count: d.count,
      }));

      const sparklineSignups = dailySignups.map((d) => d.count);

      const { data: presenceRows } = await supabase
        .from('user_presence')
        .select('user_id, last_seen')
        .gte('last_seen', weekAgo.toISOString());

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

      const weekGrowth = prevWeekSignupsRes.count
        ? (((weekSignupsRes.count || 0) - prevWeekSignupsRes.count) / prevWeekSignupsRes.count) *
          100
        : 0;

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

      const dailyActive = dailyActiveBuckets.map((bucket, i) => ({
        date: dailySignups[i]?.date ?? '',
        count: bucket.size,
      }));

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
        dailyActive,
        conversionRate: totalUsersRes.count
          ? ((subscribedRes.count || 0) / totalUsersRes.count) * 100
          : 0,
        aiUsers: aiUsersRes.count || 0,
        certificates: certsRes.count || 0,
        retention: totalUsersRes.count ? ((activeRes.count || 0) / totalUsersRes.count) * 100 : 0,
        rangeSignups: rangeSignupsRes.count || 0,
        funnelSignedUp: totalUsersRes.count || 0,
        funnelLoggedIn: loggedInRes.count || 0,
        funnelUsedFeature: featureUsersRes.count || 0,
        funnelSubscribed: subscribedRes.count || 0,
        sparklineSignups,
        sparklineActive,
      };
    },
    staleTime: 2 * 60 * 1000,
    refetchInterval: 60000,
  });

  const chartData =
    dateRange === '30d' || dateRange === '90d'
      ? analytics?.dailySignups30
      : analytics?.dailySignups;

  const topPages = analytics
    ? Object.entries(analytics.roleBreakdown)
        .sort((a, b) => b[1] - a[1])
        .map(([role, count]) => ({
          path: `/${role}`,
          category: 'Role cohort',
          views: count,
        }))
    : [];

  const funnelSteps = analytics
    ? [
        { label: 'Signed up', value: analytics.funnelSignedUp },
        {
          label: 'Logged in',
          value: analytics.funnelLoggedIn,
          sub: percentOf(analytics.funnelLoggedIn, analytics.funnelSignedUp),
        },
        {
          label: 'Used feature',
          value: analytics.funnelUsedFeature,
          sub: percentOf(analytics.funnelUsedFeature, analytics.funnelLoggedIn),
        },
        {
          label: 'Subscribed',
          value: analytics.funnelSubscribed,
          sub: percentOf(analytics.funnelSubscribed, analytics.funnelUsedFeature),
        },
        {
          label: 'Retained 24h',
          value: analytics.activeUsers,
          sub: percentOf(analytics.activeUsers, analytics.funnelSignedUp),
        },
      ]
    : [];

  return (
    <PullToRefresh onRefresh={async () => { await refetch(); }}>
      <PageFrame>
        <PageHero
          eyebrow="Tools"
          title="Analytics"
          description="Engagement, cohorts and funnel performance."
          tone="emerald"
          actions={
            <IconButton onClick={() => refetch()} aria-label="Refresh">
              <RefreshCw className={`h-4 w-4 ${isFetching ? 'animate-spin' : ''}`} />
            </IconButton>
          }
        />

        <FilterBar
          tabs={DATE_RANGES.map((r) => ({ value: r.key, label: r.label }))}
          activeTab={dateRange}
          onTabChange={(v) => setDateRange(v as DateRangeKey)}
        />

        {isLoading && <LoadingBlocks />}

        {!isLoading && !analytics && (
          <EmptyState
            title="No analytics data"
            description="We could not load engagement data for this range. Try refreshing."
            action="Retry"
            onAction={() => refetch()}
          />
        )}

        {!isLoading && analytics && (
          <>
            <StatStrip
              columns={4}
              stats={[
                {
                  label: 'DAU',
                  value: analytics.activeUsers,
                  tone: 'emerald',
                  sub: `${analytics.retention.toFixed(1)}% of total`,
                },
                {
                  label: 'WAU',
                  value: analytics.weekSignups,
                  tone: 'blue',
                  sub: `${analytics.weekGrowth >= 0 ? '+' : ''}${analytics.weekGrowth.toFixed(0)}% vs prev`,
                },
                {
                  label: 'MAU',
                  value: analytics.monthSignups,
                  tone: 'purple',
                  sub: `${analytics.monthGrowth >= 0 ? '+' : ''}${analytics.monthGrowth.toFixed(0)}% vs prev`,
                },
                {
                  label: 'Retention',
                  value: analytics.retention.toFixed(1),
                  accent: true,
                  sub: `${analytics.rangeSignups} in range`,
                },
              ]}
            />

            <ListCard>
              <ListCardHeader
                tone="emerald"
                title="Sign-ups over time"
                meta={<Pill tone="emerald">{dateRange}</Pill>}
              />
              <div className="p-4 sm:p-5">
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
                      <CartesianGrid stroke={CHART_GRID} strokeDasharray="3 3" vertical={false} />
                      <XAxis
                        dataKey="date"
                        tick={{ fill: CHART_AXIS, fontSize: 11 }}
                        stroke={CHART_GRID}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        tick={{ fill: CHART_AXIS, fontSize: 11 }}
                        stroke={CHART_GRID}
                        tickLine={false}
                        axisLine={false}
                      />
                      <Tooltip
                        contentStyle={{
                          background: 'hsl(0 0% 10%)',
                          border: '1px solid rgba(255,255,255,0.08)',
                          borderRadius: 12,
                          color: '#ffffff',
                          fontSize: 12,
                        }}
                        labelStyle={{ color: '#ffffff' }}
                        cursor={{ stroke: CHART_GRID }}
                      />
                      <Line
                        type="monotone"
                        dataKey="count"
                        stroke={CHART_STROKE}
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 4, fill: CHART_STROKE }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </ListCard>

            <ListCard>
              <ListCardHeader
                tone="emerald"
                title="Daily active users (7d)"
                meta={<Pill tone="yellow">{analytics.activeUsers}</Pill>}
              />
              <div className="p-4 sm:p-5">
                <div className="h-56 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={analytics.dailyActive}
                      margin={{ top: 8, right: 8, left: -18, bottom: 0 }}
                    >
                      <CartesianGrid stroke={CHART_GRID} strokeDasharray="3 3" vertical={false} />
                      <XAxis
                        dataKey="date"
                        tick={{ fill: CHART_AXIS, fontSize: 11 }}
                        stroke={CHART_GRID}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        tick={{ fill: CHART_AXIS, fontSize: 11 }}
                        stroke={CHART_GRID}
                        tickLine={false}
                        axisLine={false}
                      />
                      <Tooltip
                        contentStyle={{
                          background: 'hsl(0 0% 10%)',
                          border: '1px solid rgba(255,255,255,0.08)',
                          borderRadius: 12,
                          color: '#ffffff',
                          fontSize: 12,
                        }}
                        labelStyle={{ color: '#ffffff' }}
                        cursor={{ fill: 'rgba(255,255,255,0.04)' }}
                      />
                      <Bar dataKey="count" fill={CHART_STROKE} radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </ListCard>

            <ListCard>
              <ListCardHeader
                title="Conversion funnel"
                meta={<Pill tone="yellow">5 steps</Pill>}
              />
              <div className="p-4 sm:p-5">
                <StatStrip
                  columns={5}
                  numbered
                  stats={funnelSteps.map((step, i) => ({
                    label: step.label,
                    value: step.value,
                    sub: step.sub,
                    tone: i === 0 ? 'blue' : i === 4 ? 'emerald' : undefined,
                    accent: i === 3,
                  }))}
                />
              </div>
            </ListCard>

            <ListCard>
              <ListCardHeader
                title="Top cohorts"
                meta={<Pill tone="purple">{topPages.length}</Pill>}
              />
              {topPages.length === 0 ? (
                <div className="p-6">
                  <div className="text-[12.5px] text-white">No cohort data yet.</div>
                </div>
              ) : (
                <ListBody>
                  {topPages.map((p) => (
                    <ListRow
                      key={p.path}
                      title={p.path}
                      subtitle={p.category}
                      trailing={
                        <span className="text-[11px] text-white tabular-nums">{p.views}</span>
                      }
                    />
                  ))}
                </ListBody>
              )}
            </ListCard>

            <ListCard>
              <ListCardHeader tone="yellow" title="Revenue forecast" />
              <div className="p-5 sm:p-6 space-y-5">
                <div className="grid grid-cols-2 gap-px bg-white/[0.06] border border-white/[0.06] rounded-xl overflow-hidden">
                  <div className="bg-[hsl(0_0%_10%)] px-5 py-5">
                    <Eyebrow>Current MRR</Eyebrow>
                    <div className="mt-3 text-3xl sm:text-4xl font-semibold text-white tabular-nums tracking-tight leading-none">
                      £{(forecastData?.currentMRR ?? 0).toFixed(2)}
                    </div>
                  </div>
                  <div className="bg-[hsl(0_0%_10%)] px-5 py-5">
                    <Eyebrow>Projected MRR (30d)</Eyebrow>
                    <div className="mt-3 text-3xl sm:text-4xl font-semibold text-elec-yellow tabular-nums tracking-tight leading-none">
                      £{(forecastData?.projectedMRR ?? 0).toFixed(2)}
                    </div>
                  </div>
                </div>

                <StatStrip
                  columns={4}
                  stats={[
                    { label: 'Active trials', value: forecastData?.trialCount ?? 0 },
                    {
                      label: 'Est. conversions',
                      value: (forecastData?.projectedConversions ?? 0).toFixed(1),
                    },
                    {
                      label: 'Conv. rate',
                      value: `${((forecastData?.conversionRate ?? 0) * 100).toFixed(0)}%`,
                    },
                    {
                      label: 'Projected +',
                      value: `£${(
                        (forecastData?.projectedConversions ?? 0) *
                        (forecastData?.avgRevenue ?? 9.99)
                      ).toFixed(2)}`,
                      accent: true,
                    },
                  ]}
                />
              </div>
            </ListCard>

            <ListCard>
              <ListCardHeader title="Platform activity" />
              <ListBody>
                <ListRow
                  title="Certificates issued"
                  subtitle="All time"
                  trailing={
                    <span className="text-[11px] text-white tabular-nums">
                      {analytics.certificates}
                    </span>
                  }
                />
                <ListRow
                  title="AI users"
                  subtitle="Business AI enabled"
                  trailing={
                    <span className="text-[11px] text-white tabular-nums">{analytics.aiUsers}</span>
                  }
                />
                <ListRow
                  title="Subscribed users"
                  subtitle={`${analytics.conversionRate.toFixed(1)}% conversion`}
                  trailing={
                    <span className="text-[11px] text-white tabular-nums">
                      {analytics.subscribedUsers}
                    </span>
                  }
                />
                <ListRow
                  title="Total users"
                  subtitle="Lifetime signups"
                  trailing={
                    <span className="text-[11px] text-white tabular-nums">
                      {analytics.totalUsers}
                    </span>
                  }
                />
              </ListBody>
            </ListCard>
          </>
        )}
      </PageFrame>
    </PullToRefresh>
  );
}

function percentOf(part: number, whole: number): string {
  if (!whole) return '—';
  return `${((part / whole) * 100).toFixed(0)}% of prev`;
}
