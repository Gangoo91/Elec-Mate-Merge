export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const rcdMaintenanceQuizData: QuizQuestion[] = [
  {
    id: 1,
    question: "How often should RCD test buttons be operated by building users?",
    options: [
      "Weekly",
      "Monthly", 
      "Quarterly",
      "Annually"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 recommends monthly test button operation by users to verify basic RCD functionality and maintain user familiarity with the device."
  },
  {
    id: 2,
    question: "What is the minimum retention period for RCD test records?",
    options: [
      "1 year",
      "2 years",
      "3 years",
      "5 years"
    ],
    correctAnswer: 2,
    explanation: "RCD test records should be retained for a minimum of 3 years to demonstrate ongoing compliance and maintenance history."
  },
  {
    id: 3,
    question: "Which maintenance activity requires a qualified electrician?",
    options: [
      "Monthly test button operation",
      "Visual inspection of RCD housing",
      "Annual electrical testing with instruments",
      "Recording test results in logbook"
    ],
    correctAnswer: 2,
    explanation: "Annual electrical testing requires qualified electricians with calibrated test equipment and knowledge of BS 7671 test procedures."
  },
  {
    id: 4,
    question: "What should be done if an RCD fails to trip during test button operation?",
    options: [
      "Try pressing the button harder",
      "Reset the RCD and try again",
      "Contact a qualified electrician immediately",
      "Wait 24 hours and test again"
    ],
    correctAnswer: 2,
    explanation: "Test button failure indicates the RCD may not provide protection. Immediately contact a qualified electrician and consider the protection compromised."
  },
  {
    id: 5,
    question: "What environmental factor most commonly affects RCD performance?",
    options: [
      "Ambient lighting levels",
      "Temperature and humidity",
      "Electromagnetic fields",
      "Air pressure variations"
    ],
    correctAnswer: 1,
    explanation: "Temperature and humidity significantly affect RCD performance, with extreme conditions potentially causing trip time variations and component degradation."
  },
  {
    id: 6,
    question: "When should an RCD be considered for replacement due to age?",
    options: [
      "After 5 years",
      "After 10 years",
      "After 15 years", 
      "After 25 years"
    ],
    correctAnswer: 2,
    explanation: "While RCDs can last longer, consideration for replacement typically begins around 15 years due to component aging and potential reliability concerns."
  },
  {
    id: 7,
    question: "What is the primary purpose of RCD maintenance documentation?",
    options: [
      "To satisfy insurance requirements only",
      "To demonstrate ongoing compliance and safety",
      "To track warranty periods",
      "To plan future electrical work"
    ],
    correctAnswer: 1,
    explanation: "Documentation demonstrates ongoing compliance with regulations, provides evidence of due diligence, and supports safety management systems."
  },
  {
    id: 8,
    question: "Which condition requires immediate RCD replacement?",
    options: [
      "Slight discoloration of housing",
      "Trip time of 250ms at rated current",
      "Complete failure to trip at any test current",
      "Occasional nuisance tripping"
    ],
    correctAnswer: 2,
    explanation: "Complete failure to trip indicates total protection failure and requires immediate replacement as it presents a serious safety risk."
  },
  {
    id: 9,
    question: "How should environmental conditions be recorded during RCD maintenance?",
    options: [
      "Only if problems are found",
      "As part of routine maintenance records",
      "Only in extreme weather",
      "Only for outdoor installations"
    ],
    correctAnswer: 1,
    explanation: "Environmental conditions should be recorded routinely as they affect RCD performance and help identify trends that may impact reliability."
  },
  {
    id: 10,
    question: "What training should building users receive for RCD maintenance?",
    options: [
      "Full electrical testing procedures",
      "Test button operation and emergency procedures",
      "RCD replacement techniques",
      "Complex fault diagnosis methods"
    ],
    correctAnswer: 1,
    explanation: "Users need training on test button operation, recognizing failure symptoms, emergency procedures, and when to contact professionals."
  }
];