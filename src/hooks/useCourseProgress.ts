/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

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

export function useCourseProgress() {
  const { user } = useAuth();
  const [allProgress, setAllProgress] = useState<CourseProgressRow[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProgress = useCallback(async () => {
    if (!user) {
      setAllProgress([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('course_progress' as any)
        .select('*')
        .eq('user_id', user.id)
        .order('last_accessed_at', { ascending: false });

      if (error) {
        // Table may not exist yet — fail silently
        console.error('Error fetching course progress:', error);
        return;
      }

      setAllProgress((data as unknown as CourseProgressRow[]) || []);
    } catch (err) {
      console.error('Error fetching course progress:', err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  const recordProgress = useCallback(
    async (
      courseKey: string,
      sectionKey: string | null,
      progressPct: number,
      completed?: boolean
    ) => {
      if (!user) return;

      const now = new Date().toISOString();
      const isCompleted = completed ?? progressPct >= 100;

      try {
        const { error } = await (supabase as any).from('course_progress').upsert(
          {
            user_id: user.id,
            course_key: courseKey,
            section_key: sectionKey,
            progress_pct: Math.min(100, Math.max(0, progressPct)),
            completed: isCompleted,
            last_accessed_at: now,
            updated_at: now,
          },
          { onConflict: 'user_id,course_key' }
        );

        if (error) {
          console.error('Error recording course progress:', error);
          return;
        }

        await fetchProgress();
      } catch (err) {
        console.error('Error recording course progress:', err);
      }
    },
    [user, fetchProgress]
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
    refetch: fetchProgress,
  };
}
