import { QuizQuestion } from '@/types/quiz';

export const bmsModule1Section2QuizData: QuizQuestion[] = [
  {
    id: 1,
    question: 'What is the largest system typically controlled by a BMS?',
    options: [
      'Annual energy savings exceeded £250,000',
      'HVAC (Heating, Ventilation, and Air Conditioning)',
      'To ensure accurate system feedback and proper BMS performance',
      'Increase ventilation automatically to bring in fresh air',
    ],
    correctAnswer: 1,
    explanation:
      'HVAC systems are the largest energy consumers in most buildings, often accounting for 40-60% of total building energy use, making them the primary focus of BMS control and optimisation.',
  },
  {
    id: 2,
    question: 'Name two types of sensors commonly used in HVAC integration with BMS.',
    options: [
      'Motion sensors and light sensors',
      'Smoke sensors and CO sensors',
      'Temperature sensors and humidity sensors',
      'Pressure sensors and flow sensors',
    ],
    correctAnswer: 2,
    explanation:
      'Temperature and humidity sensors are fundamental to HVAC control, providing the data needed to maintain comfortable indoor conditions whilst optimising energy usage.',
  },
  {
    id: 3,
    question: 'How can a BMS respond if CO₂ levels rise in a room?',
    options: [
      'To ensure accurate system feedback and proper BMS performance',
      'HVAC (Heating, Ventilation, and Air Conditioning)',
      'Temperature sensors and humidity sensors',
      'Increase ventilation automatically to bring in fresh air',
    ],
    correctAnswer: 3,
    explanation:
      'When CO₂ levels rise, indicating poor air quality and high occupancy, the BMS automatically increases ventilation rates to bring in fresh outside air, maintaining healthy indoor air quality.',
  },
  {
    id: 4,
    question: 'Give one way lighting can be controlled via BMS.',
    options: [
      'Automatic scheduling based on time of day and occupancy',
      'To ensure accurate system feedback and proper BMS performance',
      'Annual energy savings exceeded £250,000',
      'Temperature sensors and humidity sensors',
    ],
    correctAnswer: 0,
    explanation:
      'BMS can control lighting through automated scheduling, turning lights on/off based on time schedules, occupancy detection, and daylight levels to minimise energy waste whilst ensuring adequate illumination.',
  },
  {
    id: 5,
    question: 'Why is daylight integration useful for energy savings in BMS lighting control?',
    options: [
      'They allow real-time data entry at the point of work with access to asset history and technical documents',
      'It automatically dims or switches off artificial lights when natural daylight is sufficient',
      'Continuity of protective conductors, continuity of ring final conductors, insulation resistance, polarity',
      'The ACAS Code of Practice on Disciplinary and Grievance Procedures',
    ],
    correctAnswer: 1,
    explanation:
      'Daylight integration allows the BMS to automatically adjust artificial lighting levels based on available natural light, reducing energy consumption by dimming or switching off lights when daylight is sufficient.',
  },
  {
    id: 6,
    question: 'How can access control and BMS integration improve security?',
    options: [
      'To prevent spread of smoke between fire compartments during fire conditions',
      'Communicate hazards, restrictions, mandatory requirements, emergency information',
      'By logging entry events and automatically activating lights and CCTV when access cards are used',
      'Individual sprinkler heads activate when heated to their threshold, releasing water directly over the fire',
    ],
    correctAnswer: 2,
    explanation:
      'BMS integration with access control creates comprehensive security by logging all access events, automatically triggering appropriate lighting and CCTV activation, and providing audit trails for security monitoring.',
  },
  {
    id: 7,
    question: 'What action might a BMS take when a fire alarm is triggered?',
    options: [
      'Automatic scheduling based on time of day and occupancy',
      'Increase ventilation automatically to bring in fresh air',
      'It automatically dims or switches off artificial lights when natural daylight is sufficient',
      'Shut down HVAC systems and unlock doors automatically for safe evacuation',
    ],
    correctAnswer: 3,
    explanation:
      'During a fire alarm, the BMS automatically shuts down HVAC systems to prevent smoke spread, unlocks doors to ensure safe evacuation routes, and may activate emergency lighting and communication systems.',
  },
  {
    id: 8,
    question: 'Name one renewable energy system that can be linked with a BMS.',
    options: [
      'Solar PV (photovoltaic) systems',
      'Traditional diesel generators',
      'Standard mains electricity supply',
      'Manual backup systems',
    ],
    correctAnswer: 0,
    explanation:
      'Solar PV systems can be integrated with BMS for energy optimisation, allowing the system to monitor renewable energy generation and automatically adjust building loads to maximise use of clean energy.',
  },
  {
    id: 9,
    question: 'Why must electricians install sensors correctly in BMS applications?',
    options: [
      'Increase ventilation automatically to bring in fresh air',
      'To ensure accurate system feedback and proper BMS performance',
      'Shut down HVAC systems and unlock doors automatically for safe evacuation',
      'HVAC (Heating, Ventilation, and Air Conditioning)',
    ],
    correctAnswer: 1,
    explanation:
      'Correct sensor installation is critical because the BMS relies on accurate sensor data to make control decisions. Poor installation can lead to incorrect readings, inefficient operation, and system failures.',
  },
  {
    id: 10,
    question:
      'In the real-world hospital example, what was one financial outcome of the BMS integration?',
    options: [
      'HVAC (Heating, Ventilation, and Air Conditioning)',
      'Solar PV (photovoltaic) systems',
      'Annual energy savings exceeded £250,000',
      'Temperature sensors and humidity sensors',
    ],
    correctAnswer: 2,
    explanation:
      'The London hospital achieved annual energy savings exceeding £250,000 through BMS integration of HVAC, lighting, and access control systems, demonstrating the significant financial benefits of proper building automation.',
  },
];
