import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-request-id",
};

interface TrialReminderRequest {
  userId: string;
  type?: "reminder"; // Only reminder type now
}

// Generate trial ending reminder email - matches app design
function generateReminderEmailHTML(firstName: string, daysLeft: number, isApprentice: boolean): string {
  const subscribeUrl = "https://elec-mate.com/subscribe";
  const logoUrl = "https://elec-mate.com/logo.jpg";

  // Pricing based on role
  const currentPrice = isApprentice ? "£4.99" : "£9.99";
  const futurePrice = isApprentice ? null : "£14.99";

  // Urgency styling
  const urgencyColor = daysLeft === 0 ? "#ef4444" : daysLeft === 1 ? "#f97316" : "#fbbf24";
  const urgencyText = daysLeft === 0 ? "Today" : daysLeft === 1 ? "Tomorrow" : `${daysLeft} days`;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Elec-Mate Trial</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0a0a0a;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #0a0a0a;">
    <tr>
      <td style="padding: 32px 16px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 480px; margin: 0 auto;">

          <!-- Logo -->
          <tr>
            <td style="text-align: center; padding-bottom: 32px;">
              <img src="${logoUrl}" alt="Elec-Mate" width="64" height="64" style="display: inline-block; border-radius: 16px;" />
            </td>
          </tr>

          <!-- Main Card -->
          <tr>
            <td>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: linear-gradient(135deg, #1c1c1c 0%, #141414 100%); border-radius: 20px; border: 1px solid #2a2a2a;">
                <tr>
                  <td style="padding: 28px 24px;">

                    <!-- Urgency Header -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 24px;">
                      <tr>
                        <td>
                          <p style="margin: 0 0 8px; font-size: 13px; color: ${urgencyColor}; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">
                            ⏰ Trial ends ${urgencyText}
                          </p>
                          <h1 style="margin: 0; font-size: 26px; font-weight: 700; color: #ffffff; line-height: 1.2;">
                            ${firstName}, don't lose your access
                          </h1>
                        </td>
                      </tr>
                    </table>

                    <!-- Features Box -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: rgba(251, 191, 36, 0.08); border: 1px solid rgba(251, 191, 36, 0.2); border-radius: 12px; margin-bottom: 24px;">
                      <tr>
                        <td style="padding: 20px;">
                          <p style="margin: 0 0 16px; font-size: 14px; color: #fbbf24; font-weight: 600;">
                            What you'll lose:
                          </p>
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr><td style="padding: 6px 0; font-size: 15px; color: #ffffff;">⚡ AI Cost Engineer & Quoting</td></tr>
                            <tr><td style="padding: 6px 0; font-size: 15px; color: #ffffff;">📐 Circuit Designer & Calculators</td></tr>
                            <tr><td style="padding: 6px 0; font-size: 15px; color: #ffffff;">📚 BS7671 AI Assistant</td></tr>
                            <tr><td style="padding: 6px 0; font-size: 15px; color: #ffffff;">🛡️ RAMS & Risk Assessments</td></tr>
                            <tr><td style="padding: 6px 0; font-size: 15px; color: #ffffff;">📋 EIC/EICR Certificate Tools</td></tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                    ${futurePrice ? `
                    <!-- Price Lock Banner - Electricians -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: linear-gradient(135deg, rgba(251, 191, 36, 0.15) 0%, rgba(245, 158, 11, 0.1) 100%); border-radius: 12px; margin-bottom: 24px;">
                      <tr>
                        <td style="padding: 16px 20px;">
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                              <td style="width: 48px; vertical-align: top;">
                                <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #fbbf24, #f59e0b); border-radius: 10px; text-align: center; line-height: 40px; font-size: 20px;">⚡</div>
                              </td>
                              <td style="vertical-align: top;">
                                <p style="margin: 0 0 4px; font-size: 15px; font-weight: 700; color: #ffffff;">
                                  Lock in ${currentPrice}/month forever
                                </p>
                                <p style="margin: 0; font-size: 14px; color: #d4d4d4; line-height: 1.4;">
                                  Price goes to ${futurePrice}/month when our app launches
                                </p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                    ` : `
                    <!-- Apprentice Rate Banner -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(124, 58, 237, 0.1) 100%); border-radius: 12px; margin-bottom: 24px;">
                      <tr>
                        <td style="padding: 16px 20px;">
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                              <td style="width: 48px; vertical-align: top;">
                                <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #8b5cf6, #7c3aed); border-radius: 10px; text-align: center; line-height: 40px; font-size: 20px;">🎓</div>
                              </td>
                              <td style="vertical-align: top;">
                                <p style="margin: 0 0 4px; font-size: 15px; font-weight: 700; color: #ffffff;">
                                  Special apprentice rate: ${currentPrice}/month
                                </p>
                                <p style="margin: 0; font-size: 14px; color: #d4d4d4; line-height: 1.4;">
                                  We're here to support your journey
                                </p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                    `}

                    <!-- CTA Button -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td>
                          <a href="${subscribeUrl}" style="display: block; padding: 18px 32px; background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); color: #000000; text-decoration: none; font-size: 17px; font-weight: 700; border-radius: 12px; text-align: center;">
                            Keep My Access
                          </a>
                        </td>
                      </tr>
                    </table>

                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 0 0; text-align: center;">
              <p style="margin: 0 0 8px; font-size: 14px; color: #a3a3a3;">
                Questions? Just reply to this email.
              </p>
              <p style="margin: 0; font-size: 13px; color: #737373;">
                — Andrew, Founder
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
    const { userId, type } = await req.json() as TrialReminderRequest;
    console.log("Received request for userId:", userId, "type:", type);

    if (!userId) {
      throw new Error("userId is required");
    }

    // Create Supabase admin client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const emailType = type || "reminder";
    const today = new Date().toISOString().split('T')[0];

    // Check if already sent today to prevent duplicates
    const { data: existingSend } = await supabase
      .from("trial_email_sends")
      .select("id")
      .eq("user_id", userId)
      .eq("email_type", emailType)
      .eq("sent_date", today)
      .single();

    if (existingSend) {
      console.log(`Email already sent today to user ${userId}, skipping`);
      return new Response(
        JSON.stringify({ success: false, skipped: true, reason: "Already sent today" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get user profile including role
    console.log("Fetching profile...");
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("full_name, username, created_at, role")
      .eq("id", userId)
      .single();

    if (profileError) {
      console.error("Profile error:", profileError);
      throw new Error(`User not found: ${profileError.message}`);
    }

    if (!profile) {
      throw new Error("User profile is null");
    }

    console.log("Profile found:", profile.full_name, "role:", profile.role);

    // Get user email from auth
    console.log("Fetching auth user...");
    const { data: authUser, error: authError } = await supabase.auth.admin.getUserById(userId);

    if (authError) {
      console.error("Auth error:", authError);
      throw new Error(`Auth error: ${authError.message}`);
    }

    if (!authUser?.user?.email) {
      throw new Error("User email not found in auth");
    }

    const email = authUser.user.email;
    const firstName = (profile.full_name || "there").split(" ")[0];

    // Calculate days left in trial
    const createdAt = new Date(profile.created_at);
    const trialEnds = new Date(createdAt.getTime() + 7 * 24 * 60 * 60 * 1000);
    const now = new Date();
    const daysLeft = Math.max(0, Math.ceil((trialEnds.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));

    const isApprentice = profile.role === "apprentice";
    console.log(`Sending reminder email to: ${email} (${firstName}), days left: ${daysLeft}, role: ${profile.role}`);

    // Generate reminder email with role-based pricing
    const emailHtml = generateReminderEmailHTML(firstName, daysLeft, isApprentice);

    const subject = daysLeft === 0
      ? "Your Elec-Mate trial ends today"
      : daysLeft === 1
      ? "Your Elec-Mate trial ends tomorrow"
      : `Your Elec-Mate trial ends in ${daysLeft} days`;

    // Send email
    console.log("Sending email via Resend to:", email);
    const { data, error } = await resend.emails.send({
      from: "Andrew at Elec-Mate <founder@elec-mate.com>",
      to: [email],
      subject,
      html: emailHtml,
      reply_to: "founder@elec-mate.com",
    });

    if (error) {
      console.error("Resend error:", JSON.stringify(error));
      // Log failed send
      await supabase.from("trial_email_sends").insert({
        user_id: userId,
        email_type: emailType,
        sent_date: today,
        trial_days_remaining: daysLeft,
        success: false,
        error_message: error.message || JSON.stringify(error),
      });
      throw new Error(`Resend error: ${error.message || JSON.stringify(error)}`);
    }

    console.log("Email sent successfully:", data?.id);

    // Log the successful email send
    const { error: logError } = await supabase.from("trial_email_sends").insert({
      user_id: userId,
      email_type: emailType,
      resend_email_id: data?.id,
      sent_date: today,
      trial_days_remaining: daysLeft,
      success: true,
    });

    if (logError) {
      console.log("Could not log email send:", logError.message);
    }

    return new Response(
      JSON.stringify({ success: true, emailId: data?.id }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
    );
  }
});
