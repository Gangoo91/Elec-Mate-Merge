/**
 * Admin Stripe Stats
 * Fetches live subscription and revenue data directly from Stripe
 * Returns accurate counts that can be compared with Supabase data
 */

import { serve, createClient, corsHeaders } from '../_shared/deps.ts';
import Stripe from 'https://esm.sh/stripe@14.21.0?target=deno';
import { captureException } from '../_shared/sentry.ts';

// Supabase edge runtime global — lets work continue after the response is sent.
declare const EdgeRuntime: { waitUntil(p: Promise<unknown>): void };

// The overview reports days in UK time, so snapshot rows are keyed by the
// Europe/London date rather than UTC (an hour out for half the year).
const ukDay = (secOrDate: number | Date = new Date()) =>
  new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/London' }).format(
    typeof secOrDate === 'number' ? new Date(secOrDate * 1000) : secOrDate
  );

// Known price IDs and their tiers - ACTUAL STRIPE PRICES
const PRICE_TIER_MAP: Record<string, { tier: string; amount: number }> = {
  // Founder pricing (£3.99/mo) - MAIN PRICE USED BY ALL REAL USERS
  price_1SPK8c2RKw5t5RAmRGJxXfjc: { tier: 'founder', amount: 3.99 },
  price_1RL1wd2RKw5t5RAms8S0sLAt: { tier: 'founder', amount: 3.99 },
  // Apprentice pricing - current £6.99/mo (Jun 2026, new customers) + prior £5.99 + legacy £4.99
  price_1TnbOk2RKw5t5RAmiOCTkqS3: { tier: 'apprentice', amount: 6.99 },
  price_1TnbOl2RKw5t5RAmmNsVstDW: { tier: 'apprentice', amount: 69.99 / 12 },
  price_1TKlA22RKw5t5RAmpvhojy0b: { tier: 'apprentice', amount: 5.99 },
  price_1SmUef2RKw5t5RAmRIMTWTqU: { tier: 'apprentice', amount: 4.99 },
  price_1TKlKK2RKw5t5RAmGVR5EcF9: { tier: 'apprentice', amount: 59.99 / 12 },
  price_1SmUfK2RKw5t5RAml6bj1I77: { tier: 'apprentice', amount: 49.99 / 12 },
  // Electrician pricing - current £19.99/mo (Jun 2026, new customers) + prior £12.99 + legacy £9.99
  price_1TnbOh2RKw5t5RAmsf2KcHT6: { tier: 'electrician', amount: 19.99 },
  price_1TnbOj2RKw5t5RAmEIXS6oyV: { tier: 'electrician', amount: 199.99 / 12 },
  price_1TKlA12RKw5t5RAmdhZyhX1I: { tier: 'electrician', amount: 12.99 },
  price_1SqJVr2RKw5t5RAmaiTGelLN: { tier: 'electrician', amount: 9.99 },
  // £9.99/month "Electrician Monthly win back" — the winback offer price. It was
  // never added to any PRICE_TO_TIER map, so live subscribers on it were written
  // to profiles as tier 'unknown', and their revenue was missing from this stat.
  price_1TMoQE2RKw5t5RAmuFglsBof: { tier: 'electrician', amount: 9.99 },
  price_1TKlKL2RKw5t5RAmpD8FH7qp: { tier: 'electrician', amount: 129.99 / 12 },
  price_1SqJVs2RKw5t5RAmVeD2QVsb: { tier: 'electrician', amount: 99.99 / 12 },
  price_1RhteS2RKw5t5RAmzRbaTE8U: { tier: 'electrician', amount: 9.99 },
  price_1Rhti2RKw5t5RAmha0s6PJA: { tier: 'electrician', amount: 99.99 / 12 },
  // Win-Back pricing (£7.99/mo, £79.99/yr) - expired trial re-engagement
  price_1SvggR2RKw5t5RAmDN29FBzx: { tier: 'electrician', amount: 7.99 },
  price_1SvggR2RKw5t5RAmsrerSmdG: { tier: 'electrician', amount: 79.99 / 12 },
  // Mate (business_ai) pricing — current £39.99/mo + £399.99/yr, plus legacy £29.99/mo founder + £299.99/yr
  price_1TRGZo2RKw5t5RAmRl2hc0ru: { tier: 'business_ai', amount: 39.99 },
  price_1TRGZo2RKw5t5RAmzY50EzaE: { tier: 'business_ai', amount: 399.99 / 12 },
  price_1T6DUx2RKw5t5RAmpb177NJV: { tier: 'business_ai', amount: 29.99 },
  price_1T6DUy2RKw5t5RAmo9HgAukW: { tier: 'business_ai', amount: 299.99 / 12 },
  // Employer pricing — CURRENT (£49.99/mo, £499.99/yr). Both were live and on
  // sale in stripePrices.ts but absent from this map, so the first subscriber
  // on the current Employer price would have been classified 'unknown' and
  // shown under "Unmapped price" instead of against the top tier. Nothing has
  // landed on them yet, which is the only reason it went unnoticed.
  // Amounts read from the Stripe API, not inferred.
  price_1Tm6eF2RKw5t5RAm0nG7ujWw: { tier: 'employer', amount: 49.99 },
  price_1Tm6qA2RKw5t5RAmitPj2yF9: { tier: 'employer', amount: 499.99 / 12 },
  // Employer pricing — superseded (£29.99/mo, £39.99/mo, £299.99/yr, £399.99/yr)
  price_1SlyAT2RKw5t5RAmUmTRGimH: { tier: 'employer', amount: 29.99 },
  price_1SlyB82RKw5t5RAmN447YJUW: { tier: 'employer', amount: 299.99 / 12 },
  price_1Svgmx2RKw5t5RAmALVu3vkn: { tier: 'employer', amount: 39.99 },
  price_1Svgmx2RKw5t5RAm6Q4KMCdG: { tier: 'employer', amount: 399.99 / 12 },
  // LEGACY TEST PRICES (Andrew's old test subscriptions) - count as founder
  price_1RhtdT2RKw5t5RAmv6b2xE6p: { tier: 'founder', amount: 6.99 }, // Desktop £6.99 - ANDREW TEST
  price_1Rhtgl2RKw5t5RAmkQVKVnKn: { tier: 'founder', amount: 69.99 / 12 },
  price_1RL1zR2RKw5t5RAmVABR93Zy: { tier: 'founder', amount: 5.99 }, // Legacy £5.99 - ANDREW TEST
  price_1RL25t2RKw5t5RAmXYxxJivo: { tier: 'founder', amount: 59.99 / 12 },
  price_1RL2582RKw5t5RAm2qG45wK0: { tier: 'founder', amount: 39.99 / 12 },
};

/*
  What each price IS, beyond its tier.

  `subscriptionsByPrice` keyed on "£9.99/month" collapsed the legacy Electrician
  price and the £9.99 winback price into one bucket, which is precisely the
  distinction the revenue page exists to make. Anything not listed here is
  treated as legacy: a grandfathered price someone is still paying, which is
  revenue you are choosing to leave on the table rather than a mistake.
*/
const CURRENT_PRICE_IDS = new Set([
  'price_1TnbOk2RKw5t5RAmiOCTkqS3', // Apprentice £6.99/mo
  'price_1TnbOl2RKw5t5RAmmNsVstDW', // Apprentice £69.99/yr
  'price_1TnbOh2RKw5t5RAmsf2KcHT6', // Electrician £19.99/mo
  'price_1TnbOj2RKw5t5RAmEIXS6oyV', // Electrician £199.99/yr
  'price_1TRGZo2RKw5t5RAmRl2hc0ru', // Mate £39.99/mo
  'price_1TRGZo2RKw5t5RAmzY50EzaE', // Mate £399.99/yr
  'price_1Tm6eF2RKw5t5RAm0nG7ujWw', // Employer £49.99/mo
  'price_1Tm6qA2RKw5t5RAmitPj2yF9', // Employer £499.99/yr
]);

