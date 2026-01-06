import { ArrowLeft, ArrowRight, AlertTriangle, CheckCircle, Search, Target, BookOpen, Timer, Lightbulb, Eye, FileText, Wrench, TrendingUp, Award, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const AM2Module4Section5 = () => {
  useSEO(
    "Identifying and Reporting Non-Compliances | AM2 Module 4 Section 5",
    "Master fault identification and compliance reporting for AM2 electrical assessment success"
  );

  const quickCheckQuestions: Array<{
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }> = [
    {
      id: "rcd-non-compliance",
      question: "If an RCD fails to trip within limits at ×5 IΔn, is that a non-compliance?",
      options: [
        "No, as long as ×1 test passes",
        "Yes — it must be recorded as failing BS 7671 requirements",
        "Only if it fails by more than 50%",
        "It depends on the installation type"
      ],
      correctIndex: 1,
      explanation: "Any RCD that fails to trip within BS 7671 specified times at either ×1 or ×5 IΔn is non-compliant and must be recorded as such."
    },
    {
      id: "minimum-insulation",
      question: "What's the minimum acceptable insulation resistance value in AM2?",
      options: [
        "0.5 MΩ",
        "1 MΩ", 
        "2 MΩ",
        "200 MΩ"
      ],
      correctIndex: 1,
      explanation: "The minimum acceptable insulation resistance for most circuits is 1 MΩ as specified in BS 7671. Values below this indicate insulation failure."
    },
    {
      id: "assessment-failure",
      question: "True or false: You fail AM2 if you find a non-compliance.",
      options: [
        "True",
        "False"
      ],
      correctIndex: 1,
      explanation: "False. You're expected to find and report non-compliances. You fail if you miss obvious defects or fail to record them correctly."
    }
  ];

  const quizQuestions = [
    {
      id: 1,
      question: "Define a non-compliance in electrical installation terms.",
      options: [
        "Any electrical fault",
        "Any part that doesn't meet BS 7671, manufacturer's instructions, or specification",
        "Only safety-critical faults",
        "Minor workmanship issues only"
      ],
      correctAnswer: 1,
      explanation: "A non-compliance is any part of an installation that does not meet the requirements of BS 7671, manufacturer's instructions, or the installation specification."
    },
    {
      id: 2,
      question: "Give one example of a visual non-compliance.",
      options: [
        "High Zs reading",
        "RCD trip time too slow",
        "Exposed copper or unsleeved CPC",
        "Low insulation resistance"
      ],
      correctAnswer: 2,
      explanation: "Visual non-compliances include exposed copper, unsleeved CPCs, damaged insulation, poor workmanship, or incorrect polarity that can be seen during inspection."
    },
    {
      id: 3,
      question: "What's the minimum acceptable insulation resistance in AM2?",
      options: ["0.5 MΩ", "1 MΩ", "2 MΩ", "10 MΩ"],
      correctAnswer: 1,
      explanation: "BS 7671 specifies a minimum insulation resistance of 1 MΩ for most electrical circuits. Values below this indicate insulation failure."
    },
    {
      id: 4,
      question: "What does it mean if socket polarity is reversed?",
      options: [
        "Socket won't work",
        "Live and neutral conductors are connected incorrectly",
        "Earth is missing",
        "Voltage is too low"
      ],
      correctAnswer: 1,
      explanation: "Reversed polarity means the live and neutral conductors are swapped, which can create safety hazards as switches may not isolate the live conductor."
    },
    {
      id: 5,
      question: "What's the maximum trip time at ×1 for a 30 mA RCD?",
      options: ["40 ms", "300 ms", "1000 ms", "No limit"],
      correctAnswer: 1,
      explanation: "At ×1 rated current (30mA), an RCD should trip but may take up to 300ms according to BS 7671."
    },
    {
      id: 6,
      question: "What's the maximum trip time at ×5 for a 30 mA RCD?",
      options: ["40 ms", "300 ms", "150 ms", "200 ms"],
      correctAnswer: 0,
      explanation: "At ×5 rated current (150mA), a 30mA RCD must trip within 40ms according to BS 7671 requirements."
    },
    {
      id: 7,
      question: "If a Zs result is higher than BS 7671 maximum, what must you do?",
      options: [
        "Ignore it if close",
        "Record it as non-compliant",
        "Test again and hope for better result",
        "Adjust the reading"
      ],
      correctAnswer: 1,
      explanation: "Any Zs reading that exceeds BS 7671 maximum values for the protective device must be recorded as non-compliant."
    },
    {
      id: 8,
      question: "True or false: You fail AM2 if you find a non-compliance.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation: "False. Finding and correctly reporting non-compliances demonstrates professional competence. You fail if you miss obvious defects."
    },
    {
      id: 9,
      question: "What's the correct way to report a missing CPC?",
      options: [
        "Write 'earth missing'",
        "Write 'CPC not connected at socket outlet'",
        "Don't record minor issues",
        "Just mark as 'fault'"
      ],
      correctAnswer: 1,
      explanation: "Use specific, technical language like 'CPC not connected at socket outlet' rather than vague terms like 'earth missing'."
    },
    {
      id: 10,
      question: "What happens if you ignore an obvious defect in AM2?",
      options: [
        "Nothing if tests pass",
        "Minor mark deduction",
        "Fail the assessment section",
        "Get a second chance"
      ],
      correctAnswer: 2,
      explanation: "Ignoring obvious defects shows lack of professional competence and will result in failing the assessment section."
    }
  ];

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Header */}
      <div className="border-b border-white/10 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-2">
            <Button variant="ghost" className="min-h-[44px] p-3 text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
              <Link to="..">
                <ArrowLeft className="w-4 h-4 mr-1 sm:mr-2" />
                <span className="hidden xs:inline">Back to Module 4</span>
                <span className="xs:hidden">Back</span>
              </Link>
            </Button>
            <Button variant="ghost" className="min-h-[44px] p-3 text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
              <Link to="..">
                <span className="hidden xs:inline">Next Module</span>
                <span className="xs:hidden">Module 5</span>
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
            <Search className="w-4 h-4" />
            Module 4 – Section 5
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            Identifying and Reporting Non-Compliances
          </h1>
          <p className="text-sm sm:text-base text-white mb-6 sm:mb-8 leading-relaxed">
            It's not enough to complete an installation and test it — you must also be able to identify when something does not comply with BS 7671 or the specification. In AM2, this means spotting non-compliances during testing or inspection, and then correctly reporting them on the certification.
          </p>
        </div>

        {/* Critical Warning */}
        <Card className="bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-700/50 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-700 dark:text-elec-yellow mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-red-900 dark:text-red-100 mb-2 text-sm sm:text-base">
                  CRITICAL: Missing Defects = Assessment Failure
                </h3>
                <p className="text-xs sm:text-sm text-red-800 dark:text-red-200 mb-3 leading-relaxed">
                  Assessors are looking for your ability to spot faults, interpret test results, and apply regulation-based judgement. Candidates who ignore obvious defects or record incorrect results will fail this section.
                </p>
                <p className="text-xs sm:text-sm text-red-800 dark:text-red-200 font-medium leading-relaxed">
                  Professional competence includes identifying problems, not just completing tasks. This demonstrates real-world electrical safety awareness.
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
                Define what a non-compliance is in the context of BS 7671
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Identify common installation faults and unsafe practices
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Interpret test results that fall outside permitted values
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Record non-compliances clearly and accurately on certification
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Explain to an assessor why something is non-compliant
              </li>
            </ul>
          </div>
        </Card>

        {/* What is a Non-Compliance */}
        <Card className="bg-transparent border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              1. What is a Non-Compliance?
            </h2>
            
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-elec-yellow/5 dark:bg-elec-yellow/10 border border-blue-200 dark:border-blue-800/30 rounded-lg p-3 sm:p-4">
                <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2 sm:mb-3 text-sm sm:text-base">Definition:</h4>
                <p className="text-xs sm:text-sm text-blue-700 dark:text-elec-yellow mb-3">
                  Any part of an installation that does not meet the requirements of BS 7671, manufacturer's instructions, or the installation specification.
                </p>
                <p className="text-xs sm:text-sm text-elec-yellow dark:text-elec-yellow">
                  <strong>Key Principle:</strong> Non-compliances can range from safety-critical issues to workmanship standards that affect professional quality.
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700/50 rounded-lg p-3 sm:p-4">
                    <h4 className="font-medium text-red-900 dark:text-red-100 mb-2 text-sm sm:text-base">Safety-Critical Non-Compliances:</h4>
                    <ul className="text-xs sm:text-sm text-red-800 dark:text-red-200 space-y-1">
                      <li>• Missing or disconnected CPC</li>
                      <li>• Exposed copper or damaged insulation</li>
                      <li>• Incorrect polarity</li>
                      <li>• Zs values exceeding BS 7671 maximums</li>
                      <li>• RCDs failing to trip within required times</li>
                      <li>• Inadequate earthing arrangements</li>
                    </ul>
                  </div>
                  
                  <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800/30 rounded-lg p-3 sm:p-4">
                    <h4 className="font-medium text-orange-800 dark:text-orange-200 mb-2 text-sm sm:text-base">Design Non-Compliances:</h4>
                    <ul className="text-xs sm:text-sm text-orange-700 dark:text-elec-yellow space-y-1">
                      <li>• Incorrect cable size for load</li>
                      <li>• Inadequate circuit protection</li>
                      <li>• Missing RCD protection where required</li>
                      <li>• Insufficient IP rating for location</li>
                      <li>• Non-compliance with special location requirements</li>
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800/30 rounded-lg p-3 sm:p-4">
                    <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2 text-sm sm:text-base">Workmanship Non-Compliances:</h4>
                    <ul className="text-xs sm:text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                      <li>• Poor workmanship (crooked accessories)</li>
                      <li>• Overfilled trunking or conduit</li>
                      <li>• Inadequate cable support</li>
                      <li>• Missing labels or identification</li>
                      <li>• Untidy terminations</li>
                    </ul>
                  </div>
                  
                  <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800/30 rounded-lg p-3 sm:p-4">
                    <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-2 text-sm sm:text-base">Testing Non-Compliances:</h4>
                    <ul className="text-xs sm:text-sm text-purple-700 dark:text-elec-yellow space-y-1">
                      <li>• Insulation resistance below 1 MΩ</li>
                      <li>• Continuity readings too high</li>
                      <li>• RCD trip times outside limits</li>
                      <li>• Functional testing failures</li>
                      <li>• Incorrect test procedures used</li>
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

        {/* How to Identify Non-Compliances */}
        <Card className="bg-transparent border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Eye className="w-5 h-5" />
              2. How to Identify Non-Compliances
            </h2>
            
            <div className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="bg-elec-yellow/5 dark:bg-elec-yellow/10 border border-blue-200 dark:border-blue-800/30 rounded-lg p-3 sm:p-4">
                  <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2 text-sm sm:text-base flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    Visual Inspection:
                  </h4>
                  <p className="text-xs sm:text-sm text-blue-700 dark:text-elec-yellow mb-2">
                    Before energising - systematic visual checks
                  </p>
                  <ul className="text-xs sm:text-sm text-elec-yellow dark:text-elec-yellow space-y-1">
                    <li>• Damage to cables or accessories</li>
                    <li>• Missing or incorrect sleeving</li>
                    <li>• Poor alignment and workmanship</li>
                    <li>• Segregation of circuits</li>
                    <li>• Compliance with IP ratings</li>
                  </ul>
                </div>
                
                <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30 rounded-lg p-3 sm:p-4">
                  <h4 className="font-medium text-green-800 dark:text-green-200 mb-2 text-sm sm:text-base flex items-center gap-2">
                    <Wrench className="w-4 h-4" />
                    Test Results:
                  </h4>
                  <p className="text-xs sm:text-sm text-green-700 dark:text-green-300 mb-2">
                    Compare readings with BS 7671 limits
                  </p>
                  <ul className="text-xs sm:text-sm text-green-600 dark:text-green-400 space-y-1">
                    <li>• Zs values vs maximum permitted</li>
                    <li>• Insulation resistance &lt; 1 MΩ</li>
                    <li>• RCD trip times outside limits</li>
                    <li>• Continuity values too high</li>
                    <li>• Polarity test failures</li>
                  </ul>
                </div>
                
                <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800/30 rounded-lg p-3 sm:p-4">
                  <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-2 text-sm sm:text-base flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    Functional Checks:
                  </h4>
                  <p className="text-xs sm:text-sm text-purple-700 dark:text-elec-yellow mb-2">
                    Circuits not operating as intended
                  </p>
                  <ul className="text-xs sm:text-sm text-purple-600 dark:text-elec-yellow space-y-1">
                    <li>• Switches not controlling correct loads</li>
                    <li>• RCDs not tripping when tested</li>
                    <li>• Motors not starting or stopping</li>
                    <li>• Incorrect socket polarity</li>
                    <li>• Poor lighting control operation</li>
                  </ul>
                </div>
              </div>

              {/* Systematic Identification Process */}
              <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/30 rounded-lg p-3 sm:p-4">
                <h4 className="font-medium text-amber-800 dark:text-amber-200 mb-3 text-sm sm:text-base">Systematic Identification Process:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div>
                    <strong className="text-amber-700 dark:text-amber-300 block mb-2">Step-by-Step Approach:</strong>
                    <ol className="text-amber-600 dark:text-amber-400 space-y-1">
                      <li>1. Pre-energisation visual inspection</li>
                      <li>2. Dead testing and measurement comparison</li>
                      <li>3. Live testing against BS 7671 limits</li>
                      <li>4. Functional testing verification</li>
                      <li>5. Final compliance review</li>
                    </ol>
                  </div>
                  <div>
                    <strong className="text-amber-700 dark:text-amber-300 block mb-2">Critical Reference Points:</strong>
                    <ul className="text-amber-600 dark:text-amber-400 space-y-1">
                      <li>• BS 7671 maximum Zs tables</li>
                      <li>• RCD trip time requirements</li>
                      <li>• Minimum insulation resistance values</li>
                      <li>• Special location requirements</li>
                      <li>• Manufacturer's specifications</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Common Non-Compliances in AM2 */}
        <Card className="bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-700/50 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-red-800 dark:text-red-200 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              3. Common Non-Compliances in AM2 (NET Guidance)
            </h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-red-900 dark:text-red-100 mb-2 sm:mb-3 text-sm sm:text-base">Most Common Faults Found:</h4>
                  <ul className="text-xs sm:text-sm text-red-800 dark:text-red-200 space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-red-600 rounded-full mt-1.5 flex-shrink-0"></div>
                      CPC unsleeved or disconnected
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-red-600 rounded-full mt-1.5 flex-shrink-0"></div>
                      Socket polarity reversed
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-red-600 rounded-full mt-1.5 flex-shrink-0"></div>
                      Broken ring final circuit
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-red-600 rounded-full mt-1.5 flex-shrink-0"></div>
                      Circuits not labelled at distribution board
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-red-900 dark:text-red-100 mb-2 sm:mb-3 text-sm sm:text-base">Test Result Failures:</h4>
                  <ul className="text-xs sm:text-sm text-red-800 dark:text-red-200 space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-red-600 rounded-full mt-1.5 flex-shrink-0"></div>
                      Zs above permitted value for protective device
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-red-600 rounded-full mt-1.5 flex-shrink-0"></div>
                      Insulation resistance below 1 MΩ
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-red-600 rounded-full mt-1.5 flex-shrink-0"></div>
                      RCD trip times out of range
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-red-600 rounded-full mt-1.5 flex-shrink-0"></div>
                      Continuity values indicating breaks
                    </li>
                  </ul>
                </div>
              </div>

              {/* Detailed Examples with BS 7671 References */}
              <div className="bg-[#1a1a1a]/50 rounded-lg p-3 sm:p-4">
                <h4 className="font-medium text-white mb-3 text-sm sm:text-base">Detailed Examples with BS 7671 Context:</h4>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div className="space-y-3">
                    <div className="bg-red-50 dark:bg-red-950/20 rounded p-2">
                      <strong className="text-red-700 dark:text-elec-yellow">CPC Issues:</strong>
                      <p className="text-red-600 dark:text-elec-yellow mt-1">
                        Unsleeved CPC at accessories, missing earth connections, or inadequate cross-sectional area
                      </p>
                    </div>
                    <div className="bg-red-50 dark:bg-red-950/20 rounded p-2">
                      <strong className="text-red-700 dark:text-elec-yellow">Zs Failures:</strong>
                      <p className="text-red-600 dark:text-elec-yellow mt-1">
                        Values exceeding maximum for MCB type (e.g., B32 = 1.44Ω max at 230V)
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-red-50 dark:bg-red-950/20 rounded p-2">
                      <strong className="text-red-700 dark:text-elec-yellow">RCD Problems:</strong>
                      <p className="text-red-600 dark:text-elec-yellow mt-1">
                        Trip times &gt;300ms at ×1 or &gt;40ms at ×5 for 30mA devices
                      </p>
                    </div>
                    <div className="bg-red-50 dark:bg-red-950/20 rounded p-2">
                      <strong className="text-red-700 dark:text-elec-yellow">Ring Circuit Faults:</strong>
                      <p className="text-red-600 dark:text-elec-yellow mt-1">
                        Broken conductors, incorrect connections, or cross-connections
                      </p>
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

        {/* How to Report Non-Compliances */}
        <Card className="bg-transparent border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              4. How to Report Non-Compliances
            </h2>
            
            <div className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30 rounded-lg p-3 sm:p-4">
                  <h4 className="font-medium text-green-800 dark:text-green-200 mb-2 text-sm sm:text-base">Professional Reporting Principles:</h4>
                  <ul className="text-xs sm:text-sm text-green-700 dark:text-green-300 space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-3 h-3 text-green-500 mt-1 flex-shrink-0" />
                      <span>Record clearly on certificate or defect report</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-3 h-3 text-green-500 mt-1 flex-shrink-0" />
                      <span>Use correct technical terminology</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-3 h-3 text-green-500 mt-1 flex-shrink-0" />
                      <span>Don't guess results — state measured values</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-3 h-3 text-green-500 mt-1 flex-shrink-0" />
                      <span>State the non-compliance, not the correction</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-elec-yellow/5 dark:bg-elec-yellow/10 border border-blue-200 dark:border-blue-800/30 rounded-lg p-3 sm:p-4">
                  <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2 text-sm sm:text-base">What to Include in Reports:</h4>
                  <ul className="text-xs sm:text-sm text-blue-700 dark:text-elec-yellow space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-3 h-3 text-elec-yellow mt-1 flex-shrink-0" />
                      <span>Specific location of non-compliance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-3 h-3 text-elec-yellow mt-1 flex-shrink-0" />
                      <span>Actual measured values where applicable</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-3 h-3 text-elec-yellow mt-1 flex-shrink-0" />
                      <span>BS 7671 requirement that is not met</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-3 h-3 text-elec-yellow mt-1 flex-shrink-0" />
                      <span>Clear description of the defect</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Good vs Poor Reporting Examples */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700/50 rounded-lg p-3 sm:p-4">
                  <h4 className="font-medium text-red-900 dark:text-red-100 mb-3 text-sm sm:text-base">❌ Poor Reporting Examples:</h4>
                  <div className="space-y-2 text-xs sm:text-sm">
                    <div className="bg-[#1a1a1a]/50 rounded p-2">
                      <span className="text-red-800 dark:text-red-200">"Earth missing"</span>
                      <p className="text-red-600 dark:text-elec-yellow text-xs mt-1">Too vague, no location specified</p>
                    </div>
                    <div className="bg-[#1a1a1a]/50 rounded p-2">
                      <span className="text-red-800 dark:text-red-200">"Ring fault"</span>
                      <p className="text-red-600 dark:text-elec-yellow text-xs mt-1">No detail about nature of fault</p>
                    </div>
                    <div className="bg-[#1a1a1a]/50 rounded p-2">
                      <span className="text-red-800 dark:text-red-200">"RCD broken"</span>
                      <p className="text-red-600 dark:text-elec-yellow text-xs mt-1">No test data or specific failure</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30 rounded-lg p-3 sm:p-4">
                  <h4 className="font-medium text-green-800 dark:text-green-200 mb-3 text-sm sm:text-base">✅ Good Reporting Examples:</h4>
                  <div className="space-y-2 text-xs sm:text-sm">
                    <div className="bg-[#1a1a1a]/50 rounded p-2">
                      <span className="text-green-800 dark:text-green-200">"CPC not connected at socket outlet in kitchen"</span>
                      <p className="text-green-600 dark:text-green-400 text-xs mt-1">Specific, clear, located</p>
                    </div>
                    <div className="bg-[#1a1a1a]/50 rounded p-2">
                      <span className="text-green-800 dark:text-green-200">"Ring final broken at consumer unit - L conductor"</span>
                      <p className="text-green-600 dark:text-green-400 text-xs mt-1">Specific conductor and location</p>
                    </div>
                    <div className="bg-[#1a1a1a]/50 rounded p-2">
                      <span className="text-green-800 dark:text-green-200">"RCD trip time 380ms at ×1 IΔn - exceeds 300ms limit"</span>
                      <p className="text-green-600 dark:text-green-400 text-xs mt-1">Measured value and standard referenced</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Documentation Requirements */}
              <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800/30 rounded-lg p-3 sm:p-4">
                <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-3 text-sm sm:text-base">Documentation Requirements for AM2:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div>
                    <strong className="text-purple-700 dark:text-elec-yellow block mb-2">Certificate Entries:</strong>
                    <ul className="text-purple-600 dark:text-elec-yellow space-y-1">
                      <li>• Mark relevant sections as non-compliant</li>
                      <li>• Include actual measured values</li>
                      <li>• Use observations/limitations section</li>
                      <li>• Complete departure from BS 7671 sections</li>
                    </ul>
                  </div>
                  <div>
                    <strong className="text-purple-700 dark:text-elec-yellow block mb-2">Defect Reporting:</strong>
                    <ul className="text-purple-600 dark:text-elec-yellow space-y-1">
                      <li>• Use standard defect report forms</li>
                      <li>• Categorise by safety significance</li>
                      <li>• Include recommendations</li>
                      <li>• Reference relevant BS 7671 clauses</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Assessor Expectations */}
        <Card className="bg-transparent border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Target className="w-5 h-5" />
              5. Assessor Expectations
            </h2>
            
            <div className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30 rounded-lg p-3 sm:p-4">
                  <h4 className="font-medium text-green-800 dark:text-green-200 mb-2 sm:mb-3 text-sm sm:text-base flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Professional Competence:
                  </h4>
                  <ul className="text-xs sm:text-sm text-green-700 dark:text-green-300 space-y-1">
                    <li>• Candidate spots and records obvious faults</li>
                    <li>• Explains why result is non-compliant with BS 7671</li>
                    <li>• Records test results realistically, not "perfect" numbers</li>
                    <li>• Demonstrates understanding of safety implications</li>
                  </ul>
                </div>
                
                <div className="bg-elec-yellow/5 dark:bg-elec-yellow/10 border border-blue-200 dark:border-blue-800/30 rounded-lg p-3 sm:p-4">
                  <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2 sm:mb-3 text-sm sm:text-base flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Safety Awareness:
                  </h4>
                  <ul className="text-xs sm:text-sm text-blue-700 dark:text-elec-yellow space-y-1">
                    <li>• Leaves installation safe, even if faults identified</li>
                    <li>• Prioritises safety-critical non-compliances</li>
                    <li>• Shows understanding of consequences</li>
                    <li>• Demonstrates regulatory knowledge</li>
                  </ul>
                </div>
              </div>

              {/* Detailed Assessment Criteria */}
              <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/30 rounded-lg p-3 sm:p-4">
                <h4 className="font-medium text-amber-800 dark:text-amber-200 mb-3 text-sm sm:text-base">What Assessors Specifically Evaluate:</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
                  <div>
                    <strong className="text-amber-700 dark:text-amber-300 block mb-2">Identification Skills:</strong>
                    <ul className="text-amber-600 dark:text-amber-400 space-y-1">
                      <li>• Visual inspection thoroughness</li>
                      <li>• Test result interpretation</li>
                      <li>• Functional testing awareness</li>
                      <li>• Regulatory knowledge application</li>
                    </ul>
                  </div>
                  <div>
                    <strong className="text-amber-700 dark:text-amber-300 block mb-2">Reporting Quality:</strong>
                    <ul className="text-amber-600 dark:text-amber-400 space-y-1">
                      <li>• Clear, technical language</li>
                      <li>• Accurate measurements</li>
                      <li>• Appropriate detail level</li>
                      <li>• Professional presentation</li>
                    </ul>
                  </div>
                  <div>
                    <strong className="text-amber-700 dark:text-amber-300 block mb-2">Professional Judgement:</strong>
                    <ul className="text-amber-600 dark:text-amber-400 space-y-1">
                      <li>• Risk assessment capability</li>
                      <li>• Priority setting skills</li>
                      <li>• Client communication readiness</li>
                      <li>• Regulatory compliance understanding</li>
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
              6. Comprehensive Practical Guidance
            </h2>
            
            <div className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-elec-yellow/5 dark:bg-elec-yellow/10 border border-blue-200 dark:border-blue-800/30 rounded-lg p-3 sm:p-4">
                    <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2 text-sm sm:text-base">Know the Limits:</h4>
                    <ul className="text-xs sm:text-sm text-blue-700 dark:text-elec-yellow space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-3 h-3 text-elec-yellow mt-1 flex-shrink-0" />
                        <span>Memorise maximum Zs values for common MCBs (B32=1.44Ω, B20=2.30Ω)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-3 h-3 text-elec-yellow mt-1 flex-shrink-0" />
                        <span>RCD trip limits: 300ms at ×1, 40ms at ×5 for 30mA devices</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-3 h-3 text-elec-yellow mt-1 flex-shrink-0" />
                        <span>Minimum insulation resistance: 1MΩ for most circuits</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30 rounded-lg p-3 sm:p-4">
                    <h4 className="font-medium text-green-800 dark:text-green-200 mb-2 text-sm sm:text-base">Visual Inspection Tips:</h4>
                    <ul className="text-xs sm:text-sm text-green-700 dark:text-green-300 space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-3 h-3 text-green-500 mt-1 flex-shrink-0" />
                        <span>Check CPCs visually - assessors always look for sleeving</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-3 h-3 text-green-500 mt-1 flex-shrink-0" />
                        <span>Look for obvious damage, poor workmanship, missing labels</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-3 h-3 text-green-500 mt-1 flex-shrink-0" />
                        <span>Check accessibility and IP ratings for locations</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800/30 rounded-lg p-3 sm:p-4">
                    <h4 className="font-medium text-orange-800 dark:text-orange-200 mb-2 text-sm sm:text-base">Test Result Analysis:</h4>
                    <ul className="text-xs sm:text-sm text-orange-700 dark:text-elec-yellow space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-3 h-3 text-elec-yellow mt-1 flex-shrink-0" />
                        <span>Work logically - if reading looks wrong, re-test</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-3 h-3 text-elec-yellow mt-1 flex-shrink-0" />
                        <span>Record as non-compliant if still outside limits</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-3 h-3 text-elec-yellow mt-1 flex-shrink-0" />
                        <span>Compare all readings with BS 7671 requirements</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800/30 rounded-lg p-3 sm:p-4">
                    <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-2 text-sm sm:text-base">Professional Approach:</h4>
                    <ul className="text-xs sm:text-sm text-purple-700 dark:text-elec-yellow space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-3 h-3 text-elec-yellow mt-1 flex-shrink-0" />
                        <span>Don't cover up - never hide or ignore defects</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-3 h-3 text-elec-yellow mt-1 flex-shrink-0" />
                        <span>Recording them shows competence, not failure</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-3 h-3 text-elec-yellow mt-1 flex-shrink-0" />
                        <span>Explain findings clearly to assessor</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Advanced Techniques */}
              <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-950/20 dark:to-green-950/20 border border-blue-200 dark:border-blue-800/30 rounded-lg p-3 sm:p-4">
                <h4 className="font-medium text-white mb-3 text-sm sm:text-base">Advanced Non-Compliance Identification Techniques:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div>
                    <strong className="text-blue-700 dark:text-elec-yellow block mb-2">Pattern Recognition:</strong>
                    <ul className="text-elec-yellow dark:text-elec-yellow space-y-1">
                      <li>• Multiple high Zs readings may indicate poor earthing</li>
                      <li>• Inconsistent ring continuity suggests breaks</li>
                      <li>• RCD failures often indicate earth leakage</li>
                      <li>• Low insulation resistance patterns show cable issues</li>
                    </ul>
                  </div>
                  <div>
                    <strong className="text-green-700 dark:text-green-300 block mb-2">Professional Communication:</strong>
                    <ul className="text-green-600 dark:text-green-400 space-y-1">
                      <li>• Explain implications to assessor</li>
                      <li>• Reference BS 7671 requirements</li>
                      <li>• Demonstrate understanding of consequences</li>
                      <li>• Show awareness of remedial actions needed</li>
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
        <Card className="bg-transparent border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Real-World Examples
            </h2>
            
            <div className="space-y-4">
              <div className="border-l-4 border-l-red-500 bg-red-100 dark:bg-red-900/30 p-3 sm:p-4">
                <h4 className="font-medium text-red-900 dark:text-red-100 mb-2 text-sm sm:text-base">Example 1: Missed High Zs Reading</h4>
                <p className="text-xs sm:text-sm text-red-800 dark:text-red-200 mb-2">
                  Candidate measured Zs of 2.5 Ω on a B32 breaker (limit 1.44Ω exceeded). Failed to report → <strong>lost marks</strong>
                </p>
                <p className="text-xs text-red-700 dark:text-elec-yellow">
                  Lesson: Always compare measured values with BS 7671 limits. High Zs values indicate potentially dangerous earth fault loop impedance.
                </p>
              </div>
              
              <div className="border-l-4 border-l-red-500 bg-red-100 dark:bg-red-900/30 p-3 sm:p-4">
                <h4 className="font-medium text-red-900 dark:text-red-100 mb-2 text-sm sm:text-base">Example 2: Ignored Polarity Error</h4>
                <p className="text-xs sm:text-sm text-red-800 dark:text-red-200 mb-2">
                  Candidate found socket polarity reversed, but didn't note it. Assessor flagged → <strong>fail</strong>
                </p>
                <p className="text-xs text-red-700 dark:text-elec-yellow">
                  Lesson: Even seemingly minor defects must be recorded. Reversed polarity creates serious safety hazards.
                </p>
              </div>
              
              <div className="border-l-4 border-green-500 bg-green-50 dark:bg-green-950/20 p-3 sm:p-4">
                <h4 className="font-medium text-green-800 dark:text-green-200 mb-2 text-sm sm:text-base">Example 3: Correct RCD Documentation</h4>
                <p className="text-xs sm:text-sm text-green-700 dark:text-green-300 mb-2">
                  Candidate recorded RCD 1× test at 280ms, 5× at 36ms. Correctly recorded as pass → <strong>full marks</strong>
                </p>
                <p className="text-xs text-green-600 dark:text-green-400">
                  Lesson: Accurate recording of actual measured values, even when within limits, demonstrates professional competence.
                </p>
              </div>
              
              <div className="border-l-4 border-elec-yellow bg-yellow-50 dark:bg-yellow-950/20 p-3 sm:p-4">
                <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2 text-sm sm:text-base">Example 4: Real-World Audit Failure</h4>
                <p className="text-xs sm:text-sm text-yellow-700 dark:text-yellow-300 mb-2">
                  In real work, electrician ignored a missing CPC. During audit, EICR flagged "Code C2." Same principle in AM2 = non-compliance.
                </p>
                <p className="text-xs text-elec-yellow dark:text-elec-yellow">
                  Lesson: Missing safety-critical items like CPCs can lead to serious consequences in real installations and immediate fails in AM2.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* NET AM2 Specific Assessment Criteria */}
        <Card className="bg-gradient-to-r from-card/10 to-elec-yellow/10 border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Award className="w-5 h-5" />
              NET AM2 Assessment Criteria for Non-Compliance Identification
            </h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#1a1a1a]/50 rounded-lg p-3 sm:p-4">
                  <h4 className="font-medium text-white mb-2 text-sm sm:text-base">Assessment Expectations:</h4>
                  <ul className="text-xs sm:text-sm text-white space-y-1">
                    <li>• Systematic approach to fault identification</li>
                    <li>• Correct interpretation of test results</li>
                    <li>• Professional reporting using technical language</li>
                    <li>• Understanding of safety implications</li>
                    <li>• Appropriate response to discovered faults</li>
                  </ul>
                </div>
                
                <div className="bg-[#1a1a1a]/50 rounded-lg p-3 sm:p-4">
                  <h4 className="font-medium text-white mb-2 text-sm sm:text-base">Professional Development:</h4>
                  <ul className="text-xs sm:text-sm text-white space-y-1">
                    <li>• Regulatory knowledge demonstration</li>
                    <li>• Risk assessment capability</li>
                    <li>• Client communication readiness</li>
                    <li>• Quality assurance understanding</li>
                    <li>• Continuous improvement mindset</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-elec-yellow/10 rounded-lg p-3 sm:p-4">
                <h4 className="font-medium text-elec-yellow mb-2 text-sm sm:text-base">Industry Relevance:</h4>
                <p className="text-xs sm:text-sm text-white">
                  The ability to identify and report non-compliances is crucial for professional electricians. 
                  It demonstrates competence in quality assurance, safety awareness, and regulatory compliance - 
                  all essential skills for real-world electrical work and client trust.
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
              <div className="bg-[#1a1a1a]/50 rounded-lg p-3 sm:p-4">
                <h4 className="font-medium text-white mb-3 text-sm sm:text-base">Key Takeaways:</h4>
                <ul className="text-xs sm:text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Identifying and reporting non-compliances proves professional competence</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Visual checks, test results, and functional tests must be interpreted correctly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Record non-compliances accurately using clear, technical language</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Note realistic values, not hidden or "book answers"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Leave installation safe, even with faults recorded</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Failing to report faults is a common reason candidates don't pass</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-elec-yellow/10 rounded-lg p-3 sm:p-4">
                <h4 className="font-medium text-elec-yellow mb-2 text-sm sm:text-base">Module 4 Complete:</h4>
                <p className="text-xs sm:text-sm text-white">
                  You have now completed Module 4 - Testing and Commissioning. You understand test procedures, 
                  equipment safety, result recording, functional testing, and non-compliance identification. 
                  You're ready to move on to Module 5 for the final components of AM2 success.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Quiz Section */}
        <Card className="bg-transparent border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Timer className="w-5 h-5" />
              Test Your Knowledge
            </h2>
            <p className="text-xs sm:text-sm text-white mb-6">
              Complete this 10-question quiz to test your understanding of identifying and reporting non-compliances.
            </p>
            <Quiz questions={quizQuestions} title="Identifying and Reporting Non-Compliances" />
          </div>
        </Card>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-4 pt-6 sm:pt-8">
          <Button variant="outline" className="w-full sm:w-auto" asChild>
            <Link to="../section4" className="flex items-center justify-center">
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="text-sm sm:text-base">Previous: Functional Testing</span>
            </Link>
          </Button>
          <Button className="w-full sm:w-auto" asChild>
            <Link to=".." className="flex items-center justify-center">
              <span className="text-sm sm:text-base">Next: Module 5</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AM2Module4Section5;