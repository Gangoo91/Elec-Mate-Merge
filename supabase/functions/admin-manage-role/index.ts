import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-request-id",
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

    // Verify the caller is a super admin (only super admins can manage admin roles)
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
    if (userError || !user) {
      throw new Error("Unauthorized: Could not get user");
    }

    const { data: callerProfile, error: profileError } = await supabaseClient
      .from("profiles")
      .select("admin_role, full_name")
      .eq("id", user.id)
      .single();

    if (profileError || callerProfile?.admin_role !== "super_admin") {
      throw new Error("Unauthorized: Super admin access required");
    }

    // Get request body
    const { userId, adminRole } = await req.json();
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
      .select("full_name, admin_role")
      .eq("id", userId)
      .single();

    // Can't modify another super admin's role
    if (targetProfile?.admin_role === "super_admin") {
      throw new Error("Cannot modify another super admin's role");
    }

    // Update admin role
    const { error: updateError } = await supabaseAdmin
      .from("profiles")
      .update({ admin_role: adminRole })
      .eq("id", userId);

    if (updateError) {
      console.error("Error updating admin role:", updateError);
      throw new Error(`Failed to update admin role: ${updateError.message}`);
    }

    const action = adminRole ? `granted admin role (${adminRole})` : "revoked admin role";
    console.log(`Admin role ${action} for ${userId} (${targetProfile?.full_name}) by super admin ${user.id} (${callerProfile.full_name})`);

    return new Response(
      JSON.stringify({
        success: true,
        message: adminRole ? "Admin access granted" : "Admin access revoked",
        adminRole,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error in admin-manage-role:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});
