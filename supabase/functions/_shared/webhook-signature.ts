/**
 * Webhook signature checks for providers that sign with a shared secret.
 * Without a configured secret the webhook REFUSES everything (fails closed):
 * an unsigned webhook lets anyone forge provider events. 7 Oct 2026.
 */
const enc = new TextEncoder();

async function hmacB64(key: Uint8Array | string, data: string): Promise<string> {
  const k = await crypto.subtle.importKey(
    'raw',
    (typeof key === 'string' ? enc.encode(key) : key) as BufferSource,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = new Uint8Array(await crypto.subtle.sign('HMAC', k, enc.encode(data)));
  return btoa(String.fromCharCode(...sig));
}

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let d = 0;
  for (let i = 0; i < a.length; i++) d |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return d === 0;
}

/** Resend / Svix: headers svix-id, svix-timestamp, svix-signature ("v1,<b64> ..."), secret "whsec_<b64>". */
export async function verifySvix(req: Request, rawBody: string, secret: string | undefined): Promise<boolean> {
  if (!secret) return false;
  const id = req.headers.get('svix-id');
  const ts = req.headers.get('svix-timestamp');
  const sigHeader = req.headers.get('svix-signature');
  if (!id || !ts || !sigHeader) return false;
  if (Math.abs(Date.now() / 1000 - Number(ts)) > 300) return false; // replay window
  const key = Uint8Array.from(atob(secret.replace(/^whsec_/, '')), (c) => c.charCodeAt(0));
  const expected = await hmacB64(key, `${id}.${ts}.${rawBody}`);
  return sigHeader.split(' ').some((part) => safeEqual(part.split(',')[1] ?? '', expected));
}

/** DocuSign Connect HMAC: header X-DocuSign-Signature-1 = base64(HMAC-SHA256(secret, body)). */
export async function verifyDocuSign(req: Request, rawBody: string, secret: string | undefined): Promise<boolean> {
  if (!secret) return false;
  const expected = await hmacB64(secret, rawBody);
  return ['1', '2', '3']
    .map((n) => req.headers.get(`x-docusign-signature-${n}`) ?? '')
    .some((s) => s && safeEqual(s, expected));
}
