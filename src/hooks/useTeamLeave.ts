import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useRealtimeInvalidate } from '@/hooks/useRealtimeInvalidate';

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
}

export interface TeamAllowance {
  id: string;
  employeeId: string;
  totalDays: number;
  carriedOver: number;
  usedDays: number;
  pendingDays: number;
}

const LEAVE_KEY = ['team-leave-requests'];

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
      }));
    },
    staleTime: 60 * 1000,
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
        totalDays: item.total_days || 28,
        carriedOver: item.carried_over || 0,
        usedDays: item.used_days || 0,
        pendingDays: item.pending_days || 0,
      }));
    },
    staleTime: 5 * 60 * 1000,
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
    }) => {
      const { error } = await supabase.from('employer_leave_requests').insert({
        employee_id: input.employeeId,
        employee_name: input.employeeName,
        type: input.type,
        start_date: input.startDate,
        end_date: input.endDate,
        half_day: input.halfDay || null,
        total_days: input.totalDays,
        status: 'Pending',
        reason: input.reason || null,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LEAVE_KEY });
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

      const patch =
        decision === 'approved'
          ? {
              status: 'Approved',
              approved_by: decidedBy || 'Manager',
              approved_date: new Date().toISOString(),
            }
          : {
              status: 'Rejected',
              rejected_reason: reason || 'Declined',
              approved_by: decidedBy || 'Manager',
              approved_date: new Date().toISOString(),
            };

      const { error } = await supabase
        .from('employer_leave_requests')
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .update(patch as any)
        .eq('id', id);
      if (error) throw error;
      void user;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LEAVE_KEY });
      queryClient.invalidateQueries({ queryKey: ['my-leave-requests'] });
    },
  });
};
