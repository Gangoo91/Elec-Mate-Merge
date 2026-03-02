# Elec-AI Infrastructure Build Plan

> Revised 1 March 2026 — corrected for OpenClaw architecture

## Architecture

```
ELECTRICIAN'S PHONE                          ANDREW'S VPS (Hetzner)
┌───────────────────────────┐     HTTPS     ┌──────────────────────────────┐
│   OpenClaw (iOS/Android)   │ ──────────── │   nginx (SSL + rate limit)    │
│                            │              │          │                    │
│   - Claude (Opus 4.6)     │              │   ┌──────┴─────────────────┐  │
│   - WhatsApp / Telegram   │              │   │  Elec-Mate MCP Server  │  │
│   - Workspace:            │              │   │  (Node.js on port 3100) │  │
│       SOUL.md (= SKILL)   │              │   │                        │  │
│       AGENTS.md            │              │   │  - 53 core tools       │  │
│       TOOLS.md             │              │   │  - 21 apprentice tools │  │
│   - Persistent memory     │              │   │  - JWT auth per request │  │
│   - Session history       │              │   │  - Rate limiting        │  │
│   - DM pairing security   │              │   │  - Audit logging        │  │
└───────────────────────────┘              │   │  - Edge fn allowlist    │  │
                                           │   └──────────┬─────────────┘  │
OR (co-located on VPS):                    └──────────────┼────────────────┘
┌───────────────────────────┐                             │
│   OpenClaw Gateway (VPS)   │              ┌──────────────┴──────────────┐
│   - stdio transport        │              │   Supabase (existing)        │
│   - Multi-agent routing    │              │   jtwygbeceundfgnkirof       │
│   - One agent per user     │              │                              │
│   Spawns MCP as subprocess │              │   - 277 tables               │
└───────────────────────────┘              │   - 406 edge functions       │
                                           │   - RLS per user             │
                                           │   - RAG knowledge bases      │
                                           └──────────────────────────────┘
```

### How It Works

1. **Electrician opens WhatsApp** (or Telegram/Discord) on their phone
2. **OpenClaw receives the message** — it's the AI gateway, running either:
   - On the electrician's own device (iOS/Android/Mac)
   - On Andrew's VPS as a shared gateway with per-user agents
3. **OpenClaw calls Claude** (Anthropic API) for reasoning
4. **Claude decides to use a tool** — e.g. "read_jobs" or "generate_quote"
5. **OpenClaw routes the tool call** to the Elec-Mate MCP server
6. **MCP server authenticates** the user's JWT, checks rate limits, validates the tool
7. **MCP server queries Supabase** (or calls an edge function) with the user's JWT for RLS scoping
8. **Result flows back** through the chain: Supabase → MCP → OpenClaw → Claude → WhatsApp

### Key Design Decisions

1. **OpenClaw IS the agent runtime** — handles messaging, sessions, memory, AI model calls. We don't rebuild any of this.
2. **Elec-Mate IS the MCP server** — one Node.js service serving 74 tools. All backed by Supabase.
3. **Same Supabase project** — `jtwygbeceundfgnkirof`. Agent reads/writes the same tables as the app. RLS keeps everything user-scoped.
4. **Dual transport** — HTTP (Streamable) for remote OpenClaw clients, stdio for co-located OpenClaw gateway. Same code, same tools.
5. **No Twilio** — OpenClaw handles WhatsApp/Telegram/Discord natively.
6. **No Docker-per-user** — OpenClaw's multi-agent routing handles per-user isolation.

---

## What Exists vs What's Missing

### EXISTS (done)

- [x] 6 agent .md files (SKILL v4.0, AGENTS v3.0, RAILS v3.0, SECURITY v2.0, DATA_POLICY v3.0, USER_PROFILE v3.0)
- [x] Database schema — 10 profile columns + 7 agent tables + RLS + `increment_agent_usage()`
- [x] Stripe product + prices (Business AI £29.99/month, £299.99/year)
- [x] Webhook + check-subscription updated with `business_ai_enabled` flag
- [x] stripePrices.ts with Business AI tier in app
- [x] 406 edge functions in Supabase (reusable as MCP tool backends)
- [x] **MCP Server** — 74 tools, JWT auth, rate limiting, audit logging, CORS, security headers, dual transport, graceful shutdown

### MISSING (to build)

- [ ] **VPS setup** — Hetzner CX31, nginx, SSL, deploy MCP server
- [ ] **OpenClaw configuration** — `openclaw.yaml` with agent config + MCP server connection
- [ ] **Agent workspace files** — Map SKILL.md → SOUL.md, configure tools
- [ ] **In-app UI** — Onboarding, activity log, settings (standard React components)
- [ ] **Agent-specific edge functions** — Some tools reference edge functions that may not exist yet

---

## Build Order — 3 Phases

### Phase 1: MCP Server — COMPLETE

**Status:** Built, compiled, zero errors, zero vulnerabilities.

**Location:** `services/elec-ai-mcp/`

**What it includes:**

- 74 tools (53 core + 21 apprentice) with Zod schemas
- JWT authentication with 7 distinct error codes
- Per-user rate limiting: 200/hr, 10/5s burst, daily limits
- Automatic audit logging with sensitive field redaction
- Edge function allowlist (65 functions, blocks `admin-*`)
- Financial safeguards (£0 rejection, 2x average detection, duplicate detection)
- Certificate safeguards (completeness verification, C2 flagging, client cross-check)
- WhatsApp consent + no_contact checks on all outbound tools
- CORS with configurable origins
- Security headers (X-Content-Type-Options, X-Frame-Options, Cache-Control, Referrer-Policy)
- Request correlation IDs (X-Request-Id)
- Dual transport (HTTP + stdio)
- Graceful shutdown (SIGTERM/SIGINT handling)
- Multi-stage Docker build with non-root user
- 149 dependencies, 0 vulnerabilities

