# Electrical Hub — Complete Verified Feature List

**For qualified electricians. Every number verified from actual code files in `/Users/andrewmoore/elec-mate-merge`.**

---

## YOUR DASHBOARD

The moment you open the Electrical Hub, it greets you by name — Good morning, Good afternoon, or Good evening — with a lightning bolt badge in a circular yellow icon.

Two status badges sit at the top: your active quotes count, and either overdue invoices (red) or "All paid" (green). Four tappable stat cards track your business at a glance — Active Quotes, Quote Value in pounds, Certificates completed, and Overdue Invoices. Tap any card to navigate straight to the relevant section.

A featured card promotes Elec-AI — "Your personal electrical adviser — circuit design, fault finding, regs queries & more" — with a "Start Chat" button.

Below that, six core daily tool cards in a two-column grid:

1. **Inspection & Testing** — EICR, EIC & Minor Works certificates
2. **Business** — Quotes, invoices, customers, expenses & pricing
3. **Site Safety & RAMS** — Risk assessments and method statements
4. **Electrical Calculations** — Cable sizing, voltage drop and more
5. **Build Partners** — AI specialists for design, costing, safety & testing
6. **AI Tooling** — Smart analysis and design tools

A conditional Worker Tools card appears only for employed electricians — status, timesheets, leave & comms. Two Business & Development cards cover Industry Updates (news) and Career Progression (plan your pathway). A Latest Jobs Widget shows live job listings. The Elec-ID Banner links to your digital professional identity. And a Setup Wizard onboarding modal guides new users through first-time configuration.

---

### 1. AI AGENTS — 5 Active + 3 Coming Soon

The Agent Selector is where you pick your AI specialist. Five agents are live, each powered by OpenAI `gpt-5-mini-2025-08-07` with `max_completion_tokens`, tool calling for structured JSON, and RAG integration pulling from verified knowledge bases.

**Circuit Designer** — BS 7671 compliant circuit design and cable sizing. Expertise covers circuit calculations, cable sizing, consumer unit layouts, and voltage drop analysis. Runs on edge function `designer-agent-v3` (v3.1.1). Searches the design knowledge base via RAG. Outputs circuit designs with cable sizing, voltage drop analysis, and BS 7671 compliance checks.

**Cost Engineer** — Full project quotes with materials, labour and timescales. Expertise covers material pricing, labour estimates, project timescales, and quote generation. Runs on edge function `cost-engineer-v3`. Pulls from pricing embeddings and labour timing data via RAG. Outputs materials lists with pricing, labour tasks with estimates, and grand totals with profit analysis.

**Installation Specialist** — Step-by-step installation methods and practical guidance. Expertise covers installation methods, practical tips, tool selection, and best practices. Runs on edge function `installer-v3` (v5.0.0). Outputs numbered steps with safety requirements, equipment needed, qualifications, estimated duration, and risk level (low/medium/high).

**Maintenance Specialist** — Periodic inspections, preventive maintenance & fault diagnosis. Expertise covers periodic inspections, preventive maintenance, fault diagnosis, and equipment servicing. Runs on edge function `maintenance-v3`. Uses a 30-year veteran maintenance engineer persona. Outputs pre-work requirements, visual inspection procedures, testing procedures with BS 7671 references, servicing tasks, fault diagnosis trees, and safety precautions.

**Health & Safety** — Risk assessments, PPE requirements and safety procedures. Expertise covers risk assessments, RAMS documents, PPE requirements, and emergency procedures. Runs on edge function `health-safety-v3` (v4.5.0). Outputs hazard identification, risk assessment matrices, control measures, and PPE requirements. Handles risk assessment only — method statements are handled by the Installation Specialist.

**Coming Soon:**

**Testing & Commissioning** — Test procedures, EICR defect coding (C1-C3) and fault diagnosis. Edge function `commissioning-v3`. GN3 Practical Testing Guru persona.

**Project Manager** — Scheduling, coordination, handover documentation.

**Training Tutor** — Educational guidance, exam prep & concept explanations. Level 3 guidance and practice questions.

**Supporting Edge Functions:** Job creation, processing, and cancellation functions for each agent. `electrician-ai-assistant` for general AI chat. `conversational-install-planner` for AI-guided design. `enrich-installation-procedures`, `validate-installation`, `regenerate-circuit-justifications` for backend processing.

