import { QuizQuestion } from '@/components/quiz/types';

export const bmsModule5Section5QuizData: QuizQuestion[] = [
  {
    id: 1,
    question: 'What is the role of a gateway in a BMS?',
    options: [
      'To boost the signal voltage on long cable runs',
      'To convert messages from one protocol to another',
      'To store historical trend data for reporting',
      'To provide backup power during a mains failure',
    ],
    correctAnswer: 1,
    explanation:
      'A gateway converts messages from one protocol to another, enabling systems that speak different languages (e.g. BACnet, Modbus, KNX) to communicate through the BMS.',
  },
  {
    id: 2,
    question: 'Why are gateways compared to translators?',
    options: [
      'They store every message so it can be replayed later',
      'They split one signal into several identical copies',
      "They convert different protocol 'languages' so systems can understand each other",
      'They amplify weak signals to extend the network reach',
    ],
    correctAnswer: 2,
    explanation:
      "Gateways are like translators because they convert different protocol 'languages' (such as BACnet, Modbus and KNX) so systems using different protocols can understand and communicate with each other.",
  },
  {
    id: 3,
    question: 'Give one example of a Modbus-to-BACnet gateway application.',
    options: [
      'Connecting two BACnet controllers on the same network segment',
      'Providing a wireless link between two KNX lines',
      'Powering a group of 24V DC field sensors',
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
      'It removes the need to address KNX devices individually',
      'It supplies the KNX bus with its required operating voltage',
      'It increases the maximum cable length of the BACnet network',
    ],
    correctAnswer: 0,
    explanation:
      'A KNX-to-BACnet gateway allows KNX-controlled lighting and blinds to appear as BACnet objects, enabling central monitoring and control through the BMS.',
  },
  {
    id: 5,
    question: 'Why do gateways help make systems more future-proof?',
    options: [
      'They automatically update device firmware over the network',
      'They allow mixing devices from different vendors and adding new subsystems without replacing everything',
      'They eliminate the need for periodic commissioning checks',
      'They convert all analogue signals into a single digital standard',
    ],
    correctAnswer: 1,
    explanation:
      'Gateways make systems future-proof by allowing integration of devices from different vendors and enabling new subsystems to be added later without replacing existing infrastructure.',
  },
  {
    id: 6,
    question: 'Where are gateways typically installed?',
    options: [
      'Outdoors near the building entrance for easy access',
      'Inside the main incoming electricity meter cabinet',
      'In control panels or equipment rooms, close to the systems they link',
      'Within the ceiling void above each occupied room',
    ],
    correctAnswer: 2,
    explanation:
      "Gateways are typically mounted in control panels or equipment rooms, positioned close to the systems they're linking for shorter cable runs and easier accessibility.",
  },
  {
    id: 7,
    question: 'What type of power supply do gateways often require?',
    options: [
      '240V AC mains supply',
      'Battery power only',
      'Power over Ethernet exclusively',
      '24V DC with protection',
    ],
    correctAnswer: 3,
    explanation:
      'Gateways often require a 24V DC power supply with suitable protection, in common with many other control system field devices.',
  },
  {
    id: 8,
    question: 'Why must gateway terminals be labelled clearly?',
    options: [
      'To indicate which protocols are being converted and aid future maintenance',
      'To meet the manufacturer warranty conditions',
      'To show the operating temperature range of each terminal',
      'To record the date the gateway was commissioned',
    ],
    correctAnswer: 0,
    explanation:
      'Clear labelling of gateway terminals indicates which protocols and which networks each side connects to, making troubleshooting and future maintenance much easier.',
  },
  {
    id: 9,
    question: 'What should be tested on both sides of a gateway during commissioning?',
    options: [
      'The insulation resistance of the supply cabling',
      'That data passes correctly and is visible on both the source device and target system',
      'The ambient humidity around the enclosure',
      'The earth fault loop impedance of the panel',
    ],
    correctAnswer: 1,
    explanation:
      'During commissioning, verify that data passes correctly across the gateway and is visible on both sides - the source device (e.g. a Modbus meter) and the target system (e.g. a BACnet workstation).',
  },
  {
    id: 10,
    question:
      'In the real-world example, what wiring error prevented meters from showing up initially?',
    options: [
      'The supply fuse to the gateway was the wrong rating',
      'The data cable was run alongside a mains cable causing interference',
      'Miswired polarity on the RS-485 bus',
      'The gateway was set to the wrong baud rate',
    ],
    correctAnswer: 2,
    explanation:
      "In the hospital example, some meters didn't appear because the RS-485 bus polarity (A/B data lines) had been miswired, which is a common installation error on serial networks.",
  },
];
