import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "BS 7671, CIBSE and Part L Requirements for Energy Efficiency - HNC Module 3 Section 6.6";
const DESCRIPTION = "Master UK regulatory frameworks governing energy efficiency in electrical installations: Building Regulations Part L, CIBSE guides, BS 7671, BREEAM and compliance documentation.";

const quickCheckQuestions = [
  {
    id: "part-l-purpose",
    question: "What is the primary purpose of Building Regulations Approved Document Part L?",
    options: ["Fire safety", "Conservation of fuel and power", "Structural integrity", "Electrical safety"],
    correctIndex: 1,
    explanation: "Part L (Conservation of fuel and power) sets requirements for energy efficiency in new and existing buildings, including fabric performance, fixed building services, and on-site energy generation."
  },
  {
    id: "ter-ber",
    question: "For compliance with Part L, what must be demonstrated about TER and BER?",
    options: ["TER must equal BER", "BER must be less than TER", "TER must be less than BER", "They are unrelated"],
    correctIndex: 1,
    explanation: "The Building Emission Rate (BER) must be less than or equal to the Target Emission Rate (TER). This demonstrates that the actual building design produces fewer CO₂ emissions than the notional reference building."
  },
  {
    id: "sub-metering",
    question: "Under Part L, when is sub-metering required for a new non-domestic building?",
    options: ["Never required", "Buildings over 500m²", "Buildings over 1000m²", "All buildings regardless of size"],
    correctIndex: 2,
    explanation: "Part L requires sub-metering for non-domestic buildings with a total useful floor area greater than 1000m². This enables monitoring of energy use by end-use category (lighting, heating, cooling, etc.)."
  },
  {
    id: "dec-rating",
    question: "What does a Display Energy Certificate (DEC) rating of 'A' indicate?",
    options: ["The building meets minimum standards", "Very poor energy performance", "Very efficient energy performance", "The building is exempt from requirements"],
    correctIndex: 2,
    explanation: "DEC ratings run from A (most efficient) to G (least efficient). An 'A' rating indicates the building's operational energy performance is significantly better than the typical benchmark for that building type."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What does Part L Volume 2 specifically cover?",
    options: [
      "New dwellings only",
      "New buildings other than dwellings",
      "Existing dwellings only",
      "Conservation areas"
    ],
    correctAnswer: 1,
    explanation: "Part L is split into volumes: Volume 1 covers new dwellings, Volume 2 covers new buildings other than dwellings (commercial/industrial). There are separate volumes for existing buildings."
  },
  {
    id: 2,
    question: "The Target Fabric Energy Efficiency (TFEE) rate is measured in which units?",
    options: ["kWh/m²/year", "W/m²K", "kgCO₂/m²/year", "lux/W"],
    correctAnswer: 0,
    explanation: "TFEE is expressed in kWh/m²/year and represents the maximum fabric energy demand for space heating and cooling. This ensures good thermal performance regardless of heating system efficiency."
  },
  {
    id: 3,
    question: "Which CIBSE guide specifically addresses sustainability in building services?",
    options: ["CIBSE Guide A", "CIBSE Guide F", "CIBSE Guide L", "CIBSE Guide M"],
    correctAnswer: 2,
    explanation: "CIBSE Guide L: Sustainability covers the environmental design of buildings including energy efficiency, carbon emissions, and sustainable building services strategies."
  },
  {
    id: 4,
    question: "Under BS 7671, which regulation specifically addresses maximum demand and diversity?",
    options: ["Regulation 132.5", "Regulation 311.1", "Regulation 433.1", "Regulation 525.1"],
    correctAnswer: 1,
    explanation: "Regulation 311.1 requires assessment of maximum demand, taking into account diversity where applicable. This is essential for efficient sizing of supplies and reduces oversizing waste."
  },
  {
    id: 5,
    question: "What is the minimum BREEAM rating required for new public buildings under government procurement?",
    options: ["Pass", "Good", "Very Good", "Excellent"],
    correctAnswer: 3,
    explanation: "UK government procurement requires new public buildings to achieve BREEAM 'Excellent' rating. This ensures high environmental performance across energy, water, materials, and other categories."
  },
  {
    id: 6,
    question: "For buildings over 1000m², Part L requires sub-metering by which categories?",
    options: [
      "Floor by floor only",
      "End-use category (lighting, heating, etc.)",
      "Per room only",
      "Main incomer only"
    ],
    correctAnswer: 1,
    explanation: "Sub-metering must enable at least 90% of estimated annual energy consumption to be assigned to end-use categories: heating, hot water, cooling, ventilation, lighting, small power, and other major loads."
  },
  {
    id: 7,
    question: "Which document must be provided to the building control body before work commences on a new non-domestic building?",
    options: [
      "Design stage BRUKL output",
      "As-built calculations only",
      "EPC certificate",
      "Completion certificate"
    ],
    correctAnswer: 0,
    explanation: "A design stage BRUKL (Building Regulations UK Part L) output document must be submitted showing predicted compliance. As-built calculations are required at completion to confirm actual compliance."
  },
  {
    id: 8,
    question: "What is the maximum circuit watts loss (CWL) allowed under Part L for LED lighting circuits?",
    options: ["2 W/m²", "3 W/m²", "5 W/m²", "No specific limit - varies by space type"],
    correctAnswer: 3,
    explanation: "Part L specifies maximum lighting efficacy requirements (lamp-circuit lumens per circuit watt) rather than fixed W/m² limits. Requirements vary by space type and are detailed in the Non-Domestic Building Services Compliance Guide."
  },
  {
    id: 9,
    question: "How often must a Display Energy Certificate (DEC) be renewed for a building over 1000m²?",
    options: ["Every year", "Every 5 years", "Every 7 years", "Every 10 years"],
    correctAnswer: 0,
    explanation: "DECs for buildings over 1000m² must be renewed annually based on actual metered energy consumption data. Smaller public buildings (250-1000m²) require renewal every 10 years."
  },
  {
    id: 10,
    question: "In BREEAM assessments, what percentage weighting does 'Energy' typically receive in the overall score?",
    options: ["5%", "10%", "15-19%", "25-30%"],
    correctAnswer: 2,
    explanation: "Energy typically has a weighting of 15-19% in BREEAM assessments (varies by building type). It is one of the most significant categories alongside Health & Wellbeing and Management."
  }
];

