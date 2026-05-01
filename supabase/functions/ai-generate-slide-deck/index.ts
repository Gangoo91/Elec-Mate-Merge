// F1 / ELE-942 — AI slide-deck generator (the "Smartscreen killer").
//
// Generates a tutor-ready slide deck from a persisted college_lesson_plans
// row. Slides are returned as a structured JSON tree (kind-tagged
// discriminated union) so the front-end viewer can render each slide type
// with its own template (title / objectives / activity / reg cite /
// summary / plenary etc.).
//
// Pipeline:
//   1. Auth + ownership check (must be staff in same college as the plan)
//   2. Load plan content + ACs + facets (for cite material)
//   3. Build a deck-shaped tool schema and call OpenAI tool-calling
//   4. Persist slide_deck_json + slide_deck_generated_at
//   5. Return the saved deck

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, content-type, apikey',
};

const CHAT_MODEL = 'gpt-5.4-mini-2026-03-17';
const MAX_TOKENS = 12_000;
const FACET_CONTENT_CLIP = 320;

interface Body {
  lesson_plan_id: string;
}

interface PlanRow {
  id: string;
  college_id: string;
  title: string;
  duration_minutes: number | null;
  content: Record<string, unknown> | null;
}

interface AcRow {
  ac_code: string;
  ac_text: string | null;
}

interface FacetRow {
  reg_number: string | null;
  primary_topic: string | null;
  facet_summary: string | null;
  facet_content: string | null;
}

const SYSTEM_PROMPT = `You are SARAH WHITAKER — a UK FE electrical lecturer with 25 years' experience. British English only. C&G 2365/2357/2391, EAL L3 600/5, IQA-qualified.

You build the slide deck that drives a 1.5–3 hour classroom lesson. Tutors compare your decks to Smartscreen and choose yours every time because:
- The opener hooks (cold-call prompt or scenario), not just a title
- Objectives are written in learner voice ("By the end of this you'll...")
- Activities have explicit time + group size + what success looks like
- Regulation cites carry the clause snippet so the slide makes sense without lookup
- Worked examples show the working, not just the answer
- The plenary closes the loop with a check-for-understanding question, not "any questions?"

Hard rules:
1. Call the submit_slide_deck tool exactly once with the full deck.
2. Cite ONLY facets supplied in CONTEXT. Never invent regulation numbers.
3. 12–18 slides total. Tight. Each slide is one idea.
4. UK English. No emojis. No colour names. No font sizes. Plain text only — the front-end renders the layout.
5. Activity timings must add up roughly to the lesson duration.`;

const SLIDE_DECK_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['slides'],
  properties: {
    slides: {
      type: 'array',
      minItems: 8,
      maxItems: 20,
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['kind'],
        properties: {
          kind: {
            type: 'string',
            enum: [
              'title',
              'starter',
              'objectives',
              'concept',
              'reg_cite',
              'activity',
              'worked_example',
              'check_understanding',
              'misconception',
              'summary',
              'plenary',
            ],
          },
          // Common — most slides have these
          heading: { type: 'string' },
          eyebrow: { type: 'string' },
          body: { type: 'string' },
          // Title-specific
          subtitle: { type: 'string' },
          duration_label: { type: 'string' },
          // Bullets-style slides (objectives, summary, takeaways)
          bullets: {
            type: 'array',
            items: { type: 'string' },
          },
          // Concept slide — supports key terms callout
          key_terms: {
            type: 'array',
            items: {
              type: 'object',
              additionalProperties: false,
              required: ['term', 'definition'],
              properties: {
                term: { type: 'string' },
                definition: { type: 'string' },
              },
            },
          },
          // Reg cite slide
          reg_number: { type: 'string' },
          clause: { type: 'string' },
          why_it_matters: { type: 'string' },
          // Activity slide
          instruction: { type: 'string' },
          time_minutes: { type: 'integer', minimum: 1, maximum: 90 },
          group_size: {
            type: 'string',
            enum: ['individual', 'pairs', 'small_group', 'whole_class'],
          },
          success_criteria: { type: 'string' },
          // Worked example
          problem: { type: 'string' },
          solution_steps: {
            type: 'array',
            items: { type: 'string' },
          },
          // Check understanding
          questions: {
            type: 'array',
            items: { type: 'string' },
          },
          // Misconception
          belief: { type: 'string' },
          correction: { type: 'string' },
          // Plenary exit ticket
          exit_ticket: { type: 'string' },
          // Speaker notes — what the tutor says off-slide
          speaker_notes: { type: 'string' },
        },
      },
    },
  },
};

function sanitiseFacet(s: string | null): string {
  if (!s) return '';
  const trimmed = s.trim().slice(0, FACET_CONTENT_CLIP);
  return trimmed.replace(/\s+/g, ' ');
}

