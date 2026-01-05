import type { QuizQuestion } from '@/types/quiz';

export const testEquipmentQuizData: QuizQuestion[] = [
  {
    id: 1,
    question: 'How often should test equipment typically be calibrated?',
    options: [
      'Every 6 months',
      'Annually to traceable standards',
      'Every 2 years',
      'Only when it appears to malfunction'
    ],
    correctAnswer: 1,
    explanation: 'Most test equipment should be calibrated annually to traceable national standards, though frequency may vary based on usage and manufacturer recommendations.'
  },
  {
    id: 2,
    question: 'What is the primary safety requirement for test leads used in live electrical testing?',
    options: [
      'They must be red and black in colour',
      'They must be CAT III or CAT IV rated with finger guards',
      'They must be exactly 1 metre long',
      'They must have gold-plated connectors'
    ],
    correctAnswer: 1,
    explanation: 'Test leads must have appropriate CAT III or CAT IV safety ratings and include finger guards to protect against accidental contact with live parts during testing.'
  },
  {
    id: 3,
    question: 'What should you do if your test equipment fails its daily verification check?',
    options: [
      'Continue using it but note the failure',
      'Withdraw it from service immediately',
      'Use it only for low-voltage testing',
      'Recalibrate it yourself'
    ],
    correctAnswer: 1,
    explanation: 'Equipment that fails verification checks must be withdrawn from service immediately to prevent inaccurate measurements that could indicate safety when dangerous conditions exist.'
  },
  {
    id: 4,
    question: 'Why is non-trip mode necessary when testing RCD-protected circuits?',
    options: [
      'It provides more accurate readings',
      'It prevents the RCD from operating during testing',
      'It tests the RCD function automatically',
      'It reduces the test time significantly'
    ],
    correctAnswer: 1,
    explanation: 'Non-trip mode uses reduced test current (typically <15mA) to stay below the RCD trip threshold, allowing loop impedance measurement without causing disconnection.'
  },
  {
    id: 5,
    question: 'What environmental factor most significantly affects impedance measurements?',
    options: [
      'Humidity levels',
      'Barometric pressure',
      'Temperature variations',
      'Wind speed'
    ],
    correctAnswer: 2,
    explanation: 'Temperature significantly affects conductor resistance, which directly impacts impedance measurements. Temperature correction may be required for accurate results.'
  },
  {
    id: 6,
    question: 'What is the typical measurement tolerance for most multifunction tester functions?',
    options: [
      '±0.1%',
      '±(2% + 2 digits)',
      '±10%',
      '±(0.5% + 1 digit)'
    ],
    correctAnswer: 1,
    explanation: 'Most multifunction testers have measurement tolerances of approximately ±(2% + 2 digits) for impedance measurements, though this varies by function and manufacturer.'
  },
  {
    id: 7,
    question: 'Which daily check is most important for ensuring measurement accuracy?',
    options: [
      'Cleaning the display screen',
      'Checking the carrying case condition',
      'Testing against a known reference standard',
      'Verifying the equipment serial number'
    ],
    correctAnswer: 2,
    explanation: 'Testing against a known reference standard verifies that the equipment is measuring accurately and helps detect calibration drift or equipment problems.'
  },
  {
    id: 8,
    question: 'What should be done with test equipment that exceeds calibration tolerances?',
    options: [
      'Continue using it with noted limitations',
      'Adjust it to read correctly',
      'Have it professionally repaired and recalibrated',
      'Use it only for approximate measurements'
    ],
    correctAnswer: 2,
    explanation: 'Equipment exceeding tolerances must be professionally repaired and recalibrated. All recent measurements should be reviewed for potential impact on safety assessments.'
  },
  {
    id: 9,
    question: 'What is the primary advantage of modern multifunction testers over separate instruments?',
    options: [
      'They are always more accurate',
      'They cost less than individual instruments',
      'They provide multiple test functions in one unit with consistent operation',
      'They never need calibration'
    ],
    correctAnswer: 2,
    explanation: 'Multifunction testers provide multiple test capabilities in one unit with consistent operation interfaces, reducing setup time and potential operator errors.'
  },
  {
    id: 10,
    question: 'When testing in high EMI environments, what precaution should be taken?',
    options: [
      'Use longer test leads',
      'Test only during certain times of day',
      'Shield test leads and verify readings are stable',
      'Increase the test voltage'
    ],
    correctAnswer: 2,
    explanation: 'In high EMI environments, use shielded test leads where possible, verify readings are stable and repeatable, and consider relocating or isolating EMI sources if practical.'
  }
];