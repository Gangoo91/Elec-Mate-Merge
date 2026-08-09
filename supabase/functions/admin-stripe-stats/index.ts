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

    console.log('[ADMIN-STRIPE-STATS] Access granted for user:', user.id);

    // Initialize Stripe
    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');
    if (!stripeKey) {
      throw new Error('STRIPE_SECRET_KEY not configured');
    }

    const stripe = new Stripe(stripeKey, { apiVersion: '2023-10-16' });

    // Fetch all active subscriptions from Stripe
    const activeSubscriptions: Stripe.Subscription[] = [];
    let hasMore = true;
    let startingAfter: string | undefined;

    while (hasMore) {
      const batch = await stripe.subscriptions.list({
        status: 'active',
        limit: 100,
        expand: ['data.customer', 'data.items.data.price'],
        ...(startingAfter && { starting_after: startingAfter }),
      });

      activeSubscriptions.push(...batch.data);
      hasMore = batch.has_more;
      if (batch.data.length > 0) {
        startingAfter = batch.data[batch.data.length - 1].id;
      }
    }

    // Fetch all trialing subscriptions from Stripe
    const trialingSubscriptions: Stripe.Subscription[] = [];
    hasMore = true;
    startingAfter = undefined;

    while (hasMore) {
      const batch = await stripe.subscriptions.list({
        status: 'trialing',
        limit: 100,
        expand: ['data.customer', 'data.items.data.price'],
        ...(startingAfter && { starting_after: startingAfter }),
      });

      trialingSubscriptions.push(...batch.data);
      hasMore = batch.has_more;
      if (batch.data.length > 0) {
        startingAfter = batch.data[batch.data.length - 1].id;
      }
    }

    // Churn, by when the subscription was CANCELLED.
    //
    // This filtered `created: { gte: thirtyDaysAgo }`, which counts something
    // else entirely: subscriptions *started* in the last 30 days that have
    // since cancelled. Anyone who signed up in January and left last week was
    // invisible, so churn read 41 against a true 70 — and 41 was rendered
    // inside a card headed "Last 14 Days", where the honest figure is 36.
    //
    // Stripe has no canceled_at filter on subscriptions.list, so the cancelled
    // set is walked and filtered here. It also has to be paginated: the single
    // limit:100 page silently capped the count once we passed 100 cancellations
    // (there are 342), and the newest-created-first ordering meant the page
    // held precisely the wrong ones — recent signups, not recent leavers.
    const nowSec = Math.floor(Date.now() / 1000);
    const thirtyDaysAgo = nowSec - 30 * 24 * 60 * 60;
    const fourteenDaysAgo = nowSec - 14 * 24 * 60 * 60;

    const canceledAll: Stripe.Subscription[] = [];
    let cancelCursor: string | undefined;
    while (canceledAll.length < 3000) {
      const page = await stripe.subscriptions.list({
        status: 'canceled',
        limit: 100,
        ...(cancelCursor ? { starting_after: cancelCursor } : {}),
      });
      canceledAll.push(...page.data);
      if (!page.has_more || page.data.length === 0) break;
      cancelCursor = page.data[page.data.length - 1].id;
    }

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
          if (subId && (inv.amount_paid || 0) > 0) paidSubscriptionIds.add(subId);
        }
        if (!page.has_more || page.data.length === 0) break;
        invoiceCursor = page.data[page.data.length - 1].id;
      }
      const billed = trialsEnded.filter((s) => paidSubscriptionIds.has(s.id));
      const stillPaying = billed.filter((s) => s.status === 'active');

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
    const subscriptionDetails: ReturnType<typeof classifySub>[] = [];

    for (const sub of activeSubscriptions) {
      const detail = classifySub(sub);
      tierCounts[detail.tier as keyof typeof tierCounts]++;
      mrr += detail.monthlyAmount;
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

    const response = {
      stripe: {
        activeSubscriptions: activeSubscriptions.length,
        trialingSubscriptions: trialingDetails.length,
        canceledLast30Days: canceledLast30.length,
        canceledLast14Days: canceledLast14.length,
        tierCounts,
        trialingTierCounts,
        mrr: Math.round(mrr * 100) / 100,
        projectedMrr: Math.round((mrr + projectedMrr) * 100) / 100,
        // Include breakdown by actual price amount
        subscriptionsByPrice: subscriptionDetails.reduce(
          (acc, sub) => {
            const key = `£${sub.priceAmount}/${sub.interval}`;
            acc[key] = (acc[key] || 0) + 1;
            return acc;
          },
          {} as Record<string, number>
        ),
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

    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
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
