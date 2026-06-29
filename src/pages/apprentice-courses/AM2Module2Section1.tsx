/**
 * Module 2 · Section 1 — Safe isolation procedures
 * AM2 day-prep — AM2 Phase A (H&S, safe isolation, RAMS, paperwork)
 * The single most-failed step on the AM2: prove dead, lock off, prove again — done right, every time.
 */

import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { VideoCard } from '@/components/study-centre/learning';
import { videos } from '@/data/study-centre/video-library';
import useSEO from '@/hooks/useSEO';
import { useNavigate } from 'react-router-dom';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  ConceptBlock,
  SectionRule,
  LearningOutcomes,
  TLDR,
  KeyTakeaways,
  FAQ,
  Scenario,
  CommonMistake,
  RegsCallout,
} from '@/components/study-centre/learning';

const TITLE = 'Safe Isolation Procedures | AM2 Module 2.1 | Elec-Mate';
const DESCRIPTION =
  'The single biggest cause of AM2 failure — get safe isolation locked in: prove the tester, isolate, lock off, prove dead, re-prove.';

const AM2Module2Section1 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  const safeIsolationSteps = [
    'Identify the correct circuit using drawings/spec',
    'Inform anyone affected that the circuit will be isolated',
    'Switch off the circuit at the isolator',
    'Lock off using a lock and retain the key',
    'Attach a warning notice to the device',
    'Prove your tester on a known live source',
    'Test the circuit (L-N, L-E, N-E, and combinations at all points)',
    'Re-prove your tester on the known live source',
    'Confirm the circuit is dead and safe to work on',
    'Keep lock/key under your control until the job is finished',
  ];

  const tenPointTests = [
    'L-N at origin',
    'L-E at origin',
    'L-N at point of work',
    'L-E at point of work',
    'N-E at origin',
    'N-E at point of work',
  ];

  const criticalFails = [
    'Not proving tester before AND after',
    'Missing part of the 10-point test',
    'Testing at the wrong switch position',
    'Isolating the wrong circuit',
    'Not fitting lock-off or not attaching warning notice',
    'Leaving key unsecured',
  ];

  const equipmentRequired = [
    'Multi-function tester (MFT) or voltage indicator',
    'Lock-off devices (padlocks with unique keys)',
    'Warning notices (electrical isolation labels)',
    'Known live source for proving tester',
    'Circuit drawings and specifications',
    'Personal protective equipment (PPE)',
    'Test leads and probes (appropriate rating)',
    'Documentation forms/sheets',
  ];

  const preIsolationChecklist = [
    'Confirm work scope and circuits involved',
    'Identify all isolation points required',
    'Check drawings match actual installation',
    'Ensure correct PPE is available',
    'Test equipment is in calibration',
    'Warning notices and locks available',
    'Communication plan with affected parties',
    'Emergency contact details accessible',
  ];

  const practiceScenarios = [
    {
      title: 'Lighting Circuit Isolation',
      description: 'Isolate a lighting circuit for lamp replacement in an office building',
      keyPoints: [
        'Multiple switches involved',
        'Emergency lighting considerations',
        'Occupied premises',
      ],
    },
    {
      title: 'Socket Circuit for Installation',
      description: 'Safe isolation for adding additional sockets to existing ring main',
      keyPoints: ['Ring continuity checks', 'Multiple isolation points', 'Shared neutrals'],
    },
    {
      title: 'Three-Phase Motor Circuit',
      description: 'Isolate motor supply for maintenance work',
      keyPoints: ['Phase rotation', 'Star-delta considerations', 'High current switching'],
    },
  ];

  const quizQuestions = [
    {
      id: 1,
      question: 'Which UK regulation underpins the requirement for safe isolation?',
      options: [
        'CDM Regulations 2015',
        'Electricity at Work Regulations 1989',
        'Building Regulations 2010',
        'Health and Safety at Work Act 1974',
      ],
      correctAnswer: 1,
      explanation:
        'The Electricity at Work Regulations 1989 specifically require safe isolation procedures to be followed when working on electrical systems.',
    },
    {
      id: 2,
      question: "What's the very first step in safe isolation?",
      options: [
        'Prove your tester on a known live source',
        'Switch off the circuit at the isolator',
        'Identify the correct circuit using drawings/spec',
        'Attach a warning notice to the device',
      ],
      correctAnswer: 2,
      explanation:
        'You must first identify the correct circuit using drawings and specifications before taking any other action.',
    },
    {
      id: 3,
      question: 'Why must you inform others before isolating?',
      options: [
        'To check the circuit drawings are up to date',
        'To confirm the supply can be re-energised later',
        'To satisfy the lock-off labelling requirements',
        'To prevent accidental re-energisation and ensure safety',
      ],
      correctAnswer: 3,
      explanation:
        "Informing others prevents accidental re-energisation and ensures everyone's safety by making them aware of the work being carried out.",
    },
    {
      id: 4,
      question: 'What two things must you do after switching off at the isolator?',
      options: [
        'Lock off and attach warning notice',
        'Test the circuit and prove the tester',
        'Inform others and test continuity',
        'Check voltage and current',
      ],
      correctAnswer: 0,
      explanation:
        'After switching off, you must lock off the isolator and attach a warning notice to prevent unauthorised re-energisation.',
    },
    {
      id: 5,
      question: "What's the purpose of re-proving the tester?",
      options: [
        "To confirm the lock-off device is still secure",
        "To ensure it hasn't failed during the test",
        "To re-identify the correct circuit before working",
        "To check the warning notice is still in place",
      ],
      correctAnswer: 1,
      explanation:
        "Re-proving ensures the tester hasn't failed during the testing process, confirming the test results are valid.",
    },
    {
      id: 6,
      question: "What's the risk if you skip the N-E test?",
      options: [
        'Circuit may not function properly',
        'Instrument readings may be inaccurate',
        'You might miss a dangerous fault condition',
        "There's no specific risk",
      ],
      correctAnswer: 2,
      explanation:
        'Skipping the N-E test could mean missing a dangerous fault condition that could cause injury or death.',
    },
    {
      id: 7,
      question: 'True or false: Tape can be used instead of a lock-off device.',
      options: [
        'True - tape clearly marks the isolator as off',
        'True - if a warning notice is also attached',
        'True - provided the circuit is also informed of',
        'False - only proper lock-off devices are acceptable',
      ],
      correctAnswer: 3,
      explanation:
        'Only proper lock-off devices are acceptable. Tape does not provide adequate security and can be easily removed.',
    },
    {
      id: 8,
      question: 'What happens if you isolate the wrong circuit in AM2?',
      options: [
        'Automatic fail',
        'You can try again',
        'You get a warning',
        'You lose some marks',
      ],
      correctAnswer: 0,
      explanation:
        'Isolating the wrong circuit is a critical safety error that results in automatic failure of the AM2 assessment.',
    },
    {
      id: 9,
      question: 'When do you remove the lock-off and warning notice?',
      options: [
        'As soon as the dead test has been completed',
        'When work is finished and circuit is to be re-energised',
        'Once the tester has been re-proved on a live source',
        'After informing others that you have started work',
      ],
      correctAnswer: 1,
      explanation:
        'Lock-off and warning notices are only removed when all work is completely finished and the circuit is ready to be safely re-energised.',
    },
    {
      id: 10,
      question: "What's the consequence of forgetting a step in safe isolation during AM2?",
      options: [
        'Lose a few marks',
        'Get a verbal warning',
        'Automatic fail',
        'Have to repeat the section',
      ],
      correctAnswer: 2,
      explanation:
        'Missing any step in safe isolation is considered a critical safety error resulting in automatic failure of the entire AM2 assessment.',
    },
  ];

  const learningOutcomes = [
    "Carry out the safe isolation procedure step-by-step to NET's standard",
    'Correctly use and prove testing equipment before and after use',
    'Lock off and secure isolators with warning notices',
    'Perform the full 10-point test sequence on a circuit',
    'Identify common mistakes that cause automatic fails',
  ];

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/am2/module2')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 2
          </button>

          <PageHero
            eyebrow="Module 2 · Section 1"
            title="Safe Isolation Procedures"
            description="Critical safe isolation procedures for AM2 - instant fail if wrong. Complete guide to NET standards and safety requirements."
            tone="yellow"
          />

          <TLDR
            points={[
              'Safe isolation is the most unforgiving part of AM2 — get it wrong and the day ends, regardless of the rest.',
              'The sequence: prove tester on live → identify circuit → isolate → lock off → post warning → test dead → re-prove tester on live.',
              'EAWR 1989 Reg 4 makes "work dead" the legal default. Working live needs justification, in writing.',
              'You must isolate every live conductor — line, neutral, and any other live — not just the line.',
            ]}
          />

          <ConceptBlock title="Instant fail if wrong">
            <p>
              <strong className="text-red-300">Critical.</strong> Safe isolation is the foundation
              of electrical safety and the most unforgiving part of the AM2. If you get it wrong,
              you fail — regardless of how well you perform elsewhere. In real working life, safe
              isolation mistakes can kill. In the AM2, they instantly end your assessment.
            </p>
          </ConceptBlock>

          <LearningOutcomes outcomes={learningOutcomes} />

          <ConceptBlock title="Equipment Required">
            <p>Essential equipment for safe isolation procedures:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              {equipmentRequired.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Pre-Isolation Checklist">
            <p>Complete these steps before beginning isolation:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              {preIsolationChecklist.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ol>
          </ConceptBlock>

          <ConceptBlock title="Why Safe Isolation Matters">
            <p>
              <strong>Safety Reasons:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Prevents electrocution, burns, and arc flash injuries</li>
              <li>Ensures no one else can accidentally re-energise the system</li>
              <li>Protects both you and others on site</li>
              <li>Eliminates risk of electrical shock from induced voltages</li>
              <li>Prevents equipment damage from short circuits</li>
            </ul>
            <p>
              <strong>Legal &amp; Assessment:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Mandatory legal requirement under the Electricity at Work Regulations 1989</li>
              <li>In AM2, failure = instant disqualification</li>
              <li>No second chances or partial marks</li>
              <li>Demonstrates competency to IET Code of Practice</li>
              <li>Required for professional certification maintenance</li>
            </ul>
            <p>
              <strong className="text-elec-yellow">Sobering Statistics:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>30+</strong> electrical deaths annually in UK workplace
              </li>
              <li>
                <strong>1,000+</strong> electrical injuries requiring hospital treatment
              </li>
              <li>
                <strong>67%</strong> of AM2 failures due to safe isolation errors
              </li>
            </ul>
            <p>
              <strong className="text-elec-yellow">Real Industry Consequences:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Fatal Incident (2019):</strong> Electrician bypassed isolation procedure to
                "save time" — resulted in fatality and company prosecution under Section 37 of
                Health &amp; Safety at Work Act.
              </li>
              <li>
                <strong>Serious Injury (2021):</strong> Apprentice received 11kV shock when
                supervisor failed to follow lock-off procedure — 6 months recovery, permanent nerve
                damage.
              </li>
              <li>
                <strong>AM2 Impact:</strong> 2023 data shows 7 out of 10 AM2 failures directly
                linked to incomplete or incorrect safe isolation procedures.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id="safe-isolation-regulation"
            question="Which UK regulation underpins the requirement for safe isolation?"
            options={[
              'CDM Regulations 2015',
              'Electricity at Work Regulations 1989',
              'Building Regulations 2010',
              'Health and Safety at Work Act 1974',
            ]}
            correctIndex={1}
            explanation="The Electricity at Work Regulations 1989 specifically require safe isolation procedures to be followed when working on electrical systems."
          />

          {/* Safe Isolation Procedure Flowchart */}
          <div className="my-8 flex justify-center">
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 w-full max-w-2xl">
              <svg
                viewBox="0 0 400 620"
                className="w-full h-auto"
                role="img"
                aria-label="Safe Isolation Procedure - 6-step vertical flowchart showing the mandatory sequence from identifying the circuit through to re-proving the tester"
              >
                <text
                  x="200"
                  y="28"
                  textAnchor="middle"
                  fill="#F3F4F6"
                  fontSize="16"
                  fontFamily="system-ui, sans-serif"
                  fontWeight="bold"
                >
                  Safe Isolation Procedure
                </text>
                <rect x="75" y="50" width="250" height="56" rx="10" fill="#2563EB" />
                <text
                  x="200"
                  y="72"
                  textAnchor="middle"
                  fill="white"
                  fontSize="11"
                  fontFamily="system-ui, sans-serif"
                  fontWeight="bold"
                >
                  STEP 1
                </text>
                <text
                  x="200"
                  y="92"
                  textAnchor="middle"
                  fill="white"
                  fontSize="13"
                  fontFamily="system-ui, sans-serif"
                >
                  IDENTIFY circuit
                </text>
                <line x1="200" y1="106" x2="200" y2="126" stroke="#9CA3AF" strokeWidth="2" />
                <polygon points="192,122 200,132 208,122" fill="#9CA3AF" />
                <rect x="75" y="136" width="250" height="56" rx="10" fill="#2563EB" />
                <text
                  x="200"
                  y="158"
                  textAnchor="middle"
                  fill="white"
                  fontSize="11"
                  fontFamily="system-ui, sans-serif"
                  fontWeight="bold"
                >
                  STEP 2
                </text>
                <text
                  x="200"
                  y="178"
                  textAnchor="middle"
                  fill="white"
                  fontSize="13"
                  fontFamily="system-ui, sans-serif"
                >
                  ISOLATE supply
                </text>
                <line x1="200" y1="192" x2="200" y2="212" stroke="#9CA3AF" strokeWidth="2" />
                <polygon points="192,208 200,218 208,208" fill="#9CA3AF" />
                <rect x="75" y="222" width="250" height="56" rx="10" fill="#2563EB" />
                <text
                  x="200"
                  y="244"
                  textAnchor="middle"
                  fill="white"
                  fontSize="11"
                  fontFamily="system-ui, sans-serif"
                  fontWeight="bold"
                >
                  STEP 3
                </text>
                <text
                  x="200"
                  y="264"
                  textAnchor="middle"
                  fill="white"
                  fontSize="13"
                  fontFamily="system-ui, sans-serif"
                >
                  SECURE isolation (lock-off + signs)
                </text>
                <line x1="200" y1="278" x2="200" y2="298" stroke="#9CA3AF" strokeWidth="2" />
                <polygon points="192,294 200,304 208,294" fill="#9CA3AF" />
                <rect x="75" y="308" width="250" height="56" rx="10" fill="#D97706" />
                <text
                  x="200"
                  y="330"
                  textAnchor="middle"
                  fill="white"
                  fontSize="11"
                  fontFamily="system-ui, sans-serif"
                  fontWeight="bold"
                >
                  STEP 4
                </text>
                <text
                  x="200"
                  y="350"
                  textAnchor="middle"
                  fill="white"
                  fontSize="13"
                  fontFamily="system-ui, sans-serif"
                >
                  PROVE tester on known source
                </text>
                <line x1="200" y1="364" x2="200" y2="384" stroke="#9CA3AF" strokeWidth="2" />
                <polygon points="192,380 200,390 208,380" fill="#9CA3AF" />
                <rect x="75" y="394" width="250" height="56" rx="10" fill="#D97706" />
                <text
                  x="200"
                  y="416"
                  textAnchor="middle"
                  fill="white"
                  fontSize="11"
                  fontFamily="system-ui, sans-serif"
                  fontWeight="bold"
                >
                  STEP 5
                </text>
                <text
                  x="200"
                  y="436"
                  textAnchor="middle"
                  fill="white"
                  fontSize="13"
                  fontFamily="system-ui, sans-serif"
                >
                  TEST circuit for dead
                </text>
                <line x1="200" y1="450" x2="200" y2="470" stroke="#9CA3AF" strokeWidth="2" />
                <polygon points="192,466 200,476 208,466" fill="#9CA3AF" />
                <rect
                  x="55"
                  y="480"
                  width="290"
                  height="72"
                  rx="10"
                  fill="#DC2626"
                  stroke="#FCA5A5"
                  strokeWidth="2"
                />
                <text
                  x="200"
                  y="504"
                  textAnchor="middle"
                  fill="white"
                  fontSize="11"
                  fontFamily="system-ui, sans-serif"
                  fontWeight="bold"
                >
                  STEP 6
                </text>
                <text
                  x="200"
                  y="524"
                  textAnchor="middle"
                  fill="white"
                  fontSize="14"
                  fontFamily="system-ui, sans-serif"
                  fontWeight="bold"
                >
                  RE-PROVE tester on known source
                </text>
                <rect
                  x="75"
                  y="565"
                  width="250"
                  height="34"
                  rx="6"
                  fill="#1F2937"
                  stroke="#DC2626"
                  strokeWidth="1"
                />
                <text
                  x="200"
                  y="587"
                  textAnchor="middle"
                  fill="#FCA5A5"
                  fontSize="11"
                  fontFamily="system-ui, sans-serif"
                  fontWeight="bold"
                >
                  Forgetting this step = automatic fail
                </text>
              </svg>
            </div>
          </div>

          <ConceptBlock title="Step-by-Step Safe Isolation Procedure (NET Standard)">
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              {safeIsolationSteps.map((step, index) => (
                <li key={index}>
                  {step}
                  {index === 5 && (
                    <>
                      {' '}
                      <strong className="text-elec-yellow">
                        Critical: Always prove on known live source first.
                      </strong>
                    </>
                  )}
                  {index === 7 && (
                    <>
                      {' '}
                      <strong className="text-elec-yellow">
                        Critical: Must re-prove to validate test equipment.
                      </strong>
                    </>
                  )}
                </li>
              ))}
            </ol>
            <p>
              <strong className="text-elec-yellow">Practical Tips:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Allow 10-15 minutes for complete isolation procedure</li>
              <li>Double-check circuit identification before switching</li>
              <li>Use unique locks - never share keys</li>
              <li>Keep tester calibration certificates accessible</li>
            </ul>
          </ConceptBlock>

          <div className="my-6">
            <VideoCard
              url={videos.safeIsolation.url}
              title={videos.safeIsolation.title}
              channel={videos.safeIsolation.channel}
              duration={videos.safeIsolation.duration}
              topic="Safe isolation 9-step on AM2 day"
              caption={
                <>
                  Craig Wiltshire walks through where to test during the safe isolation procedure —
                  the exact thing you must demonstrate on AM2 day. Watch for the prove-test-prove
                  discipline and the conductor combinations at every isolation point.
                </>
              }
            />
          </div>

          <InlineCheck
            id="re-prove-tester"
            question="Why do you re-prove the tester after testing?"
            options={[
              'To check battery levels',
              "To ensure it hasn't failed during the test",
              'To calibrate the instrument',
              'To reset the display',
            ]}
            correctIndex={1}
            explanation="Re-proving ensures the tester hasn't failed during the testing process, confirming your test results are valid."
          />

          <ConceptBlock title="10-Point Test Sequence (Single-Phase Example)">
            <p>All combinations must be checked to ensure the circuit is completely dead.</p>
            <p>
              <strong>Required Tests:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              {tenPointTests.map((test, index) => (
                <li key={index}>{test}</li>
              ))}
            </ul>
            <p>
              <strong className="text-elec-yellow">Important Notes:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Test at both origin and point of work</li>
              <li>In three-phase, repeat across all phases</li>
              <li>All combinations must show no voltage</li>
              <li>Record results accurately</li>
              <li>Use appropriate test leads for voltage level</li>
              <li>Expect 0V reading on all tests</li>
            </ul>
            <p>
              <strong className="text-red-400">Common Test Errors:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-red-400/70">
              <li>Testing with switch in wrong position</li>
              <li>Missing N-E combinations</li>
              <li>Not testing at point of work</li>
              <li>Using faulty test equipment</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Common Critical Fails in AM2 Safe Isolation">
            <p>These errors from NET's common failures list will result in automatic fail:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-red-400/70">
              {criticalFails.map((fail, index) => (
                <li key={index}>{fail}</li>
              ))}
            </ul>
            <p>
              <strong className="text-red-400">Prevention Strategies:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Create a personal checklist and use it every time</li>
              <li>Practice the sequence until it's automatic</li>
              <li>Never rush - take your time</li>
              <li>Communicate clearly with assessors about your actions</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Practice Scenarios">
            <p>Work through these realistic AM2 scenarios to build confidence:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              {practiceScenarios.map((scenario, index) => (
                <li key={index}>
                  <strong>{scenario.title}</strong> — {scenario.description}{' '}
                  <em>({scenario.keyPoints.join('; ')})</em>
                </li>
              ))}
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Real-World Examples">
            <p>
              <strong className="text-red-400">Example 1: Forgotten Re-Prove.</strong> A candidate
              did everything correctly but forgot to re-prove the tester during safe isolation. The
              assessor stopped the test and recorded a fail.{' '}
              <strong className="text-elec-yellow">Lesson:</strong> never skip the final tester
              proving step.
            </p>
            <p>
              <strong className="text-red-400">Example 2: Wrong Lock-Off.</strong> Candidate used
              tape instead of a lock-off device. Unsafe — instant fail.{' '}
              <strong className="text-elec-yellow">Lesson:</strong> only proper padlocks are
              acceptable.
            </p>
            <p>
              <strong className="text-red-400">Example 3: Missing Warning Notice.</strong> A
              candidate isolated a lighting circuit correctly but didn't attach a warning notice.
              Lost critical marks, failed the section.{' '}
              <strong className="text-elec-yellow">Lesson:</strong> lock-off AND warning notice are
              both mandatory.
            </p>
            <p>
              <strong className="text-red-400">Example 4: Wrong Circuit Isolated.</strong> Candidate
              misread the circuit schedule and isolated the wrong circuit. Despite perfect
              procedure, this was a critical fail.{' '}
              <strong className="text-elec-yellow">Lesson:</strong> always double-check circuit
              identification first.
            </p>
          </ConceptBlock>

          <ConceptBlock title="What Assessors Look For">
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Correct Sequence</strong> — assessors check you follow the exact NET
                sequence without shortcuts
              </li>
              <li>
                <strong>Equipment Handling</strong> — proper use of test equipment, proving before
                and after
              </li>
              <li>
                <strong>Safety Consciousness</strong> — clear demonstration that you understand the
                risks
              </li>
              <li>
                <strong>Communication</strong> — clear explanation of what you're doing and why
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Frequently Asked Questions">
            <p>
              <strong>Q1: Can I just switch off at the consumer unit without locking off?</strong>{' '}
              No. Locking off and warning notices are mandatory under regulations.
            </p>
            <p>
              <strong>Q2: Do I have to use my own tester?</strong> You can bring your own if it
              complies, but the centre provides approved testers.
            </p>
            <p>
              <strong>Q3: Why is the 10-point test required?</strong> To confirm the circuit is dead
              in all conductor combinations.
            </p>
            <p>
              <strong>Q4: What happens if I forget one step?</strong> Missing a critical step =
              automatic fail.
            </p>
            <p>
              <strong>Q5: Can I talk through the process instead of demonstrating it?</strong> No.
              You must physically demonstrate the procedure.
            </p>
            <p>
              <strong>Q6: How long should safe isolation take?</strong> Allow 10-15 minutes
              including all tests and documentation.
            </p>
            <p>
              <strong>Q7: What if the tester fails during the process?</strong> Stop immediately,
              get a replacement tester, and start again.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Summary">
            <p>
              Safe isolation is the most important part of the AM2. It must be carried out exactly
              as NET describes, with no shortcuts, no missed steps, and no unsafe practices.
            </p>
            <p>
              <strong className="text-elec-yellow">Remember the Sequence:</strong> Prove tester →
              Isolate → Lock off → Warning notice → Test all combinations → Re-prove tester → Keep
              key. <strong className="text-elec-yellow">Missing any step = automatic fail.</strong>
            </p>
            <p>
              <strong className="text-green-400">Key Success Factor:</strong> practice until
              automatic. <strong className="text-red-400">Main Failure Cause:</strong> rushing the
              process.
            </p>
          </ConceptBlock>

          <SectionRule />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 462.1"
            clause="Each electrical installation shall have provisions for isolation from each supply."
            meaning={
              <>
                Every installation must have a way to cut every supply feeding it. On AM2 the rig is
                wired so you can demonstrate this — your job is to identify the right device,
                isolate it, lock it off and prove dead. Skip any step and you’ve broken the
                regulation.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 462.1."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 462.3"
            clause="Devices for isolation shall be designed and/or installed so as to prevent unintentional or inadvertent closure."
            meaning={
              <>
                This is the regulatory basis for lock-off. The device alone isn’t enough — it must
                be secured against being switched back on. On AM2, "I closed the breaker" is not
                isolation. Padlock with your own key, your warning notice, your retained key.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 462.3."
          />

          <Scenario
            title="Section C — three-phase isolation under the clock"
            situation={
              <>
                Section C. The assessor points at a three-phase isolator feeding a small
                distribution board. You have a two-pole tester, a proving unit, a padlock and a
                warning notice. The clock starts.
              </>
            }
            whatToDo={
              <>
                Prove the tester on the proving unit. Identify the circuit on the schedule. Switch
                the isolator off. Apply your padlock and retain the key. Post the warning notice.
                Test between every pair of conductors — L1-L2, L2-L3, L3-L1, each line to neutral,
                each line to earth, neutral to earth. Re-prove the tester on the proving unit. Only
                then is the board safely isolated.
              </>
            }
            whyItMatters={
              <>
                On a three-phase isolation, missing one combination (especially neutral-to-earth) is
                a critical fail. The test sequence isn’t just for show — a damaged neutral can leave
                you with a hidden live path even after the breaker is open.
              </>
            }
          />

          <CommonMistake
            title="Locking off after the dead test"
            whatHappens={
              <>
                You isolate, dead-test, then think about the padlock. In the gap between switching
                off and locking off, somebody could walk past and re-energise the circuit — the
                assessor included, as a deliberate test.
              </>
            }
            doInstead={
              <>
                Lock off <em>immediately</em> after switching off, before you do anything else. Then
                prove the tester, then dead-test. The order is: switch off → lock off → warning
                notice → prove tester → test dead → re-prove tester.
              </>
            }
          />

          <FAQ
            items={[
              {
                question: 'Why do I have to prove the tester twice?',
                answer:
                  'Because a tester can fail silently. If it failed before you tested dead, every reading is a lie. Re-proving on a known live source after the dead test confirms the tester was working when you used it.',
              },
              {
                question: 'Can I use a multimeter instead of a two-pole voltage tester?',
                answer:
                  'No — a multimeter is not approved for safe isolation. Use a GS38-compliant two-pole voltage indicator with shrouded probes. Multimeters can read residual voltages or sit on a wrong range and miss a live conductor.',
              },
              {
                question: 'What if the proving unit fails on the second prove?',
                answer:
                  'You can no longer trust the dead test. Replace the tester or the proving unit, repeat the full sequence. In real life, that means re-isolating after replacing the kit. On AM2, raise it with the assessor immediately.',
              },
              {
                question: 'Do I need a separate lock for every conductor?',
                answer:
                  'No — you lock the means of isolation (the breaker, isolator, switch-fuse). One padlock on the device, with the key in your pocket. If multiple people are working on the circuit, each adds their own lock.',
              },
              {
                question: 'What happens if I touch a live conductor by accident?',
                answer:
                  'In the assessment, the assessor will stop you immediately and it’s a critical fail. In real life it can kill. Treat every conductor as live until proved dead — including neutral, which can sit at line voltage under fault conditions.',
              },
              {
                question: 'Is the AM2 procedure the same as the HSE GS38 guidance?',
                answer:
                  'Yes — NET aligns the AM2 isolation procedure with HSE GS38 (test instruments) and the IET Code of Practice for Electrical Safe Isolation. Learn one and you’ve learned the other.',
              },
            ]}
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Safe isolation is a critical fail if any step is missed — practise until it’s automatic.',
              'EAWR 1989 Reg 4 makes "work dead" the legal default. Live work needs written justification.',
              'BS 7671 Reg 462.1 / 462.3: every supply must have isolation, and the device must be lockable.',
              'Sequence: prove tester → identify circuit → switch off → lock off → warning notice → test dead → re-prove tester.',
              'Use a GS38-compliant two-pole voltage indicator — never a multimeter for isolation.',
              'On three-phase: test every conductor combination including neutral-to-earth.',
              'Lock off immediately after switching off, before testing dead. Order matters.',
              'Re-proving the tester is the most-skipped step and the most-failed item in AM2.',
            ]}
          />

          <Quiz questions={quizQuestions} title="Knowledge Check: 10-Question Quiz" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/am2/module2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Back to Module
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/am2/module2/section2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Continue to Section 2
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default AM2Module2Section1;
