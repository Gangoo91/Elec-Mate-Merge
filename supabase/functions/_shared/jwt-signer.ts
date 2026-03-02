/**
 * Shared JWT Signing Utilities
 *
 * Single source of truth for signing Supabase-compatible JWTs.
 * Used by provision-business-ai and rotate-agent-jwt.
 *
 * Produces standard HMAC-SHA256 JWTs with claims that work with
 * Supabase RLS policies (sub, aud, role, iss, iat, exp).
 */

/**
 * Base64url encode (no padding, URL-safe).
 */
export function base64UrlEncode(data: Uint8Array): string {
  const base64 = btoa(String.fromCharCode(...data));
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/**
 * Sign a JWT payload using HMAC-SHA256.
 * Returns a standard three-part JWT string.
 */
export async function signJwt(payload: Record<string, unknown>, secret: string): Promise<string> {
  const header = { alg: 'HS256', typ: 'JWT' };

  const encoder = new TextEncoder();

  const headerB64 = base64UrlEncode(encoder.encode(JSON.stringify(header)));
  const payloadB64 = base64UrlEncode(encoder.encode(JSON.stringify(payload)));

  const signingInput = `${headerB64}.${payloadB64}`;

  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(signingInput));

  const signatureB64 = base64UrlEncode(new Uint8Array(signature));

  return `${headerB64}.${payloadB64}.${signatureB64}`;
}

/**
 * Build a standard Supabase-compatible JWT payload for an agent.
 */
export function buildAgentJwtPayload(opts: {
  userId: string;
  email: string;
  userRole: string;
  expiresAt: number;
}): Record<string, unknown> {
  const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
  // Extract host from URL for issuer claim — must match Supabase auth issuer
  const host = supabaseUrl.replace('https://', '').replace('http://', '');

  return {
    sub: opts.userId,
    aud: 'authenticated',
    role: 'authenticated',
    iss: `https://${host}/auth/v1`,
    iat: Math.floor(Date.now() / 1000),
    exp: opts.expiresAt,
    email: opts.email,
    user_role: opts.userRole,
    agent: true,
  };
}

/**
 * Constant-time string comparison to prevent timing attacks.
 */
export function timingSafeEqual(a: string, b: string): boolean {
  const encoder = new TextEncoder();
  const bufA = encoder.encode(a);
  const bufB = encoder.encode(b);
  if (bufA.byteLength !== bufB.byteLength) return false;
  let result = 0;
  for (let i = 0; i < bufA.byteLength; i++) {
    result |= bufA[i] ^ bufB[i];
  }
  return result === 0;
}
