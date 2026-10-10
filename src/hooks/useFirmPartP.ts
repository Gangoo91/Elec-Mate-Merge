import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   Part P on the firm's jobs (ELE-2084).

   Every certificate linked to one of the firm's jobs, with its Part P
   verdict (part_p_certificate_verdict) and the electrician's own
   part_p_notifications row. The office manages it; the electrician who made
   the certificate can also mark it submitted. Both write through
   set_cert_part_p, which creates the row when the certificate never opened
   one. The 30-day clock: Building Regulations 2010 reg 20(3) (NAPIT asks for 21 days).
   ========================================================================== */

export type PartPState =
  'needed' | 'overdue' | 'submitted' | 'not_required' | 'not_yet' | 'unknown';

export interface FirmPartPRow {
  report_uuid: string;
  report_id: string;
  report_type: string;
  certificate_number: string | null;
  cert_status: string;
  client_name: string | null;
  installation_address: string | null;
  job_id: string;
  job_title: string | null;
  owner_name: string;
  mine: boolean;
  verdict: 'yes' | 'no' | 'unknown';
  completed_on: string | null;
  deadline: string | null;
  state: PartPState;
  notification: {
    id: string;
    status: string;
    submitted_at: string | null;
    reference: string | null;
    certificate_url: string | null;
    certificate_name: string | null;
    certificate_uploaded_at: string | null;
    authority: string | null;
  } | null;
}

const rpc = (fn: string, args?: Record<string, unknown>) =>
  supabase.rpc(fn as never, args as never) as unknown as Promise<{
    data: unknown;
    error: { message: string } | null;
  }>;

/** Part P rows for one job, or every job when jobId is null. */
export function useFirmPartP(jobId: string | null, enabled = true) {
  return useQuery({
    queryKey: ['firm-part-p', jobId ?? 'all'],
    enabled,
    staleTime: 30 * 1000,
    queryFn: async (): Promise<FirmPartPRow[]> => {
      const { data, error } = await rpc('get_firm_part_p', { p_job_id: jobId });
      if (error) throw new Error(error.message);
      return Array.isArray(data) ? (data as FirmPartPRow[]) : [];
    },
  });
}

const BUCKET = 'scheme-certificates';

/** Upload the scheme's notification certificate to the caller's own folder
 *  in the scheme-certificates bucket (its RLS keys on the first segment). */
export async function uploadSchemeCertificate(reportId: string, file: File) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('Not signed in');
  const safe = file.name.replace(/[^\w.-]+/g, '_').slice(-80);
  const path = `${user.id}/${reportId}/${Date.now()}-${safe}`;
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, { contentType: file.type || 'application/pdf', upsert: false });
  if (error) throw error;
  return supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
}

const friendly = (m: string) => {
  if (m.includes('NOT_AUTHORISED'))
    return 'Only the office or the electrician who made it can change this.';
  if (m.includes('NOT_FOUND')) return 'That certificate is no longer there.';
  if (m.includes('BAD_CERTIFICATE_URL')) return 'Attach the file again.';
  return 'Please try again.';
};

export function useSetCertPartP() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: {
      reportUuid: string;
      action?: 'submitted' | 'reopen' | 'not_required';
      reference?: string;
      certificateUrl?: string;
      certificateName?: string;
      clearCertificate?: boolean;
    }) => {
      const { error } = await rpc('set_cert_part_p', {
        p_report_uuid: input.reportUuid,
        p_action: input.action ?? null,
        p_reference: input.reference ?? null,
        p_certificate_url: input.certificateUrl ?? null,
        p_certificate_name: input.certificateName ?? null,
        p_clear_certificate: input.clearCertificate ?? false,
      });
      if (error) throw new Error(friendly(error.message));
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['firm-part-p'] });
      qc.invalidateQueries({ queryKey: ['part-p-notifications'] });
    },
  });
}

export const PART_P_LABEL: Record<PartPState, string> = {
  needed: 'Part P to notify',
  overdue: 'Part P overdue',
  submitted: 'Part P notified',
  not_required: 'Not notifiable',
  not_yet: 'Not finished',
  unknown: 'Part P not answered',
};
