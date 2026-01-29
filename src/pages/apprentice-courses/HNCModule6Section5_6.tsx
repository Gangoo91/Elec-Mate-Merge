import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Energy Efficiency Measures - HNC Module 6 Section 5.6";
const DESCRIPTION = "Master energy conservation measure identification, payback analysis, implementation priorities, and measurement and verification for building services projects.";

const quickCheckQuestions = [
  {
    id: "ecm-definition",
    question: "What is an Energy Conservation Measure (ECM)?",
    options: ["Any building maintenance activity", "A specific action that reduces energy consumption while maintaining service levels", "A renewable energy installation only", "A regulatory compliance requirement"],
    correctIndex: 1,
    explanation: "An ECM is a specific, identifiable action that reduces energy consumption or cost while maintaining or improving the required level of service, comfort, or productivity in a building."
  },
  {
    id: "simple-payback",
    question: "A lighting upgrade costs £12,000 and saves £3,000 annually. What is the simple payback period?",
    options: ["3 years", "4 years", "5 years", "6 years"],
    correctIndex: 1,
    explanation: "Simple payback = Initial cost ÷ Annual savings = £12,000 ÷ £3,000 = 4 years. This means the investment will be recovered through energy savings in 4 years."
  },
  {
    id: "ipmvp-purpose",
    question: "What is the primary purpose of the IPMVP protocol?",
    options: ["To design energy systems", "To standardise measurement and verification of energy savings", "To calculate carbon emissions", "To specify equipment ratings"],
    correctIndex: 1,
    explanation: "The International Performance Measurement and Verification Protocol (IPMVP) provides standardised methods for determining energy and water savings from efficiency projects, ensuring consistent and credible verification."
  },
  {
    id: "rebound-effect",
    question: "What is the 'rebound effect' in energy efficiency?",
    options: ["Equipment bouncing back to original settings", "Increased energy use due to behavioural changes after efficiency improvements", "Energy prices returning to normal", "Temporary increase during commissioning"],
    correctIndex: 1,
    explanation: "The rebound effect occurs when energy efficiency improvements lead to behavioural changes that partially offset savings - for example, occupants setting thermostats higher after insulation upgrades because heating is now 'cheaper'."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which ECM category typically offers the shortest payback period?",
    options: [
      "Building fabric improvements",
      "Plant replacement",
      "Controls and operational improvements",
      "Renewable energy systems"
    ],
    correctAnswer: 2,
    explanation: "Controls and operational improvements (such as BMS optimisation, scheduling adjustments, and setpoint changes) typically offer the shortest payback as they require minimal capital investment while delivering immediate savings."
  },
  {
    id: 2,
    question: "A VSD installation costs £8,000, saves £2,400 per year, and has a 12-year lifespan. Using a 6% discount rate, the NPV factor for 12 years is 8.384. What is the NPV?",
    options: ["£12,122", "£20,122", "£28,800", "£-8,000"],
    correctAnswer: 0,
    explanation: "NPV = (Annual savings × NPV factor) - Initial cost = (£2,400 × 8.384) - £8,000 = £20,122 - £8,000 = £12,122. A positive NPV indicates the investment is financially worthwhile."
  },
  {
    id: 3,
    question: "Which IPMVP option is most appropriate for verifying savings from a lighting retrofit in a single zone?",
    options: ["Option A: Retrofit Isolation - Key Parameter Measurement", "Option B: Retrofit Isolation - All Parameter Measurement", "Option C: Whole Facility", "Option D: Calibrated Simulation"],
    correctAnswer: 0,
    explanation: "Option A is suitable for lighting retrofits where the key parameter (power) can be easily measured while other factors (hours of use) are estimated from operational schedules. It's the most cost-effective approach for isolated measures."
  },
  {
    id: 4,
    question: "In life cycle costing, which costs are typically included?",
    options: [
      "Capital cost only",
      "Capital, energy, maintenance, and disposal costs",
      "Energy costs only",
      "Capital and energy costs only"
    ],
    correctAnswer: 1,
    explanation: "Life cycle costing (LCC) includes all costs over the asset's lifespan: capital (purchase and installation), operational (energy and consumables), maintenance (servicing and repairs), and end-of-life (disposal or replacement)."
  },
  {
    id: 5,
    question: "When prioritising ECMs, which combination of factors indicates highest priority?",
    options: [
      "Long payback, low risk, complex implementation",
      "Short payback, low risk, high energy savings",
      "Long payback, high risk, high energy savings",
      "Short payback, high risk, simple implementation"
    ],
    correctAnswer: 1,
    explanation: "The ideal ECM priority combines short payback (quick return on investment), low implementation risk, and high energy savings. These 'quick wins' build confidence and generate savings to fund more complex measures."
  },
  {
    id: 6,
    question: "What baseline adjustment is typically required when verifying savings from HVAC improvements?",
    options: [
      "No adjustment needed",
      "Adjustment for weather (heating/cooling degree days)",
      "Adjustment for equipment age only",
      "Adjustment for electricity prices"
    ],
    correctAnswer: 1,
    explanation: "HVAC energy consumption varies significantly with weather. Baseline adjustments using heating and cooling degree days normalise consumption data, allowing fair comparison between pre- and post-retrofit periods regardless of weather differences."
  },
  {
    id: 7,
    question: "A building has annual energy costs of £50,000. An ECM bundle with 25% savings potential costs £75,000. What is the simple payback?",
    options: ["1.5 years", "3 years", "6 years", "25 years"],
    correctAnswer: 2,
    explanation: "Annual savings = £50,000 × 25% = £12,500. Simple payback = £75,000 ÷ £12,500 = 6 years. This indicates a medium-term investment typically acceptable for building fabric or plant measures."
  },
  {
    id: 8,
    question: "Which factor most commonly causes the rebound effect in commercial buildings?",
    options: [
      "Equipment degradation",
      "Changed occupant behaviour and comfort expectations",
      "Incorrect installation",
      "Utility rate increases"
    ],
    correctAnswer: 1,
    explanation: "The rebound effect in commercial buildings often results from occupants changing behaviour - such as leaving equipment running longer or adjusting setpoints - when they perceive energy is 'cheaper' or 'greener' after efficiency improvements."
  },
  {
    id: 9,
    question: "What is the key advantage of Net Present Value (NPV) over simple payback analysis?",
    options: [
      "NPV is easier to calculate",
      "NPV accounts for the time value of money",
      "NPV ignores operating costs",
      "NPV uses standardised discount rates"
    ],
    correctAnswer: 1,
    explanation: "NPV accounts for the time value of money - recognising that £1 today is worth more than £1 in the future. This provides a more accurate assessment of long-term investments by discounting future cash flows to present values."
  },
  {
    id: 10,
    question: "IPMVP Option C (Whole Facility) measurement is most appropriate when:",
    options: [
      "Installing a single LED luminaire",
      "Multiple interacting ECMs are implemented simultaneously",
      "Verifying a specific motor replacement",
      "Testing a new control strategy in one zone"
    ],
    correctAnswer: 1,
    explanation: "Option C uses whole-facility metering and is appropriate when multiple ECMs interact or when individual measurement is impractical. It compares total facility consumption before and after improvements, adjusted for independent variables."
  },
  {
    id: 11,
    question: "In an energy audit, ECMs are typically categorised as no-cost, low-cost, and capital measures. Which is an example of a no-cost ECM?",
    options: [
      "LED lighting installation",
      "VSD retrofit on pumps",
      "Adjusting BMS time schedules",
      "Solar PV installation"
    ],
    correctAnswer: 2,
    explanation: "No-cost ECMs require no financial investment - they involve operational changes like adjusting schedules, setpoints, or procedures. BMS schedule optimisation is a classic no-cost measure that can yield significant savings immediately."
  },
  {
    id: 12,
    question: "What discount rate consideration is important when comparing ECM options across different equipment lifespans?",
    options: [
      "Always use 0% discount rate",
      "Use equivalent annual cost (EAC) to compare different lifespans",
      "Ignore lifespan differences",
      "Only compare equipment with identical lifespans"
    ],
    correctAnswer: 1,
    explanation: "Equivalent Annual Cost (EAC) converts NPV into an annual cost figure, enabling fair comparison between options with different lifespans. Without EAC, short-lifespan options may appear cheaper when they're actually more expensive per year."
  }
];

