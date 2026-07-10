import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export type LeadStage = 'New' | 'Contacted' | 'Quoted' | 'Won' | 'Lost';
export const LEAD_STAGES: LeadStage[] = ['New', 'Contacted', 'Quoted', 'Won', 'Lost'];

export interface Lead {
  id: string;
  user_id: string;
  name: string;
  contact_name: string | null;
  email: string | null;
  phone: string | null;
  source: string | null;
  estimated_value: number;
  stage: LeadStage;
  notes: string | null;
  converted_client_id: string | null;
  converted_at: string | null;
  created_at: string;
  updated_at: string;
}

export type NewLead = {
  name: string;
  contact_name?: string | null;
  email?: string | null;
  phone?: string | null;
  source?: string | null;
  estimated_value?: number;
  stage?: LeadStage;
  notes?: string | null;
};

const KEY = ['employer-leads'];

export const useLeads = () =>
  useQuery({
    queryKey: KEY,
    queryFn: async (): Promise<Lead[]> => {
      const { data, error } = await supabase
        .from('employer_leads')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return (data || []) as Lead[];
    },
  });

export const useCreateLead = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: NewLead): Promise<Lead> => {
      const { data, error } = await supabase
        .from('employer_leads')
        .insert(input)
        .select()
        .single();
      if (error) throw error;
      return data as Lead;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: KEY });
      toast.success('Lead added');
    },
    onError: (e: Error) => toast.error(e.message),
  });
};

export const useUpdateLead = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<Lead> }) => {
      const { error } = await supabase
        .from('employer_leads')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: KEY }),
    onError: (e: Error) => toast.error(e.message),
  });
};

export const useDeleteLead = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('employer_leads').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: KEY });
      toast.success('Lead removed');
    },
    onError: (e: Error) => toast.error(e.message),
  });
};

/**
 * Turn a lead into a CRM client, stamp the link, and mark the lead Won —
 * atomically via the convert_lead RPC (idempotent: a retry returns the same
 * client rather than creating a duplicate).
 */
export const useConvertLead = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (lead: Lead) => {
      const rpc = supabase.rpc as unknown as (
        fn: string,
        args?: Record<string, unknown>
      ) => Promise<{ data: unknown; error: unknown }>;
      const { data, error } = await rpc('convert_lead', { p_lead_id: lead.id });
      if (error) throw error as Error;
      return data as string;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: KEY });
      qc.invalidateQueries({ queryKey: ['employer-clients'] });
      toast.success('Converted to client');
    },
    onError: (e: Error) => toast.error(e.message),
  });
};
