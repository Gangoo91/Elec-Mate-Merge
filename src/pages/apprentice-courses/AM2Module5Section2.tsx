/**
 * Module 5 · Section 2 — Logical fault-finding process
 * AM2 day-prep — AM2 Phase D (fault diagnosis + rectification)
 * A repeatable diagnosis routine: isolate safely, observe, test, narrow it down, prove the cause.
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
  Shield,
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

const TITLE = 'Logical Fault-Finding Process | AM2 Module 5.2 | Elec-Mate';
const DESCRIPTION =
  'A repeatable AM2 fault-finding routine — isolate safely, observe, test, narrow it down and prove the cause without guesswork.';

const AM2Module5Section2 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quickCheckQuestions: Array<{
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }> = [
    {
      id: 'first-action',
      question: "What's the first action before testing a faulted circuit?",
      options: [
        'Check test equipment calibration',
        'Apply safe isolation to prove the circuit is dead',
        'Read the circuit documentation',
        'Observe the symptoms',
      ],
      correctIndex: 1,
      explanation:
        'Safe isolation must always be the first step before any fault-finding work to ensure personal safety and demonstrate proper procedure to the assessor.',
    },
    {
      id: 'mcb-trips',
      question: "If an MCB trips immediately when energised, what's your first test?",
      options: [
        'Continuity test',
        'Polarity test',
        'Insulation resistance to check for a short or earth fault',
        'RCD test',
      ],
      correctIndex: 2,
      explanation:
        'Immediate MCB tripping indicates excessive current flow, suggesting a short circuit or earth fault. Insulation resistance testing will identify this.',
    },
    {
      id: 'fault-recording',
      question: "Why is it not enough to just say 'ring final fault'?",
      options: [
        'You need to specify the cable size',
        'You need to include the test results',
        'Because you must give type, location, and rectification - assessor needs detail',
        'You need to measure the exact resistance',
      ],
      correctIndex: 2,
      explanation:
        'Assessors require complete fault diagnosis including fault type, exact location, and how it would be rectified to demonstrate thorough understanding.',
    },
  ];

  const quizQuestions = [
    {
      id: 1,
      question: "What's the first step in fault finding?",
      options: ['Visual inspection', 'Safe isolation', 'Reading symptoms', 'Testing continuity'],
      correctAnswer: 1,
      explanation:
        'Safe isolation must always be the first step to ensure personal safety and demonstrate proper electrical procedure.',
    },
    {
      id: 2,
      question: 'Why must you observe symptoms before testing?',
      options: [
        'To save time',
        'Symptoms guide which test to perform first',
        "It's required by regulations",
        'To impress the assessor',
      ],
      correctAnswer: 1,
      explanation:
        'Symptoms provide vital clues about the fault type, allowing you to select the most appropriate test and work systematically.',
    },
    {
      id: 3,
      question: 'Which test is best for suspected short circuits?',
      options: ['Continuity test', 'Polarity test', 'Insulation resistance test', 'RCD test'],
      correctAnswer: 2,
      explanation:
        'Insulation resistance testing at 500V DC will reveal short circuits as very low or zero resistance readings between conductors.',
    },
    {
      id: 4,
      question: 'If a socket is dead, what test should you carry out first?',
      options: [
        'Insulation resistance',
        'Polarity test',
        'Continuity test',
        'Earth fault loop impedance',
      ],
      correctAnswer: 2,
      explanation:
        "A dead socket suggests an open circuit, so continuity testing will reveal if there's a break in the circuit path.",
    },
    {
      id: 5,
      question: 'Why must you start fault-finding at the CU?',
      options: [
        "It's the safest place",
        'To work systematically from origin outward',
        'Regulations require it',
        'Test equipment works better there',
      ],
      correctAnswer: 1,
      explanation:
        'Starting from the consumer unit and working outward ensures systematic testing and avoids random fault-chasing.',
    },
    {
      id: 6,
      question: 'What does a very high Zs reading usually suggest?',
      options: ['Short circuit', 'Earth fault', 'High resistance joint', 'Polarity error'],
      correctAnswer: 2,
      explanation:
        'High earth fault loop impedance (Zs) typically indicates a high resistance connection in the earth path or circuit conductors.',
    },
    {
      id: 7,
      question: "True or false: Guessing faults is acceptable if you're correct.",
      options: ['True', 'False'],
      correctAnswer: 1,
      explanation:
        'False. NET assessors mark the process and methodology, not just the final result. Guessing shows poor professional practice.',
    },
    {
      id: 8,
      question: 'What three things must you record when diagnosing a fault?',
      options: [
        'Type, test results, time taken',
        'Location, cost, difficulty',
        'Type, location, rectification',
        'Cause, effect, prevention',
      ],
      correctAnswer: 2,
      explanation:
        'Complete fault diagnosis requires fault type, exact location, and how the fault would be rectified.',
    },
    {
      id: 9,
      question: 'Why should you explain your process out loud to the assessor?',
      options: [
        'To fill time',
        'Assessors mark reasoning and methodology',
        "It's required by regulations",
        'To show confidence',
      ],
      correctAnswer: 1,
      explanation:
        'Assessors award marks for logical reasoning and systematic approach, which must be demonstrated through clear explanation.',
    },
    {
      id: 10,
      question: "After diagnosing a fault, what's the final step before handing back?",
      options: [
        'Clean up tools',
        'Complete paperwork',
        'Prove the circuit would be safe after rectification',
        'Pack test equipment',
      ],
      correctAnswer: 2,
      explanation:
        'You must demonstrate that you understand how to make the installation safe again after fault rectification.',
    },
  ];

  const faqs = [
    {
      question: 'Do I have to follow the same test sequence every time?',
      answer:
        'No, you adapt it to symptoms, but you must stay logical and structured. The key is demonstrating systematic thinking — start at the consumer unit, work outward, half-split your testing.',
    },
    {
      question: "Can I get marks for explaining the fault even if I don't locate it exactly?",
      answer:
        "Yes — assessors credit method and reasoning. Your logical approach is as important as the final result. Talking through your test choices ('I'm doing IR L-E because the RCD tripped') scores method marks even if your endpoint is slightly off.",
    },
    {
      question: 'What happens if I guess and get it right?',
      answer:
        "You won't score well — NET assesses the process, not luck. Professional electricians work systematically, not by guesswork. The assessor's watching what tests you do and why, not just your final answer.",
    },
    {
      question: "Do I have to write rectification even though I don't fix it?",
      answer:
        "Yes — recording rectification is part of the assessment. It proves you understand how to make the installation safe. The format is Action + Location + Re-test, e.g. 'Reconnect CPC at socket SO3 — re-test continuity and Zs.'",
    },
    {
      question: 'Will assessors give hints?',
      answer:
        "No — they only observe. It's your job to demonstrate the logical process independently. They'll watch silently and only intervene if you do something dangerous.",
    },
    {
      question: 'How long should I spend on each fault?',
      answer:
        "With ~1.5–2 hours total and typically 2 faults set, budget ~45–60 minutes per fault including diagnosis, rectification statement and re-test. If you've spent 30 minutes and you're still cluelessly testing, step back and think about your symptom — you've probably picked the wrong test.",
    },
  ];

  const learningOutcomes = [
    'Follow a step-by-step diagnostic method for fault-finding in AM2',
    'Use safe isolation before working on faulted circuits',
    'Select and apply the correct test for the type of fault suspected',
    'Interpret test results logically instead of guessing',
    'Explain your reasoning clearly to the assessor',
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
            eyebrow="Module 5 - Section 2"
            title="Logical Fault-Finding Process"
            description="Fault diagnosis is about working systematically. In the AM2, you are being tested not only on your knowledge of electrical faults but also on your ability to think like a competent electrician."
            tone="yellow"
          />

          <TLDR
            points={[
              'Seven-step process: Safe isolate → observe symptoms → plan test → test step-by-step → interpret → record type+location+rectification → prove safe.',
              "Start at the consumer unit and work outward. Half-split keeps your test count down; random poking burns time you don't have.",
              "Talk through your reasoning out loud — assessors mark method, not just outcome. Saying 'I'm testing IR L-E because RCD tripped' scores marks even if your final answer's slightly off.",
            ]}
          />

          {/* Additional Context */}
          <p className="text-ios-body text-white leading-relaxed -mt-4 mb-6">
            NET assessors are looking for method, not magic. They want to see that you can work
            safely, approach faults in a structured way, use test instruments properly, and state
            your diagnosis clearly.
          </p>

          {/* Critical Warning */}
          <CommonMistake
            title="Safety Always Comes First"
            whatHappens={
              "If you forget safe isolation, it's an instant fail. Even in controlled AM2 conditions, you must demonstrate correct safety procedures - this proves to assessors that safety is always your first thought. Every test must begin with proper isolation and proving procedures. No exceptions."
            }
            doInstead="Treat this as a hard rule on AM2 day — there are no exceptions."
          />

          {/* Learning Outcomes */}
          <LearningOutcomes outcomes={learningOutcomes} />

          {/* The 7-Step Process */}
          <ConceptBlock title="1. The 7-Step Logical Process">
            <p>
              <strong className="text-elec-yellow">Step 1: Start with Safety</strong>
            </p>
            <p>
              Every fault-finding exercise begins with safe isolation. Even though the circuits are
              prepared by NET and under controlled conditions, you must still demonstrate correct
              procedure.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Identify correct isolation point</li>
              <li>Secure isolation (lock off where possible)</li>
              <li>Test voltage indicator on known live source</li>
              <li>Test circuit to prove dead</li>
              <li>Re-test voltage indicator to prove it's working</li>
            </ul>

            <p>
              <strong className="text-elec-yellow">Step 2: Gather Information (Symptoms)</strong>
            </p>
            <p>Look at what the circuit is doing. These symptoms are clues to the type of fault:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Is a socket completely dead? (Open circuit likely)</li>
              <li>Does an MCB trip immediately? (Short circuit/earth fault)</li>
              <li>Do lights behave oddly? (High resistance connection)</li>
              <li>Does RCD trip when energised? (Earth fault)</li>
            </ul>

            <p>
              <strong className="text-elec-yellow">Step 3: Plan the Test Sequence</strong>
            </p>
            <p>
              Once you know the symptom, decide which test will prove or disprove the suspected
              fault:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Suspected open circuit</strong> - Continuity test
              </li>
              <li>
                <strong>Suspected short circuit</strong> - Insulation resistance test
              </li>
              <li>
                <strong>Suspected polarity error</strong> - Polarity test at accessory
              </li>
              <li>
                <strong>Suspected high resistance</strong> - Measure Zs or check terminations
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={quickCheckQuestions[0].id}
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />

          <RegsCallout
            source="BS 7671 — Regulation 643.7.1 (EFLI / fault loop impedance)"
            clause="The earth fault loop impedance Zs at every point in the installation shall be measured or determined and compared with the maximum permitted values."
            meaning={
              <>
                On the AM2 rig, a high-resistance joint or broken CPC will show as a Zs reading well
                outside the maximum for the protective device. For a 32A Type B MCB the maximum Zs
                is
                <strong> 1.37 Ω</strong> (BS 7671 A4:2026 values). When you call a fault as
                "high-resistance joint", state the measured Zs against this maximum — that's the
                language the assessor's listening for.
              </>
            }
            cite="Reference: BS 7671 Part 6 — Reg 643.7; Appendix 41 disconnection-time tables"
          />

          {/* Steps 4-7 */}
          <ConceptBlock title="2. Testing and Analysis Steps">
            <p>
              <strong className="text-elec-yellow">Step 4: Test Logically, Step by Step</strong>
            </p>
            <p>
              Start from the origin (CU) and work outwards. This avoids chasing faults randomly.
            </p>
            <p>
              <strong>Example: Ring final circuit testing</strong>
            </p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>Prove continuity of each conductor at the CU</li>
              <li>Cross-connect and measure at sockets</li>
              <li>Narrow down where the break or reversal occurs</li>
            </ol>

            <p>
              <strong className="text-elec-yellow">Step 5: Interpret the Result</strong>
            </p>
            <p>Don't just write down numbers - explain what they mean:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>0 MOhm on insulation resistance</strong> = Short circuit or earth fault
              </li>
              <li>
                <strong>Very high Zs reading</strong> = High resistance joint
              </li>
              <li>
                <strong>Dead socket with no continuity on line</strong> = Open circuit
              </li>
              <li>
                <strong>RCD trips at 15mA instead of 30mA</strong> = Over-sensitive RCD
              </li>
            </ul>

            <p>
              <strong className="text-elec-yellow">
                Step 6: Record the Fault and Rectification
              </strong>
            </p>
            <p>When you find the fault, you must state clearly:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>What the fault is (Type)</li>
              <li>Where it is located (Location)</li>
              <li>How you would rectify it (Rectification)</li>
            </ul>
            <p>
              <strong>Example:</strong> "Open CPC between CU and socket 2. Rectify by reconnecting
              CPC at CU terminal."
            </p>

            <p>
              <strong className="text-elec-yellow">Step 7: Prove Safe Afterwards</strong>
            </p>
            <p>
              Finally, confirm that after rectification, the circuit would be re-tested using the
              correct sequence. This shows you understand the importance of leaving an installation
              safe.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={quickCheckQuestions[1].id}
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />

          <Scenario
            title="The RCD trips on energising — but you don't know which circuit"
            situation={
              <>
                You re-energise after Step 7 and the 30 mA RCD on the AM2 board trips immediately.
                The board has multiple circuits running through that RCD. You've got 40 minutes of
                fault time left. Symptom: low IR somewhere on the line-to-earth side.
              </>
            }
            whatToDo={
              <>
                Don't try to test the whole board live. Isolate again. With the RCD off, switch each
                MCB OFF, then turn them on one at a time and re-energise — the one that drops the
                RCD is your faulty circuit. Then dead-test that circuit only: IR L-E and N-E at 500
                V DC. The reading near 0 MΩ tells you which side of the fault you're on. Half-split
                from there.
              </>
            }
            whyItMatters={
              <>
                The assessor wants to see methodical isolation, not panic. Working through one MCB
                at a time means you're isolating the fault to one circuit before doing detailed
                dead-tests. That's how you stay within your time budget AND get full method marks
                under BS 7671 Reg 643.
              </>
            }
          />

          <RegsCallout
            source="BS 7671 — Regulation 642.x (Insulation resistance)"
            clause="The insulation resistance, measured with the test voltages indicated in Table 64, shall be regarded as satisfactory if each circuit, with main switch open, has an insulation resistance not less than the value shown."
            meaning={
              <>
                For circuits up to 500 V (which is everything you'll see on AM2), test at 500 V DC
                and the minimum acceptable IR is 1 MΩ. Anything lower is a failed test result and
                points to an earth fault or short. Below 2 MΩ, BS 7671 says investigate even if it
                technically passes — that's the level of detail the assessor wants in your
                reasoning.
              </>
            }
            cite="Reference: BS 7671 Part 6 — Reg 642 / Table 64 (insulation resistance test voltages)"
          />

          {/* Practical Guidance */}
          <ConceptBlock title="3. Practical Guidance for AM2 Success">
            <p>
              <strong className="text-elec-yellow">Critical Success Factors</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Always think safety first</strong> - if you forget isolation, it's an
                instant fail
              </li>
              <li>
                <strong>Talk through your logic</strong> - say what you're testing and why
              </li>
              <li>
                <strong>Work methodically</strong> - don't jump between circuits or tests
              </li>
              <li>
                <strong>Be precise</strong> - fault = type + location + rectification
              </li>
            </ul>

            <p>
              <strong className="text-elec-yellow">Professional Approach</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Demonstrate systematic thinking</li>
              <li>Explain your reasoning clearly</li>
              <li>Show confidence in your methodology</li>
              <li>Avoid guessing - even if unsure, show logical process</li>
            </ul>

            <p>
              <strong className="text-elec-yellow">Time Management Tips</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Plan your test sequence before starting</li>
              <li>Don't waste time on obvious non-faults</li>
              <li>Document findings as you go</li>
              <li>Keep assessor informed of progress</li>
            </ul>

            <p>
              <strong className="text-elec-yellow">Common Mistakes to Avoid</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Rushing the safety isolation</li>
              <li>Testing randomly without logic</li>
              <li>Not explaining your reasoning</li>
              <li>Incomplete fault descriptions</li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={quickCheckQuestions[2].id}
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />

          <CommonMistake
            title="Vague fault statements like 'CPC fault' or 'broken cable'"
            whatHappens={
              <>
                You've done the testing properly, located the fault, but written something like "CPC
                fault somewhere in lighting circuit". The assessor can't tell whether you actually
                know the location or you're guessing. Marks lost on the recording stage even though
                your method was right.
              </>
            }
            doInstead={
              <>
                Use Action + Location + Re-test format every time. Bad: "CPC fault." Good: "Open CPC
                between consumer unit MCB earth bar and socket SO2 — rectify by reconnecting CPC at
                CU earth bar — re-test continuity (R2) and Zs at SO2 to confirm within 1.37 Ω for
                32A Type B."
              </>
            }
          />

          {/* Real-World Examples */}
          <ConceptBlock title="4. Real-World Examples">
            <p>
              <strong className="text-elec-yellow">Example 1: Poor Method</strong>
            </p>
            <p>
              <strong>Scenario:</strong> Candidate saw an RCD tripping and immediately said "earth
              fault."
            </p>
            <p>
              <strong>Problem:</strong> Assessor asked "where exactly?" - candidate couldn't prove
              it.
            </p>
            <p>
              <strong>Result:</strong> Marks lost for guessing instead of systematic diagnosis.
            </p>

            <p>
              <strong className="text-elec-yellow">Example 2: Good Method</strong>
            </p>
            <p>
              <strong>Scenario:</strong> Candidate tested continuity systematically.
            </p>
            <p>
              <strong>Process:</strong> Narrowed down to broken CPC between CU and first socket,
              recorded properly.
            </p>
            <p>
              <strong>Result:</strong> Full marks for logical method and complete diagnosis.
            </p>

            <p>
              <strong className="text-elec-yellow">Example 3: Time Management Failure</strong>
            </p>
            <p>
              <strong>Scenario:</strong> Candidate misread symptoms, tested in wrong order.
            </p>
            <p>
              <strong>Problem:</strong> Wasted time on incorrect tests, ran out of time.
            </p>
            <p>
              <strong>Result:</strong> Only 1 fault identified correctly - failed section.
            </p>

            <p>
              <strong className="text-elec-yellow">Example 4: Real-World Application</strong>
            </p>
            <p>
              <strong>Scenario:</strong> On site, an electrician guessed at a short circuit.
            </p>
            <p>
              <strong>Problem:</strong> Replaced multiple accessories and wasted hours.
            </p>
            <p>
              <strong>Lesson:</strong> Logical testing would have found the actual loose neutral in
              minutes.
            </p>
          </ConceptBlock>

          <FAQ items={faqs} />

          {/* Summary */}
          <ConceptBlock title="6. Section Summary">
            <p>
              <strong className="text-elec-yellow">The Logical Fault-Finding Process:</strong>
            </p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Apply safe isolation</strong>
              </li>
              <li>
                <strong>Observe the symptoms</strong>
              </li>
              <li>
                <strong>Plan the right test</strong>
              </li>
              <li>
                <strong>Test step by step from CU outward</strong>
              </li>
              <li>
                <strong>Interpret results correctly</strong>
              </li>
              <li>
                <strong>Record fault type, location, and rectification</strong>
              </li>
              <li>
                <strong>Prove the circuit safe</strong>
              </li>
            </ol>

            <p>
              <strong className="text-elec-yellow">Remember:</strong> Following this method shows
              the assessor you are competent and professional, even under exam pressure. NET
              assessors mark the process and reasoning - not just the final answer.
            </p>
          </ConceptBlock>

          <KeyTakeaways
            points={[
              'Seven-step process: Safe isolate → observe symptom → plan test → test step-by-step → interpret → record type+location+rectification → prove safe.',
              'Symptoms drive your test choice. Dead circuit = continuity. Trip on energise = IR. Sluggish circuit = Zs. Polarity oddness = polarity test at accessory.',
              'Talk out loud. The assessor needs to hear your reasoning to award method marks — silent testing scores less than thinking aloud, even if both find the fault.',
              'Half-split from the consumer unit outward. Two cuts gets you to one quarter of the circuit, four cuts to one sixteenth — minimum tests, maximum information.',
              "Recording: Action + Location + Re-test. 'Reconnect CPC at SO2 — re-test continuity and Zs.' That's the language that scores full marks.",
            ]}
          />

          {/* Quiz Section */}
          <Quiz
            title="Test Your Knowledge: Logical Fault-Finding Process"
            questions={quizQuestions}
          />

          {/* Navigation Footer */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <Link
              to="/study-centre/apprentice/am2/module5/section1"
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Typical Faults Set
              </div>
            </Link>
            <Link
              to="/study-centre/apprentice/am2/module5/section3"
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Test Methods & Procedures
              </div>
            </Link>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default AM2Module5Section2;
