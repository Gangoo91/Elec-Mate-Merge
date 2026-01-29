import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Fabric Performance - HNC Module 6 Section 1.3";
const DESCRIPTION = "Master fabric performance for building services: U-value calculations, thermal bridging, limiting fabric parameters, psi values, Part L compliance, and construction specifications for energy-efficient buildings.";

const quickCheckQuestions = [
  {
    id: "u-value-definition",
    question: "What does the U-value of a building element measure?",
    options: ["The thermal mass of the material", "The rate of heat transfer per unit area per degree temperature difference", "The amount of solar gain through the element", "The air permeability of the construction"],
    correctIndex: 1,
    explanation: "The U-value (thermal transmittance) measures the rate of heat transfer through a building element per unit area for every degree of temperature difference between inside and outside. Lower U-values indicate better insulation."
  },
  {
    id: "thermal-bridge",
    question: "What is a thermal bridge in building construction?",
    options: ["A structural beam that spans between buildings", "An area where heat transfer is significantly higher than surrounding elements", "A connection between heating systems", "A gap in the insulation layer"],
    correctIndex: 1,
    explanation: "A thermal bridge is an area of the building envelope where heat transfer is significantly greater than the surrounding construction, typically occurring at junctions, penetrations, or where insulation is interrupted."
  },
  {
    id: "part-l-compliance",
    question: "For Part L compliance, which approach considers both fabric elements and thermal bridges?",
    options: ["Area-weighted average", "Worst-case scenario", "Target Fabric Energy Efficiency (TFEE)", "Simple additive method"],
    correctIndex: 2,
    explanation: "The Target Fabric Energy Efficiency (TFEE) standard in Part L considers the combined performance of all fabric elements plus thermal bridging effects to assess overall building envelope performance."
  },
  {
    id: "psi-value",
    question: "What does the psi (ψ) value represent in thermal bridging calculations?",
    options: ["The U-value of an insulation material", "The linear thermal transmittance at junctions", "The air leakage rate at joints", "The solar heat gain coefficient"],
    correctIndex: 1,
    explanation: "The psi (ψ) value represents the linear thermal transmittance of a thermal bridge, measured in W/mK. It quantifies the additional heat loss per metre length of a junction or linear feature."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What are the units for U-value?",
    options: [
      "W/K",
      "W/m²K",
      "W/mK",
      "J/m²K"
    ],
    correctAnswer: 1,
    explanation: "U-value is measured in W/m²K (watts per square metre per kelvin). This represents the rate of heat transfer through one square metre of the element for each degree of temperature difference."
  },
  {
    id: 2,
    question: "According to Part L 2021 for new dwellings, what is the limiting U-value for external walls?",
    options: ["0.35 W/m²K", "0.26 W/m²K", "0.18 W/m²K", "0.30 W/m²K"],
    correctAnswer: 1,
    explanation: "Part L 2021 sets the limiting U-value for external walls in new dwellings at 0.26 W/m²K. This is a backstop value - actual designs typically achieve lower values to meet overall energy targets."
  },
  {
    id: 3,
    question: "When calculating the U-value of a wall, which resistance must be included for the external surface?",
    options: ["Rsi = 0.13 m²K/W", "Rse = 0.04 m²K/W", "Rse = 0.13 m²K/W", "Rsi = 0.04 m²K/W"],
    correctAnswer: 1,
    explanation: "The external surface resistance (Rse) is 0.04 m²K/W for exposed surfaces. The internal surface resistance (Rsi) is 0.13 m²K/W for horizontal heat flow (walls)."
  },
  {
    id: 4,
    question: "A 100mm thick insulation material has a thermal conductivity of 0.035 W/mK. What is its thermal resistance?",
    options: [
      "0.35 m²K/W",
      "2.86 m²K/W",
      "3.50 m²K/W",
      "0.29 m²K/W"
    ],
    correctAnswer: 1,
    explanation: "Thermal resistance R = thickness / conductivity = 0.100 / 0.035 = 2.86 m²K/W. Higher thermal resistance means better insulation performance."
  },
  {
    id: 5,
    question: "What is the limiting U-value for roofs in new non-domestic buildings under Part L 2021?",
    options: [
      "0.25 W/m²K",
      "0.18 W/m²K",
      "0.16 W/m²K",
      "0.20 W/m²K"
    ],
    correctAnswer: 2,
    explanation: "Part L 2021 sets the limiting U-value for roofs in new non-domestic buildings at 0.16 W/m²K. Roofs typically have lower limiting values as they experience greatest heat loss."
  },
  {
    id: 6,
    question: "Which term describes the total thermal transmittance including linear thermal bridges?",
    options: [
      "Elemental U-value",
      "Adjusted U-value",
      "Effective U-value",
      "Composite U-value"
    ],
    correctAnswer: 2,
    explanation: "The effective U-value accounts for both the basic elemental U-value and the additional heat loss through thermal bridges (using psi values). This gives a more accurate representation of real-world performance."
  },
  {
    id: 7,
    question: "What is the default y-value used for thermal bridging when no detailed calculations are provided?",
    options: [
      "0.05 W/m²K",
      "0.08 W/m²K",
      "0.10 W/m²K",
      "0.15 W/m²K"
    ],
    correctAnswer: 3,
    explanation: "When detailed psi value calculations are not available, a default y-value of 0.15 W/m²K is used. This penalises buildings without proper thermal bridge detailing and typically adds significantly to heat loss."
  },
  {
    id: 8,
    question: "For a window, what does the frame factor affect in thermal performance calculations?",
    options: [
      "The air leakage around the frame",
      "The proportion of glazed area to total window area",
      "The structural integrity of the installation",
      "The solar gain through the glass"
    ],
    correctAnswer: 1,
    explanation: "The frame factor represents the ratio of glazed area to total window area. Since frames typically have higher U-values than glazing, a higher frame factor (more frame) generally increases overall window U-value."
  },
  {
    id: 9,
    question: "What is the formula for calculating the U-value from total thermal resistance?",
    options: [
      "U = Rtotal × Area",
      "U = 1 / Rtotal",
      "U = Rtotal / thickness",
      "U = conductivity × Rtotal"
    ],
    correctAnswer: 1,
    explanation: "U-value is the reciprocal of total thermal resistance: U = 1/Rtotal. After calculating Rtotal by summing all layer resistances plus surface resistances, divide 1 by this total to get the U-value."
  },
  {
    id: 10,
    question: "Which insulation material typically has the lowest thermal conductivity?",
    options: [
      "Mineral wool (0.035-0.040 W/mK)",
      "PIR/PUR foam (0.022-0.028 W/mK)",
      "Expanded polystyrene (0.032-0.038 W/mK)",
      "Phenolic foam (0.018-0.022 W/mK)"
    ],
    correctAnswer: 3,
    explanation: "Phenolic foam has the lowest thermal conductivity of common insulation materials (0.018-0.022 W/mK), making it highly efficient where space is limited. However, it requires careful detailing due to potential moisture sensitivity."
  },
  {
    id: 11,
    question: "When calculating the U-value of a ground floor, what additional factor must be considered?",
    options: [
      "The building height",
      "The perimeter-to-area ratio",
      "The external air temperature only",
      "The roof insulation level"
    ],
    correctAnswer: 1,
    explanation: "Ground floor U-value calculations must consider the perimeter-to-area ratio (P/A). Heat loss occurs predominantly around the floor perimeter, so buildings with high P/A ratios (small footprints) have higher effective floor U-values."
  },
  {
    id: 12,
    question: "What is the typical psi value for an insulated wall/roof junction with good detailing?",
    options: [
      "0.06 W/mK",
      "0.16 W/mK",
      "0.25 W/mK",
      "0.35 W/mK"
    ],
    correctAnswer: 0,
    explanation: "A well-detailed insulated wall/roof junction typically achieves a psi value around 0.06 W/mK. Poor detailing can result in values of 0.20 W/mK or higher, significantly increasing heat loss at junctions."
  }
];

