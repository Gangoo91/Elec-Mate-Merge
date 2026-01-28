import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-request-id",
};

// Generate unique invite token
function generateToken(): string {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let token = "FND-";
  for (let i = 0; i < 16; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
}

// Generate custom campaign email HTML with custom message
function generateCustomCampaignHTML(email: string, inviteToken: string, customMessage: string): string {
  const siteUrl = Deno.env.get("SITE_URL") || "https://elec-mate.com";
  const claimUrl = `${siteUrl}/founder/signup?token=${inviteToken}`;

  // Convert line breaks to HTML paragraphs
  const messageHtml = customMessage
    .split('\n')
    .filter(line => line.trim())
    .map(line => `<p style="margin: 0 0 16px; font-size: 16px; color: #e2e8f0; line-height: 1.7;">${line}</p>`)
    .join('');

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="dark">
  <meta name="supported-color-schemes" content="dark">
  <title>Last Chance - Founder Offer</title>
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
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 420px; margin: 0 auto; background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%); border-radius: 24px; overflow: hidden; border: 1px solid rgba(239, 68, 68, 0.3);">

          <!-- Header with Urgent Badge -->
          <tr>
            <td style="padding: 40px 24px 24px; text-align: center;">
              <div style="font-size: 56px; line-height: 1; margin-bottom: 16px;">⚡</div>
              <div style="display: inline-block; background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); color: white; padding: 8px 20px; border-radius: 24px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 20px;">
                Last Chance
              </div>
              <h1 style="margin: 0; font-size: 26px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px; line-height: 1.3;">
                We Launch Tonight!
              </h1>
            </td>
          </tr>

          <!-- Custom Message -->
          <tr>
            <td style="padding: 0 24px 24px;">
              ${messageHtml}
            </td>
          </tr>

          <!-- Price Reminder Card -->
          <tr>
            <td style="padding: 0 20px 24px;">
              <div style="background: linear-gradient(135deg, rgba(251, 191, 36, 0.15) 0%, rgba(251, 191, 36, 0.05) 100%); border: 1px solid rgba(251, 191, 36, 0.3); border-radius: 20px; padding: 24px; text-align: center;">
                <p style="margin: 0; font-size: 14px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">
                  Your Founder Price
                </p>
                <p style="margin: 8px 0 4px; font-size: 44px; font-weight: 800; color: #fbbf24; line-height: 1;">
                  £3.99<span style="font-size: 16px; color: #94a3b8;">/mo</span>
                </p>
                <p style="margin: 8px 0 0; font-size: 14px; color: #cbd5e1;">
                  <span style="text-decoration: line-through; color: #64748b;">£9.99</span>
                  <span style="color: #22c55e; font-weight: 600; margin-left: 8px;">Forever locked</span>
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
                    <a href="${claimUrl}" style="display: block; padding: 18px 32px; background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); color: white; text-decoration: none; font-size: 18px; font-weight: 700; border-radius: 14px; text-align: center; box-shadow: 0 8px 24px rgba(239, 68, 68, 0.35);">
                      🔒 Claim Before It's Gone
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Urgency Notice -->
          <tr>
            <td style="padding: 0 20px 28px;">
              <div style="background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.25); border-radius: 12px; padding: 14px 20px; text-align: center;">
                <p style="margin: 0; font-size: 14px; color: #ef4444; font-weight: 600;">
                  ⏰ Offer closes at 18:30 tonight — this is your last chance!
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 24px; text-align: center; background-color: #0f172a; border-top: 1px solid rgba(148, 163, 184, 0.1);">
              <p style="margin: 0 0 8px; font-size: 14px; color: #cbd5e1;">
                Questions? Just reply to this email
              </p>
              <a href="mailto:founder@elec-mate.com" style="font-size: 15px; color: #fbbf24; text-decoration: none; font-weight: 600;">
                founder@elec-mate.com
              </a>
              <p style="margin: 16px 0 0; font-size: 13px; color: #64748b;">
                © ${new Date().getFullYear()} Elec-Mate · Made in the UK 🇬🇧
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

// Generate founder invite email HTML
function generateInviteEmailHTML(email: string, inviteToken: string): string {
  const siteUrl = Deno.env.get("SITE_URL") || "https://elec-mate.com";
  // Direct to signup page instead of claim page
  const claimUrl = `${siteUrl}/founder/signup?token=${inviteToken}`;
  const logoUrl = "https://elec-mate.com/logo.jpg";

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="dark">
  <meta name="supported-color-schemes" content="dark">
  <title>Your Founder Subscription is Ready</title>
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
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 420px; margin: 0 auto; background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%); border-radius: 24px; overflow: hidden; border: 1px solid rgba(251, 191, 36, 0.2);">

          <!-- Header with Crown Emoji -->
          <tr>
            <td style="padding: 40px 24px 24px; text-align: center;">
              <div style="font-size: 56px; line-height: 1; margin-bottom: 16px;">👑</div>
              <div style="display: inline-block; background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); color: #0f172a; padding: 8px 20px; border-radius: 24px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 20px;">
                Founder Access
              </div>
              <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px; line-height: 1.2;">
                Your Subscription<br/>is Ready
              </h1>
              <p style="margin: 12px 0 0; font-size: 16px; color: #e2e8f0; line-height: 1.5;">
                Thank you for being an early supporter
              </p>
            </td>
          </tr>

          <!-- Price Card -->
          <tr>
            <td style="padding: 0 20px 24px;">
              <div style="background: linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(34, 197, 94, 0.05) 100%); border: 1px solid rgba(34, 197, 94, 0.3); border-radius: 20px; padding: 28px 24px; text-align: center;">
                <p style="margin: 0; font-size: 14px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">
                  Founder Price
                </p>
                <p style="margin: 8px 0 4px; font-size: 48px; font-weight: 800; color: #22c55e; line-height: 1;">
                  £3.99
                </p>
                <p style="margin: 0 0 16px; font-size: 16px; color: #94a3b8;">
                  per month, forever
                </p>
                <p style="margin: 0; font-size: 14px; color: #cbd5e1; background: rgba(0,0,0,0.2); padding: 8px 16px; border-radius: 8px; display: inline-block;">
                  <span style="text-decoration: line-through; color: #64748b;">£9.99</span>
                  <span style="color: #22c55e; font-weight: 600; margin-left: 8px;">60% OFF</span>
                </p>
              </div>
            </td>
          </tr>

          <!-- Message -->
          <tr>
            <td style="padding: 0 24px 24px;">
              <p style="margin: 0; font-size: 16px; color: #e2e8f0; line-height: 1.7; text-align: center;">
                As a founding member, you're getting exclusive lifetime access to all Elec-Mate features at our special founder rate.
              </p>
            </td>
          </tr>

          <!-- CTA Button -->
          <tr>
            <td style="padding: 0 20px 32px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td>
                    <a href="${claimUrl}" style="display: block; padding: 18px 32px; background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); color: #0f172a; text-decoration: none; font-size: 18px; font-weight: 700; border-radius: 14px; text-align: center; box-shadow: 0 8px 24px rgba(251, 191, 36, 0.35);">
                      🚀 Claim Your Subscription
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
                  <td style="padding: 12px 16px; background-color: rgba(30, 41, 59, 0.8); border-radius: 12px;">
                    <span style="color: #22c55e; font-size: 16px; margin-right: 12px;">✓</span>
                    <span style="color: #ffffff; font-size: 15px;">All AI tools & calculators</span>
                  </td>
                </tr>
                <tr><td style="height: 8px;"></td></tr>
                <tr>
                  <td style="padding: 12px 16px; background-color: rgba(30, 41, 59, 0.8); border-radius: 12px;">
                    <span style="color: #22c55e; font-size: 16px; margin-right: 12px;">✓</span>
                    <span style="color: #ffffff; font-size: 15px;">BS7671 AI Assistant</span>
                  </td>
                </tr>
                <tr><td style="height: 8px;"></td></tr>
                <tr>
                  <td style="padding: 12px 16px; background-color: rgba(30, 41, 59, 0.8); border-radius: 12px;">
                    <span style="color: #22c55e; font-size: 16px; margin-right: 12px;">✓</span>
                    <span style="color: #ffffff; font-size: 15px;">Quote & invoice builder</span>
                  </td>
                </tr>
                <tr><td style="height: 8px;"></td></tr>
                <tr>
                  <td style="padding: 12px 16px; background-color: rgba(30, 41, 59, 0.8); border-radius: 12px;">
                    <span style="color: #22c55e; font-size: 16px; margin-right: 12px;">✓</span>
                    <span style="color: #ffffff; font-size: 15px;">EICR & certificate generation</span>
                  </td>
                </tr>
                <tr><td style="height: 8px;"></td></tr>
                <tr>
                  <td style="padding: 12px 16px; background-color: rgba(30, 41, 59, 0.8); border-radius: 12px;">
                    <span style="color: #22c55e; font-size: 16px; margin-right: 12px;">✓</span>
                    <span style="color: #ffffff; font-size: 15px;">Priority support & all future updates</span>
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
                  ⏰ This invite expires in 30 days
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
              <a href="mailto:founder@elec-mate.com" style="font-size: 15px; color: #fbbf24; text-decoration: none; font-weight: 600;">
                founder@elec-mate.com
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
</body>
</html>
  `;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
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

    const { action, emails, inviteId, cohort, token, subject, message } = await req.json();

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
          .from("founder_invites")
          .select("*")
          .order("created_at", { ascending: false });
        if (error) throw error;
        result = { invites: data };
        break;
      }

      case "stats": {
        const { data, error } = await supabaseAdmin
          .from("founder_invites")
          .select("status, sent_at, delivered_at, opened_at, clicked_at, bounced_at");
        if (error) throw error;

        const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
        const sentInvites = data?.filter(i => i.status === "sent") || [];

        const stats = {
          total: data?.length || 0,
          pending: data?.filter(i => i.status === "pending").length || 0,
          sent: sentInvites.length,
          claimed: data?.filter(i => i.status === "claimed").length || 0,
          expired: data?.filter(i => i.status === "expired").length || 0,
          // Needs reminder: sent but sent_at is null or older than 30 mins
          needsReminder: sentInvites.filter(i => !i.sent_at || new Date(i.sent_at) < thirtyMinutesAgo).length,
          // Recently resent: sent_at within last 30 mins
          recentlyResent: sentInvites.filter(i => i.sent_at && new Date(i.sent_at) >= thirtyMinutesAgo).length,
          // Email tracking stats
          delivered: data?.filter(i => i.delivered_at).length || 0,
          opened: data?.filter(i => i.opened_at).length || 0,
          clicked: data?.filter(i => i.clicked_at).length || 0,
          bounced: data?.filter(i => i.bounced_at).length || 0,
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
          .from("founder_invites")
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
          .from("founder_invites")
          .insert(invites)
          .select();

        if (error) throw error;

        console.log(`${data?.length} founder invites created by admin ${user.id}`);
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
          .from("founder_invites")
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
          from: "Elec-Mate <founder@elec-mate.com>",
          to: [invite.email],
          subject: "Your Elec-Mate Founder Subscription is Ready - £3.99/month",
          html: emailHtml,
        });

        if (emailError) {
          console.error("Email send error:", emailError);
          throw new Error("Failed to send email");
        }

        // Update invite status with resend_email_id for webhook tracking
        await supabaseAdmin
          .from("founder_invites")
          .update({
            status: "sent",
            sent_at: new Date().toISOString(),
            resend_email_id: emailData?.id,
            last_send_attempt_at: new Date().toISOString(),
            send_count: (invite.send_count || 0) + 1,
          })
          .eq("id", inviteId);

        console.log(`Founder invite sent to ${invite.email} by admin ${user.id}`);
        result = { success: true, email: invite.email };
        break;
      }

      case "send_all_pending": {
        // Get all pending invites
        const { data: pendingInvites, error: pendingError } = await supabaseAdmin
          .from("founder_invites")
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
              from: "Elec-Mate <founder@elec-mate.com>",
              to: [invite.email],
              subject: "Your Elec-Mate Founder Subscription is Ready - £3.99/month",
              html: emailHtml,
            });

            if (emailError) {
              errors.push(`${invite.email}: ${emailError.message}`);
              continue;
            }

            await supabaseAdmin
              .from("founder_invites")
              .update({
                status: "sent",
                sent_at: new Date().toISOString(),
                resend_email_id: emailData?.id,
                last_send_attempt_at: new Date().toISOString(),
                send_count: (invite.send_count || 0) + 1,
              })
              .eq("id", invite.id);

            sentCount++;
          } catch (err: any) {
            errors.push(`${invite.email}: ${err.message}`);
          }
        }

        console.log(`Sent ${sentCount} founder invites by admin ${user.id}`);
        result = { sent: sentCount, errors: errors.length > 0 ? errors : undefined };
        break;
      }

      case "validate_token": {
        if (!token) {
          throw new Error("Token is required");
        }

        const { data: invite, error: inviteError } = await supabaseAdmin
          .from("founder_invites")
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

      case "resend": {
        if (!inviteId) {
          throw new Error("Invite ID is required");
        }

        // Get the invite
        const { data: invite, error: inviteError } = await supabaseAdmin
          .from("founder_invites")
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
          from: "Elec-Mate <founder@elec-mate.com>",
          to: [invite.email],
          subject: "Reminder: Your Elec-Mate Founder Subscription is Waiting - £3.99/month",
          html: emailHtml,
        });

        if (emailError) {
          throw new Error("Failed to resend email");
        }

        // Update sent_at with resend_email_id for webhook tracking
        await supabaseAdmin
          .from("founder_invites")
          .update({
            sent_at: new Date().toISOString(),
            resend_email_id: emailData?.id,
            last_send_attempt_at: new Date().toISOString(),
            send_count: (invite.send_count || 0) + 1,
          })
          .eq("id", inviteId);

        console.log(`Founder invite resent to ${invite.email} by admin ${user.id}`);
        result = { success: true, email: invite.email };
        break;
      }

      case "delete": {
        if (!inviteId) {
          throw new Error("Invite ID is required");
        }

        const { error } = await supabaseAdmin
          .from("founder_invites")
          .delete()
          .eq("id", inviteId);

        if (error) throw error;
        result = { success: true };
        break;
      }

      case "send_to_cohort": {
        if (!cohort || !["trial", "churned"].includes(cohort)) {
          throw new Error("Invalid cohort. Must be 'trial' or 'churned'");
        }

        const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

        // Get all users with their auth emails via admin API
        const { data: { users: authUsers }, error: authError } = await supabaseAdmin.auth.admin.listUsers();
        if (authError) throw authError;

        // Create email lookup map
        const emailMap = new Map(authUsers.map(u => [u.id, u.email]));

        // Get profiles based on cohort (trial vs churned)
        // Trial users: signed up within last 7 days, not subscribed, no free access
        // Churned users: signed up more than 7 days ago, not subscribed, no free access
        let query = supabaseAdmin
          .from("profiles")
          .select("id, created_at")
          .or("subscribed.is.null,subscribed.eq.false")
          .or("free_access_granted.is.null,free_access_granted.eq.false");

        if (cohort === "trial") {
          query = query.gte("created_at", weekAgo.toISOString());
        } else if (cohort === "churned") {
          query = query.lt("created_at", weekAgo.toISOString());
        }

        const { data: profiles, error: profilesError } = await query;
        if (profilesError) throw profilesError;

        // Map profile IDs to emails
        const userEmails = (profiles || [])
          .map(p => emailMap.get(p.id))
          .filter((email): email is string => !!email);

        // Get existing invites to skip duplicates
        const { data: existingInvites } = await supabaseAdmin
          .from("founder_invites")
          .select("email");
        const existingEmails = new Set((existingInvites || []).map(i => i.email.toLowerCase()));

        // Filter to users without existing invites
        const newEmails = userEmails.filter(email =>
          !existingEmails.has(email.toLowerCase())
        );

        if (newEmails.length === 0) {
          result = { sent: 0, skipped: userEmails.length, total: userEmails.length, message: "All users already have invites" };
          break;
        }

        // Create invites for new emails
        const invites = newEmails.map(email => ({
          email: email.toLowerCase(),
          invite_token: generateToken(),
          status: "pending",
        }));

        const { error: insertError } = await supabaseAdmin.from("founder_invites").insert(invites);
        if (insertError) throw insertError;

        // Send emails to all new invites
        let sentCount = 0;
        const errors: string[] = [];

        // Choose subject line based on cohort
        const subjectLine = cohort === "trial"
          ? "🎁 Special Founder Offer - Lock in £3.99/month for Life!"
          : "We miss you! Exclusive Founder Rate - £3.99/month Forever";

        for (const email of newEmails) {
          try {
            const { data: invite, error: inviteError } = await supabaseAdmin
              .from("founder_invites")
              .select("*")
              .eq("email", email.toLowerCase())
              .single();

            if (inviteError || !invite) {
              errors.push(`${email}: Could not find invite`);
              continue;
            }

            const emailHtml = generateInviteEmailHTML(email, invite.invite_token);

            const { data: emailData, error: emailError } = await resend.emails.send({
              from: "Elec-Mate <founder@elec-mate.com>",
              to: [email],
              subject: subjectLine,
              html: emailHtml,
            });

            if (emailError) {
              errors.push(`${email}: ${emailError.message}`);
              continue;
            }

            await supabaseAdmin
              .from("founder_invites")
              .update({
                status: "sent",
                sent_at: new Date().toISOString(),
                resend_email_id: emailData?.id,
                last_send_attempt_at: new Date().toISOString(),
                send_count: (invite.send_count || 0) + 1,
              })
              .eq("id", invite.id);

            sentCount++;
          } catch (err: any) {
            errors.push(`${email}: ${err.message}`);
          }
        }

        console.log(`Sent ${sentCount} founder invites to ${cohort} cohort by admin ${user.id}`);
        result = {
          sent: sentCount,
          skipped: userEmails.length - newEmails.length,
          total: userEmails.length,
          errors: errors.length > 0 ? errors : undefined,
        };
        break;
      }

      case "resend_all_unclaimed": {
        // Get all sent invites that haven't been claimed
        // Skip any sent in the last 30 minutes (already processed in a recent batch)
        const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000).toISOString();

        const { data: unclaimedInvites, error: unclaimedError } = await supabaseAdmin
          .from("founder_invites")
          .select("*")
          .eq("status", "sent")
          .is("bounced_at", null)  // Skip bounced emails
          .or(`sent_at.is.null,sent_at.lt.${thirtyMinutesAgo}`)
          .order("sent_at", { ascending: true, nullsFirst: true });

        if (unclaimedError) throw unclaimedError;

        if (!unclaimedInvites || unclaimedInvites.length === 0) {
          result = { sent: 0, remaining: 0, message: "All unclaimed invites have been sent recently" };
          break;
        }

        let sentCount = 0;
        const errors: string[] = [];
        const sentEmails: string[] = [];

        for (const invite of unclaimedInvites) {
          try {
            const emailHtml = generateInviteEmailHTML(invite.email, invite.invite_token);

            const { data: emailData, error: emailError } = await resend.emails.send({
              from: "Elec-Mate <founder@elec-mate.com>",
              to: [invite.email],
              subject: "⏰ Reminder: Your £3.99/month Founder Rate is Still Waiting!",
              html: emailHtml,
            });

            if (emailError) {
              errors.push(`${invite.email}: ${emailError.message}`);
              continue;
            }

            // Update sent_at timestamp with resend_email_id for webhook tracking
            await supabaseAdmin
              .from("founder_invites")
              .update({
                sent_at: new Date().toISOString(),
                resend_email_id: emailData?.id,
                last_send_attempt_at: new Date().toISOString(),
                send_count: (invite.send_count || 0) + 1,
              })
              .eq("id", invite.id);

            sentCount++;
            sentEmails.push(invite.email);

            // Pace emails to stay within Resend rate limits
            await new Promise(resolve => setTimeout(resolve, 500));
            if (sentCount > 0 && sentCount % 8 === 0) {
              await new Promise(resolve => setTimeout(resolve, 2000));
            }
          } catch (err: any) {
            errors.push(`${invite.email}: ${err.message}`);
          }
        }

        // Calculate remaining (not yet sent in this or recent batches)
        const remaining = unclaimedInvites.length - sentCount - errors.length;

        console.log(`Resent ${sentCount} founder invites to unclaimed users by admin ${user.id}`);
        result = {
          sent: sentCount,
          failed: errors.length,
          remaining: remaining > 0 ? remaining : 0,
          total: unclaimedInvites.length,
          sentEmails,
          errors: errors.length > 0 ? errors : undefined,
        };
        break;
      }

      case "test_custom_campaign": {
        // Send a TEST email to a specific address (for previewing before bulk send)
        const testEmail = emails?.[0] || "founder@elec-mate.com";

        if (!subject || !message) {
          throw new Error("Subject and message are required for test campaigns");
        }

        // Find or create a test invite for this email
        let { data: testInvite } = await supabaseAdmin
          .from("founder_invites")
          .select("*")
          .eq("email", testEmail)
          .single();

        if (!testInvite) {
          // Create a temporary test invite
          const { data: newInvite, error: createError } = await supabaseAdmin
            .from("founder_invites")
            .insert({
              email: testEmail,
              invite_token: generateToken(),
              status: "sent",
            })
            .select()
            .single();

          if (createError) throw createError;
          testInvite = newInvite;
        }

        const testEmailHtml = generateCustomCampaignHTML(testEmail, testInvite.invite_token, message);

        const { data: emailData, error: emailError } = await resend.emails.send({
          from: "Elec-Mate <founder@elec-mate.com>",
          to: [testEmail],
          subject: `[TEST] ${subject}`,
          html: testEmailHtml,
        });

        if (emailError) {
          throw new Error(`Failed to send test email: ${emailError.message}`);
        }

        // Update tracking
        await supabaseAdmin
          .from("founder_invites")
          .update({
            sent_at: new Date().toISOString(),
            resend_email_id: emailData?.id,
            last_send_attempt_at: new Date().toISOString(),
            send_count: (testInvite.send_count || 0) + 1,
          })
          .eq("id", testInvite.id);

        console.log(`Test campaign email sent to ${testEmail} by admin ${user.id}`);
        result = {
          success: true,
          email: testEmail,
          inviteToken: testInvite.invite_token,
          message: `Test email sent to ${testEmail}`,
        };
        break;
      }

      case "send_custom_campaign": {
        // Send a custom email campaign to all unclaimed invites
        // Uses last_campaign_sent_at to track who already got the campaign
        if (!subject || !message) {
          throw new Error("Subject and message are required for custom campaigns");
        }

        // Get all sent invites that haven't been claimed AND haven't received this campaign yet
        // We use last_campaign_sent_at to track campaign sends separately from regular sends
        // Exclude bounced emails to avoid wasting sends and hurting sender reputation
        const { data: unclaimedInvites, error: unclaimedError } = await supabaseAdmin
          .from("founder_invites")
          .select("*")
          .eq("status", "sent")
          .is("last_campaign_sent_at", null)  // Only people who haven't received a campaign yet
          .is("bounced_at", null)             // Skip bounced emails
          .order("created_at", { ascending: true });

        if (unclaimedError) throw unclaimedError;

        if (!unclaimedInvites || unclaimedInvites.length === 0) {
          result = { sent: 0, total: 0, failed: 0, message: "All unclaimed invites have already received the campaign" };
          break;
        }

        let sentCount = 0;
        const errors: string[] = [];
        const sentEmails: string[] = [];

        // Process in batches with small delay to avoid rate limits
        for (let i = 0; i < unclaimedInvites.length; i++) {
          const invite = unclaimedInvites[i];

          try {
            const emailHtml = generateCustomCampaignHTML(invite.email, invite.invite_token, message);

            const { data: emailData, error: emailError } = await resend.emails.send({
              from: "Elec-Mate <founder@elec-mate.com>",
              to: [invite.email],
              subject: subject,
              html: emailHtml,
            });

            if (emailError) {
              errors.push(`${invite.email}: ${emailError.message}`);
              continue;
            }

            // Update with resend_email_id AND mark campaign as sent
            await supabaseAdmin
              .from("founder_invites")
              .update({
                sent_at: new Date().toISOString(),
                resend_email_id: emailData?.id,
                last_send_attempt_at: new Date().toISOString(),
                last_campaign_sent_at: new Date().toISOString(),  // Track campaign separately
                send_count: (invite.send_count || 0) + 1,
              })
              .eq("id", invite.id);

            sentCount++;
            sentEmails.push(invite.email);

            // Pace emails to stay well within Resend rate limits (10/second)
            // 500ms between each email + extra 2s pause every 8 emails
            await new Promise(resolve => setTimeout(resolve, 500));
            if (i > 0 && i % 8 === 0) {
              await new Promise(resolve => setTimeout(resolve, 2000));
            }
          } catch (err: any) {
            errors.push(`${invite.email}: ${err.message}`);
          }
        }

        console.log(`Custom campaign sent to ${sentCount} unclaimed invites by admin ${user.id}`);
        result = {
          sent: sentCount,
          failed: errors.length,
          total: unclaimedInvites.length,
          sentEmails,
          errors: errors.length > 0 ? errors : undefined,
        };
        break;
      }

      case "get_cohort_stats": {
        const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

        // Get trial count (within 7 days, not subscribed, no free access)
        const { count: trialCount, error: trialError } = await supabaseAdmin
          .from("profiles")
          .select("id", { count: "exact", head: true })
          .gte("created_at", weekAgo.toISOString())
          .or("subscribed.is.null,subscribed.eq.false")
          .or("free_access_granted.is.null,free_access_granted.eq.false");

        if (trialError) throw trialError;

        // Get churned count (more than 7 days, not subscribed, no free access)
        const { count: churnedCount, error: churnedError } = await supabaseAdmin
          .from("profiles")
          .select("id", { count: "exact", head: true })
          .lt("created_at", weekAgo.toISOString())
          .or("subscribed.is.null,subscribed.eq.false")
          .or("free_access_granted.is.null,free_access_granted.eq.false");

        if (churnedError) throw churnedError;

        result = {
          trial: trialCount || 0,
          churned: churnedCount || 0,
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
    console.error("Error in send-founder-invite:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
