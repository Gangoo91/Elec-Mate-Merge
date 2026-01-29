import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Operational Carbon - HNC Module 6 Section 4.2";
const DESCRIPTION = "Master operational carbon assessment for building services: energy-related emissions, regulated vs unregulated loads, benchmarking methodologies, and carbon reduction strategies.";

const quickCheckQuestions = [
  {
    id: "operational-carbon-definition",
    question: "What does operational carbon refer to?",
    options: ["Carbon emitted during construction", "Carbon emissions from building materials production", "Carbon emissions from energy use during building operation", "Carbon sequestered by building vegetation"],
    correctIndex: 2,
    explanation: "Operational carbon refers to the greenhouse gas emissions resulting from the energy consumed during the operational phase of a building - heating, cooling, lighting, ventilation, and equipment use over the building's lifetime."
  },
  {
    id: "regulated-energy",
    question: "Which of these is classified as a regulated energy load under Part L?",
    options: ["Desktop computers and monitors", "Kitchen appliances in a commercial building", "Space heating from the central HVAC system", "Lifts and escalators"],
    correctIndex: 2,
    explanation: "Regulated loads are those controlled by Building Regulations Part L and include fixed building services: heating, cooling, hot water, ventilation, and fixed lighting. Space heating from central HVAC is regulated; computers, kitchen appliances, and lifts are unregulated."
  },
  {
    id: "eui-benchmark",
    question: "What does Energy Use Intensity (EUI) measure?",
    options: ["Total building energy consumption in kWh", "Energy consumption per unit floor area per year (kWh/m²/year)", "Carbon emissions per occupant", "Cost of energy per square metre"],
    correctIndex: 1,
    explanation: "Energy Use Intensity (EUI) measures energy consumption normalised by floor area, typically expressed as kWh/m²/year. This allows meaningful comparison between buildings of different sizes and enables benchmarking against sector targets."
  },
  {
    id: "carbon-hierarchy",
    question: "In the carbon reduction hierarchy, which action should be prioritised first?",
    options: ["Install renewable energy generation", "Purchase carbon offsets", "Reduce energy demand through fabric and efficiency", "Switch to low-carbon fuels"],
    correctIndex: 2,
    explanation: "The carbon reduction hierarchy prioritises actions: first reduce demand (fabric efficiency, controls, behaviour), then improve system efficiency, then decarbonise supply (renewables, low-carbon fuels), and only offset as a last resort for residual emissions."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "According to CIBSE TM46, what is the typical electricity benchmark for a general office building?",
    options: [
      "50 kWh/m²/year",
      "95 kWh/m²/year",
      "150 kWh/m²/year",
      "220 kWh/m²/year"
    ],
    correctAnswer: 1,
    explanation: "CIBSE TM46 provides benchmark values for Display Energy Certificates. A general office has a typical electricity benchmark of 95 kWh/m²/year and fossil-thermal benchmark of 120 kWh/m²/year."
  },
  {
    id: 2,
    question: "What percentage of a typical commercial building's total carbon footprint does operational carbon represent over a 60-year lifespan?",
    options: ["20-30%", "40-50%", "60-80%", "90-95%"],
    correctAnswer: 2,
    explanation: "Operational carbon typically accounts for 60-80% of a building's whole-life carbon footprint over a 60-year period. As the grid decarbonises and buildings become more efficient, this proportion is decreasing, making embodied carbon relatively more significant."
  },
  {
    id: 3,
    question: "Which document defines the methodology for calculating regulated energy in new buildings?",
    options: [
      "BS 7671",
      "SAP/SBEM (Part L compliance)",
      "CIBSE Guide F",
      "ISO 50001"
    ],
    correctAnswer: 1,
    explanation: "SAP (Standard Assessment Procedure) for dwellings and SBEM (Simplified Building Energy Model) for non-domestic buildings are the approved methodologies under Part L for calculating regulated energy and carbon emissions for Building Regulations compliance."
  },
  {
    id: 4,
    question: "In a typical office building, unregulated loads (plug loads) typically account for what percentage of total electricity consumption?",
    options: ["10-20%", "25-40%", "50-60%", "70-80%"],
    correctAnswer: 1,
    explanation: "Unregulated loads (computers, equipment, small power) typically account for 25-40% of total electricity consumption in offices. This significant proportion is not addressed by Part L compliance, creating a 'performance gap' between design predictions and actual consumption."
  },
  {
    id: 5,
    question: "What is the UK grid electricity carbon factor used for 2025 carbon calculations?",
    options: [
      "0.136 kgCO₂e/kWh",
      "0.193 kgCO₂e/kWh",
      "0.233 kgCO₂e/kWh",
      "0.519 kgCO₂e/kWh"
    ],
    correctAnswer: 1,
    explanation: "The UK grid electricity carbon factor for 2025 is approximately 0.193 kgCO₂e/kWh (SAP 10.2 methodology). This represents significant decarbonisation from historical values (0.519 in 2013) due to renewable energy growth and coal phase-out."
  },
  {
    id: 6,
    question: "Display Energy Certificates (DECs) are required for which buildings?",
    options: [
      "All buildings over 50m²",
      "Public buildings over 250m² frequently visited by the public",
      "Only new buildings",
      "Commercial buildings over 1000m²"
    ],
    correctAnswer: 1,
    explanation: "DECs are required for public authority buildings over 250m² that are frequently visited by the public. They display actual measured energy performance (A-G rating) based on operational data, unlike EPCs which show design predictions."
  },
  {
    id: 7,
    question: "Which strategy provides the greatest operational carbon reduction per pound invested in a typical existing building?",
    options: [
      "Installing solar PV panels",
      "Upgrading to LED lighting with controls",
      "Replacing the boiler with a heat pump",
      "Installing battery storage"
    ],
    correctAnswer: 1,
    explanation: "LED lighting upgrades with intelligent controls typically offer the best carbon reduction per pound invested, with payback periods of 2-4 years and 60-80% energy savings. They also reduce cooling loads. Heat pumps and PV are effective but have longer paybacks."
  },
  {
    id: 8,
    question: "What does the term 'performance gap' refer to in building energy?",
    options: [
      "The difference between summer and winter energy use",
      "The difference between design predictions and actual operational energy consumption",
      "The gap between renewable generation and demand",
      "The difference between peak and baseload consumption"
    ],
    correctAnswer: 1,
    explanation: "The performance gap refers to the difference between predicted energy consumption (from design calculations like SBEM) and actual measured operational consumption. Studies show buildings often use 2-5 times more energy than predicted."
  },
  {
    id: 9,
    question: "According to LETI (London Energy Transformation Initiative), what is the target operational energy use intensity for a new office building?",
    options: [
      "35 kWh/m²/year",
      "55 kWh/m²/year",
      "90 kWh/m²/year",
      "120 kWh/m²/year"
    ],
    correctAnswer: 1,
    explanation: "LETI recommends an operational EUI target of 55 kWh/m²/year for new office buildings to achieve net zero carbon. This is significantly lower than typical practice (150-300 kWh/m²/year) and requires integrated design, efficient systems, and good controls."
  },
  {
    id: 10,
    question: "Which building services system typically has the highest operational carbon impact in a UK office building?",
    options: [
      "Lighting",
      "Small power",
      "Space heating and cooling",
      "Hot water"
    ],
    correctAnswer: 2,
    explanation: "Space heating and cooling (HVAC) typically accounts for 40-50% of operational energy in UK office buildings, making it the largest contributor to operational carbon. This makes HVAC efficiency and low-carbon heating critical for decarbonisation."
  },
  {
    id: 11,
    question: "What is sub-metering's primary role in operational carbon management?",
    options: [
      "To reduce energy costs through better tariffs",
      "To comply with Part L requirements",
      "To identify consumption patterns and target reduction opportunities",
      "To generate revenue from demand response"
    ],
    correctAnswer: 2,
    explanation: "Sub-metering enables disaggregation of energy consumption by end-use, time, and zone. This data identifies inefficiencies, tracks performance against benchmarks, verifies savings from interventions, and supports behavioural change programmes."
  },
  {
    id: 12,
    question: "In the NABERS UK energy rating scheme, what does a 5-star rating represent?",
    options: [
      "Minimum legal compliance",
      "Typical market performance",
      "Good practice performance",
      "Market-leading, exceptional performance"
    ],
    correctAnswer: 3,
    explanation: "NABERS UK rates operational energy performance from 1 to 6 stars. A 5-star rating represents market-leading performance (top 10-15% of buildings). A 6-star rating indicates exceptional, aspirational performance beyond current best practice."
  }
];

