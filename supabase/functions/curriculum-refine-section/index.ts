// ELE-844 slice 2 — refine a single section of a persisted lesson plan.
//
// Pipeline:
//   1. Auth check (staff, college_id on profile) + ownership of the plan
//   2. Load plan row from college_lesson_plans; parse content JSON
//   3. Load AC mappings so we can re-run / display context if needed
//   4. Load regulation refs JOIN bs7671_facets → RAG context for this plan
//   5. Build a refinement prompt tailored to the target section
//   6. Stream OpenAI:
//        - prose (tutor_brief_markdown): plain text stream
//        - structured: tool calling with a section-specific schema
//   7. On done: emit the updated value as { section_key, value }.
//      Client is responsible for accepting and persisting.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, content-type, apikey',
};

const CHAT_MODEL = 'gpt-5-mini-2025-08-07';
const MAX_TOKENS = 8_000;
const FACET_CONTENT_CLIP = 480;
const STREAM_TIMEOUT_MS = 180_000;

type SectionKey =
  | 'tutor_brief_markdown'
  | 'analogies'
  | 'misconceptions'
  | 'board_work'
  | 'worked_examples'
  | 'cold_call_questions'
  | 'exit_ticket'
  | 'vocabulary'
  | 'learning_objectives'
  | 'assessment_for_learning'
  | 'british_values'
  | 'stretch_challenge'
  | 'inclusive_practice'
  | 'next_lesson_hint';

interface RefineRequest {
  lesson_plan_id: string;
  section_key: SectionKey;
  instruction: string;
  preset?: string | null;
}

function sseEvent(event: string, data: unknown): Uint8Array {
  return new TextEncoder().encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
}

function sseComment(msg: string): Uint8Array {
  return new TextEncoder().encode(`: ${msg}\n\n`);
}

async function requireStaffUser(req: Request, sb: ReturnType<typeof createClient>) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader) return { user: null, profile: null, error: 'unauthorized' as const };
  const userClient = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_ANON_KEY')!,
    { global: { headers: { Authorization: authHeader } }, auth: { persistSession: false } }
  );
  const { data } = await userClient.auth.getUser();
  if (!data?.user) return { user: null, profile: null, error: 'unauthorized' as const };
  const { data: profile } = await sb
    .from('profiles')
    .select('id, college_id, college_role, full_name')
    .eq('id', data.user.id)
    .maybeSingle();
  if (!profile?.college_id) return { user: data.user, profile: null, error: 'no_college' as const };
  return { user: data.user, profile, error: null };
}

// ─────────────────── Section schemas (reused from the generator) ───────────────────
const BLOOM_ENUM = ['recall', 'understand', 'apply', 'analyse', 'evaluate', 'create'];

