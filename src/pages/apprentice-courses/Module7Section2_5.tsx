import { ArrowLeft, ArrowRight, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const Module7Section2_5 = () => {
  useSEO(
    "Incorrect Polarity - Level 2 Module 7 Section 2.5",
    "Understanding polarity faults, risks, testing and correction in electrical installations"
  );

  const quizQuestions = [
    {
      id: 1,
      question: "What does incorrect polarity mean in an electrical installation?",
      options: [
        "The voltage is too high",
        "Line and neutral conductors are reversed or devices connected in wrong conductor",
        "There is no earthing",
        "The current is flowing backwards"
      ],
      correctAnswer: 1,
      explanation: "Incorrect polarity occurs when line and neutral are swapped, or when protective/switching devices are connected in the wrong conductor."
    },
    {
      id: 2,
      question: "What is a common example of incorrect polarity in lighting circuits?",
      options: [
        "Using the wrong cable size",
        "A light switch wired into the neutral conductor instead of the line",
        "Installing too many lights on one circuit",
        "Using the wrong type of bulb"
      ],
      correctAnswer: 1,
      explanation: "A common polarity fault is wiring a light switch into the neutral conductor rather than the line conductor, leaving the lamp holder live when switched off."
    },
    {
      id: 3,
      question: "Give two causes of polarity faults.",
      options: [
        "High voltage and low current",
        "Misidentification of conductors and careless wiring",
        "Too much earthing and insulation",
        "Circuit breakers and fuses"
      ],
      correctAnswer: 1,
      explanation: "Polarity faults are typically caused by misidentification of conductors and careless or rushed wiring during installation."
    },
    {
      id: 4,
      question: "Why is incorrect polarity dangerous even if equipment appears to work?",
      options: [
        "It uses more electricity",
        "It damages the equipment",
        "Equipment may remain live when switched off, creating shock risks",
        "It causes circuit breakers to trip frequently"
      ],
      correctAnswer: 2,
      explanation: "With incorrect polarity, equipment may still function but can remain electrically live when switched off, creating serious shock hazards."
    },
    {
      id: 5,
      question: "What regulation requires correct polarity?",
      options: [
        "Building Regulations Part P",
        "BS 7671 Wiring Regulations",
        "Health and Safety at Work Act",
        "Electricity at Work Regulations"
      ],
      correctAnswer: 1,
      explanation: "BS 7671 (IET Wiring Regulations) requires correct polarity for all electrical installations."
    },
    {
      id: 6,
      question: "True or False: A polarity fault may leave lamp holders live even when switched off.",
      options: [
        "True",
        "False"
      ],
      correctAnswer: 0,
      explanation: "True. If a switch is wired in the neutral instead of the line, the lamp holder remains live even when the switch is off."
    },
    {
      id: 7,
      question: "What tests are used to check polarity?",
      options: [
        "Insulation resistance tests only",
        "Continuity and functional tests",
        "Earth fault loop impedance tests",
        "RCD tests only"
      ],
      correctAnswer: 1,
      explanation: "Polarity is checked using continuity tests and functional tests to confirm correct line, neutral, and earth connections."
    },
    {
      id: 8,
      question: "What should be done if a polarity fault is discovered?",
      options: [
        "Ignore it if equipment works",
        "Add a warning label",
        "Correct the wiring immediately and retest before energising",
        "Reduce the voltage"
      ],
      correctAnswer: 2,
      explanation: "Polarity faults must be corrected immediately by re-terminating conductors correctly, followed by retesting before the circuit is energised."
    },
    {
      id: 9,
      question: "Who is responsible for ensuring polarity is correct before energising?",
      options: [
        "Only the apprentice",
        "The building owner",
        "The qualified electrician carrying out the work",
        "The electrical supplier"
      ],
      correctAnswer: 2,
      explanation: "The qualified electrician carrying out the installation work is responsible for ensuring correct polarity before energising any circuit."
    },
    {
      id: 10,
      question: "In the real-world example, what mistake caused the homeowner to receive a shock?",
      options: [
        "Wrong cable size was used",
        "The switch was wired into the neutral conductor",
        "No earth connection was made",
        "The circuit breaker was faulty"
      ],
      correctAnswer: 1,
      explanation: "The switch was incorrectly wired into the neutral conductor, leaving the lamp holder live even when switched off, causing a shock when changing the bulb."
    }
  ];

  return (
    <div className="min-h-screen bg-[#121212]">
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <Button variant="ghost" className="text-white hover:text-white active:text-white p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Back to Section 2</span>
              <span className="sm:hidden">Back</span>
            </Link>
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-start gap-4">
          <div className="p-2 rounded-lg self-start">
            <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div className="flex-1">
            <Badge variant="outline" className="mb-2 sm:mb-3 border-elec-yellow/30 text-elec-yellow text-xs sm:text-sm">
              Section 7.2.5
            </Badge>
            <h1 className="text-2xl sm:text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
              2.5 Incorrect Polarity
            </h1>
            <p className="text-sm sm:text-base text-white max-w-3xl">
              Understanding polarity faults, risks, testing and correction in electrical installations
            </p>
          </div>
        </div>

        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <CardContent className="p-0">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-4">Introduction</h2>
            <div className="grid gap-4 sm:gap-6 md:grid-cols-2 text-xs sm:text-sm text-white">
              <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-white/10">
                <ul className="list-disc pl-4 space-y-1 sm:space-y-2">
                  <li><strong>Polarity</strong> refers to correct connection of line, neutral, and earth conductors</li>
                  <li>Incorrect polarity creates hidden dangers even when equipment appears to work</li>
                  <li>Common example: switch wired into neutral instead of line conductor</li>
                  <li>Equipment may remain live when switched off, creating shock risks</li>
                  <li>Compliance with BS 7671 requires correct polarity for all installations</li>
                </ul>
              </div>
              
              <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-elec-yellow/30">
                <h3 className="font-medium text-white mb-2">Spot / Use / Check</h3>
                <ul className="list-disc pl-4 space-y-1">
                  <li><strong>Spot:</strong> Equipment works but can shock when switched off; unusual readings</li>
                  <li><strong>Use:</strong> Two-pole voltage indicator, proving unit, plug-in polarity tester</li>
                  <li><strong>Check:</strong> Switch in line conductor, correct L/N/E termination and identification</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <CardContent className="p-0">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-4">Learning Outcomes</h2>
            <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-white">
              <li>Define what incorrect polarity means in electrical installations</li>
              <li>Identify how polarity faults occur</li>
              <li>Recognise the dangers associated with incorrect polarity</li>
              <li>Understand how polarity faults are tested and corrected</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <CardContent className="p-0">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-6">Content</h2>
            
            <div className="border-l-4 border-l-elec-yellow p-4 sm:p-6 rounded-r-lg mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">1</div>
                <h3 className="text-base sm:text-lg font-semibold text-white">Definition of Incorrect Polarity</h3>
              </div>
              
              <p className="text-sm text-white mb-4 leading-relaxed">
                Polarity refers to the correct connection of line, neutral, and earth conductors in a circuit. Incorrect polarity occurs when line and neutral are swapped, or when a protective or switching device is connected in the wrong conductor. A common example is a light switch wired into the neutral conductor instead of the line.
              </p>

              <div className="bg-elec-yellow/5 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800 mb-4">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Key Polarity Requirements:</h4>
                <ul className="text-sm text-blue-700 text-elec-yellow space-y-1">
                  <li>• Single-pole switches and protective devices must be in the line conductor</li>
                  <li>• Edison screw lampholders must have the centre contact connected to line</li>
                  <li>• Socket outlets must have line connected to the correct terminal</li>
                  <li>• All protective and switching devices must interrupt the line conductor</li>
                </ul>
              </div>

              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
                <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">Critical Safety Point:</h4>
                <p className="text-sm text-red-700 text-elec-yellow">
                  With incorrect polarity, equipment may function normally but remain live when switched off, creating unexpected shock hazards during maintenance or bulb changes.
                </p>
              </div>

              <InlineCheck
                id="polarity-definition"
                question="What does incorrect polarity mean in an electrical circuit?"
                options={[
                  "The voltage is too high for the circuit",
                  "Line and neutral conductors are reversed or devices connected in wrong conductor",
                  "There is no earth connection present",
                  "The current is flowing in the wrong direction"
                ]}
                correctIndex={1}
                explanation="Incorrect polarity occurs when line and neutral are swapped, or when switching/protective devices are connected in the wrong conductor."
              />
            </div>

            <Separator className="my-6" />

            <div className="border-l-4 border-l-green-500 p-4 sm:p-6 rounded-r-lg mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">2</div>
                <h3 className="text-base sm:text-lg font-semibold text-white">Causes of Polarity Faults</h3>
              </div>
              
              <p className="text-sm text-white mb-4 leading-relaxed">
                Polarity faults are usually the result of human error during installation. Understanding these causes helps prevent future occurrences:
              </p>

              <div className="grid gap-4 md:grid-cols-2 mb-4">
                <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
                  <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">Installation Errors:</h4>
                  <ul className="text-sm text-orange-700 text-elec-yellow space-y-1">
                    <li>• Misidentification of conductors</li>
                    <li>• Careless or rushed wiring</li>
                    <li>• Poor cable management</li>
                    <li>• Inadequate conductor marking</li>
                  </ul>
                </div>
                
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                  <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">Human Factors:</h4>
                  <ul className="text-sm text-purple-700 text-elec-yellow space-y-1">
                    <li>• Poor training or supervision</li>
                    <li>• Time pressure on installations</li>
                    <li>• Reconnection errors during maintenance</li>
                    <li>• Lack of proper testing procedures</li>
                  </ul>
                </div>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Prevention Strategy:</h4>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  Always use a systematic approach: identify conductors correctly, follow wiring diagrams, apply proper labelling, and conduct thorough testing before energising.
                </p>
              </div>

              <InlineCheck
                id="polarity-causes"
                question="Give two common causes of incorrect polarity faults."
                options={[
                  "High voltage and excessive current flow",
                  "Misidentification of conductors and careless wiring",
                  "Too much insulation and poor earthing",
                  "Faulty circuit breakers and blown fuses"
                ]}
                correctIndex={1}
                explanation="The main causes are misidentification of conductors and careless or rushed wiring during installation or maintenance."
              />
            </div>

            <Separator className="my-6" />

            <div className="border-l-4 border-l-orange-500 p-4 sm:p-6 rounded-r-lg mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">3</div>
                <h3 className="text-base sm:text-lg font-semibold text-white">Risks and Dangers of Incorrect Polarity</h3>
              </div>
              
              <p className="text-sm text-white mb-4 leading-relaxed">
                Incorrect polarity is especially dangerous because the installation may still appear to work. However, the risks include:
              </p>

              <div className="space-y-3 mb-4">
                <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-white">
                  <li><strong>Electric shock risk:</strong> A switched-off appliance may still have live components</li>
                  <li><strong>Inoperative protective devices:</strong> Fuses and breakers may not disconnect the circuit correctly</li>
                  <li><strong>Legal and compliance issues:</strong> BS 7671 requires correct polarity for all installations</li>
                </ul>
              </div>

              <InlineCheck
                id="polarity-dangers"
                question="Why is incorrect polarity considered especially dangerous for users?"
                options={[
                  "It causes equipment to use more electricity",
                  "It makes protective devices trip frequently",
                  "Equipment may appear to work but remain live when switched off",
                  "It causes voltage fluctuations in the supply"
                ]}
                correctIndex={2}
                explanation="Incorrect polarity is dangerous because equipment may function normally but remain electrically live when switched off, creating unexpected shock risks."
              />
            </div>

            <Separator className="my-6" />

            <div className="border-l-4 border-l-purple-500 p-4 sm:p-6 rounded-r-lg mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">4</div>
                <h3 className="text-base sm:text-lg font-semibold text-white">Testing and Correction of Polarity Faults</h3>
              </div>
              
              <p className="text-sm text-white mb-4 leading-relaxed">
                Polarity is checked during initial verification and periodic inspection using continuity and functional tests. Multiple testing methods ensure comprehensive verification:
              </p>

              <div className="grid gap-4 md:grid-cols-2 mb-4">
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                  <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Testing Methods:</h4>
                  <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                    <li>• Plug-in polarity testers for socket outlets</li>
                    <li>• Continuity testing with test meters</li>
                    <li>• Functional testing of switching</li>
                    <li>• Visual inspection of terminations</li>
                  </ul>
                </div>
                
                <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg border border-indigo-200 dark:border-indigo-800">
                  <h4 className="font-semibold text-indigo-800 dark:text-indigo-200 mb-2">Correction Process:</h4>
                  <ul className="text-sm text-indigo-700 dark:text-indigo-300 space-y-1">
                    <li>• Isolate the circuit safely</li>
                    <li>• Re-terminate conductors correctly</li>
                    <li>• Retest the circuit thoroughly</li>
                    <li>• Document the correction</li>
                  </ul>
                </div>
              </div>

              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
                <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">Important:</h4>
                <p className="text-sm text-red-700 text-elec-yellow">
                  Never energise a circuit with suspected polarity faults. All corrections must be verified through retesting before the installation can be considered safe for use.
                </p>
              </div>

              <InlineCheck
                id="polarity-testing"
                question="What type of test can be used to confirm polarity in socket outlets?"
                options={[
                  "Insulation resistance test",
                  "Plug-in polarity tester",
                  "Earth fault loop impedance test",
                  "RCD test"
                ]}
                correctIndex={1}
                explanation="A plug-in polarity tester is a simple and effective way to check that socket outlets are wired with correct polarity."
              />
            </div>
          </CardContent>
        </Card>

        {/* Practical Guidance Section */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <CardContent className="p-0">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-4">Practical Guidance</h2>
            <div className="space-y-3 text-xs sm:text-sm text-white">
              <ul className="list-disc pl-6 space-y-2">
                <li>Always double-check conductor identification before termination</li>
                <li>Test polarity during every new installation, alteration, or inspection</li>
                <li>Never energise a circuit until polarity has been confirmed correct</li>
                <li>Treat polarity faults as urgent — they are never acceptable under BS 7671</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Real-World Example Section */}
        <Card className="mb-6 sm:mb-8 p-0 border border-white/10 overflow-hidden">
          <CardContent className="p-0">
            <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 p-4 sm:p-6 border-b border-white/10">
              <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-2 flex items-center gap-3">
                <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-bold">!</span>
                </div>
                <span>Real-World Case Study: The Hidden Danger</span>
              </h2>
            </div>
            
            <div className="p-4 sm:p-6">
              <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
                <div className="space-y-4">
                  <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
                    <h3 className="font-semibold text-red-800 dark:text-red-200 mb-3 text-sm sm:text-base">The Incident:</h3>
                    <p className="text-xs sm:text-sm text-red-700 text-elec-yellow leading-relaxed">
                      During a domestic lighting installation, an apprentice electrician incorrectly wired a bedroom light switch into the neutral conductor instead of the line. The installation was completed and commissioned without proper polarity testing.
                    </p>
                  </div>
                  
                  <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
                    <h3 className="font-semibold text-orange-800 dark:text-orange-200 mb-3 text-sm sm:text-base">What Happened:</h3>
                    <ul className="text-xs sm:text-sm text-orange-700 text-elec-yellow space-y-1">
                      <li>• Lights operated normally when switched on/off</li>
                      <li>• No immediate signs of fault detected</li>
                      <li>• Homeowner received shock while changing bulb</li>
                      <li>• Lamp holder remained live when "switched off"</li>
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-elec-yellow/5 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-3 text-sm sm:text-base">Investigation Revealed:</h3>
                    <ul className="text-xs sm:text-sm text-blue-700 text-elec-yellow space-y-1">
                      <li>• Switch wired in neutral conductor</li>
                      <li>• Line remained connected to lamp holder</li>
                      <li>• No polarity testing carried out</li>
                      <li>• Poor supervision during installation</li>
                    </ul>
                  </div>
                  
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                    <h3 className="font-semibold text-purple-800 dark:text-purple-200 mb-3 text-sm sm:text-base">Consequences:</h3>
                    <ul className="text-xs sm:text-sm text-purple-700 text-elec-yellow space-y-1">
                      <li>• Minor shock injury to homeowner</li>
                      <li>• Complete rewiring of lighting circuit</li>
                      <li>• Investigation by building control</li>
                      <li>• Professional reputation damage</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 rounded-lg bg-elec-yellow/5 bg-elec-yellow/10 border-l-4 border-elec-yellow">
                <h3 className="font-semibold text-elec-yellow dark:text-elec-yellow mb-3 text-sm sm:text-base">✅ Critical Lessons Learned:</h3>
                <div className="grid gap-3 sm:gap-4 md:grid-cols-2 text-xs sm:text-sm text-elec-yellow text-elec-yellow">
                  <ul className="space-y-1">
                    <li>• Always test polarity before energising</li>
                    <li>• Switches must be in the line conductor</li>
                  </ul>
                  <ul className="space-y-1">
                    <li>• Proper supervision is essential</li>
                    <li>• Functional testing saves lives</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQs Section */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <CardContent className="p-0">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-4">FAQs</h2>
            <div className="space-y-4 text-sm">
              <div>
                <h3 className="font-medium text-white mb-2">Q: Can a circuit still work with incorrect polarity?</h3>
                <p className="text-white">A: Yes, but it will be unsafe, as equipment may remain live when switched off.</p>
              </div>
              <Separator />
              <div>
                <h3 className="font-medium text-white mb-2">Q: How is polarity checked during testing?</h3>
                <p className="text-white">A: By continuity and functional tests to confirm correct line, neutral, and earth connections.</p>
              </div>
              <Separator />
              <div>
                <h3 className="font-medium text-white mb-2">Q: Why must polarity faults always be corrected before energising?</h3>
                <p className="text-white">A: Because they create immediate shock hazards and make protective devices unreliable.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Summary Section */}
        <Card className="mb-6 sm:mb-8 p-0 border border-white/10 overflow-hidden">
          <CardContent className="p-0">
            <div className="bg-gradient-to-r from-elec-yellow/10 to-indigo-500/10 p-4 sm:p-6 border-b border-white/10">
              <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-2 flex items-center gap-3">
                <div className="w-8 h-8 bg-elec-yellow rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <span>Essential Knowledge Recap</span>
              </h2>
            </div>
            
            <div className="p-4 sm:p-6">
              <div className="grid gap-4 sm:gap-6 lg:grid-cols-2 mb-6">
                <div className="space-y-4">
                  <div className="bg-elec-yellow/5 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-3 text-sm sm:text-base">What is Incorrect Polarity?</h3>
                    <p className="text-xs sm:text-sm text-blue-700 text-elec-yellow leading-relaxed">
                      Line and neutral conductors swapped, or switches/protective devices connected in wrong conductor, creating hidden shock hazards.
                    </p>
                  </div>
                  
                  <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
                    <h3 className="font-semibold text-red-800 dark:text-red-200 mb-3 text-sm sm:text-base">Why It&apos;s Dangerous:</h3>
                    <p className="text-xs sm:text-sm text-red-700 text-elec-yellow leading-relaxed">
                      Equipment functions normally but remains live when switched off, creating unexpected shock risks during maintenance.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
                    <h3 className="font-semibold text-orange-800 dark:text-orange-200 mb-3 text-sm sm:text-base">Common Causes:</h3>
                    <p className="text-xs sm:text-sm text-orange-700 text-elec-yellow leading-relaxed">
                      Poor workmanship, misidentification of conductors, rushed installations, and inadequate supervision.
                    </p>
                  </div>
                  
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                    <h3 className="font-semibold text-green-800 dark:text-green-200 mb-3 text-sm sm:text-base">Prevention & Testing:</h3>
                    <p className="text-xs sm:text-sm text-green-700 dark:text-green-300 leading-relaxed">
                      Systematic conductor identification, proper testing procedures, and thorough verification before energising.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 p-4 sm:p-5 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-3 text-sm sm:text-base flex items-center gap-2">
                  <span className="text-base">🔑</span>
                  <span>Key Takeaway for Professionals:</span>
                </h3>
                <p className="text-xs sm:text-sm text-yellow-700 dark:text-yellow-300 leading-relaxed">
                  Incorrect polarity is a "silent killer" - installations appear to work correctly but create life-threatening shock hazards. BS 7671 compliance demands correct polarity, and thorough testing is the only way to ensure safety. Never compromise on polarity verification - lives depend on it.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Quiz questions={quizQuestions} />

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-6">
          <Button variant="outline" className="flex-1 sm:flex-none" asChild>
            <Link to="../2-4" className="flex items-center justify-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Previous: 2.4 Earth Faults</span>
              <span className="sm:hidden">Previous</span>
            </Link>
          </Button>
          <Button className="flex-1 sm:flex-none" asChild>
            <Link to="../2-6" className="flex items-center justify-center gap-2">
              <span className="hidden sm:inline">Next: 2.6 Loose or Poor Connections</span>
              <span className="sm:hidden">Next</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Module7Section2_5;