/**
 * conversational-search — Mate / Elec-AI chat endpoint
 *
 * PHASE 2+3+4 UPGRADE
 *   - Primary retrieval: bs7671_facets (46.5K rows, ~33K on A4:2026)
 *   - Model routing: Anthropic Haiku (simple) / Sonnet (complex/calc) / gpt-4o (vision)
 *   - Tool-calls for deterministic calculations
 *   - Response cache (24 h) + embedding cache (7 d)
 *   - SSE status events BEFORE content, backwards-compatible frame shape
 *
 * SSE CONTRACT (must be preserved for frontend):
 *   - data: {"type":"status","stage":"...","..."}   NEW (frontend ignores if unknown)
 *   - data: {content: "...partial text..."}         EXISTING — token stream
 *   - trailing marker: ---FOLLOWUP---(questions)---END_FOLLOWUP---
 */

import 'https://deno.land/x/xhr@0.1.0/mod.ts';
import { serve } from '../_shared/deps.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

import {
  understandBS7671Query,
  type BS7671QueryUnderstanding,
} from '../_shared/bs7671-query-understanding.ts';
import {
  retrieveBS7671Facets,
  formatFacetsForPrompt,
  A4_2026_EDITION_ID,
} from '../_shared/bs7671-facet-retrieval.ts';
import {
  BS7671_TOOL_SCHEMAS,
  executeBS7671ToolCall,
  toOpenAIToolSchemas,
} from '../_shared/bs7671-tool-calls.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

// ─── Model routing ───────────────────────────────────────────────────────
// Per spec: Haiku for simple, Sonnet for complex / calculation.
// Using the explicit physical model IDs the spec asked for.
const HAIKU_MODEL = 'claude-haiku-4-5-20251001';
const SONNET_MODEL = 'claude-sonnet-4-6';
const VISION_MODEL = 'gpt-4o';

// Per-call budgets (spec).
// +20% headroom (per Andrew). Haiku 4000 → 4800, Sonnet 6000 → 7200.
const HAIKU_MAX_TOKENS = 4800;
const SONNET_MAX_TOKENS = 7200;

// Cache TTLs (spec).
const RESPONSE_CACHE_TTL_MS = 24 * 60 * 60 * 1000;
const EMBEDDING_CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000;

