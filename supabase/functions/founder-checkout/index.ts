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
    const { action, token } = await req.json();

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
          customer_email: invite.email,
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

        // Check if user exists with this email
        const { data: authData } = await supabaseAdmin.auth.admin.listUsers();
        const foundUser = authData?.users.find(u => u.email === invite.email);

        // Update invite as claimed
        await supabaseAdmin
          .from("founder_invites")
          .update({
            status: "claimed",
            claimed_at: new Date().toISOString(),
            user_id: foundUser?.id || null,
          })
          .eq("id", invite.id);

        // If user exists, update their profile
        if (foundUser) {
          await supabaseAdmin
            .from("profiles")
            .update({
              subscribed: true,
              subscription_tier: "Founder",
              subscription_start: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            })
            .eq("id", foundUser.id);
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
