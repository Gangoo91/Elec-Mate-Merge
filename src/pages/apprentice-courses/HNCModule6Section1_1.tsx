import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Introduction to Part L - HNC Module 6 Section 1.1";
const DESCRIPTION = "Master Part L of the Building Regulations: 2021 amendments, conservation of fuel and power, compliance routes (SBEM, SAP), building types, fabric and services standards for building services engineers.";

const quickCheckQuestions = [
  {
    id: "part-l-purpose",
    question: "What is the primary purpose of Part L of the Building Regulations?",
    options: ["Fire safety in buildings", "Conservation of fuel and power", "Structural stability", "Ventilation requirements"],
    correctIndex: 1,
    explanation: "Part L of the Building Regulations specifically addresses the conservation of fuel and power, setting requirements to limit heat gains and losses through building fabric and services to reduce carbon emissions."
  },
  {
    id: "part-l-2021-uplift",
    question: "By approximately how much did the 2021 Part L amendments reduce CO₂ targets for new dwellings compared to Part L 2013?",
    options: ["15%", "31%", "50%", "75%"],
    correctIndex: 1,
    explanation: "The Part L 2021 amendments introduced a 31% reduction in CO₂ emissions for new dwellings compared to Part L 2013, representing a significant step towards the Future Homes Standard."
  },
  {
    id: "compliance-method",
    question: "Which compliance calculation method is used for new domestic buildings under Part L?",
    options: ["SBEM", "SAP", "CIBSE TM54", "BREEAM"],
    correctIndex: 1,
    explanation: "SAP (Standard Assessment Procedure) is the government's methodology for assessing the energy performance of dwellings. SBEM is used for non-domestic buildings."
  },
  {
    id: "building-types",
    question: "Part L is divided into different volumes. Part L1 applies to:",
    options: ["Non-domestic buildings only", "Extensions only", "Dwellings", "Historic buildings only"],
    correctIndex: 2,
    explanation: "Part L is split into Part L1 (dwellings) and Part L2 (buildings other than dwellings). Each has separate compliance requirements and calculation methodologies."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the notional building approach in Part L compliance?",
    options: [
      "A building designed without any insulation",
      "A reference building with the same geometry but compliant specifications",
      "A building that exceeds minimum standards",
      "A pre-fabricated modular building"
    ],
    correctAnswer: 1,
    explanation: "The notional building is a reference building with the same size, shape, and usage as the actual building but with specifications that just meet the regulations. The actual building's performance is compared against this notional building."
  },
  {
    id: 2,
    question: "What does the term 'primary energy' mean in Part L context?",
    options: ["Energy used only for heating", "Energy content of fuel before conversion losses", "Energy from renewable sources only", "Energy measured at the meter"],
    correctAnswer: 1,
    explanation: "Primary energy accounts for the full energy cost of fuel, including extraction, processing, and distribution losses. It gives a more complete picture of environmental impact than delivered energy alone."
  },
  {
    id: 3,
    question: "Which of the following is a key metric introduced in Part L 2021?",
    options: [
      "Energy Use Intensity (EUI)",
      "Primary Energy Rate",
      "Building Performance Index",
      "Thermal Efficiency Rating"
    ],
    correctAnswer: 1,
    explanation: "Part L 2021 introduced the Primary Energy Rate alongside CO₂ emission rate (TER/DER or BER) as key compliance metrics, providing a more comprehensive view of building energy performance."
  },
  {
    id: 4,
    question: "For existing buildings, Part L applies when:",
    options: [
      "Any maintenance work is carried out",
      "The building is sold",
      "Controlled fittings or services are replaced or work exceeds defined thresholds",
      "An EPC is required"
    ],
    correctAnswer: 2,
    explanation: "Part L applies to existing buildings when controlled fittings (windows, boilers) are replaced, when extensions are built, or when renovation work affects more than 25% of the thermal envelope."
  },
  {
    id: 5,
    question: "What is the maximum U-value for walls in new dwellings under Part L 2021?",
    options: [
      "0.18 W/m²K",
      "0.26 W/m²K",
      "0.35 W/m²K",
      "0.45 W/m²K"
    ],
    correctAnswer: 1,
    explanation: "Part L 2021 sets a limiting U-value of 0.26 W/m²K for external walls in new dwellings. The notional dwelling uses 0.18 W/m²K, but the actual design can trade off between elements."
  },
  {
    id: 6,
    question: "SBEM stands for:",
    options: [
      "Standard Building Energy Model",
      "Simplified Building Energy Model",
      "Sustainable Building Efficiency Measure",
      "System-Based Energy Methodology"
    ],
    correctAnswer: 1,
    explanation: "SBEM (Simplified Building Energy Model) is the government's tool for demonstrating Part L compliance in non-domestic buildings. It calculates energy use and CO₂ emissions."
  },
  {
    id: 7,
    question: "What is the air permeability target for a dwelling in the notional building under Part L 2021?",
    options: [
      "10 m³/(h·m²) at 50 Pa",
      "8 m³/(h·m²) at 50 Pa",
      "5 m³/(h·m²) at 50 Pa",
      "3 m³/(h·m²) at 50 Pa"
    ],
    correctAnswer: 2,
    explanation: "The Part L 2021 notional dwelling assumes an air permeability of 5 m³/(h·m²) at 50 Pa. Lower air permeability improves energy performance but requires adequate ventilation provision."
  },
  {
    id: 8,
    question: "Which Part of the Building Regulations works closely with Part L to address ventilation?",
    options: [
      "Part A",
      "Part B",
      "Part F",
      "Part M"
    ],
    correctAnswer: 2,
    explanation: "Part F (Ventilation) works in conjunction with Part L. As buildings become more airtight for energy efficiency, adequate ventilation becomes critical for indoor air quality and moisture control."
  },
  {
    id: 9,
    question: "The 'fabric first' approach in Part L means:",
    options: [
      "Using only natural materials",
      "Prioritising building envelope performance before adding complex systems",
      "Installing fabric-based heating systems",
      "Meeting only the minimum fabric standards"
    ],
    correctAnswer: 1,
    explanation: "Fabric first prioritises excellent insulation, airtightness, and thermal bridging performance before relying on mechanical systems or renewables. This approach delivers long-term, reliable energy savings."
  },
  {
    id: 10,
    question: "What is a thermal bridge in building construction?",
    options: [
      "A connection between heating systems",
      "An area of higher heat transfer through the building envelope",
      "A method of transferring heat to adjacent buildings",
      "A gap in insulation that allows ventilation"
    ],
    correctAnswer: 1,
    explanation: "A thermal bridge (or cold bridge) is a localised area of the building envelope with higher heat flow, typically at junctions, around openings, or where insulation is penetrated. Part L requires thermal bridging to be minimised."
  },
  {
    id: 11,
    question: "For a non-domestic building extension over 50m², Part L compliance is demonstrated by:",
    options: [
      "Only meeting U-value limits",
      "Using SAP calculations",
      "Following the guidance for new buildings or consequential improvements",
      "No Part L requirements apply"
    ],
    correctAnswer: 2,
    explanation: "Extensions over 50m² to non-domestic buildings must follow Part L2 guidance. Larger extensions may trigger consequential improvements to the existing building's energy systems."
  },
  {
    id: 12,
    question: "What is the significance of the Future Homes Standard in relation to Part L?",
    options: [
      "It replaces Part L entirely",
      "It sets targets for 2025 requiring homes to be zero-carbon ready",
      "It only applies to social housing",
      "It reduces energy efficiency requirements"
    ],
    correctAnswer: 1,
    explanation: "The Future Homes Standard (planned for 2025) will require new homes to produce 75-80% less CO₂ than Part L 2013 standards. Part L 2021 is an interim step towards this, often called the 'Future Homes uplift'."
  }
];

