/**
 * useCustomInspectionTemplates
 *
 * CRUD hook for user-created inspection templates.
 * Templates can have multiple sections, each with configurable check items.
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export interface TemplateSection {
  id: string;
  title: string;
  items: { id: string; text: string }[];
}

export interface CustomInspectionTemplate {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  category: string;
  sections: TemplateSection[];
  regulation_reference: string | null;
  is_shared: boolean;
  usage_count: number;
  created_at: string;
  updated_at: string;
}

export interface CreateTemplateInput {
  title: string;
  description?: string;
  category?: string;
  sections: TemplateSection[];
  regulation_reference?: string;
}

export function useCustomInspectionTemplates() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['custom-inspection-templates'],
    queryFn: async (): Promise<CustomInspectionTemplate[]> => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('custom_inspection_templates')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return (data ?? []) as unknown as CustomInspectionTemplate[];
    },
    enabled: !!user,
    staleTime: 60_000,
  });
}

export function useCreateCustomTemplate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateTemplateInput) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('custom_inspection_templates')
        .insert({
          user_id: user.id,
          title: input.title,
          description: input.description || null,
          category: input.category || 'general',
          sections: input.sections,
          regulation_reference: input.regulation_reference || null,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['custom-inspection-templates'] });
      toast.success('Template created');
    },
    onError: () => {
      toast.error('Failed to create template');
    },
  });
}

export function useDeleteCustomTemplate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('custom_inspection_templates').delete().eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['custom-inspection-templates'] });
      toast.success('Template deleted');
    },
  });
}
