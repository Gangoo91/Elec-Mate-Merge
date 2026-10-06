/**
 * useStudentQualification
 *
 * The app side of the ONE qualification resolver (ELE-1866). Every learner
 * screen asks this hook; the hook asks `resolve_learner_qualification`, which
 * is the same function the coverage seed and the evidence sync triggers use.
 * So the code a screen counts against is always the code evidence is written to.
 *
 * Rule (defined once, in SQL — supabase/migrations/20261006174000_one_qualification_resolver.sql):
 *   1. The college course (the learner's course, else their cohort's course).
 *   2. Otherwise the learner's own active selection.
 *   3. Otherwise nothing.
 * The id, code and title always come from the same qualifications row.
 * `qualificationCode` is the requirement code that holds the LO/AC rows
 * (e.g. 603/3895/8 → 601/7345/2); `enrolmentCode` is the code as enrolled.
 *
 * Callers mounting together share one in-flight request; nothing is cached
 * after it settles, so a course change shows on the next mount.
 */

import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface ResolvedRow {
  source: 'college_course' | 'learner_selection' | 'none';
  qualification_id: string | null;
  code: string | null;
  requirement_code: string | null;
  title: string | null;
  level: string | null;
  awarding_body: string | null;
  course_id: string | null;
  course_code: string | null;
  course_name: string | null;
  college_student_id: string | null;
  selection_code: string | null;
  diverges_from_selection: boolean | null;
}

export interface StudentQualification {
  /** Requirement code: the code qualification_requirements and coverage are keyed on. */
  qualificationCode: string | null;
  /** The qualification code as enrolled / selected (before mapping). */
  enrolmentCode: string | null;
  qualificationName: string | null;
  /** qualifications.id of the same row the code came from. */
  qualificationId: string | null;
  qualificationLevel: string | null;
  /** The college course code, when the learner is on a college course. */
  collegeCourseCode: string | null;
  collegeCourseName: string | null;
  /** True when the learner's own selection differs from their college course. */
  divergesFromCollege: boolean;
  /** The learner's own selection code, if any. */
  selectionCode: string | null;
  source: 'college' | 'selection' | null;
  isLoading: boolean;
}

type Resolved = Omit<StudentQualification, 'isLoading'>;

const EMPTY: Resolved = {
  qualificationCode: null,
  enrolmentCode: null,
  qualificationName: null,
  qualificationId: null,
  qualificationLevel: null,
  collegeCourseCode: null,
  collegeCourseName: null,
  divergesFromCollege: false,
  selectionCode: null,
  source: null,
};

const cache = new Map<string, Promise<Resolved>>();

/** Drop the cached answer (after joining a college, changing course or selection). */
export function invalidateStudentQualification(userId?: string) {
  if (userId) cache.delete(userId);
  else cache.clear();
}

function toResolved(row: ResolvedRow | null): Resolved {
  if (!row || row.source === 'none') return EMPTY;
  return {
    qualificationCode: row.requirement_code ?? row.code,
    enrolmentCode: row.code,
    qualificationName: row.title ?? row.course_name,
    qualificationId: row.qualification_id,
    qualificationLevel: row.level,
    collegeCourseCode: row.course_code,
    collegeCourseName: row.course_name,
    divergesFromCollege: !!row.diverges_from_selection,
    selectionCode: row.selection_code,
    source: row.source === 'college_course' ? 'college' : 'selection',
  };
}

/** Resolve for any learner the caller may see (self, or staff at their college). */
export async function resolveLearnerQualification(args: {
  userId?: string | null;
  collegeStudentId?: string | null;
}): Promise<Resolved> {
  const { data, error } = await (
    supabase.rpc.bind(supabase) as unknown as (
      fn: string,
      params: Record<string, unknown>
    ) => Promise<{ data: ResolvedRow | null; error: { message: string } | null }>
  )('resolve_learner_qualification', {
    p_user_id: args.userId ?? null,
    p_student_id: args.collegeStudentId ?? null,
  });
  if (error) throw new Error(error.message);
  return toResolved(data);
}

export function useStudentQualification(): StudentQualification {
  const { user } = useAuth();
  const [state, setState] = useState<Resolved>(EMPTY);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setState(EMPTY);
      setIsLoading(false);
      return;
    }
    let cancelled = false;
    setIsLoading(true);
    // Share one in-flight request between the many callers mounting together,
    // but keep nothing afterwards, so a course change or a college join is
    // picked up on the next mount without any invalidation call.
    const userId = user.id;
    let pending = cache.get(userId);
    if (!pending) {
      pending = resolveLearnerQualification({ userId });
      cache.set(userId, pending);
      const settled = pending;
      settled.finally(() => {
        if (cache.get(userId) === settled) cache.delete(userId);
      }).catch(() => undefined);
    }
    pending
      .then((r) => {
        if (cancelled) return;
        if (r.divergesFromCollege) {
          console.warn(
            `[useStudentQualification] own selection "${r.selectionCode}" differs from college course "${r.enrolmentCode}"; using the college course.`
          );
        }
        setState(r);
      })
      .catch(() => {
        if (!cancelled) setState(EMPTY);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [user]);

  return { ...state, isLoading };
}
