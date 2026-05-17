import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   useTripartiteReviews — 3-way (apprentice / tutor / employer) review CRUD.
   ELE-930 (J1).
   ========================================================================== */

export type TripartiteStatus =
  | 'scheduled'
  | 'in_progress'
  | 'completed'
  | 'cancelled'
  | 'no_show';

export interface AgendaItem {
  topic: string;
  owner?: string;
  time_minutes?: number;
}

export interface AgreedAction {
  action: string;
  owner: string;
  target_date?: string | null;
}

export interface TripartiteOutcomes {
  summary?: string;
  progress_notes?: string;
  ilp_updates?: string;
  otj_review?: string;
  safeguarding_check?: string;
  wellbeing_check?: string;
  concerns?: string;
  agreed_actions?: AgreedAction[];
}

export interface TripartiteSignatures {
  student_signed_at?: string | null;
  tutor_signed_at?: string | null;
  employer_signed_at?: string | null;
  student_name?: string | null;
  tutor_name?: string | null;
  employer_name?: string | null;
}

export interface TripartiteReview {
  id: string;
  college_id: string;
  student_id: string;
  tutor_staff_id: string | null;
  employer_contact_name: string | null;
  employer_contact_email: string | null;
  employer_contact_phone: string | null;
  scheduled_at: string | null;
  duration_minutes: number;
  location: string | null;
  meeting_url: string | null;
  status: TripartiteStatus;
  agenda: AgendaItem[];
  outcomes: TripartiteOutcomes;
  signatures: TripartiteSignatures;
  completed_at: string | null;
  cancelled_reason: string | null;
  created_at: string;
  updated_at: string;
}

export function useTripartiteReviews(studentId?: string | null) {
  const [reviews, setReviews] = useState<TripartiteReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let q = supabase
        .from('college_tripartite_reviews')
        .select('*')
        .order('scheduled_at', { ascending: false });
      if (studentId) q = q.eq('student_id', studentId);
      const { data, error: qErr } = await q;
      if (qErr) throw qErr;
      setReviews((data ?? []) as TripartiteReview[]);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }, [studentId]);

  useEffect(() => {
    void fetchAll();
  }, [fetchAll]);

  const create = useCallback(
    async (
      input: Partial<TripartiteReview> & { student_id: string; college_id: string }
    ) => {
      const { data: userRes } = await supabase.auth.getUser();
      const { error: insErr } = await supabase.from('college_tripartite_reviews').insert({
        college_id: input.college_id,
        student_id: input.student_id,
        tutor_staff_id: input.tutor_staff_id ?? null,
        employer_contact_name: input.employer_contact_name ?? null,
        employer_contact_email: input.employer_contact_email ?? null,
        employer_contact_phone: input.employer_contact_phone ?? null,
        scheduled_at: input.scheduled_at ?? null,
        duration_minutes: input.duration_minutes ?? 60,
        location: input.location ?? null,
        meeting_url: input.meeting_url ?? null,
        agenda: input.agenda ?? [],
        outcomes: input.outcomes ?? {},
        signatures: input.signatures ?? {},
        created_by: userRes.user?.id ?? null,
      });
      if (insErr) throw insErr;
      await fetchAll();
    },
    [fetchAll]
  );

  const update = useCallback(
    async (id: string, patch: Partial<TripartiteReview>) => {
      const merged: Record<string, unknown> = { ...patch };
      if (patch.status === 'completed' && !patch.completed_at) {
        merged.completed_at = new Date().toISOString();
      }
      const { error: updErr } = await supabase
        .from('college_tripartite_reviews')
        .update(merged)
        .eq('id', id);
      if (updErr) throw updErr;
      await fetchAll();
    },
    [fetchAll]
  );

  const sign = useCallback(
    async (id: string, party: 'student' | 'tutor' | 'employer', name: string) => {
      const target = reviews.find((r) => r.id === id);
      if (!target) return;
      const ts = new Date().toISOString();
      const nextSignatures: TripartiteSignatures = {
        ...target.signatures,
        [`${party}_signed_at`]: ts,
        [`${party}_name`]: name,
      };
      await update(id, { signatures: nextSignatures });
    },
    [reviews, update]
  );

  return { reviews, loading, error, create, update, sign, refetch: fetchAll };
}
