import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "JCT Contracts - HNC Module 5 Section 2.2";
const DESCRIPTION = "Master JCT contract forms for building services: SBC, DB, and ICD contracts, key subcontractor clauses, extensions of time, loss and expense claims, practical completion, and defects liability periods.";

const quickCheckQuestions = [
  {
    id: "jct-sbc-purpose",
    question: "What is the primary purpose of the JCT Standard Building Contract (SBC)?",
    options: ["For small domestic works", "For traditionally procured projects with full design by the employer", "For design and build projects", "For management contracting"],
    correctIndex: 1,
    explanation: "The JCT SBC is used for traditionally procured projects where the employer provides full design information through an architect or contract administrator. The contractor builds to the design provided."
  },
  {
    id: "eot-requirement",
    question: "What must a contractor do to claim an extension of time under JCT contracts?",
    options: ["Simply inform the client verbally", "Give written notice to the contract administrator as soon as delay becomes apparent", "Wait until the project is complete", "Only claim if the delay exceeds one month"],
    correctIndex: 1,
    explanation: "Under JCT contracts, the contractor must give written notice to the contract administrator as soon as delay becomes apparent, specifying the relevant event causing the delay."
  },
  {
    id: "practical-completion",
    question: "What does practical completion mean under JCT contracts?",
    options: ["100% of all work finished with no defects", "Work substantially complete and fit for occupation", "Final certificate issued", "All snagging items resolved"],
    correctIndex: 1,
    explanation: "Practical completion means the works are substantially complete and fit for the employer's intended use, even if minor defects remain. It triggers release of half the retention and starts the defects liability period."
  },
  {
    id: "defects-period",
    question: "What is the typical defects liability period under JCT contracts?",
    options: ["3 months", "6 months", "12 months", "24 months"],
    correctIndex: 2,
    explanation: "The standard defects liability period (now called rectification period) under JCT contracts is 12 months from practical completion, during which the contractor must rectify defects at their own cost."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which JCT contract form is most appropriate for a project where the contractor takes on design responsibility?",
    options: [
      "JCT Standard Building Contract (SBC)",
      "JCT Design and Build Contract (DB)",
      "JCT Intermediate Building Contract (ICD)",
      "JCT Minor Works Contract (MW)"
    ],
    correctAnswer: 1,
    explanation: "The JCT Design and Build Contract (DB) is specifically designed for projects where the contractor is responsible for both design and construction, taking on design liability."
  },
  {
    id: 2,
    question: "Under JCT contracts, who is responsible for issuing the extension of time decision?",
    options: ["The employer directly", "The contractor's project manager", "The contract administrator or architect", "The quantity surveyor"],
    correctAnswer: 2,
    explanation: "The contract administrator (or architect under SBC) is responsible for granting or refusing extensions of time, acting fairly between the parties."
  },
  {
    id: 3,
    question: "A relevant event under JCT contracts does NOT include:",
    options: [
      "Exceptionally adverse weather conditions",
      "Late design information from the employer",
      "The contractor's own poor planning",
      "Changes instructed by the contract administrator"
    ],
    correctAnswer: 2,
    explanation: "The contractor's own failures, delays, or poor planning are not relevant events. Only events beyond the contractor's control listed in the contract qualify for extension of time."
  },
  {
    id: 4,
    question: "What percentage of retention is typically released at practical completion under JCT contracts?",
    options: ["25%", "50%", "75%", "100%"],
    correctAnswer: 1,
    explanation: "At practical completion, 50% of the retention fund is released to the contractor. The remaining 50% is held until the end of the defects liability period and issue of the final certificate."
  },
  {
    id: 5,
    question: "Loss and expense claims under JCT contracts are intended to compensate for:",
    options: [
      "Any contractor losses on the project",
      "Direct loss and expense caused by relevant matters",
      "Profit loss due to market changes",
      "Inflation on material costs"
    ],
    correctAnswer: 1,
    explanation: "Loss and expense claims compensate for direct loss and/or expense caused by specific relevant matters listed in the contract, such as late information or variations. Claims must be substantiated."
  },
  {
    id: 6,
    question: "The JCT Intermediate Building Contract (ICD) is most suitable for:",
    options: [
      "Large complex projects over 50 million pounds",
      "Simple straightforward building works",
      "Medium complexity projects with nominated subcontractors",
      "Projects involving specialist engineering works"
    ],
    correctAnswer: 2,
    explanation: "The ICD is designed for medium-sized projects of moderate complexity, where the full administrative procedures of SBC are not required but more structure than Minor Works is needed."
  },
  {
    id: 7,
    question: "Under JCT subcontracts, when must a domestic subcontractor be paid?",
    options: [
      "Within 30 days of their invoice",
      "Within the period stated in the subcontract following the main contractor's receipt of payment",
      "Only when the project reaches practical completion",
      "Within 7 days of any application"
    ],
    correctAnswer: 1,
    explanation: "Payment timing follows the subcontract terms, typically within a specified period after the main contractor receives payment from the employer (pay-when-paid clauses are generally prohibited under the Construction Act)."
  },
  {
    id: 8,
    question: "What is the effect of issuing a non-completion certificate under JCT contracts?",
    options: [
      "The contract is terminated immediately",
      "Liquidated damages become payable by the contractor",
      "The employer must pay additional fees",
      "The defects period is extended"
    ],
    correctAnswer: 1,
    explanation: "A non-completion certificate confirms the contractor has failed to complete by the completion date. This enables the employer to deduct liquidated damages at the agreed rate until completion."
  },
  {
    id: 9,
    question: "An electrical subcontractor installing distribution boards finds asbestos not identified in the tender documents. This is likely to be:",
    options: [
      "The subcontractor's risk to manage",
      "A relevant event entitling extension of time",
      "Grounds for contract termination",
      "Not covered by JCT contracts"
    ],
    correctAnswer: 1,
    explanation: "Discovery of unforeseen physical conditions or materials like asbestos is typically a relevant event under JCT contracts, entitling the contractor to claim extension of time and potentially loss and expense."
  },
  {
    id: 10,
    question: "The final certificate under JCT contracts is issued:",
    options: [
      "At practical completion",
      "When all defects are remedied and final account agreed",
      "Six months after practical completion",
      "When the employer takes occupation"
    ],
    correctAnswer: 1,
    explanation: "The final certificate is issued after the defects liability period ends, all defects have been remedied, and the final account has been agreed. It releases remaining retention and concludes the contract."
  },
  {
    id: 11,
    question: "Under JCT contracts, variations must be instructed by:",
    options: [
      "The employer directly to the contractor",
      "The contract administrator in writing",
      "The quantity surveyor",
      "Any professional team member"
    ],
    correctAnswer: 1,
    explanation: "Variations must be instructed by the contract administrator (or architect) in writing. Verbal instructions should be confirmed in writing to be valid and to ensure proper valuation."
  },
  {
    id: 12,
    question: "What is the purpose of liquidated damages in JCT contracts?",
    options: [
      "To punish the contractor for delays",
      "To provide a pre-agreed genuine estimate of the employer's loss from late completion",
      "To cover all employer costs regardless of actual loss",
      "To fund project acceleration"
    ],
    correctAnswer: 1,
    explanation: "Liquidated damages are a pre-agreed genuine estimate of the employer's likely loss from late completion. They provide certainty and avoid the need to prove actual loss, but must be a reasonable estimate, not a penalty."
  }
];

