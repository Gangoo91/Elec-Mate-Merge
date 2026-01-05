export const bmsModule4Section5QuizQuestions = [
  {
    id: 1,
    question: "Why is it inefficient to run lighting and HVAC independently?",
    options: [
      "Because they use different voltage levels",
      "Because they waste energy without coordination and awareness of occupancy patterns",
      "Because they require different maintenance schedules",
      "Because they use incompatible communication protocols"
    ],
    correct: 1,
    explanation: "Independent systems operate without awareness of each other, leading to energy waste when lights run in empty rooms while HVAC continues full operation, or when lighting heat gains aren't considered in cooling calculations."
  },
  {
    id: 2,
    question: "Give one example of an occupancy-based combined control strategy.",
    options: [
      "PIR sensors control lighting only, HVAC runs on fixed schedules",
      "PIR sensors switch lights and reduce HVAC airflow when no one is present",
      "Motion sensors only work during business hours",
      "Occupancy sensors control temperature setpoints only"
    ],
    correct: 1,
    explanation: "Occupancy-based control uses sensors to simultaneously control both lighting (immediate response) and HVAC systems (typically with a delay) to eliminate energy waste in unoccupied spaces."
  },
  {
    id: 3,
    question: "How does daylight harvesting reduce HVAC demand as well as lighting energy?",
    options: [
      "It only affects lighting circuits, not HVAC systems",
      "It reduces artificial lighting heat gains, which lowers cooling requirements",
      "It changes the building's thermal mass properties",
      "It only works during summer months"
    ],
    correct: 1,
    explanation: "When daylight harvesting dims or switches off artificial lights, it reduces heat gains from lighting (typically 30-40W less cooling needed per 100W lighting reduction), allowing HVAC systems to operate more efficiently."
  },
  {
    id: 4,
    question: "What happens in an 'after-hours mode' combined strategy?",
    options: [
      "All systems run at reduced capacity",
      "Only security lighting remains operational",
      "Lights and HVAC remain off unless triggered by authorised access",
      "HVAC runs but lighting is disabled"
    ],
    correct: 2,
    explanation: "After-hours mode keeps both lighting and HVAC systems off outside normal schedules, only activating them when triggered by authorised access (badge swipe, security override) and typically for limited duration (2-4 hours)."
  },
  {
    id: 5,
    question: "What is demand-based load sharing?",
    options: [
      "Distributing electrical load evenly across circuits",
      "During peak demand, the BMS dims lights and adjusts HVAC setpoints to avoid energy penalties",
      "Sharing electrical loads between different buildings",
      "Using backup generators during high demand periods"
    ],
    correct: 1,
    explanation: "Demand-based load sharing automatically reduces energy consumption during peak demand periods by dimming lights (typically to 80-90%) and adjusting HVAC setpoints by 1-2°C to avoid expensive peak demand charges."
  },
  {
    id: 6,
    question: "Why should the same sensors be used for both HVAC and lighting when possible?",
    options: [
      "To reduce installation costs and complexity while ensuring coordinated system response",
      "Because different sensors would conflict with each other",
      "To meet electrical safety regulations",
      "Because it's required by building codes"
    ],
    correct: 0,
    explanation: "Using the same sensors for both systems reduces installation costs, simplifies maintenance, ensures coordinated responses, and eliminates potential conflicts between different sensor readings for the same space."
  },
  {
    id: 7,
    question: "What is the electrician's role in wiring integrated systems?",
    options: [
      "Only installing lighting circuits",
      "Programming the BMS controllers",
      "Wiring sensors to both systems, installing relays, and ensuring proper communication",
      "Testing HVAC equipment only"
    ],
    correct: 2,
    explanation: "Electricians enable integration by wiring sensors to both lighting and HVAC inputs, installing interposing relays for multi-system switching, ensuring communication network connectivity, and providing clear documentation."
  },
  {
    id: 8,
    question: "Why are interposing relays sometimes needed in combined control setups?",
    options: [
      "To boost electrical signals over long distances",
      "To prevent overloading a single circuit when one input triggers multiple systems",
      "To convert between different voltage levels",
      "To provide backup power during outages"
    ],
    correct: 1,
    explanation: "Interposing relays are used when one sensor or input needs to trigger multiple systems, preventing overloading of the original circuit while providing proper electrical isolation between different system voltages."
  },
  {
    id: 9,
    question: "Why should commissioning include simulated combined scenarios?",
    options: [
      "To meet warranty requirements",
      "To ensure both lighting and HVAC respond correctly to occupancy, daylight, and access scenarios",
      "To test individual circuits separately",
      "To calibrate temperature sensors"
    ],
    correct: 1,
    explanation: "Simulated scenarios during commissioning verify that integrated systems work together correctly, with appropriate timing delays, proper responses to different triggers, and fail-safe operation during system faults."
  },
  {
    id: 10,
    question: "In the real-world example, what percentage energy saving did the university achieve?",
    options: [
      "15%",
      "18%",
      "22%",
      "30%"
    ],
    correct: 2,
    explanation: "The university campus achieved a 22% reduction in total energy consumption by integrating PIR sensors to control both lighting and HVAC systems, eliminating waste in unoccupied classrooms and lecture halls."
  }
];