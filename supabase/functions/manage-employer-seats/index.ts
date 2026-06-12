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
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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

    const authHeader = req.headers.get('Authorization') ?? '';
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

    const admin = createClient(supabaseUrl, serviceKey);

    // Active seat count = the quantity Stripe should bill
    const { count: seatCount } = await admin
      .from('employer_seats')
      .select('id', { count: 'exact', head: true })
      .eq('employer_id', user.id)
      .eq('status', 'active');

    // The employer's Stripe subscription (customer id on profile)
    const { data: profile } = await admin
      .from('profiles')
      .select('stripe_customer_id, subscription_tier')
      .eq('id', user.id)
      .single();
    if (!profile?.stripe_customer_id || profile.subscription_tier !== 'employer') {
      return new Response(JSON.stringify({ success: true, status: 'no_employer_subscription' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const stripe = new Stripe(stripeKey, { apiVersion: '2023-10-16' });
    const subs = await stripe.subscriptions.list({
      customer: profile.stripe_customer_id,
      status: 'active',
      limit: 5,
    });
    const sub = subs.data[0];
    if (!sub) {
      return new Response(JSON.stringify({ success: true, status: 'no_active_subscription' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const quantity = seatCount ?? 0;
    const seatItem = sub.items.data.find((i) => i.price.id === seatPriceId);

    if (seatItem) {
      if (quantity === 0) {
        await stripe.subscriptionItems.del(seatItem.id, {
          proration_behavior: 'create_prorations',
        });
      } else if (seatItem.quantity !== quantity) {
        await stripe.subscriptionItems.update(seatItem.id, {
          quantity,
          proration_behavior: 'create_prorations',
        });
      }
    } else if (quantity > 0) {
      await stripe.subscriptionItems.create({
        subscription: sub.id,
        price: seatPriceId,
        quantity,
        proration_behavior: 'create_prorations',
      });
    }

    return new Response(JSON.stringify({ success: true, seats: quantity }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('manage-employer-seats error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
