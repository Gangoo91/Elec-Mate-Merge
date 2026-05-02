// ELE-942 / Assessor pack — proactive job ideas for an apprentice's
// current AC gaps.
//
// Takes a student_id, looks at their ACs that are not yet evidenced (with
// emphasis on mandatory + most-blocked), and returns 3–5 UK-electrical job
// ideas the apprentice could plan to do at work. Each job idea covers
// multiple ACs efficiently and ships with a checklist of evidence to
// capture so the existing portfolio flow can consume it.
//
// Output is ephemeral (computed on demand). No DB writes.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, x-request-id, x-supabase-api-version, apikey, content-type',
};

const CHAT_MODEL = 'gpt-5.4-mini-2026-03-17';
const MAX_TOKENS = 6_000;
const MAX_GAPS_TO_SHOW_AI = 25;

interface Body {
  student_id: string;
  /** Optional override — if absent we pull all current gaps. */
  ac_codes_focus?: string[];
  /** How many job ideas to return; default 4. */
  count?: number;
}

const SYSTEM_PROMPT = `You are SARAH WHITAKER — a UK FE electrical lecturer with 25 years' experience. C&G 2365/2357/2391, EAL L3 600/5, IQA-qualified. British English only.

You suggest concrete, real-world UK electrical jobs an apprentice could plan to do AT WORK to cover assessment criteria they're missing. You think like a working assessor: efficient evidence is one job that hits multiple ACs.

For each job idea you produce:

1. A specific, real UK electrical job (not a classroom exercise) — domestic CU change, ring final test on a flat, cooker circuit installation, EICR coding on a 1980s install, fault-find on a 2-way landing light, second-fix sockets on a kitchen, supply isolation for a fuseboard upgrade, etc.
2. A "when to plan it" prompt the apprentice would naturally read as "next time you're at work…" — actionable, not abstract
3. The ACs this job typically covers, marked primary (the AC is fully evidenced) or partial (the AC is supported but needs more)
4. An evidence checklist tailored to the job — which photos, witness statements, test results, reflective notes the apprentice should capture. Each checklist item has a type (matches our evidence_types catalogue), a short label, whether it's required for the AC coverage, and whether a witness signature is needed.
5. A difficulty tag — 'novice' (suitable for a fresh L2), 'developing' (mid-programme), 'competent' (later programme).

Hard rules:
1. Call the submit_job_ideas tool exactly once.
2. Cite ONLY ACs that appear in the GAPS block. Do not invent AC codes.
3. Be specific to the apprentice's qualification context (their gaps tell you their level).
4. Each job idea must cover AT LEAST 2 ACs to justify a tutor's time recommending it.
5. Evidence checklist items must use these type codes: photo, document, certificate, test_result, witness, reflection, work_log, video, drawing, calculation.
6. UK English. No emojis.
7. Real UK tools/brands where it adds specificity: Megger MFT1741, Fluke 1664, Hager / BG / MK / Schneider consumer units, Wago lever connectors, T+E twin-and-earth, etc.`;

const SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['ideas'],
  properties: {
    ideas: {
      type: 'array',
      minItems: 2,
      maxItems: 6,
      items: {
        type: 'object',
        additionalProperties: false,
        required: [
          'title',
          'when_prompt',
          'scenario',
          'ac_coverage',
          'evidence_checklist',
          'difficulty',
        ],
        properties: {
          title: { type: 'string' },
          when_prompt: {
            type: 'string',
            description:
              'Conversational prompt — "Next time you\'re at work doing…" — directly actionable.',
          },
          scenario: {
            type: 'string',
            description:
              '60–120 word scenario painting the job — what the work is, what the apprentice does, why it matters.',
          },
          ac_coverage: {
            type: 'array',
            minItems: 2,
            maxItems: 8,
            items: {
              type: 'object',
              additionalProperties: false,
              required: ['ac_code', 'strength', 'rationale'],
              properties: {
                ac_code: { type: 'string' },
                strength: {
                  type: 'string',
                  enum: ['primary', 'partial'],
                  description:
                    'primary = this job fully evidences the AC; partial = supports but needs more.',
                },
                rationale: { type: 'string' },
              },
            },
          },
          evidence_checklist: {
            type: 'array',
            minItems: 2,
            maxItems: 8,
            items: {
              type: 'object',
              additionalProperties: false,
              required: ['type', 'label', 'required'],
              properties: {
                type: {
                  type: 'string',
                  enum: [
                    'photo',
                    'document',
                    'certificate',
                    'test_result',
                    'witness',
                    'reflection',
                    'work_log',
                    'video',
                    'drawing',
                    'calculation',
                  ],
                },
                label: { type: 'string' },
                required: { type: 'boolean' },
                needs_witness_signature: { type: 'boolean' },
                guidance: { type: 'string' },
              },
            },
          },
          difficulty: {
            type: 'string',
            enum: ['novice', 'developing', 'competent'],
          },
          /** Estimated time on the job in minutes. */
          estimated_minutes: { type: 'integer', minimum: 15, maximum: 480 },
        },
      },
    },
  },
};

interface AcRow {
  qualification_code: string;
  unit_code: string;
  ac_code: string;
  status: string;
  evidence_count: number;
}

