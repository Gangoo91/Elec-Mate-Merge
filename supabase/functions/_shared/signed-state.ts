/**
 * Tamper-proof OAuth `state`: base64url(JSON) + "." + HMAC-SHA256, keyed with
 * the service-role key (server-only). The callback trusts nothing it cannot
 * verify. Before 7 Oct 2026 the Stripe Connect state was plain JSON, so anyone
 * could put another user's id in it and connect THEIR OWN Stripe account to
 * that user's profile — the victim's customers' payments would go to them.
 */
const enc = new TextEncoder();
const b64url = (b: Uint8Array) => btoa(String.fromCharCode(...b)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const fromB64url = (s: string) => Uint8Array.from(atob(s.replace(/-/g, '+').replace(/_/g, '/')), (c) => c.charCodeAt(0));

async function hmac(data: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')! + ':oauth-state'),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  return b64url(new Uint8Array(await crypto.subtle.sign('HMAC', key, enc.encode(data))));
}

export async function signState(payload: Record<string, unknown>, ttlSeconds = 1800): Promise<string> {
  const body = b64url(enc.encode(JSON.stringify({ ...payload, exp: Math.floor(Date.now() / 1000) + ttlSeconds })));
  return `${body}.${await hmac(body)}`;
}

/** The payload, or null if the state was altered, forged or has expired. */
export async function verifyState<T extends Record<string, unknown>>(state: string | null): Promise<T | null> {
  if (!state || !state.includes('.')) return null;
  const [body, sig] = state.split('.', 2);
  const expected = await hmac(body);
  if (expected.length !== sig.length) return null;
  let diff = 0;
  for (let i = 0; i < sig.length; i++) diff |= sig.charCodeAt(i) ^ expected.charCodeAt(i);
  if (diff !== 0) return null;
  try {
    const p = JSON.parse(new TextDecoder().decode(fromB64url(body))) as T & { exp?: number };
    if (!p.exp || p.exp < Date.now() / 1000) return null;
    return p;
  } catch {
    return null;
  }
}

/** Where an OAuth flow may send the user back to: our site or the native app's local origin. */
export function safeReturnUrl(url: unknown, fallback: string): string {
  try {
    const u = new URL(String(url));
    const host = u.hostname;
    const ours = host === 'elec-mate.com' || host.endsWith('.elec-mate.com');
    const local = host === 'localhost' || host === '127.0.0.1';
    if ((ours && u.protocol === 'https:') || local) return u.toString();
  } catch {
    /* fall through */
  }
  return fallback;
}