const faqs = [
  {
    question: "What is the difference between JCT SBC, DB, and ICD contracts?",
    answer: "JCT SBC (Standard Building Contract) is for traditional procurement where the employer provides full design. JCT DB (Design and Build) is used when the contractor takes on design responsibility. JCT ICD (Intermediate Building Contract) sits between SBC and Minor Works, suitable for medium-complexity projects. For electrical subcontractors, understanding which contract the main contractor operates under is crucial as it affects design liability, variation procedures, and payment mechanisms."
  },
  {
    question: "How do I claim an extension of time as an electrical subcontractor?",
    answer: "You must notify the main contractor in writing as soon as you become aware of any delay, specifying the cause and likely impact on completion. The main contractor then claims against the employer if the delay is caused by a relevant event. Keep detailed records including programmes, correspondence, photographs, and resource allocation. Time is critical - late notification can prejudice your entitlement even if the delay was genuinely caused by others."
  },
  {
    question: "What happens if the main contractor delays my M&E installation?",
    answer: "If the main contractor's failure to provide access, coordinate trades, or supply information delays your work, you may be entitled to extension of time and loss and expense under your subcontract. Document every instance of delay with dates, affected areas, and resources stood down. Submit regular delay notices referencing specific subcontract clauses. This protects your position for both time extension and financial compensation."
  },
  {
    question: "Can the employer deduct liquidated damages from my subcontract payment?",
    answer: "Not directly. Liquidated damages are between the employer and main contractor. However, your subcontract may contain provisions allowing the main contractor to pass down liability for delays you cause. Check your subcontract carefully for any liquidated damages provisions, delay damages clauses, or pass-through mechanisms. Always ensure your completion dates align with the main contract programme."
  },
  {
    question: "What are my obligations during the defects liability period?",
    answer: "During the defects liability period (typically 12 months from practical completion), you must return to site and rectify any defects in your work at your own cost when notified by the main contractor. This includes defective materials, poor workmanship, or systems not meeting specification. Maintain insurance cover throughout this period. Defects due to employer misuse or third-party damage are not your responsibility."
  },
  {
    question: "How do I value variations to electrical work under JCT contracts?",
    answer: "Variations should be valued using contract rates where applicable, or fair rates and prices where no direct comparison exists. Keep detailed records of labour hours, materials used, plant hire, and any disruption to other work. Submit quotations before carrying out variation work where possible. If the variation is instructed urgently, confirm the instruction in writing and submit your valuation promptly with supporting documentation."
  }
];

