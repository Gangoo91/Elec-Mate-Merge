import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   useCohortNeighbors — given a college_student id, return prev/next learners
   in the same cohort (or college, fallback). Used by the Student 360
   header for keyboard-driven learner switching.
   ========================================================================== */

export interface NeighborStudent {
  id: string;
  name: string;
}

export function useCohortNeighbors(currentStudentId: string | null) {
  const [prev, setPrev] = useState<NeighborStudent | null>(null);
  const [next, setNext] = useState<NeighborStudent | null>(null);
  const [position, setPosition] = useState<{ index: number; total: number } | null>(null);

  useEffect(() => {
    if (!currentStudentId) {
      setPrev(null);
      setNext(null);
      setPosition(null);
      return;
    }
    let cancelled = false;
    (async () => {
      // Find current student's cohort + college
      const { data: cur } = await supabase
        .from('college_students')
        .select('id, name, cohort_id, college_id, status')
        .eq('id', currentStudentId)
        .maybeSingle();
      if (cancelled) return;
      const row = cur as { cohort_id: string | null; college_id: string | null } | null;
      if (!row?.college_id) {
        setPrev(null);
        setNext(null);
        setPosition(null);
        return;
      }
      // Same cohort if available, else same college
      let q = supabase
        .from('college_students')
        .select('id, name, cohort_id')
        .eq('college_id', row.college_id)
        .neq('status', 'withdrawn')
        .neq('status', 'completed')
        .order('name', { ascending: true });
      if (row.cohort_id) q = q.eq('cohort_id', row.cohort_id);
      const { data: all } = await q;
      if (cancelled) return;
      const list = ((all ?? []) as NeighborStudent[]);
      const idx = list.findIndex((s) => s.id === currentStudentId);
      if (idx < 0) {
        setPrev(null);
        setNext(null);
        setPosition(null);
        return;
      }
      setPrev(idx > 0 ? list[idx - 1] : null);
      setNext(idx < list.length - 1 ? list[idx + 1] : null);
      setPosition({ index: idx + 1, total: list.length });
    })();
    return () => {
      cancelled = true;
    };
  }, [currentStudentId]);

  return { prev, next, position };
}
