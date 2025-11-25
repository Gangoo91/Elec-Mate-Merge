import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { EditableProjectPlan, SavedProjectPlan } from '@/types/projectPlan';
import { useToast } from '@/hooks/use-toast';

export const useProjectPlanCloud = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch all saved project plans for current user
  const { data: savedPlans, isLoading } = useQuery({
    queryKey: ['user-project-plans'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_project_plans')
        .select('*')
        .order('updated_at', { ascending: false });

      if (error) throw error;
      
      // Map database response to SavedProjectPlan type
      return (data || []).map(item => ({
        id: item.id,
        projectName: item.project_name,
        clientName: item.client_name || undefined,
        location: item.location || undefined,
        startDate: item.start_date || undefined,
        status: item.status as 'draft' | 'active' | 'completed' | 'archived',
        planData: item.plan_data as unknown as EditableProjectPlan,
        createdAt: item.created_at,
        updatedAt: item.updated_at,
      })) as SavedProjectPlan[];
    },
  });

  // Save project plan
  const savePlanMutation = useMutation({
    mutationFn: async (planData: {
      projectName: string;
      clientName?: string;
      location?: string;
      startDate?: string;
      status?: 'draft' | 'active' | 'completed' | 'archived';
      plan: EditableProjectPlan;
    }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('user_project_plans')
        .insert({
          user_id: user.id,
          project_name: planData.projectName,
          client_name: planData.clientName,
          location: planData.location,
          start_date: planData.startDate,
          status: planData.status || 'draft',
          plan_data: planData.plan as any,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-project-plans'] });
      toast({
        title: 'Project saved',
        description: 'Your project plan has been saved successfully.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Failed to save project',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Update project plan
  const updatePlanMutation = useMutation({
    mutationFn: async ({ id, updates }: {
      id: string;
      updates: Partial<{
        projectName: string;
        clientName?: string;
        location?: string;
        startDate?: string;
        status?: 'draft' | 'active' | 'completed' | 'archived';
        plan: EditableProjectPlan;
      }>;
    }) => {
      const updateData: any = {};
      if (updates.projectName) updateData.project_name = updates.projectName;
      if (updates.clientName) updateData.client_name = updates.clientName;
      if (updates.location) updateData.location = updates.location;
      if (updates.startDate) updateData.start_date = updates.startDate;
      if (updates.status) updateData.status = updates.status;
      if (updates.plan) updateData.plan_data = updates.plan;

      const { data, error } = await supabase
        .from('user_project_plans')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-project-plans'] });
      toast({
        title: 'Project updated',
        description: 'Your changes have been saved.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Failed to update project',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Delete project plan
  const deletePlanMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('user_project_plans')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-project-plans'] });
      toast({
        title: 'Project deleted',
        description: 'The project has been removed.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Failed to delete project',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Load specific project plan
  const loadPlanMutation = useMutation({
    mutationFn: async (id: string) => {
      const { data, error } = await supabase
        .from('user_project_plans')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      
      // Map database response to SavedProjectPlan type
      return {
        id: data.id,
        projectName: data.project_name,
        clientName: data.client_name || undefined,
        location: data.location || undefined,
        startDate: data.start_date || undefined,
        status: data.status as 'draft' | 'active' | 'completed' | 'archived',
        planData: data.plan_data as unknown as EditableProjectPlan,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      } as SavedProjectPlan;
    },
  });

  return {
    savedPlans,
    isLoading,
    savePlan: savePlanMutation.mutate,
    isSaving: savePlanMutation.isPending,
    updatePlan: updatePlanMutation.mutate,
    isUpdating: updatePlanMutation.isPending,
    deletePlan: deletePlanMutation.mutate,
    isDeleting: deletePlanMutation.isPending,
    loadPlan: loadPlanMutation.mutateAsync,
    isLoadingPlan: loadPlanMutation.isPending,
  };
};
