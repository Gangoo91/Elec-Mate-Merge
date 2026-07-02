<!-- Generated 2026-05-28. Updated 2026-07-02 (full 10-area code audit): QS review system, CIS/reverse-charge + accounting sync, site-visit live pricing + wholesaler RFQ, project handover packs, Employer Mate + Worker Tools + hiring marketplace, apprentice Today/tab bar, renewables designers, college EPA AI + LTI, founder story. Structured to mirror the in-app sidebar navigation. Deduplicated: features are described once, in their home hub. -->

# Elec-Mate — Product Feature Catalogue

Elec-Mate is a mobile-first platform that supports a UK electrician across their whole working life — from apprentice training and exam prep, through certification, quoting and running a business, to professional upskilling, career identity and wellbeing. This catalogue is organised the way the app itself is: by the main navigation hubs an electrician sees in the sidebar. Within the working electrician's **Electrical Hub**, the large areas — Inspection & Testing, the Business suite, AI Tooling and Calculators — are grouped as sub-sections so nothing is double-counted.

> **A note on the two "AI" things.** **Elec-AI** is the single in-app AI assistant — one chat, "ChatGPT for electrical", available from the sidebar. It is separate from **WhatsApp Mate**, the conversational agent that runs on Elec-Mate's own server and talks to electricians over WhatsApp. WhatsApp Mate is a separate product/service (covered at the end), not a screen inside the app.

## How the app is organised

| Sidebar hub | Who it's for | What it covers |
| --- | --- | --- |
| Dashboard | Everyone | Personalised home: status, alerts, quick actions, certificate tracking |
| Apprentice Hub | Apprentices | Learning, portfolio & off-the-job hours, AM2/EPA simulators, study mentor |
| Electrical Hub | Qualified electricians | The working surface: jobs, certificates, business, materials, calculators, AI tooling, safety |
| Elec-AI | Everyone | The in-app AI assistant (one chat) |
| Employer Hub | Employers / contractors | Workforce, compliance, RAMS, briefings, incidents |
| College Hub | Tutors / IQA / providers | Lesson planning, learners, marking, OTJ, Ofsted/compliance, reporting |
| Study Centre | Everyone | Safety & soft-skills CPD, plus advanced technical upskilling courses |
| Wellbeing | Everyone | Mental-health hub: mood, coping tools, crisis support, resources |
| Settings & Account | Everyone | Profile, Elec-ID, billing, preferences, privacy |
| Public site & SEO | Prospects | Marketing site, free guides, calculators and mock exams |
| Admin / Founder | Internal | Platform administration and founder onboarding |

---

---

## 1. Dashboard

The post-login home screen and the electrician's daily launchpad. It pulls everything that needs attention into one place so a busy tradesperson can act in seconds rather than hunting through menus.

| Feature | What it does | Route | Status |
| --- | --- | --- | --- |
| Dashboard Overview | A personalised home built from 40+ cards: welcome/hero, profile-completion status, live notifications, "smart actions" suggested from recent activity, quick-access tiles, business stats and upcoming certificate-expiry tracking. It is the glue that ties the hubs together. | `/dashboard` | ✅ |

---

---

## 2. Apprentice Hub

The Apprentice Hub is Elec-Mate's complete home for UK electrical apprentices — a single, mobile-first workspace that pulls a learner's whole apprenticeship into one place: their college plan, study progress, evidence portfolio, off-the-job hours, exam practice and an AI tutor that actually knows where they are in their course. The hub landing greets apprentices with a live "at a glance" strip (study streak, course progress, videos watched, diary entries), surfaces work set by their college tutor, and routes them into deep practice tools and reference guides. Everything is built thumb-first for use on site, with voice input, auto-fill, photo capture and instant feedback throughout — so logging evidence or asking a question takes seconds, not minutes.

### Home & daily overview

| Feature | What it does | Route(s) | Status |
|---|---|---|---|
| Apprentice Hub home | The editorial "shop window": rotating, time-of-day headline, tappable headline stats (streak, course %, videos, diary) each opening a detail sheet, and numbered editorial sections routing into every other tool. Daily use now starts on the Today page below. | `/apprentice` | ✅ live |
| Today dashboard *(new Jun 2026)* | The apprentice's daily front-door: greeting, a "What's next" recommendation engine (priority chain: overdue tutor quiz → new quiz → behind OTJ pace → keep the streak → start learning), a tappable stat strip (streak / week's OTJ hours / course % / awaiting sign-off), four quick actions (log hours, capture evidence, continue learning, quick quiz) and the From-your-college card. | `/apprentice/today` | ✅ live |
| Bottom tab bar *(new Jun 2026)* | Persistent 5-tab native navigation across all apprentice and Study Centre pages — Today · Learn · CAPTURE (raised centre button opening the evidence capture sheet) · Hours · Me. One thumb, one tap to any core surface. | all `/apprentice/*` + `/study-centre/*` | ✅ live |
| Weekly recap & achievements *(new Jun 2026)* | A weekly recap sheet rolling up learning activity, OTJ hours, evidence and diary entries, plus an achievement gallery of unlockable badges feeding the XP system. | `/apprentice` (sheets) | ✅ live |
| From your college card | A prominent card showing goals and quizzes set by the apprentice's college tutor, with live "new" and "overdue" badges, so set work is never missed. Links straight into the College Hub. | `/apprentice` → `/apprentice/college-plan` | ✅ live |
| Elec-ID banner | High-value account call-to-action surfaced on the hub for the apprentice's verified professional identity. | `/apprentice` | ✅ live |

### College Hub & college AI

| Feature | What it does | Route(s) | Status |
|---|---|---|---|
| My College Hub | The two-way link between apprentice and college. A hub-and-spoke landing showing the learner's course, a headline KPI strip (verified hours, open goals, quizzes, portfolio) and an "action required" strip, then eight focused sub-pages for the plan/ILP, off-the-job hours, quizzes, EPA brief and more. Goals set by tutors can be acknowledged and ticked off. | `/apprentice/college-plan`, `/apprentice/college/:section` | ✅ live |
| Assigned quizzes | Quizzes pushed by a college tutor appear with status (not started / in progress / overdue / completed) and open into a full quiz-taking experience that records the attempt back to the college. | `/apprentice/college/quiz/:id` | ✅ live |
| College AI study mentor | A dedicated AI mentor grounded in the apprentice's own progress — their assessment criteria, quiz attempts, off-the-job hours, portfolio and EPA data. Starter prompts ("What should I focus on this week?", "What ACs am I behind on?", "Draft a reflection from my last OTJ activity") drive a write-back loop that can produce real evidence and reflections, not just chat. | `/apprentice/college-ai` | ✅ live |
| Voice survey | Voice-led survey/feedback capture for the apprentice's college experience. | `/apprentice/voice-survey` | 🟡 partial |

### Portfolio workspace

| Feature | What it does | Route(s) | Status |
|---|---|---|---|
| Portfolio dashboard | A purpose-built evidence workspace organised around the qualification standard. Apprentices see every assessment criterion with its status, a coverage heatmap, a smart "today's focus" that ranks which criteria to capture next, an EPA gateway readiness pulse, recent evidence with thumbnails, and tutor sign-offs and comments — all in one tabbed view (Home / My Work / Progress / Me). | `/apprentice/hub` (tabs: `?tab=work`, `?tab=progress`, `?tab=me`) | ✅ live |
| Unified evidence capture | A voice-first, multi-file capture sheet: snap several site photos or attach documents in one go, dictate a description, and get an AI quality grade (A–D) per file with concrete tips to strengthen the evidence before it's filed against assessment criteria. | `/apprentice/hub` (capture sheet) | ✅ live |
| Qualification setup & sharing | Choose and change your qualification (which drives the whole portfolio view), and share a read-only portfolio view — supporting EPA gateway preparation. | `/apprentice/hub` | ✅ live |

### Off-the-job (OTJ) hours

| Feature | What it does | Route(s) | Status |
|---|---|---|---|
| Off-the-job hours hub | A defensibility-first OTJ tracker built around the apprenticeship standard's fixed hours requirement (e.g. 1,066 hours for ST0152, sourced per-standard rather than a generic 20% rule). Apprentices see week and year totals against gateway targets, a verification rate, a stacked "source mix" bar (in-app auto-tracked vs tutor-recorded vs employer-attested vs pending), and a compliance forecast that projects whether they'll clear the gateway at their current pace — with the weekly hours needed to catch up. | `/apprentice/ojt-hub`, `/apprentice/ojt` | ✅ live |
| Quick log with voice & AI | Log an activity by speaking it: dictate what you did, tap "AI structure" and it fills the title, activity type, duration and picks up unit codes, ready to submit to your tutor for sign-off. Auto-tracked in-app study and video time also counts toward hours. | `/apprentice/ojt-hub` (log sheet) | ✅ live |
| Employer attestation links | Generate a one-tap shareable link (native share or copy) so a site supervisor can confirm training hours from their own phone, flipping those hours to employer-attested. Rejected entries can be edited and resubmitted. | `/apprentice/ojt-hub` | ✅ live |

### Exam & assessment practice

