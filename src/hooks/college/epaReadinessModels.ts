/**
 * The learner's EPA readiness model, loaded for tutors — AM2 practice, their
 * portfolio on their own qualification (unit + AC), and the gateway row.
 *
 * 6 Oct 2026. Tutors used to see a gauge built from verdict + confidence
 * while the learner saw a portfolio/quality/discussion blend — two answers to
 * one question. Now both see `buildEpaReadiness` (src/lib/epa/readiness.ts):
 * AM2S practice by section plus the gateway items. This file loads its inputs
 * for one learner or a whole cohort in two queries.
 *
 * ELE-1872: the sign-off items are the real gate, get_gateway_readiness, read
 * for the whole list in one call (get_gateway_readiness_many). Until that
 * function exists, or for a learner it leaves out, the model falls back to
 * the checklist row.
 *
 * Tutors read am2_mock_sessions through the is_staff_for_learner_user policy
 * and epa_gateway_checklist through its assigned-staff policy; a tutor who
 * isn't assigned sees "gateway not recorded" rather than an error.
 */
import { useCallback, useEffect, useState } from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { AM2_RUNS_LIMIT, buildSections, countsTowardsReady } from '@/hooks/am2/useAM2Sections';
import {
  acState,
  buildEpaReadiness,
  portfolioCoverage,
  type EpaReadinessModel,
  type GateLike,
  type GatewayRowLike,
  type PortfolioCoverage,
} from '@/lib/epa/readiness';
import type { EpaJudgement } from '@/hooks/useEpaReadiness';

const db = supabase as unknown as SupabaseClient;

type Am2Row = {
  user_id: string;
  session_type: string;
  overall_score: number | null;
  completed_at: string | null;
  component_scores?: Record<string, unknown> | null;
  session_data?: unknown;
};

export type GatewayRow = GatewayRowLike & { user_id: string; updated_at?: string | null };

/** One learner to model: auth user id, college_students id, qualification code. */
export interface ModelTarget {
  userId: string;
  studentId?: string | null;
  qualificationCode?: string | null;
}

/** PostgREST caps a response at 1,000 rows — page through anything bigger. */
async function fetchAll<T>(
  build: (
    from: number,
    to: number
  ) => PromiseLike<{ data: unknown; error: { message: string } | null }>
): Promise<{ rows: T[]; error: string | null }> {
  const rows: T[] = [];
  for (let from = 0; from < 20_000; from += 1000) {
    const { data, error } = await build(from, from + 999);
    if (error) return { rows, error: error.message };
    const batch = (data ?? []) as T[];
    rows.push(...batch);
    if (batch.length < 1000) break;
  }
  return { rows, error: null };
}

type CoverageRow = {
  student_id: string;
  qualification_code: string;
  unit_code: string;
  ac_code: string;
  status: string | null;
  evidence_count: number | null;
};
type SignoffRow = {
  student_id: string;
  qualification_code: string;
  unit_code: string;
  ac_code: string;
  assessor_verdict: string | null;
  iqa_verdict: string | null;
};

/** Readiness models for many learners — the same inputs the learner's own
 *  screen uses: AM2 practice, portfolio coverage on their qualification, and
 *  the gateway row. A handful of queries for the whole cohort. */
