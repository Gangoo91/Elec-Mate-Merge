/**
 * Module 5 · Section 1 — Typical faults set in the AM2 assessment
 * AM2 day-prep — AM2 Phase D (fault diagnosis + rectification)
 * The faults NET typically build in: open circuits, shorts, polarity swaps, missing CPCs — and how to spot each.
 */

import {
  AlertTriangle,
  ArrowLeft,
  BookOpen,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Eye,
  Lightbulb,
  Search,
  Settings,
  Target,
  Wrench,
  Zap,
} from 'lucide-react';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { Link } from 'react-router-dom';
import {
  ConceptBlock,
  CommonMistake,
  LearningOutcomes,
  TLDR,
  RegsCallout,
  Scenario,
  KeyTakeaways,
  FAQ,
} from '@/components/study-centre/learning';
import { PageFrame, PageHero } from '@/components/college/primitives';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Typical Faults Set in the AM2 Assessment | AM2 Module 5.1 | Elec-Mate';
const DESCRIPTION =
  'The faults NET typically builds into the AM2 — open circuits, shorts, polarity swaps, missing CPCs — and the symptoms that give them away.';

const AM2Module5Section1 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quickCheckQuestions: Array<{
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }> = [
    {
      id: 'open-circuit',
      question: 'What is the most common symptom of an open circuit fault?',
      options: [
        'Current cost performance trends will continue',
        'Measure coil resistance with power off',
        'The cpc may be a smaller cross-sectional area',
        'Circuit completely dead, no power at all',
      ],
      correctIndex: 3,
      explanation:
        'Open circuits break the electrical path completely, resulting in no power reaching the load.',
    },
    {
      id: 'high-resistance',
      question: 'Which test would most likely detect a high resistance connection?',
      options: [
        'Possible overheating due to a loose connection or excessive current',
        'Continuity test showing higher than expected resistance',
        'To maintain circuit integrity during a fire',
        'High-density parallel connections for 40G/100G+',
      ],
      correctIndex: 1,
      explanation:
        'High resistance connections show up as unexpectedly high readings during continuity testing.',
    },
    {
      id: 'short-circuit',
      question:
        'What happens when you test insulation resistance on a circuit with a short circuit fault?',
      options: [
        'At designated assembly points away from the building',
        'Before the construction phase begins',
        'The phase angle between voltage and current',
        'Reading close to zero or very low resistance',
      ],
      correctIndex: 3,
      explanation:
        'Short circuits provide a direct path between conductors, resulting in very low or zero insulation resistance.',
    },
  ];

  const quizQuestions = [
    {
      id: 1,
      question: 'What is the most common type of fault deliberately set in AM2 assessments?',
      options: [
        'High resistance connections',
        'Open circuit faults',
        'Short circuit faults',
        'Earth faults',
      ],
      correctAnswer: 1,
      explanation:
        "Open circuit faults are most commonly set as they're realistic, safe to create, and easy for assessors to verify.",
    },
    {
      id: 2,
      question:
        'If a circuit shows infinite resistance during insulation testing, what type of fault is likely present?',
      options: [
        'High resistance connection',
        'Short circuit',
        'Open circuit',
        'Earth fault',
      ],
      correctAnswer: 2,
      explanation:
        'Open circuits break the path completely, so insulation testing between conductors shows infinite resistance.',
    },
    {
      id: 3,
      question:
        'What would you expect to find during continuity testing on a high resistance connection?',
      options: [
        'Correct indication of equipment status',
        'Not all loads operate at maximum simultaneously',
        'From day one, applied equally to everyone',
        'Higher than expected resistance reading',
      ],
      correctAnswer: 3,
      explanation:
        'High resistance connections show elevated resistance readings during continuity testing.',
    },
    {
      id: 4,
      question: 'Where are open circuit faults typically introduced in AM2 setups?',
      options: [
        'At junction boxes or connection points',
        'Flush-mounted and surface-mounted',
        'Connect shield at both ends',
        'To ensure continuous visibility',
      ],
      correctAnswer: 0,
      explanation:
        'Junction boxes and connection points are the safest and most realistic places to introduce open circuit faults.',
    },
    {
      id: 5,
      question: 'What is the main symptom of a short circuit fault?',
      options: [
        'Retest to verify the correction',
        'Protective device operates (MCB trips)',
        'A government-backed default pension scheme',
        'Local equipotential bonding',
      ],
      correctAnswer: 1,
      explanation:
        'Short circuits cause excessive current flow, which trips protective devices like MCBs or fuses.',
    },
    {
      id: 6,
      question: 'During RCD testing, what would indicate a possible earth fault?',
      options: [
        'RCD operates correctly',
        'RCD fails to operate',
        'RCD test gives inconsistent results',
        'RCD operates too quickly',
      ],
      correctAnswer: 2,
      explanation:
        'Inconsistent RCD operation or unexpected tripping can indicate earth fault issues.',
    },
    {
      id: 7,
      question: 'What should you do if you discover a genuine fault during AM2 testing?',
      options: [
        'Fix it immediately',
        'Ignore it and continue',
        'Mark it as a deliberate fault',
        'Report it to the assessor',
      ],
      correctAnswer: 3,
      explanation:
        'Any genuine faults discovered must be reported to the assessor immediately for safety.',
    },
    {
      id: 8,
      question: 'How are high resistance connections typically created in AM2 setups?',
      options: [
        'Loose terminals or poor connections',
        'Annual energy savings exceeded £250,000',
        'A silence period of 3.5 character times',
        'Level the tower and lock all castors',
      ],
      correctAnswer: 0,
      explanation:
        'Loose terminals or deliberately poor connections create realistic high resistance faults.',
    },
    {
      id: 9,
      question: "What's the key difference between open circuit and high resistance faults?",
      options: [
        'Electrical isolation and safe working practices',
        'Open circuit = no continuity, high resistance = poor continuity',
        'Either end of previous day or first thing in morning',
        'Running a petrol-powered generator inside the space',
      ],
      correctAnswer: 1,
      explanation:
        'Open circuits completely break continuity, while high resistance faults allow current flow but with increased resistance.',
    },
    {
      id: 10,
      question: 'True or false: All AM2 installations will have exactly one deliberate fault.',
      options: [
        'Risk of shock is increased, such as bathrooms',
        'Ohmmeter or continuity tester',
        'False - there may be multiple faults',
        'Live to earth and live to neutral',
      ],
      correctAnswer: 2,
      explanation:
        'AM2 installations may contain multiple deliberate faults to thoroughly test diagnostic skills.',
    },
  ];

  const learningOutcomes = [
    'Identify the most common types of faults set in AM2 assessments',
    'Recognise symptoms and testing methods for each fault type',
    'Understand where faults are typically located in test installations',
    'Apply systematic diagnosis techniques rather than random testing',
    'Know what assessors expect in fault-finding demonstrations',
  ];

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <Link
            to="/study-centre/apprentice/am2/module5"
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 5
          </Link>

          {/* Hero Section */}
          <PageHero
            eyebrow="Module 5 - Section 1"
            title="Typical Faults Set in the AM2 Assessment"
            description="The AM2 assessment deliberately includes electrical faults that you must identify, test, and document. These aren't random - they're carefully selected realistic faults that electricians encounter in the field."
            tone="yellow"
          />

          <TLDR
            points={[
              'On AM2 day, expect 2 deliberate faults built into the rig — open circuit, short circuit, earth fault, high-resistance joint or polarity error are the usual suspects.',
              "You're not being marked on luck — you're marked on whether you prove dead first, then test logically, then state type + location + rectification.",
              "Continuity finds opens. Insulation resistance finds shorts and earth faults. Zs finds high-resistance joints. Match the test to the symptom — don't guess.",
            ]}
          />

          {/* Additional Context */}
          <p className="text-ios-body text-white leading-relaxed -mt-4 mb-6">
            Understanding common fault types, their symptoms, and appropriate testing methods is
            essential for AM2 success. Assessors want to see systematic diagnosis, not guesswork.
          </p>

          {/* Critical Warning */}
          <CommonMistake
            title="Real vs Deliberate Faults"
            whatHappens={
              'If you discover what appears to be a genuine safety fault (not a deliberate test fault), stop work immediately and report it to your assessor. Never assume all faults are deliberate. Your safety assessment skills are being tested - both in finding deliberate faults and recognising genuine hazards.'
            }
            doInstead="Treat this as a hard rule on AM2 day — there are no exceptions."
          />

          {/* Learning Outcomes */}
          <LearningOutcomes outcomes={learningOutcomes} />

          {/* Fault Diagnosis Decision Tree Diagram */}
          <div className="my-8 flex justify-center">
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 w-full max-w-2xl">
              <svg
                viewBox="0 0 500 500"
                className="w-full h-auto"
                role="img"
                aria-label="Fault diagnosis decision tree showing four common symptoms, the appropriate test for each, and the resulting fault type identified"
              >
                {/* Title */}
                <text
                  x="250"
                  y="24"
                  textAnchor="middle"
                  fill="#F3F4F6"
                  fontSize="15"
                  fontFamily="system-ui, sans-serif"
                  fontWeight="bold"
                >
                  Fault Diagnosis Decision Tree
                </text>

                {/* Column headers */}
                <text
                  x="80"
                  y="52"
                  textAnchor="middle"
                  fill="#9CA3AF"
                  fontSize="11"
                  fontFamily="system-ui, sans-serif"
                  fontWeight="bold"
                >
                  SYMPTOM
                </text>
                <text
                  x="250"
                  y="52"
                  textAnchor="middle"
                  fill="#9CA3AF"
                  fontSize="11"
                  fontFamily="system-ui, sans-serif"
                  fontWeight="bold"
                >
                  TEST
                </text>
                <text
                  x="420"
                  y="52"
                  textAnchor="middle"
                  fill="#9CA3AF"
                  fontSize="11"
                  fontFamily="system-ui, sans-serif"
                  fontWeight="bold"
                >
                  FAULT TYPE
                </text>

                {/* Row 1: Dead Circuit */}
                <rect x="10" y="70" width="140" height="44" rx="8" fill="#2563EB" />
                <text
                  x="80"
                  y="88"
                  textAnchor="middle"
                  fill="white"
                  fontSize="11"
                  fontFamily="system-ui, sans-serif"
                  fontWeight="bold"
                >
                  Dead Circuit
                </text>
                <text
                  x="80"
                  y="104"
                  textAnchor="middle"
                  fill="white"
                  fontSize="10"
                  fontFamily="system-ui, sans-serif"
                >
                  (No power at all)
                </text>

                <line x1="150" y1="92" x2="180" y2="92" stroke="#9CA3AF" strokeWidth="2" />
                <polygon points="176,86 186,92 176,98" fill="#9CA3AF" />

                <rect x="185" y="70" width="130" height="44" rx="8" fill="#D97706" />
                <text
                  x="250"
                  y="88"
                  textAnchor="middle"
                  fill="white"
                  fontSize="11"
                  fontFamily="system-ui, sans-serif"
                  fontWeight="bold"
                >
                  Continuity
                </text>
                <text
                  x="250"
                  y="104"
                  textAnchor="middle"
                  fill="white"
                  fontSize="10"
                  fontFamily="system-ui, sans-serif"
                >
                  Test R1+R2
                </text>

                <line x1="315" y1="92" x2="345" y2="92" stroke="#9CA3AF" strokeWidth="2" />
                <polygon points="341,86 351,92 341,98" fill="#9CA3AF" />

                <rect x="350" y="70" width="140" height="44" rx="8" fill="#DC2626" />
                <text
                  x="420"
                  y="88"
                  textAnchor="middle"
                  fill="white"
                  fontSize="11"
                  fontFamily="system-ui, sans-serif"
                  fontWeight="bold"
                >
                  Open Circuit
                </text>
                <text
                  x="420"
                  y="104"
                  textAnchor="middle"
                  fill="white"
                  fontSize="10"
                  fontFamily="system-ui, sans-serif"
                >
                  Fault
                </text>

                {/* Row 2: MCB Trips */}
                <rect x="10" y="130" width="140" height="44" rx="8" fill="#2563EB" />
                <text
                  x="80"
                  y="148"
                  textAnchor="middle"
                  fill="white"
                  fontSize="11"
                  fontFamily="system-ui, sans-serif"
                  fontWeight="bold"
                >
                  MCB Trips
                </text>
                <text
                  x="80"
                  y="164"
                  textAnchor="middle"
                  fill="white"
                  fontSize="10"
                  fontFamily="system-ui, sans-serif"
                >
                  (Immediately)
                </text>

                <line x1="150" y1="152" x2="180" y2="152" stroke="#9CA3AF" strokeWidth="2" />
                <polygon points="176,146 186,152 176,158" fill="#9CA3AF" />

                <rect x="185" y="130" width="130" height="44" rx="8" fill="#D97706" />
                <text
                  x="250"
                  y="148"
                  textAnchor="middle"
                  fill="white"
                  fontSize="11"
                  fontFamily="system-ui, sans-serif"
                  fontWeight="bold"
                >
                  Insulation
                </text>
                <text
                  x="250"
                  y="164"
                  textAnchor="middle"
                  fill="white"
                  fontSize="10"
                  fontFamily="system-ui, sans-serif"
                >
                  Resistance (IR)
                </text>

                <line x1="315" y1="152" x2="345" y2="152" stroke="#9CA3AF" strokeWidth="2" />
                <polygon points="341,146 351,152 341,158" fill="#9CA3AF" />

                <rect x="350" y="130" width="140" height="44" rx="8" fill="#DC2626" />
                <text
                  x="420"
                  y="148"
                  textAnchor="middle"
                  fill="white"
                  fontSize="11"
                  fontFamily="system-ui, sans-serif"
                  fontWeight="bold"
                >
                  Short Circuit
                </text>
                <text
                  x="420"
                  y="164"
                  textAnchor="middle"
                  fill="white"
                  fontSize="10"
                  fontFamily="system-ui, sans-serif"
                >
                  Fault
                </text>

                {/* Row 3: RCD Trips */}
                <rect x="10" y="190" width="140" height="44" rx="8" fill="#2563EB" />
                <text
                  x="80"
                  y="208"
                  textAnchor="middle"
                  fill="white"
                  fontSize="11"
                  fontFamily="system-ui, sans-serif"
                  fontWeight="bold"
                >
                  RCD Trips
                </text>
                <text
                  x="80"
                  y="224"
                  textAnchor="middle"
                  fill="white"
                  fontSize="10"
                  fontFamily="system-ui, sans-serif"
                >
                  (On energisation)
                </text>

                <line x1="150" y1="212" x2="180" y2="212" stroke="#9CA3AF" strokeWidth="2" />
                <polygon points="176,206 186,212 176,218" fill="#9CA3AF" />

                <rect x="185" y="190" width="130" height="44" rx="8" fill="#D97706" />
                <text
                  x="250"
                  y="208"
                  textAnchor="middle"
                  fill="white"
                  fontSize="11"
                  fontFamily="system-ui, sans-serif"
                  fontWeight="bold"
                >
                  IR Line-Earth
                </text>
                <text
                  x="250"
                  y="224"
                  textAnchor="middle"
                  fill="white"
                  fontSize="10"
                  fontFamily="system-ui, sans-serif"
                >
                  L-E and N-E
                </text>

                <line x1="315" y1="212" x2="345" y2="212" stroke="#9CA3AF" strokeWidth="2" />
                <polygon points="341,206 351,212 341,218" fill="#9CA3AF" />

                <rect x="350" y="190" width="140" height="44" rx="8" fill="#DC2626" />
                <text
                  x="420"
                  y="208"
                  textAnchor="middle"
                  fill="white"
                  fontSize="11"
                  fontFamily="system-ui, sans-serif"
                  fontWeight="bold"
                >
                  Earth Fault
                </text>
                <text
                  x="420"
                  y="224"
                  textAnchor="middle"
                  fill="white"
                  fontSize="10"
                  fontFamily="system-ui, sans-serif"
                >
                  (Insulation breakdown)
                </text>

                {/* Row 4: Poor Performance */}
                <rect x="10" y="250" width="140" height="44" rx="8" fill="#2563EB" />
                <text
                  x="80"
                  y="268"
                  textAnchor="middle"
                  fill="white"
                  fontSize="11"
                  fontFamily="system-ui, sans-serif"
                  fontWeight="bold"
                >
                  Poor Performance
                </text>
                <text
                  x="80"
                  y="284"
                  textAnchor="middle"
                  fill="white"
                  fontSize="10"
                  fontFamily="system-ui, sans-serif"
                >
                  (Dim lights, heat)
                </text>

                <line x1="150" y1="272" x2="180" y2="272" stroke="#9CA3AF" strokeWidth="2" />
                <polygon points="176,266 186,272 176,278" fill="#9CA3AF" />

                <rect x="185" y="250" width="130" height="44" rx="8" fill="#D97706" />
                <text
                  x="250"
                  y="268"
                  textAnchor="middle"
                  fill="white"
                  fontSize="11"
                  fontFamily="system-ui, sans-serif"
                  fontWeight="bold"
                >
                  Zs (Loop
                </text>
                <text
                  x="250"
                  y="284"
                  textAnchor="middle"
                  fill="white"
                  fontSize="10"
                  fontFamily="system-ui, sans-serif"
                >
                  Impedance)
                </text>

                <line x1="315" y1="272" x2="345" y2="272" stroke="#9CA3AF" strokeWidth="2" />
                <polygon points="341,266 351,272 341,278" fill="#9CA3AF" />

                <rect x="350" y="250" width="140" height="44" rx="8" fill="#DC2626" />
                <text
                  x="420"
                  y="268"
                  textAnchor="middle"
                  fill="white"
                  fontSize="11"
                  fontFamily="system-ui, sans-serif"
                  fontWeight="bold"
                >
                  High Resistance
                </text>
                <text
                  x="420"
                  y="284"
                  textAnchor="middle"
                  fill="white"
                  fontSize="10"
                  fontFamily="system-ui, sans-serif"
                >
                  Joint
                </text>

                {/* Bottom guidance box */}
                <rect
                  x="50"
                  y="320"
                  width="400"
                  height="60"
                  rx="8"
                  fill="#1F2937"
                  stroke="#D97706"
                  strokeWidth="1.5"
                />
                <text
                  x="250"
                  y="344"
                  textAnchor="middle"
                  fill="#FCD34D"
                  fontSize="12"
                  fontFamily="system-ui, sans-serif"
                  fontWeight="bold"
                >
                  Systematic Approach:
                </text>
                <text
                  x="250"
                  y="362"
                  textAnchor="middle"
                  fill="#F3F4F6"
                  fontSize="10"
                  fontFamily="system-ui, sans-serif"
                >
                  Identify Symptom &rarr; Select Correct Test &rarr; Diagnose Fault Type
                </text>
                <text
                  x="250"
                  y="376"
                  textAnchor="middle"
                  fill="#9CA3AF"
                  fontSize="9"
                  fontFamily="system-ui, sans-serif"
                >
                  Never guess -- always test methodically
                </text>

                {/* Colour legend */}
                <rect
                  x="115"
                  y="400"
                  width="270"
                  height="44"
                  rx="6"
                  fill="#1F2937"
                  stroke="#374151"
                  strokeWidth="1"
                />
                <rect x="130" y="414" width="16" height="16" rx="3" fill="#2563EB" />
                <text
                  x="152"
                  y="426"
                  fill="#F3F4F6"
                  fontSize="10"
                  fontFamily="system-ui, sans-serif"
                >
                  Symptom
                </text>
                <rect x="210" y="414" width="16" height="16" rx="3" fill="#D97706" />
                <text
                  x="232"
                  y="426"
                  fill="#F3F4F6"
                  fontSize="10"
                  fontFamily="system-ui, sans-serif"
                >
                  Test
                </text>
                <rect x="275" y="414" width="16" height="16" rx="3" fill="#DC2626" />
                <text
                  x="297"
                  y="426"
                  fill="#F3F4F6"
                  fontSize="10"
                  fontFamily="system-ui, sans-serif"
                >
                  Fault Type
                </text>

                {/* Bottom label */}
                <text
                  x="250"
                  y="470"
                  textAnchor="middle"
                  fill="#9CA3AF"
                  fontSize="10"
                  fontFamily="system-ui, sans-serif"
                >
                  AM2 Module 5 -- Fault Diagnosis Methodology
                </text>
              </svg>
            </div>
          </div>

          {/* Common Fault Types */}
          <ConceptBlock title="1. Common Fault Types in AM2">
            <p>
              <strong className="text-elec-yellow">TOP 4 Fault Categories You Must Know:</strong>
            </p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Open Circuits:</strong> Complete break in conductor - circuit appears dead
              </li>
              <li>
                <strong>High Resistance Connections:</strong> Poor joints - circuit works but
                resistance too high
              </li>
              <li>
                <strong>Short Circuits:</strong> Direct L-N or L-E contact - protective devices trip
              </li>
              <li>
                <strong>Polarity Errors:</strong> Incorrect connections - switches in neutral,
                reversed sockets
              </li>
            </ol>
          </ConceptBlock>

          <InlineCheck
            id={quickCheckQuestions[0].id}
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />

          <RegsCallout
            source="BS 7671 — Regulation 643.1"
            clause="Inspection and testing shall be carried out to verify, so far as is reasonably practicable, that the requirements of the Regulations have been met."
            meaning={
              <>
                On AM2 day, fault diagnosis isn't a separate world from initial verification — every
                test you do at the rig (continuity, IR, polarity, Zs, RCD) is the same test sequence
                BS 7671 Part 6 requires. The assessor wants to see you're treating each fault check
                as a proper Part 6 verification, not a quick poke around with a meter.
              </>
            }
            cite="Reference: BS 7671:2018+A4:2026 Part 6 — Inspection and testing"
          />

          {/* How to Test for Each Fault Type */}
          <ConceptBlock title="2. How to Test for Each Fault Type">
            <p>
              <strong className="text-elec-yellow">Open Circuit Testing:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Primary test:</strong> Continuity between conductor ends
              </li>
              <li>
                <strong>Expected result:</strong> Infinite resistance/no reading
              </li>
              <li>
                <strong>Symptom:</strong> Circuit completely dead, no power
              </li>
              <li>
                <strong>Location:</strong> Half-split method at junction boxes
              </li>
            </ul>

            <p>
              <strong className="text-elec-yellow">High Resistance Testing:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Primary test:</strong> Continuity with 200mA current
              </li>
              <li>
                <strong>Expected result:</strong> Higher than normal resistance
              </li>
              <li>
                <strong>Symptom:</strong> Circuit works but poor performance
              </li>
              <li>
                <strong>Also check:</strong> Earth fault loop impedance (Zs)
              </li>
            </ul>

            <p>
              <strong className="text-elec-yellow">Short Circuit Testing:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Primary test:</strong> Insulation resistance L-N at 500V
              </li>
              <li>
                <strong>Expected result:</strong> Very low/zero reading
              </li>
              <li>
                <strong>Symptom:</strong> MCB trips immediately when energised
              </li>
              <li>
                <strong>Safety:</strong> Never energise confirmed short circuits
              </li>
            </ul>

            <p>
              <strong className="text-elec-yellow">Earth Fault Testing:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Primary test:</strong> Insulation resistance L-E and N-E
              </li>
              <li>
                <strong>Expected result:</strong> Below 1MΩ to earth
              </li>
              <li>
                <strong>Symptom:</strong> RCD trips when circuit energised
              </li>
              <li>
                <strong>Also check:</strong> RCD sensitivity and operation time
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={quickCheckQuestions[1].id}
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />

          <Scenario
            title="The lighting circuit is dead — but the MCB hasn't tripped"
            situation={
              <>
                You're on the AM2 rig. The assessor asks you to investigate a lighting circuit that
                isn't working. You proved dead, locked off, and gathered your meter. The MCB is on,
                the consumer unit looks fine, and there's no obvious damage. Symptom: dead circuit,
                no power at all.
              </>
            }
            whatToDo={
              <>
                Don't start tearing accessories apart. The MCB hasn't tripped, so it's not a short
                or earth fault. A dead circuit with the MCB happily on points to an{' '}
                <strong>open circuit</strong> — most likely a loose conductor at a JB, switch or
                rose. Do continuity (R1+R2) from the consumer unit out to each accessory. The point
                where continuity fails is where your fault lives. Then state type + location + how
                you'd rectify it.
              </>
            }
            whyItMatters={
              <>
                On AM2 day you've got roughly 1.5–2 hours for fault-finding and you'll typically be
                set 2 faults. If you start swapping accessories or ripping cables before testing,
                you've burned half your time and shown the assessor you don't work systematically.
                BS 7671 Reg 643.1 wants verification — and the half-split continuity method is
                verification.
              </>
            }
          />

          <CommonMistake
            title="Energising a faulty circuit before you've finished testing"
            whatHappens={
              <>
                You think you've found the fault, you flip the MCB to "see if it works", and either
                (a) the MCB trips again because it was a short you missed, (b) you blow up the rig
                equipment, or (c) you fail safety and the assessor stops the test. All three end
                your AM2 day badly.
              </>
            }
            doInstead={
              <>
                Stay dead until you've fully diagnosed. Prove-test-prove every time you go back to
                isolation. Energising is the LAST step, and only when you can state with confidence
                what the fault was, where it was, and how it would be rectified.
              </>
            }
          />

          {/* Advanced Fault-Finding Techniques */}
          <ConceptBlock title="3. Advanced Fault-Finding Techniques">
            <p>
              <strong className="text-elec-yellow">The "Half-Split" Method:</strong>
            </p>
            <p>
              The most efficient way to locate faults in long circuits. Start testing at the
              midpoint, then eliminate half the circuit each time.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Step 1:</strong> Test continuity from origin to circuit midpoint
              </li>
              <li>
                <strong>Step 2:</strong> If fault present, check first half; if clear, check second
                half
              </li>
              <li>
                <strong>Step 3:</strong> Repeat halving process until fault section isolated
              </li>
              <li>
                <strong>Result:</strong> Locate fault in minimum number of tests
              </li>
            </ul>

            <p>
              <strong className="text-elec-yellow">Visual Inspection Priorities:</strong>
            </p>
            <p>
              Before touching test instruments, your eyes are your best diagnostic tool. Look for
              obvious issues first.
            </p>
            <p>
              <strong>At Outlets:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Loose terminal screws</li>
              <li>Burned/discoloured terminals</li>
              <li>Missing earth connections</li>
              <li>Incorrect wire positions</li>
            </ul>
            <p>
              <strong>In Junction Boxes:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Disconnected conductors</li>
              <li>Poor strip connector joints</li>
              <li>Exposed conductors touching</li>
              <li>Wrong colour coding</li>
            </ul>

            <p>
              <strong className="text-elec-yellow">Dangerous Assumptions to Avoid:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Never assume</strong> all circuits are the same - test each individually
              </li>
              <li>
                <strong>Never assume</strong> cables follow logical routes - physically trace them
              </li>
              <li>
                <strong>Never assume</strong> colours indicate function - verify with testing
              </li>
              <li>
                <strong>Never assume</strong> a circuit is dead - always test before working
              </li>
              <li>
                <strong>Never assume</strong> one fault = no other faults present
              </li>
            </ul>
          </ConceptBlock>

          {/* Real-World Fault Scenarios */}
          <ConceptBlock title="4. Real-World Fault Scenarios">
            <p>
              <strong className="text-elec-yellow">Scenario 1: "Lighting Circuit Dead"</strong>
            </p>
            <p>
              <strong>Customer complaint:</strong> "Half the downstairs lights stopped working this
              morning"
            </p>
            <p>
              <strong>Your observation:</strong> MCB hasn't tripped, other circuits working normally
            </p>
            <p>
              <strong>Likely fault:</strong> Open circuit in lighting final circuit
            </p>
            <p>
              <strong>Test approach:</strong> R1+R2 continuity from consumer unit to each light
              position
            </p>
            <p>
              <strong>Common location:</strong> Junction box under floorboards where cable has been
              damaged
            </p>

            <p>
              <strong className="text-elec-yellow">Scenario 2: "Socket Keeps Tripping RCD"</strong>
            </p>
            <p>
              <strong>Customer complaint:</strong> "RCD trips every time I plug anything into the
              kitchen socket"
            </p>
            <p>
              <strong>Your observation:</strong> RCD operates immediately, other sockets work fine
            </p>
            <p>
              <strong>Likely fault:</strong> Earth fault on that socket circuit
            </p>
            <p>
              <strong>Test approach:</strong> Insulation resistance L-E and N-E with socket isolated
            </p>
            <p>
              <strong>Common cause:</strong> Moisture ingress or damaged cable insulation
            </p>

            <p>
              <strong className="text-elec-yellow">Scenario 3: "Lights Work But Dim"</strong>
            </p>
            <p>
              <strong>Customer complaint:</strong> "Lights come on but they're much dimmer than
              normal"
            </p>
            <p>
              <strong>Your observation:</strong> All lights on circuit affected equally
            </p>
            <p>
              <strong>Likely fault:</strong> High resistance in neutral or live conductor
            </p>
            <p>
              <strong>Test approach:</strong> Line and neutral continuity tests with 200mA
            </p>
            <p>
              <strong>Common cause:</strong> Loose neutral connection in consumer unit or junction
              box
            </p>
          </ConceptBlock>

          {/* Where NET Typically Places Faults */}
          <ConceptBlock title="5. Where NET Typically Places Faults">
            <p>
              <strong className="text-elec-yellow">Most Common Locations:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Junction boxes:</strong> Easy assessor access, realistic
              </li>
              <li>
                <strong>Socket outlets:</strong> Terminal connections visible
              </li>
              <li>
                <strong>Light fittings:</strong> Switch and rose connections
              </li>
              <li>
                <strong>Consumer unit:</strong> MCB and neutral bar connections
              </li>
              <li>
                <strong>Cooker outlets:</strong> High current connections
              </li>
              <li>
                <strong>Motor controls:</strong> Stop/start and overload settings
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={quickCheckQuestions[2].id}
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />

          <RegsCallout
            source="BS 7671 — Regulation 134.1.1"
            clause="Good workmanship by competent persons or persons under their proper supervision and proper materials shall be used in the erection of an electrical installation."
            meaning={
              <>
                High-resistance joints, loose terminations, missing CPCs at sockets — these are
                workmanship faults. The assessor sets them deliberately because they're the most
                common real-world cause of trouble. When you state your rectification, frame it as
                workmanship: "remake termination", "tighten CPC into earth bar". That's the language
                BS 7671 Reg 134 expects.
              </>
            }
            cite="Reference: BS 7671 Part 1 — Fundamental principles, Reg 134.1.1"
          />

          {/* What Assessors Look For */}
          <ConceptBlock title="6. What Assessors Look For">
            <p>
              <strong className="text-elec-yellow">What Assessors Want to See:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Systematic testing sequence - no random checking</li>
              <li>Clear explanation of each test and its purpose</li>
              <li>Proper isolation procedures before all testing</li>
              <li>Accurate documentation of all findings</li>
            </ul>

            <p>
              <strong className="text-elec-yellow">Professional Qualities Demonstrated:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Methodical diagnosis under assessment pressure</li>
              <li>Safety prioritised throughout testing</li>
              <li>Clear communication of technical findings</li>
              <li>Logical reasoning from test results</li>
            </ul>
          </ConceptBlock>

          {/* Professional Testing Techniques */}
          <ConceptBlock title="7. Professional Testing Techniques">
            <p>
              <strong className="text-elec-yellow">
                Test Equipment Mastery — Continuity Testing:
              </strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Use 200mA test current for accurate results</li>
              <li>Always null test leads first</li>
              <li>Test from origin to each point individually</li>
              <li>Record actual Ohm readings, not just pass/fail</li>
            </ul>

            <p>
              <strong className="text-elec-yellow">Test Equipment Mastery — Safe Isolation:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Test-Prove-Test sequence essential</li>
              <li>Two-pole voltage testing L-N and L-E</li>
              <li>GS38 compliant test probes</li>
              <li>Lock-off isolation points when possible</li>
            </ul>

            <p>
              <strong className="text-elec-yellow">Industry-Standard Approach:</strong>
            </p>
            <p>
              Professional electricians follow this systematic sequence for any fault-finding
              scenario:
            </p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Visual inspection</strong> - Check obvious issues first (finds 70% of
                faults)
              </li>
              <li>
                <strong>Safe isolation</strong> - Proper isolation and proving procedures
              </li>
              <li>
                <strong>Dead testing</strong> - Continuity and insulation resistance
              </li>
              <li>
                <strong>Live testing</strong> - Only when circuits proven safe
              </li>
              <li>
                <strong>Documentation</strong> - Record results as you test
              </li>
            </ol>
          </ConceptBlock>

          <FAQ
            items={[
              {
                question: 'How many faults will be set on AM2 day?',
                answer:
                  "Typically 2. They're built into the rig before you start and you've usually got around 1.5–2 hours to find them, prove them, and state rectification. The assessor's not looking for speed — they're looking for safety and method.",
              },
              {
                question: "What if I can't find the fault?",
                answer:
                  "Don't panic. Stay systematic — half-split continuity from the CU outward, IR L-N and L-E if there's any sign of trip activity. Even if you don't pin it down exactly, marks come from showing a logical sequence. Random poking gets you nothing.",
              },
              {
                question: "What if I find a fault that wasn't deliberately set?",
                answer:
                  "Stop and tell the assessor. Never assume every fault is part of the test. Real safety hazards (damaged insulation, exposed conductor, broken CPC) need flagging — that's part of being a competent electrician, not just a candidate.",
              },
              {
                question: 'How do I tell a short from an earth fault?',
                answer:
                  "Insulation resistance test will show you. Short circuit (L-N) reads near 0 MΩ between line and neutral. Earth fault reads low between line/neutral and earth. If you only test L-N you'll miss the earth fault entirely — so do all three combinations.",
              },
              {
                question: 'Do I need to physically rectify the fault?',
                answer:
                  "No — AM2 fault diagnosis is diagnose + state rectification + state re-test. You don't actually swap the accessory or remake the joint. You describe what you'd do and what test would prove it safe afterwards.",
              },
              {
                question: "What's the most common AM2 fault?",
                answer:
                  'Open circuits at junction boxes, sockets or roses — usually a loose conductor or CPC missing from the earth terminal. Easy for assessors to set, realistic, and a great test of whether you know your half-split method.',
              },
            ]}
          />

          <KeyTakeaways
            points={[
              'Two faults on the day. Roughly 1.5–2 hours. Prove dead, test logically, state type + location + rectification.',
              'Match the test to the symptom: dead circuit → continuity. MCB tripping → IR. RCD tripping → IR L-E and N-E. Sluggish circuit → Zs.',
              'Open circuits at terminations are the most common AM2 fault — half-split continuity from the CU outward finds them.',
              'Workmanship faults (loose joints, missing CPCs) are deliberate — frame your rectification in BS 7671 Reg 134 language.',
              'If you suspect a real (non-deliberate) safety issue, stop and tell the assessor. Ignoring it is worse than not finding the fault.',
              'Energising is the last step, only when you can confidently state what the fault was. Prove-test-prove every time.',
            ]}
          />

          {/* Quiz Section */}
          <Quiz title="Test Your Knowledge: AM2 Fault Types" questions={quizQuestions} />

          {/* Navigation Footer */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <Link
              to="/study-centre/apprentice/am2/module4/section6"
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Time Management
              </div>
            </Link>
            <Link
              to="/study-centre/apprentice/am2/module5/section2"
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Fault-Finding Techniques
              </div>
            </Link>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default AM2Module5Section1;
