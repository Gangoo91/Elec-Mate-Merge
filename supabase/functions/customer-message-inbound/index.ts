/**
 * customer-message-inbound (ELE-2070): customers' replies and delivery receipts.
 *
 *   POST ?provider=twilio               inbound SMS / WhatsApp (form-encoded)
 *   POST ?provider=twilio&kind=status   delivery receipts (StatusCallback)
 *   GET  ?provider=meta                 Meta's subscribe check (hub.challenge)
 *   POST ?provider=meta                 WhatsApp Cloud API messages + statuses
 *   POST ?provider=internal             sandbox tests and the inbound email relay (JSON)
 *
 * Every POST is verified before anything is read or stored:
 *   twilio   X-Twilio-Signature, HMAC-SHA1 with TWILIO_AUTH_TOKEN over the PUBLIC
 *            URL (inside Supabase req.url is not what Twilio signed) + sorted params
 *   meta     X-Hub-Signature-256, HMAC-SHA256 of the raw body with META_APP_SECRET
 *   internal x-elecmate-signature t=..,v1=.. with MESSAGING_INBOUND_SECRET (5 min)
 * A request that fails the check gets 401 and touches nothing. With no secret
 * set, every request fails the check: the function is inert until set up.
 *
 * The number a message was sent TO picks the firm (_msg_firm_for_number); the
 * database matches the client, records STOP / START, and rings the office bell
 * (_customer_inbound_record). Retries are harmless: the provider message id is
 * unique, so a repeat is dropped.
 *
 * Gap §4.10, one number per account: the texting number IS the account's
 * phone line (phone_lines), and that number's Twilio voice and SMS webhooks
 * both point at twilio-inbound, which hands texts from known clients to the
 * inbox (_customer_inbound_record) and keeps the rest as enquiries. This
 * function is for WhatsApp (Meta or Twilio), Twilio delivery receipts
 * (StatusCallback) and the internal relay. _msg_firm_for_number knows the
 * phone line too, so a text that does arrive here still finds its firm.
 *
 * Deploy with --no-verify-jwt (providers have no Supabase JWT). NOT DEPLOYED.
 */
import { createClient } from '../_shared/deps.ts';
import {
  validInternal,
  validMeta,
  validTwilio,
  type Channel,
} from '../_shared/messaging/adapters.ts';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const PUBLIC_URL = `${SUPABASE_URL}/functions/v1/customer-message-inbound`;
const MAX_BODY = 256 * 1024;

const db = () => createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false } });
const text = (status: number, body = '') =>
  new Response(body, { status, headers: { 'Content-Type': 'text/plain' } });
const twimlOk = () =>
  new Response('<?xml version="1.0" encoding="UTF-8"?><Response></Response>', {
    status: 200,
    headers: { 'Content-Type': 'text/xml' },
  });

async function record(
  firm: string | null,
  channel: Channel,
  from: string,
  to: string | null,
  body: string,
  provider: string,
  providerId: string | null
) {
  if (!firm) {
    console.warn('customer-message-inbound: no firm for number', channel, to);
    return;
  }
  const { error } = await db().rpc('_customer_inbound_record', {
    p_firm: firm,
    p_channel: channel,
    p_from: from,
    p_to: to,
    p_body: body,
    p_provider: provider,
    p_provider_message_id: providerId,
  });
  if (error) throw new Error(`record failed: ${error.message}`);
}

async function firmFor(channel: Channel, to: string): Promise<string | null> {
  const { data, error } = await db().rpc('_msg_firm_for_number', { p_channel: channel, p_to: to });
  if (error) throw new Error(`firm lookup failed: ${error.message}`);
  return (data as string | null) ?? null;
}

async function status(provider: string, id: string | null, s: string | null, err: string | null) {
  if (!id || !s) return;
  const { error } = await db().rpc('_customer_message_status', {
    p_provider: provider,
    p_provider_message_id: id,
    p_status: s,
    p_error: err,
  });
  if (error) console.error('customer-message-inbound: status update failed', error.message);
}

