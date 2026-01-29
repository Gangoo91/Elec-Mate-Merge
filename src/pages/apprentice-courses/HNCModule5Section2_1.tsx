import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Procurement Routes - HNC Module 5 Section 2.1";
const DESCRIPTION = "Understand procurement routes for building services projects: traditional lump sum, design and build, management contracting, construction management, and two-stage tendering approaches for MEP installations.";

const quickCheckQuestions = [
  {
    id: "traditional-risk",
    question: "In traditional procurement, who carries the majority of design risk?",
    options: ["The main contractor", "The MEP subcontractor", "The client/employer", "The quantity surveyor"],
    correctIndex: 2,
    explanation: "In traditional procurement, the client engages designers directly and therefore carries the design risk. The contractor is only responsible for building to the provided design."
  },
  {
    id: "design-build-advantage",
    question: "What is a key advantage of design and build for the client?",
    options: ["Lower quality standards", "Single point of responsibility", "Longer programme duration", "More design control"],
    correctIndex: 1,
    explanation: "Design and build provides single point of responsibility - the contractor is accountable for both design and construction, simplifying the client's contractual relationships."
  },
  {
    id: "construction-management-fee",
    question: "In construction management, how is the construction manager typically paid?",
    options: ["Fixed lump sum", "Cost plus percentage", "Management fee only", "Per trade package"],
    correctIndex: 2,
    explanation: "The construction manager is paid a management fee for coordinating trade packages. They do not take construction risk - each trade contractor contracts directly with the client."
  },
  {
    id: "two-stage-purpose",
    question: "What is the primary purpose of two-stage tendering?",
    options: ["To reduce overall cost", "To enable early contractor involvement", "To eliminate design risk", "To simplify procurement"],
    correctIndex: 1,
    explanation: "Two-stage tendering allows the contractor to be appointed early based on preliminaries and overheads, then work with the design team to develop the scheme before fixing the construction price."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which procurement route provides the client with the most control over design quality for MEP installations?",
    options: [
      "Design and build with contractor's proposals",
      "Traditional with full M&E specification",
      "Construction management with novated design",
      "Management contracting"
    ],
    correctAnswer: 1,
    explanation: "Traditional procurement with a full M&E specification gives the client maximum design control as they appoint and direct the M&E consultant throughout the project."
  },
  {
    id: 2,
    question: "A hospital requiring complex medical gas systems and specialist equipment would typically suit which procurement route?",
    options: [
      "Design and build",
      "Traditional with specialist subcontracts",
      "Pure construction management",
      "Single-stage competitive tender"
    ],
    correctAnswer: 1,
    explanation: "Healthcare projects with complex M&E requirements typically use traditional procurement, allowing specialist consultants to develop detailed designs and coordination with medical planners."
  },
  {
    id: 3,
    question: "Under design and build, when can the client still influence MEP design decisions?",
    options: [
      "Never - all design is the contractor's responsibility",
      "During the employer's requirements stage",
      "Only after practical completion",
      "Throughout construction without cost implications"
    ],
    correctAnswer: 1,
    explanation: "The client specifies their requirements in the Employer's Requirements document. Changes after contract award typically attract additional costs as variations."
  },
  {
    id: 4,
    question: "What is a significant disadvantage of traditional procurement for building services?",
    options: [
      "Poor quality control",
      "No competitive tendering",
      "Longer overall programme",
      "Single point of responsibility"
    ],
    correctAnswer: 2,
    explanation: "Traditional procurement requires complete design before tendering, leading to longer overall programmes. Design and construction cannot overlap significantly."
  },
  {
    id: 5,
    question: "In management contracting, who holds the subcontracts with MEP trade contractors?",
    options: [
      "The client directly",
      "The management contractor",
      "The lead designer",
      "A novated consultant"
    ],
    correctAnswer: 1,
    explanation: "In management contracting, the management contractor holds all trade subcontracts. This differs from construction management where trade contractors contract directly with the client."
  },
  {
    id: 6,
    question: "Construction management is most suitable when:",
    options: [
      "The client wants fixed price certainty from day one",
      "The client is experienced and wants maximum control",
      "The project is simple with standard M&E",
      "The client wants to transfer all risk to contractors"
    ],
    correctAnswer: 1,
    explanation: "Construction management suits sophisticated clients who want direct control over trade contractors and are willing to accept cost and programme risk in exchange for flexibility."
  },
  {
    id: 7,
    question: "Two-stage tendering is particularly valuable for MEP when:",
    options: [
      "The M&E design is fully complete",
      "Buildability input and early coordination is needed",
      "The client wants the lowest possible price",
      "The project has a simple services strategy"
    ],
    correctAnswer: 1,
    explanation: "Two-stage tendering allows MEP contractors to contribute buildability expertise during design development, improving coordination and reducing on-site problems."
  },
  {
    id: 8,
    question: "What is novation in the context of design and build procurement?",
    options: [
      "Appointing a new contractor mid-project",
      "Transferring the client's consultants to the contractor",
      "Extending the contract period",
      "Changing the project specification"
    ],
    correctAnswer: 1,
    explanation: "Novation transfers the client's design consultants (including M&E designers) to the contractor post-contract, maintaining design continuity while giving the contractor design responsibility."
  },
  {
    id: 9,
    question: "For a speculative office development requiring cost certainty, which route would typically be recommended?",
    options: [
      "Construction management",
      "Traditional with bills of quantities",
      "Design and build with a guaranteed maximum price",
      "Management contracting"
    ],
    correctAnswer: 2,
    explanation: "Design and build with a guaranteed maximum price (GMP) provides cost certainty whilst maintaining reasonable programme efficiency - ideal for speculative development."
  },
  {
    id: 10,
    question: "The term 'contractor's designed portion' (CDP) refers to:",
    options: [
      "A pure design and build contract",
      "Elements of traditional contracts designed by the contractor",
      "Management contracting preliminaries",
      "Two-stage tender requirements"
    ],
    correctAnswer: 1,
    explanation: "CDP is used within traditional contracts where specific elements (often MEP) are designed by the contractor to a performance specification, combining traditional and D&B approaches."
  },
  {
    id: 11,
    question: "Which procurement route typically results in the highest preliminaries costs?",
    options: [
      "Traditional lump sum",
      "Design and build",
      "Construction management",
      "Single-stage competitive tender"
    ],
    correctAnswer: 2,
    explanation: "Construction management typically has higher preliminaries because the construction manager's team is on site throughout, plus there are multiple trade contractor preliminaries rather than a single main contractor."
  },
  {
    id: 12,
    question: "For a data centre with rapidly evolving technology requirements, which procurement approach allows the most flexibility?",
    options: [
      "Fixed-price design and build",
      "Traditional lump sum",
      "Two-stage or construction management",
      "Single-stage competitive tender"
    ],
    correctAnswer: 2,
    explanation: "Two-stage or construction management allows design development to continue later into the programme, accommodating technology changes that are common in data centre projects."
  }
];

