import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useRealtimeInvalidate } from '@/hooks/useRealtimeInvalidate';
import { getActingEmployerId } from '@/lib/actingEmployer';

/**
 * Employer-side leave management over employer_leave_requests — the SAME
 * table workers submit to from Worker Tools (RLS: employer sees their
 * team's rows; workers see their own). Replaces the mock-context tab data.
 */

export interface TeamLeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  type: string;
  startDate: string;
  endDate: string;
  halfDay?: 'am' | 'pm';
  totalDays: number;
  status: string; // lowercased for display logic
  reason?: string;
  /** Set when declined — the worker sees it. */
  rejectedReason?: string;
  decidedBy?: string;
  decidedAt?: string;
  createdAt?: string;
}

export interface TeamAllowance {
  id: string;
  employeeId: string;
  totalDays: number;
  carriedOver: number;
  usedDays: number;
  pendingDays: number;
  /** Days a week they work — drives the pro-rata statutory figure. */
  daysPerWeek: number | null;
}

/** UK statutory minimum: 5.6 weeks, capped at 28 days. Rounded UP to a whole
 *  day (the allowance column is whole days) so it is never below the law. */
export const statutoryHolidayDays = (daysPerWeek: number): number =>
  Math.min(28, Math.ceil(5.6 * Math.max(0, Math.min(daysPerWeek, 7)) - 1e-9));

const LEAVE_KEY = ['team-leave-requests'];
const ALLOWANCE_KEY = ['team-holiday-allowances'];

// employee_holiday_allowances counters are maintained by the DB trigger
// trg_maintain_holiday_allowance on employer_leave_requests — the client
// only invalidates the allowance query after writes.

export const useTeamLeaveRequests = () => {
  // Live: a worker submitting or cancelling a leave request (any change to the
  // team's rows) refreshes the employer list instantly — no manual reload.
  useRealtimeInvalidate(
    'team-leave',
    [{ table: 'employer_leave_requests' }],
    [LEAVE_KEY, ['team-holiday-allowances']]
  );

  return useQuery({
    queryKey: LEAVE_KEY,
    queryFn: async (): Promise<TeamLeaveRequest[]> => {
      const { data, error } = await supabase
        .from('employer_leave_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching team leave:', error);
        return [];
      }

      return (data || []).map((item) => ({
        id: item.id,
        employeeId: item.employee_id,
        employeeName: item.employee_name || '',
        type: item.type,
        startDate: item.start_date,
        endDate: item.end_date,
        halfDay: (item.half_day as 'am' | 'pm') || undefined,
        totalDays: item.total_days || 0,
        status: (item.status || '').toLowerCase(),
        reason: item.reason || undefined,
        rejectedReason: item.rejected_reason || undefined,
        decidedBy: item.approved_by || undefined,
        decidedAt: item.approved_date || undefined,
        createdAt: item.created_at || undefined,
      }));
    },
    staleTime: 60 * 1000,
  });
};

export interface TeamAssignment {
  id: string;
  jobId: string;
  employeeId: string;
  startDate: string;
  endDate: string | null;
  status: string;
  jobTitle: string;
}

/**
 * Every job assignment for the roster — used to warn when leave being
 * approved clashes with dates a worker is booked on a job. RLS scopes rows
 * to the employer's own team; callers also filter to their roster ids as
 * belt and braces. Status is lowercased here ('assigned'/'confirmed'/'declined').
 */
