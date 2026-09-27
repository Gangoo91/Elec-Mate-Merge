/**
 * Ported from the English course, combining:
 *   level2/module3/section2/Sub1.tsx
 *   level2/module5/section3/Sub1.tsx
 *
 * The Welsh Level 3 qualification covers this material, so the teaching is
 * carried into this course rather than sending a learner out to read it in
 * another one. The text is unchanged; only the page shell was removed.
 *
 * 🔴 Never describe this content as EAL-approved, EAL-mapped or endorsed.
 */

import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
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

/* ── Inline checks (wired into streaks/stats) ─────────────────────── */

const checks = [
  {
    id: 'sources-which-source-check',
    question:
      "You've got a brand-new RCBO sat in front of you and the test sequence on the OSG doesn't quite match what the device looks like. Where do you go FIRST to confirm how to test it?",
    options: [
      "The manufacturer's installation instructions for that specific RCBO",
      'The On-Site Guide ready-reckoner tables',
      'Guidance Note 3, for the generic test sequence',
      'The blank model forms in BS 7671 Appendix 6',
    ],
    correctIndex: 0,
    explanation:
      "Manufacturer's installation instructions (IIs) win for device-specific behaviour. BS 7671 and GN3 set the framework, but the device datasheet tells you the test buttons, terminal layout and any quirks. Reg 510.3 / 134.1.1 require you to follow manufacturer's instructions where they exist.",
  },
  {
    id: 'sources-bs7671-part-check',
    question:
      'You need to know the maximum permitted Zs for a 32 A Type B MCB on a TN system. Which part of BS 7671 do you open?',
    options: [
      'Part 1 — Scope, object, fundamental principles',
      'Appendix 3 — Time/current characteristics',
      'Part 6 — Inspection and testing',
      'Part 4 — Protection for safety',
    ],
    correctIndex: 1,
    explanation:
      'Appendix 3 holds the time/current curves and the corresponding Zs tables for standard protective devices. Part 4 explains the principle of automatic disconnection; Appendix 3 gives you the actual numbers. Apprentices often head to Part 6 by reflex — Part 6 tells you HOW to test, not what the limit IS.',
  },
  {
    id: 'sources-rams-check',
    question: "What's the difference between a RAMS and a method statement?",
    options: [
      'RAMS = Risk Assessment AND Method Statement combined into one document',
      'A RAMS is for high-risk work, a method statement is for low-risk',
      'A RAMS is just the risk assessment, the method statement is separate',
      'Nothing — they mean the same thing',
    ],
    correctIndex: 0,
    explanation:
      'RAMS is the umbrella term for the combined Risk Assessment + Method Statement document. The risk assessment identifies hazards and controls; the method statement is the step-by-step of how the work will actually be done. Most contractors issue them together as one PDF.',
  },
];

/* ── End-of-page Quiz (wired into streaks/stats) ──────────────────── */

const quizQuestions = [
  {
    id: 1,
    question:
      'Where in BS 7671 would you find the verbatim wording of a regulation about RCD additional protection on socket-outlets?',
    options: [
      'Part 1 (Scope)',
      'Part 4 (Protection for safety)',
      'Part 7 (Special installations or locations)',
      'Appendix 6 (Model forms)',
    ],
    correctAnswer: 1,
    explanation:
      'Part 4 — Protection for safety. Section 411 (TN/TT/IT) and Section 415 (additional protection by RCD) live there. Part 7 covers special locations like bathrooms and would extend the requirement; Appendix 6 just holds blank model forms.',
  },
  {
    id: 2,
    question:
      "You're sizing a final circuit on a domestic dwelling and want quick lookup tables for cable size vs MCB rating, with diversity factors already applied. Which book gets you there fastest?",
    options: [
      'IET Guidance Note 3 (GN3)',
      'BS 7671 itself',
      'IET On-Site Guide (OSG)',
      'BS 7671 Appendix 4',
    ],
    correctAnswer: 2,
    explanation:
      'The On-Site Guide is the ready-reckoner for domestic and small commercial work — pre-calculated tables, diversity worked out, the lot. GN3 covers inspection and testing in depth, not design.',
  },
  {
    id: 3,
    question:
      'BS 7671:2018+A4:2026 introduced a new regulation, 514.9.2, about diagrams and charts. What does it actually require?',
    options: [
      'That every installation must include a full single-line diagram on A3 paper',
      'That diagrams must be hand-drawn rather than produced on a computer',
      'That a copy of every drawing must be left inside the consumer unit',
      'That all diagrams, charts and information notices comply with the applicable standards specified',
    ],
    correctAnswer: 3,
    explanation:
      "514.9.2 (new in A4:2026) requires diagrams, charts and information/instruction notices to comply with the applicable standards — that means symbols per IEC 60617 (the modern replacement for IEC 60617), notices per BS EN 60073 / 60446 etc. It's about consistency so anyone reading the drawing or label knows what they're looking at.",
  },
  {
    id: 4,
    question:
      "The manufacturer's installation instructions for an RCBO say 'torque each terminal to 1.2 Nm'. The OSG quotes 0.8-1.5 Nm as a typical range. What do you do?",
    options: [
      "Use 1.2 Nm — the manufacturer's specific figure overrides the generic guidance",
      'Use the OSG range — published guidance always takes priority over a single maker',
      'Use the midpoint of the OSG range as a sensible compromise between the two',
      'Use whichever value is highest to be sure the terminal is tight enough',
    ],
    correctAnswer: 0,
    explanation:
      "Specific beats generic. Reg 526.1 requires connections to be made in accordance with manufacturer instructions — that's the legal hook. The OSG range is a safety net for when no specific figure is given.",
  },
  {
    id: 5,
    question: 'What is a RAMS?',
    options: [
      'Required Amperage Method Standard',
      'Risk Assessment and Method Statement',
      'Rated Ampacity Multiplier System',
      'Regulation Assessment for Mains Supply',
    ],
    correctAnswer: 1,
    explanation:
      'Risk Assessment and Method Statement — combined into a single document on most jobs. Identifies hazards, controls, and the step-by-step way the task will be done safely.',
  },
  {
    id: 6,
    question:
      "You've found a non-standard four-pole isolator on a refurb and need to know its short-circuit withstand rating. Where will the answer definitely be?",
    options: [
      'BS 7671 Appendix 3 time/current characteristics',
      'The On-Site Guide standard circuit tables',
      "The manufacturer's product datasheet",
      'Guidance Note 3 inspection schedules',
    ],
    correctAnswer: 2,
    explanation:
      'Datasheets carry the device-specific electrical ratings: In, Icn, Icu, Ics, mechanical endurance, terminal capacity. BS 7671 sets the requirements an installation must meet; the datasheet tells you what THIS device can actually do.',
  },
  {
    id: 7,
    question:
      "Which of these is NOT something you'd expect to find in BS 7671 itself (rather than in a Guidance Note)?",
    options: [
      "Definition of 'extraneous-conductive-part' (Part 2)",
      'Verbatim regulation wording on isolation (Section 537)',
      'Time/current curves for standard protective devices (Appendix 3)',
      'Worked example of a bathroom installation with the cable runs marked',
    ],
    correctAnswer: 3,
    explanation:
      "BS 7671 sets requirements, not worked installation examples. Worked examples with cable runs marked sit in the OSG and the Guidance Notes — that's their job. BS 7671 stays prescriptive: definitions, regulations, appendix data.",
  },
  {
    id: 8,
    question:
      "On site, you spot the certification scheme (NICEIC / NAPIT / Stroma) has issued a technical bulletin about a specific manufacturer's consumer unit being recalled. What's the correct response?",
    options: [
      'Read it, log it, and apply it on relevant jobs — bulletins reflect current best practice and the scheme audits against them',
      'Ignore it — only changes to BS 7671 itself have any force',
      'Wait for the next BS 7671 amendment before changing anything you do',
      'Apply it only if a customer specifically asks you to',
    ],
    correctAnswer: 0,
    explanation:
      "Scheme bulletins are how certification bodies communicate urgent technical changes between BS 7671 amendments. Audits expect to see you've taken account of them. Ignoring a bulletin about a recalled CU is exactly the kind of thing that fails an assessment visit.",
  },
];

/* ── FAQs (apprentice voice) ───────────────────────────────────────── */

const faqs = [
  {
    question: 'BS 7671 is huge. Do I really need to know my way round all of it?',
    answer:
      "You don't memorise it — you learn the SHAPE of it, so when a question lands you know roughly which Part to open. Part 1 = scope, Part 2 = definitions, Part 3 = assessment, Part 4 = protection, Part 5 = selection of equipment, Part 6 = inspection & testing, Part 7 = special locations, then the appendices. Get the shape down and the rest is just turning pages.",
  },
  {
    question: 'OSG vs GN3 — when do I use which?',
    answer:
      "OSG (On-Site Guide) is your day-one design book — cable sizes, diversity, ready-reckoner tables for domestic and small commercial. GN3 is your inspection & testing bible — every test method, every form, every certification scenario. Most apprentices live in the OSG for the first year and grow into GN3 once they're testing more.",
  },
  {
    question:
      "What's the difference between manufacturer's installation instructions and a datasheet?",
    answer:
      'Installation instructions tell you how to fit, wire and commission the device — torque settings, mounting orientation, test sequences. The datasheet tells you what it IS — electrical ratings, dimensions, certifications, environmental limits. Both come from the manufacturer and both override generic guidance for that specific product.',
  },
  {
    question: 'Do I have to read the RAMS or is it just paperwork?',
    answer:
      "Read it. Sign it. Question anything you don't understand BEFORE the work starts. The RAMS is the document that proves the contractor thought about how to do this job safely — and if you get hurt doing something that contradicts the RAMS, both you and the contractor are in trouble. It's your shield as much as the company's.",
  },
  {
    question: 'Why are there so many overlapping documents? BS 7671, OSG, GN3, scheme bulletins…',
    answer:
      'BS 7671 is the legal-strength standard (referenced by EAWR through dutyholder duties). The IET Guidance Notes and OSG break it down for practical use. Scheme bulletins (NICEIC SnagIT, NAPIT etc) plug the gap between amendments and flag emerging issues. Each layer is more practical and faster-moving than the one above it.',
  },
  {
    question: "If a manufacturer's instructions contradict BS 7671, who wins?",
    answer:
      "BS 7671 wins for installation requirements, but a manufacturer can REQUIRE more than BS 7671 — never less. If the manufacturer says 'must be on its own 30 mA RCD', you do that even if BS 7671 doesn't strictly require one for that circuit type. The rule is: meet the higher of the two.",
  },
];

