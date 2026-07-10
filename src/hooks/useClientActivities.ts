import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export type ActivityType = 'note' | 'call' | 'email' | 'meeting';

export interface ClientActivity {
  id: string;
  client_id: string;
  type: ActivityType;
  summary: string;
  created_at: string;
}

export const useClientActivities = (clientId: string | undefined) =>
  useQuery({
    queryKey: ['client-activities', clientId],
    enabled: !!clientId,
    queryFn: async (): Promise<ClientActivity[]> => {
      const { data, error } = await supabase
        .from('client_activities')
        .select('*')
        .eq('client_id', clientId!)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return (data || []) as ClientActivity[];
    },
  });

export const useLogClientActivity = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: { client_id: string; type: ActivityType; summary: string }) => {
      const { error } = await supabase.from('client_activities').insert(input);
      if (error) throw error;
    },
    onSuccess: (_d, vars) => {
      qc.invalidateQueries({ queryKey: ['client-activities', vars.client_id] });
      qc.invalidateQueries({ queryKey: ['employer-clients'] });
    },
    onError: (e: Error) => toast.error(e.message || 'Could not log activity'),
  });
};
