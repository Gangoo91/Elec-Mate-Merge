# Elec-Mate Public API

Read-only, no-auth API surface for AI assistants. Lives at `https://www.elec-mate.com/api/public/v1/*`.

This is the **public** half of Elec-Mate's two-server architecture:

```
PUBLIC  (here, Vercel Edge Functions)
  →  www.elec-mate.com/api/public/v1/*
  →  No auth, read-only, cached at edge
  →  For ChatGPT Custom GPTs, Claude Connectors, Perplexity, etc.

PRIVATE (services/elec-ai-mcp/, on Hetzner VPS)
  →  mcp.elec-mate.com/v1/private
  →  JWT auth, full 197-tool surface, write-capable
  →  For Mate (in-app + WhatsApp), per-user scoped
```

Both share the same Supabase backend — single source of truth.

## Directory layout

```
api/
├── _lib/                       ← Shared utilities (NOT routed — _ prefix)
│   ├── util.ts                 ← Headers, response helpers, citation envelope
│   └── supabase.ts             ← Supabase fetch + query helpers
└── public/
    ├── README.md               ← This file
    └── v1/                     ← Versioned API surface
        ├── zs-max.ts           ← GET /api/public/v1/zs-max
        ├── disconnection-time.ts
        ├── bs7671-search.ts
        └── ... (more to come)
```

**Versioning rule**: never break `/v1/*`. If a response shape needs to change in a way that would break AI caches, ship `/v2/*` and run them in parallel for at least 6 months before deprecating v1.

## Every endpoint MUST

1. **Be a GET request** (or OPTIONS for CORS preflight)
2. **Return an envelope** with `citation`, `source: "Elec-Mate (...)"`, `license` fields
3. **Validate input** via `parseIntInRange()` / `parseEnum()` — reject bad input with `errorResponse()`
4. **Use shared headers** via `jsonResponse()` from `_lib/util.ts`
5. **Never accept user-scoped params** — no `user_id`, `phone_number`, `agent_jwt`, etc. The whole point of this surface is that it's anonymous + cacheable.
6. **Be deterministic where possible** — pure math (Zs, disconnection time) returns the same answer every time. Search endpoints can vary, but should still be heavily cached at the edge.

## Endpoint template

```typescript
export const config = { runtime: 'edge' };

import {
  jsonResponse,
  errorResponse,
  corsPreflight,
  methodNotAllowed,
  withCitation,
  parseEnum,
  parseIntInRange,
} from '../../_lib/util';

export default async function handler(req: Request): Promise<Response> {
  if (req.method === 'OPTIONS') return corsPreflight();
  if (req.method !== 'GET') return methodNotAllowed();

  const url = new URL(req.url);
  // ... validate params via parseEnum / parseIntInRange ...
  // ... compute or query ...

  return jsonResponse(withCitation(data, 'BS 7671:2018+A4:2026 Reg X.X.X', tool_url));
}
```

## Current endpoints

| Endpoint                                                        | Backed by                                   | Status  |
| --------------------------------------------------------------- | ------------------------------------------- | ------- |
| `GET /api/public/v1/zs-max?type=B&in=32`                        | Pure math (Reg 411.4.4)                     | ✅ live |
| `GET /api/public/v1/disconnection-time?system=TN&circuit=final` | Lookup (Table 41.1)                         | ✅ live |
| `GET /api/public/v1/bs7671-search?q=...`                        | Supabase `bs7671_regulations` via PostgREST | ✅ live |

## Planned (next session — Phase 2)

Tools to add, mapped to existing Supabase tables:

**BS 7671 lookups** (`bs7671_regulations`, `bs7671_facets`, `bs7671_tables`)

- `bs7671-regulation` — fetch a specific reg by number (full text)
- `bs7671-table` — fetch a specific BS 7671 table (e.g. 41.3, 4D5)
- `bs7671-section` — all regs in a section (e.g. 701, 722)
- `bs7671-rag-search` — semantic search via embeddings (proxies to existing edge function)

**Calculators** (mostly pure math, no DB)

- `cable-size` — wraps the cable sizing logic
- `voltage-drop` — pure math, Appendix 4
- `earth-rod-resistance` — TT earth electrode calc
- `diversity` — Appendix A diversity factors
- `prospective-fault-current` — pure math

**Practical Work Intelligence v2** (`practical_work_intelligence` — 199,726 rows)

- `pwi-install-time` — typical_duration_minutes + team_size + skill_level
- `pwi-common-defects` — common_defects array for a category
- `pwi-eicr-codes` — eicr_observation_codes for a scenario
- `pwi-troubleshooting` — troubleshooting_steps + diagnostic_tests
- `pwi-materials` — materials_needed + tools_required
- `pwi-inspection-checklist` — visual_inspection_points

**Pricing intelligence** (`regional_job_pricing`, `job_pricing_baseline`, `regional_pricing`)

- `pricing-job` — average/min/max for job_type + region
- `pricing-baseline` — industry-baseline + estimated_hours
- `pricing-regional-multiplier` — region multiplier

**Reference / glossary**

- `glossary` — UK electrical term definitions
- `eicr-code` — C1/C2/C3/FI explanations
- `certificate-required` — what cert for what job
- `notifiable-work-check` — Part P decision

## Planned: MCP-protocol endpoint

In addition to REST (for Custom GPTs), expose the same tools via MCP-over-SSE
at `/api/public/v1/mcp/sse` for Claude Connectors and ChatGPT Connectors.
Same underlying tool functions, different transport.

## Telemetry

Every call should log to `agent_action_log` (or a sister table) with:

- tool name
- params (sanitised — no PII even though we don't accept any)
- response time
- success/fail
- User-Agent (to distinguish Claude vs GPT vs random crawler)
- hashed source IP (for rate-limit forensics, not user tracking)

## Rate limiting

Phase 1: rely on Vercel's built-in per-function limits + Cloudflare in front.
Phase 2: implement application-level token-bucket (100 req/min/IP, 5000 req/day/IP)
returning `429 Retry-After` cleanly.

## Honest limits

- 30-second function timeout (Vercel Edge default)
- 25 MB max response (Vercel limit; we never approach this)
- Cold-start ~50ms (Vercel Edge is fast but not zero)
- Free tier is 100k invocations/day on Vercel — way beyond expected MCP traffic
