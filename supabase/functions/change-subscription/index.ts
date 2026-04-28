/**
 * POST /change-subscription
 *
 * Swaps the price on a user's existing active Stripe subscription so they
 * don't end up paying for two tiers at once. Use this whenever a logged-in
 * user with an existing subscription clicks "Subscribe" on a different
 * tier — never call create-checkout in that case, or you'll create a
 * second subscription and double-bill the user.
 *
 * Behaviour:
 *   - Looks up the user's most-recent active subscription via
 *     `stripe_customer_id` on their profile.
 *   - If no active subscription exists → returns `{ ok: false,
 *     fallback_to_checkout: true }` so the frontend can fall back to the
 *     existing create-checkout flow.
 *   - If an active subscription exists → updates the single subscription
 *     item to the new price with `proration_behavior: 'always_invoice'`.
 *     Stripe will:
 *       (a) credit the unused portion of the old plan,
 *       (b) charge the prorated cost of the new plan immediately,
 *       (c) keep the same renewal date for the new plan from the
 *           next billing cycle onwards.
 *     Net effect: the user pays only the difference between the two
 *     tiers for the remaining days in the period, then the new full
 *     price from next cycle.
 *
 * Body: { priceId: string, planId?: string }
 * Auth: Bearer JWT
 */

import { corsHeaders, serve, createClient } from '../_shared/deps.ts';
import { handleError, ValidationError, AuthenticationError } from '../_shared/errors.ts';
import { withTimeout, Timeouts } from '../_shared/timeout.ts';
import { withRetry, RetryPresets } from '../_shared/retry.ts';
import { createLogger, generateRequestId } from '../_shared/logger.ts';
import Stripe from 'https://esm.sh/stripe@14.21.0';
import { captureException } from '../_shared/sentry.ts';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const requestId = generateRequestId();
  const logger = createLogger(requestId);

  try {
    logger.info('💳 change-subscription started');

    const { priceId, planId } = await req.json();
    if (!priceId || typeof priceId !== 'string') {
      throw new ValidationError('priceId is required');
    }

    // ── Auth ─────────────────────────────────────────────────────────
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) throw new AuthenticationError('No authorization header');

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

    const token = authHeader.replace('Bearer ', '');
    const { data: userData, error: authError } = await withTimeout(
      supabaseClient.auth.getUser(token),
      Timeouts.QUICK,
      'user authentication'
    );
    if (authError) throw new AuthenticationError(`Authentication error: ${authError.message}`);
    const user = userData.user;
    if (!user?.email) throw new ValidationError('User not authenticated');

    logger.info('User authenticated', { userId: user.id });

    // ── Stripe init ──────────────────────────────────────────────────
    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');
    if (!stripeKey) throw new ValidationError('STRIPE_SECRET_KEY not set');
    const stripe = new Stripe(stripeKey, { apiVersion: '2023-10-16' });

    // ── Find the user's customer + active subscription ───────────────
    // Prefer the stripe_customer_id stored on profiles (set by create-checkout).
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    if (!supabaseServiceKey) throw new ValidationError('Service role key not configured');
    const admin = createClient(supabaseUrl, supabaseServiceKey);

    const { data: profile } = await admin
      .from('profiles')
      .select('stripe_customer_id, subscription_tier, subscribed')
      .eq('id', user.id)
      .maybeSingle();

    let customerId = profile?.stripe_customer_id ?? null;

    // Fallback: look up by email if profile is missing the link
    if (!customerId) {
      logger.debug('No stripe_customer_id on profile, looking up by email');
      const customers = await withTimeout(
        withRetry(() => stripe.customers.list({ email: user.email, limit: 1 }), RetryPresets.FAST),
        Timeouts.STANDARD,
        'Stripe customer lookup'
      );
      customerId = customers.data[0]?.id ?? null;
    }

    if (!customerId) {
      logger.info('No Stripe customer — falling back to checkout');
      return new Response(
        JSON.stringify({ ok: false, fallback_to_checkout: true, reason: 'no_customer' }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // List active subscriptions for this customer
    const subs = await withTimeout(
      withRetry(
        () =>
          stripe.subscriptions.list({
            customer: customerId,
            status: 'all',
            limit: 5,
          }),
        RetryPresets.FAST
      ),
      Timeouts.STANDARD,
      'Stripe subscription list'
    );

    // Active = anything we shouldn't double-bill on top of
    const activeStatuses = new Set(['active', 'trialing', 'past_due']);
    const liveSub = subs.data.find((s) => activeStatuses.has(s.status));

    if (!liveSub) {
      logger.info('No active subscription found — falling back to checkout');
      return new Response(
        JSON.stringify({ ok: false, fallback_to_checkout: true, reason: 'no_active_sub' }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // No-op: already on this exact price
    const item = liveSub.items.data[0];
    if (!item) {
      throw new Error('Active subscription has no items — cannot change price');
    }
    if (item.price.id === priceId) {
      logger.info('Already on requested price — no-op', { subId: liveSub.id, priceId });
      return new Response(
        JSON.stringify({ ok: true, no_change: true, subscriptionId: liveSub.id }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    logger.info('Swapping subscription price', {
      subId: liveSub.id,
      oldPriceId: item.price.id,
      newPriceId: priceId,
      planId,
    });

    // ── Swap with proration ──────────────────────────────────────────
    // proration_behavior: 'always_invoice' — Stripe credits the unused
    // portion of the old plan and charges the prorated portion of the new
    // plan immediately. From the user's perspective they pay only the
    // difference, never both. Renewal date is preserved.
    const updated = await withTimeout(
      withRetry(
        () =>
          stripe.subscriptions.update(liveSub.id, {
            items: [{ id: item.id, price: priceId }],
            proration_behavior: 'always_invoice',
            // Keep cancel_at_period_end behaviour intact if user had set it
            cancel_at_period_end: liveSub.cancel_at_period_end,
            metadata: {
              ...(liveSub.metadata || {}),
              userId: user.id,
              ...(planId ? { planId } : {}),
              changed_at: new Date().toISOString(),
              changed_from: item.price.id,
            },
          }),
        RetryPresets.FAST
      ),
      Timeouts.STANDARD,
      'Stripe subscription update'
    );

    logger.info('Subscription updated', {
      subId: updated.id,
      newPriceId: priceId,
      latestInvoice: updated.latest_invoice,
    });

    return new Response(
      JSON.stringify({
        ok: true,
        subscriptionId: updated.id,
        message:
          "Plan changed. We've prorated the difference — you'll see the adjustment on your next invoice or as an immediate top-up.",
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    await captureException(error, {
      functionName: 'change-subscription',
      requestUrl: req.url,
      requestMethod: req.method,
    });
    return handleError(error);
  }
});
