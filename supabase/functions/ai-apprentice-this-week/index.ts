// AI This-Week brief — coaching nudge in mate-tutor voice for the apprentice's
// hub. Returns a structured brief: greeting + headline + 3-4 bullets each with
// a tap-to-action chip + a one-line encouragement.
//
// Cached one-per-iso-week. POST with { force: true } to regenerate.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';
import {
  loadLearnerContext,
  loadQualificationKit,
  lookupBs7671Facets,
  lookupQualificationAcs,
  bs7671SeedQueries,
  contextSummaryLines,
  raggedAcLines,
  bs7671FacetLines,
} from '../_shared/learner-context.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const CHAT_MODEL = 'gpt-5.4-mini-2026-03-17';
const MAX_TOKENS = 1_800;

type ActionKind =
  | 'open_quiz'
  | 'open_portfolio'
  | 'add_reflection'
  | 'submit_otj'
  | 'open_brief'
  | 'open_simulator'
  | 'edit_ilp'
  | 'message_tutor';

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

/** Map an apprentice action kind + optional target to an in-app href. */
function resolveActionHref(kind: ActionKind, targetId: string | undefined): string | null {
  const tid = targetId?.trim();
  const validId = tid && UUID_RE.test(tid) ? tid : null;
  switch (kind) {
    case 'open_quiz':
      return validId ? `/apprentice/college/quiz/${validId}` : null;
    case 'open_portfolio':
      return '/apprentice/college-plan#portfolio';
    case 'add_reflection':
      return '/apprentice/college-plan#otj';
    case 'submit_otj':
      return '/apprentice/college-plan#otj';
    case 'open_brief':
      return '/apprentice/college-plan#epa';
    case 'open_simulator':
      return '/apprentice/epa-simulator';
    case 'edit_ilp':
      return '/apprentice/college-plan#plan';
    case 'message_tutor':
      return '/apprentice/college-plan#plan';
    default:
      return null;
  }
}

