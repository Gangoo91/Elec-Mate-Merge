import { useState, useEffect, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { storageGetJSONSync, storageSetJSONSync, storageRemoveSync } from '@/utils/storage';
import { getCurrentPosition } from '@/utils/geolocation';
import {
  cancelPending,
  newClientId,
  outboxReady,
  pendingOps,
  submitWorkerAction,
  OutboxRefusedError,
} from '@/lib/workerOutbox';
import { queuedToast } from '@/components/worker-tools/outboxToast';

/**
 * One location fix at clock-in / clock-out (ELE-2000). Never blocks clocking:
 * a denied permission or no fix within the timeout is recorded as such.
 */
export interface ClockFix {
  status: 'captured' | 'denied' | 'unavailable';
  lat?: number;
  lng?: number;
  /** metres */
  accuracy?: number;
}

export async function captureClockFix(timeoutMs = 8000): Promise<ClockFix> {
  try {
    const pos = await Promise.race([
      getCurrentPosition({ enableHighAccuracy: true, timeout: timeoutMs, maximumAge: 60_000 }),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('timeout')), timeoutMs + 500)
      ),
    ]);
    return {
      status: 'captured',
      lat: Number(pos.latitude.toFixed(6)),
      lng: Number(pos.longitude.toFixed(6)),
      accuracy: Math.round(pos.accuracy * 10) / 10,
    };
  } catch (e) {
    const err = e as { code?: number; message?: string };
    const denied = err?.code === 1 || /denied|permission/i.test(err?.message ?? '');
    return { status: denied ? 'denied' : 'unavailable' };
  }
}

const fixColumns = (prefix: 'clock_in' | 'clock_out', fix?: ClockFix | null) =>
  fix
    ? {
        [`${prefix}_location_status`]: fix.status,
        [`${prefix}_lat`]: fix.status === 'captured' ? fix.lat : null,
        [`${prefix}_lng`]: fix.status === 'captured' ? fix.lng : null,
        [`${prefix}_accuracy_m`]: fix.status === 'captured' ? fix.accuracy : null,
      }
    : {};

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
  /** What the phone gave at clock-in (null for rows from before ELE-2000). */
  clockInFix?: ClockFix | null;
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

function fixFromRow(row: unknown): ClockFix | null {
  const r = row as { clock_in_location_status?: string | null; clock_in_accuracy_m?: number | null };
  if (!r?.clock_in_location_status) return null;
  return {
    status: r.clock_in_location_status as ClockFix['status'],
    accuracy: r.clock_in_accuracy_m ?? undefined,
  };
}

// Widened to string: the generated types predate the ELE-2000 location columns.
const OPEN_ROW_COLUMNS: string =
  'id, employee_id, job_id, clock_in, created_at, clock_in_location_status, clock_in_accuracy_m, employee:employer_employees(name), job:employer_jobs(title)';

interface OpenRow {
  id: string;
  employee_id: string;
  job_id: string | null;
  clock_in: string | null;
  created_at: string;
  clock_in_location_status?: string | null;
  clock_in_accuracy_m?: number | null;
  employee?: { name?: string } | null;
  job?: { title?: string } | null;
}

const CLOCK_POINTER_KEY = 'employer_clock_pointer';

/** yyyy-mm-dd in the phone's time zone. */
const localDay = (iso: string) => {
  const d = new Date(iso);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};
const BREAK_STATE_KEY = 'employer_clock_breaks';
const EMPTY_BREAKS: BreakState = { timesheetId: null, startedAt: null, accumMinutes: 0 };

/**
 * The last clock-out made through the outbox on this phone, so it can be
 * undone (Job done clocks the worker out of the job, with Undo). Module-level:
 * the Undo may be tapped from a different hook instance than the one that
 * clocked out.
 */
let lastClockOut: {
  state: ClockState;
  breaks: BreakState;
  opId: string;
  clockOut: string;
} | null = null;

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
      const pointer = storageGetJSONSync<{ timesheetId: string; state?: ClockState } | null>(
        CLOCK_POINTER_KEY,
        null
      );

      // ELE-1828: a worker's clock-in / clock-out may still be on the phone,
      // waiting for signal. The pointer carries the whole shift so it restores
      // with no network, and a shift whose clock-out is waiting is not open.
      await outboxReady();
      if (cancelled) return;
      const waitingIn = new Set(pendingOps('clock_in').map((o) => o.id));
      const waitingOut = new Set(
        pendingOps('clock_out').map((o) => String(o.payload.timesheetId))
      );
      if (pointer?.timesheetId && waitingOut.has(pointer.timesheetId)) {
        storageRemoveSync(CLOCK_POINTER_KEY);
        return;
      }
      if (pointer?.state && waitingIn.has(pointer.timesheetId)) {
        setClockState(pointer.state);
        return;
      }

      // Distinguish the three outcomes: only a CONFIRMED missing row may drop
      // the pointer. A fetch error or an unmount mid-query (StrictMode double
      // mount) must leave it intact for the next mount to restore.
      const restoreRow = async (
        query: ReturnType<typeof buildOpenRowQuery>
      ): Promise<'restored' | 'not-found' | 'aborted'> => {
        const { data: raw, error } = await query;
        const data = raw as unknown as OpenRow | null;
        if (error) {
          console.error('Failed to restore open clock-in:', error);
          return 'aborted';
        }
        if (cancelled) return 'aborted';
        if (!data) return 'not-found';
        setClockState({
          timesheetId: data.id,
          employeeId: data.employee_id,
          employeeName: data.employee?.name || '',
          jobId: data.job_id || '',
          jobTitle: data.job?.title || '',
          clockInTime: data.clock_in || data.created_at,
          clockInFix: fixFromRow(data),
        });
        return 'restored';
      };

      const buildOpenRowQuery = (timesheetId?: string) => {
        let q = supabase
          .from('employer_timesheets')
          .select(
            OPEN_ROW_COLUMNS
          )
          .is('clock_out', null)
          .eq('status', 'Pending');
        if (timesheetId) q = q.eq('id', timesheetId);
        return q.order('created_at', { ascending: false }).limit(1).maybeSingle();
      };

      if (pointer?.timesheetId) {
        const outcome = await restoreRow(buildOpenRowQuery(pointer.timesheetId));
        if (outcome === 'restored') return;
        if (outcome === 'aborted') {
          // No signal: show the shift the phone knows about.
          if (pointer.state && !cancelled) setClockState(pointer.state);
          return;
        }
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
      const { data: openRaw } = await supabase
        .from('employer_timesheets')
        .select(
          OPEN_ROW_COLUMNS
        )
        .in('employee_id', ids)
        .is('clock_out', null)
        .eq('status', 'Pending')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      const open = openRaw as unknown as OpenRow | null;
      if (open && !cancelled && !waitingOut.has(open.id)) {
        setClockState({
          timesheetId: open.id,
          employeeId: open.employee_id,
          employeeName: open.employee?.name || '',
          jobId: open.job_id || '',
          jobTitle: open.job?.title || '',
          clockInTime: open.clock_in || open.created_at,
          clockInFix: fixFromRow(open),
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
    async (
      employeeId: string,
      employeeName: string,
      jobId: string,
      jobTitle: string,
      /** ELE-2000: the phone's one-off fix (workers). Office clock-ins pass none. */
      fix?: ClockFix | null,
      /** ELE-1828: workers' clock-ins go through the outbox (work with no signal). */
      opts?: { offline?: boolean }
    ) => {
      setIsWorking(true);
      if (opts?.offline) {
        const clockInTime = new Date().toISOString();
        const id = newClientId();
        const newState: ClockState = {
          timesheetId: id,
          employeeId,
          employeeName,
          jobId,
          jobTitle,
          clockInTime,
          clockInFix: fix ?? null,
        };
        try {
          const { result } = await submitWorkerAction({
            id,
            kind: 'clock_in',
            label: 'Clock in',
            detail: jobTitle,
            jobId,
            queued_at: clockInTime,
            payload: {
              row: {
                employee_id: employeeId,
                job_id: jobId || null,
                // Local date: the day the worker was on site.
                date: localDay(clockInTime),
                clock_in: clockInTime,
                clock_out: null,
                break_minutes: 0,
                status: 'Pending',
                ...fixColumns('clock_in', fix),
              },
            },
          });
          storageSetJSONSync(CLOCK_POINTER_KEY, { timesheetId: id, state: newState });
          persistBreaks(EMPTY_BREAKS);
          setClockState(newState);
          if (result === 'sent') toast.success(`Clocked in to ${jobTitle}`);
          else
            queuedToast(
              `Clocked in to ${jobTitle} at ${new Date(clockInTime).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}`
            );
          return true;
        } catch (error) {
          toast.error(
            error instanceof OutboxRefusedError ? error.message : 'Couldn’t clock in. Try again.'
          );
          return false;
        } finally {
          setIsWorking(false);
        }
      }
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
            ...fixColumns('clock_in', fix),
          } as never)
          .select('id')
          .single();

        if (error) throw error;

        const newState: ClockState = {
          timesheetId: (data as { id: string }).id,
          employeeId,
          employeeName,
          jobId,
          jobTitle,
          clockInTime,
          clockInFix: fix ?? null,
        };
        storageSetJSONSync(CLOCK_POINTER_KEY, { timesheetId: (data as { id: string }).id });
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
    async (
      breakMinutesOverride?: number,
      fix?: ClockFix | null,
      /** ELE-1828: workers' clock-outs go through the outbox (work with no signal). */
      opts?: { offline?: boolean; quiet?: boolean }
    ) => {
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
      if (opts?.offline) {
        try {
          const { result, op } = await submitWorkerAction({
            kind: 'clock_out',
            label: 'Clock out',
            detail: clockState.jobTitle || null,
            jobId: clockState.jobId || null,
            queued_at: clockOutTime,
            payload: {
              timesheetId: clockState.timesheetId,
              values: {
                clock_out: clockOutTime,
                break_minutes: breakMinutes,
                total_hours: parseFloat(totalHours.toFixed(2)),
                ...fixColumns('clock_out', fix),
              },
            },
          });
          // Kept so "Undo" (Job done clocks the worker out) can reopen the shift.
          lastClockOut = {
            state: clockState,
            breaks: storedBreaks?.timesheetId === clockState.timesheetId ? storedBreaks : EMPTY_BREAKS,
            opId: op.id,
            clockOut: clockOutTime,
          };
          storageRemoveSync(CLOCK_POINTER_KEY);
          persistBreaks(EMPTY_BREAKS);
          setClockState(null);
          const summary = `${totalHours.toFixed(1)} hours${breakMinutes > 0 ? ` (${breakMinutes}m break)` : ''}`;
          if (result === 'sent') {
            queryClient.invalidateQueries({ queryKey: ['timesheets'] });
            queryClient.invalidateQueries({ queryKey: ['todays-hours'] });
            if (!opts.quiet) toast.success(`Clocked out. ${summary} logged.`);
          } else if (!opts.quiet) {
            queuedToast(`Clocked out. ${summary}.`);
          }
          return true;
        } catch (error) {
          if (error instanceof OutboxRefusedError) {
            // The office approved or removed the day while it was open.
            storageRemoveSync(CLOCK_POINTER_KEY);
            persistBreaks(EMPTY_BREAKS);
            setClockState(null);
            queryClient.invalidateQueries({ queryKey: ['timesheets'] });
            toast.error(error.message);
          } else {
            toast.error('Couldn’t clock out. Try again.');
          }
          return false;
        } finally {
          setIsWorking(false);
        }
      }
      try {
        // Guard on status: if the row was approved/rejected while open, don't
        // silently rewrite an already-signed-off record.
        const { data, error } = await supabase
          .from('employer_timesheets')
          .update({
            clock_out: clockOutTime,
            break_minutes: breakMinutes,
            total_hours: parseFloat(totalHours.toFixed(2)),
            ...fixColumns('clock_out', fix),
          } as never)
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
    // ELE-1828: a clock-in still waiting on the phone is simply not sent.
    if (await cancelPending(clockState.timesheetId)) {
      storageRemoveSync(CLOCK_POINTER_KEY);
      persistBreaks(EMPTY_BREAKS);
      setClockState(null);
      toast.info('Clock in cancelled');
      return;
    }
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

  /**
   * Undo the last clock-out made on this phone (gap #3: Job done clocks the
   * worker out, with Undo). Still waiting to send: it is simply not sent.
   * Already sent: the row is reopened, only while it is still Pending with the
   * clock-out time this phone wrote, so nothing the office did is overwritten.
   */
  const undoClockOut = useCallback(async (): Promise<boolean> => {
    const last = lastClockOut;
    if (!last) return false;
    const restore = () => {
      lastClockOut = null;
      storageSetJSONSync(CLOCK_POINTER_KEY, {
        timesheetId: last.state.timesheetId,
        state: last.state,
      });
      persistBreaks(last.breaks);
      setClockState(last.state);
      queryClient.invalidateQueries({ queryKey: ['timesheets'] });
      queryClient.invalidateQueries({ queryKey: ['todays-hours'] });
    };
    if (await cancelPending(last.opId)) {
      restore();
      return true;
    }
    const { data, error } = await supabase
      .from('employer_timesheets')
      .update({
        clock_out: null,
        total_hours: null,
        clock_out_location_status: null,
        clock_out_lat: null,
        clock_out_lng: null,
        clock_out_accuracy_m: null,
      } as never)
      .eq('id', last.state.timesheetId)
      .eq('status', 'Pending')
      .eq('clock_out', last.clockOut)
      .select('id');
    if (error || !data || data.length === 0) return false;
    restore();
    return true;
  }, [persistBreaks, queryClient]);

  return {
    isClockedIn: !!clockState,
    clockState,
    duration,
    clockIn,
    clockOut,
    undoClockOut,
    cancelClockIn,
    isClockingOut: isWorking,
    isOnBreak:
      !!breakState.startedAt && breakState.timesheetId === (clockState?.timesheetId ?? null),
    breakMinutes: Math.round(liveBreakMinutes(breakState, clockState?.timesheetId ?? null)),
    startBreak,
    endBreak,
  };
};
