import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  PoundSterling,
  TrendingUp,
  Users,
  RefreshCw,
  Calendar,
  ArrowUp,
  ArrowDown,
  Crown,
  Zap,
  GraduationCap,
  Building2,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
} from 'lucide-react';
import { format, subDays, startOfDay } from 'date-fns';
import { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import PullToRefresh from '@/components/admin/PullToRefresh';

// Stripe stats type
interface StripeStats {
  stripe: {
    activeSubscriptions: number;
    canceledLast30Days: number;
    tierCounts: {
      founder: number;
      apprentice: number;
      electrician: number;
      employer: number;
      unknown: number;
    };
    mrr: number;
    subscriptionsByPrice: Record<string, number>;
  };
  supabase: {
    subscribedUsers: number;
    tierCounts: {
      founder: number;
      apprentice: number;
      electrician: number;
      employer: number;
      free: number;
    };
    withStripeId: number;
    withoutStripeId: number;
  };
  discrepancies: {
    inStripeNotSupabase: number;
    inSupabaseNotStripe: number;
  };
  subscriptions: Array<{
    subscriptionId: string;
    customerId: string;
    customerEmail: string;
    customerName: string;
    tier: string;
    priceAmount: number;
    monthlyAmount: number;
    interval: string;
    created: string;
  }>;
  generatedAt: string;
}

export default function AdminRevenue() {
  const queryClient = useQueryClient();
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Fetch LIVE Stripe stats
  const {
    data: stripeStats,
    isLoading: stripeLoading,
    isFetching: stripeFetching,
  } = useQuery<StripeStats>({
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

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await queryClient.invalidateQueries({ queryKey: ['admin-stripe-live-stats'] });
    setTimeout(() => setIsRefreshing(false), 500);
  }, [queryClient]);

  // Calculate daily revenue from subscriptions (last 14 days)
  const dailyRevenue = stripeStats?.subscriptions
    ? (() => {
        const now = new Date();
        const days = Array.from({ length: 14 }, (_, i) => {
          const date = subDays(now, 13 - i);
          const start = startOfDay(date).getTime();
          const end = start + 24 * 60 * 60 * 1000;

          const daySubs = stripeStats.subscriptions.filter((sub) => {
            const created = new Date(sub.created).getTime();
            return created >= start && created < end;
          });

          const amount = daySubs.reduce((sum, sub) => sum + sub.monthlyAmount, 0);

          return {
            date: format(date, 'dd'),
            fullDate: format(date, 'dd MMM'),
            amount,
            count: daySubs.length,
          };
        });
        return days;
      })()
    : [];

  const maxDailyRevenue = Math.max(...dailyRevenue.map((d) => d.amount), 1);
  const totalLast14Days = dailyRevenue.reduce((sum, d) => sum + d.amount, 0);
  const subsLast14Days = dailyRevenue.reduce((sum, d) => sum + d.count, 0);

  // Tier colors and icons
  const tierConfig = {
    founder: { color: 'yellow', icon: Crown, price: '£3.99' },
    apprentice: { color: 'cyan', icon: GraduationCap, price: '£4.99' },
    electrician: { color: 'blue', icon: Zap, price: '£9.99' },
    employer: { color: 'purple', icon: Building2, price: '£29.99' },
  };

  if (stripeLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-12 bg-muted rounded-lg w-48" />
        <div className="h-40 bg-muted rounded-2xl" />
        <div className="grid grid-cols-2 gap-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-muted rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  const mrr = stripeStats?.stripe.mrr || 0;
  const arr = mrr * 12;
  const totalSubs = stripeStats?.stripe.activeSubscriptions || 0;
  const arpu = totalSubs > 0 ? mrr / totalSubs : 0;
  const churned = stripeStats?.stripe.canceledLast30Days || 0;
  const churnRate = totalSubs > 0 ? (churned / (totalSubs + churned)) * 100 : 0;
  const hasDiscrepancies =
    (stripeStats?.discrepancies.inStripeNotSupabase || 0) +
      (stripeStats?.discrepancies.inSupabaseNotStripe || 0) >
    0;

  return (
    <PullToRefresh
      onRefresh={async () => {
        await handleRefresh();
      }}
    >
      <div className="space-y-4 pb-20">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold flex items-center gap-2">
              Revenue
              {stripeStats && (
                <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-xs gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  LIVE
                </Badge>
              )}
            </h1>
            <p className="text-xs text-muted-foreground">
              {stripeStats
                ? `From Stripe • ${new Date(stripeStats.generatedAt).toLocaleTimeString()}`
                : 'Loading live data...'}
            </p>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="h-11 w-11 touch-manipulation"
            onClick={handleRefresh}
            disabled={stripeFetching || isRefreshing}
          >
            <RefreshCw
              className={cn('h-4 w-4', (stripeFetching || isRefreshing) && 'animate-spin')}
            />
          </Button>
        </div>

        {/* Data Health Alert */}
        {hasDiscrepancies && (
          <Card className="border-orange-500/30 bg-orange-500/5">
            <CardContent className="p-3 flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-orange-400 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-orange-400">Data Sync Required</p>
                <p className="text-xs text-muted-foreground">
                  {stripeStats?.discrepancies.inStripeNotSupabase} in Stripe not synced to database
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="shrink-0 h-11 touch-manipulation border-orange-500/30 text-orange-400"
                onClick={() => handleRefresh()}
              >
                Sync
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Empty State */}
        {totalSubs === 0 && !stripeLoading && (
          <Card className="border-border/50">
            <CardContent className="py-12 text-center">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
                <PoundSterling className="h-8 w-8 text-emerald-400/50" />
              </div>
              <h3 className="text-lg font-semibold mb-1">No active subscriptions</h3>
              <p className="text-sm text-muted-foreground">
                Subscription data from Stripe will appear here once users subscribe.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Hero MRR Card */}
        <Card className="bg-gradient-to-br from-emerald-500/20 via-emerald-600/10 to-green-700/5 border-emerald-500/30 overflow-hidden">
          <CardContent className="pt-5 pb-5 relative">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-400 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-green-400 rounded-full blur-3xl" />
            </div>

            <div className="relative">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-xs text-emerald-400/70 uppercase tracking-wider font-medium mb-1">
                    Monthly Recurring Revenue
                  </p>
                  <p className="text-4xl font-bold text-emerald-400">
                    £
                    {mrr.toLocaleString('en-GB', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center">
                  <PoundSterling className="h-7 w-7 text-emerald-400" />
                </div>
              </div>

              {/* Quick stats row */}
              <div className="grid grid-cols-3 gap-2 mt-4">
                <div className="bg-black/20 rounded-xl p-3 text-center">
                  <p className="text-lg font-bold text-white">{totalSubs}</p>
                  <p className="text-xs text-emerald-400/70 uppercase">Active Subs</p>
                </div>
                <div className="bg-black/20 rounded-xl p-3 text-center">
                  <p className="text-lg font-bold text-white">
                    £{arr.toLocaleString('en-GB', { maximumFractionDigits: 0 })}
                  </p>
                  <p className="text-xs text-emerald-400/70 uppercase">ARR</p>
                </div>
                <div className="bg-black/20 rounded-xl p-3 text-center">
                  <p className="text-lg font-bold text-white">£{arpu.toFixed(2)}</p>
                  <p className="text-xs text-emerald-400/70 uppercase">ARPU</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tier Breakdown - Large Touch Targets */}
        <div className="grid grid-cols-2 gap-3">
          {(['founder', 'apprentice', 'electrician', 'employer'] as const).map((tier) => {
            const config = tierConfig[tier];
            const Icon = config.icon;
            const count = stripeStats?.stripe.tierCounts?.[tier] || 0;
            const revenue = count * parseFloat(config.price.replace('£', ''));

            const colorClasses = {
              yellow: 'from-yellow-500/20 to-amber-600/10 border-yellow-500/40 text-yellow-400',
              cyan: 'from-cyan-500/20 to-cyan-600/10 border-cyan-500/40 text-cyan-400',
              blue: 'from-blue-500/20 to-blue-600/10 border-blue-500/40 text-blue-400',
              purple: 'from-yellow-500/20 to-yellow-600/10 border-yellow-500/40 text-yellow-400',
            };

            return (
              <Card
                key={tier}
                className={cn(
                  'bg-gradient-to-br border touch-manipulation active:scale-[0.98] transition-transform',
                  colorClasses[config.color as keyof typeof colorClasses]
                )}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <Icon className="h-6 w-6" />
                    <Badge variant="outline" className="text-xs border-current/30">
                      {config.price}/mo
                    </Badge>
                  </div>
                  <p className="text-3xl font-bold">{count}</p>
                  <p className="text-xs text-muted-foreground capitalize mt-1">{tier}s</p>
                  <p className="text-xs opacity-70 mt-2">£{revenue.toFixed(2)}/mo</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* 30-Day Performance */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Calendar className="h-4 w-4 text-blue-400" />
              Last 30 Days
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-gradient-to-br from-green-500/15 to-green-600/5 rounded-xl p-4 text-center border border-green-500/20">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <ArrowUp className="h-4 w-4 text-green-400" />
                  <p className="text-2xl font-bold text-green-400">+{subsLast14Days}</p>
                </div>
                <p className="text-xs text-muted-foreground">New Subs</p>
              </div>
              <div className="bg-gradient-to-br from-red-500/15 to-red-600/5 rounded-xl p-4 text-center border border-red-500/20">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <ArrowDown className="h-4 w-4 text-red-400" />
                  <p className="text-2xl font-bold text-red-400">{churned}</p>
                </div>
                <p className="text-xs text-muted-foreground">Cancelled</p>
              </div>
              <div className="bg-gradient-to-br from-amber-500/15 to-amber-600/5 rounded-xl p-4 text-center border border-amber-500/20">
                <p className="text-2xl font-bold text-amber-400">{churnRate.toFixed(1)}%</p>
                <p className="text-xs text-muted-foreground">Churn Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Revenue Chart - 14 Day Bar Chart */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-emerald-400" />
                Daily Revenue
              </CardTitle>
              <Badge variant="outline" className="text-xs">
                14 days • £{totalLast14Days.toFixed(0)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-end justify-between gap-1 h-32">
              {dailyRevenue.map((day, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  {/* Bar */}
                  <div className="w-full flex flex-col items-center justify-end h-24">
                    <div
                      className={cn(
                        'w-full rounded-t-lg transition-all duration-300',
                        day.amount > 0
                          ? 'bg-gradient-to-t from-emerald-500 to-emerald-400'
                          : 'bg-muted/30'
                      )}
                      style={{
                        height: `${Math.max((day.amount / maxDailyRevenue) * 100, day.amount > 0 ? 8 : 2)}%`,
                        minHeight: day.amount > 0 ? '8px' : '2px',
                      }}
                    />
                  </div>
                  {/* Day label */}
                  <span className="text-xs text-muted-foreground">{day.date}</span>
                </div>
              ))}
            </div>

            {/* Summary row */}
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/50">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-xs text-muted-foreground">New MRR</span>
              </div>
              <span className="text-sm font-medium text-emerald-400">
                +£{totalLast14Days.toFixed(2)}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Data Source Comparison */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-400" />
              Data Sources
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* Stripe */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Stripe</p>
                <p className="text-xs text-muted-foreground">Live payment data</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-emerald-400">
                  {stripeStats?.stripe.activeSubscriptions || 0}
                </p>
                <p className="text-xs text-muted-foreground">active</p>
              </div>
            </div>

            {/* Supabase */}
            <div
              className={cn(
                'flex items-center gap-3 p-3 rounded-xl border',
                hasDiscrepancies
                  ? 'bg-orange-500/5 border-orange-500/20'
                  : 'bg-blue-500/5 border-blue-500/20'
              )}
            >
              <div
                className={cn(
                  'w-10 h-10 rounded-xl flex items-center justify-center',
                  hasDiscrepancies ? 'bg-orange-500/20' : 'bg-blue-500/20'
                )}
              >
                {hasDiscrepancies ? (
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                ) : (
                  <CheckCircle2 className="h-5 w-5 text-blue-400" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Database</p>
                <p className="text-xs text-muted-foreground">
                  {hasDiscrepancies ? 'Needs sync' : 'In sync'}
                </p>
              </div>
              <div className="text-right">
                <p
                  className={cn(
                    'text-lg font-bold',
                    hasDiscrepancies ? 'text-orange-400' : 'text-blue-400'
                  )}
                >
                  {stripeStats?.supabase.subscribedUsers || 0}
                </p>
                <p className="text-xs text-muted-foreground">synced</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Price Breakdown */}
        {stripeStats?.stripe.subscriptionsByPrice &&
          Object.keys(stripeStats.stripe.subscriptionsByPrice).length > 0 && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Active Prices</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.entries(stripeStats.stripe.subscriptionsByPrice)
                    .sort((a, b) => b[1] - a[1])
                    .map(([price, count]) => {
                      const percentage = totalSubs > 0 ? (count / totalSubs) * 100 : 0;
                      return (
                        <div key={price} className="flex items-center gap-3">
                          <div className="flex-1">
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-muted-foreground">{price}</span>
                              <span className="font-medium">{count}</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-emerald-500 to-green-400 rounded-full transition-all"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </CardContent>
            </Card>
          )}
      </div>
    </PullToRefresh>
  );
}
