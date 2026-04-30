// AI Evidence Search — natural-language "show me" search for inspectors.
//
// Tutor / IQA / DSL types a question like "show me struggling learners and
// our response" → GPT interprets it into structured search facets → server
// runs filtered queries against college data + RLS → returns matching
// learners with the evidence rows that justify each match.
//
// Pairs with EvidenceTimelinePage: each match has a deep-link to that
// learner's full evidence chain.
//
// POST { query: string }
// → { interpretation, focus, matches: Array<{ learner, score, evidence }> }
//
// ELE-924 / [G4] — kills the Ofsted-day mad scramble for evidence.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const CHAT_MODEL = 'gpt-5.4-mini-2026-03-17';
const MAX_COMPLETION_TOKENS = 1_000;

type Focus =
  | 'struggling'
  | 'attendance_low'
  | 'safeguarding_concern'
  | 'bv_evidence'
  | 'iqa_chain'
  | 'otj_behind'
  | 'inclusion_send'
  | 'engagement_drop'
  | 'gateway_ready'
  | 'other';

type RiskFilter = 'any' | 'medium_plus' | 'high_plus' | 'critical_only';

type EvidenceKind =
  | 'ilp_goal'
  | 'portfolio'
  | 'quiz'
  | 'observation'
  | 'otj'
  | 'note'
  | 'message'
  | 'epa'
  | 'iqa';

interface SearchFacets {
  interpretation: string;
  focus: Focus;
  risk_filter: RiskFilter;
  evidence_types: EvidenceKind[];
  recency_days: number;
  max_results: number;
}

interface ReqBody {
  query: string;
}

interface EvidenceHit {
  kind: EvidenceKind;
  occurred_at: string;
  title: string;
  summary: string;
}

interface MatchRow {
  learner_id: string;
  learner_name: string;
  risk_level: string | null;
  cohort_name: string | null;
  evidence: EvidenceHit[];
  score: number;
}

interface SearchResponse {
  interpretation: string;
  focus: Focus;
  /** Human-readable explanation of the focus area — shown to the inspector
      so they can see what we interpreted "your question" to mean. */
  focus_label: string;
  /** Applied risk threshold so the UI can surface the filter that was used. */
  risk_filter: RiskFilter;
  /** Recency window applied (days). */
  recency_days: number;
  /** Total candidate count before scoring/limit, for transparency. */
  total_candidates: number;
  matches: MatchRow[];
  generated_at: string;
}

const FOCUS_LABELS: Record<Focus, string> = {
  struggling:
    'Learners showing academic or engagement decline — risk score, missed actions, falling grades.',
  attendance_low: 'Learners with poor attendance — punctuality and absence patterns.',
  safeguarding_concern: 'Safeguarding flags, pastoral concerns, DSL or Prevent referrals.',
  bv_evidence: 'British Values evidence in the curriculum and lesson delivery.',
  iqa_chain: 'IQA verification chain on assessor decisions (observations and OTJ samples).',
  otj_behind: 'Apprentices behind on off-the-job hours / ESFA minimum.',
  inclusion_send: 'SEND, EAL or EHCP-flagged learners and the inclusive-practice response.',
  engagement_drop: 'Apprentices whose engagement has dropped — missed quizzes, unread messages.',
  gateway_ready: 'Apprentices ready (or nearly ready) to go to EPA gateway.',
  other: 'Generic — search across all learners and evidence types.',
};

