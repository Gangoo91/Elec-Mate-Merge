export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

export const bmsModule5Section1QuizData: QuizQuestion[] = [
  {
    question: "What is a communication protocol in a BMS?",
    options: [
      "A type of electrical cable",
      "A structured set of rules for devices to exchange data",
      "A software program for controlling lights",
      "A physical connection between devices"
    ],
    correctAnswer: "A structured set of rules for devices to exchange data"
  },
  {
    question: "What is the difference between an open and a proprietary protocol?",
    options: [
      "Open protocols are faster than proprietary ones",
      "Proprietary protocols are always better quality",
      "Open protocols are standardised and support multiple manufacturers, while proprietary protocols are owned by a single manufacturer",
      "There is no difference between them"
    ],
    correctAnswer: "Open protocols are standardised and support multiple manufacturers, while proprietary protocols are owned by a single manufacturer"
  },
  {
    question: "Give one disadvantage of proprietary protocols.",
    options: [
      "They are too expensive to buy",
      "They work too slowly",
      "They can lock clients into using a single vendor",
      "They use too much power"
    ],
    correctAnswer: "They can lock clients into using a single vendor"
  },
  {
    question: "Which protocol is most commonly used in HVAC systems?",
    options: [
      "KNX",
      "Modbus",
      "BACnet",
      "DALI"
    ],
    correctAnswer: "BACnet"
  },
  {
    question: "Which protocol is simple and widely used in energy meters?",
    options: [
      "BACnet",
      "KNX",
      "Modbus",
      "LonWorks"
    ],
    correctAnswer: "Modbus"
  },
  {
    question: "Which protocol is popular in Europe for lighting and blinds?",
    options: [
      "BACnet",
      "Modbus",
      "KNX",
      "DALI"
    ],
    correctAnswer: "KNX"
  },
  {
    question: "Why must RS-485 buses be terminated at both ends?",
    options: [
      "To make the cables look neat",
      "To prevent signal reflections that cause communication errors",
      "To reduce the cost of installation",
      "To make the system work faster"
    ],
    correctAnswer: "To prevent signal reflections that cause communication errors"
  },
  {
    question: "What type of cabling is recommended for RS-485 communications?",
    options: [
      "Single core cable",
      "Coaxial cable",
      "Shielded twisted pair",
      "Ribbon cable"
    ],
    correctAnswer: "Shielded twisted pair"
  },
  {
    question: "Why should comms cables be kept separate from mains wiring?",
    options: [
      "To save space in cable trays",
      "To avoid electromagnetic interference",
      "To make installation easier",
      "To reduce cable costs"
    ],
    correctAnswer: "To avoid electromagnetic interference"
  },
  {
    question: "In the real-world example, what simple omission caused communication errors?",
    options: [
      "Wrong cable type was used",
      "Cables were run too close to power cables",
      "Termination resistors were not installed",
      "The wrong protocol was selected"
    ],
    correctAnswer: "Termination resistors were not installed"
  }
];