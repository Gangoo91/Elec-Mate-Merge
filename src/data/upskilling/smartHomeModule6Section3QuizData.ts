interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export const smartHomeModule6Section3QuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What is a smart home routine?",
    options: [
      "A manual process for controlling devices",
      "A pre-set sequence of actions triggered by a command, schedule, or event",
      "A type of smart device",
      "A voice assistant feature only"
    ],
    correct: 1,
    explanation: "A routine is a pre-set sequence of actions that can be triggered automatically by commands, schedules, or events, saving time and improving efficiency."
  },
  {
    id: 2,
    question: "Give one example of a 'Good morning' routine.",
    options: [
      "Turn on coffee machine only",
      "Turn on lights, start kettle, and adjust heating",
      "Check the weather",
      "Play music only"
    ],
    correct: 1,
    explanation: "A 'Good morning' routine typically includes multiple actions like turning on lights, starting the kettle, and adjusting heating to prepare the home for the day."
  },
  {
    id: 3,
    question: "What type of logic do voice assistants use to interpret commands?",
    options: [
      "Random logic",
      "IF-THEN logic",
      "Sequential logic only",
      "Manual logic"
    ],
    correct: 1,
    explanation: "Voice assistants use IF-THEN logic to interpret commands and trigger appropriate actions based on conditions and rules."
  },
  {
    id: 4,
    question: "What does 'IF motion is detected THEN turn on light' represent?",
    options: [
      "A manual command",
      "A conditional automation rule",
      "A device specification",
      "A voice command"
    ],
    correct: 1,
    explanation: "This represents a conditional automation rule using IF-THEN logic where motion detection triggers the light to turn on automatically."
  },
  {
    id: 5,
    question: "What is a single command routine?",
    options: [
      "A routine that controls one device only",
      "A routine triggered by one phrase that can control multiple devices",
      "A routine that runs once per day",
      "A routine without voice control"
    ],
    correct: 1,
    explanation: "A single command routine is triggered by one phrase but can control multiple devices and perform various actions simultaneously."
  },
  {
    id: 6,
    question: "Give one example of an event-based routine.",
    options: [
      "Saying 'Good night' to turn off lights",
      "Manually pressing a switch",
      "Lights turning on when arriving home (geofencing)",
      "Setting a timer on your phone"
    ],
    correct: 2,
    explanation: "Event-based routines are triggered automatically by events like geofencing (arriving home), sensors, or schedules rather than voice commands."
  },
  {
    id: 7,
    question: "What conditions might be added to a routine for heating control?",
    options: [
      "Only time of day",
      "Temperature < 18°C and after 6pm",
      "Only occupancy status",
      "Only weather conditions"
    ],
    correct: 1,
    explanation: "Conditional routines can include multiple factors like temperature thresholds and time conditions to create more intelligent heating control."
  },
  {
    id: 8,
    question: "Why should devices be named clearly in apps?",
    options: [
      "For aesthetic purposes",
      "To make voice commands work properly and avoid confusion",
      "To save memory",
      "For security reasons only"
    ],
    correct: 1,
    explanation: "Clear device names like 'Kitchen light' instead of 'Device 1' ensure voice commands work properly and users can easily identify and control devices."
  },
  {
    id: 9,
    question: "What is one common mistake when creating routines for clients?",
    options: [
      "Making them too simple",
      "Creating over-complicated logic that may confuse end users",
      "Testing them thoroughly",
      "Documenting them properly"
    ],
    correct: 1,
    explanation: "Over-complicating routines can confuse end users. It's better to start simple and add complexity gradually as clients become more comfortable."
  },
  {
    id: 10,
    question: "In the real-world example, what phrase triggered the 'Leaving Home' routine?",
    options: [
      "'Alexa, goodbye'",
      "'Hey Google, we're off'",
      "'OK Google, leaving now'",
      "'Alexa, we're leaving'"
    ],
    correct: 1,
    explanation: "The phrase 'Hey Google, we're off' triggered the comprehensive leaving home routine that controlled lights, heating, locks, and security cameras."
  }
];