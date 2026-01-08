import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface WelcomeEmailRequest {
  userId?: string;
  email: string;
  fullName: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log('📧 Send Welcome Email | Started:', new Date().toISOString());

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse request - can come from webhook or direct call
    let payload: WelcomeEmailRequest;

    const body = await req.json();

    // Handle webhook payload (from database trigger)
    if (body.type === 'INSERT' && body.record) {
      const record = body.record;
      payload = {
        userId: record.id,
        email: record.email,
        fullName: record.raw_user_meta_data?.full_name || 'there',
      };
    } else {
      // Direct call
      payload = body;
    }

    const { email, fullName } = payload;

    if (!email) {
      throw new Error('Email is required');
    }

    console.log(`📧 Sending welcome email to: ${email}`);

    const siteUrl = Deno.env.get('SITE_URL') || 'https://elec-mate.com';
    const loginUrl = `${siteUrl}/auth/signin`;

    // Generate professional HTML email (no confirmation needed - instant access)
    const emailHtml = generateWelcomeEmailHTML(fullName, loginUrl);

    // Send email via Resend
    const { data: emailData, error: emailError } = await resend.emails.send({
      from: 'Elec-Mate <founder@elec-mate.com>',
      to: [email],
      subject: 'Welcome to Elec-Mate! Your 7-Day Trial is Ready',
      html: emailHtml,
    });

    if (emailError) {
      console.error('Resend API error:', emailError);
      throw emailError;
    }

    console.log('Welcome email sent successfully:', emailData?.id);

    return new Response(
      JSON.stringify({ success: true, message: 'Welcome email sent', emailId: emailData?.id }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error: any) {
    console.error('Error in send-welcome-email function:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Failed to send welcome email' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
};

function generateWelcomeEmailHTML(fullName: string, loginUrl: string): string {
  const firstName = fullName.split(' ')[0] || 'there';
  const logoUrl = 'https://elec-mate.com/logo.jpg';

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Welcome to Elec-Mate</title>
  <!--[if mso]>
  <style type="text/css">
    body, table, td {font-family: Arial, sans-serif !important;}
  </style>
  <![endif]-->
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

        <!-- Main Container - Mobile optimised 480px max -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 480px; margin: 0 auto; background: linear-gradient(180deg, #1a1a1a 0%, #141414 100%); border-radius: 24px; overflow: hidden; border: 1px solid #2a2a2a;">

          <!-- Header with Logo -->
          <tr>
            <td class="content-padding" style="padding: 32px 24px 24px; text-align: center;">
              <!-- Logo Image -->
              <img src="${logoUrl}"
                   alt="Elec-Mate"
                   width="80"
                   height="80"
                   style="display: block; margin: 0 auto 20px; border-radius: 16px; box-shadow: 0 8px 24px rgba(251, 191, 36, 0.15);" />
              <h1 style="margin: 0; font-size: 26px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px;">
                Welcome to Elec-Mate
              </h1>
              <p style="margin: 8px 0 0; font-size: 15px; color: #888888; line-height: 1.5;">
                The UK's platform for electrical professionals
              </p>
            </td>
          </tr>

          <!-- Welcome Message -->
          <tr>
            <td class="content-padding" style="padding: 0 24px 24px;">
              <div style="background: linear-gradient(135deg, #1e1e1e 0%, #1a1a1a 100%); border-radius: 16px; padding: 24px; border: 1px solid #333333;">
                <p style="margin: 0 0 12px; font-size: 16px; color: #ffffff; line-height: 1.5;">
                  Hi ${firstName},
                </p>
                <p style="margin: 0 0 24px; font-size: 15px; color: #a3a3a3; line-height: 1.6;">
                  Your account is ready! You now have <strong style="color: #22c55e;">7 days of full access</strong> to explore everything Elec-Mate has to offer.
                </p>

                <!-- CTA Button - Large touch target -->
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                  <tr>
                    <td>
                      <a href="${loginUrl}" class="cta-button" style="display: block; padding: 18px 32px; background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); color: #0a0a0a; text-decoration: none; font-size: 16px; font-weight: 700; border-radius: 12px; text-align: center; box-shadow: 0 4px 16px rgba(251, 191, 36, 0.3);">
                        Open Elec-Mate
                      </a>
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>

          <!-- Trial Benefits - Compact -->
          <tr>
            <td class="content-padding" style="padding: 0 24px 24px;">
              <p style="margin: 0 0 16px; font-size: 12px; font-weight: 600; color: #666666; text-transform: uppercase; letter-spacing: 0.5px;">
                Included in your trial
              </p>

              <!-- Features Grid -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="padding: 12px 16px; background-color: #1a1a1a; border-radius: 12px; margin-bottom: 8px;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="width: 44px; vertical-align: middle;">
                          <div style="width: 40px; height: 40px; background: linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(34, 197, 94, 0.05) 100%); border-radius: 10px; text-align: center; line-height: 40px;">
                            <span style="color: #22c55e; font-size: 18px;">&#10003;</span>
                          </div>
                        </td>
                        <td style="padding-left: 14px; vertical-align: middle;">
                          <p style="margin: 0; font-size: 14px; font-weight: 600; color: #ffffff;">All AI Tools Unlocked</p>
                          <p style="margin: 2px 0 0; font-size: 13px; color: #888888;">Calculators, agents & assistants</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr><td style="height: 8px;"></td></tr>
                <tr>
                  <td style="padding: 12px 16px; background-color: #1a1a1a; border-radius: 12px;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="width: 44px; vertical-align: middle;">
                          <div style="width: 40px; height: 40px; background: linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(59, 130, 246, 0.05) 100%); border-radius: 10px; text-align: center; line-height: 40px;">
                            <span style="color: #3b82f6; font-size: 18px;">&#128218;</span>
                          </div>
                        </td>
                        <td style="padding-left: 14px; vertical-align: middle;">
                          <p style="margin: 0; font-size: 14px; font-weight: 600; color: #ffffff;">BS7671 AI Assistant</p>
                          <p style="margin: 2px 0 0; font-size: 13px; color: #888888;">Instant regulation answers</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr><td style="height: 8px;"></td></tr>
                <tr>
                  <td style="padding: 12px 16px; background-color: #1a1a1a; border-radius: 12px;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="width: 44px; vertical-align: middle;">
                          <div style="width: 40px; height: 40px; background: linear-gradient(135deg, rgba(251, 191, 36, 0.15) 0%, rgba(251, 191, 36, 0.05) 100%); border-radius: 10px; text-align: center; line-height: 40px;">
                            <span style="color: #fbbf24; font-size: 18px;">&#128179;</span>
                          </div>
                        </td>
                        <td style="padding-left: 14px; vertical-align: middle;">
                          <p style="margin: 0; font-size: 14px; font-weight: 600; color: #ffffff;">No Card Required</p>
                          <p style="margin: 2px 0 0; font-size: 13px; color: #888888;">7 days completely free</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
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
                &copy; ${new Date().getFullYear()} Elec-Mate &middot; Made in the UK
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

serve(handler);
