import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Value Engineering - HNC Module 5 Section 3.6";
const DESCRIPTION = "Master value engineering for building services: options analysis, life cycle costing, whole life value assessment, NPV calculations, energy efficiency payback, and cost-benefit evaluation for MEP systems.";

const quickCheckQuestions = [
  {
    id: "value-engineering-def",
    question: "What is the primary objective of value engineering?",
    options: ["To reduce initial capital cost only", "To maximise function whilst minimising whole life cost", "To specify the cheapest equipment available", "To eliminate design consultants"],
    correctIndex: 1,
    explanation: "Value engineering seeks to maximise function (what the system does) whilst minimising whole life cost. It considers capital, operating, maintenance, and disposal costs over the asset's lifespan."
  },
  {
    id: "life-cycle-cost",
    question: "Which costs are included in life cycle costing for MEP systems?",
    options: ["Capital costs only", "Capital and energy costs only", "Capital, operating, maintenance, and disposal costs", "Only costs within the defects liability period"],
    correctIndex: 2,
    explanation: "Life cycle costing (LCC) includes all costs over the asset's life: capital/installation, energy/operating, maintenance/repair, and eventual disposal or replacement costs."
  },
  {
    id: "npv-purpose",
    question: "Net Present Value (NPV) is used to:",
    options: ["Calculate VAT on equipment", "Compare costs occurring at different times", "Determine electrical load requirements", "Assess contractor competence"],
    correctIndex: 1,
    explanation: "NPV adjusts future costs to present-day values using a discount rate, allowing fair comparison of options with different cost profiles over time."
  },
  {
    id: "ve-workshop",
    question: "When should a value engineering workshop ideally take place?",
    options: ["After construction is complete", "During snagging", "At RIBA Stage 2-3 (Concept/Spatial Coordination)", "Only if the project is over budget"],
    correctIndex: 2,
    explanation: "Value engineering is most effective at RIBA Stage 2-3 when design decisions can still be changed without significant abortive costs. Later changes are increasingly expensive."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the fundamental equation used in value engineering?",
    options: [
      "Value = Cost / Function",
      "Value = Function / Cost",
      "Value = Capital Cost + Operating Cost",
      "Value = Specification / Budget"
    ],
    correctAnswer: 1,
    explanation: "Value = Function / Cost. Value engineering seeks to increase function (performance, reliability, capability) or reduce cost, or both, to maximise value."
  },
  {
    id: 2,
    question: "A chiller costs £80,000 with annual running costs of £12,000 over 15 years. Using simple payback, what is the total life cycle cost?",
    options: ["£80,000", "£180,000", "£260,000", "£92,000"],
    correctAnswer: 2,
    explanation: "Simple LCC = Capital + (Annual cost × Years) = £80,000 + (£12,000 × 15) = £80,000 + £180,000 = £260,000"
  },
  {
    id: 3,
    question: "Option A costs £50,000 initially with £8,000/year running costs. Option B costs £70,000 initially with £5,000/year running costs. Over 10 years (simple method), which has lower life cycle cost?",
    options: ["Option A: £130,000", "Option B: £120,000", "Both are equal", "Cannot be determined"],
    correctAnswer: 1,
    explanation: "Option A: £50,000 + (£8,000 × 10) = £130,000. Option B: £70,000 + (£5,000 × 10) = £120,000. Option B has lower LCC despite higher capital cost."
  },
  {
    id: 4,
    question: "What discount rate is typically used for public sector building services projects in the UK?",
    options: ["2.5%", "3.5%", "5.0%", "10.0%"],
    correctAnswer: 1,
    explanation: "The HM Treasury Green Book specifies 3.5% discount rate for public sector projects. Private sector often uses higher rates (8-12%) reflecting cost of capital."
  },
  {
    id: 5,
    question: "Simple payback period for an energy efficiency measure is calculated as:",
    options: [
      "Annual savings × Investment cost",
      "Investment cost ÷ Annual savings",
      "Annual savings ÷ Investment cost",
      "Investment cost × Discount rate"
    ],
    correctAnswer: 1,
    explanation: "Simple payback = Investment cost ÷ Annual savings. For example, £10,000 investment saving £2,500/year has a 4-year payback period."
  },
  {
    id: 6,
    question: "Which function analysis technique identifies the primary and secondary functions of a component?",
    options: ["SWOT analysis", "FAST diagram", "Gantt chart", "Critical path method"],
    correctAnswer: 1,
    explanation: "Function Analysis System Technique (FAST) diagrams show how functions relate hierarchically, helping identify which functions are essential and which are secondary."
  },
  {
    id: 7,
    question: "When comparing LED lighting against fluorescent, which factors should be included in the life cycle cost analysis?",
    options: [
      "Lamp purchase price only",
      "Purchase price and energy costs only",
      "Purchase, energy, maintenance, lamp replacement, and disposal costs",
      "Whatever costs are easiest to calculate"
    ],
    correctAnswer: 2,
    explanation: "A comprehensive LCC includes capital (luminaires, installation), energy consumption, maintenance labour, lamp/driver replacement frequency, and disposal/recycling costs."
  },
  {
    id: 8,
    question: "The maintenance cost projection for a building services system should consider:",
    options: [
      "Only planned preventive maintenance",
      "Only reactive breakdown repairs",
      "PPM, reactive repairs, component replacement cycles, and eventual major refurbishment",
      "Whatever the manufacturer states"
    ],
    correctAnswer: 2,
    explanation: "Maintenance projections must include planned preventive maintenance (PPM), reactive repairs (statistically estimated), component lifecycle replacements, and eventual system refurbishment or replacement."
  },
  {
    id: 9,
    question: "A VRF system costs £120,000 more than a split system but saves £15,000/year in energy. What is the simple payback?",
    options: ["6 years", "8 years", "10 years", "12 years"],
    correctAnswer: 1,
    explanation: "Simple payback = Additional cost ÷ Annual saving = £120,000 ÷ £15,000 = 8 years"
  },
  {
    id: 10,
    question: "Which statement about whole life value assessment is correct?",
    options: [
      "It only considers tangible financial costs",
      "It includes sustainability, resilience, and non-financial benefits",
      "It always favours the cheapest capital option",
      "It is only relevant for projects over £10 million"
    ],
    correctAnswer: 1,
    explanation: "Whole life value assessment extends beyond financial LCC to include sustainability impacts, operational flexibility, resilience, user satisfaction, and other non-financial value factors."
  }
];

