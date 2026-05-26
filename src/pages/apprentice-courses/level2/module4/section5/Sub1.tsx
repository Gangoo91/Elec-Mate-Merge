/**
 * Module 4 · Section 5 · Sub 1 — Verify wiring systems conform to IET standards
 * Maps to City & Guilds 2365-02 / Unit 204 / LO5 / AC 5.1
 *   "Verify that wiring systems conform to IET standards"
 *
 * The dead inspection per BS 7671 Section 642. Visual + accessible parts WITHOUT
 * disturbing the install (where practicable). Pre-energisation — install fully
 * complete but not yet powered. Comprehensive checklist tied to BS 7671 chapters:
 * 526 (connections), 514 (identification), 522 (routing), 524 (CSA), 412 + 416
 * (barriers + enclosures), 514.16 + 537.2.2 (single-pole devices), 510s
 * (selection of accessories). Schedule of Inspections form (Appendix 6).
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
  'Verify wiring systems conform to IET standards (5.1) | Level 2 Module 4.5.1 | Elec-Mate';
const DESCRIPTION =
  'AC 5.1 — the dead inspection per BS 7671 Section 642. Visual checks on connections, identification, routing, conductor selection, barriers, accessories and notices, before any test instrument touches the board.';

const checks = [
  {
    id: 'inspection-vs-testing',
    question:
      'You are at the consumer unit on a finished first-fix domestic install. Which statement best separates inspection from testing under BS 7671 Part 6?',
    options: [
      'Inspection is the visual + accessible-parts walk-round, normally with the install disconnected from supply, and it precedes testing per Reg 642.1.',
      'Increase the proportion of study time allocated to electrical science while maintaining periodic H&S review',
      'The employer must identify and implement additional control measures immediately to reduce exposure below the WEL',
      'Fixed monthly payments, milestone billing, or a retainer that provides predictability while maintaining your rate',
    ],
    correctIndex: 0,
    explanation:
      'Reg 642.1 is explicit — inspection precedes testing and is normally carried out with the part of the installation under inspection disconnected from the supply. Inspection is the eyes-on, accessible-parts check. Testing comes after, with instruments. New installs and EICRs both follow the same Section 642 inspection rhythm.',
  },
  {
    id: 'single-pole-device',
    question:
      'You open up a switched-fuse spur and find the fuse is sitting in the neutral conductor instead of the line. The Schedule of Inspections item that catches this is:',
    options: [
      'One controller output operating two final control elements sequentially',
      'Disconnected from all sources of electrical energy and unable to become live unintentionally',
      'To reduce building CO2 emissions through improved energy performance beyond Building Regulations',
      'Item 8.0 — connection of single-pole devices for protection or switching in line conductors only.',
    ],
    correctIndex: 3,
    explanation:
      'Reg 642.3(e) and the matching Schedule of Inspections item check that single-pole devices — fuses, MCBs, single-pole switches — are connected in the line conductor only. A fuse in the neutral leaves the circuit live when the fuse blows and is a fail. This is one of the most common defects found by inspection on cheap or imported gear.',
  },
  {
    id: 'inspection-disturbance',
    question:
      'A finished consumer unit is taped up and labelled. The supervisor asks you to inspect the terminations on every RCBO without removing the busbar shroud. What is the right call?',
    options: [
      'Ensuring that consumer units, distribution boards, socket outlets, switches, trunking runs and conduit are installed level and plumb for a professional finish and correct operation',
      'Wind is intermittent — output varies with the weather, so dispatchable gas plants must be available to fill any gap and keep frequency at 50 Hz',
      'Inspect what is visible without disturbing the install where practicable, record any item where access was limited as a limitation in the Schedule of Inspections, and flag the supervisor.',
      'Adequate and appropriate equipment, facilities, and personnel to enable first aid to be given to employees who are injured or become ill at work',
    ],
    correctIndex: 2,
    explanation:
      'BS 7671 Section 642 inspection is visual and accessible-parts based — you do not break the install apart to inspect it where that is impracticable. The Schedule of Inspections has a "Limitation" code (LIM) for exactly this situation — inspect what you can, record what you could not access. Torque verification is a separate check carried out at first-fix terminations, not by un-taping a finished CU.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'BS 7671 Reg 642.1 says inspection shall normally be done:',
    options: [
      'To provide safety, visibility, and reassurance while occupants await assisted evacuation',
      'With the part of the installation under inspection disconnected from the supply, before testing.',
      'People who talk about suicide are just seeking attention and won\\\\\\\'t actually do it',
      'The schedule that prescribes what must be included in a scaffold inspection report',
    ],
    correctAnswer: 1,
    explanation:
      'Verbatim from Reg 642.1 — inspection shall precede testing and shall normally be done with that part of the installation under inspection disconnected from the supply. The whole point of dead inspection is that you can see, touch and walk round terminations without electric shock risk.',
  },
  {
    id: 2,
    question:
      'The Schedule of Inspections checklist item "connection of conductors" maps back to which BS 7671 section?',
    options: [
      'Section 514',
      'Section 522',
      'Section 526',
      'Section 411',
    ],
    correctAnswer: 2,
    explanation:
      'Section 526 covers electrical connections — Reg 526.1 in particular. Every termination at every accessory, at the consumer unit, in junction boxes and at appliance outlet points has to provide durable electrical continuity and adequate mechanical strength. The inspection item asks you to verify, by eye and by gentle tug-test where practicable, that this is the case.',
  },
  {
    id: 3,
    question:
      'Reg 642.3 lists items the inspection shall include "where relevant". Which of the following is NOT in that list?',
    options: [
      'Identification of conductors.',
      'Connection of conductors.',
      'Selection of equipment and protective measures appropriate to external influences.',
      'The disconnection time for an L-N fault on the ring final.',
    ],
    correctAnswer: 3,
    explanation:
      'Disconnection time is a calculated / tested value — it lives in the testing stage (Reg 643) and on the Schedule of Test Results, not the Schedule of Inspections. Reg 642.3 lists visual / verification items only. Confusing inspection items with test results is one of the easiest ways to fail an Schedule of Inspections walk-through at college.',
  },
  {
    id: 4,
    question:
      'The IET model Schedule of Inspections lets you record each item with a code. Which code do you use for an item that does not apply to the installation under inspection?',
    options: [
      'N/A',
      '✓',
      'LIM',
      '✗',
    ],
    correctAnswer: 0,
    explanation:
      'N/A means the item is not applicable to this installation — for example, "earth electrode" on a TN-C-S supply, or "main bonding to oil" on a building with no oil supply. LIM means the item applies but you could not access it. ✓ means it was inspected and complies. ✗ means non-compliant and must be reported.',
  },
  {
    id: 5,
    question:
      'You are inspecting a new domestic CU. The label "Caution: this installation has wiring colours to two versions of BS 7671. Great care should be taken before undertaking extension, alteration or repair" is a requirement under:',
    options: [
      'Business skills, insurance, and scheme registration',
      'Reg 514 — identification, including warning notices.',
      'To describe how a task will be carried out safely',
      'Manufacturing plants, factories, and heavy industry',
    ],
    correctAnswer: 1,
    explanation:
      'Section 514 covers identification and warning notices — including the mixed-cable-colours notice (514.14), the periodic inspection notice (514.12), the RCD test notice (514.12.2) and the bonding label (514.13). The inspection step verifies these notices are present, legible and correct for the install.',
  },
  {
    id: 6,
    question:
      'Reg 642.2 says the inspection shall verify the equipment is "correctly selected and erected in accordance with BS 7671, taking into account":',
    options: [
      'The customer&rsquo;s preferences.',
      'The price list at the wholesaler.',
      'Manufacturers&rsquo; instructions.',
      'The previous installation on the same site.',
    ],
    correctAnswer: 2,
    explanation:
      'Reg 642.2(b) requires the inspection to verify the equipment is correctly selected and erected in accordance with BS 7671 taking into account manufacturers&rsquo; instructions. RCBOs, AFDDs, SPDs, surge devices and modern luminaires all have specific install requirements in their instructions — torque values, orientation, terminal grouping, ambient temperature limits — and the inspection is where you verify those have been followed.',
  },
  {
    id: 7,
    question:
      'On a finished install you find the line conductor of a lighting circuit landed in the neutral terminal of a switched ceiling rose, with the neutral landed in the line terminal. This is a:',
    options: [
      'A reference line on the wall at a known height (typically 1 m above FFL) from which other heights are measured.',
      'Regular cannabis use, particularly high-strength varieties, is linked to increased risk of anxiety, depression, and psychosis',
      'Any person who controls the work of others, including employers, the self-employed and those who control others\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\' work',
      'Polarity defect — would normally be caught at testing (Reg 643.6) but the inspection item "identification of conductors" should also catch it visually.',
    ],
    correctAnswer: 3,
    explanation:
      'Polarity reversal at an accessory is a defect — the lamp may still light, but the switch will leave the lamp permanently live, which is a shock risk during lamp changes. Inspection (Section 642) and testing (Reg 643.6 polarity) both target this — inspection by checking conductor identification at every accessory, testing by instrument verification.',
  },
  {
    id: 8,
    question:
      'You have completed a Section 642 inspection on a new install. Two items are LIM (limitations — could not access), one item is ✗ (non-compliant) and the rest are ✓. The next step is:',
    options: [
      'Hand the Schedule of Inspections to the supervisor for review, fix the ✗ item, decide whether to record the two LIM items as observations on the EIC or revisit them, then proceed to Section 6 dead testing.',
      'An uncontrolled release or escape of a substance that could cause injury (e.g., a counterweight falling from a crane being used for work at height)',
      'Regularly reporting to the board on mental health KPIs including sickness absence, EAP utilisation, staff survey wellbeing scores, MHFA interaction data, and benchmarking against sector norms',
      'BS 7671 provides one means of complying with the EAWR, but compliance with BS 7671 does not guarantee compliance with the EAWR in all circumstances',
    ],
    correctAnswer: 0,
    explanation:
      'A non-compliant item must be rectified before the install is energised — that is the whole point of inspection-before-energisation. LIM items get flagged to the supervisor and either revisited (preferred) or recorded as a limitation on the certificate. Only once everything is ✓ or recorded as a limitation does dead testing begin (Section 6 / Sub 5.3). The EIC cannot be issued until both inspection and testing are complete.',
  },
];

const faqs = [
  {
    question: 'What exactly is the difference between inspection and testing in BS 7671 Part 6?',
    answer:
      'Inspection (Section 642) is visual and accessible-parts based — eyes, hands and a torch, with the installation disconnected from the supply. Testing (Section 643) is instrument-based — your low-resistance ohmmeter, insulation resistance tester, RCD tester and earth fault loop impedance tester. Reg 642.1 fixes the order — inspection comes first because there is no point pushing test current through a circuit that is visibly mis-wired or has a loose termination. Section 5 of Module 4 covers the inspection. Section 6 covers the testing.',
  },
  {
    question:
      'Do I really inspect "without disturbing the install"? What if I cannot see what I need to?',
    answer:
      'Where practicable, yes. The principle is that you should not have to dismantle a finished install to inspect it — that would just create new defects. So you check what is accessible (terminations at the CU with the cover off, accessory back-boxes during second-fix, junctions before they are made permanent, cable runs in containment before the lid goes on). Where access is genuinely limited — say, terminations behind a sealed busbar shroud — you record a LIM in the Schedule of Inspections and flag it to the supervisor. Most inspections on a new install happen alongside the build, not after the fact.',
  },
  {
    question:
      'AC 5.1 says "verify that wiring systems conform to IET standards" — what is the actual checklist?',
    answer:
      'Reg 642.3 spells it out — twenty-plus items grouped under headings: connection of conductors (526), identification of conductors (514), routing of cables in prescribed zones or with mechanical protection (522), selection of conductors for current-carrying capacity and voltage drop (524), connection of single-pole devices in line conductors only (514.16 + 537.2.2), correct connection of accessories and equipment, presence of fire barriers and seals, methods of protection against electric shock (basic + fault + additional), labelling of protective devices, presence of warning notices and diagrams, selection appropriate to external influences, adequacy of access to switchgear, presence of SPDs where required. Sub 5.2 walks every one in order against the IET model form.',
  },
  {
    question: 'My supervisor told me to "tug-test" every termination during inspection. Is that a thing?',
    answer:
      'Yes — for first-fix terminations, before they are buried in plaster or hidden by the accessory faceplate, a gentle controlled tug on each conductor at each terminal is the standard apprentice habit. It catches loose terminals (the chocbox screw that bottomed out on the insulation, the back-of-socket terminal that was not fully tightened, the ferrule that did not crimp properly). Once the install is finished and the faceplate is on, you do not generally re-open it just to tug — by then it should be the calibrated screwdriver torque setting that has done the job. Tug-testing is a build-time habit; visual inspection is the inspection-time check.',
  },
  {
    question:
      'How do I record an item that "passes" but only because of a workaround — say, a cable in a non-prescribed zone but RCD-protected?',
    answer:
      'You record it as ✓ because it complies — the inspection item is asking whether the wiring system meets BS 7671, not whether it took the simplest route. The "how" lives in the EIC description (the route diagram, any noted deviation, the protective measure that makes it compliant). Reg 522.6.202 explicitly allows non-prescribed-zone cables in walls if RCD additional protection is provided, so a cable run direct between accessories — outside the prescribed zone but on a 30 mA RCBO — is a ✓, not a LIM and not a ✗. The Schedule of Inspections is binary on compliance, not on routing elegance.',
  },
  {
    question: 'How does this Sub at Level 2 differ from EICR inspection on the I&T qualification?',
    answer:
      'At Level 2 the inspection is on a new install, dead, before energisation, on something you (or your team) have just built. You know what was put in and you are verifying it is correct. The I&T qualification (2391 / 2392 series) covers periodic inspection and condition reporting on existing installs — same Section 642 framework but with added complexity around historical wiring colours, deviations from the regs in force at the time of installation, condition coding (C1/C2/C3/FI) and writing observations and recommendations. Get this Sub solid and the I&T course inspection module is mostly familiar territory with extra paperwork.',
  },
];

const inspectionChecklist = [
  {
    chapter: '526',
    item: 'Connection of conductors',
    visual:
      'Every termination — at the consumer unit, accessories, joints, equipment — secure, no copper showing past the terminal, no insulation trapped inside the terminal, sleeving present on the bare CPC at every point.',
  },
  {
    chapter: '514',
    item: 'Identification of conductors',
    visual:
      'Brown / blue / green-yellow throughout. Old colours sleeved or labelled where present. Switched lives identified with brown sleeving at both ends. Phase identification on three-phase circuits.',
  },
  {
    chapter: '522',
    item: 'Routing of cables (prescribed zones / mechanical protection)',
    visual:
      'Cables in walls run vertically from / horizontally to accessories within prescribed zones, or RCD-protected per Reg 522.6.202, or in metallic containment giving mechanical protection.',
  },
  {
    chapter: '524',
    item: 'Selection of conductors (CSA + voltage drop)',
    visual:
      'Cable CSA matches the design on the schedule — 1.5 mm² lighting, 2.5 mm² rings, 4 mm² 32 A radials, 6 mm² showers, 10 / 16 / 25 mm² bonding. CSA matches device rating per Reg 433.1.1.',
  },
  {
    chapter: '514.16 / 537.2.2',
    item: 'Single-pole devices in line conductors only',
    visual:
      'Every fuse, MCB, single-pole switch is in the line conductor — never the neutral. Includes switched FCUs, lighting switches, and any in-line fuses on appliance circuits.',
  },
  {
    chapter: '510s',
    item: 'Correct connection of accessories and equipment',
    visual:
      'Sockets, switches, lighting points, FCUs, RCBOs all wired to the manufacturer&rsquo;s diagram — line on L, neutral on N, earth on E. Loop-in lighting wired correctly. No mixing of switched and permanent live in the same terminal.',
  },
  {
    chapter: '527',
    item: 'Fire barriers and seals',
    visual:
      'Fire-rated barriers reinstated where cables cross fire compartments. Intumescent collars on penetrations through fire-rated floors / walls. No open holes in fire-stopping.',
  },
  {
    chapter: '410 + 415',
    item: 'Protection against electric shock (basic + fault + additional)',
    visual:
      'Live parts insulated, contained in enclosures (Class I) or double-insulated (Class II). CPCs run to every Class I exposed-conductive-part. 30 mA RCD additional protection on circuits required by Reg 411.3.3, 411.3.4, 522.6.202.',
  },
  {
    chapter: '514.12 / 514.13',
    item: 'Labelling of protective devices, switches, terminals',
    visual:
      'Every way at the CU labelled with circuit description. Main switch labelled. Periodic inspection notice fitted. RCD test notice fitted. Bonding clamps carry the BS 951 "Safety Electrical Connection" label.',
  },
  {
    chapter: '443 / 534',
    item: 'Presence of SPDs where required',
    visual:
      'SPD fitted at the origin (Type 2 typical at small commercial CU). Connecting conductor 6 mm² minimum (Reg 534.4.10), kept short, connected to the MET and the line conductor. No missing or removed SPD modules.',
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
            onClick={() => navigate('..')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 5
          </button>

          <PageHero
            eyebrow="Module 4 · Section 5 · Subsection 1"
            title="Verify wiring systems conform to IET standards"
            description="The dead inspection per BS 7671 Section 642. Visual checks on connections, identification, routing, conductor selection, barriers, accessories and notices — before any test instrument touches the board."
            tone="emerald"
          />

          <TLDR
            points={[
              'Reg 642.1 — inspection precedes testing and is normally carried out with the install disconnected. You inspect what is visible and accessible without disturbing the install where that is impracticable.',
              'Reg 642.3 lists the inspection items — each one maps back to a BS 7671 chapter (526 connections, 514 identification, 522 routing, 524 CSA, 514.16 single-pole devices, 410 / 415 shock protection, 514.12 / 514.13 labels, 443 / 534 SPDs).',
              'AC 5.1 — verify wiring systems conform to IET standards — is exactly this Section 642 inspection. The Schedule of Inspections (Appendix 6, walked in Sub 5.2) is the form you fill in to evidence it.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Explain the inspection-before-testing principle from BS 7671 Reg 642.1 and why dead inspection happens before energisation.',
              'List the inspection items required by Reg 642.3 and map each one back to the relevant BS 7671 chapter.',
              'Carry out a structured visual inspection of a new domestic or small commercial install before energisation.',
              'Distinguish inspection (visual, dead) from testing (instrument-based, dead then live) and explain why both are needed.',
              'Use the IET model Schedule of Inspections codes (✓, N/A, LIM, ✗) correctly to record findings.',
              'Decide which inspection items are limited (LIM) by access, which are non-compliant (✗) and how each is communicated to the supervisor before energising.',
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock
            title="Inspection — the eyes-on stage that comes before any test instrument"
            plainEnglish="Once the install is finished — every cable run, every termination, every accessory faceplate on, every CU way labelled — but before you energise it, you walk it. Cover off the CU. Faceplates loose so you can see terminations. Torch in hand. Schedule of Inspections form on the clipboard. You verify what you can see, in a fixed order, against BS 7671. Then and only then do you start testing."
            onSite="On a new install you usually inspect as you build — first-fix terminations get checked before they are buried, second-fix accessories get checked before the faceplate goes on. The final inspection at the CU is the last gate before energising. On an EICR or remedial job, the inspection is the first thing you do once safe isolation is verified."
          >
            <p>
              <strong>Why inspect at all?</strong> Because most defects on a finished install
              are visible to the eye before any instrument is connected. A loose terminal,
              a missing CPC sleeve, an unlabelled CU way, a fuse in the neutral — none of
              these need a test instrument to spot. Catching them at inspection is cheap;
              catching them at testing means re-opening the work; catching them after
              energising means a fault, a callback or worse.
            </p>
            <p>
              <strong>Why dead?</strong> Because you cannot safely walk a CU with the cover
              off and your eyes on terminations if those terminations are at 230 V. Reg 642.1
              is explicit — inspection is normally done with the part of the install under
              inspection disconnected from the supply.
            </p>
            <p>
              <strong>What does "visible and accessible" actually mean?</strong> You inspect
              what you can see and reach without dismantling the install. CU terminations
              with the cover off — yes. Accessory terminations during second-fix — yes.
              Cable runs in containment before the lid goes on — yes. The terminations on
              an RCBO buried under a busbar shroud on a finished CU — that is a Limitation
              (LIM), and you record it as such.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 642.1 (Inspection — General)"
            clause="Inspection shall precede testing and shall normally be done with that part of the installation under inspection disconnected from the supply."
            meaning={
              <>
                Reg 642.1 is the regulation that fixes the order. Inspection is first,
                testing is second. Both are done dead — testing then continues with the
                install energised for the live tests (loop impedance, RCD trip times,
                functional checks, prospective fault current). The reason is safety —
                you cannot reasonably inspect terminations and accessory wiring with the
                circuit live, and you cannot reasonably test continuity or insulation
                resistance with it live either.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 6, Chapter 64, Regulation 642.1."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 642.2 (Inspection — Verification objectives)"
            clause="The inspection shall be made to verify that the installed electrical equipment is: (a) in compliance with the requirements of Section 511 (this may be ascertained by mark or by certification furnished by the installer or the manufacturer); and (b) correctly selected and erected in accordance with BS 7671, taking into account manufacturers' instructions; and (c) not visibly damaged or defective so as to impair safety."
            meaning={
              <>
                Reg 642.2 is the three-part question you are answering at every inspection
                step. (a) Is the kit itself the right kit — BS / BS EN marked, CE / UKCA
                marked, fit for the job? (b) Has it been installed correctly per BS 7671
                AND per the manufacturer&rsquo;s instructions — torque values, orientation,
                terminal grouping, ambient limits? (c) Is anything visibly broken,
                cracked, damaged or worn so as to compromise safety? Every Schedule of
                Inspections item is one slice of those three questions.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 6, Chapter 64, Regulation 642.2."
          />

          <SectionRule />

          <ContentEyebrow>The 642.3 inspection checklist — chapter by chapter</ContentEyebrow>

          <ConceptBlock
            title="Reg 642.3 — what shall be inspected, where relevant"
            plainEnglish="Reg 642.3 lists every item the inspection shall include. Each item maps back to a BS 7671 chapter — the chapter sets the rule, the inspection item verifies it. Below is the working checklist with the chapter cross-reference and what to look at."
            onSite="In real life this is the back of your clipboard or the screen of your tablet on the way round the install. Tick or LIM each item as you go. Anything that is non-compliant (✗) gets fixed before energising — non-negotiable."
          >
            <div className="space-y-2.5">
              {inspectionChecklist.map((row) => (
                <div
                  key={row.chapter}
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5"
                >
                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-2 mb-2.5">
                    <div className="flex items-baseline gap-2.5">
                      <span className="text-elec-yellow font-semibold text-[13px] tracking-wider">
                        Ch {row.chapter}
                      </span>
                      <span className="text-white text-[14px] font-medium">
                        {row.item}
                      </span>
                    </div>
                  </div>
                  <p className="text-[13px] text-white/85 leading-relaxed">
                    {row.visual}
                  </p>
                </div>
              ))}
            </div>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 642.3 (Inspection — items to be checked)"
            clause="The inspection shall include at least the checking of the following items where relevant: (a) connection of conductors; (b) identification of conductors; (c) routing of cables in prescribed zones, or protection against mechanical damage, in compliance with Section 522; (d) selection of conductors for current-carrying capacity and voltage drop, in accordance with the design; (e) connection of single-pole devices for protection or switching in line conductors only; (f) correct connection of accessories and equipment; (g) presence of fire barriers, suitable seals and protection against thermal effects; (h) methods of protection against electric shock; (i) prevention of mutual detrimental influence; (j) presence of appropriate devices for isolation and switching correctly located; (k) presence of undervoltage protective devices; (l) labelling of protective devices, switches and terminals; (m) selection of equipment and protective measures appropriate to external influences; (n) adequacy of access to switchgear and equipment; (o) presence of danger notices and other warning signs; (p) presence of diagrams, instructions and similar information; (q) selection and erection of wiring systems; (r) erection methods; (s) selection and installation of suitable SPDs where required; (t) measures against electromagnetic disturbances. The inspection shall include all particular requirements for special installations or locations (Part 7)."
            meaning={
              <>
                Reg 642.3 is the master list. At Level 2 you are not expected to memorise
                all twenty items verbatim, but you are expected to recognise each one on the
                Schedule of Inspections, know what BS 7671 chapter it maps to, and know
                what to look at to verify it. Items (a)–(g) are the workmanship items —
                what most apprentice inspections focus on. Items (h)–(t) are the design
                and presentation items — what the supervisor signs off on the EIC.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 6, Chapter 64, Regulation 642.3."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Inspection rhythm — how a real walk-round flows</ContentEyebrow>

          <ConceptBlock
            title="Start at the origin, work outwards, finish at the furthest accessory"
            plainEnglish="A structured inspection follows the install. Start at the origin (cut-out, meter tails, MET, main bonding, CU). Work along each circuit in order — distribution board → cable run → first accessory → next accessory → final accessory. Finish with the notices and labels."
            onSite="Pick the same order every time. The minute you start jumping around the install you miss things. The Schedule of Inspections is laid out in roughly this order — follow it."
          >
            <p>
              <strong>Origin (Items 1.0 – 2.0):</strong> Distributor&rsquo;s cut-out, meter
              tails (CSA + sheath + sleeving + termination at MET / switch), MET clearly
              identified, earthing conductor present and to the right CSA for the supply
              type. Main switch labelled. Main bonding clamps to gas / water / oil /
              structural steel within 600 mm of the meter, all BS 951 labels in place.
            </p>
            <p>
              <strong>Distribution (Items 3.0 – 10.0):</strong> CU way labels match the
              circuit schedule. RCBOs / MCBs / RCDs present and of the right type per the
              design. AFDDs where Reg 421.1.7 requires. SPD present where Section 443
              requires. Single-pole devices in line conductors only. Every termination
              inside the CU secure, no copper showing past the terminal, no insulation
              trapped, CPCs sleeved and to the earth bar.
            </p>
            <p>
              <strong>Circuit walk (Items 11.0 – 13.0):</strong> Cable runs visible in
              containment — supports at the right intervals, no kinks, bend radii
              respected, no damage to sheath. Containment grounded where it needs to be.
              Accessories — every back-box grommet in, no copper showing, CPC sleeved at
              every point including the back-box flying lead on a metal box. Faceplate
              fixings tight, alignment good.
            </p>
            <p>
              <strong>Bonding and earthing (Items 11.0 – 13.0):</strong> Earthing conductor
              continuous from MET to consumer unit. Main bonding clamps clean, on bright
              metal, BS 951 label visible. Supplementary bonding present where required
              (older bathrooms, certain locations Part 7). CPC continuity at every accessory.
            </p>
            <p>
              <strong>Notices and labels (Items 9.0 + 14.0 onwards):</strong> Periodic
              inspection notice. RCD test notice (if RCDs present). Mixed-cable-colours
              notice if the install has both old and new colours. Photovoltaic notice if
              PV is connected. EV charging notice if applicable. CU way labels legible
              and matching the circuit schedule.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Recording findings — the four codes</ContentEyebrow>

          <ConceptBlock
            title="✓ / N/A / LIM / ✗ — every item gets one"
            plainEnglish="Every line of the Schedule of Inspections gets one of four marks. ✓ means inspected and complies. N/A means the item does not apply to this install (e.g. earth electrode on a TN-C-S supply). LIM means the item applies but you could not access it. ✗ means non-compliant — must be reported and fixed."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>✓ — Compliant.</strong> You inspected the item, it meets BS 7671,
                you are happy with it. Most items on a well-built new install end up here.
              </li>
              <li>
                <strong>N/A — Not applicable.</strong> The item does not apply to this
                installation. "Earth electrode" on TN-C-S. "Main bonding to oil" on a gas
                house. "Supplementary bonding" in a modern bathroom on a 30 mA RCD with
                no extraneous-conductive-parts. Always think before marking N/A — sometimes
                an item that looks N/A is actually a missed requirement.
              </li>
              <li>
                <strong>LIM — Limitation.</strong> The item applies but you could not
                access it without dismantling the install. Sealed busbar shrouds, buried
                cable runs after the wall is plastered, terminations behind a fixed
                appliance. Record clearly what was limited and why, and flag the
                supervisor — they may decide to revisit it or accept the limitation on
                the EIC.
              </li>
              <li>
                <strong>✗ — Non-compliant.</strong> The item fails the inspection. Loose
                terminal, missing CPC, fuse in neutral, no main bonding clamp on the gas
                pipe. Must be reported, fixed, re-inspected. The install does not get
                energised until every ✗ is resolved.
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

          <ContentEyebrow>Methods of protection against electric shock — Reg 642.3(h)</ContentEyebrow>

          <ConceptBlock
            title="Inspection of basic + fault + additional protection"
            plainEnglish="Reg 642.3(h) breaks shock protection into three layers and the inspection covers each. Basic protection — insulation of live parts, enclosures. Fault protection — automatic disconnection of supply (CPCs, RCDs, MCBs). Additional protection — 30 mA RCD where Reg 411.3.3, 411.3.4 or 522.6.202 require it."
            onSite="On a domestic CU inspection you are looking at all three layers in the same walk-round. Live parts not exposed (enclosures complete, no missing knockouts). CPCs to every Class I exposed-conductive-part. 30 mA RCBOs on every socket up to 32 A and every cable in walls without prescribed-zone protection."
          >
            <p>
              <strong>Basic protection (preventing contact with normally-live parts):</strong>
              {' '}Live parts insulated. Enclosures complete — CU lid in place once inspection
              is done, no missing busbar shrouds (or recorded as LIM if you cannot inspect
              behind), no missing knockouts in metal accessory boxes, accessory faceplates
              not cracked or missing.
            </p>
            <p>
              <strong>Fault protection (automatic disconnection of supply):</strong> Every
              Class I exposed-conductive-part connected to the CPC system (Reg 411.3.1.1).
              Protective devices of correct type and rating per the design. RCDs / RCBOs
              / MCBs / AFDDs all installed correctly, not bypassed, not modified.
            </p>
            <p>
              <strong>Additional protection (30 mA RCD as a backstop):</strong> Reg 411.3.3
              — 30 mA RCD on socket outlets up to 32 A in any installation. Reg 411.3.4 —
              30 mA RCD on AC final circuits supplying luminaires in domestic premises.
              Reg 522.6.202 — 30 mA RCD on cables in walls outside prescribed zones.
              Reg 415.1.1 in special locations (bathrooms, swimming pools, certain Part 7
              applications).
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Equipment selection vs external influences — Reg 642.3(m)</ContentEyebrow>

          <ConceptBlock
            title="Right kit for the right environment"
            plainEnglish="The inspection verifies that every accessory and enclosure is rated for the environment it sits in. A bathroom socket has a different IP rating from a kitchen socket, which has a different rating from a shed socket. Get the rating wrong and the install is non-compliant before it is energised."
            onSite="Run a quick mental sweep of the install. Indoor dry — IP2X minimum is fine. Bathroom Zone 1 — IP65 minimum. Outdoor under a soffit — IP44 minimum. Outdoor exposed — IP65 minimum. Kitchen near sink — IP44 recommended. Industrial / workshop — IP65 + IK rating for impact. Each accessory faceplate carries its IP rating; verify before fitting and verify again at inspection."
          >
            <p>
              <strong>Common mistakes the inspection catches:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                IP2X kitchen socket fitted within 600 mm of a sink. Should be IP44 minimum.
              </li>
              <li>
                Standard plastic faceplate fitted in a workshop where regular impact is
                likely. Should be IK-rated metal-clad.
              </li>
              <li>
                Indoor luminaire fitted in an outdoor / damp location. Should be IP-rated
                for the environment.
              </li>
              <li>
                Standard accessory in a Zone 1 bathroom location. Section 701 is specific
                — IP X4 minimum, with additional restrictions on the type of accessory
                permitted.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Surge Protective Devices — Reg 642.3(s)</ContentEyebrow>

          <ConceptBlock
            title="Inspection of SPDs — presence, type, and connection"
            plainEnglish="A4:2026 reinforces SPD requirements. Reg 443.4 makes SPDs the default unless a documented BS EN 62305 risk assessment says otherwise. The inspection checks the SPD is present, the right type for the location, and connected correctly."
            onSite="On most domestic and small commercial CUs you will find a Type 2 SPD at the origin. Type 1 only on buildings with external lightning protection or exposed overhead supply. Inspection looks at: SPD modules in place (none removed or end-of-life), SPD status indicators showing healthy, connecting conductor 6 mm² minimum per Reg 534.4.10, kept short, connected to MET and to line."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Presence:</strong> SPD fitted at the origin. None removed during
                second-fix or maintenance.
              </li>
              <li>
                <strong>Type:</strong> Type 2 typical for small commercial / domestic CU.
                Type 1 where building has BS EN 62305 lightning protection or exposed
                overhead supply. Type 3 for downstream sensitive equipment (in addition
                to upstream Type 2).
              </li>
              <li>
                <strong>Status:</strong> Modules indicate healthy (typically a green flag
                or LED). End-of-life indicators (red flag) mean the SPD has absorbed a
                surge and needs replacement — this is a non-conformance.
              </li>
              <li>
                <strong>Connection:</strong> 6 mm² minimum connecting conductor per Reg
                534.4.10, as short as practicable, connected to the MET and the line
                conductor.
              </li>
              <li>
                <strong>Notice:</strong> SPD warning notice fitted where required —
                informs maintenance staff that the SPD will isolate certain circuits if
                it fails closed.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Special locations — Part 7 inspections</ContentEyebrow>

          <ConceptBlock
            title="Inspection items unique to special locations"
            plainEnglish="Reg 642.3 ends with &lsquo;The inspection shall include all particular requirements for special installations or locations (Part 7).&rsquo; Bathrooms (Section 701), swimming pools (702), saunas (703), construction sites (704), agricultural (705), conducting locations (706), caravans (708 / 721), marinas (709), medical (710), photovoltaic (712), EV (722), heating cables (753) and several more."
            onSite="At Level 2 the most common Part 7 location you will encounter is bathrooms (701). Inspection items there: zone classification correct, IP ratings correct per zone, supplementary bonding present where required (or 30 mA RCD covers the whole installation as the alternative), no socket outlets in Zones 0/1/2 (with limited exceptions for SELV / shaver sockets)."
          >
            <p>
              <strong>Bathroom inspection (Section 701) — typical items:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Zone 0 (inside the bath) — only SELV equipment specifically designed for
                Zone 0. No mains accessories, no luminaires.
              </li>
              <li>
                Zone 1 (above the bath up to 2.25 m) — IP X4 minimum, only SELV / fixed
                equipment specifically suitable for Zone 1.
              </li>
              <li>
                Zone 2 (extending 0.6 m horizontally from Zone 1) — IP X4 minimum, fixed
                equipment, restricted accessories.
              </li>
              <li>
                Outside zones — standard accessories (with the whole bathroom on a 30 mA
                RCD per Reg 415.1.1).
              </li>
              <li>
                Supplementary bonding (Reg 701.415.2) — only required if an extraneous-
                conductive-part is present that does not have main bonding to the MET,
                AND 30 mA RCD additional protection is not provided across the whole
                bathroom.
              </li>
            </ul>
            <p>
              <strong>EV charger inspection (Section 722) — typical items:</strong> Type B
              RCD or Type A with integrated DC RCM in the charger; cable type appropriate
              to route (SWA buried, T&E indoors); EV charger location accessible; EV
              warning notice present; bonding back to MET if required by the
              manufacturer&rsquo;s instructions.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The apprentice&rsquo;s role on a real inspection</ContentEyebrow>

          <ConceptBlock
            title="What an apprentice actually does at inspection"
            plainEnglish="At Level 2 you are not signing off the inspection — your supervisor or a more senior electrician is. Your job is to assist, learn the rhythm, run the checklist alongside them, and start to spot defects yourself. By the end of Level 3 you are leading the inspection on a small install."
            onSite="The single biggest thing you can do is shut up and watch the first few times. Once you have seen a senior electrician walk a CU inspection in the same order, with the same rhythm, you will start to spot the same things. Then you start running the checklist out loud while they do the work. Then you do it and they check. That is how the skill builds."
          >
            <p>
              <strong>Phase 1 — observe.</strong> First few inspections, you carry the
              clipboard, hold the torch, write down what the senior electrician calls out.
              You watch the order they go in. You notice what they pause at and look closely
              at. You ask why after, not during.
            </p>
            <p>
              <strong>Phase 2 — assist.</strong> You start running the Schedule of
              Inspections form yourself — calling out each item, the senior electrician
              verifies it. You are catching the obvious defects yourself by this point —
              missing CPC sleeve, unlabelled way, loose terminal — and flagging them to
              be fixed.
            </p>
            <p>
              <strong>Phase 3 — lead with sign-off.</strong> Towards the end of Level 2 /
              into Level 3, you are running the inspection on a small install yourself,
              filling out the Schedule of Inspections, then handing it to the supervisor
              for review and counter-signature. By Level 3 portfolio time, leading two
              or three full inspections under supervision is exactly what the qualification
              wants to see.
            </p>
            <p>
              <strong>Phase 4 — sign off independently.</strong> Once qualified and on the
              tools, you can sign off your own inspections on installs you have built or
              supervised. EICR work has its own additional certification pathway.
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

          <CommonMistake
            title="Confusing inspection (visual, dead) with testing (instrument-based, dead then live)"
            whatHappens={
              <>
                You hear "inspection and testing" lumped together so often that you start
                to think they are the same thing. So at the inspection stage you bring out
                the multifunction tester, plug it in, and start measuring continuity. You
                tick the inspection items based on test results — "loop impedance is fine
                so identification of conductors must be fine". You skip the actual visual
                walk-round because the instrument tells you the circuit works.
              </>
            }
            doInstead={
              <>
                Keep them separate. Inspection (Section 642) is eyes, hands, torch — no
                instrument. You verify what you can see and access. <strong>Testing
                (Section 643) is the instrument stage — and it only happens after inspection
                is complete and signed off.</strong> Reg 642.1 is unambiguous about the
                order. Plenty of defects only show up at the visual inspection — fuse in
                the neutral, missing CPC sleeve, wrong RCD type, missing notice — and
                an instrument will not catch any of those. You do both because they catch
                different things.
              </>
            }
          />

          <Scenario
            title="First-fix domestic CU — your supervisor hands it to you and says &lsquo;inspect it&rsquo;"
            situation={
              <>
                Friday morning. The CU has just been mounted on the wall in a new-build
                three-bed semi. The team has wired in eleven circuits — six lighting (two
                upstairs / two downstairs / hall + landing / external), three socket rings
                (upstairs / downstairs / kitchen), two dedicated radials (cooker / shower).
                Every cable is in, every terminal is landed, every way is labelled. The
                CU cover is off. The Schedule of Inspections is on the clipboard. Your
                supervisor says "inspect it — I&rsquo;ll be back in 20 minutes". The
                installation is dead — no incomer connection yet.
              </>
            }
            whatToDo={
              <>
                Start at the origin. Tails into the main switch — CSA correct, sheath
                stripped to the right point, no copper past the terminals, sleeve at the
                CPC. MET — earthing conductor in, sized correctly. Main bonding clamps —
                gas pipe, water pipe, both within 600 mm of their meters, BS 951 labels.
                Then into the CU — every RCBO seated, every terminal screw torqued, no
                copper showing, no insulation trapped, CPCs to the earth bar. Then circuit
                by circuit — way 1 lighting upstairs first. Open the circuit drawing.
                Walk to each accessory in order. Faceplate loose so you can see the
                terminations. Brown to L, blue to N, green-yellow sleeved CPC to E.
                Switched live identified at both ends. No copper past the terminal. No
                back-box without a grommet. Repeat for every circuit. Notices — periodic
                inspection notice, RCD test notice. Done. Schedule of Inspections marked
                up — ✓ for everything that complies, LIM for anything you could not
                access (probably the cable runs buried in the plastered walls), ✗ for
                anything you found wrong. Hand it to your supervisor.
              </>
            }
            whyItMatters={
              <>
                Twenty minutes is plenty for an apprentice working a new domestic CU
                inspection at a steady rhythm. The supervisor is going to spot-check
                you — they will pick three or four items at random and verify them
                themselves. If your ✓ on those items holds up, your inspection rhythm
                is sound and you start getting trusted to inspect alone. This is the
                exact build-up of trust that takes you from observing to signing off
                over the course of the apprenticeship.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'BS 7671 Section 642 governs inspection. Reg 642.1 fixes the order — inspection precedes testing, both done dead, before energisation.',
              'AC 5.1 — verify wiring systems conform to IET standards — is exactly this Section 642 inspection, evidenced on the IET model Schedule of Inspections.',
              'Reg 642.2 sets the three verification objectives — equipment compliant with Section 511, correctly selected and erected per BS 7671 and manufacturers&rsquo; instructions, not visibly damaged.',
              'Reg 642.3 lists twenty inspection items, each mapping to a BS 7671 chapter — 526 connections, 514 identification, 522 routing, 524 CSA, 514.16 single-pole devices, 410 / 415 shock protection, 514.12 / 514.13 labels, 443 / 534 SPDs.',
              'Inspection is what you can see and access without dismantling the install. Where access is limited, record LIM. Where non-compliant, record ✗ and fix before energising.',
              'Inspection rhythm follows the install — origin → distribution → circuit walk → bonding → notices. Pick the same order every time.',
              'Fuses, MCBs and single-pole switches in line conductors only — Reg 514.16 / 537.2.2. A fuse or switch in the neutral is a fail.',
              'At Level 2 you assist and learn the rhythm. By Level 3 portfolio time you are leading inspections on small installs under supervision. Independent sign-off comes once qualified.',
            ]}
          />

          <Quiz
            title="Verify wiring systems conform to IET standards — knowledge check"
            questions={quizQuestions}
          />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module4/section4/4-6')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                4.6 Bonding scenarios
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module4/section5/5-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                5.2 Schedule of Inspections walkthrough
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
