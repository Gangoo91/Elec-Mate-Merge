import type { QuizQuestion } from '@/types/quiz';

export const bmsDashboardsQuizData: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the recommended screen refresh rate for critical alarm displays on BMS dashboards?",
    options: [
      "Every 60 seconds",
      "Immediate/real-time",
      "Every 5 minutes",
      "Every 30 seconds"
    ],
    correctAnswer: 1,
    explanation: "Critical alarms should update immediately or in real-time to ensure operators can respond quickly to emergency situations. Non-critical data can use longer refresh intervals."
  },
  {
    id: 2,
    question: "Which colour coding standard is most appropriate for BMS dashboard elements?",
    options: [
      "Blue for alarms, green for warnings",
      "Red for alarms, amber for warnings, green for normal",
      "Purple for critical, yellow for normal",
      "Any colours as long as they're consistent"
    ],
    correctAnswer: 1,
    explanation: "Industry standard colour coding uses red for alarms/critical conditions, amber for warnings, and green for normal operation. This follows universal conventions for safety and operational displays."
  },
  {
    id: 3,
    question: "What is the primary principle for designing effective BMS dashboard layouts?",
    options: [
      "Include as much information as possible",
      "Use complex graphics to impress users",
      "Prioritise most critical information prominently",
      "Make all text very large"
    ],
    correctAnswer: 2,
    explanation: "Effective dashboard design follows visual hierarchy principles, placing the most critical information prominently and organizing related systems logically to support quick decision-making."
  },
  {
    id: 4,
    question: "How should dashboard access be configured for different user roles?",
    options: [
      "All users get full access",
      "Role-based access with appropriate permissions",
      "Password protection only",
      "Time-based access restrictions"
    ],
    correctAnswer: 1,
    explanation: "Role-based access control ensures users see appropriate information levels: operators need real-time monitoring, supervisors need configuration access, and managers need high-level reporting."
  },
  {
    id: 5,
    question: "What is the best practice for handling multiple simultaneous alarms on dashboards?",
    options: [
      "Display all alarms equally",
      "Show only the first alarm",
      "Implement alarm prioritisation and grouping",
      "Hide alarms until acknowledged"
    ],
    correctAnswer: 2,
    explanation: "Alarm prioritisation (critical, high, medium, low) and grouping related equipment alarms prevents alarm overload and helps operators focus on the most important issues first."
  },
  {
    id: 6,
    question: "Which data visualisation technique is most effective for showing energy consumption trends?",
    options: [
      "Static text displays",
      "Line charts with historical comparison",
      "Flashing indicators",
      "Complex 3D graphics"
    ],
    correctAnswer: 1,
    explanation: "Line charts effectively show trends over time and allow comparison with historical data. They provide context for current consumption patterns and help identify anomalies or opportunities for optimization."
  },
  {
    id: 7,
    question: "What should be considered when designing dashboards for mobile device access?",
    options: [
      "Use exactly the same layout as desktop",
      "Only show text information",
      "Implement responsive design with prioritised information",
      "Disable mobile access entirely"
    ],
    correctAnswer: 2,
    explanation: "Mobile dashboards need responsive design that prioritises critical information for smaller screens, uses touch-friendly controls, and may require mobile-specific layouts for optimal usability."
  },
  {
    id: 8,
    question: "How often should BMS dashboard designs be formally reviewed?",
    options: [
      "Never, once designed",
      "Every month",
      "Annually or when systems change significantly",
      "Only when problems occur"
    ],
    correctAnswer: 2,
    explanation: "Annual reviews or reviews triggered by significant system changes ensure dashboards remain effective. Continuous monitoring of user feedback allows for minor adjustments between formal reviews."
  },
  {
    id: 9,
    question: "What backup strategy is most important for critical BMS dashboard functions?",
    options: [
      "Print all screens daily",
      "Maintain local HMI panels for critical systems",
      "Use only cloud-based solutions",
      "Train operators to work without any displays"
    ],
    correctAnswer: 1,
    explanation: "Local HMI panels provide essential backup access to critical systems when network dashboards fail. Combined with mobile access and documented emergency procedures, this ensures operational continuity."
  },
  {
    id: 10,
    question: "When integrating third-party systems into unified dashboards, what is the most important consideration?",
    options: [
      "Use proprietary protocols only",
      "Ensure all systems look identical",
      "Implement standard protocols and data normalisation",
      "Avoid integration entirely"
    ],
    correctAnswer: 2,
    explanation: "Standard protocols (BACnet, Modbus, OPC) and data normalisation ensure consistent display and functionality across different systems while maintaining the ability to access individual systems for troubleshooting."
  }
];