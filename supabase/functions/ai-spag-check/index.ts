// ai-spag-check — score apprentice text for Spelling, Punctuation & Grammar.
// ELE-895 (A3). Returns 0-100 score + issue list + level descriptor.
//
// POST { text: string, source_kind, source_id?, student_id?, persist?: boolean }

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';
import { captureException } from '../_shared/sentry.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

const CHAT_MODEL = 'gpt-5.4-mini-2026-03-17';

type SourceKind = 'portfolio' | 'otj' | 'quiz' | 'reflection' | 'manual';

interface Issue {
  offset?: number;
  length?: number;
  kind: 'spelling' | 'grammar' | 'punctuation';
  original: string;
  suggestion: string;
  explanation: string;
}

interface SpagArgs {
  spag_score: number;
  level_descriptor: 'distinction' | 'merit' | 'pass' | 'developing';
  overall_feedback: string;
  issues: Issue[];
}

const SYSTEM_PROMPT = `You are an English language assessor for a UK FE college.

Score the supplied apprentice text on Spelling, Punctuation and Grammar (SpaG) — used as evidence for Ofsted, ESFA and awarding-body sampling. Be fair but rigorous.

Scoring rubric:
- 90-100 (distinction): fluent, accurate, well-punctuated, suitable for client-facing trade reports
- 75-89 (merit): mostly accurate, minor lapses
- 60-74 (pass): readable, several lapses, awarding-body floor
- below 60 (developing): frequent errors that obscure meaning

For each material issue (max 12), return:
- kind: spelling / grammar / punctuation
- original: the exact substring with the problem
- suggestion: the corrected substring
- explanation: one short sentence (UK English)

Do NOT flag UK spellings or trade jargon (kWh, BS 7671, RCD, etc.) as errors. Be tolerant of dialect but not of mis-spelt safety-critical words.

overall_feedback: 1-2 sentences, addressed to the learner, named if context provides a name. UK English.

Submit via the submit_spag tool.`;

const SPAG_TOOL = {
  type: 'function',
  function: {
    name: 'submit_spag',
    description: 'Submit the SpaG assessment.',
    parameters: {
      type: 'object',
      additionalProperties: false,
      properties: {
        spag_score: { type: 'integer', minimum: 0, maximum: 100 },
        level_descriptor: {
          type: 'string',
          enum: ['distinction', 'merit', 'pass', 'developing'],
        },
        overall_feedback: { type: 'string' },
        issues: {
          type: 'array',
          maxItems: 12,
          items: {
            type: 'object',
            additionalProperties: false,
            properties: {
              kind: { type: 'string', enum: ['spelling', 'grammar', 'punctuation'] },
              original: { type: 'string' },
              suggestion: { type: 'string' },
              explanation: { type: 'string' },
            },
            required: ['kind', 'original', 'suggestion', 'explanation'],
          },
        },
      },
      required: ['spag_score', 'level_descriptor', 'overall_feedback', 'issues'],
    },
  },
} as const;

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
    return new Response(JSON.stringify({ error: 'unauthorized' }), {
      status: 401,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  let body: {
    text: string;
    source_kind: SourceKind;
    source_id?: string;
    student_id?: string;
    student_name?: string;
    persist?: boolean;
  };
  try {
    body = (await req.json()) as typeof body;
  } catch {
    return new Response(JSON.stringify({ error: 'bad_body' }), {
      status: 400,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }
  if (!body.text?.trim() || !body.source_kind) {
    return new Response(JSON.stringify({ error: 'text_and_source_kind_required' }), {
      status: 400,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  // AI call
  const aiRes = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${OPENAI_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: CHAT_MODEL,
      max_completion_tokens: 1_200,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        {
          role: 'user',
          content: `${body.student_name ? `Learner: ${body.student_name}\n` : ''}Source: ${body.source_kind}\n\nText:\n"""\n${body.text.trim()}\n"""`,
        },
      ],
      tools: [SPAG_TOOL],
      tool_choice: { type: 'function', function: { name: 'submit_spag' } },
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
    return new Response(JSON.stringify({ error: 'ai_no_tool_call' }), {
      status: 502,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }
  let parsed: SpagArgs;
  try {
    parsed = JSON.parse(toolCall.function.arguments);
  } catch (e) {
    await captureException(e, { functionName: 'ai-spag-check', requestUrl: req.url, requestMethod: req.method });
    return new Response(JSON.stringify({ error: 'ai_bad_json' }), {
      status: 502,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  // Persist if requested
  let inserted: { id: string } | null = null;
  if (body.persist !== false) {
    const sb = createClient(SUPABASE_URL, SERVICE_KEY, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    // Resolve college_id: prefer student's college, fall back to user's profile
    let collegeId: string | null = null;
    if (body.student_id) {
      const { data: st } = await sb
        .from('college_students')
        .select('college_id')
        .eq('id', body.student_id)
        .maybeSingle();
      collegeId = (st as { college_id?: string } | null)?.college_id ?? null;
    }
    if (!collegeId) {
      const { data: profile } = await sb
        .from('profiles')
        .select('college_id')
        .eq('id', auth.uid)
        .maybeSingle();
      collegeId = (profile as { college_id?: string } | null)?.college_id ?? null;
    }

    if (collegeId) {
      const { data: row } = await sb
        .from('college_spag_checks')
        .insert({
          college_id: collegeId,
          student_id: body.student_id ?? null,
          user_id: auth.uid,
          source_kind: body.source_kind,
          source_id: body.source_id ?? null,
          source_text: body.text.trim(),
          spag_score: parsed.spag_score,
          issue_count: parsed.issues.length,
          issues: parsed.issues,
          level_descriptor: parsed.level_descriptor,
          overall_feedback: parsed.overall_feedback,
        })
        .select('id')
        .maybeSingle();
      inserted = (row as { id: string }) ?? null;
    }
  }

  return new Response(
    JSON.stringify({
      spag_score: parsed.spag_score,
      level_descriptor: parsed.level_descriptor,
      overall_feedback: parsed.overall_feedback,
      issues: parsed.issues,
      check_id: inserted?.id ?? null,
    }),
    { headers: { ...corsHeaders, 'content-type': 'application/json' } }
  );
});
