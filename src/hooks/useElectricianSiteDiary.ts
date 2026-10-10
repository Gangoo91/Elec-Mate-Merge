import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import {
  applySafetyScope,
  firmWriteErrorMessage,
  isFirmScope,
  safetyScopeKey,
  stampSafetyInsert,
  useSafetyScope,
  type FirmRecordFields,
} from '@/components/electrician-tools/site-safety/common/SafetyScope';

export interface SiteDiaryEntry extends FirmRecordFields {
  id: string;
  user_id: string;
  entry_date: string;
  site_name: string;
  site_address: string | null;
  weather: string | null;
  start_time: string | null;
  end_time: string | null;
  personnel_count: number | null;
  work_completed: string | null;
  issues: string | null;
  delays: string | null;
  materials_used: string | null;
  photos: string[];
  rams_ids: string[];
  permit_ids: string[];
  notes: string | null;
  recorder_signature: string | null;
  recorder_name: string | null;
  /** Added by 20261006121500_site_diary_job_link.sql (applied 6 Oct 2026). */
  job_id?: string | null;
  created_at: string;
  updated_at: string;
}

export function useElectricianSiteDiary() {
  // Personal: the user's own diary. Employer Hub: the firm's (employer_id).
  const scope = useSafetyScope();
  return useQuery({
    queryKey: ['electrician-site-diary', ...safetyScopeKey(scope)],
    queryFn: async (): Promise<SiteDiaryEntry[]> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await applySafetyScope(
        supabase.from('electrician_site_diary').select('*'),
        scope,
        user.id
      ).order('entry_date', { ascending: false });

      if (error) throw error;
      return (data ?? []) as unknown as SiteDiaryEntry[];
    },
    staleTime: 30_000,
  });
}

export function useCreateDiaryEntry() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const scope = useSafetyScope();

  return useMutation({
    mutationFn: async (
      entry: Omit<SiteDiaryEntry, 'id' | 'user_id' | 'created_at' | 'updated_at'>
    ) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('electrician_site_diary')
        // Firm scope stamps employer_id; the database checks it either way.
        // employer_* columns are live but not yet in the generated types.
        .insert(stampSafetyInsert({ user_id: user.id, ...entry }, scope) as never)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['electrician-site-diary'] });
      toast({
        title: 'Diary Entry Saved',
        description: 'Site diary entry has been recorded.',
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Could not save diary entry.',
        variant: 'destructive',
      });
    },
  });
}

export function useUpdateDiaryEntry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<SiteDiaryEntry> & { id: string }) => {
      const { data, error } = await supabase
        .from('electrician_site_diary')
        // employer_* columns are live but not yet in the generated types.
        .update({ ...updates, updated_at: new Date().toISOString() } as never)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['electrician-site-diary'] });
    },
  });
}

export function useDeleteDiaryEntry() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const scope = useSafetyScope();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('electrician_site_diary').delete().eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['electrician-site-diary'] });
      toast({
        title: 'Entry Deleted',
        description: 'Site diary entry has been removed.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        // Personal scope keeps its message; firm scope says why a write was blocked.
        description: isFirmScope(scope)
          ? firmWriteErrorMessage(scope, error)
          : 'Could not delete diary entry.',
        variant: 'destructive',
      });
    },
  });
}