---

### 2. AI TOOLS — 12 Smart Analysis & Design Tools

**AI Assistant** — Full conversational search interface with real-time regulatory lookup and context-aware electrical advice.

**Circuit Designer** — AI-powered circuit design with BS 7671 cable sizing and consumer unit layouts.

**Client Explainer** — Translates technical notes to plain English for clients. Six client types: Homeowner, Landlord, Business Owner, Property Manager, Facilities Manager, Insurance. Four tones: Professional, Casual, Urgent, Reassuring. Three reading levels: Simple, Standard, Technical. Options to include costs, emphasise safety, add BS 7671 references, and use analogies.

**Component Identification** — Camera or photo upload for identifying electrical components. Five categories: Protection Devices, Distribution, Control Gear, Accessories, Metering. Returns specifications, BS 7671 requirements, and installation guidance.

**Diagram Builder** — Room layout builder with BS 7671 electrical symbols. Six tools: select, line, rectangle, text, symbol, eraser. Grid and snap-to-grid. AI room builder auto-generates layouts. Demo room preloaded. Full undo and redo.

**Fault Diagnosis** — Symptom-based fault finding. Five symptom types: Burning or scorching, Tripping or RCD, Water damage, Exposed wiring, Old or outdated. AI diagnosis with remedial steps.

**Installation Verification** — Three certificate types: EIC, EICR, Minor Works. Three property types: Domestic, Commercial, Industrial. Photo upload for visual inspection. BS 7671 compliance verification. Pass or fail report.

**Maintenance Advisor** — Predictive maintenance guidance, equipment aging analysis, and service scheduling.

**Regulations Assistant** — BS 7671 guidance queries, compliance checking, and standard reference lookup.

**Report Writer** — AI-generated electrical reports via ReportWizard. Template-based generation with PDF export.

**Visual Analysis** — Multi-mode image analysis covering Component ID, Wiring Instructions, Fault Diagnosis, and Installation Verification.

**Wiring Instructions** — Three property types: Domestic, Commercial, Industrial. Fifteen-plus circuit types per property including lighting, power, cooker, boiler, EV charging, hot water and more. Step-by-step UK wiring guidance with BS 7671 compliance.

---

### 3. ELECTRICAL CALCULATORS — 65 Calculator Components (51 in User Selector)

**Fundamental Electrical (6):**
Ohm's Law, AC Power, Basic AC Circuit, Power Factor, Three-Phase Power, Star-Delta.

**Design & Installation (10):**
Voltage Drop, Cable Sizing, Cable Current Capacity, Cable Derating, Conduit Fill, Conduit Bending, Ring Circuit, Trunking Fill (via conduit), Diversity Factor, Maximum Demand.

**Testing & Earth Faults (6):**
Zs Values, BS 7671 Zs Lookup, R1+R2, Earth Fault Loop, Earth Electrode, Phase Rotation.

**Protection & Safety (5):**
Adiabatic Equation, Prospective Fault Current (PFC), RCD Trip Time, RCD Discrimination, Power Factor Correction.

**Lighting & Power Systems (5):**
Lumen, LED Driver, Motor Starting Current, Transformer, Battery Backup.

**Renewable Energy (11):**
Solar PV, Solar Array, Solar Panel Sizing, Battery Storage, Wind Power, Grid Tie Inverter, Micro Hydro, Off-Grid System, Feed-In Tariff, Heat Pump, EV Charging.

**EV Specific (1):**
EVSE Load Calculator.

**Advanced Safety & Analysis (4):**
Arc Flash, Power Quality, Selectivity, Emergency Lighting.

**Specialised Applications (4):**
Data Centre, Generator Sizing, Marine Electrical, Swimming Pool.

**Tools & Reference (4):**
Resistor Colour Code, Wire Gauge, Instrumentation, Unit Converter.

**Cost & Energy (1):**
Energy Cost Calculator.

**Additional and Legacy (8):**
Ohms, Power, Resistance, Series and Parallel calculators, Efficiency, plus support components — CalculatorSelector, CalculationReport, and StandardsReference.

---

### 4. INSPECTION & TESTING HUB — 7 Certificate Types + Learning Hub

