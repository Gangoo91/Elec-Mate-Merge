export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const certificationPurposeQuizData: QuizQuestion[] = [
  {
    id: 1,
    question:
      'Under which regulation is there a legal duty to maintain electrical systems to prevent danger?',
    options: [
      'BS 7671:2018+A2:2022 Wiring Regulations',
      'Electricity at Work Regulations 1989',
      'Building Regulations 2010, Part P',
      'Health and Safety at Work etc. Act 1974',
    ],
    correctAnswer: 1,
    explanation:
      'The Electricity at Work Regulations 1989, specifically Regulation 4(2), places a legal duty on duty holders to maintain electrical systems in a safe condition to prevent danger. BS 7671 is a non-statutory standard and Part P covers building work, not ongoing maintenance.',
  },
  {
    id: 2,
    question:
      'Which type of certificate is required for adding a new circuit to an existing domestic installation?',
    options: [
      'Minor Electrical Installation Works Certificate',
      'Electrical Installation Condition Report',
      'Electrical Installation Certificate',
      'Periodic Inspection Report',
    ],
    correctAnswer: 2,
    explanation:
      'An Electrical Installation Certificate (EIC) is required when adding new circuits to existing installations, as this constitutes a significant alteration requiring full design, installation, and testing verification.',
  },
  {
    id: 3,
    question:
      'What is the minimum qualification typically required to sign electrical certificates?',
    options: [
      'City & Guilds 2365 Level 3',
      'NVQ Level 3 Electrical Installation',
      '17th Edition qualification only',
      'City & Guilds 2391 Inspection and Testing',
    ],
    correctAnswer: 3,
    explanation:
      'City & Guilds 2391 Inspection and Testing (or equivalent) is typically the minimum qualification required to demonstrate competency for signing electrical certificates, combined with appropriate experience and current BS 7671 knowledge.',
  },
  {
    id: 4,
    question:
      'How often must electrical installations be inspected in private rental properties in England?',
    options: [
      'Every 5 years',
      'Every 10 years',
      'Every 3 years',
      'Only when tenancy changes',
    ],
    correctAnswer: 0,
    explanation:
      'Under the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020, electrical installations in private rental properties in England must be inspected and tested at least every 5 years by a qualified person.',
  },
  {
    id: 5,
    question: 'Who accepts responsibility when signing an Electrical Installation Certificate?',
    options: [
      'Only the client who ordered and paid for the work',
      'All parties who sign accept responsibility for their respective roles',
      'Only the competent person scheme operator overseeing the contractor',
      'Solely the inspector and tester who completes the final verification',
    ],
    correctAnswer: 1,
    explanation:
      'The EIC requires signatures from the designer, installer, and inspector/tester (which may be the same person). Each signature represents acceptance of responsibility for their respective role in ensuring compliance.',
  },
  {
    id: 6,
    question: 'What should be done if a dangerous defect (C1) is discovered during inspection?',
    options: [
      'Code it as C2 potentially dangerous instead',
      'Note it on the certificate and leave energised',
      'Immediately make safe and do not energise until repaired',
      'Advise the client but take no immediate action',
    ],
    correctAnswer: 2,
    explanation:
      'A C1 (danger present) defect requires immediate action to make the installation safe. The installation should not be energised until the dangerous condition is rectified.',
  },
  {
    id: 7,
    question: 'Which document provides evidence of compliance with Building Regulations Part P?',
    options: [
      'Electrical Installation Condition Report only',
      'Building control completion certificate only',
      'Competent person scheme membership card',
      'Electrical Installation Certificate or Minor Works Certificate',
    ],
    correctAnswer: 3,
    explanation:
      'Electrical Installation Certificates or Minor Electrical Installation Works Certificates provide evidence of compliance with Building Regulations Part P when issued by competent persons.',
  },
  {
    id: 8,
    question: 'What is the consequence of signing an inaccurate electrical certificate?',
    options: [
      'Potential criminal liability and civil responsibility',
      'A written warning from the competent person scheme only',
      'The certificate is simply voided with no further consequence',
      'Liability passes entirely to the client who commissioned the work',
    ],
    correctAnswer: 0,
    explanation:
      'Signing inaccurate certificates can result in criminal liability under the Electricity at Work Regulations, civil liability for accidents, professional disciplinary action, and insurance policy invalidation.',
  },
  {
    id: 9,
    question:
      'When is Building Regulations notification NOT required for electrical work in dwellings?',
    options: [
      'When work is outside kitchen and bathroom areas',
      'When work is performed by registered competent person scheme members',
      'When work involves only socket outlet additions',
      'Building Regulations notification is always required',
    ],
    correctAnswer: 1,
    explanation:
      'Registered competent person scheme members can self-certify compliance with Building Regulations Part P without requiring separate local authority notification.',
  },
  {
    id: 10,
    question: 'How long should electrical certificates be retained?',
    options: [
      'For a minimum of 2 years after issue',
      'Until the next periodic inspection is completed',
      'For the life of the electrical installation',
      'For 6 years to match statutory limitation periods',
    ],
    correctAnswer: 2,
    explanation:
      'Electrical certificates should be retained for the life of the electrical installation to provide ongoing evidence of compliance and support maintenance planning.',
  },
];
