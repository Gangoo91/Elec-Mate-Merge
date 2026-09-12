/**
 * MOET · Module 4 · Section 6.2 · Subsection 2 — The Five Whys Technique
 *
 * Standard: ST1426 Engineering maintenance technician – single discipline,
 * electrical option. NOT ST0154 (the "MOET" the course is named after) —
 * ST0154 v1.6 is still live, but its own EPA plan records that the Electrical
 * Technician option "was retired 31/12/2025" and was replaced by ST1426
 * (single discipline) or ST1443 (dual discipline). The course keeps the MOET
 * name because that is what employers and colleges still call the role.
 *
 * KSBs covered, quoted rather than numbered: the IfATE/Skills England API
 * publishes these statements without their K/S/B codes, and the published
 * numbering has not been verified against a primary source — so do not
 * invent codes here.
 *   Knowledge  · "Electrical. Problem solving and critical reasoning
 *                 techniques."
 *   Behaviour  · "Continuous improvement (CI) systems and techniques."
 *
 * The worked examples (distribution board fire, repeated motor failure, UPS
 * failure, cable joint failure) are the original page's own scenarios,
 * preserved verbatim and mapped onto the Scenario component.
 *
 * Converted onto the study-centre learning kit. Content preserved from the
 * original page; structure, shell and reading measure rebuilt.
 */

