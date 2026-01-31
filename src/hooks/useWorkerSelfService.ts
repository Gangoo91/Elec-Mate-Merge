/**
 * useWorkerSelfService
 *
 * Combined hook for worker self-service features in the Worker Tools section.
 * Aggregates employee data, timesheets, leave, and communications for the current user.
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useMyEmployeeRecord, useUpdateOwnLocation } from './useWorkerLocations';
import { useClockState } from './useClockState';
import { useCreateTimesheet, useEmployeeTimesheets, Timesheet } from './useTimesheets';
import { useUnreadCount, useMarkAsRead, useAcknowledgeMessage } from './useCommunications';
import { Communication, CommunicationRecipient, getUnreadCount } from '@/services/communicationService';
import { createLeaveRequest, calculateLeaveDays, getLeaveTypeName, getLeaveTypeColour } from '@/services/leaveService';
import { LeaveRequest, LeaveType, LeaveStatus } from '@/services/types';

// Get communications for the current employee
export const getMyCommunications = async (employeeId: string): Promise<(Communication & { recipient: CommunicationRecipient })[]> => {
  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from('employer_communication_recipients')
    .select(`
      *,
      communication:employer_communications (*)
    `)
    .eq('employee_id', employeeId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching my communications:', error);
    return [];
  }

  // Filter out expired communications and map to expected format
  return (data || [])
    .filter(item => {
      const comm = item.communication as Communication;
      return !comm.expires_at || comm.expires_at > now;
    })
    .map(item => ({
      ...(item.communication as Communication),
      recipient: {
        id: item.id,
        communication_id: item.communication_id,
        employee_id: item.employee_id,
        read_at: item.read_at,
        acknowledged_at: item.acknowledged_at,
        created_at: item.created_at,
      },
    }));
};

// Get leave requests for the current employee
export const getMyLeaveRequests = async (employeeId: string): Promise<LeaveRequest[]> => {
  const { data, error } = await supabase
    .from('employer_leave_requests')
    .select('*')
    .eq('employee_id', employeeId)
    .order('start_date', { ascending: false });

  if (error) {
    console.error('Error fetching my leave requests:', error);
    return [];
  }

  // Map database fields to LeaveRequest interface
  return (data || []).map(item => ({
    id: item.id,
    employeeId: item.employee_id,
    employeeName: item.employee_name || '',
    type: item.leave_type as LeaveType,
    startDate: item.start_date,
    endDate: item.end_date,
    halfDay: item.half_day as 'am' | 'pm' | undefined,
    totalDays: item.total_days || 0,
    status: item.status as LeaveStatus,
    reason: item.reason || undefined,
    approvedBy: item.approved_by || undefined,
    approvedDate: item.approved_at || undefined,
    rejectedReason: item.rejection_reason || undefined,
    createdAt: item.created_at,
  }));
};

// Submit a new leave request
export const submitLeaveRequest = async (
  employeeId: string,
  employeeName: string,
  request: {
    type: LeaveType;
    startDate: string;
    endDate: string;
    halfDay?: 'am' | 'pm';
    reason?: string;
  }
): Promise<LeaveRequest | null> => {
  const totalDays = calculateLeaveDays(request.startDate, request.endDate, request.halfDay);

  const { data, error } = await supabase
    .from('employer_leave_requests')
    .insert({
      employee_id: employeeId,
      employee_name: employeeName,
      leave_type: request.type,
      start_date: request.startDate,
      end_date: request.endDate,
      half_day: request.halfDay || null,
      total_days: totalDays,
      status: 'pending',
      reason: request.reason || null,
    })
    .select()
    .single();

  if (error) {
    console.error('Error submitting leave request:', error);
    throw error;
  }

  return data ? {
    id: data.id,
    employeeId: data.employee_id,
    employeeName: data.employee_name || '',
    type: data.leave_type as LeaveType,
    startDate: data.start_date,
    endDate: data.end_date,
    halfDay: data.half_day as 'am' | 'pm' | undefined,
    totalDays: data.total_days || 0,
    status: data.status as LeaveStatus,
    reason: data.reason || undefined,
    createdAt: data.created_at,
  } : null;
};

// Get today's hours for an employee
export const getTodaysHours = async (employeeId: string): Promise<number> => {
  const today = new Date().toISOString().split('T')[0];

  const { data, error } = await supabase
    .from('employer_timesheets')
    .select('total_hours')
    .eq('employee_id', employeeId)
    .eq('date', today);

  if (error) {
    console.error('Error fetching today hours:', error);
    return 0;
  }

  return (data || []).reduce((sum, ts) => sum + (ts.total_hours || 0), 0);
};

// Hook for my communications
export const useMyCommunications = (employeeId: string) => {
  return useQuery({
    queryKey: ['my-communications', employeeId],
    queryFn: () => getMyCommunications(employeeId),
    enabled: !!employeeId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// Hook for my leave requests
export const useMyLeaveRequests = (employeeId: string) => {
  return useQuery({
    queryKey: ['my-leave-requests', employeeId],
    queryFn: () => getMyLeaveRequests(employeeId),
    enabled: !!employeeId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook for submitting leave requests
export const useSubmitLeaveRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      employeeId,
      employeeName,
      request,
    }: {
      employeeId: string;
      employeeName: string;
      request: {
        type: LeaveType;
        startDate: string;
        endDate: string;
        halfDay?: 'am' | 'pm';
        reason?: string;
      };
    }) => submitLeaveRequest(employeeId, employeeName, request),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['my-leave-requests', variables.employeeId] });
    },
  });
};

// Hook for today's hours
export const useTodaysHours = (employeeId: string) => {
  return useQuery({
    queryKey: ['todays-hours', employeeId],
    queryFn: () => getTodaysHours(employeeId),
    enabled: !!employeeId,
    staleTime: 60 * 1000, // 1 minute
    refetchInterval: 60 * 1000, // Refetch every minute
  });
};

// Get leave allowance for the current year
export const getMyLeaveAllowance = async (employeeId: string): Promise<{
  totalDays: number;
  usedDays: number;
  pendingDays: number;
  remainingDays: number;
} | null> => {
  const currentYear = new Date().getFullYear();

  // Try to get from holiday_allowances table
  const { data: allowance } = await supabase
    .from('employer_holiday_allowances')
    .select('*')
    .eq('employee_id', employeeId)
    .eq('year', currentYear)
    .maybeSingle();

  if (allowance) {
    return {
      totalDays: allowance.total_days || 28,
      usedDays: allowance.used_days || 0,
      pendingDays: allowance.pending_days || 0,
      remainingDays: (allowance.total_days || 28) - (allowance.used_days || 0) - (allowance.pending_days || 0),
    };
  }

  // Calculate from leave requests if no allowance record
  const { data: requests } = await supabase
    .from('employer_leave_requests')
    .select('total_days, status')
    .eq('employee_id', employeeId)
    .eq('leave_type', 'annual')
    .gte('start_date', `${currentYear}-01-01`)
    .lte('end_date', `${currentYear}-12-31`);

  const usedDays = (requests || [])
    .filter(r => r.status === 'approved')
    .reduce((sum, r) => sum + (r.total_days || 0), 0);

  const pendingDays = (requests || [])
    .filter(r => r.status === 'pending')
    .reduce((sum, r) => sum + (r.total_days || 0), 0);

  return {
    totalDays: 28, // Default UK annual leave allowance
    usedDays,
    pendingDays,
    remainingDays: 28 - usedDays - pendingDays,
  };
};

export const useMyLeaveAllowance = (employeeId: string) => {
  return useQuery({
    queryKey: ['my-leave-allowance', employeeId],
    queryFn: () => getMyLeaveAllowance(employeeId),
    enabled: !!employeeId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Main hook that combines all worker self-service data
 */
