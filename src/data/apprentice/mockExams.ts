export const mockExams = [
  {
    id: 'level2-am2',
    title: 'Level 2 - AM2 Practice Exam',
    description:
      'Comprehensive practice exam covering all Level 2 topics with an emphasis on AM2 assessment preparation.',
    duration: 120,
    questionCount: 60,
    level: 'Level 2',
    isPremium: false,
  },
  {
    id: 'level2-unit1',
    title: 'Level 2 - Unit 1 Health & Safety',
    description:
      'Practice exam focused on health and safety principles for electrical installation work.',
    duration: 45,
    questionCount: 30,
    level: 'Level 2',
    isPremium: false,
  },
  {
    id: 'level3-full',
    title: 'Level 3 - Full Practice Exam',
    description:
      'Complete mock exam covering all Level 3 topics including electrical science and fault diagnosis.',
    duration: 180,
    questionCount: 80,
    level: 'Level 3',
    isPremium: true,
  },
  {
    id: 'level3-inspection',
    title: 'Level 3 - Inspection & Testing',
    description:
      'Specialised practice test focusing on inspection, testing and commissioning procedures.',
    duration: 60,
    questionCount: 40,
    level: 'Level 3',
    isPremium: true,
  },
  {
    id: 'level4-design',
    title: 'Level 4 - Electrical Design',
    description:
      'Advanced mock exam on electrical system design principles for experienced electricians.',
    duration: 120,
    questionCount: 50,
    level: 'Level 4',
    isPremium: true,
  },
];

export const mockQuestions = [
  {
    id: 1,
    text: 'According to the Electricity at Work Regulations, who is responsible for ensuring electrical safety in the workplace?',
    options: [
      'The Health and Safety Executive only',
      'Employers, self-employed persons and employees',
      'Only qualified electricians',
      'All employees who use electrical equipment',
    ],
    correctAnswer: 1,
    explanation:
      'The Electricity at Work Regulations 1989 place duties on employers, the self-employed and employees to ensure electrical safety in the workplace.',
  },
  {
    id: 2,
    text: 'When testing a circuit with a voltage indicator, what should you do before relying on the results?',
    options: [
      'To ensure immediate activation when normal lighting fails, without requiring human intervention',
      'L -> fault -> cpc -> MET -> earth electrode -> earth (soil) -> DNO supply electrode -> back to transformer',
      'Test on a known live circuit, test the circuit under investigation, and test on a known live circuit again',
      'Do NOT touch the tower; warn others to stay clear; call the network operator and emergency services; do not approach until confirmed safe',
    ],
    correctAnswer: 2,
    explanation:
      "The 'prove, use, prove' method ensures the voltage indicator is working properly before and after use.",
  },
  {
    id: 3,
    text: 'What is the purpose of an RCD (Residual Current Device)?',
    options: [
      'Profits are taxed at Corporation Tax rates before being distributed',
      'A current transient (spike) occurs at the star-to-delta changeover point',
      'Reverse the lifting technique — bend the knees and hips, keep the back straight',
      'To protect against earth leakage current by monitoring imbalances between live and neutral',
    ],
    correctAnswer: 3,
    explanation:
      'An RCD works by detecting an imbalance in current between the live and neutral conductors, indicating earth leakage.',
  },
];
