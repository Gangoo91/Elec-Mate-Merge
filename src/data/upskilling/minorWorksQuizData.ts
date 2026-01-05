import { QuizQuestion } from '@/components/quiz/types';

export const minorWorksQuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Which of the following work types is appropriate for a Minor Works Certificate?",
    options: [
      "Complete rewiring of a domestic property",
      "Installation of a new consumer unit",
      "Adding a single socket outlet to an existing circuit",
      "Three-phase industrial installation"
    ],
    correctAnswer: 2,
    explanation: "Adding a single socket outlet to an existing circuit is appropriate for MEIWC as it's a small addition that doesn't significantly alter installation characteristics. Complete rewiring, new consumer units, and complex industrial work require full EIC certification."
  },
  {
    id: 2,
    question: "What is the minimum insulation resistance requirement for circuits ≤500V when completing a Minor Works Certificate?",
    options: [
      "≥0.5MΩ",
      "≥1MΩ",
      "≥2MΩ",
      "≥5MΩ"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 requires minimum insulation resistance of ≥1MΩ for circuits ≤500V. This applies to minor works testing as well as full installation testing."
  },
  {
    id: 3,
    question: "Who can sign and issue a Minor Works Certificate?",
    options: [
      "Any qualified electrician",
      "Only a Part P registered electrician",  
      "A competent person in both installation and testing work",
      "Building Control officers only"
    ],
    correctAnswer: 2,
    explanation: "The person completing the MEIWC must be competent in both installation and testing work, as they take responsibility for all aspects of the minor works performed."
  },
  {
    id: 4,
    question: "Which test is NOT typically required for minor works certification?",
    options: [
      "Continuity of protective conductors",
      "Insulation resistance testing",
      "Phase sequence testing",
      "Polarity verification"
    ],
    correctAnswer: 2,
    explanation: "Phase sequence testing is only required for three-phase installations, which would typically exceed minor works scope and require full EIC certification."
  },
  {
    id: 5,
    question: "What is the maximum operating time for RCD protection at 5×IΔn during minor works testing?",
    options: [
      "300ms",
      "200ms", 
      "40ms",
      "30ms"
    ],
    correctAnswer: 2,
    explanation: "RCD operating time at 5×IΔn must be ≤40ms for socket outlet circuits. At 1×IΔn, the maximum is 300ms."
  },
  {
    id: 6,
    question: "Which limitation would make work unsuitable for Minor Works Certificate?",
    options: [
      "Work requires load calculations and design assessment",
      "Single additional socket outlet on existing circuit",
      "Like-for-like accessory replacement",
      "Single additional lighting point"
    ],
    correctAnswer: 0,
    explanation: "Work requiring design calculations, load assessments, or significant installation modifications exceeds minor works scope and requires full EIC certification."
  },
  {
    id: 7,
    question: "How long must Minor Works Certificates be retained?",
    options: [
      "2 years",
      "5 years",
      "10 years",
      "For the life of the installation"
    ],
    correctAnswer: 3,
    explanation: "Minor Works Certificates must be retained for the life of the installation and made available for inspection by subsequent electricians, building control, and other authorities."
  },
  {
    id: 8,
    question: "When adding a socket outlet to an existing ring final circuit, what must be verified?",
    options: [
      "Only the new socket outlet operation",
      "Circuit has adequate capacity and existing protection is suitable",
      "Main earthing conductor size",
      "Whole installation condition"
    ],
    correctAnswer: 1,
    explanation: "When adding to existing circuits, you must verify the circuit has adequate capacity, existing protection is suitable, and no design changes are required to maintain safety."
  },
  {
    id: 9,
    question: "Which Building Regulations notification is typically required for minor electrical work?",
    options: [
      "All minor works must be notified",
      "No notification required if installer is registered with competent person scheme",
      "Only work in special locations requires notification",
      "Notification always required regardless of installer registration"
    ],
    correctAnswer: 1,
    explanation: "Minor works by registered competent persons typically don't require Building Regulations notification, though work in special locations or involving consumer units may still need notification."
  },
  {
    id: 10,
    question: "What should be done if work scope exceeds minor works limitations during installation?",
    options: [
      "Continue with Minor Works Certificate anyway",  
      "Stop work and complete under appropriate EIC certification",
      "Split the work across multiple Minor Works Certificates",
      "Ignore the limitations and complete the work"
    ],
    correctAnswer: 1,
    explanation: "If work scope exceeds minor works limitations during installation, stop the minor works process and complete the additional work under appropriate certification (usually EIC) to ensure proper documentation and compliance."
  }
];