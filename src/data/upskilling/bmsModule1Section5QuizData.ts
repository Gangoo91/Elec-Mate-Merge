export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const bmsModule1Section5QuizData: QuizQuestion[] = [
  {
    id: 1,
    question: 'What is the purpose of ISO 16484?',
    options: [
      'To set energy efficiency targets for all buildings',
      'To provide international guidance for BMS design and operation',
      'To define electrical safety requirements only',
      'To regulate building construction methods',
    ],
    correctAnswer: 1,
    explanation:
      'ISO 16484 provides comprehensive international guidance for the design, operation, and functionality of Building Management Systems, ensuring consistency and quality across different implementations.',
  },
  {
    id: 2,
    question: 'How does ISO 16484 improve BMS compatibility?',
    options: [
      "By mandating a single approved manufacturer per installation",
      "By setting fixed energy consumption limits for each building type",
      "By ensuring interoperability between different manufacturers' systems",
      "By requiring all controllers to be replaced every five years",
    ],
    correctAnswer: 2,
    explanation:
      "ISO 16484 ensures interoperability by establishing common protocols and standards that allow different manufacturers' BMS components to work together seamlessly.",
  },
  {
    id: 3,
    question: 'What is the focus of EN 15232?',
    options: [
      'Fire detection and alarm system wiring requirements',
      'The mechanical installation of HVAC ductwork',
      'Cyber-security standards for networked controllers',
      'Energy performance of buildings through automation',
    ],
    correctAnswer: 3,
    explanation:
      'EN 15232 specifically focuses on how building automation and control systems affect energy efficiency and performance in buildings.',
  },
  {
    id: 4,
    question: 'What do energy classes in EN 15232 represent?',
    options: [
      'Efficiency levels achieved with automation (A to D)',
      'The fire resistance rating of the control panel enclosure',
      'The maximum number of devices allowed on a network',
      'The voltage rating of the building automation bus',
    ],
    correctAnswer: 0,
    explanation:
      'EN 15232 defines energy classes from A to D, where Class A represents the highest efficiency level achieved through building automation, and Class D represents basic or no automation.',
  },
  {
    id: 5,
    question: 'Why are standards important for electricians?',
    options: [
      'They only affect manufacturers, not installers',
      'They ensure safe, efficient, and future-proof installations',
      'They make installations more complex',
      'They are optional guidelines only',
    ],
    correctAnswer: 1,
    explanation:
      'Standards are crucial for electricians as they ensure installations are safe, efficient, compliant with regulations, and future-proof, while also providing professional credibility.',
  },
  {
    id: 6,
    question: 'What are the risks of not complying with standards?',
    options: [
      'Slightly reduced system performance',
      'Minor inconvenience only',
      'Legal and financial penalties',
      'No significant consequences',
    ],
    correctAnswer: 2,
    explanation:
      'Failure to comply with BMS standards can result in serious legal and financial penalties, insurance issues, safety risks, and loss of professional credibility.',
  },
  {
    id: 7,
    question: 'Give one way ISO 16484 affects system design.',
    options: [
      'It fixes the installed cost per point for every project',
      'It bans the use of wireless sensors in commercial buildings',
      'It specifies the brand of cable that must be installed',
      'It defines system architecture and data exchange protocols',
    ],
    correctAnswer: 3,
    explanation:
      'ISO 16484 significantly affects system design by defining proper system architecture, data exchange protocols, functionality requirements, and integration methods.',
  },
  {
    id: 8,
    question: 'Give one way EN 15232 encourages energy savings.',
    options: [
      'By promoting automation for lighting, HVAC, and shading systems',
      'By requiring thicker insulation in external walls',
      'By limiting the number of occupants permitted per floor',
      'By increasing the supply voltage to reduce cable losses',
    ],
    correctAnswer: 0,
    explanation:
      'EN 15232 encourages energy savings by promoting the use of automation for lighting, HVAC, and shading systems to reduce energy waste and optimise building performance.',
  },
  {
    id: 9,
    question: 'How can electricians use standards as a selling point to clients?',
    options: [
      'Standards only matter for large projects',
      'By showing how BMS improves compliance and efficiency',
      'By avoiding mention of standards completely',
      'Standards are not relevant to clients',
    ],
    correctAnswer: 1,
    explanation:
      'Electricians can use standards as a selling point by demonstrating how compliance with ISO 16484 and EN 15232 delivers measurable benefits including energy savings, improved efficiency, and reduced operational costs.',
  },
  {
    id: 10,
    question:
      'In the real-world example, what energy class improvement was achieved in the office building?',
    options: [
      'From class D to class B',
      'From class B to class A',
      'From class C to class A',
      'No class change occurred',
    ],
    correctAnswer: 2,
    explanation:
      'The London commercial office achieved an improvement from energy class C to class A through BMS upgrades, resulting in a 22% reduction in annual energy bills and meeting sustainability targets.',
  },
];
