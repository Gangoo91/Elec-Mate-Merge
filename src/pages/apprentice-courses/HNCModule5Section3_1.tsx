/**
 * Module 5 · Section 3 · Subsection 1 — Estimating Methods
 * HNC Electrical Engineering for Building Services (Project Management — Pearson U4004 + BSE PM context)
 *   First-principles, benchmarking and parametric estimating for building services — getting the price right at tender, not regretting it at month nine.
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

const TITLE = 'Estimating Methods - HNC Module 5 Section 3.1';
const DESCRIPTION =
  "Master building services estimating methods: first principles estimating, labour/material/plant build-up, BCIS and Spon's benchmarking data, parametric pricing, and MEP-specific cost considerations.";

const quickCheckQuestions = [
  {
    id: 'first-principles-def',
    question: 'What is first principles estimating?',
    options: [
      'Two pages maximum, with the qualifications and key experience on page one.',
      'Appropriate connection means and protective measures',
      'Checking protocol specifications and certification compatibility',
      'Building up costs from individual resources (labour, materials, plant)',
    ],
    correctIndex: 3,
    explanation:
      'First principles estimating builds up costs from the fundamental resources required: labour hours, material quantities, and plant/equipment time. It provides the most detailed and accurate estimate when done correctly.',
  },
  {
    id: 'bcis-purpose',
    question: 'What is the primary purpose of BCIS data in estimating?',
    options: [
      'Multiple variables and diagnostics over two wires',
      'To provide benchmark costs for comparison and early-stage budgets',
      'Print outputs with input data visible, version noted, and include in calc package',
      'All observations, defects, and compliance issues',
    ],
    correctIndex: 1,
    explanation:
      "BCIS (Building Cost Information Service) provides benchmark cost data from actual projects. It's used for early-stage budgeting, cost checking, and comparing estimates against industry norms.",
  },
  {
    id: 'parametric-method',
    question: 'Parametric estimating uses which approach?',
    options: [
      'Chromel and alumel (nickel-chromium / nickel-aluminium)',
      'Isolate the circuit and implement temporary safety measures',
      'The resistance of the earth electrode to general mass of earth',
      'Cost relationships based on key parameters (e.g., per m2, per kW)',
    ],
    correctIndex: 3,
    explanation:
      "Parametric estimating uses cost relationships tied to measurable parameters such as cost per square metre, cost per kW of cooling, or cost per lighting point. It's faster than first principles but less detailed.",
  },
  {
    id: 'mep-complexity',
    question:
      'Why do MEP systems typically have higher estimating uncertainty than structural works?',
    options: [
      'Greater design development during construction and more complex coordination',
      'Determine the effective temperature driving force for heat transfer',
      'A guaranteed income for life bought with your pension pot',
      'Intrinsic motivation decreases because the need for autonomy is unmet',
    ],
    correctIndex: 0,
    explanation:
      'MEP (mechanical, electrical, plumbing) systems often undergo significant design development during construction, require complex coordination between trades, and have rapidly changing technology - all contributing to higher estimating uncertainty.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Which estimating method is most appropriate for a RIBA Stage 1 feasibility study?',
    options: [
      'First principles with full bills of quantities',
      'Parametric or elemental benchmarks (cost per m2)',
      'Detailed supplier quotations',
      'Measured term contract rates',
    ],
    correctAnswer: 1,
    explanation:
      'At RIBA Stage 1, design information is limited. Parametric methods using cost per m2 or elemental benchmarks provide appropriate accuracy for feasibility without requiring detailed design.',
  },
  {
    id: 2,
    question: "In first principles estimating, what does 'all-in rate' for labour include?",
    options: [
      "To cover design development, coordination issues, and market volatility",
      "Working around existing services, access restrictions, and unknown conditions",
      "Basic wage plus employer's NI, holiday pay, sick pay, pension, and overheads",
      "Luminaire, containment allocation, wiring, labour, fixings, and testing allowance",
    ],
    correctAnswer: 2,
    explanation:
      "The all-in labour rate includes basic wage, employer's National Insurance, CITB levy, holiday pay, sick pay, pension contributions, travel, tool allowances, and company overheads attributed to labour.",
  },
  {
    id: 3,
    question:
      'A 5,000m2 office requires electrical installation. Using BCIS data showing median electrical costs of 120 per m2, what is the elemental estimate?',
    options: [
      '720,000',
      '500,000',
      '850,000',
      '600,000',
    ],
    correctAnswer: 3,
    explanation:
      'Elemental estimate = Area x Cost per m2 = 5,000m2 x 120/m2 = 600,000. This provides a budget figure for early-stage cost planning.',
  },
  {
    id: 4,
    question:
      "What is the primary advantage of Spon's Mechanical and Electrical Services Price Book?",
    options: [
      'Gives itemised rates for common MEP components with labour constants',
      'Basic wage plus employer\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s NI, holiday pay, sick pay, pension, and overheads',
      'Working around existing services, access restrictions, and unknown conditions',
      'Cost per m2 of treated floor area or per kW of installed cooling capacity',
    ],
    correctAnswer: 0,
    explanation:
      "Spon's provides itemised rates including labour constants (hours per unit) for mechanical and electrical components. It serves as a checking tool and starting point for building up rates.",
  },
  {
    id: 5,
    question:
      'When building up a composite rate for installing a luminaire, which elements should be included?',
    options: [
      'Basic wage plus employer\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s NI, holiday pay, sick pay, pension, and overheads',
      'Luminaire, containment allocation, wiring, labour, fixings, and testing allowance',
      'Gives itemised rates for common MEP components with labour constants',
      'Cost per m2 of treated floor area or per kW of installed cooling capacity',
    ],
    correctAnswer: 1,
    explanation:
      'A composite rate for luminaire installation should include: the fitting itself, an allocation of containment/trunking, wiring from distribution board, fixing materials, installation labour, and an allowance for testing and commissioning.',
  },
  {
    id: 6,
    question:
      'What adjustment should be applied to BCIS data when using it for a project in Manchester if the base data is national average?',
    options: [
      'Matched to motor full load current',
      'HSG210 — Asbestos Essentials',
      'Apply regional location factor',
      'Requires skilled installation',
    ],
    correctAnswer: 2,
    explanation:
      'BCIS provides location factors for different regions of the UK. These must be applied to convert national average costs to the specific project location, as labour and material costs vary regionally.',
  },
  {
    id: 7,
    question:
      'For a complex hospital M&E installation, what percentage of construction cost might MEP services represent?',
    options: [
      '15-20%',
      '25-35%',
      '70-80%',
      '40-60%',
    ],
    correctAnswer: 3,
    explanation:
      'Healthcare facilities have high M&E content due to medical gases, specialist ventilation, backup power, nurse call systems, and complex controls. M&E can represent 40-60% of construction cost compared to 25-35% for standard offices.',
  },
  {
    id: 8,
    question: "What is 'prelims' in the context of building services estimating?",
    options: [
      'Site-based project overheads and management costs',
      'Divides proportionally to resistance',
      'The person who signs the certificate',
      'New circuits, consumer unit changes and bathroom/kitchen work',
    ],
    correctAnswer: 0,
    explanation:
      "Preliminaries (prelims) are the contractor's site-based costs including site management, temporary facilities, plant and equipment, insurances, and project-specific overheads that cannot be allocated to measured work items.",
  },
  {
    id: 9,
    question:
      'When estimating for a refurbishment project, what additional factor significantly impacts MEP costs?',
    options: [
      'Luminaire, containment allocation, wiring, labour, fixings, and testing allowance',
      'Working around existing services, access restrictions, and unknown conditions',
      'Drawing cable from drum, pulling through containment, termination, labelling, and testing',
      'Gives itemised rates for common MEP components with labour constants',
    ],
    correctAnswer: 1,
    explanation:
      'Refurbishment projects face challenges including working around existing services, restricted access, discovering unknown conditions, maintaining building operations, and coordinating with multiple existing systems.',
  },
  {
    id: 10,
    question:
      'A first principles estimate for cable installation should include which labour operations?',
    options: [
      'To cover design development, coordination issues, and market volatility',
      'Basic wage plus employer\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s NI, holiday pay, sick pay, pension, and overheads',
      'Drawing cable from drum, pulling through containment, termination, labelling, and testing',
      'Working around existing services, access restrictions, and unknown conditions',
    ],
    correctAnswer: 2,
    explanation:
      'Complete cable installation labour includes: drawing from drum, measuring and cutting, pulling through containment, forming and dressing, termination at both ends, labelling, initial testing, and an allowance for final testing.',
  },
  {
    id: 11,
    question: "What is the purpose of applying a 'risk allowance' in MEP estimates?",
    options: [
      'Drawing cable from drum, pulling through containment, termination, labelling, and testing',
      'Basic wage plus employer\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s NI, holiday pay, sick pay, pension, and overheads',
      'Luminaire, containment allocation, wiring, labour, fixings, and testing allowance',
      'To cover design development, coordination issues, and market volatility',
    ],
    correctAnswer: 3,
    explanation:
      "Risk allowance covers uncertainties in MEP projects including ongoing design development, coordination clashes, material price volatility, productivity variations, and unforeseen site conditions. It's separate from contingency.",
  },
  {
    id: 12,
    question:
      'For benchmarking purposes, what unit is commonly used to express HVAC costs in offices?',
    options: [
      'Cost per m2 of treated floor area or per kW of installed cooling capacity',
      'Working around existing services, access restrictions, and unknown conditions',
      'Drawing cable from drum, pulling through containment, termination, labelling, and testing',
      'Basic wage plus employer\\\\\\\\\\\\\\\'s NI, holiday pay, sick pay, pension, and overheads',
    ],
    correctAnswer: 0,
    explanation:
      'HVAC costs are commonly benchmarked as cost per m2 of treated floor area or cost per kW of cooling capacity. This allows comparison across projects regardless of specific system design.',
  },
];

const faqs = [
  {
    question: 'When should I use first principles versus parametric estimating?',
    answer:
      'Use parametric methods (cost per m2) for early-stage feasibility and budget setting when design detail is limited. Move to first principles estimating when detailed design information is available (RIBA Stage 4+) and accuracy is critical for tendering. Many estimators use parametric methods to cross-check first principles estimates.',
  },
  {
    question: 'How do I account for regional cost variations in the UK?',
    answer:
      'Apply BCIS location factors or regional indices. London typically has an index of 1.10-1.20 (10-20% above national average), whilst northern regions may be 0.85-0.95. These factors reflect labour rate differences, material delivery costs, and local market conditions.',
  },
  {
    question: 'What labour productivity rates should I use for electrical installation?',
    answer:
      "Use published sources like Spon's or CIBSE as a starting point, then adjust for project conditions. Factors affecting productivity include: building complexity, working height, access restrictions, coordination density, operative skill level, and site management quality. Track your own productivity data from completed projects.",
  },
  {
    question: 'How should I price design-and-build MEP work versus traditional contracts?',
    answer:
      'Design-and-build carries more risk for the contractor (design liability, coordination, performance guarantees). Add risk allowance of 5-10% compared to traditional. Include design fees, design management, performance testing, and enhanced insurances. Also allow for design development and coordination time.',
  },
  {
    question: 'What contingency should I include in MEP estimates?',
    answer:
      'Contingency varies by project stage and complexity: RIBA Stage 2 estimates might carry 15-20%, Stage 4 estimates 5-10%. Complex healthcare or data centre projects warrant higher contingencies. Distinguish between design contingency (for incomplete information) and construction contingency (for site unknowns).',
  },
  {
    question: 'How do I estimate MEP costs for sustainable building features?',
    answer:
      'Sustainable features like heat pumps, solar PV, battery storage, and enhanced controls typically add 10-25% to base MEP costs but vary widely. Use specialist supplier quotations where possible. Consider whole-life costing - higher capital costs may be offset by operational savings. BREEAM or NABERS compliance has additional cost implications for commissioning and documentation.',
  },
];

const HNCModule5Section3_1 = () => {
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
            eyebrow="Module 5 · Section 3 · Subsection 1"
            title="Estimating Methods"
            description="First principles, benchmarking, and parametric techniques for building services cost estimation."
            tone="purple"
          />

          <TLDR
            points={[
              "Three primary methods: first-principles (build-up from labour + material + plant + overhead + profit), benchmarking (£/m² from completed projects), parametric (cost models from drivers).",
              "First-principles is most accurate for unique work; benchmarking is fastest for budgets; parametric is best for early-stage estimates.",
              "Always cross-check with at least two methods — divergence flags scope misunderstanding.",
              "Build labour rates from: basic + holiday + pension + travel + supervision + overhead — typically 1.6–2.0× the basic hourly rate.",
              "Add risk allowances explicitly (design development, programme risk, market risk) — not hidden in inflated unit rates.",
            ]}
          />

          <RegsCallout
            source="NRM2: Detailed Measurement for Building Works (RICS)"
            clause="NRM2 provides a standard set of measurement rules for use throughout the construction industry. The rules cover the production of detailed bills of quantities to obtain priced bills of quantities and the basis of the rules used in valuing variations. NRM2 incorporates the rules of measurement for the work of all building services subcontractors."
            meaning={
              <>
                NRM2 is the RICS standard for measurement and pricing of building works including services. Estimates and bills of quantities aligned to NRM2 are directly comparable across tenderers, support fair valuation of variations, and form the basis of cost analytics. Diverging from NRM2 makes benchmarking and dispute resolution harder.
              </>
            }
            cite="Source: NRM2 New Rules of Measurement (RICS) (refer to RICS published text for verbatim use)."
          />


          <LearningOutcomes
            outcomes={[
              'Build up costs from first principles using labour, materials, and plant',
              'Apply all-in labour rates including oncosts and overheads',
              "Use BCIS and Spon's data for benchmarking and rate checking",
              'Develop parametric estimates using cost per m2 and other metrics',
              'Understand MEP-specific pricing considerations and risk factors',
              'Adjust estimates for location, complexity, and market conditions',
            ]}
          />

          <SectionRule />

          <ConceptBlock title="First Principles Estimating">
            <p>
              First principles estimating is the most detailed and accurate method, building costs
              from fundamental resource inputs. It requires comprehensive design information but
              provides transparent, auditable estimates essential for competitive tendering.
            </p>
            <p>
              <strong>The Three Resource Elements — Labour:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Hours required per unit of work</li>
              <li>All-in hourly rate applied</li>
              <li>Gang composition considered</li>
              <li>Productivity factors applied</li>
            </ul>
            <p>
              <strong>Materials:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Quantity from measurement</li>
              <li>Current supplier prices</li>
              <li>Waste allowance (typically 2.5-10%)</li>
              <li>Delivery and handling costs</li>
            </ul>
            <p>
              <strong>Plant & Equipment:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Access equipment (towers, MEWP)</li>
              <li>Power tools and testing equipment</li>
              <li>Hire or ownership costs</li>
              <li>Transport and operator costs</li>
            </ul>
            <p>
              <strong>All-In Labour Rate Build-Up (2024 Example) — (Element — Annual Cost — Notes):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Basic wage (JIB rate):</strong> 38,000 — Approved electrician rate
              </li>
              <li>
                <strong>Employer's NI (13.8%):</strong> 5,244 — Above threshold
              </li>
              <li>
                <strong>Holiday pay (21 days):</strong> 3,080 — JIB entitlement
              </li>
              <li>
                <strong>Pension (employer 3%):</strong> 1,140 — Minimum auto-enrolment
              </li>
              <li>
                <strong>Sick pay allowance:</strong> 800 — Estimated 5 days
              </li>
              <li>
                <strong>CITB levy (0.35%):</strong> 133 — Construction Industry Training Board
              </li>
              <li>
                <strong>Tool allowance:</strong> 520 — 10/week
              </li>
              <li>
                <strong>Travel allowance:</strong> 2,600 — 50/week average
              </li>
              <li>
                <strong>Total Annual Cost:</strong> 51,517
              </li>
              <li>
                <strong>Productive hours (1,720):</strong> 29.95/hr — After holidays, training,
                sickness
              </li>
              <li>
                <strong>+ Company overhead (15%):</strong> 34.44/hr — All-in rate for estimating
              </li>
            </ul>
            <p>
              <strong>Key principle:</strong> The all-in rate represents the true cost of labour to
              the business, not just the wage paid to the operative.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Benchmarking Data Sources">
            <p>
              Benchmark data from industry sources enables rapid cost estimates, validates first
              principles calculations, and provides defensible figures for cost planning. The two
              primary UK sources for building services are BCIS and Spon's price books.
            </p>
            <p>
              <strong>BCIS (Building Cost Information Service):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>RICS subscription service</li>
              <li>Elemental costs from actual projects</li>
              <li>Analysed by building type and size</li>
              <li>Location factors for regional adjustment</li>
              <li>Tender price indices for inflation</li>
              <li>Best for early-stage cost planning</li>
            </ul>
            <p>
              <strong>Spon's M&E Price Book:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Annual publication (print/digital)</li>
              <li>Itemised rates for M&E components</li>
              <li>Labour constants (hours per unit)</li>
              <li>Material prices updated annually</li>
              <li>Composite rates for common assemblies</li>
              <li>Best for rate checking and build-ups</li>
            </ul>
            <p>
              <strong>BCIS Elemental Costs — Electrical Installations (2024 Data) (Building Type — Lower Quartile — Median — Upper Quartile):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Offices (air-conditioned):</strong> 95/m2 — 135/m2 — 185/m2
              </li>
              <li>
                <strong>Retail (shell and core):</strong> 45/m2 — 75/m2 — 110/m2
              </li>
              <li>
                <strong>Secondary schools:</strong> 80/m2 — 115/m2 — 150/m2
              </li>
              <li>
                <strong>Hospitals (acute):</strong> 180/m2 — 260/m2 — 380/m2
              </li>
              <li>
                <strong>Data centres:</strong> 450/m2 — 750/m2 — 1,200/m2
              </li>
              <li>
                <strong>Residential (apartments):</strong> 55/m2 — 85/m2 — 120/m2
              </li>
            </ul>
            <p>
              Note: National average figures. Apply BCIS location factors for regional projects.
            </p>
            <p>
              <strong>BCIS Location Factors (Selected Regions):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>London:</strong> 1.15
              </li>
              <li>
                <strong>South East:</strong> 1.05
              </li>
              <li>
                <strong>Midlands:</strong> 0.95
              </li>
              <li>
                <strong>North:</strong> 0.90
              </li>
            </ul>
            <p>
              <strong>Best practice:</strong> Use BCIS for budget setting and cost planning; use
              Spon's for detailed rate checking and build-ups.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Parametric Estimating Methods">
            <p>
              Parametric estimating uses cost relationships based on measurable project
              characteristics. It bridges the gap between early-stage benchmarking and detailed
              first principles estimates, providing reasonable accuracy when design information is
              developing.
            </p>
            <p>
              <strong>Common Parametric Units for Building Services (System — Unit — Typical Range 2024):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>General lighting:</strong> Per m2 floor area — 25-50/m2
              </li>
              <li>
                <strong>Small power:</strong> Per socket outlet — 80-150/outlet
              </li>
              <li>
                <strong>Data cabling:</strong> Per data point (Cat6A) — 120-200/point
              </li>
              <li>
                <strong>Air conditioning:</strong> Per kW cooling capacity — 800-1,500/kW
              </li>
              <li>
                <strong>Mechanical ventilation:</strong> Per m3/s air handling — 15,000-30,000/m3/s
              </li>
              <li>
                <strong>Fire alarm:</strong> Per detector/device — 180-300/device
              </li>
              <li>
                <strong>Emergency lighting:</strong> Per fitting — 150-280/fitting
              </li>
              <li>
                <strong>Distribution boards:</strong> Per way — 80-150/way
              </li>
            </ul>
            <p>
              <strong>Worked Example — Parametric Estimate for Office Electrical:</strong> Office
              building 3,500m2 NIA, air-conditioned, Cat A fit-out.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Lighting: 3,500m2 x 35/m2 = 122,500</li>
              <li>Small power (1 per 10m2): 350 outlets x 120 = 42,000</li>
              <li>Data (1 per 8m2): 438 points x 160 = 70,080</li>
              <li>Fire alarm (1 per 60m2): 58 devices x 220 = 12,760</li>
              <li>Emergency lighting: 3,500m2 x 8/m2 = 28,000</li>
              <li>Distribution boards: 45 ways x 100 = 4,500</li>
              <li>Main switchgear allowance: 35,000</li>
              <li>
                <strong>Subtotal: 314,840</strong>
              </li>
              <li>Preliminaries (12%): 37,781</li>
              <li>Overheads & profit (8%): 28,210</li>
              <li>
                <strong>Parametric estimate: 380,831 (109/m2)</strong>
              </li>
            </ul>
            <p>
              <strong>When to Use Each Method (RIBA Stage — Method — Expected Accuracy):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>0-1 Strategic Definition:</strong> BCIS benchmarks (per m2) — +/- 25-40%
              </li>
              <li>
                <strong>2 Concept Design:</strong> Elemental estimate — +/- 15-25%
              </li>
              <li>
                <strong>3 Spatial Coordination:</strong> Parametric + key quotes — +/- 10-15%
              </li>
              <li>
                <strong>4 Technical Design:</strong> First principles — +/- 5-10%
              </li>
              <li>
                <strong>5 Tender:</strong> Full bill of quantities — +/- 2-5%
              </li>
            </ul>
            <p>
              <strong>Accuracy tip:</strong> Always state the basis and expected accuracy range of
              your estimate. This manages client expectations and supports proper risk management.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="MEP-Specific Pricing Considerations">
            <p>
              Mechanical, electrical, and plumbing (MEP) installations present unique estimating
              challenges compared to building fabric works. Understanding these factors is essential
              for producing reliable building services estimates.
            </p>
            <p>
              <strong>Key MEP Cost Drivers:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Design development:</strong> MEP often designed in parallel with
                construction
              </li>
              <li>
                <strong>Coordination density:</strong> Multiple services competing for limited
                ceiling/riser space
              </li>
              <li>
                <strong>Long lead items:</strong> Switchgear, chillers, AHUs may have 16-24 week
                delivery
              </li>
              <li>
                <strong>Technology evolution:</strong> Specifications can change during project
              </li>
              <li>
                <strong>Commissioning complexity:</strong> Integrated systems require extensive
                commissioning
              </li>
            </ul>
            <p>
              <strong>MEP as Percentage of Total Construction Cost (Building — M&E % — Dominant Systems):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Warehouse (shell):</strong> 8-12% — Basic electrical, fire detection
              </li>
              <li>
                <strong>Residential:</strong> 18-25% — Heating, ventilation, electrical
              </li>
              <li>
                <strong>Office (Cat A):</strong> 28-35% — HVAC, lighting, data, fire
              </li>
              <li>
                <strong>Retail (fitted):</strong> 25-32% — Cooling, lighting, security
              </li>
              <li>
                <strong>Laboratory:</strong> 40-50% — Fume extraction, specialist gases
              </li>
              <li>
                <strong>Hospital (acute):</strong> 45-60% — Medical gases, power resilience, BMS
              </li>
              <li>
                <strong>Data centre:</strong> 55-70% — Power distribution, cooling, UPS
              </li>
            </ul>
            <p>
              <strong>Productivity Factors for Electrical Installation:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Working height:</strong> Reduce productivity 15-25% for ceiling work above
                3m
              </li>
              <li>
                <strong>Congested areas:</strong> Allow 20-40% additional time in plant rooms,
                risers
              </li>
              <li>
                <strong>Existing buildings:</strong> Add 25-50% for working around existing
                services
              </li>
              <li>
                <strong>Occupied premises:</strong> Out-of-hours working typically costs 1.5-2x
                normal rates
              </li>
              <li>
                <strong>Clean environments:</strong> Data centres, labs require suited working (add
                15-20%)
              </li>
              <li>
                <strong>Coordination delays:</strong> Allow 5-10% for waiting on other trades
              </li>
            </ul>
            <p>
              <strong>Composite Rate Build-Up — Recessed LED Panel Luminaire:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Luminaire (600x600 LED panel, 40W): 85.00</li>
              <li>Suspension kit and fixings: 8.50</li>
              <li>Containment allocation (5m trunking): 18.00</li>
              <li>Cable (10m 3-core flex): 12.00</li>
              <li>Terminal connector: 3.50</li>
              <li>Labour - installation (0.75 hr x 34): 25.50</li>
              <li>Labour - termination (0.25 hr x 34): 8.50</li>
              <li>Testing allowance: 2.50</li>
              <li>
                <strong>Net cost per luminaire: 163.50</strong>
              </li>
              <li>Add preliminaries, OH&P as per project requirements.</li>
            </ul>
            <p>
              <strong>Risk management:</strong> MEP estimates should include explicit risk
              allowances for design development (5-10%) and market volatility (3-5%) in addition to
              normal contingencies.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1 — First Principles Cable Installation:</strong> Build up the rate
              for installing 100m of 3-core 6mm2 SWA cable in surface-mounted tray.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>3C 6mm2 SWA cable (105m inc. waste): 105 x 4.20 = 441.00</li>
              <li>Cable tray 100mm (105m): 105 x 8.50 = 892.50</li>
              <li>Brackets and fixings: 45.00</li>
              <li>Glands (2 no.): 2 x 12.00 = 24.00</li>
              <li>Install tray (100m x 0.15 hr/m): 15 hrs x 34.44 = 516.60</li>
              <li>Draw and fix cable (100m x 0.08 hr/m): 8 hrs x 34.44 = 275.52</li>
              <li>Terminate both ends: 1.5 hrs x 34.44 = 51.66</li>
              <li>
                <strong>Net total: 2,246.28</strong>
              </li>
              <li>
                <strong>Rate per metre: 22.46/m</strong> (excluding prelims, OH&P)
              </li>
            </ul>
            <p>
              <strong>Example 2 — Benchmark Validation:</strong> Validate a detailed electrical
              estimate of 520,000 for a 4,200m2 office against BCIS data.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Detailed estimate: 520,000 / 4,200m2 = <strong>123.81/m2</strong>
              </li>
              <li>BCIS median (air-conditioned office): 135/m2</li>
              <li>BCIS range: 95-185/m2</li>
              <li>
                <strong>Result:</strong> Estimate falls within BCIS range, slightly below median.
              </li>
              <li>Review: Check if specification is simpler than typical, or if rates are competitive.</li>
            </ul>
            <p>
              <strong>Example 3 — Location Adjustment:</strong> Adjust a national average estimate
              of 850,000 for a project in Central London.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Base estimate (national average): 850,000</li>
              <li>BCIS London location factor: 1.15</li>
              <li>Adjusted estimate = 850,000 x 1.15</li>
              <li>
                <strong>London estimate: 977,500</strong>
              </li>
              <li>
                Note: Also consider London-specific factors like parking restrictions, congestion
                charges, and security requirements.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Estimating checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Confirm scope boundaries (shell and core vs. Cat A vs. Cat B)</li>
              <li>Identify long-lead items and get early quotations</li>
              <li>Apply correct location factor for regional projects</li>
              <li>Include all oncosts in labour rates</li>
              <li>Allow appropriate waste percentages on materials</li>
              <li>Include testing, commissioning, and handover costs</li>
              <li>Add design risk allowance for incomplete information</li>
              <li>Cross-check against benchmarks for reasonableness</li>
            </ul>
            <p>
              <strong>Key values to remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Electrical labour all-in rate: <strong>32-38/hr</strong> (2024)
              </li>
              <li>
                Office electrical benchmark: <strong>100-180/m2</strong>
              </li>
              <li>
                MEP as % of office cost: <strong>28-35%</strong>
              </li>
              <li>
                Prelims typical range: <strong>10-15%</strong>
              </li>
              <li>
                Overheads and profit: <strong>6-12%</strong>
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common estimating errors"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Using base wages instead of all-in rates</strong> — understates labour by
                  30-40%
                </li>
                <li>
                  <strong>Ignoring waste factors</strong> — underestimates materials by 2.5-10%
                </li>
                <li>
                  <strong>Omitting testing and commissioning</strong> — typically 3-5% of M&E value
                </li>
                <li>
                  <strong>Forgetting design development risk</strong> — MEP specs often change
                </li>
                <li>
                  <strong>Using outdated price data</strong> — material prices volatile
                </li>
                <li>
                  <strong>No location adjustment</strong> — can be +/- 15% variation
                </li>
              </ul>
            }
            doInstead="Always price labour at the all-in rate, apply waste percentages by material type, include explicit testing and commissioning lines, carry a design-development risk allowance, refresh prices at tender, and apply BCIS regional factors."
          />

          <SectionRule />

          <Scenario
            title="Benchmark estimate hides poor scope understanding"
            situation={
              <>
                A client asks for a budget cost on a 6,000 m² office MEP fit-out. You quickly produce £95/m² × 6,000 = £570k based on benchmarks from your last three offices. The client awards on this basis. At first-principles tender, the cost comes out at £680k — £110k over budget. The benchmark was for cellular offices; this is open-plan with a high IT density and active chilled beams.
              </>
            }
            whatToDo={
              <>
                For any pre-construction estimate, always test with a second method. Even a brief first-principles check on lighting density (W/m²), small power outlets, IT room load and HVAC duty would have flagged the divergence. Make the assumptions explicit when issuing the budget — "based on cellular office benchmarks; open-plan or high-tech assumes ±15%". Push back on clients who treat benchmarks as fixed prices.
              </>
            }
            whyItMatters={
              <>
                Estimates set client expectations. A confidently-stated benchmark figure becomes the budget the client commits to — and you eat the difference at tender. The discipline of cross-checking is cheap insurance against project loss.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

                    <KeyTakeaways
            points={[
              "Three methods: first-principles (most accurate), benchmarking (fastest), parametric (early-stage).",
              "Cross-check with at least two methods — divergence flags scope misunderstanding.",
              "Labour rates: basic + holiday + pension + travel + supervision + overhead = 1.6–2.0× basic hourly.",
              "Risk allowances explicit (design development, programme, market) — not hidden in unit rates.",
              "Material rates: list price → trade discount → mark-up — keep audit trail of supplier quotes.",
              "Plant: hire vs own analysis with utilisation × duration × rate.",
              "Overheads and profit: site overhead 10–15%, head office 5–8%, profit 4–8% typical.",
              "NRM2 is the RICS standard for measurement and pricing — supports comparability and variation valuation.",
            ]}
          />


          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module5-section3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Back to section
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Cost management
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module5-section3-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Budget development
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule5Section3_1;
