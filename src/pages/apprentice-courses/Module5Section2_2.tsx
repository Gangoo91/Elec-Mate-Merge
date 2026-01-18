import { ArrowLeft, ArrowRight, CheckCircle, AlertTriangle, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { LoadCalculator } from "@/components/apprentice-courses/LoadCalculator";
import useSEO from "@/hooks/useSEO";
import { useState } from "react";

const TITLE = "Load Estimation and Circuit Requirements - Module 5.2.2 | Level 2 Electrical Course";
const DESCRIPTION = "Learn the fundamentals of load estimation and circuit requirements in electrical design, covering calculation methods, diversity factors, and BS 7671 compliance for UK installations.";

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
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3">
          <Button
            variant="ghost"
            className="text-white/70 hover:text-white hover:bg-white/5 -ml-2 min-h-[44px] touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 5.2
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Centered Header */}
          <header className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
              <span className="px-2 py-0.5 bg-elec-yellow/10 rounded">Module 5</span>
              <span className="text-white/40">•</span>
              <span className="text-white/60">Section 5.2.2</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Load Estimation and Circuit Requirements
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Master the fundamentals of calculating electrical loads and planning circuit requirements in line with BS 7671 regulations.
            </p>
          </header>

          {/* Summary Box */}
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-10">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
                <ul className="text-white/80 text-sm space-y-1 list-disc pl-4">
                  <li>Load estimation = calculating electrical demand (watts/kilowatts).</li>
                  <li>Use I = P ÷ V to convert watts to amps.</li>
                  <li>Apply diversity - not all equipment runs simultaneously.</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
                <ul className="text-white/80 text-sm space-y-1 list-disc pl-4">
                  <li><strong>Spot:</strong> Ring final (32A, 2.5mm²), lighting (6A, 1.5mm²).</li>
                  <li><strong>Use:</strong> BS 7671 Reg 433.1/434.1 for protection.</li>
                  <li><strong>Check:</strong> Cable size matches protective device rating.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Learning Outcomes */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">00</span>
              Learning Outcomes
            </h2>
            <ul className="text-white/80 space-y-2 list-disc pl-6">
              <li>Explain the importance of load estimation.</li>
              <li>Carry out simple load calculations for circuits.</li>
              <li>Recognise diversity factors and why they are applied.</li>
              <li>Identify typical circuit requirements for domestic and commercial installations.</li>
              <li>Apply BS 7671 guidance for maximum demand and circuit protection.</li>
            </ul>
          </section>

          {/* Section 1: What Is Load Estimation */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              What Is Load Estimation?
            </h2>
            <p className="text-white/80 mb-4">
              Load estimation involves calculating the electrical demand of an installation to ensure circuits can safely handle the expected current.
            </p>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-6">
              <p className="font-semibold text-elec-yellow mb-3">Load Calculation Fundamentals</p>

              <div className="space-y-4">
                <div>
                  <p className="text-white/80 mb-2"><strong>Definition:</strong> Load estimation = calculating the electrical demand of an installation (in watts or kilowatts).</p>
                  <p className="text-white/70 text-sm">This involves determining how much electrical energy your circuit or installation will actually use under normal and maximum demand conditions.</p>
                </div>

                <div>
                  <p className="text-white/80 mb-2"><strong>The Basic Formula:</strong> I = P ÷ V</p>
                  <div className="p-3 bg-white/5 rounded mb-2">
                    <ul className="text-white/70 text-sm space-y-1">
                      <li><strong>I</strong> = Current in amperes (A)</li>
                      <li><strong>P</strong> = Power in watts (W)</li>
                      <li><strong>V</strong> = Voltage in volts (V)</li>
                    </ul>
                  </div>
                  <div className="p-2 bg-blue-500/10 rounded text-sm text-white/70 border border-blue-500/30">
                    <strong>Example:</strong> 3000W immersion heater ÷ 230V = 13.04A current draw
                  </div>
                </div>

                <div>
                  <p className="text-white/80 mb-2"><strong>Step-by-Step Load Calculation Process:</strong></p>
                  <ol className="text-white/70 text-sm space-y-1 list-decimal pl-4">
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
                  <p className="text-white/80 mb-2"><strong>Types of Electrical Loads:</strong></p>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="p-3 bg-white/5 rounded">
                      <p className="font-medium text-white mb-1 text-sm">Resistive Loads</p>
                      <ul className="text-white/70 text-xs space-y-1 list-disc pl-4">
                        <li>Heating elements, kettles, toasters</li>
                        <li>Incandescent lighting</li>
                        <li>Power = Voltage × Current (simple)</li>
                      </ul>
                    </div>
                    <div className="p-3 bg-white/5 rounded">
                      <p className="font-medium text-white mb-1 text-sm">Inductive Loads</p>
                      <ul className="text-white/70 text-xs space-y-1 list-disc pl-4">
                        <li>Motors, transformers</li>
                        <li>Fluorescent lighting with ballasts</li>
                        <li>Consider power factor (0.8-0.9 typical)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-green-500/10 rounded border border-green-500/30">
                  <p className="font-medium text-green-400 mb-2 text-sm">Worked Example: Small Kitchen</p>
                  <div className="text-white/70 text-sm space-y-1">
                    <p><strong>Equipment:</strong></p>
                    <ul className="pl-4 list-disc space-y-1">
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

            <InlineCheck
              id="load-estimation-check"
              question={quickCheckQuestions[0].question}
              options={quickCheckQuestions[0].options}
              correctIndex={quickCheckQuestions[0].correctIndex}
              explanation={quickCheckQuestions[0].explanation}
            />
          </section>

          {/* Load Calculator */}
          <section className="mb-10">
            <LoadCalculator />
          </section>

          {/* Section 2: Circuit Requirements */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Circuit Requirements
            </h2>
            <p className="text-white/80 mb-4">
              Circuits must be designed to handle expected loads safely whilst providing adequate protection:
            </p>

            <div className="p-4 rounded-lg bg-green-500/5 border-l-2 border-green-500/50 mb-6">
              <p className="font-semibold text-green-400 mb-3">Essential Circuit Design Requirements</p>

              <div className="space-y-4">
                <div>
                  <p className="text-white/80 mb-2"><strong>Current handling:</strong> Handle the expected current safely.</p>
                  <ul className="text-white/70 text-sm space-y-1 list-disc pl-4">
                    <li>Cable current-carrying capacity must exceed maximum demand</li>
                    <li>Consider installation method and ambient temperature</li>
                    <li>Account for grouping and thermal insulation factors</li>
                  </ul>
                </div>

                <div>
                  <p className="text-white/80 mb-2"><strong>Protection:</strong> Protect cables from overload and fault current.</p>
                  <ul className="text-white/70 text-sm space-y-1 list-disc pl-4">
                    <li>MCB/fuse rating must protect cable but carry load</li>
                    <li>Breaking capacity adequate for prospective fault current</li>
                    <li>Discrimination between protective devices</li>
                  </ul>
                </div>

                <div>
                  <p className="text-white/80 mb-2"><strong>Voltage drop:</strong> Supply equipment without excessive voltage drop.</p>
                  <ul className="text-white/70 text-sm space-y-1 list-disc pl-4">
                    <li>Maximum 3% for lighting, 5% for other uses</li>
                    <li>Consider cable length and cross-sectional area</li>
                    <li>Calculate voltage drop using mV/A/m values</li>
                  </ul>
                </div>
              </div>

              <div className="mt-4 p-2 bg-white/5 rounded text-sm text-white/70">
                <strong>Key principle:</strong> Circuit design must balance safety, functionality, and economy
              </div>
            </div>

            <InlineCheck
              id="circuit-requirements-check"
              question={quickCheckQuestions[1].question}
              options={quickCheckQuestions[1].options}
              correctIndex={quickCheckQuestions[1].correctIndex}
              explanation={quickCheckQuestions[1].explanation}
            />
          </section>

          {/* Section 3: Diversity Factor */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Diversity Factor
            </h2>
            <p className="text-white/80 mb-4">
              Diversity factors recognise that not all equipment operates simultaneously, allowing for realistic load calculations:
            </p>

            <div className="p-4 rounded-lg bg-purple-500/5 border-l-2 border-purple-500/50 mb-6">
              <p className="font-semibold text-purple-400 mb-3">Understanding Diversity</p>

              <div className="space-y-4">
                <div>
                  <p className="text-white/80 mb-2"><strong>Concept:</strong> Not all equipment is used at the same time.</p>
                  <ul className="text-white/70 text-sm space-y-1 list-disc pl-4">
                    <li>Reduces the assumed total load for practical design</li>
                    <li>Based on statistical analysis of usage patterns</li>
                    <li>Applied differently to various circuit types</li>
                  </ul>
                </div>

                <div>
                  <p className="text-white/80 mb-2"><strong>Typical diversity factors:</strong></p>
                  <ul className="text-white/70 text-sm space-y-1 list-disc pl-4">
                    <li>Socket outlets: 40-60% (varies by number and usage)</li>
                    <li>Lighting: 66% (some always on, some switched off)</li>
                    <li>Fixed appliances: 100% (cookers, immersion heaters)</li>
                    <li>Commercial premises: varies by building type</li>
                  </ul>
                </div>
              </div>

              <div className="mt-4 p-2 bg-white/5 rounded text-sm text-white/70">
                <strong>Example:</strong> In a domestic kitchen, not all appliances (kettle, oven, microwave) will run simultaneously
              </div>
            </div>

            <InlineCheck
              id="diversity-check"
              question={quickCheckQuestions[2].question}
              options={quickCheckQuestions[2].options}
              correctIndex={quickCheckQuestions[2].correctIndex}
              explanation={quickCheckQuestions[2].explanation}
            />
          </section>

          {/* Section 4: Typical Circuit Examples */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Typical Circuit Examples (Domestic)
            </h2>
            <p className="text-white/80 mb-4">
              Standard domestic circuits with typical ratings and cable sizes:
            </p>

            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <ul className="text-white/80 space-y-2 text-sm">
                <li><strong>Lighting circuits:</strong> 6 A MCB, 1.0/1.5 mm² cable.</li>
                <li><strong>Ring final circuit:</strong> 32 A MCB, 2.5 mm² cable.</li>
                <li><strong>Cooker circuit:</strong> 30/32 A MCB, 6 mm² cable.</li>
                <li><strong>Immersion heater:</strong> 16 A MCB, 2.5 mm² cable.</li>
                <li><strong>Electric shower:</strong> 40/45 A MCB, 10 mm² cable.</li>
                <li><strong>Radial socket circuit:</strong> 20 A MCB, 2.5 mm² cable.</li>
              </ul>
            </div>
          </section>

          {/* Section 5: BS 7671 Requirements */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              BS 7671 Requirements
            </h2>
            <p className="text-white/80 mb-4">
              Key regulatory requirements for circuit design and protection:
            </p>

            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <ul className="text-white/80 space-y-2 text-sm">
                <li><strong>Maximum demand:</strong> Circuits must be designed to meet maximum demand.</li>
                <li><strong>Compatibility:</strong> Cable size, protective devices, and installation method must all be compatible.</li>
                <li><strong>Regulation 433.1:</strong> Protection against overload.</li>
                <li><strong>Regulation 434.1:</strong> Protection against fault current.</li>
                <li><strong>Regulation 525:</strong> Voltage drop limitations (3% lighting, 5% other uses).</li>
              </ul>
            </div>
          </section>

          {/* Section 6: Consequences of Poor Load Planning */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Consequences of Poor Load Planning
            </h2>
            <p className="text-white/80 mb-4">
              Poor load estimation creates serious risks and costs:
            </p>

            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <ul className="text-white/80 space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                  <span>Nuisance tripping (circuit breakers constantly operating)</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                  <span>Overheating cables leading to fire risk</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                  <span>Appliances not working correctly due to undervoltage</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                  <span>Failed inspection and additional costs for rework</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                  <span>Potential liability issues for unsafe installations</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Section 7: Practical Guidance */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">07</span>
              Practical Guidance
            </h2>

            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-blue-500/5 border-l-2 border-blue-500/50">
                <p className="font-semibold text-blue-400 mb-2">Step 1: Equipment Assessment</p>
                <ul className="text-white/70 text-sm space-y-1">
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" /><span><strong>Create equipment list:</strong> Note all appliances and their power ratings</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" /><span><strong>Convert to current:</strong> Use I = P ÷ V (current = power ÷ voltage)</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" /><span><strong>Example calculation:</strong> 2000 W heater ÷ 230 V = 8.7 A</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" /><span><strong>Account for power factor:</strong> Consider reactive loads in AC circuits</span></li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-green-500/5 border-l-2 border-green-500/50">
                <p className="font-semibold text-green-400 mb-2">Step 2: Apply Diversity</p>
                <ul className="text-white/70 text-sm space-y-1">
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" /><span><strong>Research usage patterns:</strong> Understand how equipment is actually used</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" /><span><strong>Apply appropriate factors:</strong> Use recognised diversity factors for different load types</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" /><span><strong>Conservative approach:</strong> Don't underestimate demand - allow safety margins</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" /><span><strong>Document assumptions:</strong> Record diversity factors used for future reference</span></li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-purple-500/5 border-l-2 border-purple-500/50">
                <p className="font-semibold text-purple-400 mb-2">Step 3: Future Planning</p>
                <ul className="text-white/70 text-sm space-y-1">
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" /><span><strong>EV charging provision:</strong> Consider 32A supply for future electric vehicle charging</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" /><span><strong>Heat pump readiness:</strong> Allow for potential heating system upgrades</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" /><span><strong>Smart home technology:</strong> Plan for IoT devices and home automation</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" /><span><strong>Spare capacity:</strong> Allow 20-25% spare capacity in consumer units</span></li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-orange-500/5 border-l-2 border-orange-500/50">
                <p className="font-semibold text-orange-400 mb-2">Step 4: Protection Verification</p>
                <ul className="text-white/70 text-sm space-y-1">
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" /><span><strong>Cable protection:</strong> Ensure protective device ratings don't exceed cable capacity</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" /><span><strong>Load compatibility:</strong> Verify protective devices can carry expected loads</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" /><span><strong>Breaking capacity:</strong> Confirm adequate breaking capacity for fault currents</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" /><span><strong>Discrimination:</strong> Ensure proper coordination between protection devices</span></li>
                </ul>
              </div>
            </div>
          </section>

          {/* Real-World Example */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">08</span>
              Real-World Example
            </h2>

            <div className="p-4 rounded-lg bg-orange-500/5 border-l-2 border-orange-500/50">
              <p className="font-semibold text-orange-400 mb-2">The Student House Circuit Overload</p>
              <p className="text-white/80 mb-3 text-sm">
                <strong>The Scenario:</strong> An electrician installed a ring final circuit in a student house without considering diversity properly. Each bedroom had multiple high-power devices (heaters, kettles, hair dryers, laptop chargers, and gaming equipment).
              </p>

              <div className="p-3 bg-white/5 rounded mb-3">
                <p className="font-medium text-white mb-2 text-sm">The Calculation Error:</p>
                <ul className="text-white/70 text-sm space-y-1 list-disc pl-4">
                  <li><strong>Assumed load per room:</strong> 13A heater + 10A kettle + 8A hair dryer = 31A potential</li>
                  <li><strong>Six bedrooms total:</strong> 6 × 31A = 186A theoretical maximum</li>
                  <li><strong>Applied incorrect diversity:</strong> Used 40% diversity giving 74A demand</li>
                  <li><strong>Real-world usage:</strong> Winter mornings saw 4-5 heaters + multiple kettles simultaneously</li>
                </ul>
              </div>

              <div className="p-3 bg-red-500/10 rounded mb-3 border border-red-500/30">
                <p className="font-medium text-red-400 mb-2 text-sm">The Consequences:</p>
                <ul className="text-white/70 text-sm space-y-1 list-disc pl-4">
                  <li><strong>Daily tripping:</strong> 32A breaker tripped multiple times daily, especially mornings</li>
                  <li><strong>Safety hazard:</strong> Students started bypassing the MCB (extremely dangerous)</li>
                  <li><strong>Voltage drop issues:</strong> Equipment performance suffered due to overloaded circuit</li>
                  <li><strong>Tenant complaints:</strong> Constant inconvenience and heating failures</li>
                  <li><strong>Emergency callouts:</strong> £200+ per callout for "nuisance" trips</li>
                </ul>
              </div>

              <div className="p-3 bg-green-500/10 rounded border border-green-500/30">
                <p className="font-medium text-green-400 mb-2 text-sm">The Expensive Solution:</p>
                <ul className="text-white/70 text-sm space-y-1 list-disc pl-4">
                  <li><strong>Separate circuits:</strong> Install individual 20A radial circuits for each room</li>
                  <li><strong>Consumer unit upgrade:</strong> Larger CU to accommodate additional circuits</li>
                  <li><strong>Cable installation:</strong> New 2.5mm² cables to all rooms</li>
                  <li><strong>Total cost:</strong> £3,200 for remedial work vs £800 if done correctly initially</li>
                  <li><strong>Disruption:</strong> Two weeks of work with students in residence</li>
                </ul>
              </div>

              <div className="mt-3 p-2 bg-white/5 rounded text-sm text-white/70">
                <strong>Key lesson:</strong> Correct load estimation saves expensive corrections. Always consider real-world usage patterns, especially in high-demand environments like student accommodation.
              </div>
            </div>
          </section>

          {/* Pocket Guide */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">09</span>
              Pocket Guide – Load Estimation & Circuits
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-blue-500/5 border border-blue-500/30">
                <p className="font-semibold text-blue-400 mb-2 text-sm">Load Calculation</p>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>• List all expected loads with power ratings</li>
                  <li>• Convert watts into amps (I = P ÷ V)</li>
                  <li>• Apply diversity but allow for worst-case scenarios</li>
                  <li>• Consider usage patterns and peak demands</li>
                  <li>• Plan for future loads and upgrades</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/30">
                <p className="font-semibold text-green-400 mb-2 text-sm">Circuit Design</p>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>• Ring final: 32A MCB, 2.5mm² cable</li>
                  <li>• Lighting: 6A MCB, 1.0/1.5mm² cable</li>
                  <li>• Cooker: 30/32A MCB, 6mm² cable</li>
                  <li>• Shower: 40/45A MCB, 10mm² cable</li>
                  <li>• Immersion: 16A MCB, 2.5mm² cable</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-purple-500/5 border border-purple-500/30">
                <p className="font-semibold text-purple-400 mb-2 text-sm">BS 7671 Compliance</p>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>• Reg 433.1 - Overload protection</li>
                  <li>• Reg 434.1 - Fault current protection</li>
                  <li>• Max voltage drop: 3% lighting, 5% other</li>
                  <li>• Cable and protective device compatibility</li>
                  <li>• Design for maximum demand safely</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-orange-500/5 border border-orange-500/30">
                <p className="font-semibold text-orange-400 mb-2 text-sm">Diversity Factors</p>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>• Socket outlets: 40-60%</li>
                  <li>• Lighting circuits: 66%</li>
                  <li>• Fixed appliances: 100%</li>
                  <li>• Consider actual usage patterns</li>
                  <li>• Don't underestimate demand</li>
                </ul>
              </div>
            </div>

            <div className="mt-4 p-3 bg-white/5 rounded text-center">
              <p className="text-white/70 text-sm">
                <strong>Remember:</strong> Accurate load estimation prevents overheating, tripping, and safety hazards.
                Always balance safety, functionality, and economics in your calculations.
              </p>
            </div>
          </section>

          {/* Recap */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">10</span>
              Recap
            </h2>
            <p className="text-white/80">
              In this subsection, you learned the basics of estimating loads and planning circuits. You explored the role of diversity in reducing assumed maximum demand, reviewed typical circuit designs, and saw how BS 7671 regulates overload and fault protection. You also looked at the consequences of poor load estimation and how to avoid them.
            </p>
          </section>

          {/* FAQs */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">11</span>
              Frequently Asked Questions
            </h2>
            <div className="space-y-2">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-white/10 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors min-h-[44px] touch-manipulation"
                  >
                    <span className="font-medium text-white text-sm pr-4">{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 text-white/60 flex-shrink-0 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === index && (
                    <div className="px-4 pb-4 text-white/70 text-sm">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Quiz */}
          <section className="mb-10">
            <Quiz questions={quizQuestions} />
          </section>

          {/* Navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
            <Button
              variant="ghost"
              className="text-white/70 hover:text-white hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../2-1">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Safe and Functional Design
              </Link>
            </Button>
            <Button
              className="bg-elec-yellow text-black hover:bg-elec-yellow/90 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../2-3">
                Next: Protective Devices
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module5Section2_2;
