import { serve } from 'https://deno.land/std@0.190.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import { Resend, htmlToPlainText } from '../_shared/mailer.ts';
import { captureException } from '../_shared/sentry.ts';

const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

type Role = 'electrician' | 'apprentice' | 'default';

interface WelcomeEmailRequest {
  userId?: string;
  email: string;
  fullName: string;
  role?: string;
}

// Hosted onboarding assets (lead-magnets is a public bucket).
const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || 'https://jtwygbeceundfgnkirof.supabase.co';
const ASSET_BASE = `${SUPABASE_URL}/storage/v1/object/public/lead-magnets/onboarding`;
const PDF_URL = `${ASSET_BASE}/Elec-Mate-Getting-Started.pdf`;
const LOGO_URL = `${ASSET_BASE}/elec-mate-logo.png`;
const PDF_FILENAME = 'Elec-Mate-Getting-Started.pdf';

function normaliseRole(value?: string | null): Role {
  const v = (value || '').toLowerCase().trim();
  if (v === 'electrician') return 'electrician';
  if (v === 'apprentice') return 'apprentice';
  return 'default';
}

// Resolve role from (1) explicit body, (2) profiles.role by userId (with one
// short retry — the profile row is written milliseconds before this fires at
// signup), (3) auth metadata, (4) neutral default. Caller-independent.
async function resolveRole(
  userId: string | undefined,
  bodyRole: string | undefined,
  metaRole: string | undefined
): Promise<Role> {
  if (bodyRole) return normaliseRole(bodyRole);

  if (userId) {
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    if (serviceKey) {
      const supabase = createClient(SUPABASE_URL, serviceKey);
      for (let attempt = 0; attempt < 2; attempt++) {
        const { data } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', userId)
          .maybeSingle();
        if (data?.role) return normaliseRole(data.role);
        if (attempt === 0) await new Promise((r) => setTimeout(r, 600));
      }
    }
  }

  if (metaRole) return normaliseRole(metaRole);
  return 'default';
}

// Fetch the Getting Started PDF and return base64 for attachment. Never throws
// — a failed fetch must not block the welcome email (the download button still
// works as a fallback).
async function fetchPdfBase64(): Promise<string | null> {
  try {
    const res = await fetch(PDF_URL);
    if (!res.ok) {
      console.error(`Getting Started PDF fetch failed: ${res.status}`);
      return null;
    }
    const bytes = new Uint8Array(await res.arrayBuffer());
    let bin = '';
    const chunk = 0x8000;
    for (let i = 0; i < bytes.length; i += chunk) {
      bin += String.fromCharCode(...bytes.subarray(i, i + chunk));
    }
    return btoa(bin);
  } catch (err) {
    console.error('Getting Started PDF fetch error:', err instanceof Error ? err.message : err);
    return null;
  }
}

