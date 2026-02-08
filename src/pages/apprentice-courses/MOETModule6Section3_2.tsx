import { ArrowLeft, AlertTriangle, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Fault Reports and Corrective Actions - MOET Module 6 Section 3.2";
const DESCRIPTION = "Comprehensive guide to fault reporting procedures, corrective action documentation, root cause analysis, failure classification and follow-up procedures for electrical maintenance technicians under ST1426.";

const quickCheckQuestions = [
  {
    id: "fault-report-purpose",
    question: "What is the primary purpose of a fault report?",
    options: [
      "To assign blame to the person who caused the fault",
      "To create a clear, factual record of the fault, its cause and the corrective action taken",
      "To justify purchasing new equipment",
      "To demonstrate that the technician was busy"
    ],
    correctIndex: 1,
    explanation: "A fault report creates a clear, factual record of what happened, why it happened, and what was done to correct it. It supports future fault diagnosis, asset management decisions, and demonstrates compliance with maintenance procedures."
  },
  {
    id: "corrective-action-priority",
    question: "How should corrective actions be prioritised?",
    options: [
      "Alphabetically by equipment name",
      "Based on the risk to safety, production impact and likelihood of recurrence",
      "By the cost of the repair only",
      "In the order they were discovered"
    ],
    correctIndex: 1,
    explanation: "Corrective actions are prioritised based on risk to safety (always highest priority), impact on production or operations, and likelihood of the fault recurring if not addressed. This risk-based approach ensures resources are directed where they are most needed."
  },
  {
    id: "root-cause-analysis",
    question: "Root cause analysis aims to identify:",
    options: [
      "Who is to blame for the fault",
      "The cheapest possible repair option",
      "The underlying reason the fault occurred, not just the immediate symptom",
      "Whether the equipment is still under warranty"
    ],
    correctIndex: 2,
    explanation: "Root cause analysis looks beyond the immediate symptom to identify the underlying reason the fault occurred. For example, a blown fuse (symptom) might be caused by a loose connection creating high resistance (root cause). Addressing only the symptom means the fault will recur."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "A fault report should be written:",
    options: [
      "Only for major breakdowns that stop production",
      "For all faults, including those found during routine inspections, regardless of severity",
      "Only when requested by the supervisor",
      "Only for faults on safety-critical equipment"
    ],
    correctAnswer: 1,
    explanation: "Fault reports should be raised for all faults discovered, regardless of severity. Minor faults found during routine inspections may indicate developing problems. A complete fault reporting culture ensures no issues are missed and asset history remains comprehensive."
  },
  {
    id: 2,
    question: "The 5 Whys technique is used in fault diagnosis to:",
    options: [
      "Ask five different technicians for their opinion",
      "Identify the root cause by repeatedly asking 'why' until the fundamental cause is found",
      "Check five different potential fault locations",
      "Complete five separate test procedures"
    ],
    correctAnswer: 1,
    explanation: "The 5 Whys technique involves repeatedly asking 'why' each cause occurred until the root cause is identified. For example: Why did the motor overheat? Because the bearing failed. Why? Because it was not lubricated. Why? Because the PM schedule was not followed."
  },
  {
    id: 3,
    question: "A corrective action is classified as 'temporary' when:",
    options: [
      "It permanently resolves the fault",
      "It restores operation but does not address the root cause, requiring further planned work",
      "It is carried out by an apprentice",
      "It takes less than one hour to complete"
    ],
    correctAnswer: 1,
    explanation: "A temporary corrective action restores equipment to an operational state but does not fully address the root cause. For example, replacing a fuse restores power but does not fix the underlying overcurrent cause. Temporary actions must always be followed by permanent corrective work."
  },
  {
    id: 4,
    question: "Which failure classification describes equipment that is still running but performing below specification?",
    options: [
      "Catastrophic failure",
      "Degraded performance or partial failure",
      "Intermittent failure",
      "Hidden failure"
    ],
    correctAnswer: 1,
    explanation: "Degraded performance describes equipment that continues to operate but below its rated specification. For example, a variable speed drive with one phase of output missing, causing motor vibration and reduced torque."
  },
  {
    id: 5,
    question: "When documenting a corrective action, you should record:",
    options: [
      "Only the parts used",
      "The fault found, diagnostic steps taken, root cause, corrective action performed, parts used, and verification of effectiveness",
      "Just the time taken to complete the repair",
      "Only whether the equipment is now working"
    ],
    correctAnswer: 1,
    explanation: "A complete corrective action record includes the fault description, diagnostic approach, root cause identified, corrective action taken, parts used, and verification that the repair was effective. This comprehensive record supports future maintenance decisions."
  },
  {
    id: 6,
    question: "An intermittent fault is particularly challenging because:",
    options: [
      "It always occurs at the same time each day",
      "It may not be present when the technician arrives, making diagnosis difficult",
      "It only affects new equipment",
      "It is always caused by operator error"
    ],
    correctAnswer: 1,
    explanation: "Intermittent faults may not be present when the technician arrives, making them difficult to diagnose. They often require monitoring over time, data logging, or condition-based monitoring to capture the fault when it occurs."
  },
  {
    id: 7,
    question: "A 'near miss' related to an electrical fault should be:",
    options: [
      "Ignored if no one was injured",
      "Reported and documented using the organisation's incident reporting system",
      "Only discussed verbally with the supervisor",
      "Recorded only if the HSE inspector is visiting"
    ],
    correctAnswer: 1,
    explanation: "Near misses must be formally reported and documented. They indicate that conditions for a serious incident existed and only chance prevented harm. Investigating near misses prevents future incidents. Under RIDDOR, some near misses involving electrical systems are reportable."
  },
  {
    id: 8,
    question: "The Ishikawa (fishbone) diagram is used to:",
    options: [
      "Draw the layout of electrical circuits",
      "Systematically identify all potential causes of a fault across multiple categories",
      "Plan the sequence of repair activities",
      "Calculate the cost of corrective maintenance"
    ],
    correctAnswer: 1,
    explanation: "An Ishikawa diagram systematically identifies potential causes of a fault by organising them into categories such as Materials, Methods, Machinery, Manpower, Measurement and Environment. It ensures all possible causes are considered during root cause analysis."
  },
  {
    id: 9,
    question: "After completing a corrective action on a motor starter, the final step should be:",
    options: [
      "Leave the area immediately",
      "Verify the repair by testing the equipment under normal operating conditions and recording the results",
      "Send an email to the production manager",
      "Remove the logbook entry"
    ],
    correctAnswer: 1,
    explanation: "The final step is verification — testing under normal operating conditions to confirm the repair is effective. Results must be recorded to complete the work order and demonstrate the equipment is safe to return to service."
  },
  {
    id: 10,
    question: "Failure Mode and Effects Analysis (FMEA) is used in maintenance to:",
    options: [
      "Test electrical equipment after repair",
      "Systematically evaluate potential failure modes, their effects and likelihood to prioritise maintenance actions",
      "Design new electrical circuits",
      "Train apprentices in fault finding"
    ],
    correctAnswer: 1,
    explanation: "FMEA evaluates each potential failure mode, assessing severity, likelihood and detectability. This produces a risk priority number (RPN) that helps prioritise maintenance resources on the most critical failure modes."
  },
  {
    id: 11,
    question: "Under ST1426, when reporting a fault to a supervisor, you should communicate:",
    options: [
      "Only that the equipment is broken",
      "The fault symptoms, your diagnosis, the urgency level, and your recommended corrective action",
      "Just the asset number",
      "Your opinion on whether the equipment should be replaced"
    ],
    correctAnswer: 1,
    explanation: "Effective fault reporting to supervisors includes the symptoms observed, your diagnosis, the urgency level based on safety and operational impact, and your recommended corrective action. This demonstrates professional communication and technical competence."
  },
  {
    id: 12,
    question: "Fault reports and corrective action records should typically be retained for:",
    options: [
      "Until the end of the current financial year",
      "The life of the asset, or as specified by the organisation's retention policy (typically 5+ years minimum)",
      "One month after the repair",
      "Only while the equipment is under warranty"
    ],
    correctAnswer: 1,
    explanation: "Records should be retained for the life of the asset, or per the organisation's retention policy. Most require a minimum of 5 years. These records support trend analysis, compliance evidence, and may be needed for legal proceedings."
  }
];

const faqs = [
  {
    question: "Should I raise a fault report for a minor issue like a loose terminal?",
    answer: "Yes. Even a minor fault like a loose terminal should be reported and recorded. A loose terminal causes increased resistance, localised heating, and potential arc faults — it is a fire and safety risk. Recording it also provides evidence of proactive maintenance and helps identify if similar faults are occurring across other equipment of the same type or age."
  },
  {
    question: "What is the difference between a fault report and an incident report?",
    answer: "A fault report documents an equipment malfunction and the corrective action taken. An incident report documents an event that caused or could have caused harm to people, property or the environment. If an electrical fault results in an arc flash, shock, fire or near miss, both reports are required. The incident report follows your organisation's health and safety reporting procedures and may trigger RIDDOR notification."
  },
  {
    question: "How do I determine the root cause if I cannot replicate the fault?",
    answer: "For intermittent faults, consider installing monitoring equipment (data loggers, thermal monitoring), reviewing operational data, checking for environmental factors (temperature, humidity, vibration), and examining asset history for patterns. Document your investigation even if the root cause is not definitively identified — record the evidence and the most probable cause based on your analysis."
  },
  {
    question: "Who is responsible for closing out corrective actions?",
    answer: "Typically, the corrective action is closed by the technician who completed the repair, with verification from a supervisor or planner. Safety-critical corrective actions may require additional sign-off from a safety professional. The key principle is that someone independent of the repair verifies effectiveness."
  },
  {
    question: "What if I disagree with the corrective action specified on a work order?",
    answer: "If you believe the specified action is insufficient, inappropriate or unsafe, raise this with your supervisor immediately. Document your concerns in the work order comments. A competent technician's on-site assessment may reveal conditions not apparent when the work order was planned. Never carry out work you believe to be unsafe."
  }
];

const MOETModule6Section3_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module6-section3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <AlertTriangle className="h-4 w-4" />
            <span>Module 6.3.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Fault Reports and Corrective Actions
          </h1>
          <p className="text-white/80">
            Systematic fault reporting, root cause analysis and corrective action documentation
          </p>
        </header>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Fault reports:</strong> Factual record of fault, cause and corrective action</li>
              <li className="pl-1"><strong>Root cause:</strong> Underlying reason, not just the immediate symptom</li>
              <li className="pl-1"><strong>Corrective actions:</strong> Temporary (restore) vs permanent (root cause fix)</li>
              <li className="pl-1"><strong>Follow-up:</strong> Verification, monitoring and close-out procedures</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Electrical Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>5 Whys / fishbone:</strong> Structured root cause analysis techniques</li>
              <li className="pl-1"><strong>FMEA:</strong> Risk-based failure mode prioritisation</li>
              <li className="pl-1"><strong>Verification:</strong> Test under load after every repair</li>
              <li className="pl-1"><strong>ST1426:</strong> Maps to fault diagnosis and reporting KSBs</li>
            </ul>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Write clear, structured fault reports with all required information",
              "Apply root cause analysis techniques including 5 Whys and fishbone diagrams",
              "Classify failure modes and prioritise corrective actions by risk",
              "Document corrective actions from diagnosis through verification",
              "Understand the difference between temporary and permanent corrective actions",
              "Meet ST1426 requirements for fault reporting and professional communication"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            The Anatomy of a Fault Report
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A fault report is a structured document that records an equipment failure or malfunction, the diagnostic
              process followed, the root cause identified, and the corrective action taken. It serves multiple purposes:
              informing maintenance planning, supporting asset management decisions, providing compliance evidence,
              and building institutional knowledge for future technicians.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Essential Elements of a Fault Report</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Report reference:</strong> Unique number linked to the work order or CMMS entry</li>
                <li className="pl-1"><strong>Date, time and duration:</strong> When the fault was reported, attended and resolved</li>
                <li className="pl-1"><strong>Asset identification:</strong> Equipment tag, asset number, location code</li>
                <li className="pl-1"><strong>Fault description:</strong> Symptoms observed — alarms, abnormal behaviour, measurements</li>
                <li className="pl-1"><strong>Diagnostic process:</strong> Tests performed, measurements taken, logical steps followed</li>
                <li className="pl-1"><strong>Root cause:</strong> The underlying reason the fault occurred</li>
                <li className="pl-1"><strong>Corrective action:</strong> What was done to resolve the fault (temporary or permanent)</li>
                <li className="pl-1"><strong>Parts and materials:</strong> Items used with part numbers and quantities</li>
                <li className="pl-1"><strong>Verification:</strong> Test results confirming successful repair</li>
                <li className="pl-1"><strong>Outstanding actions:</strong> Any further work required with priority and timescale</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Common Fault Reporting Mistakes</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Describing the repair but not the fault found</li>
                <li className="pl-1">Recording the symptom as the root cause (e.g., "replaced blown fuse" without explaining why it blew)</li>
                <li className="pl-1">Using vague descriptions: "fixed motor" instead of specific actions</li>
                <li className="pl-1">Not recording diagnostic steps — losing valuable troubleshooting information</li>
                <li className="pl-1">Failing to document outstanding actions that need follow-up</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Root Cause Analysis Techniques
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Root cause analysis (RCA) is the systematic process of identifying the underlying reason a fault occurred,
              rather than just addressing the visible symptom. Effective RCA prevents recurring faults, reduces
              maintenance costs, and improves equipment reliability.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">The 5 Whys Technique</h3>
                <p className="text-sm text-white mb-3">
                  Starting with the fault symptom, ask "why?" repeatedly until the fundamental cause is uncovered.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex gap-2"><span className="text-elec-yellow/80 font-mono">Why 1:</span><span>The motor tripped on overload. <em className="text-white/60">Why?</em></span></div>
                  <div className="flex gap-2"><span className="text-elec-yellow/80 font-mono">Why 2:</span><span>The motor was drawing excessive current. <em className="text-white/60">Why?</em></span></div>
                  <div className="flex gap-2"><span className="text-elec-yellow/80 font-mono">Why 3:</span><span>The driven pump was mechanically seized. <em className="text-white/60">Why?</em></span></div>
                  <div className="flex gap-2"><span className="text-elec-yellow/80 font-mono">Why 4:</span><span>The pump bearing failed due to lack of lubrication. <em className="text-white/60">Why?</em></span></div>
                  <div className="flex gap-2"><span className="text-elec-yellow/80 font-mono">Why 5:</span><span>The lubrication schedule was not followed — PM task overdue by 3 months.</span></div>
                </div>
                <p className="text-sm text-elec-yellow/70 mt-3">
                  <strong>Root cause:</strong> Failure to follow the preventive maintenance schedule. The corrective action is not just to replace the bearing — it is to address the PM scheduling gap.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Ishikawa (Fishbone) Diagram</h3>
                <p className="text-sm text-white mb-3">Organises potential causes into six categories (the 6 Ms):</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
                  <div className="p-2 rounded bg-white/5"><strong>Manpower:</strong> Training, competence, fatigue</div>
                  <div className="p-2 rounded bg-white/5"><strong>Methods:</strong> Procedures, work instructions</div>
                  <div className="p-2 rounded bg-white/5"><strong>Machinery:</strong> Equipment condition, age</div>
                  <div className="p-2 rounded bg-white/5"><strong>Materials:</strong> Component quality, compatibility</div>
                  <div className="p-2 rounded bg-white/5"><strong>Measurement:</strong> Test accuracy, calibration</div>
                  <div className="p-2 rounded bg-white/5"><strong>Environment:</strong> Temperature, moisture, contamination</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Failure Classification and Prioritisation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Understanding different types of failure helps you categorise faults accurately and prioritise corrective
              actions appropriately. Electrical equipment can fail in several distinct modes, each requiring a different response.
            </p>

            <div className="my-6">
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Failure Mode</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Description</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Electrical Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Catastrophic</td>
                      <td className="border border-white/10 px-3 py-2">Complete, sudden failure</td>
                      <td className="border border-white/10 px-3 py-2">Transformer winding failure, VSD power stage burnout</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Degraded</td>
                      <td className="border border-white/10 px-3 py-2">Operates but below rated performance</td>
                      <td className="border border-white/10 px-3 py-2">Motor running hot, capacitor bank partially failed</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Intermittent</td>
                      <td className="border border-white/10 px-3 py-2">Appears and disappears unpredictably</td>
                      <td className="border border-white/10 px-3 py-2">Loose connection causing random trips</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Hidden</td>
                      <td className="border border-white/10 px-3 py-2">Not apparent during normal operation</td>
                      <td className="border border-white/10 px-3 py-2">Standby generator failure, UPS battery degradation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Incipient</td>
                      <td className="border border-white/10 px-3 py-2">Early-stage deterioration detectable by monitoring</td>
                      <td className="border border-white/10 px-3 py-2">Declining insulation resistance, partial discharge</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Corrective Action Priority Matrix</h3>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Priority</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Criteria</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Response Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="border border-white/10 px-3 py-2 font-medium text-red-400">P1 — Emergency</td><td className="border border-white/10 px-3 py-2">Immediate safety risk or critical production loss</td><td className="border border-white/10 px-3 py-2">Immediate</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2 font-medium text-orange-400">P2 — Urgent</td><td className="border border-white/10 px-3 py-2">Significant operational impact, near-term safety risk</td><td className="border border-white/10 px-3 py-2">Within 24 hours</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2 font-medium text-yellow-400">P3 — Planned</td><td className="border border-white/10 px-3 py-2">Non-critical, can be scheduled normally</td><td className="border border-white/10 px-3 py-2">Within 1-2 weeks</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2 font-medium text-blue-400">P4 — Improvement</td><td className="border border-white/10 px-3 py-2">Enhancement, no immediate risk</td><td className="border border-white/10 px-3 py-2">Next shutdown</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Corrective Action Documentation and Follow-Up
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Every corrective action must answer three questions: what was done, was it effective, and is any further
              work needed? Documenting this with sufficient detail closes the loop on fault management and ensures
              nothing falls through the cracks.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Temporary Corrective Actions</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Restores equipment to operational state</li>
                  <li className="pl-1">Does not address root cause</li>
                  <li className="pl-1">Must be clearly flagged as temporary</li>
                  <li className="pl-1">Generates a follow-up work order for permanent fix</li>
                  <li className="pl-1">Example: bypassing a faulty sensor with a manual override</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Permanent Corrective Actions</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Addresses the root cause of the fault</li>
                  <li className="pl-1">Prevents recurrence of the same failure</li>
                  <li className="pl-1">May include design modifications or procedure changes</li>
                  <li className="pl-1">Verified through testing and monitoring</li>
                  <li className="pl-1">Example: replacing undersized cable causing voltage drop</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Verification and Close-Out</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Functional testing under normal operating conditions</li>
                <li className="pl-1">Electrical tests as appropriate (IR, continuity, Zs)</li>
                <li className="pl-1">Thermal monitoring during initial run-up period</li>
                <li className="pl-1">Confirmation from operations that equipment performs as expected</li>
                <li className="pl-1">Recording all test results in the CMMS and/or logbook</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> The standard requires competence in fault diagnosis, corrective action
              implementation and verification. Your fault reports and corrective action records are direct evidence
              for your EPA portfolio.
            </p>
          </div>
        </section>

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
                <p className="font-medium text-white mb-1">Fault Report Structure</p>
                <ul className="space-y-0.5">
                  <li>1. Identification — asset, location, date/time</li>
                  <li>2. Symptom — what was observed</li>
                  <li>3. Diagnosis — tests and investigations</li>
                  <li>4. Root cause — underlying reason</li>
                  <li>5. Corrective action — what was done</li>
                  <li>6. Verification — proof of effective repair</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">RCA Techniques</p>
                <ul className="space-y-0.5">
                  <li>5 Whys — iterative cause-and-effect</li>
                  <li>Fishbone — 6 Ms categorisation</li>
                  <li>FMEA — risk priority scoring</li>
                  <li>Fault tree — top-down logic diagram</li>
                  <li>Pareto — 80/20 frequency analysis</li>
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
            <Link to="/study-centre/apprentice/m-o-e-t-module6-section3-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Recording Work Completed
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module6-section3-3">
              Next: Digital vs Paper-Based Reporting
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default MOETModule6Section3_2;
