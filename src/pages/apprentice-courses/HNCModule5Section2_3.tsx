import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "NEC Contracts - HNC Module 5 Section 2.3";
const DESCRIPTION = "Master NEC4 Engineering and Construction Contract: ECC main options A-F, early warning procedures, compensation events, programme management, X clauses, and collaborative working in building services projects.";

const quickCheckQuestions = [
  {
    id: "nec-option-a",
    question: "What type of contract is NEC4 ECC Option A?",
    options: ["Cost reimbursable", "Target cost", "Priced contract with activity schedule", "Management contract"],
    correctIndex: 2,
    explanation: "Option A is a priced contract with activity schedule. The Contractor is paid the lump sum prices for completed activities, bearing the risk of their price estimates."
  },
  {
    id: "early-warning",
    question: "What is the purpose of an early warning under NEC4?",
    options: ["To claim additional payment", "To notify potential problems before they occur", "To terminate the contract", "To request design changes"],
    correctIndex: 1,
    explanation: "Early warnings are proactive notifications of matters that could affect cost, time, or quality. They enable collaborative problem-solving before issues escalate."
  },
  {
    id: "compensation-event",
    question: "A compensation event under NEC4 typically results in:",
    options: ["Contractor termination", "Assessment of time and cost impact", "Automatic extension of 2 weeks", "Reduction in scope"],
    correctIndex: 1,
    explanation: "Compensation events are assessed to determine their impact on Defined Cost and time. The Prices and Completion Date are adjusted accordingly."
  },
  {
    id: "programme-acceptance",
    question: "Under NEC4, the Project Manager must accept or reject a programme within:",
    options: ["1 week", "2 weeks", "4 weeks", "6 weeks"],
    correctIndex: 1,
    explanation: "The Project Manager has two weeks to accept or notify reasons for non-acceptance of a submitted programme. Silence does not constitute acceptance."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which NEC4 ECC option places most cost risk on the Employer?",
    options: [
      "Option A - Priced contract with activity schedule",
      "Option B - Priced contract with bill of quantities",
      "Option E - Cost reimbursable contract",
      "Option F - Management contract"
    ],
    correctAnswer: 2,
    explanation: "Option E (cost reimbursable) places most risk on the Employer as they pay all Defined Costs plus the Fee. The Contractor has limited incentive to control costs."
  },
  {
    id: 2,
    question: "Under NEC4, who may raise an early warning?",
    options: [
      "Only the Project Manager",
      "Only the Contractor",
      "Either the Project Manager or Contractor",
      "Only the Supervisor"
    ],
    correctAnswer: 2,
    explanation: "Both the Project Manager and Contractor have a duty to notify early warnings. This mutual obligation promotes collaborative risk management."
  },
  {
    id: 3,
    question: "What happens if the Contractor does not notify a compensation event within 8 weeks?",
    options: [
      "The event is automatically accepted",
      "The Contractor loses their right to additional time and money",
      "The Project Manager must decide within 1 week",
      "The matter goes to adjudication"
    ],
    correctAnswer: 1,
    explanation: "The Contractor must notify compensation events within 8 weeks of becoming aware. Failure to do so is a time bar - they lose entitlement to additional time and money."
  },
  {
    id: 4,
    question: "In NEC4, what is the Accepted Programme used for?",
    options: [
      "Only for monitoring progress",
      "Assessing compensation events, monitoring progress, and managing float",
      "Determining liquidated damages only",
      "Identifying defects"
    ],
    correctAnswer: 1,
    explanation: "The Accepted Programme is a key contract document used for assessing compensation events, monitoring progress, identifying float, and managing time risk."
  },
  {
    id: 5,
    question: "Which X clause deals with limitation of liability?",
    options: ["X2", "X13", "X18", "X20"],
    correctAnswer: 2,
    explanation: "X18 (Limitation of liability) allows parties to cap the Contractor's total liability and exclude liability for indirect/consequential losses."
  },
  {
    id: 6,
    question: "Under Option C (target cost), what happens if outturn cost is below the target?",
    options: [
      "Employer keeps all savings",
      "Contractor keeps all savings",
      "Savings are shared between Employer and Contractor",
      "The target is retrospectively reduced"
    ],
    correctAnswer: 2,
    explanation: "Option C shares cost savings (and overruns) between the parties using the share percentages stated in Contract Data. This incentivises efficient delivery."
  },
  {
    id: 7,
    question: "A building services subcontractor on an NEC4 project receives an instruction to install additional lighting. This is likely a:",
    options: [
      "Defect",
      "Early warning matter",
      "Compensation event",
      "Termination event"
    ],
    correctAnswer: 2,
    explanation: "An instruction to change the Works Information (Scope under NEC4) is a compensation event under clause 60.1(1). The subcontractor is entitled to time and cost assessment."
  },
  {
    id: 8,
    question: "What is 'Defined Cost' under NEC4?",
    options: [
      "The tender sum",
      "The cost of components of work as defined in the contract",
      "The employer's budget",
      "The market rate for work"
    ],
    correctAnswer: 1,
    explanation: "Defined Cost is the cost of the components of work calculated using the Shorter Schedule of Cost Components (Options A/B) or full Schedule (Options C/D/E)."
  },
  {
    id: 9,
    question: "The early warning register under NEC4 should be:",
    options: [
      "Kept confidential by the Project Manager",
      "Maintained and reviewed at risk reduction meetings",
      "Only updated at project completion",
      "Submitted to the Employer monthly"
    ],
    correctAnswer: 1,
    explanation: "The early warning register is a living document maintained jointly and reviewed at regular risk reduction meetings to track and mitigate project risks."
  },
  {
    id: 10,
    question: "Under NEC4, terminal float belongs to:",
    options: [
      "The Employer",
      "The Contractor",
      "Neither - it is shared equally",
      "The Project Manager to allocate"
    ],
    correctAnswer: 1,
    explanation: "Terminal float (time between planned Completion and the Completion Date) belongs to the Contractor. Compensation events do not consume Contractor's float."
  },
  {
    id: 11,
    question: "Which NEC4 option is most suitable for a complex building services project where design development continues during construction?",
    options: [
      "Option A - Activity schedule",
      "Option B - Bill of quantities",
      "Option C - Target cost with activity schedule",
      "Option F - Management contract"
    ],
    correctAnswer: 2,
    explanation: "Option C is ideal for complex projects with evolving design. The target provides cost certainty while allowing flexibility, and the pain/gain share incentivises collaboration."
  },
  {
    id: 12,
    question: "A mechanical contractor gives early warning that a chiller delivery will be delayed by the manufacturer. The Project Manager should:",
    options: [
      "Issue a termination certificate",
      "Instruct acceleration",
      "Enter the matter on the early warning register and call a risk reduction meeting",
      "Immediately assess a compensation event"
    ],
    correctAnswer: 2,
    explanation: "Early warnings require collaborative action. The matter should be registered and discussed at a risk reduction meeting to identify mitigation measures."
  }
];

