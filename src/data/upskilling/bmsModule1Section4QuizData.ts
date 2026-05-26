import { QuizQuestion } from '@/types/quiz';

export const bmsModule1Section4QuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'What is the main focus of BMS in commercial offices?',
    options: [
      'Fire detection and suppression',
      'Energy efficiency, comfort, and productivity',
      'Safety and emergency response',
      'Security and access control',
    ],
    correctAnswer: 1,
    explanation:
      'In commercial offices, BMS primarily focuses on energy efficiency, comfort, and productivity by optimising HVAC and lighting systems based on occupancy patterns.',
  },
  {
    id: 2,
    question: 'How does BMS reduce maintenance costs in office buildings?',
    options: [
      'By replacing all equipment automatically',
      'By eliminating the need for maintenance staff',
      'Through remote monitoring and predictive maintenance',
      'By running systems at maximum capacity',
    ],
    correctAnswer: 2,
    explanation:
      'BMS reduces maintenance costs through remote monitoring capabilities that enable predictive maintenance, allowing issues to be identified and addressed before they become major problems.',
  },
  {
    id: 3,
    question: 'Why is BMS critical in healthcare facilities?',
    options: [
      'To reduce energy costs only',
      'To manage staff schedules',
      'To control visitor access',
      'For safety, reliability, and patient comfort',
    ],
    correctAnswer: 3,
    explanation:
      'In healthcare facilities, BMS is critical for safety, reliability, and patient comfort, particularly in maintaining strict air quality standards and ensuring critical systems remain operational.',
  },
  {
    id: 4,
    question: 'What role does BMS play in hospital operating theatres?',
    options: [
      'Maintains strict air quality standards and ventilation',
      'Energy efficiency, comfort, and productivity',
      'Through remote monitoring and predictive maintenance',
      'For safety, reliability, and patient comfort',
    ],
    correctAnswer: 0,
    explanation:
      'In operating theatres, BMS maintains strict air quality standards through controlled ventilation and humidity, which is essential for infection control and patient safety.',
  },
  {
    id: 5,
    question: 'Give one benefit of BMS in retail environments.',
    options: [
      'It automatically prioritised critical systems like operating theatres and ICU',
      'Customer comfort and cost savings through optimised lighting and temperature',
      'Maintains strict air quality standards and ventilation',
      'Because regulations and priorities differ between healthcare, retail, and commercial environments',
    ],
    correctAnswer: 1,
    explanation:
      'BMS in retail environments provides customer comfort and cost savings by automatically adjusting lighting and temperature to match store opening hours and customer flow patterns.',
  },
  {
    id: 6,
    question: 'How can BMS integrate with security systems in retail?',
    options: [
      'Customer comfort and cost savings through optimised lighting and temperature',
      'Maintains strict air quality standards and ventilation',
      'Through lighting scenes and monitoring systems to prevent theft',
      'It automatically prioritised critical systems like operating theatres and ICU',
    ],
    correctAnswer: 2,
    explanation:
      'BMS can integrate with security systems through coordinated lighting scenes and monitoring systems that help prevent theft and improve overall safety in retail environments.',
  },
  {
    id: 7,
    question: 'Name one industrial facility where BMS is commonly applied.',
    options: [
      'For safety, reliability, and patient comfort',
      'Energy efficiency, comfort, and productivity',
      'Universities, schools, and airports',
      'Factories and manufacturing plants',
    ],
    correctAnswer: 3,
    explanation:
      'Factories and manufacturing plants commonly use BMS to monitor energy use of production lines and control HVAC systems in large industrial spaces.',
  },
  {
    id: 8,
    question: 'What other type of public facility benefits from BMS?',
    options: [
      'Universities, schools, and airports',
      'Factories and manufacturing plants',
      'For safety, reliability, and patient comfort',
      'Energy efficiency, comfort, and productivity',
    ],
    correctAnswer: 0,
    explanation:
      'Universities, schools, and airports are examples of public facilities that benefit from BMS through optimised classroom and public space lighting, heating, and centralised system monitoring.',
  },
  {
    id: 9,
    question: 'Why must electricians be aware of sector-specific requirements?',
    options: [
      'Acceptable — Icn 6kA exceeds Ipf 4.2kA, satisfying Reg 432.1 breaking capacity requirement',
      'Because regulations and priorities differ between healthcare, retail, and commercial environments',
      'Learners anticipate the pattern and dismiss the positives as insincere padding around the real message',
      'Cable ducts, distribution board cupboards in basements, underground chambers, and switch rooms with restricted ventilation',
    ],
    correctAnswer: 1,
    explanation:
      'Electricians must understand sector-specific requirements because healthcare regulations differ significantly from retail or commercial environments, each having unique safety, compliance, and operational priorities.',
  },
  {
    id: 10,
    question: "In the real-world example, how did the hospital's BMS respond during a power cut?",
    options: [
      'Because regulations and priorities differ between healthcare, retail, and commercial environments',
      'Customer comfort and cost savings through optimised lighting and temperature',
      'It automatically prioritised critical systems like operating theatres and ICU',
      'Through lighting scenes and monitoring systems to prevent theft',
    ],
    correctAnswer: 2,
    explanation:
      "During the power cut, the hospital's BMS automatically prioritised critical systems such as operating theatres and intensive care units whilst notifying staff through alarms and maintaining safe conditions until full power was restored.",
  },
];
