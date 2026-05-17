// analyze-apprentice-feedback — sentiment + theme extraction on a single
// anonymous apprentice survey response.
// ELE-936 (L1). Called immediately after a response is submitted.
//
// POST { response_id }

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};
const CHAT_MODEL = 'gpt-5.4-mini-2026-03-17';

const SYSTEM_PROMPT = `You score sentiment + extract themes from anonymous apprentice survey responses for a UK FE college.

UK English. No PII reasoning — never speculate about specific people. Themes are short noun-phrases (max 4 words each, 1-4 themes per response).

Output via the submit_analysis tool.`;

const TOOL = {
  type: 'function',
  function: {
    name: 'submit_analysis',
    description: 'Submit the sentiment + theme analysis.',
    parameters: {
      type: 'object',
      additionalProperties: false,
      properties: {
        sentiment_score: { type: 'number', minimum: -1, maximum: 1 },
        sentiment_label: {
          type: 'string',
          enum: ['positive', 'neutral', 'negative', 'mixed'],
        },
        themes: { type: 'array', items: { type: 'string' }, maxItems: 4 },
      },
      required: ['sentiment_score', 'sentiment_label', 'themes'],
    },
  },
} as const;

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

  let body: { response_id: string };
  try {
    body = (await req.json()) as any;
  } catch {
    return new Response(JSON.stringify({ error: 'bad_body' }), {
      status: 400,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }
  if (!body.response_id) {
    return new Response(JSON.stringify({ error: 'response_id_required' }), {
      status: 400,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  const sb = createClient(SUPABASE_URL, SERVICE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data: response } = await sb
    .from('college_apprentice_survey_responses')
    .select('id, answers')
    .eq('id', body.response_id)
    .maybeSingle();
  if (!response) {
    return new Response(JSON.stringify({ error: 'not_found' }), {
      status: 404,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  // Concatenate free-text fields from the answers JSONB
  const answers = response.answers as Record<string, unknown>;
  const freeText = Object.values(answers ?? {})
    .filter((v): v is string => typeof v === 'string' && v.trim().length > 10)
    .join('\n\n');
  if (!freeText) {
    return new Response(JSON.stringify({ skipped: 'no_free_text' }), {
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  const aiRes = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${OPENAI_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: CHAT_MODEL,
      max_completion_tokens: 400,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: freeText },
      ],
      tools: [TOOL],
      tool_choice: { type: 'function', function: { name: 'submit_analysis' } },
    }),
  });

  if (!aiRes.ok) {
    return new Response(JSON.stringify({ error: 'ai_failed' }), {
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
  let parsed: { sentiment_score: number; sentiment_label: string; themes: string[] };
  try {
    parsed = JSON.parse(toolCall.function.arguments);
  } catch {
    return new Response(JSON.stringify({ error: 'ai_bad_json' }), {
      status: 502,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  await sb
    .from('college_apprentice_survey_responses')
    .update({
      sentiment_score: parsed.sentiment_score,
      sentiment_label: parsed.sentiment_label,
      themes: parsed.themes,
    })
    .eq('id', body.response_id);

  return new Response(JSON.stringify({ ok: true, ...parsed }), {
    headers: { ...corsHeaders, 'content-type': 'application/json' },
  });
});
