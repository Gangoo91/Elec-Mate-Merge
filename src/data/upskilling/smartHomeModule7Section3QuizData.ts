interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export const smartHomeModule7Section3QuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Why is signal strength important in smart homes?",
    options: [
      "It makes devices look better",
      "Smart devices rely on constant connectivity for control and automation",
      "It reduces installation costs",
      "It changes device colours"
    ],
    correct: 1,
    explanation: "Smart devices depend on reliable wireless connectivity for control, automation, status updates, and communication. Poor signals lead to system failures and user frustration."
  },
  {
    id: 2,
    question: "What issues can weak Wi-Fi cause for smart devices?",
    options: [
      "Improved security",
      "Delays, missed commands, or devices appearing 'offline'",
      "Lower electricity bills",
      "Better device appearance"
    ],
    correct: 1,
    explanation: "Weak Wi-Fi signals cause delayed responses, missed commands, intermittent connectivity, devices appearing offline, failed automation, and increased battery drain."
  },
  {
    id: 3,
    question: "What unit is used to measure Wi-Fi signal strength?",
    options: [
      "Volts",
      "Watts", 
      "dBm (decibel-milliwatts)",
      "Amperes"
    ],
    correct: 2,
    explanation: "Wi-Fi signal strength is measured in dBm (decibel-milliwatts). Values are always negative, with higher numbers (closer to 0) indicating stronger signals."
  },
  {
    id: 4,
    question: "What is the recommended minimum Wi-Fi signal level for reliable performance?",
    options: [
      "-90 dBm",
      "-75 dBm",
      "-65 dBm or stronger",
      "-30 dBm"
    ],
    correct: 2,
    explanation: "-65 dBm or stronger is recommended for reliable Wi-Fi performance. Critical devices like security systems should have -50 dBm or better for optimal reliability."
  },
  {
    id: 5,
    question: "How do Zigbee and Z-Wave meshes improve coverage?",
    options: [
      "By using more electricity",
      "Powered devices act as signal repeaters in a self-healing network",
      "By making devices more expensive",
      "By changing signal colours"
    ],
    correct: 1,
    explanation: "Zigbee and Z-Wave create mesh networks where powered devices (plugs, switches) act as signal repeaters, automatically finding the best paths and improving overall coverage."
  },
  {
    id: 6,
    question: "Why should devices not be placed in metal enclosures?",
    options: [
      "They look unprofessional",
      "Metal blocks wireless signals (Faraday cage effect)",
      "They cost more to install", 
      "They use more power"
    ],
    correct: 1,
    explanation: "Metal enclosures create a Faraday cage effect that blocks wireless signals. Smart devices inside metal consumer units or steel boxes will have poor or no connectivity."
  },
  {
    id: 7,
    question: "Give one way to improve Wi-Fi coverage in a large home.",
    options: [
      "Use more expensive devices",
      "Install mesh Wi-Fi systems or repeaters",
      "Paint walls different colours",
      "Install more light switches"
    ],
    correct: 1,
    explanation: "Mesh Wi-Fi systems, Wi-Fi extenders, or powerline adapters can improve coverage in large homes by extending the wireless network to previously unreachable areas."
  },
  {
    id: 8,
    question: "What is one common cause of intermittent connectivity?",
    options: [
      "Using the wrong app",
      "RF interference from appliances or neighbouring networks",
      "Installing during winter",
      "Device colour preferences"
    ],
    correct: 1,
    explanation: "RF interference from microwave ovens, baby monitors, cordless phones, or neighbouring Wi-Fi networks commonly causes intermittent connectivity issues in smart homes."
  },
  {
    id: 9,
    question: "Why is it important to test wireless signals before finalising device placement?",
    options: [
      "To meet legal requirements",
      "To ensure reliable operation and avoid future problems",
      "To increase installation costs",
      "To impress clients"
    ],
    correct: 1,
    explanation: "Testing signals before final placement ensures devices will operate reliably, prevents call-backs, reduces troubleshooting, and provides better customer satisfaction."
  },
  {
    id: 10,
    question: "In the real-world example, what solved the heating system's connection problems?",
    options: [
      "Buying more expensive devices",
      "Relocating the router centrally and adding a mesh extender",
      "Changing the heating system brand",
      "Installing more sensors"
    ],
    correct: 1,
    explanation: "The rural property's connection issues were resolved by moving the router from behind a thick stone wall to a central position and adding a Wi-Fi mesh extender for better coverage."
  }
];