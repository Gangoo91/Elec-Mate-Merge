import { QuizQuestion } from '@/types/quiz';

export const polarityMethodsQuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What setting do you use to test polarity on a dead circuit?",
    options: [
      "Continuity",
      "Insulation resistance", 
      "Voltage measurement",
      "Loop impedance"
    ],
    correctAnswer: 0,
    explanation: "Polarity testing is performed on dead circuits using the continuity setting on your MFT or dedicated continuity tester."
  },
  {
    id: 2,
    question: "What risk is posed by a switch connected in the neutral?",
    options: [
      "The switch won't work properly",
      "The circuit remains live when switched off",
      "Higher electricity consumption",
      "Reduced light output"
    ],
    correctAnswer: 1,
    explanation: "When a switch is connected to the neutral conductor, the circuit remains live at full voltage even when the switch is in the 'off' position, creating a serious shock hazard."
  },
  {
    id: 3,
    question: "Which part of a lampholder should be connected to the live conductor?",
    options: [
      "The screw thread",
      "The centre contact", 
      "Both parts equally",
      "The metal shell"
    ],
    correctAnswer: 1,
    explanation: "The centre contact of an Edison screw lampholder must be connected to the line conductor. This ensures the more accessible screw thread is at neutral potential."
  },
  {
    id: 4,
    question: "What reference point is typically used for polarity testing?",
    options: [
      "The nearest socket outlet",
      "The main switch",
      "The DB's outgoing line terminal",
      "The earth terminal"
    ],
    correctAnswer: 2,
    explanation: "The distribution board's outgoing line terminal is used as the reference point for polarity testing, allowing verification of correct connections throughout the circuit."
  },
  {
    id: 5,
    question: "When testing socket outlets for polarity, what should you verify?",
    options: [
      "Only that the socket works",
      "Line and neutral are not reversed",
      "The earth connection only",
      "The socket face plate is secure"
    ],
    correctAnswer: 1,
    explanation: "When testing socket outlets, you must verify that line and neutral conductors are connected to the correct terminals and not reversed."
  },
  {
    id: 6,
    question: "What test current range is typically used for polarity testing?",
    options: [
      "1-5 Amps",
      "4-200 milliamps",
      "10-20 milliamps",
      "500 milliamps to 1 amp"
    ],
    correctAnswer: 1,
    explanation: "Polarity testing uses a low test current typically between 4-200mA, which is safe for electronic components and provides reliable continuity indication."
  },
  {
    id: 7,
    question: "How should you test polarity on a two-way switching circuit?",
    options: [
      "Test only with both switches in the same position",
      "Test with switches in various positions to verify all paths",
      "Test only at the light fitting",
      "Two-way circuits don't require polarity testing"
    ],
    correctAnswer: 1,
    explanation: "Two-way switching requires testing with switches in various positions to ensure all switching combinations provide correct polarity paths to the load."
  },
  {
    id: 8,
    question: "What reading indicates correct polarity between DB line terminal and socket line terminal?",
    options: [
      "Infinite resistance (open circuit)",
      "Exactly 0 ohms",
      "Low resistance (typically <0.5Ω)",
      "High resistance (>1000Ω)"
    ],
    correctAnswer: 2,
    explanation: "Correct polarity is indicated by a low resistance reading (typically less than 0.5Ω), confirming continuity through the correct conductor path."
  },
  {
    id: 9,
    question: "When would you get an unexpected continuity reading during polarity testing?",
    options: [
      "When the circuit is correctly wired",
      "When line and neutral conductors are cross-connected",
      "When the test leads are working properly",
      "When the circuit breaker is on"
    ],
    correctAnswer: 1,
    explanation: "Unexpected continuity readings typically indicate that line and neutral conductors have been cross-connected somewhere in the circuit."
  },
  {
    id: 10,
    question: "What should you do if polarity testing reveals incorrect connections?",
    options: [
      "Energise the circuit anyway as it will still work",
      "Make a note on the certificate but proceed",
      "Correct the wiring error and retest before energisation",
      "Only fix it if the client specifically requests it"
    ],
    correctAnswer: 2,
    explanation: "Any polarity errors must be corrected immediately, and the circuit must be retested to confirm correct polarity before energisation. This is a safety requirement, not optional."
  }
];