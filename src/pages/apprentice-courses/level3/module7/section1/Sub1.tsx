/**
 * Module 7 · Section 1 · Subsection 1 — Industry structure + roles in building services engineering
 * Maps to C&G 2365-03 / Unit 308 / LO1 / AC 1.6
 *   AC 1.6 — "Define the different roles in building services engineering"
 *
 * The shape of the UK electrical industry — main contractor / sub-contractor /
 * domestic installer; the roles within a contracting firm (Apprentice through
 * Project Engineer); the wider building services trades you'll work alongside;
 * the difference between an installer, a designer and a commissioning engineer.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE =
  'Industry structure and roles in building services engineering | Level 3 Module 7.1.1 | Elec-Mate';
const DESCRIPTION =
  'How the UK electrical contracting industry is structured — main contractor, sub-contractor, domestic installer — and the roles within a firm: Apprentice, Electrician, Approved Electrician, Technician, Project Engineer, Designer, Commissioning Engineer.';

const checks = [
  {
    id: 'mod7-s1-sub1-mc-vs-sub',
    question:
      "What's the practical difference between a main contractor and an electrical sub-contractor on a commercial project?",
    options: [
      "Reg 14(2) requires every employee to inform their employer (or any other employee with specific responsibility for safety) of any work situation which they reasonably consider represented a serious and immediate danger to health and safety, AND any matter which they reasonably consider represented a shortcoming in the employer's protection arrangements for health and safety. The duty extends to near-misses, defective safe systems of work, and any condition the employee believes presents danger.",
      "The main contractor holds the contract with the client (often the building developer or end-user) and is responsible for the whole project — programme, cost, safety, all trades. The electrical sub-contractor (sometimes 'M&E sub-contractor') holds a sub-contract with the main contractor and is responsible for the electrical package only — design (if D&B), install, test, commission, hand over. Most UK electrical apprentices work for sub-contractors.",
      "Three things: (1) proves your identity on site, (2) records your competence — JIB grade, qualifications, H&S assessment, specialist endorsements, (3) is required for entry on most CDM-regulated sites because main contractors use ECS as their proof-of-competence check. Without an ECS card you're typically refused entry to commercial and infrastructure sites.",
      "Report it via your own chain (your Foreman in the first instance, escalating to the main contractor's Site Manager if it's site-wide). You don't approach the HSE inspector direct — that's not your seat — but you have a duty under CDM 2015 Reg 15(1)(b) and HASAWA s.7(a) to report hazards you become aware of. Your Foreman handles the conversation upward.",
    ],
    correctIndex: 1,
    explanation:
      "On a typical commercial project (offices, schools, hospitals) the main contractor (Kier, Wates, Mace, ISG, etc.) holds the head contract with the client. They sub-contract specialist packages — electrical, mechanical, fire, BMS, lifts — to specialist sub-contractors. The electrical sub-contractor is responsible for delivering the electrical package to the spec, on programme, on budget. As an apprentice you'll be in the sub-contractor's gang, working under a Site Foreman or Project Engineer who reports up to the main contractor's site team.",
  },
  {
    id: 'mod7-s1-sub1-roles',
    question:
      "Who's normally responsible for the design of the electrical installation on a 'design and build' (D&B) project?",
    options: [
      "C&G 2382 is the BS 7671 Wiring Regulations qualification — open-book exam testing knowledge of the current edition. Each major edition triggers a new 2382 variant: 2382-15 was 17th Edition; 2382-18 was 17th Edition + A3; 2382-22 is 18th Edition; 2382-26 will cover A4:2026. Holding the latest 2382 is the standard CPD evidence for keeping current with BS 7671.",
      "Fail the device. Issue a Code C2 (potentially dangerous) on the EICR if applicable, document on the Schedule of Test Results, replace the RCD or RCBO. A trip time exceeding the 300 ms manufacturer\\\\\\\\\\\\'s declared limit means the device cannot be relied upon to disconnect within the Table 41.1 system requirement. The RCD is approaching end of life and may fail to operate at all on the next fault. Replace, retest, document the remediation. Do not leave the installation in service relying on a failed RCD.",
      "Modern EV chargers can leak smooth DC current under fault conditions — and a Type AC RCD won't trip on smooth DC. So Section 722 requires either a Type B RCD (which detects AC, pulsating DC and smooth DC) OR a Type A RCD plus an RDC-DD (a separate device that adds smooth-DC detection to a Type A RCD). The RDC-DD route is often cheaper than fitting a Type B RCD because Type A RCDs are widely available and inexpensive. The certified installer chooses the architecture; the customer doesn't see the difference but the regulatory compliance requires one or the other.",
      "The electrical sub-contractor's design team (typically a Design Engineer or external Consulting Engineer working to the sub-contractor's brief). On D&B the main contractor passes the design responsibility down to the sub-contractor, who designs to a performance spec rather than a fully-detailed drawing pack. On 'traditional' procurement the design is done up-front by an external M&E Consultant and the sub-contractor installs to those drawings.",
    ],
    correctIndex: 3,
    explanation:
      "Procurement route shapes who designs. Traditional contracts (employer's design, contractor builds) keep design with an M&E Consultant retained by the client. Design and Build (D&B) shifts design to the contractor, who either retains an in-house Design Engineer or sub-lets to a Consulting Engineer. Most large UK projects in the last decade have been D&B — so the sub-contractor's design team is increasingly important. Apprentices considering a design career should look at firms with in-house design teams.",
  },
  {
    id: 'mod7-s1-sub1-bse-trades',
    question:
      "Which of these are the main 'building services engineering' (BSE) disciplines you'll work alongside?",
    options: [
      "Electrical (the 'E' in M&E), Mechanical (heating, ventilation, air-conditioning, drainage — the 'M'), Public Health (water and drainage), Fire Detection and Alarm, Security and Access Control, Building Management Systems (BMS), Lifts and Escalators, and renewables (solar PV, EV charging, heat pumps). All of these together are 'building services engineering' — the systems that make a building habitable.",
      "A structured plan that includes: self-assessment (identifying current EI strengths and gaps), specific goals (which competencies to develop), practice opportunities (real situations to apply new skills), feedback mechanisms (trusted people who will give honest observations), reflection practices (regular review of progress), and accountability (commitments to specific actions with review dates)",
      "Companies House is the UK's Government registrar of companies. It receives and publishes company information — incorporation, registered office, directors, shareholders, annual accounts, annual confirmation statement. All UK Ltd companies and LLPs must register with Companies House and file annual returns. Public information is searchable free at companies-house.gov.uk.",
      "Smart charging enables the charge rate, timing and duration to be managed dynamically in response to grid conditions, electricity tariffs, local network constraints and user preferences — it is essential to prevent network overloading as millions of EVs connect to a grid that was not designed for their combined demand",
    ],
    correctIndex: 0,
    explanation:
      "Building services engineering covers all the systems that go inside the structural shell of a building. The C&G 2365 syllabus and Unit 308 specifically use the term 'building services engineering' rather than 'electrical' because the broader BSE workforce is increasingly cross-discipline. Knowing what the other trades do (and what depends on what) is essential for sequencing on site and for career mobility — e.g. an electrician with EV-charging and BMS endorsements can work across electrical and controls.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "What does 'M&E' stand for in UK construction?",
    options: [
      "ISOLATE the supply first. If immediate isolation isn't possible, use a non-conductive item (dry wood, plastic) to break contact. Do NOT touch the casualty until they're separated from the source. Then DR ABC casualty assessment and 999.",
      "'Mechanical and Electrical' — the two big building services disciplines covering everything from heating, ventilation and water through to power, lighting, fire and data. The M&E sub-contractor (sometimes a single firm covering both, sometimes two specialist firms) delivers the building's working systems.",
      "Three years from the date of the incident under RIDDOR Reg 12. Records held in any format that allows retrieval. The HSE may request retrospective access during investigations or sector reviews. Many firms retain longer for PI insurance / Defective Premises Act purposes.",
      "Self-employed NI calculated as a percentage of profits over a threshold; paid alongside income tax via Self Assessment. Currently 9% on profits between the lower and upper limits, 2% above. (Rates and thresholds adjust annually — check current HMRC figures.)",
    ],
    correctAnswer: 1,
    explanation:
      "M&E is the standard construction shorthand for the building services package. On large projects M and E are sometimes split between two specialist sub-contractors; on smaller projects a single multi-discipline firm covers both. As an apprentice in the electrical trade you're in the 'E' half, but you'll spend a lot of time coordinating with the 'M' half over routing, services zones and the order of trades.",
  },
  {
    id: 2,
    question: "Who is the 'Project Engineer' in an electrical sub-contractor?",
    options: [
      "Written communication carries emotional tone even without non-verbal cues. EI in writing means: considering how the reader will feel when they read it, choosing words that are clear and respectful, avoiding language that could be interpreted as blame or aggression, and re-reading messages before sending to check for unintended emotional impact — especially important when conveying criticism or bad news",
      "Some MFTs have multiple Zs measurement ranges (e.g. low range 0-2 Omega, high range 0-200 Omega). If you\\\\\\\\'re testing a TT installation with expected Zs of 80-200 Omega and the meter is set to the low range, the reading will saturate or read inaccurately. GN3 wants you to consciously check the range matches the expected reading before pressing TEST — a failed test or wildly wrong reading wastes time and may damage the instrument if test current exceeds the range capacity.",
      "The technical lead for a project on the sub-contractor's side. The Project Engineer coordinates design (where applicable), procurement, programme, technical queries (RFIs), QA and the eventual handover. They are the sub-contractor's technical face to the main contractor and the M&E Consultant. Typically a Technician-grade or HNC-qualified electrician with several years on site, or a graduate engineer who has crossed in from design.",
      "Common triggers: profits exceed £40-50k/year (where Ltd's lower-cost dividend tax structure starts to outweigh the extra admin); contracts increasingly require Ltd-only counterparties (some commercial clients refuse to engage sole traders); risk profile grows (more employees, larger contracts, higher liability exposure); raising external investment (impossible as sole trader); planning succession or sale of the business (Ltd is sellable, sole trader isn't).",
    ],
    correctAnswer: 2,
    explanation:
      "Project Engineer is one of the main career destinations for an apprentice who progresses through the JIB grades and adds technical qualifications (HNC, HND, or degree). The role is part-office, part-site — they sit with the main contractor's team in technical meetings, raise RFIs, work with the design team, and translate between the spec and the install. It's a high-leverage role and a common stepping-stone to Senior Project Engineer, Contracts Manager or Operations Director.",
  },
  {
    id: 3,
    question: "What does a 'Commissioning Engineer' actually do?",
    options: [
      "To indicate that a device (e.g. a fuse, switch or MCB) only interrupts the line conductor, not the neutral. Important for any future electrician working on the circuit — the neutral may still be live relative to earth even with the device open, so isolation procedures (lock-off, prove dead) must take account of the single-pole nature.",
      "A dedicated polarity column on the per-circuit row of the STR, usually a tick or a P/F. The Schedule of Inspections also records polarity verification at a higher level. If polarity fails at sign-off the EIC cannot be issued — Reg 644.1.1 requires defects to be corrected before certification.",
      "A Statutory Instrument is secondary legislation — passed under the authority of an Act of Parliament. Breach is a criminal offence and the HSE can prosecute. A British Standard is a voluntary technical document published by the British Standards Institution. Breach is not in itself a criminal offence — but where another statute (e.g. Approved Document P, which references BS 7671) effectively requires compliance, departure becomes evidence of a statutory breach.",
      "Brings the installed systems to life — energising, testing, setting parameters, demonstrating compliance, and signing the system over to the client. On a commercial project commissioning is a distinct phase after the install: the Commissioning Engineer runs the test sequence, configures the BMS, programmes the panels, sets the protection settings and produces the commissioning records that go in the O&M manual.",
    ],
    correctAnswer: 3,
    explanation:
      "Commissioning is a specialist role that sits between install and handover. On a school the Commissioning Engineer might programme the lighting controls, configure the fire alarm, test the EV chargers, balance the standby supply and produce the witness test certificates the client signs off. AM2S and the C&G 2399 commissioning routes feed into commissioning careers; many commissioning engineers come from an installation background.",
  },
  {
    id: 4,
    question: "What's the difference between a 'Domestic Installer' firm and an 'Approved Contractor' firm under NICEIC?",
    options: [
      "Domestic Installer firms are scheme-registered to self-certify Building Regulations Part P notifiable work in dwellings only (single-family homes, flats). Approved Contractor firms are assessed to a higher standard covering commercial, industrial and dwellings — they can self-certify Part P plus issue compliance certificates against BS 7671 across the full scope. The Approved Contractor assessment is more rigorous and carries higher annual fees.",
      "UK-SPEC (UK Standard for Professional Engineering Competence) is the published competence standard against which Engineering Council professional registrations (EngTech, IEng, CEng) are assessed. It defines five competence areas (knowledge and understanding, design, leadership and management, communication, professional commitment) and the level of evidence required at each tier. Available free at engc.org.uk.",
      "EAWR 'electrical systems' includes portable equipment supplied from those systems. A faulty 110 V SDS on a 110 V site supply is part of the electrical system in EAWR terms. The maintenance duty under Reg 4(2) covers the supply (transformer, leads, sockets) AND the equipment plugged into it. Visual checks, PAT, and competent-person inspection all sit under this duty — EAWR is the second statutory hook alongside PUWER.",
      "HMRC is His Majesty's Revenue and Customs — the UK tax authority. For a sole trader: register for Self Assessment within 3 months of starting trading; file a Self Assessment tax return each January; pay income tax and Class 2/4 National Insurance on profits; potentially register for VAT if turnover exceeds £85,000/year. HMRC also handles PAYE if you have employees.",
    ],
    correctAnswer: 0,
    explanation:
      "NICEIC and the other competent person schemes operate two main categories: Domestic Installer (dwellings only, Part P focus) and Approved Contractor (full BS 7671 scope, all building types). The category dictates what work the firm can self-certify and what work needs Building Control notification. Most established commercial sub-contractors are Approved Contractors; many small one-person electrical firms working on houses are Domestic Installers. Both pay annual scheme fees of roughly £600 to £1,200 plus the assessor's day rate.",
  },
  {
    id: 5,
    question: "What's the JIB Apprentice grade and how does it differ from the colloquial term 'Improver'?",
    options: [
      "(a) Don't carry out construction work unless you have the skills, knowledge, training and experience to do it safely (or are in the process of obtaining them); (b) report to the person in control anything you're aware of that's likely to endanger H&S; (c) co-operate with any other person working on or in connection with the project to enable that person to comply with their duties.",
      "Apprentice is a formal JIB grade for someone in a registered apprenticeship — typically a learner working towards the C&G 2365 (or NVQ Level 3) and the AM2. 'Improver' is not a formal JIB grade — it's a colloquial industry term sometimes used for the post-college, pre-AM2 stage where the learner has completed the technical qualifications but not yet sat the AM2. Once AM2 is passed and JIB processes the upgrade, the worker becomes an Electrician on the JIB scale.",
      "Witnesses fade fast — by the next day they've reconstructed events differently, by the next week they've forgotten details, by the next month their memory has merged with what they later read or heard. Asking each witness to write down what they saw, in their own words, on the day of the incident, captures evidence at its strongest. The HSE / insurer / firm's defence team will all want this evidence later.",
      "They share components — both depend on R1+R2 (the cable line + CPC resistance for Zs, line + neutral resistance for voltage drop). A high-Zs reading often correlates with a high voltage drop reading because both are dominated by the cable\\\\\\\\'s R1 contribution. If you find one is borderline, check the other. The two tests are complementary — Zs verifies fault-clearance (ADS), voltage drop verifies normal-operation quality. Both use cable resistance as a key input.",
    ],
    correctAnswer: 1,
    explanation:
      "The formal JIB Working Rule Agreement grades are Apprentice → Adult Trainee → Electrician → Approved Electrician → Technician. 'Improver' is colloquial industry shorthand for the in-between period where you've finished college but haven't yet passed AM2 — it doesn't appear on the formal JIB grade card. The pay rate steps up at each formal transition — current 2024 JIB national rates put the Electrician hourly at around £19 to £20 per hour and Approved Electrician above that, with London Weighting on top. Always check the current JIB rate card on jib.org.uk.",
  },
  {
    id: 6,
    question: "What does a 'Site Foreman' do on an electrical sub-contractor's gang?",
    options: [
      "A larger consumer unit (often 16-24 way) with dedicated RCBOs / AFDDs for the PV inverter AC connection, the battery inverter AC connection, the EV charger circuit, the heat pump circuit, plus the existing house circuits. Sometimes a separate sub-board for the PV / battery / heat pump cluster and a CT clamp on the main supply tail back to the EV charger or HEMS. Cable management at the CU becomes a real consideration — main tails plus PV export plus battery in/out plus heat pump and EV feeds is a lot of cable in one box.",
      "G98 is post-notification — install, commission, notify within 28 days. The whole transaction completes inside 28 days from commissioning. G99 is pre-application — submit the application before commissioning, wait for the DNO to model the network, receive a Connection Offer, accept the Offer (which may contain export limits or fault-level conditions), then commission. Typical G99 timeline is 4-12 weeks for a domestic system; longer for commercial. On a fast-moving install programme the G99 paperwork is usually the long pole — start it early.",
      "Runs the day-to-day site operation for the sub-contractor — daily briefings, allocating work to gangs, ordering materials, liaising with the main contractor's site team, signing off install milestones, managing the apprentice's day-job tasks. Typically an Approved Electrician or Technician with several years on site. The Foreman is the apprentice's most immediate supervisor and often the person who calibrates the apprentice's portfolio with the workplace Mentor.",
      "Reg 14(2) requires every employee to inform their employer (or any other employee with specific responsibility for safety) of any work situation which they reasonably consider represented a serious and immediate danger to health and safety, AND any matter which they reasonably consider represented a shortcoming in the employer's protection arrangements for health and safety. The duty extends to near-misses, defective safe systems of work, and any condition the employee believes presents danger.",
    ],
    correctAnswer: 2,
    explanation:
      "Site Foreman is the operational lead on site. They report up to the Site Manager (main contractor) and the Project Engineer (sub-contractor) and run the gang day-to-day. For an apprentice the Foreman sets the daily work, signs off completion of tasks, and is one of the people who shapes the apprentice's experience. A good Foreman is one of the strongest signals of a good apprenticeship placement.",
  },
  {
    id: 7,
    question: "Which of these roles typically requires an HNC, HND or degree in electrical engineering?",
    options: [
      "A standard grid-tied inverter is required to shut down on loss of mains because of anti-islanding rules. Continuous operation through a power cut needs a hybrid inverter with explicit islanded-mode capability, paired with a battery and a changeover arrangement that first electrically isolates the property from the failed grid before re-energising selected circuits. The MCS designer specifies which loads stay alive, the battery sizing, and the transfer time.",
      "Day-rate: customer pays an agreed daily (or hourly) rate for time spent plus materials at agreed markup. Risk on time-overrun sits with the customer. Fixed-price: you quote a single all-in price for the defined scope. Risk on time-overrun sits with you. Customers typically prefer fixed-price (predictable budget); contractors typically prefer day-rate (no overrun risk). Practical compromise: fixed-price for well-defined scopes, day-rate for variable or fault-finding work.",
      "At minimum: power topology (cables, breakers, DBs); annotations (ratings, calc results); revision clouds and notes; legend and title block. Some designers add layers for fault current, voltage drop, disconnection time and sub-discipline (e.g. emergency lighting circuits, fire alarm circuits, IT critical) so layers can be turned on or off for clarity.",
      "Design Engineer (M&E Consultant or sub-contractor design team), Senior Project Engineer, and Chartered Engineer roles. The degree-level qualification gives the design knowledge (load calcs, voltage drop, discrimination, protection coordination) and the management knowledge needed for the more senior roles. Many apprentices add an HNC or HND part-time once they've passed AM2 to open these routes.",
    ],
    correctAnswer: 3,
    explanation:
      "Design and senior engineering roles typically require additional formal qualifications above the C&G 2365 / NVQ Level 3 / AM2 stack. HNC (Higher National Certificate) is one year part-time after AM2; HND is two years; full BEng or BSc takes three to four years. Many contractors will fund part of the cost for an apprentice who progresses well — it's worth asking your training lead about the firm's CPD policy.",
  },
  {
    id: 8,
    question: "What does 'BMS' stand for and why does it matter for an electrician's career?",
    options: [
      "'Building Management System' — the central control system that orchestrates a building's heating, ventilation, lighting, security and energy use. BMS work is one of the fastest-growing specialisms in building services because every modern commercial building has one. Electricians who learn BMS programming and commissioning (often via Trend, Tridium, Siemens or Schneider training) are in high demand and can move into BMS specialist roles paying significantly above standard electrician rates.",
      "A discrimination annotation against each upstream/downstream device pair, citing the test (current discrimination by ratio, time discrimination by curve overlap, energy discrimination by I²t for current-limiting devices). For full discrimination across the whole SLD, manufacturer coordination tables are referenced. Where discrimination is not achievable (very common at the origin with high PSCC), the SLD notes the design choice and the regs basis.",
      "MCS now covers battery storage as a separate technology category (alongside PV, solar thermal, heat pumps, biomass, wind). Battery installation typically pairs with PV (combined PV+battery system) or as a standalone retrofit. MCS battery certification follows MIS 3012 install standard and requires installer competence in DC battery systems, BMS commissioning, and grid-tie inverter integration.",
      "Yes, but only after preparing — switch off any sensitive loads on the same RCD, brief any occupants the supply may briefly trip, and be ready to reset the RCBO. Full trip-current mode is more accurate (typically plus or minus 5 percent vs plus or minus 10 percent for no-trip), and on a borderline result it can confirm whether the no-trip reading was accurate or whether you have a margin you can rely on. If the full mode confirms the reading you can document with higher confidence; if it differs significantly, investigate further.",
    ],
    correctAnswer: 0,
    explanation:
      "BMS is increasingly central to commercial building services. The cabling and the field devices (sensors, valves, dampers, relays) sit in the electrician's installation scope; the head-end programming and commissioning is a distinct specialism. Vendors like Trend, Tridium, Siemens and Schneider run training and certification programmes. BMS specialists often command premium rates — a route worth knowing about if controls and integration interest you.",
  },
];

const faqs = [
  {
    question: "I'm interested in design rather than installation — what's the route?",
    answer:
      "Finish your apprenticeship and the AM2 first — the practical foundation matters and most design teams want to see install experience on the CV. Then look at adding an HNC or HND in Electrical Engineering (one to two years part-time). Some apprentices move from a sub-contractor's install team into the same firm's design team; others apply to M&E Consultants like Hoare Lea, Cundall, Aecom or WSP. The C&G 2391-52 (Inspection and Testing) and 2396 (Design) qualifications also strengthen the design CV.",
  },
  {
    question: "Are there career routes outside of contracting altogether?",
    answer:
      "Yes — facilities management (in-house electrical maintenance teams in hospitals, universities, data centres), manufacturer technical support roles (Schneider, Hager, ABB), client-side roles (the customer's own engineering team — common in NHS Trusts, large landlords, supermarket chains), commissioning specialists, fault-finding contractors, and the rapidly growing renewables sector (solar PV, EV charging, heat pump installs). The 2365 / AM2 stack opens all of these — most just need additional vendor training or a specific scheme registration on top.",
  },
  {
    question: "What's the difference between the 'Site Manager' and the 'Project Engineer'?",
    answer:
      "Site Manager is normally a main-contractor role — they run the whole site, all trades, all safety, all programme. Project Engineer is normally a sub-contractor role — they're responsible for one technical package (the electrical, in our case) and they report up to the Site Manager on site matters. Both are senior roles. The Site Manager typically has a CIOB / construction management background; the Project Engineer typically has an electrical background and crossed into management.",
  },
  {
    question: "Do I have to stick with one employer for my whole career?",
    answer:
      "No. The UK electrical industry has high mobility once you're qualified — your ECS card, JIB grade and qualifications are portable. Most electricians have moved between several employers over their career as projects, locations and pay opportunities have shifted. The first move post-AM2 is the biggest — you go from being 'the firm's apprentice' to being a free-agent qualified electrician. Just leave on good terms, give proper notice and keep the references.",
  },
  {
    question: "Which sectors pay the most?",
    answer:
      "Pay varies but the highest-rate sectors tend to be: data centres (specialist install and commissioning), oil and gas (offshore premium), pharmaceutical and clean rooms, rail (major projects with London-weighted rates), and high-end commercial fit-out in central London. The trade-off is often longer hours, more travel, more rigorous induction and tighter QA. Standard JIB-rated commercial work pays steady; data centres and oil and gas can pay 50% to 100% more but with bigger lifestyle costs.",
  },
  {
    question: "Where do I find what jobs and rates the market is offering?",
    answer:
      "The main UK channels are: jobs sections on the trade press (Electrical Times, Voltimum), construction recruitment sites (CV-Library, Reed, Indeed), specialist M&E recruiters (Calibre, Madigan Gill, Daniel Owen), the JIB website's job board, LinkedIn, and word-of-mouth via the ECS / JIB network. Rates are published openly by the JIB on jib.org.uk — that's your reference for what 'fair' looks like for your grade.",
  },
];

export default function Sub1() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module7-section1')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 1
          </button>

          <PageHero
            eyebrow="Module 7 · Section 1 · Subsection 1"
            title="Industry structure and roles in building services engineering"
            description="How the UK electrical contracting industry is structured and the roles you'll meet — Apprentice, Electrician, Approved Electrician, Technician, Site Foreman, Project Engineer, Design Engineer, Commissioning Engineer."
            tone="emerald"
          />

          <TLDR
            points={[
              "UK electrical work is delivered by main contractors (head contract with the client) and electrical sub-contractors (specialist package). Most apprentices work for sub-contractors. There's also a domestic-installer tier — small firms working on houses and flats under a competent person scheme.",
              "Within a sub-contractor the formal JIB grade ladder is Apprentice → Adult Trainee → Electrician → Approved Electrician → Technician. The colloquial industry term 'Improver' (sometimes used for the post-college, pre-AM2 stage) is NOT a formal JIB grade. Above that sit Site Foreman, Project Engineer, Design Engineer, Commissioning Engineer, Contracts Manager and Operations Director.",
              "Building services engineering (BSE) is broader than electrical — it covers mechanical, public health, fire, security, BMS, lifts and renewables. The 2365-03 syllabus uses 'building services engineering' deliberately because cross-discipline knowledge increasingly matters for career mobility.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Maps to AC 1.6 (Define the different roles in building services engineering).",
              "Identify the structural layers of UK electrical contracting — main contractor, electrical sub-contractor, domestic installer.",
              "Define the formal JIB grade ladder — Apprentice, Adult Trainee, Electrician, Approved Electrician, Technician — and the qualification gates between each.",
              "Identify the wider building services engineering disciplines you'll work alongside (mechanical, public health, fire, security, BMS, lifts, renewables).",
              "Distinguish the install role from the design role and the commissioning role, and the procurement routes (traditional vs design and build) that allocate design responsibility.",
              "Identify routes outside contracting — facilities management, manufacturer technical roles, client-side engineering, commissioning, renewables.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The industry structure</ContentEyebrow>

          <ConceptBlock
            title="Main contractor, sub-contractor, domestic installer — three layers of UK electrical work"
            plainEnglish="UK electrical work is delivered through a layered industry. At the top sit main contractors (Kier, Wates, Mace, ISG, Morgan Sindall) who hold the head contract with the client. They sub-contract specialist packages to sub-contractors — for electrical work, an M&E or electrical specialist firm. Below the commercial layer sit thousands of small domestic installer firms (sole traders, partnerships, small Ltd companies) working directly with householders on house rewires, consumer-unit changes, EV charger installs, extensions and so on."
            onSite="Most C&G 2365 apprentices are placed with electrical sub-contractors — they get the breadth of commercial, industrial and sometimes domestic exposure. A smaller number are placed with domestic installers, which is more focused but still covers the full BS 7671 scope. After AM2 you can move freely between layers — many electricians do a few years on commercial sub-contractor work before setting up their own domestic firm, or vice versa."
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
              <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-elec-yellow mb-2">
                  Main contractor
                </div>
                <p className="text-[13.5px] text-white/85 leading-relaxed">
                  Holds the head contract with the client (developer, end-user, framework). Owns
                  the whole project — programme, cost, safety, quality across all trades.
                  Typical names: Kier, Wates, Mace, ISG, Morgan Sindall, Bouygues, BAM.
                </p>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-elec-yellow mb-2">
                  Electrical sub-contractor
                </div>
                <p className="text-[13.5px] text-white/85 leading-relaxed">
                  Holds a sub-contract for the electrical package only. Designs (on D&amp;B),
                  procures, installs, tests, commissions and hands over. Typical names: NG Bailey,
                  Briggs &amp; Forrester, Imtech, Crown House, Spie, T Clarke, Michael J Lonsdale.
                </p>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-elec-yellow mb-2">
                  Domestic installer
                </div>
                <p className="text-[13.5px] text-white/85 leading-relaxed">
                  Sole trader, partnership or small Ltd company working directly with householders.
                  Scheme-registered (NICEIC Domestic Installer, NAPIT, Stroma) for Part P
                  self-certification. Typical scope: rewires, consumer-unit changes, EV chargers,
                  extensions, fault-finding.
                </p>
              </div>
            </div>
          </ConceptBlock>

          <ConceptBlock
            title="The JIB grade ladder — your competence record on a card"
            plainEnglish="The Joint Industry Board (JIB) operates a grading scheme for electrical operatives in England, Wales and Northern Ireland. The formal grades climb from Apprentice through Adult Trainee, Electrician, Approved Electrician to Technician. Each grade has a defined competence standard, a defined pay rate (annually negotiated between ECA and Unite), and shows on your ECS card. SELECT and the SJIB run an equivalent scheme in Scotland. Note that 'Improver' is a colloquial industry term sometimes used informally for the post-college, pre-AM2 stage — it is NOT a formal JIB grade."
            onSite="As an apprentice your card shows Apprentice grade. Once you've completed your college qualifications but before AM2 you're still formally graded as a final-year Apprentice (or, for an older non-apprentice learner, Adult Trainee) — though colleagues may informally call you an 'Improver'. Once you pass AM2 and JIB processes the upgrade, you're an Electrician — the standard JIB grade for a qualified, time-served operative. Approved Electrician is the next step (additional experience, evidence of supervision and sign-off authority, JIB application). Technician is the senior grade — typically Approved Electrician plus an HNC, HND or degree."
          >
            <p>
              The formal JIB grade ladder in practice (rates are indicative — always check current
              jib.org.uk):
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Apprentice</strong> &mdash; in a registered apprenticeship. Pay scales by
                year of apprenticeship.
              </li>
              <li>
                <strong>Adult Trainee</strong> &mdash; non-apprenticeship adult learner route to
                qualification.
              </li>
              <li>
                <strong>Electrician</strong> &mdash; AM2 passed and JIB-processed. Standard
                qualified grade. National rate around &pound;19&ndash;&pound;20/hr (2024).
              </li>
              <li>
                <strong>Approved Electrician</strong> &mdash; additional experience, signed
                evidence of competence to supervise and sign off work. Higher pay rate.
              </li>
              <li>
                <strong>Technician</strong> &mdash; Approved plus HNC, HND or degree. Senior grade
                covering design, commissioning and supervision authority.
              </li>
            </ul>
            <p className="mt-3 text-[13px] text-white/70">
              Note: &quot;Improver&quot; is colloquial industry shorthand sometimes used for the
              post-college, pre-AM2 stage. It is NOT a formal JIB grade and does not appear on
              the JIB Working Rule Agreement grade card.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Roles within an electrical contractor</ContentEyebrow>

          <ConceptBlock
            title="Site roles — Foreman, Charge Hand, Project Engineer"
            plainEnglish="On a sub-contractor's site team the Site Foreman runs the day-to-day operation — daily briefings, work allocation, materials, programme, liaison with the main contractor. Above the Foreman sits the Project Engineer (technical lead, RFIs, design queries, QA) and the Contracts Manager (commercial, programme across multiple projects). On smaller jobs a single 'Charge Hand' might wear both Foreman and Engineer hats."
            onSite="As an apprentice your immediate supervisor is normally the Foreman or a senior Approved Electrician on the gang. The Project Engineer is the person you'll go to with technical questions that the gang can't answer. Building a working relationship with both is one of the strongest career moves you can make — they're the people who recommend apprentices for promotion and who take their best people with them when they move firms."
          >
            <p>
              Typical site roles you'll meet (sub-contractor side):
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Apprentice</strong> &mdash; the learner. Paired with an Approved
                or Electrician for direct supervision.
              </li>
              <li>
                <strong>Electrician / Approved Electrician</strong> &mdash; the bulk of the
                workforce. Doing the install, signing the apprentice\'s portfolio, completing test
                certs.
              </li>
              <li>
                <strong>Charge Hand</strong> &mdash; senior Approved Electrician leading a small
                gang. First-line supervision under the Foreman.
              </li>
              <li>
                <strong>Site Foreman</strong> &mdash; runs the day-to-day. Daily briefings,
                materials, programme, QA, signs off install milestones.
              </li>
              <li>
                <strong>Project Engineer</strong> &mdash; technical lead. RFIs, design queries,
                handover documentation, witness testing.
              </li>
              <li>
                <strong>Contracts Manager</strong> &mdash; commercial lead. Multiple projects,
                P&amp;L, client relationships, sub-contracting decisions.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Office and specialist roles — Designer, Estimator, Commissioning Engineer"
            plainEnglish="Behind the site team sits the office — Estimating (pricing tenders), Design (producing drawings and calcs on D&B work), Procurement (sourcing materials), Commissioning (bringing the system to life at handover) and senior management. These roles are often filled by ex-site electricians who have moved across — the field experience is valued because it informs realistic estimates and buildable designs."
            onSite="The office and specialist roles are open to apprentices who add the right qualifications — HNC or HND for design and estimating, vendor training (Trend, Tridium, Siemens) for BMS and controls commissioning, C&G 2391-52 plus AM2S for renewables commissioning. Many firms will fund part of the qualification cost for an apprentice who shows interest. Ask early — funded CPD is one of the best long-term benefits of working for a structured employer."
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
              <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-elec-yellow mb-2">
                  Design Engineer
                </div>
                <p className="text-[13.5px] text-white/85 leading-relaxed">
                  Produces single-line diagrams, layout drawings, load calcs, voltage drop, fault
                  studies, schedules. Either in-house in a sub-contractor or external in an M&amp;E
                  Consultant (Hoare Lea, Cundall, Aecom, WSP). Typical qualification stack: HNC or
                  HND plus years of site experience.
                </p>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-elec-yellow mb-2">
                  Estimator
                </div>
                <p className="text-[13.5px] text-white/85 leading-relaxed">
                  Prices tenders. Reads the spec, takes off the quantities, applies labour and
                  materials rates, produces the bid. Office-based but draws heavily on site
                  experience for realism. Often a stepping-stone to Contracts Manager.
                </p>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-elec-yellow mb-2">
                  Commissioning Engineer
                </div>
                <p className="text-[13.5px] text-white/85 leading-relaxed">
                  Brings systems to life at handover. Energising, testing, parameter setting,
                  witness records. AM2S, BMS vendor certs (Trend, Tridium) and C&amp;G 2391/2399
                  feed in. High-rate specialism.
                </p>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-elec-yellow mb-2">
                  Procurement / Buyer
                </div>
                <p className="text-[13.5px] text-white/85 leading-relaxed">
                  Sources materials and equipment to the spec. Manages supplier relationships,
                  negotiates trade discounts, manages the project\'s purchase orders. Office-based.
                  Often a route from technical Estimator into the commercial side.
                </p>
              </div>
            </div>
          </ConceptBlock>

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The wider BSE landscape</ContentEyebrow>

          <ConceptBlock
            title="Trades you\'ll work alongside — mechanical, public health, fire, security, BMS"
            plainEnglish="On any commercial project you\'re one of several building services trades. The mechanical sub-contractor handles heating, ventilation, air-conditioning and chilled water. Public Health handles potable and grey water and drainage. Fire Detection and Alarm specialists handle the fire system. Security sub-contractors handle CCTV, access control and intruder alarms. BMS specialists handle the central building control system. Lifts, escalators and renewables (solar, EV, heat pumps) are typically separate specialist sub-packages."
            onSite="Knowing what each trade does is essential for sequencing on site. The mechanical trades typically run their main pipework first; you run cable trays and containment around theirs (or vice versa, depending on the design). Fire alarm and BMS often piggy-back on your containment. Coordination meetings with the other trades' Foremen are part of the Foreman\'s job — and a good apprentice quietly absorbs how those conversations work."
          >
            <p>
              The other building services disciplines and what they install:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Mechanical (HVAC)</strong> &mdash; heating, ventilation, air-conditioning,
                chilled water, gas, ductwork, plant. Major routing impact on cable trays.
              </li>
              <li>
                <strong>Public Health</strong> &mdash; potable water, grey water, drainage,
                rainwater. Watertight install discipline.
              </li>
              <li>
                <strong>Fire Detection &amp; Alarm (FDA)</strong> &mdash; specialist BS 5839
                installer. Often a separate sub-contractor with their own commissioning engineer.
              </li>
              <li>
                <strong>Security &amp; Access Control</strong> &mdash; CCTV, intruder alarm, card
                access, biometrics. Integrates with electrical (door release, power) and BMS
                (occupancy).
              </li>
              <li>
                <strong>BMS / Controls</strong> &mdash; central building control. Trend, Tridium,
                Siemens, Schneider. Integrates everything.
              </li>
              <li>
                <strong>Lifts &amp; Escalators</strong> &mdash; specialist sub-package, separate
                sub-contractor (Otis, KONE, Schindler, ThyssenKrupp).
              </li>
              <li>
                <strong>Renewables</strong> &mdash; solar PV, EV charging, heat pumps, battery
                storage. Increasingly delivered by the electrical sub-contractor with MCS
                certification.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Joint Industry Board (JIB) Working Rule Agreement &mdash; grade definitions (paraphrased)"
            clause={
              <>
                <p className="mb-2">
                  The JIB Working Rule Agreement defines the grading structure for the electrical
                  contracting industry in England, Wales and Northern Ireland. Headline grades:
                </p>
                <ul className="space-y-1 list-disc pl-5 text-[14px]">
                  <li>
                    <strong>Apprentice</strong> &mdash; registered apprentice working under a JIB
                    Apprentice Code of Practice contract.
                  </li>
                  <li>
                    <strong>Adult Trainee</strong> &mdash; non-apprenticeship adult learner route.
                  </li>
                  <li>
                    <strong>Electrician</strong> &mdash; holds the relevant Level 3 qualifications
                    (C&amp;G 2365 or NVQ) and has passed AM2.
                  </li>
                  <li>
                    <strong>Approved Electrician</strong> &mdash; Electrician plus three years
                    post-AM2 experience and evidence of higher-level competence.
                  </li>
                  <li>
                    <strong>Technician</strong> &mdash; Approved Electrician plus HNC, HND or
                    equivalent and evidence of design or supervision authority.
                  </li>
                </ul>
                <p className="mt-2">
                  Pay rates and conditions for each grade are negotiated annually between the
                  Electrical Contractors&apos; Association (ECA &mdash; employer side) and Unite
                  the Union (worker side) and published on jib.org.uk.
                </p>
              </>
            }
            meaning={
              <>
                The JIB grade is the industry-standard signal of an electrician&apos;s competence
                and experience. Most electrical employment contracts in the JIB-graded sector
                reference the JIB Working Rule Agreement, which means the JIB grade dictates your
                hourly rate, your overtime, your travel time payments, your sick pay and your
                pension. Knowing what grade you&apos;re on and what you need to do to step up is
                career-critical.
              </>
            }
            cite="Source: JIB Working Rule Agreement &mdash; paraphrased and summarised from publicly available JIB guidance at jib.org.uk."
          />

          <RegsCallout
            source="Health and Safety at Work etc Act 1974 &mdash; s.2(3) (employer safety policy)"
            clause={
              <>
                &quot;Except in such cases as may be prescribed, it shall be the duty of every
                employer to prepare and as often as may be appropriate revise a written statement
                of his general policy with respect to the health and safety at work of his
                employees and the organisation and arrangements for the time being in force for
                carrying out that policy, and to bring the statement and any revision of it to the
                notice of all of his employees.&quot;
              </>
            }
            meaning={
              <>
                HASAWA s.2(3) requires every employer with five or more employees to publish a
                written safety policy and to bring it to all employees&apos; notice. As an
                apprentice you&apos;re entitled to see your firm&apos;s policy at induction. The
                policy describes the organisation of safety responsibilities (who does what), the
                arrangements (toolbox talks, RAMS, PPE issue, training records) and the safety
                culture the employer commits to. A firm that can&apos;t produce its policy at
                induction is a firm that hasn&apos;t taken s.2(3) seriously &mdash; that&apos;s a
                signal worth noticing.
              </>
            }
            cite="Source: Health and Safety at Work etc Act 1974 (1974 c.37), Part I, s.2."
          />

          <RegsCallout
            source="Construction (Design and Management) Regulations 2015 &mdash; r.4 (client duties, paraphrased)"
            clause={
              <>
                <p className="mb-2">
                  The CDM 2015 Regulations allocate health and safety duties across the
                  construction project participants &mdash; Client, Principal Designer, Designer,
                  Principal Contractor, Contractor and Workers. Headline allocation:
                </p>
                <ul className="space-y-1 list-disc pl-5 text-[14px]">
                  <li>
                    <strong>Client</strong> &mdash; appoints competent duty holders, allows
                    sufficient time and resource, ensures the project is properly managed.
                  </li>
                  <li>
                    <strong>Principal Designer</strong> &mdash; coordinates safety in the
                    pre-construction phase.
                  </li>
                  <li>
                    <strong>Principal Contractor</strong> &mdash; coordinates safety in the
                    construction phase. On commercial projects the main contractor is the
                    Principal Contractor.
                  </li>
                  <li>
                    <strong>Contractor</strong> &mdash; carries out the construction work
                    safely. The electrical sub-contractor sits here.
                  </li>
                  <li>
                    <strong>Worker</strong> &mdash; cooperates, follows instruction, reports
                    hazards. The apprentice and the qualified operative sit here.
                  </li>
                </ul>
              </>
            }
            meaning={
              <>
                CDM 2015 is the framework that allocates safety duties across the project. Knowing
                where the electrical sub-contractor sits (Contractor) and where the apprentice sits
                (Worker) is the first step to understanding why instructions cascade the way they
                do. The Principal Contractor (main contractor) sets site-wide rules; your firm sets
                trade-specific rules; you follow both. CDM 2015 is covered in depth in L2 Module 5
                Section 1 Subsection 4.
              </>
            }
            cite="Source: Construction (Design and Management) Regulations 2015 (SI 2015/51) &mdash; paraphrased from legislation.gov.uk and HSE L153 guidance."
          />

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Treating \'electrical' as the only career option"
            whatHappens={
              <>
                Apprentice finishes AM2, takes an Electrician role with their training employer,
                stays for ten years on the same domestic-and-light-commercial diet, and then
                wonders why their pay has plateaued and their CV looks identical to every other
                qualified electrician&apos;s. The wider BSE landscape (BMS, fire, controls,
                renewables, design, commissioning, manufacturer roles) was always there but the
                apprentice never explored it because they didn&apos;t know it existed.
              </>
            }
            doInstead={
              <>
                Treat the AM2 as the door, not the destination. Once you&apos;re a qualified
                Electrician, the JIB grade is portable and your CV is competitive across the
                industry. Spend time understanding what BMS engineers, commissioning specialists,
                Designers and Project Engineers actually do. Talk to people in those roles when
                you meet them on site. Add a CPD qualification every couple of years &mdash; the
                C&amp;G 2391-52, the C&amp;G 2396, an MCS scheme, an HNC, a vendor cert &mdash; to
                keep the doors open. Your career compounds when you keep adding to the stack.
              </>
            }
          />

          <Scenario
            title="You\'re two years post-AM2 — what\'s the next move?"
            situation={
              <>
                You finished your apprenticeship two years ago, you&apos;re on the standard
                Electrician JIB rate with your training employer (a regional commercial M&amp;E
                sub-contractor) and you&apos;re wondering what&apos;s next. You enjoy the technical
                side &mdash; design questions, fault-finding, why things work &mdash; more than you
                enjoy the install grind. You&apos;ve heard about Project Engineer roles and design
                roles but you&apos;re not sure how to make the move.
              </>
            }
            whatToDo={
              <>
                <strong>Step 1 &mdash; talk to your Project Engineer and Contracts Manager</strong>.
                Tell them you&apos;re interested in the technical side and ask what the route looks
                like in your firm. Most contractors have an internal progression from Electrician
                to Charge Hand to Foreman, and some have a side-step from Approved Electrician
                into Design or Engineering with funded CPD.
                <br /><br />
                <strong>Step 2 &mdash; pick the right next qualification</strong>. For Project
                Engineer or Design routes the most useful next step is C&amp;G 2391-52 (Inspection
                and Testing) and either an HNC in Electrical Engineering (one year part-time) or
                the C&amp;G 2396 (Design). 2391-52 is the gateway to inspection and testing
                contracts and is well-respected. The HNC opens the design-team door.
                <br /><br />
                <strong>Step 3 &mdash; build a portfolio of design questions you&apos;ve
                handled</strong>. Even as a site Electrician you&apos;ll have raised RFIs,
                resolved coordination clashes, fault-found unusual issues. Write these up briefly
                &mdash; they&apos;re the evidence that lets you cross from install to design or
                Project Engineer.
                <br /><br />
                <strong>Step 4 &mdash; get on the Approved Electrician grade</strong>. Three years
                post-AM2 is roughly the JIB minimum for Approved. Apply through JIB &mdash; the
                upgrade is the right pay-grade signal and is also a useful CV step before any
                management or design move.
                <br /><br />
                <strong>Step 5 &mdash; if your firm can&apos;t support the move,
                move</strong>. Some firms are structured for upward mobility and others are not.
                If yours genuinely can&apos;t fund or support the next step, look at firms that
                explicitly recruit Project Engineers from a site background (NG Bailey, Briggs
                &amp; Forrester, T Clarke and the major M&amp;E Consultants all do). Don&apos;t
                burn the bridge &mdash; leave well, keep the references.
              </>
            }
            whyItMatters={
              <>
                The post-AM2 plateau is real and it&apos;s the moment most electricians&apos;
                careers either compound or stagnate. The early decisions &mdash; the next
                qualification, the next role, whether to stay or move &mdash; set the trajectory
                for the next decade. The best move is rarely &quot;stay where you are and
                hope&quot; &mdash; it&apos;s &quot;pick a direction, add the qualification, talk
                to the right people, then move when you&apos;re ready&quot;. The Project Engineer,
                Design, Commissioning and BMS routes all need someone to take the first deliberate
                step.
              </>
            }
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Pay maths and the long-game economics</ContentEyebrow>

          <ConceptBlock
            title="What an Electrician actually earns once you stack overtime, travel and London weighting"
            plainEnglish="The headline JIB national rate (around £19.42/hr Electrician and £21.21/hr Approved Electrician on the 2024 schedule) is the floor, not the ceiling. The real take-home stacks on top: travel time (paid both ways above the daily threshold mileage), subsistence (lodging allowance for jobs over 50 miles from home), London Weighting (LW) at roughly +£3.26/hr inside the M25, productivity bonuses on big projects, and overtime at 1.5x or 2x. A central-London Approved Electrician on a major commercial fit-out can clear £75-90k gross. A regional Electrician on standard JIB rates with modest overtime sits closer to £42-50k."
            onSite="Always read the JIB national rate card alongside the Working Rule Agreement clauses on travel, subsistence and overtime — they're what turn the headline rate into the weekly cheque. Ask your firm's payroll for a sample wage slip and walk through the stack: basic, travel, OT, LW, holiday accrual. Apprentices should know this because it's the difference between 'this firm pays JIB rate' and 'this firm pays JIB rate but pays travel time grudgingly' — both are technically compliant; only one is fair."
          >
            <p>
              The 2024 JIB national rate stack (illustrative — always check current jib.org.uk):
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Electrician basic</strong> &mdash; ~&pound;19.42/hr national, ~&pound;22.68/hr LW inside M25.
              </li>
              <li>
                <strong>Approved Electrician</strong> &mdash; ~&pound;21.21/hr national, ~&pound;24.47/hr LW.
              </li>
              <li>
                <strong>Travel time</strong> &mdash; paid each way above the daily threshold mileage (typically 15&ndash;50 miles tier-banded).
              </li>
              <li>
                <strong>Subsistence / lodging</strong> &mdash; flat daily allowance when working &gt;50 miles from home.
              </li>
              <li>
                <strong>Overtime</strong> &mdash; 1.5x weekday after contracted hours, 2x weekends and bank holidays.
              </li>
              <li>
                <strong>JIB Pension</strong> &mdash; defined-contribution, 5% employer + 5% employee minimum on JIB-graded contracts.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="The 5-year and 10-year career maths — why CPD spend pays back hard"
            plainEnglish="At the standard JIB Electrician rate (~£19.42/hr × 39hr × 47 weeks ≈ £35.6k basic) you sit at industry baseline. Adding C&G 2391-52 (~£900-1,400 course cost) and stepping into Approved Electrician (~+£1.79/hr) returns roughly £3,500/year extra — payback in 4 months. Adding an HNC over 2 years (~£3-5k self-funded, often employer-contributed) and stepping into Project Engineer adds £8-15k/year. Adding MCS PV registration (~£1,200 setup) and routing 30 EV-charger installs/year through your own firm at ~£300 margin each adds another £9k. Each CPD investment compounds."
            onSite="Apprentices fixate on the AM2 day rate and miss the long game. The electrician who finishes AM2 and never adds another qualification will plateau at JIB Electrician within 3 years. The electrician who adds 2391-52, then HNC, then a vendor BMS cert (Trend, Tridium) over 6 years post-AM2 is on £55-75k by year 8 — more than double the plateau. Treat your CPD calendar like a financial plan: pick the next qualification deliberately, budget the time, expect a measurable pay return inside 12 months. The qualifications that don't pay back are the wrong ones to pick."
          >
            <p>
              Indicative CPD payback maths (course cost vs annual extra earnings):
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>2391-52 + Approved upgrade</strong> &mdash; ~&pound;1,200 outlay, ~&pound;3,500/yr extra. Payback &lt;5 months.
              </li>
              <li>
                <strong>MCS PV/EV registration</strong> &mdash; ~&pound;1,200 setup + ~&pound;500/yr scheme, opens grant-funded job stream worth &pound;8&ndash;15k/yr margin.
              </li>
              <li>
                <strong>HNC Electrical Engineering</strong> &mdash; ~&pound;4k over 2yr part-time, opens Project Engineer band ~&pound;45&ndash;58k.
              </li>
              <li>
                <strong>BMS vendor cert (Trend Level 2)</strong> &mdash; ~&pound;1,800, opens commissioning day rates &pound;320&ndash;450 vs &pound;180&ndash;220 standard install.
              </li>
              <li>
                <strong>NICEIC scheme registration (own firm)</strong> &mdash; ~&pound;500&ndash;1,500/yr depending on streams, unlocks Part P self-cert and own-customer work.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Self-employed CIS vs PAYE JIB — same hours, different take-home"
            plainEnglish="Many qualified electricians work self-employed under the Construction Industry Scheme (CIS), invoicing the contractor weekly with 20% deducted at source by HMRC. Headline day rates are higher (£200-280/day for an Electrician, £260-340/day for Approved) but the worker covers their own pension, sick pay, holiday, training, tools and indemnity. PAYE JIB is lower headline but loaded with paid holiday (5.6 weeks statutory minimum + JIB-additional), sick pay, JIB pension, employer NI contribution and protected redundancy. Apples-to-apples once you net it out, CIS and PAYE often land within 5-10% of each other for the same skill — the difference is risk allocation."
            onSite="Apprentices can't go CIS — apprenticeship contracts are PAYE-only because the apprenticeship indenture is a specific employment contract under the Apprenticeships, Skills, Children and Learning Act 2009. Post-AM2 the CIS option opens. Most electricians try both over their career. CIS suits independent operators who manage their own finances, can absorb dry weeks, and want maximum flexibility. PAYE suits people who want stability, a known pension trajectory, training paid for, and don't want the admin overhead. There's no single right answer — it changes with life stage and family commitments."
          >
            <p>
              Quick comparison of CIS vs PAYE JIB for a qualified Electrician:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Headline rate</strong> &mdash; CIS &pound;200&ndash;280/day, PAYE JIB ~&pound;19.42/hr (~&pound;155/day basic).
              </li>
              <li>
                <strong>Holiday</strong> &mdash; CIS unpaid (you carry the cost), PAYE 5.6 weeks statutory + JIB top-up paid.
              </li>
              <li>
                <strong>Sick pay</strong> &mdash; CIS unpaid (SSP if you self-register), PAYE company sick pay + SSP.
              </li>
              <li>
                <strong>Pension</strong> &mdash; CIS self-arranged (SIPP / personal), PAYE JIB DC scheme with employer match.
              </li>
              <li>
                <strong>Training</strong> &mdash; CIS self-funded, PAYE often employer-funded with study leave.
              </li>
              <li>
                <strong>Tax admin</strong> &mdash; CIS Self Assessment annually + monthly CIS statements, PAYE handled by employer.
              </li>
              <li>
                <strong>IR35 risk</strong> &mdash; CIS through a Ltd company sits inside IR35 rules &mdash; HMRC may reclassify if you're on a single contract long-term.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "UK electrical work is layered — main contractor (head contract), electrical sub-contractor (specialist package), domestic installer (sole traders and small firms working on dwellings under a Part P scheme).",
              "The formal JIB grade ladder is Apprentice → Adult Trainee → Electrician → Approved Electrician → Technician. Each grade has a defined competence standard, a national pay rate negotiated between ECA and Unite, and shows on your ECS card. 'Improver' is colloquial industry shorthand for the post-college, pre-AM2 stage — NOT a formal JIB grade.",
              "Within a sub-contractor the site roles are Apprentice / Electrician / Approved / Charge Hand / Foreman / Project Engineer / Contracts Manager. Office and specialist roles include Design Engineer, Estimator, Commissioning Engineer, Procurement.",
              "Building services engineering (BSE) is broader than electrical — it includes mechanical (HVAC), public health, fire detection, security, BMS, lifts, and renewables (solar, EV, heat pumps). Cross-discipline knowledge increasingly matters.",
              "Procurement route shapes who designs — traditional contracts keep design with an external M&E Consultant; design and build (D&B) shifts design to the contractor's in-house or external design team. Most modern UK projects are D&B.",
              "BMS, commissioning and renewables are three of the fastest-growing specialisms within electrical. All open at premium rates with the right vendor certifications and qualifications added to the AM2 stack.",
              "The first move post-AM2 is the biggest career inflection point. Pick a direction (install, design, Project Engineer, commissioning, BMS, renewables), pick the next qualification deliberately, build the right relationships, and move at the right moment.",
              "JIB grade, ECS card and your qualifications are portable across employers. Once you're past AM2 you're a free-agent qualified electrician — the UK industry has high mobility and your competence record travels with you.",
            ]}
          />

          <Quiz title="Industry structure and roles — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module7-section1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Back
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Section 1 landing
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module7-section1-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                1.2 JIB grading and the ECS card
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
