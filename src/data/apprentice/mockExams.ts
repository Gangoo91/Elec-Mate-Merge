export const mockExams = [
  {
    id: "level2",
    title: "Level 2 Electrical Installation",
    description: "Comprehensive mock exam covering all Level 2 electrical installation topics including theory, practical knowledge and regulations.",
    duration: 60,
    questionCount: 50,
    level: "Level 2",
    isPremium: false,
  },
  {
    id: "level3",
    title: "Level 3 Electrical Installation",
    description: "Complete mock exam covering advanced Level 3 topics including electrical principles, fault diagnosis and installation techniques.",
    duration: 60,
    questionCount: 50,
    level: "Level 3",
    isPremium: false,
  },
  {
    id: "inspection-testing",
    title: "Inspection & Testing",
    description: "Specialised exam focusing on inspection, testing and commissioning procedures for electrical installations.",
    duration: 60,
    questionCount: 50,
    level: "Level 3",
    isPremium: false,
  },
  {
    id: "18th-edition",
    title: "18th Edition BS 7671",
    description: "Complete practice exam for the 18th Edition Wiring Regulations qualification covering all chapters.",
    duration: 60,
    questionCount: 50,
    level: "Level 3",
    isPremium: false,
  },
  {
    id: "am2",
    title: "AM2 Assessment Preparation",
    description: "Theory questions to prepare you for the AM2 practical assessment scenarios and written exam.",
    duration: 60,
    questionCount: 50,
    level: "AM2",
    isPremium: false,
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

// Generate 45 more sample questions to reach 50 total
for (let i = 6; i <= 50; i++) {
  mockQuestions.push({
    id: i,
    text: `Sample question ${i} for demonstration purposes. This would be replaced with real electrical exam content.`,
    options: [
      "Option A - Sample answer choice",
      "Option B - Sample answer choice",
      "Option C - Sample answer choice",
      "Option D - Sample answer choice"
    ],
    correctAnswer: Math.floor(Math.random() * 4),
    explanation: "This is a placeholder explanation for the correct answer. In a real exam, this would provide detailed information about why the answer is correct."
  });
}
