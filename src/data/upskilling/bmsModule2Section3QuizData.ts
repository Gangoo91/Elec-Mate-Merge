import { QuizQuestion } from '@/types/quiz';

export const bmsModule2Section3QuizData: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the role of an actuator in a BMS?",
    options: [
      "To sense temperature and humidity levels",
      "To convert electrical signals into mechanical movement",
      "To display system status information",
      "To process data from multiple sensors"
    ],
    correctAnswer: 1,
    explanation: "Actuators convert electrical signals from the BMS into mechanical movement, acting as the 'muscles' of the system to physically control valves, dampers, and other mechanical devices."
  },
  {
    id: 2,
    question: "What is the difference between digital and analog actuators?",
    options: [
      "Digital actuators are faster than analog actuators",
      "Digital actuators move to fully open or closed positions, analog actuators modulate to precise positions",
      "Digital actuators use less power than analog actuators",
      "Digital actuators are more expensive than analog actuators"
    ],
    correctAnswer: 1,
    explanation: "Digital actuators provide on/off control (fully open or fully closed), while analog actuators can modulate to precise positions anywhere between 0-100% based on control signals like 0-10V or 4-20mA."
  },
  {
    id: 3,
    question: "What type of valve regulates flow in a single circuit?",
    options: [
      "3-way valve",
      "2-way valve",
      "4-way valve", 
      "Check valve"
    ],
    correctAnswer: 1,
    explanation: "A 2-way valve regulates flow rate in a single circuit by opening and closing to control the amount of fluid passing through. It has one inlet and one outlet."
  },
  {
    id: 4,
    question: "What type of valve diverts flow between two different circuits?",
    options: [
      "2-way valve",
      "Check valve",
      "3-way valve",
      "Ball valve"
    ],
    correctAnswer: 2,
    explanation: "A 3-way valve diverts flow between two different circuits. It has three ports and can direct fluid from one inlet to either of two outlets, or mix flows from two inlets to one outlet."
  },
  {
    id: 5,
    question: "How do dampers control airflow in ventilation systems?",
    options: [
      "By changing the speed of ventilation fans",
      "By filtering the air before it enters the system",
      "By opening and closing to regulate air passage through ducts",
      "By heating or cooling the air as needed"
    ],
    correctAnswer: 2,
    explanation: "Dampers control airflow by opening and closing (or modulating to intermediate positions) to regulate the amount of air passing through ducts and ventilation systems."
  },
  {
    id: 6,
    question: "Give one example of where dampers are used in buildings.",
    options: [
      "Controlling water flow to radiators",
      "Controlling fresh air intake in HVAC systems",
      "Monitoring room temperature",
      "Switching lights on and off"
    ],
    correctAnswer: 1,
    explanation: "Dampers are commonly used to control fresh air intake in HVAC systems, allowing the BMS to regulate the amount of outside air entering the building for ventilation and energy efficiency."
  },
  {
    id: 7,
    question: "What type of signal controls a modulating actuator?",
    options: [
      "Digital on/off signals only",
      "Analog signals such as 0-10V or 4-20mA",
      "High frequency pulse signals",
      "230V AC switching signals"
    ],
    correctAnswer: 1,
    explanation: "Modulating actuators are controlled by analog signals such as 0-10V or 4-20mA, which allow precise positioning control anywhere between fully closed (0%) and fully open (100%)."
  },
  {
    id: 8,
    question: "Why must actuator wiring be labelled clearly?",
    options: [
      "To comply with building regulations only",
      "Because actuator wiring often involves multiple conductors and control types",
      "To reduce installation costs",
      "To make the installation look professional"
    ],
    correctAnswer: 1,
    explanation: "Actuator wiring must be labelled clearly because it often involves multiple conductors for power, control signals, feedback, and auxiliary functions. Clear labelling prevents wiring errors and aids troubleshooting."
  },
  {
    id: 9,
    question: "Why is actuator stroke time important?",
    options: [
      "It determines the actuator's power consumption",
      "It must match system response requirements for proper control",
      "It affects the actuator's physical size",
      "It determines the actuator's cost"
    ],
    correctAnswer: 1,
    explanation: "Actuator stroke time (the time to move from fully closed to fully open) must match system requirements. Too fast can cause water hammer or hunting, too slow can result in poor temperature control."
  },
  {
    id: 10,
    question: "In the real-world example, what went wrong when valve actuators were wired incorrectly?",
    options: [
      "The actuators consumed too much power",
      "The actuators moved too slowly",
      "The valves could only open/close fully instead of modulating gradually",
      "The actuators overheated and failed"
    ],
    correctAnswer: 2,
    explanation: "The modulating valve actuators were wired as on/off devices, so the BMS could only fully open or close the valves instead of adjusting flow gradually. This caused poor temperature control until they were rewired correctly for analog control."
  }
];