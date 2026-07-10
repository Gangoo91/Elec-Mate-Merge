import { useQuery, useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface LeadPageData {
  found: boolean;
  company_name?: string;
  logo?: string | null;
  phone?: string | null;
  headline?: string | null;
}

const rpc = supabase.rpc as unknown as (
  fn: string,
  args?: Record<string, unknown>
) => Promise<{ data: unknown; error: unknown }>;

// Public: render the "Get a quote" page for a slug (only if the owner enabled it).
export const useLeadPage = (slug: string | undefined) =>
  useQuery({
    queryKey: ['lead-page', slug],
    enabled: !!slug,
    retry: false,
    staleTime: 1000 * 60 * 5,
    queryFn: async (): Promise<LeadPageData> => {
      if (!slug) return { found: false };
      const { data, error } = await rpc('get_lead_page', { p_slug: slug });
      if (error) throw error as Error;
      return (data as LeadPageData) ?? { found: false };
    },
  });

// Public: submit an enquiry → new lead in the owner's pipeline.
export const useSubmitEnquiry = () =>
  useMutation({
    mutationFn: async (input: {
      slug: string;
      name: string;
      email: string;
      phone: string;
      summary: string;
    }) => {
      const { data, error } = await rpc('submit_lead_enquiry', {
        p_slug: input.slug,
        p_name: input.name,
        p_email: input.email,
        p_phone: input.phone,
        p_summary: input.summary,
      });
      if (error) throw error as Error;
      if (!data) throw new Error('Could not send your enquiry. Please check the details and try again.');
      return data as boolean;
    },
  });
