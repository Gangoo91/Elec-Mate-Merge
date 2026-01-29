import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Load Estimation Methods - HNC Module 2 Section 6.1";
const DESCRIPTION = "Master CIBSE load estimation methods for building services: heating and cooling load calculations, diversity factors, and design margins for commercial buildings.";

const quickCheckQuestions = [
  {
    id: "cibse-guide-a",
    question: "Which CIBSE guide provides the primary methodology for heating and cooling load calculations?",
    options: ["CIBSE Guide B", "CIBSE Guide A", "CIBSE Guide F", "CIBSE Guide M"],
    correctIndex: 1,
    explanation: "CIBSE Guide A (Environmental Design) provides the fundamental methodology for heating and cooling load calculations, including design temperatures, thermal properties, and calculation procedures."
  },
  {
    id: "diversity-factor",
    question: "A diversity factor of 0.7 for small power in offices means:",
    options: ["70% of equipment runs at 70% capacity", "Only 70% of connected load operates simultaneously at peak", "Equipment is 70% efficient", "30% of sockets are unused"],
    correctIndex: 1,
    explanation: "Diversity factor accounts for the fact that not all installed equipment operates at the same time. A factor of 0.7 means only 70% of the connected load is expected to operate simultaneously at peak demand."
  },
  {
    id: "cooling-load-peak",
    question: "When calculating peak cooling loads for a west-facing office, which time typically produces the highest solar gain?",
    options: ["9:00 AM", "12:00 noon", "3:00-5:00 PM", "7:00 PM"],
    correctIndex: 2,
    explanation: "West-facing facades receive maximum solar radiation in the late afternoon (3:00-5:00 PM), coinciding with high ambient temperatures. This timing is critical for sizing cooling systems."
  },
  {
    id: "heating-design-temp",
    question: "What is the typical CIBSE external design temperature for heating calculations in London?",
    options: ["-5°C", "-2°C", "0°C", "+2°C"],
    correctIndex: 1,
    explanation: "CIBSE Guide A specifies -2°C as the external heating design temperature for London (central). This represents conditions exceeded for only 1% of the heating season."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the primary purpose of CIBSE TM59 in load calculations?",
    options: [
      "Calculating heating loads for industrial buildings",
      "Assessing overheating risk in dwellings",
      "Sizing air conditioning systems",
      "Determining lighting power density"
    ],
    correctAnswer: 1,
    explanation: "CIBSE TM59 'Design methodology for the assessment of overheating risk in homes' provides criteria for evaluating overheating in residential buildings, increasingly important for naturally ventilated designs."
  },
  {
    id: 2,
    question: "The sol-air temperature concept accounts for:",
    options: [
      "Ground temperature variations",
      "Combined effect of solar radiation and external air temperature on surfaces",
      "Seasonal variations in solar intensity",
      "Temperature difference between floors"
    ],
    correctAnswer: 1,
    explanation: "Sol-air temperature combines the effect of solar radiation absorbed by a surface with the external air temperature, providing an equivalent temperature for heat transfer calculations through the building fabric."
  },
  {
    id: 3,
    question: "For a typical open-plan office, what small power diversity factor does CIBSE recommend?",
    options: ["0.4-0.5", "0.6-0.7", "0.8-0.9", "1.0"],
    correctAnswer: 1,
    explanation: "CIBSE Guide A recommends diversity factors of 0.6-0.7 for small power in open-plan offices, recognising that not all equipment operates simultaneously at full load."
  },
  {
    id: 4,
    question: "What does 'thermal admittance' (Y-value) indicate about building elements?",
    options: [
      "Steady-state heat transfer rate",
      "Ability to absorb and release heat over a 24-hour cycle",
      "Resistance to moisture penetration",
      "Sound insulation properties"
    ],
    correctAnswer: 1,
    explanation: "Thermal admittance (Y-value) indicates how quickly a surface can absorb and release heat in response to cyclic temperature variations. High admittance surfaces (exposed concrete) help moderate indoor temperatures."
  },
  {
    id: 5,
    question: "When should peak heating load calculations exclude solar and internal gains?",
    options: [
      "Never - always include all gains",
      "Only for residential buildings",
      "When sizing boiler plant capacity",
      "Only for naturally ventilated buildings"
    ],
    correctAnswer: 2,
    explanation: "Peak heating load calculations for boiler sizing typically exclude solar and internal gains to ensure adequate capacity during worst-case conditions (early morning, cloudy winter days with minimal occupancy)."
  },
  {
    id: 6,
    question: "CIBSE Guide A provides degree-day data for:",
    options: [
      "Calculating instantaneous heating loads only",
      "Estimating annual energy consumption",
      "Determining equipment maintenance schedules",
      "Setting thermostat schedules"
    ],
    correctAnswer: 1,
    explanation: "Degree-day data allows estimation of annual heating energy consumption by correlating heating requirements with cumulative temperature differences below the base temperature throughout the heating season."
  },
  {
    id: 7,
    question: "What is the typical design margin applied to calculated cooling loads?",
    options: ["0-5%", "5-10%", "10-15%", "20-25%"],
    correctAnswer: 2,
    explanation: "A design margin of 10-15% is typically applied to calculated cooling loads to account for uncertainties in occupancy patterns, equipment loads, and future changes, without excessive oversizing."
  },
  {
    id: 8,
    question: "Which factor has the greatest impact on cooling load in a highly glazed building?",
    options: [
      "Infiltration",
      "Fabric heat gain through walls",
      "Solar gain through glazing",
      "Lighting heat gain"
    ],
    correctAnswer: 2,
    explanation: "In highly glazed buildings, solar gain through windows typically dominates the cooling load, often accounting for 40-60% of the total. This is why glazing specification (g-value) is critical for cooling system sizing."
  },
  {
    id: 9,
    question: "The CIBSE 'admittance method' for cooling load calculations:",
    options: [
      "Ignores thermal mass effects",
      "Accounts for time lag and decrement factor of building elements",
      "Only applies to lightweight buildings",
      "Is identical to steady-state calculations"
    ],
    correctAnswer: 1,
    explanation: "The admittance method accounts for the dynamic thermal behaviour of building elements, including time lag (delay in heat transfer) and decrement factor (reduction in temperature swing through heavy construction)."
  },
  {
    id: 10,
    question: "For fresh air load calculations, what is the typical sensible heat ratio for UK summer conditions?",
    options: [
      "0.5-0.6",
      "0.7-0.8",
      "0.9-1.0",
      "It varies too much to generalise"
    ],
    correctAnswer: 1,
    explanation: "UK summer conditions typically have a sensible heat ratio of 0.7-0.8, meaning 70-80% of the cooling load from outdoor air is sensible (temperature) and 20-30% is latent (moisture)."
  },
  {
    id: 11,
    question: "What information does CIBSE TM54 provide for load calculations?",
    options: [
      "Detailed U-value calculations",
      "Realistic operational energy prediction methodology",
      "Heating system sizing procedures",
      "Refrigerant charge calculations"
    ],
    correctAnswer: 1,
    explanation: "CIBSE TM54 'Evaluating operational energy performance of buildings at the design stage' provides methodology for predicting realistic operational energy use, addressing the gap between design predictions and actual performance."
  },
  {
    id: 12,
    question: "When calculating heating loads, what infiltration rate is typically assumed for a modern sealed office building?",
    options: [
      "0.1-0.25 ACH",
      "0.5-1.0 ACH",
      "1.5-2.0 ACH",
      "2.5-3.0 ACH"
    ],
    correctAnswer: 0,
    explanation: "Modern sealed office buildings with controlled ventilation typically achieve 0.1-0.25 ACH infiltration. Higher rates apply to naturally ventilated buildings or older construction with poor air tightness."
  }
];

