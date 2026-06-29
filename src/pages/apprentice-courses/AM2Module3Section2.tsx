/**
 * Module 3 · Section 2 — Power circuits: ring, radial, cooker, motor
 * AM2 day-prep — AM2 Phase B (composite installation: cable, containment, circuits, terminations)
 * Wiring power circuits the assessor can prove — closed rings, correct radials and a clean motor connection.
 */

import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import ResistanceCalculator from '@/components/apprentice-courses/ResistanceCalculator';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  ConceptBlock,
  CommonMistake,
  LearningOutcomes,
  VideoCard,
  TLDR,
  RegsCallout,
  Scenario,
  KeyTakeaways,
  FAQ,
} from '@/components/study-centre/learning';
import { videos } from '@/data/study-centre/video-library';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Power Circuits — Ring, Radial, Cooker, Motor | AM2 Module 3.2 | Elec-Mate';
const DESCRIPTION =
  'Installing AM2 power circuits — closed ring finals, correctly sized radials, a cooker circuit and a motor control wired to spec.';

const AM2Module3Section2 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  const quickCheckQuestions: Array<{
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }> = [
    {
      id: 'ring-open-consequence',
      question: 'What happens if a ring final circuit is left open (one leg disconnected)?',
      options: [
        'It still works safely as designed',
        'The MCB will trip immediately',
        'It becomes an unprotected radial circuit',
        'Only half the sockets will work',
      ],
      correctIndex: 2,
      explanation:
        'An open ring becomes a radial circuit but is still protected by a 32A MCB, which exceeds the safe rating for 2.5mm² cable (20A max). This is a major safety issue and automatic fail.',
    },
    {
      id: 'cooker-workmanship',
      question: 'Why do many candidates lose marks on cooker circuits?',
      options: [
        'Using the wrong protective device rating',
        'Installing the outlet plate slightly off level',
        'Over-stripping cable sheath leaving bare conductors visible',
        'Routing the cable through the wrong containment',
      ],
      correctIndex: 2,
      explanation:
        'The most common error is over-stripping the cable sheath, leaving bare conductors visible at the outlet plate. The sheath must enter the accessory to maintain protection.',
    },
    {
      id: 'swa-gland-check',
      question: 'What does the assessor specifically check at an SWA gland?',
      options: [
        'Cable colour identification at the gland',
        'The bend radius of the cable at the gland',
        'Mechanical strength and earth continuity',
        'Voltage drop across the gland connection',
      ],
      correctIndex: 2,
      explanation:
        'The assessor checks both mechanical strength (proper gland tightening) and earth continuity through the SWA armour to ensure both physical and electrical protection.',
    },
    {
      id: 'safety-vs-neatness',
      question: 'In AM2 assessment, which is worse - messy work or unsafe work?',
      options: [
        'Messy work - it always results in an automatic fail',
        'Both lose equal marks under the marking scheme',
        'Neither affects the outcome of the assessment',
        'Unsafe work - messy loses marks, unsafe means fail',
      ],
      correctIndex: 3,
      explanation:
        "Unsafe work results in immediate failure regardless of other factors. Messy work loses marks but doesn't automatically fail the assessment. Safety is always the priority.",
    },
    {
      id: 'testing-requirement',
      question: 'Can you energise a power circuit before completing all required tests?',
      options: [
        'Yes, if continuity is confirmed',
        "No - that's unsafe and results in failure",
        'Only with assessor permission',
        'Yes, for basic function testing',
      ],
      correctIndex: 1,
      explanation:
        'All required tests (continuity, polarity, insulation resistance, loop impedance) must be completed before energisation. Energising untested circuits is unsafe practice and results in immediate failure.',
    },
  ];

  const quizQuestions = [
    {
      id: 1,
      question: 'What cable size is typically specified for a ring final circuit in AM2?',
      options: [
        '1.5mm²',
        '2.5mm²',
        '4mm²',
        '6mm²',
      ],
      correctAnswer: 1,
      explanation:
        'Ring final circuits typically use 2.5mm² twin & earth cable with a 32A MCB protection.',
    },
    {
      id: 2,
      question: "What's the consequence of leaving one leg disconnected in a ring final?",
      options: [
        'Sleeved and properly connected',
        'End-to-end continuity of all conductors',
        'It becomes an unprotected radial circuit',
        'To protect bare conductors from damage',
      ],
      correctAnswer: 2,
      explanation:
        'A disconnected ring becomes a radial circuit still protected by 32A, exceeding the 20A safe rating for 2.5mm² cable.',
    },
    {
      id: 3,
      question: 'Which protective device rating is typically used for a cooker circuit?',
      options: [
        '32A MCB',
        '20A MCB',
        '50A MCB',
        '32-40A MCB',
      ],
      correctAnswer: 3,
      explanation:
        'Cooker circuits typically use 32-40A MCB depending on the cooker load and cable size specified.',
    },
    {
      id: 4,
      question: 'Why must the cable sheath enter the cooker outlet plate?',
      options: [
        'To protect bare conductors from damage',
        'To prevent moisture entry',
        'For better appearance',
        'To meet cable bend radius requirements',
      ],
      correctAnswer: 0,
      explanation:
        'The sheath must enter the outlet plate to ensure no bare conductors are visible and maintain mechanical protection.',
    },
    {
      id: 5,
      question: 'What device must be correctly set in a motor circuit?',
      options: [
        'Contactor',
        'Overload protection',
        'Phase monitor',
        'Timer relay',
      ],
      correctAnswer: 1,
      explanation:
        "The overload protection device must be set correctly for the motor's full load current to provide proper protection.",
    },
    {
      id: 6,
      question: "What's the purpose of a banjo washer in SWA glanding?",
      options: [
        'Weatherproofing',
        'Cable strain relief',
        'Earth continuity connection',
        'Cable identification',
      ],
      correctAnswer: 2,
      explanation:
        'The banjo washer provides earth continuity between the SWA armour and the equipment earth terminal.',
    },
    {
      id: 7,
      question: 'True or false: You must calculate cable sizes in AM2.',
      options: ['True', 'False'],
      correctAnswer: 1,
      explanation:
        'False. In AM2, you follow the specification exactly as given - no calculations are required or expected.',
    },
    {
      id: 8,
      question: "What's the difference between a radial and a broken ring?",
      options: [
        'Radial is designed as one-way feed, broken ring is faulty two-way feed',
        'A radial uses larger cable than a broken ring',
        'A broken ring is protected by a 20A device, a radial by 32A',
        'There is no practical difference between the two',
      ],
      correctAnswer: 0,
      explanation:
        'A radial is designed as a one-way feed with appropriate protection. A broken ring is a fault condition where a two-way circuit becomes one-way but retains inappropriate protection.',
    },
    {
      id: 9,
      question: 'Give an example of poor workmanship in power circuits.',
      options: [
        'Leaving a small loop of slack cable at each accessory',
        'Over-tightening terminals damaging insulation',
        'Sleeving the CPC with green/yellow at terminations',
        'Routing cables along the shortest available path',
      ],
      correctAnswer: 1,
      explanation:
        'Over-tightening terminals can damage cable insulation, creating safety hazards and demonstrating poor workmanship.',
    },
    {
      id: 10,
      question: 'What happens if you energise before completing all required tests?',
      options: [
        'A minor mark deduction for poor sequencing',
        'No issue provided the circuit functions correctly',
        'Immediate failure for unsafe practice',
        'A warning, as long as the tests are done afterwards',
      ],
      correctAnswer: 2,
      explanation:
        'Energising circuits before completing all required tests is unsafe practice and results in immediate failure.',
    },
    {
      id: 11,
      question: 'Which test confirms ring circuit integrity?',
      options: [
        'Insulation resistance between all conductors',
        'Polarity verification at every socket outlet',
        'Earth fault loop impedance at the consumer unit',
        'End-to-end continuity of all conductors',
      ],
      correctAnswer: 3,
      explanation:
        'End-to-end continuity testing of line, neutral, and CPC conductors confirms the ring is complete and unbroken.',
    },
    {
      id: 12,
      question: 'What must be done to CPCs in all power circuits?',
      options: [
        'Sleeved with green/yellow and properly connected',
        'Left bare but connected at every terminal',
        'Connected only at the consumer unit end',
        'Insulated with red sleeving at terminations',
      ],
      correctAnswer: 0,
      explanation:
        'All CPCs must be sleeved with green/yellow sleeving and properly connected to maintain earth continuity and meet standards.',
    },
  ];

  const learningOutcomes = [
    'Install ring, radial, cooker, and motor circuits as per AM2 drawings and specifications',
    'Terminate cables neatly, with CPCs correctly sleeved and connected',
    'Carry out required tests before energisation according to NET standards',
    'Recognise common candidate errors in each type of circuit',
    'Apply strategies to work efficiently under time pressure without sacrificing safety',
    'Understand what the assessor is checking for in each circuit type',
  ];

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/am2/module3')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 3
          </button>

          <PageHero
            eyebrow="Module 3 · Section 2"
            title="Power Circuits - Ring, Radial, Cooker, Motor"
            description="Master power circuit installation for AM2 assessment - ring finals, radials, cooker circuits, and motor controls with professional workmanship standards."
            tone="yellow"
          />

          <TLDR
            points={[
              'On AM2 day you wire a 2.5 mm² ring on a 32 A MCB, plus radials, a cooker outlet and a motor — all to the spec, all tested before energising.',
              'A broken ring is the single most common power-circuit fail: prove it with the 3-step continuity test (r1 + rn, then r1 + r2) before you sign it off.',
              "Cooker circuits live or die on sheath into the outlet plate — over-strip and bare conductors show, that's marks gone.",
              'Motor circuits = SWA gland tight, banjo washer fitted for armour earthing, overload set to motor FLC. The assessor checks all three.',
              'No energising before continuity, IR, polarity and Zs are recorded. Energising untested = automatic fail.',
            ]}
          />

          <CommonMistake
            title="Critical Assessment Area"
            whatHappens="Power circuits are where most AM2 candidates lose marks or fail. You must demonstrate not just technical knowledge but competent, safe, and workmanlike installation. The assessor watches for accuracy to specification, safe practices, and professional workmanship. Incorrect cable selection, incomplete testing, or poor workmanship will result in failure."
            doInstead="Treat each circuit type below as a non-negotiable checklist — accuracy, safety and workmanship together, not one without the others."
          />

          <LearningOutcomes outcomes={learningOutcomes} />

          {/* Ring Final Circuit Wiring Topology Diagram */}
          <div className="my-8 flex justify-center">
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 w-full max-w-2xl">
              <svg
                viewBox="0 0 450 300"
                className="w-full h-auto"
                role="img"
                aria-label="Ring final circuit wiring topology diagram showing a consumer unit with a ring loop through socket outlets with line, neutral and CPC conductors"
              >
                <text
                  x="225"
                  y="22"
                  textAnchor="middle"
                  fill="#F3F4F6"
                  fontSize="15"
                  fontFamily="system-ui, sans-serif"
                  fontWeight="bold"
                >
                  Ring Final Circuit Topology
                </text>
                <rect
                  x="10"
                  y="70"
                  width="70"
                  height="140"
                  rx="6"
                  fill="#374151"
                  stroke="#9CA3AF"
                  strokeWidth="2"
                />
                <text
                  x="45"
                  y="95"
                  textAnchor="middle"
                  fill="#F3F4F6"
                  fontSize="11"
                  fontFamily="system-ui, sans-serif"
                  fontWeight="bold"
                >
                  Consumer
                </text>
                <text
                  x="45"
                  y="110"
                  textAnchor="middle"
                  fill="#F3F4F6"
                  fontSize="11"
                  fontFamily="system-ui, sans-serif"
                  fontWeight="bold"
                >
                  Unit
                </text>
                <text
                  x="45"
                  y="132"
                  textAnchor="middle"
                  fill="#9CA3AF"
                  fontSize="9"
                  fontFamily="system-ui, sans-serif"
                >
                  32A MCB
                </text>
                <circle cx="80" cy="100" r="4" fill="#8B6914" />
                <circle cx="80" cy="115" r="4" fill="#2563EB" />
                <circle cx="80" cy="130" r="4" fill="#22C55E" />
                <circle cx="80" cy="160" r="4" fill="#8B6914" />
                <circle cx="80" cy="175" r="4" fill="#2563EB" />
                <circle cx="80" cy="190" r="4" fill="#22C55E" />
                <rect
                  x="150"
                  y="50"
                  width="60"
                  height="40"
                  rx="4"
                  fill="#1F2937"
                  stroke="#9CA3AF"
                  strokeWidth="1.5"
                />
                <text
                  x="180"
                  y="75"
                  textAnchor="middle"
                  fill="#F3F4F6"
                  fontSize="9"
                  fontFamily="system-ui, sans-serif"
                >
                  Socket 1
                </text>
                <rect
                  x="260"
                  y="50"
                  width="60"
                  height="40"
                  rx="4"
                  fill="#1F2937"
                  stroke="#9CA3AF"
                  strokeWidth="1.5"
                />
                <text
                  x="290"
                  y="75"
                  textAnchor="middle"
                  fill="#F3F4F6"
                  fontSize="9"
                  fontFamily="system-ui, sans-serif"
                >
                  Socket 2
                </text>
                <rect
                  x="370"
                  y="110"
                  width="60"
                  height="40"
                  rx="4"
                  fill="#1F2937"
                  stroke="#9CA3AF"
                  strokeWidth="1.5"
                />
                <text
                  x="400"
                  y="135"
                  textAnchor="middle"
                  fill="#F3F4F6"
                  fontSize="9"
                  fontFamily="system-ui, sans-serif"
                >
                  Socket 3
                </text>
                <rect
                  x="260"
                  y="190"
                  width="60"
                  height="40"
                  rx="4"
                  fill="#1F2937"
                  stroke="#9CA3AF"
                  strokeWidth="1.5"
                />
                <text
                  x="290"
                  y="215"
                  textAnchor="middle"
                  fill="#F3F4F6"
                  fontSize="9"
                  fontFamily="system-ui, sans-serif"
                >
                  Socket 4
                </text>
                <path d="M 84 100 L 150 70" stroke="#8B6914" strokeWidth="2.5" fill="none" />
                <path d="M 210 70 L 260 70" stroke="#8B6914" strokeWidth="2.5" fill="none" />
                <path d="M 320 70 L 400 110" stroke="#8B6914" strokeWidth="2.5" fill="none" />
                <path d="M 84 115 L 150 77" stroke="#2563EB" strokeWidth="2.5" fill="none" />
                <path d="M 210 77 L 260 77" stroke="#2563EB" strokeWidth="2.5" fill="none" />
                <path d="M 320 77 L 400 118" stroke="#2563EB" strokeWidth="2.5" fill="none" />
                <path
                  d="M 84 130 L 150 84"
                  stroke="#22C55E"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="6,3"
                />
                <path
                  d="M 210 84 L 260 84"
                  stroke="#22C55E"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="6,3"
                />
                <path
                  d="M 320 84 L 400 126"
                  stroke="#22C55E"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="6,3"
                />
                <path d="M 84 160 L 150 200" stroke="#8B6914" strokeWidth="2.5" fill="none" />
                <path d="M 210 200 L 260 200" stroke="#8B6914" strokeWidth="2.5" fill="none" />
                <path d="M 320 200 L 400 150" stroke="#8B6914" strokeWidth="2.5" fill="none" />
                <path d="M 84 175 L 150 207" stroke="#2563EB" strokeWidth="2.5" fill="none" />
                <path d="M 210 207 L 260 207" stroke="#2563EB" strokeWidth="2.5" fill="none" />
                <path d="M 320 207 L 400 142" stroke="#2563EB" strokeWidth="2.5" fill="none" />
                <path
                  d="M 84 190 L 150 214"
                  stroke="#22C55E"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="6,3"
                />
                <path
                  d="M 210 214 L 260 214"
                  stroke="#22C55E"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="6,3"
                />
                <path
                  d="M 320 214 L 400 148"
                  stroke="#22C55E"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="6,3"
                />
                <rect
                  x="80"
                  y="252"
                  width="290"
                  height="36"
                  rx="6"
                  fill="#1F2937"
                  stroke="#374151"
                  strokeWidth="1"
                />
                <line x1="100" y1="270" x2="130" y2="270" stroke="#8B6914" strokeWidth="2.5" />
                <text
                  x="135"
                  y="274"
                  fill="#F3F4F6"
                  fontSize="10"
                  fontFamily="system-ui, sans-serif"
                >
                  Line (L)
                </text>
                <line x1="185" y1="270" x2="215" y2="270" stroke="#2563EB" strokeWidth="2.5" />
                <text
                  x="220"
                  y="274"
                  fill="#F3F4F6"
                  fontSize="10"
                  fontFamily="system-ui, sans-serif"
                >
                  Neutral (N)
                </text>
                <line
                  x1="290"
                  y1="270"
                  x2="320"
                  y2="270"
                  stroke="#22C55E"
                  strokeWidth="2"
                  strokeDasharray="6,3"
                />
                <text
                  x="325"
                  y="274"
                  fill="#F3F4F6"
                  fontSize="10"
                  fontFamily="system-ui, sans-serif"
                >
                  CPC
                </text>
                <text
                  x="225"
                  y="298"
                  textAnchor="middle"
                  fill="#9CA3AF"
                  fontSize="10"
                  fontFamily="system-ui, sans-serif"
                >
                  Complete loop -- both ends must return to origin
                </text>
              </svg>
            </div>
          </div>

          <ConceptBlock title="1. Ring Final Circuit">
            <p>
              <strong>Typical Specification.</strong> 2.5mm² twin & earth cable, 32A MCB protection.
              Must form a complete closed loop.
            </p>
            <p>
              <strong>Critical Testing Requirements:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>End-to-end continuity (Line, Neutral, CPC)</li>
              <li>Cross connections for r1 + rn and r1 + r2</li>
              <li>Polarity checks at all outlets</li>
              <li>Insulation resistance between conductors</li>
            </ul>
            <p>
              <strong>Assessor Focus Points:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Ring continuity completely intact</li>
              <li>All terminations correct and secure</li>
              <li>CPCs sleeved with green/yellow and properly connected</li>
              <li>Socket outlets installed level and to drawing heights</li>
              <li>No "broken ring" scenarios</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <div className="my-6">
            <VideoCard
              url={videos.ringFinalTest.url}
              title={videos.ringFinalTest.title}
              channel={videos.ringFinalTest.channel}
              duration={videos.ringFinalTest.duration}
              topic="Ring final wiring + 3-step continuity test on AM2"
              caption={
                <>
                  On AM2 day you wire a 2.5 mm² ring final on a 32 A MCB and then prove it with the
                  3-step continuity test. Craig walks through the cross-connection method that
                  catches a broken ring — the most common reason candidates lose marks on the power
                  circuit.
                </>
              }
            />
          </div>

          <div className="my-6">
            <h3 className="text-ios-headline font-semibold text-elec-yellow mb-3">
              Try the calculator — predict r1 + r2 on your ring final
            </h3>
            <p className="text-xs sm:text-sm text-white/80 mb-3">
              Use R = ρL/A to predict the cold conductor resistance per leg of a 2.5 mm² ring final
              before you measure. Enter the route length of one leg and 2.5 mm² CSA — the result is
              what you'd expect to read on r1 (line) or rn (neutral) end-to-end. r1 + r2 will be the
              line + CPC pair (1.5 mm² CPC in T&E, so r2 is roughly 1.67× r1).
            </p>
            <ResistanceCalculator />
          </div>

          <ConceptBlock title="2. Radial Circuit">
            <p>
              <strong>Typical Specifications:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>2.5mm² on 20A MCB for standard loads</li>
              <li>4mm² on 32A MCB for higher loads</li>
              <li>Simple end-to-end wiring, no loop back to origin</li>
            </ul>
            <p>
              <strong>Assessor Focus Points:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Correct cable size as specified on drawings</li>
              <li>Neat terminations at final point</li>
              <li>Protective device rating matches specification</li>
              <li>No exposed copper or over-stripped insulation</li>
              <li>Clear marking where radial terminates</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="3. Cooker Circuit">
            <p>
              <strong>Typical Specification.</strong> 6mm² twin & earth cable, 32-40A MCB, connected
              through cooker control unit and outlet plate.
            </p>
            <p>
              <strong>Assessor Focus Points:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Correct cable size as per specification</li>
              <li>Secure terminations (large conductors need proper clamping)</li>
              <li>Cable sheath enters accessory - no bare conductors visible</li>
              <li>CPC properly sleeved and connected</li>
              <li>Control unit and outlet plate correctly wired</li>
            </ul>
            <p>
              <strong className="text-elec-yellow">Common Error:</strong> Over-stripping cable
              sheath leaving bare conductors visible at outlet plate. This is the most frequent
              reason for losing marks on cooker circuits.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 411.3.3"
            clause={
              <>
                "Additional protection by an RCD with a rated residual operating current not
                exceeding 30 mA shall be provided for socket-outlets with a rated current not
                exceeding 32 A. An exception to omit RCD protection is permitted where, other than
                for a dwelling, a documented risk assessment determines that RCD protection is not
                necessary."
              </>
            }
            meaning={
              <>
                On the AM2 rig your ring final and your radials feed sockets — every one of those
                sockets needs 30 mA RCD protection at the DB. If the spec gives you an RCBO per
                circuit, fit RCBOs. If it's a split-board with an RCD covering the socket side, the
                socket circuits go on the RCD side. Sockets on a non-RCD-protected MCB is an
                automatic fail.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 411.3.3."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 552.1.1"
            clause={
              <>
                "All equipment, including cable, of every circuit carrying the starting,
                accelerating and load currents of a motor shall be suitable for a current at least
                equal to the full-load current rating of the motor when rated in accordance with the
                appropriate British or Harmonized Standard."
              </>
            }
            meaning={
              <>
                The motor circuit on AM2 has to handle starting current, not just running current.
                Check the motor nameplate FLC — that's the figure your overload sits on. Cable size
                and protective device rating both have to cover it. If the spec gives you 2.5 mm² SY
                or 4 mm² SWA, install that and set the overload to the FLC stamped on the motor —
                not a guess.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 552.1.1."
          />

          <ConceptBlock title="4. Motor Circuit">
            <p>
              <strong>Typical Configuration.</strong> Usually wired in SWA or flex, feeding a DOL
              (Direct-On-Line) starter. May include start/stop control circuit.
            </p>
            <p>
              <strong>Assessor Focus Points:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Correct SWA gland termination with earth continuity</li>
              <li>Proper polarity at starter and motor terminals</li>
              <li>Overload protection device set appropriately for motor FLC</li>
              <li>Start/stop controls wired correctly and functional</li>
              <li>Banjo washer fitted for earth continuity</li>
              <li>Cable gland mechanically secure</li>
            </ul>
            <p>
              <strong className="text-elec-yellow">Professional Tip:</strong> Practice SWA glanding
              until it's second nature. Use a checklist: gland tight, banjo fitted, earth
              continuous, cable strain relief adequate.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <ConceptBlock title="5. General Assessor Expectations (All Power Circuits)">
            <p>
              <strong>Technical Requirements:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Specification compliance:</strong> Cable sizes, routes, protective devices
                exactly as shown
              </li>
              <li>
                <strong>Safety:</strong> CPC sleeved and connected, no exposed copper
              </li>
              <li>
                <strong>Testing:</strong> All tests completed before energisation
              </li>
            </ul>
            <p>
              <strong>Workmanship Standards:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Installation quality:</strong> Straight runs, level accessories, neat
                terminations
              </li>
              <li>
                <strong>Professional finish:</strong> Conduits/trunking aligned, cables not twisted
              </li>
              <li>
                <strong>Protection integrity:</strong> No damage to cable insulation
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="6. Common Candidate Errors (NET Guidance)">
            <p>
              <strong className="text-elec-yellow">Critical Errors (Fail):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Wrong cable size installed</li>
              <li>Ring finals left open (broken)</li>
              <li>CPC unsleeved or not terminated</li>
              <li>Energising before testing complete</li>
            </ul>
            <p>
              <strong className="text-elec-yellow">Workmanship Issues (Marks Lost):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Cooker cable sheath not fully enclosed</li>
              <li>Poor SWA glanding technique</li>
              <li>Over-tightened terminals damaging insulation</li>
              <li>Motor overload not set correctly</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <ConceptBlock title="7. Practical Guidance">
            <p>
              <strong>Time Management Strategies:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Ring circuits:</strong> Lay out both ends before terminating to ensure
                continuity
              </li>
              <li>
                <strong>Radials:</strong> Mark clearly where the circuit ends to avoid confusion
              </li>
              <li>
                <strong>Cooker circuits:</strong> Pre-shape large cables before termination
              </li>
              <li>
                <strong>Motors:</strong> Have SWA glanding checklist ready
              </li>
            </ul>
            <p>
              <strong>Professional Techniques:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Record test results as you perform them - don't leave until the end</li>
              <li>Treat every installation as show home quality</li>
              <li>Double-check ring continuity before final termination</li>
              <li>Use appropriate tools for large cable termination</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="8. Real-World Examples">
            <p>
              <strong className="text-elec-yellow">Example 1: Ring Final Failure.</strong> Candidate
              installed ring final but left one leg disconnected in consumer unit. Failed continuity
              test - section fail. Always verify complete loop before termination.
            </p>
            <p>
              <strong className="text-elec-yellow">Example 2: Cooker Circuit Workmanship.</strong>{' '}
              Cooker circuit wired with sheath stripped back too far. Exposed cable insulation
              visible at outlet plate = significant marks lost for poor workmanship.
            </p>
            <p>
              <strong className="text-elec-yellow">Example 3: Motor Circuit Incomplete.</strong>{' '}
              Motor circuit wired correctly but overload protection not set for motor FLC. Assessor
              flagged incomplete installation - lost marks for attention to detail.
            </p>
            <p>
              <strong className="text-elec-yellow">Example 4: Terminal Damage.</strong> Candidate
              over-tightened terminals on 6mm² cooker cable, crushing insulation. Lost significant
              workmanship marks for poor technique.
            </p>
          </ConceptBlock>

          <ConceptBlock title="9. Frequently Asked Questions">
            <p>
              <strong>Q1: Do I need to calculate cable sizes in AM2?</strong> No - follow the AM2
              specification exactly as provided. No calculations are required or expected.
            </p>
            <p>
              <strong>Q2: Will the assessor open socket outlets and accessories?</strong> Yes -
              expect sample inspections of terminations, so ensure all connections are neat and
              secure.
            </p>
            <p>
              <strong>Q3: Can I energise a circuit before completing all tests?</strong> No - that's
              unsafe practice and results in immediate failure. All tests must be completed first.
            </p>
            <p>
              <strong>Q4: What if I accidentally damage cable insulation?</strong> Replace the cable
              section - tape repairs are not acceptable and will result in failure.
            </p>
            <p>
              <strong>Q5: How important is neatness compared to correctness?</strong> Both matter
              significantly: correctness is essential for safety, neatness is heavily marked for
              professionalism.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[4]} />

          <ConceptBlock title="10. Summary">
            <p>
              In AM2, power circuits must be installed to specification, neatly, and safely.
              Assessors check:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Technical accuracy:</strong> Ring continuity, correct radial wiring, proper
                cooker cable termination
              </li>
              <li>
                <strong>Motor circuits:</strong> Overloads set correctly, SWA glanded properly with
                earth continuity
              </li>
              <li>
                <strong>Professional standards:</strong> CPCs sleeved, terminations secure,
                accessories level
              </li>
              <li>
                <strong>Safety compliance:</strong> No unsafe shortcuts, circuits tested fully
                before energisation
              </li>
            </ul>
            <p>
              <strong className="text-elec-yellow">Remember:</strong> Unsafe = Fail | Untidy = Marks
              Lost | Accurate + Neat + Safe = Pass
            </p>
          </ConceptBlock>

          <Scenario
            title="Ring continuity won't read end-to-end on the line conductor"
            situation={
              <>
                You've wired the 2.5 mm² ring final, four sockets and back to the 32 A MCB. You
                cross-connect L (in) to L (out) at the DB and walk to the furthest socket with the
                low-resistance ohmmeter. Reading: open circuit. Neutral and CPC end-to-end both read
                fine — about 0.5 Ω each.
              </>
            }
            whatToDo={
              <>
                One of the line conductors is loose at a socket terminal. Don't rewire the ring —
                isolate, take the lid off the consumer unit, leave the cross-connection in, then
                walk back through every socket in turn looking for the line termination that's
                pulled out or under-tightened. Most likely it's the last one you wired in a hurry.
                Re-terminate, retest end-to-end, then do r1+rn and r1+r2 cross-connections.
              </>
            }
            whyItMatters={
              <>
                A "broken" ring on AM2 isn't just a workmanship problem — left undetected and
                energised, the circuit becomes an unprotected radial on a 32 A MCB feeding 2.5 mm²
                cable rated 20 A. That's a section fail. The 3-step ring test exists exactly to
                catch this before energising.
              </>
            }
          />

          <FAQ
            title="More common questions"
            items={[
              {
                question: 'Why is the cooker circuit normally 6 mm² when 4 mm² would carry 32 A?',
                answer:
                  "Voltage drop and inrush. Cookers and ovens pull near-rated load for sustained periods, and the AM2 spec usually wants headroom for derating across long runs through containment. Install whatever the spec says — if it's 6 mm² T&E on a 32 A MCB, that's what you fit. Don't substitute 4 mm² because the calc \"works\".",
              },
              {
                question: "What's the difference between an SWA gland and a flex gland?",
                answer:
                  "SWA glands clamp the steel armour and provide an electrical earthing path through the gland body and banjo washer to the equipment earth terminal. Flex glands just provide strain relief and a cable seal — no earthing function. On AM2, SWA into a motor isolator means: gland body grounded, banjo fitted, separate earth tail from banjo to the earth terminal in the enclosure. Get one wrong and the armour isn't earthed.",
              },
              {
                question: 'How do I prove polarity on a ring final?',
                answer:
                  "Step 1: continuity at the DB confirms the ring is closed. Step 2: insulation resistance proves L–N, L–E, N–E are sound. Step 3: at every socket, dead-test L to MCB terminal — should read low. Step 4: live polarity check at every socket once energised, using a socket tester or proving unit. If any socket shows reverse polarity, you've crossed L and N somewhere — find it before signing off.",
              },
              {
                question: 'Do I need to set the motor overload on AM2 or is it pre-set?',
                answer:
                  'You set it. The motor has an FLC stamped on the nameplate (e.g. 4.2 A). Open the starter, find the overload\'s amp-setting dial, and set it to the FLC. Assessors will lift the lid and check. A starter with the overload sitting at the factory default of "max" or "min" is an incomplete installation — even if the motor runs.',
              },
              {
                question:
                  "Can I use a junction box on the cooker run if it won't reach in one piece?",
                answer:
                  "Only if Reg 526.5 is satisfied — i.e. it's an accessible, suitable accessory or enclosure complying with the appropriate product standard. A maintenance-free junction box (BS 5733, marked) is fine. A bare connector block in a void is a fail. On AM2, ideally run the cable in one piece from DB to outlet — fewer joints, fewer marks lost. If a joint is unavoidable, use the right enclosure and locate it accessibly.",
              },
              {
                question: "What's the most efficient order to wire the four power circuits?",
                answer:
                  "Containment first (everything), then pull cables in route order, then terminate accessories outwards from the DB. Terminate the DB last — by then your cables are dressed, identified, and you can do them all in one neat pass. Wiring DB-first usually means messy cable dressing later because you can't see what's coming back. Test as you complete each circuit, not all at the end.",
              },
            ]}
          />

          <KeyTakeaways
            points={[
              'Install to spec exactly: 2.5 mm² ring on 32 A, radial sizes per drawing, cooker per spec, motor per nameplate FLC.',
              'Ring continuity is the killer — prove it with the 3-step test (end-to-end L/N/CPC, then r1+rn and r1+r2) before signing off.',
              'Sheath enters every accessory. No bare conductors visible. CPC sleeved with green/yellow at every termination.',
              'Reg 411.3.3 — sockets ≤32 A need 30 mA RCD additional protection. Reg 552.1.1 — motor circuit equipment rated for FLC.',
              'SWA termination = gland tight, banjo washer fitted, separate earth tail, mechanical strain relief proven.',
              'No energising until continuity, IR, polarity and Zs are tested AND recorded. Energising untested is an automatic fail.',
            ]}
          />

          <Quiz questions={quizQuestions} title="Power Circuits Assessment Quiz" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/am2/module3/section1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Cable Selection & Containment
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/am2/module3/section3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Lighting Circuits
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default AM2Module3Section2;
