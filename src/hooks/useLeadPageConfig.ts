import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useEmployerRole } from '@/hooks/useEmployerRole';
import { toast } from 'sonner';

/**
 * The firm's quote page, as the owner or an admin manages it (ELE-1989).
 * Reads and writes go through get_quote_page_admin / update_quote_page, which
 * resolve the firm the signed-in person acts for (so a co-admin edits the
 * owner's page, not a page of their own) and refuse anyone else.
 */

export interface QuotePageRecent {
  id: string;
  name: string;
  created_at: string;
  stage: string | null;
  job_type: string | null;
  postcode: string | null;
  timing: string | null;
  phone: string | null;
  email: string | null;
  notes: string | null;
  photos: string[];
}

export interface QuotePageStats {
  views_7: number;
  enquiries_7: number;
  views_30: number;
  enquiries_30: number;
  views_all: number;
  enquiries_all: number;
}

export interface LeadPageConfig {
  firm_id: string;
  role: string;
  has_profile: boolean;
  company_name: string | null;
  logo: string | null;
  phone: string | null;
  colour: string | null;
  registration_scheme: string | null;
  registration_expiry: string | null;
  insurance_provider: string | null;
  insurance_expiry: string | null;
  lead_page_slug: string | null;
  lead_page_enabled: boolean;
  lead_page_headline: string | null;
  lead_page_about: string | null;
  lead_page_services: string[];
  lead_page_areas: string[];
  lead_page_trading_since: number | null;
  lead_page_show_certs: boolean;
  lead_page_show_registration: boolean;
  lead_page_show_insurance: boolean;
  lead_page_on_documents: boolean;
  stats: QuotePageStats;
  leads_all: number;
  recent: QuotePageRecent[];
}

export type LeadPagePatch = Partial<
  Pick<
    LeadPageConfig,
    | 'lead_page_slug'
    | 'lead_page_enabled'
    | 'lead_page_headline'
    | 'lead_page_about'
    | 'lead_page_services'
    | 'lead_page_areas'
    | 'lead_page_trading_since'
    | 'lead_page_show_certs'
    | 'lead_page_show_registration'
    | 'lead_page_show_insurance'
    | 'lead_page_on_documents'
  >
>;

// Cast: these RPCs postdate the last types.ts regeneration.
const rpc = supabase.rpc.bind(supabase) as unknown as (
  fn: string,
  args?: Record<string, unknown>
) => Promise<{ data: unknown; error: { message: string; code?: string } | null }>;

export const leadPageConfigKey = ['lead-page-config'] as const;

export const useLeadPageConfig = () => {
  const { user } = useAuth();
  // Only the owner or an admin may read it; an office manager or roster
  // member would just get a 403 from the RPC, so don't ask. The quote page
  // section shows them why instead.
  const { data: roleInfo, isLoading: roleLoading } = useEmployerRole();
  const role = roleInfo?.role ?? null;
  const mayManage = role === null || role === 'owner' || role === 'admin';
  const query = useQuery({
    queryKey: [...leadPageConfigKey, user?.id],
    enabled: !!user && !roleLoading && mayManage,
    retry: false,
    queryFn: async (): Promise<LeadPageConfig | null> => {
      const { data, error } = await rpc('get_quote_page_admin');
      if (error) throw new Error(error.message);
      return (data as LeadPageConfig) ?? null;
    },
  });
  // Hold the loading state while the role resolves, so an admin never sees
  // the "only the owner or an admin" message flash first.
  return { ...query, isLoading: query.isLoading || (!!user && roleLoading), mayManage };
};

export const useUpdateLeadPage = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (patch: LeadPagePatch): Promise<LeadPageConfig> => {
      const { data, error } = await rpc('update_quote_page', { p_patch: patch });
      if (error) throw new Error(error.message);
      return data as LeadPageConfig;
    },
    onSuccess: (data) => {
      qc.setQueriesData({ queryKey: leadPageConfigKey }, data);
      qc.invalidateQueries({ queryKey: ['employer-home'] });
    },
    onError: (e: Error) => {
      toast.error(e.message || 'Could not save');
    },
  });
};
