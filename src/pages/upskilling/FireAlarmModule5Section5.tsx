import { FileCheck } from 'lucide-react';
import FireAlarmModule5SectionTemplate from './FireAlarmModule5SectionTemplate';
import type { QuizQuestion } from '@/types/quiz';

const quiz: QuizQuestion[] = [
  { id: 1, question: 'Commissioning test sheets should be completed in accordance with:', options: ['Personal preference', 'BS 5839-1 and client templates', 'BS 7671 only', 'No formal standard'], correctAnswer: 1, explanation: 'Commissioning documentation should meet BS 5839-1 requirements and any client/consultant formats.' },
  { id: 2, question: 'Instrument details recorded should include:', options: ['Colour', 'Serial number and calibration date', 'Installer favourite', 'None'], correctAnswer: 1, explanation: 'Traceability requires serials and calibration status on test sheets.' },
  { id: 3, question: 'What must be attached to commissioning certificates?', options: ['Holiday photos', 'Device lists, zone charts, C&E matrix, and test records', 'Only drawings', 'Nothing'], correctAnswer: 1, explanation: 'Provide a complete pack including device schedules and records.' },
  { id: 4, question: 'Defects found during commissioning should be:', options: ['Ignored', 'Logged with corrective action and retest evidence', 'Hidden', 'Left for client'], correctAnswer: 1, explanation: 'Defects must be recorded and closed out with evidence.' },
  { id: 5, question: 'As-built drawings should be:', options: ['Draft only', 'Final, accurate and match installed system including device IDs', 'Optional', 'Hand-drawn'], correctAnswer: 1, explanation: 'As-builts must reflect installed configuration for maintenance.' },
  { id: 6, question: 'Zone plans must:', options: ['Be omitted', 'Be clear, accurate, and posted adjacent to CIE', 'Be in a drawer', 'Be optional'], correctAnswer: 1, explanation: 'Zone plans are mandatory and must be displayed at the panel.' },
  { id: 7, question: 'Site acceptance requires:', options: ['Nothing documented', 'Signed certificates, test sheets, and training records', 'Only verbal confirmation', 'Photos'], correctAnswer: 1, explanation: 'Formal acceptance is based on signed documentation and training evidence.' },
  { id: 8, question: 'Battery calculations and autonomy verification should be:', options: ['Skipped', 'Included and signed-off', 'Estimated only', 'Done later'], correctAnswer: 1, explanation: 'Include calculations and verification of standby and alarm loads.' },
  { id: 9, question: 'Who signs the commissioning certificate?', options: ['Any person', 'Competent person responsible for commissioning', 'Client only', 'Electrician only'], correctAnswer: 1, explanation: 'A competent responsible person signs, as per BS 5839-1.' },
  { id: 10, question: 'What should be included in O&M manuals?', options: ['Marketing materials', 'As-builts, data sheets, certificates, C&E, maintenance requirements', 'Snag list only', 'Nothing'], correctAnswer: 1, explanation: 'Provide a comprehensive handover pack for ongoing maintenance.' }
];

const FireAlarmModule5Section5 = () => (
  <FireAlarmModule5SectionTemplate
    icon={FileCheck}
    sectionNumber="5"
    title="Commissioning Test Sheet Completion"
    description="Documentation and test sheet requirements"
    badges={["Commissioning", "Documentation"]}
    intro="Accurate, complete commissioning documentation demonstrates compliance and supports maintenance. Expanded guidance covers certificate sets, calibrated results, O&M structure, battery calculations, variations and close-out evidence."
    learnings={[
      "Complete BS 5839-1 certificates and traceable test records",
      "Capture instrument serials, calibration dates and engineer details",
      "As-built drawings, zone plans and device schedules must match site",
      "Compile O&M manuals with data sheets and maintenance guidance",
      "Log variations/non-conformances and close them out with evidence",
      "Calculate and verify battery autonomy per BS EN 54-4/BS 5839-1",
      "Assemble a digital handover pack with controlled versions",
      "Define records retention and data protection for documentation",
      "Use checklists to audit completeness before witness testing",
    ]}
    blocks={[
      { heading: "Certificates & Records", points: [
        "Installation and commissioning certificates per BS 5839-1",
        "Test sheets for loops, sound levels, VAD coverage and interfaces",
        "Instrument serials, calibration dates and sign-off",
      ]},
      { heading: "As-builts & Zone Plans", points: [
        "Device IDs and locations aligned to drawings and schedules",
        "Clear zone charts adjacent to CIE and within O&M",
        "Photographic evidence of key terminations and labels",
      ]},
      { heading: "O&M Manual Structure", points: [
        "Overview, system description, C&E matrix and revision history",
        "Data sheets, certificates, maintenance regime and contacts",
        "Battery calculations and autonomy verification records",
      ]},
      { heading: "Worked Example: Battery Autonomy", points: [
        "Calculate standby and alarm loads; apply required factors",
        "Select capacity with margin; verify charger capability",
        "Record calculation sheet and commissioning verification",
      ]},
      { heading: "Templates & Traceability", points: [
        "Unique IDs across certificates, sheets and drawings",
        "Version control and approval signatures on each document",
        "Index and cross-reference within O&M and digital archive",
      ]},
      { heading: "Records Retention & Data Protection", points: [
        "Agree retention periods with client/consultant",
        "Protect personal data in training/attendance records",
        "Provide editable and PDF copies where appropriate",
      ]},
      { heading: "Sample O&M Index", points: [
        "1. Overview & Contacts; 2. System Description; 3. C&E & Revisions",
        "4. Drawings & Zone Plans; 5. Certificates & Test Sheets",
        "6. Data Sheets; 7. Maintenance; 8. Backups & Appendices",
      ]},
      { heading: "Defects & Close-out", points: [
        "Register of snags with responsibility and target dates",
        "Retest evidence and client sign-off of completed items",
        "Archive digital copy for future maintenance",
      ]},
      { heading: "FAQs", points: [
        "Are handwritten sheets acceptable? Use legible, controlled templates with signatures",
        "Do we include raw panel backups? Yes, provide safe copies and note version/date",
        "Where to display zone plans? Adjacent to the CIE and in O&M",
      ]},
      { heading: "Glossary", points: [
        "O&M: Operation and Maintenance manual",
        "C&E: Cause and Effect",
        "Calibration: Verification of instrument accuracy with traceability",
      ]},
    ]}
    summary={[
      "Issue complete BS 5839-1 certificates backed by traceable test evidence and calibrated instruments.",
      "Provide accurate as-builts, zone plans and device schedules that reflect the installed system.",
      "Include battery calculations and verification records; confirm charger and autonomy compliance.",
      "Deliver structured O&M manuals with version control and a searchable digital archive.",
      "Define retention, protect personal data in records, and include safe configuration backups.",
      "Use a completion checklist to ensure documentation is witness-ready and audit-proof.",
    ]}
    quiz={quiz}
    prev="/fire-alarm-module-5-section-4"
    next="/fire-alarm-module-5-section-6"
  />
);

export default FireAlarmModule5Section5;