const faqs = [
  {
    question: "Which procurement route is best for MEP-intensive projects?",
    answer: "There is no single 'best' route - it depends on client priorities. Traditional suits clients wanting design control and quality assurance (hospitals, laboratories). Design and build suits those prioritising cost certainty and programme (commercial offices, retail). Construction management suits sophisticated clients on complex projects where flexibility is valued over cost certainty (major headquarters buildings)."
  },
  {
    question: "How does procurement route affect MEP coordination?",
    answer: "Traditional procurement allows extended coordination time during design but may create coordination issues between separately-procured trades. Design and build places coordination responsibility with the contractor, incentivising early resolution. Construction management can suffer from coordination gaps between multiple direct trade contracts unless actively managed."
  },
  {
    question: "What are the implications for MEP contractors in each route?",
    answer: "Traditional: MEP contractors bid on complete designs with clear scope. Design and build: May require design responsibility and carry more risk. Management contracting: Similar to traditional but with management contractor oversight. Construction management: Direct relationship with client but fragmented coordination. Two-stage: Opportunity to influence design but open-book pricing scrutiny."
  },
  {
    question: "How does novation work for M&E consultants?",
    answer: "The client initially appoints M&E consultants to develop the Employer's Requirements. Post-contract award, the consultant's appointment is novated (transferred) to the D&B contractor. The consultant then completes detailed design under the contractor's direction. This maintains design continuity whilst transferring design liability to the contractor."
  },
  {
    question: "What is a two-stage tender and when should it be used?",
    answer: "Stage one selects a contractor based on preliminaries, overheads, and profit margin against an outline specification. Stage two develops detailed pricing as design progresses. It is ideal when early contractor involvement benefits buildability, the programme is tight, or the design cannot be completed before contractor appointment. Common for complex MEP projects."
  },
  {
    question: "How do I choose between management contracting and construction management?",
    answer: "Management contracting: Trade contractors contract with the management contractor, who takes some risk. Suitable when the client wants a buffer between themselves and trades. Construction management: Trade contractors contract directly with the client, who accepts more risk but has more control. Suitable for experienced clients with in-house project management capability."
  }
];

