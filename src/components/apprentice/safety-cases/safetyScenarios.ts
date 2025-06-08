
export interface SafetyScenario {
  id: number;
  title: string;
  description: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  industry: string;
  riskLevel: "Low" | "Medium" | "High" | "Critical";
  duration: string;
  tags: string[];
  scenario: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    feedback: string;
  }[];
  learningOutcomes: string[];
}

export const scenarioCategories = [
  "Electrical Shock",
  "Arc Flash",
  "Working at Height",
  "Tool Safety", 
  "Site Safety",
  "Risk Assessment",
  "PPE Usage",
  "Emergency Response"
];

export const difficultyLevels = ["Beginner", "Intermediate", "Advanced"];

export const industryTypes = [
  "All",
  "Domestic",
  "Commercial", 
  "Industrial",
  "Construction",
  "Maintenance"
];

export const riskLevels = ["Low", "Medium", "High", "Critical"];

export const safetyScenarios: SafetyScenario[] = [
  {
    id: 1,
    title: "Live Wire Contact in Domestic Property",
    description: "An apprentice encounters an exposed live wire while working on a domestic installation.",
    category: "Electrical Shock",
    difficulty: "Beginner",
    industry: "Domestic",
    riskLevel: "Critical",
    duration: "5 mins",
    tags: ["live wire", "domestic", "shock", "PPE"],
    scenario: "You're working on a domestic rewire and notice an exposed live wire that wasn't properly isolated. The homeowner is nearby and there's water on the floor from a recent leak. What's your immediate action?",
    options: [
      {
        id: "a",
        text: "Quickly grab the wire with insulated pliers to secure it",
        isCorrect: false,
        feedback: "Never touch live conductors, even with tools. Always isolate first."
      },
      {
        id: "b", 
        text: "Immediately turn off the main supply and secure the area",
        isCorrect: true,
        feedback: "Correct! Always isolate the supply first and ensure the area is safe."
      },
      {
        id: "c",
        text: "Warn the homeowner and continue working carefully around it",
        isCorrect: false,
        feedback: "This puts everyone at risk. The circuit must be made safe immediately."
      }
    ],
    learningOutcomes: [
      "Understanding safe isolation procedures",
      "Risk assessment in domestic environments",
      "Emergency response protocols"
    ]
  },
  {
    id: 2,
    title: "Arc Flash During Panel Inspection",
    description: "While performing routine inspection on a commercial panel, you notice signs of potential arc flash risk.",
    category: "Arc Flash",
    difficulty: "Advanced",
    industry: "Commercial",
    riskLevel: "Critical", 
    duration: "7 mins",
    tags: ["arc flash", "commercial", "inspection", "PPE"],
    scenario: "During a commercial panel inspection, you notice burn marks, loose connections, and hear crackling sounds. The panel is energised and client operations depend on this supply. What's your approach?",
    options: [
      {
        id: "a",
        text: "Quickly tighten the loose connections while the panel is live",
        isCorrect: false,
        feedback: "Never work on live equipment showing signs of arcing. This could trigger an arc flash."
      },
      {
        id: "b",
        text: "De-energise the panel, don appropriate arc flash PPE, and investigate safely",
        isCorrect: true,
        feedback: "Correct! Arc flash risks require proper PPE and de-energisation before investigation."
      },
      {
        id: "c",
        text: "Continue the inspection but stand further back from the panel",
        isCorrect: false,
        feedback: "Distance alone won't protect from arc flash. Proper procedures must be followed."
      }
    ],
    learningOutcomes: [
      "Arc flash hazard recognition",
      "Appropriate PPE selection",
      "Commercial safety protocols"
    ]
  },
  {
    id: 3,
    title: "Ladder Safety on Construction Site",
    description: "Setting up access equipment for electrical installation work at height on a busy construction site.",
    category: "Working at Height",
    difficulty: "Intermediate",
    industry: "Construction",
    riskLevel: "High",
    duration: "6 mins",
    tags: ["ladder", "height", "construction", "access"],
    scenario: "You need to install lighting circuits at 4 metres height on a construction site. Other trades are working nearby with overhead crane operations. How do you ensure safe access?",
    options: [
      {
        id: "a",
        text: "Use a ladder and work quickly between crane movements",
        isCorrect: false,
        feedback: "Working around overhead operations requires proper coordination and safer access methods."
      },
      {
        id: "b",
        text: "Request scaffold or MEWP access and coordinate with site management",
        isCorrect: true,
        feedback: "Correct! Proper access equipment and site coordination are essential for safety."
      },
      {
        id: "c",
        text: "Wait until all other trades have finished their work",
        isCorrect: false,
        feedback: "While coordination is important, proper access methods can allow safe concurrent working."
      }
    ],
    learningOutcomes: [
      "Work at height regulations",
      "Site coordination procedures",
      "Access equipment selection"
    ]
  },
  {
    id: 4,
    title: "Faulty Power Tool Detection",
    description: "Discovering a power tool with damaged casing and exposed conductors during routine work.",
    category: "Tool Safety",
    difficulty: "Beginner",
    industry: "All",
    riskLevel: "Medium",
    duration: "4 mins",
    tags: ["power tools", "PAT", "inspection", "maintenance"],
    scenario: "You pick up a power drill and notice the casing is cracked with visible internal wiring. The tool was working yesterday and you need it to complete urgent work. What do you do?",
    options: [
      {
        id: "a",
        text: "Use the tool carefully, avoiding the damaged area",
        isCorrect: false,
        feedback: "Never use damaged electrical equipment. This creates serious shock and fire risks."
      },
      {
        id: "b",
        text: "Remove the tool from service immediately and tag it as defective",
        isCorrect: true,
        feedback: "Correct! Damaged tools must be removed from service immediately to prevent accidents."
      },
      {
        id: "c",
        text: "Tape over the damage and continue using it",
        isCorrect: false,
        feedback: "Temporary repairs on electrical equipment are not acceptable. Proper repair or replacement is required."
      }
    ],
    learningOutcomes: [
      "Tool inspection procedures",
      "PAT testing requirements",
      "Equipment maintenance protocols"
    ]
  },
  {
    id: 5,
    title: "Site Emergency Evacuation",
    description: "A fire alarm sounds while you're working in a basement electrical room of a large commercial building.",
    category: "Site Safety",
    difficulty: "Intermediate",
    industry: "Commercial",
    riskLevel: "High",
    duration: "5 mins",
    tags: ["emergency", "evacuation", "fire", "procedures"],
    scenario: "You're working in a basement electrical room when the fire alarm sounds. You're halfway through connecting a critical circuit and have tools scattered around. What's your immediate response?",
    options: [
      {
        id: "a",
        text: "Quickly finish the connection to make the area safe, then evacuate",
        isCorrect: false,
        feedback: "Emergency evacuation takes priority over all work activities. Leave immediately."
      },
      {
        id: "b",
        text: "Immediately stop work, make safe what you can quickly, and evacuate via the designated route",
        isCorrect: true,
        feedback: "Correct! Emergency evacuation is the priority. Make safe only what can be done in seconds."
      },
      {
        id: "c",
        text: "Gather all your tools and equipment before evacuating",
        isCorrect: false,
        feedback: "Personal safety is more important than tools. Evacuate immediately without delay."
      }
    ],
    learningOutcomes: [
      "Emergency response procedures",
      "Risk prioritisation",
      "Site safety protocols"
    ]
  },
  {
    id: 6,
    title: "Confined Space Risk Assessment",
    description: "Asked to install electrical systems in a confined basement plant room with limited ventilation.",
    category: "Risk Assessment",
    difficulty: "Advanced",
    industry: "Industrial",
    riskLevel: "High",
    duration: "8 mins",
    tags: ["confined space", "risk assessment", "ventilation", "permits"],
    scenario: "You're tasked with installing motor controls in a basement plant room with one access point, poor ventilation, and potential for gas accumulation. How do you proceed?",
    options: [
      {
        id: "a",
        text: "Start work immediately as it's just electrical installation",
        isCorrect: false,
        feedback: "Confined spaces require specific risk assessments and safety procedures before entry."
      },
      {
        id: "b",
        text: "Conduct a confined space risk assessment and implement required controls before starting",
        isCorrect: true,
        feedback: "Correct! Confined spaces require specific assessments, permits, and safety measures."
      },
      {
        id: "c",
        text: "Work quickly to minimise time in the space",
        isCorrect: false,
        feedback: "Speed doesn't address the hazards. Proper controls and procedures are essential."
      }
    ],
    learningOutcomes: [
      "Confined space regulations",
      "Risk assessment methodology",
      "Permit to work systems"
    ]
  },
  {
    id: 7,
    title: "Inadequate PPE for Live Working",
    description: "Being asked to perform live electrical work but only basic PPE is available on site.",
    category: "PPE Usage",
    difficulty: "Intermediate",
    industry: "Maintenance",
    riskLevel: "Critical",
    duration: "5 mins",
    tags: ["PPE", "live working", "voltage", "protection"],
    scenario: "You're asked to replace a contactor in a live 400V panel. Only basic PPE (hard hat, safety boots, hi-vis) is available. The client says it's urgent and can't wait for proper equipment. What do you do?",
    options: [
      {
        id: "a",
        text: "Proceed with the available PPE as it's urgent work",
        isCorrect: false,
        feedback: "Never compromise on appropriate PPE for electrical work. The risks are too high."
      },
      {
        id: "b",
        text: "Refuse to work until appropriate electrical PPE is provided",
        isCorrect: true,
        feedback: "Correct! Appropriate PPE is non-negotiable for electrical work. Never compromise on safety."
      },
      {
        id: "c",
        text: "Work extra carefully and quickly to minimise exposure",
        isCorrect: false,
        feedback: "Care and speed don't replace proper protection. Appropriate PPE is essential."
      }
    ],
    learningOutcomes: [
      "PPE requirements for electrical work",
      "Right to refuse unsafe work",
      "Electrical safety standards"
    ]
  },
  {
    id: 8,
    title: "Colleague Electrical Shock Incident",
    description: "A colleague receives an electrical shock and is unconscious. You need to respond appropriately.",
    category: "Emergency Response",
    difficulty: "Advanced",
    industry: "All",
    riskLevel: "Critical",
    duration: "6 mins",
    tags: ["shock", "first aid", "emergency", "response"],
    scenario: "Your colleague has received an electric shock from a 230V circuit and is unconscious on the floor. The equipment appears to still be energised. What's your immediate response?",
    options: [
      {
        id: "a",
        text: "Immediately touch the person to check for pulse and breathing",
        isCorrect: false,
        feedback: "Never touch someone who may still be in contact with electricity. Make safe first."
      },
      {
        id: "b",
        text: "Switch off the supply, check the area is safe, then provide first aid and call emergency services",
        isCorrect: true,
        feedback: "Correct! Isolate the supply first, ensure safety, then provide first aid and call for help."
      },
      {
        id: "c",
        text: "Call emergency services and wait for them to arrive",
        isCorrect: false,
        feedback: "While calling emergency services is important, immediate first aid after making safe could be life-saving."
      }
    ],
    learningOutcomes: [
      "Emergency response procedures",
      "First aid for electrical shock",
      "Scene safety assessment"
    ]
  },
  {
    id: 9,
    title: "Overhead Power Line Proximity",
    description: "Working near overhead power lines with mobile access equipment on an outdoor installation.",
    category: "Working at Height",
    difficulty: "Advanced",
    industry: "Construction",
    riskLevel: "Critical",
    duration: "7 mins",
    tags: ["overhead lines", "MEWP", "clearance", "exclusion zone"],
    scenario: "You're using a MEWP to install external lighting near overhead 11kV power lines. Wind is moving the platform and you estimate you're about 2 metres from the nearest conductor. What should you do?",
    options: [
      {
        id: "a",
        text: "Continue working but be extra careful about platform movement",
        isCorrect: false,
        feedback: "2 metres is insufficient clearance for 11kV lines. Minimum safe distances must be maintained."
      },
      {
        id: "b",
        text: "Immediately lower the platform and establish proper exclusion zones before continuing",
        isCorrect: true,
        feedback: "Correct! Proper exclusion zones and clearances must be maintained around overhead lines."
      },
      {
        id: "c",
        text: "Ask the power company to isolate the lines temporarily",
        isCorrect: false,
        feedback: "While isolation is ideal, proper planning and exclusion zones can allow safe working."
      }
    ],
    learningOutcomes: [
      "Overhead line safety regulations",
      "Exclusion zone requirements",
      "MEWP safe operation procedures"
    ]
  },
  {
    id: 10,
    title: "Damaged Test Equipment",
    description: "Your multifunction tester shows inconsistent readings and has visible damage to test leads.",
    category: "Tool Safety",
    difficulty: "Intermediate",
    industry: "All",
    riskLevel: "High",
    duration: "5 mins",
    tags: ["test equipment", "calibration", "leads", "accuracy"],
    scenario: "During an EICR, your multifunction tester gives inconsistent readings and you notice the test leads have damaged insulation near the probes. You have a tight deadline to complete the inspection. What do you do?",
    options: [
      {
        id: "a",
        text: "Continue testing but note the equipment issues in your report",
        isCorrect: false,
        feedback: "Damaged test equipment can give false readings and create safety risks. It must not be used."
      },
      {
        id: "b",
        text: "Stop testing immediately and arrange for properly calibrated, undamaged equipment",
        isCorrect: true,
        feedback: "Correct! Test equipment must be in good condition and properly calibrated for accurate, safe results."
      },
      {
        id: "c",
        text: "Use the equipment but double-check critical readings with a different method",
        isCorrect: false,
        feedback: "Damaged equipment should never be used. All readings could be compromised."
      }
    ],
    learningOutcomes: [
      "Test equipment maintenance",
      "Calibration requirements",
      "Equipment inspection procedures"
    ]
  },
  {
    id: 11,
    title: "Chemical Hazard in Electrical Room",
    description: "Discovering chemical spills near electrical equipment in an industrial facility.",
    category: "Site Safety",
    difficulty: "Advanced",
    industry: "Industrial",
    riskLevel: "High",
    duration: "6 mins",
    tags: ["chemicals", "COSHH", "contamination", "electrical"],
    scenario: "You enter an electrical room to perform maintenance and discover chemical spillage near the main switchgear. There's a strong chemical odour and you can see liquid on the floor around electrical equipment. How do you respond?",
    options: [
      {
        id: "a",
        text: "Quickly complete the electrical work and leave the area",
        isCorrect: false,
        feedback: "Chemical contamination creates serious risks. The area must be made safe before any work."
      },
      {
        id: "b",
        text: "Evacuate immediately, report the incident, and coordinate with chemical and electrical safety specialists",
        isCorrect: true,
        feedback: "Correct! Chemical/electrical combinations require specialist assessment and coordinated response."
      },
      {
        id: "c",
        text: "Clean up the spill yourself before starting electrical work",
        isCorrect: false,
        feedback: "Chemical spills require specialist knowledge and equipment. Don't attempt cleanup without proper training."
      }
    ],
    learningOutcomes: [
      "COSHH regulations",
      "Multi-hazard situations",
      "Incident reporting procedures"
    ]
  },
  {
    id: 12,
    title: "Workplace Violence Risk Assessment",
    description: "Assessing personal safety risks when visiting unfamiliar domestic properties for electrical work.",
    category: "Risk Assessment",
    difficulty: "Intermediate",
    industry: "Domestic",
    riskLevel: "Medium",
    duration: "4 mins",
    tags: ["personal safety", "domestic", "lone working", "assessment"],
    scenario: "You're sent to a domestic property you've never visited before for emergency electrical work. It's evening, the property is in an unfamiliar area, and you'll be working alone. How do you assess and manage personal safety risks?",
    options: [
      {
        id: "a",
        text: "Just go and complete the work quickly to minimise time on site",
        isCorrect: false,
        feedback: "Personal safety requires proper assessment and precautions, not just speed."
      },
      {
        id: "b",
        text: "Conduct a personal risk assessment, inform your employer of your location, and establish check-in procedures",
        isCorrect: true,
        feedback: "Correct! Lone working requires risk assessment, communication protocols, and safety procedures."
      },
      {
        id: "c",
        text: "Ask the customer to provide references before attending",
        isCorrect: false,
        feedback: "While customer verification can help, proper lone working procedures are more practical and effective."
      }
    ],
    learningOutcomes: [
      "Personal safety risk assessment",
      "Lone working procedures",
      "Communication protocols"
    ]
  }
];
