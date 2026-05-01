// F1.3 / ELE-942 — regenerate a SINGLE slide in an existing deck.
// Tutor types a tweak prompt ("more practical, less academic" / "swap the
// reg cite for 411.3.2.1" / "make this image close-up of the consumer
// unit") and the AI produces a replacement slide of the same kind, slotted
// in at the original index. Keeps the rest of the deck untouched.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, x-request-id, x-supabase-api-version, apikey, content-type',
};

const CHAT_MODEL = 'gpt-5.4-mini-2026-03-17';
const MAX_TOKENS = 4_000;

interface Body {
  lesson_plan_id: string;
  slide_index: number;
  tweak_prompt: string;
}

interface DeckJson {
  generated_at: string;
  slides: Array<Record<string, unknown>>;
}

const SYSTEM_PROMPT = `You are SARAH WHITAKER — a UK FE electrical lecturer with 25 years' experience. British English only.

You are tweaking ONE slide in an existing slide deck at the tutor's request. Preserve the slide's KIND unless the tutor explicitly asks for a different layout. Apply the tweak with judgement — small request = small change.

Hard rules:
1. Call submit_slide once with the FULL replacement slide (all relevant fields, not just deltas).
2. Cite ONLY regulation numbers explicitly named in the original slide or the tweak prompt.
3. Match the depth/length conventions of the rest of the deck.
4. UK English. No emojis.
5. If the tweak asks for a new image, regenerate the image_prompt with the same specificity rules — close-up, real UK tools/brands, lighting note, composition note, no faces, 60–120 words.`;

