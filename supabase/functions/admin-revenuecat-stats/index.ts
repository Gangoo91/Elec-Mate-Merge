import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { createClient } from 'jsr:@supabase/supabase-js@2';
import { captureException } from '../_shared/sentry.ts';

// Supabase edge runtime global — lets work continue after the response is sent.
declare const EdgeRuntime: { waitUntil(p: Promise<unknown>): void };


const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

type RcMetrics = {
  mrr: number;
  revenue: number;
  activeSubscriptions: number;
  activeTrials: number;
};

const RC_CACHE_KEY = 'revenuecat_overview';
const RC_CACHE_FRESH_MS = 10 * 60 * 1000;

async function fetchRcOverview(): Promise<RcMetrics | null> {
  const rcApiKey = Deno.env.get('REVENUECAT_API_V2_KEY');
  if (!rcApiKey) return null;
  try {
    const res = await fetch(
      'https://api.revenuecat.com/v2/projects/proj5dd5e597/metrics/overview?currency=GBP',
      { headers: { Authorization: `Bearer ${rcApiKey}`, 'Content-Type': 'application/json' } }
    );
    if (!res.ok) {
      console.warn('RevenueCat API returned', res.status, await res.text());
      return null;
    }
    const data = await res.json();
    const metrics: RcMetrics = { mrr: 0, revenue: 0, activeSubscriptions: 0, activeTrials: 0 };
    for (const m of data.metrics || []) {
      if (m.id === 'mrr') metrics.mrr = m.value || 0;
      if (m.id === 'revenue') metrics.revenue = m.value || 0;
      if (m.id === 'active_subscriptions') metrics.activeSubscriptions = m.value || 0;
      if (m.id === 'active_trials') metrics.activeTrials = m.value || 0;
    }
    return metrics;
  } catch (e) {
    console.warn('RevenueCat API call failed (non-fatal):', e);
    return null;
  }
}

type RcChurn = {
  months: Array<{ month: string; payingAtStart: number; churned: number; complete: boolean }>;
  daily: Array<{ day: string; n: number }>;
  /*
    Trial outcomes by the month the trial STARTED (RevenueCat buckets them
    that way; Stripe's are by the month the trial ended). `pending` trials
    have neither converted nor expired yet, so a rate for a recent month
    should divide by conversions + expirations, not by starts.
  */
  trials: Array<{
    month: string;
    starts: number;
    conversions: number;
    expirations: number;
    pending: number;
  }>;
  /** MRR movement by month, GBP: why the store MRR moved. */
  movement: Array<{
    month: string;
    newMrr: number;
    resubMrr: number;
    expansionMrr: number;
    churnedMrr: number;
    contractionMrr: number;
    net: number;
  }>;
};

const RC_CHURN_CACHE_KEY = 'revenuecat_churn';
const RC_CHURN_FRESH_MS = 6 * 60 * 60 * 1000;

