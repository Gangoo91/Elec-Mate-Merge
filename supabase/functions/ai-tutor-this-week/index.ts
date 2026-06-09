// AI This-Week brief — tutor / assessor / IQA Monday-morning cohort
// briefing. Mirrors ai-apprentice-this-week but at cohort level: pulls
// cross-learner signals (OTJ inbox depth, quiz misses, attendance, EPA
// gateway clock, action-required portfolio comments) and proposes 3-4
// concrete tutor actions with deep-links into the right surface.
//
// Cached one-per-iso-week. POST with { force: true } to regenerate.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';
import { captureException } from '../_shared/sentry.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const CHAT_MODEL = 'gpt-5.4-mini-2026-03-17';
const MAX_TOKENS = 2_000;

type ActionKind =
  | 'open_otj_inbox'
  | 'open_student_360'
  | 'draft_one_to_one'
  | 'open_quizzes_dashboard'
  | 'log_observation'
  | 'edit_ilp'
  | 'open_ai_notebook';

interface RawBullet {
  title: string;
  why: string;
  action_label: string;
  action_kind: ActionKind;
  action_target_id?: string;
}

interface ResolvedBullet {
  title: string;
  why: string;
  action_label: string;
  action_kind: ActionKind;
  action_href: string;
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** Map a tutor action kind + optional target to an in-app href. */
function resolveActionHref(kind: ActionKind, targetId: string | undefined): string | null {
  const tid = targetId?.trim();
  const validId = tid && UUID_RE.test(tid) ? tid : null;
  switch (kind) {
    case 'open_otj_inbox':
      return '/college/otj/inbox';
    case 'open_quizzes_dashboard':
      return '/college/quizzes';
    case 'open_ai_notebook':
      return validId ? `/college/ai-notebook?student=${validId}` : '/college/ai-notebook';
    case 'open_student_360':
    case 'draft_one_to_one':
      return validId ? `/college/students/${validId}` : null;
    case 'log_observation':
      return validId ? `/college/students/${validId}#observations` : null;
    case 'edit_ilp':
      return validId ? `/college/students/${validId}#ilp` : null;
    default:
      return null;
  }
}

function isoWeekKey(d: Date = new Date()): string {
  const target = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
  const dayNum = target.getUTCDay() || 7;
  target.setUTCDate(target.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(target.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil(((target.getTime() - yearStart.getTime()) / 86_400_000 + 1) / 7);
  return `${target.getUTCFullYear()}-W${String(weekNo).padStart(2, '0')}`;
}

const SYSTEM_PROMPT = `You write a short Monday-morning briefing for a UK FE tutor / assessor / IQA managing electrical apprentices on Elec-Mate.

Voice: colleague, not assistant. Direct, evidence-led, no fluff. Sentence-length brevity. UK English.

Structure:
- greeting: short, by name. e.g. "Morning Andrew — five things on your radar this week."
- headline: a single punchy sentence summarising the week's focus.
- bullets: 3-4 concrete actions. Each is ONE thing they can do this week. Title is a verb-led mini-headline. Why is one short sentence grounded in real cohort signals (apprentices behind on X, OTJ submissions piling up, quiz misses on a topic, gateway clock, action-required comments). action_kind picks the right surface to jump to. action_target_id optional — for per-learner actions pass the college_students.id from the supplied context.
- encouragement: one short closer. Real, not soft. e.g. "Most of the cohort is on track — focus on the two outliers."

Bullet hard rules:
- Every bullet maps to evidence in the supplied cohort context. Don't invent numbers or learners.
- If the cohort is quiet, give 3 maintenance nudges that genuinely help (e.g. "Run a 1-2-1 with the lowest-attendance learner", "Verify the OTJ backlog before it stretches"). Never pad with fluff.
- Use first names when picking out individuals. Two outliers max in a single bullet — beyond that go to ranges ("3 learners scored under 50% on the IV quiz").
- For action_kind=open_student_360 / draft_one_to_one / log_observation / edit_ilp / open_ai_notebook, you MAY include action_target_id from the context's per-learner section.

Output via the submit_brief tool exactly once.`;

const BRIEF_TOOL = {
  type: 'function',
  function: {
    name: 'submit_brief',
    description: 'Submit the structured weekly tutor brief.',
    parameters: {
      type: 'object',
      additionalProperties: false,
      properties: {
        greeting: { type: 'string' },
        headline: { type: 'string' },
        bullets: {
          type: 'array',
          minItems: 3,
          maxItems: 4,
          items: {
            type: 'object',
            additionalProperties: false,
            properties: {
              title: { type: 'string' },
              why: { type: 'string' },
              action_label: { type: 'string' },
              action_kind: {
                type: 'string',
                enum: [
                  'open_otj_inbox',
                  'open_student_360',
                  'draft_one_to_one',
                  'open_quizzes_dashboard',
                  'log_observation',
                  'edit_ilp',
                  'open_ai_notebook',
                ],
              },
              action_target_id: { type: 'string' },
            },
            required: ['title', 'why', 'action_label', 'action_kind'],
          },
        },
        encouragement: { type: 'string' },
      },
      required: ['greeting', 'headline', 'bullets', 'encouragement'],
    },
  },
} as const;

interface BriefArgs {
  greeting: string;
  headline: string;
  bullets: RawBullet[];
  encouragement: string;
}

async function authorise(req: Request) {
  const auth = req.headers.get('authorization');
  if (!auth) return { ok: false as const, error: 'unauthorized' as const };
  const userClient = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_ANON_KEY')!,
    { global: { headers: { Authorization: auth } }, auth: { persistSession: false } }
  );
  const { data } = await userClient.auth.getUser();
  if (!data?.user) return { ok: false as const, error: 'unauthorized' as const };
  return { ok: true as const, uid: data.user.id };
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: corsHeaders });
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

