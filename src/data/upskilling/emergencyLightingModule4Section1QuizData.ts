import { QuizQuestion } from '@/types/quiz';

export const emergencyLightingModule4Section1QuizData: QuizQuestion[] = [
  {
    id: 1,
    question: "What type of cable is most commonly used for maximum fire resistance in high-risk installations?",
    options: [
      "Standard PVC twin & earth",
      "Enhanced fire-resistant LSZH (F1)",
      "Mineral Insulated Copper Cable (MICC)",
      "Standard fire-resistant cable (F2)"
    ],
    correctAnswer: 2,
    explanation: "MICC maintains circuit integrity at temperatures exceeding 1,000°C and provides the highest level of fire resistance. It's tested to BS EN 50200 PH classification and is the gold standard for critical installations like hospitals, care homes, and high-rise buildings."
  },
  {
    id: 2,
    question: "What is the survival time requirement for enhanced fire-resistant cable (Category F1)?",
    options: [
      "30 minutes",
      "60 minutes",
      "90 minutes",
      "120 minutes"
    ],
    correctAnswer: 3,
    explanation: "Enhanced fire-resistant cables (Category F1) must survive for 120 minutes under test conditions per BS EN 50200 (PH120 classification), maintaining circuit integrity at 950°C flame temperatures with mechanical shock and water spray applied."
  },
  {
    id: 3,
    question: "Why is LSZH cable often specified in emergency lighting systems?",
    options: [
      "It provides better electrical conductivity",
      "It reduces toxic fumes and smoke opacity in fire conditions",
      "It is cheaper than standard PVC cable",
      "It is easier to install than other cable types"
    ],
    correctAnswer: 1,
    explanation: "LSZH (Low Smoke Zero Halogen) cable minimises smoke opacity and eliminates halogen gases (HCl, HBr) that cause respiratory harm during fires. This is critical for confined spaces, underground areas, and premises with limited ventilation where smoke toxicity is a major hazard."
  },
  {
    id: 4,
    question: "Which BS regulation requires fire-resistant fixings for emergency lighting cables?",
    options: [
      "BS 5266-1 Section 7.2",
      "BS 7671 Regulation 521.10.202",
      "BS EN 50200 Clause 4.3",
      "BS 7629-1 Annex A"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 Regulation 521.10.202 explicitly states that emergency lighting cables must be supported by non-combustible materials throughout their entire run to ensure they maintain integrity during fire conditions."
  },
  {
    id: 5,
    question: "What happens if plastic clips are used to support emergency lighting cables?",
    options: [
      "They provide adequate support if spaced correctly",
      "They melt at 120-180°C causing cables to collapse",
      "They are acceptable for self-contained systems only",
      "They meet regulations if cables are MICC type"
    ],
    correctAnswer: 1,
    explanation: "Plastic clips melt at 120-180°C, typically within 2-3 minutes of fire exposure, causing cables to collapse and potentially block escape routes or damage other circuits. This occurs long before the cable itself would fail, making it the most common failure mode in emergency lighting systems."
  },
  {
    id: 6,
    question: "How long must emergency lighting circuits remain operational in most public buildings?",
    options: [
      "30 minutes minimum",
      "1 hour minimum (3 hours where occupants sleep)",
      "2 hours in all circumstances",
      "Until fire services arrive"
    ],
    correctAnswer: 1,
    explanation: "BS 5266-1 requires minimum 1-hour operation for standard public buildings with rapid evacuation. However, 3-hour duration is mandatory for premises where occupants sleep (hospitals, hotels, care homes) or where immediate evacuation is not possible (high-rise buildings, complex layouts)."
  },
  {
    id: 7,
    question: "Why must emergency circuits be segregated from normal lighting circuits?",
    options: [
      "To reduce electromagnetic interference",
      "To prevent faults from spreading between systems during fire",
      "To simplify voltage drop calculations",
      "It is a recommendation but not mandatory"
    ],
    correctAnswer: 1,
    explanation: "Segregation prevents faults on normal power circuits from damaging emergency lighting cables during a fire. If a fault on the main lighting circuit causes a fire, it must not compromise emergency lighting cables running alongside. Best practice maintains 300mm minimum separation or uses fire-rated barriers."
  },
  {
    id: 8,
    question: "Which system type requires more extensive fire-resistant cabling — self-contained or central battery?",
    options: [
      "Self-contained systems require more cable",
      "Both require the same amount of cabling",
      "Central battery systems require significantly more cable",
      "Neither system requires fire-resistant cable"
    ],
    correctAnswer: 2,
    explanation: "Central battery systems require significantly more extensive fire-resistant cabling (usually enhanced F1 or MICC) because all power originates from a single battery room, necessitating long cable runs throughout the building. Self-contained systems only need local drops to each luminaire with standard F2 often sufficient."
  },
  {
    id: 9,
    question: "Name one method of protecting emergency lighting cables from mechanical damage:",
    options: [
      "Plastic conduit with warning tape",
      "Metal trunking or conduit",
      "Bundling with other services for protection",
      "Surface mounting with identification labels"
    ],
    correctAnswer: 1,
    explanation: "Metal trunking or conduit provides mechanical protection for emergency lighting cables in accessible areas. Other acceptable methods include MICC sheathing in high-risk environments, fire-rated conduit boxes at junction points, and cable protection in ceiling voids where services cross. Plastic containment is not acceptable as it melts during fire."
  },
  {
    id: 10,
    question: "What problem occurred in the London shopping centre case study?",
    options: [
      "Luminaires were incorrectly positioned",
      "Standard PVC cables were used instead of fire-resistant cables",
      "Battery backup was undersized",
      "Lux levels were below minimum requirements"
    ],
    correctAnswer: 1,
    explanation: "The shopping centre used standard PVC cables instead of fire-resistant cables, and cables were supported with plastic clips. Fire Brigade inspection revealed the system would fail within 8-12 minutes of fire exposure (plastic clips failing in 2-3 minutes). Complete rewiring was required at a cost of £80,700 plus £95,000 lost revenue — demonstrating why correct specification is essential from the outset."
  }
];
