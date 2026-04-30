import { ArrowLeft, ChevronLeft, ChevronRight, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  LearningOutcomes,
  ContentEyebrow,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'mod4-s6-four-shapes',
    question: 'A failed IR can come in four diagnostic shapes. Which set best matches?',
    options: [
      'Open, short, intermittent, noisy',
      'L–E only low (single-phase fault to earth on one core), N–E only low (neutral fault to earth or borrowed neutral), L–N low with L–E and N–E healthy (inter-core fault), and all-pairs low (severe water ingress / global contamination)',
      'High, low, infinite, zero',
      'Pass, fail, marginal, error',
    ],
    correctIndex: 1,
    explanation:
      'The pattern of which conductor pairs read low and which read healthy is what discriminates between fault types. L–E only low is a single-core fault to earth. N–E only low is typically a borrowed neutral or neutral fault. L–N low with both L–E and N–E healthy is an inter-core fault. All-pairs low is global degradation — water in a junction box, severe contamination, or an end-of-life cable.',
  },
  {
    id: 'mod4-s6-borrowed-neutral',
    question:
      'A circuit reads N–E at 0.4 MΩ but L–E and L–N both read above 200 MΩ. What is the most likely cause and what is the procedural fix?',
    options: [
      'Damaged cable insulation — replace the cable',
      "A borrowed neutral elsewhere on the board — another circuit's load current is returning via a shared N path that the IR test sees as a low-resistance path. Disconnect each suspect circuit's neutral at the bar and re-test until the offender is found, then correct the wiring",
      'A faulty meter',
      'Normal — neutrals always read low',
    ],
    correctIndex: 1,
    explanation:
      "The signature is unambiguous: neutral connected to earth via something external to the circuit under test. The classic cause is a borrowed neutral — wiring picked up from a different circuit at some shared accessory. Confirm by lifting each circuit's neutral from the bar in turn and re-testing N–E on the suspect circuit; the reading recovers when the offending borrowed-neutral path is broken.",
  },
  {
    id: 'mod4-s6-step-up',
    question:
      'A circuit fails the 250 V DC post-connection test at 0.7 MΩ. Connected loads are LED drivers and a USB charging point. What is the diagnostic step-up sequence?',
    options: [
      'Condemn the cable immediately',
      'Disconnect the connected equipment (drivers, charger) and re-test the cable alone at the Table 64 voltage. If the cable-alone reading is healthy, the connected equipment is responsible — progressively reconnect to find the offender. If the cable-alone reading is also low, the cable insulation is the issue',
      'Increase test voltage to 1000 V DC',
      'Skip the test and rely on RCD protection',
    ],
    correctIndex: 1,
    explanation:
      'The step-up procedure isolates cable health from system health. Cable alone at Table 64 voltage gives the structural insulation reading. If healthy, the failure is in connected equipment — disconnect-and-reconnect-progressively localises the offender. If the cable alone is also low, the cable itself is the problem and remediation moves to the cable.',
  },
  {
    id: 'mod4-s6-eicr-c2',
    question:
      'On an EICR, a circuit measures 0.7 MΩ at 500 V DC with current-using equipment disconnected. What is the appropriate code?',
    options: [
      'C3 — improvement recommended only',
      'C2 — potentially dangerous. Insulation has degraded below the Table 64 floor, the fault-protection-by-insulation principle is no longer satisfied, and continued service exposes occupants to risk in the event of further deterioration',
      'C1 — danger present',
      'No code — record reading as informational only',
    ],
    correctIndex: 1,
    explanation:
      'A measured IR below the Table 64 minimum on a final circuit, with equipment disconnected, is a structural defect. C2 is the default code: potentially dangerous because the safety basis has eroded but no immediate danger has yet materialised. C1 would require an immediately dangerous condition actually present (e.g. exposed live conductor); C3 would require the reading still to be above the floor but sub-optimal.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Reg 643.3.3 (A4:2026 redraft) sets the acceptance value for the post-connection 250 V DC test between live conductors and the protective conductor. What is that minimum value, and when does it apply?',
    options: [
      '0.5 MΩ — applies to SELV/PELV only',
      '1 MΩ — applies after equipment that was disconnected for the 500 V test is reconnected',
      '2 MΩ — applies to every domestic final circuit',
      '0.25 MΩ — applies only to circuits over 500 V',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 643.3.3 second sentence: following connection of equipment that was disconnected for the prior insulation test, a test at 250 V DC shall be applied between live conductors and the protective conductor connected to the earthing arrangement, and the result shall be at least 1 MΩ. The 250 V step is the safety net — the equipment is back in circuit and the wiring still has to read above 1 MΩ.',
  },
  {
    id: 2,
    question:
      'You measure 0.6 MΩ L–E on a 32 A ring final circuit at 500 V DC. The circuit serves a kitchen with a recently flooded skirting cavity. What does Reg 643.3.2 say about that reading, and what is the next step?',
    options: [
      'Pass — anything above 0.5 MΩ is acceptable',
      'Fail against the 1.0 MΩ minimum in Table 64. Investigate the cause before energising — do not record as compliant',
      'Pass if the RCD trips correctly',
      'Pass — the value applies only at the consumer unit',
    ],
    correctAnswer: 1,
    explanation:
      'Table 64 sets 1.0 MΩ minimum at 500 V DC for circuits up to and including 500 V. 0.6 MΩ is below the limit. Reg 643.3.2 considers the value satisfactory only if it is not less than the appropriate Table 64 figure. Recording 0.6 MΩ as a pass is non-compliant and contradicts the regulation directly.',
  },
  {
    id: 3,
    question:
      'A consumer unit shows 0.4 MΩ L–E across the whole installation at 500 V DC. You isolate every circuit and test each in turn. Six final circuits all read 1.5–2.0 MΩ; one circuit reads 0.45 MΩ. What is the diagnostic shape of this fault?',
    options: [
      'Parallel leakage — every circuit has degraded equally',
      'A single-fault problem — one outlier circuit is dragging the parallel-combined reading down. Isolate that circuit and continue diagnosis on it',
      'The meter is faulty',
      'A borrowed neutral somewhere on the installation',
    ],
    correctAnswer: 1,
    explanation:
      'Parallel resistance maths: when you measure the whole CU, you read all circuit IRs in parallel. If one circuit is at 0.45 MΩ and the rest are healthy, the combined reading skews toward the worst one. A single low outlier among healthy circuits is a single-fault problem — divide-and-conquer at the CU localises it to one outgoing way.',
  },
  {
    id: 4,
    question:
      'You disconnect every load and test L–E on a circuit that previously read 0.3 MΩ. The reading is now 1.8 MΩ — passes Table 64. What does this tell you?',
    options: [
      'The cable is damaged',
      'A connected appliance was loading the test — apply the Reg 643.3.3 procedure: 250 V DC after reconnection, looking for ≥ 1 MΩ',
      'The earth electrode is disconnected',
      'The MCB is faulty',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 643.3.3 first sentence covers exactly this: where connected equipment is likely to influence the measurement, the test shall be applied prior to connection of such equipment in accordance with Table 64. After reconnection, a 250 V DC test shall be applied with a 1 MΩ minimum acceptance. The shift from 0.3 MΩ to 1.8 MΩ tells you the cable is fine and the load was the leakage path.',
  },
  {
    id: 5,
    question:
      'Two circuits — kitchen lighting and dining room lighting — both fail at 0.5 MΩ N–E. Each tested alone reads the same value. With the dining-room neutral disconnected at the CU, the kitchen circuit reads 1.8 MΩ. What is the fault?',
    options: [
      'Water ingress affecting both circuits',
      'A borrowed neutral — the dining-room neutral is shared with the kitchen circuit at some accessory, so the two circuits are coupled at the neutral',
      'Wrong test voltage',
      'Both circuits are at end of life and need rewiring',
    ],
    correctAnswer: 1,
    explanation:
      "When two circuits fail identically and disconnecting one neutral 'cures' the other, the neutrals are physically joined somewhere downstream — a classic borrowed neutral. The IR test reveals the shared path: each circuit's IR is being pulled down by the parallel leakage of the other through the shared neutral. The fix is to find the shared accessory (often a JB or backbox) and separate the neutrals.",
  },
  {
    id: 6,
    question:
      'A circuit reads 0.2 MΩ L–E at 500 V DC. After 30 minutes with a heat gun on the most-likely affected JB and the meter held on test, the reading climbs to 1.4 MΩ. What does Guidance Note 3 framing of this drying behaviour tell you?',
    options: [
      'The fault has resolved itself',
      'Moisture was the leakage path. The reading proves the cause but the moisture source must still be identified and stopped before recording a pass',
      'The meter has degraded',
      'The cable insulation has chemically self-repaired',
    ],
    correctAnswer: 1,
    explanation:
      'Improvement on drying confirms moisture as the leakage path. It does not fix the installation: the source (failed grommet, embedded damp, condensation in an enclosure) still has to be remediated. Recording a transient post-drying reading without addressing the cause leaves the next inspector with a circuit that will fail again at the next damp spell.',
  },
  {
    id: 7,
    question:
      'A circuit reads ∞ MΩ L–N at the CU but 0.3 MΩ L–E. The cable is buried in a screed that was wet during a recent leak. What is the most likely fault mechanism?',
    options: [
      'Both line and neutral are damaged equally',
      'Line conductor damaged — water has entered through a nick in the line insulation only, creating a leakage path L–E but leaving N–E unaffected',
      'The meter is reading wrong',
      'The CPC is open',
    ],
    correctAnswer: 1,
    explanation:
      'L–N infinite means line and neutral insulation between each other is intact. L–E low means the line conductor specifically has a leakage path to earth. A localised insulation breach on the line core only — typical of a buried-screed cable that took a fixing penetration on one face — produces exactly this signature. The remediation is to expose, identify the breach, and replace the affected length.',
  },
  {
    id: 8,
    question:
      'On a periodic inspection a 30-year-old TT installation reads 0.3 MΩ L–E across the whole CU. With current-using equipment disconnected, every circuit reads between 0.8–1.1 MΩ — all close to the limit, none catastrophic. Which EICR classification fits, and why?',
    options: [
      'C1 — immediately dangerous, isolate now',
      'C2 — potentially dangerous, urgent remedial; readings are below the Reg 643.3.2 / Table 64 1.0 MΩ minimum on multiple circuits and the parallel-leakage pattern indicates widespread insulation degradation',
      'C3 — improvement recommended only',
      'No coding required — readings are passing',
    ],
    correctAnswer: 1,
    explanation:
      'Multiple circuits sitting on the limit with a parallel-leakage signature (every circuit roughly the same low value) is a degraded-insulation distribution-wide problem, not a localised fault. This is potentially dangerous (C2): the installation will progressively fall further with age and use, and the regulation 643.3.2 acceptance value is being missed. Reg 651.4 requires details to be recorded in the report. C1 is reserved for immediate danger to life or property.',
  },
  {
    id: 9,
    question:
      "After a divide-and-conquer at the CU you have isolated the fault to one final circuit. You then split that circuit at its halfway accessory: the half nearest the board reads 1.9 MΩ; the half toward the load end reads 0.4 MΩ. What's your next move?",
    options: [
      'Replace the whole circuit',
      'The fault is in the load-end half. Split that half again at its halfway point and repeat — each split halves the search area',
      'Record the higher reading and pass the circuit',
      'Bond the circuit to earth',
    ],
    correctAnswer: 1,
    explanation:
      'This is the divide-and-conquer (half-split) method applied to a single circuit. Each split halves the unknown segment. Seven splits on a 100 m circuit narrow the fault to under 1 m. Recording the higher half as a pass would falsify the schedule of test results.',
  },
  {
    id: 10,
    question:
      'You find a domestic circuit reading 0.0 MΩ L–E (dead short to earth). The MCB has tripped on attempted re-energisation. The customer wants to keep using the rest of the property overnight. What does Reg 651.3 / 651.4 framing require you to do?',
    options: [
      'Reset the MCB and ask them to be careful',
      'Leave the affected circuit isolated and locked off, label the device, document the defect on a Reg 651.4 report (or Electrical Danger Notification if part of a periodic), and arrange remediation before re-energising. Do not transfer load to other circuits as a workaround',
      'Replace the MCB with a higher-rated one',
      'Disconnect the CPC and re-energise',
    ],
    correctAnswer: 1,
    explanation:
      'A dead short to earth is a danger condition. Reg 651.3 requires periodic inspection and testing not to cause danger to persons or livestock. Reg 651.4 requires details of any damage, deterioration, defects or dangerous conditions to be recorded in a report. The professionally correct action is isolate, label, document, and remediate — never resetting a tripping device or transferring load to circumvent the protection.',
  },
];

const InspectionTestingModule4Section6 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Troubleshooting low insulation | I&T Module 4.6 | Elec-Mate',
    description:
      'Diagnostic process when IR fails: the Reg 643.3.3 250 V step-up, divide-and-conquer at the CU, borrowed neutrals, water-damaged and nail-pierced cable, and the EICR coding decision (C1/C2/C3) when readings come in below Table 64.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('..')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 4
          </button>

          <PageHero
            eyebrow="Module 4 · Section 6"
            title="Troubleshooting low insulation"
            description="When IR comes in below Table 64. The 250 V step-up under Reg 643.3.3, divide-and-conquer at the CU, borrowed neutrals, and the EICR coding decision."
            tone="yellow"
          />

          <TLDR
            points={[
              'Reg 643.3.2 + Table 64 set the pass values: 1.0 MΩ at 500 V DC for circuits up to 500 V, 0.5 MΩ at 250 V DC for SELV/PELV. Below those values is a fail — no exceptions, no averaging.',
              'Reg 643.3.3 (redrafted at A4:2026) introduces the two-stage protocol: test before equipment is connected at the Table 64 voltage; after reconnection, a 250 V DC test between live conductors and the protective conductor must read at least 1 MΩ.',
              'A whole-CU low reading is the parallel combination of every circuit. Divide-and-conquer at the outgoing ways: drop one circuit at a time and watch the reading. Identical low readings across many circuits = parallel leakage. One outlier = single-fault problem.',
              'Two circuits failing identically that "fix each other" when one is disconnected = borrowed neutral. The neutrals are joined at an accessory downstream and have to be physically separated to comply with Reg 314 and 314.4.',
              'Reading climbs on drying = moisture. Reading flat-zero L–E on one core only = penetration damage (nail/screw/abrasion). Reading low across one cable run buried in damp screed = embedded damp. Each has a different remediation — diagnose the mechanism, not the symptom.',
              'EICR coding: dead short to earth or shock risk now = C1; readings below Table 64 across multiple circuits or one severe = C2; readings near limit with no immediate danger = C3 with recorded observation per Reg 651.4. Reg 651.3 forbids re-energisation if it would cause danger.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Recognise the four diagnostic shapes of an IR failure (single-fault outlier, parallel leakage, borrowed neutral, equipment loading) from the reading pattern alone',
              'Apply the Reg 643.3.3 two-stage protocol — Table 64 voltage before connection, 250 V DC ≥ 1 MΩ after — without leaving electronic equipment exposed to a 500 V test that would damage it',
              'Run a divide-and-conquer at the consumer unit: outgoing way, then accessory, then cable half, with recorded readings at each split that prove the fault location',
              'Identify a borrowed neutral from the IR signature alone and locate the shared accessory without unnecessary disturbance',
              'Distinguish water-damaged cable, nail/screw penetration, and back-box humidity by IR signature and visual evidence — and choose the right remediation for each',
              'Make the C1/C2/C3 EICR coding call defensibly against Reg 643.3.2, Reg 651.3 and Reg 651.4, including when to recommend immediate isolation versus a scheduled repair',
            ]}
          />

          <ContentEyebrow>What the regulation actually says</ContentEyebrow>

          <ConceptBlock
            title="Reg 643.3.2 sets the pass — Reg 643.3.3 sets the protocol"
            plainEnglish="Reg 643.3.2 says the IR is satisfactory only if the value meets or beats Table 64 — no judgement, no averaging. Reg 643.3.3 says: if equipment is going to influence the result or be damaged by 500 V DC, test the wiring without it first; then put the equipment back and test again at 250 V DC, expecting at least 1 MΩ."
            onSite="A reading below the Table 64 value is a fail. Period. The skill is in why it failed — not whether you can record the number anyway."
          >
            <p>
              Reg 643.3.2 is the acceptance gate: 1.0 MΩ at 500 V DC, 0.5 MΩ at 250 V DC for
              SELV/PELV, 1.0 MΩ at 1000 V DC for circuits above 500 V. Reg 643.3.3 is the protocol
              that lets you keep electronics, AFDDs, RCBOs and SPDs alive while still verifying the
              wiring — test before they are connected, then re-test at 250 V DC after reconnection
              looking for ≥ 1 MΩ. The A4:2026 redraft was a clarification, not a relaxation: skip
              the 250 V post-connection step and the schedule of test results is incomplete; skip
              the pre-connection step on an affected circuit and the value you record is equipment
              leakage in parallel with the wiring, not the wiring on its own.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 643.3.2"
            clause={
              <>
                The insulation resistance measured with the test voltages indicated in Table 64
                shall be considered satisfactory if the main switchboard and each distribution
                circuit tested separately, with all its final circuits connected but with
                current-using equipment disconnected, has an insulation resistance not less than the
                appropriate value given in Table 64.
              </>
            }
            meaning="Two non-negotiables: (1) test each distribution circuit separately, not just whole-CU; (2) disconnect current-using equipment first. The 'not less than' wording means there is no rounding-up, no averaging, and no engineering judgement available — the number either clears the bar or it does not."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 643.3.3"
            clause={
              <>
                Where connected equipment is likely to influence the measurement or result of the
                test, or be damaged, the test shall be applied prior to the connection of such
                equipment, in accordance with Table 64. Following connection of the equipment, a
                test at 250 V DC shall be applied between live conductors and the protective
                conductor connected to the earthing arrangement. The insulation resistance shall
                have a value of at least 1 MΩ.
              </>
            }
            meaning="The two-stage protocol that lets you keep electronics alive: (1) wiring-only test at the Table 64 voltage with equipment disconnected; (2) post-connection 250 V test between live conductors and PE with equipment back in circuit, accepted at ≥ 1 MΩ. Both stages have to happen — neither is optional."
          />

          <ConceptBlock
            title="Table 64 — the four numbers you must know"
            plainEnglish="The pass values, by circuit type and test voltage. Anything below these is a fail under Reg 643.3.2."
          >
            <div className="overflow-x-auto">
              <table className="w-full text-[13.5px] my-2">
                <thead>
                  <tr className="border-b border-white/15">
                    <th className="text-left text-white/80 py-2">Circuit</th>
                    <th className="text-center text-white/80 py-2">Test V DC</th>
                    <th className="text-center text-elec-yellow py-2">Min IR (MΩ)</th>
                  </tr>
                </thead>
                <tbody className="text-white/95">
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">SELV / PELV</td>
                    <td className="text-center">250</td>
                    <td className="text-center text-elec-yellow">0.5</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">LV up to and incl. 500 V</td>
                    <td className="text-center">500</td>
                    <td className="text-center text-elec-yellow">1.0</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">Above 500 V</td>
                    <td className="text-center">1000</td>
                    <td className="text-center text-elec-yellow">1.0</td>
                  </tr>
                  <tr>
                    <td className="py-2">Post-connection (Reg 643.3.3)</td>
                    <td className="text-center">250</td>
                    <td className="text-center text-elec-yellow">1.0</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              The first three rows are Table 64. The fourth is the Reg 643.3.3 post-reconnection
              acceptance — equipment back in circuit, 250 V across L–E, ≥ 1 MΩ. The safety net
              confirms nothing in the equipment is creating a leakage path the wiring-only test
              could not see.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The four diagnostic shapes of a failed IR</ContentEyebrow>

          <ConceptBlock
            title="A failed IR is one of four things — read the pattern, not just the number"
            plainEnglish="A whole-CU IR reading is every circuit in parallel. The pattern across circuits, at each split, tells you which kind of fault you are chasing."
            onSite="Before you reach for cable cutters, decide which of these four shapes you are looking at. The first move is the same in every case — split, measure, log — but the destination is different."
          >
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong className="text-amber-300">Single-fault outlier.</strong> One circuit reads
                dramatically lower than the rest; the others are healthy. The whole-CU reading is
                being dragged down by parallel combination with that one bad circuit. Localise to
                one outgoing way, then divide-and-conquer the cable.
              </li>
              <li>
                <strong className="text-amber-300">Parallel leakage.</strong> Many or all circuits
                read similarly low (e.g. 0.8–1.2 MΩ). No outlier. Common cause: damp ingress
                affecting a whole zone (post-flood, condensing roof void, leaking screed), or
                generalised insulation ageing across a tired installation. Treat as an
                installation-wide condition, not a single fault.
              </li>
              <li>
                <strong className="text-amber-300">Borrowed neutral.</strong> Two circuits both fail
                identically; either one read alone with the other&rsquo;s neutral lifted reads fine.
                The neutrals are physically joined at a downstream accessory — a back-box, JB, or
                the spur of a radial circuit. Locate the shared accessory and separate the neutrals.
              </li>
              <li>
                <strong className="text-red-300">Equipment loading the test.</strong> The circuit
                fails with equipment connected and passes with it disconnected. Reg 643.3.3 covers
                exactly this: do the wiring-only test in accordance with Table 64, reconnect the
                equipment, and apply the 250 V DC test with a 1 MΩ acceptance. The cable is fine —
                the equipment&rsquo;s own leakage is the leakage path.
              </li>
            </ol>
          </ConceptBlock>

          {/* Divide-and-conquer diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Divide-and-conquer at the consumer unit — IR readings annotated at each split
            </h4>
            <svg
              viewBox="0 0 800 480"
              className="w-full h-auto"
              role="img"
              aria-label="Divide-and-conquer flow at the consumer unit. Whole CU reads 0.4 megohm, all in parallel. Six outgoing ways tested individually: five read healthy, one outlier reads 0.45 megohm. That circuit is split at its midpoint accessory: line side reads 1.9 megohm, load side reads 0.4 megohm. Load-end half is split again at its midpoint: cable side reads 1.7 megohm, accessory side reads 0.3 megohm. Fault localised to a single back-box or short cable section."
            >
              {/* Stage 1: whole CU */}
              <rect
                x="20"
                y="20"
                width="200"
                height="80"
                rx="8"
                fill="rgba(239,68,68,0.08)"
                stroke="#EF4444"
                strokeWidth="1.6"
              />
              <text
                x="120"
                y="42"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="11"
                fontWeight="bold"
              >
                STAGE 1 — WHOLE CU
              </text>
              <text x="120" y="60" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10">
                All circuits in parallel
              </text>
              <text
                x="120"
                y="78"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="13"
                fontWeight="bold"
              >
                IR (L–E) = 0.4 MΩ ⚠
              </text>
              <text x="120" y="93" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                (below Table 64 limit)
              </text>

              {/* Arrow down */}
              <line
                x1="120"
                y1="100"
                x2="120"
                y2="125"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1.2"
              />
              <polygon points="120,128 116,120 124,120" fill="rgba(255,255,255,0.5)" />

              {/* Stage 2: split by outgoing way */}
              <rect
                x="20"
                y="135"
                width="760"
                height="100"
                rx="8"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="1.2"
              />
              <text
                x="400"
                y="155"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="11"
                fontWeight="bold"
              >
                STAGE 2 — SPLIT BY OUTGOING WAY (test each circuit alone)
              </text>

              {/* Six circuit boxes */}
              <g>
                <rect
                  x="40"
                  y="170"
                  width="100"
                  height="50"
                  rx="4"
                  fill="rgba(34,197,94,0.10)"
                  stroke="#22C55E"
                  strokeWidth="1.2"
                />
                <text x="90" y="187" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                  Way 1 — Sockets
                </text>
                <text
                  x="90"
                  y="205"
                  textAnchor="middle"
                  fill="#22C55E"
                  fontSize="11"
                  fontWeight="bold"
                >
                  1.8 MΩ
                </text>
              </g>
              <g>
                <rect
                  x="160"
                  y="170"
                  width="100"
                  height="50"
                  rx="4"
                  fill="rgba(34,197,94,0.10)"
                  stroke="#22C55E"
                  strokeWidth="1.2"
                />
                <text x="210" y="187" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                  Way 2 — Lights
                </text>
                <text
                  x="210"
                  y="205"
                  textAnchor="middle"
                  fill="#22C55E"
                  fontSize="11"
                  fontWeight="bold"
                >
                  2.0 MΩ
                </text>
              </g>
              <g>
                <rect
                  x="280"
                  y="170"
                  width="100"
                  height="50"
                  rx="4"
                  fill="rgba(34,197,94,0.10)"
                  stroke="#22C55E"
                  strokeWidth="1.2"
                />
                <text x="330" y="187" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                  Way 3 — Cooker
                </text>
                <text
                  x="330"
                  y="205"
                  textAnchor="middle"
                  fill="#22C55E"
                  fontSize="11"
                  fontWeight="bold"
                >
                  1.9 MΩ
                </text>
              </g>
              <g>
                <rect
                  x="400"
                  y="170"
                  width="100"
                  height="50"
                  rx="4"
                  fill="rgba(239,68,68,0.12)"
                  stroke="#EF4444"
                  strokeWidth="1.6"
                />
                <text
                  x="450"
                  y="187"
                  textAnchor="middle"
                  fill="#FBBF24"
                  fontSize="9"
                  fontWeight="bold"
                >
                  Way 4 — Kitchen ring ⚠
                </text>
                <text
                  x="450"
                  y="205"
                  textAnchor="middle"
                  fill="#EF4444"
                  fontSize="11"
                  fontWeight="bold"
                >
                  0.45 MΩ
                </text>
              </g>
              <g>
                <rect
                  x="520"
                  y="170"
                  width="100"
                  height="50"
                  rx="4"
                  fill="rgba(34,197,94,0.10)"
                  stroke="#22C55E"
                  strokeWidth="1.2"
                />
                <text x="570" y="187" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                  Way 5 — Shower
                </text>
                <text
                  x="570"
                  y="205"
                  textAnchor="middle"
                  fill="#22C55E"
                  fontSize="11"
                  fontWeight="bold"
                >
                  1.7 MΩ
                </text>
              </g>
              <g>
                <rect
                  x="640"
                  y="170"
                  width="100"
                  height="50"
                  rx="4"
                  fill="rgba(34,197,94,0.10)"
                  stroke="#22C55E"
                  strokeWidth="1.2"
                />
                <text x="690" y="187" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                  Way 6 — Lights 1F
                </text>
                <text
                  x="690"
                  y="205"
                  textAnchor="middle"
                  fill="#22C55E"
                  fontSize="11"
                  fontWeight="bold"
                >
                  1.8 MΩ
                </text>
              </g>

              {/* Arrow down to stage 3 — from outlier */}
              <line x1="450" y1="220" x2="450" y2="260" stroke="#FBBF24" strokeWidth="1.4" />
              <polygon points="450,263 445,253 455,253" fill="#FBBF24" />
              <text
                x="455"
                y="245"
                textAnchor="start"
                fill="#FBBF24"
                fontSize="10"
                fontWeight="bold"
              >
                Outlier → split this circuit
              </text>

              {/* Stage 3: split circuit at midpoint accessory */}
              <rect
                x="120"
                y="270"
                width="560"
                height="90"
                rx="8"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="1.2"
              />
              <text
                x="400"
                y="290"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="11"
                fontWeight="bold"
              >
                STAGE 3 — SPLIT KITCHEN RING AT MIDPOINT ACCESSORY
              </text>

              <g>
                <rect
                  x="160"
                  y="305"
                  width="200"
                  height="45"
                  rx="4"
                  fill="rgba(34,197,94,0.10)"
                  stroke="#22C55E"
                  strokeWidth="1.2"
                />
                <text x="260" y="322" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                  Line-side half (CU → mid socket)
                </text>
                <text
                  x="260"
                  y="340"
                  textAnchor="middle"
                  fill="#22C55E"
                  fontSize="11"
                  fontWeight="bold"
                >
                  1.9 MΩ ✓
                </text>
              </g>
              <g>
                <rect
                  x="440"
                  y="305"
                  width="200"
                  height="45"
                  rx="4"
                  fill="rgba(239,68,68,0.12)"
                  stroke="#EF4444"
                  strokeWidth="1.6"
                />
                <text
                  x="540"
                  y="322"
                  textAnchor="middle"
                  fill="#FBBF24"
                  fontSize="9"
                  fontWeight="bold"
                >
                  Load-side half (mid socket → end) ⚠
                </text>
                <text
                  x="540"
                  y="340"
                  textAnchor="middle"
                  fill="#EF4444"
                  fontSize="11"
                  fontWeight="bold"
                >
                  0.4 MΩ
                </text>
              </g>

              {/* Arrow down */}
              <line x1="540" y1="350" x2="540" y2="385" stroke="#FBBF24" strokeWidth="1.4" />
              <polygon points="540,388 535,378 545,378" fill="#FBBF24" />

              {/* Stage 4: split load-side half */}
              <rect
                x="200"
                y="395"
                width="400"
                height="80"
                rx="8"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="1.2"
              />
              <text
                x="400"
                y="413"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="11"
                fontWeight="bold"
              >
                STAGE 4 — SPLIT LOAD-SIDE HALF AGAIN
              </text>
              <g>
                <rect
                  x="220"
                  y="425"
                  width="170"
                  height="40"
                  rx="4"
                  fill="rgba(34,197,94,0.10)"
                  stroke="#22C55E"
                  strokeWidth="1.2"
                />
                <text x="305" y="442" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                  Cable run only
                </text>
                <text
                  x="305"
                  y="458"
                  textAnchor="middle"
                  fill="#22C55E"
                  fontSize="10"
                  fontWeight="bold"
                >
                  1.7 MΩ ✓
                </text>
              </g>
              <g>
                <rect
                  x="410"
                  y="425"
                  width="170"
                  height="40"
                  rx="4"
                  fill="rgba(239,68,68,0.12)"
                  stroke="#EF4444"
                  strokeWidth="1.6"
                />
                <text
                  x="495"
                  y="442"
                  textAnchor="middle"
                  fill="#FBBF24"
                  fontSize="9"
                  fontWeight="bold"
                >
                  Final back-box ⚠
                </text>
                <text
                  x="495"
                  y="458"
                  textAnchor="middle"
                  fill="#EF4444"
                  fontSize="10"
                  fontWeight="bold"
                >
                  0.3 MΩ — fault here
                </text>
              </g>
            </svg>
            <p className="mt-3 text-[12.5px] text-white/60">
              Each stage halves the unknown. The whole-CU 0.4 MΩ at Stage 1 is the parallel
              combination of all six circuits; the kitchen ring outlier at Stage 2 is the
              single-fault contributor. By Stage 4 the fault is localised to a single back-box —
              almost always damp inside the box, a nicked conductor on insertion, or a stray strand
              making contact with the metal box.
            </p>
          </div>

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The 250 V step-up — Reg 643.3.3 in practice</ContentEyebrow>

          <ConceptBlock
            title="When to drop the test voltage to 250 V — and why it is mandatory now, not optional"
            plainEnglish="If a 500 V test would damage the connected equipment, or the equipment would distort the wiring reading, you do not just lower the voltage and hope. The protocol is fixed: wiring-only at 500 V (or whatever Table 64 requires), reconnect, then 250 V DC across L–E with a 1 MΩ minimum."
            onSite="The 250 V step is the safety net. If the post-connection reading is below 1 MΩ, the equipment itself is leaking — diagnose the appliance, not the cable."
          >
            <p>
              Equipment with electronic protection (RCBOs, AFDDs, SPDs), capacitive PFC,
              switched-mode supplies, or any manufacturer&rsquo;s &ldquo;disconnect during IR
              test&rdquo; note must be disconnected for the headline Table 64 test, then reconnected
              and re-tested at 250 V DC with the 1 MΩ acceptance. 500 V DC produces stress that
              electronic input stages and SPDs are not specified to survive; 250 V respects
              manufacturer envelopes. 1 MΩ is wide enough that normal background leakage will not
              fail it but tight enough that real insulation faults will.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Disconnect for Table 64 test:</strong> AFDDs, RCBOs, SPDs, BMS controllers,
                dimmers, switching power supplies, capacitor banks. Manufacturer note prevails.
              </li>
              <li>
                <strong>After reconnection:</strong> 250 V DC across live conductors and PE.
                Acceptance ≥ 1 MΩ. Record both values on the schedule.
              </li>
              <li>
                <strong>If the 250 V test fails:</strong> wiring is fine, equipment is leaking.
                Investigation moves to appliance level — rare but real with water-damaged or
                end-of-life electronics.
              </li>
            </ul>
          </ConceptBlock>

          <Scenario
            title="A failing kitchen ring after a freezer leak"
            situation="Customer reports the kitchen RCBO trips intermittently. You test the kitchen ring at 500 V DC with the freezer plugged in: 0.3 MΩ L–E, fail. You unplug the freezer and re-test wiring-only: 1.9 MΩ L–E, comfortable pass. You plug the freezer back in and apply the Reg 643.3.3 250 V DC test: 0.6 MΩ L–E."
            whatToDo="The wiring is good. The 250 V DC post-connection test with the freezer connected is below the 1 MΩ acceptance — the freezer is the leakage path, almost certainly water inside the back of the appliance from its own leak. Document both readings on the schedule. Recommend the freezer is taken out of service and inspected by an appliance engineer; do not return the circuit to a no-RCBO arrangement to mask the leakage. The RCBO was doing its job."
            whyItMatters="Without the 250 V step, you might have written off the cable as faulty and replaced it. The cable was always fine. The Reg 643.3.3 protocol is what tells you the difference between wiring failure and equipment failure — and the difference matters because chasing a non-fault costs the customer money and leaves the real fault in service."
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Borrowed neutrals — the IR signature is the giveaway</ContentEyebrow>

          <ConceptBlock
            title="What a borrowed neutral looks like on an IR test"
            plainEnglish="Two circuits fail identically. Test either circuit alone with the other's neutral disconnected at the CU and it reads fine. That is a borrowed neutral: somewhere downstream the two neutrals are joined."
            onSite="Don't go pulling cables until you've eliminated this. A borrowed neutral fault is fixable without disturbing the cable run — find the shared accessory and separate the neutrals at that point."
          >
            <p>
              A borrowed neutral happens when one circuit&rsquo;s neutral has been taken from
              another circuit&rsquo;s neutral at a shared accessory — typically a JB, ceiling rose
              carrying multiple circuits, or a backbox holding two switches. Separate at the CU,
              joined downstream. The IR signature is distinctive:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>Both circuits read low N–E with the CU fully energised.</li>
              <li>
                Both circuits read low N–E tested alone but with the other neutral still at the CU.
              </li>
              <li>
                Either circuit reads fine when the other circuit&rsquo;s neutral is lifted at the
                CU.
              </li>
            </ul>
            <p>
              The leakage path on each circuit is being pulled into the other&rsquo;s test current
              via the shared neutral. Separating at the CU isolates each circuit and the readings
              recover. Remediation: find the shared accessory and physically separate the neutrals.
              A borrowed neutral is non-compliant under any modern interpretation — RCD operation
              and disconnection times are not predictable when neutrals are shared between circuits
              with different protective devices.
            </p>
          </ConceptBlock>

          <Scenario
            title="Two-way landing lighting that fails on IR with the kitchen ring"
            situation="On a periodic, the landing lights and the kitchen ring both fail at 0.5 MΩ N–E. Each tested alone at the CU still fails. With the kitchen ring's neutral lifted at the CU, the landing lights jump to 1.9 MΩ. With the landing lights' neutral lifted, the kitchen ring jumps to 1.8 MΩ."
            whatToDo="That is a borrowed neutral. Most likely location: a switch backbox in the kitchen where a previous installer ran the landing two-way through the kitchen ceiling void and used the kitchen ring's neutral at a JB above the ceiling. Trace by lifting circuit conductors at each accessory in turn, watching the IR. Once the shared accessory is identified, run a dedicated neutral back to the landing-circuit RCBO and physically separate them. Record on the schedule with a Reg 651.4 observation if periodic; remediate before issuing an EIC if new work."
            whyItMatters="A borrowed neutral defeats RCD additional protection. If the landing circuit's RCBO trips, the kitchen circuit's load is still injecting current into the shared neutral — the disconnection that the RCBO is meant to enforce is incomplete. This is a Reg 314 / 314.4 violation and an EICR C2 at minimum."
          />

          <SectionRule />

          <ContentEyebrow>The physical mechanisms — and what each looks like</ContentEyebrow>

          <ConceptBlock
            title="Water-damaged cable, nail/screw penetration, back-box humidity — three different IR signatures"
            plainEnglish="The mechanism shows up in the reading pattern. Match the pattern to the cause and you save hours of cable chasing."
          >
            <ul className="list-disc pl-5 space-y-2 text-[14px]">
              <li>
                <strong className="text-blue-300">
                  Water-damaged cable (post-flood, post-leak).
                </strong>{' '}
                IR drops over hours, improves on drying. Often affects multiple conductors of the
                same cable (L–E and N–E both low — water wicked into the sheath). Embedded screed
                cables stay damp for weeks; re-test after the substrate has dried before condemning
                the cable.
              </li>
              <li>
                <strong className="text-red-300">Nail / screw penetration.</strong> Single conductor
                low — usually L–E or N–E, rarely both. L–N infinite. Local and dry; no improvement
                on heating. Visual at likely locations (recent furniture/rail fixings, behind
                kitchen units from a refit) finds the breach.
              </li>
              <li>
                <strong className="text-purple-300">Back-box / accessory humidity.</strong>{' '}
                Whole-circuit IR near the limit; isolating the accessory and testing cable alone
                reads healthy. Bathroom switches, outdoor sockets with failed gland seals,
                garage/outhouse JBs. Hairdryer heat lifts the reading temporarily — confirms cause;
                fix is reseal or IP-rated enclosure.
              </li>
              <li>
                <strong className="text-amber-300">Common neutral on radial spur.</strong> Some
                1990s installations ran a single neutral from a JB to feed two radial-circuit spurs
                that should have been independent. Tests like a borrowed neutral but only on the
                spurred section.
              </li>
              <li>
                <strong className="text-orange-300">Heat-damaged flex / cable.</strong> Local IR
                fail at a hot terminal. Discoloured insulation. Permanent damage — remake the
                terminal and cut back to clean copper / clean insulation.
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Skipping the wiring-only test and doing only the 250 V DC step"
            whatHappens="You test at 250 V across the consumer unit with everything connected and read 0.9 MΩ. You record it as a fail, replace cable, and the reading is the same after the work. The fault was always in a piece of connected equipment — the wiring was fine — and the customer is now £400 down for a non-fix. Reg 643.3.3 first sentence is the procedural mitigation: where equipment is likely to influence the result, the test shall be applied prior to connection of such equipment. Skipping that step is what created the misdiagnosis."
            doInstead="Always: equipment off, test wiring at the headline Table 64 voltage, get a number for the cable on its own. Then equipment back on, 250 V DC at the L–E acceptance of 1 MΩ. Two readings, both on the schedule of test results, every time."
          />

          <CommonMistake
            title="Treating one low circuit and not investigating the others"
            whatHappens="You find the kitchen ring at 0.6 MΩ, fix it (replace a damaged length), and walk. The bathroom lighting was at 1.2 MΩ — passed Table 64 by a hair. Six months later the bathroom circuit fails properly. The trend was visible at the time — multiple circuits trending downward is parallel leakage in the early stage, and each one passing in isolation does not mean the installation is healthy."
            doInstead="Record every IR value on the schedule of test results, not just the failures. A circuit at 1.1 MΩ next to circuits at 1.9 MΩ is data — note it as a Reg 651.4 observation on a periodic with a recommendation for re-test in 12 months. The next inspector then has a baseline."
          />

          <CommonMistake
            title="Drying-out as the fix on its own"
            whatHappens="The reading climbs from 0.3 MΩ to 1.5 MΩ after an hour with a heat gun. You declare the fault resolved, energise the circuit, and leave. Six weeks later the reading is back at 0.3 MΩ because the moisture source — a failed window seal letting rain into the cable run — is still there. The customer&rsquo;s circuit will fail every winter."
            doInstead="The drying test confirms the mechanism. Then identify the source. Failed seals get replaced. Embedded damp screed gets ventilated and dried before re-energising. External cable runs in defective ducts get re-routed or re-glanded. Record the cause, the source, and the remediation — not just the post-drying reading."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>EICR coding — when low IR is C1, C2, or C3</ContentEyebrow>

          <ConceptBlock
            title="C1 / C2 / C3 against a low IR result — the defensible call"
            plainEnglish="C1 is danger now (immediate isolation). C2 is potentially dangerous (urgent remedial). C3 is improvement recommended (no immediate risk). The IR reading doesn't auto-classify — the consequence does."
            onSite="If the customer is going to use the installation tonight, ask: would I be comfortable letting my own family use it? That gut check sets the floor."
          >
            <ul className="list-disc pl-5 space-y-2 text-[14px]">
              <li>
                <strong className="text-red-300">C1 — Danger present.</strong> Dead-short L–E (0.0
                MΩ), exposed live conductor, accessible damaged cable with conductor showing. Reg
                651.3 forbids causing danger; isolate, lock off, label, document, Electrical Danger
                Notification. Do not leave on supply.
              </li>
              <li>
                <strong className="text-amber-300">
                  C2 — Potentially dangerous, urgent remedial.
                </strong>{' '}
                IR readings below Table 64 on multiple circuits, borrowed neutrals defeating RCD
                additional protection, cable damage where the conductor is intact but insulation is
                breached in a damp location. Remediate within an agreed short window — typically 30
                days.
              </li>
              <li>
                <strong className="text-yellow-300">C3 — Improvement recommended.</strong> Circuit
                just over the Table 64 limit but trending. Older installations with one or two
                slightly-low readings and no immediate hazard. Reg 651.4 still requires the
                observation to be recorded so the next inspector has data.
              </li>
            </ul>
            <p>
              A 0.45 MΩ ring final in a kitchen is C2 — water and metalwork present, limit breached.
              A 1.05 MΩ lighting circuit in a dry loft is C3 — limit just cleared, trend worth
              noting. A dead short L–E behind a child&rsquo;s bedroom socket is C1 — isolate and
              document immediately.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 651.4"
            clause={
              <>
                Details of any damage, deterioration, defects or dangerous conditions shall be
                recorded in a report.
              </>
            }
            meaning="The reporting duty is universal. A C3 observation for a marginally-low circuit is not optional — Reg 651.4 captures any deterioration, not only failures. The schedule of test results is the legal record; what is not on it did not happen."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 651.3"
            clause={
              <>
                Periodic inspection and testing shall not cause danger to persons or livestock and
                shall not cause damage to property or equipment even if the circuit is defective.
              </>
            }
            meaning="The court-aware reading: if the circuit is defective and energising it would cause danger, you do not energise it. Disposition of a discovered defect is not a customer-preference question — Reg 651.3 sets the floor."
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The diagnostic workflow — from CU to localised fault</ContentEyebrow>

          <ConceptBlock
            title="A defensible step-by-step that you can show on the schedule"
            plainEnglish="Each step has a recorded reading. The trail through the schedule of test results is the proof that the diagnosis is sound."
          >
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Whole CU.</strong> Test at 500 V DC, current-using equipment disconnected
                (Reg 643.3.2). If pass, no diagnostic needed.
              </li>
              <li>
                <strong>Per outgoing way.</strong> If whole-CU fails, test each circuit alone and
                record against each circuit on the schedule.
              </li>
              <li>
                <strong>Wiring vs equipment (Reg 643.3.3).</strong> Disconnect equipment and re-test
                at Table 64 voltage; if wiring passes, reconnect and apply 250 V DC across L–E with
                1 MΩ acceptance. Record both.
              </li>
              <li>
                <strong>Borrowed-neutral check.</strong> Two circuits failing in a coupled pattern:
                lift one neutral at the CU and re-test the other. Restoration confirms the shared
                accessory.
              </li>
              <li>
                <strong>Half-split the cable.</strong> Disconnect at the midpoint accessory, test
                each half, half-split the failing half. Seven splits on 100 m gets to under 1 m.
              </li>
              <li>
                <strong>Visual at the localised point.</strong> Damp back-box, fixing penetration,
                cracked accessory, heat-damaged termination — visible once localised to a metre or
                less.
              </li>
              <li>
                <strong>Remediate, retest, record.</strong> Replace, re-terminate, re-seal, or cut
                and joint per Reg 526.5. Re-test, apply the Reg 643.3.3 250 V step where equipment
                is back in circuit, record final value on the schedule.
              </li>
            </ol>
          </ConceptBlock>

          <Scenario
            title="A periodic inspection on a 1980s flat with whole-CU IR at 0.4 MΩ"
            situation="Six final circuits. Test each alone: five between 1.6 and 2.0 MΩ; the kitchen ring at 0.45 MΩ. With the kitchen ring's freezer unplugged, the kitchen ring reads 1.7 MΩ. With the freezer plugged in, the post-connection 250 V DC test reads 0.55 MΩ."
            whatToDo={
              <>
                <span className="block">
                  Wiring-only is fine — the freezer is the leakage path. Document the kitchen ring
                  at 1.7 MΩ as the wiring-only result; document the 0.55 MΩ at 250 V DC with
                  equipment connected as the post-connection result; flag the appliance as a Reg
                  651.4 observation.
                </span>
                <span className="block">
                  Coding: C2 on the EICR — the appliance is on a circuit and creates a leakage path
                  that is below the Reg 643.3.3 1 MΩ acceptance. Recommend the appliance be removed
                  from service or repaired by an appliance engineer before the circuit is returned
                  to normal use.
                </span>
                <span className="block">
                  Do not blame the cable. Do not disable the RCBO. Do not transfer load to a
                  different circuit as a workaround. Document, recommend, retest after remediation.
                </span>
              </>
            }
            whyItMatters="Half the value of an IR test is who or what gets blamed. The Reg 643.3.3 protocol — wiring-only first, equipment-on second — is what tells you to blame the freezer and not the cable. Without that step you would replace cable that is fine and leave the leaky appliance in service."
          />

          <SectionRule />

          <ContentEyebrow>Recording on the A4:2026 Schedule of Test Results</ContentEyebrow>

          <ConceptBlock
            title="What goes in each IR column — and why both readings matter"
            plainEnglish="The A4:2026 Schedule of Test Results expects the wiring-only IR at the headline Table 64 voltage and, where Reg 643.3.3 applies, the post-connection 250 V DC reading. Both, separately."
          >
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>IR L–L:</strong> wiring-only at Table 64 voltage, between live conductors.
                Two-decimal MΩ; min 1.0 MΩ at 500 V (or 0.5 MΩ at 250 V for SELV/PELV).
              </li>
              <li>
                <strong>IR L–E:</strong> wiring-only at Table 64 voltage, between live conductors
                and the protective conductor connected to the earthing arrangement.
              </li>
              <li>
                <strong>Reg 643.3.3 follow-up (where applicable):</strong> 250 V DC,
                post-connection, between live conductors and PE. Acceptance ≥ 1 MΩ. Both readings
                have to be on the page.
              </li>
              <li>
                <strong>Comments:</strong> equipment disconnected, borrowed-neutral observation,
                drying-improved reading, any approximation. The comment is what the next inspector
                reads first.
              </li>
            </ul>
          </ConceptBlock>

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'Reg 643.3.2 + Table 64 = the pass: 1.0 MΩ at 500 V DC for circuits up to 500 V; 0.5 MΩ at 250 V DC for SELV/PELV; not less than, no rounding.',
              'Reg 643.3.3 = the protocol: Table 64 voltage with equipment off, then 250 V DC ≥ 1 MΩ with equipment back in circuit. Both readings recorded.',
              'Whole-CU IR is every circuit in parallel. A single low outlier among healthy circuits is one fault; many circuits all similarly low is parallel leakage across the installation.',
              'Borrowed neutrals show as two circuits failing identically that "fix each other" when one neutral is lifted. Find the shared accessory, separate the neutrals.',
              'IR climbs on drying = moisture; localised L–E fail with healthy L–N = penetration damage; whole-circuit near-limit = ageing or back-box humidity. Each has its own remediation.',
              'Divide-and-conquer: at the CU split by outgoing way; on a circuit split at the midpoint accessory; halve again. Seven splits on 100 m gets to under 1 m.',
              'EICR coding: dead short or exposed conductor = C1; readings below Table 64 / borrowed neutrals / significant defects = C2; trending readings just over the limit = C3 with a Reg 651.4 observation.',
              'Reg 651.3 forbids re-energising a defective circuit if it would cause danger. Document, isolate, label, remediate — never reset and walk.',
            ]}
          />

          <FAQ
            items={[
              {
                question:
                  'A circuit reads 0.9 MΩ at 500 V DC. The customer wants to keep using it. What do I tell them?',
                answer:
                  'It does not meet the Reg 643.3.2 / Table 64 1.0 MΩ minimum, so it is non-compliant. Whether to re-energise pending repair is a Reg 651.3 judgement: is there immediate danger? On a domestic ring final in a dry zone, probably not — but the schedule of test results records a fail, the customer is told in writing, and remediation is scheduled within days, not months. If the location is wet (kitchen, bathroom) or accessible to children, the answer skews toward immediate isolation.',
              },
              {
                question: 'Reg 643.3.3 — when in practice do I actually need to drop to 250 V DC?',
                answer:
                  'Whenever the manufacturer says "disconnect during IR test", or when 500 V DC would damage the equipment (AFDDs, RCBOs, SPDs, BMS controllers, dimmers, capacitor banks, switching power supplies). The protocol is fixed: Table 64 voltage with the equipment disconnected, then reconnect and apply 250 V DC across L–E with a 1 MΩ minimum. Both readings on the schedule. The 250 V step is in addition to the headline test, not a substitute.',
              },
              {
                question: 'How do I tell parallel leakage from a single-fault problem?',
                answer:
                  'Test each circuit individually. One outlier dramatically below the others (0.4 MΩ vs 1.8 MΩ) is a single-fault problem — divide-and-conquer that circuit. Many or all circuits similarly low (0.8–1.2 MΩ across the board) is parallel leakage from an installation-wide cause (widespread damp, rodent/water history, generalised ageing). Single fault gets a localised repair; parallel leakage gets an environmental fix and a longer EICR observation timeline.',
              },
              {
                question: 'Can I just use the 250 V test on everything to be safe?',
                answer:
                  'No. Reg 643.3.2 / Table 64 sets the headline test voltage by circuit type — 500 V DC for circuits up to and including 500 V (excluding SELV/PELV). The 250 V step under Reg 643.3.3 is the follow-up after equipment reconnection, not a substitute for the headline test. Using only 250 V DC on circuits that should be tested at 500 V DC would mean a less stringent test, hiding insulation defects that the higher voltage would reveal — and would not satisfy Table 64 acceptance.',
              },
              {
                question: "I've found a borrowed neutral on a periodic. C1, C2, or C3?",
                answer:
                  'C2 in almost every case. A borrowed neutral defeats RCD additional protection (RCD measures L vs N and a shared neutral routes current outside the device), so Reg 415.1 is not actually being met despite the RCD being present. Reg 314 / 314.4 also requires every circuit to be electrically separate. C1 only applies if the borrowed neutral has produced a touch hazard now (e.g. a metal-clad accessory at fault potential).',
              },
              {
                question:
                  'The reading is 0.0 MΩ L–E. The MCB has tripped. Customer says the rest of the property still works fine — can I just leave that breaker off?',
                answer:
                  'You can leave the MCB off and labelled as the immediate isolation, yes. What you cannot do is restore service by transferring loads to other circuits, removing the protective device, or working around the fault. Reg 651.3 forbids causing danger. Reg 651.4 requires the defect to be recorded in a report. The minimum is: isolate, lock off, label the device, issue an Electrical Danger Notification (or equivalent on EICR), and arrange remediation. Energising other unaffected circuits is fine; re-energising the faulted circuit is not.',
              },
              {
                question: 'Drying out improved the reading. Is that a real fix?',
                answer:
                  'No — only a confirmation of the cause. Moisture as a leakage path is reversible, so the IR climbs once the water is gone, but the source remains. Document the original reading, the post-drying reading, the cause, and the remediation of the source (failed seal replaced, vent installed, screed dried, leak fixed). Re-test only after the source has been addressed, otherwise the next damp spell brings the fault back and the schedule of test results carries a passing reading that is no longer representative.',
              },
              {
                question: 'How long does a divide-and-conquer take in practice?',
                answer:
                  'On a six-way CU with one outlier, the CU-level split takes five minutes — drop each breaker, take a reading. The circuit-level half-split is the slow bit: each split needs a disconnection, a reading, a reconnection. Budget 20–40 minutes per cycle on a domestic property; longer where accessories are buried. Documenting each reading on the way through is what makes the diagnosis defensible.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Troubleshooting low IR — Module 4.6" questions={quizQuestions} />

          {/* Bottom navigation grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/inspection-testing/module-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 4
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/inspection-testing/module-5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next module <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Module 5 — Earth fault loop impedance
              </div>
            </button>
          </div>

          <div className="hidden">
            <Activity />
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default InspectionTestingModule4Section6;
