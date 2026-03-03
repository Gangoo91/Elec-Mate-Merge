# FRONTEND.md — Frontend Agent Briefing

> Read CLAUDE.md first — it has the design system, build commands, and critical rules.
> This file adds context on what needs doing, architecture details, and known issues.

## Stack

- React 18 / Vite 5 / TypeScript / Tailwind CSS
- ShadcnUI components (`src/components/ui/`)
- Supabase (auth, database, edge functions, storage)
- Capacitor (native iOS/Android wrapper)
- Framer Motion (animations), Recharts (charts), react-swipeable

## Architecture

### Entry Points

```
src/main.tsx → src/App.tsx → src/AppRouter.tsx
```

### Route Groups (all lazy-loaded)

```
/                              → LandingPage
/dashboard                     → Dashboard (main hub)
/electrician/*                 → ElectricianHubRoutes (tools, business, materials)
/electrician/inspection-testing/* → InspectionRoutes (certificates)
/apprentice/*                  → ApprenticeRoutes (learning, OJT, portfolio)
/study-centre/*                → StudyCentreRoutes (courses, upskilling)
/college/*                     → CollegeDashboard
/employer/*                    → EmployerDashboard
/admin/*                       → AdminPanel (25 sub-routes)
```

### Source Layout

```
src/
├── components/            # 6,500+ files
│   ├── upskilling/        # CPD course content
│   ├── apprentice/        # Apprentice learning
│   ├── electrician-tools/ # Calculators, AI tools
│   ├── inspection/        # EICR/EIC/cert forms (see WARNING below)
│   ├── electrician/       # Business hub
│   ├── employer/          # Employer portal
│   ├── ui/                # Shadcn components
│   ├── eicr/              # LIVE EICR form components
│   ├── eic/               # LIVE EIC form components (35 files)
│   └── install-planner-v2/# AI planner (active)
├── pages/                 # Route page components
├── hooks/                 # Custom React hooks
├── utils/                 # Shared utilities
├── types/                 # TypeScript types
├── routes/                # Route definitions
├── data/                  # Static data files
├── lib/                   # Library wrappers (supabase client etc.)
└── services/              # API service layers
```

### WARNING: Inspection Form File Confusion

There are LIVE and UNUSED duplicate directories for certificates. Edit the wrong one and nothing changes for users.

**LIVE (users actually see these):**
| Form | Entry Component | Components Dir |
|------|----------------|----------------|
| EICR | `src/components/EICRForm.tsx` | `src/components/eicr/` |
| EIC | `src/components/EICForm.tsx` | `src/components/eic/` |
| Minor Works | `src/components/MinorWorksForm.tsx` | — |

**UNUSED (do NOT edit for live changes):**

- `src/components/inspection/eic/` — duplicate, not imported
- `src/components/inspection/eicr/` — duplicate, not imported
- `src/pages/inspection/EICCertificate.tsx` — not routed

The I&T hub is `src/pages/inspection/InspectionIndex.tsx` at `/electrician/inspection-testing`. It uses **query params** (`?section=eicr`, `?section=eic`, `?section=minor-works`) to render forms.

Newer cert types (Fire Alarm, EV, Emergency Lighting, Solar PV, PAT) use dedicated routes in `InspectionRoutes.tsx` with their own pages in `src/pages/inspection/`.

## Supabase

- **Project ref:** `jtwygbeceundfgnkirof`
- **URL:** `https://jtwygbeceundfgnkirof.supabase.co`
- **Client:** `src/lib/client.ts`
- 277 tables, 316 edge functions

### Key Tables

- `profiles` — user accounts (27 users)
- `reports` — ALL certificates (EICR, EIC, Minor Works, Fire Alarm, etc.). `report_type` uses hyphens
- `spark_tasks` — Spark to-do items
- `quotes` — quotes AND invoices (`invoice_raised=true` = invoice)
- `pricing_embeddings` — trade pricing RAG data
- `practical_work_intelligence` — labour timing RAG data
- `regulations_intelligence` — BS 7671 regulation data (ALWAYS query this before writing electrical content)

### Edge Function Pattern

```bash
npx supabase functions deploy <name> --project-ref jtwygbeceundfgnkirof
```

Every edge function needs: CORS headers, try/catch, auth verification. See CLAUDE.md for the pattern.

### AI Edge Functions (OpenAI)

