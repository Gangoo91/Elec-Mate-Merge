import { QuizQuestion } from '@/types/quiz';

export const evModule1Section1Questions: QuizQuestion[] = [
  {
    id: 1,
    question: "Which type of current is used in rapid charging?",
    options: ["AC", "DC", "Mixed", "Variable"],
    correctAnswer: 1,
    explanation: "Rapid charging (Level 3) uses DC (direct current) which bypasses the vehicle's onboard charger and delivers power directly to the battery for much faster charging speeds."
  },
  {
    id: 2,
    question: "True or False: Type 2 connectors can be used for three-phase charging.",
    options: ["True", "False"],
    correctAnswer: 0,
    explanation: "True. Type 2 connectors support both single-phase and three-phase AC charging, making them the European standard for versatile charging applications."
  },
  {
    id: 3,
    question: "What is the typical charging time for a Level 2 charger?",
    options: ["1–2 hours", "3–6 hours", "8–12 hours", "15–20 minutes"],
    correctAnswer: 1,
    explanation: "Level 2 chargers typically provide 3–6 hours of charging time depending on battery size and charger capacity, making them ideal for home and workplace charging."
  },
  {
    id: 4,
    question: "Which UK regulation covers EV charging installations?",
    options: ["BS 7671 Section 722", "IET Code of Practice", "G98/G99", "Building Regulations Part P"],
    correctAnswer: 0,
    explanation: "BS 7671 Section 722 specifically covers the requirements for EV charging installations, including safety measures, earthing, and protection requirements."
  },
  {
    id: 5,
    question: "Give one reason why charging slows near full capacity.",
    options: [
      "Battery management prevents overcharging and overheating",
      "Electrical supply becomes unstable",
      "Connector efficiency decreases",
      "Ambient temperature always increases"
    ],
    correctAnswer: 0,
    explanation: "Battery management systems slow charging near full capacity to prevent overcharging and overheating, which protects the battery and ensures safe operation."
  },
  {
    id: 6,
    question: "Which connector is standard for Japanese rapid charging?",
    options: ["CCS", "Type 2", "CHAdeMO", "Tesla"],
    correctAnswer: 2,
    explanation: "CHAdeMO is the rapid DC charging standard commonly used in Japanese electric vehicles, though CCS is becoming more prevalent in European markets."
  },
  {
    id: 7,
    question: "What does PME stand in electrical earthing?",
    options: ["Protected Multiple Earthing", "Primary Mains Earthing", "Protective Multiple Earthing", "Primary Multiple Earthing"],
    correctAnswer: 2,
    explanation: "PME stands for Protective Multiple Earthing, a method of earthing the neutral conductor at multiple points throughout the distribution network."
  },
  {
    id: 8,
    question: "Name one environmental factor that can slow charging.",
    options: [
      "Low or high ambient temperature",
      "High humidity only", 
      "Atmospheric pressure",
      "Wind speed"
    ],
    correctAnswer: 0,
    explanation: "Extreme ambient temperatures (both low and high) can slow EV charging as battery management systems adjust charging rates to protect the battery in adverse conditions."
  }
];