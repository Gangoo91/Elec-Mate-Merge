
export interface SafetyScenarioOption {
  id: string;
  text: string;
  isCorrect: boolean;
  feedback: string;
  outcome: string;
  regulation?: string;
}

export interface SafetyScenario {
  id: number;
  title: string;
  description: string;
  question: string;
  options: SafetyScenarioOption[];
  category: string;
  difficulty: string;
  duration: string;
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  industry: 'Domestic' | 'Commercial' | 'Industrial' | 'All';
  tags: string[];
}

export const safetyScenarios: SafetyScenario[] = [
  // Emergency Response Scenarios
  {
    id: 1,
    title: "Electrical Shock Incident",
    description: "An apprentice receives an electric shock while working on a domestic installation. You need to respond immediately and appropriately.",
    question: "You witness an apprentice receive an electric shock from a live circuit. They are conscious but shaken. What is your immediate priority?",
    category: "Emergency Response",
    difficulty: "Beginner",
    duration: "10-15 mins",
    riskLevel: "Critical",
    industry: "All",
    tags: ["first-aid", "emergency", "isolation"],
    options: [
      {
        id: "A",
        text: "Check if they are injured and call for medical assistance",
        isCorrect: false,
        feedback: "While checking for injuries is important, you must first ensure the power source is safe.",
        outcome: "This could put you at risk of electric shock as well.",
        regulation: "HSE guidance states isolation comes before assistance."
      },
      {
        id: "B",
        text: "Immediately isolate the power source before approaching",
        isCorrect: true,
        feedback: "Correct! Always isolate the power source first to prevent further injury.",
        outcome: "The area is made safe, preventing additional casualties.",
        regulation: "Electricity at Work Regulations 1989 - safe isolation procedures."
      },
      {
        id: "C",
        text: "Touch the person to check if they're responsive",
        isCorrect: false,
        feedback: "Never touch someone who may still be in contact with live electrical parts.",
        outcome: "You could receive an electric shock yourself.",
        regulation: "This violates basic electrical safety principles."
      },
      {
        id: "D",
        text: "Shout for help and wait for someone else to handle it",
        isCorrect: false,
        feedback: "While calling for help is good, you should take immediate action to isolate the power.",
        outcome: "Delays could result in further injury to the victim.",
        regulation: "You have a duty of care to act promptly and safely."
      }
    ]
  },
  {
    id: 2,
    title: "Arc Flash Near Miss",
    description: "A near-miss arc flash incident occurs at an industrial facility during maintenance work on a 400V distribution board.",
    question: "During work on a 400V distribution board, you notice signs that could lead to an arc flash incident. What should be your immediate action?",
    category: "PPE & Safety",
    difficulty: "Intermediate",
    duration: "15-20 mins",
    riskLevel: "Critical",
    industry: "Industrial",
    tags: ["arc-flash", "ppe", "high-voltage"],
    options: [
      {
        id: "A",
        text: "Continue working but be more careful",
        isCorrect: false,
        feedback: "Arc flash incidents can cause severe burns and fatalities. Never continue when risks are identified.",
        outcome: "Potential for severe injury or death from arc flash.",
        regulation: "This violates the fundamental principle of 'stop work authority'."
      },
      {
        id: "B",
        text: "Stop work immediately and reassess the situation",
        isCorrect: true,
        feedback: "Correct! Always stop work when arc flash risks are identified.",
        outcome: "Work stops safely, risks are properly assessed and mitigated.",
        regulation: "CDM Regulations 2015 require stopping work when new hazards are identified."
      },
      {
        id: "C",
        text: "Put on additional PPE and continue",
        isCorrect: false,
        feedback: "PPE alone may not be sufficient protection against arc flash. The hazard must be eliminated first.",
        outcome: "PPE may fail, resulting in severe burns.",
        regulation: "Hierarchy of controls places elimination before PPE."
      },
      {
        id: "D",
        text: "Work faster to finish the job quickly",
        isCorrect: false,
        feedback: "Rushing increases the likelihood of making mistakes that could trigger an arc flash.",
        outcome: "Increased risk of error leading to arc flash incident.",
        regulation: "This goes against all safety principles and procedures."
      }
    ]
  },
  {
    id: 3,
    title: "Lockout/Tagout Failure",
    description: "You discover that a colleague has not properly followed lockout/tagout procedures on a high-voltage isolation.",
    question: "You find electrical equipment that should be isolated but the lockout/tagout procedure appears incomplete. What do you do?",
    category: "Isolation Procedures",
    difficulty: "Advanced",
    duration: "20-25 mins",
    riskLevel: "High",
    industry: "All",
    tags: ["loto", "isolation", "procedures"],
    options: [
      {
        id: "A",
        text: "Complete the lockout procedure yourself",
        isCorrect: false,
        feedback: "Only the person who started the isolation should complete it unless proper handover procedures are followed.",
        outcome: "Confusion about isolation status could lead to accidents.",
        regulation: "BS EN 50110 specifies who can operate isolation procedures."
      },
      {
        id: "B",
        text: "Treat the equipment as live and find the responsible person",
        isCorrect: true,
        feedback: "Correct! Always treat inadequately isolated equipment as live and find the responsible person.",
        outcome: "Equipment remains safe, proper procedures are followed.",
        regulation: "Electricity at Work Regulations 1989 - prove dead before work."
      },
      {
        id: "C",
        text: "Test the equipment to see if it's really dead",
        isCorrect: false,
        feedback: "Testing should only be done after proper isolation procedures are complete.",
        outcome: "Risk of electric shock if isolation is incomplete.",
        regulation: "Testing comes after isolation, not before verification of isolation status."
      },
      {
        id: "D",
        text: "Remove the incomplete locks and start fresh",
        isCorrect: false,
        feedback: "Never remove another person's locks without proper authorization and procedures.",
        outcome: "Could energize equipment unexpectedly, causing injury or death.",
        regulation: "This violates fundamental lockout/tagout principles."
      }
    ]
  },
  {
    id: 4,
    title: "Confined Space Emergency",
    description: "An emergency situation develops while electrical work is being performed in a confined space with limited access.",
    question: "During electrical work in a confined space, your colleague suddenly becomes unresponsive. What is your first priority?",
    category: "Hazardous Environments",
    difficulty: "Advanced",
    duration: "25-30 mins",
    riskLevel: "Critical",
    industry: "Industrial",
    tags: ["confined-space", "emergency", "rescue"],
    options: [
      {
        id: "A",
        text: "Enter the space immediately to help your colleague",
        isCorrect: false,
        feedback: "Never enter a confined space during an emergency without proper rescue procedures.",
        outcome: "You could become the second casualty due to atmospheric hazards.",
        regulation: "Confined Spaces Regulations 1997 require trained rescue teams."
      },
      {
        id: "B",
        text: "Call the emergency services and the trained rescue team",
        isCorrect: true,
        feedback: "Correct! Follow the confined space emergency procedure and call trained rescuers.",
        outcome: "Professional rescue is initiated while you remain safe.",
        regulation: "Confined Spaces Regulations 1997 require emergency procedures and trained rescue."
      },
      {
        id: "C",
        text: "Try to pull them out using a rope",
        isCorrect: false,
        feedback: "Untrained rescue attempts in confined spaces often create additional casualties.",
        outcome: "Risk of injuring the casualty or becoming trapped yourself.",
        regulation: "Only trained rescue teams should perform confined space rescue."
      },
      {
        id: "D",
        text: "Ventilate the space first, then enter",
        isCorrect: false,
        feedback: "Emergency ventilation should be done by trained personnel with proper equipment.",
        outcome: "Delay in professional rescue while you attempt inadequate ventilation.",
        regulation: "Emergency response requires trained personnel and proper procedures."
      }
    ]
  },
  // New Working at Height Scenarios
  {
    id: 5,
    title: "Ladder Safety Assessment",
    description: "You're preparing to install lighting circuits in a commercial building and need to work at height.",
    question: "Before using a ladder to access ceiling mounted equipment, what is the most critical safety check?",
    category: "Working at Height",
    difficulty: "Beginner",
    duration: "10-15 mins",
    riskLevel: "Medium",
    industry: "Commercial",
    tags: ["ladders", "height", "inspection"],
    options: [
      {
        id: "A",
        text: "Check the ladder's weight rating and condition",
        isCorrect: true,
        feedback: "Correct! Always inspect the ladder for damage and ensure it can safely support your weight plus tools.",
        outcome: "Safe working platform established, reducing risk of falls.",
        regulation: "Work at Height Regulations 2005 require proper equipment inspection."
      },
      {
        id: "B",
        text: "Find someone to hold the bottom of the ladder",
        isCorrect: false,
        feedback: "While having a spotter helps, the ladder itself must be safe and properly set up first.",
        outcome: "Damaged ladder could still fail even with someone holding it.",
        regulation: "Equipment inspection comes before use, regardless of assistance."
      },
      {
        id: "C",
        text: "Clear the area below of people",
        isCorrect: false,
        feedback: "Area clearance is important but doesn't address the ladder's structural integrity.",
        outcome: "Still risk of ladder failure and personal injury.",
        regulation: "Primary safety comes from proper equipment, not just area management."
      },
      {
        id: "D",
        text: "Check for overhead power lines",
        isCorrect: false,
        feedback: "While checking for overhead hazards is important, the ladder's condition is the primary concern.",
        outcome: "Safe from electrical hazards but still at risk from equipment failure.",
        regulation: "Multiple safety checks are needed, but equipment integrity comes first."
      }
    ]
  },
  {
    id: 6,
    title: "Scaffold Safety Concern",
    description: "You arrive at a construction site where scaffolding has been erected for electrical installation work.",
    question: "You notice the scaffold doesn't have a current inspection tag. What should you do?",
    category: "Working at Height",
    difficulty: "Intermediate",
    duration: "15-20 mins",
    riskLevel: "High",
    industry: "Commercial",
    tags: ["scaffold", "inspection", "documentation"],
    options: [
      {
        id: "A",
        text: "Use the scaffold if it looks structurally sound",
        isCorrect: false,
        feedback: "Visual inspection by untrained personnel is not sufficient for scaffold safety verification.",
        outcome: "Risk of scaffold collapse due to undetected structural issues.",
        regulation: "Work at Height Regulations 2005 require competent person inspection."
      },
      {
        id: "B",
        text: "Do not use the scaffold and report to site management",
        isCorrect: true,
        feedback: "Correct! Never use uninspected scaffolding. It must be inspected by a competent person.",
        outcome: "Work stops safely until proper inspection is completed.",
        regulation: "Scaffolds must be inspected every 7 days and after adverse weather."
      },
      {
        id: "C",
        text: "Ask other workers if they've been using it safely",
        isCorrect: false,
        feedback: "Other workers' opinions don't replace formal safety inspections by competent persons.",
        outcome: "Continued risk exposure based on informal assessments.",
        regulation: "Formal inspection procedures cannot be replaced by informal consultations."
      },
      {
        id: "D",
        text: "Inspect it yourself before use",
        isCorrect: false,
        feedback: "Unless you're a competent person trained in scaffold inspection, you cannot certify its safety.",
        outcome: "Inadequate inspection could miss critical safety issues.",
        regulation: "Only competent persons can conduct formal scaffold inspections."
      }
    ]
  },
  // New Tool Safety Scenarios
  {
    id: 7,
    title: "Portable Tool Inspection",
    description: "You're about to use a portable electric drill for cable installation work on a construction site.",
    question: "What is your first safety check before using any portable electrical tool on site?",
    category: "Tool Safety",
    difficulty: "Beginner",
    duration: "10-15 mins",
    riskLevel: "Medium",
    industry: "All",
    tags: ["pat-testing", "tools", "inspection"],
    options: [
      {
        id: "A",
        text: "Check it has a current PAT test label",
        isCorrect: true,
        feedback: "Correct! All portable electrical equipment must have current PAT testing certification.",
        outcome: "Verified safe electrical condition reduces risk of electric shock.",
        regulation: "Electricity at Work Regulations 1989 require regular testing of portable equipment."
      },
      {
        id: "B",
        text: "Test it quickly to see if it works",
        isCorrect: false,
        feedback: "A functional test doesn't verify electrical safety or insulation integrity.",
        outcome: "Risk of electric shock from faulty insulation or earthing.",
        regulation: "Proper electrical testing requires specialised equipment and procedures."
      },
      {
        id: "C",
        text: "Check the power cable for visible damage",
        isCorrect: false,
        feedback: "Visual inspection is important but doesn't replace formal PAT testing requirements.",
        outcome: "Hidden electrical faults could still pose serious risks.",
        regulation: "Visual inspection alone is insufficient for electrical safety verification."
      },
      {
        id: "D",
        text: "Make sure it's the right tool for the job",
        isCorrect: false,
        feedback: "Tool selection is important but electrical safety verification comes first.",
        outcome: "Even the right tool can be dangerous if electrically unsafe.",
        regulation: "Safety verification must precede task suitability assessment."
      }
    ]
  },
  {
    id: 8,
    title: "Angle Grinder Safety",
    description: "You need to cut cable tray using an angle grinder in a busy workshop environment.",
    question: "Before starting to cut with an angle grinder, what is the most critical safety consideration?",
    category: "Tool Safety",
    difficulty: "Intermediate",
    duration: "15-20 mins",
    riskLevel: "High",
    industry: "All",
    tags: ["angle-grinder", "cutting", "ppe"],
    options: [
      {
        id: "A",
        text: "Ensure all nearby personnel are wearing eye protection",
        isCorrect: false,
        feedback: "While eye protection for others is important, the operator's full PPE is the priority.",
        outcome: "Other workers protected but operator still at risk from sparks and debris.",
        regulation: "Operator safety is the primary responsibility before considering others."
      },
      {
        id: "B",
        text: "Wear full face protection, safety glasses, and appropriate clothing",
        isCorrect: true,
        feedback: "Correct! Angle grinders create high-speed sparks and debris requiring comprehensive protection.",
        outcome: "Operator protected from burns, cuts, and eye injuries.",
        regulation: "PPE Regulations require appropriate protection for specific hazards."
      },
      {
        id: "C",
        text: "Check the disc is suitable for cutting metal",
        isCorrect: false,
        feedback: "Correct disc selection is vital but personal protection must be established first.",
        outcome: "Right disc but operator vulnerable to injury from sparks and debris.",
        regulation: "Personal safety takes priority over equipment selection."
      },
      {
        id: "D",
        text: "Clear the area of flammable materials",
        isCorrect: false,
        feedback: "Fire prevention is important but doesn't protect the operator from immediate physical hazards.",
        outcome: "Fire risk reduced but operator still exposed to cuts and burns.",
        regulation: "Multiple safety measures required, but personal protection comes first."
      }
    ]
  },
  // New Site Safety Scenarios
  {
    id: 9,
    title: "Site Induction Requirements",
    description: "You're starting work at a new construction site and notice some workers without hard hats.",
    question: "As a responsible electrician, what should you do about workers not wearing mandatory PPE?",
    category: "Site Safety",
    difficulty: "Beginner",
    duration: "10-15 mins",
    riskLevel: "Medium",
    industry: "Commercial",
    tags: ["site-safety", "ppe", "responsibility"],
    options: [
      {
        id: "A",
        text: "Inform the site supervisor immediately",
        isCorrect: true,
        feedback: "Correct! Site safety violations should be reported to site management for proper action.",
        outcome: "Site safety standards maintained, protecting all workers.",
        regulation: "CDM Regulations 2015 require all workers to contribute to site safety."
      },
      {
        id: "B",
        text: "Ignore it as it's not your responsibility",
        isCorrect: false,
        feedback: "All workers have a duty of care to identify and report safety issues.",
        outcome: "Risk of head injuries and potential prosecution for failing duty of care.",
        regulation: "Health and Safety at Work Act 1974 - duty of care applies to all."
      },
      {
        id: "C",
        text: "Tell the workers directly to put on hard hats",
        isCorrect: false,
        feedback: "Direct confrontation may not be effective and could create conflict.",
        outcome: "Possible confrontation and workers may still not comply.",
        regulation: "Site hierarchy should be followed for enforcement actions."
      },
      {
        id: "D",
        text: "Continue working but stay away from those workers",
        isCorrect: false,
        feedback: "Avoiding the issue doesn't resolve the safety violation or protect the workers.",
        outcome: "Safety standards compromised, potential for serious injuries.",
        regulation: "Passive avoidance doesn't fulfil duty of care obligations."
      }
    ]
  },
  {
    id: 10,
    title: "Excavation Work Hazard",
    description: "You need to install underground cables near an excavation where other trades are working.",
    question: "What is your primary concern when working near excavations?",
    category: "Site Safety",
    difficulty: "Intermediate",
    duration: "15-20 mins",
    riskLevel: "High",
    industry: "Commercial",
    tags: ["excavation", "underground", "utilities"],
    options: [
      {
        id: "A",
        text: "Ensure excavation is properly supported and safe to work near",
        isCorrect: true,
        feedback: "Correct! Excavation collapse is a major risk requiring proper support systems.",
        outcome: "Work proceeds safely with appropriate excavation protection measures.",
        regulation: "CDM Regulations 2015 require safe excavation practices and support systems."
      },
      {
        id: "B",
        text: "Check for existing underground utilities",
        isCorrect: false,
        feedback: "While utility location is important, the immediate physical danger is excavation collapse.",
        outcome: "Utilities located but workers still at risk from unstable excavation.",
        regulation: "Multiple hazards exist but structural safety takes precedence."
      },
      {
        id: "C",
        text: "Coordinate with other trades working in the area",
        isCorrect: false,
        feedback: "Coordination is important but doesn't address the primary hazard of excavation collapse.",
        outcome: "Good communication but fundamental safety risks remain unaddressed.",
        regulation: "Communication supports safety but doesn't replace risk control measures."
      },
      {
        id: "D",
        text: "Use appropriate tools for underground work",
        isCorrect: false,
        feedback: "Tool selection is important but secondary to ensuring the work environment is safe.",
        outcome: "Right tools but unsafe working environment poses greater risk.",
        regulation: "Safe systems of work require safe environment before tool considerations."
      }
    ]
  },
  // New Risk Assessment Scenarios
  {
    id: 11,
    title: "Domestic Installation Risk Assessment",
    description: "You're asked to rewire an occupied family home during renovation work.",
    question: "What is the most important consideration for your risk assessment?",
    category: "Risk Assessment",
    difficulty: "Intermediate",
    duration: "15-20 mins",
    riskLevel: "Medium",
    industry: "Domestic",
    tags: ["risk-assessment", "domestic", "occupied-premises"],
    options: [
      {
        id: "A",
        text: "Protection of occupants, especially children, from electrical hazards",
        isCorrect: true,
        feedback: "Correct! Occupied premises require special consideration for vulnerable persons.",
        outcome: "Family safety prioritised with appropriate protective measures.",
        regulation: "CDM Regulations 2015 - special consideration for occupied premises."
      },
      {
        id: "B",
        text: "Coordination with other renovation trades",
        isCorrect: false,
        feedback: "Trade coordination is important but occupant safety is the primary concern.",
        outcome: "Good coordination but family still exposed to electrical risks.",
        regulation: "Occupant welfare takes priority in domestic work environments."
      },
      {
        id: "C",
        text: "Minimising disruption to household routine",
        isCorrect: false,
        feedback: "Convenience is secondary to safety in risk assessment priorities.",
        outcome: "Minimal disruption but safety risks not properly addressed.",
        regulation: "Safety considerations must outweigh convenience factors."
      },
      {
        id: "D",
        text: "Ensuring adequate lighting during work",
        isCorrect: false,
        feedback: "Working conditions are important but don't address the primary risks to occupants.",
        outcome: "Good visibility but family safety concerns unaddressed.",
        regulation: "Risk assessment must prioritise the highest risks first."
      }
    ]
  },
  {
    id: 12,
    title: "Industrial Maintenance Risk Assessment",
    description: "You're planning maintenance work on industrial machinery during a production shutdown.",
    question: "What is the critical first step in your risk assessment process?",
    category: "Risk Assessment",
    difficulty: "Advanced",
    duration: "20-25 mins",
    riskLevel: "High",
    industry: "Industrial",
    tags: ["maintenance", "industrial", "shutdown"],
    options: [
      {
        id: "A",
        text: "Identify all energy sources that require isolation",
        isCorrect: true,
        feedback: "Correct! Industrial machinery often has multiple energy sources requiring comprehensive isolation.",
        outcome: "All energy sources identified and safely isolated before work begins.",
        regulation: "BS EN 50110 - comprehensive energy isolation in industrial settings."
      },
      {
        id: "B",
        text: "Coordinate with production management on timing",
        isCorrect: false,
        feedback: "Scheduling is important but safety identification comes before timing considerations.",
        outcome: "Good timing but potentially missed energy sources create serious risks.",
        regulation: "Safety assessment must precede operational considerations."
      },
      {
        id: "C",
        text: "Gather the appropriate tools and equipment",
        isCorrect: false,
        feedback: "Equipment preparation follows risk identification and control planning.",
        outcome: "Well-equipped team but hazards not properly identified or controlled.",
        regulation: "Risk identification drives equipment selection, not the reverse."
      },
      {
        id: "D",
        text: "Review maintenance documentation",
        isCorrect: false,
        feedback: "Documentation review is valuable but hazard identification takes priority.",
        outcome: "Good understanding of procedures but active hazards not secured.",
        regulation: "Live hazards must be controlled before detailed procedure review."
      }
    ]
  }
];

export const scenarioCategories = [
  "Emergency Response",
  "PPE & Safety",
  "Isolation Procedures", 
  "Hazardous Environments",
  "Working at Height",
  "Tool Safety",
  "Site Safety",
  "Risk Assessment"
];

export const difficultyLevels = ["Beginner", "Intermediate", "Advanced"];

export const industryTypes = ["Domestic", "Commercial", "Industrial", "All"];

export const riskLevels = ["Low", "Medium", "High", "Critical"];
