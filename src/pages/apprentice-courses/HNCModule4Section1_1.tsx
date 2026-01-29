import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Maximum Demand Calculations - HNC Module 4 Section 1.1";
const DESCRIPTION = "Master maximum demand assessment methods for building services: measured and calculated approaches, ESQCR requirements, load profiles, coincident demand, and peak measurement techniques.";

const quickCheckQuestions = [
  {
    id: "max-demand-def",
    question: "What is maximum demand in electrical installation design?",
    options: ["The total connected load", "The highest expected load at any time", "The average daily consumption", "The nameplate rating of all equipment"],
    correctIndex: 1,
    explanation: "Maximum demand is the highest expected electrical load that will occur at any instant. It accounts for diversity and is typically lower than the total connected load."
  },
  {
    id: "esqcr-requirement",
    question: "Under ESQCR, who must agree the maximum demand with the DNO?",
    options: ["The building owner", "The installing contractor", "The designer/specifier", "All of the above"],
    correctIndex: 2,
    explanation: "The designer or specifier is responsible for assessing maximum demand and agreeing the supply capacity with the Distribution Network Operator (DNO) under ESQCR."
  },
  {
    id: "coincident-demand",
    question: "Coincident demand refers to:",
    options: ["Loads that occur at the same time", "Loads that never operate together", "Emergency backup loads", "Standby generator capacity"],
    correctIndex: 0,
    explanation: "Coincident demand is the portion of loads that operate simultaneously. Understanding coincidence is essential for accurate maximum demand assessment."
  },
  {
    id: "measurement-period",
    question: "What integration period is typically used for maximum demand measurement?",
    options: ["1 minute", "15 minutes", "30 minutes", "1 hour"],
    correctIndex: 2,
    explanation: "DNOs typically measure maximum demand over 30-minute integration periods. This smooths out short transient peaks while capturing sustained high loads."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the relationship between total connected load and maximum demand?",
    options: [
      "They are always equal",
      "Maximum demand is always higher due to safety factors",
      "Maximum demand is typically lower due to diversity",
      "Maximum demand only includes lighting loads"
    ],
    correctAnswer: 2,
    explanation: "Maximum demand is typically 40-70% of total connected load because not all equipment operates simultaneously at full capacity. This is accounted for through diversity factors."
  },
  {
    id: 2,
    question: "Which method provides the most accurate maximum demand assessment?",
    options: ["Nameplate summation", "Calculated using diversity factors", "Measured data from similar buildings", "Building regulations tables"],
    correctAnswer: 2,
    explanation: "Measured data from similar buildings provides the most accurate assessment as it reflects actual usage patterns. Calculated methods are used when measured data is unavailable."
  },
  {
    id: 3,
    question: "A building has 500kVA total connected load. If diversity is estimated at 0.65, what is the maximum demand?",
    options: ["325kVA", "500kVA", "769kVA", "750kVA"],
    correctAnswer: 0,
    explanation: "Maximum demand = Total connected load × Diversity factor = 500kVA × 0.65 = 325kVA"
  },
  {
    id: 4,
    question: "Under ESQCR Regulation 25, the maximum demand assessment must:",
    options: [
      "Be completed after installation",
      "Be agreed with the DNO before connection",
      "Only consider lighting loads",
      "Ignore power factor"
    ],
    correctAnswer: 1,
    explanation: "ESQCR Regulation 25 requires that maximum demand be assessed and agreed with the DNO before connection to ensure adequate supply capacity."
  },
  {
    id: 5,
    question: "What is a load profile?",
    options: [
      "A list of all connected equipment",
      "A graph showing demand variation over time",
      "The cable size schedule",
      "The circuit breaker ratings"
    ],
    correctAnswer: 1,
    explanation: "A load profile is a graphical representation showing how electrical demand varies over time (hourly, daily, or seasonally), essential for understanding peak periods."
  },
  {
    id: 6,
    question: "Peak demand for an office building typically occurs:",
    options: ["At midnight", "Early morning (6-8am)", "Mid-morning to early afternoon", "Late evening"],
    correctAnswer: 2,
    explanation: "Office buildings typically experience peak demand mid-morning to early afternoon when lighting, IT equipment, and HVAC systems operate at maximum capacity with full occupancy."
  },
  {
    id: 7,
    question: "Why is the 30-minute integration period used for maximum demand?",
    options: [
      "It's easier to calculate",
      "It filters short transients while capturing sustained loads",
      "It's required by BS 7671",
      "It matches electricity billing periods"
    ],
    correctAnswer: 1,
    explanation: "The 30-minute integration period smooths out short-duration peaks (motor starting, lift operation) while capturing genuinely sustained high demands that stress the supply infrastructure."
  },
  {
    id: 8,
    question: "For a mixed-use development, how should maximum demand be assessed?",
    options: [
      "Sum all individual building demands",
      "Use the largest single building demand",
      "Apply inter-building diversity to summed demands",
      "Use a flat rate per square metre"
    ],
    correctAnswer: 2,
    explanation: "Mixed-use developments benefit from inter-building diversity - residential peaks occur at different times to commercial. Total demand is the sum with diversity factors applied."
  },
  {
    id: 9,
    question: "What information must be provided to the DNO when requesting a supply?",
    options: [
      "Maximum demand (kVA), power factor, and connection point",
      "Only the building floor area",
      "Number of socket outlets",
      "Cable manufacturer details"
    ],
    correctAnswer: 0,
    explanation: "DNO supply applications require maximum demand in kVA, expected power factor, single/three-phase requirement, and proposed connection point location."
  },
  {
    id: 10,
    question: "A commercial building measured maximum demand is 180kW at 0.85 power factor. What is the kVA demand?",
    options: ["153kVA", "180kVA", "212kVA", "270kVA"],
    correctAnswer: 2,
    explanation: "kVA = kW ÷ power factor = 180 ÷ 0.85 = 211.8kVA ≈ 212kVA. DNOs supply capacity is in kVA, not kW."
  }
];

