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
    const { action, offer } = await req.json();

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
          .from("promo_offers")
          .select("*")
          .order("created_at", { ascending: false });
        if (error) throw error;
        result = { offers: data };
        break;
      }

      case "create": {
        if (!offer?.name || offer.price === undefined) {
          throw new Error("Offer name and price are required");
        }
        const code = `${offer.name.toUpperCase().replace(/\s+/g, "").slice(0, 8)}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
        const { data, error } = await supabaseAdmin
          .from("promo_offers")
          .insert({
            name: offer.name,
            code,
            price: offer.price,
            plan_id: offer.plan_id || "electrician",
            max_redemptions: offer.max_redemptions || null,
            expires_at: offer.expires_at || null,
            is_active: true,
            redemptions: 0,
          })
          .select()
          .single();
        if (error) throw error;
        console.log(`Offer ${data.code} created by admin ${user.id}`);
        result = { offer: data };
        break;
      }

      case "update": {
        if (!offer?.id) {
          throw new Error("Offer ID is required");
        }
        const { data, error } = await supabaseAdmin
          .from("promo_offers")
          .update({
            is_active: offer.is_active,
            ...(offer.name && { name: offer.name }),
            ...(offer.price !== undefined && { price: offer.price }),
            ...(offer.max_redemptions !== undefined && { max_redemptions: offer.max_redemptions }),
          })
          .eq("id", offer.id)
          .select()
          .single();
        if (error) throw error;
        console.log(`Offer ${offer.id} updated by admin ${user.id}`);
        result = { offer: data };
        break;
      }

      case "delete": {
        if (!offer?.id) {
          throw new Error("Offer ID is required");
        }
        // Only super admins can delete
        if (callerProfile.admin_role !== "super_admin") {
          throw new Error("Unauthorized: Super admin access required to delete offers");
        }
        const { error } = await supabaseAdmin
          .from("promo_offers")
          .delete()
          .eq("id", offer.id);
        if (error) throw error;
        console.log(`Offer ${offer.id} deleted by super admin ${user.id}`);
        result = { success: true };
        break;
      }

      case "get_redemptions": {
        if (!offer?.id) {
          throw new Error("Offer ID is required");
        }
        const { data, error } = await supabaseAdmin
          .from("offer_redemptions")
          .select(`
            id,
            redeemed_at,
            amount_paid,
            profiles:user_id (id, full_name)
          `)
          .eq("offer_id", offer.id)
          .order("redeemed_at", { ascending: false });
        if (error) throw error;
        result = { redemptions: data };
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
    console.error("Error in admin-manage-offers:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});
