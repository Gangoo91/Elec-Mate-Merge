import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Subcontract Management - HNC Module 5 Section 2.4";
const DESCRIPTION = "Master subcontract management in building services: DOM/1 and DOM/2 subcontracts, back-to-back provisions, flow-down clauses, payment terms, programme obligations and subcontractor coordination.";

const quickCheckQuestions = [
  {
    id: "named-subcontractor",
    question: "What is a 'named' subcontractor in construction contracts?",
    options: ["A subcontractor chosen by the main contractor", "A subcontractor specified in the main contract by the client/designer", "An emergency replacement subcontractor", "A subcontractor with a registered company name"],
    correctIndex: 1,
    explanation: "A named subcontractor is one specifically identified in the main contract documents by the client or designer. The main contractor is expected to use them but retains responsibility for their performance."
  },
  {
    id: "back-to-back",
    question: "What does a 'back-to-back' subcontract clause achieve?",
    options: ["Allows the subcontractor to contract directly with the client", "Passes identical obligations and risks from main contract to subcontract", "Requires physical proximity of workers", "Links two separate projects together"],
    correctIndex: 1,
    explanation: "Back-to-back clauses mirror the main contract terms into the subcontract, passing down obligations, risks, and conditions so the subcontractor is bound by the same requirements as the main contractor."
  },
  {
    id: "pay-when-paid",
    question: "Under the Housing Grants, Construction and Regeneration Act 1996, pay-when-paid clauses are:",
    options: ["Always enforceable", "Unenforceable except where the payer is insolvent", "Only valid for contracts under £50,000", "Required in all subcontracts"],
    correctIndex: 1,
    explanation: "The Construction Act 1996 (as amended 2011) makes pay-when-paid clauses unenforceable except where the paying party is insolvent. Subcontractors have the right to regular staged payments regardless of main contract payment status."
  },
  {
    id: "flow-down",
    question: "Flow-down clauses in subcontracts are used to:",
    options: ["Specify water management responsibilities", "Transfer obligations from the main contract to subcontractors", "Define groundwater drainage requirements", "Establish payment flow timing"],
    correctIndex: 1,
    explanation: "Flow-down clauses transfer specific obligations from the main contract to subcontractors, ensuring compliance with client requirements, specifications, health and safety standards, and quality procedures throughout the supply chain."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the main difference between DOM/1 and DOM/2 subcontracts?",
    options: [
      "DOM/1 is for electrical work, DOM/2 for mechanical",
      "DOM/1 is for works subcontracts, DOM/2 for labour-only",
      "DOM/1 is newer than DOM/2",
      "DOM/1 is for domestic work, DOM/2 for commercial"
    ],
    correctAnswer: 1,
    explanation: "DOM/1 is designed for subcontracts where the subcontractor supplies materials and labour (works subcontracts), while DOM/2 is for labour-only subcontracts where the main contractor provides materials."
  },
  {
    id: 2,
    question: "A main contractor on a hospital M&E project must ensure their electrical subcontractor complies with NHS-specific requirements. Which mechanism achieves this?",
    options: ["Verbal instruction", "Flow-down clauses in the subcontract", "Separate client contract", "Insurance policy"],
    correctAnswer: 1,
    explanation: "Flow-down clauses incorporate the client's specific requirements from the main contract into the subcontract, ensuring the subcontractor is bound by NHS standards, infection control procedures, and commissioning protocols."
  },
  {
    id: 3,
    question: "An electrical subcontractor completes work on 15th March. Under the Construction Act, by when must they submit an application for payment?",
    options: [
      "Immediately upon completion",
      "By the date specified in the contract or a reasonable time before the due date",
      "Within 30 days of project completion",
      "Only when the main contractor receives payment"
    ],
    correctAnswer: 1,
    explanation: "The Construction Act requires payment application by the date specified in the contract. If not specified, applications should be submitted a reasonable time before the due date to allow the paying party to process the claim."
  },
  {
    id: 4,
    question: "What is the purpose of retention in subcontracts?",
    options: [
      "To delay payment indefinitely",
      "To provide security for remedying defects discovered after completion",
      "To fund the main contractor's overheads",
      "To penalise slow progress"
    ],
    correctAnswer: 1,
    explanation: "Retention (typically 3-5%) is held to provide the main contractor with funds to remedy any defects that become apparent during the defects liability period. Half is usually released at practical completion, half after the defects period."
  },
  {
    id: 5,
    question: "A building services subcontractor is instructed to work weekends to recover programme delay. Who is responsible for the additional costs if the delay was caused by late information from the main contractor?",
    options: [
      "The subcontractor bears their own costs",
      "The main contractor should compensate the subcontractor",
      "The client pays directly",
      "Costs are always shared equally"
    ],
    correctAnswer: 1,
    explanation: "When acceleration or additional working is required due to the main contractor's default (late information, access denial), the main contractor should compensate the subcontractor for additional costs incurred. Back-to-back provisions should allow the main contractor to recover from the client if applicable."
  },
  {
    id: 6,
    question: "What does 'contra-charging' mean in subcontract management?",
    options: [
      "Charging for work done by others",
      "Deducting costs from a subcontractor's payment for work they should have done or damage they caused",
      "Adding VAT to invoices",
      "Changing the contract sum"
    ],
    correctAnswer: 1,
    explanation: "Contra-charging is when the main contractor deducts costs from a subcontractor's payment, typically for remedial work the main contractor had to arrange because the subcontractor failed to complete or correct defective work. Proper notice and evidence is required."
  },
  {
    id: 7,
    question: "Which statement about subcontractor coordination meetings is correct?",
    options: [
      "They are optional social gatherings",
      "They should occur before work begins and regularly throughout the project",
      "Only the main contractor and client attend",
      "They are only required when problems occur"
    ],
    correctAnswer: 1,
    explanation: "Coordination meetings should begin in the pre-construction phase to resolve interface issues and continue regularly throughout the project. Attendance by all relevant trades ensures clash detection, sequencing agreement, and timely resolution of issues."
  },
  {
    id: 8,
    question: "An M&E subcontractor's work is delayed because the structural frame is 4 weeks late. What should the subcontractor do first?",
    options: [
      "Stop work and wait",
      "Submit a formal notice of delay and extension of time claim",
      "Leave the site permanently",
      "Complete unrelated work on another project"
    ],
    correctAnswer: 1,
    explanation: "The subcontractor should immediately submit formal written notice of the delay event and its impact on their programme. Timely notification is essential—most contracts require notice within a specified period (often 14-28 days) or claims may be barred."
  },
  {
    id: 9,
    question: "What information should a subcontractor's programme contain?",
    options: [
      "Only the start and finish dates",
      "Detailed activities, durations, dependencies, resource allocation and key milestones",
      "Just the contract sum breakdown",
      "Only the materials schedule"
    ],
    correctAnswer: 1,
    explanation: "A subcontractor's programme should show detailed work activities, durations, logic links/dependencies, resources, key milestones (access, testing, handover), and float. It must integrate with the main contractor's master programme."
  },
  {
    id: 10,
    question: "Under JCT subcontract terms, what is the typical notice period required before suspending work for non-payment?",
    options: [
      "Immediate suspension allowed",
      "7 days written notice after the final date for payment",
      "30 days notice",
      "No suspension right exists"
    ],
    correctAnswer: 1,
    explanation: "Under JCT and the Construction Act, if payment is not made by the final date, the subcontractor may suspend work after giving 7 days written notice. The right to suspend provides a powerful remedy whilst not being as drastic as termination."
  },
  {
    id: 11,
    question: "Which of the following is NOT typically included in a flow-down clause?",
    options: [
      "Health and safety requirements",
      "Quality management systems",
      "The main contractor's profit margin",
      "Programme obligations"
    ],
    correctAnswer: 2,
    explanation: "Flow-down clauses pass on technical requirements, programme obligations, H&S standards, quality systems, and client-specific requirements. The main contractor's profit margin is a commercial matter not passed to subcontractors."
  },
  {
    id: 12,
    question: "What is the primary purpose of subcontractor design submission reviews?",
    options: [
      "To delay the project",
      "To ensure designs comply with specifications and coordinate with other trades",
      "To transfer design liability entirely to the main contractor",
      "To increase paperwork"
    ],
    correctAnswer: 1,
    explanation: "Design submission reviews ensure subcontractor designs meet specification requirements, coordinate with architectural and other M&E elements, and identify clashes or issues before installation. This process is critical for building services coordination."
  }
];

