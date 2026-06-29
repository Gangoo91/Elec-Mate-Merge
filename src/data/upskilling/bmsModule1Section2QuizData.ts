import { QuizQuestion } from '@/types/quiz';

export const bmsModule1Section2QuizData: QuizQuestion[] = [
  {
    id: 1,
    question: 'What is the largest system typically controlled by a BMS?',
    options: [
      'Door entry intercom systems',
      'HVAC (Heating, Ventilation, and Air Conditioning)',
      'Small power and socket-outlet circuits',
      'Audio-visual and signage displays',
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
      'Reduce the fresh-air supply to save heating energy',
      'Lower the room temperature setpoint to compensate',
      'Switch off the lighting to reduce occupancy',
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
      'Replacing every luminaire with a higher-wattage lamp',
      'Wiring all lighting to a single uncontrolled manual switch',
      'Running lights continuously to avoid switching surges',
    ],
    correctAnswer: 0,
    explanation:
      'BMS can control lighting through automated scheduling, turning lights on/off based on time schedules, occupancy detection, and daylight levels to minimise energy waste whilst ensuring adequate illumination.',
  },
  {
    id: 5,
    question: 'Why is daylight integration useful for energy savings in BMS lighting control?',
    options: [
      'It increases artificial light output to match the brightness outside',
      'It automatically dims or switches off artificial lights when natural daylight is sufficient',
      'It blocks daylight with blinds so the lighting level stays constant',
      'It runs the lights at full output on a fixed timer regardless of daylight',
    ],
    correctAnswer: 1,
    explanation:
      'Daylight integration allows the BMS to automatically adjust artificial lighting levels based on available natural light, reducing energy consumption by dimming or switching off lights when daylight is sufficient.',
  },
  {
    id: 6,
    question: 'How can access control and BMS integration improve security?',
    options: [
      'By unlocking all doors automatically outside working hours',
      'By disabling CCTV recording whenever a valid card is used',
      'By logging entry events and automatically activating lights and CCTV when access cards are used',
      'By replacing the need for any access cards or door controls',
    ],
    correctAnswer: 2,
    explanation:
      'BMS integration with access control creates comprehensive security by logging all access events, automatically triggering appropriate lighting and CCTV activation, and providing audit trails for security monitoring.',
  },
  {
    id: 7,
    question: 'What action might a BMS take when a fire alarm is triggered?',
    options: [
      'Lock all exit doors to contain occupants in their rooms',
      'Boost the heating to keep occupants warm during evacuation',
      'Continue normal HVAC operation to avoid disrupting comfort',
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
      'Traditional diesel standby generators',
      'A grid-supplied uninterruptible power supply',
      'A coal-fired district heating plant',
    ],
    correctAnswer: 0,
    explanation:
      'Solar PV systems can be integrated with BMS for energy optimisation, allowing the system to monitor renewable energy generation and automatically adjust building loads to maximise use of clean energy.',
  },
  {
    id: 9,
    question: 'Why must electricians install sensors correctly in BMS applications?',
    options: [
      'To reduce the total number of cables needed in the building',
      'To ensure accurate system feedback and proper BMS performance',
      'To make the sensors visible for decorative purposes',
      'To allow the sensors to run without any power supply',
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
      'Annual maintenance costs doubled after installation',
      'The energy bill stayed exactly the same as before',
      'Annual energy savings exceeded £250,000',
      'The building was disconnected from the mains supply',
    ],
    correctAnswer: 2,
    explanation:
      'The London hospital achieved annual energy savings exceeding £250,000 through BMS integration of HVAC, lighting, and access control systems, demonstrating the significant financial benefits of proper building automation.',
  },
];
