import type { QuizQuestion } from '@/types/quiz';

export const resultsDocumentationQuizData: QuizQuestion[] = [
  {
    id: 1,
    question: 'What is the minimum required information for documenting test results?',
    options: [
      'Only the final pass or fail outcome for each circuit',
      'Circuit ID, measured values, maximum permitted values, and pass/fail assessment',
      'Just the measured values without any reference limits',
      'The client name and installation address only',
    ],
    correctAnswer: 1,
    explanation:
      'Complete documentation must include circuit identification, measured values, maximum permitted values, pass/fail assessment, plus supporting details like equipment and environmental data.',
  },
  {
    id: 2,
    question: 'What must be done if test results exceed BS 7671 maximum permitted values?',
    options: [
      'Record the values as a pass with an explanatory note',
      'Average the failing value with adjacent compliant circuits',
      'Document as non-compliance and specify corrective actions',
      'Round the result down to the nearest permitted value',
    ],
    correctAnswer: 2,
    explanation:
      'Non-compliant results must be documented with details of the non-compliance and specific corrective actions required to achieve compliance.',
  },
  {
    id: 3,
    question: 'How should test equipment details be recorded?',
    options: [
      'Manufacturer brand name only',
      'The purchase price and supplier of the instrument',
      'Instrument model number with no calibration record',
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
      'The outdoor weather forecast for the following week',
      'The time of sunrise and sunset on the test day',
      'The colour of the consumer unit enclosure',
    ],
    correctAnswer: 0,
    explanation:
      'Ambient temperature and other environmental factors that could affect measurements (humidity, EMI sources) should be recorded for accurate result interpretation.',
  },
  {
    id: 5,
    question: 'Who can sign electrical installation certificates?',
    options: [
      'Any electrician on site regardless of involvement',
      'Only a competent person responsible for the work',
      'The client commissioning the installation work',
      'The wholesaler who supplied the materials',
    ],
    correctAnswer: 1,
    explanation:
      'Only a competent person who is responsible for the design, construction, inspection, and testing can sign electrical installation certificates.',
  },
  {
    id: 6,
    question: 'How should digital test data be protected?',
    options: [
      'Stored as a single editable file shared by email',
      'Held only on the instrument until the next download',
      'Password protection and secure backup copies',
      'Kept on one local drive with no version history',
    ],
    correctAnswer: 2,
    explanation:
      'Digital test data should be protected with access controls, version control, and secure backup copies to maintain data integrity and prevent loss.',
  },
  {
    id: 7,
    question: 'What should be done with test results that are borderline acceptable?',
    options: [
      'Record them as a clear fail and condemn the circuit',
      'Omit them from the certificate to avoid confusion',
      'Adjust the readings until they sit mid-range',
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
      'Only until the invoice for the work has been paid',
      'A maximum of twelve months from the test date',
      'Until the certificate is handed to the client',
    ],
    correctAnswer: 0,
    explanation:
      'Test records should be retained for the life of the installation and made available for future inspections to track performance trends and compliance history.',
  },
  {
    id: 9,
    question: 'What must be included when documenting departures from BS 7671?',
    options: [
      'A simple note that a departure has been made',
      'Detailed justification and assessment of equivalent safety',
      'Only the regulation number that has been departed from',
      'Written approval from the equipment manufacturer',
    ],
    correctAnswer: 1,
    explanation:
      'Departures from BS 7671 must include detailed justification, assessment of equivalent safety levels, and demonstration that the installation is not less safe than standard compliance.',
  },
  {
    id: 10,
    question: 'What verification step is essential before issuing certificates?',
    options: [
      'Confirm the client has settled the final invoice',
      'Check the instrument battery level is above half',
      'Verify all results are within limits and calculations are correct',
      'Ensure a copy has been emailed to the wholesaler',
    ],
    correctAnswer: 2,
    explanation:
      'Before issuing certificates, verify all test results are within acceptable limits, calculations are correct, required information is complete, and documentation is accurate.',
  },
];
