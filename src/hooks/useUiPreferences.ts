import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

const PREF_KEYS = ['default_cert_type', 'autosave_drafts'] as const;
type PrefKey = (typeof PREF_KEYS)[number];

interface UiPreferences {
  default_cert_type: string;
  autosave_drafts: boolean;
}

const DEFAULTS: UiPreferences = {
  default_cert_type: 'eicr',
  autosave_drafts: true,
};

export function useUiPreferences() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: preferences = DEFAULTS, isLoading } = useQuery({
    queryKey: ['ui-preferences', user?.id],
    queryFn: async (): Promise<UiPreferences> => {
      if (!user?.id) return DEFAULTS;

      const { data, error } = await supabase
        .from('user_settings')
        .select('key, value')
        .eq('user_id', user.id)
        .in('key', [...PREF_KEYS]);

      if (error) return DEFAULTS;

      const prefs = { ...DEFAULTS };
      (data || []).forEach((row) => {
        if (row.key === 'default_cert_type' && typeof row.value === 'string') {
          prefs.default_cert_type = row.value;
        }
        if (row.key === 'autosave_drafts' && typeof row.value === 'boolean') {
          prefs.autosave_drafts = row.value;
        }
      });
      return prefs;
    },
    enabled: !!user?.id,
    staleTime: 5 * 60 * 1000,
  });

  const { mutate: setPreference } = useMutation({
    mutationFn: async ({ key, value }: { key: PrefKey; value: string | boolean }) => {
      if (!user?.id) throw new Error('Not authenticated');

      const { error } = await supabase.from('user_settings').upsert(
        {
          user_id: user.id,
          key,
          value,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'user_id,key' }
      );

      if (error) throw error;
    },
    onMutate: async ({ key, value }) => {
      await queryClient.cancelQueries({ queryKey: ['ui-preferences', user?.id] });

      const previous = queryClient.getQueryData<UiPreferences>(['ui-preferences', user?.id]);

      queryClient.setQueryData(['ui-preferences', user?.id], (old: UiPreferences = DEFAULTS) => ({
        ...old,
        [key]: value,
      }));

      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(['ui-preferences', user?.id], context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['ui-preferences', user?.id] });
    },
  });

  return { preferences, setPreference, isLoading };
}
