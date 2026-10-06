import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

/* ==========================================================================
   useHasCollegeLink — does the signed-in user have a row in college_staff
   and/or college_students? Used to gate and RESOLVE the college item in the
   sidebar: staff go to College Hub (/college); a student-only link goes to
   "My college" (/apprentice/college-plan), because the staff hub guard
   bounces anyone without profiles.college_id.

   Module-level cache keyed on auth uid keeps the lookup to once per session.
   ========================================================================== */

export interface CollegeLinkState {
  isStaff: boolean;
  isStudent: boolean;
}

export interface CollegeLink extends CollegeLinkState {
  /** True when the user has EITHER a staff or a student row. */
  hasCollegeLink: boolean;
  loading: boolean;
}

const NONE: CollegeLinkState = { isStaff: false, isStudent: false };

const cache = new Map<string, Promise<CollegeLinkState>>();

async function resolve(uid: string): Promise<CollegeLinkState> {
  // Check both tables in parallel.
  const [staffRes, studentRes] = await Promise.all([
    supabase.from('college_staff').select('id').eq('user_id', uid).limit(1),
    supabase.from('college_students').select('id').eq('user_id', uid).limit(1),
  ]);
  return {
    isStaff: (staffRes.data ?? []).length > 0,
    isStudent: (studentRes.data ?? []).length > 0,
  };
}

function fetchLink(uid: string): Promise<CollegeLinkState> {
  let p = cache.get(uid);
  if (!p) {
    p = resolve(uid).catch((err) => {
      cache.delete(uid);
      throw err;
    });
    cache.set(uid, p);
  }
  return p;
}

/** Drop the cached link for everyone — call after a successful join. */
export function invalidateHasCollegeLink(): void {
  cache.clear();
}

export function useHasCollegeLink(): CollegeLink {
  const { user } = useAuth();
  const uid = user?.id ?? null;

  const [state, setState] = useState<CollegeLinkState>(NONE);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    if (!uid) {
      setState(NONE);
      setLoading(false);
      return;
    }
    setLoading(true);
    fetchLink(uid)
      .then((v) => {
        if (!cancelled) {
          setState(v);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setState(NONE);
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [uid]);

  return {
    hasCollegeLink: state.isStaff || state.isStudent,
    isStaff: state.isStaff,
    isStudent: state.isStudent,
    loading,
  };
}
