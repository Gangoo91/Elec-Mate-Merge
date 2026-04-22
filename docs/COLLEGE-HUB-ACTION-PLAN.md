# College Hub — Best-in-Class Action Plan

_Last updated: 2026-04-22_

## North star

Make Elec-Mate's College Hub the **clear best-in-class product** for UK electrical colleges and training providers delivering apprenticeship and FE courses. Every feature we ship should be either:

1. **Compliance-critical** (ESFA, Ofsted, awarding body) — saves them from losing funding or grade
2. **Time-saving** (automates something tutors currently do in Excel) — saves them hours per week
3. **Revenue-generating** (lets them onboard more learners per tutor, win employer contracts) — helps them grow

If it's none of the three, don't build it.

---

## Where we are today (2026-04-22)

### ✅ Shipped and solid

- Complete editorial design system (primitives + tone tokens)
- 4 hubs + dashboard + 20+ sections redesigned end-to-end
- Data integrations live: Supabase (students, cohorts, attendance, ILPs, EPA, grades, lesson plans)
- AI infrastructure: Claude-based MCP server with 122 tools, multi-tenant agent routing
- AI widgets live on dashboard: At-Risk Predictor, EPA Gateway Countdown, Activity Feed

### ⚠️ Polish outstanding

| Area | State | Effort |
|---|---|---|
| Remaining partial page interiors (Student360, AI ILP, IQA, Batch, Assess Calendar, LTI, Employer) | Heroes + KPI strips done, body interiors still old | ~1 day |
| ~25 dialogs/sheets | Still icon-heavy old style | ~1 day |
| Widget full views (EPACountdown, ActivityFeed) | Compact done, full views half-updated | 4 hours |
| Legacy `CollegeFeatureTile` + `CollegeSectionHeader` | Unused now — delete | 30 min |

### ❌ Gaps vs market leaders

Competitors: OneFile, Aptem, BUD, Smart Apprentices, Tribal Group's ebs / Maytas, MAPAL OneTouch.
They all have: ESFA/ILR submission, awarding body integration, employer portals with e-signatures, mobile app for apprentices.

We have the design lead. We need the compliance and integration depth.

---

## Priority 0 — Polish (must ship before any new feature)

| Ticket | Effort | Why |
|---|---|---|
| Finish partial page interiors (8 files) | 1 day | Visual inconsistency kills the demo |
| Dialog/sheet sweep (25 files, icon removal + primitive styling) | 1 day | Same |
| Widget full-view rewrites (EPACountdown, ActivityFeed) | 4 hours | Detail pages look dated |
| Delete legacy `CollegeFeatureTile`, `CollegeSectionHeader` | 30 min | Dead code |
| Accessibility audit (focus states, aria-labels on all text buttons) | 4 hours | Needs keyboard navigation parity |
| Light/dark mode audit across new primitives | 2 hours | Currently dark-only tested |

**Total: ~3 days focused.**

---

## Priority 1 — Compliance & essential integrations (ship Q2 2026)

These are the table stakes. Without them colleges can't use us as their primary system.

### 1a. ESFA ILR (Individualised Learner Record) export
- **Why:** Monthly funding submission — if they can't submit ILR from our system they'll keep paying their old SIS. Mandatory for funding.
- **What:** CSV and XML export that matches current ILR schema (2025-26 spec). Covers learner, employment, learning delivery, achievement records. Validation against ESFA error list before export.
- **Scope:** ESFA provides reference packs and validator. Format is stable year-to-year but changes each Aug.
- **Effort:** 2–3 weeks (schema implementation, validation, export UI, reconciliation tools)
- **Who uses it:** Data/MIS manager, once a month. High-value, low-usage feature.
- **Risk:** Each academic year ESFA updates spec. Must maintain. Build schema as versioned.
- **Ticket:** ELE-NEW-001

