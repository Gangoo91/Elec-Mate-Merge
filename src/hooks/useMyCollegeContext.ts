import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { invalidateStudentQualification } from '@/hooks/useStudentQualification';

/* ==========================================================================
   useMyCollegeContext — WHO the signed-in user is to their college.

   One SECURITY DEFINER read (`get_my_college_context`) that returns:
     learner — college, cohort, course, qualification, tutor, dates, hours
     staff   — college, role, the cohorts this tutor owns, headline counts

   Why an RPC and not table reads: a learner cannot SELECT college_cohorts,
   college_courses or college_staff under RLS (those need college_role), so
   the apprentice side had no way to show its own cohort, course title or
   tutor. Every apprentice college surface should take its identity line
   from here rather than re-querying.

   Module-level cache keyed on the auth uid: the masthead, the hub card and
   the Study Centre strip all mount on the same screen and must not fire
   three RPCs. `refresh()` busts it (call after a successful join).
   ========================================================================== */

export interface LearnerCollegeContext {
  student_id: string;
  college_id: string;
  cohort_id: string | null;
  course_id: string | null;
  student_name: string | null;
  status: string | null;
  start_date: string | null;
  expected_end_date: string | null;
  otj_required_hours: number | null;
  college_name: string;
  college_code: string | null;
  cohort_name: string | null;
  cohort_start_date: string | null;
  cohort_end_date: string | null;
  course_name: string | null;
  course_code: string | null;
  course_level: string | null;
  qualification_id: string | null;
  qualification_code: string | null;
  qualification_title: string | null;
  awarding_body: string | null;
  tutor_name: string | null;
  tutor_user_id: string | null;
  tutor_staff_id: string | null;
  cohort_size: number | null;
}

export interface StaffCohortSummary {
  id: string;
  name: string;
  members: number;
}

export interface StaffCollegeContext {
  staff_id: string;
  college_id: string;
  role: string | null;
  name: string | null;
  college_name: string;
  college_code: string | null;
  my_cohorts: StaffCohortSummary[];
  cohort_count: number;
  learner_count: number;
  staff_count: number;
}

export interface MyCollegeContext {
  loading: boolean;
  error: string | null;
  learner: LearnerCollegeContext | null;
  staff: StaffCollegeContext | null;
  /** True when the user has a learner row at a college. */
  isLearner: boolean;
  /** True when the user has an active staff row at a college. */
  isStaff: boolean;
  refresh: () => Promise<void>;
}

type Payload = { learner: LearnerCollegeContext | null; staff: StaffCollegeContext | null };

const cache = new Map<string, Promise<Payload>>();
const listeners = new Set<() => void>();

async function load(): Promise<Payload> {
  const { data, error } = await supabase.rpc('get_my_college_context');
  if (error) throw error;
  const p = (data ?? {}) as Partial<Payload>;
  return { learner: p.learner ?? null, staff: p.staff ?? null };
}

function fetchFor(uid: string): Promise<Payload> {
  let p = cache.get(uid);
  if (!p) {
    p = load().catch((err) => {
      cache.delete(uid);
      throw err;
    });
    cache.set(uid, p);
  }
  return p;
}

/** Drop the cached context for everyone and re-render every subscriber. */
export function invalidateMyCollegeContext(): void {
  cache.clear();
  // Joining or leaving a college changes the qualification too.
  invalidateStudentQualification();
  listeners.forEach((fn) => fn());
}

const EMPTY: Payload = { learner: null, staff: null };

export function useMyCollegeContext(): MyCollegeContext {
  const { user } = useAuth();
  const uid = user?.id ?? null;
  const [payload, setPayload] = useState<Payload>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const bump = () => setTick((t) => t + 1);
    listeners.add(bump);
    return () => {
      listeners.delete(bump);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    if (!uid) {
      setPayload(EMPTY);
      setLoading(false);
      return;
    }
    setLoading(true);
    fetchFor(uid)
      .then((p) => {
        if (cancelled) return;
        setPayload(p);
        setError(null);
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setPayload(EMPTY);
        setError(err instanceof Error ? err.message : 'Could not load your college');
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [uid, tick]);

  const refresh = useCallback(async () => {
    invalidateMyCollegeContext();
  }, []);

  return {
    loading,
    error,
    learner: payload.learner,
    staff: payload.staff,
    isLearner: Boolean(payload.learner),
    isStaff: Boolean(payload.staff),
    refresh,
  };
}

/**
 * One-line identity for an apprentice: "Northgate Technical College · L2
 * Electrical 2025-A". Cohort first when present because that is the group
 * the learner actually sits in; the college alone is the fallback.
 */
export function learnerIdentityLine(l: LearnerCollegeContext | null): string | null {
  if (!l) return null;
  const parts = [l.college_name, l.cohort_name].filter(Boolean) as string[];
  return parts.length ? parts.join(' · ') : null;
}