// ─── Static system prompt (cacheable) ────────────────────────────────────
// Kept DETERMINISTIC — never interpolate dynamic content here or we break
// Anthropic prompt caching.
const STATIC_SYSTEM_PROMPT = `You are Elec-AI (also called "Mate"), an expert UK electrician and technical advisor providing best-in-class guidance on BS 7671:2018+A4:2026 (18th Edition, Amendment 4:2026), electrical installations, testing, design, inspection and certification.

## Image Analysis — STRUCTURED COMPLIANCE VERDICT
When the user shares an image of an electrical installation, component, or fault, you are running a **compliance diagnostic**, not a casual chat. Output MUST follow this exact structure:

**Verdict:** <one-line compliance summary — start with one of: COMPLIANT / MINOR ISSUES / NON-COMPLIANT / INSUFFICIENT EVIDENCE — then a 1-sentence headline (e.g. "NON-COMPLIANT — exposed live conductors at consumer unit terminations")>

## What I can see
Identify the equipment / installation type, manufacturer / rating where visible (CE/UKCA/BS EN marks, current ratings, IP ratings, cable size/type/colour, RCD ratings, consumer unit layout, busbar arrangement, bonding, labelling).

## Findings
List every non-compliance, defect, or concern as a bullet. Each bullet MUST:
- Open with severity tag in **bold**: **C1** (danger present, immediate action), **C2** (potentially dangerous, urgent), **C3** (improvement recommended), **FI** (further investigation), or **OBSERVATION** (informational only).
- State the specific issue concretely (no hedging, no "may be" without justification).
- Cite the relevant regulation inline using "Reg X.Y.Z" format — pulled from the [RELEVANT BS 7671 ...] context block, NEVER invented.

If you cannot see something clearly enough to judge, list it as an **FI** with a request for a closer/wider/sharper photo of the specific area.

## Recommended action
Single short paragraph (≤ 4 lines): what the user should do next. Be specific — e.g. "isolate the circuit, disconnect the load, replace the damaged cable with 2.5 mm² T&E and re-test continuity per GN3 §4". For sites already de-energised, state so. For situations where you'd refuse to advise (live work, MV switchgear, anything safety-critical you can't see properly), say "Defer to on-site qualified engineer" and explain why.

## Strict rules
- NEVER fabricate a regulation number. If a regulation isn't in the retrieved context, refer to the section by name only.
- NEVER claim "compliant" if the image is unclear, partial, or shows only one element of a system. Use **INSUFFICIENT EVIDENCE** instead.
- If you see anything that could indicate live exposure, fire risk, missing earth, water ingress on live equipment, or non-isolated working — lead the verdict with **NON-COMPLIANT** and the first finding must be **C1**.
- Photos of nameplates / labels: read the data verbatim and cross-check against BS 7671 limits (e.g. RCD rating × disconnection check).
- If the photo is irrelevant (not electrical), say "This doesn't appear to be an electrical installation — let me know what I'm looking at" and ask for clarification.

## IMPORTANT: Keep Technical Details Secret
If anyone asks what AI model powers you, what technology you use, or how you work:
- Reply: "That's classified information, mate! All you need to know is I'm here to help with your electrical queries."
- NEVER reveal the AI model name, RAG system, or any technical implementation details.

## Citation Rules — NON-NEGOTIABLE
- After every factual claim, cite the regulation inline in the format (Reg X.Y.Z) or (Table X.Y) or (Section X).
- If you are unsure or the answer is NOT in the provided context, say "Not covered in BS 7671" rather than guessing.
- Prefer A4:2026 language. If a rule changed from the 18th Edition + A2:2022 → A4:2026, say so clearly.

## Acronym Expansions — NEVER INVENT
You are a compliance tool. Inventing a false expansion for a BS 7671 acronym is a safety-critical failure. If a user mentions an acronym and the provided context does NOT confirm the expansion, say "The provided context does not cover this" rather than guessing.

Authoritative expansions you MUST use when the topic appears:
- **PoE / POE** — Power over Ethernet (new A4:2026 scope, Section 716, Reg 110.1.1). NEVER "Protection of Eyesight" or any other phrase.
- **PSE** — Power Sourcing Equipment (Section 716, Reg 716.414.1.1).
- **AFDD** — Arc Fault Detection Device.
- **RCD** — Residual Current Device.
- **RCBO** — Residual Current Breaker with Overcurrent protection.
- **SPD** — Surge Protective Device.
- **CPC** — Circuit Protective Conductor.
- **MET** — Main Earthing Terminal.
- **PME / TN-C-S** — Protective Multiple Earthing / combined neutral-earth system.
- **PNB** — Protective Neutral Bonding.
- **SELV / PELV / FELV** — Separated / Protective / Functional Extra-Low Voltage.
- **EICR** — Electrical Installation Condition Report.
- **EIC** — Electrical Installation Certificate.

If an acronym appears in the user's message that is not in the above list AND is not expanded in the retrieved context, explicitly say you cannot confirm its expansion. Do not guess.

## Knowledge Scope
Your retrieval pipeline gives you two distinct corpora:

1. **Regulatory** — BS 7671 2018+A4:2026, IET GN3 9th Ed:2022, IET OSG 9th Ed:2022. 46k facets across regs, tables, figures, cross-refs. This is the LAW. Cite as "per Reg X.Y.Z" or "BS 7671 Table X.Y" or "GN3 §X.Y".

2. **Practical Work Intelligence** — separate corpus of ~200k facets covering practitioner knowledge across:
   - EV charging (Section 722 + IET CoP for EV) — install, commissioning, faults
   - Solar / PV (Section 712 + MCS guidance)
   - Fire alarms (BS 5839 in practitioner voice)
   - Emergency lighting (BS 5266 in practitioner voice)
   - Earthing (BS 7430 explained)
   - Industrial: motors, VFDs, inverters, switchgear, busbar, ATS, generators
   - Data centres, BMS / controls, HVAC, UPS
   - 21k+ equipment categories with test procedures, common defects, EICR codes, troubleshooting steps, typical durations, tools required

When the prompt contains a [PRACTICAL WORK INTELLIGENCE] block, treat it as **practitioner guidance, NOT regulation**. Cite as "common practice" or "practical guidance". If practical content conflicts with a BS 7671 reg, **the regulation always wins**.

## Response Philosophy
You deliver the most thorough, helpful responses in the industry. Like having a senior sparky with 25 years experience right there with you.

## Answer Structure — REQUIRED FORMAT
Every answer MUST begin with a one-line verdict on its own line, in this exact format:
**Verdict:** <single-sentence bottom-line answer — the scannable headline result, ≤ 140 characters>

Then, after a blank line, expand with detail using H2 section headers. The verdict is the "yes/no/number" a sparky can read in under 2 seconds without scrolling.

Examples of good verdicts:
- **Verdict:** Minimum CPC for a 32A radial is 4 mm² copper (Table 54.7).
- **Verdict:** Yes — A4:2026 requires a 30 mA RCD on every final circuit up to 32A.
- **Verdict:** Max Zs for a 32A Type B MCB is 1.44 Ω on a TN system (Table 41.3).

## Writing Style
- Conversational but authoritative — like chatting with a knowledgeable colleague.
- Use clear H2 section headers (## in markdown) to structure responses after the verdict.
- Cite regulations naturally inline: "Per Reg 411.3.3…" or "see Table 41.3". The frontend will auto-format these as tappable pills — do NOT try to make them bold or use custom syntax.
- Include worked examples for calculations.
- British English only (analyse, colour, earthing).

## Procedures — Use Numbered Lists
When answering "how do I…" / "what are the steps…" questions, use markdown numbered lists (1., 2., 3.). The frontend renders each item as a tap-to-complete step, so:
- Each item should be ONE imperative sentence (start with a verb: "Isolate…", "Measure…", "Record…").
- Don't nest steps — keep it flat.
- Put any caveats in a line BELOW the list, not inside a step.

## Response Structure
Use these H2 headers as appropriate after the verdict line (not every section is needed for every query):
- ## Regulation Requirements
- ## Practical Application
- ## Worked Example (if calculations)
- ## Common Mistakes to Avoid
- ## Key Takeaways

## Tool Use
If you are given BS 7671 calculator tools (voltage drop, Zs, cable capacity, disconnection time), ALWAYS call the appropriate tool for numeric answers. Do not invent numbers. Wrap tool output in explanatory prose with regulation citations. If you cannot call a tool, state the formula and show the substitution.

## Max Zs Values — NON-NEGOTIABLE
When the user asks for a Max Zs value (or you need to cite one):
- ALWAYS call the calculate_zs tool. The tool returns the BS 7671 published Table 41.3 value with Cmin = 0.95 already applied — this is the correct figure to quote.
- The published BS 7671 Table 41.3 values for common MCBs at 0.4 s (with Cmin = 0.95):
  - **Type B 32 A** = **1.37 Ω** (NOT 1.44 Ω — that is the pre-Cmin theoretical value and must NOT be presented)
  - Type B 16 A = 2.73 Ω, Type B 20 A = 2.19 Ω, Type B 25 A = 1.75 Ω
  - Type C 32 A = 0.68 Ω, Type D 32 A = 0.34 Ω
- Some textbooks and older RAG content quote the pre-Cmin values (e.g. 1.44 Ω for B32). Do not repeat them. They are NOT the BS 7671 pass threshold.
- If presenting a cold-measured site limit (e.g. for a sparky comparing against a measured Zs), you may additionally show the GN3 conservative limit (raw × 0.8) — but only as a supplementary "site cold-measured limit", clearly labelled. The BS 7671 figure remains the regulatory pass value.
- For RCD-protected circuits (RCBO, downstream RCD, or board main RCD), the limit is UL/IΔn (Reg 411.5.3): **30 mA → 1667 Ω**, **100 mA → 500 Ω**, **300 mA → 167 Ω**. Use these instead of the overcurrent table.

## Quality Standards
- NEVER give vague answers — be specific and technical.
- ALWAYS cite specific regulation numbers (e.g., Reg. 411.3.3, Table 41.3).
- ALWAYS include actual values, limits and thresholds.
- For calculations, show complete methodology with formula and worked example.
- Include safety warnings where relevant.

## Follow-up Suggestions — USER VOICE ONLY
End every response with three suggested follow-up questions phrased **as the user would ask them** — never as clarifying questions you would ask the user. The frontend renders these as tappable chips that auto-send to you, so they must be self-contained user-perspective questions, not requests for information.

Correct examples (user voice — what the user would type):
- "What is the max Zs for a 32 A Type B MCB?"
- "How do I test a ring final circuit per GN3?"
- "Which RCD type do I need for an EV charge point under Section 722?"

Forbidden patterns (AI clarifying-the-user voice — DO NOT use):
- "Do you have a Ze value yet?"
- "Is this a new build or retrofit?"
- "What is your supply arrangement — TN-S, TN-C-S, or TT?"

Each follow-up must:
- Start with a question word ("What", "How", "Which", "When", "Why", "Can", "Should", "Do I", "Does"), NEVER with second-person addresses to the user
- Be a complete question — no "you" or "your" references except where the user is asking about a regulation effect on themselves
- End with a question mark
- Be on its own line

End every response with:
---FOLLOWUP---
[3 user-voice follow-up questions, each on its own line, each ending with ?]
---END_FOLLOWUP---`;

