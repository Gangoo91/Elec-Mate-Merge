import { useEffect, useMemo, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

/* ==========================================================================
   useApprenticeIdentity — single source of "who am I" for the apprentice
   college hub. Resolves the auth user id (cheap, already in AuthContext)
   AND the apprentice's `college_students` row so cards don't each rerun
   that lookup independently.

   Module-level promise cache keyed on auth uid means the second card to
   mount on the same page hits memory, not Supabase. Cache invalidates when
   the auth uid changes.
   ========================================================================== */

export interface ApprenticeIdentity {
  authUid: string | null;
  collegeStudentId: string | null;
  collegeId: string | null;
  cohortId: string | null;
  courseId: string | null;
  loading: boolean;
  hasCollegeLink: boolean;
}

interface ResolvedIdentity {
  collegeStudentId: string | null;
  collegeId: string | null;
  cohortId: string | null;
  courseId: string | null;
}

const cache = new Map<string, Promise<ResolvedIdentity>>();

async function resolveForUid(uid: string): Promise<ResolvedIdentity> {
  const { data } = await supabase
    .from('college_students')
    .select('id, college_id, cohort_id, course_id')
    .eq('user_id', uid)
    .maybeSingle();
  const row = data as {
    id: string;
    college_id: string | null;
    cohort_id: string | null;
    course_id: string | null;
  } | null;
  return {
    collegeStudentId: row?.id ?? null,
    collegeId: row?.college_id ?? null,
    cohortId: row?.cohort_id ?? null,
    courseId: row?.course_id ?? null,
  };
}

function fetchIdentity(uid: string): Promise<ResolvedIdentity> {
  let p = cache.get(uid);
  if (!p) {
    p = resolveForUid(uid).catch((err) => {
      // Don't poison the cache on transient errors — drop the promise so
      // the next call retries.
      cache.delete(uid);
      throw err;
    });
    cache.set(uid, p);
  }
  return p;
}

export function useApprenticeIdentity(): ApprenticeIdentity {
  const { user } = useAuth();
  const authUid = user?.id ?? null;

  const [resolved, setResolved] = useState<ResolvedIdentity | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    if (!authUid) {
      setResolved(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    fetchIdentity(authUid)
      .then((r) => {
        if (!cancelled) {
          setResolved(r);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setResolved(null);
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [authUid]);

  return useMemo(
    () => ({
      authUid,
      collegeStudentId: resolved?.collegeStudentId ?? null,
      collegeId: resolved?.collegeId ?? null,
      cohortId: resolved?.cohortId ?? null,
      courseId: resolved?.courseId ?? null,
      loading,
      hasCollegeLink: Boolean(resolved?.collegeStudentId),
    }),
    [authUid, resolved, loading]
  );
}

/** Force-invalidate the cache for a uid — exposed for tests / sign-out flows. */
export function invalidateApprenticeIdentity(uid?: string) {
  if (uid) {
    cache.delete(uid);
  } else {
    cache.clear();
  }
}
