/**
 * Firm safety documents in the Employer Hub (ELE-1940, ELE-1941, ELE-1943).
 *
 * Every read and write here goes through a definer function that checks who
 * is asking (see the 20261010110000–113000 migrations), so nothing here can
 * reach another firm's records or a worker's personal ones.
 */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { SafetyLaunchPeople } from '@/utils/safety-launch';

const rpc = async <T>(name: string, args: Record<string, unknown>): Promise<T> => {
  const { data, error } = await supabase.rpc(name as never, args as never);
  if (error) throw error;
  return data as unknown as T;
};

/* ── ELE-1941: the firm's people for a job ─────────────────────────────── */

export interface JobSafetyPeople {
  job: {
    id: string;
    title: string | null;
    client: string | null;
    location: string | null;
    start_date: string | null;
    end_date: string | null;
    description: string | null;
    site_contact_name: string | null;
    site_contact_phone: string | null;
  } | null;
  contractor: string | null;
  supervisor: { name: string; phone: string | null; why: string } | null;
  first_aider: { name: string; phone: string | null; cert: string; expires: string | null } | null;
  crew: { name: string; role: string | null }[];
  pack: { id: string; title: string | null; scope: string | null; hazards: string[] | null } | null;
}

export function useJobSafetyPeople(jobId: string | null | undefined) {
  return useQuery({
    queryKey: ['job-safety-people', jobId],
    enabled: !!jobId,
    staleTime: 60_000,
    queryFn: () => rpc<JobSafetyPeople>('get_job_safety_people', { p_job: jobId }),
  });
}

/** The names a RAMS should carry for this job, as the generator's seed takes them. */
export function peopleForLaunch(p: JobSafetyPeople | null | undefined): SafetyLaunchPeople {
  if (!p) return {};
  return {
    contractor: p.contractor ?? undefined,
    supervisor: p.supervisor?.name ?? undefined,
    siteManagerName: p.job?.site_contact_name ?? undefined,
    siteManagerPhone: p.job?.site_contact_phone ?? undefined,
    firstAiderName: p.first_aider?.name ?? undefined,
    firstAiderPhone: p.first_aider?.phone ?? undefined,
  };
}

/* ── ELE-1940: move my personal RAMS into the firm ─────────────────────── */

export interface MoveCandidate {
  id: string;
  title: string;
  location: string | null;
  status: string;
  created_at?: string;
  moved_at?: string;
  has_pdf?: boolean;
  on_job?: boolean;
}

export interface MoveCandidates {
  eligible: boolean;
  personal: MoveCandidate[];
  moved: MoveCandidate[];
}

export function useRamsMoveCandidates(employerId: string | null | undefined) {
  return useQuery({
    queryKey: ['rams-move-candidates', employerId],
    enabled: !!employerId,
    staleTime: 30_000,
    queryFn: () => rpc<MoveCandidates>('rams_firm_move_candidates', { p_employer_id: employerId }),
  });
}

export function useMoveRams(employerId: string | null | undefined) {
  const qc = useQueryClient();
  const refresh = () => {
    void qc.invalidateQueries({ queryKey: ['rams-move-candidates'] });
    void qc.invalidateQueries({ queryKey: ['ramsDocuments'] });
    void qc.invalidateQueries({ queryKey: ['recent-generated-rams'] });
    void qc.invalidateQueries({ queryKey: ['firm-documents'] });
  };
  const toFirm = useMutation({
    mutationFn: (ids: string[]) =>
      rpc<{ moved: number; skipped: number }>('rams_move_to_firm', {
        p_employer_id: employerId,
        p_ids: ids,
      }),
    onSuccess: refresh,
  });
  const back = useMutation({
    mutationFn: (ids: string[]) =>
      rpc<{ restored: number; on_job: number }>('rams_move_back_to_personal', { p_ids: ids }),
    onSuccess: refresh,
  });
  return { toFirm, back };
}

