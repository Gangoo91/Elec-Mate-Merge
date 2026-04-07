import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { createClient } from 'jsr:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-request-id',
};

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

    // Use service role for full data access
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

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
      }
    > = {};

    if (subscriberIds.length > 0) {
      const { data: engagementRows } = await supabaseAdmin
        .from('user_activity_summary')
        .select(
          'user_id, login_count, page_view_count, total_seconds_tracked, feature_use_count, active_days, unique_pages_visited'
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
        };
      }
    }

    for (const sub of subscribers || []) {
      if (sub.free_access_granted && !sub.subscribed) {
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

    // Try RevenueCat API for MRR/revenue data
    const rcMetrics = { mrr: 0, revenue: 0, activeSubscriptions: 0, activeTrials: 0 };
    const rcApiKey = Deno.env.get('REVENUECAT_API_V2_KEY');

    if (rcApiKey) {
      try {
        const res = await fetch(
          'https://api.revenuecat.com/v2/projects/proj5dd5e597/metrics/overview?currency=GBP',
          { headers: { Authorization: `Bearer ${rcApiKey}`, 'Content-Type': 'application/json' } }
        );
        if (res.ok) {
          const data = await res.json();
          for (const m of data.metrics || []) {
            if (m.id === 'mrr') rcMetrics.mrr = m.value || 0;
            if (m.id === 'revenue') rcMetrics.revenue = m.value || 0;
            if (m.id === 'active_subscriptions') rcMetrics.activeSubscriptions = m.value || 0;
            if (m.id === 'active_trials') rcMetrics.activeTrials = m.value || 0;
          }
        } else {
          console.warn('RevenueCat API returned', res.status, await res.text());
        }
      } catch (e) {
        console.warn('RevenueCat API call failed (non-fatal):', e);
      }
    }

    return new Response(
      JSON.stringify({
        subscribersBySource: bySource,
        tiersBySource,
        totalSubscribers: Object.values(bySource).reduce((a, b) => a + b, 0),
        revenuecat: rcMetrics,
        trialUsers,
        paidUsers,
        generatedAt: new Date().toISOString(),
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
