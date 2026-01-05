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
    question: "What is the purpose of ISO 16484?",
    options: [
      "To define electrical safety requirements only",
      "To provide international guidance for BMS design and operation",
      "To regulate building construction methods",
      "To set energy efficiency targets for all buildings"
    ],
    correctAnswer: 1,
    explanation: "ISO 16484 provides comprehensive international guidance for the design, operation, and functionality of Building Management Systems, ensuring consistency and quality across different implementations."
  },
  {
    id: 2,
    question: "How does ISO 16484 improve BMS compatibility?",
    options: [
      "By requiring all systems to use the same manufacturer",
      "By standardising electrical connections only",
      "By ensuring interoperability between different manufacturers' systems",
      "By limiting system complexity"
    ],
    correctAnswer: 2,
    explanation: "ISO 16484 ensures interoperability by establishing common protocols and standards that allow different manufacturers' BMS components to work together seamlessly."
  },
  {
    id: 3,
    question: "What is the focus of EN 15232?",
    options: [
      "Building structural integrity",
      "Fire safety systems",
      "Energy performance of buildings through automation",
      "Electrical installation methods"
    ],
    correctAnswer: 2,
    explanation: "EN 15232 specifically focuses on how building automation and control systems affect energy efficiency and performance in buildings."
  },
  {
    id: 4,
    question: "What do energy classes in EN 15232 represent?",
    options: [
      "Building size categories",
      "Efficiency levels achieved with automation (A to D)",
      "Construction material types",
      "Electrical load classifications"
    ],
    correctAnswer: 1,
    explanation: "EN 15232 defines energy classes from A to D, where Class A represents the highest efficiency level achieved through building automation, and Class D represents basic or no automation."
  },
  {
    id: 5,
    question: "Why are standards important for electricians?",
    options: [
      "They only affect manufacturers, not installers",
      "They ensure safe, efficient, and future-proof installations",
      "They make installations more complex",
      "They are optional guidelines only"
    ],
    correctAnswer: 1,
    explanation: "Standards are crucial for electricians as they ensure installations are safe, efficient, compliant with regulations, and future-proof, while also providing professional credibility."
  },
  {
    id: 6,
    question: "What are the risks of not complying with standards?",
    options: [
      "Minor inconvenience only",
      "Legal and financial penalties",
      "No significant consequences",
      "Slightly reduced system performance"
    ],
    correctAnswer: 1,
    explanation: "Failure to comply with BMS standards can result in serious legal and financial penalties, insurance issues, safety risks, and loss of professional credibility."
  },
  {
    id: 7,
    question: "Give one way ISO 16484 affects system design.",
    options: [
      "It only covers cable colours",
      "It defines system architecture and data exchange protocols",
      "It limits system size only",
      "It specifies building materials"
    ],
    correctAnswer: 1,
    explanation: "ISO 16484 significantly affects system design by defining proper system architecture, data exchange protocols, functionality requirements, and integration methods."
  },
  {
    id: 8,
    question: "Give one way EN 15232 encourages energy savings.",
    options: [
      "By promoting automation for lighting, HVAC, and shading systems",
      "By limiting building size",
      "By requiring manual controls only",
      "By restricting system functionality"
    ],
    correctAnswer: 0,
    explanation: "EN 15232 encourages energy savings by promoting the use of automation for lighting, HVAC, and shading systems to reduce energy waste and optimise building performance."
  },
  {
    id: 9,
    question: "How can electricians use standards as a selling point to clients?",
    options: [
      "Standards are not relevant to clients",
      "By showing how BMS improves compliance and efficiency",
      "By avoiding mention of standards completely",
      "Standards only matter for large projects"
    ],
    correctAnswer: 1,
    explanation: "Electricians can use standards as a selling point by demonstrating how compliance with ISO 16484 and EN 15232 delivers measurable benefits including energy savings, improved efficiency, and reduced operational costs."
  },
  {
    id: 10,
    question: "In the real-world example, what energy class improvement was achieved in the office building?",
    options: [
      "From class D to class B",
      "From class C to class A",
      "From class B to class A",
      "No class change occurred"
    ],
    correctAnswer: 1,
    explanation: "The London commercial office achieved an improvement from energy class C to class A through BMS upgrades, resulting in a 22% reduction in annual energy bills and meeting sustainability targets."
  }
];