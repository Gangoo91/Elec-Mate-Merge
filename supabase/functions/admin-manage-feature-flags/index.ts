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

    const isSuperAdmin = callerProfile.admin_role === "super_admin";

    // Get request body
    const { action, flag } = await req.json();

    // Create admin client for operations
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    let result;

    switch (action) {
      case "list": {
        const { data, error } = await supabaseAdmin
          .from("feature_flags")
          .select("*")
          .order("name");
        if (error) throw error;
        result = { flags: data };
        break;
      }

      case "create": {
        if (!isSuperAdmin) {
          throw new Error("Unauthorized: Super admin access required to create flags");
        }
        if (!flag?.name) {
          throw new Error("Flag name is required");
        }
        const { data, error } = await supabaseAdmin
          .from("feature_flags")
          .insert({
            name: flag.name.toLowerCase().replace(/\s+/g, "_"),
            description: flag.description || null,
            is_enabled: flag.is_enabled || false,
            enabled_for_roles: flag.enabled_for_roles || [],
            percentage_rollout: flag.percentage_rollout || 100,
            created_by: user.id,
          })
          .select()
          .single();
        if (error) throw error;
        console.log(`Feature flag ${data.name} created by admin ${user.id}`);
        result = { flag: data };
        break;
      }

      case "toggle": {
        if (!flag?.id) {
          throw new Error("Flag ID is required");
        }
        const { data, error } = await supabaseAdmin
          .from("feature_flags")
          .update({
            is_enabled: flag.is_enabled,
            updated_at: new Date().toISOString(),
          })
          .eq("id", flag.id)
          .select()
          .single();
        if (error) throw error;
        console.log(`Feature flag ${flag.id} toggled to ${flag.is_enabled} by admin ${user.id}`);
        result = { flag: data };
        break;
      }

      case "update": {
        if (!flag?.id) {
          throw new Error("Flag ID is required");
        }
        const { data, error } = await supabaseAdmin
          .from("feature_flags")
          .update({
            description: flag.description,
            is_enabled: flag.is_enabled,
            enabled_for_roles: flag.enabled_for_roles,
            percentage_rollout: flag.percentage_rollout,
            updated_at: new Date().toISOString(),
          })
          .eq("id", flag.id)
          .select()
          .single();
        if (error) throw error;
        console.log(`Feature flag ${flag.id} updated by admin ${user.id}`);
        result = { flag: data };
        break;
      }

      case "delete": {
        if (!isSuperAdmin) {
          throw new Error("Unauthorized: Super admin access required to delete flags");
        }
        if (!flag?.id) {
          throw new Error("Flag ID is required");
        }
        const { error } = await supabaseAdmin
          .from("feature_flags")
          .delete()
          .eq("id", flag.id);
        if (error) throw error;
        console.log(`Feature flag ${flag.id} deleted by super admin ${user.id}`);
        result = { success: true };
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
    console.error("Error in admin-manage-feature-flags:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});
