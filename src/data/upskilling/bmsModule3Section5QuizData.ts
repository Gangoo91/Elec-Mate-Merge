import { QuizQuestion } from '@/types/quiz';

export const bmsModule3Section5QuizData: QuizQuestion[] = [
  {
    id: 1,
    question: 'What is the purpose of override functions in a BMS?',
    options: [
      'To permanently replace automatic control with manual operation',
      'To allow temporary manual control for maintenance, emergencies, and special events',
      'To disable safety interlocks so equipment can run continuously',
      'To increase the number of sensors monitored by the controller',
    ],
    correctAnswer: 1,
    explanation:
      'Override functions allow temporary manual control of BMS systems for maintenance, emergencies, special events, and operational flexibility while maintaining safety protocols and eventual return to automatic operation.',
  },
  {
    id: 2,
    question: 'Give one example of a local override.',
    options: [
      'A scheduled time clock starting the boilers each morning',
      'A central head-end command changing the entire building setpoint',
      'A wall-mounted switch allowing occupants to extend HVAC operation in a meeting room',
      'An automatic frost-protection routine triggered by an outdoor sensor',
    ],
    correctAnswer: 2,
    explanation:
      'A local override example is a wall-mounted switch that allows occupants to extend HVAC operation outside normal hours, such as in a meeting room, typically with automatic expiry after 1-2 hours.',
  },
  {
    id: 3,
    question: 'Give one example of an operator override.',
    options: [
      'A fire alarm signal shutting down air handling units automatically',
      'A wall-mounted switch allowing occupants to extend HVAC operation in a meeting room',
      'An occupancy sensor switching off lighting in an empty room',
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
      "To remove the need for any automatic control schedules",
      "To allow occupants rather than operators to set system limits",
      "To reduce the number of sensors the controller must monitor",
    ],
    correctAnswer: 0,
    explanation:
      "Overrides should be logged and time-limited to prevent energy waste from forgotten manual settings, ensure safety functions aren't permanently disabled, and provide accountability for system operation changes.",
  },
  {
    id: 5,
    question: 'What changes might a BMS make during winter operation?',
    options: [
      'Increase chiller output, lower cooling setpoints and maximise fresh air intake',
      'Increase boiler firing, raise heating setpoints, and activate heat recovery systems',
      'Disable both heating and cooling to rely on natural ventilation',
      'Run heating and cooling simultaneously to hold a fixed setpoint',
    ],
    correctAnswer: 1,
    explanation:
      'During winter operation, a BMS increases boiler firing frequency, raises heating setpoints, activates heat recovery systems to reduce energy use, and implements frost protection measures.',
  },
  {
    id: 6,
    question: 'What changes might a BMS make during summer operation?',
    options: [
      'Increase boiler firing, raise heating setpoints and activate frost protection',
      'Shut down all air handling to minimise fresh air intake',
      'Increase chiller operation, lower cooling setpoints, and maximise fresh air intake',
      'Hold heating and cooling at identical setpoints all day',
    ],
    correctAnswer: 2,
    explanation:
      'During summer operation, a BMS increases chiller operation, lowers cooling setpoints, maximises fresh air intake for natural cooling, and implements pre-cooling strategies to reduce peak demand.',
  },
  {
    id: 7,
    question: 'Why are seasonal settings important during spring/autumn?',
    options: [
      'To force the chillers to run at full output regardless of demand',
      'To keep the heating permanently enabled until mid-summer',
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
      'Outdoor air temperature sensors',
      'Duct static pressure sensors',
      'Indoor occupancy sensors',
      'Chilled water flow sensors',
    ],
    correctAnswer: 0,
    explanation:
      'Outdoor temperature sensors are the primary sensors that allow a BMS to detect seasonal changes and trigger automatic changeover between heating and cooling dominant operation modes.',
  },
  {
    id: 9,
    question: 'Why must electricians separate safety overrides from comfort overrides?',
    options: [
      'So comfort overrides can be adjusted by any building occupant',
      'To prevent safety systems from being compromised by comfort control failures',
      'So both override types can share a single time-limit setting',
      'To reduce the amount of control wiring needed in the panel',
    ],
    correctAnswer: 1,
    explanation:
      'Safety overrides (fire, emergency) must be separated from comfort overrides to prevent life safety systems from being compromised by comfort control failures, ensuring emergency systems remain operational even if HVAC controls fail.',
  },
  {
    id: 10,
    question: 'In the real-world example, what problem did continuous manual overrides cause?',
    options: [
      'Occupants lost the ability to adjust local room temperatures',
      'The fire alarm interface stopped shutting down the air handling units',
      'Chillers ran continuously even when demand was low, leading to high energy bills',
      'Frost protection activated repeatedly and overheated the boilers',
    ],
    correctAnswer: 2,
    explanation:
      'In the commercial office example, continuous manual overrides caused chillers to run continuously even when demand was low, leading to 65% higher cooling energy consumption and £85,000 in additional annual energy costs.',
  },
];
