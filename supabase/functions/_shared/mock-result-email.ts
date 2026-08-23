import { Resend } from './mailer.ts';

/**
 * Send the "here's what you got wrong" mock exam breakdown.
 *
 * Sits behind the email-capture block on the public /mock-exams pages: the
 * visitor sits the exam free and sees their score on-screen either way, then
 * optionally asks for the breakdown by email. The breakdown IS the product —
 * every question they missed with the right answer and the worked explanation
 * — so it has to earn its place before it pitches anything.
 *
 * DESIGN: mirrors `send-welcome-email` (the house look Andrew signed off), NOT
 * `renderEmailShell` — same as `lead-magnet-email.ts`. Someone who has had the
 * welcome email should recognise this instantly:
 *   page  #F4F6F9   ·  card 520px / radius 18px / border #E6E9EE
 *   ink   #0C1B2A   ·  muted #51606F  ·  eyebrow #B5840A
 *   gold  #F3B70A   ·  highlight panel #FFFAEC on #EFD489
 *   logo  56×56, radius 13px        ·  footer #F8FAFC
 * Keep the three in step — restyle one, restyle all.
 *
 * ⚠️ The result payload arrives from an unauthenticated public page, so every
 * field is attacker-controllable. EVERYTHING interpolated here goes through
 * escapeHtml(), and the URL through encodeURI(). The caller bounds the array
 * lengths. Never interpolate a raw field into this template.
 *
 * Fire-and-forget from the caller — never throws.
 */

export interface MockResultMissedQuestion {
  question: string;
  correctAnswer: string;
  explanation?: string;
}

