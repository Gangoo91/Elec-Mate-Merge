/**
 * Apprentices a college has recorded with THIS firm as their employer, who are
 * not (yet) on the firm's team (ELE-1955).
 *
 * The match is the college's employer contact email against the firm owner's,
 * a manager's, or the company profile's email — the college named the firm, so
 * the firm can see the apprentice's name, course and when their review is due.
 * Nothing else from the college record (no hours, no attendance) leaves it
 * until the apprentice joins the team.
 *
 * "Add to your team" creates a roster row with their email and NO account link;
 * the apprentice links it themselves by accepting the invite. We never link a
 * roster row to someone else's account.
 */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface UnrosteredApprentice {
  studentId: string;
  firmId: string;
  name: string;
  email: string | null;
  collegeName: string | null;
  courseName: string | null;
  hasAccount: boolean;
  reviewDue: string | null;
  reviewOverdue: boolean;
  /** A roster row already made for their email (invite sent, not joined yet). */
  invitedRosterId: string | null;
  lastNudgedAt: string | null;
}

interface Row {
  student_id: string;
  firm_id: string;
  name: string | null;
  email: string | null;
  college_name: string | null;
  course_name: string | null;
  has_account: boolean | null;
  review_due: string | null;
  review_overdue: boolean | null;
  invited_roster_id: string | null;
  last_nudged_at: string | null;
}

export const UNROSTERED_APPRENTICES_KEY = ['unrostered-apprentices'] as const;

export function useUnrosteredApprentices() {
  return useQuery({
    queryKey: UNROSTERED_APPRENTICES_KEY,
    queryFn: async (): Promise<UnrosteredApprentice[]> => {
      const { data, error } = await supabase.rpc(
        'get_employer_unrostered_apprentices' as never
      );
      if (error) throw error;
      return ((data as unknown as Row[] | null) ?? []).map((r) => ({
        studentId: r.student_id,
        firmId: r.firm_id,
        name: r.name?.trim() || 'Apprentice',
        email: r.email,
        collegeName: r.college_name,
        courseName: r.course_name,
        hasAccount: Boolean(r.has_account),
        reviewDue: r.review_due,
        reviewOverdue: Boolean(r.review_overdue),
        invitedRosterId: r.invited_roster_id,
        lastNudgedAt: r.last_nudged_at,
      }));
    },
    staleTime: 60 * 1000,
  });
}

export type NudgeResult =
  | { sent: true }
  | { sent: false; reason: 'no_account' }
  | { sent: false; reason: 'recent'; last_nudged_at: string };

/** Ask an apprentice with no roster row to arrange their progress review. */
export function useNudgeApprenticeReview() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (studentId: string): Promise<NudgeResult> => {
      const { data, error } = await supabase.rpc('nudge_apprentice_review' as never, {
        p_student: studentId,
      } as never);
      if (error) throw error;
      return data as unknown as NudgeResult;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: [...UNROSTERED_APPRENTICES_KEY] }),
  });
}
