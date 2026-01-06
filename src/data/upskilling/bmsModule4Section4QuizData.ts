export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export const bmsModule4Section4QuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the role of shading systems in building performance?",
    options: [
      "To provide privacy for occupants",
      "To manage solar heat gain, reduce glare, and control daylight",
      "To improve the building's external appearance",
      "To reduce maintenance costs"
    ],
    correct: 1,
    explanation: "Shading systems primarily manage solar heat gain, reduce glare, and control daylight to improve both energy efficiency and occupant comfort."
  },
  {
    id: 2,
    question: "Give one example of dynamic façade technology.",
    options: [
      "Fixed external louvers",
      "Standard window blinds",
      "Electrochromic glass or rotating louvers",
      "Reflective window film"
    ],
    correct: 2,
    explanation: "Dynamic façade technologies include electrochromic glass that changes tint electronically, rotating louvers that track the sun, and other responsive building envelope elements."
  },
  {
    id: 3,
    question: "How does shading reduce chiller loads?",
    options: [
      "By blocking all natural light",
      "By reducing solar heat gain entering the building",
      "By increasing air circulation",
      "By reflecting heat back to the atmosphere"
    ],
    correct: 1,
    explanation: "Shading reduces chiller loads by preventing solar heat gain from entering the building, thereby reducing the cooling demand on HVAC systems."
  },
  {
    id: 4,
    question: "What type of sensor measures sunlight intensity for blind control?",
    options: [
      "Temperature sensor",
      "Solar sensor or photocell",
      "Humidity sensor",
      "Motion sensor"
    ],
    correct: 1,
    explanation: "Solar sensors (also called photocells or lux sensors) measure sunlight intensity and provide the data needed for automatic blind control systems."
  },
  {
    id: 5,
    question: "Why should blinds be programmed for gradual adjustment?",
    options: [
      "To save motor power",
      "To prevent sudden movements that disrupt occupants",
      "To reduce wear on the blind mechanism",
      "To improve the building's appearance"
    ],
    correct: 1,
    explanation: "Gradual blind movements prevent sudden changes in lighting conditions that can be disruptive and distracting to building occupants."
  },
  {
    id: 6,
    question: "Why is it important to segregate motor and control wiring?",
    options: [
      "To comply with electrical codes",
      "To prevent electromagnetic interference affecting control signals",
      "To make installation easier",
      "To reduce cable costs"
    ],
    correct: 1,
    explanation: "Motor cables carry higher currents and can create electromagnetic interference that affects sensitive control signals, so segregation is essential for reliable operation."
  },
  {
    id: 7,
    question: "What safety feature should be included in motorised blinds?",
    options: [
      "Battery backup power",
      "Manual override capability",
      "Automatic end-stop protection",
      "Fire-resistant materials"
    ],
    correct: 2,
    explanation: "Automatic end-stop protection ensures motors stop when blinds reach their full open or closed positions, preventing damage to both motors and blinds."
  },
  {
    id: 8,
    question: "Why must blinds integrate with lighting systems?",
    options: [
      "To reduce installation costs",
      "For daylight harvesting and coordinated illumination control",
      "To share the same power supply",
      "To simplify the control interface"
    ],
    correct: 1,
    explanation: "Integration with lighting systems enables daylight harvesting, where artificial lighting is dimmed or turned off when natural light through controlled blinds provides adequate illumination."
  },
  {
    id: 9,
    question: "What is one reason to connect blinds to fire alarms?",
    options: [
      "To provide emergency lighting",
      "To ensure blinds move to safe positions for evacuation or smoke extraction",
      "To automatically close all blinds during alarms",
      "To cut power to all motors"
    ],
    correct: 1,
    explanation: "Blinds must integrate with fire alarm systems to ensure they move to safe positions that don't obstruct evacuation routes or smoke extraction systems during emergencies."
  },
  {
    id: 10,
    question: "In the real-world example, what percentage of energy saving was achieved?",
    options: [
      "12%",
      "18%",
      "25%",
      "30%"
    ],
    correct: 1,
    explanation: "The London office tower case study achieved an 18% reduction in overall energy use through the integrated shading system with BMS coordination."
  }
];

// Alias for consistency with component imports
export const bmsModule4Section4QuizData = bmsModule4Section4QuizQuestions;