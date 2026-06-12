// AI Next Best Action — surfaces the 3-5 highest-leverage things a tutor
// should do for a learner today. Reads cross-hub data: risk, AC coverage
// gaps, OTJ shortfall, attendance, portfolio status, observations, ILP
// goals, recent pastoral notes. Returns prioritised actions with
// one-tap shortcuts (kind + target) so the UI can deep-link.
//
// Streams via SSE — same pattern as ai-assessor.

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
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

const CHAT_MODEL = 'gpt-5.4-mini-2026-03-17';
const MAX_COMPLETION_TOKENS = 4_000;
const STREAM_TIMEOUT_MS = 90_000;

interface NextActionRequest {
  /** college_students.id */
  student_id: string;
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
  if (!profile?.college_id) return { user: userData.user, profile: null, error: 'no_college' as const };
  return { user: userData.user, profile, error: null };
}

interface LearnerSnapshot {
  student: Record<string, unknown>;
  authUid: string | null;
  qualificationTitle: string | null;
  riskScore: number | null;
  riskLevel: string | null;
  riskFactors: Array<{ key: string; label: string; severity: number; detail?: string }>;
  acGaps: { not_started: number; in_progress: number; total: number };
  otj: { this_week_minutes: number; weekly_target: number; total_minutes: number };
  attendanceLast30: { present: number; absent: number; late: number; authorised: number; total: number };
  attendanceThisWeek: { present: number; absent: number; late: number; authorised: number; total: number };
  attendanceRecent: Array<{ date: string; status: string }>;
  portfolio: {
    awaiting_review: number;
    requires_action: number;
    last_submission_at: string | null;
  };
  observations: { count: number; last_outcome: string | null; last_at: string | null };
  ilpGoals: Array<{ title: string; status: string; target_date: string | null; overdue: boolean }>;
  recentNotes: Array<{ kind: string; title: string | null; body: string; created_at: string }>;
  inclusionFlags: { send_flags: string[]; eal: boolean; ehcp: boolean };
}

