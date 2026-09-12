/**
 * MOET · Module 6 · Section 3 · Subsection 2 — Fault Reports and Corrective
 * Actions
 *
 * Standard: ST1426 Engineering maintenance technician – single discipline,
 * electrical option.
 *
 * KSBs covered: no verified ST1426 KSB statement list for Module 6 was
 * available at conversion time (Modules 1–4 have verified lists; Module 6
 * does not). Rather than invent statements or borrow another module's list,
 * this header omits specific KSB quotes. Flagged for follow-up once a
 * verified Module 6 KSB list exists.
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

const TITLE = 'Fault Reports and Corrective Actions - MOET Module 6 Section 3.2';
const DESCRIPTION =
  'Comprehensive guide to fault reporting procedures, corrective action documentation, root cause analysis, failure classification and follow-up procedures for electrical maintenance technicians under ST1426.';

const quickCheckQuestions = [
  {
    id: 'fault-report-purpose',
    question: 'What is the primary purpose of a fault report?',
    options: [
      'To allocate the cost of the repair to the correct departmental maintenance budget',
      'To provide a written warranty claim against the equipment manufacturer',
      'To create a clear, factual record of the fault, its cause and the corrective action taken',
      'To satisfy the insurance company that the equipment was inspected this year',
    ],
    correctIndex: 2,
    explanation:
      'A fault report creates a clear, factual record of what happened, why it happened, and what was done to correct it. It supports future fault diagnosis, asset management decisions, and demonstrates compliance with maintenance procedures.',
  },
  {
    id: 'corrective-action-priority',
    question: 'How should corrective actions be prioritised?',
    options: [
      'In the order the fault reports were received, on a first-come first-served basis',
      'Based on the risk to safety, production impact and likelihood of recurrence',
      'By the seniority of the technician who first identified the fault',
      'According to which repair can be completed within the current shift',
    ],
    correctIndex: 1,
    explanation:
      'Corrective actions are prioritised based on risk to safety (always highest priority), impact on production or operations, and likelihood of the fault recurring if not addressed. This risk-based approach ensures resources are directed where they are most needed.',
  },
  {
    id: 'root-cause-analysis',
    question: 'Root cause analysis aims to identify:',
    options: [
      'The fastest temporary repair that will restore the equipment to service',
      'Which individual technician was responsible for the equipment failing',
      'The total cost of all parts and labour consumed by the breakdown',
      'The underlying reason the fault occurred, not just the immediate symptom',
    ],
    correctIndex: 3,
    explanation:
      'Root cause analysis looks beyond the immediate symptom to identify the underlying reason the fault occurred. For example, a blown fuse (symptom) might be caused by a loose connection creating high resistance (root cause). Addressing only the symptom means the fault will recur.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'A fault report should be written:',
    options: [
      'Only for faults that caused the equipment to stop completely',
      'For all faults, including those found during routine inspections, regardless of severity',
      'Only when a replacement part has had to be ordered from stores',
      'Only for faults that a technician could not repair on the first visit',
    ],
    correctAnswer: 1,
    explanation:
      'Fault reports should be raised for all faults discovered, regardless of severity. Minor faults found during routine inspections may indicate developing problems. A complete fault reporting culture ensures no issues are missed and asset history remains comprehensive.',
  },
  {
    id: 2,
    question: 'The 5 Whys technique is used in fault diagnosis to:',
    options: [
      'Calculate how many maintenance hours a recurring fault has cost',
      'Rank five competing faults in order of repair priority',
      "Identify the root cause by repeatedly asking 'why' until the fundamental cause is found",
      'Decide which of five technicians is best suited to attend the fault',
    ],
    correctAnswer: 2,
    explanation:
      "The 5 Whys technique involves repeatedly asking 'why' each cause occurred until the root cause is identified. For example: Why did the motor overheat? Because the bearing failed. Why? Because it was not lubricated. Why? Because the PM schedule was not followed.",
  },
  {
    id: 3,
    question: "A corrective action is classified as 'temporary' when:",
    options: [
      'It is carried out by an agency technician rather than a permanent member of staff',
      'It is completed outside of normal working hours as an emergency callout',
      'It is expected to be reviewed at the next scheduled maintenance visit',
      'It restores operation but does not address the root cause, requiring further planned work',
    ],
    correctAnswer: 3,
    explanation:
      'A temporary corrective action restores equipment to an operational state but does not fully address the root cause. For example, replacing a fuse restores power but does not fix the underlying overcurrent cause. Temporary actions must always be followed by permanent corrective work.',
  },
  {
    id: 4,
    question:
      'Which failure classification describes equipment that is still running but performing below specification?',
    options: [
      'Degraded performance or partial failure',
      'Catastrophic or total failure',
      'Intermittent or transient failure',
      'Hidden or dormant failure',
    ],
    correctAnswer: 0,
    explanation:
      'Degraded performance describes equipment that continues to operate but below its rated specification. For example, a variable speed drive with one phase of output missing, causing motor vibration and reduced torque.',
  },
  {
    id: 5,
    question: 'When documenting a corrective action, you should record:',
    options: [
      'Only the part numbers and quantities of the components replaced',
      'The fault found, diagnostic steps taken, root cause, corrective action performed, parts used, and verification of effectiveness',
      'Only the date the fault was reported and the date it was closed',
      'Only the name of the technician and the total time spent on site',
    ],
    correctAnswer: 1,
    explanation:
      'A complete corrective action record includes the fault description, diagnostic approach, root cause identified, corrective action taken, parts used, and verification that the repair was effective. This comprehensive record supports future maintenance decisions.',
  },
  {
    id: 6,
    question: 'An intermittent fault is particularly challenging because:',
    options: [
      'It always requires a complete replacement of the affected assembly',
      'It can only be diagnosed by the original equipment manufacturer',
      'It may not be present when the technician arrives, making diagnosis difficult',
      'It cannot be recorded on a standard fault report form',
    ],
    correctAnswer: 2,
    explanation:
      'Intermittent faults may not be present when the technician arrives, making them difficult to diagnose. They often require monitoring over time, data logging, or condition-based monitoring to capture the fault when it occurs.',
  },
  {
    id: 7,
    question: "A 'near miss' related to an electrical fault should be:",
    options: [
      "Logged informally in the technician's personal diary only",
      'Ignored if no equipment was actually damaged',
      'Discussed verbally at the next team meeting without a written record',
      "Reported and documented using the organisation's incident reporting system",
    ],
    correctAnswer: 3,
    explanation:
      'Near misses must be formally reported and documented. They indicate that conditions for a serious incident existed and only chance prevented harm. Investigating near misses prevents future incidents. Under RIDDOR, some near misses involving electrical systems are reportable.',
  },
  {
    id: 8,
    question: 'The Ishikawa (fishbone) diagram is used to:',
    options: [
      'Systematically identify all potential causes of a fault across multiple categories',
      'Plot the rising temperature of a component against time during a fault',
      'Show the sequence of trips that occurred during a cascade failure',
      'Map the physical wiring layout of a faulty control panel',
    ],
    correctAnswer: 0,
    explanation:
      'An Ishikawa diagram systematically identifies potential causes of a fault by organising them into categories such as Materials, Methods, Machinery, Manpower, Measurement and Environment. It ensures all possible causes are considered during root cause analysis.',
  },
  {
    id: 9,
    question: 'After completing a corrective action on a motor starter, the final step should be:',
    options: [
      'Returning all unused parts to the stores before leaving site',
      'Verify the repair by testing the equipment under normal operating conditions and recording the results',
      'Informing the operator verbally that the equipment is now working',
      'Updating the spare parts inventory in the stores catalogue',
    ],
    correctAnswer: 1,
    explanation:
      'The final step is verification — testing under normal operating conditions to confirm the repair is effective. Results must be recorded to complete the work order and demonstrate the equipment is safe to return to service.',
  },
  {
    id: 10,
    question: 'Failure Mode and Effects Analysis (FMEA) is used in maintenance to:',
    options: [
      'Record the labour and material costs incurred by each breakdown',
      'Schedule technicians across the available maintenance shifts',
      'Systematically evaluate potential failure modes, their effects and likelihood to prioritise maintenance actions',
      'Test the insulation resistance of motor windings after a repair',
    ],
    correctAnswer: 2,
    explanation:
      'FMEA evaluates each potential failure mode, assessing severity, likelihood and detectability. This produces a risk priority number (RPN) that helps prioritise maintenance resources on the most critical failure modes.',
  },
  {
    id: 11,
    question: 'Under ST1426, when reporting a fault to a supervisor, you should communicate:',
    options: [
      'Only the asset tag number and the time the fault was reported',
      'Only an estimate of how long the repair is likely to take',
      'Only the part number of any component that needs replacing',
      'The fault symptoms, your diagnosis, the urgency level, and your recommended corrective action',
    ],
    correctAnswer: 3,
    explanation:
      'Effective fault reporting to supervisors includes the symptoms observed, your diagnosis, the urgency level based on safety and operational impact, and your recommended corrective action. This demonstrates professional communication and technical competence.',
  },
  {
    id: 12,
    question: 'Fault reports and corrective action records should typically be retained for:',
    options: [
      "The life of the asset, or as specified by the organisation's retention policy (typically 5+ years minimum)",
      'Until the equipment is next serviced, then discarded',
      'A maximum of 12 months, after which they must be deleted',
      'Only as long as the technician who carried out the work remains employed',
    ],
    correctAnswer: 0,
    explanation:
      "Records should be retained for the life of the asset, or per the organisation's retention policy. Most require a minimum of 5 years. These records support trend analysis, compliance evidence, and may be needed for legal proceedings.",
  },
];

const faqs = [
  {
    question: 'Should I raise a fault report for a minor issue like a loose terminal?',
    answer:
      'Yes. Even a minor fault like a loose terminal should be reported and recorded. A loose terminal causes increased resistance, localised heating, and potential arc faults — it is a fire and safety risk. Recording it also provides evidence of proactive maintenance and helps identify if similar faults are occurring across other equipment of the same type or age.',
  },
  {
    question: 'What is the difference between a fault report and an incident report?',
    answer:
      "A fault report documents an equipment malfunction and the corrective action taken. An incident report documents an event that caused or could have caused harm to people, property or the environment. If an electrical fault results in an arc flash, shock, fire or near miss, both reports are required. The incident report follows your organisation's health and safety reporting procedures and may trigger RIDDOR notification.",
  },
  {
    question: 'How do I determine the root cause if I cannot replicate the fault?',
    answer:
      'For intermittent faults, consider installing monitoring equipment (data loggers, thermal monitoring), reviewing operational data, checking for environmental factors (temperature, humidity, vibration), and examining asset history for patterns. Document your investigation even if the root cause is not definitively identified — record the evidence and the most probable cause based on your analysis.',
  },
  {
    question: 'Who is responsible for closing out corrective actions?',
    answer:
      'Typically, the corrective action is closed by the technician who completed the repair, with verification from a supervisor or planner. Safety-critical corrective actions may require additional sign-off from a safety professional. The key principle is that someone independent of the repair verifies effectiveness.',
  },
  {
    question: 'What if I disagree with the corrective action specified on a work order?',
    answer:
      "If you believe the specified action is insufficient, inappropriate or unsafe, raise this with your supervisor immediately. Document your concerns in the work order comments. A competent technician's on-site assessment may reveal conditions not apparent when the work order was planned. Never carry out work you believe to be unsafe.",
  },
];

const MOETModule6Section3_2 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 6 · Section 6.3 · Subsection 2"
        title="Fault Reports and Corrective Actions"
        backTo="/study-centre/apprentice/m-o-e-t-module6-section3"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Systematic fault reporting, root cause analysis and corrective action documentation.
          </p>

          <TLDR
            points={[
              'Fault reports: factual record of fault, cause and corrective action.',
              'Root cause: underlying reason, not just the immediate symptom.',
              'Corrective actions: temporary (restore) vs permanent (root cause fix).',
              'Follow-up: verification, monitoring and close-out procedures.',
              '5 Whys / fishbone: structured root cause analysis techniques.',
              'FMEA: risk-based failure mode prioritisation.',
              'Verification: test under load after every repair.',
              'ST1426: maps to fault diagnosis and reporting KSBs.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Write clear, structured fault reports with all required information',
              'Apply root cause analysis techniques including 5 Whys and fishbone diagrams',
              'Classify failure modes and prioritise corrective actions by risk',
              'Document corrective actions from diagnosis through verification',
              'Understand the difference between temporary and permanent corrective actions',
              'Meet ST1426 requirements for fault reporting and professional communication',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The anatomy of a fault report</ContentEyebrow>

          <ConceptBlock title="The anatomy of a fault report">
            <p>
              A fault report is a structured document that records an equipment failure or
              malfunction, the diagnostic process followed, the root cause identified, and the
              corrective action taken. It serves multiple purposes: informing maintenance planning,
              supporting asset management decisions, providing compliance evidence, and building
              institutional knowledge for future technicians.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Essential elements of a fault report">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Report reference:</strong> unique number linked to the work order or CMMS
                entry.
              </li>
              <li>
                <strong>Date, time and duration:</strong> when the fault was reported, attended and
                resolved.
              </li>
              <li>
                <strong>Asset identification:</strong> equipment tag, asset number, location code.
              </li>
              <li>
                <strong>Fault description:</strong> symptoms observed — alarms, abnormal behaviour,
                measurements.
              </li>
              <li>
                <strong>Diagnostic process:</strong> tests performed, measurements taken, logical
                steps followed.
              </li>
              <li>
                <strong>Root cause:</strong> the underlying reason the fault occurred.
              </li>
              <li>
                <strong>Corrective action:</strong> what was done to resolve the fault (temporary or
                permanent).
              </li>
              <li>
                <strong>Parts and materials:</strong> items used with part numbers and quantities.
              </li>
              <li>
                <strong>Verification:</strong> test results confirming successful repair.
              </li>
              <li>
                <strong>Outstanding actions:</strong> any further work required with priority and
                timescale.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Common fault reporting mistakes">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Describing the repair but not the fault found.</li>
              <li>
                Recording the symptom as the root cause (e.g., &quot;replaced blown fuse&quot;
                without explaining why it blew).
              </li>
              <li>
                Using vague descriptions: &quot;fixed motor&quot; instead of specific actions.
              </li>
              <li>Not recording diagnostic steps — losing valuable troubleshooting information.</li>
              <li>Failing to document outstanding actions that need follow-up.</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Root cause analysis techniques</ContentEyebrow>

          <ConceptBlock title="Root cause analysis techniques">
            <p>
              Root cause analysis (RCA) is the systematic process of identifying the underlying
              reason a fault occurred, rather than just addressing the visible symptom. Effective
              RCA prevents recurring faults, reduces maintenance costs, and improves equipment
              reliability.
            </p>
          </ConceptBlock>

          <ConceptBlock title="The 5 Whys technique">
            <p>
              Starting with the fault symptom, ask &quot;why?&quot; repeatedly until the fundamental
              cause is uncovered.
            </p>
            <div className="space-y-2 rounded-lg bg-white/5 p-4">
              <p>
                <span className="font-mono text-elec-yellow/80">Why 1:</span> The motor tripped on
                overload. <em>Why?</em>
              </p>
              <p>
                <span className="font-mono text-elec-yellow/80">Why 2:</span> The motor was drawing
                excessive current. <em>Why?</em>
              </p>
              <p>
                <span className="font-mono text-elec-yellow/80">Why 3:</span> The driven pump was
                mechanically seized. <em>Why?</em>
              </p>
              <p>
                <span className="font-mono text-elec-yellow/80">Why 4:</span> The pump bearing
                failed due to lack of lubrication. <em>Why?</em>
              </p>
              <p>
                <span className="font-mono text-elec-yellow/80">Why 5:</span> The lubrication
                schedule was not followed — PM task overdue by 3 months.
              </p>
              <p className="border-t border-white/10 pt-2 text-elec-yellow/70">
                <strong>Root cause:</strong> Failure to follow the preventive maintenance schedule.
                The corrective action is not just to replace the bearing — it is to address the PM
                scheduling gap.
              </p>
            </div>
          </ConceptBlock>

          <ConceptBlock title="Ishikawa (fishbone) diagram">
            <p>Organises potential causes into six categories (the 6 Ms):</p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Manpower:</strong> training, competence, fatigue.
              </li>
              <li>
                <strong>Methods:</strong> procedures, work instructions.
              </li>
              <li>
                <strong>Machinery:</strong> equipment condition, age.
              </li>
              <li>
                <strong>Materials:</strong> component quality, compatibility.
              </li>
              <li>
                <strong>Measurement:</strong> test accuracy, calibration.
              </li>
              <li>
                <strong>Environment:</strong> temperature, moisture, contamination.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Failure classification and prioritisation</ContentEyebrow>

          <ConceptBlock title="Failure classification and prioritisation">
            <p>
              Understanding different types of failure helps you categorise faults accurately and
              prioritise corrective actions appropriately. Electrical equipment can fail in several
              distinct modes, each requiring a different response.
            </p>
          </ConceptBlock>

          <AppendixTable
            caption="Failure classification"
            headers={['Failure Mode', 'Description', 'Electrical Example']}
            rows={[
              [
                'Catastrophic',
                'Complete, sudden failure',
                'Transformer winding failure, VSD power stage burnout',
              ],
              [
                'Degraded',
                'Operates but below rated performance',
                'Motor running hot, capacitor bank partially failed',
              ],
              [
                'Intermittent',
                'Appears and disappears unpredictably',
                'Loose connection causing random trips',
              ],
              [
                'Hidden',
                'Not apparent during normal operation',
                'Standby generator failure, UPS battery degradation',
              ],
              [
                'Incipient',
                'Early-stage deterioration detectable by monitoring',
                'Declining insulation resistance, partial discharge',
              ],
            ]}
          />

          <AppendixTable
            caption="Corrective action priority matrix"
            headers={['Priority', 'Criteria', 'Response Time']}
            rows={[
              [
                <span className="font-medium text-red-400">P1 — Emergency</span>,
                'Immediate safety risk or critical production loss',
                'Immediate',
              ],
              [
                <span className="font-medium text-orange-400">P2 — Urgent</span>,
                'Significant operational impact, near-term safety risk',
                'Within 24 hours',
              ],
              [
                <span className="font-medium text-yellow-400">P3 — Planned</span>,
                'Non-critical, can be scheduled normally',
                'Within 1-2 weeks',
              ],
              [
                <span className="font-medium text-blue-400">P4 — Improvement</span>,
                'Enhancement, no immediate risk',
                'Next shutdown',
              ],
            ]}
          />

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Corrective action documentation and follow-up</ContentEyebrow>

          <ConceptBlock title="Corrective action documentation and follow-up">
            <p>
              Every corrective action must answer three questions: what was done, was it effective,
              and is any further work needed? Documenting this with sufficient detail closes the
              loop on fault management and ensures nothing falls through the cracks.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Temporary corrective actions">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Restores equipment to operational state.</li>
              <li>Does not address root cause.</li>
              <li>Must be clearly flagged as temporary.</li>
              <li>Generates a follow-up work order for permanent fix.</li>
              <li>Example: bypassing a faulty sensor with a manual override.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Permanent corrective actions">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Addresses the root cause of the fault.</li>
              <li>Prevents recurrence of the same failure.</li>
              <li>May include design modifications or procedure changes.</li>
              <li>Verified through testing and monitoring.</li>
              <li>Example: replacing undersized cable causing voltage drop.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Verification and close-out">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Functional testing under normal operating conditions.</li>
              <li>Electrical tests as appropriate (IR, continuity, Zs).</li>
              <li>Thermal monitoring during initial run-up period.</li>
              <li>Confirmation from operations that equipment performs as expected.</li>
              <li>Recording all test results in the CMMS and/or logbook.</li>
            </ul>
            <p>
              <strong>ST1426 link:</strong> the standard requires competence in fault diagnosis,
              corrective action implementation and verification. Your fault reports and corrective
              action records are direct evidence for your EPA portfolio.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Quick reference">
            <p className="font-medium text-white">Fault report structure</p>
            <ul className="list-decimal space-y-1 pl-5 marker:text-elec-yellow/70">
              <li>Identification — asset, location, date/time.</li>
              <li>Symptom — what was observed.</li>
              <li>Diagnosis — tests and investigations.</li>
              <li>Root cause — underlying reason.</li>
              <li>Corrective action — what was done.</li>
              <li>Verification — proof of effective repair.</li>
            </ul>
            <p className="font-medium text-white">RCA techniques</p>
            <ul className="list-disc space-y-1 pl-5 marker:text-elec-yellow/70">
              <li>5 Whys — iterative cause-and-effect.</li>
              <li>Fishbone — 6 Ms categorisation.</li>
              <li>FMEA — risk priority scoring.</li>
              <li>Fault tree — top-down logic diagram.</li>
              <li>Pareto — 80/20 frequency analysis.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <Scenario
            title="A fault report that sends the next technician back to the same machine"

            situation={
              <>
                <p>
                  A fault report on a packaging machine reads, in full: "Machine stopped. Reset and
                  running. No further action."
                </p>

                <p>
                  The same machine stops again six days later. The technician who attends has no
                  idea it has happened before, and starts from nothing.
                </p>
              </>
            }

            whatToDo={
              <>
                <p>
                  Record what the machine was doing when it stopped, not just that it stopped. Load,
                  product, stage of cycle, how long it had been running — these are what make a
                  pattern visible across several visits.
                </p>

                <p>
                  Record what you actually checked and found, including the things that were fine.
                  "Field terminals checked, tight" is useful information to the next person; its
                  absence means they will check them again.
                </p>

                <p>
                  Record what you changed, if anything, and what you deliberately did not. A reset
                  with no fault found is a legitimate outcome, but it must be written as "no fault
                  found on inspection", not as a repair.
                </p>

                <p>
                  Say what you would do next if it recurs. That single sentence is what converts
                  three separate callouts into one diagnosis.
                </p>
              </>
            }

            whyItMatters={
              <p>
                A fault report is not an administrative task, it is the only memory the plant has.
                Written badly, every visit starts from zero and an intermittent fault can run for
                months. Written properly, the third occurrence is where someone spots that it always
                happens on the same product changeover. The cost of a poor report is not the five
                minutes saved writing it — it is the repeat visits it guarantees.
              </p>
            }
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Fault reports: factual record of fault, cause and corrective action.',
              'Root cause: underlying reason, not just the immediate symptom.',
              'Corrective actions: temporary (restore) vs permanent (root cause fix).',
              'Follow-up: verification, monitoring and close-out procedures.',
              '5 Whys / fishbone: structured root cause analysis techniques.',
              'FMEA: risk-based failure mode prioritisation.',
              'Verification: test under load after every repair.',
              'ST1426: maps to fault diagnosis and reporting KSBs.',
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
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module6-section3-1')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Recording Work Completed
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module6-section3-3')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Digital vs Paper-Based Reporting
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule6Section3_2;
