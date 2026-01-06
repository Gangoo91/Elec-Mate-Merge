import { ArrowLeft, ArrowRight, FileText, Target, CheckCircle, AlertTriangle, Users, BookOpen, Clipboard, Shield, Calculator, Zap, Gauge, Home, AlertCircle, TrendingUp, Settings, Building2, Lightbulb, Power } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { LoadCalculator } from "@/components/apprentice-courses/LoadCalculator";
import useSEO from "@/hooks/useSEO";

const TITLE = "Load Estimation and Circuit Requirements - Module 5.2.2 | Level 2 Electrical Course";
const DESCRIPTION = "Learn the fundamentals of load estimation and circuit requirements in electrical design, covering calculation methods, diversity factors, and BS 7671 compliance for UK installations.";

// Inline check questions
const quickCheckQuestions = [
  {
    id: 1,
    question: "What is the formula for calculating current (I) from power (P) and voltage (V)?",
    options: ["I = P × V", "I = P ÷ V", "I = V ÷ P", "I = P + V"],
    correctIndex: 1,
    explanation: "Current equals power divided by voltage: I = P ÷ V."
  },
  {
    id: 2,
    question: "True or False: All appliances in a house are assumed to be used at the same time when calculating load.",
    options: ["True", "False"],
    correctIndex: 1,
    explanation: "False - diversity factors are applied because not all appliances are used simultaneously."
  },
  {
    id: 3,
    question: "What is the typical protective device rating for a domestic ring final circuit?",
    options: ["16 A MCB", "20 A MCB", "32 A MCB", "40 A MCB"],
    correctIndex: 2,
    explanation: "A 32 A MCB is typically used for domestic ring final circuits."
  }
];

