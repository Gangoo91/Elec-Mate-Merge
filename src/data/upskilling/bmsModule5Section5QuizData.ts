import { QuizQuestion } from '@/components/quiz/types';

export const bmsModule5Section5QuizData: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the role of a gateway in a BMS?",
    options: [
      "To provide power to all devices",
      "To convert messages from one protocol to another",
      "To store data from sensors",
      "To control lighting systems only"
    ],
    correctAnswer: 1,
    explanation: "A gateway converts messages from one protocol to another, enabling different systems to communicate through the BMS."
  },
  {
    id: 2,
    question: "Why are gateways compared to translators?",
    options: [
      "They speak multiple human languages",
      "They convert different protocol 'languages' so systems can understand each other",
      "They translate user interfaces",
      "They convert electrical signals to digital"
    ],
    correctAnswer: 1,
    explanation: "Gateways are like translators because they convert different protocol 'languages' (like BACnet, Modbus, KNX) so systems using different protocols can understand and communicate with each other."
  },
  {
    id: 3,
    question: "Give one example of a Modbus-to-BACnet gateway application.",
    options: [
      "Connecting KNX lighting to DALI ballasts",
      "Converting energy meter data from Modbus format to BACnet for BMS integration",
      "Linking two BACnet networks",
      "Converting analog signals to digital"
    ],
    correctAnswer: 1,
    explanation: "Energy meters often report data via Modbus, but the BMS operates on BACnet. A Modbus-to-BACnet gateway converts the meter data so it can be read by the BACnet BMS."
  },
  {
    id: 4,
    question: "What is the benefit of using a KNX-to-BACnet gateway?",
    options: [
      "It increases power supply voltage",
      "It allows KNX-controlled devices to appear as BACnet objects for central monitoring",
      "It reduces installation costs",
      "It eliminates the need for KNX programming"
    ],
    correctAnswer: 1,
    explanation: "A KNX-to-BACnet gateway allows KNX-controlled lighting and blinds to appear as BACnet objects, enabling central monitoring and control through the BMS."
  },
  {
    id: 5,
    question: "Why do gateways help make systems more future-proof?",
    options: [
      "They prevent devices from becoming obsolete",
      "They allow mixing devices from different vendors and adding new subsystems without replacing everything",
      "They automatically update firmware",
      "They increase system speed"
    ],
    correctAnswer: 1,
    explanation: "Gateways make systems future-proof by allowing integration of devices from different vendors and enabling new subsystems to be added later without replacing existing infrastructure."
  },
  {
    id: 6,
    question: "Where are gateways typically installed?",
    options: [
      "On the roof with other equipment",
      "In control panels or equipment rooms, close to the systems they link",
      "In user offices",
      "Outside the building"
    ],
    correctAnswer: 1,
    explanation: "Gateways are typically mounted in control panels or equipment rooms, positioned close to the systems they're linking for optimal cable runs and accessibility."
  },
  {
    id: 7,
    question: "What type of power supply do gateways often require?",
    options: [
      "240V AC mains supply",
      "Battery power only",
      "24V DC with protection",
      "No power supply needed"
    ],
    correctAnswer: 2,
    explanation: "Gateways often require 24V DC power supply with proper protection, similar to other control system devices."
  },
  {
    id: 8,
    question: "Why must gateway terminals be labelled clearly?",
    options: [
      "For aesthetics only",
      "To indicate which protocols are being converted and ensure proper maintenance",
      "To meet color coding standards",
      "To reduce installation time"
    ],
    correctAnswer: 1,
    explanation: "Clear labelling of gateway terminals is essential to indicate which protocols are being converted, making troubleshooting and future maintenance much easier."
  },
  {
    id: 9,
    question: "What should be tested on both sides of a gateway during commissioning?",
    options: [
      "Power consumption only",
      "That data is visible on both the source device and target system",
      "Physical connections only",
      "Network speed"
    ],
    correctAnswer: 1,
    explanation: "During commissioning, it's crucial to verify that data is visible on both sides - the source device (e.g., Modbus meter) and the target system (e.g., BACnet workstation)."
  },
  {
    id: 10,
    question: "In the real-world example, what wiring error prevented meters from showing up initially?",
    options: [
      "Wrong cable gauge",
      "Missing termination resistors",
      "Miswired polarity on the RS-485 bus",
      "Incorrect voltage supply"
    ],
    correctAnswer: 2,
    explanation: "In the hospital example, some meters didn't show up because electricians had miswired the polarity on the RS-485 bus, which is a common installation error."
  }
];