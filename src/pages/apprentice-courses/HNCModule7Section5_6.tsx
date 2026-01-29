import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Efficiency Retrofits - HNC Module 7 Section 5.6";
const DESCRIPTION = "Master efficiency retrofit methodology for building electrical systems: assessment techniques, business case development, LED retrofit considerations, implementation planning, IPMVP verification, and post-retrofit commissioning.";

const quickCheckQuestions = [
  {
    id: "retrofit-assessment",
    question: "What is the primary purpose of an energy audit in retrofit planning?",
    options: ["To satisfy building regulations", "To identify energy saving opportunities and quantify potential savings", "To calculate electricity tariffs", "To design new electrical systems"],
    correctIndex: 1,
    explanation: "An energy audit systematically identifies energy saving opportunities, quantifies current consumption, and estimates potential savings. This data forms the foundation for business case development and retrofit prioritisation."
  },
  {
    id: "business-case",
    question: "Which financial metric is most commonly used to evaluate retrofit investments?",
    options: ["Gross profit margin", "Simple payback period", "Operating margin", "Current ratio"],
    correctIndex: 1,
    explanation: "Simple payback period (investment cost divided by annual savings) is the most widely used metric for retrofit evaluation. Whilst NPV and IRR provide more sophisticated analysis, payback period is universally understood by stakeholders."
  },
  {
    id: "led-retrofit",
    question: "When retrofitting fluorescent fittings with LED tubes, which safety consideration is paramount?",
    options: ["Colour temperature matching", "Compatibility with existing ballasts or bypass requirements", "Lumen output comparison", "Dimming compatibility"],
    correctIndex: 1,
    explanation: "Ballast compatibility is the critical safety consideration. Type A LED tubes work with existing ballasts, Type B require ballast bypass, and Type C require new LED drivers. Incorrect selection can cause fire risks or equipment damage."
  },
  {
    id: "ipmvp-verification",
    question: "What does IPMVP Option C require for measurement and verification?",
    options: ["Individual load metering only", "Engineering calculations without metering", "Whole facility utility metering with regression analysis", "Spot measurements during commissioning"],
    correctIndex: 2,
    explanation: "IPMVP Option C uses whole facility utility data with regression analysis to verify savings. It compares pre-retrofit and post-retrofit consumption, adjusted for variables like weather and occupancy, to quantify actual energy reductions."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which level of energy audit provides the most detailed analysis for retrofit planning?",
    options: [
      "Walk-through audit (Level 1)",
      "General audit (Level 2)",
      "Investment-grade audit (Level 3)",
      "Desktop audit (Level 0)"
    ],
    correctAnswer: 2,
    explanation: "Investment-grade audit (Level 3) provides detailed engineering analysis, metering data, life-cycle cost analysis, and financial projections suitable for securing capital investment for major retrofit projects."
  },
  {
    id: 2,
    question: "For a lighting retrofit business case, which costs should be included beyond equipment?",
    options: ["Only the LED lamp costs", "Equipment, installation, disposal, and any control system upgrades", "Equipment and installation only", "Equipment and maintenance savings only"],
    correctAnswer: 1,
    explanation: "A comprehensive business case includes capital costs (equipment, installation, controls), disposal costs for removed equipment, and considers all revenue implications (energy savings, maintenance savings, carbon reduction benefits)."
  },
  {
    id: 3,
    question: "What is the typical acceptable simple payback period for most commercial retrofit projects?",
    options: ["Less than 1 year", "2-5 years", "7-10 years", "Over 15 years"],
    correctAnswer: 1,
    explanation: "Most commercial organisations accept payback periods of 2-5 years for retrofit investments. Shorter paybacks are preferred but rare for comprehensive projects; longer paybacks typically require additional drivers like regulatory compliance or sustainability targets."
  },
  {
    id: 4,
    question: "When conducting a pre-retrofit baseline, measurements should ideally cover:",
    options: [
      "A single day of operation",
      "At least one week",
      "A minimum of 12 months to capture seasonal variation",
      "The period during peak demand only"
    ],
    correctAnswer: 2,
    explanation: "A 12-month baseline captures seasonal variations in consumption, occupancy patterns, and weather effects. This comprehensive baseline is essential for accurate post-retrofit savings verification using regression analysis."
  },
  {
    id: 5,
    question: "Type B LED retrofit tubes require:",
    options: [
      "No modifications to existing fittings",
      "Ballast bypass - direct mains connection to lamp holders",
      "Complete fitting replacement",
      "Addition of an external LED driver"
    ],
    correctAnswer: 1,
    explanation: "Type B LED tubes operate directly from mains voltage and require the existing ballast to be bypassed. This involves isolating the ballast and connecting live and neutral directly to the lamp holders - work requiring a competent person."
  },
  {
    id: 6,
    question: "IPMVP Option A is most appropriate when:",
    options: [
      "Whole building savings must be verified",
      "Individual retrofit measures can be isolated and metered",
      "No metering is available",
      "Multiple interactive measures are installed simultaneously"
    ],
    correctAnswer: 1,
    explanation: "Option A (Retrofit Isolation: Key Parameter Measurement) is suitable when specific retrofit measures can be isolated and key parameters metered. It uses spot or short-term measurements with engineering calculations for other variables."
  },
  {
    id: 7,
    question: "Post-retrofit commissioning of lighting systems should verify:",
    options: [
      "Only that lights switch on",
      "Light levels, control functionality, and energy consumption",
      "Only energy consumption",
      "Colour temperature only"
    ],
    correctAnswer: 1,
    explanation: "Comprehensive commissioning verifies illuminance levels meet design requirements, control systems function correctly (sensors, dimming, scheduling), and energy consumption aligns with predicted savings."
  },
  {
    id: 8,
    question: "When calculating LED retrofit savings, the control factor accounts for:",
    options: [
      "The quality of installation workmanship",
      "Additional savings from occupancy sensors, daylight dimming, and scheduling",
      "The LED manufacturer's warranty period",
      "The disposal costs of old equipment"
    ],
    correctAnswer: 1,
    explanation: "The control factor multiplies baseline savings by the additional reduction achieved through intelligent controls. Occupancy sensing typically adds 20-30% savings, daylight dimming 15-25%, and scheduling 5-15% beyond lamp efficiency gains."
  },
  {
    id: 9,
    question: "Net Present Value (NPV) for retrofit projects considers:",
    options: [
      "Only the initial investment cost",
      "Cash flows over the project life discounted to present value",
      "Only the annual energy savings",
      "The payback period multiplied by annual savings"
    ],
    correctAnswer: 1,
    explanation: "NPV calculates the present value of all future cash flows (savings minus costs) over the project's life, discounted at an appropriate rate. A positive NPV indicates the project exceeds the required return on investment."
  },
  {
    id: 10,
    question: "Interactive effects in retrofit projects refer to:",
    options: [
      "User interface design for control systems",
      "How one efficiency measure affects the savings of another",
      "Communication between building systems",
      "Stakeholder engagement processes"
    ],
    correctAnswer: 1,
    explanation: "Interactive effects describe how efficiency measures influence each other. For example, LED lighting generates less heat, reducing cooling loads but potentially increasing heating requirements - these interactions must be considered in savings calculations."
  },
  {
    id: 11,
    question: "A lighting power density reduction from 12 W/m² to 6 W/m² in a 1,000 m² office represents:",
    options: [
      "6 kW of connected load reduction",
      "50% reduction in lighting energy consumption",
      "Both a 6 kW reduction and 50% improvement",
      "12 kW of savings"
    ],
    correctAnswer: 2,
    explanation: "The retrofit reduces connected load by 6 kW (12-6 W/m² × 1,000 m²) which is a 50% reduction. Annual energy savings depend on operating hours - at 2,500 hours/year, this equals 15,000 kWh annually."
  },
  {
    id: 12,
    question: "The regression model baseline adjustment in IPMVP accounts for:",
    options: [
      "Inflation in energy prices",
      "Changes in independent variables like weather and occupancy",
      "Equipment degradation over time",
      "Measurement uncertainty only"
    ],
    correctAnswer: 1,
    explanation: "Regression analysis adjusts the baseline for changes in independent variables (weather, occupancy, production) between pre and post-retrofit periods. This isolates the retrofit's impact from other factors affecting consumption."
  }
];

