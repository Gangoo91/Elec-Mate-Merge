import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Fabric First Approach - HNC Module 6 Section 6.2";
const DESCRIPTION = "Master the fabric first approach for building services: building envelope optimisation, insulation strategies, thermal bridging reduction, airtightness, and impact on HVAC system sizing.";

const quickCheckQuestions = [
  {
    id: "fabric-first-definition",
    question: "What is the 'fabric first' approach to building design?",
    options: ["Installing the cheapest insulation materials", "Prioritising building envelope performance before considering active systems", "Using only natural building materials", "Focusing on renewable energy generation first"],
    correctIndex: 1,
    explanation: "The fabric first approach prioritises optimising the building envelope (walls, roof, floor, windows) to minimise heating and cooling demand before specifying active mechanical and electrical systems."
  },
  {
    id: "thermal-bridging",
    question: "What is a thermal bridge in building construction?",
    options: ["A connection between two heating systems", "An area where heat transfers more readily through the building envelope", "A type of insulation material", "A ventilation pathway through the building"],
    correctIndex: 1,
    explanation: "A thermal bridge is an area of the building envelope where heat transfers more readily than through adjacent areas, typically at junctions, around windows, or where structural elements penetrate insulation."
  },
  {
    id: "airtightness-target",
    question: "What is a typical enhanced airtightness target for a fabric first dwelling?",
    options: ["10 m³/h/m² @ 50Pa", "5 m³/h/m² @ 50Pa", "3 m³/h/m² @ 50Pa or less", "15 m³/h/m² @ 50Pa"],
    correctIndex: 2,
    explanation: "Enhanced airtightness targets for fabric first dwellings are typically 3 m³/h/m² @ 50Pa or less, compared to Building Regulations minimum of 10 m³/h/m² @ 50Pa. Passivhaus requires 0.6 ACH @ 50Pa."
  },
  {
    id: "system-sizing-impact",
    question: "How does a fabric first approach affect HVAC system sizing?",
    options: ["Systems must be larger to compensate", "No impact on system sizing", "Systems can be significantly smaller due to reduced loads", "Only affects ventilation system sizing"],
    correctIndex: 2,
    explanation: "A fabric first approach significantly reduces heating and cooling loads, allowing HVAC systems to be much smaller. This reduces capital costs, running costs, and carbon emissions from building services."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the recommended U-value target for walls in a fabric first new-build dwelling?",
    options: [
      "0.30 W/m²K (Building Regulations minimum)",
      "0.18 W/m²K or better",
      "0.15 W/m²K (Passivhaus standard)",
      "0.10 W/m²K"
    ],
    correctAnswer: 1,
    explanation: "Enhanced fabric first designs typically target wall U-values of 0.18 W/m²K or better, significantly exceeding the Building Regulations Part L minimum of 0.26-0.30 W/m²K. Passivhaus standard requires 0.10-0.15 W/m²K."
  },
  {
    id: 2,
    question: "Which insulation strategy provides the most consistent thermal performance?",
    options: ["Cavity wall insulation only", "External wall insulation (EWI)", "Internal wall insulation (IWI)", "Partial fill cavity batts"],
    correctAnswer: 1,
    explanation: "External wall insulation (EWI) provides the most consistent thermal performance as it wraps the building in a continuous insulation layer, eliminating thermal bridges at floor/wall junctions and protecting the structure from thermal stress."
  },
  {
    id: 3,
    question: "What is the psi value (ψ) used to measure in building design?",
    options: ["Air permeability rate", "Linear thermal transmittance at junctions", "Overall building heat loss", "Insulation thermal conductivity"],
    correctAnswer: 1,
    explanation: "Psi values (ψ) measure linear thermal transmittance at junctions and thermal bridges, expressed in W/mK. Lower psi values indicate better thermal bridge detailing. Accredited construction details (ACDs) provide standardised psi values."
  },
  {
    id: 4,
    question: "What air permeability does Passivhaus certification require?",
    options: [
      "10 m³/h/m² @ 50Pa",
      "5 m³/h/m² @ 50Pa",
      "3 m³/h/m² @ 50Pa",
      "0.6 air changes per hour @ 50Pa"
    ],
    correctAnswer: 3,
    explanation: "Passivhaus requires airtightness of 0.6 air changes per hour (ACH) at 50Pa pressure, which is significantly more stringent than UK Building Regulations. This typically equates to around 0.3-0.5 m³/h/m² depending on building geometry."
  },
  {
    id: 5,
    question: "Why is MVHR (Mechanical Ventilation with Heat Recovery) essential in airtight buildings?",
    options: [
      "It is a legal requirement for all buildings",
      "Airtight buildings cannot rely on infiltration for ventilation",
      "It increases the heating load",
      "It is cheaper than extract fans"
    ],
    correctAnswer: 1,
    explanation: "In airtight buildings, natural infiltration is insufficient for adequate ventilation. MVHR provides controlled ventilation while recovering 85-95% of heat from exhaust air, maintaining indoor air quality without significant heat loss."
  },
  {
    id: 6,
    question: "What is the typical U-value requirement for windows in a fabric first approach?",
    options: [
      "2.0 W/m²K (Building Regulations minimum)",
      "1.4 W/m²K (standard double glazing)",
      "1.0 W/m²K or better (triple glazing)",
      "0.5 W/m²K"
    ],
    correctAnswer: 2,
    explanation: "Fabric first designs typically specify triple-glazed windows with U-values of 1.0 W/m²K or better. This compares to Building Regulations minimum of 1.4 W/m²K for replacement windows and 1.6 W/m²K for new-build."
  },
  {
    id: 7,
    question: "How does thermal mass interact with the fabric first approach?",
    options: [
      "Thermal mass is irrelevant to fabric first design",
      "Thermal mass should always be avoided",
      "Internal thermal mass moderates temperature swings and reduces peak loads",
      "Thermal mass only affects cooling, not heating"
    ],
    correctAnswer: 2,
    explanation: "Internal thermal mass (concrete floors, masonry walls) moderates temperature fluctuations by absorbing and releasing heat slowly. This reduces peak heating and cooling loads and improves comfort, but must be inside the insulation layer to be effective."
  },
  {
    id: 8,
    question: "What is the 'performance gap' in building energy use?",
    options: [
      "The gap between insulation layers",
      "The difference between design predictions and actual measured performance",
      "The gap in airtightness membrane installation",
      "The thermal bridge at window reveals"
    ],
    correctAnswer: 1,
    explanation: "The performance gap refers to the often significant difference between predicted (designed) energy performance and actual measured consumption. Fabric first approaches with careful detailing and quality control help close this gap."
  },
  {
    id: 9,
    question: "What heating system capacity might be appropriate for a well-designed 100m² fabric first dwelling?",
    options: [
      "15-20 kW (standard sizing)",
      "10-12 kW",
      "6-8 kW",
      "2-4 kW"
    ],
    correctAnswer: 3,
    explanation: "A well-designed fabric first dwelling of 100m² might only require 2-4 kW of heating capacity, compared to 10-15 kW for a standard build. This enables use of smaller, more efficient heat pumps and lower distribution temperatures."
  },
  {
    id: 10,
    question: "What is the primary purpose of a continuous air barrier in construction?",
    options: [
      "To provide thermal insulation",
      "To prevent moisture movement through the structure",
      "To prevent uncontrolled air leakage through the building envelope",
      "To act as a vapour control layer"
    ],
    correctAnswer: 2,
    explanation: "The primary purpose of a continuous air barrier is to prevent uncontrolled air leakage. While some membranes combine air and vapour control functions, the air barrier specifically controls convective heat loss and prevents draughts."
  },
  {
    id: 11,
    question: "Which construction detail typically has the highest risk of thermal bridging?",
    options: [
      "Centre of external wall",
      "Window sill and jamb junctions",
      "Middle of roof insulation",
      "Centre of floor slab"
    ],
    correctAnswer: 1,
    explanation: "Window sill and jamb junctions are high-risk thermal bridging areas due to the complexity of joining different materials and the need to support window frames. Careful detailing with insulated frames and thermal breaks is essential."
  },
  {
    id: 12,
    question: "What is the typical space heating demand target for a Passivhaus building?",
    options: [
      "50 kWh/m²/year",
      "25 kWh/m²/year",
      "15 kWh/m²/year or less",
      "100 kWh/m²/year"
    ],
    correctAnswer: 2,
    explanation: "Passivhaus certification requires space heating demand of 15 kWh/m²/year or less. This is achieved through excellent fabric performance (low U-values, minimal thermal bridging, exceptional airtightness) combined with MVHR."
  }
];