### 1b. Apprenticeship Service API integration
- **Why:** Where employer levy accounts live. Colleges need to draw funding. Currently a manual upload exercise.
- **What:** OAuth against Apprenticeship Service, pull employer account balance, push training commitments, sync apprentice status.
- **Scope:** Partner status with ESFA required — you apply via `manage-apprenticeship-funding`. Sandbox then prod.
- **Effort:** 3 weeks (partner onboarding overhead + implementation)
- **Ticket:** ELE-NEW-002

### 1c. ePortfolio sync (OneFile / Aptem / BUD)
- **Why:** Most colleges already pay for one of these. They won't rip it out — they need Elec-Mate alongside it. Two-way sync = we become the central hub, they keep their ePortfolio.
- **What:** OAuth/API key → read evidence records → write grade decisions back. Webhook subscriptions for real-time.
- **Scope:** One vendor at a time. **Start with OneFile** — biggest UK market share, best API docs.
- **Effort:** 3 weeks per vendor (OneFile, Aptem, BUD = 9 weeks total)
- **Ticket:** ELE-NEW-003, ELE-NEW-004, ELE-NEW-005

### 1d. Awarding body portals
- **Why:** Learner registration with City & Guilds / EAL / NOCN is manual data re-entry. Huge time sink.
- **What:** Register learners against qualification, claim unit certifications, submit achievement.
- **Start with:** **City & Guilds Walled Garden** (largest UK electrical AO) + **EAL** (second largest for electrical).
- **Effort:** 4 weeks per AO. C&G has REST API; EAL is mixed REST + CSV upload.
- **Ticket:** ELE-NEW-006 (C&G), ELE-NEW-007 (EAL)

### 1e. Microsoft Graph (Teams, Outlook Calendar, OneDrive)
- **Why:** ~70% of UK FE colleges are on Microsoft 365 tenants. SSO + "create Teams meeting from a lesson" + "attach OneDrive file as lesson resource" = immediate adoption win.
- **What:** OAuth against college tenant, read calendar, create Teams meeting URLs, drive file picker.
- **Effort:** 2 weeks
- **Ticket:** ELE-NEW-008

### 1f. Google Workspace for Education (Classroom, Calendar, Drive, Meet)
- **Why:** Second tenant — 15–20% of UK colleges, growing in apprentice-focused providers.
- **Effort:** 2 weeks (reusing Microsoft integration pattern)
- **Ticket:** ELE-NEW-009

---

## Priority 2 — Electrical-course differentiators (ship Q2–Q3 2026)

This is where we beat generic platforms. Nobody else does these electrical-specific workflows well.

### 2a. Practical observation grader (phone-first app)
- **Why:** Tutors currently use paper checklists in workshops. Transfer to computer later. 30 mins admin per student per week lost.
- **What:** Tutor's phone → workshop mode → checklist of competencies (consumer unit wiring, ring final circuit, testing) → photo capture → offline-capable → sync later → auto-logged to portfolio.
- **Differentiator:** Built for electrical specifically — pre-loaded EAL/C&G/BTEC practical rubrics.
- **Effort:** 3 weeks (UI, offline sync, rubric templates, photo upload)
- **Ticket:** ELE-NEW-010

### 2b. AM2/AM2E tracker (Installation Electrician EPA)
- **Why:** The defining EPA for apprentice electricians. Generic EPA tracker isn't specific enough.
- **What:** Dedicated AM2/AM2E rubric: containment, wiring, termination, inspection, testing, fault finding. Task-by-task scoring against NET (National Electrotechnical Training) grading criteria.
- **Effort:** 2 weeks
- **Ticket:** ELE-NEW-011

### 2c. Test instrument data capture (Megger / Fluke / Metrel)
- **Why:** Meters output CSV/BLE. Learner uploads test results → auto-parses → auto-marks against expected values.
- **What:** File upload (CSV/OSF/JSON from meter apps) → parse → populate test schedule → AI compares to expected values → highlight anomalies.
- **Supported meters:** Megger MFT Series (MegTrack export), Fluke 17xx (Fluke Connect export), Metrel Eurotest (ES Manager export). All have documented CSV schemas.
- **Effort:** 3 weeks (parsers per vendor + UI + audit trail)
- **Ticket:** ELE-NEW-012

