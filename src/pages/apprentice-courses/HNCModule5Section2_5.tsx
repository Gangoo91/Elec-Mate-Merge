import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Tendering Process - HNC Module 5 Section 2.5";
const DESCRIPTION = "Master the tendering process for building services contracts: ITT preparation, bid assembly, pricing strategies, tender evaluation, negotiation techniques, and contract award procedures.";

const quickCheckQuestions = [
  {
    id: "itt-purpose",
    question: "What is the primary purpose of an Invitation to Tender (ITT)?",
    options: ["To negotiate prices with a single contractor", "To invite contractors to submit competitive bids for defined work", "To award contracts without competition", "To finalise contract terms after selection"],
    correctIndex: 1,
    explanation: "An ITT formally invites contractors to submit competitive bids for a clearly defined scope of work, enabling the client to compare offerings and select the most suitable contractor."
  },
  {
    id: "tender-compliance",
    question: "What happens if a tender submission fails to meet a mandatory compliance requirement?",
    options: ["It receives a lower score", "It may be rejected without further evaluation", "It automatically wins if cheapest", "The client must request clarification"],
    correctIndex: 1,
    explanation: "Non-compliant tenders that fail mandatory requirements may be rejected outright without further evaluation. Compliance with ITT requirements is essential for tender validity."
  },
  {
    id: "letter-of-intent",
    question: "A Letter of Intent (LOI) in tendering:",
    options: ["Is the same as a signed contract", "Indicates intention to award but is not a binding contract", "Requires full project completion", "Cannot be issued before contract award"],
    correctIndex: 1,
    explanation: "A Letter of Intent indicates the client's intention to award a contract and may authorise limited preliminary works, but it is not a fully binding contract until formal execution."
  },
  {
    id: "evaluation-criteria",
    question: "In public sector procurement, tender evaluation criteria must be:",
    options: ["Kept confidential until after award", "Published in advance with weightings", "Changed during evaluation if needed", "Based solely on lowest price"],
    correctIndex: 1,
    explanation: "Public sector procurement requires transparency. Evaluation criteria and weightings must be published in advance in the ITT documents, and evaluators must assess bids consistently against these stated criteria."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which document typically forms the basis of the tender submission in building services contracts?",
    options: [
      "The contractor's standard price list",
      "Bills of Quantities or Schedule of Rates",
      "Previous project quotations",
      "Industry benchmark costs"
    ],
    correctAnswer: 1,
    explanation: "Bills of Quantities (BoQ) or Schedule of Rates provide a structured pricing document that contractors complete. This ensures all bidders price the same scope and enables fair comparison."
  },
  {
    id: 2,
    question: "What is 'front-loading' in tender pricing?",
    options: [
      "Including all costs at the start of the schedule",
      "Pricing early activities higher to improve cash flow",
      "Submitting the tender before the deadline",
      "Adding contingencies to the first section"
    ],
    correctAnswer: 1,
    explanation: "Front-loading involves pricing early project activities higher than their true cost to improve cash flow through early valuations. This practice is often scrutinised during tender evaluation."
  },
  {
    id: 3,
    question: "During a tender interview, the evaluation panel typically assesses:",
    options: [
      "Only the written submission",
      "Key personnel, methodology, and understanding of the project",
      "Previous client relationships exclusively",
      "Financial accounts only"
    ],
    correctAnswer: 1,
    explanation: "Tender interviews allow the evaluation panel to assess the proposed key personnel, technical approach, project understanding, and the contractor's ability to deliver beyond what's written in the submission."
  },
  {
    id: 4,
    question: "A two-envelope tender system separates:",
    options: [
      "Original and copy submissions",
      "Technical/quality submission from commercial/price submission",
      "Health and safety from environmental documents",
      "References from CVs"
    ],
    correctAnswer: 1,
    explanation: "The two-envelope system separates technical/quality submissions from commercial submissions. Technical envelopes are evaluated first without knowledge of price, ensuring quality assessment is not influenced by cost."
  },
  {
    id: 5,
    question: "Under UK public procurement regulations, the standstill period before contract award is typically:",
    options: [
      "5 calendar days",
      "10 calendar days minimum",
      "30 calendar days",
      "No standstill is required"
    ],
    correctAnswer: 1,
    explanation: "The 'Alcatel' standstill period under UK public procurement regulations is a minimum of 10 calendar days (15 days if notification by post) between notifying tenderers of the award decision and signing the contract."
  },
  {
    id: 6,
    question: "What is the purpose of tender clarification questions during the bidding period?",
    options: [
      "To negotiate prices before submission",
      "To seek clarity on ITT requirements without gaining unfair advantage",
      "To change the scope of work",
      "To extend the submission deadline"
    ],
    correctAnswer: 1,
    explanation: "Clarification questions allow bidders to seek clarity on ITT requirements. Responses to questions of general relevance are typically circulated to all bidders to maintain fairness."
  },
  {
    id: 7,
    question: "A contractor's tender programme should demonstrate:",
    options: [
      "Only the contract duration",
      "Logical sequencing, resource allocation, and key milestones",
      "Previous project timescales",
      "Generic construction phases"
    ],
    correctAnswer: 1,
    explanation: "A tender programme should demonstrate logical sequencing of activities, realistic resource allocation, critical path analysis, key milestones, and how the contractor will achieve practical completion."
  },
  {
    id: 8,
    question: "In Most Economically Advantageous Tender (MEAT) evaluation, the winning bid is:",
    options: [
      "Always the lowest price",
      "The highest quality regardless of price",
      "The best combination of price and quality per stated criteria",
      "Selected randomly from compliant bids"
    ],
    correctAnswer: 2,
    explanation: "MEAT evaluation considers both price and quality factors according to published weightings (e.g., 60% quality, 40% price). The winning bid offers the best overall value, not necessarily the lowest price."
  },
  {
    id: 9,
    question: "What is typically included in a tender method statement for electrical installation?",
    options: [
      "Only the equipment specifications",
      "Installation sequence, testing procedures, coordination, and quality assurance",
      "Previous project photographs",
      "Standard manufacturer instructions"
    ],
    correctAnswer: 1,
    explanation: "A method statement describes how the work will be executed: installation sequence, coordination with other trades, testing and commissioning procedures, quality assurance measures, and health and safety arrangements."
  },
  {
    id: 10,
    question: "Post-tender negotiation is typically permitted to:",
    options: [
      "Reduce the price below other bidders",
      "Clarify scope, refine details, and agree final terms without fundamentally changing the tender",
      "Change all specifications after evaluation",
      "Allow non-compliant bidders to resubmit"
    ],
    correctAnswer: 1,
    explanation: "Post-tender negotiation allows clarification of scope details, refinement of programme, and agreement of final contract terms. However, fundamental changes to scope or price that would disadvantage other bidders are not permitted."
  },
  {
    id: 11,
    question: "A tender bond or bid bond protects the client against:",
    options: [
      "Price increases during construction",
      "The contractor withdrawing their bid after submission",
      "Poor workmanship",
      "Late project completion"
    ],
    correctAnswer: 1,
    explanation: "A tender bond is a financial guarantee that the contractor will not withdraw their bid during the tender validity period. If they withdraw, the bond may be forfeit to compensate the client for re-tendering costs."
  },
  {
    id: 12,
    question: "Pre-qualification questionnaires (PQQs) are used to:",
    options: [
      "Select the winning contractor",
      "Screen contractors before ITT stage to create a shortlist",
      "Negotiate contract terms",
      "Finalise the scope of work"
    ],
    correctAnswer: 1,
    explanation: "PQQs assess contractor capability, experience, financial standing, and compliance before issuing the ITT. This creates a shortlist of qualified contractors capable of delivering the project."
  }
];

