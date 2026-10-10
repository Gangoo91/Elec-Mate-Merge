/**
 * manage-employer-seats (E1 — NOT LIVE until EMPLOYER_SEAT_PRICE_ID is set)
 *
 * Syncs the caller's Stripe subscription seat quantities to their ACTIVE seats
 * (Andrew 7 Oct): everyone in Worker Tools is a paid seat — £9.99/month
 * standard (EMPLOYER_SEAT_PRICE_ID) and £4.99/month for apprentices
 * (EMPLOYER_APPRENTICE_SEAT_PRICE_ID) — as two quantity items on the employer
 * subscription. If the apprentice price isn't configured, apprentices are not
 * billed (never overcharged at the standard rate).
 * Called after add/archive of a linked team member. Stripe prorates.
 *
 * Safety: without the EMPLOYER_SEAT_PRICE_ID secret this is a no-op that
 * reports 'not_configured' — the whole billing path stays dormant.
 */
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.1';
import Stripe from 'https://esm.sh/stripe@14.21.0?target=deno';
import { sendEmail, htmlToPlainText } from '../_shared/mailer.ts';
import { buildCoveredByEmployerEmail, teamCompany } from '../_shared/email-templates/team.ts';

import { withSentry } from '../_shared/sentry.ts';
/** Plans a team seat does not replace: Mate (current and legacy), an employer
 *  plan of their own (current, legacy, founders offer) and the seat item itself. */
const SEAT_DOES_NOT_REPLACE = new Set([
  'price_1TRGZo2RKw5t5RAmRl2hc0ru', 'price_1TRGZo2RKw5t5RAmzY50EzaE',
  'price_1T6DUx2RKw5t5RAmpb177NJV', 'price_1T6DUy2RKw5t5RAmo9HgAukW',
  'price_1Tm6eF2RKw5t5RAm0nG7ujWw', 'price_1Tm6qA2RKw5t5RAmitPj2yF9',
  'price_1SlyAT2RKw5t5RAmUmTRGimH', 'price_1SlyB82RKw5t5RAmN447YJUW',
  'price_1SPK8c2RKw5t5RAmRGJxXfjc', 'price_1TkfWZ2RKw5t5RAmBPSZzc6X',
]);
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

