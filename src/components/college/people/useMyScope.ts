import { useCallback, useMemo } from 'react';
import type { CollegeCohort, CollegeStaff, CollegeStudent } from '@/contexts/CollegeSupabaseContext';
import { useAuth } from '@/contexts/AuthContext';
import { narrowIfCollege, useCollegeScope } from '@/components/college/scope/useCollegeScope';

/* ==========================================================================
   useMyScope — "mine first, college second, one switch" (ELE-1886).

   A People-shaped view over the ONE College Hub setting (useCollegeScope):
   Mine, My cohorts or Whole college, picked in the masthead and saved to the
   tutor's account. `scope` is 'mine' for either narrowed level; the id sets
   follow the level, so `scope === 'mine' ? filter(myStudentIds)` shows the
   right learners on every People screen without each one knowing the level.

   Which learners are MINE is decided by the data, never by a role name: see
   useCollegeScope.
   ========================================================================== */

export type PeopleScope = 'mine' | 'college';

export function useMyScope({
  staff,
}: {
  staff: CollegeStaff[];
  students: CollegeStudent[];
  cohorts: CollegeCohort[];
}) {
  const { user } = useAuth();
  const uid = user?.id ?? null;
  const { level, setLevel, ready, membership } = useCollegeScope();

  const me = useMemo(() => staff.find((s) => uid && s.user_id === uid) ?? null, [staff, uid]);
  const set = level === 'cohorts' ? membership.cohorts : membership.mine;
  const myStudentIds = set.studentIds;
  const myCohortIds = set.cohortIds;

  const scope: PeopleScope = level === 'college' ? 'college' : 'mine';
  const setScope = useCallback(
    (s: PeopleScope) => (s === 'college' ? setLevel('college') : narrowIfCollege(setLevel, level)),
    [setLevel, level]
  );

  return {
    scope,
    setScope,
    level,
    setLevel,
    hasMine: membership.hasAny,
    ready,
    me,
    myStudentIds,
    myCohortIds,
    isMineStudent: (id: string) => membership.mine.studentIds.has(id),
    isMineCohort: (id: string) => myCohortIds.has(id),
  };
}