const faqs = [
  {
    question: "What is the difference between NEC3 and NEC4?",
    answer: "NEC4 (published 2017) introduced several improvements over NEC3: clearer language and structure, enhanced programme requirements, explicit treatment of the Scope (formerly Works Information), improved compensation event procedures, and new secondary options. The core collaborative philosophy remains unchanged, but NEC4 addresses ambiguities identified in NEC3 usage."
  },
  {
    question: "When should I use Option A vs Option C for building services?",
    answer: "Use Option A (activity schedule) when the scope is well-defined and unlikely to change significantly - the Contractor takes price risk. Use Option C (target cost) when scope may evolve, design is developing, or collaboration on cost efficiency is desired - risk is shared through the pain/gain mechanism. Option C is increasingly popular for complex M&E packages."
  },
  {
    question: "How does the compensation event process work in practice?",
    answer: "The process follows defined steps: (1) Event occurs or instruction given, (2) Notification within 8 weeks, (3) Project Manager instructs quotation or states event not valid, (4) Contractor submits quotation within 3 weeks, (5) Project Manager responds within 2 weeks - accepting, requesting revision, or making own assessment. Quotations use Defined Cost plus Fee, based on programme impact."
  },
  {
    question: "What happens if the Project Manager fails to respond to a compensation event?",
    answer: "NEC4 includes deemed acceptance provisions. If the Project Manager fails to respond to a quotation within the reply period (2 weeks unless extended), and the Contractor notifies this failure, the quotation is treated as accepted. This prevents Employer delay tactics and ensures timely contract administration."
  },
  {
    question: "How important is the programme under NEC4?",
    answer: "The programme is fundamental to NEC4 operation. It's used to assess compensation events, monitor progress, identify float ownership, and manage risk. The Contractor must submit programmes showing method, sequence, timing, float, and resources. A current Accepted Programme is essential - without one, assessing time impacts becomes extremely difficult."
  },
  {
    question: "Can X clauses be mixed and matched?",
    answer: "Yes, X clauses (secondary options) can be selected as needed to tailor the contract. Common selections include X2 (changes in law), X5 (sectional completion), X7 (delay damages), X13 (performance bond), and X18 (limitation of liability). Care is needed to ensure selected clauses work together coherently and suit project requirements."
  }
];

