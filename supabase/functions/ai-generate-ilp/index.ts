// AI Generate ILP — drafts a full Individual Learning Plan for a learner
// from cross-hub data (AC coverage, observations, attendance, portfolio,
// OTJ, risk, inclusion flags, prior ILP). Tutor reviews and saves.
//
// Streams via SSE — same pattern as ai-assessor / ai-next-best-action.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

const CHAT_MODEL = 'gpt-5.4-mini-2026-03-17';
const MAX_COMPLETION_TOKENS = 6_000;
const STREAM_TIMEOUT_MS = 120_000;

interface GenerateRequest {
  /** college_students.id */
  student_id: string;
  /** Optional tutor instruction to focus the draft */
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

interface IlpContext {
  student: Record<string, unknown>;
  authUid: string | null;
  courseName: string | null;
  qualificationCode: string | null;
  acGapsByUnit: Map<string, { unit_title: string | null; not_started: number; in_progress: number; total: number }>;
  attendance30: { present: number; absent: number; late: number; total: number };
  observations: Array<{ activity_title: string; outcome: string; observed_at: string }>;
  portfolio: {
    submissions: number;
    awaiting_review: number;
    requires_action: number;
    iqa_verified: number;
    items: number;
    last_submission_at: string | null;
  };
  otj: { this_week_minutes: number; total_minutes: number; weekly_target: number };
  risk: { score: number; level: string; factors: Array<{ key: string; label: string; severity: number }> } | null;
  recentNotes: Array<{ kind: string; title: string | null; body: string; created_at: string }>;
  priorIlp: {
    headline_focus: string | null;
    headline_strengths: string | null;
    headline_areas: string | null;
    support_strategies: string | null;
    accessibility_adjustments: string | null;
    version: number;
    goals: Array<{ title: string; status: string; target_date: string | null }>;
  } | null;
  inclusion: { send_flags: string[]; eal: boolean; ehcp: boolean; accessibility_notes: string | null };
  expectedEndDate: string | null;
}

async function loadContext(sb: ReturnType<typeof createClient>, studentId: string): Promise<IlpContext | null> {
  const { data: student } = await sb
    .from('college_students')
    .select(
      'id, user_id, name, course_id, send_flags, eal, ehcp_ref, accessibility_notes, status, expected_end_date, start_date'
    )
    .eq('id', studentId)
    .maybeSingle();
  if (!student) return null;

  const authUid = (student.user_id as string | null) ?? null;

  // Course → name + code
  let courseName: string | null = null;
  let qualificationCode: string | null = null;
  if (student.course_id) {
    const { data: course } = await sb
      .from('college_courses')
      .select('name, code')
      .eq('id', student.course_id)
      .maybeSingle();
    if (course) {
      courseName = (course.name as string | null) ?? null;
      qualificationCode = (course.code as string | null) ?? null;
    }
  }

  // AC coverage — group by unit_code so we can summarise gaps per unit
  const { data: cov } = await sb
    .from('student_ac_coverage')
    .select('unit_code, status')
    .eq('student_id', studentId);
  const acGapsByUnit = new Map<
    string,
    { unit_title: string | null; not_started: number; in_progress: number; total: number }
  >();
  for (const row of (cov ?? []) as Array<{ unit_code: string; status: string }>) {
    const key = row.unit_code ?? '';
    let g = acGapsByUnit.get(key);
    if (!g) {
      g = { unit_title: null, not_started: 0, in_progress: 0, total: 0 };
      acGapsByUnit.set(key, g);
    }
    g.total += 1;
    if (row.status === 'not_started') g.not_started += 1;
    else if (row.status === 'in_progress') g.in_progress += 1;
  }
  // Pull unit titles for the units this learner has coverage on
  if (qualificationCode && acGapsByUnit.size > 0) {
    const { data: units } = await sb
      .from('qualification_requirements')
      .select('unit_code, unit_title')
      .eq('qualification_code', qualificationCode);
    for (const u of (units ?? []) as Array<{ unit_code: string; unit_title: string | null }>) {
      const g = acGapsByUnit.get(u.unit_code);
      if (g && !g.unit_title) g.unit_title = u.unit_title;
    }
  }

  // Attendance — last 30 days
  const since30 = new Date(Date.now() - 30 * 86_400_000).toISOString().slice(0, 10);
  const { data: att } = await sb
    .from('college_attendance')
    .select('status')
    .eq('student_id', studentId)
    .gte('date', since30);
  const attendance30 = {
    present: (att ?? []).filter((r) => r.status === 'present').length,
    absent: (att ?? []).filter((r) => r.status === 'absent').length,
    late: (att ?? []).filter((r) => r.status === 'late').length,
    total: (att ?? []).length,
  };

  // Observations — last 5
  const { data: obsRows } = await sb
    .from('college_observations')
    .select('activity_title, outcome, observed_at')
    .eq('college_student_id', studentId)
    .order('observed_at', { ascending: false })
    .limit(5);
  const observations = ((obsRows ?? []) as Array<{
    activity_title: string;
    outcome: string;
    observed_at: string;
  }>).map((o) => ({
    activity_title: o.activity_title,
    outcome: o.outcome,
    observed_at: o.observed_at,
  }));

  // Portfolio
  let portfolio = {
    submissions: 0,
    awaiting_review: 0,
    requires_action: 0,
    iqa_verified: 0,
    items: 0,
    last_submission_at: null as string | null,
  };
  if (authUid) {
    const [subsRes, itemsRes] = await Promise.all([
      sb
        .from('portfolio_submissions')
        .select('status, action_required, iqa_outcome, submitted_at')
        .eq('user_id', authUid)
        .order('submitted_at', { ascending: false, nullsFirst: false })
        .limit(50),
      sb.from('portfolio_items').select('id', { count: 'exact', head: true }).eq('user_id', authUid),
    ]);
    const subs = (subsRes.data ?? []) as Array<{
      status: string;
      action_required: string | null;
      iqa_outcome: string | null;
      submitted_at: string | null;
    }>;
    portfolio = {
      submissions: subs.length,
      awaiting_review: subs.filter((s) =>
        ['submitted', 'in_review', 'under_review', 'resubmitted'].includes(s.status)
      ).length,
      requires_action: subs.filter((s) => s.action_required).length,
      iqa_verified: subs.filter((s) => s.iqa_outcome === 'verified').length,
      items: itemsRes.count ?? 0,
      last_submission_at: subs[0]?.submitted_at ?? null,
    };
  }

  // OTJ — apprentice side
  let otj = { this_week_minutes: 0, total_minutes: 0, weekly_target: 360 };
  if (authUid) {
    const sinceWeek = (() => {
      const now = new Date();
      const dayUtc = now.getUTCDay();
      const diffToMonday = (dayUtc + 6) % 7;
      return new Date(
        Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - diffToMonday, 0, 0, 0, 0)
      ).toISOString();
    })();
    const [act, ses, col] = await Promise.all([
      sb.from('learning_activity_log').select('duration_minutes, created_at').eq('user_id', authUid).eq('counted_as_ojt', true),
      sb.from('study_sessions').select('duration, created_at').eq('user_id', authUid),
      sb.from('college_otj_entries').select('duration_minutes, activity_date, created_at').eq('student_id', authUid),
    ]);
    let total = 0;
    let week = 0;
    for (const r of (act.data ?? []) as Array<{ duration_minutes: number | null; created_at: string }>) {
      const m = r.duration_minutes ?? 0;
      total += m;
      if (r.created_at >= sinceWeek) week += m;
    }
    for (const r of (ses.data ?? []) as Array<{ duration: number | null; created_at: string }>) {
      const m = (r.duration ?? 0) / 60;
      total += m;
      if (r.created_at >= sinceWeek) week += m;
    }
    for (const r of (col.data ?? []) as Array<{
      duration_minutes: number;
      activity_date: string | null;
      created_at: string | null;
    }>) {
      const m = r.duration_minutes ?? 0;
      total += m;
      const when = r.activity_date ? `${r.activity_date}T12:00:00Z` : (r.created_at ?? '');
      if (when >= sinceWeek) week += m;
    }
    otj = { this_week_minutes: Math.round(week), total_minutes: Math.round(total), weekly_target: 360 };
  }

