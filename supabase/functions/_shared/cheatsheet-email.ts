import { Resend } from './mailer.ts';

/**
 * Send the "Your BS 7671 A4:2026 cheat sheet is here" transactional email
 * with a link (not attachment) to the PDF. Link-based delivery has
 * significantly better inbox placement than attachments, and mobile clients
 * handle the CTA button far better than they handle PDFs.
 *
 * Fire-and-forget from the caller — never throws.
 */
export async function sendCheatSheetEmail(
  email: string,
  firstName: string | undefined,
  pdfUrl: string
): Promise<void> {
  const apiKey = Deno.env.get('BREVO_API_KEY');
  if (!apiKey) return;

  const resend = new Resend(apiKey);
  const greeting = firstName ? `Hi ${firstName},` : 'Hi mate,';
  const year = new Date().getFullYear();
  const logoUrl = 'https://elec-mate.com/logo.jpg';

  const emailHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="color-scheme" content="dark">
  <meta name="supported-color-schemes" content="dark">
  <title>Your BS 7671 A4:2026 cheat sheet</title>
  <style>
    :root { color-scheme: dark; supported-color-schemes: dark; }
    body { margin: 0; padding: 0; width: 100%; background-color: #0a0a0a; }
    @media screen and (max-width: 480px) {
      .mobile-padding { padding-left: 22px !important; padding-right: 22px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #0a0a0a;">
    <tr>
      <td align="center" style="padding: 48px 16px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 520px; background-color: #111111; border-radius: 20px; overflow: hidden; border: 1px solid #1f1f1f;">

          <!-- Header: logo only, no badge -->
          <tr>
            <td style="padding: 40px 36px 12px;" class="mobile-padding">
              <img src="${logoUrl}" alt="Elec-Mate" width="56" height="56" style="display: block; border-radius: 12px;">
            </td>
          </tr>

          <!-- Heading — low-key, not a big banner -->
          <tr>
            <td style="padding: 8px 36px 0;" class="mobile-padding">
              <h1 style="margin: 0; font-size: 22px; font-weight: 700; color: #ffffff; line-height: 1.25; letter-spacing: -0.01em;">
                Your BS 7671 A4:2026 cheat&nbsp;sheet
              </h1>
            </td>
          </tr>

          <!-- Warm, plain-language thanks — not marketing copy -->
          <tr>
            <td style="padding: 20px 36px 4px;" class="mobile-padding">
              <p style="margin: 0 0 14px; font-size: 15.5px; color: #e5e7eb; line-height: 1.65;">
                ${greeting}
              </p>
              <p style="margin: 0 0 14px; font-size: 15.5px; color: #e5e7eb; line-height: 1.65;">
                Thanks for asking for this — genuinely appreciate you spending a minute to care about the regs update.
              </p>
              <p style="margin: 0 0 14px; font-size: 15.5px; color: #e5e7eb; line-height: 1.65;">
                The cheat sheet is attached below. Every change in the 4th Amendment is on two pages with reg numbers — AFDDs, the new battery chapter, Power over Ethernet, Section 710, the updated forms, the lot.
              </p>
            </td>
          </tr>

          <!-- Download button — focused, single action -->
          <tr>
            <td style="padding: 20px 36px 8px;" class="mobile-padding">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td align="center">
                    <!--[if mso]>
                    <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${pdfUrl}" style="height:52px;v-text-anchor:middle;width:260px;" arcsize="20%" strokecolor="#facc15" fillcolor="#facc15">
                      <w:anchorlock/>
                      <center style="color:#0a0a0a;font-family:Arial,sans-serif;font-size:15px;font-weight:bold;">Download the cheat sheet</center>
                    </v:roundrect>
                    <![endif]-->
                    <!--[if !mso]><!-->
                    <a href="${pdfUrl}" style="display: inline-block; padding: 15px 32px; background: #facc15; color: #0a0a0a; font-size: 15px; font-weight: 700; text-decoration: none; border-radius: 10px; letter-spacing: -0.005em;">
                      Download the cheat sheet
                    </a>
                    <!--<![endif]-->
                  </td>
                </tr>
              </table>
              <p style="margin: 12px 0 0; text-align: center; font-size: 12px; color: #9ca3af;">
                PDF · 770 KB · A4 · save it to your phone or the van
              </p>
            </td>
          </tr>

          <!-- Sign-off — personal, from founder -->
          <tr>
            <td style="padding: 28px 36px 24px;" class="mobile-padding">
              <p style="margin: 0 0 6px; font-size: 15.5px; color: #e5e7eb; line-height: 1.65;">
                That's it — no course to buy, no webinar. If it saves you five minutes on the next job, it's done its job.
              </p>
              <p style="margin: 18px 0 0; font-size: 15.5px; color: #ffffff; line-height: 1.5;">
                — Andrew
              </p>
              <p style="margin: 2px 0 0; font-size: 13px; color: #9ca3af;">
                Founder, Elec-Mate
              </p>
            </td>
          </tr>

          <!-- Soft P.S. — single-line, not a pitch -->
          <tr>
            <td style="padding: 0 36px 28px;" class="mobile-padding">
              <div style="padding-top: 18px; border-top: 1px solid #1f1f1f;">
                <p style="margin: 0; font-size: 13px; color: #9ca3af; line-height: 1.6;">
                  <strong style="color: #d1d5db;">P.S.</strong>&nbsp; We're updating every certificate, AI specialist and calculator in Elec-Mate for A4:2026. If you fancy a look, there's a
                  <a href="https://elec-mate.com/auth/signup?utm_source=email&utm_medium=cheatsheet&utm_campaign=lead_magnet" style="color: #facc15; text-decoration: none; border-bottom: 1px solid #facc15;">free seven-day trial</a> — otherwise, good luck out there.
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer — minimal -->
          <tr>
            <td style="padding: 20px 36px 28px; background-color: #0a0a0a;" class="mobile-padding">
              <p style="margin: 0; text-align: center; font-size: 11px; color: #6b7280;">
                © ${year} Elec-Mate Ltd · Made in the UK · Reply to this email and I'll read it.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  try {
    const { error } = await resend.emails.send({
      from: 'Elec-Mate <founder@elec-mate.com>',
      reply_to: 'support@elec-mate.com',
      to: [email],
      subject: 'Your BS 7671 A4:2026 cheat sheet is here 📄',
      html: emailHtml,
    });
    if (error) {
      console.warn('[newsletter-subscribe] cheat sheet email send failed', error);
    } else {
      console.log('[newsletter-subscribe] cheat sheet email sent to', email);
    }
  } catch (err) {
    console.warn('[newsletter-subscribe] cheat sheet email threw', err);
  }
}
