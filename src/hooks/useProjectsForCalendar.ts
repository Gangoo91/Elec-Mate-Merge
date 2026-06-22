import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { CalendarEvent } from '@/types/calendar';

interface SparkProjectRow {
  id: string;
  title: string;
  start_date: string | null;
  due_date: string | null;
  status: string;
  location: string | null;
}

/** Distinct project colour — indigo, visually separate from task purple. */
const PROJECT_COLOUR = '#6366F1';

/**
 * Lightweight hook: fetches projects with a start_date or due_date in a given
 * range and converts them to CalendarEvent objects for display on the calendar.
 *
 * Each project can emit up to two all-day events:
 *  - "Starts: <title>" on start_date (if within range)
 *  - "Due: <title>"    on due_date   (if within range)
 *
 * Completed/cancelled projects are skipped — the planner only surfaces work
 * that's still ahead. Events mirror the exact shape of useTasksForCalendar so
 * they slot straight into the Month/Week/Day views + agenda with no changes.
 */
export function useProjectsForCalendar(dateFrom: string, dateTo: string) {
  return useQuery({
    queryKey: ['projects-for-calendar', dateFrom, dateTo],
    queryFn: async (): Promise<CalendarEvent[]> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return [];

      // start_date / due_date are date-only columns. Widen the range to the
      // whole calendar window so a same-day date (e.g. 2026-06-22) isn't
      // excluded by a timestamp lower-bound (2026-06-22T08:00:00Z).
      const fromDate = dateFrom.slice(0, 10);
      const toDate = dateTo.slice(0, 10);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data, error } = await (supabase as any)
        .from('spark_projects')
        .select('id, title, start_date, due_date, status, location')
        .eq('user_id', user.id)
        .not('status', 'in', '("completed","cancelled")')
        .or(
          `and(start_date.gte.${fromDate},start_date.lte.${toDate}),and(due_date.gte.${fromDate},due_date.lte.${toDate})`
        );

      if (error) throw error;

      const events: CalendarEvent[] = [];

      const inRange = (value: string | null): value is string => {
        if (!value) return false;
        const day = value.slice(0, 10);
        return day >= fromDate && day <= toDate;
      };

      const buildEvent = (
        project: SparkProjectRow,
        date: string,
        kind: 'start' | 'due'
      ): CalendarEvent => ({
        id: `project-${kind}-${project.id}`,
        user_id: user.id,
        title: `${kind === 'start' ? 'Starts' : 'Due'}: ${project.title}`,
        description: project.location ? `Project at ${project.location}` : undefined,
        start_at: date,
        end_at: date,
        all_day: true,
        location: project.location || undefined,
        event_type: 'general',
        colour: PROJECT_COLOUR,
        recurring: false,
        sync_status: 'local_only',
        reminder_minutes: 0,
        created_at: date,
        updated_at: date,
        job_id: project.id,
      });

      for (const project of (data || []) as SparkProjectRow[]) {
        if (inRange(project.start_date)) {
          events.push(buildEvent(project, project.start_date, 'start'));
        }
        if (inRange(project.due_date)) {
          events.push(buildEvent(project, project.due_date, 'due'));
        }
      }

      return events;
    },
  });
}
