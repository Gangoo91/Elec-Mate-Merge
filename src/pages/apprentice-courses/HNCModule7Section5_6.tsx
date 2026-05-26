/**
 * Module 7 · Section 5 · Subsection 6 — Efficiency Retrofits
 * HNC Electrical Engineering for Building Services (Power and Lighting Systems)
 *   Assessment methodology, business case development, implementation planning, and verification of savings
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  ConceptBlock,
  CommonMistake,
  LearningOutcomes,
  FAQ,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Efficiency Retrofits - HNC Module 7 Section 5.6';
const DESCRIPTION =
  'Master efficiency retrofit methodology for building electrical systems: assessment techniques, business case development, LED retrofit considerations, implementation planning, IPMVP verification, and post-retrofit commissioning.';

const quickCheckQuestions = [
  {
    id: 'retrofit-assessment',
    question: 'What is the primary purpose of an energy audit in retrofit planning?',
    options: [
      'With supervision, PPE, GS38 leads, and controlled area',
      'To prevent accidents, legal non-compliance, and property damage',
      'Licensed, notifiable non-licensed (NNLW), and non-licensed',
      'To identify energy saving opportunities and quantify potential savings',
    ],
    correctIndex: 3,
    explanation:
      'An energy audit systematically identifies energy saving opportunities, quantifies current consumption, and estimates potential savings. This data forms the foundation for business case development and retrofit prioritisation.',
  },
  {
    id: 'business-case',
    question: 'Which financial metric is most commonly used to evaluate retrofit investments?',
    options: [
      'Operating margin',
      'Current ratio',
      'Simple payback period',
      'Gross profit margin',
    ],
    correctIndex: 2,
    explanation:
      'Simple payback period (investment cost divided by annual savings) is the most widely used metric for retrofit evaluation. Whilst NPV and IRR provide more sophisticated analysis, payback period is universally understood by stakeholders.',
  },
  {
    id: 'led-retrofit',
    question:
      'When retrofitting fluorescent fittings with LED tubes, which safety consideration is paramount?',
    options: [
      'Review all explanations and identify knowledge gaps',
      'An area of higher heat transfer through the building envelope',
      'Compatibility with existing ballasts or bypass requirements',
      'It provides the framework under which more specific regulations can be made',
    ],
    correctIndex: 2,
    explanation:
      'Ballast compatibility is the critical safety consideration. Type A LED tubes work with existing ballasts, Type B require ballast bypass, and Type C require new LED drivers. Incorrect selection can cause fire risks or equipment damage.',
  },
  {
    id: 'ipmvp-verification',
    question: 'What does IPMVP Option C require for measurement and verification?',
    options: [
      'It demonstrates competence, commitment to standards, and ethical conduct',
      'Both operational and embodied carbon emissions',
      'Due to cable length, connections, or temperature differences',
      'Whole facility utility metering with regression analysis',
    ],
    correctIndex: 3,
    explanation:
      'IPMVP Option C uses whole facility utility data with regression analysis to verify savings. It compares pre-retrofit and post-retrofit consumption, adjusted for variables like weather and occupancy, to quantify actual energy reductions.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Which level of energy audit provides the most detailed analysis for retrofit planning?',
    options: [
      'Walk-through audit (Level 1)',
      'Investment-grade audit (Level 3)',
      'General audit (Level 2)',
      'Desktop audit (Level 0)',
    ],
    correctAnswer: 1,
    explanation:
      'Investment-grade audit (Level 3) provides detailed engineering analysis, metering data, life-cycle cost analysis, and financial projections suitable for securing capital investment for major retrofit projects.',
  },
  {
    id: 2,
    question:
      'For a lighting retrofit business case, which costs should be included beyond equipment?',
    options: [
      'Ballast bypass - direct mains connection to lamp holders',
      'Additional savings from occupancy sensors, daylight dimming, and scheduling',
      'Equipment, installation, disposal, and any control system upgrades',
      'How one efficiency measure affects the savings of another',
    ],
    correctAnswer: 2,
    explanation:
      'A comprehensive business case includes capital costs (equipment, installation, controls), disposal costs for removed equipment, and considers all revenue implications (energy savings, maintenance savings, carbon reduction benefits).',
  },
  {
    id: 3,
    question:
      'What is the typical acceptable simple payback period for most commercial retrofit projects?',
    options: [
      '7-10 years',
      'Less than 1 year',
      'Over 15 years',
      '2-5 years',
    ],
    correctAnswer: 3,
    explanation:
      'Most commercial organisations accept payback periods of 2-5 years for retrofit investments. Shorter paybacks are preferred but rare for comprehensive projects; longer paybacks typically require additional drivers like regulatory compliance or sustainability targets.',
  },
  {
    id: 4,
    question: 'When conducting a pre-retrofit baseline, measurements should ideally cover:',
    options: [
      'A minimum of 12 months to capture seasonal variation',
      'Light levels, control functionality, and energy consumption',
      'Changes in independent variables like weather and occupancy',
      'Individual retrofit measures can be isolated and metered',
    ],
    correctAnswer: 0,
    explanation:
      'A 12-month baseline captures seasonal variations in consumption, occupancy patterns, and weather effects. This comprehensive baseline is essential for accurate post-retrofit savings verification using regression analysis.',
  },
  {
    id: 5,
    question: 'Type B LED retrofit tubes require:',
    options: [
      'Light levels, control functionality, and energy consumption',
      'Ballast bypass - direct mains connection to lamp holders',
      'Both a 6 kW reduction and 50% improvement',
      'Individual retrofit measures can be isolated and metered',
    ],
    correctAnswer: 1,
    explanation:
      'Type B LED tubes operate directly from mains voltage and require the existing ballast to be bypassed. This involves isolating the ballast and connecting live and neutral directly to the lamp holders - work requiring a competent person.',
  },
  {
    id: 6,
    question: 'IPMVP Option A is most appropriate when:',
    options: [
      'Whole building savings must be verified',
      'No metering is available',
      'Individual retrofit measures can be isolated and metered',
      'Multiple interactive measures are installed simultaneously',
    ],
    correctAnswer: 2,
    explanation:
      'Option A (Retrofit Isolation: Key Parameter Measurement) is suitable when specific retrofit measures can be isolated and key parameters metered. It uses spot or short-term measurements with engineering calculations for other variables.',
  },
  {
    id: 7,
    question: 'Post-retrofit commissioning of lighting systems should verify:',
    options: [
      'Equipment, installation, disposal, and any control system upgrades',
      'Cash flows over the project life discounted to present value',
      'Individual retrofit measures can be isolated and metered',
      'Light levels, control functionality, and energy consumption',
    ],
    correctAnswer: 3,
    explanation:
      'Comprehensive commissioning verifies illuminance levels meet design requirements, control systems function correctly (sensors, dimming, scheduling), and energy consumption aligns with predicted savings.',
  },
  {
    id: 8,
    question: 'When calculating LED retrofit savings, the control factor accounts for:',
    options: [
      'Additional savings from occupancy sensors, daylight dimming, and scheduling',
      'Changes in independent variables like weather and occupancy',
      'Ballast bypass - direct mains connection to lamp holders',
      'Individual retrofit measures can be isolated and metered',
    ],
    correctAnswer: 0,
    explanation:
      'The control factor multiplies baseline savings by the additional reduction achieved through intelligent controls. Occupancy sensing typically adds 20-30% savings, daylight dimming 15-25%, and scheduling 5-15% beyond lamp efficiency gains.',
  },
  {
    id: 9,
    question: 'Net Present Value (NPV) for retrofit projects considers:',
    options: [
      'Light levels, control functionality, and energy consumption',
      'Cash flows over the project life discounted to present value',
      'A minimum of 12 months to capture seasonal variation',
      'Ballast bypass - direct mains connection to lamp holders',
    ],
    correctAnswer: 1,
    explanation:
      "NPV calculates the present value of all future cash flows (savings minus costs) over the project's life, discounted at an appropriate rate. A positive NPV indicates the project exceeds the required return on investment.",
  },
  {
    id: 10,
    question: 'Interactive effects in retrofit projects refer to:',
    options: [
      'User interface design for control systems',
      'Stakeholder engagement processes',
      'How one efficiency measure affects the savings of another',
      'Communication between building systems',
    ],
    correctAnswer: 2,
    explanation:
      'Interactive effects describe how efficiency measures influence each other. For example, LED lighting generates less heat, reducing cooling loads but potentially increasing heating requirements - these interactions must be considered in savings calculations.',
  },
  {
    id: 11,
    question:
      'A lighting power density reduction from 12 W/m² to 6 W/m² in a 1,000 m² office represents:',
    options: [
      '6 kW of connected load reduction',
      '50% reduction in lighting energy consumption',
      '12 kW of savings',
      'Both a 6 kW reduction and 50% improvement',
    ],
    correctAnswer: 3,
    explanation:
      'The retrofit reduces connected load by 6 kW (12-6 W/m² × 1,000 m²) which is a 50% reduction. Annual energy savings depend on operating hours - at 2,500 hours/year, this equals 15,000 kWh annually.',
  },
  {
    id: 12,
    question: 'The regression model baseline adjustment in IPMVP accounts for:',
    options: [
      'Changes in independent variables like weather and occupancy',
      'Light levels, control functionality, and energy consumption',
      'Additional savings from occupancy sensors, daylight dimming, and scheduling',
      'Cash flows over the project life discounted to present value',
    ],
    correctAnswer: 0,
    explanation:
      "Regression analysis adjusts the baseline for changes in independent variables (weather, occupancy, production) between pre and post-retrofit periods. This isolates the retrofit's impact from other factors affecting consumption.",
  },
];

const faqs = [
  {
    question: 'How do I determine whether to retrofit or replace lighting fittings entirely?',
    answer:
      'Consider fitting age, condition, and compatibility. Retrofit (e.g., LED tubes in existing fittings) suits newer fixtures in good condition with compatible components. Complete replacement is preferred when fittings are aged, contain degraded components, or when modern integrated LED luminaires offer significantly better performance. Whole-fitting replacement also avoids ballast compatibility issues and typically provides better aesthetics and longer warranties.',
  },
  {
    question: 'What baseline data is essential before commencing a retrofit project?',
    answer:
      'Essential baseline data includes: 12 months of utility consumption data (metered kWh), installed equipment inventory (types, quantities, wattages), operating schedules and occupancy patterns, lighting levels survey (lux readings), and any sub-metering data available. For IPMVP compliance, document independent variables like weather data, occupancy, and production metrics that correlate with energy use.',
  },
  {
    question: 'How should I handle retrofit projects where the client wants minimal disruption?',
    answer:
      'Plan out-of-hours installation where possible, phase the work by zones/floors to maintain operational areas, use quick-installation products designed for retrofit (e.g., magnetic LED panels), coordinate with building management for optimal timing, and ensure all materials are pre-delivered and staged. Provide clear communication on affected areas and duration. Consider weekend or holiday shutdown periods for intensive work phases.',
  },
  {
    question: 'What warranties should I expect from LED retrofit products?',
    answer:
      'Quality LED products typically offer 5-year warranties covering luminous flux maintenance (L70 or L80 rating), driver failure, and material defects. Premium products may offer 7-10 year warranties. Ensure warranties are manufacturer-backed (not just distributor), cover labour costs for replacement, and specify conditions (operating hours, temperature limits, surge protection). Driver warranties often differ from LED chip warranties - verify both.',
  },
  {
    question: 'How do carbon savings factor into retrofit business cases?',
    answer:
      'Carbon savings strengthen business cases through: potential income from carbon credits or certificates, compliance with mandatory carbon reporting requirements, contribution to corporate sustainability targets, and reputational benefits. Calculate carbon savings using grid emission factors (currently approximately 0.21 kgCO₂/kWh for UK grid). Some organisations apply internal carbon pricing (£50-100/tonne CO₂) which can significantly improve project NPV.',
  },
  {
    question: 'What ongoing monitoring should follow a retrofit project?',
    answer:
      'Implement continuous or regular monitoring including: monthly energy consumption tracking against predicted savings, periodic lighting level verification (annually minimum), control system functionality checks, maintenance logging for failures and replacements, and user feedback collection. Compare actual versus predicted performance and investigate significant variances. This data supports warranty claims, future project planning, and demonstrates value to stakeholders.',
  },
];

const HNCModule7Section5_6 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate("/study-centre/apprentice/h-n-c-module7-section5")}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 7 · Section 5 · Subsection 6"
            title="Efficiency Retrofits"
            description="Assessment methodology, business case development, implementation planning, and verification of savings"
            tone="purple"
          />

          <LearningOutcomes
            outcomes={[
              "Conduct systematic energy audits at appropriate levels",
              "Develop compelling business cases with financial analysis",
              "Plan and specify LED retrofit projects safely",
              "Apply IPMVP methodology for savings verification",
              "Commission retrofit installations effectively",
              "Implement post-retrofit monitoring and reporting",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="Assessment Methodology and Energy Audits">
            <p>Effective retrofit planning begins with systematic energy assessment. Energy audits identify opportunities, quantify potential savings, and provide the data foundation for business case development and project specification.</p>
            <p><strong>Energy Audit Levels (ASHRAE Standard):</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Level 1 - Walk-through audit:</strong> Visual inspection, utility bill analysis, identifies obvious opportunities</li>
              <li><strong>Level 2 - General audit:</strong> Detailed analysis, equipment inventory, calculated savings estimates</li>
              <li><strong>Level 3 - Investment-grade audit:</strong> Engineering analysis, monitoring data, life-cycle costing for capital decisions</li>
            </ul>
            <p><strong>Audit Level Selection Guide</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Level 1:</strong> 1-2 days — Visual, utility bills — Initial screening, small buildings</li>
              <li><strong>Level 2:</strong> 1-2 weeks — Inventory, spot measurements — Standard commercial projects</li>
              <li><strong>Level 3:</strong> 4-8 weeks — Extended monitoring, modelling — Major investments, complex buildings</li>
            </ul>
            <p><strong>Lighting Survey Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Equipment inventory:</strong> Lamp types, wattages, quantities, control gear</li>
              <li><strong>Operating hours:</strong> Actual usage patterns, not assumptions</li>
              <li><strong>Illuminance levels:</strong> Measured lux at task plane</li>
              <li><strong>Control systems:</strong> Existing sensors, switches, scheduling</li>
              <li><strong>Condition assessment:</strong> Fitting age, maintenance state, failures</li>
            </ul>
            <p><strong>Best practice:</strong> Use data loggers to capture actual operating hours rather than relying on stated schedules - real usage often differs significantly from design assumptions.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Business Case Development">
            <p>A compelling business case translates technical savings into financial terms that stakeholders understand. Effective business cases address investment requirements, returns, risks, and non-financial benefits.</p>
            <p><strong>Capital Costs</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Equipment procurement</li>
              <li>Installation labour</li>
              <li>Control system upgrades</li>
              <li>Professional fees</li>
              <li>Disposal costs</li>
            </ul>
            <p><strong>Revenue Benefits</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Energy cost savings</li>
              <li>Maintenance reduction</li>
              <li>Carbon credit value</li>
              <li>Enhanced Capital Allowances</li>
              <li>Avoided replacement costs</li>
            </ul>
            <p><strong>Non-Financial Benefits</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Improved light quality</li>
              <li>Reduced maintenance disruption</li>
              <li>Corporate sustainability</li>
              <li>Regulatory compliance</li>
              <li>Occupant satisfaction</li>
            </ul>
            <p><strong>Financial Analysis Methods</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Simple Payback:</strong> Capital Cost ÷ Annual Savings — &lt; 5 years</li>
              <li><strong>Net Present Value (NPV):</strong> ∑ Discounted Cash Flows - Initial Investment — &gt; £0 (positive)</li>
              <li><strong>Internal Rate of Return (IRR):</strong> Discount rate where NPV = 0 — &gt; 15% typically</li>
              <li><strong>Return on Investment (ROI):</strong> (Net Benefit ÷ Cost) × 100% — &gt; 20% annually</li>
            </ul>
            <p><strong>Sample Payback Calculation</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Project:</strong> Office LED Retrofit - 500 fittings</li>
              <li><strong>Capital cost:</strong> £45,000 (equipment + installation)</li>
              <li><strong>Energy saving:</strong> 75,000 kWh/year @ £0.30/kWh = £22,500/year</li>
              <li><strong>Maintenance saving:</strong> £3,500/year</li>
              <li><strong>Total annual saving:</strong> £26,000</li>
            </ul>
            <p>Simple payback: £45,000 ÷ £26,000 = 1.7 years</p>
            <p><strong>Stakeholder tip:</strong> Present payback for finance teams, NPV for senior management, and carbon savings for sustainability officers - tailor metrics to audience.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="LED Retrofit Considerations and Implementation">
            <p>LED retrofits offer substantial energy savings but require careful specification and installation. Understanding retrofit options, compatibility requirements, and installation safety is essential for successful projects.</p>
            <p><strong>LED Retrofit Tube Types</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Type A:</strong> Works with existing ballast — Simple lamp swap — Ballast compatibility critical</li>
              <li><strong>Type B:</strong> Ballast bypass required — Rewiring needed — Mains voltage at lamp holder</li>
              <li><strong>Type C:</strong> External LED driver — Driver installation — Correct driver matching</li>
              <li><strong>Type A+B (Hybrid):</strong> Either mode — Flexible installation — Clear labelling essential</li>
            </ul>
            <p><strong>Critical Safety Warning - Type B Installation</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Type B tubes have mains voltage directly at lamp pins</li>
              <li>Fitting must be permanently modified and labelled for LED only</li>
              <li>Installation by competent persons under BS 7671 only</li>
              <li>Clear warning labels must prevent fluorescent tube reinsertion</li>
              <li>Single-ended connection (live + neutral one end) preferred for safety</li>
            </ul>
            <p><strong>Implementation Planning Checklist</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Site survey:</strong> Confirm fitting types, access requirements, electrical infrastructure</li>
              <li><strong>Specification:</strong> Lumen output, colour temperature, CRI, beam angle, dimming compatibility</li>
              <li><strong>Phasing:</strong> Plan installation by zones to maintain building operation</li>
              <li><strong>Access equipment:</strong> Scaffold, MEWP, or tower requirements</li>
              <li><strong>Disposal:</strong> WEEE compliant removal of fluorescent lamps and control gear</li>
              <li><strong>Documentation:</strong> Updated drawings, O&amp;M manuals, test certificates</li>
            </ul>
            <p><strong>Control System Upgrades</strong></p>
            <p><strong>Occupancy Sensing</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>PIR or microwave detection</li>
              <li>Presence/absence modes</li>
              <li>Typical saving: 20-30%</li>
              <li>Best for: toilets, corridors, meeting rooms</li>
            </ul>
            <p><strong>Daylight Dimming</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Photocell control</li>
              <li>Maintains target lux level</li>
              <li>Typical saving: 15-25%</li>
              <li>Best for: perimeter zones, atria</li>
            </ul>
            <p><strong>Specification tip:</strong> Always specify colour temperature consistently (e.g., 4000K throughout) - mixing creates visual discomfort and complaints.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="IPMVP Verification and Post-Retrofit Commissioning">
            <p>The International Performance Measurement and Verification Protocol (IPMVP) provides standardised methods for quantifying energy savings. Proper verification demonstrates project success and supports warranty claims, incentive applications, and future projects.</p>
            <p><strong>IPMVP Option Selection</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Option A:</strong> Retrofit isolation: key parameter measurement — Single isolated measures, lighting retrofits</li>
              <li><strong>Option B:</strong> Retrofit isolation: all parameter measurement — Variable loads, motors, chillers</li>
              <li><strong>Option C:</strong> Whole facility: utility metering — Multiple measures, whole building approach</li>
              <li><strong>Option D:</strong> Calibrated simulation — Complex buildings, new construction</li>
            </ul>
            <p><strong>IPMVP Savings Equation</strong></p>
            <p>Energy Savings = (Baseline Energy - Reporting Period Energy) ± Adjustments</p>
            <p>Where adjustments account for:</p>
            <p>• Changes in weather (degree days)</p>
            <p>• Changes in occupancy</p>
            <p>• Changes in operating hours</p>
            <p>• Changes in production (if applicable)</p>
            <p><strong>Post-Retrofit Commissioning Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Illuminance verification:</strong> Measure lux levels at task plane against design specification</li>
              <li><strong>Power measurement:</strong> Confirm actual wattage matches specification</li>
              <li><strong>Control functionality:</strong> Test all sensors, dimmers, scheduling, and override functions</li>
              <li><strong>Emergency lighting:</strong> Full duration test of maintained and non-maintained fittings</li>
              <li><strong>Documentation:</strong> As-built drawings, test certificates, programming records</li>
            </ul>
            <p><strong>M&amp;V Reporting Timeline</strong></p>
            <p><strong>Short-term (0-3 months)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Commissioning completion report</li>
              <li>Initial power measurements</li>
              <li>Control system verification</li>
              <li>Snagging resolution</li>
            </ul>
            <p><strong>Long-term (12+ months)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Full year energy comparison</li>
              <li>Regression-adjusted baseline</li>
              <li>Verified savings calculation</li>
              <li>Performance guarantee assessment</li>
            </ul>
            <p><strong>Verification principle:</strong> Savings cannot be directly measured - they represent the absence of energy use. IPMVP provides the methodology to calculate what would have been consumed without the retrofit.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: LED Retrofit Savings Calculation</strong>
            </p>
            <p><strong>Scenario:</strong> Calculate annual savings for an office lighting retrofit.</p>
            <p>Existing system:</p>
            <p>100 × T8 fluorescent fittings, 2 × 58W lamps + HF ballast</p>
            <p>Total load: 100 × 116W = 11.6 kW</p>
            <p>Operating hours: 2,500 hours/year</p>
            <p>Annual consumption: 11.6 × 2,500 = 29,000 kWh</p>
            <p>Proposed LED system:</p>
            <p>100 × LED panels, 40W each = 4.0 kW</p>
            <p>Annual consumption: 4.0 × 2,500 = 10,000 kWh</p>
            <p>Savings calculation:</p>
            <p>Energy saved: 29,000 - 10,000 = 19,000 kWh/year</p>
            <p>At £0.30/kWh: 19,000 × 0.30 = £5,700/year</p>
            <p>With occupancy controls (+25%): £5,700 × 1.25 = £7,125/year</p>
            <p>Total annual saving: £7,125 (75% reduction)</p>
            <p>
              <strong>Example 2: NPV Analysis for Retrofit Investment</strong>
            </p>
            <p><strong>Scenario:</strong> Evaluate a £50,000 retrofit with £15,000 annual savings over 10 years.</p>
            <p>Parameters:</p>
            <p>Initial investment: £50,000</p>
            <p>Annual savings: £15,000</p>
            <p>Project life: 10 years</p>
            <p>Discount rate: 8%</p>
            <p>NPV calculation:</p>
            <p>Present value of annuity factor (8%, 10 years): 6.71</p>
            <p>PV of savings: £15,000 × 6.71 = £100,650</p>
            <p>NPV: £100,650 - £50,000 = £50,650</p>
            <p>Simple payback: £50,000 ÷ £15,000 = 3.3 years</p>
            <p>Decision: Positive NPV = proceed with investment</p>
            <p>
              <strong>Example 3: Baseline Adjustment Using Regression</strong>
            </p>
            <p><strong>Scenario:</strong> Adjust baseline consumption for weather changes using IPMVP Option C.</p>
            <p>Baseline period (pre-retrofit):</p>
            <p>Annual consumption: 450,000 kWh</p>
            <p>Heating degree days (HDD): 2,200</p>
            <p>Cooling degree days (CDD): 150</p>
            <p>Regression model: kWh = 180,000 + (100 × HDD) + (200 × CDD)</p>
            <p>Reporting period (post-retrofit):</p>
            <p>Actual consumption: 320,000 kWh</p>
            <p>HDD: 2,400 (colder year)</p>
            <p>CDD: 180 (warmer summer)</p>
            <p>Adjusted baseline:</p>
            <p>180,000 + (100 × 2,400) + (200 × 180) = 456,000 kWh</p>
            <p>Verified savings: 456,000 - 320,000 = 136,000 kWh (30%)</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Retrofit Project Checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Complete energy audit at appropriate level (1, 2, or 3)</li>
              <li>Establish 12-month baseline with metering and weather data</li>
              <li>Develop business case with payback, NPV, and non-financial benefits</li>
              <li>Specify retrofit approach (lamp replacement vs complete fitting)</li>
              <li>Plan installation phasing to minimise operational disruption</li>
              <li>Commission and verify against design specification</li>
              <li>Implement ongoing M&amp;V programme per IPMVP</li>
            </ul>
            <p>
              <strong>Key Values to Remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Typical LED retrofit savings: <strong>50-70%</strong> energy reduction</li>
              <li>Control system additions: <strong>20-40%</strong> additional savings</li>
              <li>Target payback period: <strong>2-5 years</strong> for commercial</li>
              <li>Baseline period: <strong>12 months</strong> minimum for M&amp;V</li>
              <li>LED lamp life: <strong>50,000+ hours</strong> (L70 rating)</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Over-estimating savings</strong> - Use measured data, not manufacturer claims</li>
                <li><strong>Ignoring interactive effects</strong> - Less heat from LEDs affects HVAC loads</li>
                <li><strong>Wrong tube type selection</strong> - Type B in Type A fitting causes safety risk</li>
                <li><strong>Insufficient baseline</strong> - Short periods miss seasonal variations</li>
              </ul>
            }
            doInstead="Cross-check assumptions against published guidance, validate measured values against design intent, and engage the wider team early when interface issues emerge."
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module7-section5-5")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Demand management
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module7-section6")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                System integration
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule7Section5_6;
