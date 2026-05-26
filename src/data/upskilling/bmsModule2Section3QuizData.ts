import { QuizQuestion } from '@/types/quiz';

export const bmsModule2Section3QuizData: QuizQuestion[] = [
  {
    id: 1,
    question: 'What is the role of an actuator in a BMS?',
    options: [
      'To process data from multiple sensors',
      'To convert electrical signals into mechanical movement',
      'To sense temperature and humidity levels',
      'To display system status information',
    ],
    correctAnswer: 1,
    explanation:
      "Actuators convert electrical signals from the BMS into mechanical movement, acting as the 'muscles' of the system to physically control valves, dampers, and other mechanical devices.",
  },
  {
    id: 2,
    question: 'What is the difference between digital and analog actuators?',
    options: [
      'Entry and exit wounds — a burn where the current entered the body and another where it left',
      'Recorded on the snag list, the cause investigated, fixed and re-tested before the work is signed off',
      'Digital actuators move to fully open or closed positions, analog actuators modulate to precise positions',
      'Accuracy requirements, satellite availability, and local coordinate systems',
    ],
    correctAnswer: 2,
    explanation:
      'Digital actuators provide on/off control (fully open or fully closed), while analog actuators can modulate to precise positions anywhere between 0-100% based on control signals like 0-10V or 4-20mA.',
  },
  {
    id: 3,
    question: 'What type of valve regulates flow in a single circuit?',
    options: [
      '3-way valve',
      'Check valve',
      '4-way valve',
      '2-way valve',
    ],
    correctAnswer: 3,
    explanation:
      'A 2-way valve regulates flow rate in a single circuit by opening and closing to control the amount of fluid passing through. It has one inlet and one outlet.',
  },
  {
    id: 4,
    question: 'What type of valve diverts flow between two different circuits?',
    options: [
      '3-way valve',
      'Check valve',
      '2-way valve',
      'Ball valve',
    ],
    correctAnswer: 0,
    explanation:
      'A 3-way valve diverts flow between two different circuits. It has three ports and can direct fluid from one inlet to either of two outlets, or mix flows from two inlets to one outlet.',
  },
  {
    id: 5,
    question: 'How do dampers control airflow in ventilation systems?',
    options: [
      'By changing the speed of ventilation fans',
      'By opening and closing to regulate air passage through ducts',
      'By filtering the air before it enters the system',
      'By heating or cooling the air as needed',
    ],
    correctAnswer: 1,
    explanation:
      'Dampers control airflow by opening and closing (or modulating to intermediate positions) to regulate the amount of air passing through ducts and ventilation systems.',
  },
  {
    id: 6,
    question: 'Give one example of where dampers are used in buildings.',
    options: [
      'Switching lights on and off',
      'Controlling water flow to radiators',
      'Controlling fresh air intake in HVAC systems',
      'Monitoring room temperature',
    ],
    correctAnswer: 2,
    explanation:
      'Dampers are commonly used to control fresh air intake in HVAC systems, allowing the BMS to regulate the amount of outside air entering the building for ventilation and energy efficiency.',
  },
  {
    id: 7,
    question: 'What type of signal controls a modulating actuator?',
    options: [
      'High frequency pulse signals',
      'Digital on/off signals only',
      '230V AC switching signals',
      'Analog signals such as 0-10V or 4-20mA',
    ],
    correctAnswer: 3,
    explanation:
      'Modulating actuators are controlled by analog signals such as 0-10V or 4-20mA, which allow precise positioning control anywhere between fully closed (0%) and fully open (100%).',
  },
  {
    id: 8,
    question: 'Why must actuator wiring be labelled clearly?',
    options: [
      'Because actuator wiring often involves multiple conductors and control types',
      'It must match system response requirements for proper control',
      'By opening and closing to regulate air passage through ducts',
      'The valves could only open/close fully instead of modulating gradually',
    ],
    correctAnswer: 0,
    explanation:
      'Actuator wiring must be labelled clearly because it often involves multiple conductors for power, control signals, feedback, and auxiliary functions. Clear labelling prevents wiring errors and aids troubleshooting.',
  },
  {
    id: 9,
    question: 'Why is actuator stroke time important?',
    options: [
      'Controlling fresh air intake in HVAC systems',
      'It must match system response requirements for proper control',
      'Because actuator wiring often involves multiple conductors and control types',
      'To convert electrical signals into mechanical movement',
    ],
    correctAnswer: 1,
    explanation:
      'Actuator stroke time (the time to move from fully closed to fully open) must match system requirements. Too fast can cause water hammer or hunting, too slow can result in poor temperature control.',
  },
  {
    id: 10,
    question:
      'In the real-world example, what went wrong when valve actuators were wired incorrectly?',
    options: [
      'To convert electrical signals into mechanical movement',
      'By opening and closing to regulate air passage through ducts',
      'The valves could only open/close fully instead of modulating gradually',
      'It must match system response requirements for proper control',
    ],
    correctAnswer: 2,
    explanation:
      'The modulating valve actuators were wired as on/off devices, so the BMS could only fully open or close the valves instead of adjusting flow gradually. This caused poor temperature control until they were rewired correctly for analog control.',
  },
];