const faqs = [
  {
    question: "What is the difference between value engineering and cost cutting?",
    answer: "Cost cutting simply removes scope or specifies cheaper alternatives without considering function. Value engineering systematically analyses functions to find alternative ways of achieving the same (or better) outcomes at lower whole life cost. VE maintains or improves function; cost cutting often degrades it."
  },
  {
    question: "How do I choose an appropriate discount rate for NPV calculations?",
    answer: "For public sector projects, use the HM Treasury Green Book rate (3.5% standard, 3.0% for 31-75 years). For private sector, use the client's weighted average cost of capital (WACC), typically 8-12%. Higher discount rates favour options with lower capital cost; lower rates favour energy-efficient options with higher capital but lower running costs."
  },
  {
    question: "What data sources are reliable for life cycle cost projections?",
    answer: "Use CIBSE Guide M for maintenance benchmarks, TM54 for operational energy, manufacturer data for equipment lifespans, BSRIA rules of thumb for costs, and historical data from similar buildings. Always validate assumptions with facilities management teams and cross-reference multiple sources."
  },
  {
    question: "How long should the analysis period be for building services LCC?",
    answer: "Typically 20-25 years for whole building analysis, matching major refurbishment cycles. Individual components may have shorter periods: lighting 15-20 years, HVAC plant 15-20 years, controls 10-15 years. Align with the client's investment horizon and any lease terms."
  },
  {
    question: "Can value engineering be applied after the design is complete?",
    answer: "Value engineering can be applied at any stage but becomes progressively less effective and more costly. At tender stage, changes may delay the programme and require redesign fees. During construction, changes involve abortive work. The optimal time is RIBA Stage 2-3 when design flexibility is greatest."
  },
  {
    question: "How do I quantify the value of energy efficiency beyond cost savings?",
    answer: "Consider: carbon pricing/trading value, Enhanced Capital Allowances for qualifying equipment, improved EPC/DEC ratings affecting rental values, corporate sustainability reporting requirements, reduced exposure to energy price volatility, and potential funding eligibility (Salix, Heat Networks). These factors can significantly affect investment decisions."
  }
];

