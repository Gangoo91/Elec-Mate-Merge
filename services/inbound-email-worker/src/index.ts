/**
 * Inbound enquiry email worker (ELE-2022)
 *
 * Cloudflare Email Routing catch-all on in.elec-mate.com → this Email Worker.
 * Parses the raw MIME message and POSTs the useful parts to the Supabase edge
 * function `inbound-enquiry-email`, which works out whose inbox it is (token in
 * the address), reads the enquiry with AI and stores it.
 *
 * The worker deliberately does no business logic: if Supabase is down we reject
 * the message with a temporary failure so the sending server retries later.
 */

import PostalMime from 'postal-mime';

export interface Env {
  SUPABASE_FUNCTION_URL: string; // https://<project>.supabase.co/functions/v1/inbound-enquiry-email
  INBOUND_EMAIL_SECRET: string; // shared secret, same value set on the edge function
}

const MAX_RAW_BYTES = 25 * 1024 * 1024; // room for a few phone photos
const MAX_TEXT_CHARS = 50_000;
const MAX_PHOTOS = 4;
const MAX_PHOTO_BYTES = 4 * 1024 * 1024;
const PHOTO_TYPES = /^image\/(jpeg|png|webp|heic|heif|gif)$/i;

function toBase64(buf: ArrayBuffer | Uint8Array | string): string {
  if (typeof buf === 'string') return btoa(buf);
  const bytes = buf instanceof Uint8Array ? buf : new Uint8Array(buf);
  let bin = '';
  for (let i = 0; i < bytes.length; i += 0x8000) {
    bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  }
  return btoa(bin);
}

export default {
  async email(message: ForwardableEmailMessage, env: Env): Promise<void> {
    if (message.rawSize > MAX_RAW_BYTES) {
      message.setReject('Message too large');
      return;
    }

    const raw = await new Response(message.raw).arrayBuffer();
    const parsed = await PostalMime.parse(raw);

    const payload = {
      to: message.to,
      envelope_from: message.from,
      from: parsed.from?.address ?? message.from,
      from_name: parsed.from?.name ?? null,
      reply_to: parsed.replyTo?.[0]?.address ?? null,
      subject: (parsed.subject ?? '').slice(0, 500),
      text: (parsed.text ?? '').slice(0, MAX_TEXT_CHARS),
      html: (parsed.html ?? '').slice(0, MAX_TEXT_CHARS),
      message_id: parsed.messageId ?? null,
      date: parsed.date ?? null,
      // Forwarded-by-Gmail mail carries the original sender here
      original_from: message.headers.get('x-original-from') ?? null,
      auto_submitted: message.headers.get('auto-submitted') ?? null,
      // Newsletter / bulk markers: filed as spam without an AI read
      list_unsubscribe: message.headers.get('list-unsubscribe') ?? null,
      precedence: message.headers.get('precedence') ?? null,
      // Customer photos (a picture of the board, the fault…). Inline logos and
      // signature images are skipped by size.
      photos: (parsed.attachments ?? [])
        .filter((a) => PHOTO_TYPES.test(a.mimeType ?? ''))
        .map((a) => ({ a, size: typeof a.content === 'string' ? a.content.length : a.content.byteLength }))
        .filter(({ size }) => size >= 20 * 1024 && size <= MAX_PHOTO_BYTES)
        .slice(0, MAX_PHOTOS)
        .map(({ a }) => ({
          filename: a.filename ?? null,
          mime_type: a.mimeType,
          data: toBase64(a.content as ArrayBuffer | string),
        })),
    };

    const res = await fetch(env.SUPABASE_FUNCTION_URL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-inbound-secret': env.INBOUND_EMAIL_SECRET,
      },
      body: JSON.stringify(payload),
    });

    if (res.status >= 500) {
      // Temporary failure: throwing makes Cloudflare return a 4xx-temp so the sender retries
      throw new Error(`inbound-enquiry-email ${res.status}`);
    }
    if (res.status === 404) {
      message.setReject('Unknown recipient');
    }
    // 2xx (stored) and 4xx other than 404 (spam / rate-limited) are accepted silently
  },
};
