/**
 * Module 5 · Section 3 · Subsection 6 — Value Engineering
 * HNC Electrical Engineering for Building Services (Project Management — Pearson U4004 + BSE PM context)
 *   Systematically improving value (function ÷ cost) — not crude cost-cutting, but improving outcomes through alternatives, options and life-cycle thinking.
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

const TITLE = 'Value Engineering - HNC Module 5 Section 3.6';
const DESCRIPTION =
  'Master value engineering for building services: options analysis, life cycle costing, whole life value assessment, NPV calculations, energy efficiency payback, and cost-benefit evaluation for MEP systems.';

const quickCheckQuestions = [
  {
    id: 'value-engineering-def',
    question: 'What is the primary objective of value engineering?',
    options: [
      'To reduce initial capital cost only',
      'To maximise function whilst minimising whole life cost',
      'To specify the cheapest equipment available',
      'To eliminate design consultants',
    ],
    correctIndex: 1,
    explanation:
      "Value engineering seeks to maximise function (what the system does) whilst minimising whole life cost. It considers capital, operating, maintenance, and disposal costs over the asset's lifespan.",
  },
  {
    id: 'life-cycle-cost',
    question: 'Which costs are included in life cycle costing for MEP systems?',
    options: [
      'Capital costs only',
      'Capital and energy costs only',
      'Capital, operating, maintenance, and disposal costs',
      'Only costs within the defects liability period',
    ],
    correctIndex: 2,
    explanation:
      "Life cycle costing (LCC) includes all costs over the asset's life: capital/installation, energy/operating, maintenance/repair, and eventual disposal or replacement costs.",
  },
  {
    id: 'npv-purpose',
    question: 'Net Present Value (NPV) is used to:',
    options: [
      'Calculate VAT on equipment',
      'Compare costs occurring at different times',
      'Determine electrical load requirements',
      'Assess contractor competence',
    ],
    correctIndex: 1,
    explanation:
      'NPV adjusts future costs to present-day values using a discount rate, allowing fair comparison of options with different cost profiles over time.',
  },
  {
    id: 've-workshop',
    question: 'When should a value engineering workshop ideally take place?',
    options: [
      'After construction is complete',
      'During snagging',
      'At RIBA Stage 2-3 (Concept/Spatial Coordination)',
      'Only if the project is over budget',
    ],
    correctIndex: 2,
    explanation:
      'Value engineering is most effective at RIBA Stage 2-3 when design decisions can still be changed without significant abortive costs. Later changes are increasingly expensive.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is the fundamental equation used in value engineering?',
    options: [
      'Value = Cost / Function',
      'Value = Function / Cost',
      'Value = Capital Cost + Operating Cost',
      'Value = Specification / Budget',
    ],
    correctAnswer: 1,
    explanation:
      'Value = Function / Cost. Value engineering seeks to increase function (performance, reliability, capability) or reduce cost, or both, to maximise value.',
  },
  {
    id: 2,
    question:
      'A chiller costs £80,000 with annual running costs of £12,000 over 15 years. Using simple payback, what is the total life cycle cost?',
    options: ['£80,000', '£180,000', '£260,000', '£92,000'],
    correctAnswer: 2,
    explanation:
      'Simple LCC = Capital + (Annual cost × Years) = £80,000 + (£12,000 × 15) = £80,000 + £180,000 = £260,000',
  },
  {
    id: 3,
    question:
      'Option A costs £50,000 initially with £8,000/year running costs. Option B costs £70,000 initially with £5,000/year running costs. Over 10 years (simple method), which has lower life cycle cost?',
    options: ['Option A: £130,000', 'Option B: £120,000', 'Both are equal', 'Cannot be determined'],
    correctAnswer: 1,
    explanation:
      'Option A: £50,000 + (£8,000 × 10) = £130,000. Option B: £70,000 + (£5,000 × 10) = £120,000. Option B has lower LCC despite higher capital cost.',
  },
  {
    id: 4,
    question:
      'What discount rate is typically used for public sector building services projects in the UK?',
    options: ['2.5%', '3.5%', '5.0%', '10.0%'],
    correctAnswer: 1,
    explanation:
      'The HM Treasury Green Book specifies 3.5% discount rate for public sector projects. Private sector often uses higher rates (8-12%) reflecting cost of capital.',
  },
  {
    id: 5,
    question: 'Simple payback period for an energy efficiency measure is calculated as:',
    options: [
      'Annual savings × Investment cost',
      'Investment cost ÷ Annual savings',
      'Annual savings ÷ Investment cost',
      'Investment cost × Discount rate',
    ],
    correctAnswer: 1,
    explanation:
      'Simple payback = Investment cost ÷ Annual savings. For example, £10,000 investment saving £2,500/year has a 4-year payback period.',
  },
  {
    id: 6,
    question:
      'Which function analysis technique identifies the primary and secondary functions of a component?',
    options: ['SWOT analysis', 'FAST diagram', 'Gantt chart', 'Critical path method'],
    correctAnswer: 1,
    explanation:
      'Function Analysis System Technique (FAST) diagrams show how functions relate hierarchically, helping identify which functions are essential and which are secondary.',
  },
  {
    id: 7,
    question:
      'When comparing LED lighting against fluorescent, which factors should be included in the life cycle cost analysis?',
    options: [
      'Lamp purchase price only',
      'Purchase price and energy costs only',
      'Purchase, energy, maintenance, lamp replacement, and disposal costs',
      'Whatever costs are easiest to calculate',
    ],
    correctAnswer: 2,
    explanation:
      'A comprehensive LCC includes capital (luminaires, installation), energy consumption, maintenance labour, lamp/driver replacement frequency, and disposal/recycling costs.',
  },
  {
    id: 8,
    question: 'The maintenance cost projection for a building services system should consider:',
    options: [
      'Only planned preventive maintenance',
      'Only reactive breakdown repairs',
      'PPM, reactive repairs, component replacement cycles, and eventual major refurbishment',
      'Whatever the manufacturer states',
    ],
    correctAnswer: 2,
    explanation:
      'Maintenance projections must include planned preventive maintenance (PPM), reactive repairs (statistically estimated), component lifecycle replacements, and eventual system refurbishment or replacement.',
  },
  {
    id: 9,
    question:
      'A VRF system costs £120,000 more than a split system but saves £15,000/year in energy. What is the simple payback?',
    options: ['6 years', '8 years', '10 years', '12 years'],
    correctAnswer: 1,
    explanation: 'Simple payback = Additional cost ÷ Annual saving = £120,000 ÷ £15,000 = 8 years',
  },
  {
    id: 10,
    question: 'Which statement about whole life value assessment is correct?',
    options: [
      'It only considers tangible financial costs',
      'It includes sustainability, resilience, and non-financial benefits',
      'It always favours the cheapest capital option',
      'It is only relevant for projects over £10 million',
    ],
    correctAnswer: 1,
    explanation:
      'Whole life value assessment extends beyond financial LCC to include sustainability impacts, operational flexibility, resilience, user satisfaction, and other non-financial value factors.',
  },
];

const faqs = [
  {
    question: 'What is the difference between value engineering and cost cutting?',
    answer:
      'Cost cutting simply removes scope or specifies cheaper alternatives without considering function. Value engineering systematically analyses functions to find alternative ways of achieving the same (or better) outcomes at lower whole life cost. VE maintains or improves function; cost cutting often degrades it.',
  },
  {
    question: 'How do I choose an appropriate discount rate for NPV calculations?',
    answer:
      "For public sector projects, use the HM Treasury Green Book rate (3.5% standard, 3.0% for 31-75 years). For private sector, use the client's weighted average cost of capital (WACC), typically 8-12%. Higher discount rates favour options with lower capital cost; lower rates favour energy-efficient options with higher capital but lower running costs.",
  },
  {
    question: 'What data sources are reliable for life cycle cost projections?',
    answer:
      'Use CIBSE Guide M for maintenance benchmarks, TM54 for operational energy, manufacturer data for equipment lifespans, BSRIA rules of thumb for costs, and historical data from similar buildings. Always validate assumptions with facilities management teams and cross-reference multiple sources.',
  },
  {
    question: 'How long should the analysis period be for building services LCC?',
    answer:
      "Typically 20-25 years for whole building analysis, matching major refurbishment cycles. Individual components may have shorter periods: lighting 15-20 years, HVAC plant 15-20 years, controls 10-15 years. Align with the client's investment horizon and any lease terms.",
  },
  {
    question: 'Can value engineering be applied after the design is complete?',
    answer:
      'Value engineering can be applied at any stage but becomes progressively less effective and more costly. At tender stage, changes may delay the programme and require redesign fees. During construction, changes involve abortive work. The optimal time is RIBA Stage 2-3 when design flexibility is greatest.',
  },
  {
    question: 'How do I quantify the value of energy efficiency beyond cost savings?',
    answer:
      'Consider: carbon pricing/trading value, Enhanced Capital Allowances for qualifying equipment, improved EPC/DEC ratings affecting rental values, corporate sustainability reporting requirements, reduced exposure to energy price volatility, and potential funding eligibility (Salix, Heat Networks). These factors can significantly affect investment decisions.',
  },
];

const HNCModule5Section3_6 = () => {
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
            eyebrow="Module 5 · Section 3 · Subsection 6"
            title="Value Engineering"
            description="Options analysis, life cycle costing, whole life value assessment, and cost-benefit evaluation for building services."
            tone="purple"
          />

          <TLDR
            points={[
              "Value engineering (VE) = improving value, where value = function / cost. Reduce cost without reducing function, or improve function at the same cost.",
              "Best applied early (RIBA Stage 2–3) when design freedom is highest; later VE is increasingly difficult and costly.",
              "Options analysis: identify alternatives, assess against function/cost/risk/buildability, recommend.",
              "Life-cycle costing (LCC) frames decisions over 25–60 year asset life — capex vs opex, energy, maintenance, replacement.",
              "PAS 2080 carbon management adds whole-life carbon as a fourth axis alongside cost, function and time.",
            ]}
          />

          <RegsCallout
            source="PAS 2080:2023 — Carbon management in buildings and infrastructure"
            clause="PAS 2080 sets out the requirements for managing whole-life carbon in buildings and infrastructure assets and networks. It applies to all value chain members and provides a framework for managing whole-life carbon emissions and value."
            meaning={
              <>
                Value engineering decisions now must consider whole-life carbon, not just cost. PAS 2080 provides the framework — embodied carbon (manufacture, transport, install) plus operational carbon (use, maintenance, replacement, end-of-life). Many MEP decisions (LED vs fluorescent, heat pump vs boiler, embodied carbon of switchgear) benefit dramatically from whole-life analysis.
              </>
            }
            cite="Source: PAS 2080:2023 (refer to BSI published text for verbatim clauses)."
          />


          <LearningOutcomes
            outcomes={[
              'Apply value engineering principles to building services design',
              'Conduct function analysis for MEP system components',
              'Calculate life cycle costs for equipment alternatives',
              'Use NPV and simple payback for investment decisions',
              'Assess whole life value including non-financial factors',
              'Facilitate effective value engineering workshops',
            ]}
          />

          <SectionRule />

          <ConceptBlock title="Value Engineering Fundamentals">
            <p>
              Value engineering (VE) is a systematic method for improving value by analysing
              functions and identifying alternative ways to achieve them at lower whole life cost.
              Unlike simple cost cutting, VE maintains or enhances function whilst optimising
              resources.
            </p>
            <p>
              <strong>The Value Equation:</strong> Value = Function / Cost. Value increases when
              function rises or cost falls (or both).
            </p>
            <p>
              <strong>Key principles:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Function focus:</strong> What does the system do, not what is it
              </li>
              <li>
                <strong>Whole life perspective:</strong> Consider all costs over the asset's life
              </li>
              <li>
                <strong>Multi-disciplinary approach:</strong> Involves all stakeholders
              </li>
              <li>
                <strong>Creative solutions:</strong> Challenge assumptions and constraints
              </li>
            </ul>
            <p>
              <strong>VE Job Plan (SAVE Standard) — (Phase — Activities — Output):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>1. Information:</strong> Gather project data, understand constraints —
                Baseline understanding
              </li>
              <li>
                <strong>2. Function Analysis:</strong> Identify and classify functions — FAST
                diagram
              </li>
              <li>
                <strong>3. Creative:</strong> Brainstorm alternative solutions — Ideas list
              </li>
              <li>
                <strong>4. Evaluation:</strong> Screen and rank ideas — Shortlisted options
              </li>
              <li>
                <strong>5. Development:</strong> Develop proposals with costings — VE proposals
              </li>
              <li>
                <strong>6. Presentation:</strong> Present recommendations to client — Decision and
                implementation
              </li>
            </ul>
            <p>
              <strong>Building services insight:</strong> MEP systems typically represent 30-40% of
              construction cost but 70-80% of operational cost, making them prime candidates for VE
              analysis.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Function Analysis and Options Development">
            <p>
              Function analysis is the core of value engineering. By understanding what a system
              must do (rather than what it is), alternative solutions become apparent. Functions are
              expressed as verb-noun pairs to maintain objectivity.
            </p>
            <p>
              <strong>Function Classification — Basic Functions</strong> (the primary reason the
              system exists):
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Chiller: "Cool space"</li>
              <li>Generator: "Provide power"</li>
              <li>Lighting: "Illuminate area"</li>
              <li>Ventilation: "Supply air"</li>
            </ul>
            <p>
              <strong>Secondary Functions</strong> (support the basic function or add features):
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Chiller: "Control humidity"</li>
              <li>Generator: "Reduce noise"</li>
              <li>Lighting: "Create ambience"</li>
              <li>Ventilation: "Filter particles"</li>
            </ul>
            <p>
              <strong>Example — HVAC Options Analysis (Option — Capital — Efficiency — Flexibility):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>VAV air handling:</strong> Medium — Good — Moderate
              </li>
              <li>
                <strong>VRF with DOAS:</strong> Higher — Excellent — High
              </li>
              <li>
                <strong>Chilled beams:</strong> High — Very good — Low
              </li>
              <li>
                <strong>Fan coil units:</strong> Lower — Moderate — High
              </li>
            </ul>
            <p>
              <strong>Real-World Example — Office Lighting VE:</strong> Original specification:
              high-end architectural luminaires at £180/m2. Function analysis: Basic function is
              "illuminate workspace" (300-500 lux). VE solution: Standard LED luminaires (£85/m2)
              with feature lighting in reception only. Saves £95/m2 whilst maintaining function.
              Feature areas enhanced, general areas adequate.
            </p>
            <p>
              <strong>Workshop tip:</strong> Use "How/Why" logic testing — asking "How?" moves down
              the FAST diagram (more specific), asking "Why?" moves up (more abstract).
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Life Cycle Costing Methods">
            <p>
              Life cycle costing (LCC) evaluates the total cost of ownership over an asset's life.
              For building services, energy and maintenance costs often exceed the initial capital
              cost, making LCC essential for informed decision-making.
            </p>
            <p>
              <strong>Life Cycle Cost Components (Category — Includes — Typical % HVAC):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Capital:</strong> Equipment, installation, commissioning — 15-25%
              </li>
              <li>
                <strong>Energy/Operating:</strong> Electricity, gas, water consumption — 50-70%
              </li>
              <li>
                <strong>Maintenance:</strong> PPM, reactive repairs, consumables — 15-25%
              </li>
              <li>
                <strong>Replacement:</strong> Component renewal during life — 5-15%
              </li>
              <li>
                <strong>Disposal:</strong> Removal, recycling, remediation — 1-5%
              </li>
            </ul>
            <p>
              <strong>Simple Life Cycle Cost Calculation:</strong> LCC = Capital + (Annual
              Operating × Years) + Replacements. Does not account for time value of money — suitable
              for quick comparisons.
            </p>
            <p>
              <strong>Net Present Value (NPV) Method:</strong> NPV = C0 + C1/(1+r) + C2/(1+r)² +
              ... + Cn/(1+r)ⁿ. Where C = cost in year n, r = discount rate.
            </p>
            <p>
              <strong>Discount Rates for UK Projects — Public Sector (Green Book):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Years 0-30: 3.5%</li>
              <li>Years 31-75: 3.0%</li>
              <li>Years 76-125: 2.5%</li>
              <li>Health projects may use 1.5%</li>
            </ul>
            <p>
              <strong>Private Sector:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Typical WACC: 8-12%</li>
              <li>Developer speculative: 10-15%</li>
              <li>Owner-occupied: 6-10%</li>
              <li>Infrastructure funds: 5-8%</li>
            </ul>
            <p>
              <strong>Impact of discount rate:</strong> Higher rates favour lower capital cost
              options; lower rates favour energy-efficient options with higher capital but lower
              running costs.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Energy Efficiency and Payback Analysis">
            <p>
              Energy efficiency measures often require higher capital investment but deliver ongoing
              savings. Payback analysis helps quantify when the investment is recovered and informs
              the business case for more efficient equipment.
            </p>
            <p>
              <strong>Simple Payback Period:</strong> Payback = Additional Cost / Annual Saving.
              Quick metric but ignores time value of money and savings beyond payback.
            </p>
            <p>
              <strong>Typical Energy Efficiency Measures — Building Services (Measure — Saving — Payback):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>LED lighting retrofit:</strong> 40-60% — 2-4 years
              </li>
              <li>
                <strong>Lighting controls (PIR, daylight):</strong> 20-40% — 1-3 years
              </li>
              <li>
                <strong>VSD on pumps/fans:</strong> 20-50% — 2-5 years
              </li>
              <li>
                <strong>High-efficiency chillers:</strong> 15-30% — 5-8 years
              </li>
              <li>
                <strong>Heat recovery ventilation:</strong> 30-50% — 4-7 years
              </li>
              <li>
                <strong>BMS optimisation:</strong> 10-25% — 1-3 years
              </li>
            </ul>
            <p>
              <strong>Worked Example — Chiller Comparison:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Option A:</strong> Standard chiller £85,000, COP 3.5, energy £18,000/year
              </li>
              <li>
                <strong>Option B:</strong> High-efficiency chiller £120,000, COP 5.0, energy
                £12,600/year
              </li>
              <li>
                <strong>Additional cost:</strong> £120,000 - £85,000 = £35,000
              </li>
              <li>
                <strong>Annual saving:</strong> £18,000 - £12,600 = £5,400
              </li>
              <li>
                <strong>Simple payback:</strong> £35,000 / £5,400 = 6.5 years
              </li>
              <li>
                <strong>Decision:</strong> With 15-20 year chiller life, Option B delivers
                significant whole-life savings despite longer payback.
              </li>
            </ul>
            <p>
              <strong>Maintenance Cost Projections:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Planned maintenance:</strong> Use CIBSE Guide M benchmarks (typically 2-5%
                of capital/year)
              </li>
              <li>
                <strong>Reactive repairs:</strong> Budget 30-50% of PPM cost for breakdown response
              </li>
              <li>
                <strong>Major replacements:</strong> Component lifecycles (motors 15yr, controls
                10yr, compressors 12yr)
              </li>
              <li>
                <strong>Escalation:</strong> Apply inflation to future maintenance costs (typically
                2-3%/year)
              </li>
            </ul>
            <p>
              <strong>Energy price sensitivity:</strong> Test LCC calculations with high and low
              energy price scenarios (e.g., +/-30%) to understand investment risk.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1 — Simple Payback Calculation:</strong> A heat pump costs £45,000
              more than a gas boiler system but saves £6,500/year in energy. Calculate the simple
              payback.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Simple payback = Additional cost / Annual saving</li>
              <li>Payback = £45,000 / £6,500</li>
              <li>
                <strong>Payback = 6.9 years</strong>
              </li>
              <li>With 20-year system life, total savings = £6,500 × (20-6.9) = £85,150.</li>
            </ul>
            <p>
              <strong>Example 2 — Life Cycle Cost Comparison:</strong> Compare two lighting options
              over 20 years (simple method): Option A: £12,000 capital, £3,200/year energy,
              £800/year maintenance. Option B: £18,000 capital, £1,800/year energy, £600/year
              maintenance.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Option A LCC = Capital + (Energy + Maintenance) × Years</li>
              <li>Option A = £12,000 + (£3,200 + £800) × 20</li>
              <li>
                Option A = £12,000 + £80,000 = <strong>£92,000</strong>
              </li>
              <li>Option B LCC = £18,000 + (£1,800 + £600) × 20</li>
              <li>
                Option B = £18,000 + £48,000 = <strong>£66,000</strong>
              </li>
              <li>
                <strong>Option B saves £26,000 over 20 years</strong> despite £6,000 higher capital
                cost.
              </li>
            </ul>
            <p>
              <strong>Example 3 — NPV Calculation:</strong> Calculate NPV of £10,000/year energy
              savings over 5 years at 3.5% discount rate.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Year 1: £10,000 / 1.035 = £9,662</li>
              <li>Year 2: £10,000 / 1.035² = £9,335</li>
              <li>Year 3: £10,000 / 1.035³ = £9,019</li>
              <li>Year 4: £10,000 / 1.035⁴ = £8,714</li>
              <li>Year 5: £10,000 / 1.035⁵ = £8,420</li>
              <li>NPV = £9,662 + £9,335 + £9,019 + £8,714 + £8,420</li>
              <li>
                <strong>NPV = £45,150</strong>
              </li>
              <li>
                Compare to simple sum: £10,000 × 5 = £50,000. NPV reflects true present value.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Value Engineering Workshops">
            <p>
              <strong>Workshop preparation:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Distribute design information 1-2 weeks before workshop</li>
              <li>Prepare cost plan breakdown by system/element</li>
              <li>Identify constraints and non-negotiable requirements</li>
              <li>Invite multi-disciplinary team (design, cost, FM, contractor)</li>
              <li>Allow full day for significant projects</li>
            </ul>
            <p>
              <strong>Effective workshop facilitation:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Use independent facilitator where possible</li>
              <li>Focus on functions not solutions initially</li>
              <li>No criticism during creative phase (brainstorming)</li>
              <li>Rank ideas by potential value (saving × probability)</li>
              <li>Assign owners and deadlines for proposals</li>
            </ul>
            <p>
              <strong>MEP-Specific VE Opportunities (System — Common Opportunities):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>HVAC:</strong> System selection, zoning, plant rationalisation, heat
                recovery
              </li>
              <li>
                <strong>Electrical:</strong> Diversity review, distribution topology, lighting
                control strategy
              </li>
              <li>
                <strong>Plumbing:</strong> Water heating strategy, pipe routing, rainwater
                harvesting
              </li>
              <li>
                <strong>Fire:</strong> Addressable vs conventional, suppression alternatives
              </li>
              <li>
                <strong>BMS:</strong> Integration scope, points schedule, proprietary vs open
                protocol
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common VE pitfalls to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Cost cutting disguised as VE</strong> — Removing scope without function
                  analysis
                </li>
                <li>
                  <strong>Ignoring whole life cost</strong> — Focusing only on capital savings
                </li>
                <li>
                  <strong>Late implementation</strong> — Making changes when design is fixed
                </li>
                <li>
                  <strong>Siloed thinking</strong> — Not considering system interactions
                </li>
              </ul>
            }
            doInstead="Anchor every VE proposal in function analysis, evaluate options on whole-life cost not capital alone, run VE workshops at RIBA Stage 2-3 while design is flexible, and assess interactions between MEP systems before adopting changes."
          />

          <SectionRule />

          <Scenario
            title="Late VE eliminates a critical commissioning hold"
            situation={
              <>
                At month seven of a 14-month school project, the client demands £180k of VE. The design team proposes substituting the specified DALI lighting controls with a simpler 0–10V system. The cost saving is £140k. You as project manager raise a concern: the building is already wired for DALI; a change now means re-pulling drivers, modifying the BMS interface and re-commissioning. The net cost change after rework is +£40k, with three weeks programme impact.
              </>
            }
            whatToDo={
              <>
                VE done late is rarely cheap. Always ask: what is the cost of change, including rework, design rev, programme impact and risk? Run the alternative through the design team, the M&E subcontractor and the commissioning manager before committing. Often the headline saving evaporates after rework. Recommend the VE proposal be rejected and propose alternative savings (specification of luminaire, lamp type, sensor count) that do not unwind installed work.
              </>
            }
            whyItMatters={
              <>
                VE is most powerful when applied early. Late VE is often a cost-shifting exercise where the saving in one place reappears as cost elsewhere. Discipline of options-analysis with full cost-of-change protects the project from headline-driven decisions.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

                    <KeyTakeaways
            points={[
              "Value = function / cost. VE improves value, not just cost.",
              "Best applied at RIBA Stage 2–3 when design freedom is highest.",
              "Options analysis: alternatives × (function, cost, risk, buildability) → recommendation.",
              "Life-cycle costing over 25–60 year asset life — capex + opex + energy + maintenance + replacement.",
              "PAS 2080 adds whole-life carbon — embodied + operational.",
              "Late VE often shifts cost rather than saving — check rework and programme impact.",
              "Document VE decisions: option considered, rationale, agreed by whom, when implemented.",
              "VE workshop is a structured exercise — design team, contractor, client, all in the room together.",
            ]}
          />


          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module5-section3-5')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Final account
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module5-section4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Module 5 · Section 4
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule5Section3_6;