---

### Phase 2: VPS + OpenClaw Setup

**What:** Deploy MCP server to Hetzner, configure nginx, set up OpenClaw.

**VPS setup:**

```bash
# Hetzner CX31 (4 vCPU, 8GB RAM, 80GB SSD)
# Ubuntu 24.04 LTS
apt update && apt upgrade -y
apt install -y docker.io docker-compose nginx certbot
```

**nginx config:**

```nginx
server {
    listen 443 ssl http2;
    server_name agent.elec-mate.com;

    ssl_certificate /etc/letsencrypt/live/agent.elec-mate.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/agent.elec-mate.com/privkey.pem;

    # Rate limiting at nginx level (backup — MCP server also rate limits)
    limit_req_zone $binary_remote_addr zone=mcp:10m rate=30r/s;

    location /mcp {
        limit_req zone=mcp burst=50 nodelay;
        proxy_pass http://127.0.0.1:3100;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /health {
        proxy_pass http://127.0.0.1:3100;
    }
}
```

**Docker deployment:**

```bash
docker build -t elec-ai-mcp ./services/elec-ai-mcp
docker run -d \
  --name elec-ai-mcp \
  --restart unless-stopped \
  -p 127.0.0.1:3100:3100 \
  --env-file /opt/elec-ai-mcp/.env \
  elec-ai-mcp
```

**OpenClaw configuration** (`openclaw.yaml`):

Option A — Remote HTTP (OpenClaw on each electrician's phone):

```yaml
# Each electrician configures their OpenClaw with:
agents:
  - id: mate
    model: anthropic/claude-opus-4-6
    mcp_servers:
      - name: elec-mate
        transport: http
        url: https://agent.elec-mate.com/mcp
        headers:
          Authorization: 'Bearer ${USER_JWT}'
    workspace:
      - SOUL.md # = SKILL.md + SECURITY.md + RAILS.md
      - AGENTS.md
```

Option B — stdio (OpenClaw Gateway on the VPS):

```yaml
# Single OpenClaw gateway serving multiple electricians
agents:
  - id: electrician-001
    model: anthropic/claude-opus-4-6
    mcp_servers:
      - name: elec-mate
        command: node
        args: [/opt/elec-ai-mcp/dist/server.js]
        env:
          MCP_TRANSPORT: stdio
          MCP_USER_JWT: '${ELECTRICIAN_001_JWT}'
          SUPABASE_URL: https://jtwygbeceundfgnkirof.supabase.co
          SUPABASE_ANON_KEY: '${SUPABASE_ANON_KEY}'
    workspace:
      - SOUL.md
      - AGENTS.md
```

---

### Phase 3: In-App UI

**What:** React screens for managing the Business AI subscription and viewing agent activity.

**Screens:**

- **Onboarding flow** — Subscribe → setup preferences → connect OpenClaw → done
- **Activity log** — Reads `agent_activity_log` table, shows what Mate did today
- **Settings** — Preferences, daily limits, connected integrations, kill switch

These are standard React components calling Supabase — straightforward once the backend exists.

---

## External Dependencies

| Dependency            | Action                             | Lead Time  |
| --------------------- | ---------------------------------- | ---------- |
| **Hetzner VPS**       | Provision CX31                     | 1 day      |
| **Cloudflare DNS**    | Add `agent.elec-mate.com` A record | 1 hour     |
| **Let's Encrypt SSL** | certbot on VPS                     | 10 minutes |
| **Anthropic API key** | Production key with spend limits   | 1 day      |
| **OpenClaw access**   | Install + configure                | 1 day      |

**What we DON'T need anymore:**

- ~~Twilio account~~ (OpenClaw handles messaging)
- ~~Meta Business verification~~ (OpenClaw handles WhatsApp)
- ~~Google OAuth verification~~ (for later, not MVP)
- ~~ICO registration~~ (already covered by existing app)
- ~~Docker container orchestration~~ (OpenClaw manages agents)

---

## Beta MVP — What 5 Users Get

**Week 1 (core — just needs VPS + OpenClaw):**

- "What's my day look like?" / schedule queries
- BS 7671 regulation lookups via RAG
- Read jobs, certificates, invoices, clients
- Basic conversation (ask Mate anything)

**Week 2 (pipeline actions):**

- Generate and send quotes
- Invoice chasing (get_overdue_invoices)
- Certificate delivery
- EICR renewal reminders

**Week 3+ (integrations):**

- Email lead monitoring
- Quote follow-up automation
- Expense logging
- Calendar management

---

## Verification Checklist

After each phase:

1. **MCP Server (done):**
   - [x] `tools/list` returns 53 tools for electrician, 21 for apprentice
   - [x] Each tool call validates inputs, checks rate limits, logs to audit trail
   - [x] Edge function calls blocked unless on allowlist
   - [x] Financial safeguards active on invoicing tools
   - [x] Certificate safeguards active on send tools
   - [x] Compiles clean, 0 vulnerabilities, 149 deps

2. **VPS + OpenClaw:**
   - [ ] `curl https://agent.elec-mate.com/health` returns `{"status":"ok"}`
   - [ ] OpenClaw connects to MCP server, `tools/list` works
   - [ ] Send "what's my day look like?" via WhatsApp → agent responds with calendar
   - [ ] Rate limiting triggers at 200/hr

3. **In-App UI:**
   - [ ] Subscribe to Business AI → `business_ai_enabled = true` in Supabase
   - [ ] Activity log shows tool calls from agent
   - [ ] Kill switch immediately stops agent responses
