import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { CalendarEvent } from '@/types/calendar';

interface SparkTaskRow {
  id: string;
  title: string;
  due_at: string;
  priority: string;
  status: string;
  customer_id?: string;
  customers?: { name: string } | null;
}

/**
 * Lightweight hook: fetches open tasks with due dates in a given range
 * and converts them to CalendarEvent objects for display on the calendar.
 */
export function useTasksForCalendar(dateFrom: string, dateTo: string) {
  return useQuery({
    queryKey: ['tasks-for-calendar', dateFrom, dateTo],
    queryFn: async (): Promise<CalendarEvent[]> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return [];

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data, error } = await (supabase as any)
        .from('spark_tasks')
        .select('id, title, due_at, priority, status, customer_id, customers(name)')
        .eq('user_id', user.id)
        .eq('status', 'open')
        .not('due_at', 'is', null)
        .gte('due_at', dateFrom)
        .lte('due_at', dateTo);

      if (error) throw error;

      return (data || []).map(
        (task: SparkTaskRow): CalendarEvent => ({
          id: `task-${task.id}`,
          user_id: user.id,
          title: task.title,
          description: task.customers?.name ? `Task for ${task.customers.name}` : undefined,
          start_at: task.due_at,
          end_at: task.due_at,
          all_day: true,
          event_type: 'general',
          colour: '#A855F7',
          recurring: false,
          sync_status: 'local_only',
          reminder_minutes: 0,
          created_at: task.due_at,
          updated_at: task.due_at,
          client_id: task.customer_id || undefined,
          customer: task.customers?.name
            ? { id: task.customer_id, name: task.customers.name }
            : undefined,
        })
      );
    },
  });
}
