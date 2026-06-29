import { QuizQuestion } from '@/types/quiz';

export const evModule1Section1Questions: QuizQuestion[] = [
  {
    id: 1,
    question: 'Which type of current is delivered to the battery during rapid charging?',
    options: [
      'Single-phase AC stepped down by the charge point',
      'DC supplied directly to the battery',
      'Three-phase AC converted by the onboard charger',
      'Pulsed AC regulated by the vehicle',
    ],
    correctAnswer: 1,
    explanation:
      "Rapid charging uses DC (direct current), which bypasses the vehicle's onboard AC-to-DC charger and feeds the battery directly, allowing much higher power and faster charging.",
  },
  {
    id: 2,
    question: 'True or False: Type 2 connectors can be used for three-phase charging.',
    options: ['True', 'False'],
    correctAnswer: 0,
    explanation:
      'True. Type 2 connectors support both single-phase and three-phase AC charging, making them the European standard for versatile charging applications.',
  },
  {
    id: 3,
    question: 'What is the typical charging time for a Level 2 charger?',
    options: [
      '1–2 hours',
      '15–20 minutes',
      '8–12 hours',
      '3–6 hours',
    ],
    correctAnswer: 3,
    explanation:
      'Level 2 chargers typically provide 3–6 hours of charging time depending on battery size and charger capacity, making them ideal for home and workplace charging.',
  },
  {
    id: 4,
    question: 'Which UK regulation covers EV charging installations?',
    options: [
      'BS 7671 Section 722',
      'G98/G99',
      'IET Code of Practice',
      'Building Regulations Part P',
    ],
    correctAnswer: 0,
    explanation:
      'BS 7671 Section 722 specifically covers the requirements for EV charging installations, including safety measures, earthing, and protection requirements.',
  },
  {
    id: 5,
    question: 'Why does charging speed typically slow as a battery nears full capacity?',
    options: [
      'The onboard charger switches from DC to AC to protect the cells',
      'The battery management system tapers current to prevent overcharging and overheating',
      'The supply voltage drops automatically as the battery fills',
      'The charging cable resistance increases with temperature, limiting current',
    ],
    correctAnswer: 1,
    explanation:
      'Battery management systems slow charging near full capacity to prevent overcharging and overheating, which protects the battery and ensures safe operation.',
  },
  {
    id: 6,
    question: 'Which connector is standard for Japanese rapid charging?',
    options: [
      'Tesla',
      'Type 2',
      'CHAdeMO',
      'CCS',
    ],
    correctAnswer: 2,
    explanation:
      'CHAdeMO is the rapid DC charging standard commonly used in Japanese electric vehicles, though CCS is becoming more prevalent in European markets.',
  },
  {
    id: 7,
    question: 'What does PME stand for in electrical earthing?',
    options: [
      'Protected Multiple Earthing',
      'Primary Mains Earthing',
      'Primary Multiple Earthing',
      'Protective Multiple Earthing',
    ],
    correctAnswer: 3,
    explanation:
      'PME stands for Protective Multiple Earthing, a TN-C-S arrangement where the combined neutral and earth (PEN) conductor is earthed at multiple points along the distribution network. Section 722 places specific requirements on EV installations supplied from a PME earthing facility.',
  },
  {
    id: 8,
    question: 'Which environmental factor most commonly slows EV charging?',
    options: [
      'Low or high ambient temperature',
      'High relative humidity around the charge point',
      'Strong wind exposure at the charging location',
      'Atmospheric pressure changes at altitude',
    ],
    correctAnswer: 0,
    explanation:
      'Extreme ambient temperatures (both low and high) can slow EV charging as battery management systems adjust charging rates to protect the battery in adverse conditions.',
  },
];
