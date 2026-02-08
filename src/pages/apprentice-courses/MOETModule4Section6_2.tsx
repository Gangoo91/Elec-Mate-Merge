import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "The '5 Whys' Technique - MOET Module 4.6.2";
const DESCRIPTION = "Comprehensive guide to the 5 Whys root cause analysis technique for electrical maintenance technicians: applying iterative questioning, worked examples in electrical fault diagnosis, limitations and best practices under ST1426.";

const quickCheckQuestions = [
  {
    id: "5whys-principle",
    question: "What is the fundamental principle behind the 5 Whys technique?",
    options: [
      "Asking exactly five questions about every failure",
      "Iteratively asking 'why' to peel back layers of causation until the root cause is reached",
      "Interviewing five different people about the failure",
      "Checking five different components in the failed system"
    ],
    correctIndex: 1,
    explanation: "The 5 Whys technique works by iteratively asking 'why' at each level of causation, moving from the visible symptom deeper into the causal chain. The number five is a guideline, not a rule — some investigations require fewer or more iterations to reach the root cause. The key is to keep asking 'why' until you reach a cause that is actionable and within the organisation's control."
  },
  {
    id: "5whys-stopping",
    question: "When should you stop asking 'why' in a 5 Whys analysis?",
    options: [
      "After exactly five iterations, regardless of the answer",
      "When you reach a cause that is within the organisation's control to correct and that would prevent recurrence",
      "When you run out of ideas",
      "When the answer points to a specific individual"
    ],
    correctIndex: 1,
    explanation: "The investigation should continue until you reach a cause that the organisation can take action on to prevent recurrence. Stopping too early results in superficial fixes; going too far can lead to causes so abstract they cannot be practically addressed. The root cause should be specific, actionable, and within the organisation's sphere of influence."
  },
  {
    id: "5whys-branching",
    question: "What should you do when a 'why' question has more than one valid answer?",
    options: [
      "Choose the most likely answer and ignore the others",
      "Follow all valid branches of causation, as each may lead to a different root cause that needs addressing",
      "Stop the investigation and start again with a different technique",
      "Ask the supervisor to choose which answer to pursue"
    ],
    correctIndex: 1,
    explanation: "When a 'why' question produces multiple valid answers, each branch should be followed separately. Complex failures often have multiple causal pathways, and following only one may miss important root causes. This branching is normal and expected — it transforms the simple linear chain into a cause tree that provides a more complete picture of the failure."
  },
  {
    id: "5whys-verification",
    question: "How can you verify that a 5 Whys analysis has correctly identified the root cause?",
    options: [
      "Ask the team if they agree with the conclusion",
      "Read the causal chain in reverse — if each 'therefore' statement logically leads to the next, the chain is valid",
      "Check if the root cause matches a textbook example",
      "Wait to see if the failure recurs"
    ],
    correctIndex: 1,
    explanation: "The 'therefore' test reads the causal chain in reverse: starting from the root cause, each step should logically lead to the next using the word 'therefore'. For example: 'The torque wrench was not calibrated, therefore the connection was under-tightened, therefore the connection overheated, therefore the cable insulation failed.' If any 'therefore' link does not make logical sense, the causal chain needs revision."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "The 5 Whys technique was originally developed by:",
    options: [
      "The UK Health and Safety Executive",
      "Sakichi Toyoda as part of the Toyota Production System",
      "The Institution of Engineering and Technology",
      "The British Standards Institution"
    ],
    correctAnswer: 1,
    explanation: "The 5 Whys technique was developed by Sakichi Toyoda and became a cornerstone of the Toyota Production System. It was designed as a practical, no-cost problem-solving tool that could be used by anyone on the production floor without specialist training or statistical knowledge."
  },
  {
    id: 2,
    question: "A motor fails to start. Why? The contactor does not pull in. Why? The control circuit fuse has blown. Why? The fuse was rated at 2 A but the contactor coil inrush is 3.5 A. What is the root cause?",
    options: [
      "The motor has failed",
      "The contactor is faulty",
      "The control circuit fuse is incorrectly rated for the contactor coil inrush current",
      "The fuse has blown"
    ],
    correctAnswer: 2,
    explanation: "Following the causal chain reveals that the root cause is the incorrect fuse rating — a fuse rated at 2 A cannot withstand the 3.5 A inrush current of the contactor coil. Simply replacing the fuse (symptom treatment) would result in repeated failure. The corrective action is to install a correctly rated fuse, and the preventive action is to verify fuse ratings against circuit requirements during design review."
  },
  {
    id: 3,
    question: "Which of the following is a common pitfall when applying the 5 Whys technique?",
    options: [
      "Asking too many questions",
      "Stopping at the first technical answer without exploring human and organisational factors",
      "Documenting the analysis on paper",
      "Involving too many people in the investigation"
    ],
    correctAnswer: 1,
    explanation: "A very common pitfall is stopping the analysis at the first technical cause without exploring deeper. For example, stopping at 'the bearing failed' rather than asking why the bearing failed (e.g., no lubrication schedule) and why there was no lubrication schedule (e.g., inadequate maintenance planning). The deepest, most preventive root causes are often organisational."
  },
  {
    id: 4,
    question: "In a 5 Whys analysis, what does 'branching' refer to?",
    options: [
      "Switching to a different analysis technique midway",
      "Following multiple causal pathways when a single 'why' produces more than one valid answer",
      "Dividing the investigation team into smaller groups",
      "Branching electrical circuits for fault isolation"
    ],
    correctAnswer: 1,
    explanation: "Branching occurs when asking 'why' produces more than one valid answer. Each valid answer represents a different causal pathway that should be followed independently. This produces a cause tree rather than a simple linear chain, providing a more comprehensive understanding of the failure and potentially identifying multiple root causes."
  },
  {
    id: 5,
    question: "An RCD trips. Why? Earth leakage exceeds 30 mA. Why? Cable insulation has degraded in the conduit run. Why? Water has entered the conduit through a missing gland. Why? The gland was omitted during the original installation. The most effective corrective action is:",
    options: [
      "Reset the RCD and monitor",
      "Replace the cable insulation in the affected section",
      "Install the missing gland and inspect all other conduit entries for similar omissions",
      "Replace the RCD with a less sensitive model"
    ],
    correctAnswer: 2,
    explanation: "The root cause is the missing gland from installation. Installing the missing gland corrects the immediate cause, but inspecting all other conduit entries for similar omissions addresses the systemic issue — if one gland was missed, others may have been too. This combination of corrective and preventive action is the hallmark of effective RCA."
  },
  {
    id: 6,
    question: "The 'therefore' test is used to:",
    options: [
      "Determine who is responsible for the failure",
      "Calculate the financial cost of the failure",
      "Verify the logical validity of the causal chain by reading it in reverse",
      "Decide which analysis technique to use"
    ],
    correctAnswer: 2,
    explanation: "The 'therefore' test checks the logical soundness of the causal chain by reversing it. Starting from the root cause, each link should logically lead to the next using 'therefore'. If a link does not make logical sense when read in this direction, it indicates a gap or error in the analysis that needs to be investigated further."
  },
  {
    id: 7,
    question: "Which of the following limitations of the 5 Whys technique is most significant?",
    options: [
      "It takes too long to complete",
      "It relies on the knowledge and experience of the participants, which may introduce bias or miss causes outside their expertise",
      "It produces too many root causes",
      "It cannot be documented"
    ],
    correctAnswer: 1,
    explanation: "The biggest limitation of the 5 Whys is its dependence on the knowledge of the people conducting the analysis. If the team lacks expertise in a relevant area (e.g., electrical design, metallurgy, control systems), they may not identify causes in that domain. This is why complex failures may require the 5 Whys to be supplemented with other techniques and specialist input."
  },
  {
    id: 8,
    question: "A 5 Whys analysis is most effective when conducted:",
    options: [
      "By a single experienced engineer working alone",
      "By a cross-functional team including people with direct knowledge of the equipment, process and management systems",
      "By the person who caused the failure",
      "By external consultants with no knowledge of the site"
    ],
    correctAnswer: 1,
    explanation: "The 5 Whys is most effective when conducted by a small cross-functional team that brings diverse knowledge to the table. Maintenance technicians contribute hands-on equipment knowledge, operators contribute process understanding, engineers contribute design knowledge, and managers contribute insight into organisational systems. This diversity reduces bias and increases the likelihood of identifying all relevant causes."
  },
  {
    id: 9,
    question: "When applying the 5 Whys to an electrical failure, which type of 'why' answer should be avoided?",
    options: [
      "Answers that identify procedural gaps",
      "Answers that blame a specific individual without examining the systemic factors that allowed the error to occur",
      "Answers that identify training deficiencies",
      "Answers that point to equipment design issues"
    ],
    correctAnswer: 1,
    explanation: "Answers that assign personal blame are counterproductive in RCA. The goal is to identify systemic causes that can be corrected to prevent recurrence — not to punish individuals. If a person made an error, the productive question is: why did the system allow that error to occur? Was training adequate? Were procedures clear? Was supervision appropriate? Was the task design error-proofed?"
  },
  {
    id: 10,
    question: "A distribution board catches fire. Investigation reveals a loose neutral connection. The 5 Whys reveals the neutral bar torque was never checked after installation because the commissioning checklist did not include neutral bar torque verification. The root cause category is:",
    options: [
      "Technical — the neutral bar was defective",
      "Environmental — the ambient temperature was too high",
      "Organisational — the commissioning procedure was incomplete",
      "Random — it was an unpredictable event"
    ],
    correctAnswer: 2,
    explanation: "The deepest root cause is organisational — the commissioning checklist (a management system document) did not include verification of neutral bar torque. While the immediate technical cause was a loose connection, the reason it was loose was that no one checked it, and the reason no one checked it was that the procedure did not require it. Correcting the checklist prevents this failure across all future installations."
  },
  {
    id: 11,
    question: "How does the 5 Whys technique relate to continuous improvement under ST1426?",
    options: [
      "It is unrelated to continuous improvement",
      "It provides a structured method for identifying improvement opportunities arising from failures, which is a core requirement of the maintenance technician standard",
      "It is only used during the end-point assessment",
      "It replaces the need for planned preventive maintenance"
    ],
    correctAnswer: 1,
    explanation: "The 5 Whys is a fundamental continuous improvement tool. By identifying root causes and implementing corrective and preventive actions, each failure becomes an opportunity to improve the maintenance system. ST1426 specifically requires maintenance technicians to contribute to continuous improvement — the 5 Whys provides a practical, accessible method for doing so."
  },
  {
    id: 12,
    question: "Which of the following would strengthen a 5 Whys analysis of an electrical equipment failure?",
    options: [
      "Conducting the analysis before any evidence is gathered",
      "Supporting each 'why' answer with factual evidence such as test data, maintenance records, photographs or manufacturer specifications",
      "Completing the analysis as quickly as possible to minimise downtime",
      "Assuming the most common cause is always the root cause"
    ],
    correctAnswer: 1,
    explanation: "Evidence-based analysis is far more reliable than opinion-based analysis. Each 'why' answer should ideally be supported by factual evidence — test results, maintenance records, photographic evidence, manufacturer data, or operational logs. This prevents the analysis from being driven by assumptions or bias and ensures the conclusions are defensible and accurate."
  }
];

