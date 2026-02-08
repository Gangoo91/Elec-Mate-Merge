import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Identifying Underlying Failures - MOET Module 4.6.1";
const DESCRIPTION = "Comprehensive guide to identifying underlying failures in electrical maintenance: distinguishing root causes from symptoms, systematic investigation methods, failure categorisation and common failure patterns in electrical systems.";

const quickCheckQuestions = [
  {
    id: "rca-symptom-vs-cause",
    question: "A motor repeatedly trips its overload relay after being reset. What does the tripping represent?",
    options: [
      "The root cause of the failure",
      "A symptom indicating an underlying problem that requires further investigation",
      "Proof that the overload relay is faulty",
      "Evidence that the motor should be replaced immediately"
    ],
    correctIndex: 1,
    explanation: "The repeated tripping is a symptom — a visible indication that something is wrong. The root cause could be mechanical overload, bearing failure, supply voltage imbalance, a winding fault, or even an incorrectly set relay. Without further investigation, simply resetting the overload treats only the symptom and allows the underlying failure to persist or worsen."
  },
  {
    id: "rca-failure-categories",
    question: "Which of the following is a human-factor failure rather than a technical failure?",
    options: [
      "Insulation breakdown due to thermal ageing",
      "A loose terminal caused by insufficient torque during installation",
      "Bearing failure from lack of lubrication due to a blocked grease nipple",
      "Capacitor failure from overvoltage transients"
    ],
    correctIndex: 1,
    explanation: "A loose terminal resulting from insufficient torque during installation is a human-factor failure — it stems from the actions (or inactions) of the person carrying out the work. Technical failures relate to component degradation or design issues, whereas human-factor failures involve errors in workmanship, procedural non-compliance, or training deficiencies."
  },
  {
    id: "rca-latent-failures",
    question: "What is a latent failure in the context of root cause analysis?",
    options: [
      "A failure that occurs immediately upon commissioning",
      "A hidden deficiency in the system, process or organisation that remains undetected until conditions trigger a failure event",
      "A component failure caused by manufacturing defects",
      "A failure that only occurs in hot weather"
    ],
    correctIndex: 1,
    explanation: "Latent failures are dormant weaknesses — they may exist for weeks, months or years without causing any visible problem. They become active failures only when certain conditions align. Examples include an untested standby system, an out-of-date procedure, or a missing protective device. RCA aims to uncover these hidden deficiencies before they contribute to a failure event."
  },
  {
    id: "rca-investigation-start",
    question: "What is the recommended first step when beginning a root cause investigation after an equipment failure?",
    options: [
      "Immediately repair the equipment and return it to service",
      "Preserve the failure scene, collect factual evidence and document the as-found condition before disturbing anything",
      "Interview the operator to determine who is at fault",
      "Order replacement parts from the manufacturer"
    ],
    correctIndex: 1,
    explanation: "Preserving the failure scene is critical. Once equipment is disturbed, repaired or cleaned, valuable evidence is lost. The as-found condition — including the position of switches, state of indicators, condition of components, any unusual smells or discolouration — provides the raw data from which root causes can be determined. Photographs, measurements and witness statements should all be captured before any remedial action."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Root cause analysis is best described as:",
    options: [
      "A method for quickly repairing failed equipment",
      "A systematic process for identifying the fundamental reasons why a failure occurred",
      "A quality control check performed during manufacturing",
      "A financial assessment of equipment replacement costs"
    ],
    correctAnswer: 1,
    explanation: "Root cause analysis (RCA) is a systematic, structured investigation process designed to identify the fundamental underlying reasons — the root causes — of a failure event. It goes beyond addressing symptoms to prevent recurrence by tackling the true origin of the problem."
  },
  {
    id: 2,
    question: "Which statement best distinguishes a root cause from a contributing factor?",
    options: [
      "A root cause is always a mechanical failure; contributing factors are always human errors",
      "A root cause is the fundamental reason the failure occurred; a contributing factor increases the likelihood or severity but would not cause the failure alone",
      "There is no practical difference between the two terms",
      "Contributing factors are more important than root causes"
    ],
    correctAnswer: 1,
    explanation: "The root cause is the fundamental deficiency that, if corrected, would prevent recurrence of the failure. Contributing factors are conditions that influence the outcome but are not the primary cause. For example, poor lighting (contributing factor) may have made it harder to see a loose connection (root cause), but improving lighting alone would not prevent loose connections."
  },
  {
    id: 3,
    question: "A circuit breaker fails to trip during a fault condition. Investigation reveals the trip mechanism was never tested after installation five years ago. The root cause is most likely:",
    options: [
      "The circuit breaker is defective from manufacture",
      "A failure in the preventive maintenance programme to include functional testing of protective devices",
      "Excessive fault current beyond the device rating",
      "Operator error in resetting the breaker"
    ],
    correctAnswer: 1,
    explanation: "The absence of periodic functional testing represents a systemic failure in the maintenance programme. While the mechanism itself may have degraded, the root cause is that the organisation failed to implement testing that would have identified and corrected the problem before a critical failure occurred."
  },
  {
    id: 4,
    question: "Which type of failure is typically the hardest to identify through routine inspection?",
    options: [
      "Visible mechanical damage",
      "Latent organisational failures such as inadequate procedures or training gaps",
      "Loose connections with visible arcing damage",
      "Corroded cable glands"
    ],
    correctAnswer: 1,
    explanation: "Latent organisational failures — such as outdated procedures, training deficiencies, or missing maintenance tasks — are invisible during routine physical inspections. They require systematic analysis of management systems, documentation, and work practices to uncover. Physical defects like loose connections or corrosion can be identified visually or through testing."
  },
  {
    id: 5,
    question: "When documenting the as-found condition of a failed piece of equipment, which of the following should be recorded?",
    options: [
      "Only the specific component that has failed",
      "The complete condition including position of controls, state of indicators, environmental conditions, any unusual observations, and photographs",
      "Only information that supports the initial theory of failure",
      "The manufacturer's recommended maintenance schedule"
    ],
    correctAnswer: 1,
    explanation: "Comprehensive documentation of the as-found condition is essential. This includes everything observable: control positions, indicator states, environmental conditions (temperature, humidity, dust), unusual smells or discolouration, and photographic evidence. Recording only selective information introduces bias and may cause important evidence to be overlooked."
  },
  {
    id: 6,
    question: "In electrical maintenance, which category of failure accounts for the highest proportion of incidents according to HSE data?",
    options: [
      "Manufacturing defects in new equipment",
      "Human factors including poor workmanship, procedural violations, and inadequate training",
      "Acts of nature such as lightning strikes",
      "Software failures in programmable devices"
    ],
    correctAnswer: 1,
    explanation: "HSE data consistently shows that human factors are the largest contributor to electrical maintenance incidents. Poor workmanship (e.g., loose connections, incorrect cable selection), procedural violations (e.g., working live without authorisation), and inadequate training are recurring themes in incident investigation reports."
  },
  {
    id: 7,
    question: "A transformer overheats and fails. The oil was last sampled three years ago despite a requirement for annual sampling. Dissolved gas analysis would have shown developing insulation degradation. This scenario illustrates:",
    options: [
      "An unpredictable random failure",
      "A failure to implement condition-based monitoring that would have provided early warning of deterioration",
      "A design fault in the transformer",
      "Normal end-of-life failure"
    ],
    correctAnswer: 1,
    explanation: "This is a classic example of a maintenance programme failure. The condition monitoring tool (dissolved gas analysis) existed and would have detected the developing fault, but the required sampling schedule was not followed. The root cause lies in the management system that failed to ensure compliance with the monitoring programme, not in the transformer itself."
  },
  {
    id: 8,
    question: "Which of the following is an example of treating the symptom rather than the root cause?",
    options: [
      "Replacing a repeatedly blowing fuse with a higher-rated fuse",
      "Investigating why a fuse keeps blowing and correcting the overcurrent condition",
      "Installing a more sensitive protective device after a fault analysis",
      "Carrying out insulation resistance testing to identify the fault location"
    ],
    correctAnswer: 0,
    explanation: "Replacing a fuse with a higher-rated one does not address why the fuse is blowing — it merely masks the symptom and introduces a new hazard by removing the intended protection. The underlying overcurrent condition (perhaps an overloaded circuit, a developing short circuit, or an earth fault) remains uncorrected and will likely lead to a more serious failure."
  },
  {
    id: 9,
    question: "What role does timeline analysis play in root cause investigation?",
    options: [
      "It determines how quickly the repair can be completed",
      "It establishes the sequence of events leading up to the failure, helping to identify causal relationships",
      "It calculates the financial cost of downtime",
      "It sets the deadline for submitting the investigation report"
    ],
    correctAnswer: 1,
    explanation: "Timeline analysis reconstructs the chronological sequence of events, conditions and actions leading up to and during the failure. By mapping what happened and when, investigators can identify causal relationships, determine which changes or actions preceded the failure, and distinguish between root causes and coincidental events."
  },
  {
    id: 10,
    question: "Under the ST1426 standard, maintenance technicians are expected to:",
    options: [
      "Only repair equipment and leave root cause analysis to engineers",
      "Apply systematic approaches to identify the root cause of faults and recommend improvements to prevent recurrence",
      "Replace all failed components without investigation",
      "Carry out root cause analysis only when instructed by management"
    ],
    correctAnswer: 1,
    explanation: "The ST1426 Maintenance and Operations Engineering Technician standard requires technicians to apply systematic fault-finding and diagnostic techniques, including the ability to identify root causes and recommend corrective and preventive actions. This is a core competency, not an optional activity."
  },
  {
    id: 11,
    question: "Which of the following best describes the 'Swiss cheese model' of failure?",
    options: [
      "A model describing how cheese ages and deteriorates over time",
      "A model showing how multiple layers of defence each have weaknesses, and failures occur when weaknesses in all layers align simultaneously",
      "A diagram showing the hierarchy of maintenance responsibilities",
      "A method for testing insulation resistance at multiple points"
    ],
    correctAnswer: 1,
    explanation: "The Swiss cheese model (developed by James Reason) illustrates how accidents occur when holes (weaknesses) in multiple layers of defence align. Each layer — design, procedures, training, supervision, protective devices — has imperfections. A failure event occurs when a hazard pathway passes through aligned holes in all layers simultaneously. RCA aims to identify and close these holes."
  },
  {
    id: 12,
    question: "Why is it important to identify multiple root causes rather than stopping at the first cause found?",
    options: [
      "To make the investigation report longer and more impressive",
      "Because most failures result from a combination of technical, human and organisational factors, and addressing only one may not prevent recurrence",
      "To assign blame to multiple individuals",
      "Because regulations require at least three root causes to be identified"
    ],
    correctAnswer: 1,
    explanation: "Complex failures rarely have a single root cause. They typically result from the interaction of technical deficiencies, human errors, and organisational weaknesses. Identifying and addressing all contributing root causes provides robust protection against recurrence. Stopping at the first cause found often means deeper systemic issues remain unaddressed."
  }
];

