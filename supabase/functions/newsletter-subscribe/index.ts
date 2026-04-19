/**
 * Newsletter subscribe — adds an email to a Brevo contact list.
 *
 * Called from the landing page email capture form + exit-intent modal.
 * Also used by lead-magnet downloads: the magnet PDF URL is returned
 * so the client can trigger the download after successful capture.
 *
 * Fires a server-side Meta CAPI `Lead` event with the same event_id the
 * client-side Pixel fired (or a fresh one if the client didn't fire).
 *
 * ENV VARS:
 *  - BREVO_API_KEY
 *  - BREVO_NEWSLETTER_LIST_ID (numeric list ID from Brevo dashboard)
 *  - BREVO_LEAD_MAGNET_LIST_ID (optional — separate list for magnet downloads)
 *  - LEAD_MAGNET_CHEATSHEET_URL (signed URL or public path to the PDF)
 */

import { serve, corsHeaders } from '../_shared/deps.ts';
import { fireCapiEvent } from '../_shared/meta-capi.ts';
import { Resend } from '../_shared/mailer.ts';

const BREVO_CONTACTS_ENDPOINT = 'https://api.brevo.com/v3/contacts';

type Source = 'landing_form' | 'exit_intent' | 'lead_magnet_cheatsheet' | 'footer' | 'other';

