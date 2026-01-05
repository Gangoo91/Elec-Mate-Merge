interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export const smartHomeModule6Section4QuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What does bridging mean in smart homes?",
    options: [
      "Building physical bridges between devices",
      "Enabling older or incompatible devices to communicate with modern smart home platforms",
      "Connecting devices with cables",
      "Installing new devices only"
    ],
    correct: 1,
    explanation: "Bridging enables older or incompatible devices to communicate with modern smart home platforms through various integration methods."
  },
  {
    id: 2,
    question: "Give one example of a device that might need bridging.",
    options: [
      "New smart bulb",
      "Wired intruder alarm system",
      "Modern smart thermostat",
      "Wi-Fi enabled camera"
    ],
    correct: 1,
    explanation: "Wired intruder alarm systems installed before smart home standards often need bridging to integrate with modern platforms."
  },
  {
    id: 3,
    question: "What role does a Hue Bridge play in integration?",
    options: [
      "It powers the lights",
      "It connects Zigbee bulbs to platforms like Alexa",
      "It replaces old bulbs",
      "It provides internet connectivity"
    ],
    correct: 1,
    explanation: "The Hue Bridge acts as a translator, enabling Zigbee bulbs to communicate with platforms like Alexa that don't natively support Zigbee."
  },
  {
    id: 4,
    question: "Name two types of legacy systems electricians often encounter.",
    options: [
      "Smart thermostats and Wi-Fi cameras",
      "Wired alarms and old thermostats",
      "New lighting and modern HVAC",
      "Zigbee devices and Z-Wave sensors"
    ],
    correct: 1,
    explanation: "Wired alarm systems and old programmable thermostats are common legacy systems that electricians need to integrate or replace in smart home upgrades."
  },
  {
    id: 5,
    question: "What is a protocol converter?",
    options: [
      "A device that changes electrical voltage",
      "A device that translates signals between different communication protocols",
      "A type of smart switch",
      "A programming tool"
    ],
    correct: 1,
    explanation: "Protocol converters translate signals between different communication standards, such as converting Zigbee signals to Wi-Fi for broader compatibility."
  },
  {
    id: 6,
    question: "How can Home Assistant help bridge devices?",
    options: [
      "By replacing all old devices",
      "Through plugins and integrations that connect multiple device types",
      "By providing power to devices",
      "By installing new wiring"
    ],
    correct: 1,
    explanation: "Home Assistant uses plugins and integrations to connect various device types and protocols, creating a unified smart home platform."
  },
  {
    id: 7,
    question: "What is one advantage of bridging instead of replacing legacy systems?",
    options: [
      "Better performance than new systems",
      "Lower cost and extended lifespan of existing investment",
      "Easier installation process",
      "Better security features"
    ],
    correct: 1,
    explanation: "Bridging can be more cost-effective than complete replacement, extending the useful life of existing systems while adding smart functionality."
  },
  {
    id: 8,
    question: "What is one limitation of bridging?",
    options: [
      "It's always more expensive than replacement",
      "Reduced functionality and potential additional points of failure",
      "It requires new wiring",
      "It only works with one brand"
    ],
    correct: 1,
    explanation: "Bridging often provides reduced functionality compared to native smart devices and adds complexity that can create additional points of failure."
  },
  {
    id: 9,
    question: "Why should electricians warn clients about reduced functionality?",
    options: [
      "To increase sales",
      "To set realistic expectations about what bridged systems can and cannot do",
      "To avoid liability",
      "To promote expensive solutions"
    ],
    correct: 1,
    explanation: "Setting realistic expectations helps clients understand limitations, such as basic on/off control versus full automation features in bridged systems."
  },
  {
    id: 10,
    question: "In the real-world example, what legacy system was bridged and how?",
    options: [
      "Old thermostat via Wi-Fi adapter",
      "Wired alarm system via smart relay interface",
      "Analogue cameras via digital converter",
      "Old lighting via Zigbee bridge"
    ],
    correct: 1,
    explanation: "A wired alarm system from the early 2000s was bridged using a smart relay interface, enabling notifications and routine triggers while preserving the existing system."
  }
];