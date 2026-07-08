import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useRealtimeInvalidate } from '@/hooks/useRealtimeInvalidate';

export interface Timesheet {
  id: string;
  employee_id: string;
  job_id: string | null;
  date: string;
  clock_in: string | null;
  clock_out: string | null;
  break_minutes: number;
  total_hours: number | null;
  status: string;
  notes: string | null;
  approved_by: string | null;
  approved_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface TimesheetWithDetails extends Timesheet {
  employee_name?: string;
  job_title?: string;
}

export const getTimesheets = async (startDate?: string, endDate?: string): Promise<Timesheet[]> => {
  let query = supabase.from('employer_timesheets').select('*').order('date', { ascending: false });

  if (startDate) {
    query = query.gte('date', startDate);
  }
  if (endDate) {
    query = query.lte('date', endDate);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching timesheets:', error);
    throw error;
  }

  return data || [];
};

export const getTimesheetsByEmployee = async (employeeId: string): Promise<Timesheet[]> => {
  const { data, error } = await supabase
    .from('employer_timesheets')
    .select('*')
    .eq('employee_id', employeeId)
    .order('date', { ascending: false });

  if (error) {
    console.error('Error fetching employee timesheets:', error);
    throw error;
  }

  return data || [];
};

export const createTimesheet = async (
  timesheet: Omit<Timesheet, 'id' | 'created_at' | 'updated_at'>
): Promise<Timesheet> => {
  const { data, error } = await supabase
    .from('employer_timesheets')
    .insert(timesheet)
    .select()
    .single();

  if (error) {
    console.error('Error creating timesheet:', error);
    throw error;
  }

  return data;
};

export const updateTimesheet = async (
  id: string,
  updates: Partial<Timesheet>
): Promise<Timesheet> => {
  const { data, error } = await supabase
    .from('employer_timesheets')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating timesheet:', error);
    throw error;
  }

  return data;
};

/** Resolves the signed-in admin for the approval audit trail. Session is read
 *  locally (no network); the display name comes from profiles — the source of
 *  truth for names (auth metadata goes stale when a user renames themselves). */
const getApprover = async (): Promise<{ id: string | null; name: string }> => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user = session?.user;
  if (!user) return { id: null, name: 'Admin' };
  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name')
    .eq('id', user.id)
    .maybeSingle();
  const name =
    profile?.full_name ||
    (user.user_metadata?.full_name as string | undefined) ||
    user.email ||
    'Admin';
  return { id: user.id, name };
};

const approvalPayload = (approver: { id: string | null; name: string }) => ({
  status: 'Approved',
  approved_by: approver.name,
  approved_by_id: approver.id,
  approved_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
});

export const approveTimesheet = async (id: string): Promise<void> => {
  const approver = await getApprover();
  // .select() so an RLS denial (0 rows updated, no error) surfaces as a failure
  // instead of a silent no-op behind a success toast. Status-guarded so an
  // already-decided row can't be re-stamped (protects the audit trail).
  const { data, error } = await supabase
    .from('employer_timesheets')
    .update(approvalPayload(approver))
    .eq('id', id)
    .eq('status', 'Pending')
    .select('id');

  if (error) {
    console.error('Error approving timesheet:', error);
    throw error;
  }
  if (!data || data.length === 0) {
    throw new Error('Timesheet was not approved — it may already be decided, or you lack permission');
  }
};

const rejectionPayload = () => ({
  status: 'Rejected',
  // A rejected row must not carry a live approval stamp
  approved_by: null,
  approved_by_id: null,
  approved_at: null,
  updated_at: new Date().toISOString(),
});

export const rejectTimesheet = async (id: string): Promise<void> => {
  const { data, error } = await supabase
    .from('employer_timesheets')
    .update(rejectionPayload())
    .eq('id', id)
    .eq('status', 'Pending')
    .select('id');

  if (error) {
    console.error('Error rejecting timesheet:', error);
    throw error;
  }
  if (!data || data.length === 0) {
    throw new Error('Timesheet was not rejected — it may already be decided, or you lack permission');
  }
};

export const deleteTimesheet = async (id: string): Promise<void> => {
  const { data, error } = await supabase
    .from('employer_timesheets')
    .delete()
    .eq('id', id)
    .select('id');

  if (error) {
    console.error('Error deleting timesheet:', error);
    throw error;
  }
  if (!data || data.length === 0) {
    throw new Error('Timesheet was not deleted — it may have been removed or you lack permission');
  }
};

// React Query hooks
export const useTimesheets = (startDate?: string, endDate?: string) => {
  // Live: a worker clocking in/out or submitting a timesheet (any change to the
  // team's rows) refreshes the employer list instantly — no manual reload. RLS
  // scopes both the refetch and the realtime events to the user's company.
  useRealtimeInvalidate('timesheets', [{ table: 'employer_timesheets' }], [['timesheets']]);

  return useQuery({
    queryKey: ['timesheets', startDate, endDate],
    queryFn: () => getTimesheets(startDate, endDate),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useEmployeeTimesheets = (employeeId: string) => {
  return useQuery({
    queryKey: ['timesheets', 'employee', employeeId],
    queryFn: () => getTimesheetsByEmployee(employeeId),
    enabled: !!employeeId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useCreateTimesheet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (timesheet: Omit<Timesheet, 'id' | 'created_at' | 'updated_at'>) =>
      createTimesheet(timesheet),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['timesheets'] });
    },
  });
};

export const useUpdateTimesheet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Timesheet> }) =>
      updateTimesheet(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['timesheets'] });
    },
  });
};

export const useApproveTimesheet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string }) => approveTimesheet(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['timesheets'] });
    },
  });
};

export const useRejectTimesheet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => rejectTimesheet(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['timesheets'] });
    },
  });
};

export const useBatchApproveTimesheets = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ ids }: { ids: string[] }) => {
      // One approver lookup + ONE update for the whole batch — not N round-trips.
      // Pending-only: already-decided rows are skipped, never re-stamped.
      const approver = await getApprover();
      const { data, error } = await supabase
        .from('employer_timesheets')
        .update(approvalPayload(approver))
        .in('id', ids)
        .eq('status', 'Pending')
        .select('id');

      if (error) throw error;
      const updated = data?.length ?? 0;
      if (updated < ids.length) {
        throw new Error(
          `${ids.length - updated} of ${ids.length} were already decided or could not be approved`
        );
      }
      return updated;
    },
    onSettled: () => {
      // Settled, not success — partial batches still need the list refreshed
      queryClient.invalidateQueries({ queryKey: ['timesheets'] });
    },
  });
};

export const useBatchRejectTimesheets = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (ids: string[]) => {
      const { data, error } = await supabase
        .from('employer_timesheets')
        .update(rejectionPayload())
        .in('id', ids)
        .eq('status', 'Pending')
        .select('id');

      if (error) throw error;
      const updated = data?.length ?? 0;
      if (updated < ids.length) {
        throw new Error(
          `${ids.length - updated} of ${ids.length} were already decided or could not be rejected`
        );
      }
      return updated;
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['timesheets'] });
    },
  });
};

export const useDeleteTimesheet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTimesheet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['timesheets'] });
    },
  });
};
