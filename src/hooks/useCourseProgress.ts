/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { QUERY_KEYS, QUERY_PRESETS } from '@/lib/queryConfig';

export interface CourseProgressRow {
  id: string;
  user_id: string;
  course_key: string;
  section_key: string | null;
  progress_pct: number;
  completed: boolean;
  last_accessed_at: string;
  created_at: string;
  updated_at: string;
}

// Shared cache via React Query: every ModuleCard on a course page calls this
// hook, but the queryKey dedupes them into a single Supabase request.
// Fixes Sentry JAVASCRIPT-REACT-6D (course_progress N+1 across 17+ courses).
export function useCourseProgress() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const userId = user?.id;
  const queryKey = [...QUERY_KEYS.COURSES, 'progress', userId] as const;

  const {
    data: allProgress = [],
    isLoading: loading,
    refetch,
  } = useQuery({
    queryKey,
    queryFn: async () => {
      if (!userId) return [] as CourseProgressRow[];
      const { data, error } = await supabase
        .from('course_progress' as any)
        .select('*')
        .eq('user_id', userId)
        .order('last_accessed_at', { ascending: false });

      if (error) {
        console.error('Error fetching course progress:', error);
        return [] as CourseProgressRow[];
      }

      return (data as unknown as CourseProgressRow[]) || [];
    },
    enabled: !!userId,
    ...QUERY_PRESETS.USER_DATA,
  });

  const recordMutation = useMutation({
    mutationFn: async (input: {
      courseKey: string;
      sectionKey: string | null;
      progressPct: number;
      completed?: boolean;
    }) => {
      if (!userId) return;
      const now = new Date().toISOString();
      const isCompleted = input.completed ?? input.progressPct >= 100;

      const { error } = await (supabase as any).from('course_progress').upsert(
        {
          user_id: userId,
          course_key: input.courseKey,
          section_key: input.sectionKey,
          progress_pct: Math.min(100, Math.max(0, input.progressPct)),
          completed: isCompleted,
          last_accessed_at: now,
          updated_at: now,
        },
        { onConflict: 'user_id,course_key,section_key' }
      );

      if (error) {
        console.error('Error recording course progress:', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  const recordProgress = useCallback(
    (courseKey: string, sectionKey: string | null, progressPct: number, completed?: boolean) => {
      return recordMutation.mutateAsync({ courseKey, sectionKey, progressPct, completed });
    },
    [recordMutation]
  );

  const lastAccessed = allProgress.length > 0 ? allProgress[0] : null;
  const completedCount = allProgress.filter((p) => p.completed).length;

  const getProgress = useCallback(
    (courseKey: string): CourseProgressRow | undefined => {
      return allProgress.find((p) => p.course_key === courseKey);
    },
    [allProgress]
  );

  return {
    allProgress,
    loading,
    recordProgress,
    lastAccessed,
    completedCount,
    getProgress,
    refetch,
  };
}
