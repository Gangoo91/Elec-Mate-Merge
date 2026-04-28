import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   useSeededQualifications — returns the qualifications catalogue with the
   `is_curriculum_seeded` + `ac_count` flags so dropdowns can hide / badge
   shells that have no LO/AC data. Without this, tutors could assign learners
   to a qualification with zero ACs and the AI would silently fail to ground
   anything.
   ========================================================================== */

export interface SeededQualification {
  id: string;
  code: string;
  title: string;
  level: string | null;
  awarding_body: string | null;
  ac_count: number;
  is_curriculum_seeded: boolean;
}

export function useSeededQualifications() {
  const [quals, setQuals] = useState<SeededQualification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data } = await supabase
        .from('qualifications')
        .select('id, code, title, level, awarding_body, ac_count, is_curriculum_seeded')
        .order('is_curriculum_seeded', { ascending: false })
        .order('ac_count', { ascending: false });
      if (cancelled) return;
      setQuals((data ?? []) as SeededQualification[]);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return {
    quals,
    seeded: quals.filter((q) => q.is_curriculum_seeded),
    unseeded: quals.filter((q) => !q.is_curriculum_seeded),
    loading,
  };
}
