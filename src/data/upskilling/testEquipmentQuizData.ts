import type { QuizQuestion } from '@/types/quiz';

export const testEquipmentQuizData: QuizQuestion[] = [
  {
    id: 1,
    question: 'How often should test equipment typically be calibrated?',
    options: [
      'Only when a reading looks suspect',
      'Annually to traceable standards',
      'Every five years at the manufacturer',
      'Once on purchase, then never again',
    ],
    correctAnswer: 1,
    explanation:
      'Most test equipment should be calibrated annually to traceable national standards, though frequency may vary based on usage and manufacturer recommendations.',
  },
  {
    id: 2,
    question:
      'What is the primary safety requirement for test leads used in live electrical testing?',
    options: [
      'They must be red and black in colour',
      'They must be exactly 1 metre long',
      'They must be CAT III or CAT IV rated with finger guards',
      'They must have gold-plated connectors',
    ],
    correctAnswer: 2,
    explanation:
      'Test leads must have appropriate CAT III or CAT IV safety ratings and include finger guards to protect against accidental contact with live parts during testing.',
  },
  {
    id: 3,
    question: 'What should you do if your test equipment fails its daily verification check?',
    options: [
      'Continue using it but note the failure',
      'Recalibrate it yourself',
      'Use it only for low-voltage testing',
      'Withdraw it from service immediately',
    ],
    correctAnswer: 3,
    explanation:
      'Equipment that fails verification checks must be withdrawn from service immediately to prevent inaccurate measurements that could indicate safety when dangerous conditions exist.',
  },
  {
    id: 4,
    question: 'Why is non-trip mode necessary when testing RCD-protected circuits?',
    options: [
      'It prevents the RCD from operating during testing',
      'It tests the RCD function automatically',
      'It provides more accurate readings',
      'It reduces the test time significantly',
    ],
    correctAnswer: 0,
    explanation:
      'Non-trip mode uses reduced test current (typically <15mA) to stay below the RCD trip threshold, allowing loop impedance measurement without causing disconnection.',
  },
  {
    id: 5,
    question: 'What environmental factor most significantly affects impedance measurements?',
    options: [
      'Humidity levels',
      'Temperature variations',
      'Barometric pressure',
      'Wind speed',
    ],
    correctAnswer: 1,
    explanation:
      'Temperature significantly affects conductor resistance, which directly impacts impedance measurements. Temperature correction may be required for accurate results.',
  },
  {
    id: 6,
    question: 'What is the typical measurement tolerance for most multifunction tester functions?',
    options: [
      '±(0.5% + 1 digit)',
      '±0.1%',
      '±(2% + 2 digits)',
      '±10%',
    ],
    correctAnswer: 2,
    explanation:
      'Most multifunction testers have measurement tolerances of approximately ±(2% + 2 digits) for impedance measurements, though this varies by function and manufacturer.',
  },
  {
    id: 7,
    question: 'Which daily check is most important for ensuring measurement accuracy?',
    options: [
      'Cleaning the display screen',
      'Checking the carrying case condition',
      'Verifying the equipment serial number',
      'Testing against a known reference standard',
    ],
    correctAnswer: 3,
    explanation:
      'Testing against a known reference standard verifies that the equipment is measuring accurately and helps detect calibration drift or equipment problems.',
  },
  {
    id: 8,
    question: 'What should be done with test equipment that exceeds calibration tolerances?',
    options: [
      'Have it professionally repaired and recalibrated',
      'Adjust it to read correctly',
      'Continue using it with noted limitations',
      'Use it only for approximate measurements',
    ],
    correctAnswer: 0,
    explanation:
      'Equipment exceeding tolerances must be professionally repaired and recalibrated. All recent measurements should be reviewed for potential impact on safety assessments.',
  },
  {
    id: 9,
    question:
      'What is the primary advantage of modern multifunction testers over separate instruments?',
    options: [
      'They are always more accurate than dedicated single-function instruments',
      'They provide multiple test functions in one unit with consistent operation',
      'They remove the need for periodic calibration of the instrument',
      'They allow live testing without observing GS38 safety precautions',
    ],
    correctAnswer: 1,
    explanation:
      'Multifunction testers provide multiple test capabilities in one unit with consistent operation interfaces, reducing setup time and potential operator errors.',
  },
  {
    id: 10,
    question: 'When testing in high EMI environments, what precaution should be taken?',
    options: [
      'Switch the tester to its highest measurement range',
      'Disconnect the earth lead to reduce interference',
      'Shield test leads and verify readings are stable',
      'Increase the test current to override the interference',
    ],
    correctAnswer: 2,
    explanation:
      'In high EMI environments, use shielded test leads where possible, verify readings are stable and repeatable, and consider relocating or isolating EMI sources if practical.',
  },
];
