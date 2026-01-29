import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Estimating Methods - HNC Module 5 Section 3.1";
const DESCRIPTION = "Master building services estimating methods: first principles estimating, labour/material/plant build-up, BCIS and Spon's benchmarking data, parametric pricing, and MEP-specific cost considerations.";

const quickCheckQuestions = [
  {
    id: "first-principles-def",
    question: "What is first principles estimating?",
    options: ["Using historical costs from previous projects", "Building up costs from individual resources (labour, materials, plant)", "Applying a cost per square metre rate", "Using contractor quotations only"],
    correctIndex: 1,
    explanation: "First principles estimating builds up costs from the fundamental resources required: labour hours, material quantities, and plant/equipment time. It provides the most detailed and accurate estimate when done correctly."
  },
  {
    id: "bcis-purpose",
    question: "What is the primary purpose of BCIS data in estimating?",
    options: ["To replace detailed estimates entirely", "To provide benchmark costs for comparison and early-stage budgets", "To calculate exact tender prices", "To determine profit margins"],
    correctIndex: 1,
    explanation: "BCIS (Building Cost Information Service) provides benchmark cost data from actual projects. It's used for early-stage budgeting, cost checking, and comparing estimates against industry norms."
  },
  {
    id: "parametric-method",
    question: "Parametric estimating uses which approach?",
    options: ["Detailed measurement of every item", "Cost relationships based on key parameters (e.g., per m2, per kW)", "Only labour rates without materials", "Fixed price quotations from suppliers"],
    correctIndex: 1,
    explanation: "Parametric estimating uses cost relationships tied to measurable parameters such as cost per square metre, cost per kW of cooling, or cost per lighting point. It's faster than first principles but less detailed."
  },
  {
    id: "mep-complexity",
    question: "Why do MEP systems typically have higher estimating uncertainty than structural works?",
    options: ["Simpler installation methods", "Fewer specialist trades involved", "Greater design development during construction and more complex coordination", "Lower material costs"],
    correctIndex: 2,
    explanation: "MEP (mechanical, electrical, plumbing) systems often undergo significant design development during construction, require complex coordination between trades, and have rapidly changing technology - all contributing to higher estimating uncertainty."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which estimating method is most appropriate for a RIBA Stage 1 feasibility study?",
    options: [
      "First principles with full bills of quantities",
      "Parametric or elemental benchmarks (cost per m2)",
      "Detailed supplier quotations",
      "Measured term contract rates"
    ],
    correctAnswer: 1,
    explanation: "At RIBA Stage 1, design information is limited. Parametric methods using cost per m2 or elemental benchmarks provide appropriate accuracy for feasibility without requiring detailed design."
  },
  {
    id: 2,
    question: "In first principles estimating, what does 'all-in rate' for labour include?",
    options: [
      "Basic wage only",
      "Basic wage plus employer's NI, holiday pay, sick pay, pension, and overheads",
      "Basic wage plus materials",
      "Subcontractor quotations"
    ],
    correctAnswer: 1,
    explanation: "The all-in labour rate includes basic wage, employer's National Insurance, CITB levy, holiday pay, sick pay, pension contributions, travel, tool allowances, and company overheads attributed to labour."
  },
  {
    id: 3,
    question: "A 5,000m2 office requires electrical installation. Using BCIS data showing median electrical costs of 120 per m2, what is the elemental estimate?",
    options: ["500,000", "600,000", "720,000", "850,000"],
    correctAnswer: 1,
    explanation: "Elemental estimate = Area x Cost per m2 = 5,000m2 x 120/m2 = 600,000. This provides a budget figure for early-stage cost planning."
  },
  {
    id: 4,
    question: "What is the primary advantage of Spon's Mechanical and Electrical Services Price Book?",
    options: [
      "Provides fixed contract prices",
      "Gives itemised rates for common MEP components with labour constants",
      "Eliminates the need for quantity surveying",
      "Guarantees accuracy within 5%"
    ],
    correctAnswer: 1,
    explanation: "Spon's provides itemised rates including labour constants (hours per unit) for mechanical and electrical components. It serves as a checking tool and starting point for building up rates."
  },
  {
    id: 5,
    question: "When building up a composite rate for installing a luminaire, which elements should be included?",
    options: [
      "Only the luminaire purchase price",
      "Luminaire, containment allocation, wiring, labour, fixings, and testing allowance",
      "Labour and luminaire only",
      "Material cost plus 10% profit"
    ],
    correctAnswer: 1,
    explanation: "A composite rate for luminaire installation should include: the fitting itself, an allocation of containment/trunking, wiring from distribution board, fixing materials, installation labour, and an allowance for testing and commissioning."
  },
  {
    id: 6,
    question: "What adjustment should be applied to BCIS data when using it for a project in Manchester if the base data is national average?",
    options: [
      "No adjustment needed",
      "Apply regional location factor",
      "Add 50% contingency",
      "Reduce by inflation rate"
    ],
    correctAnswer: 1,
    explanation: "BCIS provides location factors for different regions of the UK. These must be applied to convert national average costs to the specific project location, as labour and material costs vary regionally."
  },
  {
    id: 7,
    question: "For a complex hospital M&E installation, what percentage of construction cost might MEP services represent?",
    options: ["15-20%", "25-35%", "40-60%", "70-80%"],
    correctAnswer: 2,
    explanation: "Healthcare facilities have high M&E content due to medical gases, specialist ventilation, backup power, nurse call systems, and complex controls. M&E can represent 40-60% of construction cost compared to 25-35% for standard offices."
  },
  {
    id: 8,
    question: "What is 'prelims' in the context of building services estimating?",
    options: [
      "Preliminary drawings",
      "Site-based project overheads and management costs",
      "Design fees only",
      "Material delivery charges"
    ],
    correctAnswer: 1,
    explanation: "Preliminaries (prelims) are the contractor's site-based costs including site management, temporary facilities, plant and equipment, insurances, and project-specific overheads that cannot be allocated to measured work items."
  },
  {
    id: 9,
    question: "When estimating for a refurbishment project, what additional factor significantly impacts MEP costs?",
    options: [
      "Lower material requirements",
      "Simpler coordination",
      "Working around existing services, access restrictions, and unknown conditions",
      "Reduced testing requirements"
    ],
    correctAnswer: 2,
    explanation: "Refurbishment projects face challenges including working around existing services, restricted access, discovering unknown conditions, maintaining building operations, and coordinating with multiple existing systems."
  },
  {
    id: 10,
    question: "A first principles estimate for cable installation should include which labour operations?",
    options: [
      "Only the time to pull cable through containment",
      "Drawing cable from drum, pulling through containment, termination, labelling, and testing",
      "Supervision costs only",
      "Material delivery time"
    ],
    correctAnswer: 1,
    explanation: "Complete cable installation labour includes: drawing from drum, measuring and cutting, pulling through containment, forming and dressing, termination at both ends, labelling, initial testing, and an allowance for final testing."
  },
  {
    id: 11,
    question: "What is the purpose of applying a 'risk allowance' in MEP estimates?",
    options: [
      "To guarantee profit",
      "To cover design development, coordination issues, and market volatility",
      "To reduce the tender price",
      "To comply with building regulations"
    ],
    correctAnswer: 1,
    explanation: "Risk allowance covers uncertainties in MEP projects including ongoing design development, coordination clashes, material price volatility, productivity variations, and unforeseen site conditions. It's separate from contingency."
  },
  {
    id: 12,
    question: "For benchmarking purposes, what unit is commonly used to express HVAC costs in offices?",
    options: [
      "Cost per luminaire",
      "Cost per socket outlet",
      "Cost per m2 of treated floor area or per kW of installed cooling capacity",
      "Cost per linear metre of ductwork"
    ],
    correctAnswer: 2,
    explanation: "HVAC costs are commonly benchmarked as cost per m2 of treated floor area or cost per kW of cooling capacity. This allows comparison across projects regardless of specific system design."
  }
];

