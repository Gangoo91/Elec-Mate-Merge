import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Efficiency Calculations for Equipment and Systems - HNC Module 3 Section 6.2";
const DESCRIPTION = "Master efficiency calculations for building services equipment: motor efficiency classes IE1-IE5, transformer efficiency, part-load considerations, life cycle costing and energy auditing techniques.";

const quickCheckQuestions = [
  {
    id: "efficiency-formula",
    question: "What is the basic efficiency formula?",
    options: ["η = Pin/Pout × 100%", "η = Pout/Pin × 100%", "η = Pin × Pout", "η = Pout - Pin"],
    correctIndex: 1,
    explanation: "Efficiency (η) equals output power divided by input power, multiplied by 100% to express as a percentage: η = Pout/Pin × 100%. This always gives a value less than 100% due to losses."
  },
  {
    id: "ie-class",
    question: "Which motor efficiency class represents the highest efficiency level?",
    options: ["IE1 Standard", "IE2 High", "IE3 Premium", "IE5 Ultra Premium"],
    correctIndex: 3,
    explanation: "IE5 Ultra Premium represents the highest motor efficiency class, approximately 20% lower losses than IE4. The scale runs from IE1 (Standard) to IE5 (Ultra Premium)."
  },
  {
    id: "all-day-efficiency",
    question: "All-day efficiency for transformers is calculated using:",
    options: ["Peak load only", "Average hourly load", "Energy output ÷ Energy input over 24 hours", "Maximum efficiency point"],
    correctIndex: 2,
    explanation: "All-day efficiency considers the total energy delivered over 24 hours divided by total energy consumed. This accounts for varying load profiles throughout the day."
  },
  {
    id: "payback-period",
    question: "If an efficient motor costs GBP 2,400 more but saves GBP 800/year in energy, what is the simple payback period?",
    options: ["1 year", "2 years", "3 years", "4 years"],
    correctIndex: 2,
    explanation: "Simple payback period = Extra cost ÷ Annual savings = GBP 2,400 ÷ GBP 800/year = 3 years. This is a basic economic measure for equipment selection decisions."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "A motor draws 15kW from the supply and delivers 12.75kW at the shaft. What is its efficiency?",
    options: ["82%", "85%", "88%", "90%"],
    correctAnswer: 1,
    explanation: "Efficiency η = Pout/Pin × 100% = 12.75/15 × 100% = 85%"
  },
  {
    id: 2,
    question: "Under EU Ecodesign regulations (2021), what is the minimum efficiency class for most new three-phase motors 0.75-1000kW?",
    options: ["IE1 Standard", "IE2 High", "IE3 Premium", "IE4 Super Premium"],
    correctAnswer: 2,
    explanation: "Since July 2021, new three-phase motors 0.75-1000kW must meet IE3 minimum. Motors 75-200kW must meet IE4 since July 2023."
  },
  {
    id: 3,
    question: "A transformer has 500W iron losses and 1500W copper losses at full load. At what fraction of full load does maximum efficiency occur?",
    options: ["0.33", "0.50", "0.58", "0.75"],
    correctAnswer: 2,
    explanation: "Maximum efficiency occurs when iron losses = copper losses. Since copper losses vary with load squared: x² × 1500 = 500, so x = √(500/1500) = √0.333 = 0.577 ≈ 0.58"
  },
  {
    id: 4,
    question: "Why does motor efficiency typically decrease at part-load operation?",
    options: [
      "Copper losses increase",
      "Iron losses increase",
      "Fixed losses become a larger proportion of reduced output",
      "Cooling becomes less effective"
    ],
    correctAnswer: 2,
    explanation: "Fixed losses (iron losses, friction, windage) remain constant regardless of load. At reduced load, these fixed losses represent a larger percentage of the smaller output power."
  },
  {
    id: 5,
    question: "What percentage of a motor's life cycle cost is typically energy consumption?",
    options: ["25-35%", "45-55%", "65-75%", "90-97%"],
    correctAnswer: 3,
    explanation: "Energy costs typically represent 90-97% of a motor's total life cycle cost. Initial purchase is only 2-5%, making efficiency a crucial selection criterion."
  },
  {
    id: 6,
    question: "A building has three systems with efficiencies of 95%, 90%, and 85%. What is the overall system efficiency?",
    options: ["72.7%", "90%", "85%", "270%"],
    correctAnswer: 0,
    explanation: "For systems in series, overall efficiency = η1 × η2 × η3 = 0.95 × 0.90 × 0.85 = 0.727 = 72.7%. Efficiencies multiply, they don't add."
  },
  {
    id: 7,
    question: "When conducting an energy audit, what is the typical first step?",
    options: [
      "Install sub-metering on all circuits",
      "Collect utility bills and establish baseline consumption",
      "Recommend equipment replacements",
      "Conduct thermal imaging surveys"
    ],
    correctAnswer: 1,
    explanation: "The first step is establishing baseline energy consumption from utility bills (12+ months ideally). This provides the reference against which improvements are measured."
  },
  {
    id: 8,
    question: "A 100kVA transformer operates at 80% of full load with 0.85 power factor. Iron losses are 800W and full-load copper losses are 1800W. What is the efficiency?",
    options: ["96.2%", "97.1%", "97.8%", "98.3%"],
    correctAnswer: 1,
    explanation: "Output power = 100 × 0.8 × 0.85 = 68kW. Copper losses at 0.8 load = 1800 × 0.8² = 1152W. Total losses = 800 + 1152 = 1952W. Input = 68000 + 1952 = 69952W. η = 68000/69952 × 100 = 97.2%"
  },
  {
    id: 9,
    question: "What is the Net Present Value (NPV) criterion for a worthwhile investment?",
    options: ["NPV = 0", "NPV < 0", "NPV > 0", "NPV = initial cost"],
    correctAnswer: 2,
    explanation: "A positive NPV indicates the investment generates returns exceeding the discount rate. NPV > 0 means the project adds value and should be considered worthwhile."
  },
  {
    id: 10,
    question: "HVAC systems in commercial buildings typically consume what percentage of total electrical energy?",
    options: ["20-30%", "40-50%", "60-70%", "80-90%"],
    correctAnswer: 1,
    explanation: "HVAC systems typically consume 40-50% of commercial building electrical energy. This makes them primary targets for efficiency improvements and energy audits."
  }
];