const faqs = [
  {
    question: "How do I identify ECMs in an existing building?",
    answer: "ECM identification follows a systematic process: (1) Review utility bills and benchmark against similar buildings using DEC ratings or CIBSE TM46 benchmarks; (2) Conduct a site survey to assess equipment condition, controls, and operational patterns; (3) Sub-meter or spot-measure major loads to identify wastage; (4) Interview facilities staff about operational issues and comfort complaints; (5) Review maintenance records for frequently repaired or inefficient equipment. The gap between actual and benchmark performance indicates savings potential."
  },
  {
    question: "When should I use NPV versus simple payback analysis?",
    answer: "Simple payback is appropriate for quick screening of options and for short-lived measures (under 3 years). Use NPV for measures with longer lifespans, when comparing options with different lifespans, or when making significant capital investment decisions. NPV is essential when the organisation has a required rate of return or when financing costs are significant. Most HNC-level projects require demonstrating both methods."
  },
  {
    question: "What baseline period is required for M&V under IPMVP?",
    answer: "IPMVP recommends a baseline period of at least 12 months to capture seasonal variations. For weather-dependent systems like HVAC, the baseline must include representative heating and cooling seasons. Shorter baselines (minimum 3 months) may be acceptable for non-weather-dependent measures like lighting, provided operating conditions are consistent. Document all baseline conditions, including occupancy patterns, production levels, and any unusual events."
  },
  {
    question: "How do I account for maintenance savings in LCC analysis?",
    answer: "Maintenance savings should be included as a benefit stream in LCC calculations. Compare the maintenance costs of the existing system (from maintenance records and contracts) with expected maintenance costs of the new system (from manufacturer data and industry benchmarks). Include consumables, planned maintenance labour, and estimated reactive maintenance. For newer technologies, apply a technology risk factor to maintenance estimates as real-world data may be limited."
  },
  {
    question: "What strategies help prevent the rebound effect?",
    answer: "Effective strategies include: (1) Implementing visible energy monitoring and feedback displays; (2) Maintaining engagement through ongoing awareness campaigns; (3) Setting and enforcing operational policies (e.g., fixed setpoints); (4) Using automated controls that limit manual override capability; (5) Including behavioural assumptions in M&V baseline calculations; (6) Regular review of energy performance with management reporting. The key is maintaining awareness that efficiency gains should reduce consumption, not just cost."
  }
];

