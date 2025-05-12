
import { QuizQuestion } from "@/components/apprentice/study/exam-bot/types";

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
        "Identify the circuit to be worked on",
        "Lock off the supply",
        "Test the voltage indicator on a known source"
      ],
      correctAnswer: 1
    },
    // Adding more questions to the pool (continuing from where the file was cut off)
    {
      id: "hs-q97",
      question: "What should be done prior to excavation work?",
      options: [
        "Notify the local authority",
        "Check for underground services",
        "Check the weather forecast",
        "Install temporary lighting"
      ],
      correctAnswer: 1
    },
    {
      id: "hs-q98",
      question: "What does a yellow triangle warning sign indicate?",
      options: [
        "Prohibition",
        "Mandatory action",
        "Hazard warning",
        "Safe condition"
      ],
      correctAnswer: 2
    },
    {
      id: "hs-q99",
      question: "How often should portable electrical equipment be formally visually inspected in a low-risk environment?",
      options: [
        "Daily",
        "Weekly",
        "Monthly",
        "Before each use"
      ],
      correctAnswer: 3
    },
    {
      id: "hs-q100",
      question: "What is the primary function of a safe system of work?",
      options: [
        "To document accidents",
        "To ensure formal procedures are followed when conducting hazardous activities",
        "To comply with insurance requirements",
        "To allocate responsibility to managers"
      ],
      correctAnswer: 1
    },
    {
      id: "hs-q101",
      question: "What does the term 'competent person' mean in health and safety?",
      options: [
        "Someone with specific qualifications only",
        "Someone with the necessary skills, knowledge, experience, and training",
        "A person with management responsibility",
        "Someone who has worked in the industry for at least 5 years"
      ],
      correctAnswer: 1
    },
    {
      id: "hs-q102",
      question: "What action must be taken when a hazard is identified that cannot be immediately rectified?",
      options: [
        "Ignore it if it seems minor",
        "Wait for someone else to deal with it",
        "Implement temporary controls and report it",
        "Shut down the entire workplace"
      ],
      correctAnswer: 2
    },
    {
      id: "hs-q103",
      question: "What is the significance of the CE mark on PPE?",
      options: [
        "It indicates the country of manufacture",
        "It confirms compliance with European safety standards",
        "It shows the equipment has been tested in the UK",
        "It indicates the equipment is suitable for commercial use"
      ],
      correctAnswer: 1
    },
    {
      id: "hs-q104",
      question: "What is the primary purpose of a Method Statement?",
      options: [
        "To record time spent on tasks",
        "To detail step-by-step how work will be carried out safely",
        "To assign blame in case of accidents",
        "To calculate costs for the client"
      ],
      correctAnswer: 1
    },
    {
      id: "hs-q105",
      question: "What should you do if you discover damaged electrical equipment?",
      options: [
        "Repair it yourself",
        "Remove it from use, label it, and report it",
        "Continue using it but take extra care",
        "Hide it to avoid getting blamed"
      ],
      correctAnswer: 1
    },
    {
      id: "hs-q106",
      question: "What type of fire extinguisher is identified by a blue label?",
      options: [
        "Water",
        "Foam",
        "Powder",
        "Carbon Dioxide"
      ],
      correctAnswer: 3
    },
    {
      id: "hs-q107",
      question: "What does a 'permit-to-work' system primarily control?",
      options: [
        "Access to the worksite",
        "High-risk activities",
        "Working hours",
        "Payment for work"
      ],
      correctAnswer: 1
    },
    {
      id: "hs-q108",
      question: "What is the maximum weight that can be carried before requiring a manual handling assessment?",
      options: [
        "There is no specific weight limit",
        "10 kg",
        "20 kg",
        "25 kg"
      ],
      correctAnswer: 0
    },
    {
      id: "hs-q109",
      question: "When using a ladder, what is the recommended maximum working height?",
      options: [
        "As high as the ladder allows",
        "No higher than the third rung from the top",
        "No time limit if secured properly",
        "Maximum of 30 minutes"
      ],
      correctAnswer: 1
    },
    {
      id: "hs-q110",
      question: "What is the purpose of isolation in electrical work?",
      options: [
        "To speed up the work process",
        "To ensure electrical equipment cannot be accidentally re-energized",
        "To properly ground equipment",
        "To prevent power surges"
      ],
      correctAnswer: 1
    },
    {
      id: "hs-q111",
      question: "What is the purpose of safety signs in the workplace?",
      options: [
        "For decoration only",
        "To provide warning, information, or instruction about health and safety",
        "To comply with insurance requirements only",
        "To assign blame in case of accidents"
      ],
      correctAnswer: 1
    },
    {
      id: "hs-q112",
      question: "What risk assessment approach suggests identifying hazards, determining who might be harmed, evaluating risks, recording findings, and reviewing regularly?",
      options: [
        "The PUWER method",
        "The five steps approach",
        "The COSHH assessment",
        "The RIDDOR procedure"
      ],
      correctAnswer: 1
    },
    {
      id: "hs-q113",
      question: "What is the definition of a 'near miss'?",
      options: [
        "An incident that caused injury",
        "An event that nearly resulted in injury or damage but did not",
        "A hazard that has been identified",
        "A type of safety inspection"
      ],
      correctAnswer: 1
    },
    {
      id: "hs-q114",
      question: "What is the main purpose of earthing electrical equipment?",
      options: [
        "To increase power efficiency",
        "To provide a path for fault current to safely flow to ground",
        "To protect against water damage",
        "To comply with warranty requirements"
      ],
      correctAnswer: 1
    },
    {
      id: "hs-q115",
      question: "Who has the primary responsibility for health and safety in a workplace?",
      options: [
        "Safety officers only",
        "The employer",
        "HSE inspectors",
        "Individual employees only"
      ],
      correctAnswer: 1
    },
    {
      id: "hs-q116",
      question: "What does the acronym SSOW stand for?",
      options: [
        "Safe System Of Work",
        "Standard Safety Operation Worksheet",
        "Safe Strategy On Workplace",
        "Standard System Of Working"
      ],
      correctAnswer: 0
    },
    {
      id: "hs-q117",
      question: "What is the primary purpose of a lockout/tagout procedure?",
      options: [
        "To record who is working on equipment",
        "To prevent theft of tools",
        "To prevent unexpected energizing or startup of machinery",
        "To track maintenance schedules"
      ],
      correctAnswer: 2
    },
    {
      id: "hs-q118",
      question: "What type of electrical test should be performed after repairs are completed?",
      options: [
        "Visual inspection only",
        "Voltage test only",
        "Functional test and safety test",
        "Resistance test only"
      ],
      correctAnswer: 2
    },
    {
      id: "hs-q119",
      question: "When should personal protective equipment (PPE) be used?",
      options: [
        "As the first line of defense against hazards",
        "Only when working outdoors",
        "As the last resort after other control measures",
        "Only when supervisors are present"
      ],
      correctAnswer: 2
    },
    {
      id: "hs-q120",
      question: "What is the maximum height for a working platform without guardrails?",
      options: [
        "No maximum if working alone",
        "1 meter",
        "2 meters",
        "Guardrails are required for all working platforms regardless of height"
      ],
      correctAnswer: 3
    },
    {
      id: "hs-q121",
      question: "What does the Health and Safety at Work Act require employers to provide?",
      options: [
        "Full pay during sickness",
        "Transport to and from work",
        "Safe plant and systems of work",
        "Guaranteed employment for life"
      ],
      correctAnswer: 2
    },
    {
      id: "hs-q122",
      question: "What is the purpose of cable detection equipment?",
      options: [
        "To test the quality of cable insulation",
        "To locate underground services before digging",
        "To measure the length of cables",
        "To identify cable manufacturer"
      ],
      correctAnswer: 1
    },
    {
      id: "hs-q123",
      question: "What is required before working in a confined space?",
      options: [
        "Only a ladder for access",
        "A permit-to-work and risk assessment",
        "Just verbal approval from a supervisor",
        "Work in confined spaces is always prohibited"
      ],
      correctAnswer: 1
    },
    {
      id: "hs-q124",
      question: "What is the first action when discovering a fire?",
      options: [
        "Call your supervisor",
        "Attempt to fight the fire",
        "Raise the alarm",
        "Run to safety"
      ],
      correctAnswer: 2
    },
    {
      id: "hs-q125",
      question: "Which of these is NOT a type of hazard in the workplace?",
      options: [
        "Biological",
        "Psychological",
        "Recreational",
        "Chemical"
      ],
      correctAnswer: 2
    },
    {
      id: "hs-q126",
      question: "What is the maximum noise level that is considered safe for an 8-hour working day?",
      options: [
        "65 dB(A)",
        "75 dB(A)",
        "85 dB(A)",
        "95 dB(A)"
      ],
      correctAnswer: 2
    },
    {
      id: "hs-q127",
      question: "What should be checked when inspecting a ladder?",
      options: [
        "Only the manufacturer's label",
        "The rungs, stiles, feet and general condition",
        "Only that it's the correct height",
        "Just the material it's made from"
      ],
      correctAnswer: 1
    },
    {
      id: "hs-q128",
      question: "What is the purpose of a risk assessment?",
      options: [
        "To comply with regulations only",
        "To identify hazards and implement control measures",
        "To assign blame if accidents occur",
        "To justify cost-cutting measures"
      ],
      correctAnswer: 1
    },
    {
      id: "hs-q129",
      question: "What does the abbreviation MEWP stand for?",
      options: [
        "Multiple Environment Working Platform",
        "Manual Elevated Work Position",
        "Mobile Elevating Work Platform",
        "Mechanical Equipment for Working at Positions"
      ],
      correctAnswer: 2
    },
    {
      id: "hs-q130",
      question: "Which type of fire extinguisher should NEVER be used on electrical fires?",
      options: [
        "Carbon dioxide",
        "Water",
        "Dry powder",
        "Foam"
      ],
      correctAnswer: 1
    },
    {
      id: "hs-q131",
      question: "What does the Construction (Design and Management) Regulations 2015 primarily focus on?",
      options: [
        "Building aesthetics and design principles",
        "Payment terms for construction projects",
        "Health, safety and welfare in construction",
        "Environmental impact of construction"
      ],
      correctAnswer: 2
    },
    {
      id: "hs-q132",
      question: "What is the primary function of an RCD (Residual Current Device)?",
      options: [
        "To protect against overcurrent",
        "To detect earth leakage current and disconnect supply",
        "To improve power factor",
        "To regulate voltage"
      ],
      correctAnswer: 1
    },
    {
      id: "hs-q133",
      question: "What is the minimum safe distance that should be maintained from overhead power lines?",
      options: [
        "1 meter",
        "3 meters",
        "9 meters",
        "15 meters"
      ],
      correctAnswer: 2
    },
    {
      id: "hs-q134",
      question: "What is the safest way to work near live electrical conductors?",
      options: [
        "Work quickly to minimize exposure time",
        "Do not work near live conductors; isolate first",
        "Use insulated tools and hope for the best",
        "Just be very careful"
      ],
      correctAnswer: 1
    },
    {
      id: "hs-q135",
      question: "What is the purpose of cable armoring?",
      options: [
        "To make the cable look better",
        "To provide mechanical protection",
        "To increase electrical efficiency",
        "To mark the cable manufacturer"
      ],
      correctAnswer: 1
    },
    {
      id: "hs-q136",
      question: "What information must be included on a risk assessment?",
      options: [
        "Only the assessor's name",
        "Just the hazards identified",
        "Hazards, who might be harmed, controls, further actions needed, review date",
        "Only control measures"
      ],
      correctAnswer: 2
    },
    {
      id: "hs-q137",
      question: "What does 'PUWER' stand for?",
      options: [
        "Personal Usage of Work Equipment Regulations",
        "Provision and Use of Work Equipment Regulations",
        "Professional Use of Workplace Equipment Rules",
        "Proper Utilization of Workplace Equipment Requirements"
      ],
      correctAnswer: 1
    },
    {
      id: "hs-q138",
      question: "When is a hot work permit typically required?",
      options: [
        "When working in hot weather conditions",
        "When using equipment that produces heat or sparks",
        "When working with hot water systems",
        "When working overtime during summer"
      ],
      correctAnswer: 1
    },
    {
      id: "hs-q139",
      question: "What is the purpose of a toolbox talk?",
      options: [
        "To catalog tools in the workplace",
        "To provide focused safety information on specific topics",
        "To allocate tools to workers",
        "To discuss tool maintenance only"
      ],
      correctAnswer: 1
    },
    {
      id: "hs-q140",
      question: "What are the three elements needed for a fire to start?",
      options: [
        "Water, air, and earth",
        "Heat, fuel, and oxygen",
        "Smoke, flames, and heat",
        "Wood, paper, and plastic"
      ],
      correctAnswer: 1
    },
    {
      id: "hs-q141",
      question: "What is the main purpose of PAT testing?",
      options: [
        "To test electrical resistance in wiring",
        "To ensure portable electrical appliances are safe to use",
        "To measure power consumption",
        "To calibrate test equipment"
      ],
      correctAnswer: 1
    },
    {
      id: "hs-q142",
      question: "What does the acronym COSHH stand for?",
      options: [
        "Control of Safety and Health Hazards",
        "Care of Substances Harmful to Health",
        "Control of Substances Hazardous to Health",
        "Containment of Serious Health Hazards"
      ],
      correctAnswer: 2
    },
    {
      id: "hs-q143",
      question: "What is the purpose of a 'proving unit'?",
      options: [
        "To calculate electrical loads",
        "To verify test equipment is working correctly",
        "To measure resistance in circuits",
        "To isolate circuits"
      ],
      correctAnswer: 1
    },
    {
      id: "hs-q144",
      question: "What does the 'General Principles of Prevention' refer to?",
      options: [
        "A first aid procedure",
        "A hierarchy of risk control measures",
        "A type of safety equipment",
        "A system for organizing tools"
      ],
      correctAnswer: 1
    },
    {
      id: "hs-q145",
      question: "What is the primary responsibility of a 'responsible person' under fire safety legislation?",
      options: [
        "To fight fires when they occur",
        "To ensure adequate fire safety measures are in place",
        "To maintain fire extinguishers only",
        "To call the fire brigade"
      ],
      correctAnswer: 1
    },
    {
      id: "hs-q146",
      question: "What is the legal minimum number of trained first aiders required in a low-risk workplace with 25 employees?",
      options: [
        "None",
        "One appointed person",
        "Two first aiders",
        "Three first aiders"
      ],
      correctAnswer: 1
    },
    {
      id: "hs-q147",
      question: "What should you check when examining an extension lead before use?",
      options: [
        "Only the plug",
        "Cable, plug, socket and general condition",
        "Only the cable length",
        "Just the voltage rating"
      ],
      correctAnswer: 1
    },
    {
      id: "hs-q148",
      question: "What is the recommended maximum angle for a ladder against a structure?",
      options: [
        "45 degrees",
        "75 degrees",
        "90 degrees",
        "60 degrees"
      ],
      correctAnswer: 1
    },
    {
      id: "hs-q149",
      question: "What is required before excavating near underground services?",
      options: [
        "Just start digging carefully",
        "Only notify the local authority",
        "Locate and identify services using plans and detection equipment",
        "Just look for warning signs"
      ],
      correctAnswer: 2
    },
    {
      id: "hs-q150",
      question: "What are employers required to provide for electrical safety in the workplace?",
      options: [
        "Only insulated tools",
        "Only warning signs",
        "Safe electrical systems and equipment with proper maintenance",
        "Just rubber gloves"
      ],
      correctAnswer: 2
    },
    {
      id: "hs-q151",
      question: "What is the purpose of equipotential bonding?",
      options: [
        "To increase electrical conductivity",
        "To prevent electric shock by connecting exposed conductive parts",
        "To improve circuit efficiency",
        "To ground all equipment"
      ],
      correctAnswer: 1
    },
    {
      id: "hs-q152",
      question: "Which regulation specifically deals with working at height?",
      options: [
        "The Work at Height Regulations",
        "The Health and Safety at Work Act",
        "The Construction Design and Management Regulations",
        "The Personal Protective Equipment Regulations"
      ],
      correctAnswer: 0
    },
    {
      id: "hs-q153",
      question: "What is the appropriate first action if you suspect a gas leak?",
      options: [
        "Open all windows",
        "Turn off the gas supply and ventilate the area",
        "Call a plumber",
        "Look for the leak with a lighter"
      ],
      correctAnswer: 1
    },
    {
      id: "hs-q154",
      question: "What is the purpose of a safety data sheet?",
      options: [
        "To record safety inspections",
        "To provide information about hazardous substances",
        "To document accident statistics",
        "To list first aid procedures only"
      ],
      correctAnswer: 1
    },
    {
      id: "hs-q155",
      question: "What color is used for mandatory signs according to safety sign regulations?",
      options: [
        "Red",
        "Blue",
        "Green",
        "Yellow"
      ],
      correctAnswer: 1
    },
    {
      id: "hs-q156",
      question: "What is the legal duty of employees regarding health and safety?",
      options: [
        "To provide all safety equipment",
        "To take reasonable care of themselves and others",
        "To write all safety policies",
        "To conduct risk assessments"
      ],
      correctAnswer: 1
    },
    {
      id: "hs-q157",
      question: "What is the primary purpose of a 'dynamic risk assessment'?",
      options: [
        "To avoid doing paperwork",
        "To continually assess changing risks during work activities",
        "To save money on formal assessments",
        "To replace written risk assessments"
      ],
      correctAnswer: 1
    },
    {
      id: "hs-q158",
      question: "What is the recommended inspection frequency for Class II electrical equipment in a construction environment?",
      options: [
        "Daily",
        "Monthly",
        "Every 3 months",
        "Annually"
      ],
      correctAnswer: 2
    },
    {
      id: "hs-q159",
      question: "What is the main function of task lighting in electrical work?",
      options: [
        "To look professional",
        "To provide adequate illumination of the work area",
        "To save energy",
        "To avoid working in darkness"
      ],
      correctAnswer: 1
    },
    {
      id: "hs-q160",
      question: "What should always be done before working on electrical equipment?",
      options: [
        "Just wear gloves",
        "Isolate and lock off the supply",
        "Just turn it off at the socket",
        "Work quickly to minimize risk"
      ],
      correctAnswer: 1
    }
  ]
};
