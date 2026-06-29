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
      'Fill every available pixel with as much data as possible',
      'Use a single uniform colour to avoid distracting operators',
      'Place equipment in alphabetical rather than logical order',
      'Prioritise most critical information prominently',
    ],
    correctAnswer: 3,
    explanation:
      'Effective dashboard design follows visual hierarchy principles, placing the most critical information prominently and organising related systems logically to support quick decision-making.',
  },
  {
    id: 4,
    question: 'How should dashboard access be configured for different user roles?',
    options: [
      'Role-based access with appropriate permissions',
      'A single shared login used by everyone on site',
      'Full administrator rights granted to all users by default',
      'Access decided informally by whoever is on shift',
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
      'A single large numeric readout of the current value',
      'A pie chart of the latest meter reading',
      'Line charts with historical comparison',
      'A status indicator light showing on or off',
    ],
    correctAnswer: 2,
    explanation:
      'Line charts effectively show trends over time and allow comparison with historical data. They provide context for current consumption patterns and help identify anomalies or opportunities for optimisation.',
  },
  {
    id: 7,
    question: 'What should be considered when designing dashboards for mobile device access?',
    options: [
      'Display the full desktop layout unchanged on the smaller screen',
      'Disable all alarms because the screen is too small to show them',
      'Require the operator to zoom and scroll to reach key data',
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
      'Only when an operator submits a complaint',
      'Every week regardless of whether anything has changed',
      'Never, once the dashboard has been commissioned',
    ],
    correctAnswer: 0,
    explanation:
      'Annual reviews or reviews triggered by significant system changes ensure dashboards remain effective. Continuous monitoring of user feedback allows for minor adjustments between formal reviews.',
  },
  {
    id: 9,
    question: 'What backup strategy is most important for critical BMS dashboard functions?',
    options: [
      'Rely entirely on the cloud dashboard with no local fallback',
      'Maintain local HMI panels for critical systems',
      'Print a daily paper copy of the dashboard screen',
      'Keep a spare monitor connected to the same server',
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
      'Replacing every third-party controller with one vendor brand',
      'Displaying each system on a completely separate dashboard',
      'Implement standard protocols and data normalisation',
      'Polling all systems at the slowest device fixed rate',
    ],
    correctAnswer: 2,
    explanation:
      'Standard protocols (BACnet, Modbus, OPC) and data normalisation ensure consistent display and functionality across different systems while maintaining the ability to access individual systems for troubleshooting.',
  },
];