const SECTION_SCHEMAS: Record<Exclude<SectionKey, 'tutor_brief_markdown' | 'next_lesson_hint'>, unknown> = {
  analogies: {
    type: 'array',
    items: {
      type: 'object',
      additionalProperties: false,
      required: ['name', 'description', 'when_to_use'],
      properties: {
        name: { type: 'string' },
        description: { type: 'string' },
        when_to_use: { type: 'string' },
      },
    },
  },
  misconceptions: {
    type: 'array',
    items: {
      type: 'object',
      additionalProperties: false,
      required: ['belief', 'correction'],
      properties: {
        belief: { type: 'string' },
        correction: { type: 'string' },
      },
    },
  },
  board_work: {
    type: 'array',
    items: {
      type: 'object',
      additionalProperties: false,
      required: ['title', 'description', 'labels'],
      properties: {
        title: { type: 'string' },
        description: { type: 'string' },
        labels: { type: 'array', items: { type: 'string' } },
      },
    },
  },
  worked_examples: {
    type: 'array',
    items: {
      type: 'object',
      additionalProperties: false,
      required: ['scenario', 'working', 'answer'],
      properties: {
        scenario: { type: 'string' },
        working: { type: 'array', items: { type: 'string' } },
        answer: { type: 'string' },
      },
    },
  },
  cold_call_questions: {
    type: 'array',
    items: {
      type: 'object',
      additionalProperties: false,
      required: ['question', 'bloom_level', 'expected_answer'],
      properties: {
        question: { type: 'string' },
        bloom_level: { type: 'string', enum: BLOOM_ENUM },
        expected_answer: { type: 'string' },
      },
    },
  },
  exit_ticket: {
    type: 'array',
    items: {
      type: 'object',
      additionalProperties: false,
      required: ['question', 'answer'],
      properties: {
        question: { type: 'string' },
        answer: { type: 'string' },
      },
    },
  },
  vocabulary: {
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
  learning_objectives: {
    type: 'array',
    items: {
      type: 'object',
      additionalProperties: false,
      required: ['text', 'ac_codes'],
      properties: {
        text: { type: 'string' },
        ac_codes: { type: 'array', items: { type: 'string' } },
      },
    },
  },
  assessment_for_learning: { type: 'array', items: { type: 'string' } },
  british_values: {
    type: 'array',
    items: {
      type: 'object',
      additionalProperties: false,
      required: ['value', 'how_embedded', 'activity_ref'],
      properties: {
        value: {
          type: 'string',
          enum: [
            'democracy',
            'rule_of_law',
            'individual_liberty',
            'mutual_respect',
            'tolerance_of_faiths_beliefs',
          ],
        },
        how_embedded: { type: 'string' },
        activity_ref: { type: 'string' },
      },
    },
  },
  stretch_challenge: {
    type: 'array',
    items: {
      type: 'object',
      additionalProperties: false,
      required: ['title', 'task', 'target_learner', 'bloom_level'],
      properties: {
        title: { type: 'string' },
        task: { type: 'string' },
        target_learner: { type: 'string' },
        bloom_level: {
          type: 'string',
          enum: ['apply', 'analyse', 'evaluate', 'create'],
        },
      },
    },
  },
  inclusive_practice: {
    type: 'array',
    items: {
      type: 'object',
      additionalProperties: false,
      required: ['need', 'strategy', 'activity_ref'],
      properties: {
        need: {
          type: 'string',
          enum: [
            'send',
            'eal',
            'ehcp',
            'neurodivergent',
            'prior_attainment_low',
            'prior_attainment_high',
            'physical_access',
            'other',
          ],
        },
        strategy: { type: 'string' },
        activity_ref: { type: 'string' },
      },
    },
  },
};

const SECTION_LABELS: Record<SectionKey, string> = {
  tutor_brief_markdown: "the tutor's briefing (markdown prose)",
  analogies: 'the analogies list',
  misconceptions: 'the common misconceptions list',
  board_work: 'the board-work sketches',
  worked_examples: 'the worked examples',
  cold_call_questions: 'the cold-call question bank',
  exit_ticket: 'the exit ticket',
  vocabulary: 'the key vocabulary list',
  learning_objectives: 'the learning objectives',
  assessment_for_learning: 'the assessment-for-learning bullets',
  british_values: 'the British Values embedding (Ofsted/DfE)',
  stretch_challenge: 'the stretch & challenge tasks',
  inclusive_practice: 'the inclusive practice strategies',
  next_lesson_hint: 'the suggested next lesson',
};

// ─────────────────── Prompts ───────────────────
const PROSE_SYSTEM = `You are SARAH WHITAKER — an IQA-qualified UK Further Education electrical lecturer with 25 years' experience (C&G 2365/2357/2391, EAL L3 600/5, HND). British English only. You write in warm, craft-focused prose.

You are refining ONE section of a persisted lesson plan at the tutor's request. Preserve the overall structure and voice. Only change what the request demands. Keep pedagogical rigour. Do not invent regulation numbers — stay consistent with the CONTEXT block.

Return only the updated markdown for this section. No preamble. No sign-off. No JSON.

FORMATTING RULES:
- Separate every paragraph with a BLANK LINE.
- Use H2 headings (##) if the section is the tutor's briefing; otherwise no H1/H2.
- Keep paragraphs 2–5 sentences each.`;

const STRUCTURED_SYSTEM = `You are SARAH WHITAKER — an IQA-qualified UK Further Education electrical lecturer with 25 years' experience. British English only.

You are refining ONE section of a persisted lesson plan at the tutor's request. Preserve the intent of the lesson. Only change what the request demands.

Hard rules:
1. Call the submit_refinement tool with the updated section value.
2. Cite ONLY facets provided in CONTEXT; never invent a regulation number.
3. Keep each field tight — concrete and compact. No filler.
4. Preserve count expectations from the original unless the instruction explicitly asks for more/fewer items.`;

function buildUserPrompt(args: {
  section_key: SectionKey;
  instruction: string;
  preset?: string | null;
  plan_title: string;
  duration_mins: number;
  acsBlock: string;
  facetsBlock: string;
  currentValue: unknown;
}): string {
  const label = SECTION_LABELS[args.section_key];
  const presetBit = args.preset ? `\nPRESET: ${args.preset}` : '';
  const currentText =
    typeof args.currentValue === 'string'
      ? args.currentValue
      : JSON.stringify(args.currentValue, null, 2);
  return `LESSON: "${args.plan_title}" (${args.duration_mins} min)

TARGET ASSESSMENT CRITERIA:
${args.acsBlock}

CONTEXT — cite ONLY these facets:
${args.facetsBlock}

SECTION TO REFINE: ${label}

CURRENT VALUE:
${currentText}

REFINEMENT REQUEST:${presetBit}
${args.instruction}

${
  args.section_key === 'tutor_brief_markdown'
    ? 'Return the full updated markdown document for this section.'
    : 'Call submit_refinement with the full updated value for this section.'
}`;
}

// ─────────────────── Streaming runners ───────────────────
async function streamProse(args: {
  apiKey: string;
  userPrompt: string;
  signal: AbortSignal;
  onDelta: (delta: string) => void;
}): Promise<string> {
  const resp = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${args.apiKey}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      model: CHAT_MODEL,
      messages: [
        { role: 'system', content: PROSE_SYSTEM },
        { role: 'user', content: args.userPrompt },
      ],
      max_completion_tokens: MAX_TOKENS,
      stream: true,
    }),
    signal: args.signal,
  });
  if (!resp.ok || !resp.body) {
    const t = await resp.text();
    throw new Error(`Prose stream HTTP ${resp.status}: ${t.slice(0, 400)}`);
  }
  const reader = resp.body.getReader();
  const dec = new TextDecoder();
  let acc = '';
  let buf = '';
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buf += dec.decode(value, { stream: true });
    const frames = buf.split('\n\n');
    buf = frames.pop() ?? '';
    for (const frame of frames) {
      const line = frame.trim();
      if (!line.startsWith('data:')) continue;
      const data = line.slice(5).trim();
      if (data === '[DONE]') continue;
      try {
        const chunk = JSON.parse(data);
        const delta = chunk.choices?.[0]?.delta?.content;
        if (delta) {
          acc += delta;
          args.onDelta(delta);
        }
      } catch {
        // ignore
      }
    }
  }
  return acc;
}