const faqs = [
  {
    question: "How long should a tender validity period be for building services contracts?",
    answer: "Tender validity periods are typically 90-120 days for building services contracts. This allows time for evaluation, clarification, negotiation, and contract preparation. Contractors should factor this period into their pricing as material costs and resource availability may change. Longer validity periods may require price adjustment mechanisms."
  },
  {
    question: "What makes an effective tender submission for electrical installation work?",
    answer: "An effective tender submission is compliant with all ITT requirements, clearly structured, and demonstrates understanding of the project. It includes competitive but realistic pricing, a credible programme, relevant experience and CVs of key personnel, detailed method statements, and evidence of quality management. Generic responses score poorly - tailor everything to the specific project."
  },
  {
    question: "Can tender prices be negotiated after submission?",
    answer: "Limited post-tender negotiation may occur with the preferred bidder to clarify scope, refine details, and agree final terms. However, in public procurement, negotiations that fundamentally change the tender (scope reduction to lower price, cherry-picking elements from different bids) are not permitted as this would breach fair competition principles."
  },
  {
    question: "What is the difference between open and selective tendering?",
    answer: "Open tendering allows any contractor meeting basic criteria to submit a bid - common in public sector. Selective (or restricted) tendering invites only pre-qualified contractors to bid - typical in private sector. Selective tendering reduces evaluation effort and ensures all bidders are capable, but may limit competition. Negotiated tendering with a single contractor is used for specialist work or emergency situations."
  },
  {
    question: "How are tender submissions evaluated and scored?",
    answer: "Tenders are evaluated against published criteria with assigned weightings. Technical/quality criteria (methodology, experience, personnel, programme) are typically scored 0-10 by multiple evaluators, with scores moderated for consistency. Price is usually scored with the lowest valid price receiving maximum points and others scored proportionally. Final scores combine quality and price scores per the stated weighting (e.g., 60:40)."
  },
  {
    question: "What should contractors do if they discover an error in their tender after submission?",
    answer: "If a genuine error is discovered after submission but before the deadline, contact the client immediately to request withdrawal and resubmission if permitted. After the deadline, notify the client of arithmetical errors (which may be corrected) versus pricing errors (which typically cannot). Withdrawing a tender may forfeit any tender bond. Always implement robust checking procedures before submission to minimise errors."
  }
];

