/**
 * track-push-event
 *
 * Records push engagement (taps). Called from the web service worker and the
 * native push tap handler, so it runs WITHOUT the app's auth context — deploy
 * with --no-verify-jwt. Identifiers travel in the push `data` payload.
 *
 *   { announcementId, recipientUserId?, event: 'tapped' }
 *
 * For announcements it bumps a per-campaign tap counter (tap-through rate) and,
 * if a user id is supplied, stamps that recipient's row. Always returns 200 so
 * a tracking failure never disrupts the tap/navigation.
 */

import { serve } from 'https://deno.land/std@0.190.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') ?? 'https://jtwygbeceundfgnkirof.supabase.co';
const SERVICE_ROLE = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const ok = (body: unknown = { ok: true }) =>
  new Response(JSON.stringify(body), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const { announcementId, recipientUserId, event } = await req.json().catch(() => ({}));
    if (event !== 'tapped' || !announcementId) return ok({ ok: true, skipped: true });

    const supabase = createClient(SUPABASE_URL, SERVICE_ROLE, {
      auth: { persistSession: false },
    });

    // Campaign-level tap-through counter (works even without a user id).
    await supabase.rpc('increment_announcement_tap', { aid: announcementId });

    // Per-recipient stamp when we know who tapped (native has the session).
    if (recipientUserId) {
      await supabase
        .from('announcement_push_recipients')
        .update({ tapped_at: new Date().toISOString() })
        .eq('announcement_id', announcementId)
        .eq('user_id', recipientUserId)
        .is('tapped_at', null);
    }

    return ok();
  } catch {
    return ok({ ok: false });
  }
});
