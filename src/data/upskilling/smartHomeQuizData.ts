import type { QuizQuestion } from '@/types/quiz';

export const smartHomeQuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'What is the definition of a smart home according to modern standards?',
    options: [
      'Any home fitted with a broadband internet connection',
      'A residence that uses interconnected devices and systems to automate, monitor, and control functions',
      'A home where all appliances are controlled by physical switches',
      'A property built to the latest energy efficiency building regulations',
    ],
    correctAnswer: 1,
    explanation:
      'A smart home integrates interconnected devices and systems to provide automation, monitoring, and control capabilities for lighting, heating, security, and other functions through various communication protocols.',
  },
  {
    id: 2,
    question:
      'Which communication protocol is most commonly used for smart home device interconnection?',
    options: [
      'RS-232 serial connections',
      'Analogue telephone lines',
      'Zigbee and Z-Wave mesh networks',
      'Power-line carrier signalling only',
    ],
    correctAnswer: 2,
    explanation:
      'Zigbee and Z-Wave are the most common communication protocols used in smart homes due to their mesh networking capabilities, low power consumption, and reliability for home automation.',
  },
  {
    id: 3,
    question: 'What are the three core component categories of a smart home system?',
    options: [
      'Wi-Fi, Bluetooth, and cellular',
      'Hardware, software, and internet',
      'Sensors, actuators, and displays',
      'Devices, protocols, and interfaces',
    ],
    correctAnswer: 3,
    explanation:
      'Smart home systems consist of smart devices (sensors, actuators, hubs), communication protocols (Zigbee, Z-Wave, Wi-Fi), and control interfaces (smartphones, tablets, voice assistants).',
  },
  {
    id: 4,
    question: 'What is the primary energy management benefit of smart home systems?',
    options: [
      'Optimised energy use through intelligent automation and scheduling',
      'Manual control of all electrical devices',
      'Increased energy consumption monitoring',
      'Higher electricity consumption tracking',
    ],
    correctAnswer: 0,
    explanation:
      'Smart homes enable optimised energy use through intelligent controls like smart thermostats, automated lighting schedules, and load management, which can significantly reduce overall energy consumption.',
  },
  {
    id: 5,
    question:
      'Which accessibility feature makes smart homes particularly beneficial for elderly or disabled users?',
    options: [
      'Complex control panel systems',
      'Voice control and automated assistance features',
      'Manual switches and traditional controls',
      'Reduced device functionality',
    ],
    correctAnswer: 1,
    explanation:
      'Voice control and automated assistance features make smart homes particularly beneficial for elderly or disabled users who may have difficulty with traditional manual controls.',
  },
  {
    id: 6,
    question: 'What is a significant challenge in smart home adoption?',
    options: [
      'A complete absence of any wireless protocols',
      'The legal requirement to rewire the whole property',
      'Interoperability issues between different manufacturer systems',
      'Smart devices being unable to connect to any network',
    ],
    correctAnswer: 2,
    explanation:
      'Interoperability issues between different manufacturer systems remain a significant challenge, though new standards like Matter are working to address this problem.',
  },
  {
    id: 7,
    question: 'What security consideration is most important in smart home implementation?',
    options: [
      'Traditional alarm systems',
      'Physical lock mechanisms only',
      'Manual security monitoring',
      'Network security and data privacy protection',
    ],
    correctAnswer: 3,
    explanation:
      'Network security and data privacy protection are crucial in smart homes as connected devices can be vulnerable to cyber attacks and data breaches if not properly secured.',
  },
  {
    id: 8,
    question: 'Which smart home system provides the most immediate safety benefits?',
    options: [
      'Integrated security and monitoring systems',
      'Automated curtain and blind controllers',
      'Voice-controlled entertainment systems',
      'Smart lighting mood and scene presets',
    ],
    correctAnswer: 0,
    explanation:
      'Integrated security and monitoring systems provide immediate safety benefits through features like CCTV, smart locks, motion sensors, and emergency alert systems.',
  },
  {
    id: 9,
    question: 'What is the typical approach for existing homes to become smart homes?',
    options: [
      'Installation of single-brand ecosystems only',
      'Gradual retrofit with compatible devices and systems',
      'Building demolition and reconstruction',
      'Complete electrical system replacement',
    ],
    correctAnswer: 1,
    explanation:
      'Most existing homes become smart through gradual retrofit approaches, adding compatible devices and systems over time rather than complete system replacement.',
  },
  {
    id: 10,
    question: 'What role does artificial intelligence play in advanced smart home systems?',
    options: [
      'Supplying mains power to all connected devices',
      'Replacing the need for any physical sensors',
      'Learning user patterns and predictive automation',
      'Generating the wireless signal for the home network',
    ],
    correctAnswer: 2,
    explanation:
      'AI in smart homes enables learning user patterns, predictive automation, adaptive climate control, and personalised automation based on habits and preferences.',
  },
];
