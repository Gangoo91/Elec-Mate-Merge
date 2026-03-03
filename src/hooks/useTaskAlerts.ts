import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { differenceInDays, parseISO, startOfDay, endOfDay } from 'date-fns';

export interface OverdueTask {
  id: string;
  title: string;
  priority: string;
  dueAt: string;
  daysOverdue: number;
}

export interface JobDueAlert {
  id: string;
  title: string;
  startAt: string;
  location: string | null;
  eventType: string | null;
  isToday: boolean;
}

export interface TaskAlerts {
  overdueTasks: OverdueTask[];
  jobsDueToday: JobDueAlert[];
  jobsDueTomorrow: JobDueAlert[];
}

export function useTaskAlerts() {
  return useQuery<TaskAlerts>({
    queryKey: ['task-alerts'],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return { overdueTasks: [], jobsDueToday: [], jobsDueTomorrow: [] };

      const now = new Date();
      const todayStart = startOfDay(now).toISOString();
      const todayEnd = endOfDay(now).toISOString();
      const tomorrowStart = startOfDay(new Date(now.getTime() + 86400000)).toISOString();
      const tomorrowEnd = endOfDay(new Date(now.getTime() + 86400000)).toISOString();

      const [tasksRes, todayJobsRes, tomorrowJobsRes] = await Promise.all([
        // Overdue open tasks (not snoozed past now)
        supabase
          .from('spark_tasks')
          .select('id, title, priority, due_at')
          .eq('user_id', user.id)
          .eq('status', 'open')
          .not('due_at', 'is', null)
          .lt('due_at', now.toISOString())
          .order('due_at', { ascending: true })
          .limit(10),

        // Calendar events today
        supabase
          .from('calendar_events')
          .select('id, title, start_at, location, event_type')
          .eq('user_id', user.id)
          .gte('start_at', todayStart)
          .lte('start_at', todayEnd)
          .order('start_at', { ascending: true }),

        // Calendar events tomorrow
        supabase
          .from('calendar_events')
          .select('id, title, start_at, location, event_type')
          .eq('user_id', user.id)
          .gte('start_at', tomorrowStart)
          .lte('start_at', tomorrowEnd)
          .order('start_at', { ascending: true }),
      ]);

      const overdueTasks: OverdueTask[] = (tasksRes.data ?? []).map((t) => ({
        id: t.id,
        title: t.title,
        priority: t.priority,
        dueAt: t.due_at,
        daysOverdue: Math.abs(differenceInDays(parseISO(t.due_at), now)),
      }));

      const jobsDueToday: JobDueAlert[] = (todayJobsRes.data ?? []).map((e) => ({
        id: e.id,
        title: e.title,
        startAt: e.start_at,
        location: e.location,
        eventType: e.event_type,
        isToday: true,
      }));

      const jobsDueTomorrow: JobDueAlert[] = (tomorrowJobsRes.data ?? []).map((e) => ({
        id: e.id,
        title: e.title,
        startAt: e.start_at,
        location: e.location,
        eventType: e.event_type,
        isToday: false,
      }));

      return { overdueTasks, jobsDueToday, jobsDueTomorrow };
    },
    staleTime: 5 * 60 * 1000,
  });
}
