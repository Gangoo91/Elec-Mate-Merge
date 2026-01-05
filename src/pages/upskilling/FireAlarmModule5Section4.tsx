import { Settings } from 'lucide-react';
import FireAlarmModule5SectionTemplate from './FireAlarmModule5SectionTemplate';
import type { QuizQuestion } from '@/types/quiz';

const quiz: QuizQuestion[] = [
  { id: 1, question: 'Before uploading C&E to the CIE, you should:', options: ['Delete all devices', 'Verify device addresses and types match the database', 'Ignore loop scan', 'Disable logs'], correctAnswer: 1, explanation: 'Ensure device inventory in software matches the installed system to prevent mapping errors.' },
  { id: 2, question: 'What document must be updated after any C&E change?', options: ['Holiday rota', 'As-built C&E matrix and version control record', 'Office map', 'Nothing'], correctAnswer: 1, explanation: 'Maintain configuration control and traceability.' },
  { id: 3, question: 'Functional testing of C&E should:', options: ['Sample only', 'Be performed against a test script with witness signatures', 'Be avoided', 'Use random devices'], correctAnswer: 1, explanation: 'Use structured test scripts to verify all inputs/outputs per matrix.' },
  { id: 4, question: 'When uploading configuration to panel:', options: ['Ignore backups', 'Create a backup of current configuration first', 'Power cycle repeatedly', 'Set incorrect dates'], correctAnswer: 1, explanation: 'Always back up prior to change to enable rollback.' },
  { id: 5, question: 'Interfacing (e.g., HVAC, lifts) should be tested:', options: ['Never', 'Only visually', 'With relevant stakeholders present and isolations in place', 'At night only'], correctAnswer: 2, explanation: 'Coordinate interfaces safely with stakeholders and proper isolations/permits.' },
  { id: 6, question: 'What is important for panel time/date settings?', options: ['Irrelevant', 'Accurate time/date for event log integrity', 'Random time', 'Midnight only'], correctAnswer: 1, explanation: 'Correct time-stamps are vital for event traceability.' },
  { id: 7, question: 'Upload risks can be mitigated by:', options: ['No plan', 'Following manufacturer procedure and using correct cables/drivers', 'Guessing', 'Using any software'], correctAnswer: 1, explanation: 'Follow official procedures and compatible tools to avoid bricking CIE.' },
  { id: 8, question: 'If an upload fails mid‑way you should:', options: ['Power cycle repeatedly', 'Abort per procedure and restore from baseline backup', 'Ignore and proceed', 'Factory reset immediately'], correctAnswer: 1, explanation: 'Use your prepared rollback plan and baseline backup to recover safely.' },
];

const FireAlarmModule5Section4 = () => (
  <FireAlarmModule5SectionTemplate
    icon={Settings}
    sectionNumber="4"
    title="Programming and Uploading C&E Config"
    description="Cause and effect programming configuration"
    badges={["CIE", "Version Control"]}
    intro="C&E programming translates the fire strategy into executable logic. We expand on configuration management, database alignment, upload safeguards, structured functional testing, rollback planning, and stakeholder coordination."
    learnings={[
      "Maintain configuration control with versioning and backups",
      "Align database device list and labels with installed system",
      "Test each matrix step methodically with signed evidence",
      "Plan safe interface tests with permits and isolations",
      "Prepare rollback and contingency for upload failures",
      "Set and verify correct time/date; review and interpret logs",
      "Document variations and interim configurations for audit",
      "Record and restore any temporary disablements used during testing",
      "Securely store configuration backups with access control",
    ]}
    blocks={[
      { heading: "Configuration Management", points: [
        "Source approved C&E matrix and change control log",
        "Create baseline backup of current panel configuration",
        "Record version, date, engineer and change notes",
      ]},
      { heading: "Database Alignment", points: [
        "Import/reconcile device addresses, types and locations",
        "Verify labels match drawings and device schedule",
        "Resolve mismatches before any upload",
      ]},
      { heading: "Upload & Validation", points: [
        "Use correct cables/drivers and manufacturer procedure",
        "Set correct time/date; review event logs for errors",
        "Execute functional scripts and capture signatures/photos",
      ]},
      { heading: "Worked Example: Two-stage Alarm Logic", points: [
        "Stage 1 alert in affected zone; Stage 2 evac after confirmation",
        "Incorporate delays and investigations per strategy",
        "Map interfaces (HVAC/lifts) and verify interlocks",
      ]},
      { heading: "Change Control Governance", points: [
        "Raise change request; obtain approval prior to upload",
        "Record affected areas, risk assessment and rollback plan",
        "Issue post-change notice with updated C&E and version",
      ]},
      { heading: "CIE Time & Logs Integrity", points: [
        "Synchronise panel clock; verify time zone and DST",
        "Confirm log retention and export key events for record pack",
        "Investigate and resolve log errors before acceptance",
      ]},
      { heading: "Risk, Rollback & Recovery", points: [
        "Export current config; store safely before upload",
        "Plan recovery if upload fails; confirm revert procedure",
        "Log differences and update version control post-change",
      ]},
      { heading: "Stakeholder Coordination & Permits", points: [
        "Agree test windows; arrange isolations and observers",
        "Notify FM, security, tenants as required",
        "Sign off permit-to-work and restore systems after tests",
      ]},
      { heading: "FAQs", points: [
        "Can I edit C&E live? Follow manufacturer guidance; prefer offline edit and controlled upload",
        "What if device list does not match? Reconcile before upload to prevent mapping errors",
        "How to prove tests? Use signed scripts mapped to matrix steps with photos/log extracts",
      ]},
      { heading: "Glossary", points: [
        "CIE: Control and Indicating Equipment",
        "C&E: Cause and Effect (logic matrix)",
        "Rollback: Restoring the previous known-good configuration",
      ]},
    ]}
    summary={[
      "Programme from the approved matrix with strict version control and backups for rollback.",
      "Align device databases and labels with the installed inventory to avoid mapping errors.",
      "Validate uploads with scripted functional tests, correct time/date and log review.",
      "Apply formal change control, record disablements, and secure configuration backups.",
      "Coordinate interface tests with stakeholders under permits and interlocks; distribute updated as-built C&E.",
    ]}
    quiz={quiz}
    prev="/fire-alarm-module-5-section-3"
    next="/fire-alarm-module-5-section-5"
  />
);

export default FireAlarmModule5Section4;
