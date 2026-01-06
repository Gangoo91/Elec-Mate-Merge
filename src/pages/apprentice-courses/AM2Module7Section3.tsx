import { ArrowLeft, ArrowRight, Shield, CheckCircle, AlertTriangle, Target, Timer, Lightbulb, Heart, Brain, BookOpen, Users, Wrench, Eye, TestTube, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const AM2Module7Section3 = () => {
  useSEO(
    "Safety-first Approach | AM2 Module 7 Section 3",
    "Show the Assessor You're Safe - Critical safety behaviors and instant fail errors in AM2"
  );

  const quickCheckQuestions: Array<{
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }> = [
    {
      id: "unsafe-practice",
      question: "What does unsafe practice in AM2 usually result in?",
      options: [
        "Minor mark deduction",
        "Warning from assessor", 
        "Automatic failure, regardless of performance in other areas",
        "Extra time to correct mistakes"
      ],
      correctIndex: 2,
      explanation: "Unsafe practice in AM2 results in automatic failure, regardless of how well you complete the rest of the exam."
    },
    {
      id: "cpc-fail",
      question: "If you attempt to energise a circuit without CPC connected, what happens?",
      options: [
        "Minor mark deduction",
        "Warning to reconnect it",
        "Automatic fail — dangerous and non-compliant",
        "No consequence if caught quickly"
      ],
      correctIndex: 2,
      explanation: "Energising a circuit without CPC connected is dangerous and non-compliant, resulting in automatic failure."
    },
    {
      id: "isolation-steps",
      question: "What happens if you skip any step in safe isolation?",
      options: [
        "Minor mark deduction",
        "You can continue if you remember later",
        "Instant fail - critical safety error",
        "Warning from assessor"
      ],
      correctIndex: 2,
      explanation: "Skipping any step in safe isolation is a critical safety error that results in instant failure."
    }
  ];

  const quizQuestions = [
    {
      id: 1,
      question: "Why is safety the top priority in AM2?",
      options: [
        "It's part of the syllabus",
        "NET's primary objective is to prove you are safe to work unsupervised",
        "It's required by regulations",
        "Assessors like safe workers"
      ],
      correctAnswer: 1,
      explanation: "NET's primary objective is to prove you are safe to work unsupervised. Unsafe electricians put lives at risk."
    },
    {
      id: 2,
      question: "Name three safety behaviours assessors look for:",
      options: [
        "Speed, accuracy, neatness",
        "Safe isolation, correct PPE, tool use",
        "Confidence, knowledge, experience",
        "Planning, organisation, efficiency"
      ],
      correctAnswer: 1,
      explanation: "Key safety behaviours include safe isolation following the 10-step process, correct PPE usage, and proper tool use."
    },
    {
      id: 3,
      question: "What happens if you skip a safe isolation step?",
      options: [
        "Minor mark deduction",
        "Warning from assessor",
        "Instant failure",
        "Extra time given"
      ],
      correctAnswer: 2,
      explanation: "Skipping any step in safe isolation results in instant failure as it's a critical safety error."
    },
    {
      id: 4,
      question: "What regulation requires safe working practices?",
      options: [
        "BS 7671 (18th Edition)",
        "GS38",
        "Both BS 7671 and GS38",
        "HSE guidelines only"
      ],
      correctAnswer: 2,
      explanation: "Both BS 7671 (18th Edition) and GS38 require safe working practices and proper test equipment use."
    },
    {
      id: 5,
      question: "Why should CPCs always be sleeved and connected immediately?",
      options: [
        "It looks professional",
        "It's required by BS 7671 for safety",
        "Assessors prefer it",
        "It saves time later"
      ],
      correctAnswer: 1,
      explanation: "CPCs must be sleeved and connected immediately as required by BS 7671 for electrical safety and fault protection."
    },
    {
      id: 6,
      question: "True or false: Assessors don't care if your work area is messy.",
      options: [
        "True",
        "False"
      ],
      correctAnswer: 1,
      explanation: "False - untidy, unsafe work areas reflect poor safety culture and can lead to accidents and mark deductions."
    },
    {
      id: 7,
      question: "What is GS38 and why is it important?",
      options: [
        "A wiring regulation for installations",
        "Safety standard for electrical test equipment and probes",
        "PPE requirement standard",
        "Tool maintenance guideline"
      ],
      correctAnswer: 1,
      explanation: "GS38 is the safety standard for electrical test equipment, requiring proper probe guards and safe test leads."
    },
    {
      id: 8,
      question: "Give an example of an 'instant fail' safety error:",
      options: [
        "Forgetting to label a circuit",
        "Using non-GS38 test probes",
        "Working too slowly",
        "Making a termination mistake"
      ],
      correctAnswer: 1,
      explanation: "Using non-GS38 compliant test probes is an instant fail safety error as it creates serious safety risks."
    },
    {
      id: 9,
      question: "How can you show the assessor you are working safely?",
      options: [
        "Work quickly and efficiently",
        "Talk through safety steps and make actions visible",
        "Ask lots of questions",
        "Copy other candidates"
      ],
      correctAnswer: 1,
      explanation: "Talk through safety steps (e.g., 'proving my tester on known live source') and make safety actions clearly visible to the assessor."
    },
    {
      id: 10,
      question: "What's the golden rule about safety in AM2?",
      options: [
        "Safety first, speed second",
        "Unsafe = fail. Safe = pass.",
        "Follow all regulations exactly",
        "Never take shortcuts"
      ],
      correctAnswer: 1,
      explanation: "The golden rule is 'Unsafe = fail. Safe = pass.' Safety is the foundation of everything in AM2."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-2">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground p-2 sm:p-0 text-sm sm:text-base" asChild>
              <Link to="..">
                <ArrowLeft className="w-4 h-4 mr-1 sm:mr-2" />
                <span className="hidden xs:inline">Back to Module 7</span>
                <span className="xs:hidden">Back</span>
              </Link>
            </Button>
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground p-2 sm:p-0 text-sm sm:text-base" asChild>
              <Link to="../section4">
                <span className="hidden xs:inline">Module 7 Section 4</span>
                <span className="xs:hidden">Section 4</span>
                <ArrowRight className="w-4 h-4 ml-1 sm:ml-2" />
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
            <Shield className="w-4 h-4" />
            Module 7 – Section 3
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 sm:mb-6 leading-tight">
            Safety-first Approach – "Show the Assessor You're Safe"
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
            The AM2 is not just a test of technical skill — it is a test of whether you can be trusted to work safely in the electrical industry. Assessors are trained to watch for safe behaviour at all times, not only during specific tasks like isolation. If you show unsafe practice, it can result in instant failure, regardless of how well you complete the rest of the exam.
          </p>
        </div>

        {/* Critical Warning */}
        <Card className="bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 dark:text-elec-yellow mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2 text-sm sm:text-base">
                  CRITICAL: Safety is Everything in AM2
                </h3>
                <p className="text-xs sm:text-sm text-red-700 dark:text-elec-yellow mb-3 leading-relaxed">
                  Unsafe electricians put lives at risk — so unsafe behaviour equals instant failure. Safety behaviours must be demonstrated consistently throughout the entire exam, not just once.
                </p>
                <p className="text-xs sm:text-sm text-red-700 dark:text-elec-yellow font-medium leading-relaxed">
                  NET's primary objective is to prove you are safe to work unsupervised. Every action is being assessed for safety compliance.
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
                Explain why NET places safety above everything else in AM2
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Demonstrate safe working behaviours consistently, not just during isolation and testing
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Identify the critical "instant fail" safety errors to avoid
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Build habits that prove to the assessor you prioritise safety
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Leave every stage of AM2 in a safe condition
              </li>
            </ul>
          </div>
        </Card>

        {/* Why Safety is Everything */}
        <Card className="bg-card border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              1. Why Safety is Everything in AM2
            </h2>
            
            <p className="text-xs sm:text-sm text-muted-foreground mb-4 leading-relaxed">
              NET's primary objective is to prove you are safe to work unsupervised:
            </p>

            <div className="space-y-4 sm:space-y-6">
              <div className="bg-elec-yellow/5 dark:bg-elec-yellow/10 border border-blue-200 dark:border-blue-800/30 rounded-lg p-3 sm:p-4">
                <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2 sm:mb-3 text-sm sm:text-base">Key Safety Principles:</h4>
                <ul className="text-xs sm:text-sm text-blue-700 dark:text-elec-yellow space-y-1">
                  <li>• NET's primary objective is to prove you are safe to work unsupervised</li>
                  <li>• Unsafe electricians put lives at risk — so unsafe behaviour = fail</li>
                  <li>• Safety behaviours must be demonstrated throughout the exam, not just once</li>
                </ul>
              </div>
            </div>

            <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30 rounded-lg p-4 mt-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">Remember:</h4>
                  <p className="text-xs sm:text-sm text-green-700 dark:text-green-300">
                    Every action is being assessed for safety compliance. The assessor is constantly evaluating whether you can be trusted to work safely without supervision.
                  </p>
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

        {/* Key Safety Behaviours */}
        <Card className="bg-card border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Eye className="w-5 h-5" />
              2. Key Safety Behaviours Assessors Look For
            </h2>
            
            <p className="text-xs sm:text-sm text-muted-foreground mb-6 leading-relaxed">
              Assessors are trained to watch for these critical safety behaviours throughout your AM2 exam:
            </p>

            <div className="space-y-6">
              {/* Strategy 1 */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                <div className="flex-1">
                  <h5 className="font-medium text-foreground mb-2">Safe Isolation</h5>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-3">
                    Following the 10-step process, including prove/re-prove. This is the foundation of electrical safety.
                  </p>
                  <div className="bg-elec-yellow/5 dark:bg-elec-yellow/10 rounded p-3 text-xs sm:text-sm">
                    <strong className="text-blue-800 dark:text-blue-200">Critical Steps:</strong>
                    <ul className="text-blue-700 dark:text-elec-yellow mt-1 space-y-1">
                      <li>• Select appropriate point of isolation</li>
                      <li>• Secure isolation - lock off/remove fuses</li>
                      <li>• Prove tester before use</li>
                      <li>• Test circuit dead</li>
                      <li>• Re-prove tester after testing</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Strategy 2 */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                <div className="flex-1">
                  <h5 className="font-medium text-foreground mb-2">PPE and Tool Use</h5>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-3">
                    Correct PPE usage, proper tools, no makeshift shortcuts, no damaged equipment.
                  </p>
                  <div className="bg-green-50 dark:bg-green-950/20 rounded p-3 text-xs sm:text-sm">
                    <ul className="text-green-700 dark:text-green-300 space-y-1">
                      <li>• Safety glasses when required</li>
                      <li>• Insulated gloves where appropriate</li>
                      <li>• GS38-compliant test equipment only</li>
                      <li>• Right tool for the job, no improvisation</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Strategy 3 */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                <div className="flex-1">
                  <h5 className="font-medium text-foreground mb-2">Work Area Management</h5>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-3">
                    Tidy workspace, no trailing leads or trip hazards, organised approach.
                  </p>
                  <div className="bg-orange-50 dark:bg-orange-950/20 rounded p-3 text-xs sm:text-sm">
                    <ul className="text-orange-700 dark:text-elec-yellow space-y-1">
                      <li>• Keep walkways clear of tools and cables</li>
                      <li>• Organise tools methodically on work surface</li>
                      <li>• Coil test leads properly when not in use</li>
                      <li>• Clean up as you go - shows professionalism</li>
                      <li>• Position ladder safely with correct angle (1:4 ratio)</li>
                      <li>• Secure cable drums and heavy equipment</li>
                    </ul>
                    <div className="mt-3 p-2 bg-orange-100 dark:bg-orange-900/30 rounded">
                      <strong className="text-orange-800 dark:text-orange-200 text-xs">Remember:</strong>
                      <p className="text-orange-700 dark:text-elec-yellow text-xs mt-1">Untidy work areas suggest poor safety culture and can lead to accidents.</p>
                    </div>
                  </div>
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

        {/* Instant Fail Errors */}
        <Card className="bg-card border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              3. "Instant Fail" Safety Errors (NET Published)
            </h2>
            
            <p className="text-xs sm:text-sm text-muted-foreground mb-6 leading-relaxed">
              These safety-critical errors result in immediate failure, regardless of performance elsewhere:
            </p>

            <div className="space-y-4 sm:space-y-6">
              <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30 rounded-lg p-4">
                <h4 className="font-medium text-red-800 dark:text-red-200 mb-2 sm:mb-3 text-sm sm:text-base">Critical Safety Errors:</h4>
                <ul className="text-xs sm:text-sm text-red-700 dark:text-elec-yellow space-y-2">
                  <li>• Skipping any step in safe isolation</li>
                  <li>• Using unsafe test equipment (non-GS38 probes, taped leads)</li>
                  <li>• Energising a circuit with exposed copper or missing CPCs</li>
                  <li>• Bypassing protective devices</li>
                  <li>• Failing to label or identify circuits, creating risk for others</li>
                  <li>• Working recklessly — e.g., rushing in testing with live conductors exposed</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800/30 rounded-lg p-4 mt-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-elec-yellow dark:text-elec-yellow mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">Warning:</h4>
                  <p className="text-xs sm:text-sm text-yellow-700 dark:text-yellow-300">
                    These errors are not negotiable. Even if you complete everything else perfectly, any of these safety violations will result in instant failure.
                  </p>
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

        {/* Showing the Assessor */}
        <Card className="bg-card border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Target className="w-5 h-5" />
              4. Showing the Assessor You Are Safe
            </h2>
            
            <p className="text-xs sm:text-sm text-muted-foreground mb-6 leading-relaxed">
              It's not just about being safe — it's about making it clear to the assessor that safety is your priority:
            </p>

            <div className="space-y-6">
              <div className="bg-elec-yellow/5 dark:bg-elec-yellow/10 border border-blue-200 dark:border-blue-800/30 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-3 text-sm sm:text-base">Visible Safety Practices:</h4>
                <ul className="text-xs sm:text-sm text-blue-700 dark:text-elec-yellow space-y-2">
                  <li>• <strong>Talk through steps:</strong> e.g., "I am now proving my tester on a known live source"</li>
                  <li>• <strong>Double-check visibly:</strong> show that you re-sleeve CPCs, torque terminals, re-fit trunking lids</li>
                  <li>• <strong>Label clearly:</strong> DBs, circuits, and accessories must all be identifiable</li>
                  <li>• <strong>Keep order:</strong> tidy work area shows professionalism and reduces risks</li>
                </ul>
              </div>

              <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30 rounded-lg p-4">
                <h4 className="font-medium text-green-800 dark:text-green-200 mb-3 text-sm sm:text-base">Professional Approach:</h4>
                <ul className="text-xs sm:text-sm text-green-700 dark:text-green-300 space-y-2">
                  <li>• Methodical, step-by-step approach to all tasks</li>
                  <li>• Clear communication when explaining what you're doing</li>
                  <li>• Immediate correction of any mistakes, done visibly</li>
                  <li>• Consistent safety practices throughout the entire exam</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* Practical Guidance */}
        <Card className="bg-card border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5" />
              Practical Guidance
            </h2>
            
            <p className="text-xs sm:text-sm text-muted-foreground mb-6 leading-relaxed">
              Think like you're on-site with a client or inspector watching - every action reflects your professionalism:
            </p>

            <div className="space-y-6">
              {/* Scenario 1 */}
              <div className="bg-elec-yellow/5 dark:bg-elec-yellow/10 border border-blue-200 dark:border-blue-800/30 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-3 flex items-center gap-2">
                  <Brain className="w-4 h-4" />
                  Scenario: Beginning Any Task
                </h4>
                <div className="text-xs sm:text-sm text-blue-700 dark:text-elec-yellow space-y-2">
                  <p><strong>Do:</strong> Check your test equipment is GS38-compliant, prove on known live source</p>
                  <p><strong>Say:</strong> "I'm checking my tester before use on this known live source"</p>
                  <p><strong>Why:</strong> Shows methodical approach and compliance with safety standards</p>
                </div>
              </div>

              {/* Scenario 2 */}
              <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30 rounded-lg p-4">
                <h4 className="font-medium text-green-800 dark:text-green-200 mb-3 flex items-center gap-2">
                  <Wrench className="w-4 h-4" />
                  Scenario: Making Connections
                </h4>
                <div className="text-xs sm:text-sm text-green-700 dark:text-green-300 space-y-2">
                  <p><strong>Do:</strong> Connect CPCs first with proper sleeving, torque terminals to spec</p>
                  <p><strong>Say:</strong> "Connecting the CPC first for safety, using green/yellow sleeving"</p>
                  <p><strong>Why:</strong> Demonstrates understanding of safety hierarchy and BS 7671 compliance</p>
                </div>
              </div>

              {/* Scenario 3 */}
              <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800/30 rounded-lg p-4">
                <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-3 flex items-center gap-2">
                  <TestTube className="w-4 h-4" />
                  Scenario: Before Energising
                </h4>
                <div className="text-xs sm:text-sm text-purple-700 dark:text-elec-yellow space-y-2">
                  <p><strong>Do:</strong> Double-check all connections, verify CPC continuity, check polarity</p>
                  <p><strong>Say:</strong> "Checking all connections secure before energising, verifying CPC continuity"</p>
                  <p><strong>Why:</strong> Prevents dangerous situations and shows systematic approach</p>
                </div>
              </div>

              {/* Scenario 4 */}
              <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800/30 rounded-lg p-4">
                <h4 className="font-medium text-orange-800 dark:text-orange-200 mb-3 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Scenario: If You Make a Mistake
                </h4>
                <div className="text-xs sm:text-sm text-orange-700 dark:text-elec-yellow space-y-2">
                  <p><strong>Do:</strong> Stop immediately, isolate if necessary, correct properly</p>
                  <p><strong>Say:</strong> "I need to isolate and correct this connection properly"</p>
                  <p><strong>Why:</strong> Shows honesty, safety-first mindset, and professional integrity</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30 rounded-lg p-3 sm:p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                  <p className="text-xs sm:text-sm text-green-700 dark:text-green-300">
                    <strong>Practise safe isolation</strong> until it is second nature
                  </p>
                </div>
              </div>

              <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30 rounded-lg p-3 sm:p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                  <p className="text-xs sm:text-sm text-green-700 dark:text-green-300">
                    <strong>Always sleeve CPCs immediately</strong> — don't leave it until later
                  </p>
                </div>
              </div>

              <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30 rounded-lg p-3 sm:p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                  <p className="text-xs sm:text-sm text-green-700 dark:text-green-300">
                    <strong>Never cut corners</strong> on test probe safety — keep fingers behind barriers
                  </p>
                </div>
              </div>

              <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30 rounded-lg p-3 sm:p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                  <p className="text-xs sm:text-sm text-green-700 dark:text-green-300">
                    <strong>Ask yourself:</strong> "Is this safe for another electrician to touch right now?"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Real-world Examples */}
        <Card className="bg-card border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Real-world Examples
            </h2>

            <div className="space-y-4">
              <div className="border-l-4 border-l-red-500 bg-red-50 dark:bg-red-950/20 pl-4 py-3 rounded-r">
                <p className="text-xs sm:text-sm text-red-700 dark:text-elec-yellow">
                  <strong>Example 1:</strong> Candidate skipped re-prove of tester in safe isolation → assessor stopped exam → fail.
                </p>
              </div>

              <div className="border-l-4 border-l-red-500 bg-red-50 dark:bg-red-950/20 pl-4 py-3 rounded-r">
                <p className="text-xs sm:text-sm text-red-700 dark:text-elec-yellow">
                  <strong>Example 2:</strong> Candidate completed installation correctly but left bare copper exposed in a socket → unsafe workmanship → marks lost.
                </p>
              </div>

              <div className="border-l-4 border-green-500 bg-green-50 dark:bg-green-950/20 pl-4 py-3 rounded-r">
                <p className="text-xs sm:text-sm text-green-700 dark:text-green-300">
                  <strong>Example 3:</strong> Candidate explained each isolation step out loud, used GS38 leads correctly, and kept tidy work area → assessor noted professionalism → passed.
                </p>
              </div>

              <div className="border-l-4 border-elec-yellow bg-yellow-50 dark:bg-yellow-950/20 pl-4 py-3 rounded-r">
                <p className="text-xs sm:text-sm text-yellow-700 dark:text-yellow-300">
                  <strong>Example 4:</strong> In industry, an electrician energised a circuit with no CPC → shock incident. Same behaviour in AM2 = instant fail.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="bg-card border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Brain className="w-5 h-5" />
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-foreground mb-2 text-sm sm:text-base">Q1: Do assessors allow small safety mistakes?</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  No — safety errors are heavily penalised, and critical errors result in instant failure. There are no "small" safety mistakes in electrical work.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2 text-sm sm:text-base">Q2: What if I realise I've made a safety error during the exam?</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Stop immediately, inform the assessor, isolate if necessary, and correct it properly. Honesty and immediate correction show professional integrity.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2 text-sm sm:text-base">Q3: Is it better to be slow and safe, or fast and efficient?</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Always slow and safe. Speed is never prioritised over safety in AM2. A methodical, safe approach will always score higher than rushing.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2 text-sm sm:text-base">Q4: Should I verbalise my safety steps?</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Yes! Talking through safety steps like "proving my tester on known live source" clearly demonstrates your understanding to the assessor.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2 text-sm sm:text-base">Q5: What happens if my test equipment fails during the exam?</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Stop work immediately, inform the assessor, and request replacement equipment. Never continue with faulty or unsafe test equipment.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Summary */}
        <Card className="bg-card border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Summary
            </h2>

            <div className="bg-elec-yellow/5 dark:bg-elec-yellow/10 border border-blue-200 dark:border-blue-800/30 rounded-lg p-4">
              <p className="text-xs sm:text-sm text-blue-700 dark:text-elec-yellow mb-4 font-medium">
                In AM2, safety is the foundation of everything. You must:
              </p>
              <ul className="text-xs sm:text-sm text-blue-700 dark:text-elec-yellow space-y-1">
                <li>• Follow safe isolation correctly</li>
                <li>• Use PPE and tools properly</li>
                <li>• Terminate and test safely with GS38 compliance</li>
                <li>• Keep your work area tidy and circuits safe</li>
                <li>• Show the assessor, clearly and confidently, that safety is always your first priority</li>
              </ul>
              <p className="text-xs sm:text-sm text-blue-700 dark:text-elec-yellow mt-4 font-bold">
                Unsafe = fail. Safe = pass.
              </p>
            </div>
          </div>
        </Card>

        {/* Quiz Section */}
        <Card className="bg-card border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <TestTube className="w-5 h-5" />
              10-Question Quiz
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mb-6">
              Test your understanding of safety requirements in AM2:
            </p>
            <Quiz questions={quizQuestions} />
          </div>
        </Card>

        {/* Footer Navigation */}
        <div className="flex items-center justify-between pt-6 sm:pt-8 border-t border-border/20">
          <Button variant="outline" className="text-sm sm:text-base" asChild>
            <Link to="../section2">
              <ArrowLeft className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="hidden xs:inline">Previous: Coping with Nerves</span>
              <span className="xs:hidden">Previous</span>
            </Link>
          </Button>
          <Button className="text-sm sm:text-base" asChild>
            <Link to="../section4">
              <span className="hidden xs:inline">Next: Practical Skills Review</span>
              <span className="xs:hidden">Next</span>
              <ArrowRight className="w-4 h-4 ml-1 sm:ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AM2Module7Section3;