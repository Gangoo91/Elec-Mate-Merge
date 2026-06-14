import { serve } from 'https://deno.land/std@0.190.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { Resend } from '../_shared/mailer.ts';

const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

interface PasswordResetRequest {
  email: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log('🔐 Send Password Reset | Started:', new Date().toISOString());

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email } = (await req.json()) as PasswordResetRequest;

    if (!email) {
      throw new Error('Email is required');
    }

    console.log(`🔐 Processing password reset for: ${email}`);

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    const siteUrl = Deno.env.get('SITE_URL') || 'https://elec-mate.com';

    // Generate recovery link using admin API
    const { data, error: linkError } = await supabaseAdmin.auth.admin.generateLink({
      type: 'recovery',
      email: email,
    });

    // Always return success to prevent user enumeration
    if (linkError || !data) {
      console.log(
        'User not found or error generating link (returning success anyway):',
        linkError?.message
      );
      return new Response(
        JSON.stringify({
          success: true,
          message: 'If an account exists, a password reset email has been sent.',
        }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Extract token from the generated link
    const generatedUrl = new URL(data.properties.action_link);
    const tokenHash = generatedUrl.searchParams.get('token');

    if (!tokenHash) {
      console.error('No token found in generated link');
      return new Response(
        JSON.stringify({
          success: true,
          message: 'If an account exists, a password reset email has been sent.',
        }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const resetLink = `${siteUrl}/auth/reset-password?token_hash=${tokenHash}&type=recovery`;

    console.log(`🔐 Generated reset link for: ${email}`);

    // Get user's name if available
    const { data: userData } = await supabaseAdmin.auth.admin.getUserById(data.user.id);
    const fullName = userData?.user?.user_metadata?.full_name || '';
    const firstName = fullName ? fullName.split(' ')[0] : '';

    const emailHtml = generatePasswordResetEmailHTML(resetLink, firstName);

    const { data: emailData, error: emailError } = await resend.emails.send({
      from: 'Elec-Mate <founder@elec-mate.com>',
      to: [email],
      subject: 'Reset Your Elec-Mate Password',
      html: emailHtml,
    });

    if (emailError) {
      console.error('Resend API error:', emailError);
      return new Response(
        JSON.stringify({
          success: true,
          message: 'If an account exists, a password reset email has been sent.',
        }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    console.log('Password reset email sent successfully:', emailData?.id);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'If an account exists, a password reset email has been sent.',
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in send-password-reset function:', error);
    return new Response(
      JSON.stringify({
        success: true,
        message: 'If an account exists, a password reset email has been sent.',
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
};

// ─── Email template (light, editorial — matches the welcome email) ───
function generatePasswordResetEmailHTML(resetLink: string, firstName: string): string {
  // Same hosted logo as the welcome email (public lead-magnets bucket).
  const supabaseUrl = Deno.env.get('SUPABASE_URL') || 'https://jtwygbeceundfgnkirof.supabase.co';
  const logoUrl = `${supabaseUrl}/storage/v1/object/public/lead-magnets/onboarding/elec-mate-logo.png`;
  const greeting = firstName ? `Hi ${firstName},` : 'Hi there,';
  const year = new Date().getFullYear();
  const font =
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

  return `<!DOCTYPE html>
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="x-apple-disable-message-reformatting">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
  <title>Reset your password</title>
  <!--[if mso]>
  <noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
  <style>table {border-collapse: collapse;} td,th,div,p,a,h1,h2,h3 {font-family: Arial, sans-serif;}</style>
  <![endif]-->
  <style>
    body { margin: 0; padding: 0; width: 100%; background-color: #F4F6F9; }
    a { text-decoration: none; }
    @media screen and (max-width: 480px) {
      .pad { padding-left: 24px !important; padding-right: 24px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #F4F6F9; font-family: ${font}; -webkit-font-smoothing: antialiased;">
  <!-- Preheader (hidden, shows in inbox preview) -->
  <div style="display: none; max-height: 0; overflow: hidden; mso-hide: all;">
    Reset your Elec-Mate password — this link expires in 1 hour.
    &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;
  </div>

  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #F4F6F9;">
    <tr>
      <td align="center" style="padding: 40px 16px;">

        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 520px; background-color: #FFFFFF; border-radius: 18px; overflow: hidden; border: 1px solid #E6E9EE;">

          <!-- Header -->
          <tr>
            <td align="left" style="padding: 36px 36px 8px;" class="pad">
              <img src="${logoUrl}" alt="Elec-Mate" width="56" height="56" style="display: block; border-radius: 13px; border: 1px solid #E6E9EE;">
            </td>
          </tr>

          <!-- Title + intro -->
          <tr>
            <td align="left" style="padding: 18px 36px 0;" class="pad">
              <p style="margin: 0 0 6px; font-size: 11px; font-weight: 700; letter-spacing: 1.6px; text-transform: uppercase; color: #B5840A;">Security</p>
              <h1 style="margin: 0 0 18px; font-size: 27px; font-weight: 800; color: #0C1B2A; line-height: 1.12; letter-spacing: -0.5px;">Reset your password</h1>
              <p style="margin: 0 0 14px; font-size: 15px; color: #0C1B2A; line-height: 1.5;">${greeting}</p>
              <p style="margin: 0 0 24px; font-size: 15px; color: #51606F; line-height: 1.62;">We received a request to reset the password on your Elec-Mate account. Choose a new one using the button below. This link expires in <strong style="color: #0C1B2A;">1 hour</strong>.</p>
            </td>
          </tr>

          <!-- Primary CTA -->
          <tr>
            <td align="left" style="padding: 0 36px 26px;" class="pad">
              <!--[if mso]>
              <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${resetLink}" style="height:52px;v-text-anchor:middle;width:220px;" arcsize="22%" fillcolor="#F3B70A">
                <w:anchorlock/><center style="color:#0C1B2A;font-family:Arial,sans-serif;font-size:15px;font-weight:bold;">Reset password</center>
              </v:roundrect>
              <![endif]-->
              <!--[if !mso]><!-->
              <a href="${resetLink}" style="display: inline-block; padding: 15px 32px; background-color: #F3B70A; color: #0C1B2A; font-size: 15px; font-weight: 700; border-radius: 11px;">Reset password</a>
              <!--<![endif]-->
            </td>
          </tr>

          <!-- Security notice card -->
          <tr>
            <td style="padding: 0 36px 26px;" class="pad">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #FFFAEC; border: 1px solid #EFD489; border-radius: 14px;">
                <tr>
                  <td style="padding: 18px 20px;">
                    <p style="margin: 0 0 4px; font-size: 11px; font-weight: 700; letter-spacing: 1.4px; text-transform: uppercase; color: #B5840A;">Didn't request this?</p>
                    <p style="margin: 0; font-size: 13px; color: #51606F; line-height: 1.55;">You can safely ignore this email — your password won't change unless you use the button above.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Fallback link -->
          <tr>
            <td style="padding: 0 36px 30px;" class="pad">
              <p style="margin: 0 0 6px; font-size: 13px; color: #8B95A3;">Button not working? Copy and paste this link:</p>
              <p style="margin: 0; font-size: 12px; color: #51606F; word-break: break-all; line-height: 1.5;">${resetLink}</p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 22px 36px; background-color: #F8FAFC; border-top: 1px solid #E6E9EE;" class="pad">
              <p style="margin: 0; font-size: 13px; color: #51606F; line-height: 1.55;">Questions? Just reply to this email — it comes straight to Andrew, the founder, and he reads every one.</p>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding: 18px 36px 26px; background-color: #F8FAFC;">
              <p style="margin: 0 0 3px; font-size: 12px; font-weight: 600; color: #0C1B2A;">Your trade. Your app.</p>
              <p style="margin: 0; font-size: 11px; color: #8B95A3;">&copy; ${year} Elec-Mate &middot; Made in the UK</p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>
</body>
</html>`;
}

serve(handler);
