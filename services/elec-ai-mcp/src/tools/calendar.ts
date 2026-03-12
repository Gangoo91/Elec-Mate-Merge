/**
 * Calendar tools — read_calendar, create_calendar_event, get_availability
 * Maps to: Supabase `calendar_events` table (RLS-scoped, direct DB access)
 *
 * Columns: id, user_id, title, description, start_at, end_at, all_day,
 *          location, client_id, job_id, event_type, colour, recurring,
 *          recurrence_rule, parent_event_id, google_event_id,
 *          sync_status, notes, reminder_minutes, created_at, updated_at
 *
 * event_type: 'job' | 'site_visit' | 'inspection' | 'meeting' | 'personal' | 'general'
 */

import type { UserContext } from '../auth.js';

const COLOUR_MAP: Record<string, string> = {
  job: '#F59E0B',
  site_visit: '#10B981',
  inspection: '#8B5CF6',
  meeting: '#3B82F6',
  personal: '#EC4899',
  general: '#6B7280',
};

const VALID_EVENT_TYPES = ['job', 'site_visit', 'inspection', 'meeting', 'personal', 'general'];

export async function readCalendar(args: Record<string, unknown>, user: UserContext) {
  const supabase = user.supabase;
  let query = supabase
    .from('calendar_events')
    .select(
      'id, title, description, start_at, end_at, all_day, location, client_id, job_id, event_type, colour, notes, created_at, customers(name)'
    );

  if (typeof args.date_from === 'string') {
    query = query.gte('start_at', args.date_from);
  }
  if (typeof args.date_to === 'string') {
    query = query.lte('start_at', args.date_to);
  }

  const limit = typeof args.limit === 'number' && args.limit > 0 ? Math.min(args.limit, 50) : 20;
  query = query.order('start_at', { ascending: true }).limit(limit);

  const { data, error } = await query;
  if (error) throw new Error(`Failed to read calendar: ${error.message}`);

  const events = (data || []).map((e: Record<string, unknown>) => {
    const customer = e.customers as { name: string } | null;
    const { customers: _c, ...rest } = e;
    return {
      ...rest,
      client_name: customer?.name || null,
    };
  });

  return { events };
}

export async function createCalendarEvent(args: Record<string, unknown>, user: UserContext) {
  if (typeof args.title !== 'string' || args.title.trim().length === 0) {
    throw new Error('Event title is required');
  }
  if (typeof args.date !== 'string') {
    throw new Error('Event date is required (ISO-8601 date, e.g. 2026-03-03)');
  }
  if (typeof args.time !== 'string') {
    throw new Error('Event time is required (HH:mm, e.g. 14:00)');
  }
  if (typeof args.duration_minutes !== 'number' || args.duration_minutes <= 0) {
    throw new Error('duration_minutes must be a positive number');
  }

  // Build start_at and end_at from date + time + duration
  const startAt = new Date(`${args.date}T${args.time}:00`);
  if (isNaN(startAt.getTime())) {
    throw new Error(`Invalid date/time: ${args.date} ${args.time}`);
  }
  const endAt = new Date(startAt.getTime() + args.duration_minutes * 60 * 1000);

  const eventType =
    typeof args.event_type === 'string' && VALID_EVENT_TYPES.includes(args.event_type)
      ? args.event_type
      : 'general';

  const supabase = user.supabase;

  const { data, error } = await supabase
    .from('calendar_events')
    .insert({
      user_id: user.userId,
      title: args.title.trim(),
      description: typeof args.notes === 'string' ? args.notes.trim() : null,
      start_at: startAt.toISOString(),
      end_at: endAt.toISOString(),
      all_day: false,
      location: typeof args.address === 'string' ? args.address.trim() : null,
      client_id: typeof args.client_id === 'string' ? args.client_id : null,
      job_id: typeof args.job_id === 'string' ? args.job_id : null,
      event_type: eventType,
      colour: COLOUR_MAP[eventType] || '#3B82F6',
      sync_status: 'local_only',
      notes: typeof args.notes === 'string' ? args.notes.trim() : null,
      reminder_minutes: 30,
    })
    .select('id, title, start_at, end_at, location, event_type')
    .single();

  if (error) throw new Error(`Failed to create calendar event: ${error.message}`);

  return {
    event_id: data.id,
    title: data.title,
    start_at: data.start_at,
    end_at: data.end_at,
    location: data.location,
    event_type: data.event_type,
  };
}

