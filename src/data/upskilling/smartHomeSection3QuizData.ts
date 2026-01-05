interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export const smartHomeSection3QuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What is a sensor in a smart home?",
    options: [
      "A device that carries out physical actions",
      "A device that detects changes in the environment",
      "A device that processes data and makes decisions",
      "A device that stores automation rules"
    ],
    correct: 1,
    explanation: "Sensors are input devices that detect changes in the environment (like motion, temperature, light) and send signals to controllers."
  },
  {
    id: 2,
    question: "Give two examples of environmental sensors.",
    options: [
      "Smart locks and dimmers",
      "Motors and relays",
      "Smoke detectors and flood sensors",
      "Controllers and hubs"
    ],
    correct: 2,
    explanation: "Environmental sensors include smoke detectors, CO₂ sensors, and flood detection sensors that monitor safety conditions."
  },
  {
    id: 3,
    question: "What is an actuator's purpose?",
    options: [
      "To detect environmental changes",
      "To store user preferences",
      "To carry out physical actions when instructed",
      "To connect to the internet"
    ],
    correct: 2,
    explanation: "Actuators are output devices that carry out physical actions when instructed by controllers, such as switching lights or locking doors."
  },
  {
    id: 4,
    question: "List two actuators used in HVAC control.",
    options: [
      "Temperature sensors and humidity sensors",
      "Motors and valves",
      "Motion detectors and light sensors",
      "Smartphones and tablets"
    ],
    correct: 1,
    explanation: "Motors (for dampers and fans) and valves (for water and gas flow) are key actuators used in HVAC control systems."
  },
  {
    id: 5,
    question: "What is the role of a controller in a smart home?",
    options: [
      "To detect motion in rooms",
      "To turn lights on and off manually",
      "To process sensor data and decide what actuators should do",
      "To display information to users"
    ],
    correct: 2,
    explanation: "Controllers are decision-makers that process sensor data and determine what actions actuators should perform based on programmed rules."
  },
  {
    id: 6,
    question: "True or False: A smart lock is an example of a sensor.",
    options: [
      "True",
      "False"
    ],
    correct: 1,
    explanation: "False. A smart lock is an actuator (output device) that performs the physical action of locking/unlocking when instructed by a controller."
  },
  {
    id: 7,
    question: "What is the typical communication flow in a smart home system?",
    options: [
      "Actuator → Sensor → Controller → Feedback",
      "Sensor → Controller → Actuator → Feedback",
      "Controller → Sensor → Actuator → Feedback",
      "Feedback → Sensor → Controller → Actuator"
    ],
    correct: 1,
    explanation: "The flow is: Sensor detects change → Controller interprets signal → Actuator performs action → Feedback loop provides status."
  },
  {
    id: 8,
    question: "Name one common integration challenge.",
    options: [
      "Too many sensors available",
      "Compatibility issues between different brands and protocols",
      "Sensors are too accurate",
      "Controllers work too quickly"
    ],
    correct: 1,
    explanation: "Compatibility issues arise when different brands use different protocols (Zigbee, Z-Wave, Wi-Fi) that may not work together seamlessly."
  },
  {
    id: 9,
    question: "What role could AI play in future controllers?",
    options: [
      "Replace all sensors",
      "Eliminate the need for actuators",
      "Predict user needs and optimise energy usage automatically",
      "Make systems more expensive"
    ],
    correct: 2,
    explanation: "AI-driven controllers could predict user behaviour patterns and automatically optimise energy usage without manual programming."
  },
  {
    id: 10,
    question: "Why is actuator reliability critical in security applications?",
    options: [
      "They are expensive to replace",
      "They must work instantly for safety and security",
      "They use too much power",
      "They are difficult to install"
    ],
    correct: 1,
    explanation: "In security applications, actuators like smart locks must work instantly and reliably to ensure safety and security are not compromised."
  }
];