const faqs = [
  {
    question: "How do U-value calculations affect building services design?",
    answer: "U-values directly determine the building's heat loss, which sizes the heating system. Lower U-values mean smaller boilers, reduced radiator sizes, and lower distribution pipe capacities. For cooling, fabric performance affects peak gains and chiller sizing. Services engineers must understand fabric assumptions to correctly size plant and distribution systems."
  },
  {
    question: "Why is thermal bridging so important in modern construction?",
    answer: "As insulation standards improve and basic U-values decrease, thermal bridges become proportionally more significant. In a well-insulated building, thermal bridges can account for 30-50% of total heat loss. Poor thermal bridge detailing can completely undermine expensive insulation strategies, creating cold spots, condensation risks, and higher than expected energy bills."
  },
  {
    question: "What is the relationship between Part L limiting values and notional building values?",
    answer: "Limiting U-values are absolute backstop values that no element should exceed. Notional building values are the reference values used in the comparison calculation. A compliant building can have individual elements worse than notional values provided it compensates elsewhere, but cannot exceed limiting values. Services design must account for actual values, not notional ones."
  },
  {
    question: "How should I account for thermal bridging when detailed psi values are not available?",
    answer: "Use the default y-value method where thermal bridge heat loss = y × total envelope area. The default y-value is 0.15 W/m²K, which is deliberately conservative to encourage proper detailing. Alternatively, use Accredited Construction Details (ACDs) which provide pre-calculated psi values for standard junctions."
  },
  {
    question: "What causes discrepancies between calculated and actual fabric performance?",
    answer: "Common causes include: poor workmanship leaving gaps in insulation, thermal bridging not accounted for in calculations, moisture ingress reducing insulation effectiveness, air leakage bypassing insulation layers, and specification changes during construction. Thermographic surveys can identify problem areas after completion."
  },
  {
    question: "How do windows affect overall fabric performance calculations?",
    answer: "Windows have much higher U-values than walls (1.2-1.6 W/m²K vs 0.18-0.26 W/m²K) so window area significantly affects total heat loss. The area-weighted average U-value calculation shows that increasing window area raises average wall zone U-value. Services designers must account for actual glazing ratios, not assumptions."
  }
];

