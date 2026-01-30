import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-request-id",
};

// Generate the final push email HTML
function generateFinalPushEmailHTML(inviteToken: string): string {
  const siteUrl = Deno.env.get("SITE_URL") || "https://elec-mate.com";
  const claimUrl = `${siteUrl}/founder/signup?token=${inviteToken}`;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="dark">
  <meta name="supported-color-schemes" content="dark">
  <title>Your Founder Spot is Waiting</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0f172a; -webkit-font-smoothing: antialiased;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #0f172a;">
    <tr>
      <td style="padding: 24px 12px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 500px; margin: 0 auto; background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%); border-radius: 24px; overflow: hidden; border: 1px solid rgba(251, 191, 36, 0.2);">

          <!-- Header -->
          <tr>
            <td style="padding: 40px 24px 24px; text-align: center;">
              <div style="font-size: 48px; line-height: 1; margin-bottom: 16px;">⚡</div>
              <h1 style="margin: 0; font-size: 24px; font-weight: 700; color: #ffffff; line-height: 1.3;">
                You're missing out on<br/>£3.99/month forever
              </h1>
            </td>
          </tr>

          <!-- Message -->
          <tr>
            <td style="padding: 0 24px 24px;">
              <p style="margin: 0 0 16px; font-size: 16px; color: #e2e8f0; line-height: 1.7;">
                Hey,
              </p>
              <p style="margin: 0 0 16px; font-size: 16px; color: #e2e8f0; line-height: 1.7;">
                Quick one - you signed up for the Elec-Mate founder offer but never activated it.
              </p>
              <p style="margin: 0 0 24px; font-size: 16px; color: #ffffff; line-height: 1.7; font-weight: 600;">
                300+ people are already using the app and you're missing out.
              </p>
            </td>
          </tr>

          <!-- What You Get -->
          <tr>
            <td style="padding: 0 20px 24px;">
              <p style="margin: 0 0 16px; font-size: 14px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">
                As a founder at £3.99/month, you get everything others pay £9.99/month for:
              </p>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="padding: 12px 16px; background-color: rgba(30, 41, 59, 0.8); border-radius: 12px;">
                    <span style="color: #fbbf24; font-size: 16px; margin-right: 12px;">⚡</span>
                    <span style="color: #ffffff; font-size: 15px;"><strong>Full platform access</strong> - Inspection & testing, quotes/invoices, everything</span>
                  </td>
                </tr>
                <tr><td style="height: 8px;"></td></tr>
                <tr>
                  <td style="padding: 12px 16px; background-color: rgba(30, 41, 59, 0.8); border-radius: 12px;">
                    <span style="color: #fbbf24; font-size: 16px; margin-right: 12px;">⚡</span>
                    <span style="color: #ffffff; font-size: 15px;"><strong>AI-powered features</strong> - Circuit designer, cost engineer, health & safety</span>
                  </td>
                </tr>
                <tr><td style="height: 8px;"></td></tr>
                <tr>
                  <td style="padding: 12px 16px; background-color: rgba(30, 41, 59, 0.8); border-radius: 12px;">
                    <span style="color: #fbbf24; font-size: 16px; margin-right: 12px;">⚡</span>
                    <span style="color: #ffffff; font-size: 15px;"><strong>Elec-ID verification</strong> - Stand out to employers and clients</span>
                  </td>
                </tr>
                <tr><td style="height: 8px;"></td></tr>
                <tr>
                  <td style="padding: 12px 16px; background-color: rgba(30, 41, 59, 0.8); border-radius: 12px;">
                    <span style="color: #fbbf24; font-size: 16px; margin-right: 12px;">⚡</span>
                    <span style="color: #ffffff; font-size: 15px;"><strong>Study centre</strong> - Level 2, 3 & electrical upskilling courses</span>
                  </td>
                </tr>
                <tr><td style="height: 8px;"></td></tr>
                <tr>
                  <td style="padding: 12px 16px; background-color: rgba(30, 41, 59, 0.8); border-radius: 12px;">
                    <span style="color: #fbbf24; font-size: 16px; margin-right: 12px;">⚡</span>
                    <span style="color: #ffffff; font-size: 15px;"><strong>Employer Hub access</strong> - Worth £39.99/month on its own</span>
                  </td>
                </tr>
                <tr><td style="height: 8px;"></td></tr>
                <tr>
                  <td style="padding: 12px 16px; background-color: rgba(30, 41, 59, 0.8); border-radius: 12px;">
                    <span style="color: #fbbf24; font-size: 16px; margin-right: 12px;">⚡</span>
                    <span style="color: #ffffff; font-size: 15px;"><strong>Price locked forever</strong> - You'll never pay more than £3.99/month</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA Button -->
          <tr>
            <td style="padding: 0 20px 16px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td>
                    <a href="${claimUrl}" style="display: block; padding: 18px 32px; background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); color: #0f172a; text-decoration: none; font-size: 18px; font-weight: 700; border-radius: 14px; text-align: center; box-shadow: 0 8px 24px rgba(251, 191, 36, 0.35);">
                      Claim Your Founder Spot
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Note about red page -->
          <tr>
            <td style="padding: 0 24px 24px;">
              <p style="margin: 0; font-size: 13px; color: #94a3b8; text-align: center; line-height: 1.5;">
                💡 If you see a red error page, just hit refresh and it'll take you through.
              </p>
            </td>
          </tr>

          <!-- Closing -->
          <tr>
            <td style="padding: 0 24px 32px;">
              <p style="margin: 0 0 16px; font-size: 16px; color: #e2e8f0; line-height: 1.7;">
                This is genuinely the cheapest it'll ever be.
              </p>
              <p style="margin: 0; font-size: 16px; color: #e2e8f0; line-height: 1.7;">
                Cheers,<br/>
                <strong style="color: #fbbf24;">Andrew</strong><br/>
                Elec-Mate
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 24px; text-align: center; background-color: #0f172a; border-top: 1px solid rgba(148, 163, 184, 0.1);">
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

// Delay helper
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { action, batchSize = 5, testEmail } = await req.json();

    // Allow test emails to founder@elec-mate.com without auth (it's a known test address)
    const isTestMode = action === "send_test" && testEmail === "founder@elec-mate.com";

    let adminUserId = "test-mode";

    if (!isTestMode) {
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
      const { data: userData, error: userError } = await supabaseClient.auth.getUser();
      if (userError || !userData?.user) {
        throw new Error("Unauthorized: Could not get user");
      }

      adminUserId = userData.user.id;

      const { data: callerProfile, error: profileError } = await supabaseClient
        .from("profiles")
        .select("admin_role, full_name")
        .eq("id", adminUserId)
        .single();

      if (profileError || !callerProfile?.admin_role) {
        throw new Error("Unauthorized: Admin access required");
      }
    }

    // Create admin client for operations
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    let result;

    switch (action) {
      case "get_prospects": {
        // Get the 52 clean prospects - no account, not bounced, excludes family/test
        const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers();
        const existingEmails = new Set(existingUsers?.users?.map(u => u.email?.toLowerCase()) || []);
        const existingUsernames = new Set(existingUsers?.users?.map(u => u.email?.split('@')[0]?.toLowerCase()) || []);

        // Generic usernames to ignore for username matching
        const genericUsernames = new Set(['info', 'admin', 'contact', 'hello', 'support']);

        const { data: invites, error } = await supabaseAdmin
          .from("founder_invites")
          .select("*")
          .eq("status", "sent")
          .is("bounced_at", null)
          .order("send_count", { ascending: false });

        if (error) throw error;

        // Filter out family, test, and those with accounts
        const prospects = (invites || []).filter(invite => {
          const email = invite.email.toLowerCase();
          const username = email.split('@')[0];

          // Exclude family/test
          if (email.includes('oliverwood')) return false;
          if (email.includes('henrymoore') || email.includes('henry.moore') || email.includes('henry_moore')) return false;
          if (email.includes('beckymoore') || email.includes('becky.moore') || email.includes('becky_moore')) return false;
          if (email.includes('andrewmoore') || email.includes('andrew.moore') || email.includes('andrew_moore')) return false;
          if (email === 'founder@elec-mate.com') return false;
          if (email.startsWith('test.founder')) return false;

          // Exclude if exact email match exists
          if (existingEmails.has(email)) return false;

          // Exclude if username match exists (same person, different domain)
          // But ignore generic usernames like 'info'
          if (!genericUsernames.has(username) && existingUsernames.has(username)) return false;

          return true;
        });

        result = {
          count: prospects.length,
          prospects: prospects.map(p => ({
            id: p.id,
            email: p.email,
            send_count: p.send_count,
            invite_token: p.invite_token,
          })),
        };
        break;
      }

      case "send_test": {
        // Send a test email to verify the template
        const emailToTest = testEmail || "founder@elec-mate.com";

        // Get or create invite for test email
        let { data: invite } = await supabaseAdmin
          .from("founder_invites")
          .select("*")
          .eq("email", emailToTest)
          .single();

        if (!invite) {
          throw new Error(`No invite found for ${emailToTest}`);
        }

        const emailHtml = generateFinalPushEmailHTML(invite.invite_token);

        const { data: emailData, error: emailError } = await resend.emails.send({
          from: "Elec-Mate <founder@elec-mate.com>",
          to: [emailToTest],
          subject: "[TEST] You're missing out on £3.99/month forever",
          html: emailHtml,
        });

        if (emailError) {
          throw new Error(`Failed to send test: ${emailError.message}`);
        }

        result = {
          success: true,
          email: emailToTest,
          resendId: emailData?.id,
        };
        break;
      }

      case "send_batch": {
        // Get prospects that haven't received the final push campaign yet
        // We'll use a specific campaign marker in metadata or track via last_campaign_sent_at

        const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers();
        const existingEmails = new Set(existingUsers?.users?.map(u => u.email?.toLowerCase()) || []);
        const existingUsernames = new Set(existingUsers?.users?.map(u => u.email?.split('@')[0]?.toLowerCase()) || []);
        const genericUsernames = new Set(['info', 'admin', 'contact', 'hello', 'support']);

        const { data: invites, error: invitesError } = await supabaseAdmin
          .from("founder_invites")
          .select("*")
          .eq("status", "sent")
          .is("bounced_at", null)
          .is("last_campaign_sent_at", null)  // Only those who haven't received this campaign
          .order("send_count", { ascending: false });

        if (invitesError) throw invitesError;

        // Filter to clean prospects
        const prospects = (invites || []).filter(invite => {
          const email = invite.email.toLowerCase();
          const username = email.split('@')[0];

          if (email.includes('oliverwood')) return false;
          if (email.includes('henrymoore') || email.includes('henry.moore') || email.includes('henry_moore')) return false;
          if (email.includes('beckymoore') || email.includes('becky.moore') || email.includes('becky_moore')) return false;
          if (email.includes('andrewmoore') || email.includes('andrew.moore') || email.includes('andrew_moore')) return false;
          if (email === 'founder@elec-mate.com') return false;
          if (email.startsWith('test.founder')) return false;
          if (existingEmails.has(email)) return false;
          if (!genericUsernames.has(username) && existingUsernames.has(username)) return false;

          return true;
        });

        // Take only batchSize prospects
        const batch = prospects.slice(0, batchSize);

        if (batch.length === 0) {
          result = {
            sent: 0,
            remaining: 0,
            message: "All prospects have been sent the final push email",
          };
          break;
        }

        const sentEmails: string[] = [];
        const errors: string[] = [];

        for (const invite of batch) {
          try {
            const emailHtml = generateFinalPushEmailHTML(invite.invite_token);

            const { data: emailData, error: emailError } = await resend.emails.send({
              from: "Elec-Mate <founder@elec-mate.com>",
              to: [invite.email],
              subject: "You're missing out on £3.99/month forever",
              html: emailHtml,
            });

            if (emailError) {
              errors.push(`${invite.email}: ${emailError.message}`);
              continue;
            }

            // Update tracking - mark campaign as sent
            await supabaseAdmin
              .from("founder_invites")
              .update({
                sent_at: new Date().toISOString(),
                resend_email_id: emailData?.id,
                last_send_attempt_at: new Date().toISOString(),
                last_campaign_sent_at: new Date().toISOString(),
                send_count: (invite.send_count || 0) + 1,
              })
              .eq("id", invite.id);

            sentEmails.push(invite.email);

            // Small delay between emails
            await delay(300);
          } catch (err: any) {
            errors.push(`${invite.email}: ${err.message}`);
          }
        }

        // Calculate remaining
        const remaining = prospects.length - batch.length;

        console.log(`[Final Push] Sent ${sentEmails.length}/${batch.length} emails. ${remaining} remaining. Admin: ${adminUserId}`);

        result = {
          sent: sentEmails.length,
          failed: errors.length,
          remaining,
          totalProspects: prospects.length,
          sentEmails,
          errors: errors.length > 0 ? errors : undefined,
        };
        break;
      }

      case "get_status": {
        // Get campaign status - how many sent, how many remaining
        const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers();
        const existingEmails = new Set(existingUsers?.users?.map(u => u.email?.toLowerCase()) || []);
        const existingUsernames = new Set(existingUsers?.users?.map(u => u.email?.split('@')[0]?.toLowerCase()) || []);
        const genericUsernames = new Set(['info', 'admin', 'contact', 'hello', 'support']);

        const { data: allInvites } = await supabaseAdmin
          .from("founder_invites")
          .select("*")
          .eq("status", "sent")
          .is("bounced_at", null);

        const prospects = (allInvites || []).filter(invite => {
          const email = invite.email.toLowerCase();
          const username = email.split('@')[0];

          if (email.includes('oliverwood')) return false;
          if (email.includes('henrymoore') || email.includes('henry.moore')) return false;
          if (email.includes('beckymoore') || email.includes('becky.moore')) return false;
          if (email.includes('andrewmoore') || email.includes('andrew.moore')) return false;
          if (email === 'founder@elec-mate.com') return false;
          if (email.startsWith('test.founder')) return false;
          if (existingEmails.has(email)) return false;
          if (!genericUsernames.has(username) && existingUsernames.has(username)) return false;

          return true;
        });

        const sent = prospects.filter(p => p.last_campaign_sent_at !== null);
        const remaining = prospects.filter(p => p.last_campaign_sent_at === null);

        result = {
          totalProspects: prospects.length,
          sent: sent.length,
          remaining: remaining.length,
          sentEmails: sent.map(p => p.email),
          remainingEmails: remaining.map(p => p.email),
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
    console.error("Error in founder-final-push:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
