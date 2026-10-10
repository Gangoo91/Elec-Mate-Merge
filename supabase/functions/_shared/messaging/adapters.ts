/**
 * Customer messaging adapters (ELE-2070).
 *
 * One interface, one adapter per provider. The database decides WHETHER a
 * message may go (scope, consent, STOP, allowance, WhatsApp window: see
 * queue_customer_message); an adapter only knows HOW to hand it to a provider
 * and how to read that provider's webhooks.
 *
 *   sandbox  stores, never sends. The default for every firm.
 *   twilio   SMS from the firm's +447 number (or alpha sender), WhatsApp via
 *            Twilio's WhatsApp sender. Needs TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN,
 *            and for WhatsApp templates TWILIO_WHATSAPP_CONTENT_SIDS (JSON map
 *            template_key → Content SID, approved by Meta).
 *   meta     WhatsApp Cloud API direct. Needs META_WHATSAPP_TOKEN, META_APP_SECRET,
 *            META_WEBHOOK_VERIFY_TOKEN, META_WHATSAPP_TEMPLATES (JSON map
 *            template_key → approved template name, language en_GB).
 *   email    the platform mailer (Brevo/Resend) through clientFacingSender.
 *
 * Bird and Vonage are accepted values in the database but have no adapter yet:
 * a send to them fails with a clear message rather than silently.
 */

export type Channel = 'sms' | 'whatsapp' | 'email';

export interface OutboundMessage {
  id: string;
  channel: Channel;
  to: string; // E.164 or email
  from: string | null; // E.164, alpha sender, or null
  body: string;
  templateKey: string | null;
  /** Filled-in template values, for providers that send templates by name. */
  templateParams?: string[];
  subject?: string;
  sender?: { from: string; replyTo?: string };
}

export interface SendResult {
  ok: boolean;
  providerMessageId: string | null;
  status: 'sandbox' | 'sent' | 'failed';
  error?: string;
}

export interface MessagingAdapter {
  name: string;
  send(msg: OutboundMessage): Promise<SendResult>;
}

const enc = new TextEncoder();

/** Constant-time string compare. */
export function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function hmacHex(
  alg: 'SHA-256' | 'SHA-1',
  secret: string,
  data: string
): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: alg },
    false,
    ['sign']
  );
  const mac = new Uint8Array(await crypto.subtle.sign('HMAC', key, enc.encode(data)));
  return Array.from(mac)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

// ── sandbox ────────────────────────────────────────────────────────────────
export const sandboxAdapter: MessagingAdapter = {
  name: 'sandbox',
  send(msg) {
    // Deliberately nothing leaves Elec-Mate. The row already says 'sandbox'.
    console.log(`[messaging:sandbox] ${msg.channel} ${msg.id} stored, not sent`);
    return Promise.resolve({ ok: true, providerMessageId: `sandbox-${msg.id}`, status: 'sandbox' });
  },
};

// ── twilio ─────────────────────────────────────────────────────────────────
function jsonEnv(name: string): Record<string, string> {
  try {
    const v = JSON.parse(Deno.env.get(name) ?? '{}');
    return v && typeof v === 'object' ? (v as Record<string, string>) : {};
  } catch {
    return {};
  }
}

export const twilioAdapter: MessagingAdapter = {
  name: 'twilio',
  async send(msg) {
    const sid = Deno.env.get('TWILIO_ACCOUNT_SID');
    const token = Deno.env.get('TWILIO_AUTH_TOKEN');
    if (!sid || !token)
      return {
        ok: false,
        providerMessageId: null,
        status: 'failed',
        error: 'Twilio is not set up yet',
      };
    if (!msg.from)
      return {
        ok: false,
        providerMessageId: null,
        status: 'failed',
        error: 'No sending number for this firm',
      };
    const statusCallback = `${Deno.env.get('SUPABASE_URL')}/functions/v1/customer-message-inbound?provider=twilio&kind=status`;
    const form = new URLSearchParams({ To: msg.to, StatusCallback: statusCallback });
    if (msg.channel === 'whatsapp') {
      form.set('From', `whatsapp:${msg.from}`);
      form.set('To', `whatsapp:${msg.to}`);
      const contentSid = msg.templateKey
        ? jsonEnv('TWILIO_WHATSAPP_CONTENT_SIDS')[msg.templateKey]
        : undefined;
      if (contentSid) {
        form.set('ContentSid', contentSid);
        form.set(
          'ContentVariables',
          JSON.stringify(
            Object.fromEntries((msg.templateParams ?? []).map((v, i) => [String(i + 1), v]))
          )
        );
      } else {
        form.set('Body', msg.body);
      }
    } else {
      form.set('From', msg.from);
      form.set('Body', msg.body);
    }
    const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${btoa(`${sid}:${token}`)}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: form,
      signal: AbortSignal.timeout(10_000),
    });
    const data = (await res.json().catch(() => ({}))) as {
      sid?: string;
      message?: string;
      code?: number;
    };
    if (!res.ok || !data.sid) {
      return {
        ok: false,
        providerMessageId: null,
        status: 'failed',
        error: data.message ?? `Twilio ${res.status}`,
      };
    }
    return { ok: true, providerMessageId: data.sid, status: 'sent' };
  },
};

