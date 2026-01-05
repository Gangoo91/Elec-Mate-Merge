import { QuizQuestion } from '@/types/quiz';

export const bmsModule3Section1QuizData: QuizQuestion[] = [
  {
    id: 1,
    question: "Why are HVAC systems the biggest priority for BMS integration?",
    options: [
      "They are the most complex systems in a building",
      "They consume the most energy in a building",
      "They require the most maintenance",
      "They are the most expensive to install"
    ],
    correctAnswer: 1,
    explanation: "HVAC systems typically consume 40-60% of a building's total energy, making them the largest energy load and therefore the biggest priority for efficiency improvements through BMS integration."
  },
  {
    id: 2,
    question: "What is the main function of an AHU (Air Handling Unit)?",
    options: [
      "To heat water for domestic use",
      "To condition and circulate air through ducts",
      "To cool refrigerated spaces only",
      "To generate electricity for HVAC systems"
    ],
    correctAnswer: 1,
    explanation: "An AHU conditions (heats, cools, filters, dehumidifies) and circulates air through ductwork to supply conditioned air to occupied spaces."
  },
  {
    id: 3,
    question: "Give one way an AHU integrates with BMS:",
    options: [
      "By controlling water temperature only",
      "By monitoring outdoor weather conditions",
      "By controlling fans via digital or analog outputs",
      "By generating reports on energy usage"
    ],
    correctAnswer: 2,
    explanation: "AHUs integrate with BMS by allowing control of fans (on/off or variable speed), damper positions, and monitoring of filters and other parameters."
  },
  {
    id: 4,
    question: "Where are FCUs (Fan Coil Units) typically installed?",
    options: [
      "Only in mechanical plant rooms",
      "In individual rooms or zones for localised control",
      "Only on building rooftops",
      "In underground basements only"
    ],
    correctAnswer: 1,
    explanation: "FCUs are decentralised units installed in individual rooms or zones to provide localised heating and cooling control, making them ideal for hotels, offices, and residential applications."
  },
  {
    id: 5,
    question: "How do FCUs interact with occupancy sensors?",
    options: [
      "They increase noise levels when occupied",
      "They only work when manually switched on",
      "They automatically turn off when rooms are unoccupied to save energy",
      "They change air filter settings based on occupancy"
    ],
    correctAnswer: 2,
    explanation: "FCUs can be programmed through the BMS to automatically turn off or reduce operation when occupancy sensors detect empty rooms, preventing wasted heating or cooling energy."
  },
  {
    id: 6,
    question: "What do chillers supply to HVAC systems?",
    options: [
      "Hot water for heating",
      "Chilled water for cooling systems",
      "Steam for industrial processes",
      "Electrical power for fans"
    ],
    correctAnswer: 1,
    explanation: "Chillers remove heat from water to produce chilled water that is circulated to cooling coils in AHUs, FCUs, and other cooling equipment throughout the building."
  },
  {
    id: 7,
    question: "Why is sequencing multiple chillers more efficient than running all of them?",
    options: [
      "It reduces maintenance costs only",
      "It matches cooling output to actual demand, avoiding waste",
      "It increases the lifespan of all chillers equally",
      "It reduces the noise levels in plant rooms"
    ],
    correctAnswer: 1,
    explanation: "Sequencing chillers allows the system to match cooling output to actual demand - running one chiller at low demand and adding more only when needed, rather than running all chillers at part-load which is less efficient."
  },
  {
    id: 8,
    question: "What do boilers provide in HVAC systems?",
    options: [
      "Chilled water for cooling",
      "Electrical power for pumps",
      "Hot water or steam for heating and domestic use",
      "Compressed air for pneumatic controls"
    ],
    correctAnswer: 2,
    explanation: "Boilers heat water to provide hot water for space heating systems and domestic hot water, or generate steam for heating and industrial processes."
  },
  {
    id: 9,
    question: "How does BMS scheduling reduce boiler fuel use in schools?",
    options: [
      "By running boilers at maximum output continuously",
      "By pre-heating classrooms before lessons then reducing output during empty periods",
      "By only heating staff areas",
      "By switching to electric heating during school hours"
    ],
    correctAnswer: 1,
    explanation: "BMS scheduling allows boilers to pre-heat spaces before occupancy and reduce or shut down during unoccupied periods, significantly reducing fuel consumption compared to constant operation."
  },
  {
    id: 10,
    question: "In the real-world example, what energy saving did the shopping centre achieve after integration?",
    options: [
      "15% reduction in HVAC energy costs",
      "25% reduction in HVAC energy costs",
      "35% reduction in HVAC energy costs",
      "50% reduction in HVAC energy costs"
    ],
    correctAnswer: 1,
    explanation: "The Leeds shopping centre achieved a 25% reduction in HVAC energy costs in the first year through smart sequencing of AHUs, boilers, and chillers integrated into the BMS."
  }
];