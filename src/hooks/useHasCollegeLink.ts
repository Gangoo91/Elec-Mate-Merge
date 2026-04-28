import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

/* ==========================================================================
   useHasCollegeLink — true when the signed-in user has a row in either
   college_staff or college_students. Used to gate the "College Hub" link
   in the sidebar so any new tutor or apprentice automatically sees it
   without manually editing an email allowlist.

   Module-level cache keyed on auth uid keeps the lookup to once per session.
   ========================================================================== */

const cache = new Map<string, Promise<boolean>>();

async function resolve(uid: string): Promise<boolean> {
  // Check both tables in parallel — first match wins.
  const [staffRes, studentRes] = await Promise.all([
    supabase.from('college_staff').select('id').eq('user_id', uid).limit(1),
    supabase.from('college_students').select('id').eq('user_id', uid).limit(1),
  ]);
  return (staffRes.data ?? []).length > 0 || (studentRes.data ?? []).length > 0;
}

function fetchHasLink(uid: string): Promise<boolean> {
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

export function useHasCollegeLink(): { hasCollegeLink: boolean; loading: boolean } {
  const { user } = useAuth();
  const uid = user?.id ?? null;

  const [hasCollegeLink, setHasCollegeLink] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    if (!uid) {
      setHasCollegeLink(false);
      setLoading(false);
      return;
    }
    setLoading(true);
    fetchHasLink(uid)
      .then((v) => {
        if (!cancelled) {
          setHasCollegeLink(v);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setHasCollegeLink(false);
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [uid]);

  return { hasCollegeLink, loading };
}
