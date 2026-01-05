import { QuizQuestion } from '@/types/quiz';

export const bmsModule7Section4Quiz: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the purpose of software upload in a BMS?",
    options: [
      "To load control logic, mappings, and setpoints into controllers",
      "To update the physical wiring connections",
      "To test the network infrastructure",
      "To configure the power supply settings"
    ],
    correctAnswer: 0,
    explanation: "Software upload loads the control logic, device mappings, setpoints, and operational parameters that enable controllers to operate connected equipment."
  },
  {
    id: 2,
    question: "Name one common method for uploading software to controllers.",
    options: [
      "Wireless transmission",
      "USB connection",
      "Bluetooth pairing",
      "Infrared communication"
    ],
    correctAnswer: 1,
    explanation: "USB connection is one of the most common methods for uploading software directly from a laptop to individual controllers."
  },
  {
    id: 3,
    question: "Why must controllers be powered and stable before upload?",
    options: [
      "To reduce upload time",
      "To prevent memory corruption and upload failures",
      "To improve network speed",
      "To save battery power"
    ],
    correctAnswer: 1,
    explanation: "Stable power is essential to maintain controller memory during upload and prevent program corruption or upload failures."
  },
  {
    id: 4,
    question: "What unique identifier must each BACnet controller have?",
    options: [
      "MAC address",
      "Serial number",
      "Device ID",
      "Model number"
    ],
    correctAnswer: 2,
    explanation: "Each BACnet controller must have a unique Device ID that identifies it on the network for communication and device discovery."
  },
  {
    id: 5,
    question: "Why is time synchronisation important across BMS controllers?",
    options: [
      "To save energy",
      "To ensure accurate logging and coordinated scheduling",
      "To improve communication speed",
      "To reduce maintenance costs"
    ],
    correctAnswer: 1,
    explanation: "Time synchronisation ensures accurate data logging timestamps, coordinated equipment scheduling, and proper alarm sequencing across the system."
  },
  {
    id: 6,
    question: "What is the electrician's role during software upload?",
    options: [
      "Writing the control programs",
      "Ensuring stable power and communication infrastructure",
      "Designing the control sequences",
      "Programming the user interfaces"
    ],
    correctAnswer: 1,
    explanation: "Electricians ensure controllers have stable power, proper communication wiring, and are accessible for engineers to perform uploads safely."
  },
  {
    id: 7,
    question: "Why should controller communication ports be easily accessible?",
    options: [
      "For aesthetic reasons",
      "To enable efficient programming and troubleshooting",
      "To improve ventilation",
      "To reduce installation costs"
    ],
    correctAnswer: 1,
    explanation: "Accessible communication ports enable efficient programming, troubleshooting, and maintenance without requiring extensive panel disassembly."
  },
  {
    id: 8,
    question: "What must be tested after upload to verify correct controller setup?",
    options: [
      "Only the power consumption",
      "All I/O points and safety functions",
      "Just the network connectivity",
      "Only the user interface"
    ],
    correctAnswer: 1,
    explanation: "All I/O points must be tested to verify inputs read correctly and outputs respond properly, plus safety functions must be confirmed operational."
  },
  {
    id: 9,
    question: "In the real-world example, why did uploads fail initially?",
    options: [
      "Wrong software version",
      "Network switch failure",
      "RS-485 polarity was reversed",
      "Controller memory was full"
    ],
    correctAnswer: 2,
    explanation: "The uploads failed because RS-485 communication wiring had reversed polarity, which caused data integrity issues during complex uploads."
  },
  {
    id: 10,
    question: "What type of data is typically included in a software upload?",
    options: [
      "Only device addresses",
      "Control logic, mappings, setpoints, and schedules",
      "Just network settings",
      "Only alarm configurations"
    ],
    correctAnswer: 1,
    explanation: "Software uploads include comprehensive data: control logic sequences, device mappings, default setpoints, schedules, alarm settings, and operational parameters."
  }
];