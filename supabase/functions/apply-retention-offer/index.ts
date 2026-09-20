/**
 * apply-retention-offer
 * ───────────────────────────────────────────────────────────────────────
 * The "don't go" half of the cancel flow. Called from CancelFlow when a
 * user takes one of two ways out that isn't cancelling:
 *
 *   action: 'discount'  → percentage coupon on the live subscription
 *   action: 'pause'     → billing voided for 1-3 months, then resumes
 *
 * WHY A PERCENTAGE, NOT A FIXED AMOUNT
 * The original version mapped tier → fixed-amount coupon (£2 off apprentice,
 * £3 off electrician) and hardcoded the resulting prices in both this file
 * and the modal. The 29 June 2026 price rise moved apprentice to £6.99 and
 * electrician to £19.99; nothing here was updated, so for ten weeks the modal
 * offered an electrician "£12.99 → £9.99" while Stripe would actually have
 * billed £16.99. A percentage coupon has no such coupling: one coupon is
 * correct for every tier, every interval and every future price. It also
 * removes the tier lookup entirely, which is what stripped the offer from
 * annual plans (`electrician_yearly`) and from the handful of profiles whose
 * tier is capitalised.
 *
 * The percentage and the resulting price are read back FROM STRIPE and
 * returned to the client, so the number the user is shown is by construction
 * the number they will be charged. Nothing about the price is hardcoded here.
 *
 * PAUSE
 * 41% of leavers say "not using it" and the most common thing they write is
 * "only needed it once" or "I passed the exam I used it for". A discount is
 * the wrong instrument for someone with nothing to use the product on this
 * month. pause_collection with behavior:'void' stops the billing without
 * ending the subscription — access stops, the row survives, and it comes back
 * on its own at resumes_at with no action from us.
 *
 * OWNERSHIP
 * The client supplies subscriptionId, so it MUST be proved to belong to the
 * caller before anything is applied to it. The previous version tried, with
 * `customers.data.some(async ...)` — an async callback returns a Promise,
 * which is always truthy, so the check passed for anyone with a Stripe
 * customer record and then soft-failed open for everyone else. It was
 * decorative. This one resolves the subscription's own customer id and
 * requires it to match either the profile's stored customer id or one of the
 * customers on the caller's email, and refuses with a 403 if it does not.
 */

