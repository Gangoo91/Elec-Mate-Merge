import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Variations and Claims - HNC Module 5 Section 3.4";
const DESCRIPTION = "Master variation valuation methods, entitlement assessment, notice requirements and claims substantiation for building services contracts: instruction process, daywork, loss and expense, contemporaneous records.";

const quickCheckQuestions = [
  {
    id: "variation-definition",
    question: "What constitutes a valid variation under most standard form contracts?",
    options: ["Any change the contractor wants to make", "A written instruction from the contract administrator", "Verbal agreement between parties", "Changes made to reduce costs"],
    correctIndex: 1,
    explanation: "A valid variation requires a written instruction from the contract administrator (architect, engineer, or employer's representative). This ensures proper authorisation and creates a clear record for valuation."
  },
  {
    id: "valuation-hierarchy",
    question: "What is the preferred order for valuing variations under JCT contracts?",
    options: ["Daywork, then fair rates, then contract rates", "Contract rates, then pro-rata rates, then fair valuation", "Fair valuation first, then negotiate", "Lump sum agreement only"],
    correctIndex: 1,
    explanation: "JCT contracts establish a hierarchy: first use contract rates where applicable, then pro-rata adjustment of contract rates for similar work, and finally fair valuation where no comparable rates exist."
  },
  {
    id: "notice-requirements",
    question: "Why are contractual notice requirements critically important for claims?",
    options: ["They are just administrative formalities", "Failure to comply may bar the claim entirely", "They only apply to large claims", "The employer can waive them retrospectively"],
    correctIndex: 1,
    explanation: "Contractual notice requirements are conditions precedent to entitlement. Failure to give proper notice within the specified timeframe may completely bar a claim, regardless of its merit. Courts and adjudicators generally enforce these strictly."
  },
  {
    id: "contemporaneous-records",
    question: "Contemporaneous records are essential for claims because they:",
    options: ["Look more professional", "Are required by law", "Provide objective evidence created at the time of events", "Can be created from memory later"],
    correctIndex: 2,
    explanation: "Contemporaneous records are created at or near the time of events and provide objective, credible evidence. Records created later from memory are less reliable and carry less weight in dispute resolution."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Under JCT DB 2016, who has authority to issue variation instructions?",
    options: [
      "The main contractor only",
      "The employer or employer's representative",
      "Any member of the design team",
      "The quantity surveyor"
    ],
    correctAnswer: 1,
    explanation: "Under JCT Design and Build contracts, only the employer (or their authorised representative named in the contract) can issue variation instructions. The contractor cannot self-authorise variations."
  },
  {
    id: 2,
    question: "What is the primary purpose of a Confirmation of Verbal Instruction (CVI)?",
    options: [
      "To avoid the need for written instructions",
      "To convert an oral instruction into a written record",
      "To allow the contractor to refuse work",
      "To delay the project programme"
    ],
    correctAnswer: 1,
    explanation: "A CVI confirms verbal instructions in writing, creating a formal record. If the contract administrator does not dissent within a specified period, the verbal instruction is deemed confirmed as a valid variation."
  },
  {
    id: 3,
    question: "When valuing variations using contract rates, which principle applies?",
    options: [
      "Rates can be renegotiated freely",
      "Rates apply only if work is identical in character and conditions",
      "The employer can impose any rate",
      "Historical rates from previous projects apply"
    ],
    correctAnswer: 1,
    explanation: "Contract rates apply where the varied work is of similar character, executed under similar conditions, and does not significantly change the quantity. If conditions differ materially, rates must be adjusted or fair rates used."
  },
  {
    id: 4,
    question: "A daywork sheet must typically include:",
    options: [
      "Only the total hours worked",
      "Labour, materials, plant, with times and signatures",
      "Just a description of the work",
      "The contractor's profit margin"
    ],
    correctAnswer: 1,
    explanation: "Daywork sheets must record labour (names, trades, hours), materials used, and plant employed. They should be signed by both parties' site representatives contemporaneously to provide verified evidence."
  },
  {
    id: 5,
    question: "Under NEC4, the contractor must notify a compensation event within:",
    options: [
      "7 days of becoming aware",
      "8 weeks of becoming aware",
      "14 days of the event occurring",
      "No time limit applies"
    ],
    correctAnswer: 1,
    explanation: "NEC4 requires the contractor to notify compensation events within 8 weeks of becoming aware of the event. Failure to notify in time is a bar to recovering additional cost or time (subject to the Project Manager's discretion)."
  },
  {
    id: 6,
    question: "Loss and expense claims under JCT require proof of:",
    options: [
      "Any inconvenience to the contractor",
      "Direct loss and/or expense for which the contractor would not otherwise be reimbursed",
      "Hypothetical losses that might occur",
      "General overheads without specific linkage"
    ],
    correctAnswer: 1,
    explanation: "Loss and expense claims must demonstrate actual direct loss or expense suffered, with clear causation linking it to a relevant matter. Contractors cannot claim for losses already covered elsewhere or for speculative damages."
  },
  {
    id: 7,
    question: "The 'global claim' approach is generally:",
    options: [
      "The preferred method for all claims",
      "Acceptable only when events are so intertwined they cannot be separated",
      "Required by standard form contracts",
      "Easier to prove than itemised claims"
    ],
    correctAnswer: 1,
    explanation: "Global claims (where multiple causes produce a single financial effect) are disfavoured by tribunals. They are only accepted where it is genuinely impossible to separate the effects of individual events. Itemised claims with clear causation are preferred."
  },
  {
    id: 8,
    question: "What is the purpose of the 'Scott Schedule' in claims?",
    options: [
      "To list all project drawings",
      "To present claims and responses in a structured tabular format",
      "To calculate extension of time",
      "To record site meetings"
    ],
    correctAnswer: 1,
    explanation: "A Scott Schedule presents claims in columns showing the claim item, contractor's position, employer's response, and tribunal's decision. It provides a structured format for adjudication or arbitration."
  },
  {
    id: 9,
    question: "Disruption differs from prolongation in that disruption:",
    options: [
      "Always extends the completion date",
      "Affects productivity without necessarily extending time",
      "Only occurs due to weather",
      "Cannot be claimed under standard contracts"
    ],
    correctAnswer: 1,
    explanation: "Disruption affects productivity and efficiency (doing work less efficiently than planned) without necessarily extending the project duration. Prolongation refers to an extension of the project period. Both may be claimable but require different evidence."
  },
  {
    id: 10,
    question: "When installing mechanical services, a variation adding 20% more pipework would typically be valued:",
    options: [
      "At the original contract rates with no adjustment",
      "At contract rates, but the contractor may claim for changed conditions",
      "At double the original rates",
      "Only by daywork"
    ],
    correctAnswer: 1,
    explanation: "A 20% increase in quantity would typically be valued at contract rates, but the contractor may argue that such a significant increase changes conditions (productivity, logistics, supervision) warranting rate adjustment under the 'fair valuation' provisions."
  },
  {
    id: 11,
    question: "Which of the following is NOT typically a relevant matter for loss and expense under JCT?",
    options: [
      "Late information from the architect",
      "Variations instructed by the employer",
      "General market price increases",
      "Opening up work that proves compliant"
    ],
    correctAnswer: 2,
    explanation: "General market price increases are a contractor's risk under fixed-price contracts and are not relevant matters for loss and expense claims. The contractor bears inflation risk unless specific fluctuation provisions apply."
  },
  {
    id: 12,
    question: "The 'Emden formula' is used to calculate:",
    options: [
      "Extension of time",
      "Unabsorbed head office overheads during delay",
      "Material price escalation",
      "Daywork percentages"
    ],
    correctAnswer: 1,
    explanation: "The Emden formula (and similar Hudson/Eichleay formulae) calculates the unabsorbed head office overheads a contractor suffers when a project is delayed. It applies a percentage of the contract sum over the delay period."
  }
];

