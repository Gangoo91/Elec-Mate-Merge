import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { RefreshCw, CheckCircle2, AlertTriangle } from 'lucide-react';
import { format, subDays, startOfDay } from 'date-fns';
import { useState, useCallback, type ReactNode } from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { cn } from '@/lib/utils';
import { AnimatedCounter } from '@/components/dashboard/AnimatedCounter';
import PullToRefresh from '@/components/admin/PullToRefresh';
import {
  PageFrame,
  PageHero,
  ListCard,
  ListCardHeader,
  ListBody,
  ListRow,
  Pill,
  IconButton,
  LoadingBlocks,
  EmptyState,
  Avatar,
  Eyebrow,
  PulseDot,
  type Tone,
} from '@/components/admin/editorial';
import { useLifetimeBuyers } from '@/hooks/useLifetimeBuyers';
import { stripePrices } from '@/data/stripePrices';

/* ────────────────────────────────────────────────────────
   Chart palette

   Validated, not chosen by eye. The first attempt here used Tailwind's
   cyan-400 / blue-400 / emerald-400 family, which fails two of the six checks
   against this surface (#1C1C1C): every hue sits above the dark lightness
   band, and Apprentice-cyan against Electrician-blue measures ΔE 13.2 to
   normal vision — below the 15 floor, and those are the two largest tiers
   sitting next to each other in the stacked bar.

   These are the reference categorical steps for a dark surface, kept in their
   published order because the ORDER is the colourblind-safety mechanism, not
   decoration. Re-run before changing anything here:
     node scripts/validate_palette.js \
       "#3987E5,#E66767,#199E70,#C98500,#D55181,#008300" \
       --mode dark --surface "#1C1C1C"
   → all six PASS (worst adjacent CVD ΔE 8.4, normal-vision ΔE 19.3).

   elec-yellow is deliberately NOT in this set: at L 0.857 it is far outside
   the band, and leading with it collapsed magenta against aqua to ΔE 1.6 for
   deuteranopes. It stays what it already is — the brand/UI accent and the
   single-series chart colour, where there is no second series to confuse it
   with.
   ──────────────────────────────────────────────────────── */
const SERIES = ['#3987E5', '#E66767', '#199E70', '#9085E9', '#D55181', '#008300'] as const;

/** Chart chrome. Gridlines are solid hairlines one step off the surface —
 *  dashing reads as "projection" or "threshold" when it is just a grid. */
const CHART_STROKE = 'hsl(var(--elec-yellow))';
const CHART_GRID = '#2C2C2A';
const CHART_AXIS = '#898781';
/** Status is a reserved, fixed palette — never a categorical slot, and never
 *  carrying meaning without an icon and a label beside it. */
const STATUS = { good: '#0CA30C', warning: '#FAB219' } as const;

interface StripeStats {
  stripe: {
    activeSubscriptions: number;
    canceledLast30Days: number;
    /** Cancellations inside the same window the 14-day card reports on. */
    canceledLast14Days?: number;
    trialingSubscriptions?: number;
    tierCounts: {
      founder: number;
      apprentice: number;
      electrician: number;
      employer: number;
      unknown: number;
      business_ai?: number;
      business_ai_yearly?: number;
    };
    mrr: number;
    subscriptionsByPrice: Record<string, number>;
  };
  /** Like-for-like starts vs cancellations. Absent until the deployed copy of
   *  admin-stripe-stats includes it; the card degrades rather than guessing. */
  movement?: {
    started14: number;
    started30: number;
    canceled14: number;
    canceled30: number;
    canceledNeverPaid14: number;
    canceledNeverPaid30: number;
    startsLast14: Array<{ created: string; monthlyAmount: number; stillActive: boolean }>;
  };
  supabase: {
    subscribedUsers: number;
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
    // Null, not the string 'N/A' the function used to bake in — which left the
    // UI no way to fall back and printed "N/A" as ten people's names.
    customerEmail: string | null;
    customerName: string | null;
    /** Needed to tell a grandfathered price from one still on sale. */
    priceId: string;
    tier: string;
    priceAmount: number;
    monthlyAmount: number;
    interval: string;
    created: string;
  }>;
  /** Trialing subscriptions, same shape. These are the newest signups — the
   *  "Recent" list was active-only and so ran a week stale. */
  trialingList?: Array<{
    subscriptionId: string;
    customerId: string;
    customerEmail: string | null;
    customerName: string | null;
    tier: string;
    monthlyAmount: number;
    created: string;
    trialEnd: string | null;
  }>;
  generatedAt: string;
}

/** What each tier is called in the product. `business_ai` is sold as "Mate", so
 *  humanising the raw key renders it "Business Ai" to whoever reads the page. */
const tierLabel: Record<string, string> = {
  founder: 'Founder',
  apprentice: 'Apprentice',
  electrician: 'Electrician',
  business_ai: 'Mate',
  employer: 'Employer',
  unknown: 'Unmapped',
};

const tierTone: Record<string, Tone> = {
  founder: 'yellow',
  apprentice: 'cyan',
  electrician: 'blue',
  employer: 'purple',
  business_ai: 'yellow',
};

/** Series colour follows the entity, never its rank — filtering or reordering
 *  the table must never repaint a tier the reader has already learned. */
