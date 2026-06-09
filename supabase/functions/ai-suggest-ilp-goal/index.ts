// AI Suggest ILP Goal — produces structured ILP goals tailored to the
// learner. Three modes:
//   • fresh   → 2–3 fresh proposals based on cross-hub data
//   • refine  → take a tutor's rough draft (title) and rewrite it into a
//               SMART goal with description + acceptance_criteria
//   • from_ac → generate a goal explicitly mapped to a specific weak AC
//
// Role-aware system prompt: the staff member's role flips the framing —
// tutors get pastoral/academic framing; assessors get evidence-driven
// framing; IQA gets verification framing.
//
// POST { college_student_id, mode, draft?, ac_code?, count? }
// → { proposals: Array<IlpGoalDraft> }

import { captureException } from '../_shared/sentry.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';
import {
  loadLearnerContext,
  loadQualificationKit,
  lookupBs7671Facets,
  lookupQualificationAcs,
  bs7671SeedQueries,
  contextSummaryLines,
  qualificationAcLines,
  raggedAcLines,
  bs7671FacetLines,
  GROUNDING_RULES,
} from '../_shared/learner-context.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const CHAT_MODEL = 'gpt-5.4-mini-2026-03-17';
const MAX_COMPLETION_TOKENS = 4_000;

type Mode = 'fresh' | 'refine' | 'from_ac';

interface SuggestRequest {
  college_student_id: string;
  mode: Mode;
  draft?: string;
  ac_code?: string;
  unit_code?: string;
  count?: number;
}

async function authoriseStaff(req: Request, sb: ReturnType<typeof createClient>) {
  const auth = req.headers.get('authorization');
  if (!auth) return { user: null, profile: null, role: null as string | null, staffName: null as string | null, error: 'unauthorized' as const };
  const userClient = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_ANON_KEY')!,
    { global: { headers: { Authorization: auth } }, auth: { persistSession: false } }
  );
  const { data: userData } = await userClient.auth.getUser();
  if (!userData?.user) return { user: null, profile: null, role: null, staffName: null, error: 'unauthorized' as const };
  const { data: profile } = await sb
    .from('profiles')
    .select('id, college_id, full_name')
    .eq('id', userData.user.id)
    .maybeSingle();
  if (!profile?.college_id) return { user: userData.user, profile: null, role: null, staffName: null, error: 'no_college' as const };
  const { data: staff } = await sb
    .from('college_staff')
    .select('name, role')
    .eq('user_id', userData.user.id)
    .maybeSingle();
  return {
    user: userData.user,
    profile,
    role: ((staff as { role?: string } | null)?.role) ?? 'tutor',
    staffName: ((staff as { name?: string } | null)?.name) ?? null,
    error: null,
  };
}

interface GoalContext {
  studentName: string;
  course: { name: string | null; code: string | null } | null;
  weak_units: Array<{ unit_code: string; unit_title: string | null; not_started: number; total: number }>;
  partial_observations: Array<{ activity_title: string; outcome: string }>;
  portfolio: { items: number; awaiting_review: number; requires_action: number };
  attendance30: { present: number; total: number };
  inclusion: { send_flags: string[]; eal: boolean; ehcp: boolean };
  prior_goals: Array<{ title: string; status: string }>;
  ac?: { qualification_code: string; unit_code: string; ac_code: string; description: string | null };
}

