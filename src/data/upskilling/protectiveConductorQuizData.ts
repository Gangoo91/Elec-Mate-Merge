
import { QuizQuestion } from '@/types/quiz';

export const protectiveConductorQuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What does CPC continuity testing prove?",
    options: [
      "That the insulation resistance is adequate",
      "That the earth conductor is complete from origin to final point",
      "That the circuit breaker will operate correctly",
      "That the voltage drop is within limits"
    ],
    correctAnswer: 1,
    explanation: "CPC continuity testing proves that the earth conductor is complete from origin to final point, ensuring fault current has a complete return path."
  },
  {
    id: 2,
    question: "Which reading indicates a healthy CPC?",
    options: [
      "5-10 ohms resistance",
      "A low, consistent resistance (typically below 1 ohm)",
      "Infinite resistance (open circuit)",
      "Variable resistance readings"
    ],
    correctAnswer: 1,
    explanation: "A healthy CPC should show low, consistent resistance typically below 1 ohm, indicating a good continuous path."
  },
  {
    id: 3,
    question: "True or False: You can skip CPC continuity testing if the insulation resistance passes.",
    options: [
      "True - insulation resistance testing covers everything",
      "False - CPC continuity must always be tested separately",
      "True - only if the installation is less than 5 years old",
      "False - but only for new installations"
    ],
    correctAnswer: 1,
    explanation: "False. CPC continuity testing is mandatory and separate from insulation resistance testing. Each test serves a different safety purpose."
  },
  {
    id: 4,
    question: "What's the risk of not testing the bonding conductor to a gas pipe?",
    options: [
      "Increased energy bills",
      "Loss of earth potential equalisation, increasing shock risk",
      "Reduced water pressure",
      "No significant risk"
    ],
    correctAnswer: 1,
    explanation: "Without proper bonding conductor continuity, there's loss of earth potential equalisation, which significantly increases the risk of electric shock."
  },
  {
    id: 5,
    question: "Why must you zero your tester leads before taking readings?",
    options: [
      "To save battery power",
      "To avoid false high readings caused by lead resistance",
      "It's not necessary with modern testers",
      "To comply with manufacturer warranty"
    ],
    correctAnswer: 1,
    explanation: "Zeroing the leads removes the resistance of the test leads themselves from the measurement, preventing false high readings that could mask real problems."
  },
  {
    id: 6,
    question: "What is the maximum acceptable resistance for main bonding conductors?",
    options: [
      "0.05 ohms",
      "0.5 ohms",
      "1.0 ohm",
      "2.0 ohms"
    ],
    correctAnswer: 0,
    explanation: "Main bonding conductors should have resistance not exceeding 0.05 ohms to ensure effective equipotential bonding and rapid fault clearance."
  },
  {
    id: 7,
    question: "When testing CPC continuity, which method gives the most accurate results?",
    options: [
      "Testing with the circuit energised",
      "Using the highest test current available",
      "Testing with the circuit isolated and loads disconnected",
      "Testing only at the distribution board"
    ],
    correctAnswer: 2,
    explanation: "Testing with the circuit isolated and loads disconnected ensures accurate readings without interference from parallel paths or electronic equipment."
  },
  {
    id: 8,
    question: "What should you do if a supplementary bonding conductor shows high resistance?",
    options: [
      "Record it as acceptable if below 1 ohm",
      "Investigate the connection and clean/retighten as necessary",
      "Test it again with lower current",
      "Skip the test and move on"
    ],
    correctAnswer: 1,
    explanation: "High resistance in bonding conductors usually indicates poor connections. Investigation, cleaning, and retightening of connections is necessary."
  },
  {
    id: 9,
    question: "Why is the R1+R2 test important for radial circuits?",
    options: [
      "To check the insulation resistance",
      "To verify end-to-end continuity of line and CPC conductors",
      "To test RCD operation",
      "To measure the supply voltage"
    ],
    correctAnswer: 1,
    explanation: "The R1+R2 test verifies end-to-end continuity of both line and CPC conductors, ensuring a complete fault current path exists."
  },
  {
    id: 10,
    question: "What action is required if CPC continuity testing reveals an open circuit?",
    options: [
      "Continue with testing and note as limitation",
      "Reduce test current and retry",
      "Stop testing and rectify the fault before proceeding",
      "Use the neutral conductor as backup earth"
    ],
    correctAnswer: 2,
    explanation: "An open circuit CPC is extremely dangerous and must be rectified immediately before any further testing or energisation of the circuit."
  }
];
