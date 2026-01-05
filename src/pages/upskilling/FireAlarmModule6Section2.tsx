import { BookOpen } from 'lucide-react';
import FireAlarmModule6SectionTemplate from './FireAlarmModule6SectionTemplate';
import type { QuizQuestion } from '@/types/quiz';

const quiz: QuizQuestion[] = [
  { id: 1, question: 'What information must be recorded for every weekly test?', options: ['Just the date', 'Date, time, person conducting test, and results', 'Only if faults found', 'Test pass/fail only'], correctAnswer: 1, explanation: 'BS 5839-1 requires recording date, time, person conducting test, results, and any remedial actions for all tests.' },
  { id: 2, question: 'How long must fire alarm test records be retained?', options: ['1 year', '2 years', 'Minimum 3 years', '5 years'], correctAnswer: 2, explanation: 'BS 5839-1 requires fire alarm records to be kept for a minimum of 3 years for inspection by enforcing authorities.' },
  { id: 3, question: 'What details must be recorded when a fault is identified?', options: ['Just fault location', 'Date and time only', 'Location, nature of fault, action taken, and completion date', 'Person who found it'], correctAnswer: 2, explanation: 'Complete fault records must include location, detailed description, remedial action taken, and completion verification.' },
  { id: 4, question: 'Who should sign off completed maintenance work in the logbook?', options: ['Building owner only', 'The competent engineer who completed the work', 'Any employee', 'Security guard'], correctAnswer: 1, explanation: 'Only the competent person who carried out and verified the work should sign the completion entry.' },
  { id: 5, question: 'What type of logbook entry is required after system modifications?', options: ['No entry needed', 'Brief note of change', 'Detailed modification record with updated drawings', 'Just the date'], correctAnswer: 2, explanation: 'System modifications require detailed records including what was changed, why, and updated documentation references.' },
  { id: 6, question: 'Digital record systems must provide what level of security?', options: ['Password protection only', 'Audit trail showing all changes with user identification', 'Basic encryption', 'No special requirements'], correctAnswer: 1, explanation: 'Digital systems must maintain audit trails showing who made changes, when, and what was modified to ensure integrity.' },
  { id: 7, question: 'What should be recorded during monthly detector testing?', options: ['Pass/fail only', 'Device location, type, test method, result, and defects', 'Just the number tested', 'Date only'], correctAnswer: 1, explanation: 'Monthly testing records must include device identification, location, test method used, results, and any defects noted.' },
  { id: 8, question: 'When must test records be made available to authorities?', options: ['Only annually', 'On request during inspections', 'Never', 'Only if asked nicely'], correctAnswer: 1, explanation: 'Records must be readily available for inspection by fire authorities, insurers, and other relevant bodies upon request.' },
  { id: 9, question: 'What information should be included in handover documentation?', options: ['Basic system details only', 'Complete system documentation, test records, and maintenance schedules', 'Just the warranty', 'Installation photos'], correctAnswer: 1, explanation: 'Handover must include comprehensive documentation: drawings, schedules, test records, and maintenance requirements.' },
  { id: 10, question: 'How should false alarm incidents be recorded?', options: ['Not recorded', 'Date and cause only', 'Date, time, location, cause investigation, and remedial action', 'Basic log entry'], correctAnswer: 2, explanation: 'False alarms require detailed investigation records including cause analysis and measures taken to prevent recurrence.' }
];

const FireAlarmModule6Section2 = () => {
  return (
    <FireAlarmModule6SectionTemplate
      icon={BookOpen}
      sectionNumber="2"
      title="Logbooks and Record-Keeping"
      description="Comprehensive documentation and record management requirements"
      badges={[]}
      duration=""
      intro="Proper record-keeping is a legal requirement under BS 5839-1 and essential for demonstrating compliance, tracking system performance, and supporting insurance claims. This section covers all aspects of documentation from daily logs to comprehensive handover packages."
      learnings={[
        "Understand legal requirements for fire alarm record retention under BS 5839-1",
        "Implement comprehensive logbook systems covering all testing and maintenance activities",
        "Document fault conditions with sufficient detail for effective remedial action",
        "Maintain accurate service records including competent person certifications",
        "Create and manage digital record systems with appropriate security and audit trails"
      ]}
      blocks={[
        { heading: "BS 5839-1 Record-Keeping Overview", points: [
          "Legal Requirements: Minimum 3-year retention of all test and maintenance records for authority inspection",
          "Daily Documentation: Record visual checks, fault conditions, alarms, maintenance activities, and environmental factors", 
          "Digital Systems: Secure access controls, comprehensive audit trails, regular backups, and data protection compliance"
        ]},
        { heading: "Legal Record Requirements", points: [
          "Retention Period: BS 5839-1 mandates minimum 3-year retention of all test and maintenance records",
          "Authority Access: Records must be readily available for inspection by fire authorities and insurers",
          "Competent Person Certificates: Required for all installation and maintenance work per regulation",
          "System Modifications: Must be documented with updated drawings and schedules for compliance"
        ]},
        { heading: "Daily and Weekly Documentation", points: [
          "Visual Panel Checks: Record daily visual checks of control panel indicators and displays",
          "Fault Documentation: Document any fault conditions, alarms, or system maintenance activities thoroughly",
          "Environmental Factors: Note conditions affecting system operation including building work and severe weather",
          "Test Results: Record automatic test facility operation results and any fault indications discovered"
        ]},
        { heading: "Monthly and Annual Test Records", points: [
          "Device Testing: Detail all devices tested including asset numbers, locations, and device types",
          "Test Methods: Record test methods used and results achieved including sound level measurements",
          "Defect Documentation: Document any defects found with clear descriptions and recommended actions",
          "Comprehensive Testing: Record of every device tested with results and any defects identified"
        ]},
        { heading: "Fault Recording Requirements", points: [
          "Discovery Documentation: Record fault discovery date, time, location, and person reporting the issue",
          "Detailed Description: Provide detailed description of fault symptoms and potential safety implications",
          "Immediate Actions: Document immediate actions taken including temporary safety measures implemented",
          "Progress Tracking: Track remedial work progress with contractor details and completion dates"
        ]},
        { heading: "Digital Record System Components", points: [
          "Security Features: Secure access controls, individual user authentication, and comprehensive audit trail capabilities",
          "Data Management: Regular backups, off-site storage, disaster recovery procedures, and data integrity verification",
          "Integration Capabilities: Compatibility with standard formats, data exchange protocols, and regulatory reporting systems",
          "Search and Reporting: Advanced search capabilities, automated reporting, and compliance demonstration features"
        ]}
      ]}
      summary={[
        "BS 5839-1 requires comprehensive record-keeping with minimum 3-year retention for legal compliance and authority inspection.",
        "Daily, weekly, monthly, and annual testing must be documented with sufficient detail for performance tracking and fault analysis.",
        "Fault recording procedures ensure rapid response, effective remediation, and prevention of recurring issues.",
        "Digital record systems provide enhanced security, audit capabilities, and efficient data management for large installations.",
        "Professional handover documentation supports ongoing maintenance, compliance, and system optimisation throughout operational life.",
        "Regular record review enables performance analysis, predictive maintenance, and strategic system improvement planning."
      ]}
      quiz={quiz}
      prev="/fire-alarm-module-6-section-1"
      next="/fire-alarm-module-6-section-3"
      blocksLayout="stack"
    />
  );
};

export default FireAlarmModule6Section2;