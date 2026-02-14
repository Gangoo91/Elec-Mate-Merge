import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export type ObservationStatus = 'open' | 'in_progress' | 'closed';
export type ObservationSeverity = 'low' | 'medium' | 'high';

export interface SafetyObservation {
  id: string;
  user_id: string;
  observation_type: 'positive' | 'improvement_needed';
  person_observed: string | null;
  category: string;
  description: string;
  location: string | null;
  severity: ObservationSeverity | null;
  photos: string[] | null;
  follow_up_required: boolean;
  status: ObservationStatus;
  assigned_to: string | null;
  due_date: string | null;
  completed_date: string | null;
  created_at: string;
}

export const OBSERVATION_CATEGORIES = [
  'PPE Usage',
  'Housekeeping',
  'Safe Working Practice',
  'Tool Handling',
  'Communication',
  'Risk Awareness',
  'Manual Handling',
  'Working at Height',
  'Electrical Safety',
  'Other',
];

export function useSafetyObservations() {
  return useQuery({
    queryKey: ['safety-observations'],
    queryFn: async (): Promise<SafetyObservation[]> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('safety_observations')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return (data ?? []) as unknown as SafetyObservation[];
    },
    staleTime: 30_000,
  });
}

export function useCreateObservation() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (observation: {
      observation_type: 'positive' | 'improvement_needed';
      person_observed?: string;
      category: string;
      description: string;
      location?: string;
      severity?: ObservationSeverity;
      photos?: string[];
    }) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('safety_observations')
        .insert({
          user_id: user.id,
          observation_type: observation.observation_type,
          person_observed: observation.person_observed,
          category: observation.category,
          description: observation.description,
          location: observation.location,
          severity: observation.severity ?? null,
          photos: observation.photos ?? [],
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['safety-observations'] });
      toast({
        title: 'Observation Recorded',
        description: 'Safety observation has been logged.',
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Could not save observation.',
        variant: 'destructive',
      });
    },
  });
}

export function useUpdateObservation() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({
      id,
      ...updates
    }: {
      id: string;
      status?: ObservationStatus;
      assigned_to?: string | null;
      due_date?: string | null;
      completed_date?: string | null;
      follow_up_required?: boolean;
    }) => {
      const { data, error } = await supabase
        .from('safety_observations')
        .update(updates as Record<string, unknown>)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['safety-observations'] });
      toast({ title: 'Observation Updated', description: 'Status has been updated.' });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Could not update observation.',
        variant: 'destructive',
      });
    },
  });
}
