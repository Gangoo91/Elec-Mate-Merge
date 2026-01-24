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

// Generate early access invite email HTML
function generateInviteEmailHTML(email: string, inviteToken: string): string {
  const siteUrl = Deno.env.get("SITE_URL") || "https://elec-mate.com";
  const signupUrl = `${siteUrl}/auth/signup?ref=early-access&token=${inviteToken}`;

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

    const { action, emails, inviteId, token } = await req.json();

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
          .select("status");
        if (error) throw error;

        const stats = {
          total: data?.length || 0,
          pending: data?.filter(i => i.status === "pending").length || 0,
          sent: data?.filter(i => i.status === "sent").length || 0,
          claimed: data?.filter(i => i.status === "claimed").length || 0,
          expired: data?.filter(i => i.status === "expired").length || 0,
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

        const { error: emailError } = await resend.emails.send({
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

        // Update invite status
        await supabaseAdmin
          .from("early_access_invites")
          .update({ status: "sent", sent_at: new Date().toISOString() })
          .eq("id", inviteId);

        console.log(`Early access invite sent to ${invite.email} by admin ${user.id}`);
        result = { success: true, email: invite.email };
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

            const { error: emailError } = await resend.emails.send({
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
              .update({ status: "sent", sent_at: new Date().toISOString() })
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

        const { error: emailError } = await resend.emails.send({
          from: "Elec-Mate <hello@elec-mate.com>",
          replyTo: "info@elec-mate.com",
          to: [invite.email],
          subject: "Reminder: Your Early Access to Elec-Mate is Waiting!",
          html: emailHtml,
        });

        if (emailError) {
          throw new Error("Failed to resend email");
        }

        // Update sent_at
        await supabaseAdmin
          .from("early_access_invites")
          .update({ sent_at: new Date().toISOString() })
          .eq("id", inviteId);

        console.log(`Early access invite resent to ${invite.email} by admin ${user.id}`);
        result = { success: true, email: invite.email };
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
