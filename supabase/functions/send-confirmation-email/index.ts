import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

interface ConfirmationEmailRequest {
  email: string;
  fullName?: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log('📧 Send Confirmation Email | Started:', new Date().toISOString());

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, fullName } = await req.json() as ConfirmationEmailRequest;

    if (!email) {
      throw new Error('Email is required');
    }

    console.log(`📧 Processing email confirmation for: ${email}`);

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    const siteUrl = Deno.env.get('SITE_URL') || 'https://elec-mate.com';

    // Generate signup confirmation link using admin API
    const { data, error: linkError } = await supabaseAdmin.auth.admin.generateLink({
      type: 'signup',
      email: email,
    });

    if (linkError || !data) {
      console.error('Error generating confirmation link:', linkError?.message);
      throw new Error('Failed to generate confirmation link');
    }

    // Extract token from the generated link
    const generatedUrl = new URL(data.properties.action_link);
    const token = generatedUrl.searchParams.get('token');

    if (!token) {
      console.error('No token found in generated link');
      throw new Error('Failed to extract confirmation token');
    }

    const confirmLink = `${siteUrl}/auth/confirm-email?token_hash=${token}&type=signup`;

    console.log(`📧 Generated confirmation link for: ${email}`);

    const firstName = fullName ? fullName.split(' ')[0] : '';
    const emailHtml = generateConfirmationEmailHTML(firstName, confirmLink);

    const { data: emailData, error: emailError } = await resend.emails.send({
      from: 'Elec-Mate <founder@elec-mate.com>',
      to: [email],
      subject: 'Confirm Your Elec-Mate Account',
      html: emailHtml,
    });

    if (emailError) {
      console.error('Resend API error:', emailError);
      throw emailError;
    }

    console.log('Confirmation email sent successfully:', emailData?.id);

    return new Response(
      JSON.stringify({ success: true, message: 'Confirmation email sent', emailId: emailData?.id }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error: any) {
    console.error('Error in send-confirmation-email function:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Failed to send confirmation email' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
};

function generateConfirmationEmailHTML(firstName: string, confirmLink: string): string {
  const logoUrl = 'https://elec-mate.com/logo.jpg';
  const greeting = firstName ? `Hi ${firstName},` : 'Hi there,';
  const year = new Date().getFullYear();

  return `
<!DOCTYPE html>
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="x-apple-disable-message-reformatting">
  <meta name="color-scheme" content="dark">
  <meta name="supported-color-schemes" content="dark">
  <title>Confirm Your Email</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <style>
    table {border-collapse: collapse;}
    td, th, div, p, a, h1, h2, h3, h4, h5, h6 {font-family: Arial, sans-serif;}
  </style>
  <![endif]-->
  <style>
    :root { color-scheme: dark; supported-color-schemes: dark; }
    body { margin: 0; padding: 0; width: 100%; background-color: #000000; }
    table { border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; }
    a { color: #fbbf24; text-decoration: none; }
    @media screen and (max-width: 600px) {
      .mobile-padding { padding-left: 20px !important; padding-right: 20px !important; }
      .mobile-stack { display: block !important; width: 100% !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #000000; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <!-- Preheader text -->
  <div style="display: none; max-height: 0; overflow: hidden; mso-hide: all;">
    Welcome to Elec-Mate! Confirm your email to start your 7-day free trial.
    &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;
  </div>

  <!-- Email wrapper -->
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #000000;">
    <tr>
      <td align="center" style="padding: 40px 16px;">

        <!-- Email container -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 480px; background-color: #111111; border-radius: 20px; overflow: hidden; border: 1px solid #262626;">

          <!-- Logo & Header -->
          <tr>
            <td align="center" style="padding: 40px 32px 32px;" class="mobile-padding">
              <img src="${logoUrl}" alt="Elec-Mate" width="72" height="72" style="display: block; border-radius: 14px; margin-bottom: 24px;">
              <h1 style="margin: 0; font-size: 24px; font-weight: 700; color: #ffffff; line-height: 1.3;">
                Welcome to Elec-Mate
              </h1>
              <p style="margin: 12px 0 0; font-size: 15px; color: #a3a3a3; line-height: 1.5;">
                One quick step to get started
              </p>
            </td>
          </tr>

          <!-- Main content card -->
          <tr>
            <td style="padding: 0 32px 32px;" class="mobile-padding">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #1a1a1a; border-radius: 16px; border: 1px solid #262626;">
                <tr>
                  <td style="padding: 28px;">
                    <p style="margin: 0 0 16px; font-size: 16px; color: #ffffff; line-height: 1.5;">
                      ${greeting}
                    </p>
                    <p style="margin: 0 0 28px; font-size: 15px; color: #d4d4d4; line-height: 1.6;">
                      Thanks for signing up! Please confirm your email to activate your account and start your <strong style="color: #22c55e;">7-day free trial</strong>.
                    </p>

                    <!-- CTA Button -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td align="center">
                          <!--[if mso]>
                          <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${confirmLink}" style="height:56px;v-text-anchor:middle;width:100%;" arcsize="21%" fillcolor="#fbbf24">
                            <w:anchorlock/>
                            <center style="color:#000000;font-family:Arial,sans-serif;font-size:16px;font-weight:bold;">Confirm Email Address</center>
                          </v:roundrect>
                          <![endif]-->
                          <!--[if !mso]><!-->
                          <a href="${confirmLink}" style="display: block; padding: 18px 32px; background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); color: #000000; font-size: 16px; font-weight: 700; text-decoration: none; border-radius: 12px; text-align: center;">
                            Confirm Email Address
                          </a>
                          <!--<![endif]-->
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- What's included -->
          <tr>
            <td style="padding: 0 32px 24px;" class="mobile-padding">
              <p style="margin: 0 0 16px; font-size: 12px; font-weight: 600; color: #737373; text-transform: uppercase; letter-spacing: 1px;">
                What's included in your trial
              </p>

              <!-- Feature 1 -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 12px;">
                <tr>
                  <td style="padding: 16px; background-color: #1a1a1a; border-radius: 12px; border: 1px solid #262626;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td width="48" valign="middle">
                          <div style="width: 40px; height: 40px; background-color: rgba(34, 197, 94, 0.15); border-radius: 10px; text-align: center; line-height: 40px;">
                            <span style="color: #22c55e; font-size: 18px;">✓</span>
                          </div>
                        </td>
                        <td style="padding-left: 14px;" valign="middle">
                          <p style="margin: 0; font-size: 15px; font-weight: 600; color: #ffffff;">All AI Tools Unlocked</p>
                          <p style="margin: 4px 0 0; font-size: 13px; color: #a3a3a3;">Calculators, agents & assistants</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Feature 2 -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 12px;">
                <tr>
                  <td style="padding: 16px; background-color: #1a1a1a; border-radius: 12px; border: 1px solid #262626;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td width="48" valign="middle">
                          <div style="width: 40px; height: 40px; background-color: rgba(59, 130, 246, 0.15); border-radius: 10px; text-align: center; line-height: 40px;">
                            <span style="color: #3b82f6; font-size: 18px;">📘</span>
                          </div>
                        </td>
                        <td style="padding-left: 14px;" valign="middle">
                          <p style="margin: 0; font-size: 15px; font-weight: 600; color: #ffffff;">BS7671 AI Assistant</p>
                          <p style="margin: 4px 0 0; font-size: 13px; color: #a3a3a3;">Instant regulation answers</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Feature 3 -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="padding: 16px; background-color: #1a1a1a; border-radius: 12px; border: 1px solid #262626;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td width="48" valign="middle">
                          <div style="width: 40px; height: 40px; background-color: rgba(251, 191, 36, 0.15); border-radius: 10px; text-align: center; line-height: 40px;">
                            <span style="color: #fbbf24; font-size: 18px;">💳</span>
                          </div>
                        </td>
                        <td style="padding-left: 14px;" valign="middle">
                          <p style="margin: 0; font-size: 15px; font-weight: 600; color: #ffffff;">No Card Required</p>
                          <p style="margin: 4px 0 0; font-size: 13px; color: #a3a3a3;">7 days completely free</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Expiry notice -->
          <tr>
            <td style="padding: 0 32px 32px;" class="mobile-padding">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #1a1a1a; border-radius: 12px; border: 1px solid #262626;">
                <tr>
                  <td align="center" style="padding: 16px;">
                    <p style="margin: 0; font-size: 14px; color: #d4d4d4; line-height: 1.5;">
                      This link expires in <strong style="color: #fbbf24;">24 hours</strong>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Alternative link -->
          <tr>
            <td style="padding: 0 32px 32px;" class="mobile-padding">
              <p style="margin: 0 0 8px; font-size: 13px; color: #737373;">
                Button not working? Copy this link:
              </p>
              <p style="margin: 0; font-size: 12px; color: #fbbf24; word-break: break-all; line-height: 1.5;">
                ${confirmLink}
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 32px; background-color: #0a0a0a; border-top: 1px solid #1a1a1a;" class="mobile-padding">
              <p style="margin: 0 0 8px; font-size: 13px; color: #737373;">
                Questions? Contact us at
              </p>
              <a href="mailto:founder@elec-mate.com" style="font-size: 14px; color: #fbbf24; font-weight: 500;">
                founder@elec-mate.com
              </a>
            </td>
          </tr>

          <!-- Copyright -->
          <tr>
            <td align="center" style="padding: 20px 32px; background-color: #000000;">
              <p style="margin: 0; font-size: 12px; color: #525252;">
                © ${year} Elec-Mate · Made in the UK
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
