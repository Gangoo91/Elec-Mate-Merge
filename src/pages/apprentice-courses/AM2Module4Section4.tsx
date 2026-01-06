import { ArrowLeft, ArrowRight, Zap, CheckCircle, AlertTriangle, Target, BookOpen, Timer, Lightbulb, Settings, Play, Wrench, TrendingUp, Award, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const AM2Module4Section4 = () => {
  useSEO(
    "Functional and Operational Testing | AM2 Module 4 Section 4",
    "Master functional and operational testing procedures for AM2 electrical assessment success"
  );

  const quickCheckQuestions: Array<{
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }> = [
    {
      id: "functional-vs-insulation",
      question: "What's the difference between insulation resistance and functional testing?",
      options: [
        "They are the same test",
        "Insulation resistance checks safety of wiring; functional testing checks operation of equipment and circuits",
        "Functional testing is optional",
        "Insulation resistance is for motors only"
      ],
      correctIndex: 1,
      explanation: "Insulation resistance tests the safety and integrity of cable insulation, while functional testing confirms that circuits and equipment operate correctly as designed."
    },
    {
      id: "rcd-failure",
      question: "What's the required action if an RCD fails to trip within the permitted time?",
      options: [
        "Continue with other tests",
        "Record non-compliance and fail the RCD test",
        "Try the test again",
        "Adjust the settings"
      ],
      correctIndex: 1,
      explanation: "If an RCD fails to trip within BS 7671 specified times, it must be recorded as non-compliant and the test marked as a failure. The RCD requires investigation or replacement."
    },
    {
      id: "testing-completeness",
      question: "Why is it important to test every lighting switch combination?",
      options: [
        "To save time",
        "It's not necessary if some work",
        "To ensure all switching functions operate correctly as designed",
        "Only for three-way switching"
      ],
      correctIndex: 2,
      explanation: "Every switching combination must be tested to confirm correct wiring and operation. Missing any combination could hide wiring errors that compromise safety or functionality."
    }
  ];

  const quizQuestions = [
    {
      id: 1,
      question: "What's the difference between insulation resistance and functional testing?",
      options: [
        "No difference - they're the same",
        "Insulation resistance checks safety of wiring; functional testing checks operation of equipment",
        "Functional testing is electrical, insulation is mechanical",
        "Only insulation resistance is required"
      ],
      correctAnswer: 1,
      explanation: "Insulation resistance tests electrical safety of cable insulation, while functional testing verifies that circuits and equipment operate correctly as designed."
    },
    {
      id: 2,
      question: "What must be tested on every lighting circuit?",
      options: [
        "Only the main switch",
        "Every switching combination and lamp operation",
        "Just the circuit breaker",
        "Only two-way switches"
      ],
      correctAnswer: 1,
      explanation: "All switches (one-way, two-way, intermediate) and their combinations must be tested to confirm correct operation and lamp control."
    },
    {
      id: 3,
      question: "Which device is tested at ×1 and ×5 IΔn?",
      options: ["MCB", "RCD/RCBO", "Isolator", "Fuse"],
      correctAnswer: 1,
      explanation: "RCDs and RCBOs must be tested at both 1× and 5× their rated tripping current (IΔn) to verify correct operation and timing."
    },
    {
      id: 4,
      question: "What unit are RCD trip times recorded in?",
      options: ["Seconds (s)", "Milliseconds (ms)", "Minutes (min)", "Microseconds (μs)"],
      correctAnswer: 1,
      explanation: "RCD trip times are measured and recorded in milliseconds (ms) as per BS 7671 requirements."
    },
    {
      id: 5,
      question: "What happens if an RCD fails to trip within limits?",
      options: [
        "Try again later",
        "Record non-compliance and fail the test",
        "Adjust the test current",
        "Skip the test"
      ],
      correctAnswer: 1,
      explanation: "If an RCD fails to trip within the required time limits, it must be recorded as non-compliant and the test marked as failed."
    },
    {
      id: 6,
      question: "True or false: Functional testing can be skipped if electrical tests pass.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation: "False. Functional testing is mandatory and cannot be skipped. It proves that circuits operate correctly, which electrical tests alone cannot confirm."
    },
    {
      id: 7,
      question: "Why must you test every lighting switch combination?",
      options: [
        "It's not necessary",
        "To ensure all switching functions operate correctly as designed",
        "Only for show",
        "To waste time"
      ],
      correctAnswer: 1,
      explanation: "Testing every switch combination ensures correct wiring and operation of all lighting control functions as per the design."
    },
    {
      id: 8,
      question: "What test tool can be used to check socket polarity?",
      options: [
        "Multimeter only",
        "Polarity tester or plug-in socket tester",
        "Insulation tester",
        "Continuity tester"
      ],
      correctAnswer: 1,
      explanation: "Polarity testers or plug-in socket testers can quickly verify correct polarity and supply presence at socket outlets."
    },
    {
      id: 9,
      question: "What function must you confirm in motor circuits?",
      options: [
        "Only the motor runs",
        "Start and stop controls, and overload reset operation",
        "Just the electrical supply",
        "Only the speed"
      ],
      correctAnswer: 1,
      explanation: "Motor circuits require testing of start/stop controls, overload protection operation, and correct reset functionality for safety."
    },
    {
      id: 10,
      question: "What's the final step after functional testing?",
      options: [
        "Leave everything on",
        "Leave installation in a safe state",
        "Remove all fuses",
        "Turn off main supply"
      ],
      correctAnswer: 1,
      explanation: "After functional testing, the installation must be left in a safe state with all systems operating normally and safely."
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
                <span className="hidden xs:inline">Back to Module 4</span>
                <span className="xs:hidden">Back</span>
              </Link>
            </Button>
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground p-2 sm:p-0 text-sm sm:text-base" asChild>
              <Link to="../section5">
                <span className="hidden xs:inline">Module 4 Section 5</span>
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
            <Zap className="w-4 h-4" />
            Module 4 – Section 4
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 sm:mb-6 leading-tight">
            Functional and Operational Testing
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
            After insulation resistance, continuity, Zs, and RCD tests, you must carry out functional and operational testing to confirm that the installation performs as intended. This stage ensures that switches, RCDs, protective devices, and equipment operate correctly and safely.
          </p>
        </div>

        {/* Critical Warning */}
        <Card className="bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-700/50 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-700 dark:text-elec-yellow mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-red-900 dark:text-red-100 mb-2 text-sm sm:text-base">
                  CRITICAL: Functional Testing is Mandatory
                </h3>
                <p className="text-xs sm:text-sm text-red-800 dark:text-red-200 mb-3 leading-relaxed">
                  Assessors want to see you approach this like you would on-site: check, operate, and confirm every circuit behaves as designed. Skipping or rushing these checks is a common reason candidates lose marks.
                </p>
                <p className="text-xs sm:text-sm text-red-800 dark:text-red-200 font-medium leading-relaxed">
                  Functional testing cannot be skipped even if all electrical tests pass. It proves real-world operation and safety.
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
              By the end of this section, you should be able to:
            </p>
            <ul className="space-y-2 text-xs sm:text-xs sm:text-sm text-foreground">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Perform functional testing of lighting, power, and motor circuits
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Carry out RCD testing and confirm trip times within specified limits
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Check polarity and operation of switches, sockets, and protective devices
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Demonstrate functional testing confidently to an assessor
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Record functional results correctly on certification
              </li>
            </ul>
          </div>
        </Card>

        {/* What is Functional Testing */}
        <Card className="bg-card border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5" />
              1. What is Functional Testing?
            </h2>
            
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-elec-yellow/5 dark:bg-elec-yellow/10 border border-blue-200 dark:border-blue-800/30 rounded-lg p-3 sm:p-4">
                <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2 sm:mb-3 text-sm sm:text-base">Definition and Purpose:</h4>
                <p className="text-xs sm:text-sm text-blue-700 dark:text-elec-yellow mb-3">
                  Functional testing confirms the installation operates as intended. It goes beyond electrical tests — checks real-world usability and operational safety.
                </p>
                <p className="text-xs sm:text-sm text-elec-yellow dark:text-elec-yellow">
                  <strong>Key Principle:</strong> Proving that circuits and equipment actually work correctly in practice, not just that they pass electrical measurements.
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30 rounded-lg p-3 sm:p-4">
                  <h4 className="font-medium text-green-800 dark:text-green-200 mb-2 sm:mb-3 text-sm sm:text-base">Functional Testing Covers:</h4>
                  <ul className="text-xs sm:text-sm text-green-700 dark:text-green-300 space-y-1">
                    <li>• Correct operation of switches and accessories</li>
                    <li>• RCD/RCBO operation and trip times</li>
                    <li>• Protective devices operating correctly</li>
                    <li>• Functional operation of motors or specialist equipment</li>
                    <li>• Polarity verification at outlets</li>
                    <li>• Control system operation</li>
                  </ul>
                </div>
                
                <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800/30 rounded-lg p-3 sm:p-4">
                  <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-2 sm:mb-3 text-sm sm:text-base">Why It's Essential:</h4>
                  <ul className="text-xs sm:text-sm text-purple-700 dark:text-elec-yellow space-y-1">
                    <li>• Confirms installation works as designed</li>
                    <li>• Identifies wiring errors not found in electrical tests</li>
                    <li>• Proves safety systems operate correctly</li>
                    <li>• Demonstrates professional competence to assessor</li>
                    <li>• Required for certification completion</li>
                    <li>• Mirrors real-world commissioning practices</li>
                  </ul>
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

        {/* Key Functional Tests in AM2 */}
        <Card className="bg-card border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Play className="w-5 h-5" />
              2. Key Functional Tests in AM2
            </h2>
            
            <div className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-elec-yellow/5 dark:bg-elec-yellow/10 border border-blue-200 dark:border-blue-800/30 rounded-lg p-3 sm:p-4">
                    <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2 text-sm sm:text-base flex items-center gap-2">
                      <Lightbulb className="w-4 h-4" />
                      Lighting Circuits:
                    </h4>
                    <ul className="text-xs sm:text-sm text-blue-700 dark:text-elec-yellow space-y-1">
                      <li>• Operate switches (one-way, two-way, intermediate)</li>
                      <li>• Confirm correct lamps switch on/off</li>
                      <li>• Test all switching combinations</li>
                      <li>• Verify no cross-switching errors</li>
                      <li>• Check dimmer operation where applicable</li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30 rounded-lg p-3 sm:p-4">
                    <h4 className="font-medium text-green-800 dark:text-green-200 mb-2 text-sm sm:text-base flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      Power Circuits:
                    </h4>
                    <ul className="text-xs sm:text-sm text-green-700 dark:text-green-300 space-y-1">
                      <li>• Test socket outlets (correct polarity, supply present)</li>
                      <li>• Ring/radial continuity verified, now prove operational</li>
                      <li>• Cooker circuit: confirm supply at control unit</li>
                      <li>• Immersion heater: verify control operation</li>
                      <li>• Switched spurs: test switching function</li>
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800/30 rounded-lg p-3 sm:p-4">
                    <h4 className="font-medium text-orange-800 dark:text-orange-200 mb-2 text-sm sm:text-base flex items-center gap-2">
                      <Settings className="w-4 h-4" />
                      Motor Circuits:
                    </h4>
                    <ul className="text-xs sm:text-sm text-orange-700 dark:text-elec-yellow space-y-1">
                      <li>• Confirm DOL starter operation</li>
                      <li>• Test stop/start controls</li>
                      <li>• Verify overload protection resets</li>
                      <li>• Check emergency stop functions</li>
                      <li>• Confirm correct rotation direction</li>
                    </ul>
                  </div>
                  
                  <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800/30 rounded-lg p-3 sm:p-4">
                    <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-2 text-sm sm:text-base flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      RCD/RCBO Testing:
                    </h4>
                    <ul className="text-xs sm:text-sm text-purple-700 dark:text-elec-yellow space-y-1">
                      <li>• Trip tests at ×1 and ×5 IΔn</li>
                      <li>• Must trip within limits (ms)</li>
                      <li>• Manual test button operation</li>
                      <li>• Reset function verification</li>
                      <li>• Record actual trip times accurately</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Detailed RCD Testing Requirements */}
              <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800/30 rounded-lg p-3 sm:p-4">
                <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-3 text-sm sm:text-base">Detailed RCD Testing Requirements:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div>
                    <strong className="text-yellow-700 dark:text-yellow-300 block mb-2">Standard RCD (30mA):</strong>
                    <ul className="text-elec-yellow dark:text-elec-yellow space-y-1">
                      <li>• 1× test (30mA): Should trip but may take up to 300ms</li>
                      <li>• 5× test (150mA): Must trip within 40ms</li>
                      <li>• Manual test: Must operate and cut supply</li>
                      <li>• Reset: Must restore supply when reset</li>
                    </ul>
                  </div>
                  <div>
                    <strong className="text-yellow-700 dark:text-yellow-300 block mb-2">Recording Requirements:</strong>
                    <ul className="text-elec-yellow dark:text-elec-yellow space-y-1">
                      <li>• Record actual trip times in milliseconds</li>
                      <li>• Note if RCD fails to trip within limits</li>
                      <li>• Record both test currents and times</li>
                      <li>• Include manual test button operation</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Common Candidate Errors */}
        <Card className="bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-700/50 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-red-800 dark:text-red-200 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              3. Common Candidate Errors (NET Guidance)
            </h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-red-900 dark:text-red-100 mb-2 sm:mb-3 text-sm sm:text-base">Testing Omissions:</h4>
                  <ul className="text-xs sm:text-sm text-red-800 dark:text-red-200 space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-red-600 rounded-full mt-1.5 flex-shrink-0"></div>
                      Not testing all lighting switching combinations
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-red-600 rounded-full mt-1.5 flex-shrink-0"></div>
                      Forgetting to function-test sockets after electrical tests
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-red-600 rounded-full mt-1.5 flex-shrink-0"></div>
                      Not carrying out both ×1 and ×5 IΔn RCD tests
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-red-600 rounded-full mt-1.5 flex-shrink-0"></div>
                      Failing to test motor start/stop controls
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-red-900 dark:text-red-100 mb-2 sm:mb-3 text-sm sm:text-base">Recording and Procedure Errors:</h4>
                  <ul className="text-xs sm:text-sm text-red-800 dark:text-red-200 space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-red-600 rounded-full mt-1.5 flex-shrink-0"></div>
                      Recording RCD trip times incorrectly or in wrong units
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-red-600 rounded-full mt-1.5 flex-shrink-0"></div>
                      Rushing through tests without systematic approach
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-red-600 rounded-full mt-1.5 flex-shrink-0"></div>
                      Not explaining procedures to assessor
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-red-600 rounded-full mt-1.5 flex-shrink-0"></div>
                      Leaving installation in unsafe state after testing
                    </li>
                  </ul>
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

        {/* Assessor Expectations */}
        <Card className="bg-card border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Eye className="w-5 h-5" />
              4. Assessor Expectations
            </h2>
            
            <div className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30 rounded-lg p-3 sm:p-4">
                  <h4 className="font-medium text-green-800 dark:text-green-200 mb-2 sm:mb-3 text-sm sm:text-base flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Professional Approach:
                  </h4>
                  <ul className="text-xs sm:text-sm text-green-700 dark:text-green-300 space-y-1">
                    <li>• Operate switches and devices methodically, not randomly</li>
                    <li>• Talk through what you are testing and why</li>
                    <li>• Use correct instruments for RCD/functional testing</li>
                    <li>• Demonstrate understanding of each test purpose</li>
                  </ul>
                </div>
                
                <div className="bg-elec-yellow/5 dark:bg-elec-yellow/10 border border-blue-200 dark:border-blue-800/30 rounded-lg p-3 sm:p-4">
                  <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2 sm:mb-3 text-sm sm:text-base flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    Technical Requirements:
                  </h4>
                  <ul className="text-xs sm:text-sm text-blue-700 dark:text-elec-yellow space-y-1">
                    <li>• Record results in correct units (ms for RCDs)</li>
                    <li>• Leave installation in a safe state after functional tests</li>
                    <li>• Complete all required test combinations</li>
                    <li>• Verify results against BS 7671 requirements</li>
                  </ul>
                </div>
              </div>

              {/* Detailed Assessment Criteria */}
              <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800/30 rounded-lg p-3 sm:p-4">
                <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-3 text-sm sm:text-base">What Assessors Specifically Look For:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div>
                    <strong className="text-purple-700 dark:text-elec-yellow block mb-2">Systematic Testing:</strong>
                    <ul className="text-purple-600 dark:text-elec-yellow space-y-1">
                      <li>• Logical sequence of testing</li>
                      <li>• Complete coverage of all circuits</li>
                      <li>• Proper use of test equipment</li>
                      <li>• Accurate recording of results</li>
                    </ul>
                  </div>
                  <div>
                    <strong className="text-purple-700 dark:text-elec-yellow block mb-2">Professional Communication:</strong>
                    <ul className="text-purple-600 dark:text-elec-yellow space-y-1">
                      <li>• Clear explanation of each test</li>
                      <li>• Identification of any issues found</li>
                      <li>• Demonstration of problem-solving skills</li>
                      <li>• Appropriate response to test failures</li>
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
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Wrench className="w-5 h-5" />
              5. Comprehensive Practical Guidance
            </h2>
            
            <div className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-elec-yellow/5 dark:bg-elec-yellow/10 border border-blue-200 dark:border-blue-800/30 rounded-lg p-3 sm:p-4">
                    <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2 text-sm sm:text-base">Lighting Circuit Testing:</h4>
                    <ul className="text-xs sm:text-sm text-blue-700 dark:text-elec-yellow space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-3 h-3 text-elec-yellow mt-1 flex-shrink-0" />
                        <span>Always test every switching combination — don't assume</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-3 h-3 text-elec-yellow mt-1 flex-shrink-0" />
                        <span>Check one-way, two-way, and intermediate switches</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-3 h-3 text-elec-yellow mt-1 flex-shrink-0" />
                        <span>Verify correct lamp control from all switch positions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-3 h-3 text-elec-yellow mt-1 flex-shrink-0" />
                        <span>Test dimmer operation through full range</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30 rounded-lg p-3 sm:p-4">
                    <h4 className="font-medium text-green-800 dark:text-green-200 mb-2 text-sm sm:text-base">Socket Testing:</h4>
                    <ul className="text-xs sm:text-sm text-green-700 dark:text-green-300 space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-3 h-3 text-green-500 mt-1 flex-shrink-0" />
                        <span>Use polarity tester or plug-in tester</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-3 h-3 text-green-500 mt-1 flex-shrink-0" />
                        <span>Confirm supply present and correct polarity</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-3 h-3 text-green-500 mt-1 flex-shrink-0" />
                        <span>Test all sockets on ring/radial circuits</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-3 h-3 text-green-500 mt-1 flex-shrink-0" />
                        <span>Verify earth continuity indication</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800/30 rounded-lg p-3 sm:p-4">
                    <h4 className="font-medium text-orange-800 dark:text-orange-200 mb-2 text-sm sm:text-base">RCD Testing Procedure:</h4>
                    <ul className="text-xs sm:text-sm text-orange-700 dark:text-elec-yellow space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-3 h-3 text-elec-yellow mt-1 flex-shrink-0" />
                        <span>Test at ×1 and ×5 IΔn with appropriate RCD tester</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-3 h-3 text-elec-yellow mt-1 flex-shrink-0" />
                        <span>Press manual test button operation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-3 h-3 text-elec-yellow mt-1 flex-shrink-0" />
                        <span>Record trip times accurately in milliseconds</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-3 h-3 text-elec-yellow mt-1 flex-shrink-0" />
                        <span>Verify reset function operates correctly</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800/30 rounded-lg p-3 sm:p-4">
                    <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-2 text-sm sm:text-base">Motor Circuit Testing:</h4>
                    <ul className="text-xs sm:text-sm text-purple-700 dark:text-elec-yellow space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-3 h-3 text-elec-yellow mt-1 flex-shrink-0" />
                        <span>Check start and stop controls operate correctly</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-3 h-3 text-elec-yellow mt-1 flex-shrink-0" />
                        <span>Confirm overloads reset correctly</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-3 h-3 text-elec-yellow mt-1 flex-shrink-0" />
                        <span>Verify emergency stop functions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-3 h-3 text-elec-yellow mt-1 flex-shrink-0" />
                        <span>Check motor rotation direction</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Time Management and Professional Tips */}
              <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/30 rounded-lg p-3 sm:p-4">
                <h4 className="font-medium text-amber-800 dark:text-amber-200 mb-3 text-sm sm:text-base">Time Management and Professional Tips:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div>
                    <strong className="text-amber-700 dark:text-amber-300 block mb-2">Efficient Testing:</strong>
                    <ul className="text-amber-600 dark:text-amber-400 space-y-1">
                      <li>• Work steadily - rushing causes missed checks and lost marks</li>
                      <li>• Follow a systematic sequence for each circuit type</li>
                      <li>• Record results immediately - don't rely on memory</li>
                      <li>• Plan your testing route to minimise movement</li>
                    </ul>
                  </div>
                  <div>
                    <strong className="text-amber-700 dark:text-amber-300 block mb-2">Professional Approach:</strong>
                    <ul className="text-amber-600 dark:text-amber-400 space-y-1">
                      <li>• Explain each test to the assessor as you proceed</li>
                      <li>• Handle all equipment with confidence and care</li>
                      <li>• Respond appropriately to any test failures</li>
                      <li>• Leave installation safe and operational</li>
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
        <Card className="bg-card border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Real-World Examples
            </h2>
            
            <div className="space-y-4">
              <div className="border-l-4 border-l-red-500 bg-red-100 dark:bg-red-900/30 p-3 sm:p-4">
                <h4 className="font-medium text-red-900 dark:text-red-100 mb-2 text-sm sm:text-base">Example 1: Incomplete Switch Testing</h4>
                <p className="text-xs sm:text-sm text-red-800 dark:text-red-200 mb-2">
                  Candidate did full electrical tests but didn't test two-way switching. Assessor flagged incomplete → <strong>lost marks</strong>
                </p>
                <p className="text-xs text-red-700 dark:text-elec-yellow">
                  Lesson: Every switching combination must be tested. Missing any combination could hide wiring errors.
                </p>
              </div>
              
              <div className="border-l-4 border-l-red-500 bg-red-100 dark:bg-red-900/30 p-3 sm:p-4">
                <h4 className="font-medium text-red-900 dark:text-red-100 mb-2 text-sm sm:text-base">Example 2: Incomplete RCD Testing</h4>
                <p className="text-xs sm:text-sm text-red-800 dark:text-red-200 mb-2">
                  Candidate only did RCD ×1 trip test, forgot ×5. Incomplete → <strong>lost marks</strong>
                </p>
                <p className="text-xs text-red-700 dark:text-elec-yellow">
                  Lesson: Both ×1 and ×5 IΔn tests are mandatory. Incomplete testing = incomplete certification.
                </p>
              </div>
              
              <div className="border-l-4 border-green-500 bg-green-50 dark:bg-green-950/20 p-3 sm:p-4">
                <h4 className="font-medium text-green-800 dark:text-green-200 mb-2 text-sm sm:text-base">Example 3: Professional Excellence</h4>
                <p className="text-xs sm:text-sm text-green-700 dark:text-green-300 mb-2">
                  Candidate tested all lighting switching combinations, RCDs, sockets, and motor circuit methodically. <strong>Full marks</strong>
                </p>
                <p className="text-xs text-green-600 dark:text-green-400">
                  Lesson: Systematic, complete testing with clear communication demonstrates professional competence.
                </p>
              </div>
              
              <div className="border-l-4 border-elec-yellow bg-yellow-50 dark:bg-yellow-950/20 p-3 sm:p-4">
                <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2 text-sm sm:text-base">Example 4: Real-Life Consequence</h4>
                <p className="text-xs sm:text-sm text-yellow-700 dark:text-yellow-300 mb-2">
                  In real work, an electrician energised without testing motor overload. Motor burnt out. Same mistake in AM2 = fail.
                </p>
                <p className="text-xs text-elec-yellow dark:text-elec-yellow">
                  Lesson: Functional testing prevents costly equipment failures and safety incidents in real installations.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Advanced Functional Testing Techniques */}
        <Card className="bg-gradient-to-r from-card/10 to-elec-yellow/10 border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Advanced Functional Testing Techniques
            </h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-background/50 rounded-lg p-3 sm:p-4">
                  <h4 className="font-medium text-foreground mb-2 text-sm sm:text-base">Troubleshooting Failed Tests:</h4>
                  <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
                    <li>• RCD fails to trip: Check test equipment, verify connections</li>
                    <li>• Switch doesn't control lamp: Verify switching wiring</li>
                    <li>• Motor won't start: Check control circuit, overloads</li>
                    <li>• Socket tester shows fault: Investigate wiring errors</li>
                  </ul>
                </div>
                
                <div className="bg-background/50 rounded-lg p-3 sm:p-4">
                  <h4 className="font-medium text-foreground mb-2 text-sm sm:text-base">Professional Documentation:</h4>
                  <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
                    <li>• Record actual test results, not expected values</li>
                    <li>• Note any deviations or failures clearly</li>
                    <li>• Include environmental conditions if relevant</li>
                    <li>• Sign and date all functional test records</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-elec-yellow/10 rounded-lg p-3 sm:p-4">
                <h4 className="font-medium text-elec-yellow mb-2 text-sm sm:text-base">Industry Best Practices:</h4>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Professional electricians use functional testing to verify that installations will operate safely and reliably 
                  in service. This testing phase often reveals issues that purely electrical tests miss, making it essential 
                  for both AM2 success and real-world competence.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Section Summary */}
        <Card className="bg-gradient-to-r from-elec-yellow/5 to-card/5 border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Section Summary
            </h2>
            
            <div className="space-y-4">
              <div className="bg-background/50 rounded-lg p-3 sm:p-4">
                <h4 className="font-medium text-foreground mb-3 text-sm sm:text-base">Key Takeaways:</h4>
                <ul className="text-xs sm:text-sm text-muted-foreground space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Functional and operational testing proves that circuits and devices actually work</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Test all switching combinations, RCDs at ×1 and ×5 IΔn, and motor controls</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Record results accurately in correct units (ms for RCD trip times)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Leave installation in safe operational state after testing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Skipping functional tests is an easy way to lose marks</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-elec-yellow/10 rounded-lg p-3 sm:p-4">
                <h4 className="font-medium text-elec-yellow mb-2 text-sm sm:text-base">Next Steps:</h4>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  You have now completed all essential testing procedures for AM2. The next section will cover 
                  final certification completion and handover procedures to complete your assessment successfully.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Quiz Section */}
        <Card className="bg-card border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Timer className="w-5 h-5" />
              Test Your Knowledge
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mb-6">
              Complete this 10-question quiz to test your understanding of functional and operational testing procedures.
            </p>
            <Quiz questions={quizQuestions} title="Functional and Operational Testing" />
          </div>
        </Card>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-4 pt-6 sm:pt-8">
          <Button variant="outline" className="w-full sm:w-auto" asChild>
            <Link to="../section3" className="flex items-center justify-center">
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="text-sm sm:text-base">Previous: Recording Test Results</span>
            </Link>
          </Button>
          <Button className="w-full sm:w-auto" asChild>
            <Link to="../section5" className="flex items-center justify-center">
              <span className="text-sm sm:text-base">Next: Module 4 Section 5</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AM2Module4Section4;