interface Payload {
  email: string;
  first_name?: string;
  last_name?: string;
  source: Source;
  event_id?: string; // for Meta CAPI dedup with browser Pixel
  utm?: Record<string, string | null | undefined>;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Send the "Your BS 7671 A4:2026 cheat sheet is here" transactional email
 * with a link (not attachment) to the PDF. Link-based delivery has
 * significantly better inbox placement than attachments, and mobile clients
 * handle the CTA button far better than they handle PDFs.
 *
 * Fire-and-forget from the caller — never throws.
 */
async function sendCheatSheetEmail(
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
  <meta name="color-scheme" content="dark">
  <meta name="supported-color-schemes" content="dark">
  <title>Your BS 7671 A4:2026 cheat sheet</title>
  <style>
    :root { color-scheme: dark; supported-color-schemes: dark; }
    body { margin: 0; padding: 0; width: 100%; background-color: #0a0a0a; }
    @media screen and (max-width: 480px) {
      .mobile-padding { padding-left: 20px !important; padding-right: 20px !important; }
      .mobile-stack { display: block !important; width: 100% !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #0a0a0a;">
    <tr>
      <td align="center" style="padding: 40px 16px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 560px; background-color: #111111; border-radius: 20px; overflow: hidden; border: 1px solid #262626;">

          <!-- Header with logo + badge -->
          <tr>
            <td align="center" style="padding: 40px 32px 16px;" class="mobile-padding">
              <img src="${logoUrl}" alt="Elec-Mate" width="64" height="64" style="display: block; border-radius: 14px; margin-bottom: 24px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="background-color: rgba(251, 191, 36, 0.1); border: 1px solid rgba(251, 191, 36, 0.3); border-radius: 999px; padding: 6px 14px;">
                    <span style="color: #fbbf24; font-size: 11px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase;">⚡ Your download</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Heading -->
          <tr>
            <td align="center" style="padding: 16px 32px 8px;" class="mobile-padding">
              <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #ffffff; line-height: 1.2; letter-spacing: -0.02em;">
                BS 7671 A4:2026<br>
                <span style="color: #fbbf24;">Cheat Sheet</span>
              </h1>
            </td>
          </tr>

          <!-- Greeting + body -->
          <tr>
            <td style="padding: 24px 32px 8px;" class="mobile-padding">
              <p style="margin: 0 0 14px; font-size: 16px; color: #ffffff; line-height: 1.5;">
                ${greeting}
              </p>
              <p style="margin: 0 0 12px; font-size: 15px; color: #ffffff; line-height: 1.65;">
                Here's the two-pager you asked for — every change in the 2026 amendment on one sheet. Stick it on the van dash, pin it above the bench, or keep it on your phone for the next inspection.
              </p>
            </td>
          </tr>

          <!-- Feature list -->
          <tr>
            <td style="padding: 8px 32px 24px;" class="mobile-padding">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #1a1a1a; border-radius: 14px; border: 1px solid #262626;">
                <tr>
                  <td style="padding: 20px 22px;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="padding: 8px 0; font-size: 14px; color: #ffffff;">
                          <span style="color: #fbbf24;">✓</span>&nbsp;&nbsp;AFDD requirements — where they're now mandatory
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; font-size: 14px; color: #ffffff;">
                          <span style="color: #fbbf24;">✓</span>&nbsp;&nbsp;TN-C-S (PNB) changes and bonding implications
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; font-size: 14px; color: #ffffff;">
                          <span style="color: #fbbf24;">✓</span>&nbsp;&nbsp;New columns on the Schedule of Test Results
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; font-size: 14px; color: #ffffff;">
                          <span style="color: #fbbf24;">✓</span>&nbsp;&nbsp;Model form updates — what changed vs. 18th ed. A3
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main CTA -->
          <tr>
            <td style="padding: 0 32px 24px;" class="mobile-padding">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td align="center">
                    <a href="${pdfUrl}" style="display: block; padding: 18px 32px; background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); color: #0a0a0a; font-size: 16px; font-weight: 700; text-decoration: none; border-radius: 12px; text-align: center;">
                      📄 &nbsp;Download the cheat sheet
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin: 12px 0 0; text-align: center; font-size: 12px; color: #9ca3af;">
                PDF · opens in your browser · save to your phone
              </p>
            </td>
          </tr>

          <!-- Secondary pitch -->
          <tr>
            <td style="padding: 8px 32px 0;" class="mobile-padding">
              <div style="border-top: 1px solid #262626; padding-top: 28px;">
                <p style="margin: 0 0 10px; font-size: 12px; font-weight: 600; color: #9ca3af; text-transform: uppercase; letter-spacing: 1px;">
                  While you're here
                </p>
                <p style="margin: 0 0 16px; font-size: 15px; color: #ffffff; line-height: 1.6;">
                  If the cheat sheet's useful, the full platform probably will be too — certificates (EICR, EIC, Minor Works, PAT, Fire Alarm, Solar PV, EV), voice quotes, 60+ calculators, and five AI specialists trained on BS 7671.
                </p>
                <p style="margin: 0 0 24px; font-size: 14px; color: #9ca3af; line-height: 1.6;">
                  7 days free, no card up front.
                </p>
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                  <tr>
                    <td align="center">
                      <a href="https://elec-mate.com/auth/signup?utm_source=email&utm_medium=cheatsheet&utm_campaign=lead_magnet" style="display: inline-block; padding: 14px 28px; background-color: transparent; color: #fbbf24; font-size: 14px; font-weight: 600; text-decoration: none; border-radius: 10px; border: 1.5px solid rgba(251,191,36,0.4);">
                        Try Elec-Mate free →
                      </a>
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 32px;" class="mobile-padding">
              <p style="margin: 0 0 6px; font-size: 13px; color: #9ca3af; text-align: center;">
                Questions? Reply to this email — we read every one.
              </p>
              <p style="margin: 12px 0 0; font-size: 11px; color: #6b7280; text-align: center;">
                © ${year} Elec-Mate Ltd · Made in the UK
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

async function addToBrevoList(
  apiKey: string,
  email: string,
  listId: number,
  attributes: Record<string, string | undefined>
): Promise<{ ok: boolean; status: number; response?: unknown }> {
  const body: Record<string, unknown> = {
    email,
    listIds: [listId],
    updateEnabled: true, // upsert — don't 400 on duplicate emails
    attributes: Object.fromEntries(
      Object.entries(attributes).filter(([, v]) => v !== undefined && v !== '')
    ),
  };
  try {
    const res = await fetch(BREVO_CONTACTS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify(body),
    });
    const response = await res.json().catch(() => ({}));
    return { ok: res.ok, status: res.status, response };
  } catch (err) {
    console.error('[newsletter-subscribe] Brevo error', err);
    return { ok: false, status: 0 };
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const apiKey = Deno.env.get('BREVO_API_KEY');
    if (!apiKey) {
      console.error('[newsletter-subscribe] BREVO_API_KEY not configured');
      return new Response(JSON.stringify({ error: 'Not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const body = (await req.json()) as Payload;
    const email = body.email?.trim().toLowerCase();
    if (!email || !isValidEmail(email)) {
      return new Response(JSON.stringify({ error: 'Valid email required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const isLeadMagnet = body.source === 'lead_magnet_cheatsheet';
    const listIdRaw = isLeadMagnet
      ? Deno.env.get('BREVO_LEAD_MAGNET_LIST_ID') || Deno.env.get('BREVO_NEWSLETTER_LIST_ID')
      : Deno.env.get('BREVO_NEWSLETTER_LIST_ID');
    const listId = listIdRaw ? parseInt(listIdRaw, 10) : NaN;

    if (!Number.isFinite(listId)) {
      console.error('[newsletter-subscribe] BREVO_NEWSLETTER_LIST_ID not configured');
      return new Response(JSON.stringify({ error: 'List not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const attributes: Record<string, string | undefined> = {
      FIRSTNAME: body.first_name,
      LASTNAME: body.last_name,
      SIGNUP_SOURCE: body.source,
      UTM_SOURCE: body.utm?.utm_source ?? undefined,
      UTM_MEDIUM: body.utm?.utm_medium ?? undefined,
      UTM_CAMPAIGN: body.utm?.utm_campaign ?? undefined,
      GCLID: body.utm?.gclid ?? undefined,
      FBCLID: body.utm?.fbclid ?? undefined,
    };

    const brevo = await addToBrevoList(apiKey, email, listId, attributes);

    if (!brevo.ok) {
      const brevoErr = (brevo.response as { message?: string; code?: string })?.message;
      console.warn('[newsletter-subscribe] Brevo returned non-OK', {
        status: brevo.status,
        response: brevo.response,
      });
      return new Response(
        JSON.stringify({ error: brevoErr || 'Failed to subscribe', status: brevo.status }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Fire Meta CAPI Lead — deduped with the browser Pixel via event_id
    const eventId = body.event_id || `lead_${crypto.randomUUID()}`;
    fireCapiEvent({
      event_name: 'Lead',
      event_id: eventId,
      action_source: 'website',
      email,
      first_name: body.first_name,
      last_name: body.last_name,
      country: 'gb',
      custom_data: { content_name: body.source },
    });

    const pdfUrl = Deno.env.get('LEAD_MAGNET_CHEATSHEET_URL') || null;
    const wantsCheatSheet = body.source === 'lead_magnet_cheatsheet' || body.source === 'exit_intent';

    // Fire the cheat sheet email for lead magnet + exit intent sources.
    // Fire-and-forget — don't block the response on SMTP.
    if (wantsCheatSheet && pdfUrl) {
      sendCheatSheetEmail(email, body.first_name, pdfUrl).catch(() => {});
    }

    const download_url = isLeadMagnet ? pdfUrl : null;

    return new Response(JSON.stringify({ ok: true, event_id: eventId, download_url }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('[newsletter-subscribe] Handler error', err);
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : String(err) }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
