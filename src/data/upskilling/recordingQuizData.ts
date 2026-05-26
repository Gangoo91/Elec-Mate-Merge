import { QuizQuestion } from '@/types/quiz';

export const recordingQuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'What document includes observation codes like C1, C2, C3, and FI?',
    options: [
      'Specific details of what could not be inspected and why',
      'Electrical Installation Condition Report (EICR)',
      'Record the exact measured value with appropriate units',
      'With specific, accurate technical descriptions',
    ],
    correctAnswer: 1,
    explanation:
      'The EICR uses observation codes C1 (immediate danger), C2 (potentially dangerous), C3 (improvement recommended), and FI (further investigation required) to classify findings.',
  },
  {
    id: 2,
    question: 'What does observation code C1 indicate?',
    options: [
      'Minor improvement needed',
      'Further investigation required',
      'Immediate danger present',
      'Installation satisfactory',
    ],
    correctAnswer: 2,
    explanation:
      'Code C1 indicates immediate danger requiring urgent remedial action. The supply should be disconnected until repairs are completed.',
  },
  {
    id: 3,
    question: 'When should you use observation code FI (Further Investigation)?',
    options: [
      'Specific details of what could not be inspected and why',
      'Use code FI and recommend specialist investigation',
      'Record the exact measured value with appropriate units',
      'When unable to fully investigate a potential issue during inspection',
    ],
    correctAnswer: 3,
    explanation:
      'FI is used when you cannot fully investigate a potential issue during the current inspection, requiring additional investigation with appropriate access or equipment.',
  },
  {
    id: 4,
    question: 'What information must be included in the limitation section?',
    options: [
      'Specific details of what could not be inspected and why',
      'When unable to fully investigate a potential issue during inspection',
      'Use code FI and recommend specialist investigation',
      'Record the exact measured value with appropriate units',
    ],
    correctAnswer: 0,
    explanation:
      'Limitations must clearly specify what could not be inspected, why access was not possible, and how this affects the scope of the inspection.',
  },
  {
    id: 5,
    question: 'How should defects be described in inspection reports?',
    options: [
      'Electrical Installation Condition Report (EICR)',
      'With specific, accurate technical descriptions',
      'Specific details of what could not be inspected and why',
      'Use code FI and recommend specialist investigation',
    ],
    correctAnswer: 1,
    explanation:
      'Defects must be described precisely using correct technical terminology to ensure clarity and demonstrate professional competence.',
  },
  {
    id: 6,
    question: "Which certificate requires the installer's signature and competency details?",
    options: [
      'Insurance certificate',
      'Building regulation compliance certificate',
      'Electrical Installation Certificate',
      'Electrical Installation Condition Report',
    ],
    correctAnswer: 2,
    explanation:
      "The Electrical Installation Certificate (EIC) must include the installer's signature, competency details, and scope of certification for new installations.",
  },
  {
    id: 7,
    question: 'What should you do if you cannot determine the cause of a potential defect?',
    options: [
      'Electrical Installation Condition Report (EICR)',
      'Specific details of what could not be inspected and why',
      'Record the exact measured value with appropriate units',
      'Use code FI and recommend specialist investigation',
    ],
    correctAnswer: 3,
    explanation:
      'If you cannot determine the cause of a potential defect, use code FI (Further Investigation) and recommend appropriate specialist investigation.',
  },
  {
    id: 8,
    question: 'How long should electrical inspection records be retained?',
    options: [
      'Indefinitely for legal protection',
      'Stop testing and investigate',
      'Thermostatic expansion valve (TXV)',
      'Differential pressure control',
    ],
    correctAnswer: 0,
    explanation:
      'Records should be retained indefinitely as they may be required for legal proceedings, insurance claims, or future electrical work many years later.',
  },
  {
    id: 9,
    question: 'What must be clearly stated if the inspection scope was limited?',
    options: [
      'Electrical Installation Condition Report (EICR)',
      'Exactly what could not be inspected and the reasons why',
      'Record the exact measured value with appropriate units',
      'Use code FI and recommend specialist investigation',
    ],
    correctAnswer: 1,
    explanation:
      'Any limitations must be clearly documented, stating exactly what could not be inspected and the specific reasons, to establish the scope of the inspection.',
  },
  {
    id: 10,
    question: 'When recording test results, which approach is correct?',
    options: [
      "Record 'Satisfactory' if the result meets minimum requirements",
      'Round readings to the nearest whole number',
      'Record the exact measured value with appropriate units',
      'Only record results that fail to meet requirements',
    ],
    correctAnswer: 2,
    explanation:
      'Always record the exact measured value with appropriate units (Ω, MΩ, A, V). This provides complete information for future reference and demonstrates thorough testing.',
  },
];
