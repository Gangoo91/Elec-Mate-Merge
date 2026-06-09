// generate-portfolio-statement
//
// Drafts a first-person "breadth of my work" personal statement for the
// apprentice's EPA portfolio cover, grounded in their ACTUAL evidence
// (item titles, criteria covered, units touched). Returns the draft text;
// the apprentice edits + saves it client-side. No DB writes here.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';
import { captureException } from '../_shared/sentry.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, x-request-id, apikey, content-type',
};

const CHAT_MODEL = 'gpt-5.4-mini-2026-03-17';

const SYSTEM_PROMPT = `You are a UK FE electrical lecturer helping an apprentice write the opening personal statement for their End-Point Assessment portfolio of evidence.

Write a single first-person statement (120–160 words) that an EPA assessor reads first. It should:
- read as the apprentice's own authentic voice (first person, confident but not boastful)
- convey the BREADTH of their practical work and how they've grown across the programme
- reference the kinds of jobs and the range of assessment criteria covered, grounded ONLY in the evidence summary provided — never invent specific jobs, clients, or numbers not given
- end on EPA readiness

Hard rules: British English. No emojis. No headings or bullet points — flowing prose. Do not fabricate specifics. Call submit_statement exactly once.`;

const SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['statement'],
  properties: {
    statement: {
      type: 'string',
      description: '120–160 word first-person personal statement, plain prose.',
    },
  },
};

const parseUnit = (s: string): string | null =>
  (s.match(/^\s*([A-Za-z0-9/._-]+)\s+AC\b/) ?? s.match(/Unit\s*([A-Za-z0-9/._-]+)/i))?.[1] ?? null;

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'method_not_allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  try {
    const apiKey = Deno.env.get('OPENAI_API_KEY');
    if (!apiKey) throw new Error('OPENAI_API_KEY missing');

    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'content-type': 'application/json' },
      });
    }
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } }, auth: { persistSession: false } }
    );
    const { data: userRes } = await supabase.auth.getUser();
    if (!userRes?.user) {
      return new Response(JSON.stringify({ error: 'unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'content-type': 'application/json' },
      });
    }
    const userId = userRes.user.id;

    const [{ data: prof }, { data: items }] = await Promise.all([
      supabase
        .from('profiles')
        .select('full_name, apprentice_course, apprentice_level')
        .eq('id', userId)
        .maybeSingle(),
      supabase
        .from('portfolio_items')
        .select('title, assessment_criteria_met')
        .eq('user_id', userId),
    ]);

    const rows = (items ?? []) as Array<{
      title: string | null;
      assessment_criteria_met: string[] | null;
    }>;
    if (rows.length === 0) {
      return new Response(
        JSON.stringify({ error: 'no_evidence', message: 'Add some evidence first.' }),
        { status: 200, headers: { ...corsHeaders, 'content-type': 'application/json' } }
      );
    }

    const titles = rows.map((r) => r.title?.trim()).filter(Boolean).slice(0, 30);
    const acSet = new Set<string>();
    const unitSet = new Set<string>();
    for (const r of rows) {
      for (const ac of r.assessment_criteria_met ?? []) {
        acSet.add(ac);
        const u = parseUnit(ac);
        if (u) unitSet.add(u);
      }
    }

    const name = (prof?.full_name as string | null)?.trim() || 'the apprentice';
    const course = (prof?.apprentice_course as string | null)?.trim() || 'electrical apprenticeship';
    const level = prof?.apprentice_level ? `Level ${prof.apprentice_level}` : '';

    const summary = `APPRENTICE: ${name}${level ? ` (${level})` : ''}
PROGRAMME: ${course}
EVIDENCE SUMMARY (ground the statement only in this):
- ${rows.length} pieces of evidence
- ${acSet.size} assessment criteria covered across ${unitSet.size} units
- Examples of work captured:
${titles.map((t) => `  • ${t}`).join('\n')}`;

    const oaResp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'content-type': 'application/json' },
      body: JSON.stringify({
        model: CHAT_MODEL,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: summary },
        ],
        max_completion_tokens: 700,
        tools: [
          {
            type: 'function',
            function: {
              name: 'submit_statement',
              description: 'Return the drafted personal statement.',
              parameters: SCHEMA,
              strict: false,
            },
          },
        ],
        tool_choice: { type: 'function', function: { name: 'submit_statement' } },
      }),
    });

    if (!oaResp.ok) {
      const t = await oaResp.text();
      return new Response(JSON.stringify({ error: 'openai_error', detail: t.slice(0, 600) }), {
        status: 502,
        headers: { ...corsHeaders, 'content-type': 'application/json' },
      });
    }

    const oaJson = await oaResp.json();
    const args = oaJson.choices?.[0]?.message?.tool_calls?.[0]?.function?.arguments;
    if (!args) {
      return new Response(JSON.stringify({ error: 'no_tool_call' }), {
        status: 502,
        headers: { ...corsHeaders, 'content-type': 'application/json' },
      });
    }
    let parsed: { statement?: string };
    try {
      parsed = JSON.parse(args);
    } catch {
      return new Response(JSON.stringify({ error: 'invalid_json' }), {
        status: 502,
        headers: { ...corsHeaders, 'content-type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ statement: (parsed.statement ?? '').trim() }), {
      status: 200,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  } catch (e) {
    await captureException(e, { functionName: 'generate-portfolio-statement', requestUrl: req.url, requestMethod: req.method });
    return new Response(
      JSON.stringify({ error: 'unhandled', detail: (e as Error).message }),
      { status: 500, headers: { ...corsHeaders, 'content-type': 'application/json' } }
    );
  }
});
