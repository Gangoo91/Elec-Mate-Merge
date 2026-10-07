import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchCollegeOtj, type CollegeOtjRow } from '@/hooks/useOtjSummary';

/**
 * Off-the-job hours for every learner the caller can see, keyed by
 * college_students.id. Same RPC as /college/otj (get_college_otj), so the
 * roster and the hours page can never disagree. counted / required is the
 * headline figure (get_otj_summary is THE figure, Andrew 6 Oct).
 */
export function useRosterOtj() {
  const { data = [], isLoading, error } = useQuery({
    queryKey: ['college-otj-roster'],
    staleTime: 60_000,
    queryFn: () => fetchCollegeOtj(null),
  });
  const byStudent = useMemo(() => {
    const m = new Map<string, CollegeOtjRow>();
    for (const r of data) m.set(r.college_student_id, r);
    return m;
  }, [data]);
  return { byStudent, rows: data, loading: isLoading, error: error as Error | null };
}

/** "412 / 1066h" style figure plus whether it is behind pace. */
export function otjFigure(row: CollegeOtjRow | undefined): { value: string; warn: boolean; good: boolean } {
  if (!row) return { value: '—', warn: false, good: false };
  const s = row.summary;
  const counted = Math.round(s?.counted_hours ?? 0);
  return {
    value: s?.required_hours ? `${counted}/${Math.round(s.required_hours)}h` : `${counted}h`,
    warn: s?.risk === 'behind' || s?.risk === 'slightly_behind',
    good: s?.risk === 'on_track',
  };
}
