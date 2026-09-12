/**
 * MOET · Module 4 · Section 1 · Subsection 2 — Maintenance Scheduling and Records
 *
 * Standard: ST1426 Engineering maintenance technician – single discipline,
 * electrical option. NOT ST0154 (the "MOET" the course is named after) —
 * ST0154 v1.6 is still live, but its own EPA plan records that the Electrical
 * Technician option "was retired 31/12/2025" and was replaced by ST1426
 * (single discipline) or ST1443 (dual discipline). The course keeps the MOET
 * name because that is what employers and colleges still call the role.
 *
 * KSBs covered, quoted rather than numbered — the published K/S/B
 * numbering is unverified, so never write a code here:
 *   · "Documentation requirements: documentation control, auditable
 *     records."
 *   · "Record information."
 *   · "Produce or update documents. For example, handover notes and
 *     reports."
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
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Maintenance Scheduling and Records - MOET Module 4.1.2';
const DESCRIPTION =
  'CMMS and CAFM systems, work order management, scheduling techniques, asset registers, maintenance history, KPIs including MTBF, MTTR and availability, and data-driven maintenance decisions for electrical technicians.';

const quickCheckQuestions = [
  {
    id: 'cmms-purpose',
    question: 'What is the primary purpose of a Computerised Maintenance Management System (CMMS)?',
    options: [
      'To plan, schedule, track and record all maintenance activities and asset information in a centralised database',
      'To monitor real-time electrical loads and automatically shed non-essential circuits at peak demand',
      'To generate financial accounts and process supplier invoices for the maintenance department',
      'To control building services such as heating, ventilation and lighting from a central interface',
    ],
    correctIndex: 0,
    explanation:
      'A CMMS is a software platform that centralises all maintenance information — asset registers, work orders, schedules, history, spare parts and KPIs. It enables efficient planning, scheduling and tracking of maintenance activities, and provides the data needed for continuous improvement.',
  },
  {
    id: 'work-order-lifecycle',
    question: 'What is the correct lifecycle of a maintenance work order?',
    options: [
      'Schedule, request, plan, close, execute, record',
      'Request, plan, schedule, execute, record, close',
      'Plan, request, execute, schedule, close, record',
      'Execute, record, request, plan, schedule, close',
    ],
    correctIndex: 1,
    explanation:
      'A work order follows a structured lifecycle: it is requested (either from the PPM schedule or a reactive report), planned (resources and materials identified), scheduled (date and time allocated), executed (work carried out), recorded (findings and actions documented), and closed (completion verified and history updated).',
  },
  {
    id: 'mtbf-meaning',
    question:
      'MTBF stands for Mean Time Between Failures. If a motor has an MTBF of 8,760 hours, what does this indicate?',
    options: [
      'The motor is guaranteed to run for exactly 8,760 hours before it fails',
      'The motor must be replaced after every 8,760 hours of operation',
      'On average, the motor operates for approximately 8,760 hours (about one year of continuous running) between failures',
      'The motor takes an average of 8,760 hours to be repaired after a failure',
    ],
    correctIndex: 2,
    explanation:
      'MTBF of 8,760 hours means that, on average, the motor runs for approximately 8,760 hours between failures — roughly one year of continuous 24/7 operation. It is a statistical average, not a guarantee; individual motors may fail sooner or later. A rising MTBF trend indicates improving reliability.',
  },
  {
    id: 'ppm-compliance',
    question: 'PPM compliance is measured as the percentage of:',
    options: [
      'Reactive repairs completed within the agreed response time',
      'Total maintenance hours spent on planned rather than reactive work',
      'Assets that passed their most recent condition assessment',
      'Planned maintenance tasks completed on time versus the total number scheduled',
    ],
    correctIndex: 3,
    explanation:
      'PPM compliance measures how many scheduled preventive maintenance tasks were completed on time compared to the total number scheduled. A target of 90-95% is typical for well-managed organisations. Low compliance indicates scheduling problems, resource shortages or poor prioritisation.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'A CMMS (Computerised Maintenance Management System) is used to:',
    options: [
      'Manage maintenance work orders, asset data, schedules and history',
      'Calculate cable sizes and protective device ratings for new circuits',
      'Monitor live energy consumption and report on carbon emissions',
      'Store the building drawings and architectural records for the site',
    ],
    correctAnswer: 0,
    explanation:
      'A CMMS is a software platform for managing all aspects of maintenance operations, including work order management, asset registers, PPM scheduling, maintenance history, spare parts inventory and KPI reporting. It is the digital backbone of modern maintenance management.',
  },
  {
    id: 2,
    question: 'CAFM stands for:',
    options: [
      'Centralised Asset Failure Management',
      'Computer Assisted Fault Monitoring',
      'Computer Aided Facilities Management',
      'Condition Assessment and Fault Mapping',
    ],
    correctAnswer: 2,
    explanation:
      'CAFM (Computer Aided Facilities Management) is a broader platform than a CMMS, covering all aspects of facilities management including space management, help desk, contractor management and compliance tracking, as well as maintenance management. Many modern platforms combine CMMS and CAFM functionality.',
  },
  {
    id: 3,
    question: 'An asset register should contain which of the following information?',
    options: [
      'Asset identification, location, type, rating, manufacturer, installation date, condition, criticality and maintenance history',
      'Only the purchase price and depreciation value of each item of equipment',
      'A list of every spare part currently held in the stores with reorder quantities',
      'The names and shift patterns of technicians assigned to each area of the site',
    ],
    correctAnswer: 0,
    explanation:
      'A comprehensive asset register is the foundation of effective maintenance management. It should include unique identification, precise location, type and rating, manufacturer and model, installation/commissioning date, current condition assessment, criticality ranking, maintenance history, and links to technical documentation.',
  },
  {
    id: 4,
    question: 'The key advantage of scheduling PPM work during planned shutdowns is:',
    options: [
      'It removes the need to obtain a permit to work or isolate the equipment',
      'It minimises disruption to production while allowing safe access to equipment that is normally energised or in continuous use',
      'It allows the work to be carried out by less experienced technicians',
      'It reduces the cost of spare parts because they can be bought in bulk',
    ],
    correctAnswer: 1,
    explanation:
      'Scheduling maintenance during planned shutdowns allows access to equipment that cannot be safely maintained while in service, minimises production disruption, and enables more thorough inspection and testing. However, shutdown windows are limited, so work must be carefully planned and prioritised.',
  },
  {
    id: 5,
    question: 'MTTR (Mean Time to Repair) measures:',
    options: [
      'The average operating time between successive equipment failures',
      'The average time taken to restore equipment to operational status after a failure',
      'The total number of repairs carried out across the maintenance period',
      'The proportion of time equipment is available for use during a year',
    ],
    correctAnswer: 1,
    explanation:
      'MTTR measures the average time taken to diagnose, repair and restore equipment to full operational status after a failure. It includes fault finding, parts procurement, repair and testing. A lower MTTR indicates efficient repair processes, good spare parts availability and skilled technicians.',
  },
  {
    id: 6,
    question: 'Equipment availability is calculated as:',
    options: [
      'MTTR divided by MTBF',
      'Total operating hours divided by total repair hours',
      'MTBF divided by (MTBF + MTTR), expressed as a percentage',
      'Number of failures divided by total operating hours',
    ],
    correctAnswer: 2,
    explanation:
      'Availability = MTBF / (MTBF + MTTR) x 100%. For example, if MTBF is 990 hours and MTTR is 10 hours, availability is 990/(990+10) = 99%. This metric shows the proportion of time equipment is available for use. High availability requires both high reliability (high MTBF) and fast repair (low MTTR).',
  },
  {
    id: 7,
    question: 'A maintenance backlog of over 4 weeks of work typically indicates:',
    options: [
      'A well-resourced team that is comfortably ahead of its planned schedule',
      'That preventive maintenance is being completed faster than it is generated',
      'A healthy reserve of work that protects technicians from idle time',
      'Insufficient maintenance resources, poor planning, or too many reactive tasks consuming planned maintenance time',
    ],
    correctAnswer: 3,
    explanation:
      'A growing maintenance backlog indicates that work is being generated faster than it can be completed. Common causes include insufficient staffing, too much reactive maintenance displacing planned work, poor scheduling, or unrealistic maintenance plans. A healthy backlog is typically 2-4 weeks; beyond this, critical tasks may be missed.',
  },
  {
    id: 8,
    question:
      'When recording maintenance findings on a work order, which information is most important?',
    options: [
      'Actual condition found, measurements taken, work carried out, parts used, anomalies identified and recommendations for further action',
      'Only confirmation that the task was completed, with no further detail required',
      'The name of the technician and the total number of hours booked to the job',
      'A simple pass or fail result so the work order can be closed quickly',
    ],
    correctAnswer: 0,
    explanation:
      'Detailed recording of findings is essential for maintenance history, trend analysis and future planning. The record should capture what was found, what was measured (with values), what work was done, what parts were used, any anomalies or concerns, and recommendations for follow-up action. This data drives continuous improvement of the maintenance programme.',
  },
  {
    id: 9,
    question: 'Data-driven maintenance decisions rely on:',
    options: [
      'The personal judgement of the most experienced technician on site',
      'Analysis of historical failure data, condition monitoring trends, KPI performance and cost data to optimise maintenance strategies',
      'Following the manufacturer recommended intervals without any variation',
      'Responding to faults as they arise rather than planning ahead',
    ],
    correctAnswer: 1,
    explanation:
      'Data-driven decisions use evidence from CMMS records, condition monitoring systems and financial data to identify where maintenance is effective and where it needs adjustment. This might mean increasing frequency on assets with rising failure rates, reducing frequency on assets with consistently good condition, or changing strategy entirely based on failure patterns.',
  },
  {
    id: 10,
    question: 'A Gantt chart in maintenance scheduling is used to:',
    options: [
      'Record the insulation resistance readings taken during each PPM visit',
      'Rank assets by criticality to decide which receive preventive maintenance',
      'Visually display the timeline of scheduled maintenance tasks, showing duration, sequence and resource allocation',
      'Calculate the prospective fault current at each distribution board',
    ],
    correctAnswer: 2,
    explanation:
      'A Gantt chart is a bar chart that shows scheduled tasks along a timeline, making it easy to visualise when work is planned, how long it will take, which tasks overlap, and where resource conflicts exist. It is widely used in maintenance planning, particularly for shutdown scheduling where multiple tasks must be coordinated.',
  },
  {
    id: 11,
    question: 'The ratio of planned maintenance hours to total maintenance hours is known as:',
    options: [
      'The equipment availability percentage',
      'The mean time between failures (MTBF)',
      'The PPM compliance rate',
      'The planned/unplanned ratio (or reactive/proactive split)',
    ],
    correctAnswer: 3,
    explanation:
      'The planned/unplanned ratio measures how much maintenance time is spent on planned activities versus reactive repairs. World-class maintenance targets at least 80% planned work. A high proportion of reactive work indicates an immature maintenance programme where PPM is either insufficient or poorly implemented.',
  },
  {
    id: 12,
    question:
      'Under ST1426, which of the following is a required behaviour when completing maintenance records?',
    options: [
      'Accurately recording all findings, measurements and actions, including anomalies and recommendations',
      'Allowing another person to complete your records on your behalf',
      'Recording only successful tasks and omitting any problems found',
      'Leaving records until the end of the week and completing them from memory',
    ],
    correctAnswer: 0,
    explanation:
      'ST1426 requires maintenance technicians to maintain accurate records of work carried out, including measurements, observations and anomalies. Records should be completed contemporaneously (at the time of the work), be factual and accurate, and include recommendations for further action where appropriate. This is a fundamental professional behaviour.',
  },
];

const faqs = [
  {
    question: 'What is the difference between a CMMS and a CAFM system?',
    answer:
      'A CMMS (Computerised Maintenance Management System) focuses specifically on maintenance operations — work orders, PPM scheduling, asset data and maintenance history. A CAFM (Computer Aided Facilities Management) system is broader, covering all facilities management functions including space management, help desk, compliance, energy management and contractor control. Many modern platforms offer integrated CMMS/CAFM functionality. Common examples include Maximo, SAP PM, Planon, MRI and Concept Evolution.',
  },
  {
    question: 'How do I calculate equipment availability?',
    answer:
      'Availability = MTBF / (MTBF + MTTR) x 100%. MTBF is Mean Time Between Failures (average operating time between breakdowns) and MTTR is Mean Time to Repair (average time to fix a breakdown). For example: if a motor runs for an average of 2,000 hours between failures (MTBF) and takes an average of 8 hours to repair (MTTR), its availability is 2,000 / (2,000 + 8) = 99.6%. Improving availability requires either increasing reliability (fewer failures) or reducing repair time (faster fixes).',
  },
  {
    question: 'What PPM compliance percentage should we target?',
    answer:
      'Industry best practice targets PPM compliance of 90-95%. This means 90-95% of scheduled preventive maintenance tasks are completed on time. Below 80% indicates serious problems with the maintenance programme. 100% is theoretically ideal but practically very difficult to achieve, as some tasks may be deferred for legitimate operational reasons. The key is to ensure safety-critical tasks always achieve 100% compliance.',
  },
  {
    question: 'How should maintenance records be stored?',
    answer:
      'Maintenance records should be stored in a CMMS or equivalent database for easy retrieval, analysis and reporting. Paper records, while still used in some organisations, are difficult to search, analyse and share. Records should be retained for at least the life of the asset, and statutory records (such as periodic inspection reports) should be kept as required by the relevant legislation. Cloud-based CMMS platforms provide secure, accessible storage with automatic backup.',
  },
  {
    question:
      'What should I do if I find an anomaly during PPM that is not covered by the work order?',
    answer:
      'Record the anomaly in detail on the work order (including photos if possible), assess whether it presents an immediate safety risk, and report it to your supervisor or the maintenance manager. If the anomaly is safety-critical (e.g., exposed live conductors, signs of overheating), take immediate action to make the situation safe (isolate if necessary) and raise an emergency work order. For non-urgent anomalies, raise a follow-up work order in the CMMS for investigation and repair.',
  },
];

const MOETModule4Section1_2 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 4 · Section 4.1 · Subsection 2"
        title="Maintenance Scheduling and Records"
        backTo="/study-centre/apprentice/m-o-e-t-module4-section1"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            CMMS systems, work order management, KPIs and data-driven maintenance decisions.
          </p>

          <TLDR
            points={[
              'CMMS: Digital platform for managing all maintenance activities.',
              'Work orders: Formal records of maintenance tasks from request to close.',
              'KPIs: MTBF, MTTR, availability, PPM compliance, backlog.',
              'Records: Accurate, contemporaneous documentation of all findings.',
            ]}
          />

          <ConceptBlock title="Electrical maintenance context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Asset registers:</strong> Switchgear, motors, drives, emergency systems.
              </li>
              <li>
                <strong>Scheduling:</strong> Shutdown planning, statutory test intervals.
              </li>
              <li>
                <strong>Trending:</strong> Insulation resistance, thermal data, vibration levels.
              </li>
              <li>
                <strong>ST1426:</strong> Accurate record keeping is a core competency.
              </li>
            </ul>
          </ConceptBlock>

          <LearningOutcomes
            outcomes={[
              'Describe the functions and benefits of CMMS and CAFM systems',
              'Explain the work order lifecycle from request to close-out',
              'Apply scheduling techniques including Gantt charts and shutdown planning',
              'Maintain accurate asset registers and maintenance history records',
              'Calculate and interpret maintenance KPIs (MTBF, MTTR, availability)',
              'Use maintenance data to drive continuous improvement decisions',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>CMMS and CAFM systems</ContentEyebrow>

          <ConceptBlock title="The core tool for maintenance complexity">
            <p>
              Modern maintenance management relies on digital systems to handle the complexity of
              scheduling, tracking and recording maintenance activities across potentially thousands
              of assets. A Computerised Maintenance Management System (CMMS) is the core tool for
              this purpose, while Computer Aided Facilities Management (CAFM) systems provide
              broader facilities management functionality.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Core CMMS functions">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Asset register:</strong> Centralised database of all assets with technical
                data, location, criticality and documentation links
              </li>
              <li>
                <strong>Work order management:</strong> Create, assign, track and close maintenance
                tasks with full audit trail
              </li>
              <li>
                <strong>PPM scheduling:</strong> Automated generation of planned maintenance work
                orders based on time, meter readings or condition triggers
              </li>
              <li>
                <strong>Maintenance history:</strong> Complete record of all work carried out on
                each asset, including findings, measurements and parts used
              </li>
              <li>
                <strong>Spare parts management:</strong> Stock levels, reorder points, usage
                tracking and cost allocation
              </li>
              <li>
                <strong>Reporting and KPIs:</strong> Automated calculation of performance metrics
                including MTBF, MTTR, availability and PPM compliance
              </li>
              <li>
                <strong>Mobile access:</strong> Tablet and smartphone apps allowing technicians to
                receive, update and close work orders in the field
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Common CMMS/CAFM platforms"
            onSite={
              <>
                As a maintenance technician, you will interact with a CMMS daily — receiving work
                orders, recording findings, closing tasks and updating asset information. Becoming
                proficient with the system your organisation uses is essential for effective
                professional practice.
              </>
            }
          >
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 font-medium text-white">
                      Platform
                    </th>
                    <th className="border border-white/10 px-3 py-2 font-medium text-white">
                      Type
                    </th>
                    <th className="border border-white/10 px-3 py-2 font-medium text-white">
                      Typical use
                    </th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr>
                    <td className="border border-white/10 px-3 py-2">IBM Maximo</td>
                    <td className="border border-white/10 px-3 py-2">Enterprise CMMS/EAM</td>
                    <td className="border border-white/10 px-3 py-2">
                      Large industrial, utilities, transport
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">SAP PM</td>
                    <td className="border border-white/10 px-3 py-2">Enterprise CMMS</td>
                    <td className="border border-white/10 px-3 py-2">
                      Manufacturing, process industries
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Planon / MRI</td>
                    <td className="border border-white/10 px-3 py-2">CAFM</td>
                    <td className="border border-white/10 px-3 py-2">
                      Commercial property, FM service providers
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Concept Evolution</td>
                    <td className="border border-white/10 px-3 py-2">CAFM</td>
                    <td className="border border-white/10 px-3 py-2">
                      UK FM sector, NHS, education
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Fiix / UpKeep</td>
                    <td className="border border-white/10 px-3 py-2">Cloud CMMS</td>
                    <td className="border border-white/10 px-3 py-2">
                      SMEs, mobile-first maintenance teams
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Work order management</ContentEyebrow>

          <ConceptBlock title="The fundamental unit of maintenance management">
            <p>
              The work order is the fundamental unit of maintenance management. Every maintenance
              activity — whether planned preventive, corrective, emergency or improvement — should
              be captured as a work order in the CMMS. This provides traceability, accountability
              and the data needed for performance analysis.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Work order lifecycle">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Request:</strong> Work is initiated — either automatically from the PPM
                schedule, from a reactive fault report, or from a condition monitoring alert
              </li>
              <li>
                <strong>Plan:</strong> Resources identified — technician skill requirements,
                estimated duration, spare parts needed, special tools, permits required
              </li>
              <li>
                <strong>Schedule:</strong> Work allocated to a specific date, time and technician,
                considering equipment availability, resource capacity and priority
              </li>
              <li>
                <strong>Execute:</strong> Technician carries out the work, following the task
                instructions and method statement
              </li>
              <li>
                <strong>Record:</strong> Findings documented — condition observed, measurements
                taken, work carried out, parts used, anomalies found, time spent
              </li>
              <li>
                <strong>Close:</strong> Work order completed, reviewed by supervisor if required,
                and closed in the CMMS. History updated automatically
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Work order priority classification">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 font-medium text-white">
                      Priority
                    </th>
                    <th className="border border-white/10 px-3 py-2 font-medium text-white">
                      Response time
                    </th>
                    <th className="border border-white/10 px-3 py-2 font-medium text-white">
                      Electrical example
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium text-red-400">
                      P1 — Emergency
                    </td>
                    <td className="border border-white/10 px-3 py-2 text-white">
                      Immediate (within 1-2 hours)
                    </td>
                    <td className="border border-white/10 px-3 py-2 text-white">
                      Total power failure, exposed live conductors, fire alarm system down
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium text-orange-400">
                      P2 — Urgent
                    </td>
                    <td className="border border-white/10 px-3 py-2 text-white">
                      Same day (within 4-8 hours)
                    </td>
                    <td className="border border-white/10 px-3 py-2 text-white">
                      Partial power loss, UPS on battery, emergency lighting fault
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium text-yellow-400">
                      P3 — Routine
                    </td>
                    <td className="border border-white/10 px-3 py-2 text-white">
                      Within 5-10 working days
                    </td>
                    <td className="border border-white/10 px-3 py-2 text-white">
                      Non-critical lighting failure, minor socket fault, cosmetic damage
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium text-green-400">
                      P4 — Planned
                    </td>
                    <td className="border border-white/10 px-3 py-2 text-white">
                      Scheduled as per PPM calendar
                    </td>
                    <td className="border border-white/10 px-3 py-2 text-white">
                      Annual switchboard inspection, quarterly RCD testing, motor greasing
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <CommonMistake
            title="Allowing reactive work to constantly displace planned maintenance"
            whatHappens={
              <>
                When every fault is treated as urgent and PPM tasks are deferred, the maintenance
                programme enters a vicious cycle: deferred PPM leads to more failures, which
                generate more reactive work, which defers more PPM.
              </>
            }
            doInstead={
              <>
                Breaking this cycle requires discipline in prioritisation and ring-fencing planned
                maintenance time.
              </>
            }
          />

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Scheduling techniques</ContentEyebrow>

          <ConceptBlock title="The right work, at the right time, by the right person">
            <p>
              Effective scheduling ensures the right work is done at the right time by the right
              person with the right resources. Poor scheduling wastes labour (technicians waiting
              for parts or access), misses critical maintenance windows and creates frustration for
              both the maintenance team and building occupants.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Calendar-based scheduling">
            <p>
              The simplest approach: tasks are scheduled at fixed intervals (daily, weekly, monthly,
              quarterly, annually). The CMMS automatically generates work orders when the interval
              elapses. Suitable for routine PPM where the interval is well established.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                Monthly: Emergency lighting function test, fire alarm weekly test (if not automated)
              </li>
              <li>Quarterly: RCD testing, generator load test, UPS battery check</li>
              <li>
                Annually: Switchboard thermal survey, motor insulation resistance test, full fire
                alarm service
              </li>
              <li>5-yearly: Electrical Installation Condition Report (EICR)</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Shutdown scheduling">
            <p>
              Some maintenance tasks can only be performed when equipment is de-energised and out of
              service. These tasks must be batched and scheduled into planned shutdown windows.
              Shutdown planning requires careful coordination.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                Identify all tasks requiring shutdown access — do not waste the shutdown on tasks
                that could be done live
              </li>
              <li>
                Estimate task durations and sequence — critical path analysis determines the minimum
                shutdown duration
              </li>
              <li>Pre-stage materials and tools — every minute of shutdown is valuable</li>
              <li>Assign clear responsibilities — who does what, in what order</li>
              <li>
                Plan for contingencies — what if an unexpected fault is found during the shutdown?
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Resource levelling"
            onSite={
              <>
                A well-scheduled maintenance programme balances workload, minimises disruption and
                ensures critical tasks are never deferred. The CMMS is the essential tool for
                achieving this, but it requires accurate data input from technicians to function
                effectively.
              </>
            }
          >
            <p>
              If all quarterly PPM tasks are scheduled for the first week of the quarter, the
              maintenance team will be overwhelmed. Resource levelling spreads the workload evenly
              across the available period. For example, if there are 100 quarterly tasks and a team
              of 5 technicians, the tasks should be distributed across 12-13 weeks, not crammed into
              one week. CMMS systems can automate this distribution based on available labour hours.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Maintenance KPIs and data-driven decisions</ContentEyebrow>

          <ConceptBlock title="Evidence-based rather than anecdotal">
            <p>
              Key Performance Indicators (KPIs) provide objective measurements of maintenance
              effectiveness. Without KPIs, maintenance management is based on assumptions and
              anecdotes. With them, decisions are evidence-based, improvements are measurable, and
              resources can be justified.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 font-medium text-white">KPI</th>
                    <th className="border border-white/10 px-3 py-2 font-medium text-white">
                      Definition
                    </th>
                    <th className="border border-white/10 px-3 py-2 font-medium text-white">
                      Target
                    </th>
                    <th className="border border-white/10 px-3 py-2 font-medium text-white">
                      What it tells you
                    </th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">MTBF</td>
                    <td className="border border-white/10 px-3 py-2">Mean Time Between Failures</td>
                    <td className="border border-white/10 px-3 py-2">Increasing trend</td>
                    <td className="border border-white/10 px-3 py-2">
                      Equipment reliability — higher is better
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">MTTR</td>
                    <td className="border border-white/10 px-3 py-2">Mean Time to Repair</td>
                    <td className="border border-white/10 px-3 py-2">Decreasing trend</td>
                    <td className="border border-white/10 px-3 py-2">
                      Repair efficiency — lower is better
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">Availability</td>
                    <td className="border border-white/10 px-3 py-2">
                      MTBF / (MTBF + MTTR) x 100%
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      &gt;99% for critical assets
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Proportion of time equipment is operational
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">PPM compliance</td>
                    <td className="border border-white/10 px-3 py-2">
                      Tasks completed on time / total scheduled
                    </td>
                    <td className="border border-white/10 px-3 py-2">&gt;90%</td>
                    <td className="border border-white/10 px-3 py-2">
                      Discipline of the maintenance programme
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">
                      Planned/reactive ratio
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Planned hours / total maintenance hours
                    </td>
                    <td className="border border-white/10 px-3 py-2">&gt;80% planned</td>
                    <td className="border border-white/10 px-3 py-2">
                      Maturity of maintenance programme
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">Backlog</td>
                    <td className="border border-white/10 px-3 py-2">
                      Outstanding work orders in weeks of effort
                    </td>
                    <td className="border border-white/10 px-3 py-2">2-4 weeks</td>
                    <td className="border border-white/10 px-3 py-2">
                      Resource adequacy — growing backlog = insufficient resource
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock title="Using data to improve">
            <p>
              Maintenance data from the CMMS enables continuous improvement. If a particular motor
              type shows declining MTBF, the maintenance frequency can be increased or the failure
              mode investigated. If PPM compliance drops in a particular area, resource allocation
              can be adjusted. If certain spare parts are consistently used, stockholding can be
              optimised. The data only has value if it is accurate — which depends on technicians
              recording findings properly.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Trend analysis"
            onSite={
              <>
                The maintenance technician standard requires you to use appropriate data to inform
                maintenance decisions and contribute to continuous improvement. Understanding KPIs
                and being able to explain what they mean is a key competency for your end-point
                assessment.
              </>
            }
          >
            <p>
              Single data points have limited value; trends tell the story. Plotting insulation
              resistance readings over time reveals whether insulation is degrading. Plotting MTBF
              for a group of assets shows whether reliability is improving or declining. Plotting
              PPM compliance month by month shows whether the maintenance programme is under
              control. Always look for the trend, not just the individual reading.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <KeyTakeaways
            title="Work order lifecycle"
            points={[
              'Request — initiate from PPM, reactive or condition alert.',
              'Plan — identify resources, parts and permits.',
              'Schedule — allocate date, time and technician.',
              'Execute — carry out work per task instructions.',
              'Record — document findings, measurements, actions.',
              'Close — complete, review and update history.',
            ]}
          />

          <KeyTakeaways
            title="Key KPI formulae"
            points={[
              'MTBF = total operating time / number of failures.',
              'MTTR = total repair time / number of repairs.',
              'Availability = MTBF / (MTBF + MTTR) x 100%.',
              'PPM compliance = completed on time / total scheduled x 100%.',
              'Target: >90% PPM compliance, >80% planned ratio.',
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
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module4-section1-1')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Prev subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Principles of PPM
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module4-section1-3')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Lubrication, Cleaning and Adjustments
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule4Section1_2;
