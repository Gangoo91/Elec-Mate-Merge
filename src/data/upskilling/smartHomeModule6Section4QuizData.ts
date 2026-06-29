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
    question: 'What does bridging mean in smart homes?',
    options: [
      'Enabling older or incompatible devices to communicate with modern smart home platforms',
      'Building a physical link box between two devices',
      'Connecting devices together with dedicated cabling',
      'Installing only brand-new compatible devices',
    ],
    correct: 0,
    explanation:
      'Bridging enables older or incompatible devices to communicate with modern smart home platforms through various integration methods.',
  },
  {
    id: 2,
    question: 'Give one example of a device that might need bridging.',
    options: [
      'A new Zigbee smart bulb',
      'A modern smart thermostat',
      'A wired intruder alarm system',
      'A Wi-Fi enabled camera',
    ],
    correct: 2,
    explanation:
      'Wired intruder alarm systems installed before smart home standards often need bridging to integrate with modern platforms.',
  },
  {
    id: 3,
    question: 'What role does a Hue Bridge play in integration?',
    options: [
      'It supplies mains power to the lights',
      'It replaces the old bulbs with new ones',
      'It provides the home internet connection',
      'It connects Zigbee bulbs to platforms like Alexa',
    ],
    correct: 3,
    explanation:
      "The Hue Bridge acts as a translator, enabling Zigbee bulbs to communicate with platforms like Alexa that don't natively support Zigbee.",
  },
  {
    id: 4,
    question: 'Name two types of legacy systems electricians often encounter.',
    options: [
      'Wired alarms and old programmable thermostats',
      'Smart thermostats and Wi-Fi cameras',
      'New LED lighting and modern HVAC controls',
      'Zigbee devices and Z-Wave sensors',
    ],
    correct: 0,
    explanation:
      'Wired alarm systems and old programmable thermostats are common legacy systems that electricians need to integrate or replace in smart home upgrades.',
  },
  {
    id: 5,
    question: 'What is a protocol converter?',
    options: [
      'A device that changes the electrical supply voltage',
      'A type of smart wall switch',
      'A device that translates signals between different communication protocols',
      'A software tool for programming automations',
    ],
    correct: 2,
    explanation:
      'Protocol converters translate signals between different communication standards, such as converting Zigbee signals to Wi-Fi for broader compatibility.',
  },
  {
    id: 6,
    question: 'How can Home Assistant help bridge devices?',
    options: [
      'By replacing all of the old devices',
      'By supplying power to the connected devices',
      'By installing new structured wiring',
      'Through plugins and integrations that connect multiple device types',
    ],
    correct: 3,
    explanation:
      'Home Assistant uses plugins and integrations to connect various device types and protocols, creating a unified smart home platform.',
  },
  {
    id: 7,
    question: 'What is one advantage of bridging instead of replacing legacy systems?',
    options: [
      'It always delivers faster response times than new systems',
      'Lower cost and extended lifespan of the existing investment',
      'It removes the need for any client configuration',
      'It guarantees stronger encryption than native devices',
    ],
    correct: 1,
    explanation:
      'Bridging can be more cost-effective than complete replacement, extending the useful life of existing systems while adding smart functionality.',
  },
  {
    id: 8,
    question: 'What is one limitation of bridging?',
    options: [
      'Reduced functionality and potential additional points of failure',
      'It is always more expensive than full replacement',
      'It always requires new wiring to be installed',
      'It only ever works with a single manufacturer',
    ],
    correct: 0,
    explanation:
      'Bridging often provides reduced functionality compared to native smart devices and adds complexity that can create additional points of failure.',
  },
  {
    id: 9,
    question: 'Why should electricians warn clients about reduced functionality?',
    options: [
      'To increase upsell opportunities',
      'To shift all liability onto the client',
      'To set realistic expectations about what bridged systems can and cannot do',
      'To steer clients towards the most expensive solution',
    ],
    correct: 2,
    explanation:
      'Setting realistic expectations helps clients understand limitations, such as basic on/off control versus full automation features in bridged systems.',
  },
  {
    id: 10,
    question: 'In the real-world example, what legacy system was bridged and how?',
    options: [
      'Old thermostat via a Wi-Fi adapter',
      'Analogue cameras via a digital converter',
      'Old lighting via a Zigbee bridge',
      'Wired alarm system via a smart relay interface',
    ],
    correct: 3,
    explanation:
      'A wired alarm system from the early 2000s was bridged using a smart relay interface, enabling notifications and routine triggers while preserving the existing system.',
  },
];
