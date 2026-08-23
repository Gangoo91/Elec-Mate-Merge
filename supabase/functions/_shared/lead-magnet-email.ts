import { Resend } from './mailer.ts';

/**
 * Lead-magnet delivery email — one template, parameterised per magnet.
 *
 * DESIGN: deliberately mirrors `send-welcome-email` (the house look Andrew
 * signed off), NOT the `renderEmailShell` system used for electrician→client
 * mail. Same palette and geometry, so a recipient who has had the welcome email
 * recognises this instantly:
 *   page  #F4F6F9   ·  card 520px / radius 18px / border #E6E9EE
 *   ink   #0C1B2A   ·  muted #51606F  ·  eyebrow #B5840A
 *   gold  #F3B70A   ·  highlight panel #FFFAEC on #EFD489
 *   logo  56×56, radius 13px        ·  footer #F8FAFC
 * Keep the two in step — if the welcome email is restyled, restyle this too.
 *
 * DELIVERY: the file is ATTACHED (same as the welcome email attaching the
 * Getting Started guide) with a download link kept as a fallback, because an
 * attachment can be stripped by a mail gateway and the link then rescues it.
 *
 * Fire-and-forget from the caller — never throws.
 */
export interface LeadMagnet {
  /** Short name used in the subject and headline, e.g. "UK electrical symbols chart". */
  name: string;
  /** Absolute URL of the file — used for the fallback link AND fetched for the attachment. */
  url: string;
  /** Filename the recipient sees on the attachment. */
  filename: string;
  /** One or two sentences describing what they're getting. */
  blurb: string;
  /** Short facts listed in the highlight panel. */
  facts?: string[];
  /** utm_medium for the trial link in the footer. */
  utmMedium: string;
}

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || 'https://jtwygbeceundfgnkirof.supabase.co';
const LOGO_URL = `${SUPABASE_URL}/storage/v1/object/public/lead-magnets/onboarding/elec-mate-logo.png`;

const FONT = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

const esc = (s: string) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/**
 * Fetch the magnet and return base64 for attachment. Never throws — a failed
 * fetch must not block the email, because the download link still works.
 */
async function fetchBase64(url: string): Promise<string | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.error(`[lead-magnet] attachment fetch failed: ${res.status} ${url}`);
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
    console.error('[lead-magnet] attachment fetch error:', err instanceof Error ? err.message : err);
    return null;
  }
}

