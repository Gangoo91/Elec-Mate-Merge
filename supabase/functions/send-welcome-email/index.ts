import { serve } from 'https://deno.land/std@0.190.0/http/server.ts';
import { Resend } from '../_shared/mailer.ts';
import { captureException } from '../_shared/sentry.ts';

const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
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
      subject: 'Welcome to Elec-Mate — Your Account is Ready',
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error in send-welcome-email function:', error);

    // Capture to Sentry
    await captureException(error, {
      functionName: 'send-welcome-email',
      requestUrl: req.url,
      requestMethod: req.method,
      extra: { hasResendKey: !!Deno.env.get('RESEND_API_KEY') },
    });

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
  const year = new Date().getFullYear();

  return `
<!DOCTYPE html>
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="color-scheme" content="dark">
  <meta name="supported-color-schemes" content="dark">
  <title>Welcome to Elec-Mate</title>
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
    body { margin: 0; padding: 0; width: 100%; background-color: #0a0a0a; }
    @media screen and (max-width: 480px) {
      .mobile-padding { padding-left: 20px !important; padding-right: 20px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">

  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #0a0a0a;">
    <tr>
      <td align="center" style="padding: 40px 16px;">

        <!-- Email container -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 480px; background-color: #111111; border-radius: 20px; overflow: hidden; border: 1px solid #262626;">

          <!-- Logo & Header -->
          <tr>
            <td align="center" style="padding: 40px 32px 24px;" class="mobile-padding">
              <img src="${logoUrl}" alt="Elec-Mate" width="72" height="72" style="display: block; border-radius: 14px; margin-bottom: 20px;">
              <h1 style="margin: 0; font-size: 24px; font-weight: 700; color: #ffffff; line-height: 1.3;">
                Welcome to Elec-Mate
              </h1>
            </td>
          </tr>

          <!-- Welcome Message -->
          <tr>
            <td style="padding: 0 32px 24px;" class="mobile-padding">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #1a1a1a; border-radius: 16px; border: 1px solid #262626;">
                <tr>
                  <td style="padding: 24px;">
                    <p style="margin: 0 0 12px; font-size: 16px; color: #ffffff; line-height: 1.5;">
                      Hi ${firstName},
                    </p>
                    <p style="margin: 0 0 24px; font-size: 15px; color: #ffffff; line-height: 1.6;">
                      Your account is ready! Here's what you can do with Elec-Mate.
                    </p>

                    <!-- CTA Button -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td align="center">
                          <!--[if mso]>
                          <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${loginUrl}" style="height:56px;v-text-anchor:middle;width:100%;" arcsize="21%" fillcolor="#fbbf24">
                            <w:anchorlock/>
                            <center style="color:#0a0a0a;font-family:Arial,sans-serif;font-size:16px;font-weight:bold;">Open Elec-Mate</center>
                          </v:roundrect>
                          <![endif]-->
                          <!--[if !mso]><!-->
                          <a href="${loginUrl}" style="display: block; padding: 18px 32px; background: #FFD700; color: #0a0a0a; font-size: 16px; font-weight: 700; text-decoration: none; border-radius: 12px; text-align: center;">
                            Open Elec-Mate
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

          <!-- What you can do -->
          <tr>
            <td style="padding: 0 32px 16px;" class="mobile-padding">
              <p style="margin: 0; font-size: 12px; font-weight: 600; color: #ffffff; text-transform: uppercase; letter-spacing: 1px;">
                What you can do
              </p>
            </td>
          </tr>

          <!-- Feature cards -->
          <tr>
            <td style="padding: 0 32px 24px;" class="mobile-padding">

              <!-- Feature 1: Certificates -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 10px;">
                <tr>
                  <td style="padding: 14px 16px; background-color: #1a1a1a; border-radius: 12px; border: 1px solid #262626;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td width="48" valign="middle">
                          <div style="width: 40px; height: 40px; background-color: rgba(34, 197, 94, 0.15); border-radius: 10px; text-align: center; line-height: 40px;">
                            <span style="color: #22c55e; font-size: 18px;">&#10003;</span>
                          </div>
                        </td>
                        <td style="padding-left: 14px;" valign="middle">
                          <p style="margin: 0; font-size: 15px; font-weight: 600; color: #ffffff;">Certificates & Testing</p>
                          <p style="margin: 4px 0 0; font-size: 13px; color: #ffffff;">EICR, EIC, minor works, PAT testing, fire alarm & more</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Feature 2: AI Tools -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 10px;">
                <tr>
                  <td style="padding: 14px 16px; background-color: #1a1a1a; border-radius: 12px; border: 1px solid #262626;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td width="48" valign="middle">
                          <div style="width: 40px; height: 40px; background-color: rgba(59, 130, 246, 0.15); border-radius: 10px; text-align: center; line-height: 40px;">
                            <span style="color: #3b82f6; font-size: 18px;">&#129302;</span>
                          </div>
                        </td>
                        <td style="padding-left: 14px;" valign="middle">
                          <p style="margin: 0; font-size: 15px; font-weight: 600; color: #ffffff;">AI-Powered Tools</p>
                          <p style="margin: 4px 0 0; font-size: 13px; color: #ffffff;">8 specialist agents, board scanner, circuit designer & cost engineer</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Feature 3: Study Centre -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="padding: 14px 16px; background-color: #1a1a1a; border-radius: 12px; border: 1px solid #262626;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td width="48" valign="middle">
                          <div style="width: 40px; height: 40px; background-color: rgba(251, 191, 36, 0.15); border-radius: 10px; text-align: center; line-height: 40px;">
                            <span style="color: #fbbf24; font-size: 18px;">&#128218;</span>
                          </div>
                        </td>
                        <td style="padding-left: 14px;" valign="middle">
                          <p style="margin: 0; font-size: 15px; font-weight: 600; color: #ffffff;">Study Centre</p>
                          <p style="margin: 4px 0 0; font-size: 13px; color: #ffffff;">2,000+ questions, AM2 prep, BS 7671 guides & mock exams</p>
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
            <td style="padding: 24px 32px; background-color: #0a0a0a; border-top: 1px solid #1a1a1a;" class="mobile-padding">
              <p style="margin: 0 0 4px; font-size: 13px; color: #ffffff;">
                Questions? Reply to this email — we're here to help.
              </p>
            </td>
          </tr>

          <!-- Copyright -->
          <tr>
            <td align="center" style="padding: 16px 32px 24px; background-color: #0a0a0a;">
              <p style="margin: 0; font-size: 12px; color: #ffffff;">
                &copy; ${year} Elec-Mate &middot; Made in the UK
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
