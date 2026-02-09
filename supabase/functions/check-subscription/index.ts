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
      .select('free_access_granted, subscription_tier, subscribed')
      .eq('id', user.id)
      .single();

    if (profileData?.free_access_granted === true) {
      logger.info('User has admin-granted free access', {
        userId: user.id,
        tier: profileData.subscription_tier,
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

    const stripe = new Stripe(stripeKey, { apiVersion: '2023-10-16' });

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
    const activeSub = subscriptions.data.find((sub: any) =>
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

      // Complete price-to-tier mapping (matches webhook)
      const PRICE_TO_TIER: Record<string, string> = {
        // Apprentice
        price_1SmUef2RKw5t5RAmRIMTWTqU: 'apprentice',
        price_1SmUfK2RKw5t5RAml6bj1I77: 'apprentice_yearly',
        // Electrician Pro
        price_1SqJVr2RKw5t5RAmaiTGelLN: 'electrician',
        price_1SqJVs2RKw5t5RAmVeD2QVsb: 'electrician_yearly',
        // Employer
        price_1SlyAT2RKw5t5RAmUmTRGimH: 'Employer',
        price_1SlyB82RKw5t5RAmN447YJUW: 'employer_yearly',
        // Founders
        price_1SPK8c2RKw5t5RAmRGJxXfjc: 'Employer',
        // Legacy
        price_1RhtdT2RKw5t5RAmv6b2xE6p: 'apprentice',
        price_1Rhtgl2RKw5t5RAmkQVKVnKn: 'apprentice_yearly',
        price_1RhteS2RKw5t5RAmzRbaTE8U: 'electrician',
        price_1RhtiS2RKw5t5RAmha0s6PJA: 'electrician_yearly',
      };

      subscriptionTier = PRICE_TO_TIER[priceId] || 'electrician';
      logger.info('Determined subscription tier', { priceId, subscriptionTier });

      // Update profile in database
      try {
        const { error: updateError } = await withTimeout(
          supabaseClient
            .from('profiles')
            .update({
              subscribed: true,
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

    logger.info('Updated database with subscription info', {
      subscribed: hasActiveSub,
      subscriptionTier,
    });
    return new Response(
      JSON.stringify({
        subscribed: hasActiveSub,
        subscription_tier: subscriptionTier,
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
