import { QuizQuestion } from '@/components/quiz/types';

export const bmsModule5Section5QuizData: QuizQuestion[] = [
  {
    id: 1,
    question: 'What is the role of a gateway in a BMS?',
    options: [
      '±5mm for exact positioning requirements',
      'To convert messages from one protocol to another',
      'May reveal patterns or recurring issues',
      'Enhanced IP ratings, RCD protection, and bonding',
    ],
    correctAnswer: 1,
    explanation:
      'A gateway converts messages from one protocol to another, enabling different systems to communicate through the BMS.',
  },
  {
    id: 2,
    question: 'Why are gateways compared to translators?',
    options: [
      "To indicate which protocols are being converted and ensure proper maintenance",
      "It allows KNX-controlled devices to appear as BACnet objects for central monitoring",
      "They convert different protocol 'languages' so systems can understand each other",
      "That data is visible on both the source device and target system",
    ],
    correctAnswer: 2,
    explanation:
      "Gateways are like translators because they convert different protocol 'languages' (like BACnet, Modbus, KNX) so systems using different protocols can understand and communicate with each other.",
  },
  {
    id: 3,
    question: 'Give one example of a Modbus-to-BACnet gateway application.',
    options: [
      'In control panels or equipment rooms, close to the systems they link',
      'It allows KNX-controlled devices to appear as BACnet objects for central monitoring',
      'That data is visible on both the source device and target system',
      'Converting energy meter data from Modbus format to BACnet for BMS integration',
    ],
    correctAnswer: 3,
    explanation:
      'Energy meters often report data via Modbus, but the BMS operates on BACnet. A Modbus-to-BACnet gateway converts the meter data so it can be read by the BACnet BMS.',
  },
  {
    id: 4,
    question: 'What is the benefit of using a KNX-to-BACnet gateway?',
    options: [
      'It allows KNX-controlled devices to appear as BACnet objects for central monitoring',
      'Converting energy meter data from Modbus format to BACnet for BMS integration',
      'They convert different protocol \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'languages\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\' so systems can understand each other',
      'That data is visible on both the source device and target system',
    ],
    correctAnswer: 0,
    explanation:
      'A KNX-to-BACnet gateway allows KNX-controlled lighting and blinds to appear as BACnet objects, enabling central monitoring and control through the BMS.',
  },
  {
    id: 5,
    question: 'Why do gateways help make systems more future-proof?',
    options: [
      'It allows KNX-controlled devices to appear as BACnet objects for central monitoring',
      'They allow mixing devices from different vendors and adding new subsystems without replacing everything',
      'To indicate which protocols are being converted and ensure proper maintenance',
      'Converting energy meter data from Modbus format to BACnet for BMS integration',
    ],
    correctAnswer: 1,
    explanation:
      'Gateways make systems future-proof by allowing integration of devices from different vendors and enabling new subsystems to be added later without replacing existing infrastructure.',
  },
  {
    id: 6,
    question: 'Where are gateways typically installed?',
    options: [
      'To convert messages from one protocol to another',
      'That data is visible on both the source device and target system',
      'In control panels or equipment rooms, close to the systems they link',
      'They convert different protocol \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'languages\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\' so systems can understand each other',
    ],
    correctAnswer: 2,
    explanation:
      "Gateways are typically mounted in control panels or equipment rooms, positioned close to the systems they're linking for optimal cable runs and accessibility.",
  },
  {
    id: 7,
    question: 'What type of power supply do gateways often require?',
    options: [
      '240V AC mains supply',
      'Battery power only',
      'No power supply needed',
      '24V DC with protection',
    ],
    correctAnswer: 3,
    explanation:
      'Gateways often require 24V DC power supply with proper protection, similar to other control system devices.',
  },
  {
    id: 8,
    question: 'Why must gateway terminals be labelled clearly?',
    options: [
      'To indicate which protocols are being converted and ensure proper maintenance',
      'It allows KNX-controlled devices to appear as BACnet objects for central monitoring',
      'They convert different protocol \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'languages\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\' so systems can understand each other',
      'That data is visible on both the source device and target system',
    ],
    correctAnswer: 0,
    explanation:
      'Clear labelling of gateway terminals is essential to indicate which protocols are being converted, making troubleshooting and future maintenance much easier.',
  },
  {
    id: 9,
    question: 'What should be tested on both sides of a gateway during commissioning?',
    options: [
      'To indicate which protocols are being converted and ensure proper maintenance',
      'That data is visible on both the source device and target system',
      'To convert messages from one protocol to another',
      'They convert different protocol \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'languages\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\' so systems can understand each other',
    ],
    correctAnswer: 1,
    explanation:
      "During commissioning, it's crucial to verify that data is visible on both sides - the source device (e.g., Modbus meter) and the target system (e.g., BACnet workstation).",
  },
  {
    id: 10,
    question:
      'In the real-world example, what wiring error prevented meters from showing up initially?',
    options: [
      'Site supervisor or project manager',
      '7.28Ω (Zs = 0.95 × 230 / (5 × 6) = 7.283Ω)',
      'Miswired polarity on the RS-485 bus',
      'Back, neck, shoulders, arms, and legs',
    ],
    correctAnswer: 2,
    explanation:
      "In the hospital example, some meters didn't show up because electricians had miswired the polarity on the RS-485 bus, which is a common installation error.",
  },
];
