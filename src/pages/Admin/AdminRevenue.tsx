import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  PoundSterling,
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
} from 'lucide-react';
import { format, subDays, startOfDay } from 'date-fns';
import { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { AnimatedCounter } from '@/components/dashboard/AnimatedCounter';
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

  /* ── Loading skeleton ──────────────────────────────────────── */

  if (stripeLoading) {
    return (
      <div className="space-y-3 animate-pulse">
        {/* Hero skeleton */}
        <div className="glass-premium rounded-2xl overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-emerald-500 to-green-400" />
          <div className="p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="h-4 w-40 bg-white/[0.06] rounded" />
              <div className="h-6 w-14 bg-white/[0.06] rounded-full" />
            </div>
            <div className="h-10 w-48 bg-white/[0.06] rounded" />
            <div className="grid grid-cols-3 gap-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-16 bg-white/[0.06] rounded-xl" />
              ))}
            </div>
          </div>
        </div>
        {/* Tier skeleton */}
        <div className="grid grid-cols-2 gap-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="glass-premium rounded-2xl overflow-hidden">
              <div className="h-1 bg-white/[0.06]" />
              <div className="p-4 space-y-3">
                <div className="h-4 w-20 bg-white/[0.06] rounded" />
                <div className="h-8 w-12 bg-white/[0.06] rounded" />
              </div>
            </div>
          ))}
        </div>
        {/* Chart skeleton */}
        <div className="glass-premium rounded-2xl overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-blue-500 to-cyan-400" />
          <div className="p-5">
            <div className="h-32 bg-white/[0.06] rounded-xl" />
          </div>
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
      <div className="space-y-3 pb-20">
        {/* Data Health Alert */}
        {hasDiscrepancies && (
          <motion.div
            className="glass-premium rounded-2xl overflow-hidden"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="h-0.5 bg-gradient-to-r from-orange-500 to-amber-400" />
            <div className="p-3 flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-orange-400 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-orange-400">Data Sync Required</p>
                <p className="text-xs text-white">
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
            </div>
          </motion.div>
        )}

        {/* Empty State */}
        {totalSubs === 0 && !stripeLoading && (
          <motion.div
            className="glass-premium rounded-2xl overflow-hidden"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="h-0.5 bg-gradient-to-r from-emerald-500 to-green-400" />
            <div className="py-12 text-center px-4">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
                <PoundSterling className="h-8 w-8 text-emerald-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">No active subscriptions</h3>
              <p className="text-sm text-white">
                Subscription data from Stripe will appear here once users subscribe.
              </p>
            </div>
          </motion.div>
        )}

        {/* Hero MRR Card */}
        <motion.section
          className="glass-premium rounded-2xl overflow-hidden"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          <div className="h-0.5 bg-gradient-to-r from-emerald-500 to-green-400" />
          <div className="p-5">
            {/* Header row */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center">
                  <PoundSterling className="h-5 w-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Monthly Recurring Revenue</p>
                  <p className="text-xs text-white">
                    {stripeStats
                      ? `All Sources \u2022 ${new Date(stripeStats.generatedAt).toLocaleTimeString()}`
                      : 'Loading live data...'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {stripeStats && (
                  <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-xs gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    LIVE
                  </Badge>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 touch-manipulation"
                  onClick={handleRefresh}
                  disabled={stripeFetching || isRefreshing}
                >
                  <RefreshCw
                    className={cn(
                      'h-4 w-4 text-white',
                      (stripeFetching || isRefreshing) && 'animate-spin'
                    )}
                  />
                </Button>
              </div>
            </div>

            {/* Big MRR number */}
            <AnimatedCounter
              value={mrr}
              prefix="£"
              decimals={2}
              className="text-4xl font-bold text-emerald-400"
            />

            {/* Sub-stat boxes */}
            <div className="grid grid-cols-3 gap-2 mt-4">
              <div className="bg-white/[0.04] rounded-xl p-3 text-center">
                <AnimatedCounter value={totalSubs} className="text-lg font-bold text-white" />
                <p className="text-xs text-white uppercase mt-0.5">Active Subs</p>
              </div>
              <div className="bg-white/[0.04] rounded-xl p-3 text-center">
                <AnimatedCounter
                  value={arr}
                  prefix="£"
                  decimals={0}
                  formatAsCurrency
                  className="text-lg font-bold text-white"
                />
                <p className="text-xs text-white uppercase mt-0.5">ARR</p>
              </div>
              <div className="bg-white/[0.04] rounded-xl p-3 text-center">
                <p className="text-lg font-bold text-white">£{arpu.toFixed(2)}</p>
                <p className="text-xs text-white uppercase mt-0.5">ARPU</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Web (Stripe) Tiers */}
        <motion.section variants={sectionVariants} initial="hidden" animate="visible" custom={1}>
          <p className="text-[10px] font-semibold text-white uppercase tracking-widest mb-2 px-1">
            Web App (Stripe)
          </p>
        </motion.section>
        <motion.div
          className="space-y-2"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          {(['founder', 'apprentice', 'electrician', 'employer'] as const).map((tier) => {
            const config = tierConfig[tier];
            const Icon = config.icon;
            const count = stripeStats?.stripe.tierCounts?.[tier] || 0;
            const revenue = count * parseFloat(config.price.replace('£', ''));

            const borderColors = {
              yellow: 'border-l-yellow-500',
              cyan: 'border-l-cyan-500',
              blue: 'border-l-blue-500',
              purple: 'border-l-purple-500',
            };

            const textColors = {
              yellow: 'text-yellow-400',
              cyan: 'text-cyan-400',
              blue: 'text-blue-400',
              purple: 'text-purple-400',
            };

            const bgColors = {
              yellow: 'bg-yellow-500/15',
              cyan: 'bg-cyan-500/15',
              blue: 'bg-blue-500/15',
              purple: 'bg-purple-500/15',
            };

            return (
              <div
                key={tier}
                className="glass-premium rounded-xl overflow-hidden flex items-center gap-3 p-3.5"
              >
                <div
                  className={cn(
                    'w-1 self-stretch rounded-full opacity-60',
                    borderColors[config.color as keyof typeof borderColors].replace(
                      'border-l-',
                      'bg-'
                    )
                  )}
                />
                <div
                  className={cn(
                    'w-10 h-10 rounded-xl flex items-center justify-center shrink-0',
                    bgColors[config.color as keyof typeof bgColors]
                  )}
                >
                  <Icon
                    className={cn('h-5 w-5', textColors[config.color as keyof typeof textColors])}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-semibold text-white capitalize">{tier}</p>
                  <p className="text-[11px] text-white">£{revenue.toFixed(2)}/mo</p>
                </div>
                <div className="text-right shrink-0">
                  <p
                    className={cn(
                      'text-2xl font-bold',
                      textColors[config.color as keyof typeof textColors]
                    )}
                  >
                    {count}
                  </p>
                  <p
                    className={cn(
                      'text-[10px] font-medium',
                      textColors[config.color as keyof typeof textColors]
                    )}
                  >
                    {config.price}
                  </p>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Mobile App (RevenueCat) Tiers */}
        <motion.section variants={sectionVariants} initial="hidden" animate="visible" custom={1.5}>
          <p className="text-[10px] font-semibold text-white uppercase tracking-widest mb-2 px-1">
            Mobile App (RevenueCat)
          </p>
          <div className="space-y-2">
            {[
              {
                name: 'Apprentice',
                price: '£6.99/mo',
                icon: GraduationCap,
                text: 'text-cyan-400',
                bg: 'bg-cyan-500/15',
                bar: 'bg-cyan-500',
              },
              {
                name: 'Electrician',
                price: '£14.99/mo',
                icon: Zap,
                text: 'text-blue-400',
                bg: 'bg-blue-500/15',
                bar: 'bg-blue-500',
              },
            ].map((t) => (
              <div
                key={t.name}
                className="glass-premium rounded-xl overflow-hidden flex items-center gap-3 p-3.5"
              >
                <div className={cn('w-1 self-stretch rounded-full opacity-60', t.bar)} />
                <div
                  className={cn(
                    'w-10 h-10 rounded-xl flex items-center justify-center shrink-0',
                    t.bg
                  )}
                >
                  <t.icon className={cn('h-5 w-5', t.text)} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-semibold text-white">{t.name}</p>
                  <p className="text-[11px] text-white">£0.00/mo</p>
                </div>
                <div className="text-right shrink-0">
                  <p className={cn('text-2xl font-bold', t.text)}>0</p>
                  <p className={cn('text-[10px] font-medium', t.text)}>{t.price}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* 14-Day Performance + Chart — Combined Glass Card */}
        <motion.div
          className="glass-premium rounded-2xl overflow-hidden"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          <div className="h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400" />
          <div className="p-5">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-blue-400" />
                <span className="text-sm font-medium text-white">Last 14 Days</span>
              </div>
              <span className="text-sm font-semibold text-emerald-400">
                +£{totalLast14Days.toFixed(0)} new MRR
              </span>
            </div>

            {/* Compact stat row */}
            <div className="flex items-center gap-4 mb-5">
              <div className="flex items-center gap-1.5">
                <ArrowUp className="h-3.5 w-3.5 text-green-400" />
                <span className="text-sm font-semibold text-green-400">+{subsLast14Days}</span>
                <span className="text-xs text-white">new</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ArrowDown className="h-3.5 w-3.5 text-red-400" />
                <span className="text-sm font-semibold text-red-400">{churned}</span>
                <span className="text-xs text-white">cancelled</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-semibold text-amber-400">
                  {churnRate.toFixed(1)}%
                </span>
                <span className="text-xs text-white">churn</span>
              </div>
            </div>

            {/* Bar chart */}
            <div className="flex items-end justify-between gap-1 h-24">
              {dailyRevenue.map((day, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex flex-col items-center justify-end h-20">
                    <div
                      className={cn(
                        'w-full rounded-t-lg transition-all duration-300',
                        day.amount > 0
                          ? 'bg-gradient-to-t from-emerald-500 to-emerald-400'
                          : 'bg-white/[0.06]'
                      )}
                      style={{
                        height: `${Math.max((day.amount / maxDailyRevenue) * 100, day.amount > 0 ? 8 : 2)}%`,
                        minHeight: day.amount > 0 ? '8px' : '2px',
                      }}
                    />
                  </div>
                  <span className="text-xs text-white">{day.date}</span>
                </div>
              ))}
            </div>

            {/* Summary row */}
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/[0.06]">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-xs text-white">New MRR</span>
              </div>
              <span className="text-sm font-medium text-emerald-400">
                +£{totalLast14Days.toFixed(2)}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Data Sync — Compact Glass Row */}
        <motion.div
          className={cn(
            'glass-premium rounded-2xl overflow-hidden',
            hasDiscrepancies && 'ring-1 ring-orange-500/30'
          )}
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          custom={3}
        >
          <div className="px-4 py-3 flex items-center">
            {/* Stripe side */}
            <div className="flex items-center gap-2 flex-1">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-xs font-medium text-white">Stripe:</span>
              <span className="text-sm font-semibold text-emerald-400">
                {stripeStats?.stripe.activeSubscriptions || 0}
              </span>
              <span className="text-xs text-white">active</span>
            </div>

            {/* Divider */}
            <div className="w-px h-5 bg-white/10 mx-3" />

            {/* DB side */}
            <div className="flex items-center gap-2 flex-1">
              <div
                className={cn(
                  'w-2 h-2 rounded-full',
                  hasDiscrepancies ? 'bg-orange-400' : 'bg-blue-400'
                )}
              />
              <span className="text-xs font-medium text-white">DB:</span>
              <span
                className={cn(
                  'text-sm font-semibold',
                  hasDiscrepancies ? 'text-orange-400' : 'text-blue-400'
                )}
              >
                {stripeStats?.supabase.subscribedUsers || 0}
              </span>
              <span className="text-xs text-white">synced</span>
            </div>

            {/* Status icon */}
            {hasDiscrepancies ? (
              <AlertTriangle className="h-4 w-4 text-orange-400 ml-2" />
            ) : (
              <CheckCircle2 className="h-4 w-4 text-emerald-400 ml-2" />
            )}
          </div>
        </motion.div>

        {/* Price Breakdown — Stripe + App Store */}
        <motion.div
          className="glass-premium rounded-2xl overflow-hidden"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          custom={4}
        >
          <div className="h-0.5 bg-gradient-to-r from-emerald-500 to-green-400" />
          <div className="p-5">
            <p className="text-sm font-medium text-white mb-3">Active Prices</p>
            <div className="space-y-2">
              {/* Stripe prices */}
              {stripeStats?.stripe.subscriptionsByPrice &&
                Object.entries(stripeStats.stripe.subscriptionsByPrice)
                  .sort((a, b) => b[1] - a[1])
                  .map(([price, count]) => {
                    const percentage = totalSubs > 0 ? (count / totalSubs) * 100 : 0;
                    return (
                      <div key={price} className="flex items-center gap-3">
                        <div className="w-1 h-6 rounded-full bg-purple-500 opacity-60" />
                        <div className="flex-1">
                          <div className="flex justify-between text-sm mb-1">
                            <div className="flex items-center gap-2">
                              <span className="text-white">{price}</span>
                              <Badge className="bg-purple-500/15 text-purple-400 border-0 text-[9px]">
                                Stripe
                              </Badge>
                            </div>
                            <span className="font-medium text-white">{count}</span>
                          </div>
                          <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full transition-all"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
              {/* RevenueCat Mobile App prices */}
              {[
                { price: '£6.99/month', label: 'Apprentice' },
                { price: '£14.99/month', label: 'Electrician' },
                { price: '£69.99/year', label: 'Apprentice Yearly' },
                { price: '£149.99/year', label: 'Electrician Yearly' },
              ].map((rc) => (
                <div key={rc.price} className="flex items-center gap-3">
                  <div className="w-1 h-6 rounded-full bg-green-500 opacity-60" />
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-white">{rc.price}</span>
                        <Badge className="bg-green-500/15 text-green-400 border-0 text-[9px]">
                          RevenueCat
                        </Badge>
                        <span className="text-[10px] text-white">{rc.label}</span>
                      </div>
                      <span className="font-medium text-white">0</span>
                    </div>
                    <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full"
                        style={{ width: '0%' }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </PullToRefresh>
  );
}
