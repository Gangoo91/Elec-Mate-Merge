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
    question: "Under which regulation is there a legal duty to maintain electrical systems to prevent danger?",
    options: [
      "Building Regulations Part P",
      "Electricity at Work Regulations 1989",
      "Housing Act 2004",
      "CDM Regulations 2015"
    ],
    correctAnswer: 1,
    explanation: "The Electricity at Work Regulations 1989, specifically Regulation 4(2), places a legal duty on duty holders to maintain electrical systems in a safe condition to prevent danger."
  },
  {
    id: 2,
    question: "Which type of certificate is required for adding a new circuit to an existing domestic installation?",
    options: [
      "Minor Electrical Installation Works Certificate",
      "Electrical Installation Condition Report",
      "Electrical Installation Certificate",
      "Periodic Inspection Report"
    ],
    correctAnswer: 2,
    explanation: "An Electrical Installation Certificate (EIC) is required when adding new circuits to existing installations, as this constitutes a significant alteration requiring full design, installation, and testing verification."
  },
  {
    id: 3,
    question: "What is the minimum qualification typically required to sign electrical certificates?",
    options: [
      "City & Guilds 2365 Level 3",
      "City & Guilds 2391 Inspection and Testing",
      "17th Edition qualification only",
      "NVQ Level 3 Electrical Installation"
    ],
    correctAnswer: 1,
    explanation: "City & Guilds 2391 Inspection and Testing (or equivalent) is typically the minimum qualification required to demonstrate competency for signing electrical certificates, combined with appropriate experience and current BS 7671 knowledge."
  },
  {
    id: 4,
    question: "How often must electrical installations be inspected in private rental properties in England?",
    options: [
      "Every 3 years",
      "Every 5 years",
      "Every 10 years",
      "Only when tenancy changes"
    ],
    correctAnswer: 1,
    explanation: "Under the Housing Act 2004 and associated regulations, electrical installations in private rental properties in England must be inspected every 5 years by a qualified electrician."
  },
  {
    id: 5,
    question: "Who accepts responsibility when signing an Electrical Installation Certificate?",
    options: [
      "Only the person who designed the installation",
      "Only the person who installed the work",
      "Only the person who tested the installation",
      "All parties who sign accept responsibility for their respective roles"
    ],
    correctAnswer: 3,
    explanation: "The EIC requires signatures from the designer, installer, and inspector/tester (which may be the same person). Each signature represents acceptance of responsibility for their respective role in ensuring compliance."
  },
  {
    id: 6,
    question: "What should be done if a dangerous defect (C1) is discovered during inspection?",
    options: [
      "Note it on the certificate and leave energised",
      "Immediately make safe and do not energise until repaired",
      "Advise the client but take no immediate action",
      "Code it as C2 potentially dangerous instead"
    ],
    correctAnswer: 1,
    explanation: "A C1 (danger present) defect requires immediate action to make the installation safe. The installation should not be energised until the dangerous condition is rectified."
  },
  {
    id: 7,
    question: "Which document provides evidence of compliance with Building Regulations Part P?",
    options: [
      "Electrical Installation Condition Report only",
      "Building control completion certificate only",
      "Electrical Installation Certificate or Minor Works Certificate",
      "Competent person scheme membership card"
    ],
    correctAnswer: 2,
    explanation: "Electrical Installation Certificates or Minor Electrical Installation Works Certificates provide evidence of compliance with Building Regulations Part P when issued by competent persons."
  },
  {
    id: 8,
    question: "What is the consequence of signing an inaccurate electrical certificate?",
    options: [
      "No consequences if errors are minor",
      "Only professional disciplinary action",
      "Potential criminal liability and civil responsibility",
      "Only insurance implications"
    ],
    correctAnswer: 2,
    explanation: "Signing inaccurate certificates can result in criminal liability under the Electricity at Work Regulations, civil liability for accidents, professional disciplinary action, and insurance policy invalidation."
  },
  {
    id: 9,
    question: "When is Building Regulations notification NOT required for electrical work in dwellings?",
    options: [
      "When work is performed by registered competent person scheme members",
      "When work is outside kitchen and bathroom areas",
      "When work involves only socket outlet additions",
      "Building Regulations notification is always required"
    ],
    correctAnswer: 0,
    explanation: "Registered competent person scheme members can self-certify compliance with Building Regulations Part P without requiring separate local authority notification."
  },
  {
    id: 10,
    question: "How long should electrical certificates be retained?",
    options: [
      "5 years minimum",
      "10 years minimum",
      "25 years minimum",
      "For the life of the electrical installation"
    ],
    correctAnswer: 3,
    explanation: "Electrical certificates should be retained for the life of the electrical installation to provide ongoing evidence of compliance and support maintenance planning."
  }
];