export async function updateCalendarEvent(args: Record<string, unknown>, user: UserContext) {
  if (typeof args.event_id !== 'string') {
    throw new Error('event_id is required');
  }

  const supabase = user.supabase;

  // Fetch existing event to merge partial changes
  const { data: existing, error: fetchError } = await supabase
    .from('calendar_events')
    .select('*')
    .eq('id', args.event_id)
    .eq('user_id', user.userId)
    .single();

  if (fetchError || !existing) {
    throw new Error(`Event not found: ${args.event_id}`);
  }

  const updates: Record<string, unknown> = {};
  const updatedFields: string[] = [];

  if (typeof args.title === 'string') {
    updates.title = args.title.trim();
    updatedFields.push('title');
  }

  if (typeof args.address === 'string') {
    updates.location = args.address.trim();
    updatedFields.push('location');
  }

  if (typeof args.notes === 'string') {
    updates.notes = args.notes.trim();
    updatedFields.push('notes');
  }

  if (typeof args.description === 'string') {
    updates.description = args.description.trim();
    updatedFields.push('description');
  }

  if (typeof args.client_id === 'string') {
    updates.client_id = args.client_id;
    updatedFields.push('client_id');
  }

  if (typeof args.job_id === 'string') {
    updates.job_id = args.job_id;
    updatedFields.push('job_id');
  }

  if (typeof args.event_type === 'string' && VALID_EVENT_TYPES.includes(args.event_type)) {
    updates.event_type = args.event_type;
    updates.colour = COLOUR_MAP[args.event_type] || '#3B82F6';
    updatedFields.push('event_type');
  }

  // Handle date/time changes — merge with existing if partial
  const hasDateChange = typeof args.date === 'string';
  const hasTimeChange = typeof args.time === 'string';
  const hasDurationChange = typeof args.duration_minutes === 'number';

  if (hasDateChange || hasTimeChange || hasDurationChange) {
    const existingStart = new Date(existing.start_at as string);
    const existingEnd = new Date(existing.end_at as string);
    const existingDuration = existingEnd.getTime() - existingStart.getTime();

    const dateStr = hasDateChange
      ? (args.date as string)
      : existingStart.toISOString().split('T')[0];
    const timeStr = hasTimeChange
      ? (args.time as string)
      : existingStart.toTimeString().slice(0, 5);
    const durationMs = hasDurationChange
      ? (args.duration_minutes as number) * 60 * 1000
      : existingDuration;

    const newStart = new Date(`${dateStr}T${timeStr}:00`);
    if (isNaN(newStart.getTime())) {
      throw new Error(`Invalid date/time: ${dateStr} ${timeStr}`);
    }
    const newEnd = new Date(newStart.getTime() + durationMs);

    updates.start_at = newStart.toISOString();
    updates.end_at = newEnd.toISOString();

    if (hasDateChange) updatedFields.push('date');
    if (hasTimeChange) updatedFields.push('time');
    if (hasDurationChange) updatedFields.push('duration');
  }

  if (updatedFields.length === 0) {
    throw new Error('No fields to update. Provide at least one field to change.');
  }

  const { data, error } = await supabase
    .from('calendar_events')
    .update(updates)
    .eq('id', args.event_id)
    .eq('user_id', user.userId)
    .select('id, title, start_at, end_at, location, event_type')
    .single();

  if (error) throw new Error(`Failed to update calendar event: ${error.message}`);

  return {
    event_id: data.id,
    title: data.title,
    start_at: data.start_at,
    end_at: data.end_at,
    location: data.location,
    event_type: data.event_type,
    updated_fields: updatedFields,
  };
}

