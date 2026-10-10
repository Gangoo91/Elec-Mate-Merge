import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { termsFor, type NationTerms, type UkNation } from '@/data/ukNationFrameworks';

/* ==========================================================================
   useCollegeNation (ELE-1976): which UK nation a college delivers in, and
   the words the hub should use there (programme, end assessment, readiness,
   off-the-job time). Null on the college reads as England.
   ========================================================================== */

export function useCollegeNation(collegeId: string | null | undefined): {
  nation: UkNation;
  set: boolean;
  terms: NationTerms;
} {
  const q = useQuery({
    queryKey: ['college-nation', collegeId ?? null],
    enabled: !!collegeId,
    staleTime: 10 * 60 * 1000,
    queryFn: async () => {
      const { data } = await supabase
        .from('colleges')
        .select('nation' as never)
        .eq('id', collegeId as string)
        .maybeSingle();
      return ((data as unknown as { nation: UkNation | null } | null)?.nation ??
        null) as UkNation | null;
    },
  });
  const nation = (q.data ?? 'england') as UkNation;
  return { nation, set: !!q.data, terms: termsFor(nation) };
}
