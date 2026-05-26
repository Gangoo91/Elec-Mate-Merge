import { QuizQuestion } from '@/components/quiz/types';

export const bmsModule1Section6QuizData: QuizQuestion[] = [
  {
    id: 1,
    question: 'Name two BMS components electricians typically install.',
    options: [
      'Network routers and switches',
      'Temperature sensors and actuators',
      'Software and databases',
      'Mechanical pumps and boilers',
    ],
    correctAnswer: 1,
    explanation:
      'Electricians are primarily responsible for installing physical BMS components such as temperature sensors, humidity sensors, actuators (for valves and dampers), controllers, and the associated wiring and containment systems.',
  },
  {
    id: 2,
    question: 'Why must mains and low-voltage cables be kept separate in BMS installations?',
    options: [
      'Commissioning engineers and controls specialists',
      'Manufacturer datasheets and wiring specifications',
      'To prevent electromagnetic interference and ensure safety',
      'It causes delays, false readings, and requires extensive fault-finding',
    ],
    correctAnswer: 2,
    explanation:
      'BS 7671 requires segregation of mains and low-voltage/data cables to prevent electromagnetic interference (EMI) that can cause false readings and system malfunctions, while also ensuring electrical safety and preventing dangerous voltage transfer.',
  },
  {
    id: 3,
    question: 'What is the primary purpose of containment in BMS wiring?',
    options: [
      'Manufacturer datasheets and wiring specifications',
      'To prevent electromagnetic interference and ensure safety',
      'False sensor readings and system malfunction',
      'To protect delicate BMS cabling and maintain signal integrity',
    ],
    correctAnswer: 3,
    explanation:
      'Containment systems (trunking, conduit, cable trays) protect sensitive BMS cables from physical damage, electromagnetic interference, and environmental factors, ensuring reliable signal transmission and system performance.',
  },
  {
    id: 4,
    question:
      'Who is typically responsible for programming and fine-tuning BMS after electrical installation?',
    options: [
      'Commissioning engineers and controls specialists',
      'Manufacturer datasheets and wiring specifications',
      'To prevent electromagnetic interference and ensure safety',
      'To protect delicate BMS cabling and maintain signal integrity',
    ],
    correctAnswer: 0,
    explanation:
      'Commissioning engineers and controls specialists handle the programming, calibration, and fine-tuning of BMS systems after electricians complete the physical installation. This requires specialised knowledge of control algorithms and system integration.',
  },
  {
    id: 5,
    question: 'Why do HVAC engineers rely heavily on electricians during BMS projects?',
    options: [
      'It significantly reduces troubleshooting time and prevents errors during maintenance',
      'Electricians install the wiring that connects HVAC equipment to the BMS controllers',
      'To protect delicate BMS cabling and maintain signal integrity',
      'It causes delays, false readings, and requires extensive fault-finding',
    ],
    correctAnswer: 1,
    explanation:
      'HVAC engineers design the mechanical systems, but electricians must correctly wire actuators, sensors, and control panels that allow the BMS to monitor and control HVAC equipment. Poor wiring can render the best HVAC design ineffective.',
  },
  {
    id: 6,
    question: 'What is a major risk of incorrect wiring in a BMS installation?',
    options: [
      'Reduced installation time',
      'Better system performance',
      'False sensor readings and system malfunction',
      'Increased energy efficiency',
    ],
    correctAnswer: 2,
    explanation:
      'Incorrect wiring can cause sensors to provide false readings, actuators to malfunction, or complete system failure. This leads to poor environmental control, energy wastage, equipment damage, and costly fault-finding and repairs.',
  },
  {
    id: 7,
    question: 'Why is proper cable labelling crucial in BMS installations?',
    options: [
      'Electricians install the wiring that connects HVAC equipment to the BMS controllers',
      'It causes delays, false readings, and requires extensive fault-finding',
      'To protect delicate BMS cabling and maintain signal integrity',
      'It significantly reduces troubleshooting time and prevents errors during maintenance',
    ],
    correctAnswer: 3,
    explanation:
      'Proper labelling allows technicians to quickly identify circuits during commissioning, maintenance, and fault-finding. Without clear labelling, troubleshooting can take hours or days, leading to system downtime and increased costs.',
  },
  {
    id: 8,
    question: 'How does poor electrical workmanship affect the commissioning process?',
    options: [
      'It causes delays, false readings, and requires extensive fault-finding',
      'Electricians install the wiring that connects HVAC equipment to the BMS controllers',
      'It significantly reduces troubleshooting time and prevents errors during maintenance',
      'To prevent electromagnetic interference and ensure safety',
    ],
    correctAnswer: 0,
    explanation:
      'Poor workmanship creates installation faults that commissioning engineers must identify and resolve before the system can be properly programmed and tested. This causes significant project delays and increased costs for fault rectification.',
  },
  {
    id: 9,
    question: 'What should electricians always check before wiring BMS devices?',
    options: [
      'Commissioning engineers and controls specialists',
      'Manufacturer datasheets and wiring specifications',
      'To prevent electromagnetic interference and ensure safety',
      'To protect delicate BMS cabling and maintain signal integrity',
    ],
    correctAnswer: 1,
    explanation:
      'Manufacturer datasheets contain critical information about voltage requirements, wiring configurations, terminal layouts, and installation specifications. Following these requirements ensures proper device operation and prevents damage or malfunction.',
  },
  {
    id: 10,
    question:
      'In the Manchester office example, what installation mistake caused climate control problems?',
    options: [
      'Using wrong cable types',
      'Insufficient cable containment',
      'Temperature sensors were miswired',
      'Missing cable labels',
    ],
    correctAnswer: 2,
    explanation:
      'Several temperature sensors were miswired, causing the BMS to receive incorrect temperature readings. This led to poor climate control as the system was making control decisions based on false data, requiring extensive fault-finding to identify and correct the wiring errors.',
  },
];
