/**
 * Sync Google Calendar
 * Bidirectional sync: pull from Google, push local pending events
 */

import { serve, corsHeaders, createClient } from '../_shared/deps.ts';
import { handleError, ValidationError } from '../_shared/errors.ts';
import { encryptToken, decryptToken } from '../_shared/encryption.ts';
import { captureException } from '../_shared/sentry.ts';

const GOOGLE_CLIENT_ID = Deno.env.get('GOOGLE_CLIENT_ID');
const GOOGLE_CLIENT_SECRET = Deno.env.get('GOOGLE_CLIENT_SECRET');

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new ValidationError('Authorization header required');
    }

    // Get user
    const userClient = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const {
      data: { user },
      error: authError,
    } = await userClient.auth.getUser();
    if (authError || !user) {
      throw new ValidationError('Authentication required');
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // Get tokens
    const { data: tokenRow, error: tokenError } = await supabase
      .from('google_calendar_tokens')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (tokenError || !tokenRow) {
      throw new ValidationError('Google Calendar not connected');
    }

    // Decrypt and refresh access token if needed
    let accessToken = await decryptToken(tokenRow.encrypted_access_token);
    const tokenExpiry = new Date(tokenRow.token_expires_at);

    if (tokenExpiry < new Date(Date.now() + 60_000)) {
      // Token expired or expiring soon — refresh
      const refreshToken = tokenRow.encrypted_refresh_token
        ? await decryptToken(tokenRow.encrypted_refresh_token)
        : null;

      if (!refreshToken) {
        throw new ValidationError('No refresh token available — please reconnect');
      }

      const refreshResponse = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          client_id: GOOGLE_CLIENT_ID!,
          client_secret: GOOGLE_CLIENT_SECRET!,
          refresh_token: refreshToken,
          grant_type: 'refresh_token',
        }),
      });

      if (!refreshResponse.ok) {
        const errText = await refreshResponse.text();
        console.error('Token refresh failed:', errText);
        throw new Error('Failed to refresh Google token — please reconnect');
      }

      const refreshData = await refreshResponse.json();
      accessToken = refreshData.access_token;

      // Update stored token
      await supabase
        .from('google_calendar_tokens')
        .update({
          encrypted_access_token: await encryptToken(accessToken),
          token_expires_at: new Date(Date.now() + refreshData.expires_in * 1000).toISOString(),
        })
        .eq('user_id', user.id);
    }

    const calendarId = tokenRow.calendar_id || 'primary';
    let pulled = 0;
    let pushed = 0;

    // =====================
    // PULL: Google → Local
    // =====================
    const pullUrl = new URL(
      `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events`
    );
    pullUrl.searchParams.set('maxResults', '250');
    pullUrl.searchParams.set('singleEvents', 'true');
    pullUrl.searchParams.set('orderBy', 'updated');

    // Use sync token for incremental sync if available
    if (tokenRow.sync_token) {
      pullUrl.searchParams.set('syncToken', tokenRow.sync_token);
    } else {
      // First sync — only pull last 30 days forward 90 days
      const timeMin = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
      const timeMax = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString();
      pullUrl.searchParams.set('timeMin', timeMin);
      pullUrl.searchParams.set('timeMax', timeMax);
    }

    const pullResponse = await fetch(pullUrl.toString(), {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (pullResponse.status === 410) {
      // Sync token expired — clear and retry without it
      await supabase
        .from('google_calendar_tokens')
        .update({ sync_token: null })
        .eq('user_id', user.id);
      // Return to let client retry
      return new Response(JSON.stringify({ pulled: 0, pushed: 0, syncTokenExpired: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (!pullResponse.ok) {
      const errText = await pullResponse.text();
      console.error('Google Calendar pull failed:', errText);
      throw new Error('Failed to pull events from Google Calendar');
    }

    const pullData = await pullResponse.json();
    const googleEvents = pullData.items || [];
    const nextSyncToken = pullData.nextSyncToken;

    // Process pulled events
    for (const gEvent of googleEvents) {
      if (gEvent.status === 'cancelled') {
        // Delete locally if exists
        await supabase
          .from('calendar_events')
          .delete()
          .eq('user_id', user.id)
          .eq('google_event_id', gEvent.id);
        pulled++;
        continue;
      }

      const startAt = gEvent.start?.dateTime || gEvent.start?.date;
      const endAt = gEvent.end?.dateTime || gEvent.end?.date;
      if (!startAt || !endAt) continue;

      const allDay = !gEvent.start?.dateTime;
      const eventData = {
        user_id: user.id,
        title: gEvent.summary || 'Untitled',
        description: gEvent.description || null,
        // Google all-day events use floating dates with an EXCLUSIVE end.date
        // (last day + 1). Store them on local (Europe/London) day boundaries to
        // match how the app creates events: start = first day 00:00, end = last
        // day 23:59:59. Without the -1, the stored event gains a phantom day.
        start_at: allDay ? londonInstantIso(parseYmd(startAt), 0, 0, 0) : startAt,
        end_at: allDay
          ? londonInstantIso(addDaysYmd(parseYmd(endAt), -1), 23, 59, 59)
          : endAt,
        all_day: allDay,
        location: gEvent.location || null,
        event_type: 'general',
        colour: '#3B82F6',
        google_event_id: gEvent.id,
        google_calendar_id: calendarId,
        google_etag: gEvent.etag,
        sync_status: 'synced',
        last_synced_at: new Date().toISOString(),
      };

      // Upsert — check if already exists by google_event_id
      const { data: existing } = await supabase
        .from('calendar_events')
        .select('id, google_etag')
        .eq('user_id', user.id)
        .eq('google_event_id', gEvent.id)
        .maybeSingle();

      if (existing) {
        // Update if etag changed
        if (existing.google_etag !== gEvent.etag) {
          await supabase.from('calendar_events').update(eventData).eq('id', existing.id);
          pulled++;
        }
      } else {
        await supabase.from('calendar_events').insert(eventData);
        pulled++;
      }
    }

    // Save sync token for next incremental pull
    if (nextSyncToken) {
      await supabase
        .from('google_calendar_tokens')
        .update({ sync_token: nextSyncToken })
        .eq('user_id', user.id);
    }

    // =====================
    // PUSH: Local → Google
    // =====================
    const { data: pendingEvents } = await supabase
      .from('calendar_events')
      .select('*')
      .eq('user_id', user.id)
      .eq('sync_status', 'pending_push');

    for (const localEvent of pendingEvents || []) {
      const googleBody: Record<string, unknown> = {
        summary: localEvent.title,
        description: localEvent.description || undefined,
        location: localEvent.location || undefined,
      };

      if (localEvent.all_day) {
        // Google all-day end.date is EXCLUSIVE — it must be the day AFTER the
        // final day, using the local (Europe/London) calendar date. Reading the
        // raw UTC date (split on 'T') drops the last day and shifts under BST.
        googleBody.start = { date: ymdToDateStr(londonYmd(localEvent.start_at)) };
        googleBody.end = { date: ymdToDateStr(addDaysYmd(londonYmd(localEvent.end_at), 1)) };
      } else {
        googleBody.start = { dateTime: localEvent.start_at };
        googleBody.end = { dateTime: localEvent.end_at };
      }

      let pushUrl: string;
      let method: string;

      if (localEvent.google_event_id) {
        // Update existing
        pushUrl = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events/${encodeURIComponent(localEvent.google_event_id)}`;
        method = 'PUT';
      } else {
        // Create new
        pushUrl = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events`;
        method = 'POST';
      }

      const pushResponse = await fetch(pushUrl, {
        method,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(googleBody),
      });

      if (pushResponse.ok) {
        const pushData = await pushResponse.json();
        await supabase
          .from('calendar_events')
          .update({
            google_event_id: pushData.id,
            google_calendar_id: calendarId,
            google_etag: pushData.etag,
            sync_status: 'synced',
            last_synced_at: new Date().toISOString(),
          })
          .eq('id', localEvent.id);
        pushed++;
      } else {
        const errText = await pushResponse.text();
        console.error(`Failed to push event ${localEvent.id}:`, errText);
      }
    }

    // Update last_sync_at
    await supabase
      .from('google_calendar_tokens')
      .update({ last_sync_at: new Date().toISOString() })
      .eq('user_id', user.id);

    console.log(`✅ Calendar sync complete: ${pulled} pulled, ${pushed} pushed`);

    return new Response(JSON.stringify({ pulled, pushed }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    await captureException(error, { functionName: 'sync-google-calendar', requestUrl: req.url, requestMethod: req.method });
    return handleError(error);
  }
});

// ── All-day date helpers ──────────────────────────────────────────────────
// All-day events are stored on local (Europe/London) day boundaries:
// start = first day 00:00 local, end = last day 23:59:59 local. Google all-day
// events use floating dates with an EXCLUSIVE end.date (last day + 1).
type Ymd = { y: number; m: number; d: number };

const pad2 = (n: number) => String(n).padStart(2, '0');

// Local (Europe/London) calendar date for an ISO instant.
function londonYmd(iso: string): Ymd {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/London',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date(iso));
  const get = (t: string) => Number(parts.find((p) => p.type === t)!.value);
  return { y: get('year'), m: get('month'), d: get('day') };
}

// Parse a floating 'YYYY-MM-DD' (Google all-day date) into Y-M-D.
function parseYmd(dateStr: string): Ymd {
  const [y, m, d] = dateStr.split('-').map(Number);
  return { y, m, d };
}

// Add whole days to a Y-M-D (handles month/year rollover via UTC math).
function addDaysYmd({ y, m, d }: Ymd, days: number): Ymd {
  const dt = new Date(Date.UTC(y, m - 1, d));
  dt.setUTCDate(dt.getUTCDate() + days);
  return { y: dt.getUTCFullYear(), m: dt.getUTCMonth() + 1, d: dt.getUTCDate() };
}

const ymdToDateStr = ({ y, m, d }: Ymd) => `${y}-${pad2(m)}-${pad2(d)}`;

// Europe/London UTC offset (ms) at a given instant.
function londonOffsetMs(instant: Date): number {
  const name =
    new Intl.DateTimeFormat('en-US', {
      timeZone: 'Europe/London',
      timeZoneName: 'shortOffset',
    })
      .formatToParts(instant)
      .find((p) => p.type === 'timeZoneName')?.value ?? 'GMT';
  const m = name.match(/GMT([+-]\d{1,2})(?::(\d{2}))?/);
  if (!m) return 0;
  const hours = parseInt(m[1], 10);
  const mins = m[2] ? parseInt(m[2], 10) : 0;
  return (hours * 60 + Math.sign(hours) * mins) * 60_000;
}

// ISO instant for a London-local wall-clock time on a given Y-M-D.
function londonInstantIso(ymd: Ymd, hh: number, mm: number, ss: number): string {
  const naive = Date.UTC(ymd.y, ymd.m - 1, ymd.d, hh, mm, ss);
  const offset = londonOffsetMs(new Date(naive));
  return new Date(naive - offset).toISOString();
}
