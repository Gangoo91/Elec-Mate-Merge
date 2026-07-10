import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const onErr = (e: Error) => toast.error(e.message || 'Something went wrong');

export interface ClientReview {
  id: string;
  client_id: string;
  job_id: string | null;
  rating: number | null;
  text: string | null;
  requested_at: string | null;
  received_at: string | null;
  is_public: boolean;
  created_at: string;
}

export const useClientReviews = (clientId: string | undefined) =>
  useQuery({
    queryKey: ['client-reviews', clientId],
    enabled: !!clientId,
    queryFn: async (): Promise<ClientReview[]> => {
      const { data, error } = await supabase
        .from('client_reviews')
        .select('*')
        .eq('client_id', clientId!)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return (data || []) as ClientReview[];
    },
  });

export const useAddReview = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: {
      client_id: string;
      rating: number;
      text: string | null;
      received_at?: string;
    }) => {
      const { error } = await supabase
        .from('client_reviews')
        .insert({ ...input, received_at: input.received_at ?? new Date().toISOString() });
      if (error) throw error;
    },
    onSuccess: (_d, vars) => {
      qc.invalidateQueries({ queryKey: ['client-reviews', vars.client_id] });
      qc.invalidateQueries({ queryKey: ['employer-clients'] });
    },
    onError: onErr,
  });
};

export const useDeleteReview = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('client_reviews').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['client-reviews'] }),
    onError: onErr,
  });
};