export const useWorkerSelfService = () => {
  // Get the current employee record
  const employeeQuery = useMyEmployeeRecord();
  const employeeId = employeeQuery.data?.id;
  const employeeName = employeeQuery.data?.name || '';

  // Clock state
  const clockState = useClockState();

  // Location update
  const updateLocation = useUpdateOwnLocation();

  // Timesheets
  const timesheetsQuery = useEmployeeTimesheets(employeeId || '');

  // Today's hours
  const todaysHoursQuery = useTodaysHours(employeeId || '');

  // Leave requests
  const leaveRequestsQuery = useMyLeaveRequests(employeeId || '');
  const leaveAllowanceQuery = useMyLeaveAllowance(employeeId || '');
  const submitLeaveRequest = useSubmitLeaveRequest();

  // Communications
  const communicationsQuery = useMyCommunications(employeeId || '');
  const unreadCountQuery = useUnreadCount(employeeId || '');
  const markAsRead = useMarkAsRead();
  const acknowledgeMessage = useAcknowledgeMessage();

  // Active jobs count for display
  const activeJobsQuery = useQuery({
    queryKey: ['active-jobs-count', employeeId],
    queryFn: async () => {
      if (!employeeId) return 0;
      const { data, error } = await supabase
        .from('jobs')
        .select('id', { count: 'exact', head: true })
        .contains('assigned_workers', [employeeId])
        .in('status', ['scheduled', 'in_progress']);

      if (error) {
        console.error('Error fetching active jobs count:', error);
        return 0;
      }
      return data?.length || 0;
    },
    enabled: !!employeeId,
    staleTime: 2 * 60 * 1000,
  });

  return {
    // Employee record
    employee: employeeQuery.data,
    employeeId,
    employeeName,
    isLoadingEmployee: employeeQuery.isLoading,
    hasEmployeeRecord: !!employeeQuery.data,

    // Clock state
    ...clockState,

    // Location
    updateLocation,

    // Timesheets
    timesheets: timesheetsQuery.data || [],
    isLoadingTimesheets: timesheetsQuery.isLoading,
    todaysHours: todaysHoursQuery.data || 0,

    // Leave
    leaveRequests: leaveRequestsQuery.data || [],
    leaveAllowance: leaveAllowanceQuery.data,
    isLoadingLeave: leaveRequestsQuery.isLoading || leaveAllowanceQuery.isLoading,
    submitLeaveRequest,

    // Communications
    communications: communicationsQuery.data || [],
    unreadCount: unreadCountQuery.data || 0,
    isLoadingComms: communicationsQuery.isLoading,
    markAsRead,
    acknowledgeMessage,

    // Jobs
    activeJobsCount: activeJobsQuery.data || 0,

    // Helpers
    calculateLeaveDays,
    getLeaveTypeName,
    getLeaveTypeColour,
  };
};

