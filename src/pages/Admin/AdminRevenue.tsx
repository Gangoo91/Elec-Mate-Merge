import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { RefreshCw, AlertTriangle } from 'lucide-react';
import { format, subDays, startOfDay } from 'date-fns';
import { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { AnimatedCounter } from '@/components/dashboard/AnimatedCounter';
import PullToRefresh from '@/components/admin/PullToRefresh';
import {
  PageFrame,
  PageHero,
  HeroNumber,
  StatStrip,
  ListCard,
  ListCardHeader,
  ListBody,
  ListRow,
  Pill,
  IconButton,
  LoadingBlocks,
  EmptyState,
  Avatar,
  Dot,
  type Tone,
} from '@/components/admin/editorial';

interface StripeStats {
  stripe: {
    activeSubscriptions: number;
    canceledLast30Days: number;
    trialingSubscriptions?: number;
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

const tierTone: Record<string, Tone> = {
  founder: 'yellow',
  apprentice: 'cyan',
  electrician: 'blue',
  employer: 'purple',
  business_ai: 'yellow',
};

const tierPrice: Record<string, string> = {
  founder: '£3.99',
  apprentice: '£5.99',
  electrician: '£12.99',
  employer: '£29.99',
};

function getInitials(name?: string | null, email?: string | null) {
  const src = (name && name.trim()) || email || '?';
  const parts = src.split(/[\s@._-]+/).filter(Boolean);
  return (parts[0]?.[0] ?? '?').toUpperCase() + (parts[1]?.[0] ?? '').toUpperCase();
}

export default function AdminRevenue() {
  const queryClient = useQueryClient();
  const [isRefreshing, setIsRefreshing] = useState(false);

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

  const { data: rcStats } = useQuery<{
    subscribersBySource: Record<string, number>;
    tiersBySource: Record<string, Record<string, number>>;
    revenuecat: { mrr: number; revenue: number; activeSubscriptions: number; activeTrials: number };
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

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ['admin-stripe-live-stats'] }),
      queryClient.invalidateQueries({ queryKey: ['admin-revenuecat-stats'] }),
    ]);
    setTimeout(() => setIsRefreshing(false), 500);
  }, [queryClient]);

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

  if (stripeLoading) {
    return (
      <PageFrame>
        <PageHero
          eyebrow="Finance"
          title="Revenue"
          description="Live Stripe, App Store and Play Store revenue."
          tone="yellow"
        />
        <LoadingBlocks />
      </PageFrame>
    );
  }

  const stripeMrr = stripeStats?.stripe.mrr || 0;
  const rcMrr = rcStats?.revenuecat?.mrr || 0;
  const mrr = stripeMrr + rcMrr;
  const arr = mrr * 12;
  const rcActiveTrials = ((rcStats as any)?.trialUsers || []).filter((t: any) => !t.is_cancelled).length;
  const appStoreSubs = rcStats?.subscribersBySource?.app_store || 0;
  const playStoreSubs = rcStats?.subscribersBySource?.play_store || 0;
  const totalSubs = (stripeStats?.stripe.activeSubscriptions || 0) + appStoreSubs + playStoreSubs;
  const arpu = totalSubs > 0 ? mrr / totalSubs : 0;
  const churned = stripeStats?.stripe.canceledLast30Days || 0;
  const churnRate = totalSubs > 0 ? (churned / (totalSubs + churned)) * 100 : 0;
  const hasDiscrepancies =
    (stripeStats?.discrepancies.inStripeNotSupabase || 0) +
      (stripeStats?.discrepancies.inSupabaseNotStripe || 0) >
    0;

  const stripeTierCounts = stripeStats?.stripe.tierCounts;
  const rcAppStoreTiers = rcStats?.tiersBySource?.app_store || {};

  const recentSubs = (stripeStats?.subscriptions || [])
    .slice()
    .sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime())
    .slice(0, 12);

  return (
    <PullToRefresh
      onRefresh={async () => {
        await handleRefresh();
      }}
    >
      <PageFrame>
        <PageHero
          eyebrow="Finance"
          title="Revenue"
          description="Live Stripe, App Store and Play Store revenue."
          tone="yellow"
          actions={
            <IconButton
              onClick={handleRefresh}
              disabled={stripeFetching || isRefreshing}
              aria-label="Refresh"
            >
              <RefreshCw
                className={cn('h-4 w-4', (stripeFetching || isRefreshing) && 'animate-spin')}
              />
            </IconButton>
          }
        />

        {totalSubs === 0 ? (
          <EmptyState
            title="No active subscriptions"
            description="Subscription data from Stripe and RevenueCat will appear here once users subscribe."
          />
        ) : (
          <HeroNumber
            eyebrow="Live MRR"
            live
            value={<AnimatedCounter value={mrr} prefix="£" decimals={2} />}
            caption={
              stripeStats
                ? `Stripe + RevenueCat · Updated ${new Date(stripeStats.generatedAt).toLocaleTimeString()}`
                : 'Monthly recurring revenue'
            }
            columns={[
              {
                label: 'ARR',
                value: (
                  <AnimatedCounter value={arr} prefix="£" decimals={0} formatAsCurrency />
                ),
              },
              {
                label: 'Paying',
                value: <AnimatedCounter value={totalSubs} />,
                tone: 'yellow',
              },
              {
                label: 'Avg ARPU',
                value: `£${arpu.toFixed(2)}`,
              },
            ]}
            legend={[
              {
                label: 'Stripe',
                value: `£${stripeMrr.toFixed(2)}`,
                tone: 'purple',
              },
              {
                label: 'App Store',
                value: appStoreSubs,
                tone: 'blue',
              },
              {
                label: 'Play Store',
                value: playStoreSubs,
                tone: 'green',
              },
            ]}
          />
        )}

        <StatStrip
          columns={4}
          numbered
          stats={[
            {
              label: 'Founder',
              value: stripeTierCounts?.founder ?? 0,
              tone: 'yellow',
              sub: tierPrice.founder,
            },
            {
              label: 'Electrician',
              value: stripeTierCounts?.electrician ?? 0,
              tone: 'emerald',
              sub: tierPrice.electrician,
            },
            {
              label: 'Apprentice',
              value: stripeTierCounts?.apprentice ?? 0,
              tone: 'blue',
              sub: tierPrice.apprentice,
            },
            {
              label: 'Employer',
              value: stripeTierCounts?.employer ?? 0,
              tone: 'purple',
              sub: tierPrice.employer,
            },
          ]}
        />

        <ListCard>
          <ListCardHeader
            tone="yellow"
            title="Last 14 Days"
            meta={
              <Pill tone="emerald">+£{totalLast14Days.toFixed(0)} new MRR</Pill>
            }
          />
          <div className="p-4 sm:p-5">
            <div className="grid grid-cols-3 gap-px bg-white/[0.06] border border-white/[0.06] rounded-xl overflow-hidden mb-5">
              <div className="bg-[hsl(0_0%_10%)] px-4 py-4 text-center">
                <div className="text-xl sm:text-2xl font-semibold tabular-nums text-emerald-400 leading-none">
                  +{subsLast14Days}
                </div>
                <div className="mt-2 text-[10px] text-white uppercase tracking-[0.14em] font-medium">
                  New subs
                </div>
              </div>
              <div className="bg-[hsl(0_0%_10%)] px-4 py-4 text-center">
                <div className="text-xl sm:text-2xl font-semibold tabular-nums text-white leading-none">
                  {churned}
                </div>
                <div className="mt-2 text-[10px] text-white uppercase tracking-[0.14em] font-medium">
                  Cancelled
                </div>
              </div>
              <div className="bg-[hsl(0_0%_10%)] px-4 py-4 text-center">
                <div className="text-xl sm:text-2xl font-semibold tabular-nums text-amber-400 leading-none">
                  {churnRate.toFixed(1)}%
                </div>
                <div className="mt-2 text-[10px] text-white uppercase tracking-[0.14em] font-medium">
                  Churn
                </div>
              </div>
            </div>

            <div className="flex items-end justify-between gap-1 h-28">
              {dailyRevenue.map((day, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                  <div className="w-full flex flex-col items-center justify-end h-20">
                    <div
                      className={cn(
                        'w-full rounded-t-md transition-all duration-300',
                        day.amount > 0 ? 'bg-elec-yellow' : 'bg-white/[0.06]'
                      )}
                      style={{
                        height: `${Math.max((day.amount / maxDailyRevenue) * 100, day.amount > 0 ? 8 : 2)}%`,
                        minHeight: day.amount > 0 ? '8px' : '2px',
                      }}
                    />
                  </div>
                  <span className="text-[10px] text-white tabular-nums">{day.date}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/[0.06]">
              <div className="flex items-center gap-2">
                <Dot tone="yellow" />
                <span className="text-[11px] text-white">New MRR</span>
              </div>
              <span className="text-[12px] font-semibold text-white tabular-nums">
                +£{totalLast14Days.toFixed(2)}
              </span>
            </div>
          </div>
        </ListCard>

        {(rcMrr > 0 || Object.keys(rcAppStoreTiers).length > 0 || rcActiveTrials > 0) && (
          <ListCard>
            <ListCardHeader
              tone="blue"
              title="Mobile App (RevenueCat)"
              meta={
                rcMrr > 0 ? (
                  <Pill tone="blue">£{rcMrr.toFixed(2)} MRR</Pill>
                ) : undefined
              }
            />
            <ListBody>
              {(() => {
                const tierDefs: Array<{ key: string; name: string; price: string; tone: Tone }> = [
                  { key: 'apprentice', name: 'Apprentice', price: '£6.99/mo', tone: 'cyan' },
                  { key: 'electrician', name: 'Electrician', price: '£14.99/mo', tone: 'blue' },
                  { key: 'business_ai', name: 'Mate', price: '£29.99/mo', tone: 'yellow' },
                  { key: 'employer', name: 'Employer', price: '£49.99/mo', tone: 'purple' },
                ];
                return tierDefs.map((t) => {
                  const count =
                    (rcAppStoreTiers[t.key] || 0) + (rcAppStoreTiers[`${t.key}_yearly`] || 0);
                  return (
                    <ListRow
                      key={t.key}
                      accent={t.tone}
                      title={t.name}
                      subtitle={
                        count > 0
                          ? `${count} subscriber${count !== 1 ? 's' : ''} · ${t.price}`
                          : `No subscribers yet · ${t.price}`
                      }
                      trailing={
                        <span
                          className={cn(
                            'text-[15px] font-semibold tabular-nums',
                            count > 0 ? 'text-white' : 'text-white'
                          )}
                        >
                          {count}
                        </span>
                      }
                    />
                  );
                });
              })()}
              {rcActiveTrials > 0 && (
                <ListRow
                  accent="orange"
                  title="Active Trials"
                  subtitle="Free trial period"
                  trailing={<Pill tone="orange">{rcActiveTrials} trialing</Pill>}
                />
              )}
            </ListBody>
          </ListCard>
        )}

        {recentSubs.length > 0 && (
          <ListCard>
            <ListCardHeader
              tone="emerald"
              title="Recent Subscriptions"
              meta={<Pill tone="emerald">{recentSubs.length}</Pill>}
            />
            <ListBody>
              {recentSubs.map((sub) => {
                const tierKey = (sub.tier || 'unknown').toLowerCase();
                const tone = tierTone[tierKey] ?? 'yellow';
                return (
                  <ListRow
                    key={sub.subscriptionId}
                    lead={<Avatar initials={getInitials(sub.customerName, sub.customerEmail)} />}
                    title={sub.customerName || sub.customerEmail || 'Unknown'}
                    subtitle={sub.customerEmail}
                    trailing={
                      <>
                        <Pill tone={tone}>{sub.tier || 'unknown'}</Pill>
                        <span className="text-[11px] text-white tabular-nums">
                          £{sub.monthlyAmount.toFixed(2)}
                        </span>
                      </>
                    }
                  />
                );
              })}
            </ListBody>
          </ListCard>
        )}

        <ListCard>
          <ListCardHeader
            tone={hasDiscrepancies ? 'amber' : 'emerald'}
            title="Data Sync"
            meta={
              hasDiscrepancies ? (
                <Pill tone="amber">Action needed</Pill>
              ) : (
                <Pill tone="emerald">In sync</Pill>
              )
            }
            action="Refresh"
            onAction={handleRefresh}
          />
          <ListBody>
            <ListRow
              accent="emerald"
              title="Stripe"
              subtitle="Active subscriptions reported by Stripe"
              trailing={
                <span className="text-[15px] font-semibold tabular-nums text-white">
                  {stripeStats?.stripe.activeSubscriptions || 0}
                </span>
              }
            />
            <ListRow
              accent={hasDiscrepancies ? 'amber' : 'blue'}
              title="Supabase"
              subtitle="Users marked as subscribed in our database"
              trailing={
                <span
                  className={cn(
                    'text-[15px] font-semibold tabular-nums',
                    hasDiscrepancies ? 'text-amber-400' : 'text-white'
                  )}
                >
                  {stripeStats?.supabase.subscribedUsers || 0}
                </span>
              }
            />
          </ListBody>
          {hasDiscrepancies && (
            <div className="mx-4 sm:mx-5 mb-4 sm:mb-5 rounded-xl border border-amber-500/20 bg-amber-500/5 px-4 py-3 flex items-start gap-3">
              <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-semibold text-amber-400">
                  Discrepancy detected
                </div>
                <div className="mt-0.5 text-[12px] text-white">
                  {stripeStats?.discrepancies.inStripeNotSupabase ?? 0} in Stripe not yet synced to
                  Supabase · {stripeStats?.discrepancies.inSupabaseNotStripe ?? 0} in Supabase
                  without a Stripe link.
                </div>
              </div>
            </div>
          )}
        </ListCard>

        {(stripeStats?.stripe.subscriptionsByPrice &&
          Object.keys(stripeStats.stripe.subscriptionsByPrice).length > 0) ||
        Object.keys(rcAppStoreTiers).length > 0 ? (
          <ListCard>
            <ListCardHeader tone="purple" title="Active Prices" />
            <div className="p-4 sm:p-5 space-y-4">
              {stripeStats?.stripe.subscriptionsByPrice &&
                Object.entries(stripeStats.stripe.subscriptionsByPrice)
                  .sort((a, b) => b[1] - a[1])
                  .map(([price, count]) => {
                    const percentage = totalSubs > 0 ? (count / totalSubs) * 100 : 0;
                    return (
                      <div key={price} className="flex items-center gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-3 mb-1.5">
                            <div className="flex items-center gap-2 min-w-0">
                              <span className="text-[13px] text-white truncate">{price}</span>
                              <Pill tone="purple">Stripe</Pill>
                            </div>
                            <span className="text-[13px] font-semibold tabular-nums text-white">
                              {count}
                            </span>
                          </div>
                          <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
                            <div
                              className="h-full bg-elec-yellow rounded-full transition-all"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
              {(() => {
                const entries = Object.entries(rcAppStoreTiers);
                if (entries.length === 0) return null;
                const totalRC = entries.reduce((sum, [, c]) => sum + c, 0);
                return entries
                  .sort(([, a], [, b]) => b - a)
                  .map(([tier, count]) => {
                    const percentage = totalRC > 0 ? (count / totalRC) * 100 : 0;
                    return (
                      <div key={`rc-${tier}`} className="flex items-center gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-3 mb-1.5">
                            <div className="flex items-center gap-2 min-w-0">
                              <span className="text-[13px] text-white capitalize truncate">
                                {tier.replace('_', ' ')}
                              </span>
                              <Pill tone="blue">App Store</Pill>
                            </div>
                            <span className="text-[13px] font-semibold tabular-nums text-white">
                              {count}
                            </span>
                          </div>
                          <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-400 rounded-full transition-all"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  });
              })()}
            </div>
          </ListCard>
        ) : null}
      </PageFrame>
    </PullToRefresh>
  );
}
