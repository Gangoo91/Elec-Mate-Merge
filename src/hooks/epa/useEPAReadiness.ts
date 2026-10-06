/**
 * useEPAReadiness — the learner's EPA readiness, from the ONE model in
 * src/lib/epa/readiness.ts (their tutor sees the same).
 *
 * Rebuilt 6 Oct 2026. It used to blend portfolio, "evidence quality",
 * a professional-discussion mock and a knowledge mock. Evidence quality read a
 * table that has never had a row, the portfolio maths matched bare AC codes,
 * and the EPA for these routes is a NET AM2 — which this never looked at.
 * Across 3,018 snapshots the best score anyone ever reached was 20.
 *
 * Now, for the qualification their portfolio is on:
 *   - AM2 practice: their counted am2_mock_sessions (as useAM2Sections),
 *   - portfolio: that qualification's ACs, matched unit + AC — from
 *     student_ac_coverage / ac_signoffs when they're a college learner, else
 *     their own portfolio items' AC references,
 *   - sign-offs: their epa_gateway_checklist row.
 * A snapshot is written only when the score or status changes, or once a
 * day — it was written on every page view (three times per home visit).
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { AM2_RUNS_LIMIT, buildSections, countsTowardsReady } from '@/hooks/am2/useAM2Sections';
import {
  acState,
  buildEpaReadiness,
  epaRouteFor,
  parsePortfolioAcRef,
  portfolioCoverage,
  type EpaReadinessModel,
  type EpaReadinessStatus,
  type GatewayRowLike,
} from '@/lib/epa/readiness';

const db = supabase as unknown as SupabaseClient;

export type { EpaReadinessModel };

/** The snapshot table's own status values (a check constraint). */
const SNAPSHOT_STATUS: Record<EpaReadinessStatus, string> = {
  gateway_passed: 'ready',
  gateway_ready: 'ready',
  am2_ready: 'nearly_ready',
  building: 'needs_work',
  starting: 'not_ready',
};

const DAY_MS = 86_400_000;

/** The Progress tab mounts this hook three times; on the first visit of the
 *  day all three could see "no snapshot today" and write one each. One
 *  write per learner and qualification per tab at a time. */
const snapshotInFlight = new Set<string>();

async function loadCoverage(userId: string, code: string) {
  const { data: acs, error: acErr } = await db
    .from('qualification_requirements')
    .select('unit_code, unit_title, ac_code')
    .eq('qualification_code', code);
  if (acErr) throw acErr;
  const acRows = (acs ?? []) as Array<{ unit_code: string; unit_title: string; ac_code: string }>;
  if (!acRows.length) return null;

  // A college learner: coverage and sign-offs are kept per AC by the college.
  const { data: student } = await db
    .from('college_students')
    .select('id')
    .eq('user_id', userId)
    .maybeSingle();
  const studentId = (student as { id: string } | null)?.id ?? null;
  if (studentId) {
    const [cov, so] = await Promise.all([
      db
        .from('student_ac_coverage')
        .select('unit_code, ac_code, status, evidence_count')
        .eq('student_id', studentId)
        .eq('qualification_code', code),
      db
        .from('ac_signoffs')
        .select('unit_code, ac_code, assessor_verdict, iqa_verdict')
        .eq('student_id', studentId)
        .eq('qualification_code', code),
    ]);
    if (cov.error) throw cov.error;
    if (so.error) throw so.error;
    // The same per-AC rule as the tutor's view (acState): a referred or
    // "not yet" AC counts as nothing, however much evidence it has.
    const key = (u: string, a: string) => `${u}|${a}`;
    type Cov = {
      unit_code: string;
      ac_code: string;
      status: string | null;
      evidence_count: number | null;
    };
    type So = {
      unit_code: string;
      ac_code: string;
      assessor_verdict: string | null;
      iqa_verdict: string | null;
    };
    const covMap = new Map(
      ((cov.data ?? []) as Cov[]).map((c) => [key(c.unit_code, c.ac_code), c])
    );
    const soMap = new Map(((so.data ?? []) as So[]).map((c) => [key(c.unit_code, c.ac_code), c]));
    const rows: Parameters<typeof portfolioCoverage>[1] = [];
    for (const ac of acRows) {
      const k = key(ac.unit_code, ac.ac_code);
      const state = acState(covMap.get(k), soMap.get(k));
      if (state) rows.push({ unit_code: ac.unit_code, ac_code: ac.ac_code, state });
    }
    return portfolioCoverage(acRows, rows);
  }

  // On their own: the AC references on their portfolio items that place in a
  // unit of this qualification. Only items with evidence attached count.
  const { data: items, error: itErr } = await db
    .from('portfolio_items')
    .select('assessment_criteria_met, evidence_count, storage_urls')
    .eq('user_id', userId);
  if (itErr) throw itErr;
  const units = [...new Set(acRows.map((a) => a.unit_code))];
  const rows: Parameters<typeof portfolioCoverage>[1] = [];
  for (const it of (items ?? []) as Array<{
    assessment_criteria_met: string[] | null;
    evidence_count: number | null;
    storage_urls: string[] | null;
  }>) {
    const hasEvidence = (it.evidence_count ?? 0) > 0 || (it.storage_urls?.length ?? 0) > 0;
    if (!hasEvidence) continue;
    for (const ref of it.assessment_criteria_met ?? []) {
      const hit = parsePortfolioAcRef(ref, units);
      if (hit) rows.push({ ...hit, state: 'evidenced' });
    }
  }
  return portfolioCoverage(acRows, rows);
}

