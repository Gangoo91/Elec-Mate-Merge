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

    // Fetch all subscribed users with source + tier
    const { data: subscribers, error: subErr } = await supabaseAdmin
      .from('profiles')
      .select('subscription_source, subscription_tier, subscribed, free_access_granted')
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

    for (const sub of subscribers || []) {
      if (sub.free_access_granted && !sub.subscribed) {
        bySource.free++;
        continue;
      }
      const src = sub.subscription_source || 'stripe'; // Default to stripe for legacy users
      bySource[src] = (bySource[src] || 0) + 1;

      const tier = sub.subscription_tier || 'unknown';
      if (!tiersBySource[src]) tiersBySource[src] = {};
      tiersBySource[src][tier] = (tiersBySource[src][tier] || 0) + 1;
    }

    // Try RevenueCat API if key is set (for MRR/revenue data)
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
        generatedAt: new Date().toISOString(),
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