| Feature | What it does | Route(s) | Status |
|---|---|---|---|
| AM2 simulator | A practical AM2 readiness suite: a readiness gauge plus four core simulators — an 8-step safe-isolation procedure, a testing-sequence simulator with a realistic multifunction tester (rotary dial, LCD, test buttons) and EIC certificate completion, a fault-finding simulator with circuit diagrams and a multimeter, and a knowledge test — plus a timed mock AM2 day and a focused drill mode. Sessions are scored and history is kept so apprentices can spot gaps before they book. | `/apprentice/am2-simulator` (modes via `?tab=`) | ✅ live |
| EPA simulator | End-Point Assessment practice with AI-powered mock sessions: a readiness dashboard, an AI professional-discussion simulator (with voice input, drawing on the apprentice's own portfolio entries), and an AI knowledge test that can drill a specific assessment criterion. Past attempts are scored with a predicted grade and can be submitted to a tutor as the apprentice's own self-assessment. | `/apprentice/epa-simulator` (tabs: readiness/discussion/knowledge/history) | ✅ live |
| Inspection & Testing hub | A dedicated apprentice-level inspection and testing learning area with guides, quizzes and BS 7671 reference across six modules. | `/apprentice/inspection-testing-hub`, `/apprentice/inspection-testing` | ✅ live |

### Ask Dave (AI tutor) & site diary

| Feature | What it does | Route(s) | Status |
|---|---|---|---|
| Ask Dave AI tutor | A conversational AI tutor styled as a master sparky, grounded in UK standards and the apprentice's own course criteria and practice history, so answers fit where the learner actually is. Supports image upload (ask about a photo), saved chat history, smart suggested questions, and a "daily tips" mode that can hand a topic straight to a chat. | `/apprentice/advanced-help` | ✅ live |
| Site diary | A daily site logbook with feed and calendar views, search, skill tagging, mood tracking and a streak counter. Full create/edit/delete, weekly summaries, and an AI diary coach that nudges entries toward portfolio evidence — linking site work to qualification criteria. Hardened Jun 2026: timezone-correct streaks, failed-save form retention, photos stored privately with signed display, and coach advice grounded in BS 7671:2018+A4:2026. | `/apprentice/site-diary` | ✅ live |
| Learning videos | A curated, categorised video library with an immersive inline player (no leaving the page), search, bookmarking and watch tracking that feeds the hub's "videos watched" stat and OTJ hours. | `/apprentice/learning-videos` | ✅ live |

### On-the-job tools & calculators

| Feature | What it does | Route(s) | Status |
|---|---|---|---|
| Electrical calculators | A large suite of trade calculators covering cable sizing, voltage drop, Zs values, earth-fault loop, adiabatic, maximum demand, RCD trip time, ring circuit, power factor and many more — each lazy-loaded for speed, with validation feedback and a calculation history. | `/apprentice/calculators`, `/apprentice/on-job-tools/calculations` | ✅ live |
| On-the-job tools hub | Quick-access site references for daily work — calculators, revision flashcards (cable colours, regs, EICR codes, safe isolation), testing procedures, a BS 7671 run-through, assessment guidance, safety cases, workplace culture and supervisor knowledge. | `/apprentice/on-job-tools` and sub-routes | ✅ live |
| Installation guides | Practical installation guidance organised by domestic, commercial, industrial and specialist work. | `/apprentice/on-job-tools/electrical-installation-guides/*` | ✅ live |

### Guidance, safety & professional development

| Feature | What it does | Route(s) | Status |
|---|---|---|---|
| Guidance area (toolbox) | A structured reference library covering apprenticeship expectations (year by year), off-the-job training, funding, end-point assessment, rights & pay, site jargon, portfolio building, communication skills, study tips, learning from mistakes and time management. Overhauled Jun 2026 into a tabbed 11-topic structure (~50 sub-pages) with a BS 7671 A4:2026 accuracy pass and tap-to-call trade helplines (Electrical Industries Charity, Lighthouse, Samaritans). | `/apprentice/toolbox` and sub-guides | ✅ live |
| Safety fundamentals | Six core safety knowledge modules: safe isolation, PPE & equipment, working at height, emergency procedures, risk assessment and site safety rules, with read-time estimates and emergency contacts. | `/apprentice/safety-fundamentals` and sub-pages | ✅ live |
| Professional development | Career planning content — career pathways, certifications, professional skills, continuing education and industry networking. | `/apprentice/professional-development` and sub-pages | ✅ live |
| Rights & pay | National wage tiers, on-site rights and support when things go wrong, with dedicated wages, rights, support and tools sub-pages. | `/apprentice/rights-and-pay` and sub-pages | ✅ live |
| Mental health & wellbeing | Wellbeing support hub with work-life balance, stress management, crisis resources, a support network and curated resources. | `/apprentice/mental-health` and sub-pages | ✅ live |

---

## 3. Electrical Hub

The Electrical Hub is the qualified electrician's complete working surface — everything from winning the job to certifying it and getting paid. It is the largest hub in the app, so the sections below are the areas *within* it. (Routes live under `/electrician/*`.)

---

### 3.1 Jobs, projects & field work

Everything a working electrician needs to run the day — from the first knock on the customer's door to the final signed-off completion — lives in one connected workspace. Elec-Mate ties tasks, projects, on-site capture, snagging, time and photos together so nothing slips: a timer tagged to a job flows straight into an invoice, an on-site voice walk-through becomes a priced scope, and a snag photographed in the van turns into a client-ready report. It is built mobile-first for the job site: thumb-friendly, fast, with offline-safe drafts, dictation and the in-app AI agent (Mate) on hand to draft, chase and tidy up.

#### Task & to-do management

| Feature | What it does | Route(s) | Status |
| --- | --- | --- | --- |
| Tasks | A fast, mobile to-do list built around what's actually pressing. Tasks auto-group by urgency (Overdue, Due Today, This Week, Upcoming) with live counts, filter tabs and swipe-to-complete. Add a task in one line, dictate it by voice (works on iOS and Android), or expand to a full form with priority, due date, customer, location and tags. | `/electrician/tasks` | ✅ live |
| Voice & quick add | A single quick-add bar takes a typed or spoken task and saves it instantly, then re-focuses so you can rattle off several in a row. Built-in dictation streams your words into the field as you speak. | `/electrician/tasks` | ✅ live |
| Task detail & photos | Tap any task for full detail, snooze presets (later today / tomorrow / next week), reopen, edit or delete — and attach job photos straight from the camera or library, with a full-screen lightbox to review them. | `/electrician/tasks` | ✅ live |
| Task templates | One-tap templates for the jobs you do over and over — chase a quote, chase payment, return a callback — pre-filled with sensible priorities and due dates. | `/electrician/tasks` | ✅ live |
| Mate task assistant | An always-on AI agent (Mate) that can read your current tasks and projects and propose, create, complete or delete them for you — including generating snagging lists — with the changes applied directly. | `/electrician/tasks` | ✅ live |

#### Projects (job hub)

| Feature | What it does | Route(s) | Status |
| --- | --- | --- | --- |
| Projects list | Bundle a whole job into one project — tasks, time, quotes, certificates, RAMS and invoices in one place. The list leads with money: live tiles for active value, completed work waiting to be billed, and value won this month, plus per-project progress bars. Create projects by type (rewire, EICR, new build, EV charging, fire alarm, consumer unit and more) or ask Mate to set one up for you. | `/electrician/projects` | ✅ live |
| Project detail hub | A single screen that pulls together everything tied to a job: task progress, total time logged, estimated and unbilled value, and collapsible sections linking site visits, tasks, quotes, invoices, certificates, RAMS, circuit designs and cost estimates — each able to link an existing record or spin up a new one pre-filled with the job's customer and address. | `/electrician/projects/:id` | ✅ live |
| Start timer / Ask Mate from a project | Start the time tracker pre-tagged to the job in one tap, or ask Mate what's outstanding. When unbilled time builds up, the project flags it and offers to draft an invoice for exactly those sessions. | `/electrician/projects/:id` | ✅ live |
| Project AI notes | Saved AI working notes and diagnostic photo summaries attached to the project for later reference. | `/electrician/projects/:id` | 🟡 partial |
| Project handover pack *(new Jun 2026)* | One-tap branded handover PDF for a finished job: a cover sheet (logo, scheme badge, project, customer, dates, value/spend/time cards) plus an expenses summary, with every linked certificate, quote and invoice merged in server-side — expired PDF links are regenerated on the fly — delivered as a secure 24-hour download link. | `/electrician/projects/:id` (Export pack) | ✅ live |
| Project expenses *(new Jun 2026)* | Link expenses to projects for a true per-job P&L: a Spend metric on project tiles, spend-by-category in the detail view, receipt capture, and invoice pre-fill from project expenses. | `/electrician/projects/:id` (Expenses) | ✅ live |
| Project actions sheet & AI-suggested links *(new Jun 2026)* | A unified bottom-sheet of project actions (add expense/task, link quote/invoice/cert/RAMS/site visit/design, export pack, complete, delete), plus AI-suggested linking of unlinked quotes, invoices, certs and site visits matched by customer or postcode — one-tap "Link all". | `/electrician/projects/:id` | ✅ live |

#### Site visits (pre-site to sign-off)

| Feature | What it does | Route(s) | Status |
| --- | --- | --- | --- |
| Site Visits hub | Every job captured in one list, from in-progress to signed. Search by address or customer, filter by status and property type, resume an unfinished walk-through from where you left off, and bulk-select to clear out old visits. Quick-create a pre-site or post-site visit in two taps. | `/electrician/site-visits` | ✅ live |
| Site visit wizard | A guided seven-step flow — Client, Property, Capture, Review, Scope, Generate, Sign-off — with auto-save throughout and draft recovery if you get interrupted, so a half-finished visit is never lost. | `/electrician/site-visit/new`, `/electrician/site-visit/:id` | ✅ live |
| Room-by-room capture | Walk the property room by room, adding items, photos, notes and smart prompts. Room templates speed up setup by property type, and a capture timer tracks how long the survey takes. | `/electrician/site-visit/new` | ✅ live |
| Voice capture mode | Speak the survey out loud and the app listens, detects natural pauses and auto-extracts items into the right room as you talk — hands-free on a live site. | `/electrician/site-visit/new` | ✅ live |
| Photo annotation | Mark up captured photos on a drawing canvas before they go into the scope or report, so issues are clearly flagged. | `/electrician/site-visit/new` | ✅ live |
| Scope, generate & quote hand-off | Build the scope of works with pre-populated assumptions, then run a one-tap Finalise that saves the visit, links or creates the customer, uploads photos into a documentation project, locks a scope baseline and produces a pre-start checklist — before handing straight off into the quote builder. Finalise operations are idempotent, so an interrupted visit resumes cleanly with no duplicates. | `/electrician/site-visit/new` | ✅ live |
| Live pricing engine *(new Jun 2026)* | The AI survey analysis now prices captured items with live material prices from UK wholesaler catalogues (Screwfix, CEF, Electrical Direct, Toolstation), showing an estimated total with confidence, and labour vs materials broken out — costs flow straight into the quote. | `/electrician/site-visit/:id` (Scope & Price) | ✅ live |
| Editable materials table *(new Jun 2026)* | The analysed materials list is fully editable inline on the review screen — tap any quantity, unit, price or description, add or remove lines — with the cost header recalculating live. | `/electrician/site-visit/:id` (Scope & Price) | ✅ live |
| Wholesaler RFQ *(new Jun 2026)* | Turn the materials list into a price-free, branded request-for-quotation and send it to saved wholesaler contacts in one go — BCC'd so merchants quote blind and compete. Add merchant reps by name and email; copy/WhatsApp fallbacks included. | `/electrician/site-visit/:id` (Scope & Price) | ✅ live |
| On-capture photo upload *(new Jun 2026)* | Site photos upload to cloud storage the moment they're taken, with automatic retry when signal returns — no lost photos if the app is backgrounded or killed mid-survey. | `/electrician/site-visit/new` | ✅ live |
| Client sign-off & completion | Finish the job in-app: capture after-photos, collect the client's signature on the device, generate a completion certificate PDF, and raise the invoice from the accepted quote — with live updates if the client signs remotely. | `/electrician/site-visit/:id?tab=post-job` | ✅ live |

#### Snagging

| Feature | What it does | Route(s) | Status |
| --- | --- | --- | --- |
| Snagging list | Track and resolve defects across all your projects, grouped by job with progress bars and filters for open, resolved and critical items. Capture each snag with priority, location, project link and up to six evidence photos. Multi-select to resolve or report in bulk. | `/electrician/snagging` | ✅ live |
| Snap-to-snag AI | Take a photo and the app drafts the snag for you — suggesting a title, priority, location and detail, with BS 7671 references surfaced where they apply. | `/electrician/snagging` | ✅ live |
| Send snag report | Generate a client-ready PDF report of selected snags — photos and standards references included — and email it directly to the customer with an optional personal note. | `/electrician/snagging` | ✅ live |

#### Time tracking

| Feature | What it does | Route(s) | Status |
| --- | --- | --- | --- |
| Time Tracker | A live job timer that survives the app being closed and resumes where it left off. Tag sessions to a project, add labels and notes on the fly, and see real-time value at your hourly rate. Hero tiles show time and value for today, this week, and what's waiting to be billed. | `/electrician/time-tracker` | ✅ live |
| Bill your time | Turn a session straight into an invoice — start a new one with the labour line pre-filled, add it to an existing draft, or multi-select several sessions and bundle them into one invoice, with each marked as billed automatically. Edit start/end times and re-tag projects after the fact. | `/electrician/time-tracker` | ✅ live |

#### Photo documentation

| Feature | What it does | Route(s) | Status |
| --- | --- | --- | --- |
| Photo Docs | Organise job photos into projects, capture straight from the camera, browse all photos, and share a project's photos with a client. An offline queue captures photos with no signal and uploads them automatically once you're back online, with a live pending-count badge. | `/electrician/photo-docs` | ✅ live |

#### Worker tools (employed electricians)

| Feature | What it does | Route(s) | Status |
| --- | --- | --- | --- |
| Worker Tools hub | A self-service hub for electricians employed by a firm, rebuilt Jun 2026 from bottom sheets into 14 fully routed pages: My Jobs, My Tasks, Timesheets, My Pay, Expenses, Leave, Comms, Credentials, Equipment, Reports, Sign-offs, Progress Notes, QS Review and Status. Two-way live connectivity with the Employer Hub (changes sync instantly both ways), an in-app notification centre (bell + inbox, realtime, unread badges), and push notifications that deep-link straight to the relevant tool page. | `/electrician/worker-tools/*` | ✅ live |

---

### 3.2 Inspection & Testing — the certification engine

This is the heart of Elec-Mate for the working electrician: a full suite of BS 7671 and industry certificates, condition reports, generation/renewables certs, fire & life-safety documents and the on-site notices that go with them — all built mobile-first for completion on a job. Shared intelligence runs across the forms: **circuit auto-fill and a board scanner** speed up schedules, **voice entry** lets you dictate readings hands-free, **live validation** flags non-compliant values against the regs, and every certificate produces a **branded, signed PDF** that can be emailed to the client or turned straight into a quote or invoice. A single dashboard tracks every certificate, and an expiry tracker turns lapsing certs into follow-up work. (Base path: `/electrician/inspection-testing`.)

**Core condition reports & certificates**

| Certificate | What it does | Route | Status |
| --- | --- | --- | --- |
| EICR — Electrical Installation Condition Report | The periodic inspection & test of an existing installation: guided inspection checklist, observation coding (C1/C2/C3/FI), full schedule of test results, circuit details, devices and earthing/bonding — the report landlords and duty-holders need. | `…?section=eicr` | ✅ |
| EIC — Electrical Installation Certificate | The certificate for new installations and major alterations: installation/supply details, distribution-board and circuit schedules, protective devices and the schedule of test results, with declarations for designer/constructor/inspector. | `…?section=eic` | ✅ |
| Minor Works Certificate (MEIWC) | The streamlined certificate for small additions or alterations to a single existing circuit — fast to complete for everyday work that doesn't warrant a full EIC. | `…?section=minor-works` | ✅ |
| Testing Only Certificate | A standalone testing record with test schedule and instrument-calibration details, for when only testing (not certification of new work) is required. | `…/testing-only/new` | ✅ |

**Schedules & supporting records**

| Feature | What it does | Route | Status |
| --- | --- | --- | --- |
| Board / Distribution Board Schedule | Generates circuit-to-board distribution schedules and printable consumer-unit door labels with device and RCD details. | `…/board-schedule` | ✅ |
| Board Scanner | Mobile-first capture that catalogues a distribution board from photos, identifying circuits and device configuration to pre-fill schedules. | integrated into EIC/EICR | ✅ |
| Test Sequence Builder | A step-by-step testing-sequence guide with progress tracking, reference panels and a checklist, so tests are done in the correct order. | integrated into forms | ✅ |
| Photo Evidence Manager | Capture, upload and organise photos as evidence against specific observations. | integrated into forms | ✅ |

**Renewables & generation**

| Certificate | What it does | Route | Status |
| --- | --- | --- | --- |
| Solar PV Installation Certificate | Certification for a PV system install and commissioning, aligned to MCS requirements. | `…/solar-pv/new` | ✅ |
| EV Charging Installation Certificate | Certificate for EV charge-point installation and commissioning per the IET Code of Practice (Part 722). | `…/ev-charging/new` | ✅ |
| BESS Certificate | Design and installation certification for a Battery Energy Storage System. | `…/bess/new` | ✅ |
| G98 Commissioning Certificate | EREC G98 commissioning for small embedded generators, with protection settings and DNO notification. | `…/g98-commissioning/new` | ✅ |
| G99 Commissioning Certificate | EREC G99 commissioning for larger embedded generators, with enhanced protection and DNO notification. | `…/g99-commissioning/new` | ✅ |

**Fire & life-safety**

| Certificate | What it does | Route | Status |
| --- | --- | --- | --- |
| Fire Alarm Certificates (5 variants) | A complete BS 5839 set — detection & warning, design, commissioning, inspection and modification certificates — covering the full lifecycle of a fire-alarm system. | `…/fire-alarm*/new` | ✅ |
| Emergency Lighting Certificate | Design, installation, commissioning and testing of emergency lighting to BS 5266, with luminaire autocomplete and validation. | `…/emergency-lighting/new` | ✅ |
| Lightning Protection Certificate | Design and installation certification for a lightning-protection system per BS EN 62305. | `…/lightning-protection/new` | ✅ |
| Smoke & CO Alarm Certificate | Installation and testing certification for smoke and carbon-monoxide alarms. | `…/smoke-co-alarm/new` | ✅ |
| PAT Testing Certificate | Portable Appliance Testing certification per the IET Code of Practice. | `…/pat-testing/new` | ✅ |

**On-site notices, labels & safe-working documents**

| Document | What it does | Route | Status |
| --- | --- | --- | --- |
| Danger Notice | Records dangers found during inspection — risk type, location, remedial action and isolation. | `…/danger-notice` | ✅ |
| Isolation Certificate | Authorises and records safe isolation of work per GS 38. | `…/isolation-certificate` | ✅ |
| Permit to Work | A control document authorising electrical work, with isolation requirements and precautions. | `…/permit-to-work` | ✅ |
| Limitation Notice | Records limitations on the scope of inspection/testing performed. | `…/limitation-notice` | ✅ |
| Non-Compliance Notice | Records non-compliances needing remedial action where there is no immediate danger. | `…/non-compliance-notice` | ✅ |
| Completion Notice | Documents completion of work and certification to the relevant standard. | `…/completion-notice` | ✅ |
| Warning Labels Generator | Produces electrical warning labels and signage with customisable text for on-site printing. | `…/warning-labels` | ✅ |
| Client Handouts | Generates client-facing guidance notes, safety information and system details to leave with the customer. | `…/client-handouts` | ✅ |
| Safe Isolation Guidance | Reference guidance on the safe-isolation procedure following GS 38. | `…/safe-isolation` | ✅ |

**Certificate management**

| Feature | What it does | Route | Status |
| --- | --- | --- | --- |
| Certificate Gallery & Reports | Browse, search, sort and bulk-manage every certificate with status tracking. | `…?section=certificates` | ✅ |
| New Certificate Selector | A single launch page to pick a certificate type, grouped into Electrical, Fire & Safety and Specialist. | `…/new` | ✅ |
| Defect Codes Reference | An at-a-glance reference for observation codes (C1/C2/C3/FI) used when coding EICR defects. | reference component | ✅ |
| Certificate Completion & Signing | The shared post-completion flow: e-signature capture, branded PDF generation, email distribution and one-tap conversion to a quote/invoice. | per certificate | ✅ |
| Certificate Expiry Tracker | Tracks and reminds on certificate expiry with client grouping and conversion metrics — turning renewals into booked work. | `/certificate-expiry` | ✅ |
| Learning Hub (within I&T) | Eight training modules (isolation, testing procedures, continuity, IR, RCD, fault finding, BS 7671 reference and assessments) sitting alongside the tools. | `…?section=learning-hub` | 🟡 |
| Legacy Certificates | A backward-compatibility view for older certificate records. | `…/legacy-certificates` | ⚠️ legacy |

**QS review & smart test schedules (new Jun 2026)**

| Feature | What it does | Route | Status |
| --- | --- | --- | --- |
| QS review workflow | Submit an EICR/EIC/Minor Works cert to a Qualifying Supervisor for counter-sign-off. The QS reviews the full certificate in-app, and on approval the cert auto-locks (preserving its content hash) with the QS counter-signature embedded in the PDF. | `…?section=qs-review` + per-cert sign-off tab | ✅ |
| Itemised QS comments | The QS leaves targeted comments against specific circuits or observations; the electrician replies in-thread and either side marks items resolved — no email chains around a certificate. | within QS review | ✅ |
| Auto-flagging of dubious circuits | AI pre-flags test-schedule circuits with questionable values for the QS's attention before sign-off. | within QS review | ✅ |
| One-tap QS self-sign-off | A business owner or designated principal QS can review and counter-sign their own firm's certs in one tap from the I&T hub bench. | `…?section=qs-review` | ✅ |
| AI observations, cited to A4:2026 | Flag a defect and get an AI-suggested classification code (C1/C2/C3/FI), description, remedial recommendation and the specific BS 7671:2018+A4:2026 regulation — accept fields individually or all at once. | within EICR/EIC observations | ✅ |
| R1+R2 expected-value auto-calc | Expected R1+R2 computed from cable type, length and ambient temperature at test — no lookup tables. | schedule of tests | ✅ |
| Max Zs RCD-aware quick-fill | One tap fills maximum Zs for every circuit from device type, curve and rating — RCD-aware per BS 7671, with the 80% cold-measured rule applied and recorded values validated against it. | schedule of tests | ✅ |
| Bulk quick-fills & duplicate row | Bottom-sheet panels bulk-fill RCD details or insulation-resistance values across all blank circuits in one tap; any circuit row can be duplicated (all device details cloned) for identical circuits. | schedule of tests | ✅ |
| Certificate versioning & lock bar | Approved certs store version snapshots with a lock bar showing status and QS approval date; older/locked versions remain downloadable. | per certificate | ✅ |
| Unified signatures | One stored e-signature reused across all schedules and declarations, including the EIC circuit schedule. | per certificate | ✅ |

---

### 3.3 Business suite — quoting, invoicing & money

The Business suite turns Elec-Mate into a back-office in your pocket. From one editorial Business Hub, electricians build professional quotes, raise invoices, chase late payers, log expenses and receipts, track van and garage stock, and keep a full customer book — all designed thumb-first for the job site. Quotes flow seamlessly into invoices, invoices accept card payments and sync to your accounts, and a state-aware dashboard tells you at a glance what you're owed, what's overdue, and how your win rate is trending. Running through it all is Mate, the in-app AI partner that drafts quotes from a photo, answers regulation questions, and logs the admin while you keep your hands on the tools.

#### Command centre

| Feature | What it does | Route(s) | Status |
|---|---|---|---|
| Business Hub | A single, state-aware command centre for the whole business. A live hero reads your books and changes its message and call-to-action depending on whether you have overdue invoices, money out for payment, or quiet books. An "At a glance" strip shows Paid this month, Outstanding, Overdue and quote Win rate, each tappable straight to the filtered list, with numbered tool grids for your day, financials, on-the-job tools, money & stock, and growth, plus inline analytics. | `/electrician/business` | ✅ live |
| Mate — in-app AI partner | An always-on assistant launched from the Business Hub (or ⌘/Ctrl-K) as a bottom sheet. Type or dictate plain-English requests — plan the day, add snags to a job, create a customer, ask a wiring-regulations question — and Mate proposes an action you approve before it saves, with voice input and a streaming reply. Grounded in BS 7671. | `/electrician/business` (sheet) | ✅ live |
| Business Admin | Placeholder hub previewing future admin tooling (documents, staff, financial tracking, analytics, scheduling, settings). | `/electrician/business-admin` | ⚠️ stub-or-unclear |

#### Quoting

| Feature | What it does | Route(s) | Status |
|---|---|---|---|
| Quotes pipeline | A mobile-native pipeline view showing total pipeline value, win rate, and counts for won, pending, draft and invoiced quotes, with one-tap filters, full-text search, pull-to-refresh and inline analytics. Spots quotes left unanswered for 7+ days and offers to batch-create follow-up tasks for tomorrow morning. | `/electrician/quotes` | ✅ live |
| Quote builder | A guided single-page builder covering client details, job details, priced line items (labour, materials, equipment), and settings, with a live running total and a sticky save bar. Auto-saves continuously to the cloud with a local fallback and offers to recover unsaved drafts. Supports per-category markup that can be baked invisibly into customer-facing prices, plus VAT handling and a price adjustment. Hands-free voice fill can complete client fields and add labour or material lines by voice. | `/electrician/quote-builder/create`, `/electrician/quote-builder/:id` | ✅ live |
| Quote item intelligence & pre-fill | Quote items can be pulled from a saved price book / materials lists, added from a scanned supplier invoice, or pre-populated from an AI cost estimate (with margin tier carried through). New quotes can also auto-fill client and job details when started from a linked certificate, a site visit, a project, or a materials list. | `/electrician/quote-builder/create` | ✅ live |
| Quote view, send & acceptance | A polished quote record with a status timeline that tracks when it was sent, viewed (with open counts), reminded and accepted. Generate a branded PDF, send via the share dropdown, email the client a gentle reminder (capped to three), mark the quote accepted or revert it, and convert an accepted quote into an invoice in one tap. | `/electrician/quotes/view/:id` | ✅ live |

#### Invoicing & getting paid

| Feature | What it does | Route(s) | Status |
|---|---|---|---|
| Invoices dashboard | A revenue-first invoice list showing money cleared this month plus counts of paid, sent, draft, overdue and total invoices, each tappable to filter. Overdue invoices (including those past due date with a grace window) trigger a one-tap "Create chase tasks" batch action. Full-text search, card or table views, and inline analytics. | `/electrician/invoices` | ✅ live |
| Invoice builder & view | Create invoices directly or convert them from accepted quotes, then manage each one from a detailed view: generate a branded PDF, mark as paid, and copy a single-use mark-paid link (valid 30 days) to share with whoever confirms payment. | `/electrician/invoice-builder/create`, `/electrician/invoice-quote-builder/:id`, `/electrician/invoices/:id/view` | ✅ live |
| Card payments via Stripe | Connect a Stripe account (instant OAuth) to add a "Pay Now" button to emailed invoices so clients can pay by card. A persistent banner prompts setup and confirms when connected, and the app syncs and reflects live Stripe account status. | `/electrician/invoices`, `/settings?tab=billing` | ✅ live |
| Share invoices & quotes | Send documents however the client prefers: email a download link (or send a proper emailed invoice with an optional pay-now link), or share the PDF to WhatsApp — native share sheet on mobile, with a pre-written client message including invoice number and amount. PDF download is available throughout. | `/electrician/invoices`, `/electrician/invoices/:id/view` | ✅ live |
| Accounting sync | Connect Xero or QuickBooks (Sage and FreshBooks connections built and awaiting full testing) to push invoices and expenses across — VAT- and CIS-aware — and pull payment status back so an invoice marked paid externally is reflected in Elec-Mate. One-tap "Refresh from provider" plus bulk push of everything unsynced. | `/electrician/invoices/:id/view`, `/electrician/expenses` | ✅ live |

#### Money compliance & document types (new Jun 2026)

| Feature | What it does | Route(s) | Status |
|---|---|---|---|
| CIS deductions & VAT domestic reverse charge | Full subcontractor compliance on every quote and invoice: toggle reverse charge (VAT zeroed with the statutory s.55A wording) and CIS (20% registered / 30% unverified, deducted from labour lines only, with items tagged Labour/Materials). The true breakdown shows on the PDF, email, public client page and accounting sync. | quote/invoice builders + all views | ✅ live |
| Estimate documents | A document-type toggle turns a quote into a branded **Estimate** — "guide only, final cost may vary" disclaimer, relabelled totals and an Estimate badge on the pipeline card — keeping estimates legally distinct from fixed-price quotes. | quote builder (Money Settings) | ✅ live |
| TBD start dates | "Known start date" / "To be agreed with client" toggle; TBD renders "Start date: To be agreed" on the PDF and public quote view. | quote builder (Job Details) | ✅ live |
| Default invoice settings | Set once (VAT registered, reverse charge, CIS, summary view) and every new invoice starts correct — overridable per invoice. | invoice settings sheet | ✅ live |
| Record Payment & partial payments | A native Record Payment dialog with date picker on the invoice view; partial payments tracked against the outstanding balance. | `/electrician/invoices/:id/view` | ✅ live |
| Deposit invoices on acceptance | When a client accepts a quote on the public page, a deposit invoice (default % from the business profile, overridable per quote) can be raised automatically with a card-payment link. | `/public/quote/:token` | ✅ live |
| Create RAMS from a quote | One tap from the quote view opens the AI RAMS generator pre-seeded with the job title, description, location and client — no retyping. | quote actions → AI RAMS | ✅ live |
| Branded PDFs & clearer line items | Quote and invoice PDFs carry the company's brand colour throughout, and line-item descriptions render as clean lists rather than text blocks. | all quote/invoice PDFs | ✅ live |
| Dunning emails | Automatic, branded escalation emails for failed and overdue payments (failed-payment notice → overdue reminder → final notice). | automatic | ✅ live |

#### Expenses, stock & customers

| Feature | What it does | Route(s) | Status |
|---|---|---|---|
| Expenses | Track business spending by category with date-grouped lists, running totals, search and summary stats. Export your records, and when Xero or QuickBooks is connected, sync individual expenses or push everything unsynced in one tap. | `/electrician/expenses` | ✅ live |
| Stock tracker | A van-and-garage inventory with quick +/- quantity adjustments, undo, low-stock alerts, location grouping (van, etc.), category filters and sorting, recently-used shortcuts, batch import, and a copy-to-clipboard reorder list for pasting into WhatsApp or email. Quick-add presets for common electrical materials. | `/electrician/inventory` | ✅ live |
| Customers (CRM) | A full customer book with search, sorting, map view, reminders, CSV import and vCard paste-parsing. Each customer record carries job history, quotes, invoices, payment-reliability stats, site visits, RAMS, tasks, properties, contacts and a timeline — making it a genuine job-and-money record per client, not just a contact list. | `/customers`, `/customers/:id` | ✅ live |

#### Business AI (WhatsApp Mate)

| Feature | What it does | Route(s) | Status |
|---|---|---|---|
| Mate over WhatsApp — sales & onboarding | A sales page and guided onboarding for the WhatsApp-based AI partner. Onboarding verifies your number and activates Mate via a deep-link/code step in seconds, after which you can save Mate to your phone contacts. | `/electrician/business-ai` | 🟡 partial |
| Mate dashboard | Once active, a personalised dashboard showing today's numbers (outstanding, overdue, open quotes, tasks), an estimated "time saved this week", and a humanised recent-activity feed where each action Mate took links back into the relevant part of the app — plus a curated library of example prompts spanning quotes, money, RAMS, regulations, admin and growth. | `/electrician/business-ai` | ✅ live |

---

### 3.4 Business Development — guides & financial calculators

Elec-Mate's Business Development centre turns the platform from a certification tool into a genuine running-your-business companion. It pairs in-depth, UK-specific written guides — covering everything from starting up and hiring to tax, debt recovery and customer acquisition — with a suite of fourteen purpose-built financial calculators that help electricians price work correctly, protect their margins and plan cash flow with confidence. Every calculator is mobile-first and runs entirely on the device, with worked examples, plain-English explanations and UK rate references built in, so a sole trader can model a quote on a job site in seconds and a growing firm can plan capacity and staff costs from the van.

#### Business guides

Long-form, structured guidance organised into tabbed sections, with key-metric panels, expandable explainer blocks, checklists and direct links to the relevant HMRC, Companies House and industry-body resources. Written specifically for UK electrical contractors.

| Feature | What it does | Route(s) | Status |
| --- | --- | --- | --- |
| Business Development hub | Animated landing grid linking to all eight guide areas, with a clear plain-language disclaimer that guidance is general and not formal financial/legal advice. | `/electrician/business-development` | ✅ live |
| Starting a Business | Complete startup playbook across Business Planning, Legal & Compliance and Support & Resources — market research, customer segmentation, revenue forecasting, itemised startup-cost tables, sole trader vs limited company vs LLP comparison, qualifications, competent-person schemes, insurance, plus tappable helplines and links to NICEIC, NAPIT, ECA, GOV.UK and Start Up Loans. | `/electrician/business-development/startup` | ✅ live |
| Onboarding Apprentices | Guidance on recruiting, the legal framework, training, support and assessment for taking on apprentices, with government-incentive and ROI metrics and links to supporting tools. | `/electrician/business-development/apprentices` | ✅ live |
| Onboarding Electricians | Recruitment channels, interview and selection process, competitive package structuring, first-week and 90-day onboarding plans, retention factors and employment-law essentials for hiring qualified staff. | `/electrician/business-development/electricians` | ✅ live |
| Growing Your Business | Scaling strategies across growth, pricing, marketing, service diversification, operations and financial management, with realistic revenue-growth and productivity targets. | `/electrician/business-development/growth` | ✅ live |
| Customer Acquisition | Proven methods to win and keep clients — market research, digital and traditional marketing, lead generation, customer experience and retention, benchmarked against referral close rates and marketing-budget guidance. | `/electrician/business-development/customers` | ✅ live |
| Tax & Finances | Practical financial-management guide spanning business structure, allowable expenses, cash flow, VAT & HMRC, tax planning, insurance and pensions, with current UK thresholds (personal allowance, VAT threshold, basic rate). | `/electrician/business-development/tax-finances` | ✅ live |
| Debt Recovery | End-to-end approach to late payment: prevention, a staged recovery process, legal options (including small claims and statutory interest) and longer-term business protection. | `/electrician/business-development/debt-recovery` | ✅ live |
| Business Documents | Reference guidance on professional quotes, invoices, contracts and terms, operations admin and HR & safety paperwork, describing 20+ essential document types. | `/electrician/business-development/templates` | 🟡 partial |

#### Financial calculators

A dedicated calculator hub leading to fourteen specialist tools. Each shares a consistent mobile-first interface with instant results, sensible UK defaults, expandable "what this means" explainers and built-in rate references; several add charts, worked examples, premium/out-of-hours pricing, save-scenario or share/export and locally stored history.

| Feature | What it does | Route(s) | Status |
| --- | --- | --- | --- |
| Calculators hub | Tappable grid linking to all fourteen financial tools. | `/electrician/business-development/tools` | ✅ live |
| Job Profitability Calculator | Analyses whether a specific quote hits your target margin: factors in materials, single- or multi-worker labour (with blended rates), travel, admin, mileage, parking, subcontractors, consumables, overheads, contingency and warranty reserve, then reports actual profit, margin, total/direct/overhead costs, minimum viable quote and a full VAT breakdown. Includes job-type presets, worked example, share and a locally saved calculation history. | `/electrician/business-development/tools/job-profitability` | ✅ live |
| Business Cost Calculator | Guided multi-step planner that models true startup and ongoing monthly costs by business structure (sole trader vs limited), totalling first-year cash needs with analytics and scenario comparison to set realistic budgets. | `/electrician/business-development/tools/business-cost` | ✅ live |
| Cash Flow Planner | Builds month-by-month income and expense projections from editable streams and categories, surfacing cumulative balance, cash runway and the month any shortfall hits, with quick-start templates, scenario planning, financial insights, a projection chart and CSV/clipboard export. | `/electrician/business-development/tools/cash-flow` | ✅ live |
| Pricing Strategy Calculator | Works a job price up from materials, labour, overheads, target margin and optional discount, applying sensible input limits and showing the price ex/inc VAT with a visual cost-vs-price breakdown and save-scenario support. | `/electrician/business-development/tools/pricing-strategy` | ✅ live |
| Equipment ROI Calculator | Assesses whether to buy a piece of kit by combining purchase, installation, maintenance, lifespan, residual value, annual savings, utilisation and a discount rate, with a payback chart to support the decision. | `/electrician/business-development/tools/roi-calculator` | ✅ live |
| Hourly Rate Calculator | Calculates your optimal charge-out rate from target salary, true billable hours (after leave, sickness and training), employer NI, pension, fixed business costs, overheads, profit margin and utilisation — outputting recommended hourly and day rates ex/inc VAT, call-out minimums and after-hours/weekend premiums, with a breakdown chart and save-scenario. | `/electrician/business-development/tools/hourly-rate` | ✅ live |
| Capacity Planning Tool | Models team capacity from headcount, working hours, holidays, sickness, training, admin and travel allowances and average job length, helping plan workload and growth targets. | `/electrician/business-development/tools/capacity-planner` | ✅ live |
| Tax & NI Estimator | Estimates income tax and National Insurance for the selected UK tax year (2025/26 or 2024/25) from income, business expenses, capital allowances, pension and charitable contributions, with VAT and dividend inputs and a worked example. | `/electrician/business-development/tools/tax-estimator` | ✅ live |
| Break-even & Margin Guard | Derives your break-even hourly and day rate from annual overheads and chargeable hours, then prices an example job with material markup and target margin, flagging margin, utilisation and markup health. | `/electrician/business-development/tools/break-even` | ✅ live |
| Fully Loaded Staff Cost | Calculates the true cost of an employee — base pay, employer NI, pension, holidays, van, tools, insurance and training — and converts it to a loaded hourly cost and recommended charge-out rate at your target margin. | `/electrician/business-development/tools/staff-cost` | ✅ live |
| Quote vs Actual Tracker | Compares quoted versus actual hours and materials to expose where jobs ran over, showing variance in pounds and percentage with on-target / over / under-budget status to sharpen future pricing. | `/electrician/business-development/tools/quote-variance` | ✅ live |
| Minimum Charge & First Hour | Sets a profitable call-out minimum and first-hour price by accounting for travel and admin time, hourly cost, overhead, a first-hour premium, VAT and rounding, with a worked multi-hour job total. | `/electrician/business-development/tools/minimum-charge` | ✅ live |
| VAT Scheme Comparison | Compares the Standard VAT scheme against the Flat Rate scheme using turnover and labour/materials split to show which leaves you better off and the annual saving. | `/electrician/business-development/tools/vat-scheme` | ✅ live |
| CIS & DRC Helper | Works out CIS deductions and Domestic Reverse Charge VAT treatment for construction invoices by role (contractor or subcontractor), showing total due, cash received and contextual warnings — including the 30% unregistered-subcontractor rate. | `/electrician/business-development/tools/cis-drc` | ✅ live |

---

### 3.5 Materials & pricing

Elec-Mate puts the whole materials and pricing workflow in an electrician's pocket — from finding the cheapest cable across the UK's leading wholesalers, to building reusable job lists, to knowing exactly what to charge in a given postcode. Snap a photo of a supplier's quote or paste a scribbled list and Elec-Mate reads it, matches every item to a real product, finds the best price across multiple suppliers, and sends the optimised basket straight into a quote. A personal price book and rate card keep an electrician's own buy and sell prices to hand, while live metal and scrap pricing turns offcuts into a known cash value on the spot.

#### Marketplace & product search

| Feature | What it does | Route(s) | Status |
| --- | --- | --- | --- |
| Materials Marketplace | A unified, searchable catalogue of electrical materials — cables, consumer units, circuit protection, sockets and switches, lighting and containment — aggregated from UK wholesalers with live product counts, supplier facets and a freshness timestamp. Browse by category, sort, filter to deals only, and infinite-scroll the results. | `/electrician/materials` | ✅ live |
| Tools Marketplace | The same powerful catalogue tuned for tools and kit — hand tools, power tools, test equipment and PPE — with brand search, category chips and a daily deals row. | `/electrician/tools`, `/electrician/tools-marketplace` | ✅ live |
| Deals, discount codes & price-drop alerts | Surfaces a featured Deal of the Day, a collapsible list of current discount codes, a deals row and banner alerts when a product an electrician is watching drops in price — so they buy at the right moment. | `/electrician/materials`, `/electrician/tools` | ✅ live |
| Save to list / quick add | Any product in the marketplace can be saved into a named materials list straight from a bottom sheet, ready to price up or send to a quote. | `/electrician/materials`, `/electrician/tools` | ✅ live |
| Category & supplier browsing | Dedicated landing views for a single material category or a single supplier's range, with a slug redirect that keeps older links working. | `/electrician/materials/category/:categoryId`, `/electrician/materials/supplier/:supplierSlug`, `/electrician/materials/:slug` | ✅ live |

#### Smart procurement & price comparison

| Feature | What it does | Route(s) | Status |
| --- | --- | --- | --- |
| Smart Procurement | Paste a materials list or take a photo of a written/printed list and Elec-Mate reads it, identifies each item and quantity, then compares prices across multiple UK suppliers. It returns an optimised basket — the cheapest split across suppliers — with the total saving versus buying everything from one merchant, and a one-tap "Send to Quote Builder". | `/electrician/materials/procurement` | ✅ live |
| Item-by-item price comparison | A detailed breakdown showing every parsed item, the best price found, the winning supplier and any unmatched lines, so an electrician can sanity-check the basket before quoting. | `/electrician/materials/procurement` | ✅ live |
| Material price comparison search | A standalone search that compares a single material across suppliers, with price statistics and supporting insights to back up buying decisions. | `/electrician/materials/compare` | ✅ live |

#### Materials lists & job baskets

| Feature | What it does | Route(s) | Status |
| --- | --- | --- | --- |
| My Lists | Create reusable materials lists per job (e.g. "Kitchen rewire"), add saved products or paste a list to auto-match items, adjust quantities, set or edit prices inline, and see a running estimated total. Lists are saved to the electrician's account so they sync across devices. Duplicate a list, jump straight to price comparison, or send the whole list to the Quote Builder. | `/electrician/materials/lists` | ✅ live |
| Paste-to-match | Paste a free-text list ("10x 2.5mm T&E 100m, 5x double sockets, MCB 32A Type B…") and Elec-Mate matches each line to a real product automatically, ready to price. | `/electrician/materials/lists` | ✅ live |

#### Price book & rate card

| Feature | What it does | Route(s) | Status |
| --- | --- | --- | --- |
| Price Book | A personal materials cost ledger with categories (cable, accessories, tools, safety, general), markup settings that auto-calculate sell prices, reusable bundles of line items, and stale-price flagging so an electrician knows when a cost is out of date. Items and bundles can be pushed into a quote. | `/electrician/price-book` | ✅ live |
| Rate Card | A tidy list of an electrician's own labour and service prices — installs, call-out charges, inspections and more — organised by category with search, ready-made example items to start from, and full add/edit/delete. | `/electrician/rate-card` | ✅ live |

#### Live pricing, metals & scrap

| Feature | What it does | Route(s) | Status |
| --- | --- | --- | --- |
| Job pricing by postcode | Enter a postcode and a job type to see what electricians are charging in that area — min, average and max prices with a confidence indicator and sample size, drawn from community-submitted and market data. An option reveals every job type so an electrician can spot gaps and help fill them. | `/electrician/live-pricing` | ✅ live |
| Submit a price | Contribute real job prices back to the community to improve coverage and accuracy of regional rates. | `/electrician/live-pricing?tab=submit` | ✅ live |
| Live metal & scrap prices | A live grid of copper, aluminium, brass, lead, steel and zinc prices per kilo with 24-hour trend indicators, grade multipliers, a built-in value calculator (weight × grade) and share-to-clipboard — turning offcuts and strip-outs into a known cash figure. | `/electrician/live-pricing?tab=scrap` | ✅ live |
| Scrap merchant finder | Find nearby scrap metal merchants by location, with merchant cards and ratings, so an electrician can offload copper and cable quickly. | `/electrician/live-pricing?tab=scrap` | ✅ live |
| Pricing insights dashboard | A community insights view showing contribution stats, regional activity, top searched jobs and personal impact, with offline awareness throughout the Live Pricing area. | `/electrician/live-pricing?tab=insights` | ✅ live |

---

### 3.6 Calculators & design tools

Elec-Mate puts a full electrical engineering toolkit in the electrician's pocket. From a single tap on the job, an electrician can size a cable, check a maximum Zs value, design a complete consumer unit, price a job and generate a wiring diagram — all grounded in BS 7671 and tuned for fast, thumb-friendly use on site. The calculators cover everyday on-the-tools maths through to specialist renewables, fault-level and arc-flash analysis, while the AI-assisted design tools take a plain-language brief and turn it into a fully specified, compliant installation with cable sizing, protective device selection, expected test results and supporting documentation.

#### Calculator suite

| Feature | What it does | Route(s) | Status |
| --- | --- | --- | --- |
| Electrical Calculations hub | A categorised library of 63 standalone calculators selected from one searchable, grouped picker. Families span Fundamentals (Ohm's Law, AC power, three-phase, star-delta), Design & Installation (voltage drop, cable sizing, derating, conduit/trunking fill, conduit bending, diversity, maximum demand, power-factor correction), Testing & Inspection (maximum Zs, BS 7671 Zs lookup, R1+R2, ring continuity, earth fault loop, phase rotation), Protection & Safety (adiabatic, prospective fault current, RCD trip time, RCD discrimination, earth electrode/TT, circuit-breaker selector), Lighting & Power, Renewables and EV, Advanced Safety & Analysis (arc flash, power quality, selectivity, fault level, touch/step voltage, lightning protection), Specialist Locations (marine, swimming pool) and cost utilities. Each calculator shows the formula, results and a standards reference. | `/electrician/calculations` | ✅ live |
| BS 7671 calculation engines | Shared, reusable calculation engines underpin the design tools and headline calculators — simplified cable sizing, voltage drop, earth fault loop, cable current capacity, diversity, discrimination, load balancing, short-circuit, motor circuit/starting, thermal constraints and harmonic analysis — driven by built-in BS 7671 derating and temperature/grouping factor data. | (used across the design tools) | ✅ live |

#### Installation Designer (Install Planner)

| Feature | What it does | Route(s) | Status |
| --- | --- | --- | --- |
| Installation Designer entry | A single launcher that lets the electrician choose how to design: an AI-guided chat designer, or manual Express/Professional/Multi-circuit modes, with one-tap quick starts for common circuits (ring main, lighting, cooker) and installation presets (domestic, commercial, industrial). Designs can be saved and reloaded. | `/electrician/install-planner` | ✅ live |
| Express mode | A guided three-step flow (quick setup → smart environment → results) that auto-detects the installation environment, then sizes the cable, selects the protective device and checks voltage drop and Zs compliance with safety margins, warnings and recommendations. | `/electrician/install-planner` (Express) | ✅ live |
| Professional mode | A full-control calculator for a single circuit — design current, length, ambient temperature, grouping, installation method, cable type and voltage — running the cable-sizing, voltage-drop and earth-fault-loop engines with applied BS 7671 correction factors. | `/electrician/install-planner` (Professional) | ✅ live |
| Multi-circuit mode | Builds a complete distribution board: add multiple circuits, set the main switch rating, earthing system (TN-S/TN-C-S/TT) and Ze, then auto-balance three-phase loads, generate an EIC schedule of circuit details and produce single-line and consumer-unit wiring diagrams. | `/electrician/install-planner` (Multi-circuit) | ✅ live |
| Results, export & PDF | A dedicated results view presents the design with project details and supporting test documentation, and exports a branded PDF (using the company profile) for issue to clients or inclusion with certification. | `/electrician/install-planner/results/:conversationId?` | ✅ live |

#### Renewables designers (new Jun 2026)

| Feature | What it does | Route(s) | Status |
| --- | --- | --- | --- |
| Solar PV Designer | A five-step guided design flow (System → Strings → Cabling → Grid & Yield → Handover) using real kit from MCS databases: string sizing from cold-Voc/hot-Vmp limits, DC and AC cable schedules with voltage-drop targets, G98 vs G99 grid-connection routing, PVGIS yield and CO₂ figures — handing over a pre-filled Solar PV certificate, a quote with materials and labour, and a single-line diagram. Aligned to MCS MIS 3002, the IET Code of Practice and BS 7671:2018+A4:2026. | `/electrician/renewables/design/solar` | ✅ live |
| Battery / EV / Heat Pump Designers | Companion guided designers for battery storage, EV charging (including maximum-demand assessment) and heat pump installs, sharing the same deterministic calculation engines as the renewables calculators. | `/electrician/renewables/design/battery`, `…/ev`, `…/heat-pump` | ✅ live |
| AI design intake | Describe the job in plain English and get a structured design proposal, verified deterministically by the same audited engines and built only from real kit in the MCS databases — with drafts persisted locally and safe to resume. | renewables designers (intake) | ✅ live |

#### AI design & estimating tools

| Feature | What it does | Route(s) | Status |
| --- | --- | --- | --- |
| Circuit Designer (AI) | An AI installation designer that takes a structured brief or plain-language description and returns a fully specified, BS 7671-compliant circuit design — cable selection, protective devices, expected test results (R1+R2, Zs, insulation resistance, polarity) and installation guidance — streamed live with editorial-style results and the option to save against a customer. | `/electrician/circuit-designer`, `/electrician/install-planner?mode=ai` | ✅ live |
| Cost Engineer (AI) | An AI estimating tool that turns a job briefing (and optionally an imported circuit design) into a costed estimate using the electrician's own business settings, streamed live and saved to the customer record — ready to convert into a quote. | `/electrician/cost-engineer` | ✅ live |
| Diagram builder & export | Generates single-line and consumer-unit schematics from a design using a library of proper electrical symbols (MCB, RCBO, RCD, consumer unit, EV charger, heat pump, shower, earthing arrangements and more) rendered as crisp SVG, with export to PNG and PDF for drawings packs. | (within Install Planner / Circuit Designer) | ✅ live |
| Fault Finder (diagnostic wizard) | An interactive diagnostic wizard that walks the electrician through symptom-based questions to narrow down likely faults and suggest testing procedures, surfaced as an in-context bottom sheet within the EICR workflow and apprentice AM2 practice. | (sheet within `/electrician` EICR wizard; AM2 simulator) | 🟡 partial |

#### Business & pricing calculators

| Feature | What it does | Route(s) | Status |
| --- | --- | --- | --- |
| Business calculator pack | A set of commercial calculators for running an electrical business — hourly rate, minimum charge, break-even, job profitability, equipment ROI, staff cost, business cost and pricing strategy — to help electricians price work profitably. | `/electrician` business-development tools | ✅ live |

---

### 3.7 AI Tooling (specialist tools)

Elec-Mate puts a focused set of single-task AI tools in the electrician's pocket — each one built for a specific moment on the job and each answer grounded in and cited to BS 7671:2018+A4:2026. From snapping a photo of an unknown component to translating a technical finding into plain English for the customer at the door, the tools share one promise: a fast, streamed, referenced answer with no invented regulations. The hub lives at `/electrician-tools/ai-tooling` and presents the tools as a clean, numbered index (Featured, Visual Analysis, Text AI) that launches each specialist screen.

#### Visual analysis tools (photo-led)

These tools work straight from the phone camera or an uploaded image, with on-device image compression so they stay fast on site data.

| Feature | What it does | Route(s) | Status |
| --- | --- | --- | --- |
| Component ID / Quick Capture | Photograph any electrical component (up to four shots) and get back an identification with specifications, the BS 7671 requirements that apply, replacement options, an age and compliance estimate, and installation notes — every claim cited. Includes a live in-app camera with framing guides plus library upload, a category picker and selectable "what to know" chips. | `/electrician-tools/ai-tooling/component-identify` | ✅ live |
| Fault Diagnosis | Trace a fault from symptoms (burning, RCD tripping, water damage, overheating and more), location and timeframe to a likely root cause, with rectification steps, risk grading and EICR-style coding. Works from a photo or from a text-only description of the problem. | `/electrician-tools/ai-tooling/fault-diagnosis` | ✅ live |
| Wiring Guide | Produces step-by-step UK wiring instructions tailored to property type (domestic, commercial, industrial) and the specific circuit — consumer units, ring mains, cookers, showers, EV chargers, solar PV, three-phase, motor control and more — returning a structured wiring guidance display. | `/electrician-tools/ai-tooling/wiring-instruction` | ✅ live |
| Install Verify | Checks an installation against BS 7671 for a chosen certificate type (EIC, EICR, Minor Works), property type and scope (consumer unit, earthing and bonding, RCD protection, special locations, etc.), returning a pass/fail-style verification with cited regulations and quick pre-checks. | `/electrician-tools/ai-tooling/installation-verify` | ✅ live |

#### Text AI tools

| Feature | What it does | Route(s) | Status |
| --- | --- | --- | --- |
| Client Explainer | Turns technical findings into plain-English copy a customer actually understands. Choose the client type, tone, reading level and urgency, and optionally fold in analogies, indicative cost framing, a safety emphasis and BS 7671 references, then generate a ready-to-send explanation. | `/electrician-tools/ai-tooling/explainer` | ✅ live |

---

### 3.8 Site Safety & RAMS

Site Safety is one of Elec-Mate's deepest tool sets — a complete, mobile-first health-and-safety system built for the way electricians actually work: on a job, on a phone, often with no signal. At its heart sits an AI RAMS engine that turns a plain-English description of the day's work into a fully scored risk assessment and step-by-step method statement in about a minute, complete with BS 7671 and HSE references. Around it Elec-Mate wraps a full operational suite — permits to work, COSHH assessments, safe-isolation and pre-use equipment records, a RIDDOR-aware accident book, hot-work fire watch, daily site diary, near-miss and observation logging, team briefings with QR sign-off, equipment and PPE tracking, and a live safety score that reads every one of these activities to tell the electrician at a glance whether the site is in good shape. Everything an electrician produces is saved, searchable, exportable to professional PDF, and shareable with clients and supervisors — turning paperwork that used to live on clipboards and in vans into an audit-ready record that follows the job.

#### AI RAMS & document generation

| Feature | What it does | Route(s) | Status |
|---|---|---|---|
| AI RAMS Generator | Describe a job in plain English (with optional photo and drawing attachments) and Elec-Mate generates a complete RAMS — hazards identified and scored, control measures applied in hierarchy, and a matched method statement — typically in one to three minutes. Runs as a background job with live progress, draft auto-recovery, partial-result handling, single-agent retry, cloud auto-save and push notification when ready. Output is fully editable before export to PDF. | `/electrician/site-safety` (RAMS Generator tool), `/electrician/site-safety/ai-rams` | ✅ live |
| Health & Safety Specialist | A dedicated specialist flow that takes a work brief plus project details and streams back a full RAMS in real time — hazards scored, controls hierarchical, BS 7671 and HSE references quantified — presented as a printable, audit-ready document and saved to the user's results. | `/electrician/health-safety` | ✅ live |
| Method Statement Generator | A guided wizard that produces standalone step-by-step safe-working procedures with integrated risk assessment, for jobs that need a method statement on its own rather than a full RAMS pack. | `/electrician/method-statement`, `/electrician/site-safety` (Method Statement tool) | ✅ live |
| Hazard Database | A searchable reference library of common electrical and construction hazards with associated control measures, used to browse risks and inform manual RAMS building. | `/electrician/site-safety` (Hazard Database) | ✅ live |
| Safety Templates Library | A library of UK electrical safety document templates (risk assessments, method statements, safe systems of work and checklists) that can be browsed by category, opened and saved as the user's own working documents, with status tracking (Draft, Active, Review Due, Archived). | `/electrician/site-safety` (Safety Templates) | ✅ live |
| Documents Hub | A single home for every saved safety document — RAMS, permits, COSHH assessments, inspections and more — pulled together with type-coded cards and search so the whole compliance picture is in one place. | `/electrician/site-safety` (Documents Hub) | ✅ live |
| RAMS pre-fill from quote *(new Jun 2026)* | Pick an existing quote or estimate and its client, address, job title and description auto-populate the AI RAMS input — no retyping on site. | AI RAMS (quote selector) | ✅ live |
| Amendable RAMS *(new Jun 2026)* | Generated RAMS are editable inline before export — tweak hazards, controls or method-statement text, then save the amended version and share. | AI RAMS results | ✅ live |

#### Permits, isolation & compliance records

| Feature | What it does | Route(s) | Status |
|---|---|---|---|
| Permit to Work | Issue and manage live work permits across hot work, confined space, electrical isolation, working at height and excavation. Supports hazards and controls, photo capture, location auto-fill, supervisor approval, expiry checks, extension and closure, save-as-template, PDF export and sharing. | `/electrician/site-safety` (Permit to Work); standalone `/inspection/permit-to-work` and `/inspection/permit-to-work/:id` | ✅ live |
| COSHH Assessments | Build chemical-substance hazard assessments with GHS hazard pictograms, exposure routes, quantities and frequency, control measures and signatures. Tracks review due dates and surfaces overdue reviews back to the dashboard; exports to PDF and supports templates. | `/electrician/site-safety` (COSHH Assessments) | ✅ live |
| Safe Isolation Record | Step-by-step GS38 safe-isolation records that capture the isolation through to re-energisation, with status tracking and expiry awareness — a digital lock-off proof for live electrical work. | `/electrician/site-safety` (Safe Isolation) | ✅ live |
| Pre-Use Equipment Checks | PUWER 1998 pre-use inspection checklists across categories including ladders, scaffold, power tools, test instruments, access equipment, harnesses, extension leads and portable RCDs, each with regulation references. | `/electrician/site-safety` (Pre-Use Checks) | ✅ live |
| Inspection Checklists | Standardised safety inspection forms with pass/fail/N-A results, non-conformance classification (critical/major/minor) and status tracking, PDF export and sharing — feeding the dashboard's passed/failed inspection counts. | `/electrician/site-safety` (Inspection Checklists) | ✅ live |
| Digital Accident Book | A RIDDOR-aware incident record book that calculates reporting deadlines, flags RIDDOR-reportable events with an urgency banner, lets the user mark events as reported to the HSE, archives old records and exports to PDF. | `/electrician/site-safety` (Accident Book) | ✅ live |
| Fire Watch | A hot-work fire-watch timer paired with a pre-work checklist (combustibles cleared, extinguisher present, detectors live, etc.) to run and record the mandatory post-hot-work watch period. | `/electrician/site-safety` (Fire Watch) | ✅ live |
| Site Diary | A daily site log capturing weather, activity and notes for CDM record-keeping, with PDF export and sharing. | `/electrician/site-safety` (Site Diary) | ✅ live |

#### Reporting, briefings & monitoring

| Feature | What it does | Route(s) | Status |
|---|---|---|---|
| Safety Score & Dashboard | A live, weighted safety score (0–100) calculated from real activity — equipment overdue, briefings completed, near-misses, COSHH reviews, accidents, inspections and active permits — shown as an animated ring with status pills and an "at a glance" stats strip, plus context-aware verdicts that point the user at whatever needs attention first. | `/electrician/site-safety` | ✅ live |
| Team Briefings & Toolbox Talks | Schedule and run pre-work briefings and toolbox talks from a template library, with AI-generated briefing content, attendee sign-off (name, role, signature, photo, timestamp), QR-code and shareable-link distribution for remote sign-off, and status tracking from scheduled through to completed. | `/electrician/site-safety` (Team Briefing); sign-off at `/briefing-signoff/:briefingId` and public `/briefing-sign/:token` | ✅ live |
| Near Miss Reporting | Log and track close-calls before they cause harm — category, severity, location, potential consequences, immediate actions and preventive measures, with photo capture — and convert a near miss directly into a team briefing. | `/electrician/site-safety` (Near Miss) | ✅ live |
| Safety Observations | Record positive behaviours and improvement opportunities seen on site, with category, severity, person observed, photos and observer signature, plus a shared feed of observations. | `/electrician/site-safety` (Safety Observations) | ✅ live |
| Photo Documentation | Capture timestamped site-condition photos as a visual safety record. | `/electrician/site-safety` (Photo Documentation) | ✅ live |
| Equipment & PPE Tracker | Track PPE and safety equipment with inspection and calibration due dates, barcode/QR scanning to find or register items, warranty tracking and status filtering; overdue and due-soon items feed straight into the safety score and dashboard alerts. | `/electrician/site-safety` (Equipment Tracker) | ✅ live |
| Emergency Procedures | Quick-access reference to emergency protocols for use on site. | `/electrician/site-safety` (Emergency Procedures) | ✅ live |

#### Safety knowledge & resources

| Feature | What it does | Route(s) | Status |
|---|---|---|---|
| Safety Alerts feed | An in-tool feed of industry safety alerts and notices, severity-graded from critical to low and expandable for detail. | `/electrician/site-safety` (Safety Alerts) | ✅ live |
| Safety Resource Library | A searchable, category-filterable library of safety guidance documents, posters and publications, with downloadable files. | `/electrician/site-safety` (Safety Resources) | ✅ live |
| Safety Shares hub | A standalone knowledge-sharing hub spanning Safety Alerts, Learning From Experience (real incidents and lessons learned), Industry News, Major Projects and Safety Resources, with both standard and enhanced (ratings, bookmarking, view-tracking, advanced filtering) experiences for alerts and resources. | `/electrician/safety-shares` plus `/alerts`, `/alerts-enhanced`, `/lfe`, `/news`, `/projects`, `/resources`, `/resources-enhanced` | 🟡 partial |

---

## 4. Elec-AI

Elec-AI is the in-app assistant — a single, always-available chat that answers BS 7671 questions in real time. It is surfaced prominently in the main sidebar and opens as a full-height, native-feeling conversation screen. Answers stream in within seconds, every cited regulation is tappable to open its full text, and the whole experience is designed for one hand on a busy site. A companion Regulation Search gives a faster, search-box route into the same BS 7671 knowledge when a sparky just wants to look something up.

#### Elec-AI assistant

| Feature | What it does | Route(s) | Status |
| --- | --- | --- | --- |
| Elec-AI chat assistant | Conversational BS 7671 A4:2026 assistant with token-by-token streaming, suggested follow-up questions, and a welcome screen of starter prompts. Supports attaching up to five photos per question (camera or library, auto-compressed) so you can ask about what you're looking at, plus hands-free voice dictation into the message box. | `/electrician-tools/ai-tooling/assistant` (sidebar: "Elec-AI") | ✅ live |
| Cited regulations & detail sheet | Regulation numbers in answers are tappable and open a detail sheet with the full regulation text, from which you can fire off a follow-up question without losing your place. | `/electrician-tools/ai-tooling/assistant` | ✅ live |
| Chat history & sessions | Conversations are saved as sessions you can reopen, rename context for, delete or start fresh; the last conversation is automatically restored when you return. | `/electrician-tools/ai-tooling/assistant` | ✅ live |
| Save answer to a job | Save any Elec-AI answer — with its question, cited regulations and attached photos — against a job for your records. | `/electrician-tools/ai-tooling/assistant` | ✅ live |
| Offline cached answers | When you lose signal, Elec-AI shows your most recent saved answers so the knowledge you've already pulled stays with you on site; new answers resume automatically once you're back online. | `/electrician-tools/ai-tooling/assistant` | ✅ live |
| Regenerate / stop | ChatGPT-style controls to stop a streaming answer mid-flight or regenerate the last response. | `/electrician-tools/ai-tooling/assistant` | ✅ live |

#### Regulation Search

| Feature | What it does | Route(s) | Status |
| --- | --- | --- | --- |
| Regulation Search | A dedicated BS 7671 search box with autocomplete suggestions, recent-search history, keyboard navigation and result cards — a fast lookup route into the regulations when you don't need a full conversation. | `/tools/regulation-search` | ✅ live |

---

## 5. Employer Hub

The Employer Hub is Elec-Mate's command centre for electrical contractors and firms — a single, mobile-first dashboard that pulls the whole business into one place. From one screen an employer can run their team, win and deliver jobs, keep the books, stay on top of health and safety, and generate professional documents in seconds. The hub is organised into five top-level areas — People, Jobs, Finance, HR & Safety, and Smart Docs — sitting above an Overview that surfaces live stats, "needs attention" alerts (expiring credentials, pending expense claims, new job applications, looming deadlines) and quick actions. Around forty deep sections are wired to live data, and the hub is voice-aware: spoken commands can jump between sections and open the right dialog (new job, quote, invoice, expense, timesheet, certification, order, supplier or vacancy) hands-free on site. Beyond the logged-in hub, Elec-Mate also exposes three secure, no-login "magic-link" pages so apprentice supervisors, site attendees and placement employers can act without ever creating an account.

### Overview & navigation

| Feature | What it does | Route(s) | Status |
| --- | --- | --- | --- |
| Employer Overview dashboard | A single at-a-glance view of the firm: live counts for team size, active jobs, expiring-credential alerts and an overall safety score, plus an "Action required" feed that escalates expiring certifications, pending expenses, new applications and urgent deadlines. Quick-action tiles launch a new job, quote, invoice or expense in one tap. | `/employer?section=overview` | ✅ live |
| Hub navigation & voice control | Animated, depth-aware navigation across five hubs and ~40 sections with section-aware refresh. Spoken commands map natural language ("show timesheets", "create quote") straight to sections and dialogs for hands-free use on site. | `/employer?section=…` | ✅ live |

### People

| Feature | What it does | Route(s) | Status |
| --- | --- | --- | --- |
| Team / Employees | Manage your workforce — add employees, hold their details and track who's active, all backed by live records and quick-add dialogs. | `/employer?section=team` | ✅ live |
| Elec-ID credentials | A credential wallet for the team: track qualifications and certifications with expiry alerts and work history, so you always know who is current and who needs a renewal. | `/employer?section=elecid` | ✅ live |
| Timesheets | Capture and review worked hours and leave, including manual time entry, giving employers an auditable record of team time. | `/employer?section=timesheets` | ✅ live |
| Communications | A team communications view with messaging stats and history, keeping conversations attached to the business rather than scattered across personal phones. | `/employer?section=comms` | ✅ live |
| Talent Pool & Vacancies | A two-sided hiring marketplace (redesigned Jun 2026): browse real electrician candidates with declared rates, skill years, verified documents, ECS card tier and qualifications (no fabricated stats), filter by tier/specialism/experience/rate, message candidates in-app, invite them to apply, and track applications against posted vacancies — candidates apply from their own electrician-side job feed. Contact details stay private until the employer reaches out. | `/employer?section=talentpool`, `/employer?section=vacancies` | ✅ live |
| Apprentice college-progress bridge *(new Jun 2026)* | A read-only live view of each linked apprentice's college data — verified OTJ hours vs target, attendance %, EPA status (Gateway/Ready/Booked/Passed) and overdue-review flags — without logging into any college portal. | `/employer?section=apprentices` | ✅ live |
| Worker 360 *(new Jun 2026)* | Tap any team member for a single sheet of their hours worked, spend (expenses + orders), leave balance and live on-site presence from clock-ins. | People hub (member sheet) | ✅ live |

### Jobs

| Feature | What it does | Route(s) | Status |
| --- | --- | --- | --- |
| Jobs & Job Board | Create, assign and track jobs across their lifecycle, with a board view for a quick read on workload. | `/employer?section=jobs`, `/employer?section=jobboard` | ✅ live |
| Job Packs | Assemble job documentation packs (scope, hazards and more) that feed straight into the Smart Docs generators. | `/employer?section=jobpacks` | ✅ live |
| Timeline & Progress Logs | A job timeline with milestones plus a running site diary of progress logs, so the office can see how a job is moving without phoning the team. | `/employer?section=timeline`, `/employer?section=progresslogs` | ✅ live |
| Worker Tracking | A live worker map (Google Maps, dark-styled) with colour-coded presence derived from clock-ins — On Site / En Route / Office / On Leave — plus office and job-site markers, auto-fitted so the whole firm is visible at a glance. | `/employer?section=tracking` | ✅ live |
| Job "Needs attention" signals *(new Jun 2026)* | Every job card and job detail surfaces cross-section risk badges — open incidents, overdue invoice amounts, workers with certs expiring within 30 days — each tappable to fix; the panel disappears when all clear. | jobs list + job detail | ✅ live |
| Job Issues & Quality / Snags | Log and chase job blockers and problems, and run a quality and snagging list to drive jobs to a clean finish. | `/employer?section=issues`, `/employer?section=quality` | ✅ live |
| Testing Workflow | Track the testing and inspection stage of a job through to completion. | `/employer?section=testing` | ✅ live |
| Job Financials | Per-job cost tracking so employers can see the money picture on each job, not just the firm as a whole. | `/employer?section=financials` | ✅ live |
| Fleet & Photo Gallery | Manage vehicles and vans, and keep a photo gallery of site images organised against the business. | `/employer?section=fleet`, `/employer?section=photogallery` | ✅ live |
| Client Portal (employer side) | Configure the client-facing portal so customers can follow their own job (paired with the public `/portal/:token` view), now with full in-app messaging: clients message from the public portal without logging in, and the employer reads and replies in-thread with unread badges — no email loops. | `/employer?section=clientportal` | ✅ live |

### Finance

| Feature | What it does | Route(s) | Status |
| --- | --- | --- | --- |
| Quotes & Invoices | Draft estimates and bill clients from the hub, with quick-create dialogs for both quotes and invoices. | `/employer?section=quotes` | ✅ live |
| Tenders | Track tender opportunities and bids alongside everyday quoting. | `/employer?section=tenders` | ✅ live |
| Expenses | Log receipts and expense claims with file storage; pending claims surface on the Overview for review. | `/employer?section=expenses` | ✅ live |
| Procurement & Suppliers | Manage suppliers and raise material orders through a procurement engine, keeping purchasing tied to jobs. | `/employer?section=procurement` | ✅ live |
| Price Book | A reusable price book with bundles and settings to standardise rates across quotes. | `/employer?section=pricebook` | ✅ live |
| Reports & Signatures | Business reporting plus a signatures area for sign-offs and approvals. | `/employer?section=reports`, `/employer?section=signatures` | 🟡 partial |

### HR & Safety

| Feature | What it does | Route(s) | Status |
| --- | --- | --- | --- |
| Health & Safety | A central HR and safety record area covering the firm's safety position, feeding the Overview safety score. | `/employer?section=safety` | ✅ live |
| RAMS documents | Create, status-track (draft / submitted / approved / rejected), download and manage risk assessment and method statement documents for each job. | `/employer?section=rams` | ✅ live |
| Incidents | Log and manage accidents and near-misses for an auditable incident record. | `/employer?section=incidents` | ✅ live |
| Policies & Contracts | Hold company policies and procedures, and manage staff contracts and agreements. | `/employer?section=policies`, `/employer?section=contracts` | ✅ live |
| Training Records | Track team training and course completions in one place. | `/employer?section=training` | ✅ live |
| Briefings & Toolbox Talks | Build site briefings and toolbox talks from a template library, run them through a digital sign-off, view them and export a branded PDF — turning safety briefings into a documented, signed audit trail. | `/employer?section=briefings` | ✅ live |
| Compliance | A compliance view that consolidates RAMS, incidents and wider compliance status for the business. | `/employer?section=compliance` | ✅ live |

### Smart Docs (AI document generation)

| Feature | What it does | Route(s) | Status |
| --- | --- | --- | --- |
| AI RAMS | Generates a full risk assessment and method statement from a job pack or description, streaming live progress while it builds, ready to download. | `/employer?section=airams` | ✅ live |
| AI Method Statement | Produces a standalone method statement for a job from a short brief. | `/employer?section=aimethodstatement` | ✅ live |
| AI Briefing Pack | Generates a ready-to-use site briefing pack for the team. | `/employer?section=aibriefingpack` | ✅ live |
| AI Quote | Produces a professional quote document, exported as a PDF. | `/employer?section=aiquote` | ✅ live |
| AI Design Spec | Generates a circuit design specification from a job brief. | `/employer?section=aidesignspec` | ✅ live |

### Employer Mate — the AI business partner (new Jun 2026)

| Feature | What it does | Route(s) | Status |
| --- | --- | --- | --- |
| Employer Mate agent | An always-available AI business partner (floating launcher on every hub page) grounded in nearly 3,000 authoritative construction-industry sources (JIB, ACAS, RICS, HSE, gov.uk, Construction Act). Ask about retention, VAT reverse charge, notifiable work, pricing a job or hiring law and get a cited, streamed answer with copy and PDF export. | all `/employer` pages (sheet) | ✅ live |
| Agentic orchestration | Mate doesn't just advise — it acts, across multiple rounds in one conversation: create a job with its task list, add team members and suppliers, build a quote or invoice, post a vacancy, assemble a job pack, add price-book lines. It sees a live snapshot of the firm each turn, confirms high-stakes actions before executing, and every action is auditable and undoable. | Employer Mate sheet | ✅ live |
| Command palette | ⌘K (or the mobile search button) jumps to any section, fires quick actions (new job/quote/invoice/vacancy/expense) or sends a typed question straight to Mate. | all `/employer` pages | ✅ live |

### Seats & billing (live Jun 2026)

| Feature | What it does | Route(s) | Status |
| --- | --- | --- | --- |
| Seat-based billing | £49.99/month base (or £499.99/year) plus £9.99/month per linked team member — seats are only charged when a worker actually links, and linked workers' own subscriptions are replaced by their seat. Team invites auto-email sign-in details. | billing + team add flow | ✅ live |

### Automations

| Feature | What it does | Route(s) | Status |
| --- | --- | --- | --- |
| Workflow automations | Create rule-based automations (triggers and actions) with categories, an activity log, and the ability to toggle, run on demand and start from templates — letting a firm automate repetitive admin around jobs, people and safety. | `/employer?section=automations` | ✅ live |

### Public magic-link surfaces (no login required)

| Feature | What it does | Route(s) | Status |
| --- | --- | --- | --- |
| Off-the-job training attestation | A no-login page where an apprentice's workplace supervisor reviews a logged training entry (date, hours, activity) and signs it off with their name, work email and an optional comment. The attestation is stamped onto the apprentice's training audit trail instantly for the college and end-point assessor. | `/attest-ojt/:id` | ✅ live |
| Public briefing sign-off (signature capture) | A no-login page where site attendees view a briefing's hazards, risk level, scope and key safety points, then sign on a touch signature pad — including a walk-in form for people not on the original attendee list — to record acknowledgement. | `/briefing-sign/:token` | ✅ live |
| Briefing sign-off (attendee link) | A linked sign-off flow letting listed attendees, or guests, acknowledge a briefing with a captured signature and optional location, recording who attended and when. | `/briefing-signoff/:briefingId` | ✅ live |
| Employer placement portal view | A no-login, read-only dashboard issued to placement employers by a college: shows each apprentice's course progress, attendance, off-the-job hours (total and verified) and end-point-assessment status, so employers can keep an eye on training without an account. | `/employer-view/:token` | ✅ live |

---

## 6. College Hub

A complete further-education delivery, assessment and quality-assurance platform for the training providers Elec-Mate partners with — and the provider-facing other half of the apprentice experience. It runs the tutor's whole day (planning, delivery, marking, learner insight), the IQA's quality role, and the provider's Ofsted/EIF compliance burden, all grounded in each learner's real, live progress data. It plugs into a college's existing systems (LTI) and links **directly to the apprentice's own app** through the live two-way bridge in §6.5.

### 6.1 The college dashboard (`/college`)

The dashboard is itself a large workspace — around 40 working areas grouped into four hubs, surfaced as tabs with live widgets (at-risk predictor, EPA countdown, OTJ forecast, verifier inbox, compliance/acknowledgement trackers, activity feed). The standalone full-page tools in §6.2–6.4 open out from here.

| Dashboard hub | What it contains |
| --- | --- |
| Teaching & Curriculum | Schemes of work, lesson plans, live-lesson delivery, timetable, courses, teaching-resource & document libraries, resource analytics |
| People & Learners | Students directory, Student 360, attendance, grading, ILP management + AI ILP generator, progress tracking, mastery queue, work queue, assessment calendar, cohorts |
| Assessment & Quality | EPA tracking, tutor observations, tutor notebook, tutor workload, quality dashboard, IQA workflow, IQA-OTJ audit, audit log, batch operations |
| Staff & Resources | Tutors, support staff, staff-compliance register, employer-portal section |

### 6.2 Tutor daily tools

| Feature | What it does | Route(s) | Status |
| --- | --- | --- | --- |
| Tutor Today Landing | The morning dashboard: greeting, KPI strip, evidence search, today's classes, inbox, at-risk learners and key dates. | `/college/today` | ✅ |
| Lesson Planning & Delivery | AI lesson-plan generation plus live/recorded delivery, printable guides and AI-generated slide decks — with outcomes, activities and differentiation. | `/college/lessons/:id` (+`/deliver`, `/print`, `/slides`) | ✅ |
| Student 360 Profile | A complete learner view: attendance, grades, AC progress, portfolio, quizzes, EPA, ILP, observations, risk and pastoral notes — with a printable pack. | `/college/students/:id` (+`/print`) | ✅ |
| Evidence Timeline | A per-learner evidence pack with a kind-filtered timeline of all captured evidence for assessment and inspection. | `/college/students/:id/evidence` | ✅ |
| Marking Queue | A cross-quiz marking copilot listing attempts needing review, with bulk AI grading and per-attempt sign-off. | `/college/marking` | ✅ |
| Tutor Quizzes & Assessments | Tutor-created quizzes/mocks with attempt stats, pass rates, an AI grading queue and CSV export. | `/college/quizzes` (+`/:id`) | ✅ |
| AI Notebook | The tutor's analytical AI co-tutor for learner insights, AC gaps, 1-2-1 agendas and observations, grounded in real data. | `/college/ai-notebook` | ✅ |
| Unified Inbox | A combined inbox of portfolio comments, OTJ verifications, IQA samples and message threads, filterable and searchable. | `/college/inbox` | ✅ |
| Curriculum AC Detail | A per-assessment-criterion page: linked resources and lesson plans, learner progress and quiz/evidence links. | `/college/curriculum/ac/:qual/:unit/:ac` | ✅ |

### 6.3 Assessment, OTJ & reporting

| Feature | What it does | Route(s) | Status |
| --- | --- | --- | --- |
| Off-the-Job Training (OTJ) | A college-wide OTJ dashboard against the ESFA 6h/week target: learner status, latest entries, a verification inbox and CSV export for funding evidence. | `/college/otj` (+`/inbox`) | ✅ |
| EPA Readiness Tracking | A cohort view of every learner's EPA verdict status and readiness indicators. | `/college/epa` | ✅ |
| IQA Dashboard | Internal Quality Assurance: sampling plans, findings, standardisation, assessor-drift detection and a coverage matrix. | `/college/iqa` (+`/sampling/:id`) | ✅ |
| Reports Hub | A CSV export hub for 7+ reports: OTJ hours, attendance, cohort progress, EPA readiness/pass rates, AC gaps and quiz results. | `/college/reports` | ✅ |
| Cohort Comparison | A head-of-department tool comparing 2-3 cohorts on count, progress, attendance, OTJ, EPA verdicts and at-risk learners. | `/college/compare` | ✅ |
| Mock EPA simulator *(new Jun 2026)* | Tutors run scored mock EPA assessments per learner, with latest/best score, delta vs the previous attempt and trend feeding the readiness picture — a learner's self-assessment can be inferred from their best mock. | Student 360 → EPA section | ✅ |
| AI EPA readiness verdict *(new Jun 2026)* | A tri-perspective readiness view (learner, tutor, AI): the AI streams a reasoned verdict with predicted grade, confidence, strengths, blockers and BS 7671-cited gaps, built from the learner's real cross-hub evidence; the tutor co-signs or overrides, and an agreement banner flags consensus or outliers. A signals inspector shows every piece of evidence behind the verdict. | Student 360 → EPA section | ✅ |
| Safeguarding queue *(new Jun 2026)* | Every safeguarding concern in one DSL-only queue; non-leads see a neutral "designated leads only" panel that never discloses whether a concern exists. | `/college/safeguarding` | ✅ |
| One-tap college join *(new Jun 2026)* | Shareable invite links that auto-enrol staff or apprentices into the college and cohort — through signup if they don't have an account yet — with student-activation tracking on the dashboard. | `/college/join/:code` | ✅ |

### 6.4 Ofsted / compliance suite

A dedicated toolkit for the provider's inspection and quality burden — a suite of linked tools (compliance pack, EIF lens, SAR, QIP, rehearsal, policies & acknowledgement, staff register — plus the safeguarding queue in §6.3), not one page.

| Feature | What it does | Route(s) | Status |
| --- | --- | --- | --- |
| Compliance Hub | The compliance front door: evidence search and a launchpad to the tools below. | `/college/compliance` | ✅ |
| Compliance Pack | An audit bundle pulling compliance status (in date / awaiting sign-off) into an inspection-ready pack. | `/college/compliance/pack` | ✅ |
| Ofsted EIF Lens | An inspection-ready snapshot mapping evidence to the Ofsted Education Inspection Framework. | `/college/compliance/ofsted` | ✅ |
| SAR Draft | A drafting tool for the provider's Self-Assessment Report. | `/college/compliance/sar` | ✅ |
| QIP Tracker | A Quality Improvement Plan tracker: what needs to happen, why, and progress against it. | `/college/compliance/qip` | ✅ |
| Inspection Rehearsal | An AI mock-inspector that interviews staff with typed Q&A to rehearse for a real Ofsted visit. | `/college/compliance/rehearsal` | ✅ |
| Policy Management & acknowledgement | Versioned policy documents with a read-scroll-sign workflow: staff must scroll to the end before the acknowledgement unlocks, and each sign-off is stamped with version, timestamp and device — an inspection-ready acknowledgement register. | `/college/policies/:id` | ✅ |
| Staff compliance register | Per-staff DBS checks, qualifications, training records, safeguarding training and supervision dates in a drawer with inline editing. | `/college/compliance/docs` (Staff) | ✅ |

### 6.5 Apprentice ↔ College bridge (two-way, live)

The single most important integration in the platform: the College Hub and the apprentice's own app are two ends of one live link. What a tutor does here appears on the apprentice's hub immediately, and the apprentice can act and reply straight back.

| Bridge | How it works | Apprentice sees it at | Status |
| --- | --- | --- | --- |
| ILP / "My College Plan" card | The tutor builds an Individual Learning Plan (headline focus, strengths, focus areas, goals with target/review dates) in the dashboard's ILP Management section. It appears live on the apprentice's hub as the **college card** — "Set by [tutor]", a progress ring and goal list. The apprentice ticks goals off, acknowledges them and **posts comments back**, creating a per-goal two-way thread; the tutor sees "X new from your tutor" / unread markers on both sides. | `/apprentice/college-plan`, hub card | ✅ |
| Assigned quizzes | Tutor-created quizzes are pushed to the apprentice, who takes them in-app; attempts flow back into the tutor's Marking Queue for AI-assisted grading and sign-off. | `/apprentice/college/quiz/:id` | ✅ |
| Portfolio "From your college" | Tutor comments and feedback on portfolio evidence surface in a "What's new from your tutors" callout in the apprentice's portfolio. | `/apprentice/hub` (portfolio) | ✅ |
| OTJ verification loop | The apprentice logs off-the-job hours; entries land in the college's OTJ/verifier inbox for sign-off, then reflect back as verified. | `/apprentice/ojt-hub` → `/college/otj/inbox` | ✅ |
| College AI mentor | An AI study mentor for the apprentice, grounded in their college data (ACs, quizzes, ILP, portfolio, EPA). | `/apprentice/college-ai` | ✅ |
| Two-way chat | Direct messaging between tutor and apprentice. | college chat / apprentice | ✅ |
| Voice Survey | The apprentice's feedback on course satisfaction and support, fed back to the college. | `/apprentice/voice-survey` | 🟡 |

### 6.6 Settings & integration

| Feature | What it does | Route(s) | Status |
| --- | --- | --- | --- |
| Curriculum Settings | Institution toggles for lesson content: British Values, Stretch & Challenge and Inclusion pedagogy. | `/college/settings/curriculum` | ✅ |
| Operational Settings | Thresholds for IQA sampling rate, audit window, attendance bands and EPA verdict thresholds. | `/college/settings/operational` | ✅ |
| LTI Integration | Full LTI 1.3 integration with a provider's existing LMS (Moodle, Canvas and compatible systems): dynamic registration means an LMS admin pastes one URL and Elec-Mate auto-registers as a tool — no key swapping — with OIDC launch, frame-breaking handoff so sign-in lands cleanly outside the LMS iframe, and health-check endpoints. | dashboard (LTI settings) + LMS-side | ✅ |

---

---

## 7. Study Centre

The Study Centre is Elec-Mate's complete learning platform, taking someone from their first day as an apprentice through to chartered-level CPD and the safety tickets every site demands. It bundles full qualification pathways, specialist upskilling tracks, mandatory safety courses and personal-development content into one place — wrapped in a streak, XP and leaderboard system that keeps electricians coming back five minutes at a time. Progress is saved automatically as you read, a "continue where you left off" prompt drops you straight back into the last section you touched, and hundreds of mock-exam questions let learners test themselves before the real thing. Everything is mobile-first and works one-handed on a job site.

### 7.1 Hub & navigation

| Feature | What it does | Route(s) | Status |
| --- | --- | --- | --- |
| Study Centre home | Editorial dashboard surfacing your live streak, total XP and level, quizzes taken with average score, and courses completed. Rotating motivational headlines adapt to whether you're on a streak, building momentum or just starting, and a "continue where you left off" card resumes your last section in one tap. | `/study-centre` | ✅ live |
| Four learning strands | Single grid routing into the four pillars — Apprentice training, Professional upskilling, General upskilling (safety) and Personal development — each showing live completion counts against the strand total. | `/study-centre` → `/apprentice`, `/upskilling`, `/general-upskilling`, `/personal-development` | ✅ live |
| Automatic progress tracking | A background tracker records which section you're on, auto-completes the previous section once you've genuinely engaged with it (10s+), and awards XP — no "mark as complete" button needed. Works across every course in the centre. | All `/study-centre/*` pages | ✅ live |

### 7.2 Apprentice qualification courses

Six full qualification pathways covering the entire apprentice journey, built from hundreds of richly written content sections (typical section pages run 500–700+ lines of structured teaching, worked examples and diagrams) rather than thin stubs. Content is mapped to the relevant City & Guilds / EAL units.

| Feature | What it does | Route(s) | Status |
| --- | --- | --- | --- |
| Level 2 Electrical Installation | Two-year foundation qualification covering health & safety, electrical principles, installation theory and core wiring techniques, broken into modules with numbered teaching sections and end-of-unit mock exams. | `/study-centre/apprentice/level2/*` | ✅ live |
| Level 3 Electrical Installation | Advanced installation, design, fault diagnosis and inspection & testing principles across 8 modules, each with multiple sections and a bank of module-8 mock exams. | `/study-centre/apprentice/level3/*` | ✅ live |
| AM2 preparation & guidance | Practical end-point assessment prep across 8 modules — safe isolation, installation, inspection & testing, fault diagnosis and exam technique — to ready apprentices for the AM2 assessment. | `/study-centre/apprentice/am2/*` | ✅ live |
| HNC Electrical Engineering | Higher National Certificate-level content across 9 modules covering electrical and electronic engineering for building services — the academic step beyond Level 3. | `/study-centre/apprentice/hnc/*` | ✅ live |
| MOET | Maintenance Operations Engineering Technician pathway across 7 modules of multi-skilled maintenance training, with its own mock exam. | `/study-centre/apprentice/moet/*` | ✅ live |
| Functional Skills | Essential maths, English and IT underpinning electrical apprenticeships, with practice content and a mock exam. | `/study-centre/apprentice/functional-skills/*` | ✅ live |
| Apprentice mock exams | Timed, multiple-choice mock exams embedded throughout the apprentice courses (Level 2, Level 3 and MOET each ship multiple papers) with instant scoring, grade banding and full answer review. | within the routes above | ✅ live |

### 7.3 Professional upskilling (CPD)

Fourteen specialist CPD tracks for qualified electricians, each a multi-module course mixing teaching content with embedded knowledge-check quizzes, real-world scenario builders, hands-on practical walkthroughs and FAQ sections. Ten of the tracks ship a dedicated 30-question mock exam with pass-mark grading and explanations.

| Feature | What it does | Route(s) | Status |
| --- | --- | --- | --- |
| 18th Edition Wiring Regulations | BS 7671 wiring regulations and electrical safety requirements presented as a structured CPD course with quizzes. | `/study-centre/upskilling/bs7671-course/*` | ✅ live |
| Inspection & testing | Initial verification, periodic inspection, certification procedures and EICR coding, with scenario and practical components and a mock exam. | `/study-centre/upskilling/inspection-testing/*` | ✅ live |
| EV charging | EV charging infrastructure installation, maintenance and safety protocols, with a mock exam. | `/study-centre/upskilling/ev-charging-course/*` | ✅ live |
| Renewable energy systems | Solar, wind and battery storage installation and maintenance across multiple modules, with a mock exam. | `/study-centre/upskilling/renewable-energy-course/*` | ✅ live |
| Fire alarm systems | Fire detection and alarm design, installation and commissioning, with a mock exam. | `/study-centre/upskilling/fire-alarm-course/*` | ✅ live |
| Emergency lighting | Emergency lighting design, BS 5266 testing schedules and compliance, with a mock exam. | `/study-centre/upskilling/emergency-lighting-course/*` | ✅ live |
| Data & communications cabling | Structured cabling, twisted-pair, topologies and network infrastructure, with a mock exam. | `/study-centre/upskilling/data-cabling-course/*` | ✅ live |
| Fiber optics technology | Optical fibre installation, fusion splicing and OTDR testing, with a mock exam. | `/study-centre/upskilling/fiber-optics-course/*` | ✅ live |
| Smart home technology | Home automation, IoT integration and intelligent building systems, with a mock exam. | `/study-centre/upskilling/smart-home-course/*` | ✅ live |
| Building management systems | HVAC control, lighting management and integrated building automation, with a mock exam. | `/study-centre/upskilling/bms-course/*` | ✅ live |
| Industrial electrical systems | High-voltage systems, motor control and industrial automation — the platform's most advanced track. | `/study-centre/upskilling/industrial-electrical-course/*` | ✅ live |
| Instrumentation | Industrial instrumentation, control loops and measurement techniques. | `/study-centre/upskilling/instrumentation-course/*` | ✅ live |
| Energy efficiency & management | Power quality analysis, energy auditing and optimisation strategies. | `/study-centre/upskilling/energy-efficiency-course/*` | ✅ live |
| PAT testing certification | Portable appliance testing procedures and certification requirements. | `/study-centre/upskilling/pat-testing-course/*` | ✅ live |

### 7.4 Safety tickets & general upskilling

Fourteen cross-industry safety and site-readiness courses — the tickets and awareness training every tradesperson on a UK construction site needs — each with structured modules and most carrying their own mock exam.

| Feature | What it does | Route(s) | Status |
| --- | --- | --- | --- |
| Site safety tickets | CSCS card prep, IPAF (MEWP operator), PASMA towers, working at height, manual handling, COSHH, asbestos awareness, confined spaces, fire safety, first aid, MEWP, scaffolding awareness, CDM regulations and environmental sustainability — each a self-contained course with teaching modules and, in most cases, a mock exam. | `/study-centre/general-upskilling/*` (and per-course routes e.g. `/study-centre/ipaf/*`, `/study-centre/working-at-height/*`) | ✅ live |

### 7.5 Personal development

Eleven soft-skills courses covering the leadership, communication and wellbeing skills that compound over a career, each structured into modules and sections with mock exams on several.

| Feature | What it does | Route(s) | Status |
| --- | --- | --- | --- |
| Personal-development courses | Leadership on site, communication & confidence, conflict resolution, emotional intelligence, resilience & stress management, time management & organisation, goal setting & growth, mentoring & developing others, personal finance, and mental-health awareness — delivered as multi-module courses with section content and mock exams. | `/study-centre/personal-development/*` (and per-course routes e.g. `/study-centre/resilience-stress-management/*`) | ✅ live |

### 7.6 Gamification, progress & mock-exam engine

A genuine, database-backed progression layer that turns study into a habit — XP, levels, streaks, achievements and a competitive leaderboard, all updating automatically as learners work through any course in the centre.

| Feature | What it does | Route(s) | Status |
| --- | --- | --- | --- |
| XP & levelling | Every completed section, quiz and mock exam earns XP, advancing the learner through 10 named levels from "Apprentice" to "Qualified Sparky". A daily XP goal and live level-progress bar keep momentum visible. | platform-wide; surfaced on `/study-centre`, `/study-centre/leaderboard` | ✅ live |
| Study streaks | Any learning activity counts as a study day, building a current and longest streak that's celebrated on the home hero — designed to drive daily return visits. | platform-wide | ✅ live |
| Leaderboard | Ranks learners by XP, streak, quiz average or achievements, filterable by week / month / all-time, with privacy-friendly display names (first name + initial) and a one-tap opt-out toggle. | `/study-centre/leaderboard` | ✅ live |
| Achievements | A defined set of unlockable awards, each worth bonus XP, tracked per learner and shown with locked/unlocked state and progress against the full set. | `/study-centre/leaderboard` | ✅ live |
| Mock-exam engine | A reusable timed-exam engine that draws a randomised question set, lets learners navigate back and forth, then scores instantly with grade banding (Distinction / Merit / Pass / Fail), a duration timer and a full question-by-question review with explanations. Powers the exams across every course strand. | embedded in all course strands | ✅ live |

### 7.7 Public mock exams

A free, shareable bank of practice exams designed to be dropped into trade groups and apprentice chats as a top-of-funnel hook — clean URLs, branded cards and large question pools.

| Feature | What it does | Route(s) | Status |
| --- | --- | --- | --- |
| Free mock-exams hub | 25 free mock exams grouped into trade certs (CSCS, first aid, IPAF, PASMA, asbestos, working at height, manual handling, COSHH, fire safety, confined spaces — 200 questions each), electrical exams (18th Edition BS 7671 A4:2026, C&G 2391, AM2 online knowledge test) and Level 2 / Level 3 unit exams (300+ questions each), all openly accessible. | `/mock-exams`, `/mock-exams/<exam>` | ✅ live |
| SEO topic landings | Dynamic per-topic mock-exam landing pages targeting long-tail search, capturing anonymous attempts so non-logged-in visitors can practise and convert. | `/mock-exams/<exam>/<topic>` | ✅ live |

---

## 8. Wellbeing

Built around the realities of life in the electrical trade, Elec-Mate's Wellbeing hub gives apprentices and qualified electricians a genuinely private space to check in, reset, and spot patterns before they become problems. One role-aware home brings together everything from a 30-second mood tap to real-time peer chat, a downloadable personal safety plan, and one-tap access to crisis lines built for the trade — all working offline and syncing securely to the cloud once signed in. Nothing here is shared with an employer, sold, or used for advertising; the entire experience is engineered to feel like a calm, native mobile app you can reach for on a bad day on site.

### The Wellbeing Hub

| Feature | What it does | Route(s) | Status |
|---|---|---|---|
| Wellbeing hub (role-aware) | A single, personalised home that adapts to whether you're an apprentice or a qualified electrician — re-ordering tools and trade-support charities to match. Shows a live wellbeing ring (0–100 from mood, sleep, journalling and consistency), a check-in streak, a first-run "log how you feel" prompt, and a "patterns we've noticed" smart-insight strip. | `/apprentice/mental-health`, `/electrician/mental-health` | ✅ live |
| Daily mood check-in & 7-day heatmap | One-tap mood logging (5-point scale with haptic feedback), a colour-coded seven-day heatmap, and a consecutive-day streak counter — with a brief success animation and time-aware greetings so checking in feels effortless and rewarding. | hub landing | ✅ live |
| Quick reset row | No-data-needed shortcuts to Breathe, Check in, Journal and Talk — designed for difficult moments where the user just needs one tap to start. | hub landing | ✅ live |
| Daily affirmation | A rotating, uplifting daily message surfaced on the hub landing. | hub landing | ✅ live |
| Trade-specific support | A ranked list of charities built for the electrical trade and construction — Electrical Industries Charity, Lighthouse, Mates in Mind, Andy's Man Club, YoungMinds — re-ordered by role, with one-tap dial. | hub landing | ✅ live |
| Private cloud sync | Mood, journal, sleep and safety-plan entries save instantly on-device and sync to the cloud when signed in, with a clear "Synced / Local only" status and automatic retry — so nothing is lost on a flaky site connection. | all tools | ✅ live |

### Resets & In-the-Moment Tools

| Feature | What it does | Route(s) | Status |
|---|---|---|---|
| Guided breathing | A full-screen animated box-breathing exercise with inhale/hold/exhale phases over multiple cycles, optional sound, and respect for the OS reduce-motion setting for users with vestibular sensitivity. | `?section=breathing` | ✅ live |
| Grounding exercises | A set of interactive grounding routines including the 5-4-3-2-1 senses technique, with step-by-step prompts and progress that saves per day. | `?section=grounding` | ✅ live |
| Quick coping toolkit | Six fast techniques for difficult moments (4-7-8 breath, 5-4-3-2-1, cold reset, tension release, calming mantra, quick distraction) — each with a step-by-step walk-through and an ultra-quick "fast track" version, plus a one-tap Samaritans banner. | `?section=coping` | ✅ live |
| Interactive tools tab | Nine inline mini-tools in one expandable list: mood tracker, stress relief, guided body scan (timed), 15-minute "worry time" window, gratitude capture, energy check, affirmations, goal setting and self-care prompts. | `?section=tools` | ✅ live |

### Tracking & Insights

| Feature | What it does | Route(s) | Status |
|---|---|---|---|
| Wellbeing journal | A full journalling tool with mood selection, rotating reflective prompts, gratitude and trigger capture, taggable entries, search and mood filtering, day-streak and average-mood stats, an insight card, and a one-tap export of all entries to a text file. | `?section=journal` | ✅ live |
| Sleep tracker | Log bed/wake times with automatic duration calculation, rate quality, and tag what affected your sleep. Tracks weekly averages and a quality trend, with a history view and trade-relevant framing around safety on site. | `?section=sleep` | ✅ live |
| Mood insights | Analyses your check-ins over the past week or month: average mood, improving/declining trend, mood distribution chart, best/worst days of the week, and plain-language insights that gently flag when things are dipping. | `?section=insights` | ✅ live |

### Crisis, Safety & Support

| Feature | What it does | Route(s) | Status |
|---|---|---|---|
| Always-on crisis card & sticky bar | A crisis card is permanently visible at the top of the hub with one-tap Samaritans (116 123), SHOUT text (85258) and 999, plus a sticky bottom bar that follows you as you scroll on mobile. Taps trigger haptic feedback and log a private "checking-in" reminder for the user only. | hub (all views) | ✅ live |
| Crisis resources | A dedicated, calm crisis screen prioritising the fastest routes to help, plus priority crisis lines, long-term support lines, trusted online resources, and a local-resource finder. | `?section=crisis`, `/apprentice/mental-health/crisis-resources` | ✅ live |
| Personal safety plan | A guided seven-section safety plan (warning signs, coping strategies, healthy distractions, trusted people, professional contacts, making the environment safe, reasons for living) with completion tracking, quick-dial helplines, and a downloadable copy to print or share with someone you trust. | `?section=safety-plan` | ✅ live |
| Support network | Curated, ranked support options: fastest helplines (Samaritans, Shout, NHS 111), trade-focused charities, and trusted online communities — framed to get the user talking to a real person quickly. | `?section=support`, `/apprentice/mental-health/support-network` | ✅ live |

### Peer Support & Community

| Feature | What it does | Route(s) | Status |
|---|---|---|---|
| Mental Health Mates (peer support) | Connect with a fellow tradesperson who gets it — browse available peer supporters, view their profile, training level and topics, then start a real-time one-to-one chat with presence indicators, typing indicators, read receipts and push notifications. No referrals or waiting lists. | `?section=talk` | ✅ live |
| Become a Mate | Any user can set up a peer-supporter profile in around two minutes — choosing the topics they're comfortable with and toggling their availability so others can find and connect with them. | `?section=talk` → become-supporter | ✅ live |
| Resources library | A searchable, filterable library of trusted self-help guides and short videos from sources like NHS, Mind, HSE, CALM and trade charities — with a favourites system to save what you want to return to. | `?section=resources`, `/apprentice/mental-health/resources` | ✅ live |
| Podcasts | A curated set of around 20 mental-health and wellbeing podcasts for tradespeople, with a featured pick, category filtering, and links out to Spotify, Apple, YouTube and more. | `?section=podcasts` | ✅ live |

### Apprentice-Specific Wellbeing

| Feature | What it does | Route(s) | Status |
|---|---|---|---|
| Stress management | Apprentice-focused stress content covering trade-specific stressors, signs to watch for, breathing techniques and an interactive stress self-assessment. | `/apprentice/mental-health/stress-management` | ✅ live |
| Work-life balance | Strategies and a self-assessment checklist for protecting balance during an apprenticeship. | `/apprentice/mental-health/work-life-balance` | 🟡 partial |

---

## 9. Career & professional identity

Elec-Mate gives every electrician a professional identity that travels with them, not their employer. At its heart is the Elec-ID — a verified digital credential, shareable QR profile and live CV that proves who you are and what you can do in seconds. Around it sits a full career toolkit: an AI-assisted CV builder with downloadable PDFs, a daily-updated UK job board, structured career pathways with day-rate intelligence, and a refer-a-mate rewards programme. Everything is mobile-first and designed to be opened on site, mid-job, with one thumb.

### Elec-ID — your digital professional identity

Elec-ID is a self-contained, tabbed workspace (`/elec-id`) that turns scattered cards and certificates into one verifiable, employer-ready profile. A guided onboarding wizard issues a unique Elec-ID number on first use, and a recovery flow re-issues one for anyone whose ID failed to generate at signup. The profile is privacy-controlled — electricians choose public, employers-only or private visibility, toggle Talent Pool availability, or disable the profile entirely while keeping their data.

| Feature | What it does | Route(s) | Status |
| --- | --- | --- | --- |
| Elec-ID card & overview | A digital ID-card hero showing name, job title, ECS card type and colour, expiry, photo, verification tier and live Elec-ID number with tap-to-copy. A profile-strength ring scores completeness and suggests the next items to add. | `/elec-id` (Overview tab) | ✅ live |
| Guided onboarding & ID generation | A 5-step wizard (welcome, basics, ECS details, verify, complete) that captures role and ECS card and generates a permanent Elec-ID number, with a skip option and a recovery path for missing IDs. | `/elec-id` | ✅ live |
| Document upload & AI verification | Upload or photograph an ECS card, qualification, training record, driving licence or insurance; documents are read automatically, key fields extracted with confidence scoring, and returned verified, queued for review, or rejected with suggested fixes — plus a manual appeal route. Live status updates as verification completes. | `/elec-id` (Documents tab) | ✅ live |
| Verification tiers | A Basic → Verified → Premium ladder that rewards uploading an ECS card and verified qualifications, with progress shown against the next tier. | `/elec-id` (Overview tab) | ✅ live |
| Qualifications | Add and manage City & Guilds, NVQ, 18th Edition, testing, renewables and other UK qualifications with awarding body, dates, certificate numbers, expiry tracking and verified badges. | `/elec-id` (Qualifications tab) | ✅ live |
| Work history | Build a verifiable career timeline — employers, roles, locations, dates and descriptions, with employer-verified markers. | `/elec-id` (Experience tab) | ✅ live |
| Skills & competencies | Record electrical skills by category and proficiency level (beginner to expert) with years of experience and verification status. | `/elec-id` (Skills tab) | ✅ live |
| Compliance & expiry tracking | A single view of everything expiring — ECS card, qualifications and training within 90 days — with renewal links and suggested next steps to stay compliant. | `/elec-id` (Compliance tab) | ✅ live |
| Talent Pool & rate | Opt in to be discoverable by employers, set your day/hourly/weekly/yearly rate and control exactly which sections are visible. | `/elec-id` (Overview tab) | ✅ live |
| Share, QR & timed links | A scannable public QR, an always-on public verify URL, and scoped time-limited share links (24h / 7d / 30d / never) that expose only chosen sections, with view counts and one-tap revoke. Download or native-share the QR. | `/elec-id` (Share tab) | ✅ live |
| Add to phone wallet | Save your Elec-ID to Apple Wallet (iOS) or Google Wallet (Android/web) as a scannable pass for instant on-site verification. | `/elec-id` (Share tab) | ✅ live |
| Public verification page | Anyone with the link or QR sees a clean, login-free profile confirming credentials, ECS card and verified qualifications. | `/verify/:elecIdNumber`, `/share/:token` | ✅ live |
| Training requests | Review and approve or decline training/CPD requests raised against your profile directly from the overview. | `/elec-id` (Overview tab) | ✅ live |

### CV builder

A dedicated CV builder turns the credentials already stored in Elec-ID into a polished, recruiter-ready document, removing the need to retype qualifications, skills and work history.

| Feature | What it does | Route(s) | Status |
| --- | --- | --- | --- |
| Premium CV builder | A guided multi-step builder covering personal info, experience, education and skills, with four professional templates (classic, modern, creative, technical) and a live preview. | `/electrician/cv-builder` | ✅ live |
| Import from Elec-ID | Pulls verified skills, qualifications and work history straight from your Elec-ID so your CV stays in sync with your profile. | `/electrician/cv-builder`, `/elec-id` (My CV tab) | ✅ live |
| AI writing assistance | Generates and refines professional summaries, role descriptions, skills and achievements tailored to electrical roles. | `/electrician/cv-builder` | ✅ live |
| PDF export | Downloads a professionally formatted CV as a PDF, including an ATS-friendly variant and a one-page summary. | `/electrician/cv-builder` | ✅ live |
| My CVs library | Save multiple CVs, mark a primary, and re-open any of them for editing — all listed and synced inside Elec-ID. | `/elec-id` (My CV tab) | ✅ live |

### Job vacancies

A mobile-first UK job board that blends employer-posted roles with daily-aggregated external listings, built for browsing between jobs.

| Feature | What it does | Route(s) | Status |
| --- | --- | --- | --- |
| Jobs hub | A swipeable, card-based job feed with Explore, Saved and Insights tabs, pull-to-refresh and filter pills for category, job type, salary band and source. Employer-posted vacancies are surfaced first. | `/electrician/job-vacancies` | ✅ live |
| Search & filters | Keyword and location search with salary, type and source filtering across combined employer and external listings. | `/electrician/job-vacancies` | ✅ live |
| Save & apply | Save jobs for later, open external listings, or apply directly to employer-posted vacancies from within the app. | `/electrician/job-vacancies` | ✅ live |
| Job market insights | Live market analytics — average and median salary, regional hotspots, job-type mix, salary distribution and top hiring companies. | `/electrician/job-vacancies` (Insights tab) | ✅ live |
| Quick CV apply sheet | A one-tap sheet showing your primary CV with completeness, letting you download or jump to editing before applying. | `/electrician/job-vacancies` | ✅ live |

### Career progression & development

A planning hub that maps where an electrician can go next and what it pays, grounded in current UK industry figures.

| Feature | What it does | Route(s) | Status |
| --- | --- | --- | --- |
| Career progression hub | An editorial hub covering specialist pathways, training, professional bodies and further education, with in-demand roles, day-rate ranges and the requirements/drivers behind each (EV, data centre, heat pump, solar PV, smart-building). | `/electrician/career-progression` | ✅ live |
| Career pathways | Specialist route guides — domestic, commercial, industrial, renewables, EV and data — with the steps and qualifications each requires. | `/electrician/career-progression` | ✅ live |
| Training & courses | Curated routes through 2391, 2396, 18th Edition, EV, MCS and the BS 7671:2018+A4:2026 amendments. | `/electrician/career-progression` | ✅ live |
| Professional accreditation | Membership grades, fees and benefits for IET, ECA, NAPIT and Stroma. | `/electrician/career-progression` | ✅ live |
| Further education | HNC, HND and BEng routes including funded, part-time and distance-learning options. | `/electrician/career-progression` | ✅ live |
| CPD tracker | Log and track continuing professional development against your profile. | `/electrician/career-progression` | ✅ live |

### Referrals

A built-in growth loop that rewards electricians for bringing peers onto the platform.

| Feature | What it does | Route(s) | Status |
| --- | --- | --- | --- |
| Refer-a-mate programme | A personal referral code and link with a scannable, downloadable QR, a tiered reward ladder (Bronze → Platinum), live stats and referral history. Backed by automated reward processing and notifications. | `/settings` (Referrals tab) | ✅ live |
| Contextual share prompts | A reusable share sheet that appears at natural moments — after issuing a certificate or quote — to invite a mate via WhatsApp, native share or copied link. | App-wide (sheet) | ✅ live |

---

## 10. Account, settings & platform

Every Elec-Mate account sits on a polished, mobile-first foundation: a single sign-in that remembers you with biometrics, a settings hub that adapts to whether you're an apprentice, a working electrician or running a firm, and a billing experience that handles trials, plan changes and cancellations gracefully across web, App Store and Google Play. Around that core, the platform layers business-grade profile management, a referral programme, GDPR-compliant privacy controls, push notifications with quiet hours, a connected job calendar, and a native app shell that makes the whole thing feel like it belongs on a phone on site.

### Authentication & account access

| Feature | What it does | Route(s) | Status |
| --- | --- | --- | --- |
| Sign in / sign up | Clean email-and-password sign-in with live email validation, show/hide password, animated success state and a route straight to the dashboard. Sign-up is a guided three-step flow (account, role, trial) that captures your trade role and starts a 7-day free trial. | `/auth/signin`, `/auth/signup` | ✅ live |
| Biometric sign-in | After your first password sign-in, Elec-Mate offers to enable Face ID / Touch ID (or the device equivalent), then lets you unlock the app with a single tap on future visits; credentials are stored securely on-device and re-verified against your password before activation. | `/auth/signin`, Settings → Preferences | ✅ live |
| Password reset & email confirmation | Forgot-password and reset-password journeys plus email confirmation and a "check your email" holding screen, with a breached-password check applied at sign-up. | `/auth/forgot-password`, `/auth/reset-password`, `/auth/confirm-email`, `/auth/check-email` | ✅ live |
| Complete-profile & trial checkout | Post-signup steps that finish your profile and, when needed, route into a trial checkout / OAuth completion handler. | `/auth/complete-profile`, `/auth/checkout-trial`, `/auth/oauth-complete` | ✅ live |
| Protected access & trial paywall | Authenticated routes are gated by subscription state with a graceful trial-expired paywall that offers the right plan for your role; subscription, checkout and payment-success pages stay reachable so you can always upgrade. | App-wide route guard | ✅ live |

### Settings hub

| Feature | What it does | Route(s) | Status |
| --- | --- | --- | --- |
| Settings shell | A role-aware settings centre with eight tabs (Account, Mate, Elec-ID, Business, Preferences, Privacy, Billing, Refer a Mate). On mobile it's a native-feeling card grid that drills into a sticky, swipeable detail view; on desktop it's a clean tabbed layout. Surfaces your plan tier, email and a one-tap upgrade. | `/settings` | ✅ live |
| Account tab | Edit your display name and upload a profile photo, then manage role-specific details through bottom-sheet editors — apprentice course level, year, training provider, ECS card status and supervisor; electrician job title, specialisation, experience and ECS card type; or employer position and company size. | `/settings?tab=account` | ✅ live |
| Mate tab | The home for the WhatsApp AI assistant: a contact-card hero with Mate's live number, one-tap "Open WhatsApp", save-to-contacts vCard, ready-made prompt shortcuts (morning brief, who hasn't paid, what's on today, draft a quote) and a masked view of your connected number. Adapts between "get Mate", "finish setup" and active states. | `/settings?tab=mate` | ✅ live |
| Business tab | Grouped business configuration opened as bottom sheets: company identity and logo, brand colours, payment/banking and Stripe, pricing and margins, accounting connectors, quote and invoice defaults, inspector credentials, testing instruments, regional/locale settings and booking availability (working hours, buffer, daily cap). | `/settings?tab=business` | ✅ live |
| Preferences tab | Choose which dashboard hubs appear, manage push notifications with a one-tap delivery test, toggle eight notification categories with mute-all, set overnight quiet hours, pick certificate defaults and auto-save, control AI smart suggestions, and enable biometric login. | `/settings?tab=preferences` | ✅ live |
| Privacy & data tab | Full GDPR control centre: download a complete data export (shared natively on device, downloaded on web), request account deletion with a typed confirmation and 30-day grace, exercise Articles 15–21 rights, manage analytics cookies on web, read legal policies and review a log of recent privacy actions. | `/settings?tab=privacy` | ✅ live |
| Referrals tab | A referral dashboard with your unique link and code, a downloadable branded QR code, WhatsApp/native share, live stats (referrals, conversions, credits earned), reward tiers with progress, and a history of who you've referred. | `/settings?tab=referrals` | ✅ live |

### Business profile

| Feature | What it does | Route(s) | Status |
| --- | --- | --- | --- |
| Business Profile | A single place to manage your professional identity, feeding directly into certificates, quotes and invoices: contact and company details, quote settings, worker rates, inspector details and signature, testing instruments, qualifications and Elec-ID, payment/banking, accounting connectors and branding/logo. Shows a live completion ring and supports pull-to-refresh on mobile. | `/profile` | ✅ live |
| Elec-ID | A verifiable digital electrician identity with onboarding/activation, document upload with credential capture, qualifications, work experience, skills, a CV builder, compliance/expiry tracking and shareable export — presented as swipeable sub-tabs with a completion progress bar. | `/settings?tab=elec-id`, `/elec-id` | ✅ live |

### Subscriptions & billing

| Feature | What it does | Route(s) | Status |
| --- | --- | --- | --- |
| Plans & checkout | Role-based pricing (Apprentice £6.99/mo, Electrician £19.99/mo, Mate £34.99/mo — new-customer prices from 29 Jun 2026, existing subscribers grandfathered — plus Employer £49.99/mo + £9.99/seat and College) with a monthly/annual toggle, a 7-day free trial on every plan, secure card checkout on web and native in-app purchase on iOS/Android, automatically using the correct store. | `/subscriptions` | ✅ live |
| Plan changes with proration | Existing subscribers switching plans have the price swapped on their current subscription with the difference prorated automatically, avoiding any risk of double-billing. | `/subscriptions` | ✅ live |
| Subscription management | A live "your subscription" card showing tier, status and next billing date, with one-tap access to the billing portal to update payment details and view invoices; native users are routed to Apple/Google subscription managers, with clear guidance on managing where you bought it. | `/subscriptions`, `/settings?tab=billing` | ✅ live |
| Cancel-prevention flow | A respectful three-step cancellation journey: capture the reason, then offer a personalised retention discount locked in for life, a direct line to the founder for bugs, or a clean exit — final confirmation reassures that data is kept safe for 90 days. | `/subscriptions` | ✅ live |
| Win-back & retention offers | Email win-back deep links pre-apply a discounted price at checkout, and the cancel flow offers tier-specific retention pricing, all surfaced through clear in-app banners. | `/subscriptions` | ✅ live |
| Restore purchases & waitlists | Native users can restore previous in-app purchases; pre-launch tiers (Mate, Employer, College) collect early-access waitlist sign-ups, with a WhatsApp number capture for Mate. | `/subscriptions` | ✅ live |
| Plan comparison & FAQ | A full feature-comparison matrix, subscription FAQ and support section help users choose the right plan. | `/subscriptions` | ✅ live |

### Notifications

| Feature | What it does | Route(s) | Status |
| --- | --- | --- | --- |
| Notification centre | A unified feed surfacing certificate and Elec-ID expiry alerts, overdue invoices and quote activity, overdue tasks and due jobs, and safety-equipment reminders — each card deep-links into the relevant part of the app. | In-app dropdown / manager | ✅ live |
| Push notifications & quiet hours | Opt-in push notifications delivered even when the app is closed, with a one-tap delivery test, per-category controls, mute-all, and overnight quiet hours that hold alerts for your morning briefing. | Settings → Preferences | ✅ live |

### Onboarding

| Feature | What it does | Route(s) | Status |
| --- | --- | --- | --- |
| Welcome & setup wizard | New users are greeted with a welcome modal and a quick setup wizard: apprentices answer a single course question, while electricians/employers complete a four-step business setup (company, contact, banking, branding) so certificates, quotes and invoices are ready to send. Skippable with a "finish setup" prompt for anything left incomplete. | Dashboard (first run) | ✅ live |
| Guided feature tour | A multi-step product tour highlighting key inspection capabilities for new users. | In-app modal | 🟡 partial |

### Calendar

| Feature | What it does | Route(s) | Status |
| --- | --- | --- | --- |
| Job calendar | A full month/week/day calendar with swipe navigation, an agenda strip, create/edit/delete events in bottom sheets, working-hours configuration and reminders. Tasks appear alongside events, updates sync in real time, and Google Calendar can be connected for two-way sync. | `/electrician/business/calendar` | ✅ live |

### Platform & mobile shell

| Feature | What it does | Route(s) | Status |
| --- | --- | --- | --- |
| Native app shell | Reusable native-feel building blocks — page wrappers with sticky headers and back navigation, swipeable bottom sheets and card carousels, and touch-optimised buttons — give every screen a consistent app-like feel on iOS and Android. | App-wide | ✅ live |
| Mobile data patterns | Mobile-specific components for horizontally scrollable test tables, section indicators, gesture hints, smart auto-fill and scribble-to-table input keep dense certification data thumb-friendly on small screens. | App-wide | ✅ live |
| Real-time messaging primitives | A toolkit of chat building blocks — reactions, read receipts, typing/presence indicators, link previews, threaded replies, mentions and file attachments — powering in-app messaging surfaces such as employer chat and peer support. | Embedded in messaging surfaces | 🟡 partial |

---

## 11. Public website & SEO

Elec-Mate runs one of the largest dedicated content estates in the UK electrical trade: a marketing landing page, a sales landing for FE colleges, and an automatically-routed library of roughly 1,400 indexable pages spanning technical guides, cost guides, live calculators, free mock exams, AI-tool explainers and head-to-head comparison pages. Every page is built mobile-first with full structured-data markup (Article, FAQ, HowTo, SoftwareApplication, Service and breadcrumb schemas), App Store review proof, and conversion paths into the 7-day free trial. Where a page is about a calculation, it ships the real working calculator free with no signup wall; where it is about an exam, it ships a real timed mock exam. The whole estate is mapped into category sitemaps (~2,000 URLs) and is served through a single auto-generated route registry.

### Marketing & sales landing pages

| Feature | What it does | Route(s) | Status |
|---|---|---|---|
| Main landing page | The primary marketing site. Sells the platform as a single end-to-end workflow (quote → design → comply → work → certify → invoice → get paid → train), with a feature showcase, on-site photo gallery, App Store badges, verified review proof, live pricing pulled from real subscription tiers, an FAQ block, a free-guides teaser, a lead-magnet email capture and an exit-intent modal. | `/` | ✅ live |
| Hub overview landing | A secondary marketing/orientation page framing the four specialised hubs (Apprentice, Electrician, Employer, College) with a "Go to Dashboard" path for signed-in users. | `/index` | ✅ live |
| For Colleges outreach landing | Dedicated sales page for FE colleges, linked from the college outreach email campaign. Pitches apprenticeship management, IQA and compliance, and carries a real enquiry form that submits to a back-end function plus a direct founder email path. Auto-scrolls to the form when arriving via the email CTA. | `/for-colleges` | ✅ live |
| Founder story page *(new Jun 2026)* | A magazine-style personal letter from the founder — electrician background, why the app exists, real App Store review quotes, inline family photos, direct founder email and both app-store badges. Supports `?name=` personalisation for email campaigns. | `/story` | ✅ live |

### Guides library

| Feature | What it does | Route(s) | Status |
|---|---|---|---|
| Technical & how-to guides | The largest content set — hundreds of long-form, structured guides on BS 7671 topics, testing procedures, fault finding, special installations, regs amendments and trade practice. Each guide is editorial-grade with key takeaways, numbered sections, how-to steps, FAQ accordions, related-page link cards and mid-content trial bridges. Guides about a calculation embed the live calculator inline. | `/guides/*` (≈720+ indexed guide URLs) | ✅ live |
| Cost & pricing guides | A dedicated band of guides answering "how much does X cost" search intent (rewires, consumer-unit upgrades, EICRs, EV chargers and more), with labour/material breakdowns and price-range structure aimed at homeowner and landlord queries. | `/guides/*` and top-level cost slugs (≈130 cost-focused pages) | ✅ live |
| Career, business & apprentice guides | Guides covering becoming an electrician, apprenticeship pay and rights, self-employment, VAT/CIS, tendering, debt recovery, CPD and mental health — bridging consumer SEO into the apprentice and business audiences. | `/guides/*`, `/electricians/*` (≈38 electrician-audience pages) | ✅ live |
| Guides & qualification hub pages | Index/hub pages that group the library by theme and qualification (e.g. guides hub, comparison hub, OJT hub, qualification hubs, A4:2026 overview hub, mental-health hub) to spread internal link equity and aid discovery. | `/guides` hub + multiple `*Hub*` pages | ✅ live |

### Free calculators (SEO tool pages)

| Feature | What it does | Route(s) | Status |
|---|---|---|---|
| Live BS 7671 calculator pages | Standalone public pages that embed the same working trade calculators used inside the app — voltage drop, earth-loop impedance, adiabatic/CSA, three-phase, trunking fill, transformer sizing and many more. Free to use with no signup, BS 7671:2018 + A4:2026 referenced, with surrounding educational content, how-to steps and FAQs. Each carries SoftwareApplication schema and converts to the full 70-calculator suite. | `/tools/*`, plus named calculator slugs (≈90 indexed tool URLs) | ✅ live |

### AI agent & app explainer pages

| Feature | What it does | Route(s) | Status |
|---|---|---|---|
| AI tool / agent landing pages | Marketing explainer pages for each AI capability (Cost Engineer, Circuit Designer, Commissioning Specialist, Component Identification, Client Explainer, Fault Finding, Board Scanner and more). Each describes what the agent does, walks through the workflow in plain English, lists capabilities, and routes to signup. These are promotional pages — the working agents live inside the authenticated app, not on the public page. | `/guides/ai-*` and named AI slugs (≈22 pages) | ✅ live |

### Comparison pages

| Feature | What it does | Route(s) | Status |
|---|---|---|---|
| Head-to-head comparison pages | "Elec-Mate vs [competitor]" pages built on a shared comparison template with a structured feature-matrix table (AI Board Scanner, voice test entry, defect-code AI, calculator suite, training courses, etc.) plus FAQs and related comparisons. Targets high-intent switching searches. | `/compare/*`, `/guides/*vs*` (≈44 comparison/vs pages found in the Jul 2026 audit; ~11 head-to-head competitor URLs indexed) | ✅ live |

### Exam prep, free mock exams & topic pages

| Feature | What it does | Route(s) | Status |
|---|---|---|---|
| Free mock exam hub & exams | A public hub plus ~25 standalone timed mock exams (18th Edition/BS 7671, 2391 Inspection & Testing, AM2, Level 2 & Level 3 unit exams, and safety-card exams such as CSCS, IPAF, PASMA, asbestos, COSHH, fire safety, confined spaces, working at height, manual handling). Each runs a real interactive quiz: shuffled questions per attempt, timer, score card, weak-area breakdown and retake, with anonymous attempt logging for social-proof stats. Sample questions are crawlable for SEO. | `/mock-exams`, `/mock-exams/<exam>` (~27 pages) | ✅ live |
| Dynamic mock-exam topic pages | A single dynamic route slices each exam's question bank by topic to generate dozens of focused landing pages (e.g. a per-topic AM2 or 2391 mock), each indexable and resolved from a shared topic registry. Keeps long-tail "<exam> <topic> mock" searches covered without hand-building every page. | `/mock-exams/:examSlug/:topicSlug` (~90+ topic URLs in sitemap) | ✅ live |
| Exam-prep guides | Written prep guides (18th Edition exam tips, 2391/2382 tips, AM2 tips, AM2 simulator guide, apprentice flashcards, calculations for apprentices) that feed learners toward the mock exams and the in-app study centre. | `/guides/*` exam-prep slugs | ✅ live |
| BS 7671 A4:2026 update content | A focused set of pages on the 2026 amendment — AFDD changes, TN-C-S (PNB) earthing, updated model forms (EIC/MEIWC), schedule-of-tests changes and luminaire/RCD protection — positioned around the regs update. | A4:2026 overview hub + `/guides/*` A4 pages (~7 pages) | ✅ live |

### Public shared-link pages (non-marketing)

| Feature | What it does | Route(s) | Status |
|---|---|---|---|
| Public share & portal views | Unauthenticated views for shared artefacts — client quote/scope share, photo share, shared portfolio, public Elec-ID profile, client and employer portal views, public booking with slot picker, invoice mark-as-paid, and apprentice sign-off/verification pages (completion sign-off, supervisor verification, parent digest). These are recipient-facing links generated from inside the app rather than indexed marketing pages. | `/public/*` and share/booking routes | ✅ live |

### Route registry & technical SEO

| Feature | What it does | Route(s) | Status |
|---|---|---|---|
| Auto-generated SEO route registry | A single generated registry lazy-loads every public content page (~1,380 route entries) so the large estate stays code-split and fast. Generated from page config files, not hand-edited. | `src/routes/SEORoutes.tsx`, `src/routes/MockExamRoutes.tsx` | ✅ live |
| Real-content prerender *(new Jun 2026)* | Post-build headless-browser prerender of ~1,400 public routes on Vercel, traffic-prioritised from Search Console data, so crawlers (Google, Bing, AI crawlers, social unfurlers) get full HTML with schema and body content instead of meta-only shells. | `scripts/seo-prerender.mjs` | ✅ live |
| Sitemaps, robots & AI-crawler files | Category-split XML sitemaps (guides, tools, compare, training, mock-exams, pages, images) totalling ~2,000 URLs, plus `robots.txt`, redirect rules and `llms.txt` / `llms-full.txt` for AI crawlers. Page templates emit per-page canonical, noindex (for thin/cannibalising pages) and local-area Service schema where relevant. | `/sitemap*.xml`, `/robots.txt`, `/llms.txt` | ✅ live |
| Shared SEO component kit | A reusable component library (≈30 components) powering every content page: page shell with table of contents and breadcrumbs, FAQ accordion, how-to steps, key takeaways, feature grid, comparison table, related-pages cards, verified reviews, testimonial strip, social proof bar, share/follow widgets, sticky mobile CTA, inline lead-magnet capture, app-store badges and a reusable mock-exam engine. | n/a (infrastructure) | ✅ live |
| Public page templates | Four shared templates (Guide, Tool, Comparison, Course) plus a business template drive consistent structure, schema and conversion across the whole estate from per-page config files. | n/a (infrastructure) | ✅ live |

---

## 12. Admin & founder

Behind Elec-Mate sits a purpose-built operations console that lets the team run the platform end-to-end from a single, mobile-first admin panel — no spreadsheets, no third-party dashboards stitched together. Everything from live revenue and subscription health to user management, identity verification, community-content moderation, lifecycle email campaigns, the in-app Mate agent fleet, and the BS 7671 knowledge base is controlled here. The panel is gated to admin and super-admin roles, with a command palette (⌘K), swipeable navigation, prefetching for instant page loads, an offline banner, and a full audit trail of privileged actions. A separate founder onboarding flow handles the lifetime founder-pricing offer and account activation.

### Admin shell & overview

| Feature | What it does | Route(s) | Status |
|---|---|---|---|
| Admin panel shell | Role-gated console (admin / super-admin) with a grouped navigation rail (Campaigns, Moderation, Billing, Tools), a ⌘K command palette for jumping to any page, route prefetching on hover/touch, swipe-between-pages, and an offline banner. Renders all sub-pages as nested routes. | `/admin` | ✅ live |
| Operations dashboard | Single-glance overview: live revenue figure, trials expiring soon, abandoned-checkout count, a real-time "Live Now" list of users currently online (with current page and device), and an unread support-message inbox. Pull-to-refresh and animated counters. | `/admin` | ✅ live |
| Analytics | Sign-ups over time, daily active users, a conversion funnel, top user cohorts/pages by views, and a forward revenue forecast, all filterable by date range. | `/admin/analytics` | ✅ live |
| System health | Live checks against the database and critical tables, plus row counts across key tables (profiles, reports, chat, presence, events) so the team can confirm the backend is healthy at a glance. | `/admin/system` | ✅ live |
| Settings | Edit platform-wide settings grouped by category, with quick controls for free-trial length and a maintenance-mode toggle, plus a danger zone to clear caches and reload settings from source. | `/admin/settings` | ✅ live |
| Audit log | Chronological, filterable record of every privileged admin action — actor, entity type, old/new values, timestamp and user agent — for accountability and compliance. | `/admin/audit` | ✅ live |
| Data export | Export key datasets (profiles, vacancies, conversations, Elec-ID profiles, apprentice progress, support tickets, audit logs) to CSV or JSON with selectable fields and live row counts per table. | `/admin/export` | ✅ live |

### Users, revenue & billing

| Feature | What it does | Route(s) | Status |
|---|---|---|---|
| User management | Searchable, filterable directory of every account with an engagement score and quick filters. A management sheet lets admins change roles, grant or manage subscriptions, and delete users — each action written to the audit log. Includes an activity sheet showing a user's recent behaviour. | `/admin/users` | ✅ live |
| Revenue | Consolidated live revenue view combining card subscriptions and mobile (App Store) revenue, with a last-14-days trend, MRR and projected MRR, and a per-product mobile revenue breakdown. | `/admin/revenue` | ✅ live |
| Subscriptions | Reconciles web (card) and App Store subscription data — active and trialing counts, tier breakdowns, active price points, and flags discrepancies between the billing provider and the platform's own records. | `/admin/subscriptions` | ✅ live |
| Failed payments | Surfaces failed charges with customer, amount and decline reason, an email-dunning timeline per user, and full invoice details with a link to the hosted invoice, filterable by time window. | `/admin/failed-payments` | ✅ live |
| Offers & promo codes | Create, edit, activate and deactivate promotional offers, send promo offers to users by email, and track redemptions. | `/admin/offers` | ✅ live |

### Moderation & verification

| Feature | What it does | Route(s) | Status |
|---|---|---|---|
| Elec-ID verification | Review queue for electrician and employer Elec-ID profiles — approve, reject or request changes, including bulk actions, so only genuine, verified trade identities carry the verified badge. | `/admin/elec-ids`, `/admin/verification` | ✅ live |
| Document review | Reviews uploaded Elec-ID supporting documents (qualifications, cards) with machine-extracted field data and per-field confidence scores, highlighting low-confidence fields. Approve, reject or batch-process with keyboard-driven next-document flow. | `/admin/document-review` | ✅ live |
| Employer vacancy moderation | Approve or reject employer-posted job vacancies before they go live, reviewing title, pay, description, requirements and benefits, with decisions logged. | `/admin/vacancies` | ✅ live |
| Pricing moderation | Reviews community-submitted trade pricing — approve, reject or delete each submission — keeping the shared pricing data clean and trustworthy. | `/admin/pricing` | ✅ live |
| Conversation moderation | Search and filter community chat messages by category and delete inappropriate content. | `/admin/conversations` | ✅ live |
| Support & messaging | Support-ticket inbox with threaded responses, a direct admin-to-user messaging tool with user search, and a unified user-messages view. | `/admin/support`, `/admin/user-messages` | ✅ live |
| Announcements | Compose, schedule, target (by role) and publish in-app announcement banners; users see a dismissible banner that respects their dismissals. | `/admin/announcements` | ✅ live |
| Feature flags | Create and toggle feature flags, optionally targeted at specific audiences, to roll features out or off without a deploy. | `/admin/feature-flags` | ✅ live |
| Email logs | Searchable log of every transactional email sent — recipient, subject, status, template and provider — filterable by status. | `/admin/emails` | ✅ live |

### Growth & lifecycle campaigns

| Feature | What it does | Route(s) | Status |
|---|---|---|---|
| Trials | Trial-conversion command centre: conversion funnel, per-status segmentation (ending today/tomorrow, expired, converted), 7-day activity sparklines, and one-tap or bulk trial-reminder emails. | `/admin/trials` | ✅ live |
| Win-back | Targets cancelled and never-subscribed users with win-back offers, sent individually or in bulk. | `/admin/winback` | ✅ live |
| Incomplete signup | Recovers abandoned checkouts with targeted re-engagement emails, showing recently emailed users and a live conversion rate for the campaign. | `/admin/incomplete-signup` | ✅ live |
| Apprentice campaigns | Versioned email campaigns aimed at apprentices, with recent/older segmentation, per-tab counts and individual or bulk sends. | `/admin/apprentice-campaigns` | ✅ live |
| College outreach | Contact list and campaign sender for further-education colleges, with filtering, test-send-to-self, and campaign history. | `/admin/outreach` | ✅ live |
| Business outreach | Company contact list (segmented by source) with a campaign sender and campaign history for B2B/employer outreach. | `/admin/business-outreach` | ✅ live |
| Cold outreach | Read-only live stats (sent, opened, replied, bounced, unsubscribed) from the external cold-email tooling. | `/admin/cold-outreach` | ✅ live |
| Founders | Manages the founder programme — create and view founder invites, track activated vs pending, and trigger a final-push send. | `/admin/founders` | ✅ live |
| Early access | Issues early-access invites (single or batch) and tracks invite activity and open rates. | `/admin/early-access` | ✅ live |

### Mate agent operations

| Feature | What it does | Route(s) | Status |
|---|---|---|---|
| Mate fleet monitor | Read-only health view of every provisioned Mate agent: per-user tool-call volume over 24 hours, success/failure counts, last-active time, and 7-day tool reliability. Identifies agents that are failing or idle. | `/admin/mate` | ✅ live |
| Mate user detail | Drill-down per agent: 30-day token spend, a 7-day tool-usage breakdown, and account actions for that user's agent. | `/admin/mate/:userId` | ✅ live |
| Provision Mate | A guided sheet to provision a new Mate agent for an existing user — pick the profile, enter an E.164 phone, choose a role — which sets up the profile, message routing and agent workspace in one step. | `/admin/mate` (sheet) | ✅ live |

### Knowledge base & content processors

| Feature | What it does | Route(s) | Status |
|---|---|---|---|
| Standards edition manager | Ingests a BS 7671 edition from a PDF (parsing regulations, tables, figures, cross-references and pages), tracks per-edition row counts, and lets the team activate the edition that powers the AI's compliance answers — so a new amendment can be brought live without a code change. | `/admin/iet-knowledge` | ✅ live |
| Knowledge processor | Status dashboard showing how much reference content (BS 7671, On-Site Guide, City & Guilds Levels 2/3, Guidance Note 3, EV charging, emergency lighting, health & safety, and more) has been processed, with a document processor and a maintenance/enrichment tester. | `/admin/rag-processor` | ✅ live |
| Knowledge uploader | Uploads BS 7671 regulations, installation knowledge and pricing data and prepares it for AI-powered lookups. | `/admin/knowledge-uploader` | ✅ live |
| Enrichment console | Long-running, multi-source content-enrichment workbench with configurable worker concurrency and live progress/compliance metrics across regulations, health & safety, pricing, practical-work and design-knowledge sources. | `/admin/enrichment` | ✅ live |
| Learning review | Reviews and approves AI-suggested knowledge-base improvements drawn from user feedback, writing approved updates into the knowledge base with a changelog entry. | `/admin/learning-review` | ✅ live |
| On-Site Guide processor | One-tap processing of the On-Site Guide into searchable chunks. | `/admin/process-onsite-guide` | ✅ live |
| Training photo upload | Tooling to upload training/reference photography. | `/admin/training-upload` | 🟡 partial |

### Founder onboarding

| Feature | What it does | Route(s) | Status |
|---|---|---|---|
| Founder claim | Validates a one-time founder invite token and presents the locked-forever founder price (£3.99/mo vs £12.99) with a feature summary, then starts a hosted checkout. | `/founder/claim` | ✅ live |
| Founder signup | Full founder onboarding — create an account (with live password-strength checks) or continue as an existing user — and proceed to hosted checkout to lock in founder pricing. Handles the Android in-app case by letting the user copy their invite link to complete checkout on the web. | `/founder/signup` | ✅ live |
| Founder success | Post-purchase confirmation and "what's next" onboarding, prompting sign-in where needed and pointing founders at direct founder support. | `/founder/success` | ✅ live |

---

## 13. WhatsApp Mate — a separate product (not an app screen)

**WhatsApp Mate** is Elec-Mate's conversational agent that runs on Elec-Mate's own server and talks to electricians over **WhatsApp** — not a page inside the web/mobile app. It's the same "Mate" personality as the in-app assistant but delivered through messaging, with its own set of business tools (invoicing, tasks, analytics, regulation help) scoped per user. It's listed here for completeness and to draw the line clearly: when marketing the app, **Elec-AI (§4)** is the in-app assistant; **WhatsApp Mate** is the messaging service users activate separately (the Business AI flow in §3.3 is where activation begins). Treat them as two delivery channels for one assistant brand, not duplicate features.

---

---

## Cross-cutting notes (audit findings)

**2. Apprentice Hub**
- Routing note: /apprentice/portfolio-hub/* is RETIRED and now redirects to /apprentice/hub (UnifiedApprenticeHub). The hub also redirects legacy ?tab=hours to /apprentice/ojt-hub. Many older standalone page files still exist in src/pages/apprentice/ (e.g. ApprenticeOJT, PortfolioBuilding at top level, OnJobSupervisorKnowledge, TestingProcedures) — some are wired into routes, but there is clear overlap/legacy duplication between top-level pages and the toolbox/* and on-job-tools/* versions (e.g. PortfolioBuilding exists both at /apprentice/PortfolioBuilding and /apprentice/toolbox/PortfolioBuilding). I documented the live, reachable surfaces.
- OTJ hub forecast uses hard-coded constants (WEEKLY_TARGET_HOURS=7.5, YEAR_TARGET_HOURS=400, PROGRAMME_WEEKS_REMAINING=30). PROGRAMME_WEEKS_REMAINING is a fixed estimator, not derived from the apprentice's actual programme end date, so the compliance forecast is approximate, not a per-learner exact projection.
- AM2 'AI scoring' claim: the hub home card describes EPA as 'AI scoring' and AM2 mode cards exist (safe-isolation 732 lines, fault-finding 1722 lines, testing-simulator with full MFT instrument — all substantial real implementations). AM2 knowledge/BS7671 quiz and drill modes are present. I did not deep-read every AM2 scoring path to confirm which use an LLM vs rule-based scoring; the EPA professional discussion and knowledge quiz clearly invoke AI and use speech-to-text.
- Voice survey (/apprentice/voice-survey) was not deep-read; marked partial as I could not confirm the full implementation depth from the routes/hub alone.
- 'Ask Dave' AI tutor and College AI are TWO distinct AI surfaces (advanced-help vs college-ai) with overlapping framing (both grounded in the learner's course data). Not a bug, but worth noting they coexist and could read as redundant to a user.
- Per the project memory rules, I deliberately avoided mentioning RAG/embeddings/table names and internal version labels (e.g. the professional-tools-v2 folder is surfaced only as 'Professional tool guide'). The AdvancedHelp page's own UI shows a 'BS 7671 RAG' capability pill in code — that is an existing in-product label that arguably violates the no-RAG-in-UI rule and may want review, but I kept it out of the marketing prose.
- Inspection & Testing for apprentices maps to two routes (inspection-testing and inspection-testing-hub/LearningHubPage); the hub home links to the -hub variant. Both resolve to real pages. Full I&T content is audited separately per the brief; only the apprentice entry points are covered here.
- Study Centre course content (Level 2/3 courses, mock exams, EAL/City & Guilds course pages) is intentionally EXCLUDED here per the brief even though many of those page files live under src/pages/apprentice/ — they belong to the separately-audited Study Centre.

**3.1 Jobs, projects & field work**
- Time Tracker reads/writes the `time_sessions`/`time-sessions` table and creates invoices via local invoice storage (useInvoiceStorage) plus uuid-generated drafts — invoices are saved to the app's invoice store, not pushed to Stripe. 'Bill' = creates a draft invoice in-app.
- ProjectAINotes only READS saved notes from a project JSONB field and lets you delete them — there is no in-component generation path visible; AI notes are written elsewhere (e.g. by Mate). Marked partial accordingly.
- Snapped 'BS 7671 grounded' badge on snag photos and the send-snag-report PDF depend on edge functions (parse-snag-photo, send-snag-report). Per project rules I described the outcome (BS 7671 references) and did not name the mechanism. Could not exercise the edge functions; behaviour inferred from code paths.
- Voice capture (site visit + task quick-add) relies on @capacitor-community/speech-recognition / Web Speech and an auto-process edge-function call to extract items. Real wiring present; transcription quality not verifiable from code.
- WorkerToolsHub gates access on an employee record but has a DEV_WHITELIST hardcoding 'founder@elec-mate.com' and 'andrewgangoo91@gmail.com' for access without an employee record — dev backdoor, not a user-facing feature.
- PhotoDocsPage is a thin wrapper around the shared PhotoDocumentation component from electrician-tools/site-safety (same component powers the safety-photo flow) — not a standalone bespoke build.
- Several routes are inferred from navigate() calls and the Business Hub back-links (e.g. /electrician/site-visits, /electrician/photo-docs, /electrician/worker-tools); exact route registration was not cross-checked against the router, so paths should be verified against App routing before publishing.
- Multiple overlapping 'time' concepts exist: the self-employed Time Tracker (time_sessions) and the employed-worker Timesheets (clock in/out via useTimesheets) are separate systems — do not conflate them.
- Snagging and Tasks both have a 'snagging' concept: SnaggingPage uses a dedicated snags store, while ProjectDetailPage derives snags from tasks tagged 'snagging'. Two representations of snags coexist.

**3.3 Business suite — quoting, invoicing & money**
- BusinessAdmin.tsx (/electrician/business-admin) is an explicit 'Coming Soon' stub: six disabled, non-clickable cards (links are '#', opacity-60, cursor-not-allowed). It is routed and reachable but delivers no functionality — must not be presented as a live feature.
- Stripe Connect is real but maturity is uneven vs. the in-app surface. Per project memory, only a tiny amount (~£300) has actually settled via Stripe Connect; the 'Pay Now'/card-payments capability exists in code (OAuth connect, status sync, pay-now button on emailed invoices) but adoption/throughput is minimal. The code-level feature claim is accurate; do not imply meaningful payment volume.
- The Business Hub 'Mate' Assistant calls the `tasks-ai-assistant` edge function (streaming, voice, propose-then-approve). It is scoped to tasks/projects/customers/regs — NOT the full 197-tool MCP/WhatsApp toolset. Per memory, Business Hub AI and WhatsApp Mate are separate brains; I have kept them as distinct features and not conflated their capabilities.
- The WhatsApp Mate (business-ai) sales/onboarding flow is marked partial: per project memory the Mate tier is pre-launch and provisioning has known gaps (signup auto-provisioning + /api/provision-agent incomplete). The dashboard view itself renders real data (agent activity log, dashboard stats) so it is live for already-provisioned users, but end-to-end self-serve activation should not be claimed as fully proven.
- Quote->invoice and acceptance data are stored on the legacy `quotes` table (invoice fields like invoice_status, invoice_raised live on quote rows), while memory notes invoices were migrated to a separate `invoices` table for MCP/edge use with dual-write compat. The front-end business suite still reads/writes the `quotes` table for both quotes and invoices (useInvoiceStorage, direct .from('quotes') updates). Functionally consistent but worth noting as a transitional data model.
- mateCapabilities.ts toolMetaMap is a marketing/activity-feed catalogue of MCP tool names (e.g. estimate_from_photo, get_cash_flow_forecast, get_profitability_analysis). These describe WhatsApp Mate's tool surface, not in-app Business Hub buttons. I sourced photo-to-quote, cash-flow forecast and profitability claims as Mate (WhatsApp) capabilities, not as standalone in-app screens, to avoid overclaiming the web UI.
- Quote 'send' is largely PDF-generation + email-link / WhatsApp-share + mailto, plus a Resend-backed emailed invoice with optional pay-now link. There is no in-app one-click 'send quote email' with tracking beyond reminders and open-tracking; the quote send dropdown (QuoteSendDropdown) was referenced but not read line-by-line — open-count tracking and reminder cap (3) are confirmed in QuoteViewPage.
- Customer payment-reliability stats, profitability and lifetime-value style insights surface in CustomerPaymentStatsCard/CustomerAnalyticsPanel and via Mate analytics tools; I described the per-customer financial record conservatively (quotes, invoices, payment stats) rather than claiming a full profit-per-customer P&L in the web UI.

**3.4 Business Development — guides & financial calculators**
- All 14 calculators on the hub (BusinessCalculators.tsx) are routed and have genuine calculation logic — none are stubs. The hub itself hard-codes status:'available' for all 14 and renders no disabled tiles, so there is currently no 'coming soon' calculator in the grid.
- The brief asked for '15 financial calculators' but the code shows exactly 14 distinct calculator tiles/routes. The likely 15th is the 'Tax & Finances' GUIDE page (separate from the 'Tax & NI Estimator' calculator), or a miscount; I documented all 14 real calculators plus the guide separately.
- Business Documents / Templates page (BusinessTemplates.tsx) is guidance-only: it describes 20+ template types but downloads are NOT implemented — it ends with an explicit 'Templates Coming Soon' notice stating downloadable Word/Excel/PDF versions are 'currently developing'. Marked 🟡 partial. Do not market downloadable branded templates as live.
- Business Cost Calculator's 'Export Business Plan' button is a stub — clicking it only fires a toast saying 'PDF export coming soon!'. The calculator itself works; only the PDF export is unimplemented.
- Calculator persistence is local-only: scenarios/history use localStorage (storageSetJSONSync) per device, not synced to the account/cloud. Job Profitability, Hourly Rate, Business Cost, Pricing Strategy and Equipment ROI save scenarios locally.
- Cash Flow Planner is the most feature-rich (driven by useCashFlow hook + ~15 child components: tabs, sidebar, scenario planner, financial insights, quick-start templates, CSV/clipboard export). I confirmed the page wiring but did not read every child component, so exact insight/projection internals are inferred from the orchestrating page and hook usage.
- Guides contain marketing-style statistics presented as fact (e.g. '300% more likely to succeed', '85% success rate', specific ROI ratios). These are static hard-coded copy in the page files, not data-driven — fine for the guide context but they are editorial claims, not computed figures.
- Some guide/calculator copy still carries '2025' rate-reference labels and a '2025' badge (Hourly Rate Calculator). Current tax-year handling in Tax & NI Estimator offers 2025/26 and 2024/25 — verify thresholds are current before any compliance-sensitive marketing claim.
- The Hourly Rate Calculator's <title> uses 'ElecMate'/'Elec-Mate' inconsistently across calculator Helmet tags (e.g. Job Profitability title says 'ElecMate'). Cosmetic SEO-title inconsistency, not user-facing in the app body.
- There is a separate SEO marketing page HourlyRateCalculatorGuidePage (routed under SEORoutes) and a DebtRecoveryElectricianPage — these are public/SEO landing variants, distinct from the in-app tools documented here; not part of this section's assigned paths.

**3.5 Materials & pricing**
- ToolsMarketplace.tsx passes listsPath='/electrician/tools/lists' and renders a 'My Lists' button, but NO route is defined for tools/lists in ElectricianHubRoutes.tsx — this is a dead link (the materials equivalent /materials/lists IS routed). Worth fixing or removing the prop.
- There are two materials pages: the live one (MaterialsMarketplace -> UnifiedMarketplace, route /electrician/materials) and a legacy ElectricalMaterials kept on route /electrician/materials-old. The -old page appears to be a deprecated/superseded implementation still left routed; not surfaced in primary nav. Many components under src/components/electrician-materials/ (e.g. PremiumMaterialCard, MaterialSmartSearch, MaterialTopDiscounts, DealOfTheDay, BulkPricingCalculator, JobSpecificMaterialRecommendations, MaterialsAdminPanel) likely belong to that legacy page and are NOT used by the current UnifiedMarketplace — significant duplication/dead-ish code in that folder.
- marketplace/ has its own DealOfTheDay AND electrician-materials/ has DealOfTheDay + MaterialDealsOfTheDay — duplicated deal components across the old and new implementations.
- Supplier count is partly dynamic (from search facets) with a hard-coded fallback label ('10 UK wholesalers' for materials, 'UK suppliers' for tools) — the '10 wholesalers' / '6 suppliers' figures in Procurement copy are static strings in the page, not derived live, so treat exact supplier counts in marketing prose with caution.
- Procurement, materials-list parsing and photo OCR rely on edge functions (compare-materials-prices, parse-materials-list, parse-materials-photo). These are real wired calls but functionality depends entirely on those backend functions returning data; the photo path uses vision parsing. Could not verify edge-function health in this audit.
- InsightsDashboard initialises some MarketStats with hard-coded placeholder values (regionsWithData: 12, averagePriceChange: 2.3) before/if the fetch returns nothing — some displayed insight figures may be defaults rather than live data.
- Live metal prices and job pricing both rely on community/external-fed data via edge functions; coverage and freshness vary by region (the UI itself surfaces 'No prices found' and confidence/sample-size, so this is partial-by-design, not broken).
- MaterialsProcurement.tsx and MaterialsLists.tsx both contain hard-coded marketing strings like 'Compare prices across 6 suppliers' / 'Searching 6 suppliers' — keep prose generic ('multiple UK suppliers') rather than quoting these counts.

**3.6 Calculators & design tools**
- The main calculator engine is NOT in src/components/calculators/ (which only contains a shared/ helper folder). The 75 calculator components actually live in src/components/apprentice/calculators/ and are wired up via a giant switch in src/pages/electrician-tools/Calculations.tsx with the picker in CalculatorSelector.tsx (63 entries exposed in the dropdown; ~73 cases in the switch, so a handful of switch cases like solar/heat-pump/data-centre are reachable only programmatically, not from the selector list).
- DEAD/ORPHANED CODE: src/components/zs-calculator/, src/components/rcd/, and src/components/cable-capacity/ have ZERO importers anywhere in src (verified by grep). They are standalone component sets (Zs results display, RCD type/testing/regulation tabs, dynamic current-capacity table, environmental factors) that are not routed or rendered. I did not document them as live features. Equivalent functionality exists instead as individual calculators in the apprentice/calculators set (ZsValuesCalculator, BS7671ZsLookupCalculator, RCDTripTimeCalculator, CableCurrentCapacityCalculator).
- src/components/fault-finding/ IS used, but only as a child sheet (FaultFinderSheet -> DiagnosticWizard) inside the EICR wizard and the AM2 simulator — there is no top-level standalone Fault Finder route. The wizard itself is small (DiagnosticWizard 71 lines, diagnosticLogic 82 lines, diagnosticQuestions 49 lines), so it is a real but lightweight rule-based diagnostic, hence marked partial. There is a richer assigned-path expectation here; the implementation is modest.
- Cost Engineer is a real AI streaming tool (CostEngineerInterface with useCostEngineerGeneration hook + edge functions create/process-cost-engineer-job per CLAUDE.md). The 'CostEngineerCards' file inside install-planner-v2 is a separate in-chat presentation card, not the standalone Cost Engineer page. CostEngineerQuotes.tsx exists but its route is commented out in ElectricianHubRoutes ('re-add when the cost-engineer redesign lands'), so the quotes sub-view is currently NOT routed.
- Install Planner has both an older src/pages/electrician-tools/InstallPlanner.tsx AND the live InstallPlannerV2.tsx; the route /electrician/install-planner maps to V2. The 'install-planner' path in ElectricianRoutes.tsx is just a Navigate redirect. The folder is named install-planner-v2 internally but I avoided the 'v2' label in prose per the no-version-labels rule (described it as 'Installation Designer').
- Could not enumerate every one of the 75 calculator leaf components individually; I verified the registry/selector grouping and a representative sample of engines, and gave counts + families rather than per-file claims, per the instructions for large content sets.
- Circuit Designer relies on backend AI (designer-agent / circuit-design edge functions); error-handling code references a knowledge base / regulations source. Per UI rules I framed provenance as 'BS 7671-compliant' outcome rather than the mechanism. Live behaviour depends on those edge functions being deployed and AI service availability.

**3.7 AI Tooling (specialist tools) & §4 Elec-AI**
- The AI Tooling hub (AITooling.tsx) advertises six tool cards but only FIVE distinct destinations: 'Quick Capture' (Featured 01) and 'Component ID' (Visual 03) both navigate to /component-identify. So the hub has a deliberate duplicate entry, not six unique tools.
- DEAD/UNROUTED pages in src/pages/electrician-tools/ai-tools/: RegulationsPage.tsx, CircuitDesignerPage.tsx and ReportWriterPage.tsx are imported as lazy components in src/routes/ElectricianRoutes.tsx (lines 30-37) but have NO <Route> element registered anywhere, so they are unreachable. MaintenanceAdvisorPage.tsx and VisualAnalysisPage.tsx have no import and no route at all — fully dead. The AITooling hub does not link to any of these five. I deliberately excluded them from the feature tables.
- DiagramBuilderPage.tsx (the largest AI tools file, 68KB, a real diagram/room-planner with symbol library, canvas, AI room builder dialog, save/export) IS routed — but under src/routes/ElectricianHubRoutes.tsx at electrician/business/room-planner, NOT under the AI Tooling hub. It belongs to the Electrical Hub / room-planner area, so I left it out of this section to avoid double-counting; flag for whoever owns that section.
- Two parallel implementations of the visual tools exist: the live editorial per-tool pages (ComponentIdentifyPage, FaultDiagnosisPage, etc., last edited 6 May) AND an older generic VisualAnalysisPage + VisualAnalysisRedesigned component that mode-switches on the URL segment. The generic VisualAnalysisPage is unrouted/superseded; the per-tool pages are the live path. Confirms the per-tool pages are the real surface.
- Edge functions backing each tool (verified by reading invoke calls): Component ID + Install Verify -> 'visual-analysis'; Fault Diagnosis -> 'visual-fault-diagnosis-rag' (text) and 'visual-analysis' (photo); Wiring Guide -> 'wiring-diagram-generator-rag'; Client Explainer -> 'generate-electrical-report'; Elec-AI assistant -> 'conversational-search' (streamed via raw fetch); Regulation Search -> 'ai-regulation-search'. Did not verify these edge functions are deployed/healthy — only that the front end calls them.
- src/components/agents/ (only a 'shared' subdir), src/components/agent-response/ and src/components/elec-ai/ (single ElecAiBanner) are shared/presentational building blocks (confidence badges, regulation citation tooltips, structured design view, banner) — not user-facing features in their own right. Not separately listed.
- The Component ID 'progress %' bar is a cosmetic fake — it increments on a random-interval timer (Math.random) and is not tied to real backend progress. Cosmetic only; does not affect the result.
- Business AI / 'Mate' (src/components/business-ai/, route electrician/business-ai) is the WhatsApp agent's sales/onboarding/dashboard surface, a different product from the in-app Elec-AI chat. Per task scope, §4 covers only the single in-app sidebar assistant + Regulation Search, so Business-AI is intentionally excluded here and should be documented in its own Mate/Elec-AI agent section.

**3.8 Site Safety & RAMS**
- The Site Safety hub (src/pages/electrician-tools/SiteSafety.tsx) drives ~22 tools via internal `activeView` state, NOT separate routes. Only `/electrician/site-safety`, `/electrician/site-safety/ai-rams`, `/electrician/health-safety` and `/electrician/method-statement` are real URLs; everything else (COSHH, permits, fire watch, accident book, etc.) is reached by tapping a card inside the hub. Deep-links to individual tools mostly do not exist (only ?tab=briefings and ?tab=documents query params are honoured).
- AI RAMS appears via TWO entry points that share the same AIRAMSGenerator component: the in-hub 'RAMS Generator' card AND the standalone /electrician/site-safety/ai-rams route. The Health & Safety Specialist (/electrician/health-safety) is a SEPARATE, parallel RAMS generator with its own streaming UI and edge function — there is meaningful duplication between these two RAMS-generation paths.
- Two different edge functions are referenced for RAMS generation: AIRAMSGenerator invokes `rams-generator`, while CLAUDE.md documents `health-safety-v3`/`create-health-safety-job`. I did not open the edge functions to confirm which is canonical/current — could not verify both are live.
- The standalone Method Statement page (/electrician/method-statement, AIMethodStatementGenerator) and the in-hub Method Statement tool (MethodStatementGenerator -> MethodStatementWizard) are DIFFERENT components, so 'Method Statement' has two distinct implementations.
- Marketing prose for AI RAMS describes capabilities (background jobs, draft recovery, retry, auto-save, push notifications, photo/drawing attachments) verified directly in AIRAMSGenerator.tsx. The 'about a minute' claim derives from EXPECTED_TOTAL_SECONDS = 180 (a 3-minute visual countdown), so 'around a minute' is optimistic — closer to 1-3 minutes.
- Safety Shares is marked partial: it has an old/standard tier AND an 'Enhanced' tier for Alerts and Resources only (Learning From Experience, Industry News, Major Projects have no enhanced variant). The hub also renders a `SampleDataLoader` component on the page, suggesting some content may be seeded/sample data rather than fully populated live content. Could not verify the underlying data is real production content vs. samples.
- Two standalone Permit-to-Work routes exist under /inspection/ (PermitToWorkPage) in addition to the in-hub PermitToWork tool — possible overlap/duplication between the inspection-area permit page and the site-safety permit tool.
- EnhancedHazardDatabase is a thin re-export wrapper around HazardDatabaseV2 (backwards-compatibility shim) — naming carries an internal version label; surfaced to user simply as 'Hazard Database'.
- There is a very large volume of safety-themed SEO landing pages (20+ city-level landlord-safety pages, RAMS/method-statement/permit template guide pages, COSHH/fire-safety course pages) and apprentice/study-centre safety course content. These are deliberately EXCLUDED from this section as they belong to SEO/marketing and the learning/study sections, not the operational Site Safety tool suite.
- Employer hub has its own parallel safety surface (SafetyHub, AIRAMSSection, AIMethodStatementSection, BriefingsSection, ToolboxTalkLibrary, BriefingDistribution/QRCode) reusing the same primitives — not documented here as it belongs to the Employer section, but note the briefing/RAMS engines are shared across electrician and employer roles.
- A legacy/alternate SafetyDashboard component (src/components/electrician-tools/site-safety/SafetyDashboard.tsx) with a ScoreRing exists; the current SiteSafety page uses an editorial redesign (SafetyHeadlineStats + SafetyScoreSheet) and does not appear to render this older SafetyDashboard directly — possible dead/legacy code on the hub itself, though the scoring logic (calculateSafetyScore) documents the live score weighting.

**5. Employer Hub**
- Scale caveat: EmployerDashboard.tsx defines ~45 sections across 5 hubs. To keep the table readable I grouped tightly-related leaf sections (e.g. Talent Pool + Vacancies, Policies + Contracts, Timeline + Progress Logs, Fleet + Photo Gallery). The hub wrappers (PeopleHub/FinanceHub/JobsHub/SafetyHub/SmartDocsHub) are navigational containers with their own stat rollups, not separate features.
- Depth of read: I fully read EmployerDashboard.tsx, OverviewSection, AttestOJT, EmployerPortalView, and the heads of RAMSSection, BriefingsSection, PublicBriefingSign, BriefingSignOff, PeopleHub and AutomationsSection. The remaining ~30 sections were verified by confirming each has a real backing hook (useTimesheets, useElecId, useExpenses, useFleet, usePriceBookBundles, useProcurementEngine, useWorkerLocations, useCommunications, useAutomations, etc.) and live data wiring via imports — NOT by reading every section body in full. Marketing claims are kept to capabilities visible in those reads + hook names; per-section feature depth (e.g. exact fields) was not exhaustively verified.
- AI Smart Docs are real edge-function calls, not stubs: AIRAMSSection -> 'rams-generator' (with realtime progress channel), AIMethodStatementSection -> invoke (target on line 81, name not captured in full), AIBriefingPackSection -> invoke (line 111), AIQuoteSection -> 'generate-quote-pdf', AIDesignSpecSection -> 'circuit-designer'. I did not confirm those edge functions are deployed/healthy on the backend — only that the front end calls them.
- Two BRIEFING sign-off routes coexist and appear to be parallel/overlapping implementations against different data shapes: PublicBriefingSign (/briefing-sign/:token, uses a token + its own anon Supabase client + canvas signature pad, fields like briefing_name/identified_hazards) and BriefingSignOff (/briefing-signoff/:briefingId, uses the shared client + SignaturePad component + geolocation, fields like title/attendees[].employee). This is a likely duplicate/legacy pair — worth confirming which is the live one before marketing both.
- Status marked 🟡 partial for Client Portal (employer-side config), Reports and Signatures: these were confirmed to exist and be routed/lazy-loaded but I did not read their bodies, so I cannot vouch for how complete the implementation is. Treat their maturity as unconfirmed rather than proven-live.
- EmployerPortalView and AttestOJT depend on college-issued tokens/edge functions (college_employer_tokens, ojt-employer-attest) — these public surfaces are part of the College Hub <-> Employer relationship and rely on the college issuing the link; an employer cannot self-serve them.
- The /employer route in AppRouter renders EmployerDashboard directly; it sits behind app auth/layout (SentryErrorBoundary section='Employer Hub'). I did not verify which subscription tier gates access — per project memory the 'employer' tier is pre-launch, so live paying usage of this hub may be minimal despite the code being built out.

**7. Study Centre**
- Content volume is genuine, not stubbed: ApprenticeCourseRoutes.tsx wires ~901 <Route> entries, Level3Routes ~274, Level2Routes ~252; src/pages/apprentice-courses holds 965 files and src/pages/upskilling 667 files. Sampled section pages (AM2Module2Section5 712 lines, HNCModule3Section1_1 717 lines, EVChargingModule1Section1 492 lines) confirm real teaching content.
- Upskilling course count: I documented 14 because the upskilling Index.tsx COURSES array defines exactly 14 courses and the route files expose 13 distinct '*-course' landing routes (bs7671, inspection-testing, ev-charging, renewable-energy, fire-alarm, emergency-lighting, data-cabling, fiber-optics, smart-home, bms, industrial-electrical, instrumentation, energy-efficiency, pat-testing). The StudyCentreIndex hero claims 'count: 14' for upskilling but its routeKeys array lists 15 entries INCLUDING 'solar-pv' — there is NO standalone solar-pv upskilling course under /study-centre/upskilling (solar-pv routes live under InspectionRoutes/SEORoutes, and renewable-energy covers solar). The task brief's '15 professional upskilling courses' is marketing rounding, not what the code exposes. Flag if exact count matters.
- StudyCentreIndex category card counts are hardcoded marketing numbers (apprentice: 8, upskilling: 14, general: 14, personal: 10) and do not all match the actual implemented course counts I verified: apprentice = 6 courses (Level2, Level3, AM2, HNC, MOET, Functional Skills), general/safety = 14 dirs, personal-development = 11 dirs. The home page 'totalCourses' therefore overstates apprentice (8 vs 6) and understates personal (10 vs 11).
- XP/streak/leaderboard system depends on Supabase tables/RPC (user_xp_summary, learning_activity_log, user_study_streaks, get_study_leaderboard RPC, user_achievements). Both StudyLeaderboard and useLearningXP have explicit silent-fail fallbacks for 'table/RPC may not exist yet' — so on a backend where those objects are missing the gamification UI degrades to empty/zero states rather than erroring. Verify the tables/RPC are actually deployed before claiming the leaderboard is fully populated.
- The upskilling MockExamQuiz.tsx (the shared engine) still contains leftover debug console.log statements ('Button clicked - this should appear in console', onMouseDown/onMouseUp logging) — functional but unpolished; not user-visible.
- Two parallel leaderboard implementations exist: the full LeaderboardPage (src/pages/study-centre/LeaderboardPage.tsx, the routed /leaderboard page) and a separate StudyLeaderboard card component (src/components/study-centre/StudyLeaderboard.tsx). I could not confirm the card component is mounted anywhere in the Study Centre routes I read; it may be unrouted/legacy. The routed LeaderboardPage is the live one.
- Mock exams appear in three layers that could be conflated: (1) in-course mock exams inside apprentice/upskilling/safety strands, (2) the public /mock-exams hub (27 page files, hub says '25 free mock exams'), and (3) SEO topic landings. The '/mock-exams' hub is a public/marketing surface, not strictly inside the authenticated Study Centre — included per the brief's 'public mock exams summary' instruction but worth noting it lives under separate MockExamRoutes/SEORoutes, not StudyCentreRoutes.

**8. Wellbeing**
- Two overlapping surfaces exist. The modern hub (MentalHealthHub.tsx) drives almost everything via in-page ?section= query params (breathing, journal, sleep, insights, safety-plan, tools, resources, support, crisis, podcasts, talk) rather than separate routes. A parallel set of OLDER dedicated routes also exists under /apprentice/mental-health/* (resources, stress-management, crisis-resources, support-network, work-life-balance) and /electrician/mental-health/* (work-life-balance, resources). These legacy pages duplicate hub functionality and are not surfaced as cards from the current hub UI — only reachable by direct URL. The electrician hub additionally lazy-imports the same MentalHealthHub component twice (ApprenticeMentalHealth + ElectricianMentalHealth aliases).
- Dead code: src/components/mental-health/MentalHealthMate.tsx is a large (~34KB) component but is NOT imported anywhere in src (grep confirms zero references outside its own file). It appears to be an abandoned AI-companion/chat surface and should not be presented as a live feature.
- Work-life balance is the weakest leaf. The apprentice WorkLifeBalance page (18 lines) just wraps WorkLifeBalanceTab from the time-management module. Its BalanceChecklist component ships with generic placeholder labels (item1..item5 in the default state), so the checklist is partly a stub — marked 🟡 partial.
- Some interactive-tools sub-tools persist only to localStorage (gratitudes, energyLogs) and do NOT feed the cloud-synced mood/journal/sleep stores or the wellbeing score — i.e. they are lighter-weight than the four cloud-backed pillars (mood, journal, sleep, safety plan).
- Crisis 'event logging' (recordCrisisEvent) is genuinely wired to the backend and fires on dial/text taps, but it is best-effort and intentionally silent on failure; it is a private user reminder, not analytics shared with anyone.
- Peer support depends on a real backend (peerSupportService + usePeerChat hooks with presence/typing/read-receipts) — this is a substantial real-time feature, not a mock; it requires sign-in and gracefully shows a sign-in-required empty state otherwise.
- Contact-number inconsistency between surfaces: the CrisisResourcesTab/data and SupportNetworkTab list slightly different numbers for the same charities (e.g. Electrical Industries Charity shown as 0800 652 1618 on the hub vs 01895 823 726 in SupportNetworkTab; Mates in Mind / Lighthouse numbers also differ). Worth a single source of truth before any marketing claims precision.
- The wellbeing score (useWellbeingScore.ts) is a real composite: mood 40% / sleep 30% / journal 15% / consistency 15% over a 7-day window, with graceful zero-handling when data is missing — accurate to describe as a 0–100 wellbeing ring.

**9. Career & professional identity**
- Live job board route (/electrician/job-vacancies) renders PremiumJobsHub, which is filter/search + saved/insights based. There is NO live AI job-matcher front door: AIJobMatcher.tsx, AIJobInsights.tsx, IntelligentJobSearch.tsx, EnhancedJobSearch.tsx and EnhancedReedJobsView.tsx exist in src/components/job-vacancies/ but are legacy/unrouted (EnhancedReedJobsView imports the AI components but is not wired into the live hub). UnifiedJobListing has an aiMatchScore field but it is not populated/surfaced in the premium hub I read. I deliberately did NOT claim 'AI job matching' as a live feature.
- External job listings are sourced via 'live-job-aggregator' and 'fetch-job-listings' edge functions; framed as 'daily-aggregated external listings' rather than naming third-party boards (e.g. Reed appears in legacy component names) since I could not verify which sources are live.
- src/components/career/InteractiveCareerRoadmap.tsx and FavoritesPanel.tsx appear unused (no importers found outside their own files) — excluded from the live feature list. The live career pages use components under src/components/electrician/career/ instead. ProgressTracker.tsx / BookmarkButton.tsx in src/components/career are only referenced by apprentice-side components, not the electrician career hub.
- Two additional CV builder variants exist but are NOT routed at /electrician/cv-builder: CVBuilder.tsx and SimplifiedCVBuilder.tsx. The live route uses PremiumCVBuilder. CV template count verified as 4 (classic, modern, creative, technical); the 'ATS' and 'summary' are PDF export FORMATS, not separate templates — described accordingly.
- Document verification confidence/extraction is real (verify-document edge fn + realtime + polling fallback), but accuracy/coverage of the automated read was not testable from code; status flow (verified/needs_review/rejected/appealed) and manual review fallback are genuinely implemented. Avatar upload falls back from 'elec-id-photos' bucket to 'avatars' bucket.
- Apple/Google Wallet passes are backed by real edge functions (generate-apple-wallet-pass / generate-google-wallet-pass) and use Capacitor Filesystem/Share on native — genuinely live, platform-gated.
- SharedPortfolioView (/view/:token) is the apprenticeship NVQ portfolio public REVIEW page (units/ACs/KSBs/OTJ hours, assessor comments) from src/components/shared-portfolio + src/components/portfolio (UltraFastPortfolioManager). It is an apprentice/college feature, not part of the electrician career-identity surface, so I excluded it from this section to avoid double-counting with the apprenticeship section. Flagging in case the parent wants it cross-referenced.
- Referral rewards/tiers are backed by multiple edge functions (process-referral-reward, send-referral-notification, trigger-referral-push, referral-cadence-cron, backfill-referral-credits) so the programme is materially implemented, not a stub. The specific reward ('free month for them, free month for you') copy comes from ReferralShareSheet defaults; actual reward fulfilment value was not independently verified against billing.
- Verification tier progress percentages on the Elec-ID overview (50%/75%) are hard-coded display values keyed off the tier, not a computed score — cosmetic, noted for honesty.

**10. Account, settings & platform**
- Live Settings page (src/pages/Settings.tsx) renders only 8 tabs: Account, Mate, Elec-ID, Business, Preferences, Privacy, Billing, Referrals. Three additional tab files exist but are NOT imported anywhere and appear dead/unrouted: src/components/settings/EmailSettingsTab.tsx, SecurityTab.tsx, LegalTab.tsx. Their content (email settings, dedicated security tab, legal links) is largely folded into Preferences/Privacy instead. Do not present them as live, separate features.
- Messaging (src/components/messaging/) is a library of UI PRIMITIVES (reactions, read receipts, presence, mentions, replies, attachments, link previews) exported via index.ts. It is NOT a standalone routed messaging feature. Consumers are employer messaging (src/components/employer/messaging/), layout MessagesDropdown, peer-support hub and a couple of AI chat surfaces. Note that employer/messaging has its own TypingIndicator/MessageList implementations separate from the shared messaging primitives (some duplication).
- Calendar is real and well-built (month/week/day, realtime invalidation hook, Google Calendar sync hook, tasks merged in) but is routed only inside the Electrician Hub at /electrician/business/calendar (src/routes/ElectricianHubRoutes.tsx lazy-imports src/pages/electrician/CalendarPage). The component lives under src/components/calendar/. Google two-way sync depends on useGoogleCalendarSync + an OAuth callback; I confirmed the wiring exists but did not verify the edge-function/OAuth backend end-to-end.
- WelcomeTour.tsx still references the old product name 'ElecMate Inspect' in its step copy (line ~18) — stale branding vs the Elec-Mate / Mate naming convention. It is a guided tour modal; I did not confirm where/whether it is currently mounted, so marked the guided tour 'partial'. The first-run onboarding actually surfaced from the Dashboard is WelcomeModal (which navigates to a CTA path) + SetupWizard, both of which are live.
- Subscriptions.tsx contains hardcoded Stripe coupon IDs (YhLPdvFl apprentice, SSmqkZGn electrician) and a hardcoded Stripe price_id in TrialExpiredPaywall ROLE_TO_PRICE — these are real but brittle/inline rather than sourced from stripePrices.ts in all cases. Plan-change proration, cancel flow (cancel_survey_responses + apply-retention-offer + cancel-subscription edge fns) and native IAP via RevenueCat are all genuinely implemented in the client; backend edge functions were not executed/verified here.
- PreferencesTab certificate defaults (defaultCertType, autoSaveEnabled) and the AI 'Smart Suggestions' toggle are local React state only in the file I read — they do not appear to persist to the backend, so they may be cosmetic/non-functional preferences. Treat as 🟡 if precision matters. Dashboard hub visibility, push prefs, quiet hours, biometric and cookie prefs DO persist (via dedicated hooks / Supabase).
- Native shell components (NativePageWrapper, SwipeableBottomSheet, SwipeableCardCarousel, TouchButton) are used in ~13 files — modest adoption, not blanket. The app is mobile-first throughout via Tailwind patterns rather than exclusively these wrappers.
- Push notifications use the Web Push API / service worker (navigator.serviceWorker, VAPID) — i.e. web/PWA push. I did not see a Capacitor native push plugin path in usePushNotifications.ts, so 'delivered when app is closed' is accurate for web/PWA; native iOS push delivery should be verified separately if claimed for the App Store build.

**11. Public website & SEO**
- Scale is real but content quality is uneven: of ~1,390 .tsx files in src/pages/seo/, 306 are tiny (<500 byte) re-export stubs that import from generated/ config files (296 config files), and ~1,084 are substantial pages. The route registry header comment says '340 routes' but the file actually wires ~1,380 path entries — the comment is stale.
- Sitemap totals are inconsistent: sitemap-seo.xml lists 1,020 URLs and sitemap-guides.xml 721, which appear to overlap (same /guides pages counted in both files) rather than being additive. The headline '~2,000 URLs' is the raw sum across all sitemap files and likely double-counts; true distinct indexable pages is lower. Worth a dedup pass before quoting a public number.
- Some duplicate/cannibalising pages exist in the same area, e.g. ApprenticeSalaryPage.tsx + ApprenticeSalaryUKPage.tsx, EarthFaultLoop{Impedance,Explained,TooHigh}Page + EarthLoopTooHighPage, ConstructionSiteSafetyPage + ConstructionSiteSafetyElectricalPage, and TestingSequenceGuidePage + TestingSequenceGuidePage_v2 (a literal _v2 file name still on disk). The GuideTemplate has a built-in `noindex` flag specifically described in-code as for 'cannibalisation losers + thin pages awaiting deletion', confirming the team knows there is dead/overlapping content being suppressed rather than removed.
- AI agent SEO pages (AICostEngineerPage etc., ~22) are purely promotional — they describe the agent and route to /auth/signup; the actual AI runs only inside the authenticated app. They should not be presented as interactive public demos.
- Calculator SEO pages genuinely embed the live in-app calculator component (verified VoltageDropCalculatorPage imports and renders VoltageDropCalculator free, no signup) — this claim is real, not marketing.
- Mock-exam anonymous attempt logging writes to a back-end table fire-and-forget with a sub-30-second gate; it is for social-proof stats only, not a graded/persisted result for the anonymous user. Don't overstate it as 'tracked progress'.
- mockExamTopicRegistry slices a question bank by category to generate topic pages dynamically; the actual number of live topic pages depends on how many categories each of the ~27 exams has (sitemap shows ~90+). Per project memory the runtime registry and a build-time TOPIC_REGISTRY must be kept in sync — a known maintenance hazard, not a polished guarantee.
- The /public/* share pages (client portal, photo share, booking, sign-off, parent digest) are recipient-facing links emitted by the app, not part of the SEO/marketing estate — included for completeness but they are a different feature class and some (e.g. ParentDigestPage, SupervisorVerificationPage) tie into the pre-launch College Hub which per memory is not yet sold.
- Pricing on the landing page is pulled from real subscription-tier data via a hook (useUserCount / live price props), but several headline social-proof figures are hard-coded copy in templates ('Used by 1,000+ UK electricians', '46+ courses', '70+ calculators', '16/18 certificate types') and these counts are inconsistent between files (LandingPage says 18 cert types and 46 courses; templates say 16 cert types and 46+ courses). Verify before quoting externally.

**12. Admin & founder**
- All 41 admin pages and 3 founder pages are wired into AppRouter.tsx (lines 1482-1801 for admin, 653-672 for founder) and gated behind profile.admin_role in AdminPanel.tsx — none are orphaned/unrouted.
- AdminMate (/admin/mate) and AdminMateUser are explicitly READ-ONLY monitors aggregating from agent_action_log via the admin-mate-health/admin-mate-user edge functions; the only write action is provisioning via the ProvisionMateSheet (admin-mate-provision edge fn). Do not claim live remote restart/kill controls — the code comment says 'Read-only'.
- Document review's 'extracted_data' + 'extraction_confidence' fields are produced upstream (server/edge side) and only displayed here — the admin page itself does not run OCR/vision; it surfaces pre-computed confidence. I described it as 'machine-extracted', which is accurate, but the extraction does not happen in this UI.
- Many growth pages (Founders, Win-Back, Incomplete Signup, Apprentice/College/Business outreach, Early Access, Trials reminders) depend on a large number of campaign edge functions (founder-final-push, send-winback-offer, send-incomplete-signup, send-apprentice-campaign, send-outreach-campaign, send-trial-reminder[-bulk], send-early-access-invite, send-promo-offer). I verified the front-end invokes these; I did NOT verify the edge functions themselves deploy/send successfully, so 'live' reflects the UI wiring, not delivery proof.
- AdminColdOutreach is purely a read-only stats viewer pulling from an external tool (header literally says 'Live stats from Instantly') — it cannot send or manage campaigns from the panel.
- TrainingPhotoUpload.tsx is large (60KB) but I did not deep-read it; marked 🟡 partial as its exact maturity/scope is unconfirmed beyond being routed at /admin/training-upload. Treat its status as provisional.
- EnrichmentMonitor.tsx (routed at /admin/enrichment) is a thin wrapper that just renders <EnrichmentConsole/>; the real logic lives in src/components/admin/EnrichmentConsole.tsx (50KB) plus PracticalWorkEnrichmentConsole and RegulationsIntelligenceProgress. KnowledgeUploader.tsx page top warns it's a developer/ops utility.
- Founder pricing copy references '£3.99 locked forever vs £12.99' (FounderClaim/FounderSignup). Per memory, founder is a real tier but the broader Mate/Employer/College tiers are pre-launch — figures here are taken directly from the founder pages' own hardcoded copy, not from stripePrices.ts which I did not cross-check.
- Per the no-internal-names rule I deliberately avoided 'RAG', table names, 'IET Knowledge' wording in prose (used 'Standards edition manager' / 'knowledge base'), and version labels. Note the actual UI nav still labels the page 'IET Knowledge' and AdminEarlyAccess copy contains an internal 'V10'/'V Early Access' template label — these exist in code but were kept out of the marketing prose.
- AdminPanel groups some routes under different labels than their file names: 'Employer Moderation' nav item points to /admin/vacancies (AdminEmployerModeration.tsx, titled 'Employer Vacancies' in-page); 'Pricing' = AdminPricingModeration. Route paths in the table are the canonical ones.

---

## Stats

- **Sections deep-audited at code level this pass:** 15 (plus Inspection & Testing and College Hub, verified separately).
- **Distinct features documented in the audited sections:** ~337 (2026-05-28 pass) + ~55 new/updated entries added in the 2026-07-02 refresh.
- See each section's status flags (✅ live / 🟡 partial / ⚠️ stub) and the audit findings above for maturity and cleanup signal.
- **2026-07-02 refresh:** 10 parallel code audits covering all hubs; 244 commits since the previous generation were reviewed. Canonical public-facing numbers as coded on the landing page: 19 certificate types · 46+ courses · 20,000+ in-app exam questions (L2/L3/AM2/upskilling) · 70+ trade calculators (63 in the in-app hub plus public tool pages) · ~5,900 free public mock-exam questions across 25 exams · ≈720+ guides. Trial requires a card — never claim "no card required".
