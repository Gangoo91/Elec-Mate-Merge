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

    // Verify the caller is a super admin
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
    const { action, messageId, category, limit = 100 } = await req.json();

    // Create admin client for operations
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    let result;

    switch (action) {
      case "list": {
        let query = supabaseAdmin
          .from("global_chat_messages")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(limit);

        if (category && category !== "all") {
          query = query.eq("category", category);
        }

        const { data, error } = await query;
        if (error) throw error;
        result = { messages: data };
        break;
      }

      case "stats": {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const [totalRes, todayRes, categoriesRes] = await Promise.all([
          supabaseAdmin.from("global_chat_messages").select("*", { count: "exact", head: true }),
          supabaseAdmin.from("global_chat_messages").select("*", { count: "exact", head: true })
            .gte("created_at", today.toISOString()),
          supabaseAdmin.from("global_chat_messages").select("category"),
        ]);

        const categories = new Set(categoriesRes.data?.map(m => m.category).filter(Boolean));

        result = {
          total: totalRes.count || 0,
          today: todayRes.count || 0,
          categories: categories.size,
        };
        break;
      }

      case "delete": {
        if (!messageId) {
          throw new Error("Message ID is required");
        }
        const { error } = await supabaseAdmin
          .from("global_chat_messages")
          .delete()
          .eq("id", messageId);
        if (error) throw error;
        console.log(`Message ${messageId} deleted by super admin ${user.id}`);
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
    console.error("Error in admin-manage-conversations:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});
