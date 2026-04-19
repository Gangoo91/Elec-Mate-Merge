/**
 * Meta Conversions API (CAPI) — HTTP forwarder.
 *
 * Thin HTTP wrapper around _shared/meta-capi.ts. Used by client-side code
 * (src/lib/marketing-pixels.ts) to forward deduped events. Server-side
 * webhook functions (stripe-subscription-webhook, revenuecat-webhook)
 * import the sender directly from _shared instead of round-tripping HTTP.
 *
 * ENV VARS:
 *  - META_PIXEL_ID, META_CAPI_ACCESS_TOKEN (required) — see _shared/meta-capi.ts
 *  - META_CAPI_SHARED_SECRET (optional) — if set, inbound requests must pass
 *    it in the `x-capi-secret` header.
 */

import { serve, corsHeaders } from '../_shared/deps.ts';
import { sendCapiEvents, type CapiEvent } from '../_shared/meta-capi.ts';

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const sharedSecret = Deno.env.get('META_CAPI_SHARED_SECRET');
    if (sharedSecret) {
      const provided = req.headers.get('x-capi-secret');
      if (provided !== sharedSecret) {
        return new Response(JSON.stringify({ error: 'Unauthorised' }), {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    const payload = await req.json();
    const events: CapiEvent[] = Array.isArray(payload) ? payload : [payload];

    if (events.length === 0 || !events[0].event_name || !events[0].event_id) {
      return new Response(JSON.stringify({ error: 'event_name and event_id are required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      req.headers.get('cf-connecting-ip') ||
      undefined;
    const ua = req.headers.get('user-agent') || undefined;
    for (const ev of events) {
      if (!ev.client_ip && ip) ev.client_ip = ip;
      if (!ev.client_user_agent && ua) ev.client_user_agent = ua;
    }

    const result = await sendCapiEvents(events);
    return new Response(JSON.stringify(result), {
      status: result.ok ? 200 : 502,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('[meta-capi] Handler error', err);
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : String(err) }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
