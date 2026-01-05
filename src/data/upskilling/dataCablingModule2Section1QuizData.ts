import { QuizQuestion } from '@/types/quiz';

export const dataCablingModule2Section1QuizData: QuizQuestion[] = [
  {
    id: 1,
    question: "Why are the wire pairs twisted in twisted pair cables?",
    options: [
      "To make the cable more flexible and easier to install",
      "To reduce electromagnetic interference and crosstalk between pairs", 
      "To increase the cable's tensile strength",
      "To reduce the overall diameter of the cable"
    ],
    correctAnswer: 1,
    explanation: "Wire pairs are twisted to reduce electromagnetic interference and crosstalk. The twisting creates a balanced transmission line where external interference affects both wires equally, allowing it to be cancelled at the receiver."
  },
  {
    id: 2,
    question: "What is the maximum distance for 10 Gigabit Ethernet over Cat6 cable?",
    options: [
      "100 metres",
      "90 metres", 
      "55 metres",
      "30 metres"
    ],
    correctAnswer: 2,
    explanation: "Cat6 cable supports 10 Gigabit Ethernet up to 55 metres. For the full 100-metre distance at 10 Gbps, Cat6A or higher is required."
  },
  {
    id: 3,
    question: "Which cable category has a bandwidth of 500 MHz and supports 10 Gbps over 100 metres?",
    options: [
      "Cat6",
      "Cat6A",
      "Cat7", 
      "Cat5e"
    ],
    correctAnswer: 1,
    explanation: "Cat6A (Augmented Category 6) has a bandwidth of 500 MHz and supports 10 Gigabit Ethernet over the full 100-metre distance."
  },
  {
    id: 4,
    question: "What is the maximum amount of untwisting allowed at terminations for Cat6 cable?",
    options: [
      "25mm (1 inch)",
      "13mm (0.5 inch)",
      "6mm (0.25 inch)",
      "50mm (2 inches)"
    ],
    correctAnswer: 1,
    explanation: "For Cat6 cable, the maximum untwisting allowed at terminations is 13mm (0.5 inch). Excessive untwisting can significantly degrade performance by increasing crosstalk."
  },
  {
    id: 5,
    question: "Which testing level provides full performance certification to category standards?",
    options: [
      "Level II (Basic qualification)",
      "Level IIE (Enhanced qualification)",
      "Level III (Certification)",
      "Level I (Verification)"
    ],
    correctAnswer: 2,
    explanation: "Level III (Certification) testing provides full performance testing to category standards, verifying that the installation meets all specified parameters for the cable category."
  }
];