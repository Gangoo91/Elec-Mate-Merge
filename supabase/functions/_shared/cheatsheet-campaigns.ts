/**
 * Audience-targeted cheat-sheet email campaigns.
 *
 * Builds the same PDF offer, three different framings: apprentices,
 * winback (cancelled subs), early-access (registered but never signed up).
 *
 * Shared elements stay identical across campaigns (download button, sign-off,
 * footer). Only the hook paragraphs differ — change copy here, not in the
 * sending edge function.
 */

import { Resend } from './mailer.ts';

export type CheatsheetAudience = 'apprentice' | 'winback' | 'early_access' | 'signup_failure';

interface CampaignCopy {
  subject: string;
  intro: string;
  tail: string;
}

const COPY: Record<CheatsheetAudience, CampaignCopy> = {
  apprentice: {
    subject: 'A4:2026 cheat sheet — pinned on the van or in your locker',
    intro: `
      <p style="margin: 0 0 14px; font-size: 15.5px; color: #e5e7eb; line-height: 1.65;">
        You're training with us, so this one's on me. The IET published BS 7671 Amendment 4:2026 last week — it's a big update. AFDDs, a whole new battery chapter, PoE, new forms, FI-code rule change.
      </p>
      <p style="margin: 0 0 14px; font-size: 15.5px; color: #e5e7eb; line-height: 1.65;">
        Every change is on two pages with reg numbers. Stick it on the van dash or pin it in your locker — it'll come up in your next assessment.
      </p>`,
    tail: `
      <p style="margin: 0 0 10px; font-size: 15.5px; color: #e5e7eb; line-height: 1.65;">
        Also — we've rebuilt the Study Centre around A4:2026. New questions, updated notes, new practice scenarios. Sign in and it's already there, nothing for you to do.
      </p>
      <p style="margin: 0; font-size: 15.5px; color: #e5e7eb; line-height: 1.65;">
        Keep going, mate.
      </p>`,
  },
  winback: {
    subject: "While you've been away — A4:2026 cheat sheet, no strings",
    intro: `
      <p style="margin: 0 0 14px; font-size: 15.5px; color: #e5e7eb; line-height: 1.65;">
        No pitch, no offer. I know you cancelled Elec-Mate a while back — fair enough, timing and all that.
      </p>
      <p style="margin: 0 0 14px; font-size: 15.5px; color: #e5e7eb; line-height: 1.65;">
        While you've been away, the IET published Amendment 4:2026 — the biggest BS 7671 update since the 18th ed. New Chapter 57 for batteries. New Section 716 for Power over Ethernet. Forms split. Section 710 medical rewritten. FI codes don't kill an EICR any more.
      </p>
      <p style="margin: 0 0 14px; font-size: 15.5px; color: #e5e7eb; line-height: 1.65;">
        I pulled every change onto two pages so you've got it to hand. Free. Yours either way.
      </p>`,
    tail: `
      <p style="margin: 0 0 10px; font-size: 15.5px; color: #e5e7eb; line-height: 1.65;">
        If you ever want a fresh look — we've rebuilt every cert, AI specialist and calculator for A4:2026. 7-day free trial, card required, no charge until day 8, cancel in seconds. No pressure.
      </p>
      <p style="margin: 0; font-size: 15.5px; color: #e5e7eb; line-height: 1.65;">
        Good luck out there.
      </p>`,
  },
  early_access: {
    subject: "Thanks for being early — here's something free",
    intro: `
      <p style="margin: 0 0 14px; font-size: 15.5px; color: #e5e7eb; line-height: 1.65;">
        You joined the Elec-Mate early-access list a while back and never quite made it over the line. That's cool — people are busy, life happens.
      </p>
      <p style="margin: 0 0 14px; font-size: 15.5px; color: #e5e7eb; line-height: 1.65;">
        Since then the IET published BS 7671 Amendment 4:2026 — the biggest regs update since the 18th ed. New battery chapter, new PoE section, rewritten medical, new forms, FI code rule change.
      </p>
      <p style="margin: 0 0 14px; font-size: 15.5px; color: #e5e7eb; line-height: 1.65;">
        Before anything else — here's the two-page summary. On us for being early.
      </p>`,
    tail: `
      <p style="margin: 0 0 10px; font-size: 15.5px; color: #e5e7eb; line-height: 1.65;">
        If you fancy that look you planned, the platform's been rebuilt end-to-end for A4:2026. 7-day free trial, card required, no charge until day 8, cancel in seconds — good to have you on the list either way.
      </p>
      <p style="margin: 0; font-size: 15.5px; color: #e5e7eb; line-height: 1.65;">
        Talk soon.
      </p>`,
  },
  signup_failure: {
    subject: 'You signed up but never got in — A4:2026 cheat sheet on us',
    intro: `
      <p style="margin: 0 0 14px; font-size: 15.5px; color: #e5e7eb; line-height: 1.65;">
        You created an Elec-Mate account a while back and never quite got rolling. No worries — life's busy.
      </p>
      <p style="margin: 0 0 14px; font-size: 15.5px; color: #e5e7eb; line-height: 1.65;">
        Since then the IET published BS 7671 Amendment 4:2026 — the biggest regs update since the 18th ed. New battery chapter, new PoE section, rewritten medical, new forms, FI code rule change.
      </p>
      <p style="margin: 0 0 14px; font-size: 15.5px; color: #e5e7eb; line-height: 1.65;">
        Thought you'd want the two-page summary. No strings, yours either way.
      </p>`,
    tail: `
      <p style="margin: 0 0 10px; font-size: 15.5px; color: #e5e7eb; line-height: 1.65;">
        Your account's still there if you want to pick up where you left off — we've rebuilt every cert, AI specialist and calculator for A4:2026. 7-day free trial's waiting, card required, no charge until day 8, cancel in seconds.
      </p>
      <p style="margin: 0; font-size: 15.5px; color: #e5e7eb; line-height: 1.65;">
        Good luck out there.
      </p>`,
  },
};

