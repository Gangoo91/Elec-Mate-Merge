import { QuizQuestion } from '@/types/quiz';

export const bmsModule2Section5QuizData: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the purpose of I/O modules in a BMS?",
    options: [
      "To replace the main controller when it fails",
      "To provide additional connection points for sensors and actuators",
      "To reduce the power consumption of the system",
      "To convert analog signals to digital signals only"
    ],
    correctAnswer: 1,
    explanation: "I/O modules expand the capacity of BMS controllers by providing additional connection points for sensors and actuators without replacing the main controller."
  },
  {
    id: 2,
    question: "What type of devices connect to digital input modules?",
    options: [
      "Temperature sensors and humidity sensors",
      "Modulating valves and variable speed drives",
      "Switches, contacts, and alarm devices",
      "CO₂ sensors and pressure transmitters"
    ],
    correctAnswer: 2,
    explanation: "Digital input modules connect devices that provide on/off or binary status signals, such as switches, contacts, and alarm devices."
  },
  {
    id: 3,
    question: "Give an example of a device controlled by a digital output module.",
    options: [
      "A modulating damper actuator",
      "A variable speed drive with 4-20mA control",
      "A temperature sensor",
      "A pump starter or fan relay"
    ],
    correctAnswer: 3,
    explanation: "Digital output modules control devices that require on/off switching, such as pump starters, fan relays, lights, and other binary control devices."
  },
  {
    id: 4,
    question: "What type of sensors connect to analog input modules?",
    options: [
      "Door contact switches and motion detectors",
      "Temperature, humidity, CO₂, and pressure sensors",
      "Fire alarm contacts and emergency stops",
      "Pump status indicators and fan run signals"
    ],
    correctAnswer: 1,
    explanation: "Analog input modules connect sensors that provide variable signals representing measurements, such as temperature, humidity, CO₂, and pressure sensors."
  },
  {
    id: 5,
    question: "What type of devices connect to analog output modules?",
    options: [
      "Emergency lighting circuits",
      "Fire alarm sounders",
      "Modulating valves, dampers, and variable speed drives",
      "Door access control systems"
    ],
    correctAnswer: 2,
    explanation: "Analog output modules connect to devices requiring variable control signals, such as modulating valve actuators, damper actuators, and variable speed drives."
  },
  {
    id: 6,
    question: "What communication protocols might expansion modules use?",
    options: [
      "HTTP and FTP only",
      "BACnet, Modbus, and proprietary protocols",
      "Email and SMS protocols",
      "WiFi and Bluetooth only"
    ],
    correctAnswer: 1,
    explanation: "Expansion modules communicate with the main BMS controller using industrial protocols such as BACnet, Modbus, or manufacturer-specific proprietary protocols."
  },
  {
    id: 7,
    question: "What must be configured so the BMS recognises an I/O module?",
    options: [
      "The module's IP address only",
      "The module's communication address and point configuration",
      "The module's power consumption rating",
      "The module's physical location coordinates"
    ],
    correctAnswer: 1,
    explanation: "Each expansion module must be assigned a unique communication address and have its input/output points properly configured so the BMS controller can recognise and communicate with it."
  },
  {
    id: 8,
    question: "Why should expansion modules be installed close to equipment?",
    options: [
      "To reduce cable runs and installation costs",
      "To improve the module's processing speed",
      "To increase the module's power efficiency",
      "To make the module easier to program"
    ],
    correctAnswer: 0,
    explanation: "Installing expansion modules close to the equipment they serve reduces cable runs, lowers installation costs, and improves signal quality by minimising cable lengths."
  },
  {
    id: 9,
    question: "Why is wiring and labelling critical in I/O panels?",
    options: [
      "To meet insurance requirements only",
      "For easy identification, maintenance, and troubleshooting",
      "To reduce electromagnetic interference",
      "To improve the system's energy efficiency"
    ],
    correctAnswer: 1,
    explanation: "Clear wiring and comprehensive labelling are essential for easy identification, maintenance, and troubleshooting, especially in I/O panels that contain many terminations and connections."
  },
  {
    id: 10,
    question: "In the real-world example, what problem was solved by adding an analog input module?",
    options: [
      "The main controller was damaged and needed replacement",
      "Extra CO₂ sensors were added but the main controller had no free analog inputs",
      "The existing sensors were providing inaccurate readings",
      "The system needed better communication protocols"
    ],
    correctAnswer: 1,
    explanation: "The analog input expansion module solved the problem of insufficient analog inputs on the main controller when extra CO₂ sensors were added during construction, allowing all classrooms to be monitored effectively."
  }
];