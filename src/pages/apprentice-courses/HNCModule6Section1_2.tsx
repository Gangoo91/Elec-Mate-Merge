import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "SBEM Calculations - HNC Module 6 Section 1.2";
const DESCRIPTION = "Master SBEM calculations for building energy compliance: Simplified Building Energy Model, NCM methodology, inputs and outputs, BER vs TER comparison, and Part L compliance demonstration.";

const quickCheckQuestions = [
  {
    id: "sbem-purpose",
    question: "What is the primary purpose of SBEM software?",
    options: ["To design HVAC systems", "To calculate building energy performance and demonstrate Part L compliance", "To specify lighting levels", "To calculate electrical loads"],
    correctIndex: 1,
    explanation: "SBEM (Simplified Building Energy Model) is the government-approved software tool used to calculate building energy performance and demonstrate compliance with Part L of the Building Regulations for non-domestic buildings."
  },
  {
    id: "ber-ter-definition",
    question: "What does BER stand for in SBEM calculations?",
    options: ["Building Energy Requirement", "Building Emission Rate", "Basic Energy Rating", "Building Efficiency Ratio"],
    correctIndex: 1,
    explanation: "BER stands for Building Emission Rate - the calculated CO₂ emission rate (kgCO₂/m²/year) for the actual proposed building design. This must be equal to or less than the TER (Target Emission Rate) to achieve compliance."
  },
  {
    id: "ncm-methodology",
    question: "What does NCM stand for in building energy assessment?",
    options: ["National Calculation Methodology", "Non-domestic Carbon Model", "Numerical Compliance Method", "National Certification Model"],
    correctIndex: 0,
    explanation: "NCM stands for National Calculation Methodology - the government-approved method for calculating the energy performance of non-domestic buildings. SBEM implements the NCM to produce compliance calculations."
  },
  {
    id: "compliance-demonstration",
    question: "To demonstrate Part L compliance, the BER must be:",
    options: ["Greater than the TER", "Equal to or less than the TER", "Within 10% of the TER", "Exactly equal to the TER"],
    correctIndex: 1,
    explanation: "For Part L compliance, the Building Emission Rate (BER) must be equal to or less than the Target Emission Rate (TER). The lower the BER compared to TER, the better the building's energy performance."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which type of building is SBEM primarily designed to assess?",
    options: [
      "Domestic dwellings",
      "Non-domestic buildings",
      "Industrial warehouses only",
      "Listed buildings"
    ],
    correctAnswer: 1,
    explanation: "SBEM is specifically designed for non-domestic buildings. Domestic dwellings use SAP (Standard Assessment Procedure) for energy calculations. SBEM can assess offices, schools, retail, healthcare and other non-residential buildings."
  },
  {
    id: 2,
    question: "What is the notional building used for in SBEM calculations?",
    options: ["To represent the actual design proposal", "To establish the Target Emission Rate (TER) as a compliance benchmark", "To calculate heating loads only", "To determine construction costs"],
    correctAnswer: 1,
    explanation: "The notional building is a hypothetical reference building with the same size, shape and use as the proposed building, but with standardised specifications. It establishes the TER that the actual building's BER must meet or beat."
  },
  {
    id: 3,
    question: "Which of these is NOT a required geometric input for SBEM?",
    options: ["Zone floor areas", "External wall areas", "Window areas and orientation", "Furniture layouts"],
    correctAnswer: 3,
    explanation: "SBEM requires building geometry data including zone areas, wall/roof/floor areas, glazing percentages and orientations. Furniture layouts are not relevant to the energy calculation as they don't affect building fabric or services performance."
  },
  {
    id: 4,
    question: "What unit is used to express U-values in SBEM inputs?",
    options: ["kW/m²K", "W/m²K", "W/mK", "kJ/m²K"],
    correctAnswer: 1,
    explanation: "U-values are expressed in W/m²K (Watts per square metre per Kelvin). This measures the rate of heat transfer through a building element per unit area for a given temperature difference. Lower U-values indicate better insulation."
  },
  {
    id: 5,
    question: "In SBEM, what does Lighting Power Density (LPD) measure?",
    options: ["Total lighting energy consumption per year", "Installed lighting power per unit floor area (W/m²)", "Luminaire efficiency in lumens per watt", "Emergency lighting battery capacity"],
    correctAnswer: 1,
    explanation: "Lighting Power Density measures the installed lighting power per unit floor area, expressed in W/m². Lower LPD values indicate more efficient lighting design. Modern LED installations typically achieve 8-12 W/m² in offices."
  },
  {
    id: 6,
    question: "What is the typical maximum acceptable air permeability for a new non-domestic building under Part L?",
    options: ["15 m³/h/m² @ 50Pa", "10 m³/h/m² @ 50Pa", "5 m³/h/m² @ 50Pa", "3 m³/h/m² @ 50Pa"],
    correctAnswer: 1,
    explanation: "Part L 2021 sets a maximum air permeability of 10 m³/h/m² at 50Pa for new non-domestic buildings. Better performing buildings often achieve 3-5 m³/h/m². Lower permeability reduces uncontrolled heat loss but requires adequate ventilation design."
  },
  {
    id: 7,
    question: "How does SBEM account for renewable energy contributions?",
    options: ["Renewables cannot be included in SBEM", "By reducing the calculated BER through on-site generation offset", "By increasing the TER to allow easier compliance", "Only solar thermal is permitted"],
    correctAnswer: 1,
    explanation: "SBEM reduces the BER by accounting for on-site renewable energy generation such as PV, solar thermal, wind or biomass. The renewable contribution is subtracted from the building's calculated emissions to give the final BER."
  },
  {
    id: 8,
    question: "What information does SBEM require about HVAC systems?",
    options: ["Manufacturer brochures only", "System type, efficiency/COP, fuel type, and control strategy", "Just the heating capacity in kW", "Only the refrigerant type"],
    correctAnswer: 1,
    explanation: "SBEM requires comprehensive HVAC data including system type (e.g., VRF, chiller, gas boiler), seasonal efficiencies or COPs, fuel type, distribution losses, and control strategies. This enables accurate calculation of heating and cooling energy use."
  },
  {
    id: 9,
    question: "What is the purpose of the EPC (Energy Performance Certificate) generated from SBEM?",
    options: ["To prove electrical installation compliance", "To provide an energy rating and recommendations for the building", "To certify the structural design", "To approve the planning application"],
    correctAnswer: 1,
    explanation: "The EPC provides a standardised energy rating (A-G scale) and recommendations for improving energy performance. It is a legal requirement for buildings when constructed, sold or let, and helps occupants understand running costs."
  },
  {
    id: 10,
    question: "When must SBEM calculations be submitted to Building Control?",
    options: ["Only at completion", "At design stage and as-built stage", "Only if the building fails compliance", "Every five years"],
    correctAnswer: 1,
    explanation: "SBEM calculations are required at two stages: design stage (with Building Regulations application) to demonstrate intended compliance, and as-built stage (at completion) to confirm the constructed building meets the design performance."
  },
  {
    id: 11,
    question: "Which factor has the greatest impact on reducing BER in a typical office building?",
    options: ["Increasing wall thickness", "Improving HVAC efficiency and lighting power density", "Adding more windows", "Using heavier construction materials"],
    correctAnswer: 1,
    explanation: "In offices, HVAC and lighting typically account for 60-70% of regulated energy use. Improving system efficiencies (higher COP chillers, efficient boilers) and reducing lighting power density through LED technology have the greatest impact on BER."
  },
  {
    id: 12,
    question: "What is the compliance margin in SBEM terminology?",
    options: ["The error tolerance in measurements", "The percentage by which BER is below TER", "The maximum building size that can be modelled", "The acceptable window-to-wall ratio"],
    correctAnswer: 1,
    explanation: "Compliance margin is the percentage difference between BER and TER, expressed as (TER-BER)/TER × 100. A positive margin indicates the building exceeds minimum requirements. Larger margins provide contingency for as-built variations."
  }
];

