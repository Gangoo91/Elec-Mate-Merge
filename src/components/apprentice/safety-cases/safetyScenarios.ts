
export interface SafetyScenario {
  id: number;
  title: string;
  description: string;
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    feedback: string;
    outcome: string;
    regulation: string;
  }[];
  category: string;
  difficulty: string;
  industry: string;
  riskLevel: string;
  duration: string;
  tags: string[];
}

export const safetyScenarios: SafetyScenario[] = [
  {
    id: 1,
    title: "Electrical Isolation Safety",
    description: "You're working on a lighting circuit in an office building and need to isolate the power safely.",
    question: "Before starting work on the lighting circuit, what is your first priority?",
    options: [
      {
        id: "A",
        text: "Start removing the light fittings immediately",
        isCorrect: false,
        feedback: "Never start electrical work without proper isolation. This could result in electric shock or death.",
        outcome: "Potential electric shock, serious injury or fatality",
        regulation: "Electricity at Work Regulations 1989, Regulation 4"
      },
      {
        id: "B",
        text: "Turn off the lights using the wall switch",
        isCorrect: false,
        feedback: "Wall switches only control the load side and don't guarantee isolation. Live conductors may still be present.",
        outcome: "Risk of electric shock as circuits remain live",
        regulation: "BS 7671:2018 Section 537 - Isolation and Switching"
      },
      {
        id: "C",
        text: "Follow the safe isolation procedure and test the circuit is dead",
        isCorrect: true,
        feedback: "Correct! Safe isolation is fundamental to electrical safety. Always follow the proven dead procedure.",
        outcome: "Safe working environment established",
        regulation: "Electricity at Work Regulations 1989, Regulation 13"
      },
      {
        id: "D",
        text: "Check if anyone is using the lights first",
        isCorrect: false,
        feedback: "While consideration of others is important, this doesn't address the electrical safety requirements.",
        outcome: "Electrical hazards remain uncontrolled",
        regulation: "Management of Health and Safety at Work Regulations 1999"
      }
    ],
    category: "Electrical Safety",
    difficulty: "Beginner",
    industry: "Commercial",
    riskLevel: "High",
    duration: "5 minutes",
    tags: ["isolation", "testing", "basic-safety"]
  },
  {
    id: 2,
    title: "Working at Height",
    description: "You need to install a new light fitting 3 metres above ground level in a warehouse.",
    question: "What is the most appropriate access equipment for this task?",
    options: [
      {
        id: "A",
        text: "Use a wooden chair stacked on a table",
        isCorrect: false,
        feedback: "Improvised access equipment is extremely dangerous and prohibited on construction sites.",
        outcome: "High risk of falls, serious injury or death",
        regulation: "Work at Height Regulations 2005, Regulation 6"
      },
      {
        id: "B",
        text: "Use a properly inspected step ladder with someone footing it",
        isCorrect: true,
        feedback: "Correct! Proper access equipment with adequate support is essential for safe working at height.",
        outcome: "Controlled access to working height with safety measures",
        regulation: "Work at Height Regulations 2005, Regulation 7"
      },
      {
        id: "C",
        text: "Stand on the nearest desk or workbench",
        isCorrect: false,
        feedback: "Furniture is not designed as access equipment and poses significant fall risks.",
        outcome: "Risk of falls and equipment damage",
        regulation: "Workplace (Health, Safety and Welfare) Regulations 1992"
      },
      {
        id: "D",
        text: "Use a damaged ladder that's available on site",
        isCorrect: false,
        feedback: "Damaged equipment must never be used and should be removed from service immediately.",
        outcome: "Equipment failure leading to falls and injury",
        regulation: "Provision and Use of Work Equipment Regulations 1998"
      }
    ],
    category: "Working at Height",
    difficulty: "Intermediate",
    industry: "Industrial",
    riskLevel: "High",
    duration: "7 minutes",
    tags: ["height", "ladders", "access-equipment"]
  },
  {
    id: 3,
    title: "PPE Selection",
    description: "You're about to work on a live switchboard for essential maintenance that cannot be isolated.",
    question: "What PPE is most critical for this high-risk activity?",
    options: [
      {
        id: "A",
        text: "Standard work clothes and safety boots",
        isCorrect: false,
        feedback: "Standard clothing provides no protection against electrical hazards in live working situations.",
        outcome: "No protection against electric shock or arc flash",
        regulation: "Personal Protective Equipment at Work Regulations 1992"
      },
      {
        id: "B",
        text: "Arc flash rated clothing, insulated gloves, and face protection",
        isCorrect: true,
        feedback: "Correct! Live working requires the highest level of PPE protection against electrical hazards.",
        outcome: "Maximum protection against electrical hazards",
        regulation: "Electricity at Work Regulations 1989, Regulation 4"
      },
      {
        id: "C",
        text: "Just insulated gloves",
        isCorrect: false,
        feedback: "Partial protection is inadequate for live working. Complete arc flash protection is required.",
        outcome: "Inadequate protection against arc flash and shock",
        regulation: "BS EN 61482 - Arc Flash Protection"
      },
      {
        id: "D",
        text: "High-vis jacket and hard hat",
        isCorrect: false,
        feedback: "These provide no electrical protection and are inappropriate for live electrical work.",
        outcome: "No electrical protection, high risk of injury",
        regulation: "Construction (Head Protection) Regulations 1989"
      }
    ],
    category: "PPE",
    difficulty: "Advanced",
    industry: "All",
    riskLevel: "Critical",
    duration: "10 minutes",
    tags: ["ppe", "live-working", "arc-flash"]
  },
  {
    id: 4,
    title: "Emergency Response",
    description: "A colleague has received an electric shock and is unconscious but breathing. The power source is unknown.",
    question: "What is your immediate first action?",
    options: [
      {
        id: "A",
        text: "Touch them to check if they're responsive",
        isCorrect: false,
        feedback: "Never touch someone who may still be in contact with electricity. You could become a victim too.",
        outcome: "Risk of secondary electrocution",
        regulation: "Health and Safety (First Aid) Regulations 1981"
      },
      {
        id: "B",
        text: "Turn off the main power supply if safely accessible",
        isCorrect: true,
        feedback: "Correct! Ensuring the area is safe before providing aid prevents additional casualties.",
        outcome: "Scene made safe, enabling effective first aid",
        regulation: "Electricity at Work Regulations 1989, Regulation 4"
      },
      {
        id: "C",
        text: "Pour water on them to wake them up",
        isCorrect: false,
        feedback: "Water conducts electricity and could create additional hazards in an electrical emergency.",
        outcome: "Increased risk of electrocution and complications",
        regulation: "Management of Health and Safety at Work Regulations 1999"
      },
      {
        id: "D",
        text: "Move them away from the electrical equipment immediately",
        isCorrect: false,
        feedback: "Don't touch them until you're certain the power is off. Use a non-conductive object if urgent.",
        outcome: "Risk of electrocution to rescuer",
        regulation: "Health and Safety (First Aid) Regulations 1981"
      }
    ],
    category: "Emergency Response",
    difficulty: "Intermediate",
    industry: "All",
    riskLevel: "Critical",
    duration: "8 minutes",
    tags: ["emergency", "first-aid", "electrical-shock"]
  },
  {
    id: 5,
    title: "Tool Safety Inspection",
    description: "You're about to use a portable electric drill that you've borrowed from another tradesperson.",
    question: "What should you check before using this tool?",
    options: [
      {
        id: "A",
        text: "Just check if it turns on properly",
        isCorrect: false,
        feedback: "A basic function test doesn't identify potential electrical safety hazards that could cause injury.",
        outcome: "Hidden defects may cause electric shock or fire",
        regulation: "Provision and Use of Work Equipment Regulations 1998"
      },
      {
        id: "B",
        text: "Visually inspect the cable, plug, and casing for damage",
        isCorrect: true,
        feedback: "Correct! Visual inspection of portable electrical equipment is essential before each use.",
        outcome: "Potential hazards identified before use",
        regulation: "Electricity at Work Regulations 1989, Regulation 4"
      },
      {
        id: "C",
        text: "Ask the other person if it's working fine",
        isCorrect: false,
        feedback: "You must make your own safety checks. Others may not notice defects or safety issues.",
        outcome: "Reliance on others' judgment may miss critical defects",
        regulation: "Management of Health and Safety at Work Regulations 1999"
      },
      {
        id: "D",
        text: "Use it immediately since it belongs to a qualified person",
        isCorrect: false,
        feedback: "Tools can be damaged between uses. Always inspect equipment regardless of ownership.",
        outcome: "Risk of using defective equipment",
        regulation: "Provision and Use of Work Equipment Regulations 1998"
      }
    ],
    category: "Tool Safety",
    difficulty: "Beginner",
    industry: "All",
    riskLevel: "Medium",
    duration: "6 minutes",
    tags: ["tools", "inspection", "portable-equipment"]
  },
  {
    id: 6,
    title: "Confined Space Working",
    description: "You need to install electrical equipment in a basement plant room with limited ventilation and only one exit.",
    question: "What safety precautions are essential before entering this space?",
    options: [
      {
        id: "A",
        text: "Enter immediately as it's just a basement",
        isCorrect: false,
        feedback: "Basements can be confined spaces with serious hazards including toxic gases and oxygen depletion.",
        outcome: "Risk of asphyxiation or exposure to toxic gases",
        regulation: "Confined Spaces Regulations 1997"
      },
      {
        id: "B",
        text: "Test the atmosphere and ensure someone knows your location",
        isCorrect: true,
        feedback: "Correct! Atmospheric testing and communication procedures are vital for confined space safety.",
        outcome: "Hazards identified and safety measures in place",
        regulation: "Confined Spaces Regulations 1997, Regulation 4"
      },
      {
        id: "C",
        text: "Open windows to improve ventilation",
        isCorrect: false,
        feedback: "While ventilation helps, this doesn't address all confined space hazards like gas testing and rescue procedures.",
        outcome: "Incomplete safety measures leave significant risks",
        regulation: "Workplace (Health, Safety and Welfare) Regulations 1992"
      },
      {
        id: "D",
        text: "Work quickly to minimise time in the space",
        isCorrect: false,
        feedback: "Speed doesn't eliminate confined space hazards and may increase risks through poor decision-making.",
        outcome: "Rushing increases accident risk in hazardous environment",
        regulation: "Management of Health and Safety at Work Regulations 1999"
      }
    ],
    category: "Confined Spaces",
    difficulty: "Advanced",
    industry: "Industrial",
    riskLevel: "High",
    duration: "12 minutes",
    tags: ["confined-spaces", "atmosphere-testing", "emergency-procedures"]
  },
  {
    id: 7,
    title: "COSHH Assessment",
    description: "You're installing wiring in an area where chemical cleaning products are stored and used regularly.",
    question: "What is your primary concern regarding electrical work in this environment?",
    options: [
      {
        id: "A",
        text: "The chemicals might stain your clothes",
        isCorrect: false,
        feedback: "Cosmetic concerns are secondary to serious health and safety risks from chemical exposure.",
        outcome: "Serious health hazards remain unaddressed",
        regulation: "Control of Substances Hazardous to Health Regulations 2002"
      },
      {
        id: "B",
        text: "Chemical vapours may be flammable or toxic",
        isCorrect: true,
        feedback: "Correct! Chemical vapours can create fire/explosion risks and health hazards requiring special precautions.",
        outcome: "Chemical hazards properly assessed and controlled",
        regulation: "COSHH Regulations 2002, Regulation 6"
      },
      {
        id: "C",
        text: "The smell might be unpleasant",
        isCorrect: false,
        feedback: "Unpleasant odours may indicate serious chemical hazards that require proper risk assessment.",
        outcome: "Potentially serious exposure risks ignored",
        regulation: "Control of Substances Hazardous to Health Regulations 2002"
      },
      {
        id: "D",
        text: "It will take longer to complete the work",
        isCorrect: false,
        feedback: "Time concerns are irrelevant when chemical hazards may cause serious injury or ill health.",
        outcome: "Health risks prioritised below convenience",
        regulation: "Management of Health and Safety at Work Regulations 1999"
      }
    ],
    category: "COSHH",
    difficulty: "Intermediate",
    industry: "Commercial",
    riskLevel: "Medium",
    duration: "9 minutes",
    tags: ["chemicals", "hazardous-substances", "risk-assessment"]
  },
  {
    id: 8,
    title: "Excavation Safety",
    description: "You need to install underground electrical cables. A 1.5-meter deep trench has been dug by another contractor.",
    question: "Before entering the trench to lay cables, what must you verify?",
    options: [
      {
        id: "A",
        text: "The trench is the right depth for the cables",
        isCorrect: false,
        feedback: "While depth matters for installation, trench safety is the immediate life-threatening concern.",
        outcome: "Risk of trench collapse causing fatal crushing",
        regulation: "Construction (Design and Management) Regulations 2015"
      },
      {
        id: "B",
        text: "The trench is properly supported and safe to enter",
        isCorrect: true,
        feedback: "Correct! Trench collapse kills more construction workers than any other excavation-related accident.",
        outcome: "Trench stability verified, safe working conditions",
        regulation: "Construction (Design and Management) Regulations 2015"
      },
      {
        id: "C",
        text: "You have the right cable laying tools",
        isCorrect: false,
        feedback: "Having proper tools is important but secondary to ensuring the excavation won't collapse.",
        outcome: "Risk of fatal injury from trench collapse",
        regulation: "Provision and Use of Work Equipment Regulations 1998"
      },
      {
        id: "D",
        text: "The weather conditions are suitable",
        isCorrect: false,
        feedback: "Weather can affect trench stability, but proper support systems are the primary safety requirement.",
        outcome: "Inadequate attention to primary structural hazards",
        regulation: "Construction (Design and Management) Regulations 2015"
      }
    ],
    category: "Excavation Safety",
    difficulty: "Advanced",
    industry: "Construction",
    riskLevel: "Critical",
    duration: "11 minutes",
    tags: ["excavation", "trenches", "underground-cables"]
  },
  {
    id: 9,
    title: "Site Communication",
    description: "You discover a potentially dangerous electrical installation while working on site, but your supervisor is in a meeting.",
    question: "How should you handle this safety concern?",
    options: [
      {
        id: "A",
        text: "Wait until the supervisor is available to discuss it",
        isCorrect: false,
        feedback: "Safety concerns should never be delayed. Immediate action prevents potential accidents.",
        outcome: "Hazard remains uncontrolled, risk of accidents",
        regulation: "Safety Representatives and Safety Committees Regulations 1977"
      },
      {
        id: "B",
        text: "Make the area safe and report it immediately to any available supervisor",
        isCorrect: true,
        feedback: "Correct! Safety always takes priority. Secure the hazard and report through available channels.",
        outcome: "Immediate hazard control and proper reporting",
        regulation: "Management of Health and Safety at Work Regulations 1999"
      },
      {
        id: "C",
        text: "Continue working but avoid that area",
        isCorrect: false,
        feedback: "Avoiding the hazard doesn't protect others. Safety issues must be reported and addressed.",
        outcome: "Hazard remains for others, potential for accidents",
        regulation: "Health and Safety at Work etc. Act 1974"
      },
      {
        id: "D",
        text: "Fix the problem yourself to save time",
        isCorrect: false,
        feedback: "Only attempt repairs if you're competent and authorised. Improper repairs can create greater hazards.",
        outcome: "Risk of making situation worse or creating new hazards",
        regulation: "Electricity at Work Regulations 1989, Regulation 16"
      }
    ],
    category: "Site Communication",
    difficulty: "Beginner",
    industry: "Construction",
    riskLevel: "Medium",
    duration: "7 minutes",
    tags: ["communication", "reporting", "hazard-identification"]
  },
  {
    id: 10,
    title: "Manual Handling",
    description: "You need to move a heavy electrical panel (approximately 40kg) from the delivery truck to the installation location on the second floor.",
    question: "What is the safest approach for this task?",
    options: [
      {
        id: "A",
        text: "Lift it yourself using proper lifting technique",
        isCorrect: false,
        feedback: "40kg exceeds safe manual lifting limits. Even with good technique, this risks serious back injury.",
        outcome: "High risk of musculoskeletal injury",
        regulation: "Manual Handling Operations Regulations 1992"
      },
      {
        id: "B",
        text: "Get help from colleagues and use mechanical aids where possible",
        isCorrect: true,
        feedback: "Correct! Team lifting and mechanical aids reduce individual load and injury risk significantly.",
        outcome: "Load shared safely, reduced injury risk",
        regulation: "Manual Handling Operations Regulations 1992, Regulation 4"
      },
      {
        id: "C",
        text: "Drag it along the floor to avoid lifting",
        isCorrect: false,
        feedback: "Dragging can damage the equipment and still cause back strain from awkward postures.",
        outcome: "Equipment damage and potential back injury",
        regulation: "Workplace (Health, Safety and Welfare) Regulations 1992"
      },
      {
        id: "D",
        text: "Break it down into smaller pieces first",
        isCorrect: false,
        feedback: "Electrical panels shouldn't be disassembled unnecessarily as this can affect safety and functionality.",
        outcome: "Risk of equipment damage and safety compromise",
        regulation: "Provision and Use of Work Equipment Regulations 1998"
      }
    ],
    category: "Manual Handling",
    difficulty: "Beginner",
    industry: "All",
    riskLevel: "Medium",
    duration: "8 minutes",
    tags: ["manual-handling", "team-lifting", "mechanical-aids"]
  }
];
