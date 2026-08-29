/**
 * Sync Outlook Calendar (Microsoft Graph)
 * Bidirectional sync mirroring sync-google-calendar: pull via calendarView
 * delta (incremental after the first run), push local pending events.
 *
 * Graph particulars vs Google:
 * - Delta token is a full URL (@odata.deltaLink) — stored in sync_token.
 * - `Prefer: odata.maxpagesize` pages the delta; we follow nextLink inline.
 * - Timed events come back in UTC when Prefer: outlook.timezone="UTC" is set;
 *   Graph dateTime carries no offset so we append 'Z'.
 * - All-day events use midnight boundaries with an EXCLUSIVE end (+1 day) —
 *   the same convention as Google's end.date, handled with the same helpers.
 * - Deletions arrive as entries with an `@removed` marker.
 */

import { serve, corsHeaders, createClient } from '../_shared/deps.ts';
import { handleError, ValidationError } from '../_shared/errors.ts';
import { encryptToken, decryptToken } from '../_shared/encryption.ts';
import { captureException } from '../_shared/sentry.ts';

const MICROSOFT_CLIENT_ID = Deno.env.get('MICROSOFT_CLIENT_ID');
const MICROSOFT_CLIENT_SECRET = Deno.env.get('MICROSOFT_CLIENT_SECRET');

