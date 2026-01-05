import { QuizQuestion } from '@/types/quiz';

export const bmsModule2Section1QuizData: QuizQuestion[] = [
  {
    id: 1,
    question: "What does DI stand for in BMS wiring?",
    options: [
      "Digital Input",
      "Direct Interface", 
      "Data Integration",
      "Device Installation"
    ],
    correctAnswer: 0,
    explanation: "DI stands for Digital Input - these are signals that represent two states: on/off, open/closed, true/false."
  },
  {
    id: 2,
    question: "Give one example of a digital input.",
    options: [
      "Temperature sensor reading 22°C",
      "Door contact sensor showing open/closed",
      "Variable fan speed control",
      "Humidity level at 65%"
    ],
    correctAnswer: 1,
    explanation: "Door contact sensors are digital inputs as they provide binary states - either open or closed. Temperature and humidity sensors provide variable (analog) readings."
  },
  {
    id: 3,
    question: "What type of signal does a door contact provide?",
    options: [
      "Variable voltage signal",
      "Analog 4-20mA signal",
      "Digital on/off signal", 
      "Modulated frequency signal"
    ],
    correctAnswer: 2,
    explanation: "Door contacts provide digital signals - they are either open or closed, representing two distinct states with no variable values in between."
  },
  {
    id: 4,
    question: "What does DO stand for in BMS wiring?",
    options: [
      "Data Output",
      "Digital Output",
      "Direct Operation",
      "Device Override"
    ],
    correctAnswer: 1,
    explanation: "DO stands for Digital Output - these control devices in binary form, switching them on or off rather than providing variable control."
  },
  {
    id: 5,
    question: "Give one example of a digital output.",
    options: [
      "Controlling fan speed from 0-100%",
      "Adjusting valve position to 40% open",
      "Switching a fan on or off",
      "Dimming lights between 10-100%"
    ],
    correctAnswer: 2,
    explanation: "Switching a fan on or off is a digital output - it provides binary control. The other examples involve variable control which would be analog outputs."
  },
  {
    id: 6,
    question: "What does AI stand for in BMS wiring?",
    options: [
      "Automatic Interface",
      "Analog Input",
      "Advanced Integration", 
      "Artificial Intelligence"
    ],
    correctAnswer: 1,
    explanation: "AI stands for Analog Input - these provide variable data to the BMS, such as temperature readings, humidity levels, or CO₂ concentrations."
  },
  {
    id: 7,
    question: "Give one example of an analog input device.",
    options: [
      "Door contact sensor",
      "Flow switch",
      "Temperature sensor",
      "Alarm contact"
    ],
    correctAnswer: 2,
    explanation: "Temperature sensors are analog inputs as they provide variable readings (e.g., 0-50°C). Door contacts, flow switches, and alarm contacts are digital inputs providing on/off states."
  },
  {
    id: 8,
    question: "What signal ranges are commonly used for analog inputs?",
    options: [
      "0-5V and 0-1A",
      "0-10V and 4-20mA",
      "12-24V and 1-5A",
      "0-1V and 10-50mA"
    ],
    correctAnswer: 1,
    explanation: "The most common analog signal ranges are 0-10V for voltage signals and 4-20mA for current signals. These provide reliable transmission of variable data over long distances."
  },
  {
    id: 9,
    question: "What does AO stand for in BMS wiring?",
    options: [
      "Analog Output",
      "Automatic Operation",
      "Advanced Override",
      "Alternative Option"
    ],
    correctAnswer: 0,
    explanation: "AO stands for Analog Output - these allow the BMS to control devices with variable outputs, providing smooth, continuous control instead of binary switching."
  },
  {
    id: 10,
    question: "In the real-world example, what mistake caused the HVAC system to misread the temperature?",
    options: [
      "Using the wrong type of temperature sensor",
      "Incorrect cable gauge selection",
      "Wiring the temperature sensor into a digital input instead of analog input",
      "Poor termination of the sensor connections"
    ],
    correctAnswer: 2,
    explanation: "The temperature sensor (analog input) was wired into a digital input terminal by mistake. This caused the BMS to read only on/off states instead of variable temperature values, leading to incorrect HVAC control."
  }
];