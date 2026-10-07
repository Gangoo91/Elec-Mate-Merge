// AI EPA Readiness — produces an exceptional, citation-grade EPA verdict
// blending cross-hub evidence with BS 7671 facet citations and qualification
// ACs/LOs. Streams via SSE, then writes a source='ai' row into
// college_epa_judgements ready for the tutor to co-sign or override.
//
// 6 Oct 2026 (college EPA audit):
//  - The learner is sent as a pseudonym ("the learner"); no name, and no
//    SEND/EAL/EHCP flags (special-category data; no college opt-in exists).
//  - Context adds the gateway row, functional skills, and AM2 practice by
//    section (Assessment runs only — the same rule as the app's readiness).
//  - Off-the-job hours come from ONE source (gateway row, else the provider's
//    college_otj_entries, else the learner's log) against the gateway row's
//    planned hours — no fixed 624 h, no adding two logs together.
//  - If the client goes away (Stop / close), the OpenAI call is aborted and
//    nothing is saved; the stream is closed once.
//
// 8 Oct 2026 (ELE-1872): the gateway lines, the criteria counts and the
// off-the-job hours now come from the app's own RPCs, run with the tutor's
// JWT: get_gateway_readiness (the gate the learner and tutor see) and
// get_portfolio_ac_state (criteria states). The function no longer works out
// its own hours or coverage, so its verdict cannot quote different figures
// from the gate. student_ac_coverage is read only for a learner with no app
// account, where neither RPC can run.
//
// Inputs:  POST { college_student_id }
// Output:  SSE stream → status / signals / draft / done / error events
//          + final insert into college_epa_judgements

import {
  epaRouteFor,
  routeFactsBlock,
  routeIsGraded,
  type EpaRouteKind,
} from '../_shared/epa-route.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';

import { withSentry } from '../_shared/sentry.ts';
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

const CHAT_MODEL = 'gpt-5.4-mini-2026-03-17';
const MAX_COMPLETION_TOKENS = 6_000;
const STREAM_TIMEOUT_MS = 120_000;
const FACET_TOP_K = 4;

interface EpaRequest {
  college_student_id: string;
  /** Optional tutor focus / instruction */
  instruction?: string;
}

function sseEvent(event: string, data: unknown): Uint8Array {
  return new TextEncoder().encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
}
function sseComment(msg: string): Uint8Array {
  return new TextEncoder().encode(`: ${msg}\n\n`);
}

async function authoriseStaff(req: Request, sb: ReturnType<typeof createClient>) {
  const auth = req.headers.get('authorization');
  if (!auth) return { user: null, profile: null, userClient: null, error: 'unauthorized' as const };
  const userClient = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_ANON_KEY')!,
    { global: { headers: { Authorization: auth } }, auth: { persistSession: false } }
  );
  const { data: userData } = await userClient.auth.getUser();
  if (!userData?.user)
    return { user: null, profile: null, userClient: null, error: 'unauthorized' as const };
  // Staff means an active college_staff row. profiles.college_id was used
  // before, and learners carry it too — so any learner could run this on a
  // classmate and send their SEND/EHCP details to the model.
  const { data: staff } = await sb
    .from('college_staff')
    .select('college_id')
    .eq('user_id', userData.user.id)
    .is('archived_at', null);
  const collegeIds = ((staff ?? []) as { college_id: string | null }[])
    .map((r) => r.college_id)
    .filter((id): id is string => !!id);
  if (!collegeIds.length)
    return { user: userData.user, profile: null, userClient: null, error: 'not_staff' as const };
  return {
    user: userData.user,
    profile: { id: userData.user.id, collegeIds },
    // The RPCs that check auth.uid() (get_gateway_readiness,
    // get_portfolio_ac_state) run as the tutor through this client.
    userClient,
    error: null,
  };
}

/** get_gateway_readiness output, as the app shows it. */
interface GateSnapshot {
  overall: string;
  met: number;
  total: number;
  gateway_passed: boolean;
  items: Array<{
    key: string;
    label: string;
    state: string;
    sentence: string;
    figures?: Record<string, unknown>;
  }>;
}

interface EpaContext {
  student: { id: string; user_id: string | null; name: string; college_id: string };
  /** The gate (ELE-1872); null when the learner has no app account or it did not load. */
  gate: GateSnapshot | null;
  course: { name: string | null; code: string | null } | null;
  ac: {
    total: number;
    not_started: number;
    in_progress: number;
    evidenced: number;
    assessed: number;
    confirmed: number;
    /** Where the counts come from. */
    source: string;
    weak_units: Array<{
      unit_code: string;
      unit_title: string | null;
      not_started: number;
      total: number;
    }>;
  };
  observations: Array<{
    activity_title: string;
    outcome: string;
    grade: string | null;
    observed_at: string;
    unit_code: string | null;
  }>;
  otj: {
    total_minutes: number;
    required_minutes: number | null;
    pct: number | null;
    source: string;
  };
  portfolio: {
    items: number;
    submissions: number;
    iqa_verified: number;
    awaiting_review: number;
    requires_action: number;
  };
  mocks: Array<{
    session_type: string;
    overall_score: number | null;
    predicted_grade: string | null;
    completed_at: string | null;
  }>;
  gateway: Record<string, unknown> | null;
  functionalSkills: Array<{
    subject: string;
    level: string | null;
    status: string | null;
    exemption_reason: string | null;
  }>;
  am2: Array<{ section: string; title: string; bar: number; recent: number[]; ready: boolean }>;
  priorAi: {
    verdict: string;
    predicted_grade: string | null;
    confidence: number | null;
    created_at: string;
  } | null;
  priorTutor: {
    verdict: string;
    predicted_grade: string | null;
    confidence: number | null;
    created_at: string;
  } | null;
  priorLearner: {
    verdict: string;
    predicted_grade: string | null;
    confidence: number | null;
    created_at: string;
  } | null;
}

