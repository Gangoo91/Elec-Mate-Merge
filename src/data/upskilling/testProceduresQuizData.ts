
import { QuizQuestion } from '@/types/quiz';

export const testProceduresQuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What should be done before taking continuity readings?",
    options: [
      "Check the circuit is energised",
      "Null the leads using the tester's calibration function",
      "Set the tester to insulation resistance mode",
      "Connect the leads to random terminals"
    ],
    correctAnswer: 1,
    explanation: "Nulling the leads removes the resistance of the test leads themselves from the measurement, ensuring accurate readings."
  },
  {
    id: 2,
    question: "Which of the following CPC readings would generally be acceptable?",
    options: [
      "2.5 ohms on a 10m radial circuit",
      "0.4 ohms on a 20m radial circuit",
      "1.8 ohms on a 5m radial circuit",
      "3.0 ohms on any circuit"
    ],
    correctAnswer: 1,
    explanation: "0.4 ohms on a 20m radial circuit is reasonable and within expected values. The other readings are too high for their respective circuit lengths."
  },
  {
    id: 3,
    question: "True or False: It's acceptable to just write 'pass' if continuity seems fine.",
    options: [
      "True - pass/fail is sufficient for continuity testing",
      "False - actual values must always be recorded",
      "True - but only for EICR testing",
      "False - but estimates are acceptable"
    ],
    correctAnswer: 1,
    explanation: "False. Actual resistance values must always be recorded for proper assessment and future comparison. 'Pass' or tick marks are not acceptable."
  },
  {
    id: 4,
    question: "What could cause high resistance on a CPC reading?",
    options: [
      "Circuit being too long",
      "Loose terminal, damaged cable, or incorrect routing",
      "Using the wrong test instrument",
      "Testing with the circuit energised"
    ],
    correctAnswer: 1,
    explanation: "High CPC resistance typically indicates loose connections, damaged conductors, or incorrect installation. These are serious safety issues requiring investigation."
  },
  {
    id: 5,
    question: "Why must continuity issues be resolved before moving to insulation resistance testing?",
    options: [
      "To save time during testing",
      "To avoid applying test voltage to an unsafe or incomplete circuit",
      "It's not necessary - tests can be done in any order",
      "To prevent damage to the test equipment"
    ],
    correctAnswer: 1,
    explanation: "Continuity failures indicate incomplete circuits that may not be safe to energise or apply test voltages to. All continuity issues must be resolved first."
  },
  {
    id: 6,
    question: "What is the acceptable resistance range for a 2.5mm² CPC over 30 metres?",
    options: [
      "0.1 - 0.3 ohms",
      "0.4 - 0.8 ohms",
      "1.0 - 1.5 ohms",
      "2.0 - 3.0 ohms"
    ],
    correctAnswer: 1,
    explanation: "For a 2.5mm² CPC over 30m, expect approximately 0.4-0.8 ohms depending on cable type and installation conditions. Values significantly higher suggest problems."
  },
  {
    id: 7,
    question: "What test current should be used for continuity testing according to BS 7671?",
    options: [
      "10mA minimum",
      "200mA to 1A",
      "5A maximum",
      "Any current is acceptable"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 requires a test current between 200mA and 1A for continuity testing to ensure adequate current flow to identify high-resistance joints."
  },
  {
    id: 8,
    question: "How should bonding conductor resistance values be assessed?",
    options: [
      "Same criteria as CPCs",
      "Different criteria - typically ≤0.05Ω for main bonding",
      "No specific limits apply",
      "Visual inspection is sufficient"
    ],
    correctAnswer: 1,
    explanation: "Main bonding conductors have stricter resistance limits (≤0.05Ω) compared to CPCs due to their critical role in equipotential bonding."
  },
  {
    id: 9,
    question: "What action should be taken if continuity readings are inconsistent between tests?",
    options: [
      "Record the lowest reading",
      "Average the readings",
      "Investigate connections and retest until consistent",
      "Record as a limitation"
    ],
    correctAnswer: 2,
    explanation: "Inconsistent readings indicate poor connections or intermittent faults that must be investigated and resolved before accepting any test results."
  },
  {
    id: 10,
    question: "Which factor most affects the expected resistance value for continuity testing?",
    options: [
      "Ambient temperature only",
      "Conductor material, cross-sectional area, and length",
      "Installation method only",
      "Test equipment calibration"
    ],
    correctAnswer: 1,
    explanation: "Resistance is primarily determined by conductor material (copper/aluminium), cross-sectional area, and length. These factors determine the expected values for comparison."
  }
];
