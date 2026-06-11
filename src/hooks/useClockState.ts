import { useState, useEffect, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { storageGetJSONSync, storageSetJSONSync, storageRemoveSync } from '@/utils/storage';

/**
 * Clock-in state, DB-backed.
 *
 * An open clock-in IS a row in employer_timesheets (clock_in set,
 * clock_out NULL, status Pending) — so it survives browser restarts,
 * works across devices, and supports any number of workers at once.
 * localStorage only keeps a pointer to the open row for fast restore
 * (the office clock-in card passes arbitrary roster employees; workers
 * restore their own open entry by identity).
 */

interface ClockState {
  timesheetId: string;
  employeeId: string;
  employeeName: string;
  jobId: string;
  jobTitle: string;
  clockInTime: string; // ISO timestamp
}

const CLOCK_POINTER_KEY = 'employer_clock_pointer';

export const useClockState = () => {
  const [clockState, setClockState] = useState<ClockState | null>(null);
  const [duration, setDuration] = useState<string>('00:00:00');
  const [isWorking, setIsWorking] = useState(false);
  const queryClient = useQueryClient();

  // Restore an open entry on mount: pointer first, then own open row
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const pointer = storageGetJSONSync<{ timesheetId: string } | null>(CLOCK_POINTER_KEY, null);

      const restoreRow = async (query: ReturnType<typeof buildOpenRowQuery>) => {
        const { data } = await query;
        if (cancelled || !data) return false;
        setClockState({
          timesheetId: data.id,
          employeeId: data.employee_id,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          employeeName: (data.employee as any)?.name || '',
          jobId: data.job_id || '',
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          jobTitle: (data.job as any)?.title || '',
          clockInTime: data.clock_in || data.created_at,
        });
        return true;
      };

      const buildOpenRowQuery = (timesheetId?: string) => {
        let q = supabase
          .from('employer_timesheets')
          .select(
            'id, employee_id, job_id, clock_in, created_at, employee:employer_employees(name), job:employer_jobs(title)'
          )
          .is('clock_out', null)
          .eq('status', 'Pending');
        if (timesheetId) q = q.eq('id', timesheetId);
        return q.order('created_at', { ascending: false }).limit(1).maybeSingle();
      };

      if (pointer?.timesheetId) {
        const restored = await restoreRow(buildOpenRowQuery(pointer.timesheetId));
        if (restored) return;
        storageRemoveSync(CLOCK_POINTER_KEY);
      }

      // Worker self-restore: their own open entry (RLS scopes the query)
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user || cancelled) return;
      const { data: myRows } = await supabase
        .from('employer_employees')
        .select('id')
        .eq('user_id', user.id)
        .not('employer_id', 'is', null);
      const ids = (myRows || []).map((r) => r.id);
      if (ids.length === 0) return;
      const { data: open } = await supabase
        .from('employer_timesheets')
        .select(
          'id, employee_id, job_id, clock_in, created_at, employee:employer_employees(name), job:employer_jobs(title)'
        )
        .in('employee_id', ids)
        .is('clock_out', null)
        .eq('status', 'Pending')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      if (open && !cancelled) {
        setClockState({
          timesheetId: open.id,
          employeeId: open.employee_id,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          employeeName: (open.employee as any)?.name || '',
          jobId: open.job_id || '',
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          jobTitle: (open.job as any)?.title || '',
          clockInTime: open.clock_in || open.created_at,
        });
        storageSetJSONSync(CLOCK_POINTER_KEY, { timesheetId: open.id });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Tick the duration display
  useEffect(() => {
    if (!clockState) {
      setDuration('00:00:00');
      return;
    }
    const updateDuration = () => {
      const start = new Date(clockState.clockInTime).getTime();
      const diff = Math.floor((Date.now() - start) / 1000);
      const hours = Math.floor(diff / 3600);
      const minutes = Math.floor((diff % 3600) / 60);
      const seconds = diff % 60;
      setDuration(
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      );
    };
    updateDuration();
    const interval = setInterval(updateDuration, 1000);
    return () => clearInterval(interval);
  }, [clockState]);

  const clockIn = useCallback(
    async (employeeId: string, employeeName: string, jobId: string, jobTitle: string) => {
      setIsWorking(true);
      try {
        const clockInTime = new Date().toISOString();
        const { data, error } = await supabase
          .from('employer_timesheets')
          .insert({
            employee_id: employeeId,
            job_id: jobId || null,
            date: clockInTime.split('T')[0],
            clock_in: clockInTime,
            clock_out: null,
            break_minutes: 0,
            status: 'Pending',
          })
          .select('id')
          .single();

        if (error) throw error;

        const newState: ClockState = {
          timesheetId: data.id,
          employeeId,
          employeeName,
          jobId,
          jobTitle,
          clockInTime,
        };
        storageSetJSONSync(CLOCK_POINTER_KEY, { timesheetId: data.id });
        setClockState(newState);
        toast.success(`Clocked in to ${jobTitle}`);
        return true;
      } catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((error as any)?.code === '23505') {
          toast.error('Already clocked in — clock out of the open entry first.');
        } else {
          console.error('Failed to clock in:', error);
          toast.error('Failed to clock in');
        }
        return false;
      } finally {
        setIsWorking(false);
      }
    },
    []
  );

  const clockOut = useCallback(
    async (breakMinutes: number = 0) => {
      if (!clockState) {
        toast.error('Not currently clocked in');
        return false;
      }

      const clockOutTime = new Date().toISOString();
      const diffMs = new Date(clockOutTime).getTime() - new Date(clockState.clockInTime).getTime();
      const totalHours = Math.max(0, diffMs / (1000 * 60 * 60) - breakMinutes / 60);

      setIsWorking(true);
      try {
        const { error } = await supabase
          .from('employer_timesheets')
          .update({
            clock_out: clockOutTime,
            break_minutes: breakMinutes,
            total_hours: parseFloat(totalHours.toFixed(2)),
          })
          .eq('id', clockState.timesheetId);

        if (error) throw error;

        storageRemoveSync(CLOCK_POINTER_KEY);
        setClockState(null);
        queryClient.invalidateQueries({ queryKey: ['timesheets'] });
        queryClient.invalidateQueries({ queryKey: ['todays-hours'] });
        toast.success(`Clocked out. ${totalHours.toFixed(1)} hours logged.`);
        return true;
      } catch (error) {
        console.error('Failed to clock out:', error);
        toast.error('Failed to save timesheet');
        return false;
      } finally {
        setIsWorking(false);
      }
    },
    [clockState, queryClient]
  );

  const cancelClockIn = useCallback(async () => {
    if (!clockState) return;
    try {
      await supabase.from('employer_timesheets').delete().eq('id', clockState.timesheetId);
    } catch (error) {
      console.error('Failed to remove open clock-in row:', error);
    }
    storageRemoveSync(CLOCK_POINTER_KEY);
    setClockState(null);
    toast.info('Clock in cancelled');
  }, [clockState]);

  return {
    isClockedIn: !!clockState,
    clockState,
    duration,
    clockIn,
    clockOut,
    cancelClockIn,
    isClockingOut: isWorking,
  };
};
