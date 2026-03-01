/**
 * Sync Google Calendar
 * Bidirectional sync: pull from Google, push local pending events
 */

import { serve, corsHeaders, createClient } from '../_shared/deps.ts';
import { handleError, ValidationError } from '../_shared/errors.ts';
import { encryptToken, decryptToken } from '../_shared/encryption.ts';

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
        start_at: allDay ? new Date(startAt + 'T00:00:00Z').toISOString() : startAt,
        end_at: allDay ? new Date(endAt + 'T23:59:59Z').toISOString() : endAt,
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
        const startDate = localEvent.start_at.split('T')[0];
        const endDate = localEvent.end_at.split('T')[0];
        googleBody.start = { date: startDate };
        googleBody.end = { date: endDate };
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
    return handleError(error);
  }
});
