// CH-C / ELE-844 — AI-powered UK electrical lesson plan generator.
//
// Pipeline:
//   1. Auth check (staff, college_id on profile)
//   2. Fetch ACs from qualification_requirements
//   3. Embed the concatenated AC text via OpenAI text-embedding-3-large
//   4. Call match_bs7671_hybrid RPC (pgvector + tsvector + RRF) per doc_type
//   5. Dedupe + RRF-rank facets
//   6. Emit rag_preview with the actual regs that will ground generation
//   7. Run TWO OpenAI streaming calls in parallel:
//        (a) Tutor's briefing — free-form markdown prose
//        (b) Structured plan — tool calling with a JSON schema (guaranteed valid)
//      Both share the same RAG context so they stay coherent.
//   8. On completion: validate citations, persist lesson_plan + mappings + refs
//   9. Emit final `done` SSE event with lesson_plan_id + plan + facets

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, content-type, apikey',
};

const CHAT_MODEL = 'gpt-5-mini-2025-08-07';
const EMBED_MODEL = 'text-embedding-3-large';
const EMBED_DIMS = 3072;
const MAX_FACETS_PER_DOC = 8;
const MAX_FACETS_TOTAL = 18;
const BRIEF_MAX_TOKENS = 5_000;
const PLAN_MAX_TOKENS = 16_000;
const FACET_CONTENT_CLIP = 520;
const STREAM_TIMEOUT_MS = 360_000;

// ─────────────────── Types ───────────────────
interface GenerateRequest {
  cohort_id?: string | null;
  qualification_code: string;
  unit_code: string;
  ac_codes: string[];
  session_length_mins?: number;
  delivery_mode?: 'classroom' | 'workshop' | 'hybrid' | 'online';
  include_homework?: boolean;
  include_differentiation?: boolean;
  include_hs?: boolean;
  save_to_db?: boolean;
}

interface Facet {
  facet_id: string;
  regulation_id: string | null;
  reg_number: string | null;
  reg_title: string | null;
  reg_part: string | null;
  document_type: 'bs7671' | 'gn3' | 'osg';
  primary_topic: string | null;
  content: string;
  keywords: string[] | null;
  system_types: string[] | null;
  bs7671_zones: string[] | null;
  equipment_category: string | null;
  protection_method: string | null;
  disconnection_time_s: number | null;
  is_a4_change: boolean;
  rrf_score?: number;
}

// ─────────────────── SSE helpers ───────────────────
function sseEvent(event: string, data: unknown): Uint8Array {
  return new TextEncoder().encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
}

function sseComment(msg: string): Uint8Array {
  return new TextEncoder().encode(`: ${msg}\n\n`);
}

// ─────────────────── Auth ───────────────────
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

// ─────────────────── Embeddings ───────────────────
async function embed(text: string, apiKey: string): Promise<number[]> {
  const resp = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'content-type': 'application/json' },
    body: JSON.stringify({ model: EMBED_MODEL, input: text, dimensions: EMBED_DIMS }),
  });
  if (!resp.ok) throw new Error(`Embedding failed: ${resp.status} ${await resp.text()}`);
  const body = await resp.json();
  return body.data[0].embedding as number[];
}

function toHalfvecLiteral(vec: number[]): string {
  return '[' + vec.map((v) => v.toFixed(7)).join(',') + ']';
}

// Best-effort repair of a truncated JSON payload. Walks the string tracking
// string / depth state, strips any dangling open key/value mid-pair, then
// appends the closing chars needed to balance open strings, arrays and
// objects. Returns null if the input doesn't look like a JSON object start.
function repairTruncatedJson(raw: string): string | null {
  const s = raw.trim();
  if (!s.startsWith('{')) return null;

  const stack: Array<'{' | '['> = [];
  let inString = false;
  let esc = false;
  let lastCompleteEnd = -1; // index of last char that ended a clean object/array value

  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (inString) {
      if (esc) {
        esc = false;
      } else if (c === '\\') {
        esc = true;
      } else if (c === '"') {
        inString = false;
      }
      continue;
    }
    if (c === '"') {
      inString = true;
    } else if (c === '{' || c === '[') {
      stack.push(c);
    } else if (c === '}' || c === ']') {
      stack.pop();
      lastCompleteEnd = i;
    } else if (c === ',' && stack.length > 0) {
      lastCompleteEnd = i - 1;
    }
  }

  // If still inside a string, trim back to the last known-complete point.
  let workingEnd = s.length;
  if (inString && lastCompleteEnd > 0) {
    workingEnd = lastCompleteEnd + 1;
    // Rewind state by re-scanning up to workingEnd — simpler than trying to
    // close mid-string.
    stack.length = 0;
    inString = false;
    esc = false;
    for (let i = 0; i < workingEnd; i++) {
      const c = s[i];
      if (inString) {
        if (esc) esc = false;
        else if (c === '\\') esc = true;
        else if (c === '"') inString = false;
        continue;
      }
      if (c === '"') inString = true;
      else if (c === '{' || c === '[') stack.push(c);
      else if (c === '}' || c === ']') stack.pop();
    }
  }

  let out = s.slice(0, workingEnd);
  // Strip trailing comma if we're about to close a container
  out = out.replace(/,\s*$/, '');
  // If the last char is a colon or an opening key, we can't repair cleanly
  if (/[:\s]$/.test(out) && /["\d}]/.test(out.slice(-2, -1))) {
    // leave as-is
  }
  // Close open containers
  while (stack.length > 0) {
    const open = stack.pop();
    out += open === '{' ? '}' : ']';
  }
  return out;
}

