import { QuizQuestion } from '@/types/quiz';

export const bmsModule3Section3QuizData: QuizQuestion[] = [
  {
    id: 1,
    question: 'What is the primary purpose of time scheduling in BMS?',
    options: [
      'Weekly schedule with different weekday/weekend patterns',
      'To automatically operate equipment based on predetermined schedules',
      'Systems gradually reduce operation after a delay period',
      'A temporary manual override that reverts after a set time',
    ],
    correctAnswer: 1,
    explanation:
      'Time scheduling automatically operates equipment based on predetermined schedules, optimising energy consumption by running systems only when needed and reducing operational costs.',
  },
  {
    id: 2,
    question: 'Which type of schedule is best for a standard office building?',
    options: [
      'Automatically adjusting systems based on actual space usage',
      'A temporary manual override that reverts after a set time',
      'Weekly schedule with different weekday/weekend patterns',
      '24/7 continuous operation with varied intensity',
    ],
    correctAnswer: 2,
    explanation:
      'Weekly schedules with different weekday and weekend patterns are ideal for offices, allowing full operation during working hours and reduced operation during evenings, weekends, and holidays.',
  },
  {
    id: 3,
    question: 'What is occupancy detection primarily used for in BMS?',
    options: [
      'Systems automatically adjust start/stop times based on external temperature',
      'A temporary manual override that reverts after a set time',
      'Minimal operation with frost protection and security systems active',
      'Automatically adjusting systems based on actual space usage',
    ],
    correctAnswer: 3,
    explanation:
      'Occupancy detection automatically adjusts HVAC, lighting, and other systems based on actual space usage, providing energy savings and comfort without manual intervention.',
  },
  {
    id: 4,
    question: 'Which sensor technology is most commonly used for occupancy detection?',
    options: [
      'PIR (Passive Infrared) sensors',
      'Industry-wide retirement savings scheme',
      'Spring return, normally open',
      'Two-pole voltage indicator (GS38)',
    ],
    correctAnswer: 0,
    explanation:
      'PIR (Passive Infrared) sensors detect body heat and movement, making them the most common choice for occupancy detection in commercial buildings due to their reliability and cost-effectiveness.',
  },
  {
    id: 5,
    question: "What is an 'override' function in BMS scheduling?",
    options: [
      'Minimal operation with frost protection and security systems active',
      'A temporary manual override that reverts after a set time',
      'To automatically operate equipment based on predetermined schedules',
      'Systems gradually reduce operation after a delay period',
    ],
    correctAnswer: 1,
    explanation:
      'Override functions allow temporary manual control that automatically reverts to the programmed schedule after a predetermined time, preventing permanently altered schedules from wasting energy.',
  },
  {
    id: 6,
    question: 'Which of these is a benefit of optimum start/stop control?',
    options: [
      'Minimal operation with frost protection and security systems active',
      'Weekly schedule with different weekday/weekend patterns',
      'Systems automatically adjust start/stop times based on external temperature',
      'To automatically operate equipment based on predetermined schedules',
    ],
    correctAnswer: 2,
    explanation:
      'Optimum start/stop automatically adjusts start and stop times based on external temperature and building thermal mass, ensuring comfort is achieved exactly when needed while minimising energy use.',
  },
  {
    id: 7,
    question: 'What happens when occupancy sensors detect no movement in a space?',
    options: [
      'To automatically operate equipment based on predetermined schedules',
      'Weekly schedule with different weekday/weekend patterns',
      'Ventilation adjusted based on occupancy levels and CO2 readings',
      'Systems gradually reduce operation after a delay period',
    ],
    correctAnswer: 3,
    explanation:
      'When no movement is detected, systems gradually reduce operation after a programmed delay period (typically 15-30 minutes) to account for brief absences while ensuring energy savings during actual vacancy.',
  },
  {
    id: 8,
    question: 'Which schedule type would be most appropriate for a hospital?',
    options: [
      '24/7 continuous operation with varied intensity',
      'Weekly schedule with different weekday/weekend patterns',
      'Systems gradually reduce operation after a delay period',
      'A temporary manual override that reverts after a set time',
    ],
    correctAnswer: 0,
    explanation:
      'Hospitals require 24/7 operation but with varied intensity - full operation in patient areas, reduced operation in administrative areas during off-hours, and different requirements for critical vs. non-critical spaces.',
  },
  {
    id: 9,
    question: 'What is demand-controlled ventilation (DCV)?',
    options: [
      'Ventilation controlled by outside air temperature only',
      'Ventilation adjusted based on occupancy levels and CO2 readings',
      'Ventilation that only works manually',
      'Ventilation that runs at maximum speed always',
    ],
    correctAnswer: 1,
    explanation:
      'Demand-controlled ventilation adjusts ventilation rates based on actual occupancy levels and CO2 readings, providing adequate fresh air while minimising energy consumption during low occupancy periods.',
  },
  {
    id: 10,
    question: 'How should holiday schedules be programmed in a BMS?',
    options: [
      'A temporary manual override that reverts after a set time',
      'Ventilation adjusted based on occupancy levels and CO2 readings',
      'Minimal operation with frost protection and security systems active',
      'Weekly schedule with different weekday/weekend patterns',
    ],
    correctAnswer: 2,
    explanation:
      'Holiday schedules should provide minimal operation while maintaining frost protection, security systems, and essential services. This maximises energy savings while protecting the building and equipment.',
  },
];