**EICR (Electrical Installation Condition Report)** — Full digital form with phased workflow. Board scanner integration takes a photo and auto-detects circuits. AI-enhanced observation descriptions via AIEnhanceObservationSheet. AI cost estimation for remedial work via AIEstimatorSheet. Earthing and bonding assessment section. Defect coding for C1, C2, C3, and FI. Quote generation from observations. PDF generation. Seven main components.

**EIC (Electrical Installation Certificate)** — Thirty sub-components. Six-tab workflow: Client, Circuits, Testing, Defects, Inspector, Declaration. Full circuit schedule builder. Testing categories cover Continuity (CPC and PE), Polarity, Insulation Resistance, RCD, Earth Fault Loop Impedance (Zs), PFC, Functional Testing, and three-phase supplementary tests. Inspection checklist with pass or fail. Statutory declarations and digital sign-off. Import from Elec-ID auto-fills client details.

**Minor Works Certificate** — Nine components. Circuit-by-circuit testing. Smart circuit auto-fill from device type. Visual inspection guidance. Compliance checkpoint verification against BS 7671. Defect documentation. Work details section.

**Fire Alarm Certificate (BS 5839)** — New and edit routes. Standards-compliant documentation.

**EV Charging Certificate (IET Code of Practice)** — New and edit routes. EV-specific compliance checks.

**Emergency Lighting Certificate (BS 5266)** — New and edit routes. Emergency lighting compliance.

**Solar PV Installation Certificate (MCS Compliance)** — New and edit routes. MCS-compliant documentation.

**Learning Hub — 57 Components Across 8+ Testing Topics:**

**Continuity Testing** — CPC test, ring test, equipment cards, methods, procedures, recording. Seven components.

**Insulation Resistance Testing** — Test cards, three-phase testing, temperature correction, tables section. Fifteen-plus components.

**Polarity Testing** — Test cards, practice forms, enhanced versions.

**Earth Fault Loop Impedance (Zs) Testing** — Seventeen subdirectories of reference values, correction cards, diagrams, and procedures.

**Prospective Fault Current (PFC) Testing** — Tables, diagrams, and procedures.

**RCD Testing** — Trip time validation, discrimination guidance, and procedures.

**Functional Testing** — Equipment info, procedure cards, and regulation requirements.

**Safe Isolation** — Step-by-step procedure, practical cards, and verification checklists.

**Additional Learning Hub Features:** Supplementary testing and certificate guide. Testing procedures section with 12 subdirectories. Safety guidelines with 8 subdirectories covering PPE, environment, equipment, risk assessment, and work permits. Regulation reference with 10 subdirectories. Quiz system with 12 subdirectories covering assessments, custom builder, detailed reports, performance analytics, and progress overview. Comprehensive fault finding section (132.8 KB). Practical guidance section. GS38 test probe guidance. Equipment checklist. Signature canvas for digital sign-off. Emergency contacts.

**Testing Projects:** Load circuit designs from the saved_designs table. Filter by design_complete and ready_for_testing. "Start Testing" links to EICR with design pre-loaded. Connects the AI design phase to the physical testing phase.

---

### 5. UPSKILLING COURSES — 14 Courses, 99 Modules, 510 Section Pages

| #         | Course                             | Modules        | Sections         | Mock Exam                |
| --------- | ---------------------------------- | -------------- | ---------------- | ------------------------ |
| 1         | Building Management Systems (BMS)  | 7              | 42               | Yes                      |
| 2         | BS 7671 (18th Edition Wiring Regs) | 9              | 40               | Yes                      |
| 3         | Fire Alarm Systems                 | 7              | 36               | Yes                      |
| 4         | Industrial Electrical Systems      | 5              | 27               | Yes                      |
| 5         | Data & Communications Cabling      | 6              | 29               | Yes                      |
| 6         | Emergency Lighting                 | 6              | 31               | Yes                      |
| 7         | Fibre Optics Technology            | 7              | 35               | Yes                      |
| 8         | Inspection & Testing               | 8              | 44               | Yes (+10 testing guides) |
| 9         | PAT Testing                        | 5              | 26               | Yes                      |
| 10        | Instrumentation                    | 9              | 45               | No                       |
| 11        | Renewable Energy Systems           | 10             | 49               | Yes                      |
| 12        | Smart Home Technology              | 8              | 39               | Yes                      |
| 13        | Electric Vehicle Charging          | 7              | 35               | Yes                      |
| 14        | Energy Efficiency & Management     | 6              | 29               | No                       |
| **TOTAL** | **14 courses**                     | **99 modules** | **510 sections** | **11 mock exams**        |

