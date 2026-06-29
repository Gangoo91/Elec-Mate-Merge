import type { QuizQuestion } from '@/types/quiz';

export const bmsModule1Section1QuizData: QuizQuestion[] = [
  {
    id: 1,
    question: 'What does BMS stand for?',
    options: [
      'Business Management Software',
      'Building Management System',
      'Basic Monitoring Service',
      'Building Maintenance Schedule',
    ],
    correctAnswer: 1,
    explanation:
      "BMS stands for Building Management System, which is the central control system for building services. It's sometimes also called a Building Automation System (BAS).",
  },
  {
    id: 2,
    question: 'Which two systems can commonly be controlled by a BMS?',
    options: [
      'Windows and doors',
      'Furniture and carpets',
      'HVAC and lighting',
      'Phones and computers',
    ],
    correctAnswer: 2,
    explanation:
      'A BMS typically controls HVAC (heating, ventilation, air conditioning) and lighting systems, along with other building services like access control and energy management.',
  },
  {
    id: 3,
    question: 'What is the main purpose of a BMS?',
    options: [
      'To replace all electrical systems',
      'To increase building construction costs',
      'To eliminate the need for maintenance',
      'To control efficiency, safety, compliance, and comfort',
    ],
    correctAnswer: 3,
    explanation:
      'The main purpose of a BMS is to improve efficiency, enhance safety, ensure compliance with regulations, and maintain occupant comfort through centralised control and monitoring.',
  },
  {
    id: 4,
    question: 'How does a BMS improve building efficiency?',
    options: [
      'It reduces energy waste through automated control based on occupancy and demand',
      'It runs all plant continuously to keep conditions perfectly stable',
      'It increases ventilation rates regardless of occupancy to improve air quality',
      'It overrides local thermostats to a fixed setpoint at all times',
    ],
    correctAnswer: 0,
    explanation:
      'A BMS improves efficiency by reducing energy waste through automated control of systems, optimising performance based on occupancy and usage patterns, and monitoring energy consumption.',
  },
  {
    id: 5,
    question: 'What role does a BMS play in compliance and safety?',
    options: [
      'It removes the legal duty to test fire and emergency systems',
      'It monitors and ensures emergency systems work to required standards',
      'It transfers responsibility for safety away from the duty holder',
      'It allows safety inspections to be carried out remotely instead',
    ],
    correctAnswer: 1,
    explanation:
      'A BMS ensures that emergency systems like fire alarms, ventilation, and emergency lighting work to required standards and helps maintain compliance with building regulations and safety codes.',
  },
  {
    id: 6,
    question: 'How does a BMS help reduce environmental impact?',
    options: [
      'It removes the need for any renewable energy generation on site',
      'It guarantees a building will be rated EPC band A automatically',
      'It optimises energy use to help buildings meet net-zero and sustainability targets',
      'It offsets carbon emissions by purchasing renewable energy certificates',
    ],
    correctAnswer: 2,
    explanation:
      'A BMS helps reduce environmental impact by optimising energy use, reducing waste, and helping buildings meet net-zero and sustainability targets through intelligent control and monitoring.',
  },
  {
    id: 7,
    question: 'How do modern BMS differ from early building control systems?',
    options: [
      'Modern systems use pneumatic actuators instead of electronics',
      'Modern systems control only a single service such as heating',
      'Modern systems operate without any central controller or network',
      'Modern systems are fully integrated and IoT-connected',
    ],
    correctAnswer: 3,
    explanation:
      'Modern BMS are fully integrated systems connected to the Internet of Things (IoT), while early systems were standalone units controlling single elements like heating.',
  },
  {
    id: 8,
    question: 'Which technological advancement has significantly improved modern BMS?',
    options: [
      'Predictive analytics and AI capabilities',
      'Higher-voltage control wiring',
      'Larger physical control panels',
      'Mechanical time-clock switching',
    ],
    correctAnswer: 0,
    explanation:
      "Predictive analytics and AI capabilities have revolutionised BMS by enabling systems to 'learn' usage patterns and optimise performance automatically, making them much smarter than traditional controls.",
  },
  {
    id: 9,
    question: 'What is a key difference between BMS and traditional controls?',
    options: [
      'Traditional controls always include remote monitoring and data logging',
      'A BMS provides centralised control rather than separate manual controls',
      'A BMS relies on independent thermostats and local time clocks',
      'Traditional controls coordinate every building service from one panel',
    ],
    correctAnswer: 1,
    explanation:
      'The key difference is that BMS provides centralised control and remote access with data-driven decision making, while traditional controls rely on manual switches, time clocks, and independent thermostats.',
  },
  {
    id: 10,
    question:
      "Why should electricians understand BMS even if they aren't directly installing them?",
    options: [
      'BMS work is reserved exclusively for specialist controls engineers',
      'BS 7671 prohibits electricians from connecting to a BMS',
      'Clients increasingly ask for systems that integrate with a BMS',
      'A BMS replaces the need for any fixed electrical wiring',
    ],
    correctAnswer: 2,
    explanation:
      'Electricians need to understand BMS because clients increasingly rely on them for energy savings and compliance, and may ask electricians to install or maintain systems that integrate into the BMS.',
  },
];