const faqs = [
  {
    question: "Why do calculated loads often differ from actual building performance?",
    answer: "The 'performance gap' arises from multiple factors: optimistic assumptions about occupancy patterns, equipment schedules not matching reality, poor commissioning, occupant behaviour differing from design assumptions, and simplified modelling of complex building physics. CIBSE TM54 methodology addresses this by using more realistic operational profiles."
  },
  {
    question: "How do I decide between steady-state and dynamic calculation methods?",
    answer: "Steady-state methods (simple U-value calculations) are appropriate for heating load estimates in heavyweight buildings with stable conditions. Dynamic methods (admittance, simulation) are essential for cooling loads, lightweight buildings, intermittent operation, or buildings with significant solar gains where thermal mass effects are important."
  },
  {
    question: "What is the relationship between connected load and design load?",
    answer: "Connected load is the sum of all installed equipment ratings. Design load applies diversity factors to connected load, recognising that not everything operates simultaneously at full capacity. For example, a floor with 100kW connected small power might have 70kW design load (0.7 diversity). Design load determines plant sizing."
  },
  {
    question: "Should I use the same diversity factors for all building types?",
    answer: "No - diversity factors vary significantly by building type and use. Hospitals may have 0.8-0.9 diversity (critical loads, predictable patterns), while speculative offices might use 0.5-0.6 (variable occupancy). Data centres require 1.0 diversity for IT loads. Always verify appropriate factors from CIBSE Guide A or client requirements."
  },
  {
    question: "How do climate change projections affect load calculations?",
    answer: "CIBSE provides future weather files (Design Summer Years for 2020s, 2050s, 2080s) for assessing overheating risk and future cooling demand. New buildings should be assessed against future scenarios. Heating loads decrease slightly but cooling loads can increase substantially, affecting system selection and sizing."
  },
  {
    question: "What margin should I add to calculated loads and why?",
    answer: "Typical margins are 10-15% for cooling, 10% for heating. These account for calculation uncertainties, minor future changes, and system degradation. Avoid excessive margins (>20%) as oversized plant operates inefficiently at part-load. Document your margin assumptions clearly for future reference."
  }
];

