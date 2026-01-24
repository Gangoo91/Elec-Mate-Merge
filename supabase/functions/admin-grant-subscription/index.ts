import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-request-id",
};

// Email template for beta access notification
function getBetaAccessEmailHtml(name: string | null): string {
  const displayName = name || "there";
  const appUrl = "https://elec-mate.com/dashboard";
  const logoUrl = "https://elec-mate.com/logo.jpg";

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Elec-Mate Beta</title>
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
                You're In, ${displayName}! 🎉
              </h2>

              <p style="margin: 0 0 16px 0; color: #a1a1aa; font-size: 15px; line-height: 1.6;">
                Great news! You've been selected as a beta tester and granted <strong style="color: #fbbf24;">Employer Access</strong> to Elec-Mate - completely free.
              </p>

              <p style="margin: 0 0 24px 0; color: #a1a1aa; font-size: 15px; line-height: 1.6;">
                This means <strong style="color: #ffffff;">access to all areas</strong> - every tool, every feature, no restrictions.
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
                  <tr>
                    <td style="padding: 6px 0; color: #a1a1aa; font-size: 14px;">
                      <span style="color: #22c55e;">✓</span> Employer hub & team management
                    </td>
                  </tr>
                </table>
              </div>

              <!-- CTA Button -->
              <a href="${appUrl}" style="display: block; padding: 16px 32px; background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); color: #0a0a0a; text-decoration: none; font-size: 16px; font-weight: 700; border-radius: 12px; text-align: center; box-shadow: 0 4px 16px rgba(251, 191, 36, 0.3);">
                Open Elec-Mate
              </a>

              <p style="margin: 24px 0 0 0; color: #71717a; font-size: 13px; line-height: 1.5; text-align: center;">
                As a beta tester, your feedback is invaluable. If you spot any issues or have suggestions, just reply to this email.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 24px; border-top: 1px solid #27272a; text-align: center;">
              <p style="margin: 0; color: #52525b; font-size: 12px;">
                © ${new Date().getFullYear()} Elec-Mate. Questions? <a href="mailto:founder@elec-mate.com" style="color: #fbbf24;">founder@elec-mate.com</a>
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

    // Get target user's email from auth
    const { data: authData } = await supabaseAdmin.auth.admin.getUserById(userId);
    const targetEmail = authData?.user?.email;

    if (action === "revoke") {
      // Revoke subscription - clear both subscribed AND free_access_granted
      const { error: updateError } = await supabaseAdmin
        .from("profiles")
        .update({
          subscribed: false,
          free_access_granted: false,
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
      // Grant subscription - default to Employer (full access) for beta testers
      // IMPORTANT: Set free_access_granted = true so they don't count as paying revenue
      const subscriptionTier = tier || "Employer";
      const { error: updateError } = await supabaseAdmin
        .from("profiles")
        .update({
          subscribed: true,
          free_access_granted: true,
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

      // Send notification email to the beta tester
      let emailSent = false;
      if (targetEmail) {
        try {
          const resendKey = Deno.env.get("RESEND_API_KEY");
          if (resendKey) {
            const resend = new Resend(resendKey);
            await resend.emails.send({
              from: "Elec-Mate <founder@elec-mate.com>",
              to: [targetEmail],
              subject: "You're In! Your Free Elec-Mate Access is Ready",
              html: getBetaAccessEmailHtml(targetProfile?.full_name || null),
            });
            emailSent = true;
            console.log(`Beta access email sent to ${targetEmail}`);
          }
        } catch (emailErr) {
          console.error("Failed to send beta access email:", emailErr);
          // Don't fail the grant - email is secondary
        }
      }

      return new Response(
        JSON.stringify({
          success: true,
          message: "Subscription granted successfully",
          tier: subscriptionTier,
          emailSent,
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
