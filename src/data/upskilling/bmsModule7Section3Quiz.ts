import { QuizQuestion } from '@/types/quiz';

export const bmsModule7Section3Quiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'What is the purpose of addressing in a BMS network?',
    options: [
      'To control the power consumption of devices',
      'To give each device a unique identity for communication',
      'To set the voltage levels for each device',
      'To determine the physical location of devices',
    ],
    correctAnswer: 1,
    explanation:
      'Addressing ensures each device has a unique identity so they can communicate properly without conflicts on the network.',
  },
  {
    id: 2,
    question: 'What type of ID does a BACnet device use?',
    options: [
      'Area.Line.Device format (e.g., 1.1.12)',
      'Linking physical I/O signals to software representations',
      'Device ID (and possibly IP addresses or node IDs)',
      'To give each device a unique identity for communication',
    ],
    correctAnswer: 2,
    explanation:
      'BACnet devices use Device IDs as their primary identifier, and may also use IP addresses (BACnet/IP) or node IDs (BACnet MSTP).',
  },
  {
    id: 3,
    question: 'What is the Modbus address range?',
    options: [
      '0-255',
      '0-127',
      '1-127',
      '1-247',
    ],
    correctAnswer: 3,
    explanation:
      'Modbus devices use numeric addresses in the range 1-247, with each device requiring a unique address on the network segment.',
  },
  {
    id: 4,
    question: 'How does KNX format its physical addresses?',
    options: [
      'Area.Line.Device format (e.g., 1.1.12)',
      'Line.Device format (e.g., 1.1.12)',
      'Device.Line format (e.g., 12.1)',
      'Numeric only (e.g., 112)',
    ],
    correctAnswer: 0,
    explanation:
      'KNX uses Area.Line.Device format for physical addresses (e.g., 1.1.12), indicating the area, line, and device position.',
  },
  {
    id: 5,
    question: 'What happens if two devices share the same address on a network?',
    options: [
      'They automatically reassign themselves',
      'Communication conflicts occur',
      'The newer device takes priority',
      'Both devices work normally',
    ],
    correctAnswer: 1,
    explanation:
      'When two devices share the same address, communication conflicts occur, leading to corrupted data or communication failures.',
  },
  {
    id: 6,
    question: 'What is device mapping?',
    options: [
      'It ensures sensor values appear correctly and actuators respond properly',
      'Device ID (and possibly IP addresses or node IDs)',
      'Linking physical I/O signals to software representations',
      'To give each device a unique identity for communication',
    ],
    correctAnswer: 2,
    explanation:
      'Device mapping links real-world I/O signals to their correct representation in the BMS software, ensuring proper monitoring and control.',
  },
  {
    id: 7,
    question: 'Why is device mapping important for dashboards and alarms?',
    options: [
      'To give each device a unique identity for communication',
      'Linking physical I/O signals to software representations',
      'Assign addresses systematically and label devices permanently',
      'It ensures sensor values appear correctly and actuators respond properly',
    ],
    correctAnswer: 3,
    explanation:
      'Proper device mapping ensures sensor values display correctly on dashboards and actuators respond to the right commands from the BMS.',
  },
  {
    id: 8,
    question: 'What document should be followed when mapping I/O points?',
    options: [
      'IO list',
      'Device installation manual',
      'Network topology diagram',
      'Electrical schematics',
    ],
    correctAnswer: 0,
    explanation:
      'The IO list should be followed strictly when mapping points, as it defines all inputs and outputs that need to be configured in the system.',
  },
  {
    id: 9,
    question: 'Give one best practice for addressing devices:',
    options: [
      'Linking physical I/O signals to software representations',
      'Assign addresses systematically and label devices permanently',
      'It ensures sensor values appear correctly and actuators respond properly',
      'Multiple meters had the same default address causing conflicts',
    ],
    correctAnswer: 1,
    explanation:
      'Best practice includes assigning addresses systematically (e.g., sequential numbering) and labeling each device permanently with its address.',
  },
  {
    id: 10,
    question: 'In the real-world example, why could the BMS only read one meter?',
    options: [
      'Linking physical I/O signals to software representations',
      'To give each device a unique identity for communication',
      'Multiple meters had the same default address causing conflicts',
      'Assign addresses systematically and label devices permanently',
    ],
    correctAnswer: 2,
    explanation:
      "Multiple Modbus submeters were left at their factory default address of '1', causing communication conflicts where only one meter could be read.",
  },
];
