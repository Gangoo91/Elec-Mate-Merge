import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";
import { createLogger, generateRequestId } from "../_shared/logger.ts";
import { captureException } from '../_shared/sentry.ts';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-request-id",
};

// Founder price ID - £3.99/month
const FOUNDER_PRICE_ID = "price_1SPK8c2RKw5t5RAmRGJxXfjc";

Deno.serve(async (req) => {
  // Extract or generate request ID for correlation
  const requestId = req.headers.get('x-request-id') || generateRequestId();
  const logger = createLogger(requestId, { function: 'founder-checkout' });

  logger.info('Request received', { method: req.method });

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Read and log body
    const rawBody = await req.text();
    logger.debug('Request body received', { bodyLength: rawBody.length });

    if (!rawBody || rawBody.length === 0) {
      logger.warn('Empty request body');
      return new Response(JSON.stringify({ error: "Empty request body" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json", "x-request-id": requestId },
        status: 400,
      });
    }

    let body;
    try {
      body = JSON.parse(rawBody);
      logger.info('Request parsed', { action: body.action });
    } catch (e: any) {
      logger.error('JSON parse failed', { error: e.message });
      return new Response(JSON.stringify({ error: "Invalid JSON", details: e.message }), {
        headers: { ...corsHeaders, "Content-Type": "application/json", "x-request-id": requestId },
        status: 400,
      });
    }

    const { action, token, password, fullName, role } = body;

    if (!action) {
      logger.warn('Missing action in request');
      return new Response(JSON.stringify({ error: "Missing action" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json", "x-request-id": requestId },
        status: 400,
      });
    }

    // Create admin client
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !supabaseKey) {
      logger.error('Missing Supabase environment variables', {
        hasUrl: !!supabaseUrl,
        hasKey: !!supabaseKey
      });
      return new Response(JSON.stringify({ error: "Missing Supabase env vars" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json", "x-request-id": requestId },
        status: 500,
      });
    }

    const supabaseAdmin = createClient(supabaseUrl, supabaseKey, {
      auth: { autoRefreshToken: false, persistSession: false }
    });

    // Helper function to get Stripe instance (dynamically imported only when needed)
    const getStripe = async () => {
      const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
      if (!stripeKey) {
        throw new Error("STRIPE_SECRET_KEY is not set");
      }
      const Stripe = (await import("https://esm.sh/stripe@14.21.0")).default;
      return new Stripe(stripeKey, { apiVersion: "2023-10-16" });
    };

    let result;

    switch (action) {
      case "validate": {
        logger.info('Validating founder invite token', { tokenPrefix: token?.substring(0, 10) });

        if (!token) {
          logger.warn('Token required but not provided');
          return new Response(JSON.stringify({ error: "Token is required" }), {
            headers: { ...corsHeaders, "Content-Type": "application/json", "x-request-id": requestId },
            status: 400,
          });
        }

        const { data: invite, error: inviteError } = await supabaseAdmin
          .from("founder_invites")
          .select("*")
          .eq("invite_token", token)
          .single();

        if (inviteError || !invite) {
          logger.info('Invalid or not found invite token', { error: inviteError?.message });
          result = { valid: false, reason: "Invalid or expired invite link" };
          break;
        }

        if (invite.status === "claimed") {
          logger.info('Invite already claimed', { inviteId: invite.id });
          result = { valid: false, reason: "This invite has already been used" };
          break;
        }

        if (invite.expires_at && new Date(invite.expires_at) < new Date()) {
          logger.info('Invite expired', { inviteId: invite.id, expiresAt: invite.expires_at });
          await supabaseAdmin
            .from("founder_invites")
            .update({ status: "expired" })
            .eq("id", invite.id);
          result = { valid: false, reason: "This invite has expired" };
          break;
        }

        // Check if user already has an account
        const { data: usersData } = await supabaseAdmin.auth.admin.listUsers();
        const existingUser = usersData?.users?.find((u: any) => u.email === invite.email);
        const hasExistingAccount = !!existingUser;

        // Check if user is ALREADY a founder subscriber
        let isAlreadyFounder = false;
        if (existingUser) {
          const { data: profile } = await supabaseAdmin
            .from("profiles")
            .select("subscribed, subscription_tier")
            .eq("id", existingUser.id)
            .single();

          if (profile?.subscribed && profile?.subscription_tier === 'founder') {
            isAlreadyFounder = true;
            logger.info('User is already a founder subscriber', { userId: existingUser.id });

            // Mark invite as claimed if not already
            if (invite.status !== 'claimed') {
              await supabaseAdmin
                .from("founder_invites")
                .update({
                  status: "claimed",
                  claimed_at: new Date().toISOString(),
                  user_id: existingUser.id
                })
                .eq("id", invite.id);
            }
          }
        }

        if (isAlreadyFounder) {
          result = {
            valid: false,
            reason: "Great news! You're already subscribed as a Founder. Sign in to access your account.",
            isAlreadySubscribed: true,
          };
          break;
        }

        result = {
          valid: true,
          email: invite.email,
          price: "£3.99/month",
          hasExistingAccount,
        };
        logger.info('Invite validated successfully', { email: invite.email, hasExistingAccount });
        break;
      }

      case "create_checkout": {
        logger.info('Creating checkout session');

        if (!token) throw new Error("Token is required");

        const { data: invite, error: inviteError } = await supabaseAdmin
          .from("founder_invites")
          .select("*")
          .eq("invite_token", token)
          .single();

        if (inviteError || !invite) throw new Error("Invalid invite token");
        if (invite.status === "claimed") throw new Error("This invite has already been used");
        if (invite.expires_at && new Date(invite.expires_at) < new Date()) throw new Error("This invite has expired");

        // Check if user is already a founder subscriber
        const { data: usersListCheckout } = await supabaseAdmin.auth.admin.listUsers();
        const existingUserCheckout = usersListCheckout?.users?.find((u: any) => u.email === invite.email);

        if (existingUserCheckout) {
          const { data: checkoutProfile } = await supabaseAdmin
            .from("profiles")
            .select("subscribed, subscription_tier")
            .eq("id", existingUserCheckout.id)
            .single();

          if (checkoutProfile?.subscribed && checkoutProfile?.subscription_tier === 'founder') {
            logger.info('User is already a founder subscriber during checkout', { userId: existingUserCheckout.id });
            // Mark invite as claimed
            await supabaseAdmin
              .from("founder_invites")
              .update({
                status: "claimed",
                claimed_at: new Date().toISOString(),
                user_id: existingUserCheckout.id
              })
              .eq("id", invite.id);

            result = {
              alreadySubscribed: true,
              message: "You're already subscribed as a Founder! Please sign in to access your account."
            };
            break;
          }
        }

        logger.info('Invite verified, creating Stripe checkout', { email: invite.email });

        const stripe = await getStripe();
        const customers = await stripe.customers.list({ email: invite.email, limit: 1 });

        let customerId: string;
        if (customers.data.length > 0) {
          customerId = customers.data[0].id;
          logger.info('Using existing Stripe customer', { customerId });
        } else {
          const newCustomer = await stripe.customers.create({
            email: invite.email,
            metadata: { founder: "true", invite_token: token },
          });
          customerId = newCustomer.id;
          logger.info('Created new Stripe customer', { customerId });
        }

        const origin = req.headers.get("origin") || "https://elec-mate.com";
        const session = await stripe.checkout.sessions.create({
          customer: customerId,
          line_items: [{ price: FOUNDER_PRICE_ID, quantity: 1 }],
          mode: "subscription",
          success_url: `${origin}/founder/success?token=${token}`,
          cancel_url: `${origin}/founder/claim?token=${token}`,
          metadata: { founder: "true", invite_token: token, invite_id: invite.id },
          payment_method_types: ["card"],
          billing_address_collection: "auto",
          allow_promotion_codes: false,
        });

        logger.info('Checkout session created', { sessionId: session.id });
        result = { url: session.url };
        break;
      }

      case "create_account": {
        logger.info('Creating founder account');

        if (!token) throw new Error("Token is required");
        if (!password || password.length < 8) throw new Error("Password must be at least 8 characters");
        if (!fullName || fullName.trim().length === 0) throw new Error("Full name is required");

        const { data: invite, error: inviteError } = await supabaseAdmin
          .from("founder_invites")
          .select("*")
          .eq("invite_token", token)
          .single();

        if (inviteError || !invite) throw new Error("Invalid invite token");
        if (invite.status === "claimed") throw new Error("This invite has already been used");
        if (invite.expires_at && new Date(invite.expires_at) < new Date()) {
          await supabaseAdmin.from("founder_invites").update({ status: "expired" }).eq("id", invite.id);
          throw new Error("This invite has expired");
        }

        logger.info('Invite verified for account creation', { email: invite.email });

        const { data: usersListData } = await supabaseAdmin.auth.admin.listUsers();
        const existingUser = usersListData?.users?.find((u: any) => u.email === invite.email);

        let userId: string;

        if (existingUser) {
          userId = existingUser.id;
          logger.info('Using existing user account', { userId });

          // Check if user is ALREADY a founder subscriber - redirect them to sign in
          const { data: existingProfile } = await supabaseAdmin
            .from("profiles")
            .select("subscribed, subscription_tier")
            .eq("id", userId)
            .single();

          if (existingProfile?.subscribed && existingProfile?.subscription_tier === 'founder') {
            logger.info('User is already a founder subscriber, marking invite as claimed', { userId });
            // Mark invite as claimed
            await supabaseAdmin
              .from("founder_invites")
              .update({
                status: "claimed",
                claimed_at: new Date().toISOString(),
                user_id: userId
              })
              .eq("id", invite.id);

            // Return success with redirect to sign in
            result = {
              alreadySubscribed: true,
              message: "You're already subscribed as a Founder! Please sign in to access your account."
            };
            break;
          }

          await supabaseAdmin.from("founder_invites").update({ status: "in_progress", user_id: userId }).eq("id", invite.id);
        } else {
          logger.info('Creating new user account', { email: invite.email });
          const { data: createData, error: createError } = await supabaseAdmin.auth.admin.createUser({
            email: invite.email,
            password: password,
            email_confirm: true,
            user_metadata: { full_name: fullName.trim(), role: role || "Electrician", founder_invite: true },
          });

          if (createError) throw new Error(createError.message || "Failed to create account");
          if (!createData.user) throw new Error("Failed to create user account");

          userId = createData.user.id;
          logger.info('User account created', { userId });

          await supabaseAdmin.from("profiles").insert({
            id: userId,
            full_name: fullName.trim(),
            role: role || "Electrician",
            subscribed: false,
            subscription_tier: null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          });

          await supabaseAdmin.from("founder_invites").update({ status: "in_progress", user_id: userId }).eq("id", invite.id);
        }

        const stripe = await getStripe();
        const customers = await stripe.customers.list({ email: invite.email, limit: 1 });

        let customerId: string;
        if (customers.data.length > 0) {
          customerId = customers.data[0].id;
          logger.info('Using existing Stripe customer', { customerId });
          await stripe.customers.update(customerId, {
            metadata: { founder: "true", invite_token: token, user_id: userId },
          });
        } else {
          const newCustomer = await stripe.customers.create({
            email: invite.email,
            name: fullName.trim(),
            metadata: { founder: "true", invite_token: token, user_id: userId },
          });
          customerId = newCustomer.id;
          logger.info('Created new Stripe customer', { customerId });
        }

        const origin = req.headers.get("origin") || Deno.env.get("SITE_URL") || "https://elec-mate.com";
        const session = await stripe.checkout.sessions.create({
          customer: customerId,
          line_items: [{ price: FOUNDER_PRICE_ID, quantity: 1 }],
          mode: "subscription",
          success_url: `${origin}/founder/success?token=${token}`,
          cancel_url: `${origin}/founder/signup?token=${token}&cancelled=true`,
          metadata: { founder: "true", invite_token: token, invite_id: invite.id, user_id: userId },
          payment_method_types: ["card"],
          billing_address_collection: "auto",
          allow_promotion_codes: false,
        });

        logger.info('Checkout session created for new account', { sessionId: session.id, userId });
        result = { checkoutUrl: session.url, userId };
        break;
      }

      case "complete": {
        logger.info('Completing founder checkout');

        if (!token) throw new Error("Token is required");

        const { data: invite, error: inviteError } = await supabaseAdmin
          .from("founder_invites")
          .select("*")
          .eq("invite_token", token)
          .single();

        if (inviteError || !invite) throw new Error("Invalid invite token");

        let userId = invite.user_id;
        if (!userId) {
          const { data: usersListData } = await supabaseAdmin.auth.admin.listUsers();
          const userByEmail = usersListData?.users?.find((u: any) => u.email === invite.email);
          userId = userByEmail?.id || null;
        }

        await supabaseAdmin.from("founder_invites").update({
          status: "claimed",
          claimed_at: new Date().toISOString(),
          user_id: userId,
        }).eq("id", invite.id);

        if (userId) {
          await supabaseAdmin.from("profiles").update({
            subscribed: true,
            subscription_tier: "founder",
            subscription_start: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          }).eq("id", userId);
          logger.info('Founder subscription activated', { userId, email: invite.email });
        }

        result = { success: true, email: invite.email };
        break;
      }

      default:
        logger.warn('Unknown action requested', { action });
        return new Response(JSON.stringify({ error: `Unknown action: ${action}` }), {
          headers: { ...corsHeaders, "Content-Type": "application/json", "x-request-id": requestId },
          status: 400,
        });
    }

    logger.info('Request completed successfully', { action });
    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json", "x-request-id": requestId },
      status: 200,
    });

  } catch (error: any) {
    logger.error('Request failed', { error: error.message });
    await captureException(error, { functionName: 'founder-checkout', requestUrl: req.url, requestMethod: req.method });
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json", "x-request-id": requestId },
      status: 400,
    });
  }
});
