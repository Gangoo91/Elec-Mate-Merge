export const smartHomeModule2Section3QuizQuestions = [
  {
    id: 1,
    question: "What is Wi-Fi best suited for in smart homes?",
    options: [
      "Battery-powered sensors",
      "High-bandwidth devices like cameras",
      "Long-range outdoor sensors",
      "Low-power mesh networking"
    ],
    correct: 1,
    explanation: "Wi-Fi provides high bandwidth (1000+ Mbps) making it ideal for data-intensive devices like security cameras, video doorbells, and smart displays."
  },
  {
    id: 2,
    question: "Why is Wi-Fi unsuitable for most battery-powered sensors?",
    options: [
      "It's too expensive",
      "It has poor security",
      "It consumes too much power",
      "It has limited range"
    ],
    correct: 2,
    explanation: "Wi-Fi has high power consumption which would quickly drain small sensor batteries. Low-power protocols like Thread or Zigbee are better for battery devices."
  },
  {
    id: 3,
    question: "What does BLE stand for?",
    options: [
      "Basic Low Energy",
      "Bluetooth Low Energy",
      "Battery Life Extension",
      "Bluetooth Light Efficiency"
    ],
    correct: 1,
    explanation: "BLE stands for Bluetooth Low Energy, optimised for ultra-low power consumption in smart home devices like sensors and trackers."
  },
  {
    id: 4,
    question: "Give two common uses of Bluetooth in smart homes.",
    options: [
      "Security cameras and smart TVs",
      "Smart locks and fitness trackers",
      "Mesh lighting and HVAC systems",
      "Video doorbells and streaming devices"
    ],
    correct: 1,
    explanation: "Bluetooth excels in personal area networks for devices like smart locks (proximity unlocking) and fitness trackers (low power, direct phone connection)."
  },
  {
    id: 5,
    question: "What is Thread designed for?",
    options: [
      "High-bandwidth video streaming",
      "Long-distance outdoor communication",
      "Low-power IoT mesh networking",
      "Audio streaming applications"
    ],
    correct: 2,
    explanation: "Thread is specifically designed for IoT devices, providing IP-based mesh networking with low power consumption and self-healing capabilities."
  },
  {
    id: 6,
    question: "True or False: Thread is an IP-based mesh protocol.",
    options: [
      "True",
      "False"
    ],
    correct: 0,
    explanation: "True. Thread uses IPv6 and provides IP-based mesh networking, allowing direct internet connectivity and integration with existing IP infrastructure."
  },
  {
    id: 7,
    question: "What is the main purpose of the Matter standard?",
    options: [
      "To replace Wi-Fi completely",
      "To solve device compatibility issues",
      "To increase data transmission speeds",
      "To reduce manufacturing costs"
    ],
    correct: 1,
    explanation: "Matter's primary goal is interoperability - ensuring devices from different manufacturers can work together across various smart home ecosystems."
  },
  {
    id: 8,
    question: "Which major companies support Matter? (Select all that apply)",
    options: [
      "Apple, Google, Amazon, Samsung",
      "Only Google and Amazon",
      "Only Apple and Samsung",
      "Only startups and small companies"
    ],
    correct: 0,
    explanation: "Matter has broad industry support including Apple, Google, Amazon, Samsung, and many other major technology companies through the Connectivity Standards Alliance."
  },
  {
    id: 9,
    question: "Which protocol is best for high-data devices like cameras?",
    options: [
      "Thread",
      "Bluetooth",
      "Wi-Fi",
      "Matter"
    ],
    correct: 2,
    explanation: "Wi-Fi provides the high bandwidth needed for video streaming from security cameras and video doorbells, supporting data rates of 1000+ Mbps."
  },
  {
    id: 10,
    question: "Scenario: You are designing a future-proof system for a new home. Which two standards would you prioritise?",
    options: [
      "Thread and Wi-Fi only",
      "Thread and Matter",
      "Bluetooth and Wi-Fi only",
      "Only Matter"
    ],
    correct: 1,
    explanation: "Thread provides future-proof mesh networking for IoT devices, while Matter ensures interoperability across brands and ecosystems. Together they offer the best foundation for a modern smart home."
  }
];