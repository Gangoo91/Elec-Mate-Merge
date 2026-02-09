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

```ts
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};
if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
```

## OpenAI calls MUST use:

- Model: `gpt-5-mini-2025-08-07`
- `max_completion_tokens` (NOT `max_tokens`)
- Do NOT send `temperature`
- Use tool calling for structured JSON output
- See `_shared/ai-providers.ts` for the canonical helper
