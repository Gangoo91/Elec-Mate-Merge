import { ArrowLeft, ArrowRight, AlertTriangle, CheckCircle, Target, Search, Lightbulb, BookOpen, Wrench, ChevronLeft, ChevronRight, Zap, Eye, Settings, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const AM2Module5Section2 = () => {
  useSEO(
    "Logical Fault-Finding Process | AM2 Module 5 Section 2",
    "Master the systematic approach to fault diagnosis in AM2 assessments. Learn safe isolation, test selection, and logical interpretation of results."
  );

  const quickCheckQuestions: Array<{
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }> = [
    {
      id: "first-action",
      question: "What's the first action before testing a faulted circuit?",
      options: [
        "Check test equipment calibration",
        "Apply safe isolation to prove the circuit is dead",
        "Read the circuit documentation", 
        "Observe the symptoms"
      ],
      correctIndex: 1,
      explanation: "Safe isolation must always be the first step before any fault-finding work to ensure personal safety and demonstrate proper procedure to the assessor."
    },
    {
      id: "mcb-trips",
      question: "If an MCB trips immediately when energised, what's your first test?",
      options: [
        "Continuity test",
        "Polarity test",
        "Insulation resistance to check for a short or earth fault",
        "RCD test"
      ],
      correctIndex: 2,
      explanation: "Immediate MCB tripping indicates excessive current flow, suggesting a short circuit or earth fault. Insulation resistance testing will identify this."
    },
    {
      id: "fault-recording",
      question: "Why is it not enough to just say 'ring final fault'?",
      options: [
        "You need to specify the cable size",
        "You need to include the test results",
        "Because you must give type, location, and rectification — assessor needs detail",
        "You need to measure the exact resistance"
      ],
      correctIndex: 2,
      explanation: "Assessors require complete fault diagnosis including fault type, exact location, and how it would be rectified to demonstrate thorough understanding."
    }
  ];

  const quizQuestions = [
    {
      id: 1,
      question: "What's the first step in fault finding?",
      options: ["Visual inspection", "Safe isolation", "Reading symptoms", "Testing continuity"],
      correctAnswer: 1,
      explanation: "Safe isolation must always be the first step to ensure personal safety and demonstrate proper electrical procedure."
    },
    {
      id: 2,
      question: "Why must you observe symptoms before testing?",
      options: ["To save time", "Symptoms guide which test to perform first", "It's required by regulations", "To impress the assessor"],
      correctAnswer: 1,
      explanation: "Symptoms provide vital clues about the fault type, allowing you to select the most appropriate test and work systematically."
    },
    {
      id: 3,
      question: "Which test is best for suspected short circuits?",
      options: ["Continuity test", "Polarity test", "Insulation resistance test", "RCD test"],
      correctAnswer: 2,
      explanation: "Insulation resistance testing at 500V DC will reveal short circuits as very low or zero resistance readings between conductors."
    },
    {
      id: 4,
      question: "If a socket is dead, what test should you carry out first?",
      options: ["Insulation resistance", "Polarity test", "Continuity test", "Earth fault loop impedance"],
      correctAnswer: 2,
      explanation: "A dead socket suggests an open circuit, so continuity testing will reveal if there's a break in the circuit path."
    },
    {
      id: 5,
      question: "Why must you start fault-finding at the CU?",
      options: ["It's the safest place", "To work systematically from origin outward", "Regulations require it", "Test equipment works better there"],
      correctAnswer: 1,
      explanation: "Starting from the consumer unit and working outward ensures systematic testing and avoids random fault-chasing."
    },
    {
      id: 6,
      question: "What does a very high Zs reading usually suggest?",
      options: ["Short circuit", "Earth fault", "High resistance joint", "Polarity error"],
      correctAnswer: 2,
      explanation: "High earth fault loop impedance (Zs) typically indicates a high resistance connection in the earth path or circuit conductors."
    },
    {
      id: 7,
      question: "True or false: Guessing faults is acceptable if you're correct.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation: "False. NET assessors mark the process and methodology, not just the final result. Guessing shows poor professional practice."
    },
    {
      id: 8,
      question: "What three things must you record when diagnosing a fault?",
      options: ["Type, test results, time taken", "Location, cost, difficulty", "Type, location, rectification", "Cause, effect, prevention"],
      correctAnswer: 2,
      explanation: "Complete fault diagnosis requires fault type, exact location, and how the fault would be rectified."
    },
    {
      id: 9,
      question: "Why should you explain your process out loud to the assessor?",
      options: ["To fill time", "Assessors mark reasoning and methodology", "It's required by regulations", "To show confidence"],
      correctAnswer: 1,
      explanation: "Assessors award marks for logical reasoning and systematic approach, which must be demonstrated through clear explanation."
    },
    {
      id: 10,
      question: "After diagnosing a fault, what's the final step before handing back?",
      options: ["Clean up tools", "Complete paperwork", "Prove the circuit would be safe after rectification", "Pack test equipment"],
      correctAnswer: 2,
      explanation: "You must demonstrate that you understand how to make the installation safe again after fault rectification."
    }
  ];

  const faqs = [
    {
      question: "Do I have to follow the same test sequence every time?",
      answer: "No, you adapt it to symptoms, but you must stay logical and structured. The key is demonstrating systematic thinking."
    },
    {
      question: "Can I get marks for explaining the fault even if I don't locate it exactly?",
      answer: "Yes — assessors credit method and reasoning. Your logical approach is as important as the final result."
    },
    {
      question: "What happens if I guess and get it right?",
      answer: "You won't score well — NET assesses the process, not luck. Professional electricians work systematically, not by guesswork."
    },
    {
      question: "Do I have to write rectification even though I don't fix it?",
      answer: "Yes — recording rectification is part of the assessment. It proves you understand how to make the installation safe."
    },
    {
      question: "Will assessors give hints?",
      answer: "No — they only observe. It's your job to demonstrate the logical process independently."
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
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 text-emerald-400 text-sm font-medium rounded-full mb-4">
            <Search className="w-4 h-4" />
            Module 5 – Section 2
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 sm:mb-6 leading-tight">
            Logical Fault-Finding Process
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
            Fault diagnosis is about working systematically. In the AM2, you are being tested not only on your knowledge of electrical faults but also on your ability to think like a competent electrician.
          </p>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            NET assessors are looking for method, not magic. They want to see that you can work safely, approach faults in a structured way, use test instruments properly, and state your diagnosis clearly.
          </p>
        </div>

        {/* Critical Warning */}
        <Card className="bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2 text-sm sm:text-base">
                  CRITICAL: Safety Always Comes First
                </h3>
                <p className="text-xs sm:text-sm text-red-700 dark:text-emerald-400 mb-3 leading-relaxed">
                  If you forget safe isolation, it's an instant fail. Even in controlled AM2 conditions, you must demonstrate correct safety procedures — this proves to assessors that safety is always your first thought.
                </p>
                <p className="text-xs sm:text-sm text-red-700 dark:text-emerald-400 font-medium leading-relaxed">
                  Every test must begin with proper isolation and proving procedures. No exceptions.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Learning Outcomes */}
        <Card className="bg-card border-emerald-500/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-emerald-400 mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Learning Outcomes
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mb-4">
              By the end of this section, you will be able to:
            </p>
            <ul className="space-y-2 text-xs sm:text-xs sm:text-sm text-foreground">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                Follow a step-by-step diagnostic method for fault-finding in AM2
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                Use safe isolation before working on faulted circuits
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                Select and apply the correct test for the type of fault suspected
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                Interpret test results logically instead of guessing
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                Explain your reasoning clearly to the assessor
              </li>
            </ul>
          </div>
        </Card>

        {/* The 7-Step Process */}
        <Card className="bg-card border-emerald-500/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-emerald-400 mb-4 flex items-center gap-2">
              <Target className="w-5 h-5" />
              1. The 7-Step Logical Process
            </h2>
            
            <div className="space-y-6">
              <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30 rounded-lg p-4">
                <h4 className="font-medium text-red-800 dark:text-red-200 mb-3 flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Step 1: Start with Safety
                </h4>
                <p className="text-sm text-red-700 dark:text-emerald-400 mb-3">
                  Every fault-finding exercise begins with safe isolation. Even though the circuits are prepared by NET and under controlled conditions, you must still demonstrate correct procedure.
                </p>
                <ul className="text-sm text-red-700 dark:text-emerald-400 space-y-1">
                  <li>• Identify correct isolation point</li>
                  <li>• Secure isolation (lock off where possible)</li>
                  <li>• Test voltage indicator on known live source</li>
                  <li>• Test circuit to prove dead</li>
                  <li>• Re-test voltage indicator to prove it's working</li>
                </ul>
              </div>

              <div className="border border-border/20 rounded-lg p-4">
                <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  Step 2: Gather Information (Symptoms)
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Look at what the circuit is doing. These symptoms are clues to the type of fault:
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Is a socket completely dead? (Open circuit likely)</li>
                  <li>• Does an MCB trip immediately? (Short circuit/earth fault)</li>
                  <li>• Do lights behave oddly? (High resistance connection)</li>
                  <li>• Does RCD trip when energised? (Earth fault)</li>
                </ul>
              </div>

              <div className="border border-border/20 rounded-lg p-4">
                <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Step 3: Plan the Test Sequence
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Once you know the symptom, decide which test will prove or disprove the suspected fault:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="border border-border/10 p-3 rounded">
                    <p className="text-sm text-muted-foreground">
                      <strong>Suspected open circuit</strong><br />
                      → Continuity test
                    </p>
                  </div>
                  <div className="border border-border/10 p-3 rounded">
                    <p className="text-sm text-muted-foreground">
                      <strong>Suspected short circuit</strong><br />
                      → Insulation resistance test
                    </p>
                  </div>
                  <div className="border border-border/10 p-3 rounded">
                    <p className="text-sm text-muted-foreground">
                      <strong>Suspected polarity error</strong><br />
                      → Polarity test at accessory
                    </p>
                  </div>
                  <div className="border border-border/10 p-3 rounded">
                    <p className="text-sm text-muted-foreground">
                      <strong>Suspected high resistance</strong><br />
                      → Measure Zs or check terminations
                    </p>
                  </div>
                </div>
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

        {/* Steps 4-7 */}
        <Card className="bg-card border-emerald-500/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-emerald-400 mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5" />
              2. Testing and Analysis Steps
            </h2>
            
            <div className="space-y-6">
              <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800/30 rounded-lg p-4">
                <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-3">Step 4: Test Logically, Step by Step</h4>
                <p className="text-sm text-purple-700 dark:text-emerald-400 mb-3">
                  Start from the origin (CU) and work outwards. This avoids chasing faults randomly.
                </p>
                <div className="text-sm text-purple-700 dark:text-emerald-400">
                  <p className="font-medium mb-2">Example: Ring final circuit testing</p>
                  <ol className="space-y-1">
                    <li>1. Prove continuity of each conductor at the CU</li>
                    <li>2. Cross-connect and measure at sockets</li>
                    <li>3. Narrow down where the break or reversal occurs</li>
                  </ol>
                </div>
              </div>

              <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/30 rounded-lg p-4">
                <h4 className="font-medium text-amber-800 dark:text-amber-200 mb-3">Step 5: Interpret the Result</h4>
                <p className="text-sm text-amber-700 dark:text-amber-300 mb-3">
                  Don't just write down numbers — explain what they mean:
                </p>
                <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1">
                  <li>• <strong>0 MΩ on insulation resistance</strong> = Short circuit or earth fault</li>
                  <li>• <strong>Very high Zs reading</strong> = High resistance joint</li>
                  <li>• <strong>Dead socket with no continuity on line</strong> = Open circuit</li>
                  <li>• <strong>RCD trips at 15mA instead of 30mA</strong> = Over-sensitive RCD</li>
                </ul>
              </div>

              <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-blue-200 dark:border-blue-800/30 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-3">Step 6: Record the Fault and Rectification</h4>
                <p className="text-sm text-blue-700 dark:text-emerald-400 mb-3">
                  When you find the fault, you must state clearly:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="bg-white dark:bg-card p-3 rounded border text-center">
                    <p className="text-sm font-medium text-blue-700 dark:text-emerald-400">What the fault is</p>
                    <p className="text-xs text-emerald-400 dark:text-emerald-400">(Type)</p>
                  </div>
                  <div className="bg-white dark:bg-card p-3 rounded border text-center">
                    <p className="text-sm font-medium text-blue-700 dark:text-emerald-400">Where it is located</p>
                    <p className="text-xs text-emerald-400 dark:text-emerald-400">(Location)</p>
                  </div>
                  <div className="bg-white dark:bg-card p-3 rounded border text-center">
                    <p className="text-sm font-medium text-blue-700 dark:text-emerald-400">How you would rectify it</p>
                    <p className="text-xs text-emerald-400 dark:text-emerald-400">(Rectification)</p>
                  </div>
                </div>
                <div className="mt-3 p-3 bg-white dark:bg-card rounded border">
                  <p className="text-sm text-blue-700 dark:text-emerald-400">
                    <strong>Example:</strong> "Open CPC between CU and socket 2. Rectify by reconnecting CPC at CU terminal."
                  </p>
                </div>
              </div>

              <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30 rounded-lg p-4">
                <h4 className="font-medium text-green-800 dark:text-green-200 mb-3">Step 7: Prove Safe Afterwards</h4>
                <p className="text-sm text-green-700 dark:text-green-300">
                  Finally, confirm that after rectification, the circuit would be re-tested using the correct sequence. This shows you understand the importance of leaving an installation safe.
                </p>
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

        {/* Practical Guidance */}
        <Card className="bg-card border-emerald-500/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-emerald-400 mb-4 flex items-center gap-2">
              <Wrench className="w-5 h-5" />
              3. Practical Guidance for AM2 Success
            </h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30 rounded-lg p-4">
                    <h4 className="font-medium text-red-800 dark:text-red-200 mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      Critical Success Factors
                    </h4>
                    <ul className="text-sm text-red-700 dark:text-emerald-400 space-y-1">
                      <li>• <strong>Always think safety first</strong> — if you forget isolation, it's an instant fail</li>
                      <li>• <strong>Talk through your logic</strong> — say what you're testing and why</li>
                      <li>• <strong>Work methodically</strong> — don't jump between circuits or tests</li>
                      <li>• <strong>Be precise</strong> — fault = type + location + rectification</li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30 rounded-lg p-4">
                    <h4 className="font-medium text-green-800 dark:text-green-200 mb-2 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Professional Approach
                    </h4>
                    <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                      <li>• Demonstrate systematic thinking</li>
                      <li>• Explain your reasoning clearly</li>
                      <li>• Show confidence in your methodology</li>
                      <li>• Avoid guessing — even if unsure, show logical process</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-blue-200 dark:border-blue-800/30 rounded-lg p-4">
                    <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2 flex items-center gap-2">
                      <Lightbulb className="w-4 h-4" />
                      Time Management Tips
                    </h4>
                    <ul className="text-sm text-blue-700 dark:text-emerald-400 space-y-1">
                      <li>• Plan your test sequence before starting</li>
                      <li>• Don't waste time on obvious non-faults</li>
                      <li>• Document findings as you go</li>
                      <li>• Keep assessor informed of progress</li>
                    </ul>
                  </div>

                  <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/30 rounded-lg p-4">
                    <h4 className="font-medium text-amber-800 dark:text-amber-200 mb-2 flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      Common Mistakes to Avoid
                    </h4>
                    <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1">
                      <li>• Rushing the safety isolation</li>
                      <li>• Testing randomly without logic</li>
                      <li>• Not explaining your reasoning</li>
                      <li>• Incomplete fault descriptions</li>
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

        {/* Real-World Examples */}
        <Card className="bg-card border-emerald-500/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-emerald-400 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              4. Real-World Examples
            </h2>
            
            <div className="space-y-4">
              <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30 rounded-lg p-4">
                <h4 className="font-medium text-red-800 dark:text-red-200 mb-3">❌ Example 1: Poor Method</h4>
                <p className="text-sm text-red-700 dark:text-emerald-400 mb-2">
                  <strong>Scenario:</strong> Candidate saw an RCD tripping and immediately said "earth fault."
                </p>
                <p className="text-sm text-red-700 dark:text-emerald-400 mb-2">
                  <strong>Problem:</strong> Assessor asked "where exactly?" — candidate couldn't prove it.
                </p>
                <p className="text-sm text-red-700 dark:text-emerald-400 font-medium">
                  <strong>Result:</strong> Marks lost for guessing instead of systematic diagnosis.
                </p>
              </div>

              <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30 rounded-lg p-4">
                <h4 className="font-medium text-green-800 dark:text-green-200 mb-3">✅ Example 2: Good Method</h4>
                <p className="text-sm text-green-700 dark:text-green-300 mb-2">
                  <strong>Scenario:</strong> Candidate tested continuity systematically.
                </p>
                <p className="text-sm text-green-700 dark:text-green-300 mb-2">
                  <strong>Process:</strong> Narrowed down to broken CPC between CU and first socket, recorded properly.
                </p>
                <p className="text-sm text-green-700 dark:text-green-300 font-medium">
                  <strong>Result:</strong> Full marks for logical method and complete diagnosis.
                </p>
              </div>

              <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/30 rounded-lg p-4">
                <h4 className="font-medium text-amber-800 dark:text-amber-200 mb-3">⚠️ Example 3: Time Management Failure</h4>
                <p className="text-sm text-amber-700 dark:text-amber-300 mb-2">
                  <strong>Scenario:</strong> Candidate misread symptoms, tested in wrong order.
                </p>
                <p className="text-sm text-amber-700 dark:text-amber-300 mb-2">
                  <strong>Problem:</strong> Wasted time on incorrect tests, ran out of time.
                </p>
                <p className="text-sm text-amber-700 dark:text-amber-300 font-medium">
                  <strong>Result:</strong> Only 1 fault identified correctly → failed section.
                </p>
              </div>

              <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-blue-200 dark:border-blue-800/30 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-3">💡 Example 4: Real-World Application</h4>
                <p className="text-sm text-blue-700 dark:text-emerald-400 mb-2">
                  <strong>Scenario:</strong> On site, an electrician guessed at a short circuit.
                </p>
                <p className="text-sm text-blue-700 dark:text-emerald-400 mb-2">
                  <strong>Problem:</strong> Replaced multiple accessories and wasted hours.
                </p>
                <p className="text-sm text-blue-700 dark:text-emerald-400 font-medium">
                  <strong>Lesson:</strong> Logical testing would have found the actual loose neutral in minutes.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* FAQ Section */}
        <Card className="bg-card border-emerald-500/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-emerald-400 mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5" />
              5. Frequently Asked Questions
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
        <Card className="bg-card border-emerald-500/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-emerald-400 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              6. Section Summary
            </h2>
            
            <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-blue-200 dark:border-blue-800/30 rounded-lg p-4 mb-4">
              <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-3">The Logical Fault-Finding Process:</h4>
              <ol className="text-sm text-blue-700 dark:text-emerald-400 space-y-1">
                <li>1. <strong>Apply safe isolation</strong></li>
                <li>2. <strong>Observe the symptoms</strong></li>
                <li>3. <strong>Plan the right test</strong></li>
                <li>4. <strong>Test step by step from CU outward</strong></li>
                <li>5. <strong>Interpret results correctly</strong></li>
                <li>6. <strong>Record fault type, location, and rectification</strong></li>
                <li>7. <strong>Prove the circuit safe</strong></li>
              </ol>
            </div>
            
            <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800/30 rounded-lg p-4">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-3">Remember:</h4>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                Following this method shows the assessor you are competent and professional, even under exam pressure. NET assessors mark the process and reasoning — not just the final answer.
              </p>
            </div>
          </div>
        </Card>

        {/* Quiz Section */}
        <div className="border-t border-border/20 pt-8">
          <Quiz 
            title="Test Your Knowledge: Logical Fault-Finding Process"
            questions={quizQuestions}
          />
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-border/20">
          <Button variant="outline" className="w-full sm:w-auto" asChild>
            <Link to="../section1">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous: Typical Faults Set
            </Link>
          </Button>
          <Button className="w-full sm:w-auto" asChild>
            <Link to="../section3">
              Next: Test Methods & Procedures
              <ChevronRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AM2Module5Section2;