const HNCModule5Section2_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module5-section2">
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
            <span>Module 5.2.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Procurement Routes
          </h1>
          <p className="text-white/80">
            Traditional, design and build, management contracting, construction management and two-stage tendering approaches for building services
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Traditional:</strong> Client leads design, contractor builds</li>
              <li className="pl-1"><strong>Design & Build:</strong> Single point responsibility</li>
              <li className="pl-1"><strong>Management routes:</strong> Fee-based coordination</li>
              <li className="pl-1"><strong>Two-stage:</strong> Early contractor involvement</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">MEP Implications</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Design control:</strong> Varies significantly by route</li>
              <li className="pl-1"><strong>Coordination:</strong> Different responsibility split</li>
              <li className="pl-1"><strong>Risk allocation:</strong> Impacts pricing approach</li>
              <li className="pl-1"><strong>Programme:</strong> Overlap potential varies</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Compare traditional, D&B, and management procurement routes",
              "Understand risk allocation in each procurement method",
              "Evaluate suitability for different MEP project types",
              "Apply two-stage tendering principles",
              "Analyse advantages and disadvantages for building services",
              "Select appropriate procurement for project circumstances"
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

        {/* Section 1: Traditional Procurement */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Traditional Procurement (Lump Sum)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Traditional procurement separates design from construction. The client engages consultants
              (architect, structural engineer, M&E consultant) to develop the design, then competitively
              tenders the construction work to contractors who price and build to the provided drawings
              and specification.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key characteristics:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Sequential process:</strong> Design complete before construction tender</li>
                <li className="pl-1"><strong>Client-led design:</strong> Full control over specification and quality</li>
                <li className="pl-1"><strong>Competitive tendering:</strong> Typically 4-6 contractors bid on same information</li>
                <li className="pl-1"><strong>Fixed price:</strong> Contractor commits to lump sum for defined scope</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Risk Allocation in Traditional Procurement</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Risk Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Allocated To</th>
                      <th className="border border-white/10 px-3 py-2 text-left">MEP Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Design adequacy</td>
                      <td className="border border-white/10 px-3 py-2">Client/consultant</td>
                      <td className="border border-white/10 px-3 py-2">If HVAC undersized, client pays to rectify</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Construction quality</td>
                      <td className="border border-white/10 px-3 py-2">Contractor</td>
                      <td className="border border-white/10 px-3 py-2">Poor pipework installation at contractor's cost</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cost overrun (variations)</td>
                      <td className="border border-white/10 px-3 py-2">Client</td>
                      <td className="border border-white/10 px-3 py-2">Client changes to BMS specification</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Programme</td>
                      <td className="border border-white/10 px-3 py-2">Shared</td>
                      <td className="border border-white/10 px-3 py-2">Design delays = client; construction delays = contractor</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Coordination errors</td>
                      <td className="border border-white/10 px-3 py-2">Designer/contractor</td>
                      <td className="border border-white/10 px-3 py-2">Clashes between services and structure</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                <p className="text-sm font-medium text-green-400 mb-2">Advantages for MEP</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Full design coordination before tender</li>
                  <li className="pl-1">Clear scope for competitive pricing</li>
                  <li className="pl-1">Client maintains design quality control</li>
                  <li className="pl-1">Specialist M&E input throughout design</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                <p className="text-sm font-medium text-red-400 mb-2">Disadvantages for MEP</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Longer overall programme</li>
                  <li className="pl-1">Limited contractor buildability input</li>
                  <li className="pl-1">Late discovery of installation issues</li>
                  <li className="pl-1">Adversarial if design incomplete</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Best suited for:</strong> Projects requiring high design quality and control - hospitals, laboratories, heritage buildings, and complex specialist installations.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Design and Build */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Design and Build Procurement
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Design and build places responsibility for both design and construction with a single
              contractor. The client prepares Employer's Requirements defining their needs, and
              contractors respond with Contractor's Proposals showing how they will meet those
              requirements.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Employer's Requirements for MEP</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Performance specification:</strong> Required temperatures, air change rates, lux levels</li>
                <li className="pl-1"><strong>Equipment standards:</strong> Minimum quality levels, approved manufacturers</li>
                <li className="pl-1"><strong>Energy targets:</strong> EPC rating, BREEAM requirements</li>
                <li className="pl-1"><strong>Design criteria:</strong> Room data sheets, load assumptions</li>
                <li className="pl-1"><strong>Standards compliance:</strong> BS, CIBSE, HTM requirements</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Novation of M&E Consultants</p>
              <p className="text-sm text-white mb-3">
                A common hybrid approach where the client's M&E consultant develops initial design,
                then is novated (transferred) to the D&B contractor post-contract:
              </p>
              <ol className="text-sm text-white space-y-1.5 list-decimal list-outside ml-5">
                <li className="pl-1">Client appoints M&E consultant to RIBA Stage 3</li>
                <li className="pl-1">Design forms part of Employer's Requirements</li>
                <li className="pl-1">D&B contractor appointed and consultant novated</li>
                <li className="pl-1">Contractor directs completion of Stages 4-5</li>
                <li className="pl-1">Design liability transfers to contractor</li>
              </ol>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Design and Build Variants</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Variant</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Client Design Input</th>
                      <th className="border border-white/10 px-3 py-2 text-left">MEP Implications</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Pure D&B</td>
                      <td className="border border-white/10 px-3 py-2">Output spec only</td>
                      <td className="border border-white/10 px-3 py-2">Contractor designs all MEP from scratch</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Develop & construct</td>
                      <td className="border border-white/10 px-3 py-2">Concept design</td>
                      <td className="border border-white/10 px-3 py-2">Contractor develops from Stage 2-3 design</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Enhanced D&B</td>
                      <td className="border border-white/10 px-3 py-2">Detailed design + novation</td>
                      <td className="border border-white/10 px-3 py-2">Near-complete design with novated team</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Contractor's Designed Portion</td>
                      <td className="border border-white/10 px-3 py-2">Most design by client</td>
                      <td className="border border-white/10 px-3 py-2">Only specified elements (often MEP) by contractor</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                <p className="text-sm font-medium text-green-400 mb-2">Advantages for MEP</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Single point of responsibility</li>
                  <li className="pl-1">Programme overlap - design and build concurrent</li>
                  <li className="pl-1">Contractor buildability input</li>
                  <li className="pl-1">Fixed price certainty (if ER clear)</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                <p className="text-sm font-medium text-red-400 mb-2">Disadvantages for MEP</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Reduced client design control post-contract</li>
                  <li className="pl-1">Value engineering may reduce quality</li>
                  <li className="pl-1">Variations expensive if ER ambiguous</li>
                  <li className="pl-1">Less competitive on complex specialist work</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Best suited for:</strong> Commercial projects with standard MEP requirements where programme and cost certainty are priorities - offices, retail, warehousing, standard residential.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Management Routes */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Management Contracting and Construction Management
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Management routes separate the coordination role from construction risk. A management
              entity is paid a fee to manage the project, whilst trade contractors carry out the
              actual construction work in discrete packages.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Management Contracting</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">MC holds subcontracts with trade contractors</li>
                  <li className="pl-1">MC takes some construction risk</li>
                  <li className="pl-1">Client has one main contract (with MC)</li>
                  <li className="pl-1">MC paid fee + reimbursable costs</li>
                  <li className="pl-1">Buffer between client and trades</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Construction Management</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Client holds direct contracts with trades</li>
                  <li className="pl-1">CM takes no construction risk</li>
                  <li className="pl-1">Multiple trade contracts to manage</li>
                  <li className="pl-1">CM paid management fee only</li>
                  <li className="pl-1">Maximum client control and risk</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">MEP Trade Packages (Typical)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Package</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Scope</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Coordination Priority</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Mechanical Package</td>
                      <td className="border border-white/10 px-3 py-2">HVAC, pipework, plant, insulation</td>
                      <td className="border border-white/10 px-3 py-2">Critical - largest services</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Electrical Package</td>
                      <td className="border border-white/10 px-3 py-2">Power, lighting, containment</td>
                      <td className="border border-white/10 px-3 py-2">High - interfaces with all trades</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Public Health</td>
                      <td className="border border-white/10 px-3 py-2">Drainage, water services</td>
                      <td className="border border-white/10 px-3 py-2">High - gravity constraints</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fire Protection</td>
                      <td className="border border-white/10 px-3 py-2">Sprinklers, detection, alarms</td>
                      <td className="border border-white/10 px-3 py-2">Medium - ceiling coordination</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">BMS/Controls</td>
                      <td className="border border-white/10 px-3 py-2">Controls, commissioning</td>
                      <td className="border border-white/10 px-3 py-2">Late - depends on others</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Lifts</td>
                      <td className="border border-white/10 px-3 py-2">Lift installation</td>
                      <td className="border border-white/10 px-3 py-2">Medium - shaft interfaces</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Coordination Challenge</p>
              <p className="text-sm text-white">
                Management routes require exceptional coordination between packages. Without a main
                contractor integrating MEP trades, the management entity or client must actively
                manage interfaces. Common issues include ductwork/pipework clashes, containment
                routing conflicts, and commissioning sequencing.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                <p className="text-sm font-medium text-green-400 mb-2">Advantages for MEP</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Early MEP contractor involvement possible</li>
                  <li className="pl-1">Design can evolve during construction</li>
                  <li className="pl-1">Direct client relationship (CM)</li>
                  <li className="pl-1">Specialist packages competitively tendered</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                <p className="text-sm font-medium text-red-400 mb-2">Disadvantages for MEP</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">No single point of MEP responsibility</li>
                  <li className="pl-1">Coordination gaps between packages</li>
                  <li className="pl-1">Cost uncertainty until all packages let</li>
                  <li className="pl-1">Client carries cost/programme risk (CM)</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Best suited for:</strong> Large complex projects with experienced clients - major headquarters, complex refurbishments, projects where flexibility is essential.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Two-Stage Tendering */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Two-Stage Tendering
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Two-stage tendering bridges the gap between competitive pricing and early contractor
              involvement. The contractor is appointed based on overheads and preliminaries (Stage 1),
              then works with the design team to develop and price the detailed works (Stage 2).
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Two-Stage Process</p>
              <div className="space-y-3">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-1">Stage 1: Contractor Selection</p>
                  <ul className="text-sm text-white/80 space-y-1 list-disc list-outside ml-5">
                    <li>Tender based on outline design and specification</li>
                    <li>Contractors price preliminaries, OH&P percentages</li>
                    <li>May include rates for measured work</li>
                    <li>Selection on price, track record, team quality</li>
                    <li>Pre-construction services agreement signed</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-1">Stage 2: Price Development</p>
                  <ul className="text-sm text-white/80 space-y-1 list-disc list-outside ml-5">
                    <li>Contractor joins design team meetings</li>
                    <li>Provides buildability and programming input</li>
                    <li>MEP subcontractors may be appointed early</li>
                    <li>Open-book pricing as packages tendered</li>
                    <li>Contract sum agreed when design complete</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">MEP Benefits of Two-Stage</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Benefit</th>
                      <th className="border border-white/10 px-3 py-2 text-left">How Achieved</th>
                      <th className="border border-white/10 px-3 py-2 text-left">MEP Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Buildability input</td>
                      <td className="border border-white/10 px-3 py-2">Contractor reviews design</td>
                      <td className="border border-white/10 px-3 py-2">Plantroom layout optimised for installation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Early coordination</td>
                      <td className="border border-white/10 px-3 py-2">3D model integration</td>
                      <td className="border border-white/10 px-3 py-2">Clashes resolved before site work</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Programme certainty</td>
                      <td className="border border-white/10 px-3 py-2">Contractor programmes early</td>
                      <td className="border border-white/10 px-3 py-2">Long-lead MEP plant ordered in time</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Market testing</td>
                      <td className="border border-white/10 px-3 py-2">Subcontract competition</td>
                      <td className="border border-white/10 px-3 py-2">Best MEP subcontractor prices obtained</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Value engineering</td>
                      <td className="border border-white/10 px-3 py-2">Collaborative cost review</td>
                      <td className="border border-white/10 px-3 py-2">Alternative systems evaluated with full team</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Real-World Example: Data Centre Two-Stage</p>
              <p className="text-sm text-white mb-3">
                A 10MW data centre project used two-stage tendering to manage technical complexity:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Stage 1:</strong> Contractor selected on 15% complete design, pricing preliminaries and margins</li>
                <li className="pl-1"><strong>Pre-construction:</strong> 6 months working with M&E consultant on cooling strategy, UPS specification</li>
                <li className="pl-1"><strong>Early packages:</strong> Generators and transformers ordered during Stage 2 (26-week lead)</li>
                <li className="pl-1"><strong>Stage 2 close:</strong> Contract sum fixed at 85% design, remaining works on schedule of rates</li>
                <li className="pl-1"><strong>Outcome:</strong> MEP coordination issues reduced by 40% compared to similar single-stage projects</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                <p className="text-sm font-medium text-green-400 mb-2">Advantages for MEP</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Early contractor expertise on complex M&E</li>
                  <li className="pl-1">Long-lead plant ordered earlier</li>
                  <li className="pl-1">Better coordination and fewer site clashes</li>
                  <li className="pl-1">Competitive subcontract prices</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                <p className="text-sm font-medium text-red-400 mb-2">Disadvantages for MEP</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Less price competition on main contract</li>
                  <li className="pl-1">Requires open-book trust</li>
                  <li className="pl-1">Stage 2 negotiations can be protracted</li>
                  <li className="pl-1">Risk of contractor withdrawal if price not agreed</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Best suited for:</strong> Complex MEP projects where early coordination is critical - data centres, hospitals, research facilities, complex refurbishments with tight programmes.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Comparison Summary */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Procurement Route Comparison</h2>

          <div className="overflow-x-auto mb-6">
            <table className="text-sm text-white w-full border-collapse">
              <thead>
                <tr className="bg-white/5">
                  <th className="border border-white/10 px-3 py-2 text-left">Factor</th>
                  <th className="border border-white/10 px-3 py-2 text-left">Traditional</th>
                  <th className="border border-white/10 px-3 py-2 text-left">D&B</th>
                  <th className="border border-white/10 px-3 py-2 text-left">Mgt Routes</th>
                  <th className="border border-white/10 px-3 py-2 text-left">Two-Stage</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-white/10 px-3 py-2 font-medium">Design control</td>
                  <td className="border border-white/10 px-3 py-2 text-green-400">High</td>
                  <td className="border border-white/10 px-3 py-2 text-orange-400">Low-Medium</td>
                  <td className="border border-white/10 px-3 py-2 text-green-400">High</td>
                  <td className="border border-white/10 px-3 py-2 text-green-400">High</td>
                </tr>
                <tr>
                  <td className="border border-white/10 px-3 py-2 font-medium">Cost certainty</td>
                  <td className="border border-white/10 px-3 py-2 text-green-400">High</td>
                  <td className="border border-white/10 px-3 py-2 text-green-400">High</td>
                  <td className="border border-white/10 px-3 py-2 text-red-400">Low</td>
                  <td className="border border-white/10 px-3 py-2 text-orange-400">Medium</td>
                </tr>
                <tr>
                  <td className="border border-white/10 px-3 py-2 font-medium">Programme speed</td>
                  <td className="border border-white/10 px-3 py-2 text-red-400">Slow</td>
                  <td className="border border-white/10 px-3 py-2 text-green-400">Fast</td>
                  <td className="border border-white/10 px-3 py-2 text-green-400">Fast</td>
                  <td className="border border-white/10 px-3 py-2 text-green-400">Fast</td>
                </tr>
                <tr>
                  <td className="border border-white/10 px-3 py-2 font-medium">Flexibility</td>
                  <td className="border border-white/10 px-3 py-2 text-red-400">Low</td>
                  <td className="border border-white/10 px-3 py-2 text-red-400">Low</td>
                  <td className="border border-white/10 px-3 py-2 text-green-400">High</td>
                  <td className="border border-white/10 px-3 py-2 text-orange-400">Medium</td>
                </tr>
                <tr>
                  <td className="border border-white/10 px-3 py-2 font-medium">Client risk</td>
                  <td className="border border-white/10 px-3 py-2 text-orange-400">Medium</td>
                  <td className="border border-white/10 px-3 py-2 text-green-400">Low</td>
                  <td className="border border-white/10 px-3 py-2 text-red-400">High</td>
                  <td className="border border-white/10 px-3 py-2 text-orange-400">Medium</td>
                </tr>
                <tr>
                  <td className="border border-white/10 px-3 py-2 font-medium">MEP coordination</td>
                  <td className="border border-white/10 px-3 py-2 text-orange-400">Design team</td>
                  <td className="border border-white/10 px-3 py-2 text-green-400">Contractor</td>
                  <td className="border border-white/10 px-3 py-2 text-red-400">Fragmented</td>
                  <td className="border border-white/10 px-3 py-2 text-green-400">Collaborative</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Selection Guidance for MEP Projects</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Choose Traditional When:</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Complex specialist M&E requiring detailed coordination (hospitals, labs)</li>
                <li className="pl-1">Client has strong in-house or consultant M&E expertise</li>
                <li className="pl-1">Quality and compliance are paramount over programme</li>
                <li className="pl-1">Budget allows for complete design before tender</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Choose Design and Build When:</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Standard MEP with well-defined performance requirements</li>
                <li className="pl-1">Programme and cost certainty are priorities</li>
                <li className="pl-1">Client prefers single point of responsibility</li>
                <li className="pl-1">Sufficient market competition exists</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Choose Two-Stage When:</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Complex MEP requiring early contractor input</li>
                <li className="pl-1">Long-lead plant items need early ordering</li>
                <li className="pl-1">Tight programme requires design/construction overlap</li>
                <li className="pl-1">Client values collaboration over adversarial tendering</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Pitfalls</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Incomplete Employer's Requirements:</strong> Leads to variations and disputes</li>
                <li className="pl-1"><strong>Late design changes:</strong> Expensive regardless of procurement route</li>
                <li className="pl-1"><strong>Poor coordination management:</strong> Critical in management routes</li>
                <li className="pl-1"><strong>Ignoring market conditions:</strong> Limited competition affects pricing</li>
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
                <p className="font-medium text-white mb-1">Procurement Routes</p>
                <ul className="space-y-0.5">
                  <li>Traditional - Client designs, contractor builds</li>
                  <li>D&B - Single point design and build responsibility</li>
                  <li>Management - Fee-based coordination of trades</li>
                  <li>Two-stage - Early involvement, staged pricing</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Considerations</p>
                <ul className="space-y-0.5">
                  <li>Risk allocation varies by route</li>
                  <li>MEP coordination responsibility differs</li>
                  <li>Programme overlap potential varies</li>
                  <li>Match route to project complexity</li>
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
            <Link to="../h-n-c-module5-section2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module5-section2-2">
              Next: Contract Types
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule5Section2_1;
