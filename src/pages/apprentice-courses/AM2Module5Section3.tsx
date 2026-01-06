import { ArrowLeft, ArrowRight, AlertTriangle, CheckCircle, Target, Search, Lightbulb, BookOpen, Wrench, ChevronLeft, ChevronRight, Zap, Eye, Settings, Shield, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const AM2Module5Section3 = () => {
  useSEO(
    "Using Test Equipment Efficiently | AM2 Module 5 Section 3",
    "Master efficient test equipment use in AM2 assessments. Learn GS38 compliance, instrument selection, and safe testing procedures for accurate fault diagnosis."
  );

  const quickCheckQuestions: Array<{
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }> = [
    {
      id: "safe-isolation",
      question: "Which tester is used to prove safe isolation?",
      options: [
        "Multifunction tester (MFT)",
        "Continuity tester", 
        "A two-pole voltage indicator",
        "Insulation resistance tester"
      ],
      correctIndex: 2,
      explanation: "A two-pole voltage indicator is required for safe isolation procedures, not an MFT. This ensures proper Test-Prove-Test sequence."
    },
    {
      id: "zero-leads",
      question: "Why must leads be zeroed before continuity testing?",
      options: [
        "To check the battery level",
        "To remove the resistance of the leads from the measurement",
        "To calibrate the tester",
        "To comply with regulations"
      ],
      correctIndex: 1,
      explanation: "Zeroing (nulling) the test leads removes their resistance from the measurement, ensuring accurate continuity readings."
    },
    {
      id: "lamp-disconnection",
      question: "Why must you disconnect lamps before insulation resistance testing?",
      options: [
        "To save energy",
        "To prevent damage to equipment and get accurate results",
        "It's required by law",
        "To make testing easier"
      ],
      correctIndex: 1,
      explanation: "Sensitive equipment like lamps can be damaged by high test voltages and will give false low readings during insulation resistance testing."
    }
  ];

  const quizQuestions = [
    {
      id: 1,
      question: "Which tester is used for safe isolation?",
      options: ["Multifunction tester", "Two-pole voltage indicator", "Continuity tester", "Insulation resistance tester"],
      correctAnswer: 1,
      explanation: "A two-pole voltage indicator is specifically required for safe isolation procedures to prove circuits are dead."
    },
    {
      id: 2,
      question: "How much probe tip should be exposed under GS38?",
      options: ["1-2 mm", "2-4 mm", "5-10 mm", "No limit specified"],
      correctAnswer: 1,
      explanation: "GS38 requires probe tips to be shrouded with only 2-4 mm of metal exposed for safety."
    },
    {
      id: 3,
      question: "Why must continuity leads be zeroed?",
      options: ["To check battery", "To remove lead resistance from measurement", "To calibrate tester", "To save time"],
      correctAnswer: 1,
      explanation: "Zeroing removes the resistance of the test leads themselves from the measurement for accurate results."
    },
    {
      id: 4,
      question: "What test would you use to prove a short circuit?",
      options: ["Continuity test", "Polarity test", "Insulation resistance test", "RCD test"],
      correctAnswer: 2,
      explanation: "Insulation resistance testing at 500V DC will reveal short circuits as very low or zero resistance readings."
    },
    {
      id: 5,
      question: "What unit is insulation resistance measured in?",
      options: ["Ohms (Ω)", "Megohms (MΩ)", "Volts (V)", "Amperes (A)"],
      correctAnswer: 1,
      explanation: "Insulation resistance is measured in Megohms (MΩ), with minimum 1MΩ required for most circuits."
    },
    {
      id: 6,
      question: "What test would you use to identify high resistance joints?",
      options: ["Insulation resistance", "Polarity test", "Zs (earth fault loop impedance)", "RCD test"],
      correctAnswer: 2,
      explanation: "Zs testing or continuity testing will reveal high resistance connections as elevated readings."
    },
    {
      id: 7,
      question: "What's the maximum trip time for a 30 mA RCD at ×1 IΔn?",
      options: ["40ms", "150ms", "300ms", "500ms"],
      correctAnswer: 2,
      explanation: "At 1× rated current (30mA), RCDs must trip within 300ms according to BS7671."
    },
    {
      id: 8,
      question: "True or false: Taping up damaged test leads is acceptable in AM2.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation: "False. Damaged test leads must be replaced, never repaired with tape. This is a serious safety violation."
    },
    {
      id: 9,
      question: "Why must you disconnect lamps before insulation resistance testing?",
      options: ["To save power", "To prevent damage and get accurate results", "It's not necessary", "To save time"],
      correctAnswer: 1,
      explanation: "High test voltages can damage sensitive equipment and connected loads will give false low readings."
    },
    {
      id: 10,
      question: "What do assessors expect you to do if you get an unrealistic reading?",
      options: ["Ignore it", "Make up a better number", "Re-check instrument settings and connections", "Ask for help"],
      correctAnswer: 2,
      explanation: "Always re-check your instrument settings and connections rather than recording false values."
    }
  ];

  const faqs = [
    {
      question: "Can I bring my own test equipment?",
      answer: "Yes, but it must be GS38 compliant and in good condition. All equipment will be checked before use."
    },
    {
      question: "Do I always use the MFT?",
      answer: "Mostly, but safe isolation requires a separate two-pole voltage tester. Each tool has specific applications."
    },
    {
      question: "What if my readings seem unrealistic?",
      answer: "Re-check instrument settings and connections — never fake values. Assessors can spot unrealistic numbers."
    },
    {
      question: "How strict are assessors about GS38?",
      answer: "Very strict — unsafe equipment use equals instant fail. Safety is non-negotiable in electrical work."
    },
    {
      question: "Do I lose marks for being slow with instruments?",
      answer: "No, but poor efficiency risks running out of time. Practice until instrument operation becomes second nature."
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
            <Activity className="w-4 h-4" />
            Module 5 – Section 3
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 sm:mb-6 leading-tight">
            Using Test Equipment Efficiently
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
            In AM2 fault diagnosis, test equipment is your main tool. You will rely on instruments like a multifunction tester (MFT), a continuity tester, an insulation resistance tester, and a voltage indicator to identify faults safely and accurately.
          </p>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Efficient use of test equipment means choosing the right tool for the fault, setting it up correctly, applying it safely, and recording results without wasting time or guessing.
          </p>
        </div>

        {/* Critical Warning */}
        <Card className="bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 dark:text-elec-yellow mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2 text-sm sm:text-base">
                  CRITICAL: GS38 Safety Compliance
                </h3>
                <p className="text-xs sm:text-sm text-red-700 dark:text-elec-yellow mb-3 leading-relaxed">
                  The assessor is watching closely to see if you can handle test equipment in line with GS38 safety requirements. Unsafe equipment use equals instant fail.
                </p>
                <p className="text-xs sm:text-sm text-red-700 dark:text-elec-yellow font-medium leading-relaxed">
                  Never tape up damaged leads — replace them. Use only shrouded probes with 2-4mm exposed tips.
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
                Select the correct test instrument for different types of faults
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Apply GS38 safety requirements when using test probes and leads
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Carry out continuity, insulation resistance, polarity, Zs, PSC, and RCD tests safely
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Use test results to identify fault types without guesswork
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Demonstrate safe, confident handling of instruments to an assessor
              </li>
            </ul>
          </div>
        </Card>

        {/* Core Test Instruments */}
        <Card className="bg-card border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5" />
              1. Core Test Instruments in AM2 Fault Finding
            </h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-border/20 rounded-lg p-4">
                  <h4 className="font-medium text-foreground mb-3">Primary Instruments:</h4>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• <strong>Multifunction Tester (MFT):</strong> Combines continuity, insulation resistance, Zs, PSC/PSCC, and RCD functions</li>
                    <li>• <strong>Continuity tester:</strong> Proves open circuits and checks rings/CPCs</li>
                    <li>• <strong>Insulation resistance tester:</strong> Detects short circuits or earth faults</li>
                  </ul>
                </div>
                
                <div className="border border-border/20 rounded-lg p-4">
                  <h4 className="font-medium text-foreground mb-3">Safety Equipment:</h4>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• <strong>Voltage indicator (two-pole):</strong> Used for safe isolation and proving circuits live/dead</li>
                    <li>• <strong>Proving unit:</strong> Confirms voltage indicator is working before/after use</li>
                    <li>• <strong>GS38 test leads:</strong> Fused and shrouded for safety</li>
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

        {/* GS38 Safety Compliance */}
        <Card className="bg-card border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              2. Safe Use – GS38 Compliance
            </h2>
            
            <div className="space-y-6">
              <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30 rounded-lg p-4">
                <h4 className="font-medium text-red-800 dark:text-red-200 mb-3">Essential GS38 Requirements:</h4>
                <ul className="text-sm text-red-700 dark:text-elec-yellow space-y-2">
                  <li>• <strong>Shrouded probes:</strong> Only 2–4 mm exposed metal tip</li>
                  <li>• <strong>Fused leads:</strong> Test leads must be fused and undamaged</li>
                  <li>• <strong>Finger barriers:</strong> Keep fingers behind probe barriers at all times</li>
                  <li>• <strong>Lead condition:</strong> Never tape up damaged leads — replace them immediately</li>
                  <li>• <strong>Proving sequence:</strong> Always prove tester on a live source before and after use</li>
                </ul>
              </div>

              <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/30 rounded-lg p-4">
                <h4 className="font-medium text-amber-800 dark:text-amber-200 mb-3">Safe Working Practices:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-amber-800 dark:text-amber-200 mb-2">Before Testing:</h5>
                    <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1">
                      <li>• Visually inspect all test equipment</li>
                      <li>• Check probe shrouds and lead condition</li>
                      <li>• Verify tester calibration dates</li>
                      <li>• Test proving unit operation</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-amber-800 dark:text-amber-200 mb-2">During Testing:</h5>
                    <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1">
                      <li>• Maintain Test-Prove-Test sequence</li>
                      <li>• Keep leads tidy and untangled</li>
                      <li>• Never bypass safety features</li>
                      <li>• Report any equipment faults immediately</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Efficient Test Application */}
        <Card className="bg-card border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5" />
              3. Efficient Application of Tests
            </h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-elec-yellow/5 dark:bg-elec-yellow/10 border border-blue-200 dark:border-blue-800/30 rounded-lg p-4">
                  <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-3">Continuity Testing:</h4>
                  <ul className="text-sm text-blue-700 dark:text-elec-yellow space-y-1">
                    <li>• <strong>Best for:</strong> Open circuits, broken rings, CPC faults</li>
                    <li>• <strong>Setup:</strong> Always zero leads first</li>
                    <li>• <strong>Current:</strong> Use 200mA test current</li>
                    <li>• <strong>Record:</strong> Actual resistance values in Ω</li>
                  </ul>
                </div>
                
                <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30 rounded-lg p-4">
                  <h4 className="font-medium text-green-800 dark:text-green-200 mb-3">Insulation Resistance:</h4>
                  <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                    <li>• <strong>Best for:</strong> Shorts or earth faults</li>
                    <li>• <strong>Setup:</strong> Disconnect sensitive equipment first</li>
                    <li>• <strong>Voltage:</strong> 500V DC for most circuits</li>
                    <li>• <strong>Minimum:</strong> 1MΩ required (investigate if below 2MΩ)</li>
                  </ul>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800/30 rounded-lg p-4">
                  <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-3">Polarity & Zs Testing:</h4>
                  <ul className="text-sm text-purple-700 dark:text-elec-yellow space-y-1">
                    <li>• <strong>Polarity:</strong> Confirm correct connections at sockets, switches, lighting</li>
                    <li>• <strong>Zs testing:</strong> Identify high resistance faults</li>
                    <li>• <strong>Compare:</strong> Against BS 7671 maximum values</li>
                    <li>• <strong>Safety:</strong> Ensure RCD not bypassed during Zs tests</li>
                  </ul>
                </div>
                
                <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800/30 rounded-lg p-4">
                  <h4 className="font-medium text-orange-800 dark:text-orange-200 mb-3">RCD Testing:</h4>
                  <ul className="text-sm text-orange-700 dark:text-elec-yellow space-y-1">
                    <li>• <strong>×1 test:</strong> Must trip within 300ms at rated current</li>
                    <li>• <strong>×5 test:</strong> Must trip within 40ms (30mA RCDs)</li>
                    <li>• <strong>×0.5 test:</strong> Should NOT trip (checks over-sensitivity)</li>
                    <li>• <strong>Functional:</strong> Test button operation</li>
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

        {/* Common Errors and Assessor Expectations */}
        <Card className="bg-card border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Eye className="w-5 h-5" />
              4. Common Errors and Assessor Expectations
            </h2>
            
            <div className="space-y-6">
              <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30 rounded-lg p-4">
                <h4 className="font-medium text-red-800 dark:text-red-200 mb-3">Common Candidate Errors (NET Guidance):</h4>
                <ul className="text-sm text-red-700 dark:text-elec-yellow space-y-2">
                  <li>• <strong>Wrong instrument:</strong> Using wrong instrument for fault type (e.g. trying to find open circuit with insulation tester)</li>
                  <li>• <strong>Forgot zeroing:</strong> Not zeroing continuity leads → false readings</li>
                  <li>• <strong>Equipment connected:</strong> Carrying out insulation resistance with lamps/equipment connected → damage or wrong results</li>
                  <li>• <strong>False numbers:</strong> Recording "perfect" numbers instead of measured values</li>
                  <li>• <strong>Unsafe probes:</strong> Using non-GS38 probes (long tips, unsafe)</li>
                </ul>
              </div>

              <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30 rounded-lg p-4">
                <h4 className="font-medium text-green-800 dark:text-green-200 mb-3">Assessors Want to See You:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-green-800 dark:text-green-200 mb-2">Technical Competence:</h5>
                    <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                      <li>• Choose correct instrument for the fault</li>
                      <li>• Set the range correctly (e.g. 500V for IR, not 250V)</li>
                      <li>• Record values realistically, not "book answers"</li>
                      <li>• Work efficiently without repeated setting changes</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-green-800 dark:text-green-200 mb-2">Safety Compliance:</h5>
                    <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                      <li>• Use safe probe techniques with barriers</li>
                      <li>• Follow Test-Prove-Test sequence</li>
                      <li>• Handle equipment professionally</li>
                      <li>• Report any safety concerns immediately</li>
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

        {/* Advanced Equipment Mastery */}
        <Card className="bg-card border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5" />
              6. Advanced Equipment Mastery
            </h2>
            
            <div className="space-y-6">
              <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800/30 rounded-lg p-4">
                <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-3">Equipment Calibration and Maintenance:</h4>
                <div className="text-sm text-purple-700 dark:text-elec-yellow space-y-3">
                  <div>
                    <h5 className="font-medium mb-1">Before Every AM2 Assessment:</h5>
                    <ul className="space-y-1">
                      <li>• Check calibration certificates are current (typically annual)</li>
                      <li>• Verify battery condition and charge level</li>
                      <li>• Test all functions on known good circuit</li>
                      <li>• Inspect leads for damage, kinks, or wear</li>
                      <li>• Ensure probe shrouds are secure and undamaged</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium mb-1 mt-3">Professional Equipment Standards:</h5>
                    <ul className="space-y-1">
                      <li>• CAT III or CAT IV rated test equipment preferred</li>
                      <li>• Fused test leads with HRC fuses (typically 500mA)</li>
                      <li>• Digital display with clear readings in all lighting</li>
                      <li>• Auto-ranging capability for efficient operation</li>
                      <li>• Data logging capability for record keeping</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/30 rounded-lg p-4">
                <h4 className="font-medium text-amber-800 dark:text-amber-200 mb-3">Advanced Testing Techniques:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-amber-800 dark:text-amber-200 mb-2">Temperature Compensation:</h5>
                    <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1">
                      <li>• Account for conductor temperature effects</li>
                      <li>• Use correction factors for accurate readings</li>
                      <li>• Consider ambient temperature variations</li>
                      <li>• Allow cables to stabilise before testing</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-amber-800 dark:text-amber-200 mb-2">Measurement Uncertainty:</h5>
                    <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1">
                      <li>• Understand instrument accuracy specifications</li>
                      <li>• Account for ±5% typical measurement error</li>
                      <li>• Use multiple readings for critical measurements</li>
                      <li>• Document measurement conditions</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-elec-yellow/5 dark:bg-elec-yellow/10 border border-blue-200 dark:border-blue-800/30 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-3">Troubleshooting Equipment Issues:</h4>
                <div className="text-sm text-blue-700 dark:text-elec-yellow space-y-3">
                  <div>
                    <h5 className="font-medium mb-1">Common Equipment Problems in AM2:</h5>
                    <ul className="space-y-1">
                      <li>• <strong>Erratic readings:</strong> Usually poor connections or battery issues</li>
                      <li>• <strong>Display problems:</strong> Check LCD contrast settings and lighting</li>
                      <li>• <strong>Probe contact issues:</strong> Clean probe tips and check spring pressure</li>
                      <li>• <strong>Auto-ranging delays:</strong> Switch to manual range for faster operation</li>
                      <li>• <strong>Memory errors:</strong> Clear stored data and restart instrument</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium mb-1 mt-3">Emergency Procedures:</h5>
                    <ul className="space-y-1">
                      <li>• Report equipment faults to assessor immediately</li>
                      <li>• Have backup equipment ready if permitted</li>
                      <li>• Know how to switch between different test methods</li>
                      <li>• Understand manual calculation methods as backup</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Industry Standards and Compliance */}
        <Card className="bg-card border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              7. Industry Standards and Compliance
            </h2>
            
            <div className="space-y-6">
              <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30 rounded-lg p-4">
                <h4 className="font-medium text-green-800 dark:text-green-200 mb-3">Legal and Insurance Requirements:</h4>
                <div className="text-sm text-green-700 dark:text-green-300 space-y-3">
                  <p><strong>Why proper testing matters beyond AM2:</strong></p>
                  <ul className="space-y-1">
                    <li>• <strong>Legal liability:</strong> Duty of care under Health & Safety at Work Act</li>
                    <li>• <strong>Insurance validity:</strong> Claims may be rejected for non-compliant testing</li>
                    <li>• <strong>Professional standards:</strong> IET Code of Practice requirements</li>
                    <li>• <strong>Competency evidence:</strong> Proper records prove professional competence</li>
                  </ul>
                </div>
              </div>

              <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30 rounded-lg p-4">
                <h4 className="font-medium text-red-800 dark:text-red-200 mb-3">Test Equipment Regulations:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-red-800 dark:text-red-200 mb-2">BS EN 61010 (Test Equipment Safety):</h5>
                    <ul className="text-sm text-red-700 dark:text-elec-yellow space-y-1">
                      <li>• Equipment must be CAT rated for application</li>
                      <li>• Overvoltage protection essential</li>
                      <li>• Double insulation or earthing required</li>
                      <li>• Clear marking and warnings mandatory</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-red-800 dark:text-red-200 mb-2">GS38 Key Requirements:</h5>
                    <ul className="text-sm text-red-700 dark:text-elec-yellow space-y-1">
                      <li>• Probe tips: 2-4mm exposed maximum</li>
                      <li>• Lead protection: HRC fused at source</li>
                      <li>• Finger barriers: Prevent accidental contact</li>
                      <li>• Voltage rating: Adequate for system voltage</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-elec-yellow/5 dark:bg-elec-yellow/10 border border-blue-200 dark:border-blue-800/30 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-3">Professional Development Through Testing:</h4>
                <p className="text-sm text-blue-700 dark:text-elec-yellow mb-3">
                  Mastering test equipment use in AM2 builds skills essential for career progression:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Technical Skills:</h5>
                    <ul className="text-sm text-blue-700 dark:text-elec-yellow space-y-1">
                      <li>• Systematic diagnostic thinking</li>
                      <li>• Precision in measurement techniques</li>
                      <li>• Understanding of electrical principles</li>
                      <li>• Quality assurance mindset</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Professional Skills:</h5>
                    <ul className="text-sm text-blue-700 dark:text-elec-yellow space-y-1">
                      <li>• Clear communication with clients</li>
                      <li>• Accurate record keeping</li>
                      <li>• Safety-first mentality</li>
                      <li>• Continuous improvement approach</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Advanced Scenarios and Edge Cases */}
        <Card className="bg-card border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Eye className="w-5 h-5" />
              8. Advanced Scenarios and Edge Cases</h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-elec-yellow/5 dark:bg-elec-yellow/10 border border-blue-200 dark:border-blue-800/30 rounded-lg p-4">
                    <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2 flex items-center gap-2">
                      <Lightbulb className="w-4 h-4" />
                      Preparation Tips
                    </h4>
                    <ul className="text-sm text-blue-700 dark:text-elec-yellow space-y-1">
                      <li>• Familiarise with MFT controls before assessment</li>
                      <li>• Practice until settings are second nature</li>
                      <li>• Think before you test — which fault type suspected?</li>
                      <li>• Handle equipment neatly — keep leads tidy</li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30 rounded-lg p-4">
                    <h4 className="font-medium text-green-800 dark:text-green-200 mb-2 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      During Assessment
                    </h4>
                    <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                      <li>• Work circuit by circuit — don't jump around</li>
                      <li>• Explain what you're doing clearly to assessor</li>
                      <li>• Record results immediately — don't repeat tests</li>
                      <li>• Stay calm and methodical under pressure</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/30 rounded-lg p-4">
                    <h4 className="font-medium text-amber-800 dark:text-amber-200 mb-2 flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      Professional Communication
                    </h4>
                    <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1">
                      <li>• "I'm carrying out an insulation resistance test between line and neutral"</li>
                      <li>• "Reading shows 0.02MΩ indicating a short circuit"</li>
                      <li>• "Zeroing test leads to remove lead resistance"</li>
                      <li>• "Proving voltage indicator before isolation"</li>
                    </ul>
                  </div>

                  <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800/30 rounded-lg p-4">
                    <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      Avoid Time Wasters
                    </h4>
                    <ul className="text-sm text-purple-700 dark:text-elec-yellow space-y-1">
                      <li>• Swapping settings repeatedly</li>
                      <li>• Using wrong test for suspected fault</li>
                      <li>• Forgetting to disconnect equipment</li>
                      <li>• Not recording results immediately</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Equipment Maintenance and Calibration */}
        <Card className="bg-card border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5" />
              6. Equipment Maintenance and Professional Standards
            </h2>
            
            <div className="space-y-6">
              <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800/30 rounded-lg p-4">
                <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-3">Equipment Calibration Requirements:</h4>
                <div className="text-sm text-purple-700 dark:text-elec-yellow space-y-3">
                  <div>
                    <h5 className="font-medium mb-1">Annual Calibration Standards:</h5>
                    <ul className="space-y-1">
                      <li>• <strong>Legal requirement:</strong> All test equipment must have valid calibration certificates</li>
                      <li>• <strong>Traceability:</strong> Certificates must show traceability to national standards</li>
                      <li>• <strong>Accuracy specifications:</strong> Typically ±2% for most electrical measurements</li>
                      <li>• <strong>Documentation:</strong> Keep calibration records for insurance and legal purposes</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium mb-1 mt-3">Daily Equipment Checks:</h5>
                    <ul className="space-y-1">
                      <li>• Battery condition and voltage levels</li>
                      <li>• Physical condition of leads and probes</li>
                      <li>• Display clarity and function testing</li>
                      <li>• Prove unit operation verification</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/30 rounded-lg p-4">
                <h4 className="font-medium text-amber-800 dark:text-amber-200 mb-3">Advanced Testing Considerations:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-amber-800 dark:text-amber-200 mb-2">Environmental Factors:</h5>
                    <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1">
                      <li>• Temperature effects on conductor resistance</li>
                      <li>• Humidity impact on insulation readings</li>
                      <li>• Electromagnetic interference sources</li>
                      <li>• Altitude and atmospheric pressure effects</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-amber-800 dark:text-amber-200 mb-2">Measurement Uncertainty:</h5>
                    <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1">
                      <li>• Instrument accuracy limitations (±2-5%)</li>
                      <li>• Contact resistance variations</li>
                      <li>• Cable length effects on readings</li>
                      <li>• Multiple measurement averaging</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Troubleshooting and Problem Solving */}
        <Card className="bg-card border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Target className="w-5 h-5" />
              7. Advanced Troubleshooting Techniques
            </h2>
            
            <div className="space-y-6">
              <div className="bg-elec-yellow/5 dark:bg-elec-yellow/10 border border-blue-200 dark:border-blue-800/30 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-3">Complex Fault Scenarios:</h4>
                <div className="text-sm text-blue-700 dark:text-elec-yellow space-y-3">
                  <div>
                    <h5 className="font-medium mb-1">Multiple Fault Interactions:</h5>
                    <ul className="space-y-1">
                      <li>• <strong>Masked faults:</strong> One fault hiding another (e.g., open circuit hiding short circuit)</li>
                      <li>• <strong>Cascading effects:</strong> Single point failures affecting multiple circuits</li>
                      <li>• <strong>Intermittent problems:</strong> Faults that appear/disappear with loading or temperature</li>
                      <li>• <strong>Cross-talk effects:</strong> Faults in one circuit affecting adjacent circuits</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium mb-1 mt-3">Advanced Diagnostic Methods:</h5>
                    <ul className="space-y-1">
                      <li>• <strong>Load testing:</strong> Apply controlled loads to reveal high resistance faults</li>
                      <li>• <strong>Thermal imaging:</strong> Identify hot spots indicating poor connections</li>
                      <li>• <strong>Oscilloscope analysis:</strong> Examine waveforms for distortion or noise</li>
                      <li>• <strong>Time-domain reflectometry:</strong> Locate cable faults precisely</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30 rounded-lg p-4">
                <h4 className="font-medium text-red-800 dark:text-red-200 mb-3">Equipment Limitations and Workarounds:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-red-800 dark:text-red-200 mb-2">When Standard Tests Fail:</h5>
                    <ul className="text-sm text-red-700 dark:text-elec-yellow space-y-1">
                      <li>• Very high impedance circuits (&gt;10MΩ)</li>
                      <li>• Ultra-low resistance measurements (&lt;0.01Ω)</li>
                      <li>• Circuits with protective capacitors</li>
                      <li>• Installations with surge protection devices</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-red-800 dark:text-red-200 mb-2">Alternative Approaches:</h5>
                    <ul className="text-sm text-red-700 dark:text-elec-yellow space-y-1">
                      <li>• Use lower test voltages for sensitive equipment</li>
                      <li>• Employ 4-wire measurement for precision</li>
                      <li>• Apply guard circuits for high impedance tests</li>
                      <li>• Use pulsed testing to avoid component damage</li>
                    </ul>
                  </div>
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
              6. Real-World Examples
            </h2>
            
            <div className="space-y-4">
              <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30 rounded-lg p-4">
                <h4 className="font-medium text-red-800 dark:text-red-200 mb-3">❌ Example 1: Lead Zeroing Error</h4>
                <p className="text-sm text-red-700 dark:text-elec-yellow mb-2">
                  <strong>Scenario:</strong> Candidate forgot to zero continuity leads before testing.
                </p>
                <p className="text-sm text-red-700 dark:text-elec-yellow mb-2">
                  <strong>Result:</strong> Reading showed 0.7Ω on CPC loop instead of actual 0.05Ω.
                </p>
                <p className="text-sm text-red-700 dark:text-elec-yellow font-medium">
                  <strong>Outcome:</strong> Assessor flagged as incorrect — marks lost for basic error.
                </p>
              </div>

              <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30 rounded-lg p-4">
                <h4 className="font-medium text-red-800 dark:text-red-200 mb-3">❌ Example 2: Equipment Not Disconnected</h4>
                <p className="text-sm text-red-700 dark:text-elec-yellow mb-2">
                  <strong>Scenario:</strong> Candidate performed insulation resistance without disconnecting lamps.
                </p>
                <p className="text-sm text-red-700 dark:text-elec-yellow mb-2">
                  <strong>Result:</strong> Low reading due to lamp circuits, potential equipment damage.
                </p>
                <p className="text-sm text-red-700 dark:text-elec-yellow font-medium">
                  <strong>Outcome:</strong> Assessor marked down for procedure error and false reading.
                </p>
              </div>

              <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30 rounded-lg p-4">
                <h4 className="font-medium text-green-800 dark:text-green-200 mb-3">✅ Example 3: Professional Practice</h4>
                <p className="text-sm text-green-700 dark:text-green-300 mb-2">
                  <strong>Scenario:</strong> Candidate used correct GS38 leads, proved tester before/after use.
                </p>
                <p className="text-sm text-green-700 dark:text-green-300 mb-2">
                  <strong>Process:</strong> Explained results clearly and demonstrated systematic approach.
                </p>
                <p className="text-sm text-green-700 dark:text-green-300 font-medium">
                  <strong>Outcome:</strong> Full marks for safety compliance and professional method.
                </p>
              </div>

              <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/30 rounded-lg p-4">
                <h4 className="font-medium text-amber-800 dark:text-amber-200 mb-3">⚠️ Example 4: Industry Safety Lesson</h4>
                <p className="text-sm text-amber-700 dark:text-amber-300 mb-2">
                  <strong>Scenario:</strong> In industry, an electrician used damaged probes with exposed tips.
                </p>
                <p className="text-sm text-amber-700 dark:text-amber-300 mb-2">
                  <strong>Result:</strong> Arc flash occurred causing serious burns and equipment damage.
                </p>
                <p className="text-sm text-amber-700 dark:text-amber-300 font-medium">
                  <strong>Lesson:</strong> Same unsafe practice in AM2 equals instant fail — safety is non-negotiable.
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
              7. Frequently Asked Questions
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
              8. Section Summary
            </h2>
            
            <div className="bg-elec-yellow/5 dark:bg-elec-yellow/10 border border-blue-200 dark:border-blue-800/30 rounded-lg p-4 mb-4">
              <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-3">Efficient Test Equipment Use Means:</h4>
              <ul className="text-sm text-blue-700 dark:text-elec-yellow space-y-1">
                <li>• <strong>Selecting</strong> the right instrument for the fault</li>
                <li>• <strong>Using</strong> GS38-compliant probes and safe handling</li>
                <li>• <strong>Setting up</strong> instruments correctly before testing</li>
                <li>• <strong>Recording</strong> real results, not guesses</li>
                <li>• <strong>Working</strong> confidently and neatly under time pressure</li>
              </ul>
            </div>
            
            <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800/30 rounded-lg p-4">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-3">Remember:</h4>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                Unsafe or sloppy tester use can lose you marks — or fail you outright. The assessor is evaluating not just your technical knowledge, but your professional competence and safety awareness.
              </p>
            </div>
          </div>
        </Card>

        {/* Quiz Section */}
        <div className="border-t border-border/20 pt-8">
          <Quiz 
            title="Test Your Knowledge: Using Test Equipment Efficiently"
            questions={quizQuestions}
          />
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-border/20">
          <Button variant="outline" className="w-full sm:w-auto" asChild>
            <Link to="../section2">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous: Logical Process
            </Link>
          </Button>
          <Button className="w-full sm:w-auto" asChild>
            <Link to="../section4">
              Next: Advanced Techniques
              <ChevronRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AM2Module5Section3;