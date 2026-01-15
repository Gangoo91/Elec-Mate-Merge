import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
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

// Generate founder invite email HTML
function generateInviteEmailHTML(email: string, inviteToken: string): string {
  const siteUrl = Deno.env.get("SITE_URL") || "https://elec-mate.com";
  const claimUrl = `${siteUrl}/founder/claim?token=${inviteToken}`;
  const logoUrl = "https://elec-mate.com/logo.jpg";

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Founder Subscription is Ready</title>
  <style>
    @media only screen and (max-width: 480px) {
      .main-container { padding: 16px !important; }
      .content-padding { padding: 24px 20px !important; }
      .cta-button { padding: 16px 24px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; background-color: #0a0a0a; -webkit-font-smoothing: antialiased;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #0a0a0a;">
    <tr>
      <td class="main-container" style="padding: 32px 16px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 480px; margin: 0 auto; background: linear-gradient(180deg, #1a1a1a 0%, #141414 100%); border-radius: 24px; overflow: hidden; border: 1px solid #2a2a2a;">

          <!-- Header with Logo -->
          <tr>
            <td class="content-padding" style="padding: 32px 24px 24px; text-align: center;">
              <img src="${logoUrl}" alt="Elec-Mate" width="80" height="80" style="display: block; margin: 0 auto 20px; border-radius: 16px; box-shadow: 0 8px 24px rgba(251, 191, 36, 0.15);" />
              <div style="display: inline-block; background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); color: #0a0a0a; padding: 6px 16px; border-radius: 20px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 16px;">
                Founder Access
              </div>
              <h1 style="margin: 0; font-size: 26px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px;">
                Your Subscription is Ready
              </h1>
              <p style="margin: 8px 0 0; font-size: 15px; color: #888888; line-height: 1.5;">
                Thank you for being an early supporter
              </p>
            </td>
          </tr>

          <!-- Message -->
          <tr>
            <td class="content-padding" style="padding: 0 24px 24px;">
              <div style="background: linear-gradient(135deg, #1e1e1e 0%, #1a1a1a 100%); border-radius: 16px; padding: 24px; border: 1px solid #333333;">
                <p style="margin: 0 0 16px; font-size: 15px; color: #a3a3a3; line-height: 1.6;">
                  As a founding member, you're getting exclusive access to Elec-Mate at our special founder rate:
                </p>

                <div style="background: linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(34, 197, 94, 0.05) 100%); border: 1px solid rgba(34, 197, 94, 0.2); border-radius: 12px; padding: 16px; margin-bottom: 20px; text-align: center;">
                  <p style="margin: 0 0 4px; font-size: 32px; font-weight: 700; color: #22c55e;">
                    £3.99<span style="font-size: 16px; color: #888888;">/month</span>
                  </p>
                  <p style="margin: 0; font-size: 13px; color: #666666;">
                    Locked in forever - regular price £9.99/month
                  </p>
                </div>

                <!-- CTA Button -->
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                  <tr>
                    <td>
                      <a href="${claimUrl}" class="cta-button" style="display: block; padding: 18px 32px; background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); color: #0a0a0a; text-decoration: none; font-size: 16px; font-weight: 700; border-radius: 12px; text-align: center; box-shadow: 0 4px 16px rgba(251, 191, 36, 0.3);">
                        Claim Your Subscription
                      </a>
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>

          <!-- What's Included -->
          <tr>
            <td class="content-padding" style="padding: 0 24px 24px;">
              <p style="margin: 0 0 16px; font-size: 12px; font-weight: 600; color: #666666; text-transform: uppercase; letter-spacing: 0.5px;">
                What's included
              </p>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="padding: 10px 16px; background-color: #1a1a1a; border-radius: 10px; margin-bottom: 6px;">
                    <span style="color: #22c55e; margin-right: 10px;">✓</span>
                    <span style="color: #ffffff; font-size: 14px;">All AI tools & calculators</span>
                  </td>
                </tr>
                <tr><td style="height: 6px;"></td></tr>
                <tr>
                  <td style="padding: 10px 16px; background-color: #1a1a1a; border-radius: 10px;">
                    <span style="color: #22c55e; margin-right: 10px;">✓</span>
                    <span style="color: #ffffff; font-size: 14px;">BS7671 AI Assistant</span>
                  </td>
                </tr>
                <tr><td style="height: 6px;"></td></tr>
                <tr>
                  <td style="padding: 10px 16px; background-color: #1a1a1a; border-radius: 10px;">
                    <span style="color: #22c55e; margin-right: 10px;">✓</span>
                    <span style="color: #ffffff; font-size: 14px;">Quote & invoice builder</span>
                  </td>
                </tr>
                <tr><td style="height: 6px;"></td></tr>
                <tr>
                  <td style="padding: 10px 16px; background-color: #1a1a1a; border-radius: 10px;">
                    <span style="color: #22c55e; margin-right: 10px;">✓</span>
                    <span style="color: #ffffff; font-size: 14px;">Priority support & updates</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Expiry Notice -->
          <tr>
            <td class="content-padding" style="padding: 0 24px 24px;">
              <div style="background: rgba(251, 191, 36, 0.1); border: 1px solid rgba(251, 191, 36, 0.2); border-radius: 10px; padding: 12px 16px;">
                <p style="margin: 0; font-size: 13px; color: #fbbf24; text-align: center;">
                  ⏰ This invite expires in 30 days
                </p>
              </div>
            </td>
          </tr>

          <!-- Help Section -->
          <tr>
            <td class="content-padding" style="padding: 24px; background-color: #111111; border-top: 1px solid #222222;">
              <p style="margin: 0 0 4px; font-size: 13px; color: #666666;">
                Questions? Reply to this email or contact
              </p>
              <a href="mailto:founder@elec-mate.com" style="font-size: 14px; color: #fbbf24; text-decoration: none; font-weight: 500;">
                founder@elec-mate.com
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 24px; text-align: center; background-color: #0a0a0a;">
              <p style="margin: 0; font-size: 12px; color: #525252;">
                © ${new Date().getFullYear()} Elec-Mate · Made in the UK
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

    const { action, emails, inviteId } = await req.json();

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

        const { error: emailError } = await resend.emails.send({
          from: "Elec-Mate <founder@elec-mate.com>",
          to: [invite.email],
          subject: "Your Elec-Mate Founder Subscription is Ready - £3.99/month",
          html: emailHtml,
        });

        if (emailError) {
          console.error("Email send error:", emailError);
          throw new Error("Failed to send email");
        }

        // Update invite status
        await supabaseAdmin
          .from("founder_invites")
          .update({ status: "sent", sent_at: new Date().toISOString() })
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

            const { error: emailError } = await resend.emails.send({
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
              .update({ status: "sent", sent_at: new Date().toISOString() })
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
        const { token } = await req.json();
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

        const { error: emailError } = await resend.emails.send({
          from: "Elec-Mate <founder@elec-mate.com>",
          to: [invite.email],
          subject: "Reminder: Your Elec-Mate Founder Subscription is Waiting - £3.99/month",
          html: emailHtml,
        });

        if (emailError) {
          throw new Error("Failed to resend email");
        }

        // Update sent_at
        await supabaseAdmin
          .from("founder_invites")
          .update({ sent_at: new Date().toISOString() })
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
