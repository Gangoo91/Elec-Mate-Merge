import { QuizQuestion } from '@/components/quiz/types';

export const emergencyLightingModule5Section3QuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'What is the purpose of monthly functional tests?',
    options: [
      'To replace batteries before they fail',
      'To confirm luminaires switch to emergency mode when mains fails',
      'To fully discharge batteries for recalibration',
      'To test the charging circuit voltage under load',
    ],
    correctAnswer: 1,
    explanation:
      'Monthly functional tests verify that all emergency luminaires switch to battery power when mains supply fails, confirming ongoing system readiness without significantly depleting battery capacity.',
  },
  {
    id: 2,
    question: 'Why must monthly tests be kept short?',
    options: [
      'To maintain some emergency lighting coverage while testing other zones',
      'To confirm luminaires switch to emergency mode when mains fails',
      'To prevent unnecessary battery discharge and avoid 24-hour recharge periods',
      'Insurance may be invalid, enforcement notices issued, and Responsible Person may face prosecution',
    ],
    correctAnswer: 2,
    explanation:
      'Short tests avoid draining battery capacity unnecessarily, prevent the need for 24-hour recharge periods, reduce cumulative battery cycling, and maintain system readiness while still confirming that luminaires switch correctly to emergency mode.',
  },
  {
    id: 3,
    question: 'What is the duration of the annual test in most buildings?',
    options: [
      '30 minutes',
      '1 hour',
      '6 hours',
      '3 hours',
    ],
    correctAnswer: 3,
    explanation:
      'The annual duration test requires emergency lighting to operate for the full rated autonomy period, which is typically 3 hours in most buildings. Some specific applications may require only 1 hour, but 3 hours is the standard.',
  },
  {
    id: 4,
    question: 'What key factor does the annual test prove that the monthly test does not?',
    options: [
      'That batteries can sustain illumination for the full 3-hour rated period',
      'To maintain some emergency lighting coverage while testing other zones',
      'To prevent unnecessary battery discharge and avoid 24-hour recharge periods',
      'To confirm luminaires switch to emergency mode when mains fails',
    ],
    correctAnswer: 0,
    explanation:
      "The annual test proves batteries have sufficient capacity to maintain illumination for the complete 3-hour period under realistic load conditions. Monthly tests only confirm switching and basic operation but don't verify sustained battery capacity. The annual test identifies weak batteries that may pass short tests but fail under prolonged operation.",
  },
  {
    id: 5,
    question: 'What law requires emergency lighting systems to be maintained?',
    options: [
      'Building Regulations Part B',
      'Regulatory Reform (Fire Safety) Order 2005',
      'Health and Safety at Work Act 1974',
      'Electricity at Work Regulations 1989',
    ],
    correctAnswer: 1,
    explanation:
      'The Regulatory Reform (Fire Safety) Order 2005 legally requires the Responsible Person to maintain life safety systems, including emergency lighting, in efficient working order. This is the primary UK fire safety legislation.',
  },
  {
    id: 6,
    question: 'What British Standard outlines testing procedures?',
    options: [
      'BS EN 60598',
      'BS 7671',
      'BS 5266-8',
      'BS 5839-1',
    ],
    correctAnswer: 2,
    explanation:
      'BS 5266-8 (which incorporates EN 50172) defines the specific testing intervals and procedures for emergency lighting systems, including monthly functional tests and annual duration tests.',
  },
  {
    id: 7,
    question:
      'What details must be recorded in the emergency lighting logbook? (Select all that apply - multiple correct answers)',
    options: [
      'That batteries can sustain illumination for the full 3-hour rated period',
      'To prevent unnecessary battery discharge and avoid 24-hour recharge periods',
      'Insurance may be invalid, enforcement notices issued, and Responsible Person may face prosecution',
      'Date of test, type of test, person conducting test, pass/fail results, defects and remedial action',
    ],
    correctAnswer: 3,
    explanation:
      'The logbook must record five essential details: (1) Date of test, (2) Type of test (monthly or annual), (3) Person carrying out the test, (4) Results (pass/fail), and (5) Any defects and remedial action taken. These records must be made available to fire authorities and insurers.',
  },
  {
    id: 8,
    question: 'Why should annual tests in large buildings be staggered?',
    options: [
      'To maintain some emergency lighting coverage while testing other zones',
      'To spread the cost over the financial year',
      'Because testing all zones at once would trip the main breaker',
      'To allow batteries in different zones to age at different rates',
    ],
    correctAnswer: 0,
    explanation:
      'Staggering annual duration tests across zones ensures that not all areas are left without emergency lighting protection simultaneously. For example, testing one floor per quarter means other floors maintain full coverage while one zone is being tested.',
  },
  {
    id: 9,
    question: 'What is the risk of not keeping test records?',
    options: [
      'That batteries can sustain illumination for the full 3-hour rated period',
      'Insurance may be invalid, enforcement notices issued, and Responsible Person may face prosecution',
      'To maintain some emergency lighting coverage while testing other zones',
      'Date of test, type of test, person conducting test, pass/fail results, defects and remedial action',
    ],
    correctAnswer: 1,
    explanation:
      'Failure to maintain test records can result in invalid insurance coverage, enforcement notices from Fire and Rescue Authority, unlimited fines, criminal prosecution of the Responsible Person, and potential imprisonment in severe cases. Testing without documentation is legally worthless.',
  },
  {
    id: 10,
    question: 'What happened at the Birmingham retail park case study?',
    options: [
      'Each person applies their own personal safety lock — the circuit cannot be re-energised until every individual lock has been removed by its owner',
      'A programmed response that triggers specific actions based on which devices are activated',
      'Fire inspection found working lights but no logbook records, resulting in enforcement notice and £5,150 remedial costs',
      'The rapid transition to a state of full involvement of all combustible materials in a compartment, caused by intense radiant heat',
    ],
    correctAnswer: 2,
    explanation:
      'Despite having functional emergency lighting, the retail park could not produce test records during fire inspection. This resulted in an enforcement notice, immediate remedial testing costing £5,150, increased insurance premiums, and potential prosecution risk. The case highlights that testing without proper documentation is legally worthless.',
  },
];
