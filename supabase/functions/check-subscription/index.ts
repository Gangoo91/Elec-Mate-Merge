import { serve, createClient, corsHeaders } from '../_shared/deps.ts';
import { handleError, ValidationError } from '../_shared/errors.ts';
import { withRetry, RetryPresets } from '../_shared/retry.ts';
import { withTimeout, Timeouts } from '../_shared/timeout.ts';
import { createLogger, generateRequestId } from '../_shared/logger.ts';
import { captureException } from '../_shared/sentry.ts';
import Stripe from 'https://esm.sh/stripe@14.21.0';

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

    logger.info('💳 Check subscription started');

    // Use the service role key to perform writes (upsert) in Supabase
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false } }
    );

    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');
    if (!stripeKey) throw new ValidationError('STRIPE_SECRET_KEY is not set');

    const authHeader = req.headers.get('Authorization');
    if (!authHeader) throw new ValidationError('No authorization header provided');

    const token = authHeader.replace('Bearer ', '');
    logger.debug('Authenticating user with token');

    const { data: userData, error: userError } = await withTimeout(
      supabaseClient.auth.getUser(token),
      Timeouts.STANDARD, // Increased from QUICK (5s) to STANDARD (30s) to handle slow auth responses
      'user authentication'
    );

    // Handle auth errors gracefully - return unsubscribed rather than throwing
    // This prevents Sentry noise from expired/invalid tokens during navigation
    if (userError) {
      logger.warn('Auth error (returning unsubscribed)', { error: userError.message });
      return new Response(JSON.stringify({ subscribed: false, auth_error: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      });
    }
    const user = userData.user;
    if (!user?.email) {
      logger.warn('User not authenticated or email not available');
      return new Response(JSON.stringify({ subscribed: false, auth_error: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      });
    }

    logger.info('User authenticated', { userId: user.id, email: user.email });

    // First check if user has admin-granted free access
    const { data: profileData } = await supabaseClient
      .from('profiles')
      .select('free_access_granted, free_access_expires_at, subscription_tier, subscribed')
      .eq('id', user.id)
      .single();

    if (profileData?.free_access_granted === true) {
      const now = new Date();
      const expiresAt = profileData.free_access_expires_at
        ? new Date(profileData.free_access_expires_at)
        : null;

      if (expiresAt && expiresAt < now) {
        // Free access has expired — auto-clean
        logger.info('Free access expired, revoking', {
          userId: user.id,
          expiredAt: profileData.free_access_expires_at,
        });

        try {
          await withTimeout(
            supabaseClient
              .from('profiles')
              .update({
                subscribed: false,
                free_access_granted: false,
                free_access_expires_at: null,
                free_access_reason: null,
                subscription_tier: null,
                subscription_start: null,
                subscription_end: null,
                updated_at: now.toISOString(),
              })
              .eq('id', user.id),
            Timeouts.QUICK,
            'profile update (expired free access)'
          );
        } catch (timeoutError) {
          logger.error('Profile update timed out during expiry cleanup', { error: timeoutError });
        }

        // Don't return early — fall through to Stripe check
      } else {
        // Valid free access (no expiry or not yet expired)
        logger.info('User has admin-granted free access', {
          userId: user.id,
          tier: profileData.subscription_tier,
          expiresAt: profileData.free_access_expires_at || 'never',
        });
        return new Response(
          JSON.stringify({
            subscribed: true,
            subscription_tier: profileData.subscription_tier || 'Employer',
          }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
          }
        );
      }
    }

    const stripe = new Stripe(stripeKey, { apiVersion: '2023-10-16' });

    // Complete price-to-tier mapping (matches webhook)
    const PRICE_TO_TIER: Record<string, string> = {
      // Apprentice
      price_1TKlA22RKw5t5RAmpvhojy0b: 'apprentice', // £5.99/month (current — Apr 2026)
      price_1SmUef2RKw5t5RAmRIMTWTqU: 'apprentice', // £4.99/month (legacy)
      price_1TKlKK2RKw5t5RAmGVR5EcF9: 'apprentice_yearly', // £59.99/year (current — Apr 2026)
      price_1SmUfK2RKw5t5RAml6bj1I77: 'apprentice_yearly', // £49.99/year (legacy)
      // Electrician Pro
      price_1TKlA12RKw5t5RAmdhZyhX1I: 'electrician', // £12.99/month (current — Apr 2026)
      price_1SqJVr2RKw5t5RAmaiTGelLN: 'electrician', // £9.99/month (legacy)
      price_1TKlKL2RKw5t5RAmpD8FH7qp: 'electrician_yearly', // £129.99/year (current — Apr 2026)
      price_1SqJVs2RKw5t5RAmVeD2QVsb: 'electrician_yearly', // £99.99/year (legacy)
      // Business AI - £29.99/month, £299.99/year
      price_1T6DUx2RKw5t5RAmpb177NJV: 'business_ai',
      price_1T6DUy2RKw5t5RAmo9HgAukW: 'business_ai_yearly',
      // Employer
      price_1SlyAT2RKw5t5RAmUmTRGimH: 'employer',
      price_1SlyB82RKw5t5RAmN447YJUW: 'employer_yearly',
      // Founders
      price_1SPK8c2RKw5t5RAmRGJxXfjc: 'employer',
      // Electrician Win-Back (20% discount offer)
      price_1SvggR2RKw5t5RAmDN29FBzx: 'electrician',
      price_1SvggR2RKw5t5RAmsrerSmdG: 'electrician_yearly',
      // Legacy
      price_1RhtdT2RKw5t5RAmv6b2xE6p: 'apprentice',
      price_1Rhtgl2RKw5t5RAmkQVKVnKn: 'apprentice_yearly',
      price_1RhteS2RKw5t5RAmzRbaTE8U: 'electrician',
      price_1RhtiS2RKw5t5RAmha0s6PJA: 'electrician_yearly',
    };

    // Tiers that include Business AI agent access
    const BUSINESS_AI_TIERS = new Set([
      'business_ai',
      'business_ai_yearly',
      'employer',
      'employer_yearly',
    ]);

    // Fetch Stripe customers with retry and timeout
    const customers = await withRetry(
      () =>
        withTimeout(
          stripe.customers.list({ email: user.email, limit: 1 }),
          Timeouts.STANDARD,
          'Stripe customer lookup'
        ),
      RetryPresets.STANDARD
    );

    if (customers.data.length === 0) {
      // ELE-432: If the user has no Stripe customer but their profile shows an
      // active subscription (set by RevenueCat webhook for native IAP), do NOT
      // overwrite it. Return the existing profile state instead.
      if (profileData?.subscribed) {
        logger.info(
          'No Stripe customer but profile.subscribed=true (likely IAP subscriber), preserving state',
          {
            userId: user.id,
            tier: profileData.subscription_tier,
          }
        );
        return new Response(
          JSON.stringify({
            subscribed: true,
            subscription_tier: profileData.subscription_tier,
          }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
          }
        );
      }

      // Check orphaned_stripe_subscriptions — a pay link may have created a
      // Stripe customer with a different email, which the webhook couldn't match.
      // If we find one matching this user's email, link it now.
      try {
        const { data: orphan } = await supabaseClient
          .from('orphaned_stripe_subscriptions')
          .select('*')
          .ilike('customer_email', user.email!)
          .eq('resolved', false)
          .limit(1)
          .maybeSingle();

        if (orphan?.stripe_customer_id) {
          logger.info('Found orphaned subscription matching user email, reconciling', {
            userId: user.id,
            orphanCustomerId: orphan.stripe_customer_id,
            orphanTier: orphan.tier,
          });

          const orphanTier = orphan.tier || 'electrician';
          const businessAiFlag = BUSINESS_AI_TIERS.has(orphanTier);

          // Retrieve the subscription from Stripe to get period end
          let periodEnd: string | null = null;
          if (orphan.stripe_subscription_id) {
            try {
              const sub = await stripe.subscriptions.retrieve(orphan.stripe_subscription_id);
              if (sub.current_period_end) {
                periodEnd = new Date(sub.current_period_end * 1000).toISOString();
              }
            } catch {
              // Non-fatal
            }
          }

          await supabaseClient
            .from('profiles')
            .update({
              stripe_customer_id: orphan.stripe_customer_id,
              subscribed: true,
              subscription_tier: orphanTier,
              business_ai_enabled: businessAiFlag,
              onboarding_completed: true,
              subscription_start: new Date().toISOString(),
              ...(periodEnd ? { subscription_end: periodEnd } : {}),
              updated_at: new Date().toISOString(),
            })
            .eq('id', user.id);

          // Mark orphan as resolved
          await supabaseClient
            .from('orphaned_stripe_subscriptions')
            .update({
              resolved: true,
              resolved_at: new Date().toISOString(),
              resolved_user_id: user.id,
            })
            .eq('id', orphan.id);

          return new Response(
            JSON.stringify({
              subscribed: true,
              subscription_tier: orphanTier,
              business_ai_enabled: businessAiFlag,
            }),
            {
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
              status: 200,
            }
          );
        }
      } catch (orphanErr) {
        logger.warn('Orphan reconciliation check failed (non-fatal)', {
          error: (orphanErr as Error)?.message,
        });
      }

      logger.info('No customer found, updating unsubscribed state');

      try {
        const { error: updateError } = await withTimeout(
          supabaseClient
            .from('profiles')
            .update({
              subscribed: false,
              updated_at: new Date().toISOString(),
            })
            .eq('id', user.id),
          Timeouts.QUICK,
          'profile update (no customer)'
        );

        if (updateError) {
          logger.error('Failed to update profile', { error: updateError.message });
        }
      } catch (timeoutError) {
        logger.error('Profile update timed out, continuing anyway', { error: timeoutError });
      }

      return new Response(JSON.stringify({ subscribed: false }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      });
    }

    const customerId = customers.data[0].id;
    logger.info('Found Stripe customer', { customerId });

    // Fetch Stripe subscriptions — no status filter so we get active AND trialing
    const subscriptions = await withRetry(
      () =>
        withTimeout(
          stripe.subscriptions.list({
            customer: customerId,
            limit: 10,
          }),
          Timeouts.STANDARD,
          'Stripe subscription lookup'
        ),
      RetryPresets.STANDARD
    );

    // Find first active or trialing subscription
    const activeSub = subscriptions.data.find((sub: Stripe.Subscription) =>
      ['active', 'trialing'].includes(sub.status)
    );
    const hasActiveSub = !!activeSub;
    let subscriptionTier = null;

    if (hasActiveSub && activeSub) {
      logger.info('Active/trialing subscription found', {
        subscriptionId: activeSub.id,
        status: activeSub.status,
      });

      // Determine subscription tier from price ID
      const priceId = activeSub.items.data[0].price.id;
      subscriptionTier = PRICE_TO_TIER[priceId] || 'electrician';
      logger.info('Determined subscription tier', { priceId, subscriptionTier });

      // Update profile in database — persist tier + business_ai_enabled as recovery mechanism
      // Also backfill stripe_customer_id if missing (fixes pay link disconnect)
      const businessAiFlag = BUSINESS_AI_TIERS.has(subscriptionTier);
      try {
        const { error: updateError } = await withTimeout(
          supabaseClient
            .from('profiles')
            .update({
              subscribed: true,
              subscription_tier: subscriptionTier,
              business_ai_enabled: businessAiFlag,
              stripe_customer_id: customerId,
              onboarding_completed: true,
              updated_at: new Date().toISOString(),
            })
            .eq('id', user.id),
          Timeouts.QUICK,
          'profile update (subscribed)'
        );

        if (updateError) {
          logger.error('Failed to update profile', { error: updateError.message });
        }
      } catch (timeoutError) {
        logger.error('Profile update timed out, continuing anyway', { error: timeoutError });
      }
    } else {
      logger.info('No active subscription found');

      // Update profile in database to show not subscribed
      try {
        const { error: updateError } = await withTimeout(
          supabaseClient
            .from('profiles')
            .update({
              subscribed: false,
              business_ai_enabled: false,
              updated_at: new Date().toISOString(),
            })
            .eq('id', user.id),
          Timeouts.QUICK,
          'profile update (not subscribed)'
        );

        if (updateError) {
          logger.error('Failed to update profile', { error: updateError.message });
        }
      } catch (timeoutError) {
        logger.error('Profile update timed out, continuing anyway', { error: timeoutError });
      }
    }

    const businessAiEnabled =
      hasActiveSub && subscriptionTier ? BUSINESS_AI_TIERS.has(subscriptionTier) : false;

    logger.info('Updated database with subscription info', {
      subscribed: hasActiveSub,
      subscriptionTier,
      businessAiEnabled,
    });
    return new Response(
      JSON.stringify({
        subscribed: hasActiveSub,
        subscription_tier: subscriptionTier,
        business_ai_enabled: businessAiEnabled,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    await captureException(error, {
      functionName: 'check-subscription',
      requestUrl: req.url,
      requestMethod: req.method,
    });
    return handleError(error);
  }
});