export const useTeamAssignments = () => {
  return useQuery({
    queryKey: ['team-job-assignments'],
    queryFn: async (): Promise<TeamAssignment[]> => {
      const { data, error } = await supabase
        .from('employer_job_assignments')
        .select('id, job_id, employee_id, start_date, end_date, status, job:employer_jobs(title)')
        .order('start_date', { ascending: true });

      if (error) {
        console.error('Error fetching team assignments:', error);
        return [];
      }

      return (data || []).map((item) => ({
        id: item.id,
        jobId: item.job_id,
        employeeId: item.employee_id,
        startDate: item.start_date,
        endDate: item.end_date,
        status: (item.status || '').toLowerCase(),
        jobTitle: (item.job as unknown as { title?: string } | null)?.title || 'Unknown job',
      }));
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useTeamAllowances = () => {
  return useQuery({
    queryKey: ['team-holiday-allowances'],
    queryFn: async (): Promise<TeamAllowance[]> => {
      const { data, error } = await supabase
        .from('employee_holiday_allowances')
        .select('*')
        .eq('year', new Date().getFullYear());

      if (error) {
        console.error('Error fetching allowances:', error);
        return [];
      }

      return (data || []).map((item) => ({
        id: item.id,
        employeeId: item.employee_id,
        // ELE-1953: the real figure, never an invented 28 — a row only exists
        // once the office has set it.
        totalDays: Number(item.total_days ?? 0),
        carriedOver: Number(item.carried_over ?? 0),
        usedDays: Number(item.used_days ?? 0),
        pendingDays: Number(item.pending_days ?? 0),
        daysPerWeek:
          (item as { days_per_week?: number | string | null }).days_per_week != null
            ? Number((item as { days_per_week?: number | string | null }).days_per_week)
            : null,
      }));
    },
    staleTime: 5 * 60 * 1000,
  });
};

// ELE-2005: the office sets each person's holiday allowance for the year. Until
// it does, the worker is told to ask — no figure is invented. Used/pending are
// filled from leave already booked by the fill_holiday_allowance_counters
// trigger on insert, then kept by trg_maintain_holiday_allowance.
export const useSetTeamAllowance = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: {
      employeeId: string;
      totalDays: number;
      carriedOver: number;
      daysPerWeek?: number | null;
    }) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const employerId = await getActingEmployerId(user?.id ?? null);
      if (!employerId) throw new Error('Could not work out which firm this is for');
      const { error } = await supabase.from('employee_holiday_allowances').upsert(
        {
          user_id: employerId,
          employee_id: input.employeeId,
          year: new Date().getFullYear(),
          total_days: input.totalDays,
          carried_over: input.carriedOver,
          // days_per_week (ELE-1953) postdates the generated types
          ...(input.daysPerWeek !== undefined ? { days_per_week: input.daysPerWeek } : {}),
        } as never,
        { onConflict: 'employee_id,year' }
      );
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ALLOWANCE_KEY });
    },
  });
};

export const useAddTeamLeave = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: {
      employeeId: string;
      employeeName: string;
      type: string;
      startDate: string;
      endDate: string;
      halfDay?: 'am' | 'pm';
      totalDays: number;
      reason?: string;
      /** Office recording leave it has already agreed — skips its own queue. */
      approved?: boolean;
    }) => {
      let decider: string | null = null;
      if (input.approved) {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('full_name')
            .eq('id', user.id)
            .maybeSingle();
          decider = profile?.full_name || user.email || 'Office';
        }
      }
      const { error } = await supabase.from('employer_leave_requests').insert({
        employee_id: input.employeeId,
        employee_name: input.employeeName,
        type: input.type,
        start_date: input.startDate,
        end_date: input.endDate,
        half_day: input.halfDay || null,
        total_days: input.totalDays,
        status: input.approved ? 'Approved' : 'Pending',
        approved_by: input.approved ? decider : null,
        approved_date: input.approved ? new Date().toISOString() : null,
        reason: input.reason || null,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LEAVE_KEY });
      queryClient.invalidateQueries({ queryKey: ALLOWANCE_KEY });
    },
  });
};

export const useDecideLeave = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      decision,
      decidedBy,
      reason,
    }: {
      id: string;
      decision: 'approved' | 'rejected';
      decidedBy?: string;
      reason?: string;
    }) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      // Real identity on the audit trail — 'Manager' told nobody anything
      let decider = decidedBy;
      if (!decider && user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('full_name')
          .eq('id', user.id)
          .maybeSingle();
        decider = profile?.full_name || user.email || undefined;
      }

      const patch =
        decision === 'approved'
          ? {
              status: 'Approved',
              approved_by: decider || 'Manager',
              approved_date: new Date().toISOString(),
            }
          : {
              status: 'Rejected',
              // ELE-1953: a decline always carries the office's own words —
              // the screen insists on one, and this refuses to invent it.
              rejected_reason: (reason ?? '').trim(),
              approved_by: decider || 'Manager',
              approved_date: new Date().toISOString(),
            };
      if (decision === 'rejected' && !(reason ?? '').trim()) {
        throw new Error('Say why, so they know');
      }

      // Pending-only: a supervisor (decide_crew_request) or another manager
      // may have decided it a moment ago — never overwrite their decision.
      const { data, error } = await supabase
        .from('employer_leave_requests')
        .update(patch as never)
        .eq('id', id)
        .ilike('status', 'pending')
        .select('id');
      if (error) throw error;
      if (!data || data.length === 0) {
        throw new Error('Someone has already decided this request');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LEAVE_KEY });
      queryClient.invalidateQueries({ queryKey: ALLOWANCE_KEY });
      queryClient.invalidateQueries({ queryKey: ['my-leave-requests'] });
    },
  });
};