const faqs = [
  {
    question: "What is the difference between a fault and a failure?",
    answer: "A fault is an abnormal condition or defect in a component, subsystem or system that may lead to a failure. A failure is the inability of the equipment to perform its intended function. For example, insulation degradation is a fault; the resulting short circuit that stops the motor running is the failure. Identifying faults before they become failures is the goal of condition-based maintenance."
  },
  {
    question: "How deep should a root cause investigation go?",
    answer: "The investigation should continue until you reach a cause that is within the organisation's control to correct and that, if corrected, would prevent recurrence. If the investigation stops at a purely technical cause (e.g., 'the bearing failed'), it has not gone deep enough — you need to ask why the bearing failed and whether the maintenance programme, operating conditions, or specification were adequate."
  },
  {
    question: "Who should carry out root cause analysis in a maintenance team?",
    answer: "Ideally, RCA should involve the maintenance technicians who work on the equipment daily, supported by engineering and management as needed. Technicians bring hands-on knowledge of the equipment's behaviour and history. For significant failures, a cross-functional team including operations, engineering, safety and maintenance provides the broadest perspective."
  },
  {
    question: "Is root cause analysis required by law?",
    answer: "While there is no specific legal requirement to carry out formal RCA, the Health and Safety at Work Act 1974 (Section 2) requires employers to ensure, so far as reasonably practicable, the health and safety of employees. Investigating failures to prevent recurrence is part of this duty. Additionally, the Management of Health and Safety at Work Regulations 1999 require risk assessments to be reviewed after incidents — which inherently involves understanding root causes."
  },
  {
    question: "How does root cause analysis relate to the ST1426 apprenticeship standard?",
    answer: "The ST1426 Maintenance and Operations Engineering Technician standard specifically requires technicians to use diagnostic and fault-finding techniques to identify root causes, apply continuous improvement principles, and recommend preventive measures. Demonstrating competence in RCA is assessed through the end-point assessment and is a key differentiator between a competent technician and a basic fitter."
  },
  {
    question: "Can there be more than one root cause for a single failure?",
    answer: "Yes, most significant failures have multiple root causes operating at different levels. There may be a technical root cause (e.g., incorrect component specification), a human root cause (e.g., the technician was not trained on the correct specification), and an organisational root cause (e.g., the training programme did not cover component specification). Effective RCA identifies all levels."
  }
];