const faqs = [
  {
    question: "What's the difference between SAP and SBEM?",
    answer: "SAP (Standard Assessment Procedure) is used for domestic buildings and produces an energy rating (1-100+) and EPC. SBEM (Simplified Building Energy Model) is used for non-domestic buildings. Both calculate CO₂ emissions and primary energy but use different methodologies suited to their building types. SAP uses standardised occupancy patterns while SBEM allows more flexibility for varied non-domestic uses."
  },
  {
    question: "When do Part L requirements apply to existing buildings?",
    answer: "Part L applies to existing buildings when: (1) Controlled services/fittings are replaced (e.g., boilers, windows, lighting); (2) An extension is built; (3) A material change of use occurs; (4) Renovation affects more than 25% of the thermal envelope; (5) Consequential improvements are triggered by work over certain thresholds. Simple like-for-like repairs don't trigger Part L requirements."
  },
  {
    question: "How do I demonstrate Part L compliance for electrical installations?",
    answer: "Electrical installations contribute to Part L compliance through: (1) Lighting efficacy - minimum 45 luminaire-lumens per circuit-watt in non-domestic buildings; (2) Lighting controls - daylight dimming, presence detection, time scheduling; (3) Electric heating system efficiency; (4) Building automation and controls; (5) Metering provisions for sub-metering in larger buildings. These are assessed within the SBEM or SAP calculation."
  },
  {
    question: "What are consequential improvements under Part L?",
    answer: "Consequential improvements are energy efficiency upgrades required when certain works are carried out on existing buildings over 1000m². If works exceed defined thresholds (adding floor area, increasing installed capacity, replacing thermal elements), the building owner must improve other building services or fabric to achieve a reasonable payback. This typically affects lighting, HVAC controls, and insulation."
  },
  {
    question: "Can I trade off between fabric and services under Part L?",
    answer: "Yes, within limits. The actual building is compared against a notional building, allowing flexibility. For example, better-than-notional glazing U-values could compensate for slightly less efficient heating. However, there are absolute limiting values (backstops) that cannot be exceeded regardless of trade-offs. The fabric first approach is still recommended for long-term performance."
  },
  {
    question: "What documentation is required for Part L compliance?",
    answer: "Required documentation includes: (1) Design stage calculations (SAP/SBEM) showing predicted performance; (2) As-built calculations confirming actual construction; (3) Commissioning certificates for heating, ventilation, lighting controls; (4) Air permeability test results; (5) EPC (Energy Performance Certificate); (6) Building log book for non-domestic buildings; (7) Evidence of products meeting specifications (U-values, efficiency ratings)."
  }
];

