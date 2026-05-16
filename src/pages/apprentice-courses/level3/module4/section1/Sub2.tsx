/**
 * Module 4 · Section 1 · Subsection 2 — H&S framework, risk assessment and permits
 * Maps to C&G 2365-03 / Unit 303 / LO1 / AC 1.2
 *   AC 1.2 — "identify the Health and Safety requirements relevant to diagnosing and correcting electrical faults"
 *
 * Layered depth: 2357 Unit 608 ELTK07 / AC 1.4 — H&S requirements when
 * diagnosing and correcting electrical faults (risk assessments, permits to
 * work, method statements, safe use of tools, measuring instruments, PPE,
 * reporting unsafe situations) AND AC 3.6 — special precautions (lone working,
 * hazardous areas, fibre-optic, ESD, electronic devices, IT, HF/capacitive,
 * batteries).
 *
 * Frame: the documented H&S framework around fault diagnosis — risk
 * assessment, method statement (RAMS), permit-to-work, JIB safe-isolation
 * procedure, PPE selection, lone-working controls, special-environment
 * precautions.
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
  VideoCard,
} from '@/components/study-centre/learning';
import { videos } from '@/data/study-centre/video-library';
import useSEO from '@/hooks/useSEO';

const TITLE =
  'H&S framework, RAMS and permits (1.2) | Level 3 Module 4.1.2 | Elec-Mate';
const DESCRIPTION =
  'The full documented H&S framework around fault diagnosis — risk assessment, method statement, permit-to-work, JIB safe isolation, PPE matrix, lone-working controls, hazardous-area precautions and ESD discipline for electronics work.';

const checks = [
  {
    id: 'mod4-s1-sub2-rams',
    question:
      "You arrive at a commercial site to investigate a fault on a 400 V three-phase distribution board. The site manager hands you a generic 'electrical works' RAMS from six months ago. Is that adequate?",
    options: [
      "Yes — RAMS is RAMS.",
      "No. RAMS must be task-specific and current. A generic 'electrical works' document doesn't capture this fault, this DB, this circuit, this customer's environment, or the unknowns of an investigation. The L3 expectation is a fault-specific addendum to the RAMS that captures (a) the reported symptom, (b) the suspected cause and your diagnostic approach, (c) the live-vs-dead working decision under EAWR Reg 14, (d) the specific instruments you'll use and how they meet GS38, (e) emergency contacts. Without that, the firm's RAMS doesn't meet HSWA Section 2 / 3 duties for THIS task.",
      "Only if it's signed.",
      "Only if it's laminated.",
    ],
    correctIndex: 1,
    explanation:
      "Generic RAMS are a paperwork pretence. The Management of Health and Safety at Work Regulations 1999 (MHSWR) Reg 3 makes the risk assessment 'suitable and sufficient' for the work being done — and a fault you haven't yet seen can't be properly assessed by a document written for last year's job. The standard practice is a generic firm-wide RAMS plus a task addendum at the start of every diagnosis visit. Most CCS / SMAS / NICEIC audits will check for this.",
  },
  {
    id: 'mod4-s1-sub2-pte',
    question:
      "What's the BARE MINIMUM PPE for a 230 V single-phase fault diagnosis at a domestic consumer unit, and what extras are added when the supply is 400 V three-phase commercial?",
    options: [
      "Same kit for both.",
      "Domestic 230 V 1-phase: safety glasses (Class 1, BS EN 166 1F), insulated gloves rated 1000 V AC (Class 0 to BS EN 60903), insulated tools (1000 V AC marked, IEC 60900), arc-rated long-sleeve top, sturdy work boots (no metal toecap exposure where metalwork is bonded). Add for 400 V 3-phase commercial: arc-flash rated face shield (Class 1 minimum, ATPV ≥ 8 cal/cm²), arc-flash rated outer layer, FR-treated trousers, voltage-rated overgloves with leather protectors. The arc energy on a 3-phase 400 V DB is an order of magnitude higher than a single-phase domestic CU.",
      "Just gloves.",
      "Just glasses.",
    ],
    correctIndex: 1,
    explanation:
      "PPE selection is risk-based — the higher the prospective short-circuit current and the higher the system voltage, the more arc-rated PPE you need. A typical UK domestic supply has a PSCC of 6 kA at the cut-out (limited by service fuse and supply impedance); a commercial 3-phase supply with a 100 A LV fuse can hit 16–25 kA. The arc energy released in a fault scales with the square of the current, which is why the PPE matrix scales steeply. NFPA 70E and HSE GS38 / GS6 (overhead lines) frame the L3-relevant PPE choices.",
  },
  {
    id: 'mod4-s1-sub2-lone',
    question:
      "You're sent solo to diagnose a fault on a remote unmanned site (water treatment kiosk, no signal, no other workers). What lone-working controls should be in place under HSE INDG73?",
    options: [
      "Just go.",
      "Documented lone-working procedure with: (1) explicit risk assessment for lone working — including identifying tasks that should NEVER be done alone (anything live, anything in confined space, anything at height with no rescue); (2) check-in/check-out schedule with the office (typically every 30–60 minutes); (3) man-down alarm (a Reliance Protect, Skyguard or Solo Protect device with GPS + fall detection + amber alert); (4) defined escalation if a check-in is missed; (5) signal coverage check before starting and an alternative comms route if signal is poor.",
      "Tell your mate.",
      "Take a kettle.",
    ],
    correctIndex: 1,
    explanation:
      "HSE INDG73 'Working alone — health and safety guidance on the risks of lone working' sets the framework. Most fault diagnosis on commercial / industrial sites involves some degree of lone working and the firm has to have controls in place. The man-down alarm is increasingly the standard — Reliance Protect Mini, Skyguard Mysos, Solo Protect Identicom — typically £15–25 per month per device with monitored response. Cheap insurance against the apprentice who collapses in a kiosk and isn't found for hours.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "What does RAMS stand for and what's the difference between the two documents in fault diagnosis context?",
    options: [
      "Just paperwork.",
      "Risk Assessment + Method Statement. Risk Assessment identifies the hazards (what could go wrong), assesses the likelihood and severity, and lists the controls that reduce risk to ALARP. Method Statement describes the sequence of work — how the job will actually be done step by step. For fault diagnosis, the RA covers the unknown-state hazards (parallel paths, induced voltage, supply-side faults) and the MS describes the test sequence (test, isolate, lock-off, prove dead, measure). Both are required by MHSWR 1999 Reg 3, both must be 'suitable and sufficient', and both should be reviewed at the start of every visit and updated as the diagnosis progresses.",
      "Just for big jobs.",
      "Just NICEIC paperwork.",
    ],
    correctAnswer: 1,
    explanation:
      "RAMS is the operational backbone of a competent firm. The RA is the analysis (what could hurt me?), the MS is the plan (how will I do it safely?). For fault diagnosis the RA is necessarily provisional — you don't yet know the fault — so the MS often includes 'decision points' where the apprentice stops and re-assesses based on what they've measured. The CDM 2015 Regulations Reg 8 expects principal contractors to ensure RAMS exist and are followed; the firm's own H&S policy will repeat the duty.",
  },
  {
    id: 2,
    question:
      "The JIB safe isolation procedure has six steps. What are they in order, and what instrument is used at each step?",
    options: [
      "Just turn it off.",
      "(1) Identify circuit (label, drawings, customer info — hypothesis only). (2) Isolate (operate the breaker / switch — confirm it's the right one). (3) Lock-off (apply a personal padlock + tag with your name + date). (4) Prove the tester on a known live source (Martindale GVD2 proving unit OR a known live socket nearby) — voltage tester only. (5) Test the circuit at the work point (between L–N, L–E, N–E) — voltage tester only. (6) Re-prove the tester on the same known live source. Multimeters do NOT prove dead. Socket testers do NOT prove dead. Only a GS38 voltage tester does.",
      "Three steps.",
      "Four steps.",
    ],
    correctAnswer: 1,
    explanation:
      "The six-step JIB procedure is the industry-standard sequence and it's tested on every L3 practical exam. The 'prove the tester before AND after' step is the one apprentices skip and the one that actually catches a faulty tester. If the tester reads zero on a circuit you've isolated, you don't know whether the circuit is dead OR the tester is broken — until you re-prove it on the known live source. That re-prove step is what makes the procedure robust.",
  },
  {
    id: 3,
    question:
      "When is a permit-to-work formally required for fault diagnosis, and what does the permit document?",
    options: [
      "Never.",
      "Required for any high-risk task that needs documented authorisation — typically: live working above 50 V AC, work in hazardous areas (zoned ATEX environments), work on supply-side equipment, work that affects safety-critical systems (fire alarm, emergency lighting under test), work in confined spaces, hot work in close proximity to electrical equipment. The permit documents — task scope, authorised persons, date/time window, isolation steps already taken, residual hazards, PPE required, emergency response. Issued by an authorised manager, signed back at the end. Common on commercial / industrial sites; rare on domestic.",
      "Only on building sites.",
      "Only when the customer asks.",
    ],
    correctAnswer: 1,
    explanation:
      "Permit-to-work systems are formal H&S controls that go beyond RAMS for higher-risk tasks. Most domestic fault diagnosis doesn't need a formal permit (the RAMS is enough), but commercial / industrial fault work usually does. Permits are typically site-specific (each premises has its own permit form) and the apprentice's role is to read it, follow it, and sign back at the end. Working outside the scope of the permit (e.g. extending the work beyond the listed isolation) breaches the permit and triggers the firm's incident reporting.",
  },
  {
    id: 4,
    question:
      "A fault investigation requires you to work on a live electronic control panel (a BMS controller — building management system). What ESD (electrostatic discharge) precautions apply?",
    options: [
      "None — it's only static.",
      "Static discharge from the human body can reach 15 kV — well above the 5–100 V damage threshold of CMOS electronics. Standard ESD discipline: (1) wrist strap connected to the panel earth via a 1 MΩ resistor; (2) anti-static mat under the work area where possible; (3) handle PCBs by the edges, not by the components; (4) keep replacement boards in their anti-static bags until the moment of fitting; (5) avoid working in dry conditions where static builds up rapidly; (6) ground yourself on the chassis before touching any board. Failed boards from ESD damage often work intermittently — they fail months later — so ESD-induced faults are notoriously hard to trace to root cause.",
      "Wear leather gloves.",
      "Wear cotton.",
    ],
    correctAnswer: 1,
    explanation:
      "ESD discipline is taught at L3 because that's where apprentices first encounter electronic control work — BMS, fire alarm panels, EV charger controllers, modern emergency lighting central battery systems, AFDDs with electronic detection. The £400 controller you've replaced 'might' work after you handled it without ESD precautions, but you've shortened its life and you've created a return-visit waiting to happen. The wrist strap costs £4 and lives in the toolbox; the failed board costs £400 and half a day's labour to replace.",
  },
  {
    id: 5,
    question:
      "On a fault investigation in an ATEX-zoned area (e.g. a paint spray booth, a fuel station forecourt, a petrochemical site), what additional electrical-safety precautions apply?",
    options: [
      "Same as anywhere else.",
      "ATEX zones (Zone 0 / 1 / 2 for gas, Zone 20 / 21 / 22 for dust) require all equipment in the zone — including test instruments — to be ATEX-rated for the zone. Standard kit: intrinsically-safe two-pole tester (Martindale VI-15800 or Megger DET14C with Ex marking), no mobile phones in zone, no battery tools without Ex rating, no smoking, no metal tools that could spark on contact with steel. The fault diagnosis approach is — bring everything to a non-zoned area where possible, isolate at the boundary, only work in-zone with intrinsically-safe instruments and a hot-work permit.",
      "Just ventilate.",
      "Just wait.",
    ],
    correctAnswer: 1,
    explanation:
      "DSEAR (Dangerous Substances and Explosive Atmospheres Regulations 2002) governs work in ATEX environments and treats every electrical instrument as a potential ignition source. The 'intrinsically safe' rating means the instrument's internal energy levels are below the minimum ignition energy for the zone gases. Most apprentices won't work in ATEX zones until they're at improver level, but L3 syllabus includes the awareness — knowing the zone classification on a site briefing tells you immediately whether your normal kit is allowed in.",
  },
  {
    id: 6,
    question:
      "You're investigating a fault that requires you to work in close proximity to a battery bank in a UPS room (typical 240 V DC, 100 Ah lead-acid stack). What precautions apply specifically to battery-related hazards?",
    options: [
      "Same as anywhere.",
      "Battery hazards are different from AC hazards: (1) DC shock — once your hand is on a DC busbar, your muscles can't release because there's no zero-crossing — DC at 60 V upward is treated as a let-go hazard; (2) hydrogen gas — lead-acid cells gas during charge, hydrogen accumulates in poorly-ventilated rooms, explosive at 4% LEL — battery rooms have forced ventilation for this reason; (3) electrolyte — sulphuric acid contact with skin / eyes — face shield, acid-resistant gloves, eye-wash station; (4) thermal runaway — a damaged or shorted cell can catch fire, with toxic fumes; (5) short-circuit current — a 100 Ah lead-acid string can deliver 5–10 kA short-circuit, enough to weld a spanner.",
      "Wait for them to discharge.",
      "Just wear gloves.",
    ],
    correctAnswer: 1,
    explanation:
      "Battery rooms get their own H&S regime because the hazards are so different from AC fault work. EAWR still applies (a battery is a 'system' under Reg 4) but the practical precautions are unique. Most L3 apprentices won't work on a battery bank solo — it's improver / Approved Electrician territory — but the L3 syllabus includes battery-room awareness because emergency lighting central battery systems and UPS installations are increasingly common in commercial sites and the apprentice will find themselves working near them.",
  },
  {
    id: 7,
    question:
      "A senior electrician tells you 'don't bother with the gloves on a 230 V domestic fault — the risk is low'. Is that defensible under EAWR Reg 14?",
    options: [
      "Yes — they're senior.",
      "No. EAWR Reg 14(c) requires 'suitable precautions including where necessary the provision of suitable protective equipment'. The risk being 'low' doesn't dispense with the precaution — it informs which precaution. For 230 V live work, Class 0 insulated gloves (rated 1000 V AC) plus insulated tools are the standard precaution. The senior is exposing both themselves and the firm to liability under EAWR (failure to take suitable precautions) and HSWA Section 7 (employee duty to take reasonable care of own and others' safety). The apprentice's defence: 'I followed the firm's PPE matrix' — so make sure there IS one and it specifies gloves for live work.",
      "Only on commercial.",
      "Only above 1 kV.",
    ],
    correctAnswer: 1,
    explanation:
      "Senior pressure to skip PPE is a classic apprentice trap. The right move is to wear the PPE you've been trained to wear and let your training, not the senior's pressure, drive your behaviour. If the senior is consistently bypassing PPE, that's a SAFETY-CONCERN report under the firm's H&S policy — usually reported to the H&S manager, not the line supervisor (who may be the same person bypassing PPE). The HSE has prosecuted firms where the supervisor's bad-example conduct was found to have contributed to an apprentice's injury.",
  },
  {
    id: 8,
    question:
      "When you arrive at a fault job, what are the first three documents you should look for / produce before any electrical work?",
    options: [
      "None — just start.",
      "(1) The site / customer's existing risk-assessment and method statement — what the principal contractor has identified as on-site hazards. (2) Your firm's task RAMS — the document specific to fault diagnosis at this premises, which you may need to produce or update on arrival. (3) A permit-to-work or equivalent authorisation — for commercial / industrial sites only, signed by the authorised manager, defining what you're allowed to do. Without these three you don't have a defensible position if something goes wrong, and the customer's safety policy will record you as an unauthorised worker.",
      "Just the invoice.",
      "Just the part number.",
    ],
    correctAnswer: 1,
    explanation:
      "The 'first three' are the paperwork backbone of every fault visit. On a domestic call-out the customer doesn't have a formal RA or permit, so the firm's task RAMS is the only document — but it must exist. On a commercial site, the principal contractor / facilities manager will have a system you slot into. CDM 2015 Reg 13 puts the duty on the principal contractor to ensure subcontractors integrate with the site safety plan; CDM Reg 15 puts the duty on the contractor to do the planning. Both are explicit in HSE prosecutions where corner-cutting on paperwork led to harm.",
  },
];

const faqs = [
  {
    question: "How long should a fault diagnosis RAMS be?",
    answer:
      "Long enough to capture the actual hazards and controls, short enough that the apprentice will read it on arrival. For domestic fault work, a one-page RAMS template with tick-boxes and free-text decision points works well. For commercial work, two to three pages — including the supply-side risk assessment, the live-working justification under EAWR Reg 14, and the named competent person on site. RAMS that are thirty pages of generic boilerplate get ignored, and ignored RAMS provide zero protection in a prosecution.",
  },
  {
    question: "What's the difference between an EAWR Reg 14 risk assessment and a generic MHSWR Reg 3 risk assessment?",
    answer:
      "MHSWR Reg 3 is the umbrella duty — every employer must do a 'suitable and sufficient' risk assessment of all work activities. EAWR Reg 14 is specific to live electrical work — three conjoint tests (unreasonable to be dead, reasonable to be live, suitable precautions). The Reg 14 assessment lives INSIDE the Reg 3 assessment for fault diagnosis work. In practice the firm's RAMS template will have a dedicated 'EAWR Reg 14 — live working justification' section that's filled in only when live work is actually proposed.",
  },
  {
    question: "Do I need to wear arc-rated PPE on a domestic 230 V CU change?",
    answer:
      "Modern best practice — yes for the parts of the work that involve live conductors at the busbar (e.g. live tightening of incomer terminals, live testing of newly-fitted RCBOs). The arc energy on a UK domestic supply is lower than commercial but not zero — a phase-to-earth fault at the cut-out can release 1–3 cal/cm² depending on the loop impedance. An arc-rated long-sleeve top (HRC 1, ATPV 4 cal/cm² minimum) plus a face shield rated for arc-flash gives you the protection at low cost. The Wera HiQ insulated kit + an Oberon AFW or NSA arc-flash kit is the kind of midmarket spec L3 apprentices land on.",
  },
  {
    question: "What's the MOST OFTEN-CITED reason in HSE prosecution reports for electrician fatalities on diagnosis work?",
    answer:
      "Failure to prove dead at the work point. The pattern is consistent — operative isolated 'a' breaker, didn't prove dead at the work point with a separate two-pole tester, started work, contacted a live conductor, fatal shock. The breaker label was wrong, or the circuit had a borrowed neutral, or the isolation lifted while they were working. Every L3 apprentice hears this — and yet the same root cause repeats every year. The discipline of test-isolate-lock-prove-test-prove is what saves you, every time, no exceptions.",
  },
  {
    question: "Can I do fault diagnosis on my own as an L3 apprentice?",
    answer:
      "Depends on the work. EAWR Reg 16 says you can only do work where you have the necessary technical knowledge and experience — OR where you're under appropriate supervision. As an L3 apprentice you can do simple dead-circuit fault diagnosis (cut the supply, find the broken cable, repair it, retest) under remote supervision (your supervisor's a phone call away, you check in with progress, you escalate decisions you're not sure about). You should NOT do live fault diagnosis solo, you should NOT do supply-side investigations solo, you should NOT do anything in an ATEX zone solo. The firm's policy and your training plan will define your scope of work explicitly.",
  },
  {
    question: "How do I report an unsafe situation I find on a customer's installation while I'm there for something unrelated?",
    answer:
      "Three steps. (1) Make the situation safe immediately if you can do so without exceeding your competence — e.g. de-energise an exposed conductor, isolate a damaged accessory, attach a 'do not use' label. (2) Inform the customer in writing — usually a 'dangerous situation report' or DSR form the firm provides — describing the hazard, your action, and the recommended remedial work. (3) Inform your supervisor and the firm's H&S manager so the issue is logged. If the customer refuses to act on a serious hazard, the firm has a duty to consider whether to inform the local authority or the HSE (Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013 — RIDDOR — and the duty under HSWA s.6 to notify dangerous defects).",
  },
];

export default function Sub2() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module4-section1')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 1
          </button>

          <PageHero
            eyebrow="Module 4 · Section 1 · Subsection 2"
            title="H&S framework, RAMS and permits"
            description="The full documented H&S framework that surrounds fault diagnosis — risk assessment, method statement, permit-to-work, JIB safe isolation procedure, the PPE matrix, lone-working controls under INDG73, hazardous-area precautions under DSEAR, and ESD discipline for electronic control work."
            tone="emerald"
          />

          <TLDR
            points={[
              "Fault diagnosis needs a task-specific RAMS — generic firm-wide documents don't satisfy MHSWR Reg 3 'suitable and sufficient' for an investigation whose outcome you don't yet know.",
              "JIB safe isolation is six steps: identify, isolate, lock-off, prove tester on known live, test circuit, re-prove tester. The before/after prove is the one apprentices skip and the one that catches a faulty tester.",
              "PPE scales with prospective short-circuit current — Class 0 1000 V gloves and insulated tools for domestic, arc-rated face shield + outer layer for commercial 3-phase.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Identify the documents that make up a fault diagnosis H&S file — risk assessment, method statement, permit-to-work, isolation certificate.",
              "Specify the six steps of the JIB safe isolation procedure and the GS38 instrument used at each step.",
              "Match PPE selection to system voltage and prospective short-circuit current — domestic 230 V, commercial 400 V 3-phase, supply-side, ATEX.",
              "State the lone-working controls expected under HSE INDG73 — risk assessment, check-in schedule, man-down alarm, defined escalation.",
              "Apply ESD discipline (wrist strap, anti-static mat, edge handling) when working on electronic control panels and BMS equipment.",
              "Recognise the additional hazards of battery rooms (DC shock, hydrogen, electrolyte, short-circuit current) and ATEX zones (intrinsic safety, hot-work permit).",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The paperwork that makes the work safe</ContentEyebrow>

          <ConceptBlock
            title="RAMS — risk assessment + method statement"
            plainEnglish="RAMS is the documented thinking that proves the firm has considered the hazards before the apprentice steps onto site. The risk assessment lists what could go wrong and what controls reduce the risk. The method statement describes the work step by step. Both are required by MHSWR 1999 Reg 3 to be 'suitable and sufficient'."
            onSite="A generic 'electrical works' RAMS from six months ago doesn't satisfy the duty for today's fault diagnosis. The expected practice is a generic firm-wide RAMS plus a task-specific addendum at the start of every visit, with decision points where the apprentice stops and re-assesses based on what they've measured."
          >
            <p>
              A fault-diagnosis RAMS typically covers:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Reported symptom</strong> — what the customer says is wrong, in their words.</li>
              <li><strong>Suspected hazards</strong> — parallel paths, induced voltage, supply-side issues, stored energy, compromised CPC.</li>
              <li><strong>Live-working justification under EAWR Reg 14</strong> — three conjoint tests evidenced. If live work is being done, the assessment is signed off by the firm's competent person.</li>
              <li><strong>Instruments to be used</strong> — listed by make / model with calibration date and GS38 compliance noted.</li>
              <li><strong>PPE matrix</strong> — what\'s worn for what part of the work.</li>
              <li><strong>Emergency response</strong> — first aider on site, nearest A&E, defibrillator location, stop-work trigger.</li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The JIB safe isolation procedure</ContentEyebrow>

          <ConceptBlock
            title="Six steps, in order, every time, no shortcuts"
            onSite="The JIB six-step is the industry standard and it\'s tested on every L3 practical exam. The \'prove the tester before AND after' is the step apprentices skip and the step that actually catches a faulty tester — if the tester reads zero on the circuit you\'ve isolated, you don\'t yet know whether the circuit is dead or the tester is broken until you re-prove it on the known live source."
          >
            <p>
              The six steps:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>1. Identify the circuit</strong> — using the schedule, the labels, the customer\'s information. This is your hypothesis only.</li>
              <li><strong>2. Isolate</strong> — operate the breaker, switch, fuse-link or isolator. Confirm visually that the device is in the OFF position.</li>
              <li><strong>3. Lock-off</strong> — apply a personal padlock with a tag bearing your name and the date. Use a multi-lock hasp if multiple operatives are working on the same circuit.</li>
              <li><strong>4. Prove the tester</strong> on a known live source (Martindale GVD2 proving unit, or a known live socket on a different circuit). Confirm full lamp + LED + audible indication.</li>
              <li><strong>5. Test the circuit at the work point</strong> — between L–N, L–E and N–E. All three must read zero on the GS38 two-pole tester.</li>
              <li><strong>6. Re-prove the tester</strong> on the same known live source. This catches a tester that has failed during the test.</li>
            </ul>
            <p>
              Multimeters do NOT prove dead. Socket testers do NOT prove dead. Neon screwdrivers do NOT prove dead. Only a GS38-compliant voltage tester does.
            </p>
          </ConceptBlock>

          <VideoCard
            url={videos.safeIsolation.url}
            title={videos.safeIsolation.title}
            channel={videos.safeIsolation.channel}
            duration={videos.safeIsolation.duration}
            topic={videos.safeIsolation.topic}
          />

          <RegsCallout
            source="HSE Guidance Note GS38 (4th ed) — Electrical test equipment for use on low voltage systems"
            clause={
              <>
                "Probes should be designed and constructed to give the user adequate protection from injury. They should have finger barriers, be insulated to leave an exposed metal tip not exceeding 4&nbsp;mm and (for proving dead) the test instrument should preferably be of low impedance."
              </>
            }
            meaning={
              <>
                Two requirements packed in. First &mdash; physical probe design: finger barriers (the moulded shroud at the back of the probe shaft), exposed tip no more than 4&nbsp;mm. Second &mdash; instrument characteristic: low impedance for proving dead. A multimeter has neither (long uninsulated tips, high impedance) which is why it doesn\'t satisfy GS38 for live or proving-dead work.
              </>
            }
            cite="Source: HSE GS38 (4th ed) — Electrical test equipment for use by electricians, available from the HSE website."
          />

          <SectionRule />

          <ContentEyebrow>The PPE matrix</ContentEyebrow>

          <ConceptBlock
            title="PPE scales with system voltage and prospective short-circuit current"
            plainEnglish="The arc energy released in an electrical fault scales with the square of the prospective short-circuit current. A 230 V domestic CU fault releases roughly 1–3 cal/cm². A 400 V commercial 3-phase DB fault can release 8–25 cal/cm². The PPE you wear has to match the energy, not just the voltage."
          >
            <p>
              The standard PPE matrix for fault diagnosis:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Always</strong> — safety glasses (BS EN 166 1F), arc-rated long-sleeve top (HRC 1, ATPV ≥ 4 cal/cm²), sturdy work boots (no exposed metal toecap), Class 0 insulated gloves (1000 V AC, BS EN 60903) when touching live conductors.</li>
              <li><strong>Domestic 230 V single-phase</strong> — base layer plus insulated tools (1000 V AC, IEC 60900) for any live work. Arc-flash face shield optional but recommended for CU work.</li>
              <li><strong>Commercial 400 V three-phase</strong> — base layer PLUS arc-flash rated face shield (Class 1 minimum, ATPV ≥ 8 cal/cm²), arc-rated outer layer, FR-treated trousers, voltage-rated overgloves with leather protectors.</li>
              <li><strong>Supply-side / &gt;250 V to earth / fault current &gt;10 kA</strong> — arc-flash suit, balaclava, full PPE matrix per the site arc-flash study.</li>
              <li><strong>ATEX zoned area</strong> — non-conductive footwear, anti-static clothing, intrinsically-safe instruments, no mobile phones in zone.</li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Lone working — INDG73 controls</ContentEyebrow>

          <ConceptBlock
            title="Most fault diagnosis is some form of lone working"
            onSite="The L3 apprentice who\'s sent solo to a remote unmanned site — water treatment kiosk, telecoms cabinet, lift motor room, broiler shed — needs the same protective framework as the apprentice on a busy commercial site. HSE INDG73 sets the bar. The firm without a documented lone-working procedure is the firm whose insurance won\'t cover the missing apprentice."
          >
            <p>
              Standard lone-working controls:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Risk assessment</strong> — explicit identification of tasks that should NEVER be done alone (anything live above 50 V AC, anything in confined space, anything at height with no rescue plan).</li>
              <li><strong>Check-in schedule</strong> — typically every 30–60 minutes to a named contact at the office, with defined escalation if a check-in is missed.</li>
              <li><strong>Man-down alarm</strong> — Reliance Protect Mini, Skyguard Mysos, Solo Protect Identicom — GPS + fall detection + amber alert + monitored response. £15–25 per month.</li>
              <li><strong>Signal coverage check</strong> — confirmed before starting; alternative comms route (satellite messenger, hard-wired phone) where signal is poor.</li>
              <li><strong>Pre-arranged response</strong> — if check-in is missed, the office calls the operative, then the operative\'s emergency contact, then site security / police as appropriate.</li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Special precautions — electronics, IT, batteries, hazardous areas</ContentEyebrow>

          <ConceptBlock
            title="Where the L3 apprentice meets the next layer of hazards"
            plainEnglish="Beyond the standard shock and arc hazards, fault diagnosis at L3 brings the apprentice into contact with environments and equipment that need their own precautions — electronic control panels (ESD), IT equipment (graceful shutdown), battery banks (DC + chemical hazards), ATEX zones (ignition risk), hot-work areas (fire risk)."
          >
            <p>
              The five \'special environment' categories on the 2357 syllabus:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>ESD-sensitive electronics</strong> — wrist strap, anti-static mat, edge handling, anti-static bag storage. CMOS damage threshold is 5–100 V; static from a human can be 15 kV.</li>
              <li><strong>IT equipment</strong> — graceful shutdown via the OS or the UPS, never a hard power-off (data corruption, RAID degradation). Coordinate with the customer's IT contact before you isolate any rack-feeding circuit.</li>
              <li><strong>Battery banks</strong> — DC let-go hazard, hydrogen, electrolyte, thermal runaway, high short-circuit current. Battery rooms have forced ventilation, eye-wash, acid spill kits, insulated tools.</li>
              <li><strong>ATEX zones</strong> — intrinsically-safe instruments only, no mobile phones, hot-work permit required for any sparking activity, anti-static footwear and clothing.</li>
              <li><strong>HF or capacitive circuits</strong> — induction heaters, RF welders, high-power transmitters. Standby fields can couple to your body; capacitor banks store lethal charge. Manufacturer\'s manual for the specific equipment is the only reliable source.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 537.2.4"
            clause={
              <>
                "Devices for isolation shall be selected and/or installed so as to prevent unwanted or unintentional closure (see Regulation 462.3). This may be achieved by locating the device in a lockable space or lockable enclosure or by padlocking or by other suitable means."
              </>
            }
            meaning={
              <>
                Isolation isn&apos;t isolation until it can&apos;t be re-energised by accident. The Regulation puts the lock-off requirement directly into BS 7671 &mdash; a padlock through the breaker hasp, a lockable cabinet, or a captive-key system. A circuit you&apos;ve switched off but somebody can switch back on while your hand is in the back-box does not satisfy 537.2.4.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Reg 537.2.4, verbatim."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 641.4"
            clause={
              <>
                "Precautions shall be taken to avoid danger to persons and livestock, and to avoid damage to property and installed equipment, during inspection and testing."
              </>
            }
            meaning={
              <>
                Reg 641.4 is the catch-all that frames every fault-diagnosis precaution you take &mdash; PPE, instrument selection, lone-working controls, ESD discipline, customer-equipment shutdown. The duty is to avoid danger AND to avoid damage; that&apos;s why the L3 expectation is to think through both layers before you start, not just the shock risk to yourself.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Reg 641.4, verbatim."
          />

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Skipping the second \'prove the tester' step"
            whatHappens={
              <>
                Apprentice does the JIB procedure correctly through step 5 &mdash; tester proved on
                the proving unit, circuit shows zero. They start work without re-proving the
                tester (step 6). Halfway through the job a battery cell in the Martindale fails
                and the tester now reads zero on EVERYTHING &mdash; live or dead. The apprentice
                returns to the cut-out, tests another circuit they think is dead, the tester says
                zero (it\'s broken), they put their hand on a live busbar and take a 230&nbsp;V
                shock. The procedure had a working tester at step 4 but a broken one at the moment
                that mattered. Step 6 would have caught it.
              </>
            }
            doInstead={
              <>
                Always re-prove the tester at the end of the test sequence. Every single time. The
                Martindale GVD2 + VI-13800 combo is designed for this &mdash; one click of the
                proving unit gives you both lamps, the LED chain and the audible. If the tester
                fails to re-prove, you know your earlier 'dead' reading might have been a tester
                fault, and you re-test from the top with a known good instrument.
              </>
            }
          />

          <CommonMistake
            title="Working alone on a high-risk task because 'the customer\'s right there\'"
            whatHappens={
              <>
                Apprentice is sent solo to a domestic call-out. Customer says they\'re going to
                stay in the house while the work happens, so the apprentice doesn\'t follow the
                lone-working procedure (no check-in, no man-down alarm). Customer goes upstairs to
                make a phone call. Apprentice takes a shock from a borrowed neutral they didn\'t
                expect, drops to the floor unconscious. Customer doesn\'t realise for 20 minutes.
                CPR-window missed, brain damage. The lone-working procedure would have triggered
                an office check-in at 30 minutes; the man-down alarm would have triggered at the
                fall.
              </>
            }
            doInstead={
              <>
                Treat \'customer present' as a bystander, not a safety control. Bystanders aren't
                trained, can\'t help, and may not even notice an incident in time. The lone-working
                procedure assumes you are functionally alone &mdash; check-ins, man-down,
                escalation &mdash; even when there\'s another human on site. The HSE doesn\'t accept
                'the customer was there' as a substitute for documented lone-working controls.
              </>
            }
          />

          <Scenario
            title="Solo call-out to a remote pumping station"
            situation={
              <>
                You\'re an L3 apprentice. The firm dispatches you solo to a Severn Trent pumping
                station to investigate why the duty pump keeps tripping. Site is unmanned. Mobile
                signal is one bar. The site H&amp;S file is in a kiosk at the gate.
              </>
            }
            whatToDo={
              <>
                Before any work. (1) Read the site H&amp;S file &mdash; check for ATEX zoning,
                permit-to-work requirements, isolation procedures, emergency contacts. (2) Check
                in with the office; confirm 60-minute check-in schedule for the duration. (3)
                Activate the man-down alarm (Reliance Protect / Skyguard) and confirm it can
                signal out from this location. (4) Confirm the assistant pump is running (so the
                site has redundancy while you investigate). (5) Read the site RAMS for fault
                diagnosis on rotating plant. THEN start the diagnosis &mdash; isolate the duty
                pump, lock-off, prove dead, investigate. If the H&amp;S file is missing or out of
                date, the pumping station has standing orders or you call the operations centre.
                You do not start work without the H&amp;S framework in place.
              </>
            }
            whyItMatters={
              <>
                Severn Trent (and other utilities) have killed lone workers on similar sites in
                the past decade. The HSE prosecutions consistently find the same root causes
                &mdash; missing or out-of-date RAMS, no lone-working procedure, no check-in
                schedule, no man-down alarm, operative pressed on without the framework. The
                framework is what keeps you alive when something goes wrong &mdash; and on a
                pumping station, &quot;something&quot; can be a methane release, a slip into
                standing water, a high-voltage motor, or a confined-space entry that hadn\'t been
                planned.
              </>
            }
          />

          <SectionRule />

          <ContentEyebrow>Calibration and instrument records</ContentEyebrow>

          <ConceptBlock
            title="Calibrated, in-date, traceable — the three things every test instrument must be"
            plainEnglish="Every MFT, two-pole tester, clamp meter and earth tester used in fault diagnosis has to be calibrated annually (typically) by an accredited lab and the calibration certificate kept on file. NICEIC, NAPIT, ELECSA and NICEIC Approved Contractor schemes all audit calibration records during the annual surveillance visit."
            onSite="L3 apprentices: don't use an instrument that's out of calibration. The Megger MFT1741+ and Kewtech KT64+ both store calibration date in firmware and warn on power-up if expired. The Martindale GVD2 proving unit needs annual battery check (not full calibration) but the calibration discipline still applies. Lost calibration sticker = instrument out of service until re-calibrated by a UKAS-accredited lab (Megger Instruments, Test Equipment Solutions, or the manufacturer's service centre)."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Calibration interval</strong> — 12 months from issue date for MFTs and earth testers; 12 months for clamp meters; battery test only for proving units (no full calibration needed).</li>
              <li><strong>Field check</strong> — do a daily calibration check before the first job: prove the two-pole tester on the proving unit (or known live socket); verify the multimeter against a 9 V battery (should read 9.0 ± 0.2); check MFT loop reading against a known reference (e.g. a previously-tested socket with a recorded Zs).</li>
              <li><strong>Damage check</strong> — visual inspection of leads (no nicks, no exposed copper), probes (GS38 finger guards intact, 4 mm exposed tip), case (no cracks). Damaged kit out of service immediately.</li>
              <li><strong>Calibration record</strong> — keep certificates with the instrument or in the firm's calibration register. UKAS-accredited certificate has a unique reference; auditors check it traces to a national standard.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Fire and emergency response on site</ContentEyebrow>

          <ConceptBlock
            title="What to do when a fault investigation triggers a fire or shock incident"
            plainEnglish="Most fault investigations finish without incident. The ones that don't can escalate fast — an arc-flash that ignites cable insulation, a shock that triggers cardiac arrhythmia, a tool-bridge that vapourises a busbar. The L3 apprentice needs the standard emergency response in muscle memory: isolate, alert, treat, document."
            onSite="The first 60 seconds after an incident decide the outcome. Knowing where the main switch is, where the nearest fire extinguisher is (CO2 only for electrical fires — never water, never foam), where the first-aid kit is, where the defibrillator is (most commercial sites have one — check the site induction), and how to call the emergency services from a poor-signal site is part of the pre-work briefing on every job."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Electrical shock</strong> — DO NOT touch the casualty until supply is isolated. Switch off main switch / pull the cut-out fuse-link. THEN start CPR if no pulse / no breathing. Defibrillator (AED) within 4 minutes is the best chance of survival from an electrical-induced VF.</li>
              <li><strong>Electrical fire</strong> — CO2 extinguisher (BS EN 3-7 black band) ONLY for live electrical equipment. Water and foam conduct electricity back to you. Once isolated, water can be used.</li>
              <li><strong>Arc-flash burn</strong> — cool with running water for at least 20 minutes, cover with cling-film (not creams or ointments), call 999 — arc burns are deeper than they appear and need hospital assessment.</li>
              <li><strong>Reporting</strong> — RIDDOR 2013 requires reportable injuries (over-7-day absence, specified injuries, dangerous occurrences) to be notified to HSE within 10 days via the online F2508 form.</li>
              <li><strong>Witness statement</strong> — write your account of the incident as soon as you can — what you were doing, what happened, what you did next, who else was present. Memory degrades within hours; the contemporaneous note is your defence.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Fatigue, drugs and fitness for work</ContentEyebrow>

          <ConceptBlock
            title="HSWA Section 7 — your personal duty to be fit for the work"
            plainEnglish="Fatigue, alcohol, prescription medication, recreational drugs, illness — all reduce reaction time, judgement and physical coordination. HSWA Section 7 puts a personal duty on every employee to take reasonable care of their own and others' safety, which includes turning up fit for work. Most firms have a drug-and-alcohol policy that mandates testing on incident."
            onSite="Fault diagnosis is precision work. A tired apprentice misreads a meter; an apprentice on opioid pain medication slows on a hot-work decision; an apprentice with flu loses concentration during a six-step isolation. The competence test in EAWR Reg 16 includes being mentally and physically capable of the task — fitness for work is part of competence."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Fatigue</strong> — the standard JIB working time directive cap is 48 hours/week with 11 hours rest between shifts. Sustained 60+ hour weeks degrade performance to the equivalent of mild intoxication.</li>
              <li><strong>Alcohol</strong> — most firms run zero-tolerance for any detectable alcohol on shift (breathalyser test on incident). Even 12 hours after the night before, residual alcohol can affect coordination.</li>
              <li><strong>Prescription medication</strong> — opioids, benzodiazepines, antihistamines, some antihypertensives all carry "do not operate machinery" warnings. Inform the supervisor; switch to office work or supervised low-risk tasks until medication ends.</li>
              <li><strong>Acute illness</strong> — fever, vomiting, diarrhoea — go home. Don't gut it out on a fault job. A misread meter on a flu day costs more than a sick day.</li>
              <li><strong>Mental health</strong> — bereavement, financial stress, relationship breakdown all impair concentration. Most firms have an EAP (Employee Assistance Programme) — use it. Mates in Mind and the Lighthouse Construction Industry Charity offer free 24/7 support.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "RAMS is the documented thinking that proves the firm has considered hazards before work starts. Generic RAMS don't satisfy MHSWR Reg 3 'suitable and sufficient' for a fault investigation whose outcome you don't yet know.",
              "JIB safe isolation is six steps in order: identify, isolate, lock-off, prove tester on known live, test circuit, re-prove tester. The before/after prove is the one apprentices skip and the one that catches a faulty tester.",
              "PPE scales with system voltage and prospective short-circuit current. Class 0 1000 V gloves and IEC 60900 insulated tools are the baseline; arc-flash kit is added for commercial 3-phase and supply-side work.",
              "Permits-to-work are formal H&S controls for higher-risk tasks. They document scope, authorised persons, isolation steps, residual hazards, PPE, and emergency response. Common on commercial sites; rare on domestic.",
              "Lone working under HSE INDG73 needs a documented procedure: risk assessment, check-in schedule, man-down alarm, defined escalation. 'The customer was there' is not a substitute.",
              "ESD discipline (wrist strap, anti-static mat, edge handling) is mandatory when working on electronic control panels and BMS equipment. CMOS damage threshold is 5–100 V; human static can hit 15 kV.",
              "Battery rooms have unique hazards (DC shock, hydrogen, electrolyte, thermal runaway, high short-circuit current). Specific PPE, ventilation and tools required.",
              "ATEX zones (gas Zone 0/1/2, dust Zone 20/21/22) require intrinsically-safe instruments and a hot-work permit. DSEAR 2002 governs.",
            ]}
          />

          <Quiz title="H&S framework, RAMS and permits — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module4-section1-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                1.1 Dangers of electricity
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module4-section1-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                1.3 Safe isolation procedure
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
