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

/** Break bookkeeping lives beside the pointer in localStorage — the open DB row
 *  has no on-break column, so an in-progress break doesn't survive a device
 *  switch (accumulated minutes written at clock-out do). Keyed to the shift's
 *  timesheetId so a stale break from an abandoned shift can never be deducted
 *  from a later one. */
interface BreakState {
  timesheetId: string | null; // shift this break state belongs to
  startedAt: string | null; // ISO — set while on a break
  accumMinutes: number; // completed breaks so far this shift
}

const CLOCK_POINTER_KEY = 'employer_clock_pointer';
const BREAK_STATE_KEY = 'employer_clock_breaks';
const EMPTY_BREAKS: BreakState = { timesheetId: null, startedAt: null, accumMinutes: 0 };

export const useClockState = () => {
  const [clockState, setClockState] = useState<ClockState | null>(null);
  const [breakState, setBreakState] = useState<BreakState>(() => {
    const stored = storageGetJSONSync<BreakState>(BREAK_STATE_KEY, EMPTY_BREAKS);
    // Legacy shape (no timesheetId) or empty — treat as no breaks
    return stored?.timesheetId ? stored : EMPTY_BREAKS;
  });
  const [duration, setDuration] = useState<string>('00:00:00');
  const [isWorking, setIsWorking] = useState(false);
  const queryClient = useQueryClient();

  const persistBreaks = useCallback((next: BreakState) => {
    setBreakState(next);
    storageSetJSONSync(BREAK_STATE_KEY, next);
  }, []);

  /** Break minutes for the CURRENT shift only — foreign/stale state counts 0. */
  const liveBreakMinutes = (state: BreakState, timesheetId: string | null): number => {
    if (!timesheetId || state.timesheetId !== timesheetId) return 0;
    return (
      state.accumMinutes +
      (state.startedAt
        ? Math.max(0, (Date.now() - new Date(state.startedAt).getTime()) / 60000)
        : 0)
    );
  };

  const startBreak = useCallback(() => {
    if (!clockState) return;
    // If the stored state belongs to another shift, start fresh for this one
    const base =
      breakState.timesheetId === clockState.timesheetId ? breakState : EMPTY_BREAKS;
    persistBreaks({
      ...base,
      timesheetId: clockState.timesheetId,
      startedAt: new Date().toISOString(),
    });
    toast.info('Break started');
  }, [breakState, clockState, persistBreaks]);

  const endBreak = useCallback(() => {
    if (!clockState || !breakState.startedAt) return;
    persistBreaks({
      timesheetId: clockState.timesheetId,
      startedAt: null,
      accumMinutes: Math.round(liveBreakMinutes(breakState, clockState.timesheetId)),
    });
    toast.info('Back on the clock');
  }, [breakState, clockState, persistBreaks]);

  // Restore an open entry on mount: pointer first, then own open row
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const pointer = storageGetJSONSync<{ timesheetId: string } | null>(CLOCK_POINTER_KEY, null);

      // Distinguish the three outcomes: only a CONFIRMED missing row may drop
      // the pointer. A fetch error or an unmount mid-query (StrictMode double
      // mount) must leave it intact for the next mount to restore.
      const restoreRow = async (
        query: ReturnType<typeof buildOpenRowQuery>
      ): Promise<'restored' | 'not-found' | 'aborted'> => {
        const { data, error } = await query;
        if (error) {
          console.error('Failed to restore open clock-in:', error);
          return 'aborted';
        }
        if (cancelled) return 'aborted';
        if (!data) return 'not-found';
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
        return 'restored';
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
        const outcome = await restoreRow(buildOpenRowQuery(pointer.timesheetId));
        if (outcome === 'restored' || outcome === 'aborted') return;
        // Confirmed gone (approved/removed while away) — release the pointer
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
        // Fresh shift, fresh break ledger — discard anything from an old shift
        persistBreaks(EMPTY_BREAKS);
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
    [persistBreaks]
  );

  const clockOut = useCallback(
    async (breakMinutesOverride?: number) => {
      if (!clockState) {
        toast.error('Not currently clocked in');
        return false;
      }

      // Re-read localStorage at settle time — another tab/instance may have
      // tracked breaks for this shift; in-memory state only sees its own writes.
      const storedBreaks = storageGetJSONSync<BreakState>(BREAK_STATE_KEY, EMPTY_BREAKS);
      const breakMinutes = Math.round(
        breakMinutesOverride ?? liveBreakMinutes(storedBreaks ?? EMPTY_BREAKS, clockState.timesheetId)
      );
      const clockOutTime = new Date().toISOString();
      const diffMs = new Date(clockOutTime).getTime() - new Date(clockState.clockInTime).getTime();
      const totalHours = Math.max(0, diffMs / (1000 * 60 * 60) - breakMinutes / 60);

      setIsWorking(true);
      try {
        // Guard on status: if the row was approved/rejected while open, don't
        // silently rewrite an already-signed-off record.
        const { data, error } = await supabase
          .from('employer_timesheets')
          .update({
            clock_out: clockOutTime,
            break_minutes: breakMinutes,
            total_hours: parseFloat(totalHours.toFixed(2)),
          })
          .eq('id', clockState.timesheetId)
          .eq('status', 'Pending')
          .select('id');

        if (error) throw error;

        if (!data || data.length === 0) {
          // The row was approved/rejected/removed while open. The shift can't be
          // closed any more — release the local state so the user isn't trapped
          // in a clocked-in loop, and say what happened.
          storageRemoveSync(CLOCK_POINTER_KEY);
          persistBreaks(EMPTY_BREAKS);
          setClockState(null);
          queryClient.invalidateQueries({ queryKey: ['timesheets'] });
          toast.error(
            'This entry was approved or removed while open — clock-out time not recorded. Check the timesheet list.'
          );
          return false;
        }

        storageRemoveSync(CLOCK_POINTER_KEY);
        persistBreaks(EMPTY_BREAKS);
        setClockState(null);
        queryClient.invalidateQueries({ queryKey: ['timesheets'] });
        queryClient.invalidateQueries({ queryKey: ['todays-hours'] });
        toast.success(
          `Clocked out. ${totalHours.toFixed(1)} hours logged${breakMinutes > 0 ? ` (${breakMinutes}m break)` : ''}.`
        );
        return true;
      } catch (error) {
        // Network/DB error — keep local state so a retry can succeed
        console.error('Failed to clock out:', error);
        toast.error(error instanceof Error ? error.message : 'Failed to save timesheet');
        return false;
      } finally {
        setIsWorking(false);
      }
    },
    [clockState, persistBreaks, queryClient]
  );

  const cancelClockIn = useCallback(async () => {
    if (!clockState) return;
    try {
      // Only delete a still-open Pending row — never a record that was
      // approved/rejected while this device thought the shift was open.
      await supabase
        .from('employer_timesheets')
        .delete()
        .eq('id', clockState.timesheetId)
        .eq('status', 'Pending')
        .is('clock_out', null);
    } catch (error) {
      console.error('Failed to remove open clock-in row:', error);
    }
    storageRemoveSync(CLOCK_POINTER_KEY);
    persistBreaks(EMPTY_BREAKS);
    setClockState(null);
    toast.info('Clock in cancelled');
  }, [clockState, persistBreaks]);

  return {
    isClockedIn: !!clockState,
    clockState,
    duration,
    clockIn,
    clockOut,
    cancelClockIn,
    isClockingOut: isWorking,
    isOnBreak:
      !!breakState.startedAt && breakState.timesheetId === (clockState?.timesheetId ?? null),
    breakMinutes: Math.round(liveBreakMinutes(breakState, clockState?.timesheetId ?? null)),
    startBreak,
    endBreak,
  };
};