/** ISO-week key like "2026-W17" — Monday-anchored, matches tutor cadence. */
function isoWeekKey(d: Date = new Date()): string {
  const target = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
  const dayNum = target.getUTCDay() || 7; // 1..7 (Mon..Sun)
  target.setUTCDate(target.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(target.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil(((target.getTime() - yearStart.getTime()) / 86_400_000 + 1) / 7);
  return `${target.getUTCFullYear()}-W${String(weekNo).padStart(2, '0')}`;
}

const SYSTEM_PROMPT = `You write a short weekly coaching brief for a UK electrical apprentice (age 18-25, on a Level 3 apprenticeship). The apprentice opens this on Monday morning to know what to crack on with.

Voice: direct, mate-tutor. Encouraging without being soft. UK apprentice slang is fine ("crack on", "smash it", "you've got this"). NO corporate fluff. NO "I" or "we" — talk to them, not about yourself. UK English.

Structure:
- greeting: short, by name, with the day/week framing. e.g. "Alright Andrew — here's what to crack on with this week."
- headline: a single punchy sentence summing up the focus. Plain English, no jargon.
- bullets: 3-4 concrete things. Each is ONE thing they can do. Title is a verb-led mini-headline. Why is one short sentence explaining why it matters TO THEM (linked to a real signal — quiz they failed, portfolio comment that's blocking sign-off, OTJ behind, EPA gateway approaching, etc.). Action_kind picks an in-app destination. NEVER drop a raw AC code or regulation number without translating it to plain English first.
- encouragement: one short closer. Real, not hollow. e.g. "Crack on — you're closer than you think." or "Steady week — keep stacking these wins."

Bullet hard rules:
- Every bullet maps to evidence in the supplied learner context. Don't invent.
- If the apprentice has nothing pressing, give 3 study/practice nudges that genuinely help (e.g. "Take 15 min on initial verification — your weakest topic last quiz", "Add one reflection from any small job"). Never pad with fluff.
- Translate jargon: "EFLI" → "earth fault loop impedance", "ADS" → "auto-disconnection of supply", etc. Don't show off.
- For action_kind=open_quiz, set action_target_id to the quiz_id from a real attempt in the context.
- For other kinds, omit action_target_id.

Output via the submit_brief tool exactly once.`;

const BRIEF_TOOL = {
  type: 'function',
  function: {
    name: 'submit_brief',
    description: 'Submit the structured weekly brief.',
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
              title: {
                type: 'string',
                description: 'Verb-led mini-headline. e.g. "Smash that initial verification quiz".',
              },
              why: {
                type: 'string',
                description:
                  'One short sentence explaining why this matters this week, grounded in their actual data.',
              },
              action_label: {
                type: 'string',
                description:
                  'Short button text. e.g. "Take quiz" / "Add reflection" / "Open portfolio".',
              },
              action_kind: {
                type: 'string',
                enum: [
                  'open_quiz',
                  'open_portfolio',
                  'add_reflection',
                  'submit_otj',
                  'open_brief',
                  'open_simulator',
                  'edit_ilp',
                  'message_tutor',
                ],
              },
              action_target_id: {
                type: 'string',
                description:
                  'Required only for open_quiz — pass the quiz_id from learner context. Omit otherwise.',
              },
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
    /* empty body is fine */
  }

  const sb = createClient(SUPABASE_URL, SERVICE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const week = isoWeekKey();

  // Cache hit?
  if (!body.force) {
    const { data: cached } = await sb
      .from('apprentice_weekly_briefs')
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

  // Resolve apprentice's college_students.id
  const { data: cs } = await sb
    .from('college_students')
    .select('id')
    .eq('user_id', auth.uid)
    .maybeSingle();
  const collegeStudentId = (cs as { id?: string } | null)?.id ?? null;
  if (!collegeStudentId) {
    return new Response(JSON.stringify({ error: 'no_learner_context' }), {
      status: 404,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  const ctx = await loadLearnerContext(sb, collegeStudentId);
  if (!ctx) {
    return new Response(JSON.stringify({ error: 'student_not_found' }), {
      status: 404,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  const seeds = bs7671SeedQueries(ctx);
  for (const g of ctx.ilp.goals.slice(0, 3)) {
    if (g.title) seeds.push(g.title.slice(0, 200));
  }

  const [qualKit, raggedAcs, facets, commentsRes] = await Promise.all([
    loadQualificationKit(sb, ctx.course?.code ?? null),
    lookupQualificationAcs(sb, seeds, ctx.course?.code ?? null, 8, 3),
    lookupBs7671Facets(sb, seeds, 5),
    sb
      .from('portfolio_comments')
      .select('content, created_at, requires_action, is_resolved')
      .eq('user_id', auth.uid)
      .eq('requires_action', true)
      .eq('is_resolved', false)
      .order('created_at', { ascending: false })
      .limit(3),
  ]);

  const comments =
    (commentsRes as { data: Array<{ content: string; created_at: string }> | null }).data ?? [];

  const ctxLines: string[] = [];
  ctxLines.push(`# Learner: ${ctx.student.name}`);
  ctxLines.push(
    `Qualification: ${qualKit.qualification_title ?? qualKit.qualification_code ?? 'unknown'}`
  );
  ctxLines.push('');

  // Tell the model up-front which action kinds are SAFE this week. Anything
  // not in this list gets dropped server-side, so the model picking it would
  // produce an empty bullet. Keep it explicit.
  const safeKinds: string[] = [
    'open_portfolio',
    'add_reflection',
    'submit_otj',
    'open_brief',
    'open_simulator',
    'edit_ilp',
    'message_tutor',
  ];
  if (ctx.quizzes.attempts.length > 0) {
    safeKinds.unshift('open_quiz');
  }
  ctxLines.push(`# Action kinds you may use this week (others will be dropped):`);
  ctxLines.push(safeKinds.map((k) => `- ${k}`).join('\n'));
  if (ctx.quizzes.attempts.length === 0) {
    ctxLines.push(
      '# IMPORTANT: This apprentice has no quiz attempts on file. Do NOT recommend open_quiz — pick from the other kinds.'
    );
  }
  ctxLines.push('');

  for (const l of contextSummaryLines(ctx)) ctxLines.push(l);
  ctxLines.push('');
  if (ctx.quizzes.attempts.length > 0) {
    ctxLines.push('## Recent quiz attempts (use these quiz_ids for open_quiz actions)');
    for (const a of ctx.quizzes.attempts.slice(0, 6)) {
      const score =
        a.percentage != null
          ? `${a.percentage.toFixed(0)}%`
          : a.score != null && a.total_points != null
            ? `${a.score}/${a.total_points}`
            : 'no score';
      ctxLines.push(
        `- "${a.title}" (quiz_id=${a.quiz_id}) — ${score}${a.passed === false ? ' · FAILED' : ''}`
      );
    }
    if (ctx.quizzes.sent_not_started > 0) {
      ctxLines.push(`Assigned but not started: ${ctx.quizzes.sent_not_started}`);
    }
    ctxLines.push('');
  }
  if (ctx.ilp.goals.length > 0) {
    ctxLines.push('## Active ILP goals (set by tutor)');
    for (const g of ctx.ilp.goals.slice(0, 5)) {
      ctxLines.push(
        `- ${g.title}${g.target_date ? ` · due ${g.target_date}` : ''}${g.status ? ` · ${g.status}` : ''}`
      );
    }
    ctxLines.push('');
  }
  if (comments.length > 0) {
    ctxLines.push('## Portfolio comments needing action');
    for (const c of comments) {
      ctxLines.push(`- ${c.created_at.slice(0, 10)}: ${c.content.slice(0, 200)}`);
    }
    ctxLines.push('');
  }
  if (raggedAcs.length > 0) {
    for (const l of raggedAcLines(raggedAcs, 10)) ctxLines.push(l);
  }
  if (facets.length > 0) {
    for (const l of bs7671FacetLines(facets, 6)) ctxLines.push(l);
  }

  // Single-call structured response.
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
          {
            role: 'user',
            content: "Write this week's brief now. Speak directly to me.",
          },
        ],
        tools: [BRIEF_TOOL],
        tool_choice: { type: 'function', function: { name: 'submit_brief' } },
        max_completion_tokens: MAX_TOKENS,
      }),
    });
  } catch (e) {
    return new Response(
      JSON.stringify({ error: 'openai_unreachable', detail: (e as Error).message }),
      {
        status: 502,
        headers: { ...corsHeaders, 'content-type': 'application/json' },
      }
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

  // Resolve action hrefs server-side. Drop bullets whose action can't resolve.
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

  // Upsert (regenerate replaces same-week row).
  const { data: saved, error: upErr } = await sb
    .from('apprentice_weekly_briefs')
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
