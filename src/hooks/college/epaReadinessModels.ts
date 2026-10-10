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

  // ELE-1912: the criteria for every learner in one call (see below), started
  // now so it runs alongside the gate, AM2 and checklist reads, not after them.
  // (A query builder only sends when it is awaited: Promise.resolve sends it now.)
  const manyQuery = ids.length
    ? Promise.resolve(db.rpc('get_portfolio_ac_state_many', { p_user_ids: ids }))
    : Promise.resolve({ data: {} as unknown, error: null });

  const [am2Res, gwRes, gates] = await Promise.all([
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
  // ELE-1917: the one criterion state per learner (get_portfolio_ac_state), so
  // the portfolio part here agrees with the gate line above it and with what
  // the learner reads. Six at a time; a learner it cannot read (no account,
  // no qualification) has no portfolio figure rather than a stand-in.
  const acStateByUser = new Map<
    string,
    Array<{
      unit_code: string;
      unit_title: string | null;
      ac_code: string;
      state: string;
      qualification_code: string | null;
    }>
  >();
  {
    const users = [...uniq.keys()];
    // ELE-1912: one call for every learner (get_portfolio_ac_state_many runs
    // get_portfolio_ac_state for each, same permission check, compact rows)
    // instead of one 280 KB call per learner in waves of six. If it is not
    // there (an older database), fall back to the per-learner loop below.
    const many = await manyQuery;
    if (!many.error && many.data && typeof many.data === 'object') {
      type Compact = { q: string | null; u: Record<string, string | null>; r: [string, string, string][] };
      for (const [uid, c] of Object.entries(many.data as Record<string, Compact>)) {
        if (!c?.r?.length) continue;
        acStateByUser.set(
          uid,
          c.r.map(([unit_code, ac_code, state]) => ({
            unit_code,
            unit_title: c.u?.[unit_code] ?? null,
            ac_code,
            state,
            qualification_code: c.q,
          }))
        );
      }
    }
    for (let i = 0; many.error && i < users.length; i += 6) {
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
    let portfolio: PortfolioCoverage | null = null;
    // The criteria are exactly the rows get_portfolio_ac_state returns (it
    // resolves the learner's qualification itself), so the total and the
    // passed count match Student 360 and the gate's criteria line. Nothing
    // from it means not known: student_ac_coverage is never a stand-in.
    const stateRows = acStateByUser.get(userId) ?? [];
    if (stateRows.length) {
      const rows: Array<{ unit_code: string; ac_code: string; state: 'evidenced' | 'signed_off' }> =
        [];
      for (const r of stateRows) {
        if (r.state === 'passed' || r.state === 'iqa_confirmed')
          rows.push({ unit_code: r.unit_code, ac_code: r.ac_code, state: 'signed_off' });
        else if (r.state === 'claimed' || r.state === 'submitted')
          rows.push({ unit_code: r.unit_code, ac_code: r.ac_code, state: 'evidenced' });
      }
      portfolio = portfolioCoverage(stateRows, rows);
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
    error: am2Res.error ?? gwRes.error?.message ?? null,
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
