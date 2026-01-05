export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export const dataCablingModule1Section3Quiz: QuizQuestion[] = [
  {
    id: 1,
    question: "Which of the following is a characteristic of passive network components?",
    options: [
      "They require electrical power to function",
      "They process and manage network traffic",
      "They do not require electrical power and provide physical pathways for signals",
      "They can route data between different networks"
    ],
    correct: 2,
    explanation: "Passive components like cables, connectors, and patch panels do not require electrical power and simply provide physical pathways for signals to travel through the network."
  },
  {
    id: 2,
    question: "What is the main advantage of using active network components?",
    options: [
      "They never need maintenance",
      "They provide network intelligence and management capabilities",
      "They are less expensive than passive components",
      "They work without electrical power"
    ],
    correct: 1,
    explanation: "Active components like switches and routers provide network intelligence, including traffic management, routing decisions, security features, and remote monitoring capabilities."
  },
  {
    id: 3,
    question: "In terms of lifespan, which statement is most accurate?",
    options: [
      "Active components typically last longer than passive components",
      "Both active and passive components have the same lifespan",
      "Passive components typically last 15-25 years whilst active components last 3-7 years",
      "Active components last 15-25 years whilst passive components last 3-7 years"
    ],
    correct: 2,
    explanation: "Passive infrastructure like cabling typically lasts 15-25 years with minimal maintenance, whilst active equipment needs replacement every 3-7 years due to technology advancement and component wear."
  },
  {
    id: 4,
    question: "Which environment would favour the use of passive components?",
    options: [
      "A modern office building with climate control",
      "A harsh manufacturing environment with dust and temperature extremes",
      "A data centre with redundant power supplies",
      "A small office with basic networking needs"
    ],
    correct: 1,
    explanation: "Harsh environments with dust, temperature extremes, and potential electrical interference favour passive components because they are more reliable and require no power or active cooling."
  },
  {
    id: 5,
    question: "What is the best approach for most modern network designs?",
    options: [
      "Use only passive components for maximum reliability",
      "Use only active components for maximum functionality",
      "Use a hybrid approach combining passive infrastructure with strategically placed active components",
      "Alternate between passive and active components randomly"
    ],
    correct: 2,
    explanation: "Modern networks typically use a hybrid approach: passive infrastructure provides the reliable foundation, whilst active components are strategically placed where network intelligence and management are needed."
  }
];

export const dataCablingModule1Section4Quiz: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the difference between bandwidth and throughput?",
    options: [
      "They are exactly the same thing",
      "Bandwidth is the maximum capacity, throughput is the actual data successfully transmitted",
      "Throughput is always higher than bandwidth",
      "Bandwidth measures speed, throughput measures distance"
    ],
    correct: 1,
    explanation: "Bandwidth represents the maximum theoretical capacity of a network connection, whilst throughput is the actual amount of data successfully transmitted, which is often lower due to various factors."
  },
  {
    id: 2,
    question: "Which Ethernet standard supports 10 Gbps over copper cable?",
    options: [
      "1000BASE-T",
      "100BASE-TX",
      "10GBASE-T",
      "40GBASE-T"
    ],
    correct: 2,
    explanation: "10GBASE-T is the Ethernet standard that supports 10 Gbps transmission over copper cables, typically requiring Cat 6A or higher category cabling."
  },
  {
    id: 3,
    question: "When planning for future network capacity, what growth rate should you typically consider?",
    options: [
      "No growth - current requirements are sufficient",
      "Double capacity every 10 years",
      "Plan for 10x growth every 5 years",
      "Triple capacity every year"
    ],
    correct: 2,
    explanation: "Network bandwidth requirements historically double every 2-3 years. Planning for 10x growth over 5 years provides adequate headroom for most business scenarios and emerging technologies."
  },
  {
    id: 4,
    question: "Which application typically requires the highest bandwidth per user?",
    options: [
      "Email and web browsing",
      "VoIP phone calls",
      "4K video streaming",
      "Basic file sharing"
    ],
    correct: 2,
    explanation: "4K video streaming requires 25-100 Mbps per stream, making it one of the highest bandwidth applications in typical business environments, far exceeding email, VoIP, or basic file sharing needs."
  },
  {
    id: 5,
    question: "What is the most important factor when future-proofing network infrastructure?",
    options: [
      "Buying the cheapest equipment available",
      "Installing higher-grade cabling that can support future speed upgrades",
      "Using only wireless connections",
      "Avoiding any planning for growth"
    ],
    correct: 1,
    explanation: "Installing higher-grade cabling (like Cat 6A instead of Cat 6) is crucial for future-proofing because the passive infrastructure typically lasts 15-25 years and supports multiple generations of active equipment upgrades."
  }
];