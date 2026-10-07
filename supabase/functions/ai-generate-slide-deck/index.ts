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
//   2. Load plan content + ACs + the regulation extracts linked to the plan
//      (labelled by document: BS 7671, On-Site Guide, Guidance Note 3)
//   3. Build a deck-shaped tool schema and call OpenAI tool-calling
//   4. Clean every slide and enforce the citation rule (_shared/slide-deck-rules)
//   5. Persist slide_deck_json + slide_deck_generated_at and return the deck

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';
import { captureException } from '../_shared/sentry.ts';
import {
  ACCURACY_RULES,
  BREVITY_RULES,
  SLIDE_ITEM_SCHEMA,
  cleanSlideText,
  finaliseSlide,
  formatSources,
  loadSlideSources,
  topUpSlideSourcesFromRag,
  type SlideSource,
} from '../_shared/slide-deck-rules.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, x-request-id, x-supabase-api-version, x-supabase-timeout, apikey, content-type',
};

const CHAT_MODEL = 'gpt-5.4-mini-2026-03-17';
const MAX_TOKENS = 22_000;

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

const SYSTEM_PROMPT = `You are an experienced UK further-education electrical lecturer (C&G 2365 / 2357 / 5357, EAL). British English only. You build the slide deck a tutor projects in a classroom or workshop.

What makes the deck good:
- Slides are short and readable from the back of the room. The tutor's depth lives in speaker_notes.
- The layouts vary and suit the moment. Not every slide is a heading and bullets.
- It is accurate. Regulation slides come only from the SOURCES supplied, named by document and section.

SLIDE KINDS:
- "title": opening slide. 'subtitle' one line; 'duration_label' such as "90 minutes".
- "objectives": 3 to 5 bullets, each starting with a verb (Explain, Calculate, Identify).
- "starter": a short scenario hook in 'body' and 2 to 4 cold-call 'questions'.
- "concept" / "image_concept": one idea; short 'body' or bullets, optional key_terms. image_concept has a photo.
- "reg_cite": one requirement from SOURCES: 'source_document', 'reg_number', 'clause' (paraphrase), 'why_it_matters'.
- "pull_quote": the lesson's headline requirement, same fields as reg_cite.
- "big_stat": one figure that lands the point, only if the figure is in SOURCES or the lesson plan; 'stat_source' names the document.
- "two_column": a side-by-side comparison.
- "diagram_caption": 'diagram_kind' is one of ring_final, radial, lighting_final, distribution_board, voltage_drop_curve, equipotential_bonding, three_phase, RCD_discrimination. The app draws it; you write 'diagram_caption'.
- "activity": a timed task with steps, group size, minutes and success criteria.
- "worked_example": a problem and its steps.
- "check_understanding": questions at rising levels.
- "misconception": belief and correction.
- "summary": the takeaways.
- "plenary": the closing multiple-choice question with an exit ticket.

${BREVITY_RULES}

${ACCURACY_RULES}

IMAGE PROMPTS (60 to 100 words): a real UK installation or workshop scene. Subject close-up, the specific kit (for example a multifunction tester on an open consumer unit), lighting, composition. Hands only, no faces. NO text of any kind in the image: no writing, labels, equations, whiteboards or screens with characters.

DECK RULES:
1. Call submit_slide_deck exactly once with the full deck.
2. Hit the target slide count (within two).
3. Open with "title" then "objectives". Close with "summary" then "plenary".
4. Use at least 6 different kinds. Give 3 to 5 slides an image_prompt (image_concept, starter, concept or title).
5. Include at least one "activity" and one "check_understanding". Activity minutes add up to roughly the time the lesson plan gives its activities.
6. Put the assessment criteria each slide covers in 'slide_acs', using the codes given.
7. Tone register is supplied: academic (formal), practical (direct, on-site examples, default), gen_z (punchy and contemporary, still rigorous).`;

const SLIDE_DECK_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['slides'],
  properties: {
    slides: {
      type: 'array',
      minItems: 8,
      maxItems: 26,
      items: SLIDE_ITEM_SCHEMA,
    },
  },
};

