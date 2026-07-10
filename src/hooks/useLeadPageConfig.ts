import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface LeadPageConfig {
  lead_page_slug: string | null;
  lead_page_enabled: boolean;
  lead_page_headline: string | null;
  company_name: string | null;
}

export const useLeadPageConfig = () =>
  useQuery({
    queryKey: ['lead-page-config'],
    queryFn: async (): Promise<LeadPageConfig | null> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');
      const { data, error } = await supabase
        .from('company_profiles')
        .select('lead_page_slug, lead_page_enabled, lead_page_headline, company_name')
        .eq('user_id', user.id)
        .maybeSingle();
      if (error) throw error;
      return (data as LeadPageConfig) ?? null;
    },
  });

export const useUpdateLeadPage = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (updates: Partial<Omit<LeadPageConfig, 'company_name'>>) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Update the existing profile row, or create one if this owner has none
      // yet (there is no unique constraint on user_id, so we can't rely on upsert).
      const { data: existing, error: readErr } = await supabase
        .from('company_profiles')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();
      if (readErr) throw readErr;

      if (existing?.id) {
        const { error } = await supabase
          .from('company_profiles')
          .update(updates)
          .eq('id', existing.id);
        if (error) throw error;
      } else {
        // No profile row yet — create one. company_name is NOT NULL with no
        // default, so seed a sensible placeholder the owner can edit in Settings.
        const { error } = await supabase.from('company_profiles').insert({
          user_id: user.id,
          company_name: user.email?.split('@')[0] || 'My company',
          ...updates,
        });
        if (error) throw error;
      }
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['lead-page-config'] }),
    onError: (e: Error) => {
      if (/duplicate|unique/i.test(e.message)) {
        toast.error('That link name is already taken — try another.');
      } else {
        toast.error(e.message || 'Could not save');
      }
    },
  });
};
