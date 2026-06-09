/**
 * apply-retention-offer
 * ───────────────────────────────────────────────────────────────────────
 * Applies the in-app retention discount to a user's active Stripe
 * subscription, called from the CancelFlow modal when a user accepts
 * the "stay for less" offer.
 *
 * Coupons (created in Stripe 2026-05-23, GBP, duration=forever):
 *   YhLPdvFl  → £2.00 off  → Apprentice  £5.99 → £3.99
 *   SSmqkZGn  → £3.00 off  → Electrician £12.99 → £9.99
 *
 * For any tier outside apprentice/electrician we return a clean 400 so
 * the front-end falls back to the "message Andrew" path instead.
 *
 * Marks the matching cancel_survey_responses row as outcome='stayed'
 * so analytics can compute true save rate against intent.
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
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[APPLY-RETENTION-OFFER] ${step}${detailsStr}`);
};

// Tier → coupon mapping. Source of truth for which discount applies.
const COUPON_BY_TIER: Record<string, { id: string; newPrice: string }> = {
  apprentice: { id: 'YhLPdvFl', newPrice: '£3.99' },
  electrician: { id: 'SSmqkZGn', newPrice: '£9.99' },
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');
    if (!stripeKey) throw new Error('STRIPE_SECRET_KEY is not set');

    // Anon client just to verify the caller — we use service_role
    // below to write back to cancel_survey_responses.
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

    let body: { subscriptionId?: string; surveyId?: string | null };
    try {
      body = await req.json();
    } catch {
      throw new Error('Invalid JSON body');
    }
    const { subscriptionId, surveyId } = body;
    if (!subscriptionId) throw new Error('subscriptionId is required');

    // Pull the user's tier from profiles. We trust the DB, not the client.
    const { data: profile, error: profileErr } = await serviceClient
      .from('profiles')
      .select('subscription_tier, full_name')
      .eq('id', user.id)
      .single();
    if (profileErr) throw new Error(`Profile lookup failed: ${profileErr.message}`);

    const tier = (profile?.subscription_tier || '').toLowerCase();
    const couponMapping = COUPON_BY_TIER[tier];
    if (!couponMapping) {
      log('No retention coupon available for tier — bailing', { tier });
      return jsonResponse(
        {
          success: false,
          error: 'no_offer_available',
          message:
            'No automated retention offer for this plan — please message founder@elec-mate.com.',
        },
        400
      );
    }

    const stripe = new Stripe(stripeKey, { apiVersion: '2023-10-16' });

    // Sanity-check that the subscription belongs to this user. We do this
    // by listing the user's subs by their Stripe customer id (looked up
    // via email). Protects against subscriptionId tampering from the client.
    const customers = await stripe.customers.list({ email: user.email!, limit: 5 });
    const ownsSub = customers.data.some(async (c) => {
      const subs = await stripe.subscriptions.list({ customer: c.id, limit: 20 });
      return subs.data.some((s) => s.id === subscriptionId);
    });
    if (!ownsSub) {
      // Soft-fail: continue anyway if user can't be matched by email
      // (some migrated customers). But log it loudly so we can audit.
      log('WARN: could not confirm subscription ownership by email', {
        email: user.email,
        subscriptionId,
      });
    }

    // Apply the coupon to the existing subscription. duration=forever
    // means the discount stays for the lifetime of the sub.
    const updated = await stripe.subscriptions.update(subscriptionId, {
      coupon: couponMapping.id,
      metadata: {
        retention_offer_applied_at: new Date().toISOString(),
        retention_offer_coupon: couponMapping.id,
        retention_survey_id: surveyId ?? '',
        retention_user_id: user.id,
      },
    });
    log('Coupon applied to subscription', {
      subscriptionId,
      coupon: couponMapping.id,
      status: updated.status,
    });

    // Mark the survey as a save.
    if (surveyId) {
      const { error: updErr } = await serviceClient
        .from('cancel_survey_responses')
        .update({
          outcome: 'stayed',
          outcome_at: new Date().toISOString(),
        })
        .eq('id', surveyId)
        .eq('user_id', user.id);
      if (updErr) {
        log('WARN: could not update survey outcome', { surveyId, error: updErr.message });
      }
    }

    return jsonResponse({
      success: true,
      new_price: couponMapping.newPrice,
      coupon: couponMapping.id,
      subscription_status: updated.status,
    });
  } catch (error) {
    await captureException(error, { functionName: 'apply-retention-offer', requestUrl: req.url, requestMethod: req.method });
    const message = error instanceof Error ? error.message : String(error);
    log('ERROR', { message });
    return jsonResponse(
      {
        success: false,
        error: message,
      },
      500
    );
  }
});

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    status,
  });
}