  // Risk
  const { data: riskRow } = await sb
    .from('student_risk_scores')
    .select('score, level, factors')
    .eq('student_id', studentId)
    .eq('is_current', true)
    .order('computed_at', { ascending: false })
    .limit(1)
    .maybeSingle();
  const risk = riskRow
    ? {
        score: Number(riskRow.score),
        level: riskRow.level as string,
        factors: ((riskRow.factors as IlpContext['risk'] extends infer R ? R extends { factors: infer F } ? F : never : never) ?? []) as Array<{
          key: string;
          label: string;
          severity: number;
        }>,
      }
    : null;

  // Recent pastoral notes
  const { data: notesRows } = await sb
    .from('pastoral_notes')
    .select('kind, title, body, created_at')
    .eq('student_id', studentId)
    .order('created_at', { ascending: false })
    .limit(6);
  const recentNotes = ((notesRows ?? []) as Array<{
    kind: string;
    title: string | null;
    body: string;
    created_at: string;
  }>).map((n) => ({
    kind: n.kind,
    title: n.title,
    body: (n.body ?? '').slice(0, 240),
    created_at: n.created_at,
  }));

  // Prior ILP — to refine rather than start fresh
  const { data: priorRow } = await sb
    .from('college_ilps')
    .select(
      'id, version, headline_focus, headline_strengths, headline_areas, support_strategies, accessibility_adjustments'
    )
    .eq('student_id', studentId)
    .eq('is_current', true)
    .order('version', { ascending: false })
    .limit(1)
    .maybeSingle();
  let priorIlp: IlpContext['priorIlp'] = null;
  if (priorRow?.id) {
    const { data: priorGoals } = await sb
      .from('college_ilp_goals')
      .select('title, status, target_date')
      .eq('ilp_id', priorRow.id)
      .order('position', { ascending: true });
    priorIlp = {
      headline_focus: (priorRow.headline_focus as string | null) ?? null,
      headline_strengths: (priorRow.headline_strengths as string | null) ?? null,
      headline_areas: (priorRow.headline_areas as string | null) ?? null,
      support_strategies: (priorRow.support_strategies as string | null) ?? null,
      accessibility_adjustments: (priorRow.accessibility_adjustments as string | null) ?? null,
      version: priorRow.version as number,
      goals: ((priorGoals ?? []) as Array<{ title: string; status: string; target_date: string | null }>).map((g) => ({
        title: g.title,
        status: g.status,
        target_date: g.target_date,
      })),
    };
  }

