/**
 * Calendar iCal Feed
 * Serves an .ics (iCalendar) feed for a user's events.
 * Works with ANY calendar app: Google Calendar, Apple Calendar, Outlook, Samsung, etc.
 *
 * Usage: GET /functions/v1/calendar-ical-feed?token={ical_feed_token}
 * No auth header needed — the token IS the auth (shareable subscription URL).
 */

import { createClient } from '../_shared/deps.ts';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

Deno.serve(async (req: Request) => {
  const url = new URL(req.url);
  const token = url.searchParams.get('token');

  if (!token) {
    return new Response('Missing token parameter', { status: 400 });
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  // Look up user by ical_feed_token
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('id')
    .eq('ical_feed_token', token)
    .single();

  if (profileError || !profile) {
    return new Response('Invalid feed token', { status: 404 });
  }

  const userId = profile.id;

  // Fetch events (past 30 days to future 365 days)
  const timeMin = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
  const timeMax = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString();

  const { data: events, error: eventsError } = await supabase
    .from('calendar_events')
    .select(
      'id, title, description, start_at, end_at, all_day, location, event_type, notes, created_at, updated_at'
    )
    .eq('user_id', userId)
    .gte('start_at', timeMin)
    .lte('start_at', timeMax)
    .order('start_at', { ascending: true });

  if (eventsError) {
    console.error('Failed to fetch events for iCal feed:', eventsError);
    return new Response('Failed to generate feed', { status: 500 });
  }

  // Build iCalendar output
  const icsLines: string[] = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Elec-Mate//Calendar//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:Elec-Mate Calendar',
    'X-WR-TIMEZONE:Europe/London',
  ];

  for (const event of events ?? []) {
    const uid = `${event.id}@elec-mate.com`;
    const created = formatIcsDate(event.created_at);
    const modified = formatIcsDate(event.updated_at);

    icsLines.push('BEGIN:VEVENT');
    icsLines.push(`UID:${uid}`);
    icsLines.push(`DTSTAMP:${modified}`);
    icsLines.push(`CREATED:${created}`);
    icsLines.push(`LAST-MODIFIED:${modified}`);
    icsLines.push(`SUMMARY:${escapeIcsText(event.title)}`);

    if (event.all_day) {
      icsLines.push(`DTSTART;VALUE=DATE:${formatIcsDateOnly(event.start_at)}`);
      icsLines.push(`DTEND;VALUE=DATE:${formatIcsDateOnly(event.end_at)}`);
    } else {
      icsLines.push(`DTSTART:${formatIcsDate(event.start_at)}`);
      icsLines.push(`DTEND:${formatIcsDate(event.end_at)}`);
    }

    if (event.location) {
      icsLines.push(`LOCATION:${escapeIcsText(event.location)}`);
    }

    if (event.description) {
      icsLines.push(`DESCRIPTION:${escapeIcsText(event.description)}`);
    }

    // Category from event_type
    const categoryMap: Record<string, string> = {
      job: 'Job',
      site_visit: 'Site Visit',
      inspection: 'Inspection',
      meeting: 'Meeting',
      personal: 'Personal',
      general: 'General',
    };
    icsLines.push(`CATEGORIES:${categoryMap[event.event_type] || 'General'}`);

    icsLines.push('END:VEVENT');
  }

  icsLines.push('END:VCALENDAR');

  const icsContent = icsLines.join('\r\n');

  return new Response(icsContent, {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': 'inline; filename="elec-mate-calendar.ics"',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  });
});

// Format ISO date to iCalendar UTC format: 20260301T120000Z
function formatIcsDate(isoDate: string): string {
  const d = new Date(isoDate);
  return d
    .toISOString()
    .replace(/[-:]/g, '')
    .replace(/\.\d{3}/, '');
}

// Format ISO date to iCalendar date-only: 20260301
function formatIcsDateOnly(isoDate: string): string {
  return isoDate.split('T')[0].replace(/-/g, '');
}

// Escape special characters in iCalendar text
function escapeIcsText(text: string): string {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n');
}