// ─────────────────── Facet text helpers ───────────────────
function facetsContextBlock(facets: Facet[]): string {
  return facets
    .map((f, i) => {
      const parts = [
        `[#${i + 1}] facet_id=${f.facet_id}`,
        `source=${f.document_type.toUpperCase()}`,
        f.reg_number ? `reg=${f.reg_number}` : null,
        f.is_a4_change ? 'A4_CHANGE=true' : null,
      ]
        .filter(Boolean)
        .join(' | ');
      const metaBits = [
        f.primary_topic ? `topic: ${f.primary_topic}` : null,
        f.bs7671_zones?.length ? `zones: ${f.bs7671_zones.join(', ')}` : null,
        f.equipment_category ? `equipment: ${f.equipment_category}` : null,
        f.protection_method ? `protection: ${f.protection_method}` : null,
        f.disconnection_time_s != null ? `disconnection: ${f.disconnection_time_s}s` : null,
      ].filter(Boolean);
      const meta = metaBits.length ? `\n    (${metaBits.join('; ')})` : '';
      return `${parts}${meta}\n    "${f.content.trim().slice(0, FACET_CONTENT_CLIP)}"`;
    })
    .join('\n\n');
}

function acsBlock(acs: { ac_code: string; ac_text: string; lo_text: string }[]): string {
  return acs.map((a) => `  - AC ${a.ac_code} (LO: ${a.lo_text})\n    ${a.ac_text}`).join('\n');
}

// ─────────────────── Prompts ───────────────────
const BRIEF_SYSTEM_PROMPT = `You are SARAH WHITAKER — an IQA-qualified UK Further Education electrical lecturer with 25 years' experience teaching City & Guilds 2365 / 2357 / 2391, EAL L3 600/5 and HND Electrical & Electronic Engineering. You are a qualified NVQ assessor (D32/33, A1, V1), hold AM2/AM2S observer status, and are fluent in BS 7671:2018+A4:2026, Guidance Note 3 and the On-Site Guide. You are known for memorable analogies, crystal-clear board-work, patient scaffolding and pedagogical rigour.

You write in British English ("colour", "analyse", "centre", "organise", "practise" verb / "practice" noun, "behaviour", "programme").

The user will ask you to brief a colleague on how to teach a specific lesson. Produce a single markdown document (800–1400 words) — warm, colleague-to-colleague, craft-focused. No jobsite war-stories, no autobiography, no bullet-spam. Flowing prose with clear headings.

CRITICAL FORMATTING RULES — read carefully:
- Separate every paragraph with a BLANK LINE (markdown \\n\\n, not \\n). Never run two paragraphs together.
- Keep paragraphs tight — 2 to 5 sentences each. Break a long paragraph into two rather than letting it sprawl.
- Use H2 headings (##) for the section titles specified below. Leave a blank line before and after every heading.
- Do not use H1. Do not use bold for entire sentences. Keep **bold** for short emphasis only (2–4 words).
- When listing items under a heading, use a short lead sentence followed by either a proper markdown bulleted list (- item, one per line) OR 2–3 numbered prose paragraphs — whichever fits the content. Mix well: prose for reasoning, bullets for enumerable items.

Structure your briefing with these H2 headings, in this order:

## What we're teaching and why it matters
2–3 paragraphs of subject-knowledge context — the physics/regulation behind it, the real-world reason it's in the syllabus, what a competent electrician ought to be able to do after this lesson.

## How I'd approach it
2–3 paragraphs of pedagogical strategy — opening hook, pacing, where apprentices typically struggle, how you'd build confidence before difficulty. Mention specific teaching moves (think-pair-share, worked example pair, cold-call sequence, etc.) where they'd land.

## Analogies to reach for
2–3 named analogies, each with specific guidance on when it lands and when it stops working.

## Common misconceptions
3–5 concrete misconceptions apprentices hold, each with a sentence on how to correct it on the spot.

## Board-work I'd sketch
Describe the diagrams or circuits you'd draw on the board, in the order you'd draw them. Name the labels. So a colleague could reproduce your board exactly.

## Worked example
One fully worked calculation or scenario relevant to the ACs — problem statement, stepped working, final answer. If non-numerical, use a fault-finding or design-choice scenario.

## What success looks like
One short paragraph describing what a strong piece of work at the end of the lesson should contain — the mental model apprentices should leave with.

Return only the markdown. No preamble. No sign-off. No JSON.`;

