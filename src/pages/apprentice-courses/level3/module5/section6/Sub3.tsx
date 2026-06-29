/**
 * Module 5 · Section 6 · Subsection 3 — Commissioning paperwork chain
 * Maps to C&G 2365-03 / Unit 304 / LO6 / AC 6.5
 *   AC 6.5 — "describe the commissioning procedure for an electrical installation"
 *
 * Layered depth: 2357 Unit 607 ELTK06 / AC 6.5; 2366-03 Unit 302 / AC 6.5
 *
 * Commissioning paperwork is a chain of accountability — designer hands to
 * installer, installer hands to tester, tester hands to certifier, certifier
 * hands to customer. Each link records what they did, signs for it, and
 * passes the documentation forward. The chain is what survives the project
 * and what every future inspector reads.
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

const TITLE = 'Commissioning paperwork chain — designer to customer | Level 3 Module 5.6.3 | Elec-Mate';
const DESCRIPTION =
  'The commissioning documentation chain — designer to installer to tester to certifier to customer. Reg 132.13 design documentation, as-built records, test packs, witness sign-offs, O&M manuals — what each role records and how the chain protects accountability.';

const checks = [
  {
    id: 'm5-s6-sub3-chain-order',
    question:
      'On a commercial new-build commissioning, the documentation chain runs in what order?',
    options: [
      'Designer (design pack) → installer (as-builts) → tester (test results) → certifier (signed EIC) → customer (O&M pack).',
      'Customer (brief) → certifier (EIC) → designer (design pack) → installer (as-builts) → tester (test results).',
      'Installer (as-builts) → designer (design pack) → tester (test results) → customer (O&M pack) → certifier (EIC).',
      'Tester (test results) → installer (as-builts) → designer (design pack) → certifier (EIC) → customer (O&M pack).',
    ],
    correctIndex: 0,
    explanation:
      "Each role generates documentation that the next role uses. Designer produces the design pack (single-line diagrams, panel schedules, calculations, specs) under Reg 132.13. Installer marks up the design with as-built changes and records the materials actually fitted. Tester records every reading on the Schedule of Test Results plus separate RCD/Zs witness sheets where the spec calls for them. Certifier (typically the senior electrician or commissioning engineer) signs the EIC top-level declarations and assembles the pack. Customer receives the consolidated O&M manual with everything in it.",
  },
  {
    id: 'm5-s6-sub3-design-pack',
    question:
      'The design pack handed from designer to installer at the start of the project should include:',
    options: [
      'Single-line diagrams, panel schedules, circuit calculations, OCPD and earthing specifications, and a departures log.',
      'The completed Schedule of Test Results, so the installer knows the target readings before starting and installs to hit them.',
      'The signed Electrical Installation Certificate, which the installer follows as the specification for the whole job.',
      'The customer\'s verbal brief written up as a method statement, with the detailed design produced afterwards from the as-builts.',
    ],
    correctIndex: 0,
    explanation:
      "The design pack is the installer's reference for what was specified. Without it, the installer is reverse-engineering the design from a verbal brief — a sign-off risk and a fault-tracing nightmare years later. Standard design pack contents: single-line diagrams, panel schedules with circuit-by-circuit OCPD selections, calculations supporting cable sizes and disconnection times, earthing arrangement spec, fault-clearance Zs targets, departure log, interface drawings with adjacent disciplines.",
  },
  {
    id: 'm5-s6-sub3-witness-sheets',
    question:
      'On a larger commercial commissioning, separate witness sheets for RCD trip times and Zs are typically used because:',
    options: [
      'BS 7671 prohibits recording RCD and Zs values on the standard Schedule of Test Results, so a separate witness sheet is the only permitted place to enter them.',
      'They replace the Schedule of Test Results entirely on commercial work, removing the need to complete the standard BS 7671 schedule for those circuits.',
      'The contract or spec requires a countersigned record of safety-critical items, adding an audit trail on top of the standard schedule.',
      'BS 7671 Part 6 makes them a regulatory requirement for every installation above a defined size, and omitting them invalidates the EIC.',
    ],
    correctIndex: 2,
    explanation:
      'Separate witness sheets are a contract or specification overlay on top of the BS 7671 minimum. They are not a regulatory requirement — the Schedule of Test Results captures the same data — but they provide an additional countersigned record on safety-critical items. Common on commercial fit-outs, public buildings, healthcare estates and hazardous locations where the project specification calls for redundant audit. The witness sheet typically captures the meter serial, the test value, the date, and signatures from both the testing electrician and the witnessing engineer.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'On a small domestic CU swap by a single self-employed electrician, the commissioning paperwork chain:',
    options: [
      'Disappears entirely — on a one-person domestic job no documentation chain exists, so only the EIC is produced and no other records are needed.',
      'Collapses to one person signing all three EIC declarations, but every documentation link still exists in compressed form.',
      'Requires the sole trader to subcontract the design and testing roles to separate competent persons, because one individual cannot lawfully sign all three EIC declarations.',
      'Is replaced by a single Minor Works Certificate, which combines the design, construction and inspection roles into one declaration for any domestic job.',
    ],
    correctAnswer: 1,
    explanation:
      "Even on a one-person job the chain is logically present. The electrician designs the work (Zs calculations, RCBO selection, earthing review) — designer role. Installs it — constructor role. Tests and inspects — inspector role. Signs each declaration on the EIC. The documentation chain is shorter (no separate design pack handed over to a different person) but every step still exists. The single competent person carries each role's accountability into a single set of signatures on the EIC.",
  },
  {
    id: 2,
    question: 'Reg 132.13 sits where in the commissioning chain?',
    options: [
      "Only at the very end — it applies solely to the customer handover, requiring operating instructions once the installation is certified.",
      "Nowhere in the commissioning chain — it is a testing regulation governing the dead-test sequence, sitting within Part 6 rather than the design chain.",
      "At the start — it is the design-side documentation requirement, and the same data flows through to the customer's O&M pack at handover.",
      "Only on commercial projects — it applies to fit-outs above a defined size and has no bearing on a domestic installation's documentation chain.",
    ],
    correctAnswer: 2,
    explanation:
      'Reg 132.13 sets the documentation requirement at the design phase — diagrams, schedules, circuit charts, protective-device location information for every installation. The design pack handed from designer to installer is the project-start delivery of Reg 132.13. The certifier folds the same documentation (with as-built mark-ups) into the customer pack. So Reg 132.13 spans the entire chain — start (designer), middle (installer mark-ups), end (customer pack).',
  },
  {
    id: 3,
    question: 'The installer hands to the tester:',
    options: [
      'The signed Electrical Installation Certificate, so the tester can confirm the readings match the values already certified before testing.',
      'The customer\'s Building Control Compliance Certificate, which the tester needs in order to begin the live-test sequence.',
      'Nothing — the tester works entirely from the original design pack, the two roles being kept separate for independence.',
      'Marked-up as-builts, materials register, dead-test record, and confirmation of safe-isolation status for live testing.',
    ],
    correctAnswer: 3,
    explanation:
      "The installer's deliverables to the tester are: as-built mark-ups (any deviations from the design), materials register (what brand of RCBO, what cable batch — useful for warranty and traceability), dead-test record sheet (continuity and IR readings recorded as installation progressed — saves the tester repeating work), and the safe-isolation status (which circuits can now be live-tested and which still need work). The tester then completes the live-test sequence and the Schedule of Test Results.",
  },
  {
    id: 4,
    question: 'The certifier (commissioning engineer or senior electrician) hands to the customer:',
    options: [
      'The Operations and Maintenance (O&M) pack — the consolidated bundle of certification, schedules, design pack, as-builts, manuals and maintenance schedule.',
      'The signed EIC alone — the schedules, design pack and manuals are retained by the certifier and released only on later request.',
      'The manufacturer manuals alone, the test documentation being technical information held by the contractor rather than the customer.',
      'A verbal confirmation that the installation is safe, with the written O&M pack lodged with Building Control rather than the customer.',
    ],
    correctAnswer: 0,
    explanation:
      "The O&M pack is the customer's evidence base for the lifetime of the installation. On commercial work it can run to hundreds of pages. On domestic it may be a 30-page folder or a bookmarked PDF. The pack contains everything from each role in the chain — design pack from designer, as-built mark-ups from installer, test results from tester, signed certification from certifier, and equipment manuals. Any future facility manager, EICR inspector or fault-finder picks up the O&M and has the full picture.",
  },
  {
    id: 5,
    question: 'Pre-commissioning checks (before any energisation) include:',
    options: [
      'Energising every circuit first, then carrying out the visual inspection and dead tests with the supply live to reflect real operating conditions.',
      'Visual inspection, the dead-test sequence (continuity, IR), circuit identification and isolation lock-off — all completed and passed before energisation.',
      'Live tests only — Zs and RCD trip times are measured before any dead testing, to establish the supply characteristics the rest depends on.',
      'A functional check of every accessory by switching it on and off, with no measurements, the schedule being completed after the install is in service.',
    ],
    correctAnswer: 1,
    explanation:
      'The pre-commissioning sequence is structured to catch issues before any live work. Visual inspection is first (Reg 642). Dead-test sequence next (continuity, IR, polarity at the CU — Reg 643.3). Circuit identification confirmed against the design pack and the CU labels. Isolation lock-off verified. Dead-test readings compared to expected values from the design (Zs calculation, R1+R2 expected from cable lengths) — anomalies investigated before energising. Only then is the supply restored and live testing proceeds.',
  },
  {
    id: 6,
    question: "The Operations and Maintenance manual on a commercial fit-out typically lives where after handover?",
    options: [
      'With the DNO, which holds the master copy of every commercial O&M manual as part of the supply records for the building.',
      'With Building Control, which retains the O&M manual as the formal compliance record and releases it only on a property sale.',
      'On the client side — held by the facilities manager and building owner, with a contractor soft copy kept for warranty and PI purposes.',
      'With the Competent Person Scheme, which stores the O&M centrally and issues sections to whichever contractor carries out future work.',
    ],
    correctAnswer: 2,
    explanation:
      "The O&M is the building's electrical history. Facilities manager uses it daily — fault diagnosis, planned maintenance, supplier contacts. Building owner retains a copy for compliance and asset evidence. Contractor retains a soft copy for warranty (typically 12 months on installation work, longer on equipment) and PI (6+ years per Limitation Act). On a property sale, the O&M transfers with the property — the next owner inherits the same reference base.",
  },
  {
    id: 7,
    question: 'On a domestic CU swap, the simplified commissioning chain typically is:',
    options: [
      'Identical to a commercial fit-out — a separate bound O&M manual, individual witness sheets and a third-party engineer\'s sign-off are all required.',
      'Reduced to a single verbal handover with no written documentation, since a domestic job does not require an EIC or any retained records.',
      'Split across four separate contractors each issuing their own certificate, because one person cannot hold all four roles on a domestic job.',
      'Compressed into the EIC trio plus customer pack, with design notes held in the contractor file and a verbal walk-through covering the handover.',
    ],
    correctAnswer: 3,
    explanation:
      'Domestic commissioning compresses the chain. The single competent person fulfils designer, installer, tester and certifier roles. The design notes (Zs calculations, RCBO selection, earthing review) typically live in the contractor file rather than being separately bound and handed to the customer. The customer pack is the EIC trio + manuals + as-built schedule + operational instructions. The verbal walk-through covers the parts a commercial O&M would document at length. Lighter chain, same logical content.',
  },
  {
    id: 8,
    question: 'Documentation chain integrity matters most when:',
    options: [
      "Years later — at a fault, sale, EICR, insurance claim or alteration, where a weak link can compromise the installation's defendability.",
      "Only on the day of handover — once the customer has signed for the pack the documentation has served its purpose and no longer matters.",
      "Only during the CPS audit — the chain matters solely so the scheme assessor can verify the contractor's paperwork, and no one else.",
      "Only while the installation is being commissioned — once energised and working the documentation is redundant, the install speaking for itself.",
    ],
    correctAnswer: 0,
    explanation:
      'The documentation chain is invisible while everything works. It becomes critical when something happens — a fault months later, a sale years later, an EICR a decade later, an insurance claim after an incident, an alteration project that has to start from "what was actually installed". A complete, traceable chain answers every question. A weak chain leaves the customer (and the contractor) defending a position with incomplete evidence.',
  },
];

const faqs = [
  {
    question: 'On a small domestic job, do I really need to keep separate design notes if I am also the installer and the tester?',
    answer:
      'Yes — even if they live only in the contractor file. The design notes (Zs calculations, RCBO selection rationale, earthing review, voltage drop check, AFDD applicability) are evidence of the design step. They support the designer declaration on the EIC. They protect you if a defect emerges later and you need to evidence the design judgement. They also protect you in a CPS audit, where the assessor may ask to see how you arrived at the protective device selection and the disconnection time compliance. A one-page calculation sheet per job, kept in the cloud file, is enough on most domestic work.',
  },
  {
    question: 'What is the difference between commissioning and verification?',
    answer:
      'Verification (Part 6 of BS 7671) is the BS 7671 compliance confirmation — visual inspection, dead test, live test, signed certificate. Commissioning is broader — it includes verification PLUS functional testing of the installation in operation (every circuit energised, every accessory tested, every interlock proved, every changeover proved, every BMS or fire alarm interface tested). On a domestic install the two largely overlap. On a commercial install commissioning is a much bigger phase — it can run to weeks of structured testing across electrical, mechanical, BMS, fire, security and IT systems.',
  },
  {
    question: 'Who signs the commissioning certificate on a commercial fit-out?',
    answer:
      'Depends on the project. Some specs call for a single commissioning engineer to sign the top-level Commissioning Certificate. Others call for separate role sign-offs — the M&E consulting engineer signs the design verification, the principal contractor signs the construction, the appointed commissioning engineer signs the commissioning, the third-party inspector signs the inspection. The EIC sits underneath all of this and carries the BS 7671 declarations. Always read the spec to understand who signs what before commissioning starts.',
  },
  {
    question: 'On a phased project (multiple commissioning stages), how does the documentation chain work?',
    answer:
      "Each phase is its own commissioning event with its own EIC and its own O&M section. Phase 1 hands over a defined extent — say, the basement plant room and Floor 1 — with a phase-1 EIC covering only that scope. Phase 2 then adds Floor 2 with its own phase-2 EIC. The customer's master O&M is updated to add each phase's documentation as it completes. Each phase EIC clearly states its extent (\"Floor 1 only\" or \"Basement plant room only\") to avoid ambiguity. Final commissioning at project completion may issue a project-wide EIC covering the whole installation, or may rely on the phased EICs as the certification record.",
  },
  {
    question: 'What if the design changes during construction?',
    answer:
      'Document the change. Most projects use a Technical Query / Design Change Note process — the installer raises a TQ, the designer reviews, issues a Design Change Note (DCN) with the revised information, the installer marks up the as-builts to reflect the change. The certifier records the DCN reference on the EIC under the extent description or the comments. Departures from BS 7671 introduced by a change get logged on the EIC departures section as for any other departure. The audit trail is the TQ + DCN + as-built + signed certification.',
  },
  {
    question: 'How long does the contractor keep the commissioning documentation after handover?',
    answer:
      "Contractor keeps a soft copy indefinitely on commercial work — for warranty (typically 12 months on installation, longer on equipment), professional indemnity (6+ years per the Limitation Act floor; 10-25 years per most PI policies), CPS audit (duration of scheme membership plus a trailing window), and to support the customer if their copy is ever lost. On domestic work the same retention principles apply — cloud storage of PDFs has made indefinite retention trivially cheap. The customer's O&M and EIC pack are the master documents; the contractor's copy is the back-up plus the contractor's own protection.",
  },
];

export default function Sub3() {
  const navigate = useNavigate();
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module5-section6')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 6
          </button>

          <PageHero
            eyebrow="Module 5 · Section 6 · Subsection 3"
            title="Commissioning paperwork chain — designer to customer"
            description="The chain of accountability that runs from designer to installer to tester to certifier to customer. Each link records what they did, signs for it, and passes the documentation forward. Reg 132.13 sets the start; the customer O&M is the end."
            tone="emerald"
          />

          <TLDR
            points={[
              'Commissioning paperwork is a chain of accountability — designer (Reg 132.13 design pack) → installer (as-built mark-ups + materials register) → tester (Schedule of Test Results + witness sheets) → certifier (EIC top-level declarations) → customer (full O&M pack).',
              'On a small domestic job the chain collapses to one person but the logical steps remain — design notes, as-built schedule, test results, signed EIC, customer pack. Each link still exists, even if compressed.',
              'On a commercial project the chain is multi-organisation. M&E consultant designs; contractor installs; testing electrician tests; commissioning engineer certifies; facilities manager receives the O&M.',
              'Reg 132.13 spans the chain — design-side documentation flows from designer through installer mark-ups to the customer O&M. The same documentation evolves at each stage rather than being recreated.',
              'The documentation chain matters most years later — fault, sale, EICR, insurance claim, alteration. A weak link compromises the installation\'s defendability when it is needed most.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Map the commissioning paperwork chain end to end — designer, installer, tester, certifier, customer — and identify what each role records.',
              'Apply Reg 132.13 design documentation requirements to the design pack handed at project start.',
              'Identify the installer hand-over to tester — as-built mark-ups, materials register, dead-test record, safe-isolation confirmation.',
              'Define the tester hand-over to certifier — Schedule of Test Results, witness sheets, anomaly log, defect register.',
              'Compile the certifier hand-over to customer — the Operations and Maintenance pack with everything from the chain consolidated.',
              'Compress the chain for a single-person domestic job while preserving every logical step.',
              'Manage phased commissioning where each phase has its own EIC and the master O&M aggregates them.',
              'Apply contractor retention requirements (Limitation Act, professional indemnity, CPS audit) to the documentation chain.',
            ]}
            initialVisibleCount={4}
          />

          <ContentEyebrow>The chain — five roles, five hand-overs</ContentEyebrow>

          <ConceptBlock
            title="Designer → installer → tester → certifier → customer"
            plainEnglish="Each role generates documentation that the next role uses. Each hand-over is a recorded event with signatures and document references. The chain is what connects the design intent at project start to the customer's evidence base at lifetime end."
            onSite="On a domestic job the chain compresses into one person and one EIC. On a commercial project the chain spans multiple organisations and multiple weeks of commissioning. The principle is identical — each step records what was done, signs for it, and passes the documentation forward."
          >
            <p>The chain explained role by role:</p>

            <div className="hidden sm:block bg-[hsl(0_0%_10%)] border border-white/[0.08] rounded-xl p-4 text-[13px]">
              <div className="grid grid-cols-3 gap-3 text-white/90">
                <div className="text-elec-yellow/80 text-[11px] uppercase tracking-wide font-semibold">Role</div>
                <div className="text-elec-yellow/80 text-[11px] uppercase tracking-wide font-semibold">Generates</div>
                <div className="text-elec-yellow/80 text-[11px] uppercase tracking-wide font-semibold">Hands to</div>

                <div>Designer (M&E consultant or competent electrician on small jobs)</div>
                <div>Reg 132.13 design pack — single-line diagrams, panel schedules, calculations (cable size, voltage drop, Zs), OCPD specification, earthing arrangement, departures log</div>
                <div>Installer (with the brief to build to spec; deviations require Design Change Notes)</div>

                <div>Installer (electrical contractor)</div>
                <div>As-built mark-ups (any deviations from design), materials register (what was fitted), dead-test record (continuity, IR captured during install), safe-isolation status</div>
                <div>Tester (the testing electrician, or the same person on smaller jobs)</div>

                <div>Tester (testing electrician)</div>
                <div>Schedule of Test Results (per-circuit dead + live readings), witness sheets where spec calls (RCD/Zs counter-signed), anomaly log, defect register for items requiring rectification under Reg 644.1.1</div>
                <div>Certifier (commissioning engineer or senior electrician)</div>

                <div>Certifier (commissioning engineer / senior electrician)</div>
                <div>Signed EIC top-level declarations (designer, constructor, inspector), Schedule of Inspections (visual checklist), departures formally documented, comments on existing installation, recommended next inspection</div>
                <div>Customer (handover pack and O&M manual)</div>

                <div>Customer (duty-holder for the installation)</div>
                <div>O&M pack retained for the lifetime of the installation — used for any future EICR, sale, insurance claim, alteration project, fault diagnosis</div>
                <div>(End of chain — pack stays with the duty-holder)</div>
              </div>
            </div>

            <div className="sm:hidden space-y-2">
              {[
                {
                  role: 'Designer',
                  generates: 'Reg 132.13 design pack — single-line, panel schedules, calculations, OCPD spec, earthing, departures',
                  to: 'Installer',
                },
                {
                  role: 'Installer',
                  generates: 'As-built mark-ups, materials register, dead-test record, safe-isolation status',
                  to: 'Tester',
                },
                {
                  role: 'Tester',
                  generates: 'Schedule of Test Results, witness sheets, anomaly log, defect register',
                  to: 'Certifier',
                },
                {
                  role: 'Certifier',
                  generates: 'Signed EIC, Schedule of Inspections, departures log, comments on existing installation',
                  to: 'Customer',
                },
                {
                  role: 'Customer',
                  generates: 'Lifetime O&M retention — used for EICR, sale, insurance, alteration',
                  to: '(End of chain)',
                },
              ].map((row, i) => (
                <div key={i} className="bg-[hsl(0_0%_10%)] border border-white/[0.08] rounded-xl p-3 text-[13px]">
                  <div className="text-elec-yellow text-[11px] uppercase tracking-wide font-semibold">Role</div>
                  <div className="text-white/90 mt-0.5 font-semibold">{row.role}</div>
                  <div className="text-elec-yellow text-[11px] uppercase tracking-wide font-semibold mt-2">Generates</div>
                  <div className="text-white/80 mt-0.5">{row.generates}</div>
                  <div className="text-elec-yellow text-[11px] uppercase tracking-wide font-semibold mt-2">Hands to</div>
                  <div className="text-white/80 mt-0.5">{row.to}</div>
                </div>
              ))}
            </div>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 132.1 (Design documentation framework, Regs 132.2–132.5)"
            clause="The information required as a basis for design is stated in Regulations 132.2 to 132.5. The requirements to which the design shall conform are stated in Regulations 132.6 to 132.16. Designers shall therefore determine and record the information listed in 132.2–132.5 to demonstrate conformity with subsequent design requirements."
            meaning={
              <>
                The Reg 132.1 framework sits at the START of the commissioning chain — it is the
                design-side requirement that creates the design pack the installer works to. The
                same documentation flows forward through installer mark-ups to the customer's
                O&M. Without the Regs 132.2–132.5 information determined and recorded at the
                start of the chain, the installation has no design baseline and the
                certification at the end cannot reference what was designed.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Regulation 132.1 framework."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Designer hand-over to installer — the design pack</ContentEyebrow>

          <ConceptBlock
            title="What the design pack contains and why it matters at site"
            plainEnglish="The design pack is the installer\'s reference for what was specified — what to fit, where to fit it, what cable to use, what protective device, what earthing arrangement. Without it the installer is reverse-engineering the design from a verbal brief."
            onSite="On a small domestic CU swap, the design pack is typically a one-page Zs/RCBO/earthing review held in the contractor file. On a commercial fit-out it can run to hundreds of drawings plus calculation books. Either way, the principle is the same — written specification that the installer can build to and the certifier can verify against."
          >
            <p>Standard design pack contents:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Single-line diagrams.</strong> Schematic showing supply intake, main
                switchgear, distribution boards, sub-mains, final circuits. The visual map of
                the installation.
              </li>
              <li>
                <strong>Panel schedules.</strong> Per-board schedule of every circuit — circuit
                number, description, OCPD type and rating, RCBO IΔn type, AFDD presence where
                fitted, cable size, reference method, max Zs target, design current.
              </li>
              <li>
                <strong>Calculations.</strong> Supporting maths for cable sizing (current
                carrying capacity from Appendix 4 tables, derating for grouping and ambient,
                voltage drop), Zs targets from Table 41.3 for ADS compliance, fault current at
                each board for OCPD breaking capacity, earth-fault loop calculations.
              </li>
              <li>
                <strong>Earthing arrangement spec.</strong> System type (TN-S, TN-C-S, TT, IT),
                MET location, main earthing conductor size per Table 54.7, main protective
                bonding conductor sizes per Table 54.8, supplementary bonding requirements per
                location.
              </li>
              <li>
                <strong>Departures log.</strong> Any deliberate deviations from BS 7671 with
                clause number, chosen alternative, reasoning, designer acceptance, duty-holder
                acceptance.
              </li>
              <li>
                <strong>Interface details.</strong> Where the electrical installation interfaces
                with adjacent disciplines — HVAC controls, fire alarm, BMS, security,
                lift controls, EV charging, solar PV, battery storage. Each interface
                documented so the installer knows what to terminate where.
              </li>
              <li>
                <strong>Specification documents.</strong> Brand and model numbers for major
                equipment (CU, RCBOs, AFDDs, isolators, EV chargers, SPDs), or performance
                specs where the contractor selects the brand.
              </li>
            </ol>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Installer hand-over to tester — as-builts and dead-test record</ContentEyebrow>

          <ConceptBlock
            title="As-built mark-ups, materials register, dead-test record"
            plainEnglish="The installer hands the tester a marked-up version of the design pack showing what was actually built (rarely identical to what was designed), a list of materials actually fitted, and the dead-test readings captured during installation."
            onSite="As-built mark-ups are critical. Construction never matches the design 100% — a cable route changes around an unforeseen obstacle, a circuit is added under a Design Change Note, an accessory is repositioned at the customer\'s request. The tester needs to test what is actually there, not what was designed. Mark-ups bridge the gap."
          >
            <p>Standard installer-to-tester deliverables:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Marked-up as-builts.</strong> Original design drawings with red-pen
                changes showing actual installation — cable routes, accessory positions,
                circuit additions, departure points from the original spec.
              </li>
              <li>
                <strong>Materials register.</strong> What was actually fitted — brand, model,
                serial where applicable, batch numbers for cables (useful for warranty and for
                tracing any future product recall). On a commercial fit-out this can be a
                spreadsheet or a database; on domestic it is typically a one-page list.
              </li>
              <li>
                <strong>Dead-test record.</strong> Continuity, R1+R2, ring final readings, IR
                captured during installation as each circuit completed. Saves the tester
                repeating dead tests; provides an audit trail of what was measured at
                installation rather than only at certification.
              </li>
              <li>
                <strong>Safe-isolation status.</strong> Confirmation of which circuits are
                ready for live test and which still require completion. Lock-off status of any
                circuits not yet ready. Permit status if working under a permit-to-work regime.
              </li>
              <li>
                <strong>Defect register.</strong> Any items the installer flagged as needing
                attention before energisation — typically minor (a missing label, a tight grommet
                that needs adjustment) but always disclosed so nothing is hidden from the tester.
              </li>
              <li>
                <strong>Design Change Notes log.</strong> List of all DCNs raised during
                installation with reference numbers and brief description. The certifier will
                need this to record any departures or scope changes on the EIC.
              </li>
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

          <ContentEyebrow>Tester hand-over to certifier — Schedule of Test Results and witness sheets</ContentEyebrow>

          <ConceptBlock
            title="Schedule of Test Results, witness sheets, anomaly log"
            plainEnglish="The tester hands the certifier the completed Schedule of Test Results plus any contract-mandated witness sheets, an anomaly log of values that were unexpected, and a defect register of items requiring rectification under Reg 644.1.1."
            onSite="On a commercial project the witness sheets often dwarf the Schedule of Test Results in volume — every safety-critical test (RCD trip, Zs, IR) gets its own counter-signed sheet. On domestic the Schedule of Test Results alone is the standard. Either way, the tester\'s deliverable is the per-circuit measurement evidence base that the certifier signs against."
          >
            <p>Standard tester-to-certifier deliverables:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Completed Schedule of Test Results.</strong> Per-circuit row with
                identification, wiring data, OCPD data, dead-test readings, IR readings,
                polarity, Zs measured, RCD trip times, AFDD test results. The regulatory
                deliverable per Reg 642.4 and Section 644.
              </li>
              <li>
                <strong>Witness sheets (where spec requires).</strong> Counter-signed records
                for safety-critical tests — RCD trip time, Zs, IR. Typically signed by the
                testing electrician AND the witnessing engineer. Common on commercial,
                healthcare, public buildings and hazardous locations.
              </li>
              <li>
                <strong>Anomaly log.</strong> Readings that were unexpected — a Zs slightly
                higher than the design calculation, an IR reading lower than the rest of the
                installation, a borderline RCD trip time. Each anomaly investigated and noted
                with the conclusion (acceptable / requires further investigation / requires
                rectification).
              </li>
              <li>
                <strong>Defect register.</strong> Items requiring rectification before
                certification under Reg 644.1.1. Each defect logged with description,
                location, action required, action completed, retest result. Closed defects
                become part of the audit trail; open defects block the EIC issue.
              </li>
              <li>
                <strong>Instrument calibration certificates.</strong> Calibration certificates
                for the multifunction tester used (typically annual cal). Some specs require
                the tester to attach the cal cert to the test pack as evidence of measurement
                traceability.
              </li>
              <li>
                <strong>Test photographs.</strong> Photos of test setup, instrument readings,
                any unusual conditions. Increasingly common with phone-camera-equipped testers
                and cloud-based test recording. Provides an additional audit layer.
              </li>
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

          <ContentEyebrow>Certifier hand-over to customer — the O&M pack</ContentEyebrow>

          <ConceptBlock
            title="The Operations and Maintenance pack — full-chain documentation consolidated"
            plainEnglish="The certifier consolidates everything from the chain into a single Operations and Maintenance pack — design pack, as-built mark-ups, test results, signed EIC, manuals, BCCC, recommended maintenance schedule. This is what the customer keeps for the life of the installation."
            onSite="On commercial work the O&M can run to multiple bound volumes or a multi-gigabyte PDF set. On domestic it is typically a single folder or a bookmarked PDF. The contents are the same in principle — every step in the chain is in there, indexed and accessible."
          >
            <p>Standard O&M pack contents:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Signed EIC top-level.</strong> The certification document with all
                three role declarations signed.
              </li>
              <li>
                <strong>Schedule of Inspections.</strong> Visual checklist with every applicable
                item ticked or noted.
              </li>
              <li>
                <strong>Schedule of Test Results.</strong> Per-circuit measurement record.
              </li>
              <li>
                <strong>Design pack.</strong> Single-line diagrams, panel schedules, calculations,
                earthing arrangement spec. Marked up to as-built where deviations occurred.
              </li>
              <li>
                <strong>As-built drawings.</strong> Final marked-up drawings showing what was
                actually installed.
              </li>
              <li>
                <strong>Building Control Compliance Certificate.</strong> Or notification
                reference where the BCCC has not yet arrived from the scheme.
              </li>
              <li>
                <strong>Witness sheets.</strong> Where contract or spec required them.
              </li>
              <li>
                <strong>Departures log.</strong> Each departure documented with regulation
                number, alternative, reasoning, acceptance.
              </li>
              <li>
                <strong>Manufacturer manuals.</strong> For all installed equipment — RCBOs,
                AFDDs, EV chargers, SPDs, smart switches, BMS controllers, panel components.
              </li>
              <li>
                <strong>Recommended maintenance schedule.</strong> Periodic checks the
                duty-holder should carry out — RCD test routine, visual checks, recommended
                EICR interval.
              </li>
              <li>
                <strong>Commissioning test results.</strong> For functional commissioning
                beyond BS 7671 verification — interlocks, changeovers, BMS interfaces, fire
                alarm interfaces.
              </li>
              <li>
                <strong>Spare parts list.</strong> For commercial installations — recommended
                spares to hold for rapid maintenance response.
              </li>
              <li>
                <strong>Contractor and supplier contact directory.</strong> For warranty,
                fault response, future alteration projects.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Departure log — Reg 120.3 documenting where you depart from BS 7671"
            plainEnglish="BS 7671 allows departures from its own requirements where the design provides equivalent safety. Reg 120.3 in A4:2026 codifies this — every departure must be recorded on the EIC with the regulation departed from, the alternative provided, and the safety reasoning. The departure log is a formal part of the certification, not a footnote. Inspectors reading the certificate years later use the departure log to understand why the install does what it does."
            onSite="A typical departure: a customer's heritage building cannot accept BS 7671 522.6 cable burial depths because the walls are stone with no chase; the design uses surface conduit instead. The departure log records: 'Reg 522.6 — surface conduit substitution; mineral-filled steel conduit fitted to all exposed runs to provide equivalent mechanical protection; design accepted by [supervisor]'. The L3 apprentice does not personally sign departures (typically the certifier does) but should recognise when a departure is being made and that it needs documenting."
          >
            <p>
              Departure log standard structure:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Regulation departed from</strong> — exact reg
                number and a brief paraphrase of the requirement.
              </li>
              <li>
                <strong>Reason for departure</strong> — site condition,
                customer constraint, design choice that the regulation did
                not anticipate.
              </li>
              <li>
                <strong>Alternative provided</strong> — what was done
                instead, in enough detail that the next inspector can
                evaluate the equivalence.
              </li>
              <li>
                <strong>Safety reasoning</strong> — how the alternative
                provides equivalent or better safety than the
                regulation's stated method.
              </li>
              <li>
                <strong>Acceptance and signature</strong> — the
                designer's or certifier's confirmation that the departure
                is acceptable; lives on the EIC.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Witness sheets and the contractual sign-off chain"
            plainEnglish="On commercial and public-sector jobs the contract often specifies witness signatures on key tests — main switch operation, RCD trip times, generator changeover, fire alarm interface, emergency lighting duration. The witness is typically the client's engineer or a third-party commissioning agent. Witness sheets are a contractual deliverable; missing or unsigned sheets stall the final account and can delay the project handover by weeks."
            onSite="The L3 apprentice's role on witnessed tests is to know in advance which tests are witnessed (read the contract spec or the commissioning plan), schedule the witness with the office, set up the test cleanly so the witness can see the result clearly, and record the result on the witness sheet at the time. The witness signs the sheet; the original goes into the O&M pack; copies to the contractor's job file and the witness's records. Late or vague witness sheets are a project-management headache; on-the-day witnessing is the discipline that prevents it."
          >
            <p>
              Witness sheet workflow:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Identify witnessed tests</strong> — from the contract
                spec, the commissioning plan, the client's preferences;
                build the schedule before commissioning starts.
              </li>
              <li>
                <strong>Book the witness</strong> — client's engineer or
                third-party commissioning agent; typically requires
                advance notice.
              </li>
              <li>
                <strong>Set up the test cleanly</strong> — instrument
                calibration in date and visible, test point clearly
                marked, expected result understood, brief the witness on
                the test purpose and method.
              </li>
              <li>
                <strong>Record the result on the witness sheet</strong> —
                test description, instrument used, reading, pass / fail,
                date, witness signature, contractor signature.
              </li>
              <li>
                <strong>Distribute</strong> — original to O&M pack, copies
                to contractor file and witness's own records.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Digital twins and BIM — where commissioning paperwork is heading"
            plainEnglish="On larger commercial and public-sector projects the design and as-built records increasingly live in a Building Information Model (BIM). The BIM model carries the geometry, the schedule, the test results, the commissioning records and the maintenance schedule as linked attributes on each component. The L3 apprentice working on these projects encounters BIM through the site model viewer (typically Autodesk Construction Cloud, Trimble Connect, BIM 360) and the commissioning data input on tablets that feed straight into the model."
            onSite="On smaller domestic and light-commercial work, BIM is rarely used; the paperwork chain is paper or simple PDF. On bigger jobs (schools, hospitals, large commercial fit-outs) BIM is the medium and the L3 apprentice's commissioning data input on a tablet is part of the BIM workflow. The model captures: location of every accessory, model and serial of every device, test result against every test point, commissioning sign-off per circuit. The customer (typically the building's facilities team) uses the same model for ongoing maintenance — replace a faulty RCBO, the model knows where it is and what model goes in."
          >
            <p>
              BIM-aware commissioning workflow:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Tablet site app</strong> — Autodesk Construction
                Cloud, Trimble Connect, BIM 360; the apprentice's
                interface to the model on site.
              </li>
              <li>
                <strong>Component-level data input</strong> — each
                accessory has a unique ID; the test result is logged
                against the ID.
              </li>
              <li>
                <strong>Live as-built</strong> — changes recorded on
                the tablet update the model in near-real-time; no
                separate as-built mark-up step required.
              </li>
              <li>
                <strong>Handover artefact</strong> — the model itself is
                the O&M pack; the customer receives an export plus
                ongoing access to the live model.
              </li>
              <li>
                <strong>Future maintenance</strong> — facilities team
                uses the same model to plan and record maintenance;
                the install record stays current for the life of the
                building.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>What goes wrong on site</ContentEyebrow>

          <CommonMistake
            title="Skipping as-built mark-ups because the installation matched the design"
            whatHappens={
              <>
                Installer assumes the design was followed exactly and skips the as-built mark-up
                step. Two years later a fault develops on a circuit and the EICR inspector pulls
                the original drawings. The drawings show the kitchen ring routed via the back
                wall; the actual route is via the floor void. The inspector spends hours tracing
                the actual route, charges the customer for the extra time, and flags the
                discrepancy as a documentation defect on the EICR. The customer is annoyed; the
                contractor file shows no DCN explaining the change.
              </>
            }
            doInstead={
              <>
                Mark up every change, every time, even minor ones. A cable rerouted around an
                unforeseen joist; an accessory moved 30 cm to clear a worktop; a circuit
                renumbered for clarity at the CU. All of it goes on the as-built mark-up. Five
                minutes per change at the time saves hours of forensic tracing years later. On
                commercial work the principal designer typically requires as-built returns
                before accepting completion; on domestic it is the contractor\'s responsibility
                to maintain the standard.
              </>
            }
          />

          <CommonMistake
            title="Issuing the EIC without the certifier ever seeing the test results"
            whatHappens={
              <>
                On a busy job, the certifier (typically a senior electrician on a domestic
                contract) signs the EIC based on a verbal "all tested fine" from the testing
                electrician without reviewing the Schedule of Test Results. Months later a
                circuit fails an EICR retest with anomalous readings; the original Schedule of
                Test Results from your file shows the same anomaly was present at certification
                — a Zs reading 30% above the design value that should have triggered
                investigation. The certifier never saw it. Liability now sits with the
                certifier whose signature is on the EIC.
              </>
            }
            doInstead={
              <>
                Certifier reviews every Schedule of Test Results row before signing the EIC.
                Anomalies investigated. Defects rectified per Reg 644.1.1. Only then does the
                certifier sign. Verbal "all good" from the tester is not sufficient — the
                certifier\'s signature carries personal liability and the certifier needs to see
                the data they are certifying.
              </>
            }
          />

          <Scenario
            title="Domestic CU swap — chain compressed into one person, every link still present"
            situation={
              <>
                You are completing a domestic CU swap-out as a single self-employed electrician.
                Customer is the homeowner, owner-occupied, about to remortgage. 8 circuits,
                single-phase TN-C-S, all RCBOs (Type A 30 mA), measured Ze = 0.30 Ω. There is
                no separate designer, no separate testing electrician, no separate
                commissioning engineer — you are all four roles. How does the documentation
                chain compress?
              </>
            }
            whatToDo={
              <>
                <strong>Designer step (you).</strong> Before the job, write a one-page design
                note — RCBO selection (Type A 30 mA per Reg 411.3.3 for domestic
                socket-outlets), Zs target check against Table 41.3 for each new RCBO,
                earthing arrangement review (TN-C-S confirmed at intake; main earthing
                conductor 16 mm² per Table 54.7 for 25 mm² PME tails), main protective
                bonding review (10 mm² to gas and water, sized per Table 54.8). File this in
                the contractor cloud folder under the job reference.
                <br />
                <br />
                <strong>Installer step (you).</strong> Mark up the existing CU schedule with
                the new circuit numbers and any changes — circuits renumbered if RCBO
                arrangement changes, any accessory additions noted. Materials register =
                short list of brand/model of new CU, brand of RCBOs, batch numbers from
                packaging.
                <br />
                <br />
                <strong>Tester step (you).</strong> Complete the Schedule of Test Results
                per circuit — dead-test sequence (continuity, R1+R2, ring final readings, IR
                L-L/L-E/N-E), polarity at the CU, Zs measured at far end of each circuit,
                RCD trip times. Anomaly log: any reading that is unexpected gets a note (e.g.
                "C7 IR 1.2 MΩ — above 1 MΩ minimum but lower than rest of install; original
                rubber-sheath wiring on this circuit").
                <br />
                <br />
                <strong>Certifier step (you).</strong> Review your own Schedule of Test
                Results for sense (no transposed columns, no obviously wrong readings, no
                blank fields). Confirm Reg 644.1.1 — any defect on the new work corrected and
                retested. Sign the EIC declarations — designer, constructor, inspector — all
                in your name. Schedule of Inspections completed. Comments on existing
                installation captures the C7 IR observation. Recommended next inspection 10
                years.
                <br />
                <br />
                <strong>Customer step.</strong> Hand over the pack — printed EIC trio, BCCC
                pending notification, operational instructions, manuals for RCBOs, as-built
                schedule on CU door plus pack copy. Five-minute walk-through. Email PDF copy
                within the hour. Upload to NICEIC same day.
                <br />
                <br />
                <strong>Contractor file.</strong> Cloud copy of design note, mark-ups, photos,
                EIC pack PDF, NICEIC notification reference. Indefinite retention.
              </>
            }
            whyItMatters={
              <>
                The chain works exactly the same on a one-person job as on a 50-person
                commissioning event — the steps just collapse into one set of hands and one
                set of signatures. The discipline of separating the steps mentally even when
                you are doing all of them keeps the documentation defensible. Skipping the
                "designer" step ("I just know what to fit") leaves no design evidence for an
                audit. Skipping the "as-built" step ("the install matched what I planned")
                leaves a future EICR inspector hunting for cable routes that are not
                documented. Each step matters; each step lives in the file.
              </>
            }
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 132.1 framework (Regs 132.2–132.5 / 132.6–132.16)"
            clause={
              <>
                The information required as a basis for design is stated in Regulations 132.2 to
                132.5. The requirements to which the design shall conform are stated in
                Regulations 132.6 to 132.16. Designers shall therefore determine and record the
                information listed in 132.2–132.5 to demonstrate conformity with subsequent
                design requirements.
              </>
            }
            meaning={
              <>
                The design pack travels with the install through commissioning into the customer
                file. The Reg 132.1 framework (with the broader Chapter 13 architecture) specifies
                the information the designer must record — the inspector at handover, the next
                periodic inspector, and the duty holder all rely on the recorded data to verify
                the install matches the design intent.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Regulation 132.1 framework."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 133.1.3 (equipment usage on certification)"
            clause={
              <>
                Regulation 133.1.3 (Selection of equipment) has been modified and now requires
                that certain usage of equipment shall be recorded on the appropriate electrical
                certification specified in Part 6 of BS 7671. Designers, installers, and
                inspectors shall ensure that where BS 7671 calls for the usage of particular
                equipment to be identified, that usage is explicitly entered on the
                certification associated with the work covered by Part 6.
              </>
            }
            meaning={
              <>
                Commissioning paperwork is the home of these equipment-usage entries. Where the
                regulation calls out a specific role — for example open-PEN protection on an EV
                circuit or RCD type on a battery feed — the EIC has to record it. The next
                inspector relies on these entries to verify that the protective measures
                actually match the kit you fitted.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Regulation 133.1.3."
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Commissioning paperwork is a chain — designer (Reg 132.13 design pack) → installer (as-built mark-ups + materials register) → tester (Schedule of Test Results + witness sheets) → certifier (EIC top-level declarations) → customer (full O&M pack).",
              "On a single-person domestic job the chain compresses into one set of signatures on the EIC, but every logical step still exists — design notes, install record, test results, signed certification, customer pack.",
              "Designer hand-over to installer = design pack: single-line diagrams, panel schedules, calculations, OCPD spec, earthing arrangement, departures log.",
              "Installer hand-over to tester = as-built mark-ups, materials register, dead-test record, safe-isolation status, defect register, DCN log.",
              "Tester hand-over to certifier = completed Schedule of Test Results, witness sheets where spec requires, anomaly log, defect register, instrument calibration evidence.",
              "Certifier hand-over to customer = O&M pack consolidating everything — signed EIC, schedules, design pack, as-builts, BCCC, manuals, maintenance schedule, contact directory.",
              "Reg 132.13 spans the chain — design-side documentation flows from start to end, evolving at each link rather than being recreated at the end.",
              "Documentation chain integrity matters most years later — fault, sale, EICR, insurance claim, alteration. A weak link compromises the installation's defendability when it is needed most.",
            ]}
          />

          <Quiz title="Commissioning paperwork chain — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module5-section6-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                6.2 Customer handover pack and scheme upload
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module5-section6-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                6.4 EAWR + Building Regs + LABC notification
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
