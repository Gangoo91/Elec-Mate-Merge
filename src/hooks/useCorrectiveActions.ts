/**
 * useCorrectiveActions
 *
 * Shared hook for corrective action tracking across all safety tools.
 * Works with: near_miss, accident, inspection, observation, permit, fire_watch, coshh
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export type SourceType =
  | 'near_miss'
  | 'accident'
  | 'inspection'
  | 'observation'
  | 'permit'
  | 'fire_watch'
  | 'coshh';
export type ActionStatus = 'open' | 'in_progress' | 'completed' | 'cancelled' | 'overdue';
export type ActionPriority = 'low' | 'medium' | 'high' | 'critical';

export interface CorrectiveAction {
  id: string;
  user_id: string;
  source_type: SourceType;
  source_id: string;
  action_description: string;
  assigned_to: string | null;
  priority: ActionPriority;
  target_date: string | null;
  completed_date: string | null;
  status: ActionStatus;
  evidence_notes: string | null;
  evidence_photos: string[];
  effectiveness_review: string | null;
  effectiveness_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateActionInput {
  source_type: SourceType;
  source_id: string;
  action_description: string;
  assigned_to?: string;
  priority?: ActionPriority;
  target_date?: string;
}

/** Fetch corrective actions for a specific source record */
export function useCorrectiveActions(sourceType: SourceType, sourceId: string) {
  return useQuery({
    queryKey: ['corrective-actions', sourceType, sourceId],
    queryFn: async (): Promise<CorrectiveAction[]> => {
      const { data, error } = await supabase
        .from('safety_corrective_actions')
        .select('*')
        .eq('source_type', sourceType)
        .eq('source_id', sourceId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return (data ?? []) as unknown as CorrectiveAction[];
    },
    enabled: !!sourceId,
    staleTime: 30_000,
  });
}

/** Fetch ALL corrective actions for the user (dashboard) */
export function useAllCorrectiveActions() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['corrective-actions', 'all'],
    queryFn: async (): Promise<CorrectiveAction[]> => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('safety_corrective_actions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return (data ?? []) as unknown as CorrectiveAction[];
    },
    enabled: !!user,
    staleTime: 30_000,
  });
}

/** Create a new corrective action */
export function useCreateCorrectiveAction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateActionInput) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('safety_corrective_actions')
        .insert({
          user_id: user.id,
          source_type: input.source_type,
          source_id: input.source_id,
          action_description: input.action_description,
          assigned_to: input.assigned_to || null,
          priority: input.priority || 'medium',
          target_date: input.target_date || null,
          status: 'open',
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['corrective-actions', variables.source_type, variables.source_id],
      });
      queryClient.invalidateQueries({ queryKey: ['corrective-actions', 'all'] });
      toast.success('Corrective action added');
    },
    onError: () => {
      toast.error('Failed to add corrective action');
    },
  });
}

/** Update a corrective action (status, completion, effectiveness) */
export function useUpdateCorrectiveAction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<CorrectiveAction> }) => {
      const { data, error } = await supabase
        .from('safety_corrective_actions')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['corrective-actions'] });
      toast.success('Action updated');
    },
  });
}

/** Delete a corrective action */
export function useDeleteCorrectiveAction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('safety_corrective_actions').delete().eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['corrective-actions'] });
      toast.success('Action deleted');
    },
  });
}

/** Get action stats for a source */
export function getActionStats(actions: CorrectiveAction[]) {
  return {
    total: actions.length,
    open: actions.filter((a) => a.status === 'open').length,
    inProgress: actions.filter((a) => a.status === 'in_progress').length,
    completed: actions.filter((a) => a.status === 'completed').length,
    overdue: actions.filter((a) => {
      if (a.status === 'completed' || a.status === 'cancelled') return false;
      if (!a.target_date) return false;
      return new Date(a.target_date) < new Date();
    }).length,
  };
}