const HNCModule6Section1_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module6-section1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centred Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 6.1.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Fabric Performance
          </h1>
          <p className="text-white/80">
            U-value calculations, thermal bridging, limiting fabric parameters, and construction specifications for energy-efficient buildings
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>U-value:</strong> Heat transfer rate through building elements (W/m²K)</li>
              <li className="pl-1"><strong>Thermal bridging:</strong> Junctions where heat loss is increased</li>
              <li className="pl-1"><strong>Psi values:</strong> Linear thermal transmittance (W/mK)</li>
              <li className="pl-1"><strong>Part L:</strong> Limiting and notional U-values for compliance</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Heat loss:</strong> Determines heating system sizing</li>
              <li className="pl-1"><strong>Peak gains:</strong> Affects cooling load calculations</li>
              <li className="pl-1"><strong>Design data:</strong> Essential for SAP/SBEM modelling</li>
              <li className="pl-1"><strong>Compliance:</strong> Part L sets minimum standards</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Calculate U-values for walls, roofs, floors, and windows",
              "Apply Part L limiting fabric parameters correctly",
              "Quantify thermal bridging using psi values and y-values",
              "Specify insulation materials for target U-values",
              "Understand how fabric performance affects services design",
              "Evaluate construction details for thermal bridge mitigation"
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

        {/* Section 1: U-Value Fundamentals */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            U-Value Fundamentals
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The U-value (thermal transmittance) quantifies how effectively a building element prevents
              heat transfer. It represents the rate of heat flow through one square metre of the element
              for each degree of temperature difference between inside and outside air.
            </p>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">U-Value Formula</p>
              <div className="font-mono text-sm space-y-2">
                <p><span className="text-white">U = 1 / R<sub>total</sub></span></p>
                <p><span className="text-white/60">Where:</span></p>
                <p className="ml-4"><span className="text-white">R<sub>total</sub> = R<sub>si</sub> + R<sub>1</sub> + R<sub>2</sub> + ... + R<sub>n</sub> + R<sub>se</sub></span></p>
                <p className="mt-2"><span className="text-white/60">R = d / λ</span> (for each layer)</p>
                <p className="ml-4 text-white/60">d = thickness (m), λ = thermal conductivity (W/mK)</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Surface Resistances (BS EN ISO 6946):</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Surface</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Heat Flow Direction</th>
                      <th className="border border-white/10 px-3 py-2 text-left">R<sub>si</sub> (m²K/W)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">R<sub>se</sub> (m²K/W)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Walls</td>
                      <td className="border border-white/10 px-3 py-2">Horizontal</td>
                      <td className="border border-white/10 px-3 py-2">0.13</td>
                      <td className="border border-white/10 px-3 py-2">0.04</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Roof (ceiling)</td>
                      <td className="border border-white/10 px-3 py-2">Upward</td>
                      <td className="border border-white/10 px-3 py-2">0.10</td>
                      <td className="border border-white/10 px-3 py-2">0.04</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Floor</td>
                      <td className="border border-white/10 px-3 py-2">Downward</td>
                      <td className="border border-white/10 px-3 py-2">0.17</td>
                      <td className="border border-white/10 px-3 py-2">0.04</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Insulation Materials</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Material</th>
                      <th className="border border-white/10 px-3 py-2 text-left">λ (W/mK)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Phenolic foam</td>
                      <td className="border border-white/10 px-3 py-2">0.018-0.022</td>
                      <td className="border border-white/10 px-3 py-2">Where space is limited</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">PIR/PUR rigid foam</td>
                      <td className="border border-white/10 px-3 py-2">0.022-0.028</td>
                      <td className="border border-white/10 px-3 py-2">Flat roofs, wall cavities</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Expanded polystyrene (EPS)</td>
                      <td className="border border-white/10 px-3 py-2">0.032-0.038</td>
                      <td className="border border-white/10 px-3 py-2">Floor insulation, EIFS</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Mineral wool</td>
                      <td className="border border-white/10 px-3 py-2">0.035-0.040</td>
                      <td className="border border-white/10 px-3 py-2">Cavity walls, loft spaces</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key principle:</strong> Lower thermal conductivity (λ) means better insulation - less thickness required to achieve target U-value.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Part L Limiting Parameters */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Part L Limiting Parameters
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Building Regulations Part L sets both limiting U-values (absolute backstop values) and
              notional building values (reference for comparison calculations). Understanding both is
              essential for compliant building services design.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Part L 2021 - Limiting U-Values (New Buildings)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Element</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Dwellings (W/m²K)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Non-Domestic (W/m²K)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">External walls</td>
                      <td className="border border-white/10 px-3 py-2">0.26</td>
                      <td className="border border-white/10 px-3 py-2">0.26</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Roof</td>
                      <td className="border border-white/10 px-3 py-2">0.16</td>
                      <td className="border border-white/10 px-3 py-2">0.16</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Ground floor</td>
                      <td className="border border-white/10 px-3 py-2">0.18</td>
                      <td className="border border-white/10 px-3 py-2">0.18</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Windows/roof windows</td>
                      <td className="border border-white/10 px-3 py-2">1.6</td>
                      <td className="border border-white/10 px-3 py-2">1.6</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Doors</td>
                      <td className="border border-white/10 px-3 py-2">1.6</td>
                      <td className="border border-white/10 px-3 py-2">1.6</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Curtain walling</td>
                      <td className="border border-white/10 px-3 py-2">-</td>
                      <td className="border border-white/10 px-3 py-2">1.6</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Limiting Values</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Absolute maximum - cannot be exceeded</li>
                  <li className="pl-1">Apply to every individual element</li>
                  <li className="pl-1">No trade-off permitted</li>
                  <li className="pl-1">Backstop for worst-case performance</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Notional Values</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Reference for comparison calculation</li>
                  <li className="pl-1">Typically more onerous than limiting</li>
                  <li className="pl-1">Trade-off between elements allowed</li>
                  <li className="pl-1">Must meet TFEE/TER targets overall</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Target Fabric Energy Efficiency (TFEE)</p>
              <p className="text-sm text-white">
                Part L 2021 introduces TFEE for dwellings - a metric measuring fabric performance independent
                of services. The building's Fabric Energy Efficiency (FEE) must not exceed the TFEE calculated
                for the notional building, ensuring fabric performance is not traded off against efficient services.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Services impact:</strong> Better fabric performance reduces heating/cooling loads, allowing smaller plant sizes but must be correctly input to SAP/SBEM for accurate compliance demonstration.
            </p>
          </div>
        </section>

        {/* Section 3: Thermal Bridging */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Thermal Bridging and Psi Values
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Thermal bridges occur where the insulation layer is interrupted or where materials with
              higher thermal conductivity penetrate the building envelope. Quantifying and minimising
              thermal bridging is critical for achieving designed energy performance.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Types of thermal bridges:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Linear (2D):</strong> Junctions between elements - wall/floor, wall/roof, around openings</li>
                <li className="pl-1"><strong>Point (3D):</strong> Penetrations through the envelope - fixings, brackets, services</li>
                <li className="pl-1"><strong>Geometric:</strong> Corners where heat flow concentrates</li>
                <li className="pl-1"><strong>Structural:</strong> Steel or concrete elements bridging insulation</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Psi Value (ψ) - Linear Thermal Transmittance</p>
              <div className="font-mono text-sm space-y-2">
                <p><span className="text-white">Heat loss at junction = ψ × L × ΔT</span></p>
                <p className="text-white/60">Where:</p>
                <p className="ml-4 text-white/80">ψ = psi value (W/mK)</p>
                <p className="ml-4 text-white/80">L = length of junction (m)</p>
                <p className="ml-4 text-white/80">ΔT = temperature difference (K)</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Psi Values</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Junction Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Good Detail (W/mK)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Poor Detail (W/mK)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Wall/floor (ground)</td>
                      <td className="border border-white/10 px-3 py-2">0.05 - 0.10</td>
                      <td className="border border-white/10 px-3 py-2">0.30 - 0.50</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Wall/roof (eaves)</td>
                      <td className="border border-white/10 px-3 py-2">0.04 - 0.08</td>
                      <td className="border border-white/10 px-3 py-2">0.20 - 0.35</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Window jamb</td>
                      <td className="border border-white/10 px-3 py-2">0.02 - 0.05</td>
                      <td className="border border-white/10 px-3 py-2">0.10 - 0.15</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Corner (external)</td>
                      <td className="border border-white/10 px-3 py-2">0.02 - 0.05</td>
                      <td className="border border-white/10 px-3 py-2">0.08 - 0.15</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Lintel</td>
                      <td className="border border-white/10 px-3 py-2">0.05 - 0.12</td>
                      <td className="border border-white/10 px-3 py-2">0.25 - 0.50</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Total Heat Loss from Thermal Bridges</p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>H<sub>TB</sub> = Σ(ψ × L) + Σ(χ × n)</p>
                <p className="mt-2 text-white/60">Or using y-value method:</p>
                <p>H<sub>TB</sub> = y × A<sub>exp</sub></p>
                <p className="mt-2">Where:</p>
                <p className="ml-4">χ = chi value for point thermal bridges (W/K)</p>
                <p className="ml-4">n = number of point thermal bridges</p>
                <p className="ml-4">y = aggregate y-value (W/m²K)</p>
                <p className="ml-4">A<sub>exp</sub> = total exposed envelope area (m²)</p>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Default y-value:</strong> If detailed psi calculations are not available, SAP/SBEM uses y = 0.15 W/m²K - a significant penalty that can add 15-20% to fabric heat loss.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Construction Specifications */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Construction Specifications and Services Impact
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Specifying fabric performance requires understanding construction build-ups, material
              properties, and their interaction with building services. Services engineers must interpret
              fabric specifications to correctly size systems and detail penetrations.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">External Wall Build-Up</p>
                <ul className="text-sm text-white space-y-1.5">
                  <li>13mm plasterboard (0.21 W/mK)</li>
                  <li>100mm insulated timber frame (0.035 W/mK)</li>
                  <li>12mm sheathing board (0.13 W/mK)</li>
                  <li>50mm cavity (vented)</li>
                  <li>102.5mm facing brick (0.77 W/mK)</li>
                  <li className="mt-2 text-elec-yellow/70">Target U-value: 0.18 W/m²K</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Flat Roof Build-Up</p>
                <ul className="text-sm text-white space-y-1.5">
                  <li>Single-ply membrane</li>
                  <li>150mm PIR insulation (0.022 W/mK)</li>
                  <li>Vapour control layer</li>
                  <li>18mm plywood deck</li>
                  <li>Timber joists/steel structure</li>
                  <li className="mt-2 text-elec-yellow/70">Target U-value: 0.14 W/m²K</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Impact on Building Services Design</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Fabric Parameter</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Services Impact</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Design Consideration</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Wall U-value</td>
                      <td className="border border-white/10 px-3 py-2">Heating/cooling load</td>
                      <td className="border border-white/10 px-3 py-2">Lower U = smaller radiators/FCUs</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Roof U-value</td>
                      <td className="border border-white/10 px-3 py-2">Peak summer gains</td>
                      <td className="border border-white/10 px-3 py-2">Solar gain through roof affects cooling</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Window U-value</td>
                      <td className="border border-white/10 px-3 py-2">Perimeter heating, cold spots</td>
                      <td className="border border-white/10 px-3 py-2">Higher glazing = more perimeter capacity</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Thermal mass</td>
                      <td className="border border-white/10 px-3 py-2">Control strategy, peak shifting</td>
                      <td className="border border-white/10 px-3 py-2">Heavy buildings suit night cooling</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Air permeability</td>
                      <td className="border border-white/10 px-3 py-2">Ventilation strategy</td>
                      <td className="border border-white/10 px-3 py-2">Tight buildings need MVHR</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Services Penetrations - Thermal Bridge Mitigation</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Ductwork:</strong> Insulate ducts through envelope, seal around penetrations</li>
                <li className="pl-1"><strong>Pipework:</strong> Use proprietary thermal break sleeves where passing through insulation</li>
                <li className="pl-1"><strong>Cables:</strong> Seal with intumescent mastic, maintain insulation continuity</li>
                <li className="pl-1"><strong>Flue penetrations:</strong> Purpose-made insulated flashings, maintain clearances</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Coordination critical:</strong> Services routes should be planned to minimise envelope penetrations - each penetration creates a potential thermal bridge and air leakage path.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Wall U-Value Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Calculate the U-value for a cavity wall construction.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Construction (inside to outside):</p>
                <p className="ml-4">- 13mm plasterboard (λ = 0.21 W/mK)</p>
                <p className="ml-4">- 100mm blockwork (λ = 0.15 W/mK)</p>
                <p className="ml-4">- 100mm mineral wool insulation (λ = 0.035 W/mK)</p>
                <p className="ml-4">- 102.5mm facing brick (λ = 0.77 W/mK)</p>
                <p className="mt-2">Calculate thermal resistances:</p>
                <p className="ml-4">R<sub>si</sub> = 0.13 m²K/W</p>
                <p className="ml-4">R<sub>plaster</sub> = 0.013 / 0.21 = 0.062 m²K/W</p>
                <p className="ml-4">R<sub>block</sub> = 0.100 / 0.15 = 0.667 m²K/W</p>
                <p className="ml-4">R<sub>insulation</sub> = 0.100 / 0.035 = 2.857 m²K/W</p>
                <p className="ml-4">R<sub>brick</sub> = 0.1025 / 0.77 = 0.133 m²K/W</p>
                <p className="ml-4">R<sub>se</sub> = 0.04 m²K/W</p>
                <p className="mt-2">R<sub>total</sub> = 0.13 + 0.062 + 0.667 + 2.857 + 0.133 + 0.04</p>
                <p className="ml-4">R<sub>total</sub> = 3.889 m²K/W</p>
                <p className="mt-2 text-green-400">U = 1 / 3.889 = 0.257 W/m²K</p>
                <p className="text-orange-400">Result: Just exceeds 0.26 limiting value - needs improvement</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Thermal Bridging Impact</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Calculate total heat loss including thermal bridges for a small dwelling.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Building data:</p>
                <p className="ml-4">- Total exposed envelope area: 250 m²</p>
                <p className="ml-4">- Wall area: 120 m² (U = 0.20 W/m²K)</p>
                <p className="ml-4">- Roof area: 80 m² (U = 0.14 W/m²K)</p>
                <p className="ml-4">- Floor area: 50 m² (U = 0.15 W/m²K)</p>
                <p className="mt-2">Junction lengths and psi values:</p>
                <p className="ml-4">- Wall/floor: 40m × 0.08 W/mK = 3.2 W/K</p>
                <p className="ml-4">- Wall/roof: 40m × 0.06 W/mK = 2.4 W/K</p>
                <p className="ml-4">- Corners: 24m × 0.04 W/mK = 0.96 W/K</p>
                <p className="ml-4">- Window reveals: 48m × 0.05 W/mK = 2.4 W/K</p>
                <p className="mt-2">Fabric heat loss:</p>
                <p className="ml-4">H<sub>fabric</sub> = (120×0.20) + (80×0.14) + (50×0.15)</p>
                <p className="ml-4">H<sub>fabric</sub> = 24 + 11.2 + 7.5 = 42.7 W/K</p>
                <p className="mt-2">Thermal bridge heat loss:</p>
                <p className="ml-4">H<sub>TB</sub> = 3.2 + 2.4 + 0.96 + 2.4 = 8.96 W/K</p>
                <p className="mt-2 text-green-400">Total H = 42.7 + 8.96 = 51.66 W/K</p>
                <p className="text-orange-400">Thermal bridges add 21% to fabric heat loss!</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Insulation Thickness Selection</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Determine insulation thickness required to achieve U = 0.14 W/m²K for a flat roof.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Target U-value: 0.14 W/m²K</p>
                <p>Required R<sub>total</sub> = 1 / 0.14 = 7.14 m²K/W</p>
                <p className="mt-2">Known resistances:</p>
                <p className="ml-4">R<sub>si</sub> = 0.10 m²K/W</p>
                <p className="ml-4">R<sub>deck</sub> (18mm plywood) = 0.018/0.13 = 0.138 m²K/W</p>
                <p className="ml-4">R<sub>membrane</sub> = negligible</p>
                <p className="ml-4">R<sub>se</sub> = 0.04 m²K/W</p>
                <p className="mt-2">Resistance required from insulation:</p>
                <p className="ml-4">R<sub>ins</sub> = 7.14 - 0.10 - 0.138 - 0.04 = 6.86 m²K/W</p>
                <p className="mt-2">Using PIR insulation (λ = 0.022 W/mK):</p>
                <p className="ml-4">Thickness = R × λ = 6.86 × 0.022 = 0.151m</p>
                <p className="mt-2 text-green-400">Required: 160mm PIR insulation (rounded up)</p>
                <p className="text-white/60">Alternatively, 200mm mineral wool (λ=0.035) would give similar R-value</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">U-Value Calculation Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Identify all layers from inside to outside</li>
                <li className="pl-1">Obtain thermal conductivity (λ) for each material</li>
                <li className="pl-1">Calculate resistance of each layer (R = d/λ)</li>
                <li className="pl-1">Add appropriate surface resistances (Rsi, Rse)</li>
                <li className="pl-1">Sum all resistances for Rtotal</li>
                <li className="pl-1">Calculate U = 1/Rtotal and compare to limiting values</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Wall Rsi: <strong>0.13 m²K/W</strong>, Rse: <strong>0.04 m²K/W</strong></li>
                <li className="pl-1">Limiting U-value walls: <strong>0.26 W/m²K</strong></li>
                <li className="pl-1">Limiting U-value roofs: <strong>0.16 W/m²K</strong></li>
                <li className="pl-1">Default y-value: <strong>0.15 W/m²K</strong></li>
                <li className="pl-1">PIR conductivity: <strong>0.022-0.028 W/mK</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Forgetting surface resistances</strong> - Always include Rsi and Rse</li>
                <li className="pl-1"><strong>Using wrong λ values</strong> - Check actual product data, not generic values</li>
                <li className="pl-1"><strong>Ignoring thermal bridges</strong> - Can add 20%+ to heat loss</li>
                <li className="pl-1"><strong>Confusing limiting and notional values</strong> - Know the difference</li>
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
                <p className="font-medium text-white mb-1">Part L 2021 Limiting U-Values</p>
                <ul className="space-y-0.5">
                  <li>Walls: 0.26 W/m²K</li>
                  <li>Roofs: 0.16 W/m²K</li>
                  <li>Floors: 0.18 W/m²K</li>
                  <li>Windows/doors: 1.6 W/m²K</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Surface Resistances (Walls)</p>
                <ul className="space-y-0.5">
                  <li>Internal (Rsi): 0.13 m²K/W</li>
                  <li>External (Rse): 0.04 m²K/W</li>
                  <li>Formula: R = d / λ</li>
                  <li>U-value: U = 1 / Rtotal</li>
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
            <Link to="../h-n-c-module6-section1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module6-section1-4">
              Next: Airtightness and Ventilation
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule6Section1_3;
