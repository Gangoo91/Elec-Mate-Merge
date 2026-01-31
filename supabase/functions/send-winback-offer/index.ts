import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-request-id",
};

// Win-back offer configuration
const WINBACK_CONFIG = {
  monthlyPrice: 7.99,
  yearlyPrice: 79.99,
  standardMonthlyPrice: 9.99,
  standardYearlyPrice: 99.99,
  discountPercent: 20,
  // Payment links for Electrician Win-Back product (prod_TtTdELbwjYaZQn)
  monthlyPaymentLink: "https://buy.stripe.com/7sYcMY1gm67a6U96FgbjW00",
  yearlyPaymentLink: "https://buy.stripe.com/5kQ3cobV0anqguJe7IbjW01",
};

interface EligibleUser {
  id: string;
  full_name: string | null;
  username: string;
  email: string;
  created_at: string;
  trial_ended_at: string;
}

// Generate win-back offer email HTML
function generateWinbackEmailHTML(user: EligibleUser): string {
  const firstName = user.full_name?.split(" ")[0] || "there";

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="dark">
  <meta name="supported-color-schemes" content="dark">
  <title>We miss you! Special offer: £7.99/month</title>
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

          <!-- Header -->
          <tr>
            <td style="padding: 40px 24px 24px; text-align: center;">
              <div style="font-size: 56px; line-height: 1; margin-bottom: 16px;">👋</div>
              <div style="display: inline-block; background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); color: #0f172a; padding: 8px 20px; border-radius: 24px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 20px;">
                We Miss You
              </div>
              <h1 style="margin: 0; font-size: 26px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px; line-height: 1.2;">
                Come back to Elec-Mate
              </h1>
              <p style="margin: 12px 0 0; font-size: 16px; color: #e2e8f0; line-height: 1.5;">
                Hi ${firstName}, we noticed you tried Elec-Mate but haven't come back yet.
              </p>
            </td>
          </tr>

          <!-- Special Offer Message -->
          <tr>
            <td style="padding: 0 24px 20px;">
              <p style="margin: 0; font-size: 16px; color: #e2e8f0; line-height: 1.7; text-align: center;">
                We'd love to have you back - so here's a <strong style="color: #22c55e;">special offer</strong> just for you:
              </p>
            </td>
          </tr>

          <!-- Price Cards -->
          <tr>
            <td style="padding: 0 20px 24px;">
              <!-- Monthly Option -->
              <div style="background: linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(34, 197, 94, 0.05) 100%); border: 1px solid rgba(34, 197, 94, 0.3); border-radius: 16px; padding: 20px; text-align: center; margin-bottom: 12px;">
                <p style="margin: 0 0 4px; font-size: 13px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">
                  🔥 Monthly Plan
                </p>
                <p style="margin: 4px 0; font-size: 36px; font-weight: 800; color: #22c55e; line-height: 1;">
                  £${WINBACK_CONFIG.monthlyPrice.toFixed(2)}
                </p>
                <p style="margin: 0 0 12px; font-size: 14px; color: #94a3b8;">
                  per month
                </p>
                <p style="margin: 0 0 16px; font-size: 13px; color: #cbd5e1;">
                  <span style="text-decoration: line-through; color: #64748b;">£${WINBACK_CONFIG.standardMonthlyPrice.toFixed(2)}</span>
                  <span style="color: #22c55e; font-weight: 600; margin-left: 8px;">Save ${WINBACK_CONFIG.discountPercent}%</span>
                </p>
                <a href="${WINBACK_CONFIG.monthlyPaymentLink}" style="display: block; padding: 14px 24px; background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); color: #ffffff; text-decoration: none; font-size: 15px; font-weight: 700; border-radius: 12px; text-align: center;">
                  Claim Monthly - £${WINBACK_CONFIG.monthlyPrice.toFixed(2)}/mo
                </a>
              </div>

              <!-- Yearly Option -->
              <div style="background: linear-gradient(135deg, rgba(251, 191, 36, 0.15) 0%, rgba(251, 191, 36, 0.05) 100%); border: 1px solid rgba(251, 191, 36, 0.3); border-radius: 16px; padding: 20px; text-align: center;">
                <p style="margin: 0 0 4px; font-size: 13px; color: #fbbf24; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">
                  🔥 Best Value - Yearly
                </p>
                <p style="margin: 4px 0; font-size: 36px; font-weight: 800; color: #fbbf24; line-height: 1;">
                  £${WINBACK_CONFIG.yearlyPrice.toFixed(2)}
                </p>
                <p style="margin: 0 0 12px; font-size: 14px; color: #94a3b8;">
                  per year (£${(WINBACK_CONFIG.yearlyPrice / 12).toFixed(2)}/mo)
                </p>
                <p style="margin: 0 0 16px; font-size: 13px; color: #cbd5e1;">
                  <span style="text-decoration: line-through; color: #64748b;">£${WINBACK_CONFIG.standardYearlyPrice.toFixed(2)}</span>
                  <span style="color: #fbbf24; font-weight: 600; margin-left: 8px;">Save ${WINBACK_CONFIG.discountPercent}%</span>
                </p>
                <a href="${WINBACK_CONFIG.yearlyPaymentLink}" style="display: block; padding: 14px 24px; background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); color: #0f172a; text-decoration: none; font-size: 15px; font-weight: 700; border-radius: 12px; text-align: center;">
                  Claim Yearly - £${WINBACK_CONFIG.yearlyPrice.toFixed(2)}/yr
                </a>
              </div>
            </td>
          </tr>

          <!-- What's Included -->
          <tr>
            <td style="padding: 0 20px 28px;">
              <p style="margin: 0 0 16px; font-size: 13px; font-weight: 700; color: #fbbf24; text-transform: uppercase; letter-spacing: 1px; text-align: center;">
                What you get
              </p>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="padding: 10px 16px; background-color: rgba(30, 41, 59, 0.8); border-radius: 12px;">
                    <span style="color: #22c55e; font-size: 16px; margin-right: 12px;">✓</span>
                    <span style="color: #ffffff; font-size: 14px;">Cost Engineer - instant job pricing</span>
                  </td>
                </tr>
                <tr><td style="height: 6px;"></td></tr>
                <tr>
                  <td style="padding: 10px 16px; background-color: rgba(30, 41, 59, 0.8); border-radius: 12px;">
                    <span style="color: #22c55e; font-size: 16px; margin-right: 12px;">✓</span>
                    <span style="color: #ffffff; font-size: 14px;">RAMS in 2 minutes</span>
                  </td>
                </tr>
                <tr><td style="height: 6px;"></td></tr>
                <tr>
                  <td style="padding: 10px 16px; background-color: rgba(30, 41, 59, 0.8); border-radius: 12px;">
                    <span style="color: #22c55e; font-size: 16px; margin-right: 12px;">✓</span>
                    <span style="color: #ffffff; font-size: 14px;">Quotes, invoices & expenses</span>
                  </td>
                </tr>
                <tr><td style="height: 6px;"></td></tr>
                <tr>
                  <td style="padding: 10px 16px; background-color: rgba(30, 41, 59, 0.8); border-radius: 12px;">
                    <span style="color: #22c55e; font-size: 16px; margin-right: 12px;">✓</span>
                    <span style="color: #ffffff; font-size: 14px;">Study Centre for apprentices</span>
                  </td>
                </tr>
                <tr><td style="height: 6px;"></td></tr>
                <tr>
                  <td style="padding: 10px 16px; background-color: rgba(30, 41, 59, 0.8); border-radius: 12px;">
                    <span style="color: #22c55e; font-size: 16px; margin-right: 12px;">✓</span>
                    <span style="color: #ffffff; font-size: 14px;">And much more...</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Exclusive Offer Note -->
          <tr>
            <td style="padding: 0 20px 28px;">
              <div style="background: rgba(251, 191, 36, 0.1); border: 1px solid rgba(251, 191, 36, 0.25); border-radius: 12px; padding: 14px 20px; text-align: center;">
                <p style="margin: 0; font-size: 14px; color: #fbbf24; font-weight: 600;">
                  🎁 This offer is exclusively for you
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
              <p style="margin: 0 0 8px; font-size: 13px; color: #64748b;">
                Cheers,<br>
                The Elec-Mate Team
              </p>
              <p style="margin: 0; font-size: 12px; color: #475569;">
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

    const { action, userId, userIds, testEmail, manualEmail, recipientName } = await req.json();

    // Create admin client for operations
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    let result;

    switch (action) {
      case "get_eligible": {
        // Query to find eligible users for win-back offer
        // Electricians whose trial expired 48+ hours ago, not subscribed, not free access, not already sent
        const { data: eligibleUsers, error: queryError } = await supabaseAdmin.rpc(
          "get_winback_eligible_users"
        ).select("*");

        // If RPC doesn't exist, fall back to direct query
        if (queryError?.code === "42883") {
          // Function doesn't exist, use direct query
          // Find electricians whose trial ended 48+ hours ago, not subscribed, not already sent
          const { data: profiles, error: profilesError } = await supabaseAdmin
            .from("profiles")
            .select("id, full_name, username, created_at")
            .eq("role", "electrician")
            .or("subscribed.is.null,subscribed.eq.false")
            .or("free_access_granted.is.null,free_access_granted.eq.false")
            .is("winback_offer_sent_at", null)
            .order("created_at", { ascending: false });

          if (profilesError) throw profilesError;

          // Filter to only include users whose trial ended 48+ hours ago
          // Trial = 7 days from signup, so we need created_at + 7 days + 48 hours < now
          const eligibleCutoff = Date.now() - (7 * 24 * 60 * 60 * 1000) - (48 * 60 * 60 * 1000);
          const filteredProfiles = profiles?.filter((p: any) => {
            return new Date(p.created_at).getTime() < eligibleCutoff;
          }) || [];

          // Get emails from auth.users
          const userIdsToFetch = filteredProfiles.map((p: any) => p.id);
          if (userIdsToFetch.length === 0) {
            result = { users: [] };
            break;
          }

          const { data: authUsers, error: authError } = await supabaseAdmin.auth.admin.listUsers({
            perPage: 1000,
          });

          if (authError) throw authError;

          const emailMap = new Map<string, string>();
          authUsers.users.forEach((u: any) => {
            if (u.email) emailMap.set(u.id, u.email);
          });

          const usersWithEmails = filteredProfiles.map((p: any) => ({
            id: p.id,
            full_name: p.full_name,
            username: p.username,
            email: emailMap.get(p.id) || null,
            created_at: p.created_at,
            trial_ended_at: new Date(new Date(p.created_at).getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          })).filter((u: any) => u.email) || [];

          result = { users: usersWithEmails };
        } else if (queryError) {
          throw queryError;
        } else {
          result = { users: eligibleUsers || [] };
        }
        break;
      }

      case "get_stats": {
        // Get campaign statistics
        const { data: stats, error: statsError } = await supabaseAdmin
          .from("profiles")
          .select("id, winback_offer_sent_at, subscribed, created_at")
          .eq("role", "electrician")
          .or("free_access_granted.is.null,free_access_granted.eq.false");

        if (statsError) throw statsError;

        // Trial = 7 days from signup, so we need created_at + 7 days + 48 hours < now
        const eligibleCutoff = Date.now() - (7 * 24 * 60 * 60 * 1000) - (48 * 60 * 60 * 1000);

        const totalEligible = stats?.filter((s: any) => {
          if (s.subscribed || s.winback_offer_sent_at) return false;
          return new Date(s.created_at).getTime() < eligibleCutoff;
        }).length || 0;

        const offersSent = stats?.filter((s: any) => s.winback_offer_sent_at).length || 0;

        // Count conversions (users who have winback_offer_sent_at AND are now subscribed)
        const conversions = stats?.filter((s: any) =>
          s.winback_offer_sent_at && s.subscribed
        ).length || 0;

        result = {
          totalEligible,
          offersSent,
          conversions,
          conversionRate: offersSent > 0 ? ((conversions / offersSent) * 100).toFixed(1) : "0",
        };
        break;
      }

      case "send_single": {
        if (!userId) {
          throw new Error("User ID is required");
        }

        // Get user details
        const { data: profile, error: profileError } = await supabaseAdmin
          .from("profiles")
          .select("id, full_name, username, created_at, winback_offer_sent_at")
          .eq("id", userId)
          .single();

        if (profileError || !profile) {
          throw new Error("User not found");
        }

        if (profile.winback_offer_sent_at) {
          throw new Error("Win-back offer already sent to this user");
        }

        // Get user email
        const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.getUserById(userId);
        if (authError || !authUser.user?.email) {
          throw new Error("Could not get user email");
        }

        const userWithEmail: EligibleUser = {
          id: profile.id,
          full_name: profile.full_name,
          username: profile.username,
          email: authUser.user.email,
          created_at: profile.created_at,
          trial_ended_at: new Date(new Date(profile.created_at).getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        };

        // Send email
        const emailHtml = generateWinbackEmailHTML(userWithEmail);
        const { error: emailError } = await resend.emails.send({
          from: "Elec-Mate <offers@elec-mate.com>",
          to: [userWithEmail.email.trim().toLowerCase()],
          subject: "We miss you! Special offer: £7.99/month",
          html: emailHtml,
        });

        if (emailError) {
          console.error("Email send error:", emailError);
          throw new Error("Failed to send email");
        }

        // Update profile to mark offer as sent
        const { error: updateError } = await supabaseAdmin
          .from("profiles")
          .update({ winback_offer_sent_at: new Date().toISOString() })
          .eq("id", userId);

        if (updateError) {
          console.error("Failed to update winback_offer_sent_at:", updateError);
        }

        // Log to email_logs table
        await supabaseAdmin.from("email_logs").insert({
          recipient_email: userWithEmail.email,
          subject: "We miss you! Special offer: £7.99/month",
          email_type: "winback_offer",
          status: "sent",
          metadata: { user_id: userId },
        });

        console.log(`Win-back offer sent to ${userWithEmail.email} by admin ${user.id}`);
        result = { success: true, email: userWithEmail.email };
        break;
      }

      case "send_bulk": {
        if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
          throw new Error("User IDs array is required");
        }

        let sentCount = 0;
        let skippedCount = 0;
        const errors: string[] = [];

        for (const uid of userIds) {
          try {
            // Get user details
            const { data: profile, error: profileError } = await supabaseAdmin
              .from("profiles")
              .select("id, full_name, username, created_at, winback_offer_sent_at")
              .eq("id", uid)
              .single();

            if (profileError || !profile) {
              errors.push(`${uid}: User not found`);
              continue;
            }

            if (profile.winback_offer_sent_at) {
              skippedCount++;
              continue;
            }

            // Get user email
            const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.getUserById(uid);
            if (authError || !authUser.user?.email) {
              errors.push(`${uid}: Could not get email`);
              continue;
            }

            const userWithEmail: EligibleUser = {
              id: profile.id,
              full_name: profile.full_name,
              username: profile.username,
              email: authUser.user.email,
              created_at: profile.created_at,
              trial_ended_at: new Date(new Date(profile.created_at).getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            };

            // Send email
            const emailHtml = generateWinbackEmailHTML(userWithEmail);
            const { error: emailError } = await resend.emails.send({
              from: "Elec-Mate <offers@elec-mate.com>",
              to: [userWithEmail.email.trim().toLowerCase()],
              subject: "We miss you! Special offer: £7.99/month",
              html: emailHtml,
            });

            if (emailError) {
              errors.push(`${userWithEmail.email}: ${emailError.message}`);
              continue;
            }

            // Update profile
            await supabaseAdmin
              .from("profiles")
              .update({ winback_offer_sent_at: new Date().toISOString() })
              .eq("id", uid);

            // Log email
            await supabaseAdmin.from("email_logs").insert({
              recipient_email: userWithEmail.email,
              subject: "We miss you! Special offer: £7.99/month",
              email_type: "winback_offer",
              status: "sent",
              metadata: { user_id: uid },
            });

            sentCount++;
          } catch (err: any) {
            errors.push(`${uid}: ${err.message}`);
          }
        }

        console.log(`Win-back bulk send: ${sentCount} sent, ${skippedCount} skipped by admin ${user.id}`);
        result = {
          sent: sentCount,
          skipped: skippedCount,
          failed: errors.length,
          errors: errors.length > 0 ? errors : undefined
        };
        break;
      }

      case "get_sent_history": {
        // Get users who have been sent the win-back offer
        const { data: sentUsers, error: sentError } = await supabaseAdmin
          .from("profiles")
          .select("id, full_name, username, created_at, winback_offer_sent_at, subscribed")
          .not("winback_offer_sent_at", "is", null)
          .order("winback_offer_sent_at", { ascending: false })
          .limit(100);

        if (sentError) throw sentError;

        result = { users: sentUsers || [] };
        break;
      }

      case "send_test": {
        // Send a test email to a specified address
        if (!testEmail) {
          throw new Error("Test email address is required");
        }

        // Create a mock user for the test email
        const testUser: EligibleUser = {
          id: "test-user-id",
          full_name: "Test User",
          username: "testuser",
          email: testEmail,
          created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
          trial_ended_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        };

        // Generate and send the email
        const emailHtml = generateWinbackEmailHTML(testUser);
        const { error: emailError } = await resend.emails.send({
          from: "Elec-Mate <offers@elec-mate.com>",
          to: [testEmail.trim().toLowerCase()],
          subject: "[TEST] We miss you! Special offer: £7.99/month",
          html: emailHtml,
        });

        if (emailError) {
          console.error("Test email send error:", emailError);
          throw new Error(`Failed to send test email: ${emailError.message}`);
        }

        console.log(`Win-back test email sent to ${testEmail} by admin ${user.id}`);
        result = { success: true, email: testEmail };
        break;
      }

      case "send_manual": {
        // Send a real win-back email to any email address (manual entry)
        if (!manualEmail) {
          throw new Error("Email address is required");
        }

        // Create user object for the email
        const manualUser: EligibleUser = {
          id: "manual-entry",
          full_name: recipientName || null,
          username: "user",
          email: manualEmail,
          created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
          trial_ended_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        };

        // Generate and send the email (real, not test)
        const manualEmailHtml = generateWinbackEmailHTML(manualUser);
        const { error: manualEmailError } = await resend.emails.send({
          from: "Elec-Mate <offers@elec-mate.com>",
          to: [manualEmail.trim().toLowerCase()],
          subject: "We miss you! Special offer: £7.99/month",
          html: manualEmailHtml,
        });

        if (manualEmailError) {
          console.error("Manual email send error:", manualEmailError);
          throw new Error(`Failed to send email: ${manualEmailError.message}`);
        }

        // Log to email_logs table
        await supabaseAdmin.from("email_logs").insert({
          recipient_email: manualEmail.trim().toLowerCase(),
          subject: "We miss you! Special offer: £7.99/month",
          email_type: "winback_offer_manual",
          status: "sent",
          metadata: { sent_by_admin: user.id, recipient_name: recipientName },
        });

        console.log(`Win-back offer manually sent to ${manualEmail} by admin ${user.id}`);
        result = { success: true, email: manualEmail };
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
    console.error("Error in send-winback-offer:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
