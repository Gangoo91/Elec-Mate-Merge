import { ArrowLeft, CheckCircle, Users, Shield, Target, Award, Clock, TrendingUp, BookOpen, Zap, ArrowRight, AlertTriangle, Scale, Eye, FileCheck, AlertCircle, XCircle, ThumbsDown, Wrench, Timer } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const AM2Module1Section4 = () => {
  useSEO(
    "Section 4: Common Reasons for Failure - AM2 Preparation",
    "Understanding the main reasons candidates fail the AM2 assessment and how to avoid these critical mistakes"
  );

  const quizQuestions = [
    {
      id: 1,
      question: "What's the most common single reason for AM2 failure?",
      options: [
        "Poor workmanship",
        "Safe isolation errors",
        "Time management issues",
        "Wrong cable selection"
      ],
      correctAnswer: 1,
      explanation: "Safe isolation errors are highlighted by NET as the single biggest cause of AM2 failure."
    },
    {
      id: 2,
      question: "What's the final step in safe isolation?",
      options: [
        "Lock off the circuit",
        "Attach warning notices",
        "Re-prove your tester",
        "Test the isolated circuit"
      ],
      correctAnswer: 2,
      explanation: "Re-proving your tester after isolation confirms it still works and completes the safe isolation procedure."
    },
    {
      id: 3,
      question: "True or false: If your installation works but doesn't match the drawing, you still pass.",
      options: [
        "True",
        "False"
      ],
      correctAnswer: 1,
      explanation: "False. Deviations from specifications lose marks even if the circuit functions correctly."
    },
    {
      id: 4,
      question: "Which IET document defines the testing sequence used in AM2?",
      options: [
        "BS 7671 Wiring Regulations",
        "GN3 Guidance Note 3",
        "GN1 Guidance Note 1",
        "IET Code of Practice"
      ],
      correctAnswer: 1,
      explanation: "IET Guidance Note 3 (GN3) sets out the correct testing sequence used in the AM2 assessment."
    },
    {
      id: 5,
      question: "Why is 'writing down book answers' in testing a fail?",
      options: [
        "It's cheating",
        "Results must be actual measured values",
        "It's too slow",
        "Books aren't allowed"
      ],
      correctAnswer: 1,
      explanation: "Test results must be actual measured values from your installation, not memorised or calculated figures."
    },
    {
      id: 6,
      question: "In fault diagnosis, what three things must you identify for each fault?",
      options: [
        "Location, type, and rectification method",
        "Circuit, voltage, and current",
        "Cause, effect, and prevention",
        "Test, measure, and record"
      ],
      correctAnswer: 0,
      explanation: "You must identify the precise location, type of fault, and how to rectify it for full marks."
    },
    {
      id: 7,
      question: "What's the consequence of energising a circuit with a known fault?",
      options: [
        "Loss of marks",
        "Time penalty",
        "Automatic fail",
        "Warning only"
      ],
      correctAnswer: 2,
      explanation: "Energising a circuit with a known fault is a critical safety breach resulting in automatic failure."
    },
    {
      id: 8,
      question: "If you run out of time, what's the safer option: rush or leave incomplete but safe?",
      options: [
        "Rush to finish everything",
        "Leave incomplete but safe",
        "Ask for extra time",
        "Skip safety checks"
      ],
      correctAnswer: 1,
      explanation: "Always prioritise safety. Leaving work incomplete but safe is better than rushing and creating unsafe conditions."
    },
    {
      id: 9,
      question: "Give one example of poor workmanship that could cost marks.",
      options: [
        "Using different cable colours",
        "Over-stripped conductors with damaged insulation",
        "Working too slowly",
        "Asking questions"
      ],
      correctAnswer: 1,
      explanation: "Over-stripped conductors with damaged insulation is poor workmanship that fails to meet professional standards."
    },
    {
      id: 10,
      question: "What does NET mean by 'workmanlike standard'?",
      options: [
        "Basic functional work",
        "Work that just passes inspection",
        "Professional quality meeting IET definitions",
        "Work completed quickly"
      ],
      correctAnswer: 2,
      explanation: "Workmanlike standard means professional quality work that meets IET definitions and industry standards."
    }
  ];

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Navigation */}
      <div className="flex items-center gap-2 p-3 md:p-4 text-xs md:text-sm text-white">
        <Link 
          to=".." 
          className="hover:text-elec-yellow transition-colors"
        >
          ← Back to Module 1
        </Link>
        <span>/</span>
        <span>AM2</span>
        <span>/</span>
        <span className="hidden sm:inline">Module 1</span>
        <span className="sm:hidden">M1</span>
        <span>/</span>
        <span className="text-elec-yellow">Section 4</span>
      </div>

      <div className="w-full px-4 md:px-8 lg:px-12 xl:px-16 py-12">
        {/* Hero Section */}
        <div className="mb-4 md:mb-6">
          <Card className="bg-transparent border-elec-yellow/30">
            <div className="p-4 md:p-6 text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-red-500/20 rounded-full mb-3 md:mb-4">
                <XCircle className="h-5 w-5 md:h-6 md:w-6 text-elec-yellow" />
              </div>
              <h1 className="text-xl sm:text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 md:mb-3">
                Section 4: Common Reasons for Failure
              </h1>
              <p className="text-white text-sm md:text-base max-w-2xl mx-auto">
                Learn from others' mistakes - understanding why candidates fail helps you avoid the same traps.
              </p>
            </div>
          </Card>
        </div>

        {/* Learning Outcomes */}
        <Card className="bg-transparent border-elec-yellow/30 mb-4 md:mb-6">
          <div className="p-3 md:p-4">
            <h2 className="text-lg md:text-xl font-bold text-elec-yellow mb-2 md:mb-3">
              <Target className="inline-block mr-2 h-4 w-4 md:h-5 md:w-5" />
              Learning Outcomes
            </h2>
            <p className="text-white text-sm mb-3 md:mb-4 max-w-3xl">
              By the end of this section, you should be able to:
            </p>
            <ul className="space-y-2 text-white text-sm max-w-3xl">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                Identify the main reasons candidates fail the AM2
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                Recognise which errors are safety-critical and lead to automatic fails
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                Apply strategies to avoid falling into common traps
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                Self-check your readiness using NET's published common error guidance
              </li>
            </ul>
          </div>
        </Card>

        {/* Key Failure Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6">
          <Card className="bg-transparent border-border/30 text-center p-3 md:p-4">
            <div className="text-lg md:text-2xl font-bold text-elec-yellow mb-1">#1</div>
            <div className="text-xs text-white">Safe isolation errors</div>
          </Card>
          <Card className="bg-transparent border-border/30 text-center p-3 md:p-4">
            <div className="text-lg md:text-2xl font-bold text-elec-yellow mb-1">7</div>
            <div className="text-xs text-white">Main failure categories</div>
          </Card>
          <Card className="bg-transparent border-border/30 text-center p-3 md:p-4">
            <div className="text-lg md:text-2xl font-bold text-elec-yellow mb-1">100%</div>
            <div className="text-xs text-white">Avoidable failures</div>
          </Card>
          <Card className="bg-transparent border-border/30 text-center p-3 md:p-4">
            <div className="text-lg md:text-2xl font-bold text-elec-yellow mb-1">NET</div>
            <div className="text-xs text-white">Publishes error data</div>
          </Card>
        </div>

        {/* Introduction */}
        <Card className="bg-transparent border-elec-yellow/30 mb-4 md:mb-6">
          <div className="p-3 md:p-4">
            <div className="bg-transparent border border-amber-500/30 rounded-lg p-3 mb-3 md:mb-4">
              <p className="text-amber-400 text-xs font-semibold mb-1">Important Reality:</p>
              <p className="text-white text-xs">
                Every year, candidates fail the AM2 for the same reasons. NET publishes "Common Errors" in its Pre-Assessment Manual, 
                and training centres confirm the same patterns. These aren't just minor mistakes — they are avoidable errors that can 
                cost you marks, time, and even result in an automatic fail.
              </p>
            </div>
            <p className="text-white text-sm max-w-3xl">
              This section gives you a clear view of the top reasons candidates fail, why they happen, and how to avoid them. 
              Learning from others' mistakes is one of the most effective ways to ensure your own success.
            </p>
          </div>
        </Card>

        {/* 1. Safe Isolation Mistakes */}
        <Card className="bg-transparent border-elec-yellow/30 mb-4 md:mb-6">
          <div className="p-3 md:p-4">
            <h2 className="text-lg md:text-xl font-bold text-elec-yellow mb-2 md:mb-3">
              <AlertTriangle className="inline-block mr-2 h-4 w-4 md:h-5 md:w-5" />
              1. Safe Isolation Mistakes (The #1 Fail Point)
            </h2>
            <p className="text-white text-sm mb-3 md:mb-4 max-w-3xl">
              NET highlights safe isolation errors as the single biggest cause of failure. These are critical safety issues that result in automatic fails:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 max-w-3xl mb-3 md:mb-4">
              <div className="bg-transparent border border-border/30 rounded-lg p-3">
                <h4 className="text-elec-yellow font-semibold text-sm mb-2">Common Isolation Errors:</h4>
                <ul className="text-white text-xs space-y-1">
                  <li>• Not proving test equipment before and after use</li>
                  <li>• Missing the full 10-point test sequence</li>
                  <li>• Isolating the wrong circuit</li>
                  <li>• Not fitting warning notices or securing keys</li>
                  <li>• Testing at the wrong point on a switch</li>
                </ul>
              </div>
              <div className="bg-transparent border border-border/30 rounded-lg p-3">
                <h4 className="text-elec-yellow font-semibold text-sm mb-2">Why These Happen:</h4>
                <ul className="text-white text-xs space-y-1">
                  <li>• Nervousness causing procedural lapses</li>
                  <li>• Over-confidence skipping steps</li>
                  <li>• Poor practice habits from training</li>
                  <li>• Time pressure leading to shortcuts</li>
                  <li>• Misunderstanding GS38 requirements</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        <InlineCheck
          id="isolation-final-step"
          question="What's the final step in safe isolation before starting work?"
          options={[
            "Lock off the circuit breaker",
            "Attach warning notice",
            "Re-prove your tester to confirm it still works",
            "Test the circuit is dead"
          ]}
          correctIndex={2}
          explanation="Re-proving your tester confirms it still works after proving dead, completing the safe isolation procedure."
        />

        {/* 2. Specification Failures */}
        <Card className="bg-transparent border-elec-yellow/30 mb-4 md:mb-6">
          <div className="p-3 md:p-4">
            <h2 className="text-lg md:text-xl font-bold text-elec-yellow mb-2 md:mb-3">
              <FileCheck className="inline-block mr-2 h-4 w-4 md:h-5 md:w-5" />
              2. Not Following the Specification
            </h2>
            <div className="max-w-3xl space-y-3 md:space-y-4">
              <p className="text-white text-sm">
                Even small deviations from the specification can cost significant marks. Assessors check installations against drawings precisely:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-transparent border border-amber-500/30 rounded-lg p-3">
                  <h4 className="text-amber-400 font-semibold text-sm mb-2">Common Spec Errors:</h4>
                  <ul className="text-white text-xs space-y-1">
                    <li>• Using wrong cable size or type</li>
                    <li>• Installing accessories at wrong heights</li>
                    <li>• Poor identification of conductors</li>
                    <li>• Not maintaining circuit segregation</li>
                    <li>• Incorrect cable routing methods</li>
                  </ul>
                </div>
                <div className="bg-transparent border border-amber-500/30 rounded-lg p-3">
                  <h4 className="text-amber-400 font-semibold text-sm mb-2">Prevention Strategies:</h4>
                  <ul className="text-white text-xs space-y-1">
                    <li>• Read drawings carefully before starting</li>
                    <li>• Double-check cable schedules</li>
                    <li>• Measure and mark positions accurately</li>
                    <li>• Use proper identification methods</li>
                    <li>• Follow routing exactly as shown</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <InlineCheck
          id="specification-deviation"
          question="If the drawing shows sockets at 300mm height and you install them at 400mm, will you lose marks?"
          options={[
            "No, if they still work properly",
            "Yes, deviations from spec lose marks even if the circuit works",
            "Only if the assessor notices",
            "No, close enough is acceptable"
          ]}
          correctIndex={1}
          explanation="Yes - deviations from specifications lose marks even if the circuit works. Precision is essential in following drawings."
        />

        {/* 3. Testing & Certification Errors */}
        <Card className="bg-transparent border-elec-yellow/30 mb-4 md:mb-6">
          <div className="p-3 md:p-4">
            <h2 className="text-lg md:text-xl font-bold text-elec-yellow mb-2 md:mb-3">
              <Wrench className="inline-block mr-2 h-4 w-4 md:h-5 md:w-5" />
              3. Inspection, Testing & Certification Errors
            </h2>
            <p className="text-white text-sm mb-3 md:mb-4 max-w-3xl">
              NET emphasises mistakes in this area as a major failure cause. Testing must follow exact procedures:
            </p>
            <div className="space-y-3 max-w-3xl">
              <div className="bg-transparent border border-border/30 rounded-lg p-3">
                <h4 className="text-elec-yellow font-semibold text-sm mb-2">Major Testing Failures:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div>
                    <p className="text-white mb-1"><strong>Procedural Errors:</strong></p>
                    <ul className="text-white space-y-0.5">
                      <li>• Incorrect instrument setup or range selection</li>
                      <li>• Skipping stages in the GN3 sequence</li>
                      <li>• Wrong test lead connections</li>
                      <li>• Testing live circuits accidentally</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white mb-1"><strong>Recording Errors:</strong></p>
                    <ul className="text-white space-y-0.5">
                      <li>• Recording results inaccurately</li>
                      <li>• Writing "book answers" instead of measured values</li>
                      <li>• Completing certificates incorrectly</li>
                      <li>• Missing required calculations</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-transparent border border-green-500/30 rounded-lg p-3">
                <h4 className="text-green-400 font-semibold text-sm mb-2">How to Avoid Testing Failures:</h4>
                <ul className="text-white text-xs space-y-1">
                  <li>• Memorise the GN3 testing sequence completely</li>
                  <li>• Practice with the exact instruments you'll use</li>
                  <li>• Always record actual measured values</li>
                  <li>• Double-check certificate entries for accuracy</li>
                  <li>• Understand what each test actually measures</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        <InlineCheck
          id="testing-sequence"
          question="Which document sets out the correct test sequence for AM2?"
          options={[
            "BS 7671 Wiring Regulations",
            "IET Guidance Note 3 (GN3)",
            "NET Assessment Manual",
            "City & Guilds Guidelines"
          ]}
          correctIndex={1}
          explanation="IET Guidance Note 3 (GN3) provides the step-by-step testing sequence that must be followed in the AM2."
        />

        {/* 4. Fault Diagnosis Mistakes */}
        <Card className="bg-transparent border-elec-yellow/30 mb-4 md:mb-6">
          <div className="p-3 md:p-4">
            <h2 className="text-lg md:text-xl font-bold text-elec-yellow mb-2 md:mb-3">
              <Eye className="inline-block mr-2 h-4 w-4 md:h-5 md:w-5" />
              4. Fault Diagnosis Mistakes
            </h2>
            <div className="max-w-3xl space-y-3 md:space-y-4">
              <p className="text-white text-sm">
                Fault finding requires precision in identification and clear explanation of rectification methods:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-transparent border border-border/30 rounded-lg p-3">
                  <h4 className="text-elec-yellow font-semibold text-sm mb-2">Common Fault-Finding Errors:</h4>
                  <ul className="text-white text-xs space-y-1">
                    <li>• Vague fault location (e.g., "lighting circuit" instead of "between L1 and common at switch")</li>
                    <li>• Misstating the fault type (short, open, resistance)</li>
                    <li>• Not stating rectification steps clearly</li>
                    <li>• No proof of correction method</li>
                    <li>• Skipping safe isolation before working on faulted circuit</li>
                  </ul>
                </div>
                <div className="bg-transparent border border-green-500/30 rounded-lg p-3">
                  <h4 className="text-green-400 font-semibold text-sm mb-2">Successful Fault Diagnosis:</h4>
                  <ul className="text-white text-xs space-y-1">
                    <li>• Precise location identification</li>
                    <li>• Accurate fault type classification</li>
                    <li>• Clear rectification methodology</li>
                    <li>• Systematic approach to testing</li>
                    <li>• Verification of repair effectiveness</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <InlineCheck
          id="fault-diagnosis-requirements"
          question="If you identify a fault but don't explain how to rectify it, do you get full marks?"
          options={[
            "Yes, finding the fault is enough",
            "No, rectification method is part of the mark",
            "Only if you find all other faults",
            "Yes, if the location is precise"
          ]}
          correctIndex={1}
          explanation="No - you must identify the location, type, and rectification method for each fault to achieve full marks."
        />

        {/* 5. Health & Safety Breaches */}
        <Card className="bg-transparent border-elec-yellow/30 mb-4 md:mb-6">
          <div className="p-3 md:p-4">
            <h2 className="text-lg md:text-xl font-bold text-elec-yellow mb-2 md:mb-3">
              <Shield className="inline-block mr-2 h-4 w-4 md:h-5 md:w-5" />
              5. Health & Safety Breaches
            </h2>
            <div className="max-w-3xl space-y-3">
              <p className="text-white text-sm">
                Safety violations can result in automatic failure regardless of technical competence:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-transparent border border-border/30 rounded-lg p-3">
                  <h4 className="text-elec-yellow font-semibold text-sm mb-2">Critical Safety Errors:</h4>
                  <ul className="text-white text-xs space-y-1">
                    <li>• Poor or incomplete risk assessment</li>
                    <li>• Unsafe use of tools and equipment</li>
                    <li>• Not wearing required PPE</li>
                    <li>• Leaving work area untidy or unsafe</li>
                    <li>• Creating trip hazards or unsafe conditions</li>
                  </ul>
                </div>
                <div className="bg-transparent border border-green-500/30 rounded-lg p-3">
                  <h4 className="text-green-400 font-semibold text-sm mb-2">Safety Best Practices:</h4>
                  <ul className="text-white text-xs space-y-1">
                    <li>• Complete thorough risk assessments</li>
                    <li>• Maintain PPE discipline throughout</li>
                    <li>• Keep work areas clean and organised</li>
                    <li>• Use tools safely and correctly</li>
                    <li>• Be aware of hazards to others</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* 6. Time Management Failures */}
        <Card className="bg-transparent border-elec-yellow/30 mb-4 md:mb-6">
          <div className="p-3 md:p-4">
            <h2 className="text-lg md:text-xl font-bold text-elec-yellow mb-2 md:mb-3">
              <Timer className="inline-block mr-2 h-4 w-4 md:h-5 md:w-5" />
              6. Time Management Failures
            </h2>
            <div className="max-w-3xl space-y-3">
              <p className="text-white text-sm mb-3">
                Poor time management leads to rushed work, incomplete sections, or unsafe practices:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-transparent border border-border/30 rounded-lg p-3">
                  <h4 className="text-elec-yellow font-semibold text-sm mb-2">Time Traps:</h4>
                  <ul className="text-white text-xs space-y-1">
                    <li>• Rushing the composite installation</li>
                    <li>• Spending too long on one fault</li>
                    <li>• Leaving work incomplete</li>
                    <li>• Poor pacing across sections</li>
                  </ul>
                </div>
                <div className="bg-transparent border border-amber-500/30 rounded-lg p-3">
                  <h4 className="text-amber-400 font-semibold text-sm mb-2">Warning Signs:</h4>
                  <ul className="text-white text-xs space-y-1">
                    <li>• Skipping safety checks</li>
                    <li>• Making careless mistakes</li>
                    <li>• Forgetting to label work</li>
                    <li>• Incomplete testing</li>
                  </ul>
                </div>
                <div className="bg-transparent border border-green-500/30 rounded-lg p-3">
                  <h4 className="text-green-400 font-semibold text-sm mb-2">Solutions:</h4>
                  <ul className="text-white text-xs space-y-1">
                    <li>• Plan time allocation carefully</li>
                    <li>• Practice under pressure</li>
                    <li>• Work methodically</li>
                    <li>• Never sacrifice safety for speed</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <InlineCheck
          id="time-pressure-choice"
          question="If you're short of time, is it better to leave a section incomplete but safe, or rush it and risk unsafe work?"
          options={[
            "Rush it to complete everything",
            "Leave safe - unsafe work can cause failure",
            "Ask for extra time",
            "Skip to the next section"
          ]}
          correctIndex={1}
          explanation="Always prioritise safety. Leaving work incomplete but safe is better than rushing and creating unsafe conditions that could result in automatic failure."
        />

        {/* 7. Workmanship Issues */}
        <Card className="bg-transparent border-elec-yellow/30 mb-4 md:mb-6">
          <div className="p-3 md:p-4">
            <h2 className="text-lg md:text-xl font-bold text-elec-yellow mb-2 md:mb-3">
              <Award className="inline-block mr-2 h-4 w-4 md:h-5 md:w-5" />
              7. Neatness and Workmanship Issues
            </h2>
            <div className="max-w-3xl space-y-3">
              <p className="text-white text-sm mb-3">
                Professional workmanship is assessed throughout the AM2. Poor standards can significantly impact your score:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-transparent border border-border/30 rounded-lg p-3">
                  <h4 className="text-elec-yellow font-semibold text-sm mb-2">Poor Workmanship Examples:</h4>
                  <ul className="text-white text-xs space-y-1">
                    <li>• Over-stripped conductors with damaged insulation</li>
                    <li>• Untidy trunking or conduit runs</li>
                    <li>• Loose or poorly made terminations</li>
                    <li>• General appearance not "workmanlike"</li>
                    <li>• Inconsistent quality across the installation</li>
                  </ul>
                </div>
                <div className="bg-transparent border border-green-500/30 rounded-lg p-3">
                  <h4 className="text-green-400 font-semibold text-sm mb-2">Professional Standards:</h4>
                  <ul className="text-white text-xs space-y-1">
                    <li>• Consistent cable runs and spacing</li>
                    <li>• Proper conductor preparation</li>
                    <li>• Secure, properly torqued terminations</li>
                    <li>• Clean, professional appearance</li>
                    <li>• Attention to detail throughout</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Real-world Failure Examples */}
        <Card className="bg-transparent border-elec-yellow/30 mb-4 md:mb-6">
          <div className="p-3 md:p-4">
            <h2 className="text-lg md:text-xl font-bold text-elec-yellow mb-2 md:mb-3">Real-world Failure Examples</h2>
            <div className="space-y-3 md:space-y-4 max-w-3xl">
              <div className="bg-transparent border border-border/30 rounded-lg p-3">
                <h4 className="text-elec-yellow font-semibold text-sm mb-1">Candidate A: Safe Isolation Fail</h4>
                <p className="text-white text-xs">
                  Installed circuits correctly and completed all sections well, but failed to re-prove the tester during safe isolation. 
                  Result: Automatic fail despite otherwise competent performance.
                </p>
              </div>
              
              <div className="bg-transparent border border-border/30 rounded-lg p-3">
                <h4 className="text-elec-yellow font-semibold text-sm mb-1">Candidate B: Specification Deviation</h4>
                <p className="text-white text-xs">
                  Completed installation neatly and safely but used 2.5mm² cable where 4mm² was specified on the drawing. 
                  Lost significant marks for not following specifications exactly.
                </p>
              </div>
              
              <div className="bg-transparent border border-border/30 rounded-lg p-3">
                <h4 className="text-elec-yellow font-semibold text-sm mb-1">Candidate C: Testing Procedure Error</h4>
                <p className="text-white text-xs">
                  Rushed through testing section and wrote down "perfect" textbook values instead of actual measurements. 
                  Assessor identified inconsistencies - marked as procedural fail.
                </p>
              </div>
              
              <div className="bg-transparent border border-border/30 rounded-lg p-3">
                <h4 className="text-elec-yellow font-semibold text-sm mb-1">Candidate D: Incomplete Fault Diagnosis</h4>
                <p className="text-white text-xs">
                  Identified fault locations correctly but failed to explain rectification methods clearly. 
                  Scored too low in fault-finding section to achieve overall pass.
                </p>
              </div>
              
              <div className="bg-transparent border border-border/30 rounded-lg p-3">
                <h4 className="text-elec-yellow font-semibold text-sm mb-1">Candidate E: Poor Workmanship</h4>
                <p className="text-white text-xs">
                  Completed installation functionally but left trunking messy with visible insulation damage. 
                  Work considered below professional standard - failed installation section.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Prevention Strategies */}
        <Card className="bg-transparent border-elec-yellow/30 mb-4 md:mb-6">
          <div className="p-3 md:p-4">
            <h2 className="text-lg md:text-xl font-bold text-elec-yellow mb-2 md:mb-3">
              <Target className="inline-block mr-2 h-4 w-4 md:h-5 md:w-5" />
              Comprehensive Prevention Strategies
            </h2>
            <div className="space-y-4 max-w-3xl">
              <div className="bg-transparent border border-green-500/30 rounded-lg p-3">
                <h4 className="text-green-400 font-semibold text-sm mb-2">Before Assessment Day</h4>
                <ul className="text-white text-xs space-y-1">
                  <li>• Practice safe isolation until it becomes automatic</li>
                  <li>• Memorise GN3 testing sequence completely</li>
                  <li>• Practice reading and following technical drawings precisely</li>
                  <li>• Develop consistent quality standards for all work</li>
                  <li>• Time yourself on all assessment components</li>
                  <li>• Practice fault-finding on various circuit types</li>
                </ul>
              </div>
              
              <div className="bg-transparent border border-border/30 rounded-lg p-3">
                <h4 className="text-elec-yellow font-semibold text-sm mb-2">During the Assessment</h4>
                <ul className="text-white text-xs space-y-1">
                  <li>• Read all instructions completely before starting</li>
                  <li>• Never skip safety procedures, regardless of time pressure</li>
                  <li>• Double-check specifications against your work regularly</li>
                  <li>• Record actual measured values, not calculated ones</li>
                  <li>• Work methodically - don't rush or take shortcuts</li>
                  <li>• Keep your work area organised throughout</li>
                </ul>
              </div>
              
              <div className="bg-transparent border border-border/30 rounded-lg p-3">
                <h4 className="text-elec-yellow font-semibold text-sm mb-2">Quality Assurance Mindset</h4>
                <ul className="text-white text-xs space-y-1">
                  <li>• Check every connection before energising</li>
                  <li>• Verify test equipment functionality regularly</li>
                  <li>• Review your work against professional standards</li>
                  <li>• Document everything clearly and accurately</li>
                  <li>• Think like a professional tradesperson, not a student</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="bg-transparent border-elec-yellow/30 mb-4 md:mb-6">
          <div className="p-3 md:p-4">
            <h2 className="text-lg md:text-xl font-bold text-elec-yellow mb-2 md:mb-3">Frequently Asked Questions</h2>
            <div className="space-y-3 md:space-y-4 max-w-3xl">
              <div>
                <h4 className="text-white font-semibold text-sm mb-1">Q: What's the #1 reason candidates fail AM2?</h4>
                <p className="text-white text-xs">
                  A: Safe isolation errors are consistently the biggest cause of failure across all assessment centres.
                </p>
              </div>
              
              <div>
                <h4 className="text-white font-semibold text-sm mb-1">Q: Do I fail if I forget one label or minor identification?</h4>
                <p className="text-white text-xs">
                  A: Not automatically, but small mistakes accumulate. Consistent attention to detail is essential for pass marks.
                </p>
              </div>
              
              <div>
                <h4 className="text-white font-semibold text-sm mb-1">Q: Can neatness really make me fail?</h4>
                <p className="text-white text-xs">
                  A: Yes - "workmanlike standard" is a fundamental requirement. Poor workmanship can cost enough marks to fail the installation section.
                </p>
              </div>
              
              <div>
                <h4 className="text-white font-semibold text-sm mb-1">Q: Do assessors allow "close enough" test results?</h4>
                <p className="text-white text-xs">
                  A: Yes, if results are realistic and consistent. However, impossible values (like 0.00 Ω Zs) indicate procedural errors and will fail you.
                </p>
              </div>
              
              <div>
                <h4 className="text-white font-semibold text-sm mb-1">Q: Can time extension be requested if I'm slow?</h4>
                <p className="text-white text-xs">
                  A: No - AM2 simulates real-world working conditions with strict deadlines. Time limits are non-negotiable.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Summary */}
        <Card className="bg-transparent border-elec-yellow/30 mb-4 md:mb-6">
          <div className="p-3 md:p-4">
            <h2 className="text-lg md:text-xl font-bold text-elec-yellow mb-2 md:mb-3">Summary</h2>
            <p className="text-white text-sm max-w-3xl mb-3">
              Candidates fail AM2 mainly due to seven key areas: unsafe isolation, not following specifications, incorrect testing 
              and certification, poor fault diagnosis, health & safety breaches, time management issues, and workmanship below 
              professional standards.
            </p>
            <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-3">
              <p className="text-elec-yellow text-xs font-semibold mb-1">Key Takeaway:</p>
              <p className="text-white text-xs">
                Avoiding these errors isn't about luck — it's about strict practice, sticking to procedures, and working to 
                professional standards every time. Learn from others' mistakes to ensure your own success.
              </p>
            </div>
          </div>
        </Card>

        {/* Quiz Section */}
        <Card className="bg-transparent border-elec-yellow/30 mb-6">
          <div className="p-3 md:p-4">
            <h2 className="text-lg md:text-xl font-bold text-elec-yellow mb-2 md:mb-3">
              <BookOpen className="inline-block mr-2 h-4 w-4 md:h-5 md:w-5" />
              Test Your Knowledge
            </h2>
            <p className="text-white text-sm mb-3 md:mb-4">
              Test your understanding of common AM2 failure reasons with this 10-question quiz.
            </p>
            <Quiz questions={quizQuestions} title="AM2 Common Failures Quiz" />
          </div>
        </Card>

        {/* Navigation Footer */}
        <div className="flex justify-between items-center gap-4">
          <Link 
            to="../section3"
            className="flex items-center gap-2 text-sm text-white hover:text-elec-yellow transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Previous: Marking Criteria & Pass/Fail Thresholds</span>
            <span className="sm:hidden">Previous</span>
          </Link>
          
          <Link 
            to="../section5"
            className="flex items-center gap-2 text-sm text-white hover:text-elec-yellow transition-colors"
          >
            <span className="hidden sm:inline">Next: Section 5</span>
            <span className="sm:hidden">Next</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AM2Module1Section4;