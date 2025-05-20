
interface Flashcard {
  id: string;
  question: string;
  answer: string;
}

interface FlashcardCategory {
  id: string;
  title: string;
  cards: Flashcard[];
}

export const flashcardCategories: FlashcardCategory[] = [
  {
    id: "cable-colors",
    title: "Cable Colors",
    cards: [
      {
        id: "c1",
        question: "What is the color for the Line/Phase conductor in a fixed wiring installation?",
        answer: "Brown"
      },
      {
        id: "c2",
        question: "What is the color for the Neutral conductor in a fixed wiring installation?",
        answer: "Blue"
      },
      {
        id: "c3",
        question: "What is the color for the Earth/CPC conductor in a fixed wiring installation?",
        answer: "Green and Yellow"
      },
      {
        id: "c4",
        question: "What was the old color for the Line/Phase conductor before harmonization?",
        answer: "Red"
      },
      {
        id: "c5",
        question: "What was the old color for the Neutral conductor before harmonization?",
        answer: "Black"
      }
    ]
  },
  {
    id: "regs-references",
    title: "Regulations References",
    cards: [
      {
        id: "r1",
        question: "Maximum Earth Loop Impedance (Zs) for a 32A B type circuit breaker?",
        answer: "1.44Ω"
      },
      {
        id: "r2",
        question: "Maximum Earth Loop Impedance (Zs) for a 20A B type circuit breaker?",
        answer: "2.3Ω"
      },
      {
        id: "r3",
        question: "Maximum disconnection time for a 230V final circuit not exceeding 32A?",
        answer: "0.4 seconds"
      },
      {
        id: "r4",
        question: "Maximum disconnection time for a 230V distribution circuit?",
        answer: "5 seconds"
      },
      {
        id: "r5",
        question: "Which regulation covers basic protection (protection against electric shock)?",
        answer: "Regulation 410 (Chapter 41)"
      }
    ]
  },
  {
    id: "eicr-codes",
    title: "EICR Codes",
    cards: [
      {
        id: "e1",
        question: "What does a C1 code on an EICR mean?",
        answer: "Danger present. Risk of injury. Immediate remedial action required."
      },
      {
        id: "e2",
        question: "What does a C2 code on an EICR mean?",
        answer: "Potentially dangerous. Urgent remedial action required."
      },
      {
        id: "e3",
        question: "What does a C3 code on an EICR mean?",
        answer: "Improvement recommended."
      },
      {
        id: "e4",
        question: "What does FI on an EICR mean?",
        answer: "Further Investigation required."
      },
      {
        id: "e5",
        question: "How soon should a C1 defect be addressed?",
        answer: "Immediately - the danger should be removed at once."
      }
    ]
  },
  {
    id: "ir-values",
    title: "IR Test Values",
    cards: [
      {
        id: "i1",
        question: "Minimum IR value for 230V circuits with test voltage of 500V DC?",
        answer: "1.0 MΩ"
      },
      {
        id: "i2",
        question: "Minimum IR value for circuits up to 500V with test voltage of 500V DC?",
        answer: "1.0 MΩ"
      },
      {
        id: "i3",
        question: "Minimum IR value for circuits above 500V with test voltage of 1000V DC?",
        answer: "1.0 MΩ"
      },
      {
        id: "i4",
        question: "IR test voltage for SELV and PELV circuits?",
        answer: "250V DC"
      },
      {
        id: "i5",
        question: "What factors can affect IR test results?",
        answer: "Temperature, humidity, cable length, parallel paths, connected loads/equipment"
      }
    ]
  }
];

export type { Flashcard, FlashcardCategory };
