
export const mockExams = [
  {
    id: "level2-am2",
    title: "Level 2 - AM2 Preparation",
    description: "Comprehensive mock exam covering all Level 2 topics with emphasis on AM2 assessment preparation.",
    duration: 120,
    questionCount: 60,
    level: "Level 2",
    isPremium: false,
  },
  {
    id: "level2-unit1",
    title: "Level 2 - Unit 1 Health & Safety",
    description: "Practice exam focused on health and safety principles for electrical installation work.",
    duration: 45,
    questionCount: 30,
    level: "Level 2",
    isPremium: false,
  },
  {
    id: "level2-electrical-science",
    title: "Level 2 - Electrical Science",
    description: "Test your knowledge of electrical principles, circuits, and measurements.",
    duration: 60,
    questionCount: 40,
    level: "Level 2",
    isPremium: false,
  },
  {
    id: "level3-full",
    title: "Level 3 - Full Practice Exam",
    description: "Complete mock exam covering all Level 3 topics including electrical science and fault diagnosis.",
    duration: 180,
    questionCount: 80,
    level: "Level 3",
    isPremium: true,
  },
  {
    id: "level3-inspection",
    title: "Level 3 - Inspection & Testing",
    description: "Specialised practice test focusing on inspection, testing and commissioning procedures.",
    duration: 60,
    questionCount: 40,
    level: "Level 3",
    isPremium: true,
  },
  {
    id: "level3-fault-finding",
    title: "Level 3 - Fault Finding",
    description: "Test your diagnostic skills with common electrical installation and equipment faults.",
    duration: 75,
    questionCount: 50,
    level: "Level 3",
    isPremium: true,
  },
  {
    id: "am2-practical-prep",
    title: "AM2 - Practical Assessment Prep",
    description: "Theory questions to prepare you for the AM2 practical assessment scenarios.",
    duration: 90,
    questionCount: 45,
    level: "AM2",
    isPremium: true,
  },
  {
    id: "am2-written-assessment",
    title: "AM2 - Written Assessment Practice",
    description: "Preparation for the written assessment portion of the AM2 test.",
    duration: 60,
    questionCount: 30,
    level: "AM2",
    isPremium: true,
  },
  {
    id: "18th-edition",
    title: "18th Edition BS 7671 - Full Mock",
    description: "Complete practice exam for the 18th Edition Wiring Regulations qualification.",
    duration: 120,
    questionCount: 60,
    level: "Level 3",
    isPremium: true,
  },
  {
    id: "level4-design",
    title: "Level 4 - Electrical Design",
    description: "Advanced mock exam on electrical system design principles for experienced electricians.",
    duration: 120,
    questionCount: 50,
    level: "Level 4",
    isPremium: true,
  }
];

export const mockQuestions = [
  {
    id: 1,
    text: "According to the Electricity at Work Regulations, who is responsible for ensuring electrical safety in the workplace?",
    options: [
      "Only qualified electricians",
      "All employees who use electrical equipment",
      "Employers, self-employed persons and employees",
      "The Health and Safety Executive only"
    ],
    correctAnswer: 2,
    explanation: "The Electricity at Work Regulations 1989 place duties on employers, the self-employed and employees to ensure electrical safety in the workplace. Everyone has a responsibility for electrical safety."
  },
  {
    id: 2,
    text: "When testing a circuit with a voltage indicator, what should you do before relying on the results?",
    options: [
      "Test on a known live circuit, test the circuit under investigation, and test on a known live circuit again",
      "Just test on the circuit under investigation twice",
      "Test the circuit and confirm with a multimeter",
      "Test the circuit and ask another electrician to verify"
    ],
    correctAnswer: 0,
    explanation: "The 'prove, use, prove' method ensures the voltage indicator is working properly before and after use. This is a critical safety procedure required in the UK to guarantee your test instrument is functioning correctly."
  },
  {
    id: 3,
    text: "What is the purpose of an RCD (Residual Current Device)?",
    options: [
      "To protect against short circuits",
      "To protect against earth leakage current by monitoring imbalances between live and neutral",
      "To protect against overvoltage",
      "To protect against surge currents"
    ],
    correctAnswer: 1,
    explanation: "An RCD works by detecting an imbalance in current between the live and neutral conductors, indicating earth leakage. It is designed to disconnect quickly enough to prevent injury from electric shock."
  },
  {
    id: 4,
    text: "In the UK, which regulation sets the national standard for electrical installations?",
    options: [
      "The Electrical Equipment (Safety) Regulations",
      "BS 7671 Requirements for Electrical Installations (IET Wiring Regulations)",
      "The Health and Safety at Work Act",
      "The Building Regulations Part P"
    ],
    correctAnswer: 1,
    explanation: "BS 7671, commonly known as the IET Wiring Regulations, is the national standard in the UK for electrical installations. The current version is the 18th Edition with amendments."
  },
  {
    id: 5,
    text: "What colour is the insulation for the protective earth conductor in a fixed installation according to current UK standards?",
    options: [
      "Green",
      "Yellow",
      "Green and yellow",
      "Brown"
    ],
    correctAnswer: 2,
    explanation: "According to BS 7671, the protective earth conductor must be identified by green and yellow striped insulation throughout its length in fixed installations."
  }
];