function buildHtml(opts: {
  audience: CheatsheetAudience;
  firstName: string | undefined;
  pdfUrl: string;
  logoUrl: string;
}): { subject: string; html: string } {
  const copy = COPY[opts.audience];
  const greeting = opts.firstName ? `Hi ${opts.firstName},` : 'Hi mate,';
  const year = new Date().getFullYear();

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="color-scheme" content="dark">
  <meta name="supported-color-schemes" content="dark">
  <title>${copy.subject}</title>
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

          <!-- Logo -->
          <tr>
            <td style="padding: 40px 36px 12px;" class="mobile-padding">
              <img src="${opts.logoUrl}" alt="Elec-Mate" width="120" height="120" style="display: block; border-radius: 12px;">
            </td>
          </tr>

          <!-- Heading -->
          <tr>
            <td style="padding: 8px 36px 0;" class="mobile-padding">
              <h1 style="margin: 0; font-size: 22px; font-weight: 700; color: #ffffff; line-height: 1.25; letter-spacing: -0.01em;">
                Your BS 7671 A4:2026 cheat&nbsp;sheet
              </h1>
            </td>
          </tr>

          <!-- Greeting + audience-specific intro -->
          <tr>
            <td style="padding: 20px 36px 4px;" class="mobile-padding">
              <p style="margin: 0 0 14px; font-size: 15.5px; color: #e5e7eb; line-height: 1.65;">
                ${greeting}
              </p>
              ${copy.intro}
            </td>
          </tr>

          <!-- Download button -->
          <tr>
            <td style="padding: 18px 36px 8px;" class="mobile-padding">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td align="center">
                    <!--[if mso]>
                    <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${opts.pdfUrl}" style="height:52px;v-text-anchor:middle;width:260px;" arcsize="20%" strokecolor="#facc15" fillcolor="#facc15">
                      <w:anchorlock/>
                      <center style="color:#0a0a0a;font-family:Arial,sans-serif;font-size:15px;font-weight:bold;">Download the cheat sheet</center>
                    </v:roundrect>
                    <![endif]-->
                    <!--[if !mso]><!-->
                    <a href="${opts.pdfUrl}" style="display: inline-block; padding: 15px 32px; background: #facc15; color: #0a0a0a; font-size: 15px; font-weight: 700; text-decoration: none; border-radius: 10px; letter-spacing: -0.005em;">
                      Download the cheat sheet
                    </a>
                    <!--<![endif]-->
                  </td>
                </tr>
              </table>
              <p style="margin: 12px 0 0; text-align: center; font-size: 12px; color: #9ca3af;">
                PDF · A4 · save it to your phone or the van
              </p>
            </td>
          </tr>

          <!-- Audience-specific tail + sign-off -->
          <tr>
            <td style="padding: 28px 36px 24px;" class="mobile-padding">
              ${copy.tail}
              <p style="margin: 22px 0 0; font-size: 15.5px; color: #ffffff; line-height: 1.5;">
                — Andrew
              </p>
              <p style="margin: 2px 0 0; font-size: 13px; color: #9ca3af;">
                Founder, Elec-Mate
              </p>
            </td>
          </tr>

          <!-- Footer -->
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

  return { subject: copy.subject, html };
}

/**
 * Send a cheat-sheet campaign email. Fire-and-forget from callers.
 */
export async function sendCheatsheetCampaignEmail(params: {
  audience: CheatsheetAudience;
  email: string;
  firstName?: string;
  pdfUrl: string;
}): Promise<{ ok: boolean; error?: string }> {
  const apiKey = Deno.env.get('BREVO_API_KEY');
  if (!apiKey) return { ok: false, error: 'BREVO_API_KEY not configured' };

  const { subject, html } = buildHtml({
    audience: params.audience,
    firstName: params.firstName,
    pdfUrl: params.pdfUrl,
    logoUrl: 'https://elec-mate.com/images/elec-mate-logo-512.png',
  });

  const resend = new Resend(apiKey);
  try {
    const { error } = await resend.emails.send({
      from: 'Elec-Mate <founder@elec-mate.com>',
      reply_to: 'support@elec-mate.com',
      to: [params.email],
      subject,
      html,
    });
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}

/**
 * Standalone preview helper — used by scripts to render HTML to disk for
 * browser preview before sending. Exports the raw HTML without hitting Brevo.
 */
export function renderCheatsheetCampaignHtml(params: {
  audience: CheatsheetAudience;
  firstName?: string;
  pdfUrl: string;
}): { subject: string; html: string } {
  return buildHtml({
    audience: params.audience,
    firstName: params.firstName,
    pdfUrl: params.pdfUrl,
    logoUrl: 'https://elec-mate.com/images/elec-mate-logo-512.png',
  });
}
