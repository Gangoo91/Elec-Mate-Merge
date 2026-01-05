import { QuizQuestion } from '@/types/quiz';

export const polarityPurposeQuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Why is polarity testing essential before energising a circuit?",
    options: [
      "To ensure switches and protective devices operate on the line conductor",
      "To check the insulation resistance",
      "To verify earth continuity",
      "To measure voltage levels"
    ],
    correctAnswer: 0,
    explanation: "Polarity testing ensures switches and protective devices are correctly connected to the line conductor, preventing dangerous situations where circuits remain live when switched off."
  },
  {
    id: 2,
    question: "What happens if a switch is incorrectly wired to the neutral conductor?",
    options: [
      "The switch won't operate",
      "The circuit remains live when switched off",
      "The lights will be dimmer",
      "Nothing - it works the same way"
    ],
    correctAnswer: 1,
    explanation: "If a switch breaks the neutral instead of the line, the circuit remains live at full voltage even when the switch is in the 'off' position, creating a serious shock hazard."
  },
  {
    id: 3,
    question: "Which part of an Edison screw lampholder should be connected to the line conductor?",
    options: [
      "The screw thread",
      "The centre contact",
      "Either part is acceptable",
      "The outer metal shell"
    ],
    correctAnswer: 1,
    explanation: "The centre contact must be connected to the line conductor. If the screw thread is live, users risk electric shock when changing bulbs."
  },
  {
    id: 4,
    question: "When must polarity testing be carried out?",
    options: [
      "Only if there are problems with the installation",
      "Before energising any new installation or circuit",
      "After the installation has been in use for a month",
      "Only on commercial installations"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 requires polarity testing before initial energisation of any new installation or circuit to ensure safety and compliance."
  },
  {
    id: 5,
    question: "What is the main safety risk of incorrect polarity?",
    options: [
      "Higher electricity bills",
      "Equipment running inefficiently",
      "Shock hazards from normally safe parts",
      "Lights being dimmer than expected"
    ],
    correctAnswer: 2,
    explanation: "Incorrect polarity can make normally safe parts become live, creating serious shock hazards even when switches appear to be in the 'off' position."
  },
  {
    id: 6,
    question: "According to BS 7671, which conductors must polarity testing verify?",
    options: [
      "Only the line conductor",
      "Only protective conductors",
      "Line and neutral conductors",
      "All conductors including earth"
    ],
    correctAnswer: 2,
    explanation: "Polarity testing must verify that both line and neutral conductors are correctly connected to their designated terminals throughout the installation."
  },
  {
    id: 7,
    question: "What type of current is used for polarity testing?",
    options: [
      "High current to simulate normal operation",
      "Low direct current for safety",
      "Alternating current at mains frequency",
      "No current - visual inspection only"
    ],
    correctAnswer: 1,
    explanation: "Polarity testing uses low DC current (typically 4-200mA) to safely test dead circuits before energisation."
  },
  {
    id: 8,
    question: "Why is polarity particularly critical for protective devices?",
    options: [
      "They are expensive to replace",
      "They must operate on the line conductor to provide proper protection",
      "They generate heat if incorrectly connected",
      "They won't fit properly in the distribution board"
    ],
    correctAnswer: 1,
    explanation: "Protective devices must operate on the line conductor to properly disconnect the supply. If connected to neutral, they won't provide adequate protection."
  },
  {
    id: 9,
    question: "In a domestic installation, what is the most common consequence of reversed polarity at a socket outlet?",
    options: [
      "The socket won't work at all",
      "Electrical equipment may have live cases when switched off",
      "The socket will work normally with no safety issues",
      "The electricity meter will run backwards"
    ],
    correctAnswer: 1,
    explanation: "Reversed polarity can cause equipment cases to become live even when switched off, as internal switches may be controlling the neutral instead of the line."
  },
  {
    id: 10,
    question: "Which regulation in BS 7671 specifically requires polarity testing?",
    options: [
      "Section 411 - Protective earthing",
      "Section 612 - Testing",
      "Section 514 - Identification",
      "Section 522 - Selection and erection"
    ],
    correctAnswer: 1,
    explanation: "Section 612 of BS 7671 covers testing requirements, including the mandatory polarity testing that must be performed before energisation of any installation."
  }
];