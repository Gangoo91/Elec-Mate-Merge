import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";
import Stripe from "https://esm.sh/stripe@14.21.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Founder price ID - £3.99/month
const FOUNDER_PRICE_ID = "price_1SPK8c2RKw5t5RAmRGJxXfjc";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { action, token, password, fullName, role } = body;

    // Create admin client for operations
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    // Initialize Stripe
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      throw new Error("STRIPE_SECRET_KEY is not set");
    }

    const stripe = new Stripe(stripeKey, {
      apiVersion: "2023-10-16",
    });

    let result;

    switch (action) {
      case "validate": {
        // Validate the token without auth (public endpoint for claim page)
        if (!token) {
          throw new Error("Token is required");
        }

        const { data: invite, error: inviteError } = await supabaseAdmin
          .from("founder_invites")
          .select("*")
          .eq("invite_token", token)
          .single();

        if (inviteError || !invite) {
          result = { valid: false, reason: "Invalid or expired invite link" };
          break;
        }

        if (invite.status === "claimed") {
          result = { valid: false, reason: "This invite has already been used" };
          break;
        }

        if (invite.expires_at && new Date(invite.expires_at) < new Date()) {
          // Mark as expired
          await supabaseAdmin
            .from("founder_invites")
            .update({ status: "expired" })
            .eq("id", invite.id);

          result = { valid: false, reason: "This invite has expired" };
          break;
        }

        result = {
          valid: true,
          email: invite.email,
          price: "£3.99/month",
        };
        break;
      }

      case "create_checkout": {
        // Create Stripe checkout session for founder
        if (!token) {
          throw new Error("Token is required");
        }

        // Validate token again
        const { data: invite, error: inviteError } = await supabaseAdmin
          .from("founder_invites")
          .select("*")
          .eq("invite_token", token)
          .single();

        if (inviteError || !invite) {
          throw new Error("Invalid invite token");
        }

        if (invite.status === "claimed") {
          throw new Error("This invite has already been used");
        }

        if (invite.expires_at && new Date(invite.expires_at) < new Date()) {
          throw new Error("This invite has expired");
        }

        // Check if customer exists or create new one
        const customers = await stripe.customers.list({
          email: invite.email,
          limit: 1,
        });

        let customerId: string;

        if (customers.data.length > 0) {
          customerId = customers.data[0].id;
        } else {
          const newCustomer = await stripe.customers.create({
            email: invite.email,
            metadata: {
              founder: "true",
              invite_token: token,
            },
          });
          customerId = newCustomer.id;
        }

        // Create checkout session with founder price
        const origin = req.headers.get("origin") || "https://elec-mate.com";

        const session = await stripe.checkout.sessions.create({
          customer: customerId,
          // Note: customer_email removed - conflicts when customer already exists
          line_items: [
            {
              price: FOUNDER_PRICE_ID,
              quantity: 1,
            },
          ],
          mode: "subscription",
          success_url: `${origin}/founder/success?token=${token}`,
          cancel_url: `${origin}/founder/claim?token=${token}`,
          metadata: {
            founder: "true",
            invite_token: token,
            invite_id: invite.id,
          },
          payment_method_types: ["card"],
          billing_address_collection: "auto",
          allow_promotion_codes: false, // No additional promos on founder price
        });

        console.log(`Founder checkout created for ${invite.email}`);
        result = { url: session.url };
        break;
      }

      case "create_account": {
        // Create account for founder signup flow (no existing account required)
        if (!token) {
          throw new Error("Token is required");
        }

        if (!password || password.length < 8) {
          throw new Error("Password must be at least 8 characters");
        }

        if (!fullName || fullName.trim().length === 0) {
          throw new Error("Full name is required");
        }

        // Validate the invite token
        const { data: invite, error: inviteError } = await supabaseAdmin
          .from("founder_invites")
          .select("*")
          .eq("invite_token", token)
          .single();

        if (inviteError || !invite) {
          throw new Error("Invalid invite token");
        }

        if (invite.status === "claimed") {
          throw new Error("This invite has already been used");
        }

        if (invite.expires_at && new Date(invite.expires_at) < new Date()) {
          // Mark as expired
          await supabaseAdmin
            .from("founder_invites")
            .update({ status: "expired" })
            .eq("id", invite.id);
          throw new Error("This invite has expired");
        }

        // Check if user already exists with this email (efficient lookup)
        const { data: existingUserData } = await supabaseAdmin.auth.admin.getUserByEmail(invite.email);
        const existingUser = existingUserData?.user;

        let userId: string;

        if (existingUser) {
          // User exists - check if this is a retry (invite in_progress) or different user
          if (invite.status === "in_progress" && invite.user_id === existingUser.id) {
            // This is a retry - user cancelled payment and is trying again
            console.log(`Founder signup retry for ${invite.email}`);
            userId = existingUser.id;
          } else {
            // Different scenario - existing account not from this invite flow
            throw new Error("An account already exists with this email. Please sign in instead.");
          }
        } else {
          // Create new user with auto-confirmed email (bypasses verification)
          const { data: createData, error: createError } = await supabaseAdmin.auth.admin.createUser({
            email: invite.email,
            password: password,
            email_confirm: true, // Auto-confirm since founder already has verified email
            user_metadata: {
              full_name: fullName.trim(),
              role: role || "Electrician",
              founder_invite: true,
            },
          });

          if (createError) {
            console.error("User creation error:", createError);
            throw new Error(createError.message || "Failed to create account");
          }

          if (!createData.user) {
            throw new Error("Failed to create user account");
          }

          userId = createData.user.id;

          // Create profile record (email is stored in auth.users, not profiles)
          const { error: profileError } = await supabaseAdmin.from("profiles").insert({
            id: userId,
            full_name: fullName.trim(),
            role: role || "Electrician",
            subscribed: false, // Will be true after payment
            subscription_tier: null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          });

          if (profileError) {
            console.error("Profile creation error:", profileError);
            // Don't throw - profile might already exist or trigger may create it
          }

          // Mark invite as in-progress
          await supabaseAdmin
            .from("founder_invites")
            .update({
              status: "in_progress",
              user_id: userId,
            })
            .eq("id", invite.id);
        }

        const newUser = { id: userId };

        // Create or get Stripe customer
        const customers = await stripe.customers.list({
          email: invite.email,
          limit: 1,
        });

        let customerId: string;

        if (customers.data.length > 0) {
          customerId = customers.data[0].id;
          // Update customer metadata
          await stripe.customers.update(customerId, {
            metadata: {
              founder: "true",
              invite_token: token,
              user_id: newUser.id,
            },
          });
        } else {
          const newCustomer = await stripe.customers.create({
            email: invite.email,
            name: fullName.trim(),
            metadata: {
              founder: "true",
              invite_token: token,
              user_id: newUser.id,
            },
          });
          customerId = newCustomer.id;
        }

        // Create checkout session with founder price
        const origin = req.headers.get("origin") || Deno.env.get("SITE_URL") || "https://elec-mate.com";

        const session = await stripe.checkout.sessions.create({
          customer: customerId,
          line_items: [
            {
              price: FOUNDER_PRICE_ID,
              quantity: 1,
            },
          ],
          mode: "subscription",
          success_url: `${origin}/founder/success?token=${token}`,
          cancel_url: `${origin}/founder/signup?token=${token}&cancelled=true`,
          metadata: {
            founder: "true",
            invite_token: token,
            invite_id: invite.id,
            user_id: newUser.id,
          },
          payment_method_types: ["card"],
          billing_address_collection: "auto",
          allow_promotion_codes: false, // No additional promos on founder price
        });

        console.log(`Founder account created and checkout initiated for ${invite.email} (user: ${newUser.id})`);
        result = { checkoutUrl: session.url, userId: newUser.id };
        break;
      }

      case "complete": {
        // Mark invite as claimed after successful payment
        if (!token) {
          throw new Error("Token is required");
        }

        // Get the invite
        const { data: invite, error: inviteError } = await supabaseAdmin
          .from("founder_invites")
          .select("*")
          .eq("invite_token", token)
          .single();

        if (inviteError || !invite) {
          throw new Error("Invalid invite token");
        }

        // Get user ID - prefer stored user_id (from create_account flow), fallback to email lookup
        let userId = invite.user_id;

        if (!userId) {
          // Fallback: lookup user by email (for legacy claim flow)
          const { data: userByEmail } = await supabaseAdmin.auth.admin.getUserByEmail(invite.email);
          userId = userByEmail?.user?.id || null;
        }

        // Update invite as claimed
        await supabaseAdmin
          .from("founder_invites")
          .update({
            status: "claimed",
            claimed_at: new Date().toISOString(),
            user_id: userId,
          })
          .eq("id", invite.id);

        // If user exists, update their profile
        if (userId) {
          await supabaseAdmin
            .from("profiles")
            .update({
              subscribed: true,
              subscription_tier: "Founder",
              subscription_start: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            })
            .eq("id", userId);
        }

        console.log(`Founder invite claimed: ${invite.email}`);
        result = { success: true, email: invite.email };
        break;
      }

      default:
        throw new Error(`Unknown action: ${action}`);
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error: any) {
    console.error("Error in founder-checkout:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