Deno.serve(withSentry('manage-employer-seats', async (req) => {
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
      // A co-admin acts for someone else's company, so the caller's own uid is
      // not necessarily the employer being billed. my_default_employer_id() is
      // the same resolver the column defaults and RLS scope use; it returns
      // auth.uid() for ordinary owners, so this is a no-op for them. Without
      // it, a co-admin adding a worker would sync seat quantity against their
      // OWN (empty) company and the real employer would be under-billed.
      const { data: actingEmployerId } = await caller.rpc('my_default_employer_id');
      targetEmployerId = (actingEmployerId as string | null) ?? user.id;
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
          let hasStripeSub = false;
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
            hasStripeSub = workerSubs.data.length > 0;
            for (const ws of workerSubs.data) {
              // A seat covers the Electrician and Apprentice app. It does NOT
              // replace Mate (WhatsApp assistant) or an employer plan of their
              // own, so those are never touched (10 Oct 2026).
              if (ws.items.data.some((it: { price?: { id?: string } }) => SEAT_DOES_NOT_REPLACE.has(it.price?.id ?? "x"))) continue;
              if (!ws.cancel_at_period_end) {
                await stripe.subscriptions.update(ws.id, {
                  cancel_at_period_end: true,
                  metadata: { seat_replaced: 'true' },
                });
              }
              cancelledStripe = true;
            }
          }

          if (!cancelledStripe && !hasStripeSub && workerProfile?.subscribed) {
            // Paying but no cancellable Stripe sub → native (Apple/Google) IAP,
            // which we CANNOT cancel server-side. Email them to self-cancel so
            // they stop double-paying (their access is safe via the seat).
            const { data: authUser } = await admin.auth.admin.getUserById(joinedWorkerId);
            const workerEmail = authUser?.user?.email;
            if (workerEmail) {
              // The firm's own branding, on the shared team email (ELE-2013).
              const [{ data: firmProfile }, { data: workerName }] = await Promise.all([
                admin.from('company_profiles').select('*').eq('user_id', targetEmployerId).maybeSingle(),
                admin.from('profiles').select('full_name').eq('id', joinedWorkerId).maybeSingle(),
              ]);
              const covered = buildCoveredByEmployerEmail({
                company: teamCompany(firmProfile, 'Your employer'),
                recipientName: (workerName?.full_name as string | undefined) ?? null,
              });
              await sendEmail({
                from: 'Elec-Mate <founder@elec-mate.com>',
                to: [workerEmail],
                subject: covered.subject,
                html: covered.html,
                text: htmlToPlainText(covered.html),
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

    // What Stripe should bill: every active seat, split by price
    // (public.employer_seat_counts → { standard, apprentice }).
    // Monthly and yearly seat prices: Stripe can't mix intervals on one
    // subscription, so a firm on the £499.99/yr plan gets the yearly seat prices.
    const env = (k: string) => Deno.env.get(k) || null;
    const seatMonthly = seatPriceId;
    const apprenticeMonthly = env('EMPLOYER_APPRENTICE_SEAT_PRICE_ID');
    const seatYearly = env('EMPLOYER_SEAT_PRICE_ID_YEARLY');
    const apprenticeYearly = env('EMPLOYER_APPRENTICE_SEAT_PRICE_ID_YEARLY');
    const allSeatPriceIds = [seatMonthly, apprenticeMonthly, seatYearly, apprenticeYearly].filter(
      (x): x is string => !!x
    );
    const { data: counts, error: countErr } = await admin.rpc('employer_seat_counts', {
      p_employer: targetEmployerId,
    });
    if (countErr) throw countErr;
    const standardCount = Number((counts as { standard?: number } | null)?.standard ?? 0);
    const apprenticeCount = Number((counts as { apprentice?: number } | null)?.apprentice ?? 0);

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
      subs.data.find((s: Stripe.Subscription) => subHasPrice(s, allSeatPriceIds)) ??
      subs.data.find((s: Stripe.Subscription) => subHasPrice(s, EMPLOYER_BASE_PRICE_IDS)) ??
      subs.data[0];
    if (!sub) {
      return new Response(JSON.stringify({ success: true, status: 'no_active_subscription' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // The plan's interval decides which seat prices apply.
    const yearly = sub.items.data.some(
      (i: Stripe.SubscriptionItem) =>
        EMPLOYER_BASE_PRICE_IDS.includes(i.price.id) && i.price.recurring?.interval === 'year'
    );
    const standardPrice = yearly ? seatYearly : seatMonthly;
    const apprenticePrice = yearly ? apprenticeYearly : apprenticeMonthly;
    const targets: Array<{ priceId: string; quantity: number }> = [];
    if (standardPrice) {
      targets.push({ priceId: standardPrice, quantity: isBillableEmployer ? standardCount : 0 });
    } else if (standardCount > 0) {
      console.warn(`manage-employer-seats: no ${yearly ? 'yearly' : 'monthly'} seat price configured — seats not billed`);
    }
    if (apprenticePrice) {
      targets.push({ priceId: apprenticePrice, quantity: isBillableEmployer ? apprenticeCount : 0 });
    } else if (apprenticeCount > 0) {
      console.warn(`manage-employer-seats: no ${yearly ? 'yearly' : 'monthly'} apprentice seat price — apprentice seats not billed`);
    }
    // Remove seat items on the other interval / any price no longer targeted.
    for (const item of sub.items.data) {
      if (allSeatPriceIds.includes(item.price.id) && !targets.some((t) => t.priceId === item.price.id)) {
        await stripe.subscriptionItems.del(item.id, { proration_behavior: 'create_prorations' });
      }
    }

    for (const t of targets) {
      const item = sub.items.data.find((i: Stripe.SubscriptionItem) => i.price.id === t.priceId);
      if (item) {
        if (t.quantity === 0) {
          await stripe.subscriptionItems.del(item.id, { proration_behavior: 'create_prorations' });
        } else if (item.quantity !== t.quantity) {
          await stripe.subscriptionItems.update(item.id, {
            quantity: t.quantity,
            proration_behavior: 'create_prorations',
          });
        }
      } else if (t.quantity > 0) {
        await stripe.subscriptionItems.create({
          subscription: sub.id,
          price: t.priceId,
          quantity: t.quantity,
          proration_behavior: 'create_prorations',
        });
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        seats: targets.reduce((n, t) => n + t.quantity, 0),
        standard: standardPrice ? standardCount * (isBillableEmployer ? 1 : 0) : 0,
        apprentice: apprenticePrice ? apprenticeCount * (isBillableEmployer ? 1 : 0) : 0,
        interval: yearly ? 'year' : 'month',
        billable: isBillableEmployer,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('manage-employer-seats error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}));
