import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Get authorization header
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("No authorization header");
    }

    // Create Supabase client with user's token
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      { global: { headers: { Authorization: authHeader } } }
    );

    // Verify the caller is an admin (admin or super_admin)
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
    if (userError || !user) {
      throw new Error("Unauthorized: Could not get user");
    }

    const { data: callerProfile, error: profileError } = await supabaseClient
      .from("profiles")
      .select("admin_role, full_name")
      .eq("id", user.id)
      .single();

    if (profileError || !callerProfile?.admin_role) {
      throw new Error("Unauthorized: Admin access required");
    }

    // Get request body
    const { userId, tier, action } = await req.json();
    if (!userId) {
      throw new Error("userId is required");
    }

    // Create admin client for the update
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    // Get target user info
    const { data: targetProfile } = await supabaseAdmin
      .from("profiles")
      .select("full_name, subscribed, subscription_tier")
      .eq("id", userId)
      .single();

    if (action === "revoke") {
      // Revoke subscription
      const { error: updateError } = await supabaseAdmin
        .from("profiles")
        .update({
          subscribed: false,
          subscription_tier: null,
          subscription_start: null,
          subscription_end: null,
        })
        .eq("id", userId);

      if (updateError) {
        console.error("Error revoking subscription:", updateError);
        throw new Error(`Failed to revoke subscription: ${updateError.message}`);
      }

      console.log(`Subscription revoked for ${userId} (${targetProfile?.full_name}) by admin ${user.id} (${callerProfile.full_name})`);

      return new Response(
        JSON.stringify({ success: true, message: "Subscription revoked successfully" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        }
      );
    } else {
      // Grant subscription
      const subscriptionTier = tier || "Founder";
      const { error: updateError } = await supabaseAdmin
        .from("profiles")
        .update({
          subscribed: true,
          subscription_tier: subscriptionTier,
          subscription_start: new Date().toISOString(),
          subscription_end: null, // No end date for founder/free access
        })
        .eq("id", userId);

      if (updateError) {
        console.error("Error granting subscription:", updateError);
        throw new Error(`Failed to grant subscription: ${updateError.message}`);
      }

      console.log(`Subscription granted (${subscriptionTier}) to ${userId} (${targetProfile?.full_name}) by admin ${user.id} (${callerProfile.full_name})`);

      return new Response(
        JSON.stringify({
          success: true,
          message: "Subscription granted successfully",
          tier: subscriptionTier,
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        }
      );
    }
  } catch (error) {
    console.error("Error in admin-grant-subscription:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});
