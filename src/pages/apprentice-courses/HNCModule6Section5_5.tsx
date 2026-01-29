import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Building Performance - HNC Module 6 Section 5.5";
const DESCRIPTION = "Master building performance assessment: Display Energy Certificates, operational ratings, asset ratings, performance gaps, CIBSE TM54 methodology, benchmarking, and strategies for improving operational energy efficiency.";

const quickCheckQuestions = [
  {
    id: "dec-requirement",
    question: "Which buildings are required to display a DEC in England and Wales?",
    options: ["All commercial buildings", "Public buildings over 250m² with public access", "Any building with air conditioning", "All buildings over 1000m²"],
    correctIndex: 1,
    explanation: "Display Energy Certificates are mandatory for public buildings over 250m² that are frequently visited by the public. This includes schools, hospitals, council offices, and leisure centres."
  },
  {
    id: "operational-rating",
    question: "What does an operational rating measure?",
    options: ["Theoretical energy efficiency of the building fabric", "Actual metered energy consumption in use", "Maximum permissible energy consumption", "Energy consumption during commissioning"],
    correctIndex: 1,
    explanation: "An operational rating is based on actual metered energy consumption data, reflecting how the building performs in real-world conditions with actual occupants, weather, and operating patterns."
  },
  {
    id: "performance-gap",
    question: "The 'performance gap' refers to the difference between:",
    options: ["Summer and winter energy consumption", "Predicted design energy use and actual operational energy use", "Electrical and gas consumption", "Peak demand and average demand"],
    correctIndex: 1,
    explanation: "The performance gap is the difference between predicted energy consumption at design stage and actual measured energy consumption once the building is operational. This gap is often significant, typically 2-5 times higher than predicted."
  },
  {
    id: "tm54-purpose",
    question: "What is the primary purpose of CIBSE TM54?",
    options: ["To calculate U-values", "To predict operational energy use more accurately", "To size HVAC equipment", "To design lighting systems"],
    correctIndex: 1,
    explanation: "CIBSE TM54 provides a methodology for evaluating operational energy performance at design stage, aiming to produce realistic predictions that account for actual operating conditions, occupancy patterns, and equipment loads."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "A DEC rating of 'A' indicates energy consumption that is:",
    options: [
      "Average for the building type",
      "Less than 25% of the typical benchmark",
      "Compliant with Building Regulations",
      "Below the median for the sector"
    ],
    correctAnswer: 1,
    explanation: "A DEC rating of 'A' indicates that the building's energy consumption is less than 25% of the typical benchmark for that building type. The scale runs from A (most efficient) to G (least efficient), with 100 representing typical performance."
  },
  {
    id: 2,
    question: "The key difference between an EPC and a DEC is:",
    options: ["EPCs are for residential buildings only", "DECs measure actual energy use, EPCs assess theoretical performance", "EPCs are displayed publicly, DECs are private", "DECs are only valid for 1 year"],
    correctAnswer: 1,
    explanation: "EPCs (Energy Performance Certificates) provide an asset rating based on theoretical calculations of the building fabric and systems. DECs (Display Energy Certificates) provide an operational rating based on actual metered energy consumption."
  },
  {
    id: 3,
    question: "What is the typical validity period for a DEC in buildings over 1000m²?",
    options: ["6 months", "1 year", "5 years", "10 years"],
    correctAnswer: 1,
    explanation: "DECs for buildings over 1000m² must be renewed annually because they are based on the previous 12 months of actual energy consumption data. Buildings between 250-1000m² require renewal every 10 years."
  },
  {
    id: 4,
    question: "Which energy sources are typically included in DEC calculations?",
    options: [
      "Electricity only",
      "Gas and electricity only",
      "All metered energy including electricity, gas, oil, and district heating",
      "Only renewable energy sources"
    ],
    correctAnswer: 2,
    explanation: "DEC calculations include all metered energy supplies to the building, including electricity, gas, oil, LPG, coal, biomass, and district heating/cooling. The total is converted to kWh/m²/year using standard conversion factors."
  },
  {
    id: 5,
    question: "A building with a DEC rating of 150 uses approximately:",
    options: [
      "Half the energy of a typical building",
      "The same energy as a typical building",
      "50% more energy than a typical building",
      "Three times the energy of a typical building"
    ],
    correctAnswer: 2,
    explanation: "The DEC numerical rating uses 100 as the benchmark for typical performance. A rating of 150 indicates the building uses 50% more energy than the typical benchmark for that building type."
  },
  {
    id: 6,
    question: "CIBSE TM54 recommends including which of the following in operational energy predictions?",
    options: [
      "Only regulated loads",
      "Regulated loads plus standard occupancy assumptions",
      "All energy uses including unregulated loads, actual hours, and small power",
      "Only HVAC and lighting systems"
    ],
    correctAnswer: 2,
    explanation: "TM54 requires inclusion of all energy uses: regulated loads (heating, cooling, ventilation, lighting, hot water), unregulated loads (small power, servers, lifts, catering), actual operating hours, and realistic occupancy patterns."
  },
  {
    id: 7,
    question: "What is the main cause of performance gaps in new buildings?",
    options: [
      "Poor construction quality only",
      "Incorrect energy modelling assumptions and operational factors",
      "Equipment failures",
      "Weather variations"
    ],
    correctAnswer: 1,
    explanation: "Performance gaps typically result from multiple factors: unrealistic design assumptions (occupancy, operating hours, set points), unregulated loads not included in compliance models, poor commissioning, and operational practices different from design intent."
  },
  {
    id: 8,
    question: "Building energy benchmarks from CIBSE TM46 are expressed as:",
    options: [
      "kWh per occupant per year",
      "kWh per m² of floor area per year",
      "kW of peak demand",
      "Carbon emissions per year"
    ],
    correctAnswer: 1,
    explanation: "CIBSE TM46 benchmarks are expressed as kWh/m²/year for different building types, split into electrical and fossil fuel (thermal) benchmarks. This allows comparison across buildings of different sizes within the same category."
  },
  {
    id: 9,
    question: "Which factor typically contributes most to the performance gap in office buildings?",
    options: [
      "Heating system inefficiency",
      "Extended operating hours and out-of-hours use",
      "Poor insulation",
      "Lighting design"
    ],
    correctAnswer: 1,
    explanation: "Extended operating hours are a major contributor to performance gaps. Design assumptions often use standard occupancy (e.g., 8am-6pm), but actual buildings frequently operate longer hours, include weekend use, and have significant out-of-hours consumption from servers, security, and cleaning."
  },
  {
    id: 10,
    question: "An Advisory Report (AR) accompanying a DEC must include:",
    options: [
      "Only the building's energy consumption data",
      "Recommendations for improving energy efficiency",
      "A complete retrofit specification",
      "Guaranteed energy savings"
    ],
    correctAnswer: 1,
    explanation: "The Advisory Report provides cost-effective recommendations for improving the building's energy efficiency. It must identify improvement opportunities, estimated savings, and implementation priorities, though detailed specifications are not required."
  },
  {
    id: 11,
    question: "Soft Landings is a process that aims to:",
    options: [
      "Reduce construction costs",
      "Ensure buildings perform as designed through extended aftercare",
      "Simplify planning applications",
      "Speed up construction programmes"
    ],
    correctAnswer: 1,
    explanation: "Soft Landings (now part of Government Soft Landings - GSL) is a building delivery process that extends from design through construction and into operation, with the aim of closing the performance gap through better briefing, commissioning, handover, and aftercare."
  },
  {
    id: 12,
    question: "Sub-metering is important for improving operational ratings because it:",
    options: [
      "Is required by Building Regulations",
      "Enables identification of energy waste and targeting of improvements",
      "Reduces overall energy consumption automatically",
      "Satisfies insurance requirements"
    ],
    correctAnswer: 1,
    explanation: "Sub-metering allows energy consumption to be monitored at system or zone level, enabling identification of inefficient equipment, out-of-hours consumption, and specific improvement opportunities. Without sub-metering, it is difficult to target interventions effectively."
  }
];