function buildBriefUserPrompt(args: {
  qualification_title: string;
  qualification_code: string;
  unit_code: string;
  unit_title: string;
  acs: { ac_code: string; ac_text: string; lo_text: string }[];
  facets: Facet[];
  session_length_mins: number;
  delivery_mode: string;
}): string {
  return `QUALIFICATION: ${args.qualification_title} (${args.qualification_code})
UNIT ${args.unit_code}: ${args.unit_title}

TARGET ASSESSMENT CRITERIA the lesson must cover:
${acsBlock(args.acs)}

SESSION PARAMETERS:
- Length: ${args.session_length_mins} minutes
- Delivery: ${args.delivery_mode}

REGULATORY CONTEXT — base your subject-knowledge claims on these facets. You do NOT need to cite reg numbers in the briefing prose (the structured plan will do that), but your technical content must be consistent with them:
${facetsContextBlock(args.facets)}

Now write the tutor's briefing.`;
}

const PLAN_SYSTEM_PROMPT = `You are SARAH WHITAKER — an IQA-qualified UK Further Education electrical lecturer with 25 years' experience. You are producing the structured lesson plan that accompanies a tutor's briefing. British English only ("colour", "analyse", "centre", "organise", "behaviour", "programme").

Hard rules:
1. Call the submit_lesson_plan tool. Populate every required field.
2. Cite ONLY facets provided in the CONTEXT block. Never invent a regulation number.
3. activities[].time_mins MUST sum exactly to duration_mins.
4. Every activity includes teacher_moves[] — specific sentences or actions the tutor says/does, minute-by-minute.
5. Flag A4:2026 changes (AFDD, TN-C-S/PNB, Schedule of Tests, model forms) wherever relevant.
6. Respect the document hierarchy: BS 7671 is authoritative; GN3 and OSG are supporting.

Ofsted / DfE expectations — include these whenever the flags in the user prompt say so:
- British Values: the five fundamental British values are Democracy, The rule of law, Individual liberty, Mutual respect, Tolerance of those of different faiths and beliefs. Embed them naturally in the lesson — at least two should appear, each tied to a specific activity and shown in practice (e.g. "Rule of law → pair discussion of BS 7671 as the legal framework electricians work within; apprentices justify a decision using the regulation"). Never tick-box.
- Stretch & challenge: explicit extension tasks aimed at the higher-attaining learners. Target the top Bloom levels (analyse / evaluate / create). Each task names who it's for and what success looks like.
- Inclusive practice: concrete, specific moves (not platitudes). Call out at least one strategy per common need profile — SEND, EAL, EHCP, neurodivergence, prior-attainment spread. Reference the activity and say what the tutor actually does.

Size & density rules — be concrete but COMPACT (your JSON must fit the token budget):
- learning_objectives: 3–5 items.
- analogies: 2–3 items, each 1–2 sentences per field.
- misconceptions: 3–4 items, one sentence each.
- board_work: 2–3 items.
- worked_examples: 1 item. working[] is 3–6 steps max, one short sentence per step.
- cold_call_questions: 6 items. expected_answer ≤ 1 sentence.
- exit_ticket: exactly 3 items.
- vocabulary: 8–10 items. definition ≤ 15 words each.
- activities: 4–6 items. teacher_moves 3–4 bullets each. description 2–3 sentences.
- assessment_for_learning: 3–5 bullets.
- british_values: 2–3 items when requested. Each ties to a specific activity.
- stretch_challenge: 2–4 items when requested. Concrete extension tasks with Bloom level.
- inclusive_practice: 3–5 items when requested. One per need profile.
- cited_facets: every facet used; citation_note ≤ 1 sentence.
- Keep every string tight — avoid filler. Prefer plain-English verbs over bureaucratic adjectives.`;

