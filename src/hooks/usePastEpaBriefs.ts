import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { EpaBrief } from '@/hooks/useEpaBrief';

/* ==========================================================================
   usePastEpaBriefs — reads college_epa_briefs (populated by ai-epa-brief).
   Lets tutors and learners revisit prior briefs to compare progression.
   ========================================================================== */

export interface PastEpaBrief {
  id: string;
  generated_for: 'learner' | 'tutor';
  brief: EpaBrief;
  signals_used: Record<string, unknown>;
  facets_used: number;
  created_at: string;
}

export function usePastEpaBriefs(collegeStudentId: string | null) {
  const [briefs, setBriefs] = useState<PastEpaBrief[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!collegeStudentId) {
      setBriefs([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const { data } = await supabase
      .from('college_epa_briefs')
      .select('id, generated_for, brief, signals_used, facets_used, created_at')
      .eq('college_student_id', collegeStudentId)
      .order('created_at', { ascending: false })
      .limit(20);
    setBriefs(((data ?? []) as unknown) as PastEpaBrief[]);
    setLoading(false);
  }, [collegeStudentId]);

  useEffect(() => {
    void load();
  }, [load]);

  return { briefs, loading, refresh: load };
}
