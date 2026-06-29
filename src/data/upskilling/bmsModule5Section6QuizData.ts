import { QuizQuestion } from '@/components/quiz/types';

export const bmsModule5Section6QuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'Why is network planning essential in BMS?',
    options: [
      'To guarantee every device can run on a single power supply',
      'To ensure all devices can communicate efficiently and prevent data clashes',
      'To remove the need for any cable terminations',
      'To allow any topology to be used without restrictions',
    ],
    correctAnswer: 1,
    explanation:
      'Network planning ensures reliable communication by respecting device limits, cable lengths, and topology rules. Poor planning leads to data clashes, delays, and communication failures.',
  },
  {
    id: 2,
    question: 'What is the maximum recommended cable length for RS-485?',
    options: [
      '600m',
      '900m',
      '1200m',
      '1500m',
    ],
    correctAnswer: 2,
    explanation:
      'RS-485 has a maximum recommended cable length of approximately 1200m per segment. Beyond this distance, signal quality degrades significantly and communication becomes unreliable.',
  },
  {
    id: 3,
    question: 'How many devices can typically be on a Modbus RTU segment?',
    options: [
      'Up to 16 devices',
      'Up to 24 devices',
      'Up to 48 devices',
      'Up to 32 devices',
    ],
    correctAnswer: 3,
    explanation:
      'Modbus RTU over RS-485 typically supports up to 32 unit loads (devices) per segment. Repeaters are needed to extend beyond this limit while maintaining reliable communication.',
  },
  {
    id: 4,
    question: 'Why should RS-485 be daisy-chained rather than star-wired?',
    options: [
      'To prevent signal reflections and maintain proper impedance',
      'To reduce the total length of cable used on the installation',
      'To allow each device to have its own dedicated home run',
      'To make fault finding easier by isolating each device',
    ],
    correctAnswer: 0,
    explanation:
      'RS-485 must be daisy-chained to maintain proper 120Ω characteristic impedance and prevent signal reflections. Star wiring creates impedance mismatches that cause communication problems.',
  },
  {
    id: 5,
    question: 'What does segmentation mean in network design?',
    options: [
      'Using different cable types for different devices',
      'Breaking a large network into smaller, manageable sections',
      'Installing devices in separate buildings only',
      'Using star topology instead of daisy-chain',
    ],
    correctAnswer: 1,
    explanation:
      'Segmentation means dividing a large network into smaller sections, each with fewer devices. This reduces traffic congestion, isolates faults, and improves overall system performance.',
  },
  {
    id: 6,
    question: 'Give one benefit of segmentation in large networks.',
    options: [
      'It removes the need for cable termination resistors',
      'It eliminates the need for any protocol conversion',
      'It reduces traffic congestion and improves response times',
      'It allows cable runs of unlimited length',
    ],
    correctAnswer: 2,
    explanation:
      'Segmentation reduces traffic congestion by distributing devices across multiple network sections. This dramatically improves response times and overall system performance.',
  },
  {
    id: 7,
    question: 'What is latency in a BMS network?',
    options: [
      'The total number of devices connected to a single bus',
      'The voltage drop measured along the communications cable',
      'The data transfer rate expressed in bits per second',
      'The delay between sending a message and receiving a response',
    ],
    correctAnswer: 3,
    explanation:
      'Latency is the time delay between sending a command and receiving a response. High latency in BMS means commands take too long to execute, which can be critical in safety systems.',
  },
  {
    id: 8,
    question: 'Give one cause of high latency.',
    options: [
      'Too many devices on a single bus segment',
      'Using shielded twisted-pair communications cable',
      'Fitting termination resistors at both ends of the bus',
      'Setting all devices to the same baud rate',
    ],
    correctAnswer: 0,
    explanation:
      'Having too many devices on a single bus segment creates data bottlenecks where devices must wait their turn to communicate, significantly increasing response times and latency.',
  },
  {
    id: 9,
    question: 'How can electricians reduce interference on comms cabling?',
    options: [
      'Run comms cables tightly bundled with mains power cables',
      'Keep communications cables separate from mains power cables',
      'Use the longest possible cable runs between devices',
      'Remove the cable screen to reduce capacitance',
    ],
    correctAnswer: 1,
    explanation:
      'Electricians should maintain minimum 300mm separation between communications and power cables, especially near VSDs and motors. This prevents electromagnetic interference that can cause communication errors.',
  },
  {
    id: 10,
    question:
      'In the real-world example, what change reduced latency from 20–30 seconds to under 1 second?',
    options: [
      'Replacing all the field controllers with newer models',
      'Increasing the baud rate on the single overloaded loop',
      'Splitting the single loop into five properly terminated segments',
      'Moving the head-end server closer to the field devices',
    ],
    correctAnswer: 2,
    explanation:
      'The shopping centre project split 150+ devices from one overloaded MSTP loop into five segments of 30 devices each, with proper termination. This eliminated the communication bottleneck and restored normal response times.',
  },
];