async function loadContext(
  sb: ReturnType<typeof createClient>,
  asCaller: ReturnType<typeof createClient>,
  studentId: string
): Promise<EpaContext | null> {
  const { data: student } = await sb
    .from('college_students')
    .select('id, user_id, name, college_id, course_id')
    .eq('id', studentId)
    .maybeSingle();
  if (!student) return null;

  const authUid = (student.user_id as string | null) ?? null;

  // Course
  let course: EpaContext['course'] = null;
  let qualCode: string | null = null;
  if (student.course_id) {
    const { data: c } = await sb
      .from('college_courses')
      .select('name, code')
      .eq('id', student.course_id)
      .maybeSingle();
    if (c) {
      course = { name: (c.name as string | null) ?? null, code: (c.code as string | null) ?? null };
      qualCode = course.code;
    }
  }

  // The gate and the criteria states, from the app's own RPCs (run as the
  // tutor; both check they may assess this learner). Authoritative: the
  // verdict quotes these figures and never works out its own.
  type AcRow = { unit_code: string; unit_title: string | null; state: string };
  type Rpc = (
    fn: string,
    args: Record<string, unknown>
  ) => PromiseLike<{ data: unknown; error: { message: string } | null }>;
  const rpc = asCaller.rpc.bind(asCaller) as unknown as Rpc;
  let gate: GateSnapshot | null = null;
  let acRows: AcRow[] | null = null;
  if (authUid) {
    const [g, a] = await Promise.all([
      rpc('get_gateway_readiness', { p_learner: authUid }),
      rpc('get_portfolio_ac_state', { p_user_id: authUid }),
    ]);
    if (g.error) console.error('get_gateway_readiness', g.error.message);
    else gate = (g.data as GateSnapshot | null) ?? null;
    if (a.error) console.error('get_portfolio_ac_state', a.error.message);
    else acRows = (a.data ?? []) as AcRow[];
  }

  // Criteria counts in the existing shape (callers read signals_used.ac):
  //   not_started  not started or only AI-suggested
  //   in_progress  claimed but not sent, or sent back for more
  //   evidenced    with the assessor
  //   assessed     passed by the assessor
  //   confirmed    passed and confirmed by IQA
  type Bucket = 'not_started' | 'in_progress' | 'evidenced' | 'assessed' | 'confirmed';
  const AC_BUCKET: Record<string, Bucket> = {
    not_started: 'not_started',
    suggested: 'not_started',
    claimed: 'in_progress',
    referred: 'in_progress',
    not_yet: 'in_progress',
    iqa_rejected: 'in_progress',
    submitted: 'evidenced',
    passed: 'assessed',
    iqa_confirmed: 'confirmed',
  };
  const ac: EpaContext['ac'] = {
    total: 0,
    not_started: 0,
    in_progress: 0,
    evidenced: 0,
    assessed: 0,
    confirmed: 0,
    source: 'none recorded',
    weak_units: [],
  };
  const unitMap = new Map<string, { not_started: number; total: number; title: string | null }>();
  const count = (unit: string, title: string | null, bucket: Bucket) => {
    ac.total += 1;
    ac[bucket] += 1;
    let u = unitMap.get(unit);
    if (!u) {
      u = { not_started: 0, total: 0, title };
      unitMap.set(unit, u);
    }
    u.total += 1;
    if (bucket === 'not_started') u.not_started += 1;
  };
  if (acRows && acRows.length) {
    ac.source = 'portfolio criteria states (get_portfolio_ac_state)';
    for (const r of acRows) count(r.unit_code, r.unit_title, AC_BUCKET[r.state] ?? 'not_started');
  } else if (!authUid) {
    // No app account: neither RPC can run. The college's own AC tracker.
    const { data: cov } = await sb
      .from('student_ac_coverage')
      .select('unit_code, status')
      .eq('student_id', studentId);
    const legacy = new Set<string>([
      'not_started',
      'in_progress',
      'evidenced',
      'assessed',
      'confirmed',
    ]);
    for (const row of (cov ?? []) as Array<{ unit_code: string; status: string }>) {
      count(row.unit_code, null, (legacy.has(row.status) ? row.status : 'not_started') as Bucket);
    }
    if (ac.total) ac.source = 'college AC tracker (no app account)';
  }
  // Weak units = highest not_started ratio (top 6)
  const weakSorted = Array.from(unitMap.entries())
    .map(([unit_code, v]) => ({ unit_code, ...v, ratio: v.total ? v.not_started / v.total : 0 }))
    .sort((a, b) => b.ratio - a.ratio)
    .slice(0, 6)
    .filter((u) => u.not_started > 0);
  ac.weak_units = weakSorted.map((w) => ({
    unit_code: w.unit_code,
    unit_title: w.title,
    not_started: w.not_started,
    total: w.total,
  }));
  // Pull unit titles
  if (qualCode && ac.weak_units.some((w) => !w.unit_title)) {
    const { data: titles } = await sb
      .from('qualification_requirements')
      .select('unit_code, unit_title')
      .eq('qualification_code', qualCode)
      .in(
        'unit_code',
        ac.weak_units.map((w) => w.unit_code)
      );
    const titleMap = new Map<string, string | null>();
    for (const t of (titles ?? []) as Array<{ unit_code: string; unit_title: string | null }>) {
      titleMap.set(t.unit_code, t.unit_title);
    }
    for (const w of ac.weak_units) w.unit_title = w.unit_title ?? titleMap.get(w.unit_code) ?? null;
  }

  // Observations — last 8 for evidence
  const { data: obs } = await sb
    .from('college_observations')
    .select('activity_title, outcome, grade, observed_at, unit_code')
    .eq('college_student_id', studentId)
    .order('observed_at', { ascending: false })
    .limit(8);
  const observations = (
    (obs ?? []) as Array<{
      activity_title: string;
      outcome: string;
      grade: string | null;
      observed_at: string;
      unit_code: string | null;
    }>
  ).map((o) => ({
    activity_title: o.activity_title,
    outcome: o.outcome,
    grade: o.grade,
    observed_at: o.observed_at,
    unit_code: o.unit_code,
  }));

  // Gateway row first — it carries the planned off-the-job hours.
  let gateway: EpaContext['gateway'] = null;
  if (authUid) {
    const { data } = await sb
      .from('epa_gateway_checklist')
      .select('*')
      .eq('user_id', authUid)
      .order('updated_at', { ascending: false })
      .limit(1)
      .maybeSingle();
    gateway = (data as EpaContext['gateway']) ?? null;
  }

  // Off-the-job hours: the gate's own line (counted against required), so
  // the verdict and the gate always quote the same hours.
  const otjLine = gate?.items?.find((i) => i.key === 'otj') ?? null;
  const counted = otjLine?.figures?.counted != null ? Number(otjLine.figures.counted) : null;
  const required = otjLine?.figures?.required != null ? Number(otjLine.figures.required) : null;
  const otj = {
    total_minutes: Math.round((counted ?? 0) * 60),
    required_minutes: required ? Math.round(required * 60) : null,
    pct: required ? Math.min(100, Math.round(((counted ?? 0) / required) * 100)) : null,
    source: otjLine
      ? 'gateway check (counted hours)'
      : gate
        ? 'not an apprenticeship standard: no hours line on the gateway'
        : 'not available: the gateway check did not run',
  };

  // Portfolio summary
  let portfolio: EpaContext['portfolio'] = {
    items: 0,
    submissions: 0,
    iqa_verified: 0,
    awaiting_review: 0,
    requires_action: 0,
  };
  if (authUid) {
    const [items, subs] = await Promise.all([
      sb
        .from('portfolio_items')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', authUid),
      sb
        .from('portfolio_submissions')
        .select('status, action_required, iqa_outcome')
        .eq('user_id', authUid),
    ]);
    const subRows = (subs.data ?? []) as Array<{
      status: string;
      action_required: string | null;
      iqa_outcome: string | null;
    }>;
    portfolio = {
      items: items.count ?? 0,
      submissions: subRows.length,
      iqa_verified: subRows.filter((s) => s.iqa_outcome === 'verified').length,
      awaiting_review: subRows.filter((s) =>
        ['submitted', 'in_review', 'under_review', 'resubmitted'].includes(s.status)
      ).length,
      requires_action: subRows.filter((s) => s.action_required).length,
    };
  }

  // Mock simulator runs
  let mocks: EpaContext['mocks'] = [];
  if (authUid) {
    const { data } = await sb
      .from('epa_mock_sessions')
      .select('session_type, overall_score, predicted_grade, completed_at')
      .eq('user_id', authUid)
      .eq('status', 'completed')
      .order('completed_at', { ascending: false })
      .limit(8);
    mocks = (
      (data ?? []) as Array<{
        session_type: string;
        overall_score: number | null;
        predicted_grade: string | null;
        completed_at: string | null;
      }>
    ).map((m) => ({
      session_type: m.session_type,
      overall_score: m.overall_score,
      predicted_grade: m.predicted_grade,
      completed_at: m.completed_at,
    }));
  }

  // Functional skills (English / maths) — the gateway needs them for under-19 starters.
  const { data: fsRows } = await sb
    .from('college_functional_skills')
    .select('subject, level, status, exemption_reason')
    .eq('student_id', studentId);
  const functionalSkills = ((fsRows ?? []) as EpaContext['functionalSkills']) ?? [];

  // AM2 practice by section. Same rule as the app's readiness
  // (src/hooks/am2/useAM2Sections.ts countsTowardsReady): Assessment runs
  // only, and for the knowledge paper only full sittings (30+ questions).
  const AM2_DEFS = [
    { type: 'safe_working', section: 'A1', title: 'Safe working and planning', bar: 80 },
    {
      type: 'testing_sequence',
      section: 'B',
      title: 'Inspection, testing and certification',
      bar: 80,
    },
    { type: 'safe_isolation', section: 'C', title: 'Safe isolation', bar: 100 },
    { type: 'fault_diagnosis', section: 'D', title: 'Fault diagnosis', bar: 80 },
    { type: 'knowledge_test', section: 'E', title: 'Knowledge test', bar: 70 },
  ];
  let am2: EpaContext['am2'] = [];
  if (authUid) {
    const { data: runs } = await sb
      .from('am2_mock_sessions')
      .select('session_type, overall_score, completed_at, component_scores, session_data')
      .eq('user_id', authUid)
      .eq('status', 'completed')
      .order('completed_at', { ascending: false })
      .limit(200);
    const counted = (
      (runs ?? []) as Array<{
        session_type: string;
        overall_score: number | null;
        completed_at: string | null;
        component_scores: { mode?: string; fullPaper?: boolean; total?: number } | null;
        session_data: { mode?: string } | null;
      }>
    ).filter((r) => {
      const mode = r.component_scores?.mode;
      if (mode === 'learn' || mode === 'practise') return false;
      if (r.session_type === 'knowledge_test' && r.component_scores?.fullPaper === false)
        return false;
      if (r.session_type === 'knowledge_test' && (r.component_scores?.total ?? 30) < 30)
        return false;
      if (!mode && ['guided', 'practice'].includes(r.session_data?.mode ?? '')) return false;
      return r.overall_score != null;
    });
    am2 = AM2_DEFS.map((d) => {
      const mine = counted.filter((r) => r.session_type === d.type).slice(0, 5);
      const recent = mine.map((r) => Math.round(Number(r.overall_score)));
      // Same rule as the app: two in a row at the bar, and "ready" fades back
      // to practising after 30 days without an Assessment run.
      const lastAt = mine[0]?.completed_at ? new Date(mine[0].completed_at).getTime() : 0;
      const fresh = Date.now() - lastAt <= 30 * 86_400_000;
      return {
        section: d.section,
        title: d.title,
        bar: d.bar,
        recent,
        ready: fresh && recent.length >= 2 && recent[0] >= d.bar && recent[1] >= d.bar,
      };
    });
  }

  // Prior judgements (so AI can be aware of agreement / supersede)
  const priorBy = async (source: string) => {
    const { data } = await sb
      .from('college_epa_judgements')
      .select('verdict, predicted_grade, confidence, created_at')
      .eq('college_student_id', studentId)
      .eq('source', source)
      .eq('is_current', true)
      .maybeSingle();
    return data as EpaContext['priorAi'] | null;
  };
  const [priorAi, priorTutor, priorLearner] = await Promise.all([
    priorBy('ai'),
    priorBy('tutor'),
    priorBy('learner'),
  ]);

  return {
    student: {
      id: student.id as string,
      user_id: authUid,
      name: (student.name as string) ?? 'Learner',
      college_id: student.college_id as string,
    },
    gate,
    course,
    ac,
    observations,
    otj,
    portfolio,
    mocks,
    gateway,
    functionalSkills,
    am2,
    priorAi,
    priorTutor,
    priorLearner,
  };
}

