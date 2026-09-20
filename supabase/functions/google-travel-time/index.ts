/**
 * Drive time between two addresses, for the diary (ELE-1755 calendar).
 *
 * Server-side on purpose. The browser could call the Maps JS Distance Matrix
 * itself, but that means downloading the Maps script on a phone to draw a
 * chip, exposing a browser key, and depending on that key's referrer rules.
 * This uses the same server key the address autocomplete uses, and the
 * client caches each origin→destination pair for a day.
 *
 * Signed-in users only (verify_jwt is on). One pair per call; the calendar
 * asks for the two or three legs a day actually has.
 */
import { serve } from 'https://deno.land/std@0.190.0/http/server.ts';
import { corsHeaders } from '../_shared/cors.ts';
import { captureException } from '../_shared/sentry.ts';

const json = (payload: unknown, status = 200) =>
  new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });

interface Body {
  origin?: string;
  destination?: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  try {
    const body = (await req.json().catch(() => ({}))) as Body;
    const origin = (body.origin ?? '').trim();
    const destination = (body.destination ?? '').trim();
    if (origin.length < 3 || destination.length < 3) {
      return json({ error: 'origin and destination are required' }, 400);
    }
    if (origin.length > 200 || destination.length > 200) {
      return json({ error: 'address too long' }, 400);
    }

    const key = Deno.env.get('GoogleAPI');
    if (!key) return json({ error: 'Google API key not configured' }, 500);

    const url =
      'https://maps.googleapis.com/maps/api/distancematrix/json' +
      `?origins=${encodeURIComponent(origin)}` +
      `&destinations=${encodeURIComponent(destination)}` +
      '&mode=driving&region=gb&units=imperial&departure_time=now' +
      `&key=${key}`;
    const res = await fetch(url);
    const data = (await res.json()) as {
      status: string;
      error_message?: string;
      rows?: Array<{
        elements?: Array<{
          status: string;
          duration?: { value: number; text: string };
          duration_in_traffic?: { value: number; text: string };
          distance?: { value: number; text: string };
        }>;
      }>;
    };

    if (data.status !== 'OK') {
      // REQUEST_DENIED here means the Distance Matrix API is not enabled on
      // the key — say so plainly, it is a console setting not a code bug.
      return json({ error: data.error_message || data.status, status: data.status }, 502);
    }
    const el = data.rows?.[0]?.elements?.[0];
    if (!el || el.status !== 'OK') {
      return json({ error: el?.status || 'NO_RESULT', status: el?.status || 'NO_RESULT' }, 404);
    }
    const d = el.duration_in_traffic ?? el.duration;
    return json({
      minutes: Math.max(1, Math.round((d?.value ?? 0) / 60)),
      text: d?.text ?? '',
      distanceText: el.distance?.text ?? null,
      status: 'OK',
    });
  } catch (e) {
    await captureException(e, { functionName: 'google-travel-time' });
    return json({ error: e instanceof Error ? e.message : 'Unknown error' }, 500);
  }
});