### 2d. Calculation auto-marker (cable sizing, voltage drop)
- **Why:** BS 7671 calculations are a huge part of electrical qualifications. Marking 30 cable calc homeworks = 90 mins per tutor per week.
- **What:** Learner photos handwritten calculation OR enters numbers. Claude API checks against expected answer from your existing `design_knowledge` RAG. Partial credit for working.
- **Effort:** 2 weeks (UI + prompt engineering + RAG integration — you already have the RAG)
- **Ticket:** ELE-NEW-013

### 2e. Circuit diagram review (photo → AI marks)
- **Why:** Students draw wiring diagrams on paper. Tutors mark manually. Slow.
- **What:** Upload pencil sketch or photo. Claude vision extracts components, compares to correct diagram, flags errors.
- **Effort:** 3 weeks (vision prompt engineering, error highlighting UI)
- **Ticket:** ELE-NEW-014

### 2f. Tool loan register
- **Why:** Colleges lend Meggers, test leads, PAT testers. Constantly lost. College's insurer requires audit trail.
- **What:** Asset register + QR-code scan-out/scan-in + overdue alerts + PAT test date tracking.
- **Effort:** 1.5 weeks
- **Ticket:** ELE-NEW-015

### 2g. Workshop H&S induction log
- **Why:** Critical for Ofsted + HSE compliance. Under-18s especially.
- **What:** Student enters workshop → QR scan → acknowledges H&S briefing (age-appropriate) → logged.
- **Effort:** 1 week
- **Ticket:** ELE-NEW-016

### 2h. Board sign-off workflow
- **Why:** Student wires a consumer unit — photo + test results + tutor sign-off → permanent portfolio evidence.
- **What:** Structured evidence flow: photos → auto-watermark with learner ID + date + supervisor → test readings → tutor signs with assessor ID → archived to evidence immutable log.
- **Effort:** 2 weeks
- **Ticket:** ELE-NEW-017

---

## Priority 3 — AI features that sell (ship Q3 2026)

These demo brilliantly and are already 60% built thanks to existing MCP infrastructure.

### 3a. NotebookLM-style teaching notebook (real wiring)
- **Why:** Sales demo winner. We already have the UI. Wire it to Claude Files API + pgvector sources.
- **What:**
  - Upload PDFs, Word docs, slides, YouTube links per notebook
  - Ingest via PDF parser → chunks → embeddings (OpenAI text-embedding-3 or Voyage) → pgvector
  - Chat: Claude with retrieval from source store, citations per response
  - "Quick actions" tiles wired: summary / quiz / study guide / lesson outline
- **Effort:** 1 week (existing UI + existing MCP + supabase has pgvector already)
- **Ticket:** ELE-NEW-018 — **starting today**

### 3b. AI ILP generator (real wiring)
- **Why:** Existing UI is a shell. Wire to Claude for genuine SMART target generation from learner data.
- **What:** Feed Claude: progress data + attendance + recent grades + previous ILP → structured SMART targets + review narrative.
- **Effort:** 3 days
- **Ticket:** ELE-NEW-019

### 3c. Ofsted SEF draft generator
- **Why:** Every college writes Self-Evaluation Forms annually. 20–40 hours per SEF currently. Claude can draft it from Quality Dashboard data.
- **What:** Button on Quality Dashboard → Claude consumes all the metrics + evidence + alerts → produces structured SEF narrative against Intent/Implementation/Impact framework.
- **Effort:** 1 week (prompt engineering is the main work)
- **Ticket:** ELE-NEW-020

### 3d. Daily tutor digest email
- **Why:** Morning email: "Sam absent 3rd day, Julia ILP overdue, grade 4 assessments from yesterday". Becomes the tutor's dashboard without opening the app.
- **What:** Scheduled edge function → reads tutor's cohort state → Claude summarises in 200 words → sends via Resend/Postmark.
- **Effort:** 4 days
- **Ticket:** ELE-NEW-021

