/**
 * Agent Get Availability
 * MCP tool: Compute free time slots for a given date range
 * Returns available 30-minute slots within working hours (08:00-18:00)
 */

import { serve, corsHeaders, createClient } from '../_shared/deps.ts';
import { handleError, ValidationError } from '../_shared/errors.ts';

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new ValidationError('Authorization header required');
    }

    const { date, workingHoursStart = 8, workingHoursEnd = 18 } = await req.json();
    if (!date) {
      throw new ValidationError('date is required (YYYY-MM-DD)');
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      throw new ValidationError('Authentication required');
    }

    // Fetch events for the day
    const dayStart = `${date}T00:00:00Z`;
    const dayEnd = `${date}T23:59:59Z`;

    const { data: events, error } = await supabase
      .from('calendar_events')
      .select('start_at, end_at, all_day')
      .eq('user_id', user.id)
      .gte('start_at', dayStart)
      .lte('start_at', dayEnd)
      .order('start_at', { ascending: true });

    if (error) throw error;

    // Build busy intervals in minutes from midnight
    const busyIntervals: Array<{ start: number; end: number }> = [];

    for (const event of events ?? []) {
      if (event.all_day) {
        // All-day event blocks everything
        busyIntervals.push({
          start: workingHoursStart * 60,
          end: workingHoursEnd * 60,
        });
        continue;
      }

      const eventStart = new Date(event.start_at);
      const eventEnd = new Date(event.end_at);
      const startMin = eventStart.getUTCHours() * 60 + eventStart.getUTCMinutes();
      const endMin = eventEnd.getUTCHours() * 60 + eventEnd.getUTCMinutes();

      busyIntervals.push({
        start: Math.max(startMin, workingHoursStart * 60),
        end: Math.min(endMin, workingHoursEnd * 60),
      });
    }

    // Sort by start time
    busyIntervals.sort((a, b) => a.start - b.start);

    // Find free slots (30-minute granularity)
    const freeSlots: Array<{ start: string; end: string }> = [];
    let cursor = workingHoursStart * 60;

    for (const busy of busyIntervals) {
      if (cursor < busy.start) {
        // Free from cursor to busy.start
        const slotStart = `${String(Math.floor(cursor / 60)).padStart(2, '0')}:${String(cursor % 60).padStart(2, '0')}`;
        const slotEnd = `${String(Math.floor(busy.start / 60)).padStart(2, '0')}:${String(busy.start % 60).padStart(2, '0')}`;
        freeSlots.push({ start: slotStart, end: slotEnd });
      }
      cursor = Math.max(cursor, busy.end);
    }

    // Remaining free time until work end
    const workEnd = workingHoursEnd * 60;
    if (cursor < workEnd) {
      const slotStart = `${String(Math.floor(cursor / 60)).padStart(2, '0')}:${String(cursor % 60).padStart(2, '0')}`;
      const slotEnd = `${String(Math.floor(workEnd / 60)).padStart(2, '0')}:${String(workEnd % 60).padStart(2, '0')}`;
      freeSlots.push({ start: slotStart, end: slotEnd });
    }

    return new Response(
      JSON.stringify({
        date,
        workingHours: {
          start: `${String(workingHoursStart).padStart(2, '0')}:00`,
          end: `${String(workingHoursEnd).padStart(2, '0')}:00`,
        },
        totalEvents: events?.length ?? 0,
        freeSlots,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return handleError(error);
  }
});