const faqs = [
  {
    question: "What is the difference between a nominated and named subcontractor?",
    answer: "Nominated subcontractors (now rarely used in modern contracts) were selected by the client with the main contractor having limited control and special payment provisions applying. Named subcontractors are identified in tender documents but the main contractor enters into a direct subcontract and retains full responsibility for their performance. JCT 2016 no longer uses nomination; naming is the preferred approach where client input into subcontractor selection is desired."
  },
  {
    question: "Can a main contractor impose stricter terms on a subcontractor than exist in the main contract?",
    answer: "Yes, main contractors often seek to impose stricter terms, shorter notice periods, or additional obligations beyond the main contract. However, this creates risk—if the main contract only allows 28 days for claims but the subcontract requires 14 days, and the subcontractor gives 21 days notice, the main contractor may be left exposed. Best practice is true back-to-back provisions with identical timeframes."
  },
  {
    question: "How should subcontractor payment applications be processed?",
    answer: "Subcontractors should submit valuations by the agreed date, clearly showing work completed, materials on site, and variations. The main contractor reviews and issues a payment notice stating the sum due. If intending to pay less, a pay less notice with detailed breakdown is required. Payment must be made by the final date for payment. Under the Construction Act, the subcontractor can suspend work (after 7 days notice) if the final date passes without payment."
  },
  {
    question: "What coordination documents should building services subcontractors provide?",
    answer: "Building services subcontractors should provide: detailed installation programmes linked to the master programme; builders' work drawings showing holes, fixings, supports required; combined services drawings (now typically 3D BIM models) showing routing and clashes; testing and commissioning schedules; O&M manual contents; as-built drawing schedules. These should be submitted to agreed timescales for coordination review."
  },
  {
    question: "How are disputes between main contractors and subcontractors typically resolved?",
    answer: "Most subcontracts provide a dispute resolution hierarchy: first, project-level discussion between site teams; then senior management negotiation; followed by mediation or adjudication (which provides a binding interim decision within 28 days under the Construction Act); finally arbitration or litigation for final resolution. Adjudication is widely used as it is fast and relatively inexpensive, though parties can proceed to arbitration/litigation afterwards."
  },
  {
    question: "What insurance requirements apply to building services subcontractors?",
    answer: "Subcontractors typically require: Employers' Liability (minimum £5-10m, often £10m for major projects); Public Liability (£5-10m typical); Professional Indemnity if providing design services (£2-5m typical); and sometimes Contractors' All Risks or coverage under the main contractor's project policy. Insurance certificates should be verified before the subcontractor starts on site and maintained throughout the project and any warranty period."
  }
];

