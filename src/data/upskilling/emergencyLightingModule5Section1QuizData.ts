import { QuizQuestion } from '@/components/quiz/types';

export const emergencyLightingModule5Section1QuizData: QuizQuestion[] = [
  {
    id: 1,
    question: 'What is the purpose of initial inspection in emergency lighting?',
    options: [
      'Because airborne fibres may still be present on the worker\\\\\\\\\\\\\\\'s body and clothing during decontamination',
      'To confirm installation matches design, identify faults, and form the basis of certification',
      'A failure to implement condition-based monitoring that would have provided early warning of deterioration',
      'To safely discharge stored energy when disconnected, preventing shock hazard',
    ],
    correctAnswer: 1,
    explanation:
      'Initial inspection confirms that the installation matches the approved design drawings, identifies faults or defects before the system is live, provides assurance that system integrity will be maintained in an emergency, and forms the basis of the commissioning certificate.',
  },
  {
    id: 2,
    question: 'Which two British Standards govern inspection requirements for emergency lighting?',
    options: [
      'BS 5839 and BS 6004',
      'BS 7909 and BS 7430',
      'BS 5266 and BS 7671',
      'BS 1363 and BS 4662',
    ],
    correctAnswer: 2,
    explanation:
      'BS 5266-1 provides the code of practice for emergency lighting systems, while BS 7671 (IET Wiring Regulations) covers the electrical installation requirements. Both standards must be followed during inspection.',
  },
  {
    id: 3,
    question: 'What type of cable must be verified for emergency circuits?',
    options: [
      'To prevent equipment being live when \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'off\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'',
      'Resume CPR immediately for 2 minutes before the AED re-analyses',
      'To maintain autonomy and reliability',
      'Fire-resistant, LSZH, or MICC cable where required',
    ],
    correctAnswer: 3,
    explanation:
      'Emergency lighting circuits must use appropriate fire-resistant cables such as FP200, LSZH (Low Smoke Zero Halogen), or MICC (Mineral Insulated Copper Clad) cables to maintain circuit integrity during a fire.',
  },
  {
    id: 4,
    question: 'Why must plastic fixings not be used for emergency lighting cables?',
    options: [
      'They do not meet non-combustible fixing requirements in BS 7671 Reg. 521.10.202',
      'Non-maintained luminaires installed where maintained fittings were specified',
      'Emergency circuits must be kept separate from normal supply',
      'To confirm installation matches design, identify faults, and form the basis of certification',
    ],
    correctAnswer: 0,
    explanation:
      'BS 7671 Regulation 521.10.202 requires non-combustible supports and fixings for emergency lighting cables to ensure they remain secure during a fire. Plastic fixings would melt and fail, potentially causing cable failure.',
  },
  {
    id: 5,
    question: 'What must be checked regarding segregation of circuits?',
    options: [
      'Emergency circuits must be in the same conduit as data cables',
      'Emergency circuits must be kept separate from normal supply',
      'All circuits must share the same distribution board',
      'Segregation is not required for emergency lighting',
    ],
    correctAnswer: 1,
    explanation:
      'Emergency lighting circuits must be kept separate from normal supply circuits to prevent faults in the normal supply affecting the emergency system. This segregation ensures system integrity during emergencies.',
  },
  {
    id: 6,
    question: 'Name one electrical verification test carried out before energising.',
    options: [
      'Acoustic testing',
      'Visual inspection only',
      'Continuity of conductors',
      'Colour temperature measurement',
    ],
    correctAnswer: 2,
    explanation:
      'Continuity testing confirms that all conductors are properly connected throughout the circuit. Other essential tests include insulation resistance, polarity, and earth fault loop impedance testing.',
  },
  {
    id: 7,
    question: 'Which test confirms correct polarity of circuits?',
    options: [
      'Earth fault loop impedance test',
      'Insulation resistance test',
      'Continuity test',
      'Polarity test',
    ],
    correctAnswer: 3,
    explanation:
      'A polarity test specifically confirms that live and neutral conductors are correctly connected throughout the circuit, preventing potentially dangerous reversed connections.',
  },
  {
    id: 8,
    question: 'What pictogram standard must be used for exit signs?',
    options: [
      'ISO 7010',
      'ISO 9001',
      'BS EN 12464',
      'IEC 60364',
    ],
    correctAnswer: 0,
    explanation:
      'ISO 7010 is the international standard for safety signs, including emergency exit signs. It ensures consistent, universally recognizable pictograms for safe evacuation guidance.',
  },
  {
    id: 9,
    question: 'Why should defects be recorded during inspection?',
    options: [
      'The contractor who employs the injured worker',
      'So they can be corrected before commissioning',
      'Immediately, by the quickest practicable means',
      'It affects visual performance at mesopic light levels',
    ],
    correctAnswer: 1,
    explanation:
      'Recording defects immediately ensures they can be systematically corrected before commissioning. This prevents non-compliance issues and ensures the system will function correctly when needed.',
  },
  {
    id: 10,
    question: 'In the Manchester office case study, what error was found during commissioning?',
    options: [
      'To confirm installation matches design, identify faults, and form the basis of certification',
      'They do not meet non-combustible fixing requirements in BS 7671 Reg. 521.10.202',
      'Non-maintained luminaires installed where maintained fittings were specified',
      'Emergency circuits must be kept separate from normal supply',
    ],
    correctAnswer: 2,
    explanation:
      'The case study highlighted that non-maintained luminaires were incorrectly installed in areas where the design specified maintained fittings. This mistake caused delays and rework, demonstrating the importance of verifying luminaire types against design drawings during initial inspection.',
  },
];