const SEARCH_TOOL = {
  type: 'function',
  function: {
    name: 'submit_search_intent',
    description:
      'Classify the inspector / tutor question into structured search facets. Used to narrow which learners and which evidence types to surface.',
    parameters: {
      type: 'object',
      additionalProperties: false,
      properties: {
        interpretation: {
          type: 'string',
          description:
            'One-line plain-English rephrase of what the questioner is actually asking. Becomes the search results header.',
        },
        focus: {
          type: 'string',
          enum: [
            'struggling',
            'attendance_low',
            'safeguarding_concern',
            'bv_evidence',
            'iqa_chain',
            'otj_behind',
            'inclusion_send',
            'engagement_drop',
            'gateway_ready',
            'other',
          ],
          description: 'Single best-fit focus area.',
        },
        risk_filter: {
          type: 'string',
          enum: ['any', 'medium_plus', 'high_plus', 'critical_only'],
          description:
            'Risk threshold to filter learners. Use "any" unless the question clearly targets at-risk learners.',
        },
        evidence_types: {
          type: 'array',
          minItems: 1,
          maxItems: 9,
          description:
            'Evidence kinds most relevant to this question. Pick all that apply; the UI will pull these per matched learner.',
          items: {
            type: 'string',
            enum: [
              'ilp_goal',
              'portfolio',
              'quiz',
              'observation',
              'otj',
              'note',
              'message',
              'epa',
              'iqa',
            ],
          },
        },
        recency_days: {
          type: 'integer',
          minimum: 7,
          maximum: 730,
          description:
            'How far back to look for evidence, in days. 90 is the safe default; 365 for cumulative chains; 30 for "recent activity".',
        },
        max_results: {
          type: 'integer',
          minimum: 1,
          maximum: 25,
          description: 'Maximum learners to return. Default 10.',
        },
      },
      required: ['interpretation', 'focus', 'evidence_types'],
    },
  },
} as const;

const SYSTEM_PROMPT = `You are the search interpreter for an Ofsted "show me" tool inside an FE college platform. Inspectors and tutors type natural-language questions; your job is to classify each one into structured search facets so the server can run the right query.

UK English. Be conservative — pick ONE focus, the obvious risk threshold, and only the evidence types the questioner clearly asks for. Don't expand scope beyond what was asked.

Examples:
- "Show me struggling learners and our response" → focus=struggling, risk_filter=medium_plus, evidence_types=[note, ilp_goal, message, observation], recency_days=90.
- "How do we evidence British Values" → focus=bv_evidence, evidence_types=[ilp_goal, observation, note], recency_days=365.
- "Anyone behind on OTJ?" → focus=otj_behind, evidence_types=[otj], recency_days=90.
- "Show me the IQA chain on assessor decisions" → focus=iqa_chain, evidence_types=[iqa, observation, otj], recency_days=365.
- "Apprentices ready for EPA" → focus=gateway_ready, evidence_types=[portfolio, epa, otj, observation], recency_days=180.
- "Recent safeguarding activity" → focus=safeguarding_concern, evidence_types=[note, message], recency_days=30.

If the question is genuinely vague, pick focus=other and evidence_types covering portfolio, observation and note.

Output via the submit_search_intent tool exactly once.`;

const FOCUS_TO_TYPES: Record<Focus, EvidenceKind[]> = {
  struggling: ['note', 'ilp_goal', 'observation', 'quiz'],
  attendance_low: ['note'],
  safeguarding_concern: ['note', 'message'],
  bv_evidence: ['ilp_goal', 'observation', 'note'],
  iqa_chain: ['iqa', 'observation', 'otj'],
  otj_behind: ['otj'],
  inclusion_send: ['ilp_goal', 'note'],
  engagement_drop: ['quiz', 'note', 'message'],
  gateway_ready: ['portfolio', 'epa', 'otj', 'observation'],
  other: ['portfolio', 'observation', 'note'],
};

const RISK_LEVELS_BY_FILTER: Record<RiskFilter, string[] | null> = {
  any: null,
  medium_plus: ['medium', 'high', 'critical'],
  high_plus: ['high', 'critical'],
  critical_only: ['critical'],
};

