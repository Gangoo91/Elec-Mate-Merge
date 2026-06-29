export const emergencyLightingModule5Section2QuizQuestions = [
  {
    id: 1,
    question: 'What is the purpose of a functional emergency lighting test?',
    options: [
      'To confirm the batteries can sustain the full rated three-hour duration',
      'To ensure all luminaires switch into emergency mode when mains power fails',
      'To measure the illuminance achieved on each escape route in lux',
      'To recharge the luminaire batteries fully before the next inspection',
    ],
    correctAnswer: 1,
    explanation:
      'A functional test confirms that all luminaires switch to emergency mode during a simulated mains failure, verifying the system operates correctly.',
  },
  {
    id: 2,
    question: 'How often must functional tests be carried out?',
    options: [
      'Weekly',
      'Annually',
      'Monthly',
      'Every 6 months',
    ],
    correctAnswer: 2,
    explanation:
      'BS 5266-1 requires short functional tests to be carried out monthly to ensure ongoing system operation.',
  },
  {
    id: 3,
    question: 'How long should monthly functional tests last?',
    options: [
      'The full rated duration of three hours',
      'Exactly one hour every time',
      'Half the rated battery duration',
      'Only long enough to confirm operation (short duration)',
    ],
    correctAnswer: 3,
    explanation:
      'Monthly tests are kept deliberately short - just long enough to confirm all luminaires switch to emergency mode without draining the batteries.',
  },
  {
    id: 4,
    question: 'What is the purpose of the annual 3-hour duration test?',
    options: [
      'To verify battery capacity and ensure escape routes remain illuminated for the full evacuation period',
      'To confirm the charging circuit restores the battery within 24 hours',
      'To check that each luminaire switches across to emergency mode quickly',
      'To recalibrate the photocells that control the maintained lighting',
    ],
    correctAnswer: 0,
    explanation:
      'The annual 3-hour test verifies that batteries can sustain emergency lighting for the full rated period, ensuring safe evacuation in a real emergency.',
  },
  {
    id: 5,
    question: 'When must a 3-hour duration test also be completed besides annually?',
    options: [
      'Only when an insurer specifically requests it',
      'At commissioning and after any system modifications',
      'After every monthly functional test',
      'Only when a luminaire is reported as faulty',
    ],
    correctAnswer: 1,
    explanation:
      'A full 3-hour duration test must be completed at commissioning, annually, and after any modifications to the emergency lighting system.',
  },
  {
    id: 6,
    question: 'What standard governs testing requirements for emergency lighting?',
    options: [
      'BS 7671 and BS EN 60898',
      'BS 5839-1 and BS EN 54',
      'BS 5266-1 and BS EN 50172',
      'BS 5499 and BS EN 1838',
    ],
    correctAnswer: 2,
    explanation:
      'BS 5266-1 and BS EN 50172 are the key standards that specify testing requirements for emergency lighting systems in the UK.',
  },
  {
    id: 7,
    question: 'Why should duration tests be scheduled outside of occupied hours?',
    options: [
      'Because the test requires the entire building supply to be switched off',
      'Because daylight would interfere with the illuminance readings taken',
      'Because occupants must evacuate the building while the test is running',
      'To avoid leaving the building unprotected while batteries recharge after the test',
    ],
    correctAnswer: 3,
    explanation:
      "After a 3-hour duration test, batteries need time to recharge. Testing outside occupied hours ensures the building isn't left without emergency lighting protection.",
  },
  {
    id: 8,
    question: 'Give one reason why a luminaire might fail a 3-hour test.',
    options: [
      'The battery is ageing and has lost capacity',
      'The luminaire is wired in the wrong polarity',
      'The mains supply voltage is slightly high',
      'The diffuser has a minor cosmetic scratch',
    ],
    correctAnswer: 0,
    explanation:
      'Ageing batteries (typically over 3-5 years old) lose capacity and may pass short monthly tests but fail to sustain load for the full 3-hour duration.',
  },
  {
    id: 9,
    question: 'Why must test results be recorded in the logbook?',
    options: [
      'So the battery warranty period can be calculated from the install date',
      'To demonstrate compliance during fire inspections and provide evidence for insurers',
      'So the energy used by the luminaires can be billed back to the tenant',
      'To allow the manufacturer to remotely monitor each luminaire',
    ],
    correctAnswer: 1,
    explanation:
      'The emergency lighting logbook provides documented evidence of compliance for fire inspectors and insurers, and is a legal requirement under BS 5266-1.',
  },
  {
    id: 10,
    question: 'What happened in the Leeds care home case study?',
    options: [
      'Lights stayed on for the full three hours with no issues found',
      'A wiring fault tripped the emergency circuit during the test',
      'Lights failed after 40 minutes during a drill because batteries were over 7 years old and annual duration tests had been neglected',
      'The system passed but the logbook had been lost in an office move',
    ],
    correctAnswer: 2,
    explanation:
      'Despite monthly functional tests, the neglected annual duration testing meant ageing batteries (over 7 years old) failed after just 40 minutes, putting vulnerable residents at risk.',
  },
];
