import { Users } from 'lucide-react';
import FireAlarmModule5SectionTemplate from './FireAlarmModule5SectionTemplate';
import type { QuizQuestion } from '@/types/quiz';

const quiz: QuizQuestion[] = [
  { id: 1, question: 'Customer witness testing should be conducted:', options: ['Without a plan', 'Against pre-agreed scripts tied to C&E', 'Randomly', 'By email only'], correctAnswer: 1, explanation: 'Use agreed test scripts mapped to the C&E for structured witnessing.' },
  { id: 2, question: 'Who should be present during witness testing where interfaces are involved?', options: ['Anyone', 'Relevant stakeholders (e.g., FM, HVAC, lifts) with permits/isolations', 'Only security', 'No one'], correctAnswer: 1, explanation: 'Coordinate stakeholders to safely test interfaces.' },
  { id: 3, question: 'Acceptance requires:', options: ['Verbal “ok”', 'Signed witness sheets and completion certificates', 'A phone call', 'Tea and biscuits'], correctAnswer: 1, explanation: 'Formal sign-off requires signed documentation.' },
  { id: 4, question: 'Demonstrations should cover:', options: ['Only alarms', 'Normal, fault, disablement, test, and alarm states', 'Only silence button', 'Nothing'], correctAnswer: 1, explanation: 'Show system operation across modes to the Responsible Person.' },
  { id: 5, question: 'Training records should include:', options: ['First names only', 'Attendees, date, scope, and trainer signature', 'No details', 'Snacks provided'], correctAnswer: 1, explanation: 'Maintain clear training evidence for handover.' },
  { id: 6, question: 'Post-acceptance, the client should receive:', options: ['No documents', 'O&M manuals, configuration backup, and contact for maintenance', 'A calendar', 'Unverified copy'], correctAnswer: 1, explanation: 'Provide full documentation and panel configuration backup.' },
  { id: 7, question: 'Any outstanding snags at sign-off should be:', options: ['Ignored', 'Listed with target close-out dates and responsibility', 'Kept secret', 'Deleted'], correctAnswer: 1, explanation: 'Manage outstanding items transparently with timelines.' },
  { id: 8, question: 'Fire drill/evacuation integration should be:', options: ['Not discussed', 'Agreed with the Responsible Person and documented', 'Left for later', 'Random'], correctAnswer: 1, explanation: 'Align with site procedures and document agreements.' },
  { id: 9, question: 'What confirms event log integrity for handover?', options: ['Random entries', 'Correct panel time/date and test records', 'Colour theme', 'Screensaver'], correctAnswer: 1, explanation: 'Accurate timestamps and logs support traceability.' },
  { id: 10, question: 'Final sign-off is typically by:', options: ['Unknown person', 'Client’s Responsible Person or appointed representative', 'Local shop', 'Any passer-by'], correctAnswer: 1, explanation: 'Formal acceptance is by the Responsible Person or appointed rep.' }
];

const FireAlarmModule5Section6 = () => (
  <FireAlarmModule5SectionTemplate
    icon={Users}
    sectionNumber="6"
    title="Customer Witness Testing & Sign-Off"
    description="Customer demonstration and acceptance procedures"
    badges={["Handover", "Training"]}
    intro="Structured witness testing ensures the installed system meets the agreed C&E and the client understands its operation. Expanded content covers pre-witness planning, safety, scripted tests, evidence capture, training, acceptance and aftercare."
    learnings={[
      "Prepare and agree test scripts mapped to C&E with stakeholders",
      "Coordinate permits/isolations and safety considerations",
      "Capture signatures, photos and configuration backups",
      "Provide training and record attendees and scope",
      "Manage outstanding items transparently to close-out",
      "Demonstrate scenario-based operation across all modes",
      "Agree evacuation/rollback procedures and fire drill integration",
      "Define post-handover support, contacts and response SLAs",
      "Communicate alarm routing/ARC arrangements and temporary disablements",
      "Assess training effectiveness and plan refresher sessions",
    ]}
    blocks={[
      { heading: "Pre-witness Planning", points: [
        "Hold readiness review; confirm drawings, C&E and records up to date",
        "Agree scenarios and sequence with the Responsible Person",
        "Plan isolations and stakeholder attendance for interfaces",
      ]},
      { heading: "Scripted Live Tests", points: [
        "Demonstrate normal, fault, disablement, test and alarm states",
        "Verify all inputs/outputs per script and record results",
        "Capture photos and panel logs with correct date/time",
      ]},
      { heading: "Safety & Risk Controls", points: [
        "Permit-to-work, alarms routing paused, and fire wardens in place",
        "Interface isolations (HVAC/lifts) planned and authorised",
        "Contingency plan and communications agreed before testing",
      ]},
      { heading: "Training Syllabus", points: [
        "CIE controls: silence, reset, disablements and weekly tests",
        "Reading logs, acknowledging faults and basic troubleshooting",
        "Escalation routes, maintenance intervals and record keeping",
      ]},
      { heading: "Evidence & Acceptance", points: [
        "Signed witness sheets and acceptance certificates",
        "Attendance records for training with date/scope",
        "O&M manuals and configuration backups issued",
      ]},
      { heading: "Post-handover & Aftercare", points: [
        "Snag register with owners and target dates",
        "Maintenance contact routes and first visit scheduling",
        "Agreed fire drill/evacuation integration documented",
      ]},
      { heading: "Comms & Notifications", points: [
        "Notify ARC/monitoring of tests and restore routing afterwards",
        "Agree on-site communications and muster points",
        "Brief security/reception on system states during testing",
      ]},
      { heading: "Training Assessment & Handover", points: [
        "Short knowledge check or practical demonstration by trainees",
        "Provide quick-reference sheets and weekly test guide",
        "Confirm handover contacts and response SLAs",
      ]},
      { heading: "FAQs", points: [
        "Can we test during hours? Yes with permits, notices and controls",
        "Who signs acceptance? The Responsible Person or appointed representative",
        "What evidence is required? Signed scripts, logs, photos and certificates",
      ]},
      { heading: "Glossary", points: [
        "ARC: Alarm Receiving Centre",
        "SLA: Service Level Agreement",
        "Responsible Person: Duty holder under fire safety legislation",
      ]},
    ]}
    summary={[
      "Conduct structured witness tests mapped to the C&E with safety controls and stakeholder presence.",
      "Demonstrate normal, fault, disablement, test and alarm modes; capture logs, photos and signed results.",
      "Provide training with attendance records and issue O&M manuals plus configuration backups.",
      "Document outstanding items, owners and target dates; agree aftercare and maintenance routes.",
      "Communicate ARC/monitoring arrangements, assess training effectiveness, and confirm response SLAs.",
    ]}
    quiz={quiz}
    prev="/fire-alarm-module-5-section-5"
    next={undefined}
  />
);

export default FireAlarmModule5Section6;
