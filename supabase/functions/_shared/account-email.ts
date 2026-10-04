/**
 * Account emails (data export, account deletion …) in the same design as the
 * welcome email (send-welcome-email) — light card, logo, gold eyebrow, one
 * highlighted panel, one clear button, founder footer. Andrew, 4 Oct 2026:
 * "the welcome email is the way we do it".
 */

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || 'https://jtwygbeceundfgnkirof.supabase.co';
const LOGO_URL = `${SUPABASE_URL}/storage/v1/object/public/lead-magnets/onboarding/elec-mate-logo.png`;
const FONT = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

export const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export interface AccountEmail {
  /** Browser/inbox title. */
  title: string;
  /** Small gold label above the heading. */
  eyebrow: string;
  /** Big heading; may contain <br>. */
  heading: string;
  firstName?: string;
  /** Paragraphs (HTML allowed — escape user values first). */
  paragraphs: string[];
  /** Highlighted panel with an optional button. */
  panel?: { label: string; title: string; body: string; button?: { text: string; url: string } };
  /** Key/value facts shown as a list. */
  facts?: { k: string; v: string }[];
  /** Plain note under everything — e.g. "didn't ask for this?". */
  note?: { title: string; body: string };
  /** Main button (bottom). */
  button?: { text: string; url: string };
}

function button(b: { text: string; url: string }, dark: boolean) {
  const bg = dark ? '#0C1B2A' : '#F3B70A';
  const fg = dark ? '#FFFFFF' : '#0C1B2A';
  return `<!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${b.url}" style="height:48px;v-text-anchor:middle;width:260px;" arcsize="22%" fillcolor="${bg}">
<w:anchorlock/><center style="color:${fg};font-family:Arial,sans-serif;font-size:15px;font-weight:bold;">${b.text}</center>
</v:roundrect>
<![endif]-->
<!--[if !mso]><!-->
<a href="${b.url}" style="display: inline-block; padding: 14px 28px; background-color: ${bg}; color: ${fg}; font-size: 15px; font-weight: 700; border-radius: 11px;">${b.text}</a>
<!--<![endif]-->`;
}

export function accountEmailHtml(e: AccountEmail): string {
  const year = new Date().getFullYear();
  const paras = e.paragraphs
    .map(
      (p) =>
        `<p style="margin: 0 0 14px; font-size: 15px; color: #51606F; line-height: 1.62;">${p}</p>`
    )
    .join('');
  const facts = e.facts?.length
    ? `<tr><td style="padding: 4px 36px 18px;" class="pad">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="border-top: 1px solid #E6E9EE;">
          ${e.facts
            .map(
              (f) => `<tr>
            <td style="padding: 11px 0; border-bottom: 1px solid #E6E9EE; font-size: 13px; color: #51606F;">${f.k}</td>
            <td align="right" style="padding: 11px 0; border-bottom: 1px solid #E6E9EE; font-size: 14px; font-weight: 700; color: #0C1B2A;">${f.v}</td>
          </tr>`
            )
            .join('')}
        </table></td></tr>`
    : '';
  const panel = e.panel
    ? `<tr><td style="padding: 6px 36px 24px;" class="pad">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #FFFAEC; border: 1px solid #EFD489; border-radius: 14px;">
          <tr><td style="padding: 20px 22px;">
            <p style="margin: 0 0 4px; font-size: 11px; font-weight: 700; letter-spacing: 1.4px; text-transform: uppercase; color: #B5840A;">${e.panel.label}</p>
            <p style="margin: 0 0 6px; font-size: 17px; font-weight: 700; color: #0C1B2A; line-height: 1.3;">${e.panel.title}</p>
            <p style="margin: 0 ${e.panel.button ? '0 18px' : '0'}; font-size: 13px; color: #51606F; line-height: 1.55;">${e.panel.body}</p>
            ${e.panel.button ? button(e.panel.button, true) : ''}
          </td></tr>
        </table></td></tr>`
    : '';
  const note = e.note
    ? `<tr><td style="padding: 0 36px 26px;" class="pad">
        <p style="margin: 0 0 4px; font-size: 13px; font-weight: 700; color: #0C1B2A;">${e.note.title}</p>
        <p style="margin: 0; font-size: 13px; color: #51606F; line-height: 1.55;">${e.note.body}</p>
      </td></tr>`
    : '';
  const cta = e.button
    ? `<tr><td align="left" style="padding: 4px 36px 30px;" class="pad">${button(e.button, false)}</td></tr>`
    : '';

  return `<!DOCTYPE html>
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
  <title>${e.title}</title>
  <!--[if mso]>
  <noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
  <style>table {border-collapse: collapse;} td,th,div,p,a,h1,h2,h3 {font-family: Arial, sans-serif;}</style>
  <![endif]-->
  <style>
    body { margin: 0; padding: 0; width: 100%; background-color: #F4F6F9; }
    a { text-decoration: none; }
    @media screen and (max-width: 480px) { .pad { padding-left: 24px !important; padding-right: 24px !important; } }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #F4F6F9; font-family: ${FONT}; -webkit-font-smoothing: antialiased;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #F4F6F9;">
    <tr><td align="center" style="padding: 40px 16px;">
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 520px; background-color: #FFFFFF; border-radius: 18px; overflow: hidden; border: 1px solid #E6E9EE;">
        <tr><td align="left" style="padding: 36px 36px 8px;" class="pad">
          <img src="${LOGO_URL}" alt="Elec-Mate" width="56" height="56" style="display: block; border-radius: 13px; border: 1px solid #E6E9EE;">
        </td></tr>
        <tr><td align="left" style="padding: 18px 36px 4px;" class="pad">
          <p style="margin: 0 0 6px; font-size: 11px; font-weight: 700; letter-spacing: 1.6px; text-transform: uppercase; color: #B5840A;">${e.eyebrow}</p>
          <h1 style="margin: 0 0 18px; font-size: 27px; font-weight: 800; color: #0C1B2A; line-height: 1.12; letter-spacing: -0.5px;">${e.heading}</h1>
          ${e.firstName ? `<p style="margin: 0 0 14px; font-size: 15px; color: #0C1B2A; line-height: 1.5;">Hi ${escapeHtml(e.firstName)},</p>` : ''}
          ${paras}
        </td></tr>
        ${panel}
        ${facts}
        ${cta}
        ${note}
        <tr><td style="padding: 22px 36px; background-color: #F8FAFC; border-top: 1px solid #E6E9EE;" class="pad">
          <p style="margin: 0; font-size: 13px; color: #51606F; line-height: 1.55;">Questions? Just reply to this email — it comes straight to Andrew, the founder, and he reads every one. Or email info@elec-mate.com.</p>
        </td></tr>
        <tr><td align="center" style="padding: 18px 36px 26px; background-color: #F8FAFC;">
          <p style="margin: 0 0 3px; font-size: 12px; font-weight: 600; color: #0C1B2A;">Your trade. Your app.</p>
          <p style="margin: 0; font-size: 11px; color: #8B95A3;">&copy; ${year} Elec-Mate Ltd &middot; Company 16416291 &middot; ICO ZB935897 &middot; Made in the UK</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