export interface MockResultPayload {
  examName: string;
  examUrl: string;
  score: number;
  total: number;
  percentage: number;
  passed: boolean;
  passThreshold: number;
  weakAreas: Array<{ name: string; correct: number; total: number }>;
  missed: MockResultMissedQuestion[];
  /** Total missed count before truncation — drives the "and N more" line. */
  missedTotal: number;
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/* Welcome-email palette — keep in step with send-welcome-email/index.ts */
const PAGE = '#F4F6F9';
const CARD_BORDER = '#E6E9EE';
const INK = '#0C1B2A';
const MUTED = '#51606F';
const EYEBROW = '#B5840A';
const GOLD = '#F3B70A';
const PANEL_BG = '#FFFAEC';
const PANEL_BORDER = '#EFD489';
const FOOTER_BG = '#F8FAFC';
const FAINT = '#8B95A3';
const GREEN = '#15803D';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || 'https://jtwygbeceundfgnkirof.supabase.co';
const LOGO_URL = `${SUPABASE_URL}/storage/v1/object/public/lead-magnets/onboarding/elec-mate-logo.png`;
const FONT = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

function buildHtml(result: MockResultPayload): string {
  const year = new Date().getFullYear();
  const examName = escapeHtml(result.examName);
  const examUrl = encodeURI(result.examUrl);
  const signupUrl =
    'https://www.elec-mate.com/auth/signup?utm_source=email&utm_medium=mock_exam_result&utm_campaign=exam_breakdown';

  // Pass state colours the pill only — the score itself stays in house ink so
  // a near-miss doesn't read as an error state.
  const pill = result.passed
    ? `<span style="display:inline-block;padding:5px 12px;border-radius:999px;background:#DCFCE7;color:${GREEN};font-size:12px;font-weight:700;letter-spacing:0.3px;">Pass</span>`
    : `<span style="display:inline-block;padding:5px 12px;border-radius:999px;background:#FEF3C7;color:${EYEBROW};font-size:12px;font-weight:700;letter-spacing:0.3px;">Not yet</span>`;

  const weakAreaRows = result.weakAreas
    .map(
      (w) => `<tr>
        <td style="padding:8px 0;border-bottom:1px solid ${CARD_BORDER};font-size:14px;color:${INK};">${escapeHtml(w.name)}</td>
        <td align="right" style="padding:8px 0;border-bottom:1px solid ${CARD_BORDER};font-size:14px;font-weight:700;color:${INK};white-space:nowrap;">${w.correct}/${w.total}</td>
      </tr>`
    )
    .join('');

  const weakAreasBlock = result.weakAreas.length
    ? `<tr>
        <td style="padding: 26px 36px 0;" class="pad">
          <p style="margin: 0 0 12px; font-size: 11px; font-weight: 700; letter-spacing: 1.4px; text-transform: uppercase; color: ${EYEBROW};">Where the marks went</p>
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">${weakAreaRows}</table>
        </td>
      </tr>`
    : '';

  const missedBlocks = result.missed
    .map(
      (q, i) => `<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom:12px;background:${FOOTER_BG};border:1px solid ${CARD_BORDER};border-radius:12px;">
        <tr><td style="padding:16px 18px;">
          <p style="margin:0 0 10px;font-size:14px;font-weight:700;line-height:1.5;color:${INK};">${i + 1}. ${escapeHtml(q.question)}</p>
          <table role="presentation" cellspacing="0" cellpadding="0" border="0">
            <tr>
              <td valign="top" style="padding:0 8px 0 0;"><div style="width:7px;height:7px;border-radius:2px;background:${GREEN};margin-top:6px;"></div></td>
              <td><p style="margin:0;font-size:14px;line-height:1.55;color:${GREEN};font-weight:700;">${escapeHtml(q.correctAnswer)}</p></td>
            </tr>
          </table>
          ${
            q.explanation
              ? `<p style="margin:10px 0 0;font-size:13.5px;line-height:1.6;color:${MUTED};">${escapeHtml(q.explanation)}</p>`
              : ''
          }
        </td></tr>
      </table>`
    )
    .join('');

  const moreLine =
    result.missedTotal > result.missed.length
      ? `<p style="margin:2px 0 0;font-size:13px;line-height:1.6;color:${MUTED};">Plus ${
          result.missedTotal - result.missed.length
        } more from this attempt — the app keeps the full list and builds your practice from it.</p>`
      : '';

  const missedBlock = result.missed.length
    ? `<tr>
        <td style="padding: 26px 36px 0;" class="pad">
          <p style="margin: 0 0 4px; font-size: 11px; font-weight: 700; letter-spacing: 1.4px; text-transform: uppercase; color: ${EYEBROW};">The ones you missed</p>
          <p style="margin: 0 0 14px; font-size: 13.5px; line-height: 1.6; color: ${MUTED};">Right answer and the reasoning on each. Read these once and they tend to stick.</p>
          ${missedBlocks}${moreLine}
        </td>
      </tr>`
    : '';

  return `<!DOCTYPE html>
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
  <title>Your ${examName} breakdown</title>
  <!--[if mso]>
  <noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
  <style>table {border-collapse: collapse;} td,th,div,p,a,h1,h2,h3 {font-family: Arial, sans-serif;}</style>
  <![endif]-->
  <style>
    body { margin: 0; padding: 0; width: 100%; background-color: ${PAGE}; }
    a { text-decoration: none; }
    @media screen and (max-width: 480px) {
      .pad { padding-left: 24px !important; padding-right: 24px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: ${PAGE}; font-family: ${FONT}; -webkit-font-smoothing: antialiased;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: ${PAGE};">
    <tr>
      <td align="center" style="padding: 40px 16px;">

        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 520px; background-color: #FFFFFF; border-radius: 18px; overflow: hidden; border: 1px solid ${CARD_BORDER};">

          <!-- Header -->
          <tr>
            <td align="left" style="padding: 36px 36px 8px;" class="pad">
              <img src="${LOGO_URL}" alt="Elec-Mate" width="56" height="56" style="display: block; border-radius: 13px; border: 1px solid ${CARD_BORDER};">
            </td>
          </tr>

          <!-- Title -->
          <tr>
            <td style="padding: 20px 36px 0;" class="pad">
              <p style="margin: 0 0 6px; font-size: 11px; font-weight: 700; letter-spacing: 1.6px; text-transform: uppercase; color: ${EYEBROW};">Your results</p>
              <h1 style="margin: 0 0 18px; font-size: 27px; font-weight: 800; color: ${INK}; line-height: 1.12; letter-spacing: -0.5px;">${examName}</h1>
              <p style="margin: 0 0 24px; font-size: 15px; color: ${MUTED}; line-height: 1.62;">Here's the full breakdown — every question you missed, with the right answer and the reasoning.</p>
            </td>
          </tr>

          <!-- Score panel -->
          <tr>
            <td style="padding: 0 36px;" class="pad">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: ${PANEL_BG}; border: 1px solid ${PANEL_BORDER}; border-radius: 14px;">
                <tr>
                  <td align="center" style="padding: 26px 24px;">
                    ${pill}
                    <p style="margin: 12px 0 0; font-size: 52px; font-weight: 800; color: ${INK}; line-height: 1; letter-spacing: -1.5px;">${result.percentage}%</p>
                    <p style="margin: 10px 0 0; font-size: 14px; color: ${MUTED}; line-height: 1.5;">${result.score} of ${result.total} correct &middot; pass mark ${result.passThreshold}%</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          ${weakAreasBlock}
          ${missedBlock}

          <!-- Primary CTA -->
          <tr>
            <td align="center" style="padding: 30px 36px 8px;" class="pad">
              <!--[if mso]>
              <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${signupUrl}" style="height:52px;v-text-anchor:middle;width:230px;" arcsize="22%" fillcolor="${GOLD}">
                <w:anchorlock/><center style="color:${INK};font-family:Arial,sans-serif;font-size:15px;font-weight:bold;">Practise your weak topics</center>
              </v:roundrect>
              <![endif]-->
              <!--[if !mso]><!-->
              <a href="${signupUrl}" style="display: inline-block; padding: 15px 32px; background-color: ${GOLD}; color: ${INK}; font-size: 15px; font-weight: 700; border-radius: 11px;">Practise your weak topics</a>
              <!--<![endif]-->
              <p style="margin: 12px 0 0; font-size: 12px; color: ${FAINT}; line-height: 1.5;">Full question bank &middot; every wrong answer explained &middot; progress tracked across attempts</p>
            </td>
          </tr>

          <!-- Retake note -->
          <tr>
            <td style="padding: 22px 36px; background-color: ${FOOTER_BG}; border-top: 1px solid ${CARD_BORDER};" class="pad">
              <p style="margin: 0 0 10px; font-size: 13px; color: ${MUTED}; line-height: 1.55;">The mock itself stays free and you can retake it as often as you like — <a href="${examUrl}" style="color:${EYEBROW};font-weight:600;text-decoration:underline;">it's right here</a>. Different questions every time.</p>
              <p style="margin: 0; font-size: 13px; color: ${MUTED}; line-height: 1.55;">Any questions, just reply — it comes straight to Andrew, the founder, and he reads every one.</p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding: 18px 36px 26px; background-color: ${FOOTER_BG};">
              <p style="margin: 0 0 3px; font-size: 12px; font-weight: 600; color: ${INK};">Your trade. Your app.</p>
              <p style="margin: 0; font-size: 11px; color: ${FAINT};">&copy; ${year} Elec-Mate &middot; Made in the UK</p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function sendMockResultEmail(
  email: string,
  result: MockResultPayload
): Promise<void> {
  const apiKey = Deno.env.get('BREVO_API_KEY');
  if (!apiKey) return;

  const html = buildHtml(result);

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: 'Elec-Mate <founder@elec-mate.com>',
      replyTo: 'founder@elec-mate.com',
      to: [email],
      subject: `Your ${result.examName} breakdown — ${result.percentage}%`,
      html,
    });
    if (error) {
      console.warn('[newsletter-subscribe] mock result email send failed', error);
    } else {
      console.log('[newsletter-subscribe] mock result email sent to', email);
    }
  } catch (err) {
    console.warn('[newsletter-subscribe] mock result email threw', err);
  }
}