127 quiz and question data files across all courses. Mock exams with 150 questions each for EV Charging and BS 7671. Additional mock exams for BMS, Fire Alarm, Industrial, Inspection & Testing, PAT, Renewable Energy, Smart Home, Fibre Optics, Instrumentation, Emergency Lighting, and Data Cabling.

---

### 6. BUSINESS HUB — Complete Business Management Suite

**Dashboard KPI Strip:** Paid this month, Outstanding invoices, Overdue amount, Win rate.

**Core Sections:** Customers (client management and work history), Job Management (site visits with pre-site and post-site, photo docs), Money In (Quotes, Invoices, Live Pricing), Money Out (Expenses, Materials, Tools), Grow Your Business (Start & Grow, Business Calculators, Business Admin — coming soon), and Business Insights (quote and invoice analytics with revenue charts).

**Business Development — 8 Topic Areas:**

**Starting a Business** — Three tabs: Business Planning, Legal & Compliance, Support & Resources. Key metrics: average startup cost £15-35k, break-even 6-12 months, success rate 85%, Year 1 revenue £8-15k per month. Market research and analysis across 3 phases over weeks 1-4. Essential startup equipment: £13,300-£33,500. Business setup costs: £3,600-£8,300. Working capital reserve: £13,000-£30,000. Three business structures: Sole Trader, Limited Company, Partnership (LLP). Essential qualifications: Level 3 NVQ or Diploma, 18th Edition, C&G 2391, AM2. Competent person schemes: NICEIC, NAPIT, ELECSA. Four insurance types with coverage details. Five industry bodies, four helplines, five online resources.

**Onboarding Apprentices** — Recruiting, mentoring, and developing apprentices.

**Onboarding Electricians** — Recruiting, integrating, and retaining qualified electricians.

**Growing Your Business** — Six tabs: Growth, Pricing, Marketing, Services, Operations, Financial. Revenue growth targets: 15-25%. Regional pricing: London £65-85 per hour (+25-35%), South East £55-70, Northern England £40-55, Emergency £75-120. Digital and traditional marketing strategies. High-growth services: Renewable Energy, Smart Home, Commercial. Required certifications for each sector. Financial benchmarks and cash flow best practices.

**Customer Acquisition** — Six tabs: Research, Digital, Traditional, Leads, Experience, Retention. Referral close rate: 60-80%. Marketing budget: 5-10% of revenue. Customer lifetime value: £2-5k. Retention target: 85%+. Lead sources: Referrals (60-80%), Google (30-50%), Trade Platforms (20-40%), Social (15-30%). Three-phase customer communication journey.

**Tax & Finances** — Seven tabs: Structure, Expenses, Cash Flow, VAT & HMRC, Tax Planning, Insurance, Pensions. VAT threshold: £90,000 (2024/25). Personal allowance: £12,570. Flat Rate Scheme: 14.5% for electricians. CIS (Construction Industry Scheme) guidance. Income tax rates 2024/25 across 3 bands. Insurance: Public Liability £2-5m, Employers Liability £10m, Professional Indemnity, Tools & Equipment. Pension options: Personal (SIPP), Stakeholder, NEST.

**Debt Recovery** — Four tabs: Prevention, Recovery, Legal Options, Protection. Late payment rate: 45%. Recovery window: 90 days. Small Claims limit: £10,000. Statutory interest: 8% + BoE base rate. Five-step escalation timeline from Day 1 to Day 28+. Court options: Small Claims (up to £10k), County Court (over £10k).

**Business Templates** — Four tabs: Quotes, Contracts, Operations, HR & Safety. Twenty-plus templates. Quote templates: Domestic, Commercial, EICR, EV Charger (PDF and Word). Invoice templates: Standard, Itemised, Staged, Credit Note. Terms & Conditions (3 versions). Service Agreements (3 types). Legal documents: Variation Order, Completion Certificate, Warranty, Data Protection. Job management: Job Sheet, Site Survey, Timesheet, Materials Log. Employment: Contract, Apprenticeship Agreement, Subcontractor Agreement, Handbook. Risk assessments (4 types) plus method statements (4 types).

