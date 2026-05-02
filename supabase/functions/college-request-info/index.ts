/**
 * College request-info — public form submit handler.
 *
 * Posts a college contact into Brevo list ID 9 (the "warm college leads"
 * list — separate from the cold scraped pool). Used as the landing-page
 * CTA from the college outreach email campaign so leads who fill the
 * form land on a list with explicit consent (form submission = soft
 * opt-in for ongoing comms).
 *
 * Flow:
 *  1. Validates required fields (name, email, college).
 *  2. Upserts to Brevo list 9 (updateEnabled=true, no 400 on dupes).
 *  3. Notifies founder@elec-mate.com so the lead gets seen the same day.
 *  4. Returns { ok: true }.
 *
 * No auth — public form. Rate-limit at the edge proxy if abuse appears.
 *
 * ENV VARS:
 *  - BREVO_API_KEY (required)
 *  - BREVO_COLLEGE_LEADS_LIST_ID (defaults to 9 if unset)
 *  - FOUNDER_NOTIFY_EMAIL (defaults to founder@elec-mate.com)
 */

import { serve, corsHeaders } from '../_shared/deps.ts';

const BREVO_CONTACTS_ENDPOINT = 'https://api.brevo.com/v3/contacts';
const BREVO_TRANSACTIONAL_EMAIL_ENDPOINT = 'https://api.brevo.com/v3/smtp/email';

const DEFAULT_LIST_ID = 9;
const DEFAULT_NOTIFY_EMAIL = 'founder@elec-mate.com';

interface Payload {
  name: string;
  email: string;
  college: string;
  role?: string;
  phone?: string;
  message?: string;
  /** Optional UTM block from the landing page */
  utm?: {
    source?: string;
    medium?: string;
    campaign?: string;
  };
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function splitName(full: string): { first: string; last: string | undefined } {
  const parts = full.trim().split(/\s+/);
  const first = parts[0] ?? '';
  const last = parts.length > 1 ? parts.slice(1).join(' ') : undefined;
  return { first, last };
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
    updateEnabled: true,
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
    console.error('[college-request-info] Brevo contact error', err);
    return { ok: false, status: 0 };
  }
}

/**
 * Notify the founder via Brevo transactional email so they see the lead
 * the moment it lands. Fire-and-forget — don't block the form response
 * on SMTP delivery.
 */
async function notifyFounder(
  apiKey: string,
  toEmail: string,
  payload: Payload
): Promise<void> {
  const html = `
    <h2>New college lead from the website</h2>
    <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
    <p><strong>Email:</strong> <a href="mailto:${encodeURIComponent(payload.email)}">${escapeHtml(payload.email)}</a></p>
    <p><strong>College:</strong> ${escapeHtml(payload.college)}</p>
    ${payload.role ? `<p><strong>Role:</strong> ${escapeHtml(payload.role)}</p>` : ''}
    ${payload.phone ? `<p><strong>Phone:</strong> ${escapeHtml(payload.phone)}</p>` : ''}
    ${payload.message ? `<p><strong>Message:</strong></p><blockquote style="border-left:3px solid #ddd;padding-left:12px;margin-left:0;color:#444;">${escapeHtml(payload.message).replace(/\n/g, '<br>')}</blockquote>` : ''}
    ${
      payload.utm?.source || payload.utm?.medium || payload.utm?.campaign
        ? `<p><small><strong>UTM:</strong> source=${escapeHtml(payload.utm?.source ?? '—')} · medium=${escapeHtml(payload.utm?.medium ?? '—')} · campaign=${escapeHtml(payload.utm?.campaign ?? '—')}</small></p>`
        : ''
    }
    <p><small>Brevo list 9 has been updated. Reply directly to this email to reach ${escapeHtml(payload.name)}.</small></p>
  `;
  try {
    await fetch(BREVO_TRANSACTIONAL_EMAIL_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'api-key': apiKey },
      body: JSON.stringify({
        sender: { name: 'Elec-Mate Lead Capture', email: 'founder@elec-mate.com' },
        to: [{ email: toEmail }],
        replyTo: { email: payload.email, name: payload.name },
        subject: `[Lead] ${payload.name} (${payload.college})`,
        htmlContent: html,
      }),
    });
  } catch (err) {
    // Logged but not surfaced to client — the lead is captured in Brevo
    // either way, this is just the founder's heads-up.
    console.error('[college-request-info] Founder notify failed', err);
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
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
      return new Response(JSON.stringify({ error: 'Server not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const listIdRaw = Deno.env.get('BREVO_COLLEGE_LEADS_LIST_ID');
    const listId = listIdRaw ? parseInt(listIdRaw, 10) : DEFAULT_LIST_ID;
    if (!Number.isFinite(listId)) {
      return new Response(JSON.stringify({ error: 'List not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const body = (await req.json()) as Payload;
    const name = (body.name ?? '').trim();
    const email = (body.email ?? '').trim().toLowerCase();
    const college = (body.college ?? '').trim();

    if (!name || name.length < 2) {
      return new Response(JSON.stringify({ error: 'Please tell us your name.' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    if (!email || !isValidEmail(email)) {
      return new Response(JSON.stringify({ error: 'Please enter a valid email address.' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    if (!college || college.length < 2) {
      return new Response(JSON.stringify({ error: 'Which college / organisation are you with?' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Cap free-text fields so a runaway form doesn't blow up Brevo or
    // the founder's inbox.
    const role = (body.role ?? '').trim().slice(0, 80);
    const phone = (body.phone ?? '').trim().slice(0, 32);
    const message = (body.message ?? '').trim().slice(0, 1500);

    const { first, last } = splitName(name);
    const attributes: Record<string, string | undefined> = {
      FIRSTNAME: first,
      LASTNAME: last,
      COLLEGE: college.slice(0, 120),
      ROLE: role || undefined,
      PHONE: phone || undefined,
      MESSAGE: message || undefined,
      SIGNUP_SOURCE: 'college_outreach_2026',
      UTM_SOURCE: body.utm?.source,
      UTM_MEDIUM: body.utm?.medium,
      UTM_CAMPAIGN: body.utm?.campaign,
    };

    const brevo = await addToBrevoList(apiKey, email, listId, attributes);

    if (!brevo.ok) {
      const brevoErr = (brevo.response as { message?: string })?.message;
      console.warn('[college-request-info] Brevo non-OK', {
        status: brevo.status,
        response: brevo.response,
      });
      return new Response(
        JSON.stringify({
          error: brevoErr || "We couldn't add you to the list — please try again or email founder@elec-mate.com.",
        }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Notify the founder. Fire-and-forget — even if the SMTP send fails,
    // the lead is safely on Brevo list 9 and the form succeeds for the
    // user. Don't block their response on it.
    const notifyTo = Deno.env.get('FOUNDER_NOTIFY_EMAIL') || DEFAULT_NOTIFY_EMAIL;
    void notifyFounder(apiKey, notifyTo, {
      ...body,
      name,
      email,
      college,
      role,
      phone,
      message,
    });

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('[college-request-info] Handler error', err);
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : 'Unexpected error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
