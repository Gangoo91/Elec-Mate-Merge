import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

// Track launch email click and redirect to signup
Deno.serve(async (req) => {
  const url = new URL(req.url);
  const token = url.searchParams.get("token");
  const siteUrl = Deno.env.get("SITE_URL") || "https://elec-mate.com";

  // Default redirect - use launch ref instead of early-access
  let redirectUrl = `${siteUrl}/auth/signup`;

  if (token) {
    redirectUrl = `${siteUrl}/auth/signup?ref=launch&token=${token}`;

    try {
      const supabaseAdmin = createClient(
        Deno.env.get("SUPABASE_URL") ?? "",
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
        { auth: { autoRefreshToken: false, persistSession: false } }
      );

      // Find and update the invite - only record first click
      const { data: invite } = await supabaseAdmin
        .from("early_access_invites")
        .select("id, launch_email_clicked_at")
        .eq("invite_token", token)
        .single();

      if (invite && !invite.launch_email_clicked_at) {
        await supabaseAdmin
          .from("early_access_invites")
          .update({ launch_email_clicked_at: new Date().toISOString() })
          .eq("id", invite.id);

        console.log(`Launch click tracked for token ${token}`);
      }
    } catch (error) {
      console.error("Launch click tracking error:", error);
    }
  }

  // Redirect to signup page
  return new Response(null, {
    status: 302,
    headers: { "Location": redirectUrl },
  });
});