const faqs = [
  {
    question: "What's the difference between a variation and a claim?",
    answer: "A variation is an authorised change to the scope of work, instructed by the contract administrator and valued under the contract's variation provisions. A claim is a request for additional payment or time based on the contractor's entitlement under the contract (e.g., for delay, disruption, or breach). Variations are generally non-contentious; claims often require negotiation or dispute resolution."
  },
  {
    question: "Can a contractor refuse to carry out a variation?",
    answer: "Generally no, unless the variation is outside the contract's scope (e.g., work fundamentally different in nature) or the employer has failed to meet payment obligations. Most standard forms require the contractor to proceed with validly instructed variations and value them afterwards. Refusal without justification may constitute breach of contract."
  },
  {
    question: "How detailed should contemporaneous records be?",
    answer: "Records should capture sufficient detail to enable later valuation: dates, times, personnel (names and trades), equipment used, materials consumed, weather conditions, instructions received, and progress achieved. Photographs, signed sheets, and diary entries are valuable. The test is whether someone unfamiliar with the project could reconstruct events from the records."
  },
  {
    question: "What happens if the employer disputes a variation valuation?",
    answer: "Typically the employer or QS provides their own valuation. If parties cannot agree, most contracts provide for interim certification at the QS's assessment with final resolution through the contract's dispute mechanism (adjudication, arbitration, or litigation). The contractor should submit their valuation with supporting evidence promptly."
  },
  {
    question: "Are verbal variation instructions binding?",
    answer: "Under most standard forms, verbal instructions are not immediately binding but can become so if confirmed in writing (by either party) and not dissented from. Best practice is to issue a Confirmation of Verbal Instruction (CVI) immediately. Some contracts (e.g., NEC) require written acceptance before work proceeds on variations."
  },
  {
    question: "How do I calculate disruption costs for building services installation?",
    answer: "Disruption claims compare actual productivity against planned productivity (often using a 'measured mile' comparison of similar work in undisrupted conditions). For M&E work, this might involve comparing installation rates (metres of cable per day, number of luminaires per shift) between disrupted and undisrupted periods. Contemporaneous records of daily outputs are essential."
  }
];

