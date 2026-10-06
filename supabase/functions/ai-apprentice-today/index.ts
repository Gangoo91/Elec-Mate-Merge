// ai-apprentice-today — daily "study this today" nudge for an apprentice.
// ELE-900 (B5). Lazy-on-open: returns cached brief if one already exists for
// today; otherwise picks 1-3 things based on AC gaps + assigned quizzes due
// + EPA gateway proximity + OTJ shortfall.
//
// POST {} — returns { brief, cached }

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';

import { withSentry } from '../_shared/sentry.ts';
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  // Keep in step with _shared/cors.ts — the client sends x-request-id
  // (tracing) on every call; omitting it fails the whole request at preflight.
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

const CHAT_MODEL = 'gpt-5.4-mini-2026-03-17';
const MAX_TOKENS = 900;

type ActionKind =
  | 'open_quiz'
  | 'open_otj'
  | 'open_portfolio'
  | 'open_ac'
  | 'open_epa_brief'
  | 'open_reflection';

interface RawBullet {
  title: string;
  why: string;
  action_label: string;
  action_kind: ActionKind;
  action_target?: string;
}

interface BriefArgs {
  greeting: string;
  headline: string;
  bullets: RawBullet[];
  encouragement: string;
}

const SYSTEM_PROMPT = `You are a UK FE college tutor writing a tiny daily nudge for an electrical apprentice. Voice: warm, short, no fluff. UK English. Aim for 60 seconds of reading.

Pick the 1-3 most useful things to do TODAY based on the supplied signals (AC gaps, quizzes due, OTJ shortfall, EPA gateway proximity). Don't pad — if there's only one important thing, return one bullet.
Off-the-job hours: an OTJ shortfall means otj_status is 'behind' or 'slightly_behind' (counted hours below planned to date). Time learning in the app already counts. The requirement is a fixed total for the standard; never mention 20% or 6 hours a week.

Bullet rules:
- title: verb-led mini-headline ("Finish the IR test reflection")
- why: ONE short sentence grounded in the signals
- action_label: imperative, ≤4 words ("Open OTJ", "Take quiz")
- action_kind: pick the right surface
- action_target: optional UUID or AC code if relevant

Submit via the submit_brief tool exactly once.`;

