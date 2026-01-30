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

// Generate trial ending reminder email
function generateReminderEmailHTML(firstName: string, daysLeft: number, isApprentice: boolean): string {
  const subscribeUrl = "https://elec-mate.com/subscribe";
  const logoUrl = "https://elec-mate.com/logo.jpg";

  // Pricing based on role
  const currentPrice = isApprentice ? "£4.99" : "£9.99";
  const futurePrice = isApprentice ? null : "£14.99"; // Only electricians have price increase

  const urgencyText = daysLeft === 0
    ? "Your trial ends <strong style='color: #ef4444;'>today</strong>"
    : daysLeft === 1
    ? "Your trial ends <strong style='color: #f97316;'>tomorrow</strong>"
    : `Your trial ends in <strong style='color: #fbbf24;'>${daysLeft} days</strong>`;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Elec-Mate Trial is Ending Soon</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0a0a0a; -webkit-font-smoothing: antialiased;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #0a0a0a;">
    <tr>
      <td style="padding: 32px 16px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 480px; margin: 0 auto; background: linear-gradient(180deg, #1a1a1a 0%, #141414 100%); border-radius: 24px; overflow: hidden; border: 1px solid #2a2a2a;">

          <!-- Header with Logo -->
          <tr>
            <td style="padding: 32px 24px 24px; text-align: center;">
              <img src="${logoUrl}" alt="Elec-Mate" width="70" height="70" style="display: block; margin: 0 auto 20px; border-radius: 14px;" />
              <h1 style="margin: 0; font-size: 22px; font-weight: 700; color: #ffffff;">
                Don't Lose Access
              </h1>
            </td>
          </tr>

          <!-- Message -->
          <tr>
            <td style="padding: 0 24px 24px;">
              <div style="background: #1e1e1e; border-radius: 16px; padding: 24px; border: 1px solid #333333;">
                <p style="margin: 0 0 16px; font-size: 16px; color: #ffffff; line-height: 1.5;">
                  Hi ${firstName},
                </p>
                <p style="margin: 0 0 20px; font-size: 15px; color: #a3a3a3; line-height: 1.6;">
                  ${urgencyText}. After that, you'll lose access to all the tools that make your job easier.
                </p>

                <!-- What you'll lose -->
                <div style="background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.2); border-radius: 12px; padding: 16px; margin-bottom: 16px;">
                  <p style="margin: 0 0 8px; font-size: 13px; color: #ef4444; font-weight: 600;">What you'll lose access to:</p>
                  <p style="margin: 0; font-size: 14px; color: #a3a3a3; line-height: 1.6;">
                    &#8226; AI Cost Engineer & Quoting<br/>
                    &#8226; Circuit Designer & Cable Calculator<br/>
                    &#8226; BS7671 AI Assistant<br/>
                    &#8226; RAMS Generator<br/>
                    &#8226; EIC/EICR Certificate Tools
                  </p>
                </div>

                ${futurePrice ? `
                <!-- Price increase warning - electricians only -->
                <div style="background: rgba(251, 191, 36, 0.1); border: 1px solid rgba(251, 191, 36, 0.2); border-radius: 12px; padding: 16px; margin-bottom: 20px;">
                  <p style="margin: 0 0 4px; font-size: 13px; color: #fbbf24; font-weight: 600;">⚡ Lock in the current price</p>
                  <p style="margin: 0; font-size: 14px; color: #a3a3a3; line-height: 1.5;">
                    Currently <strong style="color: #ffffff;">${currentPrice}/month</strong> — price goes up to <strong style="color: #ffffff;">${futurePrice}/month</strong> when our mobile app launches. Subscribe now to keep the lower rate.
                  </p>
                </div>
                ` : `
                <!-- Apprentice pricing -->
                <div style="background: rgba(139, 92, 246, 0.1); border: 1px solid rgba(139, 92, 246, 0.2); border-radius: 12px; padding: 16px; margin-bottom: 20px;">
                  <p style="margin: 0; font-size: 14px; color: #a3a3a3; line-height: 1.5;">
                    Just <strong style="color: #ffffff;">${currentPrice}/month</strong> — special apprentice rate to help you on your journey.
                  </p>
                </div>
                `}

                <!-- CTA Button -->
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                  <tr>
                    <td>
                      <a href="${subscribeUrl}" style="display: block; padding: 18px 32px; background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); color: #0a0a0a; text-decoration: none; font-size: 16px; font-weight: 700; border-radius: 12px; text-align: center; box-shadow: 0 4px 16px rgba(251, 191, 36, 0.3);">
                        Subscribe Now - Keep Access
                      </a>
                    </td>
                  </tr>
                </table>

                <p style="margin: 16px 0 0; font-size: 13px; color: #666666; text-align: center;">
                  Subscribe now to keep all your tools
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 24px; text-align: center; background-color: #0a0a0a; border-top: 1px solid #222222;">
              <p style="margin: 0 0 4px; font-size: 12px; color: #666666;">
                Questions? Just reply to this email.
              </p>
              <p style="margin: 0; font-size: 12px; color: #525252;">
                Cheers, Andrew at Elec-Mate
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

    if (!userId) {
      throw new Error("userId is required");
    }

    // Create Supabase admin client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get user profile including role
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("full_name, username, created_at, role")
      .eq("id", userId)
      .single();

    if (profileError || !profile) {
      throw new Error("User not found");
    }

    // Get user email from auth
    const { data: authUser, error: authError } = await supabase.auth.admin.getUserById(userId);

    if (authError || !authUser?.user?.email) {
      throw new Error("User email not found");
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
    const { data, error } = await resend.emails.send({
      from: "Andrew at Elec-Mate <founder@elec-mate.com>",
      to: [email],
      subject,
      html: emailHtml,
      reply_to: "founder@elec-mate.com",
    });

    if (error) {
      console.error("Resend error:", error);
      throw error;
    }

    console.log("Email sent successfully:", data?.id);

    // Log the email send
    await supabase.from("admin_email_logs").insert({
      user_id: userId,
      email_type: `trial_${type}`,
      email_id: data?.id,
      sent_at: new Date().toISOString(),
    }).catch(() => {
      // Table might not exist, that's ok
      console.log("Could not log email (table may not exist)");
    });

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
