// AI EPA Brief — generates a personalised pre-EPA briefing for a learner.
// Pulls the same cross-hub signals as ai-epa-readiness, but the prompt asks
// for a *learner-facing* brief with revision priorities, likely viva topics,
// BS 7671 hot zones, day-of-advice, and confidence boosters.
//
// Auth: staff in the learner's college, OR the learner themselves.
// POST { college_student_id }

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const CHAT_MODEL = 'gpt-5-mini-2025-08-07';
const MAX_COMPLETION_TOKENS = 5_000;
const FACET_TOP_K = 4;

interface BriefRequest {
  college_student_id: string;
}

async function authoriseEither(req: Request, sb: ReturnType<typeof createClient>, studentRow: { user_id: string | null; college_id: string }) {
  const auth = req.headers.get('authorization');
  if (!auth) return { ok: false, error: 'unauthorized' as const };
  const userClient = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_ANON_KEY')!,
    { global: { headers: { Authorization: auth } }, auth: { persistSession: false } }
  );
  const { data: userData } = await userClient.auth.getUser();
  if (!userData?.user) return { ok: false, error: 'unauthorized' as const };
  const uid = userData.user.id;
  // Either: the learner themselves
  if (studentRow.user_id === uid) return { ok: true, user: userData.user, role: 'learner' as const };
  // Or: staff in the same college
  const { data: staff } = await sb
    .from('college_staff')
    .select('id')
    .eq('user_id', uid)
    .eq('college_id', studentRow.college_id)
    .maybeSingle();
  if (staff) return { ok: true, user: userData.user, role: 'staff' as const };
  return { ok: false, error: 'forbidden' as const };
}

interface BriefContext {
  student: { id: string; user_id: string | null; name: string; college_id: string };
  course: { name: string | null; code: string | null } | null;
  weak_units: Array<{ unit_code: string; unit_title: string | null; not_started: number; total: number }>;
  partial_observations: Array<{ activity_title: string; outcome: string }>;
  mocks_recent: Array<{ session_type: string; overall_score: number | null; predicted_grade: string | null }>;
  epa_booking_date: string | null;
}

async function loadContext(sb: ReturnType<typeof createClient>, studentId: string): Promise<BriefContext | null> {
  const { data: student } = await sb
    .from('college_students')
    .select('id, user_id, name, college_id, course_id')
    .eq('id', studentId)
    .maybeSingle();
  if (!student) return null;
  const authUid = (student.user_id as string | null) ?? null;

  let course: BriefContext['course'] = null;
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
    .slice(0, 6)
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

  // Partial / referred observations
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

  // Recent mocks
  let mocks_recent: BriefContext['mocks_recent'] = [];
  if (authUid) {
    const { data: m } = await sb
      .from('epa_mock_sessions')
      .select('session_type, overall_score, predicted_grade')
      .eq('user_id', authUid)
      .eq('status', 'completed')
      .order('completed_at', { ascending: false })
      .limit(4);
    mocks_recent = ((m ?? []) as BriefContext['mocks_recent']).map((x) => ({
      session_type: x.session_type,
      overall_score: x.overall_score,
      predicted_grade: x.predicted_grade,
    }));
  }

  // EPA booking date if available
  let epa_booking_date: string | null = null;
  if (authUid) {
    try {
      const { data: gw } = await sb
        .from('epa_gateway_checklists')
        .select('epa_booking_date')
        .eq('user_id', authUid)
        .maybeSingle();
      epa_booking_date = (gw as { epa_booking_date?: string | null } | null)?.epa_booking_date ?? null;
    } catch {
      epa_booking_date = null;
    }
  }

  return {
    student: {
      id: student.id as string,
      user_id: authUid,
      name: (student.name as string) ?? 'Learner',
      college_id: student.college_id as string,
    },
    course,
    weak_units,
    partial_observations,
    mocks_recent,
    epa_booking_date,
  };
}

