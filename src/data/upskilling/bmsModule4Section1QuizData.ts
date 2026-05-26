import { QuizQuestion } from '@/types/quiz';

export const bmsModule4Section1QuizData: QuizQuestion[] = [
  {
    id: 1,
    question: 'What does DALI stand for?',
    options: [
      'Direct Access Lighting Interface',
      'Digital Addressable Lighting Interface',
      'Direct Analog Lighting Integration',
      'Digital Automated Light Intelligence',
    ],
    correctAnswer: 1,
    explanation:
      'DALI stands for Digital Addressable Lighting Interface, which is an international standard for intelligent lighting control that allows individual addressability of fittings on a two-wire bus.',
  },
  {
    id: 2,
    question: 'How many devices can be connected to a single DALI loop?',
    options: [
      '32 devices',
      '128 devices',
      '64 devices',
      '256 devices',
    ],
    correctAnswer: 2,
    explanation:
      'A single DALI loop can support up to 64 devices, each with a unique address allowing for individual or group control through the BMS.',
  },
  {
    id: 3,
    question: 'Why is DALI considered more flexible than traditional on/off control?',
    options: [
      'A current-carrying conductor in a magnetic field experiences a force',
      'To ensure their personal safety - no one else can remove it',
      'Manufacturing plants, factories, and heavy industry',
      'It allows individual addressing and dimming of fittings',
    ],
    correctAnswer: 3,
    explanation:
      'DALI is more flexible because it allows individual addressing and dimming of each fitting, enabling sophisticated control strategies like automatic daylight compensation and energy optimisation.',
  },
  {
    id: 4,
    question: 'What voltage range is used in 1–10V dimming systems?',
    options: [
      '1V to 10V',
      '5V to 15V',
      '0V to 5V',
      '0V to 12V',
    ],
    correctAnswer: 0,
    explanation:
      '1–10V dimming systems use a control signal ranging from 1V (minimum brightness) to 10V (maximum brightness) to adjust light output.',
  },
  {
    id: 5,
    question: "Why can't 1–10V systems report lamp failures?",
    options: [
      'Overheating, interference, equipment malfunction',
      'They use analog signals without digital feedback capability',
      'When an immediate safety hazard needs to be addressed without delay',
      'It allows operators to monitor and respond to building issues from anywhere',
    ],
    correctAnswer: 1,
    explanation:
      '1–10V systems use analog control signals and cannot provide digital feedback about individual fitting status, unlike DALI which has bidirectional digital communication.',
  },
  {
    id: 6,
    question: 'Give one example of a wireless protocol used in smart lighting.',
    options: [
      'Modbus',
      'Ethernet',
      'Zigbee',
      'RS485',
    ],
    correctAnswer: 2,
    explanation:
      'Zigbee is a common wireless protocol used in smart lighting systems, along with Bluetooth, Wi-Fi, and other wireless mesh technologies.',
  },
  {
    id: 7,
    question: 'What is one advantage of smart lighting compared to wired systems?',
    options: [
      'Lower initial cost',
      'More reliable connections',
      'Uses less electricity',
      'Easily scalable without rewiring',
    ],
    correctAnswer: 3,
    explanation:
      'Smart lighting systems are easily scalable because they use wireless communication, allowing new fittings and sensors to be added without additional control wiring.',
  },
  {
    id: 8,
    question: 'What is one potential drawback of smart lighting systems?',
    options: [
      'Dependence on IT infrastructure and potential security vulnerabilities',
      'Smaller, lighter, cheaper, and more efficient for small voltage changes',
      'Ground temperatures are more stable and higher in winter',
      'Part S (Infrastructure for electric vehicles) and Part P (Electrical Safety)',
    ],
    correctAnswer: 0,
    explanation:
      'Smart lighting systems depend on robust IT infrastructure and can be vulnerable to network security issues, requiring careful consideration of cybersecurity measures.',
  },
  {
    id: 9,
    question: 'Why must electricians separate control and mains wiring in 1–10V systems?',
    options: [
      'Issue corrected certificates',
      'To avoid electromagnetic interference',
      'Internal staircases at a comfortable angle',
      'To maintain light output and performance',
    ],
    correctAnswer: 1,
    explanation:
      'Control wiring must be kept separate from mains wiring in 1–10V systems to prevent electromagnetic interference that could affect the analog control signals.',
  },
  {
    id: 10,
    question:
      'In the real-world example, what overall energy saving was achieved by integrating different lighting protocols?',
    options: [
      '20%',
      '25%',
      '30%',
      '35%',
    ],
    correctAnswer: 2,
    explanation:
      'The London office achieved a 30% energy saving by integrating DALI, 1–10V, and smart lighting protocols through the BMS, demonstrating the effectiveness of hybrid approaches.',
  },
];
