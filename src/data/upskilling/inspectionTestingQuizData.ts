
import { QuizQuestion } from '@/types/quiz';

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the primary standard that governs electrical inspection and testing in the UK?",
    options: [
      "BS 6423",
      "BS 7671 (IET Wiring Regulations)",
      "BS 7909",
      "Health and Safety at Work Act 1974"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 (IET Wiring Regulations) is the primary standard for electrical installations and their inspection and testing in the UK. This standard sets out the requirements for the design, erection, and verification of electrical installations."
  },
  {
    id: 2,
    question: "Which legislation places a legal duty on employers to maintain electrical systems?",
    options: [
      "Building Regulations Part P",
      "BS 7671",
      "Electricity at Work Regulations 1989",
      "Management of Health and Safety at Work Regulations 1999"
    ],
    correctAnswer: 2,
    explanation: "The Electricity at Work Regulations 1989 place a legal duty on employers (and others in control of electrical systems) to ensure that electrical systems are maintained so as to prevent danger."
  },
  {
    id: 3,
    question: "What type of inspection is carried out on new installations before first use?",
    options: [
      "Periodic Inspection",
      "Condition Report",
      "Initial Verification",
      "Maintenance Check"
    ],
    correctAnswer: 2,
    explanation: "Initial Verification is carried out on new electrical installations before they are put into service. This ensures the installation complies with BS 7671 and is safe for use."
  },
  {
    id: 4,
    question: "Which of the following is NOT typically part of the testing sequence?",
    options: [
      "Continuity of protective conductors",
      "Insulation resistance measurements",
      "Voltage drop calculations",
      "Earth fault loop impedance"
    ],
    correctAnswer: 2,
    explanation: "Voltage drop calculations are typically performed during the design stage, not as part of the testing sequence. The other options are all standard tests performed during inspection and testing procedures."
  },
  {
    id: 5,
    question: "Who can carry out electrical inspection and testing?",
    options: [
      "Anyone with basic electrical knowledge",
      "Only qualified electricians",
      "Competent persons with appropriate knowledge, training and experience",
      "Only those certified by a Competent Person Scheme"
    ],
    correctAnswer: 2,
    explanation: "Inspection and testing must be carried out by competent persons. Competency is defined as having the necessary knowledge, training, and experience to perform the work safely and accurately, not just formal qualifications."
  },
  {
    id: 6,
    question: "According to BS 7671, what is the minimum insulation resistance value for circuits rated up to 500V?",
    options: [
      "0.5 MΩ",
      "1 MΩ",
      "2 MΩ",
      "5 MΩ"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 requires a minimum insulation resistance of 1 MΩ for circuits rated up to 500V. This ensures adequate insulation between live conductors and between live conductors and earth."
  },
  {
    id: 7,
    question: "What document must be issued following satisfactory initial verification?",
    options: [
      "Electrical Installation Condition Report (EICR)",
      "Electrical Installation Certificate (EIC)",
      "Periodic Inspection Report",
      "Minor Electrical Installation Works Certificate"
    ],
    correctAnswer: 1,
    explanation: "An Electrical Installation Certificate (EIC) must be issued following satisfactory initial verification of a new installation or major alterations to an existing installation."
  },
  {
    id: 8,
    question: "Building Regulations Part P applies to electrical work in which type of buildings?",
    options: [
      "All buildings",
      "Commercial buildings only",
      "Dwellings only",
      "Industrial buildings only"
    ],
    correctAnswer: 2,
    explanation: "Building Regulations Part P specifically applies to electrical safety in dwellings (residential buildings). It covers new installations, alterations, and additions in domestic properties."
  },
  {
    id: 9,
    question: "What is the maximum earth fault loop impedance (Zs) for a 32A Type B MCB according to BS 7671?",
    options: [
      "1.44Ω",
      "1.37Ω",
      "2.3Ω",
      "0.87Ω"
    ],
    correctAnswer: 1,
    explanation: "For a 32A Type B MCB, the maximum earth fault loop impedance (Zs) is 1.37Ω. This ensures the protective device will operate within the required disconnection time in the event of an earth fault."
  },
  {
    id: 10,
    question: "Which regulation in the Electricity at Work Regulations 1989 deals with competency?",
    options: [
      "Regulation 4",
      "Regulation 12",
      "Regulation 14",
      "Regulation 16"
    ],
    correctAnswer: 3,
    explanation: "Regulation 16 of the Electricity at Work Regulations 1989 deals with competency, stating that no person shall be engaged in work which requires technical knowledge or experience unless they possess such knowledge or experience, or are under appropriate supervision."
  }
];
