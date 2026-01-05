import { QuizQuestion } from '@/types/quiz';

export const bmsModule1Section2QuizData: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the largest system typically controlled by a BMS?",
    options: [
      "Lighting systems",
      "HVAC (Heating, Ventilation, and Air Conditioning)",
      "Access control systems",
      "Fire safety systems"
    ],
    correctAnswer: 1,
    explanation: "HVAC systems are the largest energy consumers in most buildings, often accounting for 40-60% of total building energy use, making them the primary focus of BMS control and optimisation."
  },
  {
    id: 2,
    question: "Name two types of sensors commonly used in HVAC integration with BMS.",
    options: [
      "Motion sensors and light sensors",
      "Temperature sensors and humidity sensors",
      "Smoke sensors and CO sensors",
      "Pressure sensors and flow sensors"
    ],
    correctAnswer: 1,
    explanation: "Temperature and humidity sensors are fundamental to HVAC control, providing the data needed to maintain comfortable indoor conditions whilst optimising energy usage."
  },
  {
    id: 3,
    question: "How can a BMS respond if CO₂ levels rise in a room?",
    options: [
      "Turn on the lights automatically",
      "Sound an alarm immediately",
      "Increase ventilation automatically to bring in fresh air",
      "Shut down all HVAC systems"
    ],
    correctAnswer: 2,
    explanation: "When CO₂ levels rise, indicating poor air quality and high occupancy, the BMS automatically increases ventilation rates to bring in fresh outside air, maintaining healthy indoor air quality."
  },
  {
    id: 4,
    question: "Give one way lighting can be controlled via BMS.",
    options: [
      "Manual switches only",
      "Automatic scheduling based on time of day and occupancy",
      "Emergency lighting only",
      "External lighting controls only"
    ],
    correctAnswer: 1,
    explanation: "BMS can control lighting through automated scheduling, turning lights on/off based on time schedules, occupancy detection, and daylight levels to minimise energy waste whilst ensuring adequate illumination."
  },
  {
    id: 5,
    question: "Why is daylight integration useful for energy savings in BMS lighting control?",
    options: [
      "It makes rooms brighter",
      "It automatically dims or switches off artificial lights when natural daylight is sufficient",
      "It only works during summer months",
      "It increases the lifespan of light bulbs"
    ],
    correctAnswer: 1,
    explanation: "Daylight integration allows the BMS to automatically adjust artificial lighting levels based on available natural light, reducing energy consumption by dimming or switching off lights when daylight is sufficient."
  },
  {
    id: 6,
    question: "How can access control and BMS integration improve security?",
    options: [
      "By making doors harder to open",
      "By logging entry events and automatically activating lights and CCTV when access cards are used",
      "By only allowing access during daylight hours",
      "By requiring multiple keys for entry"
    ],
    correctAnswer: 1,
    explanation: "BMS integration with access control creates comprehensive security by logging all access events, automatically triggering appropriate lighting and CCTV activation, and providing audit trails for security monitoring."
  },
  {
    id: 7,
    question: "What action might a BMS take when a fire alarm is triggered?",
    options: [
      "Increase heating in all areas",
      "Turn on all lights at full brightness",
      "Shut down HVAC systems and unlock doors automatically for safe evacuation",
      "Send an email notification only"
    ],
    correctAnswer: 2,
    explanation: "During a fire alarm, the BMS automatically shuts down HVAC systems to prevent smoke spread, unlocks doors to ensure safe evacuation routes, and may activate emergency lighting and communication systems."
  },
  {
    id: 8,
    question: "Name one renewable energy system that can be linked with a BMS.",
    options: [
      "Solar PV (photovoltaic) systems",
      "Traditional diesel generators",
      "Standard mains electricity supply",
      "Manual backup systems"
    ],
    correctAnswer: 0,
    explanation: "Solar PV systems can be integrated with BMS for energy optimisation, allowing the system to monitor renewable energy generation and automatically adjust building loads to maximise use of clean energy."
  },
  {
    id: 9,
    question: "Why must electricians install sensors correctly in BMS applications?",
    options: [
      "To comply with colour coding standards",
      "To ensure accurate system feedback and proper BMS performance",
      "To make them easier to replace",
      "To reduce installation costs"
    ],
    correctAnswer: 1,
    explanation: "Correct sensor installation is critical because the BMS relies on accurate sensor data to make control decisions. Poor installation can lead to incorrect readings, inefficient operation, and system failures."
  },
  {
    id: 10,
    question: "In the real-world hospital example, what was one financial outcome of the BMS integration?",
    options: [
      "Increased energy costs",
      "No measurable financial impact",
      "Annual energy savings exceeded £250,000",
      "Reduced patient satisfaction"
    ],
    correctAnswer: 2,
    explanation: "The London hospital achieved annual energy savings exceeding £250,000 through BMS integration of HVAC, lighting, and access control systems, demonstrating the significant financial benefits of proper building automation."
  }
];