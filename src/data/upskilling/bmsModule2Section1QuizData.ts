import { QuizQuestion } from '@/types/quiz';

export const bmsModule2Section1QuizData: QuizQuestion[] = [
  {
    id: 1,
    question: 'What does DI stand for in BMS wiring?',
    options: [
      'Device Installation',
      'Digital Input',
      'Direct Interface',
      'Data Integration',
    ],
    correctAnswer: 1,
    explanation:
      'DI stands for Digital Input - these are signals that represent two states: on/off, open/closed, true/false.',
  },
  {
    id: 2,
    question: 'Give one example of a digital input.',
    options: [
      'A temperature sensor reading 0-50°C',
      'A humidity transmitter reading 0-100% RH',
      'Door contact sensor showing open/closed',
      'A CO₂ sensor reading in parts per million',
    ],
    correctAnswer: 2,
    explanation:
      'Door contact sensors are digital inputs as they provide binary states - either open or closed. Temperature, humidity and CO₂ sensors provide variable (analog) readings.',
  },
  {
    id: 3,
    question: 'What type of signal does a door contact provide?',
    options: [
      'Variable voltage signal',
      'Analog 4-20mA signal',
      'Modulated frequency signal',
      'Digital on/off signal',
    ],
    correctAnswer: 3,
    explanation:
      'Door contacts provide digital signals - they are either open or closed, representing two distinct states with no variable values in between.',
  },
  {
    id: 4,
    question: 'What does DO stand for in BMS wiring?',
    options: [
      'Digital Output',
      'Direct Operation',
      'Data Output',
      'Device Override',
    ],
    correctAnswer: 0,
    explanation:
      'DO stands for Digital Output - these control devices in binary form, switching them on or off rather than providing variable control.',
  },
  {
    id: 5,
    question: 'Give one example of a digital output.',
    options: [
      'Controlling fan speed from 0-100%',
      'Switching a fan on or off',
      'Adjusting valve position to 40% open',
      'Dimming lights between 10-100%',
    ],
    correctAnswer: 1,
    explanation:
      'Switching a fan on or off is a digital output - it provides binary control. The other examples involve variable control which would be analog outputs.',
  },
  {
    id: 6,
    question: 'What does AI stand for in BMS wiring?',
    options: [
      'Artificial Intelligence',
      'Automatic Interface',
      'Analog Input',
      'Advanced Integration',
    ],
    correctAnswer: 2,
    explanation:
      'AI stands for Analog Input - these provide variable data to the BMS, such as temperature readings, humidity levels, or CO₂ concentrations.',
  },
  {
    id: 7,
    question: 'Give one example of an analog input device.',
    options: [
      'Door contact sensor',
      'Flow switch',
      'Alarm contact',
      'Temperature sensor',
    ],
    correctAnswer: 3,
    explanation:
      'Temperature sensors are analog inputs as they provide variable readings (e.g., 0-50°C). Door contacts, flow switches, and alarm contacts are digital inputs providing on/off states.',
  },
  {
    id: 8,
    question: 'What signal ranges are commonly used for analog inputs?',
    options: [
      '0-10V and 4-20mA',
      '0-5V and 0-1A',
      '12-24V and 1-5A',
      '0-1V and 10-50mA',
    ],
    correctAnswer: 0,
    explanation:
      'The most common analog signal ranges are 0-10V for voltage signals and 4-20mA for current signals. These provide reliable transmission of variable data over long distances.',
  },
  {
    id: 9,
    question: 'What does AO stand for in BMS wiring?',
    options: [
      'Automatic Operation',
      'Analog Output',
      'Advanced Override',
      'Alternative Option',
    ],
    correctAnswer: 1,
    explanation:
      'AO stands for Analog Output - these allow the BMS to control devices with variable outputs, providing smooth, continuous control instead of binary switching.',
  },
  {
    id: 10,
    question:
      'In the real-world example, what mistake caused the HVAC system to misread the temperature?',
    options: [
      'The temperature sensor was supplied with the wrong excitation voltage',
      'The temperature setpoint was entered in Fahrenheit instead of Celsius',
      'Wiring the temperature sensor into a digital input instead of analog input',
      'The temperature sensor cable was run alongside a mains power cable',
    ],
    correctAnswer: 2,
    explanation:
      'The temperature sensor (analog input) was wired into a digital input terminal by mistake. This caused the BMS to read only on/off states instead of variable temperature values, leading to incorrect HVAC control.',
  },
];
