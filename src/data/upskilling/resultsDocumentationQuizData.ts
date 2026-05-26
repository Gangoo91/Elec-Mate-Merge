import type { QuizQuestion } from '@/types/quiz';

export const resultsDocumentationQuizData: QuizQuestion[] = [
  {
    id: 1,
    question: 'What is the minimum required information for documenting test results?',
    options: [
      'Ambient temperature and any factors affecting measurements',
      'Circuit ID, measured values, maximum permitted values, and pass/fail assessment',
      'Serial number, calibration date, and certificate reference',
      'Document as non-compliance and specify corrective actions',
    ],
    correctAnswer: 1,
    explanation:
      'Complete documentation must include circuit identification, measured values, maximum permitted values, pass/fail assessment, plus supporting details like equipment and environmental data.',
  },
  {
    id: 2,
    question: 'What must be done if test results exceed BS 7671 maximum permitted values?',
    options: [
      'Serial number, calibration date, and certificate reference',
      'Ambient temperature and any factors affecting measurements',
      'Document as non-compliance and specify corrective actions',
      'Verify all results are within limits and calculations are correct',
    ],
    correctAnswer: 2,
    explanation:
      'Non-compliant results must be documented with details of the non-compliance and specific corrective actions required to achieve compliance.',
  },
  {
    id: 3,
    question: 'How should test equipment details be recorded?',
    options: [
      'Document the values and recommend monitoring or improvement',
      'Verify all results are within limits and calculations are correct',
      'Password protection and secure backup copies',
      'Serial number, calibration date, and certificate reference',
    ],
    correctAnswer: 3,
    explanation:
      'Record equipment serial number, calibration date, and certificate reference to ensure traceability and demonstrate measurement validity.',
  },
  {
    id: 4,
    question: 'What environmental information should be documented during testing?',
    options: [
      'Ambient temperature and any factors affecting measurements',
      'Serial number, calibration date, and certificate reference',
      'Document as non-compliance and specify corrective actions',
      'Detailed justification and assessment of equivalent safety',
    ],
    correctAnswer: 0,
    explanation:
      'Ambient temperature and other environmental factors that could affect measurements (humidity, EMI sources) should be recorded for accurate result interpretation.',
  },
  {
    id: 5,
    question: 'Who can sign electrical installation certificates?',
    options: [
      'Password protection and secure backup copies',
      'Only a competent person responsible for the work',
      'Document as non-compliance and specify corrective actions',
      'For the life of the installation plus inspection intervals',
    ],
    correctAnswer: 1,
    explanation:
      'Only a competent person who is responsible for the design, construction, inspection, and testing can sign electrical installation certificates.',
  },
  {
    id: 6,
    question: 'How should digital test data be protected?',
    options: [
      'Print immediately and discard digital copies',
      'No protection needed',
      'Password protection and secure backup copies',
      'Only save on the test equipment',
    ],
    correctAnswer: 2,
    explanation:
      'Digital test data should be protected with access controls, version control, and secure backup copies to maintain data integrity and prevent loss.',
  },
  {
    id: 7,
    question: 'What should be done with test results that are borderline acceptable?',
    options: [
      'For the life of the installation plus inspection intervals',
      'Password protection and secure backup copies',
      'Only a competent person responsible for the work',
      'Document the values and recommend monitoring or improvement',
    ],
    correctAnswer: 3,
    explanation:
      'Borderline results should be documented with recommendations for monitoring during future inspections or improvement where practical.',
  },
  {
    id: 8,
    question: 'How long should test records be retained?',
    options: [
      'For the life of the installation plus inspection intervals',
      'Document the values and recommend monitoring or improvement',
      'Detailed justification and assessment of equivalent safety',
      'Serial number, calibration date, and certificate reference',
    ],
    correctAnswer: 0,
    explanation:
      'Test records should be retained for the life of the installation and made available for future inspections to track performance trends and compliance history.',
  },
  {
    id: 9,
    question: 'What must be included when documenting departures from BS 7671?',
    options: [
      'Verify all results are within limits and calculations are correct',
      'Detailed justification and assessment of equivalent safety',
      'Only a competent person responsible for the work',
      'Password protection and secure backup copies',
    ],
    correctAnswer: 1,
    explanation:
      'Departures from BS 7671 must include detailed justification, assessment of equivalent safety levels, and demonstration that the installation is not less safe than standard compliance.',
  },
  {
    id: 10,
    question: 'What verification step is essential before issuing certificates?',
    options: [
      'Document the values and recommend monitoring or improvement',
      'Detailed justification and assessment of equivalent safety',
      'Verify all results are within limits and calculations are correct',
      'Circuit ID, measured values, maximum permitted values, and pass/fail assessment',
    ],
    correctAnswer: 2,
    explanation:
      'Before issuing certificates, verify all test results are within acceptable limits, calculations are correct, required information is complete, and documentation is accurate.',
  },
];
