// Failed-payment (dunning) emails — styled to match the welcome email
// (send-welcome-email): light editorial card, navy #0C1B2A + gold #F3B70A,
// logo header, cream highlight card, VML buttons for Outlook.
//
// One renderer for the whole 3-touch sequence (ELE-1174). Tone escalates via
// word-choice and a subtle eyebrow / amount-card colour — firm, never alarming.

export type DunningTone = 'failed' | 'overdue' | 'final';

const SUPABASE_URL =
  (typeof Deno !== 'undefined' && Deno.env.get('SUPABASE_URL')) ||
  'https://jtwygbeceundfgnkirof.supabase.co';
const ASSET_BASE = `${SUPABASE_URL}/storage/v1/object/public/lead-magnets/onboarding`;
const LOGO_URL = `${ASSET_BASE}/elec-mate-logo.png`;
const MANAGE_URL = 'https://www.elec-mate.com/subscriptions';
const FONT = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

interface ToneConfig {
  subject: string;
  preheader: string;
  eyebrow: string;
  eyebrowColor: string;
  headline: string;
  intro: (amount: string) => string;
  body: string;
  amountLabel: string;
  amountCardBg: string;
  amountCardBorder: string;
  amountLabelColor: string;
  amountColor: string;
  amountNote: string;
  amountNoteColor: string;
  cta: string;
}

const TONES: Record<DunningTone, ToneConfig> = {
  // Day 0 — the payment just failed. Calm, helpful, no alarm.
  failed: {
    subject: 'Your Elec-Mate payment didn’t go through',
    preheader: 'A quick fix — update your card and you’re sorted.',
    eyebrow: 'Payment issue',
    eyebrowColor: '#B5840A',
    headline: 'Your payment didn’t<br>go through',
    intro: (amount) =>
      `We tried to take your Elec-Mate subscription payment of <strong style="color: #0C1B2A;">${amount}</strong> but it didn’t go through — usually a card that’s expired or needs re-authorising.`,
    body: 'Nothing’s changed on your account yet. Updating your card takes a few seconds and keeps everything running.',
    amountLabel: 'Amount outstanding',
    amountCardBg: '#FFFAEC',
    amountCardBorder: '#EFD489',
    amountLabelColor: '#B5840A',
    amountColor: '#0C1B2A',
    amountNote: 'Update your card to keep everything running.',
    amountNoteColor: '#51606F',
    cta: 'Update payment details',
  },
  // Day 3 — still outstanding. Firmer, still warm.
  overdue: {
    subject: 'Your Elec-Mate payment is overdue',
    preheader: 'Still outstanding — a quick card update sorts it.',
    eyebrow: 'Payment overdue',
    eyebrowColor: '#B5840A',
    headline: 'A quick nudge<br>about your payment',
    intro: (amount) =>
      `We still haven’t been able to take your subscription payment of <strong style="color: #0C1B2A;">${amount}</strong>.`,
    body: 'Your access is active for now, but we need your card details updated to keep things running smoothly.',
    amountLabel: 'Amount outstanding',
    amountCardBg: '#FFFAEC',
    amountCardBorder: '#EFD489',
    amountLabelColor: '#B5840A',
    amountColor: '#0C1B2A',
    amountNote: 'A few seconds now keeps your access uninterrupted.',
    amountNoteColor: '#51606F',
    cta: 'Update payment details',
  },
  // Day 7 — final notice. Clear about the consequence, still on their side.
  final: {
    subject: 'Final notice — your Elec-Mate subscription',
    preheader: 'Last reminder before your access pauses.',
    eyebrow: 'Final notice',
    eyebrowColor: '#B91C1C',
    headline: 'Last reminder before<br>your access pauses',
    intro: (amount) =>
      `This is the last reminder about your overdue payment of <strong style="color: #0C1B2A;">${amount}</strong>.`,
    body: 'We don’t want you to lose access to your certificates, quotes, AI tools and study materials — updating your card now keeps everything exactly as it is.',
    amountLabel: 'Amount due',
    amountCardBg: '#FEF2F2',
    amountCardBorder: '#FECACA',
    amountLabelColor: '#991B1B',
    amountColor: '#DC2626',
    amountNote: 'Access will pause if this isn’t settled.',
    amountNoteColor: '#991B1B',
    cta: 'Update payment details',
  },
};