async function loadContext(sb: ReturnType<typeof createClient>, studentId: string, acFilter?: { unit_code?: string; ac_code?: string }): Promise<GoalContext | null> {
  const { data: student } = await sb
    .from('college_students')
    .select('id, user_id, name, course_id, send_flags, eal, ehcp_ref')
    .eq('id', studentId)
    .maybeSingle();
  if (!student) return null;
  const authUid = (student.user_id as string | null) ?? null;

  // Course
  let course: GoalContext['course'] = null;
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

  // Weak units
  const { data: cov } = await sb
    .from('student_ac_coverage')
    .select('unit_code, status')
    .eq('student_id', studentId);
  const map = new Map<string, { not_started: number; total: number }>();
  for (const row of (cov ?? []) as Array<{ unit_code: string; status: string }>) {
    let g = map.get(row.unit_code);
    if (!g) {
      g = { not_started: 0, total: 0 };
      map.set(row.unit_code, g);
    }
    g.total += 1;
    if (row.status === 'not_started') g.not_started += 1;
  }
  const weak_units = Array.from(map.entries())
    .map(([unit_code, v]) => ({ unit_code, ...v, ratio: v.total ? v.not_started / v.total : 0 }))
    .filter((u) => u.not_started > 0)
    .sort((a, b) => b.ratio - a.ratio)
    .slice(0, 5)
    .map((w) => ({ unit_code: w.unit_code, unit_title: null as string | null, not_started: w.not_started, total: w.total }));
  if (qualCode && weak_units.length > 0) {
    const { data: titles } = await sb
      .from('qualification_requirements')
      .select('unit_code, unit_title')
      .eq('qualification_code', qualCode)
      .in('unit_code', weak_units.map((w) => w.unit_code));
    const titleMap = new Map<string, string | null>();
    for (const t of (titles ?? []) as Array<{ unit_code: string; unit_title: string | null }>) {
      titleMap.set(t.unit_code, t.unit_title);
    }
    for (const w of weak_units) w.unit_title = titleMap.get(w.unit_code) ?? null;
  }

  // Partial observations
  const { data: obs } = await sb
    .from('college_observations')
    .select('activity_title, outcome')
    .eq('college_student_id', studentId)
    .in('outcome', ['partial', 'referred'])
    .order('observed_at', { ascending: false })
    .limit(4);
  const partial_observations = ((obs ?? []) as Array<{ activity_title: string; outcome: string }>).map((o) => ({
    activity_title: o.activity_title,
    outcome: o.outcome,
  }));

  // Portfolio summary
  let portfolio = { items: 0, awaiting_review: 0, requires_action: 0 };
  if (authUid) {
    const [items, subs] = await Promise.all([
      sb.from('portfolio_items').select('id', { count: 'exact', head: true }).eq('user_id', authUid),
      sb.from('portfolio_submissions').select('status, action_required').eq('user_id', authUid),
    ]);
    const subRows = (subs.data ?? []) as Array<{ status: string; action_required: string | null }>;
    portfolio = {
      items: items.count ?? 0,
      awaiting_review: subRows.filter((s) => ['submitted', 'in_review', 'under_review', 'resubmitted'].includes(s.status)).length,
      requires_action: subRows.filter((s) => s.action_required).length,
    };
  }

  // Attendance — last 30 days
  const since30 = new Date(Date.now() - 30 * 86_400_000).toISOString().slice(0, 10);
  const { data: att } = await sb
    .from('college_attendance')
    .select('status')
    .eq('student_id', studentId)
    .gte('date', since30);
  const attRows = ((att ?? []) as Array<{ status: string }>).map((r) => (r.status ?? '').toLowerCase());
  const attendance30 = {
    present: attRows.filter((s) => s === 'present').length,
    total: attRows.length,
  };

  // Prior goals (so we don't suggest dupes)
  const { data: ilp } = await sb
    .from('college_ilps')
    .select('id')
    .eq('student_id', studentId)
    .eq('is_current', true)
    .maybeSingle();
  let prior_goals: GoalContext['prior_goals'] = [];
  const ilpId = (ilp as { id?: string } | null)?.id;
  if (ilpId) {
    const { data: g } = await sb
      .from('college_ilp_goals')
      .select('title, status')
      .eq('ilp_id', ilpId)
      .order('position', { ascending: true });
    prior_goals = ((g ?? []) as GoalContext['prior_goals']);
  }

  // AC detail (when from_ac mode)
  let ac: GoalContext['ac'] | undefined;
  if (acFilter?.ac_code && qualCode) {
    let q = sb
      .from('qualification_requirements')
      .select('qualification_code, unit_code, ac_code, description')
      .eq('qualification_code', qualCode)
      .eq('ac_code', acFilter.ac_code);
    if (acFilter.unit_code) q = q.eq('unit_code', acFilter.unit_code);
    const { data: r } = await q.limit(1).maybeSingle();
    if (r) {
      ac = {
        qualification_code: r.qualification_code as string,
        unit_code: r.unit_code as string,
        ac_code: r.ac_code as string,
        description: (r.description as string | null) ?? null,
      };
    }
  }

  return {
    studentName: (student.name as string) ?? 'Learner',
    course,
    weak_units,
    partial_observations,
    portfolio,
    attendance30,
    inclusion: {
      send_flags: ((student.send_flags as string[] | null) ?? []),
      eal: Boolean(student.eal),
      ehcp: Boolean((student as Record<string, unknown>).ehcp_ref),
    },
    prior_goals,
    ac,
  };
}

