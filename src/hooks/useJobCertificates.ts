import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   Job certificates (ELE-1973): the certificates raised for an employer job,
   with their test data, QS state and matched kit-register instrument.
   Links live in employer_job_certificates; every read and write is an RPC.
   ========================================================================== */

export interface JobCertificate {
  link_id: string;
  job_id: string;
  job_title: string | null;
  job_client: string | null;
  linked_at: string;
  linked_by_name: string;
  report_uuid: string;
  report_id: string;
  report_type: string;
  certificate_number: string | null;
  status: string;
  client_name: string | null;
  installation_address: string | null;
  inspection_date: string | null;
  inspector_name: string | null;
  updated_at: string;
  owner_name: string;
  data: Record<string, unknown>;
  /** ELE-1832: the re-test date from the certificate (certificate_expiry_reminders). */
  next_inspection?: string | null;
  /** ELE-1832: C1, C2 and FI observations not yet rectified. */
  remedials?: { code: string; item: string | null; description: string | null; recommendation: string | null }[];
  qs: {
    review_id: string;
    status: 'pending' | 'approved' | 'returned';
    submitted_at: string | null;
    reviewed_at: string | null;
    reviewer_name: string | null;
    return_reasons: string[] | null;
  } | null;
  kit: {
    id: string;
    name: string;
    serial: string;
    next_calibration: string | null;
    last_calibration: string | null;
  } | null;
}

export interface LinkableCertificate {
  report_uuid: string;
  report_id: string;
  report_type: string;
  certificate_number: string | null;
  status: string;
  client_name: string | null;
  installation_address: string | null;
  inspection_date: string | null;
  updated_at: string;
  owner_name: string;
  score: number;
}

// Cast: these RPCs postdate the last types.ts regeneration.
const rpc = (fn: string, args?: Record<string, unknown>) =>
  supabase.rpc(fn as never, args as never) as unknown as Promise<{
    data: unknown;
    error: { message: string } | null;
  }>;

/** Linked certificates for one job, or every job in the firm when jobId is null. */
export function useJobCertificates(jobId: string | null) {
  return useQuery({
    queryKey: ['job-certificates', jobId ?? 'all'],
    staleTime: 30 * 1000,
    queryFn: async (): Promise<JobCertificate[]> => {
      const { data, error } = await rpc('get_job_certificates', { p_job_id: jobId });
      if (error) throw new Error(error.message);
      const row = data as { certificates?: JobCertificate[]; error?: string } | null;
      if (!row || row.error) return [];
      return row.certificates ?? [];
    },
  });
}

export function useLinkableCertificates(jobId: string | null, search: string, enabled: boolean) {
  return useQuery({
    queryKey: ['linkable-certificates', jobId, search],
    enabled: enabled && !!jobId,
    staleTime: 15 * 1000,
    queryFn: async (): Promise<LinkableCertificate[]> => {
      const { data, error } = await rpc('get_linkable_certificates', {
        p_job_id: jobId,
        p_search: search.trim() || null,
      });
      if (error) throw new Error(error.message);
      const row = data as { certificates?: LinkableCertificate[]; error?: string } | null;
      if (!row || row.error) return [];
      return row.certificates ?? [];
    },
  });
}

const friendly = (message: string) => {
  if (message.includes('NOT_YOUR_TEAMS_CERTIFICATE'))
    return 'That certificate was made by someone outside your team.';
  if (message.includes('LINKED_TO_ANOTHER_FIRM'))
    return 'That certificate is already on another firm’s job.';
  if (message.includes('NOT_AUTHORISED')) return 'You can’t change this job.';
  return 'Please try again.';
};

function useInvalidateJobCerts() {
  const qc = useQueryClient();
  return () => {
    qc.invalidateQueries({ queryKey: ['job-certificates'] });
    qc.invalidateQueries({ queryKey: ['linkable-certificates'] });
    qc.invalidateQueries({ queryKey: ['job-sheet-counts'] });
    qc.invalidateQueries({ queryKey: ['employer-hub-counts'] });
    qc.invalidateQueries({ queryKey: ['job-hub-summary'] });
  };
}

export function useLinkCertificate() {
  const invalidate = useInvalidateJobCerts();
  return useMutation({
    mutationFn: async ({ reportUuid, jobId }: { reportUuid: string; jobId: string }) => {
      const { error } = await rpc('link_certificate_to_job', {
        p_report_uuid: reportUuid,
        p_job_id: jobId,
      });
      if (error) throw new Error(friendly(error.message));
    },
    onSuccess: invalidate,
  });
}

export function useUnlinkCertificate() {
  const invalidate = useInvalidateJobCerts();
  return useMutation({
    mutationFn: async ({ reportUuid }: { reportUuid: string }) => {
      const { error } = await rpc('unlink_certificate_from_job', { p_report_uuid: reportUuid });
      if (error) throw new Error(friendly(error.message));
    },
    onSuccess: invalidate,
  });
}
