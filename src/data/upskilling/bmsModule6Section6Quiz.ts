export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const bmsModule6Section6Quiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'What is remote monitoring in a BMS?',
    options: [
      'A backup battery that keeps controllers running during a power cut',
      'Authorised staff can view and control BMS functions off-site',
      'A local touchscreen mounted on the front of the control panel',
      'An automatic shutdown of plant when a fault is detected',
    ],
    correctAnswer: 1,
    explanation:
      'Remote monitoring allows authorised staff to access BMS functions from off-site locations using web portals, mobile apps, or VPN connections.',
  },
  {
    id: 2,
    question: 'Give one example of a remote monitoring method.',
    options: [
      'Manual meter readings',
      'Paper-based logs',
      'Web portals with secure login',
      'Visual inspections',
    ],
    correctAnswer: 2,
    explanation:
      'Web portals provide secure login access to cloud-hosted dashboards, allowing remote viewing and control of BMS functions.',
  },
  {
    id: 3,
    question: 'Why does remote monitoring improve fault response?',
    options: [
      'It eliminates all system faults',
      'It only works during business hours',
      'It prevents equipment from failing',
      'Staff can respond instantly from any location',
    ],
    correctAnswer: 3,
    explanation:
      'Remote monitoring allows staff to receive notifications and respond to faults immediately, regardless of their location, significantly reducing response times.',
  },
  {
    id: 4,
    question: 'What is a fault alert?',
    options: [
      'An instant notification when problems occur',
      'A scheduled weekly summary of system performance',
      'A manual log entry made by maintenance staff',
      'A warning label fixed to the front of the panel',
    ],
    correctAnswer: 0,
    explanation:
      'Fault alerts are instant notifications sent to staff when system problems are detected, ensuring rapid response to critical issues.',
  },
  {
    id: 5,
    question: 'Give one example of a fault alert delivery method.',
    options: [
      'Written reports',
      'SMS via GSM modules',
      'Weekly meetings',
      'Annual reviews',
    ],
    correctAnswer: 1,
    explanation:
      'SMS messages sent through GSM modules provide immediate notification delivery, even when internet connectivity is unavailable.',
  },
  {
    id: 6,
    question: 'Why is escalation important in fault alerts?',
    options: [
      'It reduces the total number of alerts the system generates',
      'It automatically clears faults once they have been logged',
      'It ensures critical issues reach appropriate staff levels',
      'It increases the sensitivity of the fault detection thresholds',
    ],
    correctAnswer: 2,
    explanation:
      "Escalation ensures that if initial recipients don't acknowledge alerts, notifications are sent to higher levels of management to prevent critical issues being missed.",
  },
  {
    id: 7,
    question: 'What is one risk of relying only on remote monitoring?',
    options: [
      'Higher energy consumption from continuous data transmission',
      'Slower control response because data must travel off-site',
      'Increased wear on field sensors from constant polling',
      'Missed alerts due to system misconfiguration',
    ],
    correctAnswer: 3,
    explanation:
      'If remote monitoring systems are misconfigured, critical alerts may not be delivered, leading to undetected faults and potential system failures.',
  },
  {
    id: 8,
    question: 'Why should redundancy (e.g., SMS + email) be built into alerting systems?',
    options: [
      'To ensure alerts reach staff if one method fails',
      'To increase the number of alerts',
      'To test different communication technologies',
      'To comply with manufacturer warranties',
    ],
    correctAnswer: 0,
    explanation:
      'Multiple communication paths ensure that if one method fails (like email servers being offline), alerts can still reach staff through alternative methods like SMS.',
  },
  {
    id: 9,
    question: 'What commissioning step ensures alerts are received by staff?',
    options: [
      'Confirming the controller clocks are synchronised',
      'Testing notifications with trial alerts to all recipients',
      'Checking the supply voltage at each controller',
      'Recording the IP address of every networked device',
    ],
    correctAnswer: 1,
    explanation:
      'Testing notifications by sending trial alerts to all intended recipients confirms that the alert system is working correctly and messages are being delivered.',
  },
  {
    id: 10,
    question: 'In the real-world example, why were staff unaware of the freezer failure?',
    options: [
      'The freezer had no monitoring system',
      'Staff were not trained to read alerts',
      'The email server was offline and no backup alerts existed',
      'The fault occurred during holidays',
    ],
    correctAnswer: 2,
    explanation:
      'The email server had been offline for weeks, and there were no backup alert methods configured, so staff never received notification of the critical freezer failure.',
  },
];
