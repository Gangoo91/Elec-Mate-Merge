/**
 * PostHog server-side capture — single function, no SDK.
 *
 * Called from webhook handlers (Stripe, RevenueCat) to fire conversion events
 * that happen outside the browser. PostHog's public capture API accepts the
 * same project API key that the client uses.
 *
 * ENV:
 *  - POSTHOG_API_KEY — project API key (same `phc_...` key used in VITE_POSTHOG_KEY)
 *  - POSTHOG_HOST — defaults to https://eu.i.posthog.com (EU region)
 *
 * Docs: https://posthog.com/docs/api/post-only-endpoints
 */

const DEFAULT_HOST = 'https://eu.i.posthog.com';

export interface PostHogEvent {
  distinct_id: string; // the Supabase user ID — matches what client posthog.identify() uses
  event: string;
  properties?: Record<string, unknown>;
}

/**
 * Fire-and-forget — never throws, logs failures. Safe from inside webhook
 * handlers where we don't want analytics failures to 500 the webhook response.
 */
export async function capturePostHogEvent(ev: PostHogEvent): Promise<void> {
  const apiKey = Deno.env.get('POSTHOG_API_KEY');
  const host = Deno.env.get('POSTHOG_HOST') || DEFAULT_HOST;
  if (!apiKey) return; // Silent no-op when not configured

  try {
    const res = await fetch(`${host}/capture/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: apiKey,
        event: ev.event,
        distinct_id: ev.distinct_id,
        properties: {
          ...(ev.properties || {}),
          $lib: 'elec-mate-edge-fn',
        },
        timestamp: new Date().toISOString(),
      }),
    });
    if (!res.ok) {
      console.warn('[posthog-server] capture failed', res.status, await res.text().catch(() => ''));
    }
  } catch (err) {
    console.warn('[posthog-server] capture threw (non-fatal)', err);
  }
}
