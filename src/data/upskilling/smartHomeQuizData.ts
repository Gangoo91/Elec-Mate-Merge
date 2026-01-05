import type { QuizQuestion } from '@/types/quiz';

export const smartHomeQuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the definition of a smart home according to modern standards?",
    options: [
      "A home with expensive appliances",
      "A residence that uses interconnected devices and systems to automate, monitor, and control functions",
      "A home with internet access only",
      "A home with voice assistants only"
    ],
    correctAnswer: 1,
    explanation: "A smart home integrates interconnected devices and systems to provide automation, monitoring, and control capabilities for lighting, heating, security, and other functions through various communication protocols."
  },
  {
    id: 2,
    question: "Which communication protocol is most commonly used for smart home device interconnection?",
    options: [
      "HTTP only",
      "FTP protocol",
      "Zigbee and Z-Wave mesh networks",
      "TCP/IP exclusively"
    ],
    correctAnswer: 2,
    explanation: "Zigbee and Z-Wave are the most common communication protocols used in smart homes due to their mesh networking capabilities, low power consumption, and reliability for home automation."
  },
  {
    id: 3,
    question: "What are the three core component categories of a smart home system?",
    options: [
      "Devices, protocols, and interfaces",
      "Hardware, software, and internet",
      "Sensors, actuators, and displays",
      "Wi-Fi, Bluetooth, and cellular"
    ],
    correctAnswer: 0,
    explanation: "Smart home systems consist of smart devices (sensors, actuators, hubs), communication protocols (Zigbee, Z-Wave, Wi-Fi), and control interfaces (smartphones, tablets, voice assistants)."
  },
  {
    id: 4,
    question: "What is the primary energy management benefit of smart home systems?",
    options: [
      "Increased energy consumption monitoring",
      "Optimised energy use through intelligent automation and scheduling",
      "Manual control of all electrical devices",
      "Higher electricity consumption tracking"
    ],
    correctAnswer: 1,
    explanation: "Smart homes enable optimised energy use through intelligent controls like smart thermostats, automated lighting schedules, and load management, which can significantly reduce overall energy consumption."
  },
  {
    id: 5,
    question: "Which accessibility feature makes smart homes particularly beneficial for elderly or disabled users?",
    options: [
      "Complex control panel systems",
      "Voice control and automated assistance features",
      "Manual switches and traditional controls",
      "Reduced device functionality"
    ],
    correctAnswer: 1,
    explanation: "Voice control and automated assistance features make smart homes particularly beneficial for elderly or disabled users who may have difficulty with traditional manual controls."
  },
  {
    id: 6,
    question: "What is a significant challenge in smart home adoption?",
    options: [
      "Devices are too simple to use",
      "Interoperability issues between different manufacturer systems",
      "Low initial costs",
      "Unlimited internet connectivity"
    ],
    correctAnswer: 1,
    explanation: "Interoperability issues between different manufacturer systems remain a significant challenge, though new standards like Matter are working to address this problem."
  },
  {
    id: 7,
    question: "What security consideration is most important in smart home implementation?",
    options: [
      "Physical lock mechanisms only",
      "Network security and data privacy protection",
      "Traditional alarm systems",
      "Manual security monitoring"
    ],
    correctAnswer: 1,
    explanation: "Network security and data privacy protection are crucial in smart homes as connected devices can be vulnerable to cyber attacks and data breaches if not properly secured."
  },
  {
    id: 8,
    question: "Which smart home system provides the most immediate safety benefits?",
    options: [
      "Entertainment systems",
      "Smart lighting automation",
      "Integrated security and monitoring systems",
      "Climate control systems"
    ],
    correctAnswer: 2,
    explanation: "Integrated security and monitoring systems provide immediate safety benefits through features like CCTV, smart locks, motion sensors, and emergency alert systems."
  },
  {
    id: 9,
    question: "What is the typical approach for existing homes to become smart homes?",
    options: [
      "Complete electrical system replacement",
      "Gradual retrofit with compatible devices and systems",
      "Building demolition and reconstruction",
      "Installation of single-brand ecosystems only"
    ],
    correctAnswer: 1,
    explanation: "Most existing homes become smart through gradual retrofit approaches, adding compatible devices and systems over time rather than complete system replacement."
  },
  {
    id: 10,
    question: "What role does artificial intelligence play in advanced smart home systems?",
    options: [
      "Only voice recognition functions",
      "Learning user patterns and predictive automation",
      "Basic timer functions only",
      "Manual programming assistance"
    ],
    correctAnswer: 1,
    explanation: "AI in smart homes enables learning user patterns, predictive automation, adaptive climate control, and personalised automation based on habits and preferences."
  }
];