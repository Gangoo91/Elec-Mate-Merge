import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Energy Analysis - HNC Module 2 Section 6.2";
const DESCRIPTION = "Master energy analysis techniques for building services: energy balances, CIBSE TM46 benchmarking, TM54 operational energy prediction, and addressing the performance gap.";

const quickCheckQuestions = [
  {
    id: "tm46-purpose",
    question: "What is the primary purpose of CIBSE TM46?",
    options: ["Load calculation methodology", "Energy benchmarking for DECs", "Commissioning procedures", "Maintenance schedules"],
    correctIndex: 1,
    explanation: "CIBSE TM46 'Energy Benchmarks' provides benchmark energy consumption data used for Display Energy Certificates (DECs) and allows comparison of building performance against typical and good practice values."
  },
  {
    id: "performance-gap",
    question: "The 'performance gap' in buildings refers to:",
    options: ["Difference between peak and average loads", "Gap between design predictions and actual operational energy use", "Space between building elements", "Time lag in thermal response"],
    correctIndex: 1,
    explanation: "The performance gap describes the common finding that actual building energy consumption is significantly higher (often 2-5 times) than design-stage predictions, due to unrealistic modelling assumptions and operational factors."
  },
  {
    id: "tm54-approach",
    question: "CIBSE TM54 addresses the performance gap by:",
    options: ["Using stricter U-value requirements", "Applying larger safety factors", "Using realistic operational profiles and unregulated loads", "Requiring air tightness testing"],
    correctIndex: 2,
    explanation: "TM54 'Evaluating operational energy performance at design stage' requires consideration of realistic operational hours, out-of-hours energy use, unregulated loads, and actual equipment specifications rather than notional values."
  },
  {
    id: "energy-balance",
    question: "In a building energy balance, which term is typically the largest energy output?",
    options: ["Fabric losses", "Ventilation losses", "Hot water consumption", "Electrical equipment gains"],
    correctIndex: 0,
    explanation: "For most UK buildings, fabric losses (heat transfer through walls, roof, windows, floor) represent the largest energy output, typically accounting for 40-60% of total heat loss in heating-dominated climates."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What does a TM46 'typical' benchmark represent?",
    options: [
      "The best-performing 10% of buildings",
      "The median performance of existing buildings",
      "Building Regulations minimum requirement",
      "Net zero carbon target"
    ],
    correctAnswer: 1,
    explanation: "TM46 'typical' benchmarks represent median (50th percentile) performance of existing buildings of that type. 'Good practice' benchmarks represent the better-performing 25% of stock."
  },
  {
    id: 2,
    question: "Which energy use is NOT included in Part L compliance calculations but contributes to actual consumption?",
    options: [
      "Space heating",
      "Server rooms and IT equipment",
      "Hot water heating",
      "Mechanical ventilation"
    ],
    correctAnswer: 1,
    explanation: "Server rooms, lifts, plug-in equipment, and other 'unregulated' loads are excluded from Part L compliance calculations but can represent 30-50% of actual building energy consumption."
  },
  {
    id: 3,
    question: "The energy balance equation for a building during heating mode is:",
    options: [
      "Energy in = Energy out",
      "Gains (heating + solar + internal) = Losses (fabric + ventilation)",
      "Heating load = U-value × Area",
      "Energy = Power × Time"
    ],
    correctAnswer: 1,
    explanation: "In steady-state, energy inputs (heating system, solar gains, internal gains from people, lights, equipment) must balance energy outputs (fabric heat loss, ventilation/infiltration losses)."
  },
  {
    id: 4,
    question: "Display Energy Certificates (DECs) are based on:",
    options: [
      "Design-stage calculations",
      "Part L compliance modelling",
      "Actual metered energy consumption",
      "Equipment nameplate ratings"
    ],
    correctAnswer: 2,
    explanation: "DECs use actual metered energy consumption data, providing an 'operational rating' that reflects real-world performance. This contrasts with EPCs which use design-stage (asset rating) calculations."
  },
  {
    id: 5,
    question: "What typical uplift might TM54 methodology show compared to Part L calculations?",
    options: [
      "10-20% higher",
      "50-100% higher",
      "150-300% higher",
      "No significant difference"
    ],
    correctAnswer: 2,
    explanation: "TM54 analysis typically reveals energy consumption 150-300% (1.5-3 times) higher than Part L predictions, primarily due to extended operating hours, unregulated loads, and realistic equipment efficiencies."
  },
  {
    id: 6,
    question: "Which factor typically has the largest impact on the performance gap?",
    options: [
      "Weather variations from design assumptions",
      "Extended operating hours and out-of-hours consumption",
      "Variations in U-values",
      "Occupant density"
    ],
    correctAnswer: 1,
    explanation: "Extended operating hours (security, cleaning, early start-up) and out-of-hours 'baseload' consumption (IT, servers, emergency lighting) typically contribute most to the performance gap."
  },
  {
    id: 7,
    question: "TM46 provides separate benchmarks for:",
    options: [
      "Summer and winter only",
      "Heating and cooling energy only",
      "Fossil-thermal and electricity separately",
      "Weekday and weekend consumption"
    ],
    correctAnswer: 2,
    explanation: "TM46 provides separate benchmarks for fossil-thermal energy (gas, oil) and electricity, recognising their different carbon intensities and the importance of tracking electrical efficiency separately."
  },
  {
    id: 8,
    question: "A building has a DEC rating of 85. This means:",
    options: [
      "It performs 85% better than typical",
      "Its energy use is 85% of the TM46 typical benchmark",
      "85 kWh/m²/year consumption",
      "85% of heating requirements are met by renewables"
    ],
    correctAnswer: 1,
    explanation: "A DEC rating of 85 means the building's energy use is 85% of the TM46 typical benchmark for that building type - slightly better than average. Ratings below 100 indicate better than typical performance."
  },
  {
    id: 9,
    question: "When conducting energy analysis, 'degree days' are used to:",
    options: [
      "Calculate solar gains",
      "Normalise energy consumption for weather variations",
      "Determine equipment operating hours",
      "Set thermostat schedules"
    ],
    correctAnswer: 1,
    explanation: "Degree days allow weather normalisation of heating/cooling energy consumption, enabling fair year-on-year comparisons and performance benchmarking regardless of weather variations."
  },
  {
    id: 10,
    question: "Which TM54 factor addresses the difference between nameplate and actual equipment power?",
    options: [
      "Diversity factor",
      "Operating hours adjustment",
      "Efficiency adjustment",
      "Climate correction"
    ],
    correctAnswer: 2,
    explanation: "TM54 applies efficiency adjustments to account for the difference between nameplate ratings (maximum capacity) and actual operating efficiency, including part-load performance and auxiliary power consumption."
  },
  {
    id: 11,
    question: "What is the typical TM46 electricity benchmark for a naturally ventilated office?",
    options: [
      "25-35 kWh/m²/year",
      "55-75 kWh/m²/year",
      "95-120 kWh/m²/year",
      "150-200 kWh/m²/year"
    ],
    correctAnswer: 1,
    explanation: "TM46 typical electricity benchmark for naturally ventilated offices is approximately 55-75 kWh/m²/year. Air-conditioned offices are significantly higher at 95-120 kWh/m²/year due to cooling loads."
  },
  {
    id: 12,
    question: "The 'Carbonbuzz' database helps address the performance gap by:",
    options: [
      "Providing design calculation software",
      "Collecting anonymised actual vs predicted energy data",
      "Certifying building energy performance",
      "Training building managers"
    ],
    correctAnswer: 1,
    explanation: "Carbonbuzz (RIBA/CIBSE) collects anonymised data on actual vs predicted energy performance, providing evidence of the performance gap and helping calibrate future design predictions."
  }
];

