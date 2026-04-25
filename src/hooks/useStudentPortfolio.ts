import { useCallback, useEffect, useMemo, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   useStudentPortfolio — apprentice-side portfolio for a single learner.

   Surfaces submissions (with full IQA workflow), evidence items, signature
   chain, and tutor-set requirements. Argument is auth.users.id.
   ========================================================================== */

export type SubmissionStatus =
  | 'draft'
  | 'submitted'
  | 'in_review'
  | 'under_review'
  | 'feedback_given'
  | 'resubmitted'
  | 'approved'
  | 'signed_off'
  | 'iqa_sampled'
  | 'iqa_verified'
  | 'rejected'
  | 'returned';

export type IqaOutcome = 'verified' | 'not_verified' | 'requires_action' | null;

export interface PortfolioSubmission {
  id: string;
  qualification_id: string | null;
  category_id: string | null;
  status: SubmissionStatus;
  submitted_at: string | null;
  reviewed_at: string | null;
  signed_off_at: string | null;
  signed_off_by: string | null;
  assessor_id: string | null;
  assessor_feedback: string | null;
  grade: string | null;
  action_required: string | null;
  strengths_noted: string | null;
  areas_for_improvement: string | null;
  iqa_sampled: boolean;
  iqa_sampled_at: string | null;
  iqa_sampled_by: string | null;
  iqa_verified_at: string | null;
  iqa_verified_by: string | null;
  iqa_feedback: string | null;
  iqa_outcome: IqaOutcome;
  submission_count: number | null;
  last_feedback_at: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  qualification_category_id: string | null;
  file_url: string | null;
  file_type: string | null;
  storage_urls: Record<string, unknown> | null;
  status: string | null;
  grade: string | null;
  is_supervisor_verified: boolean;
  evidence_count: number | null;
  learning_outcomes_met: string[];
  assessment_criteria_met: string[];
  reflection_notes: string | null;
  supervisor_feedback: string | null;
  date_completed: string | null;
  created_at: string | null;
}

export interface PortfolioSignature {
  id: string;
  submission_id: string | null;
  portfolio_item_id: string | null;
  signer_id: string | null;
  signer_role: string | null;
  signature_type: string | null;
  declaration_text: string | null;
  ip_address: string | null;
  signed_at: string;
}

export interface TutorRequirement {
  id: string;
  tutor_id: string | null;
  category_id: string | null;
  title: string;
  description: string | null;
  evidence_type_codes: string[];
  quantity_required: number;
  is_mandatory: boolean;
  due_date: string | null;
  status: string | null;
  completed_at: string | null;
}

export interface PortfolioRollUp {
  total_submissions: number;
  by_status: Record<SubmissionStatus, number>;
  iqa_sampled: number;
  iqa_verified: number;
  iqa_requires_action: number;
  total_items: number;
  items_supervisor_verified: number;
  open_requirements: number;
  overdue_requirements: number;
}

export interface StudentPortfolio {
  submissions: PortfolioSubmission[];
  items: PortfolioItem[];
  signatures: PortfolioSignature[];
  requirements: TutorRequirement[];
  rollUp: PortfolioRollUp;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

const ZERO_ROLLUP: PortfolioRollUp = {
  total_submissions: 0,
  by_status: {
    draft: 0,
    submitted: 0,
    in_review: 0,
    under_review: 0,
    feedback_given: 0,
    resubmitted: 0,
    approved: 0,
    signed_off: 0,
    iqa_sampled: 0,
    iqa_verified: 0,
    rejected: 0,
    returned: 0,
  },
  iqa_sampled: 0,
  iqa_verified: 0,
  iqa_requires_action: 0,
  total_items: 0,
  items_supervisor_verified: 0,
  open_requirements: 0,
  overdue_requirements: 0,
};

export function useStudentPortfolio(userId: string | null): StudentPortfolio {
  const [submissions, setSubmissions] = useState<PortfolioSubmission[]>([]);
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [signatures, setSignatures] = useState<PortfolioSignature[]>([]);
  const [requirements, setRequirements] = useState<TutorRequirement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    if (!userId) {
      setSubmissions([]);
      setItems([]);
      setSignatures([]);
      setRequirements([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const [subRes, itemRes, reqRes] = await Promise.all([
        supabase
          .from('portfolio_submissions')
          .select(
            'id, qualification_id, category_id, status, submitted_at, reviewed_at, signed_off_at, signed_off_by, assessor_id, assessor_feedback, grade, action_required, strengths_noted, areas_for_improvement, iqa_sampled, iqa_sampled_at, iqa_sampled_by, iqa_verified_at, iqa_verified_by, iqa_feedback, iqa_outcome, submission_count, last_feedback_at, created_at, updated_at'
          )
          .eq('user_id', userId)
          .order('created_at', { ascending: false })
          .limit(100),
        supabase
          .from('portfolio_items')
          .select(
            'id, title, description, category, qualification_category_id, file_url, file_type, storage_urls, status, grade, is_supervisor_verified, evidence_count, learning_outcomes_met, assessment_criteria_met, reflection_notes, supervisor_feedback, date_completed, created_at'
          )
          .eq('user_id', userId)
          .order('created_at', { ascending: false })
          .limit(200),
        supabase
          .from('tutor_portfolio_requirements')
          .select(
            'id, tutor_id, category_id, title, description, evidence_type_codes, quantity_required, is_mandatory, due_date, status, completed_at'
          )
          .eq('student_id', userId)
          .order('due_date', { ascending: true, nullsFirst: false }),
      ]);

      if (!subRes.error && subRes.data) {
        setSubmissions(subRes.data as PortfolioSubmission[]);
      }
      if (!itemRes.error && itemRes.data) {
        setItems(
          (itemRes.data as Array<PortfolioItem & {
            learning_outcomes_met: string[] | null;
            assessment_criteria_met: string[] | null;
            is_supervisor_verified: boolean | null;
          }>).map((r) => ({
            ...r,
            learning_outcomes_met: r.learning_outcomes_met ?? [],
            assessment_criteria_met: r.assessment_criteria_met ?? [],
            is_supervisor_verified: Boolean(r.is_supervisor_verified),
          }))
        );
      }
      if (!reqRes.error && reqRes.data) {
        setRequirements(
          (reqRes.data as Array<TutorRequirement & {
            evidence_type_codes: string[] | null;
          }>).map((r) => ({
            ...r,
            evidence_type_codes: r.evidence_type_codes ?? [],
          }))
        );
      }

      // Signatures need a separate fetch keyed off the submissions we just got
      const subIds = (subRes.data ?? []).map((s) => s.id);
      if (subIds.length > 0) {
        const { data: sigData } = await supabase
          .from('portfolio_signatures')
          .select(
            'id, submission_id, portfolio_item_id, signer_id, signer_role, signature_type, declaration_text, ip_address, signed_at'
          )
          .in('submission_id', subIds)
          .order('signed_at', { ascending: false });
        setSignatures((sigData ?? []) as PortfolioSignature[]);
      } else {
        setSignatures([]);
      }
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  useEffect(() => {
    if (!userId) return;
    const channel = supabase
      .channel(`student_portfolio:${userId}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'portfolio_submissions', filter: `user_id=eq.${userId}` },
        () => fetchAll()
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'portfolio_items', filter: `user_id=eq.${userId}` },
        () => fetchAll()
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'tutor_portfolio_requirements', filter: `student_id=eq.${userId}` },
        () => fetchAll()
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, fetchAll]);

  const rollUp = useMemo<PortfolioRollUp>(() => {
    if (!submissions.length && !items.length && !requirements.length) return ZERO_ROLLUP;
    const byStatus = { ...ZERO_ROLLUP.by_status };
    let iqaSampled = 0;
    let iqaVerified = 0;
    let iqaRequiresAction = 0;
    for (const s of submissions) {
      const k = s.status as SubmissionStatus;
      if (k in byStatus) byStatus[k] += 1;
      if (s.iqa_sampled) iqaSampled += 1;
      if (s.iqa_outcome === 'verified') iqaVerified += 1;
      if (s.iqa_outcome === 'requires_action') iqaRequiresAction += 1;
    }
    const nowMs = Date.now();
    const openRequirements = requirements.filter(
      (r) => r.status !== 'completed' && r.status !== 'archived'
    );
    const overdueRequirements = openRequirements.filter(
      // due_date is `timestamp with time zone` — parse before compare so
      // entries on the same calendar day but earlier-in-day aren't
      // mis-bucketed by lexicographic string compare.
      (r) => r.due_date && new Date(r.due_date).getTime() < nowMs
    );
    return {
      total_submissions: submissions.length,
      by_status: byStatus,
      iqa_sampled: iqaSampled,
      iqa_verified: iqaVerified,
      iqa_requires_action: iqaRequiresAction,
      total_items: items.length,
      items_supervisor_verified: items.filter((i) => i.is_supervisor_verified).length,
      open_requirements: openRequirements.length,
      overdue_requirements: overdueRequirements.length,
    };
  }, [submissions, items, requirements]);

  return useMemo(
    () => ({
      submissions,
      items,
      signatures,
      requirements,
      rollUp,
      loading,
      error,
      refresh: fetchAll,
    }),
    [submissions, items, signatures, requirements, rollUp, loading, error, fetchAll]
  );
}
