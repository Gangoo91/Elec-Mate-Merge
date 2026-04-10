/**
 * HMAC request signing for API key auth.
 * Prevents phone number spoofing by requiring cryptographic proof
 * that the caller knows both the phone number AND the HMAC secret.
 *
 * Flow:
 *   1. mcp-call script signs: HMAC-SHA256(phone:timestamp:nonce, secret)
 *   2. MCP server verifies signature + checks timestamp freshness + nonce uniqueness
 *   3. Only then trusts the phone number for JWT lookup
 */

import { createHmac, timingSafeEqual, randomBytes } from 'crypto';

const MAX_AGE_MS = 5 * 60 * 1000; // 5 minutes — reject stale requests
const NONCE_CACHE_MAX = 10_000;

// In-memory nonce deduplication (prevents replay within MAX_AGE_MS window)
const _usedNonces = new Map<string, number>();

// Cleanup stale nonces every 2 minutes
setInterval(
  () => {
    const cutoff = Date.now() - MAX_AGE_MS;
    for (const [nonce, ts] of _usedNonces) {
      if (ts < cutoff) _usedNonces.delete(nonce);
    }
  },
  2 * 60 * 1000
).unref();

/**
 * Generate a signature for a request.
 * Used by mcp-call scripts to sign outgoing requests.
 */
export function signRequest(
  phone: string,
  timestamp: number,
  nonce: string,
  secret: string
): string {
  const payload = `${phone}:${timestamp}:${nonce}`;
  return createHmac('sha256', secret).update(payload).digest('hex');
}

/**
 * Generate a random nonce.
 */
export function generateNonce(): string {
  return randomBytes(16).toString('hex');
}

/**
 * Verify a signed request.
 * Returns { valid: true } or { valid: false, reason: string }.
 */
export function verifySignedRequest(
  phone: string,
  timestamp: number,
  nonce: string,
  signature: string,
  secret: string
): { valid: true } | { valid: false; reason: string } {
  // Check timestamp freshness
  const age = Math.abs(Date.now() - timestamp);
  if (age > MAX_AGE_MS) {
    return { valid: false, reason: 'Request expired — timestamp too old' };
  }

  // Check nonce uniqueness (replay protection)
  if (_usedNonces.has(nonce)) {
    return { valid: false, reason: 'Duplicate nonce — possible replay attack' };
  }

  // Verify HMAC signature (timing-safe)
  const expected = signRequest(phone, timestamp, nonce, secret);
  const sigBuf = Buffer.from(signature, 'hex');
  const expBuf = Buffer.from(expected, 'hex');

  if (sigBuf.length !== expBuf.length || !timingSafeEqual(sigBuf, expBuf)) {
    return { valid: false, reason: 'Invalid signature' };
  }

  // Mark nonce as used (prevent replay)
  if (_usedNonces.size >= NONCE_CACHE_MAX) {
    // Evict oldest entries when cache is full
    const oldest = [..._usedNonces.entries()].sort((a, b) => a[1] - b[1]).slice(0, 1000);
    for (const [k] of oldest) _usedNonces.delete(k);
  }
  _usedNonces.set(nonce, Date.now());

  return { valid: true };
}

/**
 * Timing-safe string comparison for API keys.
 * Prevents timing attacks on key comparison.
 */
export function timingSafeCompare(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  return timingSafeEqual(Buffer.from(a), Buffer.from(b));
}