/*
  Paid churn from RevenueCat's own churn chart.

  The chart's "Churned Actives" is paid subscriptions that expired without
  renewing — trials that lapsed are not in it, which is exactly the number the
  overview wants. Two calls: daily buckets for the sparkline and the last 31
  days, monthly buckets for the rate. Both are UTC-bucketed by RevenueCat.
  If the key cannot read charts the function returns null and the page says
  the churn figure is Stripe-only rather than pretending.
*/
async function fetchRcChurn(): Promise<RcChurn | null> {
  const rcApiKey = Deno.env.get('REVENUECAT_API_V2_KEY');
  if (!rcApiKey) return null;
  const iso = (d: Date) => d.toISOString().slice(0, 10);
  const now = new Date();
  const dailyStart = new Date(now.getTime() - 31 * 86400 * 1000);
  const monthStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 3, 1));
  const get = async (resolution: string, start: Date, chart = 'churn', extra = '') => {
    const url =
      `https://api.revenuecat.com/v2/projects/proj5dd5e597/charts/${chart}` +
      `?resolution=${resolution}&start_date=${iso(start)}&end_date=${iso(now)}${extra}`;
    const res = await fetch(url, { headers: { Authorization: `Bearer ${rcApiKey}` } });
    if (!res.ok) {
      console.warn('RevenueCat churn chart returned', res.status, await res.text());
      return null;
    }
    return (await res.json()) as {
      values?: Array<{ cohort: number; incomplete?: boolean; measure: number; value: number }>;
    };
  };
  try {
    const [daily, monthly, trialMonthly, movementMonthly] = await Promise.all([
      get('0', dailyStart),
      get('2', monthStart),
      get('2', monthStart, 'trial_conversion_rate'),
      get('2', monthStart, 'mrr_movement', '&currency=GBP'),
    ]);
    if (!daily?.values || !monthly?.values) return null;
    const trials: Record<
      string,
      { starts: number; conversions: number; expirations: number; pending: number }
    > = {};
    for (const v of trialMonthly?.values ?? []) {
      const k = new Date(v.cohort * 1000).toISOString().slice(0, 7);
      trials[k] ??= { starts: 0, conversions: 0, expirations: 0, pending: 0 };
      if (v.measure === 0) trials[k].starts = v.value;
      if (v.measure === 1) trials[k].conversions = v.value;
      if (v.measure === 2) trials[k].expirations = v.value;
      if (v.measure === 3) trials[k].pending = v.value;
    }
    const dailyMap: Record<string, number> = {};
    for (const v of daily.values) {
      if (v.measure !== 1) continue;
      dailyMap[new Date(v.cohort * 1000).toISOString().slice(0, 10)] = Math.max(0, v.value);
    }
    const months: Record<string, { payingAtStart: number; churned: number; complete: boolean }> =
      {};
    for (const v of monthly.values) {
      const k = new Date(v.cohort * 1000).toISOString().slice(0, 7);
      months[k] ??= { payingAtStart: 0, churned: 0, complete: !v.incomplete };
      if (v.measure === 0) months[k].payingAtStart = v.value;
      if (v.measure === 1) months[k].churned = Math.max(0, v.value);
    }
    const movement: Record<string, number[]> = {};
    for (const v of movementMonthly?.values ?? []) {
      const k = new Date(v.cohort * 1000).toISOString().slice(0, 7);
      movement[k] ??= [0, 0, 0, 0, 0, 0];
      if (v.measure >= 0 && v.measure <= 5) movement[k][v.measure] = v.value;
    }
    return {
      movement: Object.entries(movement)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([month, m]) => ({
          month,
          newMrr: m[0],
          resubMrr: m[1],
          expansionMrr: m[2],
          churnedMrr: m[3],
          contractionMrr: m[4],
          net: m[5],
        })),
      daily: Object.entries(dailyMap)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([day, n]) => ({ day, n })),
      months: Object.entries(months)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([month, m]) => ({ month, ...m })),
      trials: Object.entries(trials)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([month, t]) => ({ month, ...t })),
    };
  } catch (e) {
    console.warn('RevenueCat churn chart failed (non-fatal):', e);
    return null;
  }
}

// deno-lint-ignore no-explicit-any
async function getRcChurn(admin: any): Promise<RcChurn | null> {
  const { data: cached } = await admin
    .from('admin_metric_cache')
    .select('value, updated_at')
    .eq('key', RC_CHURN_CACHE_KEY)
    .maybeSingle();

  const refresh = async () => {
    const fresh = await fetchRcChurn();
    if (fresh) {
      await admin
        .from('admin_metric_cache')
        .upsert({ key: RC_CHURN_CACHE_KEY, value: fresh, updated_at: new Date().toISOString() });
      // The store half of the overview's daily history.
      await admin.from('admin_metric_daily').upsert(
        fresh.daily.map((r) => ({
          day: r.day,
          rc_churned_paid: r.n,
          updated_at: new Date().toISOString(),
        })),
        { onConflict: 'day' }
      );
    }
    return fresh;
  };

  if (cached?.value) {
    const age = Date.now() - new Date(cached.updated_at).getTime();
    if (age > RC_CHURN_FRESH_MS) EdgeRuntime.waitUntil(refresh());
    return cached.value as RcChurn;
  }
  // Cold: answer without it, fill behind the response.
  EdgeRuntime.waitUntil(refresh());
  return null;
}

