import { ArrowLeft, ArrowRight, AlertTriangle, CheckCircle, Target, Search, Lightbulb, BookOpen, Wrench, ChevronLeft, ChevronRight, Zap, Eye, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const AM2Module5Section1 = () => {
  useSEO(
    "Typical Faults Set in the AM2 Assessment | AM2 Module 5 Section 1",
    "Master recognition and diagnosis of common electrical faults encountered in AM2 assessments. Learn symptoms, testing methods and what assessors expect."
  );

  const quickCheckQuestions: Array<{
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }> = [
    {
      id: "open-circuit",
      question: "What is the most common symptom of an open circuit fault?",
      options: [
        "Lights dimming",
        "Circuit completely dead, no power at all",
        "RCD tripping",
        "MCB tripping on overload"
      ],
      correctIndex: 1,
      explanation: "Open circuits break the electrical path completely, resulting in no power reaching the load."
    },
    {
      id: "high-resistance",
      question: "Which test would most likely detect a high resistance connection?",
      options: [
        "Insulation resistance test",
        "RCD test",
        "Continuity test showing higher than expected resistance",
        "Polarity test"
      ],
      correctIndex: 2,
      explanation: "High resistance connections show up as unexpectedly high readings during continuity testing."
    },
    {
      id: "short-circuit",
      question: "What happens when you test insulation resistance on a circuit with a short circuit fault?",
      options: [
        "Reading over 1MΩ",
        "Reading close to zero or very low resistance",
        "No reading at all",
        "Meter shows error"
      ],
      correctIndex: 1,
      explanation: "Short circuits provide a direct path between conductors, resulting in very low or zero insulation resistance."
    }
  ];

  const quizQuestions = [
    {
      id: 1,
      question: "What is the most common type of fault deliberately set in AM2 assessments?",
      options: ["High resistance connections", "Open circuit faults", "Short circuit faults", "Earth faults"],
      correctAnswer: 1,
      explanation: "Open circuit faults are most commonly set as they're realistic, safe to create, and easy for assessors to verify."
    },
    {
      id: 2,
      question: "If a circuit shows infinite resistance during insulation testing, what type of fault is likely present?",
      options: ["Short circuit", "Open circuit", "High resistance connection", "Earth fault"],
      correctAnswer: 1,
      explanation: "Open circuits break the path completely, so insulation testing between conductors shows infinite resistance."
    },
    {
      id: 3,
      question: "What would you expect to find during continuity testing on a high resistance connection?",
      options: ["Zero resistance", "Infinite resistance", "Higher than expected resistance reading", "Normal resistance reading"],
      correctAnswer: 2,
      explanation: "High resistance connections show elevated resistance readings during continuity testing."
    },
    {
      id: 4,
      question: "Where are open circuit faults typically introduced in AM2 setups?",
      options: ["Inside consumer units", "At junction boxes or connection points", "Within cables", "At the meter"],
      correctAnswer: 1,
      explanation: "Junction boxes and connection points are the safest and most realistic places to introduce open circuit faults."
    },
    {
      id: 5,
      question: "What is the main symptom of a short circuit fault?",
      options: ["No power to circuit", "Lights dimming", "Protective device operates (MCB trips)", "High resistance readings"],
      correctAnswer: 2,
      explanation: "Short circuits cause excessive current flow, which trips protective devices like MCBs or fuses."
    },
    {
      id: 6,
      question: "During RCD testing, what would indicate a possible earth fault?",
      options: ["RCD operates correctly", "RCD fails to operate", "RCD operates too quickly", "RCD test gives inconsistent results"],
      correctAnswer: 3,
      explanation: "Inconsistent RCD operation or unexpected tripping can indicate earth fault issues."
    },
    {
      id: 7,
      question: "What should you do if you discover a genuine fault during AM2 testing?",
      options: ["Fix it immediately", "Ignore it and continue", "Report it to the assessor", "Mark it as a deliberate fault"],
      correctAnswer: 2,
      explanation: "Any genuine faults discovered must be reported to the assessor immediately for safety."
    },
    {
      id: 8,
      question: "How are high resistance connections typically created in AM2 setups?",
      options: ["Cutting wires", "Loose terminals or poor connections", "Adding resistors", "Using wrong cable sizes"],
      correctAnswer: 1,
      explanation: "Loose terminals or deliberately poor connections create realistic high resistance faults."
    },
    {
      id: 9,
      question: "What's the key difference between open circuit and high resistance faults?",
      options: ["No difference", "Open circuit = no continuity, high resistance = poor continuity", "High resistance affects only live conductors", "Open circuits only occur in neutral conductors"],
      correctAnswer: 1,
      explanation: "Open circuits completely break continuity, while high resistance faults allow current flow but with increased resistance."
    },
    {
      id: 10,
      question: "True or false: All AM2 installations will have exactly one deliberate fault.",
      options: ["True", "False - there may be multiple faults", "True - but only in circuits under test", "False - some may have no faults"],
      correctAnswer: 1,
      explanation: "AM2 installations may contain multiple deliberate faults to thoroughly test diagnostic skills."
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
            <Search className="w-4 h-4" />
            Module 5 – Section 1
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            Typical Faults Set in the AM2 Assessment
          </h1>
          <p className="text-sm sm:text-base text-white mb-6 sm:mb-8 leading-relaxed">
            The AM2 assessment deliberately includes electrical faults that you must identify, test, and document. These aren't random — they're carefully selected realistic faults that electricians encounter in the field.
          </p>
          <p className="text-sm sm:text-base text-white leading-relaxed">
            Understanding common fault types, their symptoms, and appropriate testing methods is essential for AM2 success. Assessors want to see systematic diagnosis, not guesswork.
          </p>
        </div>

        {/* Critical Warning */}
        <Card className="bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 dark:text-elec-yellow mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2 text-sm sm:text-base">
                  CRITICAL: Real vs Deliberate Faults
                </h3>
                <p className="text-xs sm:text-sm text-red-700 dark:text-elec-yellow mb-3 leading-relaxed">
                  If you discover what appears to be a genuine safety fault (not a deliberate test fault), stop work immediately and report it to your assessor. Never assume all faults are deliberate.
                </p>
                <p className="text-xs sm:text-sm text-red-700 dark:text-elec-yellow font-medium leading-relaxed">
                  Your safety assessment skills are being tested — both in finding deliberate faults and recognising genuine hazards.
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
                Identify the most common types of faults set in AM2 assessments
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Recognise symptoms and testing methods for each fault type
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Understand where faults are typically located in test installations
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Apply systematic diagnosis techniques rather than random testing
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Know what assessors expect in fault-finding demonstrations
              </li>
            </ul>
          </div>
        </Card>

        {/* Common Fault Types */}
        <Card className="bg-transparent border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Target className="w-5 h-5" />
              1. Common Fault Types in AM2
            </h2>
            
            <div className="space-y-4">
              <div className="border border-white/10 rounded-lg p-4">
                <h4 className="font-medium text-white mb-3">TOP 4 Fault Categories You Must Know:</h4>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow font-bold">1.</span>
                    <span><strong>Open Circuits:</strong> Complete break in conductor — circuit appears dead</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow font-bold">2.</span>
                    <span><strong>High Resistance Connections:</strong> Poor joints — circuit works but resistance too high</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow font-bold">3.</span>
                    <span><strong>Short Circuits:</strong> Direct L-N or L-E contact — protective devices trip</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow font-bold">4.</span>
                    <span><strong>Polarity Errors:</strong> Incorrect connections — switches in neutral, reversed sockets</span>
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

        {/* Fault Symptoms and Testing */}
        <Card className="bg-transparent border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Eye className="w-5 h-5" />
              2. How to Test for Each Fault Type
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="border border-white/10 rounded-lg p-4">
                <h4 className="font-medium text-white mb-3 text-sm sm:text-base">Open Circuit Testing:</h4>
                <ul className="text-xs sm:text-sm text-white space-y-1">
                  <li>• <strong>Primary test:</strong> Continuity between conductor ends</li>
                  <li>• <strong>Expected result:</strong> Infinite resistance/no reading</li>
                  <li>• <strong>Symptom:</strong> Circuit completely dead, no power</li>
                  <li>• <strong>Location:</strong> Half-split method at junction boxes</li>
                </ul>
              </div>
              
              <div className="border border-white/10 rounded-lg p-4">
                <h4 className="font-medium text-white mb-3 text-sm sm:text-base">High Resistance Testing:</h4>
                <ul className="text-xs sm:text-sm text-white space-y-1">
                  <li>• <strong>Primary test:</strong> Continuity with 200mA current</li>
                  <li>• <strong>Expected result:</strong> Higher than normal resistance</li>
                  <li>• <strong>Symptom:</strong> Circuit works but poor performance</li>
                  <li>• <strong>Also check:</strong> Earth fault loop impedance (Zs)</li>
                </ul>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <div className="border border-white/10 rounded-lg p-4">
                <h4 className="font-medium text-white mb-3 text-sm sm:text-base">Short Circuit Testing:</h4>
                <ul className="text-xs sm:text-sm text-white space-y-1">
                  <li>• <strong>Primary test:</strong> Insulation resistance L-N at 500V</li>
                  <li>• <strong>Expected result:</strong> Very low/zero reading</li>
                  <li>• <strong>Symptom:</strong> MCB trips immediately when energised</li>
                  <li>• <strong>Safety:</strong> Never energise confirmed short circuits</li>
                </ul>
              </div>
              
              <div className="border border-white/10 rounded-lg p-4">
                <h4 className="font-medium text-white mb-3 text-sm sm:text-base">Earth Fault Testing:</h4>
                <ul className="text-xs sm:text-sm text-white space-y-1">
                  <li>• <strong>Primary test:</strong> Insulation resistance L-E and N-E</li>
                  <li>• <strong>Expected result:</strong> Below 1MΩ to earth</li>
                  <li>• <strong>Symptom:</strong> RCD trips when circuit energised</li>
                  <li>• <strong>Also check:</strong> RCD sensitivity and operation time</li>
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

        {/* Advanced Diagnostic Techniques */}
        <Card className="bg-transparent border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5" />
              3. Advanced Fault-Finding Techniques
            </h2>
            
            <div className="space-y-6">
              <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30 rounded-lg p-4">
                <h4 className="font-medium text-green-800 dark:text-green-200 mb-3">The "Half-Split" Method:</h4>
                <p className="text-sm text-green-700 dark:text-green-300 mb-3">
                  The most efficient way to locate faults in long circuits. Start testing at the midpoint, then eliminate half the circuit each time.
                </p>
                <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                  <li>• <strong>Step 1:</strong> Test continuity from origin to circuit midpoint</li>
                  <li>• <strong>Step 2:</strong> If fault present, check first half; if clear, check second half</li>
                  <li>• <strong>Step 3:</strong> Repeat halving process until fault section isolated</li>
                  <li>• <strong>Result:</strong> Locate fault in minimum number of tests</li>
                </ul>
              </div>

              <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/30 rounded-lg p-4">
                <h4 className="font-medium text-amber-800 dark:text-amber-200 mb-3">Visual Inspection Priorities:</h4>
                <p className="text-sm text-amber-700 dark:text-amber-300 mb-3">
                  Before touching test instruments, your eyes are your best diagnostic tool. Look for obvious issues first.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-amber-800 dark:text-amber-200 mb-2">At Outlets:</h5>
                    <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1">
                      <li>• Loose terminal screws</li>
                      <li>• Burned/discoloured terminals</li>
                      <li>• Missing earth connections</li>
                      <li>• Incorrect wire positions</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-amber-800 dark:text-amber-200 mb-2">In Junction Boxes:</h5>
                    <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1">
                      <li>• Disconnected conductors</li>
                      <li>• Poor strip connector joints</li>
                      <li>• Exposed conductors touching</li>
                      <li>• Wrong colour coding</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30 rounded-lg p-4">
                <h4 className="font-medium text-red-800 dark:text-red-200 mb-3">Dangerous Assumptions to Avoid:</h4>
                <ul className="text-sm text-red-700 dark:text-elec-yellow space-y-2">
                  <li>• <strong>Never assume</strong> all circuits are the same — test each individually</li>
                  <li>• <strong>Never assume</strong> cables follow logical routes — physically trace them</li>
                  <li>• <strong>Never assume</strong> colours indicate function — verify with testing</li>
                  <li>• <strong>Never assume</strong> a circuit is dead — always test before working</li>
                  <li>• <strong>Never assume</strong> one fault = no other faults present</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* Real-World Fault Examples */}
        <Card className="bg-transparent border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Wrench className="w-5 h-5" />
              4. Real-World Fault Scenarios
            </h2>
            
            <div className="space-y-4">
              <div className="bg-elec-yellow/5 dark:bg-elec-yellow/10 border border-blue-200 dark:border-blue-800/30 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-3">Scenario 1: "Lighting Circuit Dead"</h4>
                <div className="text-sm text-blue-700 dark:text-elec-yellow space-y-2">
                  <p><strong>Customer complaint:</strong> "Half the downstairs lights stopped working this morning"</p>
                  <p><strong>Your observation:</strong> MCB hasn't tripped, other circuits working normally</p>
                  <p><strong>Likely fault:</strong> Open circuit in lighting final circuit</p>
                  <p><strong>Test approach:</strong> R1+R2 continuity from consumer unit to each light position</p>
                  <p><strong>Common location:</strong> Junction box under floorboards where cable has been damaged</p>
                </div>
              </div>

              <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800/30 rounded-lg p-4">
                <h4 className="font-medium text-orange-800 dark:text-orange-200 mb-3">Scenario 2: "Socket Keeps Tripping RCD"</h4>
                <div className="text-sm text-orange-700 dark:text-elec-yellow space-y-2">
                  <p><strong>Customer complaint:</strong> "RCD trips every time I plug anything into the kitchen socket"</p>
                  <p><strong>Your observation:</strong> RCD operates immediately, other sockets work fine</p>
                  <p><strong>Likely fault:</strong> Earth fault on that socket circuit</p>
                  <p><strong>Test approach:</strong> Insulation resistance L-E and N-E with socket isolated</p>
                  <p><strong>Common cause:</strong> Moisture ingress or damaged cable insulation</p>
                </div>
              </div>

              <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800/30 rounded-lg p-4">
                <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-3">Scenario 3: "Lights Work But Dim"</h4>
                <div className="text-sm text-purple-700 dark:text-elec-yellow space-y-2">
                  <p><strong>Customer complaint:</strong> "Lights come on but they're much dimmer than normal"</p>
                  <p><strong>Your observation:</strong> All lights on circuit affected equally</p>
                  <p><strong>Likely fault:</strong> High resistance in neutral or live conductor</p>
                  <p><strong>Test approach:</strong> Line and neutral continuity tests with 200mA</p>
                  <p><strong>Common cause:</strong> Loose neutral connection in consumer unit or junction box</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Where Faults Are Set */}
        <Card className="bg-transparent border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5" />
              5. Where NET Typically Places Faults
            </h2>
            
            <div className="space-y-4">
              <div className="bg-elec-yellow/5 dark:bg-elec-yellow/10 border border-blue-200 dark:border-blue-800/30 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-3">Most Common Locations:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <ul className="text-sm text-blue-700 dark:text-elec-yellow space-y-2">
                    <li>• <strong>Junction boxes:</strong> Easy assessor access, realistic</li>
                    <li>• <strong>Socket outlets:</strong> Terminal connections visible</li>
                    <li>• <strong>Light fittings:</strong> Switch and rose connections</li>
                  </ul>
                  <ul className="text-sm text-blue-700 dark:text-elec-yellow space-y-2">
                    <li>• <strong>Consumer unit:</strong> MCB and neutral bar connections</li>
                    <li>• <strong>Cooker outlets:</strong> High current connections</li>
                    <li>• <strong>Motor controls:</strong> Stop/start and overload settings</li>
                  </ul>
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

        {/* What Assessors Look For */}
        <Card className="bg-transparent border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Eye className="w-5 h-5" />
              4. What Assessors Look For
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30 rounded-lg p-4">
                <h4 className="font-medium text-green-800 dark:text-green-200 mb-3 text-sm sm:text-base">What Assessors Want to See:</h4>
                <ul className="text-xs sm:text-sm text-green-700 dark:text-green-300 space-y-1">
                  <li>• Systematic testing sequence — no random checking</li>
                  <li>• Clear explanation of each test and its purpose</li>
                  <li>• Proper isolation procedures before all testing</li>
                  <li>• Accurate documentation of all findings</li>
                </ul>
              </div>
              
              <div className="bg-elec-yellow/5 dark:bg-elec-yellow/10 border border-blue-200 dark:border-blue-800/30 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-3 text-sm sm:text-base">Professional Qualities Demonstrated:</h4>
                <ul className="text-xs sm:text-sm text-blue-700 dark:text-elec-yellow space-y-1">
                  <li>• Methodical diagnosis under assessment pressure</li>
                  <li>• Safety prioritised throughout testing</li>
                  <li>• Clear communication of technical findings</li>
                  <li>• Logical reasoning from test results</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* Practical Strategies */}
        <Card className="bg-transparent border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Wrench className="w-5 h-5" />
              5. Practical Fault-Finding Strategy
            </h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800/30 rounded-lg p-4">
                    <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-2 flex items-center gap-2">
                      <Lightbulb className="w-4 h-4" />
                      Systematic Approach
                    </h4>
                    <ul className="text-sm text-purple-700 dark:text-elec-yellow space-y-1">
                      <li><strong>Step 1:</strong> Visual inspection for obvious faults</li>
                      <li><strong>Step 2:</strong> Dead testing in logical sequence</li>
                      <li><strong>Step 3:</strong> Compare results to expected values</li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30 rounded-lg p-4">
                    <h4 className="font-medium text-green-800 dark:text-green-200 mb-2 flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      Communication Strategy
                    </h4>
                    <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                      <li><strong>Explain:</strong> "I'm testing... because..."</li>
                      <li><strong>Report:</strong> "This reading indicates..."</li>
                      <li><strong>Conclude:</strong> "The fault is located..."</li>
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800/30 rounded-lg p-4">
                    <h4 className="font-medium text-orange-800 dark:text-orange-200 mb-2 flex items-center gap-2">
                      <Settings className="w-4 h-4" />
                      Testing Best Practice
                    </h4>
                    <ul className="text-sm text-orange-700 dark:text-elec-yellow space-y-1">
                      <li><strong>Always:</strong> Isolate before testing</li>
                      <li><strong>Use:</strong> Appropriate test instruments</li>
                      <li><strong>Verify:</strong> Test equipment functionality</li>
                    </ul>
                  </div>
                  
                  <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30 rounded-lg p-4">
                    <h4 className="font-medium text-red-800 dark:text-red-200 mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      Common Mistakes
                    </h4>
                    <ul className="text-sm text-red-700 dark:text-elec-yellow space-y-1">
                      <li><strong>Avoid:</strong> Random testing without logic</li>
                      <li><strong>Don't:</strong> Guess fault locations</li>
                      <li><strong>Never:</strong> Compromise safety for speed</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Professional Testing Techniques */}
        <Card className="bg-transparent border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5" />
              6. Professional Testing Techniques
            </h2>
            
            <div className="space-y-6">
              <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30 rounded-lg p-4">
                <h4 className="font-medium text-green-800 dark:text-green-200 mb-3">Test Equipment Mastery:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-green-800 dark:text-green-200 mb-2">Continuity Testing:</h5>
                    <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                      <li>• Use 200mA test current for accurate results</li>
                      <li>• Always null test leads first</li>
                      <li>• Test from origin to each point individually</li>
                      <li>• Record actual Ω readings, not just pass/fail</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-green-800 dark:text-green-200 mb-2">Safe Isolation:</h5>
                    <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                      <li>• Test-Prove-Test sequence essential</li>
                      <li>• Two-pole voltage testing L-N and L-E</li>
                      <li>• GS38 compliant test probes</li>
                      <li>• Lock-off isolation points when possible</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-elec-yellow/5 dark:bg-elec-yellow/10 border border-blue-200 dark:border-blue-800/30 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-3">Industry-Standard Approach:</h4>
                <p className="text-sm text-blue-700 dark:text-elec-yellow mb-3">
                  Professional electricians follow this systematic sequence for any fault-finding scenario:
                </p>
                <ol className="text-sm text-blue-700 dark:text-elec-yellow space-y-1">
                  <li><strong>1. Visual inspection</strong> — Check obvious issues first (finds 70% of faults)</li>
                  <li><strong>2. Safe isolation</strong> — Proper isolation and proving procedures</li>
                  <li><strong>3. Dead testing</strong> — Continuity and insulation resistance</li>
                  <li><strong>4. Live testing</strong> — Only when circuits proven safe</li>
                  <li><strong>5. Documentation</strong> — Record results as you test</li>
                </ol>
              </div>

              <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/30 rounded-lg p-4">
                <h4 className="font-medium text-amber-800 dark:text-amber-200 mb-3">Time Management in Professional Practice:</h4>
                <div className="text-sm text-amber-700 dark:text-amber-300 space-y-2">
                  <p><strong>Why speed matters:</strong> In commercial work, downtime costs money. Quick, accurate diagnosis is a valuable skill.</p>
                  <ul className="space-y-1">
                    <li>• Visual inspection: 5-10 minutes maximum</li>
                    <li>• Dead testing: Focus on most likely fault types first</li>
                    <li>• Document as you go: Don't leave paperwork to the end</li>
                    <li>• Communicate progress: Keep customers/supervisors informed</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Real-World Application */}
        <Card className="bg-transparent border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Wrench className="w-5 h-5" />
              7. From AM2 to Professional Success
            </h2>
            
            <div className="space-y-6">
              <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30 rounded-lg p-4">
                <h4 className="font-medium text-red-800 dark:text-red-200 mb-3">Career Development Value:</h4>
                <p className="text-sm text-red-700 dark:text-elec-yellow mb-3">
                  Your fault-finding reputation will make or break your electrical career. Customers remember electricians who:
                </p>
                <ul className="text-sm text-red-700 dark:text-elec-yellow space-y-1">
                  <li>• Find faults quickly without unnecessary work</li>
                  <li>• Explain problems clearly to non-technical customers</li>
                  <li>• Provide proper documentation and test certificates</li>
                  <li>• Identify potential safety issues before they become dangerous</li>
                  <li>• Work systematically and leave no mess</li>
                </ul>
              </div>

              <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800/30 rounded-lg p-4">
                <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-3">Common Real-World Scenarios:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-purple-800 dark:text-purple-200 mb-2">Domestic Faults:</h5>
                    <ul className="text-sm text-purple-700 dark:text-elec-yellow space-y-1">
                      <li>• DIY work with poor connections</li>
                      <li>• Rodent damage in roof spaces</li>
                      <li>• Moisture ingress causing earth faults</li>
                      <li>• Appliance faults affecting circuits</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-purple-800 dark:text-purple-200 mb-2">Commercial Faults:</h5>
                    <ul className="text-sm text-purple-700 dark:text-elec-yellow space-y-1">
                      <li>• Overloaded circuits from equipment changes</li>
                      <li>• Environmental damage (heat, dust, chemicals)</li>
                      <li>• Mechanical damage from building work</li>
                      <li>• Aging infrastructure reaching end of life</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30 rounded-lg p-4">
                <h4 className="font-medium text-green-800 dark:text-green-200 mb-3">Building Your Professional Toolkit:</h4>
                <p className="text-sm text-green-700 dark:text-green-300 mb-3">
                  Beyond AM2, these skills become your daily toolkit:
                </p>
                <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                  <li>• <strong>Insurance protection:</strong> Proper testing and documentation protects against liability claims</li>
                  <li>• <strong>Legal compliance:</strong> BS7671 requires specific testing procedures — not optional</li>
                  <li>• <strong>Customer confidence:</strong> Systematic approach demonstrates professionalism</li>
                  <li>• <strong>Efficiency gains:</strong> Faster diagnosis = more profitable jobs</li>
                  <li>• <strong>Safety culture:</strong> Proper procedures protect you and others</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* Summary */}
        <Card className="bg-transparent border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              8. Section Summary: AM2 Fault-Finding Success
            </h2>
            
            <div className="bg-elec-yellow/5 dark:bg-elec-yellow/10 border border-blue-200 dark:border-blue-800/30 rounded-lg p-4 mb-4">
              <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-3">Key Takeaways:</h4>
              <ul className="text-sm text-blue-700 dark:text-elec-yellow space-y-1">
                <li>• Most AM2 faults are open circuits — complete breaks in continuity</li>
                <li>• High resistance connections show as elevated resistance readings</li>
                <li>• Short circuits cause protective devices to operate immediately</li>
                <li>• Earth faults affect RCD operation and show low insulation to earth</li>
                <li>• Systematic approach and clear communication are as important as technical skills</li>
              </ul>
            </div>
            
            <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800/30 rounded-lg p-4">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-3">Remember:</h4>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                Fault-finding in AM2 demonstrates your professional competence. Assessors want to see safe, systematic diagnosis — the same skills you'll use as a qualified electrician.
              </p>
            </div>
          </div>
        </Card>

        {/* Quiz Section */}
        <div className="border-t border-white/10 pt-8">
          <Quiz 
            title="Test Your Knowledge: AM2 Fault Types"
            questions={quizQuestions}
          />
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-white/10">
          <Button variant="outline" className="w-full sm:w-auto" asChild>
            <Link to="../section6">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous: Time Management
            </Link>
          </Button>
          <Button className="w-full sm:w-auto" asChild>
            <Link to="../section2">
              Next: Fault-Finding Techniques
              <ChevronRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AM2Module5Section1;