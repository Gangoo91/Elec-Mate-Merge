import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Cost Control - HNC Module 5 Section 3.3";
const DESCRIPTION = "Master cost control techniques for building services projects: cost monitoring, progress reporting, forecasting techniques, cost value reconciliation (CVR), and earned value analysis (EVM).";

const quickCheckQuestions = [
  {
    id: "cvr-definition",
    question: "What is Cost Value Reconciliation (CVR)?",
    options: ["A method of tendering for contracts", "Comparing actual costs against the value of work completed", "Calculating profit margins on materials", "Reconciling bank statements with invoices"],
    correctIndex: 1,
    explanation: "Cost Value Reconciliation (CVR) compares the actual costs incurred on a project against the value of work completed. It reveals whether the project is making or losing money at any given point."
  },
  {
    id: "cpi-meaning",
    question: "A Cost Performance Index (CPI) of 0.85 indicates:",
    options: ["Project is under budget", "Project is 15% over budget", "Project is ahead of schedule", "Project is 85% complete"],
    correctIndex: 1,
    explanation: "A CPI below 1.0 indicates cost overrun. CPI of 0.85 means for every £1 of value earned, £1.18 has been spent (1 ÷ 0.85 = 1.18), representing approximately 15% over budget."
  },
  {
    id: "spi-schedule",
    question: "What does Schedule Performance Index (SPI) measure?",
    options: ["Total project cost", "Efficiency of schedule performance", "Number of workers on site", "Material delivery times"],
    correctIndex: 1,
    explanation: "Schedule Performance Index (SPI) measures the efficiency of schedule performance. SPI = Earned Value ÷ Planned Value. An SPI of 1.0 means on schedule, below 1.0 means behind schedule."
  },
  {
    id: "eac-purpose",
    question: "Estimate at Completion (EAC) is used to:",
    options: ["Set the original budget", "Forecast the total cost when the project finishes", "Calculate monthly progress claims", "Determine material quantities"],
    correctIndex: 1,
    explanation: "Estimate at Completion (EAC) forecasts what the total project cost will be when all work is finished, based on current performance trends. It helps identify potential budget overruns early."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "In earned value management, what does EV (Earned Value) represent?",
    options: [
      "The total budget for the project",
      "The budgeted cost of work actually performed",
      "The actual cost spent to date",
      "The remaining work to be completed"
    ],
    correctAnswer: 1,
    explanation: "Earned Value (EV), also called Budgeted Cost of Work Performed (BCWP), represents the budgeted value of the work that has actually been completed. It's the key metric for measuring project progress in monetary terms."
  },
  {
    id: 2,
    question: "A building services project has: Budget at Completion = £500,000, Planned Value = £200,000, Earned Value = £180,000, Actual Cost = £210,000. What is the Cost Variance?",
    options: ["£20,000 favourable", "-£30,000 (unfavourable)", "£10,000 favourable", "-£20,000 (unfavourable)"],
    correctAnswer: 1,
    explanation: "Cost Variance = EV - AC = £180,000 - £210,000 = -£30,000. A negative cost variance indicates the project is over budget - spending more than the value of work completed."
  },
  {
    id: 3,
    question: "What frequency is typical for CVR reporting on building services projects?",
    options: ["Daily", "Weekly", "Monthly", "Quarterly"],
    correctAnswer: 2,
    explanation: "Monthly CVR reporting is standard practice on building services projects. This aligns with payment cycles and provides sufficient time to collect accurate cost data while enabling timely corrective action."
  },
  {
    id: 4,
    question: "Which formula calculates Schedule Performance Index (SPI)?",
    options: ["AC ÷ EV", "EV ÷ PV", "PV ÷ AC", "BAC ÷ EV"],
    correctAnswer: 1,
    explanation: "SPI = EV ÷ PV (Earned Value ÷ Planned Value). This ratio shows schedule efficiency - how much work was accomplished compared to how much was planned for that period."
  },
  {
    id: 5,
    question: "A mechanical installation has CPI = 0.9 and SPI = 1.1. What does this indicate?",
    options: [
      "Under budget and behind schedule",
      "Over budget and ahead of schedule",
      "Under budget and ahead of schedule",
      "Over budget and behind schedule"
    ],
    correctAnswer: 1,
    explanation: "CPI < 1 indicates over budget (spending more than planned for completed work). SPI > 1 indicates ahead of schedule (completing more work than planned). The project is progressing quickly but at higher cost."
  },
  {
    id: 6,
    question: "In a monthly cost report, 'committed costs' refers to:",
    options: [
      "Money already paid to suppliers",
      "Orders placed but not yet invoiced",
      "Future budget estimates",
      "Contingency allowances"
    ],
    correctAnswer: 1,
    explanation: "Committed costs are contractual obligations for orders placed but not yet invoiced or paid. They must be included in cost forecasts as these costs will definitely be incurred."
  },
  {
    id: 7,
    question: "The formula EAC = BAC ÷ CPI assumes:",
    options: [
      "Future performance will match the original plan",
      "Current cost performance trends will continue",
      "The project will be completed early",
      "No further variations will occur"
    ],
    correctAnswer: 1,
    explanation: "EAC = BAC ÷ CPI is the most common forecast formula and assumes current cost performance (good or bad) will continue for the remaining work. It's a realistic basis for forecasting."
  },
  {
    id: 8,
    question: "What is 'variance analysis' in cost control?",
    options: [
      "Calculating the project profit margin",
      "Investigating differences between planned and actual performance",
      "Preparing tender documentation",
      "Scheduling resource requirements"
    ],
    correctAnswer: 1,
    explanation: "Variance analysis investigates the causes of differences between planned and actual performance - both cost and schedule. It identifies specific problems and informs corrective action."
  },
  {
    id: 9,
    question: "A HVAC subcontract shows: Contract Value £120,000, Work Certified £80,000, Costs to Date £75,000. What is the margin to date?",
    options: ["£5,000 profit", "£45,000 profit", "6.25% margin", "£40,000 profit"],
    correctAnswer: 0,
    explanation: "Margin = Value - Cost = £80,000 - £75,000 = £5,000 profit to date. This represents actual margin earned on work completed, not projected final margin."
  },
  {
    id: 10,
    question: "To Complete Performance Index (TCPI) measures:",
    options: [
      "Past project performance",
      "Required future efficiency to meet budget",
      "Current cost variance",
      "Schedule compression needed"
    ],
    correctAnswer: 1,
    explanation: "TCPI calculates the cost performance required on remaining work to achieve the budget target. TCPI = (BAC - EV) ÷ (BAC - AC). A TCPI > 1 means future performance must improve to meet budget."
  },
  {
    id: 11,
    question: "Which cost category would typically show the highest variance on a building services project?",
    options: ["Management costs", "Plant hire", "Labour", "Preliminaries"],
    correctAnswer: 2,
    explanation: "Labour typically shows the highest variance due to productivity variations, rework, weather delays, and skill mix changes. It's often 40-50% of project cost and hardest to control precisely."
  },
  {
    id: 12,
    question: "A project has BAC = £1,000,000, EV = £400,000, AC = £450,000. Using EAC = BAC ÷ CPI, what is the forecast final cost?",
    options: ["£1,000,000", "£1,125,000", "£1,250,000", "£900,000"],
    correctAnswer: 1,
    explanation: "First calculate CPI = EV ÷ AC = £400,000 ÷ £450,000 = 0.889. Then EAC = BAC ÷ CPI = £1,000,000 ÷ 0.889 = £1,125,000. The project is forecast to exceed budget by £125,000."
  }
];

