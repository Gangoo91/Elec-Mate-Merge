import { QuizQuestion } from '@/components/quiz/types';

export const zsTestingQuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "At which point should Zs be measured for socket outlet circuits?",
    options: [
      "At the distribution board only",
      "At the furthest socket outlet",
      "At any convenient socket",
      "Only at the first socket"
    ],
    correctAnswer: 1,
    explanation: "Zs should be measured at the furthest socket outlet as this represents the highest impedance point and worst-case scenario for the circuit."
  },
  {
    id: 2,
    question: "When testing Zs at lighting points, where is the most appropriate test location?",
    options: [
      "At the light switch",
      "At the ceiling rose or light fitting",
      "At the distribution board",
      "At the junction box"
    ],
    correctAnswer: 1,
    explanation: "Testing should be performed at the ceiling rose or light fitting as this is the actual point where the equipment is connected."
  },
  {
    id: 3,
    question: "What percentage of outlet points should be tested for Zs in a typical installation?",
    options: [
      "10% minimum",
      "25% minimum",
      "50% minimum",
      "100% of outlets"
    ],
    correctAnswer: 0,
    explanation: "BS 7671 requires a minimum of 10% of outlet points to be tested, though testing more points provides better verification."
  },
  {
    id: 4,
    question: "When testing Zs at a three-phase outlet, which measurement approach is correct?",
    options: [
      "Test only one phase to earth",
      "Test each phase to earth separately",
      "Test between phases only",
      "Test neutral to earth only"
    ],
    correctAnswer: 1,
    explanation: "Each phase should be tested to earth separately as the impedance may vary between phases due to different cable routes or connections."
  },
  {
    id: 5,
    question: "What is the main reason for testing Zs at multiple points on the same circuit?",
    options: [
      "To comply with regulations",
      "To identify variations in impedance along the circuit",
      "To check cable quality",
      "To measure voltage drop"
    ],
    correctAnswer: 1,
    explanation: "Testing at multiple points helps identify impedance variations that could indicate poor connections, cable damage, or installation issues."
  },
  {
    id: 6,
    question: "At which type of equipment should Zs always be measured?",
    options: [
      "Class II equipment only",
      "Portable equipment",
      "Fixed equipment with exposed metalwork",
      "Battery-powered equipment"
    ],
    correctAnswer: 2,
    explanation: "Fixed equipment with exposed metalwork requires Zs measurement as it relies on the earth fault loop for protection against electric shock."
  },
  {
    id: 7,
    question: "When testing Zs at a cooker circuit, where should the measurement be taken?",
    options: [
      "At the cooker control unit",
      "At the cooker outlet point",
      "At both the control unit and outlet",
      "Only at the distribution board"
    ],
    correctAnswer: 2,
    explanation: "Both the cooker control unit and the outlet point should be tested to ensure adequate protection at all connection points."
  },
  {
    id: 8,
    question: "What should be done if Zs readings vary significantly between test points on the same circuit?",
    options: [
      "Record the lowest reading",
      "Take an average of all readings",
      "Investigate for poor connections or faults",
      "Use the highest reading only"
    ],
    correctAnswer: 2,
    explanation: "Significant variations in Zs readings indicate potential problems such as poor connections, damaged cables, or incorrect wiring that require investigation."
  },
  {
    id: 9,
    question: "In a radial circuit, how does Zs typically change from the origin to the end?",
    options: [
      "Remains constant",
      "Decreases towards the end",
      "Increases towards the end",
      "Varies randomly"
    ],
    correctAnswer: 2,
    explanation: "In a radial circuit, Zs increases towards the end due to the additional resistance of the cable length between test points."
  },
  {
    id: 10,
    question: "When is it acceptable to use calculated Zs values instead of measured values?",
    options: [
      "Never - always measure",
      "For inaccessible points where measurement is impractical",
      "For all socket outlets",
      "For lighting circuits only"
    ],
    correctAnswer: 1,
    explanation: "Calculated Zs values may be used for inaccessible points, but measured values are preferred. When calculating, use worst-case assumptions and apply appropriate safety factors."
  }
];