// AI OTJ Proposal — turns a one-line apprentice description ("rewired a
// kitchen consumer unit, took 4 hours") into a structured pre-fill for the
// Submit Work OTJ sheet. Apprentice always edits before submitting.
//
// Auth: the apprentice themselves only.
//
// POST { prompt: string }
//
// Returns: { title, description, activity_type, duration_minutes, unit_codes }
// — does NOT persist. The SubmitWorkOtjSheet reads this as `prefill` and the
// apprentice edits + submits as normal.

import { captureException } from '../_shared/sentry.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';
import {
  loadLearnerContext,
  loadQualificationKit,
  lookupQualificationAcs,
  qualificationAcLines,
  raggedAcLines,
  GROUNDING_RULES,
} from '../_shared/learner-context.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

const CHAT_MODEL = 'gpt-5.4-mini-2026-03-17';
const MAX_COMPLETION_TOKENS = 1_500;
const MIN_PROMPT_CHARS = 8;
const MAX_PROMPT_CHARS = 1_000;

type SbClient = ReturnType<typeof createClient>;

interface ReqBody {
  prompt: string;
}

const ACTIVITY_TYPES = [
  'practical',
  'shadowing',
  'manufacturer_training',
  'industry_visit',
  'employer_meeting',
  'simulation',
  'mentoring',
  'theory',
  'assessment',
  'other',
] as const;

/* ───────────────── tool schema ────────────────── */

const PROPOSAL_TOOL = {
  type: 'function',
  function: {
    name: 'submit_otj_proposal',
    description:
      "Propose a structured OTJ entry from the apprentice's short description. The apprentice will review and edit before submitting.",
    parameters: {
      type: 'object',
      additionalProperties: false,
      properties: {
        title: {
          type: 'string',
          description:
            'A short, specific title for the activity (5-12 words). Avoid generic phrases like "did some work" — name the actual task.',
        },
        description: {
          type: 'string',
          description:
            "2-4 sentences describing what the apprentice did and what they learned. Use UK English. Stick to facts in the apprentice's prompt — do not invent specifics that weren't mentioned. If the prompt is vague, leave room for the apprentice to fill in.",
        },
        activity_type: {
          type: 'string',
          enum: ACTIVITY_TYPES,
          description:
            'Pick the closest match. Hands-on install/fault-find = practical. Watching a senior = shadowing. CPD from a kit supplier = manufacturer_training. Site visit / factory tour = industry_visit. Toolbox talk / debrief = employer_meeting. Rig practice = simulation. 1-2-1 with senior = mentoring. Reading / regs review = theory. Being assessed = assessment. Anything else = other.',
        },
        duration_minutes: {
          type: 'integer',
          description:
            'Best estimate from the prompt (e.g. "4 hours" → 240). Default to 60 if unstated. Cap at 1440 (a full working day).',
        },
        unit_codes: {
          type: 'array',
          description:
            "Up to 3 unit codes from the supplied catalogue that this activity could evidence. Empty array if nothing clearly fits — don't guess.",
          items: { type: 'string' },
        },
      },
      required: ['title', 'description', 'activity_type', 'duration_minutes', 'unit_codes'],
    },
  },
} as const;

interface ProposalArgs {
  title: string;
  description: string;
  activity_type: (typeof ACTIVITY_TYPES)[number];
  duration_minutes: number;
  unit_codes: string[];
}

/* ───────────────── prompts ───────────────── */

function buildSystemPrompt(): string {
  return `You are helping a UK electrical apprentice write up an off-the-job (OTJ) training entry for ESFA-defensible logging.

Your job: turn their short description into a structured proposal. The apprentice will REVIEW AND EDIT it before submitting — you are giving them a strong starting point, not a final answer.

ESFA OTJ context (so you know what counts):
- Counts: training, theory study, shadowing, mentoring, manufacturer training, simulation, industry visits, toolbox talks introducing NEW knowledge, observed assessments, on-job tasks specifically designed to teach a new skill.
- Does NOT count: normal contracted productive work the apprentice does daily, breaks, employer-induction admin, generic team meetings.

Rules:
- UK English (analyse, behaviour, programme, colour).
- Be specific in the title. Avoid generic stock phrases.
- In the description: stick to what the apprentice said. Don't invent kit, supervisor names, locations or specifics they didn't mention. If the prompt is short, write a short description.
- Activity type: pick the closest match from the enum.
- Duration: parse from the prompt where possible. "4 hours" → 240. "Half day" → 240. "All morning" → 180.
- Unit codes: only suggest codes that clearly fit — don't pad. Empty array is the right answer when in doubt.

${GROUNDING_RULES}

Output via the submit_otj_proposal tool exactly once.`;
}

