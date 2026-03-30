/**
 * useObservationCampaigns
 *
 * CRUD hook for safety observation campaigns.
 * Campaigns set monthly targets for observation counts.
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export interface ObservationCampaign {
  id: string;
  user_id: string;
  title: string;
  target_count: number;
  start_date: string;
  end_date: string;
  focus_categories: string[];
  status: 'active' | 'completed' | 'cancelled';
  created_at: string;
}

export function useObservationCampaigns() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['observation-campaigns'],
    queryFn: async (): Promise<ObservationCampaign[]> => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('safety_observation_campaigns')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return (data ?? []) as unknown as ObservationCampaign[];
    },
    enabled: !!user,
    staleTime: 60_000,
  });
}

export function useCreateCampaign() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: {
      title: string;
      target_count: number;
      start_date: string;
      end_date: string;
      focus_categories?: string[];
    }) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('safety_observation_campaigns')
        .insert({
          user_id: user.id,
          ...input,
          focus_categories: input.focus_categories || [],
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['observation-campaigns'] });
      toast.success('Campaign created');
    },
  });
}
