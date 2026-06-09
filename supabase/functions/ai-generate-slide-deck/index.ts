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
import { captureException } from '../_shared/sentry.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, x-request-id, x-supabase-api-version, apikey, content-type',
};

const CHAT_MODEL = 'gpt-5.4-mini-2026-03-17';
const MAX_TOKENS = 22_000;
const FACET_CONTENT_CLIP = 480;

interface Body {
  lesson_plan_id: string;
  /** Override slide count target; defaults to 14 when absent. */
  slide_count?: number;
  /** Tone register — academic, practical, gen_z. Defaults to practical. */
  tone?: 'academic' | 'practical' | 'gen_z';
  /** Depth — overview (light), standard (default), deep_dive (rich). */
  depth?: 'overview' | 'standard' | 'deep_dive';
  /** Inclusion differentiation — adapts language + examples per learner cohort.
   *  ELE-919 (F6). 'standard' = no adjustment.
   *  'send_eal' = simpler sentences, plain UK English, glossary terms on first use,
   *    explicit instructions, more visuals, no idioms.
   *  'stretch' = stretch-and-challenge questions, deeper reg material, higher
   *    Bloom-level prompts, an extension activity. */
  differentiation?: 'standard' | 'send_eal' | 'stretch';
}

interface ResourceRow {
  id: string;
  title: string;
  description: string | null;
  resource_type: string | null;
  external_url: string | null;
  ac_codes: string[];
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

const SYSTEM_PROMPT = `You are SARAH WHITAKER — a UK FE electrical lecturer with 25 years' experience. British English only. C&G 2365/2357/2391, EAL L3 600/5, IQA-qualified. You write classroom-ready slide decks tutors actually use, not generic Smartscreen filler.

You build the slide deck that drives a 1.5–3 hour classroom lesson. Your decks beat Smartscreen because they are SUBSTANTIVE — every slide carries enough material that a tutor unfamiliar with the topic could deliver it cold.

DEPTH — non-negotiable per slide kind:
- "concept" / "image_concept": body is 2–4 sentences (60–140 words), plus 2–4 key terms with one-sentence definitions
- "reg_cite": the 'clause' field carries the actual regulation wording (50–120 words, paraphrased only if the original is verbose); 'why_it_matters' is 40–80 words explaining the real-world consequence with a concrete UK installation example
- "activity": 'instruction' is a complete task brief (60–140 words) — what learners do, the materials/tools they need, what to produce, what to hand in. 'success_criteria' names the observable behaviour: "all four learners can show working that arrives within ±5% of the published value"
- "worked_example": 5–8 'solution_steps' each carrying a brief reasoning clause, not just the calculation
- "misconception": 'belief' is 1–2 sentences in the learner's voice. 'correction' is 2–4 sentences with the regulatory or technical evidence and why the misconception is plausible
- "summary": 5–7 takeaway bullets, each a complete sentence (15–30 words), not single-word reminders
- "plenary": 'body' is 60–100 words framing the close; 'exit_ticket' is a precise question with the response format ("In one sentence, name the regulation reference that limits voltage drop on a final circuit")
- "speaker_notes": REQUIRED on every slide, 2–4 sentences (40–80 words). What the tutor SAYS off-slide, including a Q-and-A prompt and a confidence-check cue
- "check_understanding": 4–6 numbered questions at distinct Bloom levels — recall, apply, analyse — with at least one that requires citing a regulation number
- "starter": 'body' is the hook scenario (40–80 words, vivid), 'questions' are 3–5 cold-call prompts that escalate from recall to opinion

VARY THE LAYOUTS. A great deck does not have 18 identical heading-plus-bullets slides. Use the right kind for the moment:
- "title": opening slide
- "starter": cold-call prompt or scenario hook
- "pull_quote": the headline reg cite for the lesson, big and bold
- "big_stat": one number that makes the point land (e.g. "30 mA — the trip threshold of an RCD on a TT system supplying 230V outdoor sockets")
- "two_column": side-by-side comparison (TT vs TN-S, RCBO vs MCB+RCD, Megger insulation test on dead vs live)
- "image_concept": concept that benefits from a real photograph
- "diagram_caption": diagram/schematic is the focus
- "concept": text alone carries the idea
- "reg_cite": specific clause with reg number, clause text, why it matters
- "activity": tutor- or learner-led task with timing + group + success criteria
- "worked_example": numerical/stepwise problem with full working
- "check_understanding": numbered questions
- "misconception": belief vs correction, paired
- "summary": end-of-section recap
- "plenary": closer with exit ticket

IMAGE PROMPTS — your single biggest quality lever. Bad prompt: "an electrician testing a circuit". Good prompt:
"Close-up of a calloused hand pressing the test button on a yellow Megger MFT1741 multifunction tester resting on the open lid of a Hager consumer unit. RCBO labels visible but text unreadable. T+E cable terminations in the background slightly out of focus. Workshop, soft daylight from a high window, gentle shadow on the tester. Composition: tester occupies left third, generous negative space top-right. Mood: focused, mid-action, candid not posed."

Format every image_prompt this way: subject (close-up of …) + specific tool/brand + UK installation context + lighting note + composition note. 60–120 words each. Specify NO faces, NO text/logos legible.

DIAGRAM SLIDES — populate 'diagram_kind' with one of: ring_final, radial, lighting_final, distribution_board, voltage_drop_curve, equipotential_bonding, earthing_arrangement, three_phase, RCD_discrimination. The front-end renders these as SVG; you describe them, the renderer draws them.

PLENARY MUST BE A Q-OF-THE-DAY: the final slide's 'exit_ticket' is a SHORT MCQ-able question that could be re-published as a one-question quiz. Include 4 plausible options inline in 'body' as A/B/C/D.

Hard rules:
1. Call the submit_slide_deck tool exactly once with the full deck.
2. Cite ONLY facets supplied in CONTEXT. Never invent regulation numbers.
3. Target slide count is supplied (default 14). 12–24 acceptable range.
4. Use AT LEAST 5 different slide kinds across the deck. AT LEAST 4 slides should have an image_prompt.
5. EVERY slide must have a 'speaker_notes' field with 40–80 words.
6. UK English. No emojis. Plain text only — the front-end renders typography and layout.
7. Activity timings must add up roughly to the lesson duration.
8. Tone register is supplied — academic (formal, IET-paper voice), practical (Sarah-on-site, default), gen_z (punchy, contemporary references, still rigorous).`;

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
          // Big-stat layout — one number, large, with caption
          stat_value: { type: 'string' },
          stat_caption: { type: 'string' },
          stat_source: { type: 'string' },
          // Two-column comparison
          left_heading: { type: 'string' },
          left_body: { type: 'string' },
          left_bullets: { type: 'array', items: { type: 'string' } },
          right_heading: { type: 'string' },
          right_body: { type: 'string' },
          right_bullets: { type: 'array', items: { type: 'string' } },
          // Pull-quote layout — for hero reg cites or hero-quoted sentences
          quote: { type: 'string' },
          attribution: { type: 'string' },
          // Image-driven slides — front-end fans out generation per slide
          image_prompt: { type: 'string' },
          image_caption: { type: 'string' },
          // Diagram slides — kind dictates which SVG template to render
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
          // AC mapping — which assessment criteria this slide covers, so
          // the front-end can render an "Maps to" chip and the deck doubles
          // as Ofsted-ready coverage evidence.
          slide_acs: {
            type: 'array',
            items: { type: 'string' },
          },
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

function buildContext(
  plan: PlanRow,
  acs: AcRow[],
  facets: FacetRow[],
  slideCount: number,
  tone: string,
  depth: string,
  differentiation: string,
  resources: ResourceRow[]
): string {
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

  const toneNote =
    tone === 'academic'
      ? 'Tone: ACADEMIC — formal, IET-paper voice, neutral register, full sentences.'
      : tone === 'gen_z'
        ? "Tone: GEN-Z — punchy, short sentences, contemporary references where natural, but technical rigour intact. Don't dumb the regulations down."
        : 'Tone: PRACTICAL — Sarah-on-site voice, direct, warm, concrete examples from real installations.';
  const depthNote =
    depth === 'overview'
      ? 'Depth: OVERVIEW — keep total content lighter, suitable for an introduction or revision lesson.'
      : depth === 'deep_dive'
        ? 'Depth: DEEP DIVE — push every slide to the deeper end of the per-kind word counts. Add rich speaker notes. Include at least one stretch-and-challenge prompt in an activity slide.'
        : 'Depth: STANDARD — meet the per-kind word count guidance.';

  const differentiationNote =
    differentiation === 'send_eal'
      ? `Differentiation: SEND / EAL — write in plain UK English. Keep sentences short (max 15 words). Define every technical term on first use in a 'key terms' line. No idioms, no metaphors, no cultural references that need British background knowledge. Every activity slide must include explicit step-by-step instructions ("Step 1… Step 2…") and a worked example. Speaker notes should include a comprehension check.`
      : differentiation === 'stretch'
        ? `Differentiation: STRETCH & CHALLENGE — add at least two stretch prompts per main concept. Push the regulation material deeper: cite the specific reg + the linked GN3 / OSG guidance. Include a higher Bloom-level question (analyse / evaluate / create) on every check_understanding slide. Add an extension activity at the end that links the lesson to a real-world commissioning scenario.`
        : 'Differentiation: STANDARD — meet the per-kind word count guidance with mixed levels of challenge across the deck.';

  // Build a compact resource block — gives the model concrete materials to
  // suggest rather than inventing. Resources are MENTIONED in speaker_notes
  // or as a "suggested resource" line on the relevant slide.
  const resourcesBlock = resources.length
    ? resources
        .map((r) => {
          const acs = r.ac_codes.length ? ` (covers ${r.ac_codes.join(', ')})` : '';
          const kind = r.resource_type ? ` [${r.resource_type}]` : '';
          const desc = r.description ? ` — ${r.description.slice(0, 140)}` : '';
          return `- "${r.title}"${kind}${acs}${desc}`;
        })
        .join('\n')
    : '(no tagged resources)';

  return `LESSON: "${plan.title}" (${plan.duration_minutes ?? 90} min)

TARGET SLIDE COUNT: ${slideCount} (12–24 acceptable range)
${toneNote}
${depthNote}
${differentiationNote}

TARGET ASSESSMENT CRITERIA — populate slide_acs on each substantive slide with the AC code(s) it covers:
${acsBlock}

EXISTING COLLEGE RESOURCES tagged to these ACs — reference these by title in speaker_notes or on the matching activity slide so the tutor can hand them out:
${resourcesBlock}

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

    // ACs — pull text from qualification_requirements so the model has the
    // actual criterion wording, not just the code.
    const { data: acsRaw } = await supabase
      .from('lesson_plan_ac_mapping')
      .select('ac_code, qualification_code, unit_code')
      .eq('lesson_plan_id', planRow.id)
      .limit(20);
    const acRowMaps = (acsRaw ?? []) as Array<{
      ac_code: string;
      qualification_code?: string | null;
      unit_code?: string | null;
    }>;
    const acCodes = acRowMaps.map((r) => r.ac_code).filter(Boolean);

    let acs: AcRow[] = acRowMaps.map((r) => ({ ac_code: r.ac_code, ac_text: null }));
    if (acCodes.length > 0) {
      const { data: acTexts } = await supabase
        .from('qualification_requirements')
        .select('ac_code, ac_text')
        .in('ac_code', acCodes)
        .limit(50);
      const textByAc = new Map<string, string>();
      for (const t of (acTexts ?? []) as Array<{ ac_code: string; ac_text?: string | null }>) {
        if (t.ac_text) textByAc.set(t.ac_code, t.ac_text);
      }
      acs = acRowMaps.map((r) => ({
        ac_code: r.ac_code,
        ac_text: textByAc.get(r.ac_code) ?? null,
      }));
    }

    // BS 7671 facets — LIVE query against bs7671_facets via lesson_regulation_refs.
    // Replaces stale plan.content.rag_preview snapshot so we always cite the
    // current edition (A4:2026 etc.). Memory rule: BS 7671 content MUST come
    // from RAG, never invented. If a lesson has no regulation refs yet, we
    // fall back to nothing — model will not be given facets to paraphrase.
    let facets: FacetRow[] = [];
    const { data: refRows } = await supabase
      .from('lesson_regulation_refs')
      .select('facet_id, document_type')
      .eq('lesson_plan_id', planRow.id)
      .limit(30);
    const facetIds = (refRows ?? [])
      .map((r: { facet_id?: string | null }) => r.facet_id)
      .filter((id): id is string => !!id);
    if (facetIds.length > 0) {
      const { data: facetRows } = await supabase
        .from('bs7671_facets')
        .select('id, content, regulation_id, primary_topic')
        .in('id', facetIds)
        .limit(30);
      const regIds = (facetRows ?? [])
        .map((f: { regulation_id?: string | null }) => f.regulation_id)
        .filter((id): id is string => !!id);
      const regMap = new Map<string, { reg_number?: string }>();
      if (regIds.length > 0) {
        const { data: regs } = await supabase
          .from('bs7671_regulations')
          .select('id, reg_number')
          .in('id', regIds);
        for (const r of (regs ?? []) as Array<{ id: string; reg_number?: string }>) {
          regMap.set(r.id, { reg_number: r.reg_number });
        }
      }
      facets = (facetRows ?? []).map((f: any) => ({
        reg_number: regMap.get(f.regulation_id)?.reg_number ?? null,
        primary_topic: f.primary_topic ?? null,
        facet_summary: null,
        facet_content: f.content ?? null,
      }));
    }

    const slideCount = Math.max(8, Math.min(24, body.slide_count ?? 14));
    const tone = body.tone ?? 'practical';
    const depth = body.depth ?? 'standard';
    const differentiation = body.differentiation ?? 'standard';

    // ELE-902 (B7) — pull college teaching resources tagged to any AC this
    // lesson covers so the model can recommend specific titles rather than
    // inventing generic materials.
    const acCodes = acs.map((a) => a.ac_code).filter(Boolean);
    let resources: ResourceRow[] = [];
    if (acCodes.length > 0) {
      const { data: mapRows } = await supabase
        .from('resource_ac_mapping')
        .select('resource_id, ac_code')
        .in('ac_code', acCodes);
      const resourceIds = Array.from(
        new Set((mapRows ?? []).map((r: any) => r.resource_id as string).filter(Boolean))
      );
      if (resourceIds.length > 0) {
        const { data: resourceRows } = await supabase
          .from('teaching_resources')
          .select('id, college_id, title, description, resource_type, external_url, is_student_visible')
          .in('id', resourceIds)
          .eq('college_id', profile.college_id)
          .eq('is_student_visible', true)
          .limit(20);
        const byId = new Map<string, ResourceRow>();
        for (const r of (resourceRows ?? []) as any[]) {
          byId.set(r.id, {
            id: r.id,
            title: r.title,
            description: r.description ?? null,
            resource_type: r.resource_type ?? null,
            external_url: r.external_url ?? null,
            ac_codes: [],
          });
        }
        for (const m of (mapRows ?? []) as any[]) {
          const row = byId.get(m.resource_id);
          if (row && m.ac_code && !row.ac_codes.includes(m.ac_code)) {
            row.ac_codes.push(m.ac_code);
          }
        }
        resources = Array.from(byId.values()).slice(0, 12);
      }
    }

    const userPrompt = buildContext(
      planRow,
      acs,
      facets,
      slideCount,
      tone,
      depth,
      differentiation,
      resources
    );

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
    await captureException(e, { functionName: 'ai-generate-slide-deck', requestUrl: req.url, requestMethod: req.method });
    return new Response(JSON.stringify({ error: 'unhandled', detail: (e as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }
});
