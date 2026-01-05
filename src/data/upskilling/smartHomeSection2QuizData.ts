import type { QuizQuestion } from '@/types/quiz';

export const smartHomeSection2QuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What are the five main benefits of smart home applications?",
    options: [
      "Convenience, cost reduction, entertainment, decoration, complexity",
      "Convenience, energy efficiency, safety and security, accessibility, comfort and lifestyle",
      "Automation, wireless connectivity, app control, voice commands, remote access",
      "Lighting control, heating control, security monitoring, entertainment, communication"
    ],
    correctAnswer: 1,
    explanation: "The five main benefits are convenience (automating tasks), energy efficiency (optimising usage), safety and security (integrated protection), accessibility (assistive technology), and comfort and lifestyle (customisable environments)."
  },
  {
    id: 2,
    question: "Which feature allows smart lighting to automatically adapt to occupancy?",
    options: [
      "Motion sensors and occupancy detection",
      "Timer-based scheduling only",
      "Manual smartphone control",
      "Voice command activation"
    ],
    correctAnswer: 0,
    explanation: "Motion sensors and occupancy detection allow smart lighting systems to automatically turn lights on when someone enters a room and off when the room is vacant, improving energy efficiency."
  },
  {
    id: 3,
    question: "How can smart HVAC systems anticipate heating or cooling needs?",
    options: [
      "By using only internal temperature sensors",
      "Through manual programming schedules",
      "By integrating with weather forecasts and learning household patterns",
      "By maintaining constant temperature settings"
    ],
    correctAnswer: 2,
    explanation: "Smart HVAC systems can integrate with weather forecast data and learn household patterns to anticipate heating or cooling needs, pre-conditioning spaces for optimal comfort and efficiency."
  },
  {
    id: 4,
    question: "What does 'zoning' mean in smart HVAC systems?",
    options: [
      "Dividing the house into different temperature-controlled areas",
      "Setting up security zones for monitoring",
      "Creating lighting scenes for different rooms",
      "Establishing Wi-Fi coverage areas"
    ],
    correctAnswer: 0,
    explanation: "Zoning in HVAC systems refers to dividing the house into different areas that can be independently temperature-controlled, allowing for customised comfort and improved energy efficiency."
  },
  {
    id: 5,
    question: "What is one key benefit of smart locks over traditional locks?",
    options: [
      "They are significantly cheaper to install",
      "They never require batteries or power",
      "They provide remote access control and activity monitoring",
      "They are completely immune to all security threats"
    ],
    correctAnswer: 2,
    explanation: "Smart locks provide remote access control, allowing users to lock/unlock doors from anywhere, and activity monitoring to track who enters and when, enhancing both convenience and security."
  },
  {
    id: 6,
    question: "Which smart security feature provides real-time communication with visitors?",
    options: [
      "Motion detection cameras",
      "Smart door locks",
      "Video doorbell systems",
      "Window sensors"
    ],
    correctAnswer: 2,
    explanation: "Video doorbell systems provide two-way communication, allowing homeowners to see and speak with visitors in real-time, whether they're at home or away."
  },
  {
    id: 7,
    question: "How can smart technology support elderly residents' independence?",
    options: [
      "By requiring complex technical knowledge",
      "Through voice control, automation, and remote monitoring capabilities",
      "By eliminating all manual controls",
      "By restricting access to certain functions"
    ],
    correctAnswer: 1,
    explanation: "Smart technology supports elderly independence through voice control (reducing physical interaction needs), automation (handling routine tasks), and remote monitoring (allowing family/carers to check on wellbeing)."
  },
  {
    id: 8,
    question: "True or False: Smart lights can only operate if connected to the internet?",
    options: [
      "True - they always require internet connectivity",
      "False - many can operate locally but lose remote features without internet",
      "True - they are completely dependent on cloud services",
      "False - they never use internet connectivity"
    ],
    correctAnswer: 1,
    explanation: "False. Many smart lights can operate locally through hubs or direct connections, maintaining basic functionality during internet outages, though remote access and cloud features become unavailable."
  },
  {
    id: 9,
    question: "Which smart lighting feature automatically adjusts brightness based on available natural light?",
    options: [
      "Motion detection",
      "Daylight harvesting sensors",
      "Timer scheduling",
      "Voice control activation"
    ],
    correctAnswer: 1,
    explanation: "Daylight harvesting sensors automatically adjust artificial lighting brightness based on available natural light levels, maintaining consistent illumination while minimising energy consumption."
  },
  {
    id: 10,
    question: "What is a key advantage of smart HVAC zoning for energy efficiency?",
    options: [
      "It heats the entire house to the same temperature",
      "It only works with new construction projects",
      "It allows heating/cooling only occupied areas, reducing waste",
      "It requires constant manual adjustment"
    ],
    correctAnswer: 2,
    explanation: "Smart HVAC zoning allows heating or cooling only the areas that are occupied or need climate control, significantly reducing energy waste and lowering utility costs while maintaining comfort."
  }
];