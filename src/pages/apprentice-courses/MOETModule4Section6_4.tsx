import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Corrective vs Preventive Actions - MOET Module 4 Section 6.4";
const DESCRIPTION = "Understanding corrective and preventive actions following root cause analysis, including CAPA systems, hierarchy of corrective measures, verification of effectiveness and continuous improvement for ST1426 maintenance technicians.";

const quickCheckQuestions = [
  {
    id: "corrective-vs-preventive",
    question: "The fundamental difference between a corrective action and a preventive action is:",
    options: [
      "Corrective actions cost more than preventive actions",
      "A corrective action fixes the immediate problem; a preventive action addresses the root cause to stop the problem recurring",
      "Preventive actions are only done during planned shutdowns",
      "Corrective actions are always temporary"
    ],
    correctIndex: 1,
    explanation: "A corrective action addresses the immediate fault — replacing a failed component, repairing the damage, restoring the system to operation. A preventive action addresses the underlying root cause to prevent the fault from happening again — changing a maintenance procedure, modifying the design, improving training. Both are necessary: corrective actions restore service, preventive actions improve reliability."
  },
  {
    id: "action-hierarchy",
    question: "When selecting preventive actions, the most effective approach (in order of preference) is:",
    options: [
      "Train the operator, then add a warning label",
      "Eliminate the hazard through design change, then reduce the risk through engineering controls, then manage through procedural controls, and use administrative controls as a last resort",
      "Add more inspections and hope the fault does not recur",
      "Replace the equipment with an identical unit"
    ],
    correctIndex: 1,
    explanation: "The hierarchy of controls applies to preventive actions just as it does to safety management. Elimination (redesign to remove the failure mode) is most effective. Engineering controls (add protection, improve the specification) are next. Procedural controls (change the maintenance method, improve work instructions) are less reliable because they depend on human compliance. Administrative controls (training, awareness) are the least effective on their own but support the other levels."
  },
  {
    id: "capa-verification",
    question: "After implementing a corrective or preventive action, verification is essential because:",
    options: [
      "It creates more documentation",
      "It confirms that the action has actually been implemented, is effective in preventing recurrence, and has not introduced new problems",
      "It is only required for expensive repairs",
      "Verification is optional if the repair was straightforward"
    ],
    correctIndex: 1,
    explanation: "Without verification, you have no evidence that the action was effective. A corrective action may have been implemented incorrectly. A preventive action may not address the actual root cause. A modification may introduce new failure modes. Verification — through monitoring, testing and review after a defined period — closes the loop and confirms that the intended improvement has been achieved."
  },
  {
    id: "temporary-permanent",
    question: "A temporary repair (get-you-running fix) is acceptable when:",
    options: [
      "It is always acceptable as a permanent solution",
      "It safely restores operation in the short term, is documented with clear limitations, and a permanent corrective action is planned and tracked to completion",
      "The supervisor says it is acceptable regardless of safety implications",
      "The equipment is not critical to production"
    ],
    correctIndex: 1,
    explanation: "Temporary repairs are sometimes necessary to restore critical operations, but they must be carried out safely, documented clearly (including any limitations on operation), and followed by a planned permanent repair within a defined timescale. A temporary repair that is not tracked often becomes a permanent condition — one of the most common causes of reliability problems in industrial installations."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "A CAPA system (Corrective Action / Preventive Action) is:",
    options: [
      "A type of electrical protection device",
      "A structured management system that ensures root causes are identified, corrective and preventive actions are defined, implemented, verified and documented",
      "A training programme for apprentices",
      "A type of maintenance contract"
    ],
    correctAnswer: 1,
    explanation: "A CAPA system is a quality management tool that formalises the process of responding to faults, nonconformances and incidents. It ensures that each event is investigated, root causes are identified, appropriate corrective and preventive actions are defined, responsibilities and timescales are assigned, implementation is tracked, and effectiveness is verified. CAPA is a core requirement of quality management standards such as ISO 9001."
  },
  {
    id: 2,
    question: "Replacing a failed motor bearing without investigating why it failed is an example of:",
    options: [
      "Excellent maintenance practice",
      "A corrective action only — it fixes the immediate problem but does not prevent recurrence because the root cause has not been addressed",
      "A preventive action",
      "Root cause analysis"
    ],
    correctAnswer: 1,
    explanation: "Simply replacing the failed component is a corrective action that restores the equipment to service. However, without investigating and addressing the root cause (misalignment, inadequate lubrication, wrong bearing type, excessive load), the replacement bearing is likely to fail in the same way. Effective maintenance requires both corrective actions (fix the problem now) and preventive actions (stop it happening again)."
  },
  {
    id: 3,
    question: "A design modification to eliminate a recurring failure mode is classified as:",
    options: [
      "The least effective type of preventive action",
      "The most effective type of preventive action — elimination removes the failure mode entirely rather than relying on human intervention to manage it",
      "A corrective action only",
      "An unnecessary expense"
    ],
    correctAnswer: 1,
    explanation: "Design-out maintenance (elimination) is the most effective preventive action because it removes the failure mode entirely. For example, replacing a frequently failing seal arrangement with a sealless pump design eliminates seal failure. Elimination does not depend on human compliance with procedures or inspection schedules — once implemented, the improvement is permanent."
  },
  {
    id: 4,
    question: "Adding a vibration monitoring system to a critical motor following a bearing failure is an example of:",
    options: [
      "A corrective action",
      "A preventive action using engineering controls — it does not prevent the failure mode but enables early detection so that planned intervention can occur before catastrophic failure",
      "An administrative control",
      "An elimination measure"
    ],
    correctAnswer: 1,
    explanation: "Adding condition monitoring is an engineering control preventive action. It does not eliminate the possibility of bearing deterioration, but it provides early warning of developing faults, allowing planned maintenance before failure occurs. This reduces the risk of unplanned downtime and secondary damage, but still requires human action (monitoring, analysis, scheduling maintenance) to be effective."
  },
  {
    id: 5,
    question: "Updating a maintenance procedure following a fault investigation is a preventive action that addresses which category of root cause?",
    options: [
      "Machine (equipment design)",
      "Method (procedure) — it improves how the work is done to prevent the same error or omission recurring",
      "Material (component quality)",
      "Mother Nature (environment)"
    ],
    correctAnswer: 1,
    explanation: "Procedure updates are Method-category preventive actions. If the root cause analysis identified that the existing procedure was inadequate (missing a critical step, wrong sequence, unclear instruction), updating the procedure addresses this root cause directly. However, procedure-based preventive actions are only effective if the updated procedure is communicated, trained and followed — they depend on human compliance."
  },
  {
    id: 6,
    question: "A preventive action that relies solely on 'retraining the operator' is considered:",
    options: [
      "The most effective type of preventive action",
      "A relatively weak preventive action because it relies entirely on human behaviour — more effective actions would also include engineering or procedural controls",
      "Unnecessary if the operator has been working for more than five years",
      "The only preventive action needed for any human error"
    ],
    correctAnswer: 1,
    explanation: "Training alone is an administrative control — the lowest level in the hierarchy of controls. People forget, get distracted, take shortcuts, and make mistakes regardless of training. Effective preventive actions combine training with engineering controls (design out the possibility of error), procedural controls (clear, auditable work instructions) and verification steps (independent checks of critical tasks)."
  },
  {
    id: 7,
    question: "The timescale for implementing a preventive action should be based on:",
    options: [
      "Whenever it is convenient",
      "The risk of recurrence, the severity of consequences, the availability of resources and the opportunity to implement (e.g., next planned shutdown)",
      "Only the cost of the action",
      "The preference of the maintenance manager"
    ],
    correctAnswer: 1,
    explanation: "Preventive action timescales should be risk-based. High-risk, high-consequence faults require urgent preventive action. Lower-risk faults can be addressed at the next convenient opportunity (planned shutdown, next PM visit). The timescale should be documented, assigned to a responsible person, and tracked to completion. An untracked preventive action is likely to be forgotten."
  },
  {
    id: 8,
    question: "When a temporary repair is implemented, it is essential to:",
    options: [
      "Treat it as a permanent repair and close the work order",
      "Document the temporary nature of the repair, specify any operational limitations, set a deadline for permanent repair, and track it as an open action",
      "Not tell anyone it is temporary to avoid unnecessary concern",
      "Remove all safety devices to allow the temporary repair to work"
    ],
    correctAnswer: 1,
    explanation: "Temporary repairs must be clearly documented as temporary, with any operational limitations specified (reduced load, restricted speed, increased monitoring). A follow-up work order for the permanent repair should be raised with a defined deadline, and the temporary repair should be tracked as an open action until the permanent repair is completed. Undocumented temporary repairs frequently become forgotten permanent conditions."
  },
  {
    id: 9,
    question: "The effectiveness of a preventive action is best verified by:",
    options: [
      "Assuming it worked because the action was implemented",
      "Monitoring the equipment after implementation to confirm the fault does not recur within a defined review period, and checking that no new problems have been introduced",
      "Asking the technician if they think it will work",
      "Waiting for the equipment to fail again"
    ],
    correctAnswer: 1,
    explanation: "Verification requires evidence, not assumption. After implementing a preventive action, monitor the equipment for a defined period (typically 3-6 months, depending on the fault frequency) to confirm that the fault does not recur. Also check that the action has not introduced new failure modes or unintended consequences. Only after successful verification should the action be formally closed as effective."
  },
  {
    id: 10,
    question: "Systemic preventive actions (those applied across multiple similar assets) are particularly valuable when:",
    options: [
      "Only one piece of equipment has ever experienced the fault",
      "The root cause analysis reveals a cause that could affect other equipment of the same type, in the same environment, or maintained to the same procedure",
      "The organisation wants to spend more money on maintenance",
      "An external audit is approaching"
    ],
    correctAnswer: 1,
    explanation: "If a root cause could affect other similar equipment, the preventive action should be applied systemically — not just to the equipment that failed. For example, if inadequate lubrication caused a motor bearing failure and other motors are on the same PM schedule, all similar motors should have their lubrication schedules reviewed. This proactive approach prevents the same failure from occurring elsewhere."
  },
  {
    id: 11,
    question: "Under ST1426, the ability to recommend and implement preventive actions demonstrates:",
    options: [
      "Only technical repair skills",
      "The apprentice's understanding of continuous improvement, reliability engineering and the proactive maintenance mindset required of a competent maintenance technician",
      "Only administrative skills",
      "Only the ability to follow instructions"
    ],
    correctAnswer: 1,
    explanation: "ST1426 explicitly values continuous improvement. An apprentice who not only fixes faults but also identifies and recommends preventive actions demonstrates a proactive, reliability-focused mindset. The End Point Assessment evaluates whether the apprentice can go beyond reactive repair to contribute to improved equipment reliability — this is the hallmark of a competent maintenance technician."
  },
  {
    id: 12,
    question: "A Pareto analysis of historical fault data helps prioritise preventive actions by:",
    options: [
      "Listing faults in alphabetical order",
      "Identifying the vital few causes that account for the majority of failures (the 80/20 rule), allowing resources to be focused where they will have the greatest impact",
      "Counting the total number of faults",
      "Measuring the cost of each individual fault"
    ],
    correctAnswer: 1,
    explanation: "Pareto analysis ranks causes by frequency or impact, revealing that typically 20% of causes account for 80% of failures. By addressing these vital few causes first, the organisation achieves the greatest reliability improvement with the least resource expenditure. Pareto analysis uses CMMS data — another reason why accurate fault documentation is essential."
  }
];

