import { QuizQuestion } from '@/types/quiz';

export const bmsModule7Section4Quiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'What is the purpose of software upload in a BMS?',
    options: [
      'To increase the supply voltage delivered to field devices',
      'To load control logic, mappings, and setpoints into controllers',
      'To physically rewire the inputs and outputs on the controller',
      'To replace the controller firmware with the manufacturer operating system',
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
      'To allow the controller to drive its outputs during the transfer',
      'To let the engineer view live sensor readings while uploading',
      'To keep the network switch from dropping the connection',
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
      'It reduces the electrical load drawn by each controller',
      'To ensure accurate logging and coordinated scheduling',
      'It removes the need to assign each controller a unique address',
      'It increases the speed of the communication network',
    ],
    correctAnswer: 1,
    explanation:
      'Time synchronisation ensures accurate data logging timestamps, coordinated equipment scheduling, and proper alarm sequencing across the system.',
  },
  {
    id: 6,
    question: "What is the electrician's role during software upload?",
    options: [
      'Writing the control logic sequences for the engineer',
      'Setting the temperature and schedule setpoints in software',
      'Ensuring stable power and communication infrastructure',
      'Assigning BACnet Device IDs to each controller on the network',
    ],
    correctAnswer: 2,
    explanation:
      'Electricians ensure controllers have stable power, proper communication wiring, and are accessible for engineers to perform uploads safely.',
  },
  {
    id: 7,
    question: 'Why should controller communication ports be easily accessible?',
    options: [
      'To improve natural ventilation and cooling of the controller',
      'To reduce the length of the field wiring to sensors',
      'To allow the controller to be powered from the port',
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
      'Historical trend logs collected from the controller',
      'The mains supply waveform measured at the panel',
      'Control logic, mappings, setpoints, and schedules',
      'The physical wiring diagram for the field devices',
    ],
    correctAnswer: 2,
    explanation:
      'Software uploads include comprehensive data: control logic sequences, device mappings, default setpoints, schedules, alarm settings, and operational parameters.',
  },
];
