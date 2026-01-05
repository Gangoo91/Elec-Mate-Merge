import { QuizQuestion } from '@/types/quiz';

export const bmsModule3Section6QuizData: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the difference between an alarm response and a safety shutdown?",
    options: [
      "There is no difference between them",
      "Alarm responses notify and may trigger corrective actions; safety shutdowns override normal operation to protect life and property",
      "Alarm responses are automatic, safety shutdowns are manual only",
      "Safety shutdowns are less critical than alarm responses"
    ],
    correctAnswer: 1,
    explanation: "Alarm responses notify operators of abnormal conditions and may trigger corrective actions, while safety shutdowns override normal BMS operation to protect life, property, and equipment during hazardous conditions."
  },
  {
    id: 2,
    question: "Give one example of an equipment alarm.",
    options: [
      "Fire alarm activation",
      "Fan failure or pump fault detected by the BMS",
      "Normal room temperature reading",
      "Scheduled maintenance reminder"
    ],
    correctAnswer: 1,
    explanation: "Fan failure or pump fault is a typical equipment alarm where the BMS detects equipment malfunction through status monitoring via current sensors or auxiliary contacts, triggering maintenance alerts and possibly switching to standby equipment."
  },
  {
    id: 3,
    question: "What type of alarm occurs if CO₂ levels become too high?",
    options: [
      "Equipment alarm",
      "Environmental alarm",
      "Electrical alarm", 
      "Fire alarm"
    ],
    correctAnswer: 1,
    explanation: "High CO₂ levels trigger an environmental alarm because it relates to indoor air quality conditions. The BMS typically responds by increasing ventilation rates to bring CO₂ levels back within acceptable limits."
  },
  {
    id: 4,
    question: "Why are safety shutdowns more critical than standard alarms?",
    options: [
      "They cost more to install",
      "They override normal operation to prevent life-threatening situations or equipment damage",
      "They are easier to reset",
      "They require less testing"
    ],
    correctAnswer: 1,
    explanation: "Safety shutdowns are more critical because they override normal BMS operation to prevent life-threatening situations, property damage, or equipment failures from escalating into catastrophic events."
  },
  {
    id: 5,
    question: "What happens to AHUs during a fire alarm?",
    options: [
      "They continue running at normal speed",
      "They shut down to prevent smoke spread through ductwork",
      "They increase speed to maximum",
      "They switch to heating mode"
    ],
    correctAnswer: 1,
    explanation: "During a fire alarm, AHUs typically shut down to prevent smoke spread through the ductwork system, while designated smoke extract fans may start to maintain proper pressure differentials according to the fire strategy."
  },
  {
    id: 6,
    question: "What protective action might the BMS take if a chiller overheats?",
    options: [
      "Increase the chiller's capacity",
      "Shut down the chiller to prevent catastrophic damage",
      "Switch the chiller to heating mode",
      "Ignore the condition"
    ],
    correctAnswer: 1,
    explanation: "If a chiller overheats, the BMS shuts it down immediately to prevent catastrophic damage such as compressor failure, which could be extremely expensive to repair and potentially dangerous."
  },
  {
    id: 7,
    question: "What devices do electricians install to allow safe shutdown of circuits?",
    options: [
      "Temperature sensors only",
      "Emergency relays and contactors",
      "Flow meters only",
      "Pressure switches only"
    ],
    correctAnswer: 1,
    explanation: "Electricians install emergency relays and contactors that allow the BMS to interrupt power safely during emergency conditions while maintaining proper electrical isolation and safety standards."
  },
  {
    id: 8,
    question: "Why must alarm circuits be labelled separately from control wiring?",
    options: [
      "To comply with colour preferences",
      "To prevent confusion during maintenance and ensure safety circuits are not accidentally modified",
      "To reduce installation time",
      "To make wiring look more organised"
    ],
    correctAnswer: 1,
    explanation: "Alarm and shutdown circuits must be clearly labelled to prevent confusion during maintenance and ensure safety-critical circuits are not accidentally modified, disconnected, or interfered with during routine work."
  },
  {
    id: 9,
    question: "What commissioning step is required to test shutdown sequences?",
    options: [
      "Visual inspection only",
      "Simulate fire, gas, and fault alarms to prove sequences work correctly",
      "Test only during actual emergencies",
      "Check documentation only"
    ],
    correctAnswer: 1,
    explanation: "Commissioning must include simulating fire, gas, and fault alarms using appropriate test equipment to prove that all shutdown sequences work correctly, respond within acceptable time limits, and operate in the proper sequence."
  },
  {
    id: 10,
    question: "In the real-world example, what prevented the AHU from shutting down during a fire alarm test?",
    options: [
      "The AHU was too large to shut down",
      "A miswired relay connecting the fire alarm output to the wrong BMS input",
      "The fire alarm system was not working",
      "The AHU had no connection to the BMS"
    ],
    correctAnswer: 1,
    explanation: "In the shopping mall example, a miswired relay connected the fire alarm Zone 7 output to the wrong BMS input terminal, preventing the AHU from receiving the shutdown command during fire alarm activation."
  }
];