const SLIDE_SCHEMA = {
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
        'pull_quote',
        'big_stat',
        'two_column',
        'image_concept',
        'diagram_caption',
        'activity',
        'worked_example',
        'check_understanding',
        'misconception',
        'summary',
        'plenary',
      ],
    },
    heading: { type: 'string' },
    eyebrow: { type: 'string' },
    body: { type: 'string' },
    subtitle: { type: 'string' },
    duration_label: { type: 'string' },
    bullets: { type: 'array', items: { type: 'string' } },
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
    reg_number: { type: 'string' },
    clause: { type: 'string' },
    why_it_matters: { type: 'string' },
    instruction: { type: 'string' },
    time_minutes: { type: 'integer', minimum: 1, maximum: 90 },
    group_size: {
      type: 'string',
      enum: ['individual', 'pairs', 'small_group', 'whole_class'],
    },
    success_criteria: { type: 'string' },
    problem: { type: 'string' },
    solution_steps: { type: 'array', items: { type: 'string' } },
    questions: { type: 'array', items: { type: 'string' } },
    belief: { type: 'string' },
    correction: { type: 'string' },
    exit_ticket: { type: 'string' },
    speaker_notes: { type: 'string' },
    stat_value: { type: 'string' },
    stat_caption: { type: 'string' },
    stat_source: { type: 'string' },
    left_heading: { type: 'string' },
    left_body: { type: 'string' },
    left_bullets: { type: 'array', items: { type: 'string' } },
    right_heading: { type: 'string' },
    right_body: { type: 'string' },
    right_bullets: { type: 'array', items: { type: 'string' } },
    quote: { type: 'string' },
    attribution: { type: 'string' },
    image_prompt: { type: 'string' },
    image_caption: { type: 'string' },
    diagram_kind: {
      type: 'string',
      enum: [
        'ring_final',
        'radial',
        'lighting_final',
        'distribution_board',
        'voltage_drop_curve',
        'equipotential_bonding',
        'earthing_arrangement',
        'three_phase',
        'RCD_discrimination',
      ],
    },
    diagram_caption: { type: 'string' },
    slide_acs: { type: 'array', items: { type: 'string' } },
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
    if (!body.lesson_plan_id || typeof body.slide_index !== 'number' || !body.tweak_prompt) {
      return new Response(JSON.stringify({ error: 'invalid_body' }), {
        status: 400,
        headers: { ...corsHeaders, 'content-type': 'application/json' },
      });
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

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
      .select('id, college_id')
      .eq('id', userRes.user.id)
      .maybeSingle();
    if (!profile?.college_id) {
      return new Response(JSON.stringify({ error: 'no_college' }), {
        status: 403,
        headers: { ...corsHeaders, 'content-type': 'application/json' },
      });
    }

    const { data: plan } = await supabase
      .from('college_lesson_plans')
      .select('id, college_id, title, duration_minutes, slide_deck_json')
      .eq('id', body.lesson_plan_id)
      .maybeSingle();
    if (!plan) {
      return new Response(JSON.stringify({ error: 'plan_not_found' }), {
        status: 404,
        headers: { ...corsHeaders, 'content-type': 'application/json' },
      });
    }
    const planRow = plan as {
      id: string;
      college_id: string;
      title: string;
      duration_minutes: number | null;
      slide_deck_json: DeckJson | null;
    };
    if (planRow.college_id !== profile.college_id) {
      return new Response(JSON.stringify({ error: 'forbidden' }), {
        status: 403,
        headers: { ...corsHeaders, 'content-type': 'application/json' },
      });
    }
    const deck = planRow.slide_deck_json;
    if (!deck?.slides?.[body.slide_index]) {
      return new Response(JSON.stringify({ error: 'slide_not_found' }), {
        status: 404,
        headers: { ...corsHeaders, 'content-type': 'application/json' },
      });
    }
    const original = deck.slides[body.slide_index];

    const userPrompt = `LESSON: "${planRow.title}" (${planRow.duration_minutes ?? 90} min)

ORIGINAL SLIDE (slide ${body.slide_index + 1} of ${deck.slides.length}):
${JSON.stringify(original, null, 2)}

TUTOR'S TWEAK REQUEST:
${body.tweak_prompt}

Return the FULL replacement slide via submit_slide.`;

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
              name: 'submit_slide',
              description: 'Persist the regenerated slide.',
              parameters: SLIDE_SCHEMA,
              strict: false,
            },
          },
        ],
        tool_choice: { type: 'function', function: { name: 'submit_slide' } },
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
    const toolCall = oaJson.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall?.function?.arguments) {
      return new Response(JSON.stringify({ error: 'no_tool_call' }), {
        status: 502,
        headers: { ...corsHeaders, 'content-type': 'application/json' },
      });
    }

    let regenerated: Record<string, unknown>;
    try {
      regenerated = JSON.parse(toolCall.function.arguments);
    } catch {
      return new Response(JSON.stringify({ error: 'invalid_json' }), {
        status: 502,
        headers: { ...corsHeaders, 'content-type': 'application/json' },
      });
    }

    // If the AI changed the image_prompt, drop the old image_url so the
    // front-end re-generates the photo. If it kept the same prompt and
    // already had an image, preserve the existing URL.
    const oldPrompt = (original.image_prompt as string | undefined) ?? null;
    const newPrompt = (regenerated.image_prompt as string | undefined) ?? null;
    if (newPrompt && newPrompt !== oldPrompt) {
      delete regenerated.image_url;
    } else if (oldPrompt && newPrompt === oldPrompt && original.image_url) {
      regenerated.image_url = original.image_url;
    }

    const slidesNext = deck.slides.map((s, i) => (i === body.slide_index ? regenerated : s));
    const nextDeck: DeckJson = { ...deck, slides: slidesNext };

    const { error: saveErr } = await supabase
      .from('college_lesson_plans')
      .update({ slide_deck_json: nextDeck })
      .eq('id', planRow.id);
    if (saveErr) {
      return new Response(JSON.stringify({ error: 'save_failed', detail: saveErr.message }), {
        status: 500,
        headers: { ...corsHeaders, 'content-type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ slide: regenerated, slide_index: body.slide_index }), {
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