async function streamStructured(args: {
  apiKey: string;
  userPrompt: string;
  section_key: SectionKey;
  signal: AbortSignal;
  onDelta: (delta: string) => void;
}): Promise<string> {
  const schemaKey = args.section_key as Exclude<
    SectionKey,
    'tutor_brief_markdown' | 'next_lesson_hint'
  >;
  const sectionSchema = SECTION_SCHEMAS[schemaKey];
  const tool = {
    type: 'function',
    function: {
      name: 'submit_refinement',
      description: 'Submit the updated section value.',
      parameters: {
        type: 'object',
        additionalProperties: false,
        required: [args.section_key],
        properties: { [args.section_key]: sectionSchema },
      },
    },
  };

  const resp = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${args.apiKey}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      model: CHAT_MODEL,
      messages: [
        { role: 'system', content: STRUCTURED_SYSTEM },
        { role: 'user', content: args.userPrompt },
      ],
      tools: [tool],
      tool_choice: { type: 'function', function: { name: 'submit_refinement' } },
      max_completion_tokens: MAX_TOKENS,
      stream: true,
    }),
    signal: args.signal,
  });
  if (!resp.ok || !resp.body) {
    const t = await resp.text();
    throw new Error(`Structured stream HTTP ${resp.status}: ${t.slice(0, 400)}`);
  }
  const reader = resp.body.getReader();
  const dec = new TextDecoder();
  let toolArgs = '';
  let buf = '';
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buf += dec.decode(value, { stream: true });
    const frames = buf.split('\n\n');
    buf = frames.pop() ?? '';
    for (const frame of frames) {
      const line = frame.trim();
      if (!line.startsWith('data:')) continue;
      const data = line.slice(5).trim();
      if (data === '[DONE]') continue;
      try {
        const chunk = JSON.parse(data);
        const delta = chunk.choices?.[0]?.delta;
        const toolDelta = delta?.tool_calls?.[0]?.function?.arguments;
        if (toolDelta) {
          toolArgs += toolDelta;
          args.onDelta(toolDelta);
        }
      } catch {
        // ignore
      }
    }
  }
  return toolArgs;
}

