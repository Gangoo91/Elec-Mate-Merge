import type { QuizQuestion } from '@/types/quiz';

export const eventTriggersQuizData: QuizQuestion[] = [
  {
    id: 1,
    question:
      'What is the most important consideration when designing event trigger logic to prevent equipment cycling?',
    options: [
      'Avoid any delays in the system',
      'Implement appropriate time delays and hysteresis',
      'Use the fastest possible response times',
      'Make triggers as sensitive as possible',
    ],
    correctAnswer: 1,
    explanation:
      'Time delays and hysteresis prevent rapid cycling of equipment by ensuring minimum time periods between start/stop commands and providing deadband around trigger setpoints.',
  },
  {
    id: 2,
    question:
      'In a building automation system, what should have the highest priority in event trigger logic?',
    options: [
      'Energy optimization commands',
      'Occupant comfort adjustments',
      'Safety override functions',
      'Scheduled maintenance reminders',
    ],
    correctAnswer: 2,
    explanation:
      'Safety override functions must have the highest priority to ensure life safety systems can override all other automation functions during emergency conditions.',
  },
  {
    id: 3,
    question: 'What is the recommended approach for complex automation scenarios?',
    options: [
      'Create one complex trigger with many conditions',
      'Use manual control only',
      'Avoid automation for complex scenarios',
      'Break into multiple simpler triggers',
    ],
    correctAnswer: 3,
    explanation:
      'Breaking complex scenarios into multiple simpler triggers makes the logic easier to understand, test, troubleshoot, and maintain while reducing the risk of unintended interactions.',
  },
  {
    id: 4,
    question:
      'How should automated notification systems handle critical alarms if the primary notification method fails?',
    options: [
      'Use backup notification channels and escalation procedures',
      'Design redundant automation paths for critical functions',
      'Key performance indicators relevant to the audience',
      'Daily summaries for facility managers, weekly for energy managers',
    ],
    correctAnswer: 0,
    explanation:
      'Backup notification channels (SMS, mobile app, alternate email) and escalation procedures ensure critical alarms reach responsible personnel even if primary systems fail.',
  },
  {
    id: 5,
    question:
      'What is the optimal frequency for generating energy consumption reports in most commercial buildings?',
    options: [
      'User authentication and encrypted communications',
      'Daily summaries for facility managers, weekly for energy managers',
      'Key performance indicators relevant to the audience',
      'Test during non-occupied hours with proper notifications',
    ],
    correctAnswer: 1,
    explanation:
      'Tailoring report frequency to user needs prevents information overload while ensuring timely access to actionable data. Daily operational summaries and weekly energy analysis provide optimal balance.',
  },
  {
    id: 6,
    question: 'When testing event triggers in an occupied building, what is the best practice?',
    options: [
      'Test only simulated triggers, never real equipment',
      'Never test in occupied buildings',
      'Test during non-occupied hours with proper notifications',
      'Test during peak occupancy to see real conditions',
    ],
    correctAnswer: 2,
    explanation:
      'Testing during non-occupied hours minimizes disruption while still validating real system behavior. Proper notifications ensure safety and inform affected parties of testing activities.',
  },
  {
    id: 7,
    question: 'What type of data should be prioritized in automated building performance reports?',
    options: [
      'Use backup notification channels and escalation procedures',
      'Daily summaries for facility managers, weekly for energy managers',
      'Calendar-based scheduling with smooth transitions',
      'Key performance indicators relevant to the audience',
    ],
    correctAnswer: 3,
    explanation:
      'Key performance indicators relevant to the specific audience provide actionable insights without overwhelming users with unnecessary data, enabling better decision-making.',
  },
  {
    id: 8,
    question: 'How should seasonal changes be handled in automated building control systems?',
    options: [
      'Calendar-based scheduling with smooth transitions',
      'Fixed settings year-round',
      'Manual adjustment of all settings each season',
      'Completely different systems for each season',
    ],
    correctAnswer: 0,
    explanation:
      'Calendar-based scheduling allows automatic seasonal adjustments while smooth transitions prevent abrupt changes that could affect occupant comfort or equipment operation.',
  },
  {
    id: 9,
    question:
      'What is essential for maintaining automation system reliability during software updates?',
    options: [
      'Use only manual control systems',
      'Design redundant automation paths for critical functions',
      'Perform updates only during emergencies',
      'Disable all automation during updates',
    ],
    correctAnswer: 1,
    explanation:
      'Redundant automation paths ensure critical functions continue operating during system updates, maintenance, or component failures, maintaining building safety and comfort.',
  },
  {
    id: 10,
    question:
      'What security measure is most important for protecting automated building control systems?',
    options: [
      'Calendar-based scheduling with smooth transitions',
      'Break into multiple simpler triggers',
      'User authentication and encrypted communications',
      'Implement appropriate time delays and hysteresis',
    ],
    correctAnswer: 2,
    explanation:
      'User authentication ensures only authorized personnel can modify automation, while encrypted communications protect against interception and tampering of control signals and data.',
  },
];