const HNCModule6Section5_6 = () => {
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
            <span>Module 6.5.6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Energy Efficiency Measures
          </h1>
          <p className="text-white/80">
            ECM identification, payback analysis, implementation priorities, and verification of savings
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>ECMs:</strong> Specific actions that reduce energy consumption</li>
              <li className="pl-1"><strong>Payback:</strong> Time to recover investment from savings</li>
              <li className="pl-1"><strong>NPV/LCC:</strong> Account for time value of money</li>
              <li className="pl-1"><strong>M&V:</strong> IPMVP protocol for verifying savings</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>HVAC:</strong> Typically 40-60% of building energy</li>
              <li className="pl-1"><strong>Lighting:</strong> 15-25% with significant ECM potential</li>
              <li className="pl-1"><strong>Controls:</strong> Low-cost, high-impact opportunities</li>
              <li className="pl-1"><strong>Motors:</strong> VSDs often provide 2-4 year payback</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify and categorise energy conservation measures",
              "Calculate simple payback, NPV, and life cycle costs",
              "Prioritise ECMs using technical and financial criteria",
              "Apply IPMVP measurement and verification options",
              "Understand and mitigate rebound effects",
              "Develop implementation strategies for ECM programmes"
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

        {/* Section 1: ECM Identification */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            ECM Identification and Categories
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Energy Conservation Measures (ECMs) are specific, implementable actions that reduce energy
              consumption while maintaining or improving service delivery. Effective ECM identification
              requires systematic assessment of building systems, operational patterns, and occupant needs.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">ECM Categories by Investment Level:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>No-cost measures:</strong> Operational changes - schedule adjustments, setpoint optimisation, switch-off campaigns</li>
                <li className="pl-1"><strong>Low-cost measures:</strong> Minor modifications - LED lamp replacements, draught sealing, valve insulation</li>
                <li className="pl-1"><strong>Capital measures:</strong> Significant investment - plant replacement, VSD installation, building fabric upgrades</li>
                <li className="pl-1"><strong>Strategic measures:</strong> Major projects - renewable installations, combined heat and power, deep retrofits</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common ECMs in Building Services</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">System</th>
                      <th className="border border-white/10 px-3 py-2 text-left">ECM Examples</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Savings</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Lighting</td>
                      <td className="border border-white/10 px-3 py-2">LED retrofit, daylight linking, occupancy control</td>
                      <td className="border border-white/10 px-3 py-2">40-70%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">HVAC</td>
                      <td className="border border-white/10 px-3 py-2">VSD on fans/pumps, economiser cycles, heat recovery</td>
                      <td className="border border-white/10 px-3 py-2">20-40%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Controls</td>
                      <td className="border border-white/10 px-3 py-2">BMS optimisation, weather compensation, scheduling</td>
                      <td className="border border-white/10 px-3 py-2">10-25%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Motors</td>
                      <td className="border border-white/10 px-3 py-2">IE4/IE5 motors, VSD retrofit, right-sizing</td>
                      <td className="border border-white/10 px-3 py-2">15-35%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Building fabric</td>
                      <td className="border border-white/10 px-3 py-2">Insulation upgrade, glazing replacement, air tightness</td>
                      <td className="border border-white/10 px-3 py-2">10-30%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key principle:</strong> ECMs should be identified through systematic energy audits benchmarking actual consumption against CIBSE TM46 or DEC benchmarks for the building type.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Financial Analysis */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Payback Analysis and Financial Metrics
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Financial analysis determines whether ECMs represent sound investments. Different metrics
              suit different purposes - from quick screening to detailed investment appraisal.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Simple Payback</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Initial cost ÷ Annual savings</li>
                  <li className="pl-1">Easy to calculate and understand</li>
                  <li className="pl-1">Ignores time value of money</li>
                  <li className="pl-1">Best for quick screening</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Net Present Value (NPV)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Discounts future cash flows</li>
                  <li className="pl-1">Accounts for time value of money</li>
                  <li className="pl-1">Positive NPV = worthwhile</li>
                  <li className="pl-1">Requires discount rate selection</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Life Cycle Costing (LCC)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Total cost over asset life</li>
                  <li className="pl-1">Includes maintenance, disposal</li>
                  <li className="pl-1">Enables like-for-like comparison</li>
                  <li className="pl-1">Required for public procurement</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Payback Calculation Examples</p>
              <div className="font-mono text-sm space-y-3">
                <div>
                  <p className="text-white/60">Simple Payback:</p>
                  <p className="text-white">LED lighting upgrade: £24,000 cost, £8,000/year savings</p>
                  <p className="text-green-400">Payback = £24,000 ÷ £8,000 = 3 years</p>
                </div>
                <div className="border-t border-white/10 pt-3">
                  <p className="text-white/60">NPV Calculation (10-year life, 6% discount rate):</p>
                  <p className="text-white">NPV factor for 6%, 10 years = 7.360</p>
                  <p className="text-white">PV of savings = £8,000 × 7.360 = £58,880</p>
                  <p className="text-green-400">NPV = £58,880 - £24,000 = £34,880 (positive = viable)</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Payback Expectations</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">ECM Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Payback</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Acceptance Threshold</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Controls/operational</td>
                      <td className="border border-white/10 px-3 py-2">0-1 years</td>
                      <td className="border border-white/10 px-3 py-2">Immediate implementation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">LED lighting</td>
                      <td className="border border-white/10 px-3 py-2">2-4 years</td>
                      <td className="border border-white/10 px-3 py-2">Up to 5 years</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">VSD retrofits</td>
                      <td className="border border-white/10 px-3 py-2">2-4 years</td>
                      <td className="border border-white/10 px-3 py-2">Up to 5 years</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">HVAC plant replacement</td>
                      <td className="border border-white/10 px-3 py-2">5-10 years</td>
                      <td className="border border-white/10 px-3 py-2">Up to equipment life</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Building fabric</td>
                      <td className="border border-white/10 px-3 py-2">10-20 years</td>
                      <td className="border border-white/10 px-3 py-2">Building lifecycle</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Best practice:</strong> Use simple payback for initial screening, then apply NPV or LCC for measures that pass preliminary criteria.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Implementation Priorities */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Implementation Priorities and Planning
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Prioritising ECMs requires balancing multiple factors beyond simple financial return.
              A structured approach ensures resources target the most effective measures while managing
              risk and building organisational capability.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">ECM Prioritisation Matrix</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Factor</th>
                      <th className="border border-white/10 px-3 py-2 text-left">High Priority</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Lower Priority</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Payback period</td>
                      <td className="border border-white/10 px-3 py-2">&lt; 3 years</td>
                      <td className="border border-white/10 px-3 py-2">&gt; 7 years</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Implementation risk</td>
                      <td className="border border-white/10 px-3 py-2">Proven technology, minimal disruption</td>
                      <td className="border border-white/10 px-3 py-2">Novel technology, major works</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Energy savings %</td>
                      <td className="border border-white/10 px-3 py-2">&gt; 20% of system consumption</td>
                      <td className="border border-white/10 px-3 py-2">&lt; 5% of system consumption</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Co-benefits</td>
                      <td className="border border-white/10 px-3 py-2">Improved comfort, reduced maintenance</td>
                      <td className="border border-white/10 px-3 py-2">Energy only</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Strategic alignment</td>
                      <td className="border border-white/10 px-3 py-2">Supports carbon targets, regulations</td>
                      <td className="border border-white/10 px-3 py-2">No strategic drivers</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Implementation Sequencing Strategy</p>
              <div className="space-y-3 text-sm">
                <div className="flex gap-3">
                  <span className="text-elec-yellow font-medium">Phase 1:</span>
                  <span><strong>Quick wins</strong> - No/low-cost measures implemented immediately. Builds momentum and demonstrates commitment.</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-elec-yellow font-medium">Phase 2:</span>
                  <span><strong>Core measures</strong> - Short payback capital measures (2-4 years). LED lighting, VSD retrofits, controls upgrades.</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-elec-yellow font-medium">Phase 3:</span>
                  <span><strong>Strategic investments</strong> - Longer payback measures aligned with asset replacement cycles and major refurbishments.</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-elec-yellow font-medium">Phase 4:</span>
                  <span><strong>Deep retrofit</strong> - Comprehensive building upgrades when significant intervention is justified.</span>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key implementation considerations:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Interactions:</strong> Some ECMs affect others - install controls before plant upgrades to right-size equipment</li>
                <li className="pl-1"><strong>Funding:</strong> Match ECM timing to budget cycles and available financing mechanisms</li>
                <li className="pl-1"><strong>Disruption:</strong> Schedule disruptive measures during building closures or low-occupancy periods</li>
                <li className="pl-1"><strong>Dependencies:</strong> Ensure enabling works (sub-metering, BMS points) are completed first</li>
                <li className="pl-1"><strong>Skills:</strong> Consider in-house capability versus specialist contractor requirements</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Implementation tip:</strong> Use savings from Phase 1 and 2 measures to fund Phase 3 investments - create a 'revolving fund' for energy efficiency.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Measurement and Verification */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Measurement, Verification and Avoiding Rebound
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Measurement and Verification (M&V) provides credible evidence that ECMs deliver expected
              savings. The International Performance Measurement and Verification Protocol (IPMVP)
              provides standardised methods used worldwide for verifying energy savings.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">IPMVP Options</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Option</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Approach</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">A: Key Parameter</td>
                      <td className="border border-white/10 px-3 py-2">Measure key parameter (e.g., kW), estimate others</td>
                      <td className="border border-white/10 px-3 py-2">Lighting, constant loads</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">B: All Parameters</td>
                      <td className="border border-white/10 px-3 py-2">Measure all parameters at retrofit level</td>
                      <td className="border border-white/10 px-3 py-2">Motors, VSDs, specific systems</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">C: Whole Facility</td>
                      <td className="border border-white/10 px-3 py-2">Use utility meters, adjust for independent variables</td>
                      <td className="border border-white/10 px-3 py-2">Multiple ECMs, whole building</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">D: Simulation</td>
                      <td className="border border-white/10 px-3 py-2">Calibrated simulation modelling</td>
                      <td className="border border-white/10 px-3 py-2">Complex buildings, new construction</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">M&V Calculation Formula</p>
              <div className="font-mono text-sm space-y-2">
                <p className="text-white">Energy Savings = Baseline Energy - Post-Installation Energy ± Adjustments</p>
                <p className="text-white/60 mt-3">Adjustments account for:</p>
                <ul className="text-white/80 space-y-1 ml-4 list-disc">
                  <li>Weather differences (heating/cooling degree days)</li>
                  <li>Occupancy changes</li>
                  <li>Operating hours variations</li>
                  <li>Production or service level changes</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Understanding the Rebound Effect</p>
              <div className="text-sm text-white space-y-2">
                <p>
                  The rebound effect occurs when efficiency improvements lead to increased consumption
                  that partially offsets expected savings. Research suggests 10-30% of theoretical
                  savings may be lost to rebound in commercial buildings.
                </p>
                <p className="text-white/80 mt-3"><strong>Common causes:</strong></p>
                <ul className="space-y-1 ml-4 list-disc text-white/80">
                  <li>Occupants adjusting setpoints ('it's more efficient now, so I can be warmer')</li>
                  <li>Extended operating hours due to lower running costs</li>
                  <li>Removal of energy-saving behaviours ('the new system handles it')</li>
                  <li>Increased equipment utilisation</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Rebound Mitigation Strategies</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Maintain visibility:</strong> Install energy dashboards and regular reporting</li>
                <li className="pl-1"><strong>Lock-in savings:</strong> Use BMS to enforce setpoints and schedules</li>
                <li className="pl-1"><strong>Continuous engagement:</strong> Ongoing awareness campaigns and energy champions</li>
                <li className="pl-1"><strong>Targets:</strong> Set consumption targets, not just efficiency metrics</li>
                <li className="pl-1"><strong>M&V baseline:</strong> Include realistic behavioural assumptions in baseline calculations</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>M&V best practice:</strong> Plan M&V approach before ECM implementation - baseline data must be collected under representative operating conditions.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Simple Payback Analysis</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> A VSD retrofit on a 37 kW chiller pump operating 4,000 hours annually.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Given data:</p>
                <p>Motor power: 37 kW</p>
                <p>Operating hours: 4,000 h/year</p>
                <p>Expected savings: 35% (typical for VSD on pump)</p>
                <p>Electricity cost: £0.28/kWh</p>
                <p>VSD installation cost: £6,500</p>
                <p className="mt-2 text-white/60">Calculation:</p>
                <p>Annual consumption = 37 kW × 4,000 h = 148,000 kWh</p>
                <p>Energy savings = 148,000 × 35% = 51,800 kWh/year</p>
                <p>Cost savings = 51,800 × £0.28 = £14,504/year</p>
                <p className="mt-2 text-green-400">Simple payback = £6,500 ÷ £14,504 = 0.45 years (5.4 months)</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: NPV Comparison</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Compare two lighting options for a warehouse over 15 years at 5% discount rate.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Option A: Standard LED (8-year life)</p>
                <p>Capital: £40,000 | Annual energy: £6,000 | Annual maint: £500</p>
                <p className="mt-2 text-white/60">Option B: Premium LED (15-year life)</p>
                <p>Capital: £55,000 | Annual energy: £4,800 | Annual maint: £300</p>
                <p className="mt-2 text-white/60">NPV factors (5%):</p>
                <p>15 years = 10.380 | 8 years = 6.463</p>
                <p className="mt-2 text-white/60">Option A NPV (including replacement at year 8):</p>
                <p>Initial: -£40,000</p>
                <p>Running (years 1-8): -(£6,500 × 6.463) = -£42,010</p>
                <p>Replacement at Y8: -£40,000 × 0.677 = -£27,080</p>
                <p>Running (years 9-15): -(£6,500 × 3.917) = -£25,460</p>
                <p className="text-red-400">Option A total NPV = -£134,550</p>
                <p className="mt-2 text-white/60">Option B NPV:</p>
                <p>Initial: -£55,000</p>
                <p>Running (15 years): -(£5,100 × 10.380) = -£52,938</p>
                <p className="text-green-400">Option B total NPV = -£107,938</p>
                <p className="mt-2 text-green-400">Premium LED saves £26,612 NPV over 15 years</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: M&V Weather Adjustment</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Verify heating savings after boiler upgrade using degree day adjustment.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Baseline period (pre-upgrade):</p>
                <p>Gas consumption: 180,000 kWh</p>
                <p>Heating degree days (HDD): 2,100</p>
                <p>Baseline ratio: 180,000 ÷ 2,100 = 85.7 kWh/HDD</p>
                <p className="mt-2 text-white/60">Post-installation period:</p>
                <p>Actual gas consumption: 145,000 kWh</p>
                <p>Heating degree days: 2,350 (colder year)</p>
                <p className="mt-2 text-white/60">Adjusted calculation:</p>
                <p>Expected baseline at 2,350 HDD: 85.7 × 2,350 = 201,395 kWh</p>
                <p>Actual consumption: 145,000 kWh</p>
                <p className="text-green-400">Weather-adjusted savings: 201,395 - 145,000 = 56,395 kWh (28%)</p>
                <p className="mt-2 text-white/60">Without adjustment (misleading):</p>
                <p className="text-red-400">Apparent savings: 180,000 - 145,000 = 35,000 kWh (19%)</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">ECM Identification Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Benchmark consumption against CIBSE TM46 or DEC database</li>
                <li className="pl-1">Analyse utility bills for patterns and anomalies</li>
                <li className="pl-1">Conduct site survey of equipment age, condition, and controls</li>
                <li className="pl-1">Review BMS data for setpoints, schedules, and operational issues</li>
                <li className="pl-1">Interview facilities staff about comfort complaints and operational challenges</li>
                <li className="pl-1">Identify quick wins (controls, scheduling) before capital measures</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Financial Formulas</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Simple payback: <strong>Capital cost ÷ Annual savings</strong></li>
                <li className="pl-1">NPV: <strong>∑(Cash flow ÷ (1+r)ⁿ) - Initial investment</strong></li>
                <li className="pl-1">NPV factor (annuity): <strong>(1 - (1+r)⁻ⁿ) ÷ r</strong></li>
                <li className="pl-1">Equivalent Annual Cost: <strong>NPV × (r ÷ (1 - (1+r)⁻ⁿ))</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Ignoring interactions:</strong> Installing efficient equipment before optimising controls wastes sizing opportunity</li>
                <li className="pl-1"><strong>Neglecting M&V costs:</strong> Budget 3-5% of ECM cost for proper measurement and verification</li>
                <li className="pl-1"><strong>Optimistic savings estimates:</strong> Use conservative figures and validate with comparable projects</li>
                <li className="pl-1"><strong>Forgetting maintenance:</strong> Some efficient equipment requires specialist maintenance skills</li>
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
                <p className="font-medium text-white mb-1">Financial Analysis</p>
                <ul className="space-y-0.5">
                  <li>Simple payback = Cost ÷ Annual savings</li>
                  <li>NPV = PV of benefits - Initial cost</li>
                  <li>Positive NPV = Worthwhile investment</li>
                  <li>Typical discount rate: 5-8%</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">IPMVP Options</p>
                <ul className="space-y-0.5">
                  <li>Option A: Key parameter measurement</li>
                  <li>Option B: All parameter measurement</li>
                  <li>Option C: Whole facility metering</li>
                  <li>Option D: Calibrated simulation</li>
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
            <Link to="../h-n-c-module6-section6-1">
              Next: Section 6.1
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule6Section5_6;
