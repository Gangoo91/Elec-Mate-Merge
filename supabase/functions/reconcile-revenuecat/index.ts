import { serve, createClient } from '../_shared/deps.ts';
import { captureMessage, captureException } from '../_shared/sentry.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

/**
 * Daily RevenueCat ↔ Supabase reconciliation (ELE-1269).
 *
 * Webhook events can be missed or arrive out of order, and sync_expired_trials
 * races trial→paid conversions. This job makes RevenueCat the source of truth
 * for every native (app_store / play_store) profile:
 *   - RC has an access-giving subscription but profile says unsubscribed → restore
 *   - Profile says subscribed but RC has nothing giving access → revoke
 *
 * Scheduled via pg_cron (see migration) with the vault service-role key.
 * Safety: aborts without writing if the RC error rate is high or the number
 * of revocations looks like an RC outage rather than genuine churn.
 */

const RC_BASE = 'https://api.revenuecat.com/v2/projects/proj5dd5e597';

interface RcSubscription {
  gives_access?: boolean;
  status?: string;
  store?: string;
  current_period_ends_at?: number | null;
  entitlements?: { items?: Array<{ lookup_key?: string }> };
}

function resolveTier(entitlements: Array<{ lookup_key?: string }>): string {
  const keys = entitlements.map((e) => e.lookup_key);
  if (keys.includes('mate')) return 'business_ai';
  if (keys.includes('employer')) return 'employer';
  if (keys.includes('electrician')) return 'electrician';
  return 'apprentice';
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('authorization') ?? '';
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    if (authHeader !== `Bearer ${serviceKey}`) {
      return new Response(JSON.stringify({ error: 'Unauthorised' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const rcKey = Deno.env.get('REVENUECAT_API_KEY');
    if (!rcKey) {
      return new Response(JSON.stringify({ error: 'REVENUECAT_API_KEY not set' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabase = createClient(Deno.env.get('SUPABASE_URL')!, serviceKey);

    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('id, subscribed, subscription_tier, subscription_end, subscription_source, free_access_granted')
      .in('subscription_source', ['app_store', 'play_store']);

    if (profilesError || !profiles) {
      throw new Error(`Failed to load profiles: ${profilesError?.message}`);
    }

    let errors = 0;
    const restores: Array<{ id: string; tier: string; endMs: number | null }> = [];
    const revokes: string[] = [];

    for (const p of profiles) {
      // Admin-granted free access is managed elsewhere — never touch it here
      if (p.free_access_granted) continue;

      let rcSubs: RcSubscription[] | null = null;
      for (let attempt = 0; attempt < 3; attempt++) {
        try {
          const res = await fetch(`${RC_BASE}/customers/${p.id}/subscriptions?limit=10`, {
            headers: { Authorization: `Bearer ${rcKey}` },
          });
          if (res.status === 429) {
            await new Promise((r) => setTimeout(r, 3000));
            continue;
          }
          if (res.status === 404) {
            rcSubs = [];
            break;
          }
          if (!res.ok) break;
          const body = await res.json();
          rcSubs = body.items ?? [];
          break;
        } catch (_e) {
          await new Promise((r) => setTimeout(r, 1000));
        }
      }

      if (rcSubs === null) {
        errors++;
        continue;
      }

      const active = rcSubs
        .filter((s) => s.gives_access)
        .sort((a, b) => (a.current_period_ends_at ?? 0) - (b.current_period_ends_at ?? 0))
        .pop();

      if (active && !p.subscribed) {
        restores.push({
          id: p.id,
          tier: resolveTier(active.entitlements?.items ?? []),
          endMs: active.current_period_ends_at ?? null,
        });
      } else if (!active && p.subscribed) {
        revokes.push(p.id);
      }

      // Keep the store label honest: the native purchase handler hardcoded
      // 'app_store' for both platforms until 2026-07-05, so Android users
      // were invisible in every admin platform split. Prefer a real store
      // sub over promotional grants when deciding the label.
      const storeSub = rcSubs
        .filter((s) => s.gives_access && (s.store === 'app_store' || s.store === 'play_store'))
        .pop();
      if (storeSub && storeSub.store !== (p as { subscription_source?: string }).subscription_source) {
        await supabase
          .from('profiles')
          .update({ subscription_source: storeSub.store, updated_at: new Date().toISOString() })
          .eq('id', p.id);
      }

      await new Promise((r) => setTimeout(r, 100));
    }

    // Safety valves: an RC outage must not mass-revoke real subscribers
    const subscribedCount = profiles.filter((p) => p.subscribed).length;
    const errorRate = profiles.length ? errors / profiles.length : 0;
    if (errorRate > 0.1) {
      await captureMessage('reconcile-revenuecat: aborted, RC error rate >10%', 'error', {
        functionName: 'reconcile-revenuecat',
        extra: { errors, total: profiles.length },
      });
      return new Response(JSON.stringify({ aborted: 'rc_error_rate', errors }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    if (revokes.length > Math.max(5, Math.ceil(subscribedCount * 0.2))) {
      await captureMessage('reconcile-revenuecat: aborted, revoke count implausible', 'error', {
        functionName: 'reconcile-revenuecat',
        extra: { revokes: revokes.length, subscribedCount },
      });
      return new Response(JSON.stringify({ aborted: 'mass_revoke_guard', revokes: revokes.length }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    for (const r of restores) {
      await supabase
        .from('profiles')
        .update({
          subscribed: true,
          subscription_tier: r.tier,
          subscription_end: r.endMs ? new Date(r.endMs).toISOString() : null,
          is_trial: false,
          is_trial_cancelled: false,
          trial_end: null,
          onboarding_completed: true,
          updated_at: new Date().toISOString(),
        })
        .eq('id', r.id);
    }

    if (revokes.length > 0) {
      await supabase
        .from('profiles')
        .update({
          subscribed: false,
          business_ai_enabled: false,
          is_trial: false,
          updated_at: new Date().toISOString(),
        })
        .in('id', revokes);
    }

    const summary = {
      checked: profiles.length,
      restored: restores.length,
      revoked: revokes.length,
      rc_errors: errors,
    };
    console.log('reconcile-revenuecat:', JSON.stringify(summary));

    if (restores.length > 0) {
      // Restores mean the webhook missed events again — worth knowing about
      await captureMessage('reconcile-revenuecat: restored mislabelled subscribers', 'warning', {
        functionName: 'reconcile-revenuecat',
        extra: summary,
      });
    }

    return new Response(JSON.stringify(summary), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    await captureException(err, {
      functionName: 'reconcile-revenuecat',
      requestUrl: req.url,
      requestMethod: req.method,
    });
    return new Response(JSON.stringify({ error: err instanceof Error ? err.message : String(err) }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