async function loadSnapshot(
  sb: ReturnType<typeof createClient>,
  studentId: string
): Promise<LearnerSnapshot | null> {
  const { data: student } = await sb
    .from('college_students')
    .select(
      'id, user_id, name, course_id, send_flags, eal, ehcp_ref, accessibility_notes, status, expected_end_date'
    )
    .eq('id', studentId)
    .maybeSingle();
  if (!student) return null;

  const authUid = (student.user_id as string | null) ?? null;

  // Course → name
  let qualificationTitle: string | null = null;
  if (student.course_id) {
    const { data: course } = await sb
      .from('college_courses')
      .select('name, code')
      .eq('id', student.course_id)
      .maybeSingle();
    if (course?.name) qualificationTitle = course.name as string;
  }

  // Risk
  const { data: risk } = await sb
    .from('student_risk_scores')
    .select('score, level, factors')
    .eq('student_id', studentId)
    .eq('is_current', true)
    .order('computed_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  // AC coverage
  const { data: cov } = await sb
    .from('student_ac_coverage')
    .select('status')
    .eq('student_id', studentId);
  const acGaps = {
    not_started: (cov ?? []).filter((r) => r.status === 'not_started').length,
    in_progress: (cov ?? []).filter((r) => r.status === 'in_progress').length,
    total: (cov ?? []).length,
  };

  // OTJ — apprentice side keyed off auth uid
  let otj = { this_week_minutes: 0, weekly_target: 360, total_minutes: 0 };
  if (authUid) {
    const sinceWeek = (() => {
      const now = new Date();
      const dayUtc = now.getUTCDay();
      const diffToMonday = (dayUtc + 6) % 7;
      return new Date(
        Date.UTC(
          now.getUTCFullYear(),
          now.getUTCMonth(),
          now.getUTCDate() - diffToMonday,
          0,
          0,
          0,
          0
        )
      ).toISOString();
    })();

    const [act, ses, col] = await Promise.all([
      sb
        .from('learning_activity_log')
        .select('duration_minutes, created_at')
        .eq('user_id', authUid)
        .eq('counted_as_ojt', true),
      sb
        .from('study_sessions')
        .select('duration, created_at')
        .eq('user_id', authUid),
      sb
        .from('college_otj_entries')
        .select('duration_minutes, activity_date, created_at')
        .eq('student_id', authUid),
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
    otj = { this_week_minutes: Math.round(week), weekly_target: 360, total_minutes: Math.round(total) };
  }

  // Attendance — last 30 days + this-week breakdown for richer signals
  const since30 = new Date(Date.now() - 30 * 86_400_000).toISOString().slice(0, 10);
  const since7 = new Date(Date.now() - 7 * 86_400_000).toISOString().slice(0, 10);
  const { data: att } = await sb
    .from('college_attendance')
    .select('status, date')
    .eq('student_id', studentId)
    .gte('date', since30)
    .order('date', { ascending: false });
  const attRows = ((att ?? []) as Array<{ status: string; date: string }>).map((r) => ({
    status: (r.status ?? '').toLowerCase(),
    date: r.date,
  }));
  const attendanceLast30 = {
    present: attRows.filter((r) => r.status === 'present').length,
    absent: attRows.filter((r) => r.status === 'absent').length,
    late: attRows.filter((r) => r.status === 'late').length,
    authorised: attRows.filter((r) => r.status === 'authorised').length,
    total: attRows.length,
  };
  const attendanceThisWeek = {
    present: attRows.filter((r) => r.date >= since7 && r.status === 'present').length,
    absent: attRows.filter((r) => r.date >= since7 && r.status === 'absent').length,
    late: attRows.filter((r) => r.date >= since7 && r.status === 'late').length,
    authorised: attRows.filter((r) => r.date >= since7 && r.status === 'authorised').length,
    total: attRows.filter((r) => r.date >= since7).length,
  };
  const attendanceRecent = attRows.slice(0, 6).map((r) => ({ date: r.date, status: r.status }));

  // Portfolio
  let portfolio = {
    awaiting_review: 0,
    requires_action: 0,
    last_submission_at: null as string | null,
  };
  if (authUid) {
    const { data: subs } = await sb
      .from('portfolio_submissions')
      .select('status, action_required, submitted_at')
      .eq('user_id', authUid)
      .order('submitted_at', { ascending: false, nullsFirst: false })
      .limit(50);
    const list = (subs ?? []) as Array<{
      status: string;
      action_required: string | null;
      submitted_at: string | null;
    }>;
    portfolio = {
      awaiting_review: list.filter((s) =>
        ['submitted', 'in_review', 'under_review', 'resubmitted'].includes(s.status)
      ).length,
      requires_action: list.filter((s) => s.action_required).length,
      last_submission_at: list[0]?.submitted_at ?? null,
    };
  }

  // Observations — note: college_observations.college_student_id (not student_id)
  const { data: obs } = await sb
    .from('college_observations')
    .select('outcome, observed_at')
    .eq('college_student_id', studentId)
    .order('observed_at', { ascending: false })
    .limit(5);
  const obsList = (obs ?? []) as Array<{ outcome: string; observed_at: string }>;
  const observations = {
    count: obsList.length,
    last_outcome: obsList[0]?.outcome ?? null,
    last_at: obsList[0]?.observed_at ?? null,
  };

  // ILP goals
  const today = new Date().toISOString().slice(0, 10);
  const { data: ilp } = await sb
    .from('college_ilps')
    .select('id')
    .eq('student_id', studentId)
    .eq('is_current', true)
    .order('version', { ascending: false })
    .limit(1)
    .maybeSingle();
  let ilpGoals: LearnerSnapshot['ilpGoals'] = [];
  if (ilp?.id) {
    const { data: goals } = await sb
      .from('college_ilp_goals')
      .select('title, status, target_date')
      .eq('ilp_id', ilp.id)
      .order('position', { ascending: true });
    ilpGoals = ((goals ?? []) as Array<{ title: string; status: string; target_date: string | null }>).map((g) => ({
      title: g.title,
      status: g.status,
      target_date: g.target_date,
      overdue:
        g.target_date != null &&
        g.target_date < today &&
        g.status !== 'completed' &&
        g.status !== 'cancelled',
    }));
  }

  // Recent pastoral notes
  const { data: notes } = await sb
    .from('pastoral_notes')
    .select('kind, title, body, created_at')
    .eq('student_id', studentId)
    .order('created_at', { ascending: false })
    .limit(5);

  return {
    student: student as Record<string, unknown>,
    authUid,
    qualificationTitle,
    riskScore: (risk?.score as number | null) ?? null,
    riskLevel: (risk?.level as string | null) ?? null,
    riskFactors: (risk?.factors as LearnerSnapshot['riskFactors'] | null) ?? [],
    acGaps,
    otj,
    attendanceLast30,
    attendanceThisWeek,
    attendanceRecent,
    portfolio,
    observations,
    ilpGoals,
    recentNotes: ((notes ?? []) as Array<{ kind: string; title: string | null; body: string; created_at: string }>).map((n) => ({
      kind: n.kind,
      title: n.title,
      body: (n.body ?? '').slice(0, 240),
      created_at: n.created_at,
    })),
    inclusionFlags: {
      send_flags: ((student.send_flags as string[] | null) ?? []) as string[],
      eal: Boolean(student.eal),
      ehcp: Boolean(student.ehcp_ref),
    },
  };
}

function compactSnapshot(snap: LearnerSnapshot): string {
  const lines: string[] = [];
  lines.push(`# Learner snapshot`);
  lines.push(`Name: ${(snap.student.name as string) ?? 'Unknown'}`);
  if (snap.qualificationTitle) lines.push(`Course: ${snap.qualificationTitle}`);
  if (snap.student.expected_end_date) lines.push(`Expected end: ${snap.student.expected_end_date}`);
  if (snap.inclusionFlags.send_flags.length)
    lines.push(`SEND flags: ${snap.inclusionFlags.send_flags.join(', ')}`);
  if (snap.inclusionFlags.eal) lines.push(`EAL: yes`);
  if (snap.inclusionFlags.ehcp) lines.push(`EHCP: yes`);
  if (snap.student.accessibility_notes)
    lines.push(`Accessibility: ${snap.student.accessibility_notes}`);

  lines.push(`\n# Signals`);
  if (snap.riskScore != null) {
    lines.push(`Risk: ${snap.riskLevel} (${snap.riskScore}/100)`);
    if (snap.riskFactors.length) {
      for (const f of snap.riskFactors.slice(0, 5)) {
        lines.push(`  - ${f.label} (severity ${f.severity})${f.detail ? `: ${f.detail}` : ''}`);
      }
    }
  } else {
    lines.push(`Risk: not yet computed`);
  }

  if (snap.acGaps.total > 0) {
    lines.push(
      `AC coverage: ${snap.acGaps.not_started} not started, ${snap.acGaps.in_progress} in progress (of ${snap.acGaps.total})`
    );
  }

  const otjPct = snap.otj.weekly_target > 0
    ? Math.round((snap.otj.this_week_minutes / snap.otj.weekly_target) * 100)
    : 0;
  lines.push(
    `OTJ this week: ${Math.round(snap.otj.this_week_minutes / 60)}h / ${Math.round(snap.otj.weekly_target / 60)}h target (${otjPct}%)`
  );
  lines.push(`OTJ all-time: ${Math.round(snap.otj.total_minutes / 60)}h`);

  if (snap.attendanceLast30.total > 0) {
    const present = snap.attendanceLast30.present;
    const total = snap.attendanceLast30.total;
    const pct = Math.round((present / total) * 100);
    lines.push(
      `Attendance (last 30 days): ${pct}% — ${present}/${total} present, ${snap.attendanceLast30.absent} absent, ${snap.attendanceLast30.late} late, ${snap.attendanceLast30.authorised} authorised`
    );
  }
  if (snap.attendanceThisWeek.total > 0) {
    const w = snap.attendanceThisWeek;
    lines.push(
      `Attendance THIS WEEK: ${w.present}/${w.total} present, ${w.absent} absent, ${w.late} late, ${w.authorised} authorised`
    );
    // Surface concerning patterns explicitly so the model can cite them.
    if (w.absent >= 2) {
      lines.push(`⚠ ABSENCE PATTERN: ${w.absent} unauthorised absences in the last 7 days — consider 1-2-1 / safeguarding follow-up.`);
    }
    if (w.late >= 2) {
      lines.push(`⚠ LATENESS PATTERN: ${w.late} late marks in the last 7 days — punctuality conversation may be due.`);
    }
  }
  if (snap.attendanceRecent.length > 0) {
    lines.push(`Recent register: ${snap.attendanceRecent.map((r) => `${r.date.slice(5)} ${r.status}`).join(', ')}`);
  }

  if (snap.portfolio.awaiting_review || snap.portfolio.requires_action) {
    lines.push(
      `Portfolio: ${snap.portfolio.awaiting_review} awaiting review, ${snap.portfolio.requires_action} require action`
    );
  }

  if (snap.observations.count) {
    lines.push(
      `Observations: ${snap.observations.count} recent — last "${snap.observations.last_outcome}" on ${snap.observations.last_at?.slice(0, 10)}`
    );
  }

  if (snap.ilpGoals.length) {
    lines.push(`\n# ILP goals (${snap.ilpGoals.length})`);
    for (const g of snap.ilpGoals) {
      lines.push(
        `- ${g.title} [${g.status}${g.overdue ? ' · OVERDUE' : ''}]${g.target_date ? ` due ${g.target_date}` : ''}`
      );
    }
  }

  if (snap.recentNotes.length) {
    lines.push(`\n# Recent pastoral notes`);
    for (const n of snap.recentNotes) {
      lines.push(
        `- [${n.kind}] ${n.title ? `${n.title} — ` : ''}${n.body.slice(0, 160)} (${n.created_at.slice(0, 10)})`
      );
    }
  }

  return lines.join('\n');
}

const TOOL_SCHEMA = {
  type: 'function',
  function: {
    name: 'submit_next_actions',
    description: 'Return 3-5 prioritised next actions for the tutor.',
    parameters: {
      type: 'object',
      additionalProperties: false,
      required: ['summary', 'actions'],
      properties: {
        summary: {
          type: 'string',
          description:
            'One short sentence framing why these actions are the priority right now (max 25 words).',
        },
        actions: {
          type: 'array',
          minItems: 3,
          maxItems: 5,
          items: {
            type: 'object',
            additionalProperties: false,
            required: ['title', 'why', 'priority', 'kind'],
            properties: {
              title: { type: 'string', description: 'Imperative — what to do (max 12 words).' },
              why: { type: 'string', description: 'Why now, in plain English (max 25 words).' },
              priority: { type: 'string', enum: ['high', 'medium', 'low'] },
              kind: {
                type: 'string',
                enum: [
                  'schedule_one_to_one',
                  'log_observation',
                  'send_message',
                  'add_pastoral_note',
                  'log_otj',
                  'review_portfolio',
                  'edit_ilp',
                  'add_ilp_goal',
                  'log_attendance',
                  'add_evidence',
                  'escalate_safeguarding',
                  'praise',
                  'other',
                ],
                description: 'Action category — drives the deep-link in the UI.',
              },
              detail: {
                type: 'string',
                description: 'Optional — extra context the tutor should know (max 40 words).',
              },
              ac_refs: {
                type: 'array',
                description:
                  'AC codes from the supplied catalogue that this action targets (e.g. ["303.1.4", "303.2.1"]). REQUIRED — empty array only if action is purely pastoral with no AC link.',
                items: { type: 'string' },
              },
              bs7671_refs: {
                type: 'array',
                description:
                  'BS 7671 regulation refs from the supplied facet list — only include those that genuinely apply (e.g. ["411.3.2.1"]).',
                items: { type: 'string' },
              },
              evidence_signal: {
                type: 'string',
                description:
                  'One short clause naming the specific signal that prompted this action (e.g. "failed Initial Verification quiz at 40% on 2026-04-26", "5 unauthorised absences in 28 days"). Cite real data.',
              },
            },
          },
        },
      },
    },
    required: ['summary', 'actions'],
  },
};

function buildSystemPrompt(): string {
  return `You are an experienced UK FE college Head of Apprenticeships. \
A tutor has just opened a learner's profile. Tell them the 3-5 highest-leverage things to do TODAY for this learner, in priority order.

Behaviour:
- Be specific to the supplied data. Reference real numbers ("attendance 67% over 28 days", "failed AC 303.1.4 quiz at 40%"), real overdue items, real risk factors. Never invent numbers.
- Cover a mix: AC progress, OTJ, portfolio, observations, pastoral, ILP, attendance, safeguarding, recent quiz failures. Don't recommend the same kind of action twice unless evidence demands.
- Tone: short, decisive, professional. UK English.
- Priority: high = needs action this week. Medium = next 2 weeks. Low = developmental.
- If risk is high or critical, lead with safeguarding / pastoral.
- If learner has SEND / EAL / EHCP flags, factor those into action design.
- If recent quiz attempts show a fail, the next-best-action is usually a follow-up quiz on the same AC OR a 1-2-1 to unblock the misconception — your call based on the evidence.
- If genuinely nothing urgent, default to mid-effort developmental actions (log observation, schedule 1-2-1, send praise).

${GROUNDING_RULES}

Return via the submit_next_actions tool. Each action's "kind" must match a known kind so the UI can deep-link. Each action's "ac_refs" must list every AC code from the supplied catalogue that this action targets.`;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405, headers: corsHeaders });
  }

  let body: NextActionRequest;
  try {
    body = (await req.json()) as NextActionRequest;
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
  if (authError === 'unauthorized' || !user) {
    return new Response(JSON.stringify({ error: 'unauthorized' }), {
      status: 401,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }
  if (authError === 'no_college' || !profile) {
    return new Response(JSON.stringify({ error: 'no_college_profile' }), {
      status: 403,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  // New: shared learner-context loader. Pulls every signal an AI surface
  // could need including tutor_quiz_attempts, KSBs, mocks, judgements,
  // ILP goals, attendance pattern, risk, observations, portfolio, OTJ.
  const ctx = await loadLearnerContext(sb, body.student_id);
  if (!ctx) {
    return new Response(JSON.stringify({ error: 'student_not_found' }), {
      status: 404,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }
  // Grounding kit — RAG'd ACs (most relevant 12) + BS 7671 facets seeded from
  // the learner's weak areas. Full AC catalogue is loaded as a fallback when
  // RAG returns nothing (catalogue not embedded yet).
  const acSeeds = bs7671SeedQueries(ctx); // same seeds work for both
  const [qualKit, raggedAcs, facets] = await Promise.all([
    loadQualificationKit(sb, ctx.course?.code ?? null),
    lookupQualificationAcs(sb, acSeeds, ctx.course?.code ?? null, 8, 4),
    lookupBs7671Facets(sb, acSeeds),
  ]);
  // If RAG returned nothing (embeddings not backfilled yet for this qual),
  // fall back to the inline catalogue capped at 50 lines.
  const acBlock = raggedAcs.length > 0
    ? raggedAcLines(raggedAcs, 12)
    : qualificationAcLines(qualKit, 50);

  const openAiKey = Deno.env.get('OPENAI_API_KEY');
  if (!openAiKey) {
    return new Response(JSON.stringify({ error: 'openai_key_missing' }), {
      status: 500,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  const userPrompt = [
    ...contextSummaryLines(ctx),
    ...acBlock,
    ...bs7671FacetLines(facets, 14),
    '',
    'Now produce 3-5 next best actions for the tutor via the submit_next_actions tool. Cite ACs by code. Cite BS 7671 by ref where relevant.',
  ].join('\n');

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
            risk_level: ctx.risk.level,
            qualification: qualKit.qualification_code,
            ac_catalogue_size: qualKit.acs.length,
            ragged_acs_loaded: raggedAcs.length,
            bs7671_facets_loaded: facets.length,
            recent_quiz_avg: ctx.quizzes.avg_recent_percent,
            data_loaded_at: ctx.loaded_at,
          })
        );

        const ac = new AbortController();
        const timeout = setTimeout(() => ac.abort(), STREAM_TIMEOUT_MS);

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          signal: ac.signal,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${openAiKey}`,
          },
          body: JSON.stringify({
            model: CHAT_MODEL,
            stream: true,
            max_completion_tokens: MAX_COMPLETION_TOKENS,
            tool_choice: { type: 'function', function: { name: 'submit_next_actions' } },
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

        controller.enqueue(sseEvent('done', { plan: parsed, raw: parsed ? null : toolArgsAcc }));
      } catch (e) {
        controller.enqueue(
          sseEvent('error', { error: 'stream_failed', detail: (e as Error).message })
        );
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