  const auth = await authorise(req);
  if (!auth.ok) {
    return new Response(JSON.stringify({ error: auth.error }), {
      status: 401,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  let body: { force?: boolean } = {};
  try {
    body = (await req.json()) as { force?: boolean };
  } catch {
    /* empty body fine */
  }

  const sb = createClient(SUPABASE_URL, SERVICE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const week = isoWeekKey();

  if (!body.force) {
    const { data: cached } = await sb
      .from('tutor_weekly_briefs')
      .select('greeting, headline, bullets, encouragement, generated_at, iso_week')
      .eq('user_id', auth.uid)
      .eq('iso_week', week)
      .maybeSingle();
    if (cached) {
      return new Response(JSON.stringify({ brief: cached, cached: true }), {
        headers: { ...corsHeaders, 'content-type': 'application/json' },
      });
    }
  }

  // Resolve tutor's college + name
  const { data: staff } = await sb
    .from('college_staff')
    .select('id, name, college_id')
    .eq('user_id', auth.uid)
    .maybeSingle();
  const collegeId = (staff as { college_id?: string; name?: string } | null)?.college_id ?? null;
  const tutorName = (staff as { name?: string } | null)?.name ?? null;
  if (!collegeId) {
    return new Response(JSON.stringify({ error: 'not_college_staff' }), {
      status: 403,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  // Pull cohort signals in parallel — kept lightweight, just what the AI
  // needs to pick 3-4 actions. Per-learner detail is summarised aggregates
  // plus the top 8 highest-risk learners with names so bullets can name names.
  const todayDate = new Date().toISOString().slice(0, 10);
  const fortnightDate = new Date(Date.now() + 14 * 86_400_000).toISOString().slice(0, 10);
  const sevenDaysAgo = new Date(Date.now() - 7 * 86_400_000).toISOString();

  const [
    studentsRes,
    pendingOtjRes,
    actionCommentsRes,
    riskRes,
    recentQuizAttemptsRes,
    upcomingLessonsRes,
  ] = await Promise.all([
    sb
      .from('college_students')
      .select('id, name, user_id, status')
      .eq('college_id', collegeId)
      .neq('status', 'withdrawn'),
    sb
      .from('college_otj_entries')
      .select('id, student_id, title, duration_minutes, created_at')
      .eq('college_id', collegeId)
      .eq('verification_status', 'pending')
      .order('created_at', { ascending: true }),
    sb
      .from('portfolio_comments')
      .select('id, user_id, requires_action, is_resolved, content, created_at')
      .eq('requires_action', true)
      .eq('is_resolved', false)
      .gte('created_at', sevenDaysAgo)
      .order('created_at', { ascending: false }),
    sb
      .from('student_risk_scores')
      .select('student_id, score, level, factors, computed_at')
      .eq('is_current', true)
      .order('score', { ascending: false })
      .limit(20),
    // College tutor-set quizzes (NOT the study-centre quiz_attempts table).
    // No `passed` column — derive fail by joining tutor_quizzes.pass_mark and
    // comparing percentage. Done client-side after fetch to keep the query
    // simple. student_id here = college_students.id.
    sb
      .from('tutor_quiz_attempts')
      .select(
        'id, student_id, quiz_id, score, total_points, completed_at, tutor_quizzes(pass_mark, title)'
      )
      .gte('completed_at', sevenDaysAgo)
      .not('completed_at', 'is', null)
      .order('completed_at', { ascending: false })
      .limit(50),
    sb
      .from('college_lesson_plans')
      .select('id, title, scheduled_date, scheduled_start_time, cohort_id')
      .eq('college_id', collegeId)
      .gte('scheduled_date', todayDate)
      .lte('scheduled_date', fortnightDate)
      .order('scheduled_date', { ascending: true })
      .limit(10),
  ]);

  const students =
    (studentsRes as { data: Array<{ id: string; name: string; user_id: string | null }> | null })
      .data ?? [];
  const studentIds = new Set(students.map((s) => s.id));
  const studentByUid = new Map(
    students.filter((s) => s.user_id).map((s) => [s.user_id as string, s])
  );

  const pendingOtj =
    (
      pendingOtjRes as {
        data: Array<{
          student_id: string;
          created_at: string;
          title: string;
          duration_minutes: number | null;
        }> | null;
      }
    ).data ?? [];
  const actionComments =
    (
      actionCommentsRes as {
        data: Array<{ user_id: string; content: string; created_at: string }> | null;
      }
    ).data ?? [];
  const riskRows =
    (
      riskRes as {
        data: Array<{
          student_id: string;
          score: number;
          level: string | null;
          factors: unknown;
        }> | null;
      }
    ).data ?? [];
  // tutor_quiz_attempts row + nested tutor_quizzes (pass_mark, title)
  type QuizAttemptRow = {
    student_id: string;
    quiz_id: string;
    score: number | null;
    total_points: number | null;
    completed_at: string | null;
    tutor_quizzes: { pass_mark: number | null; title: string | null } | null;
  };
  const recentQuizzes = (recentQuizAttemptsRes as { data: QuizAttemptRow[] | null }).data ?? [];
  const upcomingLessons =
    (
      upcomingLessonsRes as {
        data: Array<{
          title: string;
          scheduled_date: string;
          scheduled_start_time: string | null;
        }> | null;
      }
    ).data ?? [];

  const ctxLines: string[] = [];
  ctxLines.push(`# Tutor: ${tutorName ?? 'staff'}`);
  ctxLines.push(`# College: ${collegeId}`);
  ctxLines.push(`# Cohort size (active): ${students.length}`);
  ctxLines.push('');

  const myStudents = students.slice(0, 25);
  if (myStudents.length > 0) {
    ctxLines.push(
      '## Learners (use these IDs for action_target_id where the bullet names a person)'
    );
    for (const s of myStudents) {
      ctxLines.push(`- ${s.name} (id=${s.id})`);
    }
    ctxLines.push('');
  }

  // college_otj_entries.student_id is the apprentice's auth.users.id (not
  // college_students.id) — keyed lookup via studentByUid.
  const myPending = pendingOtj.filter((o) => studentByUid.has(o.student_id));
  if (myPending.length > 0) {
    ctxLines.push(
      `## OTJ verification inbox: ${myPending.length} pending submission${myPending.length === 1 ? '' : 's'}`
    );
    const oldest = myPending[0];
    if (oldest) {
      const days = Math.floor((Date.now() - new Date(oldest.created_at).getTime()) / 86_400_000);
      ctxLines.push(`Oldest: "${oldest.title}" submitted ${days} day${days === 1 ? '' : 's'} ago.`);
    }
    ctxLines.push('');
  }

  const myActionComments = actionComments.filter((c) => studentByUid.has(c.user_id));
  if (myActionComments.length > 0) {
    ctxLines.push(`## Portfolio comments awaiting apprentice action: ${myActionComments.length}`);
    ctxLines.push(
      "Apprentices haven't responded yet — chase or follow up if it's been a few days."
    );
    ctxLines.push('');
  }

  const myRisk = riskRows.filter((r) => studentIds.has(r.student_id));
  if (myRisk.length > 0) {
    ctxLines.push('## Risk scores (top 8)');
    for (const r of myRisk.slice(0, 8)) {
      const learner = students.find((s) => s.id === r.student_id);
      if (!learner) continue;
      // factors is a freeform jsonb — pull a few human-readable strings if
      // it's an array of strings or has a `reasons` field. Otherwise omit.
      let reasons = '';
      if (Array.isArray(r.factors)) {
        reasons = (r.factors as unknown[])
          .filter((x): x is string => typeof x === 'string')
          .slice(0, 3)
          .join('; ');
      } else if (
        r.factors &&
        typeof r.factors === 'object' &&
        Array.isArray((r.factors as { reasons?: unknown[] }).reasons)
      ) {
        reasons = (r.factors as { reasons: unknown[] }).reasons
          .filter((x): x is string => typeof x === 'string')
          .slice(0, 3)
          .join('; ');
      }
      ctxLines.push(
        `- ${learner.name} (id=${learner.id}) — risk=${r.level ?? 'unknown'}, score=${r.score}${reasons ? ` · ${reasons}` : ''}`
      );
    }
    ctxLines.push('');
  }

  // Quiz fails — derive percentage from score/total_points and compare with
  // the parent quiz's pass_mark. tutor_quiz_attempts.student_id is
  // college_students.id, so match against studentIds (NOT studentByUid).
  type QuizFail = {
    studentId: string;
    learnerName: string;
    percentage: number | null;
    passMark: number | null;
    quizTitle: string | null;
  };
  const myFailedQuizzes: QuizFail[] = [];
  for (const q of recentQuizzes) {
    if (!studentIds.has(q.student_id)) continue;
    const passMark = q.tutor_quizzes?.pass_mark ?? null;
    const pct =
      q.score != null && q.total_points != null && q.total_points > 0
        ? Math.round((q.score / q.total_points) * 100)
        : null;
    // Treat as fail if we have a clear comparison and percentage is below
    // the pass mark. Skip ambiguous ones.
    if (pct == null || passMark == null) continue;
    if (pct >= passMark) continue;
    const learner = students.find((s) => s.id === q.student_id);
    if (!learner) continue;
    myFailedQuizzes.push({
      studentId: q.student_id,
      learnerName: learner.name,
      percentage: pct,
      passMark,
      quizTitle: q.tutor_quizzes?.title ?? null,
    });
  }
  if (myFailedQuizzes.length > 0) {
    ctxLines.push(`## Recent quiz fails (last 7 days): ${myFailedQuizzes.length}`);
    for (const q of myFailedQuizzes.slice(0, 5)) {
      ctxLines.push(
        `- ${q.learnerName} — ${q.percentage}% on ${q.quizTitle ?? 'quiz'} (pass=${q.passMark}%)`
      );
    }
    ctxLines.push('');
  }

  if (upcomingLessons.length > 0) {
    ctxLines.push('## Upcoming lessons (next 14 days)');
    for (const l of upcomingLessons) {
      ctxLines.push(`- ${l.scheduled_date} — ${l.title}`);
    }
    ctxLines.push('');
  }

  let openaiRes: Response;
  try {
    openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        authorization: `Bearer ${OPENAI_KEY}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: CHAT_MODEL,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'system', content: ctxLines.join('\n') },
          { role: 'user', content: "Write this week's brief now. Speak directly to me." },
        ],
        tools: [BRIEF_TOOL],
        tool_choice: { type: 'function', function: { name: 'submit_brief' } },
        max_completion_tokens: MAX_TOKENS,
      }),
    });
  } catch (e) {
    await captureException(e, { functionName: 'ai-tutor-this-week', requestUrl: req.url, requestMethod: req.method });
    return new Response(
      JSON.stringify({ error: 'openai_unreachable', detail: (e as Error).message }),
      { status: 502, headers: { ...corsHeaders, 'content-type': 'application/json' } }
    );
  }

  if (!openaiRes.ok) {
    const text = await openaiRes.text().catch(() => '');
    return new Response(
      JSON.stringify({ error: `openai_${openaiRes.status}`, detail: text.slice(0, 240) }),
      { status: 502, headers: { ...corsHeaders, 'content-type': 'application/json' } }
    );
  }

  let parsed: BriefArgs;
  try {
    const json = (await openaiRes.json()) as {
      choices: Array<{ message: { tool_calls?: Array<{ function: { arguments: string } }> } }>;
    };
    const args = json.choices?.[0]?.message?.tool_calls?.[0]?.function?.arguments;
    if (!args) throw new Error('no_tool_call');
    parsed = JSON.parse(args) as BriefArgs;
  } catch {
    return new Response(JSON.stringify({ error: 'bad_tool_args' }), {
      status: 502,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  const resolvedBullets: ResolvedBullet[] = [];
  for (const raw of parsed.bullets) {
    const href = resolveActionHref(raw.action_kind, raw.action_target_id);
    if (!href) continue;
    resolvedBullets.push({
      title: raw.title.slice(0, 120),
      why: raw.why.slice(0, 220),
      action_label: raw.action_label.slice(0, 30),
      action_kind: raw.action_kind,
      action_href: href,
    });
  }

  if (resolvedBullets.length === 0) {
    return new Response(JSON.stringify({ error: 'empty_brief' }), {
      status: 502,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  const { data: saved, error: upErr } = await sb
    .from('tutor_weekly_briefs')
    .upsert(
      {
        user_id: auth.uid,
        iso_week: week,
        greeting: parsed.greeting.slice(0, 200),
        headline: parsed.headline.slice(0, 240),
        bullets: resolvedBullets,
        encouragement: parsed.encouragement.slice(0, 200),
        generated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id,iso_week' }
    )
    .select('greeting, headline, bullets, encouragement, generated_at, iso_week')
    .single();

  if (upErr) {
    return new Response(JSON.stringify({ error: 'persist_failed', detail: upErr.message }), {
      status: 500,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ brief: saved, cached: false }), {
    headers: { ...corsHeaders, 'content-type': 'application/json' },
  });
});