const HNCModule5Section2_2 = () => {
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
            <span>Module 5.2.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            JCT Contracts
          </h1>
          <p className="text-white/80">
            Standard building contracts, intermediate forms, amendments, extensions of time and practical completion provisions
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>JCT SBC:</strong> Traditional procurement, employer provides design</li>
              <li className="pl-1"><strong>JCT DB:</strong> Contractor responsible for design and build</li>
              <li className="pl-1"><strong>JCT ICD:</strong> Intermediate form for medium-complexity works</li>
              <li className="pl-1"><strong>Defects period:</strong> Typically 12 months from practical completion</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Design liability:</strong> Varies by contract form</li>
              <li className="pl-1"><strong>EOT claims:</strong> Written notice required promptly</li>
              <li className="pl-1"><strong>Retention:</strong> 50% released at practical completion</li>
              <li className="pl-1"><strong>Variations:</strong> Must be instructed in writing</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify appropriate JCT contract forms for different project types",
              "Understand key clauses affecting electrical subcontractors",
              "Apply extension of time procedures correctly",
              "Prepare and substantiate loss and expense claims",
              "Recognise practical completion requirements and implications",
              "Manage obligations during the defects liability period"
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

        {/* Section 1: JCT Contract Forms */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            JCT Contract Forms Overview
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Joint Contracts Tribunal (JCT) produces the most widely used standard form building contracts in the UK.
              Understanding which contract form applies to your project is essential for managing risk, understanding
              your obligations, and protecting your commercial position as an electrical contractor or subcontractor.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key JCT Contract Forms:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>JCT SBC (Standard Building Contract):</strong> For large, complex traditionally procured projects</li>
                <li className="pl-1"><strong>JCT DB (Design and Build):</strong> Contractor takes design responsibility from employer's requirements</li>
                <li className="pl-1"><strong>JCT ICD (Intermediate Building Contract):</strong> Medium-complexity projects, simpler procedures than SBC</li>
                <li className="pl-1"><strong>JCT MW (Minor Works):</strong> Small, straightforward projects</li>
                <li className="pl-1"><strong>JCT MWD (Minor Works with Design):</strong> Small projects with contractor design portion</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Contract Selection Guide</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Contract Form</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Project Value</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Design Responsibility</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Complexity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">JCT SBC</td>
                      <td className="border border-white/10 px-3 py-2">Over 1 million pounds</td>
                      <td className="border border-white/10 px-3 py-2">Employer (via architect)</td>
                      <td className="border border-white/10 px-3 py-2">High complexity</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">JCT DB</td>
                      <td className="border border-white/10 px-3 py-2">Any value</td>
                      <td className="border border-white/10 px-3 py-2">Contractor</td>
                      <td className="border border-white/10 px-3 py-2">Any complexity</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">JCT ICD</td>
                      <td className="border border-white/10 px-3 py-2">Up to 1 million pounds</td>
                      <td className="border border-white/10 px-3 py-2">Employer or partial contractor</td>
                      <td className="border border-white/10 px-3 py-2">Medium complexity</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">JCT MW</td>
                      <td className="border border-white/10 px-3 py-2">Up to 250,000 pounds</td>
                      <td className="border border-white/10 px-3 py-2">Employer</td>
                      <td className="border border-white/10 px-3 py-2">Simple works</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Building Services Example: Hospital Extension</p>
              <p className="text-sm text-white/90">
                A 15 million pounds hospital extension uses JCT SBC with quantities. The M&E package (approximately 5 million pounds) is
                let as a domestic subcontract to an M&E contractor. Electrical design is provided by the employer's consulting
                engineers (Contractor's Design Portion excluded). The electrical subcontractor works under the main contractor's
                domestic subcontract, which incorporates JCT SBC terms by reference.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key principle:</strong> Always obtain and read your subcontract terms - they may differ significantly from the main contract.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Key Clauses for Subcontractors */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Key Clauses for Electrical Subcontractors
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Whether working under a JCT subcontract or a bespoke form, certain clauses critically affect your
              commercial position. Understanding these provisions helps protect against common pitfalls in
              building services contracts.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Payment Provisions</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Payment notice requirements</li>
                  <li className="pl-1">Pay less notice deadlines</li>
                  <li className="pl-1">Final date for payment</li>
                  <li className="pl-1">Retention percentage and release dates</li>
                  <li className="pl-1">Valuation rules for variations</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Programme and Time</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Commencement and completion dates</li>
                  <li className="pl-1">Sectional completion provisions</li>
                  <li className="pl-1">Extension of time procedures</li>
                  <li className="pl-1">Liquidated damages exposure</li>
                  <li className="pl-1">Acceleration requirements</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Critical Subcontract Clauses</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Clause Area</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Risk to Subcontractor</th>
                      <th className="border border-white/10 px-3 py-2 text-left">What to Check</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Design liability</td>
                      <td className="border border-white/10 px-3 py-2">High - fitness for purpose vs reasonable skill</td>
                      <td className="border border-white/10 px-3 py-2">Standard of care, PI insurance limits</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Set-off rights</td>
                      <td className="border border-white/10 px-3 py-2">Medium - cash flow impact</td>
                      <td className="border border-white/10 px-3 py-2">Conditions for withholding, notice periods</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Indemnities</td>
                      <td className="border border-white/10 px-3 py-2">High - unlimited liability</td>
                      <td className="border border-white/10 px-3 py-2">Scope, caps, insurance coverage</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Termination</td>
                      <td className="border border-white/10 px-3 py-2">High - payment for work done</td>
                      <td className="border border-white/10 px-3 py-2">Grounds, notice, consequences</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Retention</td>
                      <td className="border border-white/10 px-3 py-2">Medium - cash flow and insolvency risk</td>
                      <td className="border border-white/10 px-3 py-2">Percentage, trust account, release dates</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Warning: Pay-When-Paid Clauses</p>
              <p className="text-sm text-white/90">
                Pay-when-paid clauses are largely prohibited under the Construction Act 1996 (except in insolvency).
                If your subcontract contains such a clause, it may be unenforceable. However, pay-when-certified
                clauses linking your payment to main contract certification may still be valid. Always seek legal
                advice on unusual payment terms.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Best practice:</strong> Review subcontract terms before tender, price risk items, and negotiate unfair clauses before signing.
            </p>
          </div>
        </section>

        {/* Section 3: Extensions of Time and Loss & Expense */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Extensions of Time and Loss and Expense
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Managing time and cost claims is critical for project success. JCT contracts provide structured
              mechanisms for claiming extensions of time (EOT) and compensation for loss and expense caused
              by matters beyond the contractor's control.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Relevant Events (Grounds for EOT)</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Variations:</strong> Changes to scope instructed by contract administrator</li>
                <li className="pl-1"><strong>Late information:</strong> Drawings, details, or instructions not provided on time</li>
                <li className="pl-1"><strong>Employer's other contractors:</strong> Delays caused by direct contractors or statutory undertakers</li>
                <li className="pl-1"><strong>Exceptionally adverse weather:</strong> Must be genuinely exceptional, not merely bad weather</li>
                <li className="pl-1"><strong>Civil commotion or terrorism:</strong> Events beyond reasonable contractor control</li>
                <li className="pl-1"><strong>Force majeure:</strong> Unforeseeable events making performance impossible</li>
                <li className="pl-1"><strong>Statutory changes:</strong> New legislation affecting the works</li>
                <li className="pl-1"><strong>Employer default:</strong> Failure to give access, impediment, or prevention</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">EOT Procedure Under JCT SBC</p>
              <ol className="text-sm text-white space-y-1.5 list-decimal list-outside ml-5">
                <li className="pl-1">Contractor gives written notice as soon as delay becomes apparent</li>
                <li className="pl-1">Notice identifies the relevant event and expected effect on completion</li>
                <li className="pl-1">Contractor provides particulars and estimate of delay when reasonably possible</li>
                <li className="pl-1">Contract administrator assesses and grants fair and reasonable extension</li>
                <li className="pl-1">If refused or inadequate, contractor may refer to adjudication</li>
              </ol>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Loss and Expense - Relevant Matters</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Relevant Matter</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Loss Items</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Late information</td>
                      <td className="border border-white/10 px-3 py-2">Standing time, programme revision costs, acceleration</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Variations and disruption</td>
                      <td className="border border-white/10 px-3 py-2">Additional supervision, extended preliminaries, loss of productivity</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Employer's failure to give access</td>
                      <td className="border border-white/10 px-3 py-2">Plant standing, labour redeployment, site welfare costs</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Suspension by contractor</td>
                      <td className="border border-white/10 px-3 py-2">Demobilisation and remobilisation costs</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Approximate quantities adjustment</td>
                      <td className="border border-white/10 px-3 py-2">Rate adjustment, extended duration costs</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Building Services Example: Distribution Board Delay</p>
              <p className="text-sm text-white/90">
                An electrical subcontractor is delayed 4 weeks because the consulting engineer issues revised distribution
                board schedules late. The subcontractor must: (1) notify the main contractor in writing immediately,
                (2) provide programme impact analysis, (3) record all affected resources and costs, (4) claim both
                EOT and loss and expense. Recoverable costs may include electrician standing time, extended site
                welfare, delayed material deliveries, and reprogramming specialist commissioning engineers.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Documentation is key:</strong> Keep contemporaneous records of delays, cause and effect, resources affected, and costs incurred.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Practical Completion and Defects Liability */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Practical Completion and Defects Liability
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Practical completion is a pivotal contractual milestone that triggers several important consequences.
              Understanding what it means and managing the defects liability period effectively is essential
              for completing projects successfully.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Practical Completion Criteria</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Works substantially complete and fit for occupation/use</li>
                <li className="pl-1">All testing and commissioning satisfactorily completed</li>
                <li className="pl-1">O&M manuals and as-built drawings provided</li>
                <li className="pl-1">Training delivered to client's staff where required</li>
                <li className="pl-1">Minor outstanding items (snagging) acceptable to contract administrator</li>
                <li className="pl-1">All statutory approvals and certificates obtained</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Consequences of Practical Completion</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">For the Contractor</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>50% retention released</li>
                    <li>Liquidated damages liability ends</li>
                    <li>Insurance responsibilities may transfer</li>
                    <li>Defects liability period begins</li>
                    <li>Right to final account preparation</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">For the Employer</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>Takes possession of the works</li>
                    <li>Assumes responsibility for security</li>
                    <li>Insurance responsibility may transfer</li>
                    <li>Can occupy and use the building</li>
                    <li>Final account process commences</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Defects Liability Period (Rectification Period)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Aspect</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Standard Provision</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Subcontractor Implication</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Duration</td>
                      <td className="border border-white/10 px-3 py-2">12 months from practical completion</td>
                      <td className="border border-white/10 px-3 py-2">Must maintain resources to respond</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Notification</td>
                      <td className="border border-white/10 px-3 py-2">Employer/CA notifies of defects</td>
                      <td className="border border-white/10 px-3 py-2">Main contractor passes down to trades</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Rectification</td>
                      <td className="border border-white/10 px-3 py-2">Contractor rectifies at own cost</td>
                      <td className="border border-white/10 px-3 py-2">Subcontractor liable for own defects</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Exclusions</td>
                      <td className="border border-white/10 px-3 py-2">Fair wear and tear, third-party damage</td>
                      <td className="border border-white/10 px-3 py-2">Document handover condition</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Certificate</td>
                      <td className="border border-white/10 px-3 py-2">Making good certificate issued at end</td>
                      <td className="border border-white/10 px-3 py-2">Triggers remaining retention release</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-green-500/10 border border-green-500/30">
              <p className="text-sm font-medium text-green-400 mb-2">Building Services Example: Electrical Defects</p>
              <p className="text-sm text-white/90">
                Six months after practical completion, the building manager reports emergency lighting failures.
                The electrical subcontractor must: (1) attend site promptly to diagnose, (2) determine if the
                failure is a genuine defect (faulty component, poor workmanship) or misuse/external cause,
                (3) rectify defects at their own cost, (4) document the repair and root cause. If the failure
                was due to the client disconnecting the lighting circuit for their own alterations, this is
                not a defect for the subcontractor to remedy free of charge.
              </p>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Practical tip:</strong> Maintain good relationships with building managers during the defects period. Prompt response to genuine issues builds reputation and often leads to future work.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Extension of Time Claim</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Revised containment drawings issued 3 weeks late. Electrical first fix delayed.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Original programme: First fix weeks 10-16</p>
                <p>Information due: Week 8</p>
                <p>Information received: Week 11 (3 weeks late)</p>
                <p className="mt-2">Impact assessment:</p>
                <p>- First fix start delayed to week 14</p>
                <p>- Critical path delay: 3 weeks minimum</p>
                <p>- Second fix pushed back accordingly</p>
                <p className="mt-2 text-green-400">EOT entitlement: 3 weeks (minimum)</p>
                <p className="text-amber-400">Loss and expense: Extended preliminaries, possible acceleration costs</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Loss and Expense Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Calculate loss and expense for 3-week delay caused by late information.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p><strong>Extended preliminaries:</strong></p>
                <p>Site supervision: 3 weeks x 1,200 pounds = 3,600 pounds</p>
                <p>Welfare facilities: 3 weeks x 400 pounds = 1,200 pounds</p>
                <p>Small plant and tools: 3 weeks x 300 pounds = 900 pounds</p>
                <p className="mt-2"><strong>Standing time:</strong></p>
                <p>2 electricians x 3 days waiting = 6 days x 280 pounds = 1,680 pounds</p>
                <p className="mt-2"><strong>Programme revision:</strong></p>
                <p>Contracts manager time: 4 hours x 65 pounds = 260 pounds</p>
                <p className="mt-2 border-t border-white/20 pt-2">Total claim: <strong>7,640 pounds</strong></p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Retention Release Timeline</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Subcontract value 500,000 pounds, retention 3%, defects period 12 months.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Total retention held: 500,000 x 3% = <strong>15,000 pounds</strong></p>
                <p className="mt-2">Practical completion (1st March 2024):</p>
                <p>- First moiety released: 7,500 pounds</p>
                <p className="mt-2">End of defects period (1st March 2025):</p>
                <p>- Making good certificate issued</p>
                <p>- Second moiety released: 7,500 pounds</p>
                <p className="mt-2 text-amber-400">Note: Final release subject to final account agreement</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">EOT Claim Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Identify the relevant event from the contract list</li>
                <li className="pl-1">Give written notice immediately delay becomes apparent</li>
                <li className="pl-1">State the cause, expected duration, and effect on completion</li>
                <li className="pl-1">Provide programme showing critical path impact</li>
                <li className="pl-1">Submit particulars and supporting documentation</li>
                <li className="pl-1">Follow up and respond to queries promptly</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Dates and Periods to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Retention moieties: <strong>50%</strong> at PC, <strong>50%</strong> at final certificate</li>
                <li className="pl-1">Defects liability period: <strong>12 months</strong> standard</li>
                <li className="pl-1">Final certificate: <strong>2 months</strong> after end of defects period (JCT SBC)</li>
                <li className="pl-1">Adjudication: <strong>28 days</strong> from referral to decision</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Late notification</strong> - Always notify delays immediately in writing</li>
                <li className="pl-1"><strong>Poor records</strong> - Keep daily diaries, photos, and correspondence</li>
                <li className="pl-1"><strong>Ignoring subcontract terms</strong> - Read and understand your specific contract</li>
                <li className="pl-1"><strong>Verbal instructions</strong> - Insist on written confirmation of variations</li>
                <li className="pl-1"><strong>Missing defects response</strong> - Maintain capability to respond during defects period</li>
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
                <p className="font-medium text-white mb-1">JCT Contract Forms</p>
                <ul className="space-y-0.5">
                  <li>SBC - Standard Building Contract (traditional)</li>
                  <li>DB - Design and Build Contract</li>
                  <li>ICD - Intermediate Building Contract</li>
                  <li>MW/MWD - Minor Works (with/without design)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Milestones</p>
                <ul className="space-y-0.5">
                  <li>Practical completion - 50% retention released</li>
                  <li>Defects period - 12 months standard</li>
                  <li>Making good certificate - issued when defects remedied</li>
                  <li>Final certificate - remaining retention released</li>
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
            <Link to="../h-n-c-module5-section2-3">
              Next: NEC Contracts
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule5Section2_2;