const Module5Section2_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: "What is the formula for calculating current (I) from power (P) and voltage (V)?",
      options: ["I = P × V", "I = P ÷ V", "I = V ÷ P", "I = P + V"],
      correctAnswer: 1,
      explanation: "Current equals power divided by voltage: I = P ÷ V."
    },
    {
      id: 2,
      question: "True or False: All appliances in a house are assumed to be used at the same time when calculating load.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation: "False - diversity factors are applied because not all appliances are used simultaneously."
    },
    {
      id: 3,
      question: "What is the typical protective device rating for a domestic ring final circuit?",
      options: ["16 A MCB", "20 A MCB", "32 A MCB", "40 A MCB"],
      correctAnswer: 2,
      explanation: "A 32 A MCB is typically used for domestic ring final circuits."
    },
    {
      id: 4,
      question: "Give one consequence of underestimating circuit loads.",
      options: ["Lower installation costs", "Overheating cables or nuisance tripping", "Improved efficiency", "Better appearance"],
      correctAnswer: 1,
      explanation: "Underestimating loads can lead to overheating cables or constant breaker tripping."
    },
    {
      id: 5,
      question: "What size cable is normally used with a 6 A lighting circuit?",
      options: ["1.0/1.5 mm² cable", "2.5 mm² cable", "4.0 mm² cable", "6.0 mm² cable"],
      correctAnswer: 0,
      explanation: "1.0/1.5 mm² cable is typically used for 6 A lighting circuits."
    },
    {
      id: 6,
      question: "Which BS 7671 regulation covers protection against overload?",
      options: ["Regulation 431.1", "Regulation 433.1", "Regulation 435.1", "Regulation 437.1"],
      correctAnswer: 1,
      explanation: "Regulation 433.1 covers protection against overload."
    },
    {
      id: 7,
      question: "A 3 kW immersion heater is connected to 230 V. What current will it draw?",
      options: ["10.0 A", "13.0 A", "15.0 A", "18.0 A"],
      correctAnswer: 1,
      explanation: "3000 ÷ 230 = 13.0 A (approximately)."
    },
    {
      id: 8,
      question: "Why is diversity important in circuit design?",
      options: ["To increase costs", "It reduces the assumed load because not all appliances are used simultaneously", "To make installation easier", "To improve aesthetics"],
      correctAnswer: 1,
      explanation: "Diversity reduces assumed load as appliances aren't all used at the same time."
    },
    {
      id: 9,
      question: "What could happen if a cooker circuit is undersized?",
      options: ["Nothing happens", "Cable overheating, breaker tripping, or fire risk", "Better performance", "Lower energy bills"],
      correctAnswer: 1,
      explanation: "Undersized circuits can cause overheating, tripping, and fire risks."
    },
    {
      id: 10,
      question: "What does BS 7671 require circuits to be designed for?",
      options: ["Minimum cost", "Maximum profit", "To meet maximum demand safely and effectively", "Fastest installation"],
      correctAnswer: 2,
      explanation: "BS 7671 requires circuits to meet maximum demand safely and effectively."
    }
  ];

  const faqs = [
    {
      question: "How do I calculate the total load for a domestic installation?",
      answer: "List all equipment with their power ratings, convert to current using I = P ÷ V, apply appropriate diversity factors, and sum the results to get maximum demand."
    },
    {
      question: "What diversity factors should I apply?",
      answer: "Diversity varies by application - typically 40-60% for socket outlets, 66% for lighting, and 100% for fixed appliances like cookers and immersion heaters."
    },
    {
      question: "How do I size protective devices correctly?",
      answer: "The protective device must be rated to protect the cable but also carry the expected load. It should not exceed the cable's current-carrying capacity."
    },
    {
      question: "What happens if I overestimate the load?",
      answer: "Overestimating leads to oversized cables and protective devices, increasing material costs unnecessarily, though it's safer than underestimating."
    }
  ];

  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Top header bar */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white hover:text-white active:text-white p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 2
            </Link>
          </Button>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <header className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg ">
              <Calculator className="w-6 h-6 text-white" />
            </div>
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">
              Section 5.2.2
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            Load Estimation and Circuit Requirements
          </h1>
          <p className="text-white">
            Master the fundamentals of calculating electrical loads and planning circuit requirements in line with BS 7671 regulations.
          </p>
        </header>

        {/* Spot it in 30 Seconds Card */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-6 h-6 text-white" />
            <h2 className="text-lg sm:text-xl font-semibold text-white">Spot it in 30 Seconds</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-base text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Load estimation = calculating electrical demand (watts/kilowatts).</li>
                <li>Use I = P ÷ V to convert watts to amps.</li>
                <li>Apply diversity - not all equipment runs simultaneously.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Ring final (32A, 2.5mm²), lighting (6A, 1.5mm²).</li>
                <li><strong>Use:</strong> BS 7671 Reg 433.1/434.1 for protection.</li>
                <li><strong>Check:</strong> Cable size matches protective device rating.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Introduction</h2>
          <p className="text-base text-white">
            Correctly estimating loads and planning circuit requirements is a fundamental part of electrical design. An under-sized circuit can lead to overheating, nuisance tripping, or even fire, while over-designing circuits may waste materials and increase costs. This subsection introduces the basics of calculating loads and planning circuits in line with BS 7671 Wiring Regulations.
          </p>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Learning outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-base text-white">
            <li>Explain the importance of load estimation.</li>
            <li>Carry out simple load calculations for circuits.</li>
            <li>Recognise diversity factors and why they are applied.</li>
            <li>Identify typical circuit requirements for domestic and commercial installations.</li>
            <li>Apply BS 7671 guidance for maximum demand and circuit protection.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Content / Learning</h2>

          {/* What Is Load Estimation */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">1. What Is Load Estimation?</h3>
            <p className="text-base text-white mb-4">
              Load estimation involves calculating the electrical demand of an installation to ensure circuits can safely handle the expected current.
            </p>
            
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-elec-yellow ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow dark:text-elec-yellow mb-3">Load Calculation Fundamentals</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-base text-white mb-2"><strong>Definition:</strong> Load estimation = calculating the electrical demand of an installation (in watts or kilowatts).</p>
                        <p className="text-xs sm:text-sm text-white">This involves determining how much electrical energy your circuit or installation will actually use under normal and maximum demand conditions.</p>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>The Basic Formula:</strong> I = P ÷ V</p>
                        <div className="bg-[#121212]/50 p-3 rounded border mb-2">
                          <ul className="text-xs sm:text-sm text-white space-y-1">
                            <li><strong>I</strong> = Current in amperes (A)</li>
                            <li><strong>P</strong> = Power in watts (W)</li>
                            <li><strong>V</strong> = Voltage in volts (V)</li>
                          </ul>
                        </div>
                        <div className="text-xs sm:text-sm text-white bg-emerald-50 dark:bg-blue-900/20 p-2 rounded border">
                          <strong>Example:</strong> 3000W immersion heater ÷ 230V = 13.04A current draw
                        </div>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>Step-by-Step Load Calculation Process:</strong></p>
                        <ol className="text-xs sm:text-sm text-white ml-4 space-y-2 list-decimal">
                          <li><strong>Inventory all equipment:</strong> List every appliance, light, and electrical device</li>
                          <li><strong>Identify power ratings:</strong> Check nameplates, specifications, or manufacturer data</li>
                          <li><strong>Calculate individual currents:</strong> Use I = P ÷ V for each item</li>
                          <li><strong>Group by circuit type:</strong> Separate lighting, heating, sockets, etc.</li>
                          <li><strong>Apply diversity factors:</strong> Account for non-simultaneous use</li>
                          <li><strong>Sum maximum demand:</strong> Add up the realistic maximum load</li>
                          <li><strong>Add safety margin:</strong> Include 10-20% for future expansion</li>
                        </ol>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>Types of Electrical Loads:</strong></p>
                        <div className="grid md:grid-cols-2 gap-3">
                          <div className="bg-[#121212]/30 p-3 rounded border">
                            <p className="font-medium text-white mb-1">Resistive Loads</p>
                            <ul className="text-xs text-white list-disc ml-4 space-y-1">
                              <li>Heating elements, kettles, toasters</li>
                              <li>Incandescent lighting</li>
                              <li>Power = Voltage × Current (simple)</li>
                            </ul>
                          </div>
                          <div className="bg-[#121212]/30 p-3 rounded border">
                            <p className="font-medium text-white mb-1">Inductive Loads</p>
                            <ul className="text-xs text-white list-disc ml-4 space-y-1">
                              <li>Motors, transformers</li>
                              <li>Fluorescent lighting with ballasts</li>
                              <li>Consider power factor (0.8-0.9 typical)</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>Practical Considerations:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 space-y-1 list-disc">
                          <li><strong>Starting currents:</strong> Motors can draw 3-6 times normal current when starting</li>
                          <li><strong>Ambient temperature:</strong> Higher temperatures reduce cable capacity</li>
                          <li><strong>Installation method:</strong> Buried vs clipped direct affects current ratings</li>
                          <li><strong>Grouping factors:</strong> Multiple cables together generate more heat</li>
                          <li><strong>Voltage variations:</strong> 230V nominal can vary ±10% (207-253V)</li>
                        </ul>
                      </div>

                      <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded border border-green-200 dark:border-green-800">
                        <p className="font-medium text-green-700 dark:text-green-400 mb-2">Worked Example: Small Kitchen</p>
                        <div className="text-xs sm:text-sm text-white space-y-1">
                          <p><strong>Equipment:</strong></p>
                          <ul className="ml-4 list-disc space-y-1">
                            <li>3kW kettle: 3000W ÷ 230V = 13.0A</li>
                            <li>800W microwave: 800W ÷ 230V = 3.5A</li>
                            <li>2kW toaster: 2000W ÷ 230V = 8.7A</li>
                            <li>1.5kW coffee machine: 1500W ÷ 230V = 6.5A</li>
                          </ul>
                          <p><strong>Total connected load:</strong> 31.7A</p>
                          <p><strong>With 60% diversity:</strong> 31.7A × 0.6 = 19.0A</p>
                          <p><strong>Recommended circuit:</strong> 20A or 32A MCB with 2.5mm² cable</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="load-estimation-check"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />
          <Separator className="my-6" />

          {/* Load Calculator */}
          <LoadCalculator />

          {/* Circuit Requirements */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">2. Circuit Requirements</h3>
            <p className="text-base text-white mb-4">
              Circuits must be designed to handle expected loads safely whilst providing adequate protection:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-1">Essential Circuit Design Requirements</p>
                    <p className="text-base text-white mb-2"><strong>Current handling:</strong> Handle the expected current safely.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Cable current-carrying capacity must exceed maximum demand</li>
                      <li>Consider installation method and ambient temperature</li>
                      <li>Account for grouping and thermal insulation factors</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Protection:</strong> Protect cables from overload and fault current.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>MCB/fuse rating must protect cable but carry load</li>
                      <li>Breaking capacity adequate for prospective fault current</li>
                      <li>Discrimination between protective devices</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Voltage drop:</strong> Supply equipment without excessive voltage drop.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Maximum 3% for lighting, 5% for other uses</li>
                      <li>Consider cable length and cross-sectional area</li>
                      <li>Calculate voltage drop using mV/A/m values</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Key principle:</strong> Circuit design must balance safety, functionality, and economy
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="circuit-requirements-check"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />
          <Separator className="my-6" />

          {/* Diversity Factor */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">3. Diversity Factor</h3>
            <p className="text-base text-white mb-4">
              Diversity factors recognise that not all equipment operates simultaneously, allowing for realistic load calculations:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-purple-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 dark:text-elec-yellow mb-1">Understanding Diversity</p>
                    <p className="text-base text-white mb-2"><strong>Concept:</strong> Not all equipment is used at the same time.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Reduces the assumed total load for practical design</li>
                      <li>Based on statistical analysis of usage patterns</li>
                      <li>Applied differently to various circuit types</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Typical diversity factors:</strong></p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Socket outlets: 40-60% (varies by number and usage)</li>
                      <li>Lighting: 66% (some always on, some switched off)</li>
                      <li>Fixed appliances: 100% (cookers, immersion heaters)</li>
                      <li>Commercial premises: varies by building type</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Example:</strong> In a domestic kitchen, not all appliances (kettle, oven, microwave) will run simultaneously
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="diversity-check"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />
          <Separator className="my-6" />

          {/* Typical Circuit Examples */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">4. Typical Circuit Examples (Domestic)</h3>
            <p className="text-base text-white mb-4">
              Standard domestic circuits with typical ratings and cable sizes:
            </p>
            
            <div className="bg-[#121212]/50 p-4 rounded-lg border border-white/10 mb-4">
              <ul className="text-xs sm:text-sm text-white space-y-2">
                <li><strong>Lighting circuits:</strong> 6 A MCB, 1.0/1.5 mm² cable.</li>
                <li><strong>Ring final circuit:</strong> 32 A MCB, 2.5 mm² cable.</li>
                <li><strong>Cooker circuit:</strong> 30/32 A MCB, 6 mm² cable.</li>
                <li><strong>Immersion heater:</strong> 16 A MCB, 2.5 mm² cable.</li>
                <li><strong>Electric shower:</strong> 40/45 A MCB, 10 mm² cable.</li>
                <li><strong>Radial socket circuit:</strong> 20 A MCB, 2.5 mm² cable.</li>
              </ul>
            </div>
          </section>

          {/* BS 7671 Requirements */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">5. BS 7671 Requirements</h3>
            <p className="text-base text-white mb-4">
              Key regulatory requirements for circuit design and protection:
            </p>
            
            <div className="bg-[#121212]/50 p-4 rounded-lg border border-white/10 mb-4">
              <ul className="text-xs sm:text-sm text-white space-y-2">
                <li><strong>Maximum demand:</strong> Circuits must be designed to meet maximum demand.</li>
                <li><strong>Compatibility:</strong> Cable size, protective devices, and installation method must all be compatible.</li>
                <li><strong>Regulation 433.1:</strong> Protection against overload.</li>
                <li><strong>Regulation 434.1:</strong> Protection against fault current.</li>
                <li><strong>Regulation 525:</strong> Voltage drop limitations (3% lighting, 5% other uses).</li>
              </ul>
            </div>
          </section>

          {/* Consequences of Poor Load Planning */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">6. Consequences of Poor Load Planning</h3>
            <p className="text-base text-white mb-4">
              Poor load estimation creates serious risks and costs:
            </p>
            
            <div className="bg-card p-4 rounded-lg border border-red-200 dark:border-red-800 mb-4">
              <ul className="text-xs sm:text-sm text-white space-y-2">
                <li>• Nuisance tripping (circuit breakers constantly operating)</li>
                <li>• Overheating cables leading to fire risk</li>
                <li>• Appliances not working correctly due to undervoltage</li>
                <li>• Failed inspection and additional costs for rework</li>
                <li>• Potential liability issues for unsafe installations</li>
              </ul>
            </div>
          </section>

          {/* Practical Guidance */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Practical Guidance</h3>
            
            <div className="space-y-4">
              <div className="bg-card p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="font-medium text-elec-yellow dark:text-elec-yellow mb-2">Step 1: Equipment Assessment</p>
                <ul className="text-xs sm:text-sm text-white space-y-1">
                  <li>✅ <strong>Create equipment list:</strong> Note all appliances and their power ratings</li>
                  <li>✅ <strong>Convert to current:</strong> Use I = P ÷ V (current = power ÷ voltage)</li>
                  <li>✅ <strong>Example calculation:</strong> 2000 W heater ÷ 230 V = 8.7 A</li>
                  <li>✅ <strong>Account for power factor:</strong> Consider reactive loads in AC circuits</li>
                </ul>
              </div>
              
              <div className="bg-card p-4 rounded-lg border border-green-200 dark:border-green-800">
                <p className="font-medium text-green-600 dark:text-green-400 mb-2">Step 2: Apply Diversity</p>
                <ul className="text-xs sm:text-sm text-white space-y-1">
                  <li>✅ <strong>Research usage patterns:</strong> Understand how equipment is actually used</li>
                  <li>✅ <strong>Apply appropriate factors:</strong> Use recognised diversity factors for different load types</li>
                  <li>✅ <strong>Conservative approach:</strong> Don't underestimate demand - allow safety margins</li>
                  <li>✅ <strong>Document assumptions:</strong> Record diversity factors used for future reference</li>
                </ul>
              </div>
              
              <div className="bg-card p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                <p className="font-medium text-purple-600 dark:text-elec-yellow mb-2">Step 3: Future Planning</p>
                <ul className="text-xs sm:text-sm text-white space-y-1">
                  <li>✅ <strong>EV charging provision:</strong> Consider 32A supply for future electric vehicle charging</li>
                  <li>✅ <strong>Heat pump readiness:</strong> Allow for potential heating system upgrades</li>
                  <li>✅ <strong>Smart home technology:</strong> Plan for IoT devices and home automation</li>
                  <li>✅ <strong>Spare capacity:</strong> Allow 20-25% spare capacity in consumer units</li>
                </ul>
              </div>
              
              <div className="bg-card p-4 rounded-lg border border-orange-200 dark:border-orange-800">
                <p className="font-medium text-orange-600 dark:text-elec-yellow mb-2">Step 4: Protection Verification</p>
                <ul className="text-xs sm:text-sm text-white space-y-1">
                  <li>✅ <strong>Cable protection:</strong> Ensure protective device ratings don't exceed cable capacity</li>
                  <li>✅ <strong>Load compatibility:</strong> Verify protective devices can carry expected loads</li>
                  <li>✅ <strong>Breaking capacity:</strong> Confirm adequate breaking capacity for fault currents</li>
                  <li>✅ <strong>Discrimination:</strong> Ensure proper coordination between protection devices</li>
                </ul>
              </div>
            </div>
          </section>
        </Card>

        {/* Real-World Example */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Real-World Example</h2>
          <div className="rounded-lg p-5 border-l-4 border-l-orange-500 ">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center">
                <Building2 className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-orange-600 dark:text-elec-yellow mb-2">The Student House Circuit Overload</p>
                <p className="text-base text-white mb-3">
                  <strong>The Scenario:</strong> An electrician installed a ring final circuit in a student house without considering diversity properly. Each bedroom had multiple high-power devices (heaters, kettles, hair dryers, laptop chargers, and gaming equipment).
                </p>
                
                <div className="bg-[#121212]/30 p-4 rounded-lg mb-3">
                  <p className="font-medium text-white mb-2">The Calculation Error:</p>
                  <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                    <li><strong>Assumed load per room:</strong> 13A heater + 10A kettle + 8A hair dryer = 31A potential</li>
                    <li><strong>Six bedrooms total:</strong> 6 × 31A = 186A theoretical maximum</li>
                    <li><strong>Applied incorrect diversity:</strong> Used 40% diversity giving 74A demand</li>
                    <li><strong>Real-world usage:</strong> Winter mornings saw 4-5 heaters + multiple kettles simultaneously</li>
                  </ul>
                </div>
                
                <div className="bg-card p-4 rounded-lg mb-3 border border-red-500/20">
                  <p className="font-medium text-red-600 dark:text-elec-yellow mb-2">The Consequences:</p>
                  <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                    <li><strong>Daily tripping:</strong> 32A breaker tripped multiple times daily, especially mornings</li>
                    <li><strong>Safety hazard:</strong> Students started bypassing the MCB (extremely dangerous)</li>
                    <li><strong>Voltage drop issues:</strong> Equipment performance suffered due to overloaded circuit</li>
                    <li><strong>Tenant complaints:</strong> Constant inconvenience and heating failures</li>
                    <li><strong>Emergency callouts:</strong> £200+ per callout for "nuisance" trips</li>
                  </ul>
                </div>
                
                <div className="bg-card p-4 rounded-lg border border-green-500/20">
                  <p className="font-medium text-green-600 dark:text-green-400 mb-2">The Expensive Solution:</p>
                  <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                    <li><strong>Separate circuits:</strong> Install individual 20A radial circuits for each room</li>
                    <li><strong>Consumer unit upgrade:</strong> Larger CU to accommodate additional circuits</li>
                    <li><strong>Cable installation:</strong> New 2.5mm² cables to all rooms</li>
                    <li><strong>Total cost:</strong> £3,200 for remedial work vs £800 if done correctly initially</li>
                    <li><strong>Disruption:</strong> Two weeks of work with students in residence</li>
                  </ul>
                </div>
                
                <div className="text-xs sm:text-sm text-white bg-[#121212]/50 p-3 rounded border mt-3">
                  <strong>Key lesson:</strong> Correct load estimation saves expensive corrections. Always consider real-world usage patterns, especially in high-demand environments like student accommodation.
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Pocket Guide */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">
            <div className="flex items-center gap-3">
              <Clipboard className="w-6 h-6" />
              Pocket Guide – Load Estimation & Circuits
            </div>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-4">
              <div className="bg-card p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="font-medium text-elec-yellow dark:text-elec-yellow mb-2">Load Calculation</p>
                <ul className="text-xs sm:text-sm text-white space-y-1">
                  <li>📝 List all expected loads with power ratings</li>
                  <li>🧮 Convert watts into amps (I = P ÷ V)</li>
                  <li>⚖️ Apply diversity but allow for worst-case scenarios</li>
                  <li>📊 Consider usage patterns and peak demands</li>
                  <li>🔮 Plan for future loads and upgrades</li>
                </ul>
              </div>
              
              <div className="bg-card p-4 rounded-lg border border-green-200 dark:border-green-800">
                <p className="font-medium text-green-600 dark:text-green-400 mb-2">Circuit Design</p>
                <ul className="text-xs sm:text-sm text-white space-y-1">
                  <li>🔌 Ring final: 32A MCB, 2.5mm² cable</li>
                  <li>💡 Lighting: 6A MCB, 1.0/1.5mm² cable</li>
                  <li>🍳 Cooker: 30/32A MCB, 6mm² cable</li>
                  <li>🚿 Shower: 40/45A MCB, 10mm² cable</li>
                  <li>🔥 Immersion: 16A MCB, 2.5mm² cable</li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-card p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                <p className="font-medium text-purple-600 dark:text-elec-yellow mb-2">BS 7671 Compliance</p>
                <ul className="text-xs sm:text-sm text-white space-y-1">
                  <li>📋 Reg 433.1 - Overload protection</li>
                  <li>⚡ Reg 434.1 - Fault current protection</li>
                  <li>📉 Max voltage drop: 3% lighting, 5% other</li>
                  <li>🔒 Cable and protective device compatibility</li>
                  <li>🎯 Design for maximum demand safely</li>
                </ul>
              </div>
              
              <div className="bg-card p-4 rounded-lg border border-orange-200 dark:border-orange-800">
                <p className="font-medium text-orange-600 dark:text-elec-yellow mb-2">Diversity Factors</p>
                <ul className="text-xs sm:text-sm text-white space-y-1">
                  <li>🔌 Socket outlets: 40-60%</li>
                  <li>💡 Lighting circuits: 66%</li>
                  <li>🍳 Fixed appliances: 100%</li>
                  <li>🏠 Consider actual usage patterns</li>
                  <li>⚠️ Don't underestimate demand</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-[#121212]/50 rounded-lg border border-white/10">
            <p className="text-xs sm:text-sm text-white text-center">
              <strong>Remember:</strong> Accurate load estimation prevents overheating, tripping, and safety hazards. 
              Always balance safety, functionality, and economics in your calculations.
            </p>
          </div>
        </Card>

        {/* Recap */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Recap</h2>
          <p className="text-base text-white">
            In this subsection, you learned the basics of estimating loads and planning circuits. You explored the role of diversity in reducing assumed maximum demand, reviewed typical circuit designs, and saw how BS 7671 regulates overload and fault protection. You also looked at the consequences of poor load estimation and how to avoid them.
          </p>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">FAQs</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-l-4 border-l-elec-yellow pl-4">
                <p className="font-medium text-white mb-2">Q: {faq.question}</p>
                <p className="text-sm text-white">A: {faq.answer}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Quiz */}
        <Quiz questions={quizQuestions} />

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-white/10">
          <Button variant="outline" asChild>
            <Link to="../2-1" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>
          </Button>
          <Button asChild>
            <Link to="../2-3" className="flex items-center gap-2">
              Next
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module5Section2_2;