function buildContext(
  plan: PlanRow,
  acs: AcRow[],
  sources: SlideSource[],
  slideCount: number,
  tone: string,
  depth: string,
  differentiation: string,
  resources: ResourceRow[]
): string {
  const acsBlock = acs.length
    ? acs.map((a) => `- ${a.ac_code}: ${a.ac_text ?? ''}`.trim()).join('\n')
    : '(no AC mappings — generic deck)';
  // Pull a few hand-picked sections from plan content if available — these
  // give the model concrete material to work from rather than inventing.
  const c = plan.content ?? {};
  const fragments: string[] = [];
  const tutorBrief = (c as { tutor_brief_markdown?: unknown }).tutor_brief_markdown;
  if (typeof tutorBrief === 'string' && tutorBrief.length > 0) {
    fragments.push(`TUTOR BRIEF (markdown):\n${cleanSlideText(tutorBrief.slice(0, 2400))}`);
  }
  // The plan generator's sections. Not passed: cited_facets (internal ids)
  // and a4_change_summary (built from an unreliable amendment flag).
  const SECTIONS: Array<[string, string, number]> = [
    ['learning_objectives', 'OBJECTIVES', 1800],
    ['prior_knowledge', 'PRIOR KNOWLEDGE', 800],
    ['activities', 'ACTIVITIES (with timings)', 3200],
    ['lesson_structure', 'STRUCTURE', 2400],
    ['worked_examples', 'WORKED EXAMPLES', 2000],
    ['misconceptions', 'MISCONCEPTIONS', 1200],
    ['vocabulary', 'VOCABULARY', 1000],
    ['cold_call_questions', 'COLD-CALL QUESTIONS', 900],
    ['assessment_for_learning', 'CHECKS FOR UNDERSTANDING', 1000],
    ['exit_ticket', 'EXIT TICKET', 600],
    ['health_safety', 'HEALTH AND SAFETY', 800],
  ];
  for (const [key, label, clip] of SECTIONS) {
    const v = (c as Record<string, unknown>)[key];
    if (v == null || (Array.isArray(v) && v.length === 0)) continue;
    const text = typeof v === 'string' ? v : JSON.stringify(v);
    fragments.push(`${label}:\n${cleanSlideText(text.slice(0, clip))}`);
  }

  const toneNote =
    tone === 'academic'
      ? 'Tone: ACADEMIC — formal, IET-paper voice, neutral register, full sentences.'
      : tone === 'gen_z'
        ? "Tone: GEN-Z — punchy, short sentences, contemporary references where natural, but technical rigour intact. Don't dumb the regulations down."
        : 'Tone: PRACTICAL. Direct and warm, with concrete examples from real installations.';
  const depthNote =
    depth === 'overview'
      ? 'Depth: OVERVIEW. Fewer, simpler ideas, suitable for an introduction or revision lesson.'
      : depth === 'deep_dive'
        ? 'Depth: DEEP DIVE. More slides of substance, richer speaker notes (on-slide limits still apply), and at least one stretch-and-challenge prompt in an activity.'
        : 'Depth: STANDARD.';

  const differentiationNote =
    differentiation === 'send_eal'
      ? `Differentiation: SEND / EAL — write in plain UK English. Keep sentences short (max 15 words). Define every technical term on first use in a 'key terms' line. No idioms, no metaphors, no cultural references that need British background knowledge. Every activity slide has numbered steps, and the deck includes a worked example. Speaker notes should include a comprehension check.`
      : differentiation === 'stretch'
        ? `Differentiation: STRETCH & CHALLENGE — add at least two stretch prompts per main concept. Push the regulation material deeper: use the SOURCES in full, including any On-Site Guide or Guidance Note 3 sections. Include a higher Bloom-level question (analyse / evaluate / create) on every check_understanding slide. Add an extension activity at the end that links the lesson to a real-world commissioning scenario.`
        : 'Differentiation: STANDARD. Mixed levels of challenge across the deck.';

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

TARGET SLIDE COUNT: ${slideCount}
${toneNote}
${depthNote}
${differentiationNote}

TARGET ASSESSMENT CRITERIA — populate slide_acs on each substantive slide with the AC code(s) it covers:
${acsBlock}

EXISTING COLLEGE RESOURCES tagged to these ACs. Name them by title in speaker_notes or on the matching activity slide so the tutor can hand them out:
${resourcesBlock}

SOURCES (the only regulation material you may cite; never mention these labels on a slide):
${formatSources(sources)}

LESSON PLAN MATERIAL (for the content and timings; it is not a regulation source):

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
      // "1.1" exists in every unit of every qualification: match on the unit
      // (and the qualification where the mapping names one), never the code
      // alone, or the deck can get another unit's wording.
      const units = [...new Set(acRowMaps.map((r) => r.unit_code).filter(Boolean))] as string[];
      let q = supabase
        .from('qualification_requirements')
        .select('qualification_code, unit_code, ac_code, ac_text')
        .in('ac_code', acCodes);
      if (units.length) q = q.in('unit_code', units);
      const { data: acTexts } = await q.limit(400);
      const rows = (acTexts ?? []) as Array<{
        qualification_code: string | null;
        unit_code: string | null;
        ac_code: string;
        ac_text?: string | null;
      }>;
      const textFor = (r: { ac_code: string; unit_code?: string | null; qualification_code?: string | null }) => {
        const sameUnit = rows.filter((t) => t.ac_code === r.ac_code && t.unit_code === r.unit_code && t.ac_text);
        const exact = sameUnit.find((t) => r.qualification_code && t.qualification_code === r.qualification_code);
        // Prefer the exact qualification; a mapping saved under the enrolment
        // code still finds its unit's wording. Ambiguous across qualifications
        // with different wording: give no text rather than a wrong one.
        if (exact) return exact.ac_text ?? null;
        const texts = [...new Set(sameUnit.map((t) => t.ac_text))];
        return texts.length === 1 ? (texts[0] ?? null) : null;
      };
      acs = acRowMaps.map((r) => ({ ac_code: r.ac_code, ac_text: textFor(r) }));
    }

    // Regulation extracts linked to this plan, labelled by document. These
    // are the only regulation material the deck may cite (see the shared
    // rules). A plan with none gets no regulation slides at all.
    const linked = await loadSlideSources(supabase, planRow.id);
    // Thin or missing links: search the regulation store with the lesson's own words.
    const planContent = (planRow.content ?? {}) as Record<string, unknown>;
    const objectives = Array.isArray(planContent.learning_objectives)
      ? (planContent.learning_objectives as Array<Record<string, unknown> | string>)
          .map((o) => (typeof o === 'string' ? o : String(o.text ?? o.objective ?? '')))
          .join('. ')
      : '';
    const sources = await topUpSlideSourcesFromRag(
      supabase,
      linked,
      `${planRow.title}. ${objectives}`,
      apiKey
    );

    const slideCount = Math.max(8, Math.min(24, body.slide_count ?? 14));
    const tone = body.tone ?? 'practical';
    const depth = body.depth ?? 'standard';
    const differentiation = body.differentiation ?? 'standard';

    // ELE-902 (B7) — pull college teaching resources tagged to any AC this
    // lesson covers so the model can recommend specific titles rather than
    // inventing generic materials. `acs` is derived from `acRowMaps` above
    // with the same ac_code values (the qualification_requirements lookup
    // only adds ac_text), so the codes to search on are exactly `acCodes` —
    // declared once at the AC-mapping step and reused here. Redeclaring it
    // was a SyntaxError that stopped the worker booting (503 on every call).
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
          .select(
            'id, college_id, title, description, resource_type, external_url, is_student_visible'
          )
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
      sources,
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
    const slides = (parsed.slides as Array<Record<string, unknown>>)
      .filter((x) => x && typeof x === 'object' && typeof x.kind === 'string')
      .map((x) => finaliseSlide(x, sources));
    if (!slides.length) {
      return new Response(JSON.stringify({ error: 'empty_slides' }), {
        status: 502,
        headers: { ...corsHeaders, 'content-type': 'application/json' },
      });
    }
    const deck = { generated_at, slides };

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
    await captureException(e, {
      functionName: 'ai-generate-slide-deck',
      requestUrl: req.url,
      requestMethod: req.method,
    });
    return new Response(JSON.stringify({ error: 'unhandled', detail: (e as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }
});
