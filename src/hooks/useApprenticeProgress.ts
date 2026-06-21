import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   useApprenticeProgress — live college progress for the employer's linked
   apprentices. Reads the get_employer_apprentice_college_progress() RPC,
   which is scoped server-side to apprentices on this employer's books
   (employer_employees → college_students). Every figure is real college
   data — attendance, off-the-job hours, EPA status, last review — nothing
   is synthesised client-side.
   ========================================================================== */

export interface ApprenticeProgressRow {
  studentUserId: string;
  name: string;
  collegeName: string | null;
  courseName: string | null;
  progressPercent: number;
  attendancePercent: number;
  otjRequiredHours: number;
  otjVerifiedHours: number;
  otjOnTrack: boolean;
  epaStatus: string | null;
  lastReviewDate: string | null;
  reviewOverdue: boolean;
}

export function useApprenticeProgress() {
  return useQuery<ApprenticeProgressRow[]>({
    queryKey: ['apprentice-progress'],
    queryFn: async () => {
      // RPC is live in the DB but not yet in the generated Supabase types,
      // so the name is cast. Runtime is unaffected.
      const { data, error } = await supabase.rpc(
        'get_employer_apprentice_college_progress' as never
      );
      if (error) throw error;

      const rows = (data ?? []) as Array<Record<string, unknown>>;
      return rows.map((r) => ({
        studentUserId: String(r.student_user_id),
        name: (r.name as string) ?? 'Apprentice',
        collegeName: (r.college_name as string) ?? null,
        courseName: (r.course_name as string) ?? null,
        progressPercent: Number(r.progress_percent ?? 0),
        attendancePercent: Number(r.attendance_percent ?? 0),
        otjRequiredHours: Number(r.otj_required_hours ?? 0),
        otjVerifiedHours: Number(r.otj_verified_hours ?? 0),
        otjOnTrack: Boolean(r.otj_on_track),
        epaStatus: (r.epa_status as string) ?? null,
        lastReviewDate: (r.last_review_date as string) ?? null,
        reviewOverdue: Boolean(r.review_overdue),
      }));
    },
    staleTime: 60_000,
  });
}