const faqs = [
  {
    question: "How do I decide whether a fault warrants a preventive action or just a corrective repair?",
    answer: "Consider three factors: frequency (has this fault occurred before or is it likely to recur?), severity (what are the consequences in terms of safety, downtime and cost?), and detectability (would the fault be detected before causing harm?). If the fault has occurred before, could recur, and has significant consequences, a preventive action is warranted. Even for first-time faults, if the root cause analysis reveals a systemic weakness, preventive action is justified to prevent a first occurrence on other similar equipment."
  },
  {
    question: "What if the ideal preventive action is too expensive or complex to implement immediately?",
    answer: "Preventive actions should be risk-proportionate and practical. If the ideal solution (e.g., a design modification) is not immediately feasible, implement interim measures that reduce the risk while the permanent solution is planned and funded. For example, if replacing a motor with an inverter-rated model is not immediately affordable, implementing condition monitoring and a more frequent lubrication schedule provides interim protection. Document the rationale and track the long-term action to completion."
  },
  {
    question: "How do I write an effective preventive action recommendation?",
    answer: "An effective recommendation is specific (what exactly should be done), actionable (practical to implement with available resources), measurable (you can verify whether it has been done and whether it is effective), justified (linked to the root cause analysis findings), and time-bound (with a realistic deadline). For example: 'Increase lubrication frequency for all conveyor drive motors from 6-monthly to quarterly, effective from the next PM cycle (April 2026), due to the high dust levels in the processing hall contributing to accelerated bearing wear.' This gives clear direction, justification and timescale."
  },
  {
    question: "What is the difference between corrective maintenance and a corrective action?",
    answer: "Corrective maintenance is reactive maintenance performed to restore a failed item to working condition (fixing a breakdown). A corrective action in the CAPA context is a planned response to a root cause analysis finding — it may include the immediate repair but also encompasses the actions taken to address the root cause and prevent recurrence. A corrective action is broader and more structured than simply performing a repair."
  },
  {
    question: "How does CAPA relate to ISO 9001 and maintenance management?",
    answer: "ISO 9001 (quality management systems) requires organisations to have a documented CAPA process for addressing nonconformances. In a maintenance context, equipment faults are nonconformances against the desired state (reliable, safe operation). The CAPA process ensures that faults are not just repaired but investigated, root causes identified, and preventive actions implemented to improve reliability. Organisations certified to ISO 9001 will audit their maintenance CAPA process regularly."
  }
];