const faqs = [
  {
    question: "How do I determine whether to retrofit or replace lighting fittings entirely?",
    answer: "Consider fitting age, condition, and compatibility. Retrofit (e.g., LED tubes in existing fittings) suits newer fixtures in good condition with compatible components. Complete replacement is preferred when fittings are aged, contain degraded components, or when modern integrated LED luminaires offer significantly better performance. Whole-fitting replacement also avoids ballast compatibility issues and typically provides better aesthetics and longer warranties."
  },
  {
    question: "What baseline data is essential before commencing a retrofit project?",
    answer: "Essential baseline data includes: 12 months of utility consumption data (metered kWh), installed equipment inventory (types, quantities, wattages), operating schedules and occupancy patterns, lighting levels survey (lux readings), and any sub-metering data available. For IPMVP compliance, document independent variables like weather data, occupancy, and production metrics that correlate with energy use."
  },
  {
    question: "How should I handle retrofit projects where the client wants minimal disruption?",
    answer: "Plan out-of-hours installation where possible, phase the work by zones/floors to maintain operational areas, use quick-installation products designed for retrofit (e.g., magnetic LED panels), coordinate with building management for optimal timing, and ensure all materials are pre-delivered and staged. Provide clear communication on affected areas and duration. Consider weekend or holiday shutdown periods for intensive work phases."
  },
  {
    question: "What warranties should I expect from LED retrofit products?",
    answer: "Quality LED products typically offer 5-year warranties covering luminous flux maintenance (L70 or L80 rating), driver failure, and material defects. Premium products may offer 7-10 year warranties. Ensure warranties are manufacturer-backed (not just distributor), cover labour costs for replacement, and specify conditions (operating hours, temperature limits, surge protection). Driver warranties often differ from LED chip warranties - verify both."
  },
  {
    question: "How do carbon savings factor into retrofit business cases?",
    answer: "Carbon savings strengthen business cases through: potential income from carbon credits or certificates, compliance with mandatory carbon reporting requirements, contribution to corporate sustainability targets, and reputational benefits. Calculate carbon savings using grid emission factors (currently approximately 0.21 kgCO₂/kWh for UK grid). Some organisations apply internal carbon pricing (£50-100/tonne CO₂) which can significantly improve project NPV."
  },
  {
    question: "What ongoing monitoring should follow a retrofit project?",
    answer: "Implement continuous or regular monitoring including: monthly energy consumption tracking against predicted savings, periodic lighting level verification (annually minimum), control system functionality checks, maintenance logging for failures and replacements, and user feedback collection. Compare actual versus predicted performance and investigate significant variances. This data supports warranty claims, future project planning, and demonstrates value to stakeholders."
  }
];

