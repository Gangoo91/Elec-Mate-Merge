import { QuizQuestion } from '@/types/quiz';

export const bmsModule3Section2QuizData: QuizQuestion[] = [
  {
    id: 1,
    question: 'Why are control strategies important in BMS?',
    options: [
      'By using variable frequency drives (VFDs)',
      'They maintain stable and efficient building operation',
      'It provides smoother operation and better comfort',
      'The differential pressure sensor was installed in the wrong location',
    ],
    correctAnswer: 1,
    explanation:
      'Control strategies ensure stable and efficient building operation by regulating key variables like temperature, pressure, and flow, preventing wasted energy and maintaining occupant comfort.',
  },
  {
    id: 2,
    question: 'What is the difference between on/off and proportional control for temperature?',
    options: [
      'Increase neutral currents, affect cable sizing, and influence transformer selection',
      'They extract renewable heat from the environment (air, ground, or water)',
      'On/off control switches at fixed points; proportional control gradually adjusts outputs',
      'Safety shoes/boots with toe protection, puncture resistance, electrical insulation',
    ],
    correctAnswer: 2,
    explanation:
      'On/off control switches equipment at fixed temperature points, causing wide comfort swings. Proportional control gradually adjusts outputs to maintain steady temperatures, providing smoother operation and better efficiency.',
  },
  {
    id: 3,
    question: 'Give one advantage of proportional control.',
    options: [
      'They maintain stable and efficient building operation',
      'By using variable frequency drives (VFDs)',
      'It causes false readings leading to poor control',
      'It provides smoother operation and better comfort',
    ],
    correctAnswer: 3,
    explanation:
      'Proportional control provides smoother operation, better comfort, and improved energy efficiency by gradually adjusting outputs rather than switching on/off abruptly.',
  },
  {
    id: 4,
    question: 'What sensor is used to maintain duct static pressure in ventilation systems?',
    options: [
      'Static pressure sensor',
      'Flow sensor',
      'Temperature sensor',
      'Humidity sensor',
    ],
    correctAnswer: 0,
    explanation:
      'Static pressure sensors monitor airflow in duct systems, allowing the BMS to adjust fan speed to maintain constant supply pressure as dampers open and close.',
  },
  {
    id: 5,
    question: 'How does the BMS adjust fan speed in response to duct pressure changes?',
    options: [
      'By switching fans on and off',
      'By using variable frequency drives (VFDs)',
      'By opening more dampers',
      'By changing the duct size',
    ],
    correctAnswer: 1,
    explanation:
      'The BMS uses Variable Frequency Drives (VFDs) to modulate fan speed, maintaining constant duct static pressure as demand changes throughout the building.',
  },
  {
    id: 6,
    question: 'What type of pressure control is used in water systems?',
    options: [
      'Vacuum pressure control',
      'Static pressure control',
      'Differential pressure control',
      'Atmospheric pressure control',
    ],
    correctAnswer: 2,
    explanation:
      'Differential pressure control is used in water systems, monitoring the pressure difference across pumps or coils to maintain proper flow and heat transfer.',
  },
  {
    id: 7,
    question: 'Give one example of a device used for airflow control.',
    options: [
      'Motorised control valve',
      'Static pressure sensor',
      'Differential pressure control',
      'VAV (Variable Air Volume) box',
    ],
    correctAnswer: 3,
    explanation:
      'VAV (Variable Air Volume) boxes adjust dampers to deliver only the required amount of air to each space, reducing fan energy and preventing over-ventilation.',
  },
  {
    id: 8,
    question: 'What type of valve regulates chilled water into coils?',
    options: [
      'Motorised control valve',
      'Gate valve',
      'Ball valve',
      'Check valve',
    ],
    correctAnswer: 0,
    explanation:
      'Motorised control valves regulate chilled or hot water flow to coils, preventing wasted pumping energy and ensuring correct heat transfer for comfort control.',
  },
  {
    id: 9,
    question: 'How can incorrect sensor wiring affect control strategies?',
    options: [
      'It makes the system run faster',
      'It causes false readings leading to poor control',
      'It only affects system appearance',
      'It has no significant impact',
    ],
    correctAnswer: 1,
    explanation:
      'If sensors are miswired or poorly placed, the BMS receives false readings, leading to poor control. For example, a miswired pressure sensor may cause pumps to run unnecessarily at full speed.',
  },
  {
    id: 10,
    question: 'In the real-world example, what mistake caused pumps to waste energy?',
    options: [
      'On/off control switches at fixed points; proportional control gradually adjusts outputs',
      'It causes false readings leading to poor control',
      'The differential pressure sensor was installed in the wrong location',
      'They maintain stable and efficient building operation',
    ],
    correctAnswer: 2,
    explanation:
      'The differential pressure sensor was installed in the wrong part of the pipework, giving false readings. This prevented the BMS from properly modulating pump speed, causing energy waste.',
  },
];