const MOETModule4Section6_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Shield className="h-4 w-4" />
            <span>Module 4.6.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Corrective vs Preventive Actions
          </h1>
          <p className="text-white/80">
            Implementing effective actions following root cause analysis to prevent fault recurrence
          </p>
        </header>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Corrective:</strong> Fixes the immediate problem — replaces, repairs, restores</li>
              <li className="pl-1"><strong>Preventive:</strong> Addresses root cause — changes procedure, design, schedule</li>
              <li className="pl-1"><strong>Hierarchy:</strong> Eliminate &gt; engineering control &gt; procedural &gt; administrative</li>
              <li className="pl-1"><strong>Verify:</strong> Monitor to confirm actions prevent recurrence</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Maintenance Technician Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Both needed:</strong> Corrective restores service, preventive improves reliability</li>
              <li className="pl-1"><strong>CAPA system:</strong> Formalised process for tracking actions to completion</li>
              <li className="pl-1"><strong>Temporary repairs:</strong> Must be documented, limited and tracked</li>
              <li className="pl-1"><strong>ST1426:</strong> Continuous improvement is a core EPA competence</li>
            </ul>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Distinguish between corrective actions and preventive actions in maintenance",
              "Apply the hierarchy of controls to select the most effective preventive measures",
              "Understand CAPA systems and their role in maintenance quality management",
              "Manage temporary repairs with proper documentation and follow-up tracking",
              "Verify the effectiveness of corrective and preventive actions after implementation",
              "Write clear, actionable recommendations that link root cause findings to preventive measures"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Understanding Corrective and Preventive Actions
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Every fault investigation should result in two types of action: a corrective action that fixes the immediate problem and restores the equipment to service, and a preventive action that addresses the root cause to prevent the same fault from recurring. These two types of action are complementary — corrective actions deal with the present, preventive actions protect the future.
            </p>
            <p>
              In practice, most maintenance organisations are good at corrective actions (replacing failed components, repairing damage) but weaker at preventive actions (changing procedures, modifying designs, improving maintenance strategies). This imbalance leads to the frustrating cycle of recurring faults — the same equipment fails repeatedly because the root cause is never addressed. Breaking this cycle requires a disciplined approach to root cause analysis followed by effective preventive actions.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Corrective vs Preventive Actions</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Aspect</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Corrective Action</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Preventive Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Purpose</td>
                      <td className="border border-white/10 px-3 py-2">Fix the immediate problem</td>
                      <td className="border border-white/10 px-3 py-2">Prevent recurrence</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Timing</td>
                      <td className="border border-white/10 px-3 py-2">Immediate or urgent</td>
                      <td className="border border-white/10 px-3 py-2">Planned, may take longer</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Addresses</td>
                      <td className="border border-white/10 px-3 py-2">The symptom or immediate cause</td>
                      <td className="border border-white/10 px-3 py-2">The root cause</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Example</td>
                      <td className="border border-white/10 px-3 py-2">Replace failed bearing</td>
                      <td className="border border-white/10 px-3 py-2">Improve lubrication schedule, add monitoring</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Impact</td>
                      <td className="border border-white/10 px-3 py-2">Restores this equipment now</td>
                      <td className="border border-white/10 px-3 py-2">Improves reliability of this and similar equipment</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> A maintenance organisation that only performs corrective actions is permanently reactive — always responding to failures. One that also implements preventive actions becomes progressively more proactive, with fewer failures, less downtime and lower costs over time. This is the transition from reactive to reliability-centred maintenance.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            The Hierarchy of Preventive Controls
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Not all preventive actions are equally effective. The hierarchy of controls — a well-established principle in safety management — applies equally to maintenance reliability. Actions higher in the hierarchy are more effective because they are less dependent on human compliance.
            </p>

            <div className="my-6 space-y-3">
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                <h3 className="text-sm font-medium text-green-400 mb-2">Level 1 — Elimination (Most Effective)</h3>
                <p className="text-sm text-white">
                  Remove the failure mode entirely through design change. Example: Replace a motor-driven pump with a seal-less magnetic drive pump — eliminates seal failure entirely. Once implemented, no ongoing human intervention is required.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                <h3 className="text-sm font-medium text-blue-400 mb-2">Level 2 — Engineering Controls</h3>
                <p className="text-sm text-white">
                  Add protection or detection systems. Examples: Install vibration monitoring, add a cooling fan, fit an improved IP-rated enclosure, upgrade the motor to inverter-rated. These reduce risk but may still require human response to warnings.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                <h3 className="text-sm font-medium text-yellow-400 mb-2">Level 3 — Procedural Controls</h3>
                <p className="text-sm text-white">
                  Change how work is done. Examples: Update the PM procedure, increase inspection frequency, add a lubrication task, revise the work instruction. Effective only if procedures are followed consistently — depends on human compliance.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
                <h3 className="text-sm font-medium text-orange-400 mb-2">Level 4 — Administrative Controls (Least Effective Alone)</h3>
                <p className="text-sm text-white">
                  Training, awareness, signage, supervision. Examples: Retrain operators, issue a safety alert, add a warning label. These are the least reliable because they depend entirely on human memory, attention and compliance. Most effective when combined with higher-level controls.
                </p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Practical principle:</strong> Always aim for the highest level of control that is reasonably practicable. If elimination is not feasible, implement engineering controls. If those are not sufficient, add procedural controls. Use administrative controls to support the other levels, not as the sole preventive measure.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            CAPA Systems and Action Tracking
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A Corrective Action / Preventive Action (CAPA) system provides the formal framework for managing actions from identification through to verified completion. Without a CAPA system, actions get agreed in meetings but never implemented, temporary repairs become permanent, and the same faults recur indefinitely. The CAPA process ensures accountability, tracking and verification.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The CAPA Process</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Identify:</strong> The fault or nonconformance is reported and recorded</li>
                <li className="pl-1"><strong>Investigate:</strong> Root cause analysis is conducted (5 Whys, fishbone, fault tree)</li>
                <li className="pl-1"><strong>Define actions:</strong> Corrective and preventive actions are specified with clear descriptions</li>
                <li className="pl-1"><strong>Assign:</strong> Each action is assigned to a named responsible person with a completion deadline</li>
                <li className="pl-1"><strong>Implement:</strong> The actions are carried out and recorded as complete</li>
                <li className="pl-1"><strong>Verify:</strong> The effectiveness of the actions is confirmed through monitoring and review</li>
                <li className="pl-1"><strong>Close:</strong> Once verified as effective, the CAPA is formally closed and the record archived</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">The Danger of Untracked Temporary Repairs</p>
              <p className="text-sm text-white">
                One of the most common reliability problems in industrial installations is the untracked temporary repair. A temporary fix is implemented to restore operation quickly — perhaps a jumper wire, a bypass, a modified setting, or an alternative component. It is meant to be replaced with a permanent repair "next shutdown" but is never formally tracked. Months or years later, no one remembers it is temporary. It eventually fails, often in a more severe way than the original fault. The CAPA system prevents this by ensuring every temporary repair generates a tracked follow-up action.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> An action without an owner and a deadline is a wish, not an action. Every corrective and preventive action must be assigned to a specific, named person with a realistic but firm completion date. Track open actions regularly and escalate overdue items.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Verification, Systemic Actions and Continuous Improvement
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The final and most frequently overlooked step in the CAPA process is verification — confirming that the implemented actions are actually effective. Without verification, you are assuming that the action worked, and assumptions are not evidence. Verification closes the loop and transforms the CAPA process from a paperwork exercise into a genuine improvement tool.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Verification Methods</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Monitoring period:</strong> Define a review period (3-6 months typically) and monitor the equipment for recurrence</li>
                <li className="pl-1"><strong>Test results:</strong> Compare post-action test results with pre-action baselines — has the measurable condition improved?</li>
                <li className="pl-1"><strong>CMMS data:</strong> Check the fault history — has the failure frequency reduced since the action was implemented?</li>
                <li className="pl-1"><strong>Audit:</strong> Verify that procedural changes have been communicated, trained and are being followed</li>
                <li className="pl-1"><strong>Unintended consequences:</strong> Check that the action has not introduced new failure modes or problems</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Systemic Preventive Actions</p>
              <p className="text-sm text-white mb-3">
                When a root cause could affect other similar equipment, the preventive action should be applied systemically — not just to the equipment that failed.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Same equipment type:</strong> If a motor bearing failed due to inadequate PM, review the PM schedule for all similar motors</li>
                <li className="pl-1"><strong>Same environment:</strong> If moisture caused a fault in one enclosure, inspect all enclosures in the same area</li>
                <li className="pl-1"><strong>Same procedure:</strong> If a procedural error caused a fault, review the procedure for all equipment maintained to the same instruction</li>
                <li className="pl-1"><strong>Same component:</strong> If a specific component failed prematurely, check stock and installed instances for the same batch or supplier</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Note:</strong> The CAPA process is a cycle, not a linear sequence. Each completed investigation contributes data that informs future maintenance decisions. Over time, the cumulative effect of systematic corrective and preventive actions is a measurable improvement in equipment reliability, reduced downtime, lower maintenance costs and improved safety. This is continuous improvement in practice — the foundation of world-class maintenance.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        <hr className="border-white/5 my-12" />

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

        <hr className="border-white/5 my-12" />

        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Action Types</p>
                <ul className="space-y-0.5">
                  <li>Corrective — fixes the immediate problem</li>
                  <li>Preventive — addresses root cause</li>
                  <li>Temporary — documented, tracked, time-limited</li>
                  <li>Systemic — applied across similar equipment</li>
                  <li>Always verify effectiveness after implementation</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Hierarchy of Controls</p>
                <ul className="space-y-0.5">
                  <li>1. Elimination — design out the failure mode</li>
                  <li>2. Engineering — add protection/detection</li>
                  <li>3. Procedural — change how work is done</li>
                  <li>4. Administrative — training, awareness</li>
                  <li>Higher levels = more effective, less human-dependent</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <Quiz title="Test Your Knowledge" questions={quizQuestions} />
        </section>

        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section6-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back: Fishbone Diagrams
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section6-5">
              Next: Recording RCA Outcomes
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default MOETModule4Section6_4;