export default useWorkerSelfService;

// ============================================================
// NEW HOOKS FOR WORKER TOOLS HUB
// ============================================================

/**
 * Job type for worker's assigned jobs
 */
export interface WorkerJob {
  id: string;
  title: string;
  client_name?: string;
  address?: string;
  status: string;
  scheduled_date?: string;
}

/**
 * Hook to fetch jobs assigned to the current worker
 */
export const useMyJobs = (filter: 'active' | 'completed' | 'all' = 'active') => {
  const employeeQuery = useMyEmployeeRecord();
  const employeeId = employeeQuery.data?.id;

  return useQuery<WorkerJob[]>({
    queryKey: ['my-jobs', employeeId, filter],
    queryFn: async () => {
      if (!employeeId) return [];

      let query = supabase
        .from('jobs')
        .select('id, title, client_name, address, status, scheduled_date')
        .contains('assigned_workers', [employeeId])
        .order('scheduled_date', { ascending: false });

      if (filter === 'active') {
        query = query.in('status', ['scheduled', 'in_progress']);
      } else if (filter === 'completed') {
        query = query.eq('status', 'completed');
      }

      const { data, error } = await query.limit(50);

      if (error) {
        console.error('Error fetching my jobs:', error);
        return [];
      }

      return data || [];
    },
    enabled: !!employeeId,
    staleTime: 2 * 60 * 1000,
  });
};

/**
 * Worker credentials type
 */
export interface WorkerCredentials {
  elecId?: {
    cardNumber?: string;
    verified: boolean;
  };
  certifications: {
    id: string;
    name: string;
    issuer?: string;
    certificate_number?: string;
    expiry_date?: string;
  }[];
}

/**
 * Hook to fetch worker's credentials (Elec-ID and certifications)
 */