const HNCModule5Section2_3 = () => {
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
            <span>Module 5.2.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            NEC Contracts
          </h1>
          <p className="text-white/80">
            NEC4 ECC main options, early warning procedures, compensation events, and programme management for building services projects
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>NEC4 ECC:</strong> Collaborative contract with 6 main options (A-F)</li>
              <li className="pl-1"><strong>Early warning:</strong> Proactive risk notification system</li>
              <li className="pl-1"><strong>Compensation events:</strong> Mechanism for adjusting time and cost</li>
              <li className="pl-1"><strong>Programme:</strong> Central to contract administration</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>M&E packages:</strong> Often procured under NEC subcontracts</li>
              <li className="pl-1"><strong>Target cost:</strong> Popular for complex services installations</li>
              <li className="pl-1"><strong>Coordination:</strong> Early warning supports interface management</li>
              <li className="pl-1"><strong>Design development:</strong> Compensation events handle changes</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand NEC4 ECC structure and philosophy",
              "Compare and select appropriate main options (A-F)",
              "Apply early warning procedures effectively",
              "Navigate the compensation event process",
              "Manage programme requirements under NEC4",
              "Select and apply relevant X clauses"
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

        {/* Section 1: NEC4 ECC Structure and Options */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            NEC4 ECC Structure and Main Options
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The NEC4 Engineering and Construction Contract (ECC) is a collaborative contract form widely used
              in UK construction, including major building services projects. Its structure differs fundamentally
              from traditional forms like JCT, emphasising proactive management and clear risk allocation.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Core NEC4 Principles:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Mutual trust and cooperation:</strong> Parties must act in a spirit of collaboration</li>
                <li className="pl-1"><strong>Proactive management:</strong> Early warning system prevents disputes</li>
                <li className="pl-1"><strong>Clear procedures:</strong> Defined timescales for all actions</li>
                <li className="pl-1"><strong>Flexibility:</strong> Main options allocate risk differently</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Main Options A-F Comparison</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Option</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Risk Allocation</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Best For</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">A</td>
                      <td className="border border-white/10 px-3 py-2">Priced - Activity Schedule</td>
                      <td className="border border-white/10 px-3 py-2">Contractor bears price risk</td>
                      <td className="border border-white/10 px-3 py-2">Well-defined scope, competitive market</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">B</td>
                      <td className="border border-white/10 px-3 py-2">Priced - Bill of Quantities</td>
                      <td className="border border-white/10 px-3 py-2">Quantity risk with Employer</td>
                      <td className="border border-white/10 px-3 py-2">Scope defined but quantities uncertain</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">C</td>
                      <td className="border border-white/10 px-3 py-2">Target - Activity Schedule</td>
                      <td className="border border-white/10 px-3 py-2">Shared via pain/gain mechanism</td>
                      <td className="border border-white/10 px-3 py-2">Complex projects, evolving design</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">D</td>
                      <td className="border border-white/10 px-3 py-2">Target - Bill of Quantities</td>
                      <td className="border border-white/10 px-3 py-2">Shared, with remeasurement</td>
                      <td className="border border-white/10 px-3 py-2">Variable quantities, collaborative delivery</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">E</td>
                      <td className="border border-white/10 px-3 py-2">Cost Reimbursable</td>
                      <td className="border border-white/10 px-3 py-2">Employer bears cost risk</td>
                      <td className="border border-white/10 px-3 py-2">Highly uncertain scope, emergency works</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">F</td>
                      <td className="border border-white/10 px-3 py-2">Management Contract</td>
                      <td className="border border-white/10 px-3 py-2">Via subcontracts</td>
                      <td className="border border-white/10 px-3 py-2">Multiple specialist packages</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Building Services Example - Option A</p>
                <p className="text-sm text-white/90">
                  A straightforward lighting installation package with clear specification and quantities would suit
                  Option A. The M&E subcontractor prices activities (supply luminaires, first fix, second fix, commissioning)
                  and is paid on completion of each activity.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Building Services Example - Option C</p>
                <p className="text-sm text-white/90">
                  A complex HVAC installation where design will develop during construction suits Option C. The target
                  is agreed, but as design evolves, the pain/gain share incentivises the contractor to deliver efficiently
                  whilst the employer shares some risk.
                </p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Selection principle:</strong> Match the option to project risk profile. Greater uncertainty warrants more risk sharing (Options C/D/E).
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Early Warning Procedures */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Early Warning Procedures
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The early warning system is a cornerstone of NEC's collaborative approach. Unlike traditional contracts
              where parties often conceal problems until claiming, NEC requires proactive disclosure of potential issues.
            </p>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Early Warning Definition (Clause 15)</p>
              <p className="text-sm text-white">
                Either Party must give an early warning by notifying the other as soon as they become aware of any matter
                which could: <strong>increase the total of the Prices</strong>, <strong>delay Completion</strong>,
                <strong>delay meeting a Key Date</strong>, or <strong>impair the performance of the works in use</strong>.
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Early Warning Process</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Step 1:</strong> Party becomes aware of potential issue</li>
                <li className="pl-1"><strong>Step 2:</strong> Notification given immediately to other party</li>
                <li className="pl-1"><strong>Step 3:</strong> Matter entered on Early Warning Register</li>
                <li className="pl-1"><strong>Step 4:</strong> Risk reduction meeting called (either party may request)</li>
                <li className="pl-1"><strong>Step 5:</strong> Collaborative discussion of solutions and mitigations</li>
                <li className="pl-1"><strong>Step 6:</strong> Actions agreed and implemented</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Risk Reduction Meeting Actions</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Discussion Items</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Example (M&E Context)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Ways to avoid or reduce risk</td>
                      <td className="border border-white/10 px-3 py-2">Alternative chiller manufacturer if lead time issue</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Actions to take</td>
                      <td className="border border-white/10 px-3 py-2">Re-sequence installation to suit material delivery</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Who takes action</td>
                      <td className="border border-white/10 px-3 py-2">Contractor to expedite procurement</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Changes to Scope required</td>
                      <td className="border border-white/10 px-3 py-2">Modify AHU specification if preferred unit unavailable</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Other effects</td>
                      <td className="border border-white/10 px-3 py-2">Impact on commissioning programme</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Failure to Give Early Warning</p>
              <p className="text-sm text-white">
                If the Contractor fails to give an early warning they were aware of, and the matter becomes a compensation
                event, the event is assessed as if they had given early warning. This reduces any additional cost
                entitlement - a significant financial penalty for withholding information.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-white/5 my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Building Services Scenario</p>
              <p className="text-sm text-white/90">
                An electrical subcontractor notices the architect's ceiling grid layout conflicts with the containment
                routes shown in the M&E coordination drawings. Rather than waiting for installation and claiming delay,
                they raise an early warning. A risk reduction meeting identifies the clash early, allowing the design
                team to resolve it without site disruption. This is NEC working as intended.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Best practice:</strong> Raise early warnings liberally. It is better to raise an early warning that proves unnecessary than to withhold one that was needed.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Compensation Events */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Compensation Events
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Compensation events are NEC4's mechanism for adjusting the contract in response to events that
              entitle the Contractor to changes in time and/or cost. They replace the variation and claim processes
              found in traditional contracts.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Compensation Events (Clause 60.1)</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>60.1(1):</strong> Project Manager gives instruction changing the Scope</li>
                <li className="pl-1"><strong>60.1(2):</strong> Employer does not allow access by access date</li>
                <li className="pl-1"><strong>60.1(3):</strong> Employer does not provide something by date shown in Accepted Programme</li>
                <li className="pl-1"><strong>60.1(5):</strong> Project Manager or Supervisor does not reply within timescales</li>
                <li className="pl-1"><strong>60.1(12):</strong> Physical conditions more adverse than experienced Contractor would have allowed for</li>
                <li className="pl-1"><strong>60.1(18):</strong> Breach of contract by Employer</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Compensation Event Process</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Step</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Action</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Timescale</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">1</td>
                      <td className="border border-white/10 px-3 py-2">Event occurs or instruction issued</td>
                      <td className="border border-white/10 px-3 py-2">-</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">2</td>
                      <td className="border border-white/10 px-3 py-2">Contractor notifies compensation event</td>
                      <td className="border border-white/10 px-3 py-2">Within 8 weeks (time bar)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">3</td>
                      <td className="border border-white/10 px-3 py-2">PM responds - valid or not valid</td>
                      <td className="border border-white/10 px-3 py-2">Within 1 week</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">4</td>
                      <td className="border border-white/10 px-3 py-2">PM instructs quotation (if valid)</td>
                      <td className="border border-white/10 px-3 py-2">Within 1 week</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">5</td>
                      <td className="border border-white/10 px-3 py-2">Contractor submits quotation</td>
                      <td className="border border-white/10 px-3 py-2">Within 3 weeks</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">6</td>
                      <td className="border border-white/10 px-3 py-2">PM accepts, requests revision, or makes own assessment</td>
                      <td className="border border-white/10 px-3 py-2">Within 2 weeks</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">7</td>
                      <td className="border border-white/10 px-3 py-2">Prices and Completion Date adjusted</td>
                      <td className="border border-white/10 px-3 py-2">Implementation</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Quotation Assessment</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Cost element:</strong> Change in Defined Cost (actual/forecast) plus Fee percentage</li>
                <li className="pl-1"><strong>Time element:</strong> Delay to planned Completion shown on Accepted Programme</li>
                <li className="pl-1"><strong>Method:</strong> Based on effect on programme, not arbitrary allocation</li>
                <li className="pl-1"><strong>Forecast basis:</strong> Assessed at date of assessment, not retrospectively</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">M&E Example - Scope Change</p>
                <p className="text-sm text-white/90">
                  The architect instructs additional power outlets in the meeting rooms. The electrical contractor
                  notifies this as CE 60.1(1). They submit a quotation showing additional cable, containment, outlets,
                  labour hours (Defined Cost) plus Fee, and demonstrate 3-day delay to the lighting commissioning
                  milestone on their programme.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">M&E Example - Access</p>
                <p className="text-sm text-white/90">
                  The mechanical contractor cannot access the plant room on the stated date because builder's work
                  is incomplete. This is CE 60.1(2). The quotation includes standing time for the ductwork installation
                  team, re-mobilisation costs, and demonstrates critical path delay using the Accepted Programme.
                </p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Critical rule:</strong> The 8-week notification time bar is absolute. Contractors who miss it lose entitlement regardless of merit.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Programme Management and X Clauses */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Programme Management and Secondary Options
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The programme is central to NEC4 operation, far more than a scheduling tool. It serves as the
              baseline for assessing compensation events, managing float, and demonstrating the effect of
              changes on completion.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Programme Requirements (Clause 31)</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Starting date and Completion Date:</strong> Contract milestones</li>
                <li className="pl-1"><strong>Planned Completion:</strong> When Contractor plans to finish (may include float)</li>
                <li className="pl-1"><strong>Order and timing:</strong> Sequence of operations</li>
                <li className="pl-1"><strong>Dates for work by Others:</strong> Interfaces with other contractors</li>
                <li className="pl-1"><strong>Float and time risk allowances:</strong> Contingency shown explicitly</li>
                <li className="pl-1"><strong>Health and safety requirements:</strong> Safe sequencing</li>
                <li className="pl-1"><strong>Method statements:</strong> How work will be executed</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Float Ownership</p>
              <p className="text-sm text-white/90 mb-2">
                Under NEC4, <strong>terminal float</strong> (time between planned Completion and the Completion Date)
                belongs to the Contractor. When assessing compensation events, the effect is measured against
                planned Completion - the Contractor keeps their float protection.
              </p>
              <p className="text-sm text-white/70">
                Example: If planned Completion is Week 48 and Completion Date is Week 52, a CE causing 3 weeks
                delay moves planned Completion to Week 51 and Completion Date to Week 55 - the 4-week float is preserved.
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Programme Acceptance</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Reason for Non-Acceptance</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Does not comply with contract</td>
                      <td className="border border-white/10 px-3 py-2">Completion shown after Completion Date</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Does not show required information</td>
                      <td className="border border-white/10 px-3 py-2">Missing resource allocation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Does not represent Contractor's plans</td>
                      <td className="border border-white/10 px-3 py-2">Unrealistic durations</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Does not show effect of compensation events</td>
                      <td className="border border-white/10 px-3 py-2">Accepted CEs not incorporated</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Secondary Options (X Clauses)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Clause</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Purpose</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Building Services Relevance</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">X2</td>
                      <td className="border border-white/10 px-3 py-2">Changes in law</td>
                      <td className="border border-white/10 px-3 py-2">Building Regulations amendments</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">X5</td>
                      <td className="border border-white/10 px-3 py-2">Sectional completion</td>
                      <td className="border border-white/10 px-3 py-2">Phased handover of floors/zones</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">X7</td>
                      <td className="border border-white/10 px-3 py-2">Delay damages</td>
                      <td className="border border-white/10 px-3 py-2">Liquidated damages for late completion</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">X10</td>
                      <td className="border border-white/10 px-3 py-2">Information modelling</td>
                      <td className="border border-white/10 px-3 py-2">BIM requirements for M&E models</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">X13</td>
                      <td className="border border-white/10 px-3 py-2">Performance bond</td>
                      <td className="border border-white/10 px-3 py-2">Security for major packages</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">X15</td>
                      <td className="border border-white/10 px-3 py-2">Contractor's design</td>
                      <td className="border border-white/10 px-3 py-2">Design and build M&E elements</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">X18</td>
                      <td className="border border-white/10 px-3 py-2">Limitation of liability</td>
                      <td className="border border-white/10 px-3 py-2">Caps total and consequential losses</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">X20</td>
                      <td className="border border-white/10 px-3 py-2">Key performance indicators</td>
                      <td className="border border-white/10 px-3 py-2">Quality and performance targets</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5 my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Collaborative Working in Practice</p>
              <p className="text-sm text-white/90">
                NEC4's strength lies in its collaborative mechanisms. On a hospital M&E project, the electrical
                contractor raises an early warning about switchgear lead times. At the risk reduction meeting,
                the team agrees to resequence the installation, starting in a different zone. The programme is
                updated, showing the mitigation. When a later scope change occurs, the compensation event quotation
                reflects the current (mitigated) programme - everyone benefits from the proactive approach.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Programme tip:</strong> Update and resubmit the programme regularly. An outdated programme makes compensation event assessment extremely difficult and often disadvantages the Contractor.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Option Selection</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> A 10-storey office building requires full M&E fit-out. Design is 70% complete with some elements still developing. Budget is tight but firm.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Analysis:</p>
                <p>- Design not fully complete → scope may change</p>
                <p>- Budget sensitivity → need cost control incentive</p>
                <p>- Complexity → benefits from collaboration</p>
                <p className="mt-2">Recommendation: <strong>Option C (Target Cost)</strong></p>
                <p className="mt-2 text-white/60">Pain/gain share motivates Contractor to control costs</p>
                <p className="text-white/60">while target adjusts for scope changes via CEs.</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Compensation Event Quotation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> PM instructs additional fan coil units in meeting rooms. Contractor to assess.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Defined Cost assessment (Option A):</p>
                <p>Materials: 6 × FCU @ £850 = £5,100</p>
                <p>Pipework and valves = £1,200</p>
                <p>Labour: 48 hours @ £45/hr = £2,160</p>
                <p>Subcontract commissioning = £400</p>
                <p className="border-t border-white/20 mt-2 pt-2">Total Defined Cost = £8,860</p>
                <p>Fee (stated in Contract Data 12%) = £1,063</p>
                <p className="font-bold">Total CE quotation = £9,923</p>
                <p className="mt-2 text-white/60">Time: 5 days on critical path (demonstrated on programme)</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Early Warning Response</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Electrical subcontractor identifies that cable delivery from overseas will be 4 weeks late due to shipping delays.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Early Warning issued immediately</p>
                <p className="mt-2">Risk Reduction Meeting actions agreed:</p>
                <p>1. Contractor to source alternative UK supplier</p>
                <p>2. Accept alternative cable type (equivalent spec)</p>
                <p>3. Resequence installation - start West wing</p>
                <p>4. Update programme to reflect new sequence</p>
                <p className="mt-2 text-green-400">→ Result: Completion date protected through collaboration</p>
                <p className="text-white/60">No compensation event required - risk mitigated</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">NEC4 Administration Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Maintain Early Warning Register and review at regular meetings</li>
                <li className="pl-1">Track all notification timescales rigorously (8 weeks CE, 2 weeks PM response)</li>
                <li className="pl-1">Keep programme current - submit revisions when circumstances change</li>
                <li className="pl-1">Document all instructions and communications in writing</li>
                <li className="pl-1">Use contract terminology (Scope, Prices, Completion Date)</li>
                <li className="pl-1">Attend risk reduction meetings proactively</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Timescales to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">CE notification: <strong>8 weeks</strong> (absolute time bar)</li>
                <li className="pl-1">PM validity response: <strong>1 week</strong></li>
                <li className="pl-1">Contractor quotation: <strong>3 weeks</strong></li>
                <li className="pl-1">PM quotation response: <strong>2 weeks</strong></li>
                <li className="pl-1">Programme acceptance: <strong>2 weeks</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Missing the 8-week bar</strong> — Set calendar reminders for all potential CEs</li>
                <li className="pl-1"><strong>Treating NEC like JCT</strong> — Different philosophy requires different approach</li>
                <li className="pl-1"><strong>Letting programme lapse</strong> — Outdated programme damages CE assessments</li>
                <li className="pl-1"><strong>Withholding early warnings</strong> — Damages trust and reduces entitlement</li>
                <li className="pl-1"><strong>Poor record keeping</strong> — NEC requires documented communications</li>
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
                <p className="font-medium text-white mb-1">Main Options</p>
                <ul className="space-y-0.5">
                  <li>A - Priced, activity schedule (Contractor risk)</li>
                  <li>B - Priced, bill of quantities</li>
                  <li>C - Target cost (shared risk - popular)</li>
                  <li>D - Target cost with BoQ</li>
                  <li>E - Cost reimbursable (Employer risk)</li>
                  <li>F - Management contract</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Critical Timescales</p>
                <ul className="space-y-0.5">
                  <li>CE notification - 8 weeks (time bar)</li>
                  <li>PM validity response - 1 week</li>
                  <li>Quotation submission - 3 weeks</li>
                  <li>PM quotation response - 2 weeks</li>
                  <li>Programme acceptance - 2 weeks</li>
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
            <Link to="../h-n-c-module5-section2-4">
              Next: Contract Administration
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule5Section2_3;
