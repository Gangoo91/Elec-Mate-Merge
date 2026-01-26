import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-request-id",
};

// Generate reminder email HTML - fresh design, different messaging
function generateReminderEmailHTML(email: string, inviteToken: string): string {
  const supabaseUrl = Deno.env.get("SUPABASE_URL") || "https://jtwygbeceundfgnkirof.supabase.co";
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
  <title>Join 200+ Electricians on Elec-Mate</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0f172a; -webkit-font-smoothing: antialiased;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #0f172a;">
    <tr>
      <td style="padding: 24px 12px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 480px; margin: 0 auto; background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%); border-radius: 24px; overflow: hidden; border: 1px solid rgba(251, 191, 36, 0.2);">

          <!-- Header -->
          <tr>
            <td style="padding: 40px 24px 20px; text-align: center;">
              <div style="font-size: 48px; line-height: 1; margin-bottom: 16px;">
                <span style="display: inline-block; margin: 0 4px;">&#9889;</span>
              </div>
              <h1 style="margin: 0; font-size: 26px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px; line-height: 1.3;">
                We're Launching This Week
              </h1>
              <p style="margin: 12px 0 0; font-size: 15px; color: #94a3b8; line-height: 1.5;">
                And you're invited to join before we do
              </p>
            </td>
          </tr>

          <!-- Social Proof Banner -->
          <tr>
            <td style="padding: 0 20px 24px;">
              <div style="background: linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(59, 130, 246, 0.05) 100%); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 16px; padding: 20px; text-align: center;">
                <p style="margin: 0; font-size: 15px; color: #e2e8f0; font-weight: 500;">
                  Join <span style="color: #3b82f6; font-weight: 800; font-size: 24px;">200</span> electricians who have started their
                </p>
                <p style="margin: 6px 0 0; font-size: 28px; font-weight: 800; color: #22c55e; line-height: 1;">
                  7-Day Free Trial
                </p>
              </div>
            </td>
          </tr>

          <!-- Message -->
          <tr>
            <td style="padding: 0 24px 24px;">
              <p style="margin: 0; font-size: 16px; color: #e2e8f0; line-height: 1.7;">
                Hey there,
              </p>
              <p style="margin: 16px 0 0; font-size: 16px; color: #e2e8f0; line-height: 1.7;">
                You signed up for early access to <strong style="color: #fbbf24;">Elec-Mate</strong> - the all-in-one app for UK electricians. We wanted to make sure you didn't miss out.
              </p>
              <p style="margin: 16px 0 0; font-size: 16px; color: #e2e8f0; line-height: 1.7;">
                We're launching publicly this week, but early access members get to <strong style="color: #22c55e;">shape the platform</strong> - tell us what features matter most to you.
              </p>
            </td>
          </tr>

          <!-- What You Get -->
          <tr>
            <td style="padding: 0 20px 24px;">
              <div style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(148, 163, 184, 0.1); border-radius: 16px; padding: 20px;">
                <p style="margin: 0 0 16px; font-size: 13px; font-weight: 700; color: #fbbf24; text-transform: uppercase; letter-spacing: 1px;">
                  What's Inside
                </p>
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                  <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid rgba(148, 163, 184, 0.1);">
                      <span style="color: #22c55e; font-size: 14px; margin-right: 10px;">&#10003;</span>
                      <span style="color: #ffffff; font-size: 14px;">EICR, EIC & Minor Works certificates</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid rgba(148, 163, 184, 0.1);">
                      <span style="color: #22c55e; font-size: 14px; margin-right: 10px;">&#10003;</span>
                      <span style="color: #ffffff; font-size: 14px;">Quotes & invoicing with Stripe payments</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid rgba(148, 163, 184, 0.1);">
                      <span style="color: #22c55e; font-size: 14px; margin-right: 10px;">&#10003;</span>
                      <span style="color: #ffffff; font-size: 14px;">AI tools - BS7671 assistant, RAMS generator</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid rgba(148, 163, 184, 0.1);">
                      <span style="color: #22c55e; font-size: 14px; margin-right: 10px;">&#10003;</span>
                      <span style="color: #ffffff; font-size: 14px;">Cable sizing & volt drop calculators</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0;">
                      <span style="color: #22c55e; font-size: 14px; margin-right: 10px;">&#10003;</span>
                      <span style="color: #ffffff; font-size: 14px;">Study centre with courses & mock exams</span>
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>

          <!-- No Card Required -->
          <tr>
            <td style="padding: 0 20px 8px; text-align: center;">
              <p style="margin: 0; font-size: 14px; color: #94a3b8;">
                No credit card required to start
              </p>
            </td>
          </tr>

          <!-- CTA Button -->
          <tr>
            <td style="padding: 0 20px 32px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td>
                    <a href="${signupUrl}" style="display: block; padding: 18px 32px; background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); color: #0f172a; text-decoration: none; font-size: 17px; font-weight: 700; border-radius: 14px; text-align: center; box-shadow: 0 8px 24px rgba(251, 191, 36, 0.35);">
                      Start Your Free Trial
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin: 12px 0 0; text-align: center; font-size: 13px; color: #64748b;">
                Takes 30 seconds to sign up
              </p>
            </td>
          </tr>

          <!-- Urgency -->
          <tr>
            <td style="padding: 0 20px 28px;">
              <div style="background: rgba(251, 191, 36, 0.1); border: 1px solid rgba(251, 191, 36, 0.25); border-radius: 12px; padding: 14px 20px; text-align: center;">
                <p style="margin: 0; font-size: 14px; color: #fbbf24; font-weight: 600;">
                  Early access closes when we launch - don't miss out
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px; background-color: rgba(15, 23, 42, 0.8); border-top: 1px solid rgba(148, 163, 184, 0.1); text-align: center;">
              <p style="margin: 0 0 8px; font-size: 14px; color: #cbd5e1;">
                Questions? Just hit reply
              </p>
              <p style="margin: 0; font-size: 13px; color: #64748b;">
                Elec-Mate Ltd · Made in the UK
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
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
    const authHeader = req.headers.get("Authorization");
    const internalKey = req.headers.get("X-Internal-Key");
    const testSecret = req.headers.get("X-Test-Secret");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    // Allow internal key for CLI/internal testing
    const isInternalCall = internalKey === serviceRoleKey;
    // Also check if auth header contains service role
    const isServiceRole = authHeader === `Bearer ${serviceRoleKey}`;
    // Test secret for admin testing only
    const isTestMode = testSecret === "elecmate-test-2026";

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    // Track caller for logging
    let callerId = "internal";

    // If not internal/service/test call, verify user is admin
    if (!isInternalCall && !isServiceRole && !isTestMode) {
      if (!authHeader) {
        throw new Error("No authorization header");
      }

      const supabaseClient = createClient(
        Deno.env.get("SUPABASE_URL") ?? "",
        Deno.env.get("SUPABASE_ANON_KEY") ?? "",
        { global: { headers: { Authorization: authHeader } } }
      );

      const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
      if (userError || !user) {
        throw new Error("Unauthorized");
      }

      callerId = callerId;

      // Check admin
      const { data: callerProfile } = await supabaseClient
        .from("profiles")
        .select("admin_role")
        .eq("id", callerId)
        .single();

      if (!callerProfile?.admin_role) {
        throw new Error("Admin access required");
      }
    }

    const { action, testEmail } = await req.json();

    if (action === "send_test") {
      // Send test email to specified address
      if (!testEmail) {
        throw new Error("testEmail is required");
      }

      // Create a test token for tracking
      const testToken = "TEST-" + Math.random().toString(36).substring(2, 18);

      const emailHtml = generateReminderEmailHTML(testEmail, testToken);

      const { data: emailData, error: emailError } = await resend.emails.send({
        from: "Elec-Mate <hello@elec-mate.com>",
        replyTo: "info@elec-mate.com",
        to: [testEmail],
        subject: "Join 200 Electricians Who Started Their Free Trial",
        html: emailHtml,
      });

      if (emailError) {
        console.error("Email send error:", emailError);
        throw new Error("Failed to send test email: " + emailError.message);
      }

      console.log(`Test reminder email sent to ${testEmail} by admin ${callerId}`);
      return new Response(JSON.stringify({
        success: true,
        email: testEmail,
        resendId: emailData?.id,
        message: "Test email sent successfully"
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // Helper to delay between sends (Resend limit is 2/sec, so 600ms to be safe)
    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    if (action === "send_to_unopened") {
      // Send reminder to all who haven't opened (and aren't bounced/claimed)
      const BATCH_SIZE = 50;

      // Get count first
      const { count: totalCount } = await supabaseAdmin
        .from("early_access_invites")
        .select("*", { count: "exact", head: true })
        .is("opened_at", null)
        .is("bounced_at", null)
        .is("claimed_at", null)
        .not("resend_email_id", "is", null); // Must have been sent at least once

      // Get batch - only those not reminded in last 24 hours
      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

      const { data: invites, error: invitesError } = await supabaseAdmin
        .from("early_access_invites")
        .select("*")
        .is("opened_at", null)
        .is("bounced_at", null)
        .is("claimed_at", null)
        .not("resend_email_id", "is", null)
        .or(`reminder_sent_at.is.null,reminder_sent_at.lt.${oneDayAgo}`)
        .order("created_at", { ascending: true })
        .limit(BATCH_SIZE);

      if (invitesError) throw invitesError;

      if (!invites || invites.length === 0) {
        return new Response(JSON.stringify({
          sent: 0,
          remaining: 0,
          total: totalCount || 0,
          message: "No more invites to send reminders to",
          complete: true
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        });
      }

      let sentCount = 0;
      const errors: string[] = [];

      for (const invite of invites) {
        try {
          const emailHtml = generateReminderEmailHTML(invite.email, invite.invite_token);

          const { data: emailData, error: emailError } = await resend.emails.send({
            from: "Elec-Mate <hello@elec-mate.com>",
            replyTo: "info@elec-mate.com",
            to: [invite.email],
            subject: "Join 200 Electricians Who Started Their Free Trial",
            html: emailHtml,
          });

          if (emailError) {
            errors.push(`${invite.email}: ${emailError.message}`);
            continue;
          }

          // Update reminder tracking
          await supabaseAdmin
            .from("early_access_invites")
            .update({
              reminder_sent_at: new Date().toISOString(),
              reminder_resend_id: emailData?.id || null,
              send_count: (invite.send_count || 0) + 1,
            })
            .eq("id", invite.id);

          sentCount++;

          // Rate limit: wait 600ms between sends
          await sleep(600);
        } catch (err: any) {
          errors.push(`${invite.email}: ${err.message}`);
        }
      }

      // Get remaining count
      const { count: remainingCount } = await supabaseAdmin
        .from("early_access_invites")
        .select("*", { count: "exact", head: true })
        .is("opened_at", null)
        .is("bounced_at", null)
        .is("claimed_at", null)
        .not("resend_email_id", "is", null)
        .or(`reminder_sent_at.is.null,reminder_sent_at.lt.${oneDayAgo}`);

      const remaining = remainingCount || 0;
      const complete = remaining === 0;

      console.log(`Sent ${sentCount} reminder emails by admin ${callerId}. Remaining: ${remaining}`);

      return new Response(JSON.stringify({
        sent: sentCount,
        attempted: invites.length,
        remaining,
        total: totalCount || 0,
        errors: errors.length > 0 ? errors : undefined,
        complete,
        message: complete
          ? `All done! Sent ${sentCount} reminder emails.`
          : `Sent ${sentCount} emails. ${remaining} remaining - call again to continue.`
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    if (action === "send_to_undelivered") {
      // Send to those where delivery wasn't confirmed (and not bounced)
      const BATCH_SIZE = 50;

      const { data: invites, error: invitesError } = await supabaseAdmin
        .from("early_access_invites")
        .select("*")
        .is("delivered_at", null)
        .is("bounced_at", null)
        .is("claimed_at", null)
        .not("resend_email_id", "is", null)
        .order("created_at", { ascending: true })
        .limit(BATCH_SIZE);

      if (invitesError) throw invitesError;

      if (!invites || invites.length === 0) {
        return new Response(JSON.stringify({
          sent: 0,
          message: "No undelivered invites to retry",
          complete: true
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        });
      }

      let sentCount = 0;
      const errors: string[] = [];

      for (const invite of invites) {
        try {
          const emailHtml = generateReminderEmailHTML(invite.email, invite.invite_token);

          const { data: emailData, error: emailError } = await resend.emails.send({
            from: "Elec-Mate <hello@elec-mate.com>",
            replyTo: "info@elec-mate.com",
            to: [invite.email],
            subject: "Join 200 Electricians Who Started Their Free Trial",
            html: emailHtml,
          });

          if (emailError) {
            errors.push(`${invite.email}: ${emailError.message}`);
            continue;
          }

          await supabaseAdmin
            .from("early_access_invites")
            .update({
              reminder_sent_at: new Date().toISOString(),
              reminder_resend_id: emailData?.id || null,
              send_count: (invite.send_count || 0) + 1,
            })
            .eq("id", invite.id);

          sentCount++;

          // Rate limit: wait 600ms between sends
          await sleep(600);
        } catch (err: any) {
          errors.push(`${invite.email}: ${err.message}`);
        }
      }

      console.log(`Sent ${sentCount} reminder emails to undelivered by admin ${callerId}`);

      return new Response(JSON.stringify({
        sent: sentCount,
        attempted: invites.length,
        errors: errors.length > 0 ? errors : undefined,
        message: `Sent ${sentCount} reminder emails to previously undelivered addresses`
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    throw new Error(`Unknown action: ${action}`);

  } catch (error: any) {
    console.error("Error in send-early-access-reminder:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