  return {
    student: student as Record<string, unknown>,
    authUid,
    courseName,
    qualificationCode,
    acGapsByUnit,
    attendance30,
    observations,
    portfolio,
    otj,
    risk,
    recentNotes,
    priorIlp,
    inclusion: {
      send_flags: ((student.send_flags as string[] | null) ?? []) as string[],
      eal: Boolean(student.eal),
      ehcp: Boolean(student.ehcp_ref),
      accessibility_notes: (student.accessibility_notes as string | null) ?? null,
    },
    expectedEndDate: (student.expected_end_date as string | null) ?? null,
  };
}

function compactContext(ctx: IlpContext): string {
  const lines: string[] = [];
  lines.push(`# Learner`);
  lines.push(`Name: ${(ctx.student.name as string) ?? 'Unknown'}`);
  if (ctx.courseName) lines.push(`Course: ${ctx.courseName}${ctx.qualificationCode ? ` (${ctx.qualificationCode})` : ''}`);
  if (ctx.expectedEndDate) lines.push(`Expected end date: ${ctx.expectedEndDate}`);
  if (ctx.inclusion.send_flags.length) lines.push(`SEND flags: ${ctx.inclusion.send_flags.join(', ')}`);
  if (ctx.inclusion.eal) lines.push(`EAL: yes`);
  if (ctx.inclusion.ehcp) lines.push(`EHCP: yes`);
  if (ctx.inclusion.accessibility_notes) lines.push(`Accessibility: ${ctx.inclusion.accessibility_notes}`);

  if (ctx.acGapsByUnit.size > 0) {
    lines.push(`\n# Curriculum coverage (per unit)`);
    const sorted = Array.from(ctx.acGapsByUnit.entries()).sort((a, b) => b[1].not_started - a[1].not_started);
    for (const [unit, g] of sorted.slice(0, 12)) {
      lines.push(
        `- Unit ${unit}${g.unit_title ? ` (${g.unit_title})` : ''}: ${g.not_started}/${g.total} not started, ${g.in_progress} in progress`
      );
    }
  }

  if (ctx.attendance30.total > 0) {
    const pct = Math.round((ctx.attendance30.present / ctx.attendance30.total) * 100);
    lines.push(
      `\nAttendance (30d): ${pct}% present (${ctx.attendance30.present}/${ctx.attendance30.total} sessions, ${ctx.attendance30.absent} absent, ${ctx.attendance30.late} late)`
    );
  } else {
    lines.push(`\nAttendance: no sessions recorded in last 30 days`);
  }

  lines.push(
    `\nOTJ this week: ${Math.round(ctx.otj.this_week_minutes / 60)}h / ${Math.round(ctx.otj.weekly_target / 60)}h target — All-time: ${Math.round(ctx.otj.total_minutes / 60)}h`
  );

  if (ctx.portfolio.submissions > 0) {
    lines.push(
      `\nPortfolio: ${ctx.portfolio.submissions} submissions, ${ctx.portfolio.awaiting_review} awaiting review, ${ctx.portfolio.requires_action} require action, ${ctx.portfolio.iqa_verified} IQA verified, ${ctx.portfolio.items} evidence items`
    );
  }

  if (ctx.observations.length) {
    lines.push(`\n# Recent observations`);
    for (const o of ctx.observations) {
      lines.push(`- ${o.activity_title} → ${o.outcome} (${o.observed_at})`);
    }
  }

  if (ctx.risk) {
    lines.push(`\nRisk: ${ctx.risk.level} (${ctx.risk.score}/100)`);
    for (const f of ctx.risk.factors.slice(0, 5)) {
      lines.push(`  - ${f.label} (severity ${f.severity})`);
    }
  }

  if (ctx.recentNotes.length) {
    lines.push(`\n# Pastoral notes`);
    for (const n of ctx.recentNotes) {
      lines.push(`- [${n.kind}] ${n.title ? `${n.title} — ` : ''}${n.body.slice(0, 160)}`);
    }
  }

  if (ctx.priorIlp) {
    lines.push(`\n# Prior ILP (v${ctx.priorIlp.version}) — refine, don't start over`);
    if (ctx.priorIlp.headline_focus) lines.push(`Focus: ${ctx.priorIlp.headline_focus}`);
    if (ctx.priorIlp.headline_strengths) lines.push(`Strengths: ${ctx.priorIlp.headline_strengths}`);
    if (ctx.priorIlp.headline_areas) lines.push(`Areas: ${ctx.priorIlp.headline_areas}`);
    if (ctx.priorIlp.support_strategies) lines.push(`Support: ${ctx.priorIlp.support_strategies}`);
    if (ctx.priorIlp.goals.length) {
      lines.push(`Existing goals (${ctx.priorIlp.goals.length}):`);
      for (const g of ctx.priorIlp.goals) {
        lines.push(`  - ${g.title} [${g.status}${g.target_date ? ` · due ${g.target_date}` : ''}]`);
      }
    }
  }

  return lines.join('\n');
}