const faqs = [
  {
    question: "How does fabric first affect the choice of heating system?",
    answer: "Fabric first dramatically reduces heating loads, making low-temperature systems like air source heat pumps (ASHPs) more viable. With peak loads of 2-4 kW instead of 10-15 kW, smaller heat pumps operate more efficiently, underfloor heating works at lower temperatures (35-40°C vs 45-55°C), and even direct electric heating becomes cost-effective in very low-energy buildings. The reduced demand also means renewable generation can cover a larger proportion of needs."
  },
  {
    question: "What are the cost implications of fabric first versus standard construction?",
    answer: "While fabric first increases envelope costs (typically 5-15% more for insulation, windows, and airtightness detailing), this is offset by reduced mechanical system sizes. A Passivhaus dwelling might need only a 3 kW heat source versus 12 kW, saving thousands on equipment. Running costs are 60-80% lower, and there's reduced maintenance with simpler systems. The whole-life cost is typically lower, with payback within 10-15 years even before considering comfort and health benefits."
  },
  {
    question: "How do you achieve good airtightness on site?",
    answer: "Airtightness requires a continuous air barrier strategy: (1) Designate one layer as the air barrier (often the internal plasterboard or a dedicated membrane), (2) Plan all penetrations and junctions at design stage, (3) Use appropriate tapes, gaskets, and sealants at all joints, (4) Conduct interim airtightness tests during construction, (5) Train all trades on the importance of maintaining the air barrier. Common failure points include service penetrations, window/door frames, and junctions between different construction elements."
  },
  {
    question: "Can fabric first principles be applied to existing buildings?",
    answer: "Yes, through deep retrofit approaches. External wall insulation (EWI) is often the most effective as it maintains internal floor area and reduces thermal bridging. Internal insulation, floor insulation, loft insulation improvements, and window upgrades all contribute. Achieving very low airtightness in existing buildings is challenging due to hidden junctions, but significant improvements are possible. The EnerPHit standard provides Passivhaus-level targets specifically for retrofit projects."
  },
  {
    question: "What ventilation strategy is required for fabric first buildings?",
    answer: "Highly airtight buildings require mechanical ventilation - relying on infiltration would cause poor indoor air quality. MVHR (Mechanical Ventilation with Heat Recovery) is the standard choice, providing fresh filtered air while recovering 85-95% of heat from exhaust air. The ventilation system becomes a critical component, requiring proper commissioning, maintenance, and user education. Summer bypass functions prevent overheating by allowing cool night air to enter directly."
  }
];

