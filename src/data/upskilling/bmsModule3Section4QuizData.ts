import { QuizQuestion } from '@/types/quiz';

export const bmsModule3Section4QuizData: QuizQuestion[] = [
  {
    id: 1,
    question: "What does demand-based control mean in a BMS?",
    options: [
      "Running all systems at maximum capacity for reliability",
      "Monitoring conditions in real time and supplying only what is needed",
      "Turning off all systems during peak hours",
      "Using more sensors to monitor the building"
    ],
    correctAnswer: 1,
    explanation: "Demand-based control means the BMS monitors actual conditions in real time and adjusts system output to supply only what is needed, avoiding energy waste while maintaining comfort and performance."
  },
  {
    id: 2,
    question: "Give one example of how a BMS adjusts systems under demand-based control.",
    options: [
      "Increasing all fan speeds during summer",
      "Reducing chilled water demand when outside air temperature is mild",
      "Running all equipment continuously for consistency",
      "Shutting down all non-essential systems permanently"
    ],
    correctAnswer: 1,
    explanation: "When outside air temperature is mild, the BMS can reduce chilled water demand and lower chiller output, demonstrating demand-based control by matching system output to actual cooling requirements."
  },
  {
    id: 3,
    question: "What is load shedding and when is it used?",
    options: [
      "Permanently removing equipment from a building",
      "Temporarily reducing or switching off non-critical loads when demand is high",
      "Installing smaller equipment to reduce capacity",
      "Increasing electrical supply capacity"
    ],
    correctAnswer: 1,
    explanation: "Load shedding means temporarily reducing or switching off non-critical loads when demand is high, protecting critical systems and avoiding peak energy charges while maintaining essential operations."
  },
  {
    id: 4,
    question: "Name one type of system that must never be shed.",
    options: [
      "Car park lighting",
      "Life safety systems like emergency lighting and fire alarms",
      "Decorative lighting",
      "Irrigation pumps"
    ],
    correctAnswer: 1,
    explanation: "Life safety systems including emergency lighting, fire alarms, and smoke extract systems must never be subjected to load shedding as they are essential for occupant safety and legal compliance."
  },
  {
    id: 5,
    question: "Name one example of a non-critical load that could be shed.",
    options: [
      "Emergency lighting",
      "Decorative and façade lighting",
      "Fire detection systems",
      "Main chilled water pumps"
    ],
    correctAnswer: 1,
    explanation: "Decorative and façade lighting is a typical non-critical load that can be safely shed during peak demand periods without affecting safety, comfort, or essential building operations."
  },
  {
    id: 6,
    question: "Why does load shedding help reduce energy costs?",
    options: [
      "It makes equipment run more efficiently",
      "It avoids peak demand charges and utility penalties",
      "It reduces the number of staff needed",
      "It eliminates maintenance costs"
    ],
    correctAnswer: 1,
    explanation: "Load shedding helps reduce energy costs by avoiding peak demand charges and utility penalties that occur when consumption exceeds contracted limits, which can be extremely expensive."
  },
  {
    id: 7,
    question: "What devices allow the BMS to switch circuits on or off?",
    options: [
      "Temperature sensors",
      "Relays and contactors",
      "Pressure switches",
      "Flow meters"
    ],
    correctAnswer: 1,
    explanation: "Relays and contactors are the devices that allow the BMS to switch circuits on or off for load shedding. These must be properly sized and installed by electricians to handle the connected loads safely."
  },
  {
    id: 8,
    question: "Why is it important to separate critical and non-critical circuits?",
    options: [
      "To make installation cheaper",
      "To prevent accidental shedding of safety-critical loads",
      "To reduce the number of cables needed",
      "To make the system look more organised"
    ],
    correctAnswer: 1,
    explanation: "Separating critical and non-critical circuits prevents accidental shedding of safety-critical loads, which could cause serious safety risks, legal issues, or operational failures."
  },
  {
    id: 9,
    question: "What commissioning step should be taken to test load shedding strategies?",
    options: [
      "Skip testing and rely on manufacturer specifications",
      "Simulate high load conditions to verify automatic shedding triggers work correctly",
      "Only test during normal working hours",
      "Test only manual controls, ignore automatic functions"
    ],
    correctAnswer: 1,
    explanation: "Commissioning must include simulating high load conditions to verify that automatic shedding triggers work at correct thresholds, loads shed in proper priority order, and the system responds within acceptable time limits."
  },
  {
    id: 10,
    question: "In the real-world example, how did load shedding protect the data centre from penalties?",
    options: [
      "By increasing the electrical supply capacity",
      "By cutting non-critical circuits when power demand peaked, avoiding utility demand charges",
      "By moving the data centre to a different location",
      "By reducing the number of servers in operation"
    ],
    correctAnswer: 1,
    explanation: "The data centre avoided utility penalties by installing load shedding relays that cut non-critical circuits (lighting, some pumps) when power demand peaked, keeping critical cooling operational while staying within contracted limits."
  }
];