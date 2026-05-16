// _shared/mailer.ts
//
// Drop-in Resend-compatible shim backed by Brevo's REST API.
//
// Why: Resend banned elec-mate.com at domain level after a bulk marketing
// send. We migrated to Brevo (Linear ELE-765). This shim keeps the existing
// `new Resend(apiKey).emails.send({ from, to, subject, html, ... })` call
// sites working unchanged — only the import path flips from the npm SDK to
// this file.
//
// Advantages over importing 'npm:resend':
//   - Plain fetch(), no npm SDK → no Deno Deploy compatibility issues (ELE-703)
//   - Can swap provider again by editing this one file
//   - Same signature means `git diff` across the 37 functions is a one-liner each

const BREVO_ENDPOINT = 'https://api.brevo.com/v3/smtp/email';
const DEFAULT_FROM = {
  email: 'founder@elec-mate.com',
  name: 'Elec-Mate',
};

// ─── Public types (mirror Resend SDK) ───────────────────────────
export interface ResendSendParams {
  from: string; // "Name <email@x>" or "email@x"
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  replyTo?: string;
  cc?: string | string[];
  bcc?: string | string[];
  headers?: Record<string, string>;
  // Resend accepts {name,value} objects; we flatten to Brevo string tags.
  tags?: Array<{ name: string; value: string } | string>;
  attachments?: Array<{
    filename: string;
    content: string | Uint8Array; // base64 string or raw bytes
  }>;
}

export interface ResendSendResult {
  data: { id: string } | null;
  error: { message: string; name?: string } | null;
}

// ─── Address parsing ────────────────────────────────────────────
interface BrevoAddress {
  email: string;
  name?: string;
}

function parseAddress(input: string): BrevoAddress {
  const match = input.match(/^(.+?)\s*<([^>]+)>\s*$/);
  if (match) {
    const name = match[1].trim().replace(/^"|"$/g, '');
    return { name: name || undefined, email: match[2].trim() };
  }
  return { email: input.trim() };
}

function parseAddresses(input: string | string[]): BrevoAddress[] {
  const arr = Array.isArray(input) ? input : [input];
  return arr.filter(Boolean).map(parseAddress);
}

function bytesToBase64(bytes: Uint8Array): string {
  let bin = '';
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin);
}

// ─── Brevo HTTP call ────────────────────────────────────────────
async function brevoSend(
  apiKey: string,
  params: ResendSendParams
): Promise<ResendSendResult> {
  if (!apiKey) {
    return {
      data: null,
      error: { message: 'BREVO_API_KEY not set', name: 'missing_api_key' },
    };
  }

  const sender = params.from ? parseAddress(params.from) : DEFAULT_FROM;
  const to = parseAddresses(params.to);
  if (to.length === 0) {
    return {
      data: null,
      error: { message: 'No recipients provided', name: 'no_recipients' },
    };
  }

  const body: Record<string, unknown> = {
    sender,
    to,
    subject: params.subject,
  };

  if (params.html) body.htmlContent = params.html;
  if (params.text) body.textContent = params.text;
  // Accept both camelCase (Resend SDK) and snake_case (legacy call sites
  // pre-migration). ELE-662 — many edge functions still pass `reply_to`,
  // which was silently dropped before this alias was added, causing client
  // replies to land on the sender (founder@elec-mate.com) instead of the
  // electrician.
  const replyToRaw = params.replyTo ?? (params as Record<string, unknown>).reply_to;
  if (typeof replyToRaw === 'string' && replyToRaw.trim()) {
    body.replyTo = parseAddress(replyToRaw);
  }
  if (params.cc) body.cc = parseAddresses(params.cc);
  if (params.bcc) body.bcc = parseAddresses(params.bcc);
  if (params.headers && Object.keys(params.headers).length) body.headers = params.headers;

  if (params.tags?.length) {
    const flat = params.tags
      .map((t) => (typeof t === 'string' ? t : `${t.name}:${t.value}`))
      .slice(0, 10); // Brevo caps at 10
    body.tags = flat;
  }

  if (params.attachments?.length) {
    body.attachment = params.attachments.map((a) => ({
      name: a.filename,
      content:
        typeof a.content === 'string' ? a.content : bytesToBase64(a.content),
    }));
  }

  try {
    const res = await fetch(BREVO_ENDPOINT, {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(body),
    });

    const raw = await res.text();
    if (!res.ok) {
      let message = raw;
      try {
        const parsed = JSON.parse(raw);
        message = parsed.message || parsed.error || raw;
      } catch {
        /* keep raw text */
      }
      return {
        data: null,
        error: { message: `Brevo (${res.status}): ${message}`, name: 'brevo_error' },
      };
    }

    let id = '';
    try {
      const parsed = JSON.parse(raw);
      id = parsed.messageId || '';
    } catch {
      /* ignore */
    }
    return { data: { id }, error: null };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return { data: null, error: { message: msg, name: 'network_error' } };
  }
}

// ─── Drop-in Resend class ───────────────────────────────────────
export class Resend {
  private apiKey: string;
  public emails: { send: (p: ResendSendParams) => Promise<ResendSendResult> };
  public batch: {
    send: (emails: ResendSendParams[]) => Promise<{
      data: { data: Array<{ id: string }> } | null;
      error: { message: string } | null;
    }>;
  };