function buildHtml(firstName: string | undefined, magnet: LeadMagnet, attached: boolean): string {
  const year = new Date().getFullYear();
  const greeting = firstName ? `Hi ${esc(firstName)},` : 'Hi mate,';
  const trialUrl =
    `https://www.elec-mate.com/auth/signup?utm_source=email` +
    `&utm_medium=${encodeURIComponent(magnet.utmMedium)}&utm_campaign=lead_magnet`;

  const factRows = (magnet.facts || [])
    .map(
      (f) => `
      <tr>
        <td valign="top" style="padding: 0 10px 10px 0; width: 7px;">
          <div style="width: 7px; height: 7px; border-radius: 2px; background-color: #F3B70A; margin-top: 6px;"></div>
        </td>
        <td valign="top" style="padding: 0 0 10px;">
          <p style="margin: 0; font-size: 14px; color: #51606F; line-height: 1.5;">${esc(f)}</p>
        </td>
      </tr>`
    )
    .join('');

  const attachLine = attached
    ? "It's attached to this email, or download it below."
    : 'Download it below.';

  return `<!DOCTYPE html>
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
  <title>Your ${esc(magnet.name)}</title>
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
<body style="margin: 0; padding: 0; background-color: #F4F6F9; font-family: ${FONT}; -webkit-font-smoothing: antialiased;">
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

          <!-- Title -->
          <tr>
            <td style="padding: 20px 36px 0;" class="pad">
              <p style="margin: 0 0 6px; font-size: 11px; font-weight: 700; letter-spacing: 1.6px; text-transform: uppercase; color: #B5840A;">Free download</p>
              <h1 style="margin: 0 0 18px; font-size: 27px; font-weight: 800; color: #0C1B2A; line-height: 1.12; letter-spacing: -0.5px;">Your ${esc(magnet.name)}<br>is here</h1>
              <p style="margin: 0 0 14px; font-size: 15px; color: #0C1B2A; line-height: 1.5;">${greeting}</p>
              <p style="margin: 0 0 24px; font-size: 15px; color: #51606F; line-height: 1.62;">${esc(magnet.blurb)}</p>
            </td>
          </tr>

          <!-- Highlight panel -->
          <tr>
            <td style="padding: 0 36px;" class="pad">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #FFFAEC; border: 1px solid #EFD489; border-radius: 14px;">
                <tr>
                  <td style="padding: 22px 24px;">
                    <p style="margin: 0 0 4px; font-size: 11px; font-weight: 700; letter-spacing: 1.4px; text-transform: uppercase; color: #B5840A;">What's inside</p>
                    <p style="margin: 0 0 14px; font-size: 17px; font-weight: 700; color: #0C1B2A; line-height: 1.3;">Print it once. Use it on every job.</p>
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">${factRows}</table>
                    <p style="margin: 12px 0 18px; font-size: 13px; color: #51606F; line-height: 1.55;">${attachLine}</p>
                    <!--[if mso]>
                    <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${magnet.url}" style="height:46px;v-text-anchor:middle;width:240px;" arcsize="24%" fillcolor="#0C1B2A">
                      <w:anchorlock/><center style="color:#FFFFFF;font-family:Arial,sans-serif;font-size:14px;font-weight:bold;">Download the PDF</center>
                    </v:roundrect>
                    <![endif]-->
                    <!--[if !mso]><!-->
                    <a href="${magnet.url}" style="display: inline-block; padding: 13px 24px; background-color: #0C1B2A; color: #FFFFFF; font-size: 14px; font-weight: 700; border-radius: 10px;">Download the PDF</a>
                    <!--<![endif]-->
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Primary CTA -->
          <tr>
            <td align="center" style="padding: 30px 36px 8px;" class="pad">
              <!--[if mso]>
              <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${trialUrl}" style="height:52px;v-text-anchor:middle;width:200px;" arcsize="22%" fillcolor="#F3B70A">
                <w:anchorlock/><center style="color:#0C1B2A;font-family:Arial,sans-serif;font-size:15px;font-weight:bold;">Try Elec-Mate free</center>
              </v:roundrect>
              <![endif]-->
              <!--[if !mso]><!-->
              <a href="${trialUrl}" style="display: inline-block; padding: 15px 32px; background-color: #F3B70A; color: #0C1B2A; font-size: 15px; font-weight: 700; border-radius: 11px;">Try Elec-Mate free</a>
              <!--<![endif]-->
              <p style="margin: 12px 0 0; font-size: 12px; color: #8B95A3; line-height: 1.5;">Certificates, quoting, invoicing, 70+ calculators and the training — 7-day trial, no charge until day 8.</p>
            </td>
          </tr>

          <!-- Reply note -->
          <tr>
            <td style="padding: 22px 36px; background-color: #F8FAFC; border-top: 1px solid #E6E9EE; margin-top: 24px;" class="pad">
              <p style="margin: 0; font-size: 13px; color: #51606F; line-height: 1.55;">Any questions, just reply to this email — it comes straight to Andrew, the founder, and he reads every one.</p>
            </td>
          </tr>

          <!-- Footer -->
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

export async function sendLeadMagnetEmail(
  email: string,
  firstName: string | undefined,
  magnet: LeadMagnet
): Promise<void> {
  const apiKey = Deno.env.get('BREVO_API_KEY');
  if (!apiKey) return;

  const resend = new Resend(apiKey);

  // Attach the file, exactly as the welcome email attaches the Getting Started
  // guide. A null result just means the recipient uses the download button.
  const base64 = await fetchBase64(magnet.url);
  const attachments = base64 ? [{ filename: magnet.filename, content: base64 }] : undefined;

  const html = buildHtml(firstName, magnet, Boolean(base64));

  try {
    const { error } = await resend.emails.send({
      from: 'Elec-Mate <founder@elec-mate.com>',
      replyTo: 'founder@elec-mate.com',
      to: [email],
      subject: `Your ${magnet.name} is here`,
      html,
      attachments,
    });
    if (error) {
      console.warn('[newsletter-subscribe] lead magnet email send failed', error);
    } else {
      console.log('[newsletter-subscribe] lead magnet email sent to', email, 'attached:', !!attachments);
    }
  } catch (err) {
    console.warn('[newsletter-subscribe] lead magnet email threw', err);
  }
}
