import { ArrowLeft, Gauge, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Current-Carrying Capacity - HNC Module 4 Section 2.1";
const DESCRIPTION = "Master cable current-carrying capacity calculations using BS 7671 Appendix 4 tables, installation reference methods and the It calculation process for building services.";

const quickCheckQuestions = [
  {
    id: "reference-method-c",
    question: "Which installation reference method applies to cables clipped directly to a wall surface?",
    options: ["Reference Method A", "Reference Method B", "Reference Method C", "Reference Method D"],
    correctIndex: 2,
    explanation: "Reference Method C applies to cables clipped directly to a non-metallic surface such as a wall or ceiling. This is one of the most common installation methods in building services."
  },
  {
    id: "appendix-4-purpose",
    question: "What is the primary purpose of BS 7671 Appendix 4 tables?",
    options: ["To specify cable colours", "To provide current-carrying capacities for different installation conditions", "To list cable manufacturers", "To specify conduit sizes"],
    correctIndex: 1,
    explanation: "BS 7671 Appendix 4 provides tabulated current-carrying capacities (It) for different cable types, sizes and installation methods, which are fundamental to cable selection."
  },
  {
    id: "it-meaning",
    question: "What does 'It' represent in cable sizing calculations?",
    options: ["Installation temperature", "Tabulated current-carrying capacity", "Total current", "Test current"],
    correctIndex: 1,
    explanation: "It is the tabulated current-carrying capacity from BS 7671 Appendix 4. This value must be adjusted using correction factors to determine the actual current the cable can safely carry."
  },
  {
    id: "cable-selection-first",
    question: "What is the first step in the cable selection process?",
    options: ["Select the protective device", "Determine the design current (Ib)", "Calculate voltage drop", "Choose the installation method"],
    correctIndex: 1,
    explanation: "The first step is always to determine the design current (Ib) - the current the circuit will actually carry in normal operation. All subsequent sizing decisions depend on this value."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which BS 7671 Appendix 4 table would you use for single-core PVC cables in conduit?",
    options: [
      "Table 4D1A",
      "Table 4D2A",
      "Table 4D5",
      "Table 4E1A"
    ],
    correctAnswer: 0,
    explanation: "Table 4D1A covers single-core PVC cables installed in conduit in an insulated wall (Reference Method A) or enclosed in trunking (Reference Method B)."
  },
  {
    id: 2,
    question: "A 10kW single-phase load at 230V has what design current (Ib)?",
    options: ["10A", "23A", "43.5A", "100A"],
    correctAnswer: 2,
    explanation: "Ib = P/V = 10,000W / 230V = 43.5A. This is the starting point for cable selection."
  },
  {
    id: 3,
    question: "What is Reference Method E in BS 7671?",
    options: [
      "Cables in conduit in an insulated wall",
      "Cables clipped directly to a surface",
      "Cables on perforated cable tray",
      "Cables buried in the ground"
    ],
    correctAnswer: 2,
    explanation: "Reference Method E applies to multicore cables on perforated cable tray, which allows air circulation and provides good cooling."
  },
  {
    id: 4,
    question: "Why do cables in thermal insulation have reduced current-carrying capacity?",
    options: [
      "The insulation is conductive",
      "Heat cannot dissipate effectively",
      "The cable becomes shorter",
      "Voltage drop increases"
    ],
    correctAnswer: 1,
    explanation: "Thermal insulation prevents heat from dissipating from the cable. Since the cable cannot cool effectively, its current-carrying capacity must be reduced to prevent overheating."
  },
  {
    id: 5,
    question: "For a circuit with Ib = 25A, the protective device In must be:",
    options: [
      "Exactly 25A",
      "Less than 25A",
      "Greater than or equal to 25A",
      "Twice the design current"
    ],
    correctAnswer: 2,
    explanation: "The fundamental relationship is Ib ≤ In ≤ Iz. The protective device rating (In) must be at least equal to the design current (Ib) to avoid nuisance tripping."
  },
  {
    id: 6,
    question: "Which installation method typically provides the highest current-carrying capacity?",
    options: [
      "Reference Method A - enclosed in insulated wall",
      "Reference Method B - enclosed in trunking",
      "Reference Method C - clipped direct",
      "Reference Method E - on perforated cable tray"
    ],
    correctAnswer: 3,
    explanation: "Reference Method E (perforated cable tray) provides the best cooling due to free air circulation around the cable, giving the highest current-carrying capacity."
  },
  {
    id: 7,
    question: "A 6mm² twin and earth cable clipped direct (Method C) has It = 47A. What does this mean?",
    options: [
      "The cable will melt at 47A",
      "The cable can continuously carry 47A under standard conditions",
      "The protective device must be 47A",
      "47A is the maximum fault current"
    ],
    correctAnswer: 1,
    explanation: "It = 47A means the cable can continuously carry 47A under the standard reference conditions specified in BS 7671 (30°C ambient, no grouping, not in thermal insulation)."
  },
  {
    id: 8,
    question: "What is the relationship between Iz and It when correction factors are applied?",
    options: [
      "Iz = It × correction factors",
      "Iz = It / correction factors",
      "Iz = It + correction factors",
      "Iz = It - correction factors"
    ],
    correctAnswer: 1,
    explanation: "Iz = It / (Ca × Cg × Ci × Cc). Because correction factors account for adverse conditions, they reduce the effective current-carrying capacity, hence division."
  },
  {
    id: 9,
    question: "For three-phase balanced loads, what formula calculates design current?",
    options: [
      "Ib = P / V",
      "Ib = P / (√3 × VL)",
      "Ib = P / (√3 × VL × pf)",
      "Ib = 3 × P / V"
    ],
    correctAnswer: 2,
    explanation: "For three-phase: Ib = P / (√3 × VL × pf), where VL is the line voltage (400V) and pf is the power factor. This accounts for the three-phase power relationship."
  },
  {
    id: 10,
    question: "Why is it important to select the correct reference method before consulting Appendix 4?",
    options: [
      "It determines the cable colour",
      "It determines which table to use and the tabulated capacity",
      "It affects the cable length calculation",
      "It specifies the conduit size required"
    ],
    correctAnswer: 1,
    explanation: "The installation reference method determines which table in Appendix 4 applies and significantly affects the tabulated current values. The same cable has different capacities depending on installation method."
  }
];

const faqs = [
  {
    question: "What is the difference between Ib, In, Iz and It?",
    answer: "Ib is the design current - the actual current the circuit will carry. In is the protective device rating. Iz is the effective current-carrying capacity after applying correction factors. It is the tabulated current from BS 7671 tables under reference conditions. The fundamental relationship is Ib ≤ In ≤ Iz."
  },
  {
    question: "How do I choose between different installation methods?",
    answer: "The reference method is determined by how the cable is actually installed. Method A is for cables in conduit in insulated walls, Method B for cables in trunking on walls, Method C for cables clipped direct, Method D for cables in ducts in the ground, and Method E for cables on cable tray. Choose the method that matches your actual installation."
  },
  {
    question: "What if my cable passes through different installation conditions?",
    answer: "Apply the most onerous (worst) conditions along the cable route. For example, if a cable run passes through thermal insulation for part of its length, apply the thermal insulation correction factor to the entire cable. The cable size must be adequate for the worst-case conditions."
  },
  {
    question: "Can I use a higher rated cable than calculated?",
    answer: "Yes, you can always use a larger cable than minimum calculated size. This may be beneficial for reducing voltage drop, allowing for future load growth, or improving energy efficiency through reduced I²R losses. However, ensure the protective device can still provide adequate fault protection."
  }
];

const HNCModule4Section2_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module4-section2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centered Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Gauge className="h-4 w-4" />
            <span>Module 4.2.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Current-Carrying Capacity
          </h1>
          <p className="text-white/80">
            Using BS 7671 Appendix 4 tables and installation reference methods for safe cable selection
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>It:</strong> Tabulated current from BS 7671 Appendix 4</li>
              <li className="pl-1"><strong>Reference methods:</strong> Define installation conditions</li>
              <li className="pl-1"><strong>Selection:</strong> Ib ≤ In ≤ Iz ensures protection</li>
              <li className="pl-1"><strong>Tables:</strong> 4D1A-4J4A cover all cable types</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Cable tray:</strong> Method E - commercial preference</li>
              <li className="pl-1"><strong>Containment:</strong> Methods A, B for smaller cables</li>
              <li className="pl-1"><strong>SWA direct:</strong> Method C for external runs</li>
              <li className="pl-1"><strong>HVAC plant:</strong> Higher ambient temperatures</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Navigate BS 7671 Appendix 4 current-carrying capacity tables",
              "Identify and apply correct installation reference methods",
              "Calculate design current for single and three-phase loads",
              "Apply the cable selection hierarchy: Ib ≤ In ≤ Iz",
              "Select appropriate tables for different cable types",
              "Understand the relationship between It and actual capacity"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 mb-12" />

        {/* Section 1: BS 7671 Appendix 4 Tables */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            BS 7671 Appendix 4 Tables
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Appendix 4 of BS 7671 contains the authoritative tables for cable current-carrying capacity.
              These tables provide the tabulated current (It) under reference conditions which must then
              be adjusted for actual installation conditions.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Appendix 4 Tables</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Table</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Cable Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">4D1A</td>
                      <td className="border border-white/10 px-3 py-2">Single-core PVC (copper)</td>
                      <td className="border border-white/10 px-3 py-2">Conduit, trunking installations</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">4D2A</td>
                      <td className="border border-white/10 px-3 py-2">Multicore PVC (copper)</td>
                      <td className="border border-white/10 px-3 py-2">Twin & earth, flat cables</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">4D5</td>
                      <td className="border border-white/10 px-3 py-2">Multicore 70°C thermoplastic</td>
                      <td className="border border-white/10 px-3 py-2">Flexible cords</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">4E1A</td>
                      <td className="border border-white/10 px-3 py-2">Single-core XLPE (copper)</td>
                      <td className="border border-white/10 px-3 py-2">High temperature applications</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">4E2A</td>
                      <td className="border border-white/10 px-3 py-2">Multicore XLPE (copper)</td>
                      <td className="border border-white/10 px-3 py-2">SWA cables, higher ratings</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">4E4A</td>
                      <td className="border border-white/10 px-3 py-2">Multicore XLPE armoured</td>
                      <td className="border border-white/10 px-3 py-2">SWA power distribution</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Reference Conditions</p>
              <p className="text-sm text-white mb-2">
                All tabulated values assume standard reference conditions:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Ambient temperature: <strong>30°C</strong> (or 25°C for buried cables)</li>
                <li className="pl-1">Single circuit: <strong>No grouping</strong> with other cables</li>
                <li className="pl-1">Installation: <strong>Not in thermal insulation</strong></li>
                <li className="pl-1">Conductor: Operating at <strong>maximum temperature</strong></li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Tables ending in 'A' are for copper conductors; those ending in 'B' are for aluminium.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 2: Installation Reference Methods */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Installation Reference Methods
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The installation reference method defines how a cable is installed and directly affects its
              current-carrying capacity. Better cooling means higher capacity; restricted heat dissipation
              means lower capacity.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">BS 7671 Reference Methods</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Method</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Description</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Cooling</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">A</td>
                      <td className="border border-white/10 px-3 py-2">Enclosed in conduit in thermally insulated wall</td>
                      <td className="border border-white/10 px-3 py-2 text-orange-400">Poorest</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">B</td>
                      <td className="border border-white/10 px-3 py-2">Enclosed in conduit/trunking on wall or ceiling</td>
                      <td className="border border-white/10 px-3 py-2 text-orange-300">Poor</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">C</td>
                      <td className="border border-white/10 px-3 py-2">Clipped direct to surface</td>
                      <td className="border border-white/10 px-3 py-2 text-yellow-400">Moderate</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">D</td>
                      <td className="border border-white/10 px-3 py-2">In ducts in the ground</td>
                      <td className="border border-white/10 px-3 py-2 text-yellow-300">Ground temp</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">E</td>
                      <td className="border border-white/10 px-3 py-2">Free air or perforated cable tray</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">Good</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">F</td>
                      <td className="border border-white/10 px-3 py-2">Single-core touching on tray</td>
                      <td className="border border-white/10 px-3 py-2 text-green-300">Good</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">G</td>
                      <td className="border border-white/10 px-3 py-2">Single-core spaced on tray</td>
                      <td className="border border-white/10 px-3 py-2 text-green-500">Best</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Building Services Usage</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Method B:</strong> Office trunking systems</li>
                  <li className="pl-1"><strong>Method C:</strong> SWA to plant rooms</li>
                  <li className="pl-1"><strong>Method E:</strong> Risers, plant rooms</li>
                  <li className="pl-1"><strong>Method D:</strong> External supplies</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Capacity Comparison (6mm² Cu)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Method A:</strong> 32A</li>
                  <li className="pl-1"><strong>Method B:</strong> 36A</li>
                  <li className="pl-1"><strong>Method C:</strong> 47A</li>
                  <li className="pl-1"><strong>Method E:</strong> 51A</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Selection tip:</strong> Using Method E (cable tray) instead of Method B (trunking) can allow a smaller cable size, reducing material costs.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 3: Design Current Calculation */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Design Current Calculation (Ib)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The design current (Ib) is the current the circuit is expected to carry in normal service.
              This is the starting point for all cable selection calculations and must be accurately determined.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Design Current Formulas</p>
              <div className="grid sm:grid-cols-2 gap-4 text-center text-sm">
                <div className="p-3 rounded bg-black/30">
                  <p className="font-bold text-elec-yellow mb-1">Single-Phase</p>
                  <p className="font-mono">Ib = P / (V × pf)</p>
                  <p className="text-white/70 text-xs mt-1">Resistive loads: pf = 1</p>
                </div>
                <div className="p-3 rounded bg-black/30">
                  <p className="font-bold text-elec-yellow mb-1">Three-Phase</p>
                  <p className="font-mono">Ib = P / (√3 × VL × pf)</p>
                  <p className="text-white/70 text-xs mt-1">VL = 400V line voltage</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Design Currents</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Load</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Power</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Supply</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Ib</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Water heater</td>
                      <td className="border border-white/10 px-3 py-2">3kW</td>
                      <td className="border border-white/10 px-3 py-2">230V 1φ</td>
                      <td className="border border-white/10 px-3 py-2">13.0A</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Electric shower</td>
                      <td className="border border-white/10 px-3 py-2">9.5kW</td>
                      <td className="border border-white/10 px-3 py-2">230V 1φ</td>
                      <td className="border border-white/10 px-3 py-2">41.3A</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">AHU motor (pf 0.85)</td>
                      <td className="border border-white/10 px-3 py-2">11kW</td>
                      <td className="border border-white/10 px-3 py-2">400V 3φ</td>
                      <td className="border border-white/10 px-3 py-2">18.7A</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Chiller (pf 0.85)</td>
                      <td className="border border-white/10 px-3 py-2">45kW</td>
                      <td className="border border-white/10 px-3 py-2">400V 3φ</td>
                      <td className="border border-white/10 px-3 py-2">76.4A</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Lift motor</td>
                      <td className="border border-white/10 px-3 py-2">22kW</td>
                      <td className="border border-white/10 px-3 py-2">400V 3φ</td>
                      <td className="border border-white/10 px-3 py-2">37.4A</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Motor circuits:</strong> Allow for starting current (typically 6-8× full load) when selecting protective devices, though cable sizing is based on running current.
            </p>
          </div>
        </section>

        {/* Section 4: Cable Selection Process */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Cable Selection Process
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Cable selection follows a systematic process ensuring the cable is adequately rated for
              both normal load current and protection against overload and fault conditions.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">The Selection Hierarchy</p>
              <div className="text-center p-3 rounded bg-black/30 font-mono text-lg">
                I<sub>b</sub> ≤ I<sub>n</sub> ≤ I<sub>z</sub>
              </div>
              <div className="mt-3 text-sm text-white/80">
                <p><strong>Ib</strong> = Design current (load requirement)</p>
                <p><strong>In</strong> = Protective device nominal rating</p>
                <p><strong>Iz</strong> = Cable effective current-carrying capacity</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Step-by-Step Selection</p>
              <ol className="text-sm text-white space-y-2 list-decimal list-outside ml-5">
                <li className="pl-1"><strong>Calculate Ib:</strong> Determine design current from load data</li>
                <li className="pl-1"><strong>Select In:</strong> Choose protective device rating ≥ Ib</li>
                <li className="pl-1"><strong>Determine method:</strong> Identify installation reference method</li>
                <li className="pl-1"><strong>Apply factors:</strong> Calculate minimum It required: It = In / (Ca × Cg × Ci)</li>
                <li className="pl-1"><strong>Select cable:</strong> Choose cable with tabulated It ≥ calculated minimum</li>
                <li className="pl-1"><strong>Verify Vd:</strong> Check voltage drop is within limits</li>
                <li className="pl-1"><strong>Check fault:</strong> Verify fault withstand capability</li>
              </ol>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Example: Office Fan Coil Unit</p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Load: 2.5kW single-phase, 230V</p>
                <p className="mt-2">Step 1: Ib = 2500 / 230 = <strong>10.9A</strong></p>
                <p>Step 2: Select In = <strong>16A</strong> MCB (next standard size up)</p>
                <p>Step 3: Installation: Trunking on wall = <strong>Method B</strong></p>
                <p>Step 4: Ambient 35°C, 4 circuits grouped</p>
                <p className="ml-4">Ca = 0.94, Cg = 0.65</p>
                <p className="ml-4">Min It = 16 / (0.94 × 0.65) = <strong>26.2A</strong></p>
                <p>Step 5: Table 4D2A Method B: 2.5mm² = 20A (too small)</p>
                <p className="ml-4">4mm² = 27A (adequate)</p>
                <p className="mt-2 text-green-400">→ Select 4mm² twin and earth</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Important:</strong> The calculated minimum It includes the effect of correction factors. Always verify the final selection meets voltage drop requirements.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Lighting Circuit</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Select cable for 20 × 45W LED luminaires on a 230V circuit, cables in trunking (Method B), 30°C ambient, no grouping.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Total load = 20 × 45W = 900W</p>
                <p>Ib = 900 / 230 = <strong>3.9A</strong></p>
                <p className="mt-2">Select In = <strong>6A</strong> MCB (Type B)</p>
                <p className="mt-2">No correction factors apply (reference conditions)</p>
                <p>Min It = 6A</p>
                <p className="mt-2">Table 4D2A Method B: 1.5mm² = 14.5A</p>
                <p className="mt-2 text-green-400">→ 1.5mm² adequate (but verify voltage drop for circuit length)</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Three-Phase Motor</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Size cable for 15kW AHU motor (pf 0.85), 400V 3φ, XLPE/SWA on cable tray (Method E), 40°C plant room.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Ib = 15000 / (√3 × 400 × 0.85) = <strong>25.5A</strong></p>
                <p className="mt-2">Select In = <strong>32A</strong> MCCB</p>
                <p className="mt-2">Correction for 40°C (XLPE): Ca = 0.91</p>
                <p>Min It = 32 / 0.91 = <strong>35.2A</strong></p>
                <p className="mt-2">Table 4E2A Method E: 4mm² = 42A</p>
                <p className="mt-2 text-green-400">→ 4mm² 4-core XLPE/SWA suitable</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Grouped Circuits</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> 6 × 20A circuits in conduit on wall (Method B), 30°C ambient. What cable size?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>In = 20A per circuit</p>
                <p className="mt-2">Grouping factor for 6 circuits: Cg = 0.57</p>
                <p>Min It = 20 / 0.57 = <strong>35.1A</strong></p>
                <p className="mt-2">Table 4D1A Method B:</p>
                <p>4mm² = 30A (too small)</p>
                <p>6mm² = 38A (adequate)</p>
                <p className="mt-2 text-green-400">→ 6mm² singles in conduit required</p>
                <p className="mt-2 text-white/60">Note: Heavy grouping penalty - consider separate routes</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Essential Relationships</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Ib ≤ In ≤ Iz</strong> — Fundamental cable selection rule</li>
                <li className="pl-1"><strong>Iz = It × Ca × Cg × Ci</strong> — Effective capacity calculation</li>
                <li className="pl-1"><strong>In ≤ It × Ca × Cg × Ci</strong> — Rearranged for selection</li>
                <li className="pl-1"><strong>Min It = In / (Ca × Cg × Ci)</strong> — Minimum tabulated current</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Building Services Best Practice</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Use cable tray (Method E) where possible for best capacity</li>
                <li className="pl-1">Group similar circuits together to optimise derating</li>
                <li className="pl-1">Allow 20-25% spare capacity for future load growth</li>
                <li className="pl-1">Consider XLPE for high ambient temperature locations</li>
                <li className="pl-1">Document all correction factors applied in design calculations</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Wrong reference method</strong> — Significantly affects tabulated values</li>
                <li className="pl-1"><strong>Forgetting grouping</strong> — Multiple circuits need Cg factor</li>
                <li className="pl-1"><strong>Using wrong table</strong> — PVC vs XLPE, single vs multicore</li>
                <li className="pl-1"><strong>Ignoring power factor</strong> — Motor loads need pf in Ib calculation</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Common Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/90 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Reference Methods</p>
                <ul className="space-y-0.5">
                  <li>A - Conduit in insulated wall (poorest)</li>
                  <li>B - Trunking on surface</li>
                  <li>C - Clipped direct</li>
                  <li>E - Cable tray (best for multicore)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Tables</p>
                <ul className="space-y-0.5">
                  <li>4D1A - Single-core PVC copper</li>
                  <li>4D2A - Multicore PVC copper</li>
                  <li>4E1A - Single-core XLPE copper</li>
                  <li>4E2A - Multicore XLPE copper</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module4-section2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module4-section2-2">
              Next: Voltage Drop Calculations
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule4Section2_1;
