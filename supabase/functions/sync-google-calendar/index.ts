/**
 * Sync Google Calendar
 * Bidirectional sync: pull from Google, push local pending events.
 *
 * Callable three ways:
 *  - User JWT (the app): syncs the caller. Original behaviour.
 *  - Service-role bearer + { user_id }: syncs that user — used by the
 *    google-calendar-webhook fn the moment Google reports a change.
 *  - Service-role bearer + { all: true }: syncs every connected user — the
 *    15-minute safety-net cron. Also (re)registers each user's Google push
 *    channel when missing or expiring, so "instant" heals itself.
 */

import { serve, corsHeaders, createClient } from '../_shared/deps.ts';
import { handleError, ValidationError } from '../_shared/errors.ts';
import { encryptToken, decryptToken } from '../_shared/encryption.ts';
import { captureException } from '../_shared/sentry.ts';

const GOOGLE_CLIENT_ID = Deno.env.get('GOOGLE_CLIENT_ID');
const GOOGLE_CLIENT_SECRET = Deno.env.get('GOOGLE_CLIENT_SECRET');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

// deno-lint-ignore no-explicit-any
type Admin = any;

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new ValidationError('Authorization header required');
    }

    const supabase = createClient(SUPABASE_URL!, SERVICE_ROLE_KEY!);
    const body = await req.json().catch(() => ({}) as Record<string, unknown>);

    // Internal callers (webhook fn, cron) present the service-role key.
    const bearer = authHeader.replace(/^Bearer\s+/i, '').trim();
    const isInternal = bearer === SERVICE_ROLE_KEY;

    if (isInternal && body?.all === true) {
      // Safety-net sweep: every connected user, webhook healing included.
      // Runs in the background — the cron caller disconnects after its
      // timeout, and a fleet of users must never be half-swept because of it.
      const sweep = (async () => {
        const { data: rows } = await supabase
          .from('google_calendar_tokens')
          .select('user_id')
          .eq('sync_enabled', true);
        let ok = 0;
        let failed = 0;
        for (const row of rows || []) {
          try {
            await syncUser(supabase, row.user_id, { healWatch: true });
            ok++;
          } catch (userError) {
            failed++;
            console.error(`Sweep sync failed for ${row.user_id}:`, userError);
          }
        }
        console.log(`✅ Calendar sweep: ${ok} synced, ${failed} failed`);
        return { swept: ok, failed };
      })();

      const runtime = (globalThis as {
        EdgeRuntime?: { waitUntil?: (p: Promise<unknown>) => void };
      }).EdgeRuntime;
      if (runtime?.waitUntil) {
        runtime.waitUntil(sweep);
        return new Response(JSON.stringify({ accepted: true, background: true }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      const result = await sweep;
      return new Response(JSON.stringify(result), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    let userId: string;
    if (isInternal && typeof body?.user_id === 'string') {
      userId = body.user_id;
    } else {
      const userClient = createClient(SUPABASE_URL!, Deno.env.get('SUPABASE_ANON_KEY')!, {
        global: { headers: { Authorization: authHeader } },
      });
      const {
        data: { user },
        error: authError,
      } = await userClient.auth.getUser();
      if (authError || !user) {
        throw new ValidationError('Authentication required');
      }
      userId = user.id;
    }

    const result = await syncUser(supabase, userId, { healWatch: true });
    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    await captureException(error, {
      functionName: 'sync-google-calendar',
      requestUrl: req.url,
      requestMethod: req.method,
    });
    return handleError(error);
  }
});

// ── The sync itself, per user ──────────────────────────────────────────────

async function syncUser(
  supabase: Admin,
  userId: string,
  opts: { healWatch?: boolean } = {}
): Promise<{ pulled: number; pushed: number; syncTokenExpired?: boolean; skipped?: boolean }> {
  const { data: tokenRow, error: tokenError } = await supabase
    .from('google_calendar_tokens')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (tokenError || !tokenRow) {
    throw new ValidationError('Google Calendar not connected');
  }

  // Debounce claim — Google fires notification BURSTS and the webhook, the
  // sweep and the client can all arrive together. Whoever moves last_sync_at
  // forward owns this window; everyone else no-ops. Atomic via the WHERE.
  // (Two plain filters, not .or() — PostgREST's or-parser chokes on ISO
  // timestamps and maybeSingle() turned that error into a permanent skip.)
  const cutoff = new Date(Date.now() - 5_000).toISOString();
  let claimed = false;
  if (tokenRow.last_sync_at === null) {
    const { data, error } = await supabase
      .from('google_calendar_tokens')
      .update({ last_sync_at: new Date().toISOString() })
      .eq('user_id', userId)
      .is('last_sync_at', null)
      .select('user_id')
      .maybeSingle();
    if (error) console.error('Claim (null path) failed:', error.message);
    claimed = !!data;
  } else {
    const { data, error } = await supabase
      .from('google_calendar_tokens')
      .update({ last_sync_at: new Date().toISOString() })
      .eq('user_id', userId)
      .lt('last_sync_at', cutoff)
      .select('user_id')
      .maybeSingle();
    if (error) console.error('Claim failed:', error.message);
    claimed = !!data;
  }
  if (!claimed) {
    return { pulled: 0, pushed: 0, skipped: true };
  }

  // Decrypt and refresh access token if needed
  let accessToken = await decryptToken(tokenRow.encrypted_access_token);
  const tokenExpiry = new Date(tokenRow.token_expires_at);

  if (tokenExpiry < new Date(Date.now() + 60_000)) {
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

    await supabase
      .from('google_calendar_tokens')
      .update({
        encrypted_access_token: await encryptToken(accessToken),
        token_expires_at: new Date(Date.now() + refreshData.expires_in * 1000).toISOString(),
      })
      .eq('user_id', userId);
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

  // Use sync token for incremental sync if available
  if (tokenRow.sync_token) {
    pullUrl.searchParams.set('syncToken', tokenRow.sync_token);
  } else {
    // First sync — only pull last 30 days forward 90 days
    pullUrl.searchParams.set('orderBy', 'updated');
    const timeMin = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    const timeMax = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString();
    pullUrl.searchParams.set('timeMin', timeMin);
    pullUrl.searchParams.set('timeMax', timeMax);
  }

  const pullResponse = await fetch(pullUrl.toString(), {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (pullResponse.status === 410) {
    // Sync token expired — clear and let the next run do a full pull.
    await supabase
      .from('google_calendar_tokens')
      .update({ sync_token: null })
      .eq('user_id', userId);
    return { pulled: 0, pushed: 0, syncTokenExpired: true };
  }

  if (!pullResponse.ok) {
    const errText = await pullResponse.text();
    console.error('Google Calendar pull failed:', errText);

    /*
     * A 403 with insufficient scope is not a transient failure — the stored
     * token will NEVER work, because the user left the calendar permission
     * unticked on Google's granular consent screen. Retrying it every run just
     * fills Sentry with an error nobody can act on, so switch the connection
     * off and say what to do. calendar-oauth-callback now refuses these at
     * connect time; this catches the ones granted before that landed.
     */
    if (pullResponse.status === 403 && errText.includes('ACCESS_TOKEN_SCOPE_INSUFFICIENT')) {
      await supabase
        .from('google_calendar_tokens')
        .update({ sync_enabled: false })
        .eq('user_id', userId);
      throw new Error(
        'Google Calendar access was not granted. Sync has been turned off — reconnect ' +
          'your calendar and leave the Google Calendar permission ticked.'
      );
    }

    throw new Error(
      `Failed to pull events from Google Calendar (HTTP ${pullResponse.status}): ${errText.slice(0, 300)}`
    );
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
        .eq('user_id', userId)
        .eq('google_event_id', gEvent.id);
      pulled++;
      continue;
    }

    const startAt = gEvent.start?.dateTime || gEvent.start?.date;
    const endAt = gEvent.end?.dateTime || gEvent.end?.date;
    if (!startAt || !endAt) continue;

    const allDay = !gEvent.start?.dateTime;
    const eventData = {
      user_id: userId,
      title: gEvent.summary || 'Untitled',
      description: gEvent.description || null,
      // Google all-day events use floating dates with an EXCLUSIVE end.date
      // (last day + 1). Store them on local (Europe/London) day boundaries to
      // match how the app creates events: start = first day 00:00, end = last
      // day 23:59:59. Without the -1, the stored event gains a phantom day.
      start_at: allDay ? londonInstantIso(parseYmd(startAt), 0, 0, 0) : startAt,
      end_at: allDay ? londonInstantIso(addDaysYmd(parseYmd(endAt), -1), 23, 59, 59) : endAt,
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
      .select('id, google_etag, sync_status')
      .eq('user_id', userId)
      .eq('google_event_id', gEvent.id)
      .maybeSingle();

    if (existing) {
      // A tombstone means the user deleted this in the app — never let the
      // pull resurrect it; the delete pass below removes it from Google.
      if (existing.sync_status === 'pending_delete') continue;
      // A local edit waiting to push wins over the pulled copy — clobbering
      // it here would silently discard what the user just typed.
      if (existing.sync_status === 'pending_push') continue;
      if (existing.google_etag !== gEvent.etag) {
        // Narrow update: take Google's title/time/place, but NEVER reset the
        // app's own metadata (event_type, colour, client/job links) on a row
        // that Elec-Mate created — editing a job's time in Google must not
        // turn an EICR into a grey "general" event.
        const { event_type: _et, colour: _c, user_id: _u, ...pulledFields } = eventData;
        await supabase.from('calendar_events').update(pulledFields).eq('id', existing.id);
        pulled++;
      }
    } else {
      const { error: insertError } = await supabase.from('calendar_events').insert(eventData);
      if (insertError) {
        // 23505 = a concurrent sync inserted it first (unique index). Fine.
        if (String(insertError.code) !== '23505') {
          console.error(`Pull insert failed for ${gEvent.id}:`, insertError.message);
        }
      } else {
        pulled++;
      }
    }
  }

  // Save sync token for next incremental pull
  if (nextSyncToken) {
    await supabase
      .from('google_calendar_tokens')
      .update({ sync_token: nextSyncToken })
      .eq('user_id', userId);
  }

  // =====================
  // PUSH: Local → Google
  // =====================
  const { data: pendingEvents } = await supabase
    .from('calendar_events')
    .select('*')
    .eq('user_id', userId)
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

  // =====================
  // DELETE: tombstones → Google, then gone for good
  // =====================
  // Only rows this provider owns — an Outlook-only tombstone must wait for
  // the Outlook engine, or its copy there would come back from the dead.
  const { data: tombstones } = await supabase
    .from('calendar_events')
    .select('id, google_event_id')
    .eq('user_id', userId)
    .eq('sync_status', 'pending_delete')
    .not('google_event_id', 'is', null);

  for (const tomb of tombstones || []) {
    if (tomb.google_event_id) {
      const delResponse = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events/${encodeURIComponent(tomb.google_event_id)}`,
        { method: 'DELETE', headers: { Authorization: `Bearer ${accessToken}` } }
      );
      // 2xx = deleted; 404/410 = already gone. Anything else: keep the
      // tombstone and retry next sync.
      if (!delResponse.ok && delResponse.status !== 404 && delResponse.status !== 410) {
        const errText = await delResponse.text();
        console.error(`Failed to delete Google event ${tomb.google_event_id}:`, errText);
        continue;
      }
    }
    await supabase.from('calendar_events').delete().eq('id', tomb.id);
    pushed++;
  }

  // ── Push-channel healing — the thing that makes "instant" stay instant ──
  // Google watch channels expire (about a week). Register one when missing
  // and re-register when inside 48h of expiry; every sync path heals it.
  if (opts.healWatch) {
    try {
      const expiry = tokenRow.webhook_expiry ? new Date(tokenRow.webhook_expiry) : null;
      const needsWatch = !tokenRow.webhook_channel_id || !expiry || expiry.getTime() - Date.now() < 48 * 3_600_000;
      if (needsWatch) {
        await registerWatch(supabase, userId, calendarId, accessToken);
      }
    } catch (watchError) {
      // Never fail a sync because the watch re-registration hiccuped —
      // the 15-minute sweep retries it.
      console.warn('Watch registration failed (non-fatal):', watchError);
    }
  }

  console.log(`✅ Calendar sync complete for ${userId}: ${pulled} pulled, ${pushed} pushed`);
  return { pulled, pushed };
}

/** Register (or replace) the Google push channel for a user's calendar. */
async function registerWatch(
  supabase: Admin,
  userId: string,
  calendarId: string,
  accessToken: string
): Promise<void> {
  const channelId = crypto.randomUUID();
  const response = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events/watch`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: channelId,
        type: 'web_hook',
        // Google needs a public HTTPS endpoint; this one is never shown to a
        // human, so the supabase domain is fine here.
        address: `${SUPABASE_URL}/functions/v1/google-calendar-webhook`,
      }),
    }
  );

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`events.watch failed: ${errText}`);
  }

  const data = await response.json();
  const expiration = data.expiration
    ? new Date(Number(data.expiration)).toISOString()
    : new Date(Date.now() + 6 * 86_400_000).toISOString();

  await supabase
    .from('google_calendar_tokens')
    .update({ webhook_channel_id: channelId, webhook_expiry: expiration })
    .eq('user_id', userId);

  console.log(`🔔 Watch registered for ${userId} (channel ${channelId}, expires ${expiration})`);
}

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