const TOOL_SCHEMA = {
  type: 'function',
  function: {
    name: 'submit_ilp_goal_proposals',
    description: 'Return one or more structured ILP goal proposals for the tutor / assessor to choose from.',
    parameters: {
      type: 'object',
      additionalProperties: false,
      required: ['proposals'],
      properties: {
        proposals: {
          type: 'array',
          minItems: 1,
          maxItems: 5,
          items: {
            type: 'object',
            additionalProperties: false,
            required: ['title', 'description', 'category', 'priority'],
            properties: {
              title: { type: 'string', description: 'Short SMART goal title (max 90 chars).' },
              description: { type: 'string', description: 'What the learner needs to do — concrete and specific.' },
              acceptance_criteria: { type: 'string', description: 'How the learner / tutor will know it\'s done. Evidence-led for assessors.' },
              target_date: { type: 'string', description: 'ISO date suggestion based on category + priority. Empty if not appropriate.' },
              category: {
                type: 'string',
                enum: ['academic', 'behavioural', 'skills', 'employability', 'wellbeing', 'attendance', 'other'],
              },
              priority: { type: 'string', enum: ['low', 'medium', 'high'] },
              ac_link: {
                type: 'string',
                description: 'Optional unit_code:ac_code link this goal targets, e.g. "ELC2-005:3.4". Empty if none.',
              },
              rationale: {
                type: 'string',
                description: 'Why this goal is the right fit for THIS learner — link to specific signals (weak unit, partial observation, portfolio gap).',
              },
            },
          },
        },
      },
    },
  },
} as const;

interface ProposalArgs {
  proposals: Array<{
    title: string;
    description: string;
    acceptance_criteria?: string;
    target_date?: string;
    category: 'academic' | 'behavioural' | 'skills' | 'employability' | 'wellbeing' | 'attendance' | 'other';
    priority: 'low' | 'medium' | 'high';
    ac_link?: string;
    rationale?: string;
  }>;
}

function systemPrompt(role: string, mode: Mode): string {
  const rolePersona = (() => {
    if (role === 'assessor' || role === 'iqa') {
      return `You are an experienced UK electrical apprenticeship ASSESSOR. Goals must be evidence-led: the acceptance_criteria should describe what concrete portfolio evidence, observation outcome, or AC sign-off counts as "done". Frame goals around the qualification's ACs and the learner's gaps in coverage. Don't propose pastoral goals — that's the tutor's lane.`;
    }
    if (role === 'safeguarding' || role === 'dsl') {
      return `You are a safeguarding-trained tutor. Goals must be safe, supportive, and proportionate. Avoid disclosure-related content. Frame goals around wellbeing, support strategies, and reasonable adjustments.`;
    }
    return `You are an experienced UK electrical apprenticeship TUTOR. Goals must be SMART, learner-centred, and pull from the most pressing cross-hub gap (AC coverage, observations, portfolio velocity, attendance, mocks). Mix academic/skills goals with the occasional employability or wellbeing goal where the data supports it.`;
  })();

  const modeRules = (() => {
    if (mode === 'fresh') return `Produce 2-3 distinct proposals. Each should target a different gap. Don't duplicate the prior goals listed.`;
    if (mode === 'refine') return `Produce ONE proposal that takes the tutor's rough draft and rewrites it as a SMART goal — keep the intent, fix the wording, fill in description + acceptance_criteria + a sensible target_date. Match the tutor's category/priority intent if discernible.`;
    return `Produce ONE proposal explicitly mapped to the AC provided. Set ac_link to "<unit_code>:<ac_code>". Acceptance criteria must reference the AC explicitly. Title should include the AC code for traceability.`;
  })();

  return `${rolePersona}

${modeRules}

OUTPUT RULES:
- UK English (analyse, behaviour, programme, organisation).
- Titles ≤ 90 chars, action-led ("Submit 2 evidence items for AC 3.4 by 14 May").
- target_date: ISO format YYYY-MM-DD. Pick something realistic based on priority (high = 2-3 weeks, medium = 4-6 weeks, low = 8-12 weeks). Empty if not appropriate.
- Don't repeat goals already on the learner's plan.
- Match the inclusion flags: if EHCP / EAL / SEND, frame goals with reasonable adjustments and avoid jargon.
- If recent quiz attempts show a fail at a specific AC, prioritise a goal that targets that AC and reference the quiz score in the description.

${GROUNDING_RULES}

Call submit_ilp_goal_proposals exactly once.`;
}

