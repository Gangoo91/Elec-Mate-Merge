import { QuizQuestion } from '@/types/quiz';

export const insulationTestMethodsQuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Which test combinations are standard for IR testing?",
    options: [
      "L–N, L–E, and N–E",
      "Only L–N and L–E",
      "Only L+N to E",
      "L–N and N–E only"
    ],
    correctAnswer: 0,
    explanation: "Standard practice requires testing L–N, L–E, and N–E separately to get complete information about insulation condition."
  },
  {
    id: 2,
    question: "What's the standard test voltage for IR on 230V circuits?",
    options: [
      "250 V DC",
      "500 V DC",
      "230 V AC",
      "1000 V DC"
    ],
    correctAnswer: 1,
    explanation: "500 V DC is the standard test voltage for circuits up to 500V, including 230V domestic circuits."
  },
  {
    id: 3,
    question: "Why must probes stay in contact during testing?",
    options: [
      "To get a higher reading",
      "To allow the reading to stabilise and detect leakage over time",
      "To prevent damage to the meter",
      "It's not necessary to maintain contact"
    ],
    correctAnswer: 1,
    explanation: "Probe contact must be maintained to allow capacitive effects to settle and obtain a stable, accurate reading of true insulation resistance."
  },
  {
    id: 4,
    question: "What should you do if IR reading is below 1 MΩ?",
    options: [
      "Record it and continue with other tests",
      "Investigate the cause and do not proceed until resolved",
      "Apply a higher test voltage",
      "Test again immediately"
    ],
    correctAnswer: 1,
    explanation: "Any reading below 1 MΩ indicates a fault that must be investigated and corrected before proceeding with further testing or energising the circuit."
  },
  {
    id: 5,
    question: "True or False: It's acceptable to test L+N to E if loads can't be disconnected.",
    options: [
      "True (but must be recorded as a limitation)",
      "False - must always test separately",
      "True - and no special recording is needed",
      "False - loads must always be disconnected"
    ],
    correctAnswer: 0,
    explanation: "True, but this variation must be documented as a limitation in your test results and the reason explained in your report."
  },
  {
    id: 6,
    question: "When testing a three-phase installation, how many IR tests are typically required?",
    options: [
      "3 tests (each phase to earth)",
      "6 tests (all phase combinations)",
      "9 tests (all conductor combinations)",
      "1 test (all phases together to earth)"
    ],
    correctAnswer: 2,
    explanation: "For three-phase installations, test all combinations: L1-L2, L1-L3, L2-L3, L1-N, L2-N, L3-N, L1-E, L2-E, L3-E (9 tests total for comprehensive checking)."
  },
  {
    id: 7,
    question: "What is the correct procedure for testing circuits with electronic ballasts?",
    options: [
      "Test with ballasts connected",
      "Disconnect ballasts and test circuit wiring only",
      "Use reduced test voltage with ballasts connected",
      "Test ballasts separately with manufacturer's procedure"
    ],
    correctAnswer: 1,
    explanation: "Electronic ballasts must be disconnected and the circuit wiring tested separately. Ballasts should be tested according to manufacturer's specific procedures if required."
  },
  {
    id: 8,
    question: "How should surge protective devices (SPDs) be handled during IR testing?",
    options: [
      "Leave connected - they won't affect results",
      "Disconnect or isolate SPDs before testing",
      "Test with SPDs but use lower voltage",
      "SPDs don't need special consideration"
    ],
    correctAnswer: 1,
    explanation: "SPDs must be disconnected or isolated before IR testing as they can provide alternative current paths and give false low readings."
  },
  {
    id: 9,
    question: "If different test methods give different results, which should be recorded?",
    options: [
      "The highest reading obtained",
      "The lowest reading obtained",
      "The average of all readings",
      "All results with explanation of methods used"
    ],
    correctAnswer: 3,
    explanation: "All results should be recorded along with detailed explanations of the different test methods used and why variations occurred."
  },
  {
    id: 10,
    question: "What is the main advantage of testing conductors individually rather than L+N to E?",
    options: [
      "It's faster to perform",
      "It identifies which specific conductor has insulation problems",
      "It gives higher readings",
      "It uses less battery power"
    ],
    correctAnswer: 1,
    explanation: "Testing conductors individually (L-N, L-E, N-E) allows precise identification of which conductor has insulation problems, enabling targeted fault finding and repair."
  }
];