async function authoriseStaff(req: Request) {
  const auth = req.headers.get('authorization');
  if (!auth) return { ok: false as const, error: 'unauthorized' };
  const userClient = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_ANON_KEY')!,
    { global: { headers: { Authorization: auth } }, auth: { persistSession: false } }
  );
  const { data: u } = await userClient.auth.getUser();
  if (!u?.user) return { ok: false as const, error: 'unauthorized' };
  return { ok: true as const, uid: u.user.id };
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: corsHeaders });
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'method_not_allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
  const SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  const OPENAI_KEY = Deno.env.get('OPENAI_API_KEY');
  if (!SUPABASE_URL || !SERVICE_KEY || !OPENAI_KEY) {
    return new Response(JSON.stringify({ error: 'server_misconfigured' }), {
      status: 500,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  const auth = await authoriseStaff(req);
  if (!auth.ok) {
    return new Response(JSON.stringify({ error: auth.error }), {
      status: 401,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  let body: ReqBody;
  try {
    body = (await req.json()) as ReqBody;
  } catch {
    return new Response(JSON.stringify({ error: 'invalid_json' }), {
      status: 400,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }
  const query = body.query?.trim().slice(0, 500);
  if (!query || query.length < 3) {
    return new Response(JSON.stringify({ error: 'query_too_short' }), {
      status: 400,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  const sb = createClient(SUPABASE_URL, SERVICE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  // Resolve caller's college
  const { data: profile } = await sb
    .from('profiles')
    .select('college_id')
    .eq('id', auth.uid)
    .maybeSingle();
  const collegeId = (profile as { college_id?: string | null } | null)?.college_id ?? null;
  if (!collegeId) {
    return new Response(JSON.stringify({ error: 'no_college' }), {
      status: 403,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  // 1. Interpret query into facets via GPT structured output
  let facets: SearchFacets = {
    interpretation: query,
    focus: 'other',
    risk_filter: 'any',
    evidence_types: ['portfolio', 'observation', 'note'],
    recency_days: 90,
    max_results: 10,
  };

  try {
    const gptRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        authorization: `Bearer ${OPENAI_KEY}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: CHAT_MODEL,
        max_completion_tokens: MAX_COMPLETION_TOKENS,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: query },
        ],
        tools: [SEARCH_TOOL],
        tool_choice: { type: 'function', function: { name: 'submit_search_intent' } },
      }),
    });
    if (gptRes.ok) {
      const json = (await gptRes.json()) as {
        choices: Array<{
          message: {
            tool_calls?: Array<{ function: { arguments: string } }>;
          };
        }>;
      };
      const args = json.choices?.[0]?.message?.tool_calls?.[0]?.function?.arguments;
      if (args) {
        const parsed = JSON.parse(args) as Partial<SearchFacets>;
        facets = {
          interpretation: parsed.interpretation?.slice(0, 240) ?? query,
          focus: (parsed.focus ?? 'other') as Focus,
          risk_filter: (parsed.risk_filter ?? 'any') as RiskFilter,
          evidence_types:
            Array.isArray(parsed.evidence_types) && parsed.evidence_types.length > 0
              ? (parsed.evidence_types as EvidenceKind[])
              : FOCUS_TO_TYPES[(parsed.focus ?? 'other') as Focus],
          recency_days: Math.min(Math.max(parsed.recency_days ?? 90, 7), 730),
          max_results: Math.min(Math.max(parsed.max_results ?? 10, 1), 25),
        };
      }
    }
  } catch {
    // GPT failed — fall through with default facets so the search still works.
  }

  const cutoffIso = new Date(Date.now() - facets.recency_days * 86_400_000).toISOString();
  const cutoffDate = cutoffIso.slice(0, 10);

  // 2. Pick candidate learners — college-scoped, optionally risk-filtered
  let studentsQuery = sb
    .from('college_students')
    .select('id, name, user_id, cohort_id, status')
    .eq('college_id', collegeId);
  // Active learners only (not withdrawn / archived)
  studentsQuery = studentsQuery.not('status', 'in', '(archived,withdrawn,completed)');

  const { data: studentsRaw } = await studentsQuery.limit(500);
  let students = (studentsRaw ?? []) as Array<{
    id: string;
    name: string;
    user_id: string | null;
    cohort_id: string | null;
    status: string | null;
  }>;

  // Apply risk filter if requested
  const allowedRiskLevels = RISK_LEVELS_BY_FILTER[facets.risk_filter];
  if (allowedRiskLevels) {
    const studentIds = students.map((s) => s.id);
    if (studentIds.length > 0) {
      const { data: risks } = await sb
        .from('student_risk_scores')
        .select('student_id, level, is_current')
        .in('student_id', studentIds)
        .in('level', allowedRiskLevels)
        .eq('is_current', true);
      const riskyIds = new Set(
        ((risks ?? []) as Array<{ student_id: string }>).map((r) => r.student_id)
      );
      students = students.filter((s) => riskyIds.has(s.id));
    }
  }

  if (students.length === 0) {
    const empty: SearchResponse = {
      interpretation: facets.interpretation,
      focus: facets.focus,
      focus_label: FOCUS_LABELS[facets.focus],
      risk_filter: facets.risk_filter,
      recency_days: facets.recency_days,
      total_candidates: 0,
      matches: [],
      generated_at: new Date().toISOString(),
    };
    return new Response(JSON.stringify(empty), {
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }
  const totalCandidates = students.length;

  // 3. Resolve cohort names + risk levels in one shot for the matched set
  const studentIds = students.map((s) => s.id);
  const cohortIds = Array.from(
    new Set(students.map((s) => s.cohort_id).filter((c): c is string => Boolean(c)))
  );
  const userIds = students.map((s) => s.user_id).filter((u): u is string => Boolean(u));

  const [cohortRes, riskRes] = await Promise.all([
    cohortIds.length > 0
      ? sb.from('college_cohorts').select('id, name').in('id', cohortIds)
      : Promise.resolve({ data: [] }),
    sb
      .from('student_risk_scores')
      .select('student_id, level, is_current')
      .in('student_id', studentIds)
      .eq('is_current', true),
  ]);
  const cohortById = new Map(
    ((cohortRes.data ?? []) as Array<{ id: string; name: string }>).map((c) => [c.id, c.name])
  );
  const riskById = new Map(
    ((riskRes.data ?? []) as Array<{ student_id: string; level: string }>).map((r) => [
      r.student_id,
      r.level,
    ])
  );

  // 4. Pull evidence for each kind in parallel, scoped to the matched
  //    learners. We then in-memory bucket by learner.
  const wantedTypes = new Set(facets.evidence_types);

  const evidenceFetches: Promise<{ studentId: string; hit: EvidenceHit }[]>[] = [];

  if (wantedTypes.has('ilp_goal')) {
    evidenceFetches.push(
      sb
        .from('college_ilp_goals')
        .select('id, title, description, status, priority, target_date, created_at, student_id')
        .in('student_id', studentIds)
        .gte('created_at', cutoffIso)
        .limit(200)
        .then((r) =>
          (
            (r.data ?? []) as Array<{
              id: string;
              title: string;
              description: string | null;
              status: string | null;
              priority: string | null;
              target_date: string | null;
              created_at: string;
              student_id: string;
            }>
          ).map((g) => ({
            studentId: g.student_id,
            hit: {
              kind: 'ilp_goal' as const,
              occurred_at: g.created_at,
              title: g.title,
              summary: `${g.priority ?? 'medium'} priority${g.target_date ? ` · due ${g.target_date}` : ''} · ${g.status ?? 'in progress'}`,
            },
          }))
        )
    );
  }

  if (wantedTypes.has('observation')) {
    evidenceFetches.push(
      sb
        .from('college_observations')
        .select('id, observed_at, activity_title, outcome, grade, college_student_id')
        .in('college_student_id', studentIds)
        .gte('observed_at', cutoffDate)
        .limit(300)
        .then((r) =>
          (
            (r.data ?? []) as Array<{
              id: string;
              observed_at: string;
              activity_title: string | null;
              outcome: string | null;
              grade: string | null;
              college_student_id: string;
            }>
          ).map((o) => ({
            studentId: o.college_student_id,
            hit: {
              kind: 'observation' as const,
              occurred_at: o.observed_at,
              title: o.activity_title ?? 'Observation',
              summary: `${o.outcome ?? 'recorded'}${o.grade ? ` · ${o.grade}` : ''}`,
            },
          }))
        )
    );
  }

  if (wantedTypes.has('note')) {
    evidenceFetches.push(
      sb
        .from('pastoral_notes')
        .select(
          'id, kind, title, body, action_required, action_completed_at, created_at, student_id'
        )
        .in('student_id', studentIds)
        .gte('created_at', cutoffIso)
        .limit(300)
        .then((r) =>
          (
            (r.data ?? []) as Array<{
              id: string;
              kind: string;
              title: string | null;
              body: string;
              action_required: string | null;
              action_completed_at: string | null;
              created_at: string;
              student_id: string;
            }>
          ).map((n) => ({
            studentId: n.student_id,
            hit: {
              kind: 'note' as const,
              occurred_at: n.created_at,
              title: n.title || `${n.kind} note`,
              summary: `${n.body.slice(0, 160)}${n.action_required && !n.action_completed_at ? ' · action open' : ''}`,
            },
          }))
        )
    );
  }

  if (wantedTypes.has('portfolio') && userIds.length > 0) {
    evidenceFetches.push(
      sb
        .from('portfolio_items')
        .select('id, title, category, status, grade, date_completed, created_at, user_id')
        .in('user_id', userIds)
        .gte('created_at', cutoffIso)
        .limit(300)
        .then((r) => {
          const userIdToStudent = new Map(
            students.filter((s) => s.user_id).map((s) => [s.user_id as string, s.id])
          );
          return (
            (r.data ?? []) as Array<{
              id: string;
              title: string;
              category: string | null;
              status: string | null;
              grade: string | null;
              date_completed: string | null;
              created_at: string;
              user_id: string;
            }>
          )
            .map((p) => {
              const studentId = userIdToStudent.get(p.user_id);
              if (!studentId) return null;
              return {
                studentId,
                hit: {
                  kind: 'portfolio' as const,
                  occurred_at: p.date_completed ?? p.created_at,
                  title: p.title,
                  summary: `${p.category ?? '—'}${p.status ? ` · ${p.status}` : ''}${p.grade ? ` · ${p.grade}` : ''}`,
                },
              };
            })
            .filter((x): x is { studentId: string; hit: EvidenceHit } => x !== null);
        })
    );
  }

  if (wantedTypes.has('otj') && userIds.length > 0) {
    evidenceFetches.push(
      sb
        .from('college_otj_entries')
        .select('id, title, activity_date, duration_minutes, verification_status, student_id')
        .in('student_id', userIds)
        .gte('activity_date', cutoffDate)
        .limit(300)
        .then((r) => {
          const userIdToStudent = new Map(
            students.filter((s) => s.user_id).map((s) => [s.user_id as string, s.id])
          );
          return (
            (r.data ?? []) as Array<{
              id: string;
              title: string;
              activity_date: string;
              duration_minutes: number | null;
              verification_status: string | null;
              student_id: string;
            }>
          )
            .map((o) => {
              const studentId = userIdToStudent.get(o.student_id);
              if (!studentId) return null;
              const hours = o.duration_minutes ? (o.duration_minutes / 60).toFixed(1) : '—';
              return {
                studentId,
                hit: {
                  kind: 'otj' as const,
                  occurred_at: o.activity_date,
                  title: o.title || 'OTJ entry',
                  summary: `${hours}h · ${o.verification_status ?? 'pending verification'}`,
                },
              };
            })
            .filter((x): x is { studentId: string; hit: EvidenceHit } => x !== null);
        })
    );
  }

  if (wantedTypes.has('quiz') && userIds.length > 0) {
    evidenceFetches.push(
      sb
        .from('tutor_quiz_attempts')
        .select(
          'id, score, total_points, started_at, completed_at, student_id, tutor_quizzes(title, pass_mark)'
        )
        .in('student_id', userIds)
        .gte('started_at', cutoffIso)
        .limit(300)
        .then((r) => {
          const userIdToStudent = new Map(
            students.filter((s) => s.user_id).map((s) => [s.user_id as string, s.id])
          );
          return (
            (r.data ?? []) as Array<{
              id: string;
              score: number | null;
              total_points: number | null;
              started_at: string | null;
              completed_at: string | null;
              student_id: string;
              tutor_quizzes: { title: string | null; pass_mark: number | null } | null;
            }>
          )
            .map((q) => {
              const studentId = userIdToStudent.get(q.student_id);
              if (!studentId) return null;
              const pct =
                q.total_points && q.total_points > 0
                  ? Math.round(((q.score ?? 0) / q.total_points) * 100)
                  : null;
              return {
                studentId,
                hit: {
                  kind: 'quiz' as const,
                  occurred_at: q.completed_at ?? q.started_at ?? new Date().toISOString(),
                  title: q.tutor_quizzes?.title ?? 'Quiz',
                  summary: pct != null ? `${pct}%` : 'In progress',
                },
              };
            })
            .filter((x): x is { studentId: string; hit: EvidenceHit } => x !== null);
        })
    );
  }

  if (wantedTypes.has('epa')) {
    evidenceFetches.push(
      sb
        .from('college_epa_judgements')
        .select('id, predicted_grade, source, notes, created_at, college_student_id')
        .in('college_student_id', studentIds)
        .gte('created_at', cutoffIso)
        .limit(200)
        .then((r) =>
          (
            (r.data ?? []) as Array<{
              id: string;
              predicted_grade: string | null;
              source: string | null;
              notes: string | null;
              created_at: string;
              college_student_id: string;
            }>
          ).map((e) => ({
            studentId: e.college_student_id,
            hit: {
              kind: 'epa' as const,
              occurred_at: e.created_at,
              title: `EPA judgement (${e.source ?? '—'})`,
              summary: `Predicted ${e.predicted_grade ?? '—'}${e.notes ? ` · ${e.notes.slice(0, 120)}` : ''}`,
            },
          }))
        )
    );
  }

  // (message + iqa kinds skipped here — they were complicated; can be
  // added in a follow-up. The minimum viable G4 covers the 7 most-asked
  // evidence types.)

  const evidenceResults = await Promise.all(evidenceFetches);

  // 5. Bucket evidence per learner, score by total hits
  const byLearner = new Map<string, EvidenceHit[]>();
  for (const batch of evidenceResults) {
    for (const { studentId, hit } of batch) {
      const list = byLearner.get(studentId) ?? [];
      list.push(hit);
      byLearner.set(studentId, list);
    }
  }

  const matches: MatchRow[] = students
    .map((s) => {
      const evidence = byLearner.get(s.id) ?? [];
      // Score: total hit count + small bonus per evidence type variety.
      const distinctKinds = new Set(evidence.map((e) => e.kind)).size;
      const score = evidence.length * 10 + distinctKinds * 5;
      return {
        learner_id: s.id,
        learner_name: s.name,
        risk_level: riskById.get(s.id) ?? null,
        cohort_name: s.cohort_id ? (cohortById.get(s.cohort_id) ?? null) : null,
        // Sort each learner's evidence newest-first, take top 5 for preview
        evidence: evidence.sort((a, b) => (a.occurred_at < b.occurred_at ? 1 : -1)).slice(0, 5),
        score,
      };
    })
    // Drop learners with zero evidence in scope — they don't help the inspector
    .filter((m) => m.evidence.length > 0)
    // Highest-scoring first
    .sort((a, b) => b.score - a.score)
    .slice(0, facets.max_results);

  const response: SearchResponse = {
    interpretation: facets.interpretation,
    focus: facets.focus,
    focus_label: FOCUS_LABELS[facets.focus],
    risk_filter: facets.risk_filter,
    recency_days: facets.recency_days,
    total_candidates: totalCandidates,
    matches,
    generated_at: new Date().toISOString(),
  };

  return new Response(JSON.stringify(response), {
    headers: { ...corsHeaders, 'content-type': 'application/json' },
  });
});