const HNCModule5Section2_5 = () => {
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
            <span>Module 5.2.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Tendering Process
          </h1>
          <p className="text-white/80">
            Invitation to tender, bid preparation, evaluation criteria, negotiation strategies, and contract award procedures
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>ITT:</strong> Formal invitation with scope, terms, and evaluation criteria</li>
              <li className="pl-1"><strong>Bid preparation:</strong> Compliant submission demonstrating capability and value</li>
              <li className="pl-1"><strong>Evaluation:</strong> MEAT criteria balancing quality and price</li>
              <li className="pl-1"><strong>Award:</strong> Standstill period, LOI, then formal contract</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>M&E packages:</strong> Often 30-40% of building cost</li>
              <li className="pl-1"><strong>Typical weighting:</strong> 60% quality, 40% price</li>
              <li className="pl-1"><strong>Tender period:</strong> 4-8 weeks for complex projects</li>
              <li className="pl-1"><strong>Validity:</strong> 90-120 days standard</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand the complete tendering cycle from ITT to contract award",
              "Prepare compliant and competitive tender submissions",
              "Apply effective pricing strategies for building services work",
              "Analyse tender evaluation criteria and scoring methodologies",
              "Navigate post-tender interviews and negotiations",
              "Manage the contract award process including Letters of Intent"
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

        {/* Section 1: Invitation to Tender */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Invitation to Tender (ITT)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Invitation to Tender is the formal document package issued to contractors inviting them
              to submit competitive bids for defined work. A well-structured ITT ensures all bidders have
              equal information and submit comparable proposals.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">ITT Document Contents:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Instructions to tenderers:</strong> Submission requirements, deadline, format, and process</li>
                <li className="pl-1"><strong>Form of tender:</strong> The offer document contractors sign and submit</li>
                <li className="pl-1"><strong>Conditions of contract:</strong> JCT, NEC, or bespoke terms</li>
                <li className="pl-1"><strong>Specification:</strong> Technical requirements and standards</li>
                <li className="pl-1"><strong>Drawings:</strong> Design information and layout drawings</li>
                <li className="pl-1"><strong>Bills of Quantities/Schedule of Rates:</strong> Pricing document</li>
                <li className="pl-1"><strong>Evaluation criteria:</strong> How submissions will be assessed</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Tendering Routes</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Route</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Description</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Use</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Open</td>
                      <td className="border border-white/10 px-3 py-2">Advertised publicly, any contractor may bid</td>
                      <td className="border border-white/10 px-3 py-2">Public sector, maximum competition</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Selective</td>
                      <td className="border border-white/10 px-3 py-2">Pre-qualified shortlist invited to bid</td>
                      <td className="border border-white/10 px-3 py-2">Private sector, complex projects</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Negotiated</td>
                      <td className="border border-white/10 px-3 py-2">Single contractor negotiation</td>
                      <td className="border border-white/10 px-3 py-2">Specialist work, repeat business</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Framework</td>
                      <td className="border border-white/10 px-3 py-2">Pre-agreed terms, mini-competition</td>
                      <td className="border border-white/10 px-3 py-2">Public sector programmes</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Building Services Example: Hospital M&E ITT</p>
              <p className="text-sm text-white/90">
                A new hospital wing requires M&E services worth approximately £12M. The ITT package includes:
                RIBA Stage 4 drawings, NRM2 Bills of Quantities, NEC4 Option A conditions, 6-week tender period,
                two-envelope submission (technical and commercial separate), mandatory site visit, and MEAT
                evaluation with 60% quality/40% price weighting. Contractors must demonstrate NHS experience
                and HTM compliance capability.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key principle:</strong> The ITT must provide sufficient information for contractors to price accurately. Ambiguity leads to inflated risk pricing or disputes later.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Bid Preparation and Pricing */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Bid Preparation and Pricing Strategies
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Successful tender preparation requires systematic analysis of the ITT, realistic pricing,
              and compelling quality submissions that demonstrate understanding and capability.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Bid Assembly Checklist</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Compliance matrix against ITT requirements</li>
                  <li className="pl-1">Fully completed pricing document</li>
                  <li className="pl-1">Method statements and programme</li>
                  <li className="pl-1">Key personnel CVs</li>
                  <li className="pl-1">Relevant experience and references</li>
                  <li className="pl-1">Health and safety documentation</li>
                  <li className="pl-1">Quality management procedures</li>
                  <li className="pl-1">Signed form of tender</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Pricing Components</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Direct labour costs (site and supervision)</li>
                  <li className="pl-1">Material costs with procurement strategy</li>
                  <li className="pl-1">Plant and equipment</li>
                  <li className="pl-1">Subcontractor packages</li>
                  <li className="pl-1">Preliminaries (site setup, management)</li>
                  <li className="pl-1">Overheads and profit margin</li>
                  <li className="pl-1">Risk allowances</li>
                  <li className="pl-1">Design fees if design-build</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Pricing Strategies</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Strategy</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Approach</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Risk/Benefit</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Competitive</td>
                      <td className="border border-white/10 px-3 py-2">Tight margins to win work</td>
                      <td className="border border-white/10 px-3 py-2">Higher win rate, lower profit, variation reliance</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Balanced</td>
                      <td className="border border-white/10 px-3 py-2">Fair price with reasonable margin</td>
                      <td className="border border-white/10 px-3 py-2">Sustainable profitability, moderate win rate</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Front-loaded</td>
                      <td className="border border-white/10 px-3 py-2">Higher prices in early activities</td>
                      <td className="border border-white/10 px-3 py-2">Improved cash flow, scrutinised by clients</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Value-based</td>
                      <td className="border border-white/10 px-3 py-2">Emphasis on quality and capability</td>
                      <td className="border border-white/10 px-3 py-2">Best for MEAT evaluation with high quality weighting</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Building Services Example: Commercial Office Tender</p>
              <p className="text-sm text-white/90">
                An electrical contractor prepares a £2.4M tender for a commercial office fit-out. The pricing
                breakdown: Labour 35% (£840k), Materials 40% (£960k), Plant 5% (£120k), Preliminaries 12%
                (£288k), Overheads 5% (£120k), Profit 3% (£72k). The contractor front-loads containment
                installation to improve cash flow but keeps rates within 15% of market norms to avoid rejection.
                Risk allowance of 2% is included for design development.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Best practice:</strong> Build the estimate from first principles, then review against benchmarks. Avoid copying previous tender rates without analysis.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Tender Evaluation */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Tender Evaluation and Interviews
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Tender evaluation follows a structured process to ensure fair and consistent assessment.
              Understanding evaluation methodology helps contractors optimise their submissions.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">MEAT Evaluation Process</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Stage 1:</strong> Compliance check - mandatory pass/fail requirements</li>
                <li className="pl-1"><strong>Stage 2:</strong> Technical/quality scoring by evaluation panel</li>
                <li className="pl-1"><strong>Stage 3:</strong> Commercial analysis and price scoring</li>
                <li className="pl-1"><strong>Stage 4:</strong> Combined weighted score calculation</li>
                <li className="pl-1"><strong>Stage 5:</strong> Moderation and consensus meeting</li>
                <li className="pl-1"><strong>Stage 6:</strong> Tender interviews (if required)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Evaluation Criteria and Weightings</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Criterion</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Weight</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Assessment Areas</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Technical approach</td>
                      <td className="border border-white/10 px-3 py-2">20-25%</td>
                      <td className="border border-white/10 px-3 py-2">Method statements, innovation, coordination</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Experience</td>
                      <td className="border border-white/10 px-3 py-2">10-15%</td>
                      <td className="border border-white/10 px-3 py-2">Similar projects, sector knowledge, references</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Personnel</td>
                      <td className="border border-white/10 px-3 py-2">10-15%</td>
                      <td className="border border-white/10 px-3 py-2">Key staff CVs, qualifications, availability</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Programme</td>
                      <td className="border border-white/10 px-3 py-2">10-15%</td>
                      <td className="border border-white/10 px-3 py-2">Realistic sequencing, milestones, resources</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Price</td>
                      <td className="border border-white/10 px-3 py-2">30-50%</td>
                      <td className="border border-white/10 px-3 py-2">Competitiveness, completeness, value</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Price Scoring Formula (Common Method)</p>
              <p className="font-mono text-center text-lg mb-2">Price Score = (Lowest Price / Tender Price) x Maximum Points</p>
              <p className="text-xs text-white/70 text-center">Example: Lowest bid £1.8M, your bid £2.0M, max points 40. Score = (1.8/2.0) x 40 = 36 points</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Tender Interview Preparation</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Ensure proposed personnel attend - substitutes score poorly</li>
                <li className="pl-1">Prepare a brief presentation if permitted</li>
                <li className="pl-1">Know the project inside out - visit the site</li>
                <li className="pl-1">Anticipate technical questions on methodology</li>
                <li className="pl-1">Be ready to discuss risk management approach</li>
                <li className="pl-1">Demonstrate understanding of client priorities</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Interview tip:</strong> The interview assesses the people, not the paperwork. Confidence, technical competence, and rapport with the client team often differentiate shortlisted bidders.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Negotiation and Contract Award */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Negotiation and Contract Award
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Following evaluation, the preferred bidder enters post-tender negotiation before formal
              contract award. Understanding this process and the legal framework ensures smooth transition
              from tender to contract.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Post-Tender Negotiation Scope</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-green-400 mb-2">Permitted</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>Clarifying scope ambiguities</li>
                    <li>Refining programme details</li>
                    <li>Agreeing payment terms</li>
                    <li>Confirming key personnel</li>
                    <li>Discussing value engineering options</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-red-400 mb-2">Not Permitted</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>Fundamental scope changes</li>
                    <li>Cherry-picking from other bids</li>
                    <li>Price reduction without scope change</li>
                    <li>Changing published evaluation criteria</li>
                    <li>Reopening competition with others</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Contract Award Process</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Stage</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Action</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Award decision</td>
                      <td className="border border-white/10 px-3 py-2">Evaluation complete, preferred bidder selected</td>
                      <td className="border border-white/10 px-3 py-2">-</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Standstill notification</td>
                      <td className="border border-white/10 px-3 py-2">All tenderers informed of decision</td>
                      <td className="border border-white/10 px-3 py-2">Day 0</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Standstill period</td>
                      <td className="border border-white/10 px-3 py-2">Opportunity for challenge (public sector)</td>
                      <td className="border border-white/10 px-3 py-2">10+ calendar days</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Letter of Intent</td>
                      <td className="border border-white/10 px-3 py-2">Authorises preliminary works if urgent</td>
                      <td className="border border-white/10 px-3 py-2">Optional</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Contract execution</td>
                      <td className="border border-white/10 px-3 py-2">Formal signing and exchange</td>
                      <td className="border border-white/10 px-3 py-2">After standstill</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Letter of Intent - Key Considerations</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">LOI is not a contract - it indicates intention to award</li>
                <li className="pl-1">Typically caps liability to a specified sum (e.g., £50,000)</li>
                <li className="pl-1">Work under LOI is at contractor's risk if contract not concluded</li>
                <li className="pl-1">Ensure LOI specifies scope of authorised work clearly</li>
                <li className="pl-1">Formal contract should follow within 2-4 weeks maximum</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Building Services Example: Retail Fit-Out Award</p>
              <p className="text-sm text-white/90">
                An M&E contractor wins a £1.6M retail fit-out tender. The client issues a Letter of Intent
                capped at £75,000 to enable long-lead equipment ordering and design development while the
                NEC4 contract is finalised. The LOI specifies: ordering of distribution boards (8-week lead),
                detailed coordination drawings, and attendance at two design meetings. The contractor mobilises
                but limits exposure to the LOI cap until formal contract execution three weeks later.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Legal principle:</strong> Never exceed the LOI cap value. If the contract fails to materialise, recovering costs beyond the cap is extremely difficult.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: MEAT Score Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Calculate the total MEAT score for Contractor A. Evaluation weighting: Quality 60%, Price 40%. Quality score: 72/100. Tender price: £2.2M. Lowest price: £1.9M.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Quality Score = (72/100) x 60 = <strong>43.2 points</strong></p>
                <p className="mt-2">Price Score = (1.9M / 2.2M) x 40 = <strong>34.5 points</strong></p>
                <p className="mt-2">Total MEAT Score = 43.2 + 34.5 = <strong>77.7 points</strong></p>
                <p className="mt-2 text-white/60">Compare against other bidders to determine ranking</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Tender Pricing Build-Up</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> An electrical contractor prices a data centre installation. Direct costs total £3.2M. Calculate the tender price using standard mark-ups.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Direct costs: £3,200,000</p>
                <p>Preliminaries (15%): £480,000</p>
                <p>Subtotal: £3,680,000</p>
                <p className="mt-2">Overheads (6%): £220,800</p>
                <p>Risk allowance (3%): £110,400</p>
                <p>Profit (4%): £147,200</p>
                <p className="mt-2">Tender Price: <strong>£4,158,400</strong></p>
                <p className="text-white/60 mt-2">Margin on direct costs: 30% (competitive for specialist work)</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Standstill Period Timeline</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A public sector client issues award notification on Monday 5th January. When is the earliest date for contract signature?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Award notification: Monday 5th January (Day 0)</p>
                <p>Standstill period: 10 calendar days minimum</p>
                <p>Standstill ends: Thursday 15th January</p>
                <p className="mt-2">Earliest contract signature: <strong>Friday 16th January</strong></p>
                <p className="mt-2 text-white/60">Note: If notification by post, extend to 15 days (20th January)</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Tender Submission Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Verify all mandatory documents are included</li>
                <li className="pl-1">Check pricing document is complete with no blank cells</li>
                <li className="pl-1">Ensure form of tender is signed by authorised person</li>
                <li className="pl-1">Review submission against compliance matrix</li>
                <li className="pl-1">Submit before deadline - late submissions rejected</li>
                <li className="pl-1">Keep copies of all submitted documents</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Tender validity: <strong>90-120 days</strong></li>
                <li className="pl-1">Standstill period: <strong>10 calendar days</strong> (public sector)</li>
                <li className="pl-1">Typical quality:price weighting: <strong>60:40</strong></li>
                <li className="pl-1">M&E as percentage of building cost: <strong>30-40%</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Non-compliance:</strong> Missing mandatory requirements means rejection</li>
                <li className="pl-1"><strong>Generic responses:</strong> Tailor every submission to the specific project</li>
                <li className="pl-1"><strong>Pricing errors:</strong> Implement thorough checking procedures</li>
                <li className="pl-1"><strong>Late submission:</strong> Deadlines are absolute - build in contingency</li>
                <li className="pl-1"><strong>Exceeding LOI cap:</strong> Never commit beyond authorised value</li>
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
                <p className="font-medium text-white mb-1">Tendering Process</p>
                <ul className="space-y-0.5">
                  <li>ITT issued with full documentation</li>
                  <li>Clarification questions during tender period</li>
                  <li>Submission by deadline (no exceptions)</li>
                  <li>Evaluation per published criteria</li>
                  <li>Standstill, LOI, contract award</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">MEAT Evaluation</p>
                <ul className="space-y-0.5">
                  <li>Quality: methodology, experience, personnel</li>
                  <li>Price: competitiveness vs lowest bid</li>
                  <li>Combined weighted score determines winner</li>
                  <li>Interview may adjust final ranking</li>
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
              Back to Section 2
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module5-section2-6">
              Next: Contract Administration
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule5Section2_5;