const faqs = [
  {
    question: "Why are motor efficiency classes important in building services?",
    answer: "Motors consume approximately 45% of all electrical energy in the EU. In building services (pumps, fans, compressors), motors often run continuously. Even a 2-3% efficiency improvement translates to significant lifetime savings. EU regulations now mandate IE3/IE4 for new installations, making class selection a compliance and economic issue."
  },
  {
    question: "What is the difference between efficiency and coefficient of performance (COP)?",
    answer: "Efficiency compares output to input of the same energy type (electrical out/electrical in). COP is used for heat pumps where the output (heating or cooling) is thermal energy but input is electrical. COP can exceed 1.0 (often 3-5) because heat pumps move heat rather than generate it. A COP of 4 means 4kW heat delivered per 1kW electrical input."
  },
  {
    question: "How do I calculate energy savings from upgrading to a higher efficiency motor?",
    answer: "Annual savings = Power × Hours × (1/η_old - 1/η_new) × electricity cost. For example, upgrading a 15kW motor from 89% to 93% efficiency running 6000 hours/year at 15p/kWh: Savings = 15 × 6000 × (1/0.89 - 1/0.93) × 0.15 = GBP 645/year."
  },
  {
    question: "What factors should I consider when selecting equipment based on efficiency?",
    answer: "Consider: 1) Actual operating load profile (not just full-load efficiency), 2) Running hours per year, 3) Electricity tariff and projected increases, 4) Capital cost premium, 5) Simple payback period and NPV, 6) Regulatory requirements (minimum IE class), 7) Building certification needs (BREEAM, etc.), 8) Maintenance costs and reliability."
  },
  {
    question: "Why does transformer efficiency matter for all-day efficiency calculations?",
    answer: "Transformers often serve loads that vary significantly throughout the day (offices, retail). Maximum efficiency occurs at a specific load point (where iron losses equal copper losses). A transformer sized for peak load may operate inefficiently during off-peak periods. All-day efficiency captures this reality better than rated efficiency."
  },
  {
    question: "What are the main components of an energy audit?",
    answer: "A comprehensive energy audit includes: 1) Baseline establishment from utility data, 2) Site survey and equipment inventory, 3) Load profiling and sub-metering analysis, 4) Identification of energy conservation measures (ECMs), 5) Cost-benefit analysis of each measure, 6) Prioritised action plan with payback periods, 7) Implementation recommendations, 8) Monitoring and verification procedures."
  }
];

