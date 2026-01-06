import { ArrowLeft, ArrowRight, AlertTriangle, CheckCircle, Target, Search, Lightbulb, BookOpen, Wrench, ChevronLeft, ChevronRight, Zap, Eye, Settings, Shield, FileText, CheckSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const AM2Module5Section4 = () => {
  useSEO(
    "Proving and Recording Rectification | AM2 Module 5 Section 4",
    "Master professional rectification recording in AM2 assessments. Learn to describe repairs clearly and prove circuit safety after fault correction."
  );

  const quickCheckQuestions: Array<{
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }> = [
    {
      id: "polarity-rectification",
      question: "If polarity is reversed at a socket, what rectification must you record?",
      options: [
        "Fix the polarity problem",
        "Replace the socket",
        "Swap line and neutral connections into correct terminals at the socket outlet",
        "Test the polarity again"
      ],
      correctIndex: 2,
      explanation: "Specific, professional language is required: exactly what needs to be done and where, not vague phrases like 'fix'."
    },
    {
      id: "high-resistance-test",
      question: "After correcting a high resistance joint, which test proves rectification?",
      options: [
        "Continuity test",
        "Re-check Zs to confirm impedance is now within limits",
        "Insulation resistance test",
        "RCD test"
      ],
      correctIndex: 1,
      explanation: "High resistance joints affect earth fault loop impedance (Zs), so re-testing Zs proves the repair is effective."
    },
    {
      id: "rectification-components",
      question: "What are the three essential components of professional rectification recording?",
      options: [
        "Location + Time + Cost",
        "Action + Location + Re-test",
        "Problem + Solution + Signature",
        "Fault + Tools + Materials"
      ],
      correctIndex: 1,
      explanation: "Professional rectification must include: the specific action needed, exact location, and the re-test that proves safety."
    }
  ];

  const quizQuestions = [
    {
      id: 1,
      question: "Do you physically repair faults in AM2?",
      options: ["Yes, repairs must be completed", "No — just describe rectification and re-testing", "Only simple repairs", "Depends on the fault type"],
      correctAnswer: 1,
      explanation: "In AM2, you only describe what rectification would be needed and how you would prove it safe — no physical repairs are carried out."
    },
    {
      id: 2,
      question: "How should rectification be phrased?",
      options: ["As briefly as possible", "Using technical jargon", "Action + Location + Re-test", "In your own words"],
      correctAnswer: 2,
      explanation: "The simple rule for rectification phrasing is: Action (what to do) + Location (where) + Re-test (how to prove safe)."
    },
    {
      id: 3,
      question: "Give an example of rectification for an open circuit fault.",
      options: ["Fix the break", "Test continuity", "Reconnect line conductor at loose termination, then re-test continuity", "Replace the cable"],
      correctAnswer: 2,
      explanation: "Specific example: 'Reconnect line conductor at loose termination, then re-test continuity' shows exact action, location, and verification."
    },
    {
      id: 4,
      question: "What re-test confirms correction of a short circuit?",
      options: ["Continuity test", "Polarity test", "Insulation resistance test", "RCD test"],
      correctAnswer: 2,
      explanation: "Short circuits are detected by insulation resistance testing, so re-testing insulation resistance confirms the repair."
    },
    {
      id: 5,
      question: "What rectification is required for a reversed polarity at a socket?",
      options: ["Replace the socket", "Test again", "Swap conductors into correct terminals", "Call supervisor"],
      correctAnswer: 2,
      explanation: "Polarity faults require swapping line and neutral conductors into their correct terminals at the affected accessory."
    },
    {
      id: 6,
      question: "After remaking a high resistance joint, what test proves safety?",
      options: ["Visual inspection", "Continuity test", "Zs test to confirm impedance within limits", "Insulation resistance"],
      correctAnswer: 2,
      explanation: "High resistance joints affect earth fault loop impedance, so Zs testing proves the joint is now within acceptable limits."
    },
    {
      id: 7,
      question: "True or false: 'Fix fault' is acceptable wording for rectification.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation: "False. Vague wording like 'fix fault' scores zero marks. Professional, specific language describing exact actions is required."
    },
    {
      id: 8,
      question: "Why must you always include re-testing in your rectification statement?",
      options: ["It's required by law", "To prove the circuit is safe after repair", "To show your knowledge", "To waste time"],
      correctAnswer: 1,
      explanation: "Re-testing proves the circuit is safe and compliant after rectification — this is essential for professional electrical work."
    },
    {
      id: 9,
      question: "How should you record a faulty accessory fault?",
      options: ["Remove accessory", "Replace defective accessory with new unit, then re-test circuit", "Mark as dangerous", "Leave disconnected"],
      correctAnswer: 1,
      explanation: "Complete rectification includes replacement of faulty equipment and re-testing to ensure circuit integrity."
    },
    {
      id: 10,
      question: "What's the simple rule for rectification phrasing?",
      options: ["Keep it brief", "Use technical terms", "Action + Location + Re-test", "Copy from textbooks"],
      correctAnswer: 2,
      explanation: "The universal rule is: Action (what to do) + Location (where) + Re-test (how to prove safe)."
    }
  ];

  const faqs = [
    {
      question: "Do I physically repair the fault in AM2?",
      answer: "No — just describe rectification and re-testing. The assessment focuses on your ability to diagnose and specify the correct repair method."
    },
    {
      question: "What happens if I don't state the re-test?",
      answer: "You lose marks — proving safety is essential. The re-test demonstrates that you understand the complete electrical safety process."
    },
    {
      question: "Do I need to mention BS 7671 limits in rectification?",
      answer: "Not required, but stating 'within permitted values' shows good understanding and professional awareness."
    },
    {
      question: "Can I just say 'replace damaged accessory'?",
      answer: "You must also say 'and re-test circuit.' The re-testing component is essential for full marks."
    },
    {
      question: "What if I'm unsure how to phrase rectification?",
      answer: "Use the rule: Action + Location + Re-test. This format works for all fault types and ensures professional communication."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-2">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground p-2 sm:p-0 text-sm sm:text-base" asChild>
              <Link to="..">
                <ArrowLeft className="w-4 h-4 mr-1 sm:mr-2" />
                <span className="hidden xs:inline">Back to Module 5</span>
                <span className="xs:hidden">Back</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-6 sm:space-y-8">
        {/* Title Section */}
        <div className="mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-elec-yellow/10 text-elec-yellow text-sm font-medium rounded-full mb-4">
            <FileText className="w-4 h-4" />
            Module 5 – Section 4
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 sm:mb-6 leading-tight">
            Proving and Recording Rectification
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
            In AM2 fault diagnosis, identifying the fault is only half the task. The assessor also expects you to state how you would rectify it and then how you would prove it safe afterwards.
          </p>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Your answers must be clear, precise, and professional — vague phrases like "fix it" or "replace" won't score marks.
          </p>
        </div>

        {/* Critical Warning */}
        <Card className="bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 dark:text-elec-yellow mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2 text-sm sm:text-base">
                  CRITICAL: Professional Recording Required
                </h3>
                <p className="text-xs sm:text-sm text-red-700 dark:text-elec-yellow mb-3 leading-relaxed">
                  Vague phrases like "fix it" or "replace" score zero marks. Assessors want professional language that shows you understand both the problem and the complete solution.
                </p>
                <p className="text-xs sm:text-sm text-red-700 dark:text-elec-yellow font-medium leading-relaxed">
                  Every rectification statement must include: specific action + exact location + re-test procedure.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Learning Outcomes */}
        <Card className="bg-card border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Learning Outcomes
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mb-4">
              By the end of this section, you will be able to:
            </p>
            <ul className="space-y-2 text-xs sm:text-xs sm:text-sm text-foreground">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Clearly describe rectification steps for common AM2 fault types
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Record rectification in professional language suitable for certification
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                State the correct re-testing procedure after rectification
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Demonstrate a complete fault-finding cycle: diagnose → rectify → prove safe
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Avoid vague or incomplete reporting that loses marks
              </li>
            </ul>
          </div>
        </Card>

        {/* What is Rectification */}
        <Card className="bg-card border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Target className="w-5 h-5" />
              1. What Does Rectification Mean in AM2?
            </h2>
            
            <div className="space-y-6">
              <p className="text-sm text-muted-foreground">
                Rectification is about stating the practical action needed to restore the circuit to a safe, compliant condition:
              </p>

              <div className="bg-elec-yellow/5 dark:bg-elec-yellow/10 border border-blue-200 dark:border-blue-800/30 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-3">Common Rectification Actions:</h4>
                <ul className="text-sm text-blue-700 dark:text-elec-yellow space-y-2">
                  <li>• <strong>Reconnecting</strong> a broken conductor</li>
                  <li>• <strong>Correcting</strong> polarity at a socket or switch</li>
                  <li>• <strong>Tightening or remaking</strong> a loose/high resistance joint</li>
                  <li>• <strong>Replacing</strong> a damaged accessory</li>
                  <li>• <strong>Re-terminating</strong> CPCs correctly</li>
                </ul>
              </div>

              <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/30 rounded-lg p-4">
                <h4 className="font-medium text-amber-800 dark:text-amber-200 mb-3">Important Note:</h4>
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  <strong>You don't physically carry out the repair</strong> — you just state what would be done. The assessment is testing your knowledge of proper procedures, not your practical skills.
                </p>
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

        {/* Professional Recording */}
        <Card className="bg-card border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              2. Recording Rectification Professionally
            </h2>
            
            <div className="space-y-6">
              <p className="text-sm text-muted-foreground">
                Your answer must be specific and professional. NET assessors want detail that shows you understand both the problem and the solution.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-red-200 dark:border-red-800/30 rounded-lg p-4">
                  <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                    ❌ Incorrect Examples
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• "Fix earth fault"</li>
                    <li>• "Replace it"</li>
                    <li>• "Sort out the problem"</li>
                    <li>• "Repair the connection"</li>
                    <li>• "Make it work"</li>
                  </ul>
                  <p className="text-xs text-red-600 dark:text-elec-yellow mt-3 font-medium">
                    These vague phrases score zero marks!
                  </p>
                </div>

                <div className="border border-green-200 dark:border-green-800/30 rounded-lg p-4">
                  <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                    ✅ Professional Examples
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• "Reconnect CPC into earth terminal at socket outlet and re-test insulation resistance"</li>
                    <li>• "Replace damaged luminaire with new unit and re-test circuit"</li>
                    <li>• "Remake loose connection at socket terminal and re-test Zs"</li>
                  </ul>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-3 font-medium">
                    Specific, actionable, professional!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Examples by Fault Type */}
        <Card className="bg-card border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Wrench className="w-5 h-5" />
              3. Examples of Rectification by Fault Type
            </h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-elec-yellow/5 dark:bg-elec-yellow/10 border border-blue-200 dark:border-blue-800/30 rounded-lg p-4">
                  <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-3">Open Circuit:</h4>
                  <p className="text-sm text-blue-700 dark:text-elec-yellow">
                    "Reconnect line conductor at loose termination, then re-test continuity."
                  </p>
                </div>
                
                <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30 rounded-lg p-4">
                  <h4 className="font-medium text-red-800 dark:text-red-200 mb-3">Short Circuit:</h4>
                  <p className="text-sm text-red-700 dark:text-elec-yellow">
                    "Re-terminate damaged cable at luminaire, then re-test insulation resistance."
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800/30 rounded-lg p-4">
                  <h4 className="font-medium text-orange-800 dark:text-orange-200 mb-3">High Resistance Joint:</h4>
                  <p className="text-sm text-orange-700 dark:text-elec-yellow">
                    "Re-make loose connection at socket, then re-test Zs."
                  </p>
                </div>
                
                <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800/30 rounded-lg p-4">
                  <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-3">Polarity Fault:</h4>
                  <p className="text-sm text-purple-700 dark:text-elec-yellow">
                    "Swap conductors into correct terminals, then re-test polarity."
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30 rounded-lg p-4">
                  <h4 className="font-medium text-green-800 dark:text-green-200 mb-3">Earth Fault:</h4>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    "Re-terminate line conductor away from earth bar, then re-test IR and RCD."
                  </p>
                </div>
                
                <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/30 rounded-lg p-4">
                  <h4 className="font-medium text-amber-800 dark:text-amber-200 mb-3">Faulty Accessory:</h4>
                  <p className="text-sm text-amber-700 dark:text-amber-300">
                    "Replace defective accessory with new unit, then re-test circuit."
                  </p>
                </div>
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

        {/* Proving Rectification */}
        <Card className="bg-card border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <CheckSquare className="w-5 h-5" />
              4. Proving Rectification (Re-testing)
            </h2>
            
            <div className="space-y-6">
              <p className="text-sm text-muted-foreground">
                After stating rectification, you must also state how you would prove the circuit safe again:
              </p>

              <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30 rounded-lg p-4">
                <h4 className="font-medium text-green-800 dark:text-green-200 mb-3">Complete Re-testing Process:</h4>
                <ol className="text-sm text-green-700 dark:text-green-300 space-y-2">
                  <li><strong>1.</strong> Repeat the appropriate test (continuity, IR, polarity, Zs, RCD)</li>
                  <li><strong>2.</strong> Confirm results are now within BS 7671 limits</li>
                  <li><strong>3.</strong> Record new results on certification</li>
                  <li><strong>4.</strong> Leave installation safe before re-energising</li>
                </ol>
              </div>

              <div className="bg-elec-yellow/5 dark:bg-elec-yellow/10 border border-blue-200 dark:border-blue-800/30 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-3">Test Selection for Different Faults:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Common Re-tests:</h5>
                    <ul className="text-sm text-blue-700 dark:text-elec-yellow space-y-1">
                      <li>• <strong>Open circuit</strong> → Continuity test</li>
                      <li>• <strong>Short circuit</strong> → Insulation resistance</li>
                      <li>• <strong>High resistance</strong> → Zs test</li>
                      <li>• <strong>Polarity error</strong> → Polarity test</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Additional Tests:</h5>
                    <ul className="text-sm text-blue-700 dark:text-elec-yellow space-y-1">
                      <li>• <strong>Earth fault</strong> → IR + RCD test</li>
                      <li>• <strong>Faulty RCD</strong> → Full RCD test sequence</li>
                      <li>• <strong>Multiple faults</strong> → Complete test schedule</li>
                      <li>• <strong>New accessory</strong> → All relevant tests</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Assessor Expectations */}
        <Card className="bg-card border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Eye className="w-5 h-5" />
              5. Assessor Expectations
            </h2>
            
            <div className="space-y-6">
              <div className="bg-elec-yellow/5 dark:bg-elec-yellow/10 border border-blue-200 dark:border-blue-800/30 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-3">Assessors Want to See You:</h4>
                <ul className="text-sm text-blue-700 dark:text-elec-yellow space-y-2">
                  <li>• <strong>Identify the exact action needed</strong> (not vague wording)</li>
                  <li>• <strong>Link the fault to the correct rectification method</strong></li>
                  <li>• <strong>State which test proves the repair</strong></li>
                  <li>• <strong>Record clearly, in writing, for every fault</strong></li>
                  <li>• <strong>Leave no doubt</strong> that you understand the whole process</li>
                </ul>
              </div>

              <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/30 rounded-lg p-4">
                <h4 className="font-medium text-amber-800 dark:text-amber-200 mb-3">Professional Standards Expected:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-amber-800 dark:text-amber-200 mb-2">Communication:</h5>
                    <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1">
                      <li>• Clear, precise language</li>
                      <li>• Professional terminology</li>
                      <li>• Complete descriptions</li>
                      <li>• Logical sequence</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-amber-800 dark:text-amber-200 mb-2">Technical Knowledge:</h5>
                    <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1">
                      <li>• Correct repair methods</li>
                      <li>• Appropriate test selection</li>
                      <li>• Safety considerations</li>
                      <li>• Compliance awareness</li>
                    </ul>
                  </div>
                </div>
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

        {/* Advanced Rectification Scenarios */}
        <Card className="bg-card border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5" />
              6. Advanced Rectification Scenarios
            </h2>
            
            <div className="space-y-6">
              <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800/30 rounded-lg p-4">
                <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-3">Complex Multi-Fault Situations:</h4>
                <div className="text-sm text-purple-700 dark:text-elec-yellow space-y-3">
                  <div>
                    <h5 className="font-medium mb-1">Multiple Faults on Same Circuit:</h5>
                    <p className="mb-2"><strong>Example:</strong> Ring final with both open CPC and reversed polarity at socket</p>
                    <p className="mb-2"><strong>Rectification:</strong> "1. Reconnect CPC at loose terminal in socket backbox. 2. Correct L-N connections at same socket. 3. Re-test continuity and polarity for entire ring."</p>
                    <ul className="space-y-1">
                      <li>• List each fault separately with clear numbering</li>
                      <li>• State logical repair sequence (safety-critical first)</li>
                      <li>• Include comprehensive re-testing of all affected parameters</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium mb-1 mt-3">Cascading Effects:</h5>
                    <p className="mb-2"><strong>Scenario:</strong> Main earthing conductor disconnected affecting multiple circuits</p>
                    <p className="mb-2"><strong>Rectification:</strong> "Reconnect main earthing conductor to MET and re-test Zs on all affected circuits to confirm earth integrity restored."</p>
                  </div>
                </div>
              </div>

              <div className="bg-elec-yellow/5 dark:bg-elec-yellow/10 border border-blue-200 dark:border-blue-800/30 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 dark:test-blue-200 mb-3">Installation-Specific Rectifications:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-blue-800 dark:text-blue-200 mb-2">TN-S Systems:</h5>
                    <ul className="text-sm text-blue-700 dark:text-elec-yellow space-y-1">
                      <li>• "Reconnect equipotential bonding to water service and re-test main bonding continuity"</li>
                      <li>• "Replace corroded earth electrode connection and re-test Ze"</li>
                      <li>• "Repair PME earth connection at service head"</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Special Locations:</h5>
                    <ul className="text-sm text-blue-700 dark:text-elec-yellow space-y-1">
                      <li>• "Replace non-IP rated accessory in bathroom with IP44 unit and re-test"</li>
                      <li>• "Install missing 30mA RCD protection for garden circuit and test operation"</li>
                      <li>• "Correct supplementary bonding in bathroom and re-test resistance"</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/30 rounded-lg p-4">
                <h4 className="font-medium text-amber-800 dark:text-amber-200 mb-3">Cable and Accessory Replacements:</h4>
                <div className="text-sm text-amber-700 dark:text-amber-300 space-y-3">
                  <div>
                    <h5 className="font-medium mb-1">When Complete Replacement Needed:</h5>
                    <ul className="space-y-1">
                      <li>• <strong>Damaged cable:</strong> "Replace section of damaged cable between junction boxes A and B with equivalent 2.5mm² T&E and re-test complete circuit"</li>
                      <li>• <strong>Wrong cable type:</strong> "Replace non-LSF cable in escape route with LSF equivalent and re-test insulation resistance"</li>
                      <li>• <strong>Undersized cable:</strong> "Replace 1.5mm² cable with 2.5mm² to meet load requirements and re-test Zs and voltage drop"</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium mb-1 mt-3">Accessory Standards:</h5>
                    <ul className="space-y-1">
                      <li>• Always specify compliance standards in rectification</li>
                      <li>• Include IP ratings where relevant</li>
                      <li>• Specify protective device characteristics if replacing</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Documentation and Legal Requirements */}
        <Card className="bg-card border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              7. Documentation and Legal Requirements
            </h2>
            
            <div className="space-y-6">
              <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30 rounded-lg p-4">
                <h4 className="font-medium text-green-800 dark:text-green-200 mb-3">Certification Impact of Rectification:</h4>
                <div className="text-sm text-green-700 dark:text-green-300 space-y-3">
                  <div>
                    <h5 className="font-medium mb-1">What Must Be Updated Post-Rectification:</h5>
                    <ul className="space-y-1">
                      <li>• <strong>Test results:</strong> All affected test values must be re-recorded</li>
                      <li>• <strong>Circuit details:</strong> Any changes to cable routes, sizes, or accessories</li>
                      <li>• <strong>Protection:</strong> Updates to protective device ratings or types</li>
                      <li>• <strong>Compliance codes:</strong> C1, C2, C3 codes may change after rectification</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium mb-1 mt-3">Professional Responsibility:</h5>
                    <ul className="space-y-1">
                      <li>• Rectification description becomes part of legal documentation</li>
                      <li>• Must be sufficient for another electrician to understand</li>
                      <li>• Creates professional liability for accuracy and completeness</li>
                      <li>• Insurance claims may depend on quality of documentation</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30 rounded-lg p-4">
                <h4 className="font-medium text-red-800 dark:text-red-200 mb-3">Legal and Safety Implications:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-red-800 dark:text-red-200 mb-2">Duty of Care:</h5>
                    <ul className="text-sm text-red-700 dark:text-elec-yellow space-y-1">
                      <li>• Must identify all safety-critical faults</li>
                      <li>• Cannot leave dangerous conditions unreported</li>
                      <li>• Must recommend appropriate remedial action</li>
                      <li>• Clear communication of urgency levels</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-red-800 dark:text-red-200 mb-2">Professional Standards:</h5>
                    <ul className="text-sm text-red-700 dark:text-elec-yellow space-y-1">
                      <li>• IET Code of Practice compliance</li>
                      <li>• BS 7671 rectification requirements</li>
                      <li>• Building Control notification where required</li>
                      <li>• Scheme provider reporting obligations</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-elec-yellow/5 dark:bg-elec-yellow/10 border border-blue-200 dark:border-blue-800/30 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-3">Quality Assurance in Rectification:</h4>
                <div className="text-sm text-blue-700 dark:text-elec-yellow space-y-3">
                  <div>
                    <h5 className="font-medium mb-1">Verification Procedures:</h5>
                    <ul className="space-y-1">
                      <li>• <strong>Pre-energisation checks:</strong> Visual confirmation of all connections</li>
                      <li>• <strong>Function testing:</strong> Operation of switches, RCDs, and protective devices</li>
                      <li>• <strong>Complete re-test:</strong> Full test schedule for affected circuits</li>
                      <li>• <strong>Documentation review:</strong> Accuracy and completeness of records</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium mb-1 mt-3">Handover Requirements:</h5>
                    <ul className="space-y-1">
                      <li>• Clear explanation of work carried out</li>
                      <li>• Updated circuit schedules and test certificates</li>
                      <li>• Operation and maintenance instructions where applicable</li>
                      <li>• Warranty information for new components</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Professional Development Through Rectification */}
        <Card className="bg-card border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Target className="w-5 h-5" />
              8. Professional Development Through Rectification
            </h2>
            
            <div className="space-y-6">
              <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800/30 rounded-lg p-4">
                <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-3">Building Technical Expertise:</h4>
                <div className="text-sm text-purple-700 dark:text-elec-yellow space-y-3">
                  <p><strong>How AM2 rectification skills transfer to professional practice:</strong></p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium mb-1">Diagnostic Skills:</h5>
                      <ul className="space-y-1">
                        <li>• Root cause analysis abilities</li>
                        <li>• Understanding fault propagation</li>
                        <li>• Systematic troubleshooting approach</li>
                        <li>• Cost-effective repair strategies</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium mb-1">Communication Skills:</h5>
                      <ul className="space-y-1">
                        <li>• Clear technical writing</li>
                        <li>• Client explanation abilities</li>
                        <li>• Professional report presentation</li>
                        <li>• Regulatory compliance communication</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/30 rounded-lg p-4">
                <h4 className="font-medium text-amber-800 dark:text-amber-200 mb-3">Career Advancement Opportunities:</h4>
                <div className="text-sm text-amber-700 dark:text-amber-300 space-y-3">
                  <div>
                    <h5 className="font-medium mb-1">Specialisation Paths:</h5>
                    <ul className="space-y-1">
                      <li>• <strong>Inspection and Testing:</strong> NICEIC/NAPIT approved contractor</li>
                      <li>• <strong>Fault Investigation:</strong> Insurance and legal work specialist</li>
                      <li>• <strong>Compliance Consulting:</strong> BS 7671 and regulatory expert</li>
                      <li>• <strong>Training and Assessment:</strong> AM2 assessor or training provider</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium mb-1 mt-3">Business Development:</h5>
                    <ul className="space-y-1">
                      <li>• Quality rectification work builds customer trust</li>
                      <li>• Professional documentation supports premium pricing</li>
                      <li>• Systematic approach reduces call-backs and warranty issues</li>
                      <li>• Compliance expertise opens commercial contracts</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Practical Guidance */}
        <Card className="bg-card border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5" />
              6. Practical Guidance for Success
            </h2>
            
            <div className="space-y-6">
              <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30 rounded-lg p-4">
                <h4 className="font-medium text-green-800 dark:text-green-200 mb-3">The Golden Rule:</h4>
                <p className="text-sm text-green-700 dark:text-green-300 mb-3">
                  <strong>Always phrase rectification as: Action + Location + Re-test</strong>
                </p>
                <div className="bg-white dark:bg-card p-3 rounded border">
                  <p className="text-sm text-green-700 dark:text-green-300">
                    <strong>Example:</strong> "Reconnect neutral at CU terminal and re-test continuity and polarity."
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-elec-yellow/5 dark:bg-elec-yellow/10 border border-blue-200 dark:border-blue-800/30 rounded-lg p-4">
                  <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-3">Writing Guidelines:</h4>
                  <ul className="text-sm text-blue-700 dark:text-elec-yellow space-y-1">
                    <li>• Be concise but specific</li>
                    <li>• One or two clear sentences is enough</li>
                    <li>• Don't use slang or shorthand</li>
                    <li>• Write as if handing over to another electrician</li>
                    <li>• Always include the re-test stage</li>
                  </ul>
                </div>

                <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800/30 rounded-lg p-4">
                  <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-3">Common Mistakes to Avoid:</h4>
                  <ul className="text-sm text-purple-700 dark:text-elec-yellow space-y-1">
                    <li>• Vague language ("fix", "sort")</li>
                    <li>• Missing location details</li>
                    <li>• Forgetting re-test requirements</li>
                    <li>• Using informal terminology</li>
                    <li>• Incomplete fault descriptions</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Real-World Examples */}
        <Card className="bg-card border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              9. Real-World Examples
            </h2>
            
            <div className="space-y-4">
              <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30 rounded-lg p-4">
                <h4 className="font-medium text-red-800 dark:text-red-200 mb-3">❌ Example 1: Vague Recording</h4>
                <p className="text-sm text-red-700 dark:text-elec-yellow mb-2">
                  <strong>Candidate wrote:</strong> "Fix polarity."
                </p>
                <p className="text-sm text-red-700 dark:text-elec-yellow mb-2">
                  <strong>Result:</strong> Assessor gave 0 marks — too vague.
                </p>
                <p className="text-sm text-red-700 dark:text-elec-yellow font-medium">
                  <strong>Should have written:</strong> "Correct line/neutral connections at socket outlet and re-test polarity."
                </p>
              </div>

              <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30 rounded-lg p-4">
                <h4 className="font-medium text-green-800 dark:text-green-200 mb-3">✅ Example 2: Professional Recording</h4>
                <p className="text-sm text-green-700 dark:text-green-300 mb-2">
                  <strong>Scenario:</strong> Candidate diagnosed open CPC fault.
                </p>
                <p className="text-sm text-green-700 dark:text-green-300 mb-2">
                  <strong>Correctly stated:</strong> "Reconnect CPC at socket and re-test continuity."
                </p>
                <p className="text-sm text-green-700 dark:text-green-300 font-medium">
                  <strong>Result:</strong> Full marks for clear, professional recording.
                </p>
              </div>

              <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/30 rounded-lg p-4">
                <h4 className="font-medium text-amber-800 dark:text-amber-200 mb-3">⚠️ Example 3: Incomplete Recording</h4>
                <p className="text-sm text-amber-700 dark:text-amber-300 mb-2">
                  <strong>Scenario:</strong> Candidate identified faulty luminaire.
                </p>
                <p className="text-sm text-amber-700 dark:text-amber-300 mb-2">
                  <strong>Problem:</strong> Mentioned fault but didn't mention replacement or re-testing.
                </p>
                <p className="text-sm text-amber-700 dark:text-amber-300 font-medium">
                  <strong>Result:</strong> Lost marks for incomplete rectification description.
                </p>
              </div>

              <div className="bg-elec-yellow/5 dark:bg-elec-yellow/10 border border-blue-200 dark:border-blue-800/30 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-3">💡 Example 4: Real-World Consequence</h4>
                <p className="text-sm text-blue-700 dark:text-elec-yellow mb-2">
                  <strong>Scenario:</strong> On-site, an electrician repaired a joint but didn't re-test Zs.
                </p>
                <p className="text-sm text-blue-700 dark:text-elec-yellow mb-2">
                  <strong>Problem:</strong> High resistance fault remained hidden, later caused equipment failure.
                </p>
                <p className="text-sm text-blue-700 dark:text-elec-yellow font-medium">
                  <strong>Lesson:</strong> In AM2, skipping the re-test equals lost marks — and in real work, potential danger.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* FAQ Section */}
        <Card className="bg-card border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5" />
              10. Frequently Asked Questions
            </h2>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-border/20 rounded-lg p-3 sm:p-4 bg-card">
                  <h4 className="font-medium text-foreground mb-2 text-sm sm:text-base">
                    Q{index + 1}: {faq.question}
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Summary */}
        <Card className="bg-card border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              11. Section Summary
            </h2>
            
            <div className="bg-elec-yellow/5 dark:bg-elec-yellow/10 border border-blue-200 dark:border-blue-800/30 rounded-lg p-4 mb-4">
              <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-3">Rectification in AM2 Means:</h4>
              <ul className="text-sm text-blue-700 dark:text-elec-yellow space-y-1">
                <li>• <strong>State the repair clearly</strong> (e.g. reconnect, replace, remake)</li>
                <li>• <strong>Specify the location</strong> exactly</li>
                <li>• <strong>State the re-test</strong> that proves safety</li>
                <li>• <strong>Use professional language</strong> suitable for certification</li>
              </ul>
            </div>
            
            <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800/30 rounded-lg p-4">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-3">Remember the Complete Cycle:</h4>
              <div className="flex items-center justify-center gap-2 text-sm text-yellow-700 dark:text-yellow-300 font-medium">
                <span>Diagnose</span>
                <span>→</span>
                <span>Rectify</span>
                <span>→</span>
                <span>Prove Safe</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Quiz Section */}
        <div className="border-t border-border/20 pt-8">
          <Quiz 
            title="Test Your Knowledge: Proving and Recording Rectification"
            questions={quizQuestions}
          />
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-border/20">
          <Button variant="outline" className="w-full sm:w-auto" asChild>
            <Link to="../section3">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous: Test Equipment
            </Link>
          </Button>
          <Button className="w-full sm:w-auto" asChild>
            <Link to="../section5">
              Next: Common Pitfalls
              <ChevronRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AM2Module5Section4;