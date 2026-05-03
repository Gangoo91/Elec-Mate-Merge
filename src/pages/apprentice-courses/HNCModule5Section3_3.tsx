/**
 * Module 5 · Section 3 · Subsection 3 — Cost Control
 * HNC Electrical Engineering for Building Services (Project Management — Pearson U4004 + BSE PM context)
 *   Cost monitoring, progress reporting, forecasting and earned value analysis — the daily and monthly disciplines that prevent project loss.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  CommonMistake,
  ConceptBlock,
  FAQ,
  KeyTakeaways,
  LearningOutcomes,
  RegsCallout,
  Scenario,
  SectionRule,
  TLDR,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Cost Control - HNC Module 5 Section 3.3';
const DESCRIPTION =
  'Master cost control techniques for building services projects: cost monitoring, progress reporting, forecasting techniques, cost value reconciliation (CVR), and earned value analysis (EVM).';

const quickCheckQuestions = [
  {
    id: 'cvr-definition',
    question: 'What is Cost Value Reconciliation (CVR)?',
    options: [
      'A method of tendering for contracts',
      'Comparing actual costs against the value of work completed',
      'Calculating profit margins on materials',
      'Reconciling bank statements with invoices',
    ],
    correctIndex: 1,
    explanation:
      'Cost Value Reconciliation (CVR) compares the actual costs incurred on a project against the value of work completed. It reveals whether the project is making or losing money at any given point.',
  },
  {
    id: 'cpi-meaning',
    question: 'A Cost Performance Index (CPI) of 0.85 indicates:',
    options: [
      'Project is under budget',
      'Project is 15% over budget',
      'Project is ahead of schedule',
      'Project is 85% complete',
    ],
    correctIndex: 1,
    explanation:
      'A CPI below 1.0 indicates cost overrun. CPI of 0.85 means for every £1 of value earned, £1.18 has been spent (1 ÷ 0.85 = 1.18), representing approximately 15% over budget.',
  },
  {
    id: 'spi-schedule',
    question: 'What does Schedule Performance Index (SPI) measure?',
    options: [
      'Total project cost',
      'Efficiency of schedule performance',
      'Number of workers on site',
      'Material delivery times',
    ],
    correctIndex: 1,
    explanation:
      'Schedule Performance Index (SPI) measures the efficiency of schedule performance. SPI = Earned Value ÷ Planned Value. An SPI of 1.0 means on schedule, below 1.0 means behind schedule.',
  },
  {
    id: 'eac-purpose',
    question: 'Estimate at Completion (EAC) is used to:',
    options: [
      'Set the original budget',
      'Forecast the total cost when the project finishes',
      'Calculate monthly progress claims',
      'Determine material quantities',
    ],
    correctIndex: 1,
    explanation:
      'Estimate at Completion (EAC) forecasts what the total project cost will be when all work is finished, based on current performance trends. It helps identify potential budget overruns early.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'In earned value management, what does EV (Earned Value) represent?',
    options: [
      'The total budget for the project',
      'The budgeted cost of work actually performed',
      'The actual cost spent to date',
      'The remaining work to be completed',
    ],
    correctAnswer: 1,
    explanation:
      "Earned Value (EV), also called Budgeted Cost of Work Performed (BCWP), represents the budgeted value of the work that has actually been completed. It's the key metric for measuring project progress in monetary terms.",
  },
  {
    id: 2,
    question:
      'A building services project has: Budget at Completion = £500,000, Planned Value = £200,000, Earned Value = £180,000, Actual Cost = £210,000. What is the Cost Variance?',
    options: [
      '£20,000 favourable',
      '-£30,000 (unfavourable)',
      '£10,000 favourable',
      '-£20,000 (unfavourable)',
    ],
    correctAnswer: 1,
    explanation:
      'Cost Variance = EV - AC = £180,000 - £210,000 = -£30,000. A negative cost variance indicates the project is over budget - spending more than the value of work completed.',
  },
  {
    id: 3,
    question: 'What frequency is typical for CVR reporting on building services projects?',
    options: ['Daily', 'Weekly', 'Monthly', 'Quarterly'],
    correctAnswer: 2,
    explanation:
      'Monthly CVR reporting is standard practice on building services projects. This aligns with payment cycles and provides sufficient time to collect accurate cost data while enabling timely corrective action.',
  },
  {
    id: 4,
    question: 'Which formula calculates Schedule Performance Index (SPI)?',
    options: ['AC ÷ EV', 'EV ÷ PV', 'PV ÷ AC', 'BAC ÷ EV'],
    correctAnswer: 1,
    explanation:
      'SPI = EV ÷ PV (Earned Value ÷ Planned Value). This ratio shows schedule efficiency - how much work was accomplished compared to how much was planned for that period.',
  },
  {
    id: 5,
    question: 'A mechanical installation has CPI = 0.9 and SPI = 1.1. What does this indicate?',
    options: [
      'Under budget and behind schedule',
      'Over budget and ahead of schedule',
      'Under budget and ahead of schedule',
      'Over budget and behind schedule',
    ],
    correctAnswer: 1,
    explanation:
      'CPI < 1 indicates over budget (spending more than planned for completed work). SPI > 1 indicates ahead of schedule (completing more work than planned). The project is progressing quickly but at higher cost.',
  },
  {
    id: 6,
    question: "In a monthly cost report, 'committed costs' refers to:",
    options: [
      'Money already paid to suppliers',
      'Orders placed but not yet invoiced',
      'Future budget estimates',
      'Contingency allowances',
    ],
    correctAnswer: 1,
    explanation:
      'Committed costs are contractual obligations for orders placed but not yet invoiced or paid. They must be included in cost forecasts as these costs will definitely be incurred.',
  },
  {
    id: 7,
    question: 'The formula EAC = BAC ÷ CPI assumes:',
    options: [
      'Future performance will match the original plan',
      'Current cost performance trends will continue',
      'The project will be completed early',
      'No further variations will occur',
    ],
    correctAnswer: 1,
    explanation:
      "EAC = BAC ÷ CPI is the most common forecast formula and assumes current cost performance (good or bad) will continue for the remaining work. It's a realistic basis for forecasting.",
  },
  {
    id: 8,
    question: "What is 'variance analysis' in cost control?",
    options: [
      'Calculating the project profit margin',
      'Investigating differences between planned and actual performance',
      'Preparing tender documentation',
      'Scheduling resource requirements',
    ],
    correctAnswer: 1,
    explanation:
      'Variance analysis investigates the causes of differences between planned and actual performance - both cost and schedule. It identifies specific problems and informs corrective action.',
  },
  {
    id: 9,
    question:
      'A HVAC subcontract shows: Contract Value £120,000, Work Certified £80,000, Costs to Date £75,000. What is the margin to date?',
    options: ['£5,000 profit', '£45,000 profit', '6.25% margin', '£40,000 profit'],
    correctAnswer: 0,
    explanation:
      'Margin = Value - Cost = £80,000 - £75,000 = £5,000 profit to date. This represents actual margin earned on work completed, not projected final margin.',
  },
  {
    id: 10,
    question: 'To Complete Performance Index (TCPI) measures:',
    options: [
      'Past project performance',
      'Required future efficiency to meet budget',
      'Current cost variance',
      'Schedule compression needed',
    ],
    correctAnswer: 1,
    explanation:
      'TCPI calculates the cost performance required on remaining work to achieve the budget target. TCPI = (BAC - EV) ÷ (BAC - AC). A TCPI > 1 means future performance must improve to meet budget.',
  },
  {
    id: 11,
    question:
      'Which cost category would typically show the highest variance on a building services project?',
    options: ['Management costs', 'Plant hire', 'Labour', 'Preliminaries'],
    correctAnswer: 2,
    explanation:
      "Labour typically shows the highest variance due to productivity variations, rework, weather delays, and skill mix changes. It's often 40-50% of project cost and hardest to control precisely.",
  },
  {
    id: 12,
    question:
      'A project has BAC = £1,000,000, EV = £400,000, AC = £450,000. Using EAC = BAC ÷ CPI, what is the forecast final cost?',
    options: ['£1,000,000', '£1,125,000', '£1,250,000', '£900,000'],
    correctAnswer: 1,
    explanation:
      'First calculate CPI = EV ÷ AC = £400,000 ÷ £450,000 = 0.889. Then EAC = BAC ÷ CPI = £1,000,000 ÷ 0.889 = £1,125,000. The project is forecast to exceed budget by £125,000.',
  },
];

const faqs = [
  {
    question: "What's the difference between CVR and earned value analysis?",
    answer:
      "CVR (Cost Value Reconciliation) is the UK construction industry's practical approach - comparing actual project costs against the value of work completed to determine profit/loss at a point in time. Earned value analysis (EVA/EVM) is a more formal project management methodology using specific metrics (CPI, SPI, EAC) to forecast future performance. Both achieve similar goals; CVR is simpler and more common on smaller projects, while EVM provides more sophisticated forecasting.",
  },
  {
    question: 'How often should cost reports be produced on building services projects?',
    answer:
      'Monthly reporting is standard practice, aligning with valuation and payment cycles. Weekly flash reports may be used on fast-track projects or when problems are identified. The key is consistency - choose a frequency and maintain it throughout the project to enable trend analysis.',
  },
  {
    question: 'What causes the most cost overruns on electrical and mechanical installations?',
    answer:
      'Common causes include: (1) Scope changes and variations, (2) Labour productivity below estimate, (3) Design coordination issues causing rework, (4) Material price increases, (5) Access restrictions affecting sequence, (6) Incomplete design at tender stage. Robust change control and regular progress monitoring help identify these early.',
  },
  {
    question: 'How do I calculate the anticipated final cost during a project?',
    answer:
      "Anticipated Final Cost = Costs to Date + Committed Costs + Cost to Complete. 'Cost to Complete' requires judgement - either use the remaining budget (optimistic) or adjust based on current performance (CPI method). Always document assumptions and update monthly as better information becomes available.",
  },
  {
    question: 'What is the difference between committed costs and accruals?',
    answer:
      'Committed costs are firm contractual obligations - purchase orders placed, subcontracts let. Accruals are estimates of work done but not yet invoiced, based on progress assessment. Both must be captured for accurate cost reporting, but committed costs are more certain while accruals require professional judgement.',
  },
  {
    question: 'When should I raise a cost warning on a project?',
    answer:
      'Raise early warnings when: CPI falls below 0.95 (5% overrun trajectory), forecast exceeds contingency allowance, a single cost category exceeds its budget by more than 10%, or committed costs exceed remaining budget. The earlier problems are flagged, the more options exist for recovery.',
  },
];

const HNCModule5Section3_3 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module5-section3')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 5 · Section 3 · Subsection 3"
            title="Cost Control"
            description="Cost monitoring, progress reporting, forecasting techniques, cost value reconciliation and earned value analysis."
            tone="purple"
          />

          <TLDR
            points={[
              "Cost control = comparing actual + committed against budget, forecasting cost-to-complete, taking corrective action.",
              "Earned Value Management (EVM): plan value (PV), earned value (EV), actual cost (AC) — give cost/schedule variance and forecast at completion.",
              "Cost-Value Reconciliation (CVR) is the UK construction industry’s monthly discipline — every project, every month, no excuses.",
              "Forecast Final Cost (FFC) updated monthly and signed off by the project manager — divergence from budget triggers action.",
              "Early warning of cost overrun is half the battle — projects rarely recover when overruns are reported late.",
            ]}
          />

          <RegsCallout
            source="NEC4 ECC — Clause 50.4 (Assessment of the amount due)"
            clause="The Project Manager makes assessments of the amount due in accordance with the Schedule of Cost Components or, where the Project Manager and the Contractor have agreed, the Shorter Schedule of Cost Components. The amount due includes the Price for Work Done to Date and other amounts to be paid to or retained from the Contractor."
            meaning={
              <>
                Under NEC, payment is based on actual progress (PWDD). Robust cost control with monthly EVM and CVR is the basis of accurate interim payment, accurate cost reporting and accurate compensation event assessment. Without it, you cannot answer the PM's questions at the monthly meeting.
              </>
            }
            cite="Source: NEC4 Engineering and Construction Contract — Clause 50 (refer to NEC4 published text for verbatim use)."
          />


          <LearningOutcomes
            outcomes={[
              'Implement cost monitoring systems on building services projects',
              'Prepare monthly cost reports with variance analysis',
              'Apply cost value reconciliation (CVR) techniques',
              'Calculate and interpret CPI, SPI and other EVM metrics',
              'Forecast costs at completion using different methods',
              'Take corrective action when projects deviate from budget',
            ]}
          />

          <SectionRule />

          <ConceptBlock title="Cost Monitoring Fundamentals">
            <p>
              Effective cost control requires systematic monitoring throughout the project
              lifecycle. For building services installations, this means tracking labour, materials,
              plant, and subcontract costs against the budget and work completed.
            </p>
            <p>
              <strong>Key cost monitoring elements:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Actual costs:</strong> What has been spent to date (invoiced and paid)
              </li>
              <li>
                <strong>Committed costs:</strong> Orders placed but not yet invoiced
              </li>
              <li>
                <strong>Accruals:</strong> Work done but not yet invoiced (estimated)
              </li>
              <li>
                <strong>Cost to complete:</strong> Forecast cost for remaining work
              </li>
            </ul>
            <p>
              <strong>Cost Categories for M&E Projects (Category — Typical % — Monitoring):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Labour (own):</strong> 25-35% — Timesheets, allocation codes
              </li>
              <li>
                <strong>Materials:</strong> 30-40% — Purchase orders, goods received
              </li>
              <li>
                <strong>Subcontractors:</strong> 15-25% — Applications, valuations
              </li>
              <li>
                <strong>Plant & equipment:</strong> 3-8% — Hire records, off-hire dates
              </li>
              <li>
                <strong>Preliminaries:</strong> 8-15% — Time-based allocation
              </li>
            </ul>
            <p>
              <strong>Building Services Example — Hospital M&E Package:</strong> A £2.5M mechanical
              installation on a hospital project requires robust cost monitoring:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Weekly labour allocation by zone (theatres, wards, plant rooms)</li>
              <li>Material deliveries tracked against procurement schedule</li>
              <li>Specialist subcontracts (controls, insulation) valued monthly</li>
              <li>Variations logged and costed within 7 days</li>
            </ul>
            <p>
              <strong>Best practice:</strong> Capture costs at the lowest practical level - this
              enables meaningful variance analysis and identifies problems early.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Cost Value Reconciliation (CVR)">
            <p>
              Cost Value Reconciliation is the UK construction industry's standard method for
              tracking project financial performance. It compares the value of work completed
              against the costs incurred to determine whether the project is making or losing money.
            </p>
            <p>
              <strong>CVR Basic Formula:</strong> Margin = Value - Cost. Where Value = certified
              work + variations + dayworks - retentions.
            </p>
            <p>
              <strong>Value Side:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Work certified to date</li>
              <li>Approved variations</li>
              <li>Pending variations (risk-adjusted)</li>
              <li>Materials on site</li>
              <li>Less: retention held</li>
            </ul>
            <p>
              <strong>Cost Side:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Labour costs to date</li>
              <li>Materials purchased</li>
              <li>Subcontract costs</li>
              <li>Plant and equipment</li>
              <li>Plus: accruals and commitments</li>
            </ul>
            <p>
              <strong>Monthly CVR Report Structure (Item — This Month — Cumulative):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Contract Value:</strong> - — £850,000
              </li>
              <li>
                <strong>Variations (approved):</strong> £12,000 — £45,000
              </li>
              <li>
                <strong>Value Certified:</strong> £95,000 — £480,000
              </li>
              <li>
                <strong>Total Costs:</strong> £88,000 — £445,000
              </li>
              <li>
                <strong>Margin:</strong> £7,000 — £35,000
              </li>
            </ul>
            <p>
              <strong>Key principle:</strong> CVR must capture all costs including accruals and
              commitments — not just what has been paid. Incomplete cost capture gives false
              confidence.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Earned Value Management (EVM)">
            <p>
              Earned Value Management is a project management technique that integrates scope,
              schedule, and cost data to provide objective measures of project performance and
              forecasts of final outcome.
            </p>
            <p>
              <strong>Core EVM Terminology:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>PV (Planned Value):</strong> Budgeted cost of work scheduled - what you
                planned to spend by now
              </li>
              <li>
                <strong>EV (Earned Value):</strong> Budgeted cost of work performed - what you've
                actually achieved
              </li>
              <li>
                <strong>AC (Actual Cost):</strong> Actual cost of work performed - what you've
                actually spent
              </li>
              <li>
                <strong>BAC (Budget at Completion):</strong> Total project budget
              </li>
            </ul>
            <p>
              <strong>Performance Indices — Cost Performance Index (CPI):</strong> CPI = EV / AC.
              CPI = 1.0: On budget; CPI &gt; 1.0: Under budget; CPI &lt; 1.0: Over budget.
            </p>
            <p>
              <strong>Schedule Performance Index (SPI):</strong> SPI = EV / PV. SPI = 1.0: On
              schedule; SPI &gt; 1.0: Ahead of schedule; SPI &lt; 1.0: Behind schedule.
            </p>
            <p>
              <strong>Variance Calculations (Metric — Formula — Interpretation):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Cost Variance (CV):</strong> EV - AC — Positive = under budget
              </li>
              <li>
                <strong>Schedule Variance (SV):</strong> EV - PV — Positive = ahead of schedule
              </li>
              <li>
                <strong>Variance at Completion (VAC):</strong> BAC - EAC — Positive = forecast
                under budget
              </li>
            </ul>
            <p>
              <strong>Building Services Example — Office Electrical Installation:</strong> Month 4
              of a £600,000 electrical installation:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>BAC = £600,000 (total budget)</li>
              <li>PV = £240,000 (planned progress by month 4)</li>
              <li>EV = £210,000 (actual work completed, at budget rates)</li>
              <li>AC = £230,000 (actual cost spent)</li>
              <li>
                CPI = £210,000 / £230,000 = <strong>0.91</strong> (9% over budget)
              </li>
              <li>
                SPI = £210,000 / £240,000 = <strong>0.88</strong> (12% behind schedule)
              </li>
              <li>
                <strong>Warning:</strong> Project is over budget AND behind schedule.
              </li>
            </ul>
            <p>
              <strong>Trend analysis:</strong> Track CPI and SPI monthly. A declining trend requires
              immediate investigation, even if still above 1.0.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Forecasting and Progress Reporting">
            <p>
              Forecasting the final project cost is essential for commercial management. Several
              methods exist, each with different assumptions about future performance.
            </p>
            <p>
              <strong>Estimate at Completion (EAC) Methods (Method — Formula — When to Use):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Budget rate:</strong> AC + (BAC - EV) — Expect original estimates for
                remaining work
              </li>
              <li>
                <strong>CPI trend:</strong> BAC / CPI — Current performance will continue
              </li>
              <li>
                <strong>Combined:</strong> AC + (BAC-EV)/(CPI×SPI) — Both cost and schedule affect
                remaining work
              </li>
              <li>
                <strong>Bottom-up:</strong> AC + Re-estimate — Major scope changes, fresh estimate
                needed
              </li>
            </ul>
            <p>
              <strong>To Complete Performance Index (TCPI):</strong> TCPI = (BAC - EV) / (BAC - AC).
              Required future efficiency to meet budget.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>TCPI = 1.0: Must maintain current efficiency to meet budget</li>
              <li>TCPI &gt; 1.0: Must improve efficiency to meet budget</li>
              <li>TCPI &gt; 1.2: Meeting budget is very unlikely</li>
            </ul>
            <p>
              <strong>Monthly Cost Report Contents — Executive Summary:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Current position vs budget</li>
              <li>Key variances and causes</li>
              <li>Forecast final cost</li>
              <li>Risks and opportunities</li>
            </ul>
            <p>
              <strong>Detailed Analysis:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Cost breakdown by category</li>
              <li>Variance analysis by element</li>
              <li>Cash flow forecast</li>
              <li>Corrective actions</li>
            </ul>
            <p>
              <strong>Variance Analysis — Common Causes on M&E Projects (Type — Causes — Action):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Labour overspend:</strong> Low productivity, rework, overtime — Method
                review, resource change
              </li>
              <li>
                <strong>Material overspend:</strong> Price increases, waste, theft — Procurement
                review, site control
              </li>
              <li>
                <strong>Schedule delay:</strong> Access issues, design changes — Acceleration,
                re-sequence
              </li>
              <li>
                <strong>Subcontract overrun:</strong> Scope creep, claims — Contract review,
                negotiation
              </li>
            </ul>
            <p>
              <strong>Reporting tip:</strong> Present trends graphically — an S-curve showing
              planned vs actual progress, or a chart of CPI/SPI over time, communicates status
              faster than tables alone.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1 — CVR Calculation:</strong> An electrical package has Contract sum
              £450,000, variations approved £32,000, work certified £280,000. Costs to date: labour
              £95,000, materials £120,000, subcontractors £45,000, plant £8,000. Calculate margin to
              date.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Value to date = Work certified = <strong>£280,000</strong>
              </li>
              <li>Labour: £95,000</li>
              <li>Materials: £120,000</li>
              <li>Subcontractors: £45,000</li>
              <li>Plant: £8,000</li>
              <li>
                Total costs = £95,000 + £120,000 + £45,000 + £8,000 = <strong>£268,000</strong>
              </li>
              <li>
                Margin = Value - Cost = £280,000 - £268,000 = <strong>£12,000 profit</strong>
              </li>
              <li>
                Margin % = £12,000 / £280,000 = <strong>4.3%</strong>
              </li>
            </ul>
            <p>
              <strong>Example 2 — EVM Performance Analysis:</strong> A mechanical installation has
              BAC = £800,000, PV = £400,000, EV = £350,000, AC = £380,000. Calculate CPI, SPI, and
              EAC.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                CPI = EV / AC = £350,000 / £380,000 = <strong>0.92</strong>
              </li>
              <li>
                SPI = EV / PV = £350,000 / £400,000 = <strong>0.88</strong>
              </li>
              <li>EAC (using CPI trend) = BAC / CPI</li>
              <li>
                EAC = £800,000 / 0.92 = <strong>£869,565</strong>
              </li>
              <li>
                <strong>Forecast overrun</strong> = £869,565 - £800,000 = £69,565 (8.7%)
              </li>
            </ul>
            <p>
              <strong>Example 3 — TCPI Calculation:</strong> Using the same project: BAC =
              £800,000, EV = £350,000, AC = £380,000. What efficiency is needed for remaining work
              to meet budget?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>TCPI = (BAC - EV) / (BAC - AC)</li>
              <li>TCPI = (£800,000 - £350,000) / (£800,000 - £380,000)</li>
              <li>
                TCPI = £450,000 / £420,000 = <strong>1.07</strong>
              </li>
              <li>Remaining work must be completed at 107% efficiency</li>
              <li>
                <strong>This is achievable with corrective action</strong> — CPI must improve from
                0.92 to 1.07.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Cost control checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Establish cost codes aligned with tender breakdown</li>
              <li>Capture all costs including accruals and commitments</li>
              <li>Reconcile costs to value monthly (minimum)</li>
              <li>Investigate variances greater than 5% immediately</li>
              <li>Update forecast monthly based on current performance</li>
              <li>Document assumptions behind cost to complete</li>
            </ul>
            <p>
              <strong>Key values to remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>CPI = 1.0: On budget; SPI = 1.0: On schedule</li>
              <li>TCPI &gt; 1.2: Budget recovery unlikely</li>
              <li>EAC = BAC / CPI: Most common forecast method</li>
              <li>Labour typically 40-50% of M&E costs</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Incomplete cost capture</strong> — Missing commitments gives false
                  confidence
                </li>
                <li>
                  <strong>Optimistic forecasts</strong> — Using budget rates when CPI shows
                  underperformance
                </li>
                <li>
                  <strong>Late reporting</strong> — Monthly reports more than 2 weeks after period
                  end lose value
                </li>
                <li>
                  <strong>No variance analysis</strong> — Numbers without explanation don't drive
                  improvement
                </li>
              </ul>
            }
            doInstead="Capture every committed cost and accrual, base forecasts on the CPI trend rather than budget rates when CPI is below 1, publish reports within two weeks of period end, and explain every material variance with a corrective action."
          />

          <SectionRule />

          <Scenario
            title="Surprise loss declared at month nine"
            situation={
              <>
                Your monthly CVR has shown the project at "on budget" for eight months. At month nine, the QS reports a £220k loss after recalculating against actuals — two subcontractors' costs were under-accrued, and a programme slip has not been reflected in the FFC. Your director is furious; the client is suspicious.
              </>
            }
            whatToDo={
              <>
                Audit the CVR methodology immediately — actuals must include accruals (work done, not yet invoiced), committed costs (purchase orders), and labour booked but not yet paid. Re-baseline the FFC honestly. From now on, CVR is reviewed monthly by the QS with the project manager, signed off in writing, and challenged by the commercial director — no rubber-stamping. Implement EVM if not already in use to give an early warning of variance.
              </>
            }
            whyItMatters={
              <>
                Cost control discipline catches problems early. A £220k loss at month nine has time to recover; a £220k loss at month nineteen does not. The monthly CVR is the project's health check — skip it and you skip the diagnosis.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

                    <KeyTakeaways
            points={[
              "Cost control = actual + committed vs budget; forecast CTC; corrective action.",
              "EVM: PV, EV, AC; CV = EV–AC; SV = EV–PV; CPI = EV/AC; SPI = EV/PV.",
              "Forecast at Completion (EAC) = AC + (BAC – EV)/CPI for typical performance.",
              "CVR monthly: every project, every month — no exceptions.",
              "Forecast Final Cost signed off monthly by project manager — divergence triggers action.",
              "Accruals (work done not invoiced) and commitments (POs raised) included in actual cost.",
              "Early warning of cost overrun gives time to recover; late warning does not.",
              "Under NEC, robust cost control is the basis of PWDD interim payment — Clause 50.",
            ]}
          />


          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module5-section3-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Budget development
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module5-section3-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Variations and claims
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule5Section3_3;