### 3e. Command palette action verbs
- **Why:** ⌘K exists. Extend to: "grade sam smith distinction", "mark cohort 3 delivered", "call nathan".
- **What:** Parse intent via Claude or regex → execute action. Massive power-user feature.
- **Effort:** 1 week
- **Ticket:** ELE-NEW-022

---

## Priority 4 — Employer/apprentice engagement (Q3–Q4 2026)

### 4a. Employer mobile portal
- **Why:** Weekly timesheet sign-off is currently email/paper. Massive friction. Employer app drives OTJ data directly.
- **What:** Simplified mobile web app — employer logs in, sees their apprentices, signs off timesheet, books workplace visit, gets weekly digest.
- **Effort:** 3 weeks
- **Ticket:** ELE-NEW-023

### 4b. Apprentice mobile app
- **Why:** Learners currently use separate ePortfolio apps. Own our chain.
- **What:** Existing Capacitor app already deployed (v1.0.3). Add college-hub workflows: submit evidence, check attendance, message tutor.
- **Effort:** 4 weeks (leverages existing app + existing college data layer)
- **Ticket:** ELE-NEW-024

### 4c. Parent/guardian portal (under-18s)
- **Why:** Safeguarding. Apprentices 16–18 legally need parental updates. Currently no comms path.
- **What:** Parent email signup → weekly attendance digest, auto-alert on flagged absence, Ofsted compliance.
- **Effort:** 1.5 weeks
- **Ticket:** ELE-NEW-025

### 4d. Safeguarding incident log
- **Why:** Ofsted-critical. Currently no visible module.
- **What:** Restricted-access log for DSL (Designated Safeguarding Lead). Incident capture, classification, action tracking, mandatory reporting thresholds.
- **Effort:** 2 weeks (compliance review + UI)
- **Ticket:** ELE-NEW-026

### 4e. DocuSign training plan & commitment statements
- **Why:** Legally required signatures for each apprentice from employer + learner + provider. Currently paper.
- **What:** DocuSign API → generate training plan PDF → route for signature → archive signed copy.
- **Effort:** 1.5 weeks
- **Ticket:** ELE-NEW-027

---

## Priority 5 — Admin, data & analytics (Q4 2026)

### 5a. Power BI / Looker Studio data export
- **Why:** MIS managers run the board reports from their BI tool of choice.
- **What:** Read-only BigQuery-compatible data connector or REST API that exports cohort, attendance, progression data.
- **Effort:** 1 week
- **Ticket:** ELE-NEW-028

### 5b. Xero / QuickBooks finance sync
- **Why:** Apprentice levy invoicing, commercial course invoicing currently manual.
- **What:** Create invoice on course enrolment, sync payment status.
- **Effort:** 2 weeks per platform
- **Ticket:** ELE-NEW-029 (Xero), ELE-NEW-030 (QB)

### 5c. Twilio SMS / WhatsApp alerts
- **Why:** Attendance alerts to employer/learner/parent. Currently manual.
- **What:** Rule engine: "if attendance < 80% for 2 weeks, SMS employer". Already have WhatsApp infrastructure on VPS.
- **Effort:** 1 week
- **Ticket:** ELE-NEW-031

### 5d. Advanced reporting — Tutor workload, achievement gap analysis
- **Why:** Colleges obsess over these. Currently done in Excel.
- **What:** Prebuilt reports: hours taught per tutor, marking turnaround per tutor, achievement gap by demographic, retention by cohort.
- **Effort:** 2 weeks
- **Ticket:** ELE-NEW-032

---

## Priority 6 — Nice-to-haves (Q1 2027+)

- Kahoot/Quizizz/Mentimeter integration (in-lesson polls)
- Calendly integration (tutorial booking)
- Zapier / n8n / Make (escape hatch for niche workflows)
- Zoom integration (observations)
- SmartScreen (City & Guilds) content embedding
- NICEIC / NAPIT assessor verification
- Meter calibration tracking
- PAT testing register
- Industry placement matcher
- Learner destination tracking (DfE Destinations & Destinations Measures)

