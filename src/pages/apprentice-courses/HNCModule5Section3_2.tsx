import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Budget Development - HNC Module 5 Section 3.2";
const DESCRIPTION = "Master budget development for MEP works: cost plan structure, contingency calculation, design and construction risk allowances, preliminaries breakdown, overhead and profit percentages, and inflation allowances for building services projects.";

const quickCheckQuestions = [
  {
    id: "cost-plan-stages",
    question: "At which RIBA stage is a formal cost plan first produced?",
    options: ["Stage 0 - Strategic Definition", "Stage 2 - Concept Design", "Stage 4 - Technical Design", "Stage 5 - Construction"],
    correctIndex: 1,
    explanation: "The first formal cost plan (Cost Plan 1) is produced at RIBA Stage 2 - Concept Design, establishing the budget framework based on initial design concepts and elemental benchmarks."
  },
  {
    id: "contingency-purpose",
    question: "What is the primary purpose of design development contingency?",
    options: ["To cover unexpected site conditions", "To allow for design changes and incomplete information", "To fund contractor preliminaries", "To cover material price increases"],
    correctIndex: 1,
    explanation: "Design development contingency covers anticipated design changes, incomplete information at early stages, and refinements as the design develops. It typically reduces as design progresses."
  },
  {
    id: "preliminaries-typical",
    question: "What is a typical preliminaries percentage for a medium-sized MEP project?",
    options: ["2-5%", "8-15%", "25-30%", "40-50%"],
    correctIndex: 1,
    explanation: "Preliminaries for MEP works typically range from 8-15% of measured works value, covering site establishment, supervision, temporary services, and project-specific requirements."
  },
  {
    id: "inflation-allowance",
    question: "Tender price inflation allowance is applied to cover:",
    options: ["Design team fees only", "Price movements between estimate date and mid-point of construction", "VAT increases", "Client-instructed variations"],
    correctIndex: 1,
    explanation: "Tender price inflation covers anticipated price movements from the estimate base date to the mid-point of construction, using indices like BCIS or specialist MEP indices."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which element is NOT typically included in a formal cost plan for MEP works?",
    options: [
      "Measured works costs",
      "Contractor's profit margin",
      "Land acquisition costs",
      "Design contingency"
    ],
    correctAnswer: 2,
    explanation: "Land acquisition is a development cost, not a construction cost. MEP cost plans include measured works, preliminaries, contingencies, overheads, profit, and inflation allowances."
  },
  {
    id: 2,
    question: "Design development contingency at RIBA Stage 2 is typically:",
    options: ["2-3%", "5-7%", "10-15%", "25-30%"],
    correctAnswer: 2,
    explanation: "At RIBA Stage 2, design development contingency is typically 10-15% due to limited design information. This reduces to 5-7% at Stage 3 and 2-3% at Stage 4 as design certainty increases."
  },
  {
    id: 3,
    question: "Construction risk contingency covers:",
    options: [
      "Design changes requested by the client",
      "Unforeseen site conditions and construction uncertainties",
      "Consultant fee increases",
      "Planning delays"
    ],
    correctAnswer: 1,
    explanation: "Construction risk contingency covers unforeseen site conditions, interface issues, and construction uncertainties that cannot be reasonably anticipated at tender stage."
  },
  {
    id: 4,
    question: "Main contractor's overheads typically cover:",
    options: [
      "Site supervision and management only",
      "Head office costs, insurances, and company administration",
      "Subcontractor profits",
      "Material wastage"
    ],
    correctAnswer: 1,
    explanation: "Contractor overheads cover head office costs (rent, utilities, central staff), company insurances, IT systems, marketing, and general administration - typically 3-6% of project value."
  },
  {
    id: 5,
    question: "A project has base cost of GBP 2.5M. With 12% preliminaries, 5% overheads, and 4% profit, what is the tender total?",
    options: ["GBP 2,775,000", "GBP 3,025,000", "GBP 3,087,750", "GBP 3,150,000"],
    correctAnswer: 2,
    explanation: "Base GBP 2.5M + Prelims (12% of 2.5M = GBP 300,000) = GBP 2.8M. OH&P typically applied to total: GBP 2.8M x 1.05 x 1.04 = GBP 3,087,600 (approximately GBP 3,087,750)."
  },
  {
    id: 6,
    question: "What percentage of project value do MEP services typically represent in a commercial building?",
    options: ["10-15%", "25-40%", "50-60%", "70-80%"],
    correctAnswer: 1,
    explanation: "MEP services typically represent 25-40% of total building cost for commercial projects, with highly serviced buildings (hospitals, data centres) at the higher end or exceeding this range."
  },
  {
    id: 7,
    question: "Site establishment costs within preliminaries include:",
    options: [
      "Material costs for permanent installations",
      "Temporary offices, welfare facilities, and site security",
      "Design consultant fees",
      "Subcontractor profit margins"
    ],
    correctAnswer: 1,
    explanation: "Site establishment covers temporary facilities including offices, welfare, storage, security fencing, access roads, signage, and initial site setup - typically a fixed cost within preliminaries."
  },
  {
    id: 8,
    question: "When should inflation allowance be highest in a cost plan?",
    options: [
      "For projects tendering immediately",
      "For projects with short construction periods",
      "For projects tendering in 12+ months with long construction periods",
      "For refurbishment projects"
    ],
    correctAnswer: 2,
    explanation: "Inflation allowance is highest for projects with extended periods between estimate and construction mid-point, as there is greater exposure to price movements over time."
  },
  {
    id: 9,
    question: "Risk allowance for a complex hospital MEP installation would typically be:",
    options: ["Lower than standard office fit-out", "Similar to standard office fit-out", "Higher than standard office fit-out", "Zero if design is complete"],
    correctAnswer: 2,
    explanation: "Complex projects like hospitals have higher risk allowances due to technical complexity, coordination challenges, infection control requirements, and operational constraints."
  },
  {
    id: 10,
    question: "Which cost plan approach allocates budget by building system?",
    options: ["Functional unit method", "Elemental cost planning", "Activity-based costing", "Unit rate scheduling"],
    correctAnswer: 1,
    explanation: "Elemental cost planning organises costs by building elements (structure, envelope, MEP systems), enabling comparison with benchmark data and cost control by element."
  },
  {
    id: 11,
    question: "Contractor's profit margin on MEP works typically ranges from:",
    options: ["1-2%", "3-6%", "10-15%", "20-25%"],
    correctAnswer: 1,
    explanation: "Contractor profit margins typically range from 3-6% depending on project risk, market conditions, and competition. Specialist MEP contractors may achieve slightly higher margins."
  },
  {
    id: 12,
    question: "A GBP 4M MEP package with 5% design contingency and 3% construction risk has total contingency of:",
    options: ["GBP 200,000", "GBP 320,000", "GBP 332,800", "GBP 400,000"],
    correctAnswer: 1,
    explanation: "Design contingency: GBP 4M x 5% = GBP 200,000. Construction risk: GBP 4M x 3% = GBP 120,000. Total contingency: GBP 320,000 (8% of base cost)."
  }
];