function userPrompt(ctx: GoalContext, mode: Mode, draft: string | undefined, count: number | undefined): string {
  const lines: string[] = [];
  lines.push(`# Learner: ${ctx.studentName}`);
  if (ctx.course) lines.push(`Course: ${ctx.course.name ?? '?'} (${ctx.course.code ?? '?'})`);
  if (ctx.inclusion.send_flags.length || ctx.inclusion.eal || ctx.inclusion.ehcp) {
    lines.push(`Inclusion: ${[
      ...(ctx.inclusion.send_flags ?? []),
      ctx.inclusion.eal ? 'EAL' : null,
      ctx.inclusion.ehcp ? 'EHCP' : null,
    ].filter(Boolean).join(', ')}`);
  }

  lines.push('');
  lines.push('## Weak units (highest not-started ratio first)');
  if (ctx.weak_units.length === 0) lines.push('All units in good shape.');
  for (const w of ctx.weak_units) {
    lines.push(`- ${w.unit_code}${w.unit_title ? ` (${w.unit_title})` : ''}: ${w.not_started}/${w.total} not started`);
  }

  lines.push('');
  lines.push('## Partial / referred observations');
  if (ctx.partial_observations.length === 0) lines.push('None.');
  for (const o of ctx.partial_observations) lines.push(`- [${o.outcome}] ${o.activity_title}`);

  lines.push('');
  lines.push('## Portfolio');
  lines.push(`${ctx.portfolio.items} items, ${ctx.portfolio.awaiting_review} awaiting review, ${ctx.portfolio.requires_action} need action`);

  if (ctx.attendance30.total > 0) {
    const pct = Math.round((ctx.attendance30.present / ctx.attendance30.total) * 100);
    lines.push('');
    lines.push(`## Attendance (last 30d): ${pct}% (${ctx.attendance30.present}/${ctx.attendance30.total})`);
  }

  lines.push('');
  lines.push('## Goals already on the plan (avoid duplicating)');
  if (ctx.prior_goals.length === 0) lines.push('None — this is a fresh slate.');
  for (const g of ctx.prior_goals) lines.push(`- [${g.status}] ${g.title}`);

  if (ctx.ac) {
    lines.push('');
    lines.push('## Target AC for this goal');
    lines.push(`Qualification ${ctx.ac.qualification_code} · Unit ${ctx.ac.unit_code} · AC ${ctx.ac.ac_code}`);
    if (ctx.ac.description) lines.push(`AC description: ${ctx.ac.description}`);
  }

  if (mode === 'refine' && draft) {
    lines.push('');
    lines.push(`## Tutor's rough draft to refine`);
    lines.push(draft);
  }

  if (mode === 'fresh' && count) {
    lines.push('');
    lines.push(`Produce ${count} distinct proposals.`);
  }

  lines.push('');
  lines.push('Now call submit_ilp_goal_proposals.');
  return lines.join('\n');
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

  const auth = await authoriseStaff(req, sb);
  if (auth.error || !auth.user || !auth.profile) {
    return new Response(JSON.stringify({ error: auth.error ?? 'unauthorized' }), {
      status: 401,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  let body: SuggestRequest;
  try {
    body = (await req.json()) as SuggestRequest;
  } catch {
    return new Response(JSON.stringify({ error: 'invalid_json' }), {
      status: 400,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }
  if (!body.college_student_id || !body.mode) {
    return new Response(JSON.stringify({ error: 'missing_required_fields' }), {
      status: 400,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }
  if (body.mode === 'refine' && !body.draft?.trim()) {
    return new Response(JSON.stringify({ error: 'refine_requires_draft' }), {
      status: 400,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }
  if (body.mode === 'from_ac' && !body.ac_code) {
    return new Response(JSON.stringify({ error: 'from_ac_requires_ac_code' }), {
      status: 400,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  try {
    const ctx = await loadContext(sb, body.college_student_id, {
      ac_code: body.ac_code,
      unit_code: body.unit_code,
    });
    if (!ctx) {
      return new Response(JSON.stringify({ error: 'student_not_found' }), {
        status: 404,
        headers: { ...corsHeaders, 'content-type': 'application/json' },
      });
    }

    // Augment the legacy ctx with the shared rich context (quizzes, KSBs,
    // mocks, ILP goal status, judgements, attendance pattern, risk) +
    // the qualification AC catalogue + BS 7671 facets seeded from
    // weak areas. This is the change that makes the AI genuinely
    // grounded in everything the learner has done.
    const richCtx = await loadLearnerContext(sb, body.college_student_id);
    // Build seeds for RAG: BS 7671 + AC. If we're in 'from_ac' mode, anchor
    // seeds to the specific AC text so the RAG returns siblings of that AC.
    const seedQueries: string[] = richCtx ? bs7671SeedQueries(richCtx) : [];
    if (body.mode === 'from_ac' && ctx.ac?.description) {
      seedQueries.unshift(ctx.ac.description);
    }
    if (body.mode === 'refine' && body.draft) {
      seedQueries.unshift(body.draft);
    }
    const [qualKit, raggedAcs, facets] = await Promise.all([
      loadQualificationKit(sb, ctx.course?.code ?? null),
      lookupQualificationAcs(sb, seedQueries, ctx.course?.code ?? null, 8, 4),
      richCtx ? lookupBs7671Facets(sb, seedQueries) : Promise.resolve([]),
    ]);
    const acBlock = raggedAcs.length > 0
      ? raggedAcLines(raggedAcs, 14)
      : qualificationAcLines(qualKit, 50);

    const richBlock = richCtx
      ? [
          '',
          '## Full learner context',
          ...contextSummaryLines(richCtx),
          ...acBlock,
          ...bs7671FacetLines(facets, 14),
        ].join('\n')
      : '';

    const messages = [
      { role: 'system', content: systemPrompt(auth.role ?? 'tutor', body.mode) },
      {
        role: 'user',
        content: userPrompt(ctx, body.mode, body.draft, body.count) + richBlock,
      },
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
        tools: [TOOL_SCHEMA],
        tool_choice: { type: 'function', function: { name: 'submit_ilp_goal_proposals' } },
        max_completion_tokens: MAX_COMPLETION_TOKENS,
      }),
    });
    if (!completion.ok) {
      const text = await completion.text();
      return new Response(
        JSON.stringify({ error: `openai_${completion.status}`, detail: text.slice(0, 240) }),
        { status: 500, headers: { ...corsHeaders, 'content-type': 'application/json' } }
      );
    }
    const json = (await completion.json()) as {
      choices: Array<{ message: { tool_calls?: Array<{ function: { arguments: string } }> } }>;
    };
    const args = json.choices?.[0]?.message?.tool_calls?.[0]?.function?.arguments;
    if (!args) {
      return new Response(JSON.stringify({ error: 'no_tool_call' }), {
        status: 500,
        headers: { ...corsHeaders, 'content-type': 'application/json' },
      });
    }
    const parsed = JSON.parse(args) as ProposalArgs;
    return new Response(
      JSON.stringify({
        proposals: parsed.proposals,
        meta: {
          role: auth.role,
          staff_name: auth.staffName,
          mode: body.mode,
          weak_units_count: ctx.weak_units.length,
          partial_observations_count: ctx.partial_observations.length,
        },
      }),
      { headers: { ...corsHeaders, 'content-type': 'application/json' } }
    );
  } catch (e) {
    await captureException(e, { functionName: 'ai-suggest-ilp-goal', requestUrl: req.url, requestMethod: req.method });
    return new Response(JSON.stringify({ error: (e as Error).message ?? 'unknown' }), {
      status: 500,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }
});
