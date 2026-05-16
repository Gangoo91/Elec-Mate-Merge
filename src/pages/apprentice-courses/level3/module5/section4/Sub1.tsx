/**
 * Module 5 · Section 4 · Subsection 1 — Zs measurement (3-lead and 2-lead)
 * Maps to C&G 2365-03 / Unit 304 / LO6 / AC 6.3, 6.4
 *   AC 6.3 — "describe common earth fault loop paths"
 *   AC 6.4 — "state the methods for verifying protection by automatic disconnection of supply"
 * Layered: 2357 ELTK06 / Zs measurement
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
import { EarthingSystemDiagram } from '@/components/study-centre/diagrams';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Zs measurement — 3-lead and 2-lead methods | Level 3 Module 5.4.1 | Elec-Mate';
const DESCRIPTION =
  'Zs measurement per BS 7671 Reg 643.7.3 — 3-lead (L-N-E with the supply L-N reading subtracted) and 2-lead (L-E only) methods. Instrument setup, RCD avoidance modes, comparison against A4:2026 Table 41.3 limits using the 0.8 multiplier. Earth fault loop path traced for TN and TT systems.';

const checks = [
  {
    id: 'm5-s4-sub1-3-lead',
    question: 'The 3-lead Zs measurement method works by:',
    options: [
      'Multiplying the resistance by three.',
      'The tester briefly draws current between L and N to measure the L-N loop, then between L and E to measure the L-E loop. The L-N reading is the line-neutral path (essentially 2 × supply network plus internal cable run); the L-E reading is the line-earth path (Ze plus R1+R2). Some testers compute Zs from these and the cable parameters; the 2-lead method skips L-N and just reads L-E directly.',
      'Connecting three meters in parallel.',
      'Using AC at three different frequencies.',
    ],
    correctIndex: 1,
    explanation:
      'The 3-lead Zs test connects to L, N and E at the test point. The instrument briefly draws test current via the L-N loop and via the L-E loop, measuring the voltage drop and computing impedance from V/I. The L-N reading characterises the supply network. The L-E reading is what feeds the Zs result. Modern MFTs use this dual measurement to give better accuracy and to support no-trip RCD modes.',
  },
  {
    id: 'm5-s4-sub1-rcd-no-trip',
    question: 'When measuring Zs on a circuit protected by a 30 mA RCD, you should:',
    options: [
      'Disconnect the RCD.',
      'Use the tester\'s "no-trip" or "low-current" Zs mode. The tester limits its test current below the RCD trip threshold (typically 15 mA peak for a 30 mA RCD), giving a slightly less accurate reading but avoiding nuisance trip during the test. Standard "high-current" Zs mode would draw enough current to trip the RCD, interrupting other circuits on the same RCD.',
      'Keep pressing TEST until the RCD trips.',
      'Test only at the CU, never at the accessory.',
    ],
    correctIndex: 1,
    explanation:
      'Modern MFTs offer no-trip / low-current Zs modes specifically for RCD-protected circuits. The instrument injects a small DC bias to suppress the RCD\'s residual current detection during the brief test current pulse. Reading is slightly less accurate than the high-current mode (typically ±10 % vs ±5 %) but avoids tripping the RCD. Always select the right mode before testing — high-current Zs on an RCD-protected circuit trips the RCD and may also trip the upstream RCBO main switch.',
  },
  {
    id: 'm5-s4-sub1-table-41-3',
    question: 'Measured Zs at the furthest point on a Type B 32 A radial socket circuit = 1.05 Ω. A4:2026 Table 41.3 max Zs (B32) = 1.37 Ω. Compliance:',
    options: [
      'Pass — 1.05 < 1.37.',
      'Apply the 0.8 rule for measured-vs-table comparison: Zs(measured) ≤ 0.8 × Zs(table) = 0.8 × 1.37 = 1.10 Ω. 1.05 ≤ 1.10 → pass with small margin (5 %). Worth noting on the schedule that compliance is borderline; investigate any reasons the cable might be hot in service (long run, bundled cables, high ambient temperature).',
      'Add Ze and compare to 1.37 Ω.',
      'Multiply by RCD trip current.',
    ],
    correctIndex: 1,
    explanation:
      'Table 41.3 values are stated at conductor operating temperature (typically 70 °C). Measured Zs is at ambient — the cable resistance will rise in service. The 0.8 rule corrects approximately for this: Zs(measured) ≤ 0.8 × Zs(table). 1.05 < 1.10 passes but only just. For comfortable headroom, electricians prefer Zs(measured) ≤ 0.7 × Zs(table). On a borderline result, double-check the cable route length, look for any resistance contributors (poor terminations, undersized CPC), and document the marginal pass on the schedule.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'The earth fault loop path on a TN-C-S installation consists of:',
    options: [
      'Just the cable.',
      'Line conductor from supply transformer through cable / supplier service to MET, internal cable line conductor (R1) through to fault point, fault path, CPC (R2) back to MET, MET to supplier earth (combined neutral-earth conductor on TN-C-S), supplier neutral / PEN back to transformer star point.',
      'Air gap.',
      'Soil only.',
    ],
    correctAnswer: 1,
    explanation:
      'The TN-C-S earth fault loop: transformer secondary → service cable line conductor → cut-out → consumer line conductor (R1) → fault point → exposed-conductive-part → CPC (R2) → MET → combined PEN conductor in service cable → transformer secondary star point. Total impedance Zs = Ze (everything outside the installation) + R1+R2 (everything inside). Low impedance = high fault current = fast disconnection by overcurrent device.',
  },
  {
    id: 2,
    question: 'The earth fault loop path on a TT installation:',
    options: [
      'Identical to TN-C-S.',
      'Line conductor from supply transformer through cable to consumer\'s line, R1 through to fault, fault path, CPC R2 back to MET, MET to consumer\'s earth electrode, soil mass between consumer\'s electrode and supply transformer\'s electrode (typically 30-200+ Ω), supply transformer earth back to star point.',
      'No earth fault loop exists.',
      'Through the gas pipe.',
    ],
    correctAnswer: 1,
    explanation:
      'TT loop replaces the supplier\'s metallic earth path with the soil mass between consumer\'s and supplier\'s electrodes. Soil impedance is high (30-200+ Ω typical) — earth-fault current is much lower than TN, far too low for an MCB to clear in time. RCDs are the protective measure for TT, with the Ra × IΔn ≤ 50 V criterion giving touch-voltage protection.',
  },
  {
    id: 3,
    question: 'Live Zs measurement at the furthest point on a circuit gives:',
    options: [
      'Just R1+R2.',
      'The complete earth fault loop impedance — Ze (external supply network impedance to the consumer\'s MET) plus R1+R2 (line + CPC of the circuit from MET to test point). The measured value should equal the calculated Zs from Ze (measured live) and R1+R2 (measured dead in Section 3) within instrument tolerance.',
      'Only the supply impedance.',
      'Insulation resistance.',
    ],
    correctAnswer: 1,
    explanation:
      'Live Zs at the test point measures the full loop — supply network plus consumer cabling out to the test point. Should agree with Ze + R1+R2 from the dead-test phase. Significant discrepancy means either the dead test or the live test result is wrong — investigate (re-test, verify instrument calibration, check the test point you are at really is the furthest).',
  },
  {
    id: 4,
    question: 'A4:2026 Table 41.3 Zs limits are stated for cable at:',
    options: [
      'Ambient temperature.',
      'Operating temperature — typically 70 °C for thermoplastic-insulated cable. The values apply when the cable is fully loaded and warm. Measured Zs is at ambient (cool) conductor temperature; the standard correction is to require measured Zs ≤ 0.8 × table Zs to allow for the resistance increase as the cable warms in service.',
      'Whatever temperature the test was at.',
      'Sub-zero.',
    ],
    correctAnswer: 1,
    explanation:
      'Table 41.3 values assume worst-case operating conditions — full load, conductor at its rated operating temperature (70 °C for standard PVC-insulated cable). Cable resistance rises about 0.4 % per °C for copper, so a 50 °C rise from ambient to operating gives roughly a 20 % resistance increase. Measured Zs at 20 °C must be 0.8 × the table figure to be confidently below the limit when warm. Some prefer 0.7 × for additional margin.',
  },
  {
    id: 5,
    question: 'Why measure Zs live when you already calculated it from Ze + R1+R2 (dead)?',
    options: [
      'Habit.',
      'Independent verification. The dead-test calculation depends on Ze (one measurement) plus R1+R2 (one or many readings, depending on circuit). The live Zs measurement is one direct reading. Comparing the two catches errors in either method, gives confidence in the result, and provides a single value to compare against Table 41.3 with the 0.8 multiplier applied.',
      'To trip the RCD.',
      'To wear out the meter.',
    ],
    correctAnswer: 1,
    explanation:
      'Live Zs verification is the keystone test. Calculated Zs (Ze + R1+R2) and measured Zs (live test at the point) should agree within instrument tolerance. Discrepancy reveals either a bad dead-test reading, a bad live-test reading, or some structural issue (parallel earth paths, hidden joints, wrong cable size somewhere). Both numbers in the schedule = full audit trail. Live Zs is also the value the inspector compares against Table 41.3 because it captures the as-installed loop including any subtleties the dead test missed.',
  },
  {
    id: 6,
    question: '2-lead Zs measurement (L-E only):',
    options: [
      'Inferior — never use.',
      'Quicker than 3-lead, used when access to the neutral is impractical (e.g. testing at a fixed appliance with only L and E accessible). The instrument measures the L-E loop only; result is Zs directly without the auxiliary L-N measurement. Slightly less accurate than 3-lead but acceptable for routine Zs verification.',
      'Used only on TT systems.',
      'Requires no instrument.',
    ],
    correctAnswer: 1,
    explanation:
      '2-lead Zs uses just two probes — L and E (or live and earth) at the test point. The instrument briefly draws current through the L-E loop and computes impedance. Faster, simpler than 3-lead, but lacks the L-N reference measurement that some 3-lead modes use for noise rejection. Both methods satisfy Reg 643.7.3 for live Zs verification; choose by site practicality and instrument capability.',
  },
  {
    id: 7,
    question: 'Zs measurement at the supply origin gives:',
    options: [
      'R1+R2 of the longest circuit.',
      'Ze (external earth fault loop impedance at the origin) — the impedance of the path from a fault at the consumer\'s MET back to the supply transformer star point, via the supplier\'s earth path. For TN-C-S typically 0.10-0.35 Ω; for TN-S typically 0.20-0.50 Ω; for TT essentially the consumer\'s electrode resistance Ra (since the supplier\'s metallic earth path is absent).',
      'The cable temperature.',
      'Only insulation.',
    ],
    correctAnswer: 1,
    explanation:
      'Ze = external earth fault loop impedance at the origin of the installation, measured by Zs test at the incoming side of the consumer\'s main switch. For TN systems Ze is small (the supplier\'s earth path); for TT it equals Ra (the consumer\'s electrode plus soil to supply earth). Ze is the foundation value for every circuit\'s Zs calculation — Zs = Ze + R1+R2.',
  },
  {
    id: 8,
    question: 'GN3 warns that EFLI tests use the supply voltage and create:',
    options: [
      'No hazard.',
      'Hazardous touch potentials on conductive parts during the test. The test current creates a voltage drop across the loop impedance — exposed-conductive-parts in the circuit may briefly rise toward line voltage during the test. Testers must control access to exposed conductive parts during these tests, follow safe working practices, and not allow others to touch the installation while testing.',
      'No effect on the RCD.',
      'Permanent damage.',
    ],
    correctAnswer: 1,
    explanation:
      'GN3 explicit safety warning: "Earth fault loop impedance tests use the supply voltage. Use of the supply voltage during EFL tests can produce voltages on exposed conductive parts and create electric shock risk; persons conducting these tests shall take appropriate safety measures." During the brief test pulse, exposed metalwork in the circuit being tested can momentarily rise to a touch-voltage that depends on the loop impedance and the test current. Manage access — do not allow others to touch the installation during the test.',
  },
];

const faqs = [
  {
    question: 'What\'s the difference between Ze and Zs?',
    answer:
      'Ze (external) is the earth fault loop impedance from the consumer\'s MET back to the supply transformer star point — everything OUTSIDE the consumer\'s installation. Measured at the supply origin with the installation\'s earthing conductor disconnected. Zs (system) is the COMPLETE earth fault loop including Ze plus the consumer\'s circuit cabling (R1+R2) out to a specific point. Measured at any point on a circuit. Zs = Ze + R1+R2.',
  },
  {
    question: 'Which Zs do I record on the schedule of test results?',
    answer:
      'The Zs at the FURTHEST point on the circuit — the worst-case loop impedance for that circuit. If you test at every accessory and they all pass, the highest reading is the one to record. Record the value as measured (no temperature correction applied — the schedule documents the raw reading, the inspector applies the 0.8 multiplier when judging compliance against Table 41.3).',
  },
  {
    question: 'Can I just calculate Zs from Ze + R1+R2 instead of live testing?',
    answer:
      'BS 7671 requires the live Zs measurement as part of Reg 643.7.3 verification — the calculation from dead-test values is corroborative, not a replacement. Live measurement catches issues the dead test misses (parallel earth paths, hidden joints, transient supply impedance variations). Both values on the STR provide the full audit trail. The live value is what the inspector compares against Table 41.3.',
  },
  {
    question: 'My measured Zs is HIGHER than my calculated Ze + R1+R2 — what gives?',
    answer:
      'Possible causes: instrument tolerance (typically ±5-10 % each, can compound), the live test was at a slightly different point than the dead test (e.g. a spur not previously tested), supply voltage was lower at live test time (lower supply voltage means slightly higher loop impedance reading), or there\'s a contributor that only appears under load (loose neutral termination, parallel CPC path that disconnects under fault current). Investigate if the discrepancy is greater than 20 %.',
  },
  {
    question: 'Why does the supply voltage affect Zs readings?',
    answer:
      'The Zs tester measures impedance by applying a known test current and measuring voltage drop, then computing Z = V/I. If the supply voltage drops momentarily during the test (because of high background load on the network), the test current may be slightly different than the instrument expects — leading to a small reading error. Modern testers compensate, but on weak rural supplies you may see Zs readings vary slightly between test cycles.',
  },
  {
    question: 'Does Zs vary throughout the day?',
    answer:
      'Yes, slightly. Supply voltage fluctuates with network demand — early morning and late evening peaks reduce voltage by a few volts, increasing apparent Zs by a few percent. For verification work this is within instrument tolerance and not material. For borderline-pass results worth retesting at a different time of day to confirm. For commissioning, test under normal supply conditions and document the reading.',
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
            onClick={() => navigate('/study-centre/apprentice/level3-module5-section4')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 4
          </button>

          <PageHero
            eyebrow="Module 5 · Section 4 · Subsection 1"
            title="Zs measurement — 3-lead and 2-lead methods"
            description="Live earth fault loop impedance per Reg 643.7.3. Three-lead (L-N-E) and two-lead (L-E) methods, no-trip RCD modes, A4:2026 Table 41.3 comparison with the 0.8 multiplier, and the full earth fault loop traced for TN-C-S, TN-S and TT systems."
            tone="emerald"
          />

          <TLDR
            points={[
              'Reg 643.7.3 mandates live Zs verification at the supply origin (Ze) and at every circuit\'s furthest point.',
              '3-lead method: probes connect to L, N, E. Tester measures L-N and L-E loops separately, computes Zs. 2-lead method: just L-E, simpler and faster.',
              'On RCD-protected circuits, use no-trip / low-current Zs mode to avoid tripping the RCD during the test. Slightly less accurate but avoids nuisance trips.',
              'Compare measured Zs against A4:2026 Table 41.3 limits using the 0.8 multiplier. For Type B 32 A: 1.37 Ω table limit, 1.10 Ω measured limit at ambient temperature.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Trace the earth fault loop path for TN-C-S, TN-S and TT installations and identify the impedance components (AC 6.3).',
              'Describe the 3-lead and 2-lead live Zs measurement methods and select appropriately for the test point access (AC 6.4).',
              'Use no-trip / low-current Zs modes on RCD-protected circuits to avoid nuisance tripping during verification.',
              'Apply the 0.8 measured-vs-table multiplier when comparing measured Zs against A4:2026 Table 41.3 limits.',
              'Identify discrepancies between calculated Zs (Ze + R1+R2 from dead testing) and measured Zs and investigate the cause.',
              'Apply GN3 safety guidance on EFLI tests — manage access to exposed conductive parts during testing.',
              'Record Zs at the furthest point of each circuit on the Schedule of Test Results.',
            ]}
            initialVisibleCount={4}
          />

          <ContentEyebrow>The earth fault loop — what Zs is measuring</ContentEyebrow>

          <ConceptBlock
            title="Trace the loop from fault back to source"
            plainEnglish="When line touches an exposed-conductive-part (a fault), current flows from the line conductor, through the fault, into the metalwork, through the CPC back to the MET, then via the supplier's earth path back to the supply transformer's star point, and back via the supply line to where it started. Zs is the total impedance of that loop. Low Zs = high fault current = fast disconnection by the protective device."
            onSite="Picture the loop physically. On a TN-C-S domestic install: faulted appliance casing → CPC up the wall → CPC of the radial back to the CU's earth bar → main earthing conductor down to the MET → out through the consumer's neutral-earth bond → back along the supplier's combined PEN conductor in the service cable to the cut-out → up the service cable to the substation transformer → through one secondary winding → and back via the live core of the service cable into the consumer's CU. That whole loop has impedance — that's Zs."
          >
            <p>The earth fault loop components by earthing system:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>TN-C-S (PME / PNB):</strong> Loop = transformer secondary → service cable
                line → consumer line (R1) → fault → CPC (R2) → MET → consumer\'s neutral-earth
                bond → supplier\'s combined PEN → transformer star point. Ze typically
                0.10-0.35 Ω; total Zs typically 0.3-1.0 Ω for short circuits.
              </li>
              <li>
                <strong>TN-S:</strong> Loop = transformer secondary → service cable line →
                consumer line (R1) → fault → CPC (R2) → MET → supplier\'s separate earth
                conductor (typically the cable sheath) → transformer earth → star point. Ze
                typically 0.20-0.50 Ω.
              </li>
              <li>
                <strong>TT:</strong> Loop = transformer secondary → service cable line →
                consumer line (R1) → fault → CPC (R2) → MET → consumer\'s earth electrode →
                soil mass → supplier\'s transformer earth electrode → transformer earth → star
                point. The soil impedance dominates — Ze ≈ Ra, typically 30-200+ Ω.
              </li>
            </ul>
            <p>
              For TN systems, Zs values fit comfortably within Table 41.3 limits and
              overcurrent devices (MCBs / fuses / RCBOs) provide ADS via overcurrent
              disconnection. For TT, Zs is far too high for overcurrent ADS — RCDs are
              required (verified by Ra × IΔn ≤ 50 V from Section 3 Sub 6 and the live RCD
              trip-time test in Sub 3 of this section).
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 643.7.1 (Verification of ADS by Zs measurement) and Table 41.3 (Maximum Zs values). The 0.8 multiplier is IET GN3 guidance, not a BS 7671 regulation."
            clause={`BS 7671 Reg 643.7.1: The verification of the effectiveness of the measures for fault protection by automatic disconnection of supply is effected as follows — (a) TN system: Compliance with Regulation 411.4 shall be verified by (i) measurement of the earth fault loop impedance (see Regulation 643.7.3); (ii) verification of the characteristics and/or the effectiveness of the associated protective device. Table 41.3 lists the maximum measured Zs values that satisfy Regulation 411.4 disconnection times for the listed protective devices.

IET GN3 guidance (separate from BS 7671): A practical "rule of thumb" of Zs(measured) ≤ 0.8 × Zs(table) is commonly applied on site to allow for the difference between the cable conductor temperature at test (ambient) and the 70 °C operating temperature assumed by the Table 41.3 values. This 0.8 factor is GUIDANCE, not a BS 7671 regulation — the strict regulatory comparison is against Table 41.3 with temperature correction per GN3 Appendix B.`}
            meaning={
              <>
                Live Zs verification per circuit, compared against Table 41.3. Two distinct
                things in the same RegsCallout:{' '}
                <strong>(1) the regulation</strong> (Reg 643.7.1 + Table 41.3) sets the duty —
                measure Zs, confirm it satisfies Regulation 411.4 via Table 41.3.{' '}
                <strong>(2) the 0.8 multiplier</strong> is GN3 guidance, NOT BS 7671 — Table 41.3
                values assume conductors at 70 °C operating temperature while measured Zs is taken
                at ambient (typically 15–25 °C), and 0.8 is a practical correction. For rigorous
                correction use GN3 Appendix B per-degree coefficients.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 6, Chapter 64, Regulation 643.7.1 and Table 41.3. The 0.8 multiplier is IET Guidance Note 3 guidance, not a BS 7671 regulation."
          />

          <EarthingSystemDiagram />

          <SectionRule />

          <ContentEyebrow>The 3-lead method — L, N, E at the test point</ContentEyebrow>

          <ConceptBlock
            title="Three probes — L, N, E — and a dual-loop measurement"
            plainEnglish="The 3-lead Zs test connects three probes to the test point: one to line (live), one to neutral, one to earth. The instrument briefly applies a known test current via the L-N loop and measures the voltage drop, then via the L-E loop. Both readings inform the Zs computation, and the L-N measurement supports noise rejection and helps distinguish supply impedance from consumer cabling impedance."
            onSite="The 3-lead method gives the most accurate Zs reading on a properly accessible test point. Most MFTs (Megger MFT1741+, Fluke 1664FC, Kewtech KT64+) default to 3-lead when all three terminals are connected."
          >
            <p>3-lead Zs test setup and procedure:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                Verify the circuit is energised and the protective device is closed.
              </li>
              <li>
                Select Zs mode on the MFT. For RCD-protected circuits, select no-trip / low-
                current mode (typically 15 mA pulse limit).
              </li>
              <li>
                Connect the three test leads to L, N and E at the test point — for a socket,
                use a socket adapter; for a fixed appliance with no socket, connect via the
                accessible terminals at the appliance.
              </li>
              <li>
                Press TEST. The instrument briefly draws current via L-N and via L-E,
                computes loop impedances, and displays Zs. Some testers also display the
                separate L-N (Zs(L-N)) and L-E (Zs(L-E)) readings.
              </li>
              <li>
                Note the Zs reading. Sanity-check against the calculated Ze + R1+R2 from the
                dead-test phase — should agree within instrument tolerance (±10 %).
              </li>
              <li>
                Compare against Table 41.3 limit for the protective device using the 0.8
                multiplier. For Type B 32 A, max Zs = 1.37 Ω, corrected = 1.10 Ω.
              </li>
              <li>
                Record on the Schedule of Test Results in the Zs column.
              </li>
            </ol>
            <p>
              <strong>3-lead method advantages:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                More accurate than 2-lead — the auxiliary L-N measurement provides reference
                for noise rejection.
              </li>
              <li>
                Some testers use the L-N reading to give better RCD avoidance (the L-N
                measurement doesn\'t involve the CPC so doesn\'t risk RCD trip).
              </li>
              <li>
                Supports both PFC (prospective fault current) calculation from L-N and PEFC
                (prospective earth fault current) from L-E in the same test cycle.
              </li>
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

          <ContentEyebrow>The 2-lead method — L and E only</ContentEyebrow>

          <ConceptBlock
            title="Two probes — quicker, simpler, used when N is not accessible"
            plainEnglish="The 2-lead Zs test uses just two probes — L and E at the test point. The instrument draws test current via the L-E loop and computes impedance directly. Faster than 3-lead because there's no auxiliary L-N measurement, and useful where the neutral isn't easily accessible (e.g. testing at a fixed appliance, a junction box, or any termination with only L and E available)."
            onSite="On a fixed appliance like a built-in oven, the connection unit may give you access to L and E but not directly to N (which loops through the appliance internals). 2-lead Zs at the connection unit is the practical answer."
          >
            <p>2-lead Zs test setup and procedure:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                Verify the circuit is energised.
              </li>
              <li>
                Select Zs mode on the MFT, 2-lead variant if your meter has it (some use a
                "PSCC / PEFC" mode that takes a single L-E reading).
              </li>
              <li>
                Connect the two test leads to L and E at the test point.
              </li>
              <li>
                Press TEST. Reading is Zs directly.
              </li>
              <li>
                Note the reading, sanity-check against calculated Zs from the dead-test phase,
                compare against Table 41.3 with the 0.8 multiplier.
              </li>
              <li>
                Record on the Schedule of Test Results.
              </li>
            </ol>
            <p>
              <strong>2-lead method considerations:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Slightly less accurate than 3-lead (no L-N reference, fewer noise rejection
                options).
              </li>
              <li>
                Works where neutral is inaccessible — fixed appliances, junction boxes,
                lighting circuits at switches (where only the switched line and earth may be
                directly reachable).
              </li>
              <li>
                Cannot give PFC (line-neutral fault current) — only PEFC (line-earth fault
                current). For full PFC verification you need 3-lead or a separate L-N
                measurement.
              </li>
              <li>
                Compatible with no-trip / low-current modes on most MFTs.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>RCD avoidance — no-trip and low-current modes</ContentEyebrow>

          <ConceptBlock
            title="Don't trip the RCD during the Zs test"
            plainEnglish="A standard high-current Zs test injects 10-25 A of test current via the L-E loop for a few cycles. On an RCD-protected circuit, that test current looks exactly like a fault — the RCD trips, interrupting other circuits on the same RCD. No-trip / low-current modes inject much smaller currents (typically under 15 mA) that stay below the 30 mA RCD trip threshold, allowing the test without tripping."
            onSite="Always check what RCD protection is upstream of the test point BEFORE pressing TEST. On a domestic CU with all-RCBO, every circuit is RCD-protected — always use no-trip mode. On an older split-load board, only the RCD-side circuits need no-trip."
          >
            <p>How modern MFTs avoid tripping the RCD during Zs testing:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Low-current pulse.</strong> The instrument limits the test current peak
                to below the RCD\'s trip threshold — typically 15 mA peak for a 30 mA RCD. The
                tester compensates for the small current by averaging over multiple cycles or
                using more sensitive voltage detection.
              </li>
              <li>
                <strong>DC bias technique.</strong> The instrument briefly applies a small DC
                offset to the test current. AC RCDs (Type AC) cannot detect DC residual current,
                so the brief DC bias suppresses the RCD\'s sensing during the test pulse.
              </li>
              <li>
                <strong>Fast pulse.</strong> The test current pulse is shorter than the RCD\'s
                response time, allowing the measurement before the RCD has time to react.
              </li>
            </ul>
            <p>
              <strong>When to use which mode:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>No-trip / low-current:</strong> Always on RCD-protected circuits. Default
                for modern domestic installations (all-RCBO boards, RCD-protected sockets).
              </li>
              <li>
                <strong>Standard / high-current:</strong> Acceptable on circuits NOT protected by
                an RCD (e.g. lighting circuits in older non-RCD boards, fixed appliances on
                non-RCD circuits). Higher accuracy than low-current mode.
              </li>
            </ul>
            <p>
              <strong>Caveat:</strong> some older RCDs (Type AC, lower sensitivity) trip on
              even no-trip mode test currents because their response is faster than expected
              or their threshold drift has reduced their nominal trip current. If a no-trip mode
              test trips the RCD, switch off, reset, and try testing further upstream where
              RCD protection doesn\'t apply (or accept the trip and reset between tests).
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

          <ContentEyebrow>Comparing measured Zs against Table 41.3</ContentEyebrow>

          <ConceptBlock
            title="The 0.8 multiplier — measured-vs-table compliance"
            plainEnglish="A4:2026 Table 41.3 lists maximum Zs values for each protective device type and rating, assuming conductor temperature of 70 °C (PVC operating temperature). Your measured Zs is at ambient (15-25 °C typically). Cable resistance rises with temperature — about 20 % from 20 °C to 70 °C for copper. The standard correction: measured Zs ≤ 0.8 × table Zs."
            onSite="Carry the 0.8 multiplier table in your head for common device ratings. Type B 32 A: table 1.37 Ω, measured 1.10 Ω. Type B 16 A: table 2.74 Ω, measured 2.19 Ω. Type B 6 A: table 7.28 Ω, measured 5.83 Ω. The numbers come up over and over — knowing them by heart speeds up site work."
          >
            <p>
              A4:2026 Table 41.3 summary (max Zs values for typical Type B devices, with 0.8
              measured limit):
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Type B 6 A:</strong> Table = 7.28 Ω, measured limit = 5.83 Ω.
              </li>
              <li>
                <strong>Type B 10 A:</strong> Table = 4.37 Ω, measured limit = 3.50 Ω.
              </li>
              <li>
                <strong>Type B 16 A:</strong> Table = 2.74 Ω, measured limit = 2.19 Ω.
              </li>
              <li>
                <strong>Type B 20 A:</strong> Table = 2.19 Ω, measured limit = 1.75 Ω.
              </li>
              <li>
                <strong>Type B 32 A:</strong> Table = 1.37 Ω, measured limit = 1.10 Ω.
              </li>
              <li>
                <strong>Type B 40 A:</strong> Table = 1.09 Ω, measured limit = 0.87 Ω.
              </li>
            </ul>
            <p>
              <strong>For Type C devices,</strong> the magnetic trip threshold is higher (5-10 ×
              In rather than 3-5 × In), so Table 41.3 limits are roughly half the Type B
              values. For example Type C 32 A max Zs = 0.69 Ω table, 0.55 Ω measured — much
              tighter than Type B.
            </p>
            <p>
              <strong>For Type D devices</strong> (motor protection, very high inrush devices),
              limits are tighter still — Type D 32 A max Zs ≈ 0.34 Ω. Always check the actual
              Table 41.3 row for the device installed.
            </p>
            <p>
              <strong>Beyond the 0.8 multiplier:</strong> for full rigour, GN3 Appendix B gives
              per-degree temperature coefficients. For copper: Rcorrected = Rmeasured × (1 + α
              × (T_op - T_measured)) where α ≈ 0.004 / °C. For ambient = 20 °C and operating =
              70 °C: correction = (1 + 0.004 × 50) = 1.20. So measured Zs × 1.20 should be
              ≤ table Zs — equivalent to measured ≤ table / 1.20 = table × 0.833. The 0.8
              multiplier rounds this down for safety margin.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <ConceptBlock
            title="Measuring Ze at the origin — disconnect the consumer's earth, test back to source"
            plainEnglish="Ze is the impedance of everything OUTSIDE the consumer's installation — supplier service cable, transformer, supplier earth path. To measure it cleanly you have to break the consumer's contribution by lifting the main earthing conductor at the MET, isolate the consumer's main switch, and then take a Zs reading at the origin between the L terminal and the consumer's earth bar. What you read is Ze alone."
            onSite="The Ze test is the keystone live test. Get Ze right and every circuit's Zs has a solid foundation. Get it wrong and every Zs that follows inherits the error. Booked time: 10 minutes if access to the MET is straightforward, longer if the bond is taped and clamped down behind a CU."
          >
            <p>
              Ze test procedure (TN systems):
            </p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                Verify safe isolation. Lock off the main switch at the consumer's CU. Prove dead at the L-N and L-E terminals on the consumer side using a proving unit (Martindale VI-13800 or equivalent).
              </li>
              <li>
                Disconnect the main earthing conductor from the MET. On TN-C-S the consumer's earth and neutral are bonded at the cut-out — disconnecting the main earthing conductor breaks the consumer's contribution to the loop without affecting the supplier's PEN.
              </li>
              <li>
                Re-energise the main switch. The consumer's earth bar is now isolated from the supplier earth (consumer side disconnected at the MET). The L-E loop the meter sees is the supplier's path alone — Ze.
              </li>
              <li>
                Connect the MFT in Zs mode (no-trip if any RCD is upstream of the test point — usually not on the line side of the main switch). Measure between the L terminal of the cut-out (or main switch input) and the disconnected end of the main earthing conductor.
              </li>
              <li>
                Press TEST. Reading is Ze. Typical values: TN-C-S 0.10-0.35 Ω, TN-S 0.20-0.50 Ω.
              </li>
              <li>
                Isolate, re-make the MET termination, lock off, prove dead one more time, re-energise, and proceed to circuit Zs tests.
              </li>
            </ol>
            <p>
              <strong>TT installations:</strong> Ze on TT is dominated by Ra (the consumer's earth electrode resistance to soil). Disconnecting the main earthing conductor and measuring L-E at the origin reads Ra plus the supplier's path — but on TT the supplier's metallic earth path is absent, so Ze ≈ Ra. Typical TT Ze: 30-200+ Ω depending on soil moisture and electrode design (Sub 6 of Section 3 covers the dedicated Ra test).
            </p>
            <p>
              <strong>Sanity check:</strong> If Ze comes back implausibly low (under 0.05 Ω) on a domestic TN-C-S install, suspect the main earthing conductor was not actually disconnected — the meter is reading R1+R2 of the consumer side in parallel. Re-check the disconnect, repeat the test.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="PFC, PSCC and PEFC — what they mean and where each is measured"
            plainEnglish="Three different prospective fault currents you might see on test reports and the EIC. PFC (Prospective Fault Current) = generic term, often the higher of the two. PSCC (Prospective Short-Circuit Current) = L-N fault, between phase and neutral. PEFC (Prospective Earth Fault Current) = L-E fault, between phase and earth. Per Reg 643.7.3.201 these must be measured, calculated or determined at origin and other relevant points."
            onSite="On a 3-lead Zs tester you'll often see all three displayed: Zs(L-N), Zs(L-E), PSCC, PEFC. The breaking capacity of every protective device must be ≥ the prospective fault current at that point (Reg 434.5.1). PSCC is usually the higher of the two on TN-C-S because the L-N loop has lower impedance than L-E. Document the higher value as PFC on the EIC."
          >
            <p>
              Each parameter and its use:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>PSCC (Prospective Short-Circuit Current).</strong> = U0 / Z(L-N). The current that would flow in a bolted L-N fault at the test point. Drives breaking capacity selection for L-N fault clearance — typically the higher figure on TN-C-S because the consumer's neutral is bonded to the supplier's PEN at the cut-out, giving a low-impedance return.
              </li>
              <li>
                <strong>PEFC (Prospective Earth Fault Current).</strong> = U0 / Zs. The current that would flow in a bolted L-E fault at the test point. Drives the disconnection-time check — Zs must be low enough that the protective device clears within Table 41.1.
              </li>
              <li>
                <strong>PFC (Prospective Fault Current).</strong> The HIGHER of PSCC and PEFC, recorded on the EIC under "Particulars of the supply at the origin". This is what every protective device's breaking capacity must exceed (Reg 434.5.1).
              </li>
            </ul>
            <p>
              <strong>Typical UK domestic values at origin:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>TN-C-S urban supply:</strong> PSCC 1.5-3.0 kA, PEFC 0.5-1.5 kA. PFC = PSCC (higher), document as 2-3 kA. Standard domestic MCBs (BS EN 60898) at 6 kA Icn cover this comfortably.
              </li>
              <li>
                <strong>TN-S older supply:</strong> PSCC 0.8-2.0 kA, PEFC 0.4-1.0 kA. PFC = PSCC.
              </li>
              <li>
                <strong>TT rural supply:</strong> PSCC 0.5-1.5 kA, PEFC very low (under 10 A typically — limited by Ra).
              </li>
              <li>
                <strong>Commercial three-phase 100 A service:</strong> PSCC up to 16 kA at the cut-out — standard domestic 6 kA MCBs would NOT meet 434.5.1 here, you need 10 kA Icn or higher devices.
              </li>
            </ul>
            <p>
              On the 3-lead MFT (Megger MFT1741+, Fluke 1664FC, Kewtech KT64+) the test cycle that delivers Zs also delivers PSCC and PEFC. Press TEST once, read all three. Document on the EIC and the Schedule of Test Results — the inspector verifying breaking capacity selection needs both PSCC and PEFC to confirm every device is correctly rated.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Diagnosing borderline and failing Zs results"
            plainEnglish="A Zs reading that's close to the limit (or fails) is a finding to investigate. The methodical approach: check the calculation chain (Ze, R1+R2, instrument tolerance), check the cable route, check terminations, check for unexpected parallel paths."
            onSite="Don't just retest hoping for a different number. Investigate. Most borderline-fail Zs results come from a longer cable run than expected, a loose terminal somewhere on the CPC, or an undersized CPC slipped into the install."
          >
            <p>Diagnostic checklist for borderline / failing Zs:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Verify the Ze.</strong> Re-test Ze at the supply origin. A high Ze
                propagates to every circuit Zs. Investigate causes — supplier earth path
                degradation, MET termination corrosion, missing or removed neutral-earth bond.
              </li>
              <li>
                <strong>Verify the R1+R2 from dead testing.</strong> Re-test R1+R2 at the same
                accessory. Compare against expected from cable size and route length (GN3 Table
                B1). High R1+R2 = poor termination, broken strand, undersized CPC.
              </li>
              <li>
                <strong>Check route length.</strong> The actual cable run may be longer than
                the design assumption. Walk the cable route, measure where possible.
              </li>
              <li>
                <strong>Check the CPC size.</strong> Is the cable as installed what was
                designed? A 1.5 mm² CPC where 2.5 mm² was specified gives roughly 1.6 × the
                CPC resistance — could push a borderline circuit into fail.
              </li>
              <li>
                <strong>Look for resistance contributors.</strong> Loose terminals, corroded
                crimps, screw-terminal connections that have backed off, oxidised lug surfaces.
                Test continuity at every accessible termination on the circuit.
              </li>
              <li>
                <strong>Consider parallel earth paths.</strong> If R1+R2 from dead testing
                gave a low value via a parallel path (metal back-boxes touching earthed steel,
                etc.), the live Zs may be higher because the parallel path doesn\'t carry full
                fault current as effectively. Re-do dead testing with R2-only wander method to
                isolate the cable CPC.
              </li>
              <li>
                <strong>If still failing</strong> after diagnostic, consider remedial action:
                upgrade CPC, install supplementary bonding, change the protective device to a
                higher-sensitivity RCD type, or in extreme cases re-cable the circuit.
              </li>
            </ol>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>What goes wrong on site</ContentEyebrow>

          <CommonMistake
            title="Using high-current Zs mode on an RCD-protected circuit and tripping the whole RCD"
            whatHappens={
              <>
                You\'re testing a kitchen ring on a domestic install with an all-RCBO board.
                You forget to switch to no-trip mode, press TEST, and the RCBO trips. Two
                problems: (a) the test result is invalid because the supply was interrupted
                during the measurement; (b) you\'ve just tripped the customer\'s freezer, which
                they won\'t notice until the next day when the food spoils. The customer is
                cross. The verification work has to be redone with the right mode anyway.
              </>
            }
            doInstead={
              <>
                Always check the RCD protection status BEFORE pressing TEST. On a domestic
                install with all-RCBO board, default to no-trip mode for every Zs test. Look
                at the device label or the schedule of inspections — if it\'s an RCBO, RCD or
                AFDD-RCBO, no-trip mode is the right choice. Many MFTs have a setting that
                defaults to no-trip until you explicitly select high-current — set this once
                and forget. The slight accuracy loss of no-trip mode is far outweighed by not
                inconveniencing the customer.
              </>
            }
          />

          <Scenario
            title="Live Zs verification on a small office board — Fluke 1664FC"
            situation={
              <>
                Small office in Reading, 8-way all-RCBO consumer unit, six radial circuits
                including a 32 A office ring final, two 16 A workstation radials, a 16 A kitchen
                radial, a 6 A lighting circuit, and a 32 A EVSE radial in the underground car
                park. TN-C-S supply, dead testing complete with Ze = 0.28 Ω at the origin and
                circuit R1+R2 values recorded. Time for live Zs verification across the board.
              </>
            }
            whatToDo={
              <>
                Energise the supply, close all RCBOs. On the Fluke 1664FC, select Zs mode,
                no-trip / low-current variant (because every circuit is RCBO-protected). Start
                with the office ring final — at the furthest socket from the CU, plug in the
                socket adapter, press TEST. Reading: 0.62 Ω. Sanity-check against dead-test
                value: Ze + R1+R2 = 0.28 + 0.32 = 0.60 Ω — agrees within 4 %. Compare against
                A4:2026 Table 41.3 Type B 32 A limit: table 1.37 Ω, 0.8 corrected = 1.10 Ω.
                0.62 Ω passes comfortably (45 % of limit). Move to the workstation radials —
                Zs at the furthest workstation socket = 0.85 Ω each (Type B 16 A: table 2.74 Ω,
                0.8 corrected = 2.19 Ω, comfortable pass). Kitchen radial 16 A — Zs = 0.78 Ω,
                pass. Lighting circuit 6 A — Zs at the furthest fitting = 1.45 Ω (Type B 6 A:
                table 7.28 Ω, 0.8 corrected = 5.83 Ω, comfortable pass). EVSE radial 32 A in
                car park — long run from CU to charger position, Zs = 1.05 Ω. Check Type B 32 A
                limit 1.10 Ω measured — passes by only 5 %. Investigate: cable route is 35 m,
                cable size 6 mm² with 6 mm² CPC. Recalculate expected R1+R2 from GN3 Table B1
                — 35 × (3.08 + 3.08) mΩ/m = 0.215 Ω. Add Ze 0.28 = expected Zs 0.50 Ω at 20 °C.
                Measured 1.05 Ω is more than double expected — investigate. Check terminations
                at the EVSE position — find a marginal crimp on the CPC at the charger\'s
                termination box. Re-make the crimp with a proper hydraulic crimp tool, retest
                Zs = 0.55 Ω. Pass with comfortable margin. Document everything: Zs per circuit,
                instrument used, no-trip mode applied, the EVSE remediation noted with before
                and after readings. Proceed to RCD trip-time tests in Sub 3.
              </>
            }
            whyItMatters={
              <>
                The Zs test is the keystone live verification — it ties together the dead-test
                R1+R2 work and the live supply impedance Ze, and it\'s what the Table 41.3
                comparison fundamentally rests on. Borderline results aren\'t a fail to be
                rationalised away; they\'re a finding to investigate. The EVSE example shows
                why: a slightly-passing Zs read prompted investigation, found a poor termination,
                allowed a remediation that brought the circuit comfortably within compliance.
                Without the live test, the dead-test calculation would have looked fine (the
                marginal crimp wouldn\'t show in a low-current continuity test) and the
                installation would have shipped with a latent fault that would degrade further
                under load. Live Zs catches what dead testing alone misses.
              </>
            }
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 411.3.1.2 (Table 41.1 disconnection times)"
            clause={
              <>
                Maximum disconnection times stated in Table 41.1 shall be applied to final
                circuits with a rated current not exceeding 63 A with one or more
                socket-outlets, and 32 A supplying only fixed connected current-using equipment.
              </>
            }
            meaning={
              <>
                Earth fault loop impedance (Zs) drives whether a circuit can disconnect within
                Table 41.1. The live test measures Zs at the worst-case point and feeds the
                comparison against the maximum permitted Zs for the protective device. Reading
                this regulation back-to-back with Table 41.1 and the device characteristics is
                the inspector&apos;s daily work.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Regulation 411.3.1.2."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 643.3 (single AC RCD test)"
            clause={
              <>
                Regulation 643.3 has been redrafted. Regardless of RCD Type (AC, A, F, B etc.),
                an alternating current test at rated residual operating current (IΔn) shall be
                used to verify the effectiveness of the RCD. The Time/current performance
                criteria for RCDs Table 3A in Appendix 3 has been deleted.
              </>
            }
            meaning={
              <>
                On the live-test stage, RCD verification is now a single AC test at 1×IΔn for
                every RCD type. The pre-A4 multi-current sequence is gone. EIC pro-formas, test
                schedules and apprentice toolbox-talks need rebuilding around the simplified
                method.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Regulation 643.3."
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Reg 643.7.3 mandates live Zs measurement at the supply origin (Ze) and at every circuit\'s furthest point. Compared against A4:2026 Table 41.3 with the 0.8 multiplier.',
              '3-lead method uses L, N, E probes at the test point. Dual-loop measurement (L-N and L-E) gives best accuracy and supports RCD avoidance modes.',
              '2-lead method uses just L and E. Quicker, used where N is inaccessible (fixed appliances, junction boxes). Slightly less accurate.',
              'On RCD-protected circuits ALWAYS use no-trip / low-current Zs mode. High-current mode trips the RCD, invalidates the reading, and inconveniences the customer.',
              'Compare measured Zs against Table 41.3 with 0.8 multiplier. Type B 32 A: table 1.37 Ω → measured limit 1.10 Ω. Type B 6 A: table 7.28 Ω → measured limit 5.83 Ω.',
              'Measured Zs should agree with calculated Ze + R1+R2 within ±10-20 %. Significant discrepancy = investigate either the dead-test or live-test result.',
              'TT installations have very high Zs (Ze ≈ Ra, typically 30-200+ Ω) — overcurrent ADS is not feasible, RCDs are mandatory protection.',
              'GN3 safety: EFLI tests use the supply voltage and create touch-voltage on exposed-conductive-parts during the test. Manage access to the installation while testing.',
            ]}
          />

          <Quiz title="Zs measurement — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module5-section3-6')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                3.6 Earth electrode
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module5-section4-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                4.2 EFLI — earth fault loop
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