  constructor(apiKey?: string) {
    // Priority: BREVO_API_KEY env var ALWAYS wins, because most legacy call
    // sites do `new Resend(Deno.env.get('RESEND_API_KEY'))` — that value is
    // a now-banned Resend key that Brevo would reject. Only fall back to
    // the constructor argument if Brevo isn't configured (dev/test).
    const brevoEnv = Deno.env.get('BREVO_API_KEY');
    this.apiKey = brevoEnv || apiKey || Deno.env.get('RESEND_API_KEY') || '';

    this.emails = { send: (p) => brevoSend(this.apiKey, p) };

    this.batch = {
      // Brevo has no multi-recipient atomic batch endpoint. We serial-send
      // with concurrency 5 — still well under Brevo's rate limit and much
      // faster than truly serial. Matches Resend's return shape exactly.
      send: async (emails) => {
        const results: Array<{ id: string }> = [];
        const errors: string[] = [];
        const concurrency = 5;
        for (let i = 0; i < emails.length; i += concurrency) {
          const slice = emails.slice(i, i + concurrency);
          const settled = await Promise.all(
            slice.map((e) => brevoSend(this.apiKey, e))
          );
          for (const r of settled) {
            if (r.error) errors.push(r.error.message);
            else if (r.data) results.push({ id: r.data.id });
          }
        }
        if (results.length === 0 && errors.length > 0) {
          return { data: null, error: { message: errors[0] } };
        }
        return { data: { data: results }, error: null };
      },
    };
  }
}

// ─── Functional export (new code can use this directly) ────────
export async function sendEmail(
  params: ResendSendParams
): Promise<ResendSendResult> {
  const apiKey = Deno.env.get('BREVO_API_KEY') || Deno.env.get('RESEND_API_KEY') || '';
  return brevoSend(apiKey, params);
}

// ─── Client-facing sender helper ────────────────────────────────
// Every email the PLATFORM sends to an ELECTRICIAN'S CLIENT (quotes,
// invoices, reminders, certs, photos, scope, AI agent) MUST use this.
//
// Why a helper:
//   - DMARC alignment requires the From-domain to match the DKIM domain
//     Brevo signs with (elec-mate.com). Sending From the electrician's
//     own company email would fail DMARC at strict receivers (Gmail
//     Workspace, O365), landing in spam.
//   - So From is LOCKED to `noreply@elec-mate.com` (Brevo-signed,
//     intentionally unmonitored — no replies should ever land in an
//     Elec-Mate inbox). The electrician's COMPANY NAME is the display
//     name, so the client's inbox shows "ABC Electrical" as the sender.
//   - Reply-To is the electrician's company_email (preferred) or auth
//     email. Refuses any @elec-mate.com address — that's how founder@
//     ended up receiving client replies historically (ELE-662).
//   - If a recipient client ignores Reply-To (Outlook does this), the
//     reply goes to noreply@ and is dropped. Never to a real person at
//     Elec-Mate. This is the explicit design intent.
//
// Do not roll your own. Touching `from:` manually in a user→client
// edge function is a Linear ticket waiting to happen.

const CLIENT_FACING_SENDER_ADDRESS = 'noreply@elec-mate.com';

export interface ClientFacingSenderInput {
  /** Electrician's company name — shown to client as the From display name */
  companyName: string | null | undefined;
  /** Electrician's company email — preferred Reply-To target */
  companyEmail?: string | null;
  /** Electrician's auth/login email — Reply-To fallback */
  userEmail?: string | null;
}

export interface ClientFacingSender {
  from: string;
  replyTo?: string;
}

export function clientFacingSender(
  input: ClientFacingSenderInput
): ClientFacingSender {
  // Sanitise the display name. RFC 5322 forbids '<', '>', '"' in display
  // text without quoting; just strip them to avoid header injection.
  const rawName = (input.companyName || '').trim();
  const safeName = (rawName || 'Your Electrician').replace(/[<>"\r\n]/g, '');
  const from = `${safeName} <${CLIENT_FACING_SENDER_ADDRESS}>`;

  // Reply-To cascade. Reject anything @elec-mate.com — historically the
  // root cause of replies bouncing to founder@ when company_email was
  // unset and the fallback resolved to an internal alias.
  const candidates = [input.companyEmail, input.userEmail];
  let replyTo: string | undefined;
  for (const raw of candidates) {
    const v = (raw || '').trim();
    if (!v) continue;
    if (v.toLowerCase().endsWith('@elec-mate.com')) continue;
    replyTo = v;
    break;
  }

  return { from, replyTo };
}

// ─── HTML → plain-text fallback ─────────────────────────────────
// Brevo (and good practice) wants both an HTML body and a text body so
// Outlook force-plaintext mode and accessibility tools render the
// message correctly. Cheap stripper — not a full HTML parser, fine for
// our transactional templates. Pass the result as `text:` on the
// emailOptions and Brevo will use it as the text/plain alternative.

export function htmlToPlainText(html: string): string {
  if (!html) return '';
  return html
    // Drop <style> and <script> blocks entirely
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    // Turn block-level tags into line breaks before stripping
    .replace(/<\/(p|div|h[1-6]|li|tr|br)>/gi, '\n')
    .replace(/<br\s*\/?>/gi, '\n')
    // Strip all remaining tags
    .replace(/<[^>]+>/g, '')
    // Decode the handful of entities that appear in our templates
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&pound;/g, '£')
    // Collapse runs of whitespace and blank lines
    .replace(/[ \t]+/g, ' ')
    .replace(/\n[ \t]+/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}
