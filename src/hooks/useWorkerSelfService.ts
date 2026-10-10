/**
 * useWorkerSelfService
 *
 * Combined hook for worker self-service features in the Worker Tools section.
 * Aggregates employee data, timesheets, leave, and communications for the current user.
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { OFFLINE_FIRST, isOfflineError, offlineSnapshot } from '@/lib/workerOfflineCache';
import { clipWords, holdPhoto, submitWorkerAction, type SubmitResult } from '@/lib/workerOutbox';
import {
  workerSafetyRow,
  type WorkerIncidentKind,
  type WorkerSafetyPayload,
} from '@/lib/safetyIncidentRows';
import { supabase } from '@/integrations/supabase/client';
import { withElecIdProfilePrivate } from '@/lib/columnPrivacy';
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
  /** Board column the office has the job in (Testing, Complete…). */
  board_stage?: string | null;
  /** Assigned but not opened yet in My Jobs (ELE-1999). */
  is_new?: boolean;
  /** When this worker said "I've finished my part". */
  finished_at?: string | null;
  /** Job closed, or this worker's assignment ended. */
  closed?: boolean;
}

/**
 * Jobs assigned to the current worker at their CURRENT firm (active roster
 * row). Filtered server-side by get_my_jobs (ELE-1999) — the old version took
 * the newest 50 assignment rows and filtered afterwards, so live jobs could
 * fall off the end of the list.
 */