const tierSeriesColour: Record<string, string> = {
  founder: SERIES[0],
  apprentice: SERIES[1],
  electrician: SERIES[2],
  business_ai: SERIES[3],
  employer: SERIES[4],
  unknown: SERIES[5],
};

function getInitials(name?: string | null, email?: string | null) {
  const src = (name && name.trim()) || email || '?';
  const parts = src.split(/[\s@._-]+/).filter(Boolean);
  return (parts[0]?.[0] ?? '?').toUpperCase() + (parts[1]?.[0] ?? '').toUpperCase();
}

/** "Today" / "3 days ago" / "27 Jul" — a recent list has to show recency. */
function whenLabel(iso: string): string {
  const then = new Date(iso);
  const days = Math.floor((Date.now() - then.getTime()) / 86400000);
  if (days <= 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 14) return `${days} days ago`;
  return format(then, 'd MMM');
}

const money = (n: number, dp = 0) =>
  `£${n.toLocaleString('en-GB', { minimumFractionDigits: dp, maximumFractionDigits: dp })}`;

/* ────────────────────────────────────────────────────────
   Local building blocks

   The page previously stacked seven cards built from the same
   header-plus-rows primitive, so the money, the movement, the composition and
   the health checks all carried identical visual weight and you had to read
   every heading to find anything. These give the sections distinct shapes.
   ──────────────────────────────────────────────────────── */

/** Tab strip used to fold two cards into one — composition can be read by tier
 *  or by price band, people as recent or lifetime, without doubling the page. */
