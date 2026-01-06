import { ArrowLeft, ArrowRight, Clock, BookOpen, AlertTriangle, Lightbulb, Zap, TestTube2, CircuitBoard, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const AM2Module3Section3 = () => {
  useSEO(
    "Lighting Circuits - One-Way, Two-Way, Intermediate | AM2 Module 3 Section 3",
    "Master lighting circuit installation for AM2 assessment - one-way, two-way, and intermediate switching with professional workmanship standards"
  );

  const quickCheckQuestions: Array<{
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }> = [
    {
      id: "one-way-switching",
      question: "In one-way switching, what happens to the neutral wire?",
      options: [
        "It goes directly to the fitting only",
        "It links through the switch to the fitting",
        "It bypasses the switch and goes straight to the fitting",
        "It's not required for one-way switching"
      ],
      correctIndex: 2,
      explanation: "The neutral bypasses the switch completely and goes directly to the light fitting. Only the live conductor is switched in one-way switching."
    },
    {
      id: "two-way-wiring",
      question: "What cable is typically used for two-way strapper connections?",
      options: [
        "Single core cable",
        "Twin & earth cable", 
        "Three-core and earth cable",
        "Two separate single cables"
      ],
      correctIndex: 2,
      explanation: "Three-core and earth cable is used between two-way switches to provide the two strapper connections (L1 and L2) plus the common."
    },
    {
      id: "intermediate-switching",
      question: "What makes intermediate switching different from two-way?",
      options: [
        "It uses a different type of cable",
        "It has four terminals instead of three",
        "It can control from unlimited positions",
        "It requires a special MCB"
      ],
      correctIndex: 1,
      explanation: "Intermediate switches have four terminals (two in, two out) allowing them to be inserted between two-way switches to provide switching from additional positions."
    }
  ];

  const quizQuestions = [
    {
      id: 1,
      question: "What cable size is typically used for lighting circuits in AM2?",
      options: ["1.0mm²", "1.5mm²", "2.5mm²", "4.0mm²"],
      correctAnswer: 1,
      explanation: "Lighting circuits typically use 1.5mm² twin & earth cable with 6A or 10A MCB protection in AM2 assessments."
    },
    {
      id: 2,
      question: "In one-way switching, which wire is actually switched?",
      options: ["Neutral wire", "Earth wire", "Live wire", "All wires"],
      correctAnswer: 2,
      explanation: "Only the live wire is switched in one-way switching. The neutral goes directly to the fitting, bypassing the switch."
    },
    {
      id: 3,
      question: "What happens if strappers are connected incorrectly in two-way switching?",
      options: [
        "The circuit works normally",
        "One switch position won't work",
        "The MCB will trip",
        "It creates a short circuit"
      ],
      correctAnswer: 1,
      explanation: "Incorrect strapper connections mean the switches can't communicate properly, resulting in one switch position being ineffective."
    },
    {
      id: 4,
      question: "How many terminals does an intermediate switch have?",
      options: ["2 terminals", "3 terminals", "4 terminals", "6 terminals"],
      correctAnswer: 2,
      explanation: "Intermediate switches have 4 terminals (numbered 1, 2, 3, 4) to allow crossing of the strapper connections when operated."
    },
    {
      id: 5,
      question: "What cable type is used between two-way switches?",
      options: ["Single core cable", "Twin & earth cable", "3-core & earth cable", "Flex cable"],
      correctAnswer: 2,
      explanation: "3-core & earth cable is required between two-way switches to provide the two strapper connections (L1 and L2) plus earth continuity."
    },
    {
      id: 6,
      question: "Which conductor requires brown sleeving when used as a switched live?",
      options: ["Brown conductor", "Blue conductor", "Green/yellow conductor", "Black conductor"],
      correctAnswer: 1,
      explanation: "When a blue conductor is used as a switched live (rather than neutral), it must be identified with brown sleeving at both ends."
    },
    {
      id: 7,
      question: "What is the minimum insulation resistance required for lighting circuits?",
      options: ["0.5MΩ", "1MΩ", "2MΩ", "5MΩ"],
      correctAnswer: 1,
      explanation: "BS7671 requires a minimum insulation resistance of 1MΩ between live conductors when tested at 500V DC for low voltage circuits."
    },
    {
      id: 8,
      question: "In intermediate switching, what happens when the intermediate switch is operated?",
      options: [
        "It breaks the circuit completely",
        "It crosses the internal connections",
        "It adds an extra live feed",
        "It isolates the earth connection"
      ],
      correctAnswer: 1,
      explanation: "When operated, the intermediate switch crosses its internal connections (1→4, 2→3 instead of 1→3, 2→4), changing the circuit state."
    },
    {
      id: 9,
      question: "What is the most common cause of two-way switching circuits not working properly?",
      options: [
        "Wrong cable size used",
        "MCB rating too high", 
        "Strappers connected to wrong terminals",
        "Neutral wire broken"
      ],
      correctAnswer: 2,
      explanation: "Incorrect strapper connections (L1 and L2 mixed up) is the most common fault, resulting in the light not responding to one of the switches."
    },
    {
      id: 10,
      question: "Where must the neutral conductor go in all switching arrangements?",
      options: [
        "Through all switch terminals",
        "Through the first switch only",
        "Direct to the light fitting, bypassing switches",
        "To earth terminal in each switch"
      ],
      correctAnswer: 2,
      explanation: "The neutral conductor must always go directly to the light fitting, bypassing all switches. Only the live conductor is switched."
    }
  ];

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Header */}
      <div className="border-b border-white/10 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="min-h-[44px] px-3 -ml-3 text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 3
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">
        {/* Title Section */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-elec-yellow/10 text-elec-yellow text-sm font-medium rounded-full mb-4">
            <Lightbulb className="w-4 h-4" />
            Module 3 – Section 3
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Lighting Circuits – One-Way, Two-Way, Intermediate
          </h1>
          <p className="text-base text-white mb-8 leading-relaxed">
            Master lighting circuit installation for AM2 assessment - one-way, two-way, and intermediate switching with professional workmanship standards.
          </p>
        </div>

        {/* Critical Warning */}
        <Card className="bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800/30 mb-8">
          <div className="p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 dark:text-elec-yellow mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2">
                  CRITICAL: Lighting Circuits Foundation for AM2 Success
                </h3>
                <p className="text-sm text-red-700 dark:text-elec-yellow mb-3">
                  Lighting circuits are fundamental to AM2 assessment. While they may seem simpler than power circuits, candidates frequently lose marks on conductor identification, poor workmanship, and incorrect switching arrangements. The assessor will check every connection, termination, and test result.
                </p>
                <p className="text-sm text-red-700 dark:text-elec-yellow font-medium">
                  Rushed work or poor understanding of switching principles leads to failure. Master the basics here - they're the foundation for everything else.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Learning Outcomes */}
        <Card className="bg-transparent border-elec-yellow/30 mb-8">
          <div className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Learning Outcomes
            </h2>
            <p className="text-sm text-white mb-4">
              By the end of this section, you should be able to:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-white">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Install one-way, two-way, and intermediate lighting circuits as per AM2 drawings and specifications
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Correctly identify and terminate all conductors with appropriate sleeving
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Wire switches and ceiling roses with professional workmanship standards
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Carry out required electrical tests before energisation according to NET standards
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Understand common candidate errors and how to avoid them
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Demonstrate safe working practices and systematic fault-finding techniques
              </li>
            </ul>
          </div>
        </Card>

        {/* One-Way Switching */}
        <Card className="bg-transparent border-elec-yellow/30 mb-8">
          <div className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5" />
              1. One-Way Switching - Complete Installation Guide
            </h2>
            

            {/* Detailed Step-by-Step Installation */}
            <div>
              <h3 className="font-medium text-white mb-3">Detailed Installation Steps</h3>
              <div className="space-y-4">
                <div className="border border-white/10 rounded-lg p-4">
                  <h4 className="font-medium text-elec-yellow mb-2">Phase 1: Cable Installation & Preparation</h4>
                  <ol className="space-y-2 text-sm text-white">
                    <li className="flex gap-2">
                      <span className="font-medium text-elec-yellow min-w-[20px]">1.</span>
                      <div>
                        <strong>Route cable from consumer unit to switch position</strong>
                        <p className="text-xs mt-1">Use 1.5mm² twin & earth cable. Ensure adequate support every 300mm horizontally, 400mm vertically. Cable must be mechanically protected where required.</p>
                      </div>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-medium text-elec-yellow min-w-[20px]">2.</span>
                      <div>
                        <strong>Continue cable from switch to ceiling rose</strong>
                        <p className="text-xs mt-1">Maintain cable integrity. No joints in inaccessible areas. Use proper cable entry methods into back boxes and ceiling roses.</p>
                      </div>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-medium text-elec-yellow min-w-[20px]">3.</span>
                      <div>
                        <strong>Strip cable ends - Switch: 15mm, Ceiling rose: 20mm</strong>
                        <p className="text-xs mt-1">Use proper cable strippers. No damage to conductor cores. Remove exactly the right amount of sheath - too much exposes cable, too little prevents proper termination.</p>
                      </div>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-medium text-elec-yellow min-w-[20px]">4.</span>
                      <div>
                        <strong>Apply green/yellow sleeving to CPC at both ends</strong>
                        <p className="text-xs mt-1">Sleeving must cover all exposed copper CPC. Ensure sleeving doesn't interfere with terminations.</p>
                      </div>
                    </li>
                  </ol>
                </div>

                <div className="border border-white/10 rounded-lg p-4">
                  <h4 className="font-medium text-elec-yellow mb-2">Phase 2: Switch Connections</h4>
                  <ol className="space-y-2 text-sm text-white" start={5}>
                    <li className="flex gap-2">
                      <span className="font-medium text-elec-yellow min-w-[20px]">5.</span>
                      <div>
                        <strong>Connect live feed (brown) to COM terminal</strong>
                        <p className="text-xs mt-1">This is the permanent live from the consumer unit. Ensure tight connection with no exposed copper outside terminal.</p>
                      </div>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-medium text-elec-yellow min-w-[20px]">6.</span>
                      <div>
                        <strong>Connect switched live (brown) to L1 terminal</strong>
                        <p className="text-xs mt-1">This feeds the light fitting when switch is closed. Apply brown identification sleeve if using different coloured conductor.</p>
                      </div>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-medium text-elec-yellow min-w-[20px]">7.</span>
                      <div>
                        <strong>Secure neutral and CPC in back box connector block</strong>
                        <p className="text-xs mt-1">Neutral and CPC bypass the switch. Use proper connector block rated for the application. No joints in switch back box if possible.</p>
                      </div>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-medium text-elec-yellow min-w-[20px]">8.</span>
                      <div>
                        <strong>Secure switch to back box with correct screws</strong>
                        <p className="text-xs mt-1">Switch must be level and flush. Cable must not be trapped. Ensure switch operates smoothly.</p>
                      </div>
                    </li>
                  </ol>
                </div>
              </div>
            </div>

            {/* Common Mistakes */}
            <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30 rounded-lg p-4 mt-6">
              <h3 className="font-medium text-red-800 dark:text-red-200 mb-2">Common Installation Errors</h3>
              <ul className="space-y-1 text-sm text-red-700 dark:text-elec-yellow">
                <li>❌ <strong>Switching neutral instead of live</strong> - Creates dangerous live circuit when "off"</li>
                <li>❌ <strong>Poor conductor identification</strong> - Confusion during testing and future maintenance</li>
                <li>❌ <strong>Loose terminations</strong> - Arcing, overheating, fire risk</li>
                <li>❌ <strong>Exposed copper at terminals</strong> - Risk of short circuit and electrocution</li>
                <li>❌ <strong>CPC not sleeved</strong> - Identification failure, doesn't meet BS7671</li>
                <li>❌ <strong>Cable damaged during installation</strong> - Insulation resistance failure</li>
              </ul>
            </div>
            
            <div className="bg-transparent border border-elec-yellow/20 rounded-lg p-4 mt-6">
              <p className="text-sm text-white">
                <strong>Key Point:</strong> In one-way switching, only the live conductor is switched. The neutral must go directly to the fitting, not through the switch terminals.
              </p>
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

        {/* Two-Way Switching */}
        <Card className="bg-transparent border-elec-yellow/30 mb-8">
          <div className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5" />
              2. Two-Way Switching - Complete Installation Guide
            </h2>
            

            {/* Detailed Installation Steps */}
            <div>
              <h3 className="font-medium text-white mb-3">Complete Installation Process</h3>
              <div className="space-y-4">
                <div className="border border-white/10 rounded-lg p-4">
                  <h4 className="font-medium text-elec-yellow mb-2">Phase 1: Cable Installation & Planning</h4>
                  <ol className="space-y-2 text-sm text-white">
                    <li className="flex gap-2">
                      <span className="font-medium text-elec-yellow min-w-[20px]">1.</span>
                      <div>
                        <strong>Install 1.5mm² T&E from consumer unit to Switch 1 position</strong>
                        <p className="text-xs mt-1">This carries the permanent live feed. Ensure proper cable support and protection throughout run.</p>
                      </div>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-medium text-elec-yellow min-w-[20px]">2.</span>
                      <div>
                        <strong>Install 1.5mm² 3-core & earth from Switch 1 to Switch 2</strong>
                        <p className="text-xs mt-1">Critical cable - carries the two strappers. Plan route carefully to avoid damage. This cable enables the two-way switching function.</p>
                      </div>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-medium text-elec-yellow min-w-[20px]">3.</span>
                      <div>
                        <strong>Install 1.5mm² T&E from Switch 2 to light fitting</strong>
                        <p className="text-xs mt-1">Carries switched live to fitting. Neutral continues from Switch 1 position through connector blocks.</p>
                      </div>
                    </li>
                  </ol>
                </div>

                <div className="border border-white/10 rounded-lg p-4">
                  <h4 className="font-medium text-elec-yellow mb-2">Phase 2: Switch 1 Connections (Feed Point)</h4>
                  <ol className="space-y-2 text-sm text-white" start={4}>
                    <li className="flex gap-2">
                      <span className="font-medium text-elec-yellow min-w-[20px]">4.</span>
                      <div>
                        <strong>Connect permanent live (brown) to COM terminal</strong>
                        <p className="text-xs mt-1">This is the live feed from the consumer unit. Ensure maximum contact area and tight connection.</p>
                      </div>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-medium text-elec-yellow min-w-[20px]">5.</span>
                      <div>
                        <strong>Connect first strapper to L1 terminal</strong>
                        <p className="text-xs mt-1">Use brown-sleeved conductor from 3-core cable. This will connect to L1 on Switch 2.</p>
                      </div>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-medium text-elec-yellow min-w-[20px]">6.</span>
                      <div>
                        <strong>Connect second strapper to L2 terminal</strong>
                        <p className="text-xs mt-1">Use black-sleeved conductor from 3-core cable. This will connect to L2 on Switch 2.</p>
                      </div>
                    </li>
                  </ol>
                </div>

                <div className="border border-white/10 rounded-lg p-4">
                  <h4 className="font-medium text-elec-yellow mb-2">Phase 3: Switch 2 Connections (Load Point)</h4>
                  <ol className="space-y-2 text-sm text-white" start={7}>
                    <li className="flex gap-2">
                      <span className="font-medium text-elec-yellow min-w-[20px]">7.</span>
                      <div>
                        <strong>Connect switched live (to light) to COM terminal</strong>
                        <p className="text-xs mt-1">This feeds the light fitting. When either switch position allows continuity through strappers, light will operate.</p>
                      </div>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-medium text-elec-yellow min-w-[20px]">8.</span>
                      <div>
                        <strong>Connect first strapper from Switch 1 to L1</strong>
                        <p className="text-xs mt-1">Match the conductor sleeving - brown to brown, maintaining consistent identification.</p>
                      </div>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-medium text-elec-yellow min-w-[20px]">9.</span>
                      <div>
                        <strong>Connect second strapper from Switch 1 to L2</strong>
                        <p className="text-xs mt-1">Match the conductor sleeving - black to black. These connections complete the strapper circuit.</p>
                      </div>
                    </li>
                  </ol>
                </div>
              </div>
            </div>

            {/* Critical Errors */}
            <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30 rounded-lg p-4 mt-6">
              <h3 className="font-medium text-red-800 dark:text-red-200 mb-2">Critical Two-Way Switching Errors</h3>
              <ul className="space-y-1 text-sm text-red-700 dark:text-elec-yellow">
                <li>❌ <strong>Incorrect strapper connections</strong> - Light operates from one switch only</li>
                <li>❌ <strong>Using wrong cable types</strong> - Twin & earth instead of 3-core between switches</li>
                <li>❌ <strong>Poor conductor identification</strong> - Confusion about which strapper is which</li>
                <li>❌ <strong>Neutral through switch terminals</strong> - Dangerous and incorrect practice</li>
                <li>❌ <strong>CPC not continuous</strong> - Safety regulation failure</li>
                <li>❌ <strong>Mixed up COM terminals</strong> - Circuit completely non-functional</li>
              </ul>
            </div>
            
            <div className="bg-transparent border border-amber-500/20 rounded-lg p-4 mt-6">
              <p className="text-sm text-white">
                <strong>Common Error:</strong> Swapping L1 and L2 connections means one switch position won't work. Always check both switches operate the light in both positions.
              </p>
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

        {/* Intermediate Switching */}
        <Card className="bg-transparent border-elec-yellow/30 mb-8">
          <div className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <CircuitBoard className="w-5 h-5" />
              3. Intermediate Switching - Complete Installation Guide
            </h2>


            {/* Detailed Installation Steps */}
            <div>
              <h3 className="font-medium text-white mb-3">Complete Installation Process</h3>
              <div className="space-y-4">
                <div className="border border-white/10 rounded-lg p-4">
                  <h4 className="font-medium text-elec-yellow mb-2">Phase 1: Circuit Planning</h4>
                  <ol className="space-y-2 text-sm text-white">
                    <li className="flex gap-2">
                      <span className="font-medium text-elec-yellow min-w-[20px]">1.</span>
                      <div>
                        <strong>Install first two-way switch exactly as in two-way switching</strong>
                        <p className="text-xs mt-1">This receives the live feed and sends out the two strappers. Install and wire completely before adding intermediate.</p>
                      </div>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-medium text-elec-yellow min-w-[20px]">2.</span>
                      <div>
                        <strong>Run 3-core & earth from first two-way to intermediate switch</strong>
                        <p className="text-xs mt-1">Carries the two strappers from first switch. Plan cable route to avoid damage.</p>
                      </div>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-medium text-elec-yellow min-w-[20px]">3.</span>
                      <div>
                        <strong>Run 3-core & earth from intermediate to final two-way switch</strong>
                        <p className="text-xs mt-1">Carries modified strapper signals to final switch. Multiple intermediates can be chained.</p>
                      </div>
                    </li>
                  </ol>
                </div>

                <div className="border border-white/10 rounded-lg p-4">
                  <h4 className="font-medium text-elec-yellow mb-2">Phase 2: Intermediate Switch Connections</h4>
                  <ol className="space-y-2 text-sm text-white" start={4}>
                    <li className="flex gap-2">
                      <span className="font-medium text-elec-yellow min-w-[20px]">4.</span>
                      <div>
                        <strong>Connect first strapper from Switch 1 to Terminal 1</strong>
                        <p className="text-xs mt-1">Input from L1 of first two-way switch. Maintains brown identification sleeving.</p>
                      </div>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-medium text-elec-yellow min-w-[20px]">5.</span>
                      <div>
                        <strong>Connect second strapper from Switch 1 to Terminal 2</strong>
                        <p className="text-xs mt-1">Input from L2 of first two-way switch. Maintains black identification sleeving.</p>
                      </div>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-medium text-elec-yellow min-w-[20px]">6.</span>
                      <div>
                        <strong>Connect first strapper to Switch 2 from Terminal 3</strong>
                        <p className="text-xs mt-1">Output to L1 of final two-way switch. Apply appropriate identification sleeving.</p>
                      </div>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-medium text-elec-yellow min-w-[20px]">7.</span>
                      <div>
                        <strong>Connect second strapper to Switch 2 from Terminal 4</strong>
                        <p className="text-xs mt-1">Output to L2 of final two-way switch. Complete strapper circuit through intermediate.</p>
                      </div>
                    </li>
                  </ol>
                </div>

                <div className="border border-white/10 rounded-lg p-4">
                  <h4 className="font-medium text-elec-yellow mb-2">Phase 3: Final Two-Way Switch</h4>
                  <ol className="space-y-2 text-sm text-white" start={8}>
                    <li className="flex gap-2">
                      <span className="font-medium text-elec-yellow min-w-[20px]">8.</span>
                      <div>
                        <strong>Wire final two-way switch COM to light fitting</strong>
                        <p className="text-xs mt-1">This provides the switched live output when circuit continuity is established.</p>
                      </div>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-medium text-elec-yellow min-w-[20px]">9.</span>
                      <div>
                        <strong>Connect L1 and L2 to strappers from intermediate</strong>
                        <p className="text-xs mt-1">Complete the switching circuit. Maintain consistent conductor identification throughout.</p>
                      </div>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-medium text-elec-yellow min-w-[20px]">10.</span>
                      <div>
                        <strong>Ensure neutral and CPC continuity throughout circuit</strong>
                        <p className="text-xs mt-1">These bypass all switches and must maintain continuity from source to light fitting.</p>
                      </div>
                    </li>
                  </ol>
                </div>
              </div>
            </div>

            {/* How It Works */}
            <div className="bg-[#1a1a1a]/50 p-4 rounded-lg mt-6">
              <h3 className="font-medium text-white mb-3">How Intermediate Switching Works</h3>
              <div className="space-y-3 text-sm text-white">
                <p>
                  <strong>Internal Crossing:</strong> The intermediate switch internally crosses its connections when operated. This allows it to "reverse" the strapper signals between the two-way switches.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-elec-yellow text-xs mb-2">Normal Position</h4>
                    <p className="text-xs">Terminal 1 → Terminal 3, Terminal 2 → Terminal 4. Strappers pass through unchanged.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-elec-yellow text-xs mb-2">Operated Position</h4>
                    <p className="text-xs">Terminal 1 → Terminal 4, Terminal 2 → Terminal 3. Strappers are crossed, changing circuit state.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Critical Points */}
            <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30 rounded-lg p-4 mt-6">
              <h3 className="font-medium text-red-800 dark:text-red-200 mb-2">Critical Installation Points</h3>
              <ul className="space-y-1 text-sm text-red-700 dark:text-elec-yellow">
                <li>❌ <strong>Wrong terminal connections</strong> - Circuit won't work from all positions</li>
                <li>❌ <strong>Poor strapper identification</strong> - Impossible to trace faults</li>
                <li>❌ <strong>Using 4-core cable</strong> - Not required, wastes conductor</li>
                <li>❌ <strong>Neutral through intermediate</strong> - Bypass all switches completely</li>
                <li>❌ <strong>Inconsistent sleeving</strong> - Testing and maintenance difficulties</li>
              </ul>
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

        {/* Testing Requirements */}
        <Card className="bg-transparent border-elec-yellow/30 mb-8">
          <div className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <TestTube2 className="w-5 h-5" />
              Testing and Verification
            </h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-white mb-2">Required Tests Before Energisation</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-[#1a1a1a]/50 p-4 rounded-lg">
                    <h4 className="font-medium text-elec-yellow mb-2">Continuity Tests</h4>
                    <ul className="space-y-1 text-sm text-white">
                      <li>• Protective conductor continuity</li>
                      <li>• Ring final circuit continuity (if applicable)</li>
                      <li>• Switched live continuity in all switch positions</li>
                      <li>• Neutral conductor continuity</li>
                    </ul>
                  </div>
                  <div className="bg-[#1a1a1a]/50 p-4 rounded-lg">
                    <h4 className="font-medium text-elec-yellow mb-2">Other Required Tests</h4>
                    <ul className="space-y-1 text-sm text-white">
                      <li>• Insulation resistance (≥1MΩ)</li>
                      <li>• Polarity at all relevant points</li>
                      <li>• Earth fault loop impedance</li>
                      <li>• RCD operation (if applicable)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-transparent border border-amber-500/20 rounded-lg p-4">
                <h3 className="font-medium text-amber-800 dark:text-amber-200 mb-2">Testing Sequence for Lighting Circuits</h3>
                <ol className="space-y-1 text-sm text-amber-700 dark:text-amber-300">
                  <li>1. Visual inspection - Check all connections, sleeving, mechanical security</li>
                  <li>2. Continuity of protective conductors</li>
                  <li>3. Continuity of ring final circuit conductors (if applicable)</li>
                  <li>4. Insulation resistance between conductors</li>
                  <li>5. Polarity testing - Ensure switch breaks live, not neutral</li>
                  <li>6. Earth fault loop impedance (after energisation)</li>
                  <li>7. Functional testing - All switches operate light correctly</li>
                </ol>
              </div>
            </div>
          </div>
        </Card>

        {/* Assessment Tips */}
        <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700/50 mb-8">
          <div className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-green-700 dark:text-green-300 mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              AM2 Assessment Tips
            </h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-green-700 dark:text-green-300 mb-2">Time Management</h3>
                <ul className="space-y-1 text-sm text-green-600 dark:text-green-400">
                  <li>• Plan cable routes before starting installation</li>
                  <li>• Prepare all cable ends together to save time</li>
                  <li>• Apply sleeving systematically to avoid confusion</li>
                  <li>• Test each section as you complete it</li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium text-green-700 dark:text-green-300 mb-2">Quality Checkpoints</h3>
                <ul className="space-y-1 text-sm text-green-600 dark:text-green-400">
                  <li>• All conductors properly identified and sleeved</li>
                  <li>• No exposed copper at terminals</li>
                  <li>• Switches and ceiling roses level and secure</li>
                  <li>• Cable properly supported throughout run</li>
                  <li>• All connections tight and mechanically sound</li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium text-green-700 dark:text-green-300 mb-2">Common Candidate Failures</h3>
                <ul className="space-y-1 text-sm text-green-600 dark:text-green-400">
                  <li>• Energising circuits before completing all required tests</li>
                  <li>• Poor conductor identification leading to testing difficulties</li>
                  <li>• Incorrect switch wiring causing operational failures</li>
                  <li>• Damaged cables causing insulation resistance failures</li>
                  <li>• Unsafe working practices during installation</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* Final Quiz */}
        <Card className="bg-transparent border-elec-yellow/30">
          <div className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-6 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Section Assessment
            </h2>
            <Quiz 
              questions={quizQuestions}
              title="Lighting Circuits Knowledge Check"
            />
          </div>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-white/10">
          <Button variant="outline" asChild>
            <Link to="../section2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Cable Containment
            </Link>
          </Button>
          
          <div className="flex items-center gap-2 text-sm text-white">
            <Clock className="w-4 h-4" />
            Estimated reading time: 25-30 minutes
          </div>
          
          <Button asChild>
            <Link to="../section4">
              Next: Power Circuits
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AM2Module3Section3;