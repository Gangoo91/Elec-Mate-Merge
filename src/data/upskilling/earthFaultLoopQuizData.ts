import { QuizQuestion } from '@/components/quiz/types';

export const earthFaultLoopQuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What does Zs represent in electrical testing?",
    options: [
      "Earth electrode resistance",
      "Earth fault loop impedance",
      "Source impedance",
      "Circuit resistance"
    ],
    correctAnswer: 1,
    explanation: "Zs represents the earth fault loop impedance - the total impedance of the earth fault current path from the point of fault back to the source."
  },
  {
    id: 2,
    question: "What does Ze represent in electrical testing?",
    options: [
      "Earth fault loop impedance",
      "Earth electrode resistance",
      "External earth fault loop impedance",
      "Equipment earth resistance"
    ],
    correctAnswer: 2,
    explanation: "Ze represents the external earth fault loop impedance - the impedance of the earth fault current path external to the installation."
  },
  {
    id: 3,
    question: "According to BS 7671, what is the typical maximum Zs value for a 32A Type B MCB?",
    options: [
      "1.44Ω",
      "0.87Ω",
      "1.15Ω",
      "2.30Ω"
    ],
    correctAnswer: 0,
    explanation: "For a 32A Type B MCB, the maximum Zs value is typically 1.44Ω to ensure disconnection within the required time."
  },
  {
    id: 4,
    question: "What is the relationship between Zs and Ze?",
    options: [
      "Zs = Ze + R1 + R2",
      "Zs = Ze - R1 - R2",
      "Zs = Ze × R1 × R2",
      "Zs = Ze ÷ (R1 + R2)"
    ],
    correctAnswer: 0,
    explanation: "Zs equals Ze plus R1 plus R2, where R1 is the line conductor resistance and R2 is the protective conductor resistance."
  },
  {
    id: 5,
    question: "Why is earth fault loop impedance testing critical for safety?",
    options: [
      "To measure power consumption",
      "To ensure adequate fault current for protective device operation",
      "To check voltage levels",
      "To test insulation resistance"
    ],
    correctAnswer: 1,
    explanation: "Earth fault loop impedance testing ensures that sufficient fault current will flow to operate the protective device within the required disconnection time."
  },
  {
    id: 6,
    question: "When should Ze be measured in an installation?",
    options: [
      "Only during initial verification",
      "Before connecting the main earthing conductor",
      "After energising the installation",
      "During periodic inspection only"
    ],
    correctAnswer: 1,
    explanation: "Ze should be measured before connecting the main earthing conductor to obtain an accurate external impedance reading."
  },
  {
    id: 7,
    question: "What instrument correction should be applied to Zs readings?",
    options: [
      "Add 10% to all readings",
      "Apply temperature correction factor",
      "No correction needed",
      "Subtract instrument resistance"
    ],
    correctAnswer: 1,
    explanation: "Temperature correction should be applied to account for the increase in conductor resistance at maximum operating temperature."
  },
  {
    id: 8,
    question: "In a TN-S system, what does the earth fault current path include?",
    options: [
      "Line conductor, earth electrode, and neutral",
      "Line conductor, protective conductor, and neutral",
      "Protective conductor only",
      "Earth electrode and line conductor"
    ],
    correctAnswer: 1,
    explanation: "In a TN-S system, the earth fault current path includes the line conductor, protective conductor, and the neutral conductor back to the source."
  },
  {
    id: 9,
    question: "What happens if Zs is too high?",
    options: [
      "The circuit operates more efficiently",
      "Protective devices may not operate quickly enough",
      "Power consumption increases",
      "Voltage drop decreases"
    ],
    correctAnswer: 1,
    explanation: "If Zs is too high, insufficient fault current may flow, preventing protective devices from operating within the required disconnection time."
  },
  {
    id: 10,
    question: "Which regulation in BS 7671 covers earth fault loop impedance requirements?",
    options: [
      "Regulation 411.4.5",
      "Regulation 411.3.2",
      "Regulation 543.1",
      "Regulation 411.4.9"
    ],
    correctAnswer: 3,
    explanation: "Regulation 411.4.9 in BS 7671 specifies the requirements for earth fault loop impedance and maximum disconnection times."
  }
];