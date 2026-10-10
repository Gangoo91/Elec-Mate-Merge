/* ==========================================================================
   Apprenticeship Units on the learner profile (ELE-2053).

   A learner whose course is an Apprenticeship Unit (ILR programme type 34)
   has no progress reviews and no gateway or EPA readiness: those belong to
   the full apprenticeship. The server already leaves them out of the review
   board and the inbox (public._college_student_is_unit); this hides the same
   sections on the profile and says why, in one place.
   ========================================================================== */

import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import { COLLEGE_CARD, COLLEGE_LINK } from '@/components/college/ui/CollegeUi';

/** True when the learner (college_students.id) is on an Apprenticeship Unit course. */
export function useIsUnitLearner(studentId: string | null | undefined): boolean {
  const { data } = useQuery({
    queryKey: ['college-unit-learner', studentId],
    enabled: !!studentId,
    staleTime: 60_000,
    queryFn: async () => {
      const { data: s } = await supabase
        .from('college_students')
        .select('course_id, cohort_id')
        .eq('id', studentId as string)
        .maybeSingle();
      if (!s) return false;
      let courseId = (s as { course_id: string | null }).course_id;
      if (!courseId && (s as { cohort_id: string | null }).cohort_id) {
        const { data: c } = await supabase
          .from('college_cohorts')
          .select('course_id')
          .eq('id', (s as { cohort_id: string }).cohort_id)
          .maybeSingle();
        courseId = (c as { course_id: string | null } | null)?.course_id ?? null;
      }
      if (!courseId) return false;
      const { data: cc } = await supabase
        .from('college_courses')
        .select('course_type' as never)
        .eq('id', courseId)
        .maybeSingle();
      return (
        (cc as unknown as { course_type: string | null } | null)?.course_type ===
        'apprenticeship_unit'
      );
    },
  });
  return data === true;
}

export function UnitProgrammeNote({ what }: { what: 'reviews' | 'gateway' }) {
  const navigate = useNavigate();
  return (
    <div className={cn(COLLEGE_CARD, 'space-y-1')} data-testid={`unit-note-${what}`}>
      <p className="text-[14.5px] font-semibold text-white">
        {what === 'reviews'
          ? 'No progress reviews on an Apprenticeship Unit'
          : 'No gateway on an Apprenticeship Unit'}
      </p>
      <p className="text-[13px] leading-relaxed text-white">
        {what === 'reviews'
          ? 'This learner is on an Apprenticeship Unit (ILR programme type 34), a short programme without the full apprenticeship’s progress reviews, so none are due or booked here.'
          : 'This learner is on an Apprenticeship Unit (ILR programme type 34). Gateway and end-point assessment readiness belong to the full apprenticeship, so they are switched off. Completion is recorded on the Apprenticeship units page.'}
      </p>
      <button type="button" className={COLLEGE_LINK} onClick={() => navigate('/college/units')}>
        Open Apprenticeship units
      </button>
    </div>
  );
}
