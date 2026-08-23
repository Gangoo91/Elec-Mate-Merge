/**
 * calculator-result-email — emails a saved calculation back to the person who ran it.
 *
 * WHY: the public calculators pull 74,443 impressions a month and convert at 1.48%,
 * against 10.63% for the mock exams. The difference is not traffic quality — the
 * exams ask for an email at the moment of peak value (your score, your weak areas)
 * and the calculators ask for nothing. Someone who has just sized a CPC has a result
 * worth keeping for a job file. That is the ask.
 *
 * DESIGN: mirrors `send-welcome-email` (the house look), same as
 * `lead-magnet-email.ts` and `mock-result-email.ts`. Four emails now share it —
 * restyle one, restyle all four.
 *   page  #F4F6F9   ·  card 520px / radius 18px / border #E6E9EE
 *   ink   #0C1B2A   ·  muted #51606F  ·  eyebrow #B5840A
 *   gold  #F3B70A   ·  highlight panel #FFFAEC on #EFD489
 * ⚠️ #F3B70A is a background/rule colour ONLY — as TEXT on white it is ~1.4:1.
 *    Use #B5840A for gold type.
 *
 * Everything here arrives from an UNAUTHENTICATED public page. Nothing is trusted:
 * the caller sanitises first (sanitiseCalculatorResult in newsletter-subscribe).
 */
import { Resend } from './mailer.ts';

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

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || 'https://jtwygbeceundfgnkirof.supabase.co';
const LOGO_URL = `${SUPABASE_URL}/storage/v1/object/public/lead-magnets/onboarding/elec-mate-logo.png`;
const FONT = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

/** One labelled figure from the calculation — either an input or an output. */
export interface CalculatorResultRow {
  label: string;
  value: string;
}

