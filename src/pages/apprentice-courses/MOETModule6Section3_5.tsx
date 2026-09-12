/**
 * MOET · Module 6 · Section 3 · Subsection 5 — Using Maintenance Management
 * Systems
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
  CommonMistake,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
  AppendixTable,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Using Maintenance Management Systems - MOET Module 6 Section 3.5';
const DESCRIPTION =
  'CMMS operation, data entry best practices, work order management, asset registers, spare parts tracking and reporting for electrical maintenance technicians under ST1426.';

const quickCheckQuestions = [
  {
    id: 'cmms-core',
    question: 'What is the core function of a CMMS in maintenance management?',
    options: [
      'Designing new electrical installations and producing the circuit diagrams for them',
      'Managing the procurement and purchasing of all materials used across the site',
      'Controlling building access, intruder alarms and physical security systems',
      'Planning, scheduling, tracking and recording maintenance across all the assets',
    ],
    correctIndex: 3,
    explanation:
      'A CMMS is the central platform that integrates all maintenance management functions: work order management, asset tracking, preventive maintenance scheduling, spare parts control, reporting and compliance documentation.',
  },
  {
    id: 'asset-register',
    question: 'An asset register in a CMMS contains:',
    options: [
      'An inventory of all maintainable assets — identity, location, specification and history',
      'A record of every spare part held in the stores together with its reorder level',
      'A log of all staff training records and individual competency assessments held',
      'A schedule of every statutory inspection date due across the whole of the site',
    ],
    correctIndex: 0,
    explanation:
      'The asset register is the foundation of the CMMS. It contains every maintainable asset with unique identification, physical location, technical specifications, criticality ranking, warranty information and complete maintenance history.',
  },
  {
    id: 'pm-scheduling',
    question: 'Preventive maintenance scheduling in a CMMS is based on:',
    options: [
      'The order in which breakdown reports happen to be received by the team',
      'Time intervals, usage meters or condition triggers, generated automatically',
      'The availability of individual technicians and trades on any given day',
      'The cost of the spare parts that are required to complete each task',
    ],
    correctIndex: 1,
    explanation:
      'PM scheduling uses time-based intervals (e.g., every 6 months), usage-based triggers (e.g., every 10,000 hours), condition-based alerts (e.g., vibration exceeding threshold), or combinations. The CMMS automatically generates work orders when triggers are met.',
  },
  {
    id: 'cmms-data-quality',
    question:
      'Why is accurate and detailed data entry by technicians the most critical factor in CMMS effectiveness?',
    options: [
      'Because technicians are legally required to complete every single field in the system',
      'Because the CMMS will not generate any work order at all without fully complete data',
      'Because every report, KPI and planning decision depends on the data entered at the job',
      'Because incomplete records automatically lock the technician out of the system entirely',
    ],
    correctIndex: 2,
    explanation:
      "The CMMS follows the principle of 'garbage in, garbage out'. If work orders are closed with minimal detail, test results omitted, or fault descriptions vague, the resulting KPIs, trends and planning decisions will be unreliable. Technicians are the primary data creators — your entries are the foundation upon which the entire maintenance strategy is built.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'The asset hierarchy in a CMMS typically follows:',
    options: [
      'The alphabetical order of the equipment manufacturer names on site',
      'Site, building, system, sub-system, component — mirroring the facility',
      'The chronological order in which the assets were originally installed',
      'The order of criticality, from the most important asset to the least',
    ],
    correctAnswer: 1,
    explanation:
      'The asset hierarchy mirrors the physical organisation: site > building > system (e.g., HVAC) > sub-system (e.g., AHU-3) > component (e.g., supply fan motor). This enables drill-down analysis and targeted reporting.',
  },
  {
    id: 2,
    question:
      'A preventive maintenance (PM) work order differs from a corrective work order because:',
    options: [
      'PM work orders are raised by technicians, while corrective ones are raised by managers',
      'PM work orders are always high priority, while corrective ones are always low priority',
      'PM is pre-planned to prevent failure; corrective responds to a failure that has occurred',
      'PM work orders are recorded on paper, while corrective ones are recorded in the CMMS',
    ],
    correctAnswer: 2,
    explanation:
      'PM work orders are proactive — scheduled in advance to prevent failures. Corrective work orders are reactive — generated in response to a breakdown or defect. The goal of good maintenance management is to maximise PM and minimise corrective work.',
  },
  {
    id: 3,
    question: 'KPIs (Key Performance Indicators) generated by a CMMS include:',
    options: [
      'Cable size, circuit rating, protective device type and disconnection time',
      'Asset purchase price, depreciation rate and resale value',
      'Technician hourly rate, overtime hours worked and annual leave taken',
      'MTBF, MTTR, PM compliance, backlog, first-time fix rate and cost per asset',
    ],
    correctAnswer: 3,
    explanation:
      'CMMS KPIs include: Mean Time Between Failures (MTBF), Mean Time To Repair (MTTR), PM schedule compliance %, work order backlog, first-time fix rate, and maintenance cost per asset. These drive maintenance strategy decisions.',
  },
  {
    id: 4,
    question: 'When entering a new work order in the CMMS, the minimum information required is:',
    options: [
      'Asset ID, task description, priority, target completion date and assigned technician',
      'The full maintenance history and the previous failure dates of the asset',
      'The current stock level and reorder point of every related spare part held',
      'The original purchase cost and the current warranty status of the asset',
    ],
    correctAnswer: 0,
    explanation:
      'A work order needs clear asset identification, description of the work, priority classification, target date, and assignment to a technician or trade. Without this minimum information, the work order cannot be effectively managed.',
  },
  {
    id: 5,
    question: 'Spare parts management in a CMMS enables:',
    options: [
      'Automatic ordering of any part, regardless of which assets actually use it',
      'Tracking stock, linking parts to assets, reordering and recording parts used',
      'Negotiation of supplier prices and the management of purchase contracts',
      'Physical stocktaking of the whole stores without any manual counting at all',
    ],
    correctAnswer: 1,
    explanation:
      'The CMMS tracks spare parts inventory, links specific parts to the assets that use them, triggers automatic reorder when stock falls below minimum levels, and records which parts were used on which work order.',
  },
  {
    id: 6,
    question: "The 'backlog' in maintenance management refers to:",
    options: [
      'The number of assets that have exceeded their design life',
      'The list of spare parts currently below their reorder level',
      'The total volume of approved work orders that have not yet been completed',
      'The amount of overtime worked beyond contracted hours',
    ],
    correctAnswer: 2,
    explanation:
      'The backlog is the total volume of approved but uncompleted work orders. A growing backlog indicates insufficient maintenance resources, while a declining backlog suggests improving efficiency. Backlog management is a key maintenance performance indicator.',
  },
  {
    id: 7,
    question: 'Condition-based maintenance (CBM) uses CMMS data to:',
    options: [
      'Schedule all maintenance at fixed calendar intervals regardless of condition',
      'Generate work orders only after equipment has already failed',
      'Replace components automatically once they reach a set calendar age',
      'Trigger maintenance from actual condition data rather than fixed time intervals',
    ],
    correctAnswer: 3,
    explanation:
      'CBM uses real-time or periodic condition data (vibration, temperature, oil analysis, insulation resistance) to trigger maintenance only when the equipment condition indicates it is needed, rather than on a fixed schedule.',
  },
  {
    id: 8,
    question: 'When closing a work order in the CMMS, you should record:',
    options: [
      'Findings, actions, parts used, time spent, test results and any follow-up needed',
      'Only a simple confirmation that the work has now been completed in full',
      'The next scheduled PM date for the asset, and nothing else beyond that',
      'The names of any other technicians who happened to be on site that day',
    ],
    correctAnswer: 0,
    explanation:
      'Work order close-out must capture: what was found, what was done, parts and materials used, time spent, test results, verification of correct operation, and any recommended follow-up actions. This data feeds the asset history.',
  },
  {
    id: 9,
    question: 'The CMMS dashboard is most useful for:',
    options: [
      'Producing the detailed step-by-step method statement for a maintenance task',
      'Giving real-time visibility of KPIs, overdue work and resources to support decisions',
      'Storing the manufacturer O&M manuals for every asset across the whole site',
      'Recording the individual test results captured from each completed work order',
    ],
    correctAnswer: 1,
    explanation:
      'Dashboards provide at-a-glance visibility of maintenance performance: overdue work orders, PM compliance, backlog trends, resource utilisation, and critical asset status. They enable proactive management rather than reactive firefighting.',
  },
  {
    id: 10,
    question: 'Integration between the CMMS and building management system (BMS) enables:',
    options: [
      'Direct control of plant setpoints from within the CMMS interface itself',
      'Automatic ordering of spare parts whenever any BMS alarm is triggered',
      'Automatic work orders from faults, condition data feeds and coordinated scheduling',
      'Removal of the need for any manual work order entry by the technicians',
    ],
    correctAnswer: 2,
    explanation:
      'BMS-CMMS integration enables automatic work order generation from BMS alarms, trending of operational data for condition monitoring, and coordinated scheduling of maintenance with building operations.',
  },
  {
    id: 11,
    question: 'As a maintenance technician, your primary interaction with the CMMS involves:',
    options: [
      'Configuring the asset hierarchy and setting up PM schedules',
      'Generating management reports and analysing KPI trends',
      'Approving submitted work orders and allocating the maintenance budget',
      'Receiving work orders, recording findings, logging parts and closing completed work',
    ],
    correctAnswer: 3,
    explanation:
      'Technicians are the primary data creators in the CMMS. You receive work assignments, update progress, record detailed findings and actions, log parts and time, and close out completed work. The quality of your entries determines the value of the entire system.',
  },
  {
    id: 12,
    question: 'Under ST1426, competence with maintenance management systems means:',
    options: [
      'Using the CMMS day to day, knowing how your data feeds planning and keeping accurate records',
      'Being able to design and configure a complete CMMS database entirely from scratch',
      'Writing the underlying software code that runs the whole CMMS platform itself',
      'Setting the organisation-wide maintenance strategy and the annual maintenance budget',
    ],
    correctAnswer: 0,
    explanation:
      'ST1426 requires practical competence with CMMS use: navigating the system, completing work orders accurately, understanding how your data feeds into planning and reporting, and recognising the CMMS as a critical business tool.',
  },
];

const faqs = [
  {
    question: 'What if the CMMS is down — should I still do the work?',
    answer:
      'Yes. Equipment maintenance should not be delayed because the CMMS is unavailable. Use paper-based backup procedures (work completion forms, logbook entries) and transfer the information to the CMMS as soon as it is available. Most organisations have contingency procedures for CMMS downtime.',
  },
  {
    question: 'How much detail should I put in a CMMS work order?',
    answer:
      'Enough for another competent technician to understand what was found and done without contacting you. Include specific measurements, part numbers, fault descriptions, and diagnostic steps. The more detail you provide, the more valuable the asset history becomes for future maintenance decisions.',
  },
  {
    question: 'Can the CMMS track my individual performance?',
    answer:
      'Yes, CMMS systems can generate reports on individual technician activity — work orders completed, time taken, first-time fix rate, etc. This data is typically used for resource planning and workload balancing rather than individual performance management. However, you should be aware that your work order entries are visible to supervisors and managers.',
  },
  {
    question: 'What training should I expect on the CMMS?',
    answer:
      'Your employer should provide system-specific training covering: how to navigate the interface, receive and update work orders, record findings, log parts, close work orders, and access asset information. This is typically a combination of classroom training and supervised on-the-job practice. Ask for additional training if you are not confident.',
  },
  {
    question: 'How does the CMMS support my EPA evidence?',
    answer:
      'The CMMS provides a comprehensive record of your maintenance activities — work orders completed, fault diagnoses, corrective actions, and test results. This data can be extracted to support your EPA portfolio, demonstrating the breadth of your experience and the quality of your work recording.',
  },
];

const MOETModule6Section3_5 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 6 · Section 6.3 · Subsection 5"
        title="Using Maintenance Management Systems"
        backTo="/study-centre/apprentice/m-o-e-t-module6-section3"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            CMMS operation, work order management and effective data entry for maintenance
            technicians
          </p>

          <TLDR
            points={[
              'CMMS: central platform for all maintenance management.',
              'Asset register: complete inventory with specifications and history.',
              'Work orders: plan, schedule, execute, record, close.',
              'KPIs: MTBF, MTTR, PM compliance, backlog.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Navigate a CMMS to receive, update and close maintenance work orders',
              'Understand asset register structure and hierarchy for electrical installations',
              'Record maintenance findings and test results accurately in the CMMS',
              'Explain how CMMS data drives maintenance planning and KPI reporting',
              'Use spare parts management features to track component usage',
              'Apply ST1426 requirements for effective maintenance system use',
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock title="Electrical maintenance context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>PM scheduling:</strong> time, usage and condition-based triggers.
              </li>
              <li>
                <strong>Parts tracking:</strong> link components to specific assets.
              </li>
              <li>
                <strong>BMS integration:</strong> automatic fault-to-work-order generation.
              </li>
              <li>
                <strong>ST1426:</strong> CMMS competence assessed in EPA.
              </li>
            </ul>
          </ConceptBlock>

          <ContentEyebrow>CMMS fundamentals</ContentEyebrow>

          <ConceptBlock title="CMMS fundamentals">
            <p>
              A Computerised Maintenance Management System is the backbone of modern maintenance
              operations. It integrates work order management, asset tracking, preventive
              maintenance scheduling, spare parts control, and reporting into a single platform. As
              a maintenance technician, you are the primary data creator — the quality of your
              entries determines the value of the entire system.
            </p>
            <p>
              Before the widespread adoption of CMMS platforms, maintenance teams relied on
              card-based systems, wall planners, and handwritten logbooks. While these methods
              worked for small operations, they became unmanageable as organisations grew and
              regulatory requirements increased. A modern CMMS replaces all of these fragmented
              records with a single, searchable database that connects every asset, work order,
              part, and cost — providing the visibility that effective maintenance management
              demands.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Core CMMS modules">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Asset management:</strong> register, hierarchy, specifications,
                documentation.
              </li>
              <li>
                <strong>Work order management:</strong> create, assign, track, close maintenance
                tasks.
              </li>
              <li>
                <strong>Preventive maintenance:</strong> schedule, trigger and track PM programmes.
              </li>
              <li>
                <strong>Spare parts:</strong> inventory, min/max levels, reorder, usage tracking.
              </li>
              <li>
                <strong>Reporting:</strong> KPIs, trends, compliance reports, cost analysis.
              </li>
              <li>
                <strong>Mobile access:</strong> field data entry, barcode scanning, photo capture.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Asset hierarchy example — electrical">
            <div className="rounded-lg bg-white/5 p-4 text-[13.5px] leading-relaxed">
              <div>Site: Manufacturing Plant — Building: Production Hall A</div>
              <div className="ml-4">System: Power Distribution</div>
              <div className="ml-8">Sub-system: MCC-01 (Motor Control Centre)</div>
              <div className="ml-12">Component: Conveyor 3 DOL Starter (Asset E-MCC01-003)</div>
            </div>
            <p>
              The asset hierarchy is fundamental because it determines how maintenance data is
              organised, how costs are allocated, and how failures can be traced. When you log a
              work order against asset E-MCC01-003, the CMMS automatically associates that work with
              the MCC-01 sub-system, the Power Distribution system, Production Hall A, and the
              overall site. This means a facilities manager can view total maintenance cost at any
              level of the hierarchy — from a single contactor right up to the entire site.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Getting the hierarchy wrong"
            whatHappens={
              <>
                Errors in asset hierarchy — such as logging work against the wrong parent system or
                assigning an asset to the wrong building — corrupt the data for everyone.
              </>
            }
            doInstead={
              <>
                Always verify that you are selecting the correct asset before creating or updating a
                work order. If you notice hierarchy errors, report them to your CMMS administrator
                rather than working around them.
              </>
            }
          />

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Work order management in practice</ContentEyebrow>

          <ConceptBlock title="Work order management in practice">
            <p>
              Work orders are the operational heart of the CMMS. Every maintenance task — from a
              simple lamp replacement to a complex motor overhaul — should be captured as a work
              order. This creates the complete maintenance history that drives planning, budgeting
              and reliability improvement.
            </p>
            <p>
              Think of the work order as the single most important document in maintenance. It
              captures the full lifecycle of a task: who requested it, why it was needed, who did
              the work, what they found, what they did, what parts they used, how long it took, and
              whether there are any follow-up actions. Without this information, the organisation is
              flying blind — unable to identify recurring faults, calculate true maintenance costs,
              or justify investment in new equipment.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Your daily CMMS workflow">
            <ol className="list-decimal space-y-2.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Review assigned work orders.</strong> Check priorities, read descriptions,
                gather parts and tools.
              </li>
              <li>
                <strong>Accept and update status.</strong> Mark as &apos;in progress&apos; when you
                begin work.
              </li>
              <li>
                <strong>Record findings and actions.</strong> Enter detailed notes, test results,
                parts used at the point of work.
              </li>
              <li>
                <strong>Complete and close.</strong> Record verification results, flag any follow-up
                actions needed.
              </li>
            </ol>
          </ConceptBlock>

          <AppendixTable
            caption="Work order types and triggers"
            headers={['Work Order Type', 'Trigger', 'Typical Priority']}
            rows={[
              ['Corrective (reactive)', 'Equipment breakdown or fault report', 'Urgent / High'],
              ['Preventive (planned)', 'Schedule — time, usage or condition', 'Medium / Planned'],
              ['Predictive', 'Condition data indicates deterioration', 'Medium / Planned'],
              ['Improvement', 'Modification or upgrade request', 'Low / Scheduled'],
              ['Statutory', 'Regulatory compliance requirement', 'High / Non-negotiable'],
            ]}
          />

          <CommonMistake
            title="Closing work orders with minimal information"
            whatHappens={
              <>
                One of the most common mistakes technicians make is closing work orders with minimal
                information — &quot;fixed&quot;, &quot;replaced part&quot;, or &quot;job done&quot;.
                These entries are worthless for analysis.
              </>
            }
            doInstead={
              <>
                Instead, describe what you found (&quot;found contactor KM3 welded closed,
                overheating evident on L2 contact&quot;), what you did (&quot;replaced contactor
                with Schneider LC1D09, torqued terminals to 2.5 Nm&quot;), and what you tested
                (&quot;insulation resistance L-L 150 M&#937;, L-E 200 M&#937;, functional test
                satisfactory&quot;). This level of detail builds the asset history that prevents
                future failures.
              </>
            }
          />

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>PM scheduling and condition-based maintenance</ContentEyebrow>

          <ConceptBlock title="PM scheduling and condition-based maintenance">
            <p>
              The CMMS automates preventive maintenance scheduling, ensuring that PM tasks are
              generated at the right time based on configured triggers. Understanding how PM
              scheduling works helps you appreciate the importance of timely completion and accurate
              recording.
            </p>
            <p>
              Preventive maintenance programmes in a CMMS are built from task lists linked to
              assets. Each PM programme defines what needs to be done (the task list), on which
              asset, how often (the trigger), and who should do it (the trade or individual). When a
              trigger condition is met, the CMMS automatically generates a work order, assigns it to
              the appropriate technician, and tracks its completion. Late or missed PM work orders
              directly affect compliance KPIs and may create regulatory risk.
            </p>
          </ConceptBlock>

          <AppendixTable
            caption="PM scheduling trigger types"
            headers={['Trigger Type', 'How It Works', 'Electrical Example']}
            rows={[
              [
                'Time-based',
                'Fixed calendar intervals',
                'Annual thermographic survey of switchgear',
              ],
              [
                'Usage-based',
                'Running hours or cycle count',
                'Motor bearing replacement at 20,000 hours',
              ],
              [
                'Condition-based',
                'Sensor data exceeds threshold',
                'Vibration alarm on VSD cooling fan',
              ],
              [
                'Event-based',
                'Triggered by specific events',
                'Post-fault inspection after RCD trip',
              ],
            ]}
          />

          <ConceptBlock title="Condition-based maintenance">
            <p>
              Condition-based maintenance (CBM) represents the evolution from fixed-schedule PM to
              intelligent, data-driven maintenance. Rather than replacing bearings every 12 months
              regardless of condition, CBM monitors vibration levels continuously and triggers a
              work order only when deterioration is detected. This approach reduces unnecessary
              maintenance while still preventing unexpected failures. The CMMS is the platform that
              makes CBM practical — it receives condition data from sensors or manual readings,
              compares it against configured thresholds, and generates work orders when action is
              needed.
            </p>
          </ConceptBlock>

          <ConceptBlock title="The technician's role in PM scheduling">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Complete PM work orders on time:</strong> late completions skew compliance
                KPIs and may miss deteriorating conditions.
              </li>
              <li>
                <strong>Record all findings:</strong> even when everything is normal, record
                &quot;no defects found&quot; — this is valuable data confirming the PM interval is
                appropriate.
              </li>
              <li>
                <strong>Flag anomalies:</strong> if you spot early signs of deterioration during a
                PM, raise a separate corrective work order — do not bury it in PM notes.
              </li>
              <li>
                <strong>Update meter readings:</strong> if usage-based PM relies on running hours,
                ensure meter readings are entered accurately.
              </li>
              <li>
                <strong>Suggest improvements:</strong> if a PM task list is incomplete or the
                interval seems wrong, report it to your supervisor for review.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>KPIs, reporting and continuous improvement</ContentEyebrow>

          <ConceptBlock title="KPIs, reporting and continuous improvement">
            <p>
              The data you enter into the CMMS feeds directly into maintenance KPIs and reports.
              Understanding these metrics helps you appreciate the bigger picture — how your daily
              work contributes to organisational performance and reliability improvement.
            </p>
            <p>
              Maintenance KPIs are not abstract management numbers — they are direct reflections of
              how well the maintenance team is performing. When the PM compliance figure drops below
              90%, it means real work orders are being completed late or not at all, and equipment
              is running without the maintenance it needs. When MTBF for a particular asset class
              starts declining, it means those assets are failing more frequently, costing more
              money and creating more risk. As a technician, understanding these metrics helps you
              see the connection between your daily work and the organisation&apos;s maintenance
              performance.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Key maintenance KPIs">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>MTBF (Mean Time Between Failures):</strong> average time between breakdowns
                — higher is better.
              </li>
              <li>
                <strong>MTTR (Mean Time To Repair):</strong> average repair duration — lower is
                better.
              </li>
              <li>
                <strong>PM Compliance:</strong> percentage of PM work orders completed on time —
                target 90%+.
              </li>
              <li>
                <strong>Backlog:</strong> volume of outstanding approved work — should be stable or
                declining.
              </li>
              <li>
                <strong>First-time fix rate:</strong> percentage of faults resolved on first visit —
                higher is better.
              </li>
              <li>
                <strong>Planned vs reactive ratio:</strong> proportion of planned to unplanned work
                — target 80:20.
              </li>
            </ul>
          </ConceptBlock>

          <AppendixTable
            caption="How your CMMS entries feed each KPI"
            headers={['KPI', 'What It Measures', 'How Your Data Contributes']}
            rows={[
              ['MTBF', 'Equipment reliability', 'Accurate failure dates and asset identification'],
              ['MTTR', 'Repair efficiency', 'Accurate start/finish times on work orders'],
              [
                'PM Compliance',
                'Preventive programme delivery',
                'Completing and closing PM work orders on time',
              ],
              [
                'First-time fix',
                'Diagnostic accuracy',
                'Recording whether the fault was resolved on first visit',
              ],
            ]}
          />

          <ConceptBlock title="Why this matters for your EPA">
            <p>
              <strong>ST1426 link:</strong> understanding how your work feeds into maintenance KPIs
              demonstrates the systems thinking and continuous improvement mindset valued in the EPA
              professional discussion.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>Spare parts, integration and best practice</ContentEyebrow>

          <ConceptBlock title="Spare parts, integration and best practice">
            <p>
              Effective spare parts management is essential for minimising equipment downtime. The
              CMMS links specific spare parts to the assets that use them, tracks stock levels in
              real time, and triggers automatic reorder when inventory falls below configured
              minimum levels. For electrical maintenance, this means critical spares — contactors,
              fuses, circuit breakers, drive modules, sensors — are available when you need them,
              reducing the time spent waiting for parts and the risk of using incorrect substitutes.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Spare parts best practice for technicians">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Always log parts used:</strong> record the exact part number, quantity and
                the work order it was used against.
              </li>
              <li>
                <strong>Check stock before starting:</strong> query the CMMS for part availability
                before beginning a planned repair.
              </li>
              <li>
                <strong>Report discrepancies:</strong> if actual stock does not match CMMS records,
                report the difference immediately.
              </li>
              <li>
                <strong>Link parts to assets:</strong> ensure the bill of materials for your assets
                is accurate — add missing parts when you discover them.
              </li>
              <li>
                <strong>Flag obsolescence:</strong> if a manufacturer discontinues a part, raise
                this in the CMMS so alternatives can be identified.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="BMS integration">
            <p>
              Modern CMMS platforms increasingly integrate with other business systems. The most
              valuable integration for electrical maintenance is with the Building Management System
              (BMS). When the BMS detects a fault — such as a supply fan failure, a temperature
              alarm, or a power quality event — it can automatically generate a work order in the
              CMMS, pre-populated with the asset details, fault description, and priority. This
              eliminates the delay between fault detection and maintenance response, and ensures
              that every BMS alarm with maintenance implications is formally tracked.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Common CMMS integrations">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>BMS / SCADA:</strong> automatic fault-to-work-order generation, condition
                data trending.
              </li>
              <li>
                <strong>Finance / ERP:</strong> purchase order creation, cost allocation, budget
                tracking.
              </li>
              <li>
                <strong>HR / resource:</strong> technician availability, skills matrix, training
                records.
              </li>
              <li>
                <strong>Document management:</strong> O&amp;M manuals, drawings, certificates linked
                to assets.
              </li>
              <li>
                <strong>IoT sensors:</strong> real-time condition data feeding directly into the
                CMMS.
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="CMMS is only as good as its data"
            whatHappens={
              <>
                The most expensive, feature-rich CMMS in the world is worthless if technicians do
                not use it properly. Every incomplete work order, every unrecorded part, every vague
                fault description degrades the data quality that managers rely on for planning,
                budgeting and compliance.
              </>
            }
            doInstead={
              <>
                Treat every CMMS entry as if it will be read by an auditor, a safety investigator,
                or a future technician trying to diagnose a recurring fault — because at some point,
                it will be.
              </>
            }
          />

          <ConceptBlock title="Preparing for your EPA">
            <p>
              <strong>EPA preparation:</strong> during your End-Point Assessment, you may be asked
              to demonstrate CMMS competence through a practical observation or discuss how you use
              the system in the professional discussion. Being able to explain the full work order
              lifecycle, the importance of data quality, and how CMMS data supports maintenance
              planning will demonstrate the breadth of your understanding.
            </p>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            points={[
              'CMMS core modules: asset management and hierarchy, work order lifecycle management, preventive maintenance scheduling, spare parts inventory control, reporting and KPI dashboards.',
              'Key KPIs: MTBF (Mean Time Between Failures), MTTR (Mean Time To Repair), PM compliance (target 90%+), planned:reactive ratio (target 80:20), first-time fix rate.',
              'Work order data essentials: asset ID and location, detailed fault/task description, findings/actions/test results, parts used (number and quantity), time spent and follow-up actions.',
              'Common integrations: BMS/SCADA (fault and condition data), Finance/ERP (cost and procurement), IoT sensors (real-time monitoring), document management (O&M manuals), HR (skills and resource planning).',
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
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module6-section3-4')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Traceability and Compliance Requirements
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module6-section4-1')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Shift Handover Procedures
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule6Section3_5;
