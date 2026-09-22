/**
 * Revenue.
 *
 * The money, then everything that moves it: what people are actually paying,
 * what the win-back programme is earning, what the discounts cost, what is
 * failing right now, what renews next, and why people leave.
 *
 * Rebuilt on the overview dialect — Panel / KpiTile / Sparkline / recharts — so
 * it reads as the same product as the admin dashboard and the Trials page. What
 * it replaced was on the older editorial dialect and answered only "how much":
 * MRR, ARR, paying, ARPU, one yellow area chart with no axes, and a
 * subscriptions-by-price map keyed on "£9.99/month" that silently merged the
 * legacy Electrician price with the win-back price — collapsing exactly the
 * distinction this page exists to draw.
 *
 * Everything here is live on every load. Only the trial-conversion figures go
 * through a cache, and they live on the Trials page, not this one.
 */

import { Link } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { RefreshCw, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useState, useCallback, useMemo, type ReactNode } from 'react';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { cn } from '@/lib/utils';
import PullToRefresh from '@/components/admin/PullToRefresh';
import { PageFrame, IconButton, Divider } from '@/components/admin/editorial';
import {
  ACCENT,
  AQUA,
  BLUE,
  Delta,
  Fig,
  GOOD,
  Hairline,
  KpiTile,
  Panel,
  RoundAvatar,
  SectionHead,
  Segmented,
  SERIOUS,
  Sparkline,
  StackBar,
  gbp,
} from '@/components/admin/overview/primitives';
import {
  MrrChart,
  daysInRange,
  type MrrPoint,
  type Range,
} from '@/components/admin/overview/MrrHero';
import {
  DailyCashChart,
  NewMrrChart,
  PriceLadderChart,
  RenewalMonthsChart,
  WinbackWeeklyChart,
  PRICE_KIND_COLOURS,
  PRICE_KIND_LABELS,
} from '@/components/admin/revenue/RevenueCharts';
import {
  useAdminStripeStats,
  type PriceLadderRow,
  type OfferRow,
  OFFER_SCHEME_LABELS,
  ADMIN_STRIPE_STATS_QUERY_KEY,
} from '@/hooks/useAdminStripeStats';
import { useAdminOverviewSeries } from '@/hooks/useAdminOverviewSeries';
import {
  paceOver,
  paceWindow,
  paceShape,
  marginalArpu,
  flowOver,
  steadyState,
  requirementFor,
  forecastMilestone,
  nextMilestone,
  MRR_MILESTONES,
  horizonLabel,
} from '@/lib/mrrForecast';
import { useLifetimeBuyers } from '@/hooks/useLifetimeBuyers';
import { useRevenueOps, recoveryRate, CHURN_REASON_LABELS } from '@/hooks/useRevenueOps';
import { useStorePriceMix, STORE_PRODUCTS, storeLabel } from '@/hooks/useStorePriceMix';
import { useCollegeScheme } from '@/hooks/useCollegeScheme';

/** "50% off", "£3 off", written the way the offer was sold. */
const offerValue = (o: OfferRow): string => {
  const amount = o.percentOff
    ? `${o.percentOff}% off`
    : o.amountOff
      ? `${gbp(o.amountOff, 2)} off`
      : '—';
  const term =
    o.duration === 'forever'
      ? 'forever'
      : o.duration === 'once'
        ? 'first payment'
        : o.durationMonths
          ? `${o.durationMonths} months`
          : (o.duration ?? '');
  return term ? `${amount} · ${term}` : amount;
};

const tierLabel = (t: string) =>
  t === 'business_ai' ? 'Mate' : t.charAt(0).toUpperCase() + t.slice(1);

/**
 * One person and one number.
 *
 * The discounts, failing-payment, coupon-holder and lifetime lists were four
 * separate stacks of bare email addresses, which read as log output rather than
 * as people. An initial gives each row an anchor for the eye to land on and
 * makes a long list scannable instead of uniform.
 */
function PersonLine({
  name,
  sub,
  value,
  note,
}: {
  name: string;
  sub?: ReactNode;
  value: ReactNode;
  note?: ReactNode;
}) {
  // Letters only: splitting "kane_845" on separators produced "K8", which
  // reads as a code rather than a person.
  const initials = name
    .replace(/@.*$/, '')
    .split(/[\s._-]+/)
    .filter((w) => /^[a-z]/i.test(w))
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');
  return (
    <div className="flex items-center gap-3 border-t border-white/[0.08] py-2.5">
      <RoundAvatar initials={initials || '?'} />
      <div className="min-w-0 flex-1">
        <div className="truncate text-[13px] font-medium leading-[18px] text-white">{name}</div>
        {sub && <div className="mt-0.5 truncate text-[12px] leading-4 text-white">{sub}</div>}
      </div>
      <div className="shrink-0 text-right">
        <div className="text-[13px] font-semibold tabular-nums text-white">{value}</div>
        {note && <div className="text-[11px] tabular-nums text-white">{note}</div>}
      </div>
    </div>
  );
}

/**
 * One integrity check: does this hold, and what does it mean if not.
 *
 * These three were on the previous revenue page and were lost in the rewrite.
 * The middle one — every price resolving to a tier — is what guards the price
 * ladder: an unmapped price ID lands in "unknown", so its revenue is real but
 * attributed to nothing, and the ladder quietly stops adding up.
 */
function Check({ ok, label, detail }: { ok: boolean; label: string; detail: string }) {
  return (
    <div className="flex items-start gap-3 border-t border-white/[0.08] py-3">
      {ok ? (
        <CheckCircle2 className="mt-px h-4 w-4 shrink-0" style={{ color: GOOD }} />
      ) : (
        <AlertTriangle className="mt-px h-4 w-4 shrink-0" style={{ color: SERIOUS }} />
      )}
      <div className="min-w-0 flex-1">
        <div className="text-[13px] font-medium leading-[18px] text-white">{label}</div>
        <div className="mt-0.5 text-[12px] leading-[17px] text-white">{detail}</div>
      </div>
    </div>
  );
}

/** A labelled proportion bar, used for the churn-reason and skip-reason lists. */
function ReasonBar({
  label,
  n,
  total,
  colour,
}: {
  label: string;
  n: number;
  total: number;
  colour: string;
}) {
  const pct = total > 0 ? (n / total) * 100 : 0;
  return (
    <div className="flex items-center gap-3">
      <span className="w-[11rem] shrink-0 truncate text-[13px] text-white">{label}</span>
      <span
        className="h-1.5 min-w-[2px] rounded-sm"
        style={{ width: `${Math.max(pct, 1)}%`, background: colour }}
      />
      <span className="shrink-0 text-[12px] tabular-nums text-white">
        {pct.toFixed(0)}%<span className="text-white/60"> · {n}</span>
      </span>
    </div>
  );
}

/**
 * One price, as a row rather than a bar.
 *
 * The horizontal chart works on a desktop and fails on a phone: thirteen
 * two-line category labels ate roughly 40% of a 390px screen, squeezed every
 * bar into the remainder, and left the only readable numbers on an axis three
 * hundred pixels below the top row. A row per price carries the exact figures
 * where the eye already is, and the bar becomes a proportion cue underneath it
 * rather than the only encoding.
 */
function PriceRow({ row, max }: { row: PriceLadderRow; max: number }) {
  const pct = max > 0 ? (row.mrr / max) * 100 : 0;
  return (
    <div className="border-t border-white/[0.08] py-2.5">
      <div className="flex items-baseline gap-2">
        <span
          className="mt-1 h-2 w-2 shrink-0 self-start rounded-[2px]"
          style={{ background: PRICE_KIND_COLOURS[row.kind] }}
        />
        <span className="min-w-0 flex-1 truncate text-[13px] font-medium text-white">
          £{row.unitAmount}
          {row.interval === 'year' ? '/yr' : '/mo'} · {tierLabel(row.tier)}
        </span>
        <span className="shrink-0 text-[13px] font-semibold tabular-nums text-white">
          {gbp(row.mrr)}
        </span>
      </div>
      <div className="mt-1 flex items-baseline gap-2 pl-4">
        <span className="min-w-0 flex-1 truncate text-[12px] text-white">
          {row.count} subscriber{row.count === 1 ? '' : 's'} · {PRICE_KIND_LABELS[row.kind]}
        </span>
        {row.belowCurrent > 0 && (
          <span className="shrink-0 text-[11px] tabular-nums text-white/60">
            −{gbp(row.belowCurrent)}/mo
          </span>
        )}
      </div>
      <div className="mt-1.5 ml-4 h-1 rounded-sm bg-white/[0.06]">
        <div
          className="h-1 rounded-sm"
          style={{ width: `${Math.max(pct, 1)}%`, background: PRICE_KIND_COLOURS[row.kind] }}
        />
      </div>
    </div>
  );
}