const HNCModule5Section3_6 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module5-section3">
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
            <span>Module 5.3.6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Value Engineering
          </h1>
          <p className="text-white/80">
            Options analysis, life cycle costing, whole life value assessment, and cost-benefit evaluation for building services
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Value:</strong> Function divided by whole life cost</li>
              <li className="pl-1"><strong>Life cycle costing:</strong> Capital + operating + maintenance + disposal</li>
              <li className="pl-1"><strong>NPV:</strong> Compares costs occurring at different times</li>
              <li className="pl-1"><strong>Best timing:</strong> RIBA Stage 2-3 for maximum impact</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Energy:</strong> Often 50-70% of MEP life cycle cost</li>
              <li className="pl-1"><strong>Maintenance:</strong> 20-30% of life cycle cost typically</li>
              <li className="pl-1"><strong>Analysis period:</strong> Usually 20-25 years</li>
              <li className="pl-1"><strong>Discount rate:</strong> 3.5% public, 8-12% private</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Apply value engineering principles to building services design",
              "Conduct function analysis for MEP system components",
              "Calculate life cycle costs for equipment alternatives",
              "Use NPV and simple payback for investment decisions",
              "Assess whole life value including non-financial factors",
              "Facilitate effective value engineering workshops"
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

        {/* Section 1: Value Engineering Fundamentals */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Value Engineering Fundamentals
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Value engineering (VE) is a systematic method for improving value by analysing functions
              and identifying alternative ways to achieve them at lower whole life cost. Unlike simple
              cost cutting, VE maintains or enhances function whilst optimising resources.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Value Equation</p>
              <p className="font-mono text-center text-lg mb-2">Value = Function / Cost</p>
              <p className="text-xs text-white/70 text-center">Value increases when function rises or cost falls (or both)</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key principles:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Function focus:</strong> What does the system do, not what is it</li>
                <li className="pl-1"><strong>Whole life perspective:</strong> Consider all costs over the asset's life</li>
                <li className="pl-1"><strong>Multi-disciplinary approach:</strong> Involves all stakeholders</li>
                <li className="pl-1"><strong>Creative solutions:</strong> Challenge assumptions and constraints</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">VE Job Plan (SAVE Standard)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Phase</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Activities</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Output</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">1. Information</td>
                      <td className="border border-white/10 px-3 py-2">Gather project data, understand constraints</td>
                      <td className="border border-white/10 px-3 py-2">Baseline understanding</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">2. Function Analysis</td>
                      <td className="border border-white/10 px-3 py-2">Identify and classify functions</td>
                      <td className="border border-white/10 px-3 py-2">FAST diagram</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">3. Creative</td>
                      <td className="border border-white/10 px-3 py-2">Brainstorm alternative solutions</td>
                      <td className="border border-white/10 px-3 py-2">Ideas list</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">4. Evaluation</td>
                      <td className="border border-white/10 px-3 py-2">Screen and rank ideas</td>
                      <td className="border border-white/10 px-3 py-2">Shortlisted options</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">5. Development</td>
                      <td className="border border-white/10 px-3 py-2">Develop proposals with costings</td>
                      <td className="border border-white/10 px-3 py-2">VE proposals</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">6. Presentation</td>
                      <td className="border border-white/10 px-3 py-2">Present recommendations to client</td>
                      <td className="border border-white/10 px-3 py-2">Decision and implementation</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Building services insight:</strong> MEP systems typically represent 30-40% of construction cost but 70-80% of operational cost, making them prime candidates for VE analysis.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Function Analysis and Options Development */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Function Analysis and Options Development
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Function analysis is the core of value engineering. By understanding what a system
              must do (rather than what it is), alternative solutions become apparent. Functions
              are expressed as verb-noun pairs to maintain objectivity.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Function Classification</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Basic Functions</p>
                  <p className="text-sm text-white/80 mb-2">The primary reason the system exists</p>
                  <ul className="text-sm text-white/80 space-y-1 list-disc list-outside ml-4">
                    <li>Chiller: "Cool space"</li>
                    <li>Generator: "Provide power"</li>
                    <li>Lighting: "Illuminate area"</li>
                    <li>Ventilation: "Supply air"</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Secondary Functions</p>
                  <p className="text-sm text-white/80 mb-2">Support the basic function or add features</p>
                  <ul className="text-sm text-white/80 space-y-1 list-disc list-outside ml-4">
                    <li>Chiller: "Control humidity"</li>
                    <li>Generator: "Reduce noise"</li>
                    <li>Lighting: "Create ambience"</li>
                    <li>Ventilation: "Filter particles"</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Example: HVAC Options Analysis</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Option</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Capital Cost</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Efficiency</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Flexibility</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">VAV air handling</td>
                      <td className="border border-white/10 px-3 py-2">Medium</td>
                      <td className="border border-white/10 px-3 py-2">Good</td>
                      <td className="border border-white/10 px-3 py-2">Moderate</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">VRF with DOAS</td>
                      <td className="border border-white/10 px-3 py-2">Higher</td>
                      <td className="border border-white/10 px-3 py-2">Excellent</td>
                      <td className="border border-white/10 px-3 py-2">High</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Chilled beams</td>
                      <td className="border border-white/10 px-3 py-2">High</td>
                      <td className="border border-white/10 px-3 py-2">Very good</td>
                      <td className="border border-white/10 px-3 py-2">Low</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fan coil units</td>
                      <td className="border border-white/10 px-3 py-2">Lower</td>
                      <td className="border border-white/10 px-3 py-2">Moderate</td>
                      <td className="border border-white/10 px-3 py-2">High</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Real-World Example: Office Lighting VE</p>
              <p className="text-sm text-white mb-2">
                <strong>Original specification:</strong> High-end architectural luminaires at £180/m2
              </p>
              <p className="text-sm text-white mb-2">
                <strong>Function analysis:</strong> Basic function is "illuminate workspace" (300-500 lux)
              </p>
              <p className="text-sm text-white">
                <strong>VE solution:</strong> Standard LED luminaires (£85/m2) with feature lighting in reception only.
                Saves £95/m2 whilst maintaining function. Feature areas enhanced, general areas adequate.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Workshop tip:</strong> Use "How/Why" logic testing - asking "How?" moves down the FAST diagram (more specific), asking "Why?" moves up (more abstract).
            </p>
          </div>
        </section>

        {/* Section 3: Life Cycle Costing Methods */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Life Cycle Costing Methods
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Life cycle costing (LCC) evaluates the total cost of ownership over an asset's life.
              For building services, energy and maintenance costs often exceed the initial capital
              cost, making LCC essential for informed decision-making.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Life Cycle Cost Components</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Cost Category</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Includes</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical % (HVAC)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Capital</td>
                      <td className="border border-white/10 px-3 py-2">Equipment, installation, commissioning</td>
                      <td className="border border-white/10 px-3 py-2">15-25%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Energy/Operating</td>
                      <td className="border border-white/10 px-3 py-2">Electricity, gas, water consumption</td>
                      <td className="border border-white/10 px-3 py-2">50-70%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Maintenance</td>
                      <td className="border border-white/10 px-3 py-2">PPM, reactive repairs, consumables</td>
                      <td className="border border-white/10 px-3 py-2">15-25%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Replacement</td>
                      <td className="border border-white/10 px-3 py-2">Component renewal during life</td>
                      <td className="border border-white/10 px-3 py-2">5-15%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Disposal</td>
                      <td className="border border-white/10 px-3 py-2">Removal, recycling, remediation</td>
                      <td className="border border-white/10 px-3 py-2">1-5%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Simple Life Cycle Cost Calculation</p>
              <p className="font-mono text-center text-base mb-2">LCC = Capital + (Annual Operating × Years) + Replacements</p>
              <p className="text-xs text-white/70 text-center">Does not account for time value of money - suitable for quick comparisons</p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Net Present Value (NPV) Method</p>
              <p className="font-mono text-center text-base mb-2">NPV = C0 + C1/(1+r) + C2/(1+r)² + ... + Cn/(1+r)ⁿ</p>
              <p className="text-xs text-white/70 text-center">Where C = cost in year n, r = discount rate</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Discount Rates for UK Projects</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Public Sector (Green Book)</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>Years 0-30: 3.5%</li>
                    <li>Years 31-75: 3.0%</li>
                    <li>Years 76-125: 2.5%</li>
                    <li>Health projects may use 1.5%</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Private Sector</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>Typical WACC: 8-12%</li>
                    <li>Developer speculative: 10-15%</li>
                    <li>Owner-occupied: 6-10%</li>
                    <li>Infrastructure funds: 5-8%</li>
                  </ul>
                </div>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Impact of discount rate:</strong> Higher rates favour lower capital cost options; lower rates favour energy-efficient options with higher capital but lower running costs.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Energy Efficiency and Payback Analysis */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Energy Efficiency and Payback Analysis
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Energy efficiency measures often require higher capital investment but deliver
              ongoing savings. Payback analysis helps quantify when the investment is recovered
              and informs the business case for more efficient equipment.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Simple Payback Period</p>
              <p className="font-mono text-center text-lg mb-2">Payback = Additional Cost / Annual Saving</p>
              <p className="text-xs text-white/70 text-center">Quick metric but ignores time value of money and savings beyond payback</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Energy Efficiency Measures - Building Services</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Measure</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Saving</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Payback</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">LED lighting retrofit</td>
                      <td className="border border-white/10 px-3 py-2">40-60%</td>
                      <td className="border border-white/10 px-3 py-2">2-4 years</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Lighting controls (PIR, daylight)</td>
                      <td className="border border-white/10 px-3 py-2">20-40%</td>
                      <td className="border border-white/10 px-3 py-2">1-3 years</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">VSD on pumps/fans</td>
                      <td className="border border-white/10 px-3 py-2">20-50%</td>
                      <td className="border border-white/10 px-3 py-2">2-5 years</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">High-efficiency chillers</td>
                      <td className="border border-white/10 px-3 py-2">15-30%</td>
                      <td className="border border-white/10 px-3 py-2">5-8 years</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Heat recovery ventilation</td>
                      <td className="border border-white/10 px-3 py-2">30-50%</td>
                      <td className="border border-white/10 px-3 py-2">4-7 years</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">BMS optimisation</td>
                      <td className="border border-white/10 px-3 py-2">10-25%</td>
                      <td className="border border-white/10 px-3 py-2">1-3 years</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-green-500/10 border border-green-500/30">
              <p className="text-sm font-medium text-green-400 mb-2">Worked Example: Chiller Comparison</p>
              <div className="text-sm text-white space-y-2">
                <p><strong>Option A:</strong> Standard chiller £85,000, COP 3.5, energy £18,000/year</p>
                <p><strong>Option B:</strong> High-efficiency chiller £120,000, COP 5.0, energy £12,600/year</p>
                <p className="mt-3"><strong>Additional cost:</strong> £120,000 - £85,000 = £35,000</p>
                <p><strong>Annual saving:</strong> £18,000 - £12,600 = £5,400</p>
                <p><strong>Simple payback:</strong> £35,000 / £5,400 = 6.5 years</p>
                <p className="mt-3 text-green-300"><strong>Decision:</strong> With 15-20 year chiller life, Option B delivers significant whole-life savings despite longer payback.</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Maintenance Cost Projections</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Planned maintenance:</strong> Use CIBSE Guide M benchmarks (typically 2-5% of capital/year)</li>
                <li className="pl-1"><strong>Reactive repairs:</strong> Budget 30-50% of PPM cost for breakdown response</li>
                <li className="pl-1"><strong>Major replacements:</strong> Component lifecycles (motors 15yr, controls 10yr, compressors 12yr)</li>
                <li className="pl-1"><strong>Escalation:</strong> Apply inflation to future maintenance costs (typically 2-3%/year)</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Energy price sensitivity:</strong> Test LCC calculations with high and low energy price scenarios (e.g., +/-30%) to understand investment risk.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Simple Payback Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A heat pump costs £45,000 more than a gas boiler system but saves £6,500/year in energy. Calculate the simple payback.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Simple payback = Additional cost / Annual saving</p>
                <p className="mt-2">Payback = £45,000 / £6,500</p>
                <p className="mt-2"><strong>Payback = 6.9 years</strong></p>
                <p className="mt-2 text-white/60">With 20-year system life, total savings = £6,500 × (20-6.9) = £85,150</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Life Cycle Cost Comparison</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Compare two lighting options over 20 years (simple method):
                Option A: £12,000 capital, £3,200/year energy, £800/year maintenance
                Option B: £18,000 capital, £1,800/year energy, £600/year maintenance
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Option A LCC = Capital + (Energy + Maintenance) × Years</p>
                <p>Option A = £12,000 + (£3,200 + £800) × 20</p>
                <p>Option A = £12,000 + £80,000 = <strong>£92,000</strong></p>
                <p className="mt-2">Option B LCC = £18,000 + (£1,800 + £600) × 20</p>
                <p>Option B = £18,000 + £48,000 = <strong>£66,000</strong></p>
                <p className="mt-2 text-green-400">→ Option B saves £26,000 over 20 years despite £6,000 higher capital cost</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: NPV Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Calculate NPV of £10,000/year energy savings over 5 years at 3.5% discount rate.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Year 1: £10,000 / 1.035 = £9,662</p>
                <p>Year 2: £10,000 / 1.035² = £9,335</p>
                <p>Year 3: £10,000 / 1.035³ = £9,019</p>
                <p>Year 4: £10,000 / 1.035⁴ = £8,714</p>
                <p>Year 5: £10,000 / 1.035⁵ = £8,420</p>
                <p className="mt-2">NPV = £9,662 + £9,335 + £9,019 + £8,714 + £8,420</p>
                <p><strong>NPV = £45,150</strong></p>
                <p className="mt-2 text-white/60">Compare to simple sum: £10,000 × 5 = £50,000. NPV reflects true present value.</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Value Engineering Workshop Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Value Engineering Workshops</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Workshop Preparation</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Distribute design information 1-2 weeks before workshop</li>
                <li className="pl-1">Prepare cost plan breakdown by system/element</li>
                <li className="pl-1">Identify constraints and non-negotiable requirements</li>
                <li className="pl-1">Invite multi-disciplinary team (design, cost, FM, contractor)</li>
                <li className="pl-1">Allow full day for significant projects</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Effective Workshop Facilitation</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Use independent facilitator where possible</li>
                <li className="pl-1">Focus on functions not solutions initially</li>
                <li className="pl-1">No criticism during creative phase (brainstorming)</li>
                <li className="pl-1">Rank ideas by potential value (saving × probability)</li>
                <li className="pl-1">Assign owners and deadlines for proposals</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">MEP-Specific VE Opportunities</h3>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">System</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Common VE Opportunities</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">HVAC</td>
                      <td className="border border-white/10 px-3 py-2">System selection, zoning, plant rationalisation, heat recovery</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Electrical</td>
                      <td className="border border-white/10 px-3 py-2">Diversity review, distribution topology, lighting control strategy</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Plumbing</td>
                      <td className="border border-white/10 px-3 py-2">Water heating strategy, pipe routing, rainwater harvesting</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fire</td>
                      <td className="border border-white/10 px-3 py-2">Addressable vs conventional, suppression alternatives</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">BMS</td>
                      <td className="border border-white/10 px-3 py-2">Integration scope, points schedule, proprietary vs open protocol</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common VE Pitfalls to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Cost cutting disguised as VE</strong> - Removing scope without function analysis</li>
                <li className="pl-1"><strong>Ignoring whole life cost</strong> - Focusing only on capital savings</li>
                <li className="pl-1"><strong>Late implementation</strong> - Making changes when design is fixed</li>
                <li className="pl-1"><strong>Siloed thinking</strong> - Not considering system interactions</li>
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
                <p className="font-medium text-white mb-1">Value Engineering Essentials</p>
                <ul className="space-y-0.5">
                  <li>Value = Function / Cost</li>
                  <li>Focus on functions (verb-noun pairs)</li>
                  <li>FAST diagrams for function hierarchy</li>
                  <li>Best timing: RIBA Stage 2-3</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Life Cycle Costing</p>
                <ul className="space-y-0.5">
                  <li>Capital + Operating + Maintenance + Disposal</li>
                  <li>Simple payback = Cost / Annual saving</li>
                  <li>NPV for time value of money</li>
                  <li>Discount: 3.5% public, 8-12% private</li>
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
            <Link to="../h-n-c-module5-section3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Cost Management
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule5Section3_6;