const faqs = [
  {
    question: "What's the difference between SBEM and DSM (Dynamic Simulation Model)?",
    answer: "SBEM is a simplified steady-state monthly calculation suitable for most non-domestic buildings and is free to use. DSM software (like IES-VE, TAS, or EnergyPlus) performs dynamic hourly simulations providing greater accuracy for complex buildings with unusual geometry, mixed-mode ventilation, or advanced control strategies. DSM is typically used for larger or more complex projects where SBEM's simplifications may not adequately represent building behaviour."
  },
  {
    question: "Can SBEM model all building types?",
    answer: "SBEM can model most standard non-domestic building types including offices, schools, retail, hotels, hospitals, and industrial buildings. However, some specialist buildings may require DSM, including those with swimming pools, data centres with high heat loads, buildings with complex atria, or those using innovative low-energy design strategies that SBEM cannot adequately represent."
  },
  {
    question: "How do I improve a building's compliance margin?",
    answer: "Key strategies include: (1) Reduce fabric U-values below notional values, (2) Improve air tightness to 3-5 m³/h/m², (3) Specify high-efficiency HVAC with COPs above minimum standards, (4) Reduce lighting power density using LED technology, (5) Install building-mounted renewables like PV, (6) Optimise glazing ratios and solar control. The most cost-effective measures depend on building type and baseline design."
  },
  {
    question: "What happens if the as-built SBEM fails to match design stage?",
    answer: "If as-built performance differs significantly from design stage calculations, the building may fail to achieve compliance. Common causes include specification changes during construction, poor workmanship affecting air tightness, or equipment substitution. Remedial measures may be required, potentially including additional insulation, equipment upgrades, or renewable installations to achieve the required BER."
  },
  {
    question: "Who can submit SBEM calculations?",
    answer: "SBEM calculations for Building Regulations compliance must be produced by a competent person - typically an accredited energy assessor registered with an approved accreditation scheme. For Part L compliance, Non-Domestic Energy Assessors (NDEAs) certified by schemes like CIBSE, Elmhurst, or Stroma can produce and lodge the calculations on the national register."
  },
  {
    question: "How often is SBEM software updated?",
    answer: "SBEM is updated when Building Regulations change. The current version (SBEM v6.1) supports Part L 2021. Updates reflect changes to notional building specifications, emission factors, and calculation methodologies. Energy assessors must use the current approved version, and projects submitted under previous regulations may need recalculation if designs change significantly."
  }
];

