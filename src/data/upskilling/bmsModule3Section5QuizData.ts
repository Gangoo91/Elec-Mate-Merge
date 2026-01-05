import { QuizQuestion } from '@/types/quiz';

export const bmsModule3Section5QuizData: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the purpose of override functions in a BMS?",
    options: [
      "To permanently replace automatic control",
      "To allow temporary manual control for maintenance, emergencies, and special events",
      "To reduce system installation costs",
      "To eliminate the need for sensors"
    ],
    correctAnswer: 1,
    explanation: "Override functions allow temporary manual control of BMS systems for maintenance, emergencies, special events, and operational flexibility while maintaining safety protocols and eventual return to automatic operation."
  },
  {
    id: 2,
    question: "Give one example of a local override.",
    options: [
      "BMS software forcing a pump to run continuously",
      "A wall-mounted switch allowing occupants to extend HVAC operation in a meeting room",
      "Automatic seasonal changeover from heating to cooling",
      "Emergency fire system activation"
    ],
    correctAnswer: 1,
    explanation: "A local override example is a wall-mounted switch that allows occupants to extend HVAC operation outside normal hours, such as in a meeting room, typically with automatic expiry after 1-2 hours."
  },
  {
    id: 3,
    question: "Give one example of an operator override.",
    options: [
      "Occupants adjusting room temperature",
      "Facility managers using BMS software to force equipment into specific states for testing",
      "Automatic night setback operation",
      "Seasonal temperature setpoint adjustments"
    ],
    correctAnswer: 1,
    explanation: "An operator override example is facility managers using the BMS software to force equipment into specific states (ON/OFF/AUTO) for testing, commissioning, or temporary operational requirements."
  },
  {
    id: 4,
    question: "Why should overrides be logged or time-limited?",
    options: [
      "To reduce installation complexity",
      "To prevent energy waste and ensure safety functions aren't permanently disabled",
      "To make the system run faster",
      "To reduce the number of sensors needed"
    ],
    correctAnswer: 1,
    explanation: "Overrides should be logged and time-limited to prevent energy waste from forgotten manual settings, ensure safety functions aren't permanently disabled, and provide accountability for system operation changes."
  },
  {
    id: 5,
    question: "What changes might a BMS make during winter operation?",
    options: [
      "Disable all heating systems to save energy",
      "Increase boiler firing, raise heating setpoints, and activate heat recovery systems",
      "Run air conditioning continuously",
      "Turn off all ventilation systems"
    ],
    correctAnswer: 1,
    explanation: "During winter operation, a BMS increases boiler firing frequency, raises heating setpoints, activates heat recovery systems to reduce energy use, and implements frost protection measures."
  },
  {
    id: 6,
    question: "What changes might a BMS make during summer operation?",
    options: [
      "Run heating systems continuously",
      "Increase chiller operation, lower cooling setpoints, and maximise fresh air intake",
      "Shut down all ventilation systems",
      "Disable all temperature control"
    ],
    correctAnswer: 1,
    explanation: "During summer operation, a BMS increases chiller operation, lowers cooling setpoints, maximises fresh air intake for natural cooling, and implements pre-cooling strategies to reduce peak demand."
  },
  {
    id: 7,
    question: "Why are seasonal settings important during spring/autumn?",
    options: [
      "Equipment needs more maintenance during these periods",
      "To balance heating and cooling systems and avoid simultaneous operation that wastes energy",
      "These seasons don't require any climate control",
      "To reduce the number of sensors needed"
    ],
    correctAnswer: 1,
    explanation: "Seasonal settings during spring/autumn are important to balance heating and cooling systems, prevent simultaneous heating and cooling that wastes energy, and optimise the use of natural ventilation and free cooling."
  },
  {
    id: 8,
    question: "What type of sensor allows a BMS to detect seasonal changes?",
    options: [
      "Pressure sensors only",
      "Outdoor temperature sensors",
      "Indoor humidity sensors only",
      "Flow sensors only"
    ],
    correctAnswer: 1,
    explanation: "Outdoor temperature sensors are the primary sensors that allow a BMS to detect seasonal changes and trigger automatic changeover between heating and cooling dominant operation modes."
  },
  {
    id: 9,
    question: "Why must electricians separate safety overrides from comfort overrides?",
    options: [
      "To reduce installation costs",
      "To prevent safety systems from being compromised by comfort control failures",
      "To make the system easier to program",
      "To reduce power consumption"
    ],
    correctAnswer: 1,
    explanation: "Safety overrides (fire, emergency) must be separated from comfort overrides to prevent life safety systems from being compromised by comfort control failures, ensuring emergency systems remain operational even if HVAC controls fail."
  },
  {
    id: 10,
    question: "In the real-world example, what problem did continuous manual overrides cause?",
    options: [
      "Equipment became too noisy",
      "Chillers ran continuously even when demand was low, leading to high energy bills",
      "The building became too cold",
      "Sensors stopped working properly"
    ],
    correctAnswer: 1,
    explanation: "In the commercial office example, continuous manual overrides caused chillers to run continuously even when demand was low, leading to 65% higher cooling energy consumption and £85,000 in additional annual energy costs."
  }
];