const faqs = [
  {
    question: "Why is there such a large gap between predicted and actual energy consumption?",
    answer: "Multiple factors contribute: Part L uses standard occupancy and operating hours that are often shorter than reality; unregulated loads (IT, lifts, plug-in equipment) are excluded from compliance but significant in practice; design models assume optimal controls but real operation is less efficient; and buildings often operate 24/7 for security/cleaning rather than assumed occupied hours only."
  },
  {
    question: "How should I use TM46 benchmarks in practice?",
    answer: "Use them for three purposes: (1) Early design targets - 'good practice' values inform what's achievable; (2) DEC comparisons - understand where a building sits relative to stock; (3) Identifying opportunities - large differences between actual and 'good practice' suggest improvement potential. Always compare like-with-like (same building type, climate zone)."
  },
  {
    question: "When is TM54 analysis required?",
    answer: "TM54 analysis isn't mandatory but is increasingly expected for significant projects, particularly BREEAM assessments (which award credits for operational energy prediction), Soft Landings projects, and where clients require realistic energy cost predictions. It should be standard practice for any building where operational costs matter."
  },
  {
    question: "What data do I need for a TM54 assessment?",
    answer: "You need: realistic operating hours including cleaning and security; out-of-hours baseload estimates; actual equipment specifications (not notional values); server room and IT loads; catering equipment if applicable; lift energy consumption; external lighting; and realistic control system effectiveness. Much of this requires client input about intended operation."
  },
  {
    question: "How do I weather-normalise energy consumption data?",
    answer: "Use degree-day data: calculate the ratio of actual degree days to long-term average degree days, then adjust heating energy proportionally. For example, if actual heating degree days were 90% of average and consumption was 100 MWh, weather-normalised consumption = 100/0.9 = 111 MWh. Cooling energy uses cooling degree days similarly."
  },
  {
    question: "What actions can reduce the performance gap?",
    answer: "Design stage: use TM54 methodology with realistic assumptions. Construction: ensure commissioning verifies design intent. Handover: implement Soft Landings with extended aftercare. Operation: sub-meter key loads, monitor against benchmarks, maintain BMS optimisation. The gap often increases over time, so ongoing monitoring is essential."
  }
];