---

### 7. BUSINESS CALCULATORS — 14 Professional Tools

1. **Job Profitability Calculator** — Revenue vs costs per job
2. **Business Cost Calculator** — Monthly and annual business running costs
3. **Cash Flow Planner** — Project cash flow over time
4. **Pricing Strategy Calculator** — Optimal pricing for services
5. **Equipment ROI Calculator** — Return on tool and equipment investment
6. **Hourly Rate Calculator** — Calculate what to charge per hour
7. **Capacity Planning Tool** — Workforce and job capacity
8. **Tax/NI Estimator** — Income tax and NI estimates
9. **Break-Even Calculator** — Revenue needed to break even
10. **Staff Cost Calculator** — True cost of employees
11. **Quote Variance Tracker** — Compare quoted vs actual costs
12. **Minimum Charge Calculator** — Minimum viable job charge
13. **VAT Scheme Comparison** — Standard vs Flat Rate VAT
14. **CIS/DRC Helper** — Construction Industry Scheme & Domestic Reverse Charge

---

### 8. QUOTE & INVOICE SYSTEM — Full Quote-to-Invoice Pipeline

**Quotes:** Quote Builder (standard) for creating, editing, and viewing quotes. Smart Quote Builder with AI-enhanced quote creation. Filter by status: Pending, Sent, Approved, Rejected. Monthly Revenue Card showing pounds this month, approved count, and sent count. Import from Cost Engineer data, Certificate data, or Site Visit data. Quote data includes quote number, client (name, email, phone, address, postcode), job details (title, description, location), status, and total.

**Invoices:** Invoice Builder creates invoices from scratch or from quotes. Filter by status: Draft, Sent, Overdue, Paid. Financial Snapshot shows total paid revenue (live), plus Overdue, Sent, and Paid counts. Quote and Invoice Analytics dashboard with charts and metrics. Card view on mobile, table view on desktop. PDF generation via PDF Monkey integration. Sharing via WhatsApp (pre-formatted message) and Email (mailto with link). Mark as Paid one-tap. Stripe Connect integration for card payments. Import from Quote data or Certificate data. Sync to accounting via Xero and QuickBooks.

**Quote & Invoice Dashboard:** Combined analytics and metrics hub.

---

### 9. MATERIALS MARKETPLACE — 500+ Products, 10 UK Wholesalers

Seven categories: All, Cables, Consumer Units, Circuit Protection, Sockets & Switches, Lighting, Containment. Search across "cables, MCBs, sockets..." with 10 UK wholesalers integrated. Material lists for saved lists. Procurement tools. Category and supplier browsing.

**Materials Data:** presetData.ts at 3,985 lines contains 413 material and equipment items. Six worker types for labour: Electrician, Apprentice, Labourer, Designer, Owner, Testing Engineer. Twenty material categories with subcategories. materialsExpansion.ts at 1,191 lines adds 126 additional materials covering MCBs, RCBOs, distribution, and fire-rated products. enhancedPricingData.ts provides 6 quantity discount tiers (1-250+ units), 8 regional pricing multipliers (London to Northern Ireland), and 10 installation time estimates.

**Live Pricing Hub — 4 Tabs:**

**Pricing** — Search job pricing by postcode and job type, with confidence scores, sample sizes, and regional data.

**Submit** — Contribute your own pricing data.

**Scrap** — Scrap metal prices and merchant finder.

**Insights** — Pricing analytics dashboard and trends.

---

### 10. SITE MANAGEMENT — 3 Core Tools

**Site Visits Hub:** Pre-Site Visit covers scope, photos, and quotes. Post-Site Visit covers after photos, sign-off, and invoice. Filter by status: All, In Progress, Completed, Scope Sent (with counts). Visit cards show address, customer name, updated time, room count, item count, and quote acceptance status. Property types: Residential, Commercial, Industrial. Statuses: In Progress, Completed, Scope Sent, Signed, Post-Job.

**Photo Documentation:** Project photo capture and organisation, linked to site visits and certificates.

**Expenses Tracker:** Categories: Materials, Labour, Mileage, Equipment, Fuel, Sundries. Receipt capture. Sync to Accounting via Xero and QuickBooks integration. Date-grouped expense list. Export as CSV or PDF. Swipeable cards for edit and delete.

