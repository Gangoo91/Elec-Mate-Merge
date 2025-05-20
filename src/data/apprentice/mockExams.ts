
export const mockExams = [
  {
    id: "level2-am2",
    title: "Level 2 - AM2 Practice Exam",
    description: "Comprehensive practice exam covering all Level 2 topics with an emphasis on AM2 assessment preparation.",
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
    description: "Specialized practice test focusing on inspection, testing and commissioning procedures.",
    duration: 60,
    questionCount: 40,
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
    explanation: "The Electricity at Work Regulations 1989 place duties on employers, the self-employed and employees to ensure electrical safety in the workplace."
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
    explanation: "The 'prove, use, prove' method ensures the voltage indicator is working properly before and after use."
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
    explanation: "An RCD works by detecting an imbalance in current between the live and neutral conductors, indicating earth leakage."
  }
];
