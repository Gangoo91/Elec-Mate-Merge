import { ArrowLeft, Thermometer, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "U-Values and Thermal Resistance - HNC Module 2 Section 1.4";
const DESCRIPTION = "Master U-value calculations and thermal resistance for building services: understanding heat loss through building elements, composite constructions, and Part L compliance.";

const quickCheckQuestions = [
  {
    id: "u-value-definition",
    question: "What does a U-value of 0.18 W/m²K mean?",
    options: ["The wall stores 0.18 watts of heat", "0.18 watts pass through each m² for every 1K temperature difference", "The wall has 0.18 m² of thermal resistance", "The surface temperature is 0.18K above ambient"],
    correctIndex: 1,
    explanation: "U-value represents the rate of heat transfer through a building element. 0.18 W/m²K means 0.18 watts of heat energy passes through each square metre of the element for every 1 Kelvin (or 1°C) temperature difference between inside and outside."
  },
  {
    id: "r-value-relationship",
    question: "What is the relationship between U-value and total thermal resistance (RT)?",
    options: ["U = RT × 2", "U = 1/RT", "U = RT + Rsi + Rse", "U = RT²"],
    correctIndex: 1,
    explanation: "U-value is the reciprocal of total thermal resistance: U = 1/RT. This means higher thermal resistance gives lower U-values (better insulation). RT includes all layer resistances plus surface resistances."
  },
  {
    id: "surface-resistance",
    question: "What is the typical internal surface resistance (Rsi) for walls?",
    options: ["0.04 m²K/W", "0.10 m²K/W", "0.13 m²K/W", "0.17 m²K/W"],
    correctIndex: 2,
    explanation: "The internal surface resistance (Rsi) for walls is 0.13 m²K/W. This accounts for the thin layer of still air at the surface and radiative heat transfer. External surface resistance (Rse) is typically 0.04 m²K/W due to wind effects."
  },
  {
    id: "part-l-wall",
    question: "What is the limiting U-value for new external walls under Part L 2021?",
    options: ["0.18 W/m²K", "0.26 W/m²K", "0.30 W/m²K", "0.35 W/m²K"],
    correctIndex: 1,
    explanation: "Part L 2021 (Conservation of fuel and power) sets a limiting U-value of 0.26 W/m²K for new external walls. This is a maximum - notional building specifications often target better values around 0.18 W/m²K."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the SI unit of U-value?",
    options: [
      "m²K/W",
      "W/m²K",
      "W/mK",
      "J/m²K"
    ],
    correctAnswer: 1,
    explanation: "U-value is measured in W/m²K (Watts per square metre per Kelvin). This represents the rate of heat transfer through 1m² of the element per degree temperature difference."
  },
  {
    id: 2,
    question: "A wall has a total thermal resistance of 5.0 m²K/W. What is its U-value?",
    options: ["0.10 W/m²K", "0.20 W/m²K", "0.50 W/m²K", "5.0 W/m²K"],
    correctAnswer: 1,
    explanation: "U = 1/RT = 1/5.0 = 0.20 W/m²K. The U-value is simply the reciprocal of the total thermal resistance."
  },
  {
    id: 3,
    question: "How is the thermal resistance of a single homogeneous layer calculated?",
    options: ["R = λ × d", "R = d/λ", "R = λ/d", "R = d + λ"],
    correctAnswer: 1,
    explanation: "R = d/λ where d is thickness in metres and λ (lambda) is thermal conductivity in W/mK. A thicker layer or lower conductivity gives higher resistance."
  },
  {
    id: 4,
    question: "Which building element typically has the worst (highest) U-value?",
    options: ["Insulated cavity wall", "Ground floor slab", "Windows", "Flat roof"],
    correctAnswer: 2,
    explanation: "Windows typically have the highest U-values, often 1.4-2.0 W/m²K for double glazing. Even triple glazing rarely achieves below 0.8 W/m²K. This makes glazing a significant source of heat loss."
  },
  {
    id: 5,
    question: "What is the thermal conductivity (λ) of typical mineral wool insulation?",
    options: ["0.022 W/mK", "0.035 W/mK", "0.18 W/mK", "1.0 W/mK"],
    correctAnswer: 1,
    explanation: "Mineral wool has a thermal conductivity of approximately 0.035-0.040 W/mK. PIR/PUR foam boards are better at around 0.022 W/mK. Lower values indicate better insulating properties."
  },
  {
    id: 6,
    question: "A 100mm layer of insulation has λ = 0.040 W/mK. What is its thermal resistance?",
    options: ["0.4 m²K/W", "2.5 m²K/W", "4.0 m²K/W", "40 m²K/W"],
    correctAnswer: 1,
    explanation: "R = d/λ = 0.100/0.040 = 2.5 m²K/W. Always convert thickness to metres before calculating."
  },
  {
    id: 7,
    question: "What does Rse represent in U-value calculations?",
    options: [
      "Structural element resistance",
      "External surface resistance",
      "Secondary element resistance",
      "Solar exposure resistance"
    ],
    correctAnswer: 1,
    explanation: "Rse is the external surface resistance, accounting for the boundary layer effect and radiative heat transfer at the outside surface. Standard value is 0.04 m²K/W for exposed surfaces."
  },
  {
    id: 8,
    question: "A wall has layers with R-values of 0.13, 0.45, 2.50, 0.10, and 0.04 m²K/W. What is the U-value?",
    options: ["0.28 W/m²K", "0.31 W/m²K", "0.35 W/m²K", "3.22 W/m²K"],
    correctAnswer: 1,
    explanation: "RT = 0.13 + 0.45 + 2.50 + 0.10 + 0.04 = 3.22 m²K/W. U = 1/RT = 1/3.22 = 0.31 W/m²K"
  },
  {
    id: 9,
    question: "What is the Part L 2021 limiting U-value for flat roofs?",
    options: ["0.11 W/m²K", "0.16 W/m²K", "0.18 W/m²K", "0.25 W/m²K"],
    correctAnswer: 2,
    explanation: "Part L 2021 sets a limiting U-value of 0.18 W/m²K for flat roofs. Pitched roofs have the same limit. These are maximum allowable values - better performance is often required to meet overall building targets."
  },
  {
    id: 10,
    question: "Why is thermal bridging important in U-value assessments?",
    options: [
      "It improves the overall insulation performance",
      "It creates localised areas of higher heat loss",
      "It is required for structural integrity",
      "It reduces condensation risk"
    ],
    correctAnswer: 1,
    explanation: "Thermal bridges (cold bridges) are localised areas where heat bypasses insulation, creating higher heat loss and potential condensation. Common at junctions, around windows, and where structural elements penetrate insulation."
  },
  {
    id: 11,
    question: "An office wall is 50m² with U = 0.25 W/m²K. Inside temp is 21°C, outside is 1°C. What is the heat loss rate?",
    options: ["125 W", "250 W", "500 W", "1000 W"],
    correctAnswer: 1,
    explanation: "Q = U × A × ΔT = 0.25 × 50 × (21-1) = 0.25 × 50 × 20 = 250 W. This is the continuous rate of heat loss through this wall section."
  },
  {
    id: 12,
    question: "What R-value should be used for an unventilated cavity 25mm or greater?",
    options: ["0.04 m²K/W", "0.09 m²K/W", "0.18 m²K/W", "0.25 m²K/W"],
    correctAnswer: 2,
    explanation: "An unventilated air cavity 25mm or greater has a thermal resistance of 0.18 m²K/W. This is due to still air being a reasonable insulator. Ventilated cavities have lower R-values due to air movement."
  }
];

const faqs = [
  {
    question: "What is the difference between U-value and R-value?",
    answer: "U-value measures overall heat transfer rate through a complete building element (W/m²K) - lower is better. R-value measures thermal resistance of individual layers or the total construction (m²K/W) - higher is better. They are reciprocals: U = 1/R. U-values are used for whole elements and building regulations; R-values are used in calculations to add up layer resistances."
  },
  {
    question: "Why do windows have such poor U-values compared to walls?",
    answer: "Glass has very high thermal conductivity (around 1.0 W/mK) and is typically only 4-6mm thick, giving minimal resistance. Double glazing improves this by trapping an insulating gas layer, achieving around 1.4 W/m²K. Triple glazing with low-e coatings and argon fill can reach 0.8 W/m²K, but this is still much worse than an insulated wall at 0.18-0.26 W/m²K."
  },
  {
    question: "How do I account for thermal bridging in calculations?",
    answer: "Thermal bridges require separate assessment using linear thermal transmittance (psi values, ψ) measured in W/mK. These are added to the basic element heat loss. Part L requires either accredited construction details (ACDs) with tabulated psi values, or numerical modelling. Common thermal bridges include window reveals, wall/floor junctions, and steel lintels penetrating insulation."
  },
  {
    question: "What happens if I exceed Part L limiting U-values?",
    answer: "Limiting U-values are maximum allowable values that cannot be exceeded for any individual element. If a wall exceeds 0.26 W/m²K, it fails compliance regardless of other building performance. However, meeting limiting values alone doesn't guarantee Part L compliance - the overall building must also meet target CO2 emission rates calculated using SAP or SBEM software."
  },
  {
    question: "How do I calculate U-values for ground floors?",
    answer: "Ground floors are more complex because heat flows through the ground, not directly to outside air. The calculation uses the floor perimeter-to-area ratio (P/A) and includes the thermal resistance of the ground itself. BS EN ISO 13370 provides the methodology. Typically, larger floors have better effective U-values because heat must travel further through the ground."
  },
  {
    question: "What is the difference between design U-value and in-situ U-value?",
    answer: "Design U-values are calculated from material properties assuming perfect construction. In-situ U-values are measured on completed buildings using heat flux sensors and often show 20-100% higher heat loss due to installation gaps, thermal bridging, moisture, and workmanship issues. This 'performance gap' is a significant industry concern."
  }
];

const HNCModule2Section1_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module2-section1">
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
            <Thermometer className="h-4 w-4" />
            <span>Module 2.1.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            U-Values and Thermal Resistance
          </h1>
          <p className="text-white/80">
            Understanding heat transfer through building elements for energy-efficient design and Part L compliance
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>U-value:</strong> Rate of heat loss through an element (W/m²K)</li>
              <li className="pl-1"><strong>R-value:</strong> Thermal resistance of materials (m²K/W)</li>
              <li className="pl-1"><strong>Relationship:</strong> U = 1/RT (reciprocals)</li>
              <li className="pl-1"><strong>Lower U-value = Better insulation</strong></li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Part L compliance:</strong> Limiting U-values for elements</li>
              <li className="pl-1"><strong>Heat loss calculations:</strong> Q = U × A × ΔT</li>
              <li className="pl-1"><strong>HVAC sizing:</strong> Based on fabric heat loss</li>
              <li className="pl-1"><strong>Energy performance:</strong> EPC ratings and SAP</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Define U-value and thermal resistance with correct SI units",
              "Calculate R-values for individual material layers",
              "Determine U-values for composite wall constructions",
              "Apply surface resistance values (Rsi and Rse)",
              "Understand Part L limiting U-values for building elements",
              "Calculate fabric heat loss for HVAC system sizing"
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
            U-Value Definition and Significance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The U-value (thermal transmittance) measures how effectively a building element transfers heat.
              It represents the rate of heat flow through one square metre of the element for each degree
              of temperature difference between inside and outside.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">U-Value Definition</p>
              <p className="font-mono text-center text-lg mb-2">U = Heat flow rate / (Area × Temperature difference)</p>
              <p className="text-xs text-white/70 text-center">Unit: W/m²K (Watts per square metre per Kelvin)</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key principles of U-values:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Lower is better:</strong> A U-value of 0.15 W/m²K loses less heat than 0.30 W/m²K</li>
                <li className="pl-1"><strong>Whole element:</strong> Includes all layers, air gaps, and surface effects</li>
                <li className="pl-1"><strong>Steady-state:</strong> Assumes constant temperatures (not transient behaviour)</li>
                <li className="pl-1"><strong>Perpendicular flow:</strong> Measures heat flow through the element, not along it</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical U-Values for Building Elements</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Element</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical U-value</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Quality</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Solid brick wall (uninsulated)</td>
                      <td className="border border-white/10 px-3 py-2">2.0 W/m²K</td>
                      <td className="border border-white/10 px-3 py-2 text-red-400">Very poor</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cavity wall (unfilled)</td>
                      <td className="border border-white/10 px-3 py-2">1.5 W/m²K</td>
                      <td className="border border-white/10 px-3 py-2 text-red-400">Poor</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cavity wall (filled)</td>
                      <td className="border border-white/10 px-3 py-2">0.5 W/m²K</td>
                      <td className="border border-white/10 px-3 py-2 text-yellow-400">Moderate</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Modern insulated wall</td>
                      <td className="border border-white/10 px-3 py-2">0.18-0.25 W/m²K</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">Good</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Passivhaus wall</td>
                      <td className="border border-white/10 px-3 py-2">0.10-0.15 W/m²K</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">Excellent</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Double glazed window</td>
                      <td className="border border-white/10 px-3 py-2">1.4-2.0 W/m²K</td>
                      <td className="border border-white/10 px-3 py-2 text-yellow-400">Moderate</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Triple glazed window</td>
                      <td className="border border-white/10 px-3 py-2">0.8-1.2 W/m²K</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">Good</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> U-values are used directly in heat loss calculations: Q = U × A × ΔT (Watts)
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Thermal Resistance */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Thermal Resistance (R-Values)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Thermal resistance (R-value) measures how well a material or layer resists heat flow.
              Unlike U-values, R-values can be simply added together when calculating total resistance
              of multi-layer constructions.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">R-Value Calculation</p>
              <p className="font-mono text-center text-lg mb-2">R = d / λ</p>
              <p className="text-xs text-white/70 text-center">Where d = thickness (m), λ = thermal conductivity (W/mK)</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key facts about thermal resistance:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Higher is better:</strong> More resistance = less heat flow</li>
                <li className="pl-1"><strong>Additive:</strong> R-values of layers simply add together</li>
                <li className="pl-1"><strong>Unit:</strong> m²K/W (square metres Kelvin per Watt)</li>
                <li className="pl-1"><strong>Reciprocal of U:</strong> For the whole element, U = 1/RT</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Thermal Conductivity of Common Materials</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Material</th>
                      <th className="border border-white/10 px-3 py-2 text-left">λ (W/mK)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">R per 100mm</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">PIR/PUR foam board</td>
                      <td className="border border-white/10 px-3 py-2">0.022</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">4.55 m²K/W</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Phenolic foam</td>
                      <td className="border border-white/10 px-3 py-2">0.020</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">5.00 m²K/W</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Mineral wool</td>
                      <td className="border border-white/10 px-3 py-2">0.035-0.040</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">2.50-2.86 m²K/W</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">EPS (expanded polystyrene)</td>
                      <td className="border border-white/10 px-3 py-2">0.032-0.038</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">2.63-3.13 m²K/W</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Aerated concrete block</td>
                      <td className="border border-white/10 px-3 py-2">0.11</td>
                      <td className="border border-white/10 px-3 py-2 text-yellow-400">0.91 m²K/W</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Dense concrete block</td>
                      <td className="border border-white/10 px-3 py-2">1.13</td>
                      <td className="border border-white/10 px-3 py-2 text-red-400">0.09 m²K/W</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Brick</td>
                      <td className="border border-white/10 px-3 py-2">0.77</td>
                      <td className="border border-white/10 px-3 py-2 text-red-400">0.13 m²K/W</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Plasterboard</td>
                      <td className="border border-white/10 px-3 py-2">0.21</td>
                      <td className="border border-white/10 px-3 py-2 text-yellow-400">0.48 m²K/W</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Glass</td>
                      <td className="border border-white/10 px-3 py-2">1.00</td>
                      <td className="border border-white/10 px-3 py-2 text-red-400">0.10 m²K/W</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key insight:</strong> Insulation materials have λ values below 0.045 W/mK. The lower the conductivity, the better the insulator.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Composite Construction Calculations */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Calculating U-Values for Composite Constructions
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Real building elements comprise multiple layers. To find the U-value, calculate the
              thermal resistance of each layer, add them together with surface resistances,
              then take the reciprocal.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">U-Value Calculation Method</p>
              <div className="space-y-2 text-sm">
                <p className="font-mono">R<sub>T</sub> = R<sub>si</sub> + R<sub>1</sub> + R<sub>2</sub> + ... + R<sub>n</sub> + R<sub>se</sub></p>
                <p className="font-mono">U = 1 / R<sub>T</sub></p>
              </div>
              <p className="text-xs text-white/70 mt-2">Where Rsi = internal surface resistance, Rse = external surface resistance</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Surface Resistances (Standard Values)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Rsi (internal wall):</strong> 0.13 m²K/W</li>
                  <li className="pl-1"><strong>Rse (external):</strong> 0.04 m²K/W</li>
                  <li className="pl-1"><strong>Rsi (ceiling - upward):</strong> 0.10 m²K/W</li>
                  <li className="pl-1"><strong>Rsi (floor - downward):</strong> 0.17 m²K/W</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Air Cavity Resistances</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Unventilated ≥25mm:</strong> 0.18 m²K/W</li>
                  <li className="pl-1"><strong>Unventilated 5mm:</strong> 0.11 m²K/W</li>
                  <li className="pl-1"><strong>Slightly ventilated:</strong> 0.09 m²K/W</li>
                  <li className="pl-1"><strong>Highly ventilated:</strong> 0.00 m²K/W</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Worked Example: Cavity Wall U-Value</h3>
              <p className="text-sm text-white mb-3">
                Calculate U-value for: 102mm brick | 50mm cavity | 100mm insulated block | 12.5mm plasterboard
              </p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Layer</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Thickness</th>
                      <th className="border border-white/10 px-3 py-2 text-left">λ (W/mK)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">R (m²K/W)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">External surface (Rse)</td>
                      <td className="border border-white/10 px-3 py-2">-</td>
                      <td className="border border-white/10 px-3 py-2">-</td>
                      <td className="border border-white/10 px-3 py-2">0.04</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Brick outer leaf</td>
                      <td className="border border-white/10 px-3 py-2">102mm</td>
                      <td className="border border-white/10 px-3 py-2">0.77</td>
                      <td className="border border-white/10 px-3 py-2">0.13</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cavity (mineral wool filled)</td>
                      <td className="border border-white/10 px-3 py-2">50mm</td>
                      <td className="border border-white/10 px-3 py-2">0.035</td>
                      <td className="border border-white/10 px-3 py-2">1.43</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Aerated concrete block</td>
                      <td className="border border-white/10 px-3 py-2">100mm</td>
                      <td className="border border-white/10 px-3 py-2">0.11</td>
                      <td className="border border-white/10 px-3 py-2">0.91</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Plasterboard</td>
                      <td className="border border-white/10 px-3 py-2">12.5mm</td>
                      <td className="border border-white/10 px-3 py-2">0.21</td>
                      <td className="border border-white/10 px-3 py-2">0.06</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Internal surface (Rsi)</td>
                      <td className="border border-white/10 px-3 py-2">-</td>
                      <td className="border border-white/10 px-3 py-2">-</td>
                      <td className="border border-white/10 px-3 py-2">0.13</td>
                    </tr>
                    <tr className="bg-white/5 font-medium">
                      <td className="border border-white/10 px-3 py-2" colSpan={3}>Total RT</td>
                      <td className="border border-white/10 px-3 py-2 text-elec-yellow">2.70</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-white mt-3">
                <strong>U-value = 1/RT = 1/2.70 = <span className="text-elec-yellow">0.37 W/m²K</span></strong>
              </p>
              <p className="text-xs text-red-400 mt-2">Note: This exceeds Part L limiting value of 0.26 W/m²K - additional insulation required</p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design tip:</strong> Calculate required insulation thickness by working backwards from target U-value to find needed R-value.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Part L and Building Services Applications */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Part L Requirements and Building Services Applications
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Part L of the Building Regulations sets standards for conservation of fuel and power.
              U-values are fundamental to demonstrating compliance and are essential for sizing
              HVAC systems accurately.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Part L 2021 Limiting U-Values (England)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Element</th>
                      <th className="border border-white/10 px-3 py-2 text-left">New Build Limit</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Extension/Renovation</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">External walls</td>
                      <td className="border border-white/10 px-3 py-2">0.26 W/m²K</td>
                      <td className="border border-white/10 px-3 py-2">0.30 W/m²K</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Pitched roof (insulation at ceiling)</td>
                      <td className="border border-white/10 px-3 py-2">0.16 W/m²K</td>
                      <td className="border border-white/10 px-3 py-2">0.16 W/m²K</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Pitched roof (insulation at rafter)</td>
                      <td className="border border-white/10 px-3 py-2">0.18 W/m²K</td>
                      <td className="border border-white/10 px-3 py-2">0.18 W/m²K</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Flat roof</td>
                      <td className="border border-white/10 px-3 py-2">0.18 W/m²K</td>
                      <td className="border border-white/10 px-3 py-2">0.18 W/m²K</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Ground floor</td>
                      <td className="border border-white/10 px-3 py-2">0.18 W/m²K</td>
                      <td className="border border-white/10 px-3 py-2">0.25 W/m²K</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Windows, roof windows, doors</td>
                      <td className="border border-white/10 px-3 py-2">1.6 W/m²K</td>
                      <td className="border border-white/10 px-3 py-2">1.6 W/m²K</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Swimming pool basin</td>
                      <td className="border border-white/10 px-3 py-2">0.25 W/m²K</td>
                      <td className="border border-white/10 px-3 py-2">0.25 W/m²K</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Heat Loss Calculation for HVAC Sizing</p>
              <p className="font-mono text-center text-lg mb-2">Q<sub>fabric</sub> = Σ(U × A × ΔT)</p>
              <p className="text-xs text-white/70 text-center">Where Q = heat loss (W), A = area (m²), ΔT = temperature difference (K)</p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Worked Example: Room Heat Loss</h3>
              <p className="text-sm text-white mb-3">
                Calculate fabric heat loss for an office: 5m × 4m, ceiling height 2.7m, one external wall with window
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="mb-2"><strong>Given:</strong></p>
                <p>- External wall: 5m × 2.7m = 13.5m², U = 0.25 W/m²K</p>
                <p>- Window in wall: 2m × 1.2m = 2.4m², U = 1.4 W/m²K</p>
                <p>- Net wall area: 13.5 - 2.4 = 11.1m²</p>
                <p>- Internal temp: 21°C, External temp: -3°C, ΔT = 24K</p>
                <p className="mt-3 mb-2"><strong>Calculation:</strong></p>
                <p>Wall loss: Q = 0.25 × 11.1 × 24 = <strong>66.6 W</strong></p>
                <p>Window loss: Q = 1.4 × 2.4 × 24 = <strong>80.6 W</strong></p>
                <p className="mt-2 text-elec-yellow">Total fabric loss = 66.6 + 80.6 = <strong>147.2 W</strong></p>
                <p className="mt-3 text-white/60">Note: Total heating load also includes ventilation heat loss and internal gains</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-red-400/80 mb-2">Thermal Bridging Considerations</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Window reveals:</strong> Insulation must wrap around to prevent cold spots</li>
                <li className="pl-1"><strong>Wall-floor junctions:</strong> Perimeter insulation critical</li>
                <li className="pl-1"><strong>Structural elements:</strong> Steel beams penetrating insulation layer</li>
                <li className="pl-1"><strong>Service penetrations:</strong> Pipes and cables through external envelope</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Building services impact:</strong> Better U-values reduce heating/cooling loads, allowing smaller HVAC systems, lower energy consumption, and reduced carbon emissions.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Insulation Thickness Required</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A wall needs to achieve U = 0.20 W/m²K. Current layers give RT = 1.2 m²K/W. What thickness of PIR insulation (λ = 0.022 W/mK) is needed?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Target RT = 1/U = 1/0.20 = 5.0 m²K/W</p>
                <p>Additional R needed = 5.0 - 1.2 = 3.8 m²K/W</p>
                <p className="mt-2">Using R = d/λ, rearranging: d = R × λ</p>
                <p>d = 3.8 × 0.022 = 0.0836m = <strong>84mm</strong></p>
                <p className="mt-2 text-white/60">→ Specify 90mm PIR board (standard size)</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Roof U-Value Check</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Flat roof construction: 150mm concrete deck | 120mm PIR | waterproof membrane. Does it meet Part L?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Rsi (ceiling, upward flow) = 0.10 m²K/W</p>
                <p>Concrete (λ = 1.13): R = 0.150/1.13 = 0.13 m²K/W</p>
                <p>PIR (λ = 0.022): R = 0.120/0.022 = 5.45 m²K/W</p>
                <p>Membrane: negligible</p>
                <p>Rse = 0.04 m²K/W</p>
                <p className="mt-2">RT = 0.10 + 0.13 + 5.45 + 0.04 = 5.72 m²K/W</p>
                <p className="mt-2">U = 1/5.72 = <strong>0.175 W/m²K</strong></p>
                <p className="mt-2 text-green-400">✓ Meets Part L limit of 0.18 W/m²K for flat roofs</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Total Building Heat Loss</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Calculate total fabric heat loss for a small office building. ΔT = 24K.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p><strong>Building elements:</strong></p>
                <p>Walls: 200m² at U = 0.25 W/m²K</p>
                <p>Windows: 40m² at U = 1.4 W/m²K</p>
                <p>Roof: 150m² at U = 0.18 W/m²K</p>
                <p>Floor: 150m² at U = 0.20 W/m²K</p>
                <p className="mt-3"><strong>Heat loss calculation:</strong></p>
                <p>Walls: 0.25 × 200 × 24 = 1,200 W</p>
                <p>Windows: 1.4 × 40 × 24 = 1,344 W</p>
                <p>Roof: 0.18 × 150 × 24 = 648 W</p>
                <p>Floor: 0.20 × 150 × 24 = 720 W</p>
                <p className="mt-2 text-elec-yellow"><strong>Total fabric loss = 3,912 W (3.9 kW)</strong></p>
                <p className="mt-2 text-white/60">→ Add ventilation loss (~2-3 kW) for total heating load</p>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Essential Formulas</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>R = d/λ</strong> — Thermal resistance of a layer</li>
                <li className="pl-1"><strong>RT = Rsi + ΣR + Rse</strong> — Total thermal resistance</li>
                <li className="pl-1"><strong>U = 1/RT</strong> — U-value from total resistance</li>
                <li className="pl-1"><strong>Q = U × A × ΔT</strong> — Heat loss through element</li>
                <li className="pl-1"><strong>d = R × λ</strong> — Required insulation thickness</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Rsi (walls): <strong>0.13 m²K/W</strong></li>
                <li className="pl-1">Rse (external): <strong>0.04 m²K/W</strong></li>
                <li className="pl-1">Air cavity ≥25mm: <strong>0.18 m²K/W</strong></li>
                <li className="pl-1">Part L wall limit: <strong>0.26 W/m²K</strong></li>
                <li className="pl-1">Part L roof limit: <strong>0.18 W/m²K</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Forgetting surface resistances</strong> — Always include Rsi and Rse</li>
                <li className="pl-1"><strong>Wrong units</strong> — Thickness must be in metres, not mm</li>
                <li className="pl-1"><strong>Confusing U and R</strong> — Remember: lower U is better, higher R is better</li>
                <li className="pl-1"><strong>Ignoring thermal bridges</strong> — Real buildings have junctions and penetrations</li>
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
                <p className="font-medium text-white mb-1">Thermal Properties</p>
                <ul className="space-y-0.5">
                  <li>U-value (W/m²K) - Heat transmittance</li>
                  <li>R-value (m²K/W) - Thermal resistance</li>
                  <li>λ (W/mK) - Thermal conductivity</li>
                  <li>U = 1/RT (reciprocal relationship)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Part L Limits (2021)</p>
                <ul className="space-y-0.5">
                  <li>Walls: 0.26 W/m²K</li>
                  <li>Flat roof: 0.18 W/m²K</li>
                  <li>Floor: 0.18 W/m²K</li>
                  <li>Windows: 1.6 W/m²K</li>
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
            <Link to="../h-n-c-module2-section1-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Heat Transfer
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module2-section1-5">
              Next: Thermal Bridging
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule2Section1_4;