const BRIEF_TOOL = {
  type: 'function',
  function: {
    name: 'submit_brief',
    description: 'Submit the daily study nudge.',
    parameters: {
      type: 'object',
      additionalProperties: false,
      properties: {
        greeting: { type: 'string' },
        headline: { type: 'string' },
        bullets: {
          type: 'array',
          minItems: 1,
          maxItems: 3,
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
                  'open_quiz',
                  'open_otj',
                  'open_portfolio',
                  'open_ac',
                  'open_epa_brief',
                  'open_reflection',
                ],
              },
              action_target: { type: 'string' },
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

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

async function authorise(req: Request) {
  const auth = req.headers.get('authorization');
  if (!auth) return { ok: false as const };
  const userClient = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_ANON_KEY')!,
    { global: { headers: { Authorization: auth } }, auth: { persistSession: false } }
  );
  const { data } = await userClient.auth.getUser();
  if (!data?.user) return { ok: false as const };
  return { ok: true as const, uid: data.user.id, email: data.user.email };
}

Deno.serve(withSentry('ai-apprentice-today', async (req) => {
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
    return new Response(JSON.stringify({ error: 'unauthorized' }), {
      status: 401,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  let body: { force?: boolean } = {};
  try {
    body = (await req.json()) as { force?: boolean };
  } catch {
    /* empty body OK */
  }

  const sb = createClient(SUPABASE_URL, SERVICE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const iso = todayIso();

  // Cache check
  if (!body.force) {
    const { data: cached } = await sb
      .from('apprentice_daily_briefs')
      .select('*')
      .eq('user_id', auth.uid)
      .eq('iso_date', iso)
      .maybeSingle();
    if (cached) {
      return new Response(JSON.stringify({ brief: cached, cached: true }), {
        headers: { ...corsHeaders, 'content-type': 'application/json' },
      });
    }
  }

  // Gather signals — lightweight reads.
  const sevenDaysAgo = new Date(Date.now() - 7 * 86_400_000).toISOString().slice(0, 10);

  const [studentRowRes, profileRes, gapsRes, otjRecentRes, epaRes] = await Promise.all([
    sb
      .from('college_students')
      .select('id, name, college_id, expected_end_date, cohort_id')
      .eq('user_id', auth.uid)
      .maybeSingle(),
    sb.from('profiles').select('full_name').eq('id', auth.uid).maybeSingle(),
    sb
      .from('student_ac_coverage')
      .select('ac_code, unit_code, qualification_code, status, evidence_count, last_evidence_at')
      .in('status', ['not_started', 'partial', 'collecting'])
      .order('last_evidence_at', { ascending: true, nullsFirst: true })
      .limit(8),
    sb
      .from('college_otj_entries')
      .select('id, duration_minutes, activity_date')
      .eq('student_id', auth.uid)
      .neq('verification_status', 'rejected')
      // in_app entries are tutor decisions on measured app time, which is
      // counted from the time rows below — counting both doubled it.
      .neq('source_kind', 'in_app')
      .gte('activity_date', sevenDaysAgo),
    sb.from('college_epa').select('status, gateway_date').eq('student_id', auth.uid).maybeSingle(),
  ]);

  const student = studentRowRes.data as
    | { id: string; name: string; college_id: string; expected_end_date: string | null }
    | null;
  if (!student) {
    return new Response(JSON.stringify({ error: 'not_a_college_apprentice' }), {
      status: 403,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }
  const profileName =
    (profileRes.data as { full_name?: string | null } | null)?.full_name ?? student.name;

  // The one off-the-job figure (get_otj_summary) plus this week's measured
  // learning in the app, which counts towards their hours (6 Oct 2026). On
  // college entries alone, a learner with hours of app study read as "no OTJ".
  const [{ data: otjSummary }, { data: appRows }] = await Promise.all([
    sb.rpc('get_otj_summary' as never, { p_user: auth.uid } as never),
    sb
      .from('time_entries')
      .select('id, duration')
      .eq('user_id', auth.uid)
      .eq('is_automatic', true)
      .eq('notes', 'Auto-tracked training time')
      .gte('date', sevenDaysAgo),
  ]);
  // Time a tutor left out does not count.
  const appList = (appRows ?? []) as Array<{ id: string; duration: number | null }>;
  let leftOut = new Set<string>();
  if (appList.length > 0) {
    const { data: links } = await sb
      .from('otj_capture_links')
      .select('time_entry_id, college_otj_entries!inner(verification_status)')
      .in('time_entry_id', appList.map((r) => r.id))
      .eq('college_otj_entries.verification_status', 'rejected');
    leftOut = new Set(((links ?? []) as Array<{ time_entry_id: string }>).map((l) => l.time_entry_id));
  }
  const appMinutes = appList
    .filter((r) => !leftOut.has(r.id))
    .reduce((acc, r) => acc + (r.duration ?? 0), 0);
  const otjMinutes =
    (otjRecentRes.data ?? []).reduce(
      (acc: number, r: any) => acc + (r.duration_minutes ?? 0),
      0
    ) + appMinutes;
  const otjS = otjSummary as {
    counted_hours?: number;
    required_hours?: number | null;
    planned_to_date_hours?: number | null;
    risk?: string;
  } | null;
  const epa = epaRes.data as { status?: string | null; gateway_date?: string | null } | null;
  const daysToGateway = epa?.gateway_date
    ? Math.round((new Date(epa.gateway_date).getTime() - Date.now()) / 86_400_000)
    : null;

  const signalsBlock = {
    learner_name: profileName,
    learner_first_name: (profileName ?? 'there').split(' ')[0],
    ac_gaps_top: (gapsRes.data ?? []).slice(0, 5).map((g: any) => ({
      ac: g.ac_code,
      unit: g.unit_code,
      qual: g.qualification_code,
      status: g.status,
      evidence_count: g.evidence_count,
    })),
    otj_minutes_last_7_days: otjMinutes,
    otj_app_learning_minutes_last_7_days: appMinutes,
    otj_counted_hours: otjS?.counted_hours ?? null,
    otj_required_hours: otjS?.required_hours ?? null,
    otj_planned_to_date_hours: otjS?.planned_to_date_hours ?? null,
    otj_status: otjS?.risk ?? null,
    epa_status: epa?.status ?? null,
    days_to_gateway: daysToGateway,
  };

  const userPrompt = `Today's date: ${iso}

Apprentice signals:
${JSON.stringify(signalsBlock, null, 2)}

Pick 1-3 things to do TODAY. Quality over quantity.`;

  const aiRes = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${OPENAI_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: CHAT_MODEL,
      max_completion_tokens: MAX_TOKENS,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userPrompt },
      ],
      tools: [BRIEF_TOOL],
      tool_choice: { type: 'function', function: { name: 'submit_brief' } },
    }),
  });
  if (!aiRes.ok) {
    const text = await aiRes.text();
    return new Response(JSON.stringify({ error: 'ai_failed', detail: text }), {
      status: 502,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }
  const aiJson = await aiRes.json();
  const toolCall = aiJson?.choices?.[0]?.message?.tool_calls?.[0];
  if (!toolCall?.function?.arguments) {
    return new Response(JSON.stringify({ error: 'ai_no_tool' }), {
      status: 502,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }
  let parsed: BriefArgs;
  try {
    parsed = JSON.parse(toolCall.function.arguments);
  } catch {
    return new Response(JSON.stringify({ error: 'ai_bad_json' }), {
      status: 502,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  const { data: stored } = await sb
    .from('apprentice_daily_briefs')
    .upsert(
      {
        user_id: auth.uid,
        iso_date: iso,
        greeting: parsed.greeting,
        headline: parsed.headline,
        bullets: parsed.bullets,
        encouragement: parsed.encouragement,
        source_signals: signalsBlock,
      },
      { onConflict: 'user_id,iso_date' }
    )
    .select('*')
    .single();

  return new Response(JSON.stringify({ brief: stored, cached: false }), {
    headers: { ...corsHeaders, 'content-type': 'application/json' },
  });
}));