export const useMyCredentials = () => {
  const employeeQuery = useMyEmployeeRecord();
  const employeeId = employeeQuery.data?.id;

  return useQuery<WorkerCredentials>({
    queryKey: ['my-credentials', employeeId],
    queryFn: async () => {
      if (!employeeId) {
        return { certifications: [] };
      }

      // Get certifications
      const { data: certs, error: certsError } = await supabase
        .from('employee_certifications')
        .select('id, name, issuer, certificate_number, expiry_date')
        .eq('employee_id', employeeId)
        .order('expiry_date', { ascending: true });

      if (certsError) {
        console.error('Error fetching certifications:', certsError);
      }

      // Get Elec-ID info
      const { data: elecId } = await supabase
        .from('elec_id_cards')
        .select('card_number, verified')
        .eq('user_id', employeeId)
        .maybeSingle();

      return {
        elecId: elecId ? {
          cardNumber: elecId.card_number,
          verified: elecId.verified || false,
        } : undefined,
        certifications: certs || [],
      };
    },
    enabled: !!employeeId,
    staleTime: 5 * 60 * 1000,
  });
};

/**
 * Progress note type
 */
export interface ProgressNote {
  id: string;
  job_id: string;
  content: string;
  created_at: string;
}

/**
 * Hook for progress notes on a specific job
 */
export const useProgressNotes = (jobId?: string) => {
  const employeeQuery = useMyEmployeeRecord();
  const employeeId = employeeQuery.data?.id;
  const queryClient = useQueryClient();

  const recentNotesQuery = useQuery<ProgressNote[]>({
    queryKey: ['progress-notes', jobId, employeeId],
    queryFn: async () => {
      if (!jobId || !employeeId) return [];

      const { data, error } = await supabase
        .from('job_progress_notes')
        .select('id, job_id, content, created_at')
        .eq('job_id', jobId)
        .eq('employee_id', employeeId)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) {
        console.error('Error fetching progress notes:', error);
        return [];
      }

      return data || [];
    },
    enabled: !!jobId && !!employeeId,
    staleTime: 60 * 1000,
  });

  const submitNoteMutation = useMutation({
    mutationFn: async ({ jobId: jId, content }: { jobId: string; content: string }) => {
      if (!employeeId) throw new Error('No employee ID');

      const { data, error } = await supabase
        .from('job_progress_notes')
        .insert({
          job_id: jId,
          employee_id: employeeId,
          content,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['progress-notes', variables.jobId] });
    },
  });

  return {
    recentNotes: recentNotesQuery.data,
    isLoading: recentNotesQuery.isLoading,
    submitNote: submitNoteMutation.mutateAsync,
    isSubmitting: submitNoteMutation.isPending,
  };
};

/**
 * Safety document type
 */
export interface SafetyDoc {
  id: string;
  title: string;
  type: string;
  description?: string;
  mandatory: boolean;
  acknowledged_at?: string;
}

/**
 * Hook for safety documents requiring acknowledgement
 */
export const useSafetyDocs = () => {
  const employeeQuery = useMyEmployeeRecord();
  const employeeId = employeeQuery.data?.id;
  const queryClient = useQueryClient();

  const docsQuery = useQuery<SafetyDoc[]>({
    queryKey: ['safety-docs', employeeId],
    queryFn: async () => {
      if (!employeeId) return [];

      const { data, error } = await supabase
        .from('safety_document_acknowledgements')
        .select(`
          id,
          acknowledged_at,
          document:safety_documents (
            id,
            title,
            type,
            description,
            mandatory
          )
        `)
        .eq('employee_id', employeeId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching safety docs:', error);
        return [];
      }

      return (data || []).map((item) => ({
        id: (item.document as any)?.id || item.id,
        title: (item.document as any)?.title || 'Unknown',
        type: (item.document as any)?.type || 'Document',
        description: (item.document as any)?.description,
        mandatory: (item.document as any)?.mandatory || false,
        acknowledged_at: item.acknowledged_at,
      }));
    },
    enabled: !!employeeId,
    staleTime: 2 * 60 * 1000,
  });

  const acknowledgeMutation = useMutation({
    mutationFn: async (docId: string) => {
      if (!employeeId) throw new Error('No employee ID');

      const { error } = await supabase
        .from('safety_document_acknowledgements')
        .update({ acknowledged_at: new Date().toISOString() })
        .eq('document_id', docId)
        .eq('employee_id', employeeId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['safety-docs', employeeId] });
    },
  });

  return {
    data: docsQuery.data,
    isLoading: docsQuery.isLoading,
    acknowledgeDoc: acknowledgeMutation.mutateAsync,
    isAcknowledging: acknowledgeMutation.isPending,
  };
};

