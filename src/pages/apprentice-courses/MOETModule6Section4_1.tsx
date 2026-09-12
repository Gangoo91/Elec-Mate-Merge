/**
 * MOET · Module 6 · Section 4 · Subsection 1 — Shift Handover Procedures
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

const TITLE = 'Shift Handover Procedures - MOET Module 6 Section 4.1';
const DESCRIPTION =
  'Shift handover protocols, information transfer, continuity procedures, handover documentation and communication standards for electrical maintenance technicians.';

const quickCheckQuestions = [
  {
    id: 'handover-purpose',
    question: 'What is the primary purpose of a shift handover procedure?',
    options: [
      'To record the hours each technician worked so the shift can be accounted for in payroll',
      'To transfer all safety-critical information, outstanding work and system status to the incoming shift',
      'To allow the outgoing shift to leave site as soon as their contracted hours end',
      'To list the spare parts and consumables used during the shift for stores reordering',
    ],
    correctIndex: 1,
    explanation:
      'Shift handover ensures continuity of safety and operations. The incoming team must know what work is in progress, what hazards are present, what permits are active, what equipment is isolated, and what requires attention. It is not a payroll, stores or clock-off function.',
  },
  {
    id: 'handover-content',
    question: 'A shift handover report should include which of the following?',
    options: [
      'The personal contact details of every member of the outgoing shift team',
      'A summary of the canteen and welfare arrangements for the incoming shift',
      'System status, active permits, outstanding work, safety concerns and follow-up items',
      'The training records and qualifications held by each incoming technician',
    ],
    correctIndex: 2,
    explanation:
      'A comprehensive handover covers current system status, active permits to work, outstanding tasks and their priority, safety hazards and precautions in place, abnormal conditions, equipment status, and any items the incoming shift must act upon.',
  },
  {
    id: 'handover-failure',
    question: 'What is the most common cause of handover-related incidents?',
    options: [
      'The incoming shift arriving a few minutes late for the start of their shift',
      'Incomplete or inaccurate transfer of isolation status and active permit information',
      'The outgoing shift staying slightly beyond the end of their contracted hours',
      'Minor disagreements between shifts about how a routine task should be carried out',
    ],
    correctIndex: 1,
    explanation:
      'HSE investigations consistently identify inadequate handovers as a factor in incidents. The most dangerous failures involve not communicating that equipment is isolated, not transferring active permit information, or not reporting abnormal conditions.',
  },
  {
    id: 'handover-walkround',
    question: 'Why is a joint walk-around considered essential during a shift handover?',
    options: [
      'It physically verifies that conditions on the ground match the handover report',
      'It gives the incoming shift a chance to familiarise themselves with the canteen and welfare facilities',
      'It is a legal requirement under the Working Time Regulations for all shift workers',
      'It allows the outgoing shift to demonstrate the housekeeping standards they maintained',
    ],
    correctIndex: 0,
    explanation:
      'A walk-around bridges the gap between what is reported and what is real. It allows the incoming shift to physically verify isolation points, check barriers and warning signs, confirm alarm panel states, and see any temporary measures first-hand. Discrepancies between the report and reality can be resolved before the handover is signed off.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'A shift handover should be:',
    options: [
      'A quick verbal exchange in passing, with no written record kept',
      'A structured, documented, face-to-face process with a written record',
      'An exchange carried out only when an abnormal condition has occurred',
      'A briefing completed by the incoming shift after the outgoing team leaves',
    ],
    correctAnswer: 1,
    explanation:
      'Handovers must be structured and documented, and carried out face-to-face at the point of work or in the control room. A face-to-face exchange ensures information is clearly communicated and questions can be asked; the written record provides an audit trail.',
  },
  {
    id: 2,
    question: 'During a handover, active permits to work must be:',
    options: [
      'Cancelled by the outgoing shift before they leave site',
      'Left on the noticeboard for the incoming shift to read later',
      'Physically transferred with a face-to-face explanation of their conditions and status',
      'Filed away in the permit register once the work they cover is complete',
    ],
    correctAnswer: 2,
    explanation:
      'Active permits must be physically handed over with a verbal explanation. The incoming shift must understand the permit conditions, what work is in progress, where the isolation points are, and who the permit holder is.',
  },
  {
    id: 3,
    question: 'A handover log should be signed by:',
    options: [
      'The outgoing shift only, as they hold responsibility for the period worked',
      'The incoming shift only, as they are the ones accepting responsibility',
      'The site supervisor, reviewing and signing the log after both shifts have left',
      'Both the outgoing and incoming shift, confirming accurate transfer and understanding',
    ],
    correctAnswer: 3,
    explanation:
      'Both parties sign to confirm the handover was completed. The outgoing signature confirms they communicated accurately; the incoming signature confirms they received and understood the information.',
  },
  {
    id: 4,
    question: 'Which of the following should trigger an enhanced or extended handover?',
    options: [
      'An abnormal condition, active emergency, or significant change in system status',
      'A routine day shift with all systems running normally and no work in progress',
      'A handover where both shifts already know each other and the site well',
      'A short comfort break taken by one of the outgoing technicians mid-shift',
    ],
    correctAnswer: 0,
    explanation:
      'Enhanced handovers are needed when conditions are non-routine: emergencies, abnormal equipment states, active complex work, or any situation where the incoming shift faces unusual risks.',
  },
  {
    id: 5,
    question: 'If a handover is interrupted before completion, the correct action is to:',
    options: [
      'Assume the incoming shift will fill in the gaps themselves',
      'Resume and complete the handover before either party takes on operational responsibility',
      'Hand over what was covered and leave the rest in the log',
      'Treat the handover as complete once the shift change time passes',
    ],
    correctAnswer: 1,
    explanation:
      'An incomplete handover is a safety risk. Both parties must ensure the handover is completed fully. Until the incoming shift has received all critical information, the outgoing shift retains responsibility.',
  },
  {
    id: 6,
    question: 'The SBAR framework for handover communication stands for:',
    options: [
      'Safety, Briefing, Action, Review',
      'Status, Background, Activity, Report',
      'Situation, Background, Assessment, Recommendation',
      'Summary, Briefing, Assessment, Response',
    ],
    correctAnswer: 2,
    explanation:
      'SBAR provides a structured communication format: Situation (what is happening now), Background (context and history), Assessment (what you think the issue is), Recommendation (what action is needed).',
  },
  {
    id: 7,
    question: 'Equipment that has been temporarily isolated during maintenance must be:',
    options: [
      'Re-energised by the outgoing shift before they leave site',
      'Left isolated without recording who holds the locks and keys',
      'Mentioned only if the incoming shift specifically asks about it',
      'Clearly communicated with isolation status, lock-off details and removal conditions',
    ],
    correctAnswer: 3,
    explanation:
      'Isolation status is safety-critical information. The incoming shift must know what is isolated, where the isolation points are, who holds the locks and keys, and whether the isolation should be maintained or removed.',
  },
  {
    id: 8,
    question: "A handover 'walk-around' involves:",
    options: [
      'Both shifts physically visiting key areas together to verify reported conditions',
      'The incoming shift inspecting the site alone once the handover is finished',
      'A review of the handover log entries recorded over the past week',
      'A verbal briefing held entirely within the control room without leaving it',
    ],
    correctAnswer: 0,
    explanation:
      'A walk-around verifies that what is reported in the handover matches reality on the ground. This is particularly important for isolated equipment, active work areas, temporary safety measures, and any abnormal conditions.',
  },
  {
    id: 9,
    question: 'In a 24/7 maintenance operation, the handover log provides:',
    options: [
      'A record of staff attendance kept solely for payroll purposes',
      'A continuous chronological record across all shifts for tracing events and decisions',
      'A live inventory list of the spare parts currently held in the stores',
      'A schedule of planned preventive maintenance tasks and nothing else',
    ],
    correctAnswer: 1,
    explanation:
      'The handover log creates a continuous narrative across shifts. It enables managers to understand what happened, investigators to trace events, and auditors to verify that safety-critical information was communicated.',
  },
  {
    id: 10,
    question: 'Under ST1426, effective handover communication demonstrates:',
    options: [
      'The ability to complete handovers as quickly as possible',
      'Knowledge of the technical specifications of all plant on site',
      'Professional communication skills, attention to safety, and responsibility for ensuring continuity of safe operations',
      'Competence in operating the CMMS software only',
    ],
    correctAnswer: 2,
    explanation:
      'ST1426 requires technicians to demonstrate professional communication and responsibility for safety. Effective handovers show both of these — clear communication of safety-critical information with a sense of personal responsibility for continuity.',
  },
  {
    id: 11,
    question: 'If you disagree with information in the handover, the correct action is to:',
    options: [
      'Accept the handover now and investigate the discrepancy later in the shift',
      'Sign the log as normal but note your disagreement in a separate record',
      'Defer to the outgoing shift, as they were the ones on site at the time',
      'Raise it immediately, verify the facts jointly and resolve it before signing',
    ],
    correctAnswer: 3,
    explanation:
      'Discrepancies must be resolved before the handover is signed off. This may require jointly checking equipment, reviewing logs, or consulting a supervisor. An unresolved discrepancy is a safety risk.',
  },
  {
    id: 12,
    question: 'A good handover takes:',
    options: [
      'As long as necessary to communicate all safety-critical information clearly',
      'Exactly five minutes, regardless of how complex the situation is',
      'As little time as possible to avoid the shift change overrunning',
      'Only as long as the outgoing shift feels like spending on it',
    ],
    correctAnswer: 0,
    explanation:
      'Handovers should be thorough, not rushed, with time for questions and clarification. Complex situations require longer handovers. The goal is clear, accurate communication, not speed. Rushing a handover to save time has contributed to numerous serious incidents.',
  },
];

const faqs = [
  {
    question: 'What if the incoming shift does not arrive on time?',
    answer:
      'The outgoing shift must remain on duty until a proper handover can be completed. Never leave a site unmanned or hand over to someone who has not received the full briefing. Report the late arrival to your supervisor and record it in the handover log.',
  },
  {
    question: 'Should I hand over problems I could not solve?',
    answer:
      'Absolutely. Outstanding problems, partial repairs, temporary measures, and unresolved faults are the most important handover items. Be specific: what you found, what you tried, what worked, what did not, and what the incoming shift needs to do next.',
  },
  {
    question: 'How detailed should a handover log entry be?',
    answer:
      'Detailed enough that someone who was not present can understand the current state of affairs. Include: system status, active work, safety concerns, abnormal conditions, outstanding tasks, and any decisions made. Err on the side of too much detail rather than too little.',
  },
  {
    question: 'Can a handover be done remotely?',
    answer:
      "Face-to-face handovers are always preferred for safety-critical information. Remote handovers (phone, video) may be acceptable for low-risk situations but are not suitable when permits to work are active, equipment is isolated, or abnormal conditions exist. Your organisation's procedures will define when remote handovers are acceptable.",
  },
  {
    question: "What is a 'cold handover' vs a 'hot handover'?",
    answer:
      "A 'hot handover' is the standard face-to-face exchange between shifts. A 'cold handover' occurs when there is a gap between shifts (e.g., weekday to weekend) — the outgoing shift leaves a comprehensive written record for the incoming shift to review. Cold handovers carry higher risk because there is no opportunity for questions, so the written record must be especially thorough.",
  },
];

const MOETModule6Section4_1 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 6 · Section 6.4 · Subsection 1"
        title="Shift Handover Procedures"
        backTo="/study-centre/apprentice/m-o-e-t-module6-section4"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Information transfer, continuity and safety communication between maintenance shifts.
          </p>

          <TLDR
            points={[
              'Purpose: safe transfer of all critical information between shifts.',
              'Content: system status, active permits, outstanding work, hazards.',
              'Method: face-to-face, structured, documented, signed by both parties.',
              'Framework: SBAR — Situation, Background, Assessment, Recommendation.',
              'Isolation status: critical — who is locked off and where.',
              'Active permits: must be physically transferred.',
              'Walk-around: joint verification of conditions.',
              'ST1426: maps to communication and safety KSBs.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Conduct a structured shift handover following organisational procedures',
              'Communicate safety-critical information including isolation and permit status',
              'Complete handover documentation to an auditable standard',
              'Apply the SBAR communication framework to handover situations',
              'Carry out a handover walk-around to verify reported conditions',
              'Recognise the consequences of inadequate handover communication',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Why handovers matter</ContentEyebrow>

          <ConceptBlock title="Why Handovers Matter">
            <p>
              Shift handovers are one of the highest-risk communication events in maintenance
              operations. At the point of handover, safety-critical information must transfer from
              one team to another with complete accuracy. Failures in this transfer have been
              identified as contributing factors in numerous serious incidents across the energy,
              manufacturing and utilities sectors.
            </p>
            <p>
              The Health and Safety Executive (HSE) has published specific guidance on shift
              handovers (HSG256 — &quot;Improving shift handover&quot;) because the evidence is
              clear: the period around shift change is when incidents are most likely to occur. The
              outgoing team is fatigued and focused on finishing; the incoming team has not yet
              established situational awareness. A structured handover procedure closes this
              dangerous gap by ensuring that every piece of safety-critical information is formally
              communicated, documented and acknowledged.
            </p>
          </ConceptBlock>

          <ConceptBlock title="What Must Be Communicated">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>System status:</strong> what is running, what is shut down, what is in alarm
              </li>
              <li>
                <strong>Active permits:</strong> what work is in progress under permit, isolation
                details
              </li>
              <li>
                <strong>Outstanding tasks:</strong> incomplete work, pending repairs, follow-up
                required
              </li>
              <li>
                <strong>Safety hazards:</strong> temporary safety measures, barriers, warning signs
              </li>
              <li>
                <strong>Abnormal conditions:</strong> anything different from normal operation
              </li>
              <li>
                <strong>Upcoming events:</strong> planned shutdowns, deliveries, visitor access
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="The Handover Gap">
            <p>
              The period around shift change is when incidents are most likely to occur. The
              outgoing team is fatigued and focused on finishing; the incoming team has not yet
              established situational awareness. A structured handover procedure closes this
              dangerous gap. Research shows that up to 70% of maintenance-related incidents have
              poor communication as a contributing factor, with handover failures being the most
              frequently cited communication breakdown.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Handover Risks in Electrical Maintenance">
            <p>
              For electrical maintenance specifically, the risks at handover are acute. Equipment
              may be isolated with lock-off devices in place, live working permits may be active,
              temporary earthing may be applied, or circuits may be in a partially re-energised
              state following testing. If any of this information fails to transfer accurately, the
              incoming technician faces the risk of contact with live conductors, energisation of
              equipment under repair, or removal of safety measures that are still required. This is
              not theoretical — it has happened, and the consequences have been fatal.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>The SBAR framework</ContentEyebrow>

          <ConceptBlock title="The SBAR Framework">
            <p>
              SBAR (Situation, Background, Assessment, Recommendation) provides a structured format
              for communicating complex information clearly and concisely. Originally developed in
              healthcare to reduce communication errors, it has been widely adopted in maintenance
              operations because it forces the communicator to organise their thoughts before
              speaking and ensures the receiver gets information in a logical sequence.
            </p>
          </ConceptBlock>

          <ConceptBlock title="SBAR Applied to Maintenance Handover">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Situation:</strong> &quot;Chiller 2 is currently isolated for compressor
                bearing replacement. Permit PTW-2847 is active.&quot;
              </li>
              <li>
                <strong>Background:</strong> &quot;High vibration was detected during Monday&apos;s
                PPM. Bearings were ordered Tuesday, arrived this morning.&quot;
              </li>
              <li>
                <strong>Assessment:</strong> &quot;Bearings have been replaced. Need to run the
                compressor on test for 2 hours before returning to normal service.&quot;
              </li>
              <li>
                <strong>Recommendation:</strong> &quot;Complete the 2-hour test run, check vibration
                readings, then cancel the permit and return Chiller 2 to auto.&quot;
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Why SBAR Works">
            <p>
              The power of SBAR is that it prevents the two most common communication failures in
              handovers: information overload (dumping everything at once without structure) and
              information omission (forgetting critical context). By working through each element in
              sequence, the outgoing technician covers the current state, the history, their
              professional judgement, and what needs to happen next. The incoming technician
              receives a complete, logical picture rather than a disjointed collection of facts.
            </p>
          </ConceptBlock>

          <AppendixTable
            caption="SBAR Applied to an Electrical Fault"
            headers={['SBAR Element', 'Purpose', 'Electrical Example']}
            rows={[
              [
                'Situation',
                'What is happening right now',
                'DB-3 is isolated — feeds lighting circuits L1-L12 in Zone B',
              ],
              [
                'Background',
                'Context and history',
                'Earth fault detected on L7; IR testing traced to damaged cable in ceiling void',
              ],
              [
                'Assessment',
                'Your professional judgement',
                'Cable needs replacing — approximately 15m run, 2.5mm² T&E through void',
              ],
              [
                'Recommendation',
                'What the incoming shift should do',
                'Replace cable run, test, restore supply. Maintain isolation until complete.',
              ],
            ]}
          />

          <ConceptBlock title="Practice SBAR Before You Need It">
            <p>
              SBAR becomes second nature with practice. Start using it for everyday communication —
              when reporting faults to your supervisor, briefing colleagues, or requesting
              materials. The more you practise the structure, the more naturally it will flow during
              the high-pressure environment of a shift handover when multiple items need
              communicating.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Handover documentation</ContentEyebrow>

          <ConceptBlock title="Handover Documentation">
            <p>
              The handover log or report is a critical document. It provides continuity across
              shifts, creates an audit trail of what information was communicated and when, and
              serves as a reference for anyone who needs to understand the state of operations at
              any point in time. In the event of an incident, the handover log will be one of the
              first documents reviewed by investigators.
            </p>
            <p>
              A well-maintained handover log tells a continuous story across shifts. Reading back
              through several days of entries should give any competent person a clear picture of
              what has been happening: what work was planned, what was completed, what problems
              arose, and how they were resolved. Gaps, vague entries, or missing signatures
              undermine this narrative and create risk — both operational and legal.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Handover Log Contents">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Date and time:</strong> of the handover
              </li>
              <li>
                <strong>Personnel:</strong> names of outgoing and incoming team members
              </li>
              <li>
                <strong>System status summary:</strong> current state of all major systems
              </li>
              <li>
                <strong>Active permits:</strong> permit numbers, locations, scope, status
              </li>
              <li>
                <strong>Outstanding work:</strong> tasks in progress, pending, or overdue
              </li>
              <li>
                <strong>Safety items:</strong> isolations, temporary measures, hazards
              </li>
              <li>
                <strong>Actions for incoming:</strong> specific tasks for the next shift
              </li>
              <li>
                <strong>Signatures:</strong> both parties confirming the handover
              </li>
            </ul>
          </ConceptBlock>

          <AppendixTable
            caption="Handover Documentation Types"
            headers={['Document Type', 'Format', 'Retention']}
            rows={[
              [
                'Handover log',
                'Bound book or electronic log',
                'Minimum 3 years (check local policy)',
              ],
              [
                'Permit register',
                'Dedicated permit tracking system',
                'Duration of permit + audit period',
              ],
              [
                'Isolation schedule',
                'Whiteboard, CMMS or printed sheet',
                'Until isolation removed and verified',
              ],
              ['Walk-around checklist', 'Printed or electronic form', 'Filed with handover log'],
            ]}
          />

          <ConceptBlock title="Digital vs Paper Handover Systems">
            <p>
              Digital handover systems are increasingly common, offering advantages such as
              searchability, automatic time-stamping, and integration with the CMMS. However, the
              technology is only as good as the information entered. Whether your organisation uses
              a paper logbook or a digital platform, the principles are identical: be thorough, be
              accurate, be specific, and ensure both parties sign off.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Walk-around verification</ContentEyebrow>

          <ConceptBlock title="Walk-Around Verification">
            <p>
              A handover walk-around physically verifies that conditions on the ground match the
              handover report. This is particularly important for isolated equipment, active work
              areas, and temporary safety measures. It transforms the handover from a purely verbal
              and written exercise into a physical confirmation of reality.
            </p>
            <p>
              The walk-around should be conducted jointly — the outgoing and incoming technicians
              visit key areas together, with the outgoing technician pointing out specific items and
              the incoming technician confirming they can see and understand them. This is not a
              casual stroll; it is a structured verification exercise that should follow a
              consistent route covering all areas where work has been carried out, equipment is
              isolated, or conditions are abnormal.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Walk-Around Checklist">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Verify isolation points — locks in place, caution notices displayed</li>
              <li>Check active work areas — barriers, warning signs, housekeeping</li>
              <li>Inspect temporary measures — temporary earths, safety barriers, scaffolding</li>
              <li>Review alarm panels — confirm reported alarm states match actual</li>
              <li>Check critical equipment — running status matches handover report</li>
              <li>Verify tools and materials — confirm location of equipment left in work areas</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="When to Extend the Walk-Around">
            <p>
              Standard walk-arounds cover routine areas, but certain conditions require a more
              thorough physical inspection:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Multiple isolations active:</strong> visit every isolation point and verify
                lock-off details
              </li>
              <li>
                <strong>Live working in progress:</strong> verify barriers, supervision
                arrangements, and rescue equipment
              </li>
              <li>
                <strong>Post-incident:</strong> review any areas affected by the incident, confirm
                temporary measures
              </li>
              <li>
                <strong>Contractor presence:</strong> verify contractor work areas, permits, and
                interface points
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="ST1426 Link">
            <p>
              The walk-around demonstrates the professional behaviour of verifying information
              rather than accepting it at face value — a critical safety habit for maintenance
              technicians. In your EPA, discussing how you use walk-arounds to confirm handover
              information shows genuine safety awareness.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>Building effective handover habits</ContentEyebrow>

          <ConceptBlock title="Building Effective Handover Habits">
            <p>
              Effective handovers are not just about following a procedure — they are about
              developing a professional mindset of responsibility and care. The best maintenance
              technicians treat handovers with the same seriousness as any other safety-critical
              task because they understand that the information they transfer directly affects the
              safety of their colleagues.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Handover Best Practices">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Prepare in advance:</strong> start writing your handover notes 30 minutes
                before the end of shift, not at the last minute
              </li>
              <li>
                <strong>Use a consistent format:</strong> follow the SBAR structure for every item
                to ensure nothing is missed
              </li>
              <li>
                <strong>Prioritise safety items:</strong> cover isolations, permits and hazards
                first — before routine operational items
              </li>
              <li>
                <strong>Encourage questions:</strong> create an environment where the incoming team
                feels comfortable asking for clarification
              </li>
              <li>
                <strong>Never rush:</strong> if the handover is not complete, it is not complete —
                do not sign off until you are satisfied
              </li>
              <li>
                <strong>Read back critical items:</strong> ask the incoming technician to repeat
                back isolation details and permit conditions
              </li>
            </ul>
          </ConceptBlock>

          <AppendixTable
            caption="Common Handover Failures"
            headers={['Common Handover Failure', 'Consequence', 'Prevention']}
            rows={[
              [
                'Rushing the handover',
                'Critical information omitted',
                'Allocate adequate time, use a checklist',
              ],
              [
                'Verbal-only handover',
                'No audit trail, details forgotten',
                'Always produce a written record',
              ],
              [
                'Skipping the walk-around',
                'Report does not match reality',
                'Make walk-around mandatory in procedure',
              ],
              [
                'Assuming knowledge',
                'Incoming team unaware of changes',
                'Brief as if the incoming team knows nothing',
              ],
              [
                'Not flagging abnormal states',
                'Incoming team operates under false assumptions',
                'Highlight deviations from normal prominently',
              ],
            ]}
          />

          <ConceptBlock title="The Responsibility Does Not End at Sign-Off">
            <p>
              If you realise after leaving site that you forgot to communicate something important,
              contact the incoming shift immediately — by phone if necessary. A late notification is
              far better than no notification. Record that the additional information was
              communicated and add a supplementary entry to the handover log at your next
              opportunity.
            </p>
          </ConceptBlock>

          <ConceptBlock title="EPA Preparation">
            <p>
              In the professional discussion, you may be asked about a time when you had to
              communicate safety-critical information. Describing a well-conducted shift handover —
              using SBAR, completing the walk-around, and ensuring the incoming team understood the
              situation — demonstrates the communication skills, safety awareness and professional
              responsibility that assessors are looking for.
            </p>
          </ConceptBlock>

          <SectionRule />

          <Scenario
            title="A handover that left a machine isolated and nobody knowing"

            situation={
              <>
                <p>
                  You isolate a dryer at the end of a shift to await a spare part, lock it off and
                  tag it. The handover is verbal and rushed because the next shift arrives late.
                </p>

                <p>
                  At 02:00 production try to run the dryer, find it dead, and spend two hours
                  fault-finding a machine that is working perfectly.
                </p>
              </>
            }

            whatToDo={
              <>
                <p>
                  Put the isolation in the written handover, not just the conversation. Which
                  machine, which isolator, which lock, why, and what is needed before it comes back.
                </p>

                <p>
                  Say what the plant should do in the meantime. "Dryer 2 is isolated awaiting a fan
                  bearing, do not attempt to run" is actionable; "dryer 2 is down" is not.
                </p>

                <p>
                  Name who holds the key and how to reach them. A locked-off isolation with an
                  unreachable keyholder is its own problem, especially overnight.
                </p>

                <p>
                  Check the receiving shift has actually read it. A handover that is written but not
                  acknowledged fails in the same way a verbal one does.
                </p>
              </>
            }

            whyItMatters={
              <p>
                Two hours of night-shift fault-finding on a healthy machine is the visible cost. The
                invisible one is worse: if someone had concluded the isolator was faulty and removed
                the lock to prove it, they would have energised a machine with its fan bearing out
                and someone possibly working on it. Handover is a safety document as much as an
                operational one, which is why LOTO procedures treat shift change as a controlled
                transfer rather than a conversation.
              </p>
            }
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'SBAR framework: Situation (what is happening now), Background (context and history), Assessment (your professional judgement), Recommendation (what to do next).',
              'Handover content: system status and alarm states, active permits and isolation details, outstanding tasks and priorities, safety hazards and temporary measures, actions required by incoming shift.',
              'Walk-around checks: isolation points (locks, notices), active work areas (barriers, signs), temporary safety measures in place, alarm panels matching reported states, equipment running status confirmed.',
              'Key principles: face-to-face, structured, documented; both parties sign to confirm; safety items communicated first; never rush — thoroughness over speed.',
              'HSE guidance: HSG256 — Improving shift handover.',
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
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module6-section4')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Back to section
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Handovers and stakeholder communication
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module6-section4-2')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Communicating with Supervisors and Engineers
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule6Section4_1;
