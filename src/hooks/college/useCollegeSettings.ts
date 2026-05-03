import { useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

/* ==========================================================================
   useCollegeSettings — operational thresholds previously hardcoded in
   useIqaWorkflow / useOfstedSignals / useStudentsAtRisk / CohortEpaPage.

   Settings are per-college and editable by same-college staff (RLS via
   _ch_same_college). The hook seeds a row with sensible UK FE defaults
   on first read so consumers always get a value back.
   ========================================================================== */

export interface EpaVerdictBands {
  refer: [number, number];
  not_yet: [number, number];
  almost: [number, number];
  ready: [number, number];
}

export interface CollegeSettings {
  college_id: string;
  iqa_sampling_target_percent: number;
  audit_window_days: number;
  low_attendance_threshold_percent: number;
  high_attendance_threshold_percent: number;
  epa_verdict_bands: EpaVerdictBands;
  created_at: string;
  updated_at: string;
}

export const DEFAULT_COLLEGE_SETTINGS: Omit<
  CollegeSettings,
  'college_id' | 'created_at' | 'updated_at'
> = {
  iqa_sampling_target_percent: 10,
  audit_window_days: 90,
  low_attendance_threshold_percent: 80,
  high_attendance_threshold_percent: 90,
  epa_verdict_bands: {
    refer: [0, 25],
    not_yet: [25, 50],
    almost: [50, 75],
    ready: [75, 100],
  },
};

const QUERY_KEY = ['college-settings'];

export function useCollegeSettings() {
  const queryClient = useQueryClient();
  const { profile } = useAuth();
  const collegeId = profile?.college_id ?? null;

  // Realtime: same-college peers see updates within ~1s.
  useEffect(() => {
    if (!collegeId) return;
    const channel = supabase
      .channel(`college-settings:${collegeId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'college_settings',
          filter: `college_id=eq.${collegeId}`,
        },
        () => {
          queryClient.invalidateQueries({ queryKey: QUERY_KEY });
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [collegeId, queryClient]);

  const query = useQuery({
    queryKey: [...QUERY_KEY, collegeId],
    queryFn: async (): Promise<CollegeSettings> => {
      if (!collegeId) {
        return {
          college_id: '',
          ...DEFAULT_COLLEGE_SETTINGS,
          created_at: '',
          updated_at: '',
        };
      }
      const { data, error } = await supabase
        .from('college_settings')
        .select('*')
        .eq('college_id', collegeId)
        .maybeSingle();
      if (error) {
        console.error('useCollegeSettings: load failed:', error);
        // Fall back to defaults so the UI never blocks on this fetch.
        return {
          college_id: collegeId,
          ...DEFAULT_COLLEGE_SETTINGS,
          created_at: '',
          updated_at: '',
        };
      }
      if (data) {
        return data as CollegeSettings;
      }
      // No row yet — return defaults without seeding so an unauthenticated
      // peek doesn't accidentally write. Settings are seeded on first edit
      // via the upsert mutation below.
      return {
        college_id: collegeId,
        ...DEFAULT_COLLEGE_SETTINGS,
        created_at: '',
        updated_at: '',
      };
    },
    enabled: !!collegeId,
    staleTime: 60 * 1000,
  });

  const update = useMutation({
    mutationFn: async (
      patch: Partial<Omit<CollegeSettings, 'college_id' | 'created_at' | 'updated_at'>>
    ) => {
      if (!collegeId) throw new Error('No college context');
      const { data, error } = await supabase
        .from('college_settings')
        .upsert(
          {
            college_id: collegeId,
            ...DEFAULT_COLLEGE_SETTINGS,
            ...query.data,
            ...patch,
          },
          { onConflict: 'college_id' }
        )
        .select('*')
        .maybeSingle();
      if (error) throw error;
      return data as CollegeSettings;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });

  return {
    settings: query.data ?? {
      college_id: collegeId ?? '',
      ...DEFAULT_COLLEGE_SETTINGS,
      created_at: '',
      updated_at: '',
    },
    isLoading: query.isLoading,
    error: query.error as Error | null,
    update,
  };
}