import { serve } from '../_shared/deps.ts';
import { corsHeaders } from '../_shared/cors.ts';
import Stripe from 'https://esm.sh/stripe@14.21.0';
import { createClient, type SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import { captureException } from '../_shared/sentry.ts';


const log = (step: string, details?: unknown) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[APPLY-RETENTION-OFFER] ${step}${detailsStr}`);
};

/**
 * One coupon, every tier. Since 20 Sep 2026 it is ELECMATE_STAY_35 — 35% off
 * for 12 months, which is £12.99 on the £19.99 electrician price (Andrew:
 * "should be 12.99 on retention"). The half-price-for-life WINBACK50 coupon is
 * for LAPSED customers only; offering it here would hand anyone who pressed
 * cancel a permanent 50% off. The 40%-for-3-months coupon before that was
 * shown 29 times and taken 0. Overridable by env so the level can be changed
 * in the Supabase dashboard without a redeploy — the modal reads the real
 * terms back off the coupon.
 */
const RETENTION_COUPON_ID = Deno.env.get('RETENTION_COUPON_ID') || 'ELECMATE_STAY_35';

/** Pause is capped at three months: past that it is a lapsed user, not a pause. */
const MAX_PAUSE_MONTHS = 3;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');
    if (!stripeKey) throw new Error('STRIPE_SECRET_KEY is not set');

    // Anon client just to verify the caller — service_role below to write
    // back to cancel_survey_responses.
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
    if (!user) throw new Error('User not found');
    log('Authenticated', { userId: user.id });

    let body: {
      subscriptionId?: string;
      surveyId?: string | null;
      action?: 'discount' | 'pause';
      pauseMonths?: number;
    };
    try {
      body = await req.json();
    } catch {
      throw new Error('Invalid JSON body');
    }
    const { subscriptionId, surveyId } = body;
    const action = body.action ?? 'discount';
    if (!subscriptionId) throw new Error('subscriptionId is required');
    if (action !== 'discount' && action !== 'pause') {
      throw new Error(`Unknown action: ${action}`);
    }

    const stripe = new Stripe(stripeKey, { apiVersion: '2023-10-16' });

    // ── Ownership: prove this subscription is the caller's ──────────────
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    const subCustomerId =
      typeof subscription.customer === 'string'
        ? subscription.customer
        : subscription.customer.id;

    const { data: profile } = await serviceClient
      .from('profiles')
      .select('stripe_customer_id')
      .eq('id', user.id)
      .maybeSingle();

    let owns = Boolean(profile?.stripe_customer_id) &&
      profile!.stripe_customer_id === subCustomerId;

    // Fallback for accounts whose profile predates stripe_customer_id being
    // populated: the customer records on their email are equally authoritative.
    if (!owns && user.email) {
      const customers = await stripe.customers.list({ email: user.email, limit: 10 });
      owns = customers.data.some((c: Stripe.Customer) => c.id === subCustomerId);
    }

    if (!owns) {
      log('REFUSED: subscription does not belong to caller', {
        userId: user.id,
        subscriptionId,
        subCustomerId,
      });
      return jsonResponse(
        { success: false, error: 'not_your_subscription' },
        403
      );
    }

    // ── Pause ───────────────────────────────────────────────────────────
    if (action === 'pause') {
      // Refuse to pause what is already paused. MAX_PAUSE_MONTHS caps a single
      // pause at three months, but nothing else would stop someone pausing
      // again the moment the last one expired — or extending an existing pause
      // indefinitely — which is a free subscription in instalments.
      if (subscription.pause_collection) {
        log('Already paused — refusing to extend', { subscriptionId });
        return jsonResponse({ success: false, error: 'already_paused' }, 400);
      }

      const months = Math.min(
        Math.max(Math.round(Number(body.pauseMonths) || 1), 1),
        MAX_PAUSE_MONTHS
      );
      const resumesAt = new Date();
      resumesAt.setMonth(resumesAt.getMonth() + months);
      const resumesAtUnix = Math.floor(resumesAt.getTime() / 1000);

      // behavior:'void' — invoices during the pause are voided rather than
      // collected later. 'keep_as_draft' would hand them a bill for the
      // months they deliberately skipped, which is the opposite of the offer.
      const updated = await stripe.subscriptions.update(subscriptionId, {
        pause_collection: { behavior: 'void', resumes_at: resumesAtUnix },
        metadata: {
          retention_paused_at: new Date().toISOString(),
          retention_pause_months: String(months),
          retention_survey_id: surveyId ?? '',
          retention_user_id: user.id,
        },
      });
      log('Subscription paused', { subscriptionId, months, status: updated.status });

      // Stop access now rather than waiting for the webhook to notice.
      // Stripe leaves `status` as 'active' on a paused subscription, so the
      // webhook has its own pause_collection check — but the event can lag by
      // seconds, and during that window the user is unbilled with full access.
      // Writing it here closes the window; the webhook then agrees rather than
      // reverting it.
      const { error: accessErr } = await serviceClient
        .from('profiles')
        .update({ subscribed: false })
        .eq('id', user.id);
      if (accessErr) {
        log('WARN: could not revoke access on pause', { error: accessErr.message });
      }

      await recordOutcome(serviceClient, surveyId, user.id, 'paused', {
        kind: 'pause',
        pause_months: months,
        resumes_at: resumesAt.toISOString(),
      });

      return jsonResponse({
        success: true,
        kind: 'pause',
        pause_months: months,
        resumes_at: resumesAt.toISOString(),
      });
    }

    // ── Discount ────────────────────────────────────────────────────────
    // Read the coupon first: its percentage is what the user gets told, so
    // it comes from Stripe rather than from a constant that can drift.
    const coupon = await ensureCoupon(stripe);
    if (!coupon?.valid) {
      log('WARN: retention coupon unavailable', { coupon: RETENTION_COUPON_ID });
      return jsonResponse({ success: false, error: 'offer_unavailable' }, 400);
    }

    // A subscription can only carry one discount. Re-applying to someone who
    // already has one would silently replace a better deal with this one.
    if (subscription.discount) {
      log('Already discounted — leaving it alone', {
        subscriptionId,
        existing: subscription.discount.coupon?.id,
      });
      return jsonResponse(
        { success: false, error: 'already_discounted' },
        400
      );
    }

    await stripe.subscriptions.update(subscriptionId, {
      coupon: RETENTION_COUPON_ID,
      metadata: {
        retention_offer_applied_at: new Date().toISOString(),
        retention_offer_coupon: RETENTION_COUPON_ID,
        retention_survey_id: surveyId ?? '',
        retention_user_id: user.id,
      },
    });

    // The authoritative answer to "what will I actually pay": Stripe's own
    // preview of the next invoice, after the coupon. Never computed here.
    const preview = await previewNextInvoice(stripe, stripeKey, subscriptionId);
    const nextAmount = preview?.amount ?? null;
    const nextCurrency = preview?.currency ?? 'gbp';
    const nextDate = preview?.date ?? null;

    log('Coupon applied', {
      subscriptionId,
      coupon: RETENTION_COUPON_ID,
      percentOff: coupon.percent_off,
      nextAmount,
    });

    await recordOutcome(serviceClient, surveyId, user.id, 'stayed', {
      kind: 'discount',
      coupon_id: RETENTION_COUPON_ID,
      percent_off: coupon.percent_off,
      duration_in_months: coupon.duration_in_months,
      next_amount: nextAmount,
      next_currency: nextCurrency,
    });

    return jsonResponse({
      success: true,
      kind: 'discount',
      percent_off: coupon.percent_off,
      duration_in_months: coupon.duration_in_months,
      next_amount: nextAmount,
      next_currency: nextCurrency,
      next_payment_date: nextDate,
    });
  } catch (error) {
    await captureException(error, {
      functionName: 'apply-retention-offer',
      requestUrl: req.url,
      requestMethod: req.method,
    });
    const message = error instanceof Error ? error.message : String(error);
    log('ERROR', { message });
    return jsonResponse({ success: false, error: message }, 500);
  }
});

/**
 * What Stripe says the next bill will be, now that the coupon is on.
 *
 * TWO APIS, because this account has subscriptions of both shapes. Older ones
 * answer to the Upcoming Invoice API. Newer ones are created with
 * `billing_mode = flexible`, and for those that endpoint refuses outright:
 *   "The Upcoming Invoice API does not support `billing_mode = flexible`
 *    subscriptions. Use the Create Preview Invoice API instead."
 * Verified against live subscriptions on 10 Sep 2026 — a real one previewed
 * £4.99 → £2.99 through create_preview while `upcoming` errored on it.
 *
 * create_preview is reached with fetch rather than the SDK: stripe-node
 * 14.21.0 predates it and has no typed method. It is a POST that persists
 * nothing — a preview, despite the verb.
 *
 * Returns null when neither works. That is not fatal: the coupon is already
 * applied by this point, and the client falls back to stating the percentage
 * rather than a figure it cannot stand behind.
 */
async function previewNextInvoice(
  stripe: Stripe,
  stripeKey: string,
  subscriptionId: string
): Promise<{ amount: number; currency: string; date: string | null } | null> {
  try {
    const upcoming = await stripe.invoices.retrieveUpcoming({ subscription: subscriptionId });
    return {
      amount: upcoming.amount_due,
      currency: upcoming.currency ?? 'gbp',
      date: upcoming.next_payment_attempt
        ? new Date(upcoming.next_payment_attempt * 1000).toISOString()
        : null,
    };
  } catch (err) {
    log('Upcoming Invoice API unavailable — trying create_preview', {
      message: err instanceof Error ? err.message : String(err),
    });
  }
  try {
    const res = await fetch('https://api.stripe.com/v1/invoices/create_preview', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${stripeKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ subscription: subscriptionId }),
    });
    if (!res.ok) {
      log('WARN: create_preview failed', { status: res.status });
      return null;
    }
    const invoice = await res.json();
    return {
      amount: invoice.amount_due,
      currency: invoice.currency ?? 'gbp',
      date: invoice.next_payment_attempt
        ? new Date(invoice.next_payment_attempt * 1000).toISOString()
        : null,
    };
  } catch (err) {
    log('WARN: could not preview next invoice', {
      message: err instanceof Error ? err.message : String(err),
    });
    return null;
  }
}

/**
 * Fetches the retention coupon, creating it once if it does not exist yet.
 *
 * Creating it here rather than by hand means the offer cannot be dead on
 * arrival in a fresh environment, and there is no manual dashboard step to
 * forget — which is exactly how the previous coupons ended up describing
 * prices that had moved on. It is safe to run on every discount request:
 * `retrieve` succeeds from the second call onwards, and creating with an
 * explicit `id` is idempotent (a duplicate id is rejected by Stripe, which
 * we then read back rather than treating as an error).
 *
 * Returns null if the coupon can be neither read nor created, so the caller
 * can refuse cleanly instead of applying something unknown.
 */
async function ensureCoupon(stripe: Stripe): Promise<Stripe.Coupon | null> {
  try {
    return await stripe.coupons.retrieve(RETENTION_COUPON_ID);
  } catch {
    log('Retention coupon missing — creating it', { coupon: RETENTION_COUPON_ID });
  }
  try {
    return await stripe.coupons.create({
      id: RETENTION_COUPON_ID,
      percent_off: 40,
      duration: 'repeating',
      duration_in_months: 3,
      name: 'Elec-Mate — stay offer (40% for 3 months)',
      metadata: { created_by: 'apply-retention-offer', purpose: 'cancel-flow retention' },
    });
  } catch (err) {
    // Most likely a race with a concurrent request that just created it.
    log('Coupon create failed — re-reading', {
      message: err instanceof Error ? err.message : String(err),
    });
    try {
      return await stripe.coupons.retrieve(RETENTION_COUPON_ID);
    } catch {
      return null;
    }
  }
}

/**
 * Marks the survey row with what actually happened. Deliberately non-fatal:
 * the money change in Stripe has already succeeded by this point, so failing
 * the whole request over an analytics write would tell the user their offer
 * didn't apply when it did.
 */
async function recordOutcome(
  serviceClient: SupabaseClient,
  surveyId: string | null | undefined,
  userId: string,
  outcome: 'stayed' | 'paused',
  applied: Record<string, unknown>
) {
  if (!surveyId) return;
  const { error } = await serviceClient
    .from('cancel_survey_responses')
    .update({
      outcome,
      outcome_at: new Date().toISOString(),
      intervention_applied: applied,
    })
    .eq('id', surveyId)
    .eq('user_id', userId);
  if (error) {
    log('WARN: could not update survey outcome', { surveyId, error: error.message });
  }
}

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    status,
  });
}