async function lookupFacets(sb: ReturnType<typeof createClient>, ctx: BriefContext) {
  const queries: string[] = [];
  for (const w of ctx.weak_units.slice(0, 4)) queries.push(w.unit_title ?? `unit ${w.unit_code}`);
  for (const o of ctx.partial_observations.slice(0, 2)) queries.push(o.activity_title);
  if (queries.length === 0) queries.push('inspection and testing initial verification');

  const out: Array<{ ref: string; topic: string; content: string; reg_part: string | null }> = [];
  for (const q of queries) {
    try {
      const { data, error } = await sb.rpc('match_bs7671_for_text', {
        q_text: q,
        doc_type: null,
        max_results: FACET_TOP_K,
      });
      if (error) continue;
      const rows = (data ?? []) as Array<{ reg_number: string | null; reg_part: string | null; primary_topic: string | null; content: string | null }>;
      for (const row of rows) {
        out.push({
          ref: row.reg_number ?? row.primary_topic ?? 'BS 7671',
          topic: q,
          content: (row.content ?? '').slice(0, 320),
          reg_part: row.reg_part ?? null,
        });
      }
    } catch {
      /* skip */
    }
  }
  const seen = new Set<string>();
  return out.filter((f) => {
    const key = `${f.ref}|${f.content.slice(0, 60)}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

const BRIEF_TOOL = {
  type: 'function',
  function: {
    name: 'submit_pre_epa_brief',
    description: 'Submit the structured pre-EPA briefing for the learner.',
    parameters: {
      type: 'object',
      additionalProperties: false,
      properties: {
        intro: { type: 'string', description: 'Warm 1–2 sentence opener that grounds the learner in their progress and what this brief covers.' },
        likely_viva_topics: {
          type: 'array',
          description: '5 topics most likely to come up in their professional discussion / viva, ranked by likelihood.',
          items: {
            type: 'object',
            additionalProperties: false,
            properties: {
              topic: { type: 'string' },
              why: { type: 'string', description: 'Why this is likely for THIS learner specifically — link to weak units, partial observations, mock score gaps.' },
              prep: { type: 'string', description: 'A specific 5–10 minute prep activity.' },
            },
            required: ['topic', 'why', 'prep'],
          },
        },
        bs7671_hot_zones: {
          type: 'array',
          description: 'BS 7671 regulations / parts the learner should be tight on. Use refs from the facet list.',
          items: {
            type: 'object',
            additionalProperties: false,
            properties: {
              ref: { type: 'string' },
              what_to_remember: { type: 'string' },
            },
            required: ['ref', 'what_to_remember'],
          },
        },
        weak_ac_revision: {
          type: 'array',
          description: 'ACs to revise hardest, with quick exemplar to picture.',
          items: {
            type: 'object',
            additionalProperties: false,
            properties: {
              unit_code: { type: 'string' },
              focus: { type: 'string' },
              exemplar: { type: 'string' },
            },
            required: ['unit_code', 'focus'],
          },
        },
        common_pitfalls: {
          type: 'array',
          description: 'Common mistakes for this qualification at viva — written in second-person ("watch out for…").',
          items: { type: 'string' },
        },
        day_of_advice: {
          type: 'array',
          description: '4–6 short pieces of practical advice for the day of EPA.',
          items: { type: 'string' },
        },
        confidence_message: {
          type: 'string',
          description: '1–2 sentence honest, motivating closer rooted in their actual progress.',
        },
      },
      required: ['intro', 'likely_viva_topics', 'bs7671_hot_zones', 'weak_ac_revision', 'common_pitfalls', 'day_of_advice', 'confidence_message'],
    },
  },
} as const;

interface BriefArgs {
  intro: string;
  likely_viva_topics: Array<{ topic: string; why: string; prep: string }>;
  bs7671_hot_zones: Array<{ ref: string; what_to_remember: string }>;
  weak_ac_revision: Array<{ unit_code: string; focus: string; exemplar?: string }>;
  common_pitfalls: string[];
  day_of_advice: string[];
  confidence_message: string;
}

function buildSystemPrompt(): string {
  return `You write personalised pre-EPA briefings for UK electrical apprentices.

Tone: warm, direct, second person ("you should…", "your portfolio shows…"). UK English (analyse, behaviour, programme).

Rules:
- Ground every recommendation in the learner's actual data — weak units, partial observations, mock scores. Don't write generic study tips.
- BS 7671 references: only use refs that appear in the provided facet list.
- "weak_ac_revision" entries should reference real unit_codes from the data, not made-up.
- "common_pitfalls" should be concrete pitfalls relevant to their qualification (e.g. "Watch out for confusing R1+R2 with R2 alone — examiners specifically test this.").
- "day_of_advice" should include practical things (sleep, what to bring, how to handle a tough question), not platitudes.
- "confidence_message" must be honest. If they're behind, say "you've got ground to make up — focus on X" rather than empty pep talk.

Output via the submit_pre_epa_brief tool exactly once.`;
}

function buildUserPrompt(ctx: BriefContext, facets: Array<{ ref: string; topic: string; content: string; reg_part: string | null }>): string {
  const lines: string[] = [];
  lines.push(`# Learner: ${ctx.student.name}`);
  if (ctx.course) lines.push(`Course: ${ctx.course.name ?? '?'} (${ctx.course.code ?? '?'})`);
  if (ctx.epa_booking_date) lines.push(`EPA booked: ${ctx.epa_booking_date}`);

  lines.push('');
  lines.push('## Weak units (rank by not-started ratio)');
  if (ctx.weak_units.length === 0) lines.push('All units in good shape.');
  for (const w of ctx.weak_units) {
    lines.push(`  - ${w.unit_code}${w.unit_title ? ` (${w.unit_title})` : ''}: ${w.not_started}/${w.total} not started`);
  }

  lines.push('');
  lines.push('## Partial / referred observations');
  if (ctx.partial_observations.length === 0) lines.push('None.');
  for (const o of ctx.partial_observations) lines.push(`  - [${o.outcome}] ${o.activity_title}`);

  lines.push('');
  lines.push('## Recent mock simulator runs');
  if (ctx.mocks_recent.length === 0) lines.push('No mocks completed.');
  for (const m of ctx.mocks_recent) lines.push(`  - ${m.session_type}: ${m.overall_score ?? '?'}% → ${m.predicted_grade ?? '?'}`);

  lines.push('');
  lines.push('## BS 7671 facets relevant to weak areas');
  if (facets.length === 0) lines.push('No facets retrieved.');
  for (const f of facets.slice(0, 12)) {
    const part = f.reg_part ? ` · Part ${f.reg_part}` : '';
    lines.push(`- [ref: ${f.ref}${part}] (matched: "${f.topic}") ${f.content}`);
  }

  lines.push('');
  lines.push('Generate the personalised brief now via submit_pre_epa_brief.');
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

  let body: BriefRequest;
  try {
    body = (await req.json()) as BriefRequest;
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

  // Load student row first so authorisation can use it
  const { data: studentMin } = await sb
    .from('college_students')
    .select('user_id, college_id')
    .eq('id', body.college_student_id)
    .maybeSingle();
  if (!studentMin) {
    return new Response(JSON.stringify({ error: 'student_not_found' }), {
      status: 404,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }
  const auth = await authoriseEither(req, sb, studentMin as { user_id: string | null; college_id: string });
  if (!auth.ok) {
    return new Response(JSON.stringify({ error: auth.error }), {
      status: auth.error === 'forbidden' ? 403 : 401,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  try {
    const ctx = await loadContext(sb, body.college_student_id);
    if (!ctx) {
      return new Response(JSON.stringify({ error: 'student_not_found' }), {
        status: 404,
        headers: { ...corsHeaders, 'content-type': 'application/json' },
      });
    }
    const facets = await lookupFacets(sb, ctx);

    const messages = [
      { role: 'system', content: buildSystemPrompt() },
      { role: 'user', content: buildUserPrompt(ctx, facets) },
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
        tools: [BRIEF_TOOL],
        tool_choice: { type: 'function', function: { name: 'submit_pre_epa_brief' } },
        max_completion_tokens: MAX_COMPLETION_TOKENS,
      }),
    });
    if (!completion.ok) {
      const text = await completion.text();
      return new Response(
        JSON.stringify({ error: `openai_${completion.status}`, detail: text.slice(0, 240) }),
        {
          status: 500,
          headers: { ...corsHeaders, 'content-type': 'application/json' },
        }
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
    const brief = JSON.parse(args) as BriefArgs;

    // Persist to college_epa_briefs for retention / history
    const { data: inserted } = await sb
      .from('college_epa_briefs')
      .insert({
        college_id: ctx.student.college_id,
        college_student_id: ctx.student.id,
        generated_by: auth.user.id,
        generated_for: auth.role,
        brief,
        signals_used: {
          weak_units: ctx.weak_units,
          partial_observations: ctx.partial_observations,
          mocks_recent: ctx.mocks_recent,
          epa_booking_date: ctx.epa_booking_date,
        },
        facets_used: facets.length,
      })
      .select('id, created_at')
      .single();

    return new Response(
      JSON.stringify({
        brief,
        context: {
          student_name: ctx.student.name,
          course: ctx.course,
          epa_booking_date: ctx.epa_booking_date,
          weak_units_count: ctx.weak_units.length,
          facets_used: facets.length,
          brief_id: (inserted as { id?: string } | null)?.id ?? null,
          brief_created_at: (inserted as { created_at?: string } | null)?.created_at ?? null,
        },
      }),
      {
        headers: { ...corsHeaders, 'content-type': 'application/json' },
      }
    );
  } catch (e) {
    return new Response(JSON.stringify({ error: (e as Error).message ?? 'unknown' }), {
      status: 500,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }
});