const TOOL_SCHEMA = {
  type: 'function',
  function: {
    name: 'submit_ilp_draft',
    description: 'Return the AI-drafted ILP for the human tutor to review and save.',
    parameters: {
      type: 'object',
      additionalProperties: false,
      required: [
        'headline_focus',
        'headline_strengths',
        'headline_areas',
        'support_strategies',
        'accessibility_adjustments',
        'target_completion_date',
        'review_date',
        'goals',
      ],
      properties: {
        headline_focus: {
          type: 'string',
          description: 'One-line summary of what this plan is for. Specific, action-oriented.',
        },
        headline_strengths: {
          type: 'string',
          description: '2-3 sentences of genuine, evidence-backed strengths.',
        },
        headline_areas: {
          type: 'string',
          description: '2-3 sentences naming the most important areas for development.',
        },
        support_strategies: {
          type: 'string',
          description: 'How tutor / employer / peers / resources will support this plan.',
        },
        accessibility_adjustments: {
          type: 'string',
          description:
            'Any reasonable adjustments based on SEND/EAL/EHCP/accessibility flags. Empty string if none.',
        },
        target_completion_date: {
          type: 'string',
          description: 'ISO date YYYY-MM-DD. Use expected_end_date if known.',
        },
        review_date: {
          type: 'string',
          description: 'ISO date YYYY-MM-DD. Default 4-6 weeks from now.',
        },
        goals: {
          type: 'array',
          minItems: 3,
          maxItems: 5,
          items: {
            type: 'object',
            additionalProperties: false,
            required: ['title', 'description', 'acceptance_criteria', 'target_date', 'category', 'priority'],
            properties: {
              title: {
                type: 'string',
                description: 'Imperative, SMART (max 14 words).',
              },
              description: {
                type: 'string',
                description: 'What success looks like — visible to the learner.',
              },
              acceptance_criteria: {
                type: 'string',
                description: 'How we know it is done — concrete, evidenceable.',
              },
              target_date: { type: 'string', description: 'ISO date YYYY-MM-DD.' },
              category: {
                type: 'string',
                enum: ['academic', 'behavioural', 'skills', 'employability', 'wellbeing', 'attendance', 'other'],
              },
              priority: { type: 'string', enum: ['low', 'medium', 'high'] },
            },
          },
        },
      },
    },
  },
};

