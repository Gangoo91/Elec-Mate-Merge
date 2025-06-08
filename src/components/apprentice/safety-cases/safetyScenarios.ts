
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

// Remove the filter arrays since we're removing filtering
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
  }
];
