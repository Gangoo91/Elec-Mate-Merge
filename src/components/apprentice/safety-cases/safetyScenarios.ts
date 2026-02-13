export interface ScenarioOption {
  id: string;
  text: string;
  isCorrect: boolean;
  feedback: string;
  outcome: string;
  regulation: string;
}

export interface ScenarioStep {
  id: string;
  situation: string;
  question: string;
  options: ScenarioOption[];
}

export interface SafetyScenario {
  id: number;
  title: string;
  briefing: string;
  location: string;
  steps: ScenarioStep[];
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  tags: string[];
  realCase?: {
    summary: string;
    fineAmount?: string;
    consequence: string;
  };
  estimatedMinutes: number;
}

export const safetyScenarios: SafetyScenario[] = [
  {
    id: 1,
    title: "Electrical Isolation Safety",
    briefing: "You arrive at an office building in Birmingham to replace a faulty light fitting on the first floor. The building is occupied and staff are working nearby. The existing consumer unit is in a locked cupboard and you have the key.",
    location: "Office building, Birmingham",
    category: "Electrical Safety",
    difficulty: "Beginner",
    tags: ["isolation", "testing", "basic-safety"],
    estimatedMinutes: 5,
    realCase: {
      summary: "An electrician was fatally electrocuted while replacing a light fitting without isolating the supply. The circuit had been incorrectly labelled at the distribution board.",
      fineAmount: "£200,000",
      consequence: "One fatality. Company prosecuted under EAWR 1989."
    },
    steps: [
      {
        id: "1-1",
        situation: "You open the consumer unit cupboard and see the distribution board. The circuits are labelled but some labels look old and faded.",
        question: "Before starting work on the lighting circuit, what is your first priority?",
        options: [
          { id: "A", text: "Start removing the light fitting immediately", isCorrect: false, feedback: "Never start electrical work without proper isolation. This could result in electric shock or death.", outcome: "Potential electric shock, serious injury or fatality", regulation: "Electricity at Work Regulations 1989, Regulation 4" },
          { id: "B", text: "Turn off the lights using the wall switch", isCorrect: false, feedback: "Wall switches only control the load side and do not guarantee isolation. Live conductors may still be present.", outcome: "Risk of electric shock as circuits remain live", regulation: "BS 7671:2018 Section 537 - Isolation and Switching" },
          { id: "C", text: "Follow the safe isolation procedure and test the circuit is dead", isCorrect: true, feedback: "Correct! Safe isolation is fundamental to electrical safety. Always follow the proven dead procedure.", outcome: "Safe working environment established", regulation: "Electricity at Work Regulations 1989, Regulation 13" },
          { id: "D", text: "Check if anyone is using the lights first", isCorrect: false, feedback: "While consideration of others is important, this does not address the electrical safety requirements.", outcome: "Electrical hazards remain uncontrolled", regulation: "Management of Health and Safety at Work Regulations 1999" }
        ]
      },
      {
        id: "1-2",
        situation: "You have isolated what you believe is the correct circuit. You now need to confirm the circuit is dead before touching any conductors.",
        question: "What is the correct proving dead procedure?",
        options: [
          { id: "A", text: "Use a voltage indicator to test the circuit once", isCorrect: false, feedback: "A single test is not enough. The voltage indicator itself could be faulty, giving a false reading.", outcome: "Risk of working on a live circuit if tester is faulty", regulation: "HSE GS38 - Electrical Test Equipment" },
          { id: "B", text: "Prove the voltage indicator on a known live source, test the circuit, then re-prove the indicator", isCorrect: true, feedback: "Correct! The three-step proving dead procedure ensures both the tester and the circuit are verified safe.", outcome: "Circuit confirmed dead, safe to proceed", regulation: "HSE GS38, Electricity at Work Regulations 1989 Regulation 13" },
          { id: "C", text: "Use a non-contact voltage detector as your primary test", isCorrect: false, feedback: "Non-contact detectors are useful indicators but must never be used as the sole means of proving dead.", outcome: "False sense of security, circuit may still be live", regulation: "HSE GS38 - Use of approved voltage indicators" },
          { id: "D", text: "Ask a colleague to confirm the circuit is off at the board", isCorrect: false, feedback: "Verbal confirmation is not a substitute for testing. You must personally verify the circuit is dead.", outcome: "Relying on others without verification is unsafe", regulation: "Electricity at Work Regulations 1989, Regulation 4" }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Working at Height",
    briefing: "You have been called to a warehouse in Leeds to install new LED high-bay lighting at 4 metres above ground level. The warehouse is active with forklift traffic below. The existing fittings are fluorescent and end-of-life.",
    location: "Industrial warehouse, Leeds",
    category: "Working at Height",
    difficulty: "Intermediate",
    tags: ["height", "ladders", "access-equipment"],
    estimatedMinutes: 7,
    realCase: {
      summary: "An electrician fell 3.5 metres from an unsecured ladder while installing warehouse lighting. The ladder slipped on a dusty concrete floor.",
      fineAmount: "£150,000",
      consequence: "Broken pelvis and spinal injuries. Six months off work."
    },
    steps: [
      {
        id: "2-1",
        situation: "You assess the warehouse floor. It is smooth concrete with some dust and oil patches. Forklifts are operating in adjacent aisles.",
        question: "What is the most appropriate access equipment for this task?",
        options: [
          { id: "A", text: "Use a wooden chair stacked on a table", isCorrect: false, feedback: "Improvised access equipment is extremely dangerous and prohibited on construction sites.", outcome: "High risk of falls, serious injury or death", regulation: "Work at Height Regulations 2005, Regulation 6" },
          { id: "B", text: "Use a Mobile Elevating Work Platform (MEWP) with barriers below", isCorrect: true, feedback: "Correct! At 4 metres with forklift traffic, a MEWP provides the safest platform with guardrails and ground-level barriers.", outcome: "Stable elevated platform with fall protection and ground exclusion zone", regulation: "Work at Height Regulations 2005, Regulation 7" },
          { id: "C", text: "Stand on the nearest workbench or racking", isCorrect: false, feedback: "Racking and furniture are not designed as access equipment and pose significant fall risks.", outcome: "Risk of falls and racking collapse", regulation: "Workplace (Health, Safety and Welfare) Regulations 1992" },
          { id: "D", text: "Use a step ladder with someone footing it", isCorrect: false, feedback: "At 4 metres, a step ladder is not appropriate. The work height and duration require a more stable platform.", outcome: "Ladder too short and unstable for this height and duration", regulation: "Work at Height Regulations 2005, Schedule 6" }
        ]
      },
      {
        id: "2-2",
        situation: "You are now at height in the MEWP. You need to disconnect the old fluorescent fitting which is wired into a trunking system running along the ceiling.",
        question: "What additional safety consideration applies when working from the MEWP?",
        options: [
          { id: "A", text: "Lean over the guardrail to reach a fitting just out of range", isCorrect: false, feedback: "Never lean over MEWP guardrails. Reposition the platform to bring the work within safe reach.", outcome: "Risk of falling from the platform", regulation: "Work at Height Regulations 2005, Regulation 6" },
          { id: "B", text: "Ensure you wear the harness and lanyard attached to the anchor point inside the basket", isCorrect: true, feedback: "Correct! MEWP operators must wear a harness connected to the designated anchor point to prevent ejection.", outcome: "Fall protection in place, safe working at height", regulation: "Work at Height Regulations 2005, Regulation 6, IPAF guidance" },
          { id: "C", text: "Remove the guardrails to get better access to the fittings", isCorrect: false, feedback: "Guardrails are a primary fall prevention measure and must never be removed during operation.", outcome: "Total loss of fall protection", regulation: "Work at Height Regulations 2005, Schedule 3" },
          { id: "D", text: "Stand on the guardrail to gain extra height", isCorrect: false, feedback: "Standing on guardrails defeats their purpose and creates an extreme fall hazard.", outcome: "Extreme risk of falling from height", regulation: "Work at Height Regulations 2005, Regulation 6" }
        ]
      }
    ]
  },
  {
    id: 3,
    title: "PPE Selection for Live Working",
    briefing: "You are at a data centre in Manchester where a critical UPS switchboard requires urgent maintenance. The client insists the supply cannot be isolated as it feeds live servers. Your company has authorised live working under a permit.",
    location: "Data centre, Manchester",
    category: "PPE",
    difficulty: "Advanced",
    tags: ["ppe", "live-working", "arc-flash"],
    estimatedMinutes: 8,
    realCase: {
      summary: "An arc flash incident at a data centre switchboard caused severe burns to an electrician wearing only standard work clothes. The arc flash energy was calculated at 12 cal/cm\u00B2.",
      fineAmount: "£350,000",
      consequence: "Third-degree burns to face and arms. Permanent scarring."
    },
    steps: [
      {
        id: "3-1",
        situation: "You are preparing to open the switchboard panel. The panel is rated at 400V three-phase with a prospective fault current of 25kA.",
        question: "What PPE is most critical for this high-risk activity?",
        options: [
          { id: "A", text: "Standard work clothes and safety boots", isCorrect: false, feedback: "Standard clothing provides no protection against electrical hazards in live working situations.", outcome: "No protection against electric shock or arc flash", regulation: "Personal Protective Equipment at Work Regulations 1992" },
          { id: "B", text: "Arc flash rated clothing, insulated gloves, and face protection", isCorrect: true, feedback: "Correct! Live working requires the highest level of PPE protection against electrical hazards.", outcome: "Maximum protection against electrical hazards", regulation: "Electricity at Work Regulations 1989, Regulation 4" },
          { id: "C", text: "Just insulated gloves", isCorrect: false, feedback: "Partial protection is inadequate for live working. Complete arc flash protection is required.", outcome: "Inadequate protection against arc flash and shock", regulation: "BS EN 61482 - Arc Flash Protection" },
          { id: "D", text: "High-vis jacket and hard hat", isCorrect: false, feedback: "These provide no electrical protection and are inappropriate for live electrical work.", outcome: "No electrical protection, high risk of injury", regulation: "Construction (Head Protection) Regulations 1989" }
        ]
      },
      {
        id: "3-2",
        situation: "You are wearing full arc flash PPE. A colleague arrives and says they need to help you but has no arc flash PPE available.",
        question: "How should you handle this situation?",
        options: [
          { id: "A", text: "Let them assist from a safe distance without PPE", isCorrect: false, feedback: "The arc flash boundary extends beyond the immediate work area. Anyone within it needs appropriate PPE.", outcome: "Colleague at risk of arc flash injuries", regulation: "BS EN 61482, NFPA 70E arc flash boundary" },
          { id: "B", text: "Share your PPE by giving them your face shield", isCorrect: false, feedback: "Sharing PPE compromises both workers' protection. Each person needs their own complete set.", outcome: "Both workers inadequately protected", regulation: "PPE at Work Regulations 1992, Regulation 4" },
          { id: "C", text: "Do not allow them inside the arc flash boundary until they have appropriate PPE", isCorrect: true, feedback: "Correct! No one should enter the arc flash boundary without full appropriate PPE. The work must wait if necessary.", outcome: "Both workers properly protected before proceeding", regulation: "Electricity at Work Regulations 1989, PPE at Work Regulations 1992" },
          { id: "D", text: "Proceed alone and rush to finish quickly", isCorrect: false, feedback: "Rushing live work is extremely dangerous. Live working procedures require careful, methodical work.", outcome: "Increased risk of error and incident during live work", regulation: "Electricity at Work Regulations 1989, Regulation 4" }
        ]
      }
    ]
  },
  {
    id: 4,
    title: "Emergency Response to Electric Shock",
    briefing: "You are working on a commercial fit-out in a shopping centre in Glasgow. You hear a shout from the adjacent unit where another contractor is working. You rush over and find a worker lying on the ground near an open distribution board.",
    location: "Shopping centre, Glasgow",
    category: "Emergency Response",
    difficulty: "Intermediate",
    tags: ["emergency", "first-aid", "electrical-shock"],
    estimatedMinutes: 6,
    realCase: {
      summary: "A contractor received a 230V shock from an exposed terminal in a distribution board. A colleague pulled him away bare-handed and also received a shock.",
      consequence: "Two workers hospitalised. First worker suffered cardiac arrhythmia."
    },
    steps: [
      {
        id: "4-1",
        situation: "The worker is lying motionless near the open distribution board. You can see exposed conductors inside. You are not sure if they are still in contact with the supply.",
        question: "What is your immediate first action?",
        options: [
          { id: "A", text: "Touch them to check if they are responsive", isCorrect: false, feedback: "Never touch someone who may still be in contact with electricity. You could become a victim too.", outcome: "Risk of secondary electrocution", regulation: "Health and Safety (First Aid) Regulations 1981" },
          { id: "B", text: "Turn off the main power supply if safely accessible", isCorrect: true, feedback: "Correct! Ensuring the area is safe before providing aid prevents additional casualties.", outcome: "Scene made safe, enabling effective first aid", regulation: "Electricity at Work Regulations 1989, Regulation 4" },
          { id: "C", text: "Pour water on them to wake them up", isCorrect: false, feedback: "Water conducts electricity and could create additional hazards in an electrical emergency.", outcome: "Increased risk of electrocution and complications", regulation: "Management of Health and Safety at Work Regulations 1999" },
          { id: "D", text: "Move them away from the electrical equipment immediately", isCorrect: false, feedback: "Do not touch them until you are certain the power is off. Use a non-conductive object if urgent.", outcome: "Risk of electrocution to rescuer", regulation: "Health and Safety (First Aid) Regulations 1981" }
        ]
      },
      {
        id: "4-2",
        situation: "You have isolated the power. The worker is unconscious but breathing. Other workers are gathering around.",
        question: "What is the correct sequence of actions now?",
        options: [
          { id: "A", text: "Call 999, place them in the recovery position, monitor breathing, and send someone to meet the ambulance", isCorrect: true, feedback: "Correct! Call emergency services, maintain airway, monitor for changes, and ensure the ambulance can find you.", outcome: "Professional medical help summoned, casualty stabilised", regulation: "Health and Safety (First Aid) Regulations 1981, RIDDOR 2013" },
          { id: "B", text: "Give them CPR immediately", isCorrect: false, feedback: "CPR is for casualties who are not breathing. This person is breathing, so recovery position is correct.", outcome: "Unnecessary CPR on a breathing casualty could cause harm", regulation: "Resuscitation Council UK guidelines" },
          { id: "C", text: "Move them to a more comfortable location", isCorrect: false, feedback: "Do not move an unconscious casualty unnecessarily as they may have spinal injuries from a fall.", outcome: "Risk of aggravating spinal injuries", regulation: "Health and Safety (First Aid) Regulations 1981" },
          { id: "D", text: "Wait for them to wake up on their own", isCorrect: false, feedback: "An unconscious casualty needs immediate monitoring. Their condition could deteriorate without warning.", outcome: "Delayed treatment could prove fatal", regulation: "Health and Safety (First Aid) Regulations 1981" }
        ]
      },
      {
        id: "4-3",
        situation: "The ambulance has arrived and the casualty is being treated. Your supervisor asks you about reporting.",
        question: "What reporting is required for this incident?",
        options: [
          { id: "A", text: "No reporting needed as the person is being treated", isCorrect: false, feedback: "Electrical injuries resulting in unconsciousness must be reported under RIDDOR regardless of treatment.", outcome: "Failure to comply with legal reporting requirements", regulation: "RIDDOR 2013, Regulation 4" },
          { id: "B", text: "Report to RIDDOR as it is an injury from electric shock leading to unconsciousness", isCorrect: true, feedback: "Correct! Loss of consciousness from electrical contact is a RIDDOR-reportable dangerous occurrence. Report within 10 days.", outcome: "Legal compliance, incident investigated to prevent recurrence", regulation: "RIDDOR 2013, Regulation 7, Schedule 2" },
          { id: "C", text: "Just fill in the company accident book", isCorrect: false, feedback: "The accident book is important but insufficient. RIDDOR reporting to the HSE is a legal requirement for this type of incident.", outcome: "Incomplete reporting, potential prosecution for non-compliance", regulation: "RIDDOR 2013, HASAWA 1974" },
          { id: "D", text: "Only report if the person does not return to work", isCorrect: false, feedback: "RIDDOR reporting is triggered by the nature of the injury, not by absence from work. Electrical unconsciousness is always reportable.", outcome: "Misunderstanding of reporting triggers", regulation: "RIDDOR 2013, Regulation 4" }
        ]
      }
    ]
  },
  {
    id: 5,
    title: "Tool Safety Inspection",
    briefing: "You arrive at a domestic property in Bristol to install additional sockets. Your van has your own tested tools, but you notice a colleague has left their drill and SDS on site from yesterday. The homeowner asks you to use whatever is quickest.",
    location: "Domestic property, Bristol",
    category: "Tool Safety",
    difficulty: "Beginner",
    tags: ["tools", "inspection", "portable-equipment"],
    estimatedMinutes: 5,
    steps: [
      {
        id: "5-1",
        situation: "You look at the colleague's drill. The cable has some tape wrapped around it near the plug end, and the PAT test sticker shows it was last tested 18 months ago.",
        question: "What should you check before using this tool?",
        options: [
          { id: "A", text: "Just check if it turns on properly", isCorrect: false, feedback: "A basic function test does not identify potential electrical safety hazards that could cause injury.", outcome: "Hidden defects may cause electric shock or fire", regulation: "Provision and Use of Work Equipment Regulations 1998" },
          { id: "B", text: "Visually inspect the cable, plug, and casing for damage", isCorrect: true, feedback: "Correct! Visual inspection of portable electrical equipment is essential before each use. The taped cable is a red flag.", outcome: "Potential hazards identified before use", regulation: "Electricity at Work Regulations 1989, Regulation 4" },
          { id: "C", text: "Ask the homeowner if the drill worked fine yesterday", isCorrect: false, feedback: "You must make your own safety checks. Others may not notice defects or safety issues.", outcome: "Reliance on unqualified opinion may miss critical defects", regulation: "Management of Health and Safety at Work Regulations 1999" },
          { id: "D", text: "Use it immediately since it belongs to a qualified person", isCorrect: false, feedback: "Tools can be damaged between uses. Always inspect equipment regardless of ownership.", outcome: "Risk of using defective equipment", regulation: "Provision and Use of Work Equipment Regulations 1998" }
        ]
      },
      {
        id: "5-2",
        situation: "Your visual inspection reveals the cable has been repaired with insulation tape rather than properly replaced. The drill casing also has a crack near the ventilation slots.",
        question: "What action should you take?",
        options: [
          { id: "A", text: "Use it carefully and report it later", isCorrect: false, feedback: "Defective equipment must never be used. A taped cable and cracked casing are serious safety hazards.", outcome: "Risk of electric shock from damaged insulation", regulation: "PUWER 1998, Regulation 5" },
          { id: "B", text: "Remove the tool from use, label it as defective, and use your own tested equipment", isCorrect: true, feedback: "Correct! Defective equipment must be taken out of service immediately and clearly marked to prevent others using it.", outcome: "Defective tool removed, safe equipment used instead", regulation: "PUWER 1998, Regulation 5, EAWR 1989 Regulation 4" },
          { id: "C", text: "Replace the tape with better quality tape", isCorrect: false, feedback: "Taping a damaged cable is never an acceptable repair. The cable must be professionally replaced.", outcome: "Inadequate repair leaves shock hazard present", regulation: "Electricity at Work Regulations 1989, Regulation 4" },
          { id: "D", text: "Use it only on battery power if possible", isCorrect: false, feedback: "This drill is mains-powered. The damage makes it unsafe regardless. It must be properly repaired or replaced.", outcome: "Not applicable and tool remains dangerous", regulation: "PUWER 1998, Regulation 5" }
        ]
      }
    ]
  },
  {
    id: 6,
    title: "Confined Space Working",
    briefing: "You need to install emergency lighting in a basement plant room beneath a block of flats in London. The room houses gas boilers, water tanks, and ventilation equipment. Access is through a single narrow staircase.",
    location: "Basement plant room, London",
    category: "Confined Spaces",
    difficulty: "Advanced",
    tags: ["confined-spaces", "atmosphere-testing", "emergency-procedures"],
    estimatedMinutes: 8,
    realCase: {
      summary: "Two workers died from carbon monoxide poisoning in a basement plant room. A faulty boiler flue had been leaking CO into the space. No atmospheric monitoring was conducted.",
      consequence: "Two fatalities. Building management company fined and director imprisoned."
    },
    steps: [
      {
        id: "6-1",
        situation: "You arrive at the building and the caretaker opens the plant room door. The room is below ground with no windows. You can hear the boilers running and smell a slight musty odour.",
        question: "What safety precautions are essential before entering this space?",
        options: [
          { id: "A", text: "Enter immediately as it is just a basement", isCorrect: false, feedback: "Basements can be confined spaces with serious hazards including toxic gases and oxygen depletion.", outcome: "Risk of asphyxiation or exposure to toxic gases", regulation: "Confined Spaces Regulations 1997" },
          { id: "B", text: "Test the atmosphere and ensure someone knows your location", isCorrect: true, feedback: "Correct! Atmospheric testing and communication procedures are vital for confined space safety.", outcome: "Hazards identified and safety measures in place", regulation: "Confined Spaces Regulations 1997, Regulation 4" },
          { id: "C", text: "Open the door wide to improve ventilation", isCorrect: false, feedback: "While ventilation helps, this does not address all confined space hazards like gas testing and rescue procedures.", outcome: "Incomplete safety measures leave significant risks", regulation: "Workplace (Health, Safety and Welfare) Regulations 1992" },
          { id: "D", text: "Work quickly to minimise time in the space", isCorrect: false, feedback: "Speed does not eliminate confined space hazards and may increase risks through poor decision-making.", outcome: "Rushing increases accident risk in hazardous environment", regulation: "Management of Health and Safety at Work Regulations 1999" }
        ]
      },
      {
        id: "6-2",
        situation: "Your atmospheric monitor shows safe oxygen levels and no CO detected. You begin work but 30 minutes in, your personal CO alarm starts beeping, showing 35ppm.",
        question: "What should you do?",
        options: [
          { id: "A", text: "Ignore it — the earlier reading was clear", isCorrect: false, feedback: "CO levels can change rapidly, especially if boiler conditions change. Alarm triggers must always be acted on.", outcome: "Risk of CO poisoning, potentially fatal", regulation: "Confined Spaces Regulations 1997, Regulation 4" },
          { id: "B", text: "Leave the space immediately, ventilate, and do not re-enter until the source is identified", isCorrect: true, feedback: "Correct! Any CO alarm must be treated as a genuine emergency. Leave immediately and investigate the source before re-entry.", outcome: "Workers evacuated safely, hazard source investigated", regulation: "Confined Spaces Regulations 1997, Regulation 5, EH40 Workplace Exposure Limits" },
          { id: "C", text: "Open the door wider and continue working", isCorrect: false, feedback: "35ppm CO is above the workplace exposure limit of 20ppm. The source must be found and fixed before continuing.", outcome: "Continued exposure to toxic gas", regulation: "EH40 Workplace Exposure Limits, CO WEL 20ppm TWA" },
          { id: "D", text: "Put on a dust mask and continue", isCorrect: false, feedback: "Dust masks provide zero protection against carbon monoxide. CO is odourless and passes through dust filters.", outcome: "No protection provided, continued toxic exposure", regulation: "COSHH Regulations 2002, RPE selection guidance" }
        ]
      }
    ]
  },
  {
    id: 7,
    title: "COSHH Assessment",
    briefing: "You are installing wiring for a new kitchen extractor system in a commercial kitchen in Edinburgh. The kitchen staff use industrial cleaning chemicals daily and the area has just been deep-cleaned.",
    location: "Commercial kitchen, Edinburgh",
    category: "COSHH",
    difficulty: "Intermediate",
    tags: ["chemicals", "hazardous-substances", "risk-assessment"],
    estimatedMinutes: 6,
    steps: [
      {
        id: "7-1",
        situation: "The floor is still wet from cleaning. You can smell strong chemical odours. Several containers of industrial degreaser and oven cleaner are stored under the counter near your work area.",
        question: "What is your primary concern regarding electrical work in this environment?",
        options: [
          { id: "A", text: "The chemicals might stain your clothes", isCorrect: false, feedback: "Cosmetic concerns are secondary to serious health and safety risks from chemical exposure.", outcome: "Serious health hazards remain unaddressed", regulation: "Control of Substances Hazardous to Health Regulations 2002" },
          { id: "B", text: "Chemical vapours may be flammable or toxic, and wet surfaces create electrical hazards", isCorrect: true, feedback: "Correct! Chemical vapours can create fire/explosion risks, health hazards, and wet surfaces increase shock risk.", outcome: "Chemical and electrical hazards properly assessed and controlled", regulation: "COSHH Regulations 2002, Regulation 6" },
          { id: "C", text: "The smell might be unpleasant", isCorrect: false, feedback: "Unpleasant odours may indicate serious chemical hazards that require proper risk assessment.", outcome: "Potentially serious exposure risks ignored", regulation: "Control of Substances Hazardous to Health Regulations 2002" },
          { id: "D", text: "It will take longer to complete the work", isCorrect: false, feedback: "Time concerns are irrelevant when chemical hazards may cause serious injury or ill health.", outcome: "Health risks prioritised below convenience", regulation: "Management of Health and Safety at Work Regulations 1999" }
        ]
      },
      {
        id: "7-2",
        situation: "You decide to review the COSHH data sheets for the chemicals stored nearby. The industrial degreaser contains volatile organic compounds and is labelled as flammable.",
        question: "What control measure is most important before using power tools near these chemicals?",
        options: [
          { id: "A", text: "Ensure adequate ventilation and move flammable chemicals away from your work area", isCorrect: true, feedback: "Correct! Removing ignition sources from flammable vapours and ensuring ventilation are essential controls.", outcome: "Flammable atmosphere risk eliminated from work area", regulation: "DSEAR 2002, COSHH Regulations 2002 Regulation 7" },
          { id: "B", text: "Wear a dust mask while working", isCorrect: false, feedback: "A dust mask does not protect against chemical vapours. An appropriate respirator would be needed for vapour protection.", outcome: "Inadequate respiratory protection", regulation: "COSHH Regulations 2002, RPE selection" },
          { id: "C", text: "Work quickly before the vapours build up", isCorrect: false, feedback: "Rushing does not address the hazard. Proper ventilation and chemical management are required.", outcome: "Vapours may already be at dangerous concentrations", regulation: "COSHH Regulations 2002, Regulation 7" },
          { id: "D", text: "Use battery-powered tools only", isCorrect: false, feedback: "While reducing one ignition source, this does not address ventilation or chemical storage near the work area.", outcome: "Only partially addresses the flammable atmosphere risk", regulation: "DSEAR 2002, COSHH Regulations 2002" }
        ]
      }
    ]
  },
  {
    id: 8,
    title: "Excavation and Underground Cables",
    briefing: "You are installing underground armoured cable for new garden lighting at a large country house in Kent. The homeowner wants the cable run across 30 metres of established garden to a new outbuilding.",
    location: "Domestic property, Kent",
    category: "Underground Services",
    difficulty: "Intermediate",
    tags: ["excavation", "cable-location", "cat-scanner"],
    estimatedMinutes: 7,
    realCase: {
      summary: "A landscaper struck a live 11kV cable while digging a trench in a garden. The cable had been laid by the DNO 40 years earlier and was not on any plans.",
      fineAmount: "£80,000",
      consequence: "Severe burns to hands and arms. Power cut to 200 homes."
    },
    steps: [
      {
        id: "8-1",
        situation: "The homeowner says there are no underground services in the garden. The property was built in the 1960s and has been extended twice since.",
        question: "What should you do before starting excavation?",
        options: [
          { id: "A", text: "Trust the homeowner's knowledge and start digging carefully", isCorrect: false, feedback: "Homeowners often do not know about buried services. Many cables and pipes were installed before current records existed.", outcome: "Risk of striking unknown services causing injury or supply disruption", regulation: "HSG47 Avoiding Danger from Underground Services" },
          { id: "B", text: "Use a cable avoidance tool (CAT) and Genny to scan the area before digging", isCorrect: true, feedback: "Correct! Always use CAT and Genny equipment to locate underground services before any excavation work.", outcome: "Underground services located and marked, safe digging area established", regulation: "HSG47 Avoiding Danger from Underground Services" },
          { id: "C", text: "Dig slowly with a spade and stop if you hit anything", isCorrect: false, feedback: "By the time you hit a cable, damage may already have occurred. Prevention through detection is essential.", outcome: "High risk of cable strike causing electric shock or burns", regulation: "Electricity at Work Regulations 1989, Regulation 14" },
          { id: "D", text: "Only dig to a shallow depth to avoid deep services", isCorrect: false, feedback: "Services can be at any depth, especially in gardens where previous work may have disturbed original positions.", outcome: "False sense of security, services may be at unexpected depths", regulation: "HSG47 Avoiding Danger from Underground Services" }
        ]
      },
      {
        id: "8-2",
        situation: "Your CAT scan detects a signal running across the proposed trench route at approximately 600mm depth. The signal is consistent with a power cable.",
        question: "How should you proceed with the trench?",
        options: [
          { id: "A", text: "Dig the trench anyway but avoid the area where the signal was detected", isCorrect: false, feedback: "The signal indicates approximate position only. The cable could be anywhere within a wider zone.", outcome: "Risk of striking the cable outside the indicated zone", regulation: "HSG47, PAS 128 utility survey standards" },
          { id: "B", text: "Hand dig trial holes to expose and identify the service before machine excavation", isCorrect: true, feedback: "Correct! Trial holes using hand tools confirm the exact position and depth of the service before any further excavation.", outcome: "Service positively identified and protected during works", regulation: "HSG47, NJUG Guidelines on safe digging practices" },
          { id: "C", text: "Use a mechanical digger carefully in that area", isCorrect: false, feedback: "Mechanical diggers can easily damage underground cables. Hand digging is required near detected services.", outcome: "High risk of cable damage from mechanical excavation", regulation: "HSG47, Section 5 - Safe digging practices" },
          { id: "D", text: "Reroute the cable to avoid the area entirely", isCorrect: false, feedback: "Rerouting may be an option but you first need to confirm what the service is. It may affect the entire garden.", outcome: "Potentially unnecessary rerouting without confirming service identity", regulation: "HSG47 Avoiding Danger from Underground Services" }
        ]
      }
    ]
  },
  {
    id: 9,
    title: "Site Communication and Reporting",
    briefing: "You are part of a team rewiring a care home in Cardiff. During first fix, you discover that the fire alarm cable installed by another contractor has been routed through a void without fire barriers. This is a serious fire safety risk.",
    location: "Care home, Cardiff",
    category: "Site Communication",
    difficulty: "Beginner",
    tags: ["communication", "reporting", "hazard-identification"],
    estimatedMinutes: 5,
    steps: [
      {
        id: "9-1",
        situation: "You discover the fire alarm cable issue. Your supervisor is at a meeting at the main contractor's office across town and won't be back for two hours.",
        question: "How should you handle this safety concern?",
        options: [
          { id: "A", text: "Wait until the supervisor is available to discuss it", isCorrect: false, feedback: "Safety concerns should never be delayed. In a care home, fire safety is critical to vulnerable residents.", outcome: "Fire safety hazard remains uncontrolled in occupied building", regulation: "Regulatory Reform (Fire Safety) Order 2005" },
          { id: "B", text: "Report it immediately to the site manager and your supervisor by phone", isCorrect: true, feedback: "Correct! Safety always takes priority. Secure the hazard and report through available channels immediately.", outcome: "Immediate hazard control and proper reporting", regulation: "Management of Health and Safety at Work Regulations 1999, HASAWA 1974" },
          { id: "C", text: "Continue working but avoid that area", isCorrect: false, feedback: "Avoiding the hazard does not protect the care home residents. Fire safety issues must be reported and addressed.", outcome: "Fire safety compromise remains for vulnerable occupants", regulation: "Health and Safety at Work etc. Act 1974" },
          { id: "D", text: "Fix the problem yourself to save time", isCorrect: false, feedback: "Fire alarm systems require specialist competence. Altering another contractor's work without authorisation creates liability.", outcome: "Risk of creating additional problems or voiding fire alarm certification", regulation: "BS 5839-1, Regulatory Reform (Fire Safety) Order 2005" }
        ]
      },
      {
        id: "9-2",
        situation: "You have reported the issue. The site manager thanks you but says they will deal with it next week as the fire alarm contractor is busy.",
        question: "What should you do now?",
        options: [
          { id: "A", text: "Accept the site manager's decision and continue your work", isCorrect: false, feedback: "If you believe there is a serious and imminent danger, you have a legal duty to escalate further.", outcome: "Fire safety risk remains in occupied care home", regulation: "HASAWA 1974, Section 7" },
          { id: "B", text: "Record the issue formally, inform your supervisor, and if necessary escalate to the responsible person for fire safety", isCorrect: true, feedback: "Correct! Document everything, escalate through your chain, and ensure the responsible person for fire safety in the care home is informed.", outcome: "Issue formally documented and escalated to those with fire safety duties", regulation: "HASAWA 1974 Section 7, Regulatory Reform (Fire Safety) Order 2005 Article 5" },
          { id: "C", text: "Leave the site in protest", isCorrect: false, feedback: "Leaving does not resolve the hazard. Formal escalation through proper channels is more effective.", outcome: "Issue remains unresolved, professional relationship damaged", regulation: "Management of Health and Safety at Work Regulations 1999" },
          { id: "D", text: "Post about it on social media to raise awareness", isCorrect: false, feedback: "Social media is not an appropriate reporting channel and may breach confidentiality obligations.", outcome: "Unprofessional conduct, potential breach of contract", regulation: "Professional conduct standards" }
        ]
      }
    ]
  },
  {
    id: 10,
    title: "Manual Handling of Electrical Equipment",
    briefing: "You are installing a new three-phase distribution board weighing approximately 45kg in a school in Newcastle. The board needs to go from the delivery van to a plant room on the second floor. The school is occupied with children in classes.",
    location: "Secondary school, Newcastle",
    category: "Manual Handling",
    difficulty: "Beginner",
    tags: ["manual-handling", "team-lifting", "mechanical-aids"],
    estimatedMinutes: 5,
    steps: [
      {
        id: "10-1",
        situation: "The distribution board is on the tail-lift of the van. The route to the plant room involves a narrow corridor, one flight of stairs, and a fire door.",
        question: "What is the safest approach for moving this equipment?",
        options: [
          { id: "A", text: "Lift it yourself using proper lifting technique", isCorrect: false, feedback: "45kg exceeds safe manual lifting limits for most individuals. Even with good technique, this risks serious back injury.", outcome: "High risk of musculoskeletal injury", regulation: "Manual Handling Operations Regulations 1992" },
          { id: "B", text: "Get a colleague to help and use a sack truck or trolley where possible", isCorrect: true, feedback: "Correct! Team lifting and mechanical aids reduce individual load and injury risk significantly.", outcome: "Load shared safely, reduced injury risk", regulation: "Manual Handling Operations Regulations 1992, Regulation 4" },
          { id: "C", text: "Drag it along the floor to avoid lifting", isCorrect: false, feedback: "Dragging can damage the equipment and still cause back strain from awkward postures. It also damages floor finishes.", outcome: "Equipment damage and potential back injury", regulation: "Workplace (Health, Safety and Welfare) Regulations 1992" },
          { id: "D", text: "Take the distribution board apart to reduce the weight", isCorrect: false, feedback: "Distribution boards should not be disassembled for transport as this can affect safety and void warranty.", outcome: "Risk of equipment damage and safety compromise", regulation: "Provision and Use of Work Equipment Regulations 1998" }
        ]
      },
      {
        id: "10-2",
        situation: "You and your colleague are carrying the board up the stairs using a stair-climbing trolley. A group of school children come running around the corner towards you.",
        question: "What should you do?",
        options: [
          { id: "A", text: "Shout at the children to get out of the way", isCorrect: false, feedback: "Shouting may startle the children and cause them to run unpredictably. A calm approach is safer.", outcome: "Children may panic and create additional hazards", regulation: "HASAWA 1974, duty of care to non-employees" },
          { id: "B", text: "Stop, set the load down safely, and wait for the corridor to clear", isCorrect: true, feedback: "Correct! Safety of the public, especially children, takes priority. Set the load down and wait for safe passage.", outcome: "Children safe, load secure, no rush or risk", regulation: "HASAWA 1974 Section 3, Manual Handling Operations Regulations 1992" },
          { id: "C", text: "Continue moving and expect them to get out of the way", isCorrect: false, feedback: "Children are unpredictable. Continuing with a heavy load in a crowded corridor risks collision and injury.", outcome: "Risk of injury to children and workers", regulation: "HASAWA 1974 Section 3" },
          { id: "D", text: "Speed up to get past them quickly", isCorrect: false, feedback: "Rushing with a heavy load on stairs is extremely dangerous for everyone involved.", outcome: "High risk of dropping the load or losing balance", regulation: "Manual Handling Operations Regulations 1992" }
        ]
      }
    ]
  },
  {
    id: 11,
    title: "Wet Conditions Working",
    briefing: "Heavy overnight rain has flooded parts of the construction site in Liverpool where you are installing temporary power distribution equipment for the second fix phase. Standing water is 50mm deep in some areas.",
    location: "Construction site, Liverpool",
    category: "Weather Hazards",
    difficulty: "Intermediate",
    tags: ["weather", "flooding", "temporary-installations"],
    estimatedMinutes: 6,
    steps: [
      {
        id: "11-1",
        situation: "You arrive on site and see the temporary distribution board is standing in 30mm of water. The board is still energised and feeding several circuits across the site.",
        question: "What is the safest course of action?",
        options: [
          { id: "A", text: "Continue working but wear wellington boots", isCorrect: false, feedback: "Wellington boots alone do not provide adequate protection against electrical hazards in standing water.", outcome: "Risk of electrocution if equipment faults while in contact with water", regulation: "Electricity at Work Regulations 1989, Regulation 6" },
          { id: "B", text: "Isolate the supply, then relocate equipment to higher ground when safe", isCorrect: true, feedback: "Correct! Water significantly increases electrical risk. Isolate first, then relocate equipment to prevent further damage.", outcome: "Electrical equipment protected, workers removed from immediate danger", regulation: "BS 7671:2018 Section 704, Electricity at Work Regulations 1989" },
          { id: "C", text: "Cover the distribution board with a tarpaulin", isCorrect: false, feedback: "A tarpaulin does not provide IP protection. Water may already have compromised equipment safety.", outcome: "False protection, equipment may already be compromised", regulation: "BS 7671:2018 Section 704 - Construction Sites" },
          { id: "D", text: "Switch off the main supply and wait for the water to drain", isCorrect: false, feedback: "While isolating is good, equipment may be damaged and unsafe even after water drains. Inspection is required.", outcome: "Equipment damage may go undetected, creating future hazards", regulation: "Electricity at Work Regulations 1989, Regulation 4" }
        ]
      },
      {
        id: "11-2",
        situation: "The water has drained by afternoon. The temporary distribution board was in water for approximately 3 hours before being isolated.",
        question: "What must happen before the equipment is re-energised?",
        options: [
          { id: "A", text: "Dry it off and switch it back on", isCorrect: false, feedback: "Water ingress can cause internal corrosion and tracking. A visual dry exterior does not mean it is safe internally.", outcome: "Risk of short circuit, fire, or electric shock on re-energisation", regulation: "Electricity at Work Regulations 1989, Regulation 4" },
          { id: "B", text: "Full inspection and insulation resistance testing before re-energisation", isCorrect: true, feedback: "Correct! Any equipment exposed to flooding must be thoroughly inspected and tested before being put back into service.", outcome: "Equipment verified safe before use, faults identified", regulation: "BS 7671:2018 Chapter 64, EAWR 1989 Regulation 4" },
          { id: "C", text: "Replace all the RCDs and switch it back on", isCorrect: false, feedback: "RCDs are not the only components affected. The entire board and all connections need inspection and testing.", outcome: "Other damaged components may cause faults", regulation: "BS 7671:2018 Section 704" },
          { id: "D", text: "Wait 24 hours for it to dry completely then re-energise", isCorrect: false, feedback: "Time alone does not make water-damaged equipment safe. Internal contamination requires inspection and testing.", outcome: "Hidden damage remains, risk of failure in service", regulation: "Electricity at Work Regulations 1989, Regulation 4" }
        ]
      }
    ]
  },
  {
    id: 12,
    title: "Asbestos Discovery",
    briefing: "You are chasing cable routes in a 1970s office building in Sheffield for a new data network installation. While cutting a channel in the wall, you hit a layer of board material behind the plasterboard that has a fibrous texture.",
    location: "Office building, Sheffield",
    category: "Hazardous Materials",
    difficulty: "Intermediate",
    tags: ["asbestos", "hazardous-materials", "stop-work"],
    estimatedMinutes: 6,
    realCase: {
      summary: "Electricians were exposed to asbestos insulating board while chasing cables in a 1960s school. The asbestos survey had not been shared with contractors working on site.",
      fineAmount: "£250,000",
      consequence: "Multiple workers exposed. Long-term health monitoring required for all affected staff."
    },
    steps: [
      {
        id: "12-1",
        situation: "You notice fibrous material behind the plasterboard. Some dust has been generated from your cutting. The building was built in 1973.",
        question: "What is your immediate priority?",
        options: [
          { id: "A", text: "Carefully remove a sample to get it tested", isCorrect: false, feedback: "Never disturb suspected asbestos. Sampling can release fibres and requires specialist equipment and training.", outcome: "Risk of asbestos fibre release affecting yourself and others", regulation: "Control of Asbestos Regulations 2012" },
          { id: "B", text: "Continue working but wear a dust mask", isCorrect: false, feedback: "Standard dust masks do not protect against asbestos fibres. Specialist respiratory protection is required.", outcome: "Potential asbestos exposure causing serious long-term health effects", regulation: "Control of Asbestos Regulations 2012, Regulation 10" },
          { id: "C", text: "Stop work immediately, seal the area, and report to your supervisor", isCorrect: true, feedback: "Correct! Suspected asbestos must be treated as asbestos until tested. Only licensed contractors can remove it.", outcome: "Area secured, specialist assessment arranged, workers protected", regulation: "Control of Asbestos Regulations 2012, Regulation 11" },
          { id: "D", text: "Spray water on the material to reduce dust and continue working", isCorrect: false, feedback: "Wetting asbestos can help reduce fibre release but does not make it safe. Professional removal is required.", outcome: "Ongoing exposure risk, potential contamination spread", regulation: "Control of Asbestos Regulations 2012" }
        ]
      },
      {
        id: "12-2",
        situation: "You have stopped work and sealed the area. Your supervisor asks if you have checked the asbestos register for the building.",
        question: "What should have happened before any intrusive work began?",
        options: [
          { id: "A", text: "The building's asbestos register should have been reviewed and a refurbishment survey conducted", isCorrect: true, feedback: "Correct! Before any intrusive work in pre-2000 buildings, the asbestos register must be reviewed and a refurbishment/demolition survey may be needed.", outcome: "Asbestos-containing materials identified before disturbance", regulation: "Control of Asbestos Regulations 2012, Regulation 4, HSG264" },
          { id: "B", text: "Nothing extra was needed as the building looks modern inside", isCorrect: false, feedback: "Internal decoration does not indicate the absence of asbestos. Many refurbished buildings still contain asbestos materials.", outcome: "Asbestos-containing materials overlooked due to assumptions", regulation: "Control of Asbestos Regulations 2012, Regulation 4" },
          { id: "C", text: "Only asbestos training was needed", isCorrect: false, feedback: "Training is important but does not replace the requirement to check the asbestos register before intrusive work.", outcome: "Asbestos-containing materials encountered without prior knowledge", regulation: "Control of Asbestos Regulations 2012, Regulation 10" },
          { id: "D", text: "The building owner should have removed all asbestos already", isCorrect: false, feedback: "There is no legal requirement to remove all asbestos. The duty is to manage it in situ and inform contractors.", outcome: "Misunderstanding of asbestos management requirements", regulation: "Control of Asbestos Regulations 2012, Regulation 4" }
        ]
      }
    ]
  },
  {
    id: 13,
    title: "Battery Room Hazards",
    briefing: "You need to install additional monitoring equipment in a data centre battery room in Reading. The room contains four strings of 240V lead-acid UPS batteries. The room has forced ventilation and hydrogen detection equipment.",
    location: "Data centre, Reading",
    category: "Battery Systems",
    difficulty: "Advanced",
    tags: ["batteries", "hydrogen", "explosion-risk"],
    estimatedMinutes: 8,
    steps: [
      {
        id: "13-1",
        situation: "You enter the battery room. The hydrogen detector at the door shows 0.2% concentration. The ventilation fans are running. You need to drill holes in the wall to mount equipment brackets.",
        question: "What specific hazard is most critical to address before starting work?",
        options: [
          { id: "A", text: "The weight of the batteries for manual handling", isCorrect: false, feedback: "While manual handling is a concern, the most critical hazard in battery rooms is explosive hydrogen gas.", outcome: "Focus on secondary hazard while primary danger remains uncontrolled", regulation: "Manual Handling Operations Regulations 1992" },
          { id: "B", text: "Hydrogen gas accumulation and explosion risk from drilling", isCorrect: true, feedback: "Correct! Lead-acid batteries produce hydrogen gas. Drilling creates sparks which could ignite an explosive atmosphere.", outcome: "Explosive atmosphere hazard identified and controlled", regulation: "DSEAR 2002, BS EN 50272-2" },
          { id: "C", text: "The DC voltage present in the battery strings", isCorrect: false, feedback: "DC voltage is a hazard but hydrogen explosion risk is more immediately life-threatening from the planned drilling.", outcome: "Electrical hazard considered but explosion risk overlooked", regulation: "Electricity at Work Regulations 1989" },
          { id: "D", text: "The acid in the batteries causing chemical burns", isCorrect: false, feedback: "Acid burns are a hazard but contained within batteries. Hydrogen accumulation is the primary room hazard.", outcome: "Chemical hazard considered but atmospheric hazard overlooked", regulation: "COSHH Regulations 2002" }
        ]
      },
      {
        id: "13-2",
        situation: "You have verified hydrogen levels are below the LEL and confirmed ventilation is operating. You plan to use a cordless drill with masonry bit to mount the brackets.",
        question: "What additional precaution should you take for drilling in this environment?",
        options: [
          { id: "A", text: "Use a standard mains-powered drill for more power", isCorrect: false, feedback: "Mains-powered tools create more spark risk. In a battery room, minimising ignition sources is critical.", outcome: "Additional ignition source introduced to potentially explosive atmosphere", regulation: "DSEAR 2002, Equipment selection for hazardous areas" },
          { id: "B", text: "Continuously monitor hydrogen levels and ensure someone is stationed outside with emergency procedures", isCorrect: true, feedback: "Correct! Continuous monitoring during work detects any rise in hydrogen. A safety watch outside ensures rescue capability.", outcome: "Ongoing atmosphere monitoring with emergency backup in place", regulation: "DSEAR 2002, BS EN 50272-2, Confined Spaces Regulations 1997" },
          { id: "C", text: "No additional precautions needed as the cordless drill is safe", isCorrect: false, feedback: "Even cordless drills create sparks from the masonry bit. Continuous monitoring is essential during any spark-generating work.", outcome: "Complacency about ignition sources in explosive atmosphere", regulation: "DSEAR 2002, ATEX workplace directive" },
          { id: "D", text: "Turn off the ventilation to reduce noise", isCorrect: false, feedback: "Ventilation is critical for removing hydrogen. Switching it off could allow dangerous gas accumulation.", outcome: "Rapid hydrogen build-up creating explosive atmosphere", regulation: "BS EN 50272-2, DSEAR 2002" }
        ]
      }
    ]
  },
  {
    id: 14,
    title: "Apprentice Supervision",
    briefing: "You are a qualified electrician supervising a second-year apprentice at a house in Nottingham. You are both installing a new kitchen circuit. You receive a phone call asking you to attend an urgent site meeting at another job 20 minutes away.",
    location: "Domestic property, Nottingham",
    category: "Supervision",
    difficulty: "Intermediate",
    tags: ["supervision", "apprentice", "duty-of-care"],
    estimatedMinutes: 5,
    steps: [
      {
        id: "14-1",
        situation: "The apprentice is mid-task, installing socket outlets on the new kitchen circuit. The circuit has been isolated but first fix is not yet complete.",
        question: "What should you do about the apprentice while you attend the meeting?",
        options: [
          { id: "A", text: "Leave them to continue as they are nearly finished", isCorrect: false, feedback: "Apprentices require appropriate supervision. Leaving them unsupervised on electrical work breaches your duty of care.", outcome: "Apprentice works unsupervised, increased risk of accident or poor work quality", regulation: "Management of Health and Safety at Work Regulations 1999" },
          { id: "B", text: "Ask another qualified person to supervise or bring the apprentice with you", isCorrect: true, feedback: "Correct! Apprentices must have appropriate supervision. Either transfer supervision or pause their electrical work.", outcome: "Supervision maintained, apprentice protected, duty of care fulfilled", regulation: "Apprenticeship Standards, HASAWA 1974 Section 3" },
          { id: "C", text: "Tell them to wait and do nothing until you return", isCorrect: false, feedback: "This wastes productive time. Better solutions exist that maintain both supervision and productivity.", outcome: "Time wasted but at least apprentice not working unsupervised", regulation: "Management of Health and Safety at Work Regulations 1999" },
          { id: "D", text: "Give them detailed instructions and check their work when you return", isCorrect: false, feedback: "Instructions are not supervision. The apprentice needs a competent person available to guide them.", outcome: "Apprentice effectively unsupervised, potential for errors and accidents", regulation: "Apprenticeship Standards, Electricity at Work Regulations 1989" }
        ]
      },
      {
        id: "14-2",
        situation: "You decide to take the apprentice with you. At the other site, the meeting overruns. The apprentice asks if they can go back alone to finish the kitchen sockets.",
        question: "How should you respond?",
        options: [
          { id: "A", text: "Yes, they know what they are doing by now", isCorrect: false, feedback: "A second-year apprentice should not work unsupervised on electrical installations regardless of their competence level.", outcome: "Unsupervised apprentice, potential for unsafe work", regulation: "Apprenticeship Standards, EAWR 1989 Regulation 16" },
          { id: "B", text: "No, they should wait until you can both return together", isCorrect: true, feedback: "Correct! The apprentice must wait. Their supervision is your legal responsibility and cannot be delegated to no one.", outcome: "Professional supervision maintained, apprentice learns correct procedures", regulation: "HASAWA 1974, Management of H&S at Work Regulations 1999" },
          { id: "C", text: "Let them go back but only to do non-electrical tasks", isCorrect: false, feedback: "Even non-electrical tasks on a construction site may require supervision depending on the apprentice's competence.", outcome: "Apprentice potentially at risk even with non-electrical tasks", regulation: "Management of Health and Safety at Work Regulations 1999" },
          { id: "D", text: "Call the homeowner and ask them to keep an eye on the apprentice", isCorrect: false, feedback: "Homeowners are not competent to supervise electrical work. Supervision must be by a qualified electrician.", outcome: "Inadequate supervision by unqualified person", regulation: "EAWR 1989 Regulation 16, Apprenticeship Standards" }
        ]
      }
    ]
  },
  {
    id: 15,
    title: "Consumer Unit Replacement",
    briefing: "You are replacing a consumer unit in an occupied terraced house in Swansea. The existing installation has a mix of old rubber-insulated cables and newer PVC cables. The homeowner has a baby and is concerned about having no power.",
    location: "Domestic property, Swansea",
    category: "Testing & Verification",
    difficulty: "Intermediate",
    tags: ["testing", "consumer-unit", "initial-verification"],
    estimatedMinutes: 7,
    steps: [
      {
        id: "15-1",
        situation: "You have installed the new consumer unit and connected all circuits. The homeowner is asking when the power will be back on.",
        question: "What testing is essential before energising the new consumer unit?",
        options: [
          { id: "A", text: "A quick continuity check of the earth wires", isCorrect: false, feedback: "Continuity alone is insufficient. Full testing sequence is required to verify the installation is safe.", outcome: "Incomplete testing may miss faults that could cause shock or fire", regulation: "BS 7671:2018 Section 6" },
          { id: "B", text: "Visual inspection only — the cables were already working", isCorrect: false, feedback: "Existing cables may have deteriorated or been damaged. Previous functionality does not guarantee current safety.", outcome: "Hidden defects remain undetected, risk of failure in service", regulation: "BS 7671:2018 Section 6, Regulation 643" },
          { id: "C", text: "Complete initial verification including insulation resistance, continuity, and RCD tests", isCorrect: true, feedback: "Correct! Consumer unit replacement requires full initial verification testing as it affects the entire installation.", outcome: "Installation safety verified, defects identified before energisation", regulation: "BS 7671:2018 Section 6, IET Guidance Note 3" },
          { id: "D", text: "Just test the new circuits you have added", isCorrect: false, feedback: "The new consumer unit affects the entire installation. All circuits supplied from it must be verified.", outcome: "Existing circuit faults remain undetected, incomplete certification", regulation: "BS 7671:2018 Chapter 61" }
        ]
      },
      {
        id: "15-2",
        situation: "During insulation resistance testing, one circuit shows a reading of 0.3 megohms. The minimum acceptable value is 1.0 megohm.",
        question: "How should you handle this result?",
        options: [
          { id: "A", text: "Energise the circuit anyway as it is close enough", isCorrect: false, feedback: "0.3 megohms is below the minimum. Energising could cause earth leakage, RCD tripping, or fire risk.", outcome: "Potentially dangerous circuit energised, fire risk from insulation breakdown", regulation: "BS 7671:2018 Table 64.3, Regulation 643.3" },
          { id: "B", text: "Investigate the fault, repair it, and retest before energising", isCorrect: true, feedback: "Correct! A low insulation resistance indicates a fault. It must be found and rectified before the circuit can be safely used.", outcome: "Fault identified and repaired, circuit safe for use", regulation: "BS 7671:2018 Section 6, IET Guidance Note 3" },
          { id: "C", text: "Note it on the certificate and let the homeowner decide", isCorrect: false, feedback: "You cannot issue a satisfactory certificate for a circuit that fails testing. The homeowner cannot make this technical decision.", outcome: "Non-compliant certificate, homeowner left with unsafe circuit", regulation: "BS 7671:2018, Electrical Installation Certificate requirements" },
          { id: "D", text: "Bypass the circuit and connect it directly to the busbar", isCorrect: false, feedback: "Bypassing protection is extremely dangerous and illegal. The fault must be properly investigated.", outcome: "Complete loss of protection on a faulty circuit", regulation: "Electricity at Work Regulations 1989, Regulation 4" }
        ]
      }
    ]
  },
  {
    id: 16,
    title: "Solar PV System Isolation",
    briefing: "You have been called to a domestic property in Brighton to replace a faulty DC isolator on a roof-mounted solar PV system. It is a clear sunny day and the system is a 4kWp array generating at full capacity.",
    location: "Domestic property, Brighton",
    category: "Renewable Energy",
    difficulty: "Advanced",
    tags: ["solar-pv", "dc-systems", "renewable-energy"],
    estimatedMinutes: 8,
    realCase: {
      summary: "An electrician received a severe DC shock while working on a solar PV system in daylight. He assumed isolating the AC inverter made the system safe.",
      fineAmount: "£120,000",
      consequence: "DC burns to both hands. Three months off work."
    },
    steps: [
      {
        id: "16-1",
        situation: "The homeowner shows you the faulty DC isolator which is located between the roof panels and the inverter in the loft space. The AC isolator at the consumer unit and the inverter AC switch are both accessible.",
        question: "What is the critical safety consideration specific to this solar PV system?",
        options: [
          { id: "A", text: "The AC inverter must be switched off at the consumer unit", isCorrect: false, feedback: "AC isolation alone does not make the DC side safe. Panels generate DC voltage whenever exposed to light.", outcome: "DC side remains energised, shock hazard from panels", regulation: "BS 7671:2018 Section 712" },
          { id: "B", text: "The DC side remains live whenever light falls on the panels — it cannot be fully isolated in daylight", isCorrect: true, feedback: "Correct! Solar panels cannot be truly isolated in daylight. DC voltage is always present. Cover panels or work at dawn/dusk.", outcome: "Hazard understood, appropriate controls implemented", regulation: "BS 7671:2018 Section 712, BS EN 62446" },
          { id: "C", text: "The system can be isolated using the DC isolator at the inverter", isCorrect: false, feedback: "This isolates downstream but the panels and cables to the isolator remain energised by sunlight.", outcome: "Work area upstream of isolator remains live", regulation: "BS 7671:2018 Section 712" },
          { id: "D", text: "Standard electrical PPE provides adequate protection", isCorrect: false, feedback: "DC-rated PPE is required. Standard AC equipment may not be suitable for DC voltages and arc characteristics.", outcome: "Inadequate protection for DC hazards", regulation: "BS 7671:2018 Section 712, PPE at Work Regulations" }
        ]
      },
      {
        id: "16-2",
        situation: "You need to replace the faulty DC isolator. The panels are generating approximately 380V DC open circuit voltage in full sun.",
        question: "What is the safest approach to replace the DC isolator?",
        options: [
          { id: "A", text: "Work on it now using insulated tools and DC-rated gloves", isCorrect: false, feedback: "While possible with live working procedures, the safest approach is to eliminate the DC voltage by covering the panels.", outcome: "Unnecessary live working on high-voltage DC system", regulation: "EAWR 1989 Regulation 14 — work dead where possible" },
          { id: "B", text: "Cover the panels with opaque sheeting to reduce output, then isolate and work", isCorrect: true, feedback: "Correct! Covering the panels eliminates the DC generation. Combined with DC isolation, this is the safest approach.", outcome: "DC voltage eliminated at source, safe working conditions created", regulation: "BS 7671:2018 Section 712, BS EN 62446, EAWR 1989 Regulation 13" },
          { id: "C", text: "Disconnect the panels at the roof junction box first", isCorrect: false, feedback: "The panels are generating 380V DC. Disconnecting under load at the junction box risks a DC arc flash.", outcome: "Risk of DC arc flash during disconnection under load", regulation: "BS 7671:2018 Section 712, DC arc flash guidance" },
          { id: "D", text: "Wait until nightfall to work in darkness", isCorrect: false, feedback: "Working on a roof in darkness creates significant fall risks. Covering panels in daylight is the practical solution.", outcome: "Unacceptable working at height risks in darkness", regulation: "Work at Height Regulations 2005" }
        ]
      }
    ]
  },
  {
    id: 17,
    title: "Ring Final Circuit Testing",
    briefing: "You are conducting a periodic inspection on a 15-year-old domestic installation in Oxford. During ring final circuit testing on the kitchen/utility circuit, your continuity readings suggest the ring may have an interconnection or spur issue.",
    location: "Domestic property, Oxford",
    category: "Inspection & Testing",
    difficulty: "Advanced",
    tags: ["testing", "ring-circuits", "fault-finding"],
    estimatedMinutes: 8,
    steps: [
      {
        id: "17-1",
        situation: "Your R1+R2 cross-connected readings do not give the expected results. The reading at some sockets is higher than the calculated maximum for the cable route.",
        question: "What does this indicate and how should you proceed?",
        options: [
          { id: "A", text: "The ring is fine — interconnections improve the circuit", isCorrect: false, feedback: "Interconnections can mask faults and lead to overloaded cables. They indicate non-compliant installation.", outcome: "Fault undetected, potential for cable overload and fire risk", regulation: "BS 7671:2018 Regulation 543.1.1" },
          { id: "B", text: "Report the interconnection as requiring investigation and potential remedial work", isCorrect: true, feedback: "Correct! Interconnections in rings must be investigated. They can cause unbalanced loading and mask faults.", outcome: "Issue recorded, investigation and remediation can proceed", regulation: "BS 7671:2018, IET Guidance Note 3" },
          { id: "C", text: "Convert the circuit to radials if an interconnection exists", isCorrect: false, feedback: "This may be a solution but requires proper design verification. You cannot just convert without assessment.", outcome: "Premature action without proper engineering evaluation", regulation: "BS 7671:2018 Section 433" },
          { id: "D", text: "Ignore it if the insulation resistance test passes", isCorrect: false, feedback: "Insulation resistance does not detect interconnections. Different tests reveal different types of faults.", outcome: "Installation fault remains, potential for future problems", regulation: "BS 7671:2018 Chapter 64" }
        ]
      },
      {
        id: "17-2",
        situation: "Further investigation reveals a previous electrician has created a spur from a spur — a double spur feeding two sockets in a conservatory extension.",
        question: "How should this be recorded and what action is recommended?",
        options: [
          { id: "A", text: "Note it as satisfactory since the sockets are working", isCorrect: false, feedback: "A spur from a spur does not comply with BS 7671. Working does not mean compliant or safe.", outcome: "Non-compliant installation recorded as satisfactory", regulation: "BS 7671:2018 Appendix 15" },
          { id: "B", text: "Record it as a C2 code (potentially dangerous) on the condition report with recommended remedial work", isCorrect: true, feedback: "Correct! A double spur is non-compliant and potentially dangerous due to overload risk. It requires remedial action.", outcome: "Defect properly classified and recorded for the homeowner", regulation: "BS 7671:2018, IET Guidance Note 3, EICR coding guidance" },
          { id: "C", text: "Remove the extra spur yourself during the inspection", isCorrect: false, feedback: "A periodic inspection is an inspection, not a repair visit. Remedial work should be quoted separately.", outcome: "Scope creep, potential warranty issues, may need different materials", regulation: "IET Guidance Note 3, professional practice" },
          { id: "D", text: "Record it as a C3 code (improvement recommended) since it is not immediately dangerous", isCorrect: false, feedback: "A spur from a spur risks cable overload which could cause fire. This is more serious than a simple improvement.", outcome: "Hazard severity underestimated, inadequate urgency for repair", regulation: "EICR coding guidance, BS 7671:2018" }
        ]
      }
    ]
  },
  {
    id: 18,
    title: "Three-Phase Supply Connection",
    briefing: "You are connecting a new three-phase CNC machine in a factory in Coventry. The machine is supplied via a 32A three-phase isolator from the factory distribution board. During commissioning testing, you notice the phase rotation is incorrect.",
    location: "Factory, Coventry",
    category: "Three-Phase Systems",
    difficulty: "Intermediate",
    tags: ["three-phase", "phase-rotation", "motor-connection"],
    estimatedMinutes: 6,
    steps: [
      {
        id: "18-1",
        situation: "You power up the CNC machine and the spindle motor runs backwards. The machine manufacturer's manual specifies L1-L2-L3 phase sequence.",
        question: "Why is correct phase rotation important and how should you address it?",
        options: [
          { id: "A", text: "It is not important for most equipment — proceed with connection", isCorrect: false, feedback: "Incorrect phase rotation can cause motors to run backwards, potentially damaging equipment or causing injury.", outcome: "Equipment damage, potential safety hazard from reversed rotation", regulation: "BS 7671:2018 Section 6" },
          { id: "B", text: "Swap any two phases at the supply isolator to correct the rotation", isCorrect: true, feedback: "Correct! Phase rotation can be corrected by swapping any two phases. Always retest after correction.", outcome: "Phase rotation corrected, equipment operates safely", regulation: "BS 7671:2018, Equipment manufacturer's requirements" },
          { id: "C", text: "The machine manufacturer should modify the machine", isCorrect: false, feedback: "Phase rotation is an installation issue, not a machine modification. It is the installer's responsibility.", outcome: "Unnecessary delay and cost, installation fault remains", regulation: "BS 7671:2018 Section 6, PUWER 1998" },
          { id: "D", text: "Reverse all three phases to maintain balance", isCorrect: false, feedback: "Reversing all three phases does not change rotation. Only swapping two phases reverses the sequence.", outcome: "Problem not solved, phase rotation unchanged", regulation: "Basic electrical theory" }
        ]
      },
      {
        id: "18-2",
        situation: "After correcting the phase rotation, the machine runs correctly. The factory manager asks you to also connect a second identical machine from the same distribution board.",
        question: "What should you verify for the second machine connection?",
        options: [
          { id: "A", text: "Just connect it the same way as the first one", isCorrect: false, feedback: "You must verify the supply capacity and protection for each additional load. The DB may not have capacity for a second machine.", outcome: "Potential overload of distribution board supply", regulation: "BS 7671:2018 Section 433, Maximum demand assessment" },
          { id: "B", text: "Verify the distribution board has adequate capacity, correct protection, and the supply can handle the additional load", isCorrect: true, feedback: "Correct! Each additional load requires assessment of maximum demand, cable sizing, and protective device coordination.", outcome: "Supply adequacy confirmed, safe connection of additional load", regulation: "BS 7671:2018 Chapter 31, Section 433, Appendix 4" },
          { id: "C", text: "Connect it to a different phase to balance the load", isCorrect: false, feedback: "Three-phase machines need all three phases. You cannot connect to a single different phase. Load balance is important but capacity comes first.", outcome: "Misunderstanding of three-phase machine requirements", regulation: "BS 7671:2018 Section 433" },
          { id: "D", text: "Use a bigger cable to handle both machines", isCorrect: false, feedback: "Cable size is only one factor. The distribution board capacity, protection, and supply authority limits all need checking.", outcome: "Incomplete assessment of supply requirements", regulation: "BS 7671:2018 Chapter 31, Section 433" }
        ]
      }
    ]
  },
  {
    id: 19,
    title: "Client Pressure to Energise",
    briefing: "You are completing a full rewire of a restaurant in York. The grand opening is tomorrow morning. At 9pm, the restaurant owner arrives and demands you energise the installation immediately. You have completed the wiring but not finished testing.",
    location: "Restaurant, York",
    category: "Professional Conduct",
    difficulty: "Intermediate",
    tags: ["professional-ethics", "client-management", "legal-compliance"],
    estimatedMinutes: 6,
    steps: [
      {
        id: "19-1",
        situation: "The restaurant owner is visibly angry. They say they have 50 guests booked for tomorrow and will sue you if the power is not on tonight. Testing of 4 circuits is still outstanding.",
        question: "How should you handle this situation?",
        options: [
          { id: "A", text: "Energise the system but explain the risks to the client", isCorrect: false, feedback: "You cannot transfer legal responsibility to the client. Energising untested work is illegal under EAWR.", outcome: "Potential prosecution, insurance invalidation, safety risks", regulation: "Electricity at Work Regulations 1989, Regulation 4" },
          { id: "B", text: "Complete essential safety tests and leave cosmetic items for later", isCorrect: false, feedback: "All required tests must be completed. There is no distinction between essential and cosmetic in certification.", outcome: "Non-compliant certification, potential legal liability", regulation: "BS 7671:2018 Section 6" },
          { id: "C", text: "Politely refuse and explain that testing is a legal requirement for safety", isCorrect: true, feedback: "Correct! Professional integrity requires completing all testing. Explain the legal and safety implications calmly.", outcome: "Legal compliance maintained, client educated, professional standards upheld", regulation: "Electricity at Work Regulations 1989, BS 7671:2018" },
          { id: "D", text: "Get the client to sign a waiver accepting responsibility", isCorrect: false, feedback: "Waivers do not remove your legal obligations under health and safety law. You remain responsible.", outcome: "False protection, legal liability remains with installer", regulation: "HASAWA 1974, Electricity at Work Regulations 1989" }
        ]
      },
      {
        id: "19-2",
        situation: "You explain the legal position. The owner calms down slightly but asks what can be done. You estimate testing will take another 3 hours.",
        question: "What is the most professional course of action?",
        options: [
          { id: "A", text: "Leave and come back in the morning", isCorrect: false, feedback: "While technically acceptable, offering to stay shows professionalism and helps maintain the client relationship.", outcome: "Client relationship damaged, opening potentially delayed further", regulation: "Professional practice" },
          { id: "B", text: "Offer to stay late to complete testing tonight, documenting the situation and your professional advice", isCorrect: true, feedback: "Correct! Offering to complete the work tonight shows professionalism whilst maintaining safety standards. Document everything.", outcome: "Testing completed safely, client relationship maintained, professional standards upheld", regulation: "BS 7671:2018 Section 6, Professional conduct" },
          { id: "C", text: "Call your boss and let them deal with the angry client", isCorrect: false, feedback: "While informing your employer is appropriate, passing the problem entirely to someone else is unprofessional.", outcome: "Problem deferred, client feels dismissed", regulation: "Professional practice" },
          { id: "D", text: "Offer a discount if they wait until morning", isCorrect: false, feedback: "Discounting implies you were at fault. The testing timeline was always part of the project scope.", outcome: "Financial loss, implies fault where none exists", regulation: "Professional practice, contract terms" }
        ]
      }
    ]
  },
  {
    id: 20,
    title: "EV Charger Installation",
    briefing: "You have been contracted to install a 7kW EV charger at a detached house in Cambridge. The existing installation has a 60A main fuse and a 13-way consumer unit that is already fully loaded. The homeowner has a new electric vehicle arriving next week.",
    location: "Domestic property, Cambridge",
    category: "Electrical Safety",
    difficulty: "Intermediate",
    tags: ["ev-charging", "load-management", "domestic"],
    estimatedMinutes: 7,
    steps: [
      {
        id: "20-1",
        situation: "You survey the existing installation. The 60A main fuse is protected by a 100A cut-out at the meter. The existing maximum demand calculation shows 55A total load. Adding a 7kW (32A) EV charger would exceed the 60A main fuse.",
        question: "What is the most important consideration before installing the EV charger?",
        options: [
          { id: "A", text: "Just install it — the main fuse will handle it occasionally", isCorrect: false, feedback: "Exceeding the main fuse rating will cause it to blow, leaving the entire house without power. This is not acceptable.", outcome: "Main fuse failure, total loss of supply to the property", regulation: "BS 7671:2018 Section 722, Chapter 31" },
          { id: "B", text: "Assess whether load management or a supply upgrade is needed to accommodate the additional demand", isCorrect: true, feedback: "Correct! The supply capacity must be adequate. Options include DNO upgrade, load management device, or current-limiting charger.", outcome: "Supply adequacy ensured through proper assessment", regulation: "BS 7671:2018 Section 722, IET Code of Practice for EV Charging" },
          { id: "C", text: "Install a smaller 3.6kW charger instead", isCorrect: false, feedback: "While a smaller charger reduces demand, you still need to verify the total maximum demand does not exceed the supply.", outcome: "Smaller load but still requires proper maximum demand assessment", regulation: "BS 7671:2018 Section 722, Chapter 31" },
          { id: "D", text: "Connect the charger directly to the meter tails to bypass the consumer unit", isCorrect: false, feedback: "Direct connection to meter tails without proper protection is dangerous and non-compliant.", outcome: "Unprotected circuit, non-compliant installation", regulation: "BS 7671:2018, EAWR 1989" }
        ]
      },
      {
        id: "20-2",
        situation: "After discussion with the DNO, a supply upgrade is not possible for 3 months. The homeowner still wants the charger installed now. You propose a load management solution.",
        question: "What is the correct approach for a load-managed EV charger installation?",
        options: [
          { id: "A", text: "Install the charger with a CT clamp on the main supply to dynamically limit charging current", isCorrect: true, feedback: "Correct! A CT clamp monitors the main supply current and dynamically reduces EV charging to prevent overload.", outcome: "EV charger installed safely within existing supply limits", regulation: "BS 7671:2018 Section 722, IET EV Code of Practice Annex A" },
          { id: "B", text: "Install the charger and tell the homeowner not to use the cooker and charger at the same time", isCorrect: false, feedback: "Relying on homeowner behaviour for electrical safety is not acceptable. Automatic load management is required.", outcome: "Risk of overload if homeowner forgets or ignores advice", regulation: "BS 7671:2018 Section 722, maximum demand principles" },
          { id: "C", text: "Install the charger on a timer to only charge overnight when demand is low", isCorrect: false, feedback: "Timer-based charging does not account for actual demand. Other loads may still run at night (heating, water).", outcome: "No dynamic protection against overload during timed charging periods", regulation: "BS 7671:2018 Section 722" },
          { id: "D", text: "Uprate the main fuse to 100A yourself", isCorrect: false, feedback: "The main fuse is DNO property. Only the DNO can change it. Altering DNO equipment is illegal.", outcome: "Illegal interference with DNO equipment, potential prosecution", regulation: "Electricity Act 1989, DNO supply regulations" }
        ]
      }
    ]
  },
  {
    id: 21,
    title: "Smart Home IoT Safety",
    briefing: "A homeowner in Milton Keynes has purchased various smart home devices online and wants you to integrate them into their electrical installation. The devices include smart switches, a smart thermostat, and IP-rated garden lighting controllers.",
    location: "Domestic property, Milton Keynes",
    category: "Electrical Safety",
    difficulty: "Beginner",
    tags: ["smart-home", "iot", "certification"],
    estimatedMinutes: 5,
    steps: [
      {
        id: "21-1",
        situation: "You examine the smart switches the homeowner has purchased. They are from an unknown brand, have no CE/UKCA marking, and the instructions are poorly translated. The packaging shows no BS or EN standards compliance.",
        question: "What is your primary concern with these devices?",
        options: [
          { id: "A", text: "They might not connect to the Wi-Fi properly", isCorrect: false, feedback: "Connectivity is a minor concern compared to electrical safety. Uncertified devices pose shock and fire risks.", outcome: "Focus on functionality ignoring safety fundamentals", regulation: "Electrical Equipment (Safety) Regulations 2016" },
          { id: "B", text: "They lack UK safety certification and could be dangerous to install", isCorrect: true, feedback: "Correct! Electrical equipment without UKCA/CE marking and relevant standards compliance may not meet safety requirements and could cause fire or shock.", outcome: "Unsafe equipment identified before installation", regulation: "Electrical Equipment (Safety) Regulations 2016, BS 7671:2018 Section 511" },
          { id: "C", text: "They might void the home insurance", isCorrect: false, feedback: "While insurance may be affected, the primary concern is the physical safety risk from uncertified equipment.", outcome: "Secondary concern prioritised over immediate safety risk", regulation: "Electrical Equipment (Safety) Regulations 2016" },
          { id: "D", text: "They are probably fine since they were available to buy online", isCorrect: false, feedback: "Online marketplaces sell many products that do not comply with UK safety standards. Availability does not equal compliance.", outcome: "False assumption about product safety", regulation: "Electrical Equipment (Safety) Regulations 2016, Product Safety legislation" }
        ]
      },
      {
        id: "21-2",
        situation: "You advise the homeowner to purchase UKCA-marked smart switches from a reputable supplier. They do so, and you proceed to install them. The smart switches replace standard light switches in the neutral-less switch plate.",
        question: "What technical consideration is critical when installing smart switches?",
        options: [
          { id: "A", text: "Most smart switches require a neutral wire at the switch plate, which many UK lighting circuits do not have", isCorrect: true, feedback: "Correct! Many UK lighting circuits use loop-in wiring with no neutral at the switch. Smart switches often require neutral for their internal electronics.", outcome: "Wiring compatibility assessed before installation", regulation: "BS 7671:2018, IET Guidance Note 1" },
          { id: "B", text: "Smart switches just replace the existing switch directly", isCorrect: false, feedback: "Smart switches have different wiring requirements. A direct swap is not always possible without circuit modifications.", outcome: "Incorrect installation causing device malfunction or safety issues", regulation: "BS 7671:2018, manufacturer's installation requirements" },
          { id: "C", text: "The app setup is the most important part", isCorrect: false, feedback: "App configuration is secondary to safe electrical installation. The wiring must be correct first.", outcome: "Focus on software over electrical safety", regulation: "BS 7671:2018, EAWR 1989" },
          { id: "D", text: "You need to upgrade the consumer unit first", isCorrect: false, feedback: "A consumer unit upgrade is not necessarily required for smart switch installation unless the existing unit is inadequate.", outcome: "Unnecessary work and expense", regulation: "BS 7671:2018, proportionate approach" }
        ]
      }
    ]
  },
  {
    id: 22,
    title: "Thermal Imaging Inspection",
    briefing: "You are conducting a thermal imaging survey of the main switchgear in a factory in Sunderland as part of a predictive maintenance programme. The switchgear is 15 years old and feeds critical production lines.",
    location: "Factory, Sunderland",
    category: "Inspection & Testing",
    difficulty: "Advanced",
    tags: ["thermal-imaging", "predictive-maintenance", "switchgear"],
    estimatedMinutes: 7,
    steps: [
      {
        id: "22-1",
        situation: "Your thermal camera shows a hotspot of 85\u00B0C on one of the 200A busbar connections. Ambient temperature is 20\u00B0C. The connection is on a phase busbar feeding a major production line.",
        question: "What does this thermal anomaly indicate and what should you recommend?",
        options: [
          { id: "A", text: "It is normal for busbars to run hot under load", isCorrect: false, feedback: "A 65\u00B0C rise above ambient on a single connection indicates a loose or degraded connection. Other connections should be much cooler.", outcome: "Deteriorating connection ignored, risk of failure or fire", regulation: "BS 7671:2018, BS EN 62305, manufacturer's thermal limits" },
          { id: "B", text: "The connection is likely loose or degraded and needs priority investigation and repair", isCorrect: true, feedback: "Correct! A significant temperature differential between similar connections indicates high resistance, usually from a loose bolt or corroded joint.", outcome: "Potential failure identified before catastrophic breakdown", regulation: "BS 7671:2018 Regulation 526, EAWR 1989 Regulation 4" },
          { id: "C", text: "Replace the entire switchboard immediately", isCorrect: false, feedback: "Full replacement may be unnecessary. The issue is likely a single connection that can be retorqued or remade.", outcome: "Disproportionate response to a localised issue", regulation: "Engineering best practice, proportionate remediation" },
          { id: "D", text: "Reduce the load on that circuit to cool it down", isCorrect: false, feedback: "Load reduction treats the symptom, not the cause. The loose connection will continue to deteriorate.", outcome: "Root cause not addressed, progressive deterioration continues", regulation: "EAWR 1989 Regulation 4" }
        ]
      },
      {
        id: "22-2",
        situation: "The factory manager agrees to schedule a shutdown for the repair. They ask how soon it needs to be done.",
        question: "What urgency classification should this thermal anomaly receive?",
        options: [
          { id: "A", text: "It can wait until the next scheduled maintenance in 6 months", isCorrect: false, feedback: "At 85\u00B0C, this connection is at risk of further deterioration and potential failure. Six months is too long.", outcome: "Risk of unplanned failure, potential fire, production loss", regulation: "EAWR 1989, duty to maintain systems" },
          { id: "B", text: "Priority repair within 1-2 weeks, with increased monitoring until then", isCorrect: true, feedback: "Correct! An 85\u00B0C hotspot requires prompt action. Monitor for any increase and schedule repair at the earliest shutdown opportunity.", outcome: "Timely repair planned with interim monitoring to manage risk", regulation: "EAWR 1989 Regulation 4, predictive maintenance best practice" },
          { id: "C", text: "Emergency shutdown right now", isCorrect: false, feedback: "While serious, 85\u00B0C does not require an emergency shutdown unless temperatures are rising rapidly. Planned action is appropriate.", outcome: "Unnecessary production disruption if situation is stable", regulation: "Engineering judgement, proportionate response" },
          { id: "D", text: "Just add it to the next inspection report", isCorrect: false, feedback: "Thermal anomalies at this level require active management, not passive reporting. Delay increases failure risk.", outcome: "Inadequate response to a significant finding", regulation: "EAWR 1989, duty of care" }
        ]
      }
    ]
  },
  {
    id: 23,
    title: "Working Near Gas Services",
    briefing: "You are installing a new electrical supply to a boiler room in a block of flats in Leicester. The room contains gas meter installations and gas pipework. You need to chase a cable route along a wall shared with the gas riser.",
    location: "Block of flats, Leicester",
    category: "Electrical Safety",
    difficulty: "Advanced",
    tags: ["gas-proximity", "bonding", "regulations"],
    estimatedMinutes: 7,
    steps: [
      {
        id: "23-1",
        situation: "You need to route electrical cables through the boiler room. Gas pipes run along two walls and the gas meter is in the corner. You need to maintain proper separation distances.",
        question: "What is the minimum separation requirement between electrical cables and gas pipes?",
        options: [
          { id: "A", text: "No separation is required if the cables are in trunking", isCorrect: false, feedback: "Separation is required regardless of cable enclosure. Gas leaks near electrical equipment create explosion risk.", outcome: "Insufficient separation creating explosion risk near gas installation", regulation: "BS 7671:2018, IGEM/UP/2 proximity of services" },
          { id: "B", text: "25mm minimum separation, with cables not running directly above gas meters or regulators", isCorrect: true, feedback: "Correct! BS 7671 and gas safety guidance require minimum separation. Never route cables directly above gas equipment where leaks would rise.", outcome: "Proper separation maintained, reduced risk of gas-electrical interaction", regulation: "BS 7671:2018 Section 528, IGEM/UP/2, Gas Safe guidance" },
          { id: "C", text: "150mm separation at all times", isCorrect: false, feedback: "While more separation is generally better, the specific requirement is 25mm minimum with additional considerations for gas fittings.", outcome: "Overly conservative approach that may not be necessary", regulation: "BS 7671:2018 Section 528" },
          { id: "D", text: "Just keep the cables on the opposite wall", isCorrect: false, feedback: "While practical, you need to understand the actual requirements rather than just avoiding proximity entirely.", outcome: "May not be feasible in all installations", regulation: "BS 7671:2018 Section 528" }
        ]
      },
      {
        id: "23-2",
        situation: "You notice that the main gas pipe entering the building does not have an earth bonding connection. The existing installation has no main protective bonding to the gas service.",
        question: "What action should you take regarding the missing gas bonding?",
        options: [
          { id: "A", text: "It is not your responsibility — inform the homeowner", isCorrect: false, feedback: "As a qualified electrician, you have a duty to report and ideally rectify safety deficiencies you discover.", outcome: "Known safety deficiency left unaddressed", regulation: "BS 7671:2018 Section 544, EAWR 1989" },
          { id: "B", text: "Install main protective bonding to the gas service using 10mm\u00B2 conductor to within 600mm of the meter", isCorrect: true, feedback: "Correct! Main protective bonding to gas is a fundamental safety requirement. The bond must connect within 600mm of the meter on the consumer side.", outcome: "Essential safety bonding installed, touch voltage risk eliminated", regulation: "BS 7671:2018 Section 544.1, Regulation 411.3.1.2" },
          { id: "C", text: "Bond directly to the gas meter itself", isCorrect: false, feedback: "The bond must be on the consumer side of the meter, not on the meter itself. Bonding the meter could interfere with DNO equipment.", outcome: "Incorrect bonding position, potential interference with gas metering", regulation: "BS 7671:2018 Section 544.1" },
          { id: "D", text: "Use 6mm\u00B2 cable as it is sufficient for bonding", isCorrect: false, feedback: "Main protective bonding requires minimum 10mm\u00B2 for most domestic installations. 6mm\u00B2 is below the minimum requirement.", outcome: "Undersized bonding conductor, inadequate fault protection", regulation: "BS 7671:2018 Table 54.8" }
        ]
      }
    ]
  },
  {
    id: 24,
    title: "Permit to Work System",
    briefing: "You arrive at a pharmaceutical factory in Slough to carry out planned maintenance on a 400V motor control centre. The factory operates under a strict permit to work system for all electrical work.",
    location: "Pharmaceutical factory, Slough",
    category: "Electrical Safety",
    difficulty: "Advanced",
    tags: ["permit-to-work", "industrial", "isolation"],
    estimatedMinutes: 7,
    steps: [
      {
        id: "24-1",
        situation: "The factory safety officer issues you a permit to work. The permit specifies the isolation points, the work to be done, and the time limits. You notice the permit lists a different motor control centre number than the one you were told to work on.",
        question: "What should you do about the discrepancy?",
        options: [
          { id: "A", text: "Proceed with the work on the motor control centre you were told about", isCorrect: false, feedback: "Working outside the scope of a permit is extremely dangerous. The isolations may not cover your actual work location.", outcome: "Working on unisolated equipment, risk of electrocution", regulation: "EAWR 1989, permit to work best practice" },
          { id: "B", text: "Stop and resolve the discrepancy with the safety officer before starting any work", isCorrect: true, feedback: "Correct! Any discrepancy in a permit must be resolved before work begins. The permit is your safety lifeline.", outcome: "Correct equipment identified, proper isolations confirmed", regulation: "EAWR 1989, HSG85 Electricity at Work, permit to work procedures" },
          { id: "C", text: "Cross out the wrong number and write the correct one yourself", isCorrect: false, feedback: "Permits must never be altered by the permit holder. Only the authorised person can amend or reissue permits.", outcome: "Invalid permit, unsafe working conditions", regulation: "HSG85, permit to work procedures" },
          { id: "D", text: "Work on both motor control centres to be safe", isCorrect: false, feedback: "Working on equipment outside the permit scope is dangerous and unauthorised. Only the specified work is permitted.", outcome: "Unauthorised work on potentially live equipment", regulation: "EAWR 1989, permit to work procedures" }
        ]
      },
      {
        id: "24-2",
        situation: "The permit is corrected and reissued. You complete the maintenance work. The shift changes and a new safety officer arrives who does not know about your permit.",
        question: "What must happen before the equipment is re-energised?",
        options: [
          { id: "A", text: "The new safety officer can just switch it back on", isCorrect: false, feedback: "Only the person who issued the permit can cancel it and authorise re-energisation, or formal handover must occur.", outcome: "Equipment energised while workers may still be in the area", regulation: "HSG85, permit to work handover procedures" },
          { id: "B", text: "You must formally close the permit, confirming all tools and personnel are clear before re-energisation is authorised", isCorrect: true, feedback: "Correct! The permit must be formally closed by the permit holder confirming work is complete and the area is safe. Only then can re-energisation be authorised.", outcome: "Safe re-energisation after formal permit closure", regulation: "HSG85, EAWR 1989, permit to work cancellation procedures" },
          { id: "C", text: "Leave it to the factory staff to sort out", isCorrect: false, feedback: "You are the permit holder and have responsibility to formally close the permit before leaving site.", outcome: "Open permit left unresolved, risk of confusion about equipment status", regulation: "HSG85, permit to work procedures" },
          { id: "D", text: "Phone the original safety officer to give verbal permission", isCorrect: false, feedback: "Verbal authorisation is insufficient for permit closure. The formal written process must be followed.", outcome: "Inadequate permit management, audit trail gaps", regulation: "HSG85, permit to work best practice" }
        ]
      }
    ]
  },
  {
    id: 25,
    title: "Lone Working Safety",
    briefing: "You have been asked to carry out a periodic inspection at a remote farm building in rural Devon. There is no mobile phone signal at the farm, the nearest neighbour is 2 miles away, and you will be working alone.",
    location: "Farm building, Devon",
    category: "Electrical Safety",
    difficulty: "Intermediate",
    tags: ["lone-working", "remote-locations", "risk-assessment"],
    estimatedMinutes: 6,
    steps: [
      {
        id: "25-1",
        situation: "You arrive at the farm. The building is isolated with no other workers present. The farmer has left the keys and will not be back until evening. You have no mobile signal.",
        question: "What safety measures should be in place before you start work?",
        options: [
          { id: "A", text: "Just get on with the work — you are used to working alone", isCorrect: false, feedback: "Lone working, especially in remote locations without communication, requires specific safety measures and risk assessment.", outcome: "No safety net if accident occurs, delayed rescue", regulation: "Management of Health and Safety at Work Regulations 1999, HASAWA 1974" },
          { id: "B", text: "Ensure your company knows your location, expected finish time, and have a check-in schedule using the farmhouse landline", isCorrect: true, feedback: "Correct! Lone worker procedures must include communication plan, check-in times, and escalation if contact is lost.", outcome: "Lone worker monitoring in place, timely response if needed", regulation: "Management of H&S at Work Regulations 1999, lone working guidance" },
          { id: "C", text: "Leave your car running outside so someone might notice it", isCorrect: false, feedback: "A running car is not a safety measure. Proper lone working procedures are required.", outcome: "No effective safety monitoring in place", regulation: "Management of Health and Safety at Work Regulations 1999" },
          { id: "D", text: "Only do the work that does not require isolation", isCorrect: false, feedback: "Limiting the work scope does not address the fundamental lone working risk. Communication and monitoring are needed.", outcome: "Incomplete inspection, lone working risk still present", regulation: "Management of Health and Safety at Work Regulations 1999" }
        ]
      },
      {
        id: "25-2",
        situation: "You have established a check-in schedule. During the inspection, you discover the installation is in poor condition with several potentially dangerous defects including exposed live parts.",
        question: "What should you do about the dangerous defects?",
        options: [
          { id: "A", text: "Carry on with the full inspection and note everything", isCorrect: false, feedback: "If you discover immediately dangerous conditions, you have a duty to take action, not just note them.", outcome: "Dangerous conditions left energised during your inspection", regulation: "EAWR 1989, IET Guidance Note 3" },
          { id: "B", text: "Make the dangerous defects safe where possible, classify them as C1 codes, and inform the farmer immediately", isCorrect: true, feedback: "Correct! C1 (danger present) defects require immediate action. Make safe, document, and inform the duty holder urgently.", outcome: "Immediate dangers addressed, duty holder informed", regulation: "IET Guidance Note 3, EICR coding, EAWR 1989" },
          { id: "C", text: "Isolate the entire installation and leave", isCorrect: false, feedback: "While isolation may be necessary for the worst defects, leaving without informing anyone or documenting is unprofessional.", outcome: "Farm left without power and no explanation to owner", regulation: "Professional conduct, duty of care" },
          { id: "D", text: "Complete a full repair of all defects before leaving", isCorrect: false, feedback: "A periodic inspection is not a repair visit. Remedial work should be quoted and agreed separately.", outcome: "Scope creep, potential issues with authorisation and payment", regulation: "IET Guidance Note 3, professional practice" }
        ]
      }
    ]
  },
  {
    id: 26,
    title: "Fire Alarm Systems",
    briefing: "You are installing a new conventional fire alarm system in a small hotel in Bath. The system includes call points, smoke detectors, heat detectors, sounders, and a control panel. The hotel remains open during the installation.",
    location: "Hotel, Bath",
    category: "Emergency Response",
    difficulty: "Intermediate",
    tags: ["fire-alarm", "life-safety", "bs5839"],
    estimatedMinutes: 7,
    steps: [
      {
        id: "26-1",
        situation: "You are installing the fire alarm system while guests are staying in the hotel. The hotel manager asks you to disconnect the old fire alarm system while you install the new one.",
        question: "What must be in place if the fire alarm system is disabled during installation?",
        options: [
          { id: "A", text: "Nothing special — just work quickly", isCorrect: false, feedback: "A hotel with guests must have fire detection at all times. Disabling it without alternative measures is a serious fire safety breach.", outcome: "Guests at risk in occupied building without fire detection", regulation: "Regulatory Reform (Fire Safety) Order 2005, BS 5839-1" },
          { id: "B", text: "A fire watch with trained personnel patrolling all areas must be implemented before disconnection", isCorrect: true, feedback: "Correct! When a fire alarm system is disabled in an occupied building, a fire watch must provide continuous coverage of all areas.", outcome: "Fire detection maintained through human monitoring during system transition", regulation: "BS 5839-1 Section 4, Regulatory Reform (Fire Safety) Order 2005" },
          { id: "C", text: "Just give portable smoke alarms to each room", isCorrect: false, feedback: "Portable alarms do not provide the same level of coverage or central alerting as a fire alarm system.", outcome: "Inadequate fire detection, no central alarm capability", regulation: "BS 5839-1, fire alarm system requirements" },
          { id: "D", text: "Only disconnect it at night when fewer guests are around", isCorrect: false, feedback: "Night-time is actually higher risk as guests are sleeping and less aware of fire. The system is most critical at night.", outcome: "Maximum risk period without fire detection", regulation: "BS 5839-1, fire safety principles" }
        ]
      },
      {
        id: "26-2",
        situation: "The new fire alarm system is installed and you are commissioning it. During testing, you set off the alarm accidentally. Guests begin evacuating the building.",
        question: "How should you handle this situation?",
        options: [
          { id: "A", text: "Quickly silence the alarm and tell guests to go back to their rooms", isCorrect: false, feedback: "You must coordinate with hotel staff. Guests should not be told to return until the all-clear is given through proper channels.", outcome: "Confusion about whether the alarm was genuine, potential complacency in future", regulation: "Regulatory Reform (Fire Safety) Order 2005" },
          { id: "B", text: "Notify the hotel staff immediately, let the evacuation complete, give the all-clear through the responsible person, and then resume testing with proper notification", isCorrect: true, feedback: "Correct! Even accidental activations must follow proper procedures. The responsible person gives the all-clear. Future testing must be coordinated.", outcome: "Professional handling of the situation, procedures followed correctly", regulation: "BS 5839-1 Section 5, fire alarm testing coordination" },
          { id: "C", text: "Reset the panel and continue testing without telling anyone", isCorrect: false, feedback: "Failure to acknowledge and manage alarm activations undermines trust in the fire alarm system.", outcome: "Guests confused, hotel staff unaware of testing, future alarms may be ignored", regulation: "BS 5839-1, fire alarm management" },
          { id: "D", text: "Stop all testing until the hotel is empty", isCorrect: false, feedback: "Hotels are rarely empty. Testing can proceed but must be coordinated with management and guests notified in advance.", outcome: "Unnecessary delay, project timeline affected", regulation: "BS 5839-1, commissioning guidance" }
        ]
      }
    ]
  },
  {
    id: 27,
    title: "Emergency Lighting Testing",
    briefing: "You are carrying out the annual full-duration test of the emergency lighting system in an office building in Leeds. The test requires the emergency lights to operate on battery for their full rated duration of 3 hours.",
    location: "Office building, Leeds",
    category: "Inspection & Testing",
    difficulty: "Beginner",
    tags: ["emergency-lighting", "testing", "bs5266"],
    estimatedMinutes: 5,
    steps: [
      {
        id: "27-1",
        situation: "The building manager asks you to carry out the 3-hour duration test during normal working hours while staff are present. The emergency lights are the only escape route illumination for internal corridors.",
        question: "What is the key consideration for scheduling this test?",
        options: [
          { id: "A", text: "Go ahead during working hours — the emergency lights will be on during the test", isCorrect: false, feedback: "After 3 hours on battery, the lights may fail at the end of the test. If normal lighting fails at that point, there is no emergency backup.", outcome: "Emergency lighting depleted, no backup if mains fails after test", regulation: "BS 5266-1, emergency lighting test scheduling" },
          { id: "B", text: "Schedule the test when the building has minimum occupancy, ensuring a full recharge period before the next occupied period", isCorrect: true, feedback: "Correct! Duration tests should be done when the building has minimum occupancy. Batteries need 24 hours to recharge after a full-duration test.", outcome: "Test completed safely with adequate recharge time before building is fully occupied", regulation: "BS 5266-1 Section 12, IET Code of Practice for Emergency Lighting" },
          { id: "C", text: "Test each light individually over several days instead", isCorrect: false, feedback: "The full-duration test must be a simultaneous test of the entire system to verify battery capacity under full load.", outcome: "Test results invalid, system capacity not properly verified", regulation: "BS 5266-1, Section 12.4" },
          { id: "D", text: "Only test for 1 hour to reduce the impact", isCorrect: false, feedback: "A partial test does not verify the full rated duration. The annual test must run for the full 3 hours.", outcome: "Non-compliant testing, battery capacity unverified", regulation: "BS 5266-1, Section 12.4" }
        ]
      },
      {
        id: "27-2",
        situation: "During the 3-hour test, you notice that 4 out of 30 emergency luminaires fail before the 3-hour mark — they go dark at around 2 hours 15 minutes.",
        question: "What action should you take for the failed luminaires?",
        options: [
          { id: "A", text: "They lasted over 2 hours so that is close enough", isCorrect: false, feedback: "If rated for 3 hours, they must achieve 3 hours. Failure before that means the batteries need replacing.", outcome: "Emergency lighting may fail during a real emergency", regulation: "BS 5266-1, rated duration requirements" },
          { id: "B", text: "Record the failures, replace the batteries, and retest those units to confirm 3-hour duration", isCorrect: true, feedback: "Correct! Failed units must be recorded, batteries replaced, and retested to verify they achieve the full rated duration.", outcome: "All emergency lighting meeting required duration, properly documented", regulation: "BS 5266-1 Section 12, emergency lighting maintenance" },
          { id: "C", text: "Replace the entire luminaires with new ones", isCorrect: false, feedback: "The luminaires may be fine — it is likely just the batteries that have degraded. Replace batteries first.", outcome: "Unnecessary expense, batteries are the most common failure point", regulation: "BS 5266-1, maintenance and battery replacement" },
          { id: "D", text: "Note them on the report and check again next year", isCorrect: false, feedback: "Failed emergency lights must be rectified promptly, not left for 12 months. They are life safety equipment.", outcome: "Building operates for a year with inadequate emergency lighting", regulation: "BS 5266-1, Regulatory Reform (Fire Safety) Order 2005" }
        ]
      }
    ]
  },
  {
    id: 28,
    title: "PAT Testing",
    briefing: "You have been contracted to carry out portable appliance testing (PAT) at a primary school in Norwich during the summer holidays. The school has approximately 200 items to test including computers, kettles, phone chargers, and cleaning equipment.",
    location: "Primary school, Norwich",
    category: "Inspection & Testing",
    difficulty: "Beginner",
    tags: ["pat-testing", "portable-appliances", "schools"],
    estimatedMinutes: 5,
    steps: [
      {
        id: "28-1",
        situation: "You begin testing in the staff room. A kettle fails the earth continuity test with a reading greater than 1 ohm. The kettle is only 6 months old and is used daily by 20 staff members.",
        question: "What should you do with the failed kettle?",
        options: [
          { id: "A", text: "Pass it anyway since it is nearly new and a kettle is low risk", isCorrect: false, feedback: "Age is irrelevant to test results. A failed earth continuity test means the safety earth is compromised.", outcome: "Unsafe appliance left in service, risk of electric shock", regulation: "EAWR 1989, IET Code of Practice for In-Service Inspection and Testing" },
          { id: "B", text: "Fail it, apply a fail label, remove from service, and report to the school", isCorrect: true, feedback: "Correct! Any appliance that fails testing must be removed from service immediately and clearly labelled as failed.", outcome: "Unsafe appliance removed, school informed for replacement", regulation: "EAWR 1989, Regulation 4, IET Code of Practice" },
          { id: "C", text: "Retest it later in case the first test was wrong", isCorrect: false, feedback: "If the initial test gives a clear fail, retesting without investigation is not appropriate. Check the plug and connections first.", outcome: "Unsafe appliance potentially passed on retest anomaly", regulation: "IET Code of Practice for In-Service Inspection and Testing" },
          { id: "D", text: "Open the plug to check the earth connection", isCorrect: false, feedback: "While checking the plug is part of the visual inspection, it should have been done before the electrical test, not after a fail result justifies leaving it in service.", outcome: "Correct investigation but must still fail if earth continuity is compromised", regulation: "IET Code of Practice, visual inspection procedures" }
        ]
      },
      {
        id: "28-2",
        situation: "A teacher arrives and asks you to test their personal phone charger that they keep at school. They also have a personal fan heater under their desk.",
        question: "What is the correct approach to testing personal electrical items in the workplace?",
        options: [
          { id: "A", text: "Refuse to test personal items — they are not the school's responsibility", isCorrect: false, feedback: "Personal items used on the employer's premises should be included in the testing regime for safety.", outcome: "Untested personal equipment could pose a hazard to all building users", regulation: "EAWR 1989, employer duty of care" },
          { id: "B", text: "Test them as part of the school's equipment, and flag the fan heater as a potential fire risk needing authorisation", isCorrect: true, feedback: "Correct! Personal items used at work should be tested. Fan heaters in schools need specific risk assessment due to fire risk near papers and furnishings.", outcome: "Personal items tested, fire risk from heater identified and managed", regulation: "EAWR 1989, Regulatory Reform (Fire Safety) Order 2005" },
          { id: "C", text: "Test the charger but not the fan heater as heaters are not your responsibility", isCorrect: false, feedback: "All electrical equipment in the workplace should be assessed. The fan heater is actually the higher risk item.", outcome: "Higher risk item left untested", regulation: "EAWR 1989, duty to maintain electrical equipment" },
          { id: "D", text: "Confiscate the fan heater immediately", isCorrect: false, feedback: "You have no authority to confiscate property. Report the risk to the school management for their decision.", outcome: "Overstepping authority, personal property taken without consent", regulation: "Professional conduct, employer responsibility" }
        ]
      }
    ]
  },
  {
    id: 29,
    title: "Working in Occupied Premises",
    briefing: "You are carrying out a partial rewire of a ground-floor flat in a block in Belfast. The elderly tenant is remaining in the property during the work. They use a home oxygen concentrator for a medical condition.",
    location: "Residential flat, Belfast",
    category: "Electrical Safety",
    difficulty: "Intermediate",
    tags: ["occupied-premises", "vulnerable-persons", "medical-equipment"],
    estimatedMinutes: 6,
    steps: [
      {
        id: "29-1",
        situation: "You need to isolate circuits to carry out the rewire. The tenant's oxygen concentrator is plugged into a socket on one of the circuits you need to work on.",
        question: "What is the critical consideration before isolating this circuit?",
        options: [
          { id: "A", text: "Isolate the circuit — the tenant can manage without oxygen for a few hours", isCorrect: false, feedback: "Medical equipment must never be disconnected without proper planning. Loss of oxygen supply could be life-threatening.", outcome: "Potential medical emergency for vulnerable tenant", regulation: "HASAWA 1974 Section 3, duty of care to non-employees" },
          { id: "B", text: "Ensure the oxygen concentrator is powered from an alternative supply before isolating, and confirm arrangements with the tenant and their healthcare provider", isCorrect: true, feedback: "Correct! Medical equipment needs must be assessed and alternative power arranged before any work that affects the supply.", outcome: "Medical equipment supply maintained throughout, tenant safe", regulation: "HASAWA 1974, BS 7671:2018, duty of care" },
          { id: "C", text: "Ask the tenant to go out for the day", isCorrect: false, feedback: "Asking an elderly person dependent on medical equipment to leave their home is unreasonable and potentially harmful.", outcome: "Tenant displaced, potentially unable to transport medical equipment", regulation: "Duty of care, reasonable adjustments" },
          { id: "D", text: "Use an extension lead from another circuit for the concentrator", isCorrect: false, feedback: "While this could provide temporary power, medical equipment supply requires proper risk assessment and planning, not improvised solutions.", outcome: "Improvised solution may be unreliable for life-critical equipment", regulation: "BS 7671:2018, medical equipment supply requirements" }
        ]
      },
      {
        id: "29-2",
        situation: "You have arranged alternative power for the concentrator. During the rewire, you generate significant dust from chasing walls. The tenant is in the next room.",
        question: "What additional precaution is needed given the tenant's respiratory condition?",
        options: [
          { id: "A", text: "Open a window to ventilate the area", isCorrect: false, feedback: "Opening a window alone is insufficient. Dust must be controlled at source to protect a respiratory patient.", outcome: "Dust still reaches the tenant, aggravating respiratory condition", regulation: "COSHH Regulations 2002, duty of care" },
          { id: "B", text: "Use dust extraction equipment, seal doorways with dust sheets, and monitor the tenant's comfort throughout", isCorrect: true, feedback: "Correct! Dust control at source plus containment protects the vulnerable tenant. Regular check-ins show duty of care.", outcome: "Dust contained, tenant's respiratory health protected", regulation: "COSHH Regulations 2002, HASAWA 1974, duty of care to vulnerable persons" },
          { id: "C", text: "Work faster to minimise the dust exposure time", isCorrect: false, feedback: "Working faster may generate more dust. Proper extraction and containment are needed regardless of speed.", outcome: "Potentially more dust generated from rushed work", regulation: "COSHH Regulations 2002" },
          { id: "D", text: "Give the tenant a dust mask", isCorrect: false, feedback: "A dust mask on an elderly person with a respiratory condition may impair their breathing. Source control is the correct approach.", outcome: "Mask may cause breathing difficulties for respiratory patient", regulation: "COSHH Regulations 2002, RPE suitability" }
        ]
      }
    ]
  },
  {
    id: 30,
    title: "Overhead Power Line Safety",
    briefing: "You are installing external lighting at a rural property in Herefordshire. The property is supplied by an overhead 11kV power line that crosses the garden. You need to install lights on tall poles near the line route.",
    location: "Rural property, Herefordshire",
    category: "Electrical Safety",
    difficulty: "Advanced",
    tags: ["overhead-lines", "high-voltage", "exclusion-zones"],
    estimatedMinutes: 8,
    realCase: {
      summary: "A builder was electrocuted when the jib of a mini crane contacted an 11kV overhead line while lifting materials. The crane was not properly positioned relative to the line.",
      fineAmount: "£400,000",
      consequence: "One fatality. Company director received a custodial sentence."
    },
    steps: [
      {
        id: "30-1",
        situation: "You are surveying the garden for light pole positions. The overhead 11kV line crosses the garden at approximately 6 metres height. You plan to install 4-metre lighting poles.",
        question: "What is the minimum safe distance you must maintain from the overhead power line?",
        options: [
          { id: "A", text: "Just stay a metre away from the lines", isCorrect: false, feedback: "One metre is dangerously close to 11kV. Electricity can arc across significant distances at this voltage.", outcome: "Risk of flashover and electrocution at close proximity to 11kV", regulation: "HSE GS6 Avoiding Danger from Overhead Lines" },
          { id: "B", text: "Maintain a minimum exclusion zone and consult the DNO before any work near overhead lines", isCorrect: true, feedback: "Correct! For 11kV lines, a minimum clearance of 3 metres must be maintained. The DNO should be consulted for any work near their lines.", outcome: "Safe working distance maintained, DNO consulted for guidance", regulation: "HSE GS6, Electricity at Work Regulations 1989, DNO requirements" },
          { id: "C", text: "The lines are high enough not to worry about for 4-metre poles", isCorrect: false, feedback: "Lines sag in hot weather and wind. Equipment, ladders, and tools can come within range. Assessment is always needed.", outcome: "False sense of security, dynamic conditions not considered", regulation: "HSE GS6, overhead line clearance requirements" },
          { id: "D", text: "Wear rubber gloves and you will be safe", isCorrect: false, feedback: "Standard rubber gloves provide no protection against 11kV. The voltage would easily flash over standard insulation.", outcome: "No protection at 11kV, risk of fatal electrocution", regulation: "HSE GS6, PPE limitations at high voltage" }
        ]
      },
      {
        id: "30-2",
        situation: "The DNO confirms the line route and advises on exclusion zones. You decide to position the lighting poles outside the exclusion zone. However, you need to dig holes for the pole foundations.",
        question: "What additional hazard must you consider when excavating near overhead line routes?",
        options: [
          { id: "A", text: "Nothing extra — overhead lines are above ground", isCorrect: false, feedback: "Overhead lines have earth stays and the poles may have underground cable connections nearby.", outcome: "Risk of striking underground earthing or service cables", regulation: "HSG47, HSE GS6" },
          { id: "B", text: "The overhead line poles may have underground earthing conductors and service cables nearby", isCorrect: true, feedback: "Correct! Overhead line poles have earthing electrodes buried nearby. Additional underground services may run to the pole base.", outcome: "Underground hazards identified, CAT scan conducted near pole positions", regulation: "HSE GS6, HSG47, DNO guidance" },
          { id: "C", text: "The vibration from digging might bring down the lines", isCorrect: false, feedback: "Normal hand excavation will not affect the overhead lines. The concern is underground services, not vibration.", outcome: "Misidentified hazard, real underground risk overlooked", regulation: "HSE GS6, HSG47" },
          { id: "D", text: "Rain might make the ground conductive near the poles", isCorrect: false, feedback: "While ground conductivity is relevant to earthing, the primary excavation hazard is striking buried services.", outcome: "Secondary concern prioritised over primary underground risk", regulation: "HSE GS6, HSG47" }
        ]
      }
    ]
  }
];