const faqs = [
  {
    question: "What is the difference between an EPC and a DEC?",
    answer: "An Energy Performance Certificate (EPC) rates the theoretical energy performance based on building design and is required for sale/let of buildings. A Display Energy Certificate (DEC) rates actual operational energy performance based on metered consumption and is required for public buildings over 250m². EPCs are valid for 10 years; DECs are annual for larger buildings."
  },
  {
    question: "Does BS 7671 directly mandate energy efficiency requirements?",
    answer: "BS 7671 does not set specific energy efficiency targets but includes fundamental principles supporting efficient design: Regulation 132.5 requires consideration of reasonably foreseeable influences (including energy efficiency), Regulation 311.1 addresses maximum demand assessment, and Chapter 55 covers coordination with other systems. BS 7671 works alongside Part L and CIBSE guidance."
  },
  {
    question: "How do I demonstrate Part L compliance for a lighting installation?",
    answer: "You must demonstrate that lighting achieves minimum efficacy (lamp-circuit lumens per circuit watt), has appropriate controls (occupancy sensing, daylight dimming where required), and that total power density is reasonable for the space type. Documentation includes luminaire schedules, control strategies, and calculations showing compliance with Non-Domestic Building Services Compliance Guide criteria."
  },
  {
    question: "What happens if a building fails to meet Part L requirements?",
    answer: "Building control can refuse to issue a completion certificate until compliance is demonstrated. This may require modifications to building services, additional insulation, or enhanced controls. In serious cases, enforcement action can be taken. It is essential to verify compliance at design stage to avoid costly remedial work."
  },
  {
    question: "Are there exemptions from Part L requirements?",
    answer: "Some exemptions exist: buildings with very low energy demand (<50kWh/m²/year), temporary buildings (<2 years), places of worship, industrial sites with low heating requirements, and certain listed buildings where compliance would unacceptably alter character. However, even exempt buildings should follow best practice for energy efficiency."
  },
  {
    question: "How does Part L interact with ventilation requirements in Part F?",
    answer: "Part L and Part F must be considered together. Improved airtightness (Part L) requires mechanical ventilation with heat recovery (MVHR) to maintain air quality (Part F). Ventilation system efficiency (Specific Fan Power in W/l/s) is limited by Part L. Building services designers must balance thermal performance, ventilation rates, and energy consumption."
  }
];

