/**
 * The user's automation switches — `user_automations`, one row per automation.
 *
 * The consent boundary for anything the app does on a user's behalf. The
 * product's standing rule is that nothing customer-facing sends itself; each
 * exception is a switch the electrician flips here, per automation, default
 * off. Server-side jobs read the same table (the renewal-email cron sends only
 * for users whose `client_renewal_emails` row says `auto`), so this hook and
 * the cron can never disagree about what was consented to.
 */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export type AutomationMode = 'off' | 'ask' | 'auto';

/** Known automation keys. Server jobs match on these strings — never rename. */
export const AUTOMATION_KEYS = {
  clientRenewalEmails: 'client_renewal_emails',
} as const;

export function useAutomation(key: string) {
  const queryClient = useQueryClient();

  const { data: mode = 'off', isLoading } = useQuery({
    queryKey: ['user-automation', key],
    queryFn: async (): Promise<AutomationMode> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return 'off';

      const { data, error } = await supabase
        .from('user_automations')
        .select('mode')
        .eq('user_id', user.id)
        .eq('key', key)
        .maybeSingle();

      if (error) throw error;
      // No row means the user has never touched the switch — which is 'off',
      // the same answer the cron derives by finding no row.
      const value = data?.mode;
      return value === 'auto' || value === 'ask' ? value : 'off';
    },
  });

  const mutation = useMutation({
    mutationFn: async (next: AutomationMode) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not signed in');

      const { error } = await supabase
        .from('user_automations')
        .upsert(
          { user_id: user.id, key, mode: next, updated_at: new Date().toISOString() },
          { onConflict: 'user_id,key' }
        );
      if (error) throw error;
      return next;
    },
    onSuccess: (next) => {
      queryClient.setQueryData(['user-automation', key], next);
    },
    onError: (error: Error) => {
      toast({ title: `Could not save the setting: ${error.message}`, variant: 'destructive' });
      queryClient.invalidateQueries({ queryKey: ['user-automation', key] });
    },
  });

  return { mode, isLoading, setMode: mutation.mutate, saving: mutation.isPending };
}