const faqs = [
  {
    question: "What's the difference between connected load and maximum demand?",
    answer: "Connected load is the sum of all equipment nameplate ratings - if everything ran at full power simultaneously. Maximum demand is the actual peak load expected, which is always lower due to diversity (not all equipment operates at once or at full capacity). A building with 1000kVA connected load might have only 600kVA maximum demand."
  },
  {
    question: "How do I assess maximum demand for a new building with no historical data?",
    answer: "Use a combination of methods: (1) CIBSE Guide A benchmark data for similar building types, (2) BS 7671 Appendix 1 diversity factors, (3) detailed load analysis of major equipment, (4) measured data from comparable buildings. Always add appropriate allowance for future growth (typically 20-25%)."
  },
  {
    question: "Why does the DNO want maximum demand in kVA not kW?",
    answer: "DNO network capacity is limited by current (which determines cable/transformer heating), not real power. kVA represents apparent power which directly relates to current: I = kVA ÷ (√3 × kV). A load with poor power factor draws more current (higher kVA) for the same kW, stressing the network more."
  },
  {
    question: "What happens if actual demand exceeds the agreed maximum?",
    answer: "The DNO supply may become unreliable or protective devices may trip. Exceeding agreed maximum demand is a breach of the connection agreement and may incur penalty charges. In severe cases, the DNO can disconnect the supply. Regular monitoring and proactive capacity increases are essential."
  },
  {
    question: "How often should maximum demand be reviewed?",
    answer: "Review annually as part of building management, after any significant changes to equipment or occupancy, and when planning expansions. Many modern buildings have sub-metering that continuously logs demand, making trend analysis straightforward."
  },
  {
    question: "Can I reduce maximum demand without reducing services?",
    answer: "Yes, through load management strategies: stagger HVAC start times, use building automation to prevent simultaneous operation of non-critical loads, install thermal storage for cooling, and implement demand response programmes. Power factor correction also reduces kVA demand without affecting kW output."
  }
];

