import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface DashboardPreference {
  hub_id: string;
  visible: boolean;
}

export function useDashboardPreferences() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: preferences = {}, isLoading } = useQuery({
    queryKey: ['dashboard-preferences', user?.id],
    queryFn: async () => {
      if (!user?.id) return {};

      const { data, error } = await (supabase as any)
        .from('dashboard_preferences')
        .select('hub_id, visible')
        .eq('user_id', user.id);

      if (error) return {};

      const prefs: Record<string, boolean> = {};
      (data as DashboardPreference[]).forEach((row) => {
        prefs[row.hub_id] = row.visible;
      });
      return prefs;
    },
    enabled: !!user?.id,
    staleTime: 5 * 60 * 1000,
  });

  const { mutate: toggleHub } = useMutation({
    mutationFn: async ({ hubId, visible }: { hubId: string; visible: boolean }) => {
      if (!user?.id) throw new Error('Not authenticated');

      const { error } = await (supabase as any)
        .from('dashboard_preferences')
        .upsert(
          {
            user_id: user.id,
            hub_id: hubId,
            visible,
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'user_id,hub_id' }
        );

      if (error) throw error;
    },
    onMutate: async ({ hubId, visible }) => {
      await queryClient.cancelQueries({ queryKey: ['dashboard-preferences', user?.id] });

      const previous = queryClient.getQueryData<Record<string, boolean>>([
        'dashboard-preferences',
        user?.id,
      ]);

      queryClient.setQueryData(['dashboard-preferences', user?.id], (old: Record<string, boolean> = {}) => ({
        ...old,
        [hubId]: visible,
      }));

      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(['dashboard-preferences', user?.id], context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard-preferences', user?.id] });
    },
  });

  const isHubVisible = (hubId: string): boolean => {
    // No preference row = visible by default
    return preferences[hubId] !== false;
  };

  return { preferences, isHubVisible, toggleHub, isLoading };
}