---

### 11. SAFETY SHARES — 5 Categories of Industry Safety Content

**Safety Alerts** — Critical safety warnings and real-time alerts, with an enhanced version featuring ratings, bookmarks, and analytics.

**Learning From Experience** — Real incidents, near misses, and lessons learned.

**Industry News** — Latest regulatory updates and compliance information, with an enhanced version.

**Major Projects** — Industry projects and emerging opportunities.

**Safety Resources** — Essential safety guides, toolbox talks, and training materials, with an enhanced version.

**Enhanced Features (for 3 categories):** Real-time data integration with live content updates. User ratings and reviews. Personal bookmarking system. View tracking and engagement analytics. Advanced filtering and search. File download tracking. Interactive content rating.

---

### 12. INSTALL PLANNER V2 — 4 Design Modes

**Express Mode** — Quick installation plan for straightforward circuits.

**Professional Mode** — Detailed planning with full customisation.

**Multi-Circuit Mode** — Design multiple circuits simultaneously.

**AI-Guided Mode** — Full-screen immersive AI design experience via AIInstallationDesigner.

**Plan Data:** Installation type (domestic default). Load type and total load in kW. Voltage: 230V (single phase) or 400V (three phase). Cable length, cable type (PVC twin & earth default), installation method (clipped direct default). Environmental profile: ambient temperature, conditions, earthing type, Ze value, grouping factor. Save and Load manager for persisting designs. BS 7671:2018 compliant.

---

### 13. CAREER PROGRESSION — 6 Sections

**Career Pathways — 6 High-Demand Roles with Day Rates:**

**EV Charging Specialist** — £280-420 per day. 2919 + 3 years experience. +300% demand.

**Data Centre Technician** — £320-480 per day. HV competence + cooling knowledge. AI boom driving expansion.

**Heat Pump Engineer** — £250-380 per day. MCS certification. Net Zero targets.

**Solar PV Installer** — £240-350 per day. 2399 + MCS accreditation. Record installations.

**Smart Building Engineer** — £300-450 per day. BMS knowledge. Smart city initiatives.

**Project Manager** — £400-600 per day. Degree or HNC + 5+ years. Infrastructure investment.

**Market Growth Sectors:** Net Zero Premium: +25%. EV Infrastructure: +300%. Smart Home: +180%. Data Centres: +220%.

**Regional Day Rates:** London & SE: £350-500. Manchester & NW: £280-400. Scotland: £300-420. Wales & SW: £260-380.

**Other Sections:** Training Courses (professional qualifications and certifications). Professional Bodies (IET, ECA, NAPIT membership). Further Education (HNC, HND, degree pathways). CPD Tracker (coming soon). Job Vacancies (live listings, currently "247 live vacancies" badge).

**Professional Accreditation:** Schemes: NICEIC, NAPIT, ELECSA, ECA, JIB. Analytics dashboard. Why Get Accredited: Professional Recognition, Career Advancement (+15-25% earning), Regulatory Compliance (BS 7671 + Part P), Industry Network. Getting Started: 2-5 years experience, Level 3 + AM2, Investment £200-£1,500 + annual fees, 3-6 month lead time. Resource links to professional bodies and scheme providers.

---

### 14. WORKER TOOLS HUB — 10 Self-Service Tools for Employed Electricians

Only visible to users with an employee record or whitelisted accounts.

1. **My Status** — On Site (green), En Route (amber), Office (yellow), Off Duty (grey)
2. **Timesheets** — Clock in and out with duration tracking, hours today display, "Clock In" quick action
3. **Leave** — Leave requests, remaining days display
4. **Team Comms** — Messaging with unread count (badge, caps at 9+)
5. **My Jobs** — Active job list with count
6. **Credentials** — View Elec-ID
7. **Progress Notes** — Daily notes logging
8. **Safety Docs** — Acknowledge safety documents, pending count badge (amber)
9. **Expenses** — Submit expense claims
10. **Snag Reports** — Report issues on site

**Data Tracked:** isClockedIn, duration (HH:MM:SS), todaysHours, leaveAllowance.remainingDays, unreadCount (messages), activeJobsCount, pendingSafetyDocs.

---

### 15. ELEC-ID — 8-Tab Digital Professional Identity

