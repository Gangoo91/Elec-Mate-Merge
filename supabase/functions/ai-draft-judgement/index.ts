// ELE-942 / Assessor pack — AI drafts the assessor narrative for a single
// AC × student locker, given the evidence already attached.
//
// Saves the assessor 5-10 minutes per AC. Output is a draft the assessor
// reviews, edits, and saves. Never auto-saves.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';
import { captureException } from '../_shared/sentry.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, x-request-id, x-supabase-api-version, apikey, content-type',
};

const CHAT_MODEL = 'gpt-5.4-mini-2026-03-17';
const MAX_TOKENS = 2_500;

interface Body {
  student_id: string;
  qualification_code: string;
  unit_code: string;
  ac_code: string;
}

interface EvidenceLine {
  type: string;
  title: string;
  description: string | null;
  occurred_at: string | null;
  recorded_by: string | null;
}

const SYSTEM_PROMPT = `You are SARAH WHITAKER — a UK FE electrical lecturer with 25 years' experience. You hold TAQA and IQA quals. British English only. Concise, professional register that reads like a real assessor.

You draft an ASSESSOR NARRATIVE for a single Assessment Criterion. The narrative is the prose that backs up the assessor's judgement when an IQA samples it. Structure:

1. Open with the AC code + a single-sentence judgement (e.g. "AC 5.2 is met to a competent standard.")
2. Cite the strongest evidence by type and date.
3. Explain WHY that evidence shows the criterion is met — link the evidence to the AC's wording.
4. Note any limitations or caveats honestly. If there's a gap, say "I'd want to see X before final sign-off" rather than papering over it.
5. End with the assessor's verdict — passed / not yet / referred — based on what's there.

Hard rules:
- 80–160 words. Tight, professional prose. No bullet points.
- Don't invent evidence. Only reference what's in the EVIDENCE block.
- If there's no evidence, draft a "not yet" judgement explaining what's needed.
- UK English. No emojis. No flowery language.
- If a piece of evidence is observation-led, weight it heavier than self-uploaded portfolio items in your reasoning.`;

const SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['narrative', 'verdict'],
  properties: {
    narrative: { type: 'string' },
    verdict: {
      type: 'string',
      enum: ['passed', 'not_yet', 'referred'],
    },
    confidence: {
      type: 'string',
      enum: ['high', 'medium', 'low'],
    },
  },
};

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

    const body = (await req.json()) as Body;
    if (!body.student_id || !body.qualification_code || !body.unit_code || !body.ac_code) {
      return new Response(JSON.stringify({ error: 'missing_fields' }), {
        status: 400,
        headers: { ...corsHeaders, 'content-type': 'application/json' },
      });
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // Auth — caller must be college staff in the student's college.
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'content-type': 'application/json' },
      });
    }
    const userClient = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } }, auth: { persistSession: false } }
    );
    const { data: userRes } = await userClient.auth.getUser();
    if (!userRes?.user) {
      return new Response(JSON.stringify({ error: 'unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'content-type': 'application/json' },
      });
    }

    const { data: student } = await supabase
      .from('college_students')
      .select('id, name, user_id, college_id')
      .eq('id', body.student_id)
      .maybeSingle();
    const studentRow = student as {
      id: string;
      name: string;
      user_id: string | null;
      college_id: string | null;
    } | null;
    if (!studentRow?.college_id) {
      return new Response(JSON.stringify({ error: 'student_not_found' }), {
        status: 404,
        headers: { ...corsHeaders, 'content-type': 'application/json' },
      });
    }
    const { data: staff } = await supabase
      .from('college_staff')
      .select('id')
      .eq('user_id', userRes.user.id)
      .eq('college_id', studentRow.college_id)
      .is('archived_at', null)
      .maybeSingle();
    if (!staff) {
      return new Response(JSON.stringify({ error: 'forbidden' }), {
        status: 403,
        headers: { ...corsHeaders, 'content-type': 'application/json' },
      });
    }

    // Pull AC text
    const { data: req_row } = await supabase
      .from('qualification_requirements')
      .select('ac_text, lo_text, unit_title')
      .eq('qualification_code', body.qualification_code)
      .eq('unit_code', body.unit_code)
      .eq('ac_code', body.ac_code)
      .maybeSingle();
    const ac = req_row as { ac_text?: string; lo_text?: string; unit_title?: string } | null;
    if (!ac?.ac_text) {
      return new Response(JSON.stringify({ error: 'ac_not_found' }), {
        status: 404,
        headers: { ...corsHeaders, 'content-type': 'application/json' },
      });
    }

    // Pull evidence
    const evidenceLines: EvidenceLine[] = [];

    if (studentRow.user_id) {
      const { data: pRows } = await supabase
        .from('portfolio_items')
        .select('title, description, category, file_type, created_at')
        .eq('user_id', studentRow.user_id)
        .contains('assessment_criteria_met', [body.ac_code]);
      for (const p of (pRows ?? []) as Array<{
        title: string;
        description: string | null;
        category: string;
        file_type: string | null;
        created_at: string | null;
      }>) {
        evidenceLines.push({
          type: p.category ?? 'document',
          title: p.title,
          description: p.description,
          occurred_at: p.created_at,
          recorded_by: studentRow.name,
        });
      }
    }

    const { data: obsRows } = await supabase
      .from('college_observations')
      .select('activity_title, activity_summary, observed_at, assessor_name_snapshot')
      .eq('college_student_id', studentRow.id)
      .contains('acs_evidenced', [body.ac_code]);
    for (const o of (obsRows ?? []) as Array<{
      activity_title: string;
      activity_summary: string | null;
      observed_at: string | null;
      assessor_name_snapshot: string | null;
    }>) {
      evidenceLines.push({
        type: 'observation',
        title: o.activity_title,
        description: o.activity_summary,
        occurred_at: o.observed_at,
        recorded_by: o.assessor_name_snapshot,
      });
    }

    const evidenceBlock = evidenceLines.length
      ? evidenceLines
          .map((e, i) => {
            const dt = e.occurred_at
              ? new Date(e.occurred_at).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })
              : 'undated';
            const desc = e.description ? ` — ${e.description.slice(0, 240)}` : '';
            return `${i + 1}. [${e.type}] "${e.title}" by ${e.recorded_by ?? 'unknown'} on ${dt}${desc}`;
          })
          .join('\n')
      : '(no evidence attached)';

    const userPrompt = `LEARNER: ${studentRow.name}
QUALIFICATION: ${body.qualification_code}
UNIT: ${body.unit_code}${ac.unit_title ? ` — ${ac.unit_title}` : ''}
${ac.lo_text ? `LO: ${ac.lo_text}\n` : ''}AC: ${body.ac_code} — ${ac.ac_text}

EVIDENCE attached to this AC:
${evidenceBlock}

Draft the assessor narrative.`;

    const oaResp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'content-type': 'application/json' },
      body: JSON.stringify({
        model: CHAT_MODEL,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userPrompt },
        ],
        max_completion_tokens: MAX_TOKENS,
        tools: [
          {
            type: 'function',
            function: {
              name: 'submit_judgement',
              description: 'Persist the drafted assessor narrative.',
              parameters: SCHEMA,
              strict: false,
            },
          },
        ],
        tool_choice: { type: 'function', function: { name: 'submit_judgement' } },
      }),
    });

    if (!oaResp.ok) {
      const t = await oaResp.text();
      return new Response(
        JSON.stringify({ error: 'openai_error', detail: t.slice(0, 600) }),
        { status: 502, headers: { ...corsHeaders, 'content-type': 'application/json' } }
      );
    }

    const oaJson = await oaResp.json();
    const toolCall = oaJson.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall?.function?.arguments) {
      return new Response(JSON.stringify({ error: 'no_tool_call' }), {
        status: 502,
        headers: { ...corsHeaders, 'content-type': 'application/json' },
      });
    }
    let parsed: { narrative: string; verdict: string; confidence?: string };
    try {
      parsed = JSON.parse(toolCall.function.arguments);
    } catch {
      return new Response(JSON.stringify({ error: 'invalid_json' }), {
        status: 502,
        headers: { ...corsHeaders, 'content-type': 'application/json' },
      });
    }

    return new Response(
      JSON.stringify({
        narrative: parsed.narrative,
        verdict: parsed.verdict,
        confidence: parsed.confidence ?? 'medium',
        evidence_count: evidenceLines.length,
      }),
      { status: 200, headers: { ...corsHeaders, 'content-type': 'application/json' } }
    );
  } catch (e) {
    await captureException(e, { functionName: 'ai-draft-judgement', requestUrl: req.url, requestMethod: req.method });
    return new Response(
      JSON.stringify({ error: 'unhandled', detail: (e as Error).message }),
      { status: 500, headers: { ...corsHeaders, 'content-type': 'application/json' } }
    );
  }
});
