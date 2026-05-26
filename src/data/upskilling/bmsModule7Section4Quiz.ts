import { QuizQuestion } from '@/types/quiz';

export const bmsModule7Section4Quiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'What is the purpose of software upload in a BMS?',
    options: [
      'To prevent memory corruption and upload failures',
      'To load control logic, mappings, and setpoints into controllers',
      'To enable efficient programming and troubleshooting',
      'To ensure accurate logging and coordinated scheduling',
    ],
    correctAnswer: 1,
    explanation:
      'Software upload loads the control logic, device mappings, setpoints, and operational parameters that enable controllers to operate connected equipment.',
  },
  {
    id: 2,
    question: 'Name one common method for uploading software to controllers.',
    options: [
      'Wireless transmission',
      'Bluetooth pairing',
      'USB connection',
      'Infrared communication',
    ],
    correctAnswer: 2,
    explanation:
      'USB connection is one of the most common methods for uploading software directly from a laptop to individual controllers.',
  },
  {
    id: 3,
    question: 'Why must controllers be powered and stable before upload?',
    options: [
      'All I/O points and safety functions',
      'Control logic, mappings, setpoints, and schedules',
      'To enable efficient programming and troubleshooting',
      'To prevent memory corruption and upload failures',
    ],
    correctAnswer: 3,
    explanation:
      'Stable power is essential to maintain controller memory during upload and prevent program corruption or upload failures.',
  },
  {
    id: 4,
    question: 'What unique identifier must each BACnet controller have?',
    options: [
      'Device ID',
      'Serial number',
      'MAC address',
      'Model number',
    ],
    correctAnswer: 0,
    explanation:
      'Each BACnet controller must have a unique Device ID that identifies it on the network for communication and device discovery.',
  },
  {
    id: 5,
    question: 'Why is time synchronisation important across BMS controllers?',
    options: [
      'To prevent memory corruption and upload failures',
      'To ensure accurate logging and coordinated scheduling',
      'Ensuring stable power and communication infrastructure',
      'To load control logic, mappings, and setpoints into controllers',
    ],
    correctAnswer: 1,
    explanation:
      'Time synchronisation ensures accurate data logging timestamps, coordinated equipment scheduling, and proper alarm sequencing across the system.',
  },
  {
    id: 6,
    question: "What is the electrician's role during software upload?",
    options: [
      'Control logic, mappings, setpoints, and schedules',
      'To ensure accurate logging and coordinated scheduling',
      'Ensuring stable power and communication infrastructure',
      'To enable efficient programming and troubleshooting',
    ],
    correctAnswer: 2,
    explanation:
      'Electricians ensure controllers have stable power, proper communication wiring, and are accessible for engineers to perform uploads safely.',
  },
  {
    id: 7,
    question: 'Why should controller communication ports be easily accessible?',
    options: [
      'Ensuring stable power and communication infrastructure',
      'To load control logic, mappings, and setpoints into controllers',
      'To prevent memory corruption and upload failures',
      'To enable efficient programming and troubleshooting',
    ],
    correctAnswer: 3,
    explanation:
      'Accessible communication ports enable efficient programming, troubleshooting, and maintenance without requiring extensive panel disassembly.',
  },
  {
    id: 8,
    question: 'What must be tested after upload to verify correct controller setup?',
    options: [
      'All I/O points and safety functions',
      'Only the power consumption',
      'Just the network connectivity',
      'Only the user interface',
    ],
    correctAnswer: 0,
    explanation:
      'All I/O points must be tested to verify inputs read correctly and outputs respond properly, plus safety functions must be confirmed operational.',
  },
  {
    id: 9,
    question: 'In the real-world example, why did uploads fail initially?',
    options: [
      'Network switch failure',
      'RS-485 polarity was reversed',
      'Controller memory was full',
      'Wrong software version',
    ],
    correctAnswer: 1,
    explanation:
      'The uploads failed because RS-485 communication wiring had reversed polarity, which caused data integrity issues during complex uploads.',
  },
  {
    id: 10,
    question: 'What type of data is typically included in a software upload?',
    options: [
      'To enable efficient programming and troubleshooting',
      'To prevent memory corruption and upload failures',
      'Control logic, mappings, setpoints, and schedules',
      'To ensure accurate logging and coordinated scheduling',
    ],
    correctAnswer: 2,
    explanation:
      'Software uploads include comprehensive data: control logic sequences, device mappings, default setpoints, schedules, alarm settings, and operational parameters.',
  },
];
