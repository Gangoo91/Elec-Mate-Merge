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
import { sendCheatSheetEmail } from '../_shared/cheatsheet-email.ts';

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
    const wantsCheatSheet =
      body.source === 'lead_magnet_cheatsheet' || body.source === 'exit_intent';

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
