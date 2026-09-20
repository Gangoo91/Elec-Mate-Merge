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
import { corsHeaders } from '../_shared/cors.ts';
import Stripe from 'https://esm.sh/stripe@14.21.0';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import { captureException } from '../_shared/sentry.ts';


const log = (step: string, details?: unknown) => {
  const d = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[GET-BILLING-CONTEXT] ${step}${d}`);
};

/**
 * The retention offer's real terms, read off the Stripe coupon.
 *
 * WHY THIS IS HERE AND NOT A CONSTANT IN THE MODAL: the cancel flow spent ten
 * weeks advertising "£12.99 → £9.99" because the price lived in the front end
 * and Stripe moved on without it. Replacing that with a hardcoded "40%" would
 * have been the identical bug one level up — change the coupon, or point
 * RETENTION_COUPON_ID at a different one, and the modal would confidently
 * quote a percentage nobody was actually getting.
 *
 * So the number the user is shown comes from the same coupon that will be
 * applied. Costs one extra Stripe read on a screen that opens rarely.
 * Returns null if the coupon is missing, and the modal falls back to its own
 * constant rather than showing nothing.
 */
async function retentionOfferTerms(stripe: Stripe) {
  const couponId = Deno.env.get('RETENTION_COUPON_ID') || 'ELECMATE_STAY_35';
  try {
    const coupon = await stripe.coupons.retrieve(couponId);
    if (!coupon.valid || !coupon.percent_off) return null;
    return {
      retention_percent_off: coupon.percent_off,
      retention_duration_months: coupon.duration_in_months ?? null,
    };
  } catch {
    // Not fatal — this endpoint's main job is finding the subscription.
    return null;
  }
}

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
      .select('subscription_tier, subscribed, stripe_customer_id')
      .eq('id', user.id)
      .single();

    const tier = profile?.subscription_tier ?? null;

    // Look up the Stripe customer by email AND by the id stored on the profile.
    // Email alone misses anyone whose Stripe customer carries a different
    // address from their login — and missing a customer here reads to the user
    // as "you have no subscription" while we carry on billing them.
    const stripe = new Stripe(stripeKey, { apiVersion: '2023-10-16' });
    const byEmail = await stripe.customers.list({ email: user.email, limit: 5 });
    const customerList = [...byEmail.data];
    const storedId = profile?.stripe_customer_id as string | undefined;
    if (storedId && !customerList.some((c) => c.id === storedId)) {
      try {
        const stored = await stripe.customers.retrieve(storedId);
        if (!('deleted' in stored) || !stored.deleted) {
          customerList.push(stored as Stripe.Customer);
        }
      } catch {
        // customer no longer exists in Stripe — fall through
      }
    }
    const customers = { data: customerList };

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

    // Walk customers and return the first subscription Stripe can still bill.
    //
    // past_due / unpaid / incomplete are included deliberately. Restricting this
    // to active|trialing meant that the instant a card failed, the subscription
    // vanished from the cancel flow and the user was told "your previous
    // subscription has already ended" — while Stripe was still dunning them and
    // our payday cron was still retrying the card. The one subscription someone
    // most urgently wants to stop was the one we hid (Mathew Bayley, Jul 2026).
    const CANCELLABLE = ['active', 'trialing', 'past_due', 'unpaid', 'incomplete'];
    for (const c of customers.data) {
      const subs = await stripe.subscriptions.list({ customer: c.id, status: 'all', limit: 10 });
      // Prefer a healthy subscription if one exists, else the failing one.
      const live =
        subs.data.find((s: Stripe.Subscription) => s.status === 'active' || s.status === 'trialing') ??
        subs.data.find((s: Stripe.Subscription) => CANCELLABLE.includes(s.status));
      if (live) {
        // What they are actually being charged, straight off the subscription
        // item — no extra API call, and no price constant in the front end to
        // go stale. The cancel flow quoted hardcoded pre-June-2026 prices for
        // ten weeks precisely because it had no source for this.
        const livePrice = live.items?.data?.[0]?.price;
        return jsonResponse({
          ok: true,
          has_active_subscription: true,
          subscription_id: live.id,
          // Reported so the UI can be honest about a failing subscription
          // rather than presenting it as healthy.
          subscription_status: live.status,
          stripe_customer_id: c.id,
          tier,
          managed_by: 'stripe',
          current_amount: livePrice?.unit_amount ?? null,
          currency: livePrice?.currency ?? 'gbp',
          interval: livePrice?.recurring?.interval ?? null,
          // The retention offer is refused for both of these, so the modal
          // should not pitch what the server will reject.
          already_discounted: Boolean(live.discount),
          is_paused: Boolean(live.pause_collection),
          ...(await retentionOfferTerms(stripe)),
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
