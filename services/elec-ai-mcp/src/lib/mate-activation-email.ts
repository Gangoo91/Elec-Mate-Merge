/**
 * Sends the "Mate is live ⚡" activation email immediately after a user
 * completes WhatsApp deep-link onboarding. Fires from /api/wa-onboarding
 * on success, fire-and-forget — email failure must never block activation.
 *
 * Includes a vCard attachment so the user can one-tap save Mate to their
 * phone contacts (so the WhatsApp chat label becomes "Mate" instead of a
 * raw UK number).
 */

import { config } from '../config.js';

const MATE_PHONE_RAW = '447507241303';
const MATE_PHONE_DISPLAY = '+44 7507 241303';

/** vCard 3.0 — kept in sync with src/utils/mate-vcard.ts. */
const MATE_VCARD = [
  'BEGIN:VCARD',
  'VERSION:3.0',
  'N:Mate;by Elec-Mate;;;',
  'FN:Mate by Elec-Mate',
  'ORG:Elec-Mate',
  'TITLE:Your AI business assistant',
  `TEL;TYPE=CELL,VOICE:+${MATE_PHONE_RAW}`,
  `IMPP:whatsapp:+${MATE_PHONE_RAW}`,
  'EMAIL;TYPE=WORK:founder@elec-mate.com',
  'URL:https://elec-mate.com',
  "NOTE:Send anything: voice notes\\, photos\\, questions. \"morning brief\" / \"create a quote\"",
  'END:VCARD',
  '',
].join('\r\n');

interface SendArgs {
  toEmail: string;
  fullName?: string | null;
  userPhone: string; // E.164, the user's own WhatsApp number
}

const HELLO_LINK = `https://wa.me/${MATE_PHONE_RAW}?text=${encodeURIComponent('Hey Mate')}`;
const BRIEF_LINK = `https://wa.me/${MATE_PHONE_RAW}?text=${encodeURIComponent('morning brief')}`;
const QUOTE_LINK = `https://wa.me/${MATE_PHONE_RAW}?text=${encodeURIComponent('draft a quote')}`;

function buildHtml(firstName: string): string {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>You're chatting with Mate ⚡</title>
</head>
<body style="margin:0;padding:0;background:#0b0b0b;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#e2e8f0;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#0b0b0b;">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table role="presentation" width="100%" style="max-width:560px;background:#111111;border:1px solid rgba(255,255,255,0.06);border-radius:24px;" cellpadding="0" cellspacing="0" border="0">
          <!-- Header -->
          <tr>
            <td style="padding:32px 32px 0 32px;">
              <div style="font-size:11px;font-weight:700;letter-spacing:0.22em;color:#FACC15;text-transform:uppercase;">You're in ⚡</div>
              <h1 style="margin:14px 0 0 0;font-size:32px;line-height:1.1;font-weight:700;letter-spacing:-0.02em;color:#ffffff;">
                Mate is live on your WhatsApp.
              </h1>
              <p style="margin:14px 0 0 0;font-size:16px;line-height:1.5;color:#cbd5e1;">
                Hi ${firstName}, your AI business assistant is ready. Send a message to <strong style="color:#ffffff;">${MATE_PHONE_DISPLAY}</strong> any time — voice, text, photos, all welcome.
              </p>
            </td>
          </tr>

          <!-- Number card -->
          <tr>
            <td style="padding:24px 32px 0 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:rgba(37,211,102,0.08);border:1px solid rgba(37,211,102,0.2);border-radius:16px;">
                <tr>
                  <td style="padding:18px 20px;">
                    <div style="font-size:11px;font-weight:700;letter-spacing:0.18em;color:#86efac;text-transform:uppercase;">Save Mate to your contacts</div>
                    <div style="margin-top:6px;font-size:18px;font-weight:700;color:#ffffff;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;">${MATE_PHONE_DISPLAY}</div>
                    <p style="margin:10px 0 14px 0;font-size:13px;line-height:1.5;color:#cbd5e1;">
                      Open the attached <strong>Mate.vcf</strong> on your phone — it'll save Mate to your contacts so WhatsApp shows "Mate" instead of a number.
                    </p>
                    <a href="${HELLO_LINK}" style="display:inline-block;padding:12px 20px;border-radius:12px;background:#25D366;color:#ffffff;font-weight:600;font-size:14px;text-decoration:none;">Open WhatsApp →</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Try one of these -->
          <tr>
            <td style="padding:28px 32px 0 32px;">
              <div style="font-size:11px;font-weight:700;letter-spacing:0.22em;color:rgba(255,255,255,0.5);text-transform:uppercase;">Try one of these</div>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:14px;">
                <tr>
                  <td style="padding:0 8px 8px 0;width:50%;">
                    <a href="${BRIEF_LINK}" style="display:block;padding:14px 16px;border-radius:14px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;">Morning brief →</a>
                  </td>
                  <td style="padding:0 0 8px 8px;width:50%;">
                    <a href="${QUOTE_LINK}" style="display:block;padding:14px 16px;border-radius:14px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;">Draft a quote →</a>
                  </td>
                </tr>
              </table>
              <p style="margin:14px 0 0 0;font-size:13px;line-height:1.5;color:rgba(255,255,255,0.6);">
                Or just say what you need. <em>"Quote a CU upgrade for John, two-bed flat, £400ish"</em> — Mate handles the rest.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:32px;border-top:1px solid rgba(255,255,255,0.06);margin-top:24px;">
              <p style="margin:0;font-size:12px;line-height:1.6;color:rgba(255,255,255,0.45);">
                Connected from <span style="font-family:ui-monospace,SFMono-Regular,Menlo,monospace;">${maskPhone()}</span> · Cancel any time in the app · Need help? <a href="mailto:founder@elec-mate.com" style="color:rgba(255,255,255,0.7);text-decoration:underline;">founder@elec-mate.com</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function maskPhone(): string {
  // We don't include the user's own phone in the email body (privacy +
  // simpler templating). The dashboard already shows a masked version.
  return 'your WhatsApp';
}

function bytesToBase64(bytes: Uint8Array): string {
  let bin = '';
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return Buffer.from(bin, 'binary').toString('base64');
}

/** Best-effort send — never throws to the caller. */
export async function sendMateActivationEmail(args: SendArgs): Promise<void> {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.warn('[mate-activation-email] BREVO_API_KEY not set — skipping');
    return;
  }
  if (!args.toEmail) {
    console.warn('[mate-activation-email] no to_email — skipping');
    return;
  }

  const firstName =
    (args.fullName ?? '').trim().split(/\s+/)[0] || args.toEmail.split('@')[0] || 'there';

  const vcardBase64 = bytesToBase64(new TextEncoder().encode(MATE_VCARD));

  try {
    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'api-key': apiKey,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        sender: { email: 'founder@elec-mate.com', name: 'Mate by Elec-Mate' },
        to: [{ email: args.toEmail, name: args.fullName || undefined }],
        subject: "You're chatting with Mate ⚡",
        htmlContent: buildHtml(firstName),
        attachment: [
          {
            content: vcardBase64,
            name: 'Mate.vcf',
          },
        ],
        tags: ['mate', 'activation'],
      }),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => '');
      console.error(
        `[mate-activation-email] Brevo ${res.status} for ${args.toEmail}: ${body.slice(0, 200)}`
      );
      return;
    }
    console.log(`[mate-activation-email] sent to ${args.toEmail}`);
  } catch (err) {
    console.error(
      '[mate-activation-email] error:',
      err instanceof Error ? err.message : String(err)
    );
  }
  // Suppress unused-var warning for the helper that's there for future use.
  void config;
}