const HNCModule5Section3_4 = () => {
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
            <span>Module 5.3.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Variations and Claims
          </h1>
          <p className="text-white/80">
            Valuation methods, entitlement assessment, notice requirements and claims substantiation in building services contracts
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Variations:</strong> Authorised changes requiring written instruction</li>
              <li className="pl-1"><strong>Valuation hierarchy:</strong> Contract rates, pro-rata rates, fair valuation</li>
              <li className="pl-1"><strong>Notice requirements:</strong> Time-barred if not given promptly</li>
              <li className="pl-1"><strong>Claims:</strong> Require causation, quantification, substantiation</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>M&E variations:</strong> Common due to coordination issues</li>
              <li className="pl-1"><strong>Daywork:</strong> Often used for access-related changes</li>
              <li className="pl-1"><strong>Disruption:</strong> Trades working out of sequence</li>
              <li className="pl-1"><strong>Records:</strong> Daily allocation sheets essential</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand the variation instruction process and authorisation requirements",
              "Apply the valuation hierarchy: contract rates, pro-rata, fair valuation, daywork",
              "Identify notice requirements and their importance as conditions precedent",
              "Prepare and substantiate loss and expense claims",
              "Maintain contemporaneous records to support claims",
              "Distinguish between prolongation, disruption, and acceleration claims"
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

        {/* Section 1: Variation Instruction Process */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Variation Instruction Process
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Variations are changes to the contracted scope of work, whether additions, omissions, or alterations.
              Proper administration of variations protects both parties and ensures fair payment for changed work.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">What constitutes a variation:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Addition:</strong> New work not in original scope (e.g., additional containment routes)</li>
                <li className="pl-1"><strong>Omission:</strong> Removal of work from scope (e.g., deleting a distribution board)</li>
                <li className="pl-1"><strong>Substitution:</strong> Replacement with different specification (e.g., LED for fluorescent)</li>
                <li className="pl-1"><strong>Alteration:</strong> Change to design or sequence (e.g., relocating a submain route)</li>
                <li className="pl-1"><strong>Obligation change:</strong> Modification to access, working hours, or constraints</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Variation Instruction Requirements</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Contract</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Who Can Instruct</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Form Required</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">JCT SBC</td>
                      <td className="border border-white/10 px-3 py-2">Architect/Contract Administrator</td>
                      <td className="border border-white/10 px-3 py-2">Written (AI form)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">JCT DB</td>
                      <td className="border border-white/10 px-3 py-2">Employer/Employer's Agent</td>
                      <td className="border border-white/10 px-3 py-2">Change to Employer's Requirements</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">NEC4</td>
                      <td className="border border-white/10 px-3 py-2">Project Manager</td>
                      <td className="border border-white/10 px-3 py-2">Project Manager's instruction</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">FIDIC</td>
                      <td className="border border-white/10 px-3 py-2">Engineer</td>
                      <td className="border border-white/10 px-3 py-2">Written instruction</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Confirmation of Verbal Instruction (CVI)</p>
              <p className="text-sm text-white mb-2">
                When a verbal instruction is given on site, the contractor should issue a CVI confirming:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Date and time of verbal instruction</li>
                <li className="pl-1">Person who gave the instruction</li>
                <li className="pl-1">Description of the instructed work</li>
                <li className="pl-1">Request for written confirmation or deemed acceptance</li>
              </ul>
              <p className="text-sm text-white/70 mt-2">
                Under JCT, if the CA does not dissent within 7 days, the CVI is deemed a valid instruction.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>M&E reality:</strong> On complex building services projects, verbal instructions are common due to coordination pressures. Robust CVI procedures protect the subcontractor's entitlement to payment.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Valuation Methods */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Valuation Methods
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Standard form contracts establish a hierarchy of valuation methods, moving from the most objective
              (contract rates) to the most subjective (fair valuation) as the work diverges from the original scope.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">1. Contract Rates</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Applied where work is of similar character</li>
                  <li className="pl-1">Executed under similar conditions</li>
                  <li className="pl-1">Quantity not significantly changed</li>
                  <li className="pl-1">Most objective, least contentious</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">2. Pro-rata Rates</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Adjusted contract rates for similar work</li>
                  <li className="pl-1">Allowance for different conditions</li>
                  <li className="pl-1">Quantity variations accounted for</li>
                  <li className="pl-1">Based on proportional adjustment</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">3. Fair Valuation</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Used when no comparable rates exist</li>
                  <li className="pl-1">Based on cost plus reasonable margin</li>
                  <li className="pl-1">Requires detailed cost breakdown</li>
                  <li className="pl-1">Often subject to negotiation</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">4. Daywork</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Labour, materials, plant at recorded cost</li>
                  <li className="pl-1">Plus percentage additions for overheads/profit</li>
                  <li className="pl-1">Requires signed daywork sheets</li>
                  <li className="pl-1">Used for small, unpredictable works</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Daywork Valuation Detail</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Component</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Basis</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Addition</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Labour</td>
                      <td className="border border-white/10 px-3 py-2">Actual hours at hourly rate</td>
                      <td className="border border-white/10 px-3 py-2">+130-150% (RICS definition)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Materials</td>
                      <td className="border border-white/10 px-3 py-2">Invoice cost</td>
                      <td className="border border-white/10 px-3 py-2">+10-15%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Plant</td>
                      <td className="border border-white/10 px-3 py-2">Hire rates or depreciation</td>
                      <td className="border border-white/10 px-3 py-2">+10-15%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Subcontractors</td>
                      <td className="border border-white/10 px-3 py-2">Invoiced amounts</td>
                      <td className="border border-white/10 px-3 py-2">+2.5-5%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Building Services Example - Cable Tray Rerouting</p>
              <p className="text-sm text-white">
                An architect instructs rerouting of 50m of cable tray due to a clash with structural steelwork.
                The original contract rate for cable tray was priced for straight runs at low level. The variation
                involves working at 4m height around obstructions.
              </p>
              <ul className="text-sm text-white mt-2 space-y-1 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Contract rate basis:</strong> Original rate was for different conditions</li>
                <li className="pl-1"><strong>Pro-rata adjustment:</strong> Add allowance for height, access equipment, reduced productivity</li>
                <li className="pl-1"><strong>Submission:</strong> Build-up showing base rate plus adjustments for changed conditions</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key principle:</strong> The contractor must substantiate why contract rates are inapplicable before moving to fair valuation. Simply asserting rates are too low is insufficient.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Notice Requirements */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Notice Requirements and Conditions Precedent
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Modern standard form contracts contain strict notice requirements. These are not mere formalities;
              failure to give proper notice may completely bar a claim, regardless of its substantive merit.
            </p>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Critical Warning</p>
              <p className="text-sm text-white">
                Courts and adjudicators generally enforce notice requirements strictly. The 2021 Technology and
                Construction Court decision in <em>Bexheat v Essex Services</em> confirmed that failure to give
                timely notice can bar an otherwise valid claim. "Time is of the essence" in notification.
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Notice Periods</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Contract</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Event Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Notice Period</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">JCT SBC 2016</td>
                      <td className="border border-white/10 px-3 py-2">Loss and expense</td>
                      <td className="border border-white/10 px-3 py-2">"As soon as it becomes reasonably apparent"</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">JCT SBC 2016</td>
                      <td className="border border-white/10 px-3 py-2">Extension of time</td>
                      <td className="border border-white/10 px-3 py-2">"Forthwith" upon delay becoming apparent</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">NEC4</td>
                      <td className="border border-white/10 px-3 py-2">Compensation event</td>
                      <td className="border border-white/10 px-3 py-2">8 weeks of becoming aware</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">FIDIC 2017</td>
                      <td className="border border-white/10 px-3 py-2">Contractor's claim</td>
                      <td className="border border-white/10 px-3 py-2">28 days of awareness</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Notice Content Requirements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Identification:</strong> Clearly identify the event or instruction giving rise to the claim</li>
                <li className="pl-1"><strong>Contractual basis:</strong> Reference the relevant contract clause(s)</li>
                <li className="pl-1"><strong>Impact statement:</strong> Describe the likely effect on time and/or cost</li>
                <li className="pl-1"><strong>Reservation:</strong> Reserve the right to submit detailed particulars</li>
                <li className="pl-1"><strong>Records intention:</strong> State that contemporaneous records are being kept</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Sample Early Warning Notice (NEC4 Style)</p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p><strong>To:</strong> Project Manager</p>
                <p><strong>Date:</strong> 15 March 2024</p>
                <p><strong>Re:</strong> Early Warning Notice - Main Plant Room Access</p>
                <p className="mt-2">We hereby give notice under clause 15.1 of a matter which could:</p>
                <p>- Delay completion (access restriction until 30 April)</p>
                <p>- Increase total cost (out-of-sequence working)</p>
                <p className="mt-2">The structural contractor has advised that the main plant room will not be handed over until 30 April 2024, 6 weeks later than the construction programme.</p>
                <p className="mt-2">We request this matter be added to the Risk Register and discussed at the next risk reduction meeting.</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Best practice:</strong> Notify early and often. An early notification that proves unnecessary is far better than a late notification that bars a valid claim.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Loss and Expense Claims */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Loss and Expense Claims and Substantiation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Loss and expense claims compensate the contractor for direct loss or expense beyond the contract sum,
              caused by matters for which the employer bears contractual risk. Substantiation requires demonstrating
              causation, entitlement, and quantum.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Relevant Matters (JCT)</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Employer Events</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>- Variations and instructions</li>
                    <li>- Late information/drawings</li>
                    <li>- Discrepancies in documents</li>
                    <li>- Failure to give access</li>
                    <li>- Work by employer's contractors</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Opening Up/Testing</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>- Inspection revealing compliant work</li>
                    <li>- Testing beyond contract requirements</li>
                    <li>- Suspension for non-payment</li>
                    <li>- Impediment by statutory undertaker</li>
                    <li>- Exercise of CDM powers</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Types of Recoverable Loss</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Prolongation costs:</strong> Site overheads for extended duration (supervision, welfare, plant)</li>
                <li className="pl-1"><strong>Disruption costs:</strong> Loss of productivity due to working inefficiently</li>
                <li className="pl-1"><strong>Acceleration costs:</strong> Premium time/additional resources to recover delay (if instructed)</li>
                <li className="pl-1"><strong>Head office overheads:</strong> Unabsorbed central costs during delay (formula-based)</li>
                <li className="pl-1"><strong>Loss of profit:</strong> On the delayed project or on other work foregone</li>
                <li className="pl-1"><strong>Finance charges:</strong> Interest on delayed payments or additional capital employed</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Contemporaneous Records Checklist</p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-white mb-1">Daily Records</p>
                  <ul className="text-white/80 space-y-0.5">
                    <li>- Labour allocation sheets (names, trades, areas)</li>
                    <li>- Plant on site register</li>
                    <li>- Weather records</li>
                    <li>- Instructions received log</li>
                    <li>- Progress photographs</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-white mb-1">Weekly/Monthly Records</p>
                  <ul className="text-white/80 space-y-0.5">
                    <li>- Progress reports with productivity data</li>
                    <li>- Meeting minutes</li>
                    <li>- Programme updates</li>
                    <li>- Correspondence register</li>
                    <li>- Cost tracking against budget</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Claim Preparation Methodology</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Step</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Description</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Evidence Required</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">1. Event</td>
                      <td className="border border-white/10 px-3 py-2">Identify the cause/relevant matter</td>
                      <td className="border border-white/10 px-3 py-2">Instructions, minutes, correspondence</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">2. Entitlement</td>
                      <td className="border border-white/10 px-3 py-2">Link to contract clause</td>
                      <td className="border border-white/10 px-3 py-2">Contract analysis, legal opinion</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">3. Causation</td>
                      <td className="border border-white/10 px-3 py-2">Show event caused the loss</td>
                      <td className="border border-white/10 px-3 py-2">Programme analysis, delay expert</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">4. Quantum</td>
                      <td className="border border-white/10 px-3 py-2">Calculate recoverable loss</td>
                      <td className="border border-white/10 px-3 py-2">Cost records, invoices, calculations</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">5. Submission</td>
                      <td className="border border-white/10 px-3 py-2">Package claim professionally</td>
                      <td className="border border-white/10 px-3 py-2">Scott Schedule, executive summary</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-green-500/10 border border-green-500/30">
              <p className="text-sm font-medium text-green-400 mb-2">M&E Disruption Claim Example</p>
              <p className="text-sm text-white">
                An electrical subcontractor is forced to work in areas out of sequence due to late structural completion.
                Instead of installing containment floor-by-floor (planned productivity: 40m/day), work is scattered
                across multiple floors (actual productivity: 25m/day).
              </p>
              <ul className="text-sm text-white mt-2 space-y-1 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Measured mile:</strong> Compare productivity on unaffected areas (40m/day baseline)</li>
                <li className="pl-1"><strong>Lost productivity:</strong> (40-25)/40 = 37.5% efficiency loss</li>
                <li className="pl-1"><strong>Cost impact:</strong> Additional labour hours × rate = claim quantum</li>
                <li className="pl-1"><strong>Records needed:</strong> Daily allocation sheets showing hours per area</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Tribunal reality:</strong> Claims with poor records are heavily discounted or rejected entirely. The burden of proof is on the claimant to demonstrate both liability and quantum on the balance of probabilities.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Variation Valuation Hierarchy</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Architect instructs substitution of standard LED panels for emergency-rated versions in a corridor. Original contract rate: £85/luminaire. Emergency version requires different wiring and testing.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Contract rate applies to standard LED panel: £85</p>
                <p className="mt-2">Pro-rata adjustment required:</p>
                <p>- Emergency luminaire cost difference: +£45</p>
                <p>- Additional wiring (self-contained batteries): +£20</p>
                <p>- Emergency circuit testing: +£8</p>
                <p className="mt-2">Adjusted rate: £85 + £45 + £20 + £8 = <strong>£158/luminaire</strong></p>
                <p className="mt-2 text-green-400">This is a pro-rata adjustment of contract rates, not fair valuation.</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Prolongation Cost Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> M&E subcontractor is granted 4 weeks extension of time due to late access. Calculate prolongation costs.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Weekly site overheads breakdown:</p>
                <p>Site manager: £1,200/week</p>
                <p>Site supervisor: £950/week</p>
                <p>Welfare/office costs: £180/week</p>
                <p>Small plant/tools: £220/week</p>
                <p>Preliminaries total: £2,550/week</p>
                <p className="mt-2">4 weeks prolongation: 4 × £2,550 = <strong>£10,200</strong></p>
                <p className="mt-2">Plus head office overheads (Emden formula):</p>
                <p>Contract sum: £850,000</p>
                <p>Head office percentage: 6%</p>
                <p>Delay period: 4 weeks</p>
                <p>HO overheads: (£850,000 × 0.06 × 4) ÷ 52 = <strong>£3,923</strong></p>
                <p className="mt-2 text-green-400">Total claim: £10,200 + £3,923 = £14,123</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Daywork Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Emergency modification to distribution board following discovery of existing asbestos. 2 electricians for 6 hours plus materials.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Labour (RICS Definition of Prime Cost):</p>
                <p>2 electricians × 6 hours × £22/hour = £264</p>
                <p>Labour addition (+145%): £264 × 1.45 = £383</p>
                <p className="mt-2">Materials:</p>
                <p>MCBs, cable, sundries: £185</p>
                <p>Materials addition (+12.5%): £185 × 1.125 = £208</p>
                <p className="mt-2">Total daywork value: £383 + £208 = <strong>£591</strong></p>
                <p className="mt-2 text-white/60">Note: Must be supported by signed daywork sheets</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Variation Administration Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Receive written instruction (or issue CVI for verbal)</li>
                <li className="pl-1">Acknowledge receipt and note any impact on programme</li>
                <li className="pl-1">Prepare costed submission within contract timeframe</li>
                <li className="pl-1">Submit with build-up showing valuation method used</li>
                <li className="pl-1">Maintain records of actual cost if daywork applies</li>
                <li className="pl-1">Include in interim application with supporting documents</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Claims Best Practice</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Notify early - within contractual timeframes</li>
                <li className="pl-1">Keep contemporaneous records from day one</li>
                <li className="pl-1">Identify each claim event separately</li>
                <li className="pl-1">Link cause to effect with clear causation narrative</li>
                <li className="pl-1">Quantify using actual costs where possible</li>
                <li className="pl-1">Present professionally with executive summary</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Late notification</strong> - may bar the entire claim</li>
                <li className="pl-1"><strong>Global claims</strong> - tribunals prefer itemised claims</li>
                <li className="pl-1"><strong>Poor records</strong> - claims are discounted or rejected</li>
                <li className="pl-1"><strong>Ignoring concurrent delay</strong> - reduces entitlement</li>
                <li className="pl-1"><strong>Excessive claims</strong> - damages credibility for valid items</li>
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
                <p className="font-medium text-white mb-1">Valuation Hierarchy</p>
                <ul className="space-y-0.5">
                  <li>1. Contract rates (similar character & conditions)</li>
                  <li>2. Pro-rata adjustment of contract rates</li>
                  <li>3. Fair valuation (cost + margin)</li>
                  <li>4. Daywork (labour + materials + plant + %)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Notice Timeframes</p>
                <ul className="space-y-0.5">
                  <li>JCT loss/expense: "As soon as reasonably apparent"</li>
                  <li>NEC4 compensation: 8 weeks of awareness</li>
                  <li>FIDIC claims: 28 days of awareness</li>
                  <li>CVI confirmation: 7 days (JCT)</li>
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
              Back to Cost Management
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module5-section3-5">
              Next: Final Accounts
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule5Section3_4;