function buildPlanUserPrompt(args: {
  qualification_title: string;
  qualification_code: string;
  unit_code: string;
  unit_title: string;
  acs: { ac_code: string; ac_text: string; lo_text: string }[];
  facets: Facet[];
  session_length_mins: number;
  delivery_mode: string;
  include_homework: boolean;
  include_differentiation: boolean;
  include_hs: boolean;
  include_british_values: boolean;
  include_stretch_challenge: boolean;
  include_inclusive_practice: boolean;
  college_context?: string;
}): string {
  return `QUALIFICATION: ${args.qualification_title} (${args.qualification_code})
UNIT ${args.unit_code}: ${args.unit_title}

TARGET ASSESSMENT CRITERIA the lesson must cover:
${acsBlock(args.acs)}

CONTEXT — cite ONLY these facets using their facet_id:
${facetsContextBlock(args.facets)}
${args.college_context ? `\nCOLLEGE CONTEXT:\n${args.college_context}\n` : ''}
PARAMETERS:
- Session length: ${args.session_length_mins} minutes (activities time_mins MUST sum to this)
- Delivery mode: ${args.delivery_mode}
- Include homework: ${args.include_homework}
- Include differentiation: ${args.include_differentiation}
- Include health & safety: ${args.include_hs}
- Include British Values (Ofsted/DfE): ${args.include_british_values}
- Include Stretch & Challenge: ${args.include_stretch_challenge}
- Include Inclusive Practice: ${args.include_inclusive_practice}

Call submit_lesson_plan now.`;
}

// ─────────────────── Plan JSON schema for tool calling ───────────────────
const PLAN_TOOL_SCHEMA = {
  type: 'function',
  function: {
    name: 'submit_lesson_plan',
    description: 'Submit the structured lesson plan for persistence.',
    parameters: {
      type: 'object',
      additionalProperties: false,
      required: [
        'title',
        'duration_mins',
        'audience_note',
        'prior_knowledge',
        'learning_objectives',
        'analogies',
        'misconceptions',
        'board_work',
        'worked_examples',
        'cold_call_questions',
        'exit_ticket',
        'vocabulary',
        'activities',
        'assessment_for_learning',
        'cited_facets',
        'a4_change_summary',
        'next_lesson_hint',
      ],
      properties: {
        title: { type: 'string' },
        duration_mins: { type: 'number' },
        audience_note: { type: 'string' },
        prior_knowledge: { type: 'array', items: { type: 'string' } },
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
              bloom_level: {
                type: 'string',
                enum: ['recall', 'understand', 'apply', 'analyse', 'evaluate', 'create'],
              },
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
        activities: {
          type: 'array',
          items: {
            type: 'object',
            additionalProperties: false,
            required: [
              'time_mins',
              'phase',
              'title',
              'description',
              'teacher_moves',
              'student_focus',
              'check_for_understanding',
              'resources_needed',
              'cited_facet_ids',
            ],
            properties: {
              time_mins: { type: 'number' },
              phase: {
                type: 'string',
                enum: [
                  'starter',
                  'input',
                  'modelling',
                  'practice',
                  'practical',
                  'plenary',
                  'afl',
                ],
              },
              title: { type: 'string' },
              description: { type: 'string' },
              teacher_moves: { type: 'array', items: { type: 'string' } },
              student_focus: { type: 'string' },
              check_for_understanding: { type: 'string' },
              resources_needed: { type: 'array', items: { type: 'string' } },
              cited_facet_ids: { type: 'array', items: { type: 'string' } },
            },
          },
        },
        assessment_for_learning: { type: 'array', items: { type: 'string' } },
        differentiation: {
          type: 'object',
          additionalProperties: false,
          required: ['stretch', 'support'],
          properties: {
            stretch: { type: 'array', items: { type: 'string' } },
            support: { type: 'array', items: { type: 'string' } },
            send: { type: 'array', items: { type: 'string' } },
            eal: { type: 'array', items: { type: 'string' } },
          },
        },
        health_safety: {
          type: 'array',
          items: {
            type: 'object',
            additionalProperties: false,
            required: ['risk', 'control', 'reg_ref'],
            properties: {
              risk: { type: 'string' },
              control: { type: 'string' },
              reg_ref: { type: 'string' },
            },
          },
        },
        homework: {
          type: 'object',
          additionalProperties: false,
          required: ['description', 'estimated_mins'],
          properties: {
            description: { type: 'string' },
            estimated_mins: { type: 'number' },
          },
        },
        cited_facets: {
          type: 'array',
          items: {
            type: 'object',
            additionalProperties: false,
            required: ['facet_id', 'citation_note', 'is_a4_change'],
            properties: {
              facet_id: { type: 'string' },
              citation_note: { type: 'string' },
              is_a4_change: { type: 'boolean' },
            },
          },
        },
        a4_change_summary: { type: ['string', 'null'] },
        next_lesson_hint: { type: 'string' },
      },
    },
  },
};

// ─────────────────── Streaming runners ───────────────────
interface StreamHandlers {
  onBriefDelta?: (delta: string) => void;
  onBriefDone?: () => void;
  onPlanDelta?: (delta: string) => void;
  onPlanDone?: (fullArgs: string) => void;
  onError?: (msg: string) => void;
}

