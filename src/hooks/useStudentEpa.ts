import { useCallback, useEffect, useMemo, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   useStudentEpa — End-Point Assessment readiness for one learner.

   Two ID flavours: `userId` (auth.users.id, used for apprentice-side tables)
   and `collegeStudentId` (college_students.id, used for college_epa). Pass
   both — they're sourced from different sides of the platform.
   ========================================================================== */

export interface EpaGatewayChecklist {
  id: string;
  qualification_id: string | null;
  portfolio_complete: boolean;
  portfolio_signed_off: boolean;
  ojt_hours_required: number | null;
  ojt_hours_completed: number | null;
  ojt_hours_verified: boolean;
  english_level2_achieved: boolean;
  maths_level2_achieved: boolean;
  employer_satisfied: boolean;
  provider_satisfied: boolean;
  gateway_meeting_scheduled: string | null;
  gateway_meeting_held: boolean;
  gateway_meeting_outcome: string | null;
  gateway_passed: boolean;
  gateway_passed_at: string | null;
  epa_eligible: boolean;
  epa_booked: boolean;
  epa_booking_date: string | null;
  epa_provider: string | null;
  epa_reference: string | null;
  updated_at: string | null;
}

export interface EpaReadinessSnapshot {
  id: string;
  qualification_code: string | null;
  overall_score: number | null;
  overall_status: string | null;
  portfolio_coverage_pct: number | null;
  ksb_completion_pct: number | null;
  evidence_quality_avg: number | null;
  mock_discussion_avg: number | null;
  mock_knowledge_avg: number | null;
  gaps: {
    area: string;
    priority?: 'low' | 'medium' | 'high' | string;
    action?: string;
    description?: string;
  }[];
  calculated_at: string | null;
}

export interface EpaMockSummary {
  id: string;
  qualification_code: string | null;
  session_type: string | null;
  status: string | null;
  overall_score: number | null;
  predicted_grade: string | null;
  completed_at: string | null;
  time_spent_seconds: number | null;
}

export interface CollegeEpaRow {
  id: string;
  status: string | null;
  gateway_date: string | null;
  epa_date: string | null;
  result: string | null;
  notes: string | null;
}

export interface EpaReadinessRollUp {
  /** 0–100 — composite score combining gateway items + readiness snapshot. */
  composite_score: number;
  gateway_items_complete: number;
  gateway_items_total: number;
  blocking_items: string[];
  ready_for_gateway: boolean;
  ready_for_epa: boolean;
}

export interface StudentEpa {
  checklist: EpaGatewayChecklist | null;
  snapshots: EpaReadinessSnapshot[];
  latestSnapshot: EpaReadinessSnapshot | null;
  mocks: EpaMockSummary[];
  collegeEpa: CollegeEpaRow | null;
  rollUp: EpaReadinessRollUp;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

const ZERO_ROLLUP: EpaReadinessRollUp = {
  composite_score: 0,
  gateway_items_complete: 0,
  gateway_items_total: 0,
  blocking_items: [],
  ready_for_gateway: false,
  ready_for_epa: false,
};

export function useStudentEpa(
  userId: string | null,
  collegeStudentId: string | null
): StudentEpa {
  const [checklist, setChecklist] = useState<EpaGatewayChecklist | null>(null);
  const [snapshots, setSnapshots] = useState<EpaReadinessSnapshot[]>([]);
  const [mocks, setMocks] = useState<EpaMockSummary[]>([]);
  const [collegeEpa, setCollegeEpa] = useState<CollegeEpaRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    if (!userId && !collegeStudentId) {
      setChecklist(null);
      setSnapshots([]);
      setMocks([]);
      setCollegeEpa(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const reqs: Promise<unknown>[] = [];

      if (userId) {
        reqs.push(
          supabase
            .from('epa_gateway_checklist')
            .select(
              'id, qualification_id, portfolio_complete, portfolio_signed_off, ojt_hours_required, ojt_hours_completed, ojt_hours_verified, english_level2_achieved, maths_level2_achieved, employer_satisfied, provider_satisfied, gateway_meeting_scheduled, gateway_meeting_held, gateway_meeting_outcome, gateway_passed, gateway_passed_at, epa_eligible, epa_booked, epa_booking_date, epa_provider, epa_reference, updated_at'
            )
            .eq('user_id', userId)
            .order('updated_at', { ascending: false, nullsFirst: false })
            .limit(1)
            .maybeSingle()
            .then(({ data }) => setChecklist((data as EpaGatewayChecklist | null) ?? null))
        );
        reqs.push(
          supabase
            .from('epa_readiness_snapshots')
            .select(
              'id, qualification_code, overall_score, overall_status, portfolio_coverage_pct, ksb_completion_pct, evidence_quality_avg, mock_discussion_avg, mock_knowledge_avg, gaps, calculated_at'
            )
            .eq('user_id', userId)
            .order('calculated_at', { ascending: false, nullsFirst: false })
            .limit(10)
            .then(({ data }) => {
              setSnapshots(
                ((data ?? []) as Array<EpaReadinessSnapshot & { gaps: unknown }>).map((s) => ({
                  ...s,
                  gaps: Array.isArray(s.gaps)
                    ? (s.gaps as EpaReadinessSnapshot['gaps'])
                    : [],
                }))
              );
            })
        );
        reqs.push(
          supabase
            .from('epa_mock_sessions')
            .select(
              'id, qualification_code, session_type, status, overall_score, predicted_grade, completed_at, time_spent_seconds'
            )
            .eq('user_id', userId)
            .order('completed_at', { ascending: false, nullsFirst: false })
            .limit(20)
            .then(({ data }) => setMocks((data ?? []) as EpaMockSummary[]))
        );
      } else {
        setChecklist(null);
        setSnapshots([]);
        setMocks([]);
      }

      if (collegeStudentId) {
        reqs.push(
          supabase
            .from('college_epa')
            .select('id, status, gateway_date, epa_date, result, notes')
            .eq('student_id', collegeStudentId)
            .order('updated_at', { ascending: false, nullsFirst: false })
            .limit(1)
            .maybeSingle()
            .then(({ data }) => setCollegeEpa((data as CollegeEpaRow | null) ?? null))
        );
      } else {
        setCollegeEpa(null);
      }

      await Promise.all(reqs);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, [userId, collegeStudentId]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  useEffect(() => {
    if (!userId) return;
    const channel = supabase
      .channel(`student_epa:${userId}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'epa_gateway_checklist', filter: `user_id=eq.${userId}` },
        () => fetchAll()
      )
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'epa_readiness_snapshots', filter: `user_id=eq.${userId}` },
        () => fetchAll()
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, fetchAll]);

  const latestSnapshot = useMemo<EpaReadinessSnapshot | null>(
    () => snapshots[0] ?? null,
    [snapshots]
  );

  const rollUp = useMemo<EpaReadinessRollUp>(() => {
    if (!checklist) return ZERO_ROLLUP;

    type GateItem = { key: string; complete: boolean; label: string };
    const items: GateItem[] = [
      {
        key: 'portfolio_complete',
        complete: checklist.portfolio_complete,
        label: 'Portfolio complete',
      },
      {
        key: 'portfolio_signed_off',
        complete: checklist.portfolio_signed_off,
        label: 'Portfolio signed off',
      },
      {
        key: 'ojt_hours_verified',
        complete: checklist.ojt_hours_verified,
        label: 'OTJ hours verified',
      },
      {
        key: 'english_level2_achieved',
        complete: checklist.english_level2_achieved,
        label: 'English Level 2',
      },
      {
        key: 'maths_level2_achieved',
        complete: checklist.maths_level2_achieved,
        label: 'Maths Level 2',
      },
      {
        key: 'employer_satisfied',
        complete: checklist.employer_satisfied,
        label: 'Employer declaration',
      },
      {
        key: 'provider_satisfied',
        complete: checklist.provider_satisfied,
        label: 'Provider declaration',
      },
    ];

    const complete = items.filter((i) => i.complete).length;
    const blocking = items.filter((i) => !i.complete).map((i) => i.label);
    const gatewayPct = items.length > 0 ? Math.round((complete / items.length) * 100) : 0;
    const snapshotPct = latestSnapshot?.overall_score ?? null;

    const composite =
      snapshotPct != null ? Math.round((gatewayPct + snapshotPct) / 2) : gatewayPct;

    return {
      composite_score: composite,
      gateway_items_complete: complete,
      gateway_items_total: items.length,
      blocking_items: blocking,
      ready_for_gateway: blocking.length === 0,
      ready_for_epa: checklist.gateway_passed,
    };
  }, [checklist, latestSnapshot]);

  return useMemo(
    () => ({
      checklist,
      snapshots,
      latestSnapshot,
      mocks,
      collegeEpa,
      rollUp,
      loading,
      error,
      refresh: fetchAll,
    }),
    [checklist, snapshots, latestSnapshot, mocks, collegeEpa, rollUp, loading, error, fetchAll]
  );
}
