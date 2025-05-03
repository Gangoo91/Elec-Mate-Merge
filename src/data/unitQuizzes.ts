
export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // Index of the correct option
}

export interface UnitQuiz {
  unitCode: string;
  questions: QuizQuestion[];
}

// Question pool for ELEC2/01 Health and Safety unit
export const healthAndSafetyQuizzes: UnitQuiz = {
  unitCode: "ELEC2/01",
  questions: [
    {
      id: "hs-q1",
      question: "What is the primary legislation governing electrical safety in the workplace?",
      options: [
        "The Work at Height Regulations 2005",
        "The Health and Safety at Work Act 1974",
        "The Management of Health and Safety at Work Regulations 1992",
        "The Personal Protective Equipment Regulations 2002"
      ],
      correctAnswer: 1
    },
    {
      id: "hs-q2",
      question: "Which of the following specifically addresses electrical safety standards?",
      options: [
        "The Provision and Use of Work Equipment Regulations 1998",
        "The Control of Substances Hazardous to Health Regulations 2002",
        "The Electricity at Work Regulations 1989",
        "The Manual Handling Operations Regulations 1992"
      ],
      correctAnswer: 2
    },
    {
      id: "hs-q3",
      question: "What does RIDDOR stand for?",
      options: [
        "Reporting of Injuries, Diseases and Dangerous Occurrences Regulations",
        "Risk Identification, Detection, Determination and Operational Response",
        "Regional Inspection of Dangerous Devices and Operational Requirements",
        "Risk Identification and Dangerous Device Operational Regulations"
      ],
      correctAnswer: 0
    },
    {
      id: "hs-q4",
      question: "Which of these is NOT one of the five steps in a risk assessment?",
      options: [
        "Identify hazards",
        "Determine who might be harmed",
        "Purchase protective equipment",
        "Review assessment"
      ],
      correctAnswer: 2
    },
    {
      id: "hs-q5",
      question: "What is the correct sequence for safe isolation?",
      options: [
        "Identify circuit, isolate, prove dead, lock off, test",
        "Identify circuit, test, isolate, prove dead, lock off",
        "Test equipment, identify circuit, isolate, lock off, prove dead",
        "Isolate, identify circuit, test equipment, prove dead, lock off"
      ],
      correctAnswer: 0
    },
    {
      id: "hs-q6",
      question: "Which of these is the most effective control measure according to the hierarchy of control?",
      options: [
        "Administrative controls",
        "Personal protective equipment",
        "Engineering controls",
        "Elimination of the hazard"
      ],
      correctAnswer: 3
    },
    {
      id: "hs-q7",
      question: "When working on ladders, what rule should be followed regarding contact points?",
      options: [
        "Two points of contact",
        "Three points of contact",
        "Four points of contact",
        "One hand for the ladder, one for the work"
      ],
      correctAnswer: 1
    },
    {
      id: "hs-q8",
      question: "Which of these is NOT a type of circuit protection device?",
      options: [
        "MCB (Miniature Circuit Breaker)",
        "RCD (Residual Current Device)",
        "PPE (Personal Protective Equipment)",
        "Fuse"
      ],
      correctAnswer: 2
    },
    {
      id: "hs-q9",
      question: "What is the purpose of main equipotential bonding?",
      options: [
        "To provide a path for fault current",
        "To ensure all exposed conductive parts are at the same potential",
        "To protect against overcurrent",
        "To improve circuit efficiency"
      ],
      correctAnswer: 1
    },
    {
      id: "hs-q10",
      question: "What should be verified before using any test equipment?",
      options: [
        "Its purchase date",
        "Its manufacturer",
        "Its calibration status",
        "Its color and design"
      ],
      correctAnswer: 2
    },
    {
      id: "hs-q11",
      question: "Which document is required for high-risk electrical work?",
      options: [
        "Permit-to-work",
        "Purchase order",
        "Installation certificate",
        "Warranty document"
      ],
      correctAnswer: 0
    },
    {
      id: "hs-q12",
      question: "What is the main purpose of PAT testing?",
      options: [
        "To check electrical wiring in buildings",
        "To ensure portable electrical appliances are safe to use",
        "To verify power quality in the supply",
        "To test circuit conductivity"
      ],
      correctAnswer: 1
    },
    {
      id: "hs-q13",
      question: "What does the term 'LOLER' refer to in health and safety?",
      options: [
        "Ladder Operation and Legal Equipment Regulations",
        "Location of Lifting Equipment Requirements",
        "Lifting Operations and Lifting Equipment Regulations",
        "Legal Obligations for Ladder Equipment Rules"
      ],
      correctAnswer: 2
    },
    {
      id: "hs-q14",
      question: "What is the minimum safe distance from overhead power lines when using access equipment?",
      options: [
        "1 meter",
        "3 meters",
        "9 meters",
        "15 meters"
      ],
      correctAnswer: 2
    },
    {
      id: "hs-q15",
      question: "What color is used for electrical danger signs according to the Health and Safety (Safety Signs and Signals) Regulations?",
      options: [
        "Green",
        "Yellow",
        "Blue",
        "Red"
      ],
      correctAnswer: 3
    }
    // Adding 15 questions for now - we can expand this to 50 as needed
  ]
};