// ─────────────────── Handler ───────────────────
Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: corsHeaders });
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'method_not_allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
  const SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  const OPENAI_KEY = Deno.env.get('OPENAI_API_KEY');
  if (!SUPABASE_URL || !SERVICE_KEY || !OPENAI_KEY) {
    return new Response(JSON.stringify({ error: 'server_misconfigured' }), {
      status: 500,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  const sb = createClient(SUPABASE_URL, SERVICE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { profile, error: authErr } = await requireStaffUser(req, sb);
  if (authErr) {
    return new Response(JSON.stringify({ error: authErr }), {
      status: authErr === 'unauthorized' ? 401 : 403,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  let body: RefineRequest;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'invalid_json' }), {
      status: 400,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  const { lesson_plan_id, section_key, instruction, preset = null } = body;
  if (!lesson_plan_id || !section_key || !instruction?.trim()) {
    return new Response(JSON.stringify({ error: 'missing_params' }), {
      status: 400,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const emit = (event: string, data: unknown) => controller.enqueue(sseEvent(event, data));
      const keepalive = setInterval(() => controller.enqueue(sseComment('keepalive')), 10_000);
      const tAll = Date.now();

      try {
        emit('status', { phase: 'loading_plan' });

        // 1. Load plan (enforce same-college ownership)
        const { data: planRow, error: planErr } = await sb
          .from('college_lesson_plans')
          .select('id, title, duration_minutes, content, college_id')
          .eq('id', lesson_plan_id)
          .maybeSingle();
        if (planErr || !planRow) throw new Error('Plan not found');
        if (profile && planRow.college_id !== profile.college_id) {
          throw new Error('Not your college');
        }

        let plan: Record<string, unknown>;
        try {
          plan =
            typeof planRow.content === 'string'
              ? JSON.parse(planRow.content)
              : (planRow.content as Record<string, unknown>);
        } catch {
          throw new Error('Plan content is not valid JSON');
        }

        const currentValue = plan[section_key];

        // 2. ACs
        const { data: acMappings } = await sb
          .from('lesson_plan_ac_mapping')
          .select('qualification_code, unit_code, ac_code')
          .eq('lesson_plan_id', lesson_plan_id);

        let acsBlock = '(no ACs recorded)';
        if (acMappings && acMappings.length > 0) {
          const first = acMappings[0];
          const { data: acRows } = await sb
            .from('qualification_requirements')
            .select('ac_code, ac_text, lo_text')
            .eq('qualification_code', first.qualification_code)
            .eq('unit_code', first.unit_code)
            .in('ac_code', acMappings.map((m) => m.ac_code));
          acsBlock = (acRows ?? [])
            .map((a) => `  - AC ${a.ac_code} (LO: ${a.lo_text})\n    ${a.ac_text}`)
            .join('\n');
        }

        emit('status', { phase: 'loading_rag' });

        // 3. Regulation context — join refs with bs7671_facets
        const { data: refs } = await sb
          .from('lesson_regulation_refs')
          .select('facet_id, document_type, cited_how, is_a4_change')
          .eq('lesson_plan_id', lesson_plan_id);

        let facetsBlock = '(no regulation references recorded)';
        if (refs && refs.length > 0) {
          const { data: facets } = await sb
            .from('bs7671_facets')
            .select(
              'facet_id, reg_number, document_type, primary_topic, content, is_a4_change'
            )
            .in('facet_id', refs.map((r) => r.facet_id));
          if (facets && facets.length > 0) {
            facetsBlock = facets
              .map((f, i) => {
                const parts = [
                  `[#${i + 1}] facet_id=${f.facet_id}`,
                  `source=${(f.document_type as string).toUpperCase()}`,
                  f.reg_number ? `reg=${f.reg_number}` : null,
                  f.is_a4_change ? 'A4_CHANGE=true' : null,
                ]
                  .filter(Boolean)
                  .join(' | ');
                const topic = f.primary_topic ? `\n    (topic: ${f.primary_topic})` : '';
                const clip = (f.content as string).trim().slice(0, FACET_CONTENT_CLIP);
                return `${parts}${topic}\n    "${clip}"`;
              })
              .join('\n\n');
          }
        }

        emit('status', { phase: 'composing' });

        const userPrompt = buildUserPrompt({
          section_key,
          instruction,
          preset,
          plan_title: (planRow.title as string) ?? '',
          duration_mins: (planRow.duration_minutes as number) ?? 90,
          acsBlock,
          facetsBlock,
          currentValue,
        });

        const ctrl = new AbortController();
        const timer = setTimeout(() => ctrl.abort(), STREAM_TIMEOUT_MS);

        let updated: unknown = null;
        if (section_key === 'tutor_brief_markdown' || section_key === 'next_lesson_hint') {
          const text = await streamProse({
            apiKey: OPENAI_KEY,
            userPrompt,
            signal: ctrl.signal,
            onDelta: (delta) => emit('chunk', { delta }),
          });
          updated = text.trim();
        } else {
          const raw = await streamStructured({
            apiKey: OPENAI_KEY,
            userPrompt,
            section_key,
            signal: ctrl.signal,
            onDelta: (delta) => emit('chunk', { delta }),
          });
          try {
            const parsed = JSON.parse(raw);
            updated = parsed[section_key];
          } catch (e) {
            throw new Error(`Refinement JSON invalid: ${(e as Error).message}`);
          }
        }

        clearTimeout(timer);

        emit('done', {
          section_key,
          value: updated,
          total_ms: Date.now() - tAll,
        });
      } catch (e) {
        console.error('[refine] error', e);
        emit('error', { message: (e as Error).message ?? 'Unknown error' });
      } finally {
        clearInterval(keepalive);
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      ...corsHeaders,
      'content-type': 'text/event-stream; charset=utf-8',
      'cache-control': 'no-store, no-transform',
      'x-accel-buffering': 'no',
    },
  });
});
