/**
 * ELE-2012: every document linked to a job (RAMS, job packs, briefings,
 * quotes, invoices, certificates, signature requests, compliance documents),
 * for one job or the most recent across the firm. One firm-scoped RPC.
 */
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useActingFirmId } from '@/hooks/useEmployerHome';

export type FirmDocKind =
  | 'rams'
  | 'job_pack'
  | 'briefing'
  | 'quote'
  | 'invoice'
  | 'certificate'
  | 'signature'
  | 'compliance'
  /** An AI RAMS + method statement generated for the job, not yet issued. */
  | 'ai_rams'
  /** An AI circuit design filed on the job (ELE-1943). */
  | 'design';

export interface FirmDocument {
  kind: FirmDocKind;
  id: string;
  title: string;
  status: string | null;
  at: string | null;
  job_id: string;
  job_title: string | null;
  signed: number | null;
  to_sign: number | null;
  signers: string[] | null;
  detail: string | null;
  section: string;
  params: Record<string, string>;
  /** Only for owners and admins (can_see_firm_money). */
  total: number | null;
}

export interface FirmDocuments {
  job: { id: string; title: string } | null;
  total: number;
  by_kind: Partial<Record<FirmDocKind, number>>;
  items: FirmDocument[];
}

export function useFirmDocuments(jobId: string | null, limit = 40) {
  // Keyed on the firm acted for, so switching firm never shows the last one's documents
  const { data: firmId } = useActingFirmId();
  return useQuery({
    queryKey: ['firm-documents', firmId ?? null, jobId, limit],
    staleTime: 60_000,
    queryFn: async (): Promise<FirmDocuments> => {
      const { data, error } = await supabase.rpc(
        'get_firm_documents' as never,
        {
          p_job: jobId,
          p_limit: limit,
        } as never
      );
      if (error) throw error;
      return data as unknown as FirmDocuments;
    },
  });
}