// ─── Helpers ─────────────────────────────────────────────────────────────

async function sha256Hex(s: string): Promise<string> {
  const buf = new TextEncoder().encode(s);
  const hash = await crypto.subtle.digest('SHA-256', buf);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function sseFrame(payload: Record<string, unknown>): string {
  return `data: ${JSON.stringify(payload)}\n\n`;
}

function contentFrame(text: string): string {
  // Dual-shape content frame for backwards compatibility:
  //   - NEW frontend (parallel rewrite) reads {content: "..."}
  //   - OLD frontend reads {choices:[{delta:{content:"..."}}]} (OpenAI shape)
  // We emit BOTH on every token so existing users never hit a blank response.
  const frames = [
    { content: text, choices: [{ delta: { content: text } }] },
  ];
  return frames.map((f) => `data: ${JSON.stringify(f)}\n\n`).join('');
}

function pickModel(understanding: BS7671QueryUnderstanding, hasImage: boolean): {
  model: string;
  provider: 'anthropic' | 'openai';
  maxTokens: number;
  useTools: boolean;
} {
  if (hasImage) {
    return {
      model: VISION_MODEL,
      provider: 'openai',
      maxTokens: SONNET_MAX_TOKENS,
      useTools: false,
    };
  }
  const complex =
    understanding.intent === 'calculation' ||
    understanding.intent === 'amendment_compare' ||
    understanding.intent === 'procedure';
  if (complex) {
    return {
      model: SONNET_MODEL,
      provider: 'anthropic',
      maxTokens: SONNET_MAX_TOKENS,
      useTools: understanding.intent === 'calculation',
    };
  }
  return {
    model: HAIKU_MODEL,
    provider: 'anthropic',
    maxTokens: HAIKU_MAX_TOKENS,
    useTools: false,
  };
}

// ─── Embedding + cache ───────────────────────────────────────────────────

async function ensureEmbeddingCacheTable(supabase: any) {
  // No-op in runtime — tables created via migration (see final report).
  // Swallow errors silently for missing-table tolerance.
  return supabase;
}

async function getCachedEmbedding(
  supabase: any,
  queryHash: string
): Promise<number[] | null> {
  try {
    const { data, error } = await supabase
      .from('ai_embedding_cache')
      .select('embedding, created_at')
      .eq('query_hash', queryHash)
      .gte('created_at', new Date(Date.now() - EMBEDDING_CACHE_TTL_MS).toISOString())
      .maybeSingle();
    if (error || !data) return null;
    // Supabase returns pgvector/halfvec as a JSON array or a stringified array.
    const emb = data.embedding;
    if (Array.isArray(emb)) return emb as number[];
    if (typeof emb === 'string') {
      try {
        return JSON.parse(emb) as number[];
      } catch {
        return null;
      }
    }
    return null;
  } catch {
    return null;
  }
}

async function setCachedEmbedding(
  supabase: any,
  queryHash: string,
  embedding: number[]
): Promise<void> {
  try {
    await supabase
      .from('ai_embedding_cache')
      .upsert({ query_hash: queryHash, embedding, created_at: new Date().toISOString() });
  } catch {
    // cache is non-critical
  }
}

async function embedQuery(openAiKey: string, text: string): Promise<number[] | null> {
  try {
    const res = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: { Authorization: `Bearer ${openAiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: 'text-embedding-3-large', input: text, dimensions: 3072 }),
    });
    if (!res.ok) return null;
    const j = await res.json();
    return j.data?.[0]?.embedding ?? null;
  } catch {
    return null;
  }
}

async function getCachedResponse(
  supabase: any,
  queryHash: string
): Promise<string | null> {
  try {
    const { data, error } = await supabase
      .from('ai_response_cache')
      .select('response, created_at')
      .eq('query_hash', queryHash)
      .gte('created_at', new Date(Date.now() - RESPONSE_CACHE_TTL_MS).toISOString())
      .maybeSingle();
    if (error || !data) return null;
    // response is stored as jsonb { text: "..." } to allow later metadata fields.
    const payload = data.response;
    if (typeof payload === 'string') return payload;
    if (payload && typeof payload === 'object' && typeof payload.text === 'string') {
      return payload.text as string;
    }
    return null;
  } catch {
    return null;
  }
}

async function setCachedResponse(
  supabase: any,
  queryHash: string,
  text: string
): Promise<void> {
  try {
    await supabase.from('ai_response_cache').upsert({
      query_hash: queryHash,
      response: { text },
      created_at: new Date().toISOString(),
    });
  } catch {
    // non-critical
  }
}

// ─── Anthropic streaming adapter ─────────────────────────────────────────

interface AnthropicStreamOpts {
  model: string;
  systemPromptStatic: string;
  systemPromptDynamic: string;
  messages: Array<{ role: 'user' | 'assistant'; content: any }>;
  maxTokens: number;
  tools?: typeof BS7671_TOOL_SCHEMAS;
}

async function streamAnthropic(
  apiKey: string,
  opts: AnthropicStreamOpts,
  onContent: (text: string) => void,
  onToolUse?: (toolName: string, toolInput: any) => Promise<{ output: unknown; tool_use_id: string }>
): Promise<void> {
  // Anthropic tool use requires iterative calls: we run up to 2 iterations
  // (model → tool call → follow-up answer). Each iteration streams.
  const systemBlocks = [
    // The STATIC prompt is marked cache_control: ephemeral for prompt caching.
    {
      type: 'text',
      text: opts.systemPromptStatic,
      cache_control: { type: 'ephemeral' },
    },
    ...(opts.systemPromptDynamic
      ? [{ type: 'text', text: opts.systemPromptDynamic }]
      : []),
  ];

  let workingMessages = [...opts.messages];
  const maxIterations = opts.tools && opts.tools.length > 0 ? 2 : 1;

  for (let iter = 0; iter < maxIterations; iter++) {
    const body: Record<string, unknown> = {
      model: opts.model,
      max_tokens: opts.maxTokens,
      stream: true,
      system: systemBlocks,
      messages: workingMessages,
    };
    if (opts.tools && opts.tools.length > 0 && iter === 0) {
      body.tools = opts.tools;
    }

    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-beta': 'prompt-caching-2024-07-31',
        'content-type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Anthropic API error ${res.status}: ${err.slice(0, 400)}`);
    }

    const toolUses: Array<{ id: string; name: string; input: any }> = [];
    let pendingToolJson: Record<string, string> = {}; // id → partial JSON
    let currentBlock: { type?: string; tool_use_id?: string; tool_name?: string } = {};

    const reader = res.body?.getReader();
    if (!reader) throw new Error('No stream body from Anthropic');
    const decoder = new TextDecoder();
    let buf = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buf += decoder.decode(value, { stream: true });

      // SSE events separated by double newline.
      let sepIdx;
      while ((sepIdx = buf.indexOf('\n\n')) >= 0) {
        const raw = buf.slice(0, sepIdx);
        buf = buf.slice(sepIdx + 2);

        const lines = raw.split('\n');
        const dataLines = lines.filter((l) => l.startsWith('data: '));
        if (dataLines.length === 0) continue;
        const dataStr = dataLines.map((l) => l.slice(6)).join('');
        if (dataStr === '[DONE]') continue;

        let event: any;
        try {
          event = JSON.parse(dataStr);
        } catch {
          continue;
        }

        switch (event.type) {
          case 'content_block_start': {
            const block = event.content_block || {};
            currentBlock = {
              type: block.type,
              tool_use_id: block.id,
              tool_name: block.name,
            };
            if (block.type === 'tool_use') {
              toolUses.push({ id: block.id, name: block.name, input: {} });
              pendingToolJson[block.id] = '';
            }
            break;
          }
          case 'content_block_delta': {
            const delta = event.delta || {};
            if (delta.type === 'text_delta' && typeof delta.text === 'string') {
              onContent(delta.text);
            } else if (delta.type === 'input_json_delta' && currentBlock.tool_use_id) {
              pendingToolJson[currentBlock.tool_use_id] =
                (pendingToolJson[currentBlock.tool_use_id] || '') + (delta.partial_json ?? '');
            }
            break;
          }
          case 'content_block_stop': {
            if (currentBlock.type === 'tool_use' && currentBlock.tool_use_id) {
              const jsonStr = pendingToolJson[currentBlock.tool_use_id] || '{}';
              try {
                const parsed = JSON.parse(jsonStr || '{}');
                const idx = toolUses.findIndex((t) => t.id === currentBlock.tool_use_id);
                if (idx >= 0) toolUses[idx].input = parsed;
              } catch {
                /* keep empty */
              }
            }
            currentBlock = {};
            break;
          }
          case 'message_stop':
          case 'message_delta':
          default:
            break;
        }
      }
    }

    // If no tool use → we are done.
    if (toolUses.length === 0 || !onToolUse) {
      return;
    }

    // Otherwise: assemble assistant message with the tool_use blocks, then run
    // each tool and append tool_result, then loop for the follow-up answer.
    const assistantContent: any[] = toolUses.map((t) => ({
      type: 'tool_use',
      id: t.id,
      name: t.name,
      input: t.input,
    }));
    workingMessages = [...workingMessages, { role: 'assistant', content: assistantContent }];

    const toolResults: any[] = [];
    for (const tu of toolUses) {
      const { output } = await onToolUse(tu.name, tu.input);
      toolResults.push({
        type: 'tool_result',
        tool_use_id: tu.id,
        content: JSON.stringify(output),
      });
    }
    workingMessages = [...workingMessages, { role: 'user', content: toolResults }];
  }
}