const faqs = [
  {
    question: "What's the difference between CVR and earned value analysis?",
    answer: "CVR (Cost Value Reconciliation) is the UK construction industry's practical approach - comparing actual project costs against the value of work completed to determine profit/loss at a point in time. Earned value analysis (EVA/EVM) is a more formal project management methodology using specific metrics (CPI, SPI, EAC) to forecast future performance. Both achieve similar goals; CVR is simpler and more common on smaller projects, while EVM provides more sophisticated forecasting."
  },
  {
    question: "How often should cost reports be produced on building services projects?",
    answer: "Monthly reporting is standard practice, aligning with valuation and payment cycles. Weekly flash reports may be used on fast-track projects or when problems are identified. The key is consistency - choose a frequency and maintain it throughout the project to enable trend analysis."
  },
  {
    question: "What causes the most cost overruns on electrical and mechanical installations?",
    answer: "Common causes include: (1) Scope changes and variations, (2) Labour productivity below estimate, (3) Design coordination issues causing rework, (4) Material price increases, (5) Access restrictions affecting sequence, (6) Incomplete design at tender stage. Robust change control and regular progress monitoring help identify these early."
  },
  {
    question: "How do I calculate the anticipated final cost during a project?",
    answer: "Anticipated Final Cost = Costs to Date + Committed Costs + Cost to Complete. 'Cost to Complete' requires judgement - either use the remaining budget (optimistic) or adjust based on current performance (CPI method). Always document assumptions and update monthly as better information becomes available."
  },
  {
    question: "What is the difference between committed costs and accruals?",
    answer: "Committed costs are firm contractual obligations - purchase orders placed, subcontracts let. Accruals are estimates of work done but not yet invoiced, based on progress assessment. Both must be captured for accurate cost reporting, but committed costs are more certain while accruals require professional judgement."
  },
  {
    question: "When should I raise a cost warning on a project?",
    answer: "Raise early warnings when: CPI falls below 0.95 (5% overrun trajectory), forecast exceeds contingency allowance, a single cost category exceeds its budget by more than 10%, or committed costs exceed remaining budget. The earlier problems are flagged, the more options exist for recovery."
  }
];