const handler = async (req: Request): Promise<Response> => {
  console.log('Send Welcome Email | started:', new Date().toISOString());

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    let payload: WelcomeEmailRequest;
    let metaRole: string | undefined;

    const body = await req.json();

    // Webhook payload (database trigger) vs direct invoke.
    if (body.type === 'INSERT' && body.record) {
      const record = body.record;
      metaRole = record.raw_user_meta_data?.role;
      payload = {
        userId: record.id,
        email: record.email,
        fullName: record.raw_user_meta_data?.full_name || 'there',
        role: record.raw_user_meta_data?.role,
      };
    } else {
      payload = body;
    }

    const { email, fullName, userId } = payload;
    if (!email) throw new Error('Email is required');

    const role = await resolveRole(userId, payload.role, metaRole);
    console.log(`Sending welcome email to ${email} (role: ${role})`);

    const siteUrl = Deno.env.get('SITE_URL') || 'https://elec-mate.com';
    const loginUrl = `${siteUrl}/auth/signin`;
    const firstName = (fullName || '').split(' ')[0] || 'there';

    const emailHtml = generateWelcomeEmailHTML(firstName, role, loginUrl);
    const emailText = htmlToPlainText(emailHtml);

    // Attach the Getting Started guide for everyone.
    const pdfBase64 = await fetchPdfBase64();
    const attachments = pdfBase64 ? [{ filename: PDF_FILENAME, content: pdfBase64 }] : undefined;

    const { data: emailData, error: emailError } = await resend.emails.send({
      from: 'Elec-Mate <founder@elec-mate.com>',
      to: [email],
      subject: 'Thank you for joining Elec-Mate',
      html: emailHtml,
      text: emailText,
      attachments,
    });

    if (emailError) {
      console.error('Mailer error:', emailError);
      throw emailError;
    }

    console.log('Welcome email sent:', emailData?.id, 'attachment:', !!attachments);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Welcome email sent',
        emailId: emailData?.id,
        role,
        attached: !!attachments,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error in send-welcome-email function:', error);
    await captureException(error, {
      functionName: 'send-welcome-email',
      requestUrl: req.url,
      requestMethod: req.method,
      extra: { hasBrevoKey: !!Deno.env.get('BREVO_API_KEY') },
    });
    return new Response(
      JSON.stringify({ error: error.message || 'Failed to send welcome email' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
};

// ─── Role-tuned copy ────────────────────────────────────────────
interface RoleCopy {
  intro: string;
  guideLine: string;
  listTitle: string;
  list: Array<{ t: string; d: string }>;
}

function copyFor(role: Role): RoleCopy {
  if (role === 'apprentice') {
    return {
      intro:
        'Thank you for joining Elec-Mate. Everything you need to get through your apprenticeship is in one place — your portfolio and off-the-job hours, AM2 and mock exams, Ask Dave (your AI mentor) and the full Study Centre.',
      guideLine:
        'A quick walkthrough to set up your profile and find your way around — so the whole app, including your AI mentor, is tuned to your course.',
      listTitle: 'What you have access to',
      list: [
        {
          t: 'Portfolio & off-the-job hours',
          d: 'Evidence mapped to your standard, hours tracked automatically',
        },
        { t: 'AM2 & mock exams', d: 'Practise on the simulator and see where you stand' },
        {
          t: 'Ask Dave & Study Centre',
          d: 'Your AI mentor plus Level 2, Level 3 and 2,000+ practice questions',
        },
      ],
    };
  }
  if (role === 'electrician') {
    return {
      intro:
        "Thank you for joining Elec-Mate. You've got the full toolkit — certificates, quotes and invoices, AI tools and site safety — all in one place, with your details flowing into everything you create.",
      guideLine:
        'Fifteen minutes to set up your profile — then every quote, invoice and certificate you create carries your details automatically.',
      listTitle: 'What you have access to',
      list: [
        { t: 'Certificates & testing', d: 'EICR, EIC, Minor Works, PAT, fire alarm and more' },
        { t: 'Business suite', d: 'Quotes, invoices, customers and getting paid' },
        { t: 'AI tools & calculators', d: 'Specialist agents, board scanner and 70+ calculators' },
      ],
    };
  }
  return {
    intro:
      'Thank you for joining Elec-Mate. Everything you need is in one place — certificates and reports, the business suite, AI tools and the Study Centre — with your details flowing into everything you create.',
    guideLine:
      'Fifteen minutes to set up your profile — then everything you create carries your details automatically.',
    listTitle: 'What you have access to',
    list: [
      { t: 'Certificates & reports', d: 'EICR, EIC, Minor Works, PAT, fire alarm and more' },
      { t: 'Business suite', d: 'Quotes, invoices, customers and getting paid' },
      {
        t: 'AI tools & Study Centre',
        d: 'Specialist agents, calculators and 2,000+ learning resources',
      },
    ],
  };
}

// ─── Email template (light, editorial — matches the Getting Started PDF) ───
function generateWelcomeEmailHTML(firstName: string, role: Role, loginUrl: string): string {
  const year = new Date().getFullYear();
  const c = copyFor(role);
  const font =
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

  const listRows = c.list
    .map(
      (item) => `
                <tr>
                  <td valign="top" style="padding: 0 0 14px;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td width="20" valign="top" style="padding-top: 5px;">
                          <div style="width: 7px; height: 7px; border-radius: 2px; background-color: #F3B70A;"></div>
                        </td>
                        <td valign="top">
                          <p style="margin: 0; font-size: 15px; font-weight: 600; color: #0C1B2A; line-height: 1.4;">${item.t}</p>
                          <p style="margin: 2px 0 0; font-size: 13px; color: #51606F; line-height: 1.5;">${item.d}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>`
    )
    .join('');

  return `<!DOCTYPE html>
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
  <title>Thank you for joining Elec-Mate</title>
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
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #F4F6F9;">
    <tr>
      <td align="center" style="padding: 40px 16px;">

        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 520px; background-color: #FFFFFF; border-radius: 18px; overflow: hidden; border: 1px solid #E6E9EE;">

          <!-- Header -->
          <tr>
            <td align="left" style="padding: 36px 36px 8px;" class="pad">
              <img src="${LOGO_URL}" alt="Elec-Mate" width="56" height="56" style="display: block; border-radius: 13px; border: 1px solid #E6E9EE;">
            </td>
          </tr>

          <!-- Title + thank-you -->
          <tr>
            <td align="left" style="padding: 18px 36px 0;" class="pad">
              <p style="margin: 0 0 6px; font-size: 11px; font-weight: 700; letter-spacing: 1.6px; text-transform: uppercase; color: #B5840A;">Welcome</p>
              <h1 style="margin: 0 0 18px; font-size: 27px; font-weight: 800; color: #0C1B2A; line-height: 1.12; letter-spacing: -0.5px;">Thank you for<br>joining Elec-Mate</h1>
              <p style="margin: 0 0 14px; font-size: 15px; color: #0C1B2A; line-height: 1.5;">Hi ${firstName},</p>
              <p style="margin: 0 0 24px; font-size: 15px; color: #51606F; line-height: 1.62;">${c.intro}</p>
            </td>
          </tr>

          <!-- Getting Started guide card -->
          <tr>
            <td style="padding: 0 36px 26px;" class="pad">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #FFFAEC; border: 1px solid #EFD489; border-radius: 14px;">
                <tr>
                  <td style="padding: 20px 22px;">
                    <p style="margin: 0 0 4px; font-size: 11px; font-weight: 700; letter-spacing: 1.4px; text-transform: uppercase; color: #B5840A;">Getting Started guide</p>
                    <p style="margin: 0 0 6px; font-size: 17px; font-weight: 700; color: #0C1B2A; line-height: 1.3;">Set it up once. It follows you everywhere.</p>
                    <p style="margin: 0 0 18px; font-size: 13px; color: #51606F; line-height: 1.55;">${c.guideLine} It's attached to this email, or download it below.</p>
                    <!--[if mso]>
                    <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${PDF_URL}" style="height:46px;v-text-anchor:middle;width:240px;" arcsize="24%" fillcolor="#0C1B2A">
                      <w:anchorlock/><center style="color:#FFFFFF;font-family:Arial,sans-serif;font-size:14px;font-weight:bold;">Download the guide (PDF)</center>
                    </v:roundrect>
                    <![endif]-->
                    <!--[if !mso]><!-->
                    <a href="${PDF_URL}" style="display: inline-block; padding: 13px 24px; background-color: #0C1B2A; color: #FFFFFF; font-size: 14px; font-weight: 700; border-radius: 10px;">Download the guide (PDF)</a>
                    <!--<![endif]-->
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- What you have access to -->
          <tr>
            <td style="padding: 0 36px 4px;" class="pad">
              <p style="margin: 0 0 14px; font-size: 11px; font-weight: 700; letter-spacing: 1.4px; text-transform: uppercase; color: #0C1B2A;">${c.listTitle}</p>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                ${listRows}
              </table>
            </td>
          </tr>

          <!-- Primary CTA -->
          <tr>
            <td align="left" style="padding: 12px 36px 32px;" class="pad">
              <!--[if mso]>
              <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${loginUrl}" style="height:52px;v-text-anchor:middle;width:200px;" arcsize="22%" fillcolor="#F3B70A">
                <w:anchorlock/><center style="color:#0C1B2A;font-family:Arial,sans-serif;font-size:15px;font-weight:bold;">Open Elec-Mate</center>
              </v:roundrect>
              <![endif]-->
              <!--[if !mso]><!-->
              <a href="${loginUrl}" style="display: inline-block; padding: 15px 32px; background-color: #F3B70A; color: #0C1B2A; font-size: 15px; font-weight: 700; border-radius: 11px;">Open Elec-Mate</a>
              <!--<![endif]-->
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 22px 36px; background-color: #F8FAFC; border-top: 1px solid #E6E9EE;" class="pad">
              <p style="margin: 0; font-size: 13px; color: #51606F; line-height: 1.55;">Questions, or not sure where something is? Just reply to this email — it comes straight to Andrew, the founder, and he reads every one.</p>
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
