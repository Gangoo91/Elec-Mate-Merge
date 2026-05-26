/**
 * Module 4 · Section 2 · Subsection 1 — GS38 and selecting test instruments
 * Maps to C&G 2365-03 / Unit 303 / LO4 / AC 4.3
 *   AC 4.3 — "select the appropriate test instruments for fault diagnosis work"
 *
 * Layered depth: 2357 Unit 608 ELTK07 / AC 4.3 — selecting correct test
 * instruments in accordance with HSE GS 38.
 *
 * Frame: HSE GS38 4th ed sets the requirements for test instruments used on
 * LV systems — probe geometry, finger barriers, lead robustness, fused leads,
 * low impedance for proving dead. CAT II/III/IV ratings. Walks through the
 * practical L3 instrument-selection decisions with named brand realism.
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
  'GS38 + selecting test instruments (2.1) | Level 3 Module 4.2.1 | Elec-Mate';
const DESCRIPTION =
  'HSE GS38 4th edition in detail — probe geometry, finger barriers, fused leads, low-impedance for proving dead, CAT II/III/IV ratings — applied to instrument selection for L3 fault diagnosis.';

const checks = [
  {
    id: 'mod4-s2-sub1-tip',
    question:
      "GS38 (4th ed) specifies the maximum exposed metal tip on a test probe. What's the figure and why?",
    options: [
      "Because a ladder is a personal access platform that doesn't have a guardrail and depends on the user's three-point contact and footing for stability. It provides minimal collective protection. INDG401 and INDG402 (HSE guidance) limit ladder use to short-duration tasks (typically up to 30 minutes at one location), light work (one-handed work where reasonably practicable, with a free hand for grip) and where a higher control isn't reasonably practicable.",
      "4 mm maximum exposed metal tip. Older 19 mm tips can bridge across two adjacent terminals on UK distribution boards (terminal pitch typically 8 mm). The 4 mm limit eliminates the phase-to-phase short-circuit risk from a probe slip. Modern probes (Martindale, Fluke, Megger, Kewtech) ship with insulated shrouds or screw-on tip caps that limit the exposed length to ≤ 4 mm.",
      "Typical materials markup is 15-30% on top of cost — covers the time sourcing, collecting, returning, managing stock, dealing with wholesaler accounts, and wastage. Higher markup on stocked items you carry in van inventory; potentially lower markup on large special orders where you don't add much value.",
      "A rotary cable stripper (Jokari Quadro, Knipex 16 95 02, BAHCO 4490) — sized to the SWA outer diameter, runs around the sheath cleanly and removes a length to expose the armour without scoring the inner cores. Stanley knives can do it but the risk of scoring the inner is high; rotary strippers are the standard. For the armour itself — separate tool (armour shears for smaller, angle grinder for bigger) covered in Sub 1.2.",
    ],
    correctIndex: 1,
    explanation:
      "The 4 mm tip limit was the headline GS38 4th ed change. Most reputable probes have a snap-on cap that converts a fixed 4 mm tip to a momentary 19 mm reach for recessed terminals (still GS38-compliant when used appropriately).",
  },
  {
    id: 'mod4-s2-sub1-cat',
    question:
      "What CAT (measurement category) rating is the minimum for test instruments used at a domestic consumer unit?",
    options: [
      "CAT III 600 V minimum at the DB; CAT IV 600 V if working on the supply tails or cut-out. CAT ratings define the transient overvoltage withstand of the instrument's input protection. Using CAT II at a DB risks instrument failure with operator injury — the inputs explode, glass shards, possible eye loss. Fluke 117 is CAT III 600 V (DB and branch circuits, NOT cut-out). Fluke 87V is CAT III 1000 V / CAT IV 600 V.",
      "Test instruments (MFTs and voltage indicators), insulated tools, electrical PPE (gloves, mats, face shields where applicable), lock-off devices, warning labels — all of it. Reg 4(4) is why your MFT must be in calibration, why your voltage indicator must comply with HSE GS38, why your insulated tools must be in date and undamaged, and why your lock-off kit has to actually work. Use unsuitable equipment and you breach Reg 4(4) regardless of whether the install itself is sound.",
      "Metal CUs (as required by Amendment 3 onwards in domestic) are exposed-conductive-parts in their own right — but the regulation also drives consistent earthing practice across the property, and any metal back-box anywhere in the installation should already have been earthed regardless of CU material. The line item makes the existing requirement explicit in the quote.",
      "The dead test proves the wiring is correct between conductor identification at the CU and conductor identification at the accessory. The live test (using an approved voltage indicator at the accessory after first energising) confirms that the assumed L conductor at the CU actually carries the supply line — the dead test cannot detect a labelling error or a reversed connection at the meter tails.",
    ],
    correctIndex: 0,
    explanation:
      "CAT ratings come from IEC 61010 and they're not optional. Always meet OR exceed the CAT rating for the work location: CAT II for sockets, CAT III for DB and distribution, CAT IV for supply origin.",
  },
  {
    id: 'mod4-s2-sub1-volt-stick',
    question:
      "What's the GS38 distinction between a voltage detector (volt-stick) and a voltage indicator (two-pole tester)?",
    options: [
      "Ownership requires self-regulation of defensive impulses (ego protection, fear of consequences), involves taking responsibility without self-condemnation, and focuses on learning and solution — whereas blame culture is driven by unregulated fear and redirects negative emotion outward to protect the self",
      "Section 702 of BS 7671 — extensive supplementary bonding inside Zone 0, 1 and 2 around the pool (between the pool liner reinforcement, surrounding metalwork, ladders, lighting frames etc.) and tighter restrictions on equipment in each zone. Supplementary bonding generally cannot be omitted in pool zones — the wet skin / immersed body risk is far higher than a domestic bathroom.",
      "Voltage DETECTOR — non-contact, capacitively senses presence of AC. Useful for first-pass live identification but does NOT confirm absence of voltage (high-impedance / dead conductor reads as 'no voltage'). NOT GS38-compliant for proving dead. Voltage INDICATOR — direct-contact, low-impedance, lamp + LED + audible. IS GS38-compliant for proving dead. Volt-sticks are first-look tools; two-pole testers are proving tools.",
      "Apps reduce the friction of recording — entries can be made on the phone in the moment, photos and locations can be attached automatically, the data is searchable later. They also make sharing with the supervisor and the training provider easier. Paper diaries still work fine if maintained; digital tools just lower the barrier to actually keeping them current.",
    ],
    correctIndex: 2,
    explanation:
      "Confusing the two has killed people. Apprentice waves a Fluke 1AC-A1 II at a cable, no beep, assumes dead, takes a shock from a high-impedance source the stick missed. GS38 explicitly requires low-impedance two-pole for proving dead.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "List the seven instruments in an L3 apprentice's fault-diagnosis kit and what each is for.",
    options: [
      "Direct application to Local Authority Building Control (LABC) BEFORE the work starts via a Building Notice or Full Plans application; LABC inspects and issues their own completion certificate. Significantly more expensive (per-job fees often hundreds of pounds) and slower than the CPS route — most contractors register with NICEIC / NAPIT / ELECSA to use the post-completion 30-day upload instead.",
      "(1) GS38 two-pole tester (Martindale VI-13800, Fluke T130, Kewtech KT1780) — proving dead. (2) Proving unit (Martindale GVD2) — proves the tester. (3) MFT (Megger MFT1741+, Kewtech KT64+, Fluke 1664FC) — continuity, IR, EFLI, RCD, polarity. (4) Multimeter (Fluke 117 or 87V) — measurement. (5) Clamp meter (Fluke 376FC, Megger DCM340) — load and earth-leakage current. (6) Socket tester (Martindale CP501) — quick polarity check. (7) VDE screwdriver set (Wera Kraftform, Wiha SoftFinish, CK Dextro) — IEC 60900 1000 V AC.",
      "Production stop-times. Industrial sites typically run continuous or shift-based production, and electrical work that requires isolation has to fit within scheduled outages or planned shutdowns. The prep includes coordinating with plant operations, integrating with the site lockout/tagout system, observing any ATEX zones in process plants, and often working out-of-hours so the production line isn't affected.",
      "Yes — IET specifically promotes EngTech as accessible to vocational-route practitioners. JIB Approved Electrician + 2391-52 + portfolio of evidence + professional review = typical EngTech qualification. The IET provides regional ambassadors who advise on the application route. Many JIB Approved Electricians could qualify for EngTech but never apply because they don't realise they're eligible.",
    ],
    correctAnswer: 1,
    explanation:
      "The seven-instrument kit is the standard L3 loadout. Each tool has one job — no overlap. Combined cost ~£1,500–2,000 for new midmarket; built up over 18 months.",
  },
  {
    id: 2,
    question: "Why can't a multimeter replace a GS38 two-pole tester for proving dead?",
    options: [
      "Reg 14(2) requires every employee to inform their employer (or any other employee with specific responsibility for safety) of any work situation which they reasonably consider represented a serious and immediate danger to health and safety, AND any matter which they reasonably consider represented a shortcoming in the employer's protection arrangements for health and safety. The duty extends to near-misses, defective safe systems of work, and any condition the employee believes presents danger.",
      "Notices must be 'clearly and durably marked' (Reg 514.13.1) and 'shall be securely fixed in a visible position'. The practical interpretation: typed/printed labels on durable substrate (BS 951 plates for earthing, laminated card for inside-CU notices), securely fixed (screwed, riveted, or industrial adhesive), readable from a normal stand-back distance. Hand-written sticky labels degrade fast and aren't compliant.",
      "Three reasons. (1) Input impedance — multimeters at 10 MΩ read induced/phantom voltages as if they were real sources; two-pole at a few kΩ loads them to zero. (2) Probe geometry — multimeter probes typically have longer exposed tips and weaker finger barriers, failing GS38. (3) Indication — a multimeter shows a digit on a screen which can be misread; the two-pole's lamp + LED + audible is unambiguous. The instruments are complementary; the multimeter measures, the two-pole proves dead.",
      "Informal coordination — 'I'm five minutes away', 'meet me at the welfare unit', 'have you got a 16mm fly lead in the van'. NOT for contractual changes, scope variations, formal warnings, grievances, safety briefings of record, or anything you might need to defend in a dispute. WhatsApp messages have been admitted as evidence in court, but they carry less evidential weight than a signed variation order and they sit on a personal device the employer doesn't control.",
    ],
    correctAnswer: 2,
    explanation:
      "Each instrument is optimised for its job. Multimeter input impedance is a feature for measurement (doesn't load the circuit) but a bug for proving dead. Two-pole low impedance is a feature for proving dead but unusable for measurement.",
  },
  {
    id: 3,
    question: "Why are HRC fuses used in test lead assemblies (typically 500 mA F or 1 A FF) rather than glass cartridges?",
    options: [
      "The installer red-lines deviations on a working copy of the design pack at handover. The designer reviews each red-line, re-runs any affected calc, updates the affected schedules, the SLD and the layouts, marks the new revision, and re-issues. The re-issued pack is the as-installed pack — the master that the building owner inherits.",
      "Present both statistics in a lessons learnt briefing, analyse why entrapment is increasing despite overall fatality improvements, review all current entrapment prevention measures, implement additional controls such as secondary guarding and enhanced training, set measurable targets for entrapment reduction, and monitor progress quarterly using the PDCA cycle",
      "Class A (solids — wood, paper, fabric) — Water (red label, all-red body legacy / red with white panel modern); Class B (flammable liquids) — Foam (cream label) or CO2 (black label); Class C (flammable gases) — Dry powder (blue label); Class D (metals) — specialist dry powder; Class F (cooking oils) — wet chemical (yellow label). Plus electrical fires (no class letter — addressed by CO2 or dry powder, never water).",
      "HRC fuses can interrupt very high prospective fault currents safely (1500 A or higher breaking capacity). Glass cartridges have ~35 A breaking capacity; on a high-PSCC circuit (UK domestic 6 kA, commercial 16 kA+) a glass fuse can rupture violently when fault current exceeds its breaking capacity — glass shards, hot metal, no current interruption. Fluke and Martindale lead sets use sand-filled HRC elements.",
    ],
    correctAnswer: 3,
    explanation:
      "Fuse breaking capacity matters. HRC fuses (Bussmann KTK, Eaton FNQ-R, Mersen) are sand-filled and rated to 100 kA breaking; glass cartridges are not safe in test lead applications. Always replace blown lead fuses with HRC.",
  },
  {
    id: 4,
    question: "What's the practical use of a clamp meter (Fluke 376FC, Megger DCM340) in fault diagnosis?",
    options: [
      "Three uses. (1) Load current measurement on individual circuits without breaking the circuit — confirms which circuit feeds an unidentified appliance. (2) Earth leakage measurement — clamp around L+N together (the imbalance is the earth leakage) — diagnoses RCD nuisance trips. (3) Inrush current capture (Fluke 376FC) — captures motor / HVAC compressor / ballast start-up to diagnose nuisance trips on undersized breakers. Modern clamps have iFlex flexible transducers for cables too thick for the rigid jaw.",
      "One per RCBO. Each RCBO is an independent RCD device. Test each at 1 x I delta n, record trip time on the Schedule of Test Results against the circuit number. Standard MFT workflow: select RCD test mode, set I delta n to 30 mA (or other rating per device), AC test, plug into the circuit\\\\'s socket or test from the RCBO load terminals, press TEST, record trip time, move to next circuit. 12 RCBOs = 12 tests + 12 readings on the schedule. Modern MFTs auto-fill the schedule when they\\\\'re paired with certification software.",
      "They apply together. Section 712 covers the PV-side electrical requirements (DC isolation, string protection, inverter compliance, AC connection). Section 826 covers the EESS aspects (battery isolation, BMS, fire safety, signage). The hybrid inverter is a single piece of equipment that has to comply with both — the manufacturer's certification typically demonstrates compliance with both sections. The IET Codes of Practice for Grid-Connected PV and for EESS both reference each other. A4:2026 has clarified the interaction in places where ambiguity existed in the 18th Edition.",
      "Dedicated 13 A or 16 A supply on a 6 A or 10 A MCB, in 1.5 mm² T&E to the unit location (utility room, loft, plant cupboard). Local DP isolator. Boost wiring from kitchens and bathrooms — sometimes via humidity sensors or PIR, sometimes via pull-cord switches in bathrooms or push-buttons in kitchens. Some units include a low-voltage commissioning interface (e.g. for installer-set air-flow rates). The unit's nameplate is typically 50-300 W on full load — modest demand. The bulk of the electrical work is the boost wiring network, not the unit supply.",
    ],
    correctAnswer: 0,
    explanation:
      "The clamp meter is the most under-used fault-diagnosis instrument in apprentice kits. Non-invasive measurement during normal operation is its superpower — the fault is happening WHILE you measure.",
  },
  {
    id: 5,
    question: "Socket testers (Martindale CP501, Kewtech LOOPCHECK107) are widely used. What can they NOT tell you?",
    options: [
      "Make a contemporaneous note in your own records — date, time, location, what was said, by whom, who else was present, your response. Keep the note factual and unemotional. Don't share with the co-worker (it's your private record at this stage). If the conflict continues and you escalate, the contemporaneous notes are your evidence base and they carry significant weight because they were written at the time, not from memory weeks later.",
      "Can tell you: polarity and connection state of a 13A socket — correct, reversed polarity, missing earth, missing neutral. Some advanced models add EFLI and basic RCD trip indication. Cannot tell you: actual values of EFLI / IR / continuity (limited accuracy vs MFT), shared-neutral conditions, high-resistance joints below threshold, intermittent faults. Socket testers are first-look tools; the MFT gives the numbers for the certificate.",
      "Understand the strategic context of maintenance (why different strategies exist for different assets), apply structured analytical techniques (RCA, FMEA, criticality analysis), contribute to continuous improvement, and articulate how maintenance effectiveness is measured and improved — demonstrating the knowledge, skills and behaviours expected of a competent maintenance technician",
      "Whenever they design, supply or commission an article (including a control panel, a bespoke distribution board, a prefabricated assembly) for use at work — they must ensure it is safe and without risks to health when properly used, and supply adequate information about safe use, installation and dismantling. So a contractor designing a one-off control panel for a commercial customer is captured by s.6 as well as by EAWR.",
    ],
    correctAnswer: 1,
    explanation:
      "Plug in, three lights, headline fault category, move on. They're not certification instruments. Use them for speed (30 sockets in 5 minutes) then characterise faults with the MFT.",
  },
  {
    id: 6,
    question: "What's the right way to handle a test instrument that's been dropped or suspected damaged?",
    options: [
      "Leave it in place. Reg 701.415.2 ALLOWS omission when all three conditions are met (ADS, RCDs, main bonding) — but it doesn\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'t require removal of existing compliant bonding. Existing supplementary bonds add a layer of redundancy at no cost; removing them creates work and risk for no safety benefit.",
      "Yes — apprentices have the same legal right to join (or not join) a union as any other worker. Unions typically offer reduced 'apprentice rate' subscriptions. Apprentice membership is a personal choice; on JIB-graded sites the union shop steward is typically available to support apprentices through workplace issues even if they're not yet members.",
      "Stop using it. Apply a 'DO NOT USE' label or tag. Inform the supervisor. At base, do a function check on a known live source, calibration check against a reference instrument, visual inspection. If anything fails — send for repair / re-calibration; substitute with backup. PUWER 1998 Reg 5 + Reg 6 put the duty on the employer; the operative's prompt action protects the next user.",
      "Because most domestic PME supplies have a PEN of 35 mm² or less, which Table 54.8 maps to a 10 mm² minimum copper-equivalent main bonding. On bigger supplies (commercial three-phase, 70 mm² PEN) the bonding steps up to 16 mm² or 25 mm². Always read the supplier neutral first, then Table 54.8.",
    ],
    correctAnswer: 2,
    explanation:
      "A dropped instrument is presumed unsafe. The danger isn't visible damage — it's hairline cracks in the input PCB that let fault current bypass protection on the next live test. Behaves normally for a while, then fails violently.",
  },
  {
    id: 7,
    question: "Calibration intervals for the standard L3 fault-diagnosis kit?",
    options: [
      "Goal: \\\\\\\"Pass the I&T knowledge test within 6 weeks.\\\\\\\" Reality: \\\\\\\"Currently scoring 40% on practice tests.\\\\\\\" Options: \\\\\\\"Evening study, mentor-led revision, practice papers, college support.\\\\\\\" Will: \\\\\\\"Two practice papers per week, mentor review every Friday.\\\\\\\"",
      "Yes — manufacturer training (Schneider Electric, Siemens, Hager, Wago, ABB, etc.) typically counts as CPD with most CPS schemes provided it's substantive (not a sales pitch). Manufacturer events often free or low-cost; cover product-specific install, design, troubleshooting. Strong source of practical CPD especially for specialist equipment (PLCs, smart switchgear, EV chargers, PV inverters). Count attendance toward annual CPD hours.",
      "No person shall intentionally or recklessly interfere with or misuse anything provided in the interests of H&S. Examples — removing a machine guard, defeating an interlock, taking down a barrier, reaching round a lock-off, stuffing the door of an interlocked enclosure, switching off a smoke detector you find inconvenient. s.8 is a personal criminal offence and applies to everyone on site, employee or not.",
      "MFT — annually (Megger UK Service ~£100 per unit, UKAS-traceable). Two-pole tester — every 24 months (Martindale ~£40). Multimeter — annually (Fluke ~£80–150). Clamp meter — annually. Proving unit — annually with the two-pole. Track in a calibration register; replace stickers on receipt back from the lab. NICEIC / NAPIT audits will check.",
    ],
    correctAnswer: 3,
    explanation:
      "Calibration is the bookkeeping that protects the certificate. An out-of-calibration instrument's readings are inadmissible — sign-offs based on them can be challenged in court. Register entry: instrument ID, date, lab, certificate number, next-due date.",
  },
  {
    id: 8,
    question: "What does a CAT IV 600 V instrument cost on average and which ones are typical L3 apprentice purchases?",
    options: [
      "CAT IV 600 V two-pole testers — Martindale VI-13800 (~£60), Fluke T130 (~£100), Kewtech KT1780 (~£70). CAT III 1000 V / CAT IV 600 V multimeters — Fluke 87V (~£400), Megger AVO830 (~£200). CAT IV-rated MFTs — Megger MFT1721+ (~£900), Kewtech KT200 (~£500). Personal apprentice purchases typically: Martindale VI-13800 + Fluke 117 (CAT III 600 V — adequate for DB work but not cut-out). Firm-issued: Megger MFT1741+ and Fluke 87V for senior staff.",
      "Three crimpers — (1) ratchet H-die crimper for bootlace ferrules and small insulated lugs (0.5 to 6 mm² covers 90% of domestic / small commercial work, e.g. Knipex 97 53 04). (2) Hex-die ratchet crimper for compression lugs 10 to 25 mm² (e.g. Knipex 97 51 19). (3) Hydraulic crimper for compression lugs and bushings 25 to 240 mm² (e.g. Klauke EK 50 cordless or hand-pump units for one-off work). Layered range, each tool sized to its job.",
      "An EICR carried out and signed by a competent person (usually a CPS-registered contractor) in accordance with BS 7671 Part 6 / IET GN3, at the recommended frequency for the premises type, with a satisfactory or remediated outcome. Without that, the insurer's claim that the installation wasn't maintained to current standards is hard to refute.",
      "Where an offence under HASAWA is committed by a body corporate (a limited company) and is proved to have been committed with the consent or connivance of, or attributable to neglect on the part of, a director, manager, secretary or similar officer, that individual ALSO commits the offence and is liable to personal prosecution. Relevant once you become Approved Electrician, then a senior, then potentially a director — your personal liability scales with your role.",
    ],
    correctAnswer: 0,
    explanation:
      "CAT IV adds cost for a reason — better input protection, beefier internal isolation, more conservative voltage clamps. Worth paying for if you'll be on supply-side work; the Fluke 117 is fine if you'll never go above the DB.",
  },
];

const faqs = [
  {
    question: "What's the minimum kit I need to start L3 fault-diagnosis competence work?",
    answer:
      "Five at minimum: GS38 two-pole tester (Martindale VI-13800, ~£60), proving unit (Martindale GVD2, ~£40), MFT (Megger MFT1741+ or Kewtech KT64+ — typically firm-issued), multimeter (Fluke 117, ~£200), clamp meter (Fluke 376FC, ~£400 — typically firm-issued). Plus VDE screwdrivers and lock-off kit. By month six the full seven-instrument kit through firm-issue and personal purchase.",
  },
  {
    question: "Can I use my Fluke 117 multimeter on the supply tails between cut-out and meter?",
    answer:
      "No. The Fluke 117 is rated CAT III 600 V — adequate for distribution circuits but not for the supply origin (CAT IV territory). The right instrument is a CAT IV 600 V — Fluke 87V or a dedicated supply-side instrument. CAT III on a CAT IV location risks instrument failure with operator injury.",
  },
  {
    question: "Why is GS38 so specific about 'low impedance' for proving-dead instruments?",
    answer:
      "Because high-impedance instruments (multimeters at 10 MΩ) draw negligible current and can't distinguish a real source from an induced ghost voltage. Two-pole testers at 1–5 kΩ load down ghosts to zero while real sources hold. The lamp + LED + audible indication makes the difference unambiguous. GS38's preference for low-impedance is a 30-year lesson written in operator-fatality reports.",
  },
  {
    question: "How often should I get my instruments calibrated?",
    answer:
      "MFT — annually. Two-pole tester — every 24 months. Multimeter — annually. Clamp meter — annually. Proving unit — annually with the two-pole. Track in a calibration register and replace stickers on receipt back from the lab. Most NICEIC / NAPIT registration audits check the register.",
  },
  {
    question: "Are cheap MFTs (Lutron, sub-£250) ever good enough for L3 apprentice work?",
    answer:
      "No. Cheap MFTs typically lack UKAS-traceable calibration, accurate fast RCD trip-time measurement, reliable continuity nulling, robust enclosure, manufacturer support for re-calibration. The midmarket starting point is Kewtech KT64+ (~£450) — UKAS-calibrated, supports all the fault-diagnosis tests. Premium tier is Megger MFT1741+ (~£700). Don't buy below the Kewtech.",
  },
  {
    question: "What's the difference between IEC 60900 and EN 60900 markings on insulated tools?",
    answer:
      "IEC is international; EN is the European harmonised version. Functionally identical — both require 1000 V AC working voltage, 10 kV AC test voltage on every tool, double-triangle marking. Reputable manufacturers (Wera, Wiha, CK Dextra, Klein, Knipex VDE) mark to both. Cheap 'insulated' tools without the markings should be treated as suspect.",
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
            onClick={() => navigate('/study-centre/apprentice/level3-module4-section2')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 2
          </button>

          <PageHero
            eyebrow="Module 4 · Section 2 · Subsection 1"
            title="GS38 + selecting test instruments"
            description="HSE GS38 4th edition in detail — probe geometry, finger barriers, fused leads, low impedance for proving dead, CAT II/III/IV ratings — applied to choosing the right instrument for each fault-diagnosis task with named brand realism."
            tone="emerald"
          />

          <TLDR
            points={[
              "GS38 (4th ed) sets four headline rules: 4 mm max exposed tip, finger barriers, robust insulated leads, low-impedance for proving dead. Plus fused leads for high-PSCC work.",
              "CAT II for sockets, CAT III for DB / distribution, CAT IV for cut-out / supply origin. Always match or exceed the CAT for the work location.",
              "Seven-instrument L3 kit: two-pole tester, proving unit, MFT, multimeter, clamp, socket tester, VDE screwdrivers. Each has a specific job; no overlap means you can drop one.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "State the GS38 4th edition probe and lead requirements — 4 mm tip, finger barriers, fused leads where needed, robust insulation.",
              "Distinguish CAT II / CAT III / CAT IV measurement-category ratings and select the right CAT for the work location.",
              "Distinguish a voltage detector (volt-stick, non-contact) from a voltage indicator (two-pole, GS38-compliant for proving dead).",
              "Specify the seven-instrument L3 apprentice fault-diagnosis kit and the technical reason no instrument is interchangeable.",
              "Identify HRC fused test leads and explain why they're required on high-PSCC measurement.",
              "Apply tag-and-isolate discipline to dropped or suspect instruments to protect the next user.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>GS38 — the rulebook</ContentEyebrow>

          <ConceptBlock
            title="HSE GS38 (4th ed) — what every fault-diagnosis instrument must satisfy"
            plainEnglish="GS38 is the HSE's guidance document on electrical test equipment for use on LV systems. Four pages, every line matters. The 4th edition (2015) tightened the requirements after a series of operator injuries from inadequate probes and fragile leads."
            onSite="Reputable test instruments now ship with GS38-compliant probes by default. Compliance is assessed against the probe + lead set together — buying non-compliant probes to fit a compliant tester voids it. Stick with manufacturer-supplied or specifically GS38-marked aftermarket leads."
          >
            <p>The GS38 4th edition rules:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Maximum exposed metal tip — 4 mm.</strong> Older 19 mm tips can bridge across two adjacent terminals.</li>
              <li><strong>Finger barriers</strong> — moulded shroud at the back of the probe shaft that stops your finger sliding forward onto the tip.</li>
              <li><strong>Robust insulated leads</strong> — silicone or PVC sheathing rated for system voltage; no exposed conductor.</li>
              <li><strong>Fused leads</strong> where prospective fault current is high — typical inline 500 mA F or 1 A FF HRC fuse.</li>
              <li><strong>Low-impedance instrument</strong> for proving dead — typically 1–5 kΩ; loads down induced/ghost voltages so they don't masquerade as real sources.</li>
              <li><strong>Lamp + LED + audible</strong> on voltage indicators — single-mode is unreliable; multi-mode confirms the result.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="HSE Guidance Note GS38 (4th ed) — Probe design"
            clause={<>"The instrument\'s probes should incorporate a finger barrier and an insulated tip with a maximum length of metal exposed of 4 mm or, where this is not practicable, an insulating shroud reducing the exposed metal tip to 4 mm or less."</>}
            meaning={<>The 4 mm rule is the headline. Manufacturers provide tip-caps that allow occasional reach-in to recessed terminals (some MK / Wylex DBs have deep recesses) without permanently exposing more metal.</>}
            cite="Source: HSE GS38 (4th ed) — Electrical test equipment for use by electricians."
          />

          <InlineCheck {...checks[0]} />

          <SectionRule />

          <ContentEyebrow>CAT ratings — match instrument to location</ContentEyebrow>

          <ConceptBlock
            title="CAT II / III / IV — what they mean and where they apply"
            plainEnglish="The CAT (measurement-category) rating tells you how much transient overvoltage the instrument\'s input protection can survive. The further upstream the work, the higher the prospective transient — and the higher the CAT rating you need."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>CAT II</strong> — appliances, plug-and-cord-connected. Multimeter for socket measurement. NOT adequate for DB work.</li>
              <li><strong>CAT III</strong> — fixed installation, distribution circuits. DB measurements, branch circuits, motor controllers. Most fault diagnosis lives here.</li>
              <li><strong>CAT IV</strong> — origin of installation. Cut-out, supply tails, overhead lines.</li>
            </ul>
            <p>Common L3-relevant ratings:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Fluke 117 — CAT III 600 V (DB work, NOT supply-side).</li>
              <li>Fluke 87V — CAT III 1000 V / CAT IV 600 V.</li>
              <li>Martindale VI-13800 — CAT IV 600 V (suitable for cut-out work).</li>
              <li>Megger MFT1741+ — CAT IV 300 V / CAT III 600 V.</li>
              <li>Kewtech KT200 — CAT IV 600 V.</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...checks[1]} />

          <SectionRule />

          <ContentEyebrow>Volt-stick vs two-pole — first-look vs proving</ContentEyebrow>

          <ConceptBlock
            title="The non-contact tester is a first-look tool, not a proving instrument"
            onSite="Apprentices reach for the volt-stick (Fluke 1AC-A1 II, Knipex VoltagePen) because it\'s quick. It IS quick, and it has a legitimate role — first-pass cable identification. But it is NEVER the instrument that confirms a circuit is dead. The two-pole tester is."
          >
            <p>The technical difference:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Volt-stick (voltage detector)</strong> — non-contact, capacitive sensing of AC voltage in the cable\'s electric field. Convenient. Inconsistent — depends on cable shielding, sensor angle, battery, sensitivity setting. Misses high-impedance sources entirely.</li>
              <li><strong>Two-pole tester (voltage indicator)</strong> — direct contact, low-impedance, dedicated indicator with lamp + LED + audible. GS38-compliant for proving dead. Loads down induced voltages; reads real sources reliably.</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...checks[2]} />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 651.3"
            clause={
              <>
                "Measuring instruments and monitoring equipment and methods shall be chosen in accordance with the relevant parts of BS EN 61557. If other measuring equipment is used, it shall provide no less a degree of performance and safety."
              </>
            }
            meaning={
              <>
                BS 7671 nails instrument selection to a specific standard &mdash; BS EN 61557 &mdash; because a tester that doesn&apos;t meet it can&apos;t be relied on for safety-critical measurements. When you compare a Fluke 1664 FC to a budget eBay clone, BS EN 61557 is the line that separates them. Anything you use on a fault-diagnosis job has to either carry that mark or demonstrate equivalence.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Reg 651.3, verbatim."
          />

          <SectionRule />

          <ContentEyebrow>The seven-instrument apprentice kit</ContentEyebrow>

          <ConceptBlock
            title="What sits in an L3 fault-diagnosis toolbox"
            onSite="Each instrument has one job it does better than any other. There\'s no overlap that means you can drop one. Build the kit over 18 months."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>1. GS38 two-pole tester</strong> — Martindale VI-13800 (~£60), Fluke T130 (~£100), Kewtech KT1780 (~£70).</li>
              <li><strong>2. Proving unit</strong> — Martindale GVD2 (~£40), Drummond Lo-Z (~£35).</li>
              <li><strong>3. MFT</strong> — Megger MFT1741+ (~£700), Kewtech KT64+ (~£450), Fluke 1664FC (~£900).</li>
              <li><strong>4. Multimeter</strong> — Fluke 117 (~£200), Fluke 87V (~£400) for CAT IV inclusion.</li>
              <li><strong>5. Clamp meter</strong> — Fluke 376FC (~£400), Megger DCM340 (~£200).</li>
              <li><strong>6. Socket tester</strong> — Martindale CP501 (~£25), Kewtech LOOPCHECK107 (~£150 with EFLI).</li>
              <li><strong>7. VDE screwdriver set</strong> — Wera Kraftform Plus 7-piece (~£60), Wiha SoftFinish 7-piece (~£70), CK Dextro 8-piece (~£50).</li>
            </ul>
          </ConceptBlock>

          <VideoCard
            url={videos.multimeter.url}
            title={videos.multimeter.title}
            channel={videos.multimeter.channel}
            duration={videos.multimeter.duration}
            topic={videos.multimeter.topic}
          />

          <RegsCallout
            source="BS EN 61010-1 — Measurement category definitions"
            clause={<>"Equipment shall be suitable for the measurement category of the circuit at the point of measurement, taking account of the prospective transient overvoltage at that point."</>}
            meaning={<>The CAT rating isn\'t a marketing claim — it\'s a safety-rated specification under BS EN 61010-1. CAT II in a CAT III location is a real injury risk. Match or exceed.</>}
            cite="Source: BS EN 61010-1 — Safety requirements for electrical equipment for measurement, control, and laboratory use."
          />

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Using a CAT III multimeter at the cut-out"
            whatHappens={<>Apprentice probes incoming phase to neutral at the cut-out tails with a Fluke 117 (CAT III 600 V). The 117\'s input protection isn\'t rated for the CAT IV transient overvoltage at the supply origin. Inputs explode, molten metal sprays from the case, eye injury. The 117 was the wrong instrument for that location.</>}
            doInstead={<>Match CAT to location. CAT II for sockets, CAT III for DB, CAT IV for cut-out. Fluke 87V (CAT IV 600 V) and Martindale VI-13800 (CAT IV 600 V) cover most L3 work.</>}
          />

          <CommonMistake
            title="Trusting a non-contact volt-stick to confirm dead"
            whatHappens={<>Apprentice waves a Fluke 1AC-A1 II over an isolated cable. No beep. They grab the cable bare-handed. The cable has a borrowed neutral and is at 230 V on the neutral. The volt-stick missed it because the apprentice waved from the wrong side and the cable\'s sheath shielded the capacitive coupling. 230 V shock, fall from ladder, broken arm.</>}
            doInstead={<>Volt-stick is first-look only — \'might be voltage here\'. Proving dead requires a low-impedance two-pole tester (Martindale, Fluke T130) proved on a known live source before AND after, applied directly to the conductor between L–N, L–E and N–E.</>}
          />

          <Scenario
            title="Building the kit on a starter wage"
            situation={<>You\'re three months into your L3 apprenticeship. The firm has issued you an MFT (Kewtech KT64+) and a multimeter (Fluke 117). You need to supply your own two-pole tester, proving unit, VDE screwdrivers and basic PPE. Take-home pay is £1,400/month.</>}
            whatToDo={<>Month 1 (~£200): Martindale VI-13800 (£60), Martindale GVD2 (£40), Wera Kraftform Plus 7-piece VDE set (£60), Brady safety lockout padlock + tag (£30). Month 2–3: socket tester (£25), Class 0 insulated gloves (£40), arc-rated long-sleeve top (£50), high-vis (£10). Month 6: upgrade VDE drivers (Wera Kraftform Plus 15-piece £130), Fluke T6-1000 contactless meter (£200). Year 2: personal MFT if firm doesn\'t issue (~£500 second-hand Kewtech KT64+).</>}
            whyItMatters={<>The right tools at the right time keep you safe AND productive. Skipping the GS38 two-pole to save £60 means you can\'t legally prove dead, can\'t safely do the work, are a liability on site. Tools are an investment in employability — apprentices with their own kit get sent solo (under remote supervision) sooner.</>}
          />

          <SectionRule />

          <ContentEyebrow>CAT ratings — input protection of measurement instruments</ContentEyebrow>

          <ConceptBlock
            title="CAT II / III / IV — choosing an instrument that survives a transient"
            plainEnglish="The CAT (Measurement Category) rating defines the transient overvoltage an instrument can survive. Plug-in appliances are CAT II; fixed installation circuits are CAT III; cut-out / supply origin is CAT IV. A CAT III instrument used at a CAT IV location can be destroyed by a single switching transient — usually with the test leads exploding in the operative's hand."
            onSite="L3 fault investigation routinely lives at CAT III (DBs, distribution boards, fixed wiring) and sometimes CAT IV (cut-out work). Standard kit: Fluke 117 (CAT III 600 V), Fluke 87V (CAT III 1000 V / CAT IV 600 V), Megger MFT1741+ (CAT IV 600 V), Martindale VI-13800 (CAT IV 600 V), Kewtech KT64+ (CAT IV 600 V). Cheap CAT II multimeters from a generic toolbox have no place on a fault-diagnosis job."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>CAT II 600 V</strong> — plug-in appliances, single-phase loads downstream of a socket. Most consumer multimeters.</li>
              <li><strong>CAT III 600 V</strong> — fixed installation, sub-DBs, single-phase distribution. Most professional multimeters.</li>
              <li><strong>CAT III 1000 V / CAT IV 600 V</strong> — three-phase fixed installation, primary supply circuits. Professional MFTs and clamp meters.</li>
              <li><strong>CAT IV 1000 V</strong> — cut-out, supply origin, overhead lines. Specialist test equipment.</li>
              <li><strong>Lead matching</strong> — the test leads have their own CAT rating. A CAT IV meter with CAT II leads = the leads' rating limits the system. Match leads to instrument rating.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Two-pole tester families</ContentEyebrow>

          <ConceptBlock
            title="Martindale, Fluke, Kewtech — the three two-pole testers you'll meet"
            plainEnglish="The two-pole tester (sometimes called a 'voltage indicator' or 'Drummond tester') is the GS38-compliant instrument for proving dead. Three brands dominate the UK market and each has subtly different features."
            onSite="All three brands give lamp + LED + audible indication. All three are CAT IV 600 V minimum. Differences: Martindale VI-13800 has the brightest lamps; Fluke T130 has a backlit LCD that shows the actual voltage; Kewtech KT1780 has a built-in continuity test mode."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Martindale VI-13800</strong> — UK industry standard. Lamp + LED + buzzer. Pairs with Martindale GVD2 proving unit.</li>
              <li><strong>Fluke T130</strong> — backlit LCD shows actual voltage. Built-in continuity test. Pricier (~£180) but adds measurement capability.</li>
              <li><strong>Kewtech KT1780</strong> — built-in continuity, single-pole AC indication, GS38 compliant. Mid-price (~£110).</li>
              <li><strong>Drummond MD-906</strong> — older industry standard, still in widespread use. Lamps only.</li>
              <li><strong>Proving units</strong> — Martindale GVD2, Megger MTB7671, Kewtech KEWPROVE3.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>MFT selection — Megger / Fluke / Kewtech / Metrel</ContentEyebrow>

          <ConceptBlock
            title="The Multifunction Tester — your primary fault-diagnosis instrument"
            plainEnglish="The MFT does continuity, insulation resistance, loop impedance, RCD trip-time, and (on newer models) RCD ramp test, earth electrode resistance, and three-phase rotation. One instrument, one button rotation, one set of leads."
            onSite="Megger MFT1741+ is the UK gold standard. Fluke 1664FC adds Bluetooth data logging. Kewtech KT64+ is the budget-conscious choice with strong feature set. Metrel MI3155 is the European entrant on commercial work. All four are CAT IV 600 V."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Megger MFT1741+</strong> — full BS 7671 643 test suite, AutoRCD, Hi-Z (no-trip) loop mode, EV charger test mode, downloadable to PowerSuite Pro.</li>
              <li><strong>Fluke 1664FC</strong> — Insulation PreTest, Auto-Test sequence, FlukeView Forms wireless transfer.</li>
              <li><strong>Kewtech KT64+</strong> — full BS 7671 643 suite, integrated null-button for accurate Zs, Bluetooth to KT64Print app.</li>
              <li><strong>Metrel MI3155</strong> — popular on commercial 3-phase, includes 3-phase loop impedance and rotation test.</li>
              <li><strong>Special-feature MFTs</strong> — Megger MFT1845 (high-current loop for PSCC), Megger DET14C (intrinsically safe for ATEX), Fluke 1654-DLT (data-logging variant).</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Lead and probe management</ContentEyebrow>

          <ConceptBlock
            title="Test leads kill more electricians than the instruments they connect to"
            plainEnglish="The test lead is the weakest link in the GS38 chain. A nicked insulation, an exposed conductor where the probe meets the cable, a frayed strain-relief at the plug — any of these can put live voltage on the operative's hand. Daily inspection is non-negotiable."
            onSite="Every two-pole tester and MFT comes with manufacturer-supplied leads that meet GS38. Replacement leads MUST also meet GS38. Standard inspection: bend the lead 360 degrees along its length, look for cracks; flex the strain reliefs; visually check the probe insulation."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Daily inspection</strong> — pre-job: bend, flex, visual on every lead. Post-job: same.</li>
              <li><strong>Probe condition</strong> — finger guard intact, 4 mm exposed tip, no chips in moulded insulation.</li>
              <li><strong>Crocodile clip leads</strong> — for hands-free testing inside a DB. Must have Kelvin-clip design that grips firmly without bridging adjacent terminals.</li>
              <li><strong>Wander leads</strong> — long single-conductor leads for R1+R2 testing across long radials. Megger WL10 (10 m), WL20 (20 m).</li>
              <li><strong>Storage</strong> — leads coiled in figure-8, stored in instrument case. Tight loops crack the insulation.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "GS38 4th edition: 4 mm max exposed tip, finger barriers, robust insulated leads, low-impedance for proving dead, fused leads for high-PSCC work, lamp + LED + audible indication.",
              "CAT II for sockets, CAT III for DBs and branch circuits, CAT IV for cut-out and supply-side. Match or exceed the CAT for the location.",
              "Voltage detector (volt-stick) is first-look only. Voltage indicator (two-pole tester) is the GS38-compliant proving-dead instrument.",
              "Seven-instrument L3 kit: two-pole tester, proving unit, MFT, multimeter, clamp meter, socket tester, VDE screwdrivers. Each has a specific job; no overlap.",
              "Calibration intervals: MFT and multimeter annually, two-pole tester every 24 months. Track in calibration register; replace stickers on receipt.",
              "Fused HRC test leads (500 mA F or 1 A FF) limit energy in a probe-slip incident. Required for high-PSCC; recommended for all live work.",
              "Dropped instruments are presumed unsafe — tag and isolate, function-check on a known live source before re-use.",
              "VDE-rated insulated tools (IEC 60900, 1000 V AC, double-triangle marking) are the secondary safety layer when isolation is the primary.",
            ]}
          />

          <Quiz title="GS38 + instrument selection — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button onClick={() => navigate('/study-centre/apprentice/level3-module4-section1-4')} className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white"><ChevronLeft className="h-3 w-3" /> Previous</div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">1.4 Safe working procedures</div>
            </button>
            <button onClick={() => navigate('/study-centre/apprentice/level3-module4-section2-2')} className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">Next subsection <ChevronRight className="h-3 w-3" /></div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">2.2 Confirming fit-for-purpose</div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