export default function AdminRevenue() {
  const queryClient = useQueryClient();
  const [range, setRange] = useState<Range>('ytd');

  const {
    data: stripeStats,
    isLoading: stripeLoading,
    isFetching: stripeFetching,
  } = useAdminStripeStats();
  const { data: series } = useAdminOverviewSeries();
  const { data: lifetime } = useLifetimeBuyers();
  const { data: ops } = useRevenueOps();
  const { data: storeMix } = useStorePriceMix();
  const { data: collegeScheme } = useCollegeScheme();

  const { data: rcStats, isLoading: rcLoading } = useQuery<{
    revenuecat: { mrr: number; revenue: number; activeSubscriptions: number; activeTrials: number };
    subscribersBySource?: Record<string, number>;
    /** All-time store revenue from RevenueCat's revenue chart. */
    gross?: {
      allTime: number;
      monthly: Array<{ month: string; amount: number }>;
      daily: Array<{ day: string; amount: number }>;
      measure: string | null;
    } | null;
  }>({
    queryKey: ['admin-revenuecat-stats'],
    staleTime: 60_000,
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

  const refresh = useCallback(async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ADMIN_STRIPE_STATS_QUERY_KEY }),
      queryClient.invalidateQueries({ queryKey: ['admin-revenuecat-stats'] }),
      queryClient.invalidateQueries({ queryKey: ['admin-revenue-ops'] }),
      queryClient.invalidateQueries({ queryKey: ['admin-lifetime-buyers'] }),
    ]);
  }, [queryClient]);

  const stripeMrr = stripeStats?.stripe?.mrr ?? 0;
  /*
    `stripe.mrr` is gross of coupons. The net figure is reported beside it rather
    than replacing it: which one is "MRR" is a business definition, not a
    rendering choice, and this one is quoted outside admin.
  */
  const netMrr =
    stripeStats?.stripe?.mrrNetOfDiscounts != null
      ? stripeStats.stripe.mrrNetOfDiscounts + (rcStats?.revenuecat?.mrr ?? 0)
      : null;
  const rcMrr = rcStats?.revenuecat?.mrr ?? 0;
  const rcLoaded = !rcLoading && !!rcStats;
  const mrr = stripeMrr + rcMrr;
  const stripeSubs = stripeStats?.stripe?.activeSubscriptions ?? 0;
  const storeSubs = rcStats?.revenuecat?.activeSubscriptions ?? 0;
  const paying = stripeSubs + storeSubs;

  /* MRR history, same construction as the overview so the two cannot disagree. */
  const mrrPoints = useMemo<MrrPoint[]>(() => {
    const rows = series?.metric_daily ?? [];
    let lastStripe: number | null = null;
    let lastRc: number | null = null;
    const pts: MrrPoint[] = [];
    for (const r of rows) {
      if (r.stripe_mrr != null) lastStripe = Number(r.stripe_mrr);
      if (r.rc_mrr != null) lastRc = Number(r.rc_mrr);
      // Stripe is where the business starts; nothing before its first reading.
      if (lastStripe == null) continue;
      /*
        Requiring BOTH rails threw away every day before RevenueCat began
        reporting on 4 June 2026, so the chart silently started in June no
        matter how much history the table held.

        `?? 0` is a guard, not a reconstruction: rc_mrr is now populated for
        every day, backfilled from RevenueCat's own daily MRR chart (which
        matches our recorded figures exactly across the seven overlapping days
        from 4 June). Store revenue really was £0 until 4 April 2026. If a rail
        ever goes missing again this draws a zero rather than a gap, so a new
        hole in the data will show up as a visible cliff — which is what you
        want to see, rather than months quietly vanishing off the left.
      */
      const rc = lastRc ?? 0;
      pts.push({ day: r.day, stripe: lastStripe, rc, total: lastStripe + rc });
    }
    if (pts.length && stripeStats && rcLoaded) {
      const last = pts[pts.length - 1];
      pts[pts.length - 1] = {
        day: series?.today_date ?? last.day,
        stripe: stripeMrr,
        rc: rcMrr,
        total: mrr,
      };
    }
    return pts;
  }, [series, stripeStats, rcLoaded, stripeMrr, rcMrr, mrr]);

  /*
    The road to the next milestone, off the same daily snapshots as the chart.

    Two straight lines, not a compound curve — see `mrrForecast` for why a 22%
    monthly rate extrapolated seven months is a wish rather than a forecast.
    The gap between the two dates is the honest uncertainty and is shown.
  */
  // Shared with the Dashboard so both charts mark the SAME target.
  const MILESTONES = MRR_MILESTONES;
  const pace30 = useMemo(() => paceOver(mrrPoints, 30), [mrrPoints]);
  const pace90 = useMemo(() => paceOver(mrrPoints, 90), [mrrPoints]);
  const blendedArpu = paying > 0 ? mrr / paying : null;

  /*
    Net subscribers added over the same 30 days, so "how many more" can be
    priced off what NEW people actually pay rather than the all-time average.
  */
  const payingRows = series?.metric_daily ?? [];
  const paying30Ago = payingRows.length > 30
    ? (Number(payingRows[payingRows.length - 31]?.stripe_paying) || 0) +
      (Number(payingRows[payingRows.length - 31]?.rc_paying) || 0)
    : null;
  const subsAdded30 = paying30Ago != null ? paying - paying30Ago : 0;
  const { value: arpuNow, basis: arpuBasis } = marginalArpu(
    pace30?.added ?? 0,
    subsAdded30,
    blendedArpu
  );

  /*
    Gross in, gross out, and the ceiling they imply.

    `admin_metric_daily` carries a per-day count of paid churns on each rail,
    so the leak is measured rather than modelled. The ceiling that falls out of
    it is the most important number on this panel: linear projection assumes a
    fixed number of leavers a month when it is really a fixed percentage, so
    growth flattens where intake meets leak.
  */
  const churned30 = useMemo(
    () =>
      (series?.metric_daily ?? [])
        .slice(-30)
        .reduce(
          (t, r) => t + (Number(r.stripe_churned_paid) || 0) + (Number(r.rc_churned_paid) || 0),
          0
        ),
    [series]
  );
  const flow30 = useMemo(
    () => flowOver(subsAdded30, churned30, paying30Ago, 30),
    [subsAdded30, churned30, paying30Ago]
  );
  const ceiling = useMemo(
    () => steadyState(flow30.grossNew, flow30.monthlyChurnPct, arpuNow),
    [flow30, arpuNow]
  );

  /* Is the rate itself moving, and why do the two lines disagree? */
  const pacePrev30 = useMemo(() => paceWindow(mrrPoints, 30, 30), [mrrPoints]);
  const paceEarlier30 = useMemo(() => paceWindow(mrrPoints, 30, 60), [mrrPoints]);
  const shape = useMemo(
    () => paceShape(pace30, pacePrev30, paceEarlier30),
    [pace30, pacePrev30, paceEarlier30]
  );

  const milestones = useMemo(
    () => forecastMilestone(mrr, MILESTONES, [pace30, pace90], arpuNow),
    // MILESTONES is a module-level constant in spirit; listing it would churn.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [mrr, pace30, pace90, arpuNow]
  );
  const nextGoal = nextMilestone(milestones);

  /* What each goal needs, rather than whether it is "possible". */
  const requirements = useMemo(() => {
    const m = new Map<number, ReturnType<typeof requirementFor>>();
    MILESTONES.forEach((t) =>
      m.set(t, requirementFor(t, arpuNow, flow30.monthlyChurnPct, flow30.grossNew))
    );
    return m;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arpuNow, flow30]);

  /*
    Trials in flight are the only part of the gap already in the building.

    Deliberately NOT multiplied by a conversion rate. The page has no live
    conversion figure, and inventing one would put a modelled number next to
    measured ones with nothing to mark the difference — the exact habit that
    produced "64% never come back" and "usually responds within an hour".
    Counts against counts is a statement that cannot be wrong, and right now it
    happens to be the sharper one anyway: there are as many trials running as
    the milestone needs subscribers.
  */
  const trialsInFlight =
    (stripeStats?.stripe?.trialingSubscriptions ?? 0) + (rcStats?.revenuecat?.activeTrials ?? 0);

  // 'all' is every day we hold rather than a fixed count, so it has to be
  // resolved against the data before any comparison — see Range in MrrHero.
  const rangeDays = daysInRange(range, mrrPoints.map((p) => p.day));
  const rangeLabel =
    range === 'all' ? 'all time' : range === 'ytd' ? 'this year' : `${range} days`;
  const mrrThen =
    mrrPoints.length > rangeDays ? mrrPoints[mrrPoints.length - 1 - rangeDays].total : null;
  const mrrDelta = mrrThen != null ? mrr - mrrThen : null;
  /*
    A percentage needs a baseline worth dividing by.

    Over 'Year' and 'All' the window opens on the very start of the business —
    £5.99 of MRR, which was Andrew's own test subscription — and the honest
    arithmetic then reads "+78382% in this year". True, and useless. Below
    £100 of starting MRR the absolute change is the only figure that means
    anything, so the percentage is dropped and the copy falls back to it.
  */
  const PCT_MIN_BASELINE = 100;
  const mrrDeltaPct =
    mrrThen && mrrThen >= PCT_MIN_BASELINE
      ? Math.round(((mrrDelta as number) / mrrThen) * 100)
      : null;
  const payingSeries = useMemo(
    () =>
      (series?.metric_daily ?? [])
        .slice(-30)
        .map((r) => (Number(r.stripe_paying) || 0) + (Number(r.rc_paying) || 0)),
    [series]
  );

  // Memoised so the `?? []` fallback does not hand useMemo a new array each render.
  const ladder = useMemo(() => stripeStats?.priceLadder ?? [], [stripeStats]);
  const discounts = stripeStats?.discounts;
  const renewals = stripeStats?.renewals;
  const atRisk = stripeStats?.atRisk;
  const offers = stripeStats?.offers;
  const movement = stripeStats?.movement;
  const gross = stripeStats?.gross;
  const rcGross = rcStats?.gross ?? null;
  // Both rails, all time. Only summed when BOTH are present — a total that
  // silently omits the stores would read as the whole business.
  const grossTotal =
    gross && rcGross ? Math.round((gross.allTime + rcGross.allTime) * 100) / 100 : null;

  /*
    Daily average across both rails.

    Averaged over the calendar days in the window rather than the days that
    happen to have a row: a day nobody paid is a real zero and dividing it out
    would flatter the figure.
  */
  const dailyAverage = useMemo(() => {
    if (!gross?.daily?.length) return null;
    const cutoff = new Date(Date.now() - 30 * 86400 * 1000).toISOString().slice(0, 10);
    const sum = (rows: Array<{ day: string; amount: number }> | undefined) =>
      (rows ?? []).filter((d) => d.day >= cutoff).reduce((t, d) => t + d.amount, 0);
    return (sum(gross.daily) + sum(rcGross?.daily)) / 30;
  }, [gross, rcGross]);
  // Win-back reaches people two ways — a dedicated price, or a coupon on a
  // standard price. Reporting only the prices understated it.
  const winbackOffer = offers?.schemes.find((x) => x.scheme === 'winback');

  /*
    Who currently holds each coupon.

    `offers` says how many times a coupon was redeemed; `discounts.rows` says
    who is on one right now and what it costs. Joining them on the coupon id is
    the difference between "20 redemptions" and a list of names you can act on.
  */
  const holdersByCoupon = useMemo(() => {
    const m = new Map<string, typeof discounts.rows>();
    (discounts?.rows ?? []).forEach((d) => {
      if (!d.couponId) return;
      const list = m.get(d.couponId);
      if (list) list.push(d);
      else m.set(d.couponId, [d]);
    });
    return m;
  }, [discounts]);

  /*
    What grandfathered pricing costs, and what the win-back deliberately gives
    away. Kept apart on purpose: one is a decision nobody has revisited, the
    other is a decision that is working.
  */
  const ladderSummary = useMemo(() => {
    const by = (k: PriceLadderRow['kind']) => ladder.filter((r) => r.kind === k);
    const sum = (rows: PriceLadderRow[], f: (r: PriceLadderRow) => number) =>
      rows.reduce((t, r) => t + f(r), 0);
    const legacy = by('legacy');
    const winback = by('winback');
    return {
      current: by('current'),
      legacy,
      winback,
      founder: by('founder'),
      currentCount: sum(by('current'), (r) => r.count),
      legacyCount: sum(legacy, (r) => r.count),
      legacyGap: sum(legacy, (r) => r.belowCurrent),
      winbackCount: sum(winback, (r) => r.count),
      founderCount: sum(by('founder'), (r) => r.count),
      winbackMrr: sum(winback, (r) => r.mrr),
      total: sum(ladder, (r) => r.count),
    };
  }, [ladder]);

  /*
    The store ladder, and a check on the prices behind it.

    Neither store returns the price a given subscriber pays, so STORE_PRODUCTS is
    a lookup. Summing it against RevenueCat's own MRR turns that lookup into
    something falsifiable: if a price is wrong or stale the two diverge visibly
    instead of the page quietly misreporting.
  */
  const storeLadder = useMemo(() => {
    const rows = (storeMix?.rows ?? []).map((r) => {
      const meta = STORE_PRODUCTS[r.product_id];
      return {
        ...r,
        label: meta?.label ?? r.product_id,
        tier: meta?.tier ?? 'unknown',
        monthly: meta?.monthly ?? null,
        interval: meta?.interval ?? null,
        promo: !!meta?.promo,
        mrr: meta ? meta.monthly * r.subscribers : null,
        known: !!meta,
      };
    });
    const impliedMrr = rows.reduce((t, r) => t + (r.mrr ?? 0), 0);
    return {
      rows: rows.sort((a, b) => (b.mrr ?? 0) - (a.mrr ?? 0)),
      impliedMrr: Math.round(impliedMrr * 100) / 100,
      max: Math.max(...rows.map((r) => r.mrr ?? 0), 1),
      unknown: rows.filter((r) => !r.known).length,
    };
  }, [storeMix]);

  /*
    The college scheme, per college.

    Catalogue (name, price, tier) from promo_offers; take-up from Stripe, joined
    on the code — see the note in useCollegeScheme for why the DB's own
    `redemptions` column cannot be used. Revenue is redemptions x the coupon
    price, which is the real £3.50 / £9.99 rather than list.
  */
  const schemeRollup = useMemo(() => {
    const redeemedByCode = new Map((offers?.collegeCodes ?? []).map((c) => [c.code, c]));
    const build = (want: 'college' | 'employer') => {
      const byCollege = new Map<
        string,
        {
          college: string;
          apprentice?: { code: string; redeemed: number; active: boolean; price: number };
          electrician?: { code: string; redeemed: number; active: boolean; price: number };
          redeemed: number;
          mrr: number;
        }
      >();
      for (const c of (collegeScheme?.codes ?? []).filter((x) => x.scheme === want)) {
        const live = redeemedByCode.get(c.code);
        const entry = byCollege.get(c.org) ?? { college: c.org, redeemed: 0, mrr: 0 };
        const slot = {
          code: c.code,
          redeemed: live?.redeemed ?? 0,
          active: live?.active ?? c.is_active,
          price: Number(c.price),
        };
        if (c.tier === 'electrician') entry.electrician = slot;
        else entry.apprentice = slot;
        entry.redeemed += slot.redeemed;
        entry.mrr += slot.redeemed * slot.price;
        byCollege.set(c.org, entry);
      }
      const rows = [...byCollege.values()].sort(
        (a, b) => b.redeemed - a.redeemed || a.college.localeCompare(b.college)
      );
      return {
        rows,
        taken: rows.filter((r) => r.redeemed > 0),
        notUsed: rows.filter((r) => r.redeemed === 0),
        colleges: rows.length,
        codes: (collegeScheme?.codes ?? []).filter((x) => x.scheme === want).length,
        redeemed: rows.reduce((t, r) => t + r.redeemed, 0),
        mrr: Math.round(rows.reduce((t, r) => t + r.mrr, 0) * 100) / 100,
        apprenticePrice: collegeScheme?.apprentice_price ?? 3.5,
        electricianPrice: collegeScheme?.electrician_price ?? 9.99,
      };
    };
    return { college: build('college'), employer: build('employer') };
  }, [collegeScheme, offers]);

  const college = schemeRollup.college;
  const employer = schemeRollup.employer;

  /*
    Four things that must hold for the rest of the page to be trustworthy.
    `unknown` tier means a price ID is missing from PRICE_TIER_MAP in the edge
    function, which is exactly the failure the ladder cannot show on its own.
  */
  const checks = useMemo(() => {
    const syncGap =
      (stripeStats?.discrepancies?.inStripeNotSupabase ?? 0) +
      (stripeStats?.discrepancies?.inSupabaseNotStripe ?? 0);
    const unmapped = ladder.filter((r) => r.tier === 'unknown').reduce((t, r) => t + r.count, 0);
    const unfulfilledLifetime = lifetime?.needsAttention.length ?? 0;
    const storeCoverage = storeMix ? storeMix.store_paying - storeMix.covered : 0;
    const failing = [syncGap, unmapped, unfulfilledLifetime, storeCoverage].filter(
      (n) => n > 0
    ).length;
    return { syncGap, unmapped, unfulfilledLifetime, storeCoverage, failing, allOk: failing === 0 };
  }, [stripeStats, ladder, lifetime, storeMix]);

  const churnByReason = useMemo(() => {
    const m = new Map<string, number>();
    (ops?.churn_reasons ?? []).forEach((r) => m.set(r.reason, (m.get(r.reason) ?? 0) + r.n));
    const rows = [...m.entries()].map(([reason, n]) => ({ reason, n })).sort((a, b) => b.n - a.n);
    return { rows, total: rows.reduce((t, r) => t + r.n, 0) };
  }, [ops]);

  const wb = ops?.winback;
  const wbRate = recoveryRate(wb?.outcome ?? null);

  const isRefreshing = stripeFetching;

  return (
    <PullToRefresh onRefresh={refresh}>
      <PageFrame className="space-y-5 sm:space-y-6">
        {/* Title row */}
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h1 className="text-[22px] font-semibold leading-7 tracking-[-0.02em] text-white lg:text-[26px] lg:leading-[30px]">
              Revenue
            </h1>
            <div className="mt-0.5 flex items-center gap-2 text-[12px] text-white">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: GOOD }} />
              {/* The full rail list wrapped to three lines beside the range
                  control on a phone and squashed the title next to it. */}
              <span className="hidden sm:inline">Live from Stripe, App Store and Play Store</span>
              <span className="sm:hidden">Live · all rails</span>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2.5">
            <Segmented<Range>
              options={[
                { key: 7, label: '7d' },
                { key: 30, label: '30d' },
                { key: 90, label: '90d' },
                { key: 'ytd', label: 'Year' },
                { key: 'all', label: 'All' },
              ]}
              value={range}
              onChange={setRange}
            />
            <IconButton onClick={refresh} disabled={isRefreshing} aria-label="Refresh">
              <RefreshCw className={cn('h-4 w-4', isRefreshing && 'animate-spin')} />
            </IconButton>
          </div>
        </div>

        {/* The money */}
        <Panel tone="accent">
          <div className="grid gap-5 lg:grid-cols-[340px_minmax(0,1fr)] lg:gap-x-10">
            <div className="flex min-w-0 flex-col gap-2 text-white">
              <div className="text-[13px] font-medium leading-4">Monthly recurring revenue</div>
              <div className="text-[44px] font-semibold leading-[46px] tracking-[-0.03em] lg:text-[56px] lg:leading-[56px]">
                {stripeLoading ? <span className="opacity-40">£—</span> : gbp(mrr)}
              </div>
              {netMrr != null && netMrr < mrr && (
                <div className="text-[13px] leading-[18px] text-white">
                  {gbp(netMrr)} after coupons — the {gbp(mrr - netMrr)} difference is the discounts
                  below.
                </div>
              )}
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[13px]">
                {mrrDelta != null ? (
                  <>
                    <Delta
                      dir={mrrDelta > 0 ? 'up' : mrrDelta < 0 ? 'down' : 'flat'}
                      tone={mrrDelta > 0 ? 'good' : mrrDelta < 0 ? 'bad' : 'neutral'}
                      size={13}
                    >
                      {gbp(Math.abs(mrrDelta))}
                    </Delta>
                    <span>
                      {mrrDeltaPct != null &&
                        `${mrrDeltaPct > 0 ? '+' : ''}${mrrDeltaPct}% in ${rangeLabel} · `}
                      {gbp((mrr * 12) / 1000, 1)}k a year
                    </span>
                  </>
                ) : (
                  <span>{gbp((mrr * 12) / 1000, 1)}k a year</span>
                )}
              </div>

              <div className="mt-2">
                <StackBar
                  segments={[
                    { value: stripeMrr, color: BLUE, label: 'Stripe' },
                    { value: rcMrr, color: AQUA, label: 'App Store & Play Store' },
                  ]}
                  height={8}
                />
                <div className="mt-2.5 flex flex-col gap-1.5 whitespace-nowrap text-[12px] sm:flex-row sm:gap-5">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-[2px]" style={{ background: BLUE }} />
                    Stripe <b className="font-semibold tabular-nums">{gbp(stripeMrr)}</b> ·{' '}
                    {stripeSubs} subs
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-[2px]" style={{ background: AQUA }} />
                    Stores{' '}
                    {rcLoaded ? (
                      <>
                        <b className="font-semibold tabular-nums">{gbp(rcMrr)}</b> · {storeSubs}{' '}
                        subs
                      </>
                    ) : (
                      'loading'
                    )}
                  </span>
                </div>
              </div>

              {lifetime && lifetime.banked > 0 && (
                <div className="mt-4 border-t border-white/[0.1] pt-3 text-[12px] leading-[17px] text-white">
                  <b className="font-semibold">{gbp(lifetime.banked)}</b> banked from{' '}
                  {lifetime.buyers.length} lifetime buyers — one-off cash, deliberately not in the
                  MRR above.
                  {lifetime.needsAttention.length > 0 && (
                    <>
                      {' '}
                      <span style={{ color: SERIOUS }}>
                        {lifetime.needsAttention.length} paid with nothing delivered.
                      </span>
                    </>
                  )}
                </div>
              )}
            </div>

            <div className="flex min-w-0 flex-col">
              <div className="-mx-2 lg:mx-0">
                {/* `compact` on desktop too: it drops MrrChart's "30 days ago"
                    reference label, which is clipped at this width and is in any
                    case redundant beside the delta printed under the figure. */}
                <div className="hidden lg:block">
                  <MrrChart
                    points={mrrPoints}
                    range={range}
                    height={260}
                    compact
                    goal={nextGoal?.target ?? null}
                  />
                </div>
                <div className="lg:hidden">
                  <MrrChart points={mrrPoints} range={range} height={190} compact goal={nextGoal?.target ?? null} />
                </div>
              </div>
            </div>
          </div>
        </Panel>

        {/*
          Road to the next milestone.

          Live off the same daily MRR snapshots the chart is drawn from, so the
          date and the line can never disagree.
        */}
        {/*
          Nothing until the money is real.

          `mrr` is 0 while Stripe and RevenueCat are in flight, and this panel
          happily forecast off it — every load flashed "Road to £5,000 · 6
          months · £0.00 now · 0% of the way" before snapping to the truth. A
          forecast that is briefly, confidently wrong is worse than one that
          arrives a second later, so it waits for both sources like the MRR
          line above it does.
        */}
        {nextGoal && pace30 && stripeStats && rcLoaded && mrr > 0 && (
          <Panel tone="accent">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-10">
              <div className="min-w-0">
                <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
                  Road to {gbp(nextGoal.target)}
                </div>
                <div className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="text-[44px] font-semibold leading-[46px] tracking-[-0.03em] text-white lg:text-[56px] lg:leading-[56px]">
                    {horizonLabel(nextGoal.soonestDays)}
                  </span>
                  {nextGoal.soonest && (
                    <span className="text-[13px] font-semibold" style={{ color: ACCENT }}>
                      {nextGoal.soonest.toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  )}
                </div>
                <div className="mt-2 text-[13px] leading-[18px] text-white">
                  {gbp(nextGoal.toGo, 2)} to go
                  {nextGoal.subscribersNeeded != null && arpuNow ? (
                    <>
                      {' '}
                      — about{' '}
                      <span className="font-semibold">
                        {nextGoal.subscribersNeeded} more paying subscribers
                      </span>{' '}
                      at {gbp(arpuNow, 2)}
                      {arpuBasis === 'marginal'
                        ? ' — what the last 30 days actually joined at'
                        : ' average'}
                      .
                      {arpuBasis === 'marginal' && blendedArpu
                        ? ` (The all-time average is ${gbp(blendedArpu, 2)}.)`
                        : ''}
                    </>
                  ) : (
                    '.'
                  )}
                </div>

                {/* What is already in the pipe. */}
                {trialsInFlight > 0 && nextGoal.subscribersNeeded != null && (
                  <div className="mt-3 text-[13px] leading-[18px] text-white">
                    <span className="font-semibold">{trialsInFlight} trials</span> are running
                    right now — {' '}
                    {trialsInFlight >= nextGoal.subscribersNeeded
                      ? 'more than the milestone needs, if they convert.'
                      : `enough for ${Math.round((trialsInFlight / nextGoal.subscribersNeeded) * 100)}% of it, if they all convert.`}
                  </div>
                )}

                {/*
                  🔴 Gross in, gross out, and where it stops.

                  The headline rate is NET. It is the same +78 whether you won
                  80 and lost 2 or won 128 and lost 50, and it was the second.
                */}
                {flow30.monthlyChurnPct != null && flow30.grossNew > 0 && (
                  <div className="mt-4 rounded-xl border border-white/[0.1] bg-white/[0.035] px-4 py-3">
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 text-[13px] text-white">
                      <span>
                        <span className="font-semibold" style={{ color: GOOD }}>
                          +{flow30.grossNew}
                        </span>{' '}
                        joined
                      </span>
                      <span>
                        <span className="font-semibold" style={{ color: SERIOUS }}>
                          −{flow30.churned}
                        </span>{' '}
                        left
                      </span>
                      <span className="text-white/70">
                        = {flow30.net > 0 ? '+' : ''}
                        {flow30.net} net in 30 days
                      </span>
                      <span className="text-white/70">
                        {flow30.monthlyChurnPct.toFixed(1)}% monthly churn
                      </span>
                    </div>
                    {ceiling && (
                      <div className="mt-2 text-[12px] leading-[17px] text-white">
                        Keep both dials exactly where they are and you level off around{' '}
                        <span className="font-semibold">
                          {Math.round(ceiling.subscribers).toLocaleString('en-GB')} subscribers,{' '}
                          {gbp(ceiling.mrr)} a month
                        </span>{' '}
                        — where the leak matches the intake. That is a description of today&rsquo;s
                        settings, not a limit: every goal below shows the intake or the churn rate
                        that clears it. Anything marked{' '}
                        <span className="font-semibold">right on the line</span> is one you are
                        already running at — it needs holding, not changing.
                      </div>
                    )}
                  </div>
                )}

                {/* Progress from where this milestone's run began. */}
                <div className="mt-4">
                  <div className="h-2 w-full overflow-hidden rounded-full bg-white/[0.08]">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${Math.min(100, Math.max(2, (mrr / nextGoal.target) * 100))}%`,
                        background: ACCENT,
                      }}
                    />
                  </div>
                  <div className="mt-1.5 flex justify-between text-[11px] text-white">
                    <span>{gbp(mrr, 2)} now</span>
                    <span>{Math.round((mrr / nextGoal.target) * 100)}% of the way</span>
                  </div>
                </div>

                {/*
                  The basis, stated. A date with no visible arithmetic behind it
                  is just a number someone made up.
                */}
                <div className="mt-4 text-[11.5px] leading-[16px] text-white/70">
                  Straight lines from the daily MRR snapshots, not compounding.
                  {pace30 && (
                    <>
                      {' '}
                      Last {pace30.window} days: {gbp(pace30.added, 2)} added,{' '}
                      {gbp(pace30.perDay, 2)}/day.
                    </>
                  )}
                  {pace90 && pace90.window > pace30.window && (
                    <>
                      {' '}
                      Last {pace90.window}: {gbp(pace90.perDay, 2)}/day.
                    </>
                  )}
                  {nextGoal.latest &&
                    nextGoal.soonest &&
                    nextGoal.latest.getTime() - nextGoal.soonest.getTime() > 86_400_000 && (
                      <>
                        {' '}
                        On the slower of the two it is{' '}
                        {nextGoal.latest.toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                        .
                      </>
                    )}
                  {/*
                    Why the two lines disagree matters more than the midpoint.
                    A step up that has since held flat makes the 90-day line
                    slow for a reason that no longer applies to the business.
                  */}
                  {shape.shape === 'stepped' && pacePrev30 && paceEarlier30 && (
                    <>
                      {' '}
                      The rate stepped up around two months ago —{' '}
                      {gbp(paceEarlier30.perDay, 2)} → {gbp(pacePrev30.perDay, 2)} →{' '}
                      {gbp(pace30.perDay, 2)} a day — and has held since, so the 90-day
                      line is slow only because it still includes the quiet period.
                    </>
                  )}
                  {shape.shape === 'slowing' && shape.changePct != null && (
                    <>
                      {' '}
                      <span style={{ color: SERIOUS }}>
                        The rate is {Math.abs(Math.round(shape.changePct))}% down on the
                        previous 30 days
                      </span>{' '}
                      — these dates assume it stops falling.
                    </>
                  )}
                  {shape.shape === 'accelerating' && shape.changePct != null && (
                    <>
                      {' '}
                      The rate is {Math.round(shape.changePct)}% up on the previous 30 days,
                      so even the faster line may be conservative.
                    </>
                  )}
                  {/*
                    A second, independent route to the same answer. If counting
                    subscribers and counting pounds disagree, one of them is
                    wrong and you should not trust either.
                  */}
                  {subsAdded30 > 0 && nextGoal.subscribersNeeded != null && (
                    <>
                      {' '}
                      Cross-check: {subsAdded30} net subscribers joined in the last 30 days
                      and {nextGoal.subscribersNeeded} are needed — about{' '}
                      {Math.ceil((nextGoal.subscribersNeeded / subsAdded30) * 30)} days at
                      that rate.
                    </>
                  )}
                </div>
              </div>

              {/* Every milestone, so the far ones are visible too. */}
              <div className="self-start">
                {milestones.map((m) => (
                  <div
                    key={m.target}
                    className="flex items-baseline gap-3 border-b border-white/[0.06] py-2.5 last:border-b-0"
                  >
                    <span
                      className={cn(
                        'w-[68px] shrink-0 text-[14px] font-semibold tabular-nums',
                        m.reached ? 'text-white/45' : 'text-white'
                      )}
                    >
                      {gbp(m.target)}
                    </span>
                    {m.reached ? (
                      <span className="text-[12px]" style={{ color: GOOD }}>
                        reached
                      </span>
                    ) : (
                      <>
                        <span className="min-w-0 flex-1 truncate text-[12px] text-white">
                          {m.subscribersNeeded != null ? (
                            <>
                              +{m.subscribersNeeded.toLocaleString('en-GB')}
                              {/* The word does not fit beside a date at 390px. */}
                              <span className="hidden sm:inline"> subscribers</span>
                            </>
                          ) : (
                            '—'
                          )}
                        </span>
                        {/*
                          Far milestones showed ONLY the optimistic date.
                          £50,000 read "May 2031" as though that were a
                          forecast, when the slower line put it years later —
                          a single date on a five-year extrapolation is the
                          false precision this panel exists to avoid. Once the
                          two lines are more than a year apart, show the span
                          and stop pretending.
                        */}
                        {/*
                          What the goal NEEDS, not whether it is allowed.

                          This used to print "past the ceiling" in red for
                          anything above the steady state. That reads as a
                          permanent verdict when the ceiling only describes
                          today's two dial settings, and it turned a page used
                          for setting targets into one that tells you your
                          targets are out of reach. A goal is never impossible;
                          it needs a number. Show the number.
                        */}
                        {(() => {
                          const req = requirements.get(m.target);
                          const onTrack = !req || req.withinCurrentSettings;
                          return (
                            <span
                              className="shrink-0 text-right text-[12px] font-medium tabular-nums"
                              style={{ color: onTrack ? 'rgba(255,255,255,0.7)' : ACCENT }}
                            >
                              {onTrack
                                ? m.soonest
                                  ? m.latest &&
                                    m.latest.getTime() - m.soonest.getTime() > 365 * 86_400_000
                                    ? `${m.soonest.getFullYear()}–${m.latest.getFullYear()}`
                                    : m.soonest.toLocaleDateString('en-GB', {
                                        month: 'short',
                                        year: 'numeric',
                                      })
                                  : '—'
                                : req.intakeMultiple != null && req.intakeMultiple < 1.1
                                  ? 'right on the line'
                                  : `${Math.round(req.intakePerMonth)}/mo in${
                                      req.churnPct ? ` · or ${req.churnPct.toFixed(1)}% churn` : ''
                                    }`}
                            </span>
                          );
                        })()}
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Panel>
        )}

        {/* Six figures */}
        <Panel padded={false} className="px-4 sm:px-5 lg:px-6">
          <div className="grid grid-cols-2 gap-x-4 lg:grid-cols-6 lg:gap-x-5 [&>*:nth-child(-n+4)]:border-b [&>*:nth-child(-n+4)]:border-white/[0.08] [&>*:nth-child(odd)]:border-r [&>*:nth-child(odd)]:border-white/[0.08] lg:[&>*:last-child]:border-r-0 lg:[&>*]:border-b-0 lg:[&>*]:border-r lg:[&>*]:border-white/[0.08]">
            <KpiTile
              label="Paying"
              value={stripeLoading ? '—' : paying}
              definition="Stripe + stores"
              viz={<Sparkline series={payingSeries} accent={BLUE} />}
            />
            <KpiTile
              label="Annual run rate"
              value={stripeLoading ? '—' : gbp((mrr * 12) / 1000, 1) + 'k'}
              definition="MRR × 12"
            />
            <KpiTile
              label="Average per user"
              value={paying > 0 ? gbp(mrr / paying, 2) : '—'}
              definition="MRR ÷ paying"
            />
            <KpiTile
              label="On a current price"
              value={
                ladderSummary.total > 0
                  ? `${Math.round((ladderSummary.currentCount / ladderSummary.total) * 100)}%`
                  : '—'
              }
              definition={`${ladderSummary.currentCount} of ${ladderSummary.total} Stripe subs`}
            />
            <KpiTile
              label="Payment failing"
              value={atRisk ? atRisk.count : '—'}
              definition={atRisk ? `${gbp(atRisk.mrr)}/mo recoverable` : 'past due or unpaid'}
              delta={
                atRisk && atRisk.count > 0 ? (
                  <Delta dir="down" tone="bad">
                    chase today
                  </Delta>
                ) : undefined
              }
            />
            <KpiTile
              label="Given away"
              value={discounts ? `${gbp(discounts.forgoneMrr)}` : '—'}
              definition={discounts ? `${discounts.count} on a discount, monthly` : 'coupons'}
            />
          </div>
        </Panel>

        <Divider label="Pricing" />

        {/* Who is on what price */}
        <Panel>
          <SectionHead
            title="Who's on what price"
            meta={`${ladder.length} prices in use across ${ladderSummary.total} Stripe subscriptions`}
          />

          {/*
            The mix in one bar, before any of the detail.

            Thirteen rows answer "what is each price doing"; almost nobody opens
            this page for that. The question is "how much of the book is on what
            we actually charge", and that is one proportion — so it gets said
            once, large, before the breakdown that justifies it.
          */}
          {ladderSummary.total > 0 && (
            <div className="mt-4">
              <StackBar
                segments={[
                  {
                    value: ladderSummary.currentCount,
                    color: PRICE_KIND_COLOURS.current,
                    label: 'Current price',
                  },
                  {
                    value: ladderSummary.legacyCount,
                    color: PRICE_KIND_COLOURS.legacy,
                    label: 'Legacy',
                  },
                  {
                    value: ladderSummary.winbackCount,
                    color: PRICE_KIND_COLOURS.winback,
                    label: 'Win-back',
                  },
                  {
                    value: ladderSummary.founderCount,
                    color: PRICE_KIND_COLOURS.founder,
                    label: 'Founder',
                  },
                ]}
                height={10}
              />
              <div className="mt-2.5 flex flex-wrap gap-x-5 gap-y-1.5">
                {(
                  [
                    ['current', ladderSummary.currentCount],
                    ['legacy', ladderSummary.legacyCount],
                    ['winback', ladderSummary.winbackCount],
                    ['founder', ladderSummary.founderCount],
                  ] as const
                ).map(([k, n]) => (
                  <span
                    key={k}
                    className="inline-flex items-center gap-1.5 whitespace-nowrap text-[12px] text-white"
                  >
                    <span
                      className="h-2 w-2 shrink-0 rounded-[2px]"
                      style={{ background: PRICE_KIND_COLOURS[k] }}
                    />
                    {PRICE_KIND_LABELS[k]} <b className="font-semibold tabular-nums">{n}</b>
                  </span>
                ))}
              </div>
            </div>
          )}

          <Divider label="Every price" className="mt-5" />

          <div className="mt-3 hidden lg:block">
            <PriceLadderChart rows={ladder} />
          </div>
          <div className="mt-1 lg:hidden">
            {ladder.map((r) => (
              <PriceRow key={r.priceId} row={r} max={ladder[0]?.mrr ?? 0} />
            ))}
          </div>

          <Hairline className="my-4" />
          <div className="grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-4">
            <Fig
              value={ladderSummary.currentCount}
              label="On today's price"
              sub={`of ${ladderSummary.total}`}
            />
            <Fig value={ladderSummary.legacyCount} label="On a legacy price" sub="never migrated" />
            <Fig
              value={gbp(ladderSummary.legacyGap)}
              label="Monthly shortfall"
              sub="vs today's list"
            />
            <Fig
              value={gbp(ladderSummary.winbackMrr)}
              label="From win-back prices"
              sub={`${ladderSummary.winbackCount} subscribers`}
            />
          </div>
          <p className="m-0 mt-3 max-w-[85ch] text-[12px] leading-[17px] text-white">
            The shortfall is what grandfathered subscribers would add if they paid today's list
            price for their tier. It is not money you are losing — it is the price of the promise
            you made them — but nothing on this page reported it before. Founder pricing is excluded
            from the shortfall on purpose: that one was a commitment, not an oversight.
          </p>
        </Panel>

        {/* Win-back */}
        <Panel>
          <SectionHead
            title="Win-back"
            meta={
              wb?.queue ? `${wb.queue.emails_sent} emails to ${wb.queue.people} people` : 'loading'
            }
          />
          {wb?.outcome && wb.queue ? (
            <>
              <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-4">
                <Fig
                  value={wb.queue.sent_30d}
                  label="Sent in 30 days"
                  sub={`${wb.queue.pending} still queued`}
                />
                <Fig
                  value={wb.outcome.recovered_after}
                  label="Came back after"
                  sub="an email went out"
                />
                <Fig
                  value={wbRate != null ? `${wbRate.toFixed(1)}%` : '—'}
                  label="Recovery rate"
                  sub={`of ${wb.outcome.recipients} emailed`}
                />
                <Fig
                  value={gbp(ladderSummary.winbackMrr)}
                  label="On win-back prices"
                  sub={
                    winbackOffer
                      ? `+ ${winbackOffer.redeemed} on a win-back coupon`
                      : 'recurring, today'
                  }
                />
              </div>

              <div className="mt-4">
                <WinbackWeeklyChart weekly={wb.weekly} />
              </div>

              <p className="m-0 mt-3 max-w-[85ch] text-[12px] leading-[17px] text-white">
                Two different claims, kept apart.{' '}
                <b className="font-semibold">{wb.outcome.now_subscribed}</b> of the people emailed
                are subscribed today, but only{' '}
                <b className="font-semibold">{wb.outcome.recovered_after}</b> started their
                subscription <em>after</em> the first email — the rest were already back, or their
                timing cannot be established. The{' '}
                <b className="font-semibold">{gbp(ladderSummary.winbackMrr)}</b> sitting on win-back
                prices is the only figure here that is provably attributable.
                {winbackOffer && (
                  <>
                    {' '}
                    It also understates the programme: win-back reaches people two ways, a dedicated
                    price or a coupon on a standard price. Those coupons have been redeemed{' '}
                    <b className="font-semibold">{winbackOffer.redeemed}</b> times, with{' '}
                    <b className="font-semibold">{winbackOffer.activeSubs}</b> still active at{' '}
                    {gbp(winbackOffer.activeForgoneMrr)}/mo off list — every discounted subscription
                    on the book today is a win-back.
                  </>
                )}
              </p>

              {wb.outcome.already_back_before > 0 && (
                <div
                  className="mt-3 flex items-start gap-2 rounded-xl px-4 py-3 text-[12px] leading-[17px] text-white"
                  style={{
                    border: '1px solid rgba(236,131,90,0.25)',
                    background: 'rgba(236,131,90,0.08)',
                  }}
                >
                  <AlertTriangle className="mt-px h-4 w-4 shrink-0" style={{ color: SERIOUS }} />
                  <span>
                    <b className="font-semibold">
                      {wb.outcome.already_back_before} people were emailed after they had already
                      resubscribed.
                    </b>{' '}
                    The queue checks for an active subscription when it sends, so these slipped
                    through — worth a look at the guard in <code>winback-send</code>.
                  </span>
                </div>
              )}

              {wb.skips.length > 0 && (
                <>
                  <Hairline className="my-4" />
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="m-0 text-[14px] font-semibold leading-5 text-white">
                      Held back on purpose
                    </h3>
                    <span className="text-[12px] text-white">{wb.queue.skipped} skipped</span>
                  </div>
                  <div className="mt-2.5 space-y-2">
                    {wb.skips.map((s) => (
                      <ReasonBar
                        key={s.reason}
                        label={s.reason}
                        n={s.n}
                        total={wb.queue!.skipped}
                        colour={PRICE_KIND_COLOURS.legacy}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="py-6 text-[13px] text-white">Reading the win-back queue…</div>
          )}
        </Panel>

        {/* What store subscribers are on */}
        <Panel>
          <SectionHead
            title="Store prices"
            meta={
              storeMix
                ? `${storeMix.covered} of ${storeMix.store_paying} store subscribers matched to a product`
                : undefined
            }
          />
          {!storeMix || storeLadder.rows.length === 0 ? (
            <div className="py-6 text-[13px] text-white">Reading store products…</div>
          ) : (
            <>
              <div className="mt-3">
                {storeLadder.rows.map((r) => (
                  <div
                    key={`${r.store}-${r.product_id}`}
                    className="border-t border-white/[0.08] py-2.5"
                  >
                    <div className="flex items-baseline gap-2">
                      <span
                        className="mt-1 h-2 w-2 shrink-0 self-start rounded-[2px]"
                        style={{
                          background: r.promo
                            ? PRICE_KIND_COLOURS.legacy
                            : PRICE_KIND_COLOURS.current,
                        }}
                      />
                      <span className="min-w-0 flex-1 truncate text-[13px] font-medium text-white">
                        {r.monthly != null && !r.promo
                          ? `£${r.monthly.toFixed(2).replace('.00', '')}${r.interval === 'year' ? '/yr' : '/mo'} · `
                          : ''}
                        {r.label}
                      </span>
                      <span className="shrink-0 text-[13px] font-semibold tabular-nums text-white">
                        {r.mrr != null ? gbp(r.mrr) : '—'}
                      </span>
                    </div>
                    <div className="mt-1 truncate pl-4 text-[12px] text-white">
                      {r.subscribers} subscriber{r.subscribers === 1 ? '' : 's'} ·{' '}
                      {storeLabel(r.store)}
                      {r.promo ? ' · comped, no revenue' : ''}
                    </div>
                    <div className="mt-1.5 ml-4 h-1 rounded-sm bg-white/[0.06]">
                      <div
                        className="h-1 rounded-sm"
                        style={{
                          width: `${Math.max(((r.mrr ?? 0) / storeLadder.max) * 100, 1)}%`,
                          background: r.promo
                            ? PRICE_KIND_COLOURS.legacy
                            : PRICE_KIND_COLOURS.current,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <Hairline className="my-4" />
              <div className="grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-4">
                <Fig
                  value={gbp(storeLadder.impliedMrr)}
                  label="Implied by these"
                  sub="list price × subs"
                />
                <Fig value={gbp(rcMrr)} label="RevenueCat MRR" sub="the real figure" />
                <Fig
                  value={`${storeMix.store_paying - storeMix.covered}`}
                  label="No product on file"
                  sub="subscribed before Aug"
                />
                <Fig
                  value={
                    storeMix.covered > 0 ? gbp(storeLadder.impliedMrr / storeMix.covered, 2) : '—'
                  }
                  label="Average matched"
                  sub="per subscriber"
                />
              </div>
              <p className="m-0 mt-3 max-w-[85ch] text-[12px] leading-[17px] text-white">
                Apple and Google never return the price an individual subscriber pays, so the
                amounts above are UK list prices looked up by product id — the store equivalent of
                the price map the Stripe side uses. The check is the two figures beside each other:
                these products imply {gbp(storeLadder.impliedMrr)} across {storeMix.covered} matched
                subscribers, against {gbp(rcMrr)} of real store MRR across {storeMix.store_paying}.
                The gap is the {storeMix.store_paying - storeMix.covered} who subscribed before{' '}
                {storeMix.events_from
                  ? new Date(storeMix.events_from).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'long',
                    })
                  : 'the webhook started'}
                , when the webhook that records a product id started running.
              </p>
            </>
          )}
        </Panel>

        <Divider label="Programmes" />

        {/* The college scheme, on its own */}
        <Panel tone="accent">
          <SectionHead
            title="College scheme"
            meta={
              <>
                {`50% for life · ${gbp(college.apprenticePrice, 2)} an apprentice · ${gbp(
                  college.electricianPrice,
                  2
                )} an electrician · `}
                <Link to="/admin/colleges" className="font-semibold text-elec-yellow">
                  full picture on Colleges
                </Link>
              </>
            }
          />

          {/*
            One number, then the distance still to run.

            This opened with four equal-weight figures and a database footnote as
            body copy, so the only fact that matters — one college of 140 has
            used a code — arrived as the second-smallest stat on the panel. The
            headline is the money it makes today; the bar underneath is how much
            of the scheme is actually switched on.
          */}
          <div className="mt-4 grid gap-5 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-x-10">
            <div className="min-w-0 text-white">
              <div className="text-[13px] font-medium leading-4">Scheme MRR</div>
              <div className="mt-1 text-[40px] font-semibold leading-[42px] tracking-[-0.03em] lg:text-[48px] lg:leading-[50px]">
                {gbp(college.mrr, 2)}
              </div>
              <div className="mt-1.5 text-[13px] leading-[18px]">
                {college.redeemed} redemption{college.redeemed === 1 ? '' : 's'} across{' '}
                {college.taken.length} college{college.taken.length === 1 ? '' : 's'}
              </div>
            </div>

            <div className="min-w-0">
              <div className="flex items-baseline justify-between gap-3 text-white">
                <span className="text-[13px] font-medium">Colleges using their code</span>
                <span className="text-[13px] font-semibold tabular-nums">
                  {college.taken.length} of {college.colleges}
                </span>
              </div>
              <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-white/[0.07]">
                <div
                  className="h-full rounded-full"
                  style={{
                    // A sliver, honestly: 1 of 140 is 0.7%. Floored at 3px so it
                    // is visible as a start rather than reading as nothing.
                    width: `max(3px, ${(college.taken.length / Math.max(college.colleges, 1)) * 100}%)`,
                    background: PRICE_KIND_COLOURS.current,
                  }}
                />
              </div>
              <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-3">
                <Fig
                  value={gbp(college.colleges * college.apprenticePrice, 0)}
                  label="If each took one"
                  sub="a month, apprentice rate"
                />
                <Fig
                  value={gbp(college.colleges * 10 * college.apprenticePrice, 0)}
                  label="Ten each"
                  sub="a month"
                />
                <Fig value={college.codes} label="Codes live" sub="apprentice + electrician" />
              </div>
            </div>
          </div>

          {college.taken.length > 0 && (
            <>
              <Divider label="Who has used it" className="mt-5" />
              <div className="mt-2">
                {college.taken.map((r) => (
                  <PersonLine
                    key={r.college}
                    name={r.college}
                    sub={
                      [
                        r.apprentice && r.apprentice.redeemed > 0
                          ? `${r.apprentice.code} · ${r.apprentice.redeemed} apprentice`
                          : null,
                        r.electrician && r.electrician.redeemed > 0
                          ? `${r.electrician.code} · ${r.electrician.redeemed} electrician`
                          : null,
                      ]
                        .filter(Boolean)
                        .join(' · ') || '—'
                    }
                    value={gbp(r.mrr, 2)}
                    note="a month"
                  />
                ))}
              </div>
            </>
          )}

          {/*
            The pipeline, deliberately quiet.

            Forty pill-shaped chips made the colleges that have done NOTHING the
            loudest thing on the panel. It is a worklist, not a headline: three
            dense columns, plain text, capped height, so it can be read down
            without shouting over the money above it.
          */}
          {college.notUsed.length > 0 && (
            <>
              <Divider label={`Not yet used · ${college.notUsed.length}`} className="mt-5" />
              <div className="mt-2 max-h-[190px] overflow-y-auto pr-1">
                <ul className="m-0 grid list-none grid-cols-1 gap-x-6 gap-y-0.5 p-0 sm:grid-cols-2 lg:grid-cols-3">
                  {college.notUsed.map((r) => (
                    <li
                      key={r.college}
                      className="truncate py-1 text-[12px] leading-4 text-white"
                      title={[r.apprentice?.code, r.electrician?.code].filter(Boolean).join(' · ')}
                    >
                      {r.college}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}

          <p className="m-0 mt-4 text-[11px] leading-4 text-white">
            Take-up is read from Stripe. Our own <code>promo_offers.redemptions</code> column is
            written when a code is created and never updated, so it reads zero everywhere.
          </p>
        </Panel>

        {/* Every offer we run */}
        <Panel>
          <SectionHead
            title="Offers and coupons"
            meta={
              offers
                ? `${offers.totalCoupons} coupons · ${offers.totalCodes} codes issued`
                : undefined
            }
          />

          {!offers ? (
            <div className="py-6 text-[13px] text-white">Reading Stripe coupons…</div>
          ) : (
            <>
              {/*
                Schemes as tiles, not as a list of headings.

                As a vertical list this read as six near-empty rows: a scheme
                name, a count, and then nothing, because the referral scheme is
                26 near-identical coupons that are not worth listing and two
                schemes have never been redeemed at all. A tile carries the same
                facts in a quarter of the height and lets the zero ones sit
                quietly beside the ones doing work.
              */}
              {/*
                Cards ON the panel, not holes punched INTO it.

                These were a hairline grid filled with hsl(0 0% 9%) — darker
                than the panel behind them — so six near-black rectangles read
                as gaps in the surface rather than as tiles. Elevation runs the
                other way: a raised thing is lighter than its ground. Separate
                rounded cards on a translucent white fill, with real gaps
                instead of 1px seams.
              */}
              {/*
                Stripe cannot separate these two schemes, so the page must.

                DODDELEC50, KANEELEC50, SESELEC50 and four more EMPLOYER codes
                sit on the coupon literally named "College scheme: 50% off
                Electrician" — so grouping by coupon name counted Dodd Group and
                Kane Group as colleges, and this tile said 161 codes issued
                while the College panel below said 143. Only promo_offers.name
                knows the difference, so the college and employer rows are
                rebuilt from it and Stripe's conflated row is dropped.
              */}
              <div className="mt-3 grid grid-cols-2 gap-2.5 lg:grid-cols-3">
                {[
                  ...offers.schemes.filter((sc) => sc.scheme !== 'college'),
                  {
                    scheme: 'college' as const,
                    coupons: 2,
                    codesIssued: college.codes,
                    redeemed: college.redeemed,
                    activeSubs: 0,
                    activeForgoneMrr: 0,
                  },
                  {
                    scheme: 'employer' as const,
                    coupons: 2,
                    codesIssued: employer.codes,
                    redeemed: employer.redeemed,
                    activeSubs: 0,
                    activeForgoneMrr: 0,
                  },
                ].map((sc) => {
                  const dead = sc.redeemed === 0;
                  const accent =
                    sc.scheme === 'college'
                      ? ACCENT
                      : sc.scheme === 'winback'
                        ? PRICE_KIND_COLOURS.winback
                        : sc.scheme === 'founder'
                          ? PRICE_KIND_COLOURS.founder
                          : 'rgba(255,255,255,0.30)';
                  return (
                    <div
                      key={sc.scheme}
                      className="rounded-xl border border-white/[0.08] bg-white/[0.035] px-4 py-3.5"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="h-2 w-2 shrink-0 rounded-[2px]"
                          style={{ background: dead ? 'rgba(255,255,255,0.22)' : accent }}
                        />
                        <span className="min-w-0 truncate text-[12px] font-medium leading-4 text-white">
                          {OFFER_SCHEME_LABELS[sc.scheme]}
                        </span>
                      </div>
                      <div className="mt-2 flex items-baseline gap-2">
                        <span
                          className="text-[28px] font-semibold leading-[30px] tracking-[-0.02em]"
                          style={{ color: dead ? 'rgba(255,255,255,0.45)' : '#ffffff' }}
                        >
                          {sc.redeemed}
                        </span>
                        <span className="text-[12px] text-white">taken</span>
                      </div>
                      <div className="mt-1.5 text-[11px] leading-4 text-white">
                        {sc.codesIssued > 0
                          ? `${sc.codesIssued} code${sc.codesIssued === 1 ? '' : 's'} issued`
                          : `${sc.coupons} coupon${sc.coupons === 1 ? '' : 's'}`}
                        {sc.activeSubs > 0 && (
                          <>
                            <br />
                            {sc.activeSubs} live · {gbp(sc.activeForgoneMrr)}/mo
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/*
                Reads the promo_offers rollup, NOT `offers.schemes`.

                This block shadowed the outer `college` with Stripe's grouping
                and so printed 161 — the conflated college+employer figure — in
                the very banner added to call the number out, directly under a
                tile saying 143.
              */}
              {(() => {
                if (college.codes === 0) return null;
                return (
                  <div
                    className="mt-4 flex items-start gap-2 rounded-xl px-4 py-3 text-[12px] leading-[17px] text-white"
                    style={{
                      border: '1px solid rgba(236,131,90,0.25)',
                      background: 'rgba(236,131,90,0.08)',
                    }}
                  >
                    <AlertTriangle className="mt-px h-4 w-4 shrink-0" style={{ color: SERIOUS }} />
                    <span>
                      <b className="font-semibold">
                        {college.codes} college codes issued, {college.redeemed} redeemed.
                      </b>{' '}
                      The codes are live and the coupon is valid — a distribution problem, not a
                      pricing one.
                    </span>
                  </div>
                );
              })()}

              {/*
                Only the schemes with something to look at get rows: a coupon
                per referrer is noise, and a scheme nobody has taken has no
                holders to name.
              */}
              {(['winback', 'college'] as const).map((scheme) => {
                const rows = offers.rows.filter((o) => o.scheme === scheme);
                if (rows.length === 0) return null;
                return (
                  <div key={scheme} className="mt-5">
                    <Divider label={OFFER_SCHEME_LABELS[scheme]} />
                    <div className="mt-2">
                      {rows.map((o) => {
                        const holders = holdersByCoupon.get(o.couponId) ?? [];
                        return (
                          <div key={o.couponId}>
                            <div className="flex items-center gap-3 border-t border-white/[0.08] py-2.5">
                              <div className="min-w-0 flex-1">
                                <div className="truncate text-[13px] font-medium text-white">
                                  {o.name ?? o.couponId}
                                </div>
                                <div className="mt-0.5 truncate text-[12px] text-white">
                                  {offerValue(o)}
                                  {o.codesIssued > 0 &&
                                    ` · ${o.codesIssued} code${o.codesIssued === 1 ? '' : 's'}`}
                                  {holders.length > 0 && ` · ${holders.length} on it now`}
                                </div>
                              </div>
                              <span className="shrink-0 text-right text-[13px] font-semibold tabular-nums text-white">
                                {o.timesRedeemed}
                                <span className="block text-[11px] font-normal text-white">
                                  taken
                                </span>
                              </span>
                            </div>
                            {holders.length > 0 && (
                              <div className="pl-6">
                                {holders.map((h) => (
                                  <PersonLine
                                    key={h.subscriptionId}
                                    name={h.email ?? h.customerId ?? 'Unknown'}
                                    sub={tierLabel(h.tier)}
                                    value={gbp(h.actualMrr, 2)}
                                    note={`was ${gbp(h.listMrr, 2)}`}
                                  />
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </Panel>

        <Divider label="Risk" />

        {/* Discounts and failing payments, side by side */}
        <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
          <Panel>
            <SectionHead
              title="Discounts in play"
              meta={discounts ? `${gbp(discounts.forgoneMrr)} a month` : undefined}
            />
            {!discounts || discounts.rows.length === 0 ? (
              <div className="py-6 text-[13px] text-white">
                No active subscription carries a discount.
              </div>
            ) : (
              <>
                <div className="mt-2 max-h-[400px] overflow-y-auto">
                  {discounts.rows.map((d) => (
                    <PersonLine
                      key={d.subscriptionId}
                      name={d.email ?? d.customerId ?? 'Unknown'}
                      sub={`${d.couponName ?? d.couponId ?? 'coupon'}${
                        d.percentOff ? ` · ${d.percentOff}% off` : ''
                      }${d.amountOff ? ` · ${gbp(d.amountOff)} off` : ''}${
                        d.duration === 'forever' ? ' · forever' : ''
                      }`}
                      value={gbp(d.actualMrr, 2)}
                      note={`was ${gbp(d.listMrr, 2)}`}
                    />
                  ))}
                </div>
              </>
            )}
          </Panel>

          <Panel>
            <SectionHead
              title="Payment failing"
              meta={atRisk ? `${gbp(atRisk.mrr)} a month at stake` : undefined}
            />
            {!atRisk || atRisk.rows.length === 0 ? (
              <div className="flex items-center gap-2 py-6 text-[13px] text-white">
                <CheckCircle2 className="h-4 w-4" style={{ color: GOOD }} />
                No subscription is past due or unpaid.
              </div>
            ) : (
              <>
                <p className="m-0 mt-1 text-[12px] leading-[17px] text-white">
                  A bounced card, not a decision to leave — usually reversible.
                </p>
                <div className="mt-2">
                  {atRisk.rows.map((r) => (
                    <PersonLine
                      key={r.subscriptionId}
                      name={r.email ?? r.customerId ?? 'Unknown'}
                      sub={`${tierLabel(r.tier)} · ${r.status.replace('_', ' ')}${
                        r.periodStart
                          ? ` · unpaid since ${formatDistanceToNow(parseISO(r.periodStart), { addSuffix: true })}`
                          : ''
                      }`}
                      value={gbp(r.monthlyAmount, 2)}
                      note="a month"
                    />
                  ))}
                </div>
              </>
            )}
          </Panel>
        </div>

        {/* Renewals ahead */}
        <Panel>
          <SectionHead
            title="Annual renewals ahead"
            meta={
              renewals
                ? `${renewals.count} subscriptions · ${gbp(renewals.yearAmount)} over twelve months`
                : undefined
            }
          />
          <div className="mt-3">
            <RenewalMonthsChart rows={renewals?.rows ?? []} />
          </div>
          {renewals && renewals.count > 0 && (
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-[12px] text-white">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-[2px]" style={{ background: AQUA }} />
                Due to renew
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span
                  className="h-2 w-2 rounded-[2px]"
                  style={{ background: PRICE_KIND_COLOURS.legacy }}
                />
                Already cancelling{renewals.willCancel > 0 ? ` · ${renewals.willCancel}` : ''}
              </span>
              <span>
                Soonest{' '}
                <b className="font-semibold">
                  {renewals.rows[0] ? `${renewals.rows[0].daysAway} days away` : '—'}
                </b>
              </span>
            </div>
          )}
        </Panel>

        <Divider label="Money in" />

        {/* Cash in */}
        <Panel>
          <SectionHead
            title="Cash in"
            meta={
              gross
                ? `${gross.charges.toLocaleString('en-GB')} successful charges since ${
                    gross.firstChargeAt
                      ? new Date(gross.firstChargeAt).toLocaleDateString('en-GB', {
                          month: 'short',
                          year: 'numeric',
                        })
                      : 'launch'
                  }`
                : undefined
            }
          />
          <p className="m-0 mt-1 max-w-[80ch] text-[12px] leading-[17px] text-white">
            Receipts, not run rate — every charge, refunds subtracted.
          </p>

          <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-4">
            <Fig
              value={grossTotal != null ? gbp(grossTotal) : '—'}
              label="Gross, all time"
              sub="Stripe + stores"
            />
            <Fig
              value={gross ? gbp(gross.allTime) : '—'}
              label="Through Stripe"
              sub={gross ? `${gbp(gross.refunded)} refunded` : 'net of refunds'}
            />
            <Fig
              value={rcGross ? gbp(rcGross.allTime) : '—'}
              label="Through the stores"
              sub={rcGross ? 'App Store + Play' : 'unavailable'}
            />
            <Fig
              value={dailyAverage != null ? gbp(dailyAverage, 2) : '—'}
              label="A day, both rails"
              sub="average, last 30"
            />
          </div>

          <div className="mt-4">
            <DailyCashChart stripeDaily={gross?.daily ?? []} storeDaily={rcGross?.daily ?? []} />
          </div>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5">
            <span className="inline-flex items-center gap-1.5 text-[12px] text-white">
              <span className="h-2 w-2 rounded-[2px]" style={{ background: BLUE }} />
              Stripe
            </span>
            <span className="inline-flex items-center gap-1.5 text-[12px] text-white">
              <span className="h-2 w-2 rounded-[2px]" style={{ background: AQUA }} />
              App Store &amp; Play
            </span>
          </div>
          <p className="m-0 mt-2 max-w-[85ch] text-[12px] leading-[17px] text-white">
            Both rails by day, net of refunds — Stripe from its charges, stores from RevenueCat's
            daily revenue chart.
            {gross && (
              <>
                {' '}
                Counted {formatDistanceToNow(parseISO(gross.asOf), { addSuffix: true })}; refreshed
                every six hours.
              </>
            )}
          </p>
        </Panel>

        {/* Lifetime payers */}
        {lifetime && lifetime.buyers.length > 0 && (
          <Panel>
            <SectionHead
              title="Lifetime payers"
              meta={`${lifetime.buyers.length} buyers · ${gbp(lifetime.banked)} banked`}
            />
            <p className="m-0 mt-1 max-w-[80ch] text-[12px] leading-[17px] text-white">
              One-off payments, kept out of MRR — they recur never.
            </p>
            <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-4">
              <Fig value={gbp(lifetime.banked)} label="Banked" sub="all buyers" />
              <Fig
                value={gbp(lifetime.bankedExact)}
                label="Confirmed"
                sub={`${lifetime.exactCount} with a receipt`}
              />
              <Fig value={lifetime.buyers.length} label="Buyers" sub="lifetime access granted" />
              <Fig
                value={lifetime.needsAttention.length}
                label="Need attention"
                sub="paid, not delivered"
              />
            </div>
            <div className="mt-3">
              {lifetime.buyers.map((b) => (
                <PersonLine
                  key={`${b.user_id ?? b.email ?? b.recorded_at}`}
                  name={b.full_name || b.email || 'Unknown buyer'}
                  sub={`${new Date(b.recorded_at).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}${!b.amount_is_exact ? ' · amount approximate' : ''}${
                    !b.fulfilled ? ' · not yet delivered' : ''
                  }${!b.user_id ? ' · no account matched' : ''}`}
                  value={gbp(b.amount_pence / 100, 2)}
                />
              ))}
            </div>
          </Panel>
        )}

        {/* Why people leave */}
        <Panel>
          <SectionHead
            title="Why people leave"
            meta={churnByReason.total > 0 ? `${churnByReason.total} cancellations` : undefined}
          />
          {churnByReason.rows.length === 0 ? (
            <div className="py-6 text-[13px] text-white">No cancellation reasons recorded yet.</div>
          ) : (
            <>
              <div className="mt-3 space-y-2">
                {churnByReason.rows.map((r) => (
                  <ReasonBar
                    key={r.reason}
                    label={CHURN_REASON_LABELS[r.reason] ?? r.reason}
                    n={r.n}
                    total={churnByReason.total}
                    colour={r.reason === 'not_using' ? SERIOUS : PRICE_KIND_COLOURS.legacy}
                  />
                ))}
              </div>
              <p className="m-0 mt-3 max-w-[85ch] text-[12px] leading-[17px] text-white">
                From the in-app cancel survey. Price is a long way from the top: people leave
                because the product never became part of the job, which is an onboarding problem
                rather than a pricing one — and the same conclusion the trial return curve reaches
                independently.
              </p>
            </>
          )}
        </Panel>

        {/* Movement */}
        <Panel>
          <SectionHead
            title="Movement"
            meta={movement ? 'Stripe only · starts and cancellations' : undefined}
          />
          {!movement ? (
            <div className="py-6 text-[13px] text-white">Reading Stripe movement…</div>
          ) : (
            <>
              <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-4">
                <Fig
                  value={movement.started30}
                  label="Started, 30 days"
                  sub={`${movement.started14} in the last 14`}
                />
                <Fig
                  value={movement.canceled30}
                  label="Cancelled, 30 days"
                  sub={`${movement.canceled14} in the last 14`}
                />
                <Fig
                  value={
                    movement.started30 - movement.canceled30 >= 0
                      ? `+${movement.started30 - movement.canceled30}`
                      : `${movement.started30 - movement.canceled30}`
                  }
                  label="Net, 30 days"
                  sub="starts minus cancellations"
                />
                <Fig
                  value={movement.canceledNeverPaid30}
                  label="Never paid"
                  sub="of those cancellations"
                />
              </div>

              {/*
                New MRR by day, from what STARTED — including subscriptions that
                have since cancelled. It answers "what did we win", not "what
                survived"; netting churn into it would make a good sales week
                and a quiet one look identical.
              */}
              <div className="mt-4">
                <NewMrrChart starts={movement.startsLast14} />
              </div>

              <p className="m-0 mt-2 max-w-[85ch] text-[12px] leading-[17px] text-white">
                Gross new MRR by the day it started, last 14 days. Faded bars are subscriptions that
                have already cancelled — they were still won, so they are shown rather than removed.
                {movement.canceledNeverPaid30 > 0 && (
                  <>
                    {' '}
                    {movement.canceledNeverPaid30} of the {movement.canceled30} cancellations never
                    paid at all — trials that ended, not customers lost.
                  </>
                )}
              </p>
            </>
          )}
        </Panel>

        {/* Does this page add up */}
        <Panel>
          <SectionHead
            title="Checks"
            meta={checks.allOk ? 'all clear' : `${checks.failing} need looking at`}
          />
          <div className="mt-2">
            <Check
              ok={checks.syncGap === 0}
              label="Stripe and this database agree"
              detail={
                checks.syncGap === 0
                  ? `${stripeSubs} active in Stripe, ${stripeStats?.supabase?.subscribedUsers ?? 0} marked subscribed here.`
                  : `${stripeStats?.discrepancies?.inStripeNotSupabase ?? 0} in Stripe but not synced here · ${stripeStats?.discrepancies?.inSupabaseNotStripe ?? 0} marked subscribed with no live Stripe subscription. Store-billed subscribers are excluded.`
              }
            />
            <Check
              ok={checks.unmapped === 0}
              label="Every price maps to a tier"
              detail={
                checks.unmapped === 0
                  ? 'All active prices resolve to a known tier, so the ladder above accounts for every pound.'
                  : `${checks.unmapped} subscriber${checks.unmapped === 1 ? '' : 's'} on a price ID missing from the tier map — their revenue is real but attributed to no tier, so the price ladder is short by that much.`
              }
            />
            <Check
              ok={checks.unfulfilledLifetime === 0}
              label="Lifetime buyers have their access"
              detail={
                checks.unfulfilledLifetime === 0
                  ? `All ${lifetime?.buyers.length ?? 0} lifetime buyers granted, ${gbp(lifetime?.banked ?? 0)} banked.`
                  : `${checks.unfulfilledLifetime} paid without the grant landing.`
              }
            />
            <Check
              ok={checks.storeCoverage === 0}
              label="Every store subscriber has a product on file"
              detail={
                checks.storeCoverage === 0
                  ? 'All store subscribers matched to a product.'
                  : `${checks.storeCoverage} store subscriber${checks.storeCoverage === 1 ? '' : 's'} joined before the RevenueCat webhook started recording product IDs, so the store price mix above is drawn from the rest.`
              }
            />
          </div>
        </Panel>

        {/* Stores */}
        {rcLoaded && (
          <Panel>
            <SectionHead title="App Store & Play Store" meta="live from RevenueCat" />
            <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-4">
              <Fig value={gbp(rcMrr)} label="Store MRR" sub="normalised monthly" />
              <Fig value={storeSubs} label="Paying" sub="across both stores" />
              <Fig
                value={rcStats?.subscribersBySource?.app_store ?? 0}
                label="App Store"
                sub="subscribers"
              />
              <Fig
                value={rcStats?.subscribersBySource?.play_store ?? 0}
                label="Play Store"
                sub="subscribers"
              />
            </div>
            <p className="m-0 mt-3 max-w-[85ch] text-[12px] leading-[17px] text-white">
              The price ladder above is Stripe only — Apple and Google report tiers, not the
              individual price a subscriber is grandfathered on, so a like-for-like ladder cannot be
              built for the stores.
            </p>
          </Panel>
        )}
      </PageFrame>
    </PullToRefresh>
  );
}
