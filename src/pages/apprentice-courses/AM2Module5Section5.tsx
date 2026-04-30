/**
 * Module 5 · Section 5 — Re-testing procedures after fault rectification
 * AM2 day-prep — AM2 Phase D (fault diagnosis + rectification)
 * Which tests you have to repeat after a repair so the certificate genuinely reflects the live install.
 */

import {
  AlertTriangle,
  ArrowLeft,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Eye,
  Lightbulb,
  RotateCcw,
  Shield,
  Target,
  TestTube,
  Wrench,
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

const TITLE = 'Re-testing After Fault Rectification | AM2 Module 5.5 | Elec-Mate';
const DESCRIPTION =
  'Which AM2 tests have to be repeated after a repair so the certificate genuinely reflects the live, post-fix installation.';

const AM2Module5Section5 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quickCheckQuestions: Array<{
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }> = [
    {
      id: 're-test-requirement',
      question: 'Which part of BS 7671 covers verification requirements after rectification?',
      options: [
        'Part 5 - Selection and erection of equipment',
        'Part 6 - Inspection and testing',
        'Part 4 - Protection for safety',
        'Part 7 - Special installations',
      ],
      correctIndex: 1,
      explanation:
        'BS 7671 Part 6 covers all inspection and testing requirements, including verification after alteration or repair.',
    },
    {
      id: 'polarity-retest',
      question: "If you fix a reversed polarity at a socket, what's the appropriate re-test?",
      options: [
        'Earth fault loop impedance test',
        'Insulation resistance test',
        'Polarity test at the socket outlet',
        'RCD operation test',
      ],
      correctIndex: 2,
      explanation:
        'After correcting polarity errors, you must re-test polarity at the specific outlet to confirm the correction.',
    },
    {
      id: 'open-circuit-retest',
      question: 'What re-test is required after fixing an open circuit fault?',
      options: [
        'Insulation resistance test',
        'Continuity test of conductors',
        'Earth fault loop impedance test',
        'RCD operation test',
      ],
      correctIndex: 1,
      explanation:
        'Open circuit faults are proven rectified by demonstrating continuity between conductor ends.',
    },
  ];

  const quizQuestions = [
    {
      id: 1,
      question: 'Why is re-testing mandatory after rectification?',
      options: [
        'To waste time',
        'To prove the circuit is now safe and compliant',
        'To use more test equipment',
        'To impress the assessor',
      ],
      correctAnswer: 1,
      explanation:
        'Re-testing proves the fault has been corrected and the circuit now complies with BS 7671 safety requirements.',
    },
    {
      id: 2,
      question: 'What part of BS 7671 covers verification requirements?',
      options: ['Part 4', 'Part 5', 'Part 6', 'Part 7'],
      correctAnswer: 2,
      explanation:
        'BS 7671 Part 6 covers inspection and testing, including verification after alteration or repair.',
    },
    {
      id: 3,
      question: 'What re-test is needed after fixing an open circuit?',
      options: ['Insulation resistance', 'Continuity of conductors', 'RCD operation', 'Polarity'],
      correctAnswer: 1,
      explanation:
        'Open circuit faults are verified as fixed by re-testing continuity between conductor ends.',
    },
    {
      id: 4,
      question: 'What re-test proves a short circuit has been cleared?',
      options: [
        'Continuity',
        'Insulation resistance between conductors',
        'Earth loop impedance',
        'RCD test',
      ],
      correctAnswer: 1,
      explanation:
        'Short circuits are proven cleared by re-testing insulation resistance between the previously shorted conductors.',
    },
    {
      id: 5,
      question: 'What test confirms that polarity is now correct?',
      options: [
        'Continuity test',
        'Insulation test',
        'Polarity test at outlets/switches',
        'Earth loop test',
      ],
      correctAnswer: 2,
      explanation:
        'Polarity errors require re-testing polarity at the specific outlets or switches that were corrected.',
    },
    {
      id: 6,
      question: 'Which test confirms a high resistance fault is rectified?',
      options: [
        'Insulation resistance',
        'Earth fault loop impedance (Zs)',
        'RCD operation',
        'Functional testing',
      ],
      correctAnswer: 1,
      explanation:
        'High resistance faults in protective conductors are verified by re-testing earth fault loop impedance (Zs).',
    },
    {
      id: 7,
      question: 'True or false: You physically re-test all circuits during AM2 fault finding.',
      options: ['True', 'False - you state which re-test proves rectification'],
      correctAnswer: 1,
      explanation:
        'In AM2 fault finding, you state which re-test would prove rectification rather than physically performing all tests.',
    },
    {
      id: 8,
      question: 'What happens if you forget to state a re-test in AM2?',
      options: [
        'Nothing',
        'You lose marks even if fault diagnosis was correct',
        'Only minor point deduction',
        'Assessor will remind you',
      ],
      correctAnswer: 1,
      explanation:
        'Forgetting to state the appropriate re-test results in lost marks, even with correct fault diagnosis.',
    },
    {
      id: 9,
      question: 'Why should you include measurement units in recorded results?',
      options: [
        'To show precision',
        'To meet professional documentation standards',
        'To confuse assessors',
        'Units are optional',
      ],
      correctAnswer: 1,
      explanation:
        'Including proper units (Ohms, MOhms, V, ms) demonstrates professional documentation standards and technical accuracy.',
    },
    {
      id: 10,
      question: "What's the golden rule for rectification and re-testing answers?",
      options: [
        'Fix first, test later',
        'Always link rectification with appropriate re-test',
        'Test everything',
        'Only test if asked',
      ],
      correctAnswer: 1,
      explanation:
        'Always link rectification actions with the specific re-test that proves the fault has been corrected.',
    },
  ];

  const learningOutcomes = [
    'State why re-testing after rectification is mandatory for compliance',
    'Match each fault type to the correct verification test',
    'Carry out re-tests methodically and record results professionally',
    'Demonstrate complete diagnose → rectify → verify process',
    'Understand what assessors expect in re-testing documentation',
  ];

  const faqs = [
    {
      question: 'Do I have to physically perform every re-test on AM2?',
      answer:
        'No — you state which re-tests would be carried out and what readings would prove safety. AM2 fault diagnosis is about competent communication and decision-making, not full physical re-verification. But know your test sequence cold so you can describe it accurately.',
    },
    {
      question: "What if I name the right test but don't include the value?",
      answer:
        "You'll get partial marks — the test name proves understanding, but the expected value/maximum proves you know the BS 7671 acceptance criteria. 'Re-test Zs' = pass mark. 'Re-test Zs, expecting reading within 1.37 Ω for 32A Type B' = full marks.",
    },
    {
      question: 'How many re-tests should I list per fault?',
      answer:
        'Depends on the fault. Open circuit: 1 (continuity). Short circuit: 1 (IR). Earth fault: 2 (IR + RCD). High-resistance joint: 1–2 (Zs, optionally continuity). Polarity error: 1 (polarity at accessory). Match the test set to what the rectification could affect.',
    },
    {
      question: 'Why does an earth fault need both IR and RCD re-test?',
      answer:
        'IR proves the unintended L-E or N-E path is gone after your repair. The RCD test proves the protective device still works correctly — earth fault current can affect RCD components, and BS 7671 643.10 requires post-repair RCD verification. Both checks, both required.',
    },
    {
      question: 'What if my re-test would still show a problem?',
      answer:
        "Then your rectification didn't work and you need to either re-diagnose or extend your repair. State this clearly: 'If Zs still exceeds 1.37 Ω after remaking the joint, investigate further at the next termination upstream.' That shows real-world thinking, not just exam answers.",
    },
    {
      question: 'Does AM2 mark me down for using lots of detail in re-tests?',
      answer:
        "No — quite the opposite. Detail wins marks. Expected reading, units, BS 7671 maximum, A4:2026 reference — load it up. The assessor's looking for evidence you understand both the test AND the acceptance criteria. Vague is bad; specific is good.",
    },
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

          <PageHero
            eyebrow="Module 5 - Section 5"
            title="Re-testing Procedures After Fault Rectification"
            description="In AM2, every rectified fault must be followed by re-testing. This proves that the fault has been corrected and that the circuit now complies with BS 7671. It also shows the assessor that you understand the professional responsibility of leaving installations safe after work."
            tone="yellow"
          />

          <TLDR
            points={[
              'Match the re-test to the fault: open → continuity. Short → IR. Earth fault → IR L-E + RCD ×1 IΔn. High-resistance joint → Zs. Polarity error → polarity at accessory.',
              "Re-test isn't optional — BS 7671 Reg 643.1 requires verification after any alteration. Skipping it caps your AM2 marks even if diagnosis was right.",
              "State actual values with units. 'Reading 0.18 Ω' beats 'continuity passed'. Real numbers prove you actually did the test.",
            ]}
          />

          <div className="space-y-6">
            {/* Introduction */}
            <section className="space-y-3">
              <p className="text-ios-body text-white leading-relaxed">
                Skipping re-testing is one of the easiest ways to lose marks in the fault-finding
                section, even if you diagnosed the fault correctly.
              </p>
            </section>

            {/* Critical Warning */}
            <CommonMistake
              title="Re-testing is Mandatory for Every Rectification"
              whatHappens={
                <>
                  <p className="text-ios-callout text-white mb-3 leading-relaxed">
                    Forgetting to state the appropriate re-test after rectification will result in
                    lost marks, even if your fault diagnosis was completely correct.
                  </p>
                  <p className="text-ios-callout text-white font-medium leading-relaxed">
                    Every fix must be verified - this demonstrates professional competence and
                    compliance with BS 7671 Part 6.
                  </p>
                </>
              }
              doInstead={<>Treat this as a hard rule on AM2 day — there are no exceptions.</>}
            />

            {/* Learning Outcomes */}
            <LearningOutcomes outcomes={learningOutcomes} />

            {/* Why Re-testing Matters */}
            <ConceptBlock title="1. Why Re-testing Matters">
              <p>
                <strong className="text-elec-yellow">Essential Reasons for Re-testing:</strong>
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Safety Verification:</strong> Confirms the circuit is now safe to use
                </li>
                <li>
                  <strong>Proof of Rectification:</strong> Demonstrates that fixes were carried out
                  correctly
                </li>
                <li>
                  <strong>Hidden Fault Detection:</strong> Prevents secondary faults being left in
                  place
                </li>
                <li>
                  <strong>BS 7671 Compliance:</strong> Satisfies Part 6 verification requirements
                </li>
                <li>
                  <strong>Professional Documentation:</strong> Provides evidence for certification
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
              source="BS 7671 — Regulation 643.1 (Verification after rectification)"
              clause="Where any addition or alteration is made to an existing installation, the part of the installation which has been altered, and any other part of the installation affected, shall be inspected and tested in accordance with the requirements of this Part."
              meaning={
                <>
                  "Alteration" includes any rectification work. The same Part 6 verification applies
                  after a repair as it does after first installation — initial verification tests on
                  the affected portion. On AM2 day, that means stating the same dead test
                  (continuity, IR) and live test (Zs, RCD) sequence as you would for a brand-new
                  circuit.
                </>
              }
              cite="Reference: BS 7671 Part 6 — Reg 643.1; IET GN3 Section 7"
            />

            {/* Re-testing Requirements by Fault Type */}
            <ConceptBlock title="2. Re-testing Requirements by Fault Type">
              <p>
                <strong className="text-elec-yellow">Open Circuit Faults:</strong>
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Fault:</strong> Complete break in conductor path
                </li>
                <li>
                  <strong>Re-test:</strong> Continuity test between conductor ends
                </li>
                <li>
                  <strong>Expected result:</strong> Low resistance reading (0.05 Ohms per metre or
                  less)
                </li>
                <li>
                  <strong>Tool:</strong> Continuity tester with 200mA test current
                </li>
              </ul>

              <p>
                <strong className="text-elec-yellow">Short Circuit Faults:</strong>
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Fault:</strong> Direct connection between conductors
                </li>
                <li>
                  <strong>Re-test:</strong> Insulation resistance between conductors
                </li>
                <li>
                  <strong>Expected result:</strong> 1 MOhms or greater (minimum acceptable)
                </li>
                <li>
                  <strong>Tool:</strong> Insulation resistance tester at 500V
                </li>
              </ul>

              <p>
                <strong className="text-elec-yellow">High Resistance Connections:</strong>
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Fault:</strong> Poor connection causing high resistance
                </li>
                <li>
                  <strong>Re-test:</strong> Earth fault loop impedance (Zs)
                </li>
                <li>
                  <strong>Expected result:</strong> Within acceptable limits for circuit
                </li>
                <li>
                  <strong>Also check:</strong> Continuity at the connection point
                </li>
              </ul>

              <p>
                <strong className="text-elec-yellow">Polarity Errors:</strong>
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Fault:</strong> Incorrect L/N connections
                </li>
                <li>
                  <strong>Re-test:</strong> Polarity test at outlets/switches
                </li>
                <li>
                  <strong>Expected result:</strong> Correct L/N identification
                </li>
                <li>
                  <strong>Tool:</strong> Proving unit or polarity tester
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
              title="You rectified an earth fault — now what re-tests prove safety?"
              situation={
                <>
                  You found an earth fault on a socket circuit: a damaged cable contacting the back
                  of a metal accessory. After stating "Replace damaged cable section between SO2 and
                  SO3 with equivalent 2.5 mm² flat T+E" the assessor asks what re-tests would prove
                  the circuit safe.
                </>
              }
              whatToDo={
                <>
                  State a TWO-test sequence:{' '}
                  <em>
                    "1. IR test L-E and N-E at 500 V DC, expecting &gt; 1 MΩ minimum, ideally &gt; 2
                    MΩ. 2. RCD operation test at ×1 IΔn, expecting trip within 300 ms for
                    general-purpose 30 mA RCD per BS 7671 Table 3A."
                  </em>{' '}
                  Earth faults need both — IR proves the fault path is gone, RCD test proves the
                  protective device still works correctly after the test current. Just IR isn't
                  enough.
                </>
              }
              whyItMatters={
                <>
                  On AM2 day this is exactly the kind of question that distinguishes pass from full
                  marks. Single-test re-tests for earth faults miss the RCD verification that BS
                  7671 642.x and 643.10 require. Two tests, named values, named maximums — that's
                  the level of detail that earns full marks under Reg 643 verification requirements.
                </>
              }
            />

            <RegsCallout
              source="BS 7671 — Regulation 643.10 (RCD operation)"
              clause="Where an RCD is required to provide automatic disconnection of supply or additional protection, the effectiveness of automatic disconnection of supply afforded by the RCD shall be verified using suitable test equipment."
              meaning={
                <>
                  After ANY earth fault rectification, the RCD must be re-tested. Current standard:
                  30 mA general-purpose RCD must trip within 300 ms at <strong>×1 IΔn</strong> (i.e.
                  at 30 mA test current). For "additional protection" RCDs (sockets &le; 32 A in
                  most situations), the ×5 IΔn test must trip within 40 ms. Both are mandatory after
                  any earth fault repair.
                </>
              }
              cite="Reference: BS 7671 Part 6 — Reg 643.10 / Table 3A; A4:2026 update"
            />

            {/* What Assessors Look For */}
            <ConceptBlock title="3. What Assessors Look For">
              <p>
                <strong className="text-elec-yellow">Key Assessment Criteria:</strong>
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Clear linkage:</strong> Every rectification must be followed by
                  appropriate re-test
                </li>
                <li>
                  <strong>Correct test method:</strong> Right test for the fault type identified
                </li>
                <li>
                  <strong>Realistic results:</strong> Recorded values that make sense for the
                  circuit
                </li>
                <li>
                  <strong>Professional documentation:</strong> Clear, legible records with proper
                  units
                </li>
                <li>
                  <strong>Safety confirmation:</strong> Statement that installation is now safe
                </li>
              </ul>

              <p>
                <strong className="text-elec-yellow">Professional Testing Technique:</strong>
              </p>
              <p>
                Assessors want to see that you understand the <em>purpose</em> of each re-test, not
                just the procedure.
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>Explain why this specific test proves the fault is rectified</li>
                <li>Use proper terminology (not "check" but "re-test continuity")</li>
                <li>Include measurement units (Ohms, MOhms, V, ms)</li>
                <li>State compliance with relevant BS 7671 requirements</li>
              </ul>
            </ConceptBlock>

            {/* Common Mistakes */}
            <ConceptBlock title="4. Common Candidate Mistakes">
              <p>
                <strong className="text-elec-yellow">Top Mistakes That Lose Marks:</strong>
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Forgetting re-test:</strong> Stating rectification without mentioning
                  verification
                </li>
                <li>
                  <strong>Wrong test method:</strong> Using Zs when IR is needed, or vice versa
                </li>
                <li>
                  <strong>Unrealistic values:</strong> Recording exactly 0.00 Ohms or perfect book
                  answers
                </li>
                <li>
                  <strong>Missing units:</strong> Recording "2.5" instead of "2.5 Ohms"
                </li>
                <li>
                  <strong>No safety confirmation:</strong> Failing to state installation is now safe
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

            <CommonMistake
              title="Listing one re-test for an earth fault"
              whatHappens={
                <>
                  You state "Re-test IR L-E to confirm fault cleared" and stop there. The assessor
                  marks you partial — your IR test is correct but you've forgotten the RCD
                  operational test. After any earth fault, BS 7671 Reg 643.10 requires verifying the
                  RCD still trips within its rated time.
                </>
              }
              doInstead={
                <>
                  For earth faults, ALWAYS pair the tests:{' '}
                  <em>
                    "Re-test IR L-E and N-E at 500 V DC, expecting &gt; 1 MΩ. Re-test RCD operation
                    at ×1 IΔn, expecting trip within 300 ms per Table 3A."
                  </em>{' '}
                  Two tests, two named values. That's full marks under Reg 643.10.
                </>
              }
            />

            {/* Professional Best Practices */}
            <ConceptBlock title="5. Professional Re-testing Best Practices">
              <p>
                <strong className="text-elec-yellow">The "Fix and Verify" Formula:</strong>
              </p>
              <p>
                Always structure your answers as:{' '}
                <strong>Action + Re-test + Result + Compliance</strong>
              </p>
              <p>
                <em>
                  "Reconnect CPC at socket outlet → Re-test continuity → 0.15 Ohms recorded →
                  Complies with BS 7671"
                </em>
              </p>

              <p>
                <strong className="text-elec-yellow">Time Management Tips:</strong>
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>Plan rectification and re-test together</li>
                <li>Have test equipment ready before rectifying</li>
                <li>Document as you work, not afterwards</li>
              </ul>

              <p>
                <strong className="text-elec-yellow">Documentation Standards:</strong>
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>Use technical terminology consistently</li>
                <li>Include all relevant measurement units</li>
                <li>Reference BS 7671 compliance explicitly</li>
              </ul>
            </ConceptBlock>

            {/* Real-World Applications */}
            <ConceptBlock title="6. Real-World Application Examples">
              <p>
                <strong className="text-elec-yellow">CORRECT Example:</strong>
              </p>
              <p>
                <em>
                  "Open circuit detected in ring final circuit. Loose connection found at socket 4."
                </em>
              </p>
              <p>
                "Rectification: Remake connection at socket 4 terminals → Re-test: Ring final
                circuit continuity → Result: 0.24 Ohms recorded → Complies with BS 7671 Table I1"
              </p>

              <p>
                <strong className="text-elec-yellow">INCORRECT Example:</strong>
              </p>
              <p>
                <em>
                  "Open circuit detected in ring final circuit. Loose connection found at socket 4."
                </em>
              </p>
              <p>
                "Fixed the connection." <em>(No re-test mentioned - marks lost!)</em>
              </p>

              <p>
                <strong className="text-elec-yellow">Industry Reality Check:</strong>
              </p>
              <p>
                An electrician fixed a loose CPC connection but didn't re-test Zs. The circuit was
                later found to still have high earth loop impedance, creating a safety hazard. The
                client held the electrician responsible for incomplete work.
              </p>
            </ConceptBlock>

            {/* Advanced Re-testing Scenarios */}
            <ConceptBlock title="7. Advanced Re-testing Scenarios">
              <p>
                <strong className="text-elec-yellow">Multiple Test Requirements:</strong>
              </p>
              <p>Some faults require multiple re-tests to fully verify rectification:</p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Earth fault:</strong> IR test (L-E, N-E) + RCD operation test
                </li>
                <li>
                  <strong>Damaged cable:</strong> Continuity + Insulation resistance + Zs
                </li>
                <li>
                  <strong>Accessory replacement:</strong> Polarity + Functional operation + IR
                </li>
              </ul>

              <p>
                <strong className="text-elec-yellow">System-Wide Verification:</strong>
              </p>
              <p>
                After major rectifications, consider testing related circuits to ensure no secondary
                effects were introduced.
              </p>
            </ConceptBlock>

            {/* Professional Success Through Re-testing */}
            <ConceptBlock title="8. Professional Success Through Proper Re-testing">
              <p>
                <strong className="text-elec-yellow">Career Development Benefits:</strong>
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Client confidence:</strong> Proper verification builds trust and repeat
                  business
                </li>
                <li>
                  <strong>Legal protection:</strong> Documented re-testing provides liability
                  coverage
                </li>
                <li>
                  <strong>Professional reputation:</strong> Thorough work sets you apart from
                  competitors
                </li>
                <li>
                  <strong>Competency evidence:</strong> Systematic approach demonstrates skill level
                </li>
              </ul>

              <p>
                <strong className="text-elec-yellow">Building Industry Credibility:</strong>
              </p>
              <p>
                Electricians who consistently verify their work through proper re-testing earn
                reputations as thorough professionals. This attention to detail often leads to
                supervisory roles and higher-value contracts.
              </p>
            </ConceptBlock>

            <FAQ items={faqs} />

            {/* Summary */}
            <ConceptBlock title="Summary: The Re-testing Imperative">
              <p>
                Re-testing after rectification isn't just an AM2 requirement - it's fundamental to
                electrical safety and professional competence. Every fix must be verified to ensure
                the circuit is safe and compliant.
              </p>

              <p>
                <strong className="text-elec-yellow">Remember the Golden Rules:</strong>
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>Every rectification requires an appropriate re-test</li>
                <li>Match the test to the fault type corrected</li>
                <li>Record realistic results with proper units</li>
                <li>Confirm BS 7671 compliance explicitly</li>
                <li>Document that the installation is now safe</li>
              </ul>

              <p>
                Skipping re-testing guarantees lost marks in AM2, but more importantly, it
                compromises safety and professional standards.
              </p>
            </ConceptBlock>

            <KeyTakeaways
              points={[
                "Re-test isn't optional — BS 7671 Reg 643.1 requires verification after any alteration. AM2 marks reflect that.",
                'Match the test to the fault: open → continuity. Short → IR. Earth fault → IR + RCD ×1 IΔn. High-resistance → Zs. Polarity → polarity at accessory.',
                'Earth faults always need TWO re-tests: IR confirms the fault path is gone, RCD operation test confirms the protective device still works (Reg 643.10).',
                "Cite specific values: '> 1 MΩ minimum', 'within 1.37 Ω for 32A Type B', 'trip within 300 ms at ×1 IΔn'. Real numbers prove real understanding.",
                "Use real measured values, not idealised book numbers. Real readings have noise — 0.18 Ω, 199 MΩ, 0.42 Ω. That's what verification looks like.",
              ]}
            />

            {/* Quiz Section */}
            <div className="border-t border-white/10 pt-8">
              <Quiz title="Re-testing Procedures Quiz" questions={quizQuestions} />
            </div>

            {/* Navigation */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <Link
                to="/study-centre/apprentice/am2/module5/section4"
                className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous
                </div>
                <div className="mt-1 text-[14px] font-semibold text-white truncate">
                  Fault Rectification
                </div>
              </Link>
              <Link
                to="/study-centre/apprentice/am2/module5/section6"
                className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 text-[14px] font-semibold text-black truncate">
                  Quick Reference Sheet
                </div>
              </Link>
            </div>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default AM2Module5Section5;
