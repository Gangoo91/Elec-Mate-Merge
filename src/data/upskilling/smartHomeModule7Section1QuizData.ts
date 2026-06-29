export const smartHomeModule7Section1QuizData = {
  questions: [
    {
      id: 1,
      question: 'What voltage do many smart home devices operate on?',
      options: [
        'Only 400V three-phase from a dedicated supply',
        'Low voltage (e.g., 12V, 24V DC) or mains 230V AC',
        'Always 5V USB power exclusively',
        'High voltage above 1000V AC',
      ],
      correctAnswer: 1,
      explanation:
        'Smart home devices can operate on either low voltage DC (12V, 24V) or mains 230V AC, depending on the device type and application.',
    },
    {
      id: 2,
      question: 'Why is polarity important for DC devices?',
      options: [
        'It determines the data transmission speed of the device',
        'It sets the wireless protocol the device will use',
        'Reverse polarity can cause permanent damage or safety hazards',
        'It controls the brightness of the device status LED',
      ],
      correctAnswer: 2,
      explanation:
        'Correct polarity is critical for DC devices as reverse polarity can damage internal components, void warranties, or create safety hazards.',
    },
    {
      id: 3,
      question: 'What type of connection do many smart relays require?',
      options: [
        'Only live and earth',
        'DC supply only',
        'Only live connection',
        'A neutral connection',
      ],
      correctAnswer: 3,
      explanation:
        'Many smart switches and relays require a neutral connection for proper operation, though some can work without neutral but with reduced functionality.',
    },
    {
      id: 4,
      question: 'What could happen if a power supply is undersized?',
      options: [
        'Device malfunction, overheating, or power supply failure',
        'The device will automatically increase its supply voltage',
        'The wireless range of the device will improve',
        'The device will draw less current to compensate',
      ],
      correctAnswer: 0,
      explanation:
        'An undersized power supply cannot provide adequate power, leading to device malfunction, overheating, voltage drops, and potentially premature failure.',
    },
    {
      id: 5,
      question: 'Why is standby consumption important to consider?',
      options: [
        'Standby power only flows when a device is switched fully off',
        'Smart devices draw power even when idle, affecting circuit loading',
        'Standby consumption has no effect on the total connected load',
        'Standby power is supplied separately from the mains circuit',
      ],
      correctAnswer: 1,
      explanation:
        'Smart devices continue to draw power for network connectivity and status monitoring even when idle, which must be considered when calculating circuit loads.',
    },
    {
      id: 6,
      question: 'Give one method of cable containment.',
      options: [
        'Hiding cables behind furniture',
        'Loose cables under floors',
        'Trunking, conduit, or cable tray',
        'Taping cables to walls',
      ],
      correctAnswer: 2,
      explanation:
        'Proper containment methods include trunking, conduit, cable tray, or other approved protective systems that meet BS 7671 requirements.',
    },
    {
      id: 7,
      question: 'How does containment improve safety?',
      options: [
        'It increases the current-carrying capacity of the cables',
        'It removes the need to test the circuit after installation',
        'It allows cables to be run without any fixings or supports',
        'It protects cables from damage and prevents accidental contact',
      ],
      correctAnswer: 3,
      explanation:
        'Containment protects cables from mechanical damage, prevents accidental contact with live parts, and supports fire resistance - all key safety benefits.',
    },
    {
      id: 8,
      question: 'Why should power and data cables be separated?',
      options: [
        'To avoid electromagnetic interference affecting data transmission',
        'To allow both cable types to share the same terminals',
        'To make the power cables carry more current',
        'To remove the need for any cable containment',
      ],
      correctAnswer: 0,
      explanation:
        'Power cables generate electromagnetic fields that can interfere with data signals, causing communication errors and reduced performance.',
    },
    {
      id: 9,
      question: 'Which regulation must UK electricians follow when wiring smart devices?',
      options: [
        'BS 5839 Fire Detection Standard',
        'BS 7671 Wiring Regulations',
        'BS 5266 Emergency Lighting Standard',
        'BS EN 60529 IP Code Standard',
      ],
      correctAnswer: 1,
      explanation:
        'BS 7671 (IET Wiring Regulations) is the UK standard that must be followed for all electrical installations, including smart home devices.',
    },
    {
      id: 10,
      question: 'In the real-world example, what wiring mistake caused flickering lights?',
      options: [
        'The power supply was rated for too high a voltage',
        'The data and power cables were run in the same trunking',
        'Smart relays installed without neutral conductors',
        'The earth conductor was connected to the wrong terminal',
      ],
      correctAnswer: 2,
      explanation:
        'The installer failed to provide neutral conductors to the smart relays, causing flickering and eventual failure until properly rewired with neutral connections.',
    },
  ],
};
