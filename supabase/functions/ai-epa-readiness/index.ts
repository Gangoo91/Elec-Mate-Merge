// AI EPA Readiness — produces an exceptional, citation-grade EPA verdict
// blending cross-hub evidence with BS 7671 facet citations and qualification
// ACs/LOs. Streams via SSE, then writes a source='ai' row into
// college_epa_judgements ready for the tutor to co-sign or override.
//
// Inputs:  POST { college_student_id }
// Output:  SSE stream → status / signals / draft / done / error events
//          + final insert into college_epa_judgements

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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
  if (!auth) return { user: null, profile: null, error: 'unauthorized' as const };
  const userClient = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_ANON_KEY')!,
    { global: { headers: { Authorization: auth } }, auth: { persistSession: false } }
  );
  const { data: userData } = await userClient.auth.getUser();
  if (!userData?.user) return { user: null, profile: null, error: 'unauthorized' as const };
  const { data: profile } = await sb
    .from('profiles')
    .select('id, college_id, full_name')
    .eq('id', userData.user.id)
    .maybeSingle();
  if (!profile?.college_id)
    return { user: userData.user, profile: null, error: 'no_college' as const };
  return { user: userData.user, profile, error: null };
}

interface EpaContext {
  student: { id: string; user_id: string | null; name: string; college_id: string };
  course: { name: string | null; code: string | null } | null;
  ac: {
    total: number;
    not_started: number;
    in_progress: number;
    evidenced: number;
    assessed: number;
    confirmed: number;
    weak_units: Array<{ unit_code: string; unit_title: string | null; not_started: number; total: number }>;
  };
  observations: Array<{ activity_title: string; outcome: string; grade: string | null; observed_at: string; unit_code: string | null }>;
  otj: { total_minutes: number; required_minutes: number; pct: number | null };
  portfolio: { items: number; submissions: number; iqa_verified: number; awaiting_review: number; requires_action: number };
  mocks: Array<{ session_type: string; overall_score: number | null; predicted_grade: string | null; completed_at: string | null }>;
  inclusion: { send_flags: string[]; eal: boolean; ehcp: boolean };
  gateway: Record<string, unknown> | null;
  priorAi: { verdict: string; predicted_grade: string | null; confidence: number | null; created_at: string } | null;
  priorTutor: { verdict: string; predicted_grade: string | null; confidence: number | null; created_at: string } | null;
  priorLearner: { verdict: string; predicted_grade: string | null; confidence: number | null; created_at: string } | null;
}