- Model: `gpt-5-mini-2025-08-07`
- MUST use `max_completion_tokens` (NOT `max_tokens`)
- MUST use tool calling for structured JSON output
- Do NOT send `temperature`
- Canonical helper: `supabase/functions/_shared/ai-providers.ts`

## Code Patterns

### Auto-Save System

```
localStorage (10s) → Cloud sync (30s debounce) → beforeunload (emergency)
```

- `syncNowImmediate`: cancel debounce → wait for in-flight → capture ref → pass via `dataOverride`
- NEVER read localStorage inside `syncToCloud` — use the `dataOverride` parameter
- Reference implementation: `EmergencyLightingCertificate.tsx`

### Report Type Detection (`reportCloud.ts`)

- `reportId` prefix determines type: `fire-alarm-*`, `emergency-lighting-*`, etc.
- Status checks type-specific signatures, NOT generic `engineerSignature`

### Certificate Routes

- New cert types: React Router in `InspectionRoutes.tsx`
- Legacy types (EICR/EIC/MW): `onNavigate(type)` callback

### EICR JSON Formatter

- Outputs nested groups AND flat top-level copies for PDF compatibility
- camelCase form fields → snake_case PDF template keys
- Wizard stores compact codes ('1P'), Manual stores separate fields
- `distributionBoards[0]` is main board (boardIndex === 0)

## Mandatory Rules

1. **UK English only** — colour, centre, organisation, licence, programme, metre
2. **NEVER use grey/faded text** — all text must be `text-white` (no `text-white/40`, `text-white/55`, `text-white/60`, `text-white/70`)
3. **44px min touch targets** — use `h-11` minimum, `touch-manipulation` on everything interactive
4. **Bottom sheets not modals** — use `Sheet` with `side="bottom"` for tools/pickers
5. **Mobile-first** — electricians use this on job sites, must feel like a native app
6. **Always ask before acting** — explain what you'll do, get approval, then do it

## Priority Tickets (from Linear)

### Bugs — Fix These First

| ID      | Title                                                             | Priority |
| ------- | ----------------------------------------------------------------- | -------- |
| ELE-211 | EIC PDF — Zdb/Ipf fields blank on generated PDF                   | Urgent   |
| ELE-210 | Minor Works — false positive validation (can't submit valid form) | Urgent   |
| ELE-196 | SPD field doesn't allow N/A entry                                 | High     |
| ELE-195 | EIC — false positive validation warnings blocking submission      | High     |
| ELE-194 | Copy EICR to EIC produces blank PDF                               | High     |
| ELE-193 | View All certificates — some PDFs blank                           | High     |
| ELE-190 | EIC to EICR conversion — form shows blank                         | High     |
| ELE-189 | EICR form shows blank when opened from My Certificates            | High     |

### Audits — Review & Fix

| ID      | Title                            | Notes                                          |
| ------- | -------------------------------- | ---------------------------------------------- |
| ELE-116 | EICR PDF field mapping audit     | Check all fields map to PDF template correctly |
| ELE-24  | Solar PV Certificate audit       | Review form completeness                       |
| ELE-23  | Fire Alarm Certificate audit     | Review form completeness                       |
| ELE-22  | Minor Works Certificate audit    | Review form completeness                       |
| ELE-20  | Inspection & Testing full review | Comprehensive I&T review                       |

### Features — After Bugs

| ID      | Title                                    | Notes                                                    |
| ------- | ---------------------------------------- | -------------------------------------------------------- |
| ELE-25  | Board Scanner — three-phase improvements | Enhance existing scanner                                 |
| ELE-18  | Full redesign of all calculators         | Major — `src/components/electrician-tools/`              |
| ELE-125 | Business AI tier                         | RevenueCat integration + feature gating (Stripe/DB done) |

## Build

```bash
npm run dev       # Dev server
npm run build     # Production build (82MB JS, 2,878 chunks)
npm run lint      # ESLint
npm run preview   # Preview production build
```

## Git

- **Repo:** `Gangoo91/Elec-Mate-Merge`
- **Branch:** `main`
- Push to `origin main` when asked

## What NOT to Touch

- `services/elec-ai-mcp/` — MCP server (backend, runs on VPS)
- `supabase/functions/` — only if explicitly asked (edge functions need special deploy)
- `src/components/install-planner/` — v1, likely dead code (v2 is active)
- Database schema changes — discuss first
