export const batterySizingQuizData = [
  {
    question: "What does 'autonomy duration' mean in emergency lighting?",
    answers: [
      "The time it takes to recharge the battery",
      "The length of time the emergency lights operate during a power failure",
      "The lifespan of the battery before replacement",
      "The time between routine maintenance tests"
    ],
    correctAnswer: 1,
    explanation: "Autonomy duration refers to the length of time emergency lighting must operate during a power failure, typically 1 or 3 hours depending on building type and evacuation requirements."
  },
  {
    question: "State the standard duration required for public assembly buildings.",
    answers: [
      "30 minutes",
      "1 hour",
      "3 hours",
      "6 hours"
    ],
    correctAnswer: 2,
    explanation: "Public assembly buildings require 3-hour autonomy duration as per BS 5266-1, due to the potential for large numbers of occupants and extended evacuation times."
  },
  {
    question: "What unit is battery capacity measured in?",
    answers: [
      "Watts (W)",
      "Volts (V)",
      "Ampere-hours (Ah)",
      "Kilowatt-hours (kWh)"
    ],
    correctAnswer: 2,
    explanation: "Battery capacity is measured in Ampere-hours (Ah), which represents the amount of charge a battery can deliver over time."
  },
  {
    question: "Which formula correctly calculates battery capacity?",
    answers: [
      "Capacity = (Load × Voltage) / (Duration × Efficiency)",
      "Capacity = (Load × Duration) / (Voltage × Efficiency)",
      "Capacity = (Load × Efficiency) / (Voltage × Duration)",
      "Capacity = (Voltage × Duration) / (Load × Efficiency)"
    ],
    correctAnswer: 1,
    explanation: "Battery Capacity (Ah) = [Load (W) × Duration (h)] / [Battery Voltage (V) × Efficiency Factor]. This accounts for the power requirement over time, divided by the voltage and adjusted for losses."
  },
  {
    question: "Why must designers add extra capacity beyond calculated loads?",
    answers: [
      "To increase profit margins",
      "To account for battery ageing and degradation over time",
      "Because regulations require oversizing by law",
      "To allow for future expansion only"
    ],
    correctAnswer: 1,
    explanation: "Extra capacity (typically 25-30%) is added to account for battery ageing and degradation. Batteries lose capacity over their service life, and the system must still meet minimum requirements at end-of-life."
  },
  {
    question: "What effect does high temperature have on battery efficiency?",
    answers: [
      "Increases capacity significantly",
      "No effect on capacity",
      "Reduces capacity and accelerates degradation",
      "Only affects charging time"
    ],
    correctAnswer: 2,
    explanation: "High temperatures reduce battery capacity and accelerate chemical degradation, shortening battery life. Most batteries are rated at 20°C, and performance decreases at higher temperatures."
  },
  {
    question: "Which type of system requires consideration of voltage drop in cables?",
    answers: [
      "Self-contained systems only",
      "Central battery systems",
      "LED systems only",
      "Both types equally"
    ],
    correctAnswer: 1,
    explanation: "Central battery systems require voltage drop calculations because they supply multiple luminaires over potentially long cable distances, where voltage drop can affect luminaire performance."
  },
  {
    question: "How long should batteries take to recharge after full discharge?",
    answers: [
      "6 hours",
      "12 hours",
      "24 hours",
      "48 hours"
    ],
    correctAnswer: 2,
    explanation: "BS 5266-1 requires batteries to recharge within 24 hours after full discharge, ensuring the system is operational for subsequent emergencies."
  },
  {
    question: "How often are self-contained batteries typically replaced?",
    answers: [
      "Every 1–2 years",
      "Every 3–5 years",
      "Every 7–10 years",
      "Every 10–15 years"
    ],
    correctAnswer: 1,
    explanation: "Self-contained emergency lighting batteries (NiCd, NiMH) typically require replacement every 3–5 years, depending on usage, temperature, and maintenance. Lithium-ion batteries may last longer."
  },
  {
    question: "Why was the London office block case study non-compliant?",
    answers: [
      "The batteries were the wrong voltage",
      "1-hour batteries were installed when 3-hour autonomy was required",
      "The luminaires were positioned incorrectly",
      "The charging system was faulty"
    ],
    correctAnswer: 1,
    explanation: "The office block initially installed 1-hour batteries, but fire risk assessment revealed evacuation could take up to 90 minutes, requiring 3-hour batteries. This incorrect autonomy specification resulted in costly retrofitting."
  }
];
