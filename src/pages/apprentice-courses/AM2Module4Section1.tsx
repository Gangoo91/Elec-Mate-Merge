/**
 * Module 4 · Section 1 — Full test sequence and order of tests
 * AM2 day-prep — AM2 Phase C (inspection, testing, certification)
 * Dead before live, in the IET GN3 order — the sequence the assessor wants to see, every time.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import OhmsCalculator from '@/components/apprentice-courses/OhmsCalculator';
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

const TITLE = 'Full Test Sequence and Order of Tests | AM2 Module 4.1 | Elec-Mate';
const DESCRIPTION =
  'The full AM2 dead-then-live test sequence in IET Guidance Note 3 order — the order assessors expect and the safety reason behind it.';

const AM2Module4Section1 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  const learningOutcomes = [
    'Execute the complete testing sequence in correct GN3 order',
    'Understand the safety rationale behind each test sequence step',
    'Perform comprehensive dead testing before any live work',
    'Apply correct test voltages and interpret results accurately',
    'Document test results systematically throughout the process',
    'Demonstrate professional competence in electrical testing procedures',
  ];

  const quickCheckQuestions: Array<{
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }> = [
    {
      id: 'first-test',
      question:
        'What is the first electrical test that must be carried out before any live testing?',
      options: [
        'Insulation resistance',
        'Continuity of protective conductors',
        'Earth fault loop impedance',
        'RCD testing',
      ],
      correctIndex: 1,
      explanation:
        'Continuity of protective conductors must be tested first to ensure safety before any live testing is undertaken.',
    },
    {
      id: 'insulation-voltage',
      question: 'At what voltage should insulation resistance be tested for circuits up to 500V?',
      options: ['250V DC', '500V DC', '1000V DC', '100V DC'],
      correctIndex: 1,
      explanation:
        'BS 7671 requires insulation resistance testing at 500V DC for circuits operating up to 500V.',
    },
    {
      id: 'live-testing-rule',
      question: 'When can live testing commence during AM2 assessment?',
      options: [
        'Immediately after isolation verification',
        'Only after all dead tests are complete and satisfactory',
        'Any time during the assessment',
        'Before polarity testing',
      ],
      correctIndex: 1,
      explanation:
        'Live testing must ONLY commence after all dead tests are complete and satisfactory. This is critical for safety and assessment success.',
    },
  ];

  const quizQuestions = [
    {
      id: 1,
      question: 'What is the minimum acceptable insulation resistance value for most circuits?',
      options: ['0.5 MΩ', '1.0 MΩ', '2.0 MΩ', '5.0 MΩ'],
      correctAnswer: 1,
      explanation:
        'The minimum insulation resistance is 1.0 MΩ for most installations, though some specific circuits may require higher values.',
    },
    {
      id: 2,
      question: 'During AM2 assessment, which aspect is most critical for assessor evaluation?',
      options: [
        'Speed of testing',
        'Expensive equipment use',
        'Following GN3 sequence methodically and safely',
        'Perfect numerical results',
      ],
      correctAnswer: 2,
      explanation:
        'Assessors primarily look for methodical adherence to GN3 sequence with safe working practices and realistic results.',
    },
    {
      id: 3,
      question: 'What happens if you perform live tests before completing dead tests?',
      options: [
        'Minor mark deduction',
        'Warning from assessor',
        'Automatic failure for unsafe practice',
        'No consequence',
      ],
      correctAnswer: 2,
      explanation:
        'Performing live tests before completing dead tests is considered unsafe practice and results in automatic failure.',
    },
    {
      id: 4,
      question: 'Which test must be performed to verify ring circuit integrity?',
      options: [
        'Earth fault loop impedance',
        'Continuity of ring final circuit conductors',
        'RCD testing',
        'Voltage drop',
      ],
      correctAnswer: 1,
      explanation:
        'Continuity of ring final circuit conductors verifies the ring is complete and identifies any breaks or parallel paths.',
    },
    {
      id: 5,
      question: 'What is the correct sequence for insulation resistance testing?',
      options: [
        'Test all conductors to earth first',
        'Test line to neutral, then line to earth, then neutral to earth',
        'Test randomly',
        'Test only line to earth',
      ],
      correctAnswer: 1,
      explanation:
        'Correct sequence is L-N, L-E, then N-E to ensure comprehensive insulation testing between all conductors.',
    },
    {
      id: 6,
      question:
        'What is the maximum permitted Zs for a 32A Type B MCB at 230V under BS 7671:2018+A4:2026 Table 41.3?',
      options: ['0.72Ω', '1.37Ω', '1.44Ω (pre-A4 figure)', '2.87Ω'],
      correctAnswer: 1,
      explanation:
        'A4:2026 Table 41.3 gives 1.37Ω for B32 at 230V — the older 1.44Ω figure was the pre-A4 tabulated value before Cmin = 0.95 was formally applied to U0. Use 1.37Ω on AM2 day.',
    },
    {
      id: 7,
      question: 'At what test current should an RCD trip within 300ms?',
      options: [
        '50% of rated current',
        '100% of rated current',
        '150% of rated current',
        '500% of rated current',
      ],
      correctAnswer: 1,
      explanation:
        'RCD must trip within 300ms at 100% of its rated current (IΔn). At 50% it should not trip.',
    },
    {
      id: 8,
      question: 'Which test voltage is used for insulation resistance on 230V circuits?',
      options: ['250V DC', '500V DC', '1000V DC', '230V AC'],
      correctAnswer: 1,
      explanation:
        'BS 7671 requires 500V DC test voltage for circuits with nominal voltage up to 500V.',
    },
    {
      id: 9,
      question: 'What must be disconnected before insulation resistance testing?',
      options: [
        'Only fluorescent lamps',
        'Electronic equipment and surge protective devices',
        'All switches',
        'Nothing needs disconnecting',
      ],
      correctAnswer: 1,
      explanation:
        'Electronic equipment, surge protective devices, and capacitors must be disconnected to avoid damage and false readings.',
    },
    {
      id: 10,
      question: 'What is the acceptable voltage range for 230V single-phase supply?',
      options: ['220V - 240V', '207V - 253V', '200V - 250V', '225V - 235V'],
      correctAnswer: 1,
      explanation: 'BS 7671 accepts ±10% of nominal voltage: 230V ±10% = 207V to 253V range.',
    },
  ];

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/am2/module4')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 4
          </button>

          <PageHero
            eyebrow="Module 4 · Section 1"
            title="Full Test Sequence and Order of Tests"
            description="Master the correct testing sequence for AM2 electrical assessment as per IET Guidance Note 3 and BS 7671 Part 6 - ensure safety and compliance through systematic testing procedures."
            tone="yellow"
          />

          <TLDR
            points={[
              'GN3 sequence is non-negotiable on AM2 day — dead tests fully complete BEFORE any live testing.',
              'Order: continuity of CPCs (R1+R2) → ring continuity → IR at 500 V DC → polarity → Ze (TT: earth electrode) → energise → Zs → PFC → RCD at 1×IΔn → phase sequence → functional.',
              'BS 7671:2018+A4:2026 figures: B32 Zsmax = 1.37 Ω (Cmin = 0.95 applied). Apply 0.8 rule for hot-cable correction → measured Zs ≤ 1.10 Ω.',
              'A4:2026 deleted the 5×IΔn RCD test. Single AC test at 1×IΔn is all the verification routine needs.',
              'Live testing without dead tests complete = automatic fail. Speed without safety = automatic fail.',
            ]}
          />

          <CommonMistake
            title="Test Sequence Determines AM2 Success"
            whatHappens={
              <>
                The test sequence follows IET Guidance Note 3 and BS 7671 Part 6 exactly. Deviation
                from this order will result in assessment failure. Live testing must ONLY be carried
                out after all dead tests are complete and satisfactory.
              </>
            }
            doInstead={
              <>
                Assessors observe whether you can follow safe working practices and systematic
                procedures. Any unsafe practice results in immediate failure.
              </>
            }
          />

          <LearningOutcomes outcomes={learningOutcomes} />

          {/* Dead vs Live Testing Sequence Diagram */}
          <div className="my-8 flex justify-center">
            <div className="w-full max-w-2xl">
              <svg
                viewBox="0 0 500 450"
                className="w-full h-auto"
                role="img"
                aria-label="Dead vs Live testing sequence diagram showing dead tests must pass before live tests commence"
              >
                <text
                  x="250"
                  y="24"
                  textAnchor="middle"
                  fill="#F3F4F6"
                  fontSize="15"
                  fontFamily="system-ui, sans-serif"
                  fontWeight="bold"
                >
                  BS 7671 / GN3 Test Sequence
                </text>

                <rect x="10" y="42" width="200" height="36" rx="8" fill="#D97706" />
                <text
                  x="110"
                  y="66"
                  textAnchor="middle"
                  fill="white"
                  fontSize="14"
                  fontFamily="system-ui, sans-serif"
                  fontWeight="bold"
                >
                  DEAD TESTS
                </text>

                <rect
                  x="10"
                  y="86"
                  width="200"
                  height="40"
                  rx="6"
                  fill="#1F2937"
                  stroke="#D97706"
                  strokeWidth="1"
                />
                <text
                  x="22"
                  y="103"
                  fill="#F3F4F6"
                  fontSize="10"
                  fontFamily="system-ui, sans-serif"
                  fontWeight="bold"
                >
                  1.
                </text>
                <text
                  x="36"
                  y="103"
                  fill="#F3F4F6"
                  fontSize="10"
                  fontFamily="system-ui, sans-serif"
                >
                  Continuity of Protective
                </text>
                <text
                  x="36"
                  y="118"
                  fill="#F3F4F6"
                  fontSize="10"
                  fontFamily="system-ui, sans-serif"
                >
                  Conductors (R1+R2)
                </text>

                <rect
                  x="10"
                  y="132"
                  width="200"
                  height="40"
                  rx="6"
                  fill="#1F2937"
                  stroke="#D97706"
                  strokeWidth="1"
                />
                <text
                  x="22"
                  y="149"
                  fill="#F3F4F6"
                  fontSize="10"
                  fontFamily="system-ui, sans-serif"
                  fontWeight="bold"
                >
                  2.
                </text>
                <text
                  x="36"
                  y="149"
                  fill="#F3F4F6"
                  fontSize="10"
                  fontFamily="system-ui, sans-serif"
                >
                  Continuity of Ring Final
                </text>
                <text
                  x="36"
                  y="164"
                  fill="#F3F4F6"
                  fontSize="10"
                  fontFamily="system-ui, sans-serif"
                >
                  Circuit Conductors
                </text>

                <rect
                  x="10"
                  y="178"
                  width="200"
                  height="34"
                  rx="6"
                  fill="#1F2937"
                  stroke="#D97706"
                  strokeWidth="1"
                />
                <text
                  x="22"
                  y="200"
                  fill="#F3F4F6"
                  fontSize="10"
                  fontFamily="system-ui, sans-serif"
                  fontWeight="bold"
                >
                  3.
                </text>
                <text
                  x="36"
                  y="200"
                  fill="#F3F4F6"
                  fontSize="10"
                  fontFamily="system-ui, sans-serif"
                >
                  Insulation Resistance
                </text>

                <rect
                  x="10"
                  y="218"
                  width="200"
                  height="34"
                  rx="6"
                  fill="#1F2937"
                  stroke="#D97706"
                  strokeWidth="1"
                />
                <text
                  x="22"
                  y="240"
                  fill="#F3F4F6"
                  fontSize="10"
                  fontFamily="system-ui, sans-serif"
                  fontWeight="bold"
                >
                  4.
                </text>
                <text
                  x="36"
                  y="240"
                  fill="#F3F4F6"
                  fontSize="10"
                  fontFamily="system-ui, sans-serif"
                >
                  Polarity
                </text>

                <rect
                  x="10"
                  y="258"
                  width="200"
                  height="34"
                  rx="6"
                  fill="#1F2937"
                  stroke="#D97706"
                  strokeWidth="1"
                />
                <text
                  x="22"
                  y="280"
                  fill="#F3F4F6"
                  fontSize="10"
                  fontFamily="system-ui, sans-serif"
                  fontWeight="bold"
                >
                  5.
                </text>
                <text
                  x="36"
                  y="280"
                  fill="#F3F4F6"
                  fontSize="10"
                  fontFamily="system-ui, sans-serif"
                >
                  Earth Electrode Resistance
                </text>

                <rect x="290" y="42" width="200" height="36" rx="8" fill="#DC2626" />
                <text
                  x="390"
                  y="66"
                  textAnchor="middle"
                  fill="white"
                  fontSize="14"
                  fontFamily="system-ui, sans-serif"
                  fontWeight="bold"
                >
                  LIVE TESTS
                </text>

                <rect
                  x="290"
                  y="86"
                  width="200"
                  height="40"
                  rx="6"
                  fill="#1F2937"
                  stroke="#DC2626"
                  strokeWidth="1"
                />
                <text
                  x="302"
                  y="103"
                  fill="#F3F4F6"
                  fontSize="10"
                  fontFamily="system-ui, sans-serif"
                  fontWeight="bold"
                >
                  6.
                </text>
                <text
                  x="316"
                  y="103"
                  fill="#F3F4F6"
                  fontSize="10"
                  fontFamily="system-ui, sans-serif"
                >
                  Earth Fault Loop
                </text>
                <text
                  x="316"
                  y="118"
                  fill="#F3F4F6"
                  fontSize="10"
                  fontFamily="system-ui, sans-serif"
                >
                  Impedance (Zs)
                </text>

                <rect
                  x="290"
                  y="132"
                  width="200"
                  height="40"
                  rx="6"
                  fill="#1F2937"
                  stroke="#DC2626"
                  strokeWidth="1"
                />
                <text
                  x="302"
                  y="149"
                  fill="#F3F4F6"
                  fontSize="10"
                  fontFamily="system-ui, sans-serif"
                  fontWeight="bold"
                >
                  7.
                </text>
                <text
                  x="316"
                  y="149"
                  fill="#F3F4F6"
                  fontSize="10"
                  fontFamily="system-ui, sans-serif"
                >
                  Prospective Fault
                </text>
                <text
                  x="316"
                  y="164"
                  fill="#F3F4F6"
                  fontSize="10"
                  fontFamily="system-ui, sans-serif"
                >
                  Current (PFC)
                </text>

                <rect
                  x="290"
                  y="178"
                  width="200"
                  height="34"
                  rx="6"
                  fill="#1F2937"
                  stroke="#DC2626"
                  strokeWidth="1"
                />
                <text
                  x="302"
                  y="200"
                  fill="#F3F4F6"
                  fontSize="10"
                  fontFamily="system-ui, sans-serif"
                  fontWeight="bold"
                >
                  8.
                </text>
                <text
                  x="316"
                  y="200"
                  fill="#F3F4F6"
                  fontSize="10"
                  fontFamily="system-ui, sans-serif"
                >
                  RCD Operation
                </text>

                <rect
                  x="290"
                  y="218"
                  width="200"
                  height="34"
                  rx="6"
                  fill="#1F2937"
                  stroke="#DC2626"
                  strokeWidth="1"
                />
                <text
                  x="302"
                  y="240"
                  fill="#F3F4F6"
                  fontSize="10"
                  fontFamily="system-ui, sans-serif"
                  fontWeight="bold"
                >
                  9.
                </text>
                <text
                  x="316"
                  y="240"
                  fill="#F3F4F6"
                  fontSize="10"
                  fontFamily="system-ui, sans-serif"
                >
                  Phase Sequence
                </text>

                <rect
                  x="290"
                  y="258"
                  width="200"
                  height="34"
                  rx="6"
                  fill="#1F2937"
                  stroke="#DC2626"
                  strokeWidth="1"
                />
                <text
                  x="302"
                  y="280"
                  fill="#F3F4F6"
                  fontSize="10"
                  fontFamily="system-ui, sans-serif"
                  fontWeight="bold"
                >
                  10.
                </text>
                <text
                  x="320"
                  y="280"
                  fill="#F3F4F6"
                  fontSize="10"
                  fontFamily="system-ui, sans-serif"
                >
                  Functional Testing
                </text>

                <line
                  x1="250"
                  y1="86"
                  x2="250"
                  y2="292"
                  stroke="#9CA3AF"
                  strokeWidth="2"
                  strokeDasharray="6,4"
                />

                <rect x="218" y="310" width="64" height="24" rx="4" fill="none" />
                <line x1="220" y1="322" x2="270" y2="322" stroke="#9CA3AF" strokeWidth="2" />
                <polygon points="266,316 276,322 266,328" fill="#9CA3AF" />

                <rect
                  x="80"
                  y="350"
                  width="340"
                  height="50"
                  rx="8"
                  fill="#1F2937"
                  stroke="#D97706"
                  strokeWidth="2"
                />
                <text
                  x="250"
                  y="372"
                  textAnchor="middle"
                  fill="#FCD34D"
                  fontSize="12"
                  fontFamily="system-ui, sans-serif"
                  fontWeight="bold"
                >
                  ALL DEAD TESTS MUST PASS FIRST
                </text>
                <text
                  x="250"
                  y="390"
                  textAnchor="middle"
                  fill="#F3F4F6"
                  fontSize="10"
                  fontFamily="system-ui, sans-serif"
                >
                  Live testing without dead test completion = automatic fail
                </text>

                <circle
                  cx="110"
                  cy="330"
                  r="12"
                  fill="#22C55E"
                  fillOpacity="0.2"
                  stroke="#22C55E"
                  strokeWidth="1.5"
                />
                <path
                  d="M103 330 L108 335 L117 325"
                  stroke="#22C55E"
                  strokeWidth="2.5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <text
                  x="110"
                  y="355"
                  textAnchor="middle"
                  fill="#9CA3AF"
                  fontSize="9"
                  fontFamily="system-ui, sans-serif"
                >
                  Complete
                </text>

                <circle
                  cx="390"
                  cy="330"
                  r="12"
                  fill="#DC2626"
                  fillOpacity="0.2"
                  stroke="#DC2626"
                  strokeWidth="1.5"
                />
                <rect x="384" y="329" width="12" height="9" rx="1.5" fill="#DC2626" />
                <path
                  d="M387 329 V326 A3 3 0 0 1 393 326 V329"
                  stroke="#DC2626"
                  strokeWidth="1.5"
                  fill="none"
                />
                <text
                  x="390"
                  y="355"
                  textAnchor="middle"
                  fill="#9CA3AF"
                  fontSize="9"
                  fontFamily="system-ui, sans-serif"
                >
                  Locked
                </text>

                <text
                  x="250"
                  y="430"
                  textAnchor="middle"
                  fill="#9CA3AF"
                  fontSize="10"
                  fontFamily="system-ui, sans-serif"
                >
                  IET Guidance Note 3 / BS 7671 Part 6
                </text>
              </svg>
            </div>
          </div>

          <ContentEyebrow>NET AM2 GN3 Testing Sequence</ContentEyebrow>

          <ConceptBlock
            title="1. NET AM2 GN3 Testing Sequence — dead tests first, mandatory order"
            plainEnglish="All dead tests must be completed and satisfactory before ANY live testing commences. This sequence is non-negotiable for AM2 assessment success."
          >
            <p>
              <strong>1. Continuity of Protective Conductors (R1 + R2).</strong> Test CPC continuity
              from consumer unit to all points. Use low resistance ohmmeter. AM2 Requirement: Record
              readings for each circuit. Demonstrate safe test lead connection.
            </p>
            <p>
              <strong>2. Continuity of Ring Final Circuit Conductors.</strong> Test ring continuity
              for line, neutral and CPC. Calculate (R1 + R2) values. AM2 Requirement: Show
              cross-connection method and record end-to-end resistance values.
            </p>
            <p>
              <strong>3. Insulation Resistance.</strong> Test at 500V DC minimum for circuits up to
              500V. Test between all conductors and to earth. Test Sequence: Line to Neutral, Line
              to Earth, Neutral to Earth. Minimum Values: 1.0 MΩ for most circuits, 0.5 MΩ for fire
              alarm/SELV. AM2 Critical: Disconnect electronic equipment, remove lamps where
              practical.
            </p>
            <p>
              <strong>4. Polarity.</strong> Verify correct polarity at all single-pole devices,
              lampholders and socket outlets. AM2 Requirement: Test using continuity tester. Verify
              line conductor connects to correct terminals.
            </p>
            <p>
              <strong>5. Earth Electrode Resistance (where applicable).</strong> For TT systems
              only. Test electrode resistance using appropriate earth tester. Maximum Values:
              Typically 200Ω for TT systems with 30mA RCD protection.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={quickCheckQuestions[0].id}
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 643.2.1"
            clause="The continuity of conductors and connections to exposed-conductive-parts and extraneous-conductive-parts, if any, shall be verified by a measurement of resistance of: (a) protective conductors, including protective bonding conductors; and (b) in the case of ring final circuits, live conductors."
            meaning={
              <>
                This is why CPC continuity (R1+R2) and ring final continuity sit right at the top of
                the dead-test list. The reg names exactly the two continuity tests AM2 expects you
                to perform — the protective conductor path AND, on every ring, the live conductors
                end-to-end. Skip either and you have not verified continuity per Part 6.
              </>
            }
            cite="BS 7671:2018+A4:2026 Part 6 — Inspection and Testing"
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 643.3.2 / Table 64"
            clause="The insulation resistance measured with the test voltages indicated in Table 64 shall be considered satisfactory if the main switchboard and each distribution circuit tested separately, with all its final circuits connected but with current-using equipment disconnected, has an insulation resistance not less than the appropriate value given in Table 64."
            meaning={
              <>
                Table 64 — circuits up to and including 500 V (excluding SELV/PELV): test at{' '}
                <strong>500 V DC</strong>, minimum <strong>1 MΩ</strong>. SELV/PELV: 250 V DC, 0.5
                MΩ. Above 500 V: 1000 V DC. On AM2 day, set the MFT to 500 V DC for the standard rig
                and disconnect current-using equipment first — Reg 643.3.3 covers the 250 V DC
                two-stage method where electronics cannot be cleanly removed.
              </>
            }
            cite="BS 7671:2018+A4:2026 Reg 643.3 / Table 64"
          />

          <SectionRule />

          <ConceptBlock
            title="2. Live Testing Phase — only after dead tests complete"
            plainEnglish="Live testing ONLY after ALL dead tests are satisfactory. Performing live tests prematurely = automatic AM2 failure."
          >
            <p>
              <strong>6. Earth Fault Loop Impedance (Zs).</strong> Measure Zs at furthest point of
              each circuit. Compare against BS 7671 maximum values. BS 7671 A4:2026 Maximum Values —
              Type B MCB: 32A = 1.37Ω, 20A = 2.19Ω, 16A = 2.74Ω, 6A = 7.28Ω (Cmin = 0.95 applied).
              Type C MCB: Values × 0.5. AM2 Critical: Account for hot-cable correction (measured Zs
              ≤ 0.8 × table max).
            </p>
            <p>
              <strong>7. RCD Operation and Timing.</strong> Test Requirements: Trip at 50% rated
              current (½×IΔn): Should NOT trip. Trip at 100% rated current (1×IΔn): Must trip within
              300ms (general-purpose) / 40ms (Type S: 200ms). A4:2026 deleted the 5×IΔn test —
              single AC test at 1×IΔn only. AM2 Critical: Test both positive and negative half
              cycles.
            </p>
            <p>
              <strong>8. Voltage Measurements.</strong> Verify supply voltage at consumer unit and
              at extremities of circuits. Acceptable Range: 230V ±10% (207V - 253V). 3-Phase: 400V
              ±10% (360V - 440V). AM2 Requirement: Record voltage drop calculations where
              significant.
            </p>
            <p>
              <strong>9. Phase Sequence (3-Phase Only).</strong> Verify correct phase rotation for
              3-phase installations. Standard Sequence: L1-L2-L3 clockwise rotation.
            </p>
            <p>
              <strong>10. Functional Testing.</strong> Test operation of switches, controls, and
              protective devices. AM2 Requirement: Demonstrate safe switching procedures and verify
              correct operation.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={quickCheckQuestions[1].id}
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 643.7.1"
            clause="The verification of the effectiveness of the measures for fault protection by automatic disconnection of supply is effected as follows: (a) TN system — Compliance with Regulation 411.4 shall be verified by: (i) measurement of the earth fault loop impedance (see Regulation 643.7.3)."
            meaning={
              <>
                On a TN system (which is what most AM2 rigs simulate) you prove ADS by measuring
                earth fault loop impedance. Ze first at the origin, then Zs at the furthest point of
                each circuit. Compare against Table 41.3 — and apply the 0.8 rule (measured Zs at
                ambient ≤ 0.8 × tabulated max) so the conductor still operates the device when warm.
              </>
            }
            cite="BS 7671:2018+A4:2026 Reg 643.7.1 / 643.7.3 / Table 41.3"
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 643.7.3.201 (Prospective fault current)"
            clause="The prospective short-circuit current and prospective earth fault current shall be measured, calculated or determined by another method, at the origin and at other relevant points in the installation."
            meaning={
              <>
                PFC at the origin = the higher of PSCC (line-to-neutral short circuit) and PEFC
                (line-to-earth fault). Record what your meter shows — typical TN-C-S domestic origin
                lands in the 1-6 kA region. The number proves every protective device's breaking
                capacity (Icn / Ics) is high enough for the fault current it would have to clear.
              </>
            }
            cite="BS 7671:2018+A4:2026 Reg 643.7.3.201 / Appendix 14"
          />

          <SectionRule />

          <ConceptBlock
            title="3. Critical Test Values and Procedures"
            plainEnglish="Pin down the test voltage, threshold, sequence and disconnection rules for each test you'll do on the day."
          >
            <p>
              <strong>Insulation Resistance Testing — 500V DC.</strong> Test voltage: 500V DC for
              circuits up to 500V. Minimum acceptable value: 1.0 MΩ (most circuits). Test sequence:
              L-N, L-E, N-E. Remove/disconnect electronic equipment before testing.
            </p>
            <p>
              <strong>Continuity Testing — Low Resistance.</strong> Use low-resistance ohmmeter or
              continuity tester. Nullify test leads before measurement. Record R1+R2 values for each
              circuit. Verify ring circuit integrity (end-to-end method).
            </p>
            <p>
              <strong>RCD Testing — Trip Time.</strong> Test at ½×IΔn (should not trip — confirms
              RCD won't nuisance-trip). Test at 1×IΔn (must trip within 300ms for general-purpose
              RCD; 40ms for Type S). A4:2026 — single AC test at 1×IΔn only (the 5×IΔn test from
              earlier amendments was deleted). Test all RCD devices individually.
            </p>
            <p>
              <strong>Earth Fault Loop Impedance — Zs Values.</strong> Measure Ze (external loop
              impedance) first. Measure Zs at furthest points on each circuit. Verify Zs is less
              than or equal to maximum values in BS 7671:2018+A4:2026 Table 41.3. Account for
              temperature correction factors.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={quickCheckQuestions[2].id}
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />

          <div className="my-6">
            <h3 className="text-ios-headline font-semibold text-elec-yellow mb-3">
              Try the calculator — predicted vs measured Zs (V = IR)
            </h3>
            <p className="text-xs sm:text-sm text-white/80 mb-3">
              Use Ohm's Law to sanity-check your Zs reading at the furthest point. Worked example:
              U0 = 230 V, target fault current Ia for a B32 = 230 / 1.37 ≈ 168 A → Zs(max) ≈ 1.37 Ω
              (BS 7671 A4:2026 Table 41.3). Measured Zs must be at or below 0.8 × table max (≈ 1.10
              Ω for B32) to allow for hot-cable correction. Plug in V and your measured Zs to read
              the prospective fault current.
            </p>
            <OhmsCalculator />
          </div>

          <CommonMistake
            title="Quoting the pre-A4 Zsmax of 1.44 Ω for a B32"
            whatHappens={
              <>
                You learnt B32 = 1.44 Ω from an older textbook or a 17th/18th Edition revision pack.
                You write 1.44 Ω on the test schedule as the maximum allowable Zs. Assessor knows
                A4:2026 dropped the figure to 1.37 Ω (Cmin = 0.95 formally applied to U0). You have
                just cited the wrong amendment on a brand-new EIC — paperwork mark gone, currency
                question raised about everything else you wrote.
              </>
            }
            doInstead={
              <>
                Use the A4:2026 figures. B-curve at 230 V: B6 ≈ 7.28 Ω · B16 ≈ 2.74 Ω ·{' '}
                <strong>B32 = 1.37 Ω</strong> · B40 ≈ 1.09 Ω. C-curve roughly halves these. Then
                apply the 0.8 rule for ambient measurement → measured Zs on a B32 must be ≤ 1.10 Ω.
                Drill these numbers before AM2 day so you can write them without looking them up.
              </>
            }
          />

          <CommonMistake
            title="Pushing the 5×IΔn RCD test that A4:2026 deleted"
            whatHappens={
              <>
                The MFT still has a "5×" button. You hit it out of habit — partly because the older
                training materials said "test at 1× then 5× then push the button". You log a 25 ms
                trip time at 5×. Assessor flags the routine as out of date — A4:2026 deleted Table
                3A from Appendix 3 and the 5×IΔn AC verification went with it.
              </>
            }
            doInstead={
              <>
                Single AC test at <strong>1×IΔn</strong> per Reg 643.8 + manual test button — that's
                the entire RCD verification routine for AM2 day. Trip ≤ 300 ms (general-purpose), ≤
                200 ms (Type S), and ≤ 40 ms is the figure you cite for additional protection in
                Chapter 41. No 5×, no ½× pre-test on AM2 (some MFTs run that automatically — it is
                not part of the verification you record).
              </>
            }
          />

          <Scenario
            title="The rig has a B32 socket circuit measuring Zs = 1.18 Ω"
            situation={
              <>
                You're at the AM2 testing rig. Ring final on a B32 RCBO. Ze at origin came back at
                0.32 Ω. You measure Zs at the furthest socket — 1.18 Ω. You have ten minutes left
                before the next test block. The figure is below 1.37 Ω (A4:2026 table max for B32),
                but it is above 0.8 × 1.37 = 1.10 Ω.
              </>
            }
            whatToDo={
              <>
                Record the measured value exactly — 1.18 Ω. State the Table 41.3 max (1.37 Ω) and
                the 0.8 acceptance threshold (1.10 Ω) on your working. Flag it as a non-compliance —
                the cable is fine when cold but pushes over the hot-corrected limit. On a real EICR
                that's a C2 (potentially dangerous). On AM2 day, recording it correctly with the
                figure and the reasoning earns marks. Hiding it = fail.
              </>
            }
            whyItMatters={
              <>
                The 0.8 rule isn't paranoia — it's the temperature-correction factor that turns a
                cold Zs reading into the worst-case hot-cable Zs the breaker has to clear. Miss it
                and you certify a circuit that meets paper limits cold but fails to disconnect
                within ADS time once the cable is loaded.
              </>
            }
          />

          <SectionRule />

          <ConceptBlock
            title="4. Assessment Success Factors — what assessors evaluate"
            plainEnglish="Strict adherence to GN3 sequence, safe working practices, competent equipment use and clear understanding of the readings — that's the bar."
          >
            <p>
              <strong>Strict adherence to GN3 test sequence.</strong> No deviation from prescribed
              order — this demonstrates professional competence.
            </p>
            <p>
              <strong>Safe working practices throughout.</strong> Proper isolation verification,
              appropriate PPE, safe test procedures.
            </p>
            <p>
              <strong>Competent use of test equipment.</strong> Correct instrument selection, proper
              lead connections, accurate readings.
            </p>
            <p>
              <strong>Understanding of test results.</strong> Ability to interpret readings and
              identify potential issues.
            </p>
            <p>
              <strong>Common Failure Points:</strong> Testing live before dead tests complete
              (automatic failure). Inadequate isolation verification (safety breach). Poor test lead
              technique (unreliable results). Misunderstanding of test results (lacks competence
              demonstration). Incomplete documentation (professional standards not met). Rushing
              through procedures (mistakes and missed steps).
            </p>
            <p>
              <strong>Professional Standards Expected:</strong> Methodical approach matching
              industry standards. Clear understanding of safety implications. Accurate documentation
              as work progresses. Professional communication with assessors. Realistic timeframes
              for each test procedure. Appropriate response to unexpected results.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="What the Assessor is Looking For"
            plainEnglish="Five things on the assessor's mental checklist on AM2 day."
          >
            <p>
              <strong>Safe Working Practices.</strong> Demonstrating isolation, proving dead,
              appropriate PPE, and risk assessment procedures consistently throughout the
              assessment.
            </p>
            <p>
              <strong>Methodical Test Sequence.</strong> Following GN3 sequence exactly — dead tests
              completely finished before ANY live testing commences.
            </p>
            <p>
              <strong>Correct Equipment Use.</strong> Appropriate test instruments, correct
              settings, proper lead connections, and understanding equipment limitations.
            </p>
            <p>
              <strong>Accurate Documentation.</strong> Recording results systematically,
              understanding what values mean, and identifying when results require investigation.
            </p>
            <p>
              <strong>Professional Communication.</strong> Explaining procedures, discussing
              findings, and demonstrating understanding of regulations and standards.
            </p>
            <p>
              <strong>Common Failure Points:</strong> Attempting live tests before completing all
              dead tests. Inadequate isolation procedures or failing to prove dead. Using incorrect
              test voltages or equipment settings. Poor documentation or inability to interpret
              results. Unsafe practices or inadequate risk assessment.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Section Summary — Key Takeaways"
            plainEnglish="Practice the complete sequence until it becomes second nature."
          >
            <p>
              NET AM2 success depends on following the exact GN3 testing sequence without deviation.
            </p>
            <p>Dead tests must be 100% complete and satisfactory before any live testing.</p>
            <p>
              BS 7671:2018+A4:2026 test values and procedures must be applied correctly and
              consistently.
            </p>
            <p>
              Safe working practices are paramount — unsafe practice results in automatic failure.
            </p>
            <p>Professional documentation and result interpretation demonstrate competence.</p>
            <p>Assessors evaluate methodology and safety awareness, not just numerical results.</p>
            <p>
              <strong>Next Steps:</strong> Having mastered the testing sequence, you should now
              focus on practical application and timing. The next section covers specific test
              procedures and common scenarios you will encounter during your AM2 assessment.
            </p>
          </ConceptBlock>

          <SectionRule />

          <FAQ
            items={[
              {
                question:
                  'Why does the dead-test order matter — surely the test is the same in any order?',
                answer:
                  "The order is a safety chain. Continuity (R1+R2) proves the CPC is actually there before you put 500 V DC across it. Ring continuity proves the live conductors aren't broken before IR. IR catches a fault to earth before you energise. Polarity stops you closing a switch onto a live neutral. Every step protects the next. Skip ahead and the assessor sees a candidate who doesn't understand why the sequence exists.",
              },
              {
                question:
                  "What's the actual A4:2026 RCD test routine — I've seen conflicting things online?",
                answer:
                  "A4:2026 deleted Table 3A from Appendix 3. The whole 5×IΔn row is gone. The verification routine is: single AC test at 1×IΔn (general-purpose RCD must trip ≤ 300 ms; Type S ≤ 200 ms; ≤ 40 ms is the figure for additional protection per Chapter 41), plus the manual test button. That's it. Some MFTs still auto-run a ½×IΔn no-trip check — that's pre-test confirmation, not part of the verification you record.",
              },
              {
                question: 'Why is B32 Zsmax 1.37 Ω now and not the older 1.44 Ω I was taught?',
                answer:
                  'A4:2026 formally applied Cmin = 0.95 to U0 in the Zs calculation — the worst-case voltage at the origin under fault. U0 × Cmin = 230 × 0.95 = 218.5 V. Divide by the magnetic-trip current Ia for a B32 (5 × In = 160 A) → Zsmax = 218.5 / 160 = 1.37 Ω. The 1.44 Ω figure was the pre-A4 tabulated value (with U0 = 230 V undivided). Use 1.37 Ω on every Type B 32 A circuit on the AM2 rig.',
              },
              {
                question: "What's the 0.8 rule and why do I need it on top of Table 41.3?",
                answer:
                  'Cables get hotter under load. Hot copper has higher resistance, so Zs at full load is higher than the cold Zs you measure on AM2 day. The 0.8 rule (sometimes called the 80% rule or the rule of thumb in GN3) says measured cold Zs ≤ 0.8 × Table 41.3 max — that gives a margin so the device still trips in time when the conductor is at operating temperature. For a B32: 0.8 × 1.37 ≈ 1.10 Ω cold maximum.',
              },
              {
                question:
                  'What test voltage do I use if the rig has electronic equipment connected?',
                answer:
                  'Default is 500 V DC for circuits up to 500 V (Reg 643.3.2 / Table 64). If electronics could be damaged or skew the reading, Reg 643.3.3 gives you the two-stage method: test at 500 V DC with electronics disconnected, then re-test at 250 V DC with everything reconnected — minimum 1 MΩ at 250 V. SELV/PELV: 250 V DC, 0.5 MΩ. Above 500 V: 1000 V DC.',
              },
              {
                question: 'When do I record PFC vs PSCC vs PEFC on the EIC?',
                answer:
                  "Reg 643.7.3.201 requires both PSCC (line-to-neutral) and PEFC (line-to-earth) at the origin. The EIC has one PFC field — record the higher of the two, that's what every protective device must clear. Most MFTs display all three on the Ze test screen. Typical TN-C-S domestic origin: 1-6 kA. Bigger industrial supplies push higher; check every device's breaking capacity (Icn / Ics) covers it.",
              },
            ]}
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Dead tests fully complete BEFORE any live testing — the rule that separates a pass from an automatic fail.',
              'GN3 sequence: continuity (R1+R2) → ring continuity → IR (500 V DC, ≥1 MΩ) → polarity → Ze (TT: earth electrode) → energise → Zs → PFC → RCD → phase sequence → functional.',
              'A4:2026 figures only: B32 Zsmax = 1.37 Ω (NOT 1.44). Apply 0.8 rule → measured Zs cold ≤ 1.10 Ω on a B32.',
              'RCD verification = single AC test at 1×IΔn + manual test button. The 5×IΔn test was deleted at A4:2026.',
              'Reg 643.3.3 two-stage IR: 500 V DC with electronics disconnected, then 250 V DC reconnected — both must hit the Table 64 minimum.',
              "PFC at the origin = the higher of PSCC and PEFC. Record what the meter shows; check every device's Icn / Ics covers it.",
            ]}
          />

          <Quiz questions={quizQuestions} title="Testing Sequence Assessment" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/am2/module4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module 4 Overview
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/am2/module4/section2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Safe Use of Test Instruments
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default AM2Module4Section1;
