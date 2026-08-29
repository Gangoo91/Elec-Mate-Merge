/**
 * google-calendar-webhook — Google Calendar push notifications land here.
 *
 * Registered per user by sync-google-calendar's watch healing. When anything
 * changes in the user's Google Calendar, Google POSTs a notification with the
 * channel id in the headers (no body worth reading) — we look up whose
 * channel it is and run their sync immediately. That is what makes an
 * external change appear in the Elec-Mate diary within seconds, so the
 * booking engine can never double-book over something added in Google.
 *
 * Deployed with --no-verify-jwt (Google sends no bearer). Trust model: the
 * channel id is a UUID we minted and stored — an attacker cannot guess it,
 * and the worst a forged ping could do is trigger a sync that was due anyway.
 */
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { captureException } from '../_shared/sentry.ts';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') as string;
const SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') as string;

serve(async (req: Request) => {
  try {
    const channelId = req.headers.get('X-Goog-Channel-ID');
    const resourceState = req.headers.get('X-Goog-Resource-State');

    if (!channelId) {
      return new Response('missing channel', { status: 400 });
    }

    // Google sends a 'sync' ping when the channel is first created — nothing
    // has changed yet, and the connect flow already ran a full sync.
    if (resourceState === 'sync') {
      return new Response('ok', { status: 200 });
    }

    const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);
    const { data: tokenRow } = await admin
      .from('google_calendar_tokens')
      .select('user_id, sync_enabled')
      .eq('webhook_channel_id', channelId)
      .maybeSingle();

    if (!tokenRow) {
      // Stale channel from a disconnected account — 404 tells Google to stop.
      return new Response('unknown channel', { status: 404 });
    }
    if (!tokenRow.sync_enabled) {
      return new Response('sync disabled', { status: 200 });
    }

    // Run the user's sync via the sync fn's internal path. Fire it and let
    // the runtime keep it alive — Google wants a fast 200, not our sync time.
    const work = fetch(`${SUPABASE_URL}/functions/v1/sync-google-calendar`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id: tokenRow.user_id }),
    }).then(async (r) => console.log(`Webhook sync for ${tokenRow.user_id}:`, r.status, await r.text().catch(() => '')));

    const runtime = (globalThis as { EdgeRuntime?: { waitUntil?: (p: Promise<unknown>) => void } })
      .EdgeRuntime;
    if (runtime?.waitUntil) runtime.waitUntil(work);
    else await work;

    return new Response('ok', { status: 200 });
  } catch (error) {
    console.error('google-calendar-webhook error:', error);
    await captureException(error, {
      functionName: 'google-calendar-webhook',
      requestUrl: req.url,
      requestMethod: req.method,
    });
    // Still 200 — Google retries aggressively on errors and the 15-minute
    // sweep will catch the change regardless.
    return new Response('ok', { status: 200 });
  }
});
