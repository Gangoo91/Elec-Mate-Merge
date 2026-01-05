import { QuizQuestion } from '@/types/quiz';

export const emergencyLightingModule6Section1QuizData: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the main purpose of BS 5266-1?",
    options: [
      "To define photometric performance only",
      "To provide a code of practice for emergency lighting design, installation, and maintenance",
      "To specify exit sign requirements only",
      "To replace building regulations"
    ],
    correctAnswer: 1,
    explanation: "BS 5266-1 is a comprehensive code of practice covering the design, installation, and maintenance of emergency lighting systems, not just performance criteria."
  },
  {
    id: 2,
    question: "What does EN 1838 focus on?",
    options: [
      "Installation methods only",
      "Photometric performance criteria (light levels and duration)",
      "Maintenance schedules only",
      "Fire alarm integration"
    ],
    correctAnswer: 1,
    explanation: "EN 1838 specifically defines the photometric performance requirements including illuminance levels, uniformity, duration, and visibility."
  },
  {
    id: 3,
    question: "What is the minimum illuminance required for escape routes?",
    options: [
      "0.5 lux",
      "1 lux",
      "5 lux",
      "15 lux"
    ],
    correctAnswer: 1,
    explanation: "EN 1838 requires a minimum of 1 lux along the centre line of escape routes to ensure safe evacuation."
  },
  {
    id: 4,
    question: "What is the minimum illuminance for open areas (anti-panic lighting)?",
    options: [
      "0.1 lux",
      "0.5 lux",
      "1 lux",
      "2 lux"
    ],
    correctAnswer: 1,
    explanation: "Open areas require a minimum of 0.5 lux on the floor area to prevent panic and enable safe movement."
  },
  {
    id: 5,
    question: "What is the minimum required duration for emergency lighting in public buildings?",
    options: [
      "30 minutes",
      "1 hour",
      "2 hours",
      "3 hours"
    ],
    correctAnswer: 3,
    explanation: "Public and high-risk buildings typically require 3 hours duration, whilst 1 hour is the minimum for other premises."
  },
  {
    id: 6,
    question: "Which clause in BS 5266-1 deals with testing and inspection?",
    options: [
      "Clause 4",
      "Clause 6",
      "Clause 8",
      "Clause 10"
    ],
    correctAnswer: 3,
    explanation: "Clause 10 covers inspection, testing, and maintenance regime, with reference to BS 5266-8 (EN 50172)."
  },
  {
    id: 7,
    question: "Why is uniformity important in emergency lighting design?",
    options: [
      "To save energy",
      "To reduce costs",
      "To avoid large variations between bright and dark areas that could impair visibility",
      "To comply with building aesthetics"
    ],
    correctAnswer: 2,
    explanation: "Uniformity (max/min ratio < 40:1) prevents dangerous dark spots that could hinder safe evacuation and cause disorientation."
  },
  {
    id: 8,
    question: "What type of documentation proves compliance with BS 5266-1?",
    options: [
      "Invoice only",
      "Photographs only",
      "Design calculations, as-built drawings, certificates, and maintenance schedules",
      "Verbal confirmation"
    ],
    correctAnswer: 2,
    explanation: "Comprehensive documentation including calculations, drawings, signed certificates, and maintenance schedules is essential to prove compliance."
  },
  {
    id: 9,
    question: "Why can a system that works still fail compliance?",
    options: [
      "Because it's too expensive",
      "Because it lacks proper documentation and standards referencing",
      "Because it's too bright",
      "Because it uses LED technology"
    ],
    correctAnswer: 1,
    explanation: "Without proper documentation, design calculations, and standards referencing, even a functioning system is deemed non-compliant."
  },
  {
    id: 10,
    question: "What was the main issue found in the Manchester case study?",
    options: [
      "The lights didn't work",
      "Inadequate illumination levels",
      "Missing documentation and standards referencing despite adequate performance",
      "Wrong colour temperature"
    ],
    correctAnswer: 2,
    explanation: "The system achieved adequate illumination but failed audit because documentation didn't reference EN 1838's specific lux levels or include test data, requiring redesign and re-certification."
  }
];
