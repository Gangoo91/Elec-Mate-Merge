/**
 * Module 5 · Section 3 · Subsection 2 — Budget Development
 * HNC Electrical Engineering for Building Services (Project Management — Pearson U4004 + BSE PM context)
 *   Cost plans, contingency, risk provisions, preliminaries and overhead — building the budget that frames every commercial decision.
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

const TITLE = 'Budget Development - HNC Module 5 Section 3.2';
const DESCRIPTION =
  'Master budget development for MEP works: cost plan structure, contingency calculation, design and construction risk allowances, preliminaries breakdown, overhead and profit percentages, and inflation allowances for building services projects.';

const quickCheckQuestions = [
  {
    id: 'cost-plan-stages',
    question: 'At which RIBA stage is a formal cost plan first produced?',
    options: [
      'Stage 2 - Concept Design',
      'Stage 0 - Strategic Definition',
      'Stage 5 - Construction',
      'Stage 4 - Technical Design',
    ],
    correctIndex: 0,
    explanation:
      'The first formal cost plan (Cost Plan 1) is produced at RIBA Stage 2 - Concept Design, establishing the budget framework based on initial design concepts and elemental benchmarks.',
  },
  {
    id: 'contingency-purpose',
    question: 'What is the primary purpose of design development contingency?',
    options: [
      'To fund contractor preliminaries',
      'To cover material price increases',
      'To cover unexpected site conditions',
      'To allow for design changes and incomplete information',
    ],
    correctIndex: 3,
    explanation:
      'Design development contingency covers anticipated design changes, incomplete information at early stages, and refinements as the design develops. It typically reduces as design progresses.',
  },
  {
    id: 'preliminaries-typical',
    question: 'What is a typical preliminaries percentage for a medium-sized MEP project?',
    options: [
      '40-50%',
      '8-15%',
      '25-30%',
      '2-5%',
    ],
    correctIndex: 1,
    explanation:
      'Preliminaries for MEP works typically range from 8-15% of measured works value, covering site establishment, supervision, temporary services, and project-specific requirements.',
  },
  {
    id: 'inflation-allowance',
    question: 'Tender price inflation allowance is applied to cover:',
    options: [
      'The contingency held back for unforeseen site conditions',
      'The contractor profit margin on the measured works',
      'Price movements between estimate date and mid-point of construction',
      'Overhead costs incurred at the contractor head office',
    ],
    correctIndex: 2,
    explanation:
      'Tender price inflation covers anticipated price movements from the estimate base date to the mid-point of construction, using indices like BCIS or specialist MEP indices.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Which element is NOT typically included in a formal cost plan for MEP works?',
    options: [
      'Measured works costs',
      'Land acquisition costs',
      "Contractor's profit margin",
      'Design contingency',
    ],
    correctAnswer: 1,
    explanation:
      'Land acquisition is a development cost, not a construction cost. MEP cost plans include measured works, preliminaries, contingencies, overheads, profit, and inflation allowances.',
  },
  {
    id: 2,
    question: 'Design development contingency at RIBA Stage 2 is typically:',
    options: [
      '25-30%',
      '2-3%',
      '10-15%',
      '5-7%',
    ],
    correctAnswer: 2,
    explanation:
      'At RIBA Stage 2, design development contingency is typically 10-15% due to limited design information. This reduces to 5-7% at Stage 3 and 2-3% at Stage 4 as design certainty increases.',
  },
  {
    id: 3,
    question: 'Construction risk contingency covers:',
    options: [
      'Anticipated design changes as the design develops',
      'Material price increases between tender and construction',
      'The contractor’s profit margin on the measured works',
      'Unforeseen site conditions and construction uncertainties',
    ],
    correctAnswer: 3,
    explanation:
      'Construction risk contingency covers unforeseen site conditions, interface issues, and construction uncertainties that cannot be reasonably anticipated at tender stage.',
  },
  {
    id: 4,
    question: "Main contractor's overheads typically cover:",
    options: [
      'Head office costs, insurances, and company administration',
      'Site-specific supervision, welfare, and temporary services',
      'Measured labour and material costs of the installation',
      'Anticipated price inflation over the construction period',
    ],
    correctAnswer: 0,
    explanation:
      'Contractor overheads cover head office costs (rent, utilities, central staff), company insurances, IT systems, marketing, and general administration - typically 3-6% of project value.',
  },
  {
    id: 5,
    question:
      'A project has base cost of GBP 2.5M. With 12% preliminaries, 5% overheads, and 4% profit, what is the tender total?',
    options: [
      'GBP 3,025,000',
      'GBP 3,057,600',
      'GBP 3,150,000',
      'GBP 2,775,000',
    ],
    correctAnswer: 1,
    explanation:
      'Base GBP 2.5M + Prelims (12% of 2.5M = GBP 300,000) = GBP 2.8M. OH&P applied compounded to the sub-total: GBP 2.8M x 1.05 x 1.04 = GBP 3,057,600.',
  },
  {
    id: 6,
    question:
      'What percentage of project value do MEP services typically represent in a commercial building?',
    options: [
      '10-15%',
      '50-60%',
      '25-40%',
      '70-80%',
    ],
    correctAnswer: 2,
    explanation:
      'MEP services typically represent 25-40% of total building cost for commercial projects, with highly serviced buildings (hospitals, data centres) at the higher end or exceeding this range.',
  },
  {
    id: 7,
    question: 'Site establishment costs within preliminaries include:',
    options: [
      'Head office rent, central staff, and company administration',
      'The measured cost of cable, containment, and equipment',
      'Performance bonds and professional indemnity insurance',
      'Temporary offices, welfare facilities, and site security',
    ],
    correctAnswer: 3,
    explanation:
      'Site establishment covers temporary facilities including offices, welfare, storage, security fencing, access roads, signage, and initial site setup - typically a fixed cost within preliminaries.',
  },
  {
    id: 8,
    question: 'When should inflation allowance be highest in a cost plan?',
    options: [
      'For projects tendering in 12+ months with long construction periods',
      'For short-duration fit-outs starting immediately',
      'For projects with a fully completed detailed design',
      'For refurbishment works with uncertain existing conditions',
    ],
    correctAnswer: 0,
    explanation:
      'Inflation allowance is highest for projects with extended periods between estimate and construction mid-point, as there is greater exposure to price movements over time.',
  },
  {
    id: 9,
    question: 'Risk allowance for a complex hospital MEP installation would typically be:',
    options: [
      'Lower than standard office fit-out',
      'Higher than standard office fit-out',
      'Similar to standard office fit-out',
      'Zero if design is complete',
    ],
    correctAnswer: 1,
    explanation:
      'Complex projects like hospitals have higher risk allowances due to technical complexity, coordination challenges, infection control requirements, and operational constraints.',
  },
  {
    id: 10,
    question: 'Which cost plan approach allocates budget by building system?',
    options: [
      'Functional unit method',
      'Unit rate scheduling',
      'Elemental cost planning',
      'Activity-based costing',
    ],
    correctAnswer: 2,
    explanation:
      'Elemental cost planning organises costs by building elements (structure, envelope, MEP systems), enabling comparison with benchmark data and cost control by element.',
  },
  {
    id: 11,
    question: "Contractor's profit margin on MEP works typically ranges from:",
    options: [
      '1-2%',
      '20-25%',
      '10-15%',
      '3-6%',
    ],
    correctAnswer: 3,
    explanation:
      'Contractor profit margins typically range from 3-6% depending on project risk, market conditions, and competition. Specialist MEP contractors may achieve slightly higher margins.',
  },
  {
    id: 12,
    question:
      'A GBP 4M MEP package with 5% design contingency and 3% construction risk has total contingency of:',
    options: [
      'GBP 320,000',
      'GBP 400,000',
      'GBP 200,000',
      'GBP 332,800',
    ],
    correctAnswer: 0,
    explanation:
      'Design contingency: GBP 4M x 5% = GBP 200,000. Construction risk: GBP 4M x 3% = GBP 120,000. Total contingency: GBP 320,000 (8% of base cost).',
  },
];

const faqs = [
  {
    question: 'What is the difference between contingency and risk allowance?',
    answer:
      'Contingency covers known unknowns - anticipated but unquantified items like design development. Risk allowance covers unknown unknowns - genuinely unforeseen events. In practice, design development contingency reduces as information improves, while construction risk remains until project completion. Some organisations combine these; others manage them separately with different release protocols.',
  },
  {
    question: 'How do I calculate appropriate preliminaries for an MEP project?',
    answer:
      'Build up preliminaries from first principles: Site establishment (offices, welfare, security), supervision and management staff, temporary services (power, water, lighting), plant and equipment, insurances, and project-specific items (coordination, commissioning support). For budgeting, use benchmarks of 8-15% for MEP, adjusting for project duration, complexity, and location. Longer projects have proportionally higher time-related costs.',
  },
  {
    question: 'When should contingency be released from the budget?',
    answer:
      'Contingency should be released through formal change control: design development contingency as design stages complete and scope crystallises; construction risk contingency as work progresses and risks are resolved or realised. Never release contingency simply because it appears unused - maintain it until the corresponding risk period passes. Typical release points are practical completion (construction risk) and final account agreement (remaining contingency).',
  },
  {
    question: 'How do I account for inflation in multi-year projects?',
    answer:
      'Apply inflation from estimate base date to mid-point of construction using appropriate indices. For MEP, use BCIS Mechanical and Electrical indices or specialist indices. Calculate the inflation period in months, apply annual forecast rates, and compound where necessary. For 2-year construction periods, apply inflation to mid-point (12 months from start). Review quarterly and adjust if market conditions change significantly.',
  },
  {
    question: 'What drives MEP budget allocation between mechanical and electrical?',
    answer:
      'The split varies by building type: offices typically 55-60% mechanical, 40-45% electrical due to extensive HVAC. Data centres reverse this ratio due to power infrastructure. Hospitals are roughly equal. Retail varies with refrigeration needs. Understanding the building function and primary services drivers is essential for realistic budget allocation.',
  },
  {
    question: 'How do overheads and profit differ from preliminaries?',
    answer:
      "Preliminaries are project-specific indirect costs (site facilities, supervision, temporary works). Overheads are company-wide indirect costs allocated to projects (head office, central services, insurances). Profit is the contractor's return for risk and enterprise. Preliminaries appear as a separate cost centre; overheads and profit are typically applied as percentages to the total of measured works and preliminaries.",
  },
];

const HNCModule5Section3_2 = () => {
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
            eyebrow="Module 5 · Section 3 · Subsection 2"
            title="Budget Development"
            description="Cost plans, contingency allowances, risk provisions, preliminaries and overhead calculations for MEP works."
            tone="purple"
          />

          <TLDR
            points={[
              "Budget = sum of work-package costs + preliminaries + overhead + profit + contingency + risk + inflation + VAT (where applicable).",
              "Cost plan structured against the WBS — every work package has a budget line, every budget line traces to scope.",
              "Preliminaries (site set-up, supervision, plant, welfare, consumables, scaffolding, temporary services) typically 8–15% of works value.",
              "Contingency for known unknowns (design development, scope clarification) typically 3–8%; risk allowance for specific identified risks is in addition.",
              "Inflation: index forward to mid-point of construction using BCIS or similar — particularly important for >12 month programmes.",
            ]}
          />

          <RegsCallout
            source="JCT Standard Building Contract 2024 — Section 4 (Payment)"
            clause="Interim payments shall be made by the Employer to the Contractor in accordance with the provisions of this Section 4. The Architect/Contract Administrator shall issue an Interim Certificate stating the amount of the interim payment due in respect of each Interim Valuation."
            meaning={
              <>
                Your budget structures both the tender price and the basis of interim payment. Cost plans aligned to the bills of quantities and the WBS support straightforward valuation; mismatched structures lead to disputed interim certificates and cash-flow problems. Build the budget in the same shape as you will measure work.
              </>
            }
            cite="Source: JCT Standard Building Contract 2024 (refer to JCT published text for verbatim clauses)."
          />


          <LearningOutcomes
            outcomes={[
              'Structure cost plans aligned to RIBA work stages',
              'Calculate appropriate contingency allowances for each design stage',
              'Distinguish between design development and construction risk contingency',
              'Build up preliminaries from first principles',
              'Apply overhead and profit percentages appropriately',
              'Account for inflation in multi-year project budgets',
            ]}
          />

          <SectionRule />

          <ConceptBlock title="Cost Plan Structure and Development">
            <p>
              A cost plan is a formal budget document that establishes and controls project costs
              throughout design and construction. For MEP works, the cost plan must capture the
              complexity of building services systems whilst aligning with overall project budgeting
              methodology.
            </p>
            <p>
              <strong>Cost Plan Evolution Through RIBA Stages:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Stage 1:</strong> Order of cost estimate - broad budget based on functional
                requirements
              </li>
              <li>
                <strong>Stage 2:</strong> Cost Plan 1 - elemental budget based on concept design
              </li>
              <li>
                <strong>Stage 3:</strong> Cost Plan 2 - developed elemental budget with
                specification
              </li>
              <li>
                <strong>Stage 4:</strong> Cost Plan 3 - detailed cost plan for tender preparation
              </li>
            </ul>
            <p>
              <strong>Typical Cost Plan Structure for MEP Works (Element — Description — Typical %):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Measured Works:</strong> Quantified MEP installations — Base cost
              </li>
              <li>
                <strong>Preliminaries:</strong> Site-specific indirect costs — 8-15%
              </li>
              <li>
                <strong>Design Contingency:</strong> Scope development allowance — 3-15%
              </li>
              <li>
                <strong>Construction Risk:</strong> Unforeseen conditions — 2-5%
              </li>
              <li>
                <strong>Overheads:</strong> Company indirect costs — 3-6%
              </li>
              <li>
                <strong>Profit:</strong> Contractor margin — 3-6%
              </li>
              <li>
                <strong>Inflation:</strong> Price movement allowance — Variable
              </li>
            </ul>
            <p>
              <strong>Design principle:</strong> The cost plan must be a living document, updated at
              each stage to reflect design development and market changes.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Contingency and Risk Allowances">
            <p>
              Contingency management is critical for MEP budgets. Building services designs evolve
              significantly through design stages, and appropriate allowances must reflect design
              maturity and project risk profile.
            </p>
            <p>
              <strong>Design Development Contingency:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Covers incomplete design information</li>
              <li>Allows for specification development</li>
              <li>Reduces as design progresses</li>
              <li>Released through formal change control</li>
            </ul>
            <p>
              <strong>Construction Risk Contingency:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Covers unforeseen site conditions</li>
              <li>Interface and coordination issues</li>
              <li>Maintained until practical completion</li>
              <li>Higher for refurbishment works</li>
            </ul>
            <p>
              <strong>Contingency Reduction by Stage (Stage — Design — Construction Risk — Total):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Stage 2 - Concept:</strong> 10-15% — 3-5% — 13-20%
              </li>
              <li>
                <strong>Stage 3 - Developed:</strong> 5-7% — 3-5% — 8-12%
              </li>
              <li>
                <strong>Stage 4 - Technical:</strong> 2-3% — 3-5% — 5-8%
              </li>
              <li>
                <strong>Post-Tender:</strong> 0% — 2-3% — 2-3%
              </li>
            </ul>
            <p>
              <strong>Risk Factors Increasing Contingency:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Complex systems:</strong> Data centres, hospitals, laboratories (+3-5%)
              </li>
              <li>
                <strong>Refurbishment:</strong> Unknown existing conditions (+5-10%)
              </li>
              <li>
                <strong>Constrained sites:</strong> City centre, live environments (+2-5%)
              </li>
              <li>
                <strong>Compressed programmes:</strong> Acceleration costs risk (+3-5%)
              </li>
            </ul>
            <p>
              <strong>Best practice:</strong> Maintain separate contingency pots with clear release
              criteria — never merge into a single uncontrolled sum.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Preliminaries and Site Costs">
            <p>
              Preliminaries are the indirect costs required to deliver the MEP installation,
              distinct from the measured works costs of materials and labour. Understanding
              preliminaries structure is essential for accurate budget development and tender
              assessment.
            </p>
            <p>
              <strong>Preliminaries Categories (Category — Items — Cost Type):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Site Establishment:</strong> Offices, welfare, storage, security — Fixed
              </li>
              <li>
                <strong>Site Management:</strong> Project manager, site supervisor, QS —
                Time-related
              </li>
              <li>
                <strong>Temporary Services:</strong> Power, water, lighting, communications —
                Time-related
              </li>
              <li>
                <strong>Plant and Equipment:</strong> Access equipment, lifting, small plant — Mixed
              </li>
              <li>
                <strong>Health and Safety:</strong> PPE, signage, first aid, training — Mixed
              </li>
              <li>
                <strong>Quality Assurance:</strong> Testing equipment, documentation — Time-related
              </li>
            </ul>
            <p>
              <strong>Fixed Costs:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Site setup and clearance</li>
              <li>Temporary works design</li>
              <li>Initial security installation</li>
              <li>Constant regardless of duration</li>
            </ul>
            <p>
              <strong>Time-Related Costs:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Staff salaries and costs</li>
              <li>Accommodation hire</li>
              <li>Running costs and utilities</li>
              <li>Scale with project duration</li>
            </ul>
            <p>
              <strong>Value-Related Costs:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Insurance premiums</li>
              <li>Performance bonds</li>
              <li>Some professional fees</li>
              <li>Scale with contract value</li>
            </ul>
            <p>
              <strong>Typical MEP Preliminaries Build-Up (GBP 3M project, 12 months):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Site establishment (fixed): GBP 35,000</li>
              <li>Management staff (12 months): GBP 180,000</li>
              <li>Temporary services: GBP 25,000</li>
              <li>Plant and equipment: GBP 45,000</li>
              <li>H&S and quality: GBP 30,000</li>
              <li>Insurance and bonds: GBP 45,000</li>
              <li>
                <strong>Total preliminaries: GBP 360,000 (12%)</strong>
              </li>
            </ul>
            <p>
              <strong>Budgeting tip:</strong> Longer projects have proportionally higher
              preliminaries due to time-related costs. A 24-month project will not have double the
              preliminaries of a 12-month project, but the time-related element will double.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Overhead, Profit and Inflation Allowances">
            <p>
              The final cost plan elements convert the construction cost estimate to a tender-ready
              budget, accounting for contractor margins and anticipated price movements.
              Understanding these allowances is essential for realistic budget setting and tender
              evaluation.
            </p>
            <p>
              <strong>Overhead Components:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Head office costs:</strong> Rent, utilities, central administration
              </li>
              <li>
                <strong>Corporate services:</strong> HR, finance, IT, marketing
              </li>
              <li>
                <strong>Company insurances:</strong> Professional indemnity, employer's liability
              </li>
              <li>
                <strong>Bidding and estimating:</strong> Tender costs for unsuccessful bids
              </li>
              <li>
                <strong>Training and development:</strong> Staff development programmes
              </li>
            </ul>
            <p>
              <strong>OH&P Application Methods (Method — Application — Typical Use):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Combined percentage:</strong> Single % to sub-total — Budget estimates
              </li>
              <li>
                <strong>Separate percentages:</strong> OH% then P% compounded — Detailed cost plans
              </li>
              <li>
                <strong>Distributed rates:</strong> Built into unit rates — Contractor pricing
              </li>
            </ul>
            <p>
              <strong>Inflation Calculation Example:</strong> Estimate base date January 2024;
              tender July 2024 (6 months); construction period 18 months; mid-point 9 months from
              start. Total inflation period: 6 + 9 = 15 months. Forecast annual inflation 4%.
              15-month inflation: 4% × (15/12) = 5.0%. Applied to measured works + preliminaries
              before OH&P.
            </p>
            <p>
              <strong>Inflation Indices for MEP:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>BCIS TPI:</strong> General tender price index
              </li>
              <li>
                <strong>BCIS M&E:</strong> Mechanical and electrical specific index
              </li>
              <li>
                <strong>BEAMA:</strong> Electrical equipment manufacturers index
              </li>
              <li>
                <strong>Specialist indices:</strong> HVAC, controls, fire systems
              </li>
            </ul>
            <p>
              <strong>Complete Budget Build-Up Example:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Measured MEP works: GBP 2,500,000</li>
              <li>Preliminaries (12%): GBP 300,000</li>
              <li>
                <strong>Sub-total: GBP 2,800,000</strong>
              </li>
              <li>Design contingency (5%): GBP 140,000</li>
              <li>Construction risk (3%): GBP 84,000</li>
              <li>
                <strong>Construction cost: GBP 3,024,000</strong>
              </li>
              <li>Overheads (4%): GBP 120,960</li>
              <li>Profit (4%): GBP 125,798</li>
              <li>
                <strong>Tender total: GBP 3,270,758</strong>
              </li>
              <li>Inflation (5%): GBP 163,538</li>
              <li>
                <strong>Budget total: GBP 3,434,296</strong>
              </li>
            </ul>
            <p>
              <strong>Market awareness:</strong> OH&P levels vary with market conditions. In
              competitive markets, margins compress; in busy markets, contractors can command higher
              returns.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1 — Hospital MEP Budget Development:</strong> New hospital wing,
              8,000m2, RIBA Stage 2, tender in 9 months, 24-month construction.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Benchmark: 180 VA/m2 (highly serviced)</li>
              <li>Estimated MEP value: GBP 6,000,000</li>
              <li>Preliminaries (14% - complex): GBP 840,000</li>
              <li>Design contingency (12%): GBP 720,000</li>
              <li>Construction risk (5% - hospital): GBP 300,000</li>
              <li>
                <strong>Sub-total: GBP 7,860,000</strong>
              </li>
              <li>OH&P (9%): GBP 707,400</li>
              <li>Inflation (9 + 12 = 21 months @ 4%): 7% = GBP 599,718</li>
              <li>
                <strong>Stage 2 Budget: GBP 9,167,118</strong>
              </li>
            </ul>
            <p>
              <strong>Example 2 — Office Refurbishment Contingency:</strong> A GBP 1.2M office
              electrical upgrade at Stage 3. Calculate appropriate contingencies.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Base measured works: GBP 1,200,000</li>
              <li>Design contingency (Stage 3): 6%</li>
              <li>Additional for refurb unknowns: 4%</li>
              <li>
                Design contingency total: 10% = <strong>GBP 120,000</strong>
              </li>
              <li>Construction risk (standard): 3%</li>
              <li>Additional for existing building: 5%</li>
              <li>
                Construction risk total: 8% = <strong>GBP 96,000</strong>
              </li>
              <li>
                <strong>Total contingency: GBP 216,000 (18%)</strong> — Higher than new-build due
                to existing conditions uncertainty.
              </li>
            </ul>
            <p>
              <strong>Example 3 — Preliminaries Build-Up:</strong> Build up preliminaries for GBP
              4M MEP package, 15-month programme, city centre site.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Site establishment (fixed): GBP 45,000</li>
              <li>Initial temporary works: GBP 20,000</li>
              <li>Project manager: GBP 90,000 x 1.25 = GBP 112,500</li>
              <li>Site supervisor: GBP 65,000 x 1.25 = GBP 81,250</li>
              <li>QS support: GBP 55,000 x 1.25 = GBP 68,750</li>
              <li>Temp services: GBP 2,500/month x 15 = GBP 37,500</li>
              <li>Insurance (0.8%): GBP 32,000</li>
              <li>Bond (0.5%): GBP 20,000</li>
              <li>Out-of-hours working: GBP 40,000</li>
              <li>Restricted access logistics: GBP 25,000</li>
              <li>
                <strong>Total: GBP 482,000 (12.05%)</strong>
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Budget development checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Establish base date and state design stage clearly</li>
              <li>Use appropriate benchmark data or measured quantities</li>
              <li>Build up preliminaries from first principles where possible</li>
              <li>Apply stage-appropriate contingencies with clear assumptions</li>
              <li>Document OH&P assumptions and market basis</li>
              <li>Calculate inflation to mid-point of construction</li>
              <li>Include exclusions list (furniture, IT, specialist equipment)</li>
            </ul>
            <p>
              <strong>Key values to remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                MEP proportion: <strong>25-40%</strong> of total building cost
              </li>
              <li>
                MEP preliminaries: <strong>8-15%</strong> of measured works
              </li>
              <li>
                Stage 2 design contingency: <strong>10-15%</strong>
              </li>
              <li>
                Standard OH&P: <strong>6-10%</strong> combined
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Inadequate contingency:</strong> Leads to budget overspend or scope
                  reduction
                </li>
                <li>
                  <strong>Ignoring inflation:</strong> Budgets become unrealistic for future tender
                </li>
                <li>
                  <strong>Benchmarking wrong building type:</strong> Hospitals vs offices vastly
                  different
                </li>
                <li>
                  <strong>Double-counting OH&P:</strong> Already in specialist subcontractor rates
                </li>
              </ul>
            }
            doInstead="Set contingency by stage and risk profile, apply inflation to the construction mid-point, benchmark against the correct building type and complexity, and check whether subcontract rates already include OH&P before applying it again."
          />

          <SectionRule />

          <Scenario
            title="Inflation eats the margin on a 24-month programme"
            situation={
              <>
                You won a £4m MEP package on a fixed-price basis in 2024 for handover in late 2026. Your tender used 2024 supplier prices with 3% inflation built in. By mid-2025, copper has risen 18%, electrical components 12%, and labour rates 9% under the JIB wage settlement. Your forecast cost-to-complete now exceeds the budget by £180k.
              </>
            }
            whatToDo={
              <>
                Treat inflation as a quantified risk on long programmes — index forward to programme mid-point using BCIS or commodity-specific indices, not a flat 3%. For the current project, pursue value engineering options aggressively, accelerate procurement of unfixed materials at current prices where storage allows, and review supplier contracts for inflation-linked clauses. Update the cost report transparently with client and finance — surprises at month 18 are unacceptable.
              </>
            }
            whyItMatters={
              <>
                Budget integrity protects the project margin. Hidden assumptions (3% inflation, no extension, no scope creep) become hidden losses. Build budgets that survive contact with reality, not budgets that flatter the bid.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

                    <KeyTakeaways
            points={[
              "Budget = work packages + prelims + OH + profit + contingency + risk + inflation + VAT.",
              "Cost plan structured against WBS — every line traces to scope.",
              "Preliminaries 8–15% of works value (site set-up, supervision, plant, welfare, scaffold, temp services).",
              "Contingency for known unknowns 3–8%; risk allowance for specific identified risks separate.",
              "Inflation: index forward to programme mid-point using BCIS or commodity-specific data.",
              "Cash-flow forecast (S-curve) derived from budget against programme — informs working capital requirement.",
              "Budget structure should mirror payment structure — straightforward interim valuation.",
              "Review and re-baseline after major scope changes — keep budget alive, not a tender artefact.",
            ]}
          />


          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module5-section3-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Estimating methods
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module5-section3-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Cost control
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule5Section3_2;