const HNCModule6Section1_2 = () => {
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
            <span>Module 6.1.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            SBEM Calculations
          </h1>
          <p className="text-white/80">
            Simplified Building Energy Model, NCM methodology, inputs and outputs, and Part L compliance demonstration
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>SBEM:</strong> Government-approved energy calculation tool</li>
              <li className="pl-1"><strong>Purpose:</strong> Demonstrate Part L compliance for non-domestic buildings</li>
              <li className="pl-1"><strong>Key output:</strong> BER must be ≤ TER for compliance</li>
              <li className="pl-1"><strong>Produces:</strong> EPC rating and compliance certificate</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>HVAC inputs:</strong> System type, efficiency, controls</li>
              <li className="pl-1"><strong>Lighting:</strong> Power density, controls, daylight linking</li>
              <li className="pl-1"><strong>Renewables:</strong> PV, solar thermal reduce BER</li>
              <li className="pl-1"><strong>Submissions:</strong> Design stage and as-built</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the purpose of SBEM and NCM methodology",
              "Identify required inputs for SBEM calculations",
              "Understand BER, TER and compliance margin concepts",
              "Describe building geometry and fabric inputs",
              "Specify HVAC and lighting inputs correctly",
              "Calculate renewable energy contributions to BER"
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

        {/* Section 1: SBEM Fundamentals */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            SBEM Fundamentals and NCM Methodology
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Simplified Building Energy Model (SBEM) is the government-approved software tool for
              calculating the energy performance of non-domestic buildings and demonstrating compliance
              with Part L of the Building Regulations. It implements the National Calculation Methodology
              (NCM) to produce standardised energy assessments.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key SBEM concepts:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>NCM:</strong> National Calculation Methodology - the approved calculation framework</li>
                <li className="pl-1"><strong>BER:</strong> Building Emission Rate - calculated CO₂ emissions for the actual building</li>
                <li className="pl-1"><strong>TER:</strong> Target Emission Rate - benchmark from the notional building</li>
                <li className="pl-1"><strong>Notional building:</strong> Reference building with standardised specifications</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">SBEM Calculation Process</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Stage</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Process</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Output</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">1. Geometry Input</td>
                      <td className="border border-white/10 px-3 py-2">Define zones, areas, orientations</td>
                      <td className="border border-white/10 px-3 py-2">Building thermal model</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">2. Fabric Specification</td>
                      <td className="border border-white/10 px-3 py-2">Enter U-values, thermal mass, air tightness</td>
                      <td className="border border-white/10 px-3 py-2">Heat loss calculations</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">3. Services Input</td>
                      <td className="border border-white/10 px-3 py-2">Define HVAC, lighting, hot water systems</td>
                      <td className="border border-white/10 px-3 py-2">System energy demands</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">4. Renewables</td>
                      <td className="border border-white/10 px-3 py-2">Add PV, solar thermal, other renewables</td>
                      <td className="border border-white/10 px-3 py-2">Energy offset calculation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">5. Compliance Check</td>
                      <td className="border border-white/10 px-3 py-2">Compare BER against TER</td>
                      <td className="border border-white/10 px-3 py-2">Pass/fail and EPC rating</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Compliance requirement:</strong> BER ≤ TER - the actual building's emissions must equal or be less than the notional building target.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Building Geometry and Fabric Inputs */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Building Geometry and Fabric Inputs
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Accurate geometric and fabric data forms the foundation of SBEM calculations. The building
              is divided into thermal zones, each with defined areas, construction types, and environmental
              control requirements.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Geometric Inputs</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Zone floor areas (m²)</li>
                  <li className="pl-1">Zone heights</li>
                  <li className="pl-1">External wall areas</li>
                  <li className="pl-1">Window areas and orientation</li>
                  <li className="pl-1">Roof and floor exposures</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Fabric U-values</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">External walls (W/m²K)</li>
                  <li className="pl-1">Roof construction</li>
                  <li className="pl-1">Ground floor</li>
                  <li className="pl-1">Windows and doors</li>
                  <li className="pl-1">Thermal bridging (psi values)</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Air Tightness</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Design air permeability</li>
                  <li className="pl-1">Measured @ 50Pa</li>
                  <li className="pl-1">Units: m³/h/m²</li>
                  <li className="pl-1">Maximum: 10 m³/h/m²</li>
                  <li className="pl-1">Best practice: 3-5 m³/h/m²</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Part L 2021 Fabric Standards</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Element</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Limiting U-value</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Notional Building</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Best Practice</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">External wall</td>
                      <td className="border border-white/10 px-3 py-2">0.35 W/m²K</td>
                      <td className="border border-white/10 px-3 py-2">0.26 W/m²K</td>
                      <td className="border border-white/10 px-3 py-2">0.15-0.20 W/m²K</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Flat roof</td>
                      <td className="border border-white/10 px-3 py-2">0.25 W/m²K</td>
                      <td className="border border-white/10 px-3 py-2">0.18 W/m²K</td>
                      <td className="border border-white/10 px-3 py-2">0.10-0.15 W/m²K</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Ground floor</td>
                      <td className="border border-white/10 px-3 py-2">0.25 W/m²K</td>
                      <td className="border border-white/10 px-3 py-2">0.18 W/m²K</td>
                      <td className="border border-white/10 px-3 py-2">0.10-0.15 W/m²K</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Windows</td>
                      <td className="border border-white/10 px-3 py-2">1.60 W/m²K</td>
                      <td className="border border-white/10 px-3 py-2">1.40 W/m²K</td>
                      <td className="border border-white/10 px-3 py-2">0.80-1.20 W/m²K</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Air permeability</td>
                      <td className="border border-white/10 px-3 py-2">10 m³/h/m²</td>
                      <td className="border border-white/10 px-3 py-2">5 m³/h/m²</td>
                      <td className="border border-white/10 px-3 py-2">3 m³/h/m²</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Zoning principle:</strong> Divide the building into zones with similar activity type, HVAC system, and solar exposure for accurate modelling.
            </p>
          </div>
        </section>

        {/* Section 3: Building Services Inputs */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Building Services Inputs
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Building services typically account for 60-80% of regulated energy use in non-domestic
              buildings. Accurate specification of HVAC, lighting, and hot water systems is critical
              to achieving realistic BER calculations and optimising compliance strategies.
            </p>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">HVAC System Inputs</p>
              <div className="text-sm space-y-1 text-white">
                <p><span className="text-white/60">System type:</span> Boiler, heat pump, VRF, chiller, etc.</p>
                <p><span className="text-white/60">Heating efficiency:</span> Seasonal efficiency (%) or SCOP</p>
                <p><span className="text-white/60">Cooling efficiency:</span> Seasonal EER or SEER</p>
                <p><span className="text-white/60">Fuel type:</span> Natural gas, electricity, oil, biomass</p>
                <p><span className="text-white/60">Distribution:</span> Pipework/ductwork losses, pump/fan powers</p>
                <p><span className="text-white/60">Controls:</span> Weather compensation, optimum start, zoning</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Lighting Inputs</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Lighting Power Density (LPD):</strong> Installed watts per m² floor area</li>
                <li className="pl-1"><strong>Lamp type:</strong> LED, T5 fluorescent, metal halide, etc.</li>
                <li className="pl-1"><strong>Luminaire efficacy:</strong> Lumens per watt output</li>
                <li className="pl-1"><strong>Controls:</strong> Manual, occupancy sensing, daylight dimming, time scheduling</li>
                <li className="pl-1"><strong>Display lighting:</strong> Separate category for retail/exhibition</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Lighting Power Densities</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Space Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Notional LPD</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Good Practice LED</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Best Practice</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Office - general</td>
                      <td className="border border-white/10 px-3 py-2">12 W/m²</td>
                      <td className="border border-white/10 px-3 py-2">8-10 W/m²</td>
                      <td className="border border-white/10 px-3 py-2">6-8 W/m²</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Classroom</td>
                      <td className="border border-white/10 px-3 py-2">14 W/m²</td>
                      <td className="border border-white/10 px-3 py-2">10-12 W/m²</td>
                      <td className="border border-white/10 px-3 py-2">8-10 W/m²</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Retail - general</td>
                      <td className="border border-white/10 px-3 py-2">18 W/m²</td>
                      <td className="border border-white/10 px-3 py-2">12-15 W/m²</td>
                      <td className="border border-white/10 px-3 py-2">10-12 W/m²</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Circulation</td>
                      <td className="border border-white/10 px-3 py-2">8 W/m²</td>
                      <td className="border border-white/10 px-3 py-2">5-6 W/m²</td>
                      <td className="border border-white/10 px-3 py-2">3-5 W/m²</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Warehouse</td>
                      <td className="border border-white/10 px-3 py-2">6 W/m²</td>
                      <td className="border border-white/10 px-3 py-2">4-5 W/m²</td>
                      <td className="border border-white/10 px-3 py-2">2-4 W/m²</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">HVAC Efficiency Standards</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">System Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Minimum Efficiency</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Good Practice</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Gas boiler</td>
                      <td className="border border-white/10 px-3 py-2">91% gross</td>
                      <td className="border border-white/10 px-3 py-2">95%+ condensing</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Air source heat pump</td>
                      <td className="border border-white/10 px-3 py-2">SCOP 2.8</td>
                      <td className="border border-white/10 px-3 py-2">SCOP 3.5-4.0</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Ground source heat pump</td>
                      <td className="border border-white/10 px-3 py-2">SCOP 3.5</td>
                      <td className="border border-white/10 px-3 py-2">SCOP 4.0-4.5</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Air-cooled chiller</td>
                      <td className="border border-white/10 px-3 py-2">SEER 3.0</td>
                      <td className="border border-white/10 px-3 py-2">SEER 4.0+</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">VRF system</td>
                      <td className="border border-white/10 px-3 py-2">SCOP 3.2 / SEER 4.5</td>
                      <td className="border border-white/10 px-3 py-2">SCOP 4.0 / SEER 6.0</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Services impact:</strong> In offices, HVAC and lighting typically account for 60-70% of regulated emissions - these are priority areas for BER reduction.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: BER, TER and Compliance Demonstration */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            BER, TER and Compliance Demonstration
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Part L compliance is demonstrated by comparing the Building Emission Rate (BER) against
              the Target Emission Rate (TER). The TER is derived from a notional building - a reference
              design with the same geometry but standardised fabric and services specifications.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Compliance Calculation</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Target Emission Rate (TER)</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>Same geometry as actual building</li>
                    <li>Standardised U-values (notional)</li>
                    <li>Standardised services efficiencies</li>
                    <li>No renewables contribution</li>
                    <li>Sets the compliance benchmark</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Building Emission Rate (BER)</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>Actual proposed building design</li>
                    <li>Specified U-values</li>
                    <li>Specified services efficiencies</li>
                    <li>Includes renewable contribution</li>
                    <li>Must be ≤ TER for compliance</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-green-500/10 border border-green-500/30">
              <p className="text-sm font-medium text-green-400 mb-2">Compliance Margin Calculation</p>
              <div className="font-mono text-sm space-y-1 text-white">
                <p>Compliance Margin (%) = (TER - BER) / TER × 100</p>
                <p className="mt-2 text-white/70">Example:</p>
                <p>TER = 25.5 kgCO₂/m²/year</p>
                <p>BER = 22.3 kgCO₂/m²/year</p>
                <p>Margin = (25.5 - 22.3) / 25.5 × 100 = <span className="text-green-400">12.5% improvement</span></p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Renewable Energy Contributions</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Technology</th>
                      <th className="border border-white/10 px-3 py-2 text-left">SBEM Treatment</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Contribution</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Roof-mounted PV</td>
                      <td className="border border-white/10 px-3 py-2">kWp, orientation, tilt, shading</td>
                      <td className="border border-white/10 px-3 py-2">5-15% BER reduction</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Solar thermal (DHW)</td>
                      <td className="border border-white/10 px-3 py-2">Collector area, storage volume</td>
                      <td className="border border-white/10 px-3 py-2">2-5% BER reduction</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Biomass boiler</td>
                      <td className="border border-white/10 px-3 py-2">Low carbon factor for fuel</td>
                      <td className="border border-white/10 px-3 py-2">30-50% BER reduction</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Wind turbine</td>
                      <td className="border border-white/10 px-3 py-2">Rated output, hub height</td>
                      <td className="border border-white/10 px-3 py-2">Variable by location</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">CHP (Combined Heat and Power)</td>
                      <td className="border border-white/10 px-3 py-2">Electrical/thermal efficiency</td>
                      <td className="border border-white/10 px-3 py-2">10-25% BER reduction</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">SBEM Output Documents</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>BRUKL document:</strong> Building Regulations UK Part L - detailed compliance report</li>
                <li className="pl-1"><strong>EPC:</strong> Energy Performance Certificate with A-G rating</li>
                <li className="pl-1"><strong>Recommendations report:</strong> Improvement measures for building occupants</li>
                <li className="pl-1"><strong>Input summary:</strong> Complete record of all calculation inputs</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Design stage vs as-built:</strong> Initial calculations use design specifications; as-built calculations must reflect actual installed equipment and measured air tightness test results.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Office Building SBEM Input Summary</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> 2,500m² open plan office, 3 storeys, gas heating with VRF cooling.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Building Geometry:</p>
                <p className="ml-4">Total floor area: 2,500 m²</p>
                <p className="ml-4">External wall area: 1,200 m²</p>
                <p className="ml-4">Glazing ratio: 40% (480 m² windows)</p>
                <p className="ml-4">Roof area: 833 m² (flat)</p>
                <p className="mt-2 text-white/60">Fabric U-values:</p>
                <p className="ml-4">Walls: 0.22 W/m²K (below notional 0.26)</p>
                <p className="ml-4">Roof: 0.15 W/m²K (below notional 0.18)</p>
                <p className="ml-4">Windows: 1.2 W/m²K (below notional 1.4)</p>
                <p className="ml-4">Air permeability: 4 m³/h/m² @ 50Pa</p>
                <p className="mt-2 text-white/60">Services:</p>
                <p className="ml-4">Heating: Condensing gas boilers, 95% efficiency</p>
                <p className="ml-4">Cooling: VRF system, SEER 5.5</p>
                <p className="ml-4">Lighting: LED throughout, 8 W/m² average LPD</p>
                <p className="ml-4">Controls: BEMS with weather compensation</p>
                <p className="mt-2 text-green-400">Result: TER 28.2, BER 23.5 = 16.7% compliance margin</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: PV Contribution Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Calculate PV system size needed to achieve 10% BER reduction.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Given data:</p>
                <p className="ml-4">Building floor area: 2,500 m²</p>
                <p className="ml-4">Baseline BER: 26.0 kgCO₂/m²/year</p>
                <p className="ml-4">Target BER reduction: 10%</p>
                <p className="ml-4">Grid electricity factor: 0.136 kgCO₂/kWh</p>
                <p className="ml-4">PV yield (south, 30° tilt): 950 kWh/kWp/year</p>
                <p className="mt-2 text-white/60">Calculation:</p>
                <p className="ml-4">Required CO₂ offset = 26.0 × 0.10 = 2.6 kgCO₂/m²/year</p>
                <p className="ml-4">Total offset = 2.6 × 2,500 = 6,500 kgCO₂/year</p>
                <p className="ml-4">Electricity equivalent = 6,500 / 0.136 = 47,794 kWh/year</p>
                <p className="ml-4">PV capacity = 47,794 / 950 = <span className="text-green-400">50.3 kWp required</span></p>
                <p className="mt-2 text-white/60">Roof check:</p>
                <p className="ml-4">Approx. 6 m²/kWp → 302 m² roof area needed</p>
                <p className="ml-4 text-green-400">833 m² available - feasible installation</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Lighting Impact Assessment</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Compare BER impact of fluorescent vs LED lighting in retail unit.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Retail unit: 1,000 m², 3,000 operating hours/year</p>
                <p className="mt-2 text-white/60">Option A - T5 Fluorescent:</p>
                <p className="ml-4">LPD: 16 W/m²</p>
                <p className="ml-4">Annual energy: 16 × 1,000 × 3,000 = 48,000 kWh</p>
                <p className="ml-4">CO₂: 48,000 × 0.136 = 6,528 kgCO₂</p>
                <p className="ml-4">Per m²: 6.53 kgCO₂/m²/year</p>
                <p className="mt-2 text-white/60">Option B - LED with Controls:</p>
                <p className="ml-4">LPD: 10 W/m²</p>
                <p className="ml-4">Daylight dimming saving: 15%</p>
                <p className="ml-4">Effective hours: 3,000 × 0.85 = 2,550 hours</p>
                <p className="ml-4">Annual energy: 10 × 1,000 × 2,550 = 25,500 kWh</p>
                <p className="ml-4">CO₂: 25,500 × 0.136 = 3,468 kgCO₂</p>
                <p className="ml-4">Per m²: 3.47 kgCO₂/m²/year</p>
                <p className="mt-2 text-green-400">LED saving: 3.06 kgCO₂/m²/year (47% reduction)</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">SBEM Submission Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Complete floor plans with zone boundaries marked</li>
                <li className="pl-1">U-value calculations or manufacturer data for all elements</li>
                <li className="pl-1">HVAC schematic with equipment specifications</li>
                <li className="pl-1">Lighting layout with luminaire schedule and LPD calculation</li>
                <li className="pl-1">Renewable system specifications and layouts</li>
                <li className="pl-1">Air tightness test results (as-built stage)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Air permeability maximum: <strong>10 m³/h/m² @ 50Pa</strong></li>
                <li className="pl-1">Office lighting LPD benchmark: <strong>8-12 W/m²</strong></li>
                <li className="pl-1">Good heat pump SCOP: <strong>3.5-4.0</strong></li>
                <li className="pl-1">Grid electricity CO₂ factor: <strong>0.136 kgCO₂/kWh</strong> (2024)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common SBEM Errors to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Incorrect zoning</strong> - zones must match activity type and HVAC systems</li>
                <li className="pl-1"><strong>Missing thermal bridges</strong> - psi values significantly affect heat loss</li>
                <li className="pl-1"><strong>Wrong activity database</strong> - use correct NCM activity for each zone</li>
                <li className="pl-1"><strong>Optimistic air tightness</strong> - specify achievable values, not aspirational</li>
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
                <p className="font-medium text-white mb-1">SBEM Key Concepts</p>
                <ul className="space-y-0.5">
                  <li>NCM - National Calculation Methodology</li>
                  <li>BER - Building Emission Rate (actual)</li>
                  <li>TER - Target Emission Rate (notional)</li>
                  <li>Compliance: BER ≤ TER</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Input Categories</p>
                <ul className="space-y-0.5">
                  <li>Geometry - zones, areas, orientations</li>
                  <li>Fabric - U-values, thermal bridges</li>
                  <li>Services - HVAC, lighting, DHW</li>
                  <li>Renewables - PV, solar thermal, etc.</li>
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
            <Link to="../h-n-c-module6-section1-3">
              Next: Building Fabric Assessment
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule6Section1_2;