export interface CalculatorResultPayload {
  calculatorName: string;
  /** Absolute URL back to the tool — origin forced by the caller's sanitiser. */
  calculatorUrl: string;
  /** The headline answer, e.g. "4 mm²". */
  headline: string;
  /** Short qualifier under the headline, e.g. "minimum CPC". */
  headlineLabel?: string;
  inputs: CalculatorResultRow[];
  outputs: CalculatorResultRow[];
  /** Standards note, e.g. "S = √(I²t) / k — BS 7671:2018+A4:2026". */
  basis?: string;
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Two-column figure rows. A table, not flex — Outlook ignores flex entirely and
 * the values would stack under their labels.
 */
/**
 * Two-column figure rows. A table, not flex — Outlook ignores flex entirely and
 * the values would stack under their labels.
 *
 * Email-client notes, learned the hard way:
 *  - The rule colour is HARDCODED, not interpolated. This branch sits inside a
 *    single-quoted string, so a `${...}` here is emitted literally, which makes
 *    the whole style attribute invalid and silently kills `text-align:right`
 *    on every row after the first.
 *  - `align="right"` is set as an HTML ATTRIBUTE as well as CSS: Gmail on
 *    Android drops the CSS on nested tables often enough to matter.
 *  - Explicit column widths stop a long label squeezing the value column to
 *    nothing on a narrow phone.
 */
function renderRows(rows: CalculatorResultRow[]): string {
  const rule = 'border-top:1px solid #E6E9EE;';
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;width:100%;">
    ${rows
      .map(
        (r, i) => `
      <tr>
        <td width="62%" align="left" style="width:62%;padding:10px 8px 10px 0;font-size:14.5px;line-height:1.45;color:${MUTED};${
          i ? rule : ''
        }">${escapeHtml(r.label)}</td>
        <td width="38%" align="right" style="width:38%;padding:10px 0;font-size:14.5px;line-height:1.45;font-weight:700;color:${INK};text-align:right;white-space:nowrap;${
          i ? rule : ''
        }">${escapeHtml(r.value)}</td>
      </tr>`
      )
      .join('')}
  </table>`;
}

export async function sendCalculatorResultEmail(
  email: string,
  result: CalculatorResultPayload
): Promise<void> {
  const apiKey = Deno.env.get('BREVO_API_KEY');
  if (!apiKey) return;

  const name = escapeHtml(result.calculatorName);
  // encodeURI so a stray space or bracket in a path cannot break the anchor.
  const url = encodeURI(result.calculatorUrl);
  const signupUrl =
    'https://www.elec-mate.com/auth/signup?utm_source=email&utm_medium=calculator_result&utm_campaign=calc_result';

  const year = new Date().getFullYear();
  const subject = `${result.calculatorName} — ${result.headline}`;

  const section = (label: string, inner: string) => `
          <tr>
            <td style="padding: 26px 36px 0;" class="pad">
              <p style="margin: 0 0 12px; font-size: 11px; font-weight: 700; letter-spacing: 1.4px; text-transform: uppercase; color: ${EYEBROW};">${label}</p>
              ${inner}
            </td>
          </tr>`;

  const resultBlock = result.outputs.length ? section('Result', renderRows(result.outputs)) : '';
  const inputsBlock = result.inputs.length
    ? section(
        'What you entered',
        `${renderRows(result.inputs)}${
          result.basis
            ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:14px;"><tr><td style="padding:10px 12px;background:${FOOTER_BG};border-left:3px solid ${GOLD};border-radius:0 8px 8px 0;font-size:12.5px;line-height:1.6;color:${MUTED};">${escapeHtml(result.basis)}</td></tr></table>`
            : ''
        }`
      )
    : '';

  const html = `<!DOCTYPE html>
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
  <title>${name}</title>
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
  <span style="display:none !important; visibility:hidden; mso-hide:all; font-size:1px; color:${PAGE}; line-height:1px; max-height:0; max-width:0; opacity:0; overflow:hidden;">${escapeHtml(
    `${result.headlineLabel ? `${result.headlineLabel}: ` : ''}${result.headline} — with your inputs, ready for the job file.`
  )}</span>
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: ${PAGE};">
    <tr>
      <td align="center" style="padding: 40px 16px;">

        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 520px; background-color: #FFFFFF; border-radius: 18px; overflow: hidden; border: 1px solid ${CARD_BORDER};">

          <tr>
            <td align="left" style="padding: 36px 36px 8px;" class="pad">
              <img src="${LOGO_URL}" alt="Elec-Mate" width="56" height="56" style="display: block; border-radius: 13px; border: 1px solid ${CARD_BORDER};">
            </td>
          </tr>

          <tr>
            <td style="padding: 20px 36px 0;" class="pad">
              <p style="margin: 0 0 6px; font-size: 11px; font-weight: 700; letter-spacing: 1.6px; text-transform: uppercase; color: ${EYEBROW};">Your calculation</p>
              <h1 style="margin: 0 0 18px; font-size: 27px; font-weight: 800; color: ${INK}; line-height: 1.12; letter-spacing: -0.5px;">${name}</h1>
              <p style="margin: 0 0 24px; font-size: 15px; color: ${MUTED}; line-height: 1.62;">Here's your result, with the figures you entered underneath it — so it stands as a record rather than a number with no working.</p>
            </td>
          </tr>

          <tr>
            <td style="padding: 0 36px;" class="pad">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: ${PANEL_BG}; border: 1px solid ${PANEL_BORDER}; border-radius: 14px;">
                <tr>
                  <td align="center" style="padding: 26px 24px;">
                    <p style="margin: 0; font-size: 44px; font-weight: 800; color: ${INK}; line-height: 1.05; letter-spacing: -1.2px;">${escapeHtml(result.headline)}</p>
                    ${
                      result.headlineLabel
                        ? `<p style="margin: 8px 0 0; font-size: 14px; color: ${MUTED}; line-height: 1.5;">${escapeHtml(result.headlineLabel)}</p>`
                        : ''
                    }
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          ${resultBlock}
          ${inputsBlock}

          <tr>
            <td align="center" style="padding: 30px 36px 8px;" class="pad">
              <!--[if mso]>
              <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${signupUrl}" style="height:52px;v-text-anchor:middle;width:250px;" arcsize="22%" fillcolor="${GOLD}">
                <w:anchorlock/><center style="color:${INK};font-family:Arial,sans-serif;font-size:15px;font-weight:bold;">Try Elec-Mate free for 7 days</center>
              </v:roundrect>
              <![endif]-->
              <!--[if !mso]><!-->
              <a href="${signupUrl}" style="display: inline-block; padding: 15px 32px; background-color: ${GOLD}; color: ${INK}; font-size: 15px; font-weight: 700; border-radius: 11px;">Try Elec-Mate free for 7 days</a>
              <!--<![endif]-->
              <p style="margin: 12px 0 0; font-size: 12px; color: ${FAINT}; line-height: 1.5;">70+ calculators &middot; certificates &middot; saved against every job</p>
            </td>
          </tr>

          <tr>
            <td style="padding: 22px 36px; background-color: ${FOOTER_BG}; border-top: 1px solid ${CARD_BORDER};" class="pad">
              <p style="margin: 0 0 10px; font-size: 13px; color: ${MUTED}; line-height: 1.55;">A calculation on its own isn't a record. In Elec-Mate every figure you work out is saved against the job and carries through to the certificate you issue — so the sizing, the test results and the paperwork all agree.</p>
              <p style="margin: 0; font-size: 13px; color: ${MUTED}; line-height: 1.55;">The calculator stays free either way — <a href="${url}" style="color:${EYEBROW};font-weight:600;text-decoration:underline;">run it again here</a>.</p>
            </td>
          </tr>

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

  try {
    const { error } = await new Resend(apiKey).emails.send({
      from: 'Elec-Mate <founder@elec-mate.com>',
      to: [email],
      subject,
      html,
    });
    if (error) {
      console.warn('[newsletter-subscribe] calculator result email send failed', error);
    }
  } catch (err) {
    console.error('[calculator-result-email] send threw', err);
  }
}
