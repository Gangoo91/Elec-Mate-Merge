/**
 * Signed unsubscribe links for client-facing automated email.
 *
 * Tokens are consumed by the public `unsubscribe` edge function (RFC 8058).
 * Pass `scope: 'customer_campaign'` + the electrician's user_id for
 * ELECTRICIAN→CLIENT mail (renewal reminders, visit reminders, campaigns):
 * the opt-out then flags `customers.campaign_opted_out_at` on that ONE
 * electrician's copy of the customer — a customer asking their electrician to
 * stop must not land on the global block list and silence every other sender.
 * Omit the scope only for Elec-Mate's own mail (winback/outreach), where the
 * global `email_suppressions` upsert is the correct behaviour.
 *
 * Extracted from send-winback-offer so the renewal/visit senders share one
 * implementation. Secret: WINBACK_UNSUBSCRIBE_SECRET (name is historical —
 * it signs every unsubscribe token, not just winback's).
 */

const SECRET = Deno.env.get('WINBACK_UNSUBSCRIBE_SECRET');
const MAILTO_FALLBACK = 'mailto:info@elec-mate.com?subject=unsubscribe';

function b64urlEncode(bytes: Uint8Array): string {
  let bin = '';
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function hmacSign(payload: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payload));
  return b64urlEncode(new Uint8Array(sig));
}

export async function buildUnsubscribeUrl(
  email: string,
  opts?: { scope?: 'customer_campaign' | 'morning_brief'; userId?: string }
): Promise<string> {
  if (!SECRET) {
    console.warn('WINBACK_UNSUBSCRIBE_SECRET not set — falling back to mailto unsubscribe');
    return MAILTO_FALLBACK;
  }
  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  if (!supabaseUrl) return MAILTO_FALLBACK;

  const payload = JSON.stringify({
    email: email.toLowerCase().trim(),
    issued_at: Math.floor(Date.now() / 1000),
    ...(opts?.scope && opts?.userId ? { scope: opts.scope, user_id: opts.userId } : {}),
  });
  const payloadB64 = b64urlEncode(new TextEncoder().encode(payload));
  const sig = await hmacSign(payloadB64, SECRET);
  return `${supabaseUrl}/functions/v1/unsubscribe?token=${payloadB64}.${sig}`;
}

/** RFC 8058 one-click headers, for providers that honour them. */
export function buildUnsubscribeHeaders(unsubscribeUrl: string): Record<string, string> {
  const isHttps = unsubscribeUrl.startsWith('https://');
  const headers: Record<string, string> = {
    'List-Unsubscribe': isHttps
      ? `<${unsubscribeUrl}>, <${MAILTO_FALLBACK}>`
      : `<${MAILTO_FALLBACK}>`,
  };
  if (isHttps) headers['List-Unsubscribe-Post'] = 'List-Unsubscribe=One-Click';
  return headers;
}
