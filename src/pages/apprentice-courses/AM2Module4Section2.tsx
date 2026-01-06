import { ArrowLeft, ArrowRight, Shield, CheckCircle, AlertTriangle, Target, Settings, BookOpen, Timer, Lightbulb, Zap, FileText, Eye, Search, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const AM2Module4Section2 = () => {
  useSEO(
    "Safe Use of Test Instruments (GS38 Compliance) | AM2 Module 4 Section 2",
    "Master safe use of test instruments according to HSE GS38 requirements for AM2 electrical assessment"
  );

  const quickCheckQuestions: Array<{
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }> = [
    {
      id: "probe-exposure",
      question: "How much of the probe tip should be exposed under GS38?",
      options: [
        "1-2 mm maximum",
        "2-4 mm maximum", 
        "5-10 mm maximum",
        "Any length is acceptable"
      ],
      correctIndex: 1,
      explanation: "GS38 requires probe tips to have only 2-4 mm of metal exposed to minimise risk of accidental contact."
    },
    {
      id: "lead-zeroing",
      question: "Why must leads be zeroed before a continuity test?",
      options: [
        "To check battery level",
        "To remove resistance of the leads from the measurement",
        "To calibrate the display",
        "It's not necessary"
      ],
      correctIndex: 1,
      explanation: "Lead resistance must be removed from measurements to ensure accurate continuity readings."
    },
    {
      id: "proving-sequence",
      question: "What is the correct proving sequence for safe isolation?",
      options: [
        "Test circuit only",
        "Prove tester → Test circuit → Re-prove tester",
        "Re-prove tester → Test circuit → Prove tester", 
        "Test circuit → Prove tester"
      ],
      correctIndex: 1,
      explanation: "The safe sequence is: prove tester on known live source, test the circuit, then re-prove on known live source."
    }
  ];

  const quizQuestions = [
    {
      id: 1,
      question: "What is GS38 and why is it important?",
      options: [
        "A British Standard for electrical testing",
        "HSE guidance for electrical test equipment safety",
        "A type of test instrument",
        "An electrical regulation"
      ],
      correctAnswer: 1,
      explanation: "GS38 is HSE (Health and Safety Executive) guidance that specifies safety requirements for electrical test equipment to prevent accidents and injuries."
    },
    {
      id: 2,
      question: "How much probe tip exposure is allowed under GS38?",
      options: ["1 mm maximum", "2-4 mm maximum", "5-8 mm maximum", "10 mm maximum"],
      correctAnswer: 1,
      explanation: "GS38 specifies that probe tips should have only 2-4 mm of metal exposed to minimise the risk of accidental short circuits."
    },
    {
      id: 3,
      question: "Why must test leads be fused?",
      options: [
        "To protect the instrument display",
        "To protect against overcurrent and short circuit faults",
        "To improve accuracy",
        "To meet CAT ratings"
      ],
      correctAnswer: 1,
      explanation: "Fused leads protect both the user and equipment from dangerous overcurrents that could occur during fault conditions."
    },
    {
      id: 4,
      question: "What is the purpose of finger barriers on test probes?",
      options: [
        "To improve grip",
        "To prevent fingers slipping onto live conductors",
        "To make probes look professional",
        "To protect the probe tips"
      ],
      correctAnswer: 1,
      explanation: "Finger barriers prevent accidental contact with live parts if hands slip down the probe during testing."
    },
    {
      id: 5,
      question: "What is the correct sequence for proving a voltage tester?",
      options: [
        "Test circuit then prove on known live source",
        "Prove on known live → Test circuit → Re-prove on known live",
        "Test circuit only",
        "Prove once at start of day"
      ],
      correctAnswer: 1,
      explanation: "The safe proving sequence ensures the tester is working before and after testing to confirm reliable dead indication."
    },
    {
      id: 6,
      question: "Why must tester leads be zeroed before continuity testing?",
      options: [
        "To check the battery",
        "To remove the resistance of the test leads from readings",
        "To set the display to zero",
        "To calibrate the instrument"
      ],
      correctAnswer: 1,
      explanation: "Zeroing removes the inherent resistance of the test leads to ensure accurate low-resistance measurements."
    },
    {
      id: 7,
      question: "True or false: You can tape over damaged leads to continue using them in AM2.",
      options: ["True - tape repairs are acceptable", "False - damaged leads must not be used", "True - if tape is electrical grade", "False - only in emergencies"],
      correctAnswer: 1,
      explanation: "Damaged leads must never be used in AM2 or real work - tape repairs are not acceptable and will result in immediate failure."
    },
    {
      id: 8,
      question: "What CAT rating category should test instruments meet?",
      options: ["CAT I only", "CAT II for most electrical work", "CAT III or higher depending on application", "Any CAT rating is fine"],
      correctAnswer: 2,
      explanation: "CAT III or appropriate category rating ensures instruments can safely handle the electrical environment they're used in."
    },
    {
      id: 9,
      question: "What is the assessor looking for when you handle test equipment?",
      options: [
        "Speed of testing",
        "GS38 compliance and safe handling procedures", 
        "Expensive equipment",
        "Perfect numerical results"
      ],
      correctAnswer: 1,
      explanation: "Assessors primarily evaluate GS38 compliance, safe handling, and proper procedures rather than speed or specific results."
    },
    {
      id: 10,
      question: "What is the consequence of failing to re-prove a voltage tester?",
      options: [
        "Minor mark deduction",
        "Warning from assessor",
        "Automatic failure of AM2 assessment",
        "No consequence"
      ],
      correctAnswer: 2,
      explanation: "Failing to re-prove the tester after testing is considered unsafe practice and results in automatic AM2 failure."
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
              <Link to="../section3">
                <span className="hidden xs:inline">Module 4 Section 3</span>
                <span className="xs:hidden">Section 3</span>
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
            Module 4 – Section 2
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 sm:mb-6 leading-tight">
            Safe Use of Test Instruments (GS38 Compliance)
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
            In AM2, you will use a range of test instruments (multifunction testers, voltage indicators, continuity testers). These must be used safely and correctly in line with HSE GS38 and BS 7671 requirements. Unsafe use of test equipment can cause serious injury and will result in an automatic fail.
          </p>
        </div>

        {/* Critical Warning */}
        <Card className="bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 dark:text-elec-yellow mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2 text-sm sm:text-base">
                  CRITICAL: GS38 Compliance is Non-Negotiable
                </h3>
                <p className="text-xs sm:text-sm text-red-700 dark:text-elec-yellow mb-3 leading-relaxed">
                  Using non-compliant leads, damaged equipment, or skipping proving steps will result in automatic AM2 failure. HSE GS38 requirements protect lives and must be followed exactly.
                </p>
                <p className="text-xs sm:text-sm text-red-700 dark:text-elec-yellow font-medium leading-relaxed">
                  Unsafe practices with test equipment have caused serious injuries and deaths in the electrical industry. Assessors will stop the test immediately if unsafe practices are observed.
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
                State the GS38 requirements for test instruments and leads
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Prove test equipment before and after use correctly
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Use voltage indicators safely for live/dead testing
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Avoid unsafe practices that lead to instant fails
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Understand exactly what assessors are looking for when you use test equipment
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Handle multifunction testers safely and competently
              </li>
            </ul>
          </div>
        </Card>

        {/* GS38 Requirements */}
        <Card className="bg-card border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              1. GS38 Requirements for Test Instruments
            </h2>
            
            <div className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="bg-elec-yellow/5 dark:bg-elec-yellow/10 border border-blue-200 dark:border-blue-800/30 rounded-lg p-3 sm:p-4">
                  <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2 sm:mb-3 text-sm sm:text-base">Test Probes Must Be:</h4>
                  <ul className="text-xs sm:text-sm text-blue-700 dark:text-elec-yellow space-y-1">
                    <li>• Shrouded tips, with only 2–4 mm of metal exposed</li>
                    <li>• Finger barriers or insulated handles</li>
                    <li>• In good condition with no damage</li>
                  </ul>
                </div>
                
                <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30 rounded-lg p-3 sm:p-4">
                  <h4 className="font-medium text-green-800 dark:text-green-200 mb-2 sm:mb-3 text-sm sm:text-base">Test Leads Must Be:</h4>
                  <ul className="text-xs sm:text-sm text-green-700 dark:text-green-300 space-y-1">
                    <li>• Fused, rated for the system voltage</li>
                    <li>• In good condition (no cracks, damage, or taped repairs)</li>
                    <li>• Appropriate length for safe working</li>
                  </ul>
                </div>
                
                <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800/30 rounded-lg p-3 sm:p-4">
                  <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-2 sm:mb-3 text-sm sm:text-base">Instruments Must Be:</h4>
                  <ul className="text-xs sm:text-sm text-purple-700 dark:text-elec-yellow space-y-1">
                    <li>• Category rated (CAT II / CAT III depending on use)</li>
                    <li>• Regularly calibrated and in good working order</li>
                    <li>• Suitable for the intended application</li>
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

        {/* Complete Safe Isolation Procedure */}
        <Card className="bg-card border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Eye className="w-5 h-5" />
              2. Complete Safe Isolation Procedure
            </h2>
            
            <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30 rounded-lg p-4 mb-6">
              <h4 className="font-medium text-red-800 dark:text-red-200 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                CRITICAL: Complete 6-Step Safe Isolation Procedure
              </h4>
              <p className="text-sm text-red-700 dark:text-elec-yellow">
                This is the complete safe isolation procedure as per HSE GS38 and BS 7671. Every step must be completed in order. 
                Skipping any step or changing the sequence = instant AM2 failure.
              </p>
            </div>
            
            <div className="space-y-6">
              {/* Step 1: Identify */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                <div className="flex-1">
                  <h5 className="font-medium text-foreground mb-2">IDENTIFY the Circuit/Supply to be Isolated</h5>
                  <p className="text-sm text-muted-foreground mb-3">
                    Clearly identify which circuit or supply needs to be made safe for work. Use circuit charts, labels, and visual inspection.
                  </p>
                  <div className="bg-elec-yellow/5 dark:bg-elec-yellow/10 rounded p-3 text-sm">
                    <strong className="text-blue-800 dark:text-blue-200">AM2 Actions:</strong>
                    <ul className="text-blue-700 dark:text-elec-yellow mt-1 space-y-1">
                      <li>• Check circuit labels and documentation</li>
                      <li>• Verify circuit routes and connections</li>
                      <li>• Confirm the scope of isolation required</li>
                      <li>• Identify all sources of supply</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Step 2: Isolate */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                <div className="flex-1">
                  <h5 className="font-medium text-foreground mb-2">ISOLATE the Circuit/Supply</h5>
                  <p className="text-sm text-muted-foreground mb-3">
                    Switch off the circuit using appropriate isolation devices. Turn off MCBs, remove fuses, or operate isolator switches.
                  </p>
                  <div className="bg-elec-yellow/5 dark:bg-elec-yellow/10 rounded p-3 text-sm">
                    <strong className="text-blue-800 dark:text-blue-200">AM2 Actions:</strong>
                    <ul className="text-blue-700 dark:text-elec-yellow mt-1 space-y-1">
                      <li>• Switch off appropriate MCB/isolator</li>
                      <li>• Remove fuses where applicable</li>
                      <li>• Ensure all supply sources are isolated</li>
                      <li>• Check isolation device is in OFF position</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Step 3: Secure */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                <div className="flex-1">
                  <h5 className="font-medium text-foreground mb-2">SECURE the Isolation</h5>
                  <p className="text-sm text-muted-foreground mb-3">
                    Prevent accidental re-energisation by locking off the isolation device and/or removing fuses completely.
                  </p>
                  <div className="bg-elec-yellow/5 dark:bg-elec-yellow/10 rounded p-3 text-sm">
                    <strong className="text-blue-800 dark:text-blue-200">AM2 Actions:</strong>
                    <ul className="text-blue-700 dark:text-elec-yellow mt-1 space-y-1">
                      <li>• Apply lock-off device if available</li>
                      <li>• Remove fuses and keep them with you</li>
                      <li>• Place warning notices if required</li>
                      <li>• Ensure others cannot accidentally re-energise</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Step 4: Prove Tester */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                <div className="flex-1">
                  <h5 className="font-medium text-foreground mb-2">PROVE the Voltage Tester on Known Live Source</h5>
                  <p className="text-sm text-muted-foreground mb-3">
                    Test your voltage indicator on a proving unit or known live source to confirm it's working correctly.
                  </p>
                  <div className="bg-red-50 dark:bg-red-950/20 rounded p-3 text-sm">
                    <strong className="text-red-800 dark:text-red-200">AM2 Critical Requirements:</strong>
                    <ul className="text-red-700 dark:text-elec-yellow mt-1 space-y-1">
                      <li>• Use proving unit or reliable known live source</li>
                      <li>• Confirm clear positive voltage indication</li>
                      <li>• Must be demonstrated to assessor</li>
                      <li>• Check tester is functioning correctly</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Step 5: Test Dead */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold">5</div>
                <div className="flex-1">
                  <h5 className="font-medium text-foreground mb-2">TEST for Dead at the Point of Work</h5>
                  <p className="text-sm text-muted-foreground mb-3">
                    Test between all conductors at the exact point where work will be carried out to confirm no voltage is present.
                  </p>
                  <div className="bg-red-50 dark:bg-red-950/20 rounded p-3 text-sm">
                    <strong className="text-red-800 dark:text-red-200">AM2 Test Points (All Must Show Dead):</strong>
                    <ul className="text-red-700 dark:text-elec-yellow mt-1 space-y-1">
                      <li>• Line to Neutral (L-N)</li>
                      <li>• Line to Earth (L-E)</li>
                      <li>• Neutral to Earth (N-E)</li>
                      <li>• Between all conductors if 3-phase</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Step 6: Re-prove */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold">6</div>
                <div className="flex-1">
                  <h5 className="font-medium text-foreground mb-2">RE-PROVE the Voltage Tester on Known Live Source</h5>
                  <p className="text-sm text-muted-foreground mb-3">
                    Return to the known live source and re-test to confirm your voltage indicator is still working correctly.
                  </p>
                  <div className="bg-red-50 dark:bg-red-950/20 rounded p-3 text-sm">
                    <strong className="text-red-800 dark:text-red-200">AM2 Critical - This Confirms:</strong>
                    <ul className="text-red-700 dark:text-elec-yellow mt-1 space-y-1">
                      <li>• Voltage tester has not failed during testing</li>
                      <li>• "Dead" readings were genuine, not due to faulty tester</li>
                      <li>• Safe to proceed with work</li>
                      <li>• <strong>Forgetting this step = automatic failure</strong></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary Box */}
            <div className="mt-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 border border-green-200 dark:border-green-800/30 rounded-lg p-4">
              <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Safe Isolation Complete - Now Safe to Work
              </h4>
              <p className="text-sm text-muted-foreground mb-2">
                Only after completing ALL 6 steps in sequence is it safe to begin work on the isolated circuit.
              </p>
              <div className="text-xs text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-900/30 rounded p-2">
                <strong>Remember:</strong> The circuit is now proven dead and isolated. Maintain the isolation throughout your work, 
                and follow the same proving sequence before re-energising.
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

        {/* Voltage Indicators and Proving Units - Detailed Guide */}
        <Card className="bg-card border-elec-yellow/30 mb-8">
          <div className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5" />
              4. Voltage Indicators & Proving Units - NET AM2 Standards
            </h2>
            
            <div className="space-y-6">
              {/* Types of Voltage Indicators */}
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-elec-yellow/5 dark:bg-elec-yellow/10 border border-blue-200 dark:border-blue-800/30 rounded-lg p-4">
                  <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-3">Approved Voltage Indicators:</h4>
                  <div className="space-y-3 text-sm">
                    <div>
                      <strong className="text-blue-700 dark:text-elec-yellow">Two-Pole Voltage Indicators:</strong>
                      <ul className="text-elec-yellow dark:text-elec-yellow mt-1 space-y-1">
                        <li>• Most common in NET AM2 centres</li>
                        <li>• LED or LCD display</li>
                        <li>• GS38 compliant probes essential</li>
                        <li>• Battery or capacitive operation</li>
                      </ul>
                    </div>
                    <div>
                      <strong className="text-blue-700 dark:text-elec-yellow">Approved Socket Testers:</strong>
                      <ul className="text-elec-yellow dark:text-elec-yellow mt-1 space-y-1">
                        <li>• 13A socket testing units</li>
                        <li>• RCD test functionality</li>
                        <li>• Polarity and earth testing</li>
                        <li>• Must meet GS38 standards</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30 rounded-lg p-4">
                  <h4 className="font-medium text-green-800 dark:text-green-200 mb-3">Proving Unit Operation:</h4>
                  <div className="space-y-3 text-sm">
                    <div>
                      <strong className="text-green-700 dark:text-green-300">Standard Proving Units:</strong>
                      <ul className="text-green-600 dark:text-green-400 mt-1 space-y-1">
                        <li>• Usually 230V AC output</li>
                        <li>• Self-contained battery operation</li>
                        <li>• Clear indication of output status</li>
                        <li>• Regular functionality checks required</li>
                      </ul>
                    </div>
                    <div>
                      <strong className="text-green-700 dark:text-green-300">Alternative Proving Sources:</strong>
                      <ul className="text-green-600 dark:text-green-400 mt-1 space-y-1">
                        <li>• Known live socket outlets</li>
                        <li>• Designated test points</li>
                        <li>• Distribution board indicators</li>
                        <li>• Must be reliable and safe</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Detailed Proving Procedure */}
              <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30 rounded-lg p-4">
                <h4 className="font-medium text-red-800 dark:text-red-200 mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Critical: Detailed Proving Procedure for AM2
                </h4>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-3 sm:gap-4">
                    <div className="bg-background/50 rounded p-3">
                      <h5 className="font-medium text-foreground mb-2">Step 1: Initial Prove</h5>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• Check proving unit is functional</li>
                        <li>• Insert voltage indicator probes</li>
                        <li>• Verify clear positive indication</li>
                        <li>• Note voltage reading if displayed</li>
                        <li>• Demonstrate to assessor</li>
                      </ul>
                    </div>
                    <div className="bg-background/50 rounded p-3">
                      <h5 className="font-medium text-foreground mb-2">Step 2: Circuit Testing</h5>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• Test L-N at point of work</li>
                        <li>• Test L-E at point of work</li>
                        <li>• Test N-E at point of work</li>
                        <li>• Ensure no voltage indication</li>
                        <li>• Verify circuit is dead</li>
                      </ul>
                    </div>
                    <div className="bg-background/50 rounded p-3">
                      <h5 className="font-medium text-foreground mb-2">Step 3: Re-prove</h5>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• Return to proving unit</li>
                        <li>• Re-test voltage indicator</li>
                        <li>• Verify positive indication again</li>
                        <li>• Confirm tester still functional</li>
                        <li>• Complete procedure record</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded p-3">
                    <p className="text-sm text-red-800 dark:text-red-200 font-medium">
                      ⚠️ NET AM2 Critical: Missing any step = Automatic Failure
                    </p>
                    <p className="text-xs text-red-700 dark:text-elec-yellow mt-1">
                      Assessors will specifically watch for the complete sequence. Shortcuts or assumptions about equipment functionality are not acceptable.
                    </p>
                  </div>
                </div>
              </div>

              {/* Common Proving Errors */}
              <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800/30 rounded-lg p-4">
                <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-3">Common Proving Errors in AM2:</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong className="text-yellow-700 dark:text-yellow-300">Equipment Issues:</strong>
                    <ul className="text-elec-yellow dark:text-elec-yellow mt-1 space-y-1">
                      <li>• Using non-GS38 compliant indicators</li>
                      <li>• Assuming proving unit is working</li>
                      <li>• Not checking battery levels</li>
                      <li>• Using damaged proving units</li>
                    </ul>
                  </div>
                  <div>
                    <strong className="text-yellow-700 dark:text-yellow-300">Procedure Failures:</strong>
                    <ul className="text-elec-yellow dark:text-elec-yellow mt-1 space-y-1">
                      <li>• Skipping initial or final prove</li>
                      <li>• Not testing all conductor combinations</li>
                      <li>• Rushing through the sequence</li>
                      <li>• Failing to demonstrate to assessor</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Using Multifunction Tester */}
        <Card className="bg-card border-elec-yellow/30 mb-8">
          <div className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5" />
              3. Using a Multifunction Tester (MFT) Safely
            </h2>
            
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-medium text-foreground">Pre-Test Procedures:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Select the correct test range (e.g., insulation resistance 500V DC, continuity low resistance)</li>
                    <li>• Confirm leads are in the correct sockets before testing</li>
                    <li>• Check lead condition and probe compliance</li>
                    <li>• Zero leads before continuity resistance tests</li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium text-foreground">During Testing:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Use appropriate test probes or clips for stable readings</li>
                    <li>• Maintain safe hand positions behind finger barriers</li>
                    <li>• Allow readings to stabilise before recording</li>
                    <li>• Reset to safe mode when switching functions</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-elec-yellow/5 dark:bg-elec-yellow/10 border border-blue-200 dark:border-blue-800/30 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-3">Key MFT Safety Points for AM2:</h4>
                <ul className="text-sm text-blue-700 dark:text-elec-yellow space-y-1">
                  <li>• Always check function selector before connecting to circuit</li>
                  <li>• Use appropriate test voltage for the circuit being tested</li>
                  <li>• Never force connections - use appropriate test accessories</li>
                  <li>• Switch back to voltage mode when test complete</li>
                  <li>• Explain your actions to the assessor as you work</li>
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

        {/* Unsafe Practices */}
        <Card className="bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800/30 mb-8">
          <div className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-red-800 dark:text-red-200 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              4. Unsafe Practices That Cause Instant Fails
            </h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-medium text-red-800 dark:text-red-200">Equipment-Related Fails:</h4>
                <ul className="text-sm text-red-700 dark:text-elec-yellow space-y-1">
                  <li>• Using damaged or taped-up leads</li>
                  <li>• Using probes with long exposed metal tips</li>
                  <li>• Non-GS38 compliant equipment</li>
                  <li>• Uncalibrated or suspect instruments</li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium text-red-800 dark:text-red-200">Procedure-Related Fails:</h4>
                <ul className="text-sm text-red-700 dark:text-elec-yellow space-y-1">
                  <li>• Failing to prove/re-prove the tester</li>
                  <li>• Holding probes dangerously (fingers over barriers)</li>
                  <li>• Applying incorrect voltage or current range</li>
                  <li>• Working one-handed while holding instruments incorrectly</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-4 bg-red-100 dark:bg-red-900/30 rounded p-3">
              <p className="text-sm text-red-800 dark:text-red-200 font-medium">
                Remember: Any unsafe practice with test equipment will result in immediate assessment termination and failure.
              </p>
            </div>
          </div>
        </Card>

        {/* What the Assessor is Looking For */}
        <Card className="bg-gradient-to-r from-card/20 to-elec-yellow/5 border-elec-yellow/30 mb-8">
          <div className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Target className="w-5 h-5" />
              What the Assessor is Looking For
            </h2>
            
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-4">
                <div className="bg-background/50 rounded-lg p-4">
                  <h4 className="font-medium text-green-600 dark:text-green-400 mb-2 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Equipment Compliance
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• GS38-compliant leads/probes in use</li>
                    <li>• Proper inspection of equipment before use</li>
                    <li>• Appropriate CAT-rated instruments</li>
                    <li>• No damaged or makeshift equipment</li>
                  </ul>
                </div>
                
                <div className="bg-background/50 rounded-lg p-4">
                  <h4 className="font-medium text-elec-yellow dark:text-elec-yellow mb-2 flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Safe Working Practices
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Correct proving sequence demonstrated</li>
                    <li>• Safe hand positions maintained</li>
                    <li>• Methodical approach to testing</li>
                    <li>• Awareness of electrical hazards</li>
                  </ul>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-background/50 rounded-lg p-4">
                  <h4 className="font-medium text-purple-600 dark:text-elec-yellow mb-2 flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    Professional Competence
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Confident handling of instruments</li>
                    <li>• Clear explanation of procedures</li>
                    <li>• Realistic and logical results</li>
                    <li>• Proper documentation of readings</li>
                  </ul>
                </div>
                
                <div className="bg-background/50 rounded-lg p-4">
                  <h4 className="font-medium text-orange-600 dark:text-elec-yellow mb-2 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4" />
                    Assessment Excellence
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Following GN3 procedures exactly</li>
                    <li>• Demonstrating rather than describing</li>
                    <li>• Managing time effectively</li>
                    <li>• Maintaining professionalism throughout</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Practical Guidance */}
        <Card className="bg-card border-elec-yellow/30 mb-8">
          <div className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Wrench className="w-5 h-5" />
              5. Practical Guidance for AM2 Success
            </h2>
            
            <div className="space-y-6">
              <div className="grid md:grid-cols-3 gap-3 sm:gap-4">
                <div className="bg-elec-yellow/5 dark:bg-elec-yellow/10 border border-blue-200 dark:border-blue-800/30 rounded-lg p-4">
                  <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-3">Before You Start:</h4>
                  <ul className="text-sm text-blue-700 dark:text-elec-yellow space-y-1">
                    <li>• Inspect your kit first</li>
                    <li>• Check leads, fuses, and probe tips</li>
                    <li>• Verify calibration dates</li>
                    <li>• Plan your testing sequence</li>
                  </ul>
                </div>
                
                <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30 rounded-lg p-4">
                  <h4 className="font-medium text-green-800 dark:text-green-200 mb-3">During Testing:</h4>
                  <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                    <li>• Always use proving unit or known live source</li>
                    <li>• Hold probes safely behind finger barriers</li>
                    <li>• Explain procedures as you work</li>
                    <li>• Allow readings to stabilise</li>
                  </ul>
                </div>
                
                <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800/30 rounded-lg p-4">
                  <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-3">After Testing:</h4>
                  <ul className="text-sm text-purple-700 dark:text-elec-yellow space-y-1">
                    <li>• Reset to safe mode (voltage)</li>
                    <li>• Switch tester off safely</li>
                    <li>• Store leads properly</li>
                    <li>• Record all results accurately</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/30 rounded-lg p-4">
                <h4 className="font-medium text-amber-800 dark:text-amber-200 mb-3">Key Success Tips:</h4>
                <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1">
                  <li>• Practice test routines - make proving tester and lead checks a habit</li>
                  <li>• Never rush - methodical and safe is better than fast</li>
                  <li>• If readings seem wrong, re-check settings and prove the tester</li>
                  <li>• Communicate with the assessor - explain what you're doing and why</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* Real-World Examples */}
        <Card className="bg-card border-elec-yellow/30 mb-8">
          <div className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Real-World Examples
            </h2>
            
            <div className="space-y-4">
              <div className="border-l-4 border-l-red-500 bg-red-50 dark:bg-red-950/20 p-4">
                <h4 className="font-medium text-red-800 dark:text-red-200 mb-2">Example 1: Non-GS38 Leads</h4>
                <p className="text-sm text-red-700 dark:text-elec-yellow mb-2">
                  Candidate used non-GS38 leads with 20 mm exposed metal. Assessor stopped the test immediately → <strong>Automatic Fail</strong>
                </p>
                <p className="text-xs text-red-600 dark:text-elec-yellow">
                  Lesson: Always check probe tip exposure before starting. Only 2-4mm is acceptable.
                </p>
              </div>
              
              <div className="border-l-4 border-l-red-500 bg-red-50 dark:bg-red-950/20 p-4">
                <h4 className="font-medium text-red-800 dark:text-red-200 mb-2">Example 2: Forgot Re-proving</h4>
                <p className="text-sm text-red-700 dark:text-elec-yellow mb-2">
                  Candidate forgot to re-prove tester after safe isolation sequence. → <strong>Automatic Fail</strong>
                </p>
                <p className="text-xs text-red-600 dark:text-elec-yellow">
                  Lesson: The proving sequence is Prove → Test → Re-prove. All three steps are mandatory.
                </p>
              </div>
              
              <div className="border-l-4 border-green-500 bg-green-50 dark:bg-green-950/20 p-4">
                <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">Example 3: Proper Procedure</h4>
                <p className="text-sm text-green-700 dark:text-green-300 mb-2">
                  Candidate zeroed continuity leads before testing and explained procedure to assessor. → <strong>Full Marks</strong>
                </p>
                <p className="text-xs text-green-600 dark:text-green-400">
                  Lesson: Demonstrating knowledge through proper procedure and clear communication earns top marks.
                </p>
              </div>
              
              <div className="border-l-4 border-elec-yellow bg-yellow-50 dark:bg-yellow-950/20 p-4">
                <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">Example 4: Real-Life Consequence</h4>
                <p className="text-sm text-yellow-700 dark:text-yellow-300 mb-2">
                  In real life, an electrician used a damaged probe, which arced and caused serious burns. Same unsafe practice in AM2 = fail.
                </p>
                <p className="text-xs text-elec-yellow dark:text-elec-yellow">
                  Lesson: GS38 requirements exist to prevent real injuries. Assessors treat safety breaches very seriously.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Section Summary */}
        <Card className="bg-gradient-to-r from-elec-yellow/5 to-card/5 border-elec-yellow/30 mb-8">
          <div className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Section Summary
            </h2>
            
            <div className="space-y-4">
              <div className="bg-background/50 rounded-lg p-4">
                <h4 className="font-medium text-foreground mb-3">Key Takeaways:</h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Safe use of test instruments is non-negotiable in AM2 - GS38 compliance protects lives</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Probes must have shrouded tips (2–4 mm exposed), fused leads, and no damage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Proving sequence is mandatory: Prove → Test → Re-prove (skipping any step = fail)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Assessors observe safe, confident, GS38-compliant use of instruments</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Any unsafe practice with test equipment results in instant assessment failure</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-elec-yellow/10 rounded-lg p-4">
                <h4 className="font-medium text-elec-yellow mb-2">Next Steps:</h4>
                <p className="text-sm text-muted-foreground">
                  You're now ready to move on to Module 4 Section 3, where we'll cover the specific testing procedures 
                  and measurement techniques required for AM2 assessment success.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Quiz Section */}
        <Card className="bg-card border-elec-yellow/30 mb-8">
          <div className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Timer className="w-5 h-5" />
              Test Your Knowledge
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Complete this 10-question quiz to test your understanding of GS38 compliance and safe test instrument use.
            </p>
            <Quiz questions={quizQuestions} title="GS38 Compliance and Test Instrument Safety" />
          </div>
        </Card>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-4 pt-6 sm:pt-8">
          <Button variant="outline" className="w-full sm:w-auto" asChild>
            <Link to="../section1" className="flex items-center justify-center">
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="text-sm sm:text-base">Previous: Test Sequence</span>
            </Link>
          </Button>
          <Button className="w-full sm:w-auto" asChild>
            <Link to="../section3" className="flex items-center justify-center">
              <span className="text-sm sm:text-base">Next: Testing Procedures</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AM2Module4Section2;