function buildContext(plan: PlanRow, acs: AcRow[], facets: FacetRow[]): string {
  const acsBlock = acs.length
    ? acs.map((a) => `- ${a.ac_code}: ${a.ac_text ?? ''}`.trim()).join('\n')
    : '(no AC mappings — generic deck)';
  const facetsBlock = facets.length
    ? facets
        .map((f) => {
          const head = f.reg_number
            ? `[${f.reg_number}]`
            : f.primary_topic
              ? `[${f.primary_topic}]`
              : '[topic]';
          const body = f.facet_summary ?? sanitiseFacet(f.facet_content);
          return `${head} ${body}`.trim();
        })
        .join('\n')
    : '(no facets)';

  // Pull a few hand-picked sections from plan content if available — these
  // give the model concrete material to work from rather than inventing.
  const c = plan.content ?? {};
  const fragments: string[] = [];
  const tutorBrief = (c as { tutor_brief_markdown?: unknown }).tutor_brief_markdown;
  if (typeof tutorBrief === 'string' && tutorBrief.length > 0) {
    fragments.push(`TUTOR BRIEF (markdown):\n${tutorBrief.slice(0, 2400)}`);
  }
  const objectives = (c as { learning_objectives?: unknown }).learning_objectives;
  if (Array.isArray(objectives) && objectives.length > 0) {
    fragments.push(`OBJECTIVES (raw):\n${JSON.stringify(objectives).slice(0, 1800)}`);
  }
  const activities = (c as { lesson_structure?: unknown }).lesson_structure;
  if (Array.isArray(activities) && activities.length > 0) {
    fragments.push(`STRUCTURE (raw):\n${JSON.stringify(activities).slice(0, 2400)}`);
  }

  return `LESSON: "${plan.title}" (${plan.duration_minutes ?? 90} min)

TARGET ASSESSMENT CRITERIA:
${acsBlock}

CONTEXT — cite ONLY these facets:
${facetsBlock}

${fragments.join('\n\n')}`;
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
    if (!body.lesson_plan_id) {
      return new Response(JSON.stringify({ error: 'lesson_plan_id_required' }), {
        status: 400,
        headers: { ...corsHeaders, 'content-type': 'application/json' },
      });
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // Auth — verify caller is staff in the same college as the plan.
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
    const { data: profile } = await supabase
      .from('profiles')
      .select('id, college_id, college_role')
      .eq('id', userRes.user.id)
      .maybeSingle();
    if (!profile?.college_id) {
      return new Response(JSON.stringify({ error: 'no_college' }), {
        status: 403,
        headers: { ...corsHeaders, 'content-type': 'application/json' },
      });
    }

    // Load plan + ownership check
    const { data: plan } = await supabase
      .from('college_lesson_plans')
      .select('id, college_id, title, duration_minutes, content')
      .eq('id', body.lesson_plan_id)
      .maybeSingle();
    if (!plan) {
      return new Response(JSON.stringify({ error: 'plan_not_found' }), {
        status: 404,
        headers: { ...corsHeaders, 'content-type': 'application/json' },
      });
    }
    const planRow = plan as PlanRow;
    if (planRow.college_id !== profile.college_id) {
      return new Response(JSON.stringify({ error: 'forbidden' }), {
        status: 403,
        headers: { ...corsHeaders, 'content-type': 'application/json' },
      });
    }

    // ACs (best-effort) — table is lesson_plan_ac_mapping; ac_text isn't
    // stored there, but the code itself is enough context for the model.
    // Regulations cite material lives inside the plan content (rag_preview)
    // — pulled out below.
    const { data: acsRaw } = await supabase
      .from('lesson_plan_ac_mapping')
      .select('ac_code')
      .eq('lesson_plan_id', planRow.id)
      .limit(20);
    const acs: AcRow[] = ((acsRaw ?? []) as Array<{ ac_code: string }>).map((r) => ({
      ac_code: r.ac_code,
      ac_text: null,
    }));
    const facets: FacetRow[] = [];
    const ragPreview = (planRow.content as { rag_preview?: unknown } | null)?.rag_preview;
    if (Array.isArray(ragPreview)) {
      for (const item of ragPreview.slice(0, 15)) {
        const r = item as Record<string, unknown>;
        facets.push({
          reg_number: typeof r.reg_number === 'string' ? r.reg_number : null,
          primary_topic: typeof r.primary_topic === 'string' ? r.primary_topic : null,
          facet_summary: typeof r.facet_summary === 'string' ? r.facet_summary : null,
          facet_content: typeof r.facet_content === 'string' ? r.facet_content : null,
        });
      }
    }

    const userPrompt = buildContext(planRow, acs, facets);

    const openaiResp = await fetch('https://api.openai.com/v1/chat/completions', {
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
              name: 'submit_slide_deck',
              description: 'Persist the generated slide deck for this lesson.',
              parameters: SLIDE_DECK_SCHEMA,
              strict: false,
            },
          },
        ],
        tool_choice: { type: 'function', function: { name: 'submit_slide_deck' } },
      }),
    });

    if (!openaiResp.ok) {
      const t = await openaiResp.text();
      return new Response(JSON.stringify({ error: 'openai_error', detail: t.slice(0, 600) }), {
        status: 502,
        headers: { ...corsHeaders, 'content-type': 'application/json' },
      });
    }

    const openaiJson = await openaiResp.json();
    const toolCall = openaiJson.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall?.function?.arguments) {
      return new Response(JSON.stringify({ error: 'no_tool_call' }), {
        status: 502,
        headers: { ...corsHeaders, 'content-type': 'application/json' },
      });
    }

    let parsed: { slides: unknown[] };
    try {
      parsed = JSON.parse(toolCall.function.arguments);
    } catch {
      return new Response(JSON.stringify({ error: 'invalid_json' }), {
        status: 502,
        headers: { ...corsHeaders, 'content-type': 'application/json' },
      });
    }

    if (!Array.isArray(parsed.slides) || parsed.slides.length === 0) {
      return new Response(JSON.stringify({ error: 'empty_slides' }), {
        status: 502,
        headers: { ...corsHeaders, 'content-type': 'application/json' },
      });
    }

    const generated_at = new Date().toISOString();
    const deck = { generated_at, slides: parsed.slides };

    const { error: saveErr } = await supabase
      .from('college_lesson_plans')
      .update({
        slide_deck_json: deck,
        slide_deck_generated_at: generated_at,
      })
      .eq('id', planRow.id);

    if (saveErr) {
      return new Response(JSON.stringify({ error: 'save_failed', detail: saveErr.message }), {
        status: 500,
        headers: { ...corsHeaders, 'content-type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ deck }), {
      status: 200,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: 'unhandled', detail: (e as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }
});
