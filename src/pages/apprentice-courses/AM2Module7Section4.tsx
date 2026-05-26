/**
 * Module 7 · Section 4 — Avoiding common mistakes
 * AM2 day-prep — Cross-cutting exam strategy
 * The patterns that fail apprentices on AM2 day — small slips like missing re-prove — and the habits that prevent each.
 */

import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
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

const TITLE = 'Avoiding Common Mistakes | AM2 Module 7.4 | Elec-Mate';
const DESCRIPTION =
  'Patterns that fail apprentices on AM2 day — slips like missing re-prove on safe isolation — and the habits that prevent each one.';

const AM2Module7Section4 = () => {
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
      id: 'isolation-mistake',
      question: 'What happens if you forget to re-prove your tester after proving dead?',
      options: [
        'No consequence if circuit is actually dead',
        'Minor mark deduction',
        'Automatic fail - unsafe isolation',
        'Warning from assessor',
      ],
      correctIndex: 2,
      explanation:
        'Forgetting to re-prove your tester after proving dead is an automatic fail as it represents unsafe isolation procedure.',
    },
    {
      id: 'testing-order',
      question: 'What sequence must testing follow in AM2?',
      options: [
        'Assessor will tell you the order',
        'Any logical order',
        'GN3 sequence exactly',
        'Start with most important tests',
      ],
      correctIndex: 2,
      explanation:
        'Testing must follow the exact GN3 sequence as specified in the guidance notes - this is mandatory.',
    },
    {
      id: 'fault-finding-error',
      question: "What's wrong with writing 'fault fixed' in fault-finding?",
      options: [
        "Doesn't explain what rectification was done",
        "Electronic equipment and surge protective devices",
        "Temperature sensors and humidity sensors",
        "15-30 minutes, once or twice daily",
      ],
      correctIndex: 0,
      explanation:
        "Writing 'fault fixed' doesn't explain the specific rectification action taken - you must state exactly what was done.",
    },
  ];

  const quizQuestions = [
    {
      id: 1,
      question: 'What is the number one cause of AM2 failure?',
      options: [
        'Poor installation work',
        'Safe isolation mistakes',
        'Failing the knowledge test',
        'Running out of time',
      ],
      correctAnswer: 1,
      explanation:
        'Safe isolation mistakes are the number one cause of AM2 failure, often resulting in automatic fail.',
    },
    {
      id: 2,
      question: 'Give two common installation mistakes:',
      options: [
        'Using wrong tools, working alone',
        'Working too slowly, asking too many questions',
        'Bare copper exposed, CPCs unsleeved',
        'Taking too many breaks, talking too much',
      ],
      correctAnswer: 2,
      explanation:
        'Common installation mistakes include leaving bare copper exposed and failing to sleeve CPCs properly.',
    },
    {
      id: 3,
      question: "Why is writing '0 ohms' as Zs a mistake?",
      options: [
        "Signs of overheating, damage, or poor workmanship",
        "In escape routes and public buildings",
        "Earthing and automatic disconnection",
        "It's unrealistic - no circuit has zero impedance",
      ],
      correctAnswer: 3,
      explanation:
        "Writing '0 ohms' is unrealistic as no real circuit has zero impedance - give realistic measured values.",
    },
    {
      id: 4,
      question: 'What must always follow a rectification statement?',
      options: [
        'A re-test statement',
        'Assessor approval',
        'Client notification',
        'Tool inspection',
      ],
      correctAnswer: 0,
      explanation:
        'Every rectification statement must be followed by stating what re-test will be carried out to verify the repair.',
    },
    {
      id: 5,
      question: 'True or false: You should leave questions blank in the knowledge test if unsure:',
      options: ['True', 'False'],
      correctAnswer: 1,
      explanation:
        "False - always attempt every question. You might get it right, and you definitely won't if you leave it blank.",
    },
    {
      id: 6,
      question: "What's the most common exam trap in knowledge test wording?",
      options: [
        "Use rollers and apply lubricant",
        "To reduce voltage drop and heating",
        "Confusing 'maximum' vs 'minimum'",
        "Colour temperature of light",
      ],
      correctAnswer: 2,
      explanation:
        "The most common trap is misreading key words like 'maximum' vs 'minimum' - always underline key words.",
    },
    {
      id: 7,
      question: 'Why is labelling circuits in the DB important?',
      options: [
        "To indicate the route to final exits",
        "Shading, dirty panels, or inverter faults",
        "Fail for safety and specification breach",
        "It's required for safety and identification",
      ],
      correctAnswer: 3,
      explanation:
        'Circuit labelling is essential for safety and proper identification - failure to label loses marks.',
    },
    {
      id: 8,
      question: 'What type of tester should you use for safe isolation?',
      options: [
        'Two-pole voltage indicator (GS38)',
        'High resistance - investigate',
        'Very low temperatures (near absolute zero)',
        'R_total = (R1 × R2)/(R1 + R2)',
      ],
      correctAnswer: 0,
      explanation:
        'Safe isolation requires a two-pole voltage indicator compliant with GS38 - not a multimeter.',
    },
    {
      id: 9,
      question: "What's the golden rule for avoiding common mistakes in AM2?",
      options: [
        'Insulated tools, gloves, mats, footwear',
        'Preparation, calm discipline, and self-checking',
        'Level 3 qualification without AM2s',
        'Recognise excellence and raise professional profile',
      ],
      correctAnswer: 1,
      explanation:
        'The golden rule is preparation, calm discipline, and self-checking to avoid avoidable mistakes.',
    },
    {
      id: 10,
      question: 'What should you do if you make a mistake during the exam?',
      options: [
        'Fraction of lumens that reach the task surface vs lost to walls/ceiling',
        'Signs of overheating, damage, or poor workmanship',
        'Stop immediately, inform assessor, and correct it properly',
        'Proper installation techniques and regular maintenance',
      ],
      correctAnswer: 2,
      explanation:
        'Stop immediately, inform the assessor, and correct the mistake properly - honesty shows professionalism.',
    },
  ];

  const learningOutcomes = [
    'Identify the most common reasons candidates fail the AM2',
    'Apply strategies to avoid these mistakes in each section of the assessment',
    "Work more confidently by knowing the assessor's 'red flags'",
    'Maintain accuracy and safety even under time pressure',
    'Finish AM2 with fewer lost marks from avoidable errors',
  ];

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/am2/module7')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 7
          </button>

          <PageHero
            eyebrow="Module 7 · Section 4"
            title="Avoiding Common Mistakes"
            description="The AM2 is designed to test competence, not trick candidates. Yet many apprentices fail because of the same avoidable mistakes: rushing, skipping steps, poor paperwork, or guessing. If you know what the common pitfalls are, you can prepare for them and make sure you don't fall into the same traps."
            tone="yellow"
          />

          <TLDR
            points={[
              'Most AM2 failures are predictable: rushing, skipping safety steps, sloppy paperwork, guessing in fault finding.',
              'The fix isn’t more theory — it’s rehearsal. Practise the procedures until they’re automatic.',
              'Watch for the assessor’s "red flags": skipped second prove, blank certificate boxes, exposed conductors, missed labels.',
              'A clean Section A buys you time. A messy Section A loses you Section B.',
            ]}
          />

          <ConceptBlock title="Most Failures Are Avoidable">
            <p>
              <strong className="text-red-300">Important.</strong> NET statistics show that most AM2
              failures are due to repeated common mistakes, not lack of technical knowledge. These
              errors are predictable and preventable. Know the pitfalls, prepare for them, and
              you'll avoid the traps that catch many candidates.
            </p>
          </ConceptBlock>

          <LearningOutcomes outcomes={learningOutcomes} />

          <ConceptBlock title="Safe Isolation Mistakes">
            <p>
              This is the number one cause of failure. Candidates either forget a step or rush
              through the process.
            </p>
            <p>
              <strong className="text-red-400">Most Common Isolation Errors:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-red-400/70">
              <li>
                <strong>Skipping the re-prove step</strong> after testing dead
              </li>
              <li>
                <strong>Using wrong tester</strong> (multimeter instead of two-pole voltage
                indicator)
              </li>
              <li>
                <strong>Not locking off correctly</strong> or forgetting to secure isolation
              </li>
              <li>
                <strong>Testing at wrong points</strong> or missing test points
              </li>
              <li>
                <strong>Rushing the process</strong> under time pressure
              </li>
              <li>
                <strong>Failing to identify all sources</strong> of supply to the circuit
              </li>
              <li>
                <strong>Not proving tester initially</strong> on known live source
              </li>
              <li>
                <strong>Using damaged test leads</strong> or non-GS38 equipment
              </li>
            </ul>
            <p>
              <strong className="text-yellow-400">Why These Errors Happen:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-yellow-400/70">
              <li>
                <strong>Time pressure</strong> — candidates rush basic safety steps
              </li>
              <li>
                <strong>Overconfidence</strong> — assuming circuit is dead without proper
                verification
              </li>
              <li>
                <strong>Poor preparation</strong> — not practicing the full 10-step sequence
              </li>
              <li>
                <strong>Equipment unfamiliarity</strong> — using unfamiliar test instruments
              </li>
              <li>
                <strong>Stress response</strong> — forgetting steps under exam pressure
              </li>
            </ul>
            <p>
              <strong className="text-blue-400">
                Detailed Prevention Strategy — Before You Start:
              </strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-blue-400/70">
              <li>Check test equipment is GS38-compliant and in good condition</li>
              <li>Verify you have correct PPE for the task</li>
              <li>Identify all possible sources of supply to the circuit</li>
              <li>Plan your isolation strategy before touching anything</li>
            </ul>
            <p>
              <strong className="text-blue-400">During Isolation:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-blue-400/70">
              <li>Follow the 10-step process religiously — no shortcuts</li>
              <li>Verbalise each step to the assessor clearly</li>
              <li>Take your time — safety over speed always</li>
              <li>Test at all relevant points, not just one location</li>
              <li>Use lockable isolation where possible</li>
            </ul>
            <p>
              <strong className="text-blue-400">After Testing Dead:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-blue-400/70">
              <li>Always re-prove tester on known live source</li>
              <li>Confirm tester is working correctly</li>
              <li>Only then proceed with work on dead circuit</li>
              <li>Maintain isolation throughout the task</li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={quickCheckQuestions[0].id}
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />

          <ConceptBlock title="Installation Mistakes">
            <p>Most marks are lost here because of poor workmanship and time management issues.</p>
            <p>
              <strong className="text-red-400">Common Installation Errors:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-red-400/70">
              <li>
                <strong>Untidy containment:</strong> conduit kinks, trunking lids not flush, poor
                bending radius
              </li>
              <li>
                <strong>Bare copper exposed</strong> at terminations — major safety issue
              </li>
              <li>
                <strong>CPCs unsleeved</strong> or left disconnected — BS 7671 non-compliance
              </li>
              <li>
                <strong>Accessories crooked</strong> or at wrong height — poor workmanship
              </li>
              <li>
                <strong>Not labelling circuits</strong> in distribution board — identification
                failure
              </li>
              <li>
                <strong>Poor cable management</strong> and untidy work area
              </li>
            </ul>
            <p>
              <strong className="text-green-400">Planning Phase:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-green-400/70">
              <li>Measure and mark out carefully before starting</li>
              <li>Plan cable routes for neatness and compliance</li>
              <li>Check all materials and tools are available</li>
              <li>Understand the installation requirements fully</li>
            </ul>
            <p>
              <strong className="text-green-400">During Installation:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-green-400/70">
              <li>Work steadily rather than rushing — quality over speed</li>
              <li>Connect and sleeve CPCs first, disconnect last</li>
              <li>Use proper torque settings for all connections</li>
              <li>Maintain professional cable management throughout</li>
              <li>Keep work area tidy and organised</li>
            </ul>
            <p>
              <strong className="text-green-400">Quality Control:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-green-400/70">
              <li>Label circuits as you install them — don't leave to end</li>
              <li>Self-check work before calling assessor</li>
              <li>Ensure no bare copper is visible anywhere</li>
              <li>Check all accessories are level and secure</li>
              <li>Verify all connections are tight and proper</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Inspection & Testing Mistakes">
            <p>
              This section often sinks candidates who know the tests but don't follow proper
              procedure.
            </p>
            <p>
              <strong className="text-orange-400">Common Testing Errors:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
              <li>
                <strong>Wrong order of tests</strong> (not following GN3 sequence exactly)
              </li>
              <li>
                <strong>Forgetting insulation resistance</strong> on individual circuits
              </li>
              <li>
                <strong>Not recording results</strong> as they go — leaving it to memory
              </li>
              <li>
                <strong>Writing unrealistic values</strong> ("0 ohms" Zs, "infinity" IR, "999
                MOhms")
              </li>
              <li>
                <strong>Incorrect test methods</strong> or wrong instrument ranges
              </li>
              <li>
                <strong>Missing polarity checks</strong> on relevant circuits
              </li>
            </ul>
            <p>
              <strong className="text-blue-400">Before Testing:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-blue-400/70">
              <li>Have GN3 sequence clearly available for reference</li>
              <li>Prepare all test instruments and check calibration</li>
              <li>Set up documentation sheets ready for recording</li>
              <li>Ensure circuit is properly isolated before testing</li>
            </ul>
            <p>
              <strong className="text-blue-400">During Testing:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-blue-400/70">
              <li>Stick to GN3 order exactly — no shortcuts or variations</li>
              <li>Record results immediately after each test</li>
              <li>Use correct test methods and instrument settings</li>
              <li>Give realistic measured values based on circuit characteristics</li>
              <li>Double-check you've completed all required tests</li>
            </ul>
            <p>
              <strong className="text-green-400">GN3 Test Sequence Reminder:</strong>
            </p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-green-400/70">
              <li>Continuity of protective conductors</li>
              <li>Continuity of ring final circuit conductors</li>
              <li>Insulation resistance</li>
              <li>Polarity</li>
              <li>Earth electrode resistance (where applicable)</li>
              <li>Earth fault loop impedance</li>
              <li>Prospective fault current</li>
              <li>Functional testing</li>
            </ol>
          </ConceptBlock>

          <InlineCheck
            id={quickCheckQuestions[1].id}
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />

          <ConceptBlock title="Fault-finding Mistakes">
            <p>
              Most apprentices fail this section by guessing or not stating rectification properly.
            </p>
            <p>
              <strong className="text-red-400">Common Fault-finding Errors:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-red-400/70">
              <li>
                <strong>Guessing instead of testing logically</strong> — jumping to conclusions
              </li>
              <li>
                <strong>Not writing rectification clearly</strong> (e.g., "fix fault" instead of
                "reconnect CPC at socket and re-test continuity")
              </li>
              <li>
                <strong>Forgetting to state re-test</strong> after rectification
              </li>
              <li>
                <strong>Poor documentation</strong> of fault-finding process
              </li>
              <li>
                <strong>Not following systematic approach</strong> to fault diagnosis
              </li>
            </ul>
            <p>
              <strong className="text-green-400">1. Systematic Diagnosis Process:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-green-400/70">
              <li>
                <strong>Gather information:</strong> What symptoms are reported?
              </li>
              <li>
                <strong>Form hypothesis:</strong> What could cause these symptoms?
              </li>
              <li>
                <strong>Test hypothesis:</strong> Use appropriate tests to confirm or eliminate
              </li>
              <li>
                <strong>Locate precisely:</strong> Find exact location and nature of fault
              </li>
              <li>
                <strong>Document findings:</strong> Record test results and conclusions
              </li>
            </ul>
            <p>
              <strong className="text-green-400">2. Clear Rectification Statements.</strong> Instead
              of: "Fix broken wire". Write: "Replace damaged section of 2.5mm T&amp;E cable between
              positions A and B, making connections using 30A junction box with maintenance-free
              connectors".
            </p>
            <p>
              <strong className="text-green-400">3. Essential Re-test Statements:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-green-400/70">
              <li>Always specify which test confirms the repair</li>
              <li>State expected result of the re-test</li>
              <li>Example: "Re-test continuity of CPC — expect reading less than 0.5 ohms"</li>
              <li>Include functional testing where appropriate</li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={quickCheckQuestions[2].id}
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />

          <ConceptBlock title="Knowledge Test Mistakes">
            <p>Many lose marks here due to exam discipline, not lack of knowledge.</p>
            <p>
              <strong className="text-yellow-400">Common Knowledge Test Errors:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-yellow-400/70">
              <li>
                <strong>Misreading key words</strong> ("maximum" vs "minimum", "must" vs "should")
              </li>
              <li>
                <strong>Confusing units</strong> (seconds vs milliseconds, kW vs W, mA vs A)
              </li>
              <li>
                <strong>Spending too long</strong> on difficult questions, running out of time
              </li>
              <li>
                <strong>Leaving blanks</strong> instead of educated guessing
              </li>
              <li>
                <strong>Not checking answers</strong> before submitting
              </li>
            </ul>
            <p>
              <strong className="text-blue-400">For Each Question:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-blue-400/70">
              <li>Read question twice, underlining key words</li>
              <li>Check units required in answer</li>
              <li>Read all options before deciding</li>
              <li>Eliminate obviously wrong answers first</li>
              <li>Use process of elimination systematically</li>
              <li>If unsure, make educated guess rather than leave blank</li>
            </ul>
            <p>
              <strong className="text-blue-400">Time Management:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-blue-400/70">
              <li>Don't spend more than allocated time per question</li>
              <li>Mark difficult questions and return to them</li>
              <li>Always attempt every question — never leave blanks</li>
              <li>Save time for final review if possible</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Practical Guidance">
            <p>Professional habits that prevent common mistakes:</p>
            <p>
              <strong className="text-blue-400">Professional Mindset:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-blue-400/70">
              <li>Always think "What would the assessor mark as unsafe?" and avoid it</li>
              <li>Build habits of checking work: no bare copper, CPC sleeved, labels applied</li>
              <li>
                Slow down slightly on safety-critical steps — rushing isolation or testing = fail
              </li>
              <li>Treat paperwork as part of the exam, not an afterthought</li>
            </ul>
            <p>
              <strong className="text-green-400">Communication Strategy:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-green-400/70">
              <li>
                If unsure, explain your process out loud — it earns credit even if result isn't
                perfect
              </li>
              <li>Ask for clarification if instructions are unclear</li>
              <li>Inform assessor of any issues or concerns immediately</li>
              <li>Demonstrate your thinking process, not just the end result</li>
            </ul>
            <p>
              <strong className="text-purple-400">Quality Control Habits:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-purple-400/70">
              <li>Self-check your work before calling the assessor</li>
              <li>Use a systematic checklist approach</li>
              <li>Document everything as you go, not at the end</li>
              <li>Leave every stage in a safe, professional condition</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Real-world Examples">
            <p>
              <strong className="text-red-400">Example 1.</strong> Candidate skipped re-prove in
              safe isolation procedure — assessor stopped exam immediately — automatic fail.
            </p>
            <p>
              <strong className="text-orange-400">Example 2.</strong> Candidate installed everything
              neatly but didn't label circuits in DB — lost significant marks unnecessarily for
              incomplete work.
            </p>
            <p>
              <strong className="text-yellow-400">Example 3.</strong> Candidate wrote "fault fixed"
              instead of explaining specific rectification action — lost fault-finding marks for
              poor documentation.
            </p>
            <p>
              <strong className="text-blue-400">Example 4.</strong> Candidate misread "minimum IR"
              and answered with recommended value instead of required minimum — lost marks in
              knowledge test.
            </p>
            <p>
              <strong className="text-green-400">Example 5.</strong> Candidate followed systematic
              approach, documented clearly, and self-checked work — passed comfortably despite minor
              technical error.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Frequently Asked Questions">
            <p>
              <strong>Q1: Are common mistakes published by NET?</strong> Yes — NET highlights common
              fail areas in pre-assessment manuals and training materials. They want you to succeed.
            </p>
            <p>
              <strong>Q2: Do assessors allow small errors?</strong> Some workmanship issues lose
              marks but don't cause failure. However, safety errors cause instant fail regardless of
              size.
            </p>
            <p>
              <strong>Q3: Can I pass if I make one or two minor mistakes?</strong> Yes — but
              repeated small errors will drag your score down. The key is avoiding patterns of
              careless mistakes.
            </p>
            <p>
              <strong>Q4: Is paperwork as important as installation work?</strong> Yes — incomplete
              or inaccurate paperwork loses many marks. Documentation is part of professional
              electrical work.
            </p>
            <p>
              <strong>Q5: What's the biggest single avoidable mistake?</strong> Not following the
              safe isolation procedure fully and correctly. This alone causes more failures than any
              other single error.
            </p>
            <p>
              <strong>Q6: Should I tell the assessor if I make a mistake?</strong> Yes — honesty and
              immediate correction show professionalism and safety awareness. It's better than
              trying to hide errors.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Summary">
            <p>
              Most AM2 failures are caused by avoidable mistakes, not lack of skill. Common errors
              include:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-blue-400/70">
              <li>Skipping safe isolation steps</li>
              <li>
                Poor workmanship in installation (bare copper, unsleeved CPCs, untidy containment)
              </li>
              <li>Wrong testing order or unrealistic results</li>
              <li>Guessing in fault-finding or incomplete rectification statements</li>
              <li>Misreading questions or leaving blanks in the knowledge test</li>
            </ul>
            <p>
              <strong className="text-elec-yellow">
                The solution is preparation, calm discipline, and self-checking. Avoid these traps
                and you put yourself in a strong position to pass.
              </strong>
            </p>
          </ConceptBlock>

          <SectionRule />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 526.1"
            clause="Every connection between conductors or between a conductor and other equipment shall provide durable electrical continuity and adequate mechanical strength and protection."
            meaning={
              <>
                Most workmanship NYCs come back to this regulation. Loose terminals, over-stripped
                conductors, copper proud of the terminal, screws not tightened to torque — all
                breach 526.1. Slow down on terminations and you avoid one of the most common AM2
                mistakes.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 526.1."
          />

          <Scenario
            title="Fault diagnosis: jumping to live tests"
            situation={
              <>
                Section D. Four faults to find. You isolate, do a quick visual, then energise and
                start poking with the multimeter. You find one fault, but two more turn out to be
                dead-side problems (broken CPC, swapped polarity) you should have caught before
                powering up.
              </>
            }
            whatToDo={
              <>
                Stick to the sequence: visual → continuity → IR → polarity → only then energise for
                live tests. Most AM2 fault-diagnosis NYCs come from candidates skipping the dead
                checks and chasing the fault on a live circuit. Slow at the start, fast at the end.
              </>
            }
            whyItMatters={
              <>
                Live testing on a circuit with a broken CPC or swapped polarity is dangerous and a
                critical safety error. Doing the dead checks first is the procedure for a reason.
              </>
            }
          />

          <CommonMistake
            title="Leaving the certificate until the last twenty minutes"
            whatHappens={
              <>
                Section B is 3.5 hours, but you spend two and a half on testing because the rig is
                tricky. Twenty minutes left, blank EIC in front of you. You panic-fill, miss boxes,
                sign without checking. Multiple paperwork NYCs.
              </>
            }
            doInstead={
              <>
                Block out 45 minutes of Section B for paperwork from the start. Fill the schedule of
                inspections and easy fields early. Transcribe test results in batches as you go.
                Signature and final review last. Paperwork is part of testing time, not after it.
              </>
            }
          />

          <FAQ
            items={[
              {
                question: 'What’s the single most common AM2 mistake?',
                answer:
                  'Incomplete safe isolation — usually skipping the second prove of the tester. NET data has put it at the top of the list for years.',
              },
              {
                question: 'Are the same mistakes seen at every centre?',
                answer:
                  'Yes — NET reports the same patterns across all centres. Marking is standardised, candidates make the same predictable errors. Fix the predictable ones and you’re ahead of the field.',
              },
              {
                question: 'Can the assessor warn me about a developing mistake?',
                answer:
                  'Generally no. They observe and record. If you’re about to do something dangerous they’ll stop you, but that’s a critical fail at that point. Don’t expect coaching during the assessment.',
              },
              {
                question: 'What’s the best way to spot my own mistakes before they’re marked?',
                answer:
                  'Self-check at every transition. End of a sub-task: walk back over the work, check terminations, check labels, check no exposed copper. Two minutes of self-check beats finding it after the assessor has already marked it.',
              },
              {
                question: 'How do I avoid time-management mistakes?',
                answer:
                  'Plan with sub-targets within each section. Set internal deadlines for each sub-task. Use a watch or the centre clock. If you’re behind by 20 minutes, that’s the moment to simplify, not push harder.',
              },
              {
                question: 'Should I aim for perfection or for completion?',
                answer:
                  'Completion to a good standard. A complete, slightly imperfect install scores better than half a perfect install. Finish everything, then improve what you can in the time left.',
              },
            ]}
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Most AM2 failures are predictable — rushing, skipping safety steps, sloppy paperwork, guessing in fault finding.',
              'BS 7671 Reg 526.1: durable electrical continuity and mechanical strength on every connection. Slow down on terminations.',
              'Fault diagnosis sequence: visual → continuity → IR → polarity → energise → live tests. Never out of order.',
              'Block out 45 minutes of Section B for paperwork from the start — don’t leave it to the last twenty.',
              'Self-check at every sub-task transition. Two minutes saves a lost criterion.',
              'Aim for completion to a good standard, not perfection on half the work.',
              'Plan internal deadlines for each sub-task. Behind by 20 minutes? Simplify, don’t push harder.',
              'NET marks the same predictable mistakes everywhere — fix them and you’re ahead of the field.',
            ]}
          />

          <Quiz
            questions={quizQuestions}
            title="Test Your Knowledge: Avoiding Common AM2 Mistakes"
          />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/am2/module7/section3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Safety-first Approach
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/am2/module8')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">Module 8</div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default AM2Module7Section4;
