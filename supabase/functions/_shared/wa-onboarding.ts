/**
 * Shared helpers for the WhatsApp deep-link onboarding flow.
 *
 * Used by:
 *   - `generate-wa-code` — user-initiated code generation (auth-gated)
 *   - `stripe-subscription-webhook` — auto-generates a code the moment a
 *     paid Business AI subscription activates, so the user lands on the
 *     welcome page with a code already waiting.
 */

// Source of truth for Mate's WhatsApp number. Keep in sync with
// src/constants/mate.ts (MATE_PHONE_RAW). Override via env if needed
// (e.g. for staging or when we move to a number pool).
const MATE_PHONE_RAW =
  (typeof Deno !== 'undefined' && Deno.env.get('MATE_WHATSAPP_NUMBER')) || '447507241303';

const CODE_TTL_HOURS = 24;
const MAX_CODES_PER_HOUR = 3;

export const VERIFICATION_METHOD_WA = 'whatsapp_deeplink' as const;

/** Crypto-secure 6-digit numeric code. */
export function generateCode(): string {
  const buf = new Uint32Array(1);
  crypto.getRandomValues(buf);
  return String(100000 + (buf[0] % 900000));
}

export function buildDeeplink(code: string): string {
  return `https://wa.me/${MATE_PHONE_RAW}?text=${encodeURIComponent(`START ${code}`)}`;
}

export interface WaCodeResult {
  code: string;
  deeplink: string;
  expires_at: string;
  expires_in_seconds: number;
}

/**
 * Generates a fresh WhatsApp activation code for `userId`, soft-revoking
 * any prior unused codes. Uses the supplied (already-authenticated) Supabase
 * client. Caller is responsible for whatever auth + business-rule checks
 * make sense at the call site (e.g. business_ai_enabled gate).
 *
 * Idempotent: if a non-expired unused code already exists for this user,
 * returns it instead of generating a new one. This is what makes calling
 * from a Stripe webhook safe — webhook retries won't churn codes.
 *
 * Returns { code, deeplink, expires_at, expires_in_seconds }.
 *
 * Throws { code: 'RATE_LIMIT_ERROR' } if the user has generated more than
 * MAX_CODES_PER_HOUR in the last hour.
 */
export async function generateWaCodeForUser(
  // deno-lint-ignore no-explicit-any
  supabase: any,
  userId: string
): Promise<WaCodeResult> {
  // Idempotency: return an existing pending code if one is still valid.
  const { data: pending } = await supabase
    .from('phone_verification_codes')
    .select('code, expires_at')
    .eq('user_id', userId)
    .eq('verification_method', VERIFICATION_METHOD_WA)
    .is('verified_at', null)
    .gt('expires_at', new Date().toISOString())
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (pending) {
    return {
      code: pending.code,
      deeplink: buildDeeplink(pending.code),
      expires_at: pending.expires_at,
      expires_in_seconds: Math.max(
        0,
        Math.floor((new Date(pending.expires_at).getTime() - Date.now()) / 1000)
      ),
    };
  }

  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const { count: recentCodes } = await supabase
    .from('phone_verification_codes')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('verification_method', VERIFICATION_METHOD_WA)
    .gte('created_at', oneHourAgo);

  if ((recentCodes ?? 0) >= MAX_CODES_PER_HOUR) {
    const err = new Error('Too many activation codes generated. Try again in an hour.');
    (err as Error & { code?: string }).code = 'RATE_LIMIT_ERROR';
    throw err;
  }

  // Soft-revoke any prior pending WA codes (mark verified_at to a sentinel
  // far past so they no longer match the partial unique index used by the
  // verifier). We avoid a hard DELETE so we keep an audit trail.
  await supabase
    .from('phone_verification_codes')
    .update({ verified_at: new Date(0).toISOString(), attempts: 99 })
    .eq('user_id', userId)
    .eq('verification_method', VERIFICATION_METHOD_WA)
    .is('verified_at', null);

  const code = generateCode();
  const expiresAtMs = Date.now() + CODE_TTL_HOURS * 60 * 60 * 1000;
  const expiresAt = new Date(expiresAtMs).toISOString();

  const { error: insertError } = await supabase.from('phone_verification_codes').insert({
    user_id: userId,
    phone_number: '', // unknown until the user messages from WhatsApp
    code,
    expires_at: expiresAt,
    verification_method: VERIFICATION_METHOD_WA,
  });

  if (insertError) {
    throw new Error(`Failed to store WA verification code: ${insertError.message}`);
  }

  return {
    code,
    deeplink: buildDeeplink(code),
    expires_at: expiresAt,
    expires_in_seconds: CODE_TTL_HOURS * 60 * 60,
  };
}