const HNCModule6Section6_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module6-section6">
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
            <span>Module 6.6.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Fabric First Approach
          </h1>
          <p className="text-white/80">
            Building envelope optimisation, insulation strategies, thermal bridging reduction, and airtightness for low-energy buildings
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Fabric first:</strong> Optimise envelope before active systems</li>
              <li className="pl-1"><strong>U-values:</strong> Walls 0.15-0.18, Roof 0.10-0.13, Floor 0.10-0.15 W/m²K</li>
              <li className="pl-1"><strong>Airtightness:</strong> Target 3 m³/h/m² @ 50Pa or better</li>
              <li className="pl-1"><strong>Result:</strong> 60-80% reduction in heating demand</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Impact</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Heating:</strong> 2-4 kW vs 10-15 kW typical</li>
              <li className="pl-1"><strong>Ventilation:</strong> MVHR essential for airtight buildings</li>
              <li className="pl-1"><strong>Distribution:</strong> Lower flow temperatures viable</li>
              <li className="pl-1"><strong>Controls:</strong> Simpler due to stable temperatures</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Apply fabric first principles and the energy hierarchy",
              "Specify enhanced insulation levels and U-value targets",
              "Design thermal bridge-free construction details",
              "Implement airtightness strategies and testing protocols",
              "Select appropriate window specifications for low-energy buildings",
              "Calculate reduced system sizing based on fabric performance"
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

        {/* Section 1: Fabric First Hierarchy */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Fabric First Hierarchy
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The fabric first approach follows a clear hierarchy: reduce energy demand through building fabric before
              considering active systems and renewable generation. This fundamentally changes how we approach building
              services design, as a well-designed envelope dramatically reduces system requirements.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Energy Hierarchy (in order of priority):</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>1. Be lean:</strong> Reduce demand through excellent fabric and passive design</li>
                <li className="pl-1"><strong>2. Be clean:</strong> Use efficient systems with low-carbon energy sources</li>
                <li className="pl-1"><strong>3. Be green:</strong> Generate renewable energy on-site</li>
                <li className="pl-1"><strong>4. Be seen:</strong> Monitor, display, and optimise performance</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Fabric First Design Principles</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Principle</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Benefit</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Compact form</td>
                      <td className="border border-white/10 px-3 py-2">Minimise surface area to volume ratio</td>
                      <td className="border border-white/10 px-3 py-2">Reduces heat loss area</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Superinsulation</td>
                      <td className="border border-white/10 px-3 py-2">U-values 2-3x better than regulations</td>
                      <td className="border border-white/10 px-3 py-2">Minimises transmission losses</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Thermal bridge-free</td>
                      <td className="border border-white/10 px-3 py-2">Continuous insulation envelope</td>
                      <td className="border border-white/10 px-3 py-2">Eliminates cold spots and condensation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Airtightness</td>
                      <td className="border border-white/10 px-3 py-2">Sealed envelope with controlled ventilation</td>
                      <td className="border border-white/10 px-3 py-2">Prevents infiltration losses</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Solar optimisation</td>
                      <td className="border border-white/10 px-3 py-2">South-facing glazing, appropriate shading</td>
                      <td className="border border-white/10 px-3 py-2">Free heating gains, overheating control</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key principle:</strong> Every kilowatt-hour of demand avoided is worth more than a kilowatt-hour generated - savings are guaranteed for the building's lifetime.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Enhanced Insulation and U-Value Targets */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Enhanced Insulation and U-Value Targets
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Fabric first designs significantly exceed Building Regulations minimum U-values. The additional insulation
              cost is offset by smaller mechanical systems and dramatically reduced running costs over the building's
              lifetime.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">U-Value Comparison (W/m²K)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Element</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Part L 2021</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Enhanced Fabric First</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Passivhaus</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">External walls</td>
                      <td className="border border-white/10 px-3 py-2">0.26</td>
                      <td className="border border-white/10 px-3 py-2">0.15-0.18</td>
                      <td className="border border-white/10 px-3 py-2">0.10-0.15</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Roof</td>
                      <td className="border border-white/10 px-3 py-2">0.16</td>
                      <td className="border border-white/10 px-3 py-2">0.10-0.13</td>
                      <td className="border border-white/10 px-3 py-2">0.08-0.12</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Ground floor</td>
                      <td className="border border-white/10 px-3 py-2">0.18</td>
                      <td className="border border-white/10 px-3 py-2">0.10-0.15</td>
                      <td className="border border-white/10 px-3 py-2">0.08-0.12</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Windows</td>
                      <td className="border border-white/10 px-3 py-2">1.6 (whole window)</td>
                      <td className="border border-white/10 px-3 py-2">0.8-1.2</td>
                      <td className="border border-white/10 px-3 py-2">0.8 or better</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Doors</td>
                      <td className="border border-white/10 px-3 py-2">1.6</td>
                      <td className="border border-white/10 px-3 py-2">1.0-1.2</td>
                      <td className="border border-white/10 px-3 py-2">0.8</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Insulation Types</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Mineral wool (λ = 0.032-0.044)</li>
                  <li className="pl-1">PIR/PUR boards (λ = 0.022-0.028)</li>
                  <li className="pl-1">Phenolic foam (λ = 0.018-0.022)</li>
                  <li className="pl-1">Wood fibre (λ = 0.038-0.043)</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Wall Build-Up Options</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Full-fill cavity (300mm+)</li>
                  <li className="pl-1">External insulation (EWI)</li>
                  <li className="pl-1">Internal insulation (IWI)</li>
                  <li className="pl-1">SIPs / ICF systems</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Thickness Required</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Walls: 200-300mm</li>
                  <li className="pl-1">Roof: 300-400mm</li>
                  <li className="pl-1">Floor: 150-250mm</li>
                  <li className="pl-1">Varies by λ value</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design consideration:</strong> Thicker insulation affects internal dimensions, foundation depths, and eaves details - coordinate with architect early in design.
            </p>
          </div>
        </section>

        {/* Section 3: Thermal Bridging and Airtightness */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Thermal Bridging and Airtightness
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Even with excellent insulation, thermal bridges and air leakage can account for 30-50% of heat loss in
              a building. Addressing these requires careful design detailing and rigorous site quality control.
            </p>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Common Thermal Bridge Locations</p>
              <div className="grid sm:grid-cols-2 gap-2 text-sm">
                <ul className="space-y-1">
                  <li>• Wall-to-floor junctions</li>
                  <li>• Wall-to-roof junctions</li>
                  <li>• Window and door reveals</li>
                  <li>• Lintels and sills</li>
                </ul>
                <ul className="space-y-1">
                  <li>• Balcony connections</li>
                  <li>• Steel beam penetrations</li>
                  <li>• Corner junctions</li>
                  <li>• Service penetrations</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Thermal Bridge Solutions</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Location</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Problem</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Solution</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Window reveals</td>
                      <td className="border border-white/10 px-3 py-2">Frame in contact with masonry</td>
                      <td className="border border-white/10 px-3 py-2">Insulated frames, return insulation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Lintels</td>
                      <td className="border border-white/10 px-3 py-2">Steel conducts heat</td>
                      <td className="border border-white/10 px-3 py-2">Insulated lintels, thermally broken</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Floor junction</td>
                      <td className="border border-white/10 px-3 py-2">Concrete slab bridges cavity</td>
                      <td className="border border-white/10 px-3 py-2">Perimeter insulation, thermal breaks</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Balconies</td>
                      <td className="border border-white/10 px-3 py-2">Slab extends through envelope</td>
                      <td className="border border-white/10 px-3 py-2">Thermal break connectors (Isokorb)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Airtightness Targets and Testing</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Building Regulations:</strong> 10 m³/h/m² @ 50Pa (minimum backstop)</li>
                <li className="pl-1"><strong>Part L 2021 notional:</strong> 5 m³/h/m² @ 50Pa</li>
                <li className="pl-1"><strong>Enhanced fabric first:</strong> 3 m³/h/m² @ 50Pa or better</li>
                <li className="pl-1"><strong>Passivhaus:</strong> 0.6 ACH @ 50Pa (approx. 0.3-0.5 m³/h/m²)</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Air Barrier Strategy</p>
              <p className="text-sm mb-2">The air barrier must be continuous, robust, and durable:</p>
              <ul className="text-sm text-white space-y-1">
                <li>• Identify one layer as the designated air barrier (membrane or wet plaster)</li>
                <li>• Tape all joints and laps with appropriate airtightness tape</li>
                <li>• Use grommets or proprietary seals for service penetrations</li>
                <li>• Seal around window and door frames with expanding foam and tape</li>
                <li>• Conduct interim air pressure tests before finishes conceal problems</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Critical point:</strong> Airtightness must be achieved during construction - retrofitting a continuous air barrier after completion is extremely difficult.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Impact on Building Services Design */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Impact on Building Services Design
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A fabric first approach fundamentally changes building services requirements. With heat losses reduced by
              60-80%, system sizing, selection, and distribution strategies are transformed. This creates opportunities
              for simpler, smaller, and more efficient installations.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Heating System Sizing Comparison</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Building Type (100m²)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Heat Loss</th>
                      <th className="border border-white/10 px-3 py-2 text-left">System Size</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Annual Demand</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Standard build</td>
                      <td className="border border-white/10 px-3 py-2">80-100 W/m²</td>
                      <td className="border border-white/10 px-3 py-2">10-15 kW</td>
                      <td className="border border-white/10 px-3 py-2">80-120 kWh/m²/yr</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Part L 2021 compliant</td>
                      <td className="border border-white/10 px-3 py-2">50-70 W/m²</td>
                      <td className="border border-white/10 px-3 py-2">6-8 kW</td>
                      <td className="border border-white/10 px-3 py-2">50-70 kWh/m²/yr</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Enhanced fabric first</td>
                      <td className="border border-white/10 px-3 py-2">25-35 W/m²</td>
                      <td className="border border-white/10 px-3 py-2">3-4 kW</td>
                      <td className="border border-white/10 px-3 py-2">25-40 kWh/m²/yr</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Passivhaus</td>
                      <td className="border border-white/10 px-3 py-2">10-15 W/m²</td>
                      <td className="border border-white/10 px-3 py-2">1-2 kW</td>
                      <td className="border border-white/10 px-3 py-2">≤15 kWh/m²/yr</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Heating System Implications</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Smaller heat pumps operate more efficiently</li>
                  <li className="pl-1">Lower flow temperatures (35-45°C) viable</li>
                  <li className="pl-1">Radiators can be smaller or replaced by UFH</li>
                  <li className="pl-1">Post-heater on MVHR may suffice</li>
                  <li className="pl-1">No boiler room required in some cases</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Ventilation Requirements</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">MVHR essential (85-95% heat recovery)</li>
                  <li className="pl-1">Duct routing needs early coordination</li>
                  <li className="pl-1">Summer bypass for free cooling</li>
                  <li className="pl-1">Acoustic treatment at air terminals</li>
                  <li className="pl-1">Accessible for filter maintenance</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-green-500/10 border border-green-500/30">
              <p className="text-sm font-medium text-green-400 mb-2">Passivhaus Window Requirements</p>
              <ul className="text-sm space-y-1">
                <li>• <strong>U-value:</strong> 0.80 W/m²K or better (whole window including frame)</li>
                <li>• <strong>Glazing:</strong> Triple glazing with low-e coatings, argon or krypton fill</li>
                <li>• <strong>Frame:</strong> Thermally broken or insulated composite frames</li>
                <li>• <strong>Installation:</strong> Positioned in insulation zone, not on masonry</li>
                <li>• <strong>Solar gain (g-value):</strong> 0.5 or higher for passive solar heating</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Design integration:</strong> Building services engineers must collaborate with architects from concept stage - fabric performance directly determines system requirements and vice versa.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: U-Value and Heat Loss Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Calculate wall heat loss for standard vs enhanced fabric first for 50m² wall area at ΔT = 25K.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Standard wall (U = 0.26 W/m²K):</p>
                <p>Q = U × A × ΔT</p>
                <p>Q = 0.26 × 50 × 25 = 325 W</p>
                <p className="mt-2 text-white/60">Enhanced fabric first (U = 0.15 W/m²K):</p>
                <p>Q = 0.15 × 50 × 25 = 187.5 W</p>
                <p className="mt-2 text-green-400">Saving: 137.5 W (42% reduction)</p>
                <p className="text-white/60 mt-2">Over heating season (2000 hours):</p>
                <p>Annual saving = 137.5 × 2000 / 1000 = 275 kWh</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Airtightness Impact on Infiltration Heat Loss</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Compare infiltration losses for a 250m³ dwelling at different airtightness levels.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Heat loss from infiltration:</p>
                <p>Q = 0.33 × n × V × ΔT (where n = air changes/hour)</p>
                <p className="mt-2 text-white/60">At 10 m³/h/m² @ 50Pa (≈0.5 ACH natural):</p>
                <p>Q = 0.33 × 0.5 × 250 × 25 = 1031 W</p>
                <p className="mt-2 text-white/60">At 3 m³/h/m² @ 50Pa (≈0.15 ACH natural):</p>
                <p>Q = 0.33 × 0.15 × 250 × 25 = 309 W</p>
                <p className="mt-2 text-green-400">Saving: 722 W (70% reduction in infiltration loss)</p>
                <p className="text-white/60 mt-2">Note: MVHR required to maintain air quality</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: System Sizing for Fabric First Dwelling</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Size heating system for 120m² fabric first dwelling.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Fabric performance:</p>
                <p>Walls: 80m² @ U=0.15 = 12 W/K</p>
                <p>Roof: 60m² @ U=0.12 = 7.2 W/K</p>
                <p>Floor: 60m² @ U=0.12 = 7.2 W/K</p>
                <p>Windows: 20m² @ U=0.85 = 17 W/K</p>
                <p>Thermal bridges (y-value 0.02): 280m² × 0.02 = 5.6 W/K</p>
                <p>Ventilation (MVHR 90%): 300m³ × 0.33 × 0.4 × 0.1 = 4 W/K</p>
                <p className="mt-2">Total heat loss coefficient: 53 W/K</p>
                <p className="mt-2 text-white/60">At design condition (ΔT = 25K):</p>
                <p>Peak load = 53 × 25 = 1325 W</p>
                <p className="mt-2 text-green-400">Heat pump sizing: 2-3 kW (with margin)</p>
                <p className="text-white/60">Compare standard build: 8-12 kW required</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Fabric First Design Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Set U-value targets at project outset (consider Passivhaus or near-Passivhaus)</li>
                <li className="pl-1">Model thermal bridges using psi values - include in heat loss calculations</li>
                <li className="pl-1">Design continuous insulation and air barrier strategies</li>
                <li className="pl-1">Specify airtightness target and interim testing requirements</li>
                <li className="pl-1">Coordinate MVHR duct routing with structural and architectural design</li>
                <li className="pl-1">Size heating systems based on actual calculated loads, not rules of thumb</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Enhanced wall U-value: <strong>0.15-0.18 W/m²K</strong></li>
                <li className="pl-1">Passivhaus space heating: <strong>≤15 kWh/m²/year</strong></li>
                <li className="pl-1">Passivhaus airtightness: <strong>0.6 ACH @ 50Pa</strong></li>
                <li className="pl-1">MVHR heat recovery: <strong>85-95%</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Oversizing heating systems</strong> - use actual calculated loads, not standard ratios</li>
                <li className="pl-1"><strong>Ignoring thermal bridges</strong> - can account for 30% of heat loss in well-insulated buildings</li>
                <li className="pl-1"><strong>Late airtightness consideration</strong> - must be designed from concept stage</li>
                <li className="pl-1"><strong>Forgetting summer overheating</strong> - excellent insulation works both ways</li>
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
                <p className="font-medium text-white mb-1">U-Value Targets (W/m²K)</p>
                <ul className="space-y-0.5">
                  <li>Walls: 0.15-0.18 (enhanced) / 0.10-0.15 (PH)</li>
                  <li>Roof: 0.10-0.13 (enhanced) / 0.08-0.12 (PH)</li>
                  <li>Floor: 0.10-0.15 (enhanced) / 0.08-0.12 (PH)</li>
                  <li>Windows: 0.8-1.2 (enhanced) / ≤0.8 (PH)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Performance Targets</p>
                <ul className="space-y-0.5">
                  <li>Airtightness: ≤3 m³/h/m² (enhanced) / 0.6 ACH (PH)</li>
                  <li>Space heating: 25-40 kWh/m²/yr (enhanced)</li>
                  <li>Passivhaus: ≤15 kWh/m²/yr heating</li>
                  <li>MVHR recovery: 85-95% efficiency</li>
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
            <Link to="../h-n-c-module6-section6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module6-section6-3">
              Next: Section 6.3
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule6Section6_2;