const faqs = [
  {
    question: "Do I always have to ask exactly five 'why' questions?",
    answer: "No. The number five is a guideline, not a rule. Some root causes are reached in three iterations; others may require seven or more. The key is to keep asking 'why' until you reach a cause that is actionable, within the organisation's control, and whose correction would prevent recurrence. Stopping too early results in superficial fixes; continuing too far can lead to causes too abstract to action."
  },
  {
    question: "Can the 5 Whys be used for near misses as well as actual failures?",
    answer: "Absolutely. In fact, applying the 5 Whys to near misses is one of the most valuable applications. Near misses are free lessons — they reveal the same latent failures and causal chains as actual failures, but without the consequences. Organisations with strong safety cultures investigate near misses with the same rigour as actual incidents."
  },
  {
    question: "What should I do if the 5 Whys leads to a root cause outside my organisation's control?",
    answer: "If the root cause lies outside your direct control (e.g., a manufacturer's design defect), document it and report it through appropriate channels — to the manufacturer, to procurement, or to the relevant regulatory body. Within your organisation, focus on the highest-level cause that you can influence, such as improving incoming inspection, changing supplier, or specifying additional testing requirements."
  },
  {
    question: "How long should a 5 Whys analysis take?",
    answer: "A straightforward 5 Whys analysis can be completed in 15-30 minutes with a knowledgeable team. More complex failures with multiple branches may take several hours or even multiple sessions as evidence is gathered. The important thing is not speed but thoroughness — a quick but superficial analysis is worse than no analysis at all because it creates a false sense of having addressed the problem."
  },
  {
    question: "Should I use the 5 Whys for every failure, no matter how minor?",
    answer: "Not necessarily. For truly minor, isolated failures with no safety significance, a simple fault report may be sufficient. However, any failure that involves safety, repeated occurrence, significant cost, or production impact should receive a formal 5 Whys analysis. When in doubt, apply the technique — it is quick, costs nothing, and often reveals issues that would otherwise go unnoticed."
  }
];