const faqs = [
  {
    question: "When should I use first principles versus parametric estimating?",
    answer: "Use parametric methods (cost per m2) for early-stage feasibility and budget setting when design detail is limited. Move to first principles estimating when detailed design information is available (RIBA Stage 4+) and accuracy is critical for tendering. Many estimators use parametric methods to cross-check first principles estimates."
  },
  {
    question: "How do I account for regional cost variations in the UK?",
    answer: "Apply BCIS location factors or regional indices. London typically has an index of 1.10-1.20 (10-20% above national average), whilst northern regions may be 0.85-0.95. These factors reflect labour rate differences, material delivery costs, and local market conditions."
  },
  {
    question: "What labour productivity rates should I use for electrical installation?",
    answer: "Use published sources like Spon's or CIBSE as a starting point, then adjust for project conditions. Factors affecting productivity include: building complexity, working height, access restrictions, coordination density, operative skill level, and site management quality. Track your own productivity data from completed projects."
  },
  {
    question: "How should I price design-and-build MEP work versus traditional contracts?",
    answer: "Design-and-build carries more risk for the contractor (design liability, coordination, performance guarantees). Add risk allowance of 5-10% compared to traditional. Include design fees, design management, performance testing, and enhanced insurances. Also allow for design development and coordination time."
  },
  {
    question: "What contingency should I include in MEP estimates?",
    answer: "Contingency varies by project stage and complexity: RIBA Stage 2 estimates might carry 15-20%, Stage 4 estimates 5-10%. Complex healthcare or data centre projects warrant higher contingencies. Distinguish between design contingency (for incomplete information) and construction contingency (for site unknowns)."
  },
  {
    question: "How do I estimate MEP costs for sustainable building features?",
    answer: "Sustainable features like heat pumps, solar PV, battery storage, and enhanced controls typically add 10-25% to base MEP costs but vary widely. Use specialist supplier quotations where possible. Consider whole-life costing - higher capital costs may be offset by operational savings. BREEAM or NABERS compliance has additional cost implications for commissioning and documentation."
  }
];

