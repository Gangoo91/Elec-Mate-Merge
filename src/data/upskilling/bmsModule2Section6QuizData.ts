import { QuizQuestion } from '@/types/quiz';

export const bmsModule2Section6QuizData: QuizQuestion[] = [
  {
    id: 1,
    question: "Why are BMS analog signals more sensitive to interference than digital signals?",
    options: [
      "Analog signals use higher voltages than digital signals",
      "Analog signal values are directly affected by any noise, while digital signals have switching thresholds",
      "Analog cables are longer than digital cables",
      "Analog signals require more power to operate"
    ],
    correctAnswer: 1,
    explanation: "Analog signals are continuous voltage/current levels where any interference directly affects the signal value. Digital signals have defined switching thresholds, so interference must be significant to cause false switching between logic levels."
  },
  {
    id: 2,
    question: "Name two common sources of electrical interference.",
    options: [
      "Thermostats and door sensors",
      "Motors and variable speed drives (VSDs)",
      "Fire alarms and security systems",
      "LED strips and dimmer switches"
    ],
    correctAnswer: 1,
    explanation: "Motors and variable speed drives (VSDs) are major sources of electrical interference due to their switching currents and electromagnetic fields. They can significantly affect nearby signal cables."
  },
  {
    id: 3,
    question: "Why should power and control cables be kept separate?",
    options: [
      "To comply with fire safety regulations",
      "To prevent electromagnetic fields from power cables inducing interference in control cables",
      "To make installation easier and faster",
      "To reduce the total cost of cable installation"
    ],
    correctAnswer: 1,
    explanation: "Power cables carrying large currents generate electromagnetic fields that can induce interference in control cables. Keeping them separate prevents this electromagnetic coupling and maintains signal integrity."
  },
  {
    id: 4,
    question: "What type of cabling reduces interference for analog signals?",
    options: [
      "Single core solid copper cable",
      "Twisted-pair cabling",
      "Flat ribbon cable",
      "Coaxial cable with single conductor"
    ],
    correctAnswer: 1,
    explanation: "Twisted-pair cabling reduces interference through balanced impedance - the twisting cancels out electromagnetic interference that affects both conductors equally, providing better signal integrity for analog signals."
  },
  {
    id: 5,
    question: "What is the purpose of shielding in BMS cabling?",
    options: [
      "To make the cables more durable and long-lasting",
      "To reduce electromagnetic interference (EMI)",
      "To increase the current carrying capacity",
      "To make the cables easier to identify"
    ],
    correctAnswer: 1,
    explanation: "Shielding provides protection against electromagnetic interference (EMI) by creating a conductive barrier around the signal conductors, preventing external electromagnetic fields from affecting the signals."
  },
  {
    id: 6,
    question: "Why should cable shields usually be earthed at one end only?",
    options: [
      "To save on earth cable and installation costs",
      "To prevent ground loop currents that can make interference worse",
      "To comply with electrical safety regulations",
      "To reduce the total resistance of the shielding system"
    ],
    correctAnswer: 1,
    explanation: "Earthing shields at both ends can create ground loop currents if earth potentials differ between the two points. These circulating currents can actually make interference worse and should be avoided by earthing at one end only."
  },
  {
    id: 7,
    question: "What type of cable might be needed in noisy environments near VSDs?",
    options: [
      "Single-shielded twisted pair cable",
      "Double-shielded or armoured cables",
      "Standard PVC insulated cable",
      "Flat unshielded multi-core cable"
    ],
    correctAnswer: 1,
    explanation: "In high-noise environments near VSDs, double-shielded or armoured cables provide maximum protection against electromagnetic interference through multiple layers of shielding."
  },
  {
    id: 8,
    question: "What tool can be used to check signal stability during commissioning?",
    options: [
      "Insulation resistance tester",
      "Multimeter with data logging capability",
      "Earth loop impedance tester",
      "Phase rotation indicator"
    ],
    correctAnswer: 1,
    explanation: "A multimeter with data logging capability can monitor analog signal levels over time to confirm stability and detect fluctuations that may indicate interference problems during commissioning."
  },
  {
    id: 9,
    question: "Why is cable labelling important for maintenance?",
    options: [
      "To meet fire safety regulations only",
      "For easy identification, troubleshooting, and future system modifications",
      "To improve the system's energy efficiency",
      "To reduce electromagnetic interference"
    ],
    correctAnswer: 1,
    explanation: "Clear cable labelling is essential for easy identification, maintenance, troubleshooting, and future system modifications. It helps technicians quickly locate specific cables and understand system connections."
  },
  {
    id: 10,
    question: "In the real-world example, what mistake caused unstable temperature readings?",
    options: [
      "Using the wrong type of temperature sensors",
      "Installing sensor cables in the same containment as HVAC fan power cables",
      "Setting incorrect temperature ranges in the BMS software",
      "Using cables that were too long for the application"
    ],
    correctAnswer: 1,
    explanation: "The temperature sensor cables were installed in the same containment as power supply cables for HVAC fans. The electromagnetic interference from the high switching currents caused unstable analog signals."
  }
];