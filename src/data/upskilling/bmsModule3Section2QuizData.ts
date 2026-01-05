import { QuizQuestion } from '@/types/quiz';

export const bmsModule3Section2QuizData: QuizQuestion[] = [
  {
    id: 1,
    question: "Why are control strategies important in BMS?",
    options: [
      "They make the system look more professional",
      "They maintain stable and efficient building operation",
      "They are required by law",
      "They reduce the number of sensors needed"
    ],
    correctAnswer: 1,
    explanation: "Control strategies ensure stable and efficient building operation by regulating key variables like temperature, pressure, and flow, preventing wasted energy and maintaining occupant comfort."
  },
  {
    id: 2,
    question: "What is the difference between on/off and proportional control for temperature?",
    options: [
      "On/off control is more expensive to implement",
      "On/off control switches at fixed points; proportional control gradually adjusts outputs",
      "Proportional control only works with electric heating",
      "There is no significant difference between them"
    ],
    correctAnswer: 1,
    explanation: "On/off control switches equipment at fixed temperature points, causing wide comfort swings. Proportional control gradually adjusts outputs to maintain steady temperatures, providing smoother operation and better efficiency."
  },
  {
    id: 3,
    question: "Give one advantage of proportional control.",
    options: [
      "It's cheaper to install",
      "It requires fewer sensors",
      "It provides smoother operation and better comfort",
      "It works without electricity"
    ],
    correctAnswer: 2,
    explanation: "Proportional control provides smoother operation, better comfort, and improved energy efficiency by gradually adjusting outputs rather than switching on/off abruptly."
  },
  {
    id: 4,
    question: "What sensor is used to maintain duct static pressure in ventilation systems?",
    options: [
      "Temperature sensor",
      "Flow sensor", 
      "Static pressure sensor",
      "Humidity sensor"
    ],
    correctAnswer: 2,
    explanation: "Static pressure sensors monitor airflow in duct systems, allowing the BMS to adjust fan speed to maintain constant supply pressure as dampers open and close."
  },
  {
    id: 5,
    question: "How does the BMS adjust fan speed in response to duct pressure changes?",
    options: [
      "By switching fans on and off",
      "By using variable frequency drives (VFDs)",
      "By opening more dampers",
      "By changing the duct size"
    ],
    correctAnswer: 1,
    explanation: "The BMS uses Variable Frequency Drives (VFDs) to modulate fan speed, maintaining constant duct static pressure as demand changes throughout the building."
  },
  {
    id: 6,
    question: "What type of pressure control is used in water systems?",
    options: [
      "Static pressure control",
      "Differential pressure control",
      "Atmospheric pressure control",
      "Vacuum pressure control"
    ],
    correctAnswer: 1,
    explanation: "Differential pressure control is used in water systems, monitoring the pressure difference across pumps or coils to maintain proper flow and heat transfer."
  },
  {
    id: 7,
    question: "Give one example of a device used for airflow control.",
    options: [
      "Thermostat",
      "VAV (Variable Air Volume) box",
      "Pressure switch",
      "Humidistat"
    ],
    correctAnswer: 1,
    explanation: "VAV (Variable Air Volume) boxes adjust dampers to deliver only the required amount of air to each space, reducing fan energy and preventing over-ventilation."
  },
  {
    id: 8,
    question: "What type of valve regulates chilled water into coils?",
    options: [
      "Ball valve",
      "Gate valve",
      "Motorised control valve",
      "Check valve"
    ],
    correctAnswer: 2,
    explanation: "Motorised control valves regulate chilled or hot water flow to coils, preventing wasted pumping energy and ensuring correct heat transfer for comfort control."
  },
  {
    id: 9,
    question: "How can incorrect sensor wiring affect control strategies?",
    options: [
      "It has no significant impact",
      "It causes false readings leading to poor control",
      "It only affects system appearance",
      "It makes the system run faster"
    ],
    correctAnswer: 1,
    explanation: "If sensors are miswired or poorly placed, the BMS receives false readings, leading to poor control. For example, a miswired pressure sensor may cause pumps to run unnecessarily at full speed."
  },
  {
    id: 10,
    question: "In the real-world example, what mistake caused pumps to waste energy?",
    options: [
      "The pumps were too small",
      "The differential pressure sensor was installed in the wrong location",
      "The building was too large",
      "The water temperature was incorrect"
    ],
    correctAnswer: 1,
    explanation: "The differential pressure sensor was installed in the wrong part of the pipework, giving false readings. This prevented the BMS from properly modulating pump speed, causing energy waste."
  }
];