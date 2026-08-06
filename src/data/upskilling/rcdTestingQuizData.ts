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
    question: 'What is the maximum permitted trip time for a general-purpose (non-delay) 30mA RCD at rated current (1 × IΔn)?',
    options: [
      '150ms',
      '500ms',
      '40ms',
      '300ms',
    ],
    correctAnswer: 3,
    explanation:
      'For a general-purpose (non-time-delay) RCD, the maximum trip time at 1 × IΔn is 300ms; an S-type (time-delay) device is permitted up to 500ms.',
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
    question: 'Is operating the integral RCD test button sufficient for compliance verification?',
    options: [
      'Yes, the test button fully verifies tripping at rated residual current',
      'Yes, provided it is pressed quarterly as the label advises',
      'No, instrument testing with measured residual currents and trip times is required',
      'Yes, but only on socket outlets rated 20A or less',
    ],
    correctAnswer: 2,
    explanation:
      'The test button only confirms the mechanical tripping linkage operates; it does not measure the residual current or trip time, so instrument testing is still required to prove compliance.',
  },
  {
    question: 'Where should RCD testing ideally be performed on a circuit?',
    options: [
      'At the consumer unit, directly at the RCD terminals',
      'At the furthest practical point from the RCD',
      'At the midpoint of the longest circuit on the board',
      'At whichever socket is nearest the consumer unit',
    ],
    correctAnswer: 1,
    explanation:
      'Testing from the furthest practical point includes the full circuit conductor resistance in the test, proving protection coverage throughout the circuit rather than just at the device.',
  },
  {
    question:
      'Under BS EN 61008/61009, what is the maximum operating time for a non-delay Type AC RCD at 5 × IΔn?',
    options: [
      '40ms',
      '150ms',
      '200ms',
      '300ms',
    ],
    correctAnswer: 0,
    explanation:
      '40ms is the product-standard figure for a non-delay device at 5 × IΔn; the equivalent for an S-type (time-delay) device is 150ms. Both describe the device under BS EN 61008/61009 rather than the test BS 7671 requires — Amendment 4 deleted Table 3A of Appendix 3, and Regulation 643.7.3.201 now verifies effectiveness with a single AC test at IΔn.',
  },
  {
    question:
      'How does BS 7671:2018+A4:2026 require the effectiveness of an RCD to be verified?',
    options: [
      'A test at ½ × IΔn, then 1 × IΔn, then 5 × IΔn',
      'A single alternating current test at IΔn, whatever the RCD type',
      'A test at 5 × IΔn only, on both half-cycles',
      'The integral test button alone',
    ],
    correctAnswer: 1,
    explanation:
      'Amendment 4 simplified this considerably. Table 3A (time/current performance criteria for RCDs) has been deleted from Appendix 3, and Regulation 643.7.3.201 now calls for an alternating current test at the rated residual operating current (IΔn) to verify effectiveness, regardless of RCD type — AC, A, F or B. The ½ × and 5 × tests are no longer part of the required sequence, though 5 × remains useful when fault-finding. The integral test button checks the mechanism only and has never been a substitute for an instrument test.',
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
    question: 'For a three-phase RCD, how should the trip-time test be carried out?',
    options: [
      'Test each line conductor to neutral in turn and record the longest time',
      'Test one line only, since all poles share the same sensing core',
      'Test only the line carrying the highest load current',
      'Test line-to-line across two phases to double the residual current',
    ],
    correctAnswer: 0,
    explanation:
      'Each line conductor is tested to neutral in turn because tripping performance can differ between poles; the longest trip time recorded is the result for the device.',
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
