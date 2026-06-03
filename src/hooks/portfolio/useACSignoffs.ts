/**
 * useACSignoffs
 *
 * Apprentice-side read of the assessor & IQA sign-off chain. Returns a
 * map keyed by `unit_code:ac_code` (and also by `ac_code` alone for
 * fuzzier matches) so the dashboard can colour each AC by its full
 * compliance state — not just "evidenced or not".
 *
 * 5 states the dashboard surfaces:
 *   • not_started      — no evidence
 *   • in_progress      — claimed only / partial evidence, no verdict
 *   • evidenced        — has evidence, awaiting assessor sign-off
 *   • signed_off       — assessor verdict = passed
 *   • iqa_confirmed    — IQA verdict = confirmed
 *   • referred         — assessor verdict = referred (action required)
 *   • not_yet          — assessor verdict = not_yet (still working)
 *
 * Powered by:
 *   • student_ac_coverage  — coverage status (auto-seeded server-side)
 *   • ac_signoffs          — assessor + IQA verdicts
 *
 * Server-side RLS already restricts to the apprentice's own rows.
 */

import { useEffect, useState, useMemo, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { realtimeChannelName } from '@/lib/realtimeChannel';
import { useAuth } from '@/contexts/AuthContext';

export type ACComplianceState =
  | 'not_started'
  | 'in_progress'
  | 'evidenced'
  | 'signed_off'
  | 'iqa_confirmed'
  | 'referred'
  | 'not_yet';

export interface ACSignoffRecord {
  unitCode: string;
  acCode: string;
  status: ACComplianceState;
  evidenceCount: number;
  lastEvidenceAt: string | null;
  assessorVerdict?: 'passed' | 'not_yet' | 'referred' | null;
  assessorSignedAt?: string | null;
  assessorName?: string | null;
  assessorNarrative?: string | null;
  iqaVerdict?: 'confirmed' | 'returned' | 'not_sampled' | null;
  iqaSampledAt?: string | null;
  iqaName?: string | null;
  iqaFeedback?: string | null;
}

interface CoverageRow {
  qualification_code: string;
  unit_code: string;
  ac_code: string;
  status: 'not_started' | 'in_progress' | 'evidenced' | 'assessed' | 'confirmed';
  evidence_count: number;
  last_evidence_at: string | null;
}

interface SignoffRow {
  unit_code: string;
  ac_code: string;
  assessor_verdict: 'passed' | 'not_yet' | 'referred' | null;
  assessor_signed_at: string | null;
  assessor_name_snapshot: string | null;
  assessor_narrative: string | null;
  iqa_verdict: 'confirmed' | 'returned' | 'not_sampled' | null;
  iqa_sampled_at: string | null;
  iqa_name_snapshot: string | null;
  iqa_feedback: string | null;
}

function deriveState(
  coverage: CoverageRow | undefined,
  signoff: SignoffRow | undefined
): ACComplianceState {
  // IQA verdict is the highest authority
  if (signoff?.iqa_verdict === 'confirmed') return 'iqa_confirmed';
  if (signoff?.assessor_verdict === 'referred') return 'referred';
  if (signoff?.assessor_verdict === 'not_yet') return 'not_yet';
  if (signoff?.assessor_verdict === 'passed') return 'signed_off';
  // No verdict — fall back to coverage
  if (coverage?.status === 'evidenced' || coverage?.status === 'assessed') return 'evidenced';
  if (coverage?.status === 'confirmed') return 'iqa_confirmed';
  if ((coverage?.evidence_count ?? 0) > 0) return 'evidenced';
  if (coverage?.status === 'in_progress') return 'in_progress';
  return 'not_started';
}

export function useACSignoffs(qualificationCode: string | null) {
  const { user } = useAuth();
  const [studentId, setStudentId] = useState<string | null>(null);
  const [coverage, setCoverage] = useState<CoverageRow[]>([]);
  const [signoffs, setSignoffs] = useState<SignoffRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Resolve the apprentice's college_students.id (one-time lookup)
  useEffect(() => {
    if (!user) {
      setStudentId(null);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const { data } = await supabase
          .from('college_students')
          .select('id')
          .eq('user_id', user.id)
          .maybeSingle();
        if (!cancelled) {
          setStudentId((data as { id: string } | null)?.id ?? null);
        }
      } catch {
        if (!cancelled) setStudentId(null);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [user]);

  const refresh = useCallback(async () => {
    if (!studentId || !qualificationCode) {
      setCoverage([]);
      setSignoffs([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const [{ data: cov }, { data: so }] = await Promise.all([
        supabase
          .from('student_ac_coverage')
          .select(
            'qualification_code, unit_code, ac_code, status, evidence_count, last_evidence_at'
          )
          .eq('student_id', studentId)
          .eq('qualification_code', qualificationCode),
        supabase
          .from('ac_signoffs')
          .select(
            'unit_code, ac_code, assessor_verdict, assessor_signed_at, assessor_name_snapshot, assessor_narrative, iqa_verdict, iqa_sampled_at, iqa_name_snapshot, iqa_feedback'
          )
          .eq('student_id', studentId)
          .eq('qualification_code', qualificationCode),
      ]);
      setCoverage((cov || []) as CoverageRow[]);
      setSignoffs((so || []) as SignoffRow[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load sign-off data');
    } finally {
      setLoading(false);
    }
  }, [studentId, qualificationCode]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  // Realtime — repaint when assessor or IQA signs anything off
  useEffect(() => {
    if (!studentId) return;
    const ch = supabase
      .channel(realtimeChannelName(`ac-signoffs-self-${studentId}`))
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'ac_signoffs', filter: `student_id=eq.${studentId}` },
        () => refresh()
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'student_ac_coverage',
          filter: `student_id=eq.${studentId}`,
        },
        () => refresh()
      )
      .subscribe();
    return () => {
      supabase.removeChannel(ch);
    };
  }, [studentId, refresh]);

  const records = useMemo(() => {
    const map = new Map<string, ACSignoffRecord>();
    const cov = new Map<string, CoverageRow>();
    coverage.forEach((c) => cov.set(`${c.unit_code}:${c.ac_code}`, c));
    const sig = new Map<string, SignoffRow>();
    signoffs.forEach((s) => sig.set(`${s.unit_code}:${s.ac_code}`, s));

    // Union of keys — coverage may have rows without sign-offs; sign-offs may exist without coverage
    const allKeys = new Set<string>([...cov.keys(), ...sig.keys()]);
    for (const key of allKeys) {
      const [unitCode, acCode] = key.split(':');
      const c = cov.get(key);
      const s = sig.get(key);
      const state = deriveState(c, s);
      const record: ACSignoffRecord = {
        unitCode,
        acCode,
        status: state,
        evidenceCount: c?.evidence_count ?? 0,
        lastEvidenceAt: c?.last_evidence_at ?? null,
        assessorVerdict: s?.assessor_verdict ?? null,
        assessorSignedAt: s?.assessor_signed_at ?? null,
        assessorName: s?.assessor_name_snapshot ?? null,
        assessorNarrative: s?.assessor_narrative ?? null,
        iqaVerdict: s?.iqa_verdict ?? null,
        iqaSampledAt: s?.iqa_sampled_at ?? null,
        iqaName: s?.iqa_name_snapshot ?? null,
        iqaFeedback: s?.iqa_feedback ?? null,
      };
      map.set(key, record);
      // Also store under the bare ac_code for lookups that don't carry the unit prefix
      if (!map.has(acCode)) map.set(acCode, record);
    }
    return map;
  }, [coverage, signoffs]);

  const totals = useMemo(() => {
    const t = {
      total: records.size / 2 || 0, // each record stored twice (key + ac alone)
      iqaConfirmed: 0,
      signedOff: 0,
      evidenced: 0,
      referred: 0,
      notYet: 0,
      inProgress: 0,
      notStarted: 0,
    };
    // Iterate unique by `${unit}:${ac}` keys only
    for (const [key, r] of records.entries()) {
      if (!key.includes(':')) continue;
      switch (r.status) {
        case 'iqa_confirmed':
          t.iqaConfirmed++;
          break;
        case 'signed_off':
          t.signedOff++;
          break;
        case 'evidenced':
          t.evidenced++;
          break;
        case 'referred':
          t.referred++;
          break;
        case 'not_yet':
          t.notYet++;
          break;
        case 'in_progress':
          t.inProgress++;
          break;
        case 'not_started':
          t.notStarted++;
          break;
      }
    }
    t.total =
      t.iqaConfirmed + t.signedOff + t.evidenced + t.referred + t.notYet + t.inProgress + t.notStarted;
    return t;
  }, [records]);

  return {
    records,
    totals,
    loading,
    error,
    refresh,
    studentId,
    /** Lookup helper that tries both keyed and bare references. */
    getByAC: (acRef: string, unitCode?: string): ACSignoffRecord | undefined => {
      if (unitCode) {
        const fromKey = records.get(`${unitCode}:${acRef}`);
        if (fromKey) return fromKey;
      }
      return records.get(acRef);
    },
  };
}
