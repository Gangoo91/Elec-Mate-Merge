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
    const { action, announcement } = await req.json();

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
          .from("admin_announcements")
          .select("*")
          .order("created_at", { ascending: false });
        if (error) throw error;

        // Get dismissal counts
        const { data: dismissals } = await supabaseAdmin
          .from("admin_announcement_dismissals")
          .select("announcement_id");

        const dismissalCounts: Record<string, number> = {};
        dismissals?.forEach((d: any) => {
          dismissalCounts[d.announcement_id] = (dismissalCounts[d.announcement_id] || 0) + 1;
        });

        const announcementsWithCounts = data?.map((a: any) => ({
          ...a,
          dismissal_count: dismissalCounts[a.id] || 0,
        }));

        result = { announcements: announcementsWithCounts };
        break;
      }

      case "create": {
        if (!announcement?.title || !announcement?.message) {
          throw new Error("Title and message are required");
        }
        const { data, error } = await supabaseAdmin
          .from("admin_announcements")
          .insert({
            title: announcement.title,
            message: announcement.message,
            type: announcement.type || "info",
            target_roles: announcement.target_roles || ["visitor", "apprentice", "electrician", "employer"],
            is_dismissible: announcement.is_dismissible ?? true,
            ends_at: announcement.ends_at || null,
            created_by: user.id,
          })
          .select()
          .single();
        if (error) throw error;
        console.log(`Announcement "${data.title}" created by admin ${user.id}`);
        result = { announcement: data };
        break;
      }

      case "update": {
        if (!announcement?.id) {
          throw new Error("Announcement ID is required");
        }
        const updateData: any = {};
        if (announcement.title !== undefined) updateData.title = announcement.title;
        if (announcement.message !== undefined) updateData.message = announcement.message;
        if (announcement.type !== undefined) updateData.type = announcement.type;
        if (announcement.target_roles !== undefined) updateData.target_roles = announcement.target_roles;
        if (announcement.is_dismissible !== undefined) updateData.is_dismissible = announcement.is_dismissible;
        if (announcement.is_active !== undefined) updateData.is_active = announcement.is_active;
        if (announcement.ends_at !== undefined) updateData.ends_at = announcement.ends_at;

        const { data, error } = await supabaseAdmin
          .from("admin_announcements")
          .update(updateData)
          .eq("id", announcement.id)
          .select()
          .single();
        if (error) throw error;
        console.log(`Announcement ${announcement.id} updated by admin ${user.id}`);
        result = { announcement: data };
        break;
      }

      case "delete": {
        if (!isSuperAdmin) {
          throw new Error("Unauthorized: Super admin access required to delete announcements");
        }
        if (!announcement?.id) {
          throw new Error("Announcement ID is required");
        }
        const { error } = await supabaseAdmin
          .from("admin_announcements")
          .delete()
          .eq("id", announcement.id);
        if (error) throw error;
        console.log(`Announcement ${announcement.id} deleted by super admin ${user.id}`);
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
    console.error("Error in admin-manage-announcements:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});