function buildSystemPrompt(): string {
  return `You are an experienced UK FE college tutor drafting a learner's Individual Learning Plan (ILP).

Your job is to produce a complete, evidence-backed, SMART-goaled ILP from the cross-hub data provided. The human tutor will review and save it — they need a strong starting draft, not a placeholder.

Rules:
- Reference real numbers and concrete signals (e.g. "11h short of weekly OTJ target", "0/120 ACs in Unit 305", "observation outcome 'partial' on three-phase install"). Don't invent.
- 3-5 SMART goals: Specific, Measurable, Achievable, Relevant, Time-bound. Each goal must have an acceptance_criteria the learner can act on without guessing.
- Cover a mix: academic, skills, employability, attendance/wellbeing if relevant. Don't repeat categories unless strongly justified.
- If SEND/EAL/EHCP flags present, factor into accessibility_adjustments. If none, return an empty string for accessibility_adjustments.
- target_date for each goal: stagger across the next 3 months. Don't pile them on the same day.
- target_completion_date: use the learner's expected_end_date if provided.
- review_date: 4-6 weeks from today.
- If a prior ILP is in the context, REFINE it — keep what's working, replace stale goals, address new gaps. Don't pretend it doesn't exist.
- Tone: clear, decisive, supportive UK English. The learner will read this — address them directly in description fields.

Return via the submit_ilp_draft tool.`;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST')
    return new Response('Method not allowed', { status: 405, headers: corsHeaders });

  let body: GenerateRequest;
  try {
    body = (await req.json()) as GenerateRequest;
  } catch {
    return new Response(JSON.stringify({ error: 'invalid_json' }), {
      status: 400,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }
  if (!body.student_id) {
    return new Response(JSON.stringify({ error: 'missing_student_id' }), {
      status: 400,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  const sb = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    { auth: { persistSession: false } }
  );

  const { user, profile, error: authError } = await authoriseStaff(req, sb);
  if (authError === 'unauthorized' || !user)
    return new Response(JSON.stringify({ error: 'unauthorized' }), {
      status: 401,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  if (authError === 'no_college' || !profile)
    return new Response(JSON.stringify({ error: 'no_college_profile' }), {
      status: 403,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });

  const ctx = await loadContext(sb, body.student_id);
  if (!ctx)
    return new Response(JSON.stringify({ error: 'student_not_found' }), {
      status: 404,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });

  const openAiKey = Deno.env.get('OPENAI_API_KEY');
  if (!openAiKey)
    return new Response(JSON.stringify({ error: 'openai_key_missing' }), {
      status: 500,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });

  const userPrompt = `Today is ${new Date().toISOString().slice(0, 10)}. ${
    body.instruction ? `Tutor instruction: ${body.instruction}\n\n` : ''
  }${compactContext(ctx)}`;

  const stream = new ReadableStream({
    async start(controller) {
      const ping = setInterval(() => {
        try {
          controller.enqueue(sseComment('keepalive'));
        } catch {
          /* closed */
        }
      }, 15_000);

      try {
        controller.enqueue(
          sseEvent('open', {
            student_id: body.student_id,
            student_name: ctx.student.name,
            has_prior: !!ctx.priorIlp,
            prior_version: ctx.priorIlp?.version ?? null,
          })
        );

        const ac = new AbortController();
        const timeout = setTimeout(() => ac.abort(), STREAM_TIMEOUT_MS);

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          signal: ac.signal,
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${openAiKey}` },
          body: JSON.stringify({
            model: CHAT_MODEL,
            stream: true,
            max_completion_tokens: MAX_COMPLETION_TOKENS,
            tool_choice: { type: 'function', function: { name: 'submit_ilp_draft' } },
            tools: [TOOL_SCHEMA],
            messages: [
              { role: 'system', content: buildSystemPrompt() },
              { role: 'user', content: userPrompt },
            ],
          }),
        });
        clearTimeout(timeout);

        if (!response.ok || !response.body) {
          const text = await response.text().catch(() => '');
          controller.enqueue(sseEvent('error', { error: 'openai_failed', detail: text.slice(0, 400) }));
          controller.close();
          return;
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';
        let toolArgsAcc = '';

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() ?? '';
          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith('data:')) continue;
            const payload = trimmed.slice(5).trim();
            if (payload === '[DONE]') continue;
            try {
              const json = JSON.parse(payload);
              const delta = json.choices?.[0]?.delta;
              const tcs = delta?.tool_calls as Array<{ function?: { arguments?: string } }> | undefined;
              if (tcs?.length) {
                for (const tc of tcs) {
                  const args = tc.function?.arguments;
                  if (args) {
                    toolArgsAcc += args;
                    controller.enqueue(sseEvent('token', { delta: args }));
                  }
                }
              }
            } catch {
              /* ignore */
            }
          }
        }

        let parsed: unknown = null;
        try {
          parsed = JSON.parse(toolArgsAcc);
        } catch {
          parsed = null;
        }

        controller.enqueue(sseEvent('done', { draft: parsed, raw: parsed ? null : toolArgsAcc }));
      } catch (e) {
        controller.enqueue(sseEvent('error', { error: 'stream_failed', detail: (e as Error).message }));
      } finally {
        clearInterval(ping);
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      ...corsHeaders,
      'content-type': 'text/event-stream',
      'cache-control': 'no-cache',
      connection: 'keep-alive',
    },
  });
});