export function renderDunningEmail(opts: {
  name: string;
  amount: string;
  payUrl: string;
  tone: DunningTone;
}): { subject: string; preheader: string; html: string } {
  const t = TONES[opts.tone];
  const name = opts.name?.trim() || 'there';
  const year = new Date().getFullYear();

  const html = `<!DOCTYPE html>
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
  <title>${t.subject}</title>
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
  <div style="display: none; max-height: 0; overflow: hidden; opacity: 0;">${t.preheader}</div>
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

          <!-- Title + intro -->
          <tr>
            <td align="left" style="padding: 18px 36px 0;" class="pad">
              <p style="margin: 0 0 6px; font-size: 11px; font-weight: 700; letter-spacing: 1.6px; text-transform: uppercase; color: ${t.eyebrowColor};">${t.eyebrow}</p>
              <h1 style="margin: 0 0 18px; font-size: 27px; font-weight: 800; color: #0C1B2A; line-height: 1.12; letter-spacing: -0.5px;">${t.headline}</h1>
              <p style="margin: 0 0 14px; font-size: 15px; color: #0C1B2A; line-height: 1.5;">Hi ${name},</p>
              <p style="margin: 0 0 14px; font-size: 15px; color: #51606F; line-height: 1.62;">${t.intro(opts.amount)}</p>
              <p style="margin: 0 0 24px; font-size: 15px; color: #51606F; line-height: 1.62;">${t.body}</p>
            </td>
          </tr>

          <!-- Amount card -->
          <tr>
            <td style="padding: 0 36px 26px;" class="pad">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: ${t.amountCardBg}; border: 1px solid ${t.amountCardBorder}; border-radius: 14px;">
                <tr>
                  <td style="padding: 20px 22px; text-align: center;">
                    <p style="margin: 0 0 4px; font-size: 11px; font-weight: 700; letter-spacing: 1.4px; text-transform: uppercase; color: ${t.amountLabelColor};">${t.amountLabel}</p>
                    <p style="margin: 0 0 6px; font-size: 34px; font-weight: 800; color: ${t.amountColor}; line-height: 1.1;">${opts.amount}</p>
                    <p style="margin: 0; font-size: 13px; color: ${t.amountNoteColor}; line-height: 1.5;">${t.amountNote}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Primary CTA -->
          <tr>
            <td align="left" style="padding: 0 36px 6px;" class="pad">
              <!--[if mso]>
              <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${opts.payUrl}" style="height:52px;v-text-anchor:middle;width:240px;" arcsize="22%" fillcolor="#F3B70A">
                <w:anchorlock/><center style="color:#0C1B2A;font-family:Arial,sans-serif;font-size:15px;font-weight:bold;">${t.cta}</center>
              </v:roundrect>
              <![endif]-->
              <!--[if !mso]><!-->
              <a href="${opts.payUrl}" style="display: inline-block; padding: 15px 32px; background-color: #F3B70A; color: #0C1B2A; font-size: 15px; font-weight: 700; border-radius: 11px;">${t.cta}</a>
              <!--<![endif]-->
            </td>
          </tr>

          <!-- Secondary action -->
          <tr>
            <td align="left" style="padding: 4px 36px 30px;" class="pad">
              <p style="margin: 0; font-size: 13px; color: #51606F; line-height: 1.55;">Prefer to review your plan? <a href="${MANAGE_URL}" style="color: #B5840A; font-weight: 600;">Manage your subscription</a>.</p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 22px 36px; background-color: #F8FAFC; border-top: 1px solid #E6E9EE;" class="pad">
              <p style="margin: 0; font-size: 13px; color: #51606F; line-height: 1.55;">Having trouble, or think this is a mistake? Just reply to this email — it comes straight to Andrew, the founder, and he reads every one.</p>
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

  return { subject: t.subject, preheader: t.preheader, html };
}