const HNCModule2Section6_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module2-section6">
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
            <Zap className="h-4 w-4" />
            <span>Module 2.6.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Load Estimation Methods
          </h1>
          <p className="text-white/80">
            CIBSE methodologies for accurate heating and cooling load calculations in building services design
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Heating loads:</strong> Fabric + infiltration + ventilation losses</li>
              <li className="pl-1"><strong>Cooling loads:</strong> Solar gains + internal gains + fresh air</li>
              <li className="pl-1"><strong>Diversity:</strong> Not all loads operate simultaneously</li>
              <li className="pl-1"><strong>Design margin:</strong> 10-15% for uncertainties</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key CIBSE References</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Guide A:</strong> Environmental design fundamentals</li>
              <li className="pl-1"><strong>Guide B:</strong> Heating and cooling systems</li>
              <li className="pl-1"><strong>TM54:</strong> Operational energy prediction</li>
              <li className="pl-1"><strong>TM59:</strong> Overheating risk assessment</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Apply CIBSE methodologies for heating load calculations",
              "Calculate cooling loads including solar and internal gains",
              "Understand and apply appropriate diversity factors",
              "Distinguish between steady-state and dynamic methods",
              "Apply suitable design margins for system sizing",
              "Recognise sources of uncertainty in load estimates"
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

        {/* Section 1: Heating Load Calculations */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Heating Load Calculations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Heating load calculations determine the rate of heat loss from a building under design conditions,
              enabling correct sizing of boilers, heat pumps, and distribution systems. CIBSE Guide A provides
              the fundamental methodology.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Components of Heating Load:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Fabric losses:</strong> Heat flow through walls, roof, floor, windows (Q = U × A × ΔT)</li>
                <li className="pl-1"><strong>Infiltration:</strong> Heat loss due to uncontrolled air leakage</li>
                <li className="pl-1"><strong>Ventilation:</strong> Heat required to warm fresh air supply</li>
                <li className="pl-1"><strong>Cold bridging:</strong> Additional losses through thermal bridges</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">CIBSE Design Temperatures (UK)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Location</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Heating Design Temp</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">London (central)</td>
                      <td className="border border-white/10 px-3 py-2">-2°C</td>
                      <td className="border border-white/10 px-3 py-2">1% exceedance</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Birmingham</td>
                      <td className="border border-white/10 px-3 py-2">-3°C</td>
                      <td className="border border-white/10 px-3 py-2">1% exceedance</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Manchester</td>
                      <td className="border border-white/10 px-3 py-2">-3°C</td>
                      <td className="border border-white/10 px-3 py-2">1% exceedance</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Edinburgh</td>
                      <td className="border border-white/10 px-3 py-2">-4°C</td>
                      <td className="border border-white/10 px-3 py-2">1% exceedance</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Belfast</td>
                      <td className="border border-white/10 px-3 py-2">-2°C</td>
                      <td className="border border-white/10 px-3 py-2">1% exceedance</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Basic Heating Load Formula</p>
              <p className="font-mono text-center text-lg mb-2">Q<sub>total</sub> = Q<sub>fabric</sub> + Q<sub>infiltration</sub> + Q<sub>ventilation</sub></p>
              <p className="text-xs text-white/70 text-center">Where Q = heat loss rate (W), typically calculated at design ΔT</p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Peak heating load calculations typically exclude solar and internal gains
              to ensure adequate capacity during worst-case early morning conditions.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Cooling Load Calculations */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Cooling Load Calculations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Cooling load calculations are more complex than heating, involving solar gains, internal heat
              sources, and the dynamic response of building thermal mass. The CIBSE admittance method accounts
              for these time-varying effects.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Components of Cooling Load:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Solar gain (glazing):</strong> Direct and diffuse radiation through windows</li>
                <li className="pl-1"><strong>Solar gain (fabric):</strong> Absorbed radiation conducted through opaque elements</li>
                <li className="pl-1"><strong>Internal gains:</strong> People, lighting, equipment</li>
                <li className="pl-1"><strong>Fresh air load:</strong> Sensible and latent cooling of outdoor air</li>
                <li className="pl-1"><strong>Fabric gain:</strong> Conduction when external &gt; internal temperature</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Internal Gains (CIBSE)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>People (sedentary):</strong> 90W sensible, 60W latent</li>
                  <li className="pl-1"><strong>Office lighting:</strong> 10-12 W/m²</li>
                  <li className="pl-1"><strong>Small power:</strong> 15-25 W/m²</li>
                  <li className="pl-1"><strong>Computer:</strong> 65-130W per workstation</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Peak Load Timing</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>East façade:</strong> 8:00-10:00 AM</li>
                  <li className="pl-1"><strong>South façade:</strong> 12:00-2:00 PM</li>
                  <li className="pl-1"><strong>West façade:</strong> 3:00-5:00 PM</li>
                  <li className="pl-1"><strong>Whole building:</strong> Often 2:00-4:00 PM</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Sol-Air Temperature Concept</p>
              <div className="p-3 rounded bg-black/30">
                <p className="font-mono text-sm text-center mb-2">T<sub>sol-air</sub> = T<sub>ao</sub> + (α × I / h<sub>o</sub>) - (ε × ΔR / h<sub>o</sub>)</p>
                <p className="text-xs text-white/70">Where: T<sub>ao</sub> = outside air temp, α = solar absorptance, I = solar intensity, h<sub>o</sub> = external heat transfer coefficient</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Critical consideration:</strong> Solar gains through glazing often dominate cooling loads in
              modern buildings. Always verify glazing g-values and shading effectiveness.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 3: Diversity Factors */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Diversity Factors
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Diversity factors recognise that not all installed equipment operates simultaneously at full
              capacity. Applying appropriate diversity reduces oversizing while maintaining adequate capacity
              for realistic operating conditions.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">CIBSE Recommended Diversity Factors</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Load Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Building Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Diversity Factor</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Small power</td>
                      <td className="border border-white/10 px-3 py-2">Open-plan office</td>
                      <td className="border border-white/10 px-3 py-2">0.6-0.7</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Small power</td>
                      <td className="border border-white/10 px-3 py-2">Cellular office</td>
                      <td className="border border-white/10 px-3 py-2">0.5-0.6</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Lighting</td>
                      <td className="border border-white/10 px-3 py-2">Office (daylight controlled)</td>
                      <td className="border border-white/10 px-3 py-2">0.7-0.8</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Occupancy</td>
                      <td className="border border-white/10 px-3 py-2">Open-plan office</td>
                      <td className="border border-white/10 px-3 py-2">0.7-0.8</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">IT equipment</td>
                      <td className="border border-white/10 px-3 py-2">Data centre</td>
                      <td className="border border-white/10 px-3 py-2">1.0</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">All loads</td>
                      <td className="border border-white/10 px-3 py-2">Hospital (critical areas)</td>
                      <td className="border border-white/10 px-3 py-2">0.85-0.95</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Design Load Calculation</p>
              <p className="font-mono text-center text-lg mb-2">Q<sub>design</sub> = Q<sub>connected</sub> × Diversity Factor</p>
              <p className="text-xs text-white/70 text-center">Example: 100kW connected small power × 0.7 diversity = 70kW design load</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">When NOT to Apply Diversity:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Individual circuit sizing (use full connected load)</li>
                <li className="pl-1">Critical/life-safety systems</li>
                <li className="pl-1">Equipment with known simultaneous operation</li>
                <li className="pl-1">Contractual requirements specifying full capacity</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Best practice:</strong> Document all diversity assumptions clearly. They significantly
              affect plant sizing and may need to be adjusted if building use changes.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Design Margins and Uncertainty */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Design Margins and Uncertainty
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Design margins account for calculation uncertainties, minor future changes, and the need for
              robust operation. However, excessive margins lead to oversized, inefficient systems that operate
              poorly at part-load.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Recommended Design Margins</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">System</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Margin</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Justification</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cooling plant</td>
                      <td className="border border-white/10 px-3 py-2">10-15%</td>
                      <td className="border border-white/10 px-3 py-2">Uncertainty in gains, future changes</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Heating plant</td>
                      <td className="border border-white/10 px-3 py-2">10%</td>
                      <td className="border border-white/10 px-3 py-2">Preheat capacity, setback recovery</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Air handling units</td>
                      <td className="border border-white/10 px-3 py-2">10%</td>
                      <td className="border border-white/10 px-3 py-2">Duct leakage, filter loading</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Pump duties</td>
                      <td className="border border-white/10 px-3 py-2">10-15%</td>
                      <td className="border border-white/10 px-3 py-2">System resistance uncertainty</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fan duties</td>
                      <td className="border border-white/10 px-3 py-2">10-15%</td>
                      <td className="border border-white/10 px-3 py-2">Duct pressure losses, filter condition</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Sources of Uncertainty in Load Calculations:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Occupancy patterns:</strong> Actual vs. assumed schedules</li>
                <li className="pl-1"><strong>Equipment loads:</strong> Future changes, actual vs. nameplate</li>
                <li className="pl-1"><strong>Weather data:</strong> Historic vs. future climate</li>
                <li className="pl-1"><strong>Construction quality:</strong> Air tightness, thermal bridging</li>
                <li className="pl-1"><strong>Control effectiveness:</strong> Assumed vs. achieved performance</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20">
              <p className="text-sm font-medium text-red-400 mb-2">Dangers of Excessive Margins</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Increased capital cost for larger equipment</li>
                <li className="pl-1">Poor part-load efficiency (especially chillers)</li>
                <li className="pl-1">Control problems at low loads</li>
                <li className="pl-1">Short-cycling of boilers and chillers</li>
                <li className="pl-1">Wasted plant room space</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Professional judgement:</strong> Balance the consequences of undersizing (comfort failure,
              complaints) against oversizing (inefficiency, cost). Document your margin decisions.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Office Heating Load</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Calculate the peak heating load for a 500m² office floor in Birmingham
                with U-values: walls 0.25 W/m²K, windows 1.4 W/m²K, roof 0.18 W/m²K.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Design conditions: Internal 21°C, External -3°C, ΔT = 24K</p>
                <p className="mt-2">Assume: Wall area 200m², Window area 80m², Roof 500m²</p>
                <p className="mt-2">Fabric loss:</p>
                <p>Walls: 0.25 × 200 × 24 = 1,200W</p>
                <p>Windows: 1.4 × 80 × 24 = 2,688W</p>
                <p>Roof: 0.18 × 500 × 24 = 2,160W</p>
                <p className="mt-2">Infiltration (0.25 ACH, 3m height):</p>
                <p>V = 500 × 3 × 0.25 = 375 m³/h</p>
                <p>Q = 0.33 × 375 × 24 = 2,970W</p>
                <p className="mt-2">Total: 1,200 + 2,688 + 2,160 + 2,970 = <strong>9,018W ≈ 9kW</strong></p>
                <p className="mt-2 text-white/60">→ With 10% margin: 9.9kW design heating load</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Cooling Load with Diversity</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Calculate the internal gains for a 200m² open-plan office with 20 workstations.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Connected loads:</p>
                <p>Lighting: 200m² × 12 W/m² = 2,400W</p>
                <p>Small power: 200m² × 20 W/m² = 4,000W</p>
                <p>People: 20 × 90W sensible = 1,800W</p>
                <p className="mt-2">Total connected: 8,200W</p>
                <p className="mt-2">Apply diversity factors:</p>
                <p>Lighting: 2,400 × 0.75 = 1,800W</p>
                <p>Small power: 4,000 × 0.7 = 2,800W</p>
                <p>Occupancy: 1,800 × 0.75 = 1,350W</p>
                <p className="mt-2">Design internal gains: <strong>5,950W</strong></p>
                <p className="mt-2 text-white/60">→ Diversity reduced load from 8.2kW to 5.95kW (27% reduction)</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Fresh Air Cooling Load</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Calculate the cooling load from fresh air for 20 people at 12 l/s per person.
                External: 28°C/50%RH, Internal: 24°C/50%RH.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Fresh air rate: 20 × 12 = 240 l/s = 0.24 m³/s</p>
                <p className="mt-2">Sensible cooling load:</p>
                <p>Q<sub>s</sub> = ρ × c<sub>p</sub> × V̇ × ΔT</p>
                <p>Q<sub>s</sub> = 1.2 × 1.02 × 0.24 × (28-24) = <strong>1.18 kW</strong></p>
                <p className="mt-2">Latent cooling load:</p>
                <p>From psychrometric chart, Δg ≈ 2 g/kg</p>
                <p>Q<sub>L</sub> = ρ × V̇ × Δg × h<sub>fg</sub></p>
                <p>Q<sub>L</sub> = 1.2 × 0.24 × 0.002 × 2450 = <strong>1.41 kW</strong></p>
                <p className="mt-2">Total fresh air load: <strong>2.59 kW</strong></p>
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
                <li className="pl-1"><strong>Q = U × A × ΔT</strong> — Fabric heat loss/gain</li>
                <li className="pl-1"><strong>Q = 0.33 × V̇ × ΔT</strong> — Ventilation sensible load (W)</li>
                <li className="pl-1"><strong>Q = ρ × c<sub>p</sub> × V̇ × ΔT</strong> — Air sensible cooling</li>
                <li className="pl-1"><strong>Design load = Connected × Diversity</strong> — Diversified load</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Air density: <strong>1.2 kg/m³</strong></li>
                <li className="pl-1">Air specific heat: <strong>1.02 kJ/kg·K</strong></li>
                <li className="pl-1">Typical office small power: <strong>15-25 W/m²</strong></li>
                <li className="pl-1">Sedentary person heat output: <strong>90W sensible + 60W latent</strong></li>
                <li className="pl-1">Fresh air rate (office): <strong>10-12 l/s per person</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Double-counting</strong> — Don't add margins at each stage</li>
                <li className="pl-1"><strong>Wrong peak time</strong> — Different zones peak at different times</li>
                <li className="pl-1"><strong>Ignoring thermal mass</strong> — Affects timing and magnitude of cooling loads</li>
                <li className="pl-1"><strong>Incorrect diversity</strong> — Don't apply diversity to already-diversified figures</li>
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
                <p className="font-medium text-white mb-1">Load Components</p>
                <ul className="space-y-0.5">
                  <li>Heating: Fabric + Infiltration + Ventilation</li>
                  <li>Cooling: Solar + Internal + Fresh air + Fabric</li>
                  <li>Design load = Connected × Diversity</li>
                  <li>Add 10-15% margin for uncertainties</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key References</p>
                <ul className="space-y-0.5">
                  <li>CIBSE Guide A - Design methodology</li>
                  <li>CIBSE Guide B - System sizing</li>
                  <li>CIBSE TM54 - Operational energy</li>
                  <li>CIBSE TM59 - Overheating assessment</li>
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
            <Link to="../h-n-c-module2-section6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module2-section6-2">
              Next: Energy Analysis
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule2Section6_1;
