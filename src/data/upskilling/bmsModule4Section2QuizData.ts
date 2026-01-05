import { QuizQuestion } from '@/types/quiz';

export const bmsModule4Section2QuizData: QuizQuestion[] = [
  {
    id: 1,
    question: "What is daylight harvesting?",
    options: [
      "Collecting rainwater from rooftops",
      "Adjusting artificial lighting based on available natural light",
      "Installing solar panels on buildings",
      "Opening windows to let in fresh air"
    ],
    correctAnswer: 1,
    explanation: "Daylight harvesting is the practice of adjusting artificial lighting levels automatically based on the amount of natural light available in a space, typically using light sensors to maintain consistent illumination whilst reducing energy consumption."
  },
  {
    id: 2,
    question: "Why might only some lights dim in a daylight harvesting system?",
    options: [
      "To save money on equipment",
      "Because natural light distribution varies across the space",
      "To make the system simpler",
      "Because some lights are broken"
    ],
    correctAnswer: 1,
    explanation: "Natural light distribution varies significantly across a space - areas near windows receive more daylight than interior zones. Therefore, only lights in well-lit areas need to dim whilst interior lights maintain full output to ensure consistent illumination throughout the space."
  },
  {
    id: 3,
    question: "What device measures natural light levels?",
    options: [
      "PIR sensor",
      "Lux sensor (light sensor)",
      "Temperature sensor",
      "Motion detector"
    ],
    correctAnswer: 1,
    explanation: "Lux sensors (also called light sensors or photosensors) measure the intensity of natural light in a space, typically in lux units. This measurement is used by the BMS to determine how much artificial lighting is needed to maintain target illumination levels."
  },
  {
    id: 4,
    question: "What does PIR stand for?",
    options: [
      "Power Infrared Receiver",
      "Passive Infrared Receiver", 
      "Primary Installation Relay",
      "Programmable Integration Router"
    ],
    correctAnswer: 1,
    explanation: "PIR stands for Passive Infrared Receiver. These sensors detect infrared radiation (heat) emitted by moving objects, particularly human body heat, making them ideal for occupancy detection in lighting control systems."
  },
  {
    id: 5,
    question: "Why do PIR sensors use a time delay before switching off lights?",
    options: [
      "To prevent nuisance switching when occupants are still but not moving",
      "To save electrical energy",
      "To make the lights last longer",
      "To reduce installation costs"
    ],
    correctAnswer: 0,
    explanation: "PIR sensors use time delays to prevent lights from switching off when people are present but stationary (e.g., reading, working at a desk, sitting in meetings). Without this delay, lights would frequently turn off, causing annoyance and disruption."
  },
  {
    id: 6,
    question: "Give one example of a space where PIR logic is effective.",
    options: [
      "24-hour control rooms",
      "Meeting rooms",
      "Emergency lighting",
      "Street lighting"
    ],
    correctAnswer: 1,
    explanation: "Meeting rooms are ideal for PIR logic because they are intermittently occupied with clear periods of vacancy between meetings. This allows significant energy savings by automatically switching lights off when rooms are empty."
  },
  {
    id: 7,
    question: "Why should PIR sensors not be installed near HVAC vents?",
    options: [
      "They will get dusty",
      "Air movement can cause false triggering",
      "They will be too cold",
      "They are difficult to access"
    ],
    correctAnswer: 1,
    explanation: "HVAC air movement can cause false triggering of PIR sensors by moving papers, blinds, or other objects that change temperature, leading to unnecessary activation of lights in unoccupied spaces and reduced energy savings."
  },
  {
    id: 8,
    question: "How can electricians calibrate daylight sensors accurately?",
    options: [
      "By guessing the right settings",
      "Using a lux meter to set light levels to industry standards",
      "By asking the building owner",
      "Using only the default factory settings"
    ],
    correctAnswer: 1,
    explanation: "Electricians should use calibrated lux meters to measure actual light levels and set sensors to maintain industry-standard illumination levels (e.g., 300-500 lux for offices) ensuring both energy efficiency and adequate lighting for tasks."
  },
  {
    id: 9,
    question: "Why should PIR and daylight zones be grouped logically?",
    options: [
      "To make wiring easier",
      "To avoid conflicts like lights switching on at full brightness in bright daylight",
      "To reduce the number of sensors needed",
      "To make the system cheaper"
    ],
    correctAnswer: 1,
    explanation: "Logical grouping prevents conflicting control actions, such as PIR sensors switching lights to full brightness in spaces where daylight harvesting should keep them dimmed, ensuring coordinated and efficient lighting control."
  },
  {
    id: 10,
    question: "In the real-world example, what was the annual energy saving after corrections?",
    options: [
      "25%",
      "30%",
      "35%",
      "40%"
    ],
    correctAnswer: 2,
    explanation: "After repositioning the daylight sensors and properly commissioning the combined PIR and daylight harvesting system, the secondary school achieved a 35% annual lighting energy saving."
  }
];