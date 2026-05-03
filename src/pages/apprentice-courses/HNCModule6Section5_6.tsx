/**
 * Module 6 · Section 5 · Subsection 6 — Energy Efficiency Measures
 * HNC Electrical Engineering for Building Services (Sustainability and Environmental Engineering)
 *   ECM identification, payback analysis, implementation priorities, and verification of savings
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

const TITLE = 'Energy Efficiency Measures - HNC Module 6 Section 5.6';
const DESCRIPTION =
  'Master energy conservation measure identification, payback analysis, implementation priorities, and measurement and verification for building services projects.';

const quickCheckQuestions = [
  {
    id: 'ecm-definition',
    question: 'What is an Energy Conservation Measure (ECM)?',
    options: [
      'Any building maintenance activity',
      'A specific action that reduces energy consumption while maintaining service levels',
      'A renewable energy installation only',
      'A regulatory compliance requirement',
    ],
    correctIndex: 1,
    explanation:
      'An ECM is a specific, identifiable action that reduces energy consumption or cost while maintaining or improving the required level of service, comfort, or productivity in a building.',
  },
  {
    id: 'simple-payback',
    question:
      'A lighting upgrade costs £12,000 and saves £3,000 annually. What is the simple payback period?',
    options: ['3 years', '4 years', '5 years', '6 years'],
    correctIndex: 1,
    explanation:
      'Simple payback = Initial cost ÷ Annual savings = £12,000 ÷ £3,000 = 4 years. This means the investment will be recovered through energy savings in 4 years.',
  },
  {
    id: 'ipmvp-purpose',
    question: 'What is the primary purpose of the IPMVP protocol?',
    options: [
      'To design energy systems',
      'To standardise measurement and verification of energy savings',
      'To calculate carbon emissions',
      'To specify equipment ratings',
    ],
    correctIndex: 1,
    explanation:
      'The International Performance Measurement and Verification Protocol (IPMVP) provides standardised methods for determining energy and water savings from efficiency projects, ensuring consistent and credible verification.',
  },
  {
    id: 'rebound-effect',
    question: "What is the 'rebound effect' in energy efficiency?",
    options: [
      'Equipment bouncing back to original settings',
      'Increased energy use due to behavioural changes after efficiency improvements',
      'Energy prices returning to normal',
      'Temporary increase during commissioning',
    ],
    correctIndex: 1,
    explanation:
      "The rebound effect occurs when energy efficiency improvements lead to behavioural changes that partially offset savings - for example, occupants setting thermostats higher after insulation upgrades because heating is now 'cheaper'.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Which ECM category typically offers the shortest payback period?',
    options: [
      'Building fabric improvements',
      'Plant replacement',
      'Controls and operational improvements',
      'Renewable energy systems',
    ],
    correctAnswer: 2,
    explanation:
      'Controls and operational improvements (such as BMS optimisation, scheduling adjustments, and setpoint changes) typically offer the shortest payback as they require minimal capital investment while delivering immediate savings.',
  },
  {
    id: 2,
    question:
      'A VSD installation costs £8,000, saves £2,400 per year, and has a 12-year lifespan. Using a 6% discount rate, the NPV factor for 12 years is 8.384. What is the NPV?',
    options: ['£12,122', '£20,122', '£28,800', '£-8,000'],
    correctAnswer: 0,
    explanation:
      'NPV = (Annual savings × NPV factor) - Initial cost = (£2,400 × 8.384) - £8,000 = £20,122 - £8,000 = £12,122. A positive NPV indicates the investment is financially worthwhile.',
  },
  {
    id: 3,
    question:
      'Which IPMVP option is most appropriate for verifying savings from a lighting retrofit in a single zone?',
    options: [
      'Option A: Retrofit Isolation - Key Parameter Measurement',
      'Option B: Retrofit Isolation - All Parameter Measurement',
      'Option C: Whole Facility',
      'Option D: Calibrated Simulation',
    ],
    correctAnswer: 0,
    explanation:
      "Option A is suitable for lighting retrofits where the key parameter (power) can be easily measured while other factors (hours of use) are estimated from operational schedules. It's the most cost-effective approach for isolated measures.",
  },
  {
    id: 4,
    question: 'In life cycle costing, which costs are typically included?',
    options: [
      'Capital cost only',
      'Capital, energy, maintenance, and disposal costs',
      'Energy costs only',
      'Capital and energy costs only',
    ],
    correctAnswer: 1,
    explanation:
      "Life cycle costing (LCC) includes all costs over the asset's lifespan: capital (purchase and installation), operational (energy and consumables), maintenance (servicing and repairs), and end-of-life (disposal or replacement).",
  },
  {
    id: 5,
    question: 'When prioritising ECMs, which combination of factors indicates highest priority?',
    options: [
      'Long payback, low risk, complex implementation',
      'Short payback, low risk, high energy savings',
      'Long payback, high risk, high energy savings',
      'Short payback, high risk, simple implementation',
    ],
    correctAnswer: 1,
    explanation:
      "The ideal ECM priority combines short payback (quick return on investment), low implementation risk, and high energy savings. These 'quick wins' build confidence and generate savings to fund more complex measures.",
  },
  {
    id: 6,
    question:
      'What baseline adjustment is typically required when verifying savings from HVAC improvements?',
    options: [
      'No adjustment needed',
      'Adjustment for weather (heating/cooling degree days)',
      'Adjustment for equipment age only',
      'Adjustment for electricity prices',
    ],
    correctAnswer: 1,
    explanation:
      'HVAC energy consumption varies significantly with weather. Baseline adjustments using heating and cooling degree days normalise consumption data, allowing fair comparison between pre- and post-retrofit periods regardless of weather differences.',
  },
  {
    id: 7,
    question:
      'A building has annual energy costs of £50,000. An ECM bundle with 25% savings potential costs £75,000. What is the simple payback?',
    options: ['1.5 years', '3 years', '6 years', '25 years'],
    correctAnswer: 2,
    explanation:
      'Annual savings = £50,000 × 25% = £12,500. Simple payback = £75,000 ÷ £12,500 = 6 years. This indicates a medium-term investment typically acceptable for building fabric or plant measures.',
  },
  {
    id: 8,
    question: 'Which factor most commonly causes the rebound effect in commercial buildings?',
    options: [
      'Equipment degradation',
      'Changed occupant behaviour and comfort expectations',
      'Incorrect installation',
      'Utility rate increases',
    ],
    correctAnswer: 1,
    explanation:
      "The rebound effect in commercial buildings often results from occupants changing behaviour - such as leaving equipment running longer or adjusting setpoints - when they perceive energy is 'cheaper' or 'greener' after efficiency improvements.",
  },
  {
    id: 9,
    question: 'What is the key advantage of Net Present Value (NPV) over simple payback analysis?',
    options: [
      'NPV is easier to calculate',
      'NPV accounts for the time value of money',
      'NPV ignores operating costs',
      'NPV uses standardised discount rates',
    ],
    correctAnswer: 1,
    explanation:
      'NPV accounts for the time value of money - recognising that £1 today is worth more than £1 in the future. This provides a more accurate assessment of long-term investments by discounting future cash flows to present values.',
  },
  {
    id: 10,
    question: 'IPMVP Option C (Whole Facility) measurement is most appropriate when:',
    options: [
      'Installing a single LED luminaire',
      'Multiple interacting ECMs are implemented simultaneously',
      'Verifying a specific motor replacement',
      'Testing a new control strategy in one zone',
    ],
    correctAnswer: 1,
    explanation:
      'Option C uses whole-facility metering and is appropriate when multiple ECMs interact or when individual measurement is impractical. It compares total facility consumption before and after improvements, adjusted for independent variables.',
  },
  {
    id: 11,
    question:
      'In an energy audit, ECMs are typically categorised as no-cost, low-cost, and capital measures. Which is an example of a no-cost ECM?',
    options: [
      'LED lighting installation',
      'VSD retrofit on pumps',
      'Adjusting BMS time schedules',
      'Solar PV installation',
    ],
    correctAnswer: 2,
    explanation:
      'No-cost ECMs require no financial investment - they involve operational changes like adjusting schedules, setpoints, or procedures. BMS schedule optimisation is a classic no-cost measure that can yield significant savings immediately.',
  },
  {
    id: 12,
    question:
      'What discount rate consideration is important when comparing ECM options across different equipment lifespans?',
    options: [
      'Always use 0% discount rate',
      'Use equivalent annual cost (EAC) to compare different lifespans',
      'Ignore lifespan differences',
      'Only compare equipment with identical lifespans',
    ],
    correctAnswer: 1,
    explanation:
      "Equivalent Annual Cost (EAC) converts NPV into an annual cost figure, enabling fair comparison between options with different lifespans. Without EAC, short-lifespan options may appear cheaper when they're actually more expensive per year.",
  },
];

const faqs = [
  {
    question: 'How do I identify ECMs in an existing building?',
    answer:
      'ECM identification follows a systematic process: (1) Review utility bills and benchmark against similar buildings using DEC ratings or CIBSE TM46 benchmarks; (2) Conduct a site survey to assess equipment condition, controls, and operational patterns; (3) Sub-meter or spot-measure major loads to identify wastage; (4) Interview facilities staff about operational issues and comfort complaints; (5) Review maintenance records for frequently repaired or inefficient equipment. The gap between actual and benchmark performance indicates savings potential.',
  },
  {
    question: 'When should I use NPV versus simple payback analysis?',
    answer:
      'Simple payback is appropriate for quick screening of options and for short-lived measures (under 3 years). Use NPV for measures with longer lifespans, when comparing options with different lifespans, or when making significant capital investment decisions. NPV is essential when the organisation has a required rate of return or when financing costs are significant. Most HNC-level projects require demonstrating both methods.',
  },
  {
    question: 'What baseline period is required for M&V under IPMVP?',
    answer:
      'IPMVP recommends a baseline period of at least 12 months to capture seasonal variations. For weather-dependent systems like HVAC, the baseline must include representative heating and cooling seasons. Shorter baselines (minimum 3 months) may be acceptable for non-weather-dependent measures like lighting, provided operating conditions are consistent. Document all baseline conditions, including occupancy patterns, production levels, and any unusual events.',
  },
  {
    question: 'How do I account for maintenance savings in LCC analysis?',
    answer:
      'Maintenance savings should be included as a benefit stream in LCC calculations. Compare the maintenance costs of the existing system (from maintenance records and contracts) with expected maintenance costs of the new system (from manufacturer data and industry benchmarks). Include consumables, planned maintenance labour, and estimated reactive maintenance. For newer technologies, apply a technology risk factor to maintenance estimates as real-world data may be limited.',
  },
  {
    question: 'What strategies help prevent the rebound effect?',
    answer:
      'Effective strategies include: (1) Implementing visible energy monitoring and feedback displays; (2) Maintaining engagement through ongoing awareness campaigns; (3) Setting and enforcing operational policies (e.g., fixed setpoints); (4) Using automated controls that limit manual override capability; (5) Including behavioural assumptions in M&V baseline calculations; (6) Regular review of energy performance with management reporting. The key is maintaining awareness that efficiency gains should reduce consumption, not just cost.',
  },
];

const HNCModule6Section5_6 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate("/study-centre/apprentice/h-n-c-module6-section5")}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 6 · Section 5 · Subsection 6"
            title="Energy Efficiency Measures"
            description="ECM identification, payback analysis, implementation priorities, and verification of savings"
            tone="purple"
          />

          <TLDR
            points={[
              "Energy Conservation Measures (ECMs) are identified through audit, then prioritised by payback (simple), NPV / IRR (full economic), or carbon-cost effectiveness (£/tCO₂e abated) — the right metric depends on the client driver.",
              "Typical building ECMs by sequence: lighting + controls (1–4 year payback), BMS optimisation (often <1 year), HVAC controls (2–5 years), heating/cooling plant replacement (5–15 years), fabric upgrades (10–25 years).",
              "Measurement & verification (M&V) per IPMVP (International Performance Measurement and Verification Protocol) is the institutional methodology for proving claimed savings — without M&V, claimed savings are aspirations.",
            ]}
          />

          <RegsCallout
            source="IPMVP (International Performance Measurement and Verification Protocol) + ISO 50015"
            clause="Savings shall be determined by comparing the measured energy use before and after implementation of an Energy Conservation Measure, with appropriate adjustments for changes in conditions. Adjustments shall account for changes in independent variables (e.g. weather, production, occupancy) using a method appropriate to the option (A, B, C or D) chosen. The M&V plan shall be prepared in advance of implementation and shall specify the method, baseline, measurement points, adjustment routines and reporting frequency."
            meaning={
              <>
                IPMVP options: Option A = retrofit isolation with key parameter measurement; Option B = retrofit isolation with all-parameter measurement; Option C = whole-facility metering; Option D = calibrated simulation. Option C is most common for whole-building ECMs (BMS, lighting, HVAC); Option A for isolated equipment swaps. M&V plan must be agreed before implementation, not constructed afterwards.
              </>
            }
            cite="Source: IPMVP Core Concepts (EVO, 2022) — evo-world.org; ISO 50015:2014 — iso.org"
          />

          <LearningOutcomes
            outcomes={[
              "Identify and categorise energy conservation measures",
              "Calculate simple payback, NPV, and life cycle costs",
              "Prioritise ECMs using technical and financial criteria",
              "Apply IPMVP measurement and verification options",
              "Understand and mitigate rebound effects",
              "Develop implementation strategies for ECM programmes",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="ECM Identification and Categories">
            <p>Energy Conservation Measures (ECMs) are specific, implementable actions that reduce energy consumption while maintaining or improving service delivery. Effective ECM identification requires systematic assessment of building systems, operational patterns, and occupant needs.</p>
            <p><strong>ECM Categories by Investment Level:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>No-cost measures:</strong> Operational changes - schedule adjustments, setpoint optimisation, switch-off campaigns</li>
              <li><strong>Low-cost measures:</strong> Minor modifications - LED lamp replacements, draught sealing, valve insulation</li>
              <li><strong>Capital measures:</strong> Significant investment - plant replacement, VSD installation, building fabric upgrades</li>
              <li><strong>Strategic measures:</strong> Major projects - renewable installations, combined heat and power, deep retrofits</li>
            </ul>
            <p><strong>Common ECMs in Building Services</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Lighting:</strong> LED retrofit, daylight linking, occupancy control — 40-70%</li>
              <li><strong>HVAC:</strong> VSD on fans/pumps, economiser cycles, heat recovery — 20-40%</li>
              <li><strong>Controls:</strong> BMS optimisation, weather compensation, scheduling — 10-25%</li>
              <li><strong>Motors:</strong> IE4/IE5 motors, VSD retrofit, right-sizing — 15-35%</li>
              <li><strong>Building fabric:</strong> Insulation upgrade, glazing replacement, air tightness — 10-30%</li>
            </ul>
            <p><strong>Key principle:</strong> ECMs should be identified through systematic energy audits benchmarking actual consumption against CIBSE TM46 or DEC benchmarks for the building type.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Payback Analysis and Financial Metrics">
            <p>Financial analysis determines whether ECMs represent sound investments. Different metrics suit different purposes - from quick screening to detailed investment appraisal.</p>
            <p><strong>Simple Payback</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Initial cost ÷ Annual savings</li>
              <li>Easy to calculate and understand</li>
              <li>Ignores time value of money</li>
              <li>Best for quick screening</li>
            </ul>
            <p><strong>Net Present Value (NPV)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Discounts future cash flows</li>
              <li>Accounts for time value of money</li>
              <li>Positive NPV = worthwhile</li>
              <li>Requires discount rate selection</li>
            </ul>
            <p><strong>Life Cycle Costing (LCC)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Total cost over asset life</li>
              <li>Includes maintenance, disposal</li>
              <li>Enables like-for-like comparison</li>
              <li>Required for public procurement</li>
            </ul>
            <p><strong>Payback Calculation Examples</strong></p>
            <p>Simple Payback:</p>
            <p>LED lighting upgrade: £24,000 cost, £8,000/year savings</p>
            <p>Payback = £24,000 ÷ £8,000 = 3 years</p>
            <p>NPV Calculation (10-year life, 6% discount rate):</p>
            <p>NPV factor for 6%, 10 years = 7.360</p>
            <p>PV of savings = £8,000 × 7.360 = £58,880</p>
            <p>NPV = £58,880 - £24,000 = £34,880 (positive = viable)</p>
            <p><strong>Typical Payback Expectations</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Controls/operational:</strong> 0-1 years — Immediate implementation</li>
              <li><strong>LED lighting:</strong> 2-4 years — Up to 5 years</li>
              <li><strong>VSD retrofits:</strong> 2-4 years — Up to 5 years</li>
              <li><strong>HVAC plant replacement:</strong> 5-10 years — Up to equipment life</li>
              <li><strong>Building fabric:</strong> 10-20 years — Building lifecycle</li>
            </ul>
            <p><strong>Best practice:</strong> Use simple payback for initial screening, then apply NPV or LCC for measures that pass preliminary criteria.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Implementation Priorities and Planning">
            <p>Prioritising ECMs requires balancing multiple factors beyond simple financial return. A structured approach ensures resources target the most effective measures while managing risk and building organisational capability.</p>
            <p><strong>ECM Prioritisation Matrix</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Payback period:</strong> &lt; 3 years — &gt; 7 years</li>
              <li><strong>Implementation risk:</strong> Proven technology, minimal disruption — Novel technology, major works</li>
              <li><strong>Energy savings %:</strong> &gt; 20% of system consumption — &lt; 5% of system consumption</li>
              <li><strong>Co-benefits:</strong> Improved comfort, reduced maintenance — Energy only</li>
              <li><strong>Strategic alignment:</strong> Supports carbon targets, regulations — No strategic drivers</li>
            </ul>
            <p><strong>Implementation Sequencing Strategy</strong></p>
            <p><strong>Key implementation considerations:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Interactions:</strong> Some ECMs affect others - install controls before plant upgrades to right-size equipment</li>
              <li><strong>Funding:</strong> Match ECM timing to budget cycles and available financing mechanisms</li>
              <li><strong>Disruption:</strong> Schedule disruptive measures during building closures or low-occupancy periods</li>
              <li><strong>Dependencies:</strong> Ensure enabling works (sub-metering, BMS points) are completed first</li>
              <li><strong>Skills:</strong> Consider in-house capability versus specialist contractor requirements</li>
            </ul>
            <p><strong>Implementation tip:</strong> Use savings from Phase 1 and 2 measures to fund Phase 3 investments - create a 'revolving fund' for energy efficiency.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Measurement, Verification and Avoiding Rebound">
            <p>Measurement and Verification (M&V) provides credible evidence that ECMs deliver expected savings. The International Performance Measurement and Verification Protocol (IPMVP) provides standardised methods used worldwide for verifying energy savings.</p>
            <p><strong>IPMVP Options</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>A: Key Parameter:</strong> Measure key parameter (e.g., kW), estimate others — Lighting, constant loads</li>
              <li><strong>B: All Parameters:</strong> Measure all parameters at retrofit level — Motors, VSDs, specific systems</li>
              <li><strong>C: Whole Facility:</strong> Use utility meters, adjust for independent variables — Multiple ECMs, whole building</li>
              <li><strong>D: Simulation:</strong> Calibrated simulation modelling — Complex buildings, new construction</li>
            </ul>
            <p><strong>M&V Calculation Formula</strong></p>
            <p>Energy Savings = Baseline Energy - Post-Installation Energy ± Adjustments</p>
            <p>Adjustments account for:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Weather differences (heating/cooling degree days)</li>
              <li>Occupancy changes</li>
              <li>Operating hours variations</li>
              <li>Production or service level changes</li>
            </ul>
            <p><strong>Understanding the Rebound Effect</strong></p>
            <p>The rebound effect occurs when efficiency improvements lead to increased consumption that partially offsets expected savings. Research suggests 10-30% of theoretical savings may be lost to rebound in commercial buildings.</p>
            <p><strong>Common causes:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Occupants adjusting setpoints ('it's more efficient now, so I can be warmer')</li>
              <li>Extended operating hours due to lower running costs</li>
              <li>Removal of energy-saving behaviours ('the new system handles it')</li>
              <li>Increased equipment utilisation</li>
            </ul>
            <p><strong>Rebound Mitigation Strategies</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Maintain visibility:</strong> Install energy dashboards and regular reporting</li>
              <li><strong>Lock-in savings:</strong> Use BMS to enforce setpoints and schedules</li>
              <li><strong>Continuous engagement:</strong> Ongoing awareness campaigns and energy champions</li>
              <li><strong>Targets:</strong> Set consumption targets, not just efficiency metrics</li>
              <li><strong>M&V baseline:</strong> Include realistic behavioural assumptions in baseline calculations</li>
            </ul>
            <p><strong>M&V best practice:</strong> Plan M&V approach before ECM implementation - baseline data must be collected under representative operating conditions.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: Simple Payback Analysis</strong>
            </p>
            <p><strong>Scenario:</strong> A VSD retrofit on a 37 kW chiller pump operating 4,000 hours annually.</p>
            <p>Given data:</p>
            <p>Motor power: 37 kW</p>
            <p>Operating hours: 4,000 h/year</p>
            <p>Expected savings: 35% (typical for VSD on pump)</p>
            <p>Electricity cost: £0.28/kWh</p>
            <p>VSD installation cost: £6,500</p>
            <p>Calculation:</p>
            <p>Annual consumption = 37 kW × 4,000 h = 148,000 kWh</p>
            <p>Energy savings = 148,000 × 35% = 51,800 kWh/year</p>
            <p>Cost savings = 51,800 × £0.28 = £14,504/year</p>
            <p>Simple payback = £6,500 ÷ £14,504 = 0.45 years (5.4 months)</p>
            <p>
              <strong>Example 2: NPV Comparison</strong>
            </p>
            <p><strong>Scenario:</strong> Compare two lighting options for a warehouse over 15 years at 5% discount rate.</p>
            <p>Option A: Standard LED (8-year life)</p>
            <p>Capital: £40,000 | Annual energy: £6,000 | Annual maint: £500</p>
            <p>Option B: Premium LED (15-year life)</p>
            <p>Capital: £55,000 | Annual energy: £4,800 | Annual maint: £300</p>
            <p>NPV factors (5%):</p>
            <p>15 years = 10.380 | 8 years = 6.463</p>
            <p>Option A NPV (including replacement at year 8):</p>
            <p>Initial: -£40,000</p>
            <p>Running (years 1-8): -(£6,500 × 6.463) = -£42,010</p>
            <p>Replacement at Y8: -£40,000 × 0.677 = -£27,080</p>
            <p>Running (years 9-15): -(£6,500 × 3.917) = -£25,460</p>
            <p>Option A total NPV = -£134,550</p>
            <p>Option B NPV:</p>
            <p>Initial: -£55,000</p>
            <p>Running (15 years): -(£5,100 × 10.380) = -£52,938</p>
            <p>Option B total NPV = -£107,938</p>
            <p>Premium LED saves £26,612 NPV over 15 years</p>
            <p>
              <strong>Example 3: M&V Weather Adjustment</strong>
            </p>
            <p><strong>Scenario:</strong> Verify heating savings after boiler upgrade using degree day adjustment.</p>
            <p>Baseline period (pre-upgrade):</p>
            <p>Gas consumption: 180,000 kWh</p>
            <p>Heating degree days (HDD): 2,100</p>
            <p>Baseline ratio: 180,000 ÷ 2,100 = 85.7 kWh/HDD</p>
            <p>Post-installation period:</p>
            <p>Actual gas consumption: 145,000 kWh</p>
            <p>Heating degree days: 2,350 (colder year)</p>
            <p>Adjusted calculation:</p>
            <p>Expected baseline at 2,350 HDD: 85.7 × 2,350 = 201,395 kWh</p>
            <p>Actual consumption: 145,000 kWh</p>
            <p>Weather-adjusted savings: 201,395 - 145,000 = 56,395 kWh (28%)</p>
            <p>Without adjustment (misleading):</p>
            <p>Apparent savings: 180,000 - 145,000 = 35,000 kWh (19%)</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>ECM Identification Checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Benchmark consumption against CIBSE TM46 or DEC database</li>
              <li>Analyse utility bills for patterns and anomalies</li>
              <li>Conduct site survey of equipment age, condition, and controls</li>
              <li>Review BMS data for setpoints, schedules, and operational issues</li>
              <li>Interview facilities staff about comfort complaints and operational challenges</li>
              <li>Identify quick wins (controls, scheduling) before capital measures</li>
            </ul>
            <p>
              <strong>Key Financial Formulas:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Simple payback: <strong>Capital cost ÷ Annual savings</strong></li>
              <li>NPV: <strong>∑(Cash flow ÷ (1+r)ⁿ) - Initial investment</strong></li>
              <li>NPV factor (annuity): <strong>(1 - (1+r)⁻ⁿ) ÷ r</strong></li>
              <li>Equivalent Annual Cost: <strong>NPV × (r ÷ (1 - (1+r)⁻ⁿ))</strong></li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Ignoring interactions:</strong> Installing efficient equipment before optimising controls wastes sizing opportunity</li>
                <li><strong>Neglecting M&V costs:</strong> Budget 3-5% of ECM cost for proper measurement and verification</li>
                <li><strong>Optimistic savings estimates:</strong> Use conservative figures and validate with comparable projects</li>
                <li><strong>Forgetting maintenance:</strong> Some efficient equipment requires specialist maintenance skills</li>
              </ul>
            }
            doInstead="Cross-check assumptions against published guidance, validate measured values against design intent, and engage the wider team early when interface issues emerge."
          />

          <SectionRule />

          <Scenario
            title="EPC contract savings dispute lacks M&V baseline"
            situation={
              <>
                An Energy Performance Contract (EPC) was signed for a hospital lighting upgrade — the contractor guaranteed 35% savings vs baseline. After 12 months, the contractor claims £180k savings achieved; the client's metered data shows only 22% reduction. There is no agreed M&V plan and no isolated lighting metering.
              </>
            }
            whatToDo={
              <>
                Adversarial situation — neither party can prove their position. Three options: (1) install retrospective lighting circuit metering, run a 6-month verification period, then reconcile; (2) appoint an independent IPMVP CMVP (Certified Measurement and Verification Professional) to adjudicate using available data and engineering analysis; (3) settle on a negotiated figure to avoid litigation. Lesson: every EPC contract must have an IPMVP-compliant M&V plan signed before implementation, with measurement points, baseline, adjustment routines and reporting frequency.
              </>
            }
            whyItMatters={
              <>
                Most claimed energy savings are aspirational — measurement is the difference between claimed and verified. EPCs (Energy Performance Contracts) are commercially structured around verified savings; without IPMVP M&V, both parties are exposed. Plan M&V before procurement, not after.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "ECMs prioritised by payback, NPV, IRR, or £/tCO₂e abated.",
              "Typical payback ladder: lighting + controls < BMS optimisation < HVAC controls < plant replacement < fabric.",
              "IPMVP is the institutional M&V methodology — Options A, B, C, D.",
              "M&V plan must be agreed BEFORE implementation, not constructed afterwards.",
              "Energy Performance Contracts (EPCs) commercially structured around verified savings.",
              "CMVP (Certified Measurement and Verification Professional) qualification for EPCs.",
              "Without measurement, claimed savings are aspirations — and lawsuits.",
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module6-section5-5")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Building performance
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module6-section6-1")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Passive design principles
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule6Section5_6;