interface AcText {
  ac_code: string;
  unit_code: string;
  unit_title: string;
  ac_text: string;
  lo_text: string;
}

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
    if (!body.student_id) {
      return new Response(JSON.stringify({ error: 'student_id_required' }), {
        status: 400,
        headers: { ...corsHeaders, 'content-type': 'application/json' },
      });
    }
    const count = Math.max(2, Math.min(6, body.count ?? 4));

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // Auth + ownership: caller must be the student themselves OR college
    // staff in the student's college.
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
    const callerId = userRes.user.id;

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
    if (!studentRow) {
      return new Response(JSON.stringify({ error: 'student_not_found' }), {
        status: 404,
        headers: { ...corsHeaders, 'content-type': 'application/json' },
      });
    }
    let authorised = false;
    if (studentRow.user_id === callerId) authorised = true;
    if (!authorised && studentRow.college_id) {
      const { data: staff } = await supabase
        .from('college_staff')
        .select('id')
        .eq('user_id', callerId)
        .eq('college_id', studentRow.college_id)
        .is('archived_at', null)
        .maybeSingle();
      if (staff) authorised = true;
    }
    if (!authorised) {
      return new Response(JSON.stringify({ error: 'forbidden' }), {
        status: 403,
        headers: { ...corsHeaders, 'content-type': 'application/json' },
      });
    }

    // Pull current coverage rows (gives us status + evidence_count per AC)
    const { data: coverageRows } = await supabase
      .from('student_ac_coverage')
      .select('qualification_code, unit_code, ac_code, status, evidence_count')
      .eq('student_id', studentRow.id);
    const coverage = (coverageRows ?? []) as AcRow[];

    if (coverage.length === 0) {
      return new Response(
        JSON.stringify({ ideas: [], note: 'no_coverage_seeded' }),
        { status: 200, headers: { ...corsHeaders, 'content-type': 'application/json' } }
      );
    }

    const qualCode = coverage[0].qualification_code;

    // Identify gaps — not yet evidenced. Optional override list lets the
    // caller focus the AI on a specific subset.
    const focusSet = new Set(body.ac_codes_focus ?? []);
    let gaps = coverage.filter(
      (c) => c.status === 'not_started' || c.status === 'in_progress'
    );
    if (focusSet.size > 0) {
      gaps = gaps.filter((c) => focusSet.has(c.ac_code));
    }
    if (gaps.length === 0) {
      return new Response(
        JSON.stringify({
          ideas: [],
          note: 'no_gaps',
          message: 'Apprentice has no current AC gaps — nothing to suggest.',
        }),
        { status: 200, headers: { ...corsHeaders, 'content-type': 'application/json' } }
      );
    }

    // Sort gaps by status priority (not_started first), then by ac_code
    gaps.sort((a, b) => {
      if (a.status !== b.status) return a.status === 'not_started' ? -1 : 1;
      return a.ac_code.localeCompare(b.ac_code, 'en-GB', { numeric: true });
    });
    const topGaps = gaps.slice(0, MAX_GAPS_TO_SHOW_AI);

    // Pull AC text + LO context for the top gaps so the AI can write
    // grounded, qualification-specific job ideas.
    const acCodes = topGaps.map((g) => g.ac_code);
    const unitCodes = Array.from(new Set(topGaps.map((g) => g.unit_code)));
    const { data: reqRows } = await supabase
      .from('qualification_requirements')
      .select('ac_code, unit_code, unit_title, ac_text, lo_text')
      .eq('qualification_code', qualCode)
      .in('unit_code', unitCodes)
      .in('ac_code', acCodes);
    const acTexts = (reqRows ?? []) as AcText[];
    const acTextByCode = new Map<string, AcText>();
    for (const a of acTexts) acTextByCode.set(`${a.unit_code}:${a.ac_code}`, a);

    // Build a tight GAPS block for the prompt
    const gapsBlock = topGaps
      .map((g) => {
        const text = acTextByCode.get(`${g.unit_code}:${g.ac_code}`);
        const txt = text?.ac_text?.trim() ?? '(text unavailable)';
        return `- [${g.unit_code} · ${g.ac_code}] ${txt}${g.status === 'in_progress' ? ' (in progress)' : ''}`;
      })
      .join('\n');

    const userPrompt = `LEARNER: ${studentRow.name} on qualification ${qualCode}.

GAPS (the ACs to cover):
${gapsBlock}

Generate ${count} job ideas. Each idea must cover at least 2 ACs from the GAPS block. Optimise for efficiency — one good job that hits 3 ACs is more useful than 3 jobs that hit 1 AC each.`;

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
              name: 'submit_job_ideas',
              description: 'Persist the suggested job ideas for the apprentice.',
              parameters: SCHEMA,
              strict: false,
            },
          },
        ],
        tool_choice: { type: 'function', function: { name: 'submit_job_ideas' } },
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
    let parsed: { ideas: unknown[] };
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
        ideas: parsed.ideas ?? [],
        meta: {
          qualification_code: qualCode,
          gaps_total: gaps.length,
          gaps_considered: topGaps.length,
          generated_at: new Date().toISOString(),
        },
      }),
      { status: 200, headers: { ...corsHeaders, 'content-type': 'application/json' } }
    );
  } catch (e) {
    return new Response(
      JSON.stringify({ error: 'unhandled', detail: (e as Error).message }),
      { status: 500, headers: { ...corsHeaders, 'content-type': 'application/json' } }
    );
  }
});
