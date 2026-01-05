import { Search } from 'lucide-react';
import FireAlarmModule6SectionTemplate from './FireAlarmModule6SectionTemplate';
import type { QuizQuestion } from '@/types/quiz';

const quiz: QuizQuestion[] = [
  { id: 1, question: 'What is the first step in systematic fault finding?', options: ['Replace suspected device', 'Check control panel display', 'Test with multimeter', 'Call manufacturer'], correctAnswer: 1, explanation: 'Always start by checking the control panel display for fault indicators, zone information, and event logs.' },
  { id: 2, question: 'Earth fault symptoms typically include:', options: ['All devices working normally', 'Zone LED flashing and system may not arm', 'Loud alarm sound', 'No visible indication'], correctAnswer: 1, explanation: 'Earth faults typically show as flashing zone LEDs and may prevent the system from arming properly.' },
  { id: 3, question: 'When testing cable insulation resistance, what voltage should be used?', options: ['12V DC', '24V DC', '500V DC', '240V AC'], correctAnswer: 2, explanation: 'BS 7671 requires 500V DC for insulation resistance testing of fire alarm circuits.' },
  { id: 4, question: 'Open circuit faults are commonly caused by:', options: ['Too much power', 'Broken cables or loose connections', 'Overheating devices', 'Wrong device type'], correctAnswer: 1, explanation: 'Open circuits result from broken cables, loose connections, or failed end-of-line resistors.' },
  { id: 5, question: 'The typical value for an end-of-line resistor is:', options: ['1kΩ', '4.7kΩ', '10kΩ', '47kΩ'], correctAnswer: 1, explanation: '4.7kΩ is the standard value for fire alarm end-of-line resistors in most UK systems.' },
  { id: 6, question: 'Communication faults between panel and devices may be caused by:', options: ['Correct device addressing', 'Good cable connections', 'Voltage drop on long cable runs', 'Proper earthing'], correctAnswer: 2, explanation: 'Voltage drop on long cable runs can cause communication issues between panel and devices.' },
  { id: 7, question: 'Smoke detector false alarms are commonly caused by:', options: ['Proper installation', 'Dust, insects, or steam', 'Correct sensitivity setting', 'Good ventilation'], correctAnswer: 1, explanation: 'Dust, insects, steam, cooking fumes, and cigarette smoke are common causes of false alarms.' },
  { id: 8, question: 'When a manual call point mechanism is jammed, you should:', options: ['Force it harder', 'Replace the glass only', 'Lubricate the mechanism', 'Leave it as is'], correctAnswer: 2, explanation: 'Jammed MCP mechanisms should be carefully lubricated with appropriate lubricant for smooth operation.' },
  { id: 9, question: 'Sounder circuit faults may result in:', options: ['Louder alarm sound', 'No alarm sound or reduced volume', 'Better sound quality', 'Automatic reset'], correctAnswer: 1, explanation: 'Faulty sounder circuits typically result in no alarm sound, reduced volume, or distorted sound.' },
  { id: 10, question: 'Digital multimeters should be used to check:', options: ['Only AC voltage', 'Voltage, resistance, and continuity', 'Sound levels', 'Light intensity'], correctAnswer: 1, explanation: 'Digital multimeters are essential for checking voltage, resistance, and continuity in fire alarm circuits.' }
];