/**
 * X-Twilio-Signature: base64(HMAC-SHA1(auth token, public URL + each POST
 * param name+value, sorted by name)). https://www.twilio.com/docs/usage/webhooks/webhooks-security
 */
export async function validTwilio(
  signature: string | null,
  publicUrl: string,
  params: Record<string, string>
): Promise<boolean> {
  const token = Deno.env.get('TWILIO_AUTH_TOKEN');
  if (!token || !signature) return false;
  const data =
    publicUrl +
    Object.keys(params)
      .sort()
      .map((k) => k + params[k])
      .join('');
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(token),
    { name: 'HMAC', hash: 'SHA-1' },
    false,
    ['sign']
  );
  const mac = new Uint8Array(await crypto.subtle.sign('HMAC', key, enc.encode(data)));
  return safeEqual(btoa(String.fromCharCode(...mac)), signature);
}

// ── meta (WhatsApp Cloud API) ──────────────────────────────────────────────
const GRAPH = 'https://graph.facebook.com/v21.0';

export function metaAdapter(phoneNumberId: string | null): MessagingAdapter {
  return {
    name: 'meta',
    async send(msg) {
      const token = Deno.env.get('META_WHATSAPP_TOKEN');
      if (!token || !phoneNumberId) {
        return {
          ok: false,
          providerMessageId: null,
          status: 'failed',
          error: 'WhatsApp is not set up yet',
        };
      }
      if (msg.channel !== 'whatsapp') {
        return {
          ok: false,
          providerMessageId: null,
          status: 'failed',
          error: 'Meta only sends WhatsApp',
        };
      }
      const templateName = msg.templateKey
        ? jsonEnv('META_WHATSAPP_TEMPLATES')[msg.templateKey]
        : undefined;
      const body = templateName
        ? {
            messaging_product: 'whatsapp',
            to: msg.to.replace(/^\+/, ''),
            type: 'template',
            template: {
              name: templateName,
              language: { code: 'en_GB' },
              components: [
                {
                  type: 'body',
                  parameters: (msg.templateParams ?? []).map((text) => ({ type: 'text', text })),
                },
              ],
            },
          }
        : {
            messaging_product: 'whatsapp',
            to: msg.to.replace(/^\+/, ''),
            type: 'text',
            text: { body: msg.body, preview_url: true },
          };
      const res = await fetch(`${GRAPH}/${phoneNumberId}/messages`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(10_000),
      });
      const data = (await res.json().catch(() => ({}))) as {
        messages?: { id: string }[];
        error?: { message?: string };
      };
      const id = data.messages?.[0]?.id ?? null;
      if (!res.ok || !id) {
        return {
          ok: false,
          providerMessageId: null,
          status: 'failed',
          error: data.error?.message ?? `Meta ${res.status}`,
        };
      }
      return { ok: true, providerMessageId: id, status: 'sent' };
    },
  };
}

/** X-Hub-Signature-256: "sha256=" + hex HMAC-SHA256(app secret, raw body). */
export async function validMeta(signature: string | null, rawBody: string): Promise<boolean> {
  const secret = Deno.env.get('META_APP_SECRET');
  if (!secret || !signature?.startsWith('sha256=')) return false;
  return safeEqual(await hmacHex('SHA-256', secret, rawBody), signature.slice(7));
}

/**
 * Sandbox and internal relays (e.g. the inbound email worker) sign with
 * MESSAGING_INBOUND_SECRET: header x-elecmate-signature = t=<unix>,v1=<hex
 * HMAC-SHA256(secret, `${t}.${raw body}`)>, accepted for 5 minutes.
 */
export async function validInternal(header: string | null, rawBody: string): Promise<boolean> {
  const secret = Deno.env.get('MESSAGING_INBOUND_SECRET');
  if (!secret || !header) return false;
  const parts = Object.fromEntries(
    header.split(',').map((p) => p.trim().split('=') as [string, string])
  );
  const t = Number(parts.t);
  if (!Number.isFinite(t) || Math.abs(Date.now() / 1000 - t) > 300 || !parts.v1) return false;
  return safeEqual(await hmacHex('SHA-256', secret, `${parts.t}.${rawBody}`), parts.v1);
}

export function adapterFor(
  provider: string,
  channel: Channel,
  phoneNumberId: string | null
): MessagingAdapter | null {
  if (provider === 'sandbox') return sandboxAdapter;
  if (channel === 'email') return null; // email goes through the mailer, see customer-message-send
  if (provider === 'twilio') return twilioAdapter;
  if (provider === 'meta') return channel === 'whatsapp' ? metaAdapter(phoneNumberId) : null;
  return null;
}