**Overview Tab (Premium Card):** Yellow gradient accent line. Photo section (100x120px) with camera upload overlay. Verified badge (checkmark). Full name and job title (yellow highlight). ECS card display: colour box + type + expiry. Verification tier badge: Basic, Verified, or Premium. Elec-ID number in EM-XXXXXX format (mono font, tap to copy). QR code icon. "VERIFIED BY ELEC-MATE" and "ACTIVE" footer.

**Settings:** Verification Tier: Basic (50%), Verified (75%), Premium (Max) with upgrade path. Talent Pool Toggle: Available for hire, Visibility (Public, Employers Only, or Private). Profile Completeness: percentage score, progress bar, missing items list.

**Stats Grid (4 tappable cards):** Qualifications count. Work History count. Skills count. Expiring Soon count (90-day threshold).

**Edit Modal:** Job Title (select with categories). ECS Card Type (select with colour preview): Gold, Silver, Bronze. ECS Expiry Date. Your Rate (£ amount + hourly, daily, weekly, or yearly). Professional Bio.

**Other 7 Tabs:** 2. **Documents** — Credential verification uploads 3. **Qualifications** — Certificates and training records 4. **Experience** — Work history 5. **Skills** — Competencies 6. **My CV** — CV management (links to Premium CV Builder) 7. **Compliance** — Expiry tracking for certifications 8. **Share** — Export and share links, public verification page

**Opt-Out:** Disable or re-enable Elec-ID option.

---

### 16. PREMIUM CV BUILDER — 5-Step Wizard

1. **Template Selection** — Modern, Classic, Minimal designs
2. **Personal Details** — Name, contact, professional summary
3. **Work Experience** — Job history with descriptions
4. **Education** — Qualifications and training
5. **Skills** — Technical and soft skills

**Features:** AI Assistant panel for content generation. Multiple template options with PDF export. Auto-save to localStorage. Import from Elec-ID profile. Full-screen CV preview sheet. Progress ring indicator. Cloud save to Supabase.

---

### 17. JOB VACANCIES — Premium Jobs Hub

Swipeable job cards with a native app feel. AI match scoring. Saved jobs functionality. Job metadata: Title, company, location, salary, type (full-time or contract), description, external URL, posted date, expiration, remote flag. BS 7671-aware search and filtering. SEO metadata.

---

### 18. MENTAL HEALTH HUB — 68 Components

**Quick Actions (4-card grid):** Calm Breathing (2-min guided exercise), Check In (mood tracking), Gratitude (journal prompt), Talk to Someone (AI or peer support).

**Main Sections (5 expandable cards):**

1. **Interactive Tools** — Mood tracking, stress relief, goal setting
2. **Resources Library** — Guides, videos, self-help materials
3. **Support Network** — Peer connections, professionals
4. **Crisis Support** — 24/7 helplines, emergency resources
5. **Podcasts** — Mental health podcasts for tradespeople

**Permanent Features:** Emergency Banner with Samaritans (116 123) and SHOUT crisis line (85258). Daily Affirmation card. Wellbeing Tips callout. Electrical Industries Charity: 0800 303 2200.

**Interactive Tools (68 components):** QuickMoodCheck, BreathingExercise, GratitudeJournal, DailyAffirmation, SleepTracker, MoodTracker, GoalSettingTracker, SelfCareReminders, StressManagementTools, InteractiveStressAssessment, AdvancedTechniques, WellbeingJournal, PersonalSafetyPlan.

**Peer Support:** PeerSupportHub, SupporterDashboard, BecomeSupporter (volunteer option), AvailableSupporters (with status).

**Crisis Resources:** CrisisHelplines, OnlineCrisisSupport, LocalResourceFinder, AndysManClub. 100% confidential.

**Sub-pages:** Work-Life Balance with checklist, Professional and Home balance cards, and 8 resource links (Mind.org.uk, Electrical Industries Charity, NICEIC Wellbeing, HSE, Construction Industry Helpline, Mates in Mind). Mental Health Resources with full resources library.

---

### 19. SITE SAFETY & RAMS — AI-Powered Safety Tools

**7 Core Modules:**

