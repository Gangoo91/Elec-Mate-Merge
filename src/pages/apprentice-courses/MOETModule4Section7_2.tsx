/**
 * MOET · Module 4 · Section 7.2 · Subsection 2 — Balancing PPM and Corrective Maintenance
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
 *   Knowledge  · "Maintenance strategies: planned preventative maintenance
 *                 (PPM), condition-based maintenance (CBM), scheduled
 *                 maintenance, total productive maintenance (TPM),
 *                 breakdown and run to failure maintenance."
 *   Behaviour  · "Continuous improvement (CI) systems and techniques."
 *
 * Numeric detail (cost ratios, KPI targets, PM interval examples) is copied
 * verbatim from the original page; the bs7671_facets RAG holds regulation
 * rules, not this kind of maintenance-management data, so it could not be
 * checked against it.
 *
 * Converted onto the study-centre learning kit. Content preserved from the
 * original page; structure, shell and reading measure rebuilt. The original
 * page's decorative gradient "strategy spectrum" bar is not reproduced —
 * only its text labels and caption carry teaching content, which are kept.
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

const TITLE = 'Balancing PPM and Corrective Maintenance - MOET Module 4 Section 7.2';
const DESCRIPTION =
  'Understanding the balance between planned preventive maintenance (PPM) and corrective (reactive) maintenance, including cost-benefit analysis, the maintenance ratio, optimising PM frequencies, and developing a balanced maintenance strategy for electrical systems aligned to ST1426.';

const quickCheckQuestions = [
  {
    id: 'ppm-purpose',
    question: 'The primary purpose of planned preventive maintenance (PPM) is to:',
    options: [
      'Repair equipment as quickly as possible once it has already broken down in service',
      'Reduce the maintenance budget by carrying out the minimum number of tasks possible',
      'Replace all equipment on a fixed schedule regardless of how it is actually performing',
      'Reduce the probability of failure with scheduled tasks done before failure occurs',
    ],
    correctIndex: 3,
    explanation:
      'PPM aims to prevent unplanned failures by performing proactive tasks at scheduled intervals. These tasks may include condition monitoring (detecting deterioration before it causes failure), scheduled servicing (lubrication, cleaning, filter changes), scheduled component replacement (replacing wear-out items before they fail), and inspection (visual checks for deterioration, damage or abnormal conditions). The economic justification is that the cost of planned maintenance is less than the cost of the unplanned failures it prevents.',
  },
  {
    id: 'reactive-acceptable',
    question: 'Corrective (reactive) maintenance is an acceptable strategy when:',
    options: [
      'The equipment is the most critical asset on the site and any failure would halt production',
      'The failure consequences are low and preventing it would cost more than the repair',
      'The equipment carries a safety function such as emergency lighting or fire detection',
      'The failure mode follows a clear wear-out pattern that can be predicted from running hours',
    ],
    correctIndex: 1,
    explanation:
      "Corrective maintenance is a deliberate, justified strategy for failure modes where the consequences are acceptable — typically non-critical equipment where the failure does not affect safety, the environment, or production significantly, and where the cost of preventive maintenance would exceed the cost of the occasional repair. This is the 'run-to-failure' strategy in RCM terms. It is a conscious decision, not a failure of the maintenance programme. Examples include non-critical lighting, convenience sockets in low-use areas, and redundant systems where backup is available.",
  },
  {
    id: 'maintenance-ratio',
    question:
      'A typical target for the ratio of planned to unplanned maintenance in a well-managed electrical maintenance organisation is:',
    options: [
      '20% planned (or lower), 80% unplanned (or higher) — measured by work orders or labour hours',
      '50% planned and 50% unplanned, split evenly across all equipment types',
      '80% planned (or higher), 20% unplanned (or lower) — measured by work orders or labour hours',
      '100% planned, with no unplanned breakdown work permitted at any time',
    ],
    correctIndex: 2,
    explanation:
      'World-class maintenance organisations typically target 80% or more planned work (PPM, condition-based, scheduled tasks) and 20% or less unplanned work (emergency breakdowns). This ratio indicates that the preventive programme is effective at catching most failures before they occur, while acknowledging that some unplanned work will always exist (genuinely random failures, run-to-failure items, unforeseen events). An organisation with a high proportion of unplanned work is typically spending more on maintenance overall due to emergency call-outs, expedited parts, overtime and secondary damage.',
  },
  {
    id: 'over-maintenance',
    question:
      'Over-maintenance (performing preventive maintenance too frequently or on equipment that does not need it) is a problem because:',
    options: [
      'It always extends equipment life and so can never really be considered a problem',
      'It wastes resources and can raise failure rates by disturbing healthy equipment',
      'It reduces the number of spare parts that need to be held in the main stores',
      'It guarantees that no equipment will ever fail between scheduled maintenance visits',
    ],
    correctIndex: 1,
    explanation:
      'Over-maintenance is a significant and common problem. Every maintenance intervention carries a risk of introducing a new fault (incorrect reassembly, contamination, overtightening, wrong component, human error). RCM research showed that 68% of failure modes have a higher probability of failure immediately after maintenance (infant mortality). Additionally, excessive PM consumes technician time, spare parts and shutdown time that could be directed to more critical tasks. The goal is the right amount of maintenance, not the maximum amount.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Planned preventive maintenance (PPM) includes which of the following task types?',
    options: [
      'Emergency repairs carried out only after equipment has already failed in service',
      'Scheduled inspection, condition monitoring, servicing, calibration and component replacement',
      'Replacing entire machines on a fixed schedule without inspecting their condition first',
      'Stocking spare parts in the stores and simply waiting for breakdowns to occur',
    ],
    correctAnswer: 1,
    explanation:
      'PPM encompasses a wide range of proactive tasks: visual inspections (checking for damage, deterioration, overheating), condition monitoring (vibration analysis, thermography, insulation resistance testing), routine servicing (lubrication, cleaning, filter replacement), calibration of instruments and protective devices, scheduled component replacement (contactors, belts, bearings at planned intervals), and functional testing (RCD trip tests, emergency lighting tests, standby generator tests). All are planned, scheduled and documented.',
  },
  {
    id: 2,
    question:
      'The key difference between time-based maintenance and condition-based maintenance is:',
    options: [
      'Time-based tasks respond to detected deterioration, while condition-based tasks are carried out at fixed calendar intervals regardless of equipment condition',
      'Time-based maintenance is always cheaper than condition-based maintenance because it requires no monitoring equipment or sensors of any kind',
      'Time-based tasks are performed at fixed calendar or usage intervals regardless of condition, while condition-based tasks are triggered by evidence of deterioration detected through monitoring',
      'Time-based maintenance can be applied to any failure mode, whereas condition-based maintenance only works on electrical equipment and never on mechanical components',
    ],
    correctAnswer: 2,
    explanation:
      'Time-based maintenance (scheduled restoration or discard) is performed at fixed intervals — for example, replace motor bearings every 5 years or replace contactor tips every 100,000 operations, regardless of the current condition of the component. Condition-based maintenance is triggered by evidence of deterioration: the task is only performed when monitoring indicates that the component is approaching the end of its useful life. Condition-based maintenance is generally more efficient because it avoids replacing components that still have useful life remaining, but it is only feasible when deterioration can be detected reliably (the P-F interval is long enough).',
  },
  {
    id: 3,
    question: "The 'bathtub curve' describes a failure pattern where:",
    options: [
      'The failure rate falls steadily throughout life, from high when new to almost zero at the end',
      'The failure rate stays perfectly constant from installation to disposal, with no wear-out phase',
      'Every item of equipment fails at exactly the same age regardless of how it is used',
      'High early (infant mortality) failure, then a low constant rate, then a rising wear-out rate',
    ],
    correctAnswer: 3,
    explanation:
      'The bathtub curve has three phases: (1) infant mortality — a high failure rate when the component is new, caused by manufacturing defects, installation errors, or quality issues; (2) useful life — a low, relatively constant failure rate where failures are essentially random; (3) wear-out — an increasing failure rate as the component reaches the end of its useful life. However, RCM research showed that only about 4% of failure modes follow this classic bathtub pattern. Most failure modes show either random failure or infant mortality followed by a constant rate.',
  },
  {
    id: 4,
    question:
      'If a maintenance team is spending 60% of its time on unplanned (reactive) work and 40% on planned work, this suggests:',
    options: [
      'The PPM programme is not effective enough — too many preventable failures are occurring',
      'The maintenance team is performing exceptionally well, since a healthy world-class operation should aim for around 60% reactive and 40% planned work',
      'The split is ideal and requires no action, because an even balance between planned and reactive work always gives the lowest total maintenance cost',
      'Too much planned maintenance is being carried out, and the team should reduce PM tasks to bring the reactive proportion higher',
    ],
    correctAnswer: 0,
    explanation:
      'A 60/40 reactive-to-planned ratio indicates a maintenance programme that is predominantly firefighting rather than preventing. This typically means: the PPM programme does not cover the most common failure modes, PM intervals are set incorrectly (too long between tasks), condition monitoring is not being used where it would be effective, or known failure modes are not being addressed. The goal is to progressively increase the planned ratio to 80% or above by analysing the causes of unplanned work and adding targeted preventive tasks.',
  },
  {
    id: 5,
    question:
      'An effective way to determine whether a PPM task should be performed more or less frequently is to:',
    options: [
      'Halve every PM interval across the site at the start of each year, since more frequent maintenance always improves reliability whatever the condition data shows',
      'Use the failure and condition history: shorten if failures occur between visits, extend if always found in good condition',
      'Always adopt the manufacturer recommended interval exactly and never change it, regardless of your own failure history or operating context',
      'Set every PM interval to match the longest interval used anywhere on the site so that all tasks fall due on the same day',
    ],
    correctAnswer: 1,
    explanation:
      'PM optimisation is an ongoing process. If a bearing is consistently found in good condition at its 12-monthly inspection, the interval could potentially be extended to 18 or 24 months, freeing resources for other tasks. Conversely, if bearings are failing between inspections, the interval needs to be shortened or the monitoring technique changed. The key data sources are: CMMS failure records (when and why failures occur), condition monitoring trends (rate of deterioration), and PM task feedback (what the technician finds during each PM visit).',
  },
  {
    id: 6,
    question:
      'The total cost of a reactive (unplanned) breakdown typically exceeds the cost of a planned repair for the same failure because:',
    options: [
      'The spare part fitted during an emergency repair is always more expensive to manufacture than the identical part fitted during a planned repair',
      'Reactive repairs must legally be carried out by a more highly qualified engineer than planned repairs, which raises the labour rate',
      'Breakdowns add call-out, overtime, expedited parts, lost production and secondary damage',
      'Reactive maintenance always requires the complete replacement of the machine, whereas planned maintenance only ever replaces a single component',
    ],
    correctAnswer: 2,
    explanation:
      'The true cost of an unplanned breakdown includes many factors beyond the direct repair cost: lost production during unplanned downtime (often the largest cost), emergency call-out and overtime rates, expedited or emergency parts delivery charges, secondary damage (a failed bearing can damage the shaft, housing and motor winding), disruption to other planned maintenance work, potential safety incidents during emergency work, and customer impact. Studies consistently show that the total cost of reactive maintenance is 3-10 times the cost of the equivalent planned repair.',
  },
  {
    id: 7,
    question:
      'A maintenance strategy that combines condition-based monitoring for critical failure modes, time-based replacement for wear-out failure modes, failure-finding for hidden failures, and run-to-failure for low-consequence items is an example of:',
    options: [
      'A purely reactive strategy where every failure mode is simply allowed to run to failure',
      'A purely time-based strategy where every component is replaced on a fixed calendar interval',
      'A strategy that relies entirely on the manufacturer recommendations with no local analysis',
      'A balanced, RCM-informed strategy matching the technique to each failure mode',
    ],
    correctAnswer: 3,
    explanation:
      'This describes the ideal outcome of an RCM-informed maintenance strategy: each failure mode is managed by the technique that is most technically appropriate and economically justified. Critical bearings are condition-monitored (vibration analysis), wear-out items like contactor tips are replaced on a schedule, protective devices are periodically tested (failure-finding), and non-critical items are allowed to run to failure. This balanced approach delivers higher reliability at lower total cost than either a purely preventive or purely reactive approach.',
  },
  {
    id: 8,
    question:
      'Maintenance key performance indicators (KPIs) that help monitor the balance between planned and reactive work include:',
    options: [
      'PM compliance, planned-to-reactive ratio, MTBF, MTTR and cost as a percentage of RAV',
      'The total number of maintenance staff employed, the size of the spare-parts store, and the floor area of the maintenance workshop',
      'The age of the oldest piece of equipment on site and the year the maintenance department was first established',
      'The number of manufacturer service bulletins received each year and the brand of CMMS software in use',
    ],
    correctAnswer: 0,
    explanation:
      'Effective maintenance management requires monitoring multiple KPIs: PM compliance (are scheduled tasks being completed on time — target >90%), planned-to-reactive ratio (target >80% planned), MTBF (is it increasing over time, indicating improving reliability?), MTTR (is it decreasing, indicating better planning and parts availability?), and maintenance cost as a percentage of replacement asset value (RAV) — typically 2-5% for electrical systems. These KPIs together provide a comprehensive picture of maintenance effectiveness.',
  },
  {
    id: 9,
    question:
      'When introducing condition-based maintenance to replace time-based PM on a motor, the first step should be:',
    options: [
      'Apply a generic RCM strategy to the motor without taking any readings first',
      'Take a baseline reading in known good condition, then monitor for changes from it',
      'Immediately stop all time-based tasks and rely on the motor running to failure',
      'Replace the motor straight away so that monitoring begins on a brand new unit',
    ],
    correctAnswer: 1,
    explanation:
      'Baseline readings are essential for condition-based maintenance. A vibration signature, insulation resistance value, or thermal profile only becomes meaningful when compared to a known good baseline and tracked over time. The baseline should be taken when the equipment is in known good condition (ideally after maintenance or commissioning). Subsequent readings are compared to the baseline and to previous readings to identify trends. The transition from time-based to condition-based should be gradual — continue time-based tasks until sufficient condition monitoring data confirms the new approach is effective.',
  },
  {
    id: 10,
    question: 'A common mistake when developing a PPM programme is:',
    options: [
      "Basing the programme on the equipment's documented failure modes and criticality rather than on tradition or guesswork",
      'Reviewing and adjusting PM intervals each year using condition data and feedback from the technicians who carry out the tasks',
      "Applying the same strategy and frequency to every asset — a 'one size fits all' approach",
      'Concentrating the most intensive preventive tasks on the most critical production equipment first',
    ],
    correctAnswer: 2,
    explanation:
      "The 'one size fits all' approach is a common and costly mistake: applying the same PM schedule to every motor, every panel, every drive, regardless of how critical it is, how it fails, or how it is used. A 150 kW motor on a critical production line has very different maintenance requirements from a 0.75 kW motor on a non-critical ventilation fan. RCM addresses this by analysing each asset in its operating context and selecting the most appropriate strategy for each failure mode. The result is more maintenance on critical equipment and less on non-critical equipment.",
  },
  {
    id: 11,
    question: "The concept of 'maintenance-induced failures' refers to:",
    options: [
      'Failures that occur only because a planned maintenance task was skipped or carried out late rather than on schedule',
      'Failures that the maintenance department predicts in advance using condition monitoring before they actually happen',
      'Failures caused entirely by the operator misusing the equipment, with no involvement from the maintenance team',
      'Failures introduced by the maintenance work itself — bad reassembly, contamination or wrong parts',
    ],
    correctAnswer: 3,
    explanation:
      "Maintenance-induced failures are a significant concern and a key reason why 'more maintenance' is not always better. Every time a technician opens a panel, disassembles a motor, or replaces a component, there is a risk of introducing a new fault. Common examples include: cross-threaded bolts, incorrect torque, contamination during bearing replacement, cable connections not properly tightened, wrong fuse rating fitted, and O-rings damaged during reassembly. This is the 'infant mortality' effect that RCM research identified — it is why unnecessary PM interventions should be avoided.",
  },
  {
    id: 12,
    question: 'In the context of ST1426, a maintenance technician should be able to:',
    options: [
      'Explain the strategies, perform planned and reactive tasks, and feed back PM findings',
      'Follow the written PM instructions exactly without needing to understand why each task is carried out or what failure mode it manages',
      'Set the strategic maintenance budget for the whole site and approve all capital expenditure on new plant',
      'Carry out only reactive breakdown repairs and leave all planned preventive maintenance to a separate specialist contractor',
    ],
    correctAnswer: 0,
    explanation:
      'ST1426 expects maintenance technicians to understand maintenance principles, not just follow instructions. This includes: understanding why a particular strategy (PPM, condition-based, run-to-failure) has been chosen for each asset; carrying out PM tasks to the required standard and documenting findings accurately; providing feedback when PM tasks reveal unexpected conditions or when the PM frequency appears too long or too short; and contributing to the continuous improvement of the maintenance programme through root cause analysis, FMEA participation, and maintenance review meetings.',
  },
];

const faqs = [
  {
    question: 'What is the right balance between planned and reactive maintenance?',
    answer:
      "There is no single 'right' answer — it depends on the criticality of the assets, the consequences of failure, the age and condition of the equipment, and the resources available. However, world-class maintenance organisations typically achieve 80-90% planned work and 10-20% reactive work. The key is not to eliminate all reactive work (some run-to-failure is deliberate and justified) but to minimise unplanned, emergency breakdowns on critical equipment. Start by analysing your current breakdown data, identify the most common and costly failure modes, and develop targeted preventive tasks for those specific failure modes.",
  },
  {
    question: 'How do I know if a PM task is adding value or just costing money?',
    answer:
      "A PM task adds value if it detects deterioration that would otherwise lead to an unplanned failure, or if it restores or replaces a component that is approaching wear-out. It is not adding value if the component is consistently found in good condition with no sign of deterioration — in this case the interval may be too short. Review the PM task feedback: what does the technician find each time? If the answer is consistently 'no issues found', consider extending the interval. If components are occasionally found deteriorated, the interval is about right. If failures are occurring between PM visits, the interval is too long or the wrong technique is being used.",
  },
  {
    question: "Should I follow the manufacturer's recommended maintenance intervals exactly?",
    answer:
      "Manufacturer's recommendations are a good starting point but should not be followed blindly. The manufacturer does not know your specific operating context: how heavily the equipment is loaded, the ambient conditions, the quality of the power supply, or how critical the equipment is to your operation. Use the manufacturer's intervals as a baseline, then adjust based on your own failure history, condition monitoring data, and operating experience. An equipment item running lightly loaded in a clean, cool environment may need less maintenance than the manufacturer suggests, while one running heavily loaded in a harsh environment may need more.",
  },
  {
    question: 'How do I justify the cost of condition monitoring equipment to my manager?',
    answer:
      "Build a business case based on the cost of the failures you aim to prevent. Calculate the total cost of recent unplanned breakdowns on the target equipment (including lost production, overtime, parts, secondary damage). Compare this to the cost of the monitoring equipment and the technician time to perform the monitoring. For critical equipment, condition monitoring typically pays for itself within 1-2 years through avoided breakdowns. Present specific examples: 'The motor bearing failure on Line 3 in October cost the business an estimated amount in lost production and emergency repair. Monthly vibration monitoring, costing a fraction of that annually, would have detected the deterioration 3 months before failure.'",
  },
  {
    question: 'What should I do when I find something unexpected during a PM visit?',
    answer:
      'Document it immediately and report it to your supervisor. If it presents an immediate safety risk, make the area safe and isolate the equipment. If it is deterioration that is not yet critical, raise a follow-up work order with appropriate priority. Take photographs if possible. Update the CMMS record with your findings. This feedback is invaluable for the continuous improvement of the maintenance programme — it may indicate that the PM interval needs adjusting, that additional tasks are needed, or that a design modification would prevent the issue. Never ignore unexpected findings, even if they seem minor.',
  },
];

const MOETModule4Section7_2 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 4 · Section 4.7 · Subsection 2"
        title="Balancing PPM and Corrective Maintenance"
        backTo="/study-centre/apprentice/m-o-e-t-module4-section7"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Finding the right mix of planned and reactive maintenance for maximum reliability at
            minimum cost.
          </p>

          <TLDR
            points={[
              'PPM reduces failures: Planned tasks catch deterioration before it becomes a breakdown',
              'Not all reactive is bad: Deliberate run-to-failure is valid for low-consequence items',
              'Target ratio: World-class aims for 80%+ planned, 20% or less reactive',
              'Over-maintenance: Too much PM wastes resources and can introduce failures',
            ]}
          />

          <ConceptBlock title="Maintenance technician context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>PM feedback:</strong> Report what you find during PM visits — it drives
                improvement
              </li>
              <li>
                <strong>Cost awareness:</strong> Understand the true cost difference between planned
                and reactive work
              </li>
              <li>
                <strong>Optimisation:</strong> Help refine PM intervals based on equipment condition
                data
              </li>
              <li>
                <strong>ST1426:</strong> Demonstrates understanding of maintenance strategy and
                continuous improvement
              </li>
            </ul>
          </ConceptBlock>

          <LearningOutcomes
            outcomes={[
              'Explain the difference between planned preventive and corrective maintenance strategies',
              'Describe the cost-benefit case for preventive maintenance on critical equipment',
              'Identify when corrective (run-to-failure) maintenance is an appropriate strategy',
              'Interpret maintenance KPIs including the planned-to-reactive ratio',
              'Explain how PM optimisation improves both reliability and cost-effectiveness',
              'Contribute to continuous improvement of the maintenance programme through task feedback',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The maintenance strategy spectrum</ContentEyebrow>

          <ConceptBlock
            title="The Maintenance Strategy Spectrum"
            onSite='Key point: The question is not "should we do preventive or reactive maintenance?" but rather "which failure modes should be managed preventively and which can be managed reactively?" The answer is different for every asset, every failure mode, and every operating context.'
          >
            <p>
              Maintenance strategies exist on a spectrum from purely reactive (fix it when it
              breaks) to purely proactive (prevent every possible failure). Neither extreme is
              optimal. A purely reactive approach results in excessive downtime, emergency costs,
              safety risks and secondary damage. A purely preventive approach wastes resources on
              unnecessary tasks, introduces maintenance-induced failures, and still cannot prevent
              truly random failure modes. The goal is to find the right balance — applying the most
              appropriate strategy to each failure mode based on its characteristics and
              consequences.
            </p>
            <p>
              The spectrum runs from &quot;Reactive Only&quot; to &quot;Proactive Only&quot;, with
              both extremes carrying high cost and the optimum balance sitting between them. Total
              maintenance cost is minimised at the optimum balance point — enough preventive
              maintenance to avoid costly breakdowns, but not so much that it wastes resources or
              introduces new failures.
            </p>
          </ConceptBlock>

          <AppendixTable
            caption="Maintenance Strategy Comparison"
            headers={[
              'Factor',
              'Reactive (Corrective)',
              'Planned Preventive (PPM)',
              'Condition-Based (CBM)',
            ]}
            rows={[
              [
                'Trigger',
                'Equipment fails',
                'Calendar or usage interval',
                'Detected deterioration',
              ],
              ['Planning', 'Unplanned, emergency', 'Scheduled in advance', 'Planned once detected'],
              [
                'Cost per event',
                'High (emergency rates, overtime, lost production)',
                'Moderate (planned, scheduled)',
                'Moderate (planned repair + monitoring cost)',
              ],
              [
                'Component life usage',
                '100% (runs to failure)',
                'Partial (replaced before end of life)',
                'Near 100% (replaced when needed)',
              ],
              [
                'Best for',
                'Low-consequence, non-critical items',
                'Wear-out failure modes',
                'Random failures with detectable P-F interval',
              ],
            ]}
          />

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>The true cost of reactive maintenance</ContentEyebrow>

          <ConceptBlock
            title="The True Cost of Reactive Maintenance"
            onSite="Key point: When justifying preventive maintenance investment, always compare the full cost of the breakdowns it prevents (including production losses and secondary damage), not just the direct repair cost. The business case for preventive maintenance on critical equipment is almost always compelling when the full cost of failure is considered."
          >
            <p>
              The direct repair cost of fixing a breakdown is only a fraction of the true total
              cost. Understanding the full cost of reactive maintenance is essential for building
              the business case for preventive investment. Studies consistently show that the total
              cost of an unplanned breakdown is 3-10 times the cost of the equivalent planned
              repair. On critical production equipment, the ratio can be even higher.
            </p>
          </ConceptBlock>

          <ConceptBlock title="The iceberg model of breakdown costs">
            <p>
              The visible cost (direct repair) is only the tip of the iceberg. Below the surface:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Direct costs (visible):</strong> Labour, spare parts, contractor charges
              </li>
              <li>
                <strong>Emergency premiums:</strong> Overtime rates, emergency call-out fees,
                expedited parts delivery
              </li>
              <li>
                <strong>Production losses:</strong> Lost output, missed orders, customer penalties,
                reduced quality
              </li>
              <li>
                <strong>Secondary damage:</strong> Failed bearing damages shaft, winding burn-out
                from overheating, water damage from pump failure
              </li>
              <li>
                <strong>Indirect costs:</strong> Disrupted planned work, investigation time,
                management attention, safety incidents
              </li>
            </ul>
          </ConceptBlock>

          <Scenario
            title="Worked example: VSD failure on a critical pump"
            situation={
              <>
                <p>
                  A variable speed drive fails on a critical cooling water pump at 02:00 on a
                  Saturday:
                </p>
                <ul className="list-disc space-y-1.5 pl-5 marker:text-cyan-400/70">
                  <li>
                    <strong>Direct repair:</strong> Replacement VSD module + 4 hours labour =
                    moderate cost
                  </li>
                  <li>
                    <strong>Emergency call-out:</strong> Weekend overtime rate (double time +
                    call-out premium)
                  </li>
                  <li>
                    <strong>Expedited parts:</strong> Next-day delivery surcharge for the VSD module
                  </li>
                  <li>
                    <strong>Production loss:</strong> 6 hours downtime on the production line at
                    significant hourly cost
                  </li>
                  <li>
                    <strong>Secondary damage:</strong> Overheated process due to loss of cooling —
                    damaged product batch
                  </li>
                  <li>
                    <strong>Investigation:</strong> Root cause analysis, reporting, management
                    review
                  </li>
                </ul>
              </>
            }
            whatToDo={
              <p>
                The total cost is typically many times the direct repair cost. A quarterly
                thermographic survey of the VSD would have detected the overheating connection that
                caused the failure, at a fraction of the total breakdown cost.
              </p>
            }
          />

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Optimising PM intervals and tasks</ContentEyebrow>

          <ConceptBlock
            title="Optimising PM Intervals and Tasks"
            onSite='Key point: The technician performing the PM task is the most important source of optimisation data. Accurate, detailed feedback on what was found during each PM visit enables the maintenance planner to adjust intervals and techniques. "No issues found" is valuable feedback — it means the interval may be extendable. "Bearing showing early signs of wear" is equally valuable — it confirms the task is catching deterioration at the right time.'
          >
            <p>
              An effective preventive maintenance programme is not static — it evolves continuously
              based on equipment condition data, failure history and operational experience. PM
              optimisation is the process of refining task frequencies, task content and task
              techniques to achieve the best balance between reliability and cost. This is a core
              aspect of continuous improvement in maintenance management.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Extending PM intervals">
            <p>
              If a PM task consistently finds the component in good condition with no sign of
              deterioration, the interval may be too short. Gradually extend the interval (for
              example, from 6-monthly to 9-monthly) and monitor the results. If the component
              continues to be found in good condition, extend further. This process is sometimes
              called &quot;age exploration&quot; — finding the optimal point where the PM frequency
              matches the actual deterioration rate.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Shortening PM intervals">
            <p>
              If failures are occurring between PM visits, the interval is too long. Analyse the
              failure data to determine the actual deterioration rate, and set the PM interval
              accordingly. Alternatively, consider switching to a more sensitive monitoring
              technique — for example, moving from visual inspection (which may only detect
              late-stage deterioration) to vibration monitoring (which can detect early-stage
              bearing deterioration).
            </p>
          </ConceptBlock>

          <ConceptBlock title="Changing PM techniques">
            <p>
              Sometimes the PM task itself is not the most effective approach. For example, a
              time-based motor bearing replacement every 3 years could be replaced with vibration
              monitoring — this detects actual deterioration rather than assuming it, maximises
              bearing life, and avoids the risk of maintenance-induced failure from unnecessary
              disassembly. The key question is: &quot;Is there a better way to manage this failure
              mode?&quot;
            </p>
          </ConceptBlock>

          <ConceptBlock title="Eliminating non-value tasks">
            <p>
              Some PM tasks in legacy programmes may have no clear purpose — they were added
              historically and never reviewed. Every task should be challenged: &quot;What failure
              mode does this task manage? What would happen if we stopped doing it?&quot; If the
              task does not manage a specific failure mode with unacceptable consequences, it should
              be eliminated or replaced with something more effective.
            </p>
          </ConceptBlock>

          <AppendixTable
            caption="PM Optimisation Data Sources"
            headers={['Data Source', 'What It Tells You']}
            rows={[
              [
                'CMMS failure records',
                'Which failure modes are occurring, how often, and on which equipment',
              ],
              [
                'PM task feedback',
                'What technicians find during PM visits — good condition, deterioration, unexpected issues',
              ],
              [
                'Condition monitoring trends',
                'Rate of deterioration, time from baseline to action level',
              ],
              [
                'Root cause analyses',
                'Whether failures are PM-preventable, and if so, what tasks would be effective',
              ],
              [
                'Manufacturer updates',
                'Service bulletins, known issues, revised maintenance recommendations',
              ],
            ]}
          />

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Measuring and improving the maintenance balance</ContentEyebrow>

          <ConceptBlock title="Measuring and Improving the Maintenance Balance">
            <p>
              Achieving the right balance between planned and reactive maintenance requires
              measurement, analysis and continuous improvement. Key performance indicators (KPIs)
              provide visibility of the current state, trend analysis shows whether improvement is
              occurring, and structured review processes drive the actions needed to close the gap
              between current performance and the target.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Essential maintenance KPIs">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>PM Compliance:</strong> Percentage of scheduled PM tasks completed on time.
                Target: &gt;90%. Low compliance means the preventive programme is not being executed
                — failures will follow.
              </li>
              <li>
                <strong>Planned Ratio:</strong> Planned work as a percentage of total work (by work
                orders or labour hours). Target: &gt;80%. Measures the effectiveness of the
                preventive programme.
              </li>
              <li>
                <strong>MTBF:</strong> Mean Time Between Failures. Should be increasing if the
                maintenance programme is improving. Track per asset or asset class.
              </li>
              <li>
                <strong>MTTR:</strong> Mean Time To Repair. Should be decreasing as planning, parts
                availability and technician skills improve.
              </li>
              <li>
                <strong>Availability:</strong> Percentage of time the asset is available for
                production. MTBF / (MTBF + MTTR) x 100. The ultimate measure of maintenance
                effectiveness.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Improving the planned ratio">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Analyse each reactive work order: was this failure preventable?</li>
              <li>For preventable failures, add targeted PM or CBM tasks</li>
              <li>Ensure PM compliance is high (schedule adherence)</li>
              <li>Review PM task quality (are tasks being done properly?)</li>
              <li>Address the top 5 breakdown causes each quarter</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Signs of good balance">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Breakdowns on critical equipment are rare</li>
              <li>Most repairs are planned and scheduled in advance</li>
              <li>PM tasks detect deterioration that leads to planned repairs</li>
              <li>Run-to-failure items are documented and justified</li>
              <li>Maintenance costs are stable or decreasing while reliability improves</li>
            </ul>
            <p className="italic">
              <strong className="not-italic">Note:</strong> Improving the maintenance balance is a
              journey, not a destination. Even world-class organisations continue to refine their
              maintenance programmes. The key is to have a structured process for analysing
              failures, adjusting preventive tasks, and measuring the results. Every breakdown is a
              learning opportunity — it either confirms the current strategy or points to an
              improvement that should be made.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Maintenance strategy selection: safety/environmental consequence = proactive task mandatory; hidden failure = failure-finding task required; operational consequence = proactive if cost-justified; non-operational = run-to-failure acceptable; wear-out pattern = time-based replacement; random with P-F interval = condition-based monitoring.',
              'Target KPIs: PM compliance >90% on time; planned ratio >80% of work; MTBF increasing trend; MTTR decreasing trend; availability >95% for critical assets; maintenance cost 2-5% of RAV.',
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
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module4-section7-1')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Principles of Reliability-Centred Maintenance
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module4-section7-3')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Criticality Analysis of Equipment
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule4Section7_2;
