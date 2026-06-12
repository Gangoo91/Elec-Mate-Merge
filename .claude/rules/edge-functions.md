---
paths:
  - 'supabase/functions/**'
---

# Edge Function Rules

## Project ref: jtwygbeceundfgnkirof

## Deploy: `npx supabase functions deploy <name> --project-ref jtwygbeceundfgnkirof`

## Every edge function MUST have:

1. CORS headers for OPTIONS preflight
2. Try/catch with structured error responses
3. Auth verification via `supabase.auth.getUser()`

## Standard CORS pattern:

Prefer importing from `_shared/cors.ts`. If inlining, the Allow-Headers list
MUST include `x-supabase-timeout` and `x-request-id` — the client sends
`x-request-id` (tracing) on every call; omitting it fails the entire request
at preflight (bit us on ai-apprentice-today, 2026-06-12).

```ts
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};
if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
```

## OpenAI calls MUST use:

- Model: `gpt-5.4-mini-2026-03-17` (snapshot — pin to avoid drift)
- `max_completion_tokens` (NOT `max_tokens`)
- Do NOT send `temperature`
- Use tool calling for structured JSON output
- See `_shared/ai-providers.ts` for the canonical helper