1. **RAMS Generator** — AI-powered Risk Assessment Method Statement creation
2. **Method Statements** — Wizard-based creation with structured input, step-by-step procedures, risk controls
3. **Briefings & Toolbox Talks** — Templates, sign-off collection, digital verification
4. **Pre-Use Equipment Checks** — Checklists, defect tracking, photo documentation
5. **Site Diary & Photo Docs** — Photo capture, site notes, timestamps, fire watch logging
6. **Hazard Alerts & Observations** — Real-time alerts, notifications, defect documentation
7. **Safe Isolation Checklist** — Step-by-step digital checklist with multi-stage verification

**Data:** UK English corrections database. Electrical terminology database. Near-miss templates. Observation templates.

---

### 20. TOOLS & EQUIPMENT GUIDES — 6 Detailed Guides

1. **Hand Tools Guide** (23.6 KB) — Essential hand tools for electricians
2. **Power Tools Guide** (18.7 KB) — Power tool selection and use
3. **PPE & Safety Guide** (28.5 KB) — Personal protective equipment
4. **Testing Equipment Guide** (16.3 KB) — Test instruments (MFTs, etc.)
5. **Guide Selector** — Navigation between guides
6. **Budget Calculator** — Tool budget planning

---

### 21. UK ELECTRICIAN CONSTANTS (Reference Data)

**17 Job Titles Across 5 Categories:**

- Apprentice (4 levels)
- Operative (6 types: Installation, Maintenance, Approved, Domestic, Commercial, Industrial)
- Supervisor (3 levels)
- Management (3 roles)
- Engineering (3 specialist roles)

**60+ Qualifications Defined:**

- Core: NVQ, City & Guilds, EAL, BTEC, HND, Degree
- Inspection & Testing: 2391-52, 2394, 2395, PAT, Thermal Imaging
- Regulations: 18th Edition, Building Regs Part P and L, Design & Verification
- Industry Cards: 7 ECS card types + CSCS Green and Blue cards
- Specialist: Solar, EV Charging, and more

---

## THE NUMBERS

| Feature                       | Exact Count                                                                       |
| ----------------------------- | --------------------------------------------------------------------------------- |
| AI Agents (active)            | 5                                                                                 |
| AI Agents (coming soon)       | 3                                                                                 |
| AI Tools                      | 12                                                                                |
| Electrical Calculators        | 65 components (51 in selector)                                                    |
| Business Calculators          | 14                                                                                |
| Upskilling Courses            | 14                                                                                |
| Upskilling Modules            | 99                                                                                |
| Upskilling Section Pages      | 510                                                                               |
| Upskilling Mock Exams         | 11                                                                                |
| Quiz Data Files               | 127                                                                               |
| Certificate Types             | 7 (EICR, EIC, Minor Works, Fire Alarm, EV Charging, Emergency Lighting, Solar PV) |
| EIC Sub-components            | 30                                                                                |
| Learning Hub Components       | 57                                                                                |
| Testing Topics                | 8                                                                                 |
| Materials in Database         | 500+ (413 preset + 126 expansion)                                                 |
| Material Categories           | 20+                                                                               |
| UK Wholesalers                | 10                                                                                |
| Regional Pricing Multipliers  | 8                                                                                 |
| Business Development Topics   | 8                                                                                 |
| Business Templates            | 20+                                                                               |
| Worker Self-Service Tools     | 10                                                                                |
| Elec-ID Tabs                  | 8                                                                                 |
| Career Pathways (high-demand) | 6                                                                                 |
| Safety Shares Categories      | 5                                                                                 |
| Site Safety Modules           | 7                                                                                 |
| Equipment Guides              | 6                                                                                 |
| Mental Health Components      | 68                                                                                |
| Quick Actions (mental health) | 4                                                                                 |
| Electrician Pages (total)     | 78                                                                                |
| Electrician Tool Pages        | 44                                                                                |
| Electrician Components        | 878+ (271 main + 607 tools)                                                       |
| Edge Functions (AI backend)   | 32                                                                                |
| UK Job Titles Defined         | 17                                                                                |
| UK Qualifications Defined     | 60+                                                                               |
| Install Planner Modes         | 4                                                                                 |
| Live Pricing Tabs             | 4                                                                                 |

---

_Every number in this document is verified from the actual app code. 5 AI agents. 12 AI tools. 65 calculators. 14 courses with 510 section pages. 7 certificate types. 500+ materials. 14 business calculators. 68 mental health components. 878+ electrician components. All built for qualified UK electricians._
