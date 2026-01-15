import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Users,
  CreditCard,
  RefreshCw,
  Calendar,
  ArrowUp,
  ArrowDown,
  Minus,
  Percent,
  Receipt,
} from "lucide-react";
import { format, subDays, startOfDay, startOfMonth, endOfMonth, subMonths } from "date-fns";

export default function AdminRevenue() {
  // Fetch revenue data
  const { data: revenue, isLoading, refetch, isFetching } = useQuery({
    queryKey: ["admin-revenue"],
    queryFn: async () => {
      const now = new Date();
      const today = startOfDay(now);
      const thisMonthStart = startOfMonth(now);
      const lastMonthStart = startOfMonth(subMonths(now, 1));
      const lastMonthEnd = endOfMonth(subMonths(now, 1));

      // Get subscription data
      const [
        totalSubscribedRes,
        thisMonthSubsRes,
        lastMonthSubsRes,
        allProfilesRes,
      ] = await Promise.all([
        supabase.from("profiles").select("*", { count: "exact", head: true })
          .eq("subscribed", true),
        supabase.from("profiles").select("*", { count: "exact", head: true })
          .eq("subscribed", true)
          .gte("subscription_start", thisMonthStart.toISOString()),
        supabase.from("profiles").select("*", { count: "exact", head: true })
          .eq("subscribed", true)
          .gte("subscription_start", lastMonthStart.toISOString())
          .lte("subscription_start", lastMonthEnd.toISOString()),
        supabase.from("profiles").select("subscribed, role, subscription_tier, subscription_start, free_access_granted")
      ]);

      // Calculate MRR based on subscription tiers
      // UK pricing: Apprentice £4.99/mo, Electrician £9.99/mo, Employer £29.99/mo, Founder £3.99/mo
      const tierPricing: Record<string, number> = {
        Apprentice: 4.99,
        apprentice: 4.99,
        Electrician: 9.99,
        electrician: 9.99,
        Employer: 29.99,
        employer: 29.99,
        Founder: 3.99,
        founder: 3.99,
        basic: 9.99, // Legacy fallback
        pro: 9.99,
        enterprise: 29.99,
        free: 0,
      };

      const subscribedProfiles = allProfilesRes.data?.filter(p => p.subscribed) || [];
      // Exclude free_access_granted users from MRR (they pay £0)
      const paidProfiles = subscribedProfiles.filter(p => !p.free_access_granted);
      const mrr = paidProfiles.reduce((total, p) => {
        const tier = p.subscription_tier || "basic";
        return total + (tierPricing[tier] || 9.99);
      }, 0);

      // Calculate ARR
      const arr = mrr * 12;

      // Get cancellations (profiles with subscribed = false but had subscription_start)
      const { count: cancelledCount } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true })
        .eq("subscribed", false)
        .not("subscription_start", "is", null);

      // Calculate churn rate (cancelled / total who ever subscribed)
      const totalEverSubscribed = (totalSubscribedRes.count || 0) + (cancelledCount || 0);
      const churnRate = totalEverSubscribed > 0
        ? ((cancelledCount || 0) / totalEverSubscribed) * 100
        : 0;

      // Monthly growth
      const monthGrowth = lastMonthSubsRes.count
        ? (((thisMonthSubsRes.count || 0) - lastMonthSubsRes.count) / lastMonthSubsRes.count) * 100
        : 0;

      // Subscription by tier
      const tierBreakdown: Record<string, number> = { Apprentice: 0, Electrician: 0, Employer: 0 };
      subscribedProfiles.forEach(p => {
        const tier = p.subscription_tier || "Electrician";
        if (tierBreakdown[tier] !== undefined) {
          tierBreakdown[tier]++;
        } else {
          // Handle legacy tier names
          if (tier === "basic" || tier === "apprentice") tierBreakdown["Apprentice"]++;
          else if (tier === "pro" || tier === "electrician") tierBreakdown["Electrician"]++;
          else if (tier === "enterprise" || tier === "employer") tierBreakdown["Employer"]++;
        }
      });

      // Role breakdown of subscribers
      const roleBreakdown: Record<string, number> = {};
      subscribedProfiles.forEach(p => {
        const role = p.role || "unknown";
        roleBreakdown[role] = (roleBreakdown[role] || 0) + 1;
      });

      // Daily revenue for chart (last 14 days) - batch all queries in parallel
      const dailyDates = Array.from({ length: 14 }, (_, i) => {
        const date = subDays(now, 13 - i);
        const start = startOfDay(date);
        const end = new Date(start);
        end.setHours(23, 59, 59, 999);
        return { date, start, end };
      });

      const dailyResults = await Promise.all(
        dailyDates.map(({ start, end }) =>
          supabase
            .from("profiles")
            .select("subscription_tier")
            .eq("subscribed", true)
            .gte("subscription_start", start.toISOString())
            .lte("subscription_start", end.toISOString())
        )
      );

      const dailyRevenue = dailyDates.map(({ date }, i) => {
        const dayProfiles = dailyResults[i].data || [];
        const dayRevenue = dayProfiles.reduce((total, p) => {
          const tier = p.subscription_tier || "basic";
          return total + (tierPricing[tier] || 9.99);
        }, 0);
        return {
          date: format(date, "dd MMM"),
          amount: dayRevenue,
          count: dayProfiles.length,
        };
      });

      return {
        mrr,
        arr,
        totalSubscribers: totalSubscribedRes.count || 0,
        thisMonthSubs: thisMonthSubsRes.count || 0,
        lastMonthSubs: lastMonthSubsRes.count || 0,
        monthGrowth,
        churnRate,
        cancelledCount: cancelledCount || 0,
        tierBreakdown,
        roleBreakdown,
        dailyRevenue,
        avgRevenuePerUser: subscribedProfiles.length > 0 ? mrr / subscribedProfiles.length : 0,
      };
    },
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    refetchInterval: 120000, // Refresh every 2 minutes
  });

  const getTrendIcon = (value: number) => {
    if (value > 0) return <ArrowUp className="h-3 w-3 text-green-400" />;
    if (value < 0) return <ArrowDown className="h-3 w-3 text-red-400" />;
    return <Minus className="h-3 w-3 text-gray-400" />;
  };

  const maxDailyRevenue = Math.max(...(revenue?.dailyRevenue?.map((d) => d.amount) || [1]));

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Revenue Dashboard</h2>
          <p className="text-xs text-muted-foreground">Subscription & MRR metrics</p>
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

      {/* Key Revenue Metrics */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="h-5 w-5 text-green-400" />
              <Badge variant="outline" className="text-[10px]">MRR</Badge>
            </div>
            <p className="text-2xl font-bold">£{(revenue?.mrr || 0).toFixed(2)}</p>
            <p className="text-xs text-muted-foreground">Monthly Recurring</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="h-5 w-5 text-blue-400" />
              <Badge variant="outline" className="text-[10px]">ARR</Badge>
            </div>
            <p className="text-2xl font-bold">£{(revenue?.arr || 0).toFixed(0)}</p>
            <p className="text-xs text-muted-foreground">Annual Run Rate</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center justify-between mb-2">
              <Users className="h-5 w-5 text-purple-400" />
              <div className="flex items-center gap-1">
                {getTrendIcon(revenue?.monthGrowth || 0)}
                <span className={`text-[10px] ${(revenue?.monthGrowth || 0) >= 0 ? "text-green-400" : "text-red-400"}`}>
                  {(revenue?.monthGrowth || 0).toFixed(0)}%
                </span>
              </div>
            </div>
            <p className="text-2xl font-bold">{revenue?.totalSubscribers || 0}</p>
            <p className="text-xs text-muted-foreground">Subscribers</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 border-amber-500/20">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center justify-between mb-2">
              <Receipt className="h-5 w-5 text-amber-400" />
              <Badge variant="outline" className="text-[10px]">ARPU</Badge>
            </div>
            <p className="text-2xl font-bold">£{(revenue?.avgRevenuePerUser || 0).toFixed(2)}</p>
            <p className="text-xs text-muted-foreground">Avg Per User</p>
          </CardContent>
        </Card>
      </div>

      {/* This Month Stats */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <Calendar className="h-4 w-4 text-blue-400" />
            This Month
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-3 rounded-lg bg-green-500/10">
              <p className="text-xl font-bold text-green-400">+{revenue?.thisMonthSubs || 0}</p>
              <p className="text-xs text-muted-foreground">New Subs</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-red-500/10">
              <p className="text-xl font-bold text-red-400">{revenue?.cancelledCount || 0}</p>
              <p className="text-xs text-muted-foreground">Churned</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-amber-500/10">
              <p className="text-xl font-bold text-amber-400">{(revenue?.churnRate || 0).toFixed(1)}%</p>
              <p className="text-xs text-muted-foreground">Churn Rate</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Revenue Chart */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-green-400" />
            Daily New Revenue (14 Days)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end justify-between gap-1 h-32 overflow-x-auto">
            {revenue?.dailyRevenue?.map((day, i) => (
              <div key={i} className="flex-1 min-w-[30px] flex flex-col items-center gap-1">
                <div
                  className="w-full bg-gradient-to-t from-green-500/40 to-green-500/10 rounded-t-lg transition-all"
                  style={{ height: `${Math.max((day.amount / maxDailyRevenue) * 100, 5)}%` }}
                />
                <span className="text-[8px] text-muted-foreground whitespace-nowrap">{day.date.split(" ")[0]}</span>
                <span className="text-[10px] font-medium">£{day.amount.toFixed(0)}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Subscription Tiers & Role Breakdown */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-purple-400" />
              Subscription Tiers
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {Object.entries(revenue?.tierBreakdown || {}).map(([tier, count]) => {
              const percentage = revenue?.totalSubscribers ? (count / revenue.totalSubscribers * 100) : 0;
              const colors: Record<string, string> = {
                Apprentice: "bg-purple-500",
                Electrician: "bg-yellow-500",
                Employer: "bg-blue-500",
              };
              const prices: Record<string, string> = {
                Apprentice: "£4.99",
                Electrician: "£9.99",
                Employer: "£29.99",
              };
              return (
                <div key={tier} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="capitalize flex items-center gap-2">
                      {tier}
                      <Badge variant="outline" className="text-[10px]">{prices[tier]}</Badge>
                    </span>
                    <span className="text-muted-foreground">{count} ({percentage.toFixed(0)}%)</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full ${colors[tier] || "bg-gray-500"} rounded-full transition-all`}
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
              <Users className="h-4 w-4 text-blue-400" />
              Subscribers by Role
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {Object.entries(revenue?.roleBreakdown || {}).map(([role, count]) => {
              const percentage = revenue?.totalSubscribers ? (count / revenue.totalSubscribers * 100) : 0;
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
      </div>

      {/* Quick Stats */}
      <Card className="bg-gradient-to-br from-green-500/5 to-blue-500/5">
        <CardContent className="pt-4 pb-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground">Last Month Subs</p>
              <p className="text-lg font-bold">{revenue?.lastMonthSubs || 0}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Month Growth</p>
              <p className={`text-lg font-bold ${(revenue?.monthGrowth || 0) >= 0 ? "text-green-400" : "text-red-400"}`}>
                {(revenue?.monthGrowth || 0) >= 0 ? "+" : ""}{(revenue?.monthGrowth || 0).toFixed(1)}%
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
