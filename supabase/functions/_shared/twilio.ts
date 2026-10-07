/**
 * Twilio helpers (ELE-2022 calls and texts).
 *
 * TEST MODE: until TWILIO_ACCOUNT_SID / TWILIO_AUTH_TOKEN are set, texts are
 * logged instead of sent and webhook signatures can't be checked (callers must
 * then be internal: service key). Everything else runs for real.
 */

export const twilioLive = () =>
  !!Deno.env.get('TWILIO_ACCOUNT_SID') && !!Deno.env.get('TWILIO_AUTH_TOKEN');

/**
 * X-Twilio-Signature check: base64(HMAC-SHA1(authToken, publicUrl + sorted key+value pairs)).
 * `publicUrl` must be the address Twilio called (inside Supabase, req.url is not it).
 * https://www.twilio.com/docs/usage/security#validating-requests
 */
export async function validTwilioSignature(
  req: Request,
  params: Record<string, string>,
  publicUrl: string
): Promise<boolean> {
  const token = Deno.env.get('TWILIO_AUTH_TOKEN');
  const sig = req.headers.get('x-twilio-signature');
  if (!token || !sig) return false;
  const data =
    publicUrl +
    Object.keys(params)
      .sort()
      .map((k) => k + params[k])
      .join('');
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(token),
    { name: 'HMAC', hash: 'SHA-1' },
    false,
    ['sign']
  );
  const mac = new Uint8Array(await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data)));
  const expected = btoa(String.fromCharCode(...mac));
  // Constant-time compare
  if (expected.length !== sig.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) diff |= expected.charCodeAt(i) ^ sig.charCodeAt(i);
  return diff === 0;
}

/** Send a text from the account's Elec-Mate number. Logs instead in test mode. */
export async function sendSms(
  from: string,
  to: string,
  body: string
): Promise<{ sent: boolean; mock?: boolean }> {
  if (!twilioLive()) {
    console.log(`[twilio:test-mode] SMS ${from} → ${to}: ${body}`);
    return { sent: false, mock: true };
  }
  const sid = Deno.env.get('TWILIO_ACCOUNT_SID')!;
  const auth = btoa(`${sid}:${Deno.env.get('TWILIO_AUTH_TOKEN')}`);
  const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({ From: from, To: to, Body: body.slice(0, 600) }),
    signal: AbortSignal.timeout(10000),
  });
  if (!res.ok) {
    console.error('[twilio] SMS failed', res.status, (await res.text()).slice(0, 200));
    return { sent: false };
  }
  return { sent: true };
}

/** Download a voicemail recording (Twilio needs basic auth). Null in test mode / on failure. */
export async function fetchRecording(
  recordingUrl: string
): Promise<{ mime: string; data: string } | null> {
  if (!twilioLive() || !/^https:\/\/api\.twilio\.com\//.test(recordingUrl)) return null;
  const auth = btoa(`${Deno.env.get('TWILIO_ACCOUNT_SID')}:${Deno.env.get('TWILIO_AUTH_TOKEN')}`);
  const res = await fetch(`${recordingUrl}.mp3`, {
    headers: { Authorization: `Basic ${auth}` },
    signal: AbortSignal.timeout(15000),
  });
  if (!res.ok) return null;
  const buf = new Uint8Array(await res.arrayBuffer());
  if (buf.byteLength > 8 * 1024 * 1024) return null;
  let bin = '';
  for (let i = 0; i < buf.length; i += 0x8000)
    bin += String.fromCharCode(...buf.subarray(i, i + 0x8000));
  return { mime: 'audio/mpeg', data: btoa(bin) };
}

/** UK mobile? (only mobiles can receive the text-back) */
// 071-075 and 077-079 only: 070 (personal numbering) and 076 (pagers) are premium-rate traps
export const isUkMobile = (e164: string) => /^\+447[1-57-9]\d{8}$/.test(e164);

/** "+447700900123" → "07700 900123", "+441614960000" → "0161 496 0000" */
export const ukDisplay = (e164: string) => {
  if (!e164.startsWith('+44')) return e164;
  const n = `0${e164.slice(3)}`;
  if (n.startsWith('02')) return `${n.slice(0, 3)} ${n.slice(3, 7)} ${n.slice(7)}`; // 020 7946 0000
  if (/^0(11\d|1\d1|[389]\d\d)/.test(n)) return `${n.slice(0, 4)} ${n.slice(4, 7)} ${n.slice(7)}`; // 0161 496 0000, 0800 123 4567
  return `${n.slice(0, 5)} ${n.slice(5)}`; // 07700 900123, 01234 567890
};

export const twiml = (inner: string) =>
  new Response(`<?xml version="1.0" encoding="UTF-8"?><Response>${inner}</Response>`, {
    headers: { 'Content-Type': 'text/xml' },
  });

export const xmlEscape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
