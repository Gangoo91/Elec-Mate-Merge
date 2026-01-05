import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

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
  let query = supabase
    .from('timesheets')
    .select('*')
    .order('date', { ascending: false });

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
    .from('timesheets')
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
    .from('timesheets')
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
): Promise<Timesheet | null> => {
  const { data, error } = await supabase
    .from('timesheets')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating timesheet:', error);
    return null;
  }

  return data;
};

export const approveTimesheet = async (id: string, approvedBy: string): Promise<boolean> => {
  const { error } = await supabase
    .from('timesheets')
    .update({
      status: 'Approved',
      approved_by: approvedBy,
      approved_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq('id', id);

  if (error) {
    console.error('Error approving timesheet:', error);
    return false;
  }

  return true;
};

export const rejectTimesheet = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('timesheets')
    .update({
      status: 'Rejected',
      updated_at: new Date().toISOString(),
    })
    .eq('id', id);

  if (error) {
    console.error('Error rejecting timesheet:', error);
    return false;
  }

  return true;
};

export const deleteTimesheet = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('timesheets')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting timesheet:', error);
    return false;
  }

  return true;
};

// React Query hooks
export const useTimesheets = (startDate?: string, endDate?: string) => {
  return useQuery({
    queryKey: ['timesheets', startDate, endDate],
    queryFn: () => getTimesheets(startDate, endDate),
  });
};

export const useEmployeeTimesheets = (employeeId: string) => {
  return useQuery({
    queryKey: ['timesheets', 'employee', employeeId],
    queryFn: () => getTimesheetsByEmployee(employeeId),
    enabled: !!employeeId,
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
    mutationFn: ({ id, approvedBy }: { id: string; approvedBy: string }) =>
      approveTimesheet(id, approvedBy),
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
    mutationFn: async ({ ids, approvedBy }: { ids: string[]; approvedBy: string }) => {
      const results = await Promise.all(ids.map(id => approveTimesheet(id, approvedBy)));
      return results.every(r => r);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['timesheets'] });
    },
  });
};

export const useBatchRejectTimesheets = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (ids: string[]) => {
      const results = await Promise.all(ids.map(id => rejectTimesheet(id)));
      return results.every(r => r);
    },
    onSuccess: () => {
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
