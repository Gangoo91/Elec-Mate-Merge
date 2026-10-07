import { useMemo } from 'react';
import { inScopeSet, useCollegeScope } from '@/components/college/scope/useCollegeScope';

/* ==========================================================================
   useMyLearners — who is "mine" for the signed-in tutor (ELE-1886).

   A thin view over the ONE College Hub scope (useCollegeScope): the sets
   follow the masthead switch. On "My cohorts" they are everyone in my
   cohorts; on "Mine" or "Whole college" they are my own learners (on the
   whole college they only drive the "Yours" badge). The sets carry both id
   spaces so a screen can match whatever its rows hold:
     - cohortIds        college_cohorts.id
     - studentIds       college_students.id
     - learnerUserIds   college_students.user_id (auth uid)
     - cohortNames      cohort names, for rows that only carry a name
   ========================================================================== */

export interface MyLearners {
  loading: boolean;
  staffId: string | null;
  cohortIds: Set<string>;
  cohortNames: Set<string>;
  studentIds: Set<string>;
  learnerUserIds: Set<string>;
  /** True when this tutor has any cohort or assigned learner, so "mine" means something. */
  hasCohorts: boolean;
  /** Does a row belong to the current narrowed view? Pass whatever ids the row has. */
  isMine: (row: {
    studentId?: string | null;
    userId?: string | null;
    cohortId?: string | null;
    cohortName?: string | null;
  }) => boolean;
}

export function useMyLearners(): MyLearners {
  const { level, membership } = useCollegeScope();
  return useMemo(() => {
    const set = level === 'cohorts' ? membership.cohorts : membership.mine;
    return {
      loading: membership.loading,
      staffId: membership.staffId,
      cohortIds: set.cohortIds,
      cohortNames: set.cohortNames,
      studentIds: set.studentIds,
      learnerUserIds: set.userIds,
      hasCohorts: membership.hasAny,
      isMine: (r) => inScopeSet(set, r),
    };
  }, [level, membership]);
}
