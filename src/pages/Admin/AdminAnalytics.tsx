import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  Clock,
} from "lucide-react";
import { format, subDays, startOfDay, endOfDay } from "date-fns";

export default function AdminAnalytics() {
  // Fetch analytics data
  const { data: analytics, isLoading, refetch, isFetching } = useQuery({
    queryKey: ["admin-analytics"],
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
      ] = await Promise.all([
        supabase.from("profiles").select("*", { count: "exact", head: true }),
        supabase.from("profiles").select("*", { count: "exact", head: true })
          .gte("created_at", today.toISOString()),
        supabase.from("profiles").select("*", { count: "exact", head: true })
          .gte("created_at", yesterday.toISOString())
          .lt("created_at", today.toISOString()),
        supabase.from("profiles").select("*", { count: "exact", head: true })
          .gte("created_at", weekAgo.toISOString()),
        supabase.from("profiles").select("*", { count: "exact", head: true })
          .gte("created_at", twoWeeksAgo.toISOString())
          .lt("created_at", weekAgo.toISOString()),
        supabase.from("profiles").select("*", { count: "exact", head: true })
          .gte("created_at", monthAgo.toISOString()),
        supabase.from("profiles").select("*", { count: "exact", head: true })
          .eq("subscribed", true),
        supabase.from("user_presence").select("*", { count: "exact", head: true })
          .gte("last_seen", subDays(now, 1).toISOString()),
      ]);

      // Get role breakdown - include in main parallel batch
      const { data: roleData } = await supabase.from("profiles").select("role");

      const roleBreakdown: Record<string, number> = {};
      roleData?.forEach((r) => {
        const role = r.role || "visitor";
        roleBreakdown[role] = (roleBreakdown[role] || 0) + 1;
      });

      // Get daily signups for the last 7 days - batch all queries in parallel
      const dailyDates = Array.from({ length: 7 }, (_, i) => {
        const date = subDays(now, 6 - i);
        return { date, start: startOfDay(date), end: endOfDay(date) };
      });

      const dailyResults = await Promise.all(
        dailyDates.map(({ start, end }) =>
          supabase
            .from("profiles")
            .select("*", { count: "exact", head: true })
            .gte("created_at", start.toISOString())
            .lte("created_at", end.toISOString())
        )
      );

      const dailySignups = dailyDates.map(({ date }, i) => ({
        date: format(date, "EEE"),
        count: dailyResults[i].count || 0,
      }));

      // Calculate growth rates
      const weekGrowth = prevWeekSignupsRes.count
        ? (((weekSignupsRes.count || 0) - prevWeekSignupsRes.count) / prevWeekSignupsRes.count) * 100
        : 0;

      return {
        totalUsers: totalUsersRes.count || 0,
        todaySignups: todaySignupsRes.count || 0,
        yesterdaySignups: yesterdaySignupsRes.count || 0,
        weekSignups: weekSignupsRes.count || 0,
        monthSignups: monthSignupsRes.count || 0,
        subscribedUsers: subscribedRes.count || 0,
        activeUsers: activeRes.count || 0,
        weekGrowth,
        roleBreakdown,
        dailySignups,
        conversionRate: totalUsersRes.count ? ((subscribedRes.count || 0) / totalUsersRes.count * 100) : 0,
      };
    },
    staleTime: 2 * 60 * 1000, // Cache for 2 minutes
    refetchInterval: 60000,
  });

  const getTrendIcon = (current: number, previous: number) => {
    if (current > previous) return <ArrowUp className="h-3 w-3 text-green-400" />;
    if (current < previous) return <ArrowDown className="h-3 w-3 text-red-400" />;
    return <Minus className="h-3 w-3 text-gray-400" />;
  };

  const maxDailySignup = Math.max(...(analytics?.dailySignups?.map((d) => d.count) || [1]));

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Analytics</h2>
          <p className="text-xs text-muted-foreground">Growth & performance metrics</p>
        </div>
        <Button
          variant="outline"
          size="icon"
          className="h-11 w-11 touch-manipulation"
          onClick={() => refetch()}
          disabled={isFetching}
        >
          <RefreshCw className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`} />
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center justify-between mb-2">
              <Users className="h-5 w-5 text-blue-400" />
              <Badge variant="outline" className="text-[10px]">Total</Badge>
            </div>
            <p className="text-2xl font-bold">{analytics?.totalUsers || 0}</p>
            <p className="text-xs text-muted-foreground">Users</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center justify-between mb-2">
              <UserPlus className="h-5 w-5 text-green-400" />
              <div className="flex items-center gap-1">
                {getTrendIcon(analytics?.todaySignups || 0, analytics?.yesterdaySignups || 0)}
              </div>
            </div>
            <p className="text-2xl font-bold">{analytics?.todaySignups || 0}</p>
            <p className="text-xs text-muted-foreground">Today</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center justify-between mb-2">
              <Calendar className="h-5 w-5 text-purple-400" />
              <Badge className={`text-[10px] ${(analytics?.weekGrowth || 0) >= 0 ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                {(analytics?.weekGrowth || 0) >= 0 ? "+" : ""}{(analytics?.weekGrowth || 0).toFixed(0)}%
              </Badge>
            </div>
            <p className="text-2xl font-bold">{analytics?.weekSignups || 0}</p>
            <p className="text-xs text-muted-foreground">This Week</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 border-amber-500/20">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center justify-between mb-2">
              <Activity className="h-5 w-5 text-amber-400" />
              <Badge variant="outline" className="text-[10px]">24h</Badge>
            </div>
            <p className="text-2xl font-bold">{analytics?.activeUsers || 0}</p>
            <p className="text-xs text-muted-foreground">Active</p>
          </CardContent>
        </Card>
      </div>

      {/* Daily Signups Chart */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-green-400" />
            Daily Signups (Last 7 Days)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end justify-between gap-2 h-32">
            {analytics?.dailySignups?.map((day, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full bg-gradient-to-t from-green-500/30 to-green-500/10 rounded-t-lg transition-all"
                  style={{ height: `${Math.max((day.count / maxDailySignup) * 100, 5)}%` }}
                />
                <span className="text-[10px] text-muted-foreground">{day.date}</span>
                <span className="text-xs font-medium">{day.count}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Role Breakdown & Conversion */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-400" />
              User Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {Object.entries(analytics?.roleBreakdown || {}).map(([role, count]) => {
              const percentage = analytics?.totalUsers ? (count / analytics.totalUsers * 100) : 0;
              const colors: Record<string, string> = {
                apprentice: "bg-purple-500",
                electrician: "bg-yellow-500",
                employer: "bg-blue-500",
                visitor: "bg-gray-500",
              };
              return (
                <div key={role} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="capitalize">{role}</span>
                    <span className="text-muted-foreground">{count} ({percentage.toFixed(0)}%)</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full ${colors[role] || "bg-gray-500"} rounded-full transition-all`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-green-400" />
              Conversion Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center py-4">
              <p className="text-4xl font-bold text-green-400">
                {(analytics?.conversionRate || 0).toFixed(1)}%
              </p>
              <p className="text-sm text-muted-foreground mt-1">Conversion Rate</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-3 rounded-lg bg-muted/50">
                <p className="text-lg font-bold">{analytics?.subscribedUsers || 0}</p>
                <p className="text-xs text-muted-foreground">Subscribed</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-muted/50">
                <p className="text-lg font-bold">{analytics?.monthSignups || 0}</p>
                <p className="text-xs text-muted-foreground">30d Signups</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