function Segmented<T extends string>({
  options,
  value,
  onChange,
}: {
  options: Array<{ value: T; label: string }>;
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.03] p-1">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          className={cn(
            'h-8 touch-manipulation rounded-full px-3 text-[12px] font-medium transition-colors',
            value === o.value ? 'bg-elec-yellow text-black' : 'text-white hover:bg-white/[0.06]'
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

/**
 * A single proportional bar. Reading composition off a column of numbers means
 * doing the division in your head; the bar does it.
 *
 * Touching segments are separated by a 2px gap painted in the surface colour
 * rather than by a stroke drawn around each fill — a border round a mark adds
 * a second edge colour and thickens the smallest segments out of proportion.
 * Every segment carries its own hover title, so a value is never reachable
 * only by counting pixels; the table underneath repeats all of it.
 */
function StackedBar({
  segments,
  height = 10,
  format,
}: {
  segments: Array<{ key: string; label: string; value: number; fill: string }>;
  height?: number;
  format?: (v: number, pct: number) => string;
}) {
  const total = segments.reduce((t, s) => t + s.value, 0);
  if (total <= 0) return null;
  const shown = segments.filter((s) => s.value > 0);
  return (
    <div
      className="flex w-full rounded-full"
      style={{ height, gap: 2, background: 'transparent' }}
      role="img"
      aria-label={shown
        .map((s) => `${s.label} ${((s.value / total) * 100).toFixed(0)}%`)
        .join(', ')}
    >
      {shown.map((s, i) => {
        const pct = (s.value / total) * 100;
        return (
          <div
            key={s.key}
            title={format ? format(s.value, pct) : `${s.label}: ${pct.toFixed(1)}%`}
            style={{
              width: `calc(${pct}% - ${(2 * (shown.length - 1)) / shown.length}px)`,
              background: s.fill,
              // 4px rounded data-ends on the outer edges only; interior joins
              // stay square so the 2px gap reads as a gap, not as a pill chain.
              borderTopLeftRadius: i === 0 ? 999 : 2,
              borderBottomLeftRadius: i === 0 ? 999 : 2,
              borderTopRightRadius: i === shown.length - 1 ? 999 : 2,
              borderBottomRightRadius: i === shown.length - 1 ? 999 : 2,
            }}
          />
        );
      })}
    </div>
  );
}

/** A horizontal meter. Square at the baseline, 4px rounded at the data end. */
function Meter({ pct, fill }: { pct: number; fill: string }) {
  return (
    <div className="h-1.5 w-full rounded-sm" style={{ background: 'rgba(255,255,255,0.06)' }}>
      <div
        className="h-full"
        style={{
          width: `${Math.max(pct, 1)}%`,
          background: fill,
          borderRadius: '2px 4px 4px 2px',
        }}
      />
    </div>
  );
}

/**
 * Health checks read as pass/fail.
 *
 * A status colour never carries the meaning on its own — a reader who cannot
 * separate the green from the amber would have had nothing else to go on. Each
 * row pairs the colour with an icon AND a word.
 */
function Check({
  ok,
  label,
  detail,
  action,
}: {
  ok: boolean;
  label: string;
  detail: string;
  action?: ReactNode;
}) {
  const Icon = ok ? CheckCircle2 : AlertTriangle;
  return (
    <div className="flex items-start gap-3 py-3.5">
      <Icon
        className="mt-0.5 h-4 w-4 shrink-0"
        style={{ color: ok ? STATUS.good : STATUS.warning }}
        aria-hidden
      />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-2">
          <span className="text-[14px] font-medium text-white">{label}</span>
          <span
            className="text-[11px] font-semibold uppercase tracking-[0.1em]"
            style={{ color: ok ? STATUS.good : STATUS.warning }}
          >
            {ok ? 'Pass' : 'Needs attention'}
          </span>
        </div>
        <div className="mt-0.5 text-[12px] text-white">{detail}</div>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export default function AdminRevenue() {
  const queryClient = useQueryClient();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [composition, setComposition] = useState<'tier' | 'price'>('tier');
  const [people, setPeople] = useState<'recent' | 'lifetime'>('recent');

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

  const { data: rcStats, isLoading: rcLoading } = useQuery<{
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

  // Lifetime buyers — deliberately OUTSIDE MRR since nothing recurs, but
  // banked cash and a loyalty cohort, so it gets a name and a list rather than
  // a count. See useLifetimeBuyers for why the count alone was misleading.
  const { data: lifetime } = useLifetimeBuyers();
  const lifetimeCount = lifetime?.buyers.length ?? 0;

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ['admin-stripe-live-stats'] }),
      queryClient.invalidateQueries({ queryKey: ['admin-revenuecat-stats'] }),
      queryClient.invalidateQueries({ queryKey: ['admin-lifetime-buyers'] }),
    ]);
    setTimeout(() => setIsRefreshing(false), 500);
  }, [queryClient]);

  /*
    Gross new MRR per day.

    This used `stripeStats.subscriptions`, which is the ACTIVE list — so a
    subscription that started inside the window and has since cancelled was
    invisible, and the chart plus its "+11 new" caption undercounted starts by
    16 against a cancellation figure that counted everyone. Starts and
    cancellations are now both gross, over the same window.
  */
  const starts = stripeStats?.movement?.startsLast14 ?? stripeStats?.subscriptions ?? [];
  const dailyRevenue = starts.length
    ? Array.from({ length: 14 }, (_, i) => {
        const date = subDays(new Date(), 13 - i);
        const start = startOfDay(date).getTime();
        const end = start + 24 * 60 * 60 * 1000;
        const daySubs = starts.filter((sub) => {
          const created = new Date(sub.created).getTime();
          return created >= start && created < end;
        });
        return {
          date: format(date, 'dd MMM'),
          short: format(date, 'dd'),
          amount: daySubs.reduce((sum, sub) => sum + sub.monthlyAmount, 0),
          count: daySubs.length,
        };
      })
    : [];

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
  const rcActiveTrials = (
    (rcStats as { trialUsers?: Array<{ is_cancelled?: boolean }> })?.trialUsers || []
  ).filter((t) => !t.is_cancelled).length;
  const appStoreSubs = rcStats?.subscribersBySource?.app_store || 0;
  const playStoreSubs = rcStats?.subscribersBySource?.play_store || 0;
  const stripeSubs = stripeStats?.stripe.activeSubscriptions || 0;
  const totalSubs = stripeSubs + appStoreSubs + playStoreSubs;
  const arpu = totalSubs > 0 ? mrr / totalSubs : 0;

  // Two windows, kept apart. The 14-day card previously displayed a 30-day
  // cancellation count next to a 14-day signup count and a churn rate derived
  // from the 30-day figure, so three numbers sat side by side measuring two
  // different periods.
  const mv = stripeStats?.movement;
  const churned30 = stripeStats?.stripe.canceledLast30Days || 0;
  const churned14 = stripeStats?.stripe.canceledLast14Days;
  const churnRate30 = totalSubs > 0 ? (churned30 / (totalSubs + churned30)) * 100 : 0;
  const churnRate14 =
    churned14 !== undefined && totalSubs > 0 ? (churned14 / (totalSubs + churned14)) * 100 : null;

  const stripeTierCounts = stripeStats?.stripe.tierCounts;
  const rcAppStoreTiers = rcStats?.tiersBySource?.app_store || {};
  const rcPlayStoreTiers = rcStats?.tiersBySource?.play_store || {};

  /*
    Tiers across all three billing rails.

    The old strip counted Stripe only — 62 + 57 + 149 + 1 + 0 = 269 — directly
    beneath a hero reading "348 paying", with no indication that the missing 79
    were the mobile stores. Nothing on the page reconciled, and `play_store`
    tiers were being returned by the RevenueCat function and never read at all.
  */
  const tierRows = (() => {
    const defs: Array<{ key: string; name: string; list: string }> = [
      { key: 'founder', name: 'Founder', list: '£3.99' },
      { key: 'apprentice', name: 'Apprentice', list: '£6.99' },
      { key: 'electrician', name: 'Electrician', list: '£19.99' },
      { key: 'business_ai', name: 'Mate', list: '£39.99' },
      { key: 'employer', name: 'Employer', list: '£49.99' },
      { key: 'unknown', name: 'Unmapped price', list: '—' },
    ];
    const pick = (src: Record<string, number>, key: string) =>
      (src[key] || 0) + (src[`${key}_yearly`] || 0);

    return defs
      .map((d) => {
        const stripe = pick((stripeTierCounts ?? {}) as Record<string, number>, d.key);
        const app = pick(rcAppStoreTiers, d.key);
        const play = pick(rcPlayStoreTiers, d.key);
        // Real Stripe MRR for the tier, so grandfathering is visible. Mobile
        // MRR is not broken out per tier by RevenueCat, so the effective
        // average is computed over the Stripe population only.
        const tierMrr = (stripeStats?.subscriptions ?? [])
          .filter((s) => s.tier === d.key)
          .reduce((t, s) => t + s.monthlyAmount, 0);
        return {
          ...d,
          stripe,
          mobile: app + play,
          total: stripe + app + play,
          mrr: tierMrr,
          effective: stripe > 0 ? tierMrr / stripe : 0,
        };
      })
      .filter((r) => r.total > 0 || r.key !== 'unknown');
  })();

  const tierTotal = tierRows.reduce((t, r) => t + r.total, 0);

  /*
    Price bands, as money rather than head count.

    The old card ranked prices by number of subscribers, which inverts the
    thing you want to know: 62 founders at £3.99 topped the list on £247/mo
    while 44 grandfathered accounts at £12.99 sat third on £571/mo. Ranking by
    contribution puts the legacy bands where they belong, and marking which
    price IDs are still on sale separates grandfathered revenue from what new
    customers pay.
  */
  const currentPriceIds = new Set<string>([
    ...Object.values(stripePrices.monthly),
    ...Object.values(stripePrices.yearly),
  ]);

  const priceBands = (() => {
    const bands = new Map<
      string,
      { label: string; count: number; mrr: number; current: boolean; tier: string }
    >();
    for (const s of stripeStats?.subscriptions ?? []) {
      const key = s.priceId || `${s.priceAmount}/${s.interval}`;
      const existing = bands.get(key);
      if (existing) {
        existing.count += 1;
        existing.mrr += s.monthlyAmount;
      } else {
        bands.set(key, {
          label: `£${s.priceAmount.toFixed(2)}/${s.interval === 'year' ? 'yr' : 'mo'}`,
          count: 1,
          mrr: s.monthlyAmount,
          current: s.priceId ? currentPriceIds.has(s.priceId) : false,
          tier: s.tier,
        });
      }
    }
    return [...bands.values()].sort((a, b) => b.mrr - a.mrr);
  })();

  const legacyMrr = priceBands.filter((b) => !b.current).reduce((t, b) => t + b.mrr, 0);
  const legacySubs = priceBands.filter((b) => !b.current).reduce((t, b) => t + b.count, 0);
  const maxBandMrr = Math.max(...priceBands.map((b) => b.mrr), 1);

  const unmappedSubs = tierRows.find((r) => r.key === 'unknown')?.total ?? 0;
  const unfulfilledLifetime = lifetime?.needsAttention.length ?? 0;
  const syncGap =
    (stripeStats?.discrepancies.inStripeNotSupabase || 0) +
    (stripeStats?.discrepancies.inSupabaseNotStripe || 0);

  /*
    Newest signups, trials included.

    This listed active subscriptions only, so on 9 August its top row was 2
    August — a week stale — while nine people had started in between and were
    all still inside their trial. A list headed "Recent" that cannot show the
    last seven days of signups is answering a different question from the one
    it appears to answer.

    Trials are marked, never counted: they are excluded from MRR, from the 348,
    and from every tier figure on this page. They belong here because the
    question is "who just signed up", not "who is paying".

    Mobile is still absent and cannot honestly be added — only 13 of the 82
    store subscribers carry a subscription_start date, so sorting them in would
    mean ranking most of them by profile signup date and presenting that as a
    subscribe date.
  */
  const recentSubs = [
    ...(stripeStats?.subscriptions || []).map((s) => ({ ...s, trialing: false as const })),
    ...(stripeStats?.trialingList || []).map((s) => ({ ...s, trialing: true as const })),
  ]
    .sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime())
    .slice(0, 9);

  return (
    <PullToRefresh onRefresh={handleRefresh}>
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
          <>
            {/*
              The money.

              A hero built from four equal cells gave ARR, head count, ARPU and
              a lifetime figure the same weight as each other, and a legend
              underneath mixed "£2446.77" with "71" and "8" so the stores looked
              like they contributed £79 of the MRR. Here the recurring total
              leads, the split beneath it is a proportional bar in one unit, and
              the banked lifetime cash is set apart because it does not recur.
            */}
            <section className="relative overflow-hidden rounded-none border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:rounded-2xl sm:border-x sm:p-6 -mx-4 sm:mx-0">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/70 via-elec-yellow/20 to-transparent" />

              <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-10">
                <div className="min-w-0">
                  <div className="flex items-center gap-2.5">
                    <PulseDot tone="green" />
                    <Eyebrow>Live MRR</Eyebrow>
                  </div>
                  <div className="mt-4 text-[38px] font-semibold leading-none tracking-tight text-white sm:text-[52px]">
                    <AnimatedCounter value={mrr} prefix="£" decimals={2} />
                  </div>
                  <div className="mt-2 text-[13px] text-white">
                    {rcLoading
                      ? 'Stripe only — mobile revenue still loading'
                      : stripeStats
                        ? `Stripe + RevenueCat · Updated ${new Date(stripeStats.generatedAt).toLocaleTimeString()}`
                        : 'Monthly recurring revenue'}
                  </div>

                  <div className="mt-5">
                    <StackedBar
                      segments={[
                        {
                          key: 'stripe',
                          label: 'Stripe',
                          value: stripeMrr,
                          fill: SERIES[0],
                        },
                        { key: 'mobile', label: 'Mobile', value: rcMrr, fill: SERIES[1] },
                      ]}
                      format={(v, pct) => `${money(v, 2)} · ${pct.toFixed(0)}% of MRR`}
                    />
                    <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                      <div className="flex items-baseline gap-2">
                        <span
                          className="inline-block h-2 w-2 shrink-0 translate-y-[-1px] rounded-full"
                          style={{ background: SERIES[0] }}
                        />
                        <span className="text-[13px] font-medium text-white tabular-nums">
                          {money(stripeMrr, 2)}
                        </span>
                        <span className="text-[12px] text-white">Stripe · {stripeSubs} subs</span>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span
                          className="inline-block h-2 w-2 shrink-0 translate-y-[-1px] rounded-full"
                          style={{ background: SERIES[1] }}
                        />
                        <span className="text-[13px] font-medium text-white tabular-nums">
                          {rcLoading ? '…' : money(rcMrr, 2)}
                        </span>
                        <span className="text-[12px] text-white">
                          {rcLoading
                            ? 'Mobile · loading'
                            : `Mobile · ${appStoreSubs + playStoreSubs} subs`}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-px self-start overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08]">
                  {[
                    { label: 'ARR', value: money(arr) },
                    { label: 'Paying', value: totalSubs.toLocaleString('en-GB') },
                    { label: 'Avg ARPU', value: money(arpu, 2) },
                    {
                      label: 'Lifetime banked',
                      value: money(lifetime?.banked ?? 0),
                      sub: `${lifetimeCount} buyers · not recurring`,
                      tone: 'emerald' as const,
                    },
                  ].map((c) => (
                    <div key={c.label} className="bg-[hsl(0_0%_9%)] px-4 py-5">
                      <div
                        className={cn(
                          'text-[22px] font-semibold leading-none sm:text-[26px]',
                          'text-white'
                        )}
                      >
                        {c.value}
                      </div>
                      <div className="mt-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
                        {c.label}
                      </div>
                      {c.sub && <div className="mt-1 text-[11px] text-white">{c.sub}</div>}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/*
              Movement.

              Fourteen flex children with an inline `height:` percentage is not
              a chart — no axis, no values, nothing on hover, and a bar for a
              day with £0 was indistinguishable from a missing day. Recharts is
              already the house chart library on AdminAnalytics, so this uses
              the same tokens rather than inventing a second look.
            */}
            <ListCard>
              <ListCardHeader
                tone="yellow"
                title="New MRR, last 14 days"
                meta={<Pill tone="emerald">+{money(totalLast14Days)}</Pill>}
              />
              <div className="p-4 sm:p-5">
                <div className="h-48 w-full sm:h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={dailyRevenue}
                      margin={{ top: 8, right: 4, left: 4, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="mrrFill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={CHART_STROKE} stopOpacity={0.35} />
                          <stop offset="100%" stopColor={CHART_STROKE} stopOpacity={0.02} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid stroke={CHART_GRID} vertical={false} />
                      <XAxis
                        dataKey="short"
                        tick={{ fill: CHART_AXIS, fontSize: 11 }}
                        tickLine={false}
                        axisLine={false}
                        interval="preserveStartEnd"
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
                        formatter={(v: number, _n, p) => [
                          `${money(v, 2)} · ${p?.payload?.count ?? 0} new`,
                          'New MRR',
                        ]}
                        labelFormatter={(_l, p) => p?.[0]?.payload?.date ?? ''}
                      />
                      <Area
                        type="monotone"
                        dataKey="amount"
                        stroke={CHART_STROKE}
                        strokeWidth={2}
                        fill="url(#mrrFill)"
                        activeDot={{ r: 4, fill: CHART_STROKE }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/*
                  Starts against cancellations, counted the same way.

                  This card used to read "+11 new · 34 lost", which looked like a
                  collapse. The 11 counted only the subscriptions that started in
                  the window AND survive today, so 16 that started and left were
                  dropped from one side of a comparison that counted every leaver
                  on the other. Gross starts are 27 and the net is -7. Over 30
                  days it is +10, which is growth.

                  Cancellations are split by whether the customer ever billed:
                  half of the 14-day figure ended on or before a trial end date,
                  and a trial that did not convert is not paying-customer churn.
                */}
                {mv ? (
                  <div className="mt-5 overflow-hidden rounded-xl border border-white/[0.06]">
                    <div
                      className="grid items-center gap-3 px-4 py-2.5 text-[10px] uppercase tracking-[0.14em] text-white"
                      style={{ gridTemplateColumns: 'minmax(0,1fr) 4.5rem 5rem 4.5rem' }}
                    >
                      <span>Stripe only</span>
                      <span className="text-right">Started</span>
                      <span className="text-right">Cancelled</span>
                      <span className="text-right">Net</span>
                    </div>
                    {[
                      {
                        window: 'Last 14 days',
                        started: mv.started14,
                        cancelled: mv.canceled14,
                        neverPaid: mv.canceledNeverPaid14,
                      },
                      {
                        window: 'Last 30 days',
                        started: mv.started30,
                        cancelled: mv.canceled30,
                        neverPaid: mv.canceledNeverPaid30,
                      },
                    ].map((r) => {
                      const net = r.started - r.cancelled;
                      return (
                        <div
                          key={r.window}
                          className="grid items-center gap-3 border-t border-white/[0.06] px-4 py-3"
                          style={{ gridTemplateColumns: 'minmax(0,1fr) 4.5rem 5rem 4.5rem' }}
                        >
                          <div className="min-w-0">
                            <div className="text-[13px] text-white">{r.window}</div>
                            <div className="text-[11px] text-white">
                              {r.neverPaid} ended in trial, never paid
                            </div>
                          </div>
                          <span className="text-right text-[14px] tabular-nums text-white">
                            {r.started}
                          </span>
                          <span className="text-right text-[14px] tabular-nums text-white">
                            {r.cancelled}
                          </span>
                          <span
                            className="text-right text-[15px] font-semibold tabular-nums"
                            style={{ color: net >= 0 ? STATUS.good : STATUS.warning }}
                          >
                            {net >= 0 ? `+${net}` : net}
                          </span>
                        </div>
                      );
                    })}
                    <div className="border-t border-white/[0.06] px-4 py-3 text-[12px] text-white">
                      Paying churn, excluding trials that never converted:{' '}
                      {mv.canceled30 - mv.canceledNeverPaid30} in 30 days against {stripeSubs}{' '}
                      Stripe subscribers. App Store and Play Store movement is not included —
                      RevenueCat does not report it per window.
                    </div>
                  </div>
                ) : null}
              </div>
            </ListCard>

            {/*
              Equal-height columns.

              SplitLayout wraps each side in its own stack, so the shorter card
              stopped where its content stopped and left a void beside the taller
              one. An explicit grid with stretched items and h-full cards makes
              the two end on the same line — the spare room goes inside the
              shorter card rather than becoming dead page.
            */}
            <div className="grid grid-cols-1 items-stretch gap-6 sm:gap-8 lg:grid-cols-[3fr_2fr]">
              <div className="flex min-w-0 flex-col">
                <>
                  {/* Composition — one card with two readings, instead of a
                      tier card and a price card that never referenced each
                      other. */}
                  <ListCard className="flex h-full flex-col">
                    <ListCardHeader
                      tone="blue"
                      title="Composition"
                      meta={
                        <Segmented<'tier' | 'price'>
                          value={composition}
                          onChange={setComposition}
                          options={[
                            { value: 'tier', label: 'By tier' },
                            { value: 'price', label: 'By price' },
                          ]}
                        />
                      }
                    />

                    {composition === 'tier' ? (
                      <div className="px-4 pb-4 sm:px-5 sm:pb-5">
                        <StackedBar
                          segments={tierRows.map((r) => ({
                            key: r.key,
                            label: r.name,
                            value: r.total,
                            fill: tierSeriesColour[r.key] ?? SERIES[0],
                          }))}
                          format={(v, pct) =>
                            `${v} subscriber${v === 1 ? '' : 's'} · ${pct.toFixed(0)}%`
                          }
                        />
                        <div className="mt-2 text-[12px] text-white">
                          {tierTotal.toLocaleString('en-GB')} paying subscribers
                        </div>

                        <div
                          className="mt-4 grid items-center gap-x-3 pb-2 text-[10px] uppercase tracking-[0.14em] text-white"
                          style={{ gridTemplateColumns: 'minmax(0,1fr) 3.5rem 3.5rem 3.5rem' }}
                        >
                          <span>Tier</span>
                          <span className="text-right">Stripe</span>
                          <span className="text-right">Mobile</span>
                          <span className="text-right">Total</span>
                        </div>
                        <div className="divide-y divide-white/[0.06] border-t border-white/[0.06]">
                          {tierRows.map((r) => (
                            <div
                              key={r.key}
                              className="grid items-center gap-x-3 py-3"
                              style={{ gridTemplateColumns: 'minmax(0,1fr) 3.5rem 3.5rem 3.5rem' }}
                            >
                              <div className="flex min-w-0 items-center gap-2.5">
                                <span
                                  className="h-2 w-2 shrink-0 rounded-full"
                                  style={{ background: tierSeriesColour[r.key] ?? SERIES[0] }}
                                />
                                <div className="min-w-0">
                                  <div className="truncate text-[14px] font-medium text-white">
                                    {r.name}
                                  </div>
                                  {/* What the tier actually earns, not its list
                                      price. 149 Electricians are not 149 ×
                                      £19.99 — only 27 are on that price. */}
                                  <div className="text-[11px] text-white">
                                    {r.stripe > 0
                                      ? `${money(r.mrr)}/mo · avg ${money(r.effective, 2)} of ${r.list}`
                                      : r.list}
                                  </div>
                                </div>
                              </div>
                              <span className="text-right text-[14px] tabular-nums text-white">
                                {r.stripe || '—'}
                              </span>
                              <span className="text-right text-[14px] tabular-nums text-white">
                                {r.mobile || '—'}
                              </span>
                              <span
                                className={cn(
                                  'text-right text-[15px] font-semibold tabular-nums text-white'
                                )}
                              >
                                {r.total}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="px-4 pb-4 sm:px-5 sm:pb-5">
                        <div className="mb-4 rounded-xl border border-amber-500/20 bg-amber-500/5 px-4 py-3 text-[12px] text-white">
                          <span className="font-semibold text-amber-400">
                            {legacySubs} of {stripeSubs}
                          </span>{' '}
                          Stripe subscribers are on a price no longer sold, worth{' '}
                          <span className="font-semibold text-amber-400">
                            {money(legacyMrr)}/mo
                          </span>{' '}
                          — {stripeMrr > 0 ? ((legacyMrr / stripeMrr) * 100).toFixed(0) : 0}% of
                          Stripe revenue.
                        </div>
                        <div className="space-y-3.5">
                          {priceBands.map((b, i) => (
                            <div key={`${b.label}-${i}`} className="min-w-0">
                              <div className="mb-1.5 flex items-center justify-between gap-3">
                                <div className="flex min-w-0 items-center gap-2">
                                  <span className="text-[13px] font-medium text-white">
                                    {b.label}
                                  </span>
                                  {b.current ? (
                                    <Pill tone="emerald">On sale</Pill>
                                  ) : (
                                    <Pill tone="amber">Legacy</Pill>
                                  )}
                                  <span className="truncate text-[11px] text-white">
                                    {tierLabel[b.tier] ?? b.tier}
                                  </span>
                                </div>
                                <div className="shrink-0 text-right">
                                  <div className="text-[13px] font-semibold tabular-nums text-white">
                                    {money(b.mrr)}/mo
                                  </div>
                                  <div className="text-[11px] tabular-nums text-white">
                                    {b.count} sub{b.count === 1 ? '' : 's'}
                                  </div>
                                </div>
                              </div>
                              {/* Bar is share of revenue, not of head count —
                                  the prices that carry the money are not the
                                  most populous ones. */}
                              <Meter
                                pct={(b.mrr / maxBandMrr) * 100}
                                fill={b.current ? SERIES[0] : SERIES[1]}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </ListCard>
                </>
              </div>
              <div className="flex min-w-0 flex-col">
                <>
                  {/* People — recent subscribers and lifetime buyers are both
                      "who is paying", so they share a card. */}
                  <ListCard className="flex h-full flex-col">
                    <ListCardHeader
                      tone="emerald"
                      title="People"
                      meta={
                        <Segmented<'recent' | 'lifetime'>
                          value={people}
                          onChange={setPeople}
                          options={[
                            { value: 'recent', label: 'Recent' },
                            { value: 'lifetime', label: `Lifetime ${lifetimeCount}` },
                          ]}
                        />
                      }
                    />
                    {people === 'recent' ? (
                      <ListBody>
                        {recentSubs.map((sub) => {
                          const tierKey = (sub.tier || 'unknown').toLowerCase();
                          return (
                            <ListRow
                              key={sub.subscriptionId}
                              lead={
                                <Avatar
                                  initials={getInitials(sub.customerName, sub.customerEmail)}
                                />
                              }
                              title={sub.customerName || sub.customerEmail || 'Unknown'}
                              /* The date is the point of a "recent" list. Without
                                 it there was nothing on screen to show the top
                                 row was a week old. */
                              subtitle={[
                                whenLabel(sub.created),
                                sub.customerName ? sub.customerEmail : null,
                              ]
                                .filter(Boolean)
                                .join(' · ')}
                              trailing={
                                <>
                                  {sub.trialing && <Pill tone="orange">Trial</Pill>}
                                  <Pill tone={tierTone[tierKey] ?? 'yellow'}>
                                    {tierLabel[tierKey] ?? tierKey}
                                  </Pill>
                                  <span
                                    className={cn(
                                      'text-[11px] tabular-nums',
                                      sub.trialing ? 'text-white/50' : 'text-white'
                                    )}
                                  >
                                    {money(sub.monthlyAmount, 2)}
                                  </span>
                                </>
                              }
                            />
                          );
                        })}
                      </ListBody>
                    ) : null}
                    {people === 'recent' && (
                      <div className="border-t border-white/[0.06] px-4 py-3 sm:px-5">
                        <div className="text-[12px] text-white">
                          The {recentSubs.length} newest Stripe signups, trials included.{' '}
                          {recentSubs.filter((r) => r.trialing).length} of them are still in trial
                          and are not counted in the {totalSubs} paying or in MRR. App Store and
                          Play Store signups are not listed — only 13 of 82 carry a subscription
                          date.
                        </div>
                      </div>
                    )}
                    {people === 'lifetime' && (
                      <>
                        <ListBody>
                          {lifetime?.buyers.map((b) => (
                            <ListRow
                              key={b.user_id ?? b.email ?? b.recorded_at}
                              lead={<Avatar initials={getInitials(b.full_name, b.email)} />}
                              title={b.full_name || b.email || 'Unknown buyer'}
                              subtitle={b.full_name ? (b.email ?? undefined) : undefined}
                              trailing={
                                <>
                                  {!b.fulfilled && <Pill tone="orange">No access</Pill>}
                                  {/* An amount parsed out of a grant reason is
                                      not the same fact as a charge Stripe
                                      recorded, so it does not look like one. */}
                                  {!b.amount_is_exact && <Pill tone="purple">Est.</Pill>}
                                  <span className="text-[13px] font-semibold tabular-nums text-white">
                                    {money(b.amount_pence / 100, 2)}
                                  </span>
                                </>
                              }
                            />
                          ))}
                        </ListBody>
                        <div className="border-t border-white/[0.06] px-4 py-3 sm:px-5">
                          <div className="text-[12px] text-white">
                            {money(lifetime?.banked ?? 0, 2)} banked · {lifetime?.exactCount ?? 0}{' '}
                            of {lifetimeCount} confirmed against a checkout record (
                            {money(lifetime?.bankedExact ?? 0, 2)}). The rest were granted by hand
                            before purchases were logged, so their amounts are read off the grant
                            reason.
                          </div>
                        </div>
                      </>
                    )}
                  </ListCard>
                </>
              </div>
            </div>

            {/*
              The two small cards get their own row rather than being stacked
              under People.

              With Composition alone on the left and People + Mobile + Checks
              on the right, the left column ran out roughly nine hundred pixels
              before the right one did and the page carried a dead void down its
              whole left side. Two short cards side by side end together, and the
              tall pair above them only differ by the length of one list.
            */}
            <div className="grid grid-cols-1 items-stretch gap-6 sm:gap-8 lg:grid-cols-2">
              {/* Mobile detail stays its own card — it is the one place the
                        store side is broken out. */}
              {(rcMrr > 0 || Object.keys(rcAppStoreTiers).length > 0 || rcActiveTrials > 0) && (
                <ListCard className="flex h-full flex-col">
                  <ListCardHeader
                    tone="blue"
                    title="Mobile app"
                    meta={rcMrr > 0 ? <Pill tone="blue">{money(rcMrr, 2)} MRR</Pill> : undefined}
                  />
                  <ListBody>
                    {(
                      [
                        { key: 'apprentice', name: 'Apprentice', price: '£6.99/mo' },
                        { key: 'electrician', name: 'Electrician', price: '£19.99/mo' },
                        { key: 'business_ai', name: 'Mate', price: '£39.99/mo' },
                        { key: 'employer', name: 'Employer', price: '£49.99/mo' },
                      ] as const
                    ).map((t) => {
                      const count =
                        (rcAppStoreTiers[t.key] || 0) +
                        (rcAppStoreTiers[`${t.key}_yearly`] || 0) +
                        (rcPlayStoreTiers[t.key] || 0) +
                        (rcPlayStoreTiers[`${t.key}_yearly`] || 0);
                      return (
                        <ListRow
                          key={t.key}
                          accent={tierTone[t.key] ?? 'blue'}
                          title={t.name}
                          subtitle={
                            count > 0
                              ? `${count} subscriber${count === 1 ? '' : 's'} · ${t.price}`
                              : `No subscribers yet · ${t.price}`
                          }
                          trailing={
                            <span
                              className={cn('text-[15px] font-semibold tabular-nums text-white')}
                            >
                              {count}
                            </span>
                          }
                        />
                      );
                    })}
                    {rcActiveTrials > 0 && (
                      <ListRow
                        accent="orange"
                        title="Active trials"
                        subtitle="Free trial period"
                        trailing={<Pill tone="orange">{rcActiveTrials} trialing</Pill>}
                      />
                    )}
                  </ListBody>
                </ListCard>
              )}

              {/*
                      Checks.

                      This was a "Data Sync" card holding two numbers and an amber
                      box. The things that can quietly go wrong on this page are
                      not only sync: an unmapped price silently parks paying
                      subscribers in a tier that does not exist, and a lifetime
                      buyer whose grant never landed has paid for nothing. All of
                      it reads as pass or fail.
                    */}
              <ListCard className="flex h-full flex-col">
                <ListCardHeader
                  tone={syncGap + unmappedSubs + unfulfilledLifetime > 0 ? 'amber' : 'emerald'}
                  title="Checks"
                  action="Refresh"
                  onAction={handleRefresh}
                />
                <div className="divide-y divide-white/[0.06] px-4 pb-2 sm:px-5">
                  <Check
                    ok={syncGap === 0}
                    label="Stripe and Supabase agree"
                    detail={
                      syncGap === 0
                        ? `${stripeSubs} active in Stripe, ${stripeStats?.supabase.subscribedUsers ?? 0} marked subscribed here.`
                        : `${stripeStats?.discrepancies.inStripeNotSupabase ?? 0} in Stripe not synced here · ${stripeStats?.discrepancies.inSupabaseNotStripe ?? 0} marked subscribed with no live Stripe subscription. Store-billed subscribers are excluded.`
                    }
                  />
                  <Check
                    ok={unmappedSubs === 0}
                    label="Every price maps to a tier"
                    detail={
                      unmappedSubs === 0
                        ? 'All active prices resolve to a known tier.'
                        : `${unmappedSubs} subscriber${unmappedSubs === 1 ? '' : 's'} on a product ID missing from the tier map — their tier is unknown and their revenue is unattributed.`
                    }
                  />
                  <Check
                    ok={unfulfilledLifetime === 0}
                    label="Lifetime buyers have access"
                    detail={
                      unfulfilledLifetime === 0
                        ? `All ${lifetimeCount} lifetime buyers granted, ${money(lifetime?.banked ?? 0)} banked.`
                        : `${unfulfilledLifetime} paid without the grant landing.`
                    }
                  />
                </div>
              </ListCard>
            </div>
          </>
        )}
      </PageFrame>
    </PullToRefresh>
  );
}
