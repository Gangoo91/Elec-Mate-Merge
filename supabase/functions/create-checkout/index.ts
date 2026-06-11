import { corsHeaders, serve, createClient } from '../_shared/deps.ts';
import { handleError, ValidationError } from '../_shared/errors.ts';
import { withRetry, RetryPresets } from '../_shared/retry.ts';
import { withTimeout, Timeouts } from '../_shared/timeout.ts';
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

  try {
    const requestId = generateRequestId();
    const logger = createLogger(requestId);

    logger.info('💳 Create checkout started');

    // Get request body
    const body = await req.json();
    const { priceId, mode, planId, offerCode, referralCode, winbackCouponId } = body;

    // Win-back coupons created in Stripe 2026-05-23 — only these IDs are
    // accepted via the winback deep-link path. Anything else from the
    // client is silently ignored to stop a tampered request applying
    // arbitrary discounts.
    const WINBACK_COUPONS_ALLOWED: Record<string, { plan: string; label: string }> = {
      YhLPdvFl: { plan: 'apprentice', label: 'Apprentice win-back £3.99/mo' },
      SSmqkZGn: { plan: 'electrician', label: 'Electrician win-back £9.99/mo' },
    };

    // Per-plan trial duration in days. 0 = charge immediately, no trial.
    // Mate (business-ai) gets a 3-day trial; electrician/apprentice keep 7.
    // Employer plans charge immediately.
    const planBase = planId ? planId.replace(/-(monthly|yearly|annual)$/, '') : '';
    const trialDaysFor = (p: string): number => {
      if (p === 'business-ai') return 3;
      if (p === 'employer') return 0;
      return 7;
    };
    const trialDays = trialDaysFor(planBase);
    const isNoTrialPlan = trialDays === 0;

    // Founder pricing: first 100 Mate subscribers get the "mate_founder"
    // Stripe coupon (25% off forever — £39.99→£29.99, £399.99→£299.99).
    // Cap is enforced here at checkout-creation time — the existing 9 active
    // beta users are already flagged is_founder=true, so they count.
    const FOUNDER_COUPON_ID = Deno.env.get('MATE_FOUNDER_COUPON_ID') || '6fuVPsKN';
    const MATE_FOUNDER_CAP = 100;

    logger.info('Request body received', {
      priceId,
      mode,
      planId,
      offerCode,
      referralCode,
      isNoTrialPlan,
    });

    if (!priceId || !mode || !planId) {
      throw new ValidationError('Missing required parameters: priceId, mode, or planId');
    }

    // Authenticate user
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new ValidationError('No authorization header provided');
    }

    const token = authHeader.replace('Bearer ', '');
    logger.debug('Authenticating user with token');

    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY');

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new ValidationError('Supabase credentials not configured');
    }

    const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

    const { data: userData, error: authError } = await withTimeout(
      supabaseClient.auth.getUser(token),
      Timeouts.QUICK,
      'user authentication'
    );

    if (authError) {
      logger.error('Authentication error', { error: authError.message });
      throw new Error(`Authentication error: ${authError.message}`);
    }

    const user = userData.user;
    if (!user?.email) {
      throw new ValidationError('User not authenticated or email not available');
    }

    logger.info('User authenticated', { userId: user.id, email: user.email });

    // Initialize Stripe
    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');
    if (!stripeKey) {
      throw new ValidationError('STRIPE_SECRET_KEY is not set');
    }

    const stripe = new Stripe(stripeKey, {
      apiVersion: '2023-10-16',
    });

    logger.info('Stripe initialized');

    // Check if a Stripe customer record exists for this user with timeout
    const customers = await withTimeout(
      withRetry(() => stripe.customers.list({ email: user.email, limit: 1 }), RetryPresets.FAST),
      Timeouts.STANDARD,
      'Stripe customer lookup'
    );

    let customerId;

    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      logger.info('Existing customer found', { customerId });
    } else {
      // Create a new customer if one doesn't exist with retry
      const newCustomer = await withTimeout(
        withRetry(
          () =>
            stripe.customers.create({
              email: user.email,
              metadata: {
                userId: user.id,
              },
            }),
          RetryPresets.FAST
        ),
        Timeouts.STANDARD,
        'Stripe customer creation'
      );
      customerId = newCustomer.id;
      logger.info('New customer created', { customerId });
    }

    // Guard against double-checkout: if this customer already has a live
    // subscription for the SAME product (e.g. payment just succeeded but the
    // webhook hasn't updated profiles.subscribed yet, and they retried from
    // the paywall), a second session risks a double-charge. Same-product
    // only — buying Mate (business-ai) on top of an Electrician sub is a
    // legitimate second subscription and must pass through.
    const [existingSubs, requestedPrice] = await Promise.all([
      withTimeout(
        withRetry(
          () => stripe.subscriptions.list({ customer: customerId, status: 'all', limit: 10 }),
          RetryPresets.FAST
        ),
        Timeouts.STANDARD,
        'Stripe subscription lookup'
      ),
      withTimeout(
        withRetry(() => stripe.prices.retrieve(priceId), RetryPresets.FAST),
        Timeouts.STANDARD,
        'Stripe price lookup'
      ),
    ]);
    const liveSameProductSub = existingSubs.data.find(
      (s) =>
        (s.status === 'active' || s.status === 'trialing') &&
        s.items.data.some((it) => it.price.product === requestedPrice.product)
    );
    if (liveSameProductSub) {
      logger.info('Customer already has a live subscription for this product — skipping checkout', {
        customerId,
        subscriptionId: liveSameProductSub.id,
        status: liveSameProductSub.status,
      });
      return new Response(JSON.stringify({ already_subscribed: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      });
    }

    // Store stripe_customer_id in profile for reliable webhook linking
    try {
      const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
      if (supabaseServiceKey) {
        const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
        await supabaseAdmin
          .from('profiles')
          .update({ stripe_customer_id: customerId })
          .eq('id', user.id);
        logger.info('Stored stripe_customer_id in profile', { userId: user.id, customerId });
      }
    } catch (linkError: unknown) {
      logger.warn('Failed to store stripe_customer_id (non-fatal)', {
        error: linkError instanceof Error ? linkError.message : String(linkError),
      });
    }

    // Look up offer code if provided
    let discounts: { promotion_code: string }[] | undefined = undefined;
    if (offerCode) {
      logger.info('Looking up offer code', { offerCode });

      // Create admin client for reading promo offers
      const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
      if (supabaseServiceKey) {
        const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

        const { data: offer, error: offerError } = await supabaseAdmin
          .from('promo_offers')
          .select('stripe_promotion_code_id, is_active, plan_id')
          .eq('code', offerCode)
          .single();

        if (offerError) {
          logger.warn('Offer lookup failed', { error: offerError.message });
        } else if (offer?.is_active && offer.stripe_promotion_code_id) {
          // Verify the offer matches the plan being purchased
          // planId format: "apprentice-monthly" or "electrician-yearly"
          // offer.plan_id format: "apprentice" or "electrician"
          const planMatches = planId.startsWith(offer.plan_id);
          if (planMatches) {
            discounts = [{ promotion_code: offer.stripe_promotion_code_id }];
            logger.info('Applying promotion code', {
              stripePromoCodeId: offer.stripe_promotion_code_id,
            });
          } else {
            logger.warn('Offer plan mismatch', {
              offerPlan: offer.plan_id,
              requestedPlan: planId,
            });
          }
        } else {
          logger.warn('Offer not active or missing Stripe ID', {
            isActive: offer?.is_active,
            hasStripeId: !!offer?.stripe_promotion_code_id,
          });
        }
      }
    }

    // ── Win-back coupon (from email deep link) ────────────────────────
    // Only honoured if:
    //   1. The id is in the WINBACK_COUPONS_ALLOWED list (no tampering)
    //   2. The plan being checked out matches the coupon's plan
    //   3. No other discount has already been locked in this request
    // Failure to satisfy any of these is silent — we just don't apply it.
    if (!discounts && winbackCouponId) {
      const allowed = WINBACK_COUPONS_ALLOWED[winbackCouponId];
      if (allowed && planBase === allowed.plan) {
        discounts = [{ coupon: winbackCouponId }];
        logger.info('Win-back coupon applied at checkout', {
          coupon: winbackCouponId,
          label: allowed.label,
          planBase,
        });
      } else {
        logger.warn('Win-back coupon ignored', {
          coupon: winbackCouponId,
          planBase,
          reason: !allowed ? 'not in allow-list' : 'plan mismatch',
        });
      }
    }

    // ── Founder auto-apply ────────────────────────────────────────────
    // For Mate (business-ai) plans, if no other discount is locked in,
    // check founder slots and apply the founder coupon if available.
    let isFounderCheckout = false;
    if (planBase === 'business-ai' && !discounts) {
      const supabaseServiceKeyFounder = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
      if (supabaseServiceKeyFounder) {
        const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKeyFounder);
        const { count: founderCount } = await supabaseAdmin
          .from('profiles')
          .select('*', { count: 'exact', head: true })
          .eq('is_founder', true);

        if ((founderCount ?? 0) < MATE_FOUNDER_CAP) {
          discounts = [{ coupon: FOUNDER_COUPON_ID }];
          isFounderCheckout = true;
          logger.info('Applying Mate founder coupon', {
            currentFounderCount: founderCount ?? 0,
            cap: MATE_FOUNDER_CAP,
            slot: (founderCount ?? 0) + 1,
          });
        } else {
          logger.info('Founder slots full — no founder discount applied', {
            currentFounderCount: founderCount,
            cap: MATE_FOUNDER_CAP,
          });
        }
      }
    }

    // Handle referral code — create a one-time 100% off first month coupon
    if (referralCode && !discounts) {
      logger.info('Processing referral code', { referralCode });

      const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
      if (supabaseServiceKey) {
        const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

        // Validate referral code exists and is active
        const { data: refCode, error: refError } = await supabaseAdmin
          .from('referral_codes')
          .select('user_id, code, is_active')
          .eq('code', referralCode)
          .eq('is_active', true)
          .maybeSingle();

        if (refError) {
          logger.warn('Referral code lookup failed', { error: refError.message });
        } else if (refCode) {
          // Don't allow self-referral
          if (refCode.user_id !== user.id) {
            try {
              // Create a one-time 100% off coupon for 1 month
              const coupon = await withRetry(
                () =>
                  stripe.coupons.create({
                    percent_off: 100,
                    duration: 'once',
                    name: `Referral: Free first month (${referralCode})`,
                    metadata: {
                      referral_code: referralCode,
                      referrer_id: refCode.user_id,
                      referred_id: user.id,
                    },
                  }),
                RetryPresets.FAST
              );

              discounts = [{ coupon: coupon.id }];
              logger.info('Referral coupon created and applied', {
                couponId: coupon.id,
                referralCode,
              });
            } catch (couponErr: unknown) {
              logger.warn('Failed to create referral coupon (non-fatal)', {
                error: couponErr instanceof Error ? couponErr.message : String(couponErr),
              });
            }
          } else {
            logger.warn('Self-referral attempted', { userId: user.id, referralCode });
          }
        } else {
          logger.warn('Referral code not found or inactive', { referralCode });
        }
      }
    }

    // Create checkout options based on mode
    const origin = req.headers.get('origin') || 'https://elec-mate.com';

    // All buyers (including Mate) land on the generic payment-success page
    // for now. Once Mate goes live publicly, swap the Mate branch back to
    // /electrician/business-ai so paying users reach the activation wizard.
    const successUrl = `${origin}/payment-success?plan=${planId}&trial=${isNoTrialPlan ? 'false' : 'true'}`;

    const checkoutOptions: Record<string, unknown> = {
      customer: customerId,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: mode,
      payment_method_collection: 'always',
      success_url: successUrl,
      cancel_url: `${origin}/subscriptions?cancelled=1`,
      client_reference_id: user.id,
      metadata: {
        userId: user.id,
        planId: planId,
        ...(referralCode ? { referralCode } : {}),
        ...(isFounderCheckout ? { mate_founder: 'true' } : {}),
      },
      payment_method_types: ['card'],
      billing_address_collection: 'auto',
      // If we have a specific discount to apply, use that; otherwise allow manual promo codes
      ...(discounts ? { discounts } : { allow_promotion_codes: true }),
      // Free trial duration is per-plan: Mate=3, electrician/apprentice=7, employer=0.
      ...(mode === 'subscription'
        ? {
            subscription_data: {
              ...(trialDays > 0 ? { trial_period_days: trialDays } : {}),
              metadata: {
                userId: user.id,
                planId: planId,
                ...(trialDays > 0 ? { trial_days: String(trialDays) } : {}),
                ...(isFounderCheckout ? { mate_founder: 'true' } : {}),
              },
            },
          }
        : {}),
    };

    logger.info('Creating checkout session with options', checkoutOptions);

    // Create checkout session with retry and timeout
    const session = await withTimeout(
      withRetry(() => stripe.checkout.sessions.create(checkoutOptions), RetryPresets.FAST),
      Timeouts.STANDARD,
      'Stripe checkout session creation'
    );

    logger.info('Checkout session created', { sessionId: session.id, url: session.url });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    // Capture to Sentry
    await captureException(error, {
      functionName: 'create-checkout',
      requestUrl: req.url,
      requestMethod: req.method,
    });

    return handleError(error);
  }
});