/* ── Inline checks2 ────────────────────────────────────────────────── */

const checks2 = [
  {
    id: 'mod5-s3-sub1-folder',
    question:
      'First day on a commercial DB upgrade. The site office hands you a thin clear-pocket folder with just a programme and a single drawing in it. Everything else you need is somewhere else. What do you do before you pick a tool up?',
    options: [
      "Treating someone less favourably because they have done a 'protected act' — typically making a discrimination complaint, supporting someone else's complaint, or giving evidence in a discrimination case. Victimisation is unlawful even if the original complaint was unsuccessful, provided it was made in good faith. The protection extends to apprentices, ex-employees and anyone else covered by the Act.",
      "Because most electrical contractors are registered with a competent-person scheme (NICEIC, NAPIT, ELECSA, STROMA, Certsure) which self-certifies the work to the Local Authority. The Local Authority accepts the scheme certificate without separate inspection. Building Control would only physically inspect for non-scheme work or where there's a specific concern.",
      "Stop and ask the supervisor for the missing items — RAMS, risk assessment, COSHH for any chemicals, the rest of the drawings (single line, schedule of circuits), the schematic, the schedule of test results from the existing install, BS 7671 and the OSG, mfr data for the new board, and the permit if any of the work is hot. Without that information you can't show your work was done to a 'suitable and sufficient' standard under MHSWR Reg 3 and you can't show compliance with BS 7671 Reg 132.13.",
      "G98 fast-track applies to fully-type-tested generators with output up to and including 16 A per phase per inverter — that's 16 A × 230 V = 3.68 kW single-phase per inverter. G99 pre-application applies above 16 A per phase, and to all generators (regardless of size) at sites where pre-existing G98 or G99 generators already exist. Most domestic 4 kW PV inverters are deliberately limited to 3.68 kW max output to stay G98-eligible. Anything above triggers G99 with associated DNO assessment timeline (weeks to months depending on local network).",
    ],
    correctIndex: 2,
    explanation:
      "BS 7671 Reg 132.13 explicitly requires the designer to provide the information needed for the safe operation, inspection and maintenance of the installation. CDM 2015 Reg 13 puts a parallel duty on the principal contractor to make site information available to operatives. A thin folder with a programme is a red flag — it isn't a basis for safe work. The right move on day one is to ask, in writing if possible, for the full information set before starting. That request is itself evidence that you took reasonable steps under HASAWA s.7.",
  },
  {
    id: 'mod5-s3-sub1-purpose',
    question:
      "You're handed a manufacturer data sheet for a new RCBO. What is the SPECIFIC purpose of this document for you on the day, beyond 'reference material'?",
    options: [
      "It tells you the torque settings for the terminals, the conductor sizes the unit accepts, whether ferrules are required for stranded conductors, the breaking capacity, the trip curve, and the IP rating in its housing — all of which feed directly into compliance with BS 7671 Reg 526.1 (durable connections) and Reg 510.3 (selection and erection in line with mfr instructions). Skip the data sheet and you're terminating by feel, which voids warranty AND fails Reg 526.1.",
      'Advanced cultural empathy: understanding that safety communication styles must be adapted to cultural context. In high power-distance cultures, a peer raising concerns directly may be uncomfortable. In indirect communication cultures, blunt safety warnings may cause face-loss. The electrician must find a culturally appropriate way to communicate urgency without causing shame, possibly involving the site supervisor or using visual demonstration rather than direct verbal confrontation',
      'Separating the person from their past behaviour and responding to their current human experience with genuine compassion. Advanced empathy recognises that difficult people are often struggling, that past conflict does not negate present humanity, and that showing empathy in this moment may transform the entire working relationship — whilst still maintaining appropriate professional boundaries',
      'Sign in at the gate or welfare cabin, present ECS / CSCS / industry card if relevant, attend a visitor induction (shorter than the full operative induction), wear correct PPE for the area, and be escorted by a competent person from the site team. Visitors are not permitted to walk the site unaccompanied. CDM 2015 Reg 13(4)(b) requires the PC to take steps to prevent unauthorised access.',
    ],
    correctIndex: 0,
    explanation:
      "Manufacturer data is not optional reference material — BS 7671 Reg 510.3 ties equipment selection and erection to the manufacturer's instructions, and Reg 526.1 makes the connection itself a code-compliance issue. A torque value 'by feel' is not defensible if the install fails an inspection or if the warranty is later challenged. The data sheet is the authoritative source for the torque, the conductor capacity, and the ferrule requirement. Read it before terminating, not after.",
  },
  {
    id: 'mod5-s3-sub1-jib',
    question:
      "You're asked to work two hours past the standard finish time on a Friday. Where do you check what you're entitled to be paid for those two hours?",
    options: [
      "An 'electrical system' is defined in Reg 2 as 'a system in which all the electrical equipment is, or may be, electrically connected to a common source of electrical energy'. So everything from the cut-out to the final accessory is one system. Reg 4(1) applies to the whole of it, not just the bit you happened to touch.",
      "To take reasonable care for the health and safety of self and others, and to co-operate with the employer's safety arrangements. In RAMS terms that means reading the document, following the written method, raising defects in the document, and not working outside the documented controls. 'Following orders' is no defence to an s.7 prosecution.",
      "Acknowledge the request verbally, then send a short written variation by email or in your job-management app before the end of the day. Quote the additional cost, get the customer's written confirmation back before you arrive on site, and only then carry out the extra work. The verbal yes is fine for tone; the written variation is what protects payment, scope and warranty.",
      'Your employment contract and the JIB Working Rules. The JIB Handbook sets the industry-standard overtime, travel-time, lodging and grading rules for electricians in England and Wales. Your contract should reference it (most reputable firms apply the JIB rates as a baseline). The HR docs — contract, JIB rules, holiday and grievance procedures — are how you get paid correctly and how you keep your rights if a dispute arises.',
    ],
    correctIndex: 3,
    explanation:
      "HR and commercial information — your employment contract, the JIB Working Rules where they apply, holiday request procedures, grievance procedures — exists so that you can demonstrate (and defend) your rights and obligations. Apprentices are covered by the JIB Apprentice Grading scheme as well as the apprenticeship standards, and the JIB rates for overtime and travel time apply where the contract references them. 'Whatever the supervisor says' isn't a substitute for checking the rules — it's a route to being underpaid. Check the contract, check the rules, ask if uncertain.",
  },
];

/* ── End-of-page Quiz ─────────────────────────────────────────────── */

