import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   useCollegeStudentSummaries — one server-side aggregation per college student
   (OTJ minutes, portfolio counts, AC coverage, attendance, risk) via the
   college_student_summaries RPC. Replaces per-student fan-out + JS aggregation
   on the surfaces that show these signals. Scoped + authorised inside the RPC
   (_ch_same_college), so only same-college staff get rows.
   ========================================================================== */

export function useCollegeStudentSummaries(collegeId?: string) {
  return useQuery({
    queryKey: ['college-student-summaries', collegeId],
    queryFn: async () => {
      if (!collegeId) return [];
      const { data, error } = await supabase.rpc('college_student_summaries', {
        p_college_id: collegeId,
      });
      if (error) throw error;
      return data ?? [];
    },
    enabled: !!collegeId,
    staleTime: 30000,
  });
}
