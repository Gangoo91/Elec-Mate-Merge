export const rcdTestingQuizData = [
  {
    question: 'What test current should NEVER cause an RCD to trip?',
    options: [
      '½ × IΔn (15mA for 30mA RCD)',
      '¼ × IΔn (7.5mA for 30mA RCD)',
      '5 × IΔn (150mA for 30mA RCD)',
      '1 × IΔn (30mA for 30mA RCD)',
    ],
    correctAnswer: 0,
    explanation:
      'An RCD should never trip at ½ × IΔn. If it does, the device is over-sensitive and requires replacement to prevent nuisance tripping.',
  },
  {
    question: 'What is the maximum permitted trip time for a 30mA RCD at rated current (1 × IΔn)?',
    options: [
      '150ms',
      '500ms',
      '40ms',
      '300ms',
    ],
    correctAnswer: 3,
    explanation:
      'For general purpose RCDs, the maximum trip time at rated current is 300ms according to BS 7671.',
  },
  {
    question: 'Why must RCDs be tested at both 0° and 180° phase angles?',
    options: [
      'To test both live and neutral conductors',
      'Because RCD sensitivity varies with AC waveform phase',
      'To check both directions of current flow',
      "It's a regulatory requirement with no technical reason",
    ],
    correctAnswer: 1,
    explanation:
      'RCD sensitivity varies with the phase angle of the residual current. The 180° test often represents worst-case conditions and may reveal marginal devices.',
  },
  {
    question: 'Is testing the RCD test button sufficient for compliance verification?',
    options: [
      'Only for socket outlets rated 20A or less',
      'At the furthest practical point from the RCD',
      'No, proper testing with measured currents is required',
      'Replace the RCD as it\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s over-sensitive',
    ],
    correctAnswer: 2,
    explanation:
      'The test button only proves the tripping mechanism works, not the electronic detection circuit. Proper testing with measured currents and timed responses is required.',
  },
  {
    question: 'Where should RCD testing ideally be performed on a circuit?',
    options: [
      'No, proper testing with measured currents is required',
      'At the furthest practical point from the RCD',
      'Because RCD sensitivity varies with AC waveform phase',
      'Test each line to neutral separately',
    ],
    correctAnswer: 1,
    explanation:
      'Testing should be performed from the furthest practical point to prove circuit integrity and demonstrate protection coverage throughout the installation.',
  },
  {
    question: 'What is the maximum trip time for the 5 × IΔn test on socket circuits?',
    options: [
      '40ms',
      '150ms',
      'There is no 5 × IΔn test requirement',
      '300ms',
    ],
    correctAnswer: 0,
    explanation:
      'The 5 × IΔn test must trip within 40ms and is required for socket outlets rated 20A or less to ensure rapid disconnection for personal protection.',
  },
  {
    question: 'When is the 5 × IΔn test required?',
    options: [
      'Only during initial verification',
      'Only for socket outlets rated 20A or less',
      'For all RCD protected circuits',
      'Only for bathroom circuits',
    ],
    correctAnswer: 1,
    explanation:
      'The 5 × IΔn test is required for socket outlets rated 20A or less and circuits supplying mobile equipment to ensure rapid fault clearance for personal protection.',
  },
  {
    question: 'What should you do if an RCD trips during the ½ × IΔn test?',
    options: [
      'Record the trip time and continue',
      'Check the test equipment calibration',
      "Replace the RCD as it's over-sensitive",
      'Increase the test current and repeat',
    ],
    correctAnswer: 2,
    explanation:
      'An RCD that trips at ½ × IΔn is over-sensitive and must be replaced to prevent nuisance tripping in service.',
  },
  {
    question: 'For three-phase RCDs, how should testing be performed?',
    options: [
      'Test each line to neutral separately',
      "Test only one phase as they're all the same",
      'Test only the phase with the highest load',
      'Test between all three phases simultaneously',
    ],
    correctAnswer: 0,
    explanation:
      'Each line conductor must be tested to neutral separately to ensure balanced protection. Record the longest trip time found across all phases.',
  },
  {
    question: 'What is the typical current for the ½ × IΔn test on a 30mA RCD?',
    options: [
      '25mA',
      '15mA',
      '20mA',
      '10mA',
    ],
    correctAnswer: 1,
    explanation:
      'For a 30mA RCD, the ½ × IΔn test uses 15mA (half of 30mA) and should not cause the device to trip.',
  },
];
