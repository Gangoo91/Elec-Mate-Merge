import { ArrowLeft, ArrowRight, AlertTriangle, CheckCircle, Target, Timer, Lightbulb, Brain, BookOpen, Users, Wrench, Eye, TestTube, Zap, FileText, Clock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const AM2Module7Section4 = () => {
  useSEO(
    "Avoiding Common Mistakes | AM2 Module 7 Section 4",
    "Most common AM2 failures and how to avoid them - Critical pitfalls and prevention strategies"
  );

  const quickCheckQuestions: Array<{
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }> = [
    {
      id: "isolation-mistake",
      question: "What happens if you forget to re-prove your tester after proving dead?",
      options: [
        "Minor mark deduction",
        "Warning from assessor", 
        "Automatic fail — unsafe isolation",
        "No consequence if circuit is actually dead"
      ],
      correctIndex: 2,
      explanation: "Forgetting to re-prove your tester after proving dead is an automatic fail as it represents unsafe isolation procedure."
    },
    {
      id: "testing-order",
      question: "What sequence must testing follow in AM2?",
      options: [
        "Any logical order",
        "GN3 sequence exactly",
        "Start with most important tests",
        "Assessor will tell you the order"
      ],
      correctIndex: 1,
      explanation: "Testing must follow the exact GN3 sequence as specified in the guidance notes - this is mandatory."
    },
    {
      id: "fault-finding-error",
      question: "What's wrong with writing 'fault fixed' in fault-finding?",
      options: [
        "Too informal language",
        "Should be 'fault corrected'",
        "Doesn't explain what rectification was done",
        "Nothing wrong with it"
      ],
      correctIndex: 2,
      explanation: "Writing 'fault fixed' doesn't explain the specific rectification action taken - you must state exactly what was done."
    }
  ];

  const quizQuestions = [
    {
      id: 1,
      question: "What is the number one cause of AM2 failure?",
      options: [
        "Poor installation work",
        "Failing the knowledge test",
        "Safe isolation mistakes",
        "Running out of time"
      ],
      correctAnswer: 2,
      explanation: "Safe isolation mistakes are the number one cause of AM2 failure, often resulting in automatic fail."
    },
    {
      id: 2,
      question: "Give two common installation mistakes:",
      options: [
        "Working too slowly, asking too many questions",
        "Bare copper exposed, CPCs unsleeved",
        "Using wrong tools, working alone",
        "Taking too many breaks, talking too much"
      ],
      correctAnswer: 1,
      explanation: "Common installation mistakes include leaving bare copper exposed and failing to sleeve CPCs properly."
    },
    {
      id: 3,
      question: "Why is writing '0 Ω' as Zs a mistake?",
      options: [
        "It's the wrong unit",
        "It's unrealistic - no circuit has zero impedance",
        "It should be written as '< 0.01 Ω'",
        "Assessors don't like zeros"
      ],
      correctAnswer: 1,
      explanation: "Writing '0 Ω' is unrealistic as no real circuit has zero impedance - give realistic measured values."
    },
    {
      id: 4,
      question: "What must always follow a rectification statement?",
      options: [
        "Assessor approval",
        "A re-test statement",
        "Client notification",
        "Tool inspection"
      ],
      correctAnswer: 1,
      explanation: "Every rectification statement must be followed by stating what re-test will be carried out to verify the repair."
    },
    {
      id: 5,
      question: "True or false: You should leave questions blank in the knowledge test if unsure:",
      options: [
        "True",
        "False"
      ],
      correctAnswer: 1,
      explanation: "False - always attempt every question. You might get it right, and you definitely won't if you leave it blank."
    },
    {
      id: 6,
      question: "What's the most common exam trap in knowledge test wording?",
      options: [
        "Complex technical terms",
        "Confusing 'maximum' vs 'minimum'",
        "Multiple choice format",
        "Time pressure"
      ],
      correctAnswer: 1,
      explanation: "The most common trap is misreading key words like 'maximum' vs 'minimum' - always underline key words."
    },
    {
      id: 7,
      question: "Why is labelling circuits in the DB important?",
      options: [
        "It looks professional",
        "It's required for safety and identification",
        "Assessors like tidy work",
        "It saves time later"
      ],
      correctAnswer: 1,
      explanation: "Circuit labelling is essential for safety and proper identification - failure to label loses marks."
    },
    {
      id: 8,
      question: "What type of tester should you use for safe isolation?",
      options: [
        "Digital multimeter",
        "Two-pole voltage indicator (GS38)",
        "Insulation resistance tester",
        "Continuity tester"
      ],
      correctAnswer: 1,
      explanation: "Safe isolation requires a two-pole voltage indicator compliant with GS38 - not a multimeter."
    },
    {
      id: 9,
      question: "What's the golden rule for avoiding common mistakes in AM2?",
      options: [
        "Work as fast as possible",
        "Preparation, calm discipline, and self-checking",
        "Copy other candidates",
        "Ask assessor for help frequently"
      ],
      correctAnswer: 1,
      explanation: "The golden rule is preparation, calm discipline, and self-checking to avoid avoidable mistakes."
    },
    {
      id: 10,
      question: "What should you do if you make a mistake during the exam?",
      options: [
        "Hide it and continue",
        "Stop immediately, inform assessor, and correct it properly",
        "Ask another candidate for help",
        "Pretend it didn't happen"
      ],
      correctAnswer: 1,
      explanation: "Stop immediately, inform the assessor, and correct the mistake properly - honesty shows professionalism."
    }
  ];

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Header */}
      <div className="border-b border-white/10 bg-card/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-2">
            <Button variant="ghost" className="min-h-[44px] p-3 text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
              <Link to="..">
                <ArrowLeft className="w-4 h-4 mr-1 sm:mr-2" />
                <span className="hidden xs:inline">Back to Module 7</span>
                <span className="xs:hidden">Back</span>
              </Link>
            </Button>
            <Button variant="ghost" className="min-h-[44px] p-3 text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
              <Link to="../section5">
                <span className="hidden xs:inline">Module 7 Section 5</span>
                <span className="xs:hidden">Section 5</span>
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
            <AlertTriangle className="w-4 h-4" />
            Module 7 – Section 4
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            Avoiding Common Mistakes
          </h1>
          <p className="text-sm sm:text-base text-white mb-6 sm:mb-8 leading-relaxed">
            The AM2 is designed to test competence, not trick candidates. Yet many apprentices fail because of the same avoidable mistakes: rushing, skipping steps, poor paperwork, or guessing. If you know what the common pitfalls are, you can prepare for them and make sure you don't fall into the same traps.
          </p>
        </div>

        {/* Critical Warning */}
        <Card className="bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-800/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-600 dark:text-elec-yellow mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-orange-800 dark:text-orange-200 mb-2 text-sm sm:text-base">
                  IMPORTANT: Most Failures Are Avoidable
                </h3>
                <p className="text-xs sm:text-sm text-orange-700 dark:text-elec-yellow mb-3 leading-relaxed">
                  NET statistics show that most AM2 failures are due to repeated common mistakes, not lack of technical knowledge. These errors are predictable and preventable.
                </p>
                <p className="text-xs sm:text-sm text-orange-700 dark:text-elec-yellow font-medium leading-relaxed">
                  Know the pitfalls, prepare for them, and you'll avoid the traps that catch many candidates.
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
              By the end of this section, you will be able to:
            </p>
            <ul className="space-y-2 text-xs sm:text-xs sm:text-sm text-white">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Identify the most common reasons candidates fail the AM2
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Apply strategies to avoid these mistakes in each section of the assessment
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Work more confidently by knowing the assessor's "red flags"
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Maintain accuracy and safety even under time pressure
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Finish AM2 with fewer lost marks from avoidable errors
              </li>
            </ul>
          </div>
        </Card>

        {/* Safe Isolation Mistakes */}
        <Card className="bg-transparent border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              1. Safe Isolation Mistakes
            </h2>
            
            <p className="text-xs sm:text-sm text-white mb-6 leading-relaxed">
              This is the number one cause of failure. Candidates either forget a step or rush through the process.
            </p>

            <div className="space-y-6">
              <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30 rounded-lg p-4">
                <h4 className="font-medium text-red-800 dark:text-red-200 mb-3 text-sm sm:text-base">Most Common Isolation Errors:</h4>
                <ul className="text-xs sm:text-sm text-red-700 dark:text-elec-yellow space-y-2">
                  <li>• <strong>Skipping the re-prove step</strong> after testing dead</li>
                  <li>• <strong>Using wrong tester</strong> (multimeter instead of two-pole voltage indicator)</li>
                  <li>• <strong>Not locking off correctly</strong> or forgetting to secure isolation</li>
                  <li>• <strong>Testing at wrong points</strong> or missing test points</li>
                  <li>• <strong>Rushing the process</strong> under time pressure</li>
                  <li>• <strong>Failing to identify all sources</strong> of supply to the circuit</li>
                  <li>• <strong>Not proving tester initially</strong> on known live source</li>
                  <li>• <strong>Using damaged test leads</strong> or non-GS38 equipment</li>
                </ul>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800/30 rounded-lg p-4">
                <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-3">Why These Errors Happen:</h4>
                <ul className="text-xs sm:text-sm text-yellow-700 dark:text-yellow-300 space-y-2">
                  <li>• <strong>Time pressure</strong> - candidates rush basic safety steps</li>
                  <li>• <strong>Overconfidence</strong> - assuming circuit is dead without proper verification</li>
                  <li>• <strong>Poor preparation</strong> - not practicing the full 10-step sequence</li>
                  <li>• <strong>Equipment unfamiliarity</strong> - using unfamiliar test instruments</li>
                  <li>• <strong>Stress response</strong> - forgetting steps under exam pressure</li>
                </ul>
              </div>

              <div className="bg-elec-yellow/5 dark:bg-elec-yellow/10 border border-blue-200 dark:border-blue-800/30 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-3">Detailed Prevention Strategy:</h4>
                <div className="space-y-3">
                  <div>
                    <h5 className="font-medium text-blue-800 dark:text-blue-200 text-xs sm:text-sm">Before You Start:</h5>
                    <ul className="text-xs sm:text-sm text-blue-700 dark:text-elec-yellow space-y-1 ml-4">
                      <li>• Check test equipment is GS38-compliant and in good condition</li>
                      <li>• Verify you have correct PPE for the task</li>
                      <li>• Identify all possible sources of supply to the circuit</li>
                      <li>• Plan your isolation strategy before touching anything</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-800 dark:text-blue-200 text-xs sm:text-sm">During Isolation:</h5>
                    <ul className="text-xs sm:text-sm text-blue-700 dark:text-elec-yellow space-y-1 ml-4">
                      <li>• Follow the 10-step process religiously - no shortcuts</li>
                      <li>• Verbalise each step to the assessor clearly</li>
                      <li>• Take your time - safety over speed always</li>
                      <li>• Test at all relevant points, not just one location</li>
                      <li>• Use lockable isolation where possible</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-800 dark:text-blue-200 text-xs sm:text-sm">After Testing Dead:</h5>
                    <ul className="text-xs sm:text-sm text-blue-700 dark:text-elec-yellow space-y-1 ml-4">
                      <li>• Always re-prove tester on known live source</li>
                      <li>• Confirm tester is working correctly</li>
                      <li>• Only then proceed with work on dead circuit</li>
                      <li>• Maintain isolation throughout the task</li>
                    </ul>
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

        {/* Installation Mistakes */}
        <Card className="bg-transparent border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Wrench className="w-5 h-5" />
              2. Installation Mistakes
            </h2>
            
            <p className="text-xs sm:text-sm text-white mb-6 leading-relaxed">
              Most marks are lost here because of poor workmanship and time management issues.
            </p>

            <div className="space-y-6">
              {/* Common Installation Errors */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold">!</div>
                <div className="flex-1">
                  <h5 className="font-medium text-white mb-2">Common Installation Errors</h5>
                  <div className="bg-red-50 dark:bg-red-950/20 rounded p-3 text-xs sm:text-sm">
                    <ul className="text-red-700 dark:text-elec-yellow space-y-1">
                      <li>• <strong>Untidy containment:</strong> conduit kinks, trunking lids not flush, poor bending radius</li>
                      <li>• <strong>Bare copper exposed</strong> at terminations - major safety issue</li>
                      <li>• <strong>CPCs unsleeved</strong> or left disconnected - BS 7671 non-compliance</li>
                      <li>• <strong>Accessories crooked</strong> or at wrong height - poor workmanship</li>
                      <li>• <strong>Not labelling circuits</strong> in distribution board - identification failure</li>
                      <li>• <strong>Poor cable management</strong> and untidy work area</li>
                      <li>• <strong>Incorrect gland entries</strong> or missing cable protection</li>
                      <li>• <strong>Over-tightened or loose connections</strong> at terminals</li>
                      <li>• <strong>Wrong cable routes</strong> or inadequate support</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Why Installation Errors Happen */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold">?</div>
                <div className="flex-1">
                  <h5 className="font-medium text-white mb-2">Why Installation Errors Happen</h5>
                  <div className="bg-orange-50 dark:bg-orange-950/20 rounded p-3 text-xs sm:text-sm">
                    <ul className="text-orange-700 dark:text-elec-yellow space-y-1">
                      <li>• <strong>Time pressure</strong> - rushing to complete tasks</li>
                      <li>• <strong>Poor planning</strong> - not measuring and marking out properly</li>
                      <li>• <strong>Lack of experience</strong> with commercial installation methods</li>
                      <li>• <strong>Forgetting basics</strong> under exam stress</li>
                      <li>• <strong>Not self-checking</strong> work before calling assessor</li>
                      <li>• <strong>Overconfidence</strong> in familiar tasks</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Detailed Prevention Strategy */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">✓</div>
                <div className="flex-1">
                  <h5 className="font-medium text-white mb-2">Comprehensive Prevention Strategy</h5>
                  <div className="bg-green-50 dark:bg-green-950/20 rounded p-3 text-xs sm:text-sm">
                    <div className="space-y-3">
                      <div>
                        <h6 className="font-medium text-green-800 dark:text-green-200 text-xs">Planning Phase:</h6>
                        <ul className="text-green-700 dark:text-green-300 space-y-1 ml-4">
                          <li>• Measure and mark out carefully before starting</li>
                          <li>• Plan cable routes for neatness and compliance</li>
                          <li>• Check all materials and tools are available</li>
                          <li>• Understand the installation requirements fully</li>
                        </ul>
                      </div>
                      <div>
                        <h6 className="font-medium text-green-800 dark:text-green-200 text-xs">During Installation:</h6>
                        <ul className="text-green-700 dark:text-green-300 space-y-1 ml-4">
                          <li>• Work steadily rather than rushing - quality over speed</li>
                          <li>• Connect and sleeve CPCs first, disconnect last</li>
                          <li>• Use proper torque settings for all connections</li>
                          <li>• Maintain professional cable management throughout</li>
                          <li>• Keep work area tidy and organised</li>
                        </ul>
                      </div>
                      <div>
                        <h6 className="font-medium text-green-800 dark:text-green-200 text-xs">Quality Control:</h6>
                        <ul className="text-green-700 dark:text-green-300 space-y-1 ml-4">
                          <li>• Label circuits as you install them - don't leave to end</li>
                          <li>• Self-check work before calling assessor</li>
                          <li>• Ensure no bare copper is visible anywhere</li>
                          <li>• Check all accessories are level and secure</li>
                          <li>• Verify all connections are tight and proper</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Professional Standards */}
              <div className="bg-elec-yellow/5 dark:bg-elec-yellow/10 border border-blue-200 dark:border-blue-800/30 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-3 flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Professional Standards Checklist
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div>
                    <h5 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Containment Quality:</h5>
                    <ul className="text-blue-700 dark:text-elec-yellow space-y-1">
                      <li>• No conduit kinks or damage</li>
                      <li>• Trunking lids flush and secure</li>
                      <li>• Proper bending radius maintained</li>
                      <li>• Clean, straight runs</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Termination Quality:</h5>
                    <ul className="text-blue-700 dark:text-elec-yellow space-y-1">
                      <li>• No bare copper visible</li>
                      <li>• All CPCs properly sleeved</li>
                      <li>• Correct termination sequence</li>
                      <li>• Proper torque applied</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Inspection & Testing Mistakes */}
        <Card className="bg-transparent border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <TestTube className="w-5 h-5" />
              3. Inspection & Testing Mistakes
            </h2>
            
            <p className="text-xs sm:text-sm text-white mb-6 leading-relaxed">
              This section often sinks candidates who know the tests but don't follow proper procedure.
            </p>

            <div className="space-y-6">
              <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800/30 rounded-lg p-4">
                <h4 className="font-medium text-orange-800 dark:text-orange-200 mb-3">Common Testing Errors:</h4>
                <ul className="text-xs sm:text-sm text-orange-700 dark:text-elec-yellow space-y-2">
                  <li>• <strong>Wrong order of tests</strong> (not following GN3 sequence exactly)</li>
                  <li>• <strong>Forgetting insulation resistance</strong> on individual circuits</li>
                  <li>• <strong>Not recording results</strong> as they go - leaving it to memory</li>
                  <li>• <strong>Writing unrealistic values</strong> ("0 Ω" Zs, "∞" IR, "999 MΩ")</li>
                  <li>• <strong>Incorrect test methods</strong> or wrong instrument ranges</li>
                  <li>• <strong>Not disconnecting equipment</strong> before insulation resistance testing</li>
                  <li>• <strong>Testing at wrong voltage</strong> for insulation resistance</li>
                  <li>• <strong>Missing polarity checks</strong> on relevant circuits</li>
                  <li>• <strong>Incorrect RCD testing</strong> procedure or values</li>
                </ul>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800/30 rounded-lg p-4">
                <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-3">Why Testing Errors Occur:</h4>
                <ul className="text-xs sm:text-sm text-yellow-700 dark:text-yellow-300 space-y-2">
                  <li>• <strong>Not following GN3 systematically</strong> - trying to remember sequence</li>
                  <li>• <strong>Unfamiliarity with test instruments</strong> - using wrong settings</li>
                  <li>• <strong>Poor documentation habits</strong> - recording results later</li>
                  <li>• <strong>Lack of understanding</strong> of what realistic values should be</li>
                  <li>• <strong>Time pressure</strong> - skipping steps to save time</li>
                  <li>• <strong>Not preparing test area</strong> properly beforehand</li>
                </ul>
              </div>

              <div className="bg-elec-yellow/5 dark:bg-elec-yellow/10 border border-blue-200 dark:border-blue-800/30 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-3">Comprehensive Testing Strategy:</h4>
                <div className="space-y-3">
                  <div>
                    <h5 className="font-medium text-blue-800 dark:text-blue-200 text-xs sm:text-sm">Before Testing:</h5>
                    <ul className="text-xs sm:text-sm text-blue-700 dark:text-elec-yellow space-y-1 ml-4">
                      <li>• Have GN3 sequence clearly available for reference</li>
                      <li>• Prepare all test instruments and check calibration</li>
                      <li>• Set up documentation sheets ready for recording</li>
                      <li>• Ensure circuit is properly isolated before testing</li>
                      <li>• Disconnect or isolate equipment that could be damaged</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-800 dark:text-blue-200 text-xs sm:text-sm">During Testing:</h5>
                    <ul className="text-xs sm:text-sm text-blue-700 dark:text-elec-yellow space-y-1 ml-4">
                      <li>• Stick to GN3 order exactly - no shortcuts or variations</li>
                      <li>• Record results immediately after each test</li>
                      <li>• Use correct test methods and instrument settings</li>
                      <li>• Give realistic measured values based on circuit characteristics</li>
                      <li>• Double-check you've completed all required tests</li>
                      <li>• Verify test results make sense for the installation</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-800 dark:text-blue-200 text-xs sm:text-sm">Realistic Values Guide:</h5>
                    <ul className="text-xs sm:text-sm text-blue-700 dark:text-elec-yellow space-y-1 ml-4">
                      <li>• <strong>Continuity:</strong> Typically 0.05-0.5 Ω depending on circuit length</li>
                      <li>• <strong>Insulation Resistance:</strong> Usually 50-500 MΩ, not "∞"</li>
                      <li>• <strong>Zs values:</strong> Realistic for circuit type and length, never "0"</li>
                      <li>• <strong>RCD trip times:</strong> Within specified ranges, typically 20-40ms</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30 rounded-lg p-4">
                <h4 className="font-medium text-green-800 dark:text-green-200 mb-3">GN3 Test Sequence Reminder:</h4>
                <ol className="text-xs sm:text-sm text-green-700 dark:text-green-300 space-y-1 list-decimal list-inside">
                  <li>Continuity of protective conductors</li>
                  <li>Continuity of ring final circuit conductors</li>
                  <li>Insulation resistance</li>
                  <li>Polarity</li>
                  <li>Earth electrode resistance (where applicable)</li>
                  <li>Earth fault loop impedance</li>
                  <li>Prospective fault current</li>
                  <li>Functional testing</li>
                </ol>
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

        {/* Fault-finding Mistakes */}
        <Card className="bg-transparent border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Eye className="w-5 h-5" />
              4. Fault-finding Mistakes
            </h2>
            
            <p className="text-xs sm:text-sm text-white mb-6 leading-relaxed">
              Most apprentices fail this section by guessing or not stating rectification properly.
            </p>

            <div className="space-y-6">
              <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30 rounded-lg p-4">
                <h4 className="font-medium text-red-800 dark:text-red-200 mb-3">Common Fault-finding Errors:</h4>
                <ul className="text-xs sm:text-sm text-red-700 dark:text-elec-yellow space-y-2">
                  <li>• <strong>Guessing instead of testing logically</strong> - jumping to conclusions</li>
                  <li>• <strong>Not writing rectification clearly</strong> (e.g., "fix fault" instead of "reconnect CPC at socket and re-test continuity")</li>
                  <li>• <strong>Forgetting to state re-test</strong> after rectification</li>
                  <li>• <strong>Poor documentation</strong> of fault-finding process</li>
                  <li>• <strong>Not following systematic approach</strong> to fault diagnosis</li>
                  <li>• <strong>Making dangerous assumptions</strong> about circuit condition</li>
                  <li>• <strong>Not isolating properly</strong> before investigating faults</li>
                  <li>• <strong>Incomplete fault location</strong> - stopping at symptoms not causes</li>
                  <li>• <strong>Vague rectification statements</strong> that don't specify exact actions</li>
                </ul>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800/30 rounded-lg p-4">
                <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-3">Why Fault-finding Fails:</h4>
                <ul className="text-xs sm:text-sm text-yellow-700 dark:text-yellow-300 space-y-2">
                  <li>• <strong>Time pressure</strong> - rushing to find quick answers</li>
                  <li>• <strong>Lack of systematic approach</strong> - no structured method</li>
                  <li>• <strong>Poor understanding</strong> of fault symptoms vs causes</li>
                  <li>• <strong>Inadequate documentation skills</strong> - not explaining clearly</li>
                  <li>• <strong>Making assumptions</strong> rather than testing hypotheses</li>
                  <li>• <strong>Not understanding assessment criteria</strong> for fault-finding marks</li>
                </ul>
              </div>

              <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30 rounded-lg p-4">
                <h4 className="font-medium text-green-800 dark:text-green-200 mb-3">Comprehensive Fault-finding Strategy:</h4>
                <div className="space-y-3">
                  <div>
                    <h5 className="font-medium text-green-800 dark:text-green-200 text-xs sm:text-sm">1. Systematic Diagnosis Process:</h5>
                    <ul className="text-xs sm:text-sm text-green-700 dark:text-green-300 space-y-1 ml-4">
                      <li>• <strong>Gather information:</strong> What symptoms are reported?</li>
                      <li>• <strong>Form hypothesis:</strong> What could cause these symptoms?</li>
                      <li>• <strong>Test hypothesis:</strong> Use appropriate tests to confirm or eliminate</li>
                      <li>• <strong>Locate precisely:</strong> Find exact location and nature of fault</li>
                      <li>• <strong>Document findings:</strong> Record test results and conclusions</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-green-800 dark:text-green-200 text-xs sm:text-sm">2. Clear Rectification Statements:</h5>
                    <div className="bg-green-100 dark:bg-green-900/30 rounded p-2 mt-2">
                      <p className="text-xs sm:text-sm text-green-700 dark:text-green-300 mb-2"><strong>Instead of:</strong> "Fix broken wire"</p>
                      <p className="text-xs sm:text-sm text-green-700 dark:text-green-300"><strong>Write:</strong> "Replace damaged section of 2.5mm² T&E cable between positions A and B, making connections using 30A junction box with maintenance-free connectors"</p>
                    </div>
                  </div>
                  <div>
                    <h5 className="font-medium text-green-800 dark:text-green-200 text-xs sm:text-sm">3. Essential Re-test Statements:</h5>
                    <ul className="text-xs sm:text-sm text-green-700 dark:text-green-300 space-y-1 ml-4">
                      <li>• Always specify which test confirms the repair</li>
                      <li>• State expected result of the re-test</li>
                      <li>• Example: "Re-test continuity of CPC - expect reading less than 0.5Ω"</li>
                      <li>• Include functional testing where appropriate</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-elec-yellow/5 dark:bg-elec-yellow/10 border border-blue-200 dark:border-blue-800/30 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-3">Fault-finding Documentation Template:</h4>
                <div className="space-y-2 text-xs sm:text-sm text-blue-700 dark:text-elec-yellow">
                  <div className="border-l-2 border-elec-yellow pl-3">
                    <p><strong>1. Symptom:</strong> [What is reported/observed]</p>
                    <p><strong>2. Tests carried out:</strong> [Specific tests and results]</p>
                    <p><strong>3. Fault identified:</strong> [Precise fault location and nature]</p>
                    <p><strong>4. Rectification:</strong> [Exact action taken to fix fault]</p>
                    <p><strong>5. Re-test:</strong> [Test to verify repair and expected result]</p>
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

        {/* Knowledge Test Mistakes */}
        <Card className="bg-transparent border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Brain className="w-5 h-5" />
              5. Knowledge Test Mistakes
            </h2>
            
            <p className="text-xs sm:text-sm text-white mb-6 leading-relaxed">
              Many lose marks here due to exam discipline, not lack of knowledge.
            </p>

            <div className="space-y-6">
              <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800/30 rounded-lg p-4">
                <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-3">Common Knowledge Test Errors:</h4>
                <ul className="text-xs sm:text-sm text-yellow-700 dark:text-yellow-300 space-y-2">
                  <li>• <strong>Misreading key words</strong> ("maximum" vs "minimum", "must" vs "should")</li>
                  <li>• <strong>Confusing units</strong> (seconds vs milliseconds, kW vs W, mA vs A)</li>
                  <li>• <strong>Spending too long</strong> on difficult questions, running out of time</li>
                  <li>• <strong>Leaving blanks</strong> instead of educated guessing</li>
                  <li>• <strong>Not checking answers</strong> before submitting</li>
                  <li>• <strong>Calculation errors</strong> from rushing or poor arithmetic</li>
                  <li>• <strong>Not using process of elimination</strong> effectively</li>
                  <li>• <strong>Second-guessing correct first instincts</strong></li>
                  <li>• <strong>Not reading all options</strong> before selecting answer</li>
                </ul>
              </div>

              <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30 rounded-lg p-4">
                <h4 className="font-medium text-red-800 dark:text-red-200 mb-3">Why Knowledge Test Errors Happen:</h4>
                <ul className="text-xs sm:text-sm text-red-700 dark:text-elec-yellow space-y-2">
                  <li>• <strong>Exam pressure</strong> causing rushed reading and poor concentration</li>
                  <li>• <strong>Overconfidence</strong> in familiar topics leading to careless mistakes</li>
                  <li>• <strong>Poor time management</strong> - not allocating time properly across questions</li>
                  <li>• <strong>Lack of exam technique</strong> - not using strategies for multiple choice</li>
                  <li>• <strong>Stress affecting memory</strong> recall of learned information</li>
                  <li>• <strong>Not practicing under timed conditions</strong> beforehand</li>
                </ul>
              </div>

              <div className="bg-elec-yellow/5 dark:bg-elec-yellow/10 border border-blue-200 dark:border-blue-800/30 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-3">Comprehensive Knowledge Test Strategy:</h4>
                <div className="space-y-3">
                  <div>
                    <h5 className="font-medium text-blue-800 dark:text-blue-200 text-xs sm:text-sm">Before Starting:</h5>
                    <ul className="text-xs sm:text-sm text-blue-700 dark:text-elec-yellow space-y-1 ml-4">
                      <li>• Read instructions carefully and note time allocation</li>
                      <li>• Scan through all questions to gauge difficulty</li>
                      <li>• Plan time allocation (e.g., 2 minutes per question)</li>
                      <li>• Have spare pen/pencil ready</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-800 dark:text-blue-200 text-xs sm:text-sm">For Each Question:</h5>
                    <ul className="text-xs sm:text-sm text-blue-700 dark:text-elec-yellow space-y-1 ml-4">
                      <li>• Read question twice, underlining key words</li>
                      <li>• Check units required in answer</li>
                      <li>• Read all options before deciding</li>
                      <li>• Eliminate obviously wrong answers first</li>
                      <li>• Use process of elimination systematically</li>
                      <li>• If unsure, make educated guess rather than leave blank</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-800 dark:text-blue-200 text-xs sm:text-sm">Time Management:</h5>
                    <ul className="text-xs sm:text-sm text-blue-700 dark:text-elec-yellow space-y-1 ml-4">
                      <li>• Don't spend more than allocated time per question</li>
                      <li>• Mark difficult questions and return to them</li>
                      <li>• Always attempt every question - never leave blanks</li>
                      <li>• Save time for final review if possible</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30 rounded-lg p-4">
                <h4 className="font-medium text-green-800 dark:text-green-200 mb-3">Key Word Recognition Guide:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div>
                    <h5 className="font-medium text-green-800 dark:text-green-200 mb-2">Critical Distinctions:</h5>
                    <ul className="text-green-700 dark:text-green-300 space-y-1">
                      <li>• <strong>Maximum vs Minimum</strong> - completely different answers</li>
                      <li>• <strong>Must vs Should</strong> - regulatory vs recommended</li>
                      <li>• <strong>Not less than vs Not more than</strong> - direction matters</li>
                      <li>• <strong>Nominal vs Actual</strong> - design vs measured values</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-green-800 dark:text-green-200 mb-2">Common Unit Traps:</h5>
                    <ul className="text-green-700 dark:text-green-300 space-y-1">
                      <li>• <strong>mA vs A</strong> - factor of 1000</li>
                      <li>• <strong>ms vs s</strong> - factor of 1000</li>
                      <li>• <strong>kW vs W</strong> - factor of 1000</li>
                      <li>• <strong>mm² vs m²</strong> - factor of 1,000,000</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Practical Guidance */}
        <Card className="bg-transparent border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5" />
              Practical Guidance
            </h2>
            
            <p className="text-xs sm:text-sm text-white mb-6 leading-relaxed">
              Professional habits that prevent common mistakes:
            </p>

            <div className="space-y-6">
              {/* Mindset */}
              <div className="bg-elec-yellow/5 dark:bg-elec-yellow/10 border border-blue-200 dark:border-blue-800/30 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-3 flex items-center gap-2">
                  <Brain className="w-4 h-4" />
                  Professional Mindset
                </h4>
                <ul className="text-xs sm:text-sm text-blue-700 dark:text-elec-yellow space-y-2">
                  <li>• Always think "What would the assessor mark as unsafe?" and avoid it</li>
                  <li>• Build habits of checking work: no bare copper, CPC sleeved, labels applied</li>
                  <li>• Slow down slightly on safety-critical steps - rushing isolation or testing = fail</li>
                  <li>• Treat paperwork as part of the exam, not an afterthought</li>
                </ul>
              </div>

              {/* Communication */}
              <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30 rounded-lg p-4">
                <h4 className="font-medium text-green-800 dark:text-green-200 mb-3 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Communication Strategy
                </h4>
                <ul className="text-xs sm:text-sm text-green-700 dark:text-green-300 space-y-2">
                  <li>• If unsure, explain your process out loud - it earns credit even if result isn't perfect</li>
                  <li>• Ask for clarification if instructions are unclear</li>
                  <li>• Inform assessor of any issues or concerns immediately</li>
                  <li>• Demonstrate your thinking process, not just the end result</li>
                </ul>
              </div>

              {/* Quality Control */}
              <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800/30 rounded-lg p-4">
                <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Quality Control Habits
                </h4>
                <ul className="text-xs sm:text-sm text-purple-700 dark:text-elec-yellow space-y-2">
                  <li>• Self-check your work before calling the assessor</li>
                  <li>• Use a systematic checklist approach</li>
                  <li>• Document everything as you go, not at the end</li>
                  <li>• Leave every stage in a safe, professional condition</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* Real-world Examples */}
        <Card className="bg-transparent border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Real-world Examples
            </h2>

            <div className="space-y-4">
              <div className="border-l-4 border-l-red-500 bg-red-50 dark:bg-red-950/20 pl-4 py-3 rounded-r">
                <p className="text-xs sm:text-sm text-red-700 dark:text-elec-yellow">
                  <strong>Example 1:</strong> Candidate skipped re-prove in safe isolation procedure → assessor stopped exam immediately → automatic fail.
                </p>
              </div>

              <div className="border-l-4 border-orange-500 bg-orange-50 dark:bg-orange-950/20 pl-4 py-3 rounded-r">
                <p className="text-xs sm:text-sm text-orange-700 dark:text-elec-yellow">
                  <strong>Example 2:</strong> Candidate installed everything neatly but didn't label circuits in DB → lost significant marks unnecessarily for incomplete work.
                </p>
              </div>

              <div className="border-l-4 border-elec-yellow bg-yellow-50 dark:bg-yellow-950/20 pl-4 py-3 rounded-r">
                <p className="text-xs sm:text-sm text-yellow-700 dark:text-yellow-300">
                  <strong>Example 3:</strong> Candidate wrote "fault fixed" instead of explaining specific rectification action → lost fault-finding marks for poor documentation.
                </p>
              </div>

              <div className="border-l-4 border-elec-yellow bg-elec-yellow/5 dark:bg-elec-yellow/10 pl-4 py-3 rounded-r">
                <p className="text-xs sm:text-sm text-blue-700 dark:text-elec-yellow">
                  <strong>Example 4:</strong> Candidate misread "minimum IR" and answered with recommended value instead of required minimum → lost marks in knowledge test.
                </p>
              </div>

              <div className="border-l-4 border-green-500 bg-green-50 dark:bg-green-950/20 pl-4 py-3 rounded-r">
                <p className="text-xs sm:text-sm text-green-700 dark:text-green-300">
                  <strong>Example 5:</strong> Candidate followed systematic approach, documented clearly, and self-checked work → passed comfortably despite minor technical error.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="bg-transparent border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Brain className="w-5 h-5" />
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-white mb-2 text-sm sm:text-base">Q1: Are common mistakes published by NET?</h3>
                <p className="text-xs sm:text-sm text-white">
                  Yes — NET highlights common fail areas in pre-assessment manuals and training materials. They want you to succeed.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-white mb-2 text-sm sm:text-base">Q2: Do assessors allow small errors?</h3>
                <p className="text-xs sm:text-sm text-white">
                  Some workmanship issues lose marks but don't cause failure. However, safety errors cause instant fail regardless of size.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-white mb-2 text-sm sm:text-base">Q3: Can I pass if I make one or two minor mistakes?</h3>
                <p className="text-xs sm:text-sm text-white">
                  Yes — but repeated small errors will drag your score down. The key is avoiding patterns of careless mistakes.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-white mb-2 text-sm sm:text-base">Q4: Is paperwork as important as installation work?</h3>
                <p className="text-xs sm:text-sm text-white">
                  Yes — incomplete or inaccurate paperwork loses many marks. Documentation is part of professional electrical work.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-white mb-2 text-sm sm:text-base">Q5: What's the biggest single avoidable mistake?</h3>
                <p className="text-xs sm:text-sm text-white">
                  Not following the safe isolation procedure fully and correctly. This alone causes more failures than any other single error.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-white mb-2 text-sm sm:text-base">Q6: Should I tell the assessor if I make a mistake?</h3>
                <p className="text-xs sm:text-sm text-white">
                  Yes — honesty and immediate correction show professionalism and safety awareness. It's better than trying to hide errors.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Summary */}
        <Card className="bg-transparent border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Summary
            </h2>

            <div className="bg-elec-yellow/5 dark:bg-elec-yellow/10 border border-blue-200 dark:border-blue-800/30 rounded-lg p-4">
              <p className="text-xs sm:text-sm text-blue-700 dark:text-elec-yellow mb-4 font-medium">
                Most AM2 failures are caused by avoidable mistakes, not lack of skill. Common errors include:
              </p>
              <ul className="text-xs sm:text-sm text-blue-700 dark:text-elec-yellow space-y-1">
                <li>• Skipping safe isolation steps</li>
                <li>• Poor workmanship in installation (bare copper, unsleeved CPCs, untidy containment)</li>
                <li>• Wrong testing order or unrealistic results</li>
                <li>• Guessing in fault-finding or incomplete rectification statements</li>
                <li>• Misreading questions or leaving blanks in the knowledge test</li>
              </ul>
              <p className="text-xs sm:text-sm text-blue-700 dark:text-elec-yellow mt-4 font-bold">
                The solution is preparation, calm discipline, and self-checking. Avoid these traps and you put yourself in a strong position to pass.
              </p>
            </div>
          </div>
        </Card>

        {/* Quiz Section */}
        <Card className="bg-transparent border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <TestTube className="w-5 h-5" />
              10-Question Quiz
            </h2>
            <p className="text-xs sm:text-sm text-white mb-6">
              Test your understanding of common AM2 mistakes and how to avoid them:
            </p>
            <Quiz questions={quizQuestions} />
          </div>
        </Card>

        {/* Footer Navigation */}
        <div className="flex items-center justify-between pt-6 sm:pt-8 border-t border-white/10">
          <Button variant="outline" className="text-sm sm:text-base" asChild>
            <Link to="../section3">
              <ArrowLeft className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="hidden xs:inline">Previous: Safety-first Approach</span>
              <span className="xs:hidden">Previous</span>
            </Link>
          </Button>
          <Button className="text-sm sm:text-base" asChild>
            <Link to="../section5">
              <span className="hidden xs:inline">Next: Final Preparation</span>
              <span className="xs:hidden">Next</span>
              <ArrowRight className="w-4 h-4 ml-1 sm:ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AM2Module7Section4;