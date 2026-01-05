import { QuizQuestion } from '@/types/quiz';

export const bmsModule3Section3QuizData: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the primary purpose of time scheduling in BMS?",
    options: [
      "To make the system more expensive",
      "To automatically operate equipment based on predetermined schedules",
      "To confuse building users",
      "To increase energy consumption"
    ],
    correctAnswer: 1,
    explanation: "Time scheduling automatically operates equipment based on predetermined schedules, optimising energy consumption by running systems only when needed and reducing operational costs."
  },
  {
    id: 2,
    question: "Which type of schedule is best for a standard office building?",
    options: [
      "24/7 continuous operation",
      "Random scheduling",
      "Weekly schedule with different weekday/weekend patterns",
      "Manual operation only"
    ],
    correctAnswer: 2,
    explanation: "Weekly schedules with different weekday and weekend patterns are ideal for offices, allowing full operation during working hours and reduced operation during evenings, weekends, and holidays."
  },
  {
    id: 3,
    question: "What is occupancy detection primarily used for in BMS?",
    options: [
      "Counting how many people enter the building",
      "Automatically adjusting systems based on actual space usage",
      "Security monitoring only",
      "Measuring temperature changes"
    ],
    correctAnswer: 1,
    explanation: "Occupancy detection automatically adjusts HVAC, lighting, and other systems based on actual space usage, providing energy savings and comfort without manual intervention."
  },
  {
    id: 4,
    question: "Which sensor technology is most commonly used for occupancy detection?",
    options: [
      "Temperature sensors",
      "PIR (Passive Infrared) sensors",
      "Humidity sensors",
      "Light sensors"
    ],
    correctAnswer: 1,
    explanation: "PIR (Passive Infrared) sensors detect body heat and movement, making them the most common choice for occupancy detection in commercial buildings due to their reliability and cost-effectiveness."
  },
  {
    id: 5,
    question: "What is an 'override' function in BMS scheduling?",
    options: [
      "A permanent change to the schedule",
      "A temporary manual override that reverts after a set time",
      "A way to delete schedules",
      "An emergency stop function"
    ],
    correctAnswer: 1,
    explanation: "Override functions allow temporary manual control that automatically reverts to the programmed schedule after a predetermined time, preventing permanently altered schedules from wasting energy."
  },
  {
    id: 6,
    question: "Which of these is a benefit of optimum start/stop control?",
    options: [
      "Systems run continuously for reliability",
      "Systems start and stop at exact scheduled times regardless of conditions",
      "Systems automatically adjust start/stop times based on external temperature",
      "Systems never turn off"
    ],
    correctAnswer: 2,
    explanation: "Optimum start/stop automatically adjusts start and stop times based on external temperature and building thermal mass, ensuring comfort is achieved exactly when needed while minimising energy use."
  },
  {
    id: 7,
    question: "What happens when occupancy sensors detect no movement in a space?",
    options: [
      "All systems immediately switch off",
      "Systems continue normal operation",
      "Systems gradually reduce operation after a delay period",
      "An alarm sounds"
    ],
    correctAnswer: 2,
    explanation: "When no movement is detected, systems gradually reduce operation after a programmed delay period (typically 15-30 minutes) to account for brief absences while ensuring energy savings during actual vacancy."
  },
  {
    id: 8,
    question: "Which schedule type would be most appropriate for a hospital?",
    options: [
      "Standard office hours only",
      "24/7 continuous operation with varied intensity",
      "Weekend operation only",
      "Summer operation only"
    ],
    correctAnswer: 1,
    explanation: "Hospitals require 24/7 operation but with varied intensity - full operation in patient areas, reduced operation in administrative areas during off-hours, and different requirements for critical vs. non-critical spaces."
  },
  {
    id: 9,
    question: "What is demand-controlled ventilation (DCV)?",
    options: [
      "Ventilation that runs at maximum speed always",
      "Ventilation controlled by outside air temperature only",
      "Ventilation adjusted based on occupancy levels and CO2 readings",
      "Ventilation that only works manually"
    ],
    correctAnswer: 2,
    explanation: "Demand-controlled ventilation adjusts ventilation rates based on actual occupancy levels and CO2 readings, providing adequate fresh air while minimising energy consumption during low occupancy periods."
  },
  {
    id: 10,
    question: "How should holiday schedules be programmed in a BMS?",
    options: [
      "Same as weekend schedules",
      "Maximum operation to catch up on maintenance",
      "Minimal operation with frost protection and security systems active",
      "Complete system shutdown"
    ],
    correctAnswer: 2,
    explanation: "Holiday schedules should provide minimal operation while maintaining frost protection, security systems, and essential services. This maximises energy savings while protecting the building and equipment."
  }
];