import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import {
  StudyPage,
  Bleed,
  ReadingProgress,
  TLDR,
  ConceptBlock,
  Scenario,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
  AppendixTable,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = "The '5 Whys' Technique - MOET Module 4.6.2";
const DESCRIPTION =
  'Comprehensive guide to the 5 Whys root cause analysis technique for electrical maintenance technicians: applying iterative questioning, worked examples in electrical fault diagnosis, limitations and best practices under ST1426.';

const quickCheckQuestions = [
  {
    id: '5whys-principle',
    question: 'What is the fundamental principle behind the 5 Whys technique?',
    options: [
      'Asking exactly five questions about every failure',
      "Iteratively asking 'why' to peel back layers of causation until the root cause is reached",
      'Interviewing five different people about the failure',
      'Checking five different components in the failed system',
    ],
    correctIndex: 1,
    explanation:
      "The 5 Whys technique works by iteratively asking 'why' at each level of causation, moving from the visible symptom deeper into the causal chain. The number five is a guideline, not a rule — some investigations require fewer or more iterations to reach the root cause. The key is to keep asking 'why' until you reach a cause that is actionable and within the organisation's control.",
  },
  {
    id: '5whys-stopping',
    question: "When should you stop asking 'why' in a 5 Whys analysis?",
    options: [
      "When you reach a cause that is within the organisation's control to correct and that would prevent recurrence",
      'Always after exactly five questions, regardless of whether a root cause has been reached',
      'As soon as you identify the component that physically failed',
      'When the cause can be attributed to a specific individual who made the error',
    ],
    correctIndex: 0,
    explanation:
      "The investigation should continue until you reach a cause that the organisation can take action on to prevent recurrence. Stopping too early results in superficial fixes; going too far can lead to causes so abstract they cannot be practically addressed. The root cause should be specific, actionable, and within the organisation's sphere of influence.",
  },
  {
    id: '5whys-branching',
    question: "What should you do when a 'why' question has more than one valid answer?",
    options: [
      'Choose the single most likely answer and discard the others to keep the chain simple',
      'Stop the analysis, as multiple answers mean the technique cannot be applied',
      'Follow all valid branches of causation, as each may lead to a different root cause that needs addressing',
      'Pick the answer that points to an individual rather than a system',
    ],
    correctIndex: 2,
    explanation:
      "When a 'why' question produces multiple valid answers, each branch should be followed separately. Complex failures often have multiple causal pathways, and following only one may miss important root causes. This branching is normal and expected — it transforms the simple linear chain into a cause tree that provides a more complete picture of the failure.",
  },
  {
    id: '5whys-verification',
    question: 'How can you verify that a 5 Whys analysis has correctly identified the root cause?',
    options: [
      "Confirm that exactly five 'why' questions were asked, no more and no fewer",
      "Read the causal chain in reverse — if each 'therefore' statement logically leads to the next, the chain is valid",
      'Check that the analysis identifies a single individual responsible for the failure',
      'Ensure the analysis was completed within fifteen minutes of the failure occurring',
    ],
    correctIndex: 1,
    explanation:
      "The 'therefore' test reads the causal chain in reverse: starting from the root cause, each step should logically lead to the next using the word 'therefore'. For example: 'The torque wrench was not calibrated, therefore the connection was under-tightened, therefore the connection overheated, therefore the cable insulation failed.' If any 'therefore' link does not make logical sense, the causal chain needs revision.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'The 5 Whys technique was originally developed by:',
    options: [
      'The UK Health and Safety Executive',
      'Sakichi Toyoda as part of the Toyota Production System',
      'The Institution of Engineering and Technology',
      'The British Standards Institution',
    ],
    correctAnswer: 1,
    explanation:
      'The 5 Whys technique was developed by Sakichi Toyoda and became a cornerstone of the Toyota Production System. It was designed as a practical, no-cost problem-solving tool that could be used by anyone on the production floor without specialist training or statistical knowledge.',
  },
  {
    id: 2,
    question:
      'A motor fails to start. Why? The contactor does not pull in. Why? The control circuit fuse has blown. Why? The fuse was rated at 2 A but the contactor coil inrush is 3.5 A. What is the root cause?',
    options: [
      'The contactor coil has failed and needs replacing',
      'The control circuit has a loose connection causing intermittent operation',
      'The control circuit fuse is incorrectly rated for the contactor coil inrush current',
      'The motor windings have gone open-circuit',
    ],
    correctAnswer: 2,
    explanation:
      'Following the causal chain reveals that the root cause is the incorrect fuse rating — a fuse rated at 2 A cannot withstand the 3.5 A inrush current of the contactor coil. Simply replacing the fuse (symptom treatment) would result in repeated failure. The corrective action is to install a correctly rated fuse, and the preventive action is to verify fuse ratings against circuit requirements during design review.',
  },
  {
    id: 3,
    question: 'Which of the following is a common pitfall when applying the 5 Whys technique?',
    options: [
      'Supporting each answer with documented evidence such as test data and records',
      'Following every valid branch of causation to its own root cause',
      'Involving a cross-functional team with knowledge of the equipment and process',
      'Stopping at the first technical answer without exploring human and organisational factors',
    ],
    correctAnswer: 3,
    explanation:
      "A very common pitfall is stopping the analysis at the first technical cause without exploring deeper. For example, stopping at 'the bearing failed' rather than asking why the bearing failed (e.g., no lubrication schedule) and why there was no lubrication schedule (e.g., inadequate maintenance planning). The deepest, most preventive root causes are often organisational.",
  },
  {
    id: 4,
    question: "In a 5 Whys analysis, what does 'branching' refer to?",
    options: [
      "Following multiple causal pathways when a single 'why' produces more than one valid answer",
      'Skipping intermediate steps to reach the root cause more quickly',
      'Splitting the investigation team into separate groups for each failure',
      "Asking the same 'why' question repeatedly until the answer changes",
    ],
    correctAnswer: 0,
    explanation:
      "Branching occurs when asking 'why' produces more than one valid answer. Each valid answer represents a different causal pathway that should be followed independently. This produces a cause tree rather than a simple linear chain, providing a more comprehensive understanding of the failure and potentially identifying multiple root causes.",
  },
  {
    id: 5,
    question:
      'An RCD trips. Why? Earth leakage exceeds 30 mA. Why? Cable insulation has degraded in the conduit run. Why? Water has entered the conduit through a missing gland. Why? The gland was omitted during the original installation. The most effective corrective action is:',
    options: [
      'Replace the RCD with a higher 100 mA type so that minor earth leakage no longer causes nuisance tripping',
      'Install the missing gland and inspect all other conduit entries for similar omissions',
      'Replace the degraded section of cable only and re-energise the circuit without further checks',
      'Reset the RCD and advise the user to reset it again whenever it trips in future',
    ],
    correctAnswer: 1,
    explanation:
      'The root cause is the missing gland from installation. Installing the missing gland corrects the immediate cause, but inspecting all other conduit entries for similar omissions addresses the systemic issue — if one gland was missed, others may have been too. This combination of corrective and preventive action is the hallmark of effective RCA.',
  },
  {
    id: 6,
    question: "The 'therefore' test is used to:",
    options: [
      'Decide how many why questions need to be asked before stopping',
      'Identify which individual was responsible for the failure',
      'Verify the logical validity of the causal chain by reading it in reverse',
      'Calculate the cost of the corrective actions required',
    ],
    correctAnswer: 2,
    explanation:
      "The 'therefore' test checks the logical soundness of the causal chain by reversing it. Starting from the root cause, each link should logically lead to the next using 'therefore'. If a link does not make logical sense when read in this direction, it indicates a gap or error in the analysis that needs to be investigated further.",
  },
  {
    id: 7,
    question: 'Which of the following limitations of the 5 Whys technique is most significant?',
    options: [
      'It requires expensive specialist software to record the causal chain',
      'It can only be applied to mechanical failures, not electrical ones',
      'It must always produce exactly one root cause for every failure',
      'It relies on the knowledge and experience of the participants, which may introduce bias or miss causes outside their expertise',
    ],
    correctAnswer: 3,
    explanation:
      'The biggest limitation of the 5 Whys is its dependence on the knowledge of the people conducting the analysis. If the team lacks expertise in a relevant area (e.g., electrical design, metallurgy, control systems), they may not identify causes in that domain. This is why complex failures may require the 5 Whys to be supplemented with other techniques and specialist input.',
  },
  {
    id: 8,
    question: 'A 5 Whys analysis is most effective when conducted:',
    options: [
      'By a cross-functional team including people with direct knowledge of the equipment, process and management systems',
      'By a single senior manager working alone, to keep the conclusions consistent and free of disagreement',
      'Several weeks after the failure, once memories have settled and the equipment has been returned to service',
      'By the individual judged most likely to have caused the failure, so they can explain their actions',
    ],
    correctAnswer: 0,
    explanation:
      'The 5 Whys is most effective when conducted by a small cross-functional team that brings diverse knowledge to the table. Maintenance technicians contribute hands-on equipment knowledge, operators contribute process understanding, engineers contribute design knowledge, and managers contribute insight into organisational systems. This diversity reduces bias and increases the likelihood of identifying all relevant causes.',
  },
  {
    id: 9,
    question:
      "When applying the 5 Whys to an electrical failure, which type of 'why' answer should be avoided?",
    options: [
      'Answers that identify a gap in the maintenance procedure or schedule',
      'Answers that blame a specific individual without examining the systemic factors that allowed the error to occur',
      'Answers that reference a design or specification deficiency',
      'Answers that are supported by test data and maintenance records',
    ],
    correctAnswer: 1,
    explanation:
      'Answers that assign personal blame are counterproductive in RCA. The goal is to identify systemic causes that can be corrected to prevent recurrence — not to punish individuals. If a person made an error, the productive question is: why did the system allow that error to occur? Was training adequate? Were procedures clear? Was supervision appropriate? Was the task design error-proofed?',
  },
  {
    id: 10,
    question:
      'A distribution board catches fire. Investigation reveals a loose neutral connection. The 5 Whys reveals the neutral bar torque was never checked after installation because the commissioning checklist did not include neutral bar torque verification. The root cause category is:',
    options: [
      'Technical — the neutral bar was defective',
      'Environmental — the ambient temperature was too high',
      'Organisational — the commissioning procedure was incomplete',
      'Random — it was an unpredictable event',
    ],
    correctAnswer: 2,
    explanation:
      'The deepest root cause is organisational — the commissioning checklist (a management system document) did not include verification of neutral bar torque. While the immediate technical cause was a loose connection, the reason it was loose was that no one checked it, and the reason no one checked it was that the procedure did not require it. Correcting the checklist prevents this failure across all future installations.',
  },
  {
    id: 11,
    question: 'How does the 5 Whys technique relate to continuous improvement under ST1426?',
    options: [
      'It replaces the need for any planned preventive maintenance programme',
      'It is only relevant to the safety modules, not to maintenance improvement',
      'It is used to allocate blame so that under-performing staff can be retrained',
      'It provides a structured method for identifying improvement opportunities arising from failures, which is a core requirement of the maintenance technician standard',
    ],
    correctAnswer: 3,
    explanation:
      'The 5 Whys is a fundamental continuous improvement tool. By identifying root causes and implementing corrective and preventive actions, each failure becomes an opportunity to improve the maintenance system. ST1426 specifically requires maintenance technicians to contribute to continuous improvement — the 5 Whys provides a practical, accessible method for doing so.',
  },
  {
    id: 12,
    question:
      'Which of the following would strengthen a 5 Whys analysis of an electrical equipment failure?',
    options: [
      "Supporting each 'why' answer with factual evidence such as test data, maintenance records, photographs or manufacturer specifications",
      'Limiting the chain to exactly five questions so the analysis stays consistent across every investigation',
      "Recording only the final root cause, since the intermediate 'why' answers are not needed once it is reached",
      'Completing the analysis as quickly as possible so the equipment can be returned to service without delay',
    ],
    correctAnswer: 0,
    explanation:
      "Evidence-based analysis is far more reliable than opinion-based analysis. Each 'why' answer should ideally be supported by factual evidence — test results, maintenance records, photographic evidence, manufacturer data, or operational logs. This prevents the analysis from being driven by assumptions or bias and ensures the conclusions are defensible and accurate.",
  },
];

const faqs = [
  {
    question: "Do I always have to ask exactly five 'why' questions?",
    answer:
      "No. The number five is a guideline, not a rule. Some root causes are reached in three iterations; others may require seven or more. The key is to keep asking 'why' until you reach a cause that is actionable, within the organisation's control, and whose correction would prevent recurrence. Stopping too early results in superficial fixes; continuing too far can lead to causes too abstract to action.",
  },
  {
    question: 'Can the 5 Whys be used for near misses as well as actual failures?',
    answer:
      'Absolutely. In fact, applying the 5 Whys to near misses is one of the most valuable applications. Near misses are free lessons — they reveal the same latent failures and causal chains as actual failures, but without the consequences. Organisations with strong safety cultures investigate near misses with the same rigour as actual incidents.',
  },
  {
    question:
      "What should I do if the 5 Whys leads to a root cause outside my organisation's control?",
    answer:
      "If the root cause lies outside your direct control (e.g., a manufacturer's design defect), document it and report it through appropriate channels — to the manufacturer, to procurement, or to the relevant regulatory body. Within your organisation, focus on the highest-level cause that you can influence, such as improving incoming inspection, changing supplier, or specifying additional testing requirements.",
  },
  {
    question: 'How long should a 5 Whys analysis take?',
    answer:
      'A straightforward 5 Whys analysis can be completed in 15-30 minutes with a knowledgeable team. More complex failures with multiple branches may take several hours or even multiple sessions as evidence is gathered. The important thing is not speed but thoroughness — a quick but superficial analysis is worse than no analysis at all because it creates a false sense of having addressed the problem.',
  },
  {
    question: 'Should I use the 5 Whys for every failure, no matter how minor?',
    answer:
      'Not necessarily. For truly minor, isolated failures with no safety significance, a simple fault report may be sufficient. However, any failure that involves safety, repeated occurrence, significant cost, or production impact should receive a formal 5 Whys analysis. When in doubt, apply the technique — it is quick, costs nothing, and often reveals issues that would otherwise go unnoticed.',
  },
];

const MOETModule4Section6_2 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 4 · Section 4.6 · Subsection 2"
        title="The 5 Whys Technique"
        backTo="/study-centre/apprentice/m-o-e-t-module4-section6"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Using iterative questioning for systematic root cause investigation in electrical
            maintenance.
          </p>

          <TLDR
            points={[
              "Method: Iteratively ask 'why' to trace from symptom to root cause",
              'Origin: Toyota Production System — Sakichi Toyoda',
              'Branching: Multiple valid answers create a cause tree',
              "Verification: 'Therefore' test reads the chain in reverse",
            ]}
          />

          <ConceptBlock title="Electrical maintenance context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Application:</strong> Motor failures, tripping, overheating, cable faults
              </li>
              <li>
                <strong>Depth:</strong> Moves beyond component replacement to systemic prevention
              </li>
              <li>
                <strong>Team:</strong> Best conducted with cross-functional knowledge
              </li>
              <li>
                <strong>ST1426:</strong> Maps to fault diagnosis and continuous improvement
              </li>
            </ul>
          </ConceptBlock>

          <LearningOutcomes
            outcomes={[
              'Explain the origins and principles of the 5 Whys technique',
              'Apply the 5 Whys method to electrical maintenance failure scenarios',
              'Handle branching causal chains when multiple causes exist',
              "Use the 'therefore' test to verify the logical validity of the analysis",
              'Recognise the limitations of the 5 Whys and when to supplement with other techniques',
              'Document and communicate 5 Whys findings effectively under ST1426 requirements',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Origins and principles of the 5 Whys</ContentEyebrow>

          <ConceptBlock
            title="Origins and Principles of the 5 Whys"
            onSite="Important distinction: The 5 Whys is a root cause analysis tool, not a fault-finding procedure. Fault-finding identifies what has failed and locates the defective component. Root cause analysis asks why the component failed in the first place. Both are essential skills for the maintenance technician, but they serve different purposes. You must first find the fault (using systematic fault diagnosis), then ask why it occurred (using root cause analysis)."
          >
            <p>
              The 5 Whys technique was developed by Sakichi Toyoda, the founder of Toyota
              Industries, in the 1930s. It became a fundamental component of the Toyota Production
              System and has since been adopted across virtually every industry as one of the
              simplest and most effective root cause analysis tools available. Its beauty lies in
              its simplicity: it requires no statistical knowledge, no specialist software, and no
              expensive equipment — just a willingness to keep asking &quot;why&quot; until the real
              reason for a failure is uncovered.
            </p>
            <p>
              The principle is deceptively simple. When a problem or failure occurs, you ask
              &quot;why did this happen?&quot; and obtain an answer. You then take that answer and
              ask &quot;why?&quot; again. You continue this iterative process, peeling back each
              layer of causation, until you arrive at a root cause — a fundamental deficiency that,
              if corrected, would prevent the failure from recurring. The number five is not
              prescriptive; it is simply an observation that five iterations are often sufficient to
              move from a surface-level symptom to a meaningful root cause.
            </p>
            <p>
              In electrical maintenance, the 5 Whys transforms the way technicians approach fault
              diagnosis. Instead of simply replacing the failed component and moving on, the
              technique encourages deeper thinking: Why did the component fail? Was it the wrong
              component for the application? Was the maintenance schedule adequate? Was the
              installation carried out correctly? Each &quot;why&quot; moves the investigation from
              the technical symptom towards the human and organisational factors that created the
              conditions for the failure.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Core principles">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Start with the problem statement:</strong> Define the failure clearly and
                specifically — &quot;Motor M-101 tripped on overload at 14:35 on 12 January&quot; is
                better than &quot;the motor stopped&quot;
              </li>
              <li>
                <strong>Ask &apos;why&apos; iteratively:</strong> Each answer becomes the basis for
                the next question
              </li>
              <li>
                <strong>Base answers on evidence:</strong> Avoid speculation and opinion — use data,
                records, test results, and observations
              </li>
              <li>
                <strong>Follow all branches:</strong> When a question has multiple valid answers,
                follow each branch
              </li>
              <li>
                <strong>Stop at actionable causes:</strong> Continue until you reach a cause the
                organisation can control and correct
              </li>
              <li>
                <strong>Avoid blame:</strong> Focus on systemic causes, not individual fault
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Worked examples in electrical maintenance</ContentEyebrow>

          <ConceptBlock title="Worked Examples in Electrical Maintenance">
            <p>
              The best way to understand the 5 Whys is through practical examples. The following
              worked examples demonstrate how the technique applies to common electrical maintenance
              scenarios, illustrating how each &quot;why&quot; peels back a layer of causation to
              reveal deeper systemic issues.
            </p>
          </ConceptBlock>

          <Scenario
            title="Example 1: Distribution Board Fire"
            situation={
              <>
                <p>
                  Problem: A distribution board in a commercial premises caught fire, causing
                  extensive damage.
                </p>
                <p>
                  <strong>Why 1:</strong> Why did the distribution board catch fire?{' '}
                  <em>Because a cable termination overheated to the point of ignition.</em>
                </p>
                <p>
                  <strong>Why 2:</strong> Why did the termination overheat?{' '}
                  <em>
                    Because the connection had become loose, creating high resistance and localised
                    heating.
                  </em>
                </p>
                <p>
                  <strong>Why 3:</strong> Why was the connection loose?{' '}
                  <em>
                    Because the terminal screws were not tightened to the correct torque when the
                    circuit was installed.
                  </em>
                </p>
                <p>
                  <strong>Why 4:</strong> Why were the screws not correctly torqued?{' '}
                  <em>
                    Because the installer did not use a torque screwdriver and relied on feel.
                  </em>
                </p>
                <p>
                  <strong>Why 5:</strong> Why did the installer not use a torque screwdriver?{' '}
                  <em>
                    Because the company&apos;s installation procedure did not require
                    torque-controlled tightening, and no torque tools were provided.
                  </em>
                </p>
              </>
            }
            whatToDo={
              <>
                <p>
                  <strong>Root cause:</strong> Organisational — the installation procedure did not
                  specify torque-controlled tightening and the company did not provide appropriate
                  tools.
                </p>
                <p>
                  <strong>Corrective actions:</strong> Update installation procedures to require
                  torque-controlled tightening to manufacturer specifications; procure calibrated
                  torque screwdrivers for all installation teams; implement spot-check inspections
                  on completed work.
                </p>
              </>
            }
          />

          <Scenario
            title="Example 2: Repeated Motor Failure"
            situation={
              <>
                <p>
                  Problem: A pump motor on a water treatment plant fails every 6-8 months despite
                  replacement.
                </p>
                <p>
                  <strong>Why 1:</strong> Why does the motor keep failing?{' '}
                  <em>Because the winding insulation breaks down.</em>
                </p>
                <p>
                  <strong>Why 2:</strong> Why does the insulation break down?{' '}
                  <em>
                    Because the motor runs at temperatures significantly above its rated thermal
                    class.
                  </em>
                </p>
                <p>
                  <strong>Why 3:</strong> Why does the motor overheat?{' '}
                  <em>
                    Because the cooling fan shroud is partially blocked with debris, and the motor
                    is running at higher than design current.
                  </em>
                </p>
                <p>
                  <strong>Why 4:</strong> Why is the current higher than design?{' '}
                  <em>
                    Because the pump throughput was increased by 30% last year to meet higher
                    demand, but the motor was not upsized.
                  </em>
                </p>
                <p>
                  <strong>Why 5:</strong> Why was the motor not upsized when throughput was
                  increased?{' '}
                  <em>
                    Because the process change was implemented by the operations team without a
                    management of change review that would have flagged the impact on the motor.
                  </em>
                </p>
              </>
            }
            whatToDo={
              <>
                <p>
                  <strong>Root cause:</strong> Organisational — no management of change (MOC)
                  process to assess the engineering impact of operational changes on equipment
                  ratings.
                </p>
                <p>
                  <strong>Corrective actions:</strong> Install correctly rated motor; implement a
                  management of change procedure requiring engineering review of all process
                  changes; clean and maintain fan shroud as part of PPM schedule.
                </p>
              </>
            }
          />

          <Scenario
            title="Example 3: UPS Failure During Power Cut"
            situation={
              <>
                <p>
                  Problem: A UPS system failed to support the critical load during a mains power
                  failure in a data centre.
                </p>
                <p>
                  <strong>Why 1:</strong> Why did the UPS fail to support the load?{' '}
                  <em>Because the battery bank could not deliver sufficient capacity.</em>
                </p>
                <p>
                  <strong>Why 2:</strong> Why was the battery capacity insufficient?{' '}
                  <em>
                    Because several battery cells had failed and were not delivering their rated
                    capacity.
                  </em>
                </p>
                <p>
                  <strong>Why 3:</strong> Why had the cells failed?{' '}
                  <em>
                    Because the batteries had reached end of life — they were 8 years old in a
                    system designed for 5-year battery life.
                  </em>
                </p>
                <p>
                  <strong>Why 4:</strong> Why were the batteries not replaced at their design life?{' '}
                  <em>
                    Because the battery replacement was deferred twice due to budget constraints.
                  </em>
                </p>
                <p>
                  <strong>Why 5:</strong> Why were budget constraints allowed to override a critical
                  maintenance requirement?{' '}
                  <em>
                    Because the maintenance team had no formal process for escalating
                    safety-critical deferrals to senior management for risk acceptance.
                  </em>
                </p>
              </>
            }
            whatToDo={
              <p>
                <strong>Root cause:</strong> Organisational — no formal escalation process for
                safety-critical maintenance deferrals, allowing budget decisions to override
                engineering necessity without informed risk acceptance by senior management.
              </p>
            }
          />

          <ConceptBlock title="What these examples show">
            <p>
              <strong>Key point:</strong> Notice how all three examples moved from a technical
              symptom to an organisational root cause. This is typical of well-conducted 5 Whys
              analyses — the deepest causes are almost always found in management systems,
              procedures, or organisational culture.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Branching and the cause tree</ContentEyebrow>

          <ConceptBlock title="Branching and the Cause Tree">
            <p>
              In practice, many failures have more than one causal pathway. When you ask
              &quot;why?&quot; and receive two or more equally valid answers, each answer represents
              a branch that should be followed independently. This transforms the simple linear
              chain of the basic 5 Whys into a cause tree — a more comprehensive representation of
              the failure&apos;s multiple root causes.
            </p>
            <p>
              Branching is not a complication to be avoided; it is a natural and valuable feature of
              the technique. Complex failures in electrical systems almost always have multiple
              contributing causes, and failing to follow all branches means missing root causes that
              could lead to future failures. The cause tree provides a complete picture, enabling a
              comprehensive set of corrective and preventive actions.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Branching example: cable joint failure">
            <p>
              Problem: An underground cable joint failed, causing loss of supply to a critical
              process.
            </p>
            <p>
              <strong>Why 1:</strong> Why did the cable joint fail?{' '}
              <em>Because water ingress caused insulation breakdown.</em> This branches into two
              paths:
            </p>
            <p>
              <strong>Branch A — Why was there water ingress?</strong>
              <br />
              <strong>Why 2A:</strong> The heat-shrink sleeve did not seal properly.
              <br />
              <strong>Why 3A:</strong> The jointer did not apply sufficient heat to achieve a full
              seal.
              <br />
              <strong>Why 4A:</strong> The jointer had not received refresher training on the
              updated joint kit that required higher temperatures.
              <br />
              <em>
                Root cause A: Training gap — no refresher training provided when joint kit
                specifications changed.
              </em>
            </p>
            <p>
              <strong>Branch B — Why was the insulation vulnerable to water?</strong>
              <br />
              <strong>Why 2B:</strong> The cable joint pit did not have adequate drainage.
              <br />
              <strong>Why 3B:</strong> The original drainage was blocked by silt and debris.
              <br />
              <strong>Why 4B:</strong> Cable joint pit inspection and drainage clearance was not
              included in the PPM schedule.
              <br />
              <em>
                Root cause B: Maintenance programme gap — cable joint pit maintenance not scheduled.
              </em>
            </p>
            <p>
              Both root causes need to be addressed: updating training for the new joint kit
              specification and adding cable joint pit inspection to the PPM schedule. Correcting
              only one branch would leave the other vulnerability in place.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Managing branching in practice">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Document each branch:</strong> Use a tree diagram or indented list format to
                keep track of multiple branches
              </li>
              <li>
                <strong>Prioritise branches:</strong> If time is limited, focus first on branches
                that relate to safety or that are most likely to lead to recurrence
              </li>
              <li>
                <strong>Merge where branches converge:</strong> Different branches sometimes lead to
                the same root cause — this is strong evidence that the identified root cause is
                significant
              </li>
              <li>
                <strong>Do not force branches to converge:</strong> Different root causes are
                perfectly normal — not every failure has a single root cause
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>The &apos;therefore&apos; test and verification</ContentEyebrow>

          <ConceptBlock title="The 'Therefore' Test and Verification">
            <p>
              Once you have completed a 5 Whys chain, it is essential to verify that the causal
              logic is sound. The &apos;therefore&apos; test is a simple but effective verification
              method that reads the causal chain in reverse, using the word &quot;therefore&quot; to
              connect each step. If every &quot;therefore&quot; statement makes logical sense, the
              chain is valid. If any link breaks down logically, the analysis needs revision at that
              point.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Applying the 'therefore' test">
            <p>Using Example 1 (Distribution Board Fire) from the previous section:</p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                &quot;The installation procedure did not require torque-controlled tightening,{' '}
                <strong>therefore</strong> the installer did not use a torque screwdriver.&quot;
              </li>
              <li>
                &quot;The installer did not use a torque screwdriver, <strong>therefore</strong> the
                terminal screws were not correctly torqued.&quot;
              </li>
              <li>
                &quot;The terminal screws were not correctly torqued, <strong>therefore</strong> the
                connection became loose over time.&quot;
              </li>
              <li>
                &quot;The connection became loose, <strong>therefore</strong> it overheated due to
                high resistance.&quot;
              </li>
              <li>
                &quot;The connection overheated, <strong>therefore</strong> the distribution board
                caught fire.&quot;
              </li>
            </ul>
            <p>
              Each &quot;therefore&quot; statement is logically sound, confirming the causal chain
              is valid. If any statement did not follow logically — for example, if the installer
              had used a torque screwdriver but used the wrong setting — the chain would need to be
              revised at that point to reflect the actual evidence.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Common verification errors">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Logical leaps:</strong> Skipping intermediate steps in the causal chain,
                making the &quot;therefore&quot; link unconvincing
              </li>
              <li>
                <strong>Assumed causation:</strong> Stating that A caused B without evidence —
                correlation is not causation
              </li>
              <li>
                <strong>Circular reasoning:</strong> The chain loops back on itself, with a later
                &quot;why&quot; answer being the same as an earlier one
              </li>
              <li>
                <strong>Opinion masquerading as fact:</strong> &quot;Why&quot; answers based on
                assumption rather than evidence
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Documenting the 5 Whys analysis"
            onSite="ST1426 link: The ability to document and communicate the findings of a root cause investigation is assessed under the maintenance technician standard. Your documentation should be clear enough that someone unfamiliar with the failure could understand the complete causal chain and the rationale for the corrective actions."
          >
            <p>A well-documented 5 Whys analysis should include the following elements:</p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Problem statement:</strong> Clear, specific description of the failure,
                including date, time, location and equipment identification
              </li>
              <li>
                <strong>Investigation team:</strong> Names and roles of all participants
              </li>
              <li>
                <strong>Evidence gathered:</strong> List of data sources — test results, maintenance
                records, photographs, witness statements
              </li>
              <li>
                <strong>The causal chain:</strong> Each &quot;why&quot; question and answer, clearly
                numbered and with supporting evidence referenced
              </li>
              <li>
                <strong>Root cause statement:</strong> A clear, concise statement of the root
                cause(s) identified
              </li>
              <li>
                <strong>Corrective actions:</strong> Specific actions to address the root cause,
                with owners and target dates
              </li>
              <li>
                <strong>Preventive actions:</strong> Actions to prevent similar failures elsewhere,
                including lessons learned
              </li>
              <li>
                <strong>Verification:</strong> How and when the effectiveness of the corrective
                actions will be verified
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>Limitations and when to use other techniques</ContentEyebrow>

          <ConceptBlock title="Limitations and When to Use Other Techniques">
            <p>
              The 5 Whys is a powerful and accessible tool, but it has limitations that maintenance
              technicians should understand. Recognising these limitations is not a criticism of the
              technique — it is a sign of maturity in root cause analysis, enabling you to select
              the right tool for each investigation and to supplement the 5 Whys where necessary.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Key limitations">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Subjectivity:</strong> The quality of the analysis depends entirely on the
                knowledge and experience of the participants. If no one in the team understands a
                particular failure mechanism, the 5 Whys will not lead to it
              </li>
              <li>
                <strong>Single-track thinking:</strong> Without deliberate effort to identify
                branches, the basic 5 Whys can funnel the investigation into a single linear chain,
                missing other causal pathways
              </li>
              <li>
                <strong>Difficulty with complex interactions:</strong> For failures involving
                complex interactions between multiple systems or subsystems, the simple
                &quot;why&quot; chain may not capture the full picture. Fishbone diagrams (covered
                in Section 4.6.3) are better suited to these situations
              </li>
              <li>
                <strong>No inherent structure for evidence:</strong> The technique does not
                naturally prompt the investigator to gather specific types of evidence — this
                discipline must be added consciously
              </li>
              <li>
                <strong>Blame tendency:</strong> Without careful facilitation, the &quot;why&quot;
                chain can drift towards personal blame rather than systemic causes — particularly
                under organisational pressure to find someone at fault
              </li>
            </ul>
          </ConceptBlock>

          <AppendixTable
            caption="When to Use Other Techniques"
            headers={['Situation', 'Better Technique', 'Why']}
            rows={[
              [
                'Multiple interacting causes',
                'Fishbone (Ishikawa) diagram',
                'Structured categories help identify causes across all domains',
              ],
              [
                'Complex system with many components',
                'Fault tree analysis (FTA)',
                'Top-down logical analysis of failure combinations',
              ],
              [
                'Recurring failures with data history',
                'Pareto analysis + 5 Whys',
                'Data identifies the most frequent causes; 5 Whys investigates each',
              ],
              [
                'Human error in complex tasks',
                'Human factors analysis (HEART/SHERPA)',
                'Specialist techniques designed for human error analysis',
              ],
              [
                'Major incident with regulatory scrutiny',
                'Formal RCFA (Root Cause Failure Analysis)',
                'Comprehensive methodology with evidence standards suitable for regulatory reporting',
              ],
            ]}
          />

          <ConceptBlock title="Best practice tips">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Involve people with direct knowledge of the equipment</li>
              <li>Base every answer on evidence, not assumption</li>
              <li>Follow all branches — do not discard valid answers</li>
              <li>Always verify with the &quot;therefore&quot; test</li>
              <li>Keep asking until you reach a systemic, actionable cause</li>
              <li>Document everything for future reference</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Combining techniques">
            <p>
              The most effective approach is often to combine the 5 Whys with other techniques. Use
              a fishbone diagram to brainstorm all potential causes across different categories,
              then apply the 5 Whys to each of the most likely causes to drill down to root causes.
              This combination provides both breadth (fishbone) and depth (5 Whys) in the
              investigation.
            </p>
            <p className="italic">
              <strong className="not-italic">Note:</strong> The 5 Whys is at its best for
              straightforward, well-defined failures where the causal chain is relatively clear. For
              complex, multi-factor incidents — particularly those involving safety — consider using
              it as a starting point and then validating and expanding the findings with more
              structured techniques.
            </p>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            points={[
              '5 Whys process: define the problem statement clearly; ask "why?" and answer with evidence; take the answer and ask "why?" again; follow all branches where multiple causes exist; continue until an actionable root cause is reached; verify with the "therefore" test.',
              'Key principles: evidence-based answers, not assumptions; follow all branches — do not force single-track; stop at actionable, controllable causes; focus on systemic causes, not individual blame; document with supporting evidence references.',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Bleed>
            <Quiz title="Test Your Knowledge" questions={quizQuestions} />
          </Bleed>

          <Bleed>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module4-section6-1')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Identifying Underlying Failures
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module4-section6-3')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Fishbone (Ishikawa) Diagrams
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule4Section6_2;