const quizQuestions2 = [
  {
    id: 1,
    question:
      'Which five families of workplace information does an apprentice electrician need to be able to find and use?',
    options: [
      'Wind turns the rotor blades, which drive a generator (typically through a gearbox) to convert kinetic energy from the wind into electrical energy — either AC from a synchronous/asynchronous generator or variable-frequency AC converted to grid-frequency AC via power electronics',
      'Safety documents (RAMS, COSHH, risk assessments, permits, fire muster, welfare info), design documents (drawings, specs, schedules, schematics, BIM, RFI logs), standards (BS 7671, IET OSG, manufacturer data), contract / commercial (programme, snag list, variations, delay notices) and HR (employment contract, JIB Working Rules, holiday and grievance procedures).',
      "To be the apprentice's day-job teacher and portfolio signer-off. The Mentor is an experienced electrician (typically Approved or Technician grade) who is formally allocated to support a specific apprentice. They sign portfolio entries as evidence of on-site competence, calibrate gradings with the College Tutor, attend the monthly three-way reviews, and act as the first point of escalation for apprentice-specific issues.",
      'A formal written authorisation that defines the work to be done, the hazards, the controls, the personnel authorised, the time period, and the sign-off conditions. Used for high-hazard activity (live working, hot work, confined space, work on safety-critical systems). Issued by the issuing authority; signed-on by the operative; signed-off when complete.',
    ],
    correctAnswer: 1,
    explanation:
      "The criterion itself is short — 'Identify the purpose of information that is used in the workplace' — but the practical scope is wide. Splitting the information into five families gives you a memory aid and a checklist: when you arrive on site, you should be able to point to where each family lives. Missing any one of them is a problem; missing several is a sign the site is not being run properly.",
  },
  {
    id: 2,
    question: 'What is the specific purpose of the safety-document family on a building site?',
    options: [
      'Cooperate (HASAWA s.7 + CDM Reg 15). Confirm your name and role. Direct the inspector to the senior person on site (supervisor, contracts manager, site manager). Answer factual questions truthfully — interfering with an inspector is a separate offence under HASAWA s.33. If asked technical questions outside your competence, say so honestly. Do not speculate or guess. Notify your firm immediately.',
      'Reg 753.522.1.3 requires that for cold leads (circuit wiring) and control leads installed in the zone of heated surfaces, the increase of ambient temperature shall be taken into account. This means conductor current-carrying capacity, derating, insulation temperature ratings and routing shall be adjusted to reflect the higher ambient temperature where the lead is installed in the heated surface zone.',
      'To identify hazards, set out the controls, allocate responsibility, and provide a defensible record of the safe system of work. RAMS and risk assessments are statutory under MHSWR 1999 Reg 3. COSHH data sheets are statutory under COSHH 2002. Permits-to-work cover higher-risk activities. The fire muster and welfare info satisfy the Workplace (Health, Safety and Welfare) Regulations 1992. Together they convert legal duty into specific instructions.',
      'Pre-construction information (PC info from client/principal designer) → construction phase plan (principal contractor) → RAMS for each work package (contractor) → toolbox talks each shift (supervisor) → permit-to-work for specific high-risk activities (issued before, closed after). Each layer references the one above it. After an incident the inspector traces backwards from the incident to find the gap.',
    ],
    correctAnswer: 2,
    explanation:
      "Safety documents have one job — to convert the abstract H&S duty into specific instructions for specific work on a specific day. After an incident the HSE inspector traces backwards from the incident through the safety documents. A complete and tailored set is a defence. A missing or generic set is evidence the duty wasn't being met. As an apprentice you live inside this paperwork — you read it, follow it, and flag anything on site that doesn't match.",
  },
  {
    id: 3,
    question: 'Why does the design-document family matter to an apprentice doing a first-fix?',
    options: [
      'Typical route: TAQA L3 (assessor qualification) — start doing some assessor work to test fit. Then L3 Award in Education and Training (introductory teaching qualification). College hires you part-time as a sessional lecturer; you teach evening classes. Convert to DET (L5 Diploma) over 1-2 years to become full lecturer. Many colleges fund the conversion if you commit to a permanent role.',
      'The fault is at a point that splits the supply — typically the consumer unit busbar, an MCB / RCBO, or a sub-circuit. If the divide is between RCD-protected zones (e.g. all RCD1 circuits dead, all RCD2 fine), the issue is RCD1 or its busbar. If the divide is between separate buildings on the same supply (main house OK, garage out), the issue is the garage feed. The fault is at the upstream side of the affected portion. Investigation: identify the boundary of dead vs live circuits; trace upstream from the boundary; the fault is at the point where dead becomes live.',
      "Reg 510.3 — 'Every item of equipment shall be selected and erected so as to allow compliance with the regulations stated in this chapter and the relevant regulations in other parts of BS 7671 and shall take account of manufacturers' instructions.' Selection AND erection. The 'take account of manufacturers' instructions' clause is what makes the data sheet effectively part of the standard.",
      "Because the drawings, specs, schedules and schematics tell you exactly what cable, what circuit, what containment, what termination, and where it goes. Build the first-fix to a memory of what the customer said and you'll either be ripping it out at second-fix or fixing it on a snag list. Design documents are how 'what was specified' gets turned into 'what was installed' — and the as-built mark-up at the end is how the next person on site (maintenance, inspector, future works) understands what you did.",
    ],
    correctAnswer: 3,
    explanation:
      "Design documents are the bridge between the specifier's intent and the installed reality. Sub-standard first-fix from poorly-read drawings is the single most common reason a snag list grows. The schedule of circuits tells you what protective device feeds what; the single line tells you the network topology; the drawings tell you where the accessories go. Ignoring any of them just transfers the work to second-fix or to the snag.",
  },
  {
    id: 4,
    question: 'Where in BS 7671 is the duty to provide installation information formally placed?',
    options: [
      "Reg 132.13 — 'The designer of the electrical installation shall provide ... the information necessary to allow the safe operation, inspection, alteration, repair, maintenance and dismantling of the electrical installation'. The information has to be available to whoever is going to operate or maintain it. That is the BS 7671 hook for site-folder paperwork (single line diagram, schedule of circuits, certificate, schedule of test results, mfr data).",
      'Wide statutory powers under s.20 — enter premises at any reasonable time, take photographs / measurements, take samples, require any person to answer questions, require production of documents, take possession of articles. Plus the power under s.21/s.22 to issue improvement and prohibition notices on the spot. Refusing or obstructing an inspector is itself a criminal offence under s.33.',
      "Although the PD's primary duty is during the pre-construction phase (gathering and providing pre-construction information), they often make periodic visits during construction to verify that the design assumptions held up and that the pre-construction H&S information is being used. This is especially common on complex projects where design changes during construction.",
      'Tape measure (5 m or 8 m, lockable), spirit level (a torpedo level for short runs, a 600 mm level for socket lines), pencil OR a chinagraph pencil for darker surfaces, and a marker square (or just the level on edge) to keep the back box parallel to the line of the wall. Centre-mark with a small cross so the chaser knows where the centre is, not just the outline.',
    ],
    correctAnswer: 0,
    explanation:
      "Reg 132.13 is the formal duty in BS 7671 for the designer to make installation information available to the user and the maintainer. It's why your final certificate package on a CU change includes the schedule of circuits and the schedule of test results — not just the EIC. Skipping the documentation is a Reg 132.13 breach as well as a practical problem for the next operative on site.",
  },
  {
    id: 5,
    question:
      'Under CDM 2015 Reg 13, what duty does the principal contractor have around information for workers arriving on a notifiable construction site?',
    options: [
      'A live-working permit (or equivalent documented authorisation), a specific risk assessment justifying conditions (a) and (b), a method statement detailing the precautions for condition (c), evidence of operative competence specifically for live working (not just general electrical competence), and frequently a second authorised person present. Documented BEFORE the work, signed off by an authorising engineer, retained on file as the audit trail.',
      'Provide site induction (covering the construction phase plan, site rules, welfare, emergency procedures and specific hazards), provide access to relevant pre-construction information, and ensure each worker has the information they need to do their work safely. Reg 14 makes it a duty on the principal contractor to ensure workers receive any relevant H&S training. Reg 15 puts a corresponding duty on the worker to co-operate.',
      "Three sections. (1) PRE-WORK — photographs of any pre-existing damage to walls / floors / tiles / surfaces near the work area. Protects against 'you damaged that' disputes. (2) WORK SCOPE — what fabric was disturbed during the work (chasing, drilling, plasterboard cutting, tile removal). (3) RESTORATION — what make-good was done, what's outstanding for other trades, customer's acknowledgment. The photographs + scope + restoration record protects the firm from misunderstandings about what was done vs what was pre-existing.",
      "'Building Management System' — the central control system that orchestrates a building's heating, ventilation, lighting, security and energy use. BMS work is one of the fastest-growing specialisms in building services because every modern commercial building has one. Electricians who learn BMS programming and commissioning (often via Trend, Tridium, Siemens or Schneider training) are in high demand and can move into BMS specialist roles paying significantly above standard electrician rates.",
    ],
    correctAnswer: 1,
    explanation:
      "CDM 2015 Reg 13 is the formal mechanism on notifiable sites for transferring hazard knowledge from the principal contractor to every operative. The induction is where you learn the site-specific information that the textbook walk-round can't teach you — live services, asbestos survey results, trade-clash zones, structural concerns. Sign in without listening and you're outside the site information system on day one.",
  },
  {
    id: 6,
    question:
      'Why does the contract / commercial family of documents matter to a first-year apprentice?',
    options: [
      'A self-sustaining exothermic chain reaction inside a Li-ion cell. Damage, overcharge, internal manufacturing defect or external heat triggers an internal short circuit, which generates heat, which decomposes the organic electrolyte, which generates more heat and flammable / toxic gas, which can ignite. Once the chain reaction has started in one cell the heat can propagate to neighbouring cells in the pack. The fire is intense, fast, and self-fuelling because the cell carries its own oxidiser within the cathode material.',
      'Can tell you: polarity and connection state of a 13A socket — correct, reversed polarity, missing earth, missing neutral. Some advanced models add EFLI and basic RCD trip indication. Cannot tell you: actual values of EFLI / IR / continuity (limited accuracy vs MFT), shared-neutral conditions, high-resistance joints below threshold, intermittent faults. Socket testers are first-look tools; the MFT gives the numbers for the certificate.',
      "The programme tells you the sequence and the deadline — miss it and your firm is at risk of liquidated damages. The snag list is your end-of-job homework. Variations and delay notices are how additional work or extra time is recorded so the firm can claim it. Your firm's cash flow — and ultimately your wages — depend on this paperwork being right. Even as an apprentice, learning to read the programme and the snag list is part of becoming a tradesperson.",
      'Three separate containers. New batteries in their original packaging or a dedicated lithium-safe storage box, separated from the others. Used but undamaged batteries in a metal container with terminals taped or with cell-tray separation to prevent short circuits. The damaged battery in a separate fire-resistant container (vermiculite, sand or a purpose-made Li-ion bag), stored away from the van interior and away from other batteries, and returned to a battery recycling collection point as soon as practical. Never stack damaged with undamaged.',
    ],
    correctAnswer: 2,
    explanation:
      "Commercial information is how the firm gets paid and how it manages risk on a project. As an apprentice you don't run the commercial side, but you should understand why the programme matters, what a variation is, what a snag list does, and why timely reporting of delays through the agreed channels protects everybody. By year four you'll be expected to understand it; year one is when you start watching.",
  },
  {
    id: 7,
    question:
      'Where does the manufacturer data sheet sit in the workplace-information families, and why?',
    options: [
      'No person shall intentionally or recklessly interfere with or misuse anything provided in the interests of H&S. Examples — removing a machine guard, defeating an interlock, taking down a barrier, reaching round a lock-off, stuffing the door of an interlocked enclosure, switching off a smoke detector you find inconvenient. s.8 is a personal criminal offence and applies to everyone on site, employee or not.',
      'Safely isolate. At the CU, identify the line and CPC of the circuit under test. Disconnect the line from the protective device and the CPC from the earth bar. Link the disconnected L and CPC together at the CU end with a low-resistance jumper. Test between L and CPC (or L and earth at the accessory) at the furthest accessory — the reading is R1+R2 for the circuit.',
      'Lighting is part of the workplace under HASAWA s.2(2)(d) and the Workplace (Health, Safety and Welfare) Regulations 1992 Reg 8. Inadequate task lighting in a confined area is a hazard in itself — it hides other hazards (trip risks, services, structural defects) and increases the chance of an error. The fix: bring temporary task lighting, set it up before tools come out, and record the temporary supply on the dynamic assessment.',
      "It sits in the standards / technical family alongside BS 7671 and the IET OSG. BS 7671 Reg 510.3 ties equipment selection and erection to manufacturer's instructions. Reg 526.1 ties the connection itself (torque, ferrule requirement, mechanical strength) to those instructions. The data sheet is the authoritative source for how the unit is meant to be installed. Treat it as part of the site folder, not the bin.",
    ],
    correctAnswer: 3,
    explanation:
      "Manufacturer data is technical, not commercial — it's the instruction set for installing the equipment to the standard the manufacturer designed it to. BS 7671 Reg 510.3 makes those instructions effectively part of the regs themselves. A site folder without manufacturer data for the major equipment (board, RCBOs, surge device, EV charger) is a folder with a hole in it.",
  },
  {
    id: 8,
    question:
      "You finish a CU change in a domestic property. Where does the information you've created during the job ultimately go, and why?",
    options: [
      "Into the customer's installation record — Electrical Installation Certificate, schedule of circuits, schedule of test results, manufacturer data for the new board, and a copy of the final RAMS for your firm's own records. The customer's pack discharges the BS 7671 Reg 132.13 duty to provide information for safe operation, inspection and maintenance. Your firm's pack is what you produce to an HSE inspector if anything is challenged later.",
      'To identify hazards, set out the controls, allocate responsibility, and provide a defensible record of the safe system of work. RAMS and risk assessments are statutory under MHSWR 1999 Reg 3. COSHH data sheets are statutory under COSHH 2002. Permits-to-work cover higher-risk activities. The fire muster and welfare info satisfy the Workplace (Health, Safety and Welfare) Regulations 1992. Together they convert legal duty into specific instructions.',
      'It is purely a marketing sheet from the wholesaler giving the list price, the stock code and the warranty length. None of it affects how you install the device — torque and conductor preparation are matters of trade judgement, and a competent electrician terminates to feel rather than to a published figure.',
      "Account-for personnel from the firm; ensure customers / visitors in your care have evacuated; liaise with the building's responsible person and fire-marshal at the muster point; provide accurate information to fire service if asked; prevent re-entry; preserve the scene afterwards if relevant to your firm's work.",
    ],
    correctAnswer: 0,
    explanation:
      "The information loop closes when the as-built information goes back into the customer's installation record and into the firm's job file. Reg 132.13 is the BS 7671 hook; the firm's QA system is the practical hook. Five years later when the next electrician opens that consumer unit and looks at the schedule, the quality of the documentation you handed over is what makes their job safe or unsafe. It's the long tail of every job you do.",
  },
];

