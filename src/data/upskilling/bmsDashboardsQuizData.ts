import type { QuizQuestion } from '@/types/quiz';

export const bmsDashboardsQuizData: QuizQuestion[] = [
  {
    id: 1,
    question:
      'What is the recommended screen refresh rate for critical alarm displays on BMS dashboards?',
    options: [
      'Every 30 seconds',
      'Immediate/real-time',
      'Every 60 seconds',
      'Every 5 minutes',
    ],
    correctAnswer: 1,
    explanation:
      'Critical alarms should update immediately or in real-time to ensure operators can respond quickly to emergency situations. Non-critical data can use longer refresh intervals.',
  },
  {
    id: 2,
    question: 'Which colour coding standard is most appropriate for BMS dashboard elements?',
    options: [
      'Blue for alarms, green for warnings',
      'Purple for critical, yellow for normal',
      'Red for alarms, amber for warnings, green for normal',
      "Any colours as long as they're consistent",
    ],
    correctAnswer: 2,
    explanation:
      'Industry standard colour coding uses red for alarms/critical conditions, amber for warnings, and green for normal operation. This follows universal conventions for safety and operational displays.',
  },
  {
    id: 3,
    question: 'What is the primary principle for designing effective BMS dashboard layouts?',
    options: [
      'Implement alarm prioritisation and grouping',
      'Role-based access with appropriate permissions',
      'Line charts with historical comparison',
      'Prioritise most critical information prominently',
    ],
    correctAnswer: 3,
    explanation:
      'Effective dashboard design follows visual hierarchy principles, placing the most critical information prominently and organizing related systems logically to support quick decision-making.',
  },
  {
    id: 4,
    question: 'How should dashboard access be configured for different user roles?',
    options: [
      'Role-based access with appropriate permissions',
      'Prioritise most critical information prominently',
      'Red for alarms, amber for warnings, green for normal',
      'Implement alarm prioritisation and grouping',
    ],
    correctAnswer: 0,
    explanation:
      'Role-based access control ensures users see appropriate information levels: operators need real-time monitoring, supervisors need configuration access, and managers need high-level reporting.',
  },
  {
    id: 5,
    question: 'What is the best practice for handling multiple simultaneous alarms on dashboards?',
    options: [
      'Display all alarms equally',
      'Implement alarm prioritisation and grouping',
      'Show only the first alarm',
      'Hide alarms until acknowledged',
    ],
    correctAnswer: 1,
    explanation:
      'Alarm prioritisation (critical, high, medium, low) and grouping related equipment alarms prevents alarm overload and helps operators focus on the most important issues first.',
  },
  {
    id: 6,
    question:
      'Which data visualisation technique is most effective for showing energy consumption trends?',
    options: [
      'Prioritise most critical information prominently',
      'Implement alarm prioritisation and grouping',
      'Line charts with historical comparison',
      'Annually or when systems change significantly',
    ],
    correctAnswer: 2,
    explanation:
      'Line charts effectively show trends over time and allow comparison with historical data. They provide context for current consumption patterns and help identify anomalies or opportunities for optimization.',
  },
  {
    id: 7,
    question: 'What should be considered when designing dashboards for mobile device access?',
    options: [
      'Annually or when systems change significantly',
      'Prioritise most critical information prominently',
      'Red for alarms, amber for warnings, green for normal',
      'Implement responsive design with prioritised information',
    ],
    correctAnswer: 3,
    explanation:
      'Mobile dashboards need responsive design that prioritises critical information for smaller screens, uses touch-friendly controls, and may require mobile-specific layouts for optimal usability.',
  },
  {
    id: 8,
    question: 'How often should BMS dashboard designs be formally reviewed?',
    options: [
      'Annually or when systems change significantly',
      'Line charts with historical comparison',
      'Implement responsive design with prioritised information',
      'Role-based access with appropriate permissions',
    ],
    correctAnswer: 0,
    explanation:
      'Annual reviews or reviews triggered by significant system changes ensure dashboards remain effective. Continuous monitoring of user feedback allows for minor adjustments between formal reviews.',
  },
  {
    id: 9,
    question: 'What backup strategy is most important for critical BMS dashboard functions?',
    options: [
      'Role-based access with appropriate permissions',
      'Maintain local HMI panels for critical systems',
      'Line charts with historical comparison',
      'Red for alarms, amber for warnings, green for normal',
    ],
    correctAnswer: 1,
    explanation:
      'Local HMI panels provide essential backup access to critical systems when network dashboards fail. Combined with mobile access and documented emergency procedures, this ensures operational continuity.',
  },
  {
    id: 10,
    question:
      'When integrating third-party systems into unified dashboards, what is the most important consideration?',
    options: [
      'Maintain local HMI panels for critical systems',
      'Prioritise most critical information prominently',
      'Implement standard protocols and data normalisation',
      'Line charts with historical comparison',
    ],
    correctAnswer: 2,
    explanation:
      'Standard protocols (BACnet, Modbus, OPC) and data normalisation ensure consistent display and functionality across different systems while maintaining the ability to access individual systems for troubleshooting.',
  },
];