const MOETModule4Section6_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
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

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centred Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Shield className="h-4 w-4" />
            <span>Module 4.6.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Identifying Underlying Failures
          </h1>
          <p className="text-white/80">
            Techniques for identifying root causes rather than symptoms in electrical maintenance
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>RCA:</strong> Systematic process to find why failures occur, not just what failed</li>
              <li className="pl-1"><strong>Categories:</strong> Technical, human-factor, and organisational failures</li>
              <li className="pl-1"><strong>Approach:</strong> Preserve evidence, gather data, analyse systematically</li>
              <li className="pl-1"><strong>Goal:</strong> Prevent recurrence, not just repair the immediate fault</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Electrical Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Symptoms vs causes:</strong> Tripping breakers, blown fuses, overheating</li>
              <li className="pl-1"><strong>Common root causes:</strong> Poor workmanship, inadequate maintenance, design deficiency</li>
              <li className="pl-1"><strong>Evidence:</strong> As-found condition, operational history, maintenance records</li>
              <li className="pl-1"><strong>ST1426:</strong> Maps to fault diagnosis and continuous improvement KSBs</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Distinguish between symptoms, contributing factors and root causes of equipment failures",
              "Categorise failures as technical, human-factor or organisational in origin",
              "Explain the concept of latent failures and the Swiss cheese model of accident causation",
              "Describe the systematic steps for beginning a root cause investigation",
              "Apply evidence preservation and as-found documentation techniques",
              "Reference ST1426 requirements for fault diagnosis and continuous improvement"
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

        {/* Section 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            What Is Root Cause Analysis?
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Root cause analysis (RCA) is a structured, systematic approach to investigating failures and incidents that seeks to identify the fundamental underlying reasons — the root causes — rather than simply addressing the visible symptoms. In electrical maintenance, this distinction is critical: replacing a blown fuse resolves the immediate symptom, but without understanding why the fuse blew, the underlying fault remains, and the failure will recur.
            </p>
            <p>
              The principle behind RCA is straightforward: every failure has a cause, every cause has a cause, and this causal chain can be traced back to one or more root causes that, if corrected, would prevent the failure from happening again. The challenge lies in following this chain systematically without jumping to conclusions, assigning blame prematurely, or stopping the investigation too early.
            </p>
            <p>
              For maintenance technicians working to the ST1426 standard, RCA is not an abstract management exercise — it is a practical, daily skill. When you diagnose a fault, you are already performing the initial stages of root cause analysis. The difference between a competent technician and an exceptional one lies in the depth of investigation: the competent technician finds and fixes the fault; the exceptional technician finds the fault, identifies why it occurred, and recommends actions to prevent it happening again.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Symptoms vs Root Causes — Electrical Examples</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Symptom (What You See)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Possible Root Cause (Why It Happened)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Motor overload trips repeatedly</td>
                      <td className="border border-white/10 px-3 py-2">Bearing failure causing increased mechanical load; supply voltage imbalance causing overcurrent in one phase</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cable overheating at termination</td>
                      <td className="border border-white/10 px-3 py-2">Insufficient torque on terminal screws during installation (human factor); incorrect cable size for the load (design deficiency)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">RCD nuisance tripping</td>
                      <td className="border border-white/10 px-3 py-2">Accumulated earth leakage from ageing equipment on the circuit; moisture ingress into a junction box</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Transformer oil discolouration</td>
                      <td className="border border-white/10 px-3 py-2">Internal winding insulation breakdown due to sustained overloading beyond design rating</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Frequent lamp failures in a lighting circuit</td>
                      <td className="border border-white/10 px-3 py-2">Supply overvoltage from an incorrectly set transformer tap; excessive vibration from nearby plant</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">The Danger of Symptom Treatment</p>
              <p className="text-sm text-white">
                Treating symptoms without identifying root causes is one of the most common — and most dangerous — practices in electrical maintenance. Replacing a fuse with a higher-rated one, resetting a tripping breaker without investigation, or bypassing a faulty interlock to keep production running are all examples of symptom treatment that can lead to catastrophic consequences. Each of these actions masks the underlying fault and removes a layer of protection that exists for a reason.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Categories of Failure
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Understanding the different categories of failure is essential for directing the investigation towards the right areas. Failures in electrical systems can be broadly categorised into three types: technical failures, human-factor failures, and organisational failures. In practice, most significant failures involve elements from all three categories, which is why a thorough investigation must consider all of them.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Technical Failures</h3>
                <p className="text-sm text-white mb-3">
                  Technical failures relate to the physical degradation, design limitations, or material defects of equipment and components. These are often the most visible and easily identified category, but they should not be treated as the final answer without investigating why the technical failure occurred.
                </p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Wear and degradation:</strong> Insulation ageing, contact erosion, bearing wear, corrosion of connections — all are natural deterioration processes that should be managed through planned maintenance</li>
                  <li className="pl-1"><strong>Design deficiency:</strong> Under-rated components, inadequate cooling, poor accessibility for maintenance, insufficient protection coordination</li>
                  <li className="pl-1"><strong>Material defect:</strong> Manufacturing faults in components, substandard materials, counterfeit products entering the supply chain</li>
                  <li className="pl-1"><strong>Environmental factors:</strong> Excessive heat, moisture, dust, vibration, chemical exposure beyond the equipment's design envelope</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Human-Factor Failures</h3>
                <p className="text-sm text-white mb-3">
                  Human-factor failures result from the actions, decisions, or omissions of people involved in the design, installation, operation, or maintenance of the equipment. HSE research consistently identifies human factors as the largest contributor to maintenance-related incidents in the electrical sector.
                </p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Errors of commission:</strong> Incorrect actions — wrong torque setting, incorrect cable termination method, connecting to the wrong terminal</li>
                  <li className="pl-1"><strong>Errors of omission:</strong> Missed steps — failure to tighten a connection, forgetting to replace a cover, not recording a test result</li>
                  <li className="pl-1"><strong>Violations:</strong> Deliberate deviation from procedures — bypassing an interlock, working live without authorisation, skipping a test step</li>
                  <li className="pl-1"><strong>Competence gaps:</strong> Insufficient training, lack of experience with specific equipment types, unfamiliarity with updated standards</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Organisational Failures</h3>
                <p className="text-sm text-white mb-3">
                  Organisational failures are systemic weaknesses in management systems, policies, and culture that create the conditions in which technical and human-factor failures can occur. They are the deepest level of root cause and often the most difficult to identify — but also the most impactful to correct.
                </p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Inadequate maintenance strategy:</strong> No planned preventive maintenance programme, reactive-only approach, insufficient budget allocation</li>
                  <li className="pl-1"><strong>Poor procedures:</strong> Outdated work instructions, ambiguous method statements, no standard operating procedures for critical tasks</li>
                  <li className="pl-1"><strong>Training deficiencies:</strong> No structured training programme, no competence assessment, reliance on informal knowledge transfer</li>
                  <li className="pl-1"><strong>Communication failures:</strong> Poor shift handover, inadequate safety briefings, no feedback mechanism for reporting concerns</li>
                  <li className="pl-1"><strong>Resource pressures:</strong> Understaffing, time pressure to complete work, cost-cutting on spares or tools</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> When you identify a technical failure, always ask "why did this technical failure occur?" — the answer often leads to a human-factor or organisational root cause that, if addressed, will prevent not just this failure but similar failures across the site.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Latent Failures and the Swiss Cheese Model
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              One of the most important concepts in root cause analysis is the distinction between active failures and latent failures. Active failures are the immediate, visible actions or events that directly cause the failure — a wrong connection, an overloaded circuit, a missed isolation step. Latent failures, by contrast, are hidden weaknesses that may exist for extended periods without causing any visible problem, only becoming apparent when they combine with other factors to produce a failure event.
            </p>
            <p>
              Professor James Reason's Swiss cheese model provides a powerful visual metaphor for understanding how failures occur in complex systems. Imagine multiple slices of Swiss cheese stacked together, where each slice represents a layer of defence — design standards, protective devices, maintenance procedures, training, supervision, and so on. Each slice has holes (weaknesses or gaps), but because the holes in different slices are in different positions, the layers of defence normally prevent a hazard from reaching the point where it causes harm. A failure event occurs when, by chance or design, the holes in all slices align simultaneously, allowing a hazard pathway through all layers of defence.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Layers of Defence in Electrical Maintenance</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Design layer:</strong> Equipment rated for the application, protection coordination, redundancy in critical systems</li>
                <li className="pl-1"><strong>Maintenance layer:</strong> Planned preventive maintenance, condition monitoring, periodic testing and inspection</li>
                <li className="pl-1"><strong>Procedural layer:</strong> Safe systems of work, permit to work systems, method statements and risk assessments</li>
                <li className="pl-1"><strong>Training layer:</strong> Competent persons, ongoing CPD, assessed skills and knowledge</li>
                <li className="pl-1"><strong>Supervision layer:</strong> Quality checks on completed work, independent verification of critical tasks</li>
                <li className="pl-1"><strong>Protective device layer:</strong> Circuit breakers, RCDs, fuses, interlocks, emergency stops — the last line of defence</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Example: How Latent Failures Combine</h3>
              <p className="text-sm text-white mb-3">
                Consider a scenario where a maintenance technician receives an electric shock from a distribution board that should have been isolated:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Latent failure 1 (Design):</strong> The distribution board circuit directory was never updated after a modification two years ago, so circuit identification is incorrect</li>
                <li className="pl-1"><strong>Latent failure 2 (Procedure):</strong> The site isolation procedure does not require verification of circuit identification against as-built drawings</li>
                <li className="pl-1"><strong>Latent failure 3 (Training):</strong> The technician was not trained to challenge circuit directory accuracy or to prove dead at the point of work</li>
                <li className="pl-1"><strong>Active failure:</strong> The technician isolated the wrong circuit based on the incorrect directory and began work without proving dead</li>
              </ul>
              <p className="text-sm text-white mt-3">
                No single failure caused the incident — it was the alignment of all four that created the hazard pathway. Correcting any one of these failures would have broken the chain and prevented the incident.
              </p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Practical Implication</p>
              <p className="text-sm text-white">
                The Swiss cheese model teaches us that investigating only the active failure (what the technician did wrong) misses the deeper systemic issues. Effective RCA peels back the layers to expose the latent failures — the incorrect circuit directory, the inadequate procedure, the training gap — because these are the failures that, if left uncorrected, will contribute to future incidents across the entire organisation, not just on this specific piece of equipment.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Starting a Root Cause Investigation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The quality of a root cause investigation is largely determined by what happens in the first minutes and hours after a failure is discovered. Evidence is perishable — once equipment is disturbed, repaired, or cleaned, valuable information is permanently lost. A disciplined approach to the initial response sets the foundation for a thorough and accurate investigation.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Step 1 — Make Safe and Preserve the Scene</h3>
                <p className="text-sm text-white">
                  The first priority is always safety — ensure the failed equipment is in a safe condition and that no one is at risk. However, beyond making safe, resist the urge to immediately start repairing or cleaning. The as-found condition of the equipment is your most valuable evidence. Photograph everything: the position of switches and controls, the condition of terminals and connections, any discolouration or damage, indicator readings, and the general environment (temperature gauges, humidity, dust accumulation). Record the date, time, and environmental conditions.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Step 2 — Gather Factual Data</h3>
                <p className="text-sm text-white mb-2">
                  Collect all available factual information about the failure event and the equipment's history:
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Maintenance records — when was the equipment last maintained, inspected, or tested?</li>
                  <li className="pl-1">Operational history — any recent changes in load, operating hours, or process conditions?</li>
                  <li className="pl-1">Modification history — has the equipment or connected systems been modified?</li>
                  <li className="pl-1">Previous failures — has this equipment or similar equipment failed before?</li>
                  <li className="pl-1">Witness statements — what did operators or other personnel observe before, during, and after the failure?</li>
                  <li className="pl-1">SCADA/BMS data — historical trend data for voltage, current, temperature, vibration</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Step 3 — Construct a Timeline</h3>
                <p className="text-sm text-white">
                  Build a chronological timeline of events leading up to the failure. Start from a point well before the failure event — perhaps the last successful maintenance activity — and work forwards. Include maintenance activities, operational changes, environmental events (storms, temperature extremes), and any anomalies reported by operators. The timeline helps identify changes or events that may have triggered or contributed to the failure.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Step 4 — Examine the Failed Component</h3>
                <p className="text-sm text-white">
                  Physical examination of the failed component provides direct evidence of the failure mechanism. For electrical components, look for signs of thermal damage (discolouration, melting, charring), mechanical damage (cracks, deformation, wear), electrical damage (arcing marks, pitting on contacts), and environmental damage (corrosion, moisture ingress, contamination). Where possible, retain the failed component for further analysis — destructive testing, metallurgical examination, or manufacturer investigation may be warranted for critical failures.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Step 5 — Identify Potential Causes</h3>
                <p className="text-sm text-white">
                  Based on the evidence gathered, develop a list of potential causes. At this stage, be inclusive — do not eliminate possibilities prematurely. Consider technical causes (component failure modes), human-factor causes (installation errors, operating mistakes, maintenance omissions), and organisational causes (procedural gaps, training deficiencies, resource constraints). Use structured techniques such as the 5 Whys and fishbone diagrams (covered in subsequent sections) to organise and analyse these potential causes systematically.
                </p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> The ability to gather evidence, analyse failure data, and construct a logical investigation is directly assessed under the diagnostic and fault-finding competencies of the maintenance technician standard. Your end-point assessment may include a scenario requiring you to demonstrate a systematic approach to failure investigation.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Common Failure Patterns in Electrical Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Experience and industry data reveal recurring failure patterns in electrical systems. Recognising these patterns helps maintenance technicians direct their investigations more efficiently and identify root causes more quickly. While every failure is unique in its specific circumstances, the underlying mechanisms often fall into well-established categories.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Loose Connections — The Silent Killer</p>
              <p className="text-sm text-white mb-2">
                Loose electrical connections are one of the most common root causes of electrical fires and equipment failures. A connection that is not properly tightened creates increased resistance at the contact point. This increased resistance generates heat, which causes the conductor and terminal to expand and contract with load cycles, progressively loosening the connection further. The cycle of heating, expansion, contraction, and loosening is self-reinforcing and will eventually lead to arcing, insulation failure, and fire.
              </p>
              <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Root cause:</strong> Often poor workmanship during installation — insufficient torque, wrong size ferrule, aluminium conductor in a terminal designed for copper</li>
                <li className="pl-1"><strong>Detection:</strong> Thermal imaging during load, periodic re-torquing, visual inspection for discolouration</li>
                <li className="pl-1"><strong>Prevention:</strong> Torque-controlled tightening to manufacturer's specification, use of correct termination methods, periodic thermographic surveys</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Insulation Degradation</p>
              <p className="text-sm text-white mb-2">
                All electrical insulation degrades over time. The rate of degradation depends on the operating conditions — temperature is the primary factor, with the life of organic insulation approximately halving for every 10°C increase in operating temperature above its rated value. Moisture, chemical contamination, mechanical stress, and UV exposure also accelerate degradation.
              </p>
              <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Root cause:</strong> Sustained operation above design temperature (often due to overloading or poor ventilation), inadequate environmental protection, or age</li>
                <li className="pl-1"><strong>Detection:</strong> Insulation resistance testing (trending over time is more valuable than single readings), partial discharge monitoring for HV equipment, visual inspection for cracking or discolouration</li>
                <li className="pl-1"><strong>Prevention:</strong> Ensure equipment operates within design parameters, maintain adequate ventilation, schedule periodic insulation testing with trend analysis</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Protection Coordination Failures</p>
              <p className="text-sm text-white mb-2">
                When protective devices are not properly coordinated (discrimination), a fault can trip the wrong device — perhaps a main breaker instead of a final circuit MCB — causing widespread loss of supply instead of isolating just the faulty circuit. This is a design-level root cause that may not become apparent until a fault occurs.
              </p>
              <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Root cause:</strong> Inadequate protection study at design stage, modifications that changed fault levels without updating the protection scheme, incorrect device settings</li>
                <li className="pl-1"><strong>Detection:</strong> Protection coordination study, functional testing of protective devices, analysis of fault event records</li>
                <li className="pl-1"><strong>Prevention:</strong> Comprehensive protection coordination study at design stage and after any modification, periodic verification of device settings</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Environmental Failures</p>
              <p className="text-sm text-white mb-2">
                Equipment installed in environments that exceed its IP rating or designed environmental envelope will fail prematurely. This is particularly common where equipment specifications are based on normal indoor conditions but the actual installation environment includes moisture, dust, corrosive atmospheres, or extreme temperatures.
              </p>
              <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Root cause:</strong> Incorrect equipment specification for the environment, changes to the environment after installation (e.g., new process introducing moisture or chemicals), deterioration of environmental seals</li>
                <li className="pl-1"><strong>Detection:</strong> Visual inspection for corrosion, moisture, or contamination; comparison of equipment IP rating to actual environmental conditions</li>
                <li className="pl-1"><strong>Prevention:</strong> Accurate environmental assessment at specification stage, periodic review of environmental conditions, maintenance of seals and gaskets</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Note:</strong> Recognising these common patterns is a valuable skill, but it must not lead to assumptions. Every investigation should follow the evidence, not the investigator's expectations. Even a pattern that looks familiar may have an unusual root cause in the specific circumstances.
            </p>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

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
                <p className="font-medium text-white mb-1">RCA Investigation Steps</p>
                <ul className="space-y-0.5">
                  <li>1. Make safe and preserve the scene</li>
                  <li>2. Gather factual data and records</li>
                  <li>3. Construct a timeline of events</li>
                  <li>4. Examine the failed component</li>
                  <li>5. Identify and analyse potential causes</li>
                  <li>6. Determine root cause(s) and recommend actions</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Failure Categories</p>
                <ul className="space-y-0.5">
                  <li>Technical — component, design, material, environment</li>
                  <li>Human factor — errors, omissions, violations, competence</li>
                  <li>Organisational — procedures, training, resources, culture</li>
                  <li>Latent — hidden weaknesses awaiting trigger conditions</li>
                  <li>Active — immediate actions causing the failure event</li>
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
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section Overview
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section6-2">
              Next: The '5 Whys' Technique
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule4Section6_1;