const HNCModule4Section1_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module4-section1">
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
            <span>Module 4.1.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Maximum Demand Calculations
          </h1>
          <p className="text-white/80">
            Assessment methods and techniques for determining peak electrical load requirements in building services
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Maximum demand:</strong> Highest expected load at any instant</li>
              <li className="pl-1"><strong>Assessment methods:</strong> Measured, calculated, or benchmarked</li>
              <li className="pl-1"><strong>ESQCR requirement:</strong> Must agree with DNO before connection</li>
              <li className="pl-1"><strong>Integration period:</strong> Typically 30 minutes</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Office buildings:</strong> 70-100 VA/m² typical</li>
              <li className="pl-1"><strong>Retail:</strong> 80-150 VA/m² typical</li>
              <li className="pl-1"><strong>Industrial:</strong> Highly variable by process</li>
              <li className="pl-1"><strong>Growth allowance:</strong> 20-25% recommended</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Define maximum demand and its importance in electrical design",
              "Apply measured, calculated, and benchmark assessment methods",
              "Understand ESQCR requirements for DNO notification",
              "Analyse load profiles and identify peak demand periods",
              "Calculate coincident demand for multiple load types",
              "Apply appropriate growth factors for future capacity"
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

        {/* Section 1: Maximum Demand Fundamentals */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Maximum Demand Fundamentals
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Maximum demand is the cornerstone of electrical installation design. It determines the supply
              capacity required from the Distribution Network Operator (DNO), transformer sizing, main switchgear
              ratings, and the overall infrastructure investment.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key definitions:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Connected load:</strong> Sum of all equipment nameplate ratings</li>
                <li className="pl-1"><strong>Maximum demand:</strong> Highest actual load expected at any time</li>
                <li className="pl-1"><strong>Average demand:</strong> Total energy ÷ time period</li>
                <li className="pl-1"><strong>Load factor:</strong> Average demand ÷ maximum demand</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Why Maximum Demand Matters</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Design Element</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Sized By</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Impact of Overestimate</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">DNO supply</td>
                      <td className="border border-white/10 px-3 py-2">Maximum demand (kVA)</td>
                      <td className="border border-white/10 px-3 py-2">Higher connection charges</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Transformer</td>
                      <td className="border border-white/10 px-3 py-2">Maximum demand + growth</td>
                      <td className="border border-white/10 px-3 py-2">Increased capital cost</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Main switchgear</td>
                      <td className="border border-white/10 px-3 py-2">Maximum demand current</td>
                      <td className="border border-white/10 px-3 py-2">Larger, more expensive equipment</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Main cables</td>
                      <td className="border border-white/10 px-3 py-2">Maximum demand current</td>
                      <td className="border border-white/10 px-3 py-2">Larger containment, higher material cost</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Standby generation</td>
                      <td className="border border-white/10 px-3 py-2">Essential load demand</td>
                      <td className="border border-white/10 px-3 py-2">Oversized plant, higher running costs</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design principle:</strong> Accurate maximum demand assessment balances adequate capacity against unnecessary infrastructure cost.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Assessment Methods */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Assessment Methods
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Three primary methods exist for assessing maximum demand, each with appropriate applications
              depending on available data and project stage.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">1. Measured Method</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Data from similar existing buildings</li>
                  <li className="pl-1">Half-hourly metering records</li>
                  <li className="pl-1">Most accurate when data available</li>
                  <li className="pl-1">Requires comparable building type</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">2. Calculated Method</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Sum connected loads</li>
                  <li className="pl-1">Apply diversity factors</li>
                  <li className="pl-1">BS 7671 Appendix 1 guidance</li>
                  <li className="pl-1">Suitable when loads known</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">3. Benchmark Method</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">CIBSE Guide A data</li>
                  <li className="pl-1">W/m² or VA/m² benchmarks</li>
                  <li className="pl-1">Quick initial estimates</li>
                  <li className="pl-1">Early design stages</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">CIBSE Benchmark Values</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Building Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical (VA/m²)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Good Practice</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Standard office</td>
                      <td className="border border-white/10 px-3 py-2">70-100</td>
                      <td className="border border-white/10 px-3 py-2">55-75</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Prestige office</td>
                      <td className="border border-white/10 px-3 py-2">90-130</td>
                      <td className="border border-white/10 px-3 py-2">75-95</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Retail (general)</td>
                      <td className="border border-white/10 px-3 py-2">80-120</td>
                      <td className="border border-white/10 px-3 py-2">60-90</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Supermarket</td>
                      <td className="border border-white/10 px-3 py-2">150-250</td>
                      <td className="border border-white/10 px-3 py-2">120-180</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Hospital</td>
                      <td className="border border-white/10 px-3 py-2">100-180</td>
                      <td className="border border-white/10 px-3 py-2">80-140</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">School</td>
                      <td className="border border-white/10 px-3 py-2">40-60</td>
                      <td className="border border-white/10 px-3 py-2">30-45</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Best practice:</strong> Use multiple methods and compare results. Significant discrepancies require investigation.
            </p>
          </div>
        </section>

        {/* Section 3: ESQCR Requirements */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            ESQCR Requirements and DNO Interface
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Electricity Safety, Quality and Continuity Regulations 2002 (ESQCR) place legal obligations
              on both consumers and distributors regarding maximum demand assessment and notification.
            </p>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">ESQCR Regulation 25 - Key Requirements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Consumers must provide maximum demand information to DNO</li>
                <li className="pl-1">Notification required before connection or significant increase</li>
                <li className="pl-1">DNO must be satisfied supply can meet demand safely</li>
                <li className="pl-1">Designer/specifier responsibility to assess and notify</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">DNO Application Process</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Stage 1:</strong> Submit application with maximum demand (kVA), power factor, connection details</li>
                <li className="pl-1"><strong>Stage 2:</strong> DNO issues budget quotation (typically within 10 working days)</li>
                <li className="pl-1"><strong>Stage 3:</strong> Accept quotation and pay connection charges</li>
                <li className="pl-1"><strong>Stage 4:</strong> DNO carries out reinforcement works if required</li>
                <li className="pl-1"><strong>Stage 5:</strong> Connection made and supply energised</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Information Required for DNO Application</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Information</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Format</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Maximum demand</td>
                      <td className="border border-white/10 px-3 py-2">kVA (not kW)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Power factor</td>
                      <td className="border border-white/10 px-3 py-2">Expected value (e.g., 0.9)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Supply type</td>
                      <td className="border border-white/10 px-3 py-2">Single-phase or three-phase</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Voltage required</td>
                      <td className="border border-white/10 px-3 py-2">LV (400V) or HV (11kV)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Connection point</td>
                      <td className="border border-white/10 px-3 py-2">Site plan with meter location</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Programme</td>
                      <td className="border border-white/10 px-3 py-2">Required energisation date</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Lead times:</strong> Standard LV connections typically 8-12 weeks; HV connections requiring reinforcement can be 6-18 months.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Load Profiles and Peak Measurement */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Load Profiles and Peak Measurement
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Understanding load profiles is essential for accurate maximum demand assessment and for
              identifying opportunities to reduce peak loads through load management strategies.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Daily Load Profiles</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Office Building</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>07:00 - HVAC pre-conditioning starts</li>
                    <li>08:00-09:00 - Rapid load increase</li>
                    <li>10:00-15:00 - Peak demand period</li>
                    <li>17:00-19:00 - Gradual load reduction</li>
                    <li>19:00+ - Base load only</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Retail Store</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>06:00 - Cleaning, restocking</li>
                    <li>09:00 - Full lighting, HVAC</li>
                    <li>12:00-14:00 - Lunchtime peak</li>
                    <li>16:00-18:00 - Evening shopping peak</li>
                    <li>21:00+ - Security lighting only</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Coincident vs Non-Coincident Demand</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Coincident demand:</strong> Loads that operate simultaneously and contribute to peak</li>
                <li className="pl-1"><strong>Non-coincident demand:</strong> Loads that rarely operate together (e.g., heating and cooling)</li>
                <li className="pl-1"><strong>Example:</strong> Electric heating has high winter demand but zero summer contribution</li>
                <li className="pl-1"><strong>Design implication:</strong> Only coincident loads determine maximum demand</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Maximum Demand Measurement</p>
              <p className="font-mono text-center text-lg mb-2">MD = Peak 30-minute kVAh × 2</p>
              <p className="text-xs text-white/70 text-center">Where MD is the maximum demand averaged over 30-minute period</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Integration Period Effects</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Period</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Captures</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Use</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">1 minute</td>
                      <td className="border border-white/10 px-3 py-2">Motor starting, lift operation</td>
                      <td className="border border-white/10 px-3 py-2">Protective device sizing</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">15 minutes</td>
                      <td className="border border-white/10 px-3 py-2">Short-term process peaks</td>
                      <td className="border border-white/10 px-3 py-2">Some billing tariffs</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">30 minutes</td>
                      <td className="border border-white/10 px-3 py-2">Sustained high loads</td>
                      <td className="border border-white/10 px-3 py-2">UK DNO standard</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">1 hour</td>
                      <td className="border border-white/10 px-3 py-2">Heavily averaged demand</td>
                      <td className="border border-white/10 px-3 py-2">Some international standards</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Monitoring tip:</strong> Modern smart meters and sub-meters record half-hourly data automatically. Request historical data when assessing existing buildings.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Benchmark Assessment</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Estimate maximum demand for a 5,000m² standard office building.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Using CIBSE benchmark: 80 VA/m² (mid-range)</p>
                <p className="mt-2">Maximum demand = Area × Benchmark</p>
                <p>MD = 5,000m² × 80 VA/m² = <strong>400,000 VA = 400 kVA</strong></p>
                <p className="mt-2">Add 20% growth allowance:</p>
                <p>Design MD = 400 × 1.2 = <strong>480 kVA</strong></p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Calculated Method</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Calculate maximum demand from connected loads: Lighting 80kW, Small power 120kW, HVAC 200kW, Lifts 60kW (2 × 30kW).
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Apply diversity factors:</p>
                <p>Lighting: 80kW × 0.9 = 72kW</p>
                <p>Small power: 120kW × 0.4 = 48kW</p>
                <p>HVAC: 200kW × 1.0 = 200kW (constant when running)</p>
                <p>Lifts: 60kW × 0.6 = 36kW (only 1 at peak typically)</p>
                <p className="mt-2">Total diversified = 72 + 48 + 200 + 36 = <strong>356kW</strong></p>
                <p className="mt-2">At 0.9 power factor: 356 ÷ 0.9 = <strong>396 kVA</strong></p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: kW to kVA Conversion</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A building has measured maximum demand of 250kW. Power factor is 0.85. What capacity should be requested from DNO?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>kVA = kW ÷ power factor</p>
                <p>kVA = 250 ÷ 0.85 = <strong>294 kVA</strong></p>
                <p className="mt-2 text-white/60">DNO would typically offer standard sizes: 315 kVA or 500 kVA supply</p>
                <p className="mt-2 text-green-400">→ Request 315 kVA allowing some growth margin</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Assessment Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Identify all connected loads and their ratings</li>
                <li className="pl-1">Determine operational patterns (hours of use, seasonal variation)</li>
                <li className="pl-1">Apply appropriate diversity factors</li>
                <li className="pl-1">Consider coincident and non-coincident loads</li>
                <li className="pl-1">Add growth allowance (typically 20-25%)</li>
                <li className="pl-1">Convert to kVA using expected power factor</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Standard office: <strong>70-100 VA/m²</strong></li>
                <li className="pl-1">Integration period: <strong>30 minutes</strong> (UK standard)</li>
                <li className="pl-1">Growth allowance: <strong>20-25%</strong></li>
                <li className="pl-1">Typical building diversity: <strong>0.6-0.8</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Confusing kW and kVA</strong> — DNO supplies rated in kVA</li>
                <li className="pl-1"><strong>Ignoring diversity</strong> — Overestimates demand significantly</li>
                <li className="pl-1"><strong>No growth allowance</strong> — Building outgrows supply quickly</li>
                <li className="pl-1"><strong>Late DNO application</strong> — Reinforcement can take 6+ months</li>
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
                <p className="font-medium text-white mb-1">Assessment Methods</p>
                <ul className="space-y-0.5">
                  <li>Measured - Historical data from similar buildings</li>
                  <li>Calculated - Connected load × diversity</li>
                  <li>Benchmark - CIBSE VA/m² values</li>
                  <li>Always add 20-25% growth factor</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">ESQCR/DNO Interface</p>
                <ul className="space-y-0.5">
                  <li>Notify DNO before connection</li>
                  <li>Provide kVA, power factor, voltage</li>
                  <li>Allow lead time for reinforcement</li>
                  <li>30-minute integration period</li>
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
            <Link to="../h-n-c-module4-section1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module4-section1-2">
              Next: Diversity Factors
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule4Section1_1;