/* ── ELE-1940: RAMS and method statements attached to the firm's job packs ── */

export interface PackSafetyDoc {
  id: string;
  title: string;
  documentType: string;
  fileUrl: string | null;
  createdAt: string | null;
  packId: string;
  packTitle: string | null;
  jobId: string | null;
}

export function useFirmPackSafetyDocs(employerId: string | null | undefined) {
  return useQuery({
    queryKey: ['firm-pack-safety-docs', employerId],
    enabled: !!employerId,
    staleTime: 60_000,
    queryFn: async (): Promise<PackSafetyDoc[]> => {
      const { data: packs, error } = await supabase
        .from('employer_job_packs')
        .select('id, title, job_id')
        .eq('employer_id', employerId as string);
      if (error) throw error;
      const byId = new Map((packs ?? []).map((p) => [p.id, p]));
      if (!byId.size) return [];
      const { data: docs, error: dErr } = await supabase
        .from('employer_job_pack_documents')
        .select('id, title, document_type, file_url, created_at, job_pack_id')
        .in('job_pack_id', [...byId.keys()])
        .order('created_at', { ascending: false });
      if (dErr) throw dErr;
      return (docs ?? [])
        .filter((d) => /^(rams|method_statement)$/i.test(d.document_type ?? ''))
        .map((d) => {
          const pack = byId.get(d.job_pack_id);
          return {
            id: d.id,
            title: d.title,
            documentType: d.document_type,
            fileUrl: d.file_url,
            createdAt: d.created_at,
            packId: d.job_pack_id,
            packTitle: pack?.title ?? null,
            jobId: pack?.job_id ?? null,
          };
        });
    },
  });
}

/* ── ELE-1943: the firm's circuit designs ──────────────────────────────── */

export interface FirmDesign {
  id: string;
  title: string;
  location: string | null;
  status: string;
  created_at: string;
  completed_at: string | null;
  job_id: string | null;
  job_title: string | null;
  circuits: number;
  made_by: string;
  mine: boolean;
}

export function useFirmDesigns(jobId: string | null = null) {
  return useQuery({
    queryKey: ['firm-designs', jobId],
    staleTime: 15_000,
    queryFn: () => rpc<FirmDesign[]>('get_firm_designs', { p_job: jobId, p_limit: 40 }),
    // A design still running moves on by itself; look again shortly.
    refetchInterval: (q) =>
      (q.state.data ?? []).some((d) => d.status === 'pending' || d.status === 'processing')
        ? 8000
        : false,
  });
}

export interface JobDesignRow {
  id: string;
  title: string;
  created_at: string;
  circuits: number;
}

/** Completed designs on one job: for its crew (Worker Tools) and managers. */
export function useJobDesigns(jobId: string | null | undefined) {
  return useQuery({
    queryKey: ['job-designs', jobId],
    enabled: !!jobId,
    staleTime: 60_000,
    retry: false,
    queryFn: () => rpc<JobDesignRow[]>('get_job_designs', { p_job: jobId }),
  });
}

export interface DesignDetail {
  id: string;
  status: string;
  created_at: string;
  job_id: string | null;
  job_title: string | null;
  mine: boolean;
  job_inputs: Record<string, unknown> | null;
  design_data: Record<string, unknown> | null;
}

export function useDesignDetail(designId: string | null | undefined) {
  return useQuery({
    queryKey: ['design-detail', designId],
    enabled: !!designId,
    staleTime: 60_000,
    retry: false,
    queryFn: () => rpc<DesignDetail>('get_design_detail', { p_design: designId }),
  });
}

/** File my design with the firm and a job; both null takes it back to me. */
export async function fileDesignWithFirm(
  designId: string,
  employerId: string | null,
  jobId: string | null
) {
  return rpc<{ id: string; employer_id: string | null; employer_job_id: string | null }>(
    'design_file_with_firm',
    { p_design: designId, p_employer_id: employerId, p_job: jobId }
  );
}