const faqs = [
  {
    question: "Why do buildings often use 2-5 times more energy than predicted?",
    answer: "The performance gap has multiple causes: (1) Design models only include 'regulated' loads required for Building Regulations compliance, excluding small power, servers, and catering equipment; (2) Standard assumptions for occupancy and operating hours rarely match reality; (3) Control systems are often not commissioned properly or are overridden by occupants; (4) Building fabric may not achieve design specifications due to construction quality issues; (5) Actual weather data differs from design data. CIBSE TM54 methodology addresses many of these issues by requiring more realistic assumptions."
  },
  {
    question: "What is the difference between asset rating and operational rating?",
    answer: "Asset rating (EPC) assesses the theoretical energy efficiency of the building fabric and fixed services independent of occupancy - like a car's published fuel consumption figures. Operational rating (DEC) measures actual metered energy consumption - like a car's real-world fuel consumption. Asset ratings are based on standard assumptions and calculation methods, making them useful for comparing building fabric efficiency. Operational ratings reflect actual use patterns, occupant behaviour, and real operating conditions."
  },
  {
    question: "How can operational ratings be improved without major capital works?",
    answer: "Many improvements require minimal investment: (1) Optimise BMS settings and control strategies; (2) Review and adjust operating schedules to match actual occupancy; (3) Implement systematic switch-off procedures for out-of-hours periods; (4) Retune heating/cooling set points and dead bands; (5) Fix stuck dampers, valves, and malfunctioning sensors; (6) Address lighting controls and implement daylight dimming; (7) Engage occupants with energy awareness campaigns; (8) Review and renegotiate maintenance contracts to include energy performance. Studies show 10-20% savings are often achievable through operational improvements alone."
  },
  {
    question: "When should TM54 methodology be used?",
    answer: "TM54 should be used whenever realistic operational energy predictions are needed: (1) Setting design targets for new buildings or major refurbishments; (2) Validating energy strategies during RIBA Stage 2-3; (3) Preparing for Soft Landings delivery; (4) Supporting BREEAM assessments requiring energy performance evidence; (5) Informing business cases where operational costs are critical; (6) Post-occupancy evaluation to compare actual vs predicted performance. It is particularly valuable for public sector clients and projects subject to Government Soft Landings requirements."
  },
  {
    question: "How do weather corrections affect DEC ratings?",
    answer: "DEC calculations include weather corrections to enable fair comparison between buildings in different locations and across different years. Degree-day corrections normalise heating and cooling energy to a standard weather year, removing variations due to unusually warm or cold periods. This ensures a building's rating reflects its inherent efficiency rather than weather conditions, allowing meaningful comparison with benchmarks and previous years' performance."
  }
];

