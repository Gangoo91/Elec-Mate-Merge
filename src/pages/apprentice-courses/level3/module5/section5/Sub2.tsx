/**
 * Module 5 · Section 5 · Subsection 2 — EICR coding rubric: C1, C2, C3, FI
 * Maps to C&G 2365-03 / Unit 304 / LO5 / AC 5.2 — "specify the codes used to
 *   classify the urgency of remedial action on a periodic inspection report"
 *
 * Layered depth: 2357 Unit 607 ELTK06 / AC 4.x (periodic reporting); 2366-03
 * Unit 302 / AC 4.x (recording and reporting periodic inspection results).
 *
 * The L3 lift on EICR coding — beyond memorising the four letters into the
 * defensible reasoning behind each call. Best Practice Guide 4 (Electrical
 * Safety First) is the industry consensus document. Get the coding wrong on
 * a rented dwelling and either (a) you over-call C2 and the landlord pays
 * for unnecessary remedial work, or (b) you under-call C1 and someone gets
 * hurt and you end up in front of HSE explaining yourself.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight } from 'lucide-react';

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

const TITLE = 'EICR coding — C1, C2, C3, FI | Level 3 Module 5.5.2 | Elec-Mate';
const DESCRIPTION =
  "The defensible coding framework for EICR observations — C1 immediate danger, C2 potentially dangerous, C3 improvement recommended, FI further investigation. Best Practice Guide 4 calls, GN3 verbatim, and the worked examples that turn theory into a sound report.";

const checks = [
  {
    id: 'm5-s5-sub2-c1-test',
    question: 'You lift a socket front and find a basic-insulated line conductor exposed where the outer sheath has been stripped back too far inside the box, with the cable strain relief failing. Touchable on opening. The correct code is:',
    options: [
      'Three pillars: thorough preparation (you have revised effectively), positive evidence (gateway sign-off, completed qualifications, strong portfolio), and practice (successful mock assessments and rehearsals that prove you can perform under assessment conditions)',
      'BS 7671 Regulation 712.522 requires that DC cables within a building that cannot be isolated from the PV array in a fire are either fire-resistant (to BS 8434/BS 8519) or enclosed in fire-resistant conduit, because they will remain energised as long as daylight is present',
      'Typical materials markup is 15-30% on top of cost — covers the time sourcing, collecting, returning, managing stock, dealing with wholesaler accounts, and wastage. Higher markup on stocked items you carry in van inventory; potentially lower markup on large special orders where you don\\\\\\\\\\\\\\\'t add much value.',
      'C1 — danger present, action required immediately. A live conductor accessible to touch under reasonably foreseeable conditions (servicing, maintenance, casual access by an untrained occupant lifting a loose plate) is the textbook BPG4 C1 trigger.',
    ],
    correctIndex: 3,
    explanation:
      "BPG4 (Best Practice Guide 4 — Electrical Safety First) defines C1 as danger present, risk of injury, immediate remedial action required. Exposed live parts that a person could touch under reasonably foreseeable conditions sit squarely in C1. \"Reasonably foreseeable\" includes the next time anyone removes the accessory front — so don't argue \"the front was on, no one would touch it\". The right action on site is to make safe immediately (isolate the circuit, advise the duty holder, secure the location) before leaving — that obligation flows from EAWR Reg 4 plus your continuing duty as the inspector who found the danger.",
  },
  {
    id: 's5-sub2-c2-test',
    question: 'A 30-year-old TN-S installation has no RCD protection on a downstairs ring final circuit feeding general-purpose sockets in habitable rooms. Bonding, ADS, Zs, IR all measure within limits. Coding under BPG4:',
    options: [
      'Solar PV, wind turbines, battery storage, EV chargers, heat pumps, micro-CHP, and demand-side response — all connected at distribution level and managed by the DSO as part of a flexible, integrated energy system',
      'C2 — potentially dangerous, urgent action required. The installation works as designed but lacks a safety layer that current BS 7671 (Reg 411.3.3) requires for socket-outlets up to 32 A intended for use by ordinary persons. Risk crystallises on an actual fault — potential, not imminent.',
      'Training managers to recognise signs of presenteeism, promoting flexible working, reviewing workload management, enhancing EAP promotion, and creating a culture where taking time off for mental health is supported',
      'A heat pump struggles in a poorly-insulated house with undersized radiators — it’s designed to deliver lots of low-temperature heat, not a little high-temperature heat. The realistic CoP will be poor (closer to 2 than 3), the running costs will surprise the customer, and the property may need insulation upgrades and rad-replacement first. Be honest before quoting.',
    ],
    correctIndex: 1,
    explanation:
      "BPG4 places \"absence of RCD on socket-outlet circuits intended for use by ordinary persons\" as a typical C2. Logic: the installation is not currently dangerous (ADS works, no live parts exposed) but a single fault — a damaged flex on a kettle, a child poking a paperclip into a socket, a worn appliance — that would have been caught by an RCD will not be. The risk is real and foreseeable, not theoretical. Important: there is no \"grandfather\" rule for safety. Pre-existing installations are coded against current BS 7671 risk assessment, not the standard at the time of installation. The Visual Inspection notes section can record the original install date for context but does not soften the code.",
  },
  {
    id: 's5-sub2-fi-test',
    question: 'On a commercial EICR you read a Zs of 1.85 Ω at the furthest point of a 32 A B-curve circuit. Your maximum permitted Zs (Table 41.3) for B32 is 1.37 Ω at 80 percent. The supply temperature correction does not bring it within limits. The reading was taken with the test instrument only — no second confirmatory test method. Best code:',
    options: [
      "Noticing that a normally confident apprentice is standing with hunched shoulders, avoiding eye contact, and speaking quietly — and recognising these non-verbal cues may indicate they are struggling or anxious, then gently checking in with them",
      "FI — further investigation needed. The reading is over the permitted maximum but you have one method only and a single reading. Confirm with R1+R2 plus Ze, retest with a fresh battery and lead-resistance check, and if the high reading is confirmed then reclassify as C2 (or C1 if dangerous combination present).",
      "MFT — annually (Megger UK Service ~£100 per unit, UKAS-traceable). Two-pole tester — every 24 months (Martindale ~£40). Multimeter — annually (Fluke ~£80–150). Clamp meter — annually. Proving unit — annually with the two-pole. Track in a calibration register; replace stickers on receipt back from the lab. NICEIC / NAPIT audits will check.",
      "Charge-hand is a senior trade lead — typically an experienced Approved Electrician who runs a small gang of electricians and apprentices on a specific area of the work, reporting up to the Foreman. On a larger job there can be several Charge-hands under one Foreman, each leading a wing or a floor.",
    ],
    correctIndex: 1,
    explanation:
      "FI (Further Investigation) under BPG4 covers situations where the inspector cannot reach a confident classification with the evidence on hand. A single high Zs reading might be a measurement artefact (high-resistance probe contact, depleted battery, lead resistance not zeroed) or a real defect. The right call is to flag FI, return with calibrated kit and a confirmatory method (R1+R2+Ze cross-check), and then code definitively. Issuing a C2 without confirmation invites the duty holder to spend money fixing a phantom problem; ignoring the high reading invites a real disconnection failure. FI is the honest call when you're unsure — under-using FI to avoid a return visit is a quality failure.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'BPG4 (Best Practice Guide 4 — Electrical Safety First) is:',
    options: [
      "Could result in serious injury to, or loss of, human life. This is the headline mandatory case — life-safety circuits, medical premises, fire alarm and detection systems. SPD protection shall be provided regardless of installation type or location.",
      "An industry consensus document published by Electrical Safety First giving worked examples and recommended classifications for EICR observations — non-statutory but widely accepted by scheme providers, insurers, and HSE as the industry standard for consistent coding.",
      "HSE acknowledges receipt and may follow up — desktop review, request for further information, site visit, inspection. Whether HSE attends depends on the severity of the incident and the wider context (e.g. recurrence, sector trends, public interest). For specified injuries and fatalities a follow-up visit is normally expected.",
      "Toolbox talks are short pre-shift safety briefings on a single topic — the RAMS for the day, a recent near-miss, a seasonal hazard. They keep the formal RAMS active in the day-to-day work. Recorded with attendance. Together with the RAMS sign-on they form the daily safety briefing chain.",
    ],
    correctAnswer: 1,
    explanation:
      "BPG4 sits alongside GN3 as one of the two go-to references for coding. It is non-statutory but functions as the industry's coding rubric — schemes such as NICEIC and NAPIT reference it, insurers cite it in claims, HSE consider it in investigations. Following BPG4 won't guarantee you've coded correctly in every edge case, but departing from it without good reason is hard to defend.",
  },
  {
    id: 2,
    question: "C1 — \"Danger present\" — translates to which on-site action by the inspector?",
    options: [
      "Type 2 SPD at the consumer unit, supply-side of the main switch where possible, with 6 mm² copper PE to MET (Reg 534.4.10(a)), 2.5 mm² live connections (Reg 534.4.10(c)), conductor lengths under 0.5 m total (Reg 534.4.8), dedicated 25 A or 32 A MCB for SPD overcurrent protection, BS EN 61643 product standard.",
      "That no person shall be engaged in any work activity where technical knowledge or experience is necessary to prevent danger unless they possess such knowledge or experience, or are under appropriate supervision",
      "Make safe before leaving — typically isolate the circuit, lock off, label, and brief the duty holder verbally and in writing. The continuing duty under EAWR Reg 4 attaches to you as the person who identified the danger; leaving a known C1 unmitigated is potentially a criminal breach.",
      "Add specific details about what was learned, how it felt to overcome challenging concepts, analyse why RCD selection was previously a weakness, and create a concrete action plan with measurable steps",
    ],
    correctAnswer: 2,
    explanation:
      "BPG4 is explicit: a C1 finding is not just a paperwork code — it triggers an immediate-action obligation. Make safe before leaving site (isolation, lock-off, labelling), brief the duty holder, document what you did, and follow up in writing. Failure to make safe a known C1 leaves you exposed under EAWR Reg 4 (system in safe condition) plus your professional and contractual duties. Schemes can suspend registration for inspectors who walk away from a C1 without action.",
  },
  {
    id: 3,
    question: 'A two-way switching arrangement is wired with the strapper conductors used as live and switched-live conductors but with the cores incorrectly identified — the brown is in the switched live position and the black is in the line position throughout. No insulation damage, terminals tight, ADS within limits. The coding is:',
    options: [
      'Start with "What do you observe?" then "What could cause that?" then "How could you test each possibility?" then "What would you expect to find if your theory is correct?"',
      'Each test depends on the previous (continuity of CPC must be proven before IR can be interpreted; earthing must be proven before live tests rely on it; functional last because it confirms the whole system works)',
      'Contractors must provide workers with appropriate directions, instructions and information, and consult them in good time on health and safety matters',
      'C2 — incorrect identification is potentially dangerous because the next person to work on the circuit may be misled into believing a conductor is dead when it is live.',
    ],
    correctAnswer: 3,
    explanation:
      "BPG4 lists incorrect conductor identification as typical C2. The circuit works fine as installed and there is no immediate danger — but a future maintenance electrician relying on standard colour coding could be exposed to live parts they reasonably expected to be dead. Risk is potential, foreseeable, and rooted in the next person's safety. C2 with a clear remedial action — re-identify the conductors with sleeving or replace the cable.",
  },
  {
    id: 4,
    question: 'During the inspection you note that the consumer unit is a metal-clad unit installed in 2017 with all RCBOs, located under wooden stairs, fully accessible and labelled correctly. No defects in operation. The coding for "consumer unit accessible to ordinary persons under wooden stairs" is:',
    options: [
      'No code — a metal consumer unit installed after the 2016 amendment satisfies the current requirement on enclosure non-combustibility, and accessibility under the stairs is not in itself a coded defect provided escape is not impeded.',
      'Documented procedures for detecting, classifying, containing, investigating, and recovering from cybersecurity incidents in the OT environment, coordinated with operations and safety teams',
      'A pre-use check is a quick visual assessment before each use; a formal inspection is a detailed, documented inspection by a competent person at specified intervals',
      'Basic periodic inspection as part of the fixed installation inspection programme (BS 7671), with repair or replacement when a fault is reported — a run-to-failure approach is acceptable because the consequences of failure are low',
    ],
    correctAnswer: 0,
    explanation:
      "The 2016 amendment to BS 7671 (Reg 421.1.201) required consumer units in domestic premises to have a non-combustible enclosure or be enclosed in a non-combustible cabinet — driven by a series of CU fires identified by the LFB. A metal CU installed in 2017 meets that requirement. \"Located under stairs\" is a common siting that is not in itself a defect; the relevant question is whether a fire in the CU would compromise escape, and a metal-enclosed unit specifically addresses that risk. No code unless other findings exist (poor labelling, accessibility blocked by stored items, escape route compromised by the construction beyond the CU).",
  },
  {
    id: 5,
    question: 'The EICR template you are using offers the inspector a choice between coding the overall installation as "Satisfactory" or "Unsatisfactory". Under BPG4 the report MUST be marked Unsatisfactory if:',
    options: [
      "The inspector, based on installation type, environment, intensity of use, and the GN3 frequency table — recorded as the inspector\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"reasonable and informed decision\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\" with the rationale documented.",
      "One or more C1 OR one or more C2 OR one or more FI is recorded. C3-only reports remain Satisfactory because C3 covers improvements that do not affect the overall safety status.",
      "The Electricity at Work Regulations 1989, COSHH 2002, PUWER 1998, and the CDM Regulations 2015 may all be relevant depending on the work",
      "When construction work is scheduled to last longer than 30 working days with more than 20 workers on site simultaneously, or exceed 500 person-days",
    ],
    correctAnswer: 1,
    explanation:
      'BPG4 and GN3 align: any C1, any C2, or any FI triggers an "Unsatisfactory" overall classification. C3-only reports remain Satisfactory — because C3 is "improvement recommended" not "remedy required". This matters legally (the Private Rented Sector Regs treat Unsatisfactory as a trigger for the landlord to act within 28 days), commercially (insurers ask), and procedurally (the duty holder cannot be expected to commission remedial works for items that are not flagged as requiring action).',
  },
  {
    id: 6,
    question: 'Under A4:2026, Reg 421.1.7 introduces an arc fault detection device (AFDD) recommendation for certain circuits. A pre-A4 installation without AFDDs on those circuits would be coded:',
    options: [
      "Whenever they design, supply or commission an article (including a control panel, a bespoke distribution board, a prefabricated assembly) for use at work — they must ensure it is safe and without risks to health when properly used, and supply adequate information about safe use, installation and dismantling. So a contractor designing a one-off control panel for a commercial customer is captured by s.6 as well as by EAWR.",
      "Professional Indemnity (PI) — covers the firm against claims arising from errors, omissions or negligent advice in their professional capacity (design, specification, recommendation). PL covers physical damage / injury from the contractor's activities; PI covers economic loss caused by bad advice or design. Increasingly relevant as installers move into design-and-build, EV charging design, solar PV design and prosumer's installations under BS 7671 Part 8.",
      "C3 — improvement recommended. Reg 421.1.7 uses the language of recommendation, not requirement, for the relevant categories. The absence of an AFDD on an existing circuit is not in itself a defect requiring urgent action — but it is an improvement that brings the installation closer to current best practice. Higher-Risk Residential Buildings under the Building Safety Act 2022 are a separate matter where AFDDs may be a hard requirement.",
      "It means the local LV cable, transformer or upstream HV network can’t safely accept the additional export without reinforcement (typically a transformer upgrade or cable replacement). The customer either pays for the reinforcement (often £10,000+), accepts an export-limited install (the inverter is throttled to a lower export rating), or chooses not to proceed.",
    ],
    correctAnswer: 2,
    explanation:
      'Reg 421.1.7 in A4:2026 recommends AFDDs in certain locations. The verb is recommend, not shall. BPG4 logic: where current BS 7671 recommends but does not require, the absence on an existing installation maps to C3 (improvement recommended). Higher-Risk Residential Buildings (HRRBs) introduced via the Building Safety Act 2022 may carry a stronger requirement — read the building-specific scope before relying on the C3 default for an HRRB.',
  },
  {
    id: 7,
    question: "An inspection identifies that the main protective bonding conductor to the gas service has been disconnected at the gas meter clamp end. Visual inspection only — no testing yet undertaken. Best initial action:",
    options: [
      "Because they extract a much larger quantity of heat from a renewable source (the outside air or ground) than the electricity input would deliver if used for direct resistive heating — typically 3:1, so they massively reduce the carbon footprint of heating.",
      "On commercial sites, the permit names the circuit / equipment to be worked on, the precautions required (which include safe isolation per the JIB procedure), the time window, the worker and the responsible person — the JIB procedure is the practical execution of the permit&rsquo;s isolation requirement.",
      "Multiple sources accepted by CPS schemes: scheme-organised events (NICEIC Connect, NAPIT events, ELECSA training), accredited training providers (JTL, NET, IET Academy, Elec-Mate), trade events (ECA Live, Electric Vehicles Show), online platforms (IET Academy, scheme portals), manufacturer training (sometimes counts), reading and self-study (some schemes accept evidence). Keep a CPD log with date, topic, time, source.",
      "Make safe by reinstating the bonding connection if competent and equipped to do so, then test continuity, then code based on the as-found evidence — typically C2 (potentially dangerous, urgent action) for absent main protective bonding to an extraneous-conductive-part. Document the as-found state and the corrective action.",
    ],
    correctAnswer: 3,
    explanation:
      "Two duties apply here. First, the inspection duty — record the as-found state, code accordingly. Second, the EAWR Reg 4 duty as the person now aware of a danger — make safe if competent. Best practice on a missing bonding connection: photograph the as-found state, reinstate the connection if competent (it is a routine task within the scope of any electrician), test continuity, then code the as-found state on the EICR with a note that the defect was made safe at inspection. C2 reflects the as-found risk; the corrective action note reassures the duty holder the danger is no longer live but the defect is real and points to a wider problem (who removed it, why, and is the rest of the bonding intact).",
  },
  {
    id: 8,
    question: "On a TN-C-S (PNB) supply you measure a Zs of 0.34 Ω at the DB on a B32 circuit. Table 41.3 gives a maximum permitted Zs for B32 of 1.37 Ω (corrected, A4:2026). The disconnection requirement under Reg 411.3.2.2 is satisfied with significant headroom. The coding action is:",
    options: [
      "No code — Zs comfortably under the maximum permitted value, disconnection time will be met. Record the value and pass.",
      "Ultraviolet radiation, infrared radiation, molten metal splash and the thermal energy of the arc",
      "Yes, every worker has the right to refuse to work on a scaffold they believe to be unsafe",
      "Identify patterns, triggers, and the effectiveness of their coping strategies over time",
    ],
    correctAnswer: 0,
    explanation:
      "A low Zs is good. The Zs maximum is the worst-case value the protective device needs to disconnect within the required time. A Zs of 0.34 Ω on a B32 with a 1.37 Ω maximum is healthy. No code action — record the measurement on the Schedule of Test Results, mark the circuit as compliant, move on. Inspectors sometimes flag low values as suspicious — usually a confusion with the loop measurement on TN-C-S where the PEN provides a low-impedance return. As long as the test was conducted correctly and the reading is consistent across the circuit, low Zs is what you want.",
  },
];

const faqs = [
  {
    question: 'Where in the regulations is the EICR coding system defined?',
    answer:
      'BS 7671 itself does not define the C1/C2/C3/FI codes — Part 6 mandates that a periodic report identify defects and indicate urgency, but the specific coding rubric comes from the model EICR form in Appendix 6 plus IET Guidance Note 3 and Best Practice Guide 4 (Electrical Safety First). GN3 reproduces the codes and gives general guidance; BPG4 is the worked-example reference that gives consistency across the industry. Treat the trio (BS 7671 Part 6 + GN3 + BPG4) as the coding authority.',
  },
  {
    question: "What's the difference between C1 and C2 in plain terms?",
    answer:
      'C1 = danger is present right now. Touch the wrong thing today, get hurt today. C2 = danger could materialise on a single foreseeable fault. The installation is currently working safely but a fault that should have been protected against will not be. The mental test: if I leave the installation exactly as I found it for another year, will the duty holder or an occupant be exposed to live parts (C1) or to an unprotected fault scenario (C2)? Both trigger Unsatisfactory; only C1 triggers the make-safe-before-leaving duty.',
  },
  {
    question: 'When should I use FI rather than just coding?',
    answer:
      "FI (Further Investigation) is the honest answer when you cannot reach a confident code with the evidence available — the test gave an inconsistent reading you couldn't reconcile, the suspected defect requires invasive investigation that is outside the agreed EICR scope, the equipment is unfamiliar and you don't want to mis-diagnose. FI is not a default for \"I'm not sure\". It's a planned next step that the duty holder commissions before the report can be closed out. Over-use of FI signals an inspector dodging decisions; under-use signals an inspector guessing at codes they can't justify.",
  },
  {
    question: 'Does a C3 trigger an Unsatisfactory overall report?',
    answer:
      'No. C3 is "improvement recommended" — better than current state but the installation is safe to remain in service without remediation. A report with only C3 observations is Satisfactory overall. Any C1, any C2, or any FI tips the report to Unsatisfactory. This is critical for the Private Rented Sector Regulations — Unsatisfactory triggers a 28-day landlord remediation duty. Mis-coding a C3 as C2 imposes unnecessary cost on the landlord; mis-coding a C2 as C3 leaves a real risk unaddressed and an Unsatisfactory report incorrectly marked Satisfactory.',
  },
  {
    question: 'How do I code an installation that complies with an older edition of BS 7671 but not the current one?',
    answer:
      "There is no grandfather rule for safety. Code against current risk, not against the standard at the time of installation. An installation built to the 16th Edition with no RCD on socket circuits is coded against current standards — typically C2 for absence of RCD on socket-outlets used by ordinary persons. The Visual Inspection notes can record the install age and original-edition compliance for context, but the code reflects current risk. The Observations section is where you explain the reasoning so the duty holder understands the recommendation.",
  },
  {
    question: 'What if I disagree with another inspector\'s coding on the same installation?',
    answer:
      'Coding is judgement-based within the BPG4 framework — disagreements happen. The right approach: examine the as-found evidence, apply BPG4 logic openly, document your reasoning in the Observations section. If the previous inspector coded a defect C3 and you read it as C2, your fresh report stands on its own evidence — you are not bound by the previous coding. Significant disagreements (one inspector says C1, another says No code) usually indicate a quality issue with one of the inspections; check measurements, take photos, and if necessary escalate to scheme provider technical helpline. Do not silently downgrade a previous C1/C2 unless your re-test evidence positively justifies it — that risks looking like a cover-up.',
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
            onClick={() => navigate('/study-centre/apprentice/level3-module5-section5')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 5
          </button>

          <PageHero
            eyebrow="Module 5 · Section 5 · Subsection 2"
            title="EICR coding — C1, C2, C3, FI"
            description="The defensible coding rubric per BPG4 and GN3. Get the call right and the report does its job; get it wrong and you either over-charge a landlord or leave a real danger in service."
            tone="emerald"
          />

          <TLDR
            points={[
              "C1 — Danger present, action required immediately. Make safe before leaving site. Triggers Unsatisfactory overall.",
              "C2 — Potentially dangerous, urgent remedial action needed. Single foreseeable fault scenario. Triggers Unsatisfactory.",
              "C3 — Improvement recommended. Installation is safe to remain in service. Does not trigger Unsatisfactory.",
              "FI — Further Investigation needed. Inspector cannot reach a confident classification with evidence on hand. Triggers Unsatisfactory pending investigation.",
              "Best Practice Guide 4 (Electrical Safety First) is the industry consensus document for consistent coding decisions.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Cite the four EICR classification codes — C1, C2, C3, FI — and the on-site action each triggers.",
              "Apply BPG4 (Best Practice Guide 4) logic to allocate codes for common defects encountered on periodic inspection.",
              "Distinguish C2 (potentially dangerous, urgent) from C3 (improvement recommended) using the foreseeable-fault test.",
              "Use FI appropriately — as a planned next step, not a default for uncertainty.",
              "Identify which findings tip an EICR overall classification to Unsatisfactory.",
              "Explain the inspector's continuing EAWR Reg 4 duty when a C1 is identified, including the make-safe obligation.",
              "Recognise A4:2026 changes that affect coding judgement — Reg 643.7.3 (single AC RCD test), Reg 421.1.7 (AFDD recommendation), Table 41.3 updated maximum Zs values.",
            ]}
            initialVisibleCount={4}
          />

          <ContentEyebrow>The four codes in detail</ContentEyebrow>

          <ConceptBlock
            title="C1 — Danger present, action required immediately"
            plainEnglish="C1 means the danger is here, now, today. Anyone interacting with the installation in the way it is currently being used could be hurt. The classic example is exposed live parts that a person could touch under reasonably foreseeable conditions."
            onSite="If you find a C1, you don't just code it — you make safe before you leave. Isolate, lock off, label, brief the duty holder. The EAWR Reg 4 duty attaches to you the moment you identify the danger. Walking away from a known C1 is potentially a criminal act."
          >
            <p>
              BPG4 typical C1 examples — these come up regularly on periodic inspections of older
              domestic and small commercial installations:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Accessible live parts.</strong> Damaged accessory front exposing terminals,
                broken socket faceplate with conductors visible, missing blanking plate on a CU
                with live busbars exposed, broken light pendant with live conductors hanging.
              </li>
              <li>
                <strong>Conductive part energised due to a fault.</strong> Class I metallic
                enclosure measuring mains voltage to earth — a downstream insulation fault has
                energised the casing because CPC is missing or open-circuit.
              </li>
              <li>
                <strong>Incorrect polarity at incoming supply.</strong> Reversed line and neutral
                at the cut-out or meter — switching opens the neutral, leaving the installation
                live with no obvious indication. A real installer-induced danger that periodic
                inspections occasionally catch.
              </li>
              <li>
                <strong>Earthing arrangement absent or completely ineffective.</strong> Earthing
                conductor disconnected at the MET, or main earth missing entirely. ADS cannot
                operate; touch voltage hazard on any first fault.
              </li>
              <li>
                <strong>Overheating evidence with damaged insulation.</strong> Burnt CU bus chamber
                with melted insulation around live busbars — cannot leave that in service.
              </li>
            </ul>
            <p>
              The on-site action sequence for C1 — isolate the affected circuit (or the whole
              installation if the defect is on the supply side), lock off, label, photograph the
              defect, brief the duty holder verbally and confirm in writing the same day, document
              the make-safe action on the EICR. A C1 finding combined with no make-safe action
              leaves you exposed under EAWR Reg 4 even if the duty holder later refuses
              remediation — your duty is to make safe what you find dangerous, not just to record
              it.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="IET Guidance Note 3 (9th Ed:2022, A4) — EICR observation classification codes"
            clause="One of the following codes, as appropriate, shall be allocated to each observation made in Section K to indicate the degree of urgency for remedial action: C1, C2, C3, or FI. These classification codes are used to indicate risk levels that affect the overall assessment of the report and to inform the person(s) responsible for the installation."
            meaning={
              <>
                GN3 is explicit that every observation gets one code — not none, not multiple.
                The code communicates urgency to the duty holder. That single-code-per-observation
                rule keeps the report defensible: each defect has a clear category and a clear
                expected action. Inspectors who batch defects under a single code, or list
                observations without codes, undermine the report's legal and contractual function.
              </>
            }
            cite="Source: IET Guidance Note 3 (9th Edition:2022, Amendment 4 update) — EICR Section K classification codes."
          />

          <SectionRule />

          <ConceptBlock
            title="C2 — Potentially dangerous, urgent action required"
            plainEnglish="C2 means the installation is currently safe to use as designed, but a single foreseeable fault would expose someone to danger that the installation should have been protecting against. The danger is potential, not present — but the gap is real and needs urgent attention."
            onSite={`C2 is the most-debated code. The honest test — "if a single foreseeable fault occurred, would a person be exposed to electric shock, fire, burn, or the danger that BS 7671 is designed to prevent?" If yes, C2. If the fault would still be safely contained, C3 or no code.`}
          >
            <p>
              BPG4 typical C2 examples — these are the bread-and-butter codes on most domestic
              EICRs:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Absence of RCD protection on socket-outlet circuits used by ordinary
                persons.</strong> Pre-2008 installation with no RCD on downstairs sockets used for
                portable equipment. Currently safe; single foreseeable fault (damaged flex,
                appliance failure) loses the protection that BS 7671 currently requires under
                Reg 411.3.3.
              </li>
              <li>
                <strong>Absence of main protective bonding to extraneous-conductive-parts.</strong>
                Gas, water, structural steel not bonded to MET. ADS may still operate but the
                touch-voltage protection layer that bonding provides is missing.
              </li>
              <li>
                <strong>Inadequate or undersized CPC.</strong> Sub-circuit CPC is undersized or
                damaged in a way that could increase Zs above the maximum permitted in fault
                conditions. Currently within limits; deterioration or a fault could push it
                outside.
              </li>
              <li>
                <strong>Incorrect polarity at a switch or accessory.</strong> The single-pole
                switching device is in the neutral — switching opens the neutral and leaves the
                load energised. A future maintenance person isolating via the switch is exposed.
              </li>
              <li>
                <strong>Defective accessory cover or enclosure that protects live parts but is
                damaged in a way that could expose them.</strong> Cracked CU lid that still covers
                the busbars but is one impact away from exposing them.
              </li>
              <li>
                <strong>Incorrect conductor identification.</strong> Strappers used as live and
                switched-live without re-identification. The next person works on this circuit
                expecting standard colours and gets a surprise.
              </li>
              <li>
                <strong>Old rubber-insulated cable showing signs of perishing.</strong> Insulation
                resistance currently within limits but visible cracking. The defect is not
                immediate but the trajectory is downward.
              </li>
              <li>
                <strong>Missing or inoperative SPD where one is required by Reg 443
                assessment.</strong> Risk assessment under A4 indicates SPD required; not present.
                C2 if the location is high-risk (lightning exposure, sensitive equipment); C3 if
                low-risk and SPD is best-practice rather than risk-required.
              </li>
            </ul>
            <p>
              The action expected from a C2 is "remediation arranged urgently" — typically within
              28 days for rented dwellings under the Private Rented Sector Regulations, sooner
              where the duty holder has the resources. C2 marks the report Unsatisfactory and
              triggers the documented remediation cycle.
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

          <ConceptBlock
            title="C3 — Improvement recommended"
            plainEnglish="C3 means the installation is safe to remain in service as found, but an upgrade or change would bring it closer to current best practice. C3 does not require remediation — it is advisory. C3-only reports remain Satisfactory."
            onSite="The trap with C3 is over-using it as a diplomatic substitute for C2. If the issue would expose someone to a foreseeable-fault danger, it is C2 not C3. If you wouldn't sit in court and defend C3 to that gap, recode it C2."
          >
            <p>BPG4 typical C3 examples — improvements rather than risks:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Absence of AFDDs in locations where Reg 421.1.7 (A4:2026) recommends but
                does not require them.</strong> Single-dwelling occupancy outside the HRRB scope.
                Improvement recommended; not a defect.
              </li>
              <li>
                <strong>Wooden back box behind a metal-clad accessory in an old install.</strong>
                Currently safe with intact cable insulation and earthing in place. Modern best
                practice is a metal back box with terminal earthing. C3 — recommend upgrade at
                next refurbishment.
              </li>
              <li>
                <strong>Older but still-compliant consumer unit.</strong> Plastic CU installed
                pre-2016, no fire damage, all devices working. Currently safe. Best practice is to
                replace with a metal-enclosed unit at next opportunity. C3.
              </li>
              <li>
                <strong>Cable installation method not aligned with current best practice but not
                presenting a hazard.</strong> Surface-mounted PVC trunking in a non-domestic area
                where modern install would use steel containment. Compliant when fitted; improved
                practice now exists. C3.
              </li>
              <li>
                <strong>Labels faded but legible.</strong> RCD test labels, circuit chart, isolation
                identification still readable but worn. Improvement — refresh the labels at next
                visit.
              </li>
            </ul>
            <p>
              C3 entries should still be specific and actionable. "Recommend replacing plastic
              consumer unit with metal-enclosed unit at next refurbishment" is useful. "General
              upgrade recommended" is not — too vague to be acted on, undermines the report's
              credibility.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="IET Guidance Note 3 — Advisory items separate from overall report assessment"
            clause="The example explicitly separates advisory observations from the overall assessment by stating they 'do not affect the overall assessment of the report.' Therefore an advisory-coded item (C3/FI) shall not change the overall condition classification (e.g., satisfactory/unsatisfactory) except where an item is coded C1 or C2 or a code that requires mandatory remedial action."
            meaning={
              <>
                GN3 confirms what BPG4 codifies — C3 is advisory and does not tip the report to
                Unsatisfactory on its own. The clause also notes FI does affect the overall
                assessment (because the inspector cannot certify safety until the investigation is
                complete). C1 and C2 always tip Unsatisfactory; multiple C3s do not. Get this right
                — a Satisfactory report with a long C3 list is correct; the same report marked
                Unsatisfactory creates unnecessary remediation pressure on the duty holder.
              </>
            }
            cite="Source: IET Guidance Note 3 — guidance on EICR observation coding and overall classification."
          />

          <SectionRule />

          <ConceptBlock
            title="FI — Further Investigation required"
            plainEnglish="FI means the inspector cannot reach a confident classification with the evidence available. Could be a measurement that doesn't add up, a suspected defect that requires invasive access beyond the agreed scope, or unfamiliar equipment that needs specialist input. FI is a planned next step, not a default for uncertainty."
            onSite="FI is the honest call when you genuinely can't decide. Don't use it to dodge a return visit (under-use) or as a catch-all for things you didn't bother investigating (over-use). Each FI must specify what investigation is needed and why."
          >
            <p>BPG4 typical FI scenarios:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Inconsistent test readings.</strong> Zs at a circuit endpoint reads
                significantly higher than R1+R2+Ze would predict. Could be a measurement artefact
                (probe contact, lead resistance, battery) or a real high-resistance joint. FI to
                confirm with second method and fresh kit.
              </li>
              <li>
                <strong>Suspected defect requiring invasive access.</strong> Suspected damaged
                cable inside a wall void where the EICR scope did not include opening up. FI to
                arrange access and confirm.
              </li>
              <li>
                <strong>Unfamiliar specialist equipment.</strong> Industrial PLC-controlled
                switchgear, EV charger arrays with smart load management, complex BMS-integrated
                lighting controls. FI to bring in specialist competence.
              </li>
              <li>
                <strong>Equipment unable to be tested at the time of inspection.</strong> Fire
                alarm panel, BMS, lift control on a separate maintenance contract — the inspector
                cannot test them within the EICR scope. FI to coordinate with the specialist
                contractors.
              </li>
              <li>
                <strong>Suspected upstream supply issue.</strong> Repeated nuisance tripping of an
                RCD with no identified downstream fault — could be a network neutral problem.
                FI to investigate with the DNO or a specialist supply analyser.
              </li>
            </ul>
            <p>
              The FI entry should specify: what is suspected, what investigation is recommended,
              who should carry it out, and what the expected outcome will inform. A vague "FI —
              investigate further" is not enough. The duty holder needs to know what to commission
              and the next inspector needs to understand what was outstanding when the original
              report was issued.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The defensible coding test</ContentEyebrow>

          <ConceptBlock
            title="The four-question test for every coding decision"
            plainEnglish="When you cannot decide between codes, run the same four questions every time. Apply them honestly and the code follows. The discipline of asking the same questions across every defect gives a report internal consistency that survives challenge."
          >
            <p>The four questions, applied to every coded observation:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Is anyone exposed to a danger right now?</strong> Yes = C1. The danger is
                present and accessible under reasonably foreseeable conditions. Make safe before
                leaving.
              </li>
              <li>
                <strong>Would a single foreseeable fault expose someone to danger that BS 7671
                should be preventing?</strong> Yes = C2. The installation works as designed but a
                missing safety layer means a future fault crystallises into harm.
              </li>
              <li>
                <strong>Is the installation safe as found, but does an upgrade exist that would
                bring it closer to current best practice?</strong> Yes = C3. Improvement, not a
                defect. Report stays Satisfactory.
              </li>
              <li>
                <strong>Do I have enough evidence to answer 1, 2, or 3 with confidence?</strong>
                No = FI. Specify what investigation is needed and what the expected outcome will
                inform.
              </li>
            </ol>
            <p>
              When two questions seem to give different answers — e.g. "currently safe but a fault
              could expose" versus "best practice would upgrade" — the higher-risk code wins.
              Default upward, not downward. A C2 wrongly coded as C3 leaves a real risk
              unaddressed; a C3 wrongly coded as C2 imposes unnecessary cost. The asymmetry
              favours the higher code where genuine doubt exists, with the Observations narrative
              explaining the reasoning.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="IET Guidance Note 3 — EICR definition and content requirements"
            clause="An Electrical Installation Condition Report (EICR) is the formal record produced following periodic inspection and testing of an electrical installation. The EICR shall identify any observed damage, deterioration, defects and conditions which may give rise to danger and shall state any action required, including codes for severity (e.g. C1, C2, C3, FI)."
            meaning={
              <>
                The EICR is more than a checklist — it is a formal safety document with a defined
                content requirement. GN3 sets the bar: identify what could give rise to danger,
                state the action required, code the severity. An EICR that lists observations
                without codes, or codes without supporting narrative, falls short of GN3 and would
                struggle to support the duty holder in discharging EAWR Reg 4(2).
              </>
            }
            cite="Source: IET Guidance Note 3 — definition and required content of the Electrical Installation Condition Report."
          />

          <SectionRule />

          <ContentEyebrow>A4:2026 changes that affect coding</ContentEyebrow>

          <ConceptBlock
            title="A4:2026 updates that change the coding picture"
            plainEnglish="Amendment 4 to BS 7671:2018 published in 2026 changes several things that affect EICR coding — the RCD test method, the AFDD recommendation, updated maximum Zs values, and renumbered documentation requirements. Old habits need refreshing."
            onSite="If you are inspecting under A4 you must apply A4 limits. Pre-A4 EICRs that referenced older Zs maxima or older RCD test methods are not wrong for their time but are not the current benchmark. Re-test against A4 values."
          >
            <p>The A4 changes most relevant to coding judgement:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Reg 643.7.3 — single AC RCD test.</strong> The old multi-test sequence at
                multiples of IΔn (50%, 100%, 500%) is replaced with a single AC test at IΔn (1×).
                The trip time limit (200 ms for general-use, 40 ms for high-risk additional
                protection) is unchanged. Do not over-test or under-test against the new method
                — coding flows from compliance with the current method.
              </li>
              <li>
                <strong>Reg 421.1.7 — AFDD recommendation.</strong> AFDDs recommended for socket
                circuits in HMOs, sleeping accommodation, and certain higher-risk locations.
                Recommend, not require — so absence on existing installations defaults to C3, not
                C2. HRRB-specific requirements via the Building Safety Act 2022 are a separate
                matter where AFDDs may be a hard requirement.
              </li>
              <li>
                <strong>Table 41.3 — updated maximum Zs values.</strong> The 80% rule for cable
                temperature correction and revised maxima for B-curve devices. B32 maximum is
                1.37 Ω at 80% under A4. Use the A4 table values when coding A4-era inspections.
              </li>
              <li>
                <strong>Reg 132.13 — documentation requirements.</strong> Renumbered from 132.13
                in earlier editions. Substance largely unchanged but the regulation reference must
                match the edition you are working under.
              </li>
              <li>
                <strong>TN-C-S (PNB) treatment.</strong> A4:2026 clarifies the requirements around
                Protective Neutral Bonding installations — particularly relevant where a periodic
                inspection finds a PNB arrangement and needs to assess its compliance with the
                tightened requirements.
              </li>
            </ul>
            <p>
              The principle is consistent across editions — code against current standards as a
              risk assessment, not against historical compliance. A4:2026 changed the standards;
              EICRs issued under A4 must reflect them.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Mis-coding the absence of RCD on socket circuits as C3 instead of C2"
            whatHappens={
              <>
                You inspect a 2003 installation. Downstairs ring serving general sockets has no
                RCD protection. You think — installation is original, working fine, just lacks a
                modern feature — and code C3 "improvement recommended". Report goes out
                Satisfactory. Three months later a child sticks a paperclip in a socket and is
                injured. The investigation reads your report and notes the C3 coding for an
                absence that BPG4 lists as a typical C2.
              </>
            }
            doInstead={
              <>
                Apply the four-question test. Question 2: would a single foreseeable fault expose
                someone to danger BS 7671 should prevent? Damaged flex on a kettle, child poking
                a paperclip into a socket, faulty appliance — all foreseeable, all would have been
                caught by the RCD that current Reg 411.3.3 requires. Code C2. Report goes out
                Unsatisfactory. Landlord or homeowner commissions remediation. Risk closed.
              </>
            }
          />

          <CommonMistake
            title="Walking away from a C1 without making safe"
            whatHappens={
              <>
                You find a damaged accessory exposing a live conductor in a hallway. You code C1
                on the EICR, leave the report with the duty holder, and head to the next job. A
                child runs through the hallway later that day, brushes the accessory, and gets a
                shock. The HSE investigation reads your EICR, sees the C1, and asks "what did you
                do to make safe?". Your answer "I told them about it" is not enough — your duty
                under EAWR Reg 4 attached the moment you identified the danger.
              </>
            }
            doInstead={
              <>
                C1 triggers an immediate-action obligation. Isolate the affected circuit (or the
                whole installation if the defect is on the supply side). Lock off if equipment is
                available; otherwise remove the relevant fuse or breaker. Label the isolation
                clearly. Brief the duty holder verbally and confirm in writing the same day.
                Document the make-safe action on the EICR alongside the C1 coding. If the duty
                holder objects to isolation, document the objection — your duty is to make safe
                what you found, not to negotiate continued operation of a known danger.
              </>
            }
          />

          <SectionRule />

          <ContentEyebrow>Worked examples — landlord 5-year periodic</ContentEyebrow>

          <Scenario
            title="Coding a real EICR — landlord 5-year periodic on a Victorian terrace conversion"
            situation={
              <>
                You are commissioned by a landlord to carry out the statutory 5-year EICR on a
                Victorian terrace converted into two flats. Original CU dates from 2008 — split
                load, all-RCD on one bank, no RCD on the other. Lighting circuits not on RCD.
                Bathroom shower circuit has its own dedicated RCD on a separate enclosure. Main
                bonding to gas present and continuous; main bonding to water absent (you trace it
                back and find it was disconnected during a kitchen refit). Earth electrode for the
                supplementary garden socket reads 78 Ω. Visual finds a cracked CU bus chamber
                cover that is intact but visibly damaged. Two socket faceplates loose but
                conductors not exposed. The lower flat has a metal-clad consumer unit installed
                in 2019 with all RCBOs.
              </>
            }
            whatToDo={
              <>
                Code each observation against BPG4. Original CU 2008 lighting circuits not on RCD
                — pre-2008 not required, post-2008 required for cables in walls less than 50 mm
                deep without earthed metallic protection. Investigate cable depth; if shallow and
                unprotected, C2 (Reg 522.6.202). Main bonding to water absent — C2 (typical BPG4
                category, missing main protective bonding to extraneous-conductive-part). Earth
                electrode 78 Ω feeding a TT garden socket with 30 mA RCD — at 78 Ω the touch
                voltage on a 30 mA trip is 2.34 V (well within 50 V) but BS 7671 best practice is
                under 200 Ω with margin; at 78 Ω it is fine, no code, record value. Cracked CU bus
                chamber cover — currently containing live parts but damaged, one impact from
                exposing them — C2. Loose socket faceplates with conductors not exposed — C3
                (improvement, retighten and inspect). Lower flat 2019 metal CU all RCBOs —
                compliant, no code. Bonding to gas present and continuous — record on schedule, no
                code. Overall: multiple C2s present so report Unsatisfactory. Landlord has 28 days
                under the PRS Regulations to commission remedial works.
              </>
            }
            whyItMatters={
              <>
                The PRS Regulations 2020 mean an Unsatisfactory EICR is not just a recommendation
                — it triggers a statutory 28-day landlord remediation duty enforceable by local
                authority with civil penalties up to £30,000 per breach. Mis-coding a real C2 as
                C3 leaves both the tenant exposed to electrical risk and the landlord exposed to
                local authority enforcement when a competent inspection later catches the same
                defect. Mis-coding a C3 as C2 imposes unnecessary remediation cost and undermines
                trust in the inspection process. The defensible report codes accurately, explains
                the reasoning in the Observations narrative, and gives the landlord clear actions
                with priorities.
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

          <ContentEyebrow>The overall classification</ContentEyebrow>

          <ConceptBlock
            title="Satisfactory or Unsatisfactory — what tips the call"
            plainEnglish="The overall classification on the EICR front page is binary — Satisfactory or Unsatisfactory. The rule is simple and consistent across BPG4 and GN3: any C1, any C2, or any FI = Unsatisfactory. C3-only reports stay Satisfactory."
            onSite="The overall classification matters more than the codes themselves for legal and commercial purposes. The PRS Regulations key on Unsatisfactory; insurers and mortgage lenders ask the binary question; the duty holder budgets remediation against that single word. Get the codes right and the overall flows from them."
          >
            <p>The classification logic, expressed as a decision tree:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Any C1 present</strong> = Unsatisfactory. Plus the make-safe-before-leaving
                obligation already discharged on site.
              </li>
              <li>
                <strong>Any C2 present</strong> = Unsatisfactory. Remediation expected urgently
                — 28 days for rented dwellings under PRS Regs.
              </li>
              <li>
                <strong>Any FI present</strong> = Unsatisfactory. The investigation must complete
                and the report be re-issued with definitive coding before the installation is
                considered safe to remain in service.
              </li>
              <li>
                <strong>Only C3s present</strong> = Satisfactory. Improvements recommended but not
                required. Installation is safe to remain in service.
              </li>
              <li>
                <strong>No observations</strong> = Satisfactory. Rare on older installations but
                possible on newer ones in good condition with no improvements recommended.
              </li>
            </ul>
            <p>
              The recommended date for next inspection runs alongside the classification. A
              Satisfactory report typically recommends the next standard interval (5 years for
              rented dwellings, 10 years for owner-occupied, varying for commercial). An
              Unsatisfactory report typically recommends a re-inspection after the remediation is
              complete, then back to the standard cycle. Do not extend the cycle beyond what the
              installation condition supports — extending an unsatisfactory installation's cycle
              dilutes the EICR's protective function.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="The Observations section — narrative that supports the codes"
            plainEnglish="The Observations section (Section K on the model EICR) is where the codes get their reasoning. A code without narrative is half a record; a narrative without a code is half an action. Together they tell the duty holder what was found, why it matters, and what to do about it."
            onSite="Write the narrative for two readers — the duty holder commissioning remediation, and the next electrician picking up the work. Both need to understand what was observed, where, and why it matters. Avoid jargon where plain language works; cite reg numbers where they add precision."
          >
            <p>The structure of a good Observations entry:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>What was observed.</strong> Specific, located, factual. "Main protective
                bonding to incoming water service absent — bonding clamp present at meter but
                conductor terminates 200 mm away with no continuation visible." Not "bonding
                problem".
              </li>
              <li>
                <strong>Why it matters.</strong> The risk in plain terms. "An exposed-conductive-part
                or extraneous-conductive-part not bonded to MET could rise to fault voltage in a
                first fault scenario, presenting a touch voltage hazard."
              </li>
              <li>
                <strong>The relevant reference.</strong> BS 7671 reg or GN3 section that frames the
                requirement. "Reg 411.3.1.2 — main protective bonding to extraneous-conductive-parts."
              </li>
              <li>
                <strong>The recommended action.</strong> Specific, actionable. "Reinstate main
                protective bonding to incoming water service using 10 mm² conductor, terminated at
                MET on one end and at the bonding clamp within 600 mm of meter on the other end."
              </li>
              <li>
                <strong>The classification code.</strong> C1, C2, C3, or FI per the four-question
                test.
              </li>
            </ol>
            <p>
              Photos attached or referenced (where the report system supports it) make a real
              difference for both the duty holder and the next inspector. A picture of the as-found
              condition is worth pages of narrative.
            </p>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "C1 = danger present, immediate action. Inspector must make safe before leaving site under EAWR Reg 4 continuing duty.",
              "C2 = potentially dangerous, urgent action. Single foreseeable fault scenario. Examples: missing RCD on socket circuits, missing main bonding, undersized CPC.",
              "C3 = improvement recommended. Installation safe as found. Does not trigger Unsatisfactory. Examples: pre-2016 plastic CU, AFDD recommendations under Reg 421.1.7.",
              "FI = further investigation needed. Inspector cannot reach confident classification with evidence on hand. Specify what investigation and why.",
              "Any C1 OR C2 OR FI tips overall classification to Unsatisfactory. C3-only reports stay Satisfactory.",
              "BPG4 (Best Practice Guide 4 — Electrical Safety First) is the industry consensus document. GN3 reproduces the codes; BPG4 gives worked examples.",
              "The four-question test — danger now, single-fault danger, improvement only, or insufficient evidence — drives every coding decision.",
              "A4:2026 affects coding via Reg 643.7.3 (single AC RCD test), Reg 421.1.7 (AFDD recommendation), Table 41.3 updated Zs values (B32 = 1.37 Ω), Reg 132.13 documentation, and TN-C-S (PNB) treatment.",
            ]}
          />

          <Quiz title="EICR coding — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module5-section5-1')}
              className="rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] transition-colors border border-white/10 p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white/60">
                <ArrowLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                5.1 Periodic inspection scope
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module5-section5-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                5.3 Sampling and scope agreement
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
