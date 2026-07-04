/**
 * manage-employer-seats (E1 — NOT LIVE until EMPLOYER_SEAT_PRICE_ID is set)
 *
 * Syncs the caller's Stripe subscription seat quantity to their ACTIVE seat
 * count (£9.99/seat as a quantity item on the employer subscription).
 * Called after add/archive of a linked team member. Stripe prorates.
 *
 * Safety: without the EMPLOYER_SEAT_PRICE_ID secret this is a no-op that
 * reports 'not_configured' — the whole billing path stays dormant.
 */
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.1';
import Stripe from 'https://esm.sh/stripe@14.21.0?target=deno';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  try {
    const seatPriceId = Deno.env.get('EMPLOYER_SEAT_PRICE_ID');
    if (!seatPriceId) {
      // Pre-launch: billing intentionally dormant
      return new Response(JSON.stringify({ success: true, status: 'not_configured' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const anonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY')!;

    const admin = createClient(supabaseUrl, serviceKey);

    // Resolve WHICH employer's seats to sync. Two callers:
    //  - the employer's own client (JWT) → their user.id
    //  - a trusted service (accept-team-invite / archive, using the service-role
    //    key) → the employer_id in the body (worker context can't derive it)
    const authHeader = req.headers.get('Authorization') ?? '';
    const bearer = authHeader.replace(/^Bearer\s+/i, '');
    let targetEmployerId: string | null = null;

    let body: { employer_id?: string } = {};
    try {
      body = await req.json();
    } catch {
      /* no body */
    }

    if (bearer && bearer === serviceKey && body.employer_id) {
      targetEmployerId = body.employer_id;
    } else {
      const caller = createClient(supabaseUrl, anonKey, {
        global: { headers: { Authorization: authHeader } },
      });
      const {
        data: { user },
        error: authError,
      } = await caller.auth.getUser();
      if (authError || !user) {
        return new Response(JSON.stringify({ error: 'Not authenticated' }), {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      targetEmployerId = user.id;
    }

    // Active seat count = the quantity Stripe should bill
    const { count: seatCount } = await admin
      .from('employer_seats')
      .select('id', { count: 'exact', head: true })
      .eq('employer_id', targetEmployerId)
      .eq('status', 'active');

    // The employer's Stripe subscription (customer id on profile)
    const { data: profile } = await admin
      .from('profiles')
      .select('stripe_customer_id, subscription_tier, free_access_granted')
      .eq('id', targetEmployerId)
      .single();

    // No Stripe customer → nothing to sync or clean up.
    if (!profile?.stripe_customer_id) {
      return new Response(JSON.stringify({ success: true, status: 'no_stripe_customer' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Billable ONLY if a paying (not comped) employer on the employer tier.
    // Otherwise the target seat quantity is 0 — which also REMOVES any lingering
    // seat items from a comped employer or one who has DOWNGRADED away from
    // employer, so they stop being charged for seats.
    const isBillableEmployer =
      profile.free_access_granted !== true &&
      (profile.subscription_tier ?? '').toLowerCase().startsWith('employer');
    const targetQuantity = isBillableEmployer ? (seatCount ?? 0) : 0;

    const stripe = new Stripe(stripeKey, { apiVersion: '2023-10-16' });
    const subs = await stripe.subscriptions.list({
      customer: profile.stripe_customer_id,
      status: 'active',
      limit: 5,
    });
    // Target the EMPLOYER base subscription specifically. An employer may also
    // hold a Mate/electrician subscription, so never blindly take data[0].
    // Prefer the sub that already carries the seat item, else the one with the
    // employer base price, else fall back to the first active sub.
    const EMPLOYER_BASE_PRICE_IDS = [
      // Current employer base prices (verified in Stripe 2026-07-04)
      'price_1Tm6eF2RKw5t5RAm0nG7ujWw', // Employer base — £49.99/mo
      'price_1Tm6qA2RKw5t5RAmitPj2yF9', // Employer base — £499.99/yr
      // Legacy prices kept so grandfathered employer subs still match
      'price_1SlyAT2RKw5t5RAmUmTRGimH', // old monthly (£29.99, inactive)
      'price_1SlyB82RKw5t5RAmN447YJUW', // old annual (£299.99)
      'price_1SPK8c2RKw5t5RAmRGJxXfjc', // founders offer £3.99/mo (grants employer access)
    ];
    const subHasPrice = (s: Stripe.Subscription, ids: string[]) =>
      s.items.data.some((i: Stripe.SubscriptionItem) => ids.includes(i.price.id));
    const sub =
      subs.data.find((s: Stripe.Subscription) => subHasPrice(s, [seatPriceId])) ??
      subs.data.find((s: Stripe.Subscription) => subHasPrice(s, EMPLOYER_BASE_PRICE_IDS)) ??
      subs.data[0];
    if (!sub) {
      return new Response(JSON.stringify({ success: true, status: 'no_active_subscription' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const seatItem = sub.items.data.find((i: Stripe.SubscriptionItem) => i.price.id === seatPriceId);

    if (seatItem) {
      if (targetQuantity === 0) {
        await stripe.subscriptionItems.del(seatItem.id, {
          proration_behavior: 'create_prorations',
        });
      } else if (seatItem.quantity !== targetQuantity) {
        await stripe.subscriptionItems.update(seatItem.id, {
          quantity: targetQuantity,
          proration_behavior: 'create_prorations',
        });
      }
    } else if (targetQuantity > 0) {
      await stripe.subscriptionItems.create({
        subscription: sub.id,
        price: seatPriceId,
        quantity: targetQuantity,
        proration_behavior: 'create_prorations',
      });
    }

    return new Response(
      JSON.stringify({ success: true, seats: targetQuantity, billable: isBillableEmployer }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('manage-employer-seats error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
