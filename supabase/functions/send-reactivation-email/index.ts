import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ReactivationRequest {
  email: string;
  fullName: string;
}

function generateReactivationEmailHTML(firstName: string): string {
  const loginUrl = "https://elec-mate.com/auth/signin";
  const logoUrl = "https://elec-mate.com/logo.jpg";

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>You're All Set - Elec-Mate</title>
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
              <h1 style="margin: 0; font-size: 24px; font-weight: 700; color: #ffffff;">
                You're All Set
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
                <p style="margin: 0 0 24px; font-size: 15px; color: #a3a3a3; line-height: 1.6;">
                  We noticed you signed up for Elec-Mate earlier but hit a snag getting started. Sorry about that - we've fixed it now.
                </p>
                <p style="margin: 0 0 24px; font-size: 15px; color: #a3a3a3; line-height: 1.6;">
                  <strong style="color: #22c55e;">Your account is ready to go.</strong> Just sign in and you'll land straight on your dashboard.
                </p>

                <!-- CTA Button -->
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                  <tr>
                    <td>
                      <a href="${loginUrl}" style="display: block; padding: 18px 32px; background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); color: #0a0a0a; text-decoration: none; font-size: 16px; font-weight: 700; border-radius: 12px; text-align: center; box-shadow: 0 4px 16px rgba(251, 191, 36, 0.3);">
                        Sign In to Elec-Mate
                      </a>
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>

          <!-- Help Section -->
          <tr>
            <td style="padding: 24px; background-color: #111111; border-top: 1px solid #222222;">
              <p style="margin: 0 0 4px; font-size: 13px; color: #666666;">
                Questions or need a hand getting started? Just reply to this email.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 24px; text-align: center; background-color: #0a0a0a;">
              <p style="margin: 0; font-size: 12px; color: #525252;">
                Cheers,<br/>Andrew<br/>Elec-Mate
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
    const { email, fullName } = await req.json() as ReactivationRequest;

    if (!email) {
      throw new Error("Email is required");
    }

    const firstName = (fullName || "there").split(" ")[0];
    const emailHtml = generateReactivationEmailHTML(firstName);

    console.log(`Sending reactivation email to: ${email}`);

    const { data, error } = await resend.emails.send({
      from: "Andrew at Elec-Mate <founder@elec-mate.com>",
      to: [email],
      subject: "You're all set - jump back in to Elec-Mate",
      html: emailHtml,
      reply_to: "founder@elec-mate.com",
    });

    if (error) {
      console.error("Resend error:", error);
      throw error;
    }

    console.log("Email sent successfully:", data?.id);

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
