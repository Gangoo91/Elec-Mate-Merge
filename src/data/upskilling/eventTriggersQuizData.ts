import type { QuizQuestion } from '@/types/quiz';

export const eventTriggersQuizData: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the most important consideration when designing event trigger logic to prevent equipment cycling?",
    options: [
      "Use the fastest possible response times",
      "Implement appropriate time delays and hysteresis",
      "Make triggers as sensitive as possible",
      "Avoid any delays in the system"
    ],
    correctAnswer: 1,
    explanation: "Time delays and hysteresis prevent rapid cycling of equipment by ensuring minimum time periods between start/stop commands and providing deadband around trigger setpoints."
  },
  {
    id: 2,
    question: "In a building automation system, what should have the highest priority in event trigger logic?",
    options: [
      "Energy optimization commands",
      "Occupant comfort adjustments",
      "Safety override functions",
      "Scheduled maintenance reminders"
    ],
    correctAnswer: 2,
    explanation: "Safety override functions must have the highest priority to ensure life safety systems can override all other automation functions during emergency conditions."
  },
  {
    id: 3,
    question: "What is the recommended approach for complex automation scenarios?",
    options: [
      "Create one complex trigger with many conditions",
      "Break into multiple simpler triggers",
      "Avoid automation for complex scenarios",
      "Use manual control only"
    ],
    correctAnswer: 1,
    explanation: "Breaking complex scenarios into multiple simpler triggers makes the logic easier to understand, test, troubleshoot, and maintain while reducing the risk of unintended interactions."
  },
  {
    id: 4,
    question: "How should automated notification systems handle critical alarms if the primary notification method fails?",
    options: [
      "Wait for the primary system to recover",
      "Log the alarm for later review",
      "Use backup notification channels and escalation procedures",
      "Disable the alarm to prevent false alerts"
    ],
    correctAnswer: 2,
    explanation: "Backup notification channels (SMS, mobile app, alternate email) and escalation procedures ensure critical alarms reach responsible personnel even if primary systems fail."
  },
  {
    id: 5,
    question: "What is the optimal frequency for generating energy consumption reports in most commercial buildings?",
    options: [
      "Hourly for all users",
      "Daily summaries for facility managers, weekly for energy managers",
      "Monthly reports only",
      "Real-time continuous reports"
    ],
    correctAnswer: 1,
    explanation: "Tailoring report frequency to user needs prevents information overload while ensuring timely access to actionable data. Daily operational summaries and weekly energy analysis provide optimal balance."
  },
  {
    id: 6,
    question: "When testing event triggers in an occupied building, what is the best practice?",
    options: [
      "Test during peak occupancy to see real conditions",
      "Never test in occupied buildings",
      "Test during non-occupied hours with proper notifications",
      "Test only simulated triggers, never real equipment"
    ],
    correctAnswer: 2,
    explanation: "Testing during non-occupied hours minimizes disruption while still validating real system behavior. Proper notifications ensure safety and inform affected parties of testing activities."
  },
  {
    id: 7,
    question: "What type of data should be prioritized in automated building performance reports?",
    options: [
      "All available data points for completeness",
      "Key performance indicators relevant to the audience",
      "Only cost information",
      "Only equipment status information"
    ],
    correctAnswer: 1,
    explanation: "Key performance indicators relevant to the specific audience provide actionable insights without overwhelming users with unnecessary data, enabling better decision-making."
  },
  {
    id: 8,
    question: "How should seasonal changes be handled in automated building control systems?",
    options: [
      "Manual adjustment of all settings each season",
      "Fixed settings year-round",
      "Calendar-based scheduling with smooth transitions",
      "Completely different systems for each season"
    ],
    correctAnswer: 2,
    explanation: "Calendar-based scheduling allows automatic seasonal adjustments while smooth transitions prevent abrupt changes that could affect occupant comfort or equipment operation."
  },
  {
    id: 9,
    question: "What is essential for maintaining automation system reliability during software updates?",
    options: [
      "Disable all automation during updates",
      "Design redundant automation paths for critical functions",
      "Perform updates only during emergencies",
      "Use only manual control systems"
    ],
    correctAnswer: 1,
    explanation: "Redundant automation paths ensure critical functions continue operating during system updates, maintenance, or component failures, maintaining building safety and comfort."
  },
  {
    id: 10,
    question: "What security measure is most important for protecting automated building control systems?",
    options: [
      "Physical locks on all equipment",
      "User authentication and encrypted communications",
      "Hiding system locations",
      "Using only wireless connections"
    ],
    correctAnswer: 1,
    explanation: "User authentication ensures only authorized personnel can modify automation, while encrypted communications protect against interception and tampering of control signals and data."
  }
];