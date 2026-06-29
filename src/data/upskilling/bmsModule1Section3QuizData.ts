import { QuizQuestion } from '@/components/quiz/types';

export const bmsModule1Section3QuizData: QuizQuestion[] = [
  {
    id: 1,
    question: 'What are the three main benefits of a BMS?',
    options: [
      'Safety, security, sustainability',
      'Efficiency, comfort, control',
      'Cost, compliance, control',
      'Monitoring, maintenance, management',
    ],
    correctAnswer: 1,
    explanation:
      'The three main benefits of a BMS are efficiency (energy savings), comfort (occupant wellbeing), and control (centralised monitoring and management).',
  },
  {
    id: 2,
    question: 'How does a BMS optimise HVAC to save energy?',
    options: [
      'By running systems at maximum capacity continuously',
      'By disconnecting systems when not in use',
      'By scheduling operation based on occupancy and weather conditions',
      'By using only manual control settings',
    ],
    correctAnswer: 2,
    explanation:
      'BMS optimises HVAC by scheduling operation based on occupancy patterns, weather conditions, and time-based controls, avoiding unnecessary energy consumption when areas are unoccupied.',
  },
  {
    id: 3,
    question: 'What type of reports can BMS provide to identify inefficiencies?',
    options: [
      'Fire alarm test logs only',
      'Occupant satisfaction survey summaries',
      'Statutory electrical inspection certificates',
      'Energy consumption and trend analysis reports',
    ],
    correctAnswer: 3,
    explanation:
      'BMS provides detailed energy consumption reports, trend analysis, and performance benchmarking that highlight inefficiencies and enable targeted improvements.',
  },
  {
    id: 4,
    question: 'How can BMS improve workplace productivity?',
    options: [
      'By maintaining optimal temperature, lighting, and air quality conditions',
      'By restricting building access to core working hours only',
      'By automatically logging staff attendance for payroll',
      'By increasing lighting levels well above recommended task levels',
    ],
    correctAnswer: 0,
    explanation:
      'BMS improves productivity by maintaining optimal environmental conditions (temperature, humidity, lighting, air quality) that support occupant comfort and wellbeing.',
  },
  {
    id: 5,
    question: 'Give one example of BMS improving occupant comfort.',
    options: [
      'Shutting off ventilation completely outside working hours',
      'Dimming lights when natural daylight is sufficient',
      'Locking thermostats so occupants cannot adjust them',
      'Running heating at full output regardless of conditions',
    ],
    correctAnswer: 1,
    explanation:
      'BMS improves comfort by automatically adjusting lighting based on natural daylight levels, preventing glare whilst maintaining adequate illumination for tasks.',
  },
  {
    id: 6,
    question: 'What is one advantage of centralised monitoring?',
    options: [
      'It removes the need for any on-site maintenance staff',
      'It eliminates the need for individual room sensors',
      'Provides a single dashboard for all building systems enabling quick issue identification',
      'It guarantees the building can never lose mains power',
    ],
    correctAnswer: 2,
    explanation:
      'Centralised monitoring provides facility managers with a single dashboard view of all building systems, enabling quick identification of issues, alarms, and abnormal conditions.',
  },
  {
    id: 7,
    question: 'How does BMS improve reliability?',
    options: [
      'By running every plant item continuously to avoid restarts',
      'By disabling alarms to prevent nuisance call-outs',
      'By replacing all field controllers on a fixed annual cycle',
      'By providing 24/7 remote monitoring and quick response to issues',
    ],
    correctAnswer: 3,
    explanation:
      'BMS improves reliability through continuous monitoring, early fault detection, automated responses to issues, and enabling quick remedial action to prevent system failures.',
  },
  {
    id: 8,
    question: 'Which standard supports compliance for energy efficiency in building automation?',
    options: [
      'EN 15232',
      'BS 7671',
      'IEC 61850',
      'ISO 9001',
    ],
    correctAnswer: 0,
    explanation:
      'EN 15232 is the European standard that defines the energy performance of buildings and the impact of building automation, control and building management systems.',
  },
  {
    id: 9,
    question: 'How does BMS extend equipment lifespan?',
    options: [
      'By running plant harder to finish duty cycles faster',
      'By reducing unnecessary operation and enabling predictive maintenance',
      'By disabling protective interlocks to avoid shutdowns',
      'By extending the warranty period offered by manufacturers',
    ],
    correctAnswer: 1,
    explanation:
      'BMS extends equipment lifespan by optimising operating schedules to reduce unnecessary runtime, monitoring performance parameters, and enabling predictive maintenance to prevent failures.',
  },
  {
    id: 10,
    question:
      'In the real-world example, what financial saving did the retail chain achieve in the first year?',
    options: [
      '£200,000',
      '£300,000',
      '£400,000',
      '£500,000',
    ],
    correctAnswer: 2,
    explanation:
      'The retail chain achieved £400,000 in utility cost savings in the first year through an 18% reduction in energy consumption across their stores.',
  },
];
