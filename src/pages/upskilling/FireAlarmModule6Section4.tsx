import { Clock } from 'lucide-react';
import FireAlarmModule6SectionTemplate from './FireAlarmModule6SectionTemplate';
import type { QuizQuestion } from '@/types/quiz';

const quiz: QuizQuestion[] = [
  { id: 1, question: 'According to BS 5839-1, how frequently must automatic weekly tests be conducted?', options: ['Every 7 days ± 24 hours', 'Every Monday', 'When convenient', 'Every 10 days'], correctAnswer: 0, explanation: 'BS 5839-1 requires automatic weekly tests to occur every 7 days with a tolerance of ±24 hours to ensure consistent monitoring.' },
  { id: 2, question: 'What percentage of manual call points should be tested each month?', options: ['100%', '25%', '10%', '50%'], correctAnswer: 2, explanation: 'BS 5839-1 requires testing 10% of manual call points monthly, ensuring all are tested over a 10-month period.' },
  { id: 3, question: 'During weekly tests, what should be checked on the fire alarm control panel?', options: ['Only power supply', 'Indicators, faults, and log entries', 'Nothing - automatic only', 'Just the display'], correctAnswer: 1, explanation: 'Weekly checks must include visual inspection of all indicators, any fault conditions, and reviewing automatic test logs.' },
  { id: 4, question: 'Annual testing must include evacuation drills in which types of premises?', options: ['All premises', 'Only schools', 'Premises where people sleep', 'Commercial only'], correctAnswer: 2, explanation: 'BS 5839-1 specifically requires evacuation drills in premises where people sleep, such as hotels and residential care facilities.' },
  { id: 5, question: 'What action is required if a detector fails during monthly testing?', options: ['Ignore until annual test', 'Replace immediately', 'Record fault and arrange repair within 28 days', 'Test again next month'], correctAnswer: 2, explanation: 'Faults must be recorded and repairs arranged promptly, typically within 28 days for non-critical faults.' },
  { id: 6, question: 'Who may conduct the weekly visual inspection of the control panel?', options: ['Only qualified engineers', 'Any trained responsible person', 'Fire brigade only', 'Building owner only'], correctAnswer: 1, explanation: 'A trained responsible person may conduct weekly visual inspections, provided they understand what to look for.' },
  { id: 7, question: 'What equipment calibration is required for annual testing?', options: ['No calibration needed', 'Sound level meter calibrated within 12 months', 'Only visual inspection', 'Voltmeter only'], correctAnswer: 1, explanation: 'Sound level meters used for audibility testing must be calibrated within the previous 12 months to ensure accurate readings.' },
  { id: 8, question: 'During monthly sounder testing, what decibel level should be achieved?', options: ['Any audible level', '75dB minimum at any point', '65dB at the farthest point', 'As loud as possible'], correctAnswer: 2, explanation: 'BS 5839-1 requires a minimum of 65dB at the farthest point from any sounder in occupied areas.' },
  { id: 9, question: 'What should be done if more than 25% of devices fail annual testing?', options: ['Continue testing', 'Stop and investigate system design', 'Replace all devices', 'Reduce test frequency'], correctAnswer: 1, explanation: 'High failure rates indicate potential system issues requiring investigation of design, installation, or environmental factors.' },
  { id: 10, question: 'How long should records of test results be retained?', options: ['1 year', '3 years minimum', '5 years', 'Forever'], correctAnswer: 1, explanation: 'BS 5839-1 requires test records to be retained for at least 3 years for inspection by authorities and insurance companies.' }
];

const FireAlarmModule6Section4 = () => {
  return (
    <FireAlarmModule6SectionTemplate
      icon={Clock}
      sectionNumber="4"
      title="Maintenance Schedules (BS 5839-1 Clause 44)"
      description="Comprehensive maintenance schedules and procedures per BS 5839-1"
      badges={[]}
      duration=""
      intro="BS 5839-1 Clause 44 establishes mandatory maintenance schedules to ensure fire alarm systems remain in optimum working condition throughout their operational life. Regular maintenance is crucial for system reliability and compliance with British Standards."
      learnings={[
        "Understand the three-tier maintenance schedule required by BS 5839-1",
        "Know the specific requirements for weekly, monthly, and annual maintenance",
        "Learn proper documentation and record-keeping procedures",
        "Understand the consequences of poor maintenance practices",
        "Apply correct testing frequencies and tolerances"
      ]}
      blocks={[
        { heading: "BS 5839-1 Maintenance Schedule Overview", points: [
          "Weekly: Visual inspection of control equipment, check fault indicators, test backup power supply, verify system status",
          "Monthly: Test different detector each month, test manual call points, check sounder operation, verify remote transmission", 
          "Annual: Complete system verification, all devices tested, cable integrity checks, certification issued"
        ]},
        { heading: "Weekly Maintenance Requirements", points: [
          "Control Panel Checks: Visual inspection of all indicator LEDs, display readouts, and general condition",
          "Fault Indicators: Verify no fault conditions present, check event log entries for system issues",
          "Power Supply Testing: Check mains present indicator and verify voltage levels at control panel",
          "Battery Backup: Test battery condition and verify charging system operation under load"
        ]},
        { heading: "Monthly Maintenance Requirements", points: [
          "Device Testing Schedule: Test approximately 1/12th of all detectors each month to ensure annual coverage",
          "Smoke/Heat Detectors: Test using appropriate stimulus, verify response time within manufacturer specifications",
          "Manual Call Points: Test operation using test key or break glass tool, verify immediate zone indication",
          "Alarm Sounders: Verify audible alarm operation and sound levels using calibrated sound level meter"
        ]},
        { heading: "Annual Maintenance Requirements", points: [
          "Complete System Verification: Test every manual call point, detector, and sounder in the system",
          "Loop Integrity Testing: Verify circuit integrity and earth fault monitoring with insulation resistance testing",
          "Evacuation Procedures: Conduct full evacuation drill in sleeping accommodation premises as required",
          "Ancillary Equipment: Test all door releases, dampers, extract fans, and interface operation thoroughly"
        ]},
        { heading: "Test Equipment Requirements", points: [
          "Sound Level Meter: Calibrated within previous 12 months for accurate audibility testing per BS 5839-1",
          "Insulation Resistance Tester: Capable of 500V DC for comprehensive loop integrity testing procedures",
          "Detector Test Equipment: Aerosol for smoke detectors, heat source for heat detectors, appropriate stimuli",
          "Multimeter: For precise voltage and current measurements at control equipment and field devices"
        ]},
        { heading: "Maintenance Documentation Requirements", points: [
          "Test Records: Detailed records of all tests performed with dates, results, and responsible person signatures",
          "Fault Documentation: Record all faults with clear descriptions, locations, and recommended remedial actions",
          "Remedial Action Tracking: Track progress of fault rectification with completion dates and verification",
          "Service Scheduling: Maintain clear schedules for next service visits and ongoing maintenance requirements"
        ]}
      ]}
      summary={[
        "BS 5839-1 requires structured maintenance schedules with weekly, monthly, and annual testing procedures.",
        "Proper documentation ensures legal compliance and provides a clear maintenance history for authorities.",
        "Regular maintenance prevents system failures and ensures reliable operation during emergencies.",
        "Competent persons must conduct maintenance with appropriate qualifications and test equipment.",
        "Fault classification and prompt remedial action maintains system effectiveness throughout its operational life."
      ]}
      quiz={quiz}
      prev="/fire-alarm-module-6-section-3"
      next="/fire-alarm-module-6-section-5"
      blocksLayout="stack"
    />
  );
};

export default FireAlarmModule6Section4;