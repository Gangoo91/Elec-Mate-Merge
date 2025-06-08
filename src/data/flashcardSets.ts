
import { BookOpen, Zap, Shield, Settings, Eye, AlertTriangle, Wrench, TestTube, FileText, Calculator, Lightbulb, Target } from "lucide-react";

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  category?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export interface FlashcardSet {
  id: string;
  title: string;
  icon: any;
  description: string;
  count: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  category: string;
  completed?: boolean;
  progressPercentage?: number;
  lastStudied?: string;
  masteredCards?: number;
  cards: Flashcard[];
}

export const flashcardSets: FlashcardSet[] = [
  {
    id: "safety-basics",
    title: "Health & Safety Fundamentals",
    icon: Shield,
    description: "Essential workplace safety knowledge for electrical work",
    count: 25,
    difficulty: 'beginner',
    estimatedTime: "15-20 mins",
    category: "Health & Safety",
    progressPercentage: 75,
    lastStudied: "2 days ago",
    masteredCards: 18,
    cards: [
      {
        id: "safety-1",
        front: "What is the first step before starting any electrical work?",
        back: "Always ensure the circuit is safely isolated and tested dead using a suitable voltage tester.",
        category: "Safety Procedures",
        difficulty: "easy"
      },
      {
        id: "safety-2",
        front: "What PPE must be worn when working with electrical equipment?",
        back: "Safety boots, safety glasses, hard hat, and appropriate gloves rated for electrical work.",
        category: "Personal Protective Equipment",
        difficulty: "easy"
      },
      {
        id: "safety-3",
        front: "What does HASAWA stand for?",
        back: "Health and Safety at Work Act - the primary legislation covering workplace safety in the UK.",
        category: "Legislation",
        difficulty: "medium"
      },
      {
        id: "safety-4",
        front: "What is the purpose of an RCD?",
        back: "Residual Current Device - protects against electric shock by detecting earth leakage current and disconnecting the supply.",
        category: "Protective Devices",
        difficulty: "medium"
      },
      {
        id: "safety-5",
        front: "What is the maximum time an RCD should trip at rated current?",
        back: "30 milliseconds for general purpose RCDs rated at 30mA.",
        category: "Testing Standards",
        difficulty: "hard"
      }
    ]
  },
  {
    id: "bs7671-regs",
    title: "BS 7671 Wiring Regulations",
    icon: BookOpen,
    description: "Key regulations and standards for electrical installations",
    count: 30,
    difficulty: 'intermediate',
    estimatedTime: "20-25 mins",
    category: "Regulations",
    progressPercentage: 40,
    lastStudied: "1 week ago",
    masteredCards: 12,
    cards: [
      {
        id: "bs7671-1",
        front: "What is the current edition of BS 7671?",
        back: "The 18th Edition (2018), incorporating Amendment 2:2022.",
        category: "Standards",
        difficulty: "easy"
      },
      {
        id: "bs7671-2",
        front: "What does Part 1 of BS 7671 cover?",
        back: "Scope, object and fundamental principles including protection for safety.",
        category: "Structure",
        difficulty: "medium"
      },
      {
        id: "bs7671-3",
        front: "What is the maximum voltage drop allowed in final circuits?",
        back: "3% for lighting circuits and 5% for other uses under normal service conditions.",
        category: "Design Requirements",
        difficulty: "hard"
      },
      {
        id: "bs7671-4",
        front: "What does protective bonding achieve?",
        back: "It connects exposed-conductive-parts and extraneous-conductive-parts to create an equipotential zone.",
        category: "Protection",
        difficulty: "medium"
      },
      {
        id: "bs7671-5",
        front: "What is the minimum insulation resistance for circuits up to 500V?",
        back: "1.0 MΩ when tested at 500V DC.",
        category: "Testing",
        difficulty: "hard"
      }
    ]
  },
  {
    id: "testing-inspection",
    title: "Testing & Inspection Procedures",
    icon: TestTube,
    description: "Comprehensive testing methods and inspection techniques",
    count: 35,
    difficulty: 'advanced',
    estimatedTime: "25-30 mins",
    category: "Testing & Inspection",
    cards: [
      {
        id: "testing-1",
        front: "What is the correct sequence for electrical testing?",
        back: "1. Continuity of protective conductors, 2. Continuity of ring final circuit conductors, 3. Insulation resistance, 4. Polarity, 5. Earth electrode resistance, 6. Earth fault loop impedance, 7. RCD operation.",
        category: "Test Sequence",
        difficulty: "hard"
      },
      {
        id: "testing-2",
        front: "What test voltage is used for insulation resistance testing on 230V circuits?",
        back: "500V DC for circuits rated up to 500V with a minimum acceptable resistance of 1.0 MΩ.",
        category: "Insulation Testing",
        difficulty: "medium"
      },
      {
        id: "testing-3",
        front: "How do you test the continuity of a ring final circuit?",
        back: "Test end-to-end resistance of live, neutral, and earth conductors, then cross-connect and test between live-neutral, live-earth, and neutral-earth at each socket.",
        category: "Continuity Testing",
        difficulty: "hard"
      },
      {
        id: "testing-4",
        front: "What is Ze in electrical testing?",
        back: "Ze is the earth fault loop impedance external to the installation, measured from the main earthing terminal to the electricity supplier's transformer earth.",
        category: "Earth Testing",
        difficulty: "medium"
      },
      {
        id: "testing-5",
        front: "What should you check during a visual inspection?",
        back: "Correct selection and erection of equipment, identification of conductors, selection of protective devices, presence of safety signs and labels, and evidence of damage or deterioration.",
        category: "Visual Inspection",
        difficulty: "easy"
      }
    ]
  },
  {
    id: "electrical-theory",
    title: "Electrical Theory Fundamentals",
    icon: Zap,
    description: "Core electrical principles and calculations",
    count: 28,
    difficulty: 'beginner',
    estimatedTime: "18-22 mins",
    category: "Theory",
    cards: [
      {
        id: "theory-1",
        front: "State Ohm's Law",
        back: "Voltage (V) = Current (I) × Resistance (R), or V = I × R",
        category: "Basic Laws",
        difficulty: "easy"
      },
      {
        id: "theory-2",
        front: "What is the relationship between power, voltage, and current?",
        back: "Power (P) = Voltage (V) × Current (I), or P = V × I",
        category: "Power Calculations",
        difficulty: "easy"
      },
      {
        id: "theory-3",
        front: "What is impedance in AC circuits?",
        back: "Impedance (Z) is the total opposition to current flow in AC circuits, combining resistance (R) and reactance (X). Z = √(R² + X²)",
        category: "AC Theory",
        difficulty: "hard"
      },
      {
        id: "theory-4",
        front: "What is the difference between RMS and peak values in AC?",
        back: "RMS (Root Mean Square) is the effective value equal to peak value ÷ √2. For UK mains: Peak = 325V, RMS = 230V",
        category: "AC Measurements",
        difficulty: "medium"
      },
      {
        id: "theory-5",
        front: "What causes power factor in electrical circuits?",
        back: "Power factor is caused by the phase difference between voltage and current in AC circuits, typically due to inductive or capacitive loads.",
        category: "Power Factor",
        difficulty: "medium"
      }
    ]
  },
  {
    id: "cable-selection",
    title: "Cable Selection & Sizing",
    icon: Settings,
    description: "Proper cable selection methods and calculations",
    count: 32,
    difficulty: 'intermediate',
    estimatedTime: "22-28 mins",
    category: "Installation Design",
    cards: [
      {
        id: "cable-1",
        front: "What factors affect cable current carrying capacity?",
        back: "Installation method, ambient temperature, grouping factors, thermal insulation, and cable construction type.",
        category: "Current Capacity",
        difficulty: "medium"
      },
      {
        id: "cable-2",
        front: "What is the difference between Ib, In, and Iz in cable sizing?",
        back: "Ib = design current, In = nominal rating of protective device, Iz = current carrying capacity of cable. Must satisfy: Ib ≤ In ≤ Iz",
        category: "Design Current",
        difficulty: "hard"
      },
      {
        id: "cable-3",
        front: "What is voltage drop and why is it important?",
        back: "Voltage drop is the reduction in voltage along a cable due to its resistance. Excessive voltage drop can cause equipment malfunction and energy losses.",
        category: "Voltage Drop",
        difficulty: "medium"
      },
      {
        id: "cable-4",
        front: "What cable types are suitable for outdoor underground installation?",
        back: "SWA (Steel Wire Armoured) cables or cables in suitable underground ducting systems with appropriate mechanical protection.",
        category: "Installation Methods",
        difficulty: "medium"
      },
      {
        id: "cable-5",
        front: "What is the purpose of cable armouring?",
        back: "Provides mechanical protection against impact and compression, and can serve as the circuit protective conductor (CPC) when properly connected.",
        category: "Cable Construction",
        difficulty: "easy"
      }
    ]
  }
];