function buildUserPrompt(prompt: string, acsBlock: string[]): string {
  const lines: string[] = [];
  lines.push("# Apprentice's prompt");
  lines.push(prompt.trim());

  if (acsBlock.length > 0) {
    lines.push('');
    lines.push("# Available unit codes / ACs from this apprentice's qualification");
    for (const l of acsBlock) lines.push(l);
  }

  lines.push('');
  lines.push('Now propose the OTJ entry via submit_otj_proposal.');
  return lines.join('\n');
}

/* ───────────────── handler ───────────────── */

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST')
    return new Response(JSON.stringify({ error: 'method_not_allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });

  const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
  const SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  const ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY');
  const OPENAI_KEY = Deno.env.get('OPENAI_API_KEY');
  if (!SUPABASE_URL || !SERVICE_KEY || !ANON_KEY || !OPENAI_KEY) {
    return new Response(JSON.stringify({ error: 'server_misconfigured' }), {
      status: 500,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  const sb: SbClient = createClient(SUPABASE_URL, SERVICE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  // Auth: apprentice's own JWT, no role check needed (they're proposing
  // their own entry — any signed-in user can call this).
  const auth = req.headers.get('authorization');
  if (!auth) {
    return new Response(JSON.stringify({ error: 'unauthorized' }), {
      status: 401,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }
  const userClient = createClient(SUPABASE_URL, ANON_KEY, {
    global: { headers: { Authorization: auth } },
    auth: { persistSession: false },
  });
  const { data: userData } = await userClient.auth.getUser();
  const uid = userData?.user?.id;
  if (!uid) {
    return new Response(JSON.stringify({ error: 'unauthorized' }), {
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
  const trimmed = (body.prompt ?? '').trim();
  if (trimmed.length < MIN_PROMPT_CHARS) {
    return new Response(JSON.stringify({ error: 'prompt_too_short' }), {
      status: 400,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }
  const promptText =
    trimmed.length > MAX_PROMPT_CHARS ? `${trimmed.slice(0, MAX_PROMPT_CHARS)}…` : trimmed;

  // RAG'd ACs to ground unit-code suggestions in the apprentice's actual
  // qualification. Falls back to no AC block if anything in the chain
  // breaks — the proposal still works without them.
  let acsBlock: string[] = [];
  try {
    const { data: cs } = await sb
      .from('college_students')
      .select('id')
      .eq('user_id', uid)
      .maybeSingle();
    const collegeStudentId = (cs as { id?: string } | null)?.id ?? null;
    if (collegeStudentId) {
      const ctx = await loadLearnerContext(sb, collegeStudentId);
      const qualCode = ctx?.course?.code ?? null;
      if (qualCode) {
        const seeds = [promptText.slice(0, 200)];
        const [qualKit, raggedAcs] = await Promise.all([
          loadQualificationKit(sb, qualCode),
          lookupQualificationAcs(sb, seeds, qualCode, 6, 3),
        ]);
        acsBlock =
          raggedAcs.length > 0 ? raggedAcLines(raggedAcs, 8) : qualificationAcLines(qualKit, 24);
      }
    }
  } catch {
    acsBlock = [];
  }

  try {
    const completion = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        authorization: `Bearer ${OPENAI_KEY}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: CHAT_MODEL,
        messages: [
          { role: 'system', content: buildSystemPrompt() },
          { role: 'user', content: buildUserPrompt(promptText, acsBlock) },
        ],
        tools: [PROPOSAL_TOOL],
        tool_choice: { type: 'function', function: { name: 'submit_otj_proposal' } },
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

    const proposal = JSON.parse(args) as ProposalArgs;
    // Defensive normalisation — clamp duration, dedupe + cap unit codes,
    // truncate strings. Guard against the model returning a non-numeric
    // duration (NaN) — Math.round/min/max preserve NaN, which would write
    // an unparseable value into the form prefill. Default to 60 minutes
    // when we can't parse a number (matches the prompt's stated default).
    const rawDuration = Number(proposal.duration_minutes);
    const duration = Number.isFinite(rawDuration) ? Math.round(rawDuration) : 60;
    const safe = {
      title: (proposal.title ?? '').slice(0, 120).trim(),
      description: (proposal.description ?? '').slice(0, 1200).trim(),
      activity_type: ACTIVITY_TYPES.includes(proposal.activity_type)
        ? proposal.activity_type
        : 'other',
      duration_minutes: Math.max(15, Math.min(1440, duration)),
      unit_codes: Array.from(
        new Set((proposal.unit_codes ?? []).map((u) => String(u).trim()).filter(Boolean))
      ).slice(0, 3),
    };

    return new Response(JSON.stringify(safe), {
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  } catch (e) {
    await captureException(e, { functionName: 'ai-otj-proposal', requestUrl: req.url, requestMethod: req.method });
    return new Response(JSON.stringify({ error: (e as Error).message ?? 'unknown' }), {
      status: 500,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }
});