const HNCModule5Section3_1 = () => {
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
            <span>Module 5.3.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Estimating Methods
          </h1>
          <p className="text-white/80">
            First principles, benchmarking, and parametric techniques for building services cost estimation
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>First principles:</strong> Build up from labour + materials + plant</li>
              <li className="pl-1"><strong>Benchmarking:</strong> BCIS/Spon's data for comparison</li>
              <li className="pl-1"><strong>Parametric:</strong> Cost per m2, per kW, per point</li>
              <li className="pl-1"><strong>MEP typically:</strong> 30-60% of total construction cost</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Office electrical:</strong> 100-180 per m2 typical</li>
              <li className="pl-1"><strong>Office HVAC:</strong> 150-300 per m2 typical</li>
              <li className="pl-1"><strong>Healthcare M&E:</strong> 40-60% of build cost</li>
              <li className="pl-1"><strong>Location factor:</strong> Apply BCIS regional indices</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Build up costs from first principles using labour, materials, and plant",
              "Apply all-in labour rates including oncosts and overheads",
              "Use BCIS and Spon's data for benchmarking and rate checking",
              "Develop parametric estimates using cost per m2 and other metrics",
              "Understand MEP-specific pricing considerations and risk factors",
              "Adjust estimates for location, complexity, and market conditions"
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

        {/* Section 1: First Principles Estimating */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            First Principles Estimating
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              First principles estimating is the most detailed and accurate method, building costs from
              fundamental resource inputs. It requires comprehensive design information but provides
              transparent, auditable estimates essential for competitive tendering.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">The Three Resource Elements:</p>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-white/5">
                  <p className="text-sm font-medium text-elec-yellow/80 mb-2">Labour</p>
                  <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                    <li className="pl-1">Hours required per unit of work</li>
                    <li className="pl-1">All-in hourly rate applied</li>
                    <li className="pl-1">Gang composition considered</li>
                    <li className="pl-1">Productivity factors applied</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-white/5">
                  <p className="text-sm font-medium text-elec-yellow/80 mb-2">Materials</p>
                  <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                    <li className="pl-1">Quantity from measurement</li>
                    <li className="pl-1">Current supplier prices</li>
                    <li className="pl-1">Waste allowance (typically 2.5-10%)</li>
                    <li className="pl-1">Delivery and handling costs</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-white/5">
                  <p className="text-sm font-medium text-elec-yellow/80 mb-2">Plant & Equipment</p>
                  <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                    <li className="pl-1">Access equipment (towers, MEWP)</li>
                    <li className="pl-1">Power tools and testing equipment</li>
                    <li className="pl-1">Hire or ownership costs</li>
                    <li className="pl-1">Transport and operator costs</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">All-In Labour Rate Build-Up (2024 Example)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Element</th>
                      <th className="border border-white/10 px-3 py-2 text-right">Annual Cost</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Basic wage (JIB rate)</td>
                      <td className="border border-white/10 px-3 py-2 text-right">38,000</td>
                      <td className="border border-white/10 px-3 py-2">Approved electrician rate</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Employer's NI (13.8%)</td>
                      <td className="border border-white/10 px-3 py-2 text-right">5,244</td>
                      <td className="border border-white/10 px-3 py-2">Above threshold</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Holiday pay (21 days)</td>
                      <td className="border border-white/10 px-3 py-2 text-right">3,080</td>
                      <td className="border border-white/10 px-3 py-2">JIB entitlement</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Pension (employer 3%)</td>
                      <td className="border border-white/10 px-3 py-2 text-right">1,140</td>
                      <td className="border border-white/10 px-3 py-2">Minimum auto-enrolment</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Sick pay allowance</td>
                      <td className="border border-white/10 px-3 py-2 text-right">800</td>
                      <td className="border border-white/10 px-3 py-2">Estimated 5 days</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">CITB levy (0.35%)</td>
                      <td className="border border-white/10 px-3 py-2 text-right">133</td>
                      <td className="border border-white/10 px-3 py-2">Construction Industry Training Board</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Tool allowance</td>
                      <td className="border border-white/10 px-3 py-2 text-right">520</td>
                      <td className="border border-white/10 px-3 py-2">10/week</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Travel allowance</td>
                      <td className="border border-white/10 px-3 py-2 text-right">2,600</td>
                      <td className="border border-white/10 px-3 py-2">50/week average</td>
                    </tr>
                    <tr className="bg-white/5 font-medium">
                      <td className="border border-white/10 px-3 py-2">Total Annual Cost</td>
                      <td className="border border-white/10 px-3 py-2 text-right">51,517</td>
                      <td className="border border-white/10 px-3 py-2"></td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Productive hours (1,720)</td>
                      <td className="border border-white/10 px-3 py-2 text-right">29.95/hr</td>
                      <td className="border border-white/10 px-3 py-2">After holidays, training, sickness</td>
                    </tr>
                    <tr className="bg-elec-yellow/10 font-medium">
                      <td className="border border-white/10 px-3 py-2">+ Company overhead (15%)</td>
                      <td className="border border-white/10 px-3 py-2 text-right">34.44/hr</td>
                      <td className="border border-white/10 px-3 py-2">All-in rate for estimating</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key principle:</strong> The all-in rate represents the true cost of labour to the business, not just the wage paid to the operative.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Benchmarking Data Sources */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Benchmarking Data Sources
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Benchmark data from industry sources enables rapid cost estimates, validates first principles
              calculations, and provides defensible figures for cost planning. The two primary UK sources
              for building services are BCIS and Spon's price books.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">BCIS (Building Cost Information Service)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">RICS subscription service</li>
                  <li className="pl-1">Elemental costs from actual projects</li>
                  <li className="pl-1">Analysed by building type and size</li>
                  <li className="pl-1">Location factors for regional adjustment</li>
                  <li className="pl-1">Tender price indices for inflation</li>
                  <li className="pl-1">Best for early-stage cost planning</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Spon's M&E Price Book</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Annual publication (print/digital)</li>
                  <li className="pl-1">Itemised rates for M&E components</li>
                  <li className="pl-1">Labour constants (hours per unit)</li>
                  <li className="pl-1">Material prices updated annually</li>
                  <li className="pl-1">Composite rates for common assemblies</li>
                  <li className="pl-1">Best for rate checking and build-ups</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">BCIS Elemental Costs - Electrical Installations (2024 Data)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Building Type</th>
                      <th className="border border-white/10 px-3 py-2 text-right">Lower Quartile</th>
                      <th className="border border-white/10 px-3 py-2 text-right">Median</th>
                      <th className="border border-white/10 px-3 py-2 text-right">Upper Quartile</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Offices (air-conditioned)</td>
                      <td className="border border-white/10 px-3 py-2 text-right">95/m2</td>
                      <td className="border border-white/10 px-3 py-2 text-right">135/m2</td>
                      <td className="border border-white/10 px-3 py-2 text-right">185/m2</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Retail (shell and core)</td>
                      <td className="border border-white/10 px-3 py-2 text-right">45/m2</td>
                      <td className="border border-white/10 px-3 py-2 text-right">75/m2</td>
                      <td className="border border-white/10 px-3 py-2 text-right">110/m2</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Secondary schools</td>
                      <td className="border border-white/10 px-3 py-2 text-right">80/m2</td>
                      <td className="border border-white/10 px-3 py-2 text-right">115/m2</td>
                      <td className="border border-white/10 px-3 py-2 text-right">150/m2</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Hospitals (acute)</td>
                      <td className="border border-white/10 px-3 py-2 text-right">180/m2</td>
                      <td className="border border-white/10 px-3 py-2 text-right">260/m2</td>
                      <td className="border border-white/10 px-3 py-2 text-right">380/m2</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Data centres</td>
                      <td className="border border-white/10 px-3 py-2 text-right">450/m2</td>
                      <td className="border border-white/10 px-3 py-2 text-right">750/m2</td>
                      <td className="border border-white/10 px-3 py-2 text-right">1,200/m2</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Residential (apartments)</td>
                      <td className="border border-white/10 px-3 py-2 text-right">55/m2</td>
                      <td className="border border-white/10 px-3 py-2 text-right">85/m2</td>
                      <td className="border border-white/10 px-3 py-2 text-right">120/m2</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-white/60 mt-2">Note: National average figures. Apply BCIS location factors for regional projects.</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">BCIS Location Factors (Selected Regions)</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded bg-white/5 text-centre">
                  <p className="font-medium text-white">London</p>
                  <p className="text-elec-yellow text-lg">1.15</p>
                </div>
                <div className="p-3 rounded bg-white/5 text-centre">
                  <p className="font-medium text-white">South East</p>
                  <p className="text-elec-yellow text-lg">1.05</p>
                </div>
                <div className="p-3 rounded bg-white/5 text-centre">
                  <p className="font-medium text-white">Midlands</p>
                  <p className="text-elec-yellow text-lg">0.95</p>
                </div>
                <div className="p-3 rounded bg-white/5 text-centre">
                  <p className="font-medium text-white">North</p>
                  <p className="text-elec-yellow text-lg">0.90</p>
                </div>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Best practice:</strong> Use BCIS for budget setting and cost planning; use Spon's for detailed rate checking and build-ups.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Parametric Estimating Methods */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Parametric Estimating Methods
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Parametric estimating uses cost relationships based on measurable project characteristics.
              It bridges the gap between early-stage benchmarking and detailed first principles estimates,
              providing reasonable accuracy when design information is developing.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Parametric Units for Building Services</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">System</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Parametric Unit</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Range (2024)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">General lighting</td>
                      <td className="border border-white/10 px-3 py-2">Per m2 floor area</td>
                      <td className="border border-white/10 px-3 py-2">25-50/m2</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Small power</td>
                      <td className="border border-white/10 px-3 py-2">Per socket outlet</td>
                      <td className="border border-white/10 px-3 py-2">80-150/outlet</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Data cabling</td>
                      <td className="border border-white/10 px-3 py-2">Per data point (Cat6A)</td>
                      <td className="border border-white/10 px-3 py-2">120-200/point</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Air conditioning</td>
                      <td className="border border-white/10 px-3 py-2">Per kW cooling capacity</td>
                      <td className="border border-white/10 px-3 py-2">800-1,500/kW</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Mechanical ventilation</td>
                      <td className="border border-white/10 px-3 py-2">Per m3/s air handling</td>
                      <td className="border border-white/10 px-3 py-2">15,000-30,000/m3/s</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fire alarm</td>
                      <td className="border border-white/10 px-3 py-2">Per detector/device</td>
                      <td className="border border-white/10 px-3 py-2">180-300/device</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Emergency lighting</td>
                      <td className="border border-white/10 px-3 py-2">Per fitting</td>
                      <td className="border border-white/10 px-3 py-2">150-280/fitting</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Distribution boards</td>
                      <td className="border border-white/10 px-3 py-2">Per way</td>
                      <td className="border border-white/10 px-3 py-2">80-150/way</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Worked Example: Parametric Estimate for Office Electrical</p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="mb-2">Office building: 3,500m2 NIA, air-conditioned, Cat A fit-out</p>
                <p className="mb-1">Lighting: 3,500m2 x 35/m2 = 122,500</p>
                <p className="mb-1">Small power (1 per 10m2): 350 outlets x 120 = 42,000</p>
                <p className="mb-1">Data (1 per 8m2): 438 points x 160 = 70,080</p>
                <p className="mb-1">Fire alarm (1 per 60m2): 58 devices x 220 = 12,760</p>
                <p className="mb-1">Emergency lighting: 3,500m2 x 8/m2 = 28,000</p>
                <p className="mb-1">Distribution boards: 45 ways x 100 = 4,500</p>
                <p className="mb-1">Main switchgear allowance: 35,000</p>
                <p className="mt-2 border-t border-white/20 pt-2">
                  <strong>Subtotal: 314,840</strong>
                </p>
                <p className="mb-1">Preliminaries (12%): 37,781</p>
                <p className="mb-1">Overheads & profit (8%): 28,210</p>
                <p className="mt-2 text-elec-yellow font-medium">
                  Parametric estimate: 380,831 (109/m2)
                </p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">When to Use Each Method</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">RIBA Stage</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Recommended Method</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Expected Accuracy</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">0-1 Strategic Definition</td>
                      <td className="border border-white/10 px-3 py-2">BCIS benchmarks (per m2)</td>
                      <td className="border border-white/10 px-3 py-2">+/- 25-40%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">2 Concept Design</td>
                      <td className="border border-white/10 px-3 py-2">Elemental estimate</td>
                      <td className="border border-white/10 px-3 py-2">+/- 15-25%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">3 Spatial Coordination</td>
                      <td className="border border-white/10 px-3 py-2">Parametric + key quotes</td>
                      <td className="border border-white/10 px-3 py-2">+/- 10-15%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">4 Technical Design</td>
                      <td className="border border-white/10 px-3 py-2">First principles</td>
                      <td className="border border-white/10 px-3 py-2">+/- 5-10%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">5 Tender</td>
                      <td className="border border-white/10 px-3 py-2">Full bill of quantities</td>
                      <td className="border border-white/10 px-3 py-2">+/- 2-5%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Accuracy tip:</strong> Always state the basis and expected accuracy range of your estimate. This manages client expectations and supports proper risk management.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: MEP-Specific Pricing Considerations */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            MEP-Specific Pricing Considerations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Mechanical, electrical, and plumbing (MEP) installations present unique estimating
              challenges compared to building fabric works. Understanding these factors is essential
              for producing reliable building services estimates.
            </p>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Key MEP Cost Drivers</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Design development:</strong> MEP often designed in parallel with construction</li>
                <li className="pl-1"><strong>Coordination density:</strong> Multiple services competing for limited ceiling/riser space</li>
                <li className="pl-1"><strong>Long lead items:</strong> Switchgear, chillers, AHUs may have 16-24 week delivery</li>
                <li className="pl-1"><strong>Technology evolution:</strong> Specifications can change during project</li>
                <li className="pl-1"><strong>Commissioning complexity:</strong> Integrated systems require extensive commissioning</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">MEP as Percentage of Total Construction Cost</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Building Type</th>
                      <th className="border border-white/10 px-3 py-2 text-right">M&E %</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Dominant Systems</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Warehouse (shell)</td>
                      <td className="border border-white/10 px-3 py-2 text-right">8-12%</td>
                      <td className="border border-white/10 px-3 py-2">Basic electrical, fire detection</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Residential</td>
                      <td className="border border-white/10 px-3 py-2 text-right">18-25%</td>
                      <td className="border border-white/10 px-3 py-2">Heating, ventilation, electrical</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Office (Cat A)</td>
                      <td className="border border-white/10 px-3 py-2 text-right">28-35%</td>
                      <td className="border border-white/10 px-3 py-2">HVAC, lighting, data, fire</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Retail (fitted)</td>
                      <td className="border border-white/10 px-3 py-2 text-right">25-32%</td>
                      <td className="border border-white/10 px-3 py-2">Cooling, lighting, security</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Laboratory</td>
                      <td className="border border-white/10 px-3 py-2 text-right">40-50%</td>
                      <td className="border border-white/10 px-3 py-2">Fume extraction, specialist gases</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Hospital (acute)</td>
                      <td className="border border-white/10 px-3 py-2 text-right">45-60%</td>
                      <td className="border border-white/10 px-3 py-2">Medical gases, power resilience, BMS</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Data centre</td>
                      <td className="border border-white/10 px-3 py-2 text-right">55-70%</td>
                      <td className="border border-white/10 px-3 py-2">Power distribution, cooling, UPS</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Productivity Factors for Electrical Installation</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Working height:</strong> Reduce productivity 15-25% for ceiling work above 3m</li>
                <li className="pl-1"><strong>Congested areas:</strong> Allow 20-40% additional time in plant rooms, risers</li>
                <li className="pl-1"><strong>Existing buildings:</strong> Add 25-50% for working around existing services</li>
                <li className="pl-1"><strong>Occupied premises:</strong> Out-of-hours working typically costs 1.5-2x normal rates</li>
                <li className="pl-1"><strong>Clean environments:</strong> Data centres, labs require suited working (add 15-20%)</li>
                <li className="pl-1"><strong>Coordination delays:</strong> Allow 5-10% for waiting on other trades</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Composite Rate Build-Up: Recessed LED Panel Luminaire</p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="mb-1">Luminaire (600x600 LED panel, 40W): 85.00</p>
                <p className="mb-1">Suspension kit and fixings: 8.50</p>
                <p className="mb-1">Containment allocation (5m trunking): 18.00</p>
                <p className="mb-1">Cable (10m 3-core flex): 12.00</p>
                <p className="mb-1">Terminal connector: 3.50</p>
                <p className="mb-1">Labour - installation (0.75 hr x 34): 25.50</p>
                <p className="mb-1">Labour - termination (0.25 hr x 34): 8.50</p>
                <p className="mb-1">Testing allowance: 2.50</p>
                <p className="mt-2 border-t border-white/20 pt-2">
                  <strong>Net cost per luminaire: 163.50</strong>
                </p>
                <p className="mt-2 text-white/60">
                  Add preliminaries, OH&P as per project requirements
                </p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Risk management:</strong> MEP estimates should include explicit risk allowances for design development (5-10%) and market volatility (3-5%) in addition to normal contingencies.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: First Principles - Cable Installation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Build up the rate for installing 100m of 3-core 6mm2 SWA cable in surface-mounted tray.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="font-medium mb-2">Materials:</p>
                <p>3C 6mm2 SWA cable (105m inc. waste): 105 x 4.20 = 441.00</p>
                <p>Cable tray 100mm (105m): 105 x 8.50 = 892.50</p>
                <p>Brackets and fixings: 45.00</p>
                <p>Glands (2 no.): 2 x 12.00 = 24.00</p>
                <p className="mt-2 font-medium">Labour:</p>
                <p>Install tray (100m x 0.15 hr/m): 15 hrs x 34.44 = 516.60</p>
                <p>Draw and fix cable (100m x 0.08 hr/m): 8 hrs x 34.44 = 275.52</p>
                <p>Terminate both ends: 1.5 hrs x 34.44 = 51.66</p>
                <p className="mt-2 border-t border-white/20 pt-2">
                  <strong>Net total: 2,246.28</strong>
                </p>
                <p className="mt-2 text-elec-yellow font-medium">
                  Rate per metre: 22.46/m (excluding prelims, OH&P)
                </p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Benchmark Validation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Validate a detailed electrical estimate of 520,000 for a 4,200m2 office against BCIS data.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="mb-2">Detailed estimate: 520,000 / 4,200m2 = <strong>123.81/m2</strong></p>
                <p className="mb-2">BCIS median (air-conditioned office): 135/m2</p>
                <p className="mb-2">BCIS range: 95-185/m2</p>
                <p className="mt-2 text-green-400">
                  Result: Estimate falls within BCIS range, slightly below median
                </p>
                <p className="mt-2 text-white/60">
                  Review: Check if specification is simpler than typical, or if rates are competitive
                </p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Location Adjustment</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Adjust a national average estimate of 850,000 for a project in Central London.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Base estimate (national average): 850,000</p>
                <p>BCIS London location factor: 1.15</p>
                <p className="mt-2">Adjusted estimate = 850,000 x 1.15</p>
                <p className="mt-2 text-elec-yellow font-medium">
                  London estimate: 977,500
                </p>
                <p className="mt-2 text-white/60">
                  Note: Also consider London-specific factors like parking restrictions, congestion charges, and security requirements
                </p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Estimating Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Confirm scope boundaries (shell and core vs. Cat A vs. Cat B)</li>
                <li className="pl-1">Identify long-lead items and get early quotations</li>
                <li className="pl-1">Apply correct location factor for regional projects</li>
                <li className="pl-1">Include all oncosts in labour rates</li>
                <li className="pl-1">Allow appropriate waste percentages on materials</li>
                <li className="pl-1">Include testing, commissioning, and handover costs</li>
                <li className="pl-1">Add design risk allowance for incomplete information</li>
                <li className="pl-1">Cross-check against benchmarks for reasonableness</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Electrical labour all-in rate: <strong>32-38/hr</strong> (2024)</li>
                <li className="pl-1">Office electrical benchmark: <strong>100-180/m2</strong></li>
                <li className="pl-1">MEP as % of office cost: <strong>28-35%</strong></li>
                <li className="pl-1">Prelims typical range: <strong>10-15%</strong></li>
                <li className="pl-1">Overheads and profit: <strong>6-12%</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Estimating Errors</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Using base wages instead of all-in rates</strong> - understates labour by 30-40%</li>
                <li className="pl-1"><strong>Ignoring waste factors</strong> - underestimates materials by 2.5-10%</li>
                <li className="pl-1"><strong>Omitting testing and commissioning</strong> - typically 3-5% of M&E value</li>
                <li className="pl-1"><strong>Forgetting design development risk</strong> - MEP specs often change</li>
                <li className="pl-1"><strong>Using outdated price data</strong> - material prices volatile</li>
                <li className="pl-1"><strong>No location adjustment</strong> - can be +/- 15% variation</li>
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
                <p className="font-medium text-white mb-1">Estimating Methods</p>
                <ul className="space-y-0.5">
                  <li>First principles - labour + materials + plant build-up</li>
                  <li>Benchmarking - BCIS, Spon's industry data</li>
                  <li>Parametric - cost per m2, per point, per kW</li>
                  <li>Match method to design stage and accuracy needed</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">MEP Considerations</p>
                <ul className="space-y-0.5">
                  <li>Allow for design development risk</li>
                  <li>Include coordination and commissioning</li>
                  <li>Apply location and productivity factors</li>
                  <li>Cross-check against benchmarks</li>
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
            <Link to="../h-n-c-module5-section3-2">
              Next: Measurement and Quantification
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule5Section3_1;
