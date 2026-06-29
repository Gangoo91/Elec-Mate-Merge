/**
 * Lead capture — public form submit handler (college + employer waitlists).
 *
 * Posts a warm lead into the audience-specific Brevo list:
 *   - college  → list 9 (warm college leads — separate from the cold pool)
 *   - employer → list 8 (employer early-access waitlist)
 * Form submission = explicit consent (soft opt-in for ongoing comms).
 *
 * Flow:
 *  1. Validates required fields (name, email, organisation).
 *  2. Upserts to the audience's Brevo list (updateEnabled=true, no 400 on dupes).
 *  3. Notifies founder@elec-mate.com so the lead gets seen the same day.
 *  4. Returns { ok: true }.
 *
 * No auth — public form. Rate-limit at the edge proxy if abuse appears.
 *
 * Backward compatible: callers that omit `audience` default to 'college' and
 * may send the org as `college` (the original field) — existing ForCollegesPage
 * keeps working unchanged.
 *
 * ENV VARS:
 *  - BREVO_API_KEY (required)
 *  - BREVO_COLLEGE_LEADS_LIST_ID  (defaults to 9 if unset)
 *  - BREVO_EMPLOYER_LEADS_LIST_ID (defaults to 8 if unset)
 *  - FOUNDER_NOTIFY_EMAIL (defaults to founder@elec-mate.com)
 */

import { serve, corsHeaders } from '../_shared/deps.ts';

const BREVO_CONTACTS_ENDPOINT = 'https://api.brevo.com/v3/contacts';
const BREVO_TRANSACTIONAL_EMAIL_ENDPOINT = 'https://api.brevo.com/v3/smtp/email';

const DEFAULT_COLLEGE_LIST_ID = 9;
const DEFAULT_EMPLOYER_LIST_ID = 8;
const DEFAULT_NOTIFY_EMAIL = 'founder@elec-mate.com';

type Audience = 'college' | 'employer';

const AUDIENCE_CONFIG: Record<
  Audience,
  { listEnv: string; defaultList: number; orgLabel: string; defaultSource: string }
> = {
  college: {
    listEnv: 'BREVO_COLLEGE_LEADS_LIST_ID',
    defaultList: DEFAULT_COLLEGE_LIST_ID,
    orgLabel: 'College',
    defaultSource: 'college_outreach_2026',
  },
  employer: {
    listEnv: 'BREVO_EMPLOYER_LEADS_LIST_ID',
    defaultList: DEFAULT_EMPLOYER_LIST_ID,
    orgLabel: 'Company',
    defaultSource: 'employer_waitlist_2026',
  },
};

interface Payload {
  name: string;
  email: string;
  /** Which waitlist — defaults to 'college' when omitted (backward compat). */
  audience?: Audience;
  /** Generic org field. Falls back to `college` if not provided. */
  organisation?: string;
  /** Legacy/college org field — kept for the existing ForCollegesPage caller. */
  college?: string;
  role?: string;
  phone?: string;
  message?: string;
  /** Optional override for the Brevo SIGNUP_SOURCE attribute. */
  signup_source?: string;
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
  lead: {
    audience: Audience;
    name: string;
    email: string;
    organisation: string;
    orgLabel: string;
    listId: number;
    role?: string;
    phone?: string;
    message?: string;
    utm?: Payload['utm'];
  }
): Promise<void> {
  const audienceLabel = lead.audience === 'employer' ? 'employer' : 'college';
  const html = `
    <h2>New ${audienceLabel} lead from the website</h2>
    <p><strong>Name:</strong> ${escapeHtml(lead.name)}</p>
    <p><strong>Email:</strong> <a href="mailto:${encodeURIComponent(lead.email)}">${escapeHtml(lead.email)}</a></p>
    <p><strong>${escapeHtml(lead.orgLabel)}:</strong> ${escapeHtml(lead.organisation)}</p>
    ${lead.role ? `<p><strong>Role:</strong> ${escapeHtml(lead.role)}</p>` : ''}
    ${lead.phone ? `<p><strong>Phone:</strong> ${escapeHtml(lead.phone)}</p>` : ''}
    ${lead.message ? `<p><strong>Message:</strong></p><blockquote style="border-left:3px solid #ddd;padding-left:12px;margin-left:0;color:#444;">${escapeHtml(lead.message).replace(/\n/g, '<br>')}</blockquote>` : ''}
    ${
      lead.utm?.source || lead.utm?.medium || lead.utm?.campaign
        ? `<p><small><strong>UTM:</strong> source=${escapeHtml(lead.utm?.source ?? '—')} · medium=${escapeHtml(lead.utm?.medium ?? '—')} · campaign=${escapeHtml(lead.utm?.campaign ?? '—')}</small></p>`
        : ''
    }
    <p><small>Brevo list ${lead.listId} has been updated. Reply directly to this email to reach ${escapeHtml(lead.name)}.</small></p>
  `;
  try {
    await fetch(BREVO_TRANSACTIONAL_EMAIL_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'api-key': apiKey },
      body: JSON.stringify({
        sender: { name: 'Elec-Mate Lead Capture', email: 'founder@elec-mate.com' },
        to: [{ email: toEmail }],
        replyTo: { email: lead.email, name: lead.name },
        subject: `[${lead.audience === 'employer' ? 'Employer' : 'College'} lead] ${lead.name} (${lead.organisation})`,
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

    const body = (await req.json()) as Payload;

    // Resolve audience first — it selects the Brevo list and notification copy.
    const audience: Audience = body.audience === 'employer' ? 'employer' : 'college';
    const cfg = AUDIENCE_CONFIG[audience];

    const listIdRaw = Deno.env.get(cfg.listEnv);
    const listId = listIdRaw ? parseInt(listIdRaw, 10) : cfg.defaultList;
    if (!Number.isFinite(listId)) {
      return new Response(JSON.stringify({ error: 'List not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const name = (body.name ?? '').trim();
    const email = (body.email ?? '').trim().toLowerCase();
    // Generic org field; falls back to the legacy `college` field.
    const organisation = (body.organisation ?? body.college ?? '').trim();

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
    if (!organisation || organisation.length < 2) {
      const msg =
        audience === 'employer'
          ? 'Which company are you with?'
          : 'Which college / organisation are you with?';
      return new Response(JSON.stringify({ error: msg }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Cap free-text fields so a runaway form doesn't blow up Brevo or
    // the founder's inbox.
    const role = (body.role ?? '').trim().slice(0, 80);
    const phone = (body.phone ?? '').trim().slice(0, 32);
    const message = (body.message ?? '').trim().slice(0, 1500);

    const signupSource = (body.signup_source ?? '').trim().slice(0, 80) || cfg.defaultSource;

    const { first, last } = splitName(name);
    // Org is stored in the COLLEGE attribute for both audiences — it's the only
    // org attribute known to exist in this Brevo account, and sending an
    // undefined attribute would 400 the whole contact. Audience is segmented by
    // list membership (8 vs 9) + SIGNUP_SOURCE, which is the source of truth.
    const attributes: Record<string, string | undefined> = {
      FIRSTNAME: first,
      LASTNAME: last,
      COLLEGE: organisation.slice(0, 120),
      ROLE: role || undefined,
      PHONE: phone || undefined,
      MESSAGE: message || undefined,
      SIGNUP_SOURCE: signupSource,
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
      audience,
      name,
      email,
      organisation,
      orgLabel: cfg.orgLabel,
      listId,
      role,
      phone,
      message,
      utm: body.utm,
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
