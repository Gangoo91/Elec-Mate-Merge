import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Founder price ID - £3.99/month
const FOUNDER_PRICE_ID = "price_1SPK8c2RKw5t5RAmRGJxXfjc";

Deno.serve(async (req) => {
  console.log(`[v22] Method: ${req.method}`);

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Read and log body
    const rawBody = await req.text();
    console.log(`[v22] Body length: ${rawBody.length}`);
    console.log(`[v22] Body: ${rawBody.substring(0, 200)}`);

    if (!rawBody || rawBody.length === 0) {
      return new Response(JSON.stringify({ error: "Empty request body" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    let body;
    try {
      body = JSON.parse(rawBody);
      console.log(`[v22] Parsed OK, action: ${body.action}`);
    } catch (e: any) {
      console.log(`[v22] JSON parse failed: ${e.message}`);
      return new Response(JSON.stringify({ error: "Invalid JSON", details: e.message }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    const { action, token, password, fullName, role } = body;

    if (!action) {
      return new Response(JSON.stringify({ error: "Missing action" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    // Create admin client
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    console.log(`[v22] Supabase URL exists: ${!!supabaseUrl}`);
    console.log(`[v22] Service key exists: ${!!supabaseKey}`);

    if (!supabaseUrl || !supabaseKey) {
      return new Response(JSON.stringify({ error: "Missing Supabase env vars" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
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
        console.log(`[v22] Validate action, token: ${token ? token.substring(0, 10) + '...' : 'MISSING'}`);

        if (!token) {
          return new Response(JSON.stringify({ error: "Token is required" }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 400,
          });
        }

        console.log(`[v22] Querying founder_invites...`);
        const { data: invite, error: inviteError } = await supabaseAdmin
          .from("founder_invites")
          .select("*")
          .eq("invite_token", token)
          .single();

        console.log(`[v22] Query done. Error: ${inviteError?.message || 'none'}, Found: ${!!invite}`);

        if (inviteError || !invite) {
          result = { valid: false, reason: "Invalid or expired invite link" };
          break;
        }

        if (invite.status === "claimed") {
          result = { valid: false, reason: "This invite has already been used" };
          break;
        }

        if (invite.expires_at && new Date(invite.expires_at) < new Date()) {
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

        result = {
          valid: true,
          email: invite.email,
          price: "£3.99/month",
          hasExistingAccount,
        };
        console.log(`[v22] Validate success for ${invite.email}`);
        break;
      }

      case "create_checkout": {
        if (!token) throw new Error("Token is required");

        const { data: invite, error: inviteError } = await supabaseAdmin
          .from("founder_invites")
          .select("*")
          .eq("invite_token", token)
          .single();

        if (inviteError || !invite) throw new Error("Invalid invite token");
        if (invite.status === "claimed") throw new Error("This invite has already been used");
        if (invite.expires_at && new Date(invite.expires_at) < new Date()) throw new Error("This invite has expired");

        const stripe = await getStripe();
        const customers = await stripe.customers.list({ email: invite.email, limit: 1 });

        let customerId: string;
        if (customers.data.length > 0) {
          customerId = customers.data[0].id;
        } else {
          const newCustomer = await stripe.customers.create({
            email: invite.email,
            metadata: { founder: "true", invite_token: token },
          });
          customerId = newCustomer.id;
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

        result = { url: session.url };
        break;
      }

      case "create_account": {
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

        const { data: usersListData } = await supabaseAdmin.auth.admin.listUsers();
        const existingUser = usersListData?.users?.find((u: any) => u.email === invite.email);

        let userId: string;

        if (existingUser) {
          userId = existingUser.id;
          await supabaseAdmin.from("founder_invites").update({ status: "in_progress", user_id: userId }).eq("id", invite.id);
        } else {
          const { data: createData, error: createError } = await supabaseAdmin.auth.admin.createUser({
            email: invite.email,
            password: password,
            email_confirm: true,
            user_metadata: { full_name: fullName.trim(), role: role || "Electrician", founder_invite: true },
          });

          if (createError) throw new Error(createError.message || "Failed to create account");
          if (!createData.user) throw new Error("Failed to create user account");

          userId = createData.user.id;

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

        result = { checkoutUrl: session.url, userId };
        break;
      }

      case "complete": {
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
        }

        result = { success: true, email: invite.email };
        break;
      }

      default:
        return new Response(JSON.stringify({ error: `Unknown action: ${action}` }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        });
    }

    console.log(`[v22] Success, returning result`);
    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error: any) {
    console.error(`[v22] ERROR: ${error.message}`);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
