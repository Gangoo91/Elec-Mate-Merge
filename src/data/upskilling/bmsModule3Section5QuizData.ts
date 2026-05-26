import { QuizQuestion } from '@/types/quiz';

export const bmsModule3Section5QuizData: QuizQuestion[] = [
  {
    id: 1,
    question: 'What is the purpose of override functions in a BMS?',
    options: [
      'Increase chiller operation, lower cooling setpoints, and maximise fresh air intake',
      'To allow temporary manual control for maintenance, emergencies, and special events',
      'To prevent energy waste and ensure safety functions aren\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'t permanently disabled',
      'Facility managers using BMS software to force equipment into specific states for testing',
    ],
    correctAnswer: 1,
    explanation:
      'Override functions allow temporary manual control of BMS systems for maintenance, emergencies, special events, and operational flexibility while maintaining safety protocols and eventual return to automatic operation.',
  },
  {
    id: 2,
    question: 'Give one example of a local override.',
    options: [
      'Increase chiller operation, lower cooling setpoints, and maximise fresh air intake',
      'Facility managers using BMS software to force equipment into specific states for testing',
      'A wall-mounted switch allowing occupants to extend HVAC operation in a meeting room',
      'Chillers ran continuously even when demand was low, leading to high energy bills',
    ],
    correctAnswer: 2,
    explanation:
      'A local override example is a wall-mounted switch that allows occupants to extend HVAC operation outside normal hours, such as in a meeting room, typically with automatic expiry after 1-2 hours.',
  },
  {
    id: 3,
    question: 'Give one example of an operator override.',
    options: [
      'To allow temporary manual control for maintenance, emergencies, and special events',
      'A wall-mounted switch allowing occupants to extend HVAC operation in a meeting room',
      'To balance heating and cooling systems and avoid simultaneous operation that wastes energy',
      'Facility managers using BMS software to force equipment into specific states for testing',
    ],
    correctAnswer: 3,
    explanation:
      'An operator override example is facility managers using the BMS software to force equipment into specific states (ON/OFF/AUTO) for testing, commissioning, or temporary operational requirements.',
  },
  {
    id: 4,
    question: 'Why should overrides be logged or time-limited?',
    options: [
      "To prevent energy waste and ensure safety functions aren't permanently disabled",
      "To allow temporary manual control for maintenance, emergencies, and special events",
      "Increase chiller operation, lower cooling setpoints, and maximise fresh air intake",
      "A wall-mounted switch allowing occupants to extend HVAC operation in a meeting room",
    ],
    correctAnswer: 0,
    explanation:
      "Overrides should be logged and time-limited to prevent energy waste from forgotten manual settings, ensure safety functions aren't permanently disabled, and provide accountability for system operation changes.",
  },
  {
    id: 5,
    question: 'What changes might a BMS make during winter operation?',
    options: [
      'A wall-mounted switch allowing occupants to extend HVAC operation in a meeting room',
      'Increase boiler firing, raise heating setpoints, and activate heat recovery systems',
      'Facility managers using BMS software to force equipment into specific states for testing',
      'To prevent energy waste and ensure safety functions aren\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'t permanently disabled',
    ],
    correctAnswer: 1,
    explanation:
      'During winter operation, a BMS increases boiler firing frequency, raises heating setpoints, activates heat recovery systems to reduce energy use, and implements frost protection measures.',
  },
  {
    id: 6,
    question: 'What changes might a BMS make during summer operation?',
    options: [
      'To balance heating and cooling systems and avoid simultaneous operation that wastes energy',
      'To allow temporary manual control for maintenance, emergencies, and special events',
      'Increase chiller operation, lower cooling setpoints, and maximise fresh air intake',
      'Chillers ran continuously even when demand was low, leading to high energy bills',
    ],
    correctAnswer: 2,
    explanation:
      'During summer operation, a BMS increases chiller operation, lowers cooling setpoints, maximises fresh air intake for natural cooling, and implements pre-cooling strategies to reduce peak demand.',
  },
  {
    id: 7,
    question: 'Why are seasonal settings important during spring/autumn?',
    options: [
      'To allow temporary manual control for maintenance, emergencies, and special events',
      'Increase chiller operation, lower cooling setpoints, and maximise fresh air intake',
      'To prevent safety systems from being compromised by comfort control failures',
      'To balance heating and cooling systems and avoid simultaneous operation that wastes energy',
    ],
    correctAnswer: 3,
    explanation:
      'Seasonal settings during spring/autumn are important to balance heating and cooling systems, prevent simultaneous heating and cooling that wastes energy, and optimise the use of natural ventilation and free cooling.',
  },
  {
    id: 8,
    question: 'What type of sensor allows a BMS to detect seasonal changes?',
    options: [
      'Outdoor temperature sensors',
      'Pressure sensors only',
      'Indoor humidity sensors only',
      'Flow sensors only',
    ],
    correctAnswer: 0,
    explanation:
      'Outdoor temperature sensors are the primary sensors that allow a BMS to detect seasonal changes and trigger automatic changeover between heating and cooling dominant operation modes.',
  },
  {
    id: 9,
    question: 'Why must electricians separate safety overrides from comfort overrides?',
    options: [
      'To allow temporary manual control for maintenance, emergencies, and special events',
      'To prevent safety systems from being compromised by comfort control failures',
      'Facility managers using BMS software to force equipment into specific states for testing',
      'Increase boiler firing, raise heating setpoints, and activate heat recovery systems',
    ],
    correctAnswer: 1,
    explanation:
      'Safety overrides (fire, emergency) must be separated from comfort overrides to prevent life safety systems from being compromised by comfort control failures, ensuring emergency systems remain operational even if HVAC controls fail.',
  },
  {
    id: 10,
    question: 'In the real-world example, what problem did continuous manual overrides cause?',
    options: [
      'To prevent safety systems from being compromised by comfort control failures',
      'To allow temporary manual control for maintenance, emergencies, and special events',
      'Chillers ran continuously even when demand was low, leading to high energy bills',
      'A wall-mounted switch allowing occupants to extend HVAC operation in a meeting room',
    ],
    correctAnswer: 2,
    explanation:
      'In the commercial office example, continuous manual overrides caused chillers to run continuously even when demand was low, leading to 65% higher cooling energy consumption and £85,000 in additional annual energy costs.',
  },
];
