import { serve, createClient, corsHeaders } from '../_shared/deps.ts';
import { handleError, ValidationError } from '../_shared/errors.ts';
import { withRetry, RetryPresets } from '../_shared/retry.ts';
import { withTimeout, Timeouts } from '../_shared/timeout.ts';
import { createLogger, generateRequestId } from '../_shared/logger.ts';
import Stripe from "https://esm.sh/stripe@14.21.0";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestId = generateRequestId();
    const logger = createLogger(requestId);
    
    logger.info("💳 Check subscription started");

    // Use the service role key to perform writes (upsert) in Supabase
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new ValidationError("STRIPE_SECRET_KEY is not set");
    
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new ValidationError("No authorization header provided");
    
    const token = authHeader.replace("Bearer ", "");
    logger.debug("Authenticating user with token");
    
    const { data: userData, error: userError } = await withTimeout(
      supabaseClient.auth.getUser(token),
      Timeouts.STANDARD, // Increased from QUICK (5s) to STANDARD (30s) to handle slow auth responses
      'user authentication'
    );
    
    if (userError) throw new Error(`Authentication error: ${userError.message}`);
    const user = userData.user;
    if (!user?.email) throw new ValidationError("User not authenticated or email not available");
    
    logger.info("User authenticated", { userId: user.id, email: user.email });

    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });
    
    // Fetch Stripe customers with retry and timeout
    const customers = await withRetry(
      () => withTimeout(
        stripe.customers.list({ email: user.email, limit: 1 }),
        Timeouts.STANDARD,
        'Stripe customer lookup'
      ),
      RetryPresets.STANDARD
    );
    
    if (customers.data.length === 0) {
      logger.info("No customer found, updating unsubscribed state");
      
      try {
        const { error: updateError } = await withTimeout(
          supabaseClient.from("profiles").update({
            subscribed: false,
            updated_at: new Date().toISOString(),
          }).eq('id', user.id),
          Timeouts.QUICK,
          'profile update (no customer)'
        );
        
        if (updateError) {
          logger.error("Failed to update profile", { error: updateError.message });
        }
      } catch (timeoutError) {
        logger.error("Profile update timed out, continuing anyway", { error: timeoutError });
      }
      
      return new Response(JSON.stringify({ subscribed: false }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    const customerId = customers.data[0].id;
    logger.info("Found Stripe customer", { customerId });

    // Fetch Stripe subscriptions with retry and timeout
    const subscriptions = await withRetry(
      () => withTimeout(
        stripe.subscriptions.list({
          customer: customerId,
          status: "active",
          limit: 1,
        }),
        Timeouts.STANDARD,
        'Stripe subscription lookup'
      ),
      RetryPresets.STANDARD
    );
    
    const hasActiveSub = subscriptions.data.length > 0;
    let subscriptionTier = null;

    if (hasActiveSub) {
      const subscription = subscriptions.data[0];
      logger.info("Active subscription found", { subscriptionId: subscription.id });

      // Determine subscription tier from price ID
      const priceId = subscription.items.data[0].price.id;

      // Map Stripe price IDs to subscription tiers
      // Desktop Price: £6.99/month or £69.99/year
      // Employer: £29.99/month or £299.99/year
      const desktopPriceIds = [
        "price_1RhtdT2RKw5t5RAmv6b2xE6p", // Desktop Monthly £6.99
        "price_1Rhtgl2RKw5t5RAmkQVKVnKn", // Desktop Yearly £69.99
      ];
      const employerPriceIds = [
        "price_1SlyAT2RKw5t5RAmUmTRGimH", // Employer Monthly £29.99
        "price_1SlyB82RKw5t5RAmN447YJUW", // Employer Yearly £299.99
      ];

      if (desktopPriceIds.includes(priceId)) {
        subscriptionTier = "Desktop Price";
      } else if (employerPriceIds.includes(priceId)) {
        subscriptionTier = "Employer";
      } else {
        // Fallback: check price amount for unknown price IDs
        const price = await withRetry(
          () => withTimeout(
            stripe.prices.retrieve(priceId),
            Timeouts.STANDARD,
            'Stripe price retrieval'
          ),
          RetryPresets.STANDARD
        );
        const amount = price.unit_amount || 0;

        // £6.99 = 699, £29.99 = 2999, £69.99 = 6999, £299.99 = 29999
        if (amount <= 1000) {
          subscriptionTier = "Desktop Price"; // Up to ~£10/month
        } else if (amount <= 10000) {
          // Could be yearly desktop (6999) or monthly employer (2999)
          // Check if it's a yearly plan by looking at the interval
          const interval = price.recurring?.interval;
          if (interval === 'year' && amount <= 8000) {
            subscriptionTier = "Desktop Price"; // Yearly desktop
          } else {
            subscriptionTier = "Employer";
          }
        } else {
          subscriptionTier = "Employer"; // Yearly employer or higher
        }
      }
      logger.info("Determined subscription tier", { priceId, subscriptionTier });
      
      // Update profile in database
      try {
        const { error: updateError } = await withTimeout(
          supabaseClient.from("profiles").update({
            subscribed: true,
            updated_at: new Date().toISOString(),
          }).eq('id', user.id),
          Timeouts.QUICK,
          'profile update (subscribed)'
        );
        
        if (updateError) {
          logger.error("Failed to update profile", { error: updateError.message });
        }
      } catch (timeoutError) {
        logger.error("Profile update timed out, continuing anyway", { error: timeoutError });
      }
    } else {
      logger.info("No active subscription found");
      
      // Update profile in database to show not subscribed
      try {
        const { error: updateError } = await withTimeout(
          supabaseClient.from("profiles").update({
            subscribed: false,
            updated_at: new Date().toISOString(),
          }).eq('id', user.id),
          Timeouts.QUICK,
          'profile update (not subscribed)'
        );
        
        if (updateError) {
          logger.error("Failed to update profile", { error: updateError.message });
        }
      } catch (timeoutError) {
        logger.error("Profile update timed out, continuing anyway", { error: timeoutError });
      }
    }

    logger.info("Updated database with subscription info", { subscribed: hasActiveSub, subscriptionTier });
    return new Response(JSON.stringify({
      subscribed: hasActiveSub,
      subscription_tier: subscriptionTier
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return handleError(error);
  }
});