const faqs = [
  {
    question: "What is the difference between regulated and unregulated energy?",
    answer: "Regulated energy covers fixed building services controlled by Building Regulations Part L: heating, cooling, ventilation, hot water, and fixed lighting. Unregulated energy covers all other uses: plug loads (computers, equipment), catering, lifts, external lighting, and process loads. Part L compliance calculations only address regulated energy, yet unregulated loads often account for 25-40% of actual consumption in commercial buildings."
  },
  {
    question: "How is operational carbon calculated?",
    answer: "Operational carbon is calculated by multiplying energy consumption by appropriate carbon emission factors. For electricity: kWh consumed × grid carbon factor (currently ~0.193 kgCO₂e/kWh). For gas: kWh consumed × 0.183 kgCO₂e/kWh (including upstream emissions). Total operational carbon = (electricity × electricity factor) + (gas × gas factor) + (other fuels × respective factors). Results are typically expressed as kgCO₂e/m²/year."
  },
  {
    question: "Why does a 'performance gap' exist between design and operation?",
    answer: "The performance gap arises from multiple factors: design assumptions differ from actual occupancy/usage patterns; unregulated loads aren't included in compliance calculations; commissioning may be incomplete; controls aren't optimised; building fabric may underperform due to construction quality; and occupant behaviour varies from assumptions. Studies show actual consumption is typically 2-5 times higher than design predictions."
  },
  {
    question: "How do I benchmark a building's operational performance?",
    answer: "Use CIBSE TM46 benchmarks for DECs (typical and good practice values by building type), LETI targets for new buildings, or NABERS UK ratings for offices. Calculate your building's EUI (total energy ÷ floor area), then compare against the appropriate benchmark. Consider normalising for occupancy hours, climate (degree days), and building type. Separate analysis of electricity and fossil fuels provides additional insight."
  },
  {
    question: "What operational carbon reduction strategies are most effective?",
    answer: "The most effective strategies follow the carbon hierarchy: 1) Reduce demand through improved controls, BMS optimisation, and occupancy scheduling; 2) Improve efficiency via LED lighting, variable speed drives, and heat recovery; 3) Decarbonise supply through heat pumps, solar PV, and green electricity tariffs; 4) Monitor and verify through sub-metering and M&V protocols. Quick wins include lighting controls, HVAC scheduling, and plug load management."
  },
  {
    question: "How will grid decarbonisation affect operational carbon strategies?",
    answer: "As the UK grid decarbonises (targeting 100% clean power by 2035), electricity's carbon factor will decrease significantly. This makes electrification (heat pumps, induction cooking) increasingly advantageous over gas. However, it also means embodied carbon becomes proportionally more significant in whole-life assessments. Design strategies should prioritise energy efficiency regardless of carbon factors, as this future-proofs buildings and reduces costs."
  }
];

