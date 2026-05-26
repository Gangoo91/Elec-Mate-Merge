export const bmsModule5Section4QuizData = [
  {
    id: 1,
    question: 'What does KNX stand for in building automation?',
    options: [
      "Correct connection of non-reversible plugs and socket-outlets",
      "KNX is not an acronym - it's the official name of the standard",
      "To house major network equipment and backbone terminations",
      "Ensuring only the nearest device operates during fault",
    ],
    correctAnswer: 1,
    explanation:
      "KNX is not an acronym. It's the official name of the international standard (ISO/IEC 14543) for building automation, derived from the convergence of three previous standards: EIB, EHS, and BatiBUS.",
  },
  {
    id: 2,
    question: 'Why is KNX considered vendor-neutral?',
    options: [
      'A written document describing how work will be carried out safely, step by step',
      'To ensure materials arrive when needed and in correct quantities',
      'Hundreds of manufacturers produce KNX-compatible devices following the same standard',
      'All maintainable assets with manufacturer, model, serial number, and location',
    ],
    correctAnswer: 2,
    explanation:
      'KNX is vendor-neutral because hundreds of manufacturers worldwide produce devices that comply with the KNX standard, ensuring interoperability and preventing vendor lock-in.',
  },
  {
    id: 3,
    question: 'What type of cable is typically used for KNX bus wiring?',
    options: [
      'KNX is not an acronym - it\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s the official name of the standard',
      'Up to 64 devices (including couplers)',
      'They cause signal reflections and communication errors',
      'Green-sheathed twisted pair cable certified for KNX',
    ],
    correctAnswer: 3,
    explanation:
      'KNX systems use specially certified twisted-pair cable, typically with green sheathing, designed for both power and data transmission on the KNX bus.',
  },
  {
    id: 4,
    question: 'How many devices can be connected on a single KNX line?',
    options: [
      'Up to 64 devices (including couplers)',
      'Overheating cables or nuisance tripping',
      'As part of routine maintenance records',
      'Temperature and humidity sensors',
    ],
    correctAnswer: 0,
    explanation:
      'A single KNX line can support up to 64 devices, including any couplers. This limit ensures reliable communication and proper power distribution.',
  },
  {
    id: 5,
    question: 'Why are loops not allowed in KNX topology?',
    options: [
      'Before construction information is issued',
      'They cause signal reflections and communication errors',
      'Enhanced safety measures and suitable equipment',
      'Ignition, growth, flashover, fully developed, and decay',
    ],
    correctAnswer: 1,
    explanation:
      'Loops in KNX topology cause signal reflections that corrupt data telegrams, leading to communication failures. KNX systems must use tree, line, or star topologies without loops.',
  },
  {
    id: 6,
    question: 'What voltage does the KNX bus typically operate at?',
    options: [
      '240V AC',
      '12V DC',
      '24V DC (29V nominal)',
      '48V DC',
    ],
    correctAnswer: 2,
    explanation:
      'The KNX bus operates at 24V DC (with a nominal voltage of 29V), providing both power and data communication to connected devices.',
  },
  {
    id: 7,
    question: 'Give one example of a KNX sensor device:',
    options: [
      'Blind actuator',
      'Lighting dimmer',
      'Power supply',
      'PIR occupancy detector',
    ],
    correctAnswer: 3,
    explanation:
      'A PIR occupancy detector is a KNX sensor device that detects motion and sends commands to other devices on the bus. Other sensor examples include wall switches and temperature sensors.',
  },
  {
    id: 8,
    question: 'Give one example of a KNX actuator device:',
    options: [
      'Lighting dimmer actuator',
      'Temperature sensor',
      'Wall switch',
      'Motion detector',
    ],
    correctAnswer: 0,
    explanation:
      'A lighting dimmer actuator is a KNX output device that controls lighting based on commands received from sensors or other controllers on the bus.',
  },
  {
    id: 9,
    question: 'What device links KNX lines together?',
    options: [
      'Switch',
      'Line coupler',
      'Gateway',
      'Router',
    ],
    correctAnswer: 1,
    explanation:
      'Line couplers are used to connect separate KNX lines together, allowing for system expansion beyond the 64-device limit of a single line while managing traffic between lines.',
  },
  {
    id: 10,
    question: 'In the real-world example, what wiring mistake caused communication failure?',
    options: [
      'Incorrect polarity connections',
      'Using wrong cable type',
      'Creating a loop in the bus topology',
      'Exceeding cable length limits',
    ],
    correctAnswer: 2,
    explanation:
      'The communication failure was caused by accidentally creating a loop in the bus topology, which caused signal reflections and prevented proper data communication on the entire line.',
  },
];