const HNCModule2Section6_2 = () => {
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
            <span>Module 2.6.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Energy Analysis
          </h1>
          <p className="text-white/80">
            Understanding energy balances, benchmarking methodologies, and bridging the performance gap
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Energy balance:</strong> Gains must equal losses in steady state</li>
              <li className="pl-1"><strong>TM46:</strong> Benchmarks for comparing building performance</li>
              <li className="pl-1"><strong>TM54:</strong> Realistic operational energy prediction</li>
              <li className="pl-1"><strong>Performance gap:</strong> Actual use often 2-3× design predictions</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Why This Matters</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Client expectations:</strong> Energy costs must be realistic</li>
              <li className="pl-1"><strong>Carbon targets:</strong> Net zero requires actual, not theoretical</li>
              <li className="pl-1"><strong>DECs:</strong> Based on actual operational data</li>
              <li className="pl-1"><strong>BREEAM:</strong> Credits for TM54 analysis</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Construct and interpret building energy balance diagrams",
              "Apply CIBSE TM46 benchmarks for performance comparison",
              "Understand TM54 methodology for operational energy prediction",
              "Identify causes of the performance gap",
              "Weather-normalise energy consumption data",
              "Develop strategies to reduce the performance gap"
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

        {/* Section 1: Energy Balances */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Energy Balances
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              An energy balance quantifies all energy flows into and out of a building. In steady-state
              conditions, total energy inputs must equal total energy outputs plus any change in stored energy.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Energy Balance Components</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded bg-green-500/10 border border-green-500/20">
                  <p className="text-sm font-medium text-green-400 mb-2">Energy Inputs (Gains)</p>
                  <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                    <li>Heating system (boilers, heat pumps)</li>
                    <li>Solar gains through glazing</li>
                    <li>Internal gains - people</li>
                    <li>Internal gains - lighting</li>
                    <li>Internal gains - equipment</li>
                    <li>Hot water system</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-red-500/10 border border-red-500/20">
                  <p className="text-sm font-medium text-red-400 mb-2">Energy Outputs (Losses)</p>
                  <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                    <li>Fabric losses - walls, roof, floor</li>
                    <li>Window losses (conduction)</li>
                    <li>Infiltration losses</li>
                    <li>Ventilation losses</li>
                    <li>Hot water to drain</li>
                    <li>Cooling system rejection</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Steady-State Energy Balance</p>
              <p className="font-mono text-center text-lg mb-2">Q<sub>heating</sub> + Q<sub>solar</sub> + Q<sub>internal</sub> = Q<sub>fabric</sub> + Q<sub>ventilation</sub></p>
              <p className="text-xs text-white/70 text-center">When cooling: Q<sub>solar</sub> + Q<sub>internal</sub> = Q<sub>cooling</sub> + Q<sub>losses</sub></p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Typical Energy Balance Breakdown (UK Office):</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Fabric losses:</strong> 40-50% of total heat loss</li>
                <li className="pl-1"><strong>Ventilation:</strong> 25-35% of total heat loss</li>
                <li className="pl-1"><strong>Infiltration:</strong> 10-15% of total heat loss</li>
                <li className="pl-1"><strong>Useful solar/internal gains:</strong> Can offset 20-30% of heating</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key insight:</strong> Understanding the energy balance helps identify the most effective
              interventions. If ventilation losses dominate, heat recovery is more valuable than fabric upgrades.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 2: TM46 Energy Benchmarking */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            TM46 Energy Benchmarking
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              CIBSE TM46 provides energy benchmarks for different building types, enabling comparison of
              actual performance against typical and good practice values. These benchmarks underpin Display
              Energy Certificates (DECs).
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">TM46 Benchmark Categories</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Building Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Electricity (kWh/m²)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Fossil-thermal (kWh/m²)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Office (naturally ventilated)</td>
                      <td className="border border-white/10 px-3 py-2">Typical: 54 / Good: 33</td>
                      <td className="border border-white/10 px-3 py-2">Typical: 151 / Good: 79</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Office (air conditioned)</td>
                      <td className="border border-white/10 px-3 py-2">Typical: 128 / Good: 97</td>
                      <td className="border border-white/10 px-3 py-2">Typical: 178 / Good: 97</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Schools</td>
                      <td className="border border-white/10 px-3 py-2">Typical: 41 / Good: 32</td>
                      <td className="border border-white/10 px-3 py-2">Typical: 150 / Good: 113</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Hospital (clinical)</td>
                      <td className="border border-white/10 px-3 py-2">Typical: 90 / Good: 65</td>
                      <td className="border border-white/10 px-3 py-2">Typical: 420 / Good: 350</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Retail (non-food)</td>
                      <td className="border border-white/10 px-3 py-2">Typical: 165 / Good: 105</td>
                      <td className="border border-white/10 px-3 py-2">Typical: 120 / Good: 55</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">DEC Rating Calculation:</p>
              <div className="p-3 rounded bg-black/30">
                <p className="font-mono text-sm text-center mb-2">DEC Rating = (Actual Energy / TM46 Typical) × 100</p>
                <p className="text-xs text-white/70 text-center">Rating &lt;100 = better than typical, Rating &gt;100 = worse than typical</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">DEC Rating Bands</p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li><strong>A:</strong> 0-25 (exceptional)</li>
                  <li><strong>B:</strong> 26-50 (excellent)</li>
                  <li><strong>C:</strong> 51-75 (good)</li>
                  <li><strong>D:</strong> 76-100 (typical)</li>
                  <li><strong>E-G:</strong> &gt;100 (poor to very poor)</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">When DECs Required</p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li>Public buildings &gt;250m² with public access</li>
                  <li>Renewed annually</li>
                  <li>Based on 12 months actual consumption</li>
                  <li>Must be displayed prominently</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Important:</strong> TM46 benchmarks are based on gross internal floor area (GIA).
              Ensure consistent floor area measurement when comparing buildings.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 3: TM54 Operational Energy */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            TM54 Operational Energy Prediction
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              CIBSE TM54 'Evaluating operational energy performance of buildings at the design stage' provides
              methodology for predicting realistic energy consumption, bridging the gap between compliance
              calculations and actual operational performance.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">TM54 Additional Considerations</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Factor</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Part L Assumption</th>
                      <th className="border border-white/10 px-3 py-2 text-left">TM54 Reality</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Operating hours</td>
                      <td className="border border-white/10 px-3 py-2">Standard schedules</td>
                      <td className="border border-white/10 px-3 py-2">Actual + out-of-hours</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Small power</td>
                      <td className="border border-white/10 px-3 py-2">Excluded</td>
                      <td className="border border-white/10 px-3 py-2">Full assessment</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Server rooms</td>
                      <td className="border border-white/10 px-3 py-2">Excluded</td>
                      <td className="border border-white/10 px-3 py-2">Full 24/7 load</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Lifts</td>
                      <td className="border border-white/10 px-3 py-2">Excluded</td>
                      <td className="border border-white/10 px-3 py-2">Based on traffic</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Catering</td>
                      <td className="border border-white/10 px-3 py-2">Excluded</td>
                      <td className="border border-white/10 px-3 py-2">Full assessment</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">System efficiency</td>
                      <td className="border border-white/10 px-3 py-2">Notional values</td>
                      <td className="border border-white/10 px-3 py-2">Actual specifications</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">TM54 Process:</p>
              <ol className="text-sm text-white space-y-1.5 list-decimal list-outside ml-5">
                <li className="pl-1">Start with Part L/dynamic simulation model</li>
                <li className="pl-1">Adjust operating hours to realistic schedules</li>
                <li className="pl-1">Add all unregulated loads (IT, lifts, catering, etc.)</li>
                <li className="pl-1">Adjust system efficiencies to actual specifications</li>
                <li className="pl-1">Include out-of-hours baseload consumption</li>
                <li className="pl-1">Apply management factor for control effectiveness</li>
              </ol>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
              <p className="text-sm font-medium text-orange-400 mb-2">Typical TM54 Uplift Factors</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Operating hours:</strong> +20-50% (cleaning, security, early start)</li>
                <li className="pl-1"><strong>Unregulated loads:</strong> +30-50% of regulated consumption</li>
                <li className="pl-1"><strong>System efficiency:</strong> +10-20% (part-load, auxiliaries)</li>
                <li className="pl-1"><strong>Management factor:</strong> +10-15% (control sub-optimality)</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Result:</strong> TM54 predictions are typically 1.5-3 times higher than Part L calculations,
              much closer to actual operational consumption.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: The Performance Gap */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Understanding and Addressing the Performance Gap
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The performance gap - where actual building energy consumption significantly exceeds design
              predictions - is a major industry challenge. Understanding its causes is essential for
              delivering buildings that meet energy targets in practice.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Causes of the Performance Gap</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-white/60 mb-2">Design Stage</p>
                  <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                    <li>Unrealistic occupancy assumptions</li>
                    <li>Optimistic control effectiveness</li>
                    <li>Excluded unregulated loads</li>
                    <li>Standard vs actual equipment data</li>
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-medium text-white/60 mb-2">Construction</p>
                  <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                    <li>Build quality variations</li>
                    <li>Thermal bridging worse than modelled</li>
                    <li>Air tightness failures</li>
                    <li>Services not as specified</li>
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-medium text-white/60 mb-2">Commissioning</p>
                  <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                    <li>Insufficient time allocation</li>
                    <li>Systems not optimised</li>
                    <li>Controls set incorrectly</li>
                    <li>Poor documentation</li>
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-medium text-white/60 mb-2">Operation</p>
                  <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                    <li>Extended operating hours</li>
                    <li>Poor control strategies</li>
                    <li>Lack of ongoing optimisation</li>
                    <li>Occupant behaviour</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Evidence from Carbonbuzz</p>
              <div className="p-3 rounded bg-black/30">
                <ul className="text-sm text-white space-y-1">
                  <li>Offices: Actual consumption typically 2.5× design predictions</li>
                  <li>Schools: Actual consumption typically 2× design predictions</li>
                  <li>Electricity gap often larger than heating gap</li>
                  <li>Gap has not significantly reduced over past decade</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Strategies to Reduce the Gap:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Design:</strong> Use TM54 methodology with realistic assumptions</li>
                <li className="pl-1"><strong>Specification:</strong> Require actual performance data, not notional</li>
                <li className="pl-1"><strong>Construction:</strong> Air tightness testing, thermal imaging</li>
                <li className="pl-1"><strong>Commissioning:</strong> Extended seasonal commissioning period</li>
                <li className="pl-1"><strong>Handover:</strong> Soft Landings with 3-year aftercare</li>
                <li className="pl-1"><strong>Operation:</strong> Sub-metering, continuous monitoring, BMS optimisation</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Industry trend:</strong> Increasingly, contracts include energy performance guarantees
              based on TM54 predictions, with financial penalties for non-compliance.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: DEC Rating Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A 5,000m² air-conditioned office consumes 750,000 kWh electricity
                and 600,000 kWh gas annually. Calculate the DEC rating.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Actual consumption per m²:</p>
                <p>Electricity: 750,000 / 5,000 = 150 kWh/m²</p>
                <p>Gas: 600,000 / 5,000 = 120 kWh/m²</p>
                <p className="mt-2">TM46 typical benchmarks (AC office):</p>
                <p>Electricity: 128 kWh/m², Fossil-thermal: 178 kWh/m²</p>
                <p className="mt-2">Carbon emissions (using factors):</p>
                <p>Actual: (150 × 0.233) + (120 × 0.184) = 57.0 kgCO₂/m²</p>
                <p>Typical: (128 × 0.233) + (178 × 0.184) = 62.6 kgCO₂/m²</p>
                <p className="mt-2">DEC Rating: (57.0 / 62.6) × 100 = <strong>91 (Band D)</strong></p>
                <p className="mt-2 text-green-400">Building performs slightly better than typical</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: TM54 Uplift</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A Part L calculation shows 80 kWh/m² regulated energy for an office.
                Estimate TM54 operational energy.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Part L regulated energy: 80 kWh/m²</p>
                <p className="mt-2">TM54 adjustments:</p>
                <p>Operating hours uplift (+30%): 80 × 1.3 = 104 kWh/m²</p>
                <p>Add unregulated (small power, servers): +45 kWh/m²</p>
                <p>Add lifts: +5 kWh/m²</p>
                <p>Add catering: +10 kWh/m²</p>
                <p>Management factor (+10%): (104 + 60) × 1.1 = 180 kWh/m²</p>
                <p className="mt-2">TM54 prediction: <strong>180 kWh/m²</strong></p>
                <p className="mt-2 text-white/60">→ 2.25× the Part L calculation</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Weather Normalisation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A building used 450 MWh heating energy in a year with 2,100 degree days.
                Long-term average is 2,400 degree days. What is the weather-normalised consumption?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Actual heating energy: 450 MWh</p>
                <p>Actual degree days: 2,100</p>
                <p>Average degree days: 2,400</p>
                <p className="mt-2">Degree day ratio: 2,100 / 2,400 = 0.875</p>
                <p>(Milder than average year)</p>
                <p className="mt-2">Weather-normalised consumption:</p>
                <p>450 MWh / 0.875 = <strong>514 MWh</strong></p>
                <p className="mt-2 text-white/60">→ In an average year, would have used 514 MWh</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Formulas</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>EUI:</strong> Energy Use Intensity = Total energy / Floor area (kWh/m²)</li>
                <li className="pl-1"><strong>DEC:</strong> Rating = (Actual/Typical benchmark) × 100</li>
                <li className="pl-1"><strong>Weather normalised:</strong> Actual × (Average DD / Actual DD)</li>
                <li className="pl-1"><strong>Carbon:</strong> kgCO₂ = kWh × emission factor</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Grid electricity: <strong>0.233 kgCO₂/kWh</strong> (2023 factor)</li>
                <li className="pl-1">Natural gas: <strong>0.184 kgCO₂/kWh</strong></li>
                <li className="pl-1">TM54 uplift: typically <strong>1.5-3× Part L</strong></li>
                <li className="pl-1">London degree days: <strong>~2,400/year</strong> (heating)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Wrong floor area:</strong> TM46 uses GIA, not NIA or GEA</li>
                <li className="pl-1"><strong>Mixing fuels:</strong> Don't add kWh directly without carbon weighting</li>
                <li className="pl-1"><strong>Ignoring baseload:</strong> 24/7 consumption often overlooked</li>
                <li className="pl-1"><strong>Outdated factors:</strong> Carbon factors change annually</li>
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
                <p className="font-medium text-white mb-1">Energy Analysis Tools</p>
                <ul className="space-y-0.5">
                  <li>TM46 - Benchmarks for DECs</li>
                  <li>TM54 - Operational energy prediction</li>
                  <li>Degree days - Weather normalisation</li>
                  <li>Carbonbuzz - Performance gap data</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Addressing Performance Gap</p>
                <ul className="space-y-0.5">
                  <li>Use TM54 methodology at design</li>
                  <li>Verify construction quality</li>
                  <li>Extended commissioning</li>
                  <li>Soft Landings aftercare</li>
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
            <Link to="../h-n-c-module2-section6-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module2-section6-3">
              Next: Building Simulation
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule2Section6_2;