export const useMyJobs = (filter: 'active' | 'completed' | 'all' = 'active') => {
  const employeeQuery = useMyEmployeeRecord();
  const employeeId = employeeQuery.data?.id;

  return useQuery<WorkerJob[]>({
    queryKey: ['my-jobs', employeeId, filter],
    // ELE-1828: kept on the phone so the job list opens with no signal.
    ...OFFLINE_FIRST,
    queryFn: () => offlineSnapshot(`my-jobs:${employeeId}:${filter}`, async () => {
      if (!employeeId) return [];
      const { data, error } = await supabase.rpc(
        'get_my_jobs' as never,
        { p_filter: filter } as never
      );
      if (error) {
        console.error('Error fetching my jobs:', error);
        throw error;
      }
      return ((data as unknown as WorkerJob[] | null) ?? []).map((j) => ({
        ...j,
        client_name: j.client_name ?? undefined,
        address: j.address ?? undefined,
        scheduled_date: j.scheduled_date ?? undefined,
      }));
    }),
    enabled: !!employeeId,
    staleTime: 60 * 1000,
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
            'id, elec_id_number, is_verified, employee:employer_employees!inner(user_id)'
          )
          .eq('employee.user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();
        if (profile) {
          // ELE-1831: card number via the owner RPC, not the row.
          const [own] = await withElecIdProfilePrivate([profile]);
          elecId = {
            cardNumber: own.ecs_card_number || profile.elec_id_number || undefined,
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
  /** Roster name of whoever wrote it (or the office). */
  author_name: string | null;
  author_user_id: string | null;
  author_employee_id: string | null;
  /** visual-uploads storage paths. */
  photos: string[];
  edited_at: string | null;
}

/** Workers may change their own note for this long after writing it (RLS). */
export const NOTE_EDIT_WINDOW_MS = 24 * 60 * 60 * 1000;

/**
 * Progress notes on one job (employer_job_comments, comment_type 'progress').
 * Authors are stamped server-side (ELE-2003); a worker can edit or delete their
 * own note for 24 hours while still on the job.
 */
export const useProgressNotes = (jobId?: string) => {
  const employeeQuery = useMyEmployeeRecord();
  const employeeId = employeeQuery.data?.id;
  const queryClient = useQueryClient();

  const recentNotesQuery = useQuery<ProgressNote[]>({
    queryKey: ['progress-notes', jobId, employeeId],
    // ELE-1828: the job's notes still show with no signal.
    ...OFFLINE_FIRST,
    queryFn: () => offlineSnapshot(`progress-notes:${jobId}`, async () => {
      if (!jobId || !employeeId) return [];

      const { data, error } = await supabase
        .from('employer_job_comments')
        .select(
          'id, job_id, content, created_at, author_name, author_user_id, author_employee_id, photos, edited_at'
        )
        .eq('job_id', jobId)
        .eq('comment_type', 'progress')
        .is('task_id', null)
        .order('created_at', { ascending: false })
        .limit(30);

      if (error) {
        console.error('Error fetching progress notes:', error);
        throw error;
      }

      return ((data as unknown as ProgressNote[]) || []).map((n) => ({
        ...n,
        photos: Array.isArray(n.photos) ? n.photos : [],
      }));
    }),
    enabled: !!jobId && !!employeeId,
    staleTime: 30 * 1000,
  });

  const employeeName = employeeQuery.data?.name || '';

  const invalidate = (jId?: string) => {
    queryClient.invalidateQueries({ queryKey: ['progress-notes', jId ?? jobId] });
    queryClient.invalidateQueries({ queryKey: ['my-job-detail', jId ?? jobId] });
  };

  const submitNoteMutation = useMutation({
    mutationFn: async ({
      jobId: jId,
      content,
      photos = [],
    }: {
      jobId: string;
      content: string;
      photos?: string[];
    }) => {
      if (!employeeId) throw new Error('No employee ID');

      // Lands in the employer's job comments feed. The server stamps who wrote
      // it; author_name must still match the worker's roster name (RLS).
      const { data, error } = await supabase
        .from('employer_job_comments')
        .insert({
          job_id: jId,
          author_name: employeeName,
          comment_type: 'progress',
          content,
          photos,
        } as never)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => invalidate(variables.jobId),
  });

  const updateNoteMutation = useMutation({
    mutationFn: async ({
      id,
      content,
      photos,
    }: {
      id: string;
      content: string;
      photos: string[];
    }) => {
      const { data, error } = await supabase
        .from('employer_job_comments')
        .update({ content, photos } as never)
        .eq('id', id)
        .select('id');
      if (error) throw error;
      if (!data || data.length === 0) {
        throw new Error('This note can no longer be changed (notes lock after 24 hours).');
      }
    },
    onSuccess: () => invalidate(),
  });

  const deleteNoteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { data, error } = await supabase
        .from('employer_job_comments')
        .delete()
        .eq('id', id)
        .select('id');
      if (error) throw error;
      if (!data || data.length === 0) {
        throw new Error('This note can no longer be deleted (notes lock after 24 hours).');
      }
    },
    onSuccess: () => invalidate(),
  });

  /**
   * ELE-1828: a progress note through the outbox — works with no signal.
   * `paths` are photos already uploaded; `heldFiles` are photos kept on the
   * phone (no signal when taken), uploaded with the note.
   */
  const sendNote = async (input: {
    jobId: string;
    jobTitle?: string;
    content: string;
    paths?: string[];
    heldFiles?: File[];
  }): Promise<SubmitResult> => {
    if (!employeeId) throw new Error('No employee ID');
    const photos = await Promise.all((input.heldFiles ?? []).map(holdPhoto));
    const { result } = await submitWorkerAction({
      kind: 'progress_note',
      label: `Progress note · ${clipWords(input.content)}`,
      detail: input.jobTitle ?? null,
      jobId: input.jobId,
      photos,
      payload: {
        jobId: input.jobId,
        authorName: employeeName,
        content: input.content,
        paths: input.paths ?? [],
      },
    });
    return result;
  };

  return {
    sendNote,
    recentNotes: recentNotesQuery.data,
    isLoading: recentNotesQuery.isLoading,
    submitNote: submitNoteMutation.mutateAsync,
    isSubmitting: submitNoteMutation.isPending,
    updateNote: updateNoteMutation.mutateAsync,
    isUpdating: updateNoteMutation.isPending,
    deleteNote: deleteNoteMutation.mutateAsync,
    isDeleting: deleteNoteMutation.isPending,
  };
};

// Worker expense claims moved to useExpenses.useMyExpenses (ELE-2001/2009):
// one source for the Expenses page, My pay and the office.

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
/** Worker form values → employer_incidents.severity (outbox ops queued by older builds). */
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
export const uploadReportPhoto = async (
  jobId: string,
  file: File,
  /** Folder under <uid>/ — 'issues' for snags, 'notes' for progress notes. */
  folder: 'issues' | 'notes' = 'issues'
): Promise<string> => {
  if (file.size > MAX_REPORT_PHOTO_BYTES) throw new Error('Photo too large (10MB max)');
  if (!file.type.startsWith('image/')) throw new Error('Only images can be attached');
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');
  const ext = (file.name.split('.').pop() || 'jpg').toLowerCase();
  const path = `${user.id}/${folder}/${jobId}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabase.storage.from('visual-uploads').upload(path, file);
  if (error) throw error;
  return path;
};

export interface MyIncidentReport {
  id: string;
  /** ELE-2031: 'near_miss' / 'accident' = the worker's own Site Safety record;
   *  'legacy' = an employer_incidents row from an older build. */
  source: 'legacy' | 'near_miss' | 'accident';
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

  // Safety reports this worker raised on the firm's jobs. Since ELE-2031 they
  // are the worker's own Site Safety records (near_miss_reports /
  // accident_records with employer_job_id); older builds wrote
  // employer_incidents (RLS: "Worker reads own reported incidents"). Both are
  // read so nothing a worker sent disappears. The office's follow-up (seen,
  // closed, what was done) is on the firm_* columns of their own row.
  const recentIncidentsQuery = useQuery<MyIncidentReport[]>({
    queryKey: ['my-incident-reports', jobId, employeeId],
    queryFn: async () => {
      if (!employeeId) return [];
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return [];

      let legacyQ = supabase
        .from('employer_incidents')
        .select(
          'id, job_id, incident_type, severity, description, location, status, actions_taken, created_at, closeout_summary, acknowledged_at, photos'
        )
        .eq('reported_by', employeeId)
        .order('created_at', { ascending: false })
        .limit(10);
      if (jobId) legacyQ = legacyQ.eq('job_id', jobId);

      const nmCols =
        'id, employer_job_id, incident_kind, severity, description, location, created_at, photos, firm_status, firm_closed_at, firm_closeout_summary, firm_acknowledged_at, legacy_employer_incident_id';
      const acCols =
        'id, employer_job_id, severity, incident_description, location, created_at, photos, firm_status, firm_closed_at, firm_closeout_summary, firm_acknowledged_at, legacy_employer_incident_id';
      let nmQ = supabase
        .from('near_miss_reports')
        .select(nmCols as '*')
        .eq('user_id', user.id)
        .not('employer_job_id', 'is', null)
        .order('created_at', { ascending: false })
        .limit(10);
      let acQ = supabase
        .from('accident_records')
        .select(acCols as '*')
        .eq('user_id', user.id)
        .not('employer_job_id', 'is', null)
        .order('created_at', { ascending: false })
        .limit(10);
      if (jobId) {
        nmQ = nmQ.eq('employer_job_id' as never, jobId as never);
        acQ = acQ.eq('employer_job_id' as never, jobId as never);
      }

      const [legacyRes, nmRes, acRes] = await Promise.all([legacyQ, nmQ, acQ]);
      if (legacyRes.error) console.error('Error fetching incident reports:', legacyRes.error);
      if (nmRes.error) console.error('Error fetching near-miss reports:', nmRes.error);
      if (acRes.error) console.error('Error fetching accident reports:', acRes.error);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const firmStatus = (r: any) =>
        r.firm_closed_at || r.firm_status === 'closed' ? 'closed' : (r.firm_status ?? 'open');
      const photoList = (v: unknown) =>
        Array.isArray(v) ? (v as unknown[]).filter((x): x is string => typeof x === 'string') : [];

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const nm = ((nmRes.data ?? []) as any[]).map(
        (r): MyIncidentReport => ({
          id: r.id,
          source: 'near_miss',
          job_id: r.employer_job_id,
          incident_type: r.incident_kind ?? 'near_miss',
          severity: r.severity,
          description: r.description,
          location: r.location,
          status: firmStatus(r),
          actions_taken: null,
          created_at: r.created_at,
          closeout_summary: r.firm_closeout_summary,
          acknowledged_at: r.firm_acknowledged_at,
          photos: photoList(r.photos),
        })
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const ac = ((acRes.data ?? []) as any[]).map(
        (r): MyIncidentReport => ({
          id: r.id,
          source: 'accident',
          job_id: r.employer_job_id,
          incident_type: 'injury',
          severity: r.severity,
          description: r.incident_description,
          location: r.location,
          status: firmStatus(r),
          actions_taken: null,
          created_at: r.created_at,
          closeout_summary: r.firm_closeout_summary,
          acknowledged_at: r.firm_acknowledged_at,
          photos: photoList(r.photos),
        })
      );
      // A copied employer_incidents row (release-held backfill) shows once.
      const copied = new Set(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [...((nmRes.data ?? []) as any[]), ...((acRes.data ?? []) as any[])]
          .map((r) => r.legacy_employer_incident_id)
          .filter(Boolean)
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const legacy = ((legacyRes.data ?? []) as any[])
        .filter((r) => !copied.has(r.id))
        .map((r): MyIncidentReport => ({ ...r, source: 'legacy' }));

      return [...nm, ...ac, ...legacy]
        .sort((a, b) => (a.created_at < b.created_at ? 1 : -1))
        .slice(0, 10);
    },
    enabled: !!employeeId,
    staleTime: 2 * 60 * 1000,
  });

  const recentSnagsQuery = useQuery<SnagReport[]>({
    queryKey: ['snag-reports', jobId, employeeId],
    ...OFFLINE_FIRST,
    queryFn: () => offlineSnapshot(`snag-reports:${jobId ?? 'all'}`, async () => {
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
        // No signal: answer from the phone, never cache an empty list for it.
        if (isOfflineError(error)) throw error;
        return [];
      }

      return data || [];
    }),
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

  // Safety reports (near-miss / incident) are the worker's own Site Safety
  // record filed against the job (ELE-2031): near_miss_reports, or
  // accident_records when somebody was hurt. Same form as a snag, different
  // destination. (The Reports page sends through the outbox, sendReport.)
  const submitIncidentMutation = useMutation({
    mutationFn: async (
      input: Omit<WorkerSafetyPayload, 'employeeId' | 'reporterName'> & {
        /** Storage paths in the visual-uploads bucket (see uploadReportPhoto). */
        photos?: string[];
      }
    ) => {
      if (!employeeId) throw new Error('No employee ID');
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');
      const { table, row } = workerSafetyRow(
        { ...input, employeeId, reporterName: employeeQuery.data?.name ?? null },
        {
          id: crypto.randomUUID(),
          userId: user.id,
          createdAt: new Date().toISOString(),
          photos: input.photos ?? [],
        }
      );
      const { data, error } = await supabase
        .from(table as never)
        .insert(row as never)
        .select('id')
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-incident-reports'] });
    },
  });

  /**
   * ELE-1828: a snag or safety report through the outbox — works with no
   * signal, photos compressed and held on the phone, lands once.
   */
  const sendReport = async (input: {
    kind: 'snag' | 'incident';
    jobId: string;
    jobTitle?: string;
    severity: string;
    description: string;
    location?: string;
    incidentType?: string;
    photoFiles?: File[];
    /** ELE-2031, safety reports: somebody was hurt (→ the accident book). */
    injury?: {
      injuredName?: string | null;
      injuredEmployeeId?: string | null;
      injuryType?: string | null;
      bodyPart?: string | null;
    } | null;
    /** ELE-2031, an incident where nobody was hurt: what kind it was. */
    incidentKind?: WorkerIncidentKind;
  }): Promise<SubmitResult> => {
    if (!employeeId) throw new Error('No employee ID');
    const photos = await Promise.all((input.photoFiles ?? []).map(holdPhoto));
    const noun =
      input.kind === 'snag' ? 'Snag' : input.incidentType === 'near_miss' ? 'Near-miss' : 'Incident';
    const safety: Partial<WorkerSafetyPayload> =
      input.kind === 'incident'
        ? {
            target: input.injury ? 'accident' : 'near_miss',
            jobTitle: input.jobTitle ?? null,
            reporterName: employeeQuery.data?.name ?? null,
            workerSeverity: (['minor', 'moderate', 'critical'].includes(input.severity)
              ? input.severity
              : 'moderate') as WorkerSafetyPayload['workerSeverity'],
            incidentKind:
              input.incidentType === 'near_miss' ? 'near_miss' : (input.incidentKind ?? 'other'),
            injuredName: input.injury?.injuredName ?? null,
            injuredEmployeeId: input.injury?.injuredEmployeeId ?? null,
            injuryType: input.injury?.injuryType ?? null,
            bodyPart: input.injury?.bodyPart ?? null,
          }
        : {};
    const { result } = await submitWorkerAction({
      kind: input.kind,
      label: `${noun} · ${clipWords(input.description)}`,
      detail: input.jobTitle ?? null,
      jobId: input.jobId,
      photos,
      payload: {
        jobId: input.jobId,
        employeeId,
        severity:
          input.kind === 'snag'
            ? (SNAG_SEVERITY[input.severity] ?? 'Medium')
            : (INCIDENT_SEVERITY[input.severity] ?? 'medium'),
        description: input.description,
        location: input.location || null,
        incidentType: input.incidentType ?? null,
        ...safety,
      },
    });
    return result;
  };

  return {
    sendReport,
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
