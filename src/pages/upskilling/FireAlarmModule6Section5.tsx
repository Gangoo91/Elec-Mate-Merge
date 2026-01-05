import { FileCheck } from 'lucide-react';
import FireAlarmModule6SectionTemplate from './FireAlarmModule6SectionTemplate';
import type { QuizQuestion } from '@/types/quiz';

const quiz: QuizQuestion[] = [
  { id: 1, question: 'Who can issue an Installation Certificate?', options: ['Building owner', 'Any electrician', 'Competent person with appropriate qualifications', 'Insurance inspector'], correctAnswer: 2, explanation: 'Only a competent person with appropriate qualifications can issue Installation Certificates per BS 5839-1.' },
  { id: 2, question: 'How long is a Service Certificate typically valid?', options: ['Permanently', 'Until next service due', '1 year regardless', '6 months maximum'], correctAnswer: 1, explanation: 'Service Certificates are valid until the next scheduled service is due, typically 6 or 12 months.' },
  { id: 3, question: 'Category 1 defects require:', options: ['Action within 28 days', 'Immediate attention or isolation', 'Action at next service', 'No action required'], correctAnswer: 1, explanation: 'Category 1 defects represent immediate danger and require immediate attention or system isolation.' },
  { id: 4, question: 'What must be included with an Installation Certificate?', options: ['Just the certificate', 'As-fitted drawings and test results', 'Insurance documents', 'User manual only'], correctAnswer: 1, explanation: 'Installation Certificates must be accompanied by as-fitted drawings, device schedules, and test results.' },
  { id: 5, question: 'Service reports should classify defects into how many categories?', options: ['2 categories', '3 categories', '4 categories', '5 categories'], correctAnswer: 1, explanation: 'Defects are classified into 3 categories: immediate danger, potentially dangerous, and improvement required.' },
  { id: 6, question: 'Digital certification systems must provide:', options: ['Basic storage', 'Audit trails and secure access', 'Colour printing', 'Internet connectivity'], correctAnswer: 1, explanation: 'Digital systems must provide audit trails showing all changes and secure access controls.' },
  { id: 7, question: 'Competent person qualifications should include:', options: ['Basic electrical knowledge', 'Relevant City & Guilds or equivalent certification', 'Any engineering degree', 'No specific requirements'], correctAnswer: 1, explanation: 'Competent persons require relevant qualifications such as City & Guilds fire alarm certification.' },
  { id: 8, question: 'Category 2 defects should be rectified within:', options: ['Immediately', '28 days maximum', '3 months', 'Next annual service'], correctAnswer: 1, explanation: 'Category 2 (potentially dangerous) defects should be rectified within 28 days maximum.' },
  { id: 9, question: 'Certificate authenticity is ensured by:', options: ['Colour paper', 'Digital signatures and unique reference numbers', 'Expensive printing', 'Multiple copies'], correctAnswer: 1, explanation: 'Digital signatures, unique reference numbers, and secure systems ensure certificate authenticity.' },
  { id: 10, question: 'Handover documentation should include:', options: ['Certificate only', 'Complete system documentation and training records', 'Basic instructions', 'Manufacturer leaflets'], correctAnswer: 1, explanation: 'Handover requires comprehensive documentation including drawings, manuals, certificates, and training records.' }
];

const FireAlarmModule6Section5 = () => {
  return (
    <FireAlarmModule6SectionTemplate
      icon={FileCheck}
      sectionNumber="5"
      title="Issuing Certification and Servicing Reports"
      description="Professional certification processes, report generation, and compliance documentation requirements"
      badges={[]}
      duration=""
      intro="Professional certification and reporting is essential for legal compliance, insurance validity, and demonstrating professional competence in fire alarm maintenance. This section covers the complete certification process from installation through ongoing service reporting, including digital systems and quality assurance procedures."
      learnings={[
        "Understand the different types of fire alarm certificates and their specific purposes",
        "Generate comprehensive Service Reports with proper defect classification systems",
        "Implement digital certification systems with appropriate security and audit capabilities",
        "Ensure competent person qualifications and professional indemnity requirements",
        "Apply quality assurance procedures to maintain certification integrity and accuracy"
      ]}
      blocks={[
        { heading: "Fire Alarm Certification Overview", points: [
          "Installation Certificate: Issued upon completion confirming design and installation compliance with BS 5839-1",
          "Service Certificate: Issued after periodic maintenance confirming ongoing system condition and performance", 
          "Digital Systems: Secure access controls, audit trails, digital signatures, and certificate authenticity verification"
        ]},
        { heading: "Installation Certificate Requirements", points: [
          "Client Information: Client details including name, address, building type, and occupancy classification",
          "System Specifications: Complete system details including type, category, control panel specifications, device quantities",
          "Test Results: Comprehensive test results including insulation resistance, earth continuity, sound level verification",
          "Supporting Documents: As-fitted drawings, device schedules, cable routes, and zone layout diagrams included"
        ]},
        { heading: "Service Report Structure Requirements", points: [
          "Executive Summary: Overall system condition assessment and key findings for client understanding",
          "Detailed Test Results: All procedures performed including specific device testing with measurements and readings",
          "Defects Documentation: Clear descriptions and remedial action requirements with priority classifications",
          "Professional Sign-off: Competent person signature with qualification details and professional registration numbers"
        ]},
        { heading: "Defect Classification System Requirements", points: [
          "Category 1 - Immediate Danger: System compromise requiring immediate attention or isolation with safety measures",
          "Category 2 - Potentially Dangerous: Faults that could become dangerous requiring rectification within 28 days maximum",
          "Category 3 - Improvement Required: System improvements or compliance issues for scheduling at next service",
          "Action Timescales: Each category requires specific remedial action timescales and client notification procedures"
        ]},
        { heading: "Digital Certification System Components", points: [
          "Access Security: Secure access controls with individual user authentication and role-based permissions management",
          "Audit Capabilities: Comprehensive audit trails showing all data entry, modifications, and certificate generation activities",
          "Authentication: Digital signature capabilities ensuring certificate authenticity and preventing forgery attempts",
          "System Integration: Integration with job management systems and automated reminder capabilities for efficiency"
        ]},
        { heading: "Competent Person Qualification Requirements", points: [
          "Certification Standards: Relevant certification including City & Guilds 2391, 5985, or equivalent fire alarm qualifications",
          "Professional Experience: Demonstrable experience in fire alarm installation, commissioning, and maintenance work",
          "Technical Knowledge: Understanding of BS 5839-1, Building Regulations, and relevant health and safety legislation",
          "Professional Insurance: Professional indemnity insurance covering certification and advisory activities adequately"
        ]}
      ]}
      summary={[
        "Professional certification requires appropriate qualifications, technical competence, and adherence to BS 5839-1 requirements.",
        "Installation Certificates must include comprehensive documentation with as-fitted drawings and complete test results.",
        "Service Reports require systematic defect classification and clear remedial action timescales for compliance.",
        "Digital certification systems enhance security, audit capability, and professional efficiency when properly implemented.",
        "Quality assurance procedures ensure certification accuracy, authenticity, and professional credibility.",
        "Comprehensive handover documentation supports ongoing system maintenance and regulatory compliance throughout operational life."
      ]}
      quiz={quiz}
      prev="/fire-alarm-module-6-section-4"
      next="/fire-alarm-module-6-section-6"
      blocksLayout="stack"
    />
  );
};

export default FireAlarmModule6Section5;