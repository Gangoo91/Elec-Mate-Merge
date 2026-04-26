import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

/* ==========================================================================
   useTutorTargets — for the quiz / assessment authoring sheets. Loads the
   cohorts and lesson plans the current tutor can target so the sheet UI
   can show real pickers instead of a single-learner-only flow.
   ========================================================================== */

export interface TargetCohort {
  id: string;
  name: string;
  course_name: string | null;
  member_count: number;
}

export interface TargetLessonPlan {
  id: string;
  title: string;
  cohort_id: string | null;
}

export function useTutorTargets() {
  const { user } = useAuth();
  const [cohorts, setCohorts] = useState<TargetCohort[]>([]);
  const [lessonPlans, setLessonPlans] = useState<TargetLessonPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [collegeId, setCollegeId] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    (async () => {
      setLoading(true);
      const { data: profile } = await supabase
        .from('profiles')
        .select('college_id')
        .eq('id', user.id)
        .maybeSingle();
      const cid = (profile as { college_id?: string | null } | null)?.college_id ?? null;
      if (cancelled) return;
      setCollegeId(cid);
      if (!cid) {
        setLoading(false);
        return;
      }

      const [cohortsRes, lessonsRes] = await Promise.all([
        supabase
          .from('college_cohorts')
          .select('id, name, course_id, status')
          .eq('college_id', cid)
          .neq('status', 'archived')
          .order('start_date', { ascending: false }),
        supabase
          .from('college_lesson_plans')
          .select('id, title, cohort_id')
          .eq('college_id', cid)
          .order('created_at', { ascending: false })
          .limit(50),
      ]);

      if (cancelled) return;

      const cohortRows = (cohortsRes.data ?? []) as Array<{
        id: string;
        name: string;
        course_id: string | null;
        status: string;
      }>;

      // Member counts + course names
      const courseIds = Array.from(
        new Set(cohortRows.map((c) => c.course_id).filter((c): c is string => !!c))
      );
      const cohortIds = cohortRows.map((c) => c.id);

      const [coursesRes, membersRes] = await Promise.all([
        courseIds.length > 0
          ? supabase.from('college_courses').select('id, name').in('id', courseIds)
          : Promise.resolve({ data: [] as Array<{ id: string; name: string }> }),
        cohortIds.length > 0
          ? supabase
              .from('college_students')
              .select('cohort_id, status')
              .in('cohort_id', cohortIds)
              .neq('status', 'withdrawn')
              .neq('status', 'completed')
          : Promise.resolve({ data: [] as Array<{ cohort_id: string | null }> }),
      ]);

      const courseNameById = new Map<string, string>();
      for (const c of ((coursesRes as { data: Array<{ id: string; name: string }> }).data ??
        [])) {
        courseNameById.set(c.id, c.name);
      }
      const memberCount = new Map<string, number>();
      for (const m of ((membersRes as { data: Array<{ cohort_id: string | null }> }).data ??
        [])) {
        if (!m.cohort_id) continue;
        memberCount.set(m.cohort_id, (memberCount.get(m.cohort_id) ?? 0) + 1);
      }

      if (cancelled) return;
      setCohorts(
        cohortRows.map((c) => ({
          id: c.id,
          name: c.name,
          course_name: c.course_id ? courseNameById.get(c.course_id) ?? null : null,
          member_count: memberCount.get(c.id) ?? 0,
        }))
      );
      setLessonPlans((lessonsRes.data ?? []) as TargetLessonPlan[]);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [user]);

  return { cohorts, lessonPlans, loading, collegeId };
}