/**
 * @param qualificationCode the REQUIREMENT code (AC rows and coverage)
 * @param _qualificationId kept for callers; the gateway row is read as the
 *   tutor reads it — the learner's newest — so both see the same sign-offs
 * @param enrolmentCode the code as enrolled; the route (AM2S/AM2/AM2E/AM2D)
 *   comes from it
 */
export function useEPAReadiness(
  qualificationCode?: string,
  _qualificationId?: string | null,
  enrolmentCode?: string | null
) {
  const { user } = useAuth();
  const [data, setData] = useState<EpaReadinessModel | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const run = useRef(0);

  const calculate = useCallback(async () => {
    if (!user || !qualificationCode) return null;
    const me = ++run.current;
    setIsLoading(true);
    setError(null);
    try {
      const gwQuery = db
        .from('epa_gateway_checklist')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false })
        .limit(1);
      const [am2Res, gwRes, coverage] = await Promise.all([
        db
          .from('am2_mock_sessions')
          .select('session_type, overall_score, completed_at, component_scores, session_data')
          .eq('user_id', user.id)
          .eq('status', 'completed')
          .order('completed_at', { ascending: false })
          .limit(AM2_RUNS_LIMIT),
        gwQuery.maybeSingle(),
        loadCoverage(user.id, qualificationCode),
      ]);
      if (am2Res.error) throw am2Res.error;
      if (gwRes.error) throw gwRes.error;

      const model = buildEpaReadiness(
        buildSections((am2Res.data ?? []).filter(countsTowardsReady)),
        (gwRes.data ?? null) as GatewayRowLike | null,
        qualificationCode,
        coverage,
        enrolmentCode ?? qualificationCode
      );
      if (me !== run.current) return model;
      setData(model);

      // Snapshot only on change, or once a day — for the tutor's trend.
      const snapKey = `${user.id}|${qualificationCode}`;
      if (
        epaRouteFor(enrolmentCode ?? qualificationCode).kind !== 'none' &&
        !snapshotInFlight.has(snapKey)
      ) {
        snapshotInFlight.add(snapKey);
        try {
          const { data: last } = await db
            .from('epa_readiness_snapshots')
            .select('overall_score, component_details, calculated_at')
            .eq('user_id', user.id)
            .eq('qualification_code', qualificationCode)
            .order('calculated_at', { ascending: false })
            .limit(1)
            .maybeSingle();
          const prev = last as {
            overall_score: number;
            component_details: { status?: string } | null;
            calculated_at: string;
          } | null;
          const changed =
            !prev ||
            prev.overall_score !== model.score ||
            prev.component_details?.status !== model.status ||
            Date.now() - new Date(prev.calculated_at).getTime() > DAY_MS;
          if (changed) {
            const { error: snapErr } = await db.from('epa_readiness_snapshots').insert({
              user_id: user.id,
              qualification_code: qualificationCode,
              overall_score: model.score,
              overall_status: SNAPSHOT_STATUS[model.status],
              portfolio_coverage_pct: model.portfolio.pct,
              ksb_completion_pct: 0,
              evidence_quality_avg: 0,
              mock_discussion_avg: 0,
              mock_knowledge_avg: 0,
              component_details: {
                model: 'am2-portfolio-gateway-v1',
                status: model.status,
                route: model.route.kind,
                am2: { score: model.am2.score, ready: model.am2.ready, of: model.am2.of },
                portfolio: model.portfolio,
                gateway: {
                  score: model.gateway.score,
                  done: model.gateway.done,
                  of: model.gateway.of,
                },
              },
              gaps: model.next,
              calculated_at: new Date().toISOString(),
            });
            if (snapErr) console.error('EPA readiness snapshot not saved:', snapErr.message);
          }
        } finally {
          snapshotInFlight.delete(snapKey);
        }
      }
      return model;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Couldn’t work out your readiness';
      if (me === run.current) setError(message);
      return null;
    } finally {
      if (me === run.current) setIsLoading(false);
    }
  }, [user, qualificationCode, enrolmentCode]);

  useEffect(() => {
    if (user && qualificationCode) void calculate();
  }, [user, qualificationCode, calculate]);

  return { data, isLoading, error, recalculate: calculate };
}

export default useEPAReadiness;