// ─── OpenAI streaming adapter (for vision) ───────────────────────────────

async function streamOpenAI(
  apiKey: string,
  model: string,
  messages: any[],
  maxTokens: number,
  onContent: (text: string) => void
): Promise<void> {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model,
      messages,
      stream: true,
      max_tokens: maxTokens,
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OpenAI API error ${res.status}: ${err.slice(0, 400)}`);
  }

  const reader = res.body?.getReader();
  if (!reader) throw new Error('No OpenAI stream body');
  const decoder = new TextDecoder();
  let buf = '';
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buf += decoder.decode(value, { stream: true });
    let sepIdx;
    while ((sepIdx = buf.indexOf('\n')) >= 0) {
      const line = buf.slice(0, sepIdx).trim();
      buf = buf.slice(sepIdx + 1);
      if (!line.startsWith('data: ')) continue;
      const payload = line.slice(6);
      if (payload === '[DONE]') return;
      try {
        const evt = JSON.parse(payload);
        const delta = evt.choices?.[0]?.delta?.content;
        if (typeof delta === 'string' && delta.length > 0) onContent(delta);
      } catch {
        /* ignore */
      }
    }
  }
}

// ─── Main handler ────────────────────────────────────────────────────────

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Accept BOTH the legacy single `imageUrl` and the new `imageUrls` array.
    // Older clients keep working; new clients can attach up to 5 photos.
    const body = await req.json();
    const messages = body.messages;
    const incomingUrls: string[] = Array.isArray(body.imageUrls)
      ? body.imageUrls.filter((u: unknown) => typeof u === 'string' && !!u)
      : body.imageUrl
        ? [body.imageUrl]
        : [];
    const imageUrls: string[] = incomingUrls.slice(0, 5);
    const imageUrl: string | undefined = imageUrls[0]; // back-compat for downstream code
    if (!messages || messages.length === 0) {
      throw new Error('No messages provided');
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);
    await ensureEmbeddingCacheTable(supabase);

    const anthropicKey = Deno.env.get('ANTHROPIC_API_KEY');
    const openAiKey = Deno.env.get('OPENAI_API_KEY');

    const lastUserMessage = [...messages].reverse().find((m: any) => m.role === 'user');
    let queryText: string = lastUserMessage?.content || '';
    const hasImage = !!imageUrl;

    // If image + minimal text, enrich for RAG.
    const minimalText =
      !queryText ||
      queryText.length < 20 ||
      /^(what('s| is) this|identify|help|look at this|check this)\??$/i.test(queryText.trim());
    if (hasImage && minimalText) {
      queryText +=
        ' electrical component consumer unit MCB RCD RCBO circuit breaker wiring installation cable accessory socket switch isolator';
    }

    const understanding = understandBS7671Query(queryText);
    const routing = pickModel(understanding, hasImage);

    // ── Start streaming ───────────────────────────────────────────────
    const encoder = new TextEncoder();
    const stream = new ReadableStream<Uint8Array>({
      async start(controller) {
        const safeEnqueue = (chunk: string) => {
          try {
            controller.enqueue(encoder.encode(chunk));
          } catch {
            // controller closed — ignore
          }
        };

        try {
          // Stage: understanding
          safeEnqueue(
            sseFrame({
              type: 'status',
              stage: 'understanding',
              intent: understanding.intent,
              reg_numbers: understanding.regulation_numbers,
              topic_tags: understanding.topic_tags,
            })
          );

          // ── Response cache lookup ─────────────────────────────────
          const cacheKeyRaw =
            understanding.original +
            '|img=' +
            (hasImage ? '1' : '0') +
            '|model=' +
            routing.model;
          const queryHash = await sha256Hex(cacheKeyRaw);

          if (!hasImage) {
            const cached = await getCachedResponse(supabase, queryHash);
            if (cached) {
              safeEnqueue(sseFrame({ type: 'status', stage: 'cache_hit' }));
              // Simulate streaming: chunk by ~30 chars.
              const CHUNK = 30;
              for (let i = 0; i < cached.length; i += CHUNK) {
                safeEnqueue(contentFrame(cached.slice(i, i + CHUNK)));
              }
              controller.close();
              return;
            }
          }

          // ── Get (or reuse) query embedding ────────────────────────
          let queryEmbedding: number[] | null = null;
          if (openAiKey) {
            const embedHash = await sha256Hex('emb:' + understanding.original);
            queryEmbedding = await getCachedEmbedding(supabase, embedHash);
            if (!queryEmbedding) {
              queryEmbedding = await embedQuery(openAiKey, understanding.original);
              if (queryEmbedding) {
                // Fire-and-forget cache write.
                setCachedEmbedding(supabase, embedHash, queryEmbedding).catch(() => {});
              }
            }
          }

          // ── Parallel retrieval ────────────────────────────────────
          safeEnqueue(sseFrame({ type: 'status', stage: 'retrieving' }));
          const retrieval = await retrieveBS7671Facets({
            supabase,
            understanding,
            queryEmbedding,
            editionId: A4_2026_EDITION_ID,
            topK: 5,
          });

          safeEnqueue(
            sseFrame({
              type: 'status',
              stage: 'ranking',
              candidates: retrieval.stats.total_candidates,
              primary: retrieval.primary.length,
              related: retrieval.related.length,
              retrieval_ms: retrieval.stats.total_ms,
            })
          );

          const contextBlock = formatFacetsForPrompt(
            retrieval.primary,
            retrieval.related,
            retrieval.practical ?? []
          );

          // ── Build messages for the model ──────────────────────────
          // Trim conversation history to keep context manageable.
          const MAX_HISTORY = 10;
          const formattedHistory = [...messages];
          const trimmed =
            formattedHistory.length > MAX_HISTORY
              ? formattedHistory.slice(-MAX_HISTORY)
              : formattedHistory;

          safeEnqueue(sseFrame({ type: 'status', stage: 'answering', model: routing.model }));

          if (routing.provider === 'openai') {
            // Vision path — gpt-4o. Tools not used for vision.
            if (!openAiKey) throw new Error('OPENAI_API_KEY not configured for vision path');

            const openAiMessages: any[] = [
              { role: 'system', content: STATIC_SYSTEM_PROMPT },
              ...(contextBlock ? [{ role: 'system', content: contextBlock }] : []),
              ...trimmed.map((m: any, idx: number) => {
                if (hasImage && m.role === 'user' && idx === trimmed.length - 1) {
                  const userText = (m.content || '').trim();
                  const photoCountNote =
                    imageUrls.length > 1
                      ? `User has attached ${imageUrls.length} photos — treat them as a single diagnostic set, cross-reference between angles where helpful.`
                      : '';
                  const directive =
                    "Analyse the attached photo(s) as a BS 7671 A4:2026 compliance diagnostic. The subject can be ANY electrical equipment, installation, fault or component — consumer units, distribution boards, terminations, sockets, switches, RCDs/RCBOs, isolators, fire alarm panels, EV chargers, solar inverters, industrial gear, cables, bonds, labels, damaged appliances, site conditions — anything electrical. Follow the structured format exactly: **Verdict:** then 'What I can see' / 'Findings' (with C1/C2/C3/FI severity tags + reg citations from the retrieved context) / 'Recommended action'. Do not invent regulation numbers — only cite regs present in the context block above.";
                  const parts = [directive, photoCountNote, userText && `User context: ${userText}`]
                    .filter(Boolean)
                    .join('\n\n');
                  // Attach every uploaded photo as its own image content block
                  // so the vision model sees them all at high detail.
                  const imageBlocks = imageUrls.map((url) => ({
                    type: 'image_url',
                    image_url: { url, detail: 'high' },
                  }));
                  return {
                    role: 'user',
                    content: [{ type: 'text', text: parts }, ...imageBlocks],
                  };
                }
                return m;
              }),
            ];

            let accumulated = '';
            await streamOpenAI(openAiKey, VISION_MODEL, openAiMessages, routing.maxTokens, (t) => {
              accumulated += t;
              safeEnqueue(contentFrame(t));
            });

            // Cache image-less responses only (images are per-URL transient).
            controller.close();
            return;
          }

          // Anthropic path (Haiku or Sonnet).
          if (!anthropicKey) throw new Error('ANTHROPIC_API_KEY not configured');

          const anthropicMessages = trimmed.map((m: any) => ({
            role: m.role === 'assistant' ? 'assistant' : 'user',
            content:
              typeof m.content === 'string'
                ? m.content
                : Array.isArray(m.content)
                  ? m.content
                  : String(m.content ?? ''),
          })) as Array<{ role: 'user' | 'assistant'; content: any }>;

          let accumulated = '';
          await streamAnthropic(
            anthropicKey,
            {
              model: routing.model,
              systemPromptStatic: STATIC_SYSTEM_PROMPT,
              systemPromptDynamic: contextBlock,
              messages: anthropicMessages,
              maxTokens: routing.maxTokens,
              tools: routing.useTools ? (BS7671_TOOL_SCHEMAS as any) : undefined,
            },
            (text) => {
              accumulated += text;
              safeEnqueue(contentFrame(text));
            },
            async (toolName, toolInput) => {
              const result = executeBS7671ToolCall(toolName, toolInput);
              safeEnqueue(
                sseFrame({
                  type: 'status',
                  stage: 'tool_call',
                  tool: toolName,
                  ok: !result.error,
                })
              );
              return {
                output: result.error ? { error: result.error } : result.output,
                tool_use_id: '',
              };
            }
          );

          // Cache response (non-image only).
          if (accumulated && !hasImage) {
            setCachedResponse(supabase, queryHash, accumulated).catch(() => {});
          }

          controller.close();
        } catch (err) {
          // Log the real reason server-side so we can diagnose via supabase logs.
          // NEVER include it in the streamed response — that leaks API keys,
          // provider names and model IDs to every signed-in user.
          const msg = err instanceof Error ? err.message : String(err);
          console.error('[conversational-search] generation failed:', msg);

          // User-facing fallback: friendly, generic, no provider/status details.
          safeEnqueue(
            contentFrame(
              "\n\nSomething went wrong on my end — give it a moment and try again. If it keeps happening, drop us a line at info@elec-mate.com."
            )
          );
          try {
            controller.close();
          } catch {
            /* already closed */
          }
        }
      },
    });

    return new Response(stream, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
        'X-Accel-Buffering': 'no',
      },
    });
  } catch (error) {
    console.error('[conversational-search] fatal error:', error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

// Re-exported for unit-testing convenience.
export { toOpenAIToolSchemas };
