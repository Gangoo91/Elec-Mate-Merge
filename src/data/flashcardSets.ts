
import { Zap, Shield, BookOpen, Tool, AlertTriangle, FileText, Wrench, HardHat } from "lucide-react";

export const flashcardSets = [
  {
    id: "cable-colors",
    title: "Cable Colour Codes",
    icon: Zap,
    description: "UK electrical cable colour identification and applications",
    count: 18,
    difficulty: "beginner" as const,
    estimatedTime: "8-12 min",
    category: "Electrical Theory",
    cards: [
      { 
        front: "What does a brown cable represent in UK electrical installations?", 
        back: "Live (L) conductor in single phase AC systems",
        category: "AC Systems"
      },
      { 
        front: "What does a blue cable represent?", 
        back: "Neutral (N) conductor in AC systems",
        category: "AC Systems"
      },
      { 
        front: "What does green/yellow cable represent?", 
        back: "Earth (E) protective conductor",
        category: "Safety"
      },
      { 
        front: "In a three-phase system, what colour represents L1?", 
        back: "Brown conductor represents L1 (Line 1)",
        category: "Three Phase"
      },
      { 
        front: "In a three-phase system, what colour represents L2?", 
        back: "Black conductor represents L2 (Line 2)",
        category: "Three Phase"
      },
      { 
        front: "In a three-phase system, what colour represents L3?", 
        back: "Grey conductor represents L3 (Line 3)",
        category: "Three Phase"
      },
      { 
        front: "What colour is used for DC positive?", 
        back: "Brown or red for DC positive",
        category: "DC Systems"
      },
      { 
        front: "What colour is used for DC negative?", 
        back: "Blue or black for DC negative",
        category: "DC Systems"
      }
    ]
  },
  {
    id: "eicr-codes",
    title: "EICR Observation Codes",
    icon: FileText,
    description: "Electrical Installation Condition Report classification codes",
    count: 12,
    difficulty: "intermediate" as const,
    estimatedTime: "10-15 min",
    category: "Testing & Inspection",
    cards: [
      { 
        front: "What does C1 observation code mean?", 
        back: "Danger present - immediate remedial action required",
        category: "Critical"
      },
      { 
        front: "What does C2 observation code mean?", 
        back: "Potentially dangerous - urgent remedial action required",
        category: "Urgent"
      },
      { 
        front: "What does C3 observation code mean?", 
        back: "Improvement recommended to enhance safety",
        category: "Advisory"
      },
      { 
        front: "What does FI observation code mean?", 
        back: "Further Investigation required without delay",
        category: "Investigation"
      },
      { 
        front: "What action is required for a C1 code?", 
        back: "Immediate disconnection and remedial work before re-energising",
        category: "Action Required"
      },
      { 
        front: "Can an installation be certified as satisfactory with C2 codes?", 
        back: "No - urgent remedial action must be taken before certification",
        category: "Certification"
      }
    ]
  },
  {
    id: "safety-signs",
    title: "Electrical Safety Signs",
    icon: Shield,
    description: "Warning signs, symbols and their meanings in electrical work",
    count: 15,
    difficulty: "beginner" as const,
    estimatedTime: "6-10 min",
    category: "Health & Safety",
    cards: [
      { 
        front: "What does a red circular sign with diagonal line mean?", 
        back: "Prohibition - something must not be done",
        category: "Prohibition"
      },
      { 
        front: "What does a yellow triangular sign mean?", 
        back: "Warning of hazard or danger",
        category: "Warning"
      },
      { 
        front: "What does a blue circular sign mean?", 
        back: "Mandatory action required",
        category: "Mandatory"
      },
      { 
        front: "What does a green rectangular sign mean?", 
        back: "Safe condition or emergency information",
        category: "Safe Condition"
      },
      { 
        front: "What does the 'Danger High Voltage' sign indicate?", 
        back: "Risk of electric shock from high voltage equipment",
        category: "Electrical Hazard"
      }
    ]
  },
  {
    id: "tools-equipment",
    title: "Electrical Tools & Equipment",
    icon: Tool,
    description: "Essential tools, their uses and safety considerations",
    count: 20,
    difficulty: "beginner" as const,
    estimatedTime: "12-18 min",
    category: "Tools & Equipment",
    cards: [
      { 
        front: "What is a multimeter used for?", 
        back: "Measuring voltage, current, resistance and continuity",
        category: "Testing Equipment"
      },
      { 
        front: "What safety feature should be checked on electrical tools?", 
        back: "PAT testing labels and visual inspection for damage",
        category: "Tool Safety"
      },
      { 
        front: "What is an insulation tester used for?", 
        back: "Testing insulation resistance between conductors",
        category: "Testing Equipment"
      }
    ]
  },
  {
    id: "regulations-bs7671",
    title: "BS 7671 Regulations",
    icon: BookOpen,
    description: "Key requirements from the IET Wiring Regulations",
    count: 25,
    difficulty: "advanced" as const,
    estimatedTime: "15-25 min",
    category: "Regulations",
    cards: [
      { 
        front: "What is the minimum insulation resistance for circuits up to 500V?", 
        back: "1.0 MΩ (megohm) at 500V DC test voltage",
        category: "Testing Requirements"
      },
      { 
        front: "What does Part P of Building Regulations cover?", 
        back: "Electrical safety in dwellings - notification requirements",
        category: "Building Regulations"
      },
      { 
        front: "What is the maximum Zs value for a 32A Type B MCB?", 
        back: "1.44Ω for a 32A Type B circuit breaker",
        category: "Circuit Protection"
      }
    ]
  },
  {
    id: "emergency-procedures",
    title: "Emergency Procedures",
    icon: AlertTriangle,
    description: "Emergency response and first aid for electrical incidents",
    count: 14,
    difficulty: "intermediate" as const,
    estimatedTime: "8-12 min",
    category: "Emergency Response",
    cards: [
      { 
        front: "First action when someone receives an electric shock?", 
        back: "Switch off power supply or isolate the person safely",
        category: "Electric Shock"
      },
      { 
        front: "What should you never use on an electrical fire?", 
        back: "Water - use CO2 or dry powder fire extinguisher",
        category: "Fire Safety"
      },
      { 
        front: "Emergency contact number in the UK?", 
        back: "999 for emergency services (fire, police, ambulance)",
        category: "Emergency Contacts"
      }
    ]
  }
];
