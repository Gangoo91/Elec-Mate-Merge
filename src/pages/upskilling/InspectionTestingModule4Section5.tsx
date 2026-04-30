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
    id: 'mod4-s5-floor-bands',
    question: 'A 230 V circuit reads 50 MΩ at 500 V DC. Which reading band is this in?',
    options: [
      'At the floor — borderline pass, investigate before recording',
      'Healthy but worth monitoring — well above the 1 MΩ floor but an order of magnitude below the hundreds-of-MΩ band a new dry installation typically delivers',
      'Off-the-scale ideal — record and move on',
      'Fail — below the Table 64 minimum',
    ],
    correctIndex: 1,
    explanation:
      '50 MΩ is a comfortable pass against the 1 MΩ Table 64 minimum, but it is not the hundreds-of-MΩ a new thermoplastic cable in dry conditions delivers. It sits in the middle band — pass, but with the cable somewhere along its degradation curve. On periodic inspection it is worth flagging for monitoring. On new work, investigate why it is not higher.',
  },
  {
    id: 'mod4-s5-temporary-vs-structural',
    question:
      'A circuit reads 0.6 MΩ. You disconnect a connected halogen transformer and re-test — the reading rises to 220 MΩ. What does this tell you?',
    options: [
      'The cable is failing',
      "The low reading was a TEMPORARY cause (the transformer's internal leakage path), not a structural cable defect. Record the cable-alone value, document the transformer disconnection in comments, and apply the 250 V DC post-connection step per Reg 643.3.3",
      'The meter was wrong on the first reading',
      'Both readings should be averaged',
    ],
    correctIndex: 1,
    explanation:
      "Temporary causes — connected equipment, moisture, surface contamination, SPDs — vanish when the cause is removed. Structural causes — mechanical damage, thermal damage, age-degraded insulation — persist. The recovery from 0.6 MΩ to 220 MΩ on disconnection is diagnostic: the cable is healthy; the transformer's internal earth-leakage path was loading the test.",
  },
  {
    id: 'mod4-s5-capacitance-settling',
    question:
      'On a 200 m run of T&E you apply 500 V DC and the reading climbs steadily for several seconds before stabilising. What is happening, and what value do you record?',
    options: [
      'Faulty meter — discard',
      'Cable capacitance is charging and dielectric absorption is decaying. Wait for the reading to stabilise (the meter typically holds the test voltage for a fixed dwell or you observe the live reading until it stops climbing) and record the steady-state value',
      'Record the first reading you see',
      'Average the climb',
    ],
    correctIndex: 1,
    explanation:
      'A long cable run is a long capacitor. Initial charging current and dielectric absorption combine to depress the early reading; the meter shows it climbing as the dielectric polarises. The steady-state value (after the climb stops) is the true insulation resistance. On modern testers the dwell is automatic; on simpler instruments you watch and record.',
  },
  {
    id: 'mod4-s5-eicr-coding',
    question:
      'During an EICR you measure 0.3 MΩ on a 230 V circuit. Equipment has been disconnected. What EICR code applies?',
    options: [
      'C3 — improvement recommended',
      'C2 — potentially dangerous, urgent remedial action required (insulation has degraded below the Table 64 minimum, fault loop integrity is compromised and continued service exposes occupants to risk)',
      'C1 — danger present, immediate action',
      'No code — record and move on',
    ],
    correctIndex: 1,
    explanation:
      'A measured IR below the Table 64 minimum on a final circuit is, by default, a C2: the protection-by-insulation principle is no longer satisfied, so a single further deterioration could create a phase-to-earth fault path. C1 is reserved for an immediately dangerous situation actually present (e.g. exposed live conductor); a low IR is rarely C1. C3 is for sub-optimal but compliant — a low-but-passing reading.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'BS 7671 Table 64 sets the minimum insulation resistance values. What are the three thresholds?',
    options: [
      '0.5 MΩ for everything',
      'SELV/PELV: 250 V DC test, 0.5 MΩ minimum. Up to and including 500 V (excluding the above): 500 V DC test, 1.0 MΩ minimum. Above 500 V: 1000 V DC test, 1.0 MΩ minimum',
      '1.0 MΩ on all circuits at 500 V DC',
      'Test voltage and minimum value are decided by the inspector',
    ],
    correctAnswer: 1,
    explanation:
      'Table 64 in BS 7671:2018+A4:2026 has three rows. SELV and PELV: test at 250 V DC, minimum insulation resistance 0.5 MΩ. Up to and including 500 V (excluding SELV/PELV): test at 500 V DC, minimum 1.0 MΩ. Above 500 V: test at 1000 V DC, minimum 1.0 MΩ. The same table is applied when verifying insulation resistance between non-earthed protective conductors and Earth.',
  },
  {
    id: 2,
    question:
      'A 500 V DC test on a domestic ring final reads 1.4 MΩ between line conductors with all sensitive equipment disconnected. What is the correct call?',
    options: [
      'Pass — above the 1.0 MΩ Table 64 minimum, record and move on',
      'Fail — below 200 MΩ',
      'Investigate further before passing — 1.4 MΩ on a clean cabling-only test is well below typical values (200+ MΩ on new T&E) and is a strong indicator of a developing fault, contamination or a load that has not been disconnected. Strictly compliant but operationally suspicious',
      'Pass and add an SPD',
    ],
    correctAnswer: 2,
    explanation:
      'Reg 643.3.2 says the result is "satisfactory" if not less than the Table 64 value. So 1.4 MΩ technically passes. But experienced inspectors recognise this as a yellow flag. Clean copper cabling with no SERDs in the path should read tens to hundreds of MΩ. Single-figure MΩ on cabling-only is the level at which "investigate" is the professional answer, even though "pass" is the regulatory answer.',
  },
  {
    id: 3,
    question:
      'You are testing a SELV strip-light circuit (12 V DC LED). Per Table 64 first row, what test voltage and what minimum value apply?',
    options: ['500 V DC, 1.0 MΩ', '250 V DC, 0.5 MΩ', '12 V DC, 0.1 MΩ', '1000 V DC, 1.0 MΩ'],
    correctAnswer: 1,
    explanation:
      'SELV and PELV circuits get the lowest test voltage (250 V DC) and the lowest minimum value (0.5 MΩ). The reasoning: SELV cabling is often smaller, less heavily insulated, and may include accessories that cannot withstand 500 V DC. The 0.5 MΩ floor reflects the lower nominal voltage and the consequence of a partial leakage being correspondingly less dangerous.',
  },
  {
    id: 4,
    question:
      'Reg 643.3.3 has its own minimum value separate from Table 64. What is it, and when does it apply?',
    options: [
      'Same as Table 64 — there is no separate value',
      '≥ 1 MΩ at 250 V DC, applied between live conductors and CPC after the equipment is connected, where the equipment was disconnected for the Table 64 stage',
      '≥ 0.5 MΩ at 500 V DC',
      '≥ 100 MΩ for new installations only',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 643.3.3 is the post-connection verification. After equipment that was disconnected for the Table 64 test is reconnected, a single 250 V DC test is applied between live conductors and the protective conductor connected to the earthing arrangement. The acceptance criterion is ≥ 1 MΩ — this is independent of Table 64 and is the minimum the regulation accepts for any circuit with reconnected sensitive equipment.',
  },
  {
    id: 5,
    question:
      'GN3 commentary identifies certain installation conditions where insulation resistance can be temporarily depressed. Which of these is a temporary cause that may resolve on its own?',
    options: [
      'Crushed cable behind a screw fixing',
      'Damp ingress at a saturated junction box following a leak — once dried out, the IR returns to normal. The remediation is to find and fix the water source; the cable insulation itself may be undamaged',
      'Wrong polarity at a CCU',
      'A missing CPC at a socket',
    ],
    correctAnswer: 1,
    explanation:
      'Damp installations are the textbook temporary case. GN3 highlights that water across an accessory or in a back box can drop IR by orders of magnitude, but once the source is found and the cable dries, the reading restores. A crushed cable, wrong polarity or missing CPC are structural problems — the IR will not improve until the physical defect is fixed.',
  },
  {
    id: 6,
    question:
      'You record 0.6 MΩ between L and CPC on a 230 V circuit at 500 V DC, with all SERDs disconnected. Reg 643.3.2 says the result is "satisfactory if not less than the appropriate value given in Table 64." How does this read?',
    options: [
      'Pass — close to 1 MΩ is good enough',
      'Fail — Table 64 row 2 minimum is 1.0 MΩ. 0.6 MΩ is non-compliant. The certificate cannot be issued for this circuit until the cause is found and resolved',
      'Pass after a retest at 250 V DC',
      'Pass — Table 64 only applies to new installations',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 643.3.2 explicitly says "shall be considered satisfactory if … not less than the appropriate value given in Table 64." 0.6 MΩ is less than 1.0 MΩ. Fail. Common causes: damp, contamination at a socket terminal, deteriorated insulation in older installations, or a load that was not disconnected. Investigate before re-recording.',
  },
  {
    id: 7,
    question:
      'A multi-circuit test at the consumer unit gives a single combined reading of 1.5 MΩ for the whole installation tested at once. What does Reg 643.3.2 require you to do?',
    options: [
      'Accept the combined reading and record once',
      'Each distribution circuit must be tested separately, with all its final circuits connected but with current-using equipment disconnected. A single combined reading on the whole installation is not the test the regulation requires',
      'Test only the live tails',
      'Test at 250 V DC instead',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 643.3.2 is specific: "the main switchboard and each distribution circuit tested separately, with all its final circuits connected but with current-using equipment disconnected." The reasoning: a parallel combination of acceptable circuits can mask one failing circuit. The headline reading is the geometric / parallel combination, not the worst-case circuit. Test individually.',
  },
  {
    id: 8,
    question:
      'Capacitance settling on a 500 V DC test on a circuit with several LED drivers — what is the expected behaviour, and how do you record the result?',
    options: [
      'Reading drops over time — record the lowest value',
      'Reading climbs over 15–60 s as the capacitors fully charge — wait for the value to stabilise and record the steady reading. The instantaneous value at the start of the test is not the insulation resistance',
      'Reading is instantaneous — record at t=0 always',
      'Reading is meaningless on circuits with capacitors',
    ],
    correctAnswer: 1,
    explanation:
      'The test current is initially absorbed by the capacitor as charging current. As the capacitor approaches full charge, the absorbed current falls to zero and what remains is the genuine leakage. The displayed insulation resistance therefore climbs from a low instantaneous value to a stable final value over 15–60 s. The stable value is the insulation reading; the instant reading is not.',
  },
  {
    id: 9,
    question:
      'On an EICR, you measure 0.8 MΩ at 500 V DC on a final socket circuit, sensitive equipment disconnected. What EICR observation code is most appropriate, and why?',
    options: [
      'C3 — improvement recommended',
      'C2 — potentially dangerous. The reading is below the Table 64 minimum (1.0 MΩ) and indicates degraded insulation; that is a fault condition that could become dangerous under fault, especially on an RCD-protected circuit where leakage near 1 MΩ approaches the trip threshold during normal use',
      'No code — readings between 0.5 and 1.0 MΩ are acceptable',
      'C1 — danger present',
    ],
    correctAnswer: 1,
    explanation:
      'Sub-Table-64 readings are typically C2 on a domestic EICR because they indicate a defect that is likely to become dangerous if not corrected, but is not in itself an immediate danger. C1 is reserved for live conductors exposed, missing CPCs that could carry fault current, etc. C3 (improvement recommended) understates a sub-minimum IR — the regulation has been breached. The customer must be informed in writing and the cause investigated.',
  },
  {
    id: 10,
    question:
      'Two adjacent socket circuits on the same RCBO read 95 MΩ and 4 MΩ respectively, both at 500 V DC with sensitive equipment disconnected. Both pass Table 64. Should the inspection note flag the 4 MΩ reading?',
    options: [
      'No — both pass',
      'Yes — the 24× difference between adjacent circuits, all things being equal in the cable run and termination quality, is a structural anomaly. The 4 MΩ circuit warrants a Method-2-style point-by-point investigation to localise the cause (damp, contamination, marginal cable damage). Flag in comments even though the reading itself passes',
      'Test the 95 MΩ circuit again',
      'Replace the RCBO',
    ],
    correctAnswer: 1,
    explanation:
      'Pass / fail is one dimension. Comparison across similar circuits is another. A 24× spread between adjacent circuits is a real signal, even when both pass. Skilled inspectors flag and investigate; lazy inspectors record both as pass and move on. The 4 MΩ may resolve on its own (transient damp) or it may be the start of a structural problem the next inspection finds at 0.6 MΩ.',
  },
];

const InspectionTestingModule4Section5 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Interpreting results and minimum values | I&T Module 4.5 | Elec-Mate',
    description:
      'BS 7671 Table 64 minimum insulation resistance values, Reg 643.3.2 and 643.3.3 acceptance, GN3 guidance on damp and contaminated installations, capacitance settling, and the difference between a strict pass and an operational red flag.',
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
            eyebrow="Module 4 · Section 5"
            title="Interpreting results and minimum values"
            description="Table 64 minimums, Reg 643.3.2 acceptance, the 1 MΩ floor under Reg 643.3.3, and the inspector judgement that turns a number on a meter into a defensible decision on the certificate."
            tone="yellow"
          />

          <TLDR
            points={[
              'Table 64 sets three minimums: SELV/PELV → 0.5 MΩ at 250 V DC; ≤500 V circuits → 1.0 MΩ at 500 V DC; >500 V circuits → 1.0 MΩ at 1000 V DC. Reg 643.3.2 says compliant if "not less than" the appropriate value.',
              'Reg 643.3.3 sets an additional 1 MΩ floor at 250 V DC for the post-connection verification with sensitive equipment reconnected. This is not Table 64 — it is a separate acceptance criterion on the same regulation page.',
              'Below Table 64 minimum = fail. No interpretation, no soft pass. The certificate cannot issue for that circuit until the cause is identified and resolved.',
              'Above the minimum but suspiciously low (single-figure MΩ on a clean cabling-only test) = strict pass, operational investigate. Flag in comments. Compare across similar circuits — large spreads between adjacent circuits are signal even when both pass.',
              'Damp and contamination are recoverable — the cable insulation may be intact and the reading restores once the source is found. Crushed cable, mechanical damage, polarity faults are structural — the reading will not improve until the defect is fixed.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Recall Table 64 minimum insulation values and apply the correct test voltage by circuit category',
              'Apply Reg 643.3.2 acceptance ("not less than" Table 64) and Reg 643.3.3 acceptance (≥ 1 MΩ at 250 V DC) without confusing the two',
              'Distinguish a strict pass from an operational red flag by comparing readings against typical values and against adjacent circuits',
              'Identify which causes of low IR are temporary (damp, contamination) and which are structural (mechanical damage, deteriorated insulation)',
              'Wait correctly for capacitance settling on circuits with electronic loads and record the stabilised value',
              'Apply EICR coding (C1 / C2 / C3) to insulation resistance findings, with sub-Table-64 readings typically coded C2',
            ]}
          />

          <ContentEyebrow>Table 64 — the regulatory floor</ContentEyebrow>

          <ConceptBlock
            title="The three rows of Table 64"
            plainEnglish="Table 64 is the heart of insulation-resistance acceptance. It has exactly three rows, each pairing a circuit category with a test voltage and a minimum insulation resistance. Memorise it: SELV/PELV → 250 V → 0.5 MΩ. Up to 500 V → 500 V → 1.0 MΩ. Above 500 V → 1000 V → 1.0 MΩ."
            onSite="Most of your work is in the middle row. Domestic and commercial 230/400 V circuits fall there. SELV/PELV row applies to data, low-voltage lighting and ELV control circuits. Above-500-V is industrial and rare in domestic / light commercial."
          >
            <p>
              The Table 64 structure has not changed substantively in years, but A4:2026 redrafts
              the surrounding regulation (Reg 643.3) and tightens the language about which test
              voltage applies in which situation. The values themselves remain:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-[13.5px] my-2">
                <thead>
                  <tr className="border-b border-white/15">
                    <th className="text-left text-white/80 py-2">Circuit nominal voltage</th>
                    <th className="text-center text-white/80 py-2">Test voltage DC (V)</th>
                    <th className="text-center text-elec-yellow py-2">Min. IR (MΩ)</th>
                  </tr>
                </thead>
                <tbody className="text-white/95">
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">SELV and PELV</td>
                    <td className="text-center">250</td>
                    <td className="text-center text-elec-yellow">0.5</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">Up to and including 500 V (excl. above)</td>
                    <td className="text-center">500</td>
                    <td className="text-center text-elec-yellow">1.0</td>
                  </tr>
                  <tr>
                    <td className="py-2">Above 500 V</td>
                    <td className="text-center">1000</td>
                    <td className="text-center text-elec-yellow">1.0</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              Two practical notes attach to the table. First: Table 64 is also applied when
              verifying insulation resistance between non-earthed protective conductors and Earth —
              relevant on IT systems and on functional earth conductors that are not bonded to the
              main earth. Second: FELV circuits are tested at the same test voltage as that applied
              to the primary side of the source and shall meet all the test requirements for
              low-voltage circuits (Reg 643.3.2 explicit).
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
                appropriate value given in Table 64. Table 64 shall be applied when verifying
                insulation resistance between non-earthed protective conductors and Earth.
              </>
            }
            meaning="Three load-bearing words: 'tested separately,' 'connected but disconnected,' and 'not less than.' Each distribution circuit is its own test. Final circuits stay connected to the distribution circuit under test. Current-using equipment (loads) is disconnected. Acceptance is binary: at or above the Table 64 minimum is satisfactory; below is not."
          />

          <ConceptBlock
            title="Reg 643.3.3 — the second floor"
            plainEnglish="Reg 643.3.3 sets a separate minimum: ≥ 1 MΩ at 250 V DC, applied between live conductors and the protective conductor connected to the earthing arrangement, AFTER the equipment that was disconnected for the Table 64 stage has been reconnected. This is not the same as Table 64 — it is a different test, on a different stage, with a different acceptance criterion."
          >
            <p>
              The two floors do not overlap. Table 64 governs the cabling-and-fixed- accessories
              test before sensitive equipment is reconnected. Reg 643.3.3 governs the verification
              test after that equipment is reconnected. Both must pass; one passing does not excuse
              the other failing.
            </p>
            <p>On a typical circuit you therefore have two readings to record:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Table 64 reading.</strong> Test voltage from the appropriate row. Sensitive
                equipment disconnected. Current-using equipment disconnected. Acceptance: not less
                than the Table 64 minimum (typically 1.0 MΩ).
              </li>
              <li>
                <strong>Reg 643.3.3 reading.</strong> 250 V DC. Sensitive equipment reconnected.
                Acceptance: ≥ 1 MΩ. Settled value, not instantaneous.
              </li>
            </ul>
            <p>
              On a circuit with no sensitive equipment, Reg 643.3.3 does not apply and the Table 64
              reading is the only one. On a circuit with sensitive equipment, both are required. The
              schedule of test results carries both — typically the Table 64 reading in the IR
              columns and the Reg 643.3.3 reading in comments.
            </p>
          </ConceptBlock>

          {/* Decision tree diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Decision tree — measured value to certificate decision
            </h4>
            <svg
              viewBox="0 0 820 480"
              className="w-full h-auto"
              role="img"
              aria-label="Decision tree from a measured insulation resistance value to a certificate decision: pass, investigate but technically pass, or fail."
            >
              {/* Header */}
              <rect
                x="280"
                y="20"
                width="260"
                height="48"
                rx="10"
                fill="rgba(251,191,36,0.10)"
                stroke="#FBBF24"
                strokeWidth="1.6"
              />
              <text
                x="410"
                y="42"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="12"
                fontWeight="bold"
              >
                Measured insulation resistance
              </text>
              <text x="410" y="58" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="10">
                Stabilised value, settled, lead-resistance accounted for
              </text>

              {/* Arrow down */}
              <line
                x1="410"
                y1="68"
                x2="410"
                y2="92"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1.5"
              />
              <polygon points="410,92 405,84 415,84" fill="rgba(255,255,255,0.4)" />

              {/* Decision diamond — Table 64 minimum */}
              <polygon
                points="410,100 540,160 410,220 280,160"
                fill="rgba(255,255,255,0.05)"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1.5"
              />
              <text
                x="410"
                y="150"
                textAnchor="middle"
                fill="rgba(255,255,255,0.85)"
                fontSize="11"
                fontWeight="bold"
              >
                Reading ≥
              </text>
              <text
                x="410"
                y="166"
                textAnchor="middle"
                fill="rgba(255,255,255,0.85)"
                fontSize="11"
                fontWeight="bold"
              >
                Table 64 min?
              </text>
              <text x="410" y="184" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                (1.0 MΩ for 230 V)
              </text>

              {/* No path — left */}
              <line x1="280" y1="160" x2="160" y2="160" stroke="#EF4444" strokeWidth="1.6" />
              <polygon points="160,160 168,156 168,164" fill="#EF4444" />
              <text
                x="220"
                y="153"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="10"
                fontWeight="bold"
              >
                NO
              </text>

              <rect
                x="40"
                y="135"
                width="120"
                height="60"
                rx="8"
                fill="rgba(239,68,68,0.10)"
                stroke="#EF4444"
                strokeWidth="1.5"
              />
              <text
                x="100"
                y="156"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="11"
                fontWeight="bold"
              >
                FAIL
              </text>
              <text x="100" y="173" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="9">
                Below Table 64
              </text>
              <text x="100" y="186" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="9">
                EICR: typically C2
              </text>

              {/* Yes path — right (continues down) */}
              <line x1="540" y1="160" x2="660" y2="160" stroke="#22C55E" strokeWidth="1.6" />
              <text
                x="600"
                y="153"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="10"
                fontWeight="bold"
              >
                YES
              </text>

              {/* Second decision — typical value? */}
              <polygon
                points="660,100 780,160 660,220 540,160"
                fill="rgba(255,255,255,0.05)"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1.5"
              />
              <text
                x="660"
                y="148"
                textAnchor="middle"
                fill="rgba(255,255,255,0.85)"
                fontSize="11"
                fontWeight="bold"
              >
                Reading typical
              </text>
              <text
                x="660"
                y="165"
                textAnchor="middle"
                fill="rgba(255,255,255,0.85)"
                fontSize="11"
                fontWeight="bold"
              >
                for a clean run?
              </text>
              <text x="660" y="184" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                (tens to hundreds MΩ)
              </text>

              {/* Yes — pass */}
              <line x1="660" y1="220" x2="660" y2="260" stroke="#22C55E" strokeWidth="1.6" />
              <polygon points="660,260 656,252 664,252" fill="#22C55E" />
              <text
                x="680"
                y="245"
                textAnchor="start"
                fill="#22C55E"
                fontSize="10"
                fontWeight="bold"
              >
                YES
              </text>

              <rect
                x="595"
                y="265"
                width="130"
                height="60"
                rx="8"
                fill="rgba(34,197,94,0.10)"
                stroke="#22C55E"
                strokeWidth="1.5"
              />
              <text
                x="660"
                y="287"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="11"
                fontWeight="bold"
              >
                PASS
              </text>
              <text x="660" y="304" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="9">
                Record on schedule
              </text>
              <text x="660" y="316" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="9">
                Move to next test
              </text>

              {/* No — investigate */}
              <line x1="540" y1="160" x2="540" y2="280" stroke="#FBBF24" strokeWidth="1.6" />
              <line x1="540" y1="280" x2="395" y2="280" stroke="#FBBF24" strokeWidth="1.6" />
              <polygon points="395,280 403,276 403,284" fill="#FBBF24" />
              <text
                x="555"
                y="220"
                textAnchor="start"
                fill="#FBBF24"
                fontSize="10"
                fontWeight="bold"
              >
                NO (low for cabling-only)
              </text>

              <rect
                x="220"
                y="255"
                width="180"
                height="60"
                rx="8"
                fill="rgba(251,191,36,0.10)"
                stroke="#FBBF24"
                strokeWidth="1.5"
              />
              <text
                x="310"
                y="277"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="11"
                fontWeight="bold"
              >
                INVESTIGATE
              </text>
              <text x="310" y="293" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="9">
                Strict pass · operational flag
              </text>
              <text x="310" y="306" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="9">
                Compare to adjacent circuits
              </text>

              {/* SERDs row */}
              <rect
                x="40"
                y="365"
                width="740"
                height="100"
                rx="10"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.18)"
                strokeWidth="1.2"
              />
              <text
                x="410"
                y="388"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="11"
                fontWeight="bold"
              >
                IF SENSITIVE EQUIPMENT WAS DISCONNECTED — Reg 643.3.3 verification
              </text>
              <text x="410" y="408" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="10">
                Reconnect equipment. Apply 250 V DC between (L+N linked) and CPC.
              </text>
              <text x="410" y="426" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="10">
                Wait 15–60 s for capacitance to settle. Read stabilised value.
              </text>
              <text
                x="410"
                y="448"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="11"
                fontWeight="bold"
              >
                ≥ 1 MΩ → pass · &lt; 1 MΩ → fail (independent of Table 64 result)
              </text>
            </svg>
          </div>

          <SectionRule />

          <ContentEyebrow>The four reading bands</ContentEyebrow>

          <ConceptBlock
            title="What different IR bands tell you"
            plainEnglish="An insulation reading falls into one of four practical bands. Each has a different next step. Knowing the band, not just the number, is what turns a meter reading into an inspection decision."
          >
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong className="text-emerald-300">Hundreds of MΩ to ∞.</strong> Healthy
                insulation, clean termination, dry environment. Record. Move on. This is the
                expected band on new installations and clean periodic inspections.
              </li>
              <li>
                <strong className="text-emerald-300">Tens of MΩ.</strong> Acceptable on most
                installations. Older PVC cabling and slightly damp environments commonly read in
                this band. No action required if consistent across the installation.
              </li>
              <li>
                <strong className="text-amber-300">
                  Single-figure MΩ above the Table 64 minimum.
                </strong>{' '}
                Strict pass, operational investigate. The reading meets the regulatory floor but is
                not consistent with healthy cabling. Compare against adjacent circuits, look for
                damp, look for contamination, look for a load that was not disconnected. Flag in
                comments.
              </li>
              <li>
                <strong className="text-red-300">Below Table 64 minimum.</strong> Fail. Stop. The
                certificate cannot issue for this circuit until the cause is found and resolved. On
                EICR, code C2 typically (potentially dangerous) — sometimes C1 if the leakage is at
                a level that creates immediate shock risk.
              </li>
            </ol>
            <p>
              The skill is in band 3. Band 1 and band 2 are clearly pass; band 4 is clearly fail.
              Band 3 is where regulation says &lsquo;pass&rsquo; and professional practice says
              &lsquo;investigate.&rsquo; The certificate is defensible if you record the pass and
              document the investigation. It is not defensible if you record the pass and walk away.
            </p>
          </ConceptBlock>

          <Scenario
            title="Two adjacent circuits, one signal"
            situation="On a six-month-old commercial fit-out, you are testing the lighting circuits on a TN-S sub-board. Circuits 1, 2 and 3 (each 6 m of 1.5/1.0 mm² to LED panels with drivers disconnected) read 240 MΩ, 195 MΩ and 4.2 MΩ respectively, all at 500 V DC. Circuit 4 reads 220 MΩ. All circuits pass Table 64 (≥ 1 MΩ)."
            whatToDo={
              <>
                <span className="block">
                  Record all four. Strict pass on each. But circuit 3 is operationally a red flag —
                  adjacent circuits are 200+ MΩ, this one is 4.2 MΩ. That is a 50× spread on what
                  should be near-identical conditions.
                </span>
                <span className="block mt-2">
                  Investigate. Method 2 from the consumer unit: probe at each driver disconnect
                  point along circuit 3. If the reading drops at one specific accessory, you have
                  localised the source. Likely causes: damp / contamination at one back-box, a
                  slipped strand bridging L–CPC, a partially disconnected driver.
                </span>
                <span className="block mt-2">
                  Document everything. Record the 4.2 MΩ value, record the comparison against the
                  adjacent circuits, record the investigation steps and the resolution. If the cause
                  is damp from a leak, agree the remediation with the client and retest after
                  drying. If the cause is a structural defect, raise as a defect on the EIC.
                </span>
              </>
            }
            whyItMatters="Six months later this circuit reads 0.6 MΩ on a periodic inspection and someone is investigating the original commissioning data. If your record shows you spotted the spread, investigated, and noted the resolution, you are an inspector who did the job. If your record shows four passing circuits and nothing else, the inference is you missed it."
          />

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Temporary vs structural causes of low IR</ContentEyebrow>

          <ConceptBlock
            title="What kind of problem is it?"
            plainEnglish="Low IR readings come from two fundamentally different categories. Temporary causes (damp, surface contamination, condensation) resolve when the source is removed and the affected surfaces dry. Structural causes (mechanical damage, deteriorated insulation, polarity faults) only resolve with physical repair."
            onSite="If the reading is below Table 64, you have to know which category before you decide on the remediation. Damp resolves with drying and source-finding; crushed cable resolves with re-routing or replacement. The diagnosis determines the cost of the fix."
          >
            <p>Temporary causes — recoverable readings:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Damp ingress.</strong> A junction box behind a leaking shower seal, a back
                box on an external wall during prolonged wet weather, water pooling in a ceiling
                void after a roof leak. The cable insulation is intact; water across the surfaces is
                the parallel path. Find the source, dry the installation, retest.
              </li>
              <li>
                <strong>Surface contamination.</strong> Plaster dust, conductive grime, accumulated
                kitchen grease at terminations. Strip the accessory, clean, re-terminate, retest.
              </li>
              <li>
                <strong>Condensation.</strong> External or unheated locations during cold weather.
                Heat the location, retest. Note the seasonal nature in the comments.
              </li>
              <li>
                <strong>Recently energised damp circuit.</strong> The first test after a long
                shutdown can read low because moisture has accumulated in cable terminations. A
                second test after the circuit has run loaded for some hours often reads
                significantly higher.
              </li>
            </ul>
            <p>Structural causes — readings will not improve until the defect is fixed:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Mechanical damage.</strong> Cable crushed behind a fixing, nicked during
                second-fix, cut and rejoined badly. The leakage path is direct copper-to-CPC through
                compromised insulation.
              </li>
              <li>
                <strong>Deteriorated insulation.</strong> Old rubber-insulated cabling that has
                hardened and cracked, PVC that has overheated and gone brittle, conductors exposed
                by insulation breakdown at a hot termination.
              </li>
              <li>
                <strong>Polarity / wiring faults.</strong> A neutral terminated to CPC at an
                accessory, an exposed conductor touching an earthed back box, a wrong- polarity
                socket where the reverse-polarity supply has stressed the wrong insulation.
              </li>
              <li>
                <strong>End-of-life electronic loads.</strong> An SPD, an electronic ballast or a
                switch-mode supply that has aged into significant leakage. Looks like cabling fail;
                resolved by replacing the device.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="GN3 commentary on damp installations"
            plainEnglish="GN3 explicitly recognises damp installations as a category of low-IR reading where the underlying cable insulation is sound. The remedy is source-finding and drying, not replacement. Document the condition; retest after the drying period."
          >
            <p>
              The textbook example is a flat where a shower seal has failed and water has been
              tracking down behind the wall for months. The kitchen lighting circuit that runs
              through that wall now reads 0.4 MΩ at 500 V DC. Replacing the cable would resolve the
              low reading immediately — but the water source is still there, and the new cable will
              read 0.4 MΩ within weeks.
            </p>
            <p>The defensible workflow:</p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                Record the failing reading and document the suspected cause (damp, supported by
                visual evidence).
              </li>
              <li>
                Identify the source. Water damage is rarely subtle once you look: tide marks, soft
                plaster, crystallised salts at the cable entry.
              </li>
              <li>
                Coordinate with the duty-holder for the source remediation (plumber for the seal,
                building works for the masonry, drying time of typically 7&ndash;14 days for plaster
                to fully dry).
              </li>
              <li>
                Retest after drying. The reading typically returns to tens or hundreds of MΩ if the
                cable insulation was sound.
              </li>
              <li>
                If the retest is still below Table 64 after confirmed drying, escalate to a
                structural cause and replace the affected cabling.
              </li>
            </ol>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>
            Capacitance settling and what it means for the recorded value
          </ContentEyebrow>

          <ConceptBlock
            title="Why the meter reads low at first and climbs"
            plainEnglish="Any cable has capacitance — between conductors, between conductor and screen, between conductor and earthed surfaces. When you apply DC test voltage, that capacitance must charge before the displayed insulation resistance is meaningful. During charging, the meter sees the absorbed current as if it were leakage current, and reads low. Once charged, the absorbed current drops to zero and the displayed value reflects only the genuine leakage."
            onSite="On any circuit with significant cable run, electronic loads, or large enclosures, expect the reading to climb for the first 15–60 s. Hold the test until it stabilises. Most modern testers continue to display the value as long as the test button is held."
          >
            <p>Three sources of capacitance you encounter:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Cable capacitance.</strong> Approximately 100&ndash;200 pF/m for T&amp;E. A
                50 m circuit therefore presents ~5&ndash;10 nF, settling time ~5&ndash;10 s.
              </li>
              <li>
                <strong>Filter capacitors in electronic loads.</strong> Input filter caps on LED
                drivers, switch-mode supplies, electronic ballasts. Microfarads, not nanofarads.
                Settling time 30&ndash;60 s, sometimes longer.
              </li>
              <li>
                <strong>Earthed metalwork capacitance.</strong> Large metal enclosures, trunking,
                panel switchboards. Modest contribution but adds to the total.
              </li>
            </ul>
            <p>
              The recorded value is the stabilised reading. The instantaneous value at t=0 is the
              test current charging the capacitance and is not the insulation resistance. Recording
              the t=0 value as a fail when it would have settled to a pass is a false fail;
              recording the t=0 value as a pass when it has not yet risen to the genuine reading is
              a false pass on a degrading cable.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Recording the instantaneous reading instead of the settled value"
            whatHappens="Tester is held against the test points, button pressed, value displayed at the moment of contact, button released, value recorded. On a circuit with electronic loads the value never had time to settle. The recorded fail (or marginal pass) is the capacitance charging current, not the insulation resistance. Re-investigation finds nothing because there is nothing to find."
            doInstead="Hold the test button continuously until the value is stable for 5+ seconds. On capacitive circuits this can be 30–60 s. Most modern multifunction testers display the value as long as the button is held. Watch the number climb, stop, and note the steady value."
          />

          <CommonMistake
            title="Treating a strict pass as a final answer when the reading is suspiciously low"
            whatHappens="A circuit reads 1.4 MΩ at 500 V DC with sensitive equipment disconnected — strictly above the 1.0 MΩ Table 64 minimum, so technically pass. The inspector records pass and moves on. Six months later that circuit reads 0.7 MΩ on a callback inspection. The original 1.4 MΩ was the developing fault that nobody investigated."
            doInstead="On any reading in the single-figure MΩ band on cabling-only, document the comparison: how does this circuit compare to the others on the same distribution circuit? If it is consistent with adjacent circuits, the cabling is older and the values are lower across the board. If it is anomalously low compared to its neighbours, investigate even though the regulation says pass."
          />

          <CommonMistake
            title="Combining circuits into one reading at the consumer unit"
            whatHappens="To save time, the inspector links all the line conductors at the busbar and tests the whole installation in one shot. Reading is 1.8 MΩ — pass. In fact one circuit is at 0.4 MΩ and the parallel combination of nine other circuits at 200+ MΩ is dragging the headline value up. The failing circuit is invisible in the combined reading and goes uncertified."
            doInstead="Reg 643.3.2 explicitly says &lsquo;each distribution circuit tested separately.&rsquo; On a domestic CU that means each MCB / RCBO way is its own test. The time saved by combining is not worth the risk of missing a failing circuit. Modern testers make per-circuit testing fast — use them."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>EICR coding for IR results</ContentEyebrow>

          <ConceptBlock
            title="Coding low IR on a periodic inspection report"
            plainEnglish="On EICR work, every defect needs a code: C1 (danger present), C2 (potentially dangerous), C3 (improvement recommended) or FI (further investigation). Sub-Table-64 IR is typically C2; in extreme cases C1; never C3 because the regulation has been breached, not just unsatisfied."
          >
            <p>The coding logic for insulation resistance findings:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>C1 (danger present).</strong> IR so low that the leakage current presents a
                direct shock risk in normal use, or a clear path between live conductor and
                accessible exposed-conductive-part. Not common on healthy installations;
                specifically applies where damp has caused open conductive paths, or where
                insulation has failed to a point of contact.
              </li>
              <li>
                <strong>C2 (potentially dangerous).</strong> The default for sub-Table-64 readings
                on intact installations. The reading is below the regulatory minimum; the cause may
                be temporary or structural; danger is reasonably foreseeable if not resolved. Most
                low-IR findings code C2.
              </li>
              <li>
                <strong>C3 (improvement recommended).</strong> Very limited application for IR. Use
                only where the reading meets Table 64 but is single-figure MΩ in a pattern that
                suggests aged-but-intact insulation. The regulation has not been breached, so C2 is
                wrong; but the pattern warrants improvement recommendation. Be cautious — overuse of
                C3 on IR readings is a known audit pattern.
              </li>
              <li>
                <strong>FI (further investigation).</strong> Where the IR reading itself is
                inconclusive (capacitance not settled, sensitive equipment not disconnected, meter
                behaviour suspect) and the next visit must clarify before coding.
              </li>
            </ul>
            <p>
              Two practical points. First: the customer letter that accompanies the EICR has to
              explain the C-code in lay terms. &ldquo;The insulation between live conductors and
              earth on this circuit is below the value that BS 7671 requires. Common causes are
              damp, contamination or aged insulation. We recommend investigating and resolving
              before this circuit is left in service&rdquo; is a defensible explanation for a C2.
              Second: the unsatisfactory EICR mandates a follow-up. Do not sign off the EICR without
              ensuring the duty-holder has the path to resolution, including the contact details and
              timescale.
            </p>
          </ConceptBlock>

          <Scenario
            title="Damp Victorian conversion — a defensible EICR result"
            situation="Periodic inspection on a converted Victorian terrace. Three out of seven final circuits read between 0.3 and 0.7 MΩ at 500 V DC. Visual inspection finds damp staining at the junction box behind a recently failed shower seal in the upstairs flat. All other circuits read 80+ MΩ. The duty-holder is the freeholder; the leak is in a tenanted upper flat."
            whatToDo={
              <>
                <span className="block">
                  Record all readings. Document the damp source clearly with photographs and the
                  affected circuits identified by board reference.
                </span>
                <span className="block mt-2">
                  Code the three sub-Table-64 circuits as C2 — potentially dangerous. Do not C3
                  them; the regulation has been breached and the cause is real.
                </span>
                <span className="block mt-2">
                  Issue the EICR as unsatisfactory. Provide the duty-holder with a written
                  remediation path: source repair (plumber), drying time, retest after drying.
                  Confirm the timescale for the retest in writing.
                </span>
                <span className="block mt-2">
                  When the retest happens, record the new readings and update the EICR to
                  satisfactory only if all circuits return to consistent values. If any circuit
                  remains low after confirmed drying, escalate to structural cause and replacement.
                </span>
              </>
            }
            whyItMatters="The defensible part of this is the documentation. An audit on this report ten years later sees: the readings, the cause identified at the time, the remediation path agreed in writing with the duty-holder, the retest evidence, the final coding. That is the chain that turns a C2 finding into a closed loop. Without any link, the inspector becomes the easy answer when the next person finds the same circuits failing."
          />

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'Table 64: SELV/PELV → 0.5 MΩ at 250 V DC; ≤500 V → 1.0 MΩ at 500 V DC; >500 V → 1.0 MΩ at 1000 V DC.',
              'Reg 643.3.2: "not less than" the Table 64 value. Below = fail. Test each distribution circuit separately, not in combination.',
              'Reg 643.3.3: separate 1 MΩ floor at 250 V DC, post-connection, between live conductors and CPC. Independent of Table 64.',
              'Strict pass + suspiciously low (single-figure MΩ on cabling-only) = investigate even though regulation says pass. Compare against adjacent circuits.',
              'Wait for capacitance settling (15–60 s on circuits with electronic loads). Record the stabilised value.',
              'Damp / contamination / condensation = temporary causes that resolve with source repair and drying. Mechanical damage / deteriorated insulation / polarity faults = structural, requires repair.',
              'EICR coding: sub-Table-64 = typically C2. C1 only for direct shock risk. C3 is wrong for a regulation breach.',
              'Document everything. The defensible certificate has the readings, the comparisons, the investigation, the cause and the resolution — not just a value.',
            ]}
          />

          <FAQ
            items={[
              {
                question:
                  'My reading is 0.95 MΩ on a 230 V circuit at 500 V DC, sensitive equipment disconnected. Pass or fail?',
                answer:
                  'Fail. Table 64 row 2 is "not less than 1.0 MΩ." 0.95 is less than 1.0. The regulation does not include rounding tolerance — the displayed value is the value. Investigate. Most often this is a transient cause (humidity at a back box, capacitance not fully settled, lead resistance not nulled) that resolves with retesting after a moment. Sometimes it is genuine. Either way, you cannot record 0.95 MΩ as a pass.',
              },
              {
                question:
                  'A 50 m run of T&E reads 8 MΩ at 500 V DC, sensitive equipment disconnected. Is that a fail?',
                answer:
                  'No, 8 MΩ is well above the 1.0 MΩ minimum — strict pass. But 8 MΩ on a 50 m clean copper run is in the operational-flag band. Healthy T&E reads tens to hundreds of MΩ. Investigate: is there damp anywhere on the route? Has every electronic load actually been disconnected? Is one termination contaminated? If you cannot identify a cause, document the value, the investigation, and the conclusion. Re-test at the next inspection cycle to confirm whether the value is stable or trending down.',
              },
              {
                question: 'Can I round a 0.95 MΩ reading up to 1.0 MΩ?',
                answer:
                  'No. The schedule of test results is a measurement, not a calculation. You record what the meter displayed. If the meter displayed 0.95, the schedule says 0.95. Rounding the reading to make it pass is fraudulent reporting and would not survive an audit. Investigate the cause; resolve it; retest; record the new value.',
              },
              {
                question:
                  'On an EICR, the customer asks me to "use C3" for a sub-Table-64 reading because they do not want an unsatisfactory report. What is the right answer?',
                answer:
                  'No. Coding is a regulated professional judgement, not a customer service negotiation. Sub-Table-64 readings are C2 because they breach a BS 7671 acceptance criterion that exists for safety reasons. Coding a regulation breach as C3 understates the danger and exposes you (and the customer) to liability when something goes wrong. Explain the coding clearly, provide the remediation path, and let the duty-holder decide whether to act. The EICR has to reflect what you found, not what is convenient.',
              },
              {
                question: 'How do I distinguish a real low IR reading from a meter problem?',
                answer:
                  'Three checks. First, null the leads and verify against a known good circuit on the same distribution board (a dedicated immersion or shower circuit with no SERDs — should read very high). If that reads low too, the meter is the problem. Second, swap to a different tester if available. Third, check the test current rating — some 1990s-vintage testers do not deliver enough current to load the cable, especially on long runs. BS EN 61557-2 testers are specified to deliver 1 mA into the test circuit; if your tester does not meet that, replace it.',
              },
              {
                question:
                  'GN3 mentions a "settling time" — is that the same as capacitance settling?',
                answer:
                  'Yes. GN3 commentary acknowledges that some circuits require time for the displayed value to stabilise after the test voltage is applied. The mechanism is exactly capacitance settling. The practical guidance is the same: hold the test until the displayed value is stable for several seconds, then record. Never record at t=0 on a circuit with appreciable capacitance.',
              },
              {
                question:
                  'My reading is fine but the duty-holder says the previous inspection showed a higher value. Do I have to investigate?',
                answer:
                  'Yes — declining IR is a trend signal even when the absolute value still passes. Compare the two readings: how much has it dropped, over what period, on what circuit? A 50 % drop over 5 years on a domestic ring final is at the edge of normal aging. A 80 % drop over 6 months is not normal. Document the trend in the comments column, code C3 (improvement recommended) on the EICR if the value still passes Table 64, and recommend a shorter-than-default re-inspection interval. If the next reading shows continued decline, escalate to a structural investigation.',
              },
              {
                question: 'Is there a maximum value above which I should be suspicious?',
                answer:
                  'Practically no — high IR readings are a good sign as long as they are real. The trap is &ldquo;∞&rdquo; or out-of-range readings on a circuit that should not be open. If the meter shows infinity on a circuit you would expect to read in the hundreds of MΩ, check that the test leads are making contact, the circuit is energised at the busbar end, and the polarity is correct. An open conductor reads infinity too — and it is the open-conductor case you must rule out before recording infinity as a pass.',
              },
            ]}
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz
            title="Interpreting results and minimum values — Module 4.5"
            questions={quizQuestions}
          />

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
              onClick={() =>
                navigate('/electrician/upskilling/inspection-testing/module-4/section-6')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                4.6 Troubleshooting low insulation
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

export default InspectionTestingModule4Section5;