const FireAlarmModule6Section3 = () => {
  return (
    <FireAlarmModule6SectionTemplate
      icon={Search}
      sectionNumber="3"
      title="Fault Finding and Common Issues"
      description="Systematic troubleshooting techniques and resolution of common fire alarm system problems"
      badges={[]}
      duration=""
      intro="Effective fault finding requires a systematic approach, proper tools, and understanding of system behaviour patterns. This section provides comprehensive guidance on identifying, diagnosing, and resolving common fire alarm system faults using structured methodologies and appropriate test equipment."
      learnings={[
        "Apply systematic fault-finding methodology starting with control panel analysis",
        "Identify and resolve earth fault conditions using insulation resistance testing",
        "Diagnose open circuit faults and verify end-of-line resistor integrity",
        "Troubleshoot communication issues between panels and field devices",
        "Resolve smoke detector problems including false alarms and detection failures",
        "Repair manual call point mechanical and electrical faults",
        "Address sounder circuit problems and verify sound level compliance",
        "Use appropriate test equipment including multimeters and insulation testers",
        "Document fault conditions and remedial actions for compliance records",
        "Implement preventive measures to reduce recurring fault conditions"
      ]}
      blocks={[
        { heading: "Systematic Fault Finding Overview", points: [
          "Initial Assessment: Check control panel display, identify fault zone, review recent activities",
          "Testing Phase: Isolation testing, electrical testing with multimeter, device replacement", 
          "Documentation: Record fault symptoms, remedial actions, and preventive measures"
        ]},
        { heading: "Common Fault Types", points: [
          "Earth/Short Circuit Faults: Zone LED flashing, system won't arm, caused by water ingress or damaged cables",
          "Open Circuit Faults: Zone fault LED, devices not responding, caused by broken cables or loose connections",
          "Communication Faults: Device not responding, caused by voltage drop or electrical interference",
          "Sounder Faults: No alarm sound or reduced volume, caused by faulty devices or overloaded circuits"
        ]},
        { heading: "Earth Fault Resolution", points: [
          "Use 500V DC insulation resistance tester between conductors and earth",
          "Systematically isolate devices to locate the fault source",
          "Check junction boxes for water ingress or corrosion",
          "Minimum acceptable resistance: 0.5MΩ per BS 7671",
          "Replace faulty device or repair damaged wiring",
          "Re-test circuit before restoring to service"
        ]},
        { heading: "Open Circuit Testing", points: [
          "Check continuity with multimeter across positive and negative conductors",
          "Verify end-of-line resistor value (typically 4.7kΩ)",
          "Inspect junction box connections for looseness or corrosion",
          "Use cable locator for buried cable faults",
          "Repair or replace damaged sections",
          "Test complete circuit before restoration"
        ]},
        { heading: "Essential Test Equipment", points: [
          "Digital multimeter for voltage, current, and resistance measurements",
          "Insulation resistance tester (500V DC capability)",
          "Cable locator for tracing buried cables",
          "Sound level meter (calibrated within 12 months)",
          "Non-contact voltage tester for safety",
          "Basic hand tools and replacement components"
        ]},
        { heading: "Step-by-Step: Earth Fault Investigation", points: [
          "Isolate suspected zone and verify fault indication clears",
          "Measure insulation resistance between conductors and earth",
          "If below 0.5MΩ, systematically disconnect devices",
          "Test after each disconnection to isolate fault",
          "Inspect faulty device and wiring for damage",
          "Replace or repair, then re-test before restoration"
        ]},
        { heading: "Common Detector Issues", points: [
          "False Alarms: Clean detector chamber, check sensitivity settings",
          "Failure to Detect: Replace detector, verify correct type for environment",
          "Intermittent Faults: Improve cable connections and routing",
          "Age-related Issues: Consider replacement after 10 years"
        ]},
        { heading: "Preventive Maintenance", points: [
          "Regular visual inspection of cables and device mounting",
          "Environmental monitoring in dust/moisture-prone areas",
          "Scheduled detector cleaning using appropriate methods",
          "Documentation of fault patterns to identify systemic issues",
          "Training responsible persons to recognize early warning signs"
        ]}
      ]}
      summary={[
        "Systematic fault finding methodology ensures efficient identification and resolution of fire alarm system problems.",
        "Earth fault and open circuit diagnosis requires appropriate test equipment and methodical circuit isolation techniques.",
        "Device-specific troubleshooting addresses common issues with detectors, manual call points, and sounder circuits.",
        "Proper documentation of fault conditions and remedial actions supports compliance and prevents recurring problems.",
        "Regular preventive maintenance and environmental monitoring reduce fault frequency and system downtime.",
        "Competent use of test equipment and adherence to safety procedures ensures effective fault resolution."
      ]}
      quiz={quiz}
      prev="/fire-alarm-module-6-section-2"
      next="/fire-alarm-module-6-section-4"
      blocksLayout="stack"
    />
  );
};

export default FireAlarmModule6Section3;