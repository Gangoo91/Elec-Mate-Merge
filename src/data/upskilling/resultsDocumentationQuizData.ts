import type { QuizQuestion } from '@/types/quiz';

export const resultsDocumentationQuizData: QuizQuestion[] = [
  {
    id: 1,
    question: 'What is the minimum required information for documenting test results?',
    options: [
      'Only the measured values',
      'Circuit ID, measured values, maximum permitted values, and pass/fail assessment',
      'Just the equipment serial number',
      'Only environmental conditions'
    ],
    correctAnswer: 1,
    explanation: 'Complete documentation must include circuit identification, measured values, maximum permitted values, pass/fail assessment, plus supporting details like equipment and environmental data.'
  },
  {
    id: 2,
    question: 'What must be done if test results exceed BS 7671 maximum permitted values?',
    options: [
      'Ignore the results',
      'Document as non-compliance and specify corrective actions',
      'Adjust the readings to within limits',
      'Test again until acceptable results are obtained'
    ],
    correctAnswer: 1,
    explanation: 'Non-compliant results must be documented with details of the non-compliance and specific corrective actions required to achieve compliance.'
  },
  {
    id: 3,
    question: 'How should test equipment details be recorded?',
    options: [
      'Equipment type only',
      'Serial number, calibration date, and certificate reference',
      'Just the manufacturer name',
      'Only if the equipment malfunctions'
    ],
    correctAnswer: 1,
    explanation: 'Record equipment serial number, calibration date, and certificate reference to ensure traceability and demonstrate measurement validity.'
  },
  {
    id: 4,
    question: 'What environmental information should be documented during testing?',
    options: [
      'Weather conditions only',
      'Ambient temperature and any factors affecting measurements',
      'Time of day only',
      'No environmental data needed'
    ],
    correctAnswer: 1,
    explanation: 'Ambient temperature and other environmental factors that could affect measurements (humidity, EMI sources) should be recorded for accurate result interpretation.'
  },
  {
    id: 5,
    question: 'Who can sign electrical installation certificates?',
    options: [
      'Anyone who performed the tests',
      'Only a competent person responsible for the work',
      'The building owner',
      'Any qualified electrician'
    ],
    correctAnswer: 1,
    explanation: 'Only a competent person who is responsible for the design, construction, inspection, and testing can sign electrical installation certificates.'
  },
  {
    id: 6,
    question: 'How should digital test data be protected?',
    options: [
      'No protection needed',
      'Password protection and secure backup copies',
      'Only save on the test equipment',
      'Print immediately and discard digital copies'
    ],
    correctAnswer: 1,
    explanation: 'Digital test data should be protected with access controls, version control, and secure backup copies to maintain data integrity and prevent loss.'
  },
  {
    id: 7,
    question: 'What should be done with test results that are borderline acceptable?',
    options: [
      'Accept without comment',
      'Document the values and recommend monitoring or improvement',
      'Reject automatically',
      'Retest until clearly acceptable'
    ],
    correctAnswer: 1,
    explanation: 'Borderline results should be documented with recommendations for monitoring during future inspections or improvement where practical.'
  },
  {
    id: 8,
    question: 'How long should test records be retained?',
    options: [
      'One year only',
      'For the life of the installation plus inspection intervals',
      'Until the next test',
      'Records are not required to be kept'
    ],
    correctAnswer: 1,
    explanation: 'Test records should be retained for the life of the installation and made available for future inspections to track performance trends and compliance history.'
  },
  {
    id: 9,
    question: 'What must be included when documenting departures from BS 7671?',
    options: [
      'Nothing special required',
      'Detailed justification and assessment of equivalent safety',
      'Just note "special installation"',
      'Only the clause number'
    ],
    correctAnswer: 1,
    explanation: 'Departures from BS 7671 must include detailed justification, assessment of equivalent safety levels, and demonstration that the installation is not less safe than standard compliance.'
  },
  {
    id: 10,
    question: 'What verification step is essential before issuing certificates?',
    options: [
      'Check spelling only',
      'Verify all results are within limits and calculations are correct',
      'Only check signatures',
      'Verify only the date'
    ],
    correctAnswer: 1,
    explanation: 'Before issuing certificates, verify all test results are within acceptable limits, calculations are correct, required information is complete, and documentation is accurate.'
  }
];