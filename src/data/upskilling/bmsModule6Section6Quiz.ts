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
    question: "What is remote monitoring in a BMS?",
    options: [
      "Only viewing data from the control room",
      "Authorised staff can view and control BMS functions off-site",
      "Automatic system shutdown procedures",
      "Local sensor calibration"
    ],
    correctAnswer: 1,
    explanation: "Remote monitoring allows authorised staff to access BMS functions from off-site locations using web portals, mobile apps, or VPN connections."
  },
  {
    id: 2,
    question: "Give one example of a remote monitoring method.",
    options: [
      "Manual meter readings",
      "Web portals with secure login",
      "Paper-based logs",
      "Visual inspections"
    ],
    correctAnswer: 1,
    explanation: "Web portals provide secure login access to cloud-hosted dashboards, allowing remote viewing and control of BMS functions."
  },
  {
    id: 3,
    question: "Why does remote monitoring improve fault response?",
    options: [
      "It eliminates all system faults",
      "Staff can respond instantly from any location",
      "It prevents equipment from failing",
      "It only works during business hours"
    ],
    correctAnswer: 1,
    explanation: "Remote monitoring allows staff to receive notifications and respond to faults immediately, regardless of their location, significantly reducing response times."
  },
  {
    id: 4,
    question: "What is a fault alert?",
    options: [
      "A planned maintenance schedule",
      "An instant notification when problems occur",
      "A daily status report",
      "A manual inspection checklist"
    ],
    correctAnswer: 1,
    explanation: "Fault alerts are instant notifications sent to staff when system problems are detected, ensuring rapid response to critical issues."
  },
  {
    id: 5,
    question: "Give one example of a fault alert delivery method.",
    options: [
      "Written reports",
      "SMS via GSM modules",
      "Weekly meetings",
      "Annual reviews"
    ],
    correctAnswer: 1,
    explanation: "SMS messages sent through GSM modules provide immediate notification delivery, even when internet connectivity is unavailable."
  },
  {
    id: 6,
    question: "Why is escalation important in fault alerts?",
    options: [
      "It reduces the number of alerts sent",
      "It ensures critical issues reach appropriate staff levels",
      "It eliminates false alarms",
      "It saves on communication costs"
    ],
    correctAnswer: 1,
    explanation: "Escalation ensures that if initial recipients don't acknowledge alerts, notifications are sent to higher levels of management to prevent critical issues being missed."
  },
  {
    id: 7,
    question: "What is one risk of relying only on remote monitoring?",
    options: [
      "Increased energy consumption",
      "Missed alerts due to system misconfiguration",
      "Higher maintenance costs",
      "Slower response times"
    ],
    correctAnswer: 1,
    explanation: "If remote monitoring systems are misconfigured, critical alerts may not be delivered, leading to undetected faults and potential system failures."
  },
  {
    id: 8,
    question: "Why should redundancy (e.g., SMS + email) be built into alerting systems?",
    options: [
      "To increase the number of alerts",
      "To ensure alerts reach staff if one method fails",
      "To test different communication technologies",
      "To comply with manufacturer warranties"
    ],
    correctAnswer: 1,
    explanation: "Multiple communication paths ensure that if one method fails (like email servers being offline), alerts can still reach staff through alternative methods like SMS."
  },
  {
    id: 9,
    question: "What commissioning step ensures alerts are received by staff?",
    options: [
      "Installing the latest software",
      "Testing notifications with trial alerts to all recipients",
      "Checking equipment warranties",
      "Reading the user manual"
    ],
    correctAnswer: 1,
    explanation: "Testing notifications by sending trial alerts to all intended recipients confirms that the alert system is working correctly and messages are being delivered."
  },
  {
    id: 10,
    question: "In the real-world example, why were staff unaware of the freezer failure?",
    options: [
      "The freezer had no monitoring system",
      "The email server was offline and no backup alerts existed",
      "Staff were not trained to read alerts",
      "The fault occurred during holidays"
    ],
    correctAnswer: 1,
    explanation: "The email server had been offline for weeks, and there were no backup alert methods configured, so staff never received notification of the critical freezer failure."
  }
];