
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
  },
  {
    id: 11,
    title: "Underground Cable Location",
    description: "You're about to dig a trench for a new garden lighting cable. The homeowner says there are no underground services.",
    question: "What should you do before starting excavation?",
    options: [
      {
        id: "A",
        text: "Trust the homeowner's knowledge and start digging carefully",
        isCorrect: false,
        feedback: "Homeowners often don't know about buried services. Many cables and pipes were installed before current records existed.",
        outcome: "Risk of striking unknown services causing injury or supply disruption",
        regulation: "HSG47 Avoiding Danger from Underground Services"
      },
      {
        id: "B",
        text: "Use a cable avoidance tool (CAT) to scan the area before digging",
        isCorrect: true,
        feedback: "Correct! Always use CAT and Genny equipment to locate underground services before any excavation work.",
        outcome: "Underground services located and marked, safe digging area established",
        regulation: "HSG47 Avoiding Danger from Underground Services"
      },
      {
        id: "C",
        text: "Dig slowly with a spade and stop if you hit anything",
        isCorrect: false,
        feedback: "By the time you hit a cable, damage may already have occurred. Prevention through detection is essential.",
        outcome: "High risk of cable strike causing electric shock or burns",
        regulation: "Electricity at Work Regulations 1989, Regulation 14"
      },
      {
        id: "D",
        text: "Only dig to a shallow depth to avoid deep services",
        isCorrect: false,
        feedback: "Services can be at any depth, especially in gardens where previous work may have disturbed original positions.",
        outcome: "False sense of security, services may be at unexpected depths",
        regulation: "HSG47 Avoiding Danger from Underground Services"
      }
    ],
    category: "Underground Services",
    difficulty: "Beginner",
    industry: "Domestic",
    riskLevel: "High",
    duration: "6 minutes",
    tags: ["excavation", "cable-location", "cat-scanner"]
  },
  {
    id: 12,
    title: "Wet Conditions Working",
    description: "Heavy rain has flooded the construction site where you're installing temporary power distribution equipment.",
    question: "What is the safest course of action?",
    options: [
      {
        id: "A",
        text: "Continue working but wear wellington boots",
        isCorrect: false,
        feedback: "Wellington boots alone don't provide adequate protection against electrical hazards in standing water.",
        outcome: "Risk of electrocution if equipment faults while in contact with water",
        regulation: "Electricity at Work Regulations 1989, Regulation 6"
      },
      {
        id: "B",
        text: "Stop work and relocate equipment to higher ground when safe to do so",
        isCorrect: true,
        feedback: "Correct! Water significantly increases electrical risk. Equipment must be elevated and protected from flooding.",
        outcome: "Electrical equipment protected, workers removed from immediate danger",
        regulation: "BS 7671:2018 Section 704, Electricity at Work Regulations 1989"
      },
      {
        id: "C",
        text: "Cover the distribution board with a tarpaulin",
        isCorrect: false,
        feedback: "A tarpaulin doesn't provide IP protection. Water may already have compromised equipment safety.",
        outcome: "False protection, equipment may already be compromised",
        regulation: "BS 7671:2018 Section 704 - Construction Sites"
      },
      {
        id: "D",
        text: "Switch off the main supply and wait for the water to drain",
        isCorrect: false,
        feedback: "While isolating is good, equipment may be damaged and unsafe even after water drains. Inspection is required.",
        outcome: "Equipment damage may go undetected, creating future hazards",
        regulation: "Electricity at Work Regulations 1989, Regulation 4"
      }
    ],
    category: "Weather Hazards",
    difficulty: "Intermediate",
    industry: "Construction",
    riskLevel: "High",
    duration: "7 minutes",
    tags: ["weather", "flooding", "temporary-installations"]
  },
  {
    id: 13,
    title: "Asbestos Discovery",
    description: "While chasing a cable route in an older building, you notice fibrous material behind the plasterboard that could be asbestos.",
    question: "What is your immediate priority?",
    options: [
      {
        id: "A",
        text: "Carefully remove a sample to get it tested",
        isCorrect: false,
        feedback: "Never disturb suspected asbestos. Sampling can release fibres and requires specialist equipment and training.",
        outcome: "Risk of asbestos fibre release affecting yourself and others",
        regulation: "Control of Asbestos Regulations 2012"
      },
      {
        id: "B",
        text: "Continue working but wear a dust mask",
        isCorrect: false,
        feedback: "Standard dust masks don't protect against asbestos fibres. Specialist respiratory protection is required.",
        outcome: "Potential asbestos exposure causing serious long-term health effects",
        regulation: "Control of Asbestos Regulations 2012, Regulation 10"
      },
      {
        id: "C",
        text: "Stop work immediately, seal the area, and report to your supervisor",
        isCorrect: true,
        feedback: "Correct! Suspected asbestos must be treated as asbestos until tested. Only licensed contractors can remove it.",
        outcome: "Area secured, specialist assessment arranged, workers protected",
        regulation: "Control of Asbestos Regulations 2012, Regulation 11"
      },
      {
        id: "D",
        text: "Spray water on the material to reduce dust and continue working",
        isCorrect: false,
        feedback: "Wetting asbestos can help reduce fibre release but doesn't make it safe. Professional removal is required.",
        outcome: "Ongoing exposure risk, potential contamination spread",
        regulation: "Control of Asbestos Regulations 2012"
      }
    ],
    category: "Hazardous Materials",
    difficulty: "Intermediate",
    industry: "Commercial",
    riskLevel: "High",
    duration: "8 minutes",
    tags: ["asbestos", "hazardous-materials", "stop-work"]
  },
  {
    id: 14,
    title: "Battery Room Hazards",
    description: "You need to perform maintenance work on UPS batteries in a data centre battery room.",
    question: "What specific hazard is most critical to address before starting work?",
    options: [
      {
        id: "A",
        text: "The weight of the batteries for manual handling",
        isCorrect: false,
        feedback: "While manual handling is a concern, the most critical hazard in battery rooms is explosive hydrogen gas.",
        outcome: "Focus on secondary hazard while primary danger remains uncontrolled",
        regulation: "Manual Handling Operations Regulations 1992"
      },
      {
        id: "B",
        text: "Hydrogen gas accumulation and explosion risk",
        isCorrect: true,
        feedback: "Correct! Lead-acid batteries produce hydrogen gas. Ventilation must be verified and non-sparking tools used.",
        outcome: "Explosive atmosphere hazard identified and controlled",
        regulation: "DSEAR 2002, BS EN 50272-2"
      },
      {
        id: "C",
        text: "The DC voltage present in the battery strings",
        isCorrect: false,
        feedback: "DC voltage is a hazard but hydrogen explosion risk is more immediately life-threatening and affects all in the room.",
        outcome: "Electrical hazard considered but explosion risk overlooked",
        regulation: "Electricity at Work Regulations 1989"
      },
      {
        id: "D",
        text: "The acid in the batteries causing chemical burns",
        isCorrect: false,
        feedback: "Acid burns are a hazard but contained within batteries. Hydrogen accumulation is the primary room hazard.",
        outcome: "Chemical hazard considered but atmospheric hazard overlooked",
        regulation: "COSHH Regulations 2002"
      }
    ],
    category: "Battery Systems",
    difficulty: "Advanced",
    industry: "Commercial",
    riskLevel: "Critical",
    duration: "10 minutes",
    tags: ["batteries", "hydrogen", "explosion-risk"]
  },
  {
    id: 15,
    title: "Apprentice Supervision",
    description: "As a qualified electrician, you're supervising a second-year apprentice. You need to attend a site meeting but the apprentice is mid-task installing sockets.",
    question: "What should you do about the apprentice while you're at the meeting?",
    options: [
      {
        id: "A",
        text: "Leave them to continue as they're nearly finished",
        isCorrect: false,
        feedback: "Apprentices require appropriate supervision. Leaving them unsupervised on electrical work breaches your duty of care.",
        outcome: "Apprentice works unsupervised, increased risk of accident or poor work quality",
        regulation: "Management of Health and Safety at Work Regulations 1999"
      },
      {
        id: "B",
        text: "Ask another qualified person to supervise or bring the apprentice with you",
        isCorrect: true,
        feedback: "Correct! Apprentices must have appropriate supervision. Either transfer supervision or pause their electrical work.",
        outcome: "Supervision maintained, apprentice protected, duty of care fulfilled",
        regulation: "Apprenticeship Standards, HASAWA 1974 Section 3"
      },
      {
        id: "C",
        text: "Tell them to wait and do nothing until you return",
        isCorrect: false,
        feedback: "This wastes productive time. Better solutions exist that maintain both supervision and productivity.",
        outcome: "Time wasted but at least apprentice not working unsupervised",
        regulation: "Management of Health and Safety at Work Regulations 1999"
      },
      {
        id: "D",
        text: "Give them detailed instructions and check their work when you return",
        isCorrect: false,
        feedback: "Instructions aren't supervision. The apprentice needs a competent person available to guide them.",
        outcome: "Apprentice effectively unsupervised, potential for errors and accidents",
        regulation: "Apprenticeship Standards, Electricity at Work Regulations 1989"
      }
    ],
    category: "Supervision",
    difficulty: "Intermediate",
    industry: "All",
    riskLevel: "Medium",
    duration: "6 minutes",
    tags: ["supervision", "apprentice", "duty-of-care"]
  },
  {
    id: 16,
    title: "Consumer Unit Replacement",
    description: "You're replacing a consumer unit in an occupied domestic property. The existing installation has a mix of old and new cables.",
    question: "What testing is essential before energising the new consumer unit?",
    options: [
      {
        id: "A",
        text: "A quick continuity check of the earth wires",
        isCorrect: false,
        feedback: "Continuity alone is insufficient. Full testing sequence is required to verify the installation is safe.",
        outcome: "Incomplete testing may miss faults that could cause shock or fire",
        regulation: "BS 7671:2018 Section 6"
      },
      {
        id: "B",
        text: "Visual inspection only - the cables were already working",
        isCorrect: false,
        feedback: "Existing cables may have deteriorated or been damaged. Previous functionality doesn't guarantee current safety.",
        outcome: "Hidden defects remain undetected, risk of failure in service",
        regulation: "BS 7671:2018 Section 6, Regulation 643"
      },
      {
        id: "C",
        text: "Complete initial verification including insulation resistance, continuity, and RCD tests",
        isCorrect: true,
        feedback: "Correct! Consumer unit replacement requires full initial verification testing as it affects the entire installation.",
        outcome: "Installation safety verified, defects identified before energisation",
        regulation: "BS 7671:2018 Section 6, IET Guidance Note 3"
      },
      {
        id: "D",
        text: "Just test the new circuits you've added",
        isCorrect: false,
        feedback: "The new consumer unit affects the entire installation. All circuits supplied from it must be verified.",
        outcome: "Existing circuit faults remain undetected, incomplete certification",
        regulation: "BS 7671:2018 Chapter 61"
      }
    ],
    category: "Testing & Verification",
    difficulty: "Intermediate",
    industry: "Domestic",
    riskLevel: "Medium",
    duration: "9 minutes",
    tags: ["testing", "consumer-unit", "initial-verification"]
  },
  {
    id: 17,
    title: "Solar PV System Isolation",
    description: "You need to work on a roof-mounted solar PV system during daylight hours to replace a faulty DC isolator.",
    question: "What is the critical safety consideration specific to solar PV systems?",
    options: [
      {
        id: "A",
        text: "The AC inverter must be switched off at the consumer unit",
        isCorrect: false,
        feedback: "AC isolation alone doesn't make the DC side safe. Panels generate DC voltage whenever exposed to light.",
        outcome: "DC side remains energised, shock hazard from panels",
        regulation: "BS 7671:2018 Section 712"
      },
      {
        id: "B",
        text: "The DC side remains live whenever light falls on the panels",
        isCorrect: true,
        feedback: "Correct! Solar panels cannot be truly isolated in daylight. DC voltage is always present. Cover panels or work at dawn/dusk.",
        outcome: "Hazard understood, appropriate controls implemented",
        regulation: "BS 7671:2018 Section 712, BS EN 62446"
      },
      {
        id: "C",
        text: "The system can be isolated using the DC isolator at the inverter",
        isCorrect: false,
        feedback: "This isolates downstream but the panels and cables to the isolator remain energised by sunlight.",
        outcome: "Work area upstream of isolator remains live",
        regulation: "BS 7671:2018 Section 712"
      },
      {
        id: "D",
        text: "Standard electrical PPE provides adequate protection",
        isCorrect: false,
        feedback: "DC-rated PPE is required. Standard AC equipment may not be suitable for DC voltages and arc characteristics.",
        outcome: "Inadequate protection for DC hazards",
        regulation: "BS 7671:2018 Section 712, PPE at Work Regulations"
      }
    ],
    category: "Renewable Energy",
    difficulty: "Advanced",
    industry: "Domestic",
    riskLevel: "High",
    duration: "10 minutes",
    tags: ["solar-pv", "dc-systems", "renewable-energy"]
  },
  {
    id: 18,
    title: "Ring Final Circuit Testing",
    description: "You're conducting periodic inspection testing on a ring final circuit. Your continuity readings suggest the ring may have an interconnection.",
    question: "What does this indicate and how should you proceed?",
    options: [
      {
        id: "A",
        text: "The ring is fine - interconnections improve the circuit",
        isCorrect: false,
        feedback: "Interconnections can mask faults and lead to overloaded cables. They indicate non-compliant installation.",
        outcome: "Fault undetected, potential for cable overload and fire risk",
        regulation: "BS 7671:2018 Regulation 543.1.1"
      },
      {
        id: "B",
        text: "Report the interconnection as requiring investigation and potential remedial work",
        isCorrect: true,
        feedback: "Correct! Interconnections in rings must be investigated. They can cause unbalanced loading and mask faults.",
        outcome: "Issue recorded, investigation and remediation can proceed",
        regulation: "BS 7671:2018, IET Guidance Note 3"
      },
      {
        id: "C",
        text: "Convert the circuit to radials if an interconnection exists",
        isCorrect: false,
        feedback: "This may be a solution but requires proper design verification. You can't just convert without assessment.",
        outcome: "Premature action without proper engineering evaluation",
        regulation: "BS 7671:2018 Section 433"
      },
      {
        id: "D",
        text: "Ignore it if the insulation resistance test passes",
        isCorrect: false,
        feedback: "Insulation resistance doesn't detect interconnections. Different tests reveal different types of faults.",
        outcome: "Installation fault remains, potential for future problems",
        regulation: "BS 7671:2018 Chapter 64"
      }
    ],
    category: "Inspection & Testing",
    difficulty: "Advanced",
    industry: "All",
    riskLevel: "Medium",
    duration: "11 minutes",
    tags: ["testing", "ring-circuits", "fault-finding"]
  },
  {
    id: 19,
    title: "Three-Phase Supply",
    description: "You're connecting a new three-phase machine. During testing, you notice the phase rotation is incorrect.",
    question: "Why is correct phase rotation important and how should you address it?",
    options: [
      {
        id: "A",
        text: "It's not important for most equipment - proceed with connection",
        isCorrect: false,
        feedback: "Incorrect phase rotation can cause motors to run backwards, potentially damaging equipment or causing injury.",
        outcome: "Equipment damage, potential safety hazard from reversed rotation",
        regulation: "BS 7671:2018 Section 6"
      },
      {
        id: "B",
        text: "Swap any two phases at the supply end to correct the rotation",
        isCorrect: true,
        feedback: "Correct! Phase rotation can be corrected by swapping any two phases. Always retest after correction.",
        outcome: "Phase rotation corrected, equipment operates safely",
        regulation: "BS 7671:2018, Equipment manufacturer's requirements"
      },
      {
        id: "C",
        text: "The machine manufacturer should modify the machine",
        isCorrect: false,
        feedback: "Phase rotation is an installation issue, not a machine modification. It's the installer's responsibility.",
        outcome: "Unnecessary delay and cost, installation fault remains",
        regulation: "BS 7671:2018 Section 6, PUWER 1998"
      },
      {
        id: "D",
        text: "Reverse all three phases to maintain balance",
        isCorrect: false,
        feedback: "Reversing all three phases doesn't change rotation. Only swapping two phases reverses the sequence.",
        outcome: "Problem not solved, phase rotation unchanged",
        regulation: "Basic electrical theory"
      }
    ],
    category: "Three-Phase Systems",
    difficulty: "Intermediate",
    industry: "Industrial",
    riskLevel: "Medium",
    duration: "8 minutes",
    tags: ["three-phase", "phase-rotation", "motor-connection"]
  },
  {
    id: 20,
    title: "Client Pressure",
    description: "A client is pressuring you to energise a new installation before you've completed all required testing. They have an important event tomorrow.",
    question: "How should you handle this situation?",
    options: [
      {
        id: "A",
        text: "Energise the system but explain the risks to the client",
        isCorrect: false,
        feedback: "You cannot transfer legal responsibility to the client. Energising untested work is illegal under EAWR.",
        outcome: "Potential prosecution, insurance invalidation, safety risks",
        regulation: "Electricity at Work Regulations 1989, Regulation 4"
      },
      {
        id: "B",
        text: "Complete essential safety tests and leave cosmetic items for later",
        isCorrect: false,
        feedback: "All required tests must be completed. There's no distinction between 'essential' and 'cosmetic' in certification.",
        outcome: "Non-compliant certification, potential legal liability",
        regulation: "BS 7671:2018 Section 6"
      },
      {
        id: "C",
        text: "Politely refuse and explain that testing is a legal requirement for safety",
        isCorrect: true,
        feedback: "Correct! Professional integrity requires completing all testing. Explain the legal and safety implications calmly.",
        outcome: "Legal compliance maintained, client educated, professional standards upheld",
        regulation: "Electricity at Work Regulations 1989, BS 7671:2018"
      },
      {
        id: "D",
        text: "Get the client to sign a waiver accepting responsibility",
        isCorrect: false,
        feedback: "Waivers don't remove your legal obligations under health and safety law. You remain responsible.",
        outcome: "False protection, legal liability remains with installer",
        regulation: "HASAWA 1974, Electricity at Work Regulations 1989"
      }
    ],
    category: "Professional Conduct",
    difficulty: "Intermediate",
    industry: "All",
    riskLevel: "High",
    duration: "7 minutes",
    tags: ["professional-ethics", "client-management", "legal-compliance"]
  }
];
