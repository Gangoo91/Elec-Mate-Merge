import { corsHeaders, serve, createClient } from '../_shared/deps.ts';
import { handleError, ValidationError } from '../_shared/errors.ts';
import { withRetry, RetryPresets } from '../_shared/retry.ts';
import { withTimeout, Timeouts } from '../_shared/timeout.ts';
import { createLogger, generateRequestId } from '../_shared/logger.ts';
import Stripe from "https://esm.sh/stripe@14.21.0";
import { captureException } from '../_shared/sentry.ts';

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestId = generateRequestId();
    const logger = createLogger(requestId);
    
    logger.info('💳 Create checkout started');

    // Get request body
    const body = await req.json();
    const { priceId, mode, planId, offerCode } = body;

    logger.info('Request body received', { priceId, mode, planId, offerCode });

    if (!priceId || !mode || !planId) {
      throw new ValidationError("Missing required parameters: priceId, mode, or planId");
    }

    // Authenticate user
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new ValidationError("No authorization header provided");
    }
    
    const token = authHeader.replace("Bearer ", "");
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
      throw new ValidationError("User not authenticated or email not available");
    }
    
    logger.info('User authenticated', { userId: user.id, email: user.email });

    // Initialize Stripe
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      throw new ValidationError("STRIPE_SECRET_KEY is not set");
    }
    
    const stripe = new Stripe(stripeKey, {
      apiVersion: "2023-10-16",
    });
    
    logger.info('Stripe initialized');

    // Check if a Stripe customer record exists for this user with timeout
    const customers = await withTimeout(
      withRetry(
        () => stripe.customers.list({ email: user.email, limit: 1 }),
        RetryPresets.FAST
      ),
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
          () => stripe.customers.create({
            email: user.email,
            metadata: {
              userId: user.id,
            }
          }),
          RetryPresets.FAST
        ),
        Timeouts.STANDARD,
        'Stripe customer creation'
      );
      customerId = newCustomer.id;
      logger.info('New customer created', { customerId });
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
              stripePromoCodeId: offer.stripe_promotion_code_id
            });
          } else {
            logger.warn('Offer plan mismatch', {
              offerPlan: offer.plan_id,
              requestedPlan: planId
            });
          }
        } else {
          logger.warn('Offer not active or missing Stripe ID', {
            isActive: offer?.is_active,
            hasStripeId: !!offer?.stripe_promotion_code_id
          });
        }
      }
    }

    // Create checkout options based on mode
    const origin = req.headers.get("origin") || "https://f214c814-3a85-4c4a-8139-3d81ec8b7efb.lovableproject.com";

    const checkoutOptions: any = {
      customer: customerId,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: mode,
      success_url: `${origin}/payment-success?plan=${planId}`,
      cancel_url: `${origin}/subscriptions`,
      client_reference_id: user.id,
      metadata: {
        userId: user.id,
        planId: planId,
      },
      payment_method_types: ['card'],
      billing_address_collection: 'auto',
      // If we have a specific discount to apply, use that; otherwise allow manual promo codes
      ...(discounts ? { discounts } : { allow_promotion_codes: true }),
    };
    
    logger.info('Creating checkout session with options', checkoutOptions);

    // Create checkout session with retry and timeout
    const session = await withTimeout(
      withRetry(
        () => stripe.checkout.sessions.create(checkoutOptions),
        RetryPresets.FAST
      ),
      Timeouts.STANDARD,
      'Stripe checkout session creation'
    );
    
    logger.info('Checkout session created', { sessionId: session.id, url: session.url });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    // Capture to Sentry
    await captureException(error, {
      functionName: 'create-checkout',
      requestUrl: req.url,
      requestMethod: req.method
    });

    return handleError(error);
  }
});
