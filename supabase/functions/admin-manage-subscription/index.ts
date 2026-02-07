import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-request-id",
};

// Email template for free access notification
function getFreeAccessEmailHtml(name: string | null, tier: string, expiresAt: string | null): string {
  const displayName = name || "there";
  const appUrl = "https://elec-mate.com/dashboard";
  const logoUrl = "https://elec-mate.com/logo.jpg";

  const expiryText = expiresAt
    ? `Your access is valid until <strong style="color: #ffffff;">${new Date(expiresAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</strong>.`
    : "Your access has no expiry date - enjoy!";

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Free Elec-Mate Access</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0a0a0a; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 480px; background-color: #141414; border-radius: 16px; overflow: hidden;">
          <!-- Header with Logo -->
          <tr>
            <td style="background-color: #0a0a0a; padding: 24px; text-align: center; border-bottom: 1px solid #27272a;">
              <img src="${logoUrl}" alt="Elec-Mate" style="height: 50px; width: auto; margin-bottom: 8px;" />
              <h1 style="margin: 0; color: #fbbf24; font-size: 24px; font-weight: 700;">Elec-Mate</h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 32px 24px;">
              <h2 style="margin: 0 0 16px 0; color: #ffffff; font-size: 22px; font-weight: 600;">
                You've Got Free Access, ${displayName}! 🎉
              </h2>

              <p style="margin: 0 0 16px 0; color: #a1a1aa; font-size: 15px; line-height: 1.6;">
                Great news! You've been granted <strong style="color: #fbbf24;">${tier} Access</strong> to Elec-Mate - completely free.
              </p>

              <p style="margin: 0 0 24px 0; color: #a1a1aa; font-size: 15px; line-height: 1.6;">
                ${expiryText}
              </p>

              <!-- Features Box -->
              <div style="background-color: #1a1a1a; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
                <p style="margin: 0 0 12px 0; color: #ffffff; font-size: 14px; font-weight: 600;">What's unlocked:</p>
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding: 6px 0; color: #a1a1aa; font-size: 14px;">
                      <span style="color: #22c55e;">✓</span> All AI-powered tools & calculators
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; color: #a1a1aa; font-size: 14px;">
                      <span style="color: #22c55e;">✓</span> BS7671 regulation assistant
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; color: #a1a1aa; font-size: 14px;">
                      <span style="color: #22c55e;">✓</span> Quote & invoice builder
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; color: #a1a1aa; font-size: 14px;">
                      <span style="color: #22c55e;">✓</span> Study centre & CPD resources
                    </td>
                  </tr>
                  ${tier === "Employer" ? `
                  <tr>
                    <td style="padding: 6px 0; color: #a1a1aa; font-size: 14px;">
                      <span style="color: #22c55e;">✓</span> Employer hub & team management
                    </td>
                  </tr>
                  ` : ""}
                </table>
              </div>

              <!-- CTA Button -->
              <a href="${appUrl}" style="display: block; padding: 16px 32px; background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); color: #0a0a0a; text-decoration: none; font-size: 16px; font-weight: 700; border-radius: 12px; text-align: center; box-shadow: 0 4px 16px rgba(251, 191, 36, 0.3);">
                Open Elec-Mate
              </a>

              <p style="margin: 24px 0 0 0; color: #71717a; font-size: 13px; line-height: 1.5; text-align: center;">
                Questions? Just reply to this email - we're here to help.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 24px; border-top: 1px solid #27272a; text-align: center;">
              <p style="margin: 0; color: #52525b; font-size: 12px;">
                © ${new Date().getFullYear()} Elec-Mate. <a href="mailto:founder@elec-mate.com" style="color: #fbbf24;">founder@elec-mate.com</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

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
    const { action, target_user_id, subscription_tier, expires_at, reason } = await req.json();

    if (!target_user_id) {
      throw new Error("target_user_id is required");
    }

    if (!action || !["grant_free_access", "revoke_free_access"].includes(action)) {
      throw new Error("Invalid action. Must be 'grant_free_access' or 'revoke_free_access'");
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
      .eq("id", target_user_id)
      .single();

    // Get target user's email from auth
    const { data: authData } = await supabaseAdmin.auth.admin.getUserById(target_user_id);
    const targetEmail = authData?.user?.email;

    if (action === "revoke_free_access") {
      // Revoke free access
      const { error: updateError } = await supabaseAdmin
        .from("profiles")
        .update({
          subscribed: false,
          free_access_granted: false,
          free_access_expires_at: null,
          free_access_reason: null,
          subscription_tier: null,
          subscription_start: null,
          subscription_end: null,
        })
        .eq("id", target_user_id);

      if (updateError) {
        console.error("Error revoking access:", updateError);
        throw new Error(`Failed to revoke access: ${updateError.message}`);
      }

      console.log(`Free access revoked for ${target_user_id} (${targetProfile?.full_name}) by admin ${user.id} (${callerProfile.full_name}). Reason: ${reason || "Not specified"}`);

      return new Response(
        JSON.stringify({ success: true, message: "Free access revoked successfully" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        }
      );
    } else {
      // Grant free access
      const tier = subscription_tier || "Employer";

      const { error: updateError } = await supabaseAdmin
        .from("profiles")
        .update({
          subscribed: true,
          free_access_granted: true,
          free_access_expires_at: expires_at || null,
          free_access_reason: reason || null,
          subscription_tier: tier,
          subscription_start: new Date().toISOString(),
          subscription_end: expires_at || null,
        })
        .eq("id", target_user_id);

      if (updateError) {
        console.error("Error granting access:", updateError);
        throw new Error(`Failed to grant access: ${updateError.message}`);
      }

      console.log(`Free access granted (${tier}) to ${target_user_id} (${targetProfile?.full_name}) by admin ${user.id} (${callerProfile.full_name}). Expires: ${expires_at || "Never"}. Reason: ${reason || "Not specified"}`);

      // Send notification email
      let emailSent = false;
      if (targetEmail) {
        try {
          const resendKey = Deno.env.get("RESEND_API_KEY");
          if (resendKey) {
            const resend = new Resend(resendKey);
            await resend.emails.send({
              from: "Elec-Mate <founder@elec-mate.com>",
              to: [targetEmail],
              subject: "You've Got Free Elec-Mate Access! 🎉",
              html: getFreeAccessEmailHtml(targetProfile?.full_name || null, tier, expires_at),
            });
            emailSent = true;
            console.log(`Free access email sent to ${targetEmail}`);
          }
        } catch (emailErr) {
          console.error("Failed to send free access email:", emailErr);
          // Don't fail the grant - email is secondary
        }
      }

      return new Response(
        JSON.stringify({
          success: true,
          message: "Free access granted successfully",
          tier,
          expires_at: expires_at || null,
          emailSent,
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        }
      );
    }
  } catch (error) {
    console.error("Error in admin-manage-subscription:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});
