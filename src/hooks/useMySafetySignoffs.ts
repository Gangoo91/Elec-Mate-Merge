/**
 * Everything the firm has asked the signed-in worker to sign outside job packs:
 * toolbox talks, RAMS and company policies (get_my_safety_signoffs).
 * Shared by Worker Tools Sign-offs and the job page in My Jobs.
 */
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface Signed {
  signed_at: string | null;
  /** The worker's own signature (data URL), for their signed copy. */
  my_signature?: string | null;
  my_location?: unknown;
  my_name?: string | null;
  company_name: string | null;
}

export interface BriefingToSign extends Signed {
  id: string;
  briefing_name: string | null;
  briefing_type: string | null;
  briefing_date: string | null;
  briefing_time: string | null;
  location: string | null;
  risk_level: string | null;
  briefing_description: string | null;
  work_scope: string | null;
  safety_warning: string | null;
  key_points: string[] | null;
  safety_points: string[] | null;
  identified_hazards: string[] | null;
  conductor_name: string | null;
  employer_job_id: string | null;
  job_title: string | null;
}

export interface RamsToSign extends Signed {
  id: string;
  project_name: string | null;
  location: string | null;
  version: number | null;
  updated_at: string;
  employer_job_id: string | null;
  job_title: string | null;
}

export interface PolicyToSign extends Signed {
  id: string;
  name: string | null;
  content: string | null;
  version: number | null;
  published_at: string | null;
  review_date: string | null;
}

export interface MySafetySignoffs {
  briefings: BriefingToSign[];
  rams: RamsToSign[];
  policies: PolicyToSign[];
}

export const MY_SAFETY_SIGNOFFS_KEY = ['my-safety-signoffs'];

export function useMySafetySignoffs(enabled = true) {
  return useQuery({
    queryKey: MY_SAFETY_SIGNOFFS_KEY,
    enabled,
    staleTime: 60 * 1000,
    queryFn: async (): Promise<MySafetySignoffs> => {
      const { data: res, error } = await supabase.rpc('get_my_safety_signoffs' as never);
      if (error) throw error;
      const r = (res ?? {}) as Partial<MySafetySignoffs>;
      return { briefings: r.briefings ?? [], rams: r.rams ?? [], policies: r.policies ?? [] };
    },
  });
}
