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
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; background-color: #0a0a0a; -webkit-font-smoothing: antialiased;">

  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #0a0a0a;">
    <tr>
      <td style="padding: 40px 20px;">

        <!-- Main Container -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 560px; margin: 0 auto; background-color: #171717; border-radius: 16px; overflow: hidden;">

          <!-- Header with Logo -->
          <tr>
            <td style="padding: 40px 40px 32px; text-align: center; background: linear-gradient(135deg, #171717 0%, #1a1a1a 100%);">
              <div style="display: inline-block; padding: 16px 20px; background-color: #fbbf24; border-radius: 12px; margin-bottom: 24px;">
                <span style="font-size: 28px; line-height: 1;">&#9889;</span>
              </div>
              <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px;">
                Welcome to <span style="color: #fbbf24;">Elec-Mate</span>
              </h1>
              <p style="margin: 12px 0 0; font-size: 15px; color: #a3a3a3;">
                The UK's smartest platform for electrical professionals
              </p>
            </td>
          </tr>

          <!-- Welcome Section -->
          <tr>
            <td style="padding: 0 40px 32px;">
              <div style="background-color: #262626; border-radius: 12px; padding: 24px; border: 1px solid #404040;">
                <p style="margin: 0 0 16px; font-size: 15px; color: #e5e5e5; line-height: 1.6;">
                  Hi ${firstName},
                </p>
                <p style="margin: 0 0 20px; font-size: 15px; color: #a3a3a3; line-height: 1.6;">
                  Your account is ready! You now have <strong style="color: #22c55e;">7 days of full access</strong> to explore everything Elec-Mate has to offer.
                </p>

                <!-- Get Started Button -->
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                  <tr>
                    <td style="text-align: center;">
                      <a href="${loginUrl}" style="display: inline-block; padding: 14px 32px; background-color: #fbbf24; color: #0a0a0a; text-decoration: none; font-size: 15px; font-weight: 600; border-radius: 8px;">
                        Get Started
                      </a>
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>

          <!-- Trial Benefits -->
          <tr>
            <td style="padding: 0 40px 32px;">
              <p style="margin: 0 0 16px; font-size: 13px; font-weight: 600; color: #a3a3a3; text-transform: uppercase; letter-spacing: 0.5px;">
                What's included in your free trial
              </p>

              <!-- Feature 1 -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 12px;">
                <tr>
                  <td style="width: 40px; vertical-align: top;">
                    <div style="width: 32px; height: 32px; background-color: #22c55e20; border-radius: 8px; text-align: center; line-height: 32px;">
                      <span style="color: #22c55e; font-size: 16px;">&#10003;</span>
                    </div>
                  </td>
                  <td style="vertical-align: top; padding-left: 12px;">
                    <p style="margin: 0 0 4px; font-size: 14px; font-weight: 600; color: #ffffff;">Full Platform Access</p>
                    <p style="margin: 0; font-size: 13px; color: #a3a3a3;">All calculators, AI agents, and tools unlocked</p>
                  </td>
                </tr>
              </table>

              <!-- Feature 2 -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 12px;">
                <tr>
                  <td style="width: 40px; vertical-align: top;">
                    <div style="width: 32px; height: 32px; background-color: #22c55e20; border-radius: 8px; text-align: center; line-height: 32px;">
                      <span style="color: #22c55e; font-size: 16px;">&#10003;</span>
                    </div>
                  </td>
                  <td style="vertical-align: top; padding-left: 12px;">
                    <p style="margin: 0 0 4px; font-size: 14px; font-weight: 600; color: #ffffff;">BS7671 AI Assistant</p>
                    <p style="margin: 0; font-size: 13px; color: #a3a3a3;">Ask anything about electrical regulations</p>
                  </td>
                </tr>
              </table>

              <!-- Feature 3 -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 12px;">
                <tr>
                  <td style="width: 40px; vertical-align: top;">
                    <div style="width: 32px; height: 32px; background-color: #22c55e20; border-radius: 8px; text-align: center; line-height: 32px;">
                      <span style="color: #22c55e; font-size: 16px;">&#10003;</span>
                    </div>
                  </td>
                  <td style="vertical-align: top; padding-left: 12px;">
                    <p style="margin: 0 0 4px; font-size: 14px; font-weight: 600; color: #ffffff;">No Credit Card Required</p>
                    <p style="margin: 0; font-size: 13px; color: #a3a3a3;">Try everything risk-free for 7 days</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding: 0 40px;">
              <div style="height: 1px; background-color: #404040;"></div>
            </td>
          </tr>

          <!-- Help Section -->
          <tr>
            <td style="padding: 32px 40px;">
              <p style="margin: 0 0 8px; font-size: 14px; color: #a3a3a3;">
                Need help getting started?
              </p>
              <p style="margin: 0; font-size: 14px; color: #e5e5e5;">
                Reply to this email or reach us at <a href="mailto:founder@elec-mate.com" style="color: #fbbf24; text-decoration: none;">founder@elec-mate.com</a>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; background-color: #0a0a0a; text-align: center;">
              <p style="margin: 0 0 8px; font-size: 12px; color: #737373;">
                &copy; ${new Date().getFullYear()} Elec-Mate. All rights reserved.
              </p>
              <p style="margin: 0; font-size: 11px; color: #525252;">
                You're receiving this because you signed up at elec-mate.com
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
