import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useMyCollegeContext } from '@/hooks/useMyCollegeContext';

/* ==========================================================================
   useCollegeLearners — the light learner list behind every "who?" picker in
   the workshop flows (observe, decide, message). One query, the tutor's own
   cohorts first, so the learner in front of them is a thumb away.

   Reads college_students under RLS (staff of the college) plus the cohort
   names. Withdrawn and completed learners are left out.
   ========================================================================== */

export interface PickerLearner {
  id: string;
  user_id: string | null;
  name: string;
  cohort_id: string | null;
  cohort_name: string | null;
  mine: boolean;
}

const GONE = new Set(['withdrawn', 'completed', 'archived']);

export function useCollegeLearners(enabled = true) {
  const { staff } = useMyCollegeContext();
  const collegeId = staff?.college_id ?? null;
  const mineIds = (staff?.my_cohorts ?? []).map((c) => c.id).join(',');

  return useQuery({
    queryKey: ['college-learner-picker', collegeId, mineIds],
    enabled: enabled && !!collegeId,
    staleTime: 60_000,
    queryFn: async (): Promise<PickerLearner[]> => {
      const [students, cohorts] = await Promise.all([
        supabase
          .from('college_students')
          .select('id, user_id, name, cohort_id, status')
          .eq('college_id', collegeId as string)
          .order('name', { ascending: true })
          .limit(2000),
        supabase
          .from('college_cohorts')
          .select('id, name')
          .eq('college_id', collegeId as string),
      ]);
      if (students.error) throw new Error(students.error.message);
      const cohortName = new Map(
        ((cohorts.data ?? []) as { id: string; name: string }[]).map((c) => [c.id, c.name])
      );
      const mine = new Set(mineIds.split(',').filter(Boolean));
      return ((students.data ?? []) as {
        id: string;
        user_id: string | null;
        name: string | null;
        cohort_id: string | null;
        status: string | null;
      }[])
        .filter((s) => !GONE.has((s.status ?? '').toLowerCase()))
        .map((s) => ({
          id: s.id,
          user_id: s.user_id,
          name: s.name?.trim() || 'Unnamed learner',
          cohort_id: s.cohort_id,
          cohort_name: s.cohort_id ? (cohortName.get(s.cohort_id) ?? null) : null,
          mine: !!s.cohort_id && mine.has(s.cohort_id),
        }))
        .sort((a, b) => Number(b.mine) - Number(a.mine) || a.name.localeCompare(b.name));
    },
  });
}