const HNCModule7Section5_6 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module7-section5">
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
            <span>Module 7.5.6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Efficiency Retrofits
          </h1>
          <p className="text-white/80">
            Assessment methodology, business case development, implementation planning, and verification of savings
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Energy audit:</strong> Systematic assessment of saving opportunities</li>
              <li className="pl-1"><strong>Business case:</strong> Payback, NPV, and ROI analysis</li>
              <li className="pl-1"><strong>Implementation:</strong> Phased approach with minimal disruption</li>
              <li className="pl-1"><strong>IPMVP:</strong> Standardised verification of achieved savings</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>LED retrofits:</strong> 50-70% lighting energy reduction typical</li>
              <li className="pl-1"><strong>Controls upgrade:</strong> Additional 20-40% savings potential</li>
              <li className="pl-1"><strong>Payback target:</strong> 2-5 years for commercial projects</li>
              <li className="pl-1"><strong>M&amp;V period:</strong> Minimum 12 months post-retrofit</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Conduct systematic energy audits at appropriate levels",
              "Develop compelling business cases with financial analysis",
              "Plan and specify LED retrofit projects safely",
              "Apply IPMVP methodology for savings verification",
              "Commission retrofit installations effectively",
              "Implement post-retrofit monitoring and reporting"
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

        {/* Section 1: Assessment Methodology */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Assessment Methodology and Energy Audits
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Effective retrofit planning begins with systematic energy assessment. Energy audits identify
              opportunities, quantify potential savings, and provide the data foundation for business case
              development and project specification.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Energy Audit Levels (ASHRAE Standard):</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Level 1 - Walk-through audit:</strong> Visual inspection, utility bill analysis, identifies obvious opportunities</li>
                <li className="pl-1"><strong>Level 2 - General audit:</strong> Detailed analysis, equipment inventory, calculated savings estimates</li>
                <li className="pl-1"><strong>Level 3 - Investment-grade audit:</strong> Engineering analysis, monitoring data, life-cycle costing for capital decisions</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Audit Level Selection Guide</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Audit Level</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Duration</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Data Collection</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Best Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Level 1</td>
                      <td className="border border-white/10 px-3 py-2">1-2 days</td>
                      <td className="border border-white/10 px-3 py-2">Visual, utility bills</td>
                      <td className="border border-white/10 px-3 py-2">Initial screening, small buildings</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Level 2</td>
                      <td className="border border-white/10 px-3 py-2">1-2 weeks</td>
                      <td className="border border-white/10 px-3 py-2">Inventory, spot measurements</td>
                      <td className="border border-white/10 px-3 py-2">Standard commercial projects</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Level 3</td>
                      <td className="border border-white/10 px-3 py-2">4-8 weeks</td>
                      <td className="border border-white/10 px-3 py-2">Extended monitoring, modelling</td>
                      <td className="border border-white/10 px-3 py-2">Major investments, complex buildings</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Lighting Survey Requirements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Equipment inventory:</strong> Lamp types, wattages, quantities, control gear</li>
                <li className="pl-1"><strong>Operating hours:</strong> Actual usage patterns, not assumptions</li>
                <li className="pl-1"><strong>Illuminance levels:</strong> Measured lux at task plane</li>
                <li className="pl-1"><strong>Control systems:</strong> Existing sensors, switches, scheduling</li>
                <li className="pl-1"><strong>Condition assessment:</strong> Fitting age, maintenance state, failures</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Best practice:</strong> Use data loggers to capture actual operating hours rather than relying on stated schedules - real usage often differs significantly from design assumptions.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Business Case Development */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Business Case Development
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A compelling business case translates technical savings into financial terms that stakeholders
              understand. Effective business cases address investment requirements, returns, risks, and
              non-financial benefits.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Capital Costs</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Equipment procurement</li>
                  <li className="pl-1">Installation labour</li>
                  <li className="pl-1">Control system upgrades</li>
                  <li className="pl-1">Professional fees</li>
                  <li className="pl-1">Disposal costs</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Revenue Benefits</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Energy cost savings</li>
                  <li className="pl-1">Maintenance reduction</li>
                  <li className="pl-1">Carbon credit value</li>
                  <li className="pl-1">Enhanced Capital Allowances</li>
                  <li className="pl-1">Avoided replacement costs</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Non-Financial Benefits</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Improved light quality</li>
                  <li className="pl-1">Reduced maintenance disruption</li>
                  <li className="pl-1">Corporate sustainability</li>
                  <li className="pl-1">Regulatory compliance</li>
                  <li className="pl-1">Occupant satisfaction</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Financial Analysis Methods</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Metric</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Calculation</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Target</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Simple Payback</td>
                      <td className="border border-white/10 px-3 py-2">Capital Cost ÷ Annual Savings</td>
                      <td className="border border-white/10 px-3 py-2">&lt; 5 years</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Net Present Value (NPV)</td>
                      <td className="border border-white/10 px-3 py-2">∑ Discounted Cash Flows - Initial Investment</td>
                      <td className="border border-white/10 px-3 py-2">&gt; £0 (positive)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Internal Rate of Return (IRR)</td>
                      <td className="border border-white/10 px-3 py-2">Discount rate where NPV = 0</td>
                      <td className="border border-white/10 px-3 py-2">&gt; 15% typically</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Return on Investment (ROI)</td>
                      <td className="border border-white/10 px-3 py-2">(Net Benefit ÷ Cost) × 100%</td>
                      <td className="border border-white/10 px-3 py-2">&gt; 20% annually</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Sample Payback Calculation</p>
              <div className="font-mono text-sm space-y-1">
                <p><span className="text-white/60">Project:</span> <span className="text-white">Office LED Retrofit - 500 fittings</span></p>
                <p><span className="text-white/60">Capital cost:</span> <span className="text-white">£45,000 (equipment + installation)</span></p>
                <p><span className="text-white/60">Energy saving:</span> <span className="text-white">75,000 kWh/year @ £0.30/kWh = £22,500/year</span></p>
                <p><span className="text-white/60">Maintenance saving:</span> <span className="text-white">£3,500/year</span></p>
                <p><span className="text-white/60">Total annual saving:</span> <span className="text-white">£26,000</span></p>
                <p className="mt-2 text-green-400">Simple payback: £45,000 ÷ £26,000 = 1.7 years</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Stakeholder tip:</strong> Present payback for finance teams, NPV for senior management, and carbon savings for sustainability officers - tailor metrics to audience.
            </p>
          </div>
        </section>

        {/* Section 3: LED Retrofit Considerations */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            LED Retrofit Considerations and Implementation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              LED retrofits offer substantial energy savings but require careful specification and
              installation. Understanding retrofit options, compatibility requirements, and installation
              safety is essential for successful projects.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">LED Retrofit Tube Types</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Ballast Requirement</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Installation Complexity</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Safety Consideration</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Type A</td>
                      <td className="border border-white/10 px-3 py-2">Works with existing ballast</td>
                      <td className="border border-white/10 px-3 py-2">Simple lamp swap</td>
                      <td className="border border-white/10 px-3 py-2">Ballast compatibility critical</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Type B</td>
                      <td className="border border-white/10 px-3 py-2">Ballast bypass required</td>
                      <td className="border border-white/10 px-3 py-2">Rewiring needed</td>
                      <td className="border border-white/10 px-3 py-2">Mains voltage at lamp holder</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Type C</td>
                      <td className="border border-white/10 px-3 py-2">External LED driver</td>
                      <td className="border border-white/10 px-3 py-2">Driver installation</td>
                      <td className="border border-white/10 px-3 py-2">Correct driver matching</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Type A+B (Hybrid)</td>
                      <td className="border border-white/10 px-3 py-2">Either mode</td>
                      <td className="border border-white/10 px-3 py-2">Flexible installation</td>
                      <td className="border border-white/10 px-3 py-2">Clear labelling essential</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Critical Safety Warning - Type B Installation</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Type B tubes have mains voltage directly at lamp pins</li>
                <li className="pl-1">Fitting must be permanently modified and labelled for LED only</li>
                <li className="pl-1">Installation by competent persons under BS 7671 only</li>
                <li className="pl-1">Clear warning labels must prevent fluorescent tube reinsertion</li>
                <li className="pl-1">Single-ended connection (live + neutral one end) preferred for safety</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Implementation Planning Checklist</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Site survey:</strong> Confirm fitting types, access requirements, electrical infrastructure</li>
                <li className="pl-1"><strong>Specification:</strong> Lumen output, colour temperature, CRI, beam angle, dimming compatibility</li>
                <li className="pl-1"><strong>Phasing:</strong> Plan installation by zones to maintain building operation</li>
                <li className="pl-1"><strong>Access equipment:</strong> Scaffold, MEWP, or tower requirements</li>
                <li className="pl-1"><strong>Disposal:</strong> WEEE compliant removal of fluorescent lamps and control gear</li>
                <li className="pl-1"><strong>Documentation:</strong> Updated drawings, O&amp;M manuals, test certificates</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Control System Upgrades</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-white mb-2">Occupancy Sensing</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>PIR or microwave detection</li>
                    <li>Presence/absence modes</li>
                    <li>Typical saving: 20-30%</li>
                    <li>Best for: toilets, corridors, meeting rooms</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-2">Daylight Dimming</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>Photocell control</li>
                    <li>Maintains target lux level</li>
                    <li>Typical saving: 15-25%</li>
                    <li>Best for: perimeter zones, atria</li>
                  </ul>
                </div>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Specification tip:</strong> Always specify colour temperature consistently (e.g., 4000K throughout) - mixing creates visual discomfort and complaints.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: IPMVP Verification */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            IPMVP Verification and Post-Retrofit Commissioning
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The International Performance Measurement and Verification Protocol (IPMVP) provides
              standardised methods for quantifying energy savings. Proper verification demonstrates
              project success and supports warranty claims, incentive applications, and future projects.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">IPMVP Option Selection</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Option</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Method</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Best Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Option A</td>
                      <td className="border border-white/10 px-3 py-2">Retrofit isolation: key parameter measurement</td>
                      <td className="border border-white/10 px-3 py-2">Single isolated measures, lighting retrofits</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Option B</td>
                      <td className="border border-white/10 px-3 py-2">Retrofit isolation: all parameter measurement</td>
                      <td className="border border-white/10 px-3 py-2">Variable loads, motors, chillers</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Option C</td>
                      <td className="border border-white/10 px-3 py-2">Whole facility: utility metering</td>
                      <td className="border border-white/10 px-3 py-2">Multiple measures, whole building approach</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Option D</td>
                      <td className="border border-white/10 px-3 py-2">Calibrated simulation</td>
                      <td className="border border-white/10 px-3 py-2">Complex buildings, new construction</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">IPMVP Savings Equation</p>
              <div className="font-mono text-sm space-y-1">
                <p className="text-white">Energy Savings = (Baseline Energy - Reporting Period Energy) ± Adjustments</p>
                <p className="mt-2 text-white/80">Where adjustments account for:</p>
                <p className="ml-4 text-white/80">• Changes in weather (degree days)</p>
                <p className="ml-4 text-white/80">• Changes in occupancy</p>
                <p className="ml-4 text-white/80">• Changes in operating hours</p>
                <p className="ml-4 text-white/80">• Changes in production (if applicable)</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Post-Retrofit Commissioning Requirements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Illuminance verification:</strong> Measure lux levels at task plane against design specification</li>
                <li className="pl-1"><strong>Power measurement:</strong> Confirm actual wattage matches specification</li>
                <li className="pl-1"><strong>Control functionality:</strong> Test all sensors, dimmers, scheduling, and override functions</li>
                <li className="pl-1"><strong>Emergency lighting:</strong> Full duration test of maintained and non-maintained fittings</li>
                <li className="pl-1"><strong>Documentation:</strong> As-built drawings, test certificates, programming records</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">M&amp;V Reporting Timeline</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-white mb-2">Short-term (0-3 months)</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>Commissioning completion report</li>
                    <li>Initial power measurements</li>
                    <li>Control system verification</li>
                    <li>Snagging resolution</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-2">Long-term (12+ months)</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>Full year energy comparison</li>
                    <li>Regression-adjusted baseline</li>
                    <li>Verified savings calculation</li>
                    <li>Performance guarantee assessment</li>
                  </ul>
                </div>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Verification principle:</strong> Savings cannot be directly measured - they represent the absence of energy use. IPMVP provides the methodology to calculate what would have been consumed without the retrofit.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: LED Retrofit Savings Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Calculate annual savings for an office lighting retrofit.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Existing system:</p>
                <p className="ml-4">100 × T8 fluorescent fittings, 2 × 58W lamps + HF ballast</p>
                <p className="ml-4">Total load: 100 × 116W = 11.6 kW</p>
                <p className="ml-4">Operating hours: 2,500 hours/year</p>
                <p className="ml-4">Annual consumption: 11.6 × 2,500 = 29,000 kWh</p>
                <p className="mt-2 text-white/60">Proposed LED system:</p>
                <p className="ml-4">100 × LED panels, 40W each = 4.0 kW</p>
                <p className="ml-4">Annual consumption: 4.0 × 2,500 = 10,000 kWh</p>
                <p className="mt-2 text-white/60">Savings calculation:</p>
                <p className="ml-4">Energy saved: 29,000 - 10,000 = 19,000 kWh/year</p>
                <p className="ml-4">At £0.30/kWh: 19,000 × 0.30 = £5,700/year</p>
                <p className="ml-4">With occupancy controls (+25%): £5,700 × 1.25 = £7,125/year</p>
                <p className="mt-2 text-green-400">Total annual saving: £7,125 (75% reduction)</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: NPV Analysis for Retrofit Investment</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Evaluate a £50,000 retrofit with £15,000 annual savings over 10 years.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Parameters:</p>
                <p className="ml-4">Initial investment: £50,000</p>
                <p className="ml-4">Annual savings: £15,000</p>
                <p className="ml-4">Project life: 10 years</p>
                <p className="ml-4">Discount rate: 8%</p>
                <p className="mt-2 text-white/60">NPV calculation:</p>
                <p className="ml-4">Present value of annuity factor (8%, 10 years): 6.71</p>
                <p className="ml-4">PV of savings: £15,000 × 6.71 = £100,650</p>
                <p className="ml-4">NPV: £100,650 - £50,000 = £50,650</p>
                <p className="mt-2 text-white/60">Simple payback: £50,000 ÷ £15,000 = 3.3 years</p>
                <p className="mt-2 text-green-400">Decision: Positive NPV = proceed with investment</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Baseline Adjustment Using Regression</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Adjust baseline consumption for weather changes using IPMVP Option C.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Baseline period (pre-retrofit):</p>
                <p className="ml-4">Annual consumption: 450,000 kWh</p>
                <p className="ml-4">Heating degree days (HDD): 2,200</p>
                <p className="ml-4">Cooling degree days (CDD): 150</p>
                <p className="mt-2 text-white/60">Regression model: kWh = 180,000 + (100 × HDD) + (200 × CDD)</p>
                <p className="mt-2 text-white/60">Reporting period (post-retrofit):</p>
                <p className="ml-4">Actual consumption: 320,000 kWh</p>
                <p className="ml-4">HDD: 2,400 (colder year)</p>
                <p className="ml-4">CDD: 180 (warmer summer)</p>
                <p className="mt-2 text-white/60">Adjusted baseline:</p>
                <p className="ml-4">180,000 + (100 × 2,400) + (200 × 180) = 456,000 kWh</p>
                <p className="mt-2 text-green-400">Verified savings: 456,000 - 320,000 = 136,000 kWh (30%)</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Retrofit Project Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Complete energy audit at appropriate level (1, 2, or 3)</li>
                <li className="pl-1">Establish 12-month baseline with metering and weather data</li>
                <li className="pl-1">Develop business case with payback, NPV, and non-financial benefits</li>
                <li className="pl-1">Specify retrofit approach (lamp replacement vs complete fitting)</li>
                <li className="pl-1">Plan installation phasing to minimise operational disruption</li>
                <li className="pl-1">Commission and verify against design specification</li>
                <li className="pl-1">Implement ongoing M&amp;V programme per IPMVP</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Typical LED retrofit savings: <strong>50-70%</strong> energy reduction</li>
                <li className="pl-1">Control system additions: <strong>20-40%</strong> additional savings</li>
                <li className="pl-1">Target payback period: <strong>2-5 years</strong> for commercial</li>
                <li className="pl-1">Baseline period: <strong>12 months</strong> minimum for M&amp;V</li>
                <li className="pl-1">LED lamp life: <strong>50,000+ hours</strong> (L70 rating)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Over-estimating savings</strong> - Use measured data, not manufacturer claims</li>
                <li className="pl-1"><strong>Ignoring interactive effects</strong> - Less heat from LEDs affects HVAC loads</li>
                <li className="pl-1"><strong>Wrong tube type selection</strong> - Type B in Type A fitting causes safety risk</li>
                <li className="pl-1"><strong>Insufficient baseline</strong> - Short periods miss seasonal variations</li>
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
                <p className="font-medium text-white mb-1">Audit Levels</p>
                <ul className="space-y-0.5">
                  <li>Level 1: Walk-through (1-2 days)</li>
                  <li>Level 2: General (1-2 weeks)</li>
                  <li>Level 3: Investment-grade (4-8 weeks)</li>
                  <li>Selection based on project value and complexity</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">IPMVP Options</p>
                <ul className="space-y-0.5">
                  <li>Option A: Retrofit isolation, key parameters</li>
                  <li>Option B: Retrofit isolation, all parameters</li>
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
            <Link to="../h-n-c-module7-section5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module7-section6-1">
              Next: Section 6.1
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule7Section5_6;
