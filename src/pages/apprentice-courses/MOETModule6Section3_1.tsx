/**
 * MOET · Module 6 · Section 3 · Subsection 1 — Recording Work Completed
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
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
  AppendixTable,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Recording Work Completed - MOET Module 6 Section 3.1';
const DESCRIPTION =
  'Comprehensive guide to recording completed maintenance work: logbook entries, CMMS documentation, work order completion, asset history records and compliance with ST1426 requirements for electrical maintenance technicians.';

const quickCheckQuestions = [
  {
    id: 'logbook-purpose',
    question: 'What is the primary purpose of maintaining a maintenance logbook?',
    options: [
      'To calculate the labour cost of each maintenance task for invoicing',
      'To list the spare parts held in the stores for stock control purposes',
      'To record the training certificates held by each maintenance technician',
      'To provide a chronological, auditable record of all maintenance activities on an asset',
    ],
    correctIndex: 3,
    explanation:
      'A maintenance logbook provides a chronological, auditable record of all maintenance activities carried out on an asset or system. It enables trend analysis, supports compliance audits, and ensures continuity when different technicians work on the same equipment.',
  },
  {
    id: 'cmms-entry',
    question: 'When completing a CMMS work order, which detail is most critical to include?',
    options: [
      'A clear description of what was found, what was done, and what parts were used',
      'The personal opinion of the technician on the quality of the original installation',
      'The make and model of every tool carried in the technician’s van',
      'The weather conditions on site during the period the work was carried out',
    ],
    correctIndex: 0,
    explanation:
      'A CMMS work order must clearly describe the fault or condition found, the corrective action taken, and any parts or materials used. This information supports asset history, future fault diagnosis, spare parts planning, and regulatory compliance.',
  },
  {
    id: 'work-order-status',
    question:
      'What should you do if you cannot fully complete a maintenance task during your shift?',
    options: [
      'Close the work order and raise a new one only if the fault recurs later',
      'Delete the work order so it does not appear as overdue on the system',
      'Leave the work order open, record what was completed, and note outstanding actions for handover',
      'Mark the work order complete and finish the remaining work informally next visit',
    ],
    correctIndex: 2,
    explanation:
      'If a task cannot be completed, the work order must remain open with a clear record of what has been done and what remains. This information must be communicated during shift handover to ensure continuity and prevent safety gaps.',
  },
  {
    id: 'asset-history',
    question: 'Why is accurate asset history recording important for maintenance planning?',
    options: [
      'It removes the need to carry out any further inspections on the asset',
      'It allows the manufacturer to extend the equipment warranty indefinitely',
      'It enables trend analysis, supports condition-based maintenance decisions and justifies capital expenditure',
      'It guarantees that the asset will never fail during its working life',
    ],
    correctIndex: 2,
    explanation:
      'Accurate asset history enables maintenance planners to identify recurring faults, track equipment degradation trends, make evidence-based decisions about repair versus replacement, and justify capital expenditure for ageing assets. It is fundamental to effective maintenance management.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'A maintenance logbook entry should include:',
    options: [
      'Only the date and the name of the technician who attended',
      "Date, time, asset identification, work performed, findings, parts used, and the technician's signature",
      'A general note that the equipment was checked, with no further detail',
      'The cost of the parts used and nothing else about the work done',
    ],
    correctAnswer: 1,
    explanation:
      "A complete logbook entry must include the date and time, clear asset identification, a description of the work performed, any findings or anomalies, parts and materials used, and the technician's signature. This creates a complete, auditable record.",
  },
  {
    id: 2,
    question: 'CMMS stands for:',
    options: [
      'Complete Maintenance Monitoring Service',
      'Central Maintenance Management Software',
      'Computerised Maintenance Management System',
      'Certified Maintenance Method Statement',
    ],
    correctAnswer: 2,
    explanation:
      "CMMS stands for Computerised Maintenance Management System. It is a software platform used to plan, track, and record maintenance activities across an organisation's assets. Common examples include SAP PM, Maximo, Fiix, and Maintenance Connection.",
  },
  {
    id: 3,
    question: 'When recording a fault repair in a CMMS, you should:',
    options: [
      'Record only that the equipment is now working again',
      'Record the name of the supplier who provided the replacement part only',
      'Record the time the callout was received but not what was done',
      'Record the symptom, root cause identified, corrective action taken, parts used, and time spent',
    ],
    correctAnswer: 3,
    explanation:
      'A complete fault repair record includes the symptom reported, the root cause identified through diagnosis, the corrective action taken, any parts or materials used, and the time spent. Recording this promptly ensures accuracy and supports future fault diagnosis on similar equipment.',
  },
  {
    id: 4,
    question: 'Which of the following is a consequence of poor work recording?',
    options: [
      'Loss of asset history, repeated faults, compliance failures and increased downtime',
      'Faster fault diagnosis because technicians rely on memory instead',
      'Reduced spare parts holding because usage is no longer tracked unnecessarily',
      'Improved audit results because there is less paperwork to review',
    ],
    correctAnswer: 0,
    explanation:
      'Poor work recording leads to incomplete asset histories, inability to identify recurring faults, compliance failures during audits, unnecessary repeat work, and ultimately increased equipment downtime. It undermines the entire maintenance management strategy.',
  },
  {
    id: 5,
    question: 'A work order typically progresses through which status sequence?',
    options: [
      'Closed, completed, scheduled, planned, in progress',
      'Planned, scheduled, in progress, completed, closed',
      'In progress, planned, closed, scheduled, completed',
      'Scheduled, closed, planned, completed, in progress',
    ],
    correctAnswer: 1,
    explanation:
      'A typical work order lifecycle follows: planned (identified and approved), scheduled (assigned a date/time and resources), in progress (work underway), completed (work finished, awaiting review), and closed (reviewed, approved and archived). Each status change should be recorded with a timestamp.',
  },
  {
    id: 6,
    question: 'Under ST1426, maintenance technicians must demonstrate they can:',
    options: [
      'Design new electrical installations from first principles without supervision',
      'Manage the entire maintenance budget for the organisation',
      'Accurately record and report on maintenance activities using appropriate systems and documentation',
      'Write the company maintenance policy and approve other technicians’ work',
    ],
    correctAnswer: 2,
    explanation:
      'The ST1426 standard requires maintenance technicians to accurately record and report on maintenance activities. This includes using both paper and digital systems, completing work orders, updating asset records, and producing clear, accurate documentation of all work performed.',
  },
  {
    id: 7,
    question: 'When recording preventive maintenance in a logbook, you should note:',
    options: [
      'Only the date the next preventive visit is due',
      'Only confirmation that the planned task was carried out',
      'Only the name of the technician who completed the schedule',
      'Inspection findings, measurements taken, condition assessments, any defects found, and recommended follow-up actions',
    ],
    correctAnswer: 3,
    explanation:
      'Preventive maintenance records must include inspection findings, any measurements or test results, condition assessments (e.g., wear, corrosion, overheating), defects identified, and recommended follow-up actions. These records are essential for tracking equipment condition over time.',
  },
  {
    id: 8,
    question: 'Asset identification in maintenance records should use:',
    options: [
      'Unique asset numbers, equipment tags, or location codes from the asset register',
      'An informal description such as "the big motor in the corner"',
      'The name of the manufacturer and the year the equipment was made',
      'The colour of the enclosure and its approximate position in the room',
    ],
    correctAnswer: 0,
    explanation:
      "Maintenance records must use unique, unambiguous asset identification such as asset numbers, equipment tag numbers, or standardised location codes from the organisation's asset register. Informal descriptions create confusion and risk work being carried out on the wrong equipment.",
  },
  {
    id: 9,
    question: 'How soon after completing a maintenance task should the work record be updated?',
    options: [
      'At the next scheduled audit, whenever that takes place',
      'As soon as reasonably practicable, ideally before leaving the work area or completing the shift',
      'Only if a fault is later reported on the same equipment',
      'At the end of the month when all records are written up together',
    ],
    correctAnswer: 1,
    explanation:
      'Work records should be updated as soon as reasonably practicable after task completion — ideally before leaving the work area or at least before the end of the shift. Delayed recording leads to inaccuracies, forgotten details, and incomplete records.',
  },
  {
    id: 10,
    question:
      "Which information helps future technicians most when recorded in an asset's maintenance history?",
    options: [
      'The total time the asset has been in service since installation',
      'The name of the supervisor who approved the original work order',
      'Specific fault symptoms, diagnostic steps taken, root cause found, and the successful repair method',
      'The purchase price of the asset and its current book value',
    ],
    correctAnswer: 2,
    explanation:
      'Detailed fault symptoms, the diagnostic approach used, the root cause identified, and the successful repair method provide invaluable information for future technicians facing similar issues. This institutional knowledge significantly reduces future diagnostic time and prevents repeated trial-and-error approaches.',
  },
  {
    id: 11,
    question: 'A closed-loop work order system means:',
    options: [
      'Work orders are issued only for emergency breakdowns, never planned work',
      'Work orders are closed automatically after a fixed period whether done or not',
      'Work orders are kept on a separate isolated network for security',
      'Every work order is tracked from creation through completion and formal close-out with verification',
    ],
    correctAnswer: 3,
    explanation:
      'A closed-loop work order system tracks every work order from initial creation through scheduling, execution, completion, and formal close-out. Close-out typically includes supervisor review and verification that the work meets the required standard. This ensures no tasks fall through the cracks.',
  },
  {
    id: 12,
    question: 'BS 7671 requires that records of electrical installations are:',
    options: [
      'Maintained, updated, and made available for inspection throughout the life of the installation',
      'Destroyed once the installation has been energised and handed over',
      'Held only by the original designer and not shared with the duty holder',
      'Replaced entirely each time a periodic inspection is carried out',
    ],
    correctAnswer: 0,
    explanation:
      'BS 7671 (Regulation 132.13) requires that records of every electrical installation, including as-built drawings and maintenance records, are maintained, updated, and made available for inspection. This applies throughout the life of the installation and supports safe maintenance and future modifications.',
  },
];

const faqs = [
  {
    question: 'Do I need to record routine visual inspections?',
    answer:
      "Yes. Even routine visual inspections should be recorded, noting the date, what was inspected, and the condition found. If everything was satisfactory, record 'no defects observed'. This creates evidence that inspections were carried out and establishes a baseline for future comparison. Under BS 7671 and EAWR 1989, a lack of documented evidence of inspection is treated the same as no inspection at all during enforcement action.",
  },
  {
    question: 'What if the CMMS is unavailable — should I still record my work?',
    answer:
      'Absolutely. If the CMMS is temporarily unavailable, use a paper-based backup method such as a logbook, work completion form, or even a clear handwritten note. Transfer this information to the CMMS as soon as the system is available. Never leave work unrecorded because the digital system is down.',
  },
  {
    question: 'How detailed should a maintenance record be?',
    answer:
      "A good maintenance record should enable another competent technician to understand exactly what was found and what was done without needing to contact you. Include specific measurements, part numbers, and any deviations from the standard procedure. Avoid vague terms like 'checked and OK' — instead, state what was checked and what the readings or findings were.",
  },
  {
    question: 'Who owns the maintenance records?',
    answer:
      "Maintenance records are typically owned by the asset owner or duty holder — the organisation responsible for the equipment. As a technician, you create the records, but they become part of the organisation's asset management system. They must be retained for the periods specified by regulatory requirements (typically a minimum of 5 years for electrical inspection records under BS 7671).",
  },
  {
    question: 'Can maintenance records be used as legal evidence?',
    answer:
      "Yes. Maintenance records can be used as evidence in legal proceedings, HSE investigations, insurance claims, and employment tribunals. They may demonstrate compliance with statutory duties or, conversely, may reveal failures in maintenance management. This is why accuracy, completeness, and honesty in recording are essential — never falsify or 'improve' records after the event.",
  },
];

const MOETModule6Section3_1 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 6 · Section 6.3 · Subsection 1"
        title="Recording Work Completed"
        backTo="/study-centre/apprentice/m-o-e-t-module6-section3"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Logbooks, CMMS entries and asset history documentation for electrical maintenance.
          </p>

          <TLDR
            points={[
              'Logbooks: chronological record of all maintenance activities on an asset.',
              'CMMS: computerised system for planning, tracking and recording maintenance.',
              'Work orders: planned, scheduled, in progress, completed, closed.',
              'Compliance: BS 7671 Reg 132.13 requires maintained records.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Explain the purpose and importance of accurate maintenance work recording',
              'Complete logbook entries with all required information fields',
              'Use CMMS systems to create, update and close work orders',
              'Record asset history data that supports future maintenance decisions',
              'Apply BS 7671 and ST1426 requirements for maintenance documentation',
              'Identify the consequences of poor or incomplete work recording',
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock title="Electrical maintenance context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Asset identification:</strong> Unique asset numbers and equipment tags.
              </li>
              <li>
                <strong>Fault records:</strong> Symptom, root cause, corrective action, parts used.
              </li>
              <li>
                <strong>Test results:</strong> Insulation resistance, continuity, RCD trip times.
              </li>
              <li>
                <strong>ST1426:</strong> Maps to documentation and reporting KSBs.
              </li>
            </ul>
          </ConceptBlock>

          <ContentEyebrow>Why Recording Work Matters</ContentEyebrow>

          <ConceptBlock title="Why Recording Work Matters">
            <p>
              Every maintenance task you complete generates information that has value far beyond
              the immediate job. Accurate, timely recording of completed work creates the
              institutional knowledge that drives effective maintenance management. Without proper
              records, organisations lose visibility of their asset condition, cannot identify
              recurring problems, and struggle to demonstrate compliance with statutory
              requirements.
            </p>
            <p>
              In electrical maintenance, the consequences of poor recording can be severe. Consider
              a scenario where a motor control centre experiences intermittent overheating. If the
              first technician records only "checked and OK" with no measurements, the next
              technician attending a repeat callout has no baseline for comparison. If temperatures
              are recorded each time, a clear deterioration trend becomes visible — enabling
              proactive intervention before a catastrophic failure.
            </p>
          </ConceptBlock>

          <ConceptBlock title="The Value of Good Records">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Safety:</strong> Records of isolation, testing and commissioning protect
                both the technician and future workers on the same equipment.
              </li>
              <li>
                <strong>Continuity:</strong> When shifts change or technicians move on, records
                ensure knowledge is retained.
              </li>
              <li>
                <strong>Compliance:</strong> EAWR 1989, BS 7671 and PUWER 1998 all require evidence
                of proper maintenance.
              </li>
              <li>
                <strong>Cost control:</strong> Accurate records of parts used, time spent and
                recurring faults support budgeting and procurement.
              </li>
              <li>
                <strong>Legal protection:</strong> In the event of an incident, records demonstrate
                that maintenance was carried out competently.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Real-World Consequence">
            <p>
              In HSE prosecutions following workplace electrical incidents, one of the first
              documents requested is the maintenance record. Organisations that cannot produce
              complete, accurate maintenance records face significantly harsher penalties. The
              absence of records is treated as evidence that maintenance was not carried out — even
              if it was. The legal principle is clear: if it is not recorded, it did not happen.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Maintenance Logbooks</ContentEyebrow>

          <ConceptBlock title="Maintenance Logbooks">
            <p>
              A maintenance logbook is a chronological record of all maintenance activities carried
              out on an asset, system, or within a defined area (such as a switchroom or
              substation). Logbooks can be paper-based or digital, but the principle is the same:
              every intervention is recorded with sufficient detail for another competent person to
              understand what was done.
            </p>
          </ConceptBlock>

          <ConceptBlock title="What to Record in a Logbook Entry">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Date and time:</strong> When the work was carried out (start and finish
                times for longer tasks).
              </li>
              <li>
                <strong>Asset identification:</strong> Unique asset number, equipment tag, or
                circuit reference.
              </li>
              <li>
                <strong>Type of maintenance:</strong> Planned preventive, corrective, emergency,
                modification, or inspection.
              </li>
              <li>
                <strong>Description of work:</strong> Clear, factual account of what was done.
              </li>
              <li>
                <strong>Findings:</strong> What was observed, including measurements, test results
                and condition assessments.
              </li>
              <li>
                <strong>Parts and materials:</strong> Specific items used, including part numbers
                and quantities.
              </li>
              <li>
                <strong>Outstanding actions:</strong> Any follow-up work required, with priority
                indication.
              </li>
              <li>
                <strong>Technician identification:</strong> Name, signature, and employee/contractor
                number.
              </li>
            </ul>
          </ConceptBlock>

          <AppendixTable
            caption="Example Logbook Entry — Good vs Poor"
            headers={['Aspect', 'Poor Entry', 'Good Entry']}
            rows={[
              [
                'Description',
                '"Checked motor. OK."',
                '"PM inspection on AHU-3 supply fan motor (Asset M-0147). IR test phase-to-earth: L1=185 MΩ, L2=192 MΩ, L3=178 MΩ at 500 V. Bearings — no excess vibration or noise. Terminal connections tight. Condition: satisfactory."',
              ],
              [
                'Value',
                'No baseline, no evidence, no traceability',
                'Clear baseline readings, specific asset ID, enables trend comparison',
              ],
            ]}
          />

          <ConceptBlock title="Recording promptly">
            <p>
              <strong>Key point:</strong> Logbook entries should be made as soon as practicable
              after completing the work. Waiting until the end of the shift or the following day
              leads to forgotten details and inaccurate records. If working in a clean area where
              paper is impractical, note key details on your phone or a pocket notebook and transfer
              them promptly.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>CMMS Work Order Management</ContentEyebrow>

          <ConceptBlock title="CMMS Work Order Management">
            <p>
              A Computerised Maintenance Management System (CMMS) is the central platform for
              planning, scheduling, tracking and recording maintenance activities across an
              organisation. As a maintenance technician, you will interact with the CMMS daily —
              receiving work orders, updating task progress, recording findings, and closing
              completed jobs.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Work Order Lifecycle">
            <ol className="list-decimal space-y-2 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Planned.</strong> Work identified and approved — resources, parts and
                procedures defined.
              </li>
              <li>
                <strong>Scheduled.</strong> Assigned to a specific date, shift, and technician.
              </li>
              <li>
                <strong>In Progress.</strong> Technician has started the work — status updated in
                real time.
              </li>
              <li>
                <strong>Completed.</strong> Work finished, findings recorded, awaiting supervisor
                review.
              </li>
              <li>
                <strong>Closed.</strong> Reviewed, approved and archived — becomes part of the asset
                history.
              </li>
            </ol>
          </ConceptBlock>

          <AppendixTable
            caption="Common CMMS Platforms"
            headers={['Platform', 'Typical Sector', 'Key Features']}
            rows={[
              [
                'SAP PM',
                'Large industrial, manufacturing',
                'Enterprise integration, asset hierarchy, cost tracking',
              ],
              [
                'IBM Maximo',
                'Utilities, transport, healthcare',
                'Asset lifecycle management, spatial tracking',
              ],
              [
                'Fiix / eMaint',
                'SMEs, facilities management',
                'Cloud-based, mobile-friendly, quick deployment',
              ],
              [
                'Planon / Concept',
                'Commercial property, FM',
                'Integrated workplace management, BIM integration',
              ],
            ]}
          />

          <ConceptBlock title="The same principles, whatever the system">
            <p>
              <strong>Tip:</strong> Regardless of which CMMS your employer uses, the principles of
              good work recording are the same. Focus on capturing complete, accurate information —
              the specific fields and screens will vary between systems, but the data requirements
              are universal.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Asset History and Trend Analysis</ContentEyebrow>

          <ConceptBlock title="Asset History and Trend Analysis">
            <p>
              Every work order you complete and every logbook entry you make contributes to the
              asset's maintenance history. Over time, this history becomes the most valuable dataset
              in the maintenance management system. It reveals patterns, predicts failures, and
              informs decisions about repair, refurbishment, or replacement.
            </p>
          </ConceptBlock>

          <ConceptBlock title="What Asset History Reveals">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Recurring fault patterns indicating underlying issues.</li>
              <li>Deterioration trends in test results over time.</li>
              <li>Mean time between failures (MTBF) for reliability analysis.</li>
              <li>Total cost of ownership to support replace-vs-repair decisions.</li>
              <li>Effectiveness of preventive maintenance programmes.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Electrical Maintenance Examples">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Declining insulation resistance readings on a motor over 3 years.</li>
              <li>Repeated contactor failures on a specific production line.</li>
              <li>Increasing RCD trip times approaching the 300 ms limit.</li>
              <li>Thermal imaging trend showing rising connection temperatures.</li>
              <li>Transformer oil analysis showing progressive moisture ingress.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Recording Test Results for Trend Analysis">
            <p>
              When recording electrical test results, always include the specific values — not just
              pass/fail. A pass today might be a marginal result that indicates an asset heading
              towards failure.
            </p>
          </ConceptBlock>

          <AppendixTable
            caption="Recording Test Results for Trend Analysis"
            headers={['Test', 'Record This', 'Not Just This']}
            rows={[
              ['Insulation resistance', '"IR L1-E: 45 MΩ at 500 V DC"', '"IR test: pass"'],
              ['RCD trip time', '"30 mA RCD trip: 28 ms at I∆n"', '"RCD: OK"'],
              [
                'Earth fault loop impedance',
                '"Zs: 0.82 Ω (max permitted 1.09 Ω)"',
                '"Zs: satisfactory"',
              ],
            ]}
          />

          <ConceptBlock title="Supporting your EPA evidence">
            <p>
              <strong>ST1426 link:</strong> The maintenance technician standard specifically
              requires you to demonstrate the ability to record maintenance activities accurately
              and use records to support maintenance planning. Your ability to create clear, useful
              asset history records directly supports your EPA evidence.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>Regulatory Requirements and Best Practice</ContentEyebrow>

          <ConceptBlock title="Regulatory Requirements and Best Practice">
            <p>
              Maintenance recording is not optional — it is a statutory and regulatory requirement
              underpinned by multiple pieces of legislation and industry standards. Understanding
              these requirements ensures your records meet the standard expected during audits,
              inspections, and investigations.
            </p>
          </ConceptBlock>

          <AppendixTable
            caption="Regulatory Requirements and Best Practice"
            headers={['Regulation / Standard', 'Recording Requirement']}
            rows={[
              [
                'EAWR 1989 Reg 4(2)',
                'Systems must be maintained to prevent danger — records demonstrate compliance',
              ],
              ['BS 7671 Reg 132.13', 'Records including diagrams shall be maintained and updated'],
              [
                'PUWER 1998 Reg 5',
                'Work equipment must be maintained — maintenance log to be kept up to date',
              ],
              [
                'HASAWA 1974 s.2',
                'General duty to ensure safe systems of work — records provide evidence',
              ],
              ['ST1426', 'Technicians must accurately record and report maintenance activities'],
            ]}
          />

          <ConceptBlock title="Best Practice Summary">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Record promptly:</strong> Complete records as soon as practicable after the
                work.
              </li>
              <li>
                <strong>Be specific:</strong> Use asset numbers, measurements, and precise
                descriptions.
              </li>
              <li>
                <strong>Be honest:</strong> Record what you actually found and did — never embellish
                or falsify.
              </li>
              <li>
                <strong>Include negatives:</strong> Record findings even when no defect was found —
                this is still valuable data.
              </li>
              <li>
                <strong>Flag follow-ups:</strong> Clearly identify any outstanding actions with
                priority and recommended timescale.
              </li>
              <li>
                <strong>Use the system:</strong> Enter data into the CMMS rather than relying on
                personal notes.
              </li>
              <li>
                <strong>Sign your work:</strong> Take ownership of your records with clear
                identification.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            points={[
              'Work order lifecycle: Planned — work identified and approved.',
              'Scheduled — assigned date, time and technician.',
              'In Progress — work underway.',
              'Completed — work done, awaiting review.',
              'Closed — reviewed, approved, archived.',
              'EAWR 1989 — Reg 4(2) maintenance duty.',
              'BS 7671 — Reg 132.13 record keeping.',
              'PUWER 1998 — Reg 5 maintenance records.',
              'HASAWA 1974 — s.2 general duty.',
              'ST1426 — Documentation and reporting KSBs.',
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
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module6-section3')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Back to section
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Maintenance records and reporting
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module6-section3-2')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Fault Reports and Corrective Actions
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule6Section3_1;