const HNCModule6Section4_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module6-section4">
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
            <span>Module 6.4.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Operational Carbon
          </h1>
          <p className="text-white/80">
            Energy-related emissions, regulated vs unregulated loads, benchmarking methodologies, and carbon reduction strategies
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Operational carbon:</strong> Emissions from building energy use</li>
              <li className="pl-1"><strong>Regulated loads:</strong> HVAC, lighting, hot water (Part L)</li>
              <li className="pl-1"><strong>Unregulated loads:</strong> Plug loads, equipment, lifts</li>
              <li className="pl-1"><strong>EUI:</strong> kWh/m²/year - the key benchmark metric</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>HVAC:</strong> 40-50% of operational energy</li>
              <li className="pl-1"><strong>Lighting:</strong> 15-25% with LED savings 60-80%</li>
              <li className="pl-1"><strong>Grid factor:</strong> ~0.193 kgCO₂e/kWh (2025)</li>
              <li className="pl-1"><strong>LETI office target:</strong> 55 kWh/m²/year</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Define operational carbon and its relationship to building energy use",
              "Distinguish between regulated and unregulated energy loads",
              "Apply benchmarking methodologies including CIBSE TM46 and EUI metrics",
              "Explain the carbon reduction hierarchy and prioritisation",
              "Identify effective reduction strategies for building services",
              "Calculate operational carbon using appropriate emission factors"
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

        {/* Section 1: Understanding Operational Carbon */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Understanding Operational Carbon
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Operational carbon encompasses all greenhouse gas emissions resulting from energy consumption
              during a building's use phase. Over a typical 60-year building lifespan, operational carbon
              represents 60-80% of whole-life carbon emissions, making it the primary focus for
              decarbonisation efforts.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key components of operational carbon:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Direct emissions (Scope 1):</strong> On-site fuel combustion (gas boilers, generators)</li>
                <li className="pl-1"><strong>Indirect emissions (Scope 2):</strong> Purchased electricity and district heating</li>
                <li className="pl-1"><strong>Energy sources:</strong> Grid electricity, natural gas, oil, biomass, district systems</li>
                <li className="pl-1"><strong>End uses:</strong> Heating, cooling, ventilation, lighting, equipment, hot water</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Operational Carbon Calculation</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Energy Source</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Carbon Factor (2025)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Grid electricity</td>
                      <td className="border border-white/10 px-3 py-2">0.193 kgCO₂e/kWh</td>
                      <td className="border border-white/10 px-3 py-2">SAP 10.2 methodology; decreasing annually</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Natural gas</td>
                      <td className="border border-white/10 px-3 py-2">0.183 kgCO₂e/kWh</td>
                      <td className="border border-white/10 px-3 py-2">Including upstream emissions; relatively stable</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Heating oil</td>
                      <td className="border border-white/10 px-3 py-2">0.247 kgCO₂e/kWh</td>
                      <td className="border border-white/10 px-3 py-2">Higher than gas; declining use</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">LPG</td>
                      <td className="border border-white/10 px-3 py-2">0.214 kgCO₂e/kWh</td>
                      <td className="border border-white/10 px-3 py-2">Common in off-grid locations</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Biomass (wood pellets)</td>
                      <td className="border border-white/10 px-3 py-2">0.015 kgCO₂e/kWh</td>
                      <td className="border border-white/10 px-3 py-2">Low operational carbon; consider supply chain</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Grid Decarbonisation Trajectory</p>
              <div className="text-sm text-white space-y-1">
                <p><strong>2013:</strong> 0.519 kgCO₂e/kWh (coal-heavy mix)</p>
                <p><strong>2020:</strong> 0.233 kgCO₂e/kWh (renewable growth)</p>
                <p><strong>2025:</strong> 0.193 kgCO₂e/kWh (current)</p>
                <p><strong>2035 target:</strong> Near zero (100% clean power commitment)</p>
              </div>
              <p className="text-xs text-blue-300/70 mt-2">
                This trajectory makes electrification (heat pumps) increasingly advantageous over gas heating.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design implication:</strong> As grid electricity decarbonises, operational carbon reduction increasingly depends on energy efficiency rather than fuel switching.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Regulated vs Unregulated Energy */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Regulated vs Unregulated Energy
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Building Regulations Part L distinguishes between regulated energy (controlled by compliance
              calculations) and unregulated energy (not addressed by Part L). Understanding this distinction
              is crucial for predicting actual building performance and closing the 'performance gap'.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                <p className="text-sm font-medium text-green-400 mb-2">Regulated Loads (Part L)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Space heating systems (boilers, heat pumps)</li>
                  <li className="pl-1">Space cooling (chillers, DX systems)</li>
                  <li className="pl-1">Mechanical ventilation (AHUs, extract fans)</li>
                  <li className="pl-1">Domestic hot water heating</li>
                  <li className="pl-1">Fixed internal lighting</li>
                  <li className="pl-1">Pumps and fans for HVAC</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
                <p className="text-sm font-medium text-orange-400 mb-2">Unregulated Loads (Not Part L)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Plug loads (computers, monitors, equipment)</li>
                  <li className="pl-1">Server rooms and data centres</li>
                  <li className="pl-1">Lifts and escalators</li>
                  <li className="pl-1">Catering equipment</li>
                  <li className="pl-1">External and decorative lighting</li>
                  <li className="pl-1">Process loads and specialist equipment</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Energy Split by Building Type</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Building Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Regulated (%)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Unregulated (%)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Key Unregulated Loads</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">General office</td>
                      <td className="border border-white/10 px-3 py-2">60-75%</td>
                      <td className="border border-white/10 px-3 py-2">25-40%</td>
                      <td className="border border-white/10 px-3 py-2">IT equipment, small power, lifts</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Retail (large)</td>
                      <td className="border border-white/10 px-3 py-2">50-65%</td>
                      <td className="border border-white/10 px-3 py-2">35-50%</td>
                      <td className="border border-white/10 px-3 py-2">Refrigeration, escalators, display</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Hospital</td>
                      <td className="border border-white/10 px-3 py-2">45-60%</td>
                      <td className="border border-white/10 px-3 py-2">40-55%</td>
                      <td className="border border-white/10 px-3 py-2">Medical equipment, catering, lifts</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">School</td>
                      <td className="border border-white/10 px-3 py-2">70-85%</td>
                      <td className="border border-white/10 px-3 py-2">15-30%</td>
                      <td className="border border-white/10 px-3 py-2">IT suites, catering, sports facilities</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Hotel</td>
                      <td className="border border-white/10 px-3 py-2">55-70%</td>
                      <td className="border border-white/10 px-3 py-2">30-45%</td>
                      <td className="border border-white/10 px-3 py-2">Catering, laundry, lifts, leisure</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">The Performance Gap</p>
              <p className="text-sm text-white mb-2">
                Buildings typically consume 2-5 times more energy than Part L predictions because:
              </p>
              <ul className="text-sm text-white space-y-1">
                <li>• Unregulated loads are excluded from compliance calculations</li>
                <li>• Actual occupancy patterns differ from design assumptions</li>
                <li>• Systems may not be properly commissioned or maintained</li>
                <li>• Occupant behaviour varies from modelled assumptions</li>
                <li>• Building fabric may underperform due to construction quality</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Practical implication:</strong> Design teams should model total energy (regulated + unregulated) to predict realistic performance and set meaningful operational targets.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Benchmarking Methodologies */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Benchmarking Methodologies
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Benchmarking enables comparison of building performance against industry standards and
              best practice. The primary metric is Energy Use Intensity (EUI), expressed as kWh/m²/year,
              which normalises consumption by floor area for meaningful comparison.
            </p>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Energy Use Intensity (EUI) Calculation</p>
              <div className="font-mono text-sm space-y-2">
                <p><span className="text-white/60">EUI =</span> Total Annual Energy Consumption (kWh) ÷ Gross Internal Area (m²)</p>
                <p className="mt-3"><span className="text-white/60">Example office building:</span></p>
                <p>Annual electricity: 475,000 kWh</p>
                <p>Annual gas: 300,000 kWh</p>
                <p>GIA: 5,000 m²</p>
                <p className="text-elec-yellow mt-2">EUI = (475,000 + 300,000) ÷ 5,000 = 155 kWh/m²/year</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">CIBSE TM46 Benchmarks (Selected Building Types)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Building Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Electricity (kWh/m²)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Fossil-Thermal (kWh/m²)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Good Practice EUI</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">General office (nat vent)</td>
                      <td className="border border-white/10 px-3 py-2">95</td>
                      <td className="border border-white/10 px-3 py-2">120</td>
                      <td className="border border-white/10 px-3 py-2">~130</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">General office (air-con)</td>
                      <td className="border border-white/10 px-3 py-2">128</td>
                      <td className="border border-white/10 px-3 py-2">107</td>
                      <td className="border border-white/10 px-3 py-2">~160</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Primary school</td>
                      <td className="border border-white/10 px-3 py-2">32</td>
                      <td className="border border-white/10 px-3 py-2">113</td>
                      <td className="border border-white/10 px-3 py-2">~100</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Hospital (clinical)</td>
                      <td className="border border-white/10 px-3 py-2">90</td>
                      <td className="border border-white/10 px-3 py-2">300</td>
                      <td className="border border-white/10 px-3 py-2">~280</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Hotel</td>
                      <td className="border border-white/10 px-3 py-2">105</td>
                      <td className="border border-white/10 px-3 py-2">200</td>
                      <td className="border border-white/10 px-3 py-2">~220</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Retail (supermarket)</td>
                      <td className="border border-white/10 px-3 py-2">365</td>
                      <td className="border border-white/10 px-3 py-2">105</td>
                      <td className="border border-white/10 px-3 py-2">~350</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">LETI Net Zero Targets</p>
                <ul className="text-sm text-white space-y-1.5">
                  <li><strong>Office:</strong> 55 kWh/m²/year</li>
                  <li><strong>School:</strong> 65 kWh/m²/year</li>
                  <li><strong>Residential:</strong> 35 kWh/m²/year</li>
                  <li><strong>Hotel:</strong> 85 kWh/m²/year</li>
                  <li><strong>Retail:</strong> 70 kWh/m²/year</li>
                </ul>
                <p className="text-xs text-white/60 mt-2">Total operational energy including unregulated</p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">NABERS UK Rating Scale</p>
                <ul className="text-sm text-white space-y-1.5">
                  <li><strong>6 stars:</strong> Exceptional (market-leading)</li>
                  <li><strong>5 stars:</strong> Excellent (top 10-15%)</li>
                  <li><strong>4 stars:</strong> Good (above average)</li>
                  <li><strong>3 stars:</strong> Average (typical)</li>
                  <li><strong>2 stars:</strong> Below average</li>
                  <li><strong>1 star:</strong> Poor performance</li>
                </ul>
                <p className="text-xs text-white/60 mt-2">Based on actual metered performance</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Display Energy Certificate (DEC) Ratings</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>A (0-25):</strong> Exceptional performance, significantly below benchmark</li>
                <li className="pl-1"><strong>B (26-50):</strong> Good performance, below benchmark</li>
                <li className="pl-1"><strong>C (51-75):</strong> Typical performance, around benchmark</li>
                <li className="pl-1"><strong>D (76-100):</strong> At benchmark (D100 = TM46 typical value)</li>
                <li className="pl-1"><strong>E-G (101+):</strong> Above benchmark, poor performance</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Benchmarking tip:</strong> Always compare like with like - normalise for occupancy hours, climate zone, and building function before drawing conclusions.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Carbon Reduction Strategies */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Carbon Reduction Strategies
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The carbon reduction hierarchy prioritises strategies by effectiveness and permanence.
              Following this hierarchy ensures resources are directed to interventions with the
              greatest impact and longest-lasting benefits.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Carbon Reduction Hierarchy</p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="bg-green-500/30 text-green-400 px-2 py-0.5 rounded text-xs font-medium">1</span>
                  <div>
                    <p className="text-sm font-medium text-white">Reduce Demand</p>
                    <p className="text-xs text-white/70">Fabric efficiency, controls optimisation, occupancy scheduling, behaviour change</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-blue-500/30 text-blue-400 px-2 py-0.5 rounded text-xs font-medium">2</span>
                  <div>
                    <p className="text-sm font-medium text-white">Improve Efficiency</p>
                    <p className="text-xs text-white/70">LED lighting, variable speed drives, heat recovery, high-efficiency plant</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-purple-500/30 text-purple-400 px-2 py-0.5 rounded text-xs font-medium">3</span>
                  <div>
                    <p className="text-sm font-medium text-white">Decarbonise Supply</p>
                    <p className="text-xs text-white/70">Heat pumps, solar PV, green tariffs, district heating, biomass</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-orange-500/30 text-orange-400 px-2 py-0.5 rounded text-xs font-medium">4</span>
                  <div>
                    <p className="text-sm font-medium text-white">Offset Residual</p>
                    <p className="text-xs text-white/70">Carbon credits, verified offsets (last resort for unavoidable emissions)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Building Services Reduction Strategies</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">System</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Strategy</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Savings</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Payback</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Lighting</td>
                      <td className="border border-white/10 px-3 py-2">LED retrofit with DALI controls</td>
                      <td className="border border-white/10 px-3 py-2">60-80%</td>
                      <td className="border border-white/10 px-3 py-2">2-4 years</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">HVAC</td>
                      <td className="border border-white/10 px-3 py-2">Variable speed drives on fans/pumps</td>
                      <td className="border border-white/10 px-3 py-2">30-50%</td>
                      <td className="border border-white/10 px-3 py-2">2-3 years</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Heating</td>
                      <td className="border border-white/10 px-3 py-2">Air source heat pump (replacing gas)</td>
                      <td className="border border-white/10 px-3 py-2">60-70% carbon</td>
                      <td className="border border-white/10 px-3 py-2">7-12 years</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Controls</td>
                      <td className="border border-white/10 px-3 py-2">BMS optimisation and scheduling</td>
                      <td className="border border-white/10 px-3 py-2">10-20%</td>
                      <td className="border border-white/10 px-3 py-2">1-2 years</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Ventilation</td>
                      <td className="border border-white/10 px-3 py-2">Demand-controlled ventilation (CO₂)</td>
                      <td className="border border-white/10 px-3 py-2">20-40%</td>
                      <td className="border border-white/10 px-3 py-2">3-5 years</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Generation</td>
                      <td className="border border-white/10 px-3 py-2">Rooftop solar PV</td>
                      <td className="border border-white/10 px-3 py-2">10-30% electricity</td>
                      <td className="border border-white/10 px-3 py-2">6-10 years</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                <p className="text-sm font-medium text-green-400 mb-2">Quick Wins (Low Cost, High Impact)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">HVAC scheduling optimisation</li>
                  <li className="pl-1">Setpoint adjustments (±1°C = ~8% energy)</li>
                  <li className="pl-1">Lighting time scheduling</li>
                  <li className="pl-1">Equipment switch-off campaigns</li>
                  <li className="pl-1">Boiler/chiller sequencing</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                <p className="text-sm font-medium text-blue-400 mb-2">Strategic Investments (Higher Cost, Transformational)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Heat pump installation</li>
                  <li className="pl-1">Building fabric upgrades</li>
                  <li className="pl-1">Solar PV with battery storage</li>
                  <li className="pl-1">Full LED lighting replacement</li>
                  <li className="pl-1">Advanced BMS with AI optimisation</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-purple-500/10 border border-purple-500/30">
              <p className="text-sm font-medium text-purple-400 mb-2">Monitoring and Verification (M&V)</p>
              <p className="text-sm text-white mb-2">Essential for demonstrating actual savings and maintaining performance:</p>
              <ul className="text-sm text-white space-y-1">
                <li>• <strong>Sub-metering:</strong> Disaggregate consumption by end-use (lighting, HVAC, small power)</li>
                <li>• <strong>Baselining:</strong> Establish pre-intervention performance for comparison</li>
                <li>• <strong>Normalisation:</strong> Adjust for weather (degree days) and occupancy</li>
                <li>• <strong>IPMVP:</strong> International Performance Measurement and Verification Protocol</li>
                <li>• <strong>Continuous monitoring:</strong> Automated alerts for performance drift</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Key principle:</strong> The cheapest and cleanest kilowatt-hour is the one you never use. Prioritise demand reduction before considering renewable generation.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Calculating Operational Carbon</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Calculate annual operational carbon for an office building.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Given data:</p>
                <p className="ml-4">Annual electricity: 450,000 kWh</p>
                <p className="ml-4">Annual gas: 280,000 kWh</p>
                <p className="ml-4">GIA: 4,000 m²</p>
                <p className="mt-2 text-white/60">Carbon factors (2025):</p>
                <p className="ml-4">Electricity: 0.193 kgCO₂e/kWh</p>
                <p className="ml-4">Gas: 0.183 kgCO₂e/kWh</p>
                <p className="mt-2 text-white/60">Calculation:</p>
                <p className="ml-4">Electricity carbon = 450,000 × 0.193 = 86,850 kgCO₂e</p>
                <p className="ml-4">Gas carbon = 280,000 × 0.183 = 51,240 kgCO₂e</p>
                <p className="ml-4">Total carbon = 86,850 + 51,240 = 138,090 kgCO₂e</p>
                <p className="mt-2 text-elec-yellow">Carbon intensity = 138,090 ÷ 4,000 = 34.5 kgCO₂e/m²/year</p>
                <p className="text-green-400 mt-2">EUI = (450,000 + 280,000) ÷ 4,000 = 182.5 kWh/m²/year</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: DEC Rating Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Determine the DEC rating for a naturally ventilated office.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Building data:</p>
                <p className="ml-4">Actual electricity: 75 kWh/m²/year</p>
                <p className="ml-4">Actual gas (heating): 95 kWh/m²/year</p>
                <p className="mt-2 text-white/60">TM46 benchmarks (nat vent office):</p>
                <p className="ml-4">Electricity benchmark: 95 kWh/m²</p>
                <p className="ml-4">Fossil-thermal benchmark: 120 kWh/m²</p>
                <p className="mt-2 text-white/60">Calculate Operational Rating (OR):</p>
                <p className="ml-4">Electricity ratio = 75 ÷ 95 = 0.79</p>
                <p className="ml-4">Gas ratio = 95 ÷ 120 = 0.79</p>
                <p className="ml-4">Weighted OR ≈ 79</p>
                <p className="mt-2 text-elec-yellow">DEC Rating = C (OR 79 falls in 51-75 band)</p>
                <p className="text-green-400 mt-2">This building performs 21% better than the TM46 typical benchmark</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: LED Retrofit Carbon Savings</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Calculate carbon and cost savings from LED lighting upgrade.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Current system:</p>
                <p className="ml-4">Fluorescent lighting: 45,000 kWh/year</p>
                <p className="ml-4">Operating hours: 2,500 hrs/year</p>
                <p className="mt-2 text-white/60">LED system:</p>
                <p className="ml-4">Expected consumption: 18,000 kWh/year (60% reduction)</p>
                <p className="mt-2 text-white/60">Carbon calculation:</p>
                <p className="ml-4">Current carbon = 45,000 × 0.193 = 8,685 kgCO₂e</p>
                <p className="ml-4">LED carbon = 18,000 × 0.193 = 3,474 kgCO₂e</p>
                <p className="ml-4 text-green-400">Carbon saving = 5,211 kgCO₂e/year (60% reduction)</p>
                <p className="mt-2 text-white/60">Cost calculation (at £0.28/kWh):</p>
                <p className="ml-4">Energy saving = 27,000 kWh/year</p>
                <p className="ml-4 text-elec-yellow">Cost saving = £7,560/year</p>
                <p className="ml-4">Project cost: £22,000</p>
                <p className="ml-4 text-green-400">Simple payback = 2.9 years</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Operational Carbon Assessment Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Collect at least 12 months of energy bills (electricity, gas, other fuels)</li>
                <li className="pl-1">Verify floor area (GIA) and determine building classification</li>
                <li className="pl-1">Calculate EUI and compare against CIBSE TM46 benchmarks</li>
                <li className="pl-1">Apply current carbon factors to calculate emissions</li>
                <li className="pl-1">Identify regulated vs unregulated load split where possible</li>
                <li className="pl-1">Document occupancy patterns and operating hours</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Electricity carbon factor: <strong>0.193 kgCO₂e/kWh</strong> (2025)</li>
                <li className="pl-1">Gas carbon factor: <strong>0.183 kgCO₂e/kWh</strong></li>
                <li className="pl-1">Typical office EUI: <strong>150-250 kWh/m²/year</strong></li>
                <li className="pl-1">LETI office target: <strong>55 kWh/m²/year</strong></li>
                <li className="pl-1">Performance gap: <strong>2-5× design predictions</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Ignoring unregulated loads</strong> - they can be 25-40% of total consumption</li>
                <li className="pl-1"><strong>Using outdated carbon factors</strong> - grid electricity factors change annually</li>
                <li className="pl-1"><strong>Comparing dissimilar buildings</strong> - always normalise for type and occupancy</li>
                <li className="pl-1"><strong>Offsetting before reducing</strong> - follow the carbon hierarchy correctly</li>
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
                <p className="font-medium text-white mb-1">Carbon Factors (2025)</p>
                <ul className="space-y-0.5">
                  <li>Electricity: 0.193 kgCO₂e/kWh</li>
                  <li>Natural gas: 0.183 kgCO₂e/kWh</li>
                  <li>Heating oil: 0.247 kgCO₂e/kWh</li>
                  <li>LPG: 0.214 kgCO₂e/kWh</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">EUI Targets (kWh/m²/year)</p>
                <ul className="space-y-0.5">
                  <li>LETI Office: 55</li>
                  <li>LETI School: 65</li>
                  <li>LETI Residential: 35</li>
                  <li>TM46 Office (nat vent): 215</li>
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
            <Link to="../h-n-c-module6-section4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module6-section4-3">
              Next: Carbon Assessment Methods
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule6Section4_2;