const HNCModule5Section2_4 = () => {
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
            <span>Module 5.2.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Subcontract Management
          </h1>
          <p className="text-white/80">
            DOM/1, DOM/2 subcontracts, back-to-back provisions, flow-down clauses and subcontractor coordination in building services
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>DOM/1:</strong> Works subcontract (labour + materials)</li>
              <li className="pl-1"><strong>DOM/2:</strong> Labour-only subcontract</li>
              <li className="pl-1"><strong>Back-to-back:</strong> Mirror main contract terms</li>
              <li className="pl-1"><strong>Pay-when-paid:</strong> Generally unenforceable in UK</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>M&E coordination:</strong> Multiple trade interfaces</li>
              <li className="pl-1"><strong>Design submissions:</strong> Review before installation</li>
              <li className="pl-1"><strong>Programme integration:</strong> Linked to main programme</li>
              <li className="pl-1"><strong>Retention:</strong> Typically 3-5% held</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Distinguish between DOM/1 and DOM/2 subcontract forms",
              "Understand back-to-back and flow-down clause mechanisms",
              "Apply Construction Act payment provisions to subcontracts",
              "Manage subcontractor coordination and programme integration",
              "Handle disputes, delay claims and contra-charges",
              "Ensure compliance with health, safety and quality flow-downs"
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

        {/* Section 1: Subcontract Types and Selection */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Subcontract Types and Selection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Building services work is almost always carried out by specialist subcontractors. The main
              contractor must select appropriate subcontract forms that protect their position whilst
              maintaining fair and workable relationships with the supply chain.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Named vs Domestic Subcontractors:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Named subcontractor:</strong> Specified in tender documents by client/designer; main contractor must use unless reasonable objection</li>
                <li className="pl-1"><strong>Domestic subcontractor:</strong> Selected entirely by main contractor with no client involvement</li>
                <li className="pl-1"><strong>Nominated (historic):</strong> Formal client selection with special payment provisions—now rarely used</li>
                <li className="pl-1"><strong>Key difference:</strong> Main contractor retains full responsibility for named subcontractors' performance</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Standard Subcontract Forms</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Form</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Use</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Key Features</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">JCT DOM/1</td>
                      <td className="border border-white/10 px-3 py-2">Works subcontracts (labour + materials)</td>
                      <td className="border border-white/10 px-3 py-2">Full subcontract with design provisions option</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">JCT DOM/2</td>
                      <td className="border border-white/10 px-3 py-2">Labour-only subcontracts</td>
                      <td className="border border-white/10 px-3 py-2">Main contractor supplies materials</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">JCT SBCSub</td>
                      <td className="border border-white/10 px-3 py-2">For use with SBC main contract</td>
                      <td className="border border-white/10 px-3 py-2">Standard Building Sub-Contract</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">NEC4 ECS</td>
                      <td className="border border-white/10 px-3 py-2">Engineering and Construction Subcontract</td>
                      <td className="border border-white/10 px-3 py-2">Collaborative, back-to-back with NEC4 ECC</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Bespoke forms</td>
                      <td className="border border-white/10 px-3 py-2">Main contractor's own terms</td>
                      <td className="border border-white/10 px-3 py-2">Often heavily amended in contractor's favour</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Building Services Scenario: Hospital M&E Package</p>
              <p className="text-sm text-white">
                A main contractor on a £45M hospital project subcontracts the M&E installation (£18M value) using
                DOM/1 with design portion supplement. The electrical subcontractor provides detailed design,
                procurement, installation, testing and commissioning. Flow-down clauses ensure compliance with
                HTM (Health Technical Memoranda) requirements, NHS infection control procedures, and
                commissioning to CIBSE Code M standards.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Selection principle:</strong> Choose subcontract forms that provide appropriate risk allocation whilst remaining fair—overly onerous terms may deter quality subcontractors or lead to disputes.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Back-to-Back and Flow-Down Clauses */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Back-to-Back and Flow-Down Clauses
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Back-to-back provisions ensure the subcontractor is bound by equivalent terms to those binding
              the main contractor. Flow-down clauses specifically transfer particular obligations from the
              main contract to subcontractors throughout the supply chain.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Back-to-Back Provisions</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Mirror main contract programme obligations</li>
                  <li className="pl-1">Equivalent notice periods for claims</li>
                  <li className="pl-1">Same defects liability period</li>
                  <li className="pl-1">Matching insurance requirements</li>
                  <li className="pl-1">Aligned extension of time provisions</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Flow-Down Requirements</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Health and safety requirements</li>
                  <li className="pl-1">Quality management systems (ISO 9001)</li>
                  <li className="pl-1">Environmental obligations</li>
                  <li className="pl-1">Client-specific procedures</li>
                  <li className="pl-1">BIM requirements and protocols</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Flow-Down Areas for Building Services</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Category</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Requirements</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Health & Safety</td>
                      <td className="border border-white/10 px-3 py-2">CDM compliance, site inductions, method statements, permit systems</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Quality</td>
                      <td className="border border-white/10 px-3 py-2">Inspection and test plans, witness points, non-conformance procedures</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Programme</td>
                      <td className="border border-white/10 px-3 py-2">Progress reporting, look-ahead schedules, delay notification</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Design</td>
                      <td className="border border-white/10 px-3 py-2">Submission schedules, coordination requirements, approval processes</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Documentation</td>
                      <td className="border border-white/10 px-3 py-2">O&M manuals, as-built drawings, warranties, training records</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Commissioning</td>
                      <td className="border border-white/10 px-3 py-2">CIBSE Code M compliance, witnessed tests, balancing reports</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Risk: Incomplete Back-to-Back</p>
              <p className="text-sm text-white">
                If the main contract requires 14 days notice for delay claims but the subcontract allows 28 days,
                the main contractor may receive late notice from the subcontractor but be time-barred from
                claiming against the client. Always ensure notice periods, limitation periods, and procedural
                requirements are truly back-to-back.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Best practice:</strong> Attach the relevant main contract sections as an appendix to the subcontract so requirements are clearly visible, not just referenced.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Payment Terms and Construction Act */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Payment Terms and Construction Act Compliance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Housing Grants, Construction and Regeneration Act 1996 (as amended 2011) provides statutory
              payment rights for construction contracts including subcontracts. Understanding these provisions
              is essential for effective subcontract management.
            </p>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Construction Act 1996 Key Requirements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Staged payments:</strong> Right to interim payments if contract exceeds 45 days</li>
                <li className="pl-1"><strong>Due date:</strong> Payment becomes due on a specified date</li>
                <li className="pl-1"><strong>Payment notice:</strong> Payer must issue notice stating sum due within 5 days of due date</li>
                <li className="pl-1"><strong>Pay less notice:</strong> If paying less than notified, must give notice with reasons</li>
                <li className="pl-1"><strong>Final date:</strong> Payment must be made by final date for payment</li>
                <li className="pl-1"><strong>Suspension:</strong> Right to suspend work for non-payment after 7 days notice</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Pay-When-Paid and Pay-When-Certified</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Pay-when-paid:</strong> Unenforceable except where the payer is insolvent</li>
                <li className="pl-1"><strong>Pay-when-certified:</strong> Also generally unenforceable—certification is not a precondition</li>
                <li className="pl-1"><strong>Practical effect:</strong> Subcontractors cannot be denied payment solely because main contractor hasn't been paid</li>
                <li className="pl-1"><strong>Exception:</strong> If the paying party (main contractor) becomes insolvent, pay-when-paid may apply</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Payment Timeline</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Event</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Timing</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Valuation date</td>
                      <td className="border border-white/10 px-3 py-2">Monthly (e.g., 25th of each month)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Application submission</td>
                      <td className="border border-white/10 px-3 py-2">By valuation date or 5 days before due date</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Due date</td>
                      <td className="border border-white/10 px-3 py-2">7 days after valuation date</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Payment notice required</td>
                      <td className="border border-white/10 px-3 py-2">Within 5 days of due date</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Pay less notice deadline</td>
                      <td className="border border-white/10 px-3 py-2">Minimum 7 days before final date</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Final date for payment</td>
                      <td className="border border-white/10 px-3 py-2">28-35 days after due date typically</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Retention Provisions</p>
              <p className="text-sm text-white mb-2">
                Retention provides security for defect correction. Typical arrangements:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Retention percentage: 3-5% of certified value</li>
                <li className="pl-1">First moiety (half) released at practical completion</li>
                <li className="pl-1">Second moiety released after defects liability period (typically 12 months)</li>
                <li className="pl-1">Retention bond may substitute for cash retention on larger projects</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Practical tip:</strong> Ensure payment applications are detailed, accurate and submitted on time. Poor applications delay payment and damage commercial relationships.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Coordination and Programme Integration */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Coordination and Programme Integration
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Building services coordination is critical to project success. Multiple M&E trades must work
              in confined spaces, often with complex sequencing requirements. Effective coordination prevents
              clashes, rework and delays.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Coordination Mechanisms</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Pre-start meeting:</strong> Establish interfaces, access requirements, coordination procedures</li>
                <li className="pl-1"><strong>Design coordination:</strong> Combined services drawings or BIM model coordination</li>
                <li className="pl-1"><strong>Weekly progress meetings:</strong> Monitor progress, resolve issues, plan ahead</li>
                <li className="pl-1"><strong>Look-ahead programmes:</strong> 3-4 week rolling programmes for detailed planning</li>
                <li className="pl-1"><strong>Clash detection:</strong> BIM-based or drawing overlay clash identification</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Programme Requirements</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Subcontractor programme must link to master programme</li>
                  <li className="pl-1">Show all activities, durations, dependencies</li>
                  <li className="pl-1">Include procurement lead times</li>
                  <li className="pl-1">Identify critical path activities</li>
                  <li className="pl-1">Show testing and commissioning periods</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Interface Management</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Define work boundaries clearly</li>
                  <li className="pl-1">Establish witness and hold points</li>
                  <li className="pl-1">Coordinate builders work requirements</li>
                  <li className="pl-1">Agree access and scaffold sharing</li>
                  <li className="pl-1">Coordinate isolation and testing</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Building Services Coordination Example</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Trade</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Coordination Issue</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Resolution</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Electrical vs Ductwork</td>
                      <td className="border border-white/10 px-3 py-2">Cable tray and duct routing clash in ceiling void</td>
                      <td className="border border-white/10 px-3 py-2">Combined services drawing review, agree levels</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fire Alarm vs Sprinklers</td>
                      <td className="border border-white/10 px-3 py-2">Detector and sprinkler head spacing conflicts</td>
                      <td className="border border-white/10 px-3 py-2">Joint layout with fire engineer approval</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Pipework vs Structure</td>
                      <td className="border border-white/10 px-3 py-2">Penetration locations clash with reinforcement</td>
                      <td className="border border-white/10 px-3 py-2">Early builders work drawing submission</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">All M&E vs Ceiling</td>
                      <td className="border border-white/10 px-3 py-2">Services depth exceeds ceiling void</td>
                      <td className="border border-white/10 px-3 py-2">Section studies, potential ceiling drop</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Delay and Claims Management</p>
              <p className="text-sm text-white mb-2">
                When delays occur, subcontractors must follow contractual procedures:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Notice:</strong> Submit written notice within contractual timeframe (often 14-28 days)</li>
                <li className="pl-1"><strong>Particulars:</strong> Provide detailed impact assessment with programme analysis</li>
                <li className="pl-1"><strong>Records:</strong> Maintain contemporaneous records (daily diaries, photos, correspondence)</li>
                <li className="pl-1"><strong>Mitigation:</strong> Demonstrate efforts to reduce delay impact</li>
                <li className="pl-1"><strong>Claim:</strong> Submit detailed claim with supporting evidence</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Coordination tip:</strong> Invest time in pre-construction coordination—resolving clashes on drawings costs a fraction of fixing them on site. Modern BIM tools can identify clashes automatically if models are properly maintained.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Back-to-Back Payment Provisions</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Main contract has 28-day payment terms from due date. How should the subcontract be structured?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Main Contract: Due date = valuation date + 7 days</p>
                <p>Main Contract: Final date = due date + 28 days</p>
                <p className="mt-2">Subcontract (back-to-back):</p>
                <p>Subcontract due date = main contract valuation date + 7 days</p>
                <p>Subcontract final date = due date + 28 days</p>
                <p className="mt-2 text-white/60">This ensures payment obligations flow through without the main contractor being "out of pocket"</p>
                <p className="mt-2 text-green-400">Key: Payment notice and pay less notice deadlines must also align</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Contra-Charge Procedure</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Electrical subcontractor fails to complete cable glanding, main contractor instructs another subcontractor to complete at a cost of £2,400.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Step 1: Issue formal notice requiring completion by date</p>
                <p>Step 2: If not completed, issue notice of intent to contra-charge</p>
                <p>Step 3: Arrange completion by others, documenting costs</p>
                <p>Step 4: Issue contra-charge notice with evidence:</p>
                <p className="ml-4">- Copy of instruction to complete</p>
                <p className="ml-4">- Photos showing incomplete work</p>
                <p className="ml-4">- Invoice from completing subcontractor</p>
                <p className="ml-4">- Deduction from next payment: £2,400</p>
                <p className="mt-2 text-red-400">Warning: Failing to follow procedure may make contra-charge unenforceable</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Delay Claim Flow-Through</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> M&E subcontractor delayed 6 weeks due to late steelwork. How do costs flow through the contractual chain?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Subcontractor's costs:</p>
                <p>- Prelims extension: 6 weeks × £3,500/week = £21,000</p>
                <p>- Labour disruption: £8,500</p>
                <p>- Plant standing time: £4,200</p>
                <p>- Total claim: <strong>£33,700</strong></p>
                <p className="mt-2">Subcontractor claims from main contractor under subcontract</p>
                <p>Main contractor includes in claim against client under main contract</p>
                <p className="mt-2 text-green-400">Back-to-back principle: Main contractor recovers from client and passes to subcontractor</p>
                <p className="mt-2 text-white/60">Note: Subcontractor must comply with notice requirements in subcontract</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Subcontract Review Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Scope clearly defined with exclusions listed</li>
                <li className="pl-1">Programme requirements and key dates specified</li>
                <li className="pl-1">Payment terms compliant with Construction Act</li>
                <li className="pl-1">Notice periods for claims and variations aligned with main contract</li>
                <li className="pl-1">Insurance requirements specified and adequate</li>
                <li className="pl-1">Design responsibility clearly allocated</li>
                <li className="pl-1">Flow-down requirements attached or referenced</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Retention: <strong>3-5%</strong> typical</li>
                <li className="pl-1">Suspension notice: <strong>7 days</strong> under Construction Act</li>
                <li className="pl-1">Pay less notice: minimum <strong>7 days</strong> before final date</li>
                <li className="pl-1">Adjudication decision: <strong>28 days</strong> from referral</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Relying on pay-when-paid</strong> — Unenforceable except insolvency</li>
                <li className="pl-1"><strong>Late delay notices</strong> — May bar entitlement entirely</li>
                <li className="pl-1"><strong>Incomplete back-to-back</strong> — Creates gaps in risk transfer</li>
                <li className="pl-1"><strong>Poor coordination records</strong> — Difficult to prove delay causes</li>
                <li className="pl-1"><strong>Ignoring flow-downs</strong> — Non-compliance can have serious consequences</li>
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
                <p className="font-medium text-white mb-1">Subcontract Forms</p>
                <ul className="space-y-0.5">
                  <li>DOM/1 - Works subcontract (labour + materials)</li>
                  <li>DOM/2 - Labour-only subcontract</li>
                  <li>NEC4 ECS - Collaborative, back-to-back with NEC</li>
                  <li>Always check Construction Act compliance</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Payment Rights</p>
                <ul className="space-y-0.5">
                  <li>Right to staged payments if &gt;45 days</li>
                  <li>Pay-when-paid unenforceable (except insolvency)</li>
                  <li>Suspension right after 7 days notice</li>
                  <li>Adjudication for rapid dispute resolution</li>
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
            <Link to="../h-n-c-module5-section2-5">
              Next: Contract Administration
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule5Section2_4;