const faqs = [
  {
    question: "What is the difference between contingency and risk allowance?",
    answer: "Contingency covers known unknowns - anticipated but unquantified items like design development. Risk allowance covers unknown unknowns - genuinely unforeseen events. In practice, design development contingency reduces as information improves, while construction risk remains until project completion. Some organisations combine these; others manage them separately with different release protocols."
  },
  {
    question: "How do I calculate appropriate preliminaries for an MEP project?",
    answer: "Build up preliminaries from first principles: Site establishment (offices, welfare, security), supervision and management staff, temporary services (power, water, lighting), plant and equipment, insurances, and project-specific items (coordination, commissioning support). For budgeting, use benchmarks of 8-15% for MEP, adjusting for project duration, complexity, and location. Longer projects have proportionally higher time-related costs."
  },
  {
    question: "When should contingency be released from the budget?",
    answer: "Contingency should be released through formal change control: design development contingency as design stages complete and scope crystallises; construction risk contingency as work progresses and risks are resolved or realised. Never release contingency simply because it appears unused - maintain it until the corresponding risk period passes. Typical release points are practical completion (construction risk) and final account agreement (remaining contingency)."
  },
  {
    question: "How do I account for inflation in multi-year projects?",
    answer: "Apply inflation from estimate base date to mid-point of construction using appropriate indices. For MEP, use BCIS Mechanical and Electrical indices or specialist indices. Calculate the inflation period in months, apply annual forecast rates, and compound where necessary. For 2-year construction periods, apply inflation to mid-point (12 months from start). Review quarterly and adjust if market conditions change significantly."
  },
  {
    question: "What drives MEP budget allocation between mechanical and electrical?",
    answer: "The split varies by building type: offices typically 55-60% mechanical, 40-45% electrical due to extensive HVAC. Data centres reverse this ratio due to power infrastructure. Hospitals are roughly equal. Retail varies with refrigeration needs. Understanding the building function and primary services drivers is essential for realistic budget allocation."
  },
  {
    question: "How do overheads and profit differ from preliminaries?",
    answer: "Preliminaries are project-specific indirect costs (site facilities, supervision, temporary works). Overheads are company-wide indirect costs allocated to projects (head office, central services, insurances). Profit is the contractor's return for risk and enterprise. Preliminaries appear as a separate cost centre; overheads and profit are typically applied as percentages to the total of measured works and preliminaries."
  }
];

