import { QuizQuestion } from '@/components/quiz/types';

export const bmsModule6Section1QuizData: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the purpose of alarm priorities in a BMS?",
    options: [
      "To make all alarms sound louder",
      "To help operators respond appropriately by categorising alarms by severity",
      "To reduce the number of alarms generated",
      "To automatically fix system problems"
    ],
    correctAnswer: 1,
    explanation: "Alarm priorities categorise alarms by severity to help operators respond appropriately and prevent being overwhelmed by low-level alerts."
  },
  {
    id: 2,
    question: "Give one example of a critical alarm.",
    options: [
      "Filter dirty warning",
      "Battery low in sensor",
      "Fire alarm activation",
      "Light switch failure"
    ],
    correctAnswer: 2,
    explanation: "Fire alarm activation is a critical (high priority) alarm that requires immediate action for life safety."
  },
  {
    id: 3,
    question: "Give one example of a minor alarm.",
    options: [
      "Boiler overpressure",
      "Chiller failure",
      "Fire alarm trigger",
      "Filter dirty warning"
    ],
    correctAnswer: 3,
    explanation: "Filter dirty warning is a minor (low priority) alarm - a non-critical, maintenance-related issue that can be logged for later service."
  },
  {
    id: 4,
    question: "Why is it dangerous to treat all alarms the same?",
    options: [
      "It saves money on equipment",
      "It makes the system faster",
      "Operators become overwhelmed and may miss critical safety issues",
      "It prevents false alarms"
    ],
    correctAnswer: 2,
    explanation: "Treating all alarms the same overwhelms operators with false or low-level alerts, potentially causing them to miss critical safety issues that require immediate action."
  },
  {
    id: 5,
    question: "What is escalation logic?",
    options: [
      "A way to make alarms louder over time",
      "A process that pushes unacknowledged alarms to higher responsibility levels until resolved",
      "A method to reduce the number of alarms",
      "A system that automatically fixes problems"
    ],
    correctAnswer: 1,
    explanation: "Escalation logic ensures that if an alarm is not acknowledged or acted upon, it is pushed to higher levels (supervisor, maintenance team, etc.) until resolved."
  },
  {
    id: 6,
    question: "Who might receive an alarm if the first operator does not respond?",
    options: [
      "No one - the alarm just disappears",
      "The same operator again",
      "Supervisor, maintenance team, or security via SMS/email",
      "Only the building owner"
    ],
    correctAnswer: 2,
    explanation: "If unacknowledged after a set time, alarms are escalated to supervisors, maintenance teams, or security through SMS/email notifications."
  },
  {
    id: 7,
    question: "Why is fail-safe wiring (NC contacts) used for critical alarms?",
    options: [
      "It uses less power",
      "It's cheaper to install",
      "Faults like broken wires will generate an alarm, ensuring safety",
      "It makes wiring easier"
    ],
    correctAnswer: 2,
    explanation: "Fail-safe wiring using normally-closed (NC) circuits ensures that any fault, such as broken wires, will generate an alarm, maintaining safety integrity."
  },
  {
    id: 8,
    question: "Why must alarm circuits be labelled clearly?",
    options: [
      "To meet colour coding standards",
      "To avoid confusion between different alarm types (fire, fault, status)",
      "To make installation faster",
      "To reduce cable costs"
    ],
    correctAnswer: 1,
    explanation: "Clear labelling of alarm circuits prevents confusion between different alarm types (fire, fault, status) during installation, maintenance, and troubleshooting."
  },
  {
    id: 9,
    question: "What commissioning step confirms escalation works correctly?",
    options: [
      "Testing cable continuity",
      "Checking that escalation (SMS/email) occurs after the programmed delay",
      "Measuring voltage levels",
      "Inspecting cable terminations"
    ],
    correctAnswer: 1,
    explanation: "During commissioning, you must verify that escalation notifications (SMS/email) are sent after the programmed delay to confirm the escalation process works correctly."
  },
  {
    id: 10,
    question: "In the real-world example, what was the result of misclassifying a boiler fault alarm?",
    options: [
      "The system worked perfectly",
      "It saved energy costs",
      "Operators ignored it, leading to boiler lockout and loss of heating across hospital wards",
      "It prevented other alarms from working"
    ],
    correctAnswer: 2,
    explanation: "The boiler fault was configured as 'low priority' instead of 'critical', so operators ignored it during night shift. By morning, the boiler had locked out, causing heating loss across hospital wards."
  }
];