const WINBACK_PRICE_IDS = new Set([
  'price_1SvggR2RKw5t5RAmDN29FBzx', // £7.99/mo win-back
  'price_1SvggR2RKw5t5RAmsrerSmdG', // £79.99/yr win-back
  'price_1TMoQE2RKw5t5RAmuFglsBof', // £9.99/mo "Electrician Monthly win back"
]);

const FOUNDER_PRICE_IDS = new Set([
  'price_1SPK8c2RKw5t5RAmRGJxXfjc',
  'price_1RL1wd2RKw5t5RAms8S0sLAt',
]);

/*
  Which scheme a coupon belongs to.

  Classified from the coupon name because that is where the scheme actually
  lives — Stripe has no grouping concept and the ids are random strings
  (`MWAINvAO`, `SSmqkZGn`). Names are set by us when the coupons are created, so
  this is reading our own convention back, not guessing.
*/
export type OfferScheme =
  | 'college'
  | 'winback'
  | 'referral'
  | 'retention'
  | 'founder'
  | 'other';

const offerScheme = (id: string, name: string | null): OfferScheme => {
  const n = (name ?? '').toLowerCase();
  if (n.includes('college')) return 'college';
  if (n.includes('win-back') || n.includes('winback')) return 'winback';
  if (n.includes('referral')) return 'referral';
  if (id === 'ELECMATE_STAY_40' || n.includes('stay offer')) return 'retention';
  if (n.includes('founder')) return 'founder';
  return 'other';
};

type PriceKind = 'current' | 'winback' | 'founder' | 'legacy';
const priceKind = (priceId: string): PriceKind =>
  CURRENT_PRICE_IDS.has(priceId)
    ? 'current'
    : WINBACK_PRICE_IDS.has(priceId)
      ? 'winback'
      : FOUNDER_PRICE_IDS.has(priceId)
        ? 'founder'
        : 'legacy';