/* ── FAQs ─────────────────────────────────────────────────────────── */

const faqs2 = [
  {
    question: 'Why does my employer make such a fuss about reading the RAMS before I start?',
    answer:
      "Two reasons. First, MHSWR 1999 Reg 3 puts a duty on the employer to make a 'suitable and sufficient' risk assessment. The RAMS is how that duty is recorded for the specific job. Second, HASAWA s.7 puts a personal duty on you to take reasonable care and to co-operate with the safety arrangements — reading the RAMS is the first step. Sign-on without reading and you've personally adopted whatever the document says, including any error in it. Five minutes of reading is cheap insurance.",
  },
  {
    question: 'Do I really need to keep the manufacturer data sheet for a single RCBO?',
    answer:
      "Yes — at least for the duration of the install and the immediate warranty period. The torque value, the conductor capacity and the ferrule requirement are on the data sheet, and BS 7671 Reg 510.3 ties your installation method to the manufacturer's instructions. If a connection is later challenged (warranty claim, EICR observation, fault investigation) the data sheet is the document that proves the spec you worked to. Most firms file mfr data with the job paperwork on completion.",
  },
  {
    question: 'What should the site folder actually contain on day one of a commercial fit-out?',
    answer:
      "A working site folder includes: the construction phase plan extract for your work area, the RAMS for your tasks, risk assessments, COSHH data sheets for any chemicals on site, the relevant drawings (single line, schedule of circuits, schematics, layout drawings), the schedule, BS 7671 and IET On-Site Guide for reference, manufacturer data for the major equipment, and any permits-to-work that apply. If any of those are missing, ask. Don't rely on 'someone's got it on their phone' — that is not a record system.",
  },
  {
    question: 'Where can I check the JIB rules without bothering the office?',
    answer:
      "The JIB Handbook is available from the JIB website (jib.org.uk) and most reputable employers will give you a copy when you start. It covers grading, basic and overtime rates, travel time, lodging, holiday and the disputes procedure. The apprentice rates and grading rules are in there too. If your contract references the JIB Working Rules, those rules are part of your terms and conditions — knowing what's in them is knowing what you're entitled to.",
  },
  {
    question: "If a piece of information I need is missing, what's the right way to escalate?",
    answer:
      "In writing — text, email, or a logged comment in your firm's job-management app. The point is to create a record. 'I asked the supervisor for the RAMS and didn't get one' is a much weaker position after an incident than a text message timed and dated to that morning. Most supervisors will respond quickly to a polite written request precisely because they know it creates a paper trail. If the request is ignored, that's a separate problem you raise up the chain.",
  },
  {
    question: 'Does the customer ever see the workplace information, or is it all internal?',
    answer:
      "Some of it goes to the customer — that's covered in the lessons on customer-facing documents (quote, invoice, EIC, schedule of test results, handover pack). The rest stays internal — RAMS, risk assessments, COSHH, programme, snag list, variations, your firm's QA records. The customer's pack at the end of a job is curated from the internal pile. As an apprentice you'll be helping prepare both.",
  },
];