export async function fetchEpaReadinessModels(targets: ModelTarget[]): Promise<{
  models: Map<string, EpaReadinessModel>;
  gateways: Map<string, GatewayRow>;
  error: string | null;
}> {
  const uniq = new Map<string, ModelTarget>();
  for (const t of targets) if (t.userId && !uniq.has(t.userId)) uniq.set(t.userId, t);
  const ids = [...uniq.keys()];
  const models = new Map<string, EpaReadinessModel>();
  const gateways = new Map<string, GatewayRow>();
  if (ids.length === 0) return { models, gateways, error: null };

  const studentIds = [...uniq.values()].map((t) => t.studentId).filter((x): x is string => !!x);
  // The code each learner is ENROLLED on decides the route; the AC rows and
  // coverage are keyed on its requirement code (603/3895/8 → 601/7345/2). The
  // cohort page passed raw course codes, so a mapped course found no ACs.
  const enrolled = Array.from(
    new Set([...uniq.values()].map((t) => t.qualificationCode).filter((x): x is string => !!x))
  );
  const { data: maps } = enrolled.length
    ? await db
        .from('qualification_requirement_mappings')
        .select('qualification_code, requirement_code, is_primary')
        .in('qualification_code', enrolled)
    : { data: [] };
  const reqFor = new Map<string, string>();
  for (const m of (maps ?? []) as Array<{
    qualification_code: string;
    requirement_code: string;
    is_primary: boolean | null;
  }>) {
    if (m.is_primary || !reqFor.has(m.qualification_code))
      reqFor.set(m.qualification_code, m.requirement_code);
  }
  const requirementOf = (code: string | null | undefined) =>
    code ? (reqFor.get(code) ?? code) : null;
  const codes = Array.from(
    new Set(enrolled.map((c) => requirementOf(c)).filter((x): x is string => !!x))
  );

  // 100 learners a call (about a second each; the function allows 500 but a
  // full 500 nears the 8s statement timeout), in parallel.
  const gateQuery = Promise.all(
    Array.from({ length: Math.ceil(ids.length / 100) }, (_, i) =>
      db
        .rpc('get_gateway_readiness_many', { p_learners: ids.slice(i * 100, i * 100 + 100) })
        .then(({ data, error }) => {
          if (error) console.warn('get_gateway_readiness_many:', error.message);
          return ((error ? null : data) ?? {}) as Record<string, GateLike>;
        })
    )
  ).then((parts) => Object.assign({}, ...parts) as Record<string, GateLike>);

  const [am2Res, gwRes, reqRes, covRes, soRes, gates] = await Promise.all([
    fetchAll<Am2Row>((a, b) =>
      db
        .from('am2_mock_sessions')
        .select(
          'user_id, session_type, overall_score, completed_at, component_scores, session_data'
        )
        .in('user_id', ids)
        .eq('status', 'completed')
        .order('completed_at', { ascending: false })
        .range(a, b)
    ),
    db
      .from('epa_gateway_checklist')
      .select(
        'user_id, updated_at, portfolio_signed_off, ojt_hours_verified, ojt_hours_completed, ojt_hours_required, english_level2_achieved, maths_level2_achieved, english_maths_not_required, employer_satisfied, provider_satisfied, gateway_passed, gateway_passed_at, epa_booking_date'
      )
      .in('user_id', ids)
      .order('updated_at', { ascending: false }),
    codes.length
      ? fetchAll<{
          qualification_code: string;
          unit_code: string;
          unit_title: string | null;
          ac_code: string;
        }>((a, b) =>
          db
            .from('qualification_requirements')
            .select('qualification_code, unit_code, unit_title, ac_code')
            .in('qualification_code', codes)
            .range(a, b)
        )
      : Promise.resolve({ rows: [], error: null }),
    studentIds.length
      ? fetchAll<CoverageRow>((a, b) =>
          db
            .from('student_ac_coverage')
            .select('student_id, qualification_code, unit_code, ac_code, status, evidence_count')
            .in('student_id', studentIds)
            // ELE-1912: only rows acState() can count. A not-started AC with no
            // evidence reads as null either way, and those were 94% of the
            // cohort's rows — eleven 1,000-row pages fetched one after another.
            .or('status.neq.not_started,evidence_count.gt.0')
            .range(a, b)
        )
      : Promise.resolve({ rows: [], error: null }),
    studentIds.length
      ? fetchAll<SignoffRow>((a, b) =>
          db
            .from('ac_signoffs')
            .select(
              'student_id, qualification_code, unit_code, ac_code, assessor_verdict, iqa_verdict'
            )
            .in('student_id', studentIds)
            .range(a, b)
        )
      : Promise.resolve({ rows: [], error: null }),
    gateQuery,
  ]);

  const rowsByUser = new Map<string, Am2Row[]>();
  for (const r of am2Res.rows) {
    const arr = rowsByUser.get(r.user_id) ?? [];
    if (arr.length < AM2_RUNS_LIMIT) arr.push(r);
    rowsByUser.set(r.user_id, arr);
  }
  // Newest gateway row per learner (a learner on two qualifications has two).
  for (const g of (gwRes.data ?? []) as GatewayRow[]) {
    if (!gateways.has(g.user_id)) gateways.set(g.user_id, g);
  }
  const acsByCode = new Map<string, typeof reqRes.rows>();
  for (const r of reqRes.rows) {
    const arr = acsByCode.get(r.qualification_code) ?? [];
    arr.push(r);
    acsByCode.set(r.qualification_code, arr);
  }
  const k = (st: string, q: string, u: string, a: string) => `${st}|${q}|${u}:${a}`;
  const cov = new Map(
    covRes.rows.map((c) => [k(c.student_id, c.qualification_code, c.unit_code, c.ac_code), c])
  );
  const so = new Map(
    soRes.rows.map((c) => [k(c.student_id, c.qualification_code, c.unit_code, c.ac_code), c])
  );

  // ELE-1917: the one criterion state per learner (get_portfolio_ac_state), so
  // the portfolio part here agrees with the gate line above it and with what
  // the learner reads. Six at a time; a learner it cannot read (no account,
  // no qualification) falls back to the college's coverage rows below.
  const acStateByUser = new Map<
    string,
    Array<{ unit_code: string; ac_code: string; state: string; qualification_code: string | null }>
  >();
  {
    const users = [...uniq.keys()];
    for (let i = 0; i < users.length; i += 6) {
      await Promise.all(
        users.slice(i, i + 6).map(async (uid) => {
          const { data, error } = await db.rpc('get_portfolio_ac_state', { p_user_id: uid });
          if (!error && Array.isArray(data) && data.length) acStateByUser.set(uid, data as never);
        })
      );
    }
  }

  for (const [userId, t] of uniq) {
    const counted = (rowsByUser.get(userId) ?? []).filter(countsTowardsReady);
    const enrolledCode = t.qualificationCode ?? null;
    const code = requirementOf(enrolledCode);
    const acs = code ? (acsByCode.get(code) ?? []) : [];
    let portfolio: PortfolioCoverage | null = null;
    const stateRows = (acStateByUser.get(userId) ?? []).filter(
      (r) => !code || !r.qualification_code || r.qualification_code === code
    );
    if (code && acs.length && stateRows.length) {
      const rows: Array<{ unit_code: string; ac_code: string; state: 'evidenced' | 'signed_off' }> =
        [];
      for (const r of stateRows) {
        if (r.state === 'passed' || r.state === 'iqa_confirmed')
          rows.push({ unit_code: r.unit_code, ac_code: r.ac_code, state: 'signed_off' });
        else if (r.state === 'claimed' || r.state === 'submitted')
          rows.push({ unit_code: r.unit_code, ac_code: r.ac_code, state: 'evidenced' });
      }
      portfolio = portfolioCoverage(acs, rows);
    } else if (code && t.studentId && acs.length) {
      const rows: Array<{ unit_code: string; ac_code: string; state: 'evidenced' | 'signed_off' }> =
        [];
      for (const ac of acs) {
        const key = k(t.studentId, code, ac.unit_code, ac.ac_code);
        const state = acState(cov.get(key), so.get(key));
        if (state) rows.push({ unit_code: ac.unit_code, ac_code: ac.ac_code, state });
      }
      portfolio = portfolioCoverage(acs, rows);
    }
    models.set(
      userId,
      buildEpaReadiness(
        buildSections(counted),
        gateways.get(userId) ?? null,
        code,
        portfolio,
        enrolledCode,
        gates[userId] ?? null
      )
    );
  }
  return {
    models,
    gateways,
    error:
      am2Res.error ?? gwRes.error?.message ?? reqRes.error ?? covRes.error ?? soRes.error ?? null,
  };
}

