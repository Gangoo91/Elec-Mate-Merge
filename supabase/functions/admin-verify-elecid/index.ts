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

    // Verify the caller is an admin
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
    const { action, profileId, reason } = await req.json();

    // Create admin client for operations
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    let result;

    switch (action) {
      case "list": {
        const status = reason; // Reuse reason field for status filter
        let query = supabaseAdmin
          .from("employer_elec_id_profiles")
          .select(`*, profiles:employee_id (full_name, username, role)`)
          .order("created_at", { ascending: true });

        if (status && status !== "all") {
          query = query.eq("verification_status", status);
        }

        const { data, error } = await query;
        if (error) throw error;
        result = { profiles: data };
        break;
      }

      case "approve": {
        if (!profileId) {
          throw new Error("Profile ID is required");
        }

        const { error: updateError } = await supabaseAdmin
          .from("employer_elec_id_profiles")
          .update({
            verification_status: "approved",
            is_verified: true,
            verified_at: new Date().toISOString(),
            reviewed_by: user.id,
            reviewed_at: new Date().toISOString(),
          })
          .eq("id", profileId);

        if (updateError) throw updateError;

        // Log the action
        await supabaseAdmin
          .from("elec_id_verification_history")
          .insert({
            elec_id_profile_id: profileId,
            action: "approved",
            performed_by: user.id,
          });

        console.log(`Elec-ID ${profileId} approved by admin ${user.id}`);
        result = { success: true, action: "approved" };
        break;
      }

      case "reject": {
        if (!profileId) {
          throw new Error("Profile ID is required");
        }
        if (!reason) {
          throw new Error("Rejection reason is required");
        }

        const { error: updateError } = await supabaseAdmin
          .from("employer_elec_id_profiles")
          .update({
            verification_status: "rejected",
            is_verified: false,
            rejection_reason: reason,
            reviewed_by: user.id,
            reviewed_at: new Date().toISOString(),
          })
          .eq("id", profileId);

        if (updateError) throw updateError;

        // Log the action
        await supabaseAdmin
          .from("elec_id_verification_history")
          .insert({
            elec_id_profile_id: profileId,
            action: "rejected",
            performed_by: user.id,
            notes: reason,
          });

        console.log(`Elec-ID ${profileId} rejected by admin ${user.id}: ${reason}`);
        result = { success: true, action: "rejected" };
        break;
      }

      default:
        throw new Error(`Unknown action: ${action}`);
    }

    return new Response(
      JSON.stringify(result),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error in admin-verify-elecid:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});