const GRAPH = 'https://graph.microsoft.com/v1.0';

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new ValidationError('Authorization header required');
    }

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

    const { data: tokenRow, error: tokenError } = await supabase
      .from('outlook_calendar_tokens')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (tokenError || !tokenRow) {
      throw new ValidationError('Outlook Calendar not connected');
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

      const refreshResponse = await fetch(
        'https://login.microsoftonline.com/common/oauth2/v2.0/token',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            client_id: MICROSOFT_CLIENT_ID!,
            client_secret: MICROSOFT_CLIENT_SECRET!,
            refresh_token: refreshToken,
            grant_type: 'refresh_token',
            scope: 'Calendars.ReadWrite User.Read offline_access',
          }),
        }
      );

      if (!refreshResponse.ok) {
        const errText = await refreshResponse.text();
        console.error('Token refresh failed:', errText);
        throw new Error('Failed to refresh Microsoft token — please reconnect');
      }

      const refreshData = await refreshResponse.json();
      accessToken = refreshData.access_token;

      await supabase
        .from('outlook_calendar_tokens')
        .update({
          encrypted_access_token: await encryptToken(accessToken),
          // Microsoft rotates refresh tokens — keep the newest one.
          ...(refreshData.refresh_token
            ? { encrypted_refresh_token: await encryptToken(refreshData.refresh_token) }
            : {}),
          token_expires_at: new Date(Date.now() + refreshData.expires_in * 1000).toISOString(),
        })
        .eq('user_id', user.id);
    }

    const graphHeaders = {
      Authorization: `Bearer ${accessToken}`,
      // UTC datetimes so 'Z' can be appended safely.
      Prefer: 'outlook.timezone="UTC", odata.maxpagesize=100',
    };

    let pulled = 0;
    let pushed = 0;

    // =====================
    // PULL: Outlook → Local (calendarView delta)
    // =====================
    let pullUrl: string;
    if (tokenRow.sync_token) {
      pullUrl = tokenRow.sync_token; // stored deltaLink — full URL
    } else {
      const timeMin = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
      const timeMax = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString();
      pullUrl = `${GRAPH}/me/calendarView/delta?startDateTime=${encodeURIComponent(timeMin)}&endDateTime=${encodeURIComponent(timeMax)}`;
    }

    let deltaLink: string | null = null;
    let pages = 0;
    while (pullUrl && pages < 10) {
      pages++;
      const pullResponse = await fetch(pullUrl, { headers: graphHeaders });

      if (pullResponse.status === 410) {
        // Delta token expired — clear and let the client retry a full sync.
        await supabase
          .from('outlook_calendar_tokens')
          .update({ sync_token: null })
          .eq('user_id', user.id);
        return new Response(JSON.stringify({ pulled: 0, pushed: 0, syncTokenExpired: true }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      if (!pullResponse.ok) {
        const errText = await pullResponse.text();
        console.error('Outlook Calendar pull failed:', errText);
        throw new Error('Failed to pull events from Outlook Calendar');
      }

      const pullData = await pullResponse.json();

      for (const oEvent of pullData.value || []) {
        if (oEvent['@removed']) {
          await supabase
            .from('calendar_events')
            .delete()
            .eq('user_id', user.id)
            .eq('outlook_event_id', oEvent.id);
          pulled++;
          continue;
        }

        const startRaw = oEvent.start?.dateTime;
        const endRaw = oEvent.end?.dateTime;
        if (!startRaw || !endRaw) continue;

        const allDay = oEvent.isAllDay === true;
        // Graph (with Prefer UTC) sends naive UTC datetimes — make them ISO.
        const startIso = startRaw.endsWith('Z') ? startRaw : `${startRaw}Z`;
        const endIso = endRaw.endsWith('Z') ? endRaw : `${endRaw}Z`;

        const eventData = {
          user_id: user.id,
          title: oEvent.subject || 'Untitled',
          description: oEvent.bodyPreview || null,
          // Outlook all-day events are midnight-to-midnight with an EXCLUSIVE
          // end (+1 day). Store on local day boundaries like the app does.
          start_at: allDay
            ? londonInstantIso(parseYmd(startIso.slice(0, 10)), 0, 0, 0)
            : startIso,
          end_at: allDay
            ? londonInstantIso(addDaysYmd(parseYmd(endIso.slice(0, 10)), -1), 23, 59, 59)
            : endIso,
          all_day: allDay,
          location: oEvent.location?.displayName || null,
          event_type: 'general',
          colour: '#2563EB',
          outlook_event_id: oEvent.id,
          outlook_change_key: oEvent.changeKey || null,
          sync_status: 'synced',
          last_synced_at: new Date().toISOString(),
        };

        const { data: existing } = await supabase
          .from('calendar_events')
          .select('id, outlook_change_key, sync_status')
          .eq('user_id', user.id)
          .eq('outlook_event_id', oEvent.id)
          .maybeSingle();

        if (existing) {
          // Tombstone = deleted in the app; never resurrect from the pull.
          if (existing.sync_status === 'pending_delete') continue;
          if (existing.outlook_change_key !== oEvent.changeKey) {
            await supabase.from('calendar_events').update(eventData).eq('id', existing.id);
            pulled++;
          }
        } else {
          await supabase.from('calendar_events').insert(eventData);
          pulled++;
        }
      }

      if (pullData['@odata.deltaLink']) {
        deltaLink = pullData['@odata.deltaLink'];
        break;
      }
      pullUrl = pullData['@odata.nextLink'] || '';
    }

    if (deltaLink) {
      await supabase
        .from('outlook_calendar_tokens')
        .update({ sync_token: deltaLink })
        .eq('user_id', user.id);
    }

    // =====================
    // PUSH: Local → Outlook
    // =====================
    const { data: pendingEvents } = await supabase
      .from('calendar_events')
      .select('*')
      .eq('user_id', user.id)
      .eq('sync_status', 'pending_push');

    for (const localEvent of pendingEvents || []) {
      const graphBody: Record<string, unknown> = {
        subject: localEvent.title,
        body: localEvent.description
          ? { contentType: 'text', content: localEvent.description }
          : undefined,
        location: localEvent.location ? { displayName: localEvent.location } : undefined,
        isAllDay: !!localEvent.all_day,
      };

      if (localEvent.all_day) {
        // Graph all-day: midnight boundaries, EXCLUSIVE end (+1 day), local
        // (Europe/London) calendar dates — same convention as Google.
        const startDate = ymdToDateStr(londonYmd(localEvent.start_at));
        const endDate = ymdToDateStr(addDaysYmd(londonYmd(localEvent.end_at), 1));
        graphBody.start = { dateTime: `${startDate}T00:00:00`, timeZone: 'Europe/London' };
        graphBody.end = { dateTime: `${endDate}T00:00:00`, timeZone: 'Europe/London' };
      } else {
        graphBody.start = {
          dateTime: new Date(localEvent.start_at).toISOString().replace('Z', ''),
          timeZone: 'UTC',
        };
        graphBody.end = {
          dateTime: new Date(localEvent.end_at).toISOString().replace('Z', ''),
          timeZone: 'UTC',
        };
      }

      const isUpdate = !!localEvent.outlook_event_id;
      const pushUrl = isUpdate
        ? `${GRAPH}/me/events/${encodeURIComponent(localEvent.outlook_event_id)}`
        : `${GRAPH}/me/events`;

      const pushResponse = await fetch(pushUrl, {
        method: isUpdate ? 'PATCH' : 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(graphBody),
      });

      if (pushResponse.ok) {
        const pushData = await pushResponse.json();
        await supabase
          .from('calendar_events')
          .update({
            outlook_event_id: pushData.id,
            outlook_change_key: pushData.changeKey || null,
            sync_status: 'synced',
            last_synced_at: new Date().toISOString(),
          })
          .eq('id', localEvent.id);
        pushed++;
      } else {
        const errText = await pushResponse.text();
        console.error(`Failed to push event ${localEvent.id} to Outlook:`, errText);
      }
    }

    // Tombstones: delete at Outlook, then drop the row for good.
    const { data: tombstones } = await supabase
      .from('calendar_events')
      .select('id, outlook_event_id')
      .eq('user_id', user.id)
      .eq('sync_status', 'pending_delete')
      .not('outlook_event_id', 'is', null);
    for (const tomb of tombstones || []) {
      const delResponse = await fetch(
        `${GRAPH}/me/events/${encodeURIComponent(tomb.outlook_event_id)}`,
        { method: 'DELETE', headers: { Authorization: `Bearer ${accessToken}` } }
      );
      if (!delResponse.ok && delResponse.status !== 404 && delResponse.status !== 410) {
        console.error(`Failed to delete Outlook event ${tomb.outlook_event_id}`);
        continue;
      }
      await supabase.from('calendar_events').delete().eq('id', tomb.id);
      pushed++;
    }

    await supabase
      .from('outlook_calendar_tokens')
      .update({ last_sync_at: new Date().toISOString() })
      .eq('user_id', user.id);

    console.log(`✅ Outlook calendar sync complete: ${pulled} pulled, ${pushed} pushed`);

    return new Response(JSON.stringify({ pulled, pushed }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    await captureException(error, {
      functionName: 'sync-outlook-calendar',
      requestUrl: req.url,
      requestMethod: req.method,
    });
    return handleError(error);
  }
});

// ── All-day date helpers (identical to sync-google-calendar) ──────────────
type Ymd = { y: number; m: number; d: number };

const pad2 = (n: number) => String(n).padStart(2, '0');

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

function parseYmd(dateStr: string): Ymd {
  const [y, m, d] = dateStr.split('-').map(Number);
  return { y, m, d };
}

function addDaysYmd({ y, m, d }: Ymd, days: number): Ymd {
  const dt = new Date(Date.UTC(y, m - 1, d));
  dt.setUTCDate(dt.getUTCDate() + days);
  return { y: dt.getUTCFullYear(), m: dt.getUTCMonth() + 1, d: dt.getUTCDate() };
}

const ymdToDateStr = ({ y, m, d }: Ymd) => `${y}-${pad2(m)}-${pad2(d)}`;

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

function londonInstantIso(ymd: Ymd, hh: number, mm: number, ss: number): string {
  const naive = Date.UTC(ymd.y, ymd.m - 1, ymd.d, hh, mm, ss);
  const offset = londonOffsetMs(new Date(naive));
  return new Date(naive - offset).toISOString();
}
