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

    // Create Supabase client with user's token to verify admin status
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
      .select("admin_role")
      .eq("id", user.id)
      .single();

    if (profileError || !callerProfile?.admin_role) {
      throw new Error("Unauthorized: Admin access required");
    }

    // Create admin client to access auth.admin API
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    // Get all users from auth
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.listUsers({
      perPage: 1000,
    });

    if (authError) {
      console.error("Error fetching auth users:", authError);
      throw new Error(`Failed to fetch users: ${authError.message}`);
    }

    const authUsers = authData?.users || [];

    // Get all profiles
    const { data: profiles, error: profilesError } = await supabaseAdmin
      .from("profiles")
      .select("*");

    if (profilesError) {
      console.error("Error fetching profiles:", profilesError);
      throw new Error(`Failed to fetch profiles: ${profilesError.message}`);
    }

    // Create a map of profiles by id
    const profileMap = new Map(profiles?.map(p => [p.id, p]) || []);

    // Merge auth users with profiles
    const users = authUsers.map(authUser => {
      const profile = profileMap.get(authUser.id);
      return {
        id: authUser.id,
        email: authUser.email,
        email_confirmed: authUser.email_confirmed_at !== null,
        last_sign_in: authUser.last_sign_in_at,
        created_at: authUser.created_at,
        // Profile data
        full_name: profile?.full_name || null,
        username: profile?.username || null,
        avatar_url: profile?.avatar_url || null,
        role: profile?.role || null,
        admin_role: profile?.admin_role || null,
        subscribed: profile?.subscribed || false,
        subscription_tier: profile?.subscription_tier || null,
        subscription_start: profile?.subscription_start || null,
        subscription_end: profile?.subscription_end || null,
        elec_id_enabled: profile?.elec_id_enabled || false,
        onboarding_completed: profile?.onboarding_completed || false,
        updated_at: profile?.updated_at || null,
      };
    });

    // Sort by created_at descending (newest first)
    users.sort((a, b) => {
      const dateA = new Date(a.created_at || 0).getTime();
      const dateB = new Date(b.created_at || 0).getTime();
      return dateB - dateA;
    });

    console.log(`Admin ${user.id} fetched ${users.length} users`);

    return new Response(
      JSON.stringify({ users, count: users.length }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error in admin-get-users:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});
