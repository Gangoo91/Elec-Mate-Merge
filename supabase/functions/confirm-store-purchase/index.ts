import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { corsHeaders } from '../_shared/cors.ts';
import { captureException } from '../_shared/sentry.ts';
import { identifyCaller, deny } from '../_shared/caller.ts';

/**
 * After an App Store / Play purchase or restore, confirm it with RevenueCat
 * and record it on the caller's profile — server-side.
 *
 * The app used to write profiles.subscribed / subscription_tier itself, which
 * meant ANY user could mark themselves as paying with one request. Those
 * fields are being locked to the server (_profiles_privileged_guard, with the
 * release). This gives the purchase screen the same instant unlock without
 * trusting the client: RevenueCat is asked, the profile is written by the
 * service role. revenuecat-webhook and reconcile-revenuecat remain the
 * long-term source of truth; this only removes the wait for the webhook.
 *
 * Same tier mapping as reconcile-revenuecat (entitlement lookup keys).
 */

const RC_BASE = 'https://api.revenuecat.com/v2/projects/proj5dd5e597';
const BUSINESS_AI_TIERS = new Set(['business_ai', 'business_ai_yearly', 'employer', 'employer_yearly']);

interface RcSub {
  gives_access?: boolean;
  current_period_ends_at?: number | null;
  status?: string;
  store?: string;
  entitlements?: { items?: { lookup_key?: string }[] };
}

function resolveTier(keys: (string | undefined)[]): string {
  if (keys.includes('mate')) return 'business_ai';
  if (keys.includes('employer')) return 'employer';
  if (keys.includes('electrician')) return 'electrician';
  return 'apprentice';
}

const json = (b: unknown, status = 200) =>
  new Response(JSON.stringify(b), { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  try {
    const caller = await identifyCaller(req);
    if (!caller || caller.kind !== 'user') return deny(corsHeaders);
    const rcKey = Deno.env.get('REVENUECAT_API_KEY');
    if (!rcKey) return json({ subscribed: false, error: 'not_configured' }, 503);

    let subs: RcSub[] | null = null;
    for (let attempt = 0; attempt < 3 && subs === null; attempt++) {
      const res = await fetch(`${RC_BASE}/customers/${encodeURIComponent(caller.userId)}/subscriptions?limit=10`, {
        headers: { Authorization: `Bearer ${rcKey}` },
      });
      if (res.status === 404) subs = [];
      else if (res.ok) subs = ((await res.json()) as { items?: RcSub[] }).items ?? [];
      else await new Promise((r) => setTimeout(r, 800));
    }
    if (subs === null) return json({ subscribed: false, error: 'revenuecat_unavailable' }, 502);

    const active = subs
      .filter((s) => s.gives_access)
      .sort((a, b) => (a.current_period_ends_at ?? 0) - (b.current_period_ends_at ?? 0))
      .pop();
    if (!active) return json({ subscribed: false });

    const tier = resolveTier((active.entitlements?.items ?? []).map((e) => e.lookup_key));
    const store = (active.store ?? '').toLowerCase();
    const source = store.includes('play') ? 'play_store' : 'app_store';
    const end = active.current_period_ends_at ? new Date(active.current_period_ends_at).toISOString() : null;
    const isTrial = (active.status ?? '').toLowerCase().includes('trial');

    const admin = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);
    const { error } = await admin
      .from('profiles')
      .update({
        subscribed: true,
        subscription_tier: tier,
        subscription_source: source,
        subscription_end: end,
        business_ai_enabled: BUSINESS_AI_TIERS.has(tier),
        is_trial: isTrial,
        trial_end: isTrial ? end : null,
        onboarding_completed: true,
        updated_at: new Date().toISOString(),
      })
      .eq('id', caller.userId);
    if (error) throw error;
    return json({ subscribed: true, tier });
  } catch (e) {
    await captureException(e, { functionName: 'confirm-store-purchase' });
    return json({ subscribed: false, error: 'failed' }, 500);
  }
});