const HNCModule3Section6_2 = () => {
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
            <span>Module 3.6.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Efficiency Calculations for Equipment and Systems
          </h1>
          <p className="text-white/80">
            Quantifying equipment performance and making economically sound decisions for building services
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Basic formula:</strong> η = Pout/Pin × 100%</li>
              <li className="pl-1"><strong>Motor classes:</strong> IE1 to IE5 (Standard to Ultra Premium)</li>
              <li className="pl-1"><strong>System efficiency:</strong> Individual efficiencies multiply</li>
              <li className="pl-1"><strong>Life cycle costs:</strong> Energy is 90-97% of motor costs</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>HVAC motors:</strong> Fans, pumps, compressors</li>
              <li className="pl-1"><strong>Transformers:</strong> Distribution efficiency matters</li>
              <li className="pl-1"><strong>Part-load:</strong> Real-world operation rarely at full load</li>
              <li className="pl-1"><strong>Energy audits:</strong> Identify improvement opportunities</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You Will Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Apply the efficiency formula to motors, transformers and systems",
              "Understand motor efficiency classes IE1-IE5 and EU regulations",
              "Calculate transformer efficiency and all-day efficiency",
              "Analyse part-load efficiency and its impact on running costs",
              "Determine system efficiency for cascaded equipment",
              "Perform life cycle cost analysis for equipment selection",
              "Conduct energy audits using established methodologies",
              "Calculate payback periods and NPV for efficiency investments"
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

        {/* Section 1: Basic Efficiency Concepts */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Fundamental Efficiency Concepts
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Efficiency is the ratio of useful output to total input, expressed as a percentage. No real
              machine can be 100% efficient due to unavoidable losses such as friction, heat dissipation,
              and electrical resistance.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Efficiency Equation</p>
              <p className="font-mono text-center text-lg mb-2">η = P<sub>out</sub> / P<sub>in</sub> × 100%</p>
              <p className="text-xs text-white/70 text-center">Where η (eta) = efficiency, Pout = useful output power, Pin = total input power</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Alternative expressions:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>η = (Pin - Losses) / Pin × 100%</strong> — when losses are known</li>
                <li className="pl-1"><strong>η = Pout / (Pout + Losses) × 100%</strong> — when output and losses are known</li>
                <li className="pl-1"><strong>Losses = Pin × (1 - η)</strong> — calculating power dissipated</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Types of Losses in Electrical Equipment</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Loss Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Cause</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Variation with Load</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Copper losses (I²R)</td>
                      <td className="border border-white/10 px-3 py-2">Winding resistance</td>
                      <td className="border border-white/10 px-3 py-2">Varies with load squared</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Iron losses (core)</td>
                      <td className="border border-white/10 px-3 py-2">Hysteresis and eddy currents</td>
                      <td className="border border-white/10 px-3 py-2">Approximately constant</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Friction and windage</td>
                      <td className="border border-white/10 px-3 py-2">Bearings, air resistance</td>
                      <td className="border border-white/10 px-3 py-2">Approximately constant</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Stray load losses</td>
                      <td className="border border-white/10 px-3 py-2">Leakage flux, harmonics</td>
                      <td className="border border-white/10 px-3 py-2">Varies with load</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key insight:</strong> Fixed losses (iron, friction, windage) remain constant regardless of load. This is why efficiency drops significantly at light loads.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Motor Efficiency Classes */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Motor Efficiency Classes (IE1-IE5)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The International Electrotechnical Commission (IEC) defines motor efficiency classes under
              IEC 60034-30-1. These are legally mandated minimum requirements under EU Ecodesign regulations.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Motor Efficiency Classes</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Class</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Name</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical η (11kW, 4-pole)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-semibold">IE1</td>
                      <td className="border border-white/10 px-3 py-2">Standard</td>
                      <td className="border border-white/10 px-3 py-2">88.4%</td>
                      <td className="border border-white/10 px-3 py-2">No longer permitted for new installations</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-semibold">IE2</td>
                      <td className="border border-white/10 px-3 py-2">High</td>
                      <td className="border border-white/10 px-3 py-2">89.8%</td>
                      <td className="border border-white/10 px-3 py-2">Previous minimum standard</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-semibold text-elec-yellow">IE3</td>
                      <td className="border border-white/10 px-3 py-2">Premium</td>
                      <td className="border border-white/10 px-3 py-2">91.4%</td>
                      <td className="border border-white/10 px-3 py-2">Current minimum (0.75-1000kW)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-semibold text-green-400">IE4</td>
                      <td className="border border-white/10 px-3 py-2">Super Premium</td>
                      <td className="border border-white/10 px-3 py-2">92.6%</td>
                      <td className="border border-white/10 px-3 py-2">Required for 75-200kW (Jul 2023)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-semibold text-blue-400">IE5</td>
                      <td className="border border-white/10 px-3 py-2">Ultra Premium</td>
                      <td className="border border-white/10 px-3 py-2">~94%</td>
                      <td className="border border-white/10 px-3 py-2">~20% lower losses than IE4</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">EU Ecodesign Requirements (2021+)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Three-phase motors 0.75-1000kW: minimum <strong>IE3</strong></li>
                  <li className="pl-1">Motors 75-200kW (Jul 2023): minimum <strong>IE4</strong></li>
                  <li className="pl-1">Single-phase motors 0.12kW+: included from Jul 2023</li>
                  <li className="pl-1">VSD-fed motors also covered</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Exemptions</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Motors for hazardous atmospheres (ATEX)</li>
                  <li className="pl-1">Brake motors (until further notice)</li>
                  <li className="pl-1">Motors immersed in liquids</li>
                  <li className="pl-1">Motors at altitudes above 4000m</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Efficiency Improvement Example</p>
              <p className="text-sm text-white mb-2">
                An 11kW motor runs 6000 hours/year. Upgrading from IE2 (89.8%) to IE4 (92.6%):
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>IE2 input power = 11 / 0.898 = 12.25 kW</p>
                <p>IE4 input power = 11 / 0.926 = 11.88 kW</p>
                <p>Power saving = 12.25 - 11.88 = 0.37 kW</p>
                <p className="mt-2">Annual energy saving = 0.37 × 6000 = <strong>2,220 kWh</strong></p>
                <p>At 15p/kWh = <strong>GBP 333/year</strong></p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Efficiency improvements compound over the motor's 15-20 year lifespan. Small percentage gains translate to thousands of pounds in savings.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Transformer Efficiency */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Transformer Efficiency and All-Day Efficiency
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Transformers in building services typically operate at high efficiency (95-99%), but their
              continuous operation means even small losses represent significant energy consumption. Understanding
              all-day efficiency is crucial for proper sizing.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Transformer Efficiency Formula</p>
              <p className="font-mono text-center text-lg mb-2">η = (V<sub>2</sub>I<sub>2</sub>cosφ) / (V<sub>2</sub>I<sub>2</sub>cosφ + P<sub>i</sub> + P<sub>c</sub>) × 100%</p>
              <p className="text-xs text-white/70 text-center">Where Pi = iron losses (constant), Pc = copper losses at actual load</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key transformer loss characteristics:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Iron losses (Pi):</strong> Constant whenever transformer is energised (no-load losses)</li>
                <li className="pl-1"><strong>Copper losses (Pc):</strong> Vary with load squared: Pc = Pc(FL) × (I/IFL)²</li>
                <li className="pl-1"><strong>Maximum efficiency:</strong> Occurs when Pi = Pc (iron losses = copper losses)</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Maximum Efficiency Load Point</p>
              <p className="font-mono text-center text-lg mb-2">x = √(P<sub>i</sub> / P<sub>c(FL)</sub>)</p>
              <p className="text-xs text-white/70 text-center">Where x = fraction of full load at maximum efficiency</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">All-Day Efficiency (Energy Efficiency)</p>
              <p className="text-sm text-white mb-3">
                All-day efficiency accounts for the varying load profile over a 24-hour period, providing
                a more realistic measure for transformers that serve variable loads.
              </p>
              <div className="p-3 rounded bg-white/5">
                <p className="font-mono text-center mb-2">η<sub>all-day</sub> = (Energy output over 24h) / (Energy input over 24h) × 100%</p>
                <p className="text-xs text-white/70 text-center">Or: η = ΣW<sub>out</sub> / (ΣW<sub>out</sub> + 24×P<sub>i</sub> + ΣP<sub>c</sub>×t)</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Building Load Profile (Office)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Period</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Hours</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Load</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Uses</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">00:00-07:00</td>
                      <td className="border border-white/10 px-3 py-2">7h</td>
                      <td className="border border-white/10 px-3 py-2">10-20%</td>
                      <td className="border border-white/10 px-3 py-2">Security, emergency lighting, IT cooling</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">07:00-09:00</td>
                      <td className="border border-white/10 px-3 py-2">2h</td>
                      <td className="border border-white/10 px-3 py-2">50-70%</td>
                      <td className="border border-white/10 px-3 py-2">Building warm-up, early arrivals</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">09:00-17:00</td>
                      <td className="border border-white/10 px-3 py-2">8h</td>
                      <td className="border border-white/10 px-3 py-2">80-100%</td>
                      <td className="border border-white/10 px-3 py-2">Full occupation, peak HVAC</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">17:00-20:00</td>
                      <td className="border border-white/10 px-3 py-2">3h</td>
                      <td className="border border-white/10 px-3 py-2">40-60%</td>
                      <td className="border border-white/10 px-3 py-2">Reduced occupation, cleaning</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">20:00-00:00</td>
                      <td className="border border-white/10 px-3 py-2">4h</td>
                      <td className="border border-white/10 px-3 py-2">15-25%</td>
                      <td className="border border-white/10 px-3 py-2">Security, minimal HVAC</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Sizing tip:</strong> Design transformers for maximum efficiency at the most common operating load, not necessarily at full rated capacity.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Part-Load Efficiency */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Part-Load Efficiency Considerations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Most building services equipment operates at part-load for the majority of its running time.
              Understanding how efficiency varies with load is essential for accurate energy calculations and
              proper equipment selection.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Why Part-Load Efficiency Matters</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">HVAC systems sized for peak loads that occur 1-2% of the time</li>
                <li className="pl-1">Motors driving variable loads (fans, pumps) spend most time at 50-75% load</li>
                <li className="pl-1">Fixed losses become proportionally larger as output decreases</li>
                <li className="pl-1">Oversized equipment operates inefficiently at typical loads</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Motor Efficiency vs Load</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Load %</th>
                      <th className="border border-white/10 px-3 py-2 text-left">IE3 11kW Motor</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Loss Increase</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">100%</td>
                      <td className="border border-white/10 px-3 py-2">91.4%</td>
                      <td className="border border-white/10 px-3 py-2">Baseline</td>
                      <td className="border border-white/10 px-3 py-2">Rated efficiency</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">75%</td>
                      <td className="border border-white/10 px-3 py-2">91.8%</td>
                      <td className="border border-white/10 px-3 py-2">-4%</td>
                      <td className="border border-white/10 px-3 py-2">Often peak efficiency point</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">50%</td>
                      <td className="border border-white/10 px-3 py-2">90.2%</td>
                      <td className="border border-white/10 px-3 py-2">+14%</td>
                      <td className="border border-white/10 px-3 py-2">Still acceptable</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">25%</td>
                      <td className="border border-white/10 px-3 py-2">84.5%</td>
                      <td className="border border-white/10 px-3 py-2">+80%</td>
                      <td className="border border-white/10 px-3 py-2">Significant efficiency drop</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">10%</td>
                      <td className="border border-white/10 px-3 py-2">~70%</td>
                      <td className="border border-white/10 px-3 py-2">+250%</td>
                      <td className="border border-white/10 px-3 py-2">Very poor - consider resizing</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Solutions for Part-Load Efficiency</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Variable speed drives:</strong> Match motor speed to load</li>
                  <li className="pl-1"><strong>Right-sizing:</strong> Select equipment for typical, not peak load</li>
                  <li className="pl-1"><strong>Multiple units:</strong> Stage smaller units to match load</li>
                  <li className="pl-1"><strong>High-efficiency motors:</strong> Flatter efficiency curves</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">VSD Energy Savings (Fan/Pump)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Power varies with speed cubed (affinity laws)</li>
                  <li className="pl-1">50% speed = 12.5% power consumption</li>
                  <li className="pl-1">Typical savings: 30-50% on variable loads</li>
                  <li className="pl-1">Payback often under 2 years</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Affinity Laws for Fans and Pumps</p>
              <div className="grid grid-cols-3 gap-3 text-center text-sm">
                <div className="p-3 rounded bg-black/30">
                  <p className="font-bold text-elec-yellow mb-1">Q ∝ N</p>
                  <p className="text-white/70 text-xs">Flow proportional to speed</p>
                </div>
                <div className="p-3 rounded bg-black/30">
                  <p className="font-bold text-elec-yellow mb-1">H ∝ N²</p>
                  <p className="text-white/70 text-xs">Head proportional to speed squared</p>
                </div>
                <div className="p-3 rounded bg-black/30">
                  <p className="font-bold text-elec-yellow mb-1">P ∝ N³</p>
                  <p className="text-white/70 text-xs">Power proportional to speed cubed</p>
                </div>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design principle:</strong> Always consider the operating load profile, not just the nameplate rating. A motor that spends 90% of its time at 40% load may be the wrong choice.
            </p>
          </div>
        </section>

        {/* Section 5: System Efficiency */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            System Efficiency Calculations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Building services systems comprise multiple components in series. The overall system efficiency
              is the product of individual component efficiencies, not the sum. This cascade effect means
              even small improvements in individual components can significantly impact overall system performance.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">System Efficiency Formula</p>
              <p className="font-mono text-center text-lg mb-2">η<sub>system</sub> = η<sub>1</sub> × η<sub>2</sub> × η<sub>3</sub> × ... × η<sub>n</sub></p>
              <p className="text-xs text-white/70 text-center">Individual efficiencies multiply - they do not add</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Example: Chilled Water System</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Component</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical η</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Cumulative η</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Transformer</td>
                      <td className="border border-white/10 px-3 py-2">97%</td>
                      <td className="border border-white/10 px-3 py-2">97.0%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Variable speed drive</td>
                      <td className="border border-white/10 px-3 py-2">97%</td>
                      <td className="border border-white/10 px-3 py-2">94.1%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Motor (IE3)</td>
                      <td className="border border-white/10 px-3 py-2">93%</td>
                      <td className="border border-white/10 px-3 py-2">87.5%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Belt drive</td>
                      <td className="border border-white/10 px-3 py-2">95%</td>
                      <td className="border border-white/10 px-3 py-2">83.1%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Pump</td>
                      <td className="border border-white/10 px-3 py-2">80%</td>
                      <td className="border border-white/10 px-3 py-2 font-bold text-elec-yellow">66.5%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-white/70 mt-2">
                Overall system efficiency: 0.97 × 0.97 × 0.93 × 0.95 × 0.80 = 66.5% - nearly one-third of input energy is lost.
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Impact of Improving Individual Components</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Improvement</th>
                      <th className="border border-white/10 px-3 py-2 text-left">New η</th>
                      <th className="border border-white/10 px-3 py-2 text-left">System η</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Improvement</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Baseline</td>
                      <td className="border border-white/10 px-3 py-2">-</td>
                      <td className="border border-white/10 px-3 py-2">66.5%</td>
                      <td className="border border-white/10 px-3 py-2">-</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">IE4 motor (96%)</td>
                      <td className="border border-white/10 px-3 py-2">96%</td>
                      <td className="border border-white/10 px-3 py-2">68.7%</td>
                      <td className="border border-white/10 px-3 py-2">+3.3%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Direct drive (no belt)</td>
                      <td className="border border-white/10 px-3 py-2">100%</td>
                      <td className="border border-white/10 px-3 py-2">70.0%</td>
                      <td className="border border-white/10 px-3 py-2">+5.3%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Better pump (85%)</td>
                      <td className="border border-white/10 px-3 py-2">85%</td>
                      <td className="border border-white/10 px-3 py-2">70.6%</td>
                      <td className="border border-white/10 px-3 py-2">+6.2%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-semibold">All improvements</td>
                      <td className="border border-white/10 px-3 py-2">-</td>
                      <td className="border border-white/10 px-3 py-2 font-bold text-green-400">76.7%</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">+15.3%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key insight:</strong> Target improvements at the least efficient components first - a 5% improvement in an 80% efficient pump saves more energy than a 5% improvement in a 97% efficient transformer.
            </p>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Section 6: Life Cycle Cost Analysis */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Life Cycle Cost Analysis
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Life cycle cost (LCC) analysis considers all costs from acquisition through operation and disposal.
              For electrical equipment, energy costs typically dominate, making efficiency a crucial economic factor.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Life Cycle Cost Formula</p>
              <p className="font-mono text-center text-lg mb-2">LCC = C<sub>ic</sub> + C<sub>in</sub> + C<sub>e</sub> + C<sub>o</sub> + C<sub>m</sub> + C<sub>s</sub> + C<sub>env</sub> - C<sub>d</sub></p>
              <div className="text-xs text-white/70 mt-2 grid grid-cols-2 gap-1">
                <span>Cic = Initial cost</span>
                <span>Cin = Installation cost</span>
                <span>Ce = Energy cost</span>
                <span>Co = Operating cost</span>
                <span>Cm = Maintenance cost</span>
                <span>Cs = Downtime cost</span>
                <span>Cenv = Environmental cost</span>
                <span>Cd = Disposal/residual value</span>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Motor Life Cycle Cost Breakdown</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Cost Component</th>
                      <th className="border border-white/10 px-3 py-2 text-left">% of LCC</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-semibold text-elec-yellow">Energy consumption</td>
                      <td className="border border-white/10 px-3 py-2 font-bold">90-97%</td>
                      <td className="border border-white/10 px-3 py-2">Dominates total cost</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Purchase price</td>
                      <td className="border border-white/10 px-3 py-2">2-5%</td>
                      <td className="border border-white/10 px-3 py-2">One-time cost</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Installation</td>
                      <td className="border border-white/10 px-3 py-2">0.5-2%</td>
                      <td className="border border-white/10 px-3 py-2">Often included in purchase</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Maintenance</td>
                      <td className="border border-white/10 px-3 py-2">1-3%</td>
                      <td className="border border-white/10 px-3 py-2">Bearings, lubrication</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Simple Payback Period</p>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-mono text-center mb-2">Payback = ΔCost / Annual Savings</p>
                  <p className="text-xs text-white/70 text-center">Years to recover extra investment</p>
                </div>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 mt-2">
                  <li className="pl-1">Easy to calculate and understand</li>
                  <li className="pl-1">Does not consider time value of money</li>
                  <li className="pl-1">Typical target: 2-5 years for motors</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Net Present Value (NPV)</p>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-mono text-center mb-2">NPV = Σ (C<sub>t</sub> / (1+r)<sup>t</sup>) - C<sub>0</sub></p>
                  <p className="text-xs text-white/70 text-center">Discounted cash flow over equipment life</p>
                </div>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 mt-2">
                  <li className="pl-1">Accounts for time value of money</li>
                  <li className="pl-1">NPV &gt; 0 indicates worthwhile investment</li>
                  <li className="pl-1">Use discount rate (r) typically 5-10%</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">LCC Example: Motor Selection</h3>
              <p className="text-sm text-white mb-2">
                15kW motor, 6000 hours/year, 15 year life, electricity at 15p/kWh:
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="font-bold">Standard motor (IE2, 89.8%):</p>
                <p>Purchase: GBP 850</p>
                <p>Annual energy: 15 ÷ 0.898 × 6000 × 0.15 = <strong>GBP 15,034</strong></p>
                <p>15-year energy: GBP 225,501</p>
                <p className="text-white/60">LCC ≈ GBP 226,350</p>
                <p className="mt-3 font-bold">Premium motor (IE4, 92.6%):</p>
                <p>Purchase: GBP 1,250 (+GBP 400)</p>
                <p>Annual energy: 15 ÷ 0.926 × 6000 × 0.15 = <strong>GBP 14,579</strong></p>
                <p>15-year energy: GBP 218,685</p>
                <p className="text-white/60">LCC ≈ GBP 219,935</p>
                <p className="mt-3 text-green-400 font-bold">Savings: GBP 6,415 over 15 years</p>
                <p className="text-green-400">Simple payback: GBP 400 ÷ GBP 455/year = 0.88 years</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Decision rule:</strong> When energy costs dominate LCC, always choose the highest efficiency option that meets technical requirements - the payback is almost always favourable.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 7: Energy Auditing Techniques */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            Energy Auditing Techniques
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Energy audits systematically assess energy use within a building to identify opportunities for
              improvement. They range from simple walk-through surveys to detailed instrumented analyses.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Types of Energy Audits (CIBSE TM22)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Level</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Scope</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Duration</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Output</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-semibold">Level 1</td>
                      <td className="border border-white/10 px-3 py-2">Walk-through survey</td>
                      <td className="border border-white/10 px-3 py-2">1-2 days</td>
                      <td className="border border-white/10 px-3 py-2">Quick wins identification</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-semibold">Level 2</td>
                      <td className="border border-white/10 px-3 py-2">Standard audit</td>
                      <td className="border border-white/10 px-3 py-2">1-2 weeks</td>
                      <td className="border border-white/10 px-3 py-2">Energy balance, ECM costings</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-semibold">Level 3</td>
                      <td className="border border-white/10 px-3 py-2">Investment-grade audit</td>
                      <td className="border border-white/10 px-3 py-2">Several weeks</td>
                      <td className="border border-white/10 px-3 py-2">Detailed analysis, bankable savings</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Energy Audit Process</p>
              <div className="space-y-3">
                <div className="p-3 rounded bg-white/5 flex gap-3">
                  <span className="text-elec-yellow font-bold">1</span>
                  <div>
                    <p className="font-medium">Baseline Establishment</p>
                    <p className="text-white/70 text-sm">Collect 12+ months utility bills, establish kWh/m²/year benchmark</p>
                  </div>
                </div>
                <div className="p-3 rounded bg-white/5 flex gap-3">
                  <span className="text-elec-yellow font-bold">2</span>
                  <div>
                    <p className="font-medium">Site Survey</p>
                    <p className="text-white/70 text-sm">Equipment inventory, operating schedules, nameplate data collection</p>
                  </div>
                </div>
                <div className="p-3 rounded bg-white/5 flex gap-3">
                  <span className="text-elec-yellow font-bold">3</span>
                  <div>
                    <p className="font-medium">Load Profiling</p>
                    <p className="text-white/70 text-sm">Sub-metering, power logging, identify peak demand periods</p>
                  </div>
                </div>
                <div className="p-3 rounded bg-white/5 flex gap-3">
                  <span className="text-elec-yellow font-bold">4</span>
                  <div>
                    <p className="font-medium">Energy Balance</p>
                    <p className="text-white/70 text-sm">Account for all energy use, identify major consumers (should balance to ±5%)</p>
                  </div>
                </div>
                <div className="p-3 rounded bg-white/5 flex gap-3">
                  <span className="text-elec-yellow font-bold">5</span>
                  <div>
                    <p className="font-medium">ECM Identification</p>
                    <p className="text-white/70 text-sm">List all Energy Conservation Measures with costs and savings</p>
                  </div>
                </div>
                <div className="p-3 rounded bg-white/5 flex gap-3">
                  <span className="text-elec-yellow font-bold">6</span>
                  <div>
                    <p className="font-medium">Prioritisation</p>
                    <p className="text-white/70 text-sm">Rank by payback, NPV, or marginal abatement cost</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Audit Instrumentation</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                    <li className="pl-1"><strong>Power analyser:</strong> kW, kVA, PF, harmonics</li>
                    <li className="pl-1"><strong>Data logger:</strong> Long-term monitoring</li>
                    <li className="pl-1"><strong>Clamp meter:</strong> Current measurements</li>
                    <li className="pl-1"><strong>Thermal camera:</strong> Heat loss, hot spots</li>
                  </ul>
                </div>
                <div>
                  <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                    <li className="pl-1"><strong>Lux meter:</strong> Lighting levels</li>
                    <li className="pl-1"><strong>Ultrasonic detector:</strong> Compressed air leaks</li>
                    <li className="pl-1"><strong>Flow meter:</strong> Water/air flow rates</li>
                    <li className="pl-1"><strong>Temperature logger:</strong> HVAC performance</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Building Energy Breakdown</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">End Use</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Office (%)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Retail (%)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Hospital (%)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">HVAC</td>
                      <td className="border border-white/10 px-3 py-2">40-50</td>
                      <td className="border border-white/10 px-3 py-2">35-45</td>
                      <td className="border border-white/10 px-3 py-2">45-55</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Lighting</td>
                      <td className="border border-white/10 px-3 py-2">20-30</td>
                      <td className="border border-white/10 px-3 py-2">25-35</td>
                      <td className="border border-white/10 px-3 py-2">15-20</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Equipment/IT</td>
                      <td className="border border-white/10 px-3 py-2">15-25</td>
                      <td className="border border-white/10 px-3 py-2">10-15</td>
                      <td className="border border-white/10 px-3 py-2">20-30</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Other</td>
                      <td className="border border-white/10 px-3 py-2">10-15</td>
                      <td className="border border-white/10 px-3 py-2">15-20</td>
                      <td className="border border-white/10 px-3 py-2">10-15</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Audit tip:</strong> The biggest savings are often in operational changes (schedules, setpoints, maintenance) rather than capital investment. Check controls and operation first.
            </p>
          </div>
        </section>

        {/* Section 8: Equipment Selection and Payback */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">08</span>
            Building Services: Equipment Selection and Payback Calculations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Selecting efficient equipment for building services requires balancing capital cost against
              operating cost savings. The right choice depends on running hours, energy prices, and available
              capital.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Equipment Selection Decision Framework</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Factor</th>
                      <th className="border border-white/10 px-3 py-2 text-left">High Efficiency Choice</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Standard Choice</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Running hours</td>
                      <td className="border border-white/10 px-3 py-2">&gt;4000 hours/year</td>
                      <td className="border border-white/10 px-3 py-2">&lt;2000 hours/year</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Load profile</td>
                      <td className="border border-white/10 px-3 py-2">Continuous, near full load</td>
                      <td className="border border-white/10 px-3 py-2">Intermittent, variable</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Energy cost</td>
                      <td className="border border-white/10 px-3 py-2">High/rising tariffs</td>
                      <td className="border border-white/10 px-3 py-2">Low/stable tariffs</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Equipment life</td>
                      <td className="border border-white/10 px-3 py-2">&gt;10 years expected</td>
                      <td className="border border-white/10 px-3 py-2">Short-term installation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Building certification</td>
                      <td className="border border-white/10 px-3 py-2">BREEAM/LEED targets</td>
                      <td className="border border-white/10 px-3 py-2">No certification needed</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Energy Conservation Measures (ECMs)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">ECM</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Saving</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Payback</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">LED lighting retrofit</td>
                      <td className="border border-white/10 px-3 py-2">50-70%</td>
                      <td className="border border-white/10 px-3 py-2">2-4 years</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">VSD on AHU fans</td>
                      <td className="border border-white/10 px-3 py-2">30-50%</td>
                      <td className="border border-white/10 px-3 py-2">1-3 years</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">VSD on pumps</td>
                      <td className="border border-white/10 px-3 py-2">25-40%</td>
                      <td className="border border-white/10 px-3 py-2">1-3 years</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">IE3/IE4 motor upgrade</td>
                      <td className="border border-white/10 px-3 py-2">3-5%</td>
                      <td className="border border-white/10 px-3 py-2">1-2 years</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Optimised BMS controls</td>
                      <td className="border border-white/10 px-3 py-2">10-20%</td>
                      <td className="border border-white/10 px-3 py-2">&lt;1 year</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Power factor correction</td>
                      <td className="border border-white/10 px-3 py-2">kVA reduction</td>
                      <td className="border border-white/10 px-3 py-2">1-3 years</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Compressed air leak repair</td>
                      <td className="border border-white/10 px-3 py-2">20-30%</td>
                      <td className="border border-white/10 px-3 py-2">&lt;1 year</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Payback Calculation Example: LED Retrofit</h3>
              <p className="text-sm text-white mb-2">
                Office building lighting: 500 × 58W fluorescent fittings, 3000 hours/year
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="font-bold">Existing system:</p>
                <p>Load = 500 × 58W × 1.15 (ballast) = 33.35 kW</p>
                <p>Annual energy = 33.35 × 3000 = 100,050 kWh</p>
                <p>Annual cost @ 15p/kWh = <strong>GBP 15,008</strong></p>
                <p className="mt-3 font-bold">LED replacement (25W panels):</p>
                <p>Load = 500 × 25W = 12.5 kW</p>
                <p>Annual energy = 12.5 × 3000 = 37,500 kWh</p>
                <p>Annual cost @ 15p/kWh = <strong>GBP 5,625</strong></p>
                <p className="mt-3 text-green-400 font-bold">Annual saving: GBP 9,383</p>
                <p className="mt-2">Installation cost: 500 × GBP 65 = GBP 32,500</p>
                <p className="text-green-400 font-bold">Simple payback = GBP 32,500 ÷ GBP 9,383 = 3.5 years</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">BREEAM/LEED Energy Credits</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>BREEAM Ene01:</strong> Up to 15 credits for exceeding Part L by 40%+</li>
                <li className="pl-1"><strong>Sub-metering (Ene02):</strong> Requires major energy-consuming systems to be metered</li>
                <li className="pl-1"><strong>LEED EA Prerequisite:</strong> Minimum energy performance required</li>
                <li className="pl-1"><strong>LEED EA Credits:</strong> Points for 6-50% improvement over baseline</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Specification tip:</strong> When specifying equipment, include energy performance requirements in tender documents. Request efficiency data at 50%, 75%, and 100% load, not just rated efficiency.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Motor Efficiency Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A motor draws 18.5kW from the supply and has mechanical losses of 1.2kW and electrical losses of 0.8kW. Calculate its efficiency.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Total losses = 1.2 + 0.8 = 2.0 kW</p>
                <p>Output power = 18.5 - 2.0 = 16.5 kW</p>
                <p className="mt-2">Efficiency η = Pout / Pin × 100%</p>
                <p>η = 16.5 / 18.5 × 100% = <strong>89.2%</strong></p>
                <p className="mt-2 text-white/60">Alternative: η = (Pin - Losses) / Pin = (18.5 - 2.0) / 18.5 = 89.2%</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Transformer All-Day Efficiency</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A 500kVA transformer has iron losses of 2kW and full-load copper losses of 8kW.
                It operates at full load for 6 hours, half load for 10 hours, and 10% load for 8 hours daily.
                Calculate the all-day efficiency at 0.8 power factor.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="font-bold">Energy output:</p>
                <p>Full load: 500 × 0.8 × 6 = 2400 kWh</p>
                <p>Half load: 500 × 0.5 × 0.8 × 10 = 2000 kWh</p>
                <p>10% load: 500 × 0.1 × 0.8 × 8 = 320 kWh</p>
                <p>Total output = 4720 kWh</p>
                <p className="mt-2 font-bold">Energy losses:</p>
                <p>Iron losses = 2 kW × 24h = 48 kWh (constant)</p>
                <p>Copper losses:</p>
                <p className="pl-4">Full load: 8 × 1² × 6 = 48 kWh</p>
                <p className="pl-4">Half load: 8 × 0.5² × 10 = 20 kWh</p>
                <p className="pl-4">10% load: 8 × 0.1² × 8 = 0.64 kWh</p>
                <p>Total copper losses = 68.64 kWh</p>
                <p className="mt-2 font-bold">All-day efficiency:</p>
                <p>η = 4720 / (4720 + 48 + 68.64) × 100%</p>
                <p>η = 4720 / 4836.64 = <strong>97.6%</strong></p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: System Efficiency and Energy Cost</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A pumping system requires 45kW at the pump shaft. The system comprises:
                VSD (96%), motor (91%), coupling (98%), pump (75%). Calculate annual energy cost at 14p/kWh for 5000 hours operation.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="font-bold">System efficiency:</p>
                <p>η_system = 0.96 × 0.91 × 0.98 × 0.75 = 0.642 = 64.2%</p>
                <p className="mt-2 font-bold">Electrical input power:</p>
                <p>Pin = Pshaft / η_system = 45 / 0.642 = 70.1 kW</p>
                <p className="mt-2 font-bold">Annual energy consumption:</p>
                <p>E = 70.1 × 5000 = 350,500 kWh</p>
                <p className="mt-2 font-bold">Annual cost:</p>
                <p>Cost = 350,500 × 0.14 = <strong>GBP 49,070</strong></p>
                <p className="mt-2 text-white/60">Losses = 70.1 - 45 = 25.1 kW (GBP 17,570/year wasted)</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 4: NPV Analysis for VSD Investment</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A VSD costs GBP 8,000 installed and saves GBP 2,500/year in energy. Equipment life is 10 years.
                Calculate NPV at 8% discount rate.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="font-bold">Using present value of annuity factor:</p>
                <p>PVA factor (10 years, 8%) = (1 - (1.08)^-10) / 0.08 = 6.710</p>
                <p className="mt-2">PV of savings = GBP 2,500 × 6.710 = GBP 16,775</p>
                <p className="mt-2 font-bold">NPV calculation:</p>
                <p>NPV = PV of savings - Initial cost</p>
                <p>NPV = GBP 16,775 - GBP 8,000 = <strong>GBP 8,775</strong></p>
                <p className="mt-2 text-green-400">NPV &gt; 0, therefore investment is worthwhile</p>
                <p className="text-white/60 mt-2">Simple payback = 8000 / 2500 = 3.2 years</p>
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
                <li className="pl-1"><strong>η = Pout / Pin × 100%</strong> — Basic efficiency</li>
                <li className="pl-1"><strong>η_system = η1 × η2 × ... × ηn</strong> — System efficiency</li>
                <li className="pl-1"><strong>Copper losses ∝ I²</strong> — Load-dependent losses</li>
                <li className="pl-1"><strong>x = √(Pi/Pc)</strong> — Maximum efficiency load point</li>
                <li className="pl-1"><strong>Payback = ΔCost / Annual savings</strong> — Simple payback</li>
                <li className="pl-1"><strong>NPV = Σ(Ct/(1+r)^t) - C0</strong> — Net present value</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Motor energy: <strong>90-97%</strong> of life cycle cost</li>
                <li className="pl-1">IE3 minimum for new motors: <strong>0.75-1000kW</strong></li>
                <li className="pl-1">VSD saves <strong>30-50%</strong> on variable flow applications</li>
                <li className="pl-1">HVAC: <strong>40-50%</strong> of commercial building energy</li>
                <li className="pl-1">Target payback: typically <strong>2-5 years</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Adding efficiencies</strong> — System efficiencies multiply, not add</li>
                <li className="pl-1"><strong>Using rated efficiency only</strong> — Consider part-load performance</li>
                <li className="pl-1"><strong>Ignoring running hours</strong> — High-hour equipment deserves high efficiency</li>
                <li className="pl-1"><strong>Oversizing</strong> — Results in poor part-load efficiency</li>
                <li className="pl-1"><strong>Ignoring power factor</strong> — Affects real power in transformer calculations</li>
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
                <p className="font-medium text-white mb-1">Efficiency Fundamentals</p>
                <ul className="space-y-0.5">
                  <li>η = Pout/Pin × 100% (always &lt;100%)</li>
                  <li>Losses = Pin - Pout = Pin × (1 - η)</li>
                  <li>System η = product of individual η</li>
                  <li>Max transformer η when Pi = Pc</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Motor Efficiency Classes</p>
                <ul className="space-y-0.5">
                  <li>IE1 Standard (no longer permitted)</li>
                  <li>IE2 High (previous minimum)</li>
                  <li>IE3 Premium (current minimum)</li>
                  <li>IE4 Super Premium (75-200kW)</li>
                  <li>IE5 Ultra Premium (best available)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Economic Analysis</p>
                <ul className="space-y-0.5">
                  <li>Simple payback = Extra cost / Annual saving</li>
                  <li>NPV &gt; 0 = worthwhile investment</li>
                  <li>Energy = 90-97% of motor LCC</li>
                  <li>Target payback: 2-5 years</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Energy Audit Steps</p>
                <ul className="space-y-0.5">
                  <li>1. Baseline from utility data</li>
                  <li>2. Site survey and inventory</li>
                  <li>3. Load profiling and metering</li>
                  <li>4. Energy balance (±5%)</li>
                  <li>5. ECM identification and costing</li>
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
            <Link to="../h-n-c-module3-section6-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Power Factor
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module3-section6-3">
              Next: Demand Management
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule3Section6_2;
