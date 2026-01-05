export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const rcdInstallationQuizData: QuizQuestion[] = [
  {
    id: 1,
    question: "Under BS 7671, RCD protection is mandatory for which type of socket outlets?",
    options: [
      "All socket outlets regardless of rating",
      "Socket outlets rated up to 20A in domestic installations",
      "Only outdoor socket outlets",
      "Socket outlets above 20A only"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 Section 411.3.3 requires RCD protection for socket outlets with rated current not exceeding 20A in domestic installations."
  },
  {
    id: 2,
    question: "What is the maximum permitted residual operating current for additional protection RCDs?",
    options: [
      "100mA",
      "300mA", 
      "30mA",
      "10mA"
    ],
    correctAnswer: 2,
    explanation: "For additional protection against electric shock, RCDs must have a rated residual operating current not exceeding 30mA according to BS 7671."
  },
  {
    id: 3,
    question: "Which RCD type is most appropriate for circuits supplying variable speed drives?",
    options: [
      "Type AC",
      "Type A",
      "Type B", 
      "Type F"
    ],
    correctAnswer: 2,
    explanation: "Type B RCDs are required for variable speed drives and other equipment that may produce smooth DC fault currents."
  },
  {
    id: 4,
    question: "What is the minimum discrimination time required between upstream and downstream RCDs?",
    options: [
      "40ms",
      "65ms",
      "100ms",
      "300ms"
    ],
    correctAnswer: 1,
    explanation: "A minimum of 65ms discrimination time is required between RCDs to ensure proper operation sequence and prevent unwanted tripping."
  },
  {
    id: 5,
    question: "What is the main advantage of using RCBOs instead of traditional RCDs?",
    options: [
      "Lower cost installation",
      "Higher current ratings available",
      "No discrimination issues and easier fault identification",
      "Better protection against overvoltage"
    ],
    correctAnswer: 2,
    explanation: "RCBOs provide individual circuit protection with no discrimination issues and make fault identification much easier compared to shared RCD protection."
  },
  {
    id: 6,
    question: "Which circuits require RCD protection in bathroom installations?",
    options: [
      "Only socket outlet circuits",
      "Only lighting circuits",
      "All low voltage circuits",
      "Only circuits in zones 1 and 2"
    ],
    correctAnswer: 2,
    explanation: "BS 7671 Section 701.411.3.3 requires RCD protection for all low voltage circuits in locations containing a bath or shower."
  },
  {
    id: 7,
    question: "What can cause unwanted RCD tripping in installations?",
    options: [
      "Proper load balancing",
      "Correct neutral arrangement",
      "Mixing RCD-protected and non-protected neutrals",
      "Using appropriate RCD types"
    ],
    correctAnswer: 2,
    explanation: "Mixing RCD-protected and non-protected neutrals is a common cause of unwanted tripping and must be avoided through proper neutral management."
  },
  {
    id: 8,
    question: "What is the maximum operating time for a 30mA RCD at 5×IΔn (150mA)?",
    options: [
      "300ms",
      "100ms",
      "40ms",
      "10ms"
    ],
    correctAnswer: 2,
    explanation: "For additional protection, RCDs must operate within 40ms at 5×IΔn according to BS 7671 Section 415.1.1."
  },
  {
    id: 9,
    question: "When installing three-phase RCDs, what is essential to prevent nuisance tripping?",
    options: [
      "Using higher rated RCDs",
      "Installing separate earth electrodes",
      "Ensuring balanced loading across all phases",
      "Using Type B RCDs only"
    ],
    correctAnswer: 2,
    explanation: "Balanced loading across all three phases is essential to prevent nuisance tripping from natural load imbalance in three-phase RCD installations."
  },
  {
    id: 10,
    question: "What documentation must be completed after RCD installation?",
    options: [
      "Only a Minor Works Certificate",
      "Electrical Installation Certificate and test results",
      "Only manufacturer's warranty card",
      "Building control notification only"
    ],
    correctAnswer: 1,
    explanation: "An Electrical Installation Certificate must be completed along with RCD test results, circuit schedules, and compliance documentation."
  }
];