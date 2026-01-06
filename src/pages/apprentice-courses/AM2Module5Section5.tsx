import { ArrowLeft, ArrowRight, AlertTriangle, CheckCircle, Target, RotateCcw, Lightbulb, BookOpen, Wrench, ChevronLeft, ChevronRight, Zap, Eye, Settings, TestTube, FileText, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
      explanation: "Including proper units (Ω, MΩ, V, ms) demonstrates professional documentation standards and technical accuracy."
    },
    {
      id: 10,
      question: "What's the golden rule for rectification and re-testing answers?",
      options: ["Fix first, test later", "Always link rectification with appropriate re-test", "Test everything", "Only test if asked"],
      correctAnswer: 1,
      explanation: "Always link rectification actions with the specific re-test that proves the fault has been corrected."
    }
  ];

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-2">
            <Button variant="ghost" className="min-h-[44px] p-3 text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
              <Link to="..">
                <ArrowLeft className="w-4 h-4 mr-1 sm:mr-2" />
                <span className="hidden xs:inline">Back to Module 5</span>
                <span className="xs:hidden">Back</span>
              </Link>
            </Button>
            <div className="flex items-center gap-2">
              <Button variant="ghost" className="text-white hover:text-white p-2" asChild>
                <Link to="../section4">
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline ml-1">Section 4</span>
                </Link>
              </Button>
              <Button variant="ghost" className="text-white hover:text-white p-2" asChild>
                <Link to="../section6">
                  <span className="hidden sm:inline mr-1">Section 6</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-6 sm:space-y-8">
        {/* Title Section */}
        <div className="mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-elec-yellow/10 text-elec-yellow text-sm font-medium rounded-full mb-4">
            <RotateCcw className="w-4 h-4" />
            Module 5 – Section 5
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            Re-testing Procedures After Fault Rectification
          </h1>
          <p className="text-sm sm:text-base text-white mb-6 sm:mb-8 leading-relaxed">
            In AM2, every rectified fault must be followed by re-testing. This proves that the fault has been corrected and that the circuit now complies with BS 7671. It also shows the assessor that you understand the professional responsibility of leaving installations safe after work.
          </p>
          <p className="text-sm sm:text-base text-white leading-relaxed">
            Skipping re-testing is one of the easiest ways to lose marks in the fault-finding section, even if you diagnosed the fault correctly.
          </p>
        </div>

        {/* Critical Warning */}
        <Card className="bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 dark:text-elec-yellow mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2 text-sm sm:text-base">
                  CRITICAL: Re-testing is Mandatory for Every Rectification
                </h3>
                <p className="text-xs sm:text-sm text-red-700 dark:text-elec-yellow mb-3 leading-relaxed">
                  Forgetting to state the appropriate re-test after rectification will result in lost marks, even if your fault diagnosis was completely correct.
                </p>
                <p className="text-xs sm:text-sm text-red-700 dark:text-elec-yellow font-medium leading-relaxed">
                  Every fix must be verified — this demonstrates professional competence and compliance with BS 7671 Part 6.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Learning Outcomes */}
        <Card className="bg-transparent border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Learning Outcomes
            </h2>
            <p className="text-xs sm:text-sm text-white mb-4">
              By the end of this section, you should be able to:
            </p>
            <ul className="space-y-2 text-xs sm:text-xs sm:text-sm text-white">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                State why re-testing after rectification is mandatory for compliance
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Match each fault type to the correct verification test
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Carry out re-tests methodically and record results professionally
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Demonstrate complete diagnose → rectify → verify process
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Understand what assessors expect in re-testing documentation
              </li>
            </ul>
          </div>
        </Card>

        {/* Why Re-testing Matters */}
        <Card className="bg-transparent border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Target className="w-5 h-5" />
              1. Why Re-testing Matters
            </h2>
            
            <div className="space-y-4">
              <div className="border border-white/10 rounded-lg p-4">
                <h4 className="font-medium text-white mb-3">Essential Reasons for Re-testing:</h4>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow font-bold">•</span>
                    <span><strong>Safety Verification:</strong> Confirms the circuit is now safe to use</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow font-bold">•</span>
                    <span><strong>Proof of Rectification:</strong> Demonstrates that fixes were carried out correctly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow font-bold">•</span>
                    <span><strong>Hidden Fault Detection:</strong> Prevents secondary faults being left in place</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow font-bold">•</span>
                    <span><strong>BS 7671 Compliance:</strong> Satisfies Part 6 verification requirements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow font-bold">•</span>
                    <span><strong>Professional Documentation:</strong> Provides evidence for certification</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        <InlineCheck 
          id={quickCheckQuestions[0].id}
          question={quickCheckQuestions[0].question}
          options={quickCheckQuestions[0].options}
          correctIndex={quickCheckQuestions[0].correctIndex}
          explanation={quickCheckQuestions[0].explanation}
        />

        {/* Re-testing Requirements by Fault Type */}
        <Card className="bg-transparent border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <TestTube className="w-5 h-5" />
              2. Re-testing Requirements by Fault Type
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="border border-white/10 rounded-lg p-4">
                <h4 className="font-medium text-white mb-3 text-sm sm:text-base">Open Circuit Faults:</h4>
                <ul className="text-xs sm:text-sm text-white space-y-1">
                  <li>• <strong>Fault:</strong> Complete break in conductor path</li>
                  <li>• <strong>Re-test:</strong> Continuity test between conductor ends</li>
                  <li>• <strong>Expected result:</strong> Low resistance reading (≤0.05Ω per metre)</li>
                  <li>• <strong>Tool:</strong> Continuity tester with 200mA test current</li>
                </ul>
              </div>
              
              <div className="border border-white/10 rounded-lg p-4">
                <h4 className="font-medium text-white mb-3 text-sm sm:text-base">Short Circuit Faults:</h4>
                <ul className="text-xs sm:text-sm text-white space-y-1">
                  <li>• <strong>Fault:</strong> Direct connection between conductors</li>
                  <li>• <strong>Re-test:</strong> Insulation resistance between conductors</li>
                  <li>• <strong>Expected result:</strong> ≥1MΩ (minimum acceptable)</li>
                  <li>• <strong>Tool:</strong> Insulation resistance tester at 500V</li>
                </ul>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <div className="border border-white/10 rounded-lg p-4">
                <h4 className="font-medium text-white mb-3 text-sm sm:text-base">High Resistance Connections:</h4>
                <ul className="text-xs sm:text-sm text-white space-y-1">
                  <li>• <strong>Fault:</strong> Poor connection causing high resistance</li>
                  <li>• <strong>Re-test:</strong> Earth fault loop impedance (Zs)</li>
                  <li>• <strong>Expected result:</strong> Within acceptable limits for circuit</li>
                  <li>• <strong>Also check:</strong> Continuity at the connection point</li>
                </ul>
              </div>
              
              <div className="border border-white/10 rounded-lg p-4">
                <h4 className="font-medium text-white mb-3 text-sm sm:text-base">Polarity Errors:</h4>
                <ul className="text-xs sm:text-sm text-white space-y-1">
                  <li>• <strong>Fault:</strong> Incorrect L/N connections</li>
                  <li>• <strong>Re-test:</strong> Polarity test at outlets/switches</li>
                  <li>• <strong>Expected result:</strong> Correct L/N identification</li>
                  <li>• <strong>Tool:</strong> Proving unit or polarity tester</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        <InlineCheck 
          id={quickCheckQuestions[1].id}
          question={quickCheckQuestions[1].question}
          options={quickCheckQuestions[1].options}
          correctIndex={quickCheckQuestions[1].correctIndex}
          explanation={quickCheckQuestions[1].explanation}
        />

        {/* What Assessors Look For */}
        <Card className="bg-transparent border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Eye className="w-5 h-5" />
              3. What Assessors Look For
            </h2>
            
            <div className="space-y-6">
              <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30 rounded-lg p-4">
                <h4 className="font-medium text-green-800 dark:text-green-200 mb-3">Key Assessment Criteria:</h4>
                <ul className="text-sm text-green-700 dark:text-green-300 space-y-2">
                  <li>• <strong>Clear linkage:</strong> Every rectification must be followed by appropriate re-test</li>
                  <li>• <strong>Correct test method:</strong> Right test for the fault type identified</li>
                  <li>• <strong>Realistic results:</strong> Recorded values that make sense for the circuit</li>
                  <li>• <strong>Professional documentation:</strong> Clear, legible records with proper units</li>
                  <li>• <strong>Safety confirmation:</strong> Statement that installation is now safe</li>
                </ul>
              </div>
              
              <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/30 rounded-lg p-4">
                <h4 className="font-medium text-amber-800 dark:text-amber-200 mb-3">Professional Testing Technique:</h4>
                <p className="text-sm text-amber-700 dark:text-amber-300 mb-3">
                  Assessors want to see that you understand the <em>purpose</em> of each re-test, not just the procedure.
                </p>
                <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1">
                  <li>• Explain why this specific test proves the fault is rectified</li>
                  <li>• Use proper terminology (not "check" but "re-test continuity")</li>
                  <li>• Include measurement units (Ω, MΩ, V, ms)</li>
                  <li>• State compliance with relevant BS 7671 requirements</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* Common Mistakes */}
        <Card className="bg-red-500/20 border-border/30 hover:border-red-300/40 transition-all duration-300 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-red-800 dark:text-red-200 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              4. Common Candidate Mistakes
            </h2>
            
            <div className="space-y-4">
              <div className="border border-red-300 dark:border-red-700 rounded-lg p-4">
                <h4 className="font-medium text-red-800 dark:text-red-200 mb-3">Top Mistakes That Lose Marks:</h4>
                <ul className="text-sm text-red-700 dark:text-elec-yellow space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">✗</span>
                    <span><strong>Forgetting re-test:</strong> Stating rectification without mentioning verification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">✗</span>
                    <span><strong>Wrong test method:</strong> Using Zs when IR is needed, or vice versa</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">✗</span>
                    <span><strong>Unrealistic values:</strong> Recording exactly 0.00Ω or perfect book answers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">✗</span>
                    <span><strong>Missing units:</strong> Recording "2.5" instead of "2.5Ω"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">✗</span>
                    <span><strong>No safety confirmation:</strong> Failing to state installation is now safe</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        <InlineCheck 
          id={quickCheckQuestions[2].id}
          question={quickCheckQuestions[2].question}
          options={quickCheckQuestions[2].options}
          correctIndex={quickCheckQuestions[2].correctIndex}
          explanation={quickCheckQuestions[2].explanation}
        />

        {/* Professional Best Practices */}
        <Card className="bg-transparent border-elec-yellow/30 hover:border-elec-yellow/30 transition-all duration-300 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-blue-800 dark:text-blue-200 mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5" />
              5. Professional Re-testing Best Practices
            </h2>
            
            <div className="space-y-4">
              <div className="border border-blue-300 dark:border-blue-700 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-3">The "Fix and Verify" Formula:</h4>
                <p className="text-sm text-blue-700 dark:text-elec-yellow mb-3">
                  Always structure your answers as: <strong>Action + Re-test + Result + Compliance</strong>
                </p>
                <div className="bg-blue-100 dark:bg-blue-900/30 rounded p-3">
                  <p className="text-sm text-blue-800 dark:text-blue-200 font-mono">
                    "Reconnect CPC at socket outlet → Re-test continuity → 0.15Ω recorded → Complies with BS 7671"
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="border border-blue-300 dark:border-blue-700 rounded-lg p-4">
                  <h5 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Time Management Tips:</h5>
                  <ul className="text-sm text-blue-700 dark:text-elec-yellow space-y-1">
                    <li>• Plan rectification and re-test together</li>
                    <li>• Have test equipment ready before rectifying</li>
                    <li>• Document as you work, not afterwards</li>
                  </ul>
                </div>
                
                <div className="border border-blue-300 dark:border-blue-700 rounded-lg p-4">
                  <h5 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Documentation Standards:</h5>
                  <ul className="text-sm text-blue-700 dark:text-elec-yellow space-y-1">
                    <li>• Use technical terminology consistently</li>
                    <li>• Include all relevant measurement units</li>
                    <li>• Reference BS 7671 compliance explicitly</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Real-World Applications */}
        <Card className="bg-transparent border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Wrench className="w-5 h-5" />
              6. Real-World Application Examples
            </h2>
            
            <div className="space-y-4">
              <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30 rounded-lg p-4">
                <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">✓ CORRECT Example:</h4>
                <p className="text-sm text-green-700 dark:text-green-300 italic mb-2">
                  "Open circuit detected in ring final circuit. Loose connection found at socket 4."
                </p>
                <p className="text-sm text-green-700 dark:text-green-300 font-medium">
                  "Rectification: Remake connection at socket 4 terminals → Re-test: Ring final circuit continuity → Result: 0.24Ω recorded → Complies with BS 7671 Table I1"
                </p>
              </div>
              
              <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30 rounded-lg p-4">
                <h4 className="font-medium text-red-800 dark:text-red-200 mb-2">✗ INCORRECT Example:</h4>
                <p className="text-sm text-red-700 dark:text-elec-yellow italic mb-2">
                  "Open circuit detected in ring final circuit. Loose connection found at socket 4."
                </p>
                <p className="text-sm text-red-700 dark:text-elec-yellow">
                  "Fixed the connection." <em>(No re-test mentioned - marks lost!)</em>
                </p>
              </div>
              
              <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/30 rounded-lg p-4">
                <h4 className="font-medium text-amber-800 dark:text-amber-200 mb-2">Industry Reality Check:</h4>
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  An electrician fixed a loose CPC connection but didn't re-test Zs. The circuit was later found to still have high earth loop impedance, creating a safety hazard. The client held the electrician responsible for incomplete work.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Advanced Re-testing Scenarios */}
        <Card className="bg-transparent border-elec-yellow/30 hover:border-elec-yellow/30 transition-all duration-300 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-purple-800 dark:text-purple-200 mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5" />
              7. Advanced Re-testing Scenarios
            </h2>
            
            <div className="space-y-4">
              <div className="border border-purple-300 dark:border-purple-700 rounded-lg p-4">
                <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-3">Multiple Test Requirements:</h4>
                <p className="text-sm text-purple-700 dark:text-elec-yellow mb-3">
                  Some faults require multiple re-tests to fully verify rectification:
                </p>
                <ul className="text-sm text-purple-700 dark:text-elec-yellow space-y-2">
                  <li>• <strong>Earth fault:</strong> IR test (L-E, N-E) + RCD operation test</li>
                  <li>• <strong>Damaged cable:</strong> Continuity + Insulation resistance + Zs</li>
                  <li>• <strong>Accessory replacement:</strong> Polarity + Functional operation + IR</li>
                </ul>
              </div>
              
              <div className="border border-purple-300 dark:border-purple-700 rounded-lg p-4">
                <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-3">System-Wide Verification:</h4>
                <p className="text-sm text-purple-700 dark:text-elec-yellow">
                  After major rectifications, consider testing related circuits to ensure no secondary effects were introduced.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Professional Success Through Re-testing */}
        <Card className="bg-transparent border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              8. Professional Success Through Proper Re-testing
            </h2>
            
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-elec-yellow/10 to-elec-yellow/5 border border-elec-yellow/30 rounded-lg p-4">
                <h4 className="font-medium text-white mb-3">Career Development Benefits:</h4>
                <ul className="text-sm text-white space-y-2">
                  <li>• <strong>Client confidence:</strong> Proper verification builds trust and repeat business</li>
                  <li>• <strong>Legal protection:</strong> Documented re-testing provides liability coverage</li>
                  <li>• <strong>Professional reputation:</strong> Thorough work sets you apart from competitors</li>
                  <li>• <strong>Competency evidence:</strong> Systematic approach demonstrates skill level</li>
                </ul>
              </div>
              
              <div className="border border-white/10 rounded-lg p-4">
                <h4 className="font-medium text-white mb-3">Building Industry Credibility:</h4>
                <p className="text-sm text-white">
                  Electricians who consistently verify their work through proper re-testing earn reputations as thorough professionals. 
                  This attention to detail often leads to supervisory roles and higher-value contracts.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Summary */}
        <Card className="bg-transparent border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Summary: The Re-testing Imperative
            </h2>
            
            <div className="space-y-4">
              <p className="text-sm text-white leading-relaxed">
                Re-testing after rectification isn't just an AM2 requirement — it's fundamental to electrical safety and professional competence. 
                Every fix must be verified to ensure the circuit is safe and compliant.
              </p>
              
              <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
                <h4 className="font-medium text-white mb-3">Remember the Golden Rules:</h4>
                <ul className="text-sm text-white space-y-1">
                  <li>• Every rectification requires an appropriate re-test</li>
                  <li>• Match the test to the fault type corrected</li>
                  <li>• Record realistic results with proper units</li>
                  <li>• Confirm BS 7671 compliance explicitly</li>
                  <li>• Document that the installation is now safe</li>
                </ul>
              </div>
              
              <p className="text-sm text-white font-medium">
                Skipping re-testing guarantees lost marks in AM2, but more importantly, it compromises safety and professional standards.
              </p>
            </div>
          </div>
        </Card>

        {/* Quiz Section */}
        <Card className="bg-transparent border-elec-yellow/30">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Test Your Knowledge
            </h2>
            <p className="text-sm text-white mb-6">
              Test your understanding of re-testing procedures after fault rectification:
            </p>
            <Quiz 
              questions={quizQuestions}
              title="Re-testing Procedures Quiz"
            />
          </div>
        </Card>

        {/* Bottom Navigation */}
        <div className="mt-12 pt-8 border-t border-white/10 space-y-4">
          {/* Previous Section */}
          <Button variant="outline" className="w-full h-auto p-4 bg-[#1a1a1a] border-border text-white hover:bg-[#1a1a1a]/80" asChild>
            <Link to="../section4">
              <div className="flex items-center justify-center gap-3">
                <ArrowLeft className="w-5 h-5" />
                <span className="text-base font-medium">Previous: Fault Rectification</span>
              </div>
            </Link>
          </Button>

          {/* Next Section */}
          <Button variant="outline" className="w-full h-auto p-4 bg-elec-yellow border-elec-yellow text-black hover:bg-elec-yellow/80" asChild>
            <Link to="../section6">
              <div className="flex items-center justify-center gap-3">
                <span className="text-base font-medium">Next: Quick Reference Sheet</span>
                <ArrowRight className="w-5 h-5" />
               </div>
             </Link>
           </Button>
         </div>
       </div>
     </div>
   );
 };
 
 export default AM2Module5Section5;