async function loadContext(
  sb: ReturnType<typeof createClient>,
  studentId: string
): Promise<EpaContext | null> {
  const { data: student } = await sb
    .from('college_students')
    .select('id, user_id, name, college_id, course_id, send_flags, eal, ehcp_ref')
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

  // AC coverage breakdown
  const { data: cov } = await sb
    .from('student_ac_coverage')
    .select('unit_code, status')
    .eq('student_id', studentId);
  const ac: EpaContext['ac'] = {
    total: 0,
    not_started: 0,
    in_progress: 0,
    evidenced: 0,
    assessed: 0,
    confirmed: 0,
    weak_units: [],
  };
  const unitMap = new Map<string, { not_started: number; total: number }>();
  for (const row of (cov ?? []) as Array<{ unit_code: string; status: string }>) {
    ac.total += 1;
    if (row.status === 'not_started') ac.not_started += 1;
    else if (row.status === 'in_progress') ac.in_progress += 1;
    else if (row.status === 'evidenced') ac.evidenced += 1;
    else if (row.status === 'assessed') ac.assessed += 1;
    else if (row.status === 'confirmed') ac.confirmed += 1;
    let u = unitMap.get(row.unit_code);
    if (!u) {
      u = { not_started: 0, total: 0 };
      unitMap.set(row.unit_code, u);
    }
    u.total += 1;
    if (row.status === 'not_started') u.not_started += 1;
  }
  // Weak units = highest not_started ratio (top 6)
  const weakSorted = Array.from(unitMap.entries())
    .map(([unit_code, v]) => ({ unit_code, ...v, ratio: v.total ? v.not_started / v.total : 0 }))
    .sort((a, b) => b.ratio - a.ratio)
    .slice(0, 6)
    .filter((u) => u.not_started > 0);
  ac.weak_units = weakSorted.map((w) => ({
    unit_code: w.unit_code,
    unit_title: null,
    not_started: w.not_started,
    total: w.total,
  }));
  // Pull unit titles
  if (qualCode && ac.weak_units.length > 0) {
    const { data: titles } = await sb
      .from('qualification_requirements')
      .select('unit_code, unit_title')
      .eq('qualification_code', qualCode)
      .in('unit_code', ac.weak_units.map((w) => w.unit_code));
    const titleMap = new Map<string, string | null>();
    for (const t of (titles ?? []) as Array<{ unit_code: string; unit_title: string | null }>) {
      titleMap.set(t.unit_code, t.unit_title);
    }
    for (const w of ac.weak_units) w.unit_title = titleMap.get(w.unit_code) ?? null;
  }

  // Observations — last 8 for evidence
  const { data: obs } = await sb
    .from('college_observations')
    .select('activity_title, outcome, grade, observed_at, unit_code')
    .eq('college_student_id', studentId)
    .order('observed_at', { ascending: false })
    .limit(8);
  const observations = ((obs ?? []) as Array<{
    activity_title: string;
    outcome: string;
    grade: string | null;
    observed_at: string;
    unit_code: string | null;
  }>).map((o) => ({
    activity_title: o.activity_title,
    outcome: o.outcome,
    grade: o.grade,
    observed_at: o.observed_at,
    unit_code: o.unit_code,
  }));

  // OTJ minutes (sum across sources — keyed by auth user)
  let otj_minutes = 0;
  if (authUid) {
    const [act, ses, col] = await Promise.all([
      sb.from('learning_activity_log').select('duration_minutes').eq('user_id', authUid).eq('counted_as_ojt', true),
      sb.from('study_sessions').select('duration').eq('user_id', authUid),
      sb.from('college_otj_entries').select('duration_minutes').eq('student_id', authUid),
    ]);
    for (const r of (act.data ?? []) as Array<{ duration_minutes: number | null }>) otj_minutes += r.duration_minutes ?? 0;
    for (const r of (ses.data ?? []) as Array<{ duration: number | null }>) otj_minutes += (r.duration ?? 0) / 60;
    for (const r of (col.data ?? []) as Array<{ duration_minutes: number | null }>) otj_minutes += r.duration_minutes ?? 0;
  }
  // ESFA ~ 6 hours per week × 52 weeks × 0.20 = 624 hours minimum spread over apprenticeship.
  const REQUIRED_OTJ_MIN = 37_440; // 624h × 60
  const otj = {
    total_minutes: Math.round(otj_minutes),
    required_minutes: REQUIRED_OTJ_MIN,
    pct: REQUIRED_OTJ_MIN > 0 ? Math.min(100, Math.round((otj_minutes / REQUIRED_OTJ_MIN) * 100)) : null,
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
      sb.from('portfolio_items').select('id', { count: 'exact', head: true }).eq('user_id', authUid),
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
    mocks = ((data ?? []) as Array<{
      session_type: string;
      overall_score: number | null;
      predicted_grade: string | null;
      completed_at: string | null;
    }>).map((m) => ({
      session_type: m.session_type,
      overall_score: m.overall_score,
      predicted_grade: m.predicted_grade,
      completed_at: m.completed_at,
    }));
  }

  // Inclusion flags
  const inclusion = {
    send_flags: ((student.send_flags as string[] | null) ?? []),
    eal: Boolean(student.eal),
    ehcp: Boolean((student as Record<string, unknown>).ehcp_ref),
  };

  // Gateway checklist (best-effort: table optional)
  let gateway: EpaContext['gateway'] = null;
  if (authUid) {
    try {
      const { data } = await sb
        .from('epa_gateway_checklists')
        .select('*')
        .eq('user_id', authUid)
        .maybeSingle();
      gateway = data as EpaContext['gateway'];
    } catch {
      gateway = null;
    }
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
    course,
    ac,
    observations,
    otj,
    portfolio,
    mocks,
    inclusion,
    gateway,
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
): Promise<Array<{ ref: string; topic: string; content: string; regulation_id: string | null; reg_part: string | null }>> {
  const queries: string[] = [];
  for (const w of ctx.ac.weak_units.slice(0, 4)) {
    if (w.unit_title) queries.push(w.unit_title);
    else queries.push(`unit ${w.unit_code}`);
  }
  for (const o of ctx.observations.filter((o) => o.outcome === 'partial' || o.outcome === 'referred').slice(0, 2)) {
    queries.push(o.activity_title);
  }
  if (queries.length === 0) {
    queries.push('inspection and testing initial verification');
  }

  const facets: Array<{ ref: string; topic: string; content: string; regulation_id: string | null; reg_part: string | null }> = [];
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

function buildSystemPrompt(): string {
  return `You are an experienced UK End-Point Assessor for electrical apprenticeships. You are NOT replacing the tutor — you produce a reasoned, evidence-grounded second opinion that a tutor will then co-sign or override.

Your job: assess whether the learner is ready for their End-Point Assessment, predict a likely grade, and explain *exactly why* with citations.

OUTPUT RULES:
- Use UK English (analyse, behaviour, organisation, programme).
- Ground every blocker in concrete evidence from the data provided.
- When you cite BS 7671, use the regulation reference shown in the facet list (e.g. "411.3.2" or "Part 6"). Quote a short snippet only if it's directly load-bearing.
- Be honest about confidence: a learner with 2 mock attempts and 60% portfolio coverage has lower-confidence verdicts than one with 8 mocks and 95% coverage.
- "What if" suggestions must be specific and actionable: "Complete the 5 remaining ACs in Unit 5 (Inspection & Testing) and submit 1 more practical observation evidencing IR sequencing" — not "do more work".
- Do NOT invent ACs, units, or regulations that aren't in the provided data.
- If data is sparse (e.g. no mocks, no observations), say so and lower confidence accordingly.

You will call the tool submit_epa_verdict EXACTLY ONCE with the structured verdict.`;
}

function buildUserPrompt(ctx: EpaContext, facets: Array<{ ref: string; topic: string; content: string; regulation_id: string | null; reg_part: string | null }>, instruction?: string): string {
  const lines: string[] = [];
  lines.push(`# Learner: ${ctx.student.name}`);
  if (ctx.course) lines.push(`Course: ${ctx.course.name ?? '?'} (${ctx.course.code ?? '?'})`);
  if (ctx.inclusion.send_flags.length || ctx.inclusion.eal || ctx.inclusion.ehcp) {
    lines.push(`Inclusion flags: ${[
      ...(ctx.inclusion.send_flags ?? []),
      ctx.inclusion.eal ? 'EAL' : null,
      ctx.inclusion.ehcp ? 'EHCP' : null,
    ].filter(Boolean).join(', ') || '—'}`);
  }

  lines.push('');
  lines.push('## AC coverage');
  lines.push(`Total tracked: ${ctx.ac.total}`);
  lines.push(`- not started: ${ctx.ac.not_started}`);
  lines.push(`- in progress: ${ctx.ac.in_progress}`);
  lines.push(`- evidenced: ${ctx.ac.evidenced}`);
  lines.push(`- assessed: ${ctx.ac.assessed}`);
  lines.push(`- confirmed: ${ctx.ac.confirmed}`);
  if (ctx.ac.weak_units.length) {
    lines.push('Weakest units:');
    for (const w of ctx.ac.weak_units) {
      lines.push(`  - ${w.unit_code}${w.unit_title ? ` (${w.unit_title})` : ''}: ${w.not_started}/${w.total} not started`);
    }
  }

  lines.push('');
  lines.push('## Observations');
  if (ctx.observations.length === 0) lines.push('None recorded.');
  for (const o of ctx.observations.slice(0, 6)) {
    lines.push(`- [${o.outcome}${o.grade ? ` · ${o.grade}` : ''}] ${o.activity_title} (${o.observed_at?.slice(0, 10) ?? '?'})`);
  }

  lines.push('');
  lines.push('## OTJ');
  lines.push(`${Math.round(ctx.otj.total_minutes / 60)}h logged of ${Math.round(ctx.otj.required_minutes / 60)}h target (${ctx.otj.pct}%)`);

  lines.push('');
  lines.push('## Portfolio');
  lines.push(`${ctx.portfolio.items} items, ${ctx.portfolio.submissions} submissions, IQA verified: ${ctx.portfolio.iqa_verified}, awaiting review: ${ctx.portfolio.awaiting_review}, action required: ${ctx.portfolio.requires_action}`);

  lines.push('');
  lines.push('## Mock EPA simulator runs (learner-driven self-assessment)');
  if (ctx.mocks.length === 0) lines.push('No mocks completed.');
  for (const m of ctx.mocks.slice(0, 6)) {
    lines.push(`- ${m.session_type}: ${m.overall_score ?? '?'}% → ${m.predicted_grade ?? '?'} (${m.completed_at?.slice(0, 10) ?? '?'})`);
  }

  lines.push('');
  lines.push('## Prior verdicts on this learner');
  if (ctx.priorTutor) lines.push(`Tutor (${ctx.priorTutor.created_at?.slice(0, 10)}): ${ctx.priorTutor.verdict} / ${ctx.priorTutor.predicted_grade ?? '?'}`);
  if (ctx.priorAi) lines.push(`AI prior (${ctx.priorAi.created_at?.slice(0, 10)}): ${ctx.priorAi.verdict} / ${ctx.priorAi.predicted_grade ?? '?'}`);
  if (ctx.priorLearner) lines.push(`Learner self (${ctx.priorLearner.created_at?.slice(0, 10)}): ${ctx.priorLearner.verdict} / ${ctx.priorLearner.predicted_grade ?? '?'}`);
  if (!ctx.priorTutor && !ctx.priorAi && !ctx.priorLearner) lines.push('None yet.');

  lines.push('');
  lines.push('## BS 7671 facets relevant to this learner\'s weak areas');
  if (facets.length === 0) {
    lines.push('No facet retrieval succeeded; cite generally if needed.');
  } else {
    for (const f of facets.slice(0, 12)) {
      const part = f.reg_part ? ` · Part ${f.reg_part}` : '';
      lines.push(`- [ref: ${f.ref}${part}${f.regulation_id ? `, regulation_id: ${f.regulation_id}` : ''}] (matched: "${f.topic}") ${f.content}`);
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
    description: 'Submit the structured AI verdict on this learner\'s EPA readiness.',
    parameters: {
      type: 'object',
      additionalProperties: false,
      properties: {
        verdict: { type: 'string', enum: ['ready', 'almost', 'not_yet', 'refer'] },
        predicted_grade: { type: 'string', enum: ['distinction', 'merit', 'pass', 'fail'] },
        confidence: { type: 'integer', minimum: 0, maximum: 100, description: '0-100; how confident you are given the evidence base.' },
        rationale: { type: 'string', description: 'Concise narrative — the why behind verdict + grade. 3–6 sentences.' },
        strengths: { type: 'array', items: { type: 'string' }, description: '3–5 specific strengths backed by evidence.' },
        blockers: { type: 'array', items: { type: 'string' }, description: 'Each blocker is concrete and specific (e.g. "IR test sequencing — last observation marked partial; no portfolio item evidences this").' },
        recommended_actions: {
          type: 'array',
          items: {
            type: 'object',
            additionalProperties: false,
            properties: {
              action: { type: 'string' },
              target_date: { type: 'string', description: 'ISO date or empty.' },
              lever_to_grade: { type: 'string', description: 'Which grade band this would move them toward.' },
            },
            required: ['action'],
          },
        },
        what_if: {
          type: 'array',
          description: 'Counterfactuals: e.g. "If learner completes 5 ACs in Unit 5 + 1 more observation, predicted grade rises to Merit at 89% confidence."',
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
          description: 'BS 7671 references that support specific blockers. Use ONLY refs from the facet list provided.',
          items: {
            type: 'object',
            additionalProperties: false,
            properties: {
              ref: { type: 'string', description: 'BS 7671 reference, e.g. "411.3.2".' },
              regulation_id: { type: 'string', description: 'UUID from the provided facet list, or empty.' },
              snippet: { type: 'string', description: 'Short quoted/paraphrased snippet (≤200 chars).' },
              applies_to: { type: 'string', description: 'Which blocker / topic this citation backs.' },
            },
            required: ['ref', 'snippet', 'applies_to'],
          },
        },
        agreement_note: {
          type: 'string',
          description: 'If a tutor/learner verdict already exists, briefly state where you agree or differ and why.',
        },
      },
      required: ['verdict', 'predicted_grade', 'confidence', 'rationale', 'strengths', 'blockers', 'recommended_actions'],
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

Deno.serve(async (req) => {
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
  const { user, profile, error } = await authoriseStaff(req, sb);
  if (error || !user || !profile) {
    return new Response(JSON.stringify({ error: error ?? 'unauthorized' }), {
      status: 401,
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

  const stream = new ReadableStream({
    async start(controller) {
      const enqueue = (chunk: Uint8Array) => controller.enqueue(chunk);
      const heartbeat = setInterval(() => enqueue(sseComment('hb')), 15_000);
      const timeout = setTimeout(() => {
        enqueue(sseEvent('error', { message: 'timeout' }));
        clearInterval(heartbeat);
        controller.close();
      }, STREAM_TIMEOUT_MS);

      try {
        enqueue(sseEvent('status', { phase: 'loading_signals' }));
        const ctx = await loadContext(sb, body.college_student_id);
        if (!ctx) {
          enqueue(sseEvent('error', { message: 'student_not_found' }));
          clearInterval(heartbeat);
          clearTimeout(timeout);
          controller.close();
          return;
        }
        // Tutor must be in the same college as the learner
        if (ctx.student.college_id !== profile.college_id) {
          enqueue(sseEvent('error', { message: 'forbidden' }));
          clearInterval(heartbeat);
          clearTimeout(timeout);
          controller.close();
          return;
        }

        enqueue(
          sseEvent('signals', {
            ac: ctx.ac,
            otj: ctx.otj,
            portfolio: ctx.portfolio,
            mocks_count: ctx.mocks.length,
            observations_count: ctx.observations.length,
            has_prior: { tutor: !!ctx.priorTutor, learner: !!ctx.priorLearner, ai: !!ctx.priorAi },
          })
        );

        enqueue(sseEvent('status', { phase: 'retrieving_bs7671' }));
        const facets = await lookupFacets(sb, ctx);
        enqueue(sseEvent('status', { phase: 'reasoning', facets_pulled: facets.length }));

        const messages = [
          { role: 'system', content: buildSystemPrompt() },
          { role: 'user', content: buildUserPrompt(ctx, facets, body.instruction) },
        ];

        const completion = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
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
          enqueue(sseEvent('error', { message: `openai_${completion.status}: ${text.slice(0, 240)}` }));
          clearInterval(heartbeat);
          clearTimeout(timeout);
          controller.close();
          return;
        }
        const json = (await completion.json()) as {
          choices: Array<{ message: { tool_calls?: Array<{ function: { arguments: string } }> } }>;
        };
        const args = json.choices?.[0]?.message?.tool_calls?.[0]?.function?.arguments;
        if (!args) {
          enqueue(sseEvent('error', { message: 'no_tool_call' }));
          clearInterval(heartbeat);
          clearTimeout(timeout);
          controller.close();
          return;
        }
        let parsed: VerdictArgs;
        try {
          parsed = JSON.parse(args) as VerdictArgs;
        } catch (e) {
          enqueue(sseEvent('error', { message: `invalid_tool_args: ${(e as Error).message}` }));
          clearInterval(heartbeat);
          clearTimeout(timeout);
          controller.close();
          return;
        }

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
          clearInterval(heartbeat);
          clearTimeout(timeout);
          controller.close();
          return;
        }

        enqueue(sseEvent('done', { judgement: inserted, verdict: parsed }));
      } catch (e) {
        enqueue(sseEvent('error', { message: (e as Error).message ?? 'unknown' }));
      } finally {
        clearInterval(heartbeat);
        clearTimeout(timeout);
        controller.close();
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
});
