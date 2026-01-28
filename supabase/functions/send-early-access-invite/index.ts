import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-request-id",
};

// Generate unique invite token with EA prefix
function generateToken(): string {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let token = "EA-";
  for (let i = 0; i < 16; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
}

// Generate LAUNCH email HTML (different from early access - we're now live!)
function generateLaunchEmailHTML(email: string, inviteToken: string): string {
  const supabaseUrl = Deno.env.get("SUPABASE_URL") || "https://jtwygbeceundfgnkirof.supabase.co";
  const signupUrl = `${supabaseUrl}/functions/v1/track-launch-click?token=${inviteToken}`;
  const trackingPixelUrl = `${supabaseUrl}/functions/v1/track-launch-open?token=${inviteToken}`;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="dark">
  <meta name="supported-color-schemes" content="dark">
  <title>We've Launched! Elec-Mate is Live</title>
  <!--[if mso]>
  <style type="text/css">
    body, table, td { font-family: Arial, sans-serif !important; }
  </style>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0f172a; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #0f172a;">
    <tr>
      <td style="padding: 24px 12px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 480px; margin: 0 auto; background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%); border-radius: 24px; overflow: hidden; border: 1px solid rgba(251, 191, 36, 0.2);">

          <!-- Header with Party Emoji -->
          <tr>
            <td style="padding: 40px 24px 24px; text-align: center;">
              <div style="font-size: 56px; line-height: 1; margin-bottom: 16px;">🎉</div>
              <div style="display: inline-block; background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); color: #ffffff; padding: 8px 20px; border-radius: 24px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 20px;">
                Now Live
              </div>
              <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px; line-height: 1.2;">
                We've Launched!
              </h1>
              <p style="margin: 12px 0 0; font-size: 16px; color: #e2e8f0; line-height: 1.5;">
                Elec-Mate is officially live - and we saved you a spot
              </p>
            </td>
          </tr>

          <!-- Message -->
          <tr>
            <td style="padding: 0 24px 24px;">
              <p style="margin: 0; font-size: 16px; color: #e2e8f0; line-height: 1.7; text-align: center;">
                You signed up for updates, so we wanted <strong style="color: #fbbf24;">YOU</strong> to be the first to know - Elec-Mate is now officially live!
              </p>
              <p style="margin: 16px 0 0; font-size: 15px; color: #94a3b8; line-height: 1.6; text-align: center;">
                We've been working hard to build the ultimate platform for UK electricians. Everything you need - certs, quotes, calculators, learning - all in one place.
              </p>
            </td>
          </tr>

          <!-- Trial Card -->
          <tr>
            <td style="padding: 0 20px 24px;">
              <div style="background: linear-gradient(135deg, rgba(251, 191, 36, 0.15) 0%, rgba(251, 191, 36, 0.05) 100%); border: 1px solid rgba(251, 191, 36, 0.3); border-radius: 20px; padding: 28px 24px; text-align: center;">
                <p style="margin: 0; font-size: 14px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">
                  Launch Special
                </p>
                <p style="margin: 8px 0 4px; font-size: 42px; font-weight: 800; color: #fbbf24; line-height: 1;">
                  7 Days Free
                </p>
                <p style="margin: 0 0 16px; font-size: 16px; color: #94a3b8;">
                  No card required • Cancel anytime
                </p>
                <p style="margin: 0; font-size: 14px; color: #cbd5e1; background: rgba(0,0,0,0.2); padding: 8px 16px; border-radius: 8px; display: inline-block;">
                  Then just £9.99/month
                </p>
              </div>
            </td>
          </tr>

          <!-- CTA Button -->
          <tr>
            <td style="padding: 0 20px 32px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td>
                    <a href="${signupUrl}" style="display: block; padding: 18px 32px; background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); color: #0f172a; text-decoration: none; font-size: 18px; font-weight: 700; border-radius: 14px; text-align: center; box-shadow: 0 8px 24px rgba(251, 191, 36, 0.35);">
                      ⚡ Start My Free Trial
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- What's Included -->
          <tr>
            <td style="padding: 0 20px 28px;">
              <p style="margin: 0 0 16px; font-size: 13px; font-weight: 700; color: #fbbf24; text-transform: uppercase; letter-spacing: 1px; text-align: center;">
                Everything you need
              </p>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="padding: 10px 16px; background-color: rgba(30, 41, 59, 0.8); border-radius: 12px;">
                    <span style="color: #fbbf24; font-size: 16px; margin-right: 10px;">🔌</span>
                    <span style="color: #ffffff; font-size: 14px;">EICR, EIC, Minor Works - all BS7671 compliant</span>
                  </td>
                </tr>
                <tr><td style="height: 6px;"></td></tr>
                <tr>
                  <td style="padding: 10px 16px; background-color: rgba(30, 41, 59, 0.8); border-radius: 12px;">
                    <span style="color: #fbbf24; font-size: 16px; margin-right: 10px;">💰</span>
                    <span style="color: #ffffff; font-size: 14px;">Professional quotes & invoices with online payments</span>
                  </td>
                </tr>
                <tr><td style="height: 6px;"></td></tr>
                <tr>
                  <td style="padding: 10px 16px; background-color: rgba(30, 41, 59, 0.8); border-radius: 12px;">
                    <span style="color: #fbbf24; font-size: 16px; margin-right: 10px;">🤖</span>
                    <span style="color: #ffffff; font-size: 14px;">AI Tools - BS7671 assistant, RAMS, circuit designer</span>
                  </td>
                </tr>
                <tr><td style="height: 6px;"></td></tr>
                <tr>
                  <td style="padding: 10px 16px; background-color: rgba(30, 41, 59, 0.8); border-radius: 12px;">
                    <span style="color: #fbbf24; font-size: 16px; margin-right: 10px;">🧮</span>
                    <span style="color: #ffffff; font-size: 14px;">Cable sizing, volt drop, max demand calculators</span>
                  </td>
                </tr>
                <tr><td style="height: 6px;"></td></tr>
                <tr>
                  <td style="padding: 10px 16px; background-color: rgba(30, 41, 59, 0.8); border-radius: 12px;">
                    <span style="color: #fbbf24; font-size: 16px; margin-right: 10px;">📚</span>
                    <span style="color: #ffffff; font-size: 14px;">Study Centre with CPD courses & mock exams</span>
                  </td>
                </tr>
                <tr><td style="height: 6px;"></td></tr>
                <tr>
                  <td style="padding: 10px 16px; background-color: rgba(30, 41, 59, 0.8); border-radius: 12px;">
                    <span style="color: #fbbf24; font-size: 16px; margin-right: 10px;">📱</span>
                    <span style="color: #ffffff; font-size: 14px;">Mobile-first - works perfectly on site</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Social Proof -->
          <tr>
            <td style="padding: 0 20px 28px;">
              <div style="background: rgba(34, 197, 94, 0.1); border: 1px solid rgba(34, 197, 94, 0.25); border-radius: 12px; padding: 14px 20px; text-align: center;">
                <p style="margin: 0; font-size: 14px; color: #22c55e; font-weight: 600;">
                  ✓ Join hundreds of UK sparks already using Elec-Mate
                </p>
              </div>
            </td>
          </tr>

          <!-- Help Section -->
          <tr>
            <td style="padding: 24px; background-color: rgba(15, 23, 42, 0.8); border-top: 1px solid rgba(148, 163, 184, 0.1); text-align: center;">
              <p style="margin: 0 0 8px; font-size: 14px; color: #cbd5e1;">
                Questions? Just reply to this email
              </p>
              <a href="mailto:info@elec-mate.com" style="font-size: 15px; color: #fbbf24; text-decoration: none; font-weight: 600;">
                info@elec-mate.com
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 24px; text-align: center; background-color: #0f172a;">
              <p style="margin: 0; font-size: 13px; color: #64748b;">
                © ${new Date().getFullYear()} Elec-Mate · Made in the UK 🇬🇧
              </p>
              <p style="margin: 8px 0 0; font-size: 11px; color: #475569;">
                You're receiving this because you signed up for updates at elec-mate.com
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
  <!-- Email open tracking pixel -->
  <img src="${trackingPixelUrl}" width="1" height="1" style="display:none;width:1px;height:1px;border:0;" alt="" />
</body>
</html>
  `;
}

// Generate early access invite email HTML
function generateInviteEmailHTML(email: string, inviteToken: string): string {
  const supabaseUrl = Deno.env.get("SUPABASE_URL") || "https://jtwygbeceundfgnkirof.supabase.co";
  // Use click tracking redirect instead of direct link
  const signupUrl = `${supabaseUrl}/functions/v1/track-email-click?token=${inviteToken}`;
  const trackingPixelUrl = `${supabaseUrl}/functions/v1/track-email-open?token=${inviteToken}`;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="dark">
  <meta name="supported-color-schemes" content="dark">
  <title>You're Invited! Early Access to Elec-Mate</title>
  <!--[if mso]>
  <style type="text/css">
    body, table, td { font-family: Arial, sans-serif !important; }
  </style>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0f172a; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #0f172a;">
    <tr>
      <td style="padding: 24px 12px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 480px; margin: 0 auto; background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%); border-radius: 24px; overflow: hidden; border: 1px solid rgba(251, 191, 36, 0.2);">

          <!-- Header with Rocket Emoji -->
          <tr>
            <td style="padding: 40px 24px 24px; text-align: center;">
              <div style="font-size: 56px; line-height: 1; margin-bottom: 16px;">🚀</div>
              <div style="display: inline-block; background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: #ffffff; padding: 8px 20px; border-radius: 24px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 20px;">
                Early Access
              </div>
              <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px; line-height: 1.2;">
                You're Invited!
              </h1>
              <p style="margin: 12px 0 0; font-size: 16px; color: #e2e8f0; line-height: 1.5;">
                Early access to Elec-Mate - before everyone else
              </p>
            </td>
          </tr>

          <!-- Message -->
          <tr>
            <td style="padding: 0 24px 24px;">
              <p style="margin: 0; font-size: 16px; color: #e2e8f0; line-height: 1.7; text-align: center;">
                Because you signed up for our email updates, we wanted to give <strong style="color: #fbbf24;">YOU</strong> early access to Elec-Mate - before everyone else!
              </p>
              <p style="margin: 16px 0 0; font-size: 15px; color: #94a3b8; line-height: 1.6; text-align: center;">
                It's not fully complete, but it's almost there. We'd love your feedback as we put the finishing touches on everything.
              </p>
            </td>
          </tr>

          <!-- Trial Card -->
          <tr>
            <td style="padding: 0 20px 24px;">
              <div style="background: linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(34, 197, 94, 0.05) 100%); border: 1px solid rgba(34, 197, 94, 0.3); border-radius: 20px; padding: 28px 24px; text-align: center;">
                <p style="margin: 0; font-size: 14px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">
                  Your Exclusive Offer
                </p>
                <p style="margin: 8px 0 4px; font-size: 42px; font-weight: 800; color: #22c55e; line-height: 1;">
                  7 Days Free
                </p>
                <p style="margin: 0 0 16px; font-size: 16px; color: #94a3b8;">
                  No credit card required
                </p>
                <p style="margin: 0; font-size: 14px; color: #cbd5e1; background: rgba(0,0,0,0.2); padding: 8px 16px; border-radius: 8px; display: inline-block;">
                  Start exploring today
                </p>
              </div>
            </td>
          </tr>

          <!-- CTA Button -->
          <tr>
            <td style="padding: 0 20px 32px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td>
                    <a href="${signupUrl}" style="display: block; padding: 18px 32px; background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); color: #0f172a; text-decoration: none; font-size: 18px; font-weight: 700; border-radius: 14px; text-align: center; box-shadow: 0 8px 24px rgba(251, 191, 36, 0.35);">
                      ⚡ Start My Free Trial
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- What's Included -->
          <tr>
            <td style="padding: 0 20px 28px;">
              <p style="margin: 0 0 16px; font-size: 13px; font-weight: 700; color: #fbbf24; text-transform: uppercase; letter-spacing: 1px; text-align: center;">
                What's included
              </p>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="padding: 10px 16px; background-color: rgba(30, 41, 59, 0.8); border-radius: 12px;">
                    <span style="color: #fbbf24; font-size: 16px; margin-right: 10px;">🔌</span>
                    <span style="color: #ffffff; font-size: 14px;">Inspection & Testing Suite - EICR, EIC, Minor Works</span>
                  </td>
                </tr>
                <tr><td style="height: 6px;"></td></tr>
                <tr>
                  <td style="padding: 10px 16px; background-color: rgba(30, 41, 59, 0.8); border-radius: 12px;">
                    <span style="color: #fbbf24; font-size: 16px; margin-right: 10px;">💰</span>
                    <span style="color: #ffffff; font-size: 14px;">Quotes & Invoicing with Stripe integration</span>
                  </td>
                </tr>
                <tr><td style="height: 6px;"></td></tr>
                <tr>
                  <td style="padding: 10px 16px; background-color: rgba(30, 41, 59, 0.8); border-radius: 12px;">
                    <span style="color: #fbbf24; font-size: 16px; margin-right: 10px;">🧠</span>
                    <span style="color: #ffffff; font-size: 14px;">Mental Health Hub - Wellbeing resources</span>
                  </td>
                </tr>
                <tr><td style="height: 6px;"></td></tr>
                <tr>
                  <td style="padding: 10px 16px; background-color: rgba(30, 41, 59, 0.8); border-radius: 12px;">
                    <span style="color: #fbbf24; font-size: 16px; margin-right: 10px;">📚</span>
                    <span style="color: #ffffff; font-size: 14px;">Study Centre - Courses, mock exams, BS7671 guides</span>
                  </td>
                </tr>
                <tr><td style="height: 6px;"></td></tr>
                <tr>
                  <td style="padding: 10px 16px; background-color: rgba(30, 41, 59, 0.8); border-radius: 12px;">
                    <span style="color: #fbbf24; font-size: 16px; margin-right: 10px;">🤖</span>
                    <span style="color: #ffffff; font-size: 14px;">AI Tools - BS7671 assistant, RAMS, circuit designer</span>
                  </td>
                </tr>
                <tr><td style="height: 6px;"></td></tr>
                <tr>
                  <td style="padding: 10px 16px; background-color: rgba(30, 41, 59, 0.8); border-radius: 12px;">
                    <span style="color: #fbbf24; font-size: 16px; margin-right: 10px;">🧮</span>
                    <span style="color: #ffffff; font-size: 14px;">Smart Calculators - Cable sizing, volt drop & more</span>
                  </td>
                </tr>
                <tr><td style="height: 6px;"></td></tr>
                <tr>
                  <td style="padding: 10px 16px; background-color: rgba(30, 41, 59, 0.8); border-radius: 12px;">
                    <span style="color: #fbbf24; font-size: 16px; margin-right: 10px;">🆔</span>
                    <span style="color: #ffffff; font-size: 14px;">Elec-ID - Your digital professional profile</span>
                  </td>
                </tr>
                <tr><td style="height: 6px;"></td></tr>
                <tr>
                  <td style="padding: 10px 16px; background-color: rgba(30, 41, 59, 0.8); border-radius: 12px;">
                    <span style="color: #fbbf24; font-size: 16px; margin-right: 10px;">📱</span>
                    <span style="color: #ffffff; font-size: 14px;">Mobile-First - Built for use on site</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Expiry Notice -->
          <tr>
            <td style="padding: 0 20px 28px;">
              <div style="background: rgba(251, 191, 36, 0.1); border: 1px solid rgba(251, 191, 36, 0.25); border-radius: 12px; padding: 14px 20px; text-align: center;">
                <p style="margin: 0; font-size: 14px; color: #fbbf24; font-weight: 600;">
                  ⏰ This early access link expires in 14 days
                </p>
              </div>
            </td>
          </tr>

          <!-- Help Section -->
          <tr>
            <td style="padding: 24px; background-color: rgba(15, 23, 42, 0.8); border-top: 1px solid rgba(148, 163, 184, 0.1); text-align: center;">
              <p style="margin: 0 0 8px; font-size: 14px; color: #cbd5e1;">
                Questions? Just reply to this email
              </p>
              <a href="mailto:info@elec-mate.com" style="font-size: 15px; color: #fbbf24; text-decoration: none; font-weight: 600;">
                info@elec-mate.com
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 24px; text-align: center; background-color: #0f172a;">
              <p style="margin: 0; font-size: 13px; color: #64748b;">
                © ${new Date().getFullYear()} Elec-Mate · Made in the UK 🇬🇧
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
  <!-- Email open tracking pixel -->
  <img src="${trackingPixelUrl}" width="1" height="1" style="display:none;width:1px;height:1px;border:0;" alt="" />
</body>
</html>
  `;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { action, emails, inviteId, token, testEmail } = await req.json();

    // Actions that don't require any auth (for unauthenticated users)
    // send_test_launch_email included for quick testing from CLI
    const noAuthActions = ["validate_token", "send_test_launch_email"];

    // Create admin client for operations (always available)
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    let user: any = null;
    let supabaseClient: any = null;

    // Only require auth for actions that need it
    if (!noAuthActions.includes(action)) {
      const authHeader = req.headers.get("Authorization");
      if (!authHeader) {
        throw new Error("No authorization header");
      }

      // Create Supabase client with user's token
      supabaseClient = createClient(
        Deno.env.get("SUPABASE_URL") ?? "",
        Deno.env.get("SUPABASE_ANON_KEY") ?? "",
        { global: { headers: { Authorization: authHeader } } }
      );

      // Get the authenticated user
      const { data: { user: authUser }, error: userError } = await supabaseClient.auth.getUser();
      if (userError || !authUser) {
        throw new Error("Unauthorized: Could not get user");
      }
      user = authUser;

      // Actions allowed for any authenticated user (not just admins)
      const authenticatedActions = ["claim"];

      // All other actions require admin access
      if (!authenticatedActions.includes(action)) {
        const { data: callerProfile, error: profileError } = await supabaseClient
          .from("profiles")
          .select("admin_role, full_name")
          .eq("id", user.id)
          .single();

        if (profileError || !callerProfile?.admin_role) {
          throw new Error("Unauthorized: Admin access required");
        }
      }
    }

    let result;

    switch (action) {
      case "list": {
        const { data, error } = await supabaseAdmin
          .from("early_access_invites")
          .select("*")
          .order("created_at", { ascending: false });
        if (error) throw error;
        result = { invites: data };
        break;
      }

      case "stats": {
        const { data, error } = await supabaseAdmin
          .from("early_access_invites")
          .select("status, opened_at, claimed_at, clicked_at, delivered_at, bounced_at, last_send_attempt_at, resend_email_id, send_count");
        if (error) throw error;

        const total = data?.length || 0;
        const pending = data?.filter(i => i.status === "pending").length || 0;
        const sent = data?.filter(i => i.status === "sent").length || 0;
        const claimed = data?.filter(i => i.status === "claimed").length || 0;
        const expired = data?.filter(i => i.status === "expired").length || 0;
        const delivered = data?.filter(i => i.delivered_at !== null).length || 0;
        const bounced = data?.filter(i => i.bounced_at !== null).length || 0;
        const opened = data?.filter(i => i.opened_at !== null).length || 0;
        const clicked = data?.filter(i => i.clicked_at !== null).length || 0;
        const unopenedSent = data?.filter(i => i.status === "sent" && !i.opened_at && !i.claimed_at).length || 0;

        // Failed sends: attempted but no resend_email_id (email wasn't actually sent)
        // Using simpler truthy/falsy checks for reliability
        const failedSends = data?.filter(i =>
          i.status === "sent" &&
          !i.opened_at &&
          !i.claimed_at &&
          i.last_send_attempt_at && // has been attempted
          !i.resend_email_id // but no resend ID = email never sent
        ).length || 0;

        // Calculate conversion rates
        // Note: Many signups came from early access before we added click tracking
        // So signup rate is based on sent, not clicked
        const openRate = sent > 0 ? ((opened / sent) * 100).toFixed(1) : "0";
        const clickRate = opened > 0 ? ((clicked / opened) * 100).toFixed(1) : "0";
        const signupRate = sent > 0 ? ((claimed / sent) * 100).toFixed(1) : "0";

        const stats = {
          total,
          pending,
          sent,
          delivered,
          bounced,
          opened,
          clicked,
          claimed,
          expired,
          unopened_sent: unopenedSent,
          failed_sends: failedSends,
          rates: {
            open_rate: `${openRate}%`,
            click_rate: `${clickRate}%`,
            signup_rate: `${signupRate}%`,
          }
        };
        result = { stats };
        break;
      }

      case "bulk_create": {
        if (!emails || !Array.isArray(emails) || emails.length === 0) {
          throw new Error("Email list is required");
        }

        // Clean and validate emails
        const cleanEmails = emails
          .map((e: string) => e.trim().toLowerCase())
          .filter((e: string) => e && e.includes("@"));

        // Check for existing invites
        const { data: existing } = await supabaseAdmin
          .from("early_access_invites")
          .select("email")
          .in("email", cleanEmails);

        const existingEmails = new Set(existing?.map(e => e.email) || []);
        const newEmails = cleanEmails.filter((e: string) => !existingEmails.has(e));

        if (newEmails.length === 0) {
          result = { created: 0, skipped: cleanEmails.length, message: "All emails already have invites" };
          break;
        }

        // Create invites for new emails
        const invites = newEmails.map((email: string) => ({
          email,
          invite_token: generateToken(),
          status: "pending",
        }));

        const { data, error } = await supabaseAdmin
          .from("early_access_invites")
          .insert(invites)
          .select();

        if (error) throw error;

        console.log(`${data?.length} early access invites created by admin ${user.id}`);
        result = {
          created: data?.length || 0,
          skipped: existingEmails.size,
          message: `Created ${data?.length} invites`
        };
        break;
      }

      case "send_invite": {
        if (!inviteId) {
          throw new Error("Invite ID is required");
        }

        // Get the invite
        const { data: invite, error: inviteError } = await supabaseAdmin
          .from("early_access_invites")
          .select("*")
          .eq("id", inviteId)
          .single();

        if (inviteError || !invite) {
          throw new Error("Invite not found");
        }

        if (invite.status === "claimed") {
          throw new Error("This invite has already been claimed");
        }

        // Send the email
        const emailHtml = generateInviteEmailHTML(invite.email, invite.invite_token);

        const { data: emailData, error: emailError } = await resend.emails.send({
          from: "Elec-Mate <hello@elec-mate.com>",
          replyTo: "info@elec-mate.com",
          to: [invite.email],
          subject: "You're Invited! Early Access to Elec-Mate",
          html: emailHtml,
        });

        if (emailError) {
          console.error("Email send error:", emailError);
          throw new Error("Failed to send email");
        }

        // Update invite status with Resend email ID for webhook tracking
        await supabaseAdmin
          .from("early_access_invites")
          .update({
            status: "sent",
            sent_at: new Date().toISOString(),
            resend_email_id: emailData?.id || null,
            send_count: (invite.send_count || 0) + 1,
          })
          .eq("id", inviteId);

        console.log(`Early access invite sent to ${invite.email} by admin ${user.id}`);
        result = { success: true, email: invite.email, resendId: emailData?.id };
        break;
      }

      case "send_all_pending": {
        // Get all pending invites
        const { data: pendingInvites, error: pendingError } = await supabaseAdmin
          .from("early_access_invites")
          .select("*")
          .eq("status", "pending");

        if (pendingError) throw pendingError;

        if (!pendingInvites || pendingInvites.length === 0) {
          result = { sent: 0, message: "No pending invites to send" };
          break;
        }

        let sentCount = 0;
        const errors: string[] = [];

        for (const invite of pendingInvites) {
          try {
            const emailHtml = generateInviteEmailHTML(invite.email, invite.invite_token);

            const { data: emailData, error: emailError } = await resend.emails.send({
              from: "Elec-Mate <hello@elec-mate.com>",
              replyTo: "info@elec-mate.com",
              to: [invite.email],
              subject: "You're Invited! Early Access to Elec-Mate",
              html: emailHtml,
            });

            if (emailError) {
              errors.push(`${invite.email}: ${emailError.message}`);
              continue;
            }

            await supabaseAdmin
              .from("early_access_invites")
              .update({
                status: "sent",
                sent_at: new Date().toISOString(),
                resend_email_id: emailData?.id || null,
                send_count: (invite.send_count || 0) + 1,
              })
              .eq("id", invite.id);

            sentCount++;
          } catch (err: any) {
            errors.push(`${invite.email}: ${err.message}`);
          }
        }

        console.log(`Sent ${sentCount} early access invites by admin ${user.id}`);
        result = { sent: sentCount, errors: errors.length > 0 ? errors : undefined };
        break;
      }

      case "validate_token": {
        if (!token) {
          throw new Error("Token is required");
        }

        const { data: invite, error: inviteError } = await supabaseAdmin
          .from("early_access_invites")
          .select("*")
          .eq("invite_token", token)
          .single();

        if (inviteError || !invite) {
          result = { valid: false, reason: "Invalid token" };
          break;
        }

        if (invite.status === "claimed") {
          result = { valid: false, reason: "This invite has already been claimed" };
          break;
        }

        if (invite.expires_at && new Date(invite.expires_at) < new Date()) {
          result = { valid: false, reason: "This invite has expired" };
          break;
        }

        result = { valid: true, email: invite.email, invite };
        break;
      }

      case "claim": {
        // Called after user signup to mark invite as claimed
        if (!token) {
          throw new Error("Token is required");
        }

        const { data: invite, error: inviteError } = await supabaseAdmin
          .from("early_access_invites")
          .select("*")
          .eq("invite_token", token)
          .single();

        if (inviteError || !invite) {
          throw new Error("Invalid token");
        }

        if (invite.status === "claimed") {
          throw new Error("This invite has already been claimed");
        }

        // Mark as claimed
        const { error: updateError } = await supabaseAdmin
          .from("early_access_invites")
          .update({
            status: "claimed",
            claimed_at: new Date().toISOString(),
            user_id: user.id
          })
          .eq("id", invite.id);

        if (updateError) throw updateError;

        console.log(`Early access invite claimed by ${invite.email} (user ${user.id})`);
        result = { success: true, email: invite.email };
        break;
      }

      case "resend": {
        if (!inviteId) {
          throw new Error("Invite ID is required");
        }

        // Get the invite
        const { data: invite, error: inviteError } = await supabaseAdmin
          .from("early_access_invites")
          .select("*")
          .eq("id", inviteId)
          .single();

        if (inviteError || !invite) {
          throw new Error("Invite not found");
        }

        if (invite.status === "claimed") {
          throw new Error("This invite has already been claimed");
        }

        // Resend the email
        const emailHtml = generateInviteEmailHTML(invite.email, invite.invite_token);

        const { data: emailData, error: emailError } = await resend.emails.send({
          from: "Elec-Mate <hello@elec-mate.com>",
          replyTo: "info@elec-mate.com",
          to: [invite.email],
          subject: "Reminder: Your Early Access to Elec-Mate is Waiting!",
          html: emailHtml,
        });

        if (emailError) {
          throw new Error("Failed to resend email");
        }

        // Update sent_at and tracking info
        await supabaseAdmin
          .from("early_access_invites")
          .update({
            sent_at: new Date().toISOString(),
            resend_email_id: emailData?.id || null,
            send_count: (invite.send_count || 0) + 1,
          })
          .eq("id", inviteId);

        console.log(`Early access invite resent to ${invite.email} by admin ${user.id}`);
        result = { success: true, email: invite.email, resendId: emailData?.id };
        break;
      }

      case "delete": {
        if (!inviteId) {
          throw new Error("Invite ID is required");
        }

        const { error } = await supabaseAdmin
          .from("early_access_invites")
          .delete()
          .eq("id", inviteId);

        if (error) throw error;
        result = { success: true };
        break;
      }

      case "resend_all_unopened": {
        // Batch size - process this many per request to avoid timeout
        const BATCH_SIZE = 50;

        // Get count of all unopened invites first
        const { count: totalUnopenedCount } = await supabaseAdmin
          .from("early_access_invites")
          .select("*", { count: "exact", head: true })
          .eq("status", "sent")
          .is("opened_at", null)
          .is("claimed_at", null);

        // Get next batch - invites not attempted in the last hour
        // This ensures we can retry failed sends and continue where we left off
        const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();

        const { data: unopenedInvites, error: unopenedError } = await supabaseAdmin
          .from("early_access_invites")
          .select("*")
          .eq("status", "sent")
          .is("opened_at", null)
          .is("claimed_at", null)
          .or(`last_send_attempt_at.is.null,last_send_attempt_at.lt.${oneHourAgo}`)
          .order("created_at", { ascending: true })
          .limit(BATCH_SIZE);

        if (unopenedError) throw unopenedError;

        if (!unopenedInvites || unopenedInvites.length === 0) {
          result = {
            sent: 0,
            remaining: 0,
            total_unopened: totalUnopenedCount || 0,
            message: "No more unopened invites to resend",
            complete: true
          };
          break;
        }

        let sentCount = 0;
        const errors: string[] = [];

        for (const invite of unopenedInvites) {
          try {
            // Mark attempt BEFORE sending (so if we timeout, we know we tried)
            await supabaseAdmin
              .from("early_access_invites")
              .update({ last_send_attempt_at: new Date().toISOString() })
              .eq("id", invite.id);

            const emailHtml = generateInviteEmailHTML(invite.email, invite.invite_token);

            const { data: emailData, error: emailError } = await resend.emails.send({
              from: "Elec-Mate <hello@elec-mate.com>",
              replyTo: "info@elec-mate.com",
              to: [invite.email],
              subject: "Reminder: Your Early Access to Elec-Mate is Waiting!",
              html: emailHtml,
            });

            if (emailError) {
              errors.push(`${invite.email}: ${emailError.message}`);
              continue;
            }

            // Update with success data
            await supabaseAdmin
              .from("early_access_invites")
              .update({
                sent_at: new Date().toISOString(),
                resend_email_id: emailData?.id || null,
                send_count: (invite.send_count || 0) + 1,
              })
              .eq("id", invite.id);

            sentCount++;
          } catch (err: any) {
            errors.push(`${invite.email}: ${err.message}`);
          }
        }

        // Calculate remaining (not yet attempted in this batch run)
        const { count: remainingCount } = await supabaseAdmin
          .from("early_access_invites")
          .select("*", { count: "exact", head: true })
          .eq("status", "sent")
          .is("opened_at", null)
          .is("claimed_at", null)
          .or(`last_send_attempt_at.is.null,last_send_attempt_at.lt.${oneHourAgo}`);

        const remaining = remainingCount || 0;
        const complete = remaining === 0;

        console.log(`Resent ${sentCount}/${unopenedInvites.length} unopened invites by admin ${user.id}. Remaining: ${remaining}`);

        result = {
          sent: sentCount,
          attempted: unopenedInvites.length,
          remaining,
          total_unopened: totalUnopenedCount || 0,
          errors: errors.length > 0 ? errors : undefined,
          complete,
          message: complete
            ? `All done! Sent ${sentCount} emails.`
            : `Sent ${sentCount} emails. ${remaining} remaining - call again to continue.`
        };
        break;
      }

      case "detailed_list": {
        // Get invites with joined profile data for claimed invites
        const { data: invites, error: invitesError } = await supabaseAdmin
          .from("early_access_invites")
          .select(`
            id,
            email,
            invite_token,
            status,
            sent_at,
            delivered_at,
            opened_at,
            clicked_at,
            claimed_at,
            bounced_at,
            bounce_type,
            expires_at,
            created_at,
            user_id,
            send_count,
            launch_email_sent_at,
            launch_email_opened_at,
            launch_email_clicked_at
          `)
          .order("created_at", { ascending: false });

        if (invitesError) throw invitesError;

        // Get profile and subscription data for claimed invites
        const claimedUserIds = invites
          ?.filter(i => i.user_id)
          .map(i => i.user_id) || [];

        let profilesMap: Record<string, any> = {};
        let subscriptionsMap: Record<string, any> = {};

        if (claimedUserIds.length > 0) {
          const { data: profiles } = await supabaseAdmin
            .from("profiles")
            .select("id, full_name, role, created_at")
            .in("id", claimedUserIds);

          if (profiles) {
            profilesMap = profiles.reduce((acc, p) => {
              acc[p.id] = p;
              return acc;
            }, {} as Record<string, any>);
          }

          const { data: subscriptions } = await supabaseAdmin
            .from("subscriptions")
            .select("user_id, status, trial_end, plan_name")
            .in("user_id", claimedUserIds);

          if (subscriptions) {
            subscriptionsMap = subscriptions.reduce((acc, s) => {
              acc[s.user_id] = s;
              return acc;
            }, {} as Record<string, any>);
          }
        }

        // Build detailed list
        const detailedInvites = invites?.map(invite => {
          const profile = invite.user_id ? profilesMap[invite.user_id] : null;
          const subscription = invite.user_id ? subscriptionsMap[invite.user_id] : null;

          // Determine derived status based on funnel progression
          let derivedStatus = invite.status;
          if (invite.bounced_at) {
            derivedStatus = "bounced";
          } else if (invite.claimed_at) {
            derivedStatus = "claimed";
          } else if (invite.clicked_at) {
            derivedStatus = "clicked";
          } else if (invite.opened_at) {
            derivedStatus = "opened";
          } else if (invite.delivered_at) {
            derivedStatus = "delivered";
          }

          return {
            id: invite.id,
            email: invite.email,
            status: derivedStatus,
            raw_status: invite.status,
            sent_at: invite.sent_at,
            delivered_at: invite.delivered_at,
            opened_at: invite.opened_at,
            clicked_at: invite.clicked_at,
            claimed_at: invite.claimed_at,
            bounced_at: invite.bounced_at,
            bounce_type: invite.bounce_type,
            expires_at: invite.expires_at,
            created_at: invite.created_at,
            send_count: invite.send_count || 1,
            // Launch campaign tracking
            launch_email_sent_at: invite.launch_email_sent_at,
            launch_email_opened_at: invite.launch_email_opened_at,
            launch_email_clicked_at: invite.launch_email_clicked_at,
            user: profile ? {
              id: invite.user_id,
              full_name: profile.full_name,
              role: profile.role,
              signed_up_at: profile.created_at,
            } : null,
            subscription: subscription ? {
              status: subscription.status,
              plan_name: subscription.plan_name,
              trial_end: subscription.trial_end,
            } : null,
          };
        });

        result = { invites: detailedInvites };
        break;
      }

      case "send_test_launch_email": {
        // Send a test launch email to a specific address (for previewing)
        if (!testEmail) {
          throw new Error("testEmail is required");
        }

        // Generate a test token
        const testToken = `TEST-${Date.now()}`;

        const emailHtml = generateLaunchEmailHTML(testEmail, testToken);

        const { data: emailData, error: emailError } = await resend.emails.send({
          from: "Elec-Mate <hello@elec-mate.com>",
          replyTo: "info@elec-mate.com",
          to: [testEmail],
          subject: "🎉 [TEST] We've Launched! Elec-Mate is Live",
          html: emailHtml,
        });

        if (emailError) {
          console.error("Test email send error:", emailError);
          throw new Error(`Failed to send test email: ${emailError.message}`);
        }

        console.log(`Test launch email sent to ${testEmail}${user ? ` by admin ${user.id}` : ''}`);
        result = {
          success: true,
          email: testEmail,
          resendId: emailData?.id,
          message: `Test launch email sent to ${testEmail}`
        };
        break;
      }

      case "send_launch_campaign": {
        // Send launch emails to people who haven't signed up yet
        // Rate limited: sends in batches with delays to avoid Resend rate limits
        // 295 emails over 30 mins = ~10 per minute = 1 every 6 seconds
        const BATCH_SIZE = 10; // Process 10 at a time
        const DELAY_BETWEEN_EMAILS_MS = 6000; // 6 seconds between emails

        // Get count of all unclaimed, non-bounced invites that haven't received launch email
        const { count: totalUnclaimedCount } = await supabaseAdmin
          .from("early_access_invites")
          .select("*", { count: "exact", head: true })
          .neq("status", "claimed")
          .is("bounced_at", null)
          .is("launch_email_sent_at", null);

        // Get next batch
        const { data: unclaimedInvites, error: unclaimedError } = await supabaseAdmin
          .from("early_access_invites")
          .select("*")
          .neq("status", "claimed")
          .is("bounced_at", null)
          .is("launch_email_sent_at", null)
          .order("created_at", { ascending: true })
          .limit(BATCH_SIZE);

        if (unclaimedError) throw unclaimedError;

        if (!unclaimedInvites || unclaimedInvites.length === 0) {
          result = {
            sent: 0,
            remaining: 0,
            total_unclaimed: totalUnclaimedCount || 0,
            message: "All launch emails have been sent!",
            complete: true
          };
          break;
        }

        let sentCount = 0;
        const errors: string[] = [];
        const sentEmails: string[] = [];

        for (let i = 0; i < unclaimedInvites.length; i++) {
          const invite = unclaimedInvites[i];

          try {
            const emailHtml = generateLaunchEmailHTML(invite.email, invite.invite_token);

            const { data: emailData, error: emailError } = await resend.emails.send({
              from: "Elec-Mate <hello@elec-mate.com>",
              replyTo: "info@elec-mate.com",
              to: [invite.email],
              subject: "🎉 We've Launched! Elec-Mate is Live",
              html: emailHtml,
            });

            if (emailError) {
              errors.push(`${invite.email}: ${emailError.message}`);
              continue;
            }

            // Update with launch email tracking
            await supabaseAdmin
              .from("early_access_invites")
              .update({
                launch_email_sent_at: new Date().toISOString(),
                launch_email_id: emailData?.id || null,
              })
              .eq("id", invite.id);

            sentCount++;
            sentEmails.push(invite.email);

            // Rate limit: wait between emails (except after the last one)
            if (i < unclaimedInvites.length - 1) {
              await new Promise(resolve => setTimeout(resolve, DELAY_BETWEEN_EMAILS_MS));
            }
          } catch (err: any) {
            errors.push(`${invite.email}: ${err.message}`);
          }
        }

        // Calculate remaining
        const { count: remainingCount } = await supabaseAdmin
          .from("early_access_invites")
          .select("*", { count: "exact", head: true })
          .neq("status", "claimed")
          .is("bounced_at", null)
          .is("launch_email_sent_at", null);

        const remaining = remainingCount || 0;
        const complete = remaining === 0;

        console.log(`Launch campaign: Sent ${sentCount}/${unclaimedInvites.length} emails by admin ${user.id}. Remaining: ${remaining}`);

        result = {
          sent: sentCount,
          attempted: unclaimedInvites.length,
          remaining,
          total_unclaimed: totalUnclaimedCount || 0,
          sent_to: sentEmails,
          errors: errors.length > 0 ? errors : undefined,
          complete,
          estimated_time_remaining: complete ? null : `~${Math.ceil(remaining / BATCH_SIZE)} more calls needed`,
          message: complete
            ? `Launch campaign complete! Sent ${sentCount} emails.`
            : `Sent ${sentCount} emails. ${remaining} remaining - call again to continue.`
        };
        break;
      }

      case "launch_campaign_stats": {
        // Get stats specifically for the launch campaign
        const { data, error } = await supabaseAdmin
          .from("early_access_invites")
          .select("status, claimed_at, bounced_at, launch_email_sent_at, launch_email_opened_at, launch_email_clicked_at");

        if (error) throw error;

        const total = data?.length || 0;
        const claimed = data?.filter(i => i.claimed_at !== null).length || 0;
        const bounced = data?.filter(i => i.bounced_at !== null).length || 0;
        const eligibleForLaunch = data?.filter(i => !i.claimed_at && !i.bounced_at).length || 0;
        const launchEmailSent = data?.filter(i => i.launch_email_sent_at !== null).length || 0;
        const launchEmailOpened = data?.filter(i => i.launch_email_opened_at !== null).length || 0;
        const launchEmailClicked = data?.filter(i => i.launch_email_clicked_at !== null).length || 0;
        const pendingLaunchEmail = eligibleForLaunch - launchEmailSent;

        result = {
          stats: {
            total_invites: total,
            already_signed_up: claimed,
            bounced: bounced,
            eligible_for_launch: eligibleForLaunch,
            launch_emails_sent: launchEmailSent,
            launch_emails_pending: pendingLaunchEmail,
            launch_emails_opened: launchEmailOpened,
            launch_emails_clicked: launchEmailClicked,
            rates: {
              signup_rate_early_access: total > 0 ? `${((claimed / total) * 100).toFixed(1)}%` : "0%",
              launch_open_rate: launchEmailSent > 0 ? `${((launchEmailOpened / launchEmailSent) * 100).toFixed(1)}%` : "0%",
              launch_click_rate: launchEmailOpened > 0 ? `${((launchEmailClicked / launchEmailOpened) * 100).toFixed(1)}%` : "0%",
            }
          }
        };
        break;
      }

      case "retry_failed": {
        // Retry ONLY the failed sends - people who never actually received the email
        // Failed = attempted but no resend_email_id (email wasn't actually sent)
        const BATCH_SIZE = 50;

        // Get count of all failed sends
        const { count: totalFailedCount } = await supabaseAdmin
          .from("early_access_invites")
          .select("*", { count: "exact", head: true })
          .eq("status", "sent")
          .is("opened_at", null)
          .is("claimed_at", null)
          .not("last_send_attempt_at", "is", null)
          .or("resend_email_id.is.null,send_count.is.null,send_count.eq.0");

        // Get next batch of failed sends
        const { data: failedInvites, error: failedError } = await supabaseAdmin
          .from("early_access_invites")
          .select("*")
          .eq("status", "sent")
          .is("opened_at", null)
          .is("claimed_at", null)
          .not("last_send_attempt_at", "is", null)
          .or("resend_email_id.is.null,send_count.is.null,send_count.eq.0")
          .order("created_at", { ascending: true })
          .limit(BATCH_SIZE);

        if (failedError) throw failedError;

        if (!failedInvites || failedInvites.length === 0) {
          result = {
            sent: 0,
            remaining: 0,
            total_failed: totalFailedCount || 0,
            message: "No more failed sends to retry",
            complete: true
          };
          break;
        }

        let sentCount = 0;
        const errors: string[] = [];

        for (const invite of failedInvites) {
          try {
            // Mark attempt
            await supabaseAdmin
              .from("early_access_invites")
              .update({ last_send_attempt_at: new Date().toISOString() })
              .eq("id", invite.id);

            const emailHtml = generateInviteEmailHTML(invite.email, invite.invite_token);

            const { data: emailData, error: emailError } = await resend.emails.send({
              from: "Elec-Mate <hello@elec-mate.com>",
              replyTo: "info@elec-mate.com",
              to: [invite.email],
              subject: "Reminder: Your Early Access to Elec-Mate is Waiting!",
              html: emailHtml,
            });

            if (emailError) {
              errors.push(`${invite.email}: ${emailError.message}`);
              continue;
            }

            // Update with success
            await supabaseAdmin
              .from("early_access_invites")
              .update({
                sent_at: new Date().toISOString(),
                resend_email_id: emailData?.id || null,
                send_count: (invite.send_count || 0) + 1,
              })
              .eq("id", invite.id);

            sentCount++;
          } catch (err: any) {
            errors.push(`${invite.email}: ${err.message}`);
          }
        }

        // Calculate remaining
        const { count: remainingCount } = await supabaseAdmin
          .from("early_access_invites")
          .select("*", { count: "exact", head: true })
          .eq("status", "sent")
          .is("opened_at", null)
          .is("claimed_at", null)
          .not("last_send_attempt_at", "is", null)
          .or("resend_email_id.is.null,send_count.is.null,send_count.eq.0");

        const remaining = remainingCount || 0;
        const complete = remaining === 0;

        console.log(`Retried ${sentCount}/${failedInvites.length} failed sends by admin ${user.id}. Remaining: ${remaining}`);

        result = {
          sent: sentCount,
          attempted: failedInvites.length,
          remaining,
          total_failed: totalFailedCount || 0,
          errors: errors.length > 0 ? errors : undefined,
          complete,
          message: complete
            ? `All done! Sent ${sentCount} emails.`
            : `Sent ${sentCount} emails. ${remaining} remaining - call again to continue.`
        };
        break;
      }

      default:
        throw new Error(`Unknown action: ${action}`);
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error: any) {
    console.error("Error in send-early-access-invite:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
