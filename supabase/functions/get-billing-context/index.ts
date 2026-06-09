/**
 * get-billing-context
 * ──────────────────────────────────────────────────────────────────────
 * Returns the authenticated user's active Stripe subscription metadata
 * so the front-end doesn't have to hold a stripe customer id locally.
 *
 * Used by the CancelFlow modal to know which subscription to cancel /
 * apply a retention coupon to. Read-only — never mutates Stripe state.
 *
 * Returns:
 *   { ok: true,
 *     has_active_subscription: boolean,
 *     subscription_id: string | null,
 *     stripe_customer_id: string | null,
 *     tier: string | null,
 *     managed_by: 'stripe' | 'apple' | 'google' | 'unknown' }
 *
 * App-store subscriptions cannot be cancelled via Stripe — we return
 * managed_by='apple'/'google' so the UI can route the user to the
 * correct cancellation flow (their device's subscription manager).
 */

import { serve } from '../_shared/deps.ts';
import Stripe from 'https://esm.sh/stripe@14.21.0';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import { captureException } from '../_shared/sentry.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-request-id',
};

const log = (step: string, details?: unknown) => {
  const d = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[GET-BILLING-CONTEXT] ${step}${d}`);
};

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');
    if (!stripeKey) throw new Error('STRIPE_SECRET_KEY is not set');

    const authClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );
    const serviceClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const authHeader = req.headers.get('Authorization');
    if (!authHeader) throw new Error('No authorization header');
    const token = authHeader.replace('Bearer ', '');
    const { data: userData, error: userErr } = await authClient.auth.getUser(token);
    if (userErr) throw new Error(`Auth error: ${userErr.message}`);
    const user = userData.user;
    if (!user?.email) throw new Error('User not found / no email');

    // Pull tier from profile (authoritative)
    const { data: profile } = await serviceClient
      .from('profiles')
      .select('subscription_tier, subscribed')
      .eq('id', user.id)
      .single();

    const tier = profile?.subscription_tier ?? null;

    // Look up Stripe customer by email
    const stripe = new Stripe(stripeKey, { apiVersion: '2023-10-16' });
    const customers = await stripe.customers.list({ email: user.email, limit: 5 });

    if (customers.data.length === 0) {
      log('No Stripe customer for email — likely app-store sub', { email: user.email });
      return jsonResponse({
        ok: true,
        has_active_subscription: !!profile?.subscribed,
        subscription_id: null,
        stripe_customer_id: null,
        tier,
        managed_by: profile?.subscribed ? 'unknown' : 'stripe',
      });
    }

    // Walk customers, return the first active or trialing subscription found.
    for (const c of customers.data) {
      const subs = await stripe.subscriptions.list({ customer: c.id, limit: 10 });
      const live = subs.data.find((s) => s.status === 'active' || s.status === 'trialing');
      if (live) {
        return jsonResponse({
          ok: true,
          has_active_subscription: true,
          subscription_id: live.id,
          stripe_customer_id: c.id,
          tier,
          managed_by: 'stripe',
        });
      }
    }

    log('Stripe customer exists but no active sub', { email: user.email });
    return jsonResponse({
      ok: true,
      has_active_subscription: false,
      subscription_id: null,
      stripe_customer_id: customers.data[0]?.id ?? null,
      tier,
      managed_by: 'stripe',
    });
  } catch (error) {
    await captureException(error, { functionName: 'get-billing-context', requestUrl: req.url, requestMethod: req.method });
    const message = error instanceof Error ? error.message : String(error);
    log('ERROR', { message });
    return jsonResponse({ ok: false, error: message }, 500);
  }
});

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    status,
  });
}