/**
 * Expense claim type
 */
export interface ExpenseClaim {
  id: string;
  category: string;
  amount: number;
  description?: string;
  job_id?: string;
  status: string;
  created_at: string;
}

/**
 * Hook for expense claims
 */
export const useMyExpenses = () => {
  const employeeQuery = useMyEmployeeRecord();
  const employeeId = employeeQuery.data?.id;
  const queryClient = useQueryClient();

  const recentExpensesQuery = useQuery<ExpenseClaim[]>({
    queryKey: ['my-expenses', employeeId],
    queryFn: async () => {
      if (!employeeId) return [];

      const { data, error } = await supabase
        .from('employee_expenses')
        .select('id, category, amount, description, job_id, status, created_at')
        .eq('employee_id', employeeId)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) {
        console.error('Error fetching expenses:', error);
        return [];
      }

      return data || [];
    },
    enabled: !!employeeId,
    staleTime: 2 * 60 * 1000,
  });

  const submitExpenseMutation = useMutation({
    mutationFn: async ({
      category,
      amount,
      description,
      jobId,
    }: {
      category: string;
      amount: number;
      description?: string;
      jobId?: string;
    }) => {
      if (!employeeId) throw new Error('No employee ID');

      const { data, error } = await supabase
        .from('employee_expenses')
        .insert({
          employee_id: employeeId,
          category,
          amount,
          description: description || null,
          job_id: jobId || null,
          status: 'pending',
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-expenses', employeeId] });
    },
  });

  return {
    recentExpenses: recentExpensesQuery.data,
    isLoading: recentExpensesQuery.isLoading,
    submitExpense: submitExpenseMutation.mutateAsync,
    isSubmitting: submitExpenseMutation.isPending,
  };
};

/**
 * Snag report type
 */
export interface SnagReport {
  id: string;
  job_id: string;
  severity: string;
  description: string;
  location?: string;
  created_at: string;
}

/**
 * Hook for snag reports
 */
export const useSnagReports = (jobId?: string) => {
  const employeeQuery = useMyEmployeeRecord();
  const employeeId = employeeQuery.data?.id;
  const queryClient = useQueryClient();

  const recentSnagsQuery = useQuery<SnagReport[]>({
    queryKey: ['snag-reports', jobId, employeeId],
    queryFn: async () => {
      if (!employeeId) return [];

      let query = supabase
        .from('job_snag_reports')
        .select('id, job_id, severity, description, location, created_at')
        .eq('reported_by', employeeId)
        .order('created_at', { ascending: false })
        .limit(10);

      if (jobId) {
        query = query.eq('job_id', jobId);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching snag reports:', error);
        return [];
      }

      return data || [];
    },
    enabled: !!employeeId,
    staleTime: 2 * 60 * 1000,
  });

  const submitSnagMutation = useMutation({
    mutationFn: async ({
      jobId: jId,
      severity,
      description,
      location,
    }: {
      jobId: string;
      severity: string;
      description: string;
      location?: string;
    }) => {
      if (!employeeId) throw new Error('No employee ID');

      const { data, error } = await supabase
        .from('job_snag_reports')
        .insert({
          job_id: jId,
          reported_by: employeeId,
          severity,
          description,
          location: location || null,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['snag-reports', variables.jobId] });
      queryClient.invalidateQueries({ queryKey: ['snag-reports'] });
    },
  });

  return {
    recentSnags: recentSnagsQuery.data,
    isLoading: recentSnagsQuery.isLoading,
    submitSnag: submitSnagMutation.mutateAsync,
    isSubmitting: submitSnagMutation.isPending,
  };
};
