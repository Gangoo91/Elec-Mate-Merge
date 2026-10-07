/**
 * Confirmation tokens for Employer Mate's write actions (7 Oct 2026).
 *
 * A write never runs on the model's say-so. The model can only PREVIEW: the
 * preview mints a token that carries the exact action and arguments, the user
 * the preview was shown to, the firm, a nonce and a 10-minute expiry, all
 * signed with HMAC-SHA256. Executing needs that token back from the user's own
 * Confirm (a separate request the model never sees), and the server re-checks
 * every bound field. Change one argument, swap the user or wait too long and it
 * is refused. The nonce is recorded in the audit log so a token runs once.
 *
 * Pure (Web Crypto only), so it is unit-tested on its own.
 */

export const CONFIRM_TTL_MS = 10 * 60 * 1000;
export const UNDO_TTL_MS = 15 * 60 * 1000;

export type TokenKind = 'confirm' | 'undo';

export interface ActionPayload {
  v: 1;
  /** confirm = run the action; undo = reverse one Mate just ran. */
  k: TokenKind;
  /** The action (tool) name. */
  t: string;
  /** The exact arguments the preview showed. */
  a: Record<string, unknown>;
  /** The user the card was shown to. */
  u: string;
  /** The firm the action is for. */
  f: string;
  /** Expiry, ms since epoch. */
  e: number;
  /** One-time nonce. */
  n: string;
}

export type VerifyError =
  | 'malformed'
  | 'bad_signature'
  | 'wrong_kind'
  | 'wrong_user'
  | 'wrong_firm'
  | 'wrong_action'
  | 'args_mismatch'
  | 'expired';

/** Stable JSON: object keys sorted at every level, so equal args sign equally. */
export function canonical(v: unknown): string {
  if (v === null || typeof v !== 'object') return JSON.stringify(v ?? null);
  if (Array.isArray(v)) return '[' + v.map((x) => canonical(x)).join(',') + ']';
  const o = v as Record<string, unknown>;
  return (
    '{' +
    Object.keys(o)
      .filter((k) => o[k] !== undefined)
      .sort()
      .map((k) => JSON.stringify(k) + ':' + canonical(o[k]))
      .join(',') +
    '}'
  );
}

const enc = new TextEncoder();

function b64url(bytes: Uint8Array): string {
  let s = '';
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function unb64url(s: string): Uint8Array {
  const p = s.replace(/-/g, '+').replace(/_/g, '/');
  const bin = atob(p + '='.repeat((4 - (p.length % 4)) % 4));
  return Uint8Array.from(bin, (c) => c.charCodeAt(0));
}

async function hmac(secret: string, data: string): Promise<Uint8Array> {
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  return new Uint8Array(await crypto.subtle.sign('HMAC', key, enc.encode(data)));
}

function sameBytes(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

export async function signAction(
  secret: string,
  p: Omit<ActionPayload, 'v' | 'e' | 'n'> & { ttlMs?: number; now?: number; nonce?: string }
): Promise<{ token: string; payload: ActionPayload }> {
  if (!secret) throw new Error('No signing secret');
  const payload: ActionPayload = {
    v: 1,
    k: p.k,
    t: p.t,
    a: p.a,
    u: p.u,
    f: p.f,
    e: (p.now ?? Date.now()) + (p.ttlMs ?? (p.k === 'undo' ? UNDO_TTL_MS : CONFIRM_TTL_MS)),
    n: p.nonce ?? crypto.randomUUID(),
  };
  const body = b64url(enc.encode(canonical(payload)));
  const sig = b64url(await hmac(secret, body));
  return { token: `${body}.${sig}`, payload };
}

export async function verifyAction(
  secret: string,
  token: unknown,
  expect: {
    kind: TokenKind;
    userId: string;
    firmId: string;
    /** When given, the token must be for this action. */
    action?: string;
    /** When given, the signed args must equal these exactly. */
    args?: Record<string, unknown>;
    now?: number;
  }
): Promise<{ ok: true; payload: ActionPayload } | { ok: false; error: VerifyError }> {
  if (!secret || typeof token !== 'string' || token.length > 8000) return { ok: false, error: 'malformed' };
  const parts = token.split('.');
  if (parts.length !== 2 || !parts[0] || !parts[1]) return { ok: false, error: 'malformed' };
  let given: Uint8Array;
  try {
    given = unb64url(parts[1]);
  } catch {
    return { ok: false, error: 'malformed' };
  }
  if (!sameBytes(given, await hmac(secret, parts[0]))) return { ok: false, error: 'bad_signature' };
  let payload: ActionPayload;
  try {
    payload = JSON.parse(new TextDecoder().decode(unb64url(parts[0])));
  } catch {
    return { ok: false, error: 'malformed' };
  }
  if (!payload || payload.v !== 1 || typeof payload.t !== 'string' || typeof payload.e !== 'number') {
    return { ok: false, error: 'malformed' };
  }
  if (payload.k !== expect.kind) return { ok: false, error: 'wrong_kind' };
  if (payload.u !== expect.userId) return { ok: false, error: 'wrong_user' };
  if (payload.f !== expect.firmId) return { ok: false, error: 'wrong_firm' };
  if (expect.action && payload.t !== expect.action) return { ok: false, error: 'wrong_action' };
  if (expect.args && canonical(expect.args) !== canonical(payload.a)) return { ok: false, error: 'args_mismatch' };
  if ((expect.now ?? Date.now()) >= payload.e) return { ok: false, error: 'expired' };
  return { ok: true, payload };
}

/** Plain words for a refused token. */
export function verifyErrorText(e: VerifyError): string {
  if (e === 'expired') return 'That confirmation has expired (they last 10 minutes). Ask Mate again and confirm the new card.';
  if (e === 'wrong_user' || e === 'wrong_firm') return 'That confirmation was made for someone else, so it was not used.';
  return 'That confirmation is not valid, so nothing was changed. Ask Mate again.';
}
