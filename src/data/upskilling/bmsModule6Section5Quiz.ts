import { QuizQuestion } from '@/types/quiz';

export const bmsModule6Section5Quiz: QuizQuestion[] = [
  {
    id: 1,
    question: "Why must BMS integrate with fire panels?",
    options: [
      "To monitor building temperature more accurately",
      "To perform critical safety shutdowns and control access during emergencies",
      "To reduce energy consumption during normal operation",
      "To provide better comfort control for occupants"
    ],
    correctAnswer: 1,
    explanation: "BMS must integrate with fire panels to perform critical safety shutdowns like stopping ventilation, activating smoke extract, unlocking doors, and isolating plant equipment during fire emergencies."
  },
  {
    id: 2,
    question: "Give two examples of actions triggered by a fire alarm in a BMS.",
    options: [
      "Increase heating and close all windows",
      "AHU shutdown and access door release",
      "Turn on all lights and activate music system",
      "Reduce water pressure and increase cooling"
    ],
    correctAnswer: 1,
    explanation: "When a fire alarm triggers, the BMS typically shuts down Air Handling Units (AHUs) to prevent smoke spread and releases access-controlled doors to allow safe evacuation."
  },
  {
    id: 3,
    question: "Why must AHUs shut down during fire alarms?",
    options: [
      "To save energy during the emergency",
      "To reduce noise levels for better communication",
      "To prevent smoke spread throughout the building",
      "To protect the equipment from damage"
    ],
    correctAnswer: 2,
    explanation: "AHUs must shut down during fire alarms to prevent the ventilation system from circulating smoke throughout the building, which could make evacuation routes impassable."
  },
  {
    id: 4,
    question: "What type of signal usually links fire panels to BMS inputs?",
    options: [
      "Analogue voltage signal (0-10V)",
      "Digital contact signal (dry contact)",
      "Pneumatic pressure signal",
      "Optical fibre signal"
    ],
    correctAnswer: 1,
    explanation: "Fire panels typically provide digital contact signals (dry contacts) to BMS inputs. These are simple, reliable on/off signals that indicate alarm activation."
  },
  {
    id: 5,
    question: "What must happen to access-controlled doors during a fire alarm?",
    options: [
      "They must lock automatically to prevent unauthorised access",
      "They must remain in their current state",
      "They must unlock to allow free evacuation",
      "They must only unlock for authorised personnel"
    ],
    correctAnswer: 2,
    explanation: "Access-controlled doors must unlock during fire alarms to ensure all occupants can evacuate safely without needing cards, codes, or keys."
  },
  {
    id: 6,
    question: "Give one example of a non-fire emergency shutdown event.",
    options: [
      "High outdoor temperature",
      "Gas leak detection",
      "Low humidity levels",
      "Excessive lighting usage"
    ],
    correctAnswer: 1,
    explanation: "Gas leak detection is a common non-fire emergency that triggers BMS shutdowns, particularly of boilers, ignition sources, and ventilation systems to prevent explosion risks."
  },
  {
    id: 7,
    question: "Why is fail-safe wiring used for fire-BMS interlocks?",
    options: [
      "To reduce installation costs",
      "To ensure broken circuits still generate alarm signals",
      "To improve signal quality",
      "To make maintenance easier"
    ],
    correctAnswer: 1,
    explanation: "Fail-safe wiring (typically normally-closed contacts) ensures that if a wire breaks or connection fails, the system automatically triggers an alarm condition rather than remaining silent."
  },
  {
    id: 8,
    question: "Why must fire cabling be segregated from standard BMS cabling?",
    options: [
      "To prevent electromagnetic interference between systems",
      "To maintain fire integrity and prevent cross-contamination of safety circuits",
      "To reduce installation complexity",
      "To improve system performance"
    ],
    correctAnswer: 1,
    explanation: "Fire cabling must be segregated to maintain fire integrity, prevent electrical interference with safety-critical circuits, and ensure emergency systems remain operational even if standard BMS cabling is damaged."
  },
  {
    id: 9,
    question: "What commissioning step confirms BMS shutdowns respond to fire signals?",
    options: [
      "Testing individual sensors in isolation",
      "Simulating alarm conditions and checking BMS response",
      "Checking cable continuity only",
      "Reviewing system documentation"
    ],
    correctAnswer: 1,
    explanation: "Simulating actual alarm conditions during commissioning is essential to confirm the BMS responds correctly to fire signals by shutting down equipment and activating emergency functions."
  },
  {
    id: 10,
    question: "In the real-world example, what mistake prevented AHUs from shutting down initially?",
    options: [
      "The fire panel was not powered correctly",
      "Fire panel relay outputs were wired to wrong BMS input terminals",
      "The AHUs were not connected to the BMS",
      "The fire alarm sensors were faulty"
    ],
    correctAnswer: 1,
    explanation: "The fire panel's relay outputs had been wired into the wrong BMS input terminals, so the BMS wasn't receiving the fire alarm signals and couldn't shut down the AHUs as required."
  }
];