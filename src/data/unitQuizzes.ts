
export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // Index of the correct option
}

export interface UnitQuiz {
  unitCode: string;
  questions: QuizQuestion[];
}

// Question pool for ELEC2/01 Health and Safety unit
export const healthAndSafetyQuizzes: UnitQuiz = {
  unitCode: "ELEC2/01",
  questions: [
    {
      id: "hs-q1",
      question: "What is the primary legislation governing electrical safety in the workplace?",
      options: [
        "The Work at Height Regulations 2005",
        "The Health and Safety at Work Act 1974",
        "The Management of Health and Safety at Work Regulations 1992",
        "The Personal Protective Equipment Regulations 2002"
      ],
      correctAnswer: 1
    },
    {
      id: "hs-q2",
      question: "Which of the following specifically addresses electrical safety standards?",
      options: [
        "The Provision and Use of Work Equipment Regulations 1998",
        "The Control of Substances Hazardous to Health Regulations 2002",
        "The Electricity at Work Regulations 1989",
        "The Manual Handling Operations Regulations 1992"
      ],
      correctAnswer: 2
    },
    {
      id: "hs-q3",
      question: "What does RIDDOR stand for?",
      options: [
        "Reporting of Injuries, Diseases and Dangerous Occurrences Regulations",
        "Risk Identification, Detection, Determination and Operational Response",
        "Regional Inspection of Dangerous Devices and Operational Requirements",
        "Risk Identification and Dangerous Device Operational Regulations"
      ],
      correctAnswer: 0
    },
    {
      id: "hs-q4",
      question: "Which of these is NOT one of the five steps in a risk assessment?",
      options: [
        "Identify hazards",
        "Determine who might be harmed",
        "Purchase protective equipment",
        "Review assessment"
      ],
      correctAnswer: 2
    },
    {
      id: "hs-q5",
      question: "What is the correct sequence for safe isolation?",
      options: [
        "Identify circuit, isolate, prove dead, test, lock off",
        "Test equipment, identify circuit, isolate, lock off, prove dead",
        "Identify circuit, isolate, test equipment, prove dead, lock off",
        "Isolate, identify circuit, test equipment, prove dead, lock off"
      ],
      correctAnswer: 0
    },
    {
      id: "hs-q6",
      question: "Which of these is the most effective control measure according to the hierarchy of control?",
      options: [
        "Administrative controls",
        "Personal protective equipment",
        "Engineering controls",
        "Elimination of the hazard"
      ],
      correctAnswer: 3
    },
    {
      id: "hs-q7",
      question: "When working on ladders, what rule should be followed regarding contact points?",
      options: [
        "Two points of contact",
        "Three points of contact",
        "Four points of contact",
        "One hand for the ladder, one for the work"
      ],
      correctAnswer: 1
    },
    {
      id: "hs-q8",
      question: "Which of these is NOT a type of circuit protection device?",
      options: [
        "MCB (Miniature Circuit Breaker)",
        "RCD (Residual Current Device)",
        "PPE (Personal Protective Equipment)",
        "Fuse"
      ],
      correctAnswer: 2
    },
    {
      id: "hs-q9",
      question: "What is the purpose of main equipotential bonding?",
      options: [
        "To provide a path for fault current",
        "To ensure all exposed conductive parts are at the same potential",
        "To protect against overcurrent",
        "To improve circuit efficiency"
      ],
      correctAnswer: 1
    },
    {
      id: "hs-q10",
      question: "What should be verified before using any test equipment?",
      options: [
        "Its purchase date",
        "Its manufacturer",
        "Its calibration status",
        "Its color and design"
      ],
      correctAnswer: 2
    },
    {
      id: "hs-q11",
      question: "Which document is required for high-risk electrical work?",
      options: [
        "Permit-to-work",
        "Purchase order",
        "Installation certificate",
        "Warranty document"
      ],
      correctAnswer: 0
    },
    {
      id: "hs-q12",
      question: "What is the main purpose of PAT testing?",
      options: [
        "To check electrical wiring in buildings",
        "To ensure portable electrical appliances are safe to use",
        "To verify power quality in the supply",
        "To test circuit conductivity"
      ],
      correctAnswer: 1
    },
    {
      id: "hs-q13",
      question: "What does the term 'LOLER' refer to in health and safety?",
      options: [
        "Ladder Operation and Legal Equipment Regulations",
        "Location of Lifting Equipment Requirements",
        "Lifting Operations and Lifting Equipment Regulations",
        "Legal Obligations for Ladder Equipment Rules"
      ],
      correctAnswer: 2
    },
    {
      id: "hs-q14",
      question: "What is the minimum safe distance from overhead power lines when using access equipment?",
      options: [
        "1 meter",
        "3 meters",
        "9 meters",
        "15 meters"
      ],
      correctAnswer: 2
    },
    {
      id: "hs-q15",
      question: "What color is used for electrical danger signs according to the Health and Safety (Safety Signs and Signals) Regulations?",
      options: [
        "Green",
        "Yellow",
        "Blue",
        "Red"
      ],
      correctAnswer: 3
    },
    // Adding more questions to expand the pool
    {
      id: "hs-q16",
      question: "What does IP rating on electrical equipment refer to?",
      options: [
        "Insulation Properties",
        "Internal Protection",
        "Ingress Protection",
        "Installation Performance"
      ],
      correctAnswer: 2
    },
    {
      id: "hs-q17",
      question: "Which class of fire extinguisher should NOT be used on electrical fires?",
      options: [
        "Class A (Water)",
        "Class B (Foam)",
        "Class C (Carbon Dioxide)",
        "Class D (Dry Powder)"
      ],
      correctAnswer: 0
    },
    {
      id: "hs-q18",
      question: "What is the main purpose of a residual current device (RCD)?",
      options: [
        "To prevent overloads",
        "To detect earth leakage currents and disconnect supply",
        "To protect against short circuits",
        "To regulate voltage"
      ],
      correctAnswer: 1
    },
    {
      id: "hs-q19",
      question: "What is the safe voltage limit for extra-low voltage for reduced risk of electric shock?",
      options: [
        "110V",
        "50V",
        "24V",
        "12V"
      ],
      correctAnswer: 1
    },
    {
      id: "hs-q20",
      question: "Who is responsible for implementing health and safety measures in a workplace under the Health and Safety at Work Act?",
      options: [
        "Only the safety officer",
        "Only supervisors",
        "Only managers",
        "Everyone in the workplace"
      ],
      correctAnswer: 3
    },
    {
      id: "hs-q21",
      question: "When is a 'hot works permit' required?",
      options: [
        "When working in high-temperature environments",
        "When working with live electrical equipment",
        "When working with equipment that generates heat or sparks",
        "When working near water"
      ],
      correctAnswer: 2
    },
    {
      id: "hs-q22",
      question: "What is the main goal of a Method Statement?",
      options: [
        "To record materials used in a task",
        "To document step-by-step procedures for completing hazardous work safely",
        "To list tools required for a job",
        "To calculate costs for a project"
      ],
      correctAnswer: 1
    },
    {
      id: "hs-q23",
      question: "Which of the following is an example of a leading indicator in health and safety?",
      options: [
        "Number of accidents",
        "Lost time injuries",
        "Safety training completions",
        "Insurance claims"
      ],
      correctAnswer: 2
    },
    {
      id: "hs-q24",
      question: "What does COSHH stand for?",
      options: [
        "Control of Substances Hazardous to Health",
        "Company Oversight for Safety and Health Hazards",
        "Certification of Safety in Health and Hygiene",
        "Corrective Operations for Safety in Harmful Hazards"
      ],
      correctAnswer: 0
    },
    {
      id: "hs-q25",
      question: "What is the purpose of a toolbox talk?",
      options: [
        "To discuss which tools to purchase",
        "To organize tools in the workplace",
        "To brief workers on specific health and safety topics",
        "To repair damaged equipment"
      ],
      correctAnswer: 2
    },
    {
      id: "hs-q26",
      question: "What should you check before digging in a construction site?",
      options: [
        "Weather forecast",
        "Location of underground services",
        "Lunch break schedule",
        "Building planning permissions"
      ],
      correctAnswer: 1
    },
    {
      id: "hs-q27",
      question: "Which of the following is NOT a factor in electrical fire risk?",
      options: [
        "Overloaded circuits",
        "Loose connections",
        "Earth bonding",
        "Electrical equipment maintenance"
      ],
      correctAnswer: 2
    },
    {
      id: "hs-q28",
      question: "What does PPE stand for?",
      options: [
        "Personal Protective Equipment",
        "Public Protection Enforcement",
        "Professional Practice Equipment",
        "Preventative Procedural Elements"
      ],
      correctAnswer: 0
    },
    {
      id: "hs-q29",
      question: "Which of these is the correct definition of a hazard?",
      options: [
        "Something that could cause harm",
        "The likelihood of harm occurring",
        "The severity of potential harm",
        "The consequence of an accident"
      ],
      correctAnswer: 0
    },
    {
      id: "hs-q30",
      question: "What is the purpose of a risk assessment?",
      options: [
        "To allocate blame for accidents",
        "To identify hazards and evaluate risks",
        "To avoid legal requirements",
        "To increase productivity"
      ],
      correctAnswer: 1
    },
    {
      id: "hs-q31",
      question: "What action should be taken first when someone suffers an electric shock?",
      options: [
        "Perform CPR immediately",
        "Call for emergency services",
        "Make the area safe and disconnect the electricity supply",
        "Move the victim to a comfortable position"
      ],
      correctAnswer: 2
    },
    {
      id: "hs-q32",
      question: "What is the maximum weight that should be lifted at waist height according to manual handling guidelines?",
      options: [
        "5 kg",
        "10 kg",
        "20 kg",
        "25 kg"
      ],
      correctAnswer: 2
    },
    {
      id: "hs-q33",
      question: "What is the first step when carrying out electrical testing?",
      options: [
        "Turn off all equipment",
        "Check test equipment is working properly",
        "Put on PPE",
        "Inform all personnel"
      ],
      correctAnswer: 1
    },
    {
      id: "hs-q34",
      question: "Which type of fire extinguisher is most suitable for electrical fires?",
      options: [
        "Water",
        "Foam",
        "CO2",
        "Wet chemical"
      ],
      correctAnswer: 2
    },
    {
      id: "hs-q35",
      question: "What does the HAVS acronym refer to in health and safety?",
      options: [
        "Hazard Avoidance Verification System",
        "Hand-Arm Vibration Syndrome",
        "Health And Vaccination Schedule",
        "Height Access Validation Standard"
      ],
      correctAnswer: 1
    },
    {
      id: "hs-q36",
      question: "Which organization enforces health and safety regulations in the UK?",
      options: [
        "Environment Agency",
        "Health and Safety Executive (HSE)",
        "Trading Standards",
        "British Standards Institution"
      ],
      correctAnswer: 1
    },
    {
      id: "hs-q37",
      question: "What is the recommended minimum frequency for PAT testing of power tools on a construction site?",
      options: [
        "Monthly",
        "Every 3 months",
        "Every 6 months",
        "Annually"
      ],
      correctAnswer: 1
    },
    {
      id: "hs-q38",
      question: "What does ELV stand for in electrical safety?",
      options: [
        "Emergency Lighting Voltage",
        "Extra Low Voltage",
        "Environmental Limit Value",
        "Electrical Load Variation"
      ],
      correctAnswer: 1
    },
    {
      id: "hs-q39",
      question: "What is the purpose of a 'proving unit' when carrying out safe isolation?",
      options: [
        "To ensure power is fully off",
        "To verify test equipment is working correctly",
        "To measure voltage in the circuit",
        "To protect against power surges"
      ],
      correctAnswer: 1
    },
    {
      id: "hs-q40",
      question: "Who can issue a permit-to-work?",
      options: [
        "Any qualified electrician",
        "Only the person doing the work",
        "An authorized competent person",
        "The client or customer"
      ],
      correctAnswer: 2
    },
    {
      id: "hs-q41",
      question: "What should be checked when inspecting a ladder before use?",
      options: [
        "Manufacturing date only",
        "Rungs, stiles, and feet for damage",
        "Only the rubber feet",
        "Maximum load weight"
      ],
      correctAnswer: 1
    },
    {
      id: "hs-q42",
      question: "When is respiratory protective equipment (RPE) required?",
      options: [
        "Only when working outside",
        "When exposed to harmful dusts, fumes, or gases",
        "When working at height",
        "When working with hand tools"
      ],
      correctAnswer: 1
    },
    {
      id: "hs-q43",
      question: "What is the most important reason for maintaining good housekeeping in a workplace?",
      options: [
        "To make the workplace look professional",
        "To prevent slips, trips, and falls",
        "To satisfy inspectors",
        "To increase work efficiency"
      ],
      correctAnswer: 1
    },
    {
      id: "hs-q44",
      question: "What type of fire is an electrical fire classified as?",
      options: [
        "Class A",
        "Class B",
        "Class C",
        "Class E"
      ],
      correctAnswer: 3
    },
    {
      id: "hs-q45",
      question: "What is the main function of equipotential bonding?",
      options: [
        "To prevent electric shock",
        "To reduce electromagnetic interference",
        "To improve power factor",
        "To increase current flow"
      ],
      correctAnswer: 0
    },
    {
      id: "hs-q46",
      question: "Why is it important to follow the manufacturer's instructions when using power tools?",
      options: [
        "To maintain warranty coverage",
        "To ensure safe and correct operation of the equipment",
        "To avoid damaging the work material",
        "To reduce noise levels"
      ],
      correctAnswer: 1
    },
    {
      id: "hs-q47",
      question: "What is the minimum safe distance to maintain from overhead power lines with voltages up to 33kV?",
      options: [
        "3 meters",
        "6 meters",
        "9 meters",
        "12 meters"
      ],
      correctAnswer: 1
    },
    {
      id: "hs-q48",
      question: "What information should be included on a warning sign for live electrical equipment?",
      options: [
        "Only the voltage",
        "Only the warning symbol",
        "Danger of death and voltage level",
        "Only the word 'Danger'"
      ],
      correctAnswer: 2
    },
    {
      id: "hs-q49",
      question: "What is the maximum permitted height for mobile tower scaffolds without outriggers?",
      options: [
        "2.5 meters",
        "3 times the smallest base dimension",
        "3.5 times the smallest base dimension",
        "No limit if properly secured"
      ],
      correctAnswer: 1
    },
    {
      id: "hs-q50",
      question: "What is the purpose of a risk assessment?",
      options: [
        "To create unnecessary paperwork",
        "To identify hazards and implement control measures",
        "To increase work costs",
        "To slow down work progress"
      ],
      correctAnswer: 1
    },
    {
      id: "hs-q51",
      question: "What is the frequency range that causes the most danger for electrical shock?",
      options: [
        "DC (0 Hz)",
        "50-60 Hz",
        "1,000-5,000 Hz",
        "Above 10,000 Hz"
      ],
      correctAnswer: 1
    },
    {
      id: "hs-q52",
      question: "What is an Arc Flash?",
      options: [
        "A type of welding technique",
        "A type of lightning",
        "A dangerous electrical explosion caused by a short circuit through air",
        "A method of testing insulation"
      ],
      correctAnswer: 2
    },
    {
      id: "hs-q53",
      question: "What should be the minimum height clearance for overhead cables crossing public roads?",
      options: [
        "3.5 meters",
        "5.2 meters",
        "5.8 meters",
        "7.3 meters"
      ],
      correctAnswer: 3
    },
    {
      id: "hs-q54",
      question: "Who is responsible for providing first aid facilities in a workplace?",
      options: [
        "Individual employees",
        "Health and Safety Executive",
        "The employer",
        "The emergency services"
      ],
      correctAnswer: 2
    },
    {
      id: "hs-q55",
      question: "What does a blue safety sign indicate?",
      options: [
        "Warning",
        "Prohibition",
        "Mandatory action",
        "Safe condition"
      ],
      correctAnswer: 2
    },
    {
      id: "hs-q56",
      question: "What is the primary purpose of earthing in an electrical installation?",
      options: [
        "To improve energy efficiency",
        "To increase current flow",
        "To provide a path for fault current to safely flow",
        "To reduce electromagnetic interference"
      ],
      correctAnswer: 2
    },
    {
      id: "hs-q57",
      question: "What is the maximum permitted sound exposure level over an 8-hour working day?",
      options: [
        "75 dB(A)",
        "80 dB(A)",
        "85 dB(A)",
        "90 dB(A)"
      ],
      correctAnswer: 2
    },
    {
      id: "hs-q58",
      question: "Which organization publishes the Wiring Regulations BS 7671?",
      options: [
        "Health and Safety Executive",
        "British Standards Institution",
        "Institution of Engineering and Technology",
        "Electrical Contractors' Association"
      ],
      correctAnswer: 2
    },
    {
      id: "hs-q59",
      question: "What does a yellow safety sign with black symbols indicate?",
      options: [
        "Mandatory action",
        "Warning of hazard",
        "Prohibition",
        "Safe condition"
      ],
      correctAnswer: 1
    },
    {
      id: "hs-q60",
      question: "What is the recommended inspection interval for Class I portable appliances in an office environment?",
      options: [
        "Every month",
        "Every 6 months",
        "Every 12-24 months",
        "Every 5 years"
      ],
      correctAnswer: 2
    },
    // Adding more questions to go well beyond 100 total
    {
      id: "hs-q61",
      question: "What is the purpose of cable glands?",
      options: [
        "To join two cables together",
        "To secure cables and provide strain relief",
        "To increase cable length",
        "To reduce electromagnetic interference"
      ],
      correctAnswer: 1
    },
    {
      id: "hs-q62",
      question: "What is the recommended minimum illumination level for general electrical work?",
      options: [
        "100 lux",
        "200 lux",
        "500 lux",
        "1000 lux"
      ],
      correctAnswer: 2
    },
    {
      id: "hs-q63",
      question: "Which of the following is NOT a requirement under the Work at Height Regulations?",
      options: [
        "Planning and supervision",
        "Risk assessment",
        "Using annual leave to rest after working at height",
        "Selection of appropriate work equipment"
      ],
      correctAnswer: 2
    },
    {
      id: "hs-q64",
      question: "What should be used to mark underground electrical cables?",
      options: [
        "Yellow warning tape",
        "Red warning tape",
        "Blue warning tape",
        "Green warning tape"
      ],
      correctAnswer: 0
    },
    {
      id: "hs-q65",
      question: "What is the minimum safe distance from an overhead line of 11kV?",
      options: [
        "1.5 meters",
        "3 meters",
        "6 meters",
        "9 meters"
      ],
      correctAnswer: 1
    },
    {
      id: "hs-q66",
      question: "When carrying out a risk assessment, what is the correct order of steps?",
      options: [
        "Identify hazards, assess risks, implement controls, review",
        "Implement controls, identify hazards, assess risks, review",
        "Assess risks, identify hazards, review, implement controls",
        "Review, implement controls, identify hazards, assess risks"
      ],
      correctAnswer: 0
    },
    {
      id: "hs-q67",
      question: "What does the acronym RAMS stand for in health and safety?",
      options: [
        "Risk Assessment Method Statement",
        "Risk And Management System",
        "Reliable Authority Management Safety",
        "Risk Assessment Management Standard"
      ],
      correctAnswer: 0
    },
    {
      id: "hs-q68",
      question: "Which of the following is the most appropriate measure to prevent falls when working at height?",
      options: [
        "Using a fall arrest harness",
        "Warning signs",
        "Using guardrails or toe boards",
        "Work scheduling"
      ],
      correctAnswer: 2
    },
    {
      id: "hs-q69",
      question: "What is the maximum amount of time that a temporary supply can be used on a construction site according to BS 7671?",
      options: [
        "30 days",
        "3 months",
        "90 days",
        "12 months"
      ],
      correctAnswer: 2
    },
    {
      id: "hs-q70",
      question: "What is an IP2X rating equivalent to in terms of protection?",
      options: [
        "Protection against solids greater than 50mm",
        "Protection against solids greater than 12.5mm",
        "Protection against solids greater than 1mm",
        "Protection against dust"
      ],
      correctAnswer: 1
    },
    {
      id: "hs-q71",
      question: "Which step is NOT part of the 'five steps to risk assessment' approach?",
      options: [
        "Identify hazards",
        "Decide who might be harmed and how",
        "Purchase insurance coverage",
        "Record your findings and implement them"
      ],
      correctAnswer: 2
    },
    {
      id: "hs-q72",
      question: "What is the primary reason for implementing a 'lock out, tag out' procedure?",
      options: [
        "To prevent loss of keys",
        "To prevent theft of equipment",
        "To prevent unauthorized operation of equipment",
        "To identify damaged equipment"
      ],
      correctAnswer: 2
    },
    {
      id: "hs-q73",
      question: "Which of the following is the best definition of a confined space?",
      options: [
        "Any small room or area",
        "A place where only one person can work at a time",
        "A place with limited entry/exit and potential for hazardous atmosphere",
        "Any underground workspace"
      ],
      correctAnswer: 2
    },
    {
      id: "hs-q74",
      question: "What is the safest system for electrical supply on a construction site?",
      options: [
        "230V direct from mains",
        "110V center-tapped to earth supply",
        "Generator power only",
        "Battery-powered tools only"
      ],
      correctAnswer: 1
    },
    {
      id: "hs-q75",
      question: "Which factor does NOT need to be considered when selecting PPE?",
      options: [
        "The hazards present",
        "The person using it",
        "The brand name",
        "The requirements of the task"
      ],
      correctAnswer: 2
    },
    {
      id: "hs-q76",
      question: "When should a Method Statement be prepared?",
      options: [
        "For every task regardless of risk",
        "Only for tasks with significant risks",
        "Only when requested by the client",
        "Only for outdoor work"
      ],
      correctAnswer: 1
    },
    {
      id: "hs-q77",
      question: "What color is used for prohibition signs?",
      options: [
        "Yellow",
        "Blue",
        "Green",
        "Red"
      ],
      correctAnswer: 3
    },
    {
      id: "hs-q78",
      question: "What is the recommended mounting height for socket outlets in domestic properties?",
      options: [
        "150mm from floor level",
        "450mm from floor level",
        "750mm from floor level",
        "1200mm from floor level"
      ],
      correctAnswer: 1
    },
    {
      id: "hs-q79",
      question: "What does a GFCI (Ground Fault Circuit Interrupter) detect?",
      options: [
        "Overcurrent",
        "Overvoltage",
        "Leakage current to ground",
        "Short circuits"
      ],
      correctAnswer: 2
    },
    {
      id: "hs-q80",
      question: "What is the first action to be taken in the event of discovering a fire?",
      options: [
        "Call the fire brigade",
        "Try to extinguish the fire",
        "Raise the alarm",
        "Leave the building"
      ],
      correctAnswer: 2
    },
    {
      id: "hs-q81",
      question: "What is the maximum distance allowed between fire alarm call points?",
      options: [
        "20 meters",
        "30 meters",
        "45 meters",
        "60 meters"
      ],
      correctAnswer: 1
    },
    {
      id: "hs-q82",
      question: "What is the preferred method of testing for the presence of voltage during safe isolation?",
      options: [
        "Using a multimeter",
        "Using an approved voltage indicator",
        "Using a test lamp",
        "Using a neon screwdriver"
      ],
      correctAnswer: 1
    },
    {
      id: "hs-q83",
      question: "What shape are prohibition signs according to safety sign regulations?",
      options: [
        "Triangle",
        "Circle",
        "Square",
        "Rectangle"
      ],
      correctAnswer: 1
    },
    {
      id: "hs-q84",
      question: "Which of the following is NOT a requirement of the Construction (Design and Management) Regulations?",
      options: [
        "Appointing a principal designer",
        "Creating a health and safety file",
        "Conducting price comparisons for materials",
        "Planning, managing and monitoring construction work"
      ],
      correctAnswer: 2
    },
    {
      id: "hs-q85",
      question: "What is the maximum height at which a properly secured ladder can be used without additional measures?",
      options: [
        "3 meters",
        "5 meters",
        "7 meters",
        "9 meters"
      ],
      correctAnswer: 2
    },
    {
      id: "hs-q86",
      question: "What is the primary purpose of a rescue plan when working at height?",
      options: [
        "To bring injured workers to ground level",
        "To identify who to call in an emergency",
        "To determine how to rescue someone if they fall and are suspended in a harness",
        "To document all climbing procedures"
      ],
      correctAnswer: 2
    },
    {
      id: "hs-q87",
      question: "What is the maximum distance between emergency lighting units in an escape route?",
      options: [
        "10 meters",
        "20 meters",
        "30 meters",
        "40 meters"
      ],
      correctAnswer: 1
    },
    {
      id: "hs-q88",
      question: "What is the main function of a circuit breaker?",
      options: [
        "To detect earth faults",
        "To protect against overcurrent",
        "To reduce voltage",
        "To improve power factor"
      ],
      correctAnswer: 1
    },
    {
      id: "hs-q89",
      question: "What is the main reason for installing surge protection devices?",
      options: [
        "To protect against overcurrent",
        "To protect against lightning strikes and voltage surges",
        "To improve energy efficiency",
        "To detect earth faults"
      ],
      correctAnswer: 1
    },
    {
      id: "hs-q90",
      question: "What is the maximum temperature allowed for hot water from taps in healthcare premises?",
      options: [
        "38°C",
        "41°C",
        "43°C",
        "46°C"
      ],
      correctAnswer: 2
    },
    {
      id: "hs-q91",
      question: "What is the main purpose of a risk matrix?",
      options: [
        "To allocate resources",
        "To prioritize hazards based on likelihood and severity",
        "To determine insurance premiums",
        "To establish work schedules"
      ],
      correctAnswer: 1
    },
    {
      id: "hs-q92",
      question: "What is the purpose of safety boots with midsole protection?",
      options: [
        "To prevent slips",
        "To prevent puncture wounds from stepping on nails",
        "To prevent ankle injuries",
        "To provide insulation from electricity"
      ],
      correctAnswer: 1
    },
    {
      id: "hs-q93",
      question: "What type of smoke detector is most suitable for kitchens?",
      options: [
        "Ionization",
        "Optical",
        "Heat detector",
        "Beam detector"
      ],
      correctAnswer: 2
    },
    {
      id: "hs-q94",
      question: "What is the purpose of a 'dynamic risk assessment'?",
      options: [
        "To assess risks that change frequently",
        "To assess risks continuously as work progresses",
        "To assess risks related to motion",
        "To assess risks with a team"
      ],
      correctAnswer: 1
    },
    {
      id: "hs-q95",
      question: "What is the maximum time a worker should spend in suspended harness after a fall?",
      options: [
        "5 minutes",
        "10 minutes",
        "20 minutes",
        "30 minutes"
      ],
      correctAnswer: 1
    },
    {
      id: "hs-q96",
      question: "What is the first step in conducting a safe isolation procedure?",
      options: [
        "Switch off the supply",
        "Identify the circuit to be isolated",
        "Lock the isolator",
        "Test the voltage indicator"
      ],
      correctAnswer: 1
    },
    {
      id: "hs-q97",
      question: "What is the most common cause of accidents in the electrical industry?",
      options: [
        "Inadequate training",
        "Not following procedures",
        "Faulty equipment",
        "Poor lighting"
      ],
      correctAnswer: 1
    },
    {
      id: "hs-q98",
      question: "What does the term ALARP stand for in risk assessment?",
      options: [
        "All Liabilities And Responsibilities Protected",
        "As Low As Reasonably Practicable",
        "Active Learning And Risk Prevention",
        "Automated Liability Assessment and Risk Protocol"
      ],
      correctAnswer: 1
    },
    {
      id: "hs-q99",
      question: "What is the correct extinguishing medium for a Class F fire?",
      options: [
        "Water",
        "Foam",
        "Carbon dioxide",
        "Wet chemical"
      ],
      correctAnswer: 3
    },
    {
      id: "hs-q100",
      question: "What is the approximate resistance of the human body when dry?",
      options: [
        "100 ohms",
        "1,000 ohms",
        "10,000 ohms",
        "100,000 ohms"
      ],
      correctAnswer: 2
    },
    {
      id: "hs-q101",
      question: "What current level is typically considered the 'let-go threshold' where a person cannot release a grip?",
      options: [
        "1 mA",
        "5 mA",
        "10 mA",
        "30 mA"
      ],
      correctAnswer: 2
    },
    {
      id: "hs-q102",
      question: "What is a suitable tripping current for an RCD protecting a hand-held appliance?",
      options: [
        "10 mA",
        "30 mA",
        "100 mA",
        "300 mA"
      ],
      correctAnswer: 1
    },
    {
      id: "hs-q103",
      question: "Which of these fire extinguisher types uses a dry powder agent?",
      options: [
        "Class A",
        "Class B",
        "Class C",
        "Class D"
      ],
      correctAnswer: 2
    },
    {
      id: "hs-q104",
      question: "What information should be recorded after a risk assessment has been completed?",
      options: [
        "Only accidents that occurred",
        "Only the hazards identified",
        "Significant findings and control measures",
        "Only the name of the assessor"
      ],
      correctAnswer: 2
    },
    {
      id: "hs-q105",
      question: "What is the minimum current that can cause ventricular fibrillation?",
      options: [
        "10 mA",
        "30 mA",
        "50 mA",
        "100 mA"
      ],
      correctAnswer: 2
    },
    {
      id: "hs-q106",
      question: "What is the most appropriate action when you notice a safety hazard?",
      options: [
        "Fix it yourself if possible",
        "Report it to your supervisor immediately",
        "Place a warning sign only",
        "Inform other workers"
      ],
      correctAnswer: 1
    },
    {
      id: "hs-q107",
      question: "What is the most effective way to prevent electric shock?",
      options: [
        "Using only double-insulated tools",
        "Working on isolated circuits only",
        "Wearing insulated gloves",
        "Standing on rubber matting"
      ],
      correctAnswer: 1
    },
    {
      id: "hs-q108",
      question: "What is the general duty of care that all employees have under the Health and Safety at Work Act?",
      options: [
        "To provide a safe working environment",
        "To take reasonable care for themselves and others",
        "To supervise other workers",
        "To create health and safety policies"
      ],
      correctAnswer: 1
    },
    {
      id: "hs-q109",
      question: "What is the correct sequence for emergency procedures in case of electric shock?",
      options: [
        "Call for help, approach victim, disconnect power",
        "Disconnect power, call for help, approach victim",
        "Approach victim, disconnect power, call for help",
        "Call for help, disconnect power, approach victim"
      ],
      correctAnswer: 1
    },
    {
      id: "hs-q110",
      question: "What voltage is generally considered 'safe' for battery-operated hand tools?",
      options: [
        "Below 50V",
        "Below 24V",
        "Below 12V",
        "No voltage is completely safe"
      ],
      correctAnswer: 3
    }
  ]
};