async function streamBrief(args: {
  apiKey: string;
  signal: AbortSignal;
  userPrompt: string;
  onDelta: (delta: string) => void;
}): Promise<string> {
  const resp = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${args.apiKey}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: CHAT_MODEL,
      messages: [
        { role: 'system', content: BRIEF_SYSTEM_PROMPT },
        { role: 'user', content: args.userPrompt },
      ],
      max_completion_tokens: BRIEF_MAX_TOKENS,
      stream: true,
    }),
    signal: args.signal,
  });

  if (!resp.ok || !resp.body) {
    const txt = await resp.text();
    throw new Error(`Brief stream HTTP ${resp.status}: ${txt.slice(0, 400)}`);
  }

  const reader = resp.body.getReader();
  const decoder = new TextDecoder();
  let accumulated = '';
  let buf = '';

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buf += decoder.decode(value, { stream: true });
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
          accumulated += delta;
          args.onDelta(delta);
        }
      } catch {
        // ignore
      }
    }
  }

  return accumulated;
}

async function streamPlan(args: {
  apiKey: string;
  signal: AbortSignal;
  userPrompt: string;
  onDelta: (delta: string) => void;
}): Promise<string> {
  const resp = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${args.apiKey}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: CHAT_MODEL,
      messages: [
        { role: 'system', content: PLAN_SYSTEM_PROMPT },
        { role: 'user', content: args.userPrompt },
      ],
      tools: [PLAN_TOOL_SCHEMA],
      tool_choice: { type: 'function', function: { name: 'submit_lesson_plan' } },
      max_completion_tokens: PLAN_MAX_TOKENS,
      stream: true,
    }),
    signal: args.signal,
  });

  if (!resp.ok || !resp.body) {
    const txt = await resp.text();
    throw new Error(`Plan stream HTTP ${resp.status}: ${txt.slice(0, 400)}`);
  }

  const reader = resp.body.getReader();
  const decoder = new TextDecoder();
  let toolArgs = '';
  let buf = '';

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buf += decoder.decode(value, { stream: true });
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