/**
 * Pulls top BS 7671 facets for the learner's weak topic areas using the
 * existing match_bs7671_for_text RPC (text query — RRF + BM25 internally).
 */
async function lookupFacets(
  sb: ReturnType<typeof createClient>,
  ctx: EpaContext
): Promise<
  Array<{
    ref: string;
    topic: string;
    content: string;
    regulation_id: string | null;
    reg_part: string | null;
  }>
> {
  const queries: string[] = [];
  for (const w of ctx.ac.weak_units.slice(0, 4)) {
    if (w.unit_title) queries.push(w.unit_title);
    else queries.push(`unit ${w.unit_code}`);
  }
  for (const o of ctx.observations
    .filter((o) => o.outcome === 'partial' || o.outcome === 'referred')
    .slice(0, 2)) {
    queries.push(o.activity_title);
  }
  if (queries.length === 0) {
    queries.push('inspection and testing initial verification');
  }

  const facets: Array<{
    ref: string;
    topic: string;
    content: string;
    regulation_id: string | null;
    reg_part: string | null;
  }> = [];
  for (const q of queries) {
    try {
      const { data, error } = await sb.rpc('match_bs7671_for_text', {
        q_text: q,
        doc_type: null,
        max_results: FACET_TOP_K,
      });
      if (error) {
        console.warn('[ai-epa-readiness] facet RPC error', q, error.message);
        continue;
      }
      const rows = (data ?? []) as Array<{
        regulation_id: string | null;
        reg_number: string | null;
        reg_title: string | null;
        reg_part: string | null;
        primary_topic: string | null;
        content: string | null;
      }>;
      for (const row of rows) {
        facets.push({
          ref: row.reg_number ?? row.primary_topic ?? 'BS 7671',
          topic: q,
          content: (row.content ?? '').slice(0, 360),
          regulation_id: row.regulation_id ?? null,
          reg_part: row.reg_part ?? null,
        });
      }
    } catch (e) {
      console.warn('[ai-epa-readiness] facet lookup failed', q, (e as Error).message);
    }
  }
  // Dedupe by regulation_id (or fallback to ref+content prefix)
  const seen = new Set<string>();
  return facets.filter((f) => {
    const key = f.regulation_id ?? `${f.ref}|${f.content.slice(0, 80)}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function buildSystemPrompt(route: EpaRouteKind): string {
  return `You are an experienced UK End-Point Assessor for electrical apprenticeships. You are NOT replacing the tutor — you produce a reasoned, evidence-grounded second opinion that a tutor will then co-sign or override.

Your job: assess whether the learner is ready for their end assessment, predict a likely outcome, and explain *exactly why* with citations.

${routeFactsBlock(route)}

OUTPUT RULES:
- Use UK English (analyse, behaviour, organisation, programme).
- Ground every blocker in concrete evidence from the data provided.
- When you cite BS 7671, use the regulation reference shown in the facet list (e.g. "411.3.2" or "Part 6"). Quote a short snippet only if it's directly load-bearing.
- Be honest about confidence: a learner with 2 mock attempts and 60% portfolio coverage has lower-confidence verdicts than one with 8 mocks and 95% coverage.
- "What if" suggestions must be specific and actionable: "Complete the 5 remaining ACs in Unit 5 (Inspection & Testing) and submit 1 more practical observation evidencing IR sequencing" — not "do more work".
- Do NOT invent ACs, units, or regulations that aren't in the provided data.
- The Gateway lines, the qualification criteria counts and the off-the-job hours are the app's own figures, the same ones the learner and tutor see. Quote them exactly as given; never work out different numbers, and never call a gateway line met when it says in hand or missing.
- If data is sparse (e.g. no mocks, no observations), say so and lower confidence accordingly.

You will call the tool submit_epa_verdict EXACTLY ONCE with the structured verdict.`;
}

function buildUserPrompt(
  ctx: EpaContext,
  facets: Array<{
    ref: string;
    topic: string;
    content: string;
    regulation_id: string | null;
    reg_part: string | null;
  }>,
  instruction?: string
): string {
  const lines: string[] = [];
  // Pseudonymised: the model never needs the learner's name.
  lines.push('# The learner');
  if (ctx.course) lines.push(`Course: ${ctx.course.name ?? '?'} (${ctx.course.code ?? '?'})`);

  lines.push('');
  lines.push('## AM2 practice (Assessment runs only, newest first)');
  if (ctx.am2.length === 0 || ctx.am2.every((a) => a.recent.length === 0)) {
    lines.push('No counted AM2 practice yet.');
  } else {
    for (const a of ctx.am2) {
      lines.push(
        `- Section ${a.section} ${a.title} (bar ${a.bar}%): ${a.recent.length ? a.recent.join(', ') + '%' : 'not tried'}${a.ready ? ' — at the bar twice in a row' : ''}`
      );
    }
  }

  lines.push('');
  lines.push("## Gateway (the app's own check: authoritative, quote it as given)");
  if (!ctx.gate) {
    lines.push('Not available: the learner has no app account or the check did not load.');
  } else {
    lines.push(
      `${ctx.gate.met} of ${ctx.gate.total} met${ctx.gate.gateway_passed ? ' · gateway passed' : ''}. Each line: met, in hand (under way or waiting on someone) or missing.`
    );
    const word: Record<string, string> = { green: 'met', amber: 'in hand', red: 'missing' };
    for (const i of ctx.gate.items)
      lines.push(`- ${i.label}: ${word[i.state] ?? i.state}. ${i.sentence}`);
  }
  const g = (ctx.gateway ?? {}) as Record<string, unknown>;
  if (g.epa_booking_date) lines.push(`EPA booked for ${g.epa_booking_date}.`);

  lines.push('');
  lines.push('## Functional skills');
  if (ctx.functionalSkills.length === 0) lines.push('None recorded.');
  for (const f of ctx.functionalSkills) {
    lines.push(
      `- ${f.subject}${f.level ? ` (${f.level})` : ''}: ${f.status ?? '?'}${f.exemption_reason ? ` — exempt: ${f.exemption_reason}` : ''}`
    );
  }

  lines.push('');
  lines.push('## Qualification criteria (authoritative counts)');
  lines.push(`Total: ${ctx.ac.total} (source: ${ctx.ac.source})`);
  lines.push(`- not started: ${ctx.ac.not_started}`);
  lines.push(`- claimed or sent back for more: ${ctx.ac.in_progress}`);
  lines.push(`- with the assessor: ${ctx.ac.evidenced}`);
  lines.push(`- passed by the assessor: ${ctx.ac.assessed}`);
  lines.push(`- passed and confirmed by IQA: ${ctx.ac.confirmed}`);
  if (ctx.ac.weak_units.length) {
    lines.push('Weakest units:');
    for (const w of ctx.ac.weak_units) {
      lines.push(
        `  - ${w.unit_code}${w.unit_title ? ` (${w.unit_title})` : ''}: ${w.not_started}/${w.total} not started`
      );
    }
  }

  lines.push('');
  lines.push('## Observations');
  if (ctx.observations.length === 0) lines.push('None recorded.');
  for (const o of ctx.observations.slice(0, 6)) {
    lines.push(
      `- [${o.outcome}${o.grade ? ` · ${o.grade}` : ''}] ${o.activity_title} (${o.observed_at?.slice(0, 10) ?? '?'})`
    );
  }

  lines.push('');
  lines.push('## Off-the-job hours (from the gateway check)');
  lines.push(
    ctx.otj.required_minutes
      ? `${Math.round(ctx.otj.total_minutes / 60)}h of ${Math.round(ctx.otj.required_minutes / 60)}h planned (${ctx.otj.pct}%) — source: ${ctx.otj.source}`
      : `${Math.round(ctx.otj.total_minutes / 60)}h recorded (source: ${ctx.otj.source}); no planned total on record, so don't judge against a target.`
  );

  lines.push('');
  lines.push('## Portfolio');
  lines.push(
    `${ctx.portfolio.items} items, ${ctx.portfolio.submissions} submissions, IQA verified: ${ctx.portfolio.iqa_verified}, awaiting review: ${ctx.portfolio.awaiting_review}, action required: ${ctx.portfolio.requires_action}`
  );

  lines.push('');
  lines.push('## Mock EPA simulator runs (learner-driven self-assessment)');
  if (ctx.mocks.length === 0) lines.push('No mocks completed.');
  for (const m of ctx.mocks.slice(0, 6)) {
    lines.push(
      `- ${m.session_type}: ${m.overall_score ?? '?'}% → ${m.predicted_grade ?? '?'} (${m.completed_at?.slice(0, 10) ?? '?'})`
    );
  }

  lines.push('');
  lines.push('## Prior verdicts on this learner');
  if (ctx.priorTutor)
    lines.push(
      `Tutor (${ctx.priorTutor.created_at?.slice(0, 10)}): ${ctx.priorTutor.verdict} / ${ctx.priorTutor.predicted_grade ?? '?'}`
    );
  if (ctx.priorAi)
    lines.push(
      `AI prior (${ctx.priorAi.created_at?.slice(0, 10)}): ${ctx.priorAi.verdict} / ${ctx.priorAi.predicted_grade ?? '?'}`
    );
  if (ctx.priorLearner)
    lines.push(
      `Learner self (${ctx.priorLearner.created_at?.slice(0, 10)}): ${ctx.priorLearner.verdict} / ${ctx.priorLearner.predicted_grade ?? '?'}`
    );
  if (!ctx.priorTutor && !ctx.priorAi && !ctx.priorLearner) lines.push('None yet.');

  lines.push('');
  lines.push("## BS 7671 facets relevant to this learner's weak areas");
  if (facets.length === 0) {
    lines.push(
      'No regulations were retrieved. Do NOT cite any regulation — leave citations empty.'
    );
  } else {
    for (const f of facets.slice(0, 12)) {
      const part = f.reg_part ? ` · Part ${f.reg_part}` : '';
      lines.push(
        `- [ref: ${f.ref}${part}${f.regulation_id ? `, regulation_id: ${f.regulation_id}` : ''}] (matched: "${f.topic}") ${f.content}`
      );
    }
  }

  if (instruction) {
    lines.push('');
    lines.push('## Tutor instruction for this run');
    lines.push(instruction);
  }

  lines.push('');
  lines.push('Now produce the verdict via submit_epa_verdict.');

  return lines.join('\n');
}

const VERDICT_TOOL = {
  type: 'function',
  function: {
    name: 'submit_epa_verdict',
    description: "Submit the structured AI verdict on this learner's EPA readiness.",
    parameters: {
      type: 'object',
      additionalProperties: false,
      properties: {
        verdict: { type: 'string', enum: ['ready', 'almost', 'not_yet', 'refer'] },
        predicted_grade: { type: 'string', enum: ['distinction', 'merit', 'pass', 'fail'] },
        confidence: {
          type: 'integer',
          minimum: 0,
          maximum: 100,
          description: '0-100; how confident you are given the evidence base.',
        },
        rationale: {
          type: 'string',
          description: 'Concise narrative — the why behind verdict + grade. 3–6 sentences.',
        },
        strengths: {
          type: 'array',
          items: { type: 'string' },
          description: '3–5 specific strengths backed by evidence.',
        },
        blockers: {
          type: 'array',
          items: { type: 'string' },
          description:
            'Each blocker is concrete and specific (e.g. "IR test sequencing — last observation marked partial; no portfolio item evidences this").',
        },
        recommended_actions: {
          type: 'array',
          items: {
            type: 'object',
            additionalProperties: false,
            properties: {
              action: { type: 'string' },
              target_date: { type: 'string', description: 'ISO date or empty.' },
              lever_to_grade: {
                type: 'string',
                description: 'Which grade band this would move them toward.',
              },
            },
            required: ['action'],
          },
        },
        what_if: {
          type: 'array',
          description:
            'Counterfactuals: e.g. "If learner completes 5 ACs in Unit 5 + 1 more observation, predicted grade rises to Merit at 89% confidence."',
          items: {
            type: 'object',
            additionalProperties: false,
            properties: {
              change: { type: 'string' },
              new_grade: { type: 'string' },
              new_confidence: { type: 'integer', minimum: 0, maximum: 100 },
            },
            required: ['change', 'new_grade'],
          },
        },
        citations: {
          type: 'array',
          description:
            'BS 7671 references that support specific blockers. Use ONLY refs from the facet list provided.',
          items: {
            type: 'object',
            additionalProperties: false,
            properties: {
              ref: { type: 'string', description: 'BS 7671 reference, e.g. "411.3.2".' },
              regulation_id: {
                type: 'string',
                description: 'UUID from the provided facet list, or empty.',
              },
              snippet: {
                type: 'string',
                description: 'Short quoted/paraphrased snippet (≤200 chars).',
              },
              applies_to: {
                type: 'string',
                description: 'Which blocker / topic this citation backs.',
              },
            },
            required: ['ref', 'snippet', 'applies_to'],
          },
        },
        agreement_note: {
          type: 'string',
          description:
            'If a tutor/learner verdict already exists, briefly state where you agree or differ and why.',
        },
      },
      required: [
        'verdict',
        'predicted_grade',
        'confidence',
        'rationale',
        'strengths',
        'blockers',
        'recommended_actions',
      ],
    },
  },
} as const;

interface VerdictArgs {
  verdict: 'ready' | 'almost' | 'not_yet' | 'refer';
  predicted_grade: 'distinction' | 'merit' | 'pass' | 'fail';
  confidence: number;
  rationale: string;
  strengths: string[];
  blockers: string[];
  recommended_actions: Array<{ action: string; target_date?: string; lever_to_grade?: string }>;
  what_if?: Array<{ change: string; new_grade: string; new_confidence?: number }>;
  citations?: Array<{ ref: string; regulation_id?: string; snippet: string; applies_to: string }>;
  agreement_note?: string;
}

/** The gate as saved with the verdict: what it was judged against. */
function gateSummary(gate: GateSnapshot | null) {
  if (!gate) return null;
  return {
    overall: gate.overall,
    met: gate.met,
    total: gate.total,
    items: gate.items.map((i) => ({
      key: i.key,
      label: i.label,
      state: i.state,
      sentence: i.sentence,
    })),
  };
}

Deno.serve(
  withSentry('ai-epa-readiness', async (req) => {
    if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
    if (req.method !== 'POST')
      return new Response(JSON.stringify({ error: 'method_not_allowed' }), {
        status: 405,
        headers: { ...corsHeaders, 'content-type': 'application/json' },
      });

    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    const OPENAI_KEY = Deno.env.get('OPENAI_API_KEY');
    if (!SUPABASE_URL || !SERVICE_KEY || !OPENAI_KEY) {
      return new Response(JSON.stringify({ error: 'server_misconfigured' }), {
        status: 500,
        headers: { ...corsHeaders, 'content-type': 'application/json' },
      });
    }
    const sb = createClient(SUPABASE_URL, SERVICE_KEY, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    // Auth — staff only
    const { user, profile, userClient, error } = await authoriseStaff(req, sb);
    if (error || !user || !profile || !userClient) {
      return new Response(JSON.stringify({ error: error ?? 'unauthorized' }), {
        status: user ? 403 : 401,
        headers: { ...corsHeaders, 'content-type': 'application/json' },
      });
    }

    let body: EpaRequest;
    try {
      body = (await req.json()) as EpaRequest;
    } catch {
      return new Response(JSON.stringify({ error: 'invalid_json' }), {
        status: 400,
        headers: { ...corsHeaders, 'content-type': 'application/json' },
      });
    }
    if (!body.college_student_id) {
      return new Response(JSON.stringify({ error: 'missing_college_student_id' }), {
        status: 400,
        headers: { ...corsHeaders, 'content-type': 'application/json' },
      });
    }

    // The run stops — and nothing is saved — when the client goes away (Stop,
    // closing the sheet) or the time limit is hit. Before, the OpenAI call ran
    // on and a verdict the tutor had cancelled replaced the current one.
    const openaiAbort = new AbortController();
    let abandoned = false;
    const abandon = () => {
      abandoned = true;
      openaiAbort.abort();
    };
    req.signal?.addEventListener('abort', abandon);

    const stream = new ReadableStream({
      cancel() {
        abandon();
      },
      async start(controller) {
        let closed = false;
        const enqueue = (chunk: Uint8Array) => {
          if (closed) return;
          try {
            controller.enqueue(chunk);
          } catch {
            abandon();
          }
        };
        const heartbeat = setInterval(() => enqueue(sseComment('hb')), 15_000);
        // Closes once, however many paths reach it.
        const close = () => {
          if (closed) return;
          closed = true;
          clearInterval(heartbeat);
          clearTimeout(timeout);
          try {
            controller.close();
          } catch {
            /* already closed */
          }
        };
        const timeout = setTimeout(() => {
          enqueue(sseEvent('error', { message: 'timeout' }));
          abandon();
          close();
        }, STREAM_TIMEOUT_MS);

        try {
          enqueue(sseEvent('status', { phase: 'loading_signals' }));
          const ctx = await loadContext(sb, userClient, body.college_student_id);
          if (!ctx) {
            enqueue(sseEvent('error', { message: 'student_not_found' }));
            close();
            return;
          }
          // Tutor must be in the same college as the learner
          if (!profile.collegeIds.includes(ctx.student.college_id)) {
            enqueue(sseEvent('error', { message: 'forbidden' }));
            close();
            return;
          }

          enqueue(
            sseEvent('signals', {
              ac: ctx.ac,
              otj: ctx.otj,
              gate: gateSummary(ctx.gate),
              portfolio: ctx.portfolio,
              mocks_count: ctx.mocks.length,
              observations_count: ctx.observations.length,
              has_prior: {
                tutor: !!ctx.priorTutor,
                learner: !!ctx.priorLearner,
                ai: !!ctx.priorAi,
              },
            })
          );

          enqueue(sseEvent('status', { phase: 'retrieving_bs7671' }));
          const facets = await lookupFacets(sb, ctx);
          enqueue(sseEvent('status', { phase: 'reasoning', facets_pulled: facets.length }));

          const messages = [
            { role: 'system', content: buildSystemPrompt(epaRouteFor(ctx.course?.code)) },
            { role: 'user', content: buildUserPrompt(ctx, facets, body.instruction) },
          ];

          if (abandoned) return close();
          const completion = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            signal: openaiAbort.signal,
            headers: {
              authorization: `Bearer ${OPENAI_KEY}`,
              'content-type': 'application/json',
            },
            body: JSON.stringify({
              model: CHAT_MODEL,
              messages,
              tools: [VERDICT_TOOL],
              tool_choice: { type: 'function', function: { name: 'submit_epa_verdict' } },
              max_completion_tokens: MAX_COMPLETION_TOKENS,
            }),
          });

          if (!completion.ok) {
            const text = await completion.text();
            enqueue(
              sseEvent('error', { message: `openai_${completion.status}: ${text.slice(0, 240)}` })
            );
            close();
            return;
          }
          const json = (await completion.json()) as {
            choices: Array<{
              message: { tool_calls?: Array<{ function: { arguments: string } }> };
            }>;
          };
          const args = json.choices?.[0]?.message?.tool_calls?.[0]?.function?.arguments;
          if (!args) {
            enqueue(sseEvent('error', { message: 'no_tool_call' }));
            close();
            return;
          }
          let parsed: VerdictArgs;
          try {
            parsed = JSON.parse(args) as VerdictArgs;
          } catch (e) {
            enqueue(sseEvent('error', { message: `invalid_tool_args: ${(e as Error).message}` }));
            close();
            return;
          }

          // Keep only citations that point at a facet we actually gave it. The
          // prompt asks for that, but nothing checked, so an invented regulation
          // number could be saved and shown to a tutor as a citation.
          {
            const refs = new Set(facets.map((f) => f.ref.trim().toLowerCase()));
            const ids = new Set(facets.map((f) => f.regulation_id).filter(Boolean));
            parsed.citations = (parsed.citations ?? []).filter(
              (c) =>
                (c.regulation_id && ids.has(c.regulation_id)) ||
                refs.has((c.ref ?? '').trim().toLowerCase())
            );
          }

          // The client left or time ran out while the model was thinking: save nothing.
          if (abandoned) return close();

          // Merit/Distinction only exist on the graded route (ST0152).
          if (
            !routeIsGraded(epaRouteFor(ctx.course?.code)) &&
            (parsed.predicted_grade === 'merit' || parsed.predicted_grade === 'distinction')
          )
            parsed.predicted_grade = 'pass';

          // Persist as source='ai'
          const { data: inserted, error: insertErr } = await sb
            .from('college_epa_judgements')
            .insert({
              college_id: ctx.student.college_id,
              college_student_id: ctx.student.id,
              source: 'ai',
              source_user_id: user.id,
              source_name_snapshot: 'Mate AI · EPA Examiner',
              verdict: parsed.verdict,
              predicted_grade: parsed.predicted_grade,
              confidence: parsed.confidence,
              rationale: parsed.rationale,
              strengths: parsed.strengths ?? [],
              blockers: parsed.blockers ?? [],
              recommended_actions: parsed.recommended_actions ?? [],
              what_if: parsed.what_if ?? [],
              citations: parsed.citations ?? [],
              signals_used: {
                ac: ctx.ac,
                otj: ctx.otj,
                gate: gateSummary(ctx.gate),
                portfolio: ctx.portfolio,
                mocks_count: ctx.mocks.length,
                observations_count: ctx.observations.length,
                facets_pulled: facets.length,
                instruction: body.instruction ?? null,
                agreement_note: parsed.agreement_note ?? null,
              },
              is_current: true,
            })
            .select()
            .single();

          if (insertErr) {
            enqueue(sseEvent('error', { message: `db_insert_failed: ${insertErr.message}` }));
            close();
            return;
          }

          enqueue(sseEvent('done', { judgement: inserted, verdict: parsed }));
        } catch (e) {
          enqueue(sseEvent('error', { message: (e as Error).message ?? 'unknown' }));
        } finally {
          close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        ...corsHeaders,
        'content-type': 'text/event-stream; charset=utf-8',
        'cache-control': 'no-cache, no-transform',
        connection: 'keep-alive',
      },
    });
  })
);
