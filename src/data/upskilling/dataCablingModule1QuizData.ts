export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export const dataCablingModule1Section1Quiz: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the primary purpose of structured cabling?",
    options: [
      "To reduce cable costs",
      "To provide a standardised telecommunications infrastructure",
      "To increase internet speed",
      "To eliminate the need for wireless networks"
    ],
    correct: 1,
    explanation: "Structured cabling provides a standardised approach to building telecommunications infrastructure that supports multiple applications and can adapt to future technology needs, rather than just focusing on cost reduction or speed."
  },
  {
    id: 2,
    question: "How many subsystems make up a structured cabling system?",
    options: [
      "Four",
      "Five", 
      "Six",
      "Seven"
    ],
    correct: 2,
    explanation: "A structured cabling system consists of six subsystems: horizontal cabling, backbone cabling, work area, telecommunications room, equipment room, and entrance facilities."
  },
  {
    id: 3,
    question: "What is the maximum recommended length for horizontal cabling?",
    options: [
      "50 metres",
      "90 metres",
      "100 metres", 
      "150 metres"
    ],
    correct: 1,
    explanation: "Horizontal cabling should not exceed 90 metres. This allows for up to 10 metres of patch cords (5m at each end) to reach the full 100-metre channel limit for copper cabling."
  },
  {
    id: 4,
    question: "Which cable category supports 10 Gigabit Ethernet for the full 100-metre distance?",
    options: [
      "Cat5e",
      "Cat6",
      "Cat6A",
      "Cat7"
    ],
    correct: 2,
    explanation: "Cat6A (Category 6A) supports 10GBASE-T (10 Gigabit Ethernet) for the full 100-metre horizontal distance. Cat6 only supports 10GBASE-T up to 55 metres."
  },
  {
    id: 5,
    question: "Which standard is the primary North American standard for commercial building cabling?",
    options: [
      "ISO/IEC 11801",
      "TIA-568",
      "IEEE 802.3",
      "ANSI/TIA-942"
    ],
    correct: 1,
    explanation: "TIA-568 is the primary North American standard for commercial building telecommunications cabling. ISO/IEC 11801 is the international equivalent standard."
  }
];