// RevenueCat's /metrics/overview takes ~10s per call and only recomputes
// periodically, so serve it stale-while-revalidate from admin_metric_cache:
// fresh cache → return it; stale cache → return it and refresh after the
// response has gone out; no cache → fetch inline (first call only).
// deno-lint-ignore no-explicit-any
async function getRcMetrics(admin: any): Promise<RcMetrics> {
  const zero: RcMetrics = { mrr: 0, revenue: 0, activeSubscriptions: 0, activeTrials: 0 };

  const { data: cached } = await admin
    .from('admin_metric_cache')
    .select('value, updated_at')
    .eq('key', RC_CACHE_KEY)
    .maybeSingle();

  const refresh = async () => {
    const fresh = await fetchRcOverview();
    if (fresh) {
      await admin
        .from('admin_metric_cache')
        .upsert({ key: RC_CACHE_KEY, value: fresh, updated_at: new Date().toISOString() });
    }
    return fresh;
  };

  if (cached?.value) {
    const age = Date.now() - new Date(cached.updated_at).getTime();
    if (age > RC_CACHE_FRESH_MS) EdgeRuntime.waitUntil(refresh());
    return cached.value as RcMetrics;
  }

  return (await refresh()) ?? zero;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Verify admin
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) throw new Error('No authorization header');

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    );

    // The nightly snapshot job (pg_cron) calls with the service-role key and has no user.
    const scheduled =
      authHeader.replace('Bearer ', '') === (Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '__');
    if (!scheduled) {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError || !user) throw new Error('Unauthorised');

      const { data: profile } = await supabase
        .from('profiles')
        .select('admin_role')
        .eq('id', user.id)
        .single();

      if (!profile || !['super_admin', 'admin'].includes(profile.admin_role)) {
        throw new Error('Admin access required');
      }
    }

    // Use service role for full data access
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Start the (cached) RevenueCat lookup now so it overlaps the DB work
    // below instead of running after it.
    const rcMetricsPromise = getRcMetrics(supabaseAdmin);
    const rcChurnPromise = getRcChurn(supabaseAdmin);

    // Fetch all subscribed/trial/free users with full detail
    const { data: subscribers, error: subErr } = await supabaseAdmin
      .from('profiles')
      .select(
        'id, full_name, username, role, subscription_source, subscription_tier, subscribed, free_access_granted, subscription_end, is_trial, is_trial_cancelled, trial_end, created_at'
      )
      .or('subscribed.eq.true,free_access_granted.eq.true');

    if (subErr) throw new Error(`DB error: ${subErr.message}`);

    // Count by source
    const bySource: Record<string, number> = { stripe: 0, app_store: 0, play_store: 0, free: 0 };
    const tiersBySource: Record<string, Record<string, number>> = {
      stripe: {},
      app_store: {},
      play_store: {},
      free: {},
    };

    // Engagement data shape attached to each user
    type EngagementData = {
      login_count: number;
      page_view_count: number;
      total_seconds_tracked: number;
      feature_use_count: number;
      active_days: number;
      unique_pages_visited: number;
      last_activity: string | null;
    } | null;

    // Separate trials from paid
    const trialUsers: Array<{
      id: string;
      full_name: string;
      username: string;
      role: string;
      subscription_tier: string;
      subscription_source: string;
      trial_end: string | null;
      is_cancelled: boolean;
      created_at: string;
      engagement: EngagementData;
    }> = [];

    const paidUsers: Array<{
      id: string;
      full_name: string;
      username: string;
      role: string;
      subscription_tier: string;
      subscription_source: string;
      subscription_end: string | null;
      created_at: string;
      engagement: EngagementData;
    }> = [];

    // Collect all subscriber IDs for engagement lookup
    const subscriberIds = (subscribers || []).map((s) => s.id);

    // Fetch engagement data for all subscribers in one query
    const engagementMap: Record<
      string,
      {
        login_count: number;
        page_view_count: number;
        total_seconds_tracked: number;
        feature_use_count: number;
        active_days: number;
        unique_pages_visited: number;
        last_activity: string | null;
      }
    > = {};

    if (subscriberIds.length > 0) {
      const { data: engagementRows } = await supabaseAdmin
        .from('user_activity_summary')
        .select(
          'user_id, login_count, page_view_count, total_seconds_tracked, feature_use_count, active_days, unique_pages_visited, last_activity'
        )
        .in('user_id', subscriberIds);

      for (const row of engagementRows || []) {
        engagementMap[row.user_id] = {
          login_count: row.login_count || 0,
          page_view_count: row.page_view_count || 0,
          total_seconds_tracked: row.total_seconds_tracked || 0,
          feature_use_count: row.feature_use_count || 0,
          active_days: row.active_days || 0,
          unique_pages_visited: row.unique_pages_visited || 0,
          last_activity: row.last_activity || null,
        };
      }

      // Subscribers with no activity in the last 30 days are absent from the
      // (30-day) view above, so their engagement ring would show a misleading 0
      // — common for App Store/Play Store subs who haven't opened the app in a
      // while. Backfill them from lifetime engagement so every paying user shows
      // a real score instead of a blank zero.
      const missingIds = subscriberIds.filter((id) => !engagementMap[id]);
      if (missingIds.length > 0) {
        const { data: lifetimeRows } = await supabaseAdmin.rpc('get_lifetime_engagement', {
          p_user_ids: missingIds,
        });
        for (const row of lifetimeRows || []) {
          engagementMap[row.user_id] = {
            login_count: row.login_count || 0,
            page_view_count: row.page_view_count || 0,
            total_seconds_tracked: row.total_seconds_tracked || 0,
            feature_use_count: row.feature_use_count || 0,
            active_days: row.active_days || 0,
            unique_pages_visited: row.unique_pages_visited || 0,
            last_activity: row.last_activity || null,
          };
        }
      }
    }

    for (const sub of subscribers || []) {
      // Free-access comp accounts never count as paid, regardless of the
      // subscribed flag. They're compensation, not revenue — always bucket
      // them under "free" so they don't pollute mobile subscriber counts.
      if (sub.free_access_granted) {
        bySource.free++;
        continue;
      }
      const src = sub.subscription_source || 'stripe';
      const tier = sub.subscription_tier || 'unknown';
      const engagement = engagementMap[sub.id] || null;

      // Check trial status: is_trial flag OR trial_end in the future
      const trialEnd = sub.trial_end || null;
      const isOnTrial =
        sub.is_trial === true || (trialEnd && new Date(trialEnd).getTime() > Date.now());

      if (isOnTrial) {
        // Trialists — separate list, NOT counted as paying subscribers
        trialUsers.push({
          id: sub.id,
          full_name: sub.full_name || 'Unknown',
          username: sub.username || '',
          role: sub.role || 'visitor',
          subscription_tier: tier,
          subscription_source: src,
          trial_end: sub.trial_end || sub.subscription_end,
          is_cancelled: sub.is_trial_cancelled === true,
          created_at: sub.created_at,
          engagement,
        });
      } else {
        // Paid subscriber — count in bySource and tiersBySource
        bySource[src] = (bySource[src] || 0) + 1;
        if (!tiersBySource[src]) tiersBySource[src] = {};
        tiersBySource[src][tier] = (tiersBySource[src][tier] || 0) + 1;

        // Also add to detailed paidUsers list for mobile subscribers
        if (src === 'app_store' || src === 'play_store') {
          paidUsers.push({
            id: sub.id,
            full_name: sub.full_name || 'Unknown',
            username: sub.username || '',
            role: sub.role || 'visitor',
            subscription_tier: tier,
            subscription_source: src,
            subscription_end: sub.subscription_end,
            created_at: sub.created_at,
            engagement,
          });
        }
      }
    }

    // RevenueCat MRR/revenue — cached, kicked off before the DB work
    const rcMetrics = await rcMetricsPromise;
    const rcChurn = await rcChurnPromise;

    // Today's row of the overview's history line — the store half. The
    // Stripe function writes the other half of the same row.
    const ukDay = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/London' }).format(new Date());
    EdgeRuntime.waitUntil(
      Promise.resolve(
        supabaseAdmin.from('admin_metric_daily').upsert(
          {
            day: ukDay,
            rc_mrr: Math.round(rcMetrics.mrr * 100) / 100,
            rc_paying: rcMetrics.activeSubscriptions,
            rc_trialing: rcMetrics.activeTrials,
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'day' }
        )
      ).then(({ error }) => {
        if (error) console.warn('[ADMIN-REVENUECAT-STATS] snapshot failed', error.message);
      })
    );

    return new Response(
      JSON.stringify({
        subscribersBySource: bySource,
        tiersBySource,
        totalSubscribers: Object.values(bySource).reduce((a, b) => a + b, 0),
        revenuecat: rcMetrics,
        churn: rcChurn,
        trialUsers,
        paidUsers,
        generatedAt: new Date().toISOString(),
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    await captureException(error, {
      functionName: 'admin-revenuecat-stats',
      requestUrl: req.url,
      requestMethod: req.method,
    });
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