/** List price of the tier a legacy subscriber would pay today, monthly. */
const CURRENT_MONTHLY_BY_TIER: Record<string, number> = {
  apprentice: 6.99,
  electrician: 19.99,
  business_ai: 39.99,
  employer: 49.99,
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify admin access
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    const token = authHeader.replace('Bearer ', '');
    /*
      The nightly snapshot job (pg_cron → net.http_post) calls with the
      service-role key and has no user. Everything else must be an admin.
    */
    const scheduled = token === supabaseServiceKey;
    if (!scheduled) {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser(token);

      if (authError || !user) {
        throw new Error('Authentication failed');
      }

      // Check if user has admin access via admin_role (consistent with admin-get-users)
      const { data: profile } = await supabase
        .from('profiles')
        .select('admin_role')
        .eq('id', user.id)
        .single();

      if (!profile?.admin_role) {
        console.log('[ADMIN-STRIPE-STATS] Access denied for user:', user.id);
        throw new Error('Admin access required');
      }
    }

    console.log('[ADMIN-STRIPE-STATS] Access granted:', scheduled ? 'scheduled snapshot' : 'admin');

    /*
      Serve the whole payload from cache, refresh behind the response.

      Even with the Stripe walks running in parallel this function is seconds
      of work against a third-party API, and it was doing all of it on every
      page load: measured p50 29.9s across 142 POSTs in 24h, worst 100.9s. The
      dashboard polled it every 60 seconds on top of that, so a walk was almost
      always in flight. None of these figures move fast enough to justify it —
      MRR and paying counts are daily metrics.

      So: a fresh cache answers immediately; a stale one still answers
      immediately and kicks off a refresh behind the response; only a cold
      cache waits. `refresh: true` forces the computation, which is how the
      background refresh and the nightly snapshot cron get real work done.
      The forced path never schedules another refresh, so this cannot recurse.
    */
    const OVERVIEW_CACHE_KEY = 'stripe_overview';
    const OVERVIEW_FRESH_MS = 10 * 60 * 1000;

    let forceRefresh = scheduled;
    if (!forceRefresh && req.method === 'POST') {
      try {
        const body = await req.json();
        forceRefresh = body?.refresh === true;
      } catch {
        // No body, or not JSON. A plain invoke is the normal read path.
      }
    }

    if (!forceRefresh) {
      const { data: overviewCache } = await supabase
        .from('admin_metric_cache')
        .select('value, updated_at')
        .eq('key', OVERVIEW_CACHE_KEY)
        .maybeSingle();

      if (overviewCache?.value) {
        const age = Date.now() - new Date(overviewCache.updated_at).getTime();
        const cachedAt = overviewCache.updated_at;

        if (age > OVERVIEW_FRESH_MS) {
          /*
            Stale. Answer from cache now and rebuild in the background by
            calling this function again with the service key, which takes the
            forced path. waitUntil keeps the isolate alive past the response.
          */
          EdgeRuntime.waitUntil(
            fetch(`${supabaseUrl}/functions/v1/admin-stripe-stats`, {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${supabaseServiceKey}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ refresh: true }),
            }).catch((e) => console.error('[ADMIN-STRIPE-STATS] background refresh failed:', e))
          );
        }

        console.log(
          `[ADMIN-STRIPE-STATS] served from cache, age ${Math.round(age / 1000)}s`,
          age > OVERVIEW_FRESH_MS ? '(refreshing behind response)' : '(fresh)'
        );

        return new Response(
          JSON.stringify({ ...overviewCache.value, cachedAt, servedFromCache: true }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    console.log(
      '[ADMIN-STRIPE-STATS] computing fresh payload',
      forceRefresh ? '(forced)' : '(cold cache)'
    );

    // Initialize Stripe
    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');
    if (!stripeKey) {
      throw new Error('STRIPE_SECRET_KEY not configured');
    }

    const stripe = new Stripe(stripeKey, { apiVersion: '2023-10-16' });

    /*
      Every Stripe list this function needs, walked in parallel.

      These six walks are independent, but they were written to share ONE pair
      of `hasMore` / `startingAfter` variables, which forced them to run one
      after another: active subs, trialing subs, coupons, promotion codes,
      past_due, unpaid, and up to 3,000 cancellations, each waiting for the
      last to finish. That is what made this function take ~30 seconds on every
      single dashboard load (measured p50 29.9s, p90 31.8s over 142 calls).
      Each walk owns its own cursor now, so the wall-clock cost is the slowest
      one rather than the sum of all of them.
    */
    const paginate = async <T extends { id: string }>(
      fetchPage: (cursor?: string) => Promise<Stripe.ApiList<T>>,
      cap = Number.POSITIVE_INFINITY
    ): Promise<T[]> => {
      const out: T[] = [];
      let cursor: string | undefined;
      while (out.length < cap) {
        const page = await fetchPage(cursor);
        out.push(...page.data);
        if (!page.has_more || page.data.length === 0) break;
        cursor = page.data[page.data.length - 1].id;
      }
      return out;
    };

    // `expand` roughly doubles the cost of a subscriptions page, so it is only
    // asked for where the customer object or the price is actually read. The
    // cancelled walk needs neither — it is counted by `canceled_at` alone.
    const SUB_EXPAND = ['data.customer', 'data.items.data.price'];
    const listSubs = (
      status: 'active' | 'trialing' | 'past_due' | 'unpaid',
      expand = true
    ) =>
      paginate<Stripe.Subscription>((cursor) =>
        stripe.subscriptions.list({
          status,
          limit: 100,
          ...(expand ? { expand: SUB_EXPAND } : {}),
          ...(cursor ? { starting_after: cursor } : {}),
        })
      );

    const nowSec = Math.floor(Date.now() / 1000);
    const thirtyDaysAgo = nowSec - 30 * 24 * 60 * 60;
    const fourteenDaysAgo = nowSec - 14 * 24 * 60 * 60;

    /*
      Churn is counted by when a subscription was CANCELLED, not when it was
      created. Stripe has no canceled_at filter on subscriptions.list, so the
      cancelled set is walked and filtered here, and it must be paginated: a
      single limit:100 page silently capped the count once we passed 100
      cancellations, and the newest-created-first ordering meant that page held
      precisely the wrong ones — recent signups, not recent leavers.
    */
    const [
      activeSubscriptions,
      trialingSubscriptions,
      allCoupons,
      allPromoCodes,
      pastDueSubscriptions,
      unpaidSubscriptions,
      canceledAll,
    ] = await Promise.all([
      listSubs('active'),
      listSubs('trialing'),
      paginate<Stripe.Coupon>((cursor) =>
        stripe.coupons.list({ limit: 100, ...(cursor ? { starting_after: cursor } : {}) })
      ),
      paginate<Stripe.PromotionCode>((cursor) =>
        stripe.promotionCodes.list({ limit: 100, ...(cursor ? { starting_after: cursor } : {}) })
      ),
      listSubs('past_due'),
      listSubs('unpaid'),
      paginate<Stripe.Subscription>(
        (cursor) =>
          stripe.subscriptions.list({
            status: 'canceled',
            limit: 100,
            ...(cursor ? { starting_after: cursor } : {}),
          }),
        3000
      ),
    ]);

    /*
      `past_due` and `unpaid` are involuntary churn in progress — a card that
      expired or bounced, not somebody who decided to leave. Kept as one list
      because every reader downstream treats them the same way.
    */
    const failingSubscriptions = [...pastDueSubscriptions, ...unpaidSubscriptions];

    const canceledSince = (since: number) =>
      canceledAll.filter((s) => s.canceled_at && s.canceled_at >= since);
    const canceledLast30 = canceledSince(thirtyDaysAgo);
    const canceledLast14 = canceledSince(fourteenDaysAgo);

    /*
      Movement, counted on a like-for-like basis.

      The admin page was comparing "+11 new" against "34 lost" and reading as a
      catastrophe. The 11 was every subscription that started in the window AND
      is still active today — so it silently dropped the 16 that started in the
      window and had already gone, and set 11 survivors against 34 leavers. The
      true count of starts in that window is 27, and the true net is -7, not the
      -23 the card implied. Over 30 days it is 80 started against 70 cancelled:
      growth, not decline.

      Cancellations are also split by whether the customer ever paid. 17 of the
      34 ended on or before their trial end date, so half of what read as churn
      is trials that did not convert — a different problem with a different fix.
    */
    const startedSince = (since: number) =>
      [...activeSubscriptions, ...canceledAll].filter((s) => s.created >= since);

    const startedLast30 = startedSince(thirtyDaysAgo);
    const startedLast14 = startedSince(fourteenDaysAgo);

    // Cancelled without ever billing: gone on or before the trial ended.
    const neverPaid = (subs: Stripe.Subscription[]) =>
      subs.filter((s) => s.trial_end && s.canceled_at && s.canceled_at <= s.trial_end);

    /*
      Trial conversion, from Stripe and verified against paid invoices.

      The admin Trials page derived this from `profiles.trial_end` and reported
      14.7%. Two things were wrong with that, and they compounded.

      The population was a third of the truth: 158 profiles carry a trial_end,
      while Stripe holds 455 subscriptions whose trial has actually ended. The
      column is only written on some signup paths, so most trials never appear.

      The outcome test was wrong too. "Converted" meant `subscribed = true`
      TODAY, so anyone who finished their trial, paid for months and then
      cancelled was filed as a trial that failed. 108 people were in that
      position. Converting and later churning is churn, not a failed trial, and
      the two need separate numbers.

      "Billed" is settled against paid invoices rather than inferred from the
      subscription status: 26 subscriptions were cancelled after their trial
      ended without a payment ever succeeding, and counting those as
      conversions would overstate the rate by nearly six points.
    */
    const allSubs = [...activeSubscriptions, ...trialingSubscriptions, ...canceledAll];

    const trialsEnded = allSubs.filter((s) => s.trial_end && s.trial_end <= nowSec);

    /*
      Settling this against invoices means walking ~2,000 of them, which is 20
      more sequential Stripe round-trips. Done inline it pushed this function
      past the client's patience — the invoke never returned, so the Trials page
      showed a dash AND the Revenue page, which calls the same function, stopped
      resolving too. It goes through admin_metric_cache like the RevenueCat
      overview does: serve whatever is cached, refresh behind the response.
    */
    const TRIAL_CACHE_KEY = 'stripe_trial_conversion';
    const TRIAL_CACHE_FRESH_MS = 30 * 60 * 1000;

    const computeTrialConversion = async () => {
      const paidSubscriptionIds = new Set<string>();
      // When each subscription first paid real money — the start of its MRR.
      const firstPaidAt = new Map<string, number>();
      let invoiceCursor: string | undefined;
      for (let guard = 0; guard < 200; guard++) {
        const page = await stripe.invoices.list({
          status: 'paid',
          limit: 100,
          ...(invoiceCursor ? { starting_after: invoiceCursor } : {}),
        });
        for (const inv of page.data) {
          const subId =
            typeof inv.subscription === 'string' ? inv.subscription : inv.subscription?.id;
          if (subId && (inv.amount_paid || 0) > 0) {
            paidSubscriptionIds.add(subId);
            const paidAt = inv.status_transitions?.paid_at ?? inv.created;
            const prev = firstPaidAt.get(subId);
            if (prev == null || paidAt < prev) firstPaidAt.set(subId, paidAt);
          }
        }
        if (!page.has_more || page.data.length === 0) break;
        invoiceCursor = page.data[page.data.length - 1].id;
      }
      const billed = trialsEnded.filter((s) => paidSubscriptionIds.has(s.id));
      const stillPaying = billed.filter((s) => s.status === 'active');

      /*
        Real churn, from the same invoice walk.

        "Churn" elsewhere in this function is any subscription that ended,
        which is mostly trials that never paid. The overview wants the other
        thing: people who settled at least one real invoice and then left.
        Trial leavers are a different problem with a different fix and are
        counted nowhere in `churn`. Months are UTC calendar months; the
        current month is flagged incomplete so the page can say so.
      */
      const monthlyAmountOf = (s: Stripe.Subscription) => {
        const item = s.items?.data?.[0];
        const unit = (item?.price?.unit_amount || 0) / 100;
        return item?.price?.recurring?.interval === 'year' ? unit / 12 : unit;
      };
      const endedPaid = canceledAll.filter((s) => s.ended_at && paidSubscriptionIds.has(s.id));
      const monthStartSec = (y: number, m: number) => Math.floor(Date.UTC(y, m, 1) / 1000);
      const today = new Date();
      const tierOf = (s: Stripe.Subscription) =>
        PRICE_TIER_MAP[s.items?.data?.[0]?.price?.id ?? '']?.tier ?? 'unknown';
      const churnMonths: Array<{
        month: string;
        payingAtStart: number;
        churned: number;
        mrrLost: number;
        complete: boolean;
        /** Who left, by plan — the leak is rarely where the headcount is. */
        byPlan: Record<string, { count: number; mrrLost: number }>;
        /** MRR that started paying in the month (first real invoice), so the
         *  page can say why MRR moved, not just that it did. */
        newMrr: number;
        newCount: number;
      }> = [];
      for (let back = 3; back >= 0; back--) {
        const a = monthStartSec(today.getUTCFullYear(), today.getUTCMonth() - back);
        const b = monthStartSec(today.getUTCFullYear(), today.getUTCMonth() - back + 1);
        const payingAtStart = allSubs.filter(
          (s) =>
            s.created < a &&
            !(s.ended_at && s.ended_at <= a) &&
            !(s.trial_end && s.trial_end > a) &&
            paidSubscriptionIds.has(s.id)
        ).length;
        const churned = endedPaid.filter((s) => (s.ended_at as number) >= a && (s.ended_at as number) < b);
        const byPlan: Record<string, { count: number; mrrLost: number }> = {};
        for (const s of churned) {
          const k = tierOf(s);
          byPlan[k] ??= { count: 0, mrrLost: 0 };
          byPlan[k].count++;
          byPlan[k].mrrLost = Math.round((byPlan[k].mrrLost + monthlyAmountOf(s)) * 100) / 100;
        }
        const started = allSubs.filter((s) => {
          const t = firstPaidAt.get(s.id);
          return t != null && t >= a && t < b;
        });
        churnMonths.push({
          month: new Date(a * 1000).toISOString().slice(0, 7),
          payingAtStart,
          churned: churned.length,
          mrrLost: Math.round(churned.reduce((t, s) => t + monthlyAmountOf(s), 0) * 100) / 100,
          complete: b <= nowSec,
          byPlan,
          newMrr: Math.round(started.reduce((t, s) => t + monthlyAmountOf(s), 0) * 100) / 100,
          newCount: started.length,
        });
      }
      const churnByDay: Record<string, number> = {};
      for (let i = 30; i >= 0; i--) churnByDay[ukDay(nowSec - i * 86400)] = 0;
      for (const s of endedPaid) {
        const k = ukDay(s.ended_at as number);
        if (k in churnByDay) churnByDay[k]++;
      }
      const churnDaily = Object.entries(churnByDay).map(([day, n]) => ({ day, n }));
      const thirtyAgo = nowSec - 30 * 86400;
      const churned30 = endedPaid.filter((s) => (s.ended_at as number) > thirtyAgo);

      // Conversion by the month the trial ENDED, and over the last 90 days.
      const convByMonth: Record<string, { ended: number; billed: number }> = {};
      for (const s of trialsEnded) {
        const k = new Date((s.trial_end as number) * 1000).toISOString().slice(0, 7);
        convByMonth[k] ??= { ended: 0, billed: 0 };
        convByMonth[k].ended++;
        if (paidSubscriptionIds.has(s.id)) convByMonth[k].billed++;
      }
      const ended90 = trialsEnded.filter((s) => (s.trial_end as number) > nowSec - 90 * 86400);
      const conversion = {
        d90: {
          ended: ended90.length,
          billed: ended90.filter((s) => paidSubscriptionIds.has(s.id)).length,
        },
        months: Object.entries(convByMonth)
          .sort(([x], [y]) => x.localeCompare(y))
          .slice(-4)
          .map(([month, v]) => ({ month, ...v })),
      };

      // Snapshot the last 31 days of paid churn so the overview's history
      // heals itself on every refresh rather than trusting a single write.
      const { error: snapErr } = await supabase.from('admin_metric_daily').upsert(
        churnDaily.map((r) => ({
          day: r.day,
          stripe_churned_paid: r.n,
          updated_at: new Date().toISOString(),
        })),
        { onConflict: 'day' }
      );
      if (snapErr) console.warn('[ADMIN-STRIPE-STATS] churn snapshot failed', snapErr.message);

      /*
        Behaviour for the SAME cohort as the headline.

        The Trials page derived "what predicts conversion" from
        profiles.trial_end — 158 rows, of which only 17 belong to a
        Stripe-linked profile. It was explaining the 443-trial conversion rate
        using a near-disjoint set of people. Stripe owns the windows and the
        billing outcome, Postgres owns the activity, so the windows go down and
        the behaviour comes back.
      */
      const payload = trialsEnded
        .map((s) => {
          const cust = typeof s.customer === 'string' ? s.customer : s.customer?.id;
          if (!cust || !s.trial_end) return null;
          // Stripe gives trial_start on the subscription; fall back to created.
          const startSec = s.trial_start ?? s.created;
          return {
            c: cust,
            s: new Date(startSec * 1000).toISOString(),
            e: new Date(s.trial_end * 1000).toISOString(),
            b: paidSubscriptionIds.has(s.id),
          };
        })
        .filter(Boolean);

      /*
        The windows are cached; the join runs per request.

        Doing the join inside this function meant it only ever ran on the slow
        path — behind twenty invoice pages — and `EdgeRuntime.waitUntil` never
        got far enough to write the result, so `behaviour` stayed null through
        every attempt. Stripe is the slow half and it is what needs caching;
        the Postgres join over 455 rows takes milliseconds and can happen on
        the way past.
      */
      return {
        windows: payload,
        live: trialingSubscriptions.length,
        ended: trialsEnded.length,
        billed: billed.length,
        stillPaying: stillPaying.length,
        convertedThenChurned: billed.length - stillPaying.length,
        neverBilled: trialsEnded.length - billed.length,
        conversionRate: trialsEnded.length ? (billed.length / trialsEnded.length) * 100 : 0,
        retainedRate: trialsEnded.length ? (stillPaying.length / trialsEnded.length) * 100 : 0,
        conversion,
        churn: {
          months: churnMonths,
          daily: churnDaily,
          last30: {
            count: churned30.length,
            mrrLost: Math.round(churned30.reduce((t, s) => t + monthlyAmountOf(s), 0) * 100) / 100,
          },
        },
      };
    };

    const refreshTrialConversion = async () => {
      const fresh = await computeTrialConversion();
      await supabase
        .from('admin_metric_cache')
        .upsert({ key: TRIAL_CACHE_KEY, value: fresh, updated_at: new Date().toISOString() });
      return fresh;
    };

    const { data: trialCache } = await supabase
      .from('admin_metric_cache')
      .select('value, updated_at')
      .eq('key', TRIAL_CACHE_KEY)
      .maybeSingle();

    let trialConversion;
    if (trialCache?.value) {
      const age = Date.now() - new Date(trialCache.updated_at).getTime();
      if (age > TRIAL_CACHE_FRESH_MS) EdgeRuntime.waitUntil(refreshTrialConversion());
      trialConversion = trialCache.value;
    } else {
      /*
        Cold cache: kick the computation off and answer now.

        Computing inline meant the first caller waited on 20 sequential invoice
        pages plus the behaviour join — around forty seconds — and the browser
        gave up before the upsert ran, so the cache never filled and every load
        started the same doomed walk again. The page renders its "computing"
        state for one refresh instead.
      */
      EdgeRuntime.waitUntil(refreshTrialConversion());
      trialConversion = null;
    }

    // Behaviour is derived per request from the cached Stripe windows: fast,
    // always current against the activity tables, and it cannot be held up by
    // the invoice walk.
    if (trialConversion?.windows) {
      const { data: behaviourRows, error: behaviourError } = await supabase.rpc(
        'get_trial_behaviour',
        { p_trials: trialConversion.windows }
      );
      if (behaviourError) {
        console.warn('[ADMIN-STRIPE-STATS] trial behaviour failed', behaviourError.message);
        trialConversion = { ...trialConversion, behaviour: null };
      } else {
        trialConversion = {
          ...trialConversion,
          behaviour: Array.isArray(behaviourRows) ? behaviourRows[0] : behaviourRows,
        };
      }
      // The window list is an implementation detail, not payload for the page.
      delete (trialConversion as { windows?: unknown }).windows;
    }

    /*
      Trials that have already switched off auto-renew — computed per request,
      never cached.

      `cancel_at_period_end` on a trialing subscription means the person has
      decided to leave while the trial is still running: they keep every feature
      until it expires. That makes them the most valuable name on the admin
      Trials page, and the most time-critical, so it must not be served from a
      thirty-minute cache. It does not need to be: `trialingSubscriptions` is
      re-fetched on every request, and only the invoice walk behind
      `trialConversion` is expensive enough to cache. Putting this inside that
      cached blob meant it never appeared at all — the cached value predated the
      field and `EdgeRuntime.waitUntil` had not managed to refresh it.

      Email is carried so the page can match them to an account: profiles are
      not reliably joined to a Stripe customer id on every signup path, and
      matching on email is what the rest of the admin reconciliation does.
    */
    const cancellingTrials = trialingSubscriptions
      .filter((s) => s.cancel_at_period_end)
      .map((s) => {
        const customer = s.customer as Stripe.Customer;
        return {
          subscriptionId: s.id,
          customerId: typeof s.customer === 'string' ? s.customer : (customer?.id ?? null),
          email: typeof s.customer === 'string' ? null : (customer?.email ?? null),
          trialEnd: s.trial_end ?? null,
          // When they decided, so the page can say "cancelled 2 days ago".
          cancelledAt: s.canceled_at ?? null,
        };
      })
      .sort((a, b) => (a.trialEnd ?? 0) - (b.trialEnd ?? 0));

    trialConversion = { ...(trialConversion ?? {}), cancelling: cancellingTrials };

    // Helper: extract tier and monthly amount from a subscription
    const classifySub = (sub: Stripe.Subscription) => {
      const customer = sub.customer as Stripe.Customer;
      const priceItem = sub.items.data[0];
      const priceId = priceItem.price.id;
      const priceAmount = (priceItem.price.unit_amount || 0) / 100;
      const interval = priceItem.price.recurring?.interval;

      let tier = 'unknown';
      let monthlyAmount = priceAmount;

      if (PRICE_TIER_MAP[priceId]) {
        tier = PRICE_TIER_MAP[priceId].tier;
        monthlyAmount = PRICE_TIER_MAP[priceId].amount;
      } else {
        // Unmapped price ID — do NOT guess the tier. The old amount-based
        // heuristic predated the Jun 2026 price rise and would misbucket a
        // £19.99 Electrician as "employer" and a £6.99 Apprentice as
        // "electrician". MRR stays correct (we use the real amount); the
        // tier is flagged 'unknown' so a new price ID shows up loudly in
        // the admin panel instead of silently polluting a tier's numbers.
        tier = 'unknown';
        monthlyAmount = interval === 'year' ? priceAmount / 12 : priceAmount;
        console.warn('[admin-stripe-stats] Unmapped Stripe price ID — add to PRICE_TIER_MAP', {
          priceId,
          priceAmount,
          interval,
        });
      }

      return {
        subscriptionId: sub.id,
        customerId: customer?.id,
        customerEmail: customer?.email || null,
        customerName: customer?.name?.trim() || null,
        tier,
        priceId,
        priceAmount,
        monthlyAmount,
        interval,
        status: sub.status,
        trialEnd: sub.trial_end ? new Date(sub.trial_end * 1000).toISOString() : null,
        created: new Date(sub.created * 1000).toISOString(),
      };
    };

    // Calculate tier counts and MRR from live Stripe data
    const tierCounts = {
      founder: 0,
      apprentice: 0,
      electrician: 0,
      business_ai: 0,
      employer: 0,
      unknown: 0,
    };

    let mrr = 0;
    /*
      What is actually billed, after coupons.

      `mrr` sums list price and ignores `sub.discount` entirely, so a subscriber
      on the 50% college coupon counts as £6.99 rather than the £3.50 they pay.
      That made the page state two contradictory things at once: MRR £3,042 and
      "£49 given away" — with the £49 sitting inside the £3,042.

      `mrr` is left alone because it is the figure quoted outside this admin and
      changing its definition is not a rendering decision. This is reported
      alongside it so the difference is visible instead of implied.
    */
    let mrrNetOfDiscounts = 0;
    const subscriptionDetails: ReturnType<typeof classifySub>[] = [];

    for (const sub of activeSubscriptions) {
      const detail = classifySub(sub);
      tierCounts[detail.tier as keyof typeof tierCounts]++;
      mrr += detail.monthlyAmount;

      const disc = (sub as unknown as { discount?: Stripe.Discount }).discount;
      const coupon = disc?.coupon;
      if (coupon?.percent_off) {
        mrrNetOfDiscounts += detail.monthlyAmount * (1 - coupon.percent_off / 100);
      } else if (coupon?.amount_off) {
        mrrNetOfDiscounts += Math.max(0, detail.monthlyAmount - coupon.amount_off / 100);
      } else {
        mrrNetOfDiscounts += detail.monthlyAmount;
      }

      subscriptionDetails.push(detail);
    }

    // Calculate trialing tier counts and projected MRR
    const trialingTierCounts = {
      founder: 0,
      apprentice: 0,
      electrician: 0,
      business_ai: 0,
      employer: 0,
      unknown: 0,
    };

    let projectedMrr = 0;
    const trialingDetails: ReturnType<typeof classifySub>[] = [];

    // De-duplicate trialing subs by customer ID (some customers have multiple trials)
    const seenTrialingCustomers = new Set<string>();
    for (const sub of trialingSubscriptions) {
      const detail = classifySub(sub);
      if (seenTrialingCustomers.has(detail.customerId)) continue;
      seenTrialingCustomers.add(detail.customerId);
      trialingTierCounts[detail.tier as keyof typeof trialingTierCounts]++;
      projectedMrr += detail.monthlyAmount;
      trialingDetails.push(detail);
    }

    // Fetch Supabase data for comparison.
    //
    // This selected a non-existent `profiles.email` column and never checked
    // subError, so PostgREST returned 42703, `supabaseSubscribers` came back
    // null, and every derived figure silently collapsed: "0 users subscribed"
    // against a real 459, and a fabricated "269 in Stripe not synced to
    // Supabase" alarm produced purely by an empty customer-id set. The error
    // is now fatal — a revenue reconciliation that cannot read one side of the
    // reconciliation must not render as though it did.
    //
    // Rows carrying a stripe_customer_id are pulled in alongside the
    // subscribers so unnamed Stripe customers can be resolved to a real
    // person; the default 1000-row ceiling would truncate that on its own.
    const { data: profileRows, error: subError } = await supabase
      .from('profiles')
      .select(
        'id, full_name, subscription_tier, subscribed, stripe_customer_id, free_access_granted, subscription_source'
      )
      .or('subscribed.eq.true,stripe_customer_id.not.is.null')
      .limit(5000);

    if (subError) {
      throw new Error(`Could not read profiles for reconciliation: ${subError.message}`);
    }

    const supabaseSubscribers = (profileRows || []).filter((u) => u.subscribed);

    // Stripe customers often have no name on the customer object — 10 of the
    // 12 most recent read "N/A" — but we already know who they are.
    const nameByCustomerId = new Map<string, string>();
    for (const u of profileRows || []) {
      const name = u.full_name?.trim();
      if (u.stripe_customer_id && name) nameByCustomerId.set(u.stripe_customer_id, name);
    }

    // 'N/A' was baked in at classify time, which left the UI nothing to fall
    // back to. Resolve against our own records, and emit null rather than a
    // fake name when nobody knows who this is.
    const withKnownName = <T extends { customerId?: string; customerName: string | null }>(s: T) => {
      const known = s.customerId ? nameByCustomerId.get(s.customerId) : undefined;
      return { ...s, customerName: s.customerName ?? known ?? null };
    };

    const supabaseTierCounts = {
      founder: 0,
      apprentice: 0,
      electrician: 0,
      employer: 0,
      free: 0,
    };

    for (const user of supabaseSubscribers || []) {
      if (user.free_access_granted) {
        supabaseTierCounts.free++;
      } else {
        const tier = user.subscription_tier?.toLowerCase() || 'unknown';
        if (tier in supabaseTierCounts) {
          supabaseTierCounts[tier as keyof typeof supabaseTierCounts]++;
        }
      }
    }

    // Find discrepancies (include both active and trialing Stripe customers)
    const stripeCustomerIds = new Set(
      [...subscriptionDetails, ...trialingDetails].map((s) => s.customerId)
    );
    const supabaseCustomerIds = new Set(
      (supabaseSubscribers || [])
        .filter((u) => u.stripe_customer_id)
        .map((u) => u.stripe_customer_id)
    );

    const inStripeNotSupabase = subscriptionDetails.filter(
      (s) => !supabaseCustomerIds.has(s.customerId)
    );
    // Subscribers billed through the App Store or Play Store are not a Stripe
    // sync failure. 20 of them carry a stripe_customer_id from an earlier trial
    // or web visit, and every one was being counted as "in Supabase without a
    // Stripe link" — inflating the amber "Action needed" panel by roughly half
    // with rows that need no action at all.
    const STORE_BILLED = new Set(['app_store', 'play_store']);
    const inSupabaseNotStripe = (supabaseSubscribers || []).filter(
      (u) =>
        u.stripe_customer_id &&
        !stripeCustomerIds.has(u.stripe_customer_id) &&
        !u.free_access_granted &&
        !STORE_BILLED.has(u.subscription_source ?? '')
    );

    // Today's row of the overview's history line — Stripe's half. The
    // RevenueCat function writes the store half of the same row.
    EdgeRuntime.waitUntil(
      Promise.resolve(
        supabase.from('admin_metric_daily').upsert(
          {
            day: ukDay(),
            stripe_mrr: Math.round(mrr * 100) / 100,
            stripe_paying: activeSubscriptions.length,
            stripe_trialing: trialingSubscriptions.length,
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'day' }
        )
      ).then(({ error }) => {
        if (error) console.warn('[ADMIN-STRIPE-STATS] snapshot failed', error.message);
      })
    );

    /*
      ── The revenue page's four new answers ──────────────────────────────
      All derived from subscription objects already fetched on this request,
      so none of it goes near the cached invoice walk. Live on every load.
    */

    /*
      Who is on what price.

      Keyed by price ID, not by "£9.99/month": two different £9.99 prices exist
      (the legacy Electrician monthly and the win-back), and collapsing them hid
      exactly what this table is for. `belowCurrent` is what a grandfathered
      subscriber is NOT paying against today's list price for their tier — the
      cost of never having migrated them.
    */
    const ladderMap = new Map<
      string,
      {
        priceId: string;
        nickname: string | null;
        unitAmount: number;
        interval: string | null;
        tier: string;
        kind: PriceKind;
        count: number;
        mrr: number;
        belowCurrent: number;
      }
    >();
    for (const sub of activeSubscriptions) {
      const d = classifySub(sub);
      const existing = ladderMap.get(d.priceId);
      const currentForTier = CURRENT_MONTHLY_BY_TIER[d.tier];
      // Only a shortfall, never a bonus: somebody above list price is not a gap.
      const gap =
        currentForTier && d.monthlyAmount < currentForTier
          ? currentForTier - d.monthlyAmount
          : 0;
      if (existing) {
        existing.count += 1;
        existing.mrr += d.monthlyAmount;
        existing.belowCurrent += gap;
      } else {
        const priceObj = sub.items.data[0]?.price as Stripe.Price | undefined;
        ladderMap.set(d.priceId, {
          priceId: d.priceId,
          nickname: priceObj?.nickname ?? null,
          unitAmount: d.priceAmount,
          interval: d.interval ?? null,
          tier: d.tier,
          kind: priceKind(d.priceId),
          count: 1,
          mrr: d.monthlyAmount,
          belowCurrent: gap,
        });
      }
    }
    const priceLadder = [...ladderMap.values()]
      .map((r) => ({
        ...r,
        mrr: Math.round(r.mrr * 100) / 100,
        belowCurrent: Math.round(r.belowCurrent * 100) / 100,
      }))
      .sort((a, b) => b.mrr - a.mrr);

    /*
      Everyone on a discount, and what it costs a month.

      `discountedMrr` is what they actually pay; `listMrr` is what the price
      says. The difference is the standing monthly cost of the coupons in play
      (college 50% codes, retention offers), which nothing reported before.
    */
    const discounted = activeSubscriptions
      .filter((sub) => !!(sub as { discount?: unknown }).discount)
      .map((sub) => {
        const d = classifySub(sub);
        const disc = (sub as unknown as { discount: Stripe.Discount }).discount;
        const coupon = disc?.coupon;
        const percentOff = coupon?.percent_off ?? null;
        const amountOff = coupon?.amount_off ? coupon.amount_off / 100 : null;
        const actual = percentOff
          ? d.monthlyAmount * (1 - percentOff / 100)
          : amountOff
            ? Math.max(0, d.monthlyAmount - amountOff)
            : d.monthlyAmount;
        return {
          subscriptionId: d.subscriptionId,
          customerId: d.customerId ?? null,
          email: d.customerEmail,
          tier: d.tier,
          couponId: coupon?.id ?? null,
          couponName: coupon?.name ?? null,
          promotionCode:
            typeof disc?.promotion_code === 'string' ? disc.promotion_code : null,
          percentOff,
          amountOff,
          listMrr: Math.round(d.monthlyAmount * 100) / 100,
          actualMrr: Math.round(actual * 100) / 100,
          forgoneMrr: Math.round((d.monthlyAmount - actual) * 100) / 100,
          // A repeating coupon keeps costing; a one-off does not.
          duration: coupon?.duration ?? null,
          endsAt: disc?.end ? new Date(disc.end * 1000).toISOString() : null,
        };
      })
      .sort((a, b) => b.forgoneMrr - a.forgoneMrr);

    /*
      Annual subscriptions renewing soon.

      A yearly plan contributes a twelfth of its price to MRR every month and
      then either renews as one lump or vanishes. Knowing which ones are due,
      and for how much, is the difference between a forecast and a surprise.
    */
    /*
      Twelve months, not ninety days.

      Every annual subscription on the book renews between 146 and 252 days
      out, so a ninety-day horizon rendered an empty panel and would have gone
      on doing so for months — a section that can only ever say "nothing" is
      worse than no section. A year covers the whole book and the UI buckets it.
    */
    const renewalHorizonSec = nowSec + 365 * 86400;
    const upcomingRenewals = activeSubscriptions
      .filter((sub) => {
        const iv = sub.items.data[0]?.price?.recurring?.interval;
        const end = (sub as unknown as { current_period_end?: number }).current_period_end;
        return iv === 'year' && !!end && end <= renewalHorizonSec;
      })
      .map((sub) => {
        const d = classifySub(sub);
        const end = (sub as unknown as { current_period_end: number }).current_period_end;
        return {
          subscriptionId: d.subscriptionId,
          email: d.customerEmail,
          tier: d.tier,
          // The lump they will actually be charged, not the monthly twelfth.
          amount: d.priceAmount,
          renewsAt: new Date(end * 1000).toISOString(),
          daysAway: Math.max(0, Math.round((end - nowSec) / 86400)),
          willCancel: !!sub.cancel_at_period_end,
        };
      })
      .sort((a, b) => a.daysAway - b.daysAway);

    /*
      Money failing right now — recoverable, unlike a cancellation.
    */
    const atRisk = failingSubscriptions.map((sub) => {
      const d = classifySub(sub);
      return {
        subscriptionId: d.subscriptionId,
        customerId: d.customerId ?? null,
        email: d.customerEmail,
        tier: d.tier,
        status: sub.status,
        monthlyAmount: Math.round(d.monthlyAmount * 100) / 100,
        // When they became a customer — NOT when the payment started failing.
        // Stripe does not expose a "went past due at"; the closest honest proxy
        // is the period they have failed to pay for, sent alongside so the UI
        // can say which is which rather than implying a seven-month dunning.
        customerSince: new Date(sub.created * 1000).toISOString(),
        periodStart: (sub as unknown as { current_period_start?: number }).current_period_start
          ? new Date(
              (sub as unknown as { current_period_start: number }).current_period_start * 1000
            ).toISOString()
          : null,
      };
    });

    /*
      Every offer we run, with its take-up.

      Grouped by coupon, with the promotion codes issued against it counted
      alongside. `timesRedeemed` on the coupon and on its codes are different
      numbers: a coupon can be applied to a subscription directly, without
      anybody typing a code. The win-back coupons show 29 coupon redemptions
      against 18 code redemptions for exactly that reason, so both are carried
      rather than picking whichever looked better.
    */
    const codesByCoupon = new Map<string, Stripe.PromotionCode[]>();
    for (const pc of allPromoCodes) {
      const cid = typeof pc.coupon === 'string' ? pc.coupon : pc.coupon?.id;
      if (!cid) continue;
      const list = codesByCoupon.get(cid);
      if (list) list.push(pc);
      else codesByCoupon.set(cid, [pc]);
    }

    // Live discount usage, so an offer can report what it is costing today
    // rather than only how many people ever took it.
    const activeByCoupon = new Map<string, { subs: number; forgoneMrr: number }>();
    for (const d of discounted) {
      if (!d.couponId) continue;
      const cur = activeByCoupon.get(d.couponId) ?? { subs: 0, forgoneMrr: 0 };
      cur.subs += 1;
      cur.forgoneMrr += d.forgoneMrr;
      activeByCoupon.set(d.couponId, cur);
    }

    /*
      Per-code take-up for the college scheme.

      Every other scheme is readable at the coupon level, but the college one is
      161 codes across 159 colleges and the only question worth asking is WHICH
      college has used theirs. `promo_offers.redemptions` cannot answer it — that
      column is written once at creation and never updated, so it reads 0
      everywhere while Stripe has a redemption on KENDAL50. Stripe is the truth.
    */
    const collegeCouponIds = new Set(
      allCoupons
        .filter((c) => offerScheme(c.id, c.name ?? null) === 'college')
        .map((c) => c.id)
    );
    const collegeCodes = allPromoCodes
      .filter((pc) => {
        const cid = typeof pc.coupon === 'string' ? pc.coupon : pc.coupon?.id;
        return cid ? collegeCouponIds.has(cid) : false;
      })
      .map((pc) => ({
        code: pc.code,
        redeemed: pc.times_redeemed ?? 0,
        active: !!pc.active,
      }))
      .sort((a, b) => b.redeemed - a.redeemed || a.code.localeCompare(b.code));

    const offers = allCoupons
      .map((c) => {
        const codes = codesByCoupon.get(c.id) ?? [];
        const live = activeByCoupon.get(c.id);
        return {
          couponId: c.id,
          name: c.name ?? null,
          scheme: offerScheme(c.id, c.name ?? null),
          percentOff: c.percent_off ?? null,
          amountOff: c.amount_off ? c.amount_off / 100 : null,
          duration: c.duration ?? null,
          durationMonths: c.duration_in_months ?? null,
          valid: !!c.valid,
          timesRedeemed: c.times_redeemed ?? 0,
          maxRedemptions: c.max_redemptions ?? null,
          codesIssued: codes.length,
          codesRedeemed: codes.reduce((t, pc) => t + (pc.times_redeemed ?? 0), 0),
          activeSubs: live?.subs ?? 0,
          activeForgoneMrr: Math.round((live?.forgoneMrr ?? 0) * 100) / 100,
        };
      })
      .sort((a, b) => b.timesRedeemed - a.timesRedeemed || b.codesIssued - a.codesIssued);

    /*
      Roll the offers up by scheme.

      One "Referral: Free first month" coupon per referrer means 24 near
      identical rows that say nothing individually; the scheme total is the
      readable unit, and the page expands to the rows underneath.
    */
    const schemeMap = new Map<
      OfferScheme,
      {
        scheme: OfferScheme;
        coupons: number;
        codesIssued: number;
        redeemed: number;
        activeSubs: number;
        activeForgoneMrr: number;
      }
    >();
    for (const o of offers) {
      const cur =
        schemeMap.get(o.scheme) ??
        {
          scheme: o.scheme,
          coupons: 0,
          codesIssued: 0,
          redeemed: 0,
          activeSubs: 0,
          activeForgoneMrr: 0,
        };
      cur.coupons += 1;
      cur.codesIssued += o.codesIssued;
      cur.redeemed += o.timesRedeemed;
      cur.activeSubs += o.activeSubs;
      cur.activeForgoneMrr += o.activeForgoneMrr;
      schemeMap.set(o.scheme, cur);
    }
    const offerSchemes = [...schemeMap.values()]
      .map((s) => ({ ...s, activeForgoneMrr: Math.round(s.activeForgoneMrr * 100) / 100 }))
      .sort((a, b) => b.redeemed - a.redeemed);

    /*
      Gross cash in, all time and by day.

      A full walk of `charges` is 27 pages / ~2,700 rows and takes seconds, so
      this is real money counted rather than MRR extrapolated. Refunds are
      subtracted; failed and uncaptured charges are excluded.

      Cached for six hours and computed INLINE on a miss, never through
      `EdgeRuntime.waitUntil` — the trial-conversion cache showed that the
      runtime kills the deferred work before the upsert lands, so a field added
      that way can go missing indefinitely. Blocking on the cold path is slower
      once; a cache that never fills is wrong forever.
    */
    const GROSS_CACHE_KEY = 'stripe_gross_history';
    const GROSS_FRESH_MS = 6 * 60 * 60 * 1000;

    let grossPayload: {
      allTime: number;
      refunded: number;
      charges: number;
      firstChargeAt: string | null;
      daily: Array<{ day: string; amount: number }>;
    } | null = null;

    const { data: grossCache } = await supabase
      .from('admin_metric_cache')
      .select('value, updated_at')
      .eq('key', GROSS_CACHE_KEY)
      .maybeSingle();

    const grossFresh =
      grossCache?.value &&
      Date.now() - new Date(grossCache.updated_at).getTime() < GROSS_FRESH_MS;

    if (grossFresh) {
      grossPayload = grossCache.value as typeof grossPayload;
    } else {
      const byDay = new Map<string, number>();
      let allTime = 0;
      let refunded = 0;
      let chargeCount = 0;
      let firstChargeSec: number | null = null;

      let grossHasMore = true;
      let grossCursor: string | undefined;
      // A hard page ceiling so a runaway account can never hang the request.
      for (let page = 0; page < 120 && grossHasMore; page++) {
        const batch: Stripe.ApiList<Stripe.Charge> = await stripe.charges.list({
          limit: 100,
          ...(grossCursor ? { starting_after: grossCursor } : {}),
        });
        for (const c of batch.data) {
          if (c.status !== 'succeeded' || !c.paid) continue;
          const net = c.amount - (c.amount_refunded ?? 0);
          allTime += net;
          refunded += c.amount_refunded ?? 0;
          chargeCount += 1;
          firstChargeSec = c.created;
          const day = ukDay(c.created);
          byDay.set(day, (byDay.get(day) ?? 0) + net);
        }
        grossHasMore = batch.has_more;
        if (batch.data.length > 0) grossCursor = batch.data[batch.data.length - 1].id;
      }

      grossPayload = {
        allTime: Math.round(allTime) / 100,
        refunded: Math.round(refunded) / 100,
        charges: chargeCount,
        firstChargeAt: firstChargeSec ? new Date(firstChargeSec * 1000).toISOString() : null,
        daily: [...byDay.entries()]
          .map(([day, amount]) => ({ day, amount: Math.round(amount) / 100 }))
          .sort((a, b) => a.day.localeCompare(b.day)),
      };

      await supabase
        .from('admin_metric_cache')
        .upsert({
          key: GROSS_CACHE_KEY,
          value: grossPayload,
          updated_at: new Date().toISOString(),
        });
    }

    const response = {
      stripe: {
        activeSubscriptions: activeSubscriptions.length,
        trialingSubscriptions: trialingDetails.length,
        canceledLast30Days: canceledLast30.length,
        canceledLast14Days: canceledLast14.length,
        tierCounts,
        trialingTierCounts,
        mrr: Math.round(mrr * 100) / 100,
        /** Same subscribers, after their coupons. See the note at the sum. */
        mrrNetOfDiscounts: Math.round(mrrNetOfDiscounts * 100) / 100,
        projectedMrr: Math.round((mrr + projectedMrr) * 100) / 100,
        // Kept for existing callers. `priceLadder` below is the one to read:
        // this key collapses two different £9.99 prices into one bucket.
        subscriptionsByPrice: subscriptionDetails.reduce(
          (acc, sub) => {
            const key = `£${sub.priceAmount}/${sub.interval}`;
            acc[key] = (acc[key] || 0) + 1;
            return acc;
          },
          {} as Record<string, number>
        ),
      },
      priceLadder,
      discounts: {
        rows: discounted,
        count: discounted.length,
        forgoneMrr: Math.round(discounted.reduce((t, d) => t + d.forgoneMrr, 0) * 100) / 100,
      },
      renewals: {
        rows: upcomingRenewals,
        count: upcomingRenewals.length,
        next90: upcomingRenewals.filter((r) => r.daysAway <= 90).length,
        next90Amount:
          Math.round(
            upcomingRenewals
              .filter((r) => r.daysAway <= 90)
              .reduce((t, r) => t + r.amount, 0) * 100
          ) / 100,
        // Everything on the book over the next year, and how much of it has
        // already been switched off.
        yearAmount:
          Math.round(upcomingRenewals.reduce((t, r) => t + r.amount, 0) * 100) / 100,
        willCancel: upcomingRenewals.filter((r) => r.willCancel).length,
      },
      gross: {
        ...grossPayload,
        asOf: grossFresh ? grossCache!.updated_at : new Date().toISOString(),
      },
      offers: {
        rows: offers,
        schemes: offerSchemes,
        totalCoupons: offers.length,
        totalCodes: allPromoCodes.length,
        collegeCodes,
      },
      atRisk: {
        rows: atRisk,
        count: atRisk.length,
        mrr: Math.round(atRisk.reduce((t, r) => t + r.monthlyAmount, 0) * 100) / 100,
      },
      /*
        Like-for-like movement, both windows, Stripe only.

        `startedNet` is the number to read: starts minus cancellations over the
        same window, both counted the same way. `canceledNeverPaid` splits out
        the trials that never converted, which are not paying-customer churn.
        Mobile is absent — RevenueCat does not expose per-window movement here,
        and the UI says so rather than implying these cover every rail.
      */
      /*
        Two rates, because they answer two different questions:
        `conversionRate` is did the trial work, `retainedRate` is did it stick.
      */
      trials: trialConversion,
      movement: {
        started14: startedLast14.length,
        started30: startedLast30.length,
        canceled14: canceledLast14.length,
        canceled30: canceledLast30.length,
        canceledNeverPaid14: neverPaid(canceledLast14).length,
        canceledNeverPaid30: neverPaid(canceledLast30).length,
        // Gross new MRR by day, INCLUDING subscriptions that have since
        // cancelled — the chart is "what started", not "what survived".
        startsLast14: startedLast14.map((s) => ({
          created: new Date(s.created * 1000).toISOString(),
          monthlyAmount: classifySub(s).monthlyAmount,
          stillActive: s.status === 'active',
        })),
      },
      supabase: {
        subscribedUsers: (supabaseSubscribers || []).length,
        tierCounts: supabaseTierCounts,
        withStripeId: (supabaseSubscribers || []).filter((u) => u.stripe_customer_id).length,
        withoutStripeId: (supabaseSubscribers || []).filter(
          (u) => !u.stripe_customer_id && !u.free_access_granted
        ).length,
      },
      discrepancies: {
        inStripeNotSupabase: inStripeNotSupabase.length,
        inSupabaseNotStripe: inSupabaseNotStripe.length,
        details: {
          stripeOnly: inStripeNotSupabase.map((s) => ({
            email: s.customerEmail,
            tier: s.tier,
            amount: `£${s.priceAmount}`,
          })),
          // No email here: `profiles` has no email column. It lives on
          // auth.users, which this reconciliation has no reason to read.
          supabaseOnly: inSupabaseNotStripe.map((u) => ({
            userId: u.id,
            name: u.full_name,
            tier: u.subscription_tier,
            stripeCustomerId: u.stripe_customer_id,
          })),
        },
      },
      // Full subscription lists for detailed view
      subscriptions: subscriptionDetails.map(withKnownName),
      trialingList: trialingDetails.map(withKnownName),
      generatedAt: new Date().toISOString(),
    };

    console.log('[ADMIN-STRIPE-STATS] Generated stats:', {
      stripeActive: response.stripe.activeSubscriptions,
      stripeTrialing: response.stripe.trialingSubscriptions,
      stripeMRR: response.stripe.mrr,
      projectedMRR: response.stripe.projectedMrr,
      supabaseSubscribed: response.supabase.subscribedUsers,
      discrepancies:
        response.discrepancies.inStripeNotSupabase + response.discrepancies.inSupabaseNotStripe,
    });

    /*
      Fill the cache every time real work is done, so the next reader — page
      load or background refresh — is answered from Postgres in milliseconds.
    */
    const { error: cacheErr } = await supabase.from('admin_metric_cache').upsert({
      key: OVERVIEW_CACHE_KEY,
      value: response,
      updated_at: new Date().toISOString(),
    });
    if (cacheErr) console.error('[ADMIN-STRIPE-STATS] cache upsert failed:', cacheErr.message);

    return new Response(
      JSON.stringify({ ...response, cachedAt: new Date().toISOString(), servedFromCache: false }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: unknown) {
    await captureException(error, { functionName: 'admin-stripe-stats', requestUrl: req.url, requestMethod: req.method });
    console.error('[ADMIN-STRIPE-STATS] Error:', error);
    const message = error instanceof Error ? error.message : String(error);
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