/** One learner's model, for Student 360 and the print page. The qualification
 *  comes from the shared resolver (resolve_learner_qualification), so the
 *  tutor sees the learner's own route and ACs. */
export function useLearnerEpaReadinessModel(userId: string | null, studentId: string | null) {
  const [model, setModel] = useState<EpaReadinessModel | null>(null);
  const [qualification, setQualification] = useState<{
    code: string | null;
    title: string | null;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!userId) {
      setModel(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    let code: string | null = null;
    let title: string | null = null;
    const { data: q } = await db.rpc('resolve_learner_qualification', {
      p_user_id: userId,
      p_student_id: studentId,
    });
    const qr = q as {
      requirement_code?: string | null;
      code?: string | null;
      title?: string | null;
    } | null;
    // The enrolled code: the route comes from it, and the model maps it to
    // the requirement code for the ACs — the same way the cohort page does.
    code = qr?.code ?? qr?.requirement_code ?? null;
    title = qr?.title ?? null;
    setQualification({ code, title });
    const { models, error: err } = await fetchEpaReadinessModels([
      { userId, studentId, qualificationCode: code },
    ]);
    setModel(models.get(userId) ?? null);
    setError(err);
    setLoading(false);
  }, [userId, studentId]);

  useEffect(() => {
    void load();
  }, [load]);

  return { model, qualification, loading, error, reload: load };
}

/**
 * The one verdict a learner is counted under: the tutor's, otherwise the AI's
 * (shown as an AI prediction, not a decision). The learner's own view is
 * context only — the cohort page used to count a learner as ready if ANY
 * voice said so, including their own.
 */
export function effectiveVerdict(
  tutor: EpaJudgement | null,
  ai: EpaJudgement | null
): { judgement: EpaJudgement; source: 'tutor' | 'ai'; isPrediction: boolean } | null {
  if (tutor) return { judgement: tutor, source: 'tutor', isPrediction: false };
  if (ai) return { judgement: ai, source: 'ai', isPrediction: true };
  return null;
}

/** The AI verdict is newer than the tutor's — it needs a co-sign or override. */
export function aiNeedsSignOff(tutor: EpaJudgement | null, ai: EpaJudgement | null): boolean {
  if (!ai) return false;
  if (!tutor) return true;
  return new Date(ai.created_at).getTime() > new Date(tutor.created_at).getTime();
}

export const VERDICT_LABEL: Record<string, string> = {
  ready: 'Ready',
  almost: 'Almost',
  not_yet: 'Not yet',
  refer: 'Refer',
};

/** "today", "3 days ago", "5 weeks ago". */
export function ageLabel(iso: string | null | undefined): string | null {
  if (!iso) return null;
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000);
  if (days <= 0) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 14) return `${days} days ago`;
  return `${Math.round(days / 7)} weeks ago`;
}

/** Case-insensitive "still on programme" for college_students.status — the
 *  app writes 'Withdrawn'/'Completed' with capitals but filters used
 *  lower-case, so withdrawn learners counted. */
export function isOnProgramme(status: string | null | undefined): boolean {
  const s = (status ?? '').toLowerCase();
  return s !== 'withdrawn' && s !== 'completed';
}
