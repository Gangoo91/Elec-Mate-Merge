import { QuizQuestion } from '@/types/quiz';

export const bmsModule7Section5Quiz: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the difference between pre-functional and functional commissioning?",
    options: [
      "Pre-functional tests basic wiring and power; functional tests complete sequences",
      "Pre-functional is done by electricians; functional is done by engineers",
      "Pre-functional tests software; functional tests hardware",
      "There is no difference between the two stages"
    ],
    correctAnswer: 0,
    explanation: "Pre-functional commissioning verifies basic electrical infrastructure (wiring, power, I/O), while functional commissioning tests complete operational sequences and system integration."
  },
  {
    id: 2,
    question: "Give one example of a pre-functional commissioning task.",
    options: [
      "Testing complete AHU startup sequences",
      "Verifying stable power supply to controllers",
      "Running building occupancy schedules",
      "Testing fire alarm integration"
    ],
    correctAnswer: 1,
    explanation: "Verifying stable power supply is a fundamental pre-functional task that must be completed before any sequence testing can begin."
  },
  {
    id: 3,
    question: "Why must power stability be checked before testing controllers?",
    options: [
      "To reduce energy consumption",
      "To prevent controller damage and ensure reliable operation",
      "To comply with building codes",
      "To improve communication speed"
    ],
    correctAnswer: 1,
    explanation: "Stable power is essential to prevent controller damage, memory corruption, and unreliable operation during testing and commissioning activities."
  },
  {
    id: 4,
    question: "What document is used to verify points during pre-functional commissioning?",
    options: [
      "Building plans",
      "IO lists and schematics",
      "User manuals",
      "Maintenance schedules"
    ],
    correctAnswer: 1,
    explanation: "IO lists and schematics provide the definitive reference for verifying that all points are wired correctly and match the design intent."
  },
  {
    id: 5,
    question: "What is tested during functional commissioning?",
    options: [
      "Only individual device operation",
      "Power supply voltage levels",
      "Complete sequences of operations and system integration",
      "Cable termination quality"
    ],
    correctAnswer: 2,
    explanation: "Functional commissioning tests complete sequences of operations, alarm responses, system integration, and overall performance according to design specifications."
  },
  {
    id: 6,
    question: "Give one example of a sequence of operation tested during functional commissioning.",
    options: [
      "Checking cable continuity",
      "Boiler plant startup and staging sequence",
      "Measuring voltage levels",
      "Testing individual sensor readings"
    ],
    correctAnswer: 1,
    explanation: "Boiler plant startup and staging sequences demonstrate complete system operation including equipment coordination, safety interlocks, and control logic."
  },
  {
    id: 7,
    question: "Why are alarm and fail-safe simulations carried out?",
    options: [
      "To test system performance under normal conditions",
      "To ensure emergency shutdowns and safety systems work correctly",
      "To calibrate sensors",
      "To verify communication protocols"
    ],
    correctAnswer: 1,
    explanation: "Alarm and fail-safe simulations verify that emergency responses, safety shutdowns, and protective systems operate correctly when needed."
  },
  {
    id: 8,
    question: "What tool should electricians use to verify signals before blaming programming?",
    options: [
      "Oscilloscope",
      "Multimeter",
      "Network analyser",
      "Thermal camera"
    ],
    correctAnswer: 1,
    explanation: "Multimeters allow electricians to verify actual signal voltages and currents, confirming whether issues are electrical or programming-related."
  },
  {
    id: 9,
    question: "Why must commissioning sheets be completed and stored?",
    options: [
      "For legal compliance only",
      "To provide documentation for O&M and future troubleshooting",
      "To satisfy insurance requirements",
      "For warranty purposes only"
    ],
    correctAnswer: 1,
    explanation: "Commissioning sheets provide essential documentation for operations, maintenance, and future troubleshooting, recording system performance and any modifications made."
  },
  {
    id: 10,
    question: "In the real-world example, why did AHU dampers fail to respond during fire testing?",
    options: [
      "Programming error in the fire alarm logic",
      "Actuator power failure",
      "Actuator wired to wrong digital output",
      "Communication network failure"
    ],
    correctAnswer: 2,
    explanation: "The actuator was wired to the wrong digital output, which worked during normal operation but failed during fire alarm sequences that used different output channels."
  }
];