export const smartHomeModule7Section1QuizData = {
  questions: [
    {
      id: 1,
      question: "What voltage do many smart home devices operate on?",
      options: [
        "230V AC only",
        "Low voltage (e.g., 12V, 24V DC) or mains 230V AC",
        "110V AC only", 
        "48V DC only"
      ],
      correctAnswer: 1,
      explanation: "Smart home devices can operate on either low voltage DC (12V, 24V) or mains 230V AC, depending on the device type and application."
    },
    {
      id: 2,
      question: "Why is polarity important for DC devices?",
      options: [
        "It only affects LED brightness",
        "It determines the device colour",
        "Reverse polarity can cause permanent damage or safety hazards",
        "It's not important for modern devices"
      ],
      correctAnswer: 2,
      explanation: "Correct polarity is critical for DC devices as reverse polarity can damage internal components, void warranties, or create safety hazards."
    },
    {
      id: 3,
      question: "What type of connection do many smart relays require?",
      options: [
        "Only live and earth",
        "A neutral connection",
        "Only live connection",
        "DC supply only"
      ],
      correctAnswer: 1,
      explanation: "Many smart switches and relays require a neutral connection for proper operation, though some can work without neutral but with reduced functionality."
    },
    {
      id: 4,
      question: "What could happen if a power supply is undersized?",
      options: [
        "The device will work more efficiently",
        "Nothing - devices adapt automatically",
        "Device malfunction, overheating, or power supply failure",
        "The device will last longer"
      ],
      correctAnswer: 2,
      explanation: "An undersized power supply cannot provide adequate power, leading to device malfunction, overheating, voltage drops, and potentially premature failure."
    },
    {
      id: 5,
      question: "Why is standby consumption important to consider?",
      options: [
        "It's not important for smart devices",
        "Smart devices draw power even when idle, affecting circuit loading",
        "It only affects battery-powered devices",
        "It reduces device lifespan"
      ],
      correctAnswer: 1,
      explanation: "Smart devices continue to draw power for network connectivity and status monitoring even when idle, which must be considered when calculating circuit loads."
    },
    {
      id: 6,
      question: "Give one method of cable containment.",
      options: [
        "Loose cables under floors",
        "Trunking, conduit, or cable tray",
        "Taping cables to walls",
        "Hiding cables behind furniture"
      ],
      correctAnswer: 1,
      explanation: "Proper containment methods include trunking, conduit, cable tray, or other approved protective systems that meet BS 7671 requirements."
    },
    {
      id: 7,
      question: "How does containment improve safety?",
      options: [
        "It makes installation faster",
        "It reduces cable costs",
        "It protects cables from damage and prevents accidental contact",
        "It improves signal quality"
      ],
      correctAnswer: 2,
      explanation: "Containment protects cables from mechanical damage, prevents accidental contact with live parts, and supports fire resistance - all key safety benefits."
    },
    {
      id: 8,
      question: "Why should power and data cables be separated?",
      options: [
        "To make identification easier",
        "To avoid electromagnetic interference affecting data transmission",
        "To reduce installation costs",
        "To comply with colour coding"
      ],
      correctAnswer: 1,
      explanation: "Power cables generate electromagnetic fields that can interfere with data signals, causing communication errors and reduced performance."
    },
    {
      id: 9,
      question: "Which regulation must UK electricians follow when wiring smart devices?",
      options: [
        "BS 5266",
        "BS 7671 Wiring Regulations",
        "BS 6701",
        "BS 8588"
      ],
      correctAnswer: 1,
      explanation: "BS 7671 (IET Wiring Regulations) is the UK standard that must be followed for all electrical installations, including smart home devices."
    },
    {
      id: 10,
      question: "In the real-world example, what wiring mistake caused flickering lights?",
      options: [
        "Wrong cable size used",
        "Incorrect polarity connections",
        "Smart relays installed without neutral conductors",
        "Overloaded circuit"
      ],
      correctAnswer: 2,
      explanation: "The installer failed to provide neutral conductors to the smart relays, causing flickering and eventual failure until properly rewired with neutral connections."
    }
  ]
};