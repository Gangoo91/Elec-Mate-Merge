/**
 * Data for the Employer Hub Diary / dispatch board (ELE-1820) and the
 * timeline drag (ELE-1961).
 *
 * Reads come from one firm-scoped RPC (`get_dispatch_board`) so an office
 * manager gets exactly what dispatching needs and nothing with money in it.
 * Writes go through SECURITY DEFINER RPCs that check the firm, keep the job's
 * own dates covering its bookings, and leave a change-log row the worker sees
 * ("Moved by Mark, 10:12"). Pushes are batched server-side: one per worker
 * once their changes have been quiet for a minute, or now via `publish`.
 */
import { useEffect, useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { getActingEmployerId } from '@/lib/actingEmployer';
import { realtimeChannelName } from '@/lib/realtimeChannel';
import { QUERY_KEYS } from '@/lib/queryConfig';
import type { JobStage } from '@/lib/jobStages';
import { setWorkingDayHours } from '@/components/employer/diary/dispatchModel';

export interface DispatchPerson {
  id: string;
  name: string;
  initials: string | null;
  role: string | null;
  team_role: string | null;
  photo_url: string | null;
  /** Has accepted the invite, so will get pushes and see My week. */
  linked: boolean;
}

export interface DispatchJob {
  id: string;
  title: string;
  client: string | null;
  location: string | null;
  start_date: string | null;
  end_date: string | null;
  stage: JobStage | null;
  status: string;
  progress: number | null;
}

export interface DispatchChangeStamp {
  kind: 'assigned' | 'moved' | 'removed';
  by: string | null;
  at: string;
  sent: boolean;
}

export interface DispatchAssignment {
  id: string;
  job_id: string;
  employee_id: string;
  start_date: string;
  end_date: string;
  /** 'HH:MM' or null. */
  start_time: string | null;
  hours_per_day: number | null;
  role_on_job: string | null;
  notes: string | null;
  last_change: DispatchChangeStamp | null;
}

export interface DispatchLeave {
  id: string;
  employee_id: string;
  type: string | null;
  start_date: string;
  end_date: string;
  half_day: string | null;
}

export interface DispatchBoard {
  people: DispatchPerson[];
  jobs: DispatchJob[];
  assignments: DispatchAssignment[];
  leave: DispatchLeave[];
  unsent: { changes: number; people: number };
  /** The firm's working day (Timesheet rules), 8 when unset. */
  working_day_hours?: number;
}

const EMPTY: DispatchBoard = {
  people: [],
  jobs: [],
  assignments: [],
  leave: [],
  unsent: { changes: 0, people: 0 },
};

export const DISPATCH_KEY = ['dispatch-board'] as const;

/** The firm the signed-in person acts for (owner, or the firm they manage). */
export function useActingFirm() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['acting-employer-id', user?.id],
    enabled: !!user,
    staleTime: 5 * 60 * 1000,
    queryFn: async () => (await getActingEmployerId(user!.id)) ?? user!.id,
  });
}

// Casts: these RPCs postdate the last types.ts regeneration.
type Rpc = (fn: string, args?: Record<string, unknown>) => ReturnType<typeof supabase.rpc>;
const rpc = supabase.rpc.bind(supabase) as unknown as Rpc;

export function useDispatchBoard(from: string, to: string) {
  const queryClient = useQueryClient();
  const { data: firm } = useActingFirm();

  // Anyone else moving people (another manager, the Assign sheet, the
  // timeline) shows up without a refresh.
  useEffect(() => {
    if (!firm) return;
    const invalidate = () => queryClient.invalidateQueries({ queryKey: DISPATCH_KEY });
    const channel = supabase
      .channel(realtimeChannelName('dispatch-board'))
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'employer_job_assignments' },
        invalidate
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'employer_jobs', filter: `user_id=eq.${firm}` },
        invalidate
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'employer_leave_requests' },
        invalidate
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [firm, queryClient]);

  const query = useQuery({
    queryKey: [...DISPATCH_KEY, firm, from, to],
    enabled: !!firm,
    staleTime: 15_000,
    queryFn: async (): Promise<DispatchBoard> => {
      const { data, error } = await rpc('get_dispatch_board', {
        p_firm: firm,
        p_from: from,
        p_to: to,
      });
      if (error) throw error;
      const board = { ...EMPTY, ...((data as unknown as DispatchBoard) ?? {}) };
      setWorkingDayHours(board.working_day_hours);
      return board;
    },
  });

  return { ...query, firm, data: query.data ?? EMPTY };
}

function useInvalidateEverywhere() {
  const queryClient = useQueryClient();
  return () => {
    queryClient.invalidateQueries({ queryKey: DISPATCH_KEY });
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.JOBS });
    queryClient.invalidateQueries({ queryKey: ['all-job-assignments'] });
    queryClient.invalidateQueries({ queryKey: ['job-assignments'] });
    queryClient.invalidateQueries({ queryKey: ['employee-assignments'] });
  };
}

export interface AssignInput {
  jobId: string;
  employeeId: string;
  start: string;
  end?: string | null;
  startTime?: string | null;
  hours?: number | null;
  notes?: string | null;
  /** Also email them (the existing send-job-notification email). */
  email?: boolean;
  jobTitle?: string;
  jobLocation?: string | null;
}