const HNCModule6Section5_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module6-section5">
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
            <span>Module 6.5.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Building Performance
          </h1>
          <p className="text-white/80">
            Display Energy Certificates, operational ratings, performance gaps, benchmarking, and strategies for improving building energy performance
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>DEC:</strong> Operational rating based on actual metered energy</li>
              <li className="pl-1"><strong>Performance gap:</strong> Actual use 2-5x design predictions</li>
              <li className="pl-1"><strong>TM54:</strong> Methodology for realistic energy predictions</li>
              <li className="pl-1"><strong>Benchmarks:</strong> kWh/m²/year by building type</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Public buildings:</strong> DECs required over 250m²</li>
              <li className="pl-1"><strong>Rating scale:</strong> A to G, 100 = typical</li>
              <li className="pl-1"><strong>Improvement focus:</strong> Controls, schedules, commissioning</li>
              <li className="pl-1"><strong>Sub-metering:</strong> Essential for targeting improvements</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain DEC requirements, ratings, and Advisory Reports",
              "Distinguish between asset ratings and operational ratings",
              "Identify causes of building performance gaps",
              "Apply CIBSE TM54 methodology for operational energy prediction",
              "Use energy benchmarks for building performance comparison",
              "Recommend strategies for improving operational ratings"
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

        {/* Section 1: Display Energy Certificates */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Display Energy Certificates (DECs)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Display Energy Certificates provide an operational rating based on actual measured energy consumption,
              showing how efficiently a building is being used in practice. Unlike EPCs which assess theoretical
              performance, DECs reflect real-world energy use including occupant behaviour and operating patterns.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">DEC Requirements:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Mandatory for:</strong> Public buildings over 250m² frequently visited by the public</li>
                <li className="pl-1"><strong>Display location:</strong> Prominently displayed where clearly visible to the public</li>
                <li className="pl-1"><strong>Renewal:</strong> Annually for buildings over 1000m², every 10 years for 250-1000m²</li>
                <li className="pl-1"><strong>Advisory Report:</strong> Required alongside DEC with improvement recommendations</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">DEC Rating Scale</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Rating</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Numerical Range</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Performance</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 text-green-400 font-medium">A</td>
                      <td className="border border-white/10 px-3 py-2">0-25</td>
                      <td className="border border-white/10 px-3 py-2">Exceptional - less than 25% of typical</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 text-green-300 font-medium">B</td>
                      <td className="border border-white/10 px-3 py-2">26-50</td>
                      <td className="border border-white/10 px-3 py-2">Excellent - 26-50% of typical</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 text-yellow-300 font-medium">C</td>
                      <td className="border border-white/10 px-3 py-2">51-75</td>
                      <td className="border border-white/10 px-3 py-2">Good - 51-75% of typical</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 text-yellow-400 font-medium">D</td>
                      <td className="border border-white/10 px-3 py-2">76-100</td>
                      <td className="border border-white/10 px-3 py-2">Typical - around benchmark level</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 text-orange-400 font-medium">E</td>
                      <td className="border border-white/10 px-3 py-2">101-125</td>
                      <td className="border border-white/10 px-3 py-2">Below average - up to 25% above typical</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 text-orange-500 font-medium">F</td>
                      <td className="border border-white/10 px-3 py-2">126-150</td>
                      <td className="border border-white/10 px-3 py-2">Poor - 26-50% above typical</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 text-red-500 font-medium">G</td>
                      <td className="border border-white/10 px-3 py-2">Over 150</td>
                      <td className="border border-white/10 px-3 py-2">Very poor - more than 50% above typical</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">DEC Calculation Components</p>
              <div className="text-sm space-y-1">
                <p><span className="text-white/60">Electricity consumption:</span> <span className="text-white">Metered kWh from utility bills</span></p>
                <p><span className="text-white/60">Heating fuel:</span> <span className="text-white">Gas, oil, or district heating in kWh</span></p>
                <p><span className="text-white/60">Total floor area:</span> <span className="text-white">Gross internal area (GIA) in m²</span></p>
                <p><span className="text-white/60">Weather correction:</span> <span className="text-white">Degree-day normalisation</span></p>
                <p><span className="text-white/60">Benchmark:</span> <span className="text-white">CIBSE TM46 values for building type</span></p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key principle:</strong> DECs promote transparency and continuous improvement by making energy performance visible to building users and the public.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Asset Rating vs Operational Rating */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Asset Rating vs Operational Rating
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Understanding the difference between asset ratings (EPCs) and operational ratings (DECs) is
              fundamental to building performance assessment. Each serves a different purpose and measures
              different aspects of energy efficiency.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Asset Rating (EPC)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Based on building fabric and systems</li>
                  <li className="pl-1">Calculated using standard assumptions</li>
                  <li className="pl-1">Independent of actual occupancy</li>
                  <li className="pl-1">Allows building-to-building comparison</li>
                  <li className="pl-1">Valid for 10 years</li>
                  <li className="pl-1">Required for sale/let transactions</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Operational Rating (DEC)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Based on actual metered consumption</li>
                  <li className="pl-1">Reflects real operating conditions</li>
                  <li className="pl-1">Includes occupant behaviour effects</li>
                  <li className="pl-1">Shows year-on-year performance trends</li>
                  <li className="pl-1">Updated annually (large buildings)</li>
                  <li className="pl-1">Required for public display</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Rating Comparison Example - Office Building</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Aspect</th>
                      <th className="border border-white/10 px-3 py-2 text-left">EPC Assessment</th>
                      <th className="border border-white/10 px-3 py-2 text-left">DEC Assessment</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Operating hours</td>
                      <td className="border border-white/10 px-3 py-2">Standard: 52 hrs/week</td>
                      <td className="border border-white/10 px-3 py-2">Actual: 70 hrs/week</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Heating set point</td>
                      <td className="border border-white/10 px-3 py-2">Standard: 21°C</td>
                      <td className="border border-white/10 px-3 py-2">Actual: 23°C average</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Small power</td>
                      <td className="border border-white/10 px-3 py-2">Standard: 12 W/m²</td>
                      <td className="border border-white/10 px-3 py-2">Actual: 25 W/m²</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Server room</td>
                      <td className="border border-white/10 px-3 py-2">Not included</td>
                      <td className="border border-white/10 px-3 py-2">Fully included</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Resulting rating</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">B (45)</td>
                      <td className="border border-white/10 px-3 py-2 text-orange-400">E (118)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Why Both Ratings Matter</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Asset rating:</strong> Identifies fabric and system improvement opportunities</li>
                <li className="pl-1"><strong>Operational rating:</strong> Reveals management and control improvement opportunities</li>
                <li className="pl-1"><strong>Large gap between ratings:</strong> Suggests operational issues rather than building deficiencies</li>
                <li className="pl-1"><strong>Similar ratings:</strong> Indicates the building is operating close to its theoretical potential</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Practical insight:</strong> A building with a good EPC but poor DEC has significant operational improvement potential without capital investment.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Performance Gaps and TM54 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Performance Gaps and CIBSE TM54
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The performance gap between predicted and actual energy consumption is a critical issue in
              building engineering. Research consistently shows that buildings use 2-5 times more energy
              than design predictions suggest. CIBSE TM54 provides a methodology to address this.
            </p>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Causes of Performance Gaps</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Unregulated loads excluded:</strong> Compliance models ignore small power, servers, lifts, catering</li>
                <li className="pl-1"><strong>Unrealistic assumptions:</strong> Standard occupancy and hours rarely match actual use</li>
                <li className="pl-1"><strong>Poor commissioning:</strong> Systems not optimised or controls not properly set up</li>
                <li className="pl-1"><strong>Construction quality:</strong> Air tightness and insulation below specification</li>
                <li className="pl-1"><strong>Operational issues:</strong> Overridden controls, extended hours, comfort complaints</li>
                <li className="pl-1"><strong>Tenant fit-out:</strong> Additional loads added post-completion</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">CIBSE TM54 Methodology</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Step</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Activity</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Purpose</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">1</td>
                      <td className="border border-white/10 px-3 py-2">Gather operational information</td>
                      <td className="border border-white/10 px-3 py-2">Actual hours, occupancy, process loads</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">2</td>
                      <td className="border border-white/10 px-3 py-2">Identify all energy uses</td>
                      <td className="border border-white/10 px-3 py-2">Both regulated and unregulated loads</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">3</td>
                      <td className="border border-white/10 px-3 py-2">Create energy model</td>
                      <td className="border border-white/10 px-3 py-2">Using actual operational parameters</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">4</td>
                      <td className="border border-white/10 px-3 py-2">Separate end uses</td>
                      <td className="border border-white/10 px-3 py-2">Heating, cooling, lighting, equipment etc.</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">5</td>
                      <td className="border border-white/10 px-3 py-2">Apply monthly profiles</td>
                      <td className="border border-white/10 px-3 py-2">Seasonal variation in loads</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">6</td>
                      <td className="border border-white/10 px-3 py-2">Compare with benchmarks</td>
                      <td className="border border-white/10 px-3 py-2">Validate predictions against TM46</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Regulated Loads</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Space heating</li>
                  <li className="pl-1">Space cooling</li>
                  <li className="pl-1">Ventilation fans</li>
                  <li className="pl-1">Fixed lighting</li>
                  <li className="pl-1">Hot water (pumps)</li>
                  <li className="pl-1">Auxiliary energy</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Unregulated Loads</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Small power/equipment</li>
                  <li className="pl-1">Server rooms/IT</li>
                  <li className="pl-1">Lifts and escalators</li>
                  <li className="pl-1">Catering equipment</li>
                  <li className="pl-1">External lighting</li>
                  <li className="pl-1">Specialist equipment</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">TM54 Additions</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Actual operating hours</li>
                  <li className="pl-1">Real occupancy patterns</li>
                  <li className="pl-1">Out-of-hours loads</li>
                  <li className="pl-1">Tenant equipment</li>
                  <li className="pl-1">Management factors</li>
                  <li className="pl-1">Uncertainty margins</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>TM54 target:</strong> Predictions within ±20% of actual consumption, compared to typical gaps of 150-400% using compliance calculations alone.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Benchmarking and Improvement Strategies */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Benchmarking and Improvement Strategies
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Energy benchmarking enables comparison of building performance against similar buildings
              and identification of improvement opportunities. CIBSE TM46 provides standardised benchmarks
              for various building types used in DEC calculations.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">CIBSE TM46 Benchmarks (kWh/m²/year)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Building Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Electrical</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Fossil Fuel</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Total Typical</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">General Office</td>
                      <td className="border border-white/10 px-3 py-2">95</td>
                      <td className="border border-white/10 px-3 py-2">120</td>
                      <td className="border border-white/10 px-3 py-2">215</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Schools/Universities</td>
                      <td className="border border-white/10 px-3 py-2">40</td>
                      <td className="border border-white/10 px-3 py-2">150</td>
                      <td className="border border-white/10 px-3 py-2">190</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Hospital (Clinical)</td>
                      <td className="border border-white/10 px-3 py-2">120</td>
                      <td className="border border-white/10 px-3 py-2">420</td>
                      <td className="border border-white/10 px-3 py-2">540</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Retail (Sales Area)</td>
                      <td className="border border-white/10 px-3 py-2">165</td>
                      <td className="border border-white/10 px-3 py-2">0</td>
                      <td className="border border-white/10 px-3 py-2">165</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Leisure Centre</td>
                      <td className="border border-white/10 px-3 py-2">115</td>
                      <td className="border border-white/10 px-3 py-2">475</td>
                      <td className="border border-white/10 px-3 py-2">590</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-green-500/10 border border-green-500/30">
              <p className="text-sm font-medium text-green-400 mb-2">Strategies for Improving Operational Ratings</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-white/60 mb-1">Low/No Cost Measures</p>
                  <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                    <li className="pl-1">Optimise BMS schedules and setpoints</li>
                    <li className="pl-1">Implement systematic switch-off procedures</li>
                    <li className="pl-1">Reduce out-of-hours operation</li>
                    <li className="pl-1">Engage occupants in energy saving</li>
                    <li className="pl-1">Review and fix control issues</li>
                    <li className="pl-1">Retune heating/cooling deadbands</li>
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-medium text-white/60 mb-1">Capital Investment Measures</p>
                  <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                    <li className="pl-1">LED lighting upgrades with controls</li>
                    <li className="pl-1">Variable speed drives on pumps/fans</li>
                    <li className="pl-1">BMS upgrades and optimisation</li>
                    <li className="pl-1">Heat recovery systems</li>
                    <li className="pl-1">Improved insulation and glazing</li>
                    <li className="pl-1">Renewable energy installations</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Sub-Metering Strategy</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Mains incomer:</strong> Total site consumption (required for DEC)</li>
                <li className="pl-1"><strong>Major plant:</strong> Chillers, boilers, AHUs, lift motors</li>
                <li className="pl-1"><strong>Lighting circuits:</strong> Separately metered per floor or zone</li>
                <li className="pl-1"><strong>Small power:</strong> Floor-by-floor or tenant sub-metering</li>
                <li className="pl-1"><strong>Server rooms:</strong> Critical for identifying IT energy use</li>
                <li className="pl-1"><strong>Catering:</strong> Separate metering for kitchens and vending</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Soft Landings and Post-Occupancy Evaluation</p>
              <div className="text-sm space-y-2">
                <p><strong>Government Soft Landings (GSL)</strong> is a building delivery process designed to close the performance gap:</p>
                <ul className="space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Stage 1:</strong> Define outcome-based performance requirements at briefing</li>
                  <li className="pl-1"><strong>Stage 2:</strong> Set measurable energy targets using TM54 methodology</li>
                  <li className="pl-1"><strong>Stage 3:</strong> Reality checking during design development</li>
                  <li className="pl-1"><strong>Stage 4:</strong> Commissioning and pre-handover verification</li>
                  <li className="pl-1"><strong>Stage 5:</strong> Extended aftercare period (typically 3 years)</li>
                  <li className="pl-1"><strong>POE:</strong> Post-occupancy evaluation comparing actual vs design</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Continuous improvement:</strong> Annual DEC renewal provides an opportunity to track progress and refine improvement strategies based on measured results.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: DEC Rating Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Calculate the DEC rating for a 5,000m² office building.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Annual energy consumption:</p>
                <p className="ml-4">Electricity: 550,000 kWh</p>
                <p className="ml-4">Gas: 450,000 kWh</p>
                <p className="mt-2">Floor area: 5,000 m² GIA</p>
                <p className="mt-2 text-white/60">Energy use intensity:</p>
                <p className="ml-4">Electricity: 550,000 ÷ 5,000 = 110 kWh/m²/yr</p>
                <p className="ml-4">Gas: 450,000 ÷ 5,000 = 90 kWh/m²/yr</p>
                <p className="mt-2 text-white/60">Compare to TM46 Office benchmark (95 + 120 = 215):</p>
                <p className="ml-4">Actual total: 110 + 90 = 200 kWh/m²/yr</p>
                <p className="ml-4">Rating: (200 ÷ 215) × 100 = 93</p>
                <p className="mt-2 text-green-400">Result: DEC Rating D (93) - slightly better than typical</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Performance Gap Analysis</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Analyse the performance gap for a new school building.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Design prediction (Part L compliance):</p>
                <p className="ml-4">Regulated energy: 85 kWh/m²/yr</p>
                <p className="mt-2 text-white/60">TM54 prediction (operational):</p>
                <p className="ml-4">Regulated: 85 kWh/m²/yr</p>
                <p className="ml-4">Unregulated (IT, catering): 45 kWh/m²/yr</p>
                <p className="ml-4">Extended hours factor: +15%</p>
                <p className="ml-4">Total: (85 + 45) × 1.15 = 150 kWh/m²/yr</p>
                <p className="mt-2 text-white/60">Actual consumption (Year 1):</p>
                <p className="ml-4">Metered: 175 kWh/m²/yr</p>
                <p className="mt-2 text-white/60">Performance gap analysis:</p>
                <p className="ml-4">vs Part L: 175 ÷ 85 = 2.06× (106% gap)</p>
                <p className="ml-4">vs TM54: 175 ÷ 150 = 1.17× (17% gap)</p>
                <p className="mt-2 text-green-400">TM54 produced a more realistic prediction</p>
                <p className="text-yellow-400">Investigate remaining 17% gap: controls, behaviour</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Improvement Strategy Development</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Develop an improvement plan for a council building with DEC rating F (142).
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Current performance:</p>
                <p className="ml-4">DEC Rating: F (142) - 42% above typical</p>
                <p className="ml-4">Consumption: 285 kWh/m²/yr</p>
                <p className="ml-4">Benchmark: 200 kWh/m²/yr</p>
                <p className="mt-2 text-white/60">Sub-metering analysis reveals:</p>
                <p className="ml-4">Out-of-hours baseload: 35% of consumption</p>
                <p className="ml-4">Heating running 24/7 (not required)</p>
                <p className="ml-4">Lighting on timers, not occupancy</p>
                <p className="mt-2 text-white/60">Recommended actions:</p>
                <p className="ml-4 text-green-400">1. BMS optimisation (no cost): -15%</p>
                <p className="ml-4 text-green-400">2. Heating schedule correction: -10%</p>
                <p className="ml-4 text-green-400">3. Lighting controls upgrade: -8%</p>
                <p className="ml-4 text-green-400">4. Staff engagement programme: -5%</p>
                <p className="mt-2">Projected consumption: 285 × 0.62 = 177 kWh/m²/yr</p>
                <p className="text-green-400">Projected DEC Rating: D (88)</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">DEC Assessment Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Gather 12 months of energy bills for all fuel types</li>
                <li className="pl-1">Confirm gross internal floor area from measured drawings</li>
                <li className="pl-1">Identify building category from TM46 classification</li>
                <li className="pl-1">Apply weather corrections using degree-day data</li>
                <li className="pl-1">Document any changes affecting consumption (occupancy, hours)</li>
                <li className="pl-1">Prepare Advisory Report with prioritised recommendations</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">DEC benchmark: <strong>100 = typical</strong> for building type</li>
                <li className="pl-1">Typical performance gap: <strong>2-5 times</strong> design predictions</li>
                <li className="pl-1">TM54 target accuracy: <strong>±20%</strong> of actual consumption</li>
                <li className="pl-1">Operational savings potential: <strong>10-20%</strong> without capital investment</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Relying on EPC alone:</strong> Asset rating doesn't predict operational performance</li>
                <li className="pl-1"><strong>Ignoring unregulated loads:</strong> Often 30-50% of total consumption</li>
                <li className="pl-1"><strong>Assuming design = reality:</strong> Always verify with measured data</li>
                <li className="pl-1"><strong>No sub-metering:</strong> Cannot target improvements without disaggregated data</li>
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
                <p className="font-medium text-white mb-1">DEC Essentials</p>
                <ul className="space-y-0.5">
                  <li>Rating A-G, 100 = typical benchmark</li>
                  <li>Based on actual metered consumption</li>
                  <li>Annual renewal for buildings &gt;1000m²</li>
                  <li>Advisory Report required with recommendations</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Performance Gap Factors</p>
                <ul className="space-y-0.5">
                  <li>Unregulated loads not in compliance models</li>
                  <li>Extended operating hours</li>
                  <li>Higher internal gains than assumed</li>
                  <li>Poor commissioning and controls</li>
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
            <Link to="../h-n-c-module6-section5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module6-section5-6">
              Next: Section 5.6
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule6Section5_5;
