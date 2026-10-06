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
import {
  Communication,
  CommunicationRecipient,
  getUnreadCount,
} from '@/services/communicationService';
import {
  createLeaveRequest,
  calculateLeaveDays,
  getLeaveTypeName,
  getLeaveTypeColour,
} from '@/services/leaveService';
import { LeaveRequest, LeaveType, LeaveStatus } from '@/services/types';

// Get communications for the current employee
export const getMyCommunications = async (
  employeeId: string
): Promise<(Communication & { recipient: CommunicationRecipient })[]> => {
  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from('employer_communication_recipients')
    .select(
      `
      *,
      communication:employer_communications (*)
    `
    )
    .eq('employee_id', employeeId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching my communications:', error);
    return [];
  }

  // Filter out expired communications and map to expected format.
  // item.communication can be null when the parent row isn't visible to this
  // worker (e.g. manager-audience messages under RLS) — drop those rows
  // instead of crashing and blanking the whole list.
  return (data || [])
    .filter((item) => {
      const comm = item.communication as Communication | null;
      if (!comm) return false;
      return !comm.expires_at || comm.expires_at > now;
    })
    .map((item) => ({
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
  return (data || []).map((item) => ({
    id: item.id,
    employeeId: item.employee_id,
    employeeName: item.employee_name || '',
    type: item.type as LeaveType,
    startDate: item.start_date,
    endDate: item.end_date,
    halfDay: item.half_day as 'am' | 'pm' | undefined,
    totalDays: item.total_days || 0,
    status: item.status as LeaveStatus,
    reason: item.reason || undefined,
    approvedBy: item.approved_by || undefined,
    // Column is approved_date (approved_at does not exist on employer_leave_requests)
    approvedDate: item.approved_date || undefined,
    rejectedReason: item.rejected_reason || undefined,
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
      type: request.type,
      start_date: request.startDate,
      end_date: request.endDate,
      half_day: request.halfDay || null,
      total_days: totalDays,
      status: 'Pending',
      reason: request.reason || null,
    })
    .select()
    .single();

  if (error) {
    console.error('Error submitting leave request:', error);
    throw error;
  }

  return data
    ? {
        id: data.id,
        employeeId: data.employee_id,
        employeeName: data.employee_name || '',
        type: data.type as LeaveType,
        startDate: data.start_date,
        endDate: data.end_date,
        halfDay: data.half_day as 'am' | 'pm' | undefined,
        totalDays: data.total_days || 0,
        status: data.status as LeaveStatus,
        reason: data.reason || undefined,
        createdAt: data.created_at,
      }
    : null;
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
      queryClient.invalidateQueries({ queryKey: ['my-leave-allowance', variables.employeeId] });
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

// Get leave allowance for the current year.
// ELE-2005: the allowance is whatever the OFFICE set (employee_holiday_allowances).
// When there's no row, isSet is false and totalDays/remainingDays are null —
// the UI says "Ask the office for your allowance". Never invent a figure.
// Used/pending always come from the leave requests themselves, so they're
// right even if the allowance was set after leave was booked.
export interface MyLeaveAllowance {
  isSet: boolean;
  totalDays: number | null;
  carriedOver: number;
  usedDays: number;
  pendingDays: number;
  remainingDays: number | null;
}

export const getMyLeaveAllowance = async (employeeId: string): Promise<MyLeaveAllowance> => {
  const currentYear = new Date().getFullYear();

  const [allowanceRes, requestsRes] = await Promise.all([
    supabase
      .from('employee_holiday_allowances')
      .select('total_days, carried_over')
      .eq('employee_id', employeeId)
      .eq('year', currentYear)
      .maybeSingle(),
    supabase
      .from('employer_leave_requests')
      .select('total_days, status')
      .eq('employee_id', employeeId)
      .eq('type', 'annual')
      .gte('start_date', `${currentYear}-01-01`)
      .lte('start_date', `${currentYear}-12-31`),
  ]);

  if (allowanceRes.error) throw allowanceRes.error;
  if (requestsRes.error) throw requestsRes.error;

  const requests = requestsRes.data || [];
  const sumFor = (status: string) =>
    requests
      .filter((r) => r.status?.toLowerCase() === status)
      .reduce((sum, r) => sum + Number(r.total_days || 0), 0);
  const usedDays = sumFor('approved');
  const pendingDays = sumFor('pending');

  const allowance = allowanceRes.data;
  if (!allowance || allowance.total_days == null) {
    return {
      isSet: false,
      totalDays: null,
      carriedOver: 0,
      usedDays,
      pendingDays,
      remainingDays: null,
    };
  }

  const carriedOver = Number(allowance.carried_over || 0);
  const totalDays = Number(allowance.total_days) + carriedOver;
  return {
    isSet: true,
    totalDays,
    carriedOver,
    usedDays,
    pendingDays,
    remainingDays: totalDays - usedDays - pendingDays,
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
      const { count, error } = await supabase
        .from('employer_job_assignments')
        .select('id, job:employer_jobs!inner(status)', { count: 'exact', head: true })
        .eq('employee_id', employeeId)
        .not('job.status', 'in', '("Completed","Cancelled")');

      if (error) {
        console.error('Error fetching active jobs count:', error);
        return 0;
      }
      return count || 0;
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
  /** Job end date (employer_jobs.end_date). */
  end_date?: string | null;
  description?: string | null;
  /** From this worker's assignment row. */
  assignment_id?: string;
  role_on_job?: string | null;
  /** Instructions the office wrote when assigning. */
  assignment_notes?: string | null;
  assignment_start?: string | null;
  assignment_end?: string | null;
  assigned_at?: string | null;
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

      const { data, error } = await supabase
        .from('employer_job_assignments')
        .select(
          'id, role_on_job, notes, start_date, end_date, assigned_at, job:employer_jobs!inner(id, title, client, location, status, start_date, end_date, description)'
        )
        .eq('employee_id', employeeId)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) {
        console.error('Error fetching my jobs:', error);
        return [];
      }

      const jobs: WorkerJob[] = (data || [])
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .filter((row: any) => !!row.job)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .map((row: any) => ({
          id: row.job.id,
          title: row.job.title,
          client_name: row.job.client,
          address: row.job.location,
          status: row.job.status,
          // The worker's own dates win over the job's — "when do I go" not
          // "when does the job run".
          scheduled_date: row.start_date || row.job.start_date,
          end_date: row.end_date || row.job.end_date || null,
          description: row.job.description ?? null,
          assignment_id: row.id,
          role_on_job: row.role_on_job ?? null,
          assignment_notes: row.notes ?? null,
          assignment_start: row.start_date ?? null,
          assignment_end: row.end_date ?? null,
          assigned_at: row.assigned_at ?? null,
        }));

      if (filter === 'active') {
        return jobs.filter((j) => !['Completed', 'Cancelled'].includes(j.status));
      }
      if (filter === 'completed') {
        return jobs.filter((j) => j.status === 'Completed');
      }
      return jobs;
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

      // ELE-1950: the worker's own Elec-ID qualifications are THE credentials
      // store (employer_certifications is LEGACY). Mapped to the old shape.
      const { data: mine, error: certsError } = await supabase.rpc(
        'get_my_credentials' as never
      );
      const certs = (
        ((mine as unknown as { qualifications?: Record<string, string | null>[] } | null)
          ?.qualifications ?? []) as Record<string, string | null>[]
      ).map((q) => ({
        id: q.id as string,
        name: q.qualification_name as string,
        issuing_body: q.awarding_body,
        certificate_number: q.certificate_number,
        expiry_date: q.expiry_date,
      }));

      if (certsError) {
        console.error('Error fetching certifications:', certsError);
      }

      // Elec-ID: any profile on the user's own rows (roster or self-created stub)
      const {
        data: { user },
      } = await supabase.auth.getUser();
      let elecId: { cardNumber?: string; verified: boolean } | undefined;
      if (user) {
        const { data: profile } = await supabase
          .from('employer_elec_id_profiles')
          .select(
            'ecs_card_number, elec_id_number, is_verified, employee:employer_employees!inner(user_id)'
          )
          .eq('employee.user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();
        if (profile) {
          elecId = {
            cardNumber: profile.ecs_card_number || profile.elec_id_number || undefined,
            verified: profile.is_verified || false,
          };
        }
      }

      return {
        elecId,
        certifications: (certs || []).map((c) => ({
          id: c.id,
          name: c.name,
          issuer: c.issuing_body || undefined,
          certificate_number: c.certificate_number || undefined,
          expiry_date: c.expiry_date || undefined,
        })),
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
        .from('employer_job_comments')
        .select('id, job_id, content, created_at')
        .eq('job_id', jobId)
        .eq('comment_type', 'progress')
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

  const employeeName = employeeQuery.data?.name || '';

  const submitNoteMutation = useMutation({
    mutationFn: async ({ jobId: jId, content }: { jobId: string; content: string }) => {
      if (!employeeId) throw new Error('No employee ID');

      // Lands in the employer's job comments feed (worker RLS requires the
      // author_name to match the worker's own roster name)
      const { data, error } = await supabase
        .from('employer_job_comments')
        .insert({
          job_id: jId,
          author_name: employeeName,
          comment_type: 'progress',
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
  rejection_reason?: string | null;
  receipt_url?: string | null;
  approved_by?: string | null;
  approved_date?: string | null;
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
        .from('employer_expense_claims')
        .select(
          'id, category, amount, description, job_id, status, created_at, rejection_reason, receipt_url, approved_by, approved_date'
        )
        .eq('employee_id', employeeId)
        .order('created_at', { ascending: false })
        .limit(25);

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
      receiptFile,
    }: {
      category: string;
      amount: number;
      description?: string;
      jobId?: string;
      receiptFile?: File | null;
    }) => {
      if (!employeeId) throw new Error('No employee ID');

      // Receipt goes up FIRST and lands on the insert: workers have no UPDATE
      // policy on employer_expense_claims, so a post-insert update of
      // receipt_url would be silently refused by RLS.
      let receiptUrl: string | null = null;
      if (receiptFile) {
        if (receiptFile.size > 10 * 1024 * 1024) throw new Error('Receipt too large (10MB max)');
        const ext = (receiptFile.name.split('.').pop() || 'jpg').toLowerCase();
        const path = `receipts/worker/${employeeId}/${Date.now()}-${Math.random()
          .toString(36)
          .slice(2, 8)}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from('expense-receipts')
          .upload(path, receiptFile, { cacheControl: '3600', upsert: false });
        if (uploadError) throw uploadError;
        receiptUrl = supabase.storage.from('expense-receipts').getPublicUrl(path).data.publicUrl;
      }

      const { data, error } = await supabase
        .from('employer_expense_claims')
        .insert({
          employee_id: employeeId,
          category,
          amount,
          // description is NOT NULL — fall back to the category
          description: description?.trim() || category,
          job_id: jobId || null,
          status: 'Pending',
          submitted_date: new Date().toISOString().split('T')[0],
          receipt_url: receiptUrl,
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
  status?: string;
  created_at: string;
  issue_type?: string | null;
  resolution_notes?: string | null;
  resolved_at?: string | null;
  photos?: string[] | null;
  /** employer_employees.id of whoever raised it — drives the "Mine" filter. */
  reported_by?: string | null;
}

/**
 * Hook for snag reports
 */
/** Worker form values → the employer hub's job_issues.severity vocabulary. */
const SNAG_SEVERITY: Record<string, string> = {
  minor: 'Low',
  moderate: 'Medium',
  critical: 'Critical',
};
/** Worker form values → employer_incidents.severity (IncidentsSection). */
const INCIDENT_SEVERITY: Record<string, string> = {
  minor: 'low',
  moderate: 'medium',
  critical: 'critical',
};

const MAX_REPORT_PHOTO_BYTES = 10 * 1024 * 1024;

/**
 * Upload a snag photo to the PRIVATE visual-uploads bucket and return its
 * storage PATH. The bucket's INSERT policy requires the first folder to be the
 * uploader's uid; the employer's Quality / Issues screens resolve paths in this
 * bucket to signed URLs (useStorageUrls('visual-uploads', …)).
 */
export const uploadReportPhoto = async (jobId: string, file: File): Promise<string> => {
  if (file.size > MAX_REPORT_PHOTO_BYTES) throw new Error('Photo too large (10MB max)');
  if (!file.type.startsWith('image/')) throw new Error('Only images can be attached');
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');
  const ext = (file.name.split('.').pop() || 'jpg').toLowerCase();
  const path = `${user.id}/issues/${jobId}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabase.storage.from('visual-uploads').upload(path, file);
  if (error) throw error;
  return path;
};

export interface MyIncidentReport {
  id: string;
  job_id: string | null;
  incident_type: string;
  severity: string;
  description: string | null;
  location: string | null;
  status: string;
  actions_taken: string | null;
  created_at: string;
  /** The outcome the office wrote when it closed the report. */
  closeout_summary: string | null;
  /** When the office first opened it. Null = not seen yet. */
  acknowledged_at: string | null;
  photos: string[] | null;
}

export const useSnagReports = (jobId?: string) => {
  const employeeQuery = useMyEmployeeRecord();
  const employeeId = employeeQuery.data?.id;
  const queryClient = useQueryClient();

  // Safety reports this worker raised (near-miss / incident). RLS: "Worker
  // reads own reported incidents" — reported_by is the roster id as text.
  // Without this the worker never saw what became of a report.
  const recentIncidentsQuery = useQuery<MyIncidentReport[]>({
    queryKey: ['my-incident-reports', jobId, employeeId],
    queryFn: async () => {
      if (!employeeId) return [];
      let query = supabase
        .from('employer_incidents')
        .select(
          'id, job_id, incident_type, severity, description, location, status, actions_taken, created_at, closeout_summary, acknowledged_at, photos'
        )
        .eq('reported_by', employeeId)
        .order('created_at', { ascending: false })
        .limit(10);
      if (jobId) query = query.eq('job_id', jobId);
      const { data, error } = await query;
      if (error) {
        console.error('Error fetching incident reports:', error);
        return [];
      }
      // closeout_summary / acknowledged_at / photos are newer than the generated types.
      return (data || []) as unknown as MyIncidentReport[];
    },
    enabled: !!employeeId,
    staleTime: 2 * 60 * 1000,
  });

  const recentSnagsQuery = useQuery<SnagReport[]>({
    queryKey: ['snag-reports', jobId, employeeId],
    queryFn: async () => {
      if (!employeeId) return [];

      let query = supabase
        .from('job_issues')
        .select(
          'id, job_id, severity, description, location, status, created_at, issue_type, resolution_notes, resolved_at, photos, reported_by'
        )
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
      photos,
    }: {
      jobId: string;
      severity: string;
      description: string;
      location?: string;
      /** Storage paths in the visual-uploads bucket (see uploadReportPhoto). */
      photos?: string[];
    }) => {
      if (!employeeId) throw new Error('No employee ID');

      // Stamped with the job owner's user_id (enforced by RLS) so the snag
      // appears directly in the employer's Quality & Issues sections
      const { data: job, error: jobError } = await supabase
        .from('employer_jobs')
        .select('user_id, title')
        .eq('id', jId)
        .single();
      if (jobError || !job) throw jobError || new Error('Job not found');

      // Write the EMPLOYER's vocabulary. The Quality & Snags and Job Issues
      // screens filter on 'Snag' / 'Open' / 'Low…Critical' (see
      // useJobIssues.ts) — a lowercase 'snag' row never showed up anywhere
      // in the hub, so the worker's report silently vanished.
      const { data, error } = await supabase
        .from('job_issues')
        .insert({
          job_id: jId,
          user_id: job.user_id,
          title: description.slice(0, 80),
          description,
          issue_type: 'Snag',
          severity: SNAG_SEVERITY[severity] ?? 'Medium',
          status: 'Open',
          // FK to the roster row — identifies which team member reported it
          reported_by: employeeId,
          location: location || null,
          photos: photos && photos.length > 0 ? photos : null,
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

  // Safety reports (near-miss / incident) go to employer_incidents — the safety
  // counterpart to a quality snag. Same form, different destination.
  const submitIncidentMutation = useMutation({
    mutationFn: async ({
      jobId: jId,
      severity,
      description,
      location,
      incidentType,
      photos,
    }: {
      jobId: string;
      severity: string;
      description: string;
      location?: string;
      incidentType: string;
      /** Storage paths in the visual-uploads bucket (see uploadReportPhoto). */
      photos?: string[];
    }) => {
      if (!employeeId) throw new Error('No employee ID');
      const { data: job, error: jobError } = await supabase
        .from('employer_jobs')
        .select('user_id')
        .eq('id', jId)
        .single();
      if (jobError || !job) throw jobError || new Error('Job not found');

      const { data, error } = await supabase
        .from('employer_incidents')
        .insert({
          employer_id: job.user_id,
          job_id: jId,
          title: description.slice(0, 80),
          description,
          incident_type: incidentType,
          // IncidentsSection uses low / medium / high / critical
          severity: INCIDENT_SEVERITY[severity] ?? 'medium',
          status: 'open',
          reported_by: employeeId,
          location: location || null,
          photos: photos && photos.length > 0 ? photos : null,
          // photos (6 Oct) is newer than the generated types.
        } as never)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-incident-reports'] });
    },
  });

  return {
    recentSnags: recentSnagsQuery.data,
    recentIncidents: recentIncidentsQuery.data,
    isLoading: recentSnagsQuery.isLoading,
    submitSnag: submitSnagMutation.mutateAsync,
    isSubmitting: submitSnagMutation.isPending,
    submitIncident: submitIncidentMutation.mutateAsync,
    isSubmittingIncident: submitIncidentMutation.isPending,
  };
};

export interface MyIncidentAction {
  incident_id: string;
  incident_title: string;
  incident_type: string;
  location: string | null;
  job_title: string | null;
  action_id: string;
  action: string;
  due_date: string | null;
  done_at: string | null;
}

/**
 * Corrective actions the office has put in this worker's name (ELE-1945).
 * Server-side RPC: returns the action and where it happened, never the
 * incident's injury details.
 */
export const useMyIncidentActions = () => {
  const queryClient = useQueryClient();
  const query = useQuery<MyIncidentAction[]>({
    queryKey: ['my-incident-actions'],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('get_my_incident_actions' as never);
      if (error) throw error;
      return (data ?? []) as unknown as MyIncidentAction[];
    },
    staleTime: 60 * 1000,
  });

  const complete = useMutation({
    mutationFn: async ({
      incidentId,
      actionId,
      note,
    }: {
      incidentId: string;
      actionId: string;
      note?: string;
    }) => {
      const { error } = await supabase.rpc(
        'complete_my_incident_action' as never,
        {
          p_incident_id: incidentId,
          p_action_id: actionId,
          p_note: note ?? null,
        } as never
      );
      // PostgrestError is not an Error instance; rethrow one so the screen can
      // show the server's reason ("closed by the office").
      if (error) throw new Error(error.message);
    },
    // Refresh either way: a failure usually means the list is out of date.
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['my-incident-actions'] }),
  });

  return { ...query, complete };
};
