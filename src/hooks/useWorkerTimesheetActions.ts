/**
 * Worker timesheet actions (ELE-2000): the firm's break default, fixing a
 * pending day or a day the office sent back, and deleting a pending day.
 * Hours are worked out on the server (fix_my_timesheet) and it checks the row
 * is the caller's own at their current firm.
 */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { OFFLINE_FIRST, offlineSnapshot } from '@/lib/workerOfflineCache';
import { supabase } from '@/integrations/supabase/client';

export function useMyTimeSettings() {
  return useQuery({
    queryKey: ['my-time-settings'],
    ...OFFLINE_FIRST,
    queryFn: () =>
      offlineSnapshot('my-time-settings', async () => {
        const { data, error } = await supabase.rpc('get_my_time_settings' as never);
        if (error) throw error;
        const d = data as unknown as { default_break_minutes?: number } | null;
        return { defaultBreakMinutes: d?.default_break_minutes ?? 30 };
      }),
    staleTime: 10 * 60 * 1000,
  });
}

export interface FixTimesheetInput {
  id: string;
  jobId: string | null;
  clockIn: string; // ISO instant
  clockOut: string; // ISO instant
  breakMinutes: number;
  notes: string | null;
}

export function useFixMyTimesheet() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: FixTimesheetInput) => {
      const { data, error } = await supabase.rpc(
        'fix_my_timesheet' as never,
        {
          p_id: input.id,
          p_job_id: input.jobId,
          p_clock_in: input.clockIn,
          p_clock_out: input.clockOut,
          p_break_minutes: input.breakMinutes,
          p_notes: input.notes,
        } as never
      );
      if (error) throw error;
      return data as unknown as { total_hours: number; resubmitted: boolean };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['timesheets'] });
      queryClient.invalidateQueries({ queryKey: ['todays-hours'] });
    },
  });
}

export function useDeleteMyTimesheet() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { data, error } = await supabase
        .from('employer_timesheets')
        .delete()
        .eq('id', id)
        .eq('status', 'Pending')
        .select('id');
      if (error) throw error;
      if (!data || data.length === 0) {
        throw new Error('This day can’t be deleted — the office may have already approved it.');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['timesheets'] });
      queryClient.invalidateQueries({ queryKey: ['todays-hours'] });
    },
  });
}
