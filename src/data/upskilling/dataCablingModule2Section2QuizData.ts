import { QuizQuestion } from '@/types/quiz';

export const dataCablingModule2Section2QuizData: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the main difference between UTP and FTP cables?",
    options: [
      "FTP cables have more wire pairs than UTP",
      "FTP cables include an overall foil shield around all pairs",
      "FTP cables use different connector types",
      "FTP cables support higher frequencies"
    ],
    correctAnswer: 1,
    explanation: "FTP (Foiled Twisted Pair) cables include an overall foil shield around all four pairs, whilst UTP (Unshielded Twisted Pair) relies only on wire twisting for interference protection."
  },
  {
    id: 2,
    question: "Why is proper grounding critical for shielded cables?",
    options: [
      "To meet electrical safety requirements",
      "To prevent the shield from acting as an antenna and picking up more interference",
      "To reduce the cable's electrical resistance",
      "To comply with building regulations"
    ],
    correctAnswer: 1,
    explanation: "Improperly grounded shields can act as antennas, actually picking up more interference than they block. Proper grounding provides a path for interference to be safely dissipated."
  },
  {
    id: 3,
    question: "In which environment would STP cable be most appropriate?",
    options: [
      "Standard office with computers and printers",
      "Residential home network installation",
      "Industrial facility with welding equipment and variable frequency drives",
      "School classroom with basic network requirements"
    ],
    correctAnswer: 2,
    explanation: "STP (Shielded Twisted Pair) provides maximum EMI protection and is most appropriate for high-interference industrial environments with heavy electrical equipment."
  },
  {
    id: 4,
    question: "What is the recommended grounding method for shielded cables?",
    options: [
      "Ground both ends of the shield",
      "Ground at multiple points along the cable run",
      "Single-point grounding, typically at the patch panel end",
      "No grounding is required for modern shielded cables"
    ],
    correctAnswer: 2,
    explanation: "Single-point grounding (typically at the patch panel end) prevents ground loops and circulating currents whilst providing an effective path for interference dissipation."
  },
  {
    id: 5,
    question: "What happens when you mix shielded and unshielded components in the same channel?",
    options: [
      "Performance improves due to partial shielding",
      "The system works normally with reduced EMI protection",
      "The shielding benefits are negated",
      "Only the transmission speed is affected"
    ],
    correctAnswer: 2,
    explanation: "Mixing shielded and unshielded components breaks the shield continuity, negating the EMI protection benefits. All components in a shielded channel must be shielded for proper performance."
  }
];