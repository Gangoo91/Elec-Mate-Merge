import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

/**
 * Everything the Worker Tools hub shows, in one call (get_worker_home): the
 * caller's own shift, week, money, leave, jobs, tasks, sign-offs, kit and
 * credential expiries. Scoped server-side to their own roster row.
 */
export interface WorkerHome {
  first_name: string | null;
  firm: string;
  open_shift: { clock_in: string; job_title: string | null } | null;
  week_hours: number;
  timesheets_waiting: number;
  timesheets_sent_back: number;
  expenses_waiting: { count: number; total: number };
  owed_to_you: number;
  next_leave: { start: string; end: string; type: string | null } | null;
  leave_waiting: number;
  next_job: { id: string; title: string; location: string | null; starts: string | null } | null;
  jobs_active: number;
  tasks_open: number;
  tasks_due: number;
  to_sign: number;
  kit_due: number;
  next_expiry: { name: string; due: string } | null;
  kit_count: number;
  reports_open: number;
  week_days: { date: string; hours: number }[];
  upcoming: Array<{
    kind: 'job' | 'leave' | 'task' | 'expiry';
    date: string;
    title: string;
    detail: string | null;
    id: string | null;
  }>;
}

export function useWorkerHome() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['worker-home', user?.id],
    enabled: !!user,
    staleTime: 60 * 1000,
    refetchInterval: 60 * 1000,
    queryFn: async (): Promise<WorkerHome | null> => {
      // Cast: this RPC postdates the last types.ts regeneration.
      const { data, error } = await supabase.rpc('get_worker_home' as never);
      if (error) throw error;
      return (data as unknown as WorkerHome) ?? null;
    },
  });
}
