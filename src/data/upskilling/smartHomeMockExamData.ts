import { StandardMockQuestion } from '@/types/standardMockExam';
import { getRandomQuestionsBalanced } from '@/utils/questionSelection';

// Smart Home Mock Exam Question Bank - 200 Questions covering all modules
export const smartHomeQuestionBank: StandardMockQuestion[] = [
  // Smart Home Fundamentals (25 questions)
  {
    id: 1,
    question: "What is the primary advantage of a smart home system over traditional home automation?",
    options: [
      "Lower cost installation",
      "Integration and intelligent automation between devices",
      "Simpler wiring requirements",
      "Better energy efficiency only"
    ],
    correctAnswer: 1,
    explanation: "Smart home systems excel at integration and intelligent automation, allowing different devices to work together seamlessly and respond to various conditions automatically.",
    section: "Smart Home Fundamentals",
    difficulty: "basic",
    topic: "Smart Home Benefits",
    category: "Fundamentals"
  },
  {
    id: 2,
    question: "Which of the following is NOT a core component of a smart home system?",
    options: [
      "Smart devices and sensors",
      "Communication network",
      "Central hub or controller",
      "Traditional light switches"
    ],
    correctAnswer: 3,
    explanation: "Traditional light switches are replaced by smart switches in a smart home system. Core components include smart devices, communication networks, and central hubs.",
    section: "Smart Home Fundamentals",
    difficulty: "basic",
    topic: "System Components",
    category: "Fundamentals"
  },
  {
    id: 3,
    question: "What does IoT stand for in smart home technology?",
    options: [
      "Internet of Things",
      "Integration of Technology",
      "Intelligent Operating Terminal",
      "Indoor Optimization Technology"
    ],
    correctAnswer: 0,
    explanation: "IoT stands for Internet of Things, referring to the network of physical devices that connect and exchange data over the internet.",
    section: "Smart Home Fundamentals",
    difficulty: "basic",
    topic: "Terminology",
    category: "Fundamentals"
  },
  {
    id: 4,
    question: "Which factor is most important when designing a smart home system?",
    options: [
      "Using the cheapest devices available",
      "Installing as many devices as possible",
      "Understanding the customer's lifestyle and needs",
      "Using only wireless devices"
    ],
    correctAnswer: 2,
    explanation: "Understanding the customer's lifestyle and needs is crucial for designing a system that genuinely improves their daily life and provides value.",
    section: "Smart Home Fundamentals",
    difficulty: "intermediate",
    topic: "System Design",
    category: "Fundamentals"
  },
  {
    id: 5,
    question: "What is meant by 'interoperability' in smart home systems?",
    options: [
      "The ability to control devices remotely",
      "The ability for different devices to work together regardless of manufacturer",
      "The speed of device communication",
      "The security level of the system"
    ],
    correctAnswer: 1,
    explanation: "Interoperability refers to the ability for devices from different manufacturers to communicate and work together seamlessly within the same system.",
    section: "Smart Home Fundamentals",
    difficulty: "intermediate",
    topic: "Terminology",
    category: "Fundamentals"
  },
  {
    id: 6,
    question: "Which is the most energy-efficient approach to smart home automation?",
    options: [
      "Keeping all devices always on",
      "Using presence detection and scheduling",
      "Manual control only",
      "Random automation patterns"
    ],
    correctAnswer: 1,
    explanation: "Using presence detection and scheduling ensures devices operate only when needed, maximizing energy efficiency while maintaining comfort and convenience.",
    section: "Smart Home Fundamentals",
    difficulty: "intermediate",
    topic: "Energy Management",
    category: "Fundamentals"
  },
  {
    id: 7,
    question: "What is the primary purpose of a smart home gateway?",
    options: [
      "To provide Wi-Fi connectivity",
      "To store data locally",
      "To translate between different protocols and connect to the internet",
      "To control lighting only"
    ],
    correctAnswer: 2,
    explanation: "A smart home gateway acts as a translator between different protocols and provides internet connectivity, enabling different devices to communicate and be controlled remotely.",
    section: "Smart Home Fundamentals",
    difficulty: "intermediate",
    topic: "System Components",
    category: "Fundamentals"
  },
  {
    id: 8,
    question: "Which smart home feature provides the greatest security benefit?",
    options: [
      "Smart lighting",
      "Automated door locks with monitoring",
      "Smart thermostats",
      "Voice assistants"
    ],
    correctAnswer: 1,
    explanation: "Automated door locks with monitoring provide direct security benefits by controlling access and providing logs of entry/exit activities.",
    section: "Smart Home Fundamentals",
    difficulty: "basic",
    topic: "Security Features",
    category: "Security"
  },
  {
    id: 9,
    question: "What is 'geofencing' in smart home technology?",
    options: [
      "Physical barriers around the property",
      "Wireless signal encryption",
      "Location-based automation triggers",
      "Network security protocols"
    ],
    correctAnswer: 2,
    explanation: "Geofencing uses GPS or other location services to create virtual boundaries that trigger automated actions when residents enter or leave specified areas.",
    section: "Smart Home Fundamentals",
    difficulty: "intermediate",
    topic: "Automation Features",
    category: "Fundamentals"
  },
  {
    id: 10,
    question: "Which approach ensures the best user experience in smart home installation?",
    options: [
      "Installing all devices at once",
      "Starting with basic functionality and expanding gradually",
      "Using only the latest technology",
      "Avoiding user training"
    ],
    correctAnswer: 1,
    explanation: "Starting with basic functionality and expanding gradually allows users to become comfortable with the system while ensuring each component works properly before adding complexity.",
    section: "Smart Home Fundamentals",
    difficulty: "intermediate",
    topic: "Installation Best Practices",
    category: "Installation"
  },
  {
    id: 11,
    question: "What is the main advantage of edge computing in smart home systems?",
    options: [
      "Lower device costs",
      "Reduced latency and improved privacy",
      "Simpler installation",
      "Better wireless range"
    ],
    correctAnswer: 1,
    explanation: "Edge computing processes data locally, reducing latency for faster responses and improving privacy by keeping sensitive data on local devices rather than in the cloud.",
    section: "Smart Home Fundamentals",
    difficulty: "advanced",
    topic: "Data Processing",
    category: "Fundamentals"
  },
  {
    id: 12,
    question: "Which smart home protocol is best for battery-powered devices?",
    options: [
      "Wi-Fi",
      "Ethernet",
      "Zigbee or Z-Wave",
      "Bluetooth Classic"
    ],
    correctAnswer: 2,
    explanation: "Zigbee and Z-Wave are designed for low-power operation, making them ideal for battery-powered devices that need to operate for months or years on a single battery.",
    section: "Smart Home Fundamentals",
    difficulty: "intermediate",
    topic: "Protocols",
    category: "Protocols"
  },
  {
    id: 13,
    question: "What does 'mesh networking' provide in smart home systems?",
    options: [
      "Faster internet speeds",
      "Better device coverage and reliability",
      "Lower installation costs",
      "Simpler device pairing"
    ],
    correctAnswer: 1,
    explanation: "Mesh networking allows devices to communicate through multiple paths, extending coverage and improving reliability by providing redundant communication routes.",
    section: "Smart Home Fundamentals",
    difficulty: "intermediate",
    topic: "Networking",
    category: "Protocols"
  },
  {
    id: 14,
    question: "Which consideration is most important for smart home cybersecurity?",
    options: [
      "Using the same password for all devices",
      "Regular firmware updates and strong authentication",
      "Keeping devices always connected",
      "Using only wired connections"
    ],
    correctAnswer: 1,
    explanation: "Regular firmware updates patch security vulnerabilities, while strong authentication prevents unauthorized access to smart home systems.",
    section: "Smart Home Fundamentals",
    difficulty: "intermediate",
    topic: "Cybersecurity",
    category: "Security"
  },
  {
    id: 15,
    question: "What is the primary benefit of artificial intelligence in smart homes?",
    options: [
      "Reducing installation time",
      "Learning user patterns and automating accordingly",
      "Eliminating the need for sensors",
      "Providing entertainment"
    ],
    correctAnswer: 1,
    explanation: "AI learns from user behavior patterns and environmental conditions to automatically adjust settings and create personalized automation without manual programming.",
    section: "Smart Home Fundamentals",
    difficulty: "intermediate",
    topic: "AI Integration",
    category: "Fundamentals"
  },
  {
    id: 16,
    question: "Which smart home feature has the greatest impact on accessibility?",
    options: [
      "Voice control systems",
      "Smart door bells",
      "Automated blinds",
      "Smart speakers"
    ],
    correctAnswer: 0,
    explanation: "Voice control systems enable people with mobility limitations to control their environment easily, significantly improving accessibility and independence.",
    section: "Smart Home Fundamentals",
    difficulty: "basic",
    topic: "Accessibility",
    category: "Fundamentals"
  },
  {
    id: 17,
    question: "What is the recommended approach for smart home data backup?",
    options: [
      "No backup needed",
      "Cloud backup only",
      "Local backup only",
      "Both local and cloud backup strategies"
    ],
    correctAnswer: 3,
    explanation: "A comprehensive backup strategy includes both local and cloud options to ensure system configurations and data can be restored in various failure scenarios.",
    section: "Smart Home Fundamentals",
    difficulty: "intermediate",
    topic: "Data Management",
    category: "Fundamentals"
  },
  {
    id: 18,
    question: "Which factor most affects smart home system scalability?",
    options: [
      "Initial device count",
      "Protocol choice and network capacity",
      "Installation speed",
      "Brand selection"
    ],
    correctAnswer: 1,
    explanation: "Protocol choice determines how many devices can be supported and network capacity affects performance as the system grows.",
    section: "Smart Home Fundamentals",
    difficulty: "advanced",
    topic: "System Scalability",
    category: "Fundamentals"
  },
  {
    id: 19,
    question: "What is 'commissioning' in smart home installation?",
    options: [
      "Ordering devices",
      "Testing and configuring the complete system",
      "Marketing the system",
      "Warranty registration"
    ],
    correctAnswer: 1,
    explanation: "Commissioning involves systematically testing and configuring all components to ensure the system operates correctly and meets the design specifications.",
    section: "Smart Home Fundamentals",
    difficulty: "intermediate",
    topic: "Installation Process",
    category: "Installation"
  },
  {
    id: 20,
    question: "Which approach provides the best long-term value in smart home systems?",
    options: [
      "Choosing the cheapest options",
      "Using proprietary systems only",
      "Selecting open standards and quality components",
      "Installing maximum devices initially"
    ],
    correctAnswer: 2,
    explanation: "Open standards ensure future compatibility and upgrade options, while quality components provide reliability and longevity, delivering better long-term value.",
    section: "Smart Home Fundamentals",
    difficulty: "intermediate",
    topic: "System Planning",
    category: "Fundamentals"
  },
  {
    id: 21,
    question: "What is the primary purpose of smart home analytics?",
    options: [
      "Entertainment tracking",
      "Understanding usage patterns for optimization",
      "Increasing energy consumption",
      "Device counting"
    ],
    correctAnswer: 1,
    explanation: "Smart home analytics analyze usage patterns to optimize system performance, energy efficiency, and user comfort through data-driven insights.",
    section: "Smart Home Fundamentals",
    difficulty: "intermediate",
    topic: "Analytics",
    category: "Fundamentals"
  },
  {
    id: 22,
    question: "Which element is essential for effective smart home user interface design?",
    options: [
      "Complex menu structures",
      "Intuitive and consistent navigation",
      "Technical terminology",
      "Multiple login requirements"
    ],
    correctAnswer: 1,
    explanation: "Intuitive and consistent navigation ensures users can easily control their smart home system without confusion or extensive training.",
    section: "Smart Home Fundamentals",
    difficulty: "basic",
    topic: "User Interface",
    category: "Fundamentals"
  },
  {
    id: 23,
    question: "What is 'conditional automation' in smart homes?",
    options: [
      "Automation that works only sometimes",
      "Automation based on multiple conditions and triggers",
      "Manual control systems",
      "Time-based scheduling only"
    ],
    correctAnswer: 1,
    explanation: "Conditional automation uses multiple triggers and conditions (time, occupancy, weather, etc.) to create intelligent responses that adapt to various situations.",
    section: "Smart Home Fundamentals",
    difficulty: "intermediate",
    topic: "Automation",
    category: "Fundamentals"
  },
  {
    id: 24,
    question: "Which approach ensures optimal smart home system performance?",
    options: [
      "Regular maintenance and monitoring",
      "Never updating software",
      "Adding devices continuously",
      "Ignoring network capacity"
    ],
    correctAnswer: 0,
    explanation: "Regular maintenance and monitoring help identify issues early, ensure optimal performance, and extend system life through proactive care.",
    section: "Smart Home Fundamentals",
    difficulty: "basic",
    topic: "Maintenance",
    category: "Maintenance"
  },
  {
    id: 25,
    question: "What is the most important consideration for smart home future-proofing?",
    options: [
      "Buying the newest devices only",
      "Using proprietary protocols exclusively",
      "Designing flexible infrastructure with upgrade capabilities",
      "Avoiding wireless technologies"
    ],
    correctAnswer: 2,
    explanation: "Flexible infrastructure with upgrade capabilities allows systems to evolve with new technologies while protecting the initial investment.",
    section: "Smart Home Fundamentals",
    difficulty: "advanced",
    topic: "Future-Proofing",
    category: "Fundamentals"
  },

  // Communication Protocols (30 questions)
  {
    id: 26,
    question: "Which frequency band does Zigbee primarily operate on?",
    options: [
      "900 MHz",
      "2.4 GHz",
      "5 GHz",
      "60 GHz"
    ],
    correctAnswer: 1,
    explanation: "Zigbee primarily operates on the 2.4 GHz ISM band globally, though regional variants exist for 868 MHz (Europe) and 915 MHz (North America).",
    section: "Communication Protocols",
    difficulty: "intermediate",
    topic: "Zigbee",
    category: "Protocols"
  },
  {
    id: 27,
    question: "What is the maximum number of devices typically supported in a Z-Wave network?",
    options: [
      "128",
      "232",
      "500",
      "1000"
    ],
    correctAnswer: 1,
    explanation: "Z-Wave networks support up to 232 devices (nodes) per network, with node IDs ranging from 1 to 232.",
    section: "Communication Protocols",
    difficulty: "intermediate",
    topic: "Z-Wave",
    category: "Protocols"
  },
  {
    id: 28,
    question: "Which protocol provides the longest range for smart home devices?",
    options: [
      "Wi-Fi",
      "Bluetooth",
      "LoRaWAN",
      "Zigbee"
    ],
    correctAnswer: 2,
    explanation: "LoRaWAN provides the longest range, capable of covering several kilometers, making it suitable for wide-area IoT applications.",
    section: "Communication Protocols",
    difficulty: "intermediate",
    topic: "LoRaWAN",
    category: "Protocols"
  },
  {
    id: 29,
    question: "What is the main advantage of Wi-Fi 6 in smart home applications?",
    options: [
      "Lower power consumption",
      "Increased device capacity and efficiency",
      "Smaller antennas",
      "Reduced cost"
    ],
    correctAnswer: 1,
    explanation: "Wi-Fi 6 significantly increases device capacity through improved efficiency techniques like OFDMA and better handles dense device environments.",
    section: "Communication Protocols",
    difficulty: "intermediate",
    topic: "Wi-Fi",
    category: "Protocols"
  },
  {
    id: 30,
    question: "Which protocol is best suited for high-bandwidth applications like video streaming?",
    options: [
      "Zigbee",
      "Z-Wave",
      "Wi-Fi",
      "Thread"
    ],
    correctAnswer: 2,
    explanation: "Wi-Fi provides the highest bandwidth among common smart home protocols, making it ideal for video streaming and other high-data applications.",
    section: "Communication Protocols",
    difficulty: "basic",
    topic: "Wi-Fi",
    category: "Protocols"
  },
  {
    id: 31,
    question: "What does 'Matter' aim to achieve in smart home ecosystems?",
    options: [
      "Faster communication speeds",
      "Universal interoperability between different brands",
      "Lower device costs",
      "Better security only"
    ],
    correctAnswer: 1,
    explanation: "Matter is designed to provide universal interoperability, allowing devices from different manufacturers to work together seamlessly.",
    section: "Communication Protocols",
    difficulty: "basic",
    topic: "Matter",
    category: "Protocols"
  },
  {
    id: 32,
    question: "Which frequency does Z-Wave operate on in Europe?",
    options: [
      "868 MHz",
      "915 MHz",
      "2.4 GHz",
      "433 MHz"
    ],
    correctAnswer: 0,
    explanation: "Z-Wave operates on 868 MHz in Europe, 915 MHz in North America, and various other frequencies in different regions to comply with local regulations.",
    section: "Communication Protocols",
    difficulty: "intermediate",
    topic: "Z-Wave",
    category: "Protocols"
  },
  {
    id: 33,
    question: "What is the typical range of Bluetooth Low Energy (BLE) in smart home applications?",
    options: [
      "1-2 meters",
      "10-30 meters",
      "100 meters",
      "500 meters"
    ],
    correctAnswer: 1,
    explanation: "BLE typically provides a range of 10-30 meters in indoor environments, though this can vary based on obstacles and device implementation.",
    section: "Communication Protocols",
    difficulty: "basic",
    topic: "Bluetooth",
    category: "Protocols"
  },
  {
    id: 34,
    question: "Which protocol feature makes Zigbee particularly suitable for large smart home networks?",
    options: [
      "High data rates",
      "Self-healing mesh topology",
      "Long battery life",
      "Simple pairing process"
    ],
    correctAnswer: 1,
    explanation: "Zigbee's self-healing mesh topology allows the network to automatically find alternative routes if a device fails, ensuring reliability in large networks.",
    section: "Communication Protocols",
    difficulty: "intermediate",
    topic: "Zigbee",
    category: "Protocols"
  },
  {
    id: 35,
    question: "What is the primary security advantage of Z-Wave over Wi-Fi?",
    options: [
      "Stronger encryption",
      "Dedicated frequency band with less interference",
      "No internet connectivity",
      "Simpler passwords"
    ],
    correctAnswer: 1,
    explanation: "Z-Wave's dedicated frequency band reduces interference and makes it harder for attackers to access compared to the crowded 2.4 GHz Wi-Fi band.",
    section: "Communication Protocols",
    difficulty: "intermediate",
    topic: "Z-Wave",
    category: "Protocols"
  },
  {
    id: 36,
    question: "Which protocol consumes the least power for battery-operated devices?",
    options: [
      "Wi-Fi",
      "Zigbee 3.0",
      "Bluetooth Classic",
      "Ethernet"
    ],
    correctAnswer: 1,
    explanation: "Zigbee 3.0 is designed for ultra-low power consumption, allowing battery-powered devices to operate for years on a single battery.",
    section: "Communication Protocols",
    difficulty: "intermediate",
    topic: "Zigbee",
    category: "Protocols"
  },
  {
    id: 37,
    question: "What is 'Thread' in smart home networking?",
    options: [
      "A type of wiring",
      "An IPv6-based mesh networking protocol",
      "A security feature",
      "A device pairing method"
    ],
    correctAnswer: 1,
    explanation: "Thread is an IPv6-based mesh networking protocol designed specifically for IoT devices, providing secure and reliable communication.",
    section: "Communication Protocols",
    difficulty: "intermediate",
    topic: "Thread",
    category: "Protocols"
  },
  {
    id: 38,
    question: "Which factor most affects Zigbee network performance?",
    options: [
      "Device brand",
      "Network topology and interference",
      "Installation height",
      "Room temperature"
    ],
    correctAnswer: 1,
    explanation: "Network topology (how devices are arranged) and interference from other 2.4 GHz devices significantly impact Zigbee performance.",
    section: "Communication Protocols",
    difficulty: "intermediate",
    topic: "Zigbee",
    category: "Protocols"
  },
  {
    id: 39,
    question: "What is the maximum hop count in a typical Z-Wave mesh network?",
    options: [
      "2 hops",
      "4 hops",
      "8 hops",
      "Unlimited"
    ],
    correctAnswer: 1,
    explanation: "Z-Wave networks typically support up to 4 hops between the controller and end devices to maintain reliable communication and reasonable latency.",
    section: "Communication Protocols",
    difficulty: "advanced",
    topic: "Z-Wave",
    category: "Protocols"
  },
  {
    id: 40,
    question: "Which protocol provides the fastest device pairing process?",
    options: [
      "Wi-Fi WPS",
      "Zigbee touchlink",
      "Z-Wave inclusion",
      "Bluetooth pairing"
    ],
    correctAnswer: 1,
    explanation: "Zigbee touchlink allows for rapid device pairing by bringing devices close together and pressing buttons, typically completing in seconds.",
    section: "Communication Protocols",
    difficulty: "intermediate",
    topic: "Zigbee",
    category: "Protocols"
  },
  {
    id: 41,
    question: "What is 'beaconing' in Zigbee networks?",
    options: [
      "Device advertising",
      "Periodic synchronization signals from coordinators",
      "Error reporting",
      "Battery status updates"
    ],
    correctAnswer: 1,
    explanation: "Beaconing involves coordinators sending periodic synchronization signals to maintain network timing and coordination among devices.",
    section: "Communication Protocols",
    difficulty: "advanced",
    topic: "Zigbee",
    category: "Protocols"
  },
  {
    id: 42,
    question: "Which protocol is most susceptible to interference from microwave ovens?",
    options: [
      "Z-Wave",
      "Wi-Fi (2.4 GHz)",
      "LoRaWAN",
      "Infrared"
    ],
    correctAnswer: 1,
    explanation: "Microwave ovens operate at 2.45 GHz, which can interfere with Wi-Fi and other 2.4 GHz protocols like Zigbee and Bluetooth.",
    section: "Communication Protocols",
    difficulty: "intermediate",
    topic: "Interference",
    category: "Protocols"
  },
  {
    id: 43,
    question: "What is the primary benefit of using multiple protocols in a smart home system?",
    options: [
      "Reduced costs",
      "Leveraging each protocol's strengths for specific applications",
      "Simpler installation",
      "Better aesthetics"
    ],
    correctAnswer: 1,
    explanation: "Different protocols excel in different areas - using multiple protocols allows optimization for specific use cases (e.g., Wi-Fi for high bandwidth, Zigbee for sensors).",
    section: "Communication Protocols",
    difficulty: "intermediate",
    topic: "Multi-Protocol",
    category: "Protocols"
  },
  {
    id: 44,
    question: "Which encryption method does Z-Wave Plus use for security?",
    options: [
      "WEP",
      "WPA2",
      "AES-128",
      "DES"
    ],
    correctAnswer: 2,
    explanation: "Z-Wave Plus uses AES-128 encryption for secure communication between devices, providing strong security for smart home networks.",
    section: "Communication Protocols",
    difficulty: "intermediate",
    topic: "Z-Wave",
    category: "Protocols"
  },
  {
    id: 45,
    question: "What is 'channel bonding' in Wi-Fi networks?",
    options: [
      "Connecting multiple routers",
      "Combining channels for increased bandwidth",
      "Securing wireless connections",
      "Extending network range"
    ],
    correctAnswer: 1,
    explanation: "Channel bonding combines multiple Wi-Fi channels to increase available bandwidth, improving performance for high-data applications.",
    section: "Communication Protocols",
    difficulty: "advanced",
    topic: "Wi-Fi",
    category: "Protocols"
  },
  {
    id: 46,
    question: "Which protocol feature helps reduce smart home network congestion?",
    options: [
      "Higher transmission power",
      "Adaptive frequency hopping",
      "Larger antennas",
      "More access points"
    ],
    correctAnswer: 1,
    explanation: "Adaptive frequency hopping allows devices to switch between different frequencies to avoid congested channels and maintain reliable communication.",
    section: "Communication Protocols",
    difficulty: "intermediate",
    topic: "Network Management",
    category: "Protocols"
  },
  {
    id: 47,
    question: "What is the typical latency of Z-Wave communication?",
    options: [
      "1-5 milliseconds",
      "10-100 milliseconds",
      "1-2 seconds",
      "5-10 seconds"
    ],
    correctAnswer: 1,
    explanation: "Z-Wave typically has latency of 10-100 milliseconds for local communication, which is acceptable for most smart home control applications.",
    section: "Communication Protocols",
    difficulty: "intermediate",
    topic: "Z-Wave",
    category: "Protocols"
  },
  {
    id: 48,
    question: "Which factor most influences Zigbee network scalability?",
    options: [
      "Coordinator processing power",
      "Number of router devices",
      "Physical building size",
      "Internet bandwidth"
    ],
    correctAnswer: 1,
    explanation: "Router devices extend network coverage and capacity in Zigbee mesh networks, making them crucial for scalability in large installations.",
    section: "Communication Protocols",
    difficulty: "advanced",
    topic: "Zigbee",
    category: "Protocols"
  },
  {
    id: 49,
    question: "What is 'sub-GHz' communication's main advantage in smart homes?",
    options: [
      "Higher data rates",
      "Better penetration through walls and longer range",
      "Cheaper devices",
      "Faster pairing"
    ],
    correctAnswer: 1,
    explanation: "Sub-GHz frequencies (like Z-Wave's 868/915 MHz) penetrate walls better and provide longer range compared to 2.4 GHz protocols.",
    section: "Communication Protocols",
    difficulty: "intermediate",
    topic: "Frequency Bands",
    category: "Protocols"
  },
  {
    id: 50,
    question: "Which protocol requires internet connectivity for basic device control?",
    options: [
      "Zigbee",
      "Z-Wave",
      "Wi-Fi (cloud-dependent devices)",
      "Thread"
    ],
    correctAnswer: 2,
    explanation: "Some Wi-Fi devices rely entirely on cloud services and require internet connectivity for basic control, unlike local mesh protocols like Zigbee and Z-Wave.",
    section: "Communication Protocols",
    difficulty: "intermediate",
    topic: "Wi-Fi",
    category: "Protocols"
  },
  {
    id: 51,
    question: "What is 'MQTT' in smart home communications?",
    options: [
      "A wireless protocol",
      "A messaging protocol for IoT devices",
      "A security standard",
      "A network topology"
    ],
    correctAnswer: 1,
    explanation: "MQTT is a lightweight messaging protocol designed for IoT devices, enabling efficient communication between smart home devices and controllers.",
    section: "Communication Protocols",
    difficulty: "intermediate",
    topic: "MQTT",
    category: "Protocols"
  },
  {
    id: 52,
    question: "Which protocol provides the most deterministic communication timing?",
    options: [
      "Wi-Fi",
      "Zigbee",
      "Wired protocols (KNX, etc.)",
      "Bluetooth"
    ],
    correctAnswer: 2,
    explanation: "Wired protocols like KNX provide the most deterministic timing since they don't compete for wireless spectrum and have predictable communication patterns.",
    section: "Communication Protocols",
    difficulty: "advanced",
    topic: "Wired Protocols",
    category: "Protocols"
  },
  {
    id: 53,
    question: "What is the primary challenge when mixing different wireless protocols?",
    options: [
      "Cost increases",
      "RF interference and spectrum management",
      "Installation complexity",
      "User confusion"
    ],
    correctAnswer: 1,
    explanation: "Different wireless protocols may interfere with each other, especially those sharing the 2.4 GHz band, requiring careful spectrum management.",
    section: "Communication Protocols",
    difficulty: "intermediate",
    topic: "Interference",
    category: "Protocols"
  },
  {
    id: 54,
    question: "Which feature makes Matter particularly appealing for smart home installations?",
    options: [
      "Fastest communication speed",
      "Works with existing ecosystems (Alexa, Google, Apple)",
      "Lowest power consumption",
      "Cheapest implementation"
    ],
    correctAnswer: 1,
    explanation: "Matter's ability to work across existing major ecosystems (Alexa, Google Assistant, Apple HomeKit) eliminates vendor lock-in concerns.",
    section: "Communication Protocols",
    difficulty: "basic",
    topic: "Matter",
    category: "Protocols"
  },
  {
    id: 55,
    question: "What is 'commissioning mode' in smart home protocols?",
    options: [
      "Normal operation state",
      "Special state for adding new devices to the network",
      "Low power mode",
      "Diagnostic mode"
    ],
    correctAnswer: 1,
    explanation: "Commissioning mode is a special state where the network controller accepts new devices, typically activated temporarily for security purposes.",
    section: "Communication Protocols",
    difficulty: "intermediate",
    topic: "Device Pairing",
    category: "Protocols"
  },

  // Lighting Control and Scene Programming (25 questions)
  {
    id: 56,
    question: "What is the primary advantage of LED dimming over incandescent dimming?",
    options: [
      "Simpler wiring",
      "Energy efficiency maintained across dimming range",
      "Lower initial cost",
      "No electrical noise"
    ],
    correctAnswer: 1,
    explanation: "LED dimming maintains high energy efficiency across the entire dimming range, unlike incandescent bulbs which waste energy as heat even when dimmed.",
    section: "Lighting Control",
    difficulty: "intermediate",
    topic: "LED Technology",
    category: "Lighting"
  },
  {
    id: 57,
    question: "Which dimming method is most suitable for LED strip lights?",
    options: [
      "Phase cut dimming",
      "PWM (Pulse Width Modulation)",
      "Magnetic low voltage",
      "Fluorescent dimming"
    ],
    correctAnswer: 1,
    explanation: "PWM dimming rapidly switches LEDs on and off to control brightness, providing smooth, flicker-free dimming ideal for LED strips.",
    section: "Lighting Control",
    difficulty: "intermediate",
    topic: "Dimming Methods",
    category: "Lighting"
  },
  {
    id: 58,
    question: "What is a 'scene' in smart lighting systems?",
    options: [
      "A single light fixture",
      "A pre-programmed combination of lighting settings",
      "A room designation",
      "A type of light switch"
    ],
    correctAnswer: 1,
    explanation: "A scene is a pre-programmed combination of lighting settings (brightness, color, on/off states) that can be activated with a single command.",
    section: "Lighting Control",
    difficulty: "basic",
    topic: "Scene Programming",
    category: "Lighting"
  },
  {
    id: 59,
    question: "Which color temperature is typically used for 'warm white' lighting?",
    options: [
      "2700K-3000K",
      "4000K-4500K",
      "5000K-6500K",
      "7000K+"
    ],
    correctAnswer: 0,
    explanation: "Warm white lighting typically ranges from 2700K-3000K, providing a cozy, relaxing atmosphere similar to traditional incandescent bulbs.",
    section: "Lighting Control",
    difficulty: "basic",
    topic: "Color Temperature",
    category: "Lighting"
  },
  {
    id: 60,
    question: "What is 'circadian lighting' designed to achieve?",
    options: [
      "Energy savings",
      "Color changing effects",
      "Supporting natural human sleep-wake cycles",
      "Increased brightness levels"
    ],
    correctAnswer: 2,
    explanation: "Circadian lighting adjusts color temperature and brightness throughout the day to support natural human circadian rhythms and improve sleep quality.",
    section: "Lighting Control",
    difficulty: "intermediate",
    topic: "Circadian Lighting",
    category: "Lighting"
  },
  {
    id: 61,
    question: "Which lighting control method provides the fastest response time?",
    options: [
      "Wi-Fi controlled",
      "Hardwired/direct control",
      "Bluetooth controlled",
      "Cloud-based control"
    ],
    correctAnswer: 1,
    explanation: "Hardwired or direct control provides the fastest response time as there's no wireless communication delay or network processing required.",
    section: "Lighting Control",
    difficulty: "basic",
    topic: "Control Methods",
    category: "Lighting"
  },
  {
    id: 62,
    question: "What is the purpose of a 'master off' scene in smart lighting?",
    options: [
      "Turn off all lights in the system",
      "Set lights to maximum brightness",
      "Enable security mode",
      "Switch to energy saving mode"
    ],
    correctAnswer: 0,
    explanation: "A 'master off' scene provides a convenient way to turn off all lights in the system or designated areas with a single command.",
    section: "Lighting Control",
    difficulty: "basic",
    topic: "Scene Programming",
    category: "Lighting"
  },
  {
    id: 63,
    question: "Which factor most affects the perceived quality of LED dimming?",
    options: [
      "Color temperature",
      "Flicker performance and smoothness",
      "Power consumption",
      "Installation cost"
    ],
    correctAnswer: 1,
    explanation: "Flicker performance and smooth dimming transitions significantly affect perceived quality - poor dimming can cause visible flicker and stepped dimming curves.",
    section: "Lighting Control",
    difficulty: "intermediate",
    topic: "LED Technology",
    category: "Lighting"
  },
  {
    id: 64,
    question: "What is 'adaptive lighting' in smart home systems?",
    options: [
      "Lights that change color randomly",
      "Lighting that adjusts based on occupancy and ambient conditions",
      "Emergency lighting systems",
      "Battery backup lighting"
    ],
    correctAnswer: 1,
    explanation: "Adaptive lighting automatically adjusts based on factors like occupancy, time of day, ambient light levels, and user activities.",
    section: "Lighting Control",
    difficulty: "intermediate",
    topic: "Adaptive Lighting",
    category: "Lighting"
  },
  {
    id: 65,
    question: "Which lighting control topology provides the most flexibility for scene programming?",
    options: [
      "Simple on/off switches",
      "Individual dimmer switches",
      "Centralized lighting control system",
      "Motion sensor controls only"
    ],
    correctAnswer: 2,
    explanation: "Centralized lighting control systems provide maximum flexibility by allowing any combination of lights to be controlled together in scenes.",
    section: "Lighting Control",
    difficulty: "intermediate",
    topic: "Control Systems",
    category: "Lighting"
  },
  {
    id: 66,
    question: "What is the recommended approach for programming 'arrival' scenes?",
    options: [
      "Turn on all lights to maximum",
      "Gradually increase lighting based on time of day",
      "Use colored lighting only",
      "Keep lights dimmed always"
    ],
    correctAnswer: 1,
    explanation: "Arrival scenes should gradually increase appropriate lighting levels based on time of day and ambient conditions for comfort and energy efficiency.",
    section: "Lighting Control",
    difficulty: "intermediate",
    topic: "Scene Programming",
    category: "Lighting"
  },
  {
    id: 67,
    question: "Which lighting effect is most energy-efficient for pathway lighting?",
    options: [
      "Always on at full brightness",
      "Motion-activated with auto-off timer",
      "Color-changing sequences",
      "Strobing effects"
    ],
    correctAnswer: 1,
    explanation: "Motion-activated pathway lighting with auto-off timers provides safety while minimizing energy consumption by operating only when needed.",
    section: "Lighting Control",
    difficulty: "basic",
    topic: "Energy Efficiency",
    category: "Lighting"
  },
  {
    id: 68,
    question: "What is 'load balancing' in smart lighting systems?",
    options: [
      "Distributing electrical load across circuits",
      "Balancing color temperatures",
      "Equalizing light levels",
      "Managing lighting schedules"
    ],
    correctAnswer: 0,
    explanation: "Load balancing distributes electrical load across multiple circuits to prevent overloading and ensure stable operation of the lighting system.",
    section: "Lighting Control",
    difficulty: "intermediate",
    topic: "Electrical Design",
    category: "Installation"
  },
  {
    id: 69,
    question: "Which approach provides the best user experience for bedroom lighting scenes?",
    options: [
      "Bright white light only",
      "Multiple scenes for different activities (sleeping, reading, etc.)",
      "Random color changes",
      "Always dimmed lighting"
    ],
    correctAnswer: 1,
    explanation: "Multiple bedroom scenes (bedtime, reading, morning, etc.) provide appropriate lighting for different activities and times of day.",
    section: "Lighting Control",
    difficulty: "basic",
    topic: "Scene Programming",
    category: "Lighting"
  },
  {
    id: 70,
    question: "What is 'daylight harvesting' in smart lighting control?",
    options: [
      "Using solar panels to power lights",
      "Adjusting artificial lighting based on available natural light",
      "Storing sunlight for later use",
      "Directing sunlight into buildings"
    ],
    correctAnswer: 1,
    explanation: "Daylight harvesting uses sensors to measure natural light and automatically adjusts artificial lighting to maintain desired levels while saving energy.",
    section: "Lighting Control",
    difficulty: "intermediate",
    topic: "Energy Efficiency",
    category: "Lighting"
  },
  {
    id: 71,
    question: "Which lighting parameter is most important for task lighting scenes?",
    options: [
      "Color temperature and adequate brightness",
      "Color changing capability",
      "Dimming range",
      "Energy efficiency only"
    ],
    correctAnswer: 0,
    explanation: "Task lighting requires appropriate color temperature (typically cooler, 4000K+) and adequate brightness levels to support visual tasks effectively.",
    section: "Lighting Control",
    difficulty: "intermediate",
    topic: "Task Lighting",
    category: "Lighting"
  },
  {
    id: 72,
    question: "What is the purpose of 'pre-heat' in fluorescent dimming systems?",
    options: [
      "Reduce energy consumption",
      "Extend lamp life by warming filaments before ignition",
      "Increase brightness",
      "Change color temperature"
    ],
    correctAnswer: 1,
    explanation: "Pre-heat warms fluorescent lamp filaments before ignition, extending lamp life and ensuring reliable starting, especially in dimming applications.",
    section: "Lighting Control",
    difficulty: "advanced",
    topic: "Fluorescent Dimming",
    category: "Lighting"
  },
  {
    id: 73,
    question: "Which approach ensures smooth scene transitions?",
    options: [
      "Instant changes",
      "Gradual fade times appropriate to the context",
      "Random transition speeds",
      "No transitions"
    ],
    correctAnswer: 1,
    explanation: "Gradual fade times create smooth, professional-looking scene transitions that are comfortable for occupants and enhance the user experience.",
    section: "Lighting Control",
    difficulty: "basic",
    topic: "Scene Programming",
    category: "Lighting"
  },
  {
    id: 74,
    question: "What is 'zonal lighting control'?",
    options: [
      "Controlling lights by geographical zones",
      "Organizing lights into logical groups for coordinated control",
      "Temperature-based lighting",
      "Outdoor lighting only"
    ],
    correctAnswer: 1,
    explanation: "Zonal lighting control organizes lights into logical groups (zones) based on function or location, enabling coordinated control and scene programming.",
    section: "Lighting Control",
    difficulty: "intermediate",
    topic: "Zone Control",
    category: "Lighting"
  },
  {
    id: 75,
    question: "Which lighting control feature is most valuable for energy management?",
    options: [
      "Color changing capability",
      "Occupancy sensing with automatic shutoff",
      "Maximum brightness levels",
      "Multiple switch locations"
    ],
    correctAnswer: 1,
    explanation: "Occupancy sensing with automatic shutoff prevents lights from being left on in unoccupied spaces, providing significant energy savings.",
    section: "Lighting Control",
    difficulty: "basic",
    topic: "Energy Efficiency",
    category: "Lighting"
  },
  {
    id: 76,
    question: "What is 'tunable white' lighting technology?",
    options: [
      "Lights that can change between different white color temperatures",
      "Lights that change colors randomly",
      "Dimmable white lights only",
      "Lights with adjustable beam angles"
    ],
    correctAnswer: 0,
    explanation: "Tunable white lighting can adjust color temperature from warm (2700K) to cool (6500K) whites, supporting circadian rhythms and different activities.",
    section: "Lighting Control",
    difficulty: "intermediate",
    topic: "Tunable White",
    category: "Lighting"
  },
  {
    id: 77,
    question: "Which programming approach works best for entertainment lighting scenes?",
    options: [
      "Static lighting only",
      "Dynamic effects synchronized with content or music",
      "Random color changes",
      "Maximum brightness always"
    ],
    correctAnswer: 1,
    explanation: "Entertainment lighting scenes use dynamic effects synchronized with music, TV content, or other media to create immersive experiences.",
    section: "Lighting Control",
    difficulty: "intermediate",
    topic: "Entertainment Lighting",
    category: "Lighting"
  },
  {
    id: 78,
    question: "What is the recommended method for testing lighting scenes during commissioning?",
    options: [
      "Test during daytime only",
      "Test at different times of day and with various ambient conditions",
      "Test with all lights at maximum",
      "No testing required"
    ],
    correctAnswer: 1,
    explanation: "Testing scenes at different times of day and ambient conditions ensures they work correctly in all real-world situations the user will experience.",
    section: "Lighting Control",
    difficulty: "intermediate",
    topic: "Commissioning",
    category: "Installation"
  },
  {
    id: 79,
    question: "Which factor most affects the success of automated lighting scenes?",
    options: [
      "Equipment cost",
      "Understanding user habits and preferences",
      "Number of lights controlled",
      "Installation speed"
    ],
    correctAnswer: 1,
    explanation: "Understanding user habits and preferences is crucial for programming automated scenes that enhance rather than interfere with daily routines.",
    section: "Lighting Control",
    difficulty: "intermediate",
    topic: "User Experience",
    category: "Lighting"
  },
  {
    id: 80,
    question: "What is 'light pollution reduction' in outdoor smart lighting?",
    options: [
      "Using fewer outdoor lights",
      "Directing light downward and using appropriate timing",
      "Using colored lights only",
      "Installing lights higher up"
    ],
    correctAnswer: 1,
    explanation: "Light pollution reduction involves directing light where needed (typically downward), using appropriate timing, and minimizing unnecessary upward light spillage.",
    section: "Lighting Control",
    difficulty: "intermediate",
    topic: "Outdoor Lighting",
    category: "Lighting"
  },

  // HVAC and Environmental Control (25 questions)
  {
    id: 81,
    question: "What is the primary benefit of zoned HVAC control in smart homes?",
    options: [
      "Lower installation cost",
      "Individual temperature control for different areas",
      "Simpler maintenance",
      "Faster heating and cooling"
    ],
    correctAnswer: 1,
    explanation: "Zoned HVAC control allows different areas of the home to be heated or cooled independently, improving comfort and energy efficiency.",
    section: "HVAC Control",
    difficulty: "basic",
    topic: "Zone Control",
    category: "HVAC"
  },
  {
    id: 82,
    question: "Which sensor type is most important for smart thermostat operation?",
    options: [
      "Light sensor",
      "Temperature and humidity sensors",
      "Motion sensor only",
      "Sound sensor"
    ],
    correctAnswer: 1,
    explanation: "Temperature and humidity sensors are essential for smart thermostats to accurately monitor conditions and make appropriate adjustments.",
    section: "HVAC Control",
    difficulty: "basic",
    topic: "Sensors",
    category: "HVAC"
  },
  {
    id: 83,
    question: "What is 'thermal mass' and how does it affect smart HVAC control?",
    options: [
      "Weight of HVAC equipment",
      "Building's ability to store and release thermal energy",
      "Temperature sensor accuracy",
      "Air circulation rate"
    ],
    correctAnswer: 1,
    explanation: "Thermal mass is the building's ability to store and release thermal energy, affecting how quickly temperatures change and influencing smart HVAC scheduling.",
    section: "HVAC Control",
    difficulty: "advanced",
    topic: "Building Science",
    category: "HVAC"
  },
  {
    id: 84,
    question: "Which approach provides the most energy-efficient HVAC operation?",
    options: [
      "Maintaining constant temperature",
      "Adaptive scheduling based on occupancy and weather",
      "Maximum heating and cooling",
      "Manual control only"
    ],
    correctAnswer: 1,
    explanation: "Adaptive scheduling that considers occupancy patterns, weather forecasts, and thermal mass provides optimal energy efficiency.",
    section: "HVAC Control",
    difficulty: "intermediate",
    topic: "Energy Efficiency",
    category: "HVAC"
  },
  {
    id: 85,
    question: "What is 'demand response' in smart HVAC systems?",
    options: [
      "Faster temperature changes",
      "Automatically reducing energy usage during peak demand periods",
      "Increasing ventilation rates",
      "Emergency heating modes"
    ],
    correctAnswer: 1,
    explanation: "Demand response automatically reduces HVAC energy consumption during utility peak demand periods, often providing financial incentives to users.",
    section: "HVAC Control",
    difficulty: "intermediate",
    topic: "Demand Response",
    category: "HVAC"
  },
  {
    id: 86,
    question: "Which factor most affects the accuracy of smart thermostat temperature control?",
    options: [
      "Thermostat brand",
      "Sensor location and air circulation",
      "Wi-Fi signal strength",
      "App interface design"
    ],
    correctAnswer: 1,
    explanation: "Sensor location away from heat sources and good air circulation around sensors are critical for accurate temperature measurement and control.",
    section: "HVAC Control",
    difficulty: "intermediate",
    topic: "Sensor Placement",
    category: "HVAC"
  },
  {
    id: 87,
    question: "What is 'pre-conditioning' in smart HVAC systems?",
    options: [
      "Cleaning air filters",
      "Adjusting temperature before occupancy based on schedule",
      "Testing system operation",
      "Seasonal maintenance"
    ],
    correctAnswer: 1,
    explanation: "Pre-conditioning starts heating or cooling before scheduled occupancy times to ensure comfort when residents arrive while optimizing energy use.",
    section: "HVAC Control",
    difficulty: "intermediate",
    topic: "Scheduling",
    category: "HVAC"
  },
  {
    id: 88,
    question: "Which ventilation strategy is most effective for indoor air quality?",
    options: [
      "Continuous high-speed ventilation",
      "Demand-controlled ventilation based on occupancy and air quality",
      "No mechanical ventilation",
      "Random ventilation cycles"
    ],
    correctAnswer: 1,
    explanation: "Demand-controlled ventilation uses occupancy and air quality sensors to provide fresh air when needed while minimizing energy consumption.",
    section: "HVAC Control",
    difficulty: "intermediate",
    topic: "Ventilation",
    category: "HVAC"
  },
  {
    id: 89,
    question: "What is 'humidity control' important for in smart homes?",
    options: [
      "Comfort and preventing mold/mildew growth",
      "Reducing electricity consumption only",
      "Improving Wi-Fi signals",
      "Enhancing lighting quality"
    ],
    correctAnswer: 0,
    explanation: "Proper humidity control (typically 30-50% RH) ensures comfort and prevents mold/mildew growth, which can cause health issues and property damage.",
    section: "HVAC Control",
    difficulty: "basic",
    topic: "Humidity Control",
    category: "HVAC"
  },
  {
    id: 90,
    question: "Which HVAC control method provides the fastest response to temperature changes?",
    options: [
      "Central thermostat only",
      "Distributed sensors with zone control",
      "Manual adjustment",
      "Outdoor temperature-based control"
    ],
    correctAnswer: 1,
    explanation: "Distributed sensors throughout different zones provide faster, more accurate response to local temperature changes compared to single central sensors.",
    section: "HVAC Control",
    difficulty: "intermediate",
    topic: "Zone Control",
    category: "HVAC"
  },
  {
    id: 91,
    question: "What is 'economizer mode' in smart HVAC systems?",
    options: [
      "Using outdoor air for cooling when conditions are favorable",
      "Reducing system capacity",
      "Operating at minimum power",
      "Emergency operation mode"
    ],
    correctAnswer: 0,
    explanation: "Economizer mode uses outdoor air for cooling when outdoor temperatures and humidity are favorable, reducing mechanical cooling energy use.",
    section: "HVAC Control",
    difficulty: "intermediate",
    topic: "Energy Efficiency",
    category: "HVAC"
  },
  {
    id: 92,
    question: "Which approach optimizes both comfort and energy efficiency in smart HVAC?",
    options: [
      "Highest possible settings",
      "Learning algorithms that adapt to occupant behavior",
      "Fixed schedules only",
      "Random temperature adjustments"
    ],
    correctAnswer: 1,
    explanation: "Learning algorithms analyze occupant behavior patterns and preferences to optimize both comfort and energy efficiency automatically.",
    section: "HVAC Control",
    difficulty: "intermediate",
    topic: "AI Learning",
    category: "HVAC"
  },
  {
    id: 93,
    question: "What is the purpose of 'duct pressure monitoring' in smart HVAC?",
    options: [
      "Detecting leaks and optimizing airflow distribution",
      "Measuring outdoor air quality",
      "Controlling humidity levels",
      "Monitoring electrical consumption"
    ],
    correctAnswer: 0,
    explanation: "Duct pressure monitoring helps detect leaks, blockages, and ensures proper airflow distribution throughout the HVAC system.",
    section: "HVAC Control",
    difficulty: "advanced",
    topic: "System Monitoring",
    category: "HVAC"
  },
  {
    id: 94,
    question: "Which integration provides the most value in smart environmental control?",
    options: [
      "Weather forecasting data",
      "Social media connections",
      "Entertainment systems",
      "Kitchen appliances only"
    ],
    correctAnswer: 0,
    explanation: "Weather forecasting integration allows HVAC systems to prepare for weather changes, optimizing energy use and maintaining comfort proactively.",
    section: "HVAC Control",
    difficulty: "intermediate",
    topic: "Integration",
    category: "HVAC"
  },
  {
    id: 95,
    question: "What is 'thermal comfort modeling' in smart HVAC systems?",
    options: [
      "3D modeling of ductwork",
      "Calculating optimal temperature and humidity for human comfort",
      "Designing equipment layouts",
      "Measuring air velocity"
    ],
    correctAnswer: 1,
    explanation: "Thermal comfort modeling considers factors like temperature, humidity, air movement, and radiant heat to determine optimal conditions for human comfort.",
    section: "HVAC Control",
    difficulty: "advanced",
    topic: "Comfort Modeling",
    category: "HVAC"
  },
  {
    id: 96,
    question: "Which maintenance feature is most valuable in smart HVAC systems?",
    options: [
      "Predictive maintenance alerts based on system performance",
      "Annual service reminders only",
      "Equipment warranty information",
      "User manual access"
    ],
    correctAnswer: 0,
    explanation: "Predictive maintenance uses system data to identify potential issues before they cause failures, reducing downtime and repair costs.",
    section: "HVAC Control",
    difficulty: "intermediate",
    topic: "Maintenance",
    category: "Maintenance"
  },
  {
    id: 97,
    question: "What is 'load shifting' in smart HVAC energy management?",
    options: [
      "Moving equipment to different locations",
      "Shifting energy consumption to off-peak hours",
      "Changing refrigerant types",
      "Adjusting ductwork"
    ],
    correctAnswer: 1,
    explanation: "Load shifting moves HVAC energy consumption to off-peak hours when electricity rates are lower, reducing operating costs.",
    section: "HVAC Control",
    difficulty: "intermediate",
    topic: "Energy Management",
    category: "HVAC"
  },
  {
    id: 98,
    question: "Which approach provides the best indoor air quality monitoring?",
    options: [
      "Temperature sensors only",
      "Multi-parameter sensors (CO2, VOCs, particulates, humidity)",
      "Visual inspection only",
      "Outdoor air quality data only"
    ],
    correctAnswer: 1,
    explanation: "Multi-parameter sensors monitoring CO2, VOCs, particulates, and humidity provide comprehensive indoor air quality assessment.",
    section: "HVAC Control",
    difficulty: "intermediate",
    topic: "Air Quality",
    category: "HVAC"
  },
  {
    id: 99,
    question: "What is 'smart recovery' in thermostat programming?",
    options: [
      "Backup power systems",
      "Calculating optimal start times to reach target temperatures",
      "Error correction algorithms",
      "System restart procedures"
    ],
    correctAnswer: 1,
    explanation: "Smart recovery calculates when to start heating or cooling to reach target temperatures at scheduled times, considering building characteristics.",
    section: "HVAC Control",
    difficulty: "intermediate",
    topic: "Scheduling",
    category: "HVAC"
  },
  {
    id: 100,
    question: "Which factor is most critical for successful smart HVAC zoning?",
    options: [
      "Proper zone design based on building layout and usage",
      "Using expensive equipment",
      "Maximum number of zones",
      "Identical zone sizes"
    ],
    correctAnswer: 0,
    explanation: "Proper zone design considering building layout, solar exposure, and usage patterns is crucial for effective zoned HVAC control.",
    section: "HVAC Control",
    difficulty: "intermediate",
    topic: "Zone Design",
    category: "HVAC"
  },
  {
    id: 101,
    question: "What is 'adaptive comfort' in smart environmental control?",
    options: [
      "Automatically adjusting comfort settings based on occupant feedback and behavior",
      "Using the same temperature always",
      "Manual comfort adjustments",
      "Seasonal temperature changes only"
    ],
    correctAnswer: 0,
    explanation: "Adaptive comfort automatically adjusts environmental settings based on occupant feedback, behavior patterns, and external conditions.",
    section: "HVAC Control",
    difficulty: "intermediate",
    topic: "Adaptive Control",
    category: "HVAC"
  },
  {
    id: 102,
    question: "Which approach minimizes HVAC energy consumption during unoccupied periods?",
    options: [
      "Turning systems completely off",
      "Intelligent setback with optimal recovery scheduling",
      "Maintaining normal temperatures",
      "Random temperature adjustments"
    ],
    correctAnswer: 1,
    explanation: "Intelligent setback reduces heating/cooling during unoccupied periods while ensuring comfortable conditions when residents return.",
    section: "HVAC Control",
    difficulty: "intermediate",
    topic: "Energy Efficiency",
    category: "HVAC"
  },
  {
    id: 103,
    question: "What is the role of 'thermal bridging' in smart home environmental control?",
    options: [
      "Connecting HVAC zones",
      "Areas of heat transfer that bypass insulation",
      "Electrical connections",
      "Ventilation pathways"
    ],
    correctAnswer: 1,
    explanation: "Thermal bridging creates areas where heat bypasses insulation, affecting HVAC efficiency and requiring consideration in smart control strategies.",
    section: "HVAC Control",
    difficulty: "advanced",
    topic: "Building Science",
    category: "HVAC"
  },
  {
    id: 104,
    question: "Which integration enhances smart HVAC security system coordination?",
    options: [
      "Adjusting environmental settings based on security system status",
      "Sharing user passwords",
      "Using same wireless channels",
      "Identical control interfaces"
    ],
    correctAnswer: 0,
    explanation: "Coordinating HVAC with security systems allows energy-saving setbacks when the system is armed and normal operation when disarmed.",
    section: "HVAC Control",
    difficulty: "intermediate",
    topic: "Integration",
    category: "HVAC"
  },
  {
    id: 105,
    question: "What is 'radiant comfort' in smart environmental systems?",
    options: [
      "Lighting comfort only",
      "Comfort from radiant heating/cooling surfaces",
      "Solar heat gain management",
      "Equipment radiation shielding"
    ],
    correctAnswer: 1,
    explanation: "Radiant comfort considers heat transfer to/from surfaces like radiant floors or ceiling panels, which significantly affects human thermal comfort.",
    section: "HVAC Control",
    difficulty: "advanced",
    topic: "Radiant Systems",
    category: "HVAC"
  },

  // Security and Access Control (25 questions)
  {
    id: 106,
    question: "What is the primary security advantage of smart locks over traditional locks?",
    options: [
      "Mechanical strength",
      "Access logging and remote control capabilities",
      "Lower cost",
      "Simpler installation"
    ],
    correctAnswer: 1,
    explanation: "Smart locks provide access logging, remote control, temporary access codes, and integration with other security systems, enhancing overall security.",
    section: "Security & Access Control",
    difficulty: "basic",
    topic: "Smart Locks",
    category: "Security"
  },
  {
    id: 107,
    question: "Which authentication method provides the highest security for smart home access?",
    options: [
      "PIN codes only",
      "Multi-factor authentication (biometrics + PIN/card)",
      "Key fobs only",
      "Voice recognition only"
    ],
    correctAnswer: 1,
    explanation: "Multi-factor authentication combining biometrics with PIN codes or cards provides the highest security by requiring multiple forms of verification.",
    section: "Security & Access Control",
    difficulty: "intermediate",
    topic: "Authentication",
    category: "Security"
  },
  {
    id: 108,
    question: "What is 'geofencing' used for in smart home security?",
    options: [
      "Physical perimeter barriers",
      "Automatic arming/disarming based on location",
      "Wireless signal encryption",
      "Camera motion detection"
    ],
    correctAnswer: 1,
    explanation: "Geofencing automatically arms or disarms security systems based on residents' smartphone locations, providing convenience and security.",
    section: "Security & Access Control",
    difficulty: "intermediate",
    topic: "Geofencing",
    category: "Security"
  },
  {
    id: 109,
    question: "Which approach provides the most comprehensive smart home security monitoring?",
    options: [
      "Cameras only",
      "Layered security with multiple sensor types and monitoring",
      "Door sensors only",
      "Motion detectors only"
    ],
    correctAnswer: 1,
    explanation: "Layered security using multiple sensor types (door/window, motion, cameras, glass break, etc.) provides comprehensive coverage and reduces false alarms.",
    section: "Security & Access Control",
    difficulty: "intermediate",
    topic: "Security Design",
    category: "Security"
  },
  {
    id: 110,
    question: "What is the purpose of 'tamper detection' in smart security devices?",
    options: [
      "Preventing unauthorized access or disabling of security devices",
      "Detecting environmental changes",
      "Monitoring battery levels",
      "Testing device functionality"
    ],
    correctAnswer: 0,
    explanation: "Tamper detection alerts when someone attempts to disable, remove, or interfere with security devices, maintaining system integrity.",
    section: "Security & Access Control",
    difficulty: "intermediate",
    topic: "Tamper Protection",
    category: "Security"
  },
  {
    id: 111,
    question: "Which video surveillance approach provides the best privacy protection?",
    options: [
      "Cloud storage only",
      "Local storage with encrypted remote access",
      "Public streaming",
      "No encryption"
    ],
    correctAnswer: 1,
    explanation: "Local storage with encrypted remote access keeps video data under user control while providing secure remote viewing capabilities.",
    section: "Security & Access Control",
    difficulty: "intermediate",
    topic: "Video Surveillance",
    category: "Security"
  },
  {
    id: 112,
    question: "What is 'behavioral analytics' in smart security systems?",
    options: [
      "Analyzing user interface interactions",
      "Learning normal patterns to identify anomalies",
      "Measuring system performance",
      "Tracking energy consumption"
    ],
    correctAnswer: 1,
    explanation: "Behavioral analytics learns normal household patterns and identifies unusual activities that may indicate security threats.",
    section: "Security & Access Control",
    difficulty: "advanced",
    topic: "Analytics",
    category: "Security"
  },
  {
    id: 113,
    question: "Which integration enhances smart door lock security?",
    options: [
      "Video doorbell and camera verification",
      "Light bulb connections",
      "Music system integration",
      "Thermostat coordination"
    ],
    correctAnswer: 0,
    explanation: "Video doorbells and camera verification provide visual confirmation of who is requesting access, enhancing smart lock security.",
    section: "Security & Access Control",
    difficulty: "basic",
    topic: "Integration",
    category: "Security"
  },
  {
    id: 114,
    question: "What is 'panic mode' in smart security systems?",
    options: [
      "System malfunction state",
      "Emergency activation that triggers all alarms and notifications",
      "Low battery warning",
      "Maintenance mode"
    ],
    correctAnswer: 1,
    explanation: "Panic mode provides instant emergency activation of all alarms, lighting, and notifications to deter intruders and alert authorities.",
    section: "Security & Access Control",
    difficulty: "basic",
    topic: "Emergency Features",
    category: "Security"
  },
  {
    id: 115,
    question: "Which approach provides the most reliable smart home security communication?",
    options: [
      "Wi-Fi only",
      "Multiple communication paths (cellular, Wi-Fi, landline)",
      "Bluetooth only",
      "Infrared only"
    ],
    correctAnswer: 1,
    explanation: "Multiple communication paths ensure security systems can still send alerts even if primary communication methods are compromised.",
    section: "Security & Access Control",
    difficulty: "intermediate",
    topic: "Communication",
    category: "Security"
  },
  {
    id: 116,
    question: "What is 'duress code' functionality in smart access control?",
    options: [
      "Emergency code that silently alerts authorities while appearing to disarm",
      "Master override code",
      "Temporary access code",
      "Administrator password"
    ],
    correctAnswer: 0,
    explanation: "A duress code appears to disarm the system normally but silently alerts authorities, providing protection during forced entry situations.",
    section: "Security & Access Control",
    difficulty: "advanced",
    topic: "Access Codes",
    category: "Security"
  },
  {
    id: 117,
    question: "Which sensor placement provides optimal perimeter security detection?",
    options: [
      "Interior rooms only",
      "All entry points plus strategic interior backup sensors",
      "Random locations",
      "Outdoor areas only"
    ],
    correctAnswer: 1,
    explanation: "Covering all entry points with strategic interior backup sensors provides comprehensive perimeter protection and early warning.",
    section: "Security & Access Control",
    difficulty: "intermediate",
    topic: "Sensor Placement",
    category: "Security"
  },
  {
    id: 118,
    question: "What is 'false alarm reduction' important for in smart security?",
    options: [
      "Preventing emergency response fatigue and maintaining system credibility",
      "Reducing system costs",
      "Simplifying installation",
      "Improving aesthetics"
    ],
    correctAnswer: 0,
    explanation: "False alarm reduction prevents emergency response fatigue, maintains system credibility, and often avoids false alarm fines.",
    section: "Security & Access Control",
    difficulty: "intermediate",
    topic: "False Alarms",
    category: "Security"
  },
  {
    id: 119,
    question: "Which approach provides the best smart security system backup power?",
    options: [
      "No backup needed",
      "Battery backup with monitoring and low-battery alerts",
      "Manual generators only",
      "Solar panels only"
    ],
    correctAnswer: 1,
    explanation: "Battery backup systems with monitoring ensure security systems remain operational during power outages, with alerts when backup power is low.",
    section: "Security & Access Control",
    difficulty: "intermediate",
    topic: "Backup Power",
    category: "Security"
  },
  {
    id: 120,
    question: "What is 'security system partitioning'?",
    options: [
      "Physical separation of devices",
      "Dividing the system into independently controllable areas",
      "Electrical isolation",
      "Device categorization only"
    ],
    correctAnswer: 1,
    explanation: "Security system partitioning allows different areas of the home to be armed/disarmed independently, providing flexible security control.",
    section: "Security & Access Control",
    difficulty: "intermediate",
    topic: "System Design",
    category: "Security"
  },
  {
    id: 121,
    question: "Which integration enhances smart security with lighting systems?",
    options: [
      "Automatic lighting activation during security events for deterrence",
      "Color coordination only",
      "Energy sharing",
      "Installation simplification"
    ],
    correctAnswer: 0,
    explanation: "Security-triggered lighting activation deters intruders, aids emergency response, and helps residents during security events.",
    section: "Security & Access Control",
    difficulty: "basic",
    topic: "Integration",
    category: "Security"
  },
  {
    id: 122,
    question: "What is 'access scheduling' in smart lock systems?",
    options: [
      "Maintenance timing",
      "Allowing access only during specified time periods",
      "Installation scheduling",
      "Battery replacement timing"
    ],
    correctAnswer: 1,
    explanation: "Access scheduling allows smart locks to grant access only during specified times, useful for service personnel, cleaners, or temporary guests.",
    section: "Security & Access Control",
    difficulty: "basic",
    topic: "Access Control",
    category: "Security"
  },
  {
    id: 123,
    question: "Which approach provides optimal smart camera privacy protection?",
    options: [
      "Always recording everything",
      "Privacy modes with scheduled/triggered recording",
      "No privacy controls",
      "External storage only"
    ],
    correctAnswer: 1,
    explanation: "Privacy modes allow users to disable recording when home while maintaining security when away, balancing security and privacy.",
    section: "Security & Access Control",
    difficulty: "intermediate",
    topic: "Privacy",
    category: "Security"
  },
  {
    id: 124,
    question: "What is 'security system health monitoring'?",
    options: [
      "User health tracking",
      "Continuous monitoring of system components and communication",
      "Environmental monitoring only",
      "Energy consumption tracking"
    ],
    correctAnswer: 1,
    explanation: "Security system health monitoring continuously checks all components, communication paths, and system integrity to ensure reliable operation.",
    section: "Security & Access Control",
    difficulty: "intermediate",
    topic: "System Monitoring",
    category: "Security"
  },
  {
    id: 125,
    question: "Which factor most affects smart security system reliability?",
    options: [
      "Device brand only",
      "Proper installation, testing, and maintenance procedures",
      "Initial cost",
      "Number of devices"
    ],
    correctAnswer: 1,
    explanation: "Proper installation, regular testing, and maintenance procedures are crucial for ensuring smart security systems operate reliably when needed.",
    section: "Security & Access Control",
    difficulty: "intermediate",
    topic: "Reliability",
    category: "Security"
  },
  {
    id: 126,
    question: "What is 'intrusion verification' in smart security systems?",
    options: [
      "System installation verification",
      "Using multiple sensors or methods to confirm actual intrusions",
      "User identity verification",
      "Device authentication"
    ],
    correctAnswer: 1,
    explanation: "Intrusion verification uses multiple sensors or confirmation methods to distinguish actual intrusions from false alarms before alerting authorities.",
    section: "Security & Access Control",
    difficulty: "intermediate",
    topic: "Verification",
    category: "Security"
  },
  {
    id: 127,
    question: "Which approach optimizes smart security system battery life?",
    options: [
      "Continuous high-power operation",
      "Intelligent power management with sleep modes",
      "Disabling devices when not needed",
      "Using maximum transmission power always"
    ],
    correctAnswer: 1,
    explanation: "Intelligent power management allows devices to enter sleep modes when inactive while ensuring rapid response when security events occur.",
    section: "Security & Access Control",
    difficulty: "intermediate",
    topic: "Power Management",
    category: "Security"
  },
  {
    id: 128,
    question: "What is 'security automation' in smart homes?",
    options: [
      "Automatic system updates",
      "Automated responses to security events (lighting, cameras, alerts)",
      "Self-installation capabilities",
      "Automatic device replacement"
    ],
    correctAnswer: 1,
    explanation: "Security automation triggers coordinated responses to security events, such as activating lights, cameras, sirens, and sending notifications.",
    section: "Security & Access Control",
    difficulty: "intermediate",
    topic: "Automation",
    category: "Security"
  },
  {
    id: 129,
    question: "Which integration provides the most value for smart home security?",
    options: [
      "Entertainment system coordination",
      "HVAC and lighting integration for occupancy simulation",
      "Kitchen appliance monitoring",
      "Music synchronization"
    ],
    correctAnswer: 1,
    explanation: "HVAC and lighting integration can simulate occupancy when away, deterring intruders by making the home appear occupied.",
    section: "Security & Access Control",
    difficulty: "intermediate",
    topic: "Integration",
    category: "Security"
  },
  {
    id: 130,
    question: "What is the most important consideration for smart security system cybersecurity?",
    options: [
      "Device color coordination",
      "Strong encryption, regular updates, and network segmentation",
      "Maximum wireless range",
      "Fastest processing speed"
    ],
    correctAnswer: 1,
    explanation: "Strong encryption, regular firmware updates, and network segmentation protect smart security systems from cyber attacks and unauthorized access.",
    section: "Security & Access Control",
    difficulty: "intermediate",
    topic: "Cybersecurity",
    category: "Security"
  },

  // Hubs and Voice Assistants (25 questions)
  {
    id: 131,
    question: "What is the primary function of a smart home hub?",
    options: [
      "Providing internet connectivity",
      "Acting as a central controller and protocol translator",
      "Storing data only",
      "Playing music"
    ],
    correctAnswer: 1,
    explanation: "A smart home hub acts as a central controller that can communicate with devices using different protocols and coordinate their operation.",
    section: "Hubs & Voice Assistants",
    difficulty: "basic",
    topic: "Hub Functions",
    category: "Hubs"
  },
  {
    id: 132,
    question: "Which advantage do local smart home hubs provide over cloud-only systems?",
    options: [
      "Lower cost",
      "Continued operation during internet outages",
      "Better aesthetics",
      "Simpler setup"
    ],
    correctAnswer: 1,
    explanation: "Local hubs can continue controlling devices and executing automations even when internet connectivity is lost, ensuring system reliability.",
    section: "Hubs & Voice Assistants",
    difficulty: "intermediate",
    topic: "Local Processing",
    category: "Hubs"
  },
  {
    id: 133,
    question: "What is 'protocol bridging' in smart home hubs?",
    options: [
      "Physical bridge connections",
      "Translating between different communication protocols",
      "Network security",
      "Power distribution"
    ],
    correctAnswer: 1,
    explanation: "Protocol bridging allows hubs to translate communications between different protocols (Zigbee, Z-Wave, Wi-Fi, etc.) so diverse devices can work together.",
    section: "Hubs & Voice Assistants",
    difficulty: "intermediate",
    topic: "Protocol Bridging",
    category: "Hubs"
  },
  {
    id: 134,
    question: "Which voice assistant feature is most useful for accessibility?",
    options: [
      "Music playback",
      "Hands-free device control for mobility-limited users",
      "Weather reports",
      "Entertainment information"
    ],
    correctAnswer: 1,
    explanation: "Hands-free voice control enables people with mobility limitations to control their environment easily, significantly improving accessibility.",
    section: "Hubs & Voice Assistants",
    difficulty: "basic",
    topic: "Accessibility",
    category: "Voice Assistants"
  },
  {
    id: 135,
    question: "What is 'edge processing' in smart home hubs?",
    options: [
      "Processing at the network edge/locally rather than in the cloud",
      "Sharp edge design",
      "Outdoor processing",
      "Error processing"
    ],
    correctAnswer: 0,
    explanation: "Edge processing handles automation logic and device control locally on the hub, reducing latency and improving privacy and reliability.",
    section: "Hubs & Voice Assistants",
    difficulty: "intermediate",
    topic: "Edge Processing",
    category: "Hubs"
  },
  {
    id: 136,
    question: "Which approach provides the best voice assistant privacy protection?",
    options: [
      "Always listening mode",
      "Local processing with opt-in cloud features",
      "Continuous cloud recording",
      "No privacy controls"
    ],
    correctAnswer: 1,
    explanation: "Local processing for basic commands with optional cloud features provides privacy control while maintaining functionality.",
    section: "Hubs & Voice Assistants",
    difficulty: "intermediate",
    topic: "Privacy",
    category: "Voice Assistants"
  },
  {
    id: 137,
    question: "What is 'wake word' technology in voice assistants?",
    options: [
      "Morning alarm functions",
      "Activation phrase recognition that starts voice processing",
      "Sleep mode settings",
      "Audio quality enhancement"
    ],
    correctAnswer: 1,
    explanation: "Wake words are specific phrases (like 'Alexa' or 'Hey Google') that activate voice assistants to start processing subsequent commands.",
    section: "Hubs & Voice Assistants",
    difficulty: "basic",
    topic: "Wake Words",
    category: "Voice Assistants"
  },
  {
    id: 138,
    question: "Which hub feature is most important for system scalability?",
    options: [
      "Physical size",
      "Device capacity and processing power",
      "Color options",
      "Brand recognition"
    ],
    correctAnswer: 1,
    explanation: "Device capacity and processing power determine how many devices the hub can manage and how complex automations it can execute effectively.",
    section: "Hubs & Voice Assistants",
    difficulty: "intermediate",
    topic: "Scalability",
    category: "Hubs"
  },
  {
    id: 139,
    question: "What is 'natural language processing' in voice assistants?",
    options: [
      "Speaking in foreign languages",
      "Understanding and interpreting human speech patterns and intent",
      "Language translation only",
      "Voice volume control"
    ],
    correctAnswer: 1,
    explanation: "Natural language processing enables voice assistants to understand conversational speech, context, and intent rather than requiring rigid command phrases.",
    section: "Hubs & Voice Assistants",
    difficulty: "intermediate",
    topic: "NLP",
    category: "Voice Assistants"
  },
  {
    id: 140,
    question: "Which integration approach works best for hub and voice assistant coordination?",
    options: [
      "Separate operation only",
      "Unified control with voice commands executing hub automations",
      "Competition between systems",
      "Identical functionality duplication"
    ],
    correctAnswer: 1,
    explanation: "Unified control allows voice commands to trigger complex hub automations, providing natural language control of sophisticated smart home scenarios.",
    section: "Hubs & Voice Assistants",
    difficulty: "intermediate",
    topic: "Integration",
    category: "Hubs"
  },
  {
    id: 141,
    question: "What is 'contextual awareness' in smart home voice assistants?",
    options: [
      "Knowing the current time only",
      "Understanding environmental context and user habits for relevant responses",
      "Location tracking only",
      "Device status awareness only"
    ],
    correctAnswer: 1,
    explanation: "Contextual awareness allows voice assistants to provide more relevant responses by understanding current conditions, time, location, and user patterns.",
    section: "Hubs & Voice Assistants",
    difficulty: "intermediate",
    topic: "Contextual Awareness",
    category: "Voice Assistants"
  },
  {
    id: 142,
    question: "Which hub deployment strategy provides optimal reliability?",
    options: [
      "Single hub for entire home",
      "Redundant hubs with backup capabilities",
      "No central hub",
      "Cloud-only control"
    ],
    correctAnswer: 1,
    explanation: "Redundant hub deployment with backup capabilities ensures system continues operating if the primary hub fails.",
    section: "Hubs & Voice Assistants",
    difficulty: "advanced",
    topic: "Redundancy",
    category: "Hubs"
  },
  {
    id: 143,
    question: "What is 'skill development' in voice assistant ecosystems?",
    options: [
      "User training programs",
      "Creating custom voice commands and integrations",
      "Hardware assembly",
      "Network configuration"
    ],
    correctAnswer: 1,
    explanation: "Skill development creates custom voice commands and integrations that extend voice assistant capabilities for specific smart home functions.",
    section: "Hubs & Voice Assistants",
    difficulty: "intermediate",
    topic: "Skills",
    category: "Voice Assistants"
  },
  {
    id: 144,
    question: "Which approach provides the best hub user interface experience?",
    options: [
      "Complex technical interfaces",
      "Intuitive mobile apps with logical organization",
      "Command line only",
      "No user interface"
    ],
    correctAnswer: 1,
    explanation: "Intuitive mobile apps with logical organization make it easy for users to monitor, control, and configure their smart home systems.",
    section: "Hubs & Voice Assistants",
    difficulty: "basic",
    topic: "User Interface",
    category: "Hubs"
  },
  {
    id: 145,
    question: "What is 'multi-room audio' coordination through smart hubs?",
    options: [
      "Single speaker systems",
      "Synchronized audio playback across multiple rooms/devices",
      "Volume control only",
      "Individual room isolation"
    ],
    correctAnswer: 1,
    explanation: "Multi-room audio coordination allows synchronized music playback across multiple rooms and independent control of each zone.",
    section: "Hubs & Voice Assistants",
    difficulty: "basic",
    topic: "Multi-Room Audio",
    category: "Hubs"
  },
  {
    id: 146,
    question: "Which factor most affects voice recognition accuracy?",
    options: [
      "Room color scheme",
      "Background noise levels and microphone placement",
      "Time of day",
      "User age only"
    ],
    correctAnswer: 1,
    explanation: "Background noise and microphone placement significantly impact voice recognition accuracy - quiet environments with well-positioned microphones work best.",
    section: "Hubs & Voice Assistants",
    difficulty: "intermediate",
    topic: "Voice Recognition",
    category: "Voice Assistants"
  },
  {
    id: 147,
    question: "What is 'routine automation' in voice assistant integration?",
    options: [
      "Daily maintenance tasks",
      "Triggering multiple actions with single voice commands",
      "Cleaning schedules",
      "Update procedures"
    ],
    correctAnswer: 1,
    explanation: "Routine automation allows single voice commands to trigger complex sequences of actions across multiple smart home devices.",
    section: "Hubs & Voice Assistants",
    difficulty: "intermediate",
    topic: "Routines",
    category: "Voice Assistants"
  },
  {
    id: 148,
    question: "Which hub feature provides the most troubleshooting value?",
    options: [
      "Colorful status lights",
      "Comprehensive logging and diagnostic capabilities",
      "Compact size",
      "Multiple color options"
    ],
    correctAnswer: 1,
    explanation: "Comprehensive logging and diagnostics help identify issues quickly, reducing troubleshooting time and improving system reliability.",
    section: "Hubs & Voice Assistants",
    difficulty: "intermediate",
    topic: "Diagnostics",
    category: "Hubs"
  },
  {
    id: 149,
    question: "What is 'voice profile recognition' in smart assistants?",
    options: [
      "Voice volume adjustment",
      "Identifying individual users for personalized responses",
      "Audio quality settings",
      "Language selection"
    ],
    correctAnswer: 1,
    explanation: "Voice profile recognition identifies different household members and provides personalized responses, calendars, preferences, and access controls.",
    section: "Hubs & Voice Assistants",
    difficulty: "intermediate",
    topic: "Voice Profiles",
    category: "Voice Assistants"
  },
  {
    id: 150,
    question: "Which approach ensures optimal hub performance over time?",
    options: [
      "Never updating software",
      "Regular updates, monitoring, and periodic restarts",
      "Continuous maximum processing",
      "Ignoring performance metrics"
    ],
    correctAnswer: 1,
    explanation: "Regular updates, performance monitoring, and periodic restarts maintain optimal hub operation and incorporate security patches and new features.",
    section: "Hubs & Voice Assistants",
    difficulty: "basic",
    topic: "Maintenance",
    category: "Maintenance"
  },
  {
    id: 151,
    question: "What is 'intercom functionality' in smart speaker systems?",
    options: [
      "Internet communication only",
      "Room-to-room communication within the home",
      "External phone calls",
      "Radio broadcasting"
    ],
    correctAnswer: 1,
    explanation: "Intercom functionality allows household members to communicate between rooms using smart speakers, useful for large homes or calling family to meals.",
    section: "Hubs & Voice Assistants",
    difficulty: "basic",
    topic: "Intercom",
    category: "Voice Assistants"
  },
  {
    id: 152,
    question: "Which security consideration is most important for smart hubs?",
    options: [
      "Physical locks only",
      "Network security, encryption, and access controls",
      "Color coding",
      "Size restrictions"
    ],
    correctAnswer: 1,
    explanation: "Network security, encryption, and access controls protect the hub and connected devices from cyber threats and unauthorized access.",
    section: "Hubs & Voice Assistants",
    difficulty: "intermediate",
    topic: "Security",
    category: "Security"
  },
  {
    id: 153,
    question: "What is 'federation' in smart home hub networks?",
    options: [
      "Government regulation",
      "Connecting multiple hubs to work together",
      "Device manufacturing standards",
      "Installation certification"
    ],
    correctAnswer: 1,
    explanation: "Hub federation allows multiple hubs to work together, extending system capacity and enabling complex multi-hub automations.",
    section: "Hubs & Voice Assistants",
    difficulty: "advanced",
    topic: "Federation",
    category: "Hubs"
  },
  {
    id: 154,
    question: "Which voice assistant deployment provides the best coverage?",
    options: [
      "Single central device",
      "Distributed devices throughout the home with coordinated responses",
      "Outdoor devices only",
      "Bathroom installation only"
    ],
    correctAnswer: 1,
    explanation: "Distributed voice assistants throughout the home provide better coverage and natural interaction from any room while coordinating responses.",
    section: "Hubs & Voice Assistants",
    difficulty: "intermediate",
    topic: "Deployment",
    category: "Voice Assistants"
  },
  {
    id: 155,
    question: "What is the most important consideration for voice assistant placement?",
    options: [
      "Aesthetic appearance only",
      "Acoustic environment and central location for optimal voice pickup",
      "Electrical outlet proximity only",
      "Color coordination"
    ],
    correctAnswer: 1,
    explanation: "Acoustic environment (minimal echo, background noise) and central location ensure optimal voice pickup and response from throughout the room.",
    section: "Hubs & Voice Assistants",
    difficulty: "intermediate",
    topic: "Placement",
    category: "Voice Assistants"
  },

  // Installation and Safety (25 questions)
  {
    id: 156,
    question: "According to BS 7671, what must be completed before energizing any new electrical installation?",
    options: [
      "User training only",
      "Initial verification including inspection and testing",
      "Warranty registration",
      "Marketing materials review"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 requires complete initial verification including visual inspection and electrical testing before any new installation can be energized.",
    section: "Installation & Safety",
    difficulty: "intermediate",
    topic: "BS 7671 Requirements",
    category: "Installation"
  },
  {
    id: 157,
    question: "Which safety consideration is most critical when installing smart home devices?",
    options: [
      "Device aesthetics",
      "Electrical isolation and safe working practices",
      "Installation speed",
      "Cost minimization"
    ],
    correctAnswer: 1,
    explanation: "Electrical isolation and safe working practices are critical to prevent electrocution, fire hazards, and ensure safe installation of smart home devices.",
    section: "Installation & Safety",
    difficulty: "basic",
    topic: "Electrical Safety",
    category: "Installation"
  },
  {
    id: 158,
    question: "What is the minimum IP rating required for smart devices installed in bathroom zones?",
    options: [
      "IP20",
      "IP44 or higher depending on zone",
      "IP65",
      "No specific requirement"
    ],
    correctAnswer: 1,
    explanation: "Bathroom installations require IP44 or higher depending on the specific zone, with higher ratings required closer to water sources.",
    section: "Installation & Safety",
    difficulty: "intermediate",
    topic: "IP Ratings",
    category: "Installation"
  },
  {
    id: 159,
    question: "Which document must be provided to customers after smart home installation?",
    options: [
      "Invoice only",
      "Electrical Installation Certificate and user documentation",
      "Warranty card only",
      "Business card"
    ],
    correctAnswer: 1,
    explanation: "Customers must receive appropriate electrical certificates and comprehensive user documentation explaining system operation and safety information.",
    section: "Installation & Safety",
    difficulty: "intermediate",
    topic: "Documentation",
    category: "Installation"
  },
  {
    id: 160,
    question: "What is the purpose of RCD protection in smart home installations?",
    options: [
      "Overcurrent protection only",
      "Personal protection against electric shock",
      "Voltage regulation",
      "Power factor correction"
    ],
    correctAnswer: 1,
    explanation: "RCD (Residual Current Device) protection provides personal protection against electric shock by detecting earth leakage currents.",
    section: "Installation & Safety",
    difficulty: "basic",
    topic: "RCD Protection",
    category: "Installation"
  },
  {
    id: 161,
    question: "Which testing sequence should be followed for smart home electrical installations?",
    options: [
      "Random order testing",
      "BS 7671 specified sequence: continuity, insulation, polarity, earth fault loop",
      "Visual inspection only",
      "Manufacturer's preference"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 specifies the testing sequence to ensure accurate results: continuity, insulation resistance, polarity, earth fault loop impedance.",
    section: "Installation & Safety",
    difficulty: "intermediate",
    topic: "Testing Sequence",
    category: "Installation"
  },
  {
    id: 162,
    question: "What is the maximum earth fault loop impedance for a 6A Type B MCB?",
    options: [
      "1.15\u03a9",
      "7.27\u03a9",
      "2.3\u03a9",
      "4.8\u03a9"
    ],
    correctAnswer: 1,
    explanation: "For a 6A Type B MCB, the maximum earth fault loop impedance (Zs) is 7.27\u03a9 to ensure proper disconnection within required time limits.",
    section: "Installation & Safety",
    difficulty: "advanced",
    topic: "Earth Fault Loop",
    category: "Installation"
  },
  {
    id: 163,
    question: "Which consideration is essential for smart device cable routing?",
    options: [
      "Aesthetic appearance only",
      "Protection from mechanical damage and appropriate cable selection",
      "Shortest possible routes",
      "Highest possible routing"
    ],
    correctAnswer: 1,
    explanation: "Cable routing must protect against mechanical damage while using appropriate cable types for the installation environment and load requirements.",
    section: "Installation & Safety",
    difficulty: "intermediate",
    topic: "Cable Installation",
    category: "Installation"
  },
  {
    id: 164,
    question: "What is the purpose of 'safe isolation' procedures?",
    options: [
      "Improving efficiency",
      "Ensuring electrical supply is disconnected and cannot be re-energized during work",
      "Reducing installation time",
      "Cost reduction"
    ],
    correctAnswer: 1,
    explanation: "Safe isolation ensures electrical supply is properly disconnected, locked off, and cannot be accidentally re-energized while work is being performed.",
    section: "Installation & Safety",
    difficulty: "basic",
    topic: "Safe Isolation",
    category: "Installation"
  },
  {
    id: 165,
    question: "Which earthing arrangement is most common in UK domestic installations?",
    options: [
      "TT system",
      "TN-S system",
      "TN-C system",
      "IT system"
    ],
    correctAnswer: 1,
    explanation: "TN-S earthing systems are most common in UK domestic installations, providing a separate neutral and earth conductor from the supply transformer.",
    section: "Installation & Safety",
    difficulty: "intermediate",
    topic: "Earthing Systems",
    category: "Installation"
  },
  {
    id: 166,
    question: "What is the minimum insulation resistance required for circuits up to 500V AC?",
    options: [
      "0.5 M\u03a9",
      "1 M\u03a9",
      "2 M\u03a9",
      "5 M\u03a9"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 requires a minimum insulation resistance of 1 M\u03a9 for circuits rated up to 500V AC to ensure adequate insulation integrity.",
    section: "Installation & Safety",
    difficulty: "intermediate",
    topic: "Insulation Resistance",
    category: "Installation"
  },
  {
    id: 167,
    question: "Which safety device is required for circuits supplying socket outlets?",
    options: [
      "Surge protector",
      "RCD protection (30mA)",
      "Voltage regulator",
      "Power factor correction"
    ],
    correctAnswer: 1,
    explanation: "Socket outlet circuits require 30mA RCD protection for additional safety against electric shock in accordance with BS 7671.",
    section: "Installation & Safety",
    difficulty: "basic",
    topic: "RCD Requirements",
    category: "Installation"
  },
  {
    id: 168,
    question: "What is the maximum disconnection time for socket outlet circuits?",
    options: [
      "0.1 seconds",
      "0.4 seconds",
      "5 seconds",
      "No specific requirement"
    ],
    correctAnswer: 1,
    explanation: "Socket outlet circuits must disconnect within 0.4 seconds under earth fault conditions to provide adequate personal protection.",
    section: "Installation & Safety",
    difficulty: "intermediate",
    topic: "Disconnection Times",
    category: "Installation"
  },
  {
    id: 169,
    question: "Which factor determines the current-carrying capacity of cables?",
    options: [
      "Cable color only",
      "Installation method, ambient temperature, and grouping factors",
      "Cable length only",
      "Manufacturer preference"
    ],
    correctAnswer: 1,
    explanation: "Current-carrying capacity depends on installation method, ambient temperature, grouping with other cables, and thermal insulation effects.",
    section: "Installation & Safety",
    difficulty: "intermediate",
    topic: "Cable Selection",
    category: "Installation"
  },
  {
    id: 170,
    question: "What is the purpose of equipotential bonding in electrical installations?",
    options: [
      "Improving aesthetics",
      "Ensuring metallic parts are at same potential to prevent dangerous voltages",
      "Reducing costs",
      "Simplifying installation"
    ],
    correctAnswer: 1,
    explanation: "Equipotential bonding ensures all metallic parts are at the same electrical potential, preventing dangerous voltage differences during fault conditions.",
    section: "Installation & Safety",
    difficulty: "intermediate",
    topic: "Bonding",
    category: "Installation"
  },
  {
    id: 171,
    question: "Which documentation must be maintained for smart home installations?",
    options: [
      "Installation records only",
      "Certificates, test results, maintenance records, and as-built drawings",
      "Purchase receipts only",
      "Warranty information only"
    ],
    correctAnswer: 1,
    explanation: "Comprehensive documentation including certificates, test results, maintenance records, and as-built drawings must be maintained for safety and compliance.",
    section: "Installation & Safety",
    difficulty: "intermediate",
    topic: "Documentation",
    category: "Installation"
  },
  {
    id: 172,
    question: "What is the recommended approach for smart device network security during installation?",
    options: [
      "Default passwords acceptable",
      "Change default passwords, enable encryption, update firmware",
      "No security configuration needed",
      "Disable all security features"
    ],
    correctAnswer: 1,
    explanation: "Proper security configuration including changing default passwords, enabling encryption, and updating firmware is essential during installation.",
    section: "Installation & Safety",
    difficulty: "basic",
    topic: "Network Security",
    category: "Security"
  },
  {
    id: 173,
    question: "Which testing instrument is required for insulation resistance testing?",
    options: [
      "Multimeter only",
      "Insulation resistance tester (500V DC for 230V circuits)",
      "Oscilloscope",
      "Power analyzer"
    ],
    correctAnswer: 1,
    explanation: "Insulation resistance testing requires a dedicated tester applying 500V DC for circuits up to 500V AC to properly assess insulation integrity.",
    section: "Installation & Safety",
    difficulty: "intermediate",
    topic: "Testing Equipment",
    category: "Installation"
  },
  {
    id: 174,
    question: "What is the primary purpose of circuit protective conductors (CPCs)?",
    options: [
      "Current carrying capacity",
      "Providing path for fault current to enable protective device operation",
      "Voltage regulation",
      "Power factor improvement"
    ],
    correctAnswer: 1,
    explanation: "Circuit protective conductors provide a low-impedance path for fault currents, enabling protective devices to operate quickly during earth faults.",
    section: "Installation & Safety",
    difficulty: "intermediate",
    topic: "CPCs",
    category: "Installation"
  },
  {
    id: 175,
    question: "Which consideration is critical for smart home device power supply design?",
    options: [
      "Aesthetic appearance only",
      "Adequate capacity, diversity factors, and future expansion",
      "Minimum possible capacity",
      "Single circuit for all devices"
    ],
    correctAnswer: 1,
    explanation: "Power supply design must consider adequate capacity, apply diversity factors appropriately, and allow for future system expansion.",
    section: "Installation & Safety",
    difficulty: "intermediate",
    topic: "Power Supply Design",
    category: "Installation"
  },
  {
    id: 176,
    question: "What is the recommended periodic inspection interval for domestic installations?",
    options: [
      "5 years",
      "10 years",
      "15 years",
      "No periodic inspection required"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 recommends 10-year intervals for periodic inspection of domestic electrical installations to ensure continued safety and compliance.",
    section: "Installation & Safety",
    difficulty: "basic",
    topic: "Periodic Inspection",
    category: "Installation"
  },
  {
    id: 177,
    question: "Which safety precaution is essential when working near water?",
    options: [
      "No special precautions needed",
      "Ensure power is isolated and use appropriate IP-rated equipment",
      "Work faster",
      "Use standard equipment"
    ],
    correctAnswer: 1,
    explanation: "Working near water requires power isolation and use of appropriate IP-rated equipment to prevent electric shock and equipment damage.",
    section: "Installation & Safety",
    difficulty: "basic",
    topic: "Water Safety",
    category: "Installation"
  },
  {
    id: 178,
    question: "What is the purpose of surge protection devices (SPDs) in smart homes?",
    options: [
      "Overcurrent protection",
      "Protecting sensitive electronic equipment from voltage surges",
      "Earth fault protection",
      "Power factor correction"
    ],
    correctAnswer: 1,
    explanation: "SPDs protect sensitive smart home electronic equipment from damaging voltage surges caused by lightning or switching operations.",
    section: "Installation & Safety",
    difficulty: "intermediate",
    topic: "Surge Protection",
    category: "Installation"
  },
  {
    id: 179,
    question: "Which approach ensures proper smart home system commissioning?",
    options: [
      "Random testing",
      "Systematic testing of all functions, documentation, and user training",
      "Visual inspection only",
      "Basic connectivity testing only"
    ],
    correctAnswer: 1,
    explanation: "Proper commissioning requires systematic testing of all functions, complete documentation, and comprehensive user training for safe operation.",
    section: "Installation & Safety",
    difficulty: "intermediate",
    topic: "Commissioning",
    category: "Installation"
  },
  {
    id: 180,
    question: "What is the most critical safety consideration for DIY smart home installations?",
    options: [
      "Cost savings",
      "Understanding electrical safety requirements and knowing when to use qualified electricians",
      "Installation speed",
      "Equipment selection"
    ],
    correctAnswer: 1,
    explanation: "DIY installers must understand electrical safety requirements and recognize when qualified electricians are required for safe, compliant installations.",
    section: "Installation & Safety",
    difficulty: "basic",
    topic: "DIY Safety",
    category: "Installation"
  },

  // Troubleshooting and Maintenance (20 questions)
  {
    id: 181,
    question: "What is the first step in troubleshooting smart home connectivity issues?",
    options: [
      "Replace all devices",
      "Check network connectivity and signal strength",
      "Contact manufacturer support",
      "Reset all devices"
    ],
    correctAnswer: 1,
    explanation: "Network connectivity and signal strength issues are the most common cause of smart home problems and should be checked first.",
    section: "Troubleshooting & Maintenance",
    difficulty: "basic",
    topic: "Connectivity Issues",
    category: "Maintenance"
  },
  {
    id: 182,
    question: "Which tool is most useful for diagnosing Zigbee network problems?",
    options: [
      "Multimeter",
      "Network analyzer with Zigbee capabilities",
      "Oscilloscope",
      "Standard Wi-Fi analyzer"
    ],
    correctAnswer: 1,
    explanation: "Network analyzers with Zigbee capabilities can identify interference, mesh topology issues, and communication problems specific to Zigbee networks.",
    section: "Troubleshooting & Maintenance",
    difficulty: "intermediate",
    topic: "Diagnostic Tools",
    category: "Maintenance"
  },
  {
    id: 183,
    question: "What is the most common cause of intermittent smart device operation?",
    options: [
      "Manufacturing defects",
      "Weak wireless signal or interference",
      "Power supply issues",
      "Software bugs"
    ],
    correctAnswer: 1,
    explanation: "Weak wireless signals or interference from other devices commonly cause intermittent operation of smart home devices.",
    section: "Troubleshooting & Maintenance",
    difficulty: "basic",
    topic: "Common Issues",
    category: "Maintenance"
  },
  {
    id: 184,
    question: "Which maintenance practice extends smart home system lifespan most effectively?",
    options: [
      "Frequent device replacement",
      "Regular software updates and cleaning",
      "Continuous operation at maximum settings",
      "Avoiding system use"
    ],
    correctAnswer: 1,
    explanation: "Regular software updates provide security patches and bug fixes, while physical cleaning prevents overheating and component degradation.",
    section: "Troubleshooting & Maintenance",
    difficulty: "basic",
    topic: "Preventive Maintenance",
    category: "Maintenance"
  },
  {
    id: 185,
    question: "What is the recommended approach for diagnosing automation failures?",
    options: [
      "Guess at solutions",
      "Systematic checking of triggers, conditions, and actions",
      "Replace automation controller",
      "Disable all automations"
    ],
    correctAnswer: 1,
    explanation: "Systematic checking involves verifying triggers fire correctly, conditions are met, and actions execute as programmed to isolate failure points.",
    section: "Troubleshooting & Maintenance",
    difficulty: "intermediate",
    topic: "Automation Issues",
    category: "Maintenance"
  },
  {
    id: 186,
    question: "Which environmental factor most commonly affects smart home device performance?",
    options: [
      "Ambient lighting",
      "Temperature and humidity extremes",
      "Sound levels",
      "Air pressure changes"
    ],
    correctAnswer: 1,
    explanation: "Temperature and humidity extremes can affect electronic components, battery performance, and wireless signal propagation.",
    section: "Troubleshooting & Maintenance",
    difficulty: "intermediate",
    topic: "Environmental Factors",
    category: "Maintenance"
  },
  {
    id: 187,
    question: "What is the best practice for smart home system backup and recovery?",
    options: [
      "No backup needed",
      "Regular configuration backups with tested restore procedures",
      "Physical device replacement only",
      "Manual documentation only"
    ],
    correctAnswer: 1,
    explanation: "Regular automated configuration backups combined with tested restore procedures ensure quick recovery from system failures.",
    section: "Troubleshooting & Maintenance",
    difficulty: "intermediate",
    topic: "Backup & Recovery",
    category: "Maintenance"
  },
  {
    id: 188,
    question: "Which diagnostic approach is most effective for identifying device compatibility issues?",
    options: [
      "Trial and error",
      "Checking protocol specifications and certification compatibility",
      "Price comparison",
      "Brand preference only"
    ],
    correctAnswer: 1,
    explanation: "Verifying protocol specifications, certification levels, and manufacturer compatibility lists prevents most device compatibility issues.",
    section: "Troubleshooting & Maintenance",
    difficulty: "intermediate",
    topic: "Compatibility",
    category: "Maintenance"
  },
  {
    id: 189,
    question: "What is the primary cause of smart home security system false alarms?",
    options: [
      "Equipment failure",
      "Improper sensor placement or sensitivity settings",
      "Power outages",
      "Wireless interference"
    ],
    correctAnswer: 1,
    explanation: "Improper sensor placement (near heat sources, air vents) or incorrect sensitivity settings cause most false alarm issues.",
    section: "Troubleshooting & Maintenance",
    difficulty: "intermediate",
    topic: "False Alarms",
    category: "Maintenance"
  },
  {
    id: 190,
    question: "Which maintenance task should be performed monthly on smart home systems?",
    options: [
      "Complete system replacement",
      "Battery level checks and system health monitoring",
      "Firmware downgrade",
      "Physical device relocation"
    ],
    correctAnswer: 1,
    explanation: "Monthly battery level checks and system health monitoring help identify issues before they cause system failures.",
    section: "Troubleshooting & Maintenance",
    difficulty: "basic",
    topic: "Monthly Maintenance",
    category: "Maintenance"
  },
  {
    id: 191,
    question: "What is the most effective method for resolving mesh network connectivity issues?",
    options: [
      "Adding more devices randomly",
      "Analyzing network topology and optimizing device placement",
      "Increasing transmission power on all devices",
      "Switching to different protocols"
    ],
    correctAnswer: 1,
    explanation: "Analyzing mesh topology and optimizing device placement ensures proper signal paths and eliminates coverage gaps.",
    section: "Troubleshooting & Maintenance",
    difficulty: "intermediate",
    topic: "Mesh Networks",
    category: "Maintenance"
  },
  {
    id: 192,
    question: "Which approach provides the best long-term system reliability?",
    options: [
      "Avoiding system updates",
      "Proactive monitoring and preventive maintenance",
      "Reactive repairs only",
      "Continuous device replacement"
    ],
    correctAnswer: 1,
    explanation: "Proactive monitoring identifies potential issues early, while preventive maintenance prevents many common failures.",
    section: "Troubleshooting & Maintenance",
    difficulty: "intermediate",
    topic: "Reliability",
    category: "Maintenance"
  },
  {
    id: 193,
    question: "What is the recommended response to smart home cybersecurity alerts?",
    options: [
      "Ignore alerts",
      "Immediate investigation and response following security procedures",
      "Disable security features",
      "Wait for automatic resolution"
    ],
    correctAnswer: 1,
    explanation: "Cybersecurity alerts require immediate investigation to determine if actual threats exist and implement appropriate response measures.",
    section: "Troubleshooting & Maintenance",
    difficulty: "intermediate",
    topic: "Security Alerts",
    category: "Security"
  },
  {
    id: 194,
    question: "Which documentation practice most aids troubleshooting efficiency?",
    options: [
      "No documentation needed",
      "Detailed system configuration records and change logs",
      "Purchase receipts only",
      "Warranty information only"
    ],
    correctAnswer: 1,
    explanation: "Detailed configuration records and change logs help quickly identify what changed before problems occurred, accelerating troubleshooting.",
    section: "Troubleshooting & Maintenance",
    difficulty: "intermediate",
    topic: "Documentation",
    category: "Maintenance"
  },
  {
    id: 195,
    question: "What is the most important factor in smart home user training?",
    options: [
      "Technical specifications",
      "Understanding normal operation and basic troubleshooting",
      "Installation procedures",
      "Marketing information"
    ],
    correctAnswer: 1,
    explanation: "Users need to understand how the system normally operates and basic troubleshooting steps to resolve simple issues independently.",
    section: "Troubleshooting & Maintenance",
    difficulty: "basic",
    topic: "User Training",
    category: "Maintenance"
  },
  {
    id: 196,
    question: "Which approach ensures effective smart home system updates?",
    options: [
      "Never update systems",
      "Scheduled updates with testing and rollback capability",
      "Immediate updates without testing",
      "Random update timing"
    ],
    correctAnswer: 1,
    explanation: "Scheduled updates with testing procedures and rollback capability ensure updates improve rather than disrupt system operation.",
    section: "Troubleshooting & Maintenance",
    difficulty: "intermediate",
    topic: "System Updates",
    category: "Maintenance"
  },
  {
    id: 197,
    question: "What is the primary benefit of remote monitoring in smart home systems?",
    options: [
      "Entertainment value",
      "Early issue detection and reduced service calls",
      "Increased complexity",
      "Higher costs"
    ],
    correctAnswer: 1,
    explanation: "Remote monitoring enables early detection of issues and proactive maintenance, reducing emergency service calls and system downtime.",
    section: "Troubleshooting & Maintenance",
    difficulty: "intermediate",
    topic: "Remote Monitoring",
    category: "Maintenance"
  },
  {
    id: 198,
    question: "Which factor most affects the success of smart home troubleshooting?",
    options: [
      "Equipment brand preference",
      "Systematic approach and proper diagnostic tools",
      "Speed of response",
      "Cost considerations"
    ],
    correctAnswer: 1,
    explanation: "Systematic troubleshooting approaches combined with proper diagnostic tools efficiently identify and resolve issues.",
    section: "Troubleshooting & Maintenance",
    difficulty: "intermediate",
    topic: "Troubleshooting Methods",
    category: "Maintenance"
  },
  {
    id: 199,
    question: "What is the recommended frequency for smart home system performance reviews?",
    options: [
      "Never needed",
      "Quarterly reviews with annual comprehensive assessments",
      "Daily checks only",
      "Only when problems occur"
    ],
    correctAnswer: 1,
    explanation: "Quarterly performance reviews identify trends and issues early, while annual comprehensive assessments ensure optimal long-term operation.",
    section: "Troubleshooting & Maintenance",
    difficulty: "intermediate",
    topic: "Performance Reviews",
    category: "Maintenance"
  },
  {
    id: 200,
    question: "Which maintenance strategy provides the best return on investment?",
    options: [
      "No maintenance until failure",
      "Preventive maintenance based on usage patterns and manufacturer recommendations",
      "Continuous component replacement",
      "Random maintenance schedules"
    ],
    correctAnswer: 1,
    explanation: "Preventive maintenance based on actual usage and manufacturer recommendations optimizes system reliability while controlling costs.",
    section: "Troubleshooting & Maintenance",
    difficulty: "intermediate",
    topic: "Maintenance Strategy",
    category: "Maintenance"
  }
];

// Categories for balanced question selection
export const smartHomeCategories = [
  'Fundamentals',
  'Protocols',
  'Lighting',
  'HVAC',
  'Security',
  'Hubs',
  'Voice Assistants',
  'Installation',
  'Maintenance'
];

// Configuration for Smart Home mock exam
export const smartHomeMockExamConfig = {
  examId: 'smart-home',
  examTitle: 'Smart Home Technology Mock Examination',
  totalQuestions: 30,
  timeLimit: 2700, // 45 minutes in seconds
  passThreshold: 60,
  exitPath: '/electrician/upskilling/smart-home-course',
  categories: smartHomeCategories
};

// Function to get random questions for mock exam (30 questions with difficulty distribution)
export const getRandomSmartHomeMockExamQuestions = (numQuestions: number = 30): StandardMockQuestion[] => {
  return getRandomQuestionsBalanced(
    smartHomeQuestionBank,
    numQuestions,
    smartHomeCategories,
    { basic: 0.35, intermediate: 0.45, advanced: 0.2 }
  );
};
