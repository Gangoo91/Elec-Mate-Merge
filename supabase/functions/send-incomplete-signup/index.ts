import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { Resend } from 'npm:resend@2.0.0';

const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface SendRequest {
  emails: string[];
  test?: boolean;
  subject?: string;
  html?: string;
}

function generateEmailHTML(): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="dark">
  <title>Your Elec-Mate account is incomplete</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #111111; -webkit-font-smoothing: antialiased;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #111111;">
    <tr>
      <td style="padding: 40px 24px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 520px; margin: 0 auto;">

          <!-- Logo -->
          <tr>
            <td style="padding: 0 0 32px; text-align: center;">
              <img src="https://elec-mate.com/logo.jpg" alt="Elec-Mate" width="56" height="56" style="display: block; margin: 0 auto; border-radius: 12px;" />
            </td>
          </tr>

          <!-- Body copy -->
          <tr>
            <td>
              <p style="margin: 0 0 20px; font-size: 16px; color: #ffffff; line-height: 1.7;">
                Hi,
              </p>
              <p style="margin: 0 0 20px; font-size: 16px; color: #ffffff; line-height: 1.7;">
                I'm Andrew, the founder of Elec-Mate. I noticed you started signing up but didn't complete checkout — so your account isn't active yet and you don't have access to the app.
              </p>
              <p style="margin: 0 0 20px; font-size: 16px; color: #ffffff; line-height: 1.7;">
                Just to be clear — <strong style="color: #22c55e;">you haven't been charged anything</strong> and there's no payment on file.
              </p>
              <p style="margin: 0 0 32px; font-size: 16px; color: #ffffff; line-height: 1.7;">
                If you'd still like to give it a go, just sign in and pick a plan to get started:
              </p>
            </td>
          </tr>

          <!-- CTA Button -->
          <tr>
            <td style="padding: 0 0 32px;">
              <a href="https://elec-mate.com" style="display: block; padding: 18px 32px; background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); color: #0a0a0a; text-decoration: none; font-size: 16px; font-weight: 700; border-radius: 12px; text-align: center;">
                Complete your signup
              </a>
            </td>
          </tr>

          <!-- Pricing line -->
          <tr>
            <td>
              <p style="margin: 0 0 28px; font-size: 15px; color: #ffffff; line-height: 1.7;">
                Plans start from £4.99/month for apprentices and £9.99/month for qualified electricians. Cancel anytime.
              </p>
              <p style="margin: 0 0 36px; font-size: 15px; color: #ffffff; line-height: 1.7;">
                If you've got any questions, just reply to this email — I read every one.
              </p>
            </td>
          </tr>

          <!-- Sign off -->
          <tr>
            <td>
              <p style="margin: 0 0 4px; font-size: 16px; color: #ffffff;">
                Cheers,
              </p>
              <p style="margin: 0 0 2px; font-size: 16px; color: #ffffff; font-weight: 600;">
                Andrew
              </p>
              <p style="margin: 0; font-size: 14px; color: #fbbf24;">
                Founder, Elec-Mate
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
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const {
      emails,
      test,
      subject: customSubject,
      html: customHtml,
    } = (await req.json()) as SendRequest;

    if (!emails || !Array.isArray(emails) || emails.length === 0) {
      throw new Error('emails array is required');
    }

    const emailHtml = customHtml || generateEmailHTML();
    const defaultSubject = customSubject || 'Your Elec-Mate account is incomplete';
    const subject = test ? `[TEST] ${defaultSubject}` : defaultSubject;

    const results: { email: string; success: boolean; error?: string }[] = [];

    for (const email of emails) {
      try {
        const { data, error } = await resend.emails.send({
          from: 'Andrew at Elec-Mate <founder@elec-mate.com>',
          to: [email.trim().toLowerCase()],
          subject,
          html: emailHtml,
          reply_to: 'founder@elec-mate.com',
        });

        if (error) {
          console.error(`Failed to send to ${email}:`, error);
          results.push({ email, success: false, error: error.message });
        } else {
          console.log(`Sent to ${email}: ${data?.id}`);
          results.push({ email, success: true });
        }
      } catch (err: any) {
        console.error(`Error sending to ${email}:`, err);
        results.push({ email, success: false, error: err.message });
      }
    }

    const sent = results.filter((r) => r.success).length;
    const failed = results.filter((r) => !r.success).length;

    return new Response(JSON.stringify({ sent, failed, results }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});