export async function deleteCalendarEvent(args: Record<string, unknown>, user: UserContext) {
  if (typeof args.event_id !== 'string') {
    throw new Error('event_id is required');
  }

  const supabase = user.supabase;

  // Fetch event first for confirmation details
  const { data: existing, error: fetchError } = await supabase
    .from('calendar_events')
    .select('id, title, start_at, end_at')
    .eq('id', args.event_id)
    .eq('user_id', user.userId)
    .single();

  if (fetchError || !existing) {
    throw new Error(`Event not found: ${args.event_id}`);
  }

  const { error } = await supabase
    .from('calendar_events')
    .delete()
    .eq('id', args.event_id)
    .eq('user_id', user.userId);

  if (error) throw new Error(`Failed to delete calendar event: ${error.message}`);

  return {
    deleted: true,
    event_id: existing.id,
    title: existing.title,
    was_scheduled_for: existing.start_at,
  };
}

export async function getAvailability(args: Record<string, unknown>, user: UserContext) {
  if (typeof args.date_from !== 'string') {
    throw new Error('date_from is required');
  }
  if (typeof args.date_to !== 'string') {
    throw new Error('date_to is required');
  }
  if (typeof args.duration_minutes !== 'number' || args.duration_minutes <= 0) {
    throw new Error('duration_minutes must be a positive number');
  }

  const supabase = user.supabase;

  // Get existing events in the range
  const { data: events, error } = await supabase
    .from('calendar_events')
    .select('start_at, end_at, title')
    .gte('start_at', args.date_from)
    .lte('start_at', args.date_to)
    .order('start_at', { ascending: true });

  if (error) throw new Error(`Failed to check availability: ${error.message}`);

  // Find available slots (working hours 8am-6pm)
  const slots: Array<{ date: string; start: string; end: string }> = [];
  const startDate = new Date(args.date_from);
  const endDate = new Date(args.date_to);
  const durationMs = args.duration_minutes * 60 * 1000;

  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    // Skip weekends
    const day = d.getDay();
    if (day === 0 || day === 6) continue;

    const dateStr = d.toISOString().split('T')[0];
    const dayStart = new Date(`${dateStr}T08:00:00`);
    const dayEnd = new Date(`${dateStr}T18:00:00`);

    // Get events for this day
    const dayEvents = (events || [])
      .filter((e) => (e.start_at as string).startsWith(dateStr))
      .map((e) => ({
        start: new Date(e.start_at as string).getTime(),
        end: new Date(e.end_at as string).getTime(),
      }))
      .sort((a, b) => a.start - b.start);

    // Find gaps
    let cursor = dayStart.getTime();
    for (const event of dayEvents) {
      if (event.start - cursor >= durationMs) {
        slots.push({
          date: dateStr,
          start: new Date(cursor).toTimeString().slice(0, 5),
          end: new Date(cursor + durationMs).toTimeString().slice(0, 5),
        });
      }
      cursor = Math.max(cursor, event.end);
    }
    // Check gap after last event
    if (dayEnd.getTime() - cursor >= durationMs) {
      slots.push({
        date: dateStr,
        start: new Date(cursor).toTimeString().slice(0, 5),
        end: new Date(cursor + durationMs).toTimeString().slice(0, 5),
      });
    }
  }

  return {
    available_slots: slots.slice(0, 20),
    existing_events: (events || []).length,
  };
}

export async function shareBookingLink(args: Record<string, unknown>, user: UserContext) {
  const url = `https://www.elec-mate.com/book/${user.userId}`;
  const customMessage =
    typeof args.message === 'string' && args.message.trim().length > 0
      ? args.message.trim()
      : 'Share this link with clients to let them book a time slot';

  return { url, message: customMessage };
}
