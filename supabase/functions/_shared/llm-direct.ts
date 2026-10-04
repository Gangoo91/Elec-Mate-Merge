/**
 * Direct LLM calls — replaces the Lovable AI gateway (ELE-1812, 4 Oct 2026).
 *
 * The app was first built on Lovable, and 13 functions still sent AI requests
 * through `ai.gateway.lovable.dev` with a key from September 2025. Andrew no
 * longer uses Lovable, so user content was going to a company we have no
 * relationship with. These helpers take the exact request the gateway took
 * (OpenAI chat-completions shape, `provider/model` names) and send it straight
 * to the provider we already pay:
 *
 *   openai/*  → api.openai.com, pinned to the house snapshot
 *   google/*  → Gemini's OpenAI-compatible endpoint, gemini-3.5-flash
 *
 * so each call site only swaps `fetch(LOVABLE_URL, init)` for
 * `fetchChatCompletions(init)` and keeps reading `choices[0].message`.
 */

const OPENAI_CHAT = 'https://api.openai.com/v1/chat/completions';
const OPENAI_EMBED = 'https://api.openai.com/v1/embeddings';
const GEMINI_CHAT = 'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions';

// House rule (.claude/rules/edge-functions.md): pinned snapshot,
// max_completion_tokens, no temperature.
const OPENAI_MODEL = 'gpt-5.4-mini-2026-03-17';
const GEMINI_MODEL = 'gemini-3.5-flash';

type Body = Record<string, unknown> & { model?: string };

function route(body: Body): { url: string; key: string; body: Body } {
  const model = String(body.model ?? '');
  if (model.startsWith('google/')) {
    const key = Deno.env.get('GEMINI_API_KEY');
    if (!key) throw new Error('GEMINI_API_KEY not configured');
    return { url: GEMINI_CHAT, key, body: { ...body, model: GEMINI_MODEL } };
  }
  const key = Deno.env.get('OPENAI_API_KEY');
  if (!key) throw new Error('OPENAI_API_KEY not configured');
  const out: Body = { ...body, model: OPENAI_MODEL };
  if (out.max_tokens !== undefined && out.max_completion_tokens === undefined) {
    out.max_completion_tokens = out.max_tokens;
  }
  delete out.max_tokens;
  delete out.temperature;
  return { url: OPENAI_CHAT, key, body: out };
}

/** Drop-in for `fetch('https://ai.gateway.lovable.dev/v1/chat/completions', init)`. */
export function fetchChatCompletions(init: RequestInit): Promise<Response> {
  const parsed = JSON.parse(String(init.body ?? '{}')) as Body;
  const r = route(parsed);
  const headers = new Headers(init.headers);
  headers.set('Authorization', `Bearer ${r.key}`);
  headers.set('Content-Type', 'application/json');
  return fetch(r.url, { ...init, method: 'POST', headers, body: JSON.stringify(r.body) });
}

/** Drop-in for `fetch('https://ai.gateway.lovable.dev/v1/embeddings', init)`. */
export function fetchEmbeddings(init: RequestInit): Promise<Response> {
  const key = Deno.env.get('OPENAI_API_KEY');
  if (!key) throw new Error('OPENAI_API_KEY not configured');
  const parsed = JSON.parse(String(init.body ?? '{}')) as Body;
  const model = String(parsed.model ?? 'text-embedding-3-small').replace(/^openai\//, '');
  const headers = new Headers(init.headers);
  headers.set('Authorization', `Bearer ${key}`);
  headers.set('Content-Type', 'application/json');
  return fetch(OPENAI_EMBED, {
    ...init,
    method: 'POST',
    headers,
    body: JSON.stringify({ ...parsed, model }),
  });
}