const HNCModule3Section6_6 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module3-section6">
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
            <span>Module 3.6.6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            BS 7671, CIBSE and Part L Requirements for Energy Efficiency
          </h1>
          <p className="text-white/80">
            UK regulatory frameworks governing energy efficiency in electrical installations for building services
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Part L:</strong> Conservation of fuel and power in buildings</li>
              <li className="pl-1"><strong>TER vs BER:</strong> Target vs actual CO₂ emissions</li>
              <li className="pl-1"><strong>CIBSE Guide L:</strong> Sustainability in building services</li>
              <li className="pl-1"><strong>BS 7671:</strong> Supporting efficient design principles</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Sub-metering:</strong> Required for buildings over 1000m²</li>
              <li className="pl-1"><strong>BREEAM:</strong> Environmental assessment method</li>
              <li className="pl-1"><strong>DECs:</strong> Display Energy Certificates for public buildings</li>
              <li className="pl-1"><strong>Documentation:</strong> Design stage and as-built compliance</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You Will Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain Building Regulations Part L structure and requirements",
              "Calculate and compare TER, BER, TFEE and DFEE metrics",
              "Apply CIBSE Guide L sustainability principles",
              "Understand BS 7671 regulations supporting energy efficiency",
              "Design compliant sub-metering installations",
              "Explain BREEAM energy credits and DEC requirements",
              "Prepare compliance documentation for building control"
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

        {/* Section 1: Building Regulations Part L Overview */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Building Regulations Part L Overview
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Part L of the Building Regulations addresses the conservation of fuel and power. It sets
              minimum standards for the energy performance of new buildings, extensions, and building
              services installations, forming the cornerstone of UK building energy legislation.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Part L Structure (2021 Edition)</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Volume 1:</strong> New dwellings - residential energy requirements</li>
                <li className="pl-1"><strong>Volume 2:</strong> New buildings other than dwellings - commercial/industrial</li>
                <li className="pl-1"><strong>Existing Dwellings:</strong> Extensions, renovations, and alterations</li>
                <li className="pl-1"><strong>Existing Buildings:</strong> Non-domestic extensions and work</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Part L Requirements for Building Services</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Requirement</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Compliance Method</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Energy efficiency of fixed building services</td>
                      <td className="border border-white/10 px-3 py-2">Heating, cooling, lighting, ventilation</td>
                      <td className="border border-white/10 px-3 py-2">Meet minimum efficacy standards</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Controls for building services</td>
                      <td className="border border-white/10 px-3 py-2">Time, temperature, occupancy sensing</td>
                      <td className="border border-white/10 px-3 py-2">Appropriate control strategy</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Commissioning of systems</td>
                      <td className="border border-white/10 px-3 py-2">All fixed building services</td>
                      <td className="border border-white/10 px-3 py-2">CIBSE commissioning codes</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Energy metering</td>
                      <td className="border border-white/10 px-3 py-2">Buildings over 1000m²</td>
                      <td className="border border-white/10 px-3 py-2">Sub-metering by end-use category</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Information provision</td>
                      <td className="border border-white/10 px-3 py-2">Building owner/occupier</td>
                      <td className="border border-white/10 px-3 py-2">Building log book, O&M manuals</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">2021 Part L Updates</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">~31% reduction in carbon emissions compared to 2013 standards</li>
                <li className="pl-1">Introduction of primary energy metric alongside CO₂</li>
                <li className="pl-1">Enhanced ventilation requirements linked to Part F</li>
                <li className="pl-1">Pathway towards Future Homes/Buildings Standard (2025)</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Note:</strong> Part L works alongside the Non-Domestic Building Services Compliance Guide which provides detailed technical guidance for each building service type.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: TER vs BER */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Target Emission Rate (TER) vs Building Emission Rate (BER)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Part L compliance requires demonstrating that a building's calculated carbon dioxide
              emissions do not exceed the target set by the regulations. This is achieved through
              comparison of the TER (Target Emission Rate) and BER (Building Emission Rate).
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Understanding the Metrics</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-elec-yellow mb-1">TER (Target Emission Rate)</p>
                  <p className="text-sm text-white/80">The maximum CO₂ emission rate for a 'notional' reference building of the same size, shape and use. Calculated using SBEM or approved software.</p>
                  <p className="text-xs text-white/60 mt-2">Unit: kgCO₂/m²/year</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-elec-yellow mb-1">BER (Building Emission Rate)</p>
                  <p className="text-sm text-white/80">The actual calculated CO₂ emission rate for the proposed building design, based on specified fabric, systems and controls.</p>
                  <p className="text-xs text-white/60 mt-2">Unit: kgCO₂/m²/year</p>
                </div>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-green-500/10 border border-green-500/20">
              <p className="text-sm font-medium text-green-400 mb-2">Compliance Criterion</p>
              <p className="text-center text-lg font-mono text-white mb-2">BER ≤ TER</p>
              <p className="text-sm text-white/80 text-center">The building emission rate must not exceed the target emission rate</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Additional Metrics</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Metric</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Description</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Unit</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">TFEE</td>
                      <td className="border border-white/10 px-3 py-2">Target Fabric Energy Efficiency - maximum fabric energy demand</td>
                      <td className="border border-white/10 px-3 py-2">kWh/m²/year</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">DFEE</td>
                      <td className="border border-white/10 px-3 py-2">Dwelling Fabric Energy Efficiency - actual fabric performance</td>
                      <td className="border border-white/10 px-3 py-2">kWh/m²/year</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">TPER</td>
                      <td className="border border-white/10 px-3 py-2">Target Primary Energy Rate - total primary energy target</td>
                      <td className="border border-white/10 px-3 py-2">kWh/m²/year</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">BPER</td>
                      <td className="border border-white/10 px-3 py-2">Building Primary Energy Rate - actual primary energy use</td>
                      <td className="border border-white/10 px-3 py-2">kWh/m²/year</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Calculation Tools</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>SBEM:</strong> Simplified Building Energy Model - free government tool for non-domestic buildings</li>
                <li className="pl-1"><strong>SAP:</strong> Standard Assessment Procedure - for domestic buildings</li>
                <li className="pl-1"><strong>DSM:</strong> Dynamic Simulation Modelling - IES, TAS, etc. for complex buildings</li>
                <li className="pl-1"><strong>BRUKL:</strong> Building Regulations UK Part L - output document format</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design tip:</strong> Aim for BER significantly below TER to allow margin for as-built variations and to achieve BREEAM energy credits.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: CIBSE Guide L */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            CIBSE Guide L: Sustainability
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              CIBSE Guide L provides comprehensive guidance on sustainability in building services engineering,
              covering environmental design principles, energy efficiency strategies, and the role of building
              services in achieving sustainable buildings.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key CIBSE Guides for Energy Efficiency</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Guide</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Title</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Energy Relevance</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Guide L</td>
                      <td className="border border-white/10 px-3 py-2">Sustainability</td>
                      <td className="border border-white/10 px-3 py-2">Primary guide for sustainable building services design</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Guide F</td>
                      <td className="border border-white/10 px-3 py-2">Energy Efficiency in Buildings</td>
                      <td className="border border-white/10 px-3 py-2">Detailed energy benchmarks and calculation methods</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Guide A</td>
                      <td className="border border-white/10 px-3 py-2">Environmental Design</td>
                      <td className="border border-white/10 px-3 py-2">Thermal comfort, indoor environment criteria</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Guide M</td>
                      <td className="border border-white/10 px-3 py-2">Maintenance Engineering</td>
                      <td className="border border-white/10 px-3 py-2">Maintaining system efficiency over building lifetime</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">TM54</td>
                      <td className="border border-white/10 px-3 py-2">Evaluating Operational Energy</td>
                      <td className="border border-white/10 px-3 py-2">Predicting actual energy use vs design calculations</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">CIBSE Guide L Key Topics</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Energy hierarchy principles</li>
                  <li className="pl-1">Low and zero carbon technologies</li>
                  <li className="pl-1">Passive design strategies</li>
                  <li className="pl-1">Lifecycle carbon assessment</li>
                </ul>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Water efficiency</li>
                  <li className="pl-1">Material selection</li>
                  <li className="pl-1">Indoor air quality</li>
                  <li className="pl-1">Building adaptation and resilience</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">CIBSE Energy Hierarchy</p>
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-2 rounded bg-green-500/10">
                  <span className="text-green-400 font-bold w-6">1</span>
                  <span className="text-sm"><strong>Be Lean:</strong> Reduce demand through passive design and efficiency</span>
                </div>
                <div className="flex items-center gap-3 p-2 rounded bg-blue-500/10">
                  <span className="text-blue-400 font-bold w-6">2</span>
                  <span className="text-sm"><strong>Be Clean:</strong> Use efficient and low carbon energy supply</span>
                </div>
                <div className="flex items-center gap-3 p-2 rounded bg-yellow-500/10">
                  <span className="text-yellow-400 font-bold w-6">3</span>
                  <span className="text-sm"><strong>Be Green:</strong> Maximise on-site renewable energy generation</span>
                </div>
                <div className="flex items-center gap-3 p-2 rounded bg-purple-500/10">
                  <span className="text-purple-400 font-bold w-6">4</span>
                  <span className="text-sm"><strong>Be Seen:</strong> Monitor, verify and report performance</span>
                </div>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Application:</strong> CIBSE guides provide the technical detail to support Part L compliance and go beyond minimum standards towards best practice sustainable design.
            </p>
          </div>
        </section>

        {/* Section 4: BS 7671 Requirements */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            BS 7671 Requirements for Efficiency
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              While BS 7671 (IET Wiring Regulations) primarily addresses electrical safety, it includes
              several requirements that support energy efficient design. Understanding these provisions
              helps integrate safety and sustainability in electrical installations.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Relevant BS 7671 Regulations</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Regulation</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Requirement</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Energy Efficiency Relevance</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-mono">132.5</td>
                      <td className="border border-white/10 px-3 py-2">Reasonably foreseeable influences</td>
                      <td className="border border-white/10 px-3 py-2">Include energy efficiency as a design consideration</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-mono">311.1</td>
                      <td className="border border-white/10 px-3 py-2">Maximum demand assessment</td>
                      <td className="border border-white/10 px-3 py-2">Prevents oversized supplies - reduces losses</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-mono">Chapter 55</td>
                      <td className="border border-white/10 px-3 py-2">Other equipment (BMS, controls)</td>
                      <td className="border border-white/10 px-3 py-2">Coordination with control and automation systems</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-mono">525</td>
                      <td className="border border-white/10 px-3 py-2">Voltage drop requirements</td>
                      <td className="border border-white/10 px-3 py-2">Ensures efficient power transmission</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-mono">314</td>
                      <td className="border border-white/10 px-3 py-2">Division of installation</td>
                      <td className="border border-white/10 px-3 py-2">Circuit separation enables sub-metering</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 grid sm:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Regulation 311.1 - Maximum Demand</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Assess maximum demand with diversity</li>
                  <li className="pl-1">Prevents over-specification of supply</li>
                  <li className="pl-1">Reduces transformer and cable losses</li>
                  <li className="pl-1">Refer to Appendix 1 for diversity factors</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Regulation 525 - Voltage Drop</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Maximum 5% for power circuits</li>
                  <li className="pl-1">Maximum 3% for lighting circuits</li>
                  <li className="pl-1">Excessive Vd wastes energy as heat</li>
                  <li className="pl-1">Consider cable upsizing for long runs</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Appendix 12 - Voltage Drop Calculations</p>
              <p className="text-sm text-white mb-2">Voltage drop = (mV/A/m) × Ib × L / 1000</p>
              <p className="text-sm text-white/80">
                Where mV/A/m is from the cable tables, Ib is design current, and L is circuit length.
                Lower voltage drop means more efficient power delivery and reduced cable heating.
              </p>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Integration:</strong> BS 7671 supports energy efficiency through proper design practices - correct cable sizing, appropriate diversity factors, and coordination with building services controls.
            </p>
          </div>
        </section>

        {/* Section 5: Metering Requirements */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Metering Requirements (Sub-Metering)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Part L requires sub-metering in larger non-domestic buildings to enable effective monitoring
              and management of energy consumption. This allows building operators to identify waste,
              verify system performance, and target energy reduction measures.
            </p>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <p className="text-sm font-medium text-blue-400 mb-2">Part L Metering Threshold</p>
              <p className="text-lg text-white text-center font-medium">Buildings &gt; 1000m² useful floor area</p>
              <p className="text-sm text-white/80 text-center mt-2">Must provide sub-metering enabling at least 90% of estimated annual energy consumption to be assigned to end-use categories</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Required Sub-Metering Categories</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Lighting:</strong> General, display, emergency</li>
                  <li className="pl-1"><strong>Heating:</strong> Space heating, including pumps</li>
                  <li className="pl-1"><strong>Cooling:</strong> Chillers, DX systems, pumps</li>
                  <li className="pl-1"><strong>Ventilation:</strong> AHUs, fans, extract systems</li>
                </ul>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Hot water:</strong> Domestic hot water generation</li>
                  <li className="pl-1"><strong>Small power:</strong> Socket outlets, IT equipment</li>
                  <li className="pl-1"><strong>Large loads:</strong> Kitchens, lifts, server rooms</li>
                  <li className="pl-1"><strong>Renewables:</strong> Generation and export metering</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Sub-Metering Installation Design</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Meter Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Application</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Output Options</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">DIN rail kWh meter</td>
                      <td className="border border-white/10 px-3 py-2">Individual circuits in distribution boards</td>
                      <td className="border border-white/10 px-3 py-2">Pulse, Modbus, M-Bus</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">CT operated meter</td>
                      <td className="border border-white/10 px-3 py-2">Larger loads, busbar systems</td>
                      <td className="border border-white/10 px-3 py-2">Pulse, Modbus, BACnet</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Multi-circuit meter</td>
                      <td className="border border-white/10 px-3 py-2">Multiple circuits from single device</td>
                      <td className="border border-white/10 px-3 py-2">Ethernet, cloud platform</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Smart meter</td>
                      <td className="border border-white/10 px-3 py-2">Main incomer (fiscal metering)</td>
                      <td className="border border-white/10 px-3 py-2">Half-hourly data to supplier</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Best Practice Metering Strategy</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Design distribution to group similar loads for efficient metering</li>
                <li className="pl-1">Connect meters to BMS for automatic data collection and trending</li>
                <li className="pl-1">Provide sufficient CT space in panels for future metering</li>
                <li className="pl-1">Use automatic meter reading (AMR) to enable analysis and reporting</li>
                <li className="pl-1">Consider tenant sub-metering for multi-let buildings</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>BREEAM:</strong> Enhanced metering beyond Part L minimum can contribute to BREEAM credits under category Ene 02 (Energy monitoring).
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 6: BREEAM and Energy Credits */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            BREEAM and Energy Credits
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BREEAM (Building Research Establishment Environmental Assessment Method) is the leading
              sustainability assessment method for buildings in the UK. Energy performance is one of
              the most heavily weighted categories, making electrical installation design crucial.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">BREEAM Rating Levels</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Rating</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Score Required</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-white/60">
                      <td className="border border-white/10 px-3 py-2">Unclassified</td>
                      <td className="border border-white/10 px-3 py-2">&lt;30%</td>
                      <td className="border border-white/10 px-3 py-2">Below minimum standard</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Pass</td>
                      <td className="border border-white/10 px-3 py-2">≥30%</td>
                      <td className="border border-white/10 px-3 py-2">Minimum acceptable performance</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Good</td>
                      <td className="border border-white/10 px-3 py-2">≥45%</td>
                      <td className="border border-white/10 px-3 py-2">Standard commercial development</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Very Good</td>
                      <td className="border border-white/10 px-3 py-2">≥55%</td>
                      <td className="border border-white/10 px-3 py-2">Good commercial practice</td>
                    </tr>
                    <tr className="bg-green-500/10">
                      <td className="border border-white/10 px-3 py-2 font-medium">Excellent</td>
                      <td className="border border-white/10 px-3 py-2">≥70%</td>
                      <td className="border border-white/10 px-3 py-2">UK government requirement for public buildings</td>
                    </tr>
                    <tr className="bg-yellow-500/10">
                      <td className="border border-white/10 px-3 py-2 font-medium">Outstanding</td>
                      <td className="border border-white/10 px-3 py-2">≥85%</td>
                      <td className="border border-white/10 px-3 py-2">Top 1% of buildings - exemplar projects</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Energy-Related BREEAM Credits</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Credit</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Title</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Electrical Services Contribution</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-mono">Ene 01</td>
                      <td className="border border-white/10 px-3 py-2">Reduction of energy use and carbon emissions</td>
                      <td className="border border-white/10 px-3 py-2">Efficient lighting, controls, low loss transformers</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-mono">Ene 02</td>
                      <td className="border border-white/10 px-3 py-2">Energy monitoring</td>
                      <td className="border border-white/10 px-3 py-2">Sub-metering installation, BMS integration</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-mono">Ene 03</td>
                      <td className="border border-white/10 px-3 py-2">External lighting</td>
                      <td className="border border-white/10 px-3 py-2">Efficient luminaires, controls, light pollution</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-mono">Ene 04</td>
                      <td className="border border-white/10 px-3 py-2">Low carbon design</td>
                      <td className="border border-white/10 px-3 py-2">Passive design analysis, energy strategy</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-mono">Ene 05</td>
                      <td className="border border-white/10 px-3 py-2">Energy efficient cold storage</td>
                      <td className="border border-white/10 px-3 py-2">Refrigeration controls, defrost management</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-mono">Ene 06</td>
                      <td className="border border-white/10 px-3 py-2">Energy efficient transportation</td>
                      <td className="border border-white/10 px-3 py-2">Efficient lifts and escalators, regenerative drives</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Ene 01 - Energy Performance Credits</p>
              <p className="text-sm text-white mb-2">Credits awarded based on Energy Performance Ratio (EPR):</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">EPR compares actual BER/BPER to Part L baseline</li>
                <li className="pl-1">Up to 15 credits available (varies by scheme)</li>
                <li className="pl-1">Credits scale with improvement beyond Part L</li>
                <li className="pl-1">Minimum standards required for 'Excellent' and 'Outstanding'</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Tip:</strong> Early engagement with a BREEAM assessor allows electrical design to target specific credits cost-effectively.
            </p>
          </div>
        </section>

        {/* Section 7: Display Energy Certificates */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            Display Energy Certificates (DECs)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Display Energy Certificates (DECs) show the actual energy performance of public buildings
              based on metered consumption data. Unlike EPCs which are theoretical, DECs reflect real
              operational performance and must be displayed prominently in the building.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">DEC Requirements</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Building Size</th>
                      <th className="border border-white/10 px-3 py-2 text-left">DEC Required</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Renewal Period</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Advisory Report</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">&gt;1000m²</td>
                      <td className="border border-white/10 px-3 py-2">Yes - mandatory</td>
                      <td className="border border-white/10 px-3 py-2">Annual</td>
                      <td className="border border-white/10 px-3 py-2">Every 7 years</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">250-1000m²</td>
                      <td className="border border-white/10 px-3 py-2">Yes - mandatory</td>
                      <td className="border border-white/10 px-3 py-2">Every 10 years</td>
                      <td className="border border-white/10 px-3 py-2">Every 10 years</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">&lt;250m²</td>
                      <td className="border border-white/10 px-3 py-2">Not required</td>
                      <td className="border border-white/10 px-3 py-2">-</td>
                      <td className="border border-white/10 px-3 py-2">-</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 grid sm:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">DEC Rating Scale</p>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="w-8 h-6 rounded bg-green-600 flex items-center justify-center font-bold text-white">A</span>
                    <span>0-25: Very efficient</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="w-8 h-6 rounded bg-green-500 flex items-center justify-center font-bold text-white">B</span>
                    <span>26-50: Efficient</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="w-8 h-6 rounded bg-lime-500 flex items-center justify-center font-bold text-black">C</span>
                    <span>51-75: Better than typical</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="w-8 h-6 rounded bg-yellow-400 flex items-center justify-center font-bold text-black">D</span>
                    <span>76-100: Typical</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="w-8 h-6 rounded bg-orange-400 flex items-center justify-center font-bold text-black">E</span>
                    <span>101-125: Below average</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="w-8 h-6 rounded bg-orange-600 flex items-center justify-center font-bold text-white">F</span>
                    <span>126-150: Poor</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="w-8 h-6 rounded bg-red-600 flex items-center justify-center font-bold text-white">G</span>
                    <span>&gt;150: Very poor</span>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">DEC Calculation</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Based on actual metered energy consumption</li>
                  <li className="pl-1">Weather corrected (degree days)</li>
                  <li className="pl-1">Compared to benchmark for building type</li>
                  <li className="pl-1">Rating 100 = typical for that building type</li>
                  <li className="pl-1">Lower rating = better performance</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Public Buildings Requiring DECs</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Government offices, council buildings</li>
                <li className="pl-1">Schools, colleges, universities</li>
                <li className="pl-1">Hospitals, health centres</li>
                <li className="pl-1">Libraries, museums, leisure centres</li>
                <li className="pl-1">Any building frequently visited by the public and over 250m²</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key difference:</strong> EPC rates design performance (theoretical), DEC rates operational performance (actual). A building can have a good EPC but poor DEC if operated inefficiently.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 8: Compliance Documentation */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">08</span>
            Building Services: Compliance Documentation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Demonstrating Part L compliance requires comprehensive documentation at design stage and
              completion. Building control bodies require evidence that energy efficiency requirements
              have been met before issuing completion certificates.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Design Stage Documentation</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Document</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Purpose</th>
                      <th className="border border-white/10 px-3 py-2 text-left">When Required</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">BRUKL output (design)</td>
                      <td className="border border-white/10 px-3 py-2">Shows predicted TER/BER compliance</td>
                      <td className="border border-white/10 px-3 py-2">Before work commences</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Lighting design calculations</td>
                      <td className="border border-white/10 px-3 py-2">Demonstrates efficacy compliance</td>
                      <td className="border border-white/10 px-3 py-2">Design stage submission</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Control strategy</td>
                      <td className="border border-white/10 px-3 py-2">Documents automatic controls</td>
                      <td className="border border-white/10 px-3 py-2">Design stage submission</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Sub-metering schedule</td>
                      <td className="border border-white/10 px-3 py-2">Shows metering strategy</td>
                      <td className="border border-white/10 px-3 py-2">Design stage (buildings &gt;1000m²)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">As-Built Documentation</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Document</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Purpose</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Who Provides</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">BRUKL output (as-built)</td>
                      <td className="border border-white/10 px-3 py-2">Confirms final TER/BER compliance</td>
                      <td className="border border-white/10 px-3 py-2">SAP/SBEM assessor</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">EPC certificate</td>
                      <td className="border border-white/10 px-3 py-2">Energy Performance Certificate</td>
                      <td className="border border-white/10 px-3 py-2">Accredited energy assessor</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Commissioning certificates</td>
                      <td className="border border-white/10 px-3 py-2">Proves systems commissioned to CIBSE codes</td>
                      <td className="border border-white/10 px-3 py-2">Commissioning engineer</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Building log book</td>
                      <td className="border border-white/10 px-3 py-2">Operating and maintenance information</td>
                      <td className="border border-white/10 px-3 py-2">Design team / contractor</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">O&M manuals</td>
                      <td className="border border-white/10 px-3 py-2">System-specific operating instructions</td>
                      <td className="border border-white/10 px-3 py-2">Installing contractor</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 grid sm:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">BRUKL Document Contents</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Building geometry and orientation</li>
                  <li className="pl-1">Fabric U-values and air permeability</li>
                  <li className="pl-1">Heating/cooling system efficiencies</li>
                  <li className="pl-1">Lighting efficacy and controls</li>
                  <li className="pl-1">Renewable energy contribution</li>
                  <li className="pl-1">TER, BER, TPER, BPER results</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Building Log Book Contents</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">System descriptions and schematics</li>
                  <li className="pl-1">Design parameters and setpoints</li>
                  <li className="pl-1">Control strategies and schedules</li>
                  <li className="pl-1">Maintenance requirements</li>
                  <li className="pl-1">Sub-metering strategy</li>
                  <li className="pl-1">Energy benchmarks and targets</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
              <p className="text-sm font-medium text-orange-400 mb-2">Design Stage Assessment Importance</p>
              <p className="text-sm text-white">
                Always verify Part L compliance at design stage before construction begins. Remedial work
                to achieve compliance after construction is expensive and may not be possible. The design
                stage BRUKL output gives confidence that the proposed design will comply.
              </p>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Practical tip:</strong> Keep detailed records of all equipment specifications, control settings, and commissioning results. These are essential evidence if compliance is questioned.
            </p>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Sub-Metering Design</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A new 2500m² office building requires sub-metering. Annual energy consumption is estimated at 150,000 kWh. Design the metering strategy.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Step 1: Identify end-use categories</p>
                <p>- Lighting: 35,000 kWh (23%)</p>
                <p>- Small power: 45,000 kWh (30%)</p>
                <p>- HVAC: 55,000 kWh (37%)</p>
                <p>- Lifts/other: 15,000 kWh (10%)</p>
                <p className="mt-2 text-white/60">Step 2: Check 90% coverage requirement</p>
                <p>90% of 150,000 kWh = <strong>135,000 kWh minimum</strong></p>
                <p className="mt-2 text-white/60">Step 3: Design metering schedule</p>
                <p>- Main incomer: Fiscal meter (100%)</p>
                <p>- Lighting DB: kWh meter (23%)</p>
                <p>- Floor small power DBs: kWh meters (30%)</p>
                <p>- HVAC panel: kWh meter (37%)</p>
                <p>- Total metered: <strong>90% - COMPLIANT</strong></p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Part L Lighting Compliance</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Verify lighting compliance for an open-plan office. LED luminaires provide 500 lux at 10W/m². Lamp-circuit efficacy is 110 lm/W.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Part L requirement for office general lighting:</p>
                <p>Minimum efficacy: 95 lamp-circuit lumens per circuit watt</p>
                <p className="mt-2 text-white/60">Proposed installation:</p>
                <p>Efficacy = 110 lm/W &gt; 95 lm/W <span className="text-green-400">✓ COMPLIANT</span></p>
                <p className="mt-2 text-white/60">Controls requirement check:</p>
                <p>- Occupancy sensing: <span className="text-green-400">✓ Provided</span></p>
                <p>- Daylight dimming (perimeter): <span className="text-green-400">✓ Provided</span></p>
                <p>- Time scheduling: <span className="text-green-400">✓ Via BMS</span></p>
                <p className="mt-2 text-green-400"><strong>Installation COMPLIES with Part L</strong></p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: BREEAM Energy Credit Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A building achieves BER of 18 kgCO₂/m²/year against a TER of 25 kgCO₂/m²/year. Calculate the improvement and estimated Ene 01 credits.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Calculate percentage improvement:</p>
                <p>Improvement = (TER - BER) / TER × 100</p>
                <p>Improvement = (25 - 18) / 25 × 100 = <strong>28%</strong></p>
                <p className="mt-2 text-white/60">BREEAM Ene 01 credit estimation:</p>
                <p>- Each credit requires approximately 6% improvement</p>
                <p>- 28% improvement ÷ 6% = 4.7 credits</p>
                <p>- Estimated credits: <strong>4-5 out of available credits</strong></p>
                <p className="mt-2 text-white/60">(Exact credits depend on BREEAM version and EPR calculation)</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Standards Reference</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Part L (2021):</strong> Conservation of fuel and power</li>
                <li className="pl-1"><strong>Non-Domestic Building Services Compliance Guide:</strong> Technical standards for systems</li>
                <li className="pl-1"><strong>CIBSE Guide L:</strong> Sustainability in building services</li>
                <li className="pl-1"><strong>CIBSE Guide F:</strong> Energy efficiency in buildings</li>
                <li className="pl-1"><strong>BS 7671:</strong> Wiring regulations - efficiency provisions</li>
                <li className="pl-1"><strong>BREEAM Technical Manual:</strong> Assessment criteria</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Design Checklist for Part L Compliance</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Verify lighting efficacy meets minimum standards for each space type</li>
                <li className="pl-1">Specify automatic controls: occupancy, daylight, time scheduling</li>
                <li className="pl-1">Design sub-metering to cover 90% of estimated consumption</li>
                <li className="pl-1">Coordinate with mechanical designer on HVAC efficiency</li>
                <li className="pl-1">Allow for commissioning to CIBSE codes</li>
                <li className="pl-1">Prepare building log book information</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Compliance Pitfalls</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Late engagement:</strong> Starting Part L calculations after design freeze</li>
                <li className="pl-1"><strong>Control gaps:</strong> Specifying efficient luminaires but inadequate controls</li>
                <li className="pl-1"><strong>Metering omissions:</strong> Not designing sufficient sub-metering circuits</li>
                <li className="pl-1"><strong>Documentation gaps:</strong> Missing commissioning evidence at completion</li>
                <li className="pl-1"><strong>Design vs reality:</strong> Installed equipment differs from BRUKL inputs</li>
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
                <p className="font-medium text-white mb-1">Compliance Metrics</p>
                <ul className="space-y-0.5">
                  <li>TER - Target Emission Rate (kgCO₂/m²/year)</li>
                  <li>BER - Building Emission Rate (must be ≤ TER)</li>
                  <li>TFEE - Target Fabric Energy Efficiency</li>
                  <li>BPER - Building Primary Energy Rate</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Thresholds</p>
                <ul className="space-y-0.5">
                  <li>Sub-metering: buildings &gt;1000m²</li>
                  <li>DEC required: public buildings &gt;250m²</li>
                  <li>DEC annual renewal: buildings &gt;1000m²</li>
                  <li>BREEAM Excellent: government requirement</li>
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
            <Link to="../h-n-c-module3-section6-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Smart Controls
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module3-section6-7">
              Next: Renewables Integration
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule3Section6_6;