const HNCModule6Section1_1 = () => {
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
            <span>Module 6.1.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Introduction to Part L
          </h1>
          <p className="text-white/80">
            Part L structure, 2021 amendments, conservation of fuel and power, compliance routes, and building types
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Part L:</strong> Conservation of fuel and power in buildings</li>
              <li className="pl-1"><strong>2021 uplift:</strong> 31% CO₂ reduction for new dwellings</li>
              <li className="pl-1"><strong>Compliance:</strong> SAP (domestic), SBEM (non-domestic)</li>
              <li className="pl-1"><strong>Key metrics:</strong> CO₂ emissions + Primary Energy Rate</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Lighting:</strong> Efficacy and controls requirements</li>
              <li className="pl-1"><strong>HVAC:</strong> System efficiency and commissioning</li>
              <li className="pl-1"><strong>Controls:</strong> Building automation, metering</li>
              <li className="pl-1"><strong>Future Homes:</strong> 2025 zero-carbon ready target</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the structure and purpose of Part L of the Building Regulations",
              "Describe the 2021 amendments and their impact on building design",
              "Compare compliance routes: SAP, SBEM, and notional building method",
              "Apply Part L requirements to different building types and situations",
              "Understand fabric standards, U-values, and thermal bridging",
              "Integrate Part L with other regulations (Part F, Part O)"
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

        {/* Section 1: Part L Overview */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Part L Overview and Structure
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Part L of the Building Regulations sets the requirements for the conservation of fuel and power in buildings.
              It establishes minimum standards for thermal performance, building services efficiency, and overall energy
              consumption to reduce CO₂ emissions and combat climate change.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Part L Document Structure:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Approved Document L Volume 1:</strong> Dwellings (new and existing)</li>
                <li className="pl-1"><strong>Approved Document L Volume 2:</strong> Buildings other than dwellings (non-domestic)</li>
                <li className="pl-1"><strong>Conservation of Fuel and Power:</strong> Common guidance applicable to all buildings</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Part L Applies To</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Building Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Work Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Part L Volume</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">New dwellings</td>
                      <td className="border border-white/10 px-3 py-2">New construction</td>
                      <td className="border border-white/10 px-3 py-2">Volume 1</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Existing dwellings</td>
                      <td className="border border-white/10 px-3 py-2">Extensions, replacements, renovations</td>
                      <td className="border border-white/10 px-3 py-2">Volume 1</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">New non-domestic</td>
                      <td className="border border-white/10 px-3 py-2">New construction</td>
                      <td className="border border-white/10 px-3 py-2">Volume 2</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Existing non-domestic</td>
                      <td className="border border-white/10 px-3 py-2">Extensions, fit-out, system replacement</td>
                      <td className="border border-white/10 px-3 py-2">Volume 2</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Mixed-use buildings</td>
                      <td className="border border-white/10 px-3 py-2">Relevant sections apply to each part</td>
                      <td className="border border-white/10 px-3 py-2">Both volumes</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key principle:</strong> Part L aims to reduce carbon emissions through fabric performance (insulation, airtightness) and efficient building services (heating, cooling, lighting, ventilation).
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: 2021 Amendments */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Part L 2021 Amendments
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Part L 2021 amendments (effective June 2022) represent a significant uplift in energy efficiency
              requirements, forming a stepping stone towards the Future Homes Standard (2025) and Future Buildings
              Standard. These changes substantially increase carbon reduction targets.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Dwellings (Part L1)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>31%</strong> CO₂ reduction vs 2013</li>
                  <li className="pl-1">Primary Energy metric added</li>
                  <li className="pl-1">Improved fabric standards</li>
                  <li className="pl-1">Low carbon heating emphasis</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Non-Domestic (Part L2)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>27%</strong> CO₂ reduction vs 2013</li>
                  <li className="pl-1">Enhanced lighting requirements</li>
                  <li className="pl-1">HVAC efficiency improvements</li>
                  <li className="pl-1">Building automation standards</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key New Metrics</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Primary Energy Rate (PER)</li>
                  <li className="pl-1">Target Primary Energy Rate (TPER)</li>
                  <li className="pl-1">Fabric Energy Efficiency (FEE)</li>
                  <li className="pl-1">Target Fabric Energy Efficiency (TFEE)</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Notional Building Fabric Standards (Part L 2021)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Element</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Notional Dwelling</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Limiting Value</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Part L 2013</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">External walls</td>
                      <td className="border border-white/10 px-3 py-2">0.18 W/m²K</td>
                      <td className="border border-white/10 px-3 py-2">0.26 W/m²K</td>
                      <td className="border border-white/10 px-3 py-2">0.30 W/m²K</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Roof</td>
                      <td className="border border-white/10 px-3 py-2">0.11 W/m²K</td>
                      <td className="border border-white/10 px-3 py-2">0.16 W/m²K</td>
                      <td className="border border-white/10 px-3 py-2">0.20 W/m²K</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Floor</td>
                      <td className="border border-white/10 px-3 py-2">0.13 W/m²K</td>
                      <td className="border border-white/10 px-3 py-2">0.18 W/m²K</td>
                      <td className="border border-white/10 px-3 py-2">0.25 W/m²K</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Windows</td>
                      <td className="border border-white/10 px-3 py-2">1.2 W/m²K</td>
                      <td className="border border-white/10 px-3 py-2">1.6 W/m²K</td>
                      <td className="border border-white/10 px-3 py-2">2.0 W/m²K</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Air permeability</td>
                      <td className="border border-white/10 px-3 py-2">5 m³/(h·m²)</td>
                      <td className="border border-white/10 px-3 py-2">8 m³/(h·m²)</td>
                      <td className="border border-white/10 px-3 py-2">10 m³/(h·m²)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Future Homes Standard Pathway</p>
              <div className="text-sm space-y-2">
                <p><span className="text-white/60">Part L 2013:</span> <span className="text-white">Baseline standard</span></p>
                <p><span className="text-white/60">Part L 2021:</span> <span className="text-white">31% improvement (current)</span></p>
                <p><span className="text-white/60">Future Homes 2025:</span> <span className="text-white">75-80% improvement target</span></p>
                <p><span className="text-white/60">Net Zero 2050:</span> <span className="text-white">All homes zero carbon ready</span></p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Industry impact:</strong> The 2021 changes drive adoption of heat pumps, improved insulation, and low carbon technologies as gas boilers can no longer meet the notional specification.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Compliance Routes */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Compliance Routes and Calculation Methods
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Part L compliance is demonstrated through energy calculations that compare the proposed building
              against a notional building with compliant specifications. Different calculation methodologies
              apply to domestic and non-domestic buildings.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Compliance Calculation Methods</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>SAP (Standard Assessment Procedure):</strong> Government methodology for dwellings - calculates DER (Dwelling Emission Rate) and DPER (Dwelling Primary Energy Rate)</li>
                <li className="pl-1"><strong>SBEM (Simplified Building Energy Model):</strong> For non-domestic buildings - calculates BER (Building Emission Rate) and BPER (Building Primary Energy Rate)</li>
                <li className="pl-1"><strong>DSM (Dynamic Simulation Modelling):</strong> Advanced modelling tools (IES, TAS) approved as alternatives to SBEM for complex buildings</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Notional Building Approach</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Step</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Description</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Purpose</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">1. Create notional building</td>
                      <td className="border border-white/10 px-3 py-2">Same geometry, size, orientation as actual</td>
                      <td className="border border-white/10 px-3 py-2">Like-for-like comparison</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">2. Apply notional specifications</td>
                      <td className="border border-white/10 px-3 py-2">Standard U-values, systems, efficiencies</td>
                      <td className="border border-white/10 px-3 py-2">Establishes target performance</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">3. Calculate target rates</td>
                      <td className="border border-white/10 px-3 py-2">TER/TPER (dwellings) or TER/TPER (non-dom)</td>
                      <td className="border border-white/10 px-3 py-2">Compliance threshold</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">4. Model actual building</td>
                      <td className="border border-white/10 px-3 py-2">With specified fabric and services</td>
                      <td className="border border-white/10 px-3 py-2">Predicted performance</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">5. Compare results</td>
                      <td className="border border-white/10 px-3 py-2">DER ≤ TER and DPER ≤ TPER</td>
                      <td className="border border-white/10 px-3 py-2">Pass/fail determination</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Compliance Metrics</p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-white mb-1">Dwellings (SAP)</p>
                  <ul className="space-y-0.5">
                    <li>DER ≤ TER (CO₂ emissions)</li>
                    <li>DPER ≤ TPER (Primary energy)</li>
                    <li>DFEE ≤ TFEE (Fabric efficiency)</li>
                    <li>Limiting U-values not exceeded</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-white mb-1">Non-Domestic (SBEM)</p>
                  <ul className="space-y-0.5">
                    <li>BER ≤ TER (CO₂ emissions)</li>
                    <li>BPER ≤ TPER (Primary energy)</li>
                    <li>Lighting efficacy ≥ 45 lm/cW</li>
                    <li>HVAC efficiency standards met</li>
                  </ul>
                </div>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design flexibility:</strong> The notional building approach allows trade-offs between elements, enabling design innovation while ensuring overall performance targets are met.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Building Types and Applications */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Building Types and Part L Applications
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Part L requirements vary significantly depending on whether the building is new, existing,
              an extension, or undergoing renovation. Understanding which requirements apply is essential
              for compliance.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Requirements by Building Situation</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Situation</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Requirements</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Calculation Method</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">New build</td>
                      <td className="border border-white/10 px-3 py-2">Full compliance: fabric, services, renewables</td>
                      <td className="border border-white/10 px-3 py-2">Full SAP/SBEM</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Extension ≤50m² (domestic)</td>
                      <td className="border border-white/10 px-3 py-2">Meet limiting U-values, opening areas</td>
                      <td className="border border-white/10 px-3 py-2">Elemental approach</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Extension &gt;50m² (domestic)</td>
                      <td className="border border-white/10 px-3 py-2">As new build standards</td>
                      <td className="border border-white/10 px-3 py-2">SAP for extension</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Replacement windows</td>
                      <td className="border border-white/10 px-3 py-2">Meet window U-value standards</td>
                      <td className="border border-white/10 px-3 py-2">Product certification</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Boiler replacement</td>
                      <td className="border border-white/10 px-3 py-2">Meet efficiency requirements, controls</td>
                      <td className="border border-white/10 px-3 py-2">Product certification</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Renovation (&gt;25% envelope)</td>
                      <td className="border border-white/10 px-3 py-2">Upgrade thermal elements affected</td>
                      <td className="border border-white/10 px-3 py-2">Elemental U-values</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Change of use</td>
                      <td className="border border-white/10 px-3 py-2">Upgrade to current standards where practical</td>
                      <td className="border border-white/10 px-3 py-2">Depends on situation</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-3 rounded bg-white/5">
                <p className="font-medium text-white mb-2">New Build Requirements</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li>Full SAP/SBEM calculation</li>
                  <li>Air permeability testing</li>
                  <li>Commissioning certificates</li>
                  <li>As-built SAP/EPC</li>
                  <li>Photo evidence of insulation</li>
                  <li>Building log book (non-domestic)</li>
                </ul>
              </div>
              <div className="p-3 rounded bg-white/5">
                <p className="font-medium text-white mb-2">Existing Building Triggers</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li>Controlled fittings replacement</li>
                  <li>Controlled services installation</li>
                  <li>Extensions and conservatories</li>
                  <li>Material change of use</li>
                  <li>Major renovation (&gt;25% envelope)</li>
                  <li>Consequential improvements</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Consequential Improvements (Non-Domestic &gt;1000m²)</p>
              <div className="text-sm space-y-2">
                <p><strong>Trigger threshold:</strong> Work to existing buildings exceeding £50,000 or providing new/additional fixed services</p>
                <p><strong>Improvement requirement:</strong> Energy efficiency measures with simple payback ≤15 years</p>
                <p><strong>Value cap:</strong> Improvements up to 10% of principal works value</p>
                <p><strong>Typical measures:</strong> Lighting upgrades, HVAC controls, insulation improvements, BMS optimisation</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Integration with Other Building Regulations</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Part F (Ventilation):</strong> Airtight buildings require adequate ventilation - MVHR often needed</li>
                <li className="pl-1"><strong>Part O (Overheating):</strong> New 2022 regulation limiting overheating risk in residential buildings</li>
                <li className="pl-1"><strong>Part S (EV Charging):</strong> Infrastructure requirements link to electrical design</li>
                <li className="pl-1"><strong>Part P (Electrical):</strong> Electrical work must comply alongside Part L lighting requirements</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>MEP coordination:</strong> Building services engineers must coordinate Part L compliance with architectural fabric design, ensuring systems are sized for the reduced heating loads of well-insulated buildings.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: New Dwelling SAP Compliance Check</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Verify Part L compliance for a new 3-bedroom semi-detached house.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Given specifications:</p>
                <p className="ml-4">Walls: U-value = 0.18 W/m²K</p>
                <p className="ml-4">Roof: U-value = 0.12 W/m²K</p>
                <p className="ml-4">Floor: U-value = 0.13 W/m²K</p>
                <p className="ml-4">Windows: U-value = 1.2 W/m²K (triple glazed)</p>
                <p className="ml-4">Air permeability: 4 m³/(h·m²) at 50 Pa</p>
                <p className="ml-4">Heating: Air source heat pump (SCOP 3.5)</p>
                <p className="ml-4">Ventilation: MVHR (85% efficiency)</p>
                <p className="mt-2 text-white/60">SAP calculation results:</p>
                <p className="ml-4">TER (Target Emission Rate) = 12.5 kg CO₂/m²/year</p>
                <p className="ml-4">DER (Dwelling Emission Rate) = 9.8 kg CO₂/m²/year</p>
                <p className="ml-4">TPER (Target Primary Energy Rate) = 95 kWh/m²/year</p>
                <p className="ml-4">DPER (Dwelling Primary Energy Rate) = 78 kWh/m²/year</p>
                <p className="mt-2 text-white/60">Compliance check:</p>
                <p className="ml-4 text-green-400">DER (9.8) ≤ TER (12.5) ✓ PASS</p>
                <p className="ml-4 text-green-400">DPER (78) ≤ TPER (95) ✓ PASS</p>
                <p className="ml-4 text-green-400">All U-values within limiting values ✓</p>
                <p className="mt-2 text-green-400">Result: Part L COMPLIANT</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Non-Domestic Lighting Compliance</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Calculate lighting efficacy for an office building to meet Part L2.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Office lighting design:</p>
                <p className="ml-4">Total floor area: 500 m²</p>
                <p className="ml-4">Target illuminance: 500 lux (general office)</p>
                <p className="ml-4">Luminaire type: LED panels 40W each</p>
                <p className="ml-4">Luminaire output: 4,000 lumens each</p>
                <p className="ml-4">Quantity required: 60 luminaires</p>
                <p className="mt-2 text-white/60">Efficacy calculation:</p>
                <p className="ml-4">Total luminaire lumens = 60 × 4,000 = 240,000 lm</p>
                <p className="ml-4">Total circuit watts = 60 × 40W = 2,400 W</p>
                <p className="ml-4">Lighting efficacy = 240,000 ÷ 2,400</p>
                <p className="ml-4 text-green-400">= 100 luminaire-lumens per circuit-watt</p>
                <p className="mt-2 text-white/60">Part L2 requirement:</p>
                <p className="ml-4">Minimum efficacy = 45 lm/cW</p>
                <p className="ml-4 text-green-400">100 lm/cW &gt; 45 lm/cW ✓ PASS</p>
                <p className="mt-2 text-white/60">Additional controls required:</p>
                <p className="ml-4">- Daylight dimming (perimeter zones)</p>
                <p className="ml-4">- Presence/absence detection</p>
                <p className="ml-4">- Time scheduling capability</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Extension Compliance Assessment</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Determine Part L requirements for a domestic kitchen extension.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Extension details:</p>
                <p className="ml-4">Type: Single-storey rear extension</p>
                <p className="ml-4">Floor area: 35 m² (less than 50m² threshold)</p>
                <p className="ml-4">Use: Kitchen extension to existing dwelling</p>
                <p className="mt-2 text-white/60">Assessment:</p>
                <p className="ml-4">Extension &lt; 50m² → Simplified compliance route</p>
                <p className="mt-2 text-white/60">Requirements (elemental approach):</p>
                <p className="ml-4">Walls: U ≤ 0.28 W/m²K</p>
                <p className="ml-4">Roof: U ≤ 0.16 W/m²K</p>
                <p className="ml-4">Floor: U ≤ 0.22 W/m²K</p>
                <p className="ml-4">Windows: U ≤ 1.6 W/m²K</p>
                <p className="ml-4">Rooflights: U ≤ 2.2 W/m²K</p>
                <p className="ml-4">Glazed area ≤ 25% of floor area</p>
                <p className="mt-2 text-white/60">Opening area calculation:</p>
                <p className="ml-4">25% of 35m² = 8.75 m² max glazing</p>
                <p className="ml-4">Proposed: 2× bi-fold doors = 6m²</p>
                <p className="ml-4 text-green-400">6m² &lt; 8.75m² ✓ WITHIN LIMIT</p>
                <p className="mt-2 text-white/60">No SAP calculation required for extension</p>
                <p className="text-white/60">Heating from existing system - check capacity</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Part L Compliance Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Identify building type and applicable Part L volume</li>
                <li className="pl-1">Determine if full calculation or elemental approach applies</li>
                <li className="pl-1">Commission SAP/SBEM calculations at design stage</li>
                <li className="pl-1">Verify all fabric U-values within limiting standards</li>
                <li className="pl-1">Specify compliant heating, ventilation, and lighting systems</li>
                <li className="pl-1">Arrange air permeability testing (new builds)</li>
                <li className="pl-1">Complete commissioning and obtain certificates</li>
                <li className="pl-1">Submit as-built calculations and EPC</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Wall U-value limiting: <strong>0.26 W/m²K</strong> (dwellings)</li>
                <li className="pl-1">Air permeability target: <strong>5 m³/(h·m²)</strong> at 50 Pa</li>
                <li className="pl-1">Lighting efficacy: <strong>≥45 lm/cW</strong> (non-domestic)</li>
                <li className="pl-1">CO₂ reduction 2021 vs 2013: <strong>31%</strong> (dwellings)</li>
                <li className="pl-1">Extension threshold: <strong>50m²</strong> (simplified compliance)</li>
                <li className="pl-1">Renovation threshold: <strong>25%</strong> of thermal envelope</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Ignoring thermal bridging</strong> - Linear thermal bridges can significantly impact performance</li>
                <li className="pl-1"><strong>Undersizing heating</strong> - Improved fabric reduces heat loss but systems must still meet peak demand</li>
                <li className="pl-1"><strong>Missing commissioning</strong> - Systems must be commissioned and certificates provided</li>
                <li className="pl-1"><strong>Design vs as-built gap</strong> - Construction quality must match design specifications</li>
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
                <p className="font-medium text-white mb-1">Part L Structure</p>
                <ul className="space-y-0.5">
                  <li>Volume 1: Dwellings (SAP)</li>
                  <li>Volume 2: Non-domestic (SBEM)</li>
                  <li>2021 uplift: 31% CO₂ reduction</li>
                  <li>Future Homes: 2025 target</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Compliance Metrics</p>
                <ul className="space-y-0.5">
                  <li>DER/BER ≤ TER (CO₂ emissions)</li>
                  <li>DPER/BPER ≤ TPER (Primary energy)</li>
                  <li>Fabric within limiting U-values</li>
                  <li>Air permeability tested</li>
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
            <Link to="../h-n-c-module6-section1-2">
              Next: Fabric Performance Standards
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule6Section1_1;
