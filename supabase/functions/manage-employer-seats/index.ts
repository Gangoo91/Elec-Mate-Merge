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
import { sendEmail } from '../_shared/mailer.ts';

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

    const stripe = new Stripe(stripeKey, { apiVersion: '2023-10-16' });

    // ── Worker seat ⇄ the worker's OWN subscription ────────────────────────
    // Runs BEFORE the employer-billing early-returns (comped employers' workers
    // double-pay too). Gated by its own flag → inert until launch. Only the JOIN
    // path sends joined_worker_id and only the LEAVE path sends left_worker_id,
    // so cancel/reinstate can never fire on the wrong transition.
    const replaceEnabled = Deno.env.get('WORKER_SEAT_REPLACES_SUB') === 'true';
    const joinedWorkerId = (body as { joined_worker_id?: string }).joined_worker_id;
    const leftWorkerId = (body as { left_worker_id?: string }).left_worker_id;

    // JOIN — the seat now covers the worker, so retire their personal sub.
    if (replaceEnabled && joinedWorkerId) {
      try {
        // Safety: only ever act on a worker who actually holds an ACTIVE seat.
        const { data: seatRow } = await admin
          .from('employer_seats')
          .select('id')
          .eq('user_id', joinedWorkerId)
          .eq('status', 'active')
          .limit(1)
          .maybeSingle();

        if (seatRow) {
          const { data: workerProfile } = await admin
            .from('profiles')
            .select('stripe_customer_id, subscribed')
            .eq('id', joinedWorkerId)
            .maybeSingle();

          let cancelledStripe = false;
          if (workerProfile?.stripe_customer_id) {
            // Cancel the worker's OWN active subs (their customer — never the
            // employer's) at period end, TAGGED seat_replaced so we can safely
            // reinstate them if the worker later leaves. They keep what they
            // paid for and never lose access (the seat covers them). Idempotent.
            const workerSubs = await stripe.subscriptions.list({
              customer: workerProfile.stripe_customer_id,
              status: 'active',
              limit: 10,
            });
            for (const ws of workerSubs.data) {
              if (!ws.cancel_at_period_end) {
                await stripe.subscriptions.update(ws.id, {
                  cancel_at_period_end: true,
                  metadata: { seat_replaced: 'true' },
                });
              }
              cancelledStripe = true;
            }
          }

          if (!cancelledStripe && workerProfile?.subscribed) {
            // Paying but no cancellable Stripe sub → native (Apple/Google) IAP,
            // which we CANNOT cancel server-side. Email them to self-cancel so
            // they stop double-paying (their access is safe via the seat).
            const { data: authUser } = await admin.auth.admin.getUserById(joinedWorkerId);
            const workerEmail = authUser?.user?.email;
            if (workerEmail) {
              await sendEmail({
                from: 'Elec-Mate <founder@elec-mate.com>',
                to: [workerEmail],
                subject: 'Your Elec-Mate access is now covered by your employer',
                html: `<div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;max-width:520px;margin:0 auto;background:#F4F6F9;padding:28px;border-radius:16px;color:#1B2733;">
        <p style="margin:0 0 6px;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#F3B70A;font-weight:700;">You're covered</p>
        <h2 style="margin:0 0 10px;font-size:19px;color:#1B2733;">Your employer now covers your Elec-Mate access</h2>
        <p style="margin:0 0 12px;font-size:14px;color:#51606F;line-height:1.6;">You've joined a team on Elec-Mate, so your access is now included as part of your employer's plan &mdash; nothing changes for you.</p>
        <p style="margin:0 0 4px;font-size:14px;color:#51606F;line-height:1.6;">Because you subscribed through the <strong>App Store or Google Play</strong>, we can't cancel that subscription for you. To stop being charged, please cancel it in your device's subscription settings &mdash; you'll keep full access through your employer.</p>
      </div>`,
              });
            }
          }
        }
      } catch (subErr) {
        // Never let sub-replacement block the employer seat sync — the seat is the money.
        console.error('manage-employer-seats: worker sub replacement failed (non-fatal):', subErr);
      }
    }

    // LEAVE — the worker is no longer seat-covered. If WE parked their own sub
    // (seat_replaced marker) and it hasn't lapsed yet, reinstate it so they
    // don't silently lose access. Never touch a sub the worker cancelled
    // themselves (no marker). Multi-team safe: only if they hold NO active seat.
    if (replaceEnabled && leftWorkerId) {
      try {
        const { data: stillSeated } = await admin
          .from('employer_seats')
          .select('id')
          .eq('user_id', leftWorkerId)
          .eq('status', 'active')
          .limit(1)
          .maybeSingle();

        if (!stillSeated) {
          const { data: workerProfile } = await admin
            .from('profiles')
            .select('stripe_customer_id')
            .eq('id', leftWorkerId)
            .maybeSingle();
          if (workerProfile?.stripe_customer_id) {
            const workerSubs = await stripe.subscriptions.list({
              customer: workerProfile.stripe_customer_id,
              status: 'active',
              limit: 10,
            });
            for (const ws of workerSubs.data) {
              // Only un-cancel subs WE parked (marker) that haven't lapsed.
              if (ws.cancel_at_period_end && ws.metadata?.seat_replaced === 'true') {
                await stripe.subscriptions.update(ws.id, {
                  cancel_at_period_end: false,
                  metadata: { seat_replaced: '' }, // '' clears the key in Stripe
                });
              }
            }
          }
        }
      } catch (subErr) {
        console.error('manage-employer-seats: worker sub reinstate failed (non-fatal):', subErr);
      }
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

    const seatItem = sub.items.data.find(
      (i: Stripe.SubscriptionItem) => i.price.id === seatPriceId
    );

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