// ─────────────────── Main handler ───────────────────
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

  let body: GenerateRequest;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'invalid_json' }), {
      status: 400,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  const {
    qualification_code,
    unit_code,
    ac_codes,
    cohort_id = null,
    session_length_mins = 90,
    delivery_mode = 'classroom',
    include_homework = true,
    include_differentiation = true,
    include_hs = true,
    save_to_db = true,
  } = body;

  if (!qualification_code || !unit_code || !Array.isArray(ac_codes) || ac_codes.length === 0) {
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
        emit('status', { phase: 'fetching_curriculum' });

        const { data: qualRow } = await sb
          .from('qualifications')
          .select('title')
          .eq('code', qualification_code)
          .maybeSingle();
        if (!qualRow) throw new Error('Qualification not found');

        const { data: acRows } = await sb
          .from('qualification_requirements')
          .select('ac_code, ac_text, lo_text, unit_title')
          .eq('qualification_code', qualification_code)
          .eq('unit_code', unit_code)
          .in('ac_code', ac_codes);
        if (!acRows || acRows.length === 0) throw new Error('ACs not found');

        const unit_title = (acRows[0].unit_title as string) ?? '';
        const acs = acRows.map((r) => ({
          ac_code: r.ac_code as string,
          ac_text: r.ac_text as string,
          lo_text: r.lo_text as string,
        }));

        emit('status', { phase: 'embedding_query' });
        const queryText = acs
          .map((a) => `${a.lo_text}. ${a.ac_text}`)
          .join(' ')
          .slice(0, 6000);
        const queryVec = await embed(queryText, OPENAI_KEY);
        const vecLiteral = toHalfvecLiteral(queryVec);

        emit('status', { phase: 'searching_rag' });
        const facetMap = new Map<string, Facet>();
        for (const doc of ['bs7671', 'gn3', 'osg'] as const) {
          const { data: matches, error: rpcErr } = await sb.rpc('match_bs7671_hybrid', {
            q_text: queryText,
            q_embedding: vecLiteral,
            doc_type: doc,
            max_results: MAX_FACETS_PER_DOC,
          });
          if (rpcErr) {
            console.error('[hybrid-rpc]', doc, rpcErr);
            continue;
          }
          for (const m of (matches ?? []) as Facet[]) {
            const existing = facetMap.get(m.facet_id);
            if (!existing || (m.rrf_score ?? 0) > (existing.rrf_score ?? 0)) {
              facetMap.set(m.facet_id, m);
            }
          }
        }

        const facets = Array.from(facetMap.values())
          .sort((a, b) => (b.rrf_score ?? 0) - (a.rrf_score ?? 0))
          .slice(0, MAX_FACETS_TOTAL);

        if (facets.length === 0) {
          throw new Error('No BS 7671 / GN3 / OSG context matched these criteria.');
        }

        // Expose the RAG grounding so the UI can show it before drafting starts
        emit('rag_preview', {
          facets: facets.map((f) => ({
            facet_id: f.facet_id,
            document_type: f.document_type,
            reg_number: f.reg_number,
            primary_topic: f.primary_topic,
            is_a4_change: f.is_a4_change,
          })),
          bs7671: facets.filter((f) => f.document_type === 'bs7671').length,
          gn3: facets.filter((f) => f.document_type === 'gn3').length,
          osg: facets.filter((f) => f.document_type === 'osg').length,
          a4_changes: facets.filter((f) => f.is_a4_change).length,
        });

        emit('status', {
          phase: 'composing',
          facets_used: facets.length,
          bs7671: facets.filter((f) => f.document_type === 'bs7671').length,
          gn3: facets.filter((f) => f.document_type === 'gn3').length,
          osg: facets.filter((f) => f.document_type === 'osg').length,
        });

        const ctrl = new AbortController();
        const timer = setTimeout(() => ctrl.abort(), STREAM_TIMEOUT_MS);

        // Per-college curriculum settings shape what the AI must include
        // (British Values, Stretch & Challenge, Inclusive Practice + college
        // context like DSL / Prevent lead names for safeguarding wording).
        const { data: settingsRow } = await sb
          .from('college_curriculum_settings')
          .select(
            'include_british_values, include_stretch_challenge, include_inclusive_practice, prevent_lead_name, dsl_name, safeguarding_notes, additional_frameworks'
          )
          .eq('college_id', profile!.college_id)
          .maybeSingle();
        const include_british_values = settingsRow?.include_british_values ?? true;
        const include_stretch_challenge =
          settingsRow?.include_stretch_challenge ?? true;
        const include_inclusive_practice =
          settingsRow?.include_inclusive_practice ?? true;
        const collegeContextLines = [
          settingsRow?.prevent_lead_name
            ? `Prevent lead: ${settingsRow.prevent_lead_name}`
            : null,
          settingsRow?.dsl_name
            ? `Designated safeguarding lead: ${settingsRow.dsl_name}`
            : null,
          settingsRow?.safeguarding_notes
            ? `Safeguarding notes: ${settingsRow.safeguarding_notes}`
            : null,
          settingsRow?.additional_frameworks
            ? `Additional frameworks to reference: ${settingsRow.additional_frameworks}`
            : null,
        ].filter(Boolean);

        // ─────────────── Cohort-aware context (the big lift) ───────────────
        // When the lesson is tied to a cohort, read each learner's inclusion
        // data + ILP support needs so the AI can produce NAMED inclusive
        // strategies (first-name only — never surname / ULN).
        let cohortContext = '';
        if (cohort_id) {
          const { data: cohortRow } = await sb
            .from('college_cohorts')
            .select('id, name, start_date, end_date')
            .eq('id', cohort_id)
            .maybeSingle();

          const { data: students } = await sb
            .from('college_students')
            .select(
              'id, name, send_flags, eal, ehcp_ref, first_language, pronouns, accessibility_notes, progress_percent'
            )
            .eq('cohort_id', cohort_id)
            .neq('status', 'withdrawn')
            .neq('status', 'completed');

          const studentIds = (students ?? []).map((s) => s.id as string);

          // Pull ILP support_needs for this cohort
          const { data: ilps } =
            studentIds.length > 0
              ? await sb
                  .from('college_ilps')
                  .select('student_id, support_needs, targets')
                  .in('student_id', studentIds)
              : { data: [] };
          const ilpByStudent = new Map<string, { support_needs: string | null }>();
          for (const ilp of (ilps ?? []) as {
            student_id: string;
            support_needs: string | null;
          }[]) {
            if (!ilpByStudent.has(ilp.student_id)) {
              ilpByStudent.set(ilp.student_id, { support_needs: ilp.support_needs });
            }
          }

          // Recent grade distribution — prior attainment signal
          const { data: grades } =
            studentIds.length > 0
              ? await sb
                  .from('college_grades')
                  .select('student_id, score, grade, assessed_at')
                  .in('student_id', studentIds)
                  .not('score', 'is', null)
                  .order('assessed_at', { ascending: false })
              : { data: [] };
          const latestGradeByStudent = new Map<string, number>();
          for (const g of (grades ?? []) as { student_id: string; score: number }[]) {
            if (!latestGradeByStudent.has(g.student_id)) {
              latestGradeByStudent.set(g.student_id, Number(g.score));
            }
          }

          const count = (students ?? []).length;
          const withSend = (students ?? []).filter(
            (s) => Array.isArray(s.send_flags) && (s.send_flags as string[]).length > 0
          );
          const withEal = (students ?? []).filter((s) => s.eal);
          const withEhcp = (students ?? []).filter((s) => s.ehcp_ref);
          const withNotes = (students ?? []).filter(
            (s) => s.accessibility_notes && (s.accessibility_notes as string).trim()
          );

          const scores = Array.from(latestGradeByStudent.values());
          const avgScore = scores.length
            ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
            : null;

          const firstName = (full: string) => (full ?? '').split(/\s+/)[0] ?? '?';

          const perLearnerLines = (students ?? [])
            .filter((s) => {
              const sf = Array.isArray(s.send_flags) ? (s.send_flags as string[]) : [];
              return (
                sf.length > 0 ||
                s.eal ||
                s.ehcp_ref ||
                (s.accessibility_notes && (s.accessibility_notes as string).trim()) ||
                ilpByStudent.get(s.id as string)?.support_needs
              );
            })
            .slice(0, 12)
            .map((s) => {
              const sf = Array.isArray(s.send_flags) ? (s.send_flags as string[]) : [];
              const bits: string[] = [];
              if (sf.length) bits.push(`SEND: ${sf.join('/')}`);
              if (s.eal) {
                const fl = (s.first_language as string | null) ?? '';
                bits.push(`EAL${fl ? ` (first language: ${fl})` : ''}`);
              }
              if (s.ehcp_ref) bits.push('EHCP');
              if (s.pronouns) bits.push(`pronouns ${s.pronouns}`);
              if (s.accessibility_notes)
                bits.push(
                  `notes: ${(s.accessibility_notes as string).slice(0, 140)}`
                );
              const ilp = ilpByStudent.get(s.id as string);
              if (ilp?.support_needs)
                bits.push(`ILP: ${ilp.support_needs.slice(0, 140)}`);
              return `  - ${firstName(s.name as string)}: ${bits.join(' · ')}`;
            });

          cohortContext = [
            cohortRow ? `COHORT: ${cohortRow.name} (${count} active learners)` : null,
            avgScore !== null
              ? `Prior-attainment average (most recent graded assessment): ${avgScore}`
              : null,
            withSend.length > 0 ? `SEND learners: ${withSend.length}` : null,
            withEal.length > 0 ? `EAL learners: ${withEal.length}` : null,
            withEhcp.length > 0 ? `Learners with EHCP: ${withEhcp.length}` : null,
            withNotes.length > 0
              ? `Learners with accessibility notes: ${withNotes.length}`
              : null,
            perLearnerLines.length > 0
              ? `\nIndividual needs (first-name only — DO NOT use surnames, ULNs, or identifiers):\n${perLearnerLines.join(
                  '\n'
                )}`
              : null,
            '\nWhen you produce inclusive_practice entries, name the specific learners (first name only) whose needs your strategy addresses — e.g. "For Jamie (dyslexia): pre-print AC 2.1 on buff paper with serif font." Do not generate strategies for needs that are not present in this cohort.',
          ]
            .filter(Boolean)
            .join('\n');
        }

        const collegeContext = [
          collegeContextLines.join('\n'),
          cohortContext,
        ]
          .filter((s) => s && s.length > 0)
          .join('\n\n');

        const briefPrompt = buildBriefUserPrompt({
          qualification_title: qualRow.title as string,
          qualification_code,
          unit_code,
          unit_title,
          acs,
          facets,
          session_length_mins,
          delivery_mode,
        });
        const planPrompt = buildPlanUserPrompt({
          qualification_title: qualRow.title as string,
          qualification_code,
          unit_code,
          unit_title,
          acs,
          facets,
          session_length_mins,
          delivery_mode,
          include_homework,
          include_differentiation,
          include_hs,
          include_british_values,
          include_stretch_challenge,
          include_inclusive_practice,
          college_context: collegeContext || undefined,
        });

        // Run both streams in parallel — brief (prose) and plan (tool-calling JSON)
        const briefPromise = streamBrief({
          apiKey: OPENAI_KEY,
          signal: ctrl.signal,
          userPrompt: briefPrompt,
          onDelta: (delta) => emit('brief_chunk', { delta }),
        })
          .then((full) => {
            emit('brief_complete', { length: full.length });
            return full;
          })
          .catch((e) => {
            throw new Error(`brief: ${(e as Error).message}`);
          });

        // Plan stream with retry-once on connection errors. gpt-5-mini is a
        // reasoning model — its silent-thinking window can drop flaky network
        // connections mid-stream. A fresh second attempt almost always works.
        const isRetryableError = (e: unknown): boolean => {
          const msg = (e as Error)?.message ?? '';
          return (
            /error reading a body/i.test(msg) ||
            /connection/i.test(msg) ||
            /network/i.test(msg) ||
            /ECONN/i.test(msg) ||
            /ETIMEDOUT/i.test(msg) ||
            /aborted/i.test(msg)
          );
        };

        const runPlanStream = async (): Promise<string> => {
          return streamPlan({
            apiKey: OPENAI_KEY,
            signal: ctrl.signal,
            userPrompt: planPrompt,
            onDelta: (delta) => emit('plan_chunk', { delta }),
          });
        };

        const planPromise = (async (): Promise<string> => {
          try {
            const args = await runPlanStream();
            emit('plan_complete', { length: args.length });
            return args;
          } catch (e) {
            if (!isRetryableError(e)) {
              throw new Error(`plan: ${(e as Error).message}`);
            }
            console.warn('[lesson-gen] plan stream dropped, retrying once', e);
            emit('status', {
              phase: 'plan_retrying',
              reason: (e as Error).message ?? 'connection dropped',
            });
            try {
              const args = await runPlanStream();
              emit('plan_complete', { length: args.length, retried: true });
              return args;
            } catch (e2) {
              throw new Error(`plan: ${(e2 as Error).message} (after 1 retry)`);
            }
          }
        })();

        const [brief, planArgsRaw] = await Promise.all([briefPromise, planPromise]);
        clearTimeout(timer);

        let plan: Record<string, unknown>;
        try {
          plan = JSON.parse(planArgsRaw);
        } catch (e) {
          // Try to rescue a truncated JSON payload by closing dangling strings,
          // arrays and objects at the right nesting level.
          const repaired = repairTruncatedJson(planArgsRaw);
          if (repaired) {
            try {
              plan = JSON.parse(repaired);
              console.warn('[lesson-gen] rescued truncated plan JSON');
            } catch (e2) {
              throw new Error(
                `Plan tool returned invalid JSON (tried repair): ${(e as Error).message}`
              );
            }
          } else {
            throw new Error(`Plan tool returned invalid JSON: ${(e as Error).message}`);
          }
        }

        // Attach the briefing markdown
        plan.tutor_brief_markdown = brief;

        emit('status', { phase: 'saving' });

        // Sanitise citations — drop any hallucinated facet ids
        const validFacetIds = new Set(facets.map((f) => f.facet_id));
        const cited = (plan.cited_facets as Array<Record<string, unknown>> | undefined) ?? [];
        const sanitisedCitations = cited
          .filter((c) => validFacetIds.has(c.facet_id as string))
          .map((c) => {
            const f = facets.find((x) => x.facet_id === c.facet_id)!;
            return {
              facet_id: f.facet_id,
              document_type: f.document_type,
              reg_number: f.reg_number,
              citation_note: (c.citation_note as string) ?? null,
              is_a4_change: f.is_a4_change,
            };
          });
        plan.cited_facets = sanitisedCitations;

        let lesson_plan_id: string | null = null;
        let save_error: string | null = null;
        if (save_to_db && profile) {
          // tutor_id FK points at college_staff(id), NOT auth.users.id.
          // Look up the staff row for this user in this college.
          const { data: staff } = await sb
            .from('college_staff')
            .select('id')
            .eq('user_id', profile.id)
            .eq('college_id', profile.college_id)
            .maybeSingle();

          const { data: inserted, error: insErr } = await sb
            .from('college_lesson_plans')
            .insert({
              college_id: profile.college_id,
              title: plan.title as string,
              cohort_id,
              tutor_id: staff?.id ?? null,
              duration_minutes: plan.duration_mins as number,
              objectives: JSON.stringify(plan.learning_objectives ?? []),
              content: plan, // jsonb column — pass object, not stringified JSON
              status: 'Draft',
            })
            .select('id')
            .maybeSingle();

          if (insErr) {
            console.error('[lesson-gen] save failed', insErr);
            save_error = insErr.message ?? String(insErr);
          } else if (inserted) {
            lesson_plan_id = inserted.id;

            const { error: mapErr } = await sb.from('lesson_plan_ac_mapping').insert(
              acs.map((a) => ({
                lesson_plan_id,
                qualification_code,
                unit_code,
                ac_code: a.ac_code,
                mapping_source: 'ai_suggested',
                confidence: 1,
              }))
            );
            if (mapErr) console.error('[lesson-gen] ac mapping save failed', mapErr);

            if (sanitisedCitations.length > 0) {
              const { error: refErr } = await sb.from('lesson_regulation_refs').insert(
                sanitisedCitations.map((c) => ({
                  lesson_plan_id,
                  facet_id: c.facet_id,
                  document_type: c.document_type,
                  cited_how: c.citation_note,
                  is_a4_change: c.is_a4_change,
                }))
              );
              if (refErr) console.error('[lesson-gen] reg refs save failed', refErr);
            }
          }
        }

        emit('done', {
          lesson_plan_id,
          save_error,
          facets_used: facets.length,
          plan,
          total_ms: Date.now() - tAll,
        });
      } catch (e) {
        console.error('[lesson-gen] error', e);
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
