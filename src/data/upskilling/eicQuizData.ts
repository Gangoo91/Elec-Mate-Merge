export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export const eicQuizData: QuizQuestion[] = [
  {
    id: 1,
    question: 'When is an Electrical Installation Certificate (EIC) required?',
    options: [
      'For new installations and major alterations including new circuits',
      'Only for a completely new installation, never for alterations',
      'Only when Building Regulations notification is required for the work',
      'For any electrical work carried out in a domestic property',
    ],
    correct: 0,
    explanation:
      'An EIC is required for new installations and major alterations including the addition of new circuits. Minor additions on existing circuits would use a Minor Works Certificate.',
  },
  {
    id: 2,
    question: 'Who must sign the Design section of an EIC?',
    options: [
      'The person responsible for the design',
      'The person who installed the work',
      'The person who carried out the testing',
      'Any qualified electrician on the project',
    ],
    correct: 0,
    explanation:
      'The Design section must be signed by the person responsible for the design of the installation, who accepts responsibility for ensuring the design complies with BS 7671.',
  },
  {
    id: 3,
    question: 'What information must be included in the circuit schedule?',
    options: [
      'Only circuit references and conductor sizes',
      'Just the test results recorded for each circuit',
      'Circuit details, wiring types, protective devices and test results',
      'Only the protective device type and rating',
    ],
    correct: 2,
    explanation:
      'The circuit schedule must include comprehensive details: circuit references, descriptions, wiring types, conductor sizes, protective device details, and relevant test results.',
  },
  {
    id: 4,
    question: 'Which tests are mandatory before completing an EIC?',
    options: [
      'Only continuity and insulation resistance tests',
      'Only RCD operation tests where RCDs are installed',
      'Basic safety checks at the consumer unit only',
      'All tests specified in BS 7671 Part 6',
    ],
    correct: 3,
    explanation:
      'All tests specified in BS 7671 Part 6 must be completed, including continuity, insulation resistance, polarity, earth fault loop impedance, and RCD operation where applicable.',
  },
  {
    id: 5,
    question: 'What should be done if test results do not meet BS 7671 requirements?',
    options: [
      'Complete and issue the certificate anyway',
      'Note the defects but still issue the certificate',
      'Do not complete the certificate until defects are rectified',
      'Relax the acceptance limits so the results pass',
    ],
    correct: 2,
    explanation:
      'The certificate should not be completed until all defects are rectified and test results comply with BS 7671. The installation must be safe before energisation.',
  },
  {
    id: 6,
    question: 'How should design calculations be documented for an EIC?',
    options: [
      'Comprehensive calculations including demand, cable selection, and protection',
      'They are not required at all for domestic installations',
      'Basic outline calculations are all that is needed',
      'Only the final conductor sizes need to be recorded',
    ],
    correct: 0,
    explanation:
      'Comprehensive design calculations must include maximum demand assessment, cable selection criteria, volt drop calculations, and protective device coordination.',
  },
  {
    id: 7,
    question: 'What is the purpose of the Inspector/Tester signature on an EIC?',
    options: [
      'To verify that inspection and testing confirm compliance',
      'To confirm the work was completed within the agreed programme',
      'To accept responsibility for the design calculations',
      'To certify the final cost of the installation',
    ],
    correct: 0,
    explanation:
      'The Inspector/Tester signature confirms that thorough inspection and testing have been carried out and that the results demonstrate compliance with BS 7671.',
  },
  {
    id: 8,
    question: 'When must an EIC be provided to the client?',
    options: [
      'Within 30 days of completion of the work',
      'Only if the client specifically requests a copy',
      'Upon completion of the work before final payment',
      'At the next periodic inspection of the installation',
    ],
    correct: 2,
    explanation:
      'The EIC must be provided to the client upon completion of the work, typically before final payment, as evidence that the installation complies with BS 7671.',
  },
  {
    id: 9,
    question:
      'What action is required if the original design needs to be modified during installation?',
    options: [
      'Continue with original design regardless',
      'Make changes without documentation',
      'Update the design and ensure the designer approves changes',
      'Complete a separate certificate for changes',
    ],
    correct: 2,
    explanation:
      'Any design modifications must be properly documented and approved by the designer to ensure continued compliance. The designer must accept responsibility for changes.',
  },
  {
    id: 10,
    question: 'How should limitations in inspection or testing be handled on an EIC?',
    options: [
      'Leave any limitations off the certificate entirely',
      'Note only the most significant limitations',
      'Cancel the certificate if any limitation exists',
      'Clearly document all limitations and their reasons',
    ],
    correct: 3,
    explanation:
      'All limitations in inspection or testing must be clearly documented on the certificate with reasons, so users understand the scope of verification undertaken.',
  },
];