export default function Lesson303_1_1() {
  return (
    <div className="space-y-8">

      <p className="max-w-3xl text-[13px] leading-relaxed text-white">
        Where you actually look stuff up on site. The right answer isn't 'Google' — it's BS 7671,
        GN3, OSG, manufacturer's instructions, drawings, RAMS, scheme bulletins and HSE INDGs.
        Each one has a job.
      </p>

      <TLDR
        points={[
          'BS 7671 is the regulation — the legal-strength standard. The OSG and the Guidance Notes break it down into practical, ready-to-use form.',
          "Manufacturer's installation instructions and datasheets win for device-specific behaviour. Reg 526.1 makes following them a legal requirement.",
          'Drawings, specs and RAMS are the job-specific layer. Scheme bulletins and HSE INDGs sit alongside as the live, fast-moving sources.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'State the purpose of BS 7671 and identify which Part covers which type of question.',
          'Describe the role of the IET On-Site Guide (OSG) and Guidance Note 3 (GN3) and when to reach for each.',
          "Explain why manufacturer's installation instructions and datasheets override generic guidance for that device.",
          'Identify the contents of a typical site spec, drawing pack and RAMS — and what each one is for.',
          'Recognise certification scheme technical bulletins as a live source of best-practice updates between BS 7671 amendments.',
          'Find the appropriate HSE INDG (industry guidance) for common site hazards (electricity, working at height, manual handling).',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>Why this matters</ContentEyebrow>

      <ConceptBlock
        title="The wrong source is worse than no source"
        plainEnglish="Every document has a job. Reach for the wrong one and you'll get an answer that's confidently wrong."
        onSite="The supervisor doesn't expect you to know everything — they expect you to know where to LOOK. 'Let me check the manual' is a professional answer; 'I think it's about 1.5 Nm' is the answer that strips a terminal."
      >
        <p>
          On day one you'll be handed a drawing pack, a spec, a RAMS, a manufacturer's manual and
          (if you're lucky) somebody pointing at the relevant page of the OSG. Without a map of
          which document does what, you'll either freeze or — worse — pick a number out of the
          wrong book and run with it.
        </p>
        <p>
          The map is roughly: BS 7671 sets the rules, the OSG and the Guidance Notes turn the
          rules into practical tables and method, manufacturer documentation governs the specific
          device, drawings and spec govern the specific job, the RAMS governs the specific shift,
          and scheme bulletins + HSE INDGs feed in the latest live updates. Six layers, each with
          a different job.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>BS 7671 — the rulebook itself</ContentEyebrow>

      <ConceptBlock
        title="The shape of BS 7671 (so you can find anything in under a minute)"
        plainEnglish="Seven Parts plus Appendices. Learn the shape, not the page numbers."
      >
        <p>
          BS 7671 is structured the same way every amendment, so the muscle memory carries between
          editions. The current edition is BS 7671:2018+A4:2026. The Parts:
        </p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Part 1 — Scope, object, fundamental principles.</strong> What the standard
            covers and the safety principles behind it. You'll dip in here once a year at most.
          </li>
          <li>
            <strong>Part 2 — Definitions.</strong> Every defined term in alphabetical order. When
            you don't know what 'extraneous-conductive-part' or 'protective bonding conductor'
            actually means, this is where you go.
          </li>
          <li>
            <strong>Part 3 — Assessment of general characteristics.</strong> What you survey
            BEFORE you design — earthing system, supply, maximum demand, external influences.
          </li>
          <li>
            <strong>Part 4 — Protection for safety.</strong> Shock protection, fault protection,
            overcurrent, voltage disturbances, thermal effects. The biggest single Part.
          </li>
          <li>
            <strong>Part 5 — Selection and erection of equipment.</strong> Cables, switchgear,
            earthing arrangements, isolation, identification, other equipment.
          </li>
          <li>
            <strong>Part 6 — Inspection and testing.</strong> The test sequence, acceptance
            criteria, what goes on the cert. Twin reference with GN3.
          </li>
          <li>
            <strong>Part 7 — Special installations or locations.</strong> Bathrooms, swimming
            pools, agricultural premises, EV charging, marinas, caravan parks, medical locations.
            Each section adds to or modifies the general requirements.
          </li>
          <li>
            <strong>Appendices.</strong> Model forms (App 6), time/current curves (App 3), voltage
            drop (App 12), harmonised cable colours (App 7) and the rest. Reach for these
            constantly.
          </li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671 — Regulation 514.9.2 (new in A4:2026)"
        clause="514.9.2 — All diagrams, charts, and information or instruction notices used in electrical installations shall comply with the applicable standards specified."
        meaning={
          <>
            A4:2026 added this clause to nail down what 'a proper drawing' actually means. Symbols
            on diagrams need to follow the IEC 60617 graphical symbol set (the modern continuation
            of the old IEC 60617). Notices need to follow BS EN 60073 (colours) and BS EN 60446
            (markings). It's the regs catching up with the fact that home-made diagrams with
            made-up symbols don't help anyone read the install ten years later.
          </>
        }
        cite="Reference: BS 7671:2018+A4:2026 Part 5, Section 514.9.2 (paraphrased)"
      />

      <RegsCallout
        source="BS 7671 — Regulation 526.1 (manufacturer's instructions for terminations)"
        clause="Every electrical connection shall be selected to take account of the conductors, the insulation, the number of conductors to be connected and the manner of installation, and shall be made in accordance with the manufacturer's instructions where applicable."
        meaning={
          <>
            The legal hook for following the manufacturer's torque, terminal type and connection
            method. If the device says 1.2 Nm, you do 1.2 Nm — even if the OSG quotes a wider
            generic range. Specific beats generic, and 526.1 gives the inspector the regulation to
            point at if you didn't.
          </>
        }
        cite="Verbatim wording paraphrased — see BS 7671:2018+A4:2026 Section 526 for full text"
      />

      <InlineCheck
        id={checks[1].id}
        question={checks[1].question}
        options={checks[1].options}
        correctIndex={checks[1].correctIndex}
        explanation={checks[1].explanation}
      />

      <SectionRule />

      <ContentEyebrow>The IET books that sit next to BS 7671</ContentEyebrow>

      <ConceptBlock
        title="On-Site Guide (OSG) — the apprentice's first lookup"
        plainEnglish="BS 7671 with the boring bits removed and the practical tables pre-filled. Domestic and small commercial focus."
        onSite="If you only carry one IET book in the van, make it the OSG. It's the one you'll reach for forty times a week — cable sizes, diversity, ring final calcs, ready-reckoner Zs values."
      >
        <p>
          The On-Site Guide is the IET's plain-English, pre-calculated companion to BS 7671. It
          assumes a domestic or small commercial install, applies sensible defaults and gives you
          ready tables for cable sizing, diversity, voltage drop and standard final circuits.
          Anything that's not domestic — heavy industrial, special locations, non-standard supply
          — drops you back to the full BS 7671 numbers.
        </p>
        <p>
          What's actually in it: standard final circuit arrangements (radial, ring, lighting),
          diversity tables for sockets / cookers / showers, current-carrying capacity tables
          (lifted from BS 7671 Appendix 4), maximum permissible Zs values for common MCBs,
          standard test result limits, blank certification forms.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="Guidance Note 3 — Inspection and Testing (GN3)"
        plainEnglish="The deep-dive companion to BS 7671 Part 6. Every test method, every form, every awkward edge case."
        onSite="GN3 is the book you grow into. Year one you barely open it. Year three you can't test without it. It's the one the assessor will assume you know inside out by AM2."
      >
        <p>
          There are eight numbered Guidance Notes (GN1 through GN8) — each one expands on a
          specific area of BS 7671. The two you'll meet first as an apprentice:
        </p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>GN1 — Selection and Erection.</strong> Expands on Parts 5 of BS 7671 — wiring
            systems, containment, terminations.
          </li>
          <li>
            <strong>GN3 — Inspection and Testing.</strong> Expands on Part 6. Every test method
            with diagrams, every cert form filled out as a worked example, periodic vs initial vs
            minor works, schedules of inspections, sample EICR.
          </li>
        </ul>
        <p>
          GN3 in particular is your canonical reference for HOW to do every test in the sequence:
          continuity (R1+R2 / wander lead), insulation resistance, polarity, earth fault loop
          impedance (Zs at the furthest point, Ze at the origin), prospective fault current, RCD
          operation. When you sit AM2, GN3 is the document you'll have read cover-to-cover.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Manufacturer documentation — the device-specific layer</ContentEyebrow>

      <ConceptBlock
        title="Installation instructions (IIs) and datasheets"
        plainEnglish="Two different documents, both from the manufacturer. IIs = how to fit it. Datasheet = what it does."
      >
        <p>
          <strong>Installation instructions</strong> ship with every accessory, device and piece
          of switchgear. They tell you how to mount it, what orientation it needs, the torque for
          each terminal, the cable sizes the terminals will accept, the test sequence on
          commissioning and any specific warnings (e.g. 'must not be installed within 1 m of
          ferromagnetic material' for some current transformers).
        </p>
        <p>
          <strong>Datasheets</strong> are the technical product card. Rated current (In), breaking
          capacity (Icn / Icu / Ics), trip curve type (B / C / D), residual current rating for
          RCDs (30 mA, 100 mA, 300 mA), terminal capacity range, IP rating, dimensions for
          cut-out, working temperature range, conformity standards (BS EN 60898, BS EN 61009 etc).
        </p>
        <p>
          When you specify, design or commission a device, both documents matter. When the
          inspector turns up, the first thing they'll ask if anything looks off is "have you got
          the manufacturer's instructions?". If the answer is no, they'll fail it on principle.
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

      <ContentEyebrow>Job-specific paperwork — drawings, specs, RAMS</ContentEyebrow>

      <ConceptBlock
        title="Drawings, specifications and BS / BS EN standards"
        plainEnglish="The job-specific layer — what THIS install needs, on THIS site, to THESE specs."
      >
        <p>
          <strong>Drawings</strong> show you the physical install — block diagrams, schematics,
          wiring diagrams, layout/floor plans, single-line diagrams for the board. (The lesson on
          interpreting diagrams and drawings breaks down each type.)
        </p>
        <p>
          <strong>Specifications</strong> (the 'spec') is the written brief from the
          designer/architect/M&E consultant. It lists the required products by
          standard/manufacturer, the design intent (lux levels, socket density), any project
          constraints (only LSF cable, only DALI dimming etc) and the contractual deliverables.
          Read the spec BEFORE you order materials.
        </p>
        <p>
          <strong>BS and BS EN standards</strong> sit underneath as the product standards. A spec
          might say "all socket-outlets to BS 1363-2"; that BS standard is the thing the socket
          has to conform to. You don't need to read every product standard cover to cover, but you
          need to know they exist and what they govern (BS 6004 = PVC cables, BS 5733 = general
          accessories, BS EN 60898 = MCBs, BS EN 61009 = RCBOs).
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="RAMS — Risk Assessment and Method Statement"
        plainEnglish="The document that says how this job will be done safely. Read it before you start."
        onSite="If you ever hear 'oh just crack on, the RAMS is in the van' — that's a flag. The RAMS exists to be read and signed by everyone doing the work, not stored under a coffee cup."
      >
        <p>A RAMS combines two things into one document:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>The risk assessment</strong> — every significant hazard on this job, the
            likelihood and severity, and the control measures. Think: working at height,
            live-working risk, confined space, asbestos, manual handling, vehicle movements.
          </li>
          <li>
            <strong>The method statement</strong> — the step-by-step of how the work will be
            carried out, in order, with the safety controls integrated. Think: 'isolate at the
            main switch, lock off, prove dead with a GS38 voltage indicator that has been proved
            on a known live source, then…'.
          </li>
        </ul>
        <p>
          It's signed off by a competent person before work starts. Every operative on the job
          should read and sign it. If site conditions change (a wall comes down, asbestos turns
          up) the work stops and the RAMS is reviewed before restart.
        </p>
      </ConceptBlock>

      <InlineCheck
        id={checks[2].id}
        question={checks[2].question}
        options={checks[2].options}
        correctIndex={checks[2].correctIndex}
        explanation={checks[2].explanation}
      />

      <SectionRule />

      <ContentEyebrow>The fast-moving sources — bulletins and HSE</ContentEyebrow>

      <ConceptBlock
        title="Certification scheme technical bulletins"
        plainEnglish="The way scheme bodies (NICEIC, NAPIT, Stroma, ELECSA) update you between BS 7671 amendments."
        onSite="Your assessor on a scheme audit will assume you've read the latest bulletins. 'I didn't see it' isn't a defence — bulletins go out by email and sit on the scheme website."
      >
        <p>
          Certification schemes issue technical bulletins when something material changes — a
          manufacturer recall, an emerging fault pattern (e.g. a particular CU brand catching
          fire), a clarification of how a new amendment should be interpreted in practice, a
          change to scheme rules. NICEIC's are commonly called SnagIT or technical updates; NAPIT
          and Stroma have their own equivalents.
        </p>
        <p>
          Bulletins are not law in the way BS 7671 is, but ignoring them is a fast track to a
          failed annual assessment. They reflect current best practice and the schemes will audit
          you against them.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="HSE INDGs and ACoPs"
        plainEnglish="HSE = Health and Safety Executive. INDG = INDustry Guidance leaflet. ACoP = Approved Code of Practice."
      >
        <p>
          HSE produces short, practical leaflets on common workplace hazards. The ones an
          electrician should know by name:
        </p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>INDG354</strong> — Safety in electrical testing at work (the 'safe isolation'
            pattern).
          </li>
          <li>
            <strong>INDG236</strong> — Maintaining portable electric equipment (PAT).
          </li>
          <li>
            <strong>INDG401</strong> — Working at height — a brief guide.
          </li>
          <li>
            <strong>INDG163</strong> — Five steps to risk assessment (if you're ever asked to
            produce one).
          </li>
        </ul>
        <p>
          Approved Codes of Practice (ACoPs) sit alongside specific Regulations (CDM, COSHH,
          Asbestos, EAWR). ACoPs have special legal status: if you can show you followed the ACoP,
          you're presumed to have complied with the law; if you didn't, you have to prove you
          achieved compliance another way.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Reaching for the OSG when the answer needed BS 7671 itself"
        whatHappens={
          <>
            You're working on a swimming pool plant room and want to know the IP rating
            requirement for the equipment in Zone 1. You flick through the OSG, can't find it
            (because the OSG is domestic-focused and doesn't go deep on Section 702), and end up
            guessing or asking the WhatsApp group. The 'just use IP44' answer somebody gives you
            is wrong — Section 702 has specific zone-by-zone requirements that aren't in the OSG.
          </>
        }
        doInstead={
          <>
            Special locations always live in BS 7671 Part 7. Pool = 702. Bathroom = 701. EV
            charging point = 722. Solar PV = 712. Train yourself to go straight to Part 7 the
            moment a job has any of those words attached, and only drop back to the OSG for the
            generic stuff.
          </>
        }
      />

      <CommonMistake
        title="Treating the spec as a suggestion"
        whatHappens={
          <>
            The spec calls for LSF (Low Smoke and Fume) cable throughout. You've got T&E in the
            van, the merchant doesn't have LSF in stock today, you crack on with T&E to keep the
            programme. Three months later the M&E consultant walks the install, spots the T&E and
            the contractor has to strip and refit the lot — at your firm's cost.
          </>
        }
        doInstead={
          <>
            The spec is contractually binding. If you can't meet it (material unavailable,
            physical clash, design error) you raise a Technical Query (TQ) or Request For
            Information (RFI) in writing and wait for a written variation. Verbal "yeah it's fine"
            from a foreman is worth nothing when the snag list arrives.
          </>
        }
      />

      <Scenario
        title="The recalled consumer unit"
        situation={
          <>
            You're shadowing on a periodic inspection. The CU is a brand and model that NICEIC
            issued a technical bulletin about six months ago — manufacturer admitted a batch were
            prone to internal arcing under fault conditions and recommended replacement. Your
            supervisor doesn't seem to know about the bulletin and is about to mark the CU as
            'satisfactory'.
          </>
        }
        whatToDo={
          <>
            Quietly mention the bulletin and offer to pull it up on your phone. Frame it as 'just
            in case we need to flag it' — don't make it a confrontation. If the bulletin applies,
            the CU should be coded (typically C2 — potentially dangerous) and the customer
            informed in writing. Reissuing a 'satisfactory' EICR on a recalled CU exposes the firm
            if anything later goes wrong.
          </>
        }
        whyItMatters={
          <>
            Scheme bulletins are exactly the situation where 'I didn't know' isn't a defence. The
            CU recall is a documented hazard with a known control. An EICR signed off without
            acknowledging it is a paperwork failure with real liability.
          </>
        }
      />

      <SectionRule />

      <FAQ items={faqs} />

      <SectionRule />

      <KeyTakeaways
        points={[
          'BS 7671 = the rules. OSG = practical day-one tables. GN3 = inspection & testing in depth. Manufacturer IIs + datasheets = device-specific.',
          "Reg 526.1 makes manufacturer's installation instructions a legal requirement for terminations — torque, terminal type, connection method.",
          'Reg 514.9.2 (new in A4:2026) requires diagrams, charts and notices to comply with the applicable standards (IEC 60617 for symbols, BS EN 60073 for notices).',
          'A RAMS is the Risk Assessment + Method Statement combined — read it, sign it, question it before work starts.',
          "Spec is contractually binding. If you can't meet it, raise a TQ/RFI in writing and wait for a written variation.",
          'Certification scheme bulletins (NICEIC, NAPIT, Stroma) are how new issues get communicated between BS 7671 amendments. Read them.',
        ]}
      />

      <Quiz title="Sources of technical info — knowledge check" questions={quizQuestions} />

      {/* ── Prev / next nav ─────────────────────────────────── */}

      <SectionRule />


      <p className="max-w-3xl text-[13px] leading-relaxed text-white">
        The five families of workplace information — safety, design, standards, contract and HR.
        What each one is for, who owns it, and why missing any one of them is a problem.
      </p>

      <TLDR
        points={[
          'Workplace information splits into five families — safety documents, design documents, standards / technical, contract / commercial, and HR. Each has a different purpose, a different owner, and a different consequence when missing.',
          'Safety docs (RAMS, COSHH, risk assessments, permits) convert the H&S duty into specific instructions. Design docs (drawings, specs, schedules, schematics) tell you what to install where. Standards (BS 7671, OSG, mfr data) tell you how to install it.',
          'BS 7671 Reg 132.13 is the formal duty on the designer to provide installation information; CDM 2015 Reg 13 is the parallel duty on the principal contractor to brief operatives on site. As an apprentice you read, follow and flag — every working day.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Identify the purpose of the information that is used in the workplace.',
          'Group workplace information into five families — safety, design, standards, contract / commercial, and HR — and state the purpose of each.',
          'Identify the BS 7671 Reg 132.13 duty on the designer to provide installation information for safe operation, inspection and maintenance.',
          'Identify the CDM 2015 Reg 13 duty on the principal contractor to provide site induction and information to workers arriving on a notifiable construction site.',
          'Recognise the role of manufacturer data sheets in the standards family and the link to BS 7671 Reg 510.3 (selection and erection in line with manufacturer instructions).',
          'Recognise the role of HR documents (employment contract, JIB Working Rules, holiday and grievance procedures) in protecting your rights and obligations as an apprentice.',
          'Apply the rule of thumb that missing information is escalated in writing, not ignored — creating a record before the work starts.',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>Why workplace information is more than 'paperwork'</ContentEyebrow>

      <ConceptBlock
        title="Information is the medium the trade actually runs on"
        plainEnglish="A working site is held together by information — what to do, how to do it, when to do it, who to do it with, and what to record afterwards. Take the information away and the cables don't go in the right place, the safe system of work falls over, and nobody gets paid correctly. The bricks-and-mortar work depends on the paper-and-pixel work in front of it and behind it."
        onSite="On day one of an apprenticeship you'll meet electricians who treat the paperwork as a chore and others who treat it as part of the job. The second group are the ones running the contracts five years later. The information system is how a competent firm distinguishes itself from one that just turns up and does what looks right."
      >
        <p>The five families of workplace information you'll meet on a typical job:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Safety documents</strong> — RAMS, COSHH data sheets, risk assessments,
            permits-to-work, fire muster, welfare and emergency information.
          </li>
          <li>
            <strong>Design documents</strong> — drawings (single line, schematic, layout),
            specifications, schedules, BIM models, RFI logs, technical submittals.
          </li>
          <li>
            <strong>Standards / technical</strong> — BS 7671, IET On-Site Guide, manufacturer data
            sheets and installation instructions, IET Guidance Notes.
          </li>
          <li>
            <strong>Contract / commercial</strong> — programme, snag list, variations, delay
            notices, instructions to proceed, daywork sheets.
          </li>
          <li>
            <strong>HR / personal</strong> — employment contract, JIB Working Rules where they
            apply, holiday request forms, grievance and disciplinary procedures, training records
            and apprenticeship paperwork.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Family 1 — Safety documents</ContentEyebrow>

      <ConceptBlock
        title="Converting the H&S duty into specific instructions"
        plainEnglish="Safety documents take the abstract regulatory duty (assess risk, control hazards, protect workers and the public) and turn it into specific instructions for a specific job on a specific day. RAMS and risk assessments are the headline documents. COSHH data sheets, permits-to-work, fire muster information and welfare arrangements fill in the rest."
        onSite="The safety paperwork on a well-run site is a working tool. On a badly-run site it's a paper trail nobody reads. Tell the difference within five minutes of arrival — does the supervisor brief from the RAMS, or does the supervisor say 'it's in the file somewhere'? The first is a sign of a competent contractor; the second is a problem you escalate."
      >
        <p>What sits in this family and why each item is there:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>RAMS (Risk Assessment + Method Statement)</strong> — task-specific assessment
            of hazards plus the step-by-step working method that builds in the controls. Statutory
            hook: MHSWR 1999 Reg 3.
          </li>
          <li>
            <strong>COSHH data sheets</strong> — for any hazardous substance on site (cable
            lubricant, contact cleaner, masonry sealant, brick acid). Statutory hook: COSHH 2002
            Reg 6.
          </li>
          <li>
            <strong>Permits-to-work</strong> — for higher-risk activities (hot work, confined
            space, live work). Statutory hook: EAWR 1989 Reg 14, Confined Spaces Regs 1997.
          </li>
          <li>
            <strong>Fire muster and emergency procedures</strong> — assembly point, alarm point,
            first aiders, route to nearest A&amp;E.
          </li>
          <li>
            <strong>Welfare arrangements</strong> — toilet, mess, drying area, fresh water, first
            aid kit. Statutory hook: Workplace (HSW) Regulations 1992, CDM 2015 Sch 2.
          </li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671 — Reg 132.13 (Documentation)"
        clause={
          <>
            <p>
              Paraphrased: documentation for the electrical installation shall be provided to
              allow safe operation, inspection, alteration, repair, maintenance and dismantling.
              The sub-clauses cover 132.13.1 (Diagrams — single line, schedule of circuits and
              similar) and 132.13.2 (Routine maintenance information).
            </p>
          </>
        }
        meaning={
          <>
            Reg 132.13 is the BS 7671 hook for the documentation pack that has to follow the
            installation through its life. The Electrical Installation Certificate, schedule of
            circuits, schedule of test results, single line diagram and any manufacturer data are
            all how the designer (or installer designing-as-they-go on a small job) discharges
            that duty. As an apprentice you produce parts of this pack on every job — it's the
            long tail of the work and the next operative on the install relies on it.
          </>
        }
        cite="Paraphrased — see BS 7671:2018+A4:2026 Regulation 132.13 (Diagrams and documentation)."
      />

      <RegsCallout
        source="Construction (Design and Management) Regulations 2015 — Reg 13(4)"
        clause={
          <>
            &quot;The principal contractor must ensure that — (a) a suitable site induction is
            provided; (b) the necessary steps are taken to prevent access by unauthorised persons
            to the construction site; and (c) facilities that comply with the requirements of
            Schedule 2 are provided throughout the construction phase.&quot;
          </>
        }
        meaning={
          <>
            CDM 2015 Reg 13(4) places the formal duty on the principal contractor to brief workers
            on the site information they need before any work starts. Reg 13(1) broadens this to
            planning, managing and monitoring the construction phase. Reg 15 makes it a personal
            duty on the worker to co-operate. As an apprentice arriving on a fit-out, the
            induction is the formal handover of the site-specific information that doesn&apos;t
            live in the textbook.
          </>
        }
        cite="Source: Construction (Design and Management) Regulations 2015 (SI 2015/51), Reg 13 — verbatim from legislation.gov.uk."
      />

      <InlineCheck
        id={checks2[0].id}
        question={checks2[0].question}
        options={checks2[0].options}
        correctIndex={checks2[0].correctIndex}
        explanation={checks2[0].explanation}
      />

      <SectionRule />

      <ContentEyebrow>Family 2 — Design documents</ContentEyebrow>

      <ConceptBlock
        title="From specifier's intent to installed reality"
        plainEnglish="Design documents tell you exactly what is meant to be installed, where it goes, and how it connects up. Drawings (single line, schematic, layout), specifications (the written description of what equipment and what standard), schedules (the lists — circuits, devices, accessories), BIM models on bigger jobs, and the RFI log where unanswered questions live."
        onSite="The drawings are the bridge between the M&E consultant who specified the job and you on site running the cable. Build the first-fix to a memory of the customer's words and you'll be ripping it out at second-fix or fixing it on a snag list. Read the drawings, mark them up as you go, and you've turned 'what was specified' into 'what was installed' — which the as-built drawings record at handover."
      >
        <p>The headline design documents you'll meet:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Single line diagram</strong> — the electrical 'map' of the installation,
            showing supply, main switch, distribution boards, sub-mains and final circuits at a
            high level.
          </li>
          <li>
            <strong>Schedule of circuits</strong> — a row per final circuit showing protective
            device, cable size, route, length and the load being served. Required at handover
            under Reg 132.13.
          </li>
          <li>
            <strong>Layout drawings</strong> — floor plans showing where the accessories, lighting
            points, board positions and containment runs sit.
          </li>
          <li>
            <strong>Schematics</strong> — for control circuits (lighting controls, BMS, motor
            controls). Read alongside the layout.
          </li>
          <li>
            <strong>RFI log (Request For Information)</strong> — the formal record of questions
            asked of the design team. If something isn&apos;t clear on a drawing, you raise an RFI
            rather than guess.
          </li>
          <li>
            <strong>BIM models</strong> on larger projects — a 3D model with embedded data. Used
            for clash detection between trades and for as-built records.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="The two drawings every apprentice should be able to read by month three"
        plainEnglish="A single line diagram and a schedule of circuits. The single line shows the structure of the installation — how power flows from the supply through the main switch, through the boards, out to the circuits. The schedule of circuits is the line-by-line detail — which RCBO, which cable, which load, which length."
        onSite="If you can read those two documents you can answer most 'what is fed from where' questions on site without asking. By the end of year one you should be able to mark up an as-built schedule (corrections, additions, deletions) and hand it back to the design team for incorporation into the final pack. That mark-up skill is what turns a worker into a tradesperson."
      >
        <p>Why these two before everything else:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            The schedule of circuits is what every inspector and tester reads first when they open
            the EICR — it&apos;s the index of the installation.
          </li>
          <li>
            The single line is what the next contractor to alter the install reads to understand
            the topology before disturbing anything.
          </li>
          <li>Both are required to be handed over with the EIC under BS 7671 Reg 132.13.</li>
          <li>
            Mistakes on either propagate forward — wrong cable size on the schedule means wrong
            testing, wrong diversity calculation, wrong protective device selection.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Family 3 — Standards and technical references</ContentEyebrow>

      <ConceptBlock
        title="BS 7671, the OSG, and the manufacturer data — the three you reach for"
        plainEnglish="The standards family is the technical authority you cite when challenged. BS 7671 (the IET Wiring Regulations) is the headline. The IET On-Site Guide is the practical handbook based on BS 7671. Manufacturer data sheets give you the specific instructions for specific products. Together they form the technical basis of every install you do."
        onSite="On a tidy site BS 7671 lives on the supervisor's desk and the OSG lives in your van. The mfr data is whatever the wholesaler delivered with the kit (or printed off the manufacturer's website). On a badly-run site you'll be told 'we always do it this way' — that is not an answer, and you politely point at the regulation."
      >
        <p>What each document gives you:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>BS 7671 (the Wiring Regs)</strong> — the formal standard. Cited in contracts,
            certificates and EICRs. Everybody in the trade is expected to be familiar with the
            parts that apply to their work.
          </li>
          <li>
            <strong>IET On-Site Guide (OSG)</strong> — practical, table-driven, designed for site
            use. Covers the most common installation types and gives the numbers you need (cable
            sizes, fuse ratings, diversity factors).
          </li>
          <li>
            <strong>Manufacturer data sheets</strong> — torque values, conductor capacities,
            ferrule requirements, breaking capacities, IP ratings, mounting orientations. Tied to
            BS 7671 by Reg 510.3.
          </li>
          <li>
            <strong>IET Guidance Notes (1 to 8)</strong> — the in-depth technical companions
            covering selection &amp; erection, isolation, inspection &amp; testing, protection
            against fire, surge and earthing &amp; bonding.
          </li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671 — Reg 510.3 (General — selection and erection)"
        clause={
          <>
            &quot;Every item of equipment shall be selected and erected so as to allow compliance
            with the regulations stated in this chapter and the relevant regulations in other
            parts of BS 7671 and shall take account of manufacturers&apos; instructions.&quot;
          </>
        }
        meaning={
          <>
            Reg 510.3 ties the manufacturer&apos;s instructions directly to BS 7671 compliance. If
            the data sheet specifies a torque, that torque is part of how you achieve a
            code-compliant install. Skip the data sheet and you&apos;re relying on memory and feel
            — neither of which holds up under inspection or warranty challenge. The manufacturer
            data is part of the standards family because BS 7671 itself makes it so.
          </>
        }
        cite="Source: BS 7671:2018+A2:2022 IET Wiring Regulations, Chapter 51 — Common Rules, Reg 510.3."
      />

      <InlineCheck
        id={checks2[1].id}
        question={checks2[1].question}
        options={checks2[1].options}
        correctIndex={checks2[1].correctIndex}
        explanation={checks2[1].explanation}
      />

      <SectionRule />

      <ContentEyebrow>Family 4 — Contract and commercial</ContentEyebrow>

      <ConceptBlock
        title="The paperwork that decides whether the firm gets paid"
        plainEnglish="Contract and commercial documents are how the firm manages the project from a cost-and-time perspective. Programme (the schedule), snag list (the end-of-job homework), variations (extra work outside the original scope), delay notices (formal record of programme slippage), instructions to proceed (formal go-ahead from the client). All of this lands on the QS's desk; some of it lands on yours."
        onSite="As an apprentice you don't run the commercial side, but you should know what each document does. The programme tells you the sequence and the deadline. The snag list is what the client uses to hold back final payment. Variations and delays have to be raised through the agreed channels — informal 'oh and can you do this too' conversations don't get paid for. Watch how the supervisor handles these and learn."
      >
        <p>The headline commercial documents:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Programme</strong> — the project schedule. Critical-path activities are the
            ones that can&apos;t slip without delaying the whole project. Knowing where your trade
            sits on the critical path is part of becoming a tradesperson.
          </li>
          <li>
            <strong>Snag list</strong> — defects identified at handover that need correcting
            before final payment is released. Owned by the client&apos;s representative or
            principal contractor.
          </li>
          <li>
            <strong>Variations</strong> — work outside the original contract scope, formally
            instructed and priced. The variation order is what triggers the additional payment.
          </li>
          <li>
            <strong>Delay notices</strong> — formal record that the programme has slipped, the
            cause, and (where applicable) the request for extension of time.
          </li>
          <li>
            <strong>Daywork sheets</strong> — used when work is being charged on a
            time-and-materials basis rather than against a fixed price. Signed by the client rep
            at the end of the day.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Family 5 — HR and personal</ContentEyebrow>

      <ConceptBlock
        title="The documents that define your terms, your rights and your apprenticeship"
        plainEnglish="HR documents cover your employment relationship — contract, JIB Working Rules where they apply, holiday request procedure, grievance and disciplinary procedures, training records and apprenticeship paperwork. They are how you get paid correctly, how you take time off, how you raise a concern, and how the apprenticeship is recorded for the end-point assessment."
        onSite="The HR family is the one apprentices ignore at their cost. Your contract is your terms; the JIB rules where they apply are the industry baseline; the grievance procedure is how you raise something formally. Knowing what's in each is knowing your standing in the firm. None of this is paranoid — it's basic professional practice for every trade."
      >
        <p>What sits in this family:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Employment contract</strong> — the legal basis of your job. Hours, pay,
            holiday, notice, pension, JIB reference where applicable. Read it; keep it.
          </li>
          <li>
            <strong>JIB Working Rules</strong> — the industry-standard rules for electricians in
            England and Wales. Cover grading, rates, overtime, travel time, lodging and the
            disputes procedure. Apprentices are covered by the JIB Apprentice Grading scheme.
          </li>
          <li>
            <strong>Apprenticeship paperwork</strong> — apprenticeship agreement, training plan,
            off-the-job hours log, monthly review forms (tutor + employer + you).
          </li>
          <li>
            <strong>Holiday and absence procedures</strong> — how to book time off, how to report
            sickness, what evidence is needed.
          </li>
          <li>
            <strong>Grievance and disciplinary procedures</strong> — how a concern is raised
            formally and how the firm responds. Read it before you need it.
          </li>
        </ul>
      </ConceptBlock>

      <InlineCheck
        id={checks2[2].id}
        question={checks2[2].question}
        options={checks2[2].options}
        correctIndex={checks2[2].correctIndex}
        explanation={checks2[2].explanation}
      />

      <SectionRule />

      <ContentEyebrow>The five families on one site folder</ContentEyebrow>

      <ConceptBlock
        title="What a working site folder looks like — desktop and mobile"
        plainEnglish="A working site folder pulls representatives from each of the five families into one place — physical or digital. On a domestic CU change it might be a small ring-binder. On a commercial fit-out it's an app on the foreman's tablet plus a printed RAMS in each operative's pocket. On a major project it's a full document management system with version control."
        onSite="The format doesn't matter — the coverage does. If you can't point to the RAMS, the drawings, the standards reference, the programme and the contract paperwork within a couple of minutes of arrival, the site folder isn't doing its job. The walk-round to find each family is a five-minute exercise on day one and you log gaps to your supervisor."
      >
        <div className="space-y-3">
          <p className="text-[14px] leading-relaxed">
            What good coverage looks like on each family — table for desktop, card list for mobile
            so you can scan it without horizontal scrolling.
          </p>

          {/* Desktop table */}
          <div className="hidden sm:block overflow-hidden rounded-2xl border border-white/[0.08]">
            <table className="w-full text-[13px]">
              <thead className="bg-white/[0.04] text-white/80 text-left">
                <tr>
                  <th className="px-3 py-2 font-medium">Family</th>
                  <th className="px-3 py-2 font-medium">Headline document</th>
                  <th className="px-3 py-2 font-medium">Owner</th>
                </tr>
              </thead>
              <tbody className="text-white/85">
                <tr className="border-t border-white/[0.06]">
                  <td className="px-3 py-2 font-medium">Safety</td>
                  <td className="px-3 py-2">RAMS, COSHH, permits</td>
                  <td className="px-3 py-2">PC / contractor</td>
                </tr>
                <tr className="border-t border-white/[0.06]">
                  <td className="px-3 py-2 font-medium">Design</td>
                  <td className="px-3 py-2">Drawings, schedules, RFI</td>
                  <td className="px-3 py-2">Designer / M&amp;E consultant</td>
                </tr>
                <tr className="border-t border-white/[0.06]">
                  <td className="px-3 py-2 font-medium">Standards</td>
                  <td className="px-3 py-2">BS 7671, OSG, mfr data</td>
                  <td className="px-3 py-2">Trade reference</td>
                </tr>
                <tr className="border-t border-white/[0.06]">
                  <td className="px-3 py-2 font-medium">Contract</td>
                  <td className="px-3 py-2">Programme, snag list, variations</td>
                  <td className="px-3 py-2">QS / project manager</td>
                </tr>
                <tr className="border-t border-white/[0.06]">
                  <td className="px-3 py-2 font-medium">HR</td>
                  <td className="px-3 py-2">Contract, JIB rules, apprenticeship paperwork</td>
                  <td className="px-3 py-2">Your employer</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Mobile card list */}
          <div className="sm:hidden space-y-2">
            {[
              { family: 'Safety', doc: 'RAMS, COSHH, permits', owner: 'PC / contractor' },
              {
                family: 'Design',
                doc: 'Drawings, schedules, RFI',
                owner: 'Designer / M&E consultant',
              },
              { family: 'Standards', doc: 'BS 7671, OSG, mfr data', owner: 'Trade reference' },
              {
                family: 'Contract',
                doc: 'Programme, snag list, variations',
                owner: 'QS / project manager',
              },
              {
                family: 'HR',
                doc: 'Contract, JIB rules, apprenticeship paperwork',
                owner: 'Your employer',
              },
            ].map((row) => (
              <div
                key={row.family}
                className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-3"
              >
                <div className="text-[10px] uppercase tracking-[0.18em] text-elec-yellow/80">
                  {row.family}
                </div>
                <div className="mt-1 text-[13px] font-semibold text-white">{row.doc}</div>
                <div className="mt-0.5 text-[12px] text-white/60">Owner: {row.owner}</div>
              </div>
            ))}
          </div>
        </div>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Leaving the site folder back at the office"
        whatHappens={
          <>
            Apprentice and second-year arrive on a domestic CU change. The supervisor has the site
            folder back at the office — &quot;I&apos;ll email it to you later&quot;. They start
            work without the RAMS, without the drawings, without the manufacturer data for the new
            board. Halfway through, a question comes up about the bonding arrangement and
            there&apos;s no schedule of circuits to refer to. They guess. Two months later the
            EICR observation flags a non-compliance and the firm has to go back to fix it on its
            own time.
          </>
        }
        doInstead={
          <>
            The site folder is a permanent part of the install record, not a courtesy handout.
            Make sure it&apos;s with the team that&apos;s actually doing the work from the moment
            work starts. Digital site folders (an app on a tablet) work fine provided every
            operative has access. If the folder isn&apos;t there, the work doesn&apos;t start
            &mdash; you raise it in writing to the supervisor and wait. BS 7671 Reg 132.13 and CDM
            2015 Reg 13 both require the information to be available at the workface, not in a
            drawer somewhere.
          </>
        }
      />

      <Scenario
        title="First day on a commercial DB upgrade — what should be in the site folder?"
        situation={
          <>
            You arrive at a small commercial DB upgrade &mdash; replacing a legacy distribution
            board in a single-tenant office unit. The supervisor hands you a clear-pocket folder
            containing the programme, a single-line diagram and the customer&apos;s purchase
            order. That&apos;s it. The work involves chasing for new sub-main containment,
            hot-works to fit a new gland plate, COSHH-relevant chemicals (contact cleaner, masonry
            sealant) and live working to make the final changeover.
          </>
        }
        whatToDo={
          <>
            Stop and list the missing information before any tool comes out. The folder should
            contain at minimum: RAMS for each task (chasing, hot-works, live changeover), a risk
            assessment that reflects this site (occupied office, public in the corridor, evening
            switch-over), COSHH data sheets for the contact cleaner and the masonry sealant, the
            schedule of existing circuits and a copy of the last EICR for the install, drawings
            beyond the single line (layout, schematic, schedule of new circuits), the manufacturer
            data for the new board and devices, a hot-works permit, BS 7671 / OSG for reference,
            and a reference back to the construction phase plan if this falls under CDM. Raise the
            gaps in writing to the supervisor and ask for them to be addressed before work starts.
            The supervisor will sometimes try to wave it off &mdash; politely don&apos;t. The
            request is itself evidence under HASAWA s.7 that you took reasonable steps.
          </>
        }
        whyItMatters={
          <>
            A thin folder is the single most common signal that a contractor is cutting corners.
            The work will probably get done &mdash; but the safety case is weak, the BS 7671
            documentation duty under Reg 132.13 won&apos;t be properly discharged, and any
            incident becomes a problem that traces straight back to the missing information. The
            five minutes spent listing the gaps and asking for them is what separates a competent
            apprentice from one who will be in front of an HSE inspector five years from now
            wondering how it ended up there.
          </>
        }
      />

      <SectionRule />

      <FAQ items={faqs2} />

      <SectionRule />

      <KeyTakeaways
        points={[
          'Workplace information splits into five families — safety, design, standards, contract / commercial and HR. Each has a different purpose, a different owner, and a different consequence when missing.',
          'Safety documents (RAMS, COSHH, risk assessments, permits, fire muster, welfare info) convert the H&S duty into specific instructions for specific work on a specific day. MHSWR 1999 Reg 3 is the statutory hook.',
          "Design documents (drawings, specs, schedules, schematics, RFI logs, BIM models) are the bridge between the specifier's intent and the installed reality. The schedule of circuits and single-line diagram are required at handover under BS 7671 Reg 132.13.",
          'Standards / technical references (BS 7671, IET OSG, manufacturer data, IET Guidance Notes) are the technical authority you cite when challenged. Reg 510.3 ties manufacturer instructions to BS 7671 compliance.',
          'Contract / commercial documents (programme, snag list, variations, delay notices, daywork sheets) are how the firm gets paid and how it manages risk. Apprentices watch and learn the commercial side from year one.',
          'HR documents (contract, JIB Working Rules, holiday and grievance procedures, apprenticeship paperwork) define your rights and obligations. Read them before you need them, not after.',
          'BS 7671 Reg 132.13 places the formal duty on the designer to provide installation information for safe operation, inspection and maintenance. CDM 2015 Reg 13 is the parallel duty on the principal contractor on notifiable construction sites.',
          'Missing information gets escalated in writing — text, email, app comment — not ignored. The escalation is itself evidence under HASAWA s.7 that you took reasonable steps before the work started.',
        ]}
      />

      <Quiz
        title="Purpose of workplace information — knowledge check"
        questions={quizQuestions2}
      />

      {/* ── Prev / next nav ─────────────────────────────────── */}
    </div>
  );
}