const HNCModule5Section3_2 = () => {
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
            <span>Module 5.3.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Budget Development
          </h1>
          <p className="text-white/80">
            Cost plans, contingency allowances, risk provisions, preliminaries and overhead calculations for MEP works
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Cost plan:</strong> Formal budget aligned to RIBA stages</li>
              <li className="pl-1"><strong>Contingency:</strong> 10-15% early stage, reducing as design develops</li>
              <li className="pl-1"><strong>Preliminaries:</strong> 8-15% of measured works for MEP</li>
              <li className="pl-1"><strong>OH&P:</strong> 6-10% combined overhead and profit</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>MEP proportion:</strong> 25-40% of total building cost</li>
              <li className="pl-1"><strong>Mechanical/electrical split:</strong> Varies by building type</li>
              <li className="pl-1"><strong>Specialist risk:</strong> Higher for complex systems</li>
              <li className="pl-1"><strong>Inflation:</strong> Applied to mid-point of construction</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Structure cost plans aligned to RIBA work stages",
              "Calculate appropriate contingency allowances for each design stage",
              "Distinguish between design development and construction risk contingency",
              "Build up preliminaries from first principles",
              "Apply overhead and profit percentages appropriately",
              "Account for inflation in multi-year project budgets"
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

        {/* Section 1: Cost Plan Structure */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Cost Plan Structure and Development
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A cost plan is a formal budget document that establishes and controls project costs throughout design
              and construction. For MEP works, the cost plan must capture the complexity of building services
              systems whilst aligning with overall project budgeting methodology.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Cost Plan Evolution Through RIBA Stages:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Stage 1:</strong> Order of cost estimate - broad budget based on functional requirements</li>
                <li className="pl-1"><strong>Stage 2:</strong> Cost Plan 1 - elemental budget based on concept design</li>
                <li className="pl-1"><strong>Stage 3:</strong> Cost Plan 2 - developed elemental budget with specification</li>
                <li className="pl-1"><strong>Stage 4:</strong> Cost Plan 3 - detailed cost plan for tender preparation</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Cost Plan Structure for MEP Works</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Element</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Description</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical %</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Measured Works</td>
                      <td className="border border-white/10 px-3 py-2">Quantified MEP installations</td>
                      <td className="border border-white/10 px-3 py-2">Base cost</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Preliminaries</td>
                      <td className="border border-white/10 px-3 py-2">Site-specific indirect costs</td>
                      <td className="border border-white/10 px-3 py-2">8-15%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Design Contingency</td>
                      <td className="border border-white/10 px-3 py-2">Scope development allowance</td>
                      <td className="border border-white/10 px-3 py-2">3-15%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Construction Risk</td>
                      <td className="border border-white/10 px-3 py-2">Unforeseen conditions</td>
                      <td className="border border-white/10 px-3 py-2">2-5%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Overheads</td>
                      <td className="border border-white/10 px-3 py-2">Company indirect costs</td>
                      <td className="border border-white/10 px-3 py-2">3-6%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Profit</td>
                      <td className="border border-white/10 px-3 py-2">Contractor margin</td>
                      <td className="border border-white/10 px-3 py-2">3-6%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Inflation</td>
                      <td className="border border-white/10 px-3 py-2">Price movement allowance</td>
                      <td className="border border-white/10 px-3 py-2">Variable</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design principle:</strong> The cost plan must be a living document, updated at each stage to reflect design development and market changes.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Contingency and Risk Allowances */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Contingency and Risk Allowances
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Contingency management is critical for MEP budgets. Building services designs evolve significantly
              through design stages, and appropriate allowances must reflect design maturity and project risk profile.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Design Development Contingency</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Covers incomplete design information</li>
                  <li className="pl-1">Allows for specification development</li>
                  <li className="pl-1">Reduces as design progresses</li>
                  <li className="pl-1">Released through formal change control</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Construction Risk Contingency</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Covers unforeseen site conditions</li>
                  <li className="pl-1">Interface and coordination issues</li>
                  <li className="pl-1">Maintained until practical completion</li>
                  <li className="pl-1">Higher for refurbishment works</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Contingency Reduction by Stage</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">RIBA Stage</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Design Contingency</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Construction Risk</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Stage 2 - Concept</td>
                      <td className="border border-white/10 px-3 py-2">10-15%</td>
                      <td className="border border-white/10 px-3 py-2">3-5%</td>
                      <td className="border border-white/10 px-3 py-2">13-20%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Stage 3 - Developed</td>
                      <td className="border border-white/10 px-3 py-2">5-7%</td>
                      <td className="border border-white/10 px-3 py-2">3-5%</td>
                      <td className="border border-white/10 px-3 py-2">8-12%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Stage 4 - Technical</td>
                      <td className="border border-white/10 px-3 py-2">2-3%</td>
                      <td className="border border-white/10 px-3 py-2">3-5%</td>
                      <td className="border border-white/10 px-3 py-2">5-8%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Post-Tender</td>
                      <td className="border border-white/10 px-3 py-2">0%</td>
                      <td className="border border-white/10 px-3 py-2">2-3%</td>
                      <td className="border border-white/10 px-3 py-2">2-3%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Risk Factors Increasing Contingency</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Complex systems:</strong> Data centres, hospitals, laboratories (+3-5%)</li>
                <li className="pl-1"><strong>Refurbishment:</strong> Unknown existing conditions (+5-10%)</li>
                <li className="pl-1"><strong>Constrained sites:</strong> City centre, live environments (+2-5%)</li>
                <li className="pl-1"><strong>Compressed programmes:</strong> Acceleration costs risk (+3-5%)</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Best practice:</strong> Maintain separate contingency pots with clear release criteria - never merge into a single uncontrolled sum.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Preliminaries Breakdown */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Preliminaries and Site Costs
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Preliminaries are the indirect costs required to deliver the MEP installation, distinct from
              the measured works costs of materials and labour. Understanding preliminaries structure is
              essential for accurate budget development and tender assessment.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Preliminaries Categories</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Category</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Items</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Cost Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Site Establishment</td>
                      <td className="border border-white/10 px-3 py-2">Offices, welfare, storage, security</td>
                      <td className="border border-white/10 px-3 py-2">Fixed</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Site Management</td>
                      <td className="border border-white/10 px-3 py-2">Project manager, site supervisor, QS</td>
                      <td className="border border-white/10 px-3 py-2">Time-related</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Temporary Services</td>
                      <td className="border border-white/10 px-3 py-2">Power, water, lighting, communications</td>
                      <td className="border border-white/10 px-3 py-2">Time-related</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Plant and Equipment</td>
                      <td className="border border-white/10 px-3 py-2">Access equipment, lifting, small plant</td>
                      <td className="border border-white/10 px-3 py-2">Mixed</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Health and Safety</td>
                      <td className="border border-white/10 px-3 py-2">PPE, signage, first aid, training</td>
                      <td className="border border-white/10 px-3 py-2">Mixed</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Quality Assurance</td>
                      <td className="border border-white/10 px-3 py-2">Testing equipment, documentation</td>
                      <td className="border border-white/10 px-3 py-2">Time-related</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Fixed Costs</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Site setup and clearance</li>
                  <li className="pl-1">Temporary works design</li>
                  <li className="pl-1">Initial security installation</li>
                  <li className="pl-1">Constant regardless of duration</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Time-Related Costs</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Staff salaries and costs</li>
                  <li className="pl-1">Accommodation hire</li>
                  <li className="pl-1">Running costs and utilities</li>
                  <li className="pl-1">Scale with project duration</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Value-Related Costs</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Insurance premiums</li>
                  <li className="pl-1">Performance bonds</li>
                  <li className="pl-1">Some professional fees</li>
                  <li className="pl-1">Scale with contract value</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical MEP Preliminaries Build-Up (GBP 3M project, 12 months)</p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Site establishment (fixed): GBP 35,000</p>
                <p>Management staff (12 months): GBP 180,000</p>
                <p>Temporary services: GBP 25,000</p>
                <p>Plant and equipment: GBP 45,000</p>
                <p>H&S and quality: GBP 30,000</p>
                <p>Insurance and bonds: GBP 45,000</p>
                <p className="mt-2 border-t border-white/20 pt-2">Total preliminaries: <strong>GBP 360,000 (12%)</strong></p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Budgeting tip:</strong> Longer projects have proportionally higher preliminaries due to time-related costs. A 24-month project will not have double the preliminaries of a 12-month project, but the time-related element will double.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Overhead, Profit and Inflation */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Overhead, Profit and Inflation Allowances
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The final cost plan elements convert the construction cost estimate to a tender-ready budget,
              accounting for contractor margins and anticipated price movements. Understanding these
              allowances is essential for realistic budget setting and tender evaluation.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Overhead Components</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Head office costs:</strong> Rent, utilities, central administration</li>
                <li className="pl-1"><strong>Corporate services:</strong> HR, finance, IT, marketing</li>
                <li className="pl-1"><strong>Company insurances:</strong> Professional indemnity, employer's liability</li>
                <li className="pl-1"><strong>Bidding and estimating:</strong> Tender costs for unsuccessful bids</li>
                <li className="pl-1"><strong>Training and development:</strong> Staff development programmes</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">OH&P Application Methods</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Method</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Use</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Combined percentage</td>
                      <td className="border border-white/10 px-3 py-2">Single % to sub-total</td>
                      <td className="border border-white/10 px-3 py-2">Budget estimates</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Separate percentages</td>
                      <td className="border border-white/10 px-3 py-2">OH% then P% compounded</td>
                      <td className="border border-white/10 px-3 py-2">Detailed cost plans</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Distributed rates</td>
                      <td className="border border-white/10 px-3 py-2">Built into unit rates</td>
                      <td className="border border-white/10 px-3 py-2">Contractor pricing</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Inflation Calculation Example</p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Estimate base date: January 2024</p>
                <p>Tender date: July 2024 (6 months)</p>
                <p>Construction period: 18 months</p>
                <p>Mid-point of construction: 9 months from start</p>
                <p className="mt-2">Total inflation period: 6 + 9 = <strong>15 months</strong></p>
                <p className="mt-2">Forecast annual inflation: 4%</p>
                <p>15-month inflation: 4% x (15/12) = <strong>5.0%</strong></p>
                <p className="mt-2 text-white/60">Applied to measured works + preliminaries before OH&P</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Inflation Indices for MEP</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>BCIS TPI:</strong> General tender price index</li>
                <li className="pl-1"><strong>BCIS M&E:</strong> Mechanical and electrical specific index</li>
                <li className="pl-1"><strong>BEAMA:</strong> Electrical equipment manufacturers index</li>
                <li className="pl-1"><strong>Specialist indices:</strong> HVAC, controls, fire systems</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-green-500/10 border border-green-500/30">
              <p className="text-sm font-medium text-green-400 mb-2">Complete Budget Build-Up Example</p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Measured MEP works: GBP 2,500,000</p>
                <p>Preliminaries (12%): GBP 300,000</p>
                <p className="border-t border-white/20 mt-2 pt-2">Sub-total: GBP 2,800,000</p>
                <p className="mt-2">Design contingency (5%): GBP 140,000</p>
                <p>Construction risk (3%): GBP 84,000</p>
                <p className="border-t border-white/20 mt-2 pt-2">Construction cost: GBP 3,024,000</p>
                <p className="mt-2">Overheads (4%): GBP 120,960</p>
                <p>Profit (4%): GBP 125,798</p>
                <p className="border-t border-white/20 mt-2 pt-2">Tender total: GBP 3,270,758</p>
                <p className="mt-2">Inflation (5%): GBP 163,538</p>
                <p className="border-t border-white/20 mt-2 pt-2 text-green-400"><strong>Budget total: GBP 3,434,296</strong></p>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Market awareness:</strong> OH&P levels vary with market conditions. In competitive markets, margins compress; in busy markets, contractors can command higher returns.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Hospital MEP Budget Development</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> New hospital wing, 8,000m2, RIBA Stage 2, tender in 9 months, 24-month construction.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Benchmark: 180 VA/m2 (highly serviced)</p>
                <p>Estimated MEP value: GBP 6,000,000</p>
                <p className="mt-2">Preliminaries (14% - complex): GBP 840,000</p>
                <p>Design contingency (12%): GBP 720,000</p>
                <p>Construction risk (5% - hospital): GBP 300,000</p>
                <p className="border-t border-white/20 mt-2 pt-2">Sub-total: GBP 7,860,000</p>
                <p className="mt-2">OH&P (9%): GBP 707,400</p>
                <p>Inflation (9 + 12 = 21 months @ 4%): 7% = GBP 599,718</p>
                <p className="border-t border-white/20 mt-2 pt-2 text-green-400"><strong>Stage 2 Budget: GBP 9,167,118</strong></p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Office Refurbishment Contingency</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A GBP 1.2M office electrical upgrade at Stage 3. Calculate appropriate contingencies.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Base measured works: GBP 1,200,000</p>
                <p className="mt-2">Design contingency (Stage 3): 6%</p>
                <p>Additional for refurb unknowns: 4%</p>
                <p>Design contingency total: 10% = <strong>GBP 120,000</strong></p>
                <p className="mt-2">Construction risk (standard): 3%</p>
                <p>Additional for existing building: 5%</p>
                <p>Construction risk total: 8% = <strong>GBP 96,000</strong></p>
                <p className="mt-2 border-t border-white/20 pt-2">Total contingency: GBP 216,000 (18%)</p>
                <p className="text-white/60">Higher than new-build due to existing conditions uncertainty</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Preliminaries Build-Up</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Build up preliminaries for GBP 4M MEP package, 15-month programme, city centre site.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p><strong>Fixed costs:</strong></p>
                <p>Site establishment: GBP 45,000</p>
                <p>Initial temporary works: GBP 20,000</p>
                <p className="mt-2"><strong>Time-related (15 months):</strong></p>
                <p>Project manager: GBP 90,000 x 1.25 = GBP 112,500</p>
                <p>Site supervisor: GBP 65,000 x 1.25 = GBP 81,250</p>
                <p>QS support: GBP 55,000 x 1.25 = GBP 68,750</p>
                <p>Temp services: GBP 2,500/month x 15 = GBP 37,500</p>
                <p className="mt-2"><strong>Value-related:</strong></p>
                <p>Insurance (0.8%): GBP 32,000</p>
                <p>Bond (0.5%): GBP 20,000</p>
                <p className="mt-2"><strong>Project-specific:</strong></p>
                <p>Out-of-hours working: GBP 40,000</p>
                <p>Restricted access logistics: GBP 25,000</p>
                <p className="mt-2 border-t border-white/20 pt-2 text-green-400"><strong>Total: GBP 482,000 (12.05%)</strong></p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Budget Development Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Establish base date and state design stage clearly</li>
                <li className="pl-1">Use appropriate benchmark data or measured quantities</li>
                <li className="pl-1">Build up preliminaries from first principles where possible</li>
                <li className="pl-1">Apply stage-appropriate contingencies with clear assumptions</li>
                <li className="pl-1">Document OH&P assumptions and market basis</li>
                <li className="pl-1">Calculate inflation to mid-point of construction</li>
                <li className="pl-1">Include exclusions list (furniture, IT, specialist equipment)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">MEP proportion: <strong>25-40%</strong> of total building cost</li>
                <li className="pl-1">MEP preliminaries: <strong>8-15%</strong> of measured works</li>
                <li className="pl-1">Stage 2 design contingency: <strong>10-15%</strong></li>
                <li className="pl-1">Standard OH&P: <strong>6-10%</strong> combined</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Inadequate contingency:</strong> Leads to budget overspend or scope reduction</li>
                <li className="pl-1"><strong>Ignoring inflation:</strong> Budgets become unrealistic for future tender</li>
                <li className="pl-1"><strong>Benchmarking wrong building type:</strong> Hospitals vs offices vastly different</li>
                <li className="pl-1"><strong>Double-counting OH&P:</strong> Already in specialist subcontractor rates</li>
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
                <p className="font-medium text-white mb-1">Cost Plan Elements</p>
                <ul className="space-y-0.5">
                  <li>Measured works - quantified installations</li>
                  <li>Preliminaries - project indirect costs</li>
                  <li>Contingency - design and construction risk</li>
                  <li>OH&P - contractor margins</li>
                  <li>Inflation - price movement allowance</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Typical Allowances</p>
                <ul className="space-y-0.5">
                  <li>Preliminaries: 8-15% of measured works</li>
                  <li>Design contingency: 3-15% by stage</li>
                  <li>Construction risk: 2-5%</li>
                  <li>Overheads: 3-6%</li>
                  <li>Profit: 3-6%</li>
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
            <Link to="../h-n-c-module5-section3-3">
              Next: Tender Evaluation
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule5Section3_2;