Deno.serve(async (req) => {
  const url = new URL(req.url);
  const provider = url.searchParams.get('provider') ?? '';
  try {
    // Meta's one-off subscribe check.
    if (req.method === 'GET' && provider === 'meta') {
      const token = Deno.env.get('META_WEBHOOK_VERIFY_TOKEN');
      if (
        token &&
        url.searchParams.get('hub.mode') === 'subscribe' &&
        url.searchParams.get('hub.verify_token') === token
      ) {
        return text(200, url.searchParams.get('hub.challenge') ?? '');
      }
      return text(403);
    }
    if (req.method !== 'POST') return text(405);

    const raw = await req.text();
    if (raw.length > MAX_BODY) return text(413);

    if (provider === 'twilio') {
      const params = Object.fromEntries(new URLSearchParams(raw)) as Record<string, string>;
      if (
        !(await validTwilio(req.headers.get('x-twilio-signature'), PUBLIC_URL + url.search, params))
      ) {
        return text(401);
      }
      if (url.searchParams.get('kind') === 'status') {
        await status(
          'twilio',
          params.MessageSid ?? null,
          params.MessageStatus ?? null,
          params.ErrorMessage ?? params.ErrorCode ?? null
        );
        return text(204);
      }
      const whatsapp = (params.From ?? '').startsWith('whatsapp:');
      const channel: Channel = whatsapp ? 'whatsapp' : 'sms';
      const from = (params.From ?? '').replace(/^whatsapp:/, '');
      const to = (params.To ?? '').replace(/^whatsapp:/, '');
      const media = Number(params.NumMedia ?? 0) > 0 ? ' [photo or file attached]' : '';
      const body = `${params.Body ?? ''}${media}`.trim();
      if (from && body)
        await record(
          await firmFor(channel, to),
          channel,
          from,
          to,
          body,
          'twilio',
          params.MessageSid ?? null
        );
      return twimlOk(); // no automatic reply
    }

    if (provider === 'meta') {
      if (!(await validMeta(req.headers.get('x-hub-signature-256'), raw))) return text(401);
      const payload = JSON.parse(raw) as {
        entry?: {
          changes?: {
            value?: {
              metadata?: { phone_number_id?: string; display_phone_number?: string };
              messages?: {
                from: string;
                id: string;
                type: string;
                text?: { body?: string };
                button?: { text?: string };
              }[];
              statuses?: { id: string; status: string; errors?: { title?: string }[] }[];
            };
          }[];
        }[];
      };
      for (const entry of payload.entry ?? []) {
        for (const change of entry.changes ?? []) {
          const v = change.value ?? {};
          const phoneId = v.metadata?.phone_number_id ?? '';
          for (const s of v.statuses ?? [])
            await status('meta', s.id, s.status, s.errors?.[0]?.title ?? null);
          if (!v.messages?.length) continue;
          const firm = await firmFor('whatsapp', phoneId);
          for (const m of v.messages) {
            const body =
              m.type === 'text'
                ? (m.text?.body ?? '')
                : m.type === 'button'
                  ? (m.button?.text ?? '')
                  : `[${m.type} sent]`;
            await record(
              firm,
              'whatsapp',
              `+${m.from}`,
              v.metadata?.display_phone_number ?? null,
              body,
              'meta',
              m.id
            );
          }
        }
      }
      return text(200);
    }

    if (provider === 'internal') {
      if (!(await validInternal(req.headers.get('x-elecmate-signature'), raw))) return text(401);
      const m = JSON.parse(raw) as {
        firm_id?: string;
        channel?: Channel;
        from?: string;
        to?: string;
        body?: string;
        id?: string;
      };
      if (!m.channel || !['sms', 'whatsapp', 'email'].includes(m.channel) || !m.from || !m.body)
        return text(400);
      const firm =
        m.firm_id ?? (m.to && m.channel !== 'email' ? await firmFor(m.channel, m.to) : null);
      await record(
        firm,
        m.channel,
        m.from,
        m.to ?? null,
        m.body,
        m.channel === 'email' ? 'email' : 'sandbox',
        m.id ?? null
      );
      return text(204);
    }

    return text(404);
  } catch (e) {
    // A 5xx makes the provider retry later; the unique provider id makes that safe.
    console.error('customer-message-inbound failed', provider, (e as Error).message);
    return text(500);
  }
});
