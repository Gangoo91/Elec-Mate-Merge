export const smartHomeModule7Section1QuizData = {
  questions: [
    {
      id: 1,
      question: 'What voltage do many smart home devices operate on?',
      options: [
        'Reverse polarity can cause permanent damage or safety hazards',
        'Low voltage (e.g., 12V, 24V DC) or mains 230V AC',
        'It protects cables from damage and prevents accidental contact',
        'Device malfunction, overheating, or power supply failure',
      ],
      correctAnswer: 1,
      explanation:
        'Smart home devices can operate on either low voltage DC (12V, 24V) or mains 230V AC, depending on the device type and application.',
    },
    {
      id: 2,
      question: 'Why is polarity important for DC devices?',
      options: [
        'To avoid electromagnetic interference affecting data transmission',
        'Smart relays installed without neutral conductors',
        'Reverse polarity can cause permanent damage or safety hazards',
        'Device malfunction, overheating, or power supply failure',
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
        'Low voltage (e.g., 12V, 24V DC) or mains 230V AC',
        'Smart devices draw power even when idle, affecting circuit loading',
        'It protects cables from damage and prevents accidental contact',
      ],
      correctAnswer: 0,
      explanation:
        'An undersized power supply cannot provide adequate power, leading to device malfunction, overheating, voltage drops, and potentially premature failure.',
    },
    {
      id: 5,
      question: 'Why is standby consumption important to consider?',
      options: [
        'It protects cables from damage and prevents accidental contact',
        'Smart devices draw power even when idle, affecting circuit loading',
        'Low voltage (e.g., 12V, 24V DC) or mains 230V AC',
        'Device malfunction, overheating, or power supply failure',
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
        'To avoid electromagnetic interference affecting data transmission',
        'Smart devices draw power even when idle, affecting circuit loading',
        'Device malfunction, overheating, or power supply failure',
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
        'It protects cables from damage and prevents accidental contact',
        'Smart relays installed without neutral conductors',
        'Reverse polarity can cause permanent damage or safety hazards',
      ],
      correctAnswer: 0,
      explanation:
        'Power cables generate electromagnetic fields that can interfere with data signals, causing communication errors and reduced performance.',
    },
    {
      id: 9,
      question: 'Which regulation must UK electricians follow when wiring smart devices?',
      options: [
        'No socket outlets permitted',
        'BS 7671 Wiring Regulations',
        'For representative assessment',
        'Hole saw or knockout punch',
      ],
      correctAnswer: 1,
      explanation:
        'BS 7671 (IET Wiring Regulations) is the UK standard that must be followed for all electrical installations, including smart home devices.',
    },
    {
      id: 10,
      question: 'In the real-world example, what wiring mistake caused flickering lights?',
      options: [
        'Reverse polarity can cause permanent damage or safety hazards',
        'It protects cables from damage and prevents accidental contact',
        'Smart relays installed without neutral conductors',
        'Device malfunction, overheating, or power supply failure',
      ],
      correctAnswer: 2,
      explanation:
        'The installer failed to provide neutral conductors to the smart relays, causing flickering and eventual failure until properly rewired with neutral connections.',
    },
  ],
};