const MOETModule4Section6_2 = () => {
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
            <span>Module 4.6.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            The '5 Whys' Technique
          </h1>
          <p className="text-white/80">
            Using iterative questioning for systematic root cause investigation in electrical maintenance
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Method:</strong> Iteratively ask 'why' to trace from symptom to root cause</li>
              <li className="pl-1"><strong>Origin:</strong> Toyota Production System — Sakichi Toyoda</li>
              <li className="pl-1"><strong>Branching:</strong> Multiple valid answers create a cause tree</li>
              <li className="pl-1"><strong>Verification:</strong> 'Therefore' test reads the chain in reverse</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Electrical Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Application:</strong> Motor failures, tripping, overheating, cable faults</li>
              <li className="pl-1"><strong>Depth:</strong> Moves beyond component replacement to systemic prevention</li>
              <li className="pl-1"><strong>Team:</strong> Best conducted with cross-functional knowledge</li>
              <li className="pl-1"><strong>ST1426:</strong> Maps to fault diagnosis and continuous improvement</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the origins and principles of the 5 Whys technique",
              "Apply the 5 Whys method to electrical maintenance failure scenarios",
              "Handle branching causal chains when multiple causes exist",
              "Use the 'therefore' test to verify the logical validity of the analysis",
              "Recognise the limitations of the 5 Whys and when to supplement with other techniques",
              "Document and communicate 5 Whys findings effectively under ST1426 requirements"
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
            Origins and Principles of the 5 Whys
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The 5 Whys technique was developed by Sakichi Toyoda, the founder of Toyota Industries, in the 1930s. It became a fundamental component of the Toyota Production System and has since been adopted across virtually every industry as one of the simplest and most effective root cause analysis tools available. Its beauty lies in its simplicity: it requires no statistical knowledge, no specialist software, and no expensive equipment — just a willingness to keep asking "why" until the real reason for a failure is uncovered.
            </p>
            <p>
              The principle is deceptively simple. When a problem or failure occurs, you ask "why did this happen?" and obtain an answer. You then take that answer and ask "why?" again. You continue this iterative process, peeling back each layer of causation, until you arrive at a root cause — a fundamental deficiency that, if corrected, would prevent the failure from recurring. The number five is not prescriptive; it is simply an observation that five iterations are often sufficient to move from a surface-level symptom to a meaningful root cause.
            </p>
            <p>
              In electrical maintenance, the 5 Whys transforms the way technicians approach fault diagnosis. Instead of simply replacing the failed component and moving on, the technique encourages deeper thinking: Why did the component fail? Was it the wrong component for the application? Was the maintenance schedule adequate? Was the installation carried out correctly? Each "why" moves the investigation from the technical symptom towards the human and organisational factors that created the conditions for the failure.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Core Principles</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Start with the problem statement:</strong> Define the failure clearly and specifically — "Motor M-101 tripped on overload at 14:35 on 12 January" is better than "the motor stopped"</li>
                <li className="pl-1"><strong>Ask 'why' iteratively:</strong> Each answer becomes the basis for the next question</li>
                <li className="pl-1"><strong>Base answers on evidence:</strong> Avoid speculation and opinion — use data, records, test results, and observations</li>
                <li className="pl-1"><strong>Follow all branches:</strong> When a question has multiple valid answers, follow each branch</li>
                <li className="pl-1"><strong>Stop at actionable causes:</strong> Continue until you reach a cause the organisation can control and correct</li>
                <li className="pl-1"><strong>Avoid blame:</strong> Focus on systemic causes, not individual fault</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Important Distinction</p>
              <p className="text-sm text-white">
                The 5 Whys is a root cause analysis tool, not a fault-finding procedure. Fault-finding identifies what has failed and locates the defective component. Root cause analysis asks why the component failed in the first place. Both are essential skills for the maintenance technician, but they serve different purposes. You must first find the fault (using systematic fault diagnosis), then ask why it occurred (using root cause analysis).
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Worked Examples in Electrical Maintenance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The best way to understand the 5 Whys is through practical examples. The following worked examples demonstrate how the technique applies to common electrical maintenance scenarios, illustrating how each "why" peels back a layer of causation to reveal deeper systemic issues.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Example 1: Distribution Board Fire</h3>
              <p className="text-sm text-white mb-3 italic">Problem: A distribution board in a commercial premises caught fire, causing extensive damage.</p>
              <div className="space-y-2 text-sm text-white">
                <p><strong className="text-elec-yellow/80">Why 1:</strong> Why did the distribution board catch fire? <em>Because a cable termination overheated to the point of ignition.</em></p>
                <p><strong className="text-elec-yellow/80">Why 2:</strong> Why did the termination overheat? <em>Because the connection had become loose, creating high resistance and localised heating.</em></p>
                <p><strong className="text-elec-yellow/80">Why 3:</strong> Why was the connection loose? <em>Because the terminal screws were not tightened to the correct torque when the circuit was installed.</em></p>
                <p><strong className="text-elec-yellow/80">Why 4:</strong> Why were the screws not correctly torqued? <em>Because the installer did not use a torque screwdriver and relied on feel.</em></p>
                <p><strong className="text-elec-yellow/80">Why 5:</strong> Why did the installer not use a torque screwdriver? <em>Because the company's installation procedure did not require torque-controlled tightening, and no torque tools were provided.</em></p>
              </div>
              <div className="mt-3 p-3 rounded bg-white/5">
                <p className="text-sm text-white"><strong>Root cause:</strong> Organisational — the installation procedure did not specify torque-controlled tightening and the company did not provide appropriate tools.</p>
                <p className="text-sm text-white mt-1"><strong>Corrective actions:</strong> Update installation procedures to require torque-controlled tightening to manufacturer specifications; procure calibrated torque screwdrivers for all installation teams; implement spot-check inspections on completed work.</p>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Example 2: Repeated Motor Failure</h3>
              <p className="text-sm text-white mb-3 italic">Problem: A pump motor on a water treatment plant fails every 6-8 months despite replacement.</p>
              <div className="space-y-2 text-sm text-white">
                <p><strong className="text-elec-yellow/80">Why 1:</strong> Why does the motor keep failing? <em>Because the winding insulation breaks down.</em></p>
                <p><strong className="text-elec-yellow/80">Why 2:</strong> Why does the insulation break down? <em>Because the motor runs at temperatures significantly above its rated thermal class.</em></p>
                <p><strong className="text-elec-yellow/80">Why 3:</strong> Why does the motor overheat? <em>Because the cooling fan shroud is partially blocked with debris, and the motor is running at higher than design current.</em></p>
                <p><strong className="text-elec-yellow/80">Why 4:</strong> Why is the current higher than design? <em>Because the pump throughput was increased by 30% last year to meet higher demand, but the motor was not upsized.</em></p>
                <p><strong className="text-elec-yellow/80">Why 5:</strong> Why was the motor not upsized when throughput was increased? <em>Because the process change was implemented by the operations team without a management of change review that would have flagged the impact on the motor.</em></p>
              </div>
              <div className="mt-3 p-3 rounded bg-white/5">
                <p className="text-sm text-white"><strong>Root cause:</strong> Organisational — no management of change (MOC) process to assess the engineering impact of operational changes on equipment ratings.</p>
                <p className="text-sm text-white mt-1"><strong>Corrective actions:</strong> Install correctly rated motor; implement a management of change procedure requiring engineering review of all process changes; clean and maintain fan shroud as part of PPM schedule.</p>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Example 3: UPS Failure During Power Cut</h3>
              <p className="text-sm text-white mb-3 italic">Problem: A UPS system failed to support the critical load during a mains power failure in a data centre.</p>
              <div className="space-y-2 text-sm text-white">
                <p><strong className="text-elec-yellow/80">Why 1:</strong> Why did the UPS fail to support the load? <em>Because the battery bank could not deliver sufficient capacity.</em></p>
                <p><strong className="text-elec-yellow/80">Why 2:</strong> Why was the battery capacity insufficient? <em>Because several battery cells had failed and were not delivering their rated capacity.</em></p>
                <p><strong className="text-elec-yellow/80">Why 3:</strong> Why had the cells failed? <em>Because the batteries had reached end of life — they were 8 years old in a system designed for 5-year battery life.</em></p>
                <p><strong className="text-elec-yellow/80">Why 4:</strong> Why were the batteries not replaced at their design life? <em>Because the battery replacement was deferred twice due to budget constraints.</em></p>
                <p><strong className="text-elec-yellow/80">Why 5:</strong> Why were budget constraints allowed to override a critical maintenance requirement? <em>Because the maintenance team had no formal process for escalating safety-critical deferrals to senior management for risk acceptance.</em></p>
              </div>
              <div className="mt-3 p-3 rounded bg-white/5">
                <p className="text-sm text-white"><strong>Root cause:</strong> Organisational — no formal escalation process for safety-critical maintenance deferrals, allowing budget decisions to override engineering necessity without informed risk acceptance by senior management.</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Notice how all three examples moved from a technical symptom to an organisational root cause. This is typical of well-conducted 5 Whys analyses — the deepest causes are almost always found in management systems, procedures, or organisational culture.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Branching and the Cause Tree
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              In practice, many failures have more than one causal pathway. When you ask "why?" and receive two or more equally valid answers, each answer represents a branch that should be followed independently. This transforms the simple linear chain of the basic 5 Whys into a cause tree — a more comprehensive representation of the failure's multiple root causes.
            </p>
            <p>
              Branching is not a complication to be avoided; it is a natural and valuable feature of the technique. Complex failures in electrical systems almost always have multiple contributing causes, and failing to follow all branches means missing root causes that could lead to future failures. The cause tree provides a complete picture, enabling a comprehensive set of corrective and preventive actions.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Branching Example: Cable Joint Failure</h3>
              <p className="text-sm text-white mb-3 italic">Problem: An underground cable joint failed, causing loss of supply to a critical process.</p>
              <div className="space-y-2 text-sm text-white">
                <p><strong className="text-elec-yellow/80">Why 1:</strong> Why did the cable joint fail? <em>Because water ingress caused insulation breakdown.</em></p>
                <p className="text-sm text-white mt-2 mb-1">This branches into two paths:</p>
              </div>
              <div className="ml-4 mt-2 space-y-3">
                <div className="p-3 rounded bg-white/5 border-l-2 border-elec-yellow/30">
                  <p className="text-sm text-white font-medium mb-2">Branch A — Why was there water ingress?</p>
                  <p className="text-sm text-white"><strong className="text-elec-yellow/80">Why 2A:</strong> The heat-shrink sleeve did not seal properly.</p>
                  <p className="text-sm text-white"><strong className="text-elec-yellow/80">Why 3A:</strong> The jointer did not apply sufficient heat to achieve a full seal.</p>
                  <p className="text-sm text-white"><strong className="text-elec-yellow/80">Why 4A:</strong> The jointer had not received refresher training on the updated joint kit that required higher temperatures.</p>
                  <p className="text-sm text-white mt-1"><em>Root cause A: Training gap — no refresher training provided when joint kit specifications changed.</em></p>
                </div>
                <div className="p-3 rounded bg-white/5 border-l-2 border-elec-yellow/30">
                  <p className="text-sm text-white font-medium mb-2">Branch B — Why was the insulation vulnerable to water?</p>
                  <p className="text-sm text-white"><strong className="text-elec-yellow/80">Why 2B:</strong> The cable joint pit did not have adequate drainage.</p>
                  <p className="text-sm text-white"><strong className="text-elec-yellow/80">Why 3B:</strong> The original drainage was blocked by silt and debris.</p>
                  <p className="text-sm text-white"><strong className="text-elec-yellow/80">Why 4B:</strong> Cable joint pit inspection and drainage clearance was not included in the PPM schedule.</p>
                  <p className="text-sm text-white mt-1"><em>Root cause B: Maintenance programme gap — cable joint pit maintenance not scheduled.</em></p>
                </div>
              </div>
              <p className="text-sm text-white mt-3">
                Both root causes need to be addressed: updating training for the new joint kit specification and adding cable joint pit inspection to the PPM schedule. Correcting only one branch would leave the other vulnerability in place.
              </p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Managing Branching in Practice</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Document each branch:</strong> Use a tree diagram or indented list format to keep track of multiple branches</li>
                <li className="pl-1"><strong>Prioritise branches:</strong> If time is limited, focus first on branches that relate to safety or that are most likely to lead to recurrence</li>
                <li className="pl-1"><strong>Merge where branches converge:</strong> Different branches sometimes lead to the same root cause — this is strong evidence that the identified root cause is significant</li>
                <li className="pl-1"><strong>Do not force branches to converge:</strong> Different root causes are perfectly normal — not every failure has a single root cause</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            The 'Therefore' Test and Verification
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Once you have completed a 5 Whys chain, it is essential to verify that the causal logic is sound. The 'therefore' test is a simple but effective verification method that reads the causal chain in reverse, using the word "therefore" to connect each step. If every "therefore" statement makes logical sense, the chain is valid. If any link breaks down logically, the analysis needs revision at that point.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Applying the 'Therefore' Test</h3>
              <p className="text-sm text-white mb-3">Using Example 1 (Distribution Board Fire) from the previous section:</p>
              <div className="space-y-2 text-sm text-white">
                <p>"The installation procedure did not require torque-controlled tightening, <strong className="text-elec-yellow/80">therefore</strong> the installer did not use a torque screwdriver."</p>
                <p>"The installer did not use a torque screwdriver, <strong className="text-elec-yellow/80">therefore</strong> the terminal screws were not correctly torqued."</p>
                <p>"The terminal screws were not correctly torqued, <strong className="text-elec-yellow/80">therefore</strong> the connection became loose over time."</p>
                <p>"The connection became loose, <strong className="text-elec-yellow/80">therefore</strong> it overheated due to high resistance."</p>
                <p>"The connection overheated, <strong className="text-elec-yellow/80">therefore</strong> the distribution board caught fire."</p>
              </div>
              <p className="text-sm text-white mt-3">
                Each "therefore" statement is logically sound, confirming the causal chain is valid. If any statement did not follow logically — for example, if the installer had used a torque screwdriver but used the wrong setting — the chain would need to be revised at that point to reflect the actual evidence.
              </p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Common Verification Errors</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Logical leaps:</strong> Skipping intermediate steps in the causal chain, making the "therefore" link unconvincing</li>
                <li className="pl-1"><strong>Assumed causation:</strong> Stating that A caused B without evidence — correlation is not causation</li>
                <li className="pl-1"><strong>Circular reasoning:</strong> The chain loops back on itself, with a later "why" answer being the same as an earlier one</li>
                <li className="pl-1"><strong>Opinion masquerading as fact:</strong> "Why" answers based on assumption rather than evidence</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Documenting the 5 Whys Analysis</h3>
              <p className="text-sm text-white mb-3">
                A well-documented 5 Whys analysis should include the following elements:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Problem statement:</strong> Clear, specific description of the failure, including date, time, location and equipment identification</li>
                <li className="pl-1"><strong>Investigation team:</strong> Names and roles of all participants</li>
                <li className="pl-1"><strong>Evidence gathered:</strong> List of data sources — test results, maintenance records, photographs, witness statements</li>
                <li className="pl-1"><strong>The causal chain:</strong> Each "why" question and answer, clearly numbered and with supporting evidence referenced</li>
                <li className="pl-1"><strong>Root cause statement:</strong> A clear, concise statement of the root cause(s) identified</li>
                <li className="pl-1"><strong>Corrective actions:</strong> Specific actions to address the root cause, with owners and target dates</li>
                <li className="pl-1"><strong>Preventive actions:</strong> Actions to prevent similar failures elsewhere, including lessons learned</li>
                <li className="pl-1"><strong>Verification:</strong> How and when the effectiveness of the corrective actions will be verified</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> The ability to document and communicate the findings of a root cause investigation is assessed under the maintenance technician standard. Your documentation should be clear enough that someone unfamiliar with the failure could understand the complete causal chain and the rationale for the corrective actions.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Limitations and When to Use Other Techniques
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The 5 Whys is a powerful and accessible tool, but it has limitations that maintenance technicians should understand. Recognising these limitations is not a criticism of the technique — it is a sign of maturity in root cause analysis, enabling you to select the right tool for each investigation and to supplement the 5 Whys where necessary.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Limitations</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Subjectivity:</strong> The quality of the analysis depends entirely on the knowledge and experience of the participants. If no one in the team understands a particular failure mechanism, the 5 Whys will not lead to it</li>
                <li className="pl-1"><strong>Single-track thinking:</strong> Without deliberate effort to identify branches, the basic 5 Whys can funnel the investigation into a single linear chain, missing other causal pathways</li>
                <li className="pl-1"><strong>Difficulty with complex interactions:</strong> For failures involving complex interactions between multiple systems or subsystems, the simple "why" chain may not capture the full picture. Fishbone diagrams (covered in Section 4.6.3) are better suited to these situations</li>
                <li className="pl-1"><strong>No inherent structure for evidence:</strong> The technique does not naturally prompt the investigator to gather specific types of evidence — this discipline must be added consciously</li>
                <li className="pl-1"><strong>Blame tendency:</strong> Without careful facilitation, the "why" chain can drift towards personal blame rather than systemic causes — particularly under organisational pressure to find someone at fault</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">When to Use Other Techniques</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Situation</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Better Technique</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Why</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Multiple interacting causes</td>
                      <td className="border border-white/10 px-3 py-2">Fishbone (Ishikawa) diagram</td>
                      <td className="border border-white/10 px-3 py-2">Structured categories help identify causes across all domains</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Complex system with many components</td>
                      <td className="border border-white/10 px-3 py-2">Fault tree analysis (FTA)</td>
                      <td className="border border-white/10 px-3 py-2">Top-down logical analysis of failure combinations</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Recurring failures with data history</td>
                      <td className="border border-white/10 px-3 py-2">Pareto analysis + 5 Whys</td>
                      <td className="border border-white/10 px-3 py-2">Data identifies the most frequent causes; 5 Whys investigates each</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Human error in complex tasks</td>
                      <td className="border border-white/10 px-3 py-2">Human factors analysis (HEART/SHERPA)</td>
                      <td className="border border-white/10 px-3 py-2">Specialist techniques designed for human error analysis</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Major incident with regulatory scrutiny</td>
                      <td className="border border-white/10 px-3 py-2">Formal RCFA (Root Cause Failure Analysis)</td>
                      <td className="border border-white/10 px-3 py-2">Comprehensive methodology with evidence standards suitable for regulatory reporting</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Best Practice Tips</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Involve people with direct knowledge of the equipment</li>
                  <li className="pl-1">Base every answer on evidence, not assumption</li>
                  <li className="pl-1">Follow all branches — do not discard valid answers</li>
                  <li className="pl-1">Always verify with the "therefore" test</li>
                  <li className="pl-1">Keep asking until you reach a systemic, actionable cause</li>
                  <li className="pl-1">Document everything for future reference</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Combining Techniques</h3>
                <p className="text-sm text-white">
                  The most effective approach is often to combine the 5 Whys with other techniques. Use a fishbone diagram to brainstorm all potential causes across different categories, then apply the 5 Whys to each of the most likely causes to drill down to root causes. This combination provides both breadth (fishbone) and depth (5 Whys) in the investigation.
                </p>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Note:</strong> The 5 Whys is at its best for straightforward, well-defined failures where the causal chain is relatively clear. For complex, multi-factor incidents — particularly those involving safety — consider using it as a starting point and then validating and expanding the findings with more structured techniques.
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
                <p className="font-medium text-white mb-1">5 Whys Process</p>
                <ul className="space-y-0.5">
                  <li>1. Define the problem statement clearly</li>
                  <li>2. Ask "why?" and answer with evidence</li>
                  <li>3. Take the answer and ask "why?" again</li>
                  <li>4. Follow all branches where multiple causes exist</li>
                  <li>5. Continue until an actionable root cause is reached</li>
                  <li>6. Verify with the "therefore" test</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Principles</p>
                <ul className="space-y-0.5">
                  <li>Evidence-based answers, not assumptions</li>
                  <li>Follow all branches — do not force single-track</li>
                  <li>Stop at actionable, controllable causes</li>
                  <li>Focus on systemic causes, not individual blame</li>
                  <li>Document with supporting evidence references</li>
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
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section6-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Identifying Underlying Failures
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section6-3">
              Next: Fishbone (Ishikawa) Diagrams
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule4Section6_2;
