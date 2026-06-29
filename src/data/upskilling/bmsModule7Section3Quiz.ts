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
      'Addressing gives each device a unique identity so they can communicate without conflicts on the shared network.',
  },
  {
    id: 2,
    question: 'What type of ID does a BACnet device use?',
    options: [
      'A KNX Area.Line.Device address',
      'A 48-bit hardware MAC address only',
      'A Device ID (and possibly IP addresses or node IDs)',
      'A sequential Modbus register number',
    ],
    correctAnswer: 2,
    explanation:
      'BACnet devices use a unique Device Instance ID as their primary identifier, and may also use IP addresses (BACnet/IP) or MAC node IDs (BACnet MS/TP).',
  },
  {
    id: 3,
    question: 'What is the valid Modbus slave address range?',
    options: [
      '0-255',
      '0-127',
      '1-127',
      '1-247',
    ],
    correctAnswer: 3,
    explanation:
      'Modbus slave devices use numeric addresses in the range 1-247 (0 is reserved for broadcast), with each device requiring a unique address on the segment.',
  },
  {
    id: 4,
    question: 'How does KNX format its physical addresses?',
    options: [
      'Area.Line.Device format (e.g., 1.1.12)',
      'Line.Device format (e.g., 1.12)',
      'Device.Line format (e.g., 12.1)',
      'Numeric only (e.g., 112)',
    ],
    correctAnswer: 0,
    explanation:
      'KNX uses an Area.Line.Device physical address format (e.g. 1.1.12), identifying the area, the line within it and the device position on that line.',
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
      'When two devices share the same address, communication conflicts occur, leading to corrupted data or devices that cannot be read reliably.',
  },
  {
    id: 6,
    question: 'What is device mapping?',
    options: [
      'Recording the GPS coordinates of each field device',
      'Assigning a unique network address to each device',
      'Linking physical I/O signals to their software representations',
      'Scheduling when each device powers on and off',
    ],
    correctAnswer: 2,
    explanation:
      'Device mapping links real-world I/O signals (sensors and actuators) to their correct representation in the BMS software, enabling proper monitoring and control.',
  },
  {
    id: 7,
    question: 'Why is device mapping important for dashboards and alarms?',
    options: [
      'It reduces the network bandwidth each device uses',
      'It assigns each device a permanent physical address',
      'It removes the need for separate commissioning checks',
      'It ensures sensor values appear correctly and actuators respond properly',
    ],
    correctAnswer: 3,
    explanation:
      'Correct device mapping ensures sensor values display on the right dashboard points and alarms, and that commands reach the correct actuators.',
  },
  {
    id: 8,
    question: 'What document should be followed when mapping I/O points?',
    options: [
      'The I/O list (points schedule)',
      'The device installation manual',
      'The network topology diagram',
      'The electrical schematics',
    ],
    correctAnswer: 0,
    explanation:
      'The I/O list (points schedule) should be followed strictly when mapping, as it defines every input and output that must be configured in the system.',
  },
  {
    id: 9,
    question: 'Give one best practice for addressing devices:',
    options: [
      'Leave all devices at their factory default address',
      'Assign addresses systematically and label devices permanently',
      'Reuse the same address across different network segments',
      'Address devices only after the system is fully live',
    ],
    correctAnswer: 1,
    explanation:
      'Good practice is to assign addresses systematically (e.g. sequential numbering) and to label each device permanently with its address for future maintenance.',
  },
  {
    id: 10,
    question: 'In the real-world example, why could the BMS only read one meter?',
    options: [
      'The meters were wired to the wrong supply phase',
      'The data cable polarity had been reversed',
      'Multiple meters had the same default address causing conflicts',
      'The gateway baud rate did not match the meters',
    ],
    correctAnswer: 2,
    explanation:
      "Multiple Modbus submeters were left at their factory default address of '1', causing conflicts so that only one meter could be read at a time.",
  },
];
