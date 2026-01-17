import { RotateCcw, Target, TestTube, Eye, Lightbulb, BookOpen, Wrench, Shield, AlertTriangle } from "lucide-react";
import { AM2SectionLayout } from "@/components/apprentice-courses/AM2SectionLayout";
import { AM2HeroSection } from "@/components/apprentice-courses/AM2HeroSection";
import { AM2ContentCard } from "@/components/apprentice-courses/AM2ContentCard";
import { AM2NavigationFooter } from "@/components/apprentice-courses/AM2NavigationFooter";
import { AM2CriticalWarning } from "@/components/apprentice-courses/AM2CriticalWarning";
import { AM2LearningOutcomes } from "@/components/apprentice-courses/AM2LearningOutcomes";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const AM2Module5Section5 = () => {
  useSEO(
    "Re-testing Procedures After Fault Rectification | AM2 Module 5 Section 5",
    "Master re-testing requirements after fault rectification in AM2. Learn which tests prove fixes, BS 7671 compliance and what assessors expect."
  );

  const quickCheckQuestions: Array<{
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }> = [
    {
      id: "re-test-requirement",
      question: "Which part of BS 7671 covers verification requirements after rectification?",
      options: [
        "Part 5 - Selection and erection of equipment",
        "Part 6 - Inspection and testing",
        "Part 4 - Protection for safety",
        "Part 7 - Special installations"
      ],
      correctIndex: 1,
      explanation: "BS 7671 Part 6 covers all inspection and testing requirements, including verification after alteration or repair."
    },
    {
      id: "polarity-retest",
      question: "If you fix a reversed polarity at a socket, what's the appropriate re-test?",
      options: [
        "Earth fault loop impedance test",
        "Insulation resistance test",
        "Polarity test at the socket outlet",
        "RCD operation test"
      ],
      correctIndex: 2,
      explanation: "After correcting polarity errors, you must re-test polarity at the specific outlet to confirm the correction."
    },
    {
      id: "open-circuit-retest",
      question: "What re-test is required after fixing an open circuit fault?",
      options: [
        "Insulation resistance test",
        "Continuity test of conductors",
        "Earth fault loop impedance test",
        "RCD operation test"
      ],
      correctIndex: 1,
      explanation: "Open circuit faults are proven rectified by demonstrating continuity between conductor ends."
    }
  ];

  const quizQuestions = [
    {
      id: 1,
      question: "Why is re-testing mandatory after rectification?",
      options: ["To waste time", "To prove the circuit is now safe and compliant", "To use more test equipment", "To impress the assessor"],
      correctAnswer: 1,
      explanation: "Re-testing proves the fault has been corrected and the circuit now complies with BS 7671 safety requirements."
    },
    {
      id: 2,
      question: "What part of BS 7671 covers verification requirements?",
      options: ["Part 4", "Part 5", "Part 6", "Part 7"],
      correctAnswer: 2,
      explanation: "BS 7671 Part 6 covers inspection and testing, including verification after alteration or repair."
    },
    {
      id: 3,
      question: "What re-test is needed after fixing an open circuit?",
      options: ["Insulation resistance", "Continuity of conductors", "RCD operation", "Polarity"],
      correctAnswer: 1,
      explanation: "Open circuit faults are verified as fixed by re-testing continuity between conductor ends."
    },
    {
      id: 4,
      question: "What re-test proves a short circuit has been cleared?",
      options: ["Continuity", "Insulation resistance between conductors", "Earth loop impedance", "RCD test"],
      correctAnswer: 1,
      explanation: "Short circuits are proven cleared by re-testing insulation resistance between the previously shorted conductors."
    },
    {
      id: 5,
      question: "What test confirms that polarity is now correct?",
      options: ["Continuity test", "Insulation test", "Polarity test at outlets/switches", "Earth loop test"],
      correctAnswer: 2,
      explanation: "Polarity errors require re-testing polarity at the specific outlets or switches that were corrected."
    },
    {
      id: 6,
      question: "Which test confirms a high resistance fault is rectified?",
      options: ["Insulation resistance", "Earth fault loop impedance (Zs)", "RCD operation", "Functional testing"],
      correctAnswer: 1,
      explanation: "High resistance faults in protective conductors are verified by re-testing earth fault loop impedance (Zs)."
    },
    {
      id: 7,
      question: "True or false: You physically re-test all circuits during AM2 fault finding.",
      options: ["True", "False - you state which re-test proves rectification"],
      correctAnswer: 1,
      explanation: "In AM2 fault finding, you state which re-test would prove rectification rather than physically performing all tests."
    },
    {
      id: 8,
      question: "What happens if you forget to state a re-test in AM2?",
      options: ["Nothing", "You lose marks even if fault diagnosis was correct", "Only minor point deduction", "Assessor will remind you"],
      correctAnswer: 1,
      explanation: "Forgetting to state the appropriate re-test results in lost marks, even with correct fault diagnosis."
    },
    {
      id: 9,
      question: "Why should you include measurement units in recorded results?",
      options: ["To show precision", "To meet professional documentation standards", "To confuse assessors", "Units are optional"],
      correctAnswer: 1,
      explanation: "Including proper units (Ohms, MOhms, V, ms) demonstrates professional documentation standards and technical accuracy."
    },
    {
      id: 10,
      question: "What's the golden rule for rectification and re-testing answers?",
      options: ["Fix first, test later", "Always link rectification with appropriate re-test", "Test everything", "Only test if asked"],
      correctAnswer: 1,
      explanation: "Always link rectification actions with the specific re-test that proves the fault has been corrected."
    }
  ];

  const learningOutcomes = [
    "State why re-testing after rectification is mandatory for compliance",
    "Match each fault type to the correct verification test",
    "Carry out re-tests methodically and record results professionally",
    "Demonstrate complete diagnose → rectify → verify process",
    "Understand what assessors expect in re-testing documentation"
  ];

  return (
    <AM2SectionLayout
      backHref="/study-centre/apprentice/am2/module5"
      breadcrumbs={[
        { label: "AM2", href: "/study-centre/apprentice/am2" },
        { label: "Module 5", href: "/study-centre/apprentice/am2/module5" },
        { label: "Section 5" }
      ]}
    >
      <AM2HeroSection
        icon={RotateCcw}
        title="Re-testing Procedures After Fault Rectification"
        description="In AM2, every rectified fault must be followed by re-testing. This proves that the fault has been corrected and that the circuit now complies with BS 7671. It also shows the assessor that you understand the professional responsibility of leaving installations safe after work."
        badge="Module 5 - Section 5"
      />

      <div className="space-y-6">
        {/* Introduction */}
        <AM2ContentCard>
          <p className="text-ios-body text-white/80 leading-relaxed">
            Skipping re-testing is one of the easiest ways to lose marks in the fault-finding section, even if you diagnosed the fault correctly.
          </p>
        </AM2ContentCard>

        {/* Critical Warning */}
        <AM2CriticalWarning title="CRITICAL: Re-testing is Mandatory for Every Rectification">
          <p className="text-ios-callout text-white/80 mb-3 leading-relaxed">
            Forgetting to state the appropriate re-test after rectification will result in lost marks, even if your fault diagnosis was completely correct.
          </p>
          <p className="text-ios-callout text-white/80 font-medium leading-relaxed">
            Every fix must be verified - this demonstrates professional competence and compliance with BS 7671 Part 6.
          </p>
        </AM2CriticalWarning>

        {/* Learning Outcomes */}
        <AM2LearningOutcomes outcomes={learningOutcomes} />

        {/* Why Re-testing Matters */}
        <AM2ContentCard
          title="1. Why Re-testing Matters"
          icon={Target}
        >
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h4 className="text-ios-headline font-semibold text-white mb-3">Essential Reasons for Re-testing:</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span className="text-ios-callout text-white/80"><strong className="text-white">Safety Verification:</strong> Confirms the circuit is now safe to use</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span className="text-ios-callout text-white/80"><strong className="text-white">Proof of Rectification:</strong> Demonstrates that fixes were carried out correctly</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span className="text-ios-callout text-white/80"><strong className="text-white">Hidden Fault Detection:</strong> Prevents secondary faults being left in place</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span className="text-ios-callout text-white/80"><strong className="text-white">BS 7671 Compliance:</strong> Satisfies Part 6 verification requirements</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span className="text-ios-callout text-white/80"><strong className="text-white">Professional Documentation:</strong> Provides evidence for certification</span>
              </li>
            </ul>
          </div>
        </AM2ContentCard>

        <InlineCheck
          id={quickCheckQuestions[0].id}
          question={quickCheckQuestions[0].question}
          options={quickCheckQuestions[0].options}
          correctIndex={quickCheckQuestions[0].correctIndex}
          explanation={quickCheckQuestions[0].explanation}
        />

        {/* Re-testing Requirements by Fault Type */}
        <AM2ContentCard
          title="2. Re-testing Requirements by Fault Type"
          icon={TestTube}
          accent
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-ios-headline font-semibold text-white mb-3">Open Circuit Faults:</h4>
              <ul className="space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-footnote text-white/70"><strong className="text-white/90">Fault:</strong> Complete break in conductor path</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-footnote text-white/70"><strong className="text-white/90">Re-test:</strong> Continuity test between conductor ends</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-footnote text-white/70"><strong className="text-white/90">Expected result:</strong> Low resistance reading (0.05 Ohms per metre or less)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-footnote text-white/70"><strong className="text-white/90">Tool:</strong> Continuity tester with 200mA test current</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-ios-headline font-semibold text-white mb-3">Short Circuit Faults:</h4>
              <ul className="space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-footnote text-white/70"><strong className="text-white/90">Fault:</strong> Direct connection between conductors</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-footnote text-white/70"><strong className="text-white/90">Re-test:</strong> Insulation resistance between conductors</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-footnote text-white/70"><strong className="text-white/90">Expected result:</strong> 1 MOhms or greater (minimum acceptable)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-footnote text-white/70"><strong className="text-white/90">Tool:</strong> Insulation resistance tester at 500V</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-ios-headline font-semibold text-white mb-3">High Resistance Connections:</h4>
              <ul className="space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-footnote text-white/70"><strong className="text-white/90">Fault:</strong> Poor connection causing high resistance</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-footnote text-white/70"><strong className="text-white/90">Re-test:</strong> Earth fault loop impedance (Zs)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-footnote text-white/70"><strong className="text-white/90">Expected result:</strong> Within acceptable limits for circuit</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-footnote text-white/70"><strong className="text-white/90">Also check:</strong> Continuity at the connection point</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-ios-headline font-semibold text-white mb-3">Polarity Errors:</h4>
              <ul className="space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-footnote text-white/70"><strong className="text-white/90">Fault:</strong> Incorrect L/N connections</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-footnote text-white/70"><strong className="text-white/90">Re-test:</strong> Polarity test at outlets/switches</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-footnote text-white/70"><strong className="text-white/90">Expected result:</strong> Correct L/N identification</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-footnote text-white/70"><strong className="text-white/90">Tool:</strong> Proving unit or polarity tester</span>
                </li>
              </ul>
            </div>
          </div>
        </AM2ContentCard>

        <InlineCheck
          id={quickCheckQuestions[1].id}
          question={quickCheckQuestions[1].question}
          options={quickCheckQuestions[1].options}
          correctIndex={quickCheckQuestions[1].correctIndex}
          explanation={quickCheckQuestions[1].explanation}
        />

        {/* What Assessors Look For */}
        <AM2ContentCard
          title="3. What Assessors Look For"
          icon={Eye}
        >
          <div className="space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-ios-headline font-semibold text-white mb-3">Key Assessment Criteria:</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-callout text-white/80"><strong className="text-white">Clear linkage:</strong> Every rectification must be followed by appropriate re-test</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-callout text-white/80"><strong className="text-white">Correct test method:</strong> Right test for the fault type identified</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-callout text-white/80"><strong className="text-white">Realistic results:</strong> Recorded values that make sense for the circuit</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-callout text-white/80"><strong className="text-white">Professional documentation:</strong> Clear, legible records with proper units</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-callout text-white/80"><strong className="text-white">Safety confirmation:</strong> Statement that installation is now safe</span>
                </li>
              </ul>
            </div>

            <div className="bg-amber-950/20 border border-amber-800/30 rounded-xl p-4">
              <h4 className="text-ios-headline font-semibold text-amber-200 mb-3">Professional Testing Technique:</h4>
              <p className="text-ios-callout text-white/80 mb-3">
                Assessors want to see that you understand the <em>purpose</em> of each re-test, not just the procedure.
              </p>
              <ul className="space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-footnote text-white/70">Explain why this specific test proves the fault is rectified</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-footnote text-white/70">Use proper terminology (not "check" but "re-test continuity")</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-footnote text-white/70">Include measurement units (Ohms, MOhms, V, ms)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-footnote text-white/70">State compliance with relevant BS 7671 requirements</span>
                </li>
              </ul>
            </div>
          </div>
        </AM2ContentCard>

        {/* Common Mistakes */}
        <AM2ContentCard
          title="4. Common Candidate Mistakes"
          icon={AlertTriangle}
        >
          <div className="bg-red-950/20 border border-red-800/30 rounded-xl p-4">
            <h4 className="text-ios-headline font-semibold text-red-200 mb-3">Top Mistakes That Lose Marks:</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">X</span>
                <span className="text-ios-callout text-white/80"><strong className="text-white">Forgetting re-test:</strong> Stating rectification without mentioning verification</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">X</span>
                <span className="text-ios-callout text-white/80"><strong className="text-white">Wrong test method:</strong> Using Zs when IR is needed, or vice versa</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">X</span>
                <span className="text-ios-callout text-white/80"><strong className="text-white">Unrealistic values:</strong> Recording exactly 0.00 Ohms or perfect book answers</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">X</span>
                <span className="text-ios-callout text-white/80"><strong className="text-white">Missing units:</strong> Recording "2.5" instead of "2.5 Ohms"</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">X</span>
                <span className="text-ios-callout text-white/80"><strong className="text-white">No safety confirmation:</strong> Failing to state installation is now safe</span>
              </li>
            </ul>
          </div>
        </AM2ContentCard>

        <InlineCheck
          id={quickCheckQuestions[2].id}
          question={quickCheckQuestions[2].question}
          options={quickCheckQuestions[2].options}
          correctIndex={quickCheckQuestions[2].correctIndex}
          explanation={quickCheckQuestions[2].explanation}
        />

        {/* Professional Best Practices */}
        <AM2ContentCard
          title="5. Professional Re-testing Best Practices"
          icon={Lightbulb}
          accent
        >
          <div className="space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-ios-headline font-semibold text-white mb-3">The "Fix and Verify" Formula:</h4>
              <p className="text-ios-callout text-white/80 mb-3">
                Always structure your answers as: <strong className="text-white">Action + Re-test + Result + Compliance</strong>
              </p>
              <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                <p className="text-ios-callout text-white/80 font-mono">
                  "Reconnect CPC at socket outlet → Re-test continuity → 0.15 Ohms recorded → Complies with BS 7671"
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h5 className="text-ios-callout font-semibold text-white mb-2">Time Management Tips:</h5>
                <ul className="space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span className="text-ios-footnote text-white/70">Plan rectification and re-test together</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span className="text-ios-footnote text-white/70">Have test equipment ready before rectifying</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span className="text-ios-footnote text-white/70">Document as you work, not afterwards</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h5 className="text-ios-callout font-semibold text-white mb-2">Documentation Standards:</h5>
                <ul className="space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span className="text-ios-footnote text-white/70">Use technical terminology consistently</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span className="text-ios-footnote text-white/70">Include all relevant measurement units</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span className="text-ios-footnote text-white/70">Reference BS 7671 compliance explicitly</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </AM2ContentCard>

        {/* Real-World Applications */}
        <AM2ContentCard
          title="6. Real-World Application Examples"
          icon={Wrench}
        >
          <div className="space-y-4">
            <div className="bg-green-950/20 border border-green-800/30 rounded-xl p-4">
              <h4 className="text-ios-headline font-semibold text-green-200 mb-3">CORRECT Example:</h4>
              <p className="text-ios-callout text-white/80 italic mb-2">
                "Open circuit detected in ring final circuit. Loose connection found at socket 4."
              </p>
              <p className="text-ios-callout text-white/80 font-medium">
                "Rectification: Remake connection at socket 4 terminals → Re-test: Ring final circuit continuity → Result: 0.24 Ohms recorded → Complies with BS 7671 Table I1"
              </p>
            </div>

            <div className="bg-red-950/20 border border-red-800/30 rounded-xl p-4">
              <h4 className="text-ios-headline font-semibold text-red-200 mb-3">INCORRECT Example:</h4>
              <p className="text-ios-callout text-white/80 italic mb-2">
                "Open circuit detected in ring final circuit. Loose connection found at socket 4."
              </p>
              <p className="text-ios-callout text-white/80">
                "Fixed the connection." <em>(No re-test mentioned - marks lost!)</em>
              </p>
            </div>

            <div className="bg-amber-950/20 border border-amber-800/30 rounded-xl p-4">
              <h4 className="text-ios-headline font-semibold text-amber-200 mb-3">Industry Reality Check:</h4>
              <p className="text-ios-callout text-white/80">
                An electrician fixed a loose CPC connection but didn't re-test Zs. The circuit was later found to still have high earth loop impedance, creating a safety hazard. The client held the electrician responsible for incomplete work.
              </p>
            </div>
          </div>
        </AM2ContentCard>

        {/* Advanced Re-testing Scenarios */}
        <AM2ContentCard
          title="7. Advanced Re-testing Scenarios"
          icon={Target}
        >
          <div className="space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-ios-headline font-semibold text-white mb-3">Multiple Test Requirements:</h4>
              <p className="text-ios-callout text-white/80 mb-3">
                Some faults require multiple re-tests to fully verify rectification:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-callout text-white/80"><strong className="text-white">Earth fault:</strong> IR test (L-E, N-E) + RCD operation test</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-callout text-white/80"><strong className="text-white">Damaged cable:</strong> Continuity + Insulation resistance + Zs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-callout text-white/80"><strong className="text-white">Accessory replacement:</strong> Polarity + Functional operation + IR</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-ios-headline font-semibold text-white mb-3">System-Wide Verification:</h4>
              <p className="text-ios-callout text-white/80">
                After major rectifications, consider testing related circuits to ensure no secondary effects were introduced.
              </p>
            </div>
          </div>
        </AM2ContentCard>

        {/* Professional Success Through Re-testing */}
        <AM2ContentCard
          title="8. Professional Success Through Proper Re-testing"
          icon={Shield}
        >
          <div className="space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-ios-headline font-semibold text-white mb-3">Career Development Benefits:</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-callout text-white/80"><strong className="text-white">Client confidence:</strong> Proper verification builds trust and repeat business</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-callout text-white/80"><strong className="text-white">Legal protection:</strong> Documented re-testing provides liability coverage</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-callout text-white/80"><strong className="text-white">Professional reputation:</strong> Thorough work sets you apart from competitors</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-callout text-white/80"><strong className="text-white">Competency evidence:</strong> Systematic approach demonstrates skill level</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-ios-headline font-semibold text-white mb-3">Building Industry Credibility:</h4>
              <p className="text-ios-callout text-white/80">
                Electricians who consistently verify their work through proper re-testing earn reputations as thorough professionals. This attention to detail often leads to supervisory roles and higher-value contracts.
              </p>
            </div>
          </div>
        </AM2ContentCard>

        {/* Summary */}
        <AM2ContentCard
          title="Summary: The Re-testing Imperative"
          icon={BookOpen}
          accent
        >
          <div className="space-y-4">
            <p className="text-ios-body text-white/80 leading-relaxed">
              Re-testing after rectification isn't just an AM2 requirement - it's fundamental to electrical safety and professional competence. Every fix must be verified to ensure the circuit is safe and compliant.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-ios-headline font-semibold text-white mb-3">Remember the Golden Rules:</h4>
              <ul className="space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-callout text-white/80">Every rectification requires an appropriate re-test</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-callout text-white/80">Match the test to the fault type corrected</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-callout text-white/80">Record realistic results with proper units</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-callout text-white/80">Confirm BS 7671 compliance explicitly</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-callout text-white/80">Document that the installation is now safe</span>
                </li>
              </ul>
            </div>

            <p className="text-ios-body text-white/80 font-medium">
              Skipping re-testing guarantees lost marks in AM2, but more importantly, it compromises safety and professional standards.
            </p>
          </div>
        </AM2ContentCard>

        {/* Quiz Section */}
        <div className="border-t border-white/10 pt-8">
          <Quiz
            title="Re-testing Procedures Quiz"
            questions={quizQuestions}
          />
        </div>

        {/* Navigation */}
        <AM2NavigationFooter
          previousHref="../section4"
          previousLabel="Fault Rectification"
          nextHref="../section6"
          nextLabel="Quick Reference Sheet"
          currentSection={5}
          totalSections={6}
        />
      </div>
    </AM2SectionLayout>
  );
};

export default AM2Module5Section5;
