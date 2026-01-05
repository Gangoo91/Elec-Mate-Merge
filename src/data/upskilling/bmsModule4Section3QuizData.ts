export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export const bmsModule4Section3QuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "How can access control systems save energy as well as provide security?",
    options: [
      "By using LED lights in card readers",
      "By activating lighting and HVAC only when someone enters a zone",
      "By reducing the number of security guards needed",
      "By using solar-powered door locks"
    ],
    correct: 1,
    explanation: "Access control integrated with BMS can trigger lighting and HVAC activation only when authorised personnel enter areas, significantly reducing energy consumption in unoccupied zones."
  },
  {
    id: 2,
    question: "What is the role of a door relay in access control?",
    options: [
      "To detect when doors are opened",
      "To sound alarms when doors are forced",
      "To control power to locks or strike plates",
      "To communicate with card readers"
    ],
    correct: 2,
    explanation: "Door relays receive signals from readers or the BMS and switch the lock power accordingly, controlling electromagnetic locks or electric strikes."
  },
  {
    id: 3,
    question: "What is the difference between a fail-safe and fail-secure lock?",
    options: [
      "Fail-safe locks are more expensive than fail-secure locks",
      "Fail-safe locks release when power is cut, fail-secure locks stay locked without power",
      "Fail-safe locks use AC power, fail-secure locks use DC power",
      "There is no difference, they are the same thing"
    ],
    correct: 1,
    explanation: "Fail-safe locks release when power is cut (used for fire exits), while fail-secure locks stay locked without power (used in high-security areas)."
  },
  {
    id: 4,
    question: "Why might maglocks be chosen over strike plates?",
    options: [
      "Maglocks are cheaper to install",
      "Maglocks provide stronger holding force and are easier to install on existing doors",
      "Strike plates are not compatible with card readers",
      "Maglocks use less power"
    ],
    correct: 1,
    explanation: "Electromagnetic locks (maglocks) provide very strong holding force (often 300kg+) and can be retrofitted to existing doors without major modifications to the door frame."
  },
  {
    id: 5,
    question: "What is one reason access control should integrate with fire alarms?",
    options: [
      "To save on installation costs",
      "To ensure doors unlock automatically for safe evacuation during emergencies",
      "To prevent false alarms",
      "To reduce maintenance requirements"
    ],
    correct: 1,
    explanation: "BS 7273 requires that access control systems integrate with fire alarms to ensure all secured doors unlock automatically during fire emergencies, allowing safe evacuation."
  },
  {
    id: 6,
    question: "At what height are card readers typically mounted?",
    options: [
      "0.9m",
      "1.2m",
      "1.5m",
      "1.8m"
    ],
    correct: 1,
    explanation: "Card readers are typically mounted at 1.2m height to be accessible for all users, including those in wheelchairs, while being at a comfortable height for standing users."
  },
  {
    id: 7,
    question: "Why should access control cabling not be run alongside mains circuits?",
    options: [
      "To comply with building regulations",
      "To prevent electromagnetic interference affecting data signals",
      "To make installation easier",
      "To reduce cable costs"
    ],
    correct: 1,
    explanation: "Access control uses low-voltage data signals that can be affected by electromagnetic interference from mains cables, potentially causing communication errors or false readings."
  },
  {
    id: 8,
    question: "What backup is needed for access systems to work during power cuts?",
    options: [
      "Manual keys for all doors",
      "UPS or battery backup for power supplies",
      "Generator backup only",
      "No backup is required"
    ],
    correct: 1,
    explanation: "Access control systems require UPS or battery backup to ensure locks operate correctly during power outages, maintaining both security and safety functions."
  },
  {
    id: 9,
    question: "Why must break-glass or emergency release units be fitted near locked doors?",
    options: [
      "To comply with insurance requirements",
      "To provide manual override for emergency evacuation",
      "To test the lock operation",
      "To reset the access control system"
    ],
    correct: 1,
    explanation: "Emergency release units provide a manual override mechanism that allows immediate exit during emergencies, ensuring occupant safety even if the electronic systems fail."
  },
  {
    id: 10,
    question: "In the real-world example, what mistake created a fire safety risk?",
    options: [
      "Using the wrong type of locks",
      "Installing readers at the wrong height",
      "Forgetting to integrate maglocks with the fire alarm system",
      "Using inadequate power supplies"
    ],
    correct: 2,
    explanation: "The electricians installed maglocks but failed to integrate them with the fire alarm system, meaning doors remained locked during fire alarm activation, preventing safe evacuation."
  }
];