export function useDispatchAssign() {
  const done = useInvalidateEverywhere();
  return useMutation({
    mutationFn: async (input: AssignInput) => {
      const { data, error } = await rpc('dispatch_assign', {
        p_job: input.jobId,
        p_employee: input.employeeId,
        p_start: input.start,
        p_end: input.end ?? input.start,
        p_start_time: input.startTime || null,
        p_hours: input.hours ?? null,
        p_notes: input.notes || null,
      });
      if (error) throw error;
      // The in-app bell + push come from the notify_assignment trigger. The
      // email is the same one the Assign sheet sends; best effort.
      if (input.email) {
        supabase.functions
          .invoke('send-job-notification', {
            body: {
              employee_id: input.employeeId,
              job_id: input.jobId,
              job_title: input.jobTitle,
              job_location: input.jobLocation,
              start_date: input.start,
              end_date: input.end ?? input.start,
              notes: input.notes,
            },
          })
          .catch(() => undefined);
      }
      return data as unknown as string;
    },
    onSuccess: done,
  });
}

export interface MoveInput {
  assignmentId: string;
  employeeId?: string | null;
  start: string;
  end: string;
  startTime?: string | null;
  hours?: number | null;
}

export function useDispatchMove() {
  const queryClient = useQueryClient();
  const done = useInvalidateEverywhere();
  return useMutation({
    mutationFn: async (input: MoveInput) => {
      const { error } = await rpc('dispatch_move', {
        p_assignment: input.assignmentId,
        p_employee: input.employeeId ?? null,
        p_start: input.start,
        p_end: input.end,
        p_start_time: input.startTime || null,
        p_hours: input.hours ?? null,
      });
      if (error) throw error;
    },
    // Drag must feel instant: move the block now, reconcile on settle.
    onMutate: async (input) => {
      await queryClient.cancelQueries({ queryKey: DISPATCH_KEY });
      const snapshots = queryClient.getQueriesData<DispatchBoard>({ queryKey: DISPATCH_KEY });
      snapshots.forEach(([key, board]) => {
        if (!board) return;
        queryClient.setQueryData<DispatchBoard>(key, {
          ...board,
          assignments: board.assignments.map((a) =>
            a.id === input.assignmentId
              ? {
                  ...a,
                  employee_id: input.employeeId ?? a.employee_id,
                  start_date: input.start,
                  end_date: input.end,
                  start_time: input.startTime ?? null,
                  hours_per_day: input.hours ?? null,
                }
              : a
          ),
        });
      });
      return { snapshots };
    },
    onError: (_e, _v, ctx) => {
      ctx?.snapshots.forEach(([key, board]) => queryClient.setQueryData(key, board));
    },
    onSettled: done,
  });
}

export function useDispatchUnassign() {
  const done = useInvalidateEverywhere();
  return useMutation({
    mutationFn: async (assignmentId: string) => {
      const { error } = await rpc('dispatch_unassign', { p_assignment: assignmentId });
      if (error) throw error;
    },
    onSuccess: done,
  });
}

/** Timeline drag / resize and "move the whole job" — everyone on it moves too. */
export function useRescheduleJob() {
  const done = useInvalidateEverywhere();
  return useMutation({
    mutationFn: async ({ jobId, start, end }: { jobId: string; start: string; end: string }) => {
      const { error } = await rpc('reschedule_job', { p_job: jobId, p_start: start, p_end: end });
      if (error) throw error;
    },
    onSettled: done,
  });
}

export interface CopyWeekRow {
  assignment_id: string;
  job_id: string;
  job_title: string;
  employee_id: string;
  name: string;
  new_end: string;
}

export function useCopyWeek() {
  const done = useInvalidateEverywhere();
  const { data: firm } = useActingFirm();
  return useMutation({
    mutationFn: async ({ weekStart, apply }: { weekStart: string; apply: boolean }) => {
      const { data, error } = await rpc('copy_dispatch_week', {
        p_firm: firm,
        p_week_start: weekStart,
        p_apply: apply,
      });
      if (error) throw error;
      return (data as unknown as CopyWeekRow[]) ?? [];
    },
    onSuccess: (_d, v) => {
      if (v.apply) done();
    },
  });
}

/** Send every waiting change now: one push per affected worker. */
export function usePublishDispatch() {
  const queryClient = useQueryClient();
  const { data: firm } = useActingFirm();
  return useMutation({
    mutationFn: async () => {
      const { data, error } = await rpc('publish_dispatch_changes', { p_firm: firm });
      if (error) throw error;
      return (data as unknown as number) ?? 0;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: DISPATCH_KEY }),
  });
}

/** A friendly message from a dispatch RPC error. */
export function dispatchErrorMessage(error: unknown): string {
  const msg = (error as { message?: string } | null)?.message ?? '';
  if (/already on this job/i.test(msg)) return msg;
  if (/end date is before/i.test(msg)) return 'The end date is before the start date.';
  if (/not on your team/i.test(msg)) return 'That person is not on your team any more.';
  if (/cancelled/i.test(msg)) return 'This job is cancelled.';
  return 'Could not save that. Check your signal and try again.';
}

/** Memoised lookups the views share. */
export function useDispatchIndex(board: DispatchBoard) {
  return useMemo(() => {
    const jobsById = new Map(board.jobs.map((j) => [j.id, j]));
    const peopleById = new Map(board.people.map((p) => [p.id, p]));
    const assignedJobIds = new Set(board.assignments.map((a) => a.job_id));
    return { jobsById, peopleById, assignedJobIds };
  }, [board]);
}