const HNCModule5Section3_3 = () => {
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
            <span>Module 5.3.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Cost Control
          </h1>
          <p className="text-white/80">
            Cost monitoring, progress reporting, forecasting techniques, cost value reconciliation and earned value analysis
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>CVR:</strong> Comparing costs against value of work done</li>
              <li className="pl-1"><strong>CPI/SPI:</strong> Cost and schedule performance indices</li>
              <li className="pl-1"><strong>EAC:</strong> Forecast total cost at completion</li>
              <li className="pl-1"><strong>Variance analysis:</strong> Investigating differences from plan</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Labour:</strong> Typically 40-50% of M&E costs</li>
              <li className="pl-1"><strong>Materials:</strong> Price volatility impacts forecasts</li>
              <li className="pl-1"><strong>Subcontracts:</strong> Track separately from own work</li>
              <li className="pl-1"><strong>Reporting:</strong> Monthly cycle standard practice</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Implement cost monitoring systems on building services projects",
              "Prepare monthly cost reports with variance analysis",
              "Apply cost value reconciliation (CVR) techniques",
              "Calculate and interpret CPI, SPI and other EVM metrics",
              "Forecast costs at completion using different methods",
              "Take corrective action when projects deviate from budget"
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

        {/* Section 1: Cost Monitoring Fundamentals */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Cost Monitoring Fundamentals
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Effective cost control requires systematic monitoring throughout the project lifecycle. For building
              services installations, this means tracking labour, materials, plant, and subcontract costs against
              the budget and work completed.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key cost monitoring elements:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Actual costs:</strong> What has been spent to date (invoiced and paid)</li>
                <li className="pl-1"><strong>Committed costs:</strong> Orders placed but not yet invoiced</li>
                <li className="pl-1"><strong>Accruals:</strong> Work done but not yet invoiced (estimated)</li>
                <li className="pl-1"><strong>Cost to complete:</strong> Forecast cost for remaining work</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Cost Categories for M&E Projects</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Category</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical %</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Monitoring Method</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Labour (own)</td>
                      <td className="border border-white/10 px-3 py-2">25-35%</td>
                      <td className="border border-white/10 px-3 py-2">Timesheets, allocation codes</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Materials</td>
                      <td className="border border-white/10 px-3 py-2">30-40%</td>
                      <td className="border border-white/10 px-3 py-2">Purchase orders, goods received</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Subcontractors</td>
                      <td className="border border-white/10 px-3 py-2">15-25%</td>
                      <td className="border border-white/10 px-3 py-2">Applications, valuations</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Plant & equipment</td>
                      <td className="border border-white/10 px-3 py-2">3-8%</td>
                      <td className="border border-white/10 px-3 py-2">Hire records, off-hire dates</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Preliminaries</td>
                      <td className="border border-white/10 px-3 py-2">8-15%</td>
                      <td className="border border-white/10 px-3 py-2">Time-based allocation</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Building Services Example: Hospital M&E Package</p>
              <p className="text-sm text-white/80 mb-2">
                A £2.5M mechanical installation on a hospital project requires robust cost monitoring:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Weekly labour allocation by zone (theatres, wards, plant rooms)</li>
                <li className="pl-1">Material deliveries tracked against procurement schedule</li>
                <li className="pl-1">Specialist subcontracts (controls, insulation) valued monthly</li>
                <li className="pl-1">Variations logged and costed within 7 days</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Best practice:</strong> Capture costs at the lowest practical level - this enables meaningful variance analysis and identifies problems early.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Cost Value Reconciliation (CVR) */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Cost Value Reconciliation (CVR)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Cost Value Reconciliation is the UK construction industry's standard method for tracking project
              financial performance. It compares the value of work completed against the costs incurred to
              determine whether the project is making or losing money.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">CVR Basic Formula</p>
              <p className="font-mono text-center text-lg mb-2">Margin = Value - Cost</p>
              <p className="text-xs text-white/70 text-center">Where Value = certified work + variations + dayworks - retentions</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Value Side</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Work certified to date</li>
                  <li className="pl-1">Approved variations</li>
                  <li className="pl-1">Pending variations (risk-adjusted)</li>
                  <li className="pl-1">Materials on site</li>
                  <li className="pl-1">Less: retention held</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Cost Side</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Labour costs to date</li>
                  <li className="pl-1">Materials purchased</li>
                  <li className="pl-1">Subcontract costs</li>
                  <li className="pl-1">Plant and equipment</li>
                  <li className="pl-1">Plus: accruals and commitments</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Monthly CVR Report Structure</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Item</th>
                      <th className="border border-white/10 px-3 py-2 text-right">This Month</th>
                      <th className="border border-white/10 px-3 py-2 text-right">Cumulative</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Contract Value</td>
                      <td className="border border-white/10 px-3 py-2 text-right">-</td>
                      <td className="border border-white/10 px-3 py-2 text-right">£850,000</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Variations (approved)</td>
                      <td className="border border-white/10 px-3 py-2 text-right">£12,000</td>
                      <td className="border border-white/10 px-3 py-2 text-right">£45,000</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Value Certified</td>
                      <td className="border border-white/10 px-3 py-2 text-right">£95,000</td>
                      <td className="border border-white/10 px-3 py-2 text-right">£480,000</td>
                    </tr>
                    <tr className="bg-white/5">
                      <td className="border border-white/10 px-3 py-2 font-medium">Total Costs</td>
                      <td className="border border-white/10 px-3 py-2 text-right">£88,000</td>
                      <td className="border border-white/10 px-3 py-2 text-right">£445,000</td>
                    </tr>
                    <tr className="bg-green-500/10">
                      <td className="border border-white/10 px-3 py-2 font-medium">Margin</td>
                      <td className="border border-white/10 px-3 py-2 text-right text-green-400">£7,000</td>
                      <td className="border border-white/10 px-3 py-2 text-right text-green-400">£35,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key principle:</strong> CVR must capture all costs including accruals and commitments - not just what has been paid. Incomplete cost capture gives false confidence.
            </p>
          </div>
        </section>

        {/* Section 3: Earned Value Management */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Earned Value Management (EVM)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Earned Value Management is a project management technique that integrates scope, schedule, and cost
              data to provide objective measures of project performance and forecasts of final outcome.
            </p>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Core EVM Terminology</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>PV (Planned Value):</strong> Budgeted cost of work scheduled - what you planned to spend by now</li>
                <li className="pl-1"><strong>EV (Earned Value):</strong> Budgeted cost of work performed - what you've actually achieved</li>
                <li className="pl-1"><strong>AC (Actual Cost):</strong> Actual cost of work performed - what you've actually spent</li>
                <li className="pl-1"><strong>BAC (Budget at Completion):</strong> Total project budget</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Performance Indices</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Cost Performance Index (CPI)</p>
                  <p className="font-mono text-lg text-center mb-2">CPI = EV / AC</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>CPI = 1.0: On budget</li>
                    <li>CPI &gt; 1.0: Under budget</li>
                    <li>CPI &lt; 1.0: Over budget</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Schedule Performance Index (SPI)</p>
                  <p className="font-mono text-lg text-center mb-2">SPI = EV / PV</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>SPI = 1.0: On schedule</li>
                    <li>SPI &gt; 1.0: Ahead of schedule</li>
                    <li>SPI &lt; 1.0: Behind schedule</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Variance Calculations</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Metric</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Formula</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Interpretation</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cost Variance (CV)</td>
                      <td className="border border-white/10 px-3 py-2 font-mono">EV - AC</td>
                      <td className="border border-white/10 px-3 py-2">Positive = under budget</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Schedule Variance (SV)</td>
                      <td className="border border-white/10 px-3 py-2 font-mono">EV - PV</td>
                      <td className="border border-white/10 px-3 py-2">Positive = ahead of schedule</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Variance at Completion (VAC)</td>
                      <td className="border border-white/10 px-3 py-2 font-mono">BAC - EAC</td>
                      <td className="border border-white/10 px-3 py-2">Positive = forecast under budget</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Building Services Example: Office Electrical Installation</p>
              <p className="text-sm text-white/80 mb-2">
                Month 4 of a £600,000 electrical installation:
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>BAC = £600,000 (total budget)</p>
                <p>PV = £240,000 (planned progress by month 4)</p>
                <p>EV = £210,000 (actual work completed, at budget rates)</p>
                <p>AC = £230,000 (actual cost spent)</p>
                <p className="mt-2">CPI = £210,000 / £230,000 = <strong>0.91</strong> (9% over budget)</p>
                <p>SPI = £210,000 / £240,000 = <strong>0.88</strong> (12% behind schedule)</p>
                <p className="mt-2 text-orange-400">Warning: Project is over budget AND behind schedule</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Trend analysis:</strong> Track CPI and SPI monthly. A declining trend requires immediate investigation, even if still above 1.0.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Forecasting and Progress Reporting */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Forecasting and Progress Reporting
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Forecasting the final project cost is essential for commercial management. Several methods exist,
              each with different assumptions about future performance.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Estimate at Completion (EAC) Methods</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Method</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Formula</th>
                      <th className="border border-white/10 px-3 py-2 text-left">When to Use</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Budget rate</td>
                      <td className="border border-white/10 px-3 py-2 font-mono">AC + (BAC - EV)</td>
                      <td className="border border-white/10 px-3 py-2">Expect original estimates for remaining work</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">CPI trend</td>
                      <td className="border border-white/10 px-3 py-2 font-mono">BAC / CPI</td>
                      <td className="border border-white/10 px-3 py-2">Current performance will continue</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Combined</td>
                      <td className="border border-white/10 px-3 py-2 font-mono">AC + (BAC-EV)/(CPI×SPI)</td>
                      <td className="border border-white/10 px-3 py-2">Both cost and schedule affect remaining work</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Bottom-up</td>
                      <td className="border border-white/10 px-3 py-2">AC + Re-estimate</td>
                      <td className="border border-white/10 px-3 py-2">Major scope changes, fresh estimate needed</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">To Complete Performance Index (TCPI)</p>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="font-mono text-center text-lg mb-2">TCPI = (BAC - EV) / (BAC - AC)</p>
                <p className="text-xs text-white/70 text-center mb-3">Required future efficiency to meet budget</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">TCPI = 1.0: Must maintain current efficiency to meet budget</li>
                  <li className="pl-1">TCPI &gt; 1.0: Must improve efficiency to meet budget</li>
                  <li className="pl-1">TCPI &gt; 1.2: Meeting budget is very unlikely</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Monthly Cost Report Contents</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Executive Summary</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>Current position vs budget</li>
                    <li>Key variances and causes</li>
                    <li>Forecast final cost</li>
                    <li>Risks and opportunities</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Detailed Analysis</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>Cost breakdown by category</li>
                    <li>Variance analysis by element</li>
                    <li>Cash flow forecast</li>
                    <li>Corrective actions</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Variance Analysis: Common Causes on M&E Projects</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Variance Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Common Causes</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Corrective Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Labour overspend</td>
                      <td className="border border-white/10 px-3 py-2">Low productivity, rework, overtime</td>
                      <td className="border border-white/10 px-3 py-2">Method review, resource change</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Material overspend</td>
                      <td className="border border-white/10 px-3 py-2">Price increases, waste, theft</td>
                      <td className="border border-white/10 px-3 py-2">Procurement review, site control</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Schedule delay</td>
                      <td className="border border-white/10 px-3 py-2">Access issues, design changes</td>
                      <td className="border border-white/10 px-3 py-2">Acceleration, re-sequence</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Subcontract overrun</td>
                      <td className="border border-white/10 px-3 py-2">Scope creep, claims</td>
                      <td className="border border-white/10 px-3 py-2">Contract review, negotiation</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Reporting tip:</strong> Present trends graphically - an S-curve showing planned vs actual progress, or a chart of CPI/SPI over time, communicates status faster than tables alone.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: CVR Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> An electrical package has: Contract sum £450,000, variations approved £32,000, work certified £280,000. Costs to date: labour £95,000, materials £120,000, subcontractors £45,000, plant £8,000. Calculate margin to date.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Value to date = Work certified = <strong>£280,000</strong></p>
                <p className="mt-2">Costs to date:</p>
                <p>Labour: £95,000</p>
                <p>Materials: £120,000</p>
                <p>Subcontractors: £45,000</p>
                <p>Plant: £8,000</p>
                <p>Total costs = £95,000 + £120,000 + £45,000 + £8,000 = <strong>£268,000</strong></p>
                <p className="mt-2">Margin = Value - Cost = £280,000 - £268,000 = <strong>£12,000 profit</strong></p>
                <p>Margin % = £12,000 / £280,000 = <strong>4.3%</strong></p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: EVM Performance Analysis</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A mechanical installation has BAC = £800,000, PV = £400,000, EV = £350,000, AC = £380,000. Calculate CPI, SPI, and EAC.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>CPI = EV / AC = £350,000 / £380,000 = <strong>0.92</strong></p>
                <p>SPI = EV / PV = £350,000 / £400,000 = <strong>0.88</strong></p>
                <p className="mt-2">EAC (using CPI trend) = BAC / CPI</p>
                <p>EAC = £800,000 / 0.92 = <strong>£869,565</strong></p>
                <p className="mt-2 text-orange-400">Forecast overrun = £869,565 - £800,000 = £69,565 (8.7%)</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: TCPI Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Using the same project: BAC = £800,000, EV = £350,000, AC = £380,000. What efficiency is needed for remaining work to meet budget?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>TCPI = (BAC - EV) / (BAC - AC)</p>
                <p>TCPI = (£800,000 - £350,000) / (£800,000 - £380,000)</p>
                <p>TCPI = £450,000 / £420,000 = <strong>1.07</strong></p>
                <p className="mt-2 text-white/60">Remaining work must be completed at 107% efficiency</p>
                <p className="mt-2 text-green-400">This is achievable with corrective action - CPI must improve from 0.92 to 1.07</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Cost Control Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Establish cost codes aligned with tender breakdown</li>
                <li className="pl-1">Capture all costs including accruals and commitments</li>
                <li className="pl-1">Reconcile costs to value monthly (minimum)</li>
                <li className="pl-1">Investigate variances greater than 5% immediately</li>
                <li className="pl-1">Update forecast monthly based on current performance</li>
                <li className="pl-1">Document assumptions behind cost to complete</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">CPI = 1.0: On budget; SPI = 1.0: On schedule</li>
                <li className="pl-1">TCPI &gt; 1.2: Budget recovery unlikely</li>
                <li className="pl-1">EAC = BAC / CPI: Most common forecast method</li>
                <li className="pl-1">Labour typically 40-50% of M&E costs</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Incomplete cost capture</strong> - Missing commitments gives false confidence</li>
                <li className="pl-1"><strong>Optimistic forecasts</strong> - Using budget rates when CPI shows underperformance</li>
                <li className="pl-1"><strong>Late reporting</strong> - Monthly reports more than 2 weeks after period end lose value</li>
                <li className="pl-1"><strong>No variance analysis</strong> - Numbers without explanation don't drive improvement</li>
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
                <p className="font-medium text-white mb-1">EVM Formulae</p>
                <ul className="space-y-0.5">
                  <li>CPI = EV / AC (cost efficiency)</li>
                  <li>SPI = EV / PV (schedule efficiency)</li>
                  <li>CV = EV - AC (cost variance)</li>
                  <li>SV = EV - PV (schedule variance)</li>
                  <li>EAC = BAC / CPI (forecast at completion)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Performance Thresholds</p>
                <ul className="space-y-0.5">
                  <li>CPI/SPI = 1.0: On target</li>
                  <li>CPI/SPI 0.95-1.0: Minor variance</li>
                  <li>CPI/SPI &lt; 0.95: Action required</li>
                  <li>TCPI &gt; 1.2: Recovery unlikely</li>
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
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module5-section3-4">
              Next: Financial Reporting
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule5Section3_3;