---

## Suggested quarterly rollout

### Q2 2026 — Foundation (now → end of June)
1. Finish Priority 0 polish (3 days)
2. **ELE-NEW-018** NotebookLM wiring (1 week — sales demo win)
3. **ELE-NEW-001** ESFA ILR export (3 weeks — must-have for serious colleges)
4. **ELE-NEW-008** Microsoft Graph SSO (2 weeks)
5. **ELE-NEW-003** OneFile sync (3 weeks)
6. **ELE-NEW-010** Practical observation grader (3 weeks)
7. **ELE-NEW-011** AM2/AM2E tracker (2 weeks)

### Q3 2026 — Differentiators
1. **ELE-NEW-006** City & Guilds Walled Garden (4 weeks)
2. **ELE-NEW-012** Meter data capture (3 weeks)
3. **ELE-NEW-019** AI ILP generator real wiring (3 days)
4. **ELE-NEW-020** Ofsted SEF generator (1 week)
5. **ELE-NEW-021** Daily tutor digest (4 days)
6. **ELE-NEW-013, 014** Calc + diagram markers (5 weeks)
7. **ELE-NEW-023** Employer mobile portal (3 weeks)

### Q4 2026 — Depth & reach
1. **ELE-NEW-002** Apprenticeship Service API (3 weeks)
2. **ELE-NEW-024** Apprentice mobile app (4 weeks)
3. **ELE-NEW-025** Parent portal (1.5 weeks)
4. **ELE-NEW-026** Safeguarding log (2 weeks)
5. **ELE-NEW-027** DocuSign (1.5 weeks)
6. **ELE-NEW-015, 016, 017** Tool loan + H&S + board sign-off (4.5 weeks)
7. **ELE-NEW-029** Xero sync (2 weeks)

### Q1 2027 — Scale
- Remaining ePortfolio vendors (Aptem, BUD)
- EAL / NOCN integrations
- Reporting suite
- Advanced analytics

---

## Commercial positioning

### Target buyer
- **Small private training providers** (5–50 tutors, 100–800 apprentices) — underserved, fastest sales cycle, most pain
- **FE colleges running apprenticeships** (bigger, slower sales, higher ACV)
- **Employer training academies** (big corporates running their own apprentice schemes)

### Pricing hypothesis (needs validation)
- **Starter** — £400/month — up to 100 apprentices, core hub, no integrations
- **Growth** — £1,200/month — up to 500 apprentices, ESFA ILR, OneFile sync, Microsoft SSO, mobile app
- **Enterprise** — from £3,500/month — unlimited apprentices, all integrations, dedicated CSM, custom AI prompts

Competitor ACVs (from public data):
- OneFile: ~£1k/year per learner for their ePortfolio-only product
- Aptem: £20k–£80k per annum per provider
- Tribal ebs: £60k+ per annum

### Demo script order
1. Open College Dashboard — editorial design wins immediately vs competitors
2. Click AI Notebook — upload a PDF of EAL unit spec — ask a question — **wow moment**
3. Click AI ILP Generator — select a learner — generate SMART targets — **wow moment**
4. Show At-Risk Predictor — **"we told you 4 weeks ago that Sam was at risk"**
5. Show OneFile integration — "your existing evidence is already here"
6. Show ESFA ILR export — "file this Friday, takes 30 seconds"

---

## What success looks like

**By end of Q2 2026:**
- 10 pilot colleges using it daily
- Polish done, 2 priority integrations live (OneFile + Microsoft)
- NotebookLM + AI ILP demoing live
- 1 ESFA ILR submission made from the platform successfully

**By end of Q4 2026:**
- 50+ paying colleges
- £500k+ ARR
- Full ESFA/Apprenticeship Service compliance certification
- 3 ePortfolio sync integrations
- Mobile apps for apprentice + employer

**By end of Q1 2027:**
- 150+ colleges
- £1.5M ARR
- Market-leading in electrical-specific features
- Series A conversation
