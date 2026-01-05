import { QuizQuestion } from '@/components/quiz/types';

export const eicrQuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the maximum validity period for an EICR from the inspection date?",
    options: [
      "2 years",
      "3 years", 
      "5 years",
      "10 years"
    ],
    correctAnswer: 2,
    explanation: "EICRs are valid for a maximum of 5 years from the inspection date, though some high-risk premises may require more frequent inspection."
  },
  {
    id: 2,
    question: "Which observation code indicates 'Danger present - immediate action required'?",
    options: [
      "C1",
      "C2",
      "C3", 
      "FI"
    ],
    correctAnswer: 0,
    explanation: "C1 code indicates danger is present and immediate action is required to make the installation or part safe immediately."
  },
  {
    id: 3,
    question: "What is the minimum insulation resistance requirement for circuits ≤500V during EICR testing?",
    options: [
      "≥0.5MΩ where electronic equipment is present",
      "≥1MΩ for all circuits",
      "≥2MΩ for domestic installations",
      "≥5MΩ for commercial premises"
    ],
    correctAnswer: 0,
    explanation: "While the standard requirement is ≥1MΩ for circuits ≤500V, ≥0.5MΩ is acceptable where electronic equipment is permanently connected and cannot be disconnected."
  },
  {
    id: 4,
    question: "How frequently must EICRs be conducted in private rental properties in England?",
    options: [
      "Every 3 years",
      "Every 5 years or at change of tenancy", 
      "Every 10 years",
      "Only when problems are reported"
    ],
    correctAnswer: 1,
    explanation: "Since July 2020, private landlords in England must ensure electrical installations are inspected every 5 years or at change of tenancy by a qualified electrician."
  },
  {
    id: 5,
    question: "Which test should be performed FIRST during EICR testing sequence?",
    options: [
      "Insulation resistance",
      "Earth fault loop impedance",
      "Continuity of protective conductors",
      "RCD operation"
    ],
    correctAnswer: 2,
    explanation: "Continuity of protective conductors should be tested first to ensure safety systems are in place before proceeding with other tests that may stress the installation."
  },
  {
    id: 6,
    question: "What does observation code 'FI' indicate on an EICR?",
    options: [
      "Fire risk identified",
      "Further investigation required",
      "Functional improvement needed", 
      "Final inspection complete"
    ],
    correctAnswer: 1,
    explanation: "FI code indicates that further investigation is required to determine the safety of the installation or specific part that could not be fully assessed during the inspection."
  },
  {
    id: 7,
    question: "What is the maximum RCD operating time at 1×IΔn for socket outlet circuits?",
    options: [
      "40ms",
      "200ms",
      "300ms",
      "500ms"
    ],
    correctAnswer: 2,
    explanation: "RCD operating time at 1×IΔn must be ≤300ms. At 5×IΔn for socket circuits, the maximum is 40ms."
  },
  {
    id: 8,
    question: "Which premises type typically requires annual EICR inspection?",
    options: [
      "Domestic properties",
      "Small offices",
      "Healthcare and care facilities",
      "Retail shops"
    ],
    correctAnswer: 2,
    explanation: "Healthcare and care facilities typically require annual EICR inspection due to enhanced safety requirements for vulnerable occupants and critical equipment."
  },
  {
    id: 9,
    question: "What must be clearly documented if parts of an installation cannot be inspected?",
    options: [
      "Nothing - just complete what can be inspected",
      "Limitations and extent of inspection performed",
      "A disclaimer releasing liability",
      "Estimated condition of uninspected areas"
    ],
    correctAnswer: 1,
    explanation: "All EICR limitations must be clearly documented, including areas not inspected and the extent of inspection performed, to ensure report users understand the scope."
  },
  {
    id: 10,
    question: "Which observation code is used for 'Improvement recommended' findings?",
    options: [
      "C1",
      "C2", 
      "C3",
      "IR"
    ],
    correctAnswer: 2,
    explanation: "C3 code is used for 'Improvement recommended' - items that would improve safety but are not immediately dangerous